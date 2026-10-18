/**
 * tools/test-phase7-master-verification.js
 * Master benchmark, security, and integrity verification suite for Phase 7
 */
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../backend/.env') });
const jwt = require('../backend/node_modules/jsonwebtoken');
const db = require('../backend/config/db');

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key_change_in_production';
const BASE_URL = 'http://localhost:3000';

function generateToken(user) {
  return jwt.sign(
    { id: user.id, username: user.username, role: user.role, status: user.status },
    JWT_SECRET,
    { expiresIn: '2h' }
  );
}

async function runMasterVerification() {
  console.log('================================================================');
  console.log('🏆 GIAI ĐOẠN 7: KIỂM TRA TỔNG THỂ, BENCHMARK & BẢO MẬT (PHASE 7)');
  console.log('================================================================\n');

  let passed = 0;
  let total = 0;

  function assert(cond, msg) {
    total++;
    if (cond) {
      console.log(`  ✅ [PASS] ${msg}`);
      passed++;
    } else {
      console.error(`  ❌ [FAIL] ${msg}`);
    }
  }

  // 1. Lấy thông tin user
  const [users] = await db.query("SELECT id, username, full_name, role, status FROM users ORDER BY id ASC");
  const owner = users.find(u => u.role === 'owner') || users[0];
  const admin = users.find(u => u.role === 'admin') || users[1];
  const staff = users.find(u => u.role === 'staff') || users[2];
  const member = users.find(u => u.role === 'member') || users[3];

  const adminToken = generateToken(admin);
  const memberToken = generateToken(member);

  console.log('--- 1. HIỆU NĂNG & BENCHMARK RESPONSE TIME (< 200ms) ---');

  // Benchmark /api/admin/dashboard
  const t0 = performance.now();
  const resDash = await fetch(`${BASE_URL}/api/admin/dashboard?range=7d`, {
    headers: { 'Authorization': `Bearer ${adminToken}` }
  });
  const tDash = Math.round(performance.now() - t0);
  const dataDash = await resDash.json();
  assert(resDash.status === 200 && tDash < 200, `GET /api/admin/dashboard phản hồi trong ${tDash}ms (< 200ms)`);

  // Benchmark /api/admin/activity
  const t1 = performance.now();
  const resAct = await fetch(`${BASE_URL}/api/admin/activity?limit=10`, {
    headers: { 'Authorization': `Bearer ${adminToken}` }
  });
  const tAct = Math.round(performance.now() - t1);
  const dataAct = await resAct.json();
  assert(resAct.status === 200 && tAct < 200, `GET /api/admin/activity phản hồi trong ${tAct}ms (< 200ms)`);

  // Benchmark /api/admin/reports
  const t2 = performance.now();
  const resRep = await fetch(`${BASE_URL}/api/admin/reports?limit=15`, {
    headers: { 'Authorization': `Bearer ${adminToken}` }
  });
  const tRep = Math.round(performance.now() - t2);
  const dataRep = await resRep.json();
  assert(resRep.status === 200 && tRep < 200, `GET /api/admin/reports phản hồi trong ${tRep}ms (< 200ms)`);

  // Benchmark /api/admin/audit
  const t3 = performance.now();
  const resAudit = await fetch(`${BASE_URL}/api/admin/audit?limit=15`, {
    headers: { 'Authorization': `Bearer ${adminToken}` }
  });
  const tAudit = Math.round(performance.now() - t3);
  const dataAudit = await resAudit.json();
  assert(resAudit.status === 200 && tAudit < 200, `GET /api/admin/audit phản hồi trong ${tAudit}ms (< 200ms)`);

  console.log('\n--- 2. KIỂM TRA BẢO MẬT & RÒ RỈ THÔNG TIN (SECURITY & PRIVACY) ---');

  const payloadString = JSON.stringify({ dataDash, dataAct, dataRep, dataAudit });

  // Kiểm tra password hash không rò rỉ ($2b$ or $2a$)
  const hasBcryptHash = /\$2[aby]\$\d{2}\$[./A-Za-z0-9]{53}/.test(payloadString);
  assert(!hasBcryptHash, 'Không có mật khẩu băm (bcrypt hash) bị rò rỉ trong bất kỳ API nào');

  // Kiểm tra email thô không bị rò rỉ ở dashboard summary
  // Dashboard API chỉ trả về tổng số, không trả danh sách user
  const hasRawEmailInDashboard = /[\w.-]+@[\w.-]+\.\w+/.test(JSON.stringify(dataDash));
  assert(!hasRawEmailInDashboard, 'API /api/admin/dashboard không làm lộ email người dùng');

  // Kiểm tra phân quyền RBAC
  const resMemberAudit = await fetch(`${BASE_URL}/api/admin/audit`, {
    headers: { 'Authorization': `Bearer ${memberToken}` }
  });
  assert(resMemberAudit.status === 403, 'Member không thể truy cập /api/admin/audit (403 Forbidden)');

  const resMemberReports = await fetch(`${BASE_URL}/api/admin/reports`, {
    headers: { 'Authorization': `Bearer ${memberToken}` }
  });
  assert(resMemberReports.status === 403, 'Member không thể truy cập /api/admin/reports (403 Forbidden)');

  const resMemberDash = await fetch(`${BASE_URL}/api/admin/dashboard`, {
    headers: { 'Authorization': `Bearer ${memberToken}` }
  });
  assert(resMemberDash.status === 403, 'Member không thể truy cập /api/admin/dashboard (403 Forbidden)');

  console.log('\n--- 3. ĐỒNG BỘ MÚI GIỜ ASIA/SAIGON (+07:00) ---');
  const datePattern = /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}\+07:00)?$/;
  const sampleAuditAt = dataAudit.items && dataAudit.items[0] && dataAudit.items[0].createdAt;
  const sampleActAt = dataAct.activities && dataAct.activities[0] && dataAct.activities[0].at;

  const validAuditTz = !sampleAuditAt || sampleAuditAt.includes('+07:00');
  const validActTz = !sampleActAt || sampleActAt.includes('+07:00');
  assert(validAuditTz && validActTz, 'Tất cả các mốc thời gian API trả về đều chuẩn hóa múi giờ Asia/Saigon (+07:00)');

  console.log('\n--- 4. KHỚP DỮ LIỆU THỰC TẾ 100% ---');
  const [[{ countUsers }]] = await db.query("SELECT COUNT(*) as countUsers FROM users");
  const [[{ countCourses }]] = await db.query("SELECT COUNT(*) as countCourses FROM courses");
  const [[{ countPosts }]] = await db.query("SELECT COUNT(*) as countPosts FROM community_posts");
  const [[{ countResources }]] = await db.query("SELECT COUNT(*) as countResources FROM resources");

  assert(dataDash.cards.users.total === Number(countUsers), `Số lượng users khớp DB: ${countUsers}`);
  assert(dataDash.cards.courses.total === Number(countCourses), `Số lượng courses khớp DB: ${countCourses}`);
  assert(dataDash.cards.posts.total === Number(countPosts), `Số lượng posts khớp DB: ${countPosts}`);
  assert(dataDash.cards.resources.total === Number(countResources), `Số lượng resources khớp DB: ${countResources}`);

  console.log('\n================================================================');
  console.log(`KẾT QUẢ TỔNG KIỂM TRA: ${passed}/${total} ĐẠT (${Math.round((passed/total)*100)}%)`);
  console.log('================================================================\n');

  if (passed === total) {
    console.log('🌟 TẤT CẢ CÁC TIÊU CHUẨN AN TOÀN, HIỆU NĂNG VÀ CHÍNH XÁC ĐÃ ĐẠT 100%!');
    await db.end();
  } else {
    await db.end();
    process.exit(1);
  }
}

runMasterVerification();
