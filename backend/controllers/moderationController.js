const db = require('../config/db');
const { recordAudit } = require('../utils/audit');

// Helper: Chuyển đổi Date sang định dạng ISO có offset +07:00
function formatSaigonISO(date) {
  if (!date) return null;
  const d = date instanceof Date ? date : new Date(date);
  if (isNaN(d.getTime())) return null;
  const tzOffset = 7 * 60; // phút (+07:00)
  const localTime = new Date(d.getTime() + tzOffset * 60 * 1000);
  return localTime.toISOString().replace('Z', '+07:00');
}

// 1. NGƯỜI DÙNG GỬI BÁO CÁO VI PHẠM (POST /api/community/report)
exports.createReport = async (req, res) => {
  const userId = req.user.id;
  const { targetType, targetId, reason, note } = req.body;

  // Kiểm tra tài khoản
  if (req.user.status !== 'active') {
    return res.status(403).json({ error: 'Tài khoản của bạn không ở trạng thái hoạt động.' });
  }

  // Validate targetType
  const allowedTypes = ['post', 'comment', 'discussion', 'reply'];
  if (!targetType || !allowedTypes.includes(targetType)) {
    return res.status(400).json({ error: 'Loại nội dung báo cáo không hợp lệ (post, comment, discussion, reply).' });
  }

  const idNum = parseInt(targetId, 10);
  if (!idNum || isNaN(idNum)) {
    return res.status(400).json({ error: 'ID nội dung cần báo cáo không hợp lệ.' });
  }

  // Validate reason
  const allowedReasons = ['spam', 'harassment', 'inappropriate', 'misinformation', 'other'];
  if (!reason || !allowedReasons.includes(reason)) {
    return res.status(400).json({ error: 'Lý do báo cáo không hợp lệ.' });
  }

  try {
    // 1. Giới hạn tần suất: tối đa 10 báo cáo / giờ / người dùng
    const [[{ recentReports }]] = await db.query(
      `SELECT COUNT(*) as recentReports FROM community_reports
       WHERE reporter_id = ? AND created_at >= DATE_SUB(NOW(), INTERVAL 1 HOUR)`,
      [userId]
    );
    if (recentReports >= 10) {
      return res.status(429).json({ error: 'Bạn đã gửi quá nhiều báo cáo trong 1 giờ qua. Vui lòng thử lại sau.' });
    }

    // 2. Kiểm tra đối tượng tồn tại và lấy author_id để chặn tự báo cáo
    let authorId = null;
    let targetExists = false;

    if (targetType === 'post') {
      const [rows] = await db.query('SELECT user_id FROM community_posts WHERE id = ?', [idNum]);
      if (rows.length > 0) { targetExists = true; authorId = rows[0].user_id; }
    } else if (targetType === 'comment') {
      const [rows] = await db.query('SELECT user_id FROM community_comments WHERE id = ?', [idNum]);
      if (rows.length > 0) { targetExists = true; authorId = rows[0].user_id; }
    } else if (targetType === 'discussion') {
      const [rows] = await db.query('SELECT user_id FROM community_discussions WHERE id = ?', [idNum]);
      if (rows.length > 0) { targetExists = true; authorId = rows[0].user_id; }
    } else if (targetType === 'reply') {
      const [rows] = await db.query('SELECT user_id FROM community_discussion_replies WHERE id = ?', [idNum]);
      if (rows.length > 0) { targetExists = true; authorId = rows[0].user_id; }
    }

    if (!targetExists) {
      return res.status(404).json({ error: 'Nội dung cần báo cáo không tồn tại hoặc đã bị xóa.' });
    }

    // Chặn người dùng tự báo cáo chính mình
    if (authorId === userId) {
      return res.status(400).json({ error: 'Bạn không thể tự báo cáo nội dung của chính mình.' });
    }

    // 3. Lưu báo cáo vào community_reports
    const cleanNote = note ? String(note).slice(0, 500).trim() : null;
    const [result] = await db.query(
      `INSERT INTO community_reports (reporter_id, target_type, target_id, reason, note, status)
       VALUES (?, ?, ?, ?, ?, 'open')`,
      [userId, targetType, idNum, reason, cleanNote]
    );

    return res.status(201).json({
      success: true,
      message: 'Báo cáo vi phạm đã được gửi tới Ban quản trị để xử lý.',
      reportId: result.insertId
    });

  } catch (error) {
    // Trùng lặp (đã báo cáo rồi)
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ error: 'Bạn đã gửi báo cáo cho nội dung này rồi.' });
    }
    console.error('Lỗi createReport:', error);
    return res.status(500).json({ error: 'Lỗi máy chủ khi gửi báo cáo' });
  }
};

// 2. ADMIN LẤY DANH SÁCH BÁO CÁO (GET /api/admin/reports)
exports.getReports = async (req, res) => {
  try {
    const status = req.query.status ? req.query.status.trim() : null;
    const targetType = req.query.type ? req.query.type.trim() : null;

    let page = parseInt(req.query.page, 10) || 1;
    if (page < 1) page = 1;
    let limit = parseInt(req.query.limit, 10) || 15;
    if (limit < 1) limit = 15;
    if (limit > 50) limit = 50;
    const offset = (page - 1) * limit;

    let whereConditions = [];
    let params = [];

    if (status && ['open', 'dismissed', 'actioned'].includes(status)) {
      whereConditions.push('r.status = ?');
      params.push(status);
    }
    if (targetType && ['post', 'comment', 'discussion', 'reply'].includes(targetType)) {
      whereConditions.push('r.target_type = ?');
      params.push(targetType);
    }

    const whereClause = whereConditions.length > 0 ? 'WHERE ' + whereConditions.join(' AND ') : '';

    const countSql = `SELECT COUNT(*) as total FROM community_reports r ${whereClause}`;
    const [[{ total }]] = await db.query(countSql, params);

    const dataSql = `
      SELECT r.id, r.reporter_id, r.target_type, r.target_id, r.reason, r.note,
             r.status, r.handled_by, r.handled_at, r.created_at,
             COALESCE(u.full_name, SUBSTRING_INDEX(u.username, '@', 1)) as reporter_name,
             u.avatar_url as reporter_avatar,
             COALESCE(h.full_name, SUBSTRING_INDEX(h.username, '@', 1)) as handler_name
      FROM community_reports r
      LEFT JOIN users u ON r.reporter_id = u.id
      LEFT JOIN users h ON r.handled_by = h.id
      ${whereClause}
      ORDER BY r.created_at DESC
      LIMIT ? OFFSET ?
    `;

    const [rows] = await db.query(dataSql, [...params, limit, offset]);

    // Bổ sung preview nội dung đối tượng và trạng thái ẩn hiện tại
    const enrichedReports = await Promise.all(rows.map(async (rep) => {
      let preview = '';
      let isHidden = 0;
      let authorName = 'Chưa xác định';
      let authorId = null;

      try {
        if (rep.target_type === 'post') {
          const [p] = await db.query(
            `SELECT p.content, p.is_hidden, p.user_id, COALESCE(u.full_name, SUBSTRING_INDEX(u.username, '@', 1)) as aname
             FROM community_posts p LEFT JOIN users u ON p.user_id = u.id WHERE p.id = ?`,
            [rep.target_id]
          );
          if (p.length > 0) {
            preview = p[0].content ? p[0].content.slice(0, 80) : '';
            isHidden = p[0].is_hidden || 0;
            authorName = p[0].aname;
            authorId = p[0].user_id;
          }
        } else if (rep.target_type === 'comment') {
          const [c] = await db.query(
            `SELECT c.content, c.is_hidden, c.user_id, COALESCE(u.full_name, SUBSTRING_INDEX(u.username, '@', 1)) as aname
             FROM community_comments c LEFT JOIN users u ON c.user_id = u.id WHERE c.id = ?`,
            [rep.target_id]
          );
          if (c.length > 0) {
            preview = c[0].content ? c[0].content.slice(0, 80) : '';
            isHidden = c[0].is_hidden || 0;
            authorName = c[0].aname;
            authorId = c[0].user_id;
          }
        } else if (rep.target_type === 'discussion') {
          const [d] = await db.query(
            `SELECT d.title as content, d.is_hidden, d.user_id, COALESCE(u.full_name, SUBSTRING_INDEX(u.username, '@', 1)) as aname
             FROM community_discussions d LEFT JOIN users u ON d.user_id = u.id WHERE d.id = ?`,
            [rep.target_id]
          );
          if (d.length > 0) {
            preview = d[0].content ? d[0].content.slice(0, 80) : '';
            isHidden = d[0].is_hidden || 0;
            authorName = d[0].aname;
            authorId = d[0].user_id;
          }
        } else if (rep.target_type === 'reply') {
          const [r] = await db.query(
            `SELECT r.content, r.user_id, COALESCE(u.full_name, SUBSTRING_INDEX(u.username, '@', 1)) as aname
             FROM community_discussion_replies r LEFT JOIN users u ON r.user_id = u.id WHERE r.id = ?`,
            [rep.target_id]
          );
          if (r.length > 0) {
            preview = r[0].content ? r[0].content.slice(0, 80) : '';
            authorName = r[0].aname;
            authorId = r[0].user_id;
          }
        }
      } catch (err) {
        console.error('Lỗi lấy preview target:', err.message);
      }

      return {
        id: rep.id,
        reporter: {
          id: rep.reporter_id,
          name: rep.reporter_name || 'Người dùng',
          avatarUrl: rep.reporter_avatar || null
        },
        targetType: rep.target_type,
        targetId: rep.target_id,
        targetPreview: preview,
        targetAuthor: {
          id: authorId,
          name: authorName
        },
        isTargetHidden: Boolean(isHidden),
        reason: rep.reason,
        note: rep.note,
        status: rep.status,
        handlerName: rep.handler_name,
        handledAt: rep.handled_at ? formatSaigonISO(rep.handled_at) : null,
        createdAt: formatSaigonISO(rep.created_at)
      };
    }));

    return res.json({
      success: true,
      total: Number(total),
      page,
      limit,
      totalPages: Math.ceil(Number(total) / limit) || 1,
      reports: enrichedReports
    });
  } catch (error) {
    console.error('Lỗi getReports:', error);
    return res.status(500).json({ error: 'Lỗi máy chủ khi lấy danh sách báo cáo' });
  }
};

// 3. ADMIN XỬ LÝ BÁO CÁO (PUT /api/admin/reports/:id)
// action: dismiss | hide | restore | delete
exports.handleReport = async (req, res) => {
  const reportId = parseInt(req.params.id, 10);
  const { action } = req.body;
  const adminId = req.user.id;

  if (!reportId || isNaN(reportId)) {
    return res.status(400).json({ error: 'ID báo cáo không hợp lệ.' });
  }

  const allowedActions = ['dismiss', 'hide', 'restore', 'delete'];
  if (!action || !allowedActions.includes(action)) {
    return res.status(400).json({ error: 'Hành động không hợp lệ (dismiss, hide, restore, delete).' });
  }

  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();

    const [repRows] = await connection.query(
      'SELECT * FROM community_reports WHERE id = ? FOR UPDATE',
      [reportId]
    );

    if (repRows.length === 0) {
      await connection.rollback();
      return res.status(404).json({ error: 'Không tìm thấy báo cáo vi phạm.' });
    }

    const report = repRows[0];
    const targetTableMap = {
      post: 'community_posts',
      comment: 'community_comments',
      discussion: 'community_discussions',
      reply: 'community_discussion_replies'
    };
    const targetTable = targetTableMap[report.target_type];

    if (action === 'dismiss') {
      // Bỏ qua báo cáo (không ẩn nội dung)
      await connection.query(
        `UPDATE community_reports SET status = 'dismissed', handled_by = ?, handled_at = NOW() WHERE id = ?`,
        [adminId, reportId]
      );
    } else if (action === 'hide') {
      // Ẩn nội dung đối tượng và cập nhật tất cả báo cáo liên quan thành actioned
      if (targetTable) {
        await connection.query(
          `UPDATE ${targetTable} SET is_hidden = 1, hidden_by = ?, hidden_at = NOW() WHERE id = ?`,
          [adminId, report.target_id]
        );
      }
      await connection.query(
        `UPDATE community_reports SET status = 'actioned', handled_by = ?, handled_at = NOW()
         WHERE target_type = ? AND target_id = ? AND status = 'open'`,
        [adminId, report.target_type, report.target_id]
      );
    } else if (action === 'restore') {
      // Khôi phục nội dung đã ẩn
      if (targetTable) {
        await connection.query(
          `UPDATE ${targetTable} SET is_hidden = 0, hidden_by = NULL, hidden_at = NULL WHERE id = ?`,
          [report.target_id]
        );
      }
      await connection.query(
        `UPDATE community_reports SET status = 'dismissed', handled_by = ?, handled_at = NOW() WHERE id = ?`,
        [adminId, reportId]
      );
    } else if (action === 'delete') {
      // Xóa vĩnh viễn nội dung
      if (targetTable) {
        await connection.query(`DELETE FROM ${targetTable} WHERE id = ?`, [report.target_id]);
      }
      await connection.query(
        `UPDATE community_reports SET status = 'actioned', handled_by = ?, handled_at = NOW()
         WHERE target_type = ? AND target_id = ?`,
        [adminId, report.target_type, report.target_id]
      );
    }

    await connection.commit();

    // Ghi nhận nhật ký quản trị
    const actionAuditMap = {
      dismiss: 'report.dismiss',
      hide: 'content.hide',
      restore: 'content.restore',
      delete: 'content.delete'
    };
    recordAudit({
      actorId: adminId,
      action: actionAuditMap[action] || `report.${action}`,
      targetType: action === 'dismiss' ? 'report' : report.target_type,
      targetId: action === 'dismiss' ? reportId : report.target_id,
      details: {
        reportId,
        targetType: report.target_type,
        targetId: report.target_id,
        reason: report.reason
      },
      req
    });

    return res.json({
      success: true,
      message: `Đã thực hiện thao tác '${action}' thành công cho báo cáo vi phạm.`
    });

  } catch (error) {
    await connection.rollback();
    console.error('Lỗi handleReport:', error);
    return res.status(500).json({ error: 'Lỗi máy chủ khi xử lý báo cáo vi phạm' });
  } finally {
    connection.release();
  }
};
