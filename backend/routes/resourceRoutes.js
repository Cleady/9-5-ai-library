const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const crypto = require('crypto');
const resourceController = require('../controllers/resourceController');
const { verifyToken } = require('../middlewares/authMiddleware');

const STORAGE_DIR = path.join(__dirname, '../storage/resources');

// Cấu hình Multer lưu file vào thư mục cách ly backend/storage/resources
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, STORAGE_DIR);
  },
  filename: (req, file, cb) => {
    // Tên lưu là chuỗi ngẫu nhiên (crypto) + đuôi mở rộng, chống hoàn toàn Path Traversal
    const ext = path.extname(file.originalname).toLowerCase();
    const randomName = crypto.randomBytes(16).toString('hex') + '_' + Date.now() + ext;
    cb(null, randomName);
  }
});

const allowedExtensions = ['.pdf', '.doc', '.docx', '.ppt', '.pptx', '.xls', '.xlsx', '.csv', '.zip', '.py', '.ipynb', '.txt', '.md'];

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  if (!allowedExtensions.includes(ext)) {
    const err = new Error(`Định dạng file ${ext} không được phép tải lên. Chỉ hỗ trợ tài liệu học tập.`);
    err.code = 'INVALID_EXTENSION';
    return cb(err, false);
  }
  cb(null, true);
};

const upload = multer({
  storage,
  limits: {
    fileSize: 20 * 1024 * 1024 // 20 MB
  },
  fileFilter
});

// Middleware bọc upload để xử lý lỗi giới hạn dung lượng và định dạng mượt mà
const uploadSingle = (req, res, next) => {
  upload.single('file')(req, res, (err) => {
    if (err) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ error: 'Dung lượng file vượt quá giới hạn cho phép (tối đa 20 MB)' });
      }
      if (err.code === 'INVALID_EXTENSION') {
        return res.status(400).json({ error: err.message });
      }
      return res.status(400).json({ error: err.message || 'Lỗi khi tải file lên' });
    }
    next();
  });
};

// Tất cả các route Resources đều yêu cầu xác thực người dùng
router.use(verifyToken);

// 1. Thống kê, gần đây, yêu thích (đặt trước /:id để không bị nhầm lẫn route param)
router.get('/stats', resourceController.getStats);
router.get('/recent', resourceController.getRecent);
router.get('/favorites', resourceController.getFavorites);

// 2. Danh sách và tải lên
router.get('/', resourceController.getAllResources);
router.post('/', uploadSingle, resourceController.createResource);

// 3. Chi tiết, xem trước, tải về, cập nhật, xóa, yêu thích theo ID
router.get('/:id', resourceController.getResourceById);
router.get('/:id/preview', resourceController.previewResource);
router.get('/:id/download', resourceController.downloadResource);
router.put('/:id', resourceController.updateResource);
router.delete('/:id', resourceController.deleteResource);
router.post('/:id/favorite', resourceController.toggleFavorite);

module.exports = router;
