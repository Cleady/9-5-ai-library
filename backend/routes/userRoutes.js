const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { verifyToken } = require('../middlewares/authMiddleware');

router.get('/me', verifyToken, userController.getMe);
router.put('/profile', verifyToken, userController.updateProfile);

module.exports = router;
