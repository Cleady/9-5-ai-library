const db = require('../config/db');

// Helper: Chuyển đổi Date sang định dạng ISO có offset +07:00
function formatSaigonISO(date) {
  if (!date) return null;
  const d = date instanceof Date ? date : new Date(date);
  if (isNaN(d.getTime())) return null;
  const tzOffset = 7 * 60; // phút (+07:00)
  const localTime = new Date(d.getTime() + tzOffset * 60 * 1000);
  return localTime.toISOString().replace('Z', '+07:00');
}

/**
 * Ghi nhận một hành động quản trị (Audit Log)
 * Fire-and-forget, không làm chậm hoặc gián đoạn luồng chính của API.
 */
function recordAudit({ actorId, action, targetType, targetId = null, details = null, req = null }) {
  if (!actorId || !action || !targetType) return;

  setImmediate(async () => {
    try {
      let ipAddress = null;
      if (req) {
        ipAddress = req.headers['x-forwarded-for'] || req.ip || (req.socket && req.socket.remoteAddress) || null;
        if (typeof ipAddress === 'string' && ipAddress.includes(',')) {
          ipAddress = ipAddress.split(',')[0].trim();
        }
      }

      const jsonDetails = details ? (typeof details === 'object' ? JSON.stringify(details) : JSON.stringify({ note: String(details) })) : null;

      await db.query(
        `INSERT INTO audit_logs (actor_id, action, target_type, target_id, details, ip_address)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [actorId, action, targetType, targetId, jsonDetails, ipAddress]
      );
    } catch (err) {
      console.error('⚠️ [Audit] Lỗi ghi nhật ký quản trị:', err.message);
    }
  });
}

/**
 * Lấy danh sách nhật ký quản trị có phân trang và bộ lọc
 */
async function getAuditLogs({ page = 1, limit = 20, action = null, targetType = null, actorId = null }) {
  const p = Math.max(1, parseInt(page, 10) || 1);
  const l = Math.min(100, Math.max(1, parseInt(limit, 10) || 20));
  const offset = (p - 1) * l;

  const whereConditions = [];
  const params = [];

  if (action && action.trim()) {
    whereConditions.push('a.action = ?');
    params.push(action.trim());
  }

  if (targetType && targetType.trim()) {
    whereConditions.push('a.target_type = ?');
    params.push(targetType.trim());
  }

  if (actorId) {
    whereConditions.push('a.actor_id = ?');
    params.push(actorId);
  }

  const whereClause = whereConditions.length > 0 ? 'WHERE ' + whereConditions.join(' AND ') : '';

  const countSql = `SELECT COUNT(*) as total FROM audit_logs a ${whereClause}`;
  const [[{ total }]] = await db.query(countSql, params);

  const dataSql = `
    SELECT a.id, a.actor_id, a.action, a.target_type, a.target_id, a.details, a.ip_address, a.created_at,
           COALESCE(u.full_name, SUBSTRING_INDEX(u.username, '@', 1)) as actor_name,
           u.role as actor_role,
           u.avatar_url as actor_avatar
    FROM audit_logs a
    LEFT JOIN users u ON a.actor_id = u.id
    ${whereClause}
    ORDER BY a.created_at DESC
    LIMIT ? OFFSET ?
  `;

  const [rows] = await db.query(dataSql, [...params, l, offset]);

  const items = rows.map((r) => {
    let parsedDetails = null;
    try {
      parsedDetails = r.details ? (typeof r.details === 'object' ? r.details : JSON.parse(r.details)) : null;
    } catch (e) {
      parsedDetails = { raw: r.details };
    }

    return {
      id: r.id,
      actor: {
        id: r.actor_id,
        name: r.actor_name || 'Quản trị viên',
        role: r.actor_role,
        avatarUrl: r.actor_avatar
      },
      action: r.action,
      targetType: r.target_type,
      targetId: r.target_id,
      details: parsedDetails,
      ipAddress: r.ip_address,
      createdAt: formatSaigonISO(r.created_at)
    };
  });

  return {
    total: Number(total),
    page: p,
    limit: l,
    totalPages: Math.ceil(Number(total) / l) || 1,
    items
  };
}

module.exports = {
  recordAudit,
  getAuditLogs
};
