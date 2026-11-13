/**
 * backend/routes/searchRoutes.js
 * Định tuyến API tìm kiếm toàn cục (Global Search)
 */

const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController');
const { searchRateLimiter } = require('../middlewares/rateLimiter');
const { verifyOptionalToken } = require('../middlewares/authMiddleware');

// Endpoint tìm kiếm toàn cục:
// - searchRateLimiter: Giới hạn tối đa 120 yêu cầu / phút
// - verifyOptionalToken: Tự động trích xuất user nếu có JWT token nhưng không bắt buộc đăng nhập
router.get('/', searchRateLimiter, verifyOptionalToken, searchController.globalSearch);

module.exports = router;
