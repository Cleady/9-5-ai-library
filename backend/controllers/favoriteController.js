const db = require('../config/db');

/**
 * Format bytes thành định dạng hiển thị dung lượng (KB, MB, GB)
 */
function formatSizeLabel(bytes) {
  if (!bytes || bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

/**
 * Danh sách ID môn học thực hành hợp lệ trong hệ thống
 * Nguồn: Mảng tĩnh Lib95.practice.data.subjects trong js/practice-data.js (gồm 5 môn: CEA201, DBI202, PFP191, CSD203, CSI106)
 */
const VALID_PRACTICE_SUBJECT_IDS = [1, 2, 3, 4, 5, 6, 7, 8, 9];

/**
 * 1. LẤY TOÀN BỘ DANH SÁCH YÊU THÍCH (GET /api/favorites)
 * Trả về 3 nhóm thuộc riêng người dùng đang đăng nhập:
 * - lectureCourses: môn học bài giảng (join bảng courses)
 * - practiceSubjects: môn thực hành (item_id, created_at, addedAt)
 * - resources: tài liệu học tập (join bảng resources, KHÔNG trả stored_name)
 */
exports.getFavorites = async (req, res) => {
  try {
    const userId = req.user.id;

    // 1.1 Môn học bài giảng (Lectures)
    const [lecRows] = await db.query(`
      SELECT 
        c.id, c.code, c.name, c.title, c.term, c.icon, c.gradient_from, c.gradient_to,
        uf.created_at AS addedAt,
        COUNT(DISTINCT l.id) AS videoCount
      FROM user_favorites uf
      JOIN courses c ON uf.item_id = c.id
      LEFT JOIN lectures l ON l.course_id = c.id
      WHERE uf.user_id = ? AND uf.item_type = 'lecture_course'
      GROUP BY c.id, uf.created_at
      ORDER BY uf.created_at DESC
    `, [userId]);

    const lectureCourses = lecRows.map(r => ({
      id: r.id,
      code: r.code || r.name,
      name: r.name,
      title: r.title || r.name,
      term: r.term || 'Kỳ II',
      icon: r.icon || 'subject1-icon',
      gradientFrom: r.gradient_from,
      gradientTo: r.gradient_to,
      videoCount: Number(r.videoCount) || 0,
      addedAt: r.addedAt,
      favoritedByMe: true
    }));

    // 1.2 Môn thực hành (Practice)
    const [pracRows] = await db.query(`
      SELECT 
        uf.item_id,
        uf.created_at,
        uf.created_at AS addedAt
      FROM user_favorites uf
      WHERE uf.user_id = ? AND uf.item_type = 'practice_subject'
      ORDER BY uf.created_at DESC
    `, [userId]);

    const practiceSubjects = pracRows.map(r => ({
      item_id: r.item_id,
      created_at: r.created_at,
      addedAt: r.addedAt,
      favoritedByMe: true
    }));

    // 1.3 Tài nguyên tài liệu (Resources) - KHÔNG trả stored_name
    const [resRows] = await db.query(`
      SELECT 
        r.id, r.user_id, r.title, r.description, r.type, r.extension,
        r.original_name, r.file_size_bytes, r.mime_type, r.subject, r.downloads,
        r.created_at, r.updated_at,
        rf.created_at AS addedAt,
        u.full_name AS uploader_name, u.username AS uploader_username, u.role AS uploader_role,
        1 AS favoritedByMe
      FROM resource_favorites rf
      JOIN resources r ON r.id = rf.resource_id
      LEFT JOIN users u ON r.user_id = u.id
      WHERE rf.user_id = ?
      ORDER BY rf.created_at DESC
    `, [userId]);

    const resources = resRows.map(r => ({
      id: r.id,
      user_id: r.user_id,
      title: r.title,
      description: r.description,
      type: r.type,
      extension: r.extension,
      original_name: r.original_name,
      file_size_bytes: r.file_size_bytes,
      sizeLabel: formatSizeLabel(r.file_size_bytes),
      mime_type: r.mime_type,
      subject: r.subject,
      downloads: r.downloads,
      created_at: r.created_at,
      addedAt: r.addedAt,
      uploader: r.user_id ? {
        full_name: r.uploader_name || r.uploader_username,
        role: r.uploader_role
      } : {
        full_name: 'Cựu thành viên',
        role: 'member'
      },
      favoritedByMe: true
    }));

    res.json({
      success: true,
      lectureCourses,
      practiceSubjects,
      resources
    });
  } catch (err) {
    console.error('Lỗi khi lấy danh sách tổng hợp yêu thích:', err);
    res.status(500).json({ error: 'Không thể tải danh sách yêu thích' });
  }
};

/**
 * 2. BẬT / TẮT YÊU THÍCH (POST /api/favorites/toggle)
 * Body: { type: 'lecture_course' | 'practice_subject' | 'resource', id: number }
 * - Validate type & id
 * - Kiểm tra quyền (banned / pending không được ghi)
 * - Kiểm tra thực thể tồn tại
 * - Trả { success: true, favorited: boolean, message: string }
 */
exports.toggleFavorite = async (req, res) => {
  try {
    const userId = req.user.id;

    // Kiểm tra trạng thái tài khoản
    if (req.user.status === 'banned') {
      return res.status(403).json({ error: 'Tài khoản của bạn đã bị khóa (banned), không thể thực hiện thao tác này' });
    }
    if (req.user.status === 'pending') {
      return res.status(403).json({ error: 'Tài khoản của bạn đang chờ phê duyệt (pending), không thể thực hiện thao tác này' });
    }

    const { type, id } = req.body;
    const allowedTypes = ['lecture_course', 'practice_subject', 'resource'];

    if (!type || !allowedTypes.includes(type)) {
      return res.status(400).json({ error: 'Loại yêu thích không hợp lệ (chấp nhận: lecture_course, practice_subject, resource)' });
    }

    const numericId = parseInt(id, 10);
    if (isNaN(numericId) || numericId <= 0) {
      return res.status(400).json({ error: 'ID mục yêu thích không hợp lệ (phải là số nguyên dương)' });
    }

    // 2.1 Xử lý cho lecture_course
    if (type === 'lecture_course') {
      const [courses] = await db.query('SELECT id FROM courses WHERE id = ?', [numericId]);
      if (courses.length === 0) {
        return res.status(404).json({ error: 'Môn học bài giảng không tồn tại' });
      }

      const [favRows] = await db.query(
        'SELECT 1 FROM user_favorites WHERE user_id = ? AND item_type = ? AND item_id = ?',
        [userId, 'lecture_course', numericId]
      );

      if (favRows.length > 0) {
        await db.query(
          'DELETE FROM user_favorites WHERE user_id = ? AND item_type = ? AND item_id = ?',
          [userId, 'lecture_course', numericId]
        );
        return res.json({ success: true, favorited: false, message: 'Đã bỏ yêu thích môn học bài giảng' });
      } else {
        await db.query(
          'INSERT INTO user_favorites (user_id, item_type, item_id) VALUES (?, ?, ?)',
          [userId, 'lecture_course', numericId]
        );
        return res.json({ success: true, favorited: true, message: 'Đã thêm môn học bài giảng vào danh sách yêu thích' });
      }
    }

    // 2.2 Xử lý cho practice_subject
    if (type === 'practice_subject') {
      if (!VALID_PRACTICE_SUBJECT_IDS.includes(numericId)) {
        return res.status(404).json({ error: 'Môn học thực hành không tồn tại' });
      }

      const [favRows] = await db.query(
        'SELECT 1 FROM user_favorites WHERE user_id = ? AND item_type = ? AND item_id = ?',
        [userId, 'practice_subject', numericId]
      );

      if (favRows.length > 0) {
        await db.query(
          'DELETE FROM user_favorites WHERE user_id = ? AND item_type = ? AND item_id = ?',
          [userId, 'practice_subject', numericId]
        );
        return res.json({ success: true, favorited: false, message: 'Đã bỏ yêu thích môn học thực hành' });
      } else {
        await db.query(
          'INSERT INTO user_favorites (user_id, item_type, item_id) VALUES (?, ?, ?)',
          [userId, 'practice_subject', numericId]
        );
        return res.json({ success: true, favorited: true, message: 'Đã thêm môn học thực hành vào danh sách yêu thích' });
      }
    }

    // 2.3 Xử lý cho resource (tái dùng bảng resource_favorites)
    if (type === 'resource') {
      const [resRows] = await db.query('SELECT id FROM resources WHERE id = ?', [numericId]);
      if (resRows.length === 0) {
        return res.status(404).json({ error: 'Tài liệu không tồn tại' });
      }

      const [favRows] = await db.query(
        'SELECT 1 FROM resource_favorites WHERE resource_id = ? AND user_id = ?',
        [numericId, userId]
      );

      if (favRows.length > 0) {
        await db.query(
          'DELETE FROM resource_favorites WHERE resource_id = ? AND user_id = ?',
          [numericId, userId]
        );
        return res.json({ success: true, favorited: false, message: 'Đã bỏ yêu thích tài liệu' });
      } else {
        await db.query(
          'INSERT INTO resource_favorites (resource_id, user_id) VALUES (?, ?)',
          [numericId, userId]
        );
        return res.json({ success: true, favorited: true, message: 'Đã thêm tài liệu vào danh sách yêu thích' });
      }
    }
  } catch (err) {
    console.error('Lỗi khi toggle yêu thích:', err);
    res.status(500).json({ error: 'Không thể thực hiện thao tác yêu thích' });
  }
};
