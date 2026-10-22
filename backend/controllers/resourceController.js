const fs = require('fs');
const path = require('path');
const db = require('../config/db');

const STORAGE_DIR = path.join(__dirname, '../storage/resources');

// Đảm bảo thư mục lưu trữ luôn tồn tại
if (!fs.existsSync(STORAGE_DIR)) {
  fs.mkdirSync(STORAGE_DIR, { recursive: true });
}

// Hàm tính nhãn dung lượng thân thiện
function formatSizeLabel(bytes) {
  if (!bytes || isNaN(bytes)) return '0 KB';
  if (bytes < 1024 * 1024) {
    return `${Math.round(bytes / 1024)} KB`;
  }
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

// Hàm kiểm tra chữ ký file (Magic bytes)
function verifyMagicBytes(filePath, ext) {
  try {
    const buffer = Buffer.alloc(1024);
    const fd = fs.openSync(filePath, 'r');
    const bytesRead = fs.readSync(fd, buffer, 0, 1024, 0);
    fs.closeSync(fd);
    const slice = buffer.subarray(0, bytesRead);
    const lowerExt = ext.toLowerCase();

    // 1. PDF: Bắt đầu bằng %PDF (0x25, 0x50, 0x44, 0x46)
    if (lowerExt === 'pdf') {
      return slice.length >= 4 &&
        slice[0] === 0x25 && slice[1] === 0x50 && slice[2] === 0x44 && slice[3] === 0x46;
    }

    // 2. docx, xlsx, pptx, zip: Bắt đầu bằng PK (0x50, 0x4B)
    if (['docx', 'xlsx', 'pptx', 'zip'].includes(lowerExt)) {
      return slice.length >= 2 && slice[0] === 0x50 && slice[1] === 0x4B;
    }

    // 3. doc, xls, ppt: Bắt đầu bằng D0 CF 11 E0 (0xD0, 0xCF, 0x11, 0xE0)
    if (['doc', 'xls', 'ppt'].includes(lowerExt)) {
      return slice.length >= 4 &&
        slice[0] === 0xD0 && slice[1] === 0xCF && slice[2] === 0x11 && slice[3] === 0xE0;
    }

    // 4. csv, txt, md, py, ipynb: File văn bản text, không chứa byte NUL (0x00)
    if (['csv', 'txt', 'md', 'py', 'ipynb'].includes(lowerExt)) {
      for (let i = 0; i < slice.length; i++) {
        if (slice[i] === 0x00) return false;
      }
      return true;
    }

    return false;
  } catch (err) {
    console.error('Lỗi khi đọc magic bytes:', err.message);
    return false;
  }
}

// Xóa file rác nếu xử lý thất bại
function removeTempFile(filePath) {
  try {
    if (filePath && fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  } catch (e) {
    console.error('Lỗi khi dọn file rác:', e.message);
  }
}

// 1. TẢI LÊN TÀI LIỆU MỚI (POST /api/resources)
exports.createResource = async (req, res) => {
  const file = req.file;
  if (!file) {
    return res.status(400).json({ error: 'Vui lòng chọn một file để tải lên' });
  }

  // Kiểm tra trạng thái tài khoản: 'banned' hoặc 'pending' không được upload
  if (req.user.status === 'banned') {
    removeTempFile(file.path);
    return res.status(403).json({ error: 'Tài khoản của bạn đã bị khóa (banned), không thể tải lên tài liệu' });
  }
  if (req.user.status === 'pending') {
    removeTempFile(file.path);
    return res.status(403).json({ error: 'Tài khoản của bạn đang chờ phê duyệt (pending), không thể tải lên tài liệu' });
  }

  const ext = path.extname(file.originalname).replace('.', '').toLowerCase();
  const allowedExts = ['pdf', 'doc', 'docx', 'ppt', 'pptx', 'xls', 'xlsx', 'csv', 'zip', 'py', 'ipynb', 'txt', 'md'];

  if (!allowedExts.includes(ext)) {
    removeTempFile(file.path);
    return res.status(400).json({ error: `Định dạng file .${ext} không được hỗ trợ` });
  }

  // Kiểm tra chữ ký file (Magic bytes)
  if (!verifyMagicBytes(file.path, ext)) {
    removeTempFile(file.path);
    return res.status(400).json({ error: 'Nội dung file không khớp với định dạng mở rộng hoặc chứa mã độc hại' });
  }

  // Validate các trường dữ liệu người dùng
  const rawTitle = (req.body.title || '').trim();
  const rawSubject = (req.body.subject || '').trim() || 'Chung';
  const rawDesc = (req.body.description || '').trim();
  const rawType = (req.body.type || '').trim().toLowerCase();

  if (!rawTitle) {
    removeTempFile(file.path);
    return res.status(400).json({ error: 'Tiêu đề tài liệu là bắt buộc' });
  }
  if (rawTitle.length > 255) {
    removeTempFile(file.path);
    return res.status(400).json({ error: 'Tiêu đề không được vượt quá 255 ký tự' });
  }
  if (rawSubject.length > 100) {
    removeTempFile(file.path);
    return res.status(400).json({ error: 'Môn học không được vượt quá 100 ký tự' });
  }
  if (rawDesc.length > 2000) {
    removeTempFile(file.path);
    return res.status(400).json({ error: 'Mô tả không được vượt quá 2000 ký tự' });
  }

  const validTypes = ['document', 'code', 'template', 'dataset'];
  const finalType = validTypes.includes(rawType) ? rawType : 'document';

  try {
    const [result] = await db.query(`
      INSERT INTO resources (
        user_id, title, description, type, extension,
        original_name, stored_name, file_size_bytes, mime_type, subject, downloads
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0)
    `, [
      req.user.id,
      rawTitle,
      rawDesc || null,
      finalType,
      ext.toUpperCase(),
      file.originalname,
      file.filename,
      file.size,
      file.mimetype || 'application/octet-stream',
      rawSubject
    ]);

    const newId = result.insertId;

    // Phát thông báo tài nguyên mới nếu uploader là owner, admin, hoặc staff
    try {
      if (['owner', 'admin', 'staff'].includes(req.user.role)) {
        const { notifyAllActive } = require('../utils/notify');
        notifyAllActive(req.user.id, 'resource', {
          resourceId: newId,
          meta: rawTitle
        }).catch(err => {
          console.error('Lỗi khi phát thông báo tài nguyên mới:', err);
        });
      }
    } catch (notifErr) {
      console.error('Lỗi khởi tạo thông báo tài nguyên mới:', notifErr);
    }

    res.status(201).json({
      success: true,
      message: 'Tải lên tài liệu thành công!',
      resource: {
        id: newId,
        user_id: req.user.id,
        title: rawTitle,
        description: rawDesc || null,
        type: finalType,
        extension: ext.toUpperCase(),
        original_name: file.originalname,
        file_size_bytes: file.size,
        sizeLabel: formatSizeLabel(file.size),
        subject: rawSubject,
        downloads: 0,
        uploader: {
          full_name: req.user.full_name || req.user.username,
          role: req.user.role
        },
        favoritedByMe: false,
        created_at: new Date().toISOString()
      }
    });
  } catch (dbErr) {
    removeTempFile(file.path);
    console.error('Lỗi khi lưu tài liệu vào CSDL:', dbErr);
    res.status(500).json({ error: 'Không thể lưu thông tin tài liệu' });
  }
};

// 2. LẤY DANH SÁCH TÀI LIỆU (GET /api/resources)
exports.getAllResources = async (req, res) => {
  try {
    const { q, type, subject, extension, sort } = req.query;
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const limit = Math.min(Math.max(parseInt(req.query.limit) || 10, 1), 50);
    const offset = (page - 1) * limit;

    const conditions = [];
    const params = [];

    // Tìm kiếm từ khóa q trong title, subject, original_name
    if (q && q.trim()) {
      const keyword = `%${q.trim()}%`;
      conditions.push('(r.title LIKE ? OR r.subject LIKE ? OR r.original_name LIKE ?)');
      params.push(keyword, keyword, keyword);
    }

    // Lọc theo loại tài liệu (type)
    if (type && type !== 'all') {
      conditions.push('r.type = ?');
      params.push(type.toLowerCase());
    }

    // Lọc theo môn học (subject)
    if (subject && subject !== 'all') {
      conditions.push('r.subject = ?');
      params.push(subject);
    }

    // Lọc theo định dạng mở rộng (extension)
    if (extension && extension !== 'all') {
      conditions.push('r.extension = ?');
      params.push(extension.toUpperCase());
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

    // Sắp xếp
    let orderClause = 'ORDER BY r.created_at DESC';
    if (sort === 'oldest') orderClause = 'ORDER BY r.created_at ASC';
    else if (sort === 'name') orderClause = 'ORDER BY r.title ASC';
    else if (sort === 'size') orderClause = 'ORDER BY r.file_size_bytes DESC';

    // Đếm tổng số kết quả
    const countSql = `SELECT COUNT(*) as total FROM resources r ${whereClause}`;
    const [countRows] = await db.query(countSql, params);
    const total = countRows[0].total;

    // Lấy danh sách kết quả kèm thông tin người đăng và trạng thái yêu thích
    const currentUserId = req.user ? req.user.id : null;
    const listSql = `
      SELECT 
        r.id, r.user_id, r.title, r.description, r.type, r.extension,
        r.original_name, r.file_size_bytes, r.mime_type, r.subject, r.downloads,
        r.created_at, r.updated_at,
        u.full_name AS uploader_name, u.username AS uploader_username, u.role AS uploader_role,
        (rf.resource_id IS NOT NULL) AS favoritedByMe
      FROM resources r
      LEFT JOIN users u ON r.user_id = u.id
      LEFT JOIN resource_favorites rf ON rf.resource_id = r.id AND rf.user_id = ?
      ${whereClause}
      ${orderClause}
      LIMIT ? OFFSET ?
    `;

    const listParams = [currentUserId, ...params, limit, offset];
    const [rows] = await db.query(listSql, listParams);

    const items = rows.map((r) => ({
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
      updated_at: r.updated_at,
      uploader: r.user_id ? {
        full_name: r.uploader_name || r.uploader_username,
        role: r.uploader_role
      } : {
        full_name: 'Cựu thành viên',
        role: 'member'
      },
      favoritedByMe: Boolean(r.favoritedByMe)
    }));

    res.json({
      success: true,
      items,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (err) {
    console.error('Lỗi khi lấy danh sách tài liệu:', err);
    res.status(500).json({ error: 'Không thể tải danh sách tài liệu' });
  }
};

// 3. THỐNG KÊ (GET /api/resources/stats)
exports.getStats = async (req, res) => {
  try {
    const [typeRows] = await db.query(`
      SELECT type, COUNT(*) as count 
      FROM resources 
      GROUP BY type
    `);

    const categories = { document: 0, code: 0, template: 0, dataset: 0 };
    typeRows.forEach((r) => {
      if (categories[r.type] !== undefined) {
        categories[r.type] = Number(r.count);
      }
    });

    const [subjectRows] = await db.query(`
      SELECT DISTINCT subject 
      FROM resources 
      WHERE subject IS NOT NULL AND TRIM(subject) != ''
      ORDER BY subject ASC
    `);

    const subjects = subjectRows.map((r) => r.subject.trim());

    const [totalRows] = await db.query('SELECT COUNT(*) as total FROM resources');
    const total = Number(totalRows[0].total);

    res.json({
      success: true,
      categories,
      subjects,
      total
    });
  } catch (err) {
    console.error('Lỗi khi lấy thống kê:', err);
    res.status(500).json({ error: 'Không thể lấy thông tin thống kê' });
  }
};

// 4. TÀI LIỆU MỚI NHẤT (GET /api/resources/recent)
exports.getRecent = async (req, res) => {
  try {
    const limit = Math.min(Math.max(parseInt(req.query.limit) || 4, 1), 10);
    const currentUserId = req.user ? req.user.id : null;

    const [rows] = await db.query(`
      SELECT 
        r.id, r.user_id, r.title, r.type, r.extension, r.file_size_bytes,
        r.subject, r.downloads, r.created_at,
        u.full_name AS uploader_name, u.username AS uploader_username, u.role AS uploader_role,
        (rf.resource_id IS NOT NULL) AS favoritedByMe
      FROM resources r
      LEFT JOIN users u ON r.user_id = u.id
      LEFT JOIN resource_favorites rf ON rf.resource_id = r.id AND rf.user_id = ?
      ORDER BY r.created_at DESC
      LIMIT ?
    `, [currentUserId, limit]);

    const items = rows.map((r) => ({
      id: r.id,
      title: r.title,
      type: r.type,
      extension: r.extension,
      file_size_bytes: r.file_size_bytes,
      sizeLabel: formatSizeLabel(r.file_size_bytes),
      subject: r.subject,
      downloads: r.downloads,
      created_at: r.created_at,
      uploader: r.user_id ? {
        full_name: r.uploader_name || r.uploader_username,
        role: r.uploader_role
      } : {
        full_name: 'Cựu thành viên',
        role: 'member'
      },
      favoritedByMe: Boolean(r.favoritedByMe)
    }));

    res.json({ success: true, items });
  } catch (err) {
    console.error('Lỗi khi lấy tài liệu mới nhất:', err);
    res.status(500).json({ error: 'Không thể tải danh sách tài liệu mới nhất' });
  }
};

// 5. CHI TIẾT TÀI LIỆU (GET /api/resources/:id)
exports.getResourceById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (!id) return res.status(400).json({ error: 'ID tài liệu không hợp lệ' });

    const currentUserId = req.user ? req.user.id : null;

    const [rows] = await db.query(`
      SELECT 
        r.id, r.user_id, r.title, r.description, r.type, r.extension,
        r.original_name, r.file_size_bytes, r.mime_type, r.subject, r.downloads,
        r.created_at, r.updated_at,
        u.full_name AS uploader_name, u.username AS uploader_username, u.role AS uploader_role,
        (rf.resource_id IS NOT NULL) AS favoritedByMe
      FROM resources r
      LEFT JOIN users u ON r.user_id = u.id
      LEFT JOIN resource_favorites rf ON rf.resource_id = r.id AND rf.user_id = ?
      WHERE r.id = ?
    `, [currentUserId, id]);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Tài liệu không tồn tại' });
    }

    const r = rows[0];

    // Lấy tài liệu liên quan (cùng subject hoặc cùng type, tối đa 4, trừ chính nó)
    const [relatedRows] = await db.query(`
      SELECT 
        r.id, r.title, r.type, r.extension, r.file_size_bytes, r.subject, r.downloads, r.created_at
      FROM resources r
      WHERE r.id != ? AND (r.subject = ? OR r.type = ?)
      ORDER BY r.created_at DESC
      LIMIT 4
    `, [id, r.subject, r.type]);

    const related = relatedRows.map((item) => ({
      id: item.id,
      title: item.title,
      type: item.type,
      extension: item.extension,
      sizeLabel: formatSizeLabel(item.file_size_bytes),
      subject: item.subject,
      downloads: item.downloads,
      created_at: item.created_at
    }));

    res.json({
      success: true,
      resource: {
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
        updated_at: r.updated_at,
        uploader: r.user_id ? {
          full_name: r.uploader_name || r.uploader_username,
          role: r.uploader_role
        } : {
          full_name: 'Cựu thành viên',
          role: 'member'
        },
        favoritedByMe: Boolean(r.favoritedByMe)
      },
      related
    });
  } catch (err) {
    console.error('Lỗi khi lấy chi tiết tài liệu:', err);
    res.status(500).json({ error: 'Không thể lấy thông tin chi tiết tài liệu' });
  }
};

// 6. XEM TRƯỚC TÀI LIỆU (GET /api/resources/:id/preview)
exports.previewResource = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (!id) return res.status(400).json({ error: 'ID không hợp lệ' });

    const [rows] = await db.query('SELECT * FROM resources WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Tài liệu không tồn tại' });
    }

    const resource = rows[0];
    const filePath = path.join(STORAGE_DIR, resource.stored_name);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'File vật lý không tìm thấy trên máy chủ' });
    }

    const ext = resource.extension.toLowerCase();

    // PDF: Trả về inline stream
    if (ext === 'pdf') {
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `inline; filename="${encodeURIComponent(resource.original_name)}"`);
      res.setHeader('X-Content-Type-Options', 'nosniff');
      return fs.createReadStream(filePath).pipe(res);
    }

    // Code / Text / CSV: Đọc tối đa 5KB / 20 dòng đầu
    if (['csv', 'txt', 'md', 'py', 'ipynb'].includes(ext)) {
      const buffer = Buffer.alloc(5120);
      const fd = fs.openSync(filePath, 'r');
      const bytesRead = fs.readSync(fd, buffer, 0, 5120, 0);
      fs.closeSync(fd);

      let textContent = buffer.toString('utf-8', 0, bytesRead);
      const lines = textContent.split(/\r?\n/).slice(0, 20);
      textContent = lines.join('\n');

      res.setHeader('Content-Type', 'text/plain; charset=utf-8');
      res.setHeader('X-Content-Type-Options', 'nosniff');
      return res.send(textContent);
    }

    // Các loại khác (docx, pptx, zip...): Trả metadata, không cố render
    return res.json({
      previewable: false,
      type: resource.type,
      extension: resource.extension,
      message: 'Định dạng này không hỗ trợ xem trước trực tiếp, vui lòng tải về để xem đầy đủ.'
    });
  } catch (err) {
    console.error('Lỗi khi xem trước tài liệu:', err);
    res.status(500).json({ error: 'Không thể xem trước tài liệu này' });
  }
};

// 7. TẢI FILE VỀ (GET /api/resources/:id/download)
exports.downloadResource = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (!id) return res.status(400).json({ error: 'ID không hợp lệ' });

    const [rows] = await db.query('SELECT * FROM resources WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Tài liệu không tồn tại' });
    }

    const resource = rows[0];
    const filePath = path.join(STORAGE_DIR, resource.stored_name);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'File vật lý không tìm thấy trên máy chủ' });
    }

    // Tăng số lượt tải lên 1
    await db.query('UPDATE resources SET downloads = downloads + 1 WHERE id = ?', [id]);

    const safeFilename = resource.original_name.replace(/[^\w\s\u00C0-\u1EF9.-]/gi, '_');

    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.download(filePath, safeFilename, (err) => {
      if (err && !res.headersSent) {
        console.error('Lỗi khi truyền tải file:', err);
        res.status(500).json({ error: 'Không thể tải file về lúc này' });
      }
    });
  } catch (err) {
    console.error('Lỗi khi tải file:', err);
    res.status(500).json({ error: 'Không thể tải file về' });
  }
};

// 8. CHỈNH SỬA TÀI LIỆU (PUT /api/resources/:id)
exports.updateResource = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (!id) return res.status(400).json({ error: 'ID không hợp lệ' });

    const [rows] = await db.query('SELECT * FROM resources WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Tài liệu không tồn tại' });
    }

    const resource = rows[0];

    // Kiểm tra quyền: chỉ người upload hoặc admin/owner
    const isOwnerOrAdmin = ['admin', 'owner'].includes(req.user.role);
    const isAuthor = resource.user_id && resource.user_id === req.user.id;

    if (!isOwnerOrAdmin && !isAuthor) {
      return res.status(403).json({ error: 'Bạn không có quyền chỉnh sửa tài liệu này' });
    }

    const rawTitle = (req.body.title || '').trim();
    const rawSubject = (req.body.subject || '').trim();
    const rawDesc = (req.body.description || '').trim();
    const rawType = (req.body.type || '').trim().toLowerCase();

    if (!rawTitle) {
      return res.status(400).json({ error: 'Tiêu đề không được để trống' });
    }
    if (rawTitle.length > 255) {
      return res.status(400).json({ error: 'Tiêu đề không được vượt quá 255 ký tự' });
    }
    if (rawSubject && rawSubject.length > 100) {
      return res.status(400).json({ error: 'Môn học không được vượt quá 100 ký tự' });
    }
    if (rawDesc && rawDesc.length > 2000) {
      return res.status(400).json({ error: 'Mô tả không được vượt quá 2000 ký tự' });
    }

    const validTypes = ['document', 'code', 'template', 'dataset'];
    const finalType = validTypes.includes(rawType) ? rawType : resource.type;
    const finalSubject = rawSubject || resource.subject || 'Chung';

    await db.query(`
      UPDATE resources 
      SET title = ?, description = ?, subject = ?, type = ?
      WHERE id = ?
    `, [rawTitle, rawDesc || null, finalSubject, finalType, id]);

    res.json({
      success: true,
      message: 'Cập nhật tài liệu thành công!',
      resource: {
        id,
        title: rawTitle,
        description: rawDesc || null,
        subject: finalSubject,
        type: finalType
      }
    });
  } catch (err) {
    console.error('Lỗi khi cập nhật tài liệu:', err);
    res.status(500).json({ error: 'Không thể cập nhật tài liệu' });
  }
};

// 9. XÓA TÀI LIỆU (DELETE /api/resources/:id)
exports.deleteResource = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (!id) return res.status(400).json({ error: 'ID không hợp lệ' });

    const [rows] = await db.query('SELECT * FROM resources WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Tài liệu không tồn tại' });
    }

    const resource = rows[0];

    // Kiểm tra quyền: chỉ người upload hoặc admin/owner
    const isOwnerOrAdmin = ['admin', 'owner'].includes(req.user.role);
    const isAuthor = resource.user_id && resource.user_id === req.user.id;

    if (!isOwnerOrAdmin && !isAuthor) {
      return res.status(403).json({ error: 'Bạn không có quyền xóa tài liệu này' });
    }

    // Xóa bản ghi trong CSDL (khóa ngoại CASCADE sẽ tự xóa bản ghi trong resource_favorites)
    await db.query('DELETE FROM resources WHERE id = ?', [id]);

    // Xóa file vật lý trên đĩa
    const filePath = path.join(STORAGE_DIR, resource.stored_name);
    try {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    } catch (fsErr) {
      console.error(`Cảnh báo: Không thể xóa file vật lý (${filePath}):`, fsErr.message);
    }

    res.json({
      success: true,
      message: 'Đã xóa tài liệu thành công!'
    });
  } catch (err) {
    console.error('Lỗi khi xóa tài liệu:', err);
    res.status(500).json({ error: 'Không thể xóa tài liệu' });
  }
};

// 10. TOGGLE YÊU THÍCH (POST /api/resources/:id/favorite)
exports.toggleFavorite = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (!id) return res.status(400).json({ error: 'ID không hợp lệ' });

    const [rows] = await db.query('SELECT id FROM resources WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Tài liệu không tồn tại' });
    }

    const [favRows] = await db.query(`
      SELECT 1 FROM resource_favorites 
      WHERE resource_id = ? AND user_id = ?
    `, [id, req.user.id]);

    if (favRows.length > 0) {
      // Đã thích -> Bỏ thích
      await db.query(`
        DELETE FROM resource_favorites 
        WHERE resource_id = ? AND user_id = ?
      `, [id, req.user.id]);
      return res.json({ success: true, favorited: false, message: 'Đã bỏ yêu thích tài liệu' });
    } else {
      // Chưa thích -> Thêm vào yêu thích
      await db.query(`
        INSERT INTO resource_favorites (resource_id, user_id) 
        VALUES (?, ?)
      `, [id, req.user.id]);
      return res.json({ success: true, favorited: true, message: 'Đã thêm vào mục yêu thích' });
    }
  } catch (err) {
    console.error('Lỗi khi toggle yêu thích:', err);
    res.status(500).json({ error: 'Không thể thực hiện thao tác yêu thích' });
  }
};

// 11. DANH SÁCH YÊU THÍCH CỦA TÔI (GET /api/resources/favorites)
exports.getFavorites = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT 
        r.id, r.user_id, r.title, r.description, r.type, r.extension,
        r.original_name, r.file_size_bytes, r.mime_type, r.subject, r.downloads,
        r.created_at, r.updated_at,
        u.full_name AS uploader_name, u.username AS uploader_username, u.role AS uploader_role,
        1 AS favoritedByMe
      FROM resource_favorites rf
      JOIN resources r ON r.id = rf.resource_id
      LEFT JOIN users u ON r.user_id = u.id
      WHERE rf.user_id = ?
      ORDER BY rf.created_at DESC
    `, [req.user.id]);

    const items = rows.map((r) => ({
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
      uploader: r.user_id ? {
        full_name: r.uploader_name || r.uploader_username,
        role: r.uploader_role
      } : {
        full_name: 'Cựu thành viên',
        role: 'member'
      },
      favoritedByMe: true
    }));

    res.json({ success: true, items });
  } catch (err) {
    console.error('Lỗi khi lấy danh sách yêu thích:', err);
    res.status(500).json({ error: 'Không thể tải danh sách tài liệu yêu thích' });
  }
};
