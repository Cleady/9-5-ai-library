const jwt = require('jsonwebtoken');
const db = require('../config/db');
const { recordApiActivity } = require('../utils/activityTracker');

// Middleware xác thực xem user đã đăng nhập chưa và kiểm tra trạng thái tươi từ DB
exports.verifyToken = async (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ error: 'You cần đăng nhập để thực hiện chức năng này' });
    }

    try {
        // Token thường gửi kèm chữ Bearer ở trước (VD: "Bearer asdfghjkl...")
        const tokenBody = token.split(' ')[1];
        const decoded = jwt.verify(tokenBody, process.env.JWT_SECRET);
        
        // Kiểm tra trạng thái tươi từ CSDL: vô hiệu hóa ngay nếu tài khoản bị khóa hoặc xóa
        const [rows] = await db.query('SELECT id, username, role, status FROM users WHERE id = ?', [decoded.id]);
        if (rows.length === 0) {
            return res.status(401).json({ error: 'Tài khoản không còn tồn tại trên hệ thống' });
        }

        const freshUser = rows[0];
        if (freshUser.status === 'banned') {
            return res.status(403).json({ error: 'Tài khoản của bạn đã bị khóa (banned)' });
        }

        // Gắn thông tin mới nhất vào req để các controller phía sau sử dụng
        req.user = {
            id: freshUser.id,
            username: freshUser.username,
            role: freshUser.role,
            status: freshUser.status
        };

        // Ghi nhận người dùng hoạt động (fire-and-forget, throttle 5 phút/người dùng)
        recordApiActivity(req.user);

        next();
    } catch (error) {
        return res.status(401).json({ error: 'Phiên đăng nhập không hợp lệ hoặc đã hết hạn' });
    }
};

// Middleware kiểm tra quyền Owner (Chủ sở hữu hệ thống)
exports.isOwner = (req, res, next) => {
    if (req.user && req.user.role === 'owner') {
        next();
    } else {
        res.status(403).json({ error: 'Chỉ Chủ sở hữu (Owner) mới có quyền thực hiện hành động này' });
    }
};

// Middleware kiểm tra quyền Admin hoặc Owner
exports.isAdminOrOwner = (req, res, next) => {
    if (req.user && (req.user.role === 'admin' || req.user.role === 'owner')) {
        next();
    } else {
        res.status(403).json({ error: 'You không có quyền Quản trị viên để thực hiện hành động này' });
    }
};

// Middleware kiểm tra quyền Staff, Admin hoặc Owner (dùng cho việc xem bảng)
exports.isStaffAdminOwner = (req, res, next) => {
    if (req.user && ['owner', 'admin', 'staff'].includes(req.user.role)) {
        next();
    } else {
        res.status(403).json({ error: 'You không có quyền truy cập trang Quản trị' });
    }
};

// Middleware kiểm tra tài khoản không bị banned hoặc pending khi đăng bài / tương tác
exports.canWriteCommunity = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ error: 'You cần đăng nhập để thực hiện thao tác này' });
    }
    if (req.user.status === 'banned') {
        return res.status(403).json({ error: 'Tài khoản của bạn đã bị khóa (banned)' });
    }
    if (req.user.status === 'pending') {
        return res.status(403).json({ error: 'Tài khoản của bạn đang chờ phê duyệt (pending)' });
    }
    next();
};

// Middleware xác thực token không bắt buộc (Optional JWT Auth)
// Dùng cho tìm kiếm và các endpoint công khai nhưng có thể cá nhân hóa/phân quyền khi đã đăng nhập
exports.verifyOptionalToken = async (req, res, next) => {
    const token = req.headers['authorization'];
    req.user = null;

    if (!token) {
        return next();
    }

    try {
        const tokenBody = token.startsWith('Bearer ') ? token.slice(7) : (token.split(' ')[1] || token);
        const decoded = jwt.verify(tokenBody, process.env.JWT_SECRET);
        
        const [rows] = await db.query('SELECT id, username, role, status FROM users WHERE id = ?', [decoded.id]);
        if (rows.length > 0 && rows[0].status !== 'banned') {
            req.user = {
                id: rows[0].id,
                username: rows[0].username,
                role: rows[0].role,
                status: rows[0].status
            };
        }
    } catch (error) {
        req.user = null;
    }
    next();
};
