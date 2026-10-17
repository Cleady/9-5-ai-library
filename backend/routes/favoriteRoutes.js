const express = require('express');
const router = express.Router();
const favoriteController = require('../controllers/favoriteController');
const { verifyToken } = require('../middlewares/authMiddleware');

// Tất cả các route yêu thích đều bắt buộc người dùng đã đăng nhập hợp lệ
router.use(verifyToken);

// 1. Lấy danh sách tổng hợp yêu thích của user (Lectures, Practice, Resources)
router.get('/', favoriteController.getFavorites);

// 2. Bật/Tắt trạng thái yêu thích
router.post('/toggle', favoriteController.toggleFavorite);

module.exports = router;
