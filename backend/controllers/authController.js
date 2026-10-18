const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db');
const { recordLogin } = require('../utils/activityTracker');
const { getSettingValue } = require('./settingsController');

// --- 1. API ĐĂNG NHẬP ---
exports.login = async (req, res) => {
    const { username, password, name } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Please enter username and password' });
    }

    try {
        const [rows] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
        
        if (rows.length === 0) {
            return res.status(401).json({ error: 'Account does not exist' });
        }

        const user = rows[0];

        // KIỂM TRA TRẠNG THÁI TÀI KHOẢN (Tính năng chờ duyệt)
        if (user.status === 'pending') {
            return res.status(403).json({ error: 'Your account is pending Administrator approval.' });
        }
        if (user.status === 'banned') {
            return res.status(403).json({ error: 'Your account has been banned.' });
        }

        // KIỂM TRA MẬT KHẨU
        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            return res.status(401).json({ error: 'Incorrect password' });
        }

        // TẠO TOKEN - thời hạn phiên đăng nhập theo cấu hình hệ thống
        const sessionDays = await getSettingValue('session_days', '1');
        const daysInt = parseInt(sessionDays, 10);
        const expiresIn = [1, 7, 30].includes(daysInt) ? `${daysInt}d` : '1d';

        const payload = {
            id: user.id,
            username: user.username,
            full_name: user.full_name,
            role: user.role,
            status: user.status
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });

        // Ghi nhận mốc đăng nhập và hoạt động ngày hôm nay
        await recordLogin(user.id);

        res.json({
            message: 'Login successful',
            token: token,
            user: { ...payload, bio: user.bio, avatar_url: user.avatar_url }
        });

    } catch (error) {
        console.error("Lỗi đăng nhập:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// --- 2. API ĐĂNG KÝ (CÓ THỂ CẦN PHÊ DUYỆT THEO CẤU HÌNH) ---
exports.register = async (req, res) => {
    const { username, password, name } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Please enter email and password' });
    }

    try {
        // 1. Kiểm tra cấu hình allow_registration
        const allowReg = await getSettingValue('allow_registration', 'true');
        if (allowReg === 'false') {
            return res.status(403).json({ error: 'Hệ thống hiện đang tạm đóng đăng ký tài khoản mới.' });
        }

        // 2. Kiểm tra độ dài mật khẩu tối thiểu
        const minLenStr = await getSettingValue('min_password_length', '6');
        const minLength = parseInt(minLenStr, 10) || 6;
        if (password.length < minLength) {
            return res.status(400).json({ error: `Mật khẩu phải có tối thiểu ${minLength} ký tự.` });
        }

        // Kiểm tra xem trùng lặp
        const [existingUser] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
        if (existingUser.length > 0) {
            return res.status(409).json({ error: 'This account already exists' });
        }

        // 3. Kiểm tra require_approval (true -> pending, false -> active)
        const reqApproval = await getSettingValue('require_approval', 'true');
        const initialStatus = reqApproval === 'false' ? 'active' : 'pending';

        // Băm mật khẩu
        const hashedPassword = await bcrypt.hash(password, 10);

        // Lưu vào DB: Role mặc định là 'member'
        await db.query(
            'INSERT INTO users (username, password_hash, role, status, full_name) VALUES (?, ?, ?, ?, ?)',
            [username, hashedPassword, 'member', initialStatus, name || null]
        );

        const successMsg = initialStatus === 'pending'
            ? 'Registration successful! Pending admin approval.'
            : 'Registration successful! You can log in now.';

        res.status(201).json({ 
            message: successMsg,
            status: initialStatus
        });

    } catch (error) {
        console.error("Lỗi đăng ký:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
};




