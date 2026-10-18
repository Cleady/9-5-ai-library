const express = require('express');
const router = express.Router();
const moderationController = require('../controllers/moderationController');
const { verifyToken, isStaffAdminOwner, isAdminOrOwner } = require('../middlewares/authMiddleware');

// GET /api/admin/reports - Xem danh sách báo cáo vi phạm (Staff, Admin, Owner)
router.get('/reports', verifyToken, isStaffAdminOwner, moderationController.getReports);

// PUT /api/admin/reports/:id - Xử lý báo cáo vi phạm (Chỉ Admin, Owner)
router.put('/reports/:id', verifyToken, isAdminOrOwner, moderationController.handleReport);

module.exports = router;
