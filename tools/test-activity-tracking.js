const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../backend/.env') });
const mysql = require('mysql2/promise');
const jwt = require('jsonwebtoken');

const BASE_URL = 'http://localhost:3000';
const JWT_SECRET = process.env.JWT_SECRET || 'secret';

function createToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
}

async function testActivityTracking() {
  const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'ai_club_db',
    waitForConnections: true,
    connectionLimit: 5
  });

  console.log('====================================================');
  console.log('KIỂM TRA GIAI ĐOẠN 2: ĐO LƯỜNG NGƯỜI DÙNG HOẠT ĐỘNG');
  console.log('====================================================');

  const ownerToken = createToken({ id: 1, username: 'owner95aiclub@internal.edu.vn', role: 'owner', status: 'active' });
  const memberToken = createToken({ id: 4, username: 'quannk@example.com', role: 'member', status: 'active' });

  // 1. Đo thời gian request trước khi ghi nhận
  const startT = Date.now();
  const res1 = await fetch(`${BASE_URL}/api/admin/dashboard?range=7d`, {
    headers: { Authorization: `Bearer ${ownerToken}` }
  });
  const latency = Date.now() - startT;
  console.log(`1. Thời gian phản hồi API Dashboard: ${latency} ms (Mục tiêu < 200ms: ${latency < 200 ? 'ĐẠT' : 'CHƯA ĐẠT'})`);

  // Đợi 200ms để fire-and-forget DB query hoàn tất
  await new Promise(r => setTimeout(r, 200));

  // 2. Kiểm tra bản ghi user_activity_daily cho Owner (User 1)
  const [rows] = await pool.query(
    "SELECT * FROM user_activity_daily WHERE user_id = 1 AND activity_date = CURRENT_DATE()"
  );
  console.log(`2. Bản ghi user_activity_daily hôm nay cho User 1:`, rows.length > 0 ? 'TỒN TẠI (ĐÃ GHI NHẬN)' : 'CHƯA CÓ');
  if (rows.length > 0) {
    console.log(`   - Hits: ${rows[0].hits}, First seen: ${rows[0].first_seen_at}, Last seen: ${rows[0].last_seen_at}`);
  }

  // 3. Thử gọi API lần 2 ngay lập tức để kiểm tra Throttle
  await fetch(`${BASE_URL}/api/admin/dashboard?range=7d`, {
    headers: { Authorization: `Bearer ${ownerToken}` }
  });
  await new Promise(r => setTimeout(r, 100));
  const [rowsAfterThrottle] = await pool.query(
    "SELECT hits FROM user_activity_daily WHERE user_id = 1 AND activity_date = CURRENT_DATE()"
  );
  console.log(`3. Kiểm tra Throttle 5 phút: hits hiện tại = ${rowsAfterThrottle[0].hits} (Kỳ vọng = 1 do bị throttle): ${rowsAfterThrottle[0].hits === 1 ? 'ĐẠT' : 'KHÔNG BỊ THROTTLE'}`);

  // 4. Test gọi từ Member (User 4)
  await fetch(`${BASE_URL}/api/community/posts`, {
    headers: { Authorization: `Bearer ${memberToken}` }
  });
  await new Promise(r => setTimeout(r, 200));
  const [memberRows] = await pool.query(
    "SELECT * FROM user_activity_daily WHERE user_id = 4 AND activity_date = CURRENT_DATE()"
  );
  console.log(`4. Bản ghi hoạt động của Member (User 4):`, memberRows.length > 0 ? 'TỒN TẠI (ĐÃ GHI NHẬN)' : 'CHƯA CÓ');

  // 5. Kiểm tra API Dashboard trả về series.activeUsers
  const dashRes = await fetch(`${BASE_URL}/api/admin/dashboard?range=7d`, {
    headers: { Authorization: `Bearer ${ownerToken}` }
  });
  const dashJson = await dashRes.json();
  const activeSeries = dashJson.series.activeUsers;
  const todayEntry = activeSeries[activeSeries.length - 1];
  console.log(`5. Dữ liệu activeUsers hôm nay trong API Dashboard: ${todayEntry.count} người dùng (activeSince: ${dashJson.series.activeSince})`);

  // 6. Test login ghi nhận last_login_at
  const { recordLogin } = require('../backend/utils/activityTracker');
  await recordLogin(1);
  const [userCols] = await pool.query('SELECT last_login_at FROM users WHERE id = 1');
  console.log(`6. Cột users.last_login_at của User 1: ${userCols[0].last_login_at ? 'ĐÃ CẬP NHẬT (' + userCols[0].last_login_at + ')' : 'CHƯA CẬP NHẬT'}`);

  await pool.end();

  const success = rows.length > 0 && memberRows.length > 0 && todayEntry.count >= 2 && userCols[0].last_login_at;
  console.log('\n====================================================');
  console.log(`KẾT QUẢ GIAI ĐOẠN 2: ${success ? 'ĐẠT 100%' : 'CÓ LỖI'}`);
  console.log('====================================================');

  return success;
}

if (require.main === module) {
  testActivityTracking().then(passed => {
    process.exitCode = passed ? 0 : 1;
  });
}

module.exports = { testActivityTracking };
