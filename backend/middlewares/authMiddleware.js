const jwt = require('jsonwebtoken');
const { recordApiActivity } = require('../utils/activityTracker');

// Middleware xác thực xem user đã đăng nhập chưa
exports.verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ error: 'You cần đăng nhập để thực hiện chức năng này' });
    }

    try {
        // Token thường gửi kèm chữ Bearer ở trước (VD: "Bearer asdfghjkl...")
        const tokenBody = token.split(' ')[1];
        const decoded = jwt.verify(tokenBody, process.env.JWT_SECRET);
        
        // Gắn thông tin giải mã được vào req để các API sau sử dụng
        req.user = decoded;

        // Ghi nhận người dùng hoạt động (fire-and-forget, throttle 5 phút/người dùng)
        recordApiActivity(decoded);

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
