const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { verifyToken } = require('../middlewares/authMiddleware');

router.get('/me', verifyToken, userController.getMe);
router.put('/profile', verifyToken, userController.updateProfile);
router.put('/change-password', verifyToken, userController.changePassword);
router.delete('/me', verifyToken, userController.deleteAccount);
router.post('/support', verifyToken, userController.submitSupportTicket);

module.exports = router;
