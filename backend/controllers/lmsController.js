const db = require('../config/db');
const fs = require('fs');
const path = require('path');
const { execFile } = require('child_process');
const { extractYouTubeId, canonicalWatchUrl, thumbnailUrl } = require('../utils/youtube');

function getVideoDurationSeconds(filePath) {
  return new Promise((resolve) => {
    execFile('ffprobe', [
      '-v', 'error',
      '-show_entries', 'format=duration',
      '-of', 'default=noprint_wrappers=1:nokey=1',
      filePath
    ], (err, stdout) => {
      if (err || !stdout) return resolve(null);
      const dur = parseFloat(stdout.trim());
      resolve(isNaN(dur) ? null : dur);
    });
  });
}

function formatDuration(sec) {
  if (!sec || isNaN(sec)) return null;
  const totalSec = Math.round(sec);
  const m = Math.floor(totalSec / 60);
  const s = totalSec % 60;
  if (m > 0 && s > 0) return `${m} phút ${s < 10 ? '0' + s : s} giây`;
  if (m > 0) return `${m} phút`;
  return `${s} giây`;
}

// 1. LẤY TẤT CẢ MÔN HỌC (COURSES / SUBJECTS)
exports.getAllCourses = async (req, res) => {
  try {
    const [courses] = await db.query(`
      SELECT c.*, COUNT(l.id) AS lecture_count
      FROM courses c
      LEFT JOIN lectures l ON c.id = l.course_id
      GROUP BY c.id
      ORDER BY c.id ASC
    `);
    res.json({ success: true, courses });
  } catch (error) {
    console.error('Error getAllCourses:', error);
    res.status(500).json({ error: 'Lỗi máy chủ khi lấy danh sách môn học' });
  }
};

// 2. CHI TIẾT 1 MÔN HỌC
exports.getCourseById = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await db.query('SELECT * FROM courses WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Không tìm thấy môn học' });
    }
    res.json({ success: true, course: rows[0] });
  } catch (error) {
    console.error('Error getCourseById:', error);
    res.status(500).json({ error: 'Lỗi máy chủ' });
  }
};

// 3. TẠO MÔN HỌC MỚI (Admin / Owner / Staff)
exports.createCourse = async (req, res) => {
  try {
    const {
      code,
      name,
      title,
      term = 'Kỳ II',
      description = '',
      icon = 'subject1-icon',
      gradient_from = '#38bdf8',
      gradient_to = '#0284c7',
      status = 'active'
    } = req.body;

    if (!code || !name || !title) {
      return res.status(400).json({ error: 'Mã môn, tên và tiêu đề môn học là bắt buộc' });
    }

    // Kiểm tra trùng code
    const [existing] = await db.query('SELECT id FROM courses WHERE code = ?', [code]);
    if (existing.length > 0) {
      return res.status(400).json({ error: `Mã môn ${code} đã tồn tại trong hệ thống` });
    }

    const [result] = await db.query(`
      INSERT INTO courses (code, name, title, term, description, icon, gradient_from, gradient_to, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [code.toUpperCase().trim(), name.trim(), title.trim(), term.trim(), description, icon, gradient_from, gradient_to, status]);

    const newId = result.insertId;
    const [created] = await db.query('SELECT * FROM courses WHERE id = ?', [newId]);

    res.status(201).json({
      success: true,
      message: 'Tạo môn học thành công!',
      course: created[0]
    });
  } catch (error) {
    console.error('Error createCourse:', error);
    res.status(500).json({ error: 'Lỗi khi tạo môn học: ' + error.message });
  }
};

// 4. CẬP NHẬT MÔN HỌC (Admin / Owner / Staff)
exports.updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const { code, name, title, term, description, icon, gradient_from, gradient_to, status } = req.body;

    const [existing] = await db.query('SELECT id FROM courses WHERE id = ?', [id]);
    if (existing.length === 0) {
      return res.status(404).json({ error: 'Không tìm thấy môn học' });
    }

    const updates = [];
    const values = [];

    if (code) { updates.push('code = ?'); values.push(code.toUpperCase().trim()); }
    if (name) { updates.push('name = ?'); values.push(name.trim()); }
    if (title) { updates.push('title = ?'); values.push(title.trim()); }
    if (term) { updates.push('term = ?'); values.push(term.trim()); }
    if (description !== undefined) { updates.push('description = ?'); values.push(description); }
    if (icon) { updates.push('icon = ?'); values.push(icon); }
    if (gradient_from) { updates.push('gradient_from = ?'); values.push(gradient_from); }
    if (gradient_to) { updates.push('gradient_to = ?'); values.push(gradient_to); }
    if (status) { updates.push('status = ?'); values.push(status); }

    if (updates.length === 0) {
      return res.status(400).json({ error: 'Không có dữ liệu để cập nhật' });
    }

    values.push(id);
    await db.query(`UPDATE courses SET ${updates.join(', ')} WHERE id = ?`, values);

    const [updated] = await db.query('SELECT * FROM courses WHERE id = ?', [id]);
    res.json({ success: true, message: 'Cập nhật môn học thành công', course: updated[0] });
  } catch (error) {
    console.error('Error updateCourse:', error);
    res.status(500).json({ error: 'Lỗi khi cập nhật môn học' });
  }
};

// 5. XÓA MÔN HỌC (Admin / Owner)
exports.deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await db.query('DELETE FROM courses WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Không tìm thấy môn học để xóa' });
    }
    res.json({ success: true, message: 'Đã xóa môn học thành công' });
  } catch (error) {
    console.error('Error deleteCourse:', error);
    res.status(500).json({ error: 'Lỗi khi xóa môn học' });
  }
};

// 6. LẤY DANH SÁCH BÀI GIẢNG CỦA 1 MÔN
exports.getCourseLectures = async (req, res) => {
  try {
    const { courseId } = req.params;
    const [lectures] = await db.query(`
      SELECT id, course_id, chapter_order, title, type, duration_min, video_url, description,
             status, video_source, youtube_id, thumbnail_url,
             DATE_FORMAT(created_at, '%Y-%m-%d') AS dateAdded
      FROM lectures
      WHERE course_id = ?
      ORDER BY chapter_order ASC, id ASC
    `, [courseId]);

    res.json({ success: true, lectures });
  } catch (error) {
    console.error('Error getCourseLectures:', error);
    res.status(500).json({ error: 'Lỗi khi lấy danh sách bài giảng' });
  }
};

// 7. CHI TIẾT 1 BÀI GIẢNG (Đầy đủ Overview, Resources, Comments)
exports.getLectureDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await db.query(`
      SELECT l.*, c.name AS course_name, c.title AS course_title, c.code AS course_code,
             c.gradient_from, c.gradient_to, c.icon AS course_icon
      FROM lectures l
      JOIN courses c ON l.course_id = c.id
      WHERE l.id = ?
    `, [id]);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Không tìm thấy bài giảng' });
    }

    const lecture = rows[0];
    if (typeof lecture.key_takeaways === 'string') {
      try { lecture.key_takeaways = JSON.parse(lecture.key_takeaways); } catch (e) {}
    }

    // Lấy resources
    const [resources] = await db.query('SELECT * FROM lecture_resources WHERE lecture_id = ? ORDER BY id ASC', [id]);
    lecture.resources = resources;

    // Lấy comments
    const [comments] = await db.query(`
      SELECT id, user_id, user_name, user_role, user_avatar, content, DATE_FORMAT(created_at, '%H:%i %d/%m/%Y') AS created_at
      FROM lecture_comments
      WHERE lecture_id = ?
      ORDER BY id DESC
    `, [id]);
    lecture.comments = comments;

    res.json({ success: true, lecture });
  } catch (error) {
    console.error('Error getLectureDetail:', error);
    res.status(500).json({ error: 'Lỗi khi lấy chi tiết bài giảng' });
  }
};

// 8. TẠO BÀI GIẢNG MỚI (Admin / Owner / Staff)
exports.createLecture = async (req, res) => {
  let conn;
  try {
    const {
      course_id,
      title,
      chapter_order = 1,
      type = 'video',
      duration_min,
      video_url = '',
      description = '',
      key_takeaways = [],
      overview_html = '',
      status = 'in-progress',
      resources = [],
      video_source = 'file'
    } = req.body;

    if (!course_id || !title) {
      return res.status(400).json({ error: 'ID khóa học và tiêu đề bài giảng là bắt buộc' });
    }

    if (video_source !== 'file' && video_source !== 'youtube') {
      return res.status(400).json({ error: 'Nguồn video không hợp lệ (chỉ chấp nhận "file" hoặc "youtube")' });
    }

    let finalVideoUrl = typeof video_url === 'string' ? video_url.trim() : '';
    let finalYoutubeId = null;
    let finalThumbnailUrl = null;
    let finalDurationMin = 15;

    if (video_source === 'youtube') {
      const rawInput = req.body.youtube_id || finalVideoUrl;
      const extractedId = extractYouTubeId(rawInput);
      if (!extractedId) {
        return res.status(400).json({ error: 'Link YouTube không hợp lệ' });
      }
      finalYoutubeId = extractedId;
      finalVideoUrl = canonicalWatchUrl(extractedId);
      finalThumbnailUrl = thumbnailUrl(extractedId);

      const parsedDur = parseInt(duration_min, 10);
      if (isNaN(parsedDur) || parsedDur < 1) {
        return res.status(400).json({ error: 'Vui lòng nhập thời lượng bài giảng (số phút >= 1)' });
      }
      finalDurationMin = parsedDur;
    } else {
      // video_source === 'file'
      const parsedDur = parseInt(duration_min, 10);
      if (!isNaN(parsedDur) && parsedDur >= 1) {
        finalDurationMin = parsedDur;
      }
    }

    const takeawaysJson = Array.isArray(key_takeaways) ? JSON.stringify(key_takeaways) : JSON.stringify([]);

    conn = await db.getConnection();
    await conn.beginTransaction();

    const [result] = await conn.query(`
      INSERT INTO lectures (course_id, chapter_order, title, type, duration_min, video_url, description, key_takeaways, overview_html, status, video_source, youtube_id, thumbnail_url)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [course_id, chapter_order, title.trim(), type, finalDurationMin, finalVideoUrl, description, takeawaysJson, overview_html, status, video_source, finalYoutubeId, finalThumbnailUrl]);

    const newLectureId = result.insertId;

    // Đính kèm resources nếu có
    if (Array.isArray(resources) && resources.length > 0) {
      for (const r of resources) {
        if (r.title && r.url) {
          await conn.query(`
            INSERT INTO lecture_resources (lecture_id, title, type, size, url)
            VALUES (?, ?, ?, ?, ?)
          `, [newLectureId, r.title, r.type || 'pdf', r.size || '1.0 MB', r.url]);
        }
      }
    }

    await conn.commit();

    res.status(201).json({
      success: true,
      message: 'Tạo bài giảng mới thành công!',
      lectureId: newLectureId
    });
  } catch (error) {
    if (conn) await conn.rollback();
    console.error('Error createLecture:', error);
    res.status(500).json({ error: 'Lỗi khi tạo bài giảng: ' + error.message });
  } finally {
    if (conn) conn.release();
  }
};

// 9. CẬP NHẬT BÀI GIẢNG (Admin / Owner / Staff)
exports.updateLecture = async (req, res) => {
  let conn;
  try {
    const { id } = req.params;
    const {
      course_id,
      title,
      chapter_order,
      type,
      duration_min,
      video_url,
      description,
      key_takeaways,
      overview_html,
      status,
      resources,
      video_source,
      youtube_id
    } = req.body;

    conn = await db.getConnection();
    await conn.beginTransaction();

    const [existing] = await conn.query('SELECT id, video_source, youtube_id, video_url FROM lectures WHERE id = ?', [id]);
    if (existing.length === 0) {
      await conn.rollback();
      return res.status(404).json({ error: 'Không tìm thấy bài giảng để cập nhật' });
    }

    const currentLecture = existing[0];

    if (video_source !== undefined && video_source !== 'file' && video_source !== 'youtube') {
      await conn.rollback();
      return res.status(400).json({ error: 'Nguồn video không hợp lệ (chỉ chấp nhận "file" hoặc "youtube")' });
    }

    const targetSource = video_source !== undefined ? video_source : (currentLecture.video_source || 'file');

    const updates = [];
    const values = [];

    if (course_id) { updates.push('course_id = ?'); values.push(course_id); }
    if (title) { updates.push('title = ?'); values.push(title.trim()); }
    if (chapter_order !== undefined) { updates.push('chapter_order = ?'); values.push(chapter_order); }
    if (type) { updates.push('type = ?'); values.push(type); }

    if (duration_min !== undefined) {
      const parsedDur = parseInt(duration_min, 10);
      if (isNaN(parsedDur) || parsedDur < 1) {
        await conn.rollback();
        return res.status(400).json({ error: 'Thời lượng bài giảng phải là số nguyên lớn hơn hoặc bằng 1 phút' });
      }
      updates.push('duration_min = ?');
      values.push(parsedDur);
    }

    if (targetSource === 'youtube') {
      const rawInput = youtube_id || video_url || (targetSource === currentLecture.video_source ? (currentLecture.youtube_id || currentLecture.video_url) : null);
      if (video_source === 'youtube' || video_url !== undefined || youtube_id !== undefined) {
        const extractedId = extractYouTubeId(rawInput);
        if (!extractedId) {
          await conn.rollback();
          return res.status(400).json({ error: 'Link YouTube không hợp lệ' });
        }
        updates.push('video_source = ?', 'youtube_id = ?', 'thumbnail_url = ?', 'video_url = ?');
        values.push('youtube', extractedId, thumbnailUrl(extractedId), canonicalWatchUrl(extractedId));
      }
    } else {
      // targetSource === 'file'
      if (video_source === 'file') {
        updates.push('video_source = ?', 'youtube_id = ?', 'thumbnail_url = ?');
        values.push('file', null, null);
      }
      if (video_url !== undefined) {
        updates.push('video_url = ?');
        values.push(video_url.trim());
      }
    }

    if (description !== undefined) { updates.push('description = ?'); values.push(description); }
    if (key_takeaways !== undefined) {
      updates.push('key_takeaways = ?');
      values.push(Array.isArray(key_takeaways) ? JSON.stringify(key_takeaways) : key_takeaways);
    }
    if (overview_html !== undefined) { updates.push('overview_html = ?'); values.push(overview_html); }
    if (status) { updates.push('status = ?'); values.push(status); }

    if (updates.length > 0) {
      values.push(id);
      await conn.query(`UPDATE lectures SET ${updates.join(', ')} WHERE id = ?`, values);
    }

    // Cập nhật resources nếu truyền mảng mới
    if (Array.isArray(resources)) {
      await conn.query('DELETE FROM lecture_resources WHERE lecture_id = ?', [id]);
      for (const r of resources) {
        if (r.title && r.url) {
          await conn.query(`
            INSERT INTO lecture_resources (lecture_id, title, type, size, url)
            VALUES (?, ?, ?, ?, ?)
          `, [id, r.title, r.type || 'pdf', r.size || '1.0 MB', r.url]);
        }
      }
    }

    await conn.commit();

    res.json({ success: true, message: 'Cập nhật bài giảng thành công' });
  } catch (error) {
    if (conn) await conn.rollback();
    console.error('Error updateLecture:', error);
    res.status(500).json({ error: 'Lỗi khi cập nhật bài giảng: ' + error.message });
  } finally {
    if (conn) conn.release();
  }
};

// 10. XÓA BÀI GIẢNG (Admin / Owner / Staff)
exports.deleteLecture = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await db.query('DELETE FROM lectures WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Không tìm thấy bài giảng để xóa' });
    }
    res.json({ success: true, message: 'Đã xóa bài giảng thành công' });
  } catch (error) {
    console.error('Error deleteLecture:', error);
    res.status(500).json({ error: 'Lỗi khi xóa bài giảng' });
  }
};

// 11. DUYỆT TÌM CÁC TỆP VIDEO CÓ SẴN TRONG THƯ MỤC document/Lectures/
exports.browseLocalVideos = async (req, res) => {
  try {
    const baseDir = path.join(__dirname, '../../document/Lectures');
    const videoFiles = [];

    function scanFolder(dir) {
      if (!fs.existsSync(dir)) return;
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          scanFolder(fullPath);
        } else if (/\.(mp4|webm|mov|mkv)$/i.test(entry.name)) {
          // Tính relative URL từ thư mục gốc dự án
          const relPath = path.relative(path.join(__dirname, '../../'), fullPath).replace(/\\/g, '/');
          const stat = fs.statSync(fullPath);
          const sizeMB = (stat.size / (1024 * 1024)).toFixed(1) + ' MB';
          videoFiles.push({
            name: entry.name,
            url: '/' + relPath,
            size: sizeMB,
            fullPath: fullPath
          });
        }
      }
    }

    scanFolder(baseDir);

    for (const v of videoFiles) {
      const durSec = await getVideoDurationSeconds(v.fullPath);
      if (durSec) {
        v.duration_sec = durSec;
        v.duration_min = Math.ceil(durSec / 60);
        v.formatted_duration = formatDuration(durSec);
      }
    }

    res.json({ success: true, videos: videoFiles });
  } catch (error) {
    console.error('Error browseLocalVideos:', error);
    res.status(500).json({ error: 'Lỗi khi duyệt video' });
  }
};

// 12. THẢO LUẬN / BÌNH LUẬN (COMMENTS)
exports.getComments = async (req, res) => {
  try {
    const { lectureId } = req.params;
    const [comments] = await db.query(`
      SELECT id, user_id, user_name, user_role, user_avatar, content, DATE_FORMAT(created_at, '%H:%i %d/%m/%Y') AS created_at
      FROM lecture_comments
      WHERE lecture_id = ?
      ORDER BY id DESC
    `, [lectureId]);
    res.json({ success: true, comments });
  } catch (error) {
    console.error('Error getComments:', error);
    res.status(500).json({ error: 'Lỗi khi lấy bình luận' });
  }
};

exports.addComment = async (req, res) => {
  try {
    const { lectureId } = req.params;
    const { content } = req.body;

    if (!content || !content.trim()) {
      return res.status(400).json({ error: 'Nội dung bình luận không được để trống' });
    }

    const userName = req.user?.username || req.body.userName || 'Thành viên';
    const userRole = req.user?.role || req.body.userRole || 'member';
    const userId = req.user?.id || null;
    const userAvatar = req.user?.avatar_url || userName.substring(0, 1).toUpperCase();

    const [result] = await db.query(`
      INSERT INTO lecture_comments (lecture_id, user_id, user_name, user_role, user_avatar, content)
      VALUES (?, ?, ?, ?, ?, ?)
    `, [lectureId, userId, userName, userRole, userAvatar, content.trim()]);

    const [created] = await db.query(`
      SELECT id, user_id, user_name, user_role, user_avatar, content, DATE_FORMAT(created_at, '%H:%i %d/%m/%Y') AS created_at
      FROM lecture_comments
      WHERE id = ?
    `, [result.insertId]);

    res.status(201).json({ success: true, comment: created[0] });
  } catch (error) {
    console.error('Error addComment:', error);
    res.status(500).json({ error: 'Lỗi khi thêm bình luận' });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    // Chỉ tác giả comment hoặc Staff/Admin/Owner được xóa
    const [comment] = await db.query('SELECT * FROM lecture_comments WHERE id = ?', [commentId]);
    if (comment.length === 0) {
      return res.status(404).json({ error: 'Không tìm thấy bình luận' });
    }

    const isAuthor = req.user && req.user.id && req.user.id === comment[0].user_id;
    const isPrivileged = req.user && ['owner', 'admin', 'staff'].includes(req.user.role);

    if (!isAuthor && !isPrivileged) {
      return res.status(403).json({ error: 'Bạn không có quyền xóa bình luận này' });
    }

    await db.query('DELETE FROM lecture_comments WHERE id = ?', [commentId]);
    res.json({ success: true, message: 'Đã xóa bình luận' });
  } catch (error) {
    console.error('Error deleteComment:', error);
    res.status(500).json({ error: 'Lỗi khi xóa bình luận' });
  }
};
