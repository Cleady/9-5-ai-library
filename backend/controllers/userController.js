const db = require('../config/db');
const bcrypt = require('bcrypt');
const { getSettingValue } = require('./settingsController');

exports.updateProfile = async (req, res) => {
    const userId = req.user.id;
    const { full_name, bio, avatar_url } = req.body;

    try {
        await db.query(
            'UPDATE users SET full_name = ?, bio = ?, avatar_url = ? WHERE id = ?',
            [full_name, bio, avatar_url, userId]
        );
        
        const [rows] = await db.query('SELECT id, username, full_name, role, status, bio, avatar_url FROM users WHERE id = ?', [userId]);
        
        res.json({ message: 'Lưu hồ sơ thành công!', user: rows[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Lỗi máy chủ' });
    }
};

exports.getMe = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT id, username, full_name, role, status, bio, avatar_url FROM users WHERE id = ?', [req.user.id]);
        if (rows.length === 0) return res.status(404).json({ error: 'Không tìm thấy người dùng' });
        res.json({ user: rows[0] });
    } catch (error) {
        console.error("Lỗi lấy thông tin cá nhân:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// 1. Đổi mật khẩu tài khoản
exports.changePassword = async (req, res) => {
    const userId = req.user.id;
    const { current_password, new_password } = req.body;

    if (!current_password || !new_password) {
        return res.status(400).json({ error: 'Vui lòng nhập mật khẩu hiện tại và mật khẩu mới' });
    }

    const minLenStr = await getSettingValue('min_password_length', '6');
    const minLength = parseInt(minLenStr, 10) || 6;
    if (new_password.length < minLength) {
        return res.status(400).json({ error: `Mật khẩu mới phải có tối thiểu ${minLength} ký tự` });
    }

    try {
        const [rows] = await db.query('SELECT password_hash FROM users WHERE id = ?', [userId]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Không tìm thấy tài khoản người dùng' });
        }

        const isMatch = await bcrypt.compare(current_password, rows[0].password_hash);
        if (!isMatch) {
            return res.status(401).json({ error: 'Mật khẩu hiện tại không chính xác' });
        }

        const newHash = await bcrypt.hash(new_password, 10);
        await db.query('UPDATE users SET password_hash = ? WHERE id = ?', [newHash, userId]);

        res.json({ message: 'Đổi mật khẩu thành công!' });
    } catch (error) {
        console.error('Lỗi đổi mật khẩu:', error);
        res.status(500).json({ error: 'Lỗi máy chủ khi đổi mật khẩu' });
    }
};

// 2. Xoá tài khoản người dùng
exports.deleteAccount = async (req, res) => {
    const userId = req.user.id;
    const { confirm_email } = req.body;

    try {
        const [rows] = await db.query('SELECT username FROM users WHERE id = ?', [userId]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Không tìm thấy người dùng' });
        }

        if (confirm_email && confirm_email.trim().toLowerCase() !== rows[0].username.toLowerCase()) {
            return res.status(400).json({ error: 'Email xác nhận không khớp' });
        }

        await db.query('DELETE FROM users WHERE id = ?', [userId]);
        res.json({ message: 'Tài khoản đã được xoá vĩnh viễn' });
    } catch (error) {
        console.error('Lỗi xoá tài khoản:', error);
        res.status(500).json({ error: 'Lỗi máy chủ khi xoá tài khoản' });
    }
};

// 3. Gửi hỗ trợ / báo lỗi
exports.submitSupportTicket = async (req, res) => {
    const userId = req.user ? req.user.id : null;
    const { type, subject, message, contact_email } = req.body;

    if (!subject || !message) {
        return res.status(400).json({ error: 'Vui lòng nhập tiêu đề và nội dung' });
    }

    try {
        await db.query(`
            CREATE TABLE IF NOT EXISTS support_tickets (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT,
                type VARCHAR(50) DEFAULT 'general',
                subject VARCHAR(255) NOT NULL,
                message TEXT NOT NULL,
                contact_email VARCHAR(255),
                status VARCHAR(20) DEFAULT 'open',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                INDEX (user_id)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        `);

        await db.query(
            'INSERT INTO support_tickets (user_id, type, subject, message, contact_email) VALUES (?, ?, ?, ?, ?)',
            [userId, type || 'general', subject, message, contact_email || null]
        );

        res.json({ message: 'Gửi yêu cầu hỗ trợ thành công. Đội ngũ phát triển đã ghi nhận.' });
    } catch (error) {
        console.error('Lỗi gửi support ticket:', error);
        res.status(500).json({ error: 'Lỗi máy chủ khi gửi hỗ trợ' });
    }
};
