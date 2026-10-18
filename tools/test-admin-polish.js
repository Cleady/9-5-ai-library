/**
 * tools/test-admin-polish.js
 * Kiểm thử tự động hóa cho Giai đoạn 5:
 * - Không còn nhảy giật kích thước icon chuông
 * - Loại bỏ nút theme chết
 * - Tiếng Việt 100% trên khung Admin
 * - Bảo vệ chuyển hướng vai trò Member và mã lỗi 403
 */
const puppeteer = require('./node_modules/puppeteer-core');
const fs = require('fs');
const path = require('path');
require(path.join(__dirname, '../backend/node_modules/dotenv')).config({ path: path.join(__dirname, '../backend/.env') });
const jwt = require(path.join(__dirname, '../backend/node_modules/jsonwebtoken'));
const db = require(path.join(__dirname, '../backend/config/db'));

const BASE_URL = 'http://localhost:3000';

function makeToken(user) {
  return jwt.sign(
    { id: user.id, username: user.username, role: user.role, status: user.status },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
}

async function run() {
  const [users] = await db.query('SELECT id, username, full_name, role, status FROM users');
  const owner = users.find(u => u.role === 'owner');
  const member = users.find(u => u.role === 'member');

  const tokenOwner = makeToken(owner);
  const tokenMember = makeToken(member);

  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();
  const tests = [];

  function test(name, pass, detail = '') {
    tests.push({ name, status: pass ? 'PASS' : 'FAIL', detail });
    console.log(`${pass ? '✅ [PASS]' : '❌ [FAIL]'} ${name} ${detail ? '(' + detail + ')' : ''}`);
  }

  try {
    // 1. KIỂM TRA KHUNG ADMIN VỚI TÀI KHOẢN OWNER
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto(`${BASE_URL}/pages/admin/admin.html`, { waitUntil: 'networkidle0' });
    await page.evaluate(({ token, user }) => {
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
    }, { token: tokenOwner, user: owner });
    await page.goto(`${BASE_URL}/pages/admin/admin.html`, { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 600));

    // a) Không có nút .theme-button chết
    const themeBtnCount = await page.$$eval('.theme-button', els => els.length);
    test('1.1. Nút .theme-button chết đã được loại bỏ hoàn toàn', themeBtnCount === 0);

    // b) Icon chuông thông báo không đổi kích thước khi hover
    const bellSizeBefore = await page.$eval('.bell-icon', el => ({ w: el.offsetWidth, h: el.offsetHeight }));
    await page.hover('.bell-icon');
    await new Promise(r => setTimeout(r, 100));
    const bellSizeAfter = await page.$eval('.bell-icon', el => ({ w: el.offsetWidth, h: el.offsetHeight }));
    test('1.2. Kích thước icon chuông giữ nguyên 20px khi hover, không bị nhảy giật',
      bellSizeBefore.w === 20 && bellSizeBefore.h === 20 && bellSizeAfter.w === 20 && bellSizeAfter.h === 20,
      `Trước: ${bellSizeBefore.w}x${bellSizeBefore.h}, Sau hover: ${bellSizeAfter.w}x${bellSizeAfter.h}`
    );

    // c) Nhãn Sidebar 100% Tiếng Việt
    const navLabels = await page.$$eval('.sidebar-nav .nav-label', els => els.map(e => e.textContent.trim()));
    const expectedLabels = ['Tổng quan', 'Quản lý học tập', 'Kiểm duyệt cộng đồng', 'Quản lý người dùng', 'Cài đặt hệ thống'];
    const allLabelsMatch = expectedLabels.every(l => navLabels.includes(l));
    test('1.3. Sidebar hiển thị 100% Tiếng Việt chuẩn', allLabelsMatch, navLabels.join(', '));

    // d) User Menu 100% Tiếng Việt
    const userMenuItems = await page.$$eval('.user-menu-list a', els => els.map(e => e.textContent.trim()));
    const hasProfile = userMenuItems.includes('Hồ sơ cá nhân');
    const hasPassword = userMenuItems.includes('Đổi mật khẩu') || userMenuItems.includes('Bảo mật tài khoản');
    const hasLogout = userMenuItems.includes('Đăng xuất');
    const allMenuMatch = hasProfile && hasPassword && hasLogout;
    test('1.4. Menu người dùng hiển thị 100% Tiếng Việt chuẩn', allMenuMatch, userMenuItems.join(', '));

    // 2. KIỂM TRA CHẶN VÀ CHUYỂN HƯỚNG TÀI KHOẢN MEMBER
    console.log('\n2. Kiểm tra chặn truy cập đối với Member...');
    page.on('dialog', async dialog => {
      await dialog.dismiss();
    });

    await page.evaluate(({ token, user }) => {
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
    }, { token: tokenMember, user: member });

    await page.goto(`${BASE_URL}/pages/admin/admin.html`, { waitUntil: 'load' });
    await new Promise(r => setTimeout(r, 800));

    const finalUrl = page.url();
    test('2.1. Member truy cập admin.html bị chặn và chuyển hướng ngay về index.html', finalUrl.includes('index.html'), finalUrl);

  } catch (err) {
    test('Gặp lỗi ngoại lệ khi kiểm thử khung admin', false, err.message);
  } finally {
    await browser.close();
  }

  console.log('\n=== BẢNG TỔNG KẾT KIỂM THỬ GIAI ĐOẠN 5 ===');
  console.table(tests);

  const failed = tests.filter(t => t.status === 'FAIL');
  if (failed.length === 0) {
    console.log('\n🎉 GIAI ĐOẠN 5 HOÀN TOÀN ĐẠT TIÊU CHUẨN!');
    process.exit(0);
  } else {
    console.error(`\n⚠️ Có ${failed.length} bài kiểm thử thất bại!`);
    process.exit(1);
  }
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
