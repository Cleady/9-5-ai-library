const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const multer = require('multer');

const settingsController = require('../controllers/settingsController');
const { verifyToken, isOwner, isAdminOrOwner } = require('../middlewares/authMiddleware');

// === CẤU HÌNH UPLOAD ẢNH BRANDING CHO SETTINGS ===
const brandingDir = path.join(__dirname, '../../document/uploads/branding');
if (!fs.existsSync(brandingDir)) {
  fs.mkdirSync(brandingDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, brandingDir);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname).toLowerCase() || '.png';
    const kind = req.params.kind || 'img';
    const safeName = `brand_${kind}_${Date.now()}_${crypto.randomBytes(6).toString('hex')}${ext}`;
    cb(null, safeName);
  }
});

const fileFilter = (req, file, cb) => {
  const allowedMime = ['image/jpeg', 'image/png', 'image/webp'];
  if (allowedMime.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Chỉ chấp nhận các định dạng ảnh: PNG, JPG, WEBP. Không hỗ trợ SVG hoặc định dạng khác.'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 1024 * 1024 } // Tối đa 1MB
});

function handleUpload(req, res, next) {
  upload.single('image')(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ error: 'Dung lượng tệp vượt quá giới hạn (tối đa 1MB).' });
      }
      return res.status(400).json({ error: 'Lỗi tải tệp: ' + err.message });
    } else if (err) {
      return res.status(400).json({ error: err.message });
    }
    next();
  });
}

// 1. Công khai: Lấy cấu hình cơ bản hiển thị toàn site
router.get('/settings/public', settingsController.getPublicSettings);

// 2. Quản trị: Lấy toàn bộ cấu hình (Admin hoặc Owner)
router.get('/admin/settings', verifyToken, isAdminOrOwner, settingsController.getAdminSettings);

// 3. Quản trị: Cập nhật cấu hình hệ thống (Chỉ Owner)
router.put('/admin/settings', verifyToken, isOwner, settingsController.updateAdminSettings);

// 4. Quản trị: Tải lên Logo hoặc Favicon (Chỉ Owner)
router.post('/admin/settings/branding/:kind', verifyToken, isOwner, handleUpload, settingsController.uploadBranding);

// 5. Quản trị: Khôi phục Logo hoặc Favicon về mặc định (Chỉ Owner)
router.delete('/admin/settings/branding/:kind', verifyToken, isOwner, settingsController.resetBranding);

module.exports = router;
