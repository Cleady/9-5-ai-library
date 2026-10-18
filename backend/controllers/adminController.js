const db = require('../config/db');
const { recordAudit } = require('../utils/audit');

exports.getAllUsers = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT id, username, full_name, role, status, avatar_url, created_at FROM users ORDER BY created_at DESC');
        res.json({ users: rows });
    } catch (error) {
        console.error("Error getting user list:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.updateUser = async (req, res) => {
    const targetUserId = req.params.id;
    const { status, role } = req.body;
    
    // Ngăn không cho tự sửa status của chính mình
    if (req.user.id == targetUserId) {
        return res.status(403).json({ error: 'Cannot change your own status' });
    }

    try {
        const updates = [];
        const values = [];

        if (status) {
            updates.push('status = ?');
            values.push(status);
        }
        if (role) {
            updates.push('role = ?');
            values.push(role);
        }

        if (updates.length === 0) return res.status(400).json({ error: 'No data to update' });

        const [[oldUser]] = await db.query('SELECT role, status, username, full_name FROM users WHERE id = ?', [targetUserId]);

        values.push(targetUserId);

        await db.query(`UPDATE users SET ${updates.join(', ')} WHERE id = ?`, values);

        // Ghi nhật ký quản trị
        recordAudit({
            actorId: req.user.id,
            action: role && status ? 'user.update' : role ? 'user.role_change' : 'user.status_change',
            targetType: 'user',
            targetId: parseInt(targetUserId, 10),
            details: {
                targetUsername: oldUser ? oldUser.username : null,
                oldRole: oldUser ? oldUser.role : undefined,
                newRole: role || undefined,
                oldStatus: oldUser ? oldUser.status : undefined,
                newStatus: status || undefined
            },
            req
        });

        res.json({ message: 'Update successful' });

    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
