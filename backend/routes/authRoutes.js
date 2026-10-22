const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authRateLimiter } = require('../middlewares/rateLimiter');

router.post('/login', authRateLimiter, authController.login);
router.post('/register', authRateLimiter, authController.register);

module.exports = router;
