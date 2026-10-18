const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const { verifyToken, isStaffAdminOwner } = require('../middlewares/authMiddleware');

// GET /api/admin/dashboard?range=7d|30d|90d - Thống kê số liệu thật cho dashboard admin
router.get('/dashboard', verifyToken, isStaffAdminOwner, dashboardController.getDashboardStats);

// GET /api/admin/activity?limit=10&page=1&type= - Dòng thời gian hoạt động hệ thống hợp nhất
router.get('/activity', verifyToken, isStaffAdminOwner, dashboardController.getSystemActivity);

module.exports = router;
