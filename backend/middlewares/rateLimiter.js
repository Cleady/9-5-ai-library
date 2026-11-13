// Rate limiter đơn giản trong bộ nhớ (không cần cài thêm package bên thứ ba)
function createRateLimiter(options = {}) {
    const windowMs = options.windowMs || 15 * 60 * 1000; // Mặc định 15 phút
    const maxAttempts = options.maxAttempts || 10; // Tối đa 10 lần
    const message = options.message || 'Quá nhiều lần thử yêu cầu. Vui lòng thử lại sau 15 phút.';

    const store = new Map();

    // Dọn dẹp định kỳ để tránh rò rỉ bộ nhớ
    const cleanupInterval = setInterval(() => {
        const now = Date.now();
        for (const [key, record] of store.entries()) {
            if (now - record.firstAttempt > windowMs) {
                store.delete(key);
            }
        }
    }, 5 * 60 * 1000);
    if (cleanupInterval.unref) cleanupInterval.unref();

    return (req, res, next) => {
        const ip = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
        const identifier = (req.body && req.body.username ? String(req.body.username).trim().toLowerCase() : 'anonymous');
        const key = `${ip}_${identifier}`;

        const now = Date.now();
        let record = store.get(key);

        if (!record || (now - record.firstAttempt > windowMs)) {
            record = { count: 1, firstAttempt: now };
            store.set(key, record);
            return next();
        }

        if (record.count >= maxAttempts) {
            const retryAfterSec = Math.ceil((record.firstAttempt + windowMs - now) / 1000);
            res.setHeader('Retry-After', retryAfterSec);
            return res.status(429).json({ error: message, retryAfter: retryAfterSec });
        }

        record.count++;
        next();
    };
}

module.exports = {
    authRateLimiter: createRateLimiter({
        windowMs: 15 * 60 * 1000,
        maxAttempts: 10,
        message: 'Quá nhiều lần thử đăng nhập hoặc đăng ký. Vui lòng thử lại sau 15 phút.'
    }),
    searchRateLimiter: createRateLimiter({
        windowMs: 60 * 1000,
        maxAttempts: 120,
        message: 'Bạn đã thực hiện quá nhiều lượt tìm kiếm. Vui lòng thử lại sau giây lát.'
    }),
    createRateLimiter
};
