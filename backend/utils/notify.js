/**
 * Notification Helper Utility (backend/utils/notify.js)
 * Cung cấp các hàm tạo thông báo đơn lẻ và thông báo phát sóng (fan-out) tập trung.
 */
const db = require('../config/db');

/**
 * Tạo 1 thông báo cho người dùng cụ thể (không tự thông báo cho chính mình)
 * Hỗ trợ cả cú pháp mới (refs object) và tương thích ngược (refs = postId)
 */
async function createNotification(userId, actorId, type, refs = {}) {
  if (!userId || !actorId || Number(userId) === Number(actorId)) return;

  let postId = null;
  let lectureId = null;
  let resourceId = null;
  let meta = null;

  if (refs && typeof refs === 'object') {
    postId = refs.postId || refs.post_id || null;
    lectureId = refs.lectureId || refs.lecture_id || null;
    resourceId = refs.resourceId || refs.resource_id || null;
    meta = refs.meta || null;
  } else if (typeof refs === 'number' || typeof refs === 'string') {
    postId = refs;
  }

  try {
    // Chống spam like/unlike: nếu đã có thông báo like chưa đọc cùng (user, actor, post), chỉ cập nhật thời gian
    if (type === 'like' && postId) {
      const [existingLike] = await db.query(
        'SELECT id FROM community_notifications WHERE user_id = ? AND actor_id = ? AND type = "like" AND post_id = ? AND is_read = 0 LIMIT 1',
        [userId, actorId, postId]
      );
      if (existingLike.length > 0) {
        await db.query(
          'UPDATE community_notifications SET created_at = CURRENT_TIMESTAMP WHERE id = ?',
          [existingLike[0].id]
        );
        return;
      }
    }

    await db.query(
      `INSERT INTO community_notifications (user_id, actor_id, type, post_id, lecture_id, resource_id, meta)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [userId, actorId, type, postId, lectureId, resourceId, meta]
    );
  } catch (err) {
    console.error('Lỗi createNotification:', err.message);
  }
}

/**
 * Phát thông báo tới toàn bộ người dùng active trong hệ thống (trừ chính actorId)
 * Dùng một câu lệnh INSERT ... SELECT duy nhất, không lặp mảng
 */
async function notifyAllActive(actorId, type, refs = {}) {
  if (!actorId) return;

  const postId = refs.postId || refs.post_id || null;
  const lectureId = refs.lectureId || refs.lecture_id || null;
  const resourceId = refs.resourceId || refs.resource_id || null;
  const meta = refs.meta || null;

  try {
    await db.query(`
      INSERT INTO community_notifications (user_id, actor_id, type, post_id, lecture_id, resource_id, meta)
      SELECT id, ?, ?, ?, ?, ?, ?
      FROM users
      WHERE status = 'active' AND id != ?
    `, [actorId, type, postId, lectureId, resourceId, meta, actorId]);
  } catch (err) {
    console.error('Lỗi notifyAllActive:', err.message);
  }
}

/**
 * Phát thông báo tới ban quản trị (owner, admin, staff) đang active
 */
async function notifyStaffAdminOwner(actorId, type, refs = {}) {
  if (!actorId) return;

  const postId = refs.postId || refs.post_id || null;
  const lectureId = refs.lectureId || refs.lecture_id || null;
  const resourceId = refs.resourceId || refs.resource_id || null;
  const meta = refs.meta || null;

  try {
    await db.query(`
      INSERT INTO community_notifications (user_id, actor_id, type, post_id, lecture_id, resource_id, meta)
      SELECT id, ?, ?, ?, ?, ?, ?
      FROM users
      WHERE status = 'active' AND id != ? AND role IN ('owner', 'admin', 'staff')
    `, [actorId, type, postId, lectureId, resourceId, meta, actorId]);
  } catch (err) {
    console.error('Lỗi notifyStaffAdminOwner:', err.message);
  }
}

/**
 * Tự động phân loại và gửi thông báo khi có bài đăng mới trong Feed
 */
async function notifyNewPost(postId, authorId, authorRole) {
  if (!postId || !authorId) return;
  const isStaffOrHigher = ['owner', 'admin', 'staff'].includes(authorRole);
  if (isStaffOrHigher) {
    await notifyAllActive(authorId, 'post', { postId });
  } else {
    await notifyStaffAdminOwner(authorId, 'post', { postId });
  }
}

module.exports = {
  createNotification,
  notifyAllActive,
  notifyStaffAdminOwner,
  notifyNewPost
};
