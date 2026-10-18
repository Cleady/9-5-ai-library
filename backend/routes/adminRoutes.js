const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { verifyToken, isAdminOrOwner, isStaffAdminOwner } = require('../middlewares/authMiddleware');

const { getAuditLogs } = require('../utils/audit');

// Staff, Admin, Owner có thể lấy danh sách
router.get('/users', verifyToken, isStaffAdminOwner, adminController.getAllUsers);

// Chỉ Admin, Owner mới có thể thay đổi trạng thái hoặc vai trò
router.put('/users/:id', verifyToken, isAdminOrOwner, adminController.updateUser);

// Staff, Admin, Owner có thể xem nhật ký thao tác quản trị
router.get('/audit', verifyToken, isStaffAdminOwner, async (req, res) => {
  try {
    const { page, limit, action, targetType, actorId } = req.query;
    const result = await getAuditLogs({ page, limit, action, targetType, actorId });
    res.json({ success: true, ...result });
  } catch (err) {
    console.error('Lỗi lấy audit logs:', err);
    res.status(500).json({ error: 'Lỗi máy chủ khi lấy nhật ký quản trị' });
  }
});

module.exports = router;
