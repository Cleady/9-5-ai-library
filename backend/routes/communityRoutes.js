const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const multer = require('multer');

const communityController = require('../controllers/communityController');
const { verifyToken, isStaffAdminOwner, canWriteCommunity } = require('../middlewares/authMiddleware');

// === CẤU HÌNH UPLOAD ẢNH COMMUNITY BẰNG MULTER ===
const uploadDir = path.join(__dirname, '../../document/uploads/community');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname).toLowerCase();
    const randomName = 'img_' + Date.now() + '_' + crypto.randomBytes(4).toString('hex') + ext;
    cb(null, randomName);
  }
});

const fileFilter = (req, file, cb) => {
  const allowedMime = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
  if (allowedMime.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Chỉ chấp nhận các định dạng ảnh: JPG, PNG, WEBP, GIF'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // Giới hạn 5MB
});

// Middleware xử lý lỗi Multer thân thiện
function handleUpload(req, res, next) {
  upload.single('image')(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ error: 'Dung lượng ảnh vượt quá giới hạn cho phép (tối đa 5MB)' });
      }
      return res.status(400).json({ error: 'Lỗi tải ảnh: ' + err.message });
    } else if (err) {
      return res.status(400).json({ error: err.message });
    }
    next();
  });
}

// === 1. UPLOAD ẢNH ===
router.post('/upload-image', verifyToken, canWriteCommunity, handleUpload, (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Không có tệp hình ảnh nào được gửi lên' });
  }

  const relativeUrl = '/document/uploads/community/' + req.file.filename;
  const sizeMB = (req.file.size / (1024 * 1024)).toFixed(2) + ' MB';

  res.json({
    success: true,
    message: 'Tải lên hình ảnh thành công!',
    url: relativeUrl,
    filename: req.file.originalname,
    size: sizeMB
  });
});

// === 2. BÀI VIẾT (POSTS) ===
router.get('/posts', verifyToken, communityController.getPosts);
router.post('/posts', verifyToken, canWriteCommunity, communityController.createPost);
router.put('/posts/:id', verifyToken, canWriteCommunity, communityController.updatePost);
router.delete('/posts/:id', verifyToken, communityController.deletePost);

// === 3. LIKE & COMMENTS ===
router.post('/posts/:id/like', verifyToken, canWriteCommunity, communityController.toggleLike);
router.get('/posts/:id/comments', verifyToken, communityController.getComments);
router.post('/posts/:id/comments', verifyToken, canWriteCommunity, communityController.createComment);
router.delete('/comments/:id', verifyToken, communityController.deleteComment);

// === 4. BÌNH CHỌN (POLL) ===
router.post('/posts/:id/vote', verifyToken, canWriteCommunity, communityController.votePoll);

// === 5. TRENDING & TOP CONTRIBUTORS ===
router.get('/trending', verifyToken, communityController.getTrending);
router.get('/top-contributors', verifyToken, communityController.getTopContributors);

// === 6. THẢO LUẬN (DISCUSSIONS) ===
router.get('/discussions', verifyToken, communityController.getDiscussions);
router.get('/discussions/:id', verifyToken, communityController.getDiscussionDetail);
router.post('/discussions', verifyToken, canWriteCommunity, communityController.createDiscussion);
router.post('/discussions/:id/replies', verifyToken, canWriteCommunity, communityController.createDiscussionReply);
router.delete('/discussions/replies/:replyId', verifyToken, communityController.deleteDiscussionReply);
router.delete('/discussions/:id', verifyToken, communityController.deleteDiscussion);

// === 7. NHÓM (GROUPS) ===
router.get('/groups', verifyToken, communityController.getGroups);
router.post('/groups', verifyToken, isStaffAdminOwner, communityController.createGroup);
router.get('/groups/:id', verifyToken, communityController.getGroupDetail);
router.post('/groups/:id/join', verifyToken, canWriteCommunity, communityController.joinGroup);
router.post('/groups/:id/leave', verifyToken, canWriteCommunity, communityController.leaveGroup);

// === 8. BẢNG XẾP HẠNG (LEADERBOARD) ===
router.get('/leaderboard', verifyToken, communityController.getLeaderboard);

// === 9. THÔNG BÁO (NOTIFICATIONS) ===
router.get('/notifications', verifyToken, communityController.getNotifications);
router.post('/notifications/read-all', verifyToken, communityController.markAllNotificationsRead);
router.post('/notifications/:id/read', verifyToken, communityController.markNotificationRead);

// === 10. TÌM KIẾM (SEARCH) ===
router.get('/search', verifyToken, communityController.searchCommunity);

module.exports = router;
