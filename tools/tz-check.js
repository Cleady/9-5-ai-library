const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../backend/.env') });
const mysql = require('mysql2/promise');

async function checkTimezone() {
  const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'ai_club_db',
    waitForConnections: true,
    connectionLimit: 5
  });

  try {
    console.log('=== KIỂM TRA MÚI GIỜ HỆ THỐNG ===');
    const nodeNow = new Date();
    console.log('1. Node.js new Date() (UTC ISO):', nodeNow.toISOString());
    console.log('   Node.js Giờ VN (Asia/Saigon):', nodeNow.toLocaleString('vi-VN', { timeZone: 'Asia/Saigon' }));

    const [rows] = await pool.query(
      "SELECT NOW() as db_now, UTC_TIMESTAMP() as db_utc, @@global.time_zone as global_tz, @@session.time_zone as session_tz"
    );
    const dbNow = rows[0].db_now;
    const dbUtc = rows[0].db_utc;
    console.log('2. MySQL NOW():', dbNow instanceof Date ? dbNow.toISOString() : dbNow);
    console.log('   MySQL UTC_TIMESTAMP():', dbUtc instanceof Date ? dbUtc.toISOString() : dbUtc);
    console.log('   MySQL Session TZ:', rows[0].session_tz);
    console.log('   MySQL Global TZ:', rows[0].global_tz);

    // Kiểm tra độ lệch thời gian giữa Node và MySQL
    const diffMs = Math.abs(nodeNow.getTime() - (dbNow instanceof Date ? dbNow.getTime() : new Date(dbNow).getTime()));
    console.log('3. Độ lệch thời gian giữa Node và MySQL NOW():', diffMs, 'ms');
    if (diffMs < 5000) {
      console.log('   => KẾT LUẬN: Thời gian giữa Node.js và MySQL đồng bộ hoàn toàn (lệch < 5s).');
    } else {
      console.warn('   => CẢNH BÁO: Phát hiện độ lệch thời gian > 5s:', diffMs);
    }

    // Helper kiểm tra định dạng ISO +07:00
    const toSaigonISO = (date) => {
      const d = date instanceof Date ? date : new Date(date);
      // Chuyển sang chuỗi ISO với offset +07:00
      const tzOffset = 7 * 60; // phút
      const localTime = new Date(d.getTime() + tzOffset * 60 * 1000);
      const iso = localTime.toISOString().replace('Z', '+07:00');
      return iso;
    };

    console.log('4. Định dạng ISO có offset chuẩn (+07:00):', toSaigonISO(nodeNow));

    return { success: diffMs < 5000, diffMs };
  } catch (error) {
    console.error('Lỗi kiểm tra timezone:', error);
    process.exitCode = 1;
  } finally {
    await pool.end();
  }
}

if (require.main === module) {
  checkTimezone();
}

module.exports = { checkTimezone };
