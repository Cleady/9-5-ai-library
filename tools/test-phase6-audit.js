/**
 * tools/test-phase6-audit.js
 * Test suite for Phase 6: Admin Audit Log (Backend & Frontend Activity Modal)
 */
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../backend/.env') });
const puppeteer = require('../tools/node_modules/puppeteer-core');
const jwt = require('../backend/node_modules/jsonwebtoken');
const db = require('../backend/config/db');

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key_change_in_production';
const BASE_URL = 'http://localhost:3000';
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

function generateToken(user) {
  return jwt.sign(
    { id: user.id, username: user.username, role: user.role, status: user.status },
    JWT_SECRET,
    { expiresIn: '2h' }
  );
}

async function runTest() {
  console.log('🧪 BẮT ĐẦU KIỂM THỬ GIAI ĐOẠN 6: NHẬT KÝ QUẢN TRỊ (AUDIT LOG)\n');
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

  // 1. Chuẩn bị người dùng
  const [users] = await db.query("SELECT id, username, full_name, role, status FROM users ORDER BY id ASC");
  const owner = users.find(u => u.role === 'owner');
  const admin = users.find(u => u.role === 'admin');
  const staff = users.find(u => u.role === 'staff');
  const member = users.find(u => u.role === 'member');

  const ownerToken = generateToken(owner);
  const adminToken = generateToken(admin);
  const staffToken = generateToken(staff);
  const memberToken = generateToken(member);

  try {
    // TEST 1: Chưa đăng nhập -> 401
    const res1 = await fetch(`${BASE_URL}/api/admin/audit`);
    assert(res1.status === 401, 'GET /api/admin/audit không có token trả về 401');

    // TEST 2: Member gọi API -> 403
    const res2 = await fetch(`${BASE_URL}/api/admin/audit`, {
      headers: { 'Authorization': `Bearer ${memberToken}` }
    });
    assert(res2.status === 403, 'Member gọi GET /api/admin/audit bị chặn 403');

    // TEST 3: Staff/Admin/Owner gọi API -> 200
    const res3 = await fetch(`${BASE_URL}/api/admin/audit`, {
      headers: { 'Authorization': `Bearer ${staffToken}` }
    });
    const data3 = await res3.json();
    assert(res3.status === 200 && data3.success && Array.isArray(data3.items), 'Staff/Admin gọi GET /api/admin/audit thành công (200)');

    // TEST 4: Thực hiện hành động quản trị (Admin cập nhật role/status của member)
    console.log('🔄 Admin thực hiện cập nhật role member để kích hoạt Audit log...');
    const res4 = await fetch(`${BASE_URL}/api/admin/users/${member.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${adminToken}`
      },
      body: JSON.stringify({ role: 'member' }) // ghi lại role hiện tại
    });
    assert(res4.status === 200, 'Admin cập nhật người dùng thành công (200)');

    // Đợi 200ms để fire-and-forget setImmediate ghi vào DB
    await new Promise(r => setTimeout(r, 300));

    // TEST 5: Kiểm tra audit log xuất hiện bản ghi user.role_change hoặc user.update
    const res5 = await fetch(`${BASE_URL}/api/admin/audit?limit=5`, {
      headers: { 'Authorization': `Bearer ${adminToken}` }
    });
    const data5 = await res5.json();
    const latestAudit = data5.items && data5.items[0];
    assert(
      latestAudit && latestAudit.actor.id === admin.id && latestAudit.targetType === 'user' && latestAudit.targetId === member.id,
      'Audit log ghi nhận chính xác hành động cập nhật của Admin trên User'
    );

    // TEST 6: Puppeteer UI Test: Mở modal hoạt động trên Dashboard và kiểm tra tab "🛡️ Nhật ký quản trị"
    console.log('🔄 Bắt đầu kiểm thử Puppeteer cho Activity Modal & Audit Log Tab...');
    const browser = await puppeteer.launch({
      executablePath: CHROME_PATH,
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    const consoleErrors = [];

    page.on('console', msg => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });

    page.on('pageerror', err => {
      consoleErrors.push(err.message);
    });

    await page.goto(`${BASE_URL}/pages/auth/login.html`, { waitUntil: 'domcontentloaded' });
    await page.evaluate((tok, usr) => {
      localStorage.setItem('token', tok);
      localStorage.setItem('user', JSON.stringify(usr));
      localStorage.setItem('currentUser', JSON.stringify(usr));
    }, adminToken, admin);

    await page.setViewport({ width: 1440, height: 900 });
    await page.goto(`${BASE_URL}/pages/admin/admin.html`, { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 600));

    // Bấm nút "View tất cả" trên Dashboard
    await page.click('#dash-view-all-activity');
    await new Promise(r => setTimeout(r, 500));

    // Kiểm tra modal đang mở
    const isModalOpen = await page.$eval('#activity-modal-overlay', el => el.classList.contains('is-active'));
    assert(isModalOpen, 'Activity Modal mở thành công khi bấm "View tất cả"');

    // Bấm chip "🛡️ Nhật ký quản trị"
    console.log('🔄 Bấm chip "🛡️ Nhật ký quản trị"...');
    await page.click('[data-type="audit_log"]');
    await new Promise(r => setTimeout(r, 600));

    // Kiểm tra danh sách hiển thị các dòng audit
    const auditItemsCount = await page.$$eval('#activity-modal-list .activity-list li', els => els.length);
    console.log(`📋 Số lượng dòng nhật ký quản trị hiển thị trong modal: ${auditItemsCount}`);
    assert(auditItemsCount > 0, 'Danh sách Audit log hiển thị thành công trong modal');

    // Chụp ảnh bằng chứng
    await page.screenshot({ path: path.join(__dirname, 'shots/dashboard_audit_modal.png'), fullPage: false });
    console.log('  📸 Chụp ảnh bằng chứng: tools/shots/dashboard_audit_modal.png');

    await browser.close();

    console.log(`\n========================================`);
    console.log(`KẾT QUẢ KIỂM THỬ: ${passed}/${total} ĐẠT (${Math.round((passed/total)*100)}%)`);
    console.log(`Số lỗi console: ${consoleErrors.length}`);
    console.log(`========================================\n`);

    if (passed === total && consoleErrors.length === 0) {
      console.log('🎉 TOÀN BỘ KIỂM THỬ GIAI ĐOẠN 6 HOÀN TẤT THÀNH CÔNG RỰC RỠ!');
      process.exit(0);
    } else {
      process.exit(1);
    }

  } catch (err) {
    console.error('Lỗi kiểm thử Phase 6:', err);
    process.exit(1);
  }
}

runTest();
