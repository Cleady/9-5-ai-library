const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

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

        // TẠO TOKEN
        const payload = {
            id: user.id,
            username: user.username,
            full_name: user.full_name,
            role: user.role,
            status: user.status,
            
            
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });

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

// --- 2. API ĐĂNG KÝ (CẦN PHÊ DUYỆT) ---
exports.register = async (req, res) => {
    const { username, password, name } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Please enter email and password' });
    }

    try {
        // Kiểm tra xem trùng lặp
        const [existingUser] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
        if (existingUser.length > 0) {
            return res.status(409).json({ error: 'This account already exists' });
        }

        // Băm mật khẩu
        const hashedPassword = await bcrypt.hash(password, 10);

        // Lưu vào DB: Role mặc định là 'member', Status mặc định là 'pending'
        await db.query(
            'INSERT INTO users (username, password_hash, role, status, full_name) VALUES (?, ?, ?, ?, ?)',
            [username, hashedPassword, 'member', 'pending', name || null]
        );

        res.status(201).json({ 
            message: 'Registration successful! Pending admin approval.' 
        });

    } catch (error) {
        console.error("Lỗi đăng ký:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
};




