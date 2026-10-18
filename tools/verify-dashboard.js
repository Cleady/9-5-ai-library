const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../backend/.env') });
const mysql = require('mysql2/promise');
const jwt = require('jsonwebtoken');

const BASE_URL = 'http://localhost:3000';
const JWT_SECRET = process.env.JWT_SECRET || 'secret';

function createToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
}

async function runVerification() {
  const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'ai_club_db',
    waitForConnections: true,
    connectionLimit: 5
  });

  const ownerToken = createToken({ id: 1, username: 'owner@internal.edu.vn', role: 'owner', status: 'active' });
  const staffToken = createToken({ id: 3, username: 'staff@internal.edu.vn', role: 'staff', status: 'active' });
  const memberToken = createToken({ id: 4, username: 'member@internal.edu.vn', role: 'member', status: 'active' });

  console.log('====================================================');
  console.log('KIỂM TRA 1: PHÂN QUYỀN VÀ MÃ TRẠNG THÁI HTTP (RBAC)');
  console.log('====================================================');

  const tests = [
    { name: 'Không có token', url: `${BASE_URL}/api/admin/dashboard`, headers: {}, expected: 401 },
    { name: 'Token Member', url: `${BASE_URL}/api/admin/dashboard`, headers: { Authorization: `Bearer ${memberToken}` }, expected: 403 },
    { name: 'Token Staff', url: `${BASE_URL}/api/admin/dashboard`, headers: { Authorization: `Bearer ${staffToken}` }, expected: 200 },
    { name: 'Token Owner', url: `${BASE_URL}/api/admin/dashboard`, headers: { Authorization: `Bearer ${ownerToken}` }, expected: 200 },
    { name: 'Range không hợp lệ (15d)', url: `${BASE_URL}/api/admin/dashboard?range=15d`, headers: { Authorization: `Bearer ${ownerToken}` }, expected: 400 },
    { name: 'Activity không có token', url: `${BASE_URL}/api/admin/activity`, headers: {}, expected: 401 },
    { name: 'Activity Token Member', url: `${BASE_URL}/api/admin/activity`, headers: { Authorization: `Bearer ${memberToken}` }, expected: 403 },
    { name: 'Activity Token Staff', url: `${BASE_URL}/api/admin/activity`, headers: { Authorization: `Bearer ${staffToken}` }, expected: 200 },
    { name: 'Activity Token Owner', url: `${BASE_URL}/api/admin/activity`, headers: { Authorization: `Bearer ${ownerToken}` }, expected: 200 }
  ];

  let rbacPassed = true;
  for (const t of tests) {
    try {
      const res = await fetch(t.url, { headers: t.headers });
      const pass = res.status === t.expected;
      console.log(`[${pass ? 'PASS' : 'FAIL'}] ${t.name}: Trạng thái ${res.status} (Kỳ vọng: ${t.expected})`);
      if (!pass) rbacPassed = false;
    } catch (e) {
      console.log(`[FAIL] ${t.name}: Lỗi kết nối - ${e.message}`);
      rbacPassed = false;
    }
  }

  console.log('\n====================================================');
  console.log('KIỂM TRA 2: BẢO MẬT - RÒ RỈ DỮ LIỆU NHẠY CẢM');
  console.log('====================================================');
  const dashRes = await fetch(`${BASE_URL}/api/admin/dashboard?range=7d`, {
    headers: { Authorization: `Bearer ${ownerToken}` }
  });
  const dashJson = await dashRes.json();
  const dashStr = JSON.stringify(dashJson);

  const actRes = await fetch(`${BASE_URL}/api/admin/activity?limit=20`, {
    headers: { Authorization: `Bearer ${ownerToken}` }
  });
  const actJson = await actRes.json();
  const actStr = JSON.stringify(actJson);

  const hasHash = dashStr.includes('$2b$') || actStr.includes('$2b$') || dashStr.includes('password_hash') || actStr.includes('password_hash');
  const hasFullEmail = /[\w.-]+@internal\.edu\.vn|[\w.-]+@gmail\.com/.test(dashStr) || /[\w.-]+@internal\.edu\.vn|[\w.-]+@gmail\.com/.test(actStr);

  console.log(`[${!hasHash ? 'PASS' : 'FAIL'}] Không chứa password_hash: ${!hasHash}`);
  console.log(`[${!hasFullEmail ? 'PASS' : 'FAIL'}] Không chứa email đầy đủ của người dùng: ${!hasFullEmail}`);

  console.log('\n====================================================');
  console.log('KIỂM TRA 3: ĐỐI CHIẾU SỐ LIỆU SELECT TRỰC TIẾP VỚI API');
  console.log('====================================================');

  // SELECT TRỰC TIẾP
  const [[{ dbUsers }]] = await pool.query('SELECT COUNT(*) as dbUsers FROM users');
  const [[{ dbCourses }]] = await pool.query('SELECT COUNT(*) as dbCourses FROM courses');
  const [[{ dbPosts }]] = await pool.query('SELECT COUNT(*) as dbPosts FROM community_posts');
  const [[{ dbResources, dbDownloads }]] = await pool.query('SELECT COUNT(*) as dbResources, COALESCE(SUM(downloads), 0) as dbDownloads FROM resources');
  const [dbRoleRows] = await pool.query('SELECT role, COUNT(*) as count FROM users GROUP BY role');
  const dbRoleMap = { owner: 0, admin: 0, staff: 0, member: 0 };
  dbRoleRows.forEach(r => dbRoleMap[r.role] = Number(r.count));
  const [[{ dbPending }]] = await pool.query("SELECT COUNT(*) as dbPending FROM users WHERE status = 'pending'");

  const apiCards = dashJson.cards;
  const apiRoles = dashJson.roles.reduce((acc, r) => { acc[r.role] = r.count; return acc; }, {});

  const comparisons = [
    { metric: 'Tổng người dùng (users.total)', sql: Number(dbUsers), api: apiCards.users.total },
    { metric: 'Tổng khóa học (courses.total)', sql: Number(dbCourses), api: apiCards.courses.total },
    { metric: 'Tổng bài viết (posts.total)', sql: Number(dbPosts), api: apiCards.posts.total },
    { metric: 'Tổng tài liệu (resources.total)', sql: Number(dbResources), api: apiCards.resources.total },
    { metric: 'Tổng lượt tải (resources.downloads)', sql: Number(dbDownloads), api: apiCards.resources.downloads },
    { metric: 'Số lượng Owner', sql: dbRoleMap.owner, api: apiRoles.owner },
    { metric: 'Số lượng Admin', sql: dbRoleMap.admin, api: apiRoles.admin },
    { metric: 'Số lượng Staff', sql: dbRoleMap.staff, api: apiRoles.staff },
    { metric: 'Số lượng Member', sql: dbRoleMap.member, api: apiRoles.member },
    { metric: 'Tài khoản chờ duyệt (pendingAccounts)', sql: Number(dbPending), api: dashJson.needsAttention.pendingAccounts }
  ];

  console.log('| Chỉ số đối chiếu | SQL Trực tiếp | API Trả về | Khớp? |');
  console.log('| :--- | :---: | :---: | :---: |');
  let dataMatched = true;
  for (const c of comparisons) {
    const match = c.sql === c.api;
    if (!match) dataMatched = false;
    console.log(`| ${c.metric} | ${c.sql} | ${c.api} | ${match ? 'KHỚP (100%)' : 'LỆCH'} |`);
  }

  console.log('\n====================================================');
  console.log('KIỂM TRA 4: KIỂM TRA HOẠT ĐỘNG HỆ THỐNG (/api/admin/activity)');
  console.log('====================================================');
  console.log(`- Tổng số hoạt động ghi nhận: ${actJson.total}`);
  console.log(`- Số hoạt động trả về trang 1: ${actJson.activities.length}`);
  if (actJson.activities.length > 0) {
    const firstAct = actJson.activities[0];
    console.log(`- Hoạt động mới nhất: [${firstAct.type}] ${firstAct.actor.name} - ${firstAct.actionDesc} (${firstAct.target || ''}) lúc ${firstAct.at}`);
  }

  await pool.end();

  const allPassed = rbacPassed && !hasHash && !hasFullEmail && dataMatched;
  console.log('\n====================================================');
  console.log(`KẾT QUẢ TỔNG THỂ GIAI ĐOẠN 1: ${allPassed ? 'ĐẠT 100%' : 'CÓ LỖI CẦN XỬ LÝ'}`);
  console.log('====================================================');

  return allPassed;
}

if (require.main === module) {
  runVerification().then(passed => {
    process.exitCode = passed ? 0 : 1;
  });
}

module.exports = { runVerification };
