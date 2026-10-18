const db = require('../config/db');

// Bộ nhớ đệm throttle: lưu thời điểm ghi nhận gần nhất theo userId (tối đa 1 lần/5 phút)
const throttleMap = new Map();
const THROTTLE_MS = 5 * 60 * 1000; // 5 phút

// Dọn dẹp throttleMap định kỳ mỗi 30 phút để tránh rò rỉ bộ nhớ
setInterval(() => {
  const now = Date.now();
  for (const [userId, lastTime] of throttleMap.entries()) {
    if (now - lastTime > THROTTLE_MS * 2) {
      throttleMap.delete(userId);
    }
  }
}, 30 * 60 * 1000).unref();

/**
 * Ghi nhận hoạt động đăng nhập (authController.login)
 * Cập nhật users.last_login_at và upsert user_activity_daily
 */
async function recordLogin(userId) {
  if (!userId) return;
  try {
    // 1. Cập nhật last_login_at trong bảng users
    await db.query('UPDATE users SET last_login_at = NOW() WHERE id = ?', [userId]);

    // 2. Upsert hoạt động theo ngày
    await db.query(`
      INSERT INTO user_activity_daily (user_id, activity_date, first_seen_at, last_seen_at, hits)
      VALUES (?, CURRENT_DATE(), NOW(), NOW(), 1)
      ON DUPLICATE KEY UPDATE
        last_seen_at = NOW(),
        hits = hits + 1
    `, [userId]);

    // Cập nhật mốc throttle
    throttleMap.set(Number(userId), Date.now());
  } catch (error) {
    // Không bao giờ để lỗi tracking làm gián đoạn luồng chính
    console.error('Lỗi recordLogin (non-fatal):', error.message);
  }
}

/**
 * Ghi nhận hoạt động API có xác thực (fire-and-forget trong verifyToken)
 * Chỉ ghi cho tài khoản active, có throttle 5 phút/người dùng
 */
function recordApiActivity(user) {
  if (!user || !user.id) return;
  if (user.status !== 'active') return; // Không ghi nhận tài khoản banned hoặc pending

  const userId = Number(user.id);
  const now = Date.now();
  const lastRecorded = throttleMap.get(userId);

  // Kiểm tra throttle
  if (lastRecorded && now - lastRecorded < THROTTLE_MS) {
    return; // Đã ghi trong vòng 5 phút qua -> bỏ qua
  }

  // Cập nhật throttle ngay lập tức để chặn các request đồng thời
  throttleMap.set(userId, now);

  // Thực thi bất đồng bộ fire-and-forget (không await, bắt lỗi an toàn)
  setImmediate(async () => {
    try {
      await db.query(`
        INSERT INTO user_activity_daily (user_id, activity_date, first_seen_at, last_seen_at, hits)
        VALUES (?, CURRENT_DATE(), NOW(), NOW(), 1)
        ON DUPLICATE KEY UPDATE
          last_seen_at = NOW(),
          hits = hits + 1
      `, [userId]);
    } catch (err) {
      console.error('Lỗi recordApiActivity (non-fatal):', err.message);
    }
  });
}

module.exports = {
  recordLogin,
  recordApiActivity,
  throttleMap,
  THROTTLE_MS
};
