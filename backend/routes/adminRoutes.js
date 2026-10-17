const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { verifyToken, isAdminOrOwner, isStaffAdminOwner } = require('../middlewares/authMiddleware');

// Staff, Admin, Owner có thể lấy danh sách
router.get('/users', verifyToken, isStaffAdminOwner, adminController.getAllUsers);

// Chỉ Admin, Owner mới có thể thay đổi trạng thái hoặc vai trò
router.put('/users/:id', verifyToken, isAdminOrOwner, adminController.updateUser);

module.exports = router;
