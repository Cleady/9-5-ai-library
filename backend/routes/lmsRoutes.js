const express = require('express');
const router = express.Router();
const lmsController = require('../controllers/lmsController');
const { verifyToken, isStaffAdminOwner } = require('../middlewares/authMiddleware');
const { extractYouTubeId, canonicalWatchUrl, thumbnailUrl } = require('../utils/youtube');

// === COURSES / SUBJECTS ===
// Lấy danh sách môn học (công khai cho học viên và khách)
router.get('/courses', lmsController.getAllCourses);
router.get('/courses/:id', lmsController.getCourseById);

// Thao tác môn học (chỉ Owner, Admin, Staff)
router.post('/courses', verifyToken, isStaffAdminOwner, lmsController.createCourse);
router.put('/courses/:id', verifyToken, isStaffAdminOwner, lmsController.updateCourse);
router.delete('/courses/:id', verifyToken, isStaffAdminOwner, lmsController.deleteCourse);

// === LECTURES ===
// Lấy danh sách chương của môn học
router.get('/courses/:courseId/lectures', lmsController.getCourseLectures);
// Chi tiết 1 bài giảng
router.get('/lectures/:id', lmsController.getLectureDetail);

// Quản trị bài giảng (chỉ Owner, Admin, Staff)
router.post('/courses/:courseId/lectures', verifyToken, isStaffAdminOwner, lmsController.createLecture);
router.post('/lectures', verifyToken, isStaffAdminOwner, lmsController.createLecture);
router.put('/lectures/:id', verifyToken, isStaffAdminOwner, lmsController.updateLecture);
router.delete('/lectures/:id', verifyToken, isStaffAdminOwner, lmsController.deleteLecture);

// Lấy thông tin oEmbed từ link YouTube (chỉ Owner, Admin, Staff)
router.get('/youtube-info', verifyToken, isStaffAdminOwner, async (req, res) => {
  try {
    const { url } = req.query;
    if (!url) {
      return res.status(400).json({ code: 'INVALID_LINK', error: 'Vui lòng cung cấp link hoặc ID YouTube' });
    }

    const youtubeId = extractYouTubeId(url);
    if (!youtubeId) {
      return res.status(400).json({ code: 'INVALID_LINK', error: 'Link YouTube không hợp lệ' });
    }

    const canonicalUrl = canonicalWatchUrl(youtubeId);
    const thumbUrl = thumbnailUrl(youtubeId);

    // Dựng cố định URL oEmbed từ ID để ngăn chặn triệt để tấn công SSRF
    const oembedUrl = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${youtubeId}&format=json`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    try {
      const upstreamRes = await fetch(oembedUrl, {
        signal: controller.signal,
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; 9.5-AI-LMS/1.0)'
        }
      });
      clearTimeout(timeoutId);

      if (upstreamRes.status === 200) {
        const data = await upstreamRes.json();
        return res.json({
          youtubeId,
          canonicalUrl,
          thumbnailUrl: thumbUrl,
          title: typeof data.title === 'string' ? data.title : '',
          authorName: typeof data.author_name === 'string' ? data.author_name : ''
        });
      }

      if (upstreamRes.status === 401 || upstreamRes.status === 403) {
        return res.status(422).json({
          code: 'EMBED_DISABLED',
          error: 'Video riêng tư hoặc đã tắt cho phép nhúng'
        });
      }

      if (upstreamRes.status === 404) {
        return res.status(404).json({
          code: 'NOT_FOUND',
          error: 'Video không tồn tại hoặc đã bị xóa'
        });
      }

      return res.status(502).json({
        code: 'UPSTREAM_UNAVAILABLE',
        error: `YouTube phản hồi mã lỗi HTTP ${upstreamRes.status}`
      });
    } catch (fetchErr) {
      clearTimeout(timeoutId);
      return res.status(502).json({
        code: 'UPSTREAM_UNAVAILABLE',
        error: 'Không thể kết nối tới máy chủ YouTube (quá thời gian chờ hoặc lỗi mạng)'
      });
    }
  } catch (err) {
    console.error('Error /youtube-info:', err);
    res.status(500).json({ error: 'Lỗi khi lấy thông tin YouTube: ' + err.message });
  }
});

const multer = require('multer');
const path = require('path');
const fs = require('fs');

const uploadDir = path.join(__dirname, '../../document/Lectures/Uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    let originalName = file.originalname;
    try {
      originalName = Buffer.from(file.originalname, 'latin1').toString('utf8');
    } catch (e) {}
    file.originalNameUtf8 = originalName;

    const ext = path.extname(originalName);
    const base = path.basename(originalName, ext)
      .replace(/[\s\/\\?%*:|"<>]+/g, '_')
      .replace(/[^a-zA-Z0-9_\u00C0-\u1EF9-]/g, '_');
    cb(null, base + '_' + Date.now() + ext);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 1024 } // 1GB
});

const { execFile } = require('child_process');

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

function applyFastStart(filePath) {
  return new Promise((resolve) => {
    const ext = path.extname(filePath).toLowerCase();
    if (ext !== '.mp4' && ext !== '.mov') {
      return resolve(filePath);
    }
    const tempOut = filePath + '.faststart.mp4';
    execFile('ffmpeg', [
      '-y',
      '-i', filePath,
      '-c', 'copy',
      '-movflags', '+faststart',
      tempOut
    ], (err) => {
      if (err) {
        console.warn('ffmpeg faststart warning (giữ file gốc):', err.message);
        if (fs.existsSync(tempOut)) {
          try { fs.unlinkSync(tempOut); } catch (e) {}
        }
        return resolve(filePath);
      }
      try {
        if (fs.existsSync(tempOut) && fs.statSync(tempOut).size > 0) {
          fs.unlinkSync(filePath);
          fs.renameSync(tempOut, filePath);
          console.log('✅ Đã tối ưu hóa moov atom (+faststart) cho:', filePath);
        }
      } catch (swapErr) {
        console.warn('Lỗi khi thay thế file faststart:', swapErr.message);
      }
      resolve(filePath);
    });
  });
}

// Upload video (chỉ Owner, Admin, Staff)
router.post('/upload-video', verifyToken, isStaffAdminOwner, upload.single('video'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Không có tệp video nào được gửi lên' });
  }

  // Tối ưu hóa moov atom (+faststart) để hỗ trợ streaming mượt trên trình duyệt
  await applyFastStart(req.file.path);

  const relUrl = '/document/Lectures/Uploads/' + req.file.filename;
  let fileSize = req.file.size;
  try {
    fileSize = fs.statSync(req.file.path).size;
  } catch (e) {}
  const sizeMB = (fileSize / (1024 * 1024)).toFixed(1) + ' MB';

  // Tự động nhận diện chính xác thời lượng video qua ffprobe
  const durSec = await getVideoDurationSeconds(req.file.path);
  const durationMin = durSec ? Math.ceil(durSec / 60) : 1;
  const formattedDur = formatDuration(durSec);

  res.json({
    success: true,
    message: 'Tải lên video thành công!',
    url: relUrl,
    filename: req.file.originalNameUtf8 || req.file.originalname,
    size: sizeMB,
    duration_sec: durSec,
    duration_min: durationMin,
    formatted_duration: formattedDur
  });
});

// Duyệt tìm video có sẵn trong document/Lectures
router.get('/browse-videos', verifyToken, isStaffAdminOwner, lmsController.browseLocalVideos);

// === COMMENTS / THẢO LUẬN ===
router.get('/lectures/:lectureId/comments', lmsController.getComments);
// Thành viên đã đăng nhập đều có thể gửi bình luận
router.post('/lectures/:lectureId/comments', verifyToken, lmsController.addComment);

router.delete('/comments/:commentId', verifyToken, lmsController.deleteComment);

module.exports = router;
