const db = require('../config/db');
const { recordAudit } = require('../utils/audit');

const ROLE_HIERARCHY = {
    owner: 4,
    admin: 3,
    staff: 2,
    member: 1
};

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
    const targetUserId = parseInt(req.params.id, 10);
    const { status, role } = req.body;

    if (isNaN(targetUserId)) {
        return res.status(400).json({ error: 'Mã người dùng không hợp lệ' });
    }
    
    // 1. Ngăn không cho tự sửa status hoặc role của chính mình
    if (req.user.id === targetUserId) {
        return res.status(403).json({ error: 'Không thể tự thay đổi vai trò hoặc trạng thái của chính mình' });
    }

    try {
        // 2. Lấy vai trò mục tiêu TỪ DATABASE, không tin cậy request payload
        const [targetRows] = await db.query('SELECT id, role, status, username, full_name FROM users WHERE id = ?', [targetUserId]);
        if (targetRows.length === 0) {
            return res.status(404).json({ error: 'Không tìm thấy người dùng' });
        }
        const oldUser = targetRows[0];

        const actorRole = req.user.role || 'member';
        const actorScore = ROLE_HIERARCHY[actorRole] || 0;
        const targetScore = ROLE_HIERARCHY[oldUser.role] || 1;

        // 3. Quy tắc phân cấp: Chỉ được tác động lên người có cấp THẤP HƠN mình
        if (actorScore <= targetScore) {
            return res.status(403).json({
                error: 'Bạn chỉ có quyền thao tác trên người dùng có cấp bậc thấp hơn bạn'
            });
        }

        // 4. Quy tắc gán vai trò: Chỉ được gán role thấp hơn cấp mình
        if (role) {
            const validRoles = ['owner', 'admin', 'staff', 'member'];
            if (!validRoles.includes(role)) {
                return res.status(400).json({ error: 'Vai trò người dùng không hợp lệ' });
            }
            const newRoleScore = ROLE_HIERARCHY[role] || 0;
            if (newRoleScore >= actorScore) {
                return res.status(403).json({
                    error: 'Không thể gán vai trò bằng hoặc cao hơn cấp bậc của bạn'
                });
            }
        }

        // 5. Kiểm tra status hợp lệ
        if (status) {
            const validStatuses = ['active', 'pending', 'banned'];
            if (!validStatuses.includes(status)) {
                return res.status(400).json({ error: 'Trạng thái người dùng không hợp lệ' });
            }
        }

        // 6. Bảo vệ Owner cuối cùng của hệ thống
        if (oldUser.role === 'owner') {
            const [[ownerCount]] = await db.query("SELECT COUNT(*) AS count FROM users WHERE role = 'owner' AND status = 'active'");
            if (ownerCount.count <= 1) {
                if ((role && role !== 'owner') || (status && status !== 'active')) {
                    return res.status(403).json({
                        error: 'Không thể hạ cấp hoặc khóa Owner cuối cùng của hệ thống'
                    });
                }
            }
        }

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

        values.push(targetUserId);

        await db.query(`UPDATE users SET ${updates.join(', ')} WHERE id = ?`, values);

        // Ghi nhật ký quản trị
        recordAudit({
            actorId: req.user.id,
            action: role && status ? 'user.update' : role ? 'user.role_change' : 'user.status_change',
            targetType: 'user',
            targetId: targetUserId,
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
