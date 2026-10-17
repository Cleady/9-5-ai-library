
const db = require('../config/db');

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
