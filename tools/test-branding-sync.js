/**
 * tools/test-branding-sync.js
 * Kiểm thử tự động hóa việc đồng bộ thương hiệu (Giai đoạn 4)
 * trên toàn website: index.html, admin.html, signup.html.
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
  if (!owner) {
    console.error('Không tìm thấy tài khoản owner!');
    process.exit(1);
  }
  const tokenOwner = makeToken(owner);

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
    // 1. CẬP NHẬT CẤU HÌNH THỬ NGHIỆM QUA PUT API
    console.log('1. Cập nhật cấu hình thử nghiệm qua Owner PUT API...');
    const testSettings = {
      website_name: '9.5 AI Innovation Hub',
      short_description: 'Nền tảng trí tuệ nhân tạo và khoa học máy tính hàng đầu',
      social_links: {
        facebook: 'https://facebook.com/ai95innovation',
        discord: 'https://discord.gg/ai95hub',
        youtube: '', // Trống -> Phải bị ẩn
        x: '',       // Trống -> Phải bị ẩn
        github: 'https://github.com/ai95hub'
      },
      default_theme: 'system',
      default_accent: 'blue',
      allow_registration: false, // Thử nghiệm chặn đăng ký
      require_approval: true,
      min_password_length: 6,
      session_days: 1
    };

    const putRes = await fetch(`${BASE_URL}/api/admin/settings`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tokenOwner}`
      },
      body: JSON.stringify(testSettings)
    });
    test('1.1. Owner PUT cấu hình thử nghiệm thành công 200', putRes.status === 200);

    // 2. KIỂM TRA TRANG CHỦ (INDEX.HTML)
    console.log('\n2. Kiểm tra đồng bộ trên Landing Page (index.html)...');
    await page.goto(`${BASE_URL}/index.html`, { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 600));

    // Tiêu đề trang
    const indexTitle = await page.title();
    test('2.1. index.html: <title> đồng bộ tên mới', indexTitle.includes('9.5 AI Innovation Hub'), indexTitle);

    // Header brand
    const headerBrandText = await page.$eval('.home-page__brand span strong', el => el.textContent.trim());
    test('2.2. index.html: Header Brand Text đồng bộ tên mới', headerBrandText === '9.5 AI Innovation Hub', headerBrandText);

    // Footer brand
    const footerBrandText = await page.$eval('.home-page__footer-brand span strong', el => el.textContent.trim());
    test('2.3. index.html: Footer Brand Text đồng bộ tên mới', footerBrandText === '9.5 AI Innovation Hub', footerBrandText);

    // Footer copyright
    const footerCopyright = await page.$eval('.home-page__footer-bottom span:first-child', el => el.textContent.trim());
    test('2.4. index.html: Bản quyền chân trang đồng bộ tên mới', footerCopyright.includes('9.5 AI Innovation Hub'), footerCopyright);

    // Footer Socials
    const fbHref = await page.$eval('a[aria-label="Facebook"]', el => el.getAttribute('href'));
    const fbDisplay = await page.$eval('a[aria-label="Facebook"]', el => window.getComputedStyle(el).display);
    test('2.5. index.html: Facebook có URL hợp lệ và hiển thị', fbHref === 'https://facebook.com/ai95innovation' && fbDisplay !== 'none', fbHref);

    const discordHref = await page.$eval('a[aria-label="Discord"]', el => el.getAttribute('href'));
    const discordDisplay = await page.$eval('a[aria-label="Discord"]', el => window.getComputedStyle(el).display);
    test('2.6. index.html: Discord có URL hợp lệ và hiển thị', discordHref === 'https://discord.gg/ai95hub' && discordDisplay !== 'none', discordHref);

    const ghHref = await page.$eval('a[aria-label="GitHub"]', el => el.getAttribute('href'));
    const ghDisplay = await page.$eval('a[aria-label="GitHub"]', el => window.getComputedStyle(el).display);
    test('2.7. index.html: GitHub có URL hợp lệ và hiển thị', ghHref === 'https://github.com/ai95hub' && ghDisplay !== 'none', ghHref);

    const ytDisplay = await page.$eval('a[aria-label="YouTube"]', el => window.getComputedStyle(el).display);
    test('2.8. index.html: YouTube có URL rỗng đã được ẩn đi', ytDisplay === 'none', ytDisplay);

    const xDisplay = await page.$eval('a[aria-label="X"]', el => window.getComputedStyle(el).display);
    test('2.9. index.html: Twitter/X có URL rỗng đã được ẩn đi', xDisplay === 'none', xDisplay);

    // 3. KIỂM TRA TRANG ADMIN (ADMIN.HTML)
    console.log('\n3. Kiểm tra đồng bộ trên Admin (admin.html)...');
    await page.goto(`${BASE_URL}/pages/admin/admin.html`, { waitUntil: 'networkidle0' });
    // Inject auth
    await page.evaluate(({ token, user }) => {
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
    }, { token: tokenOwner, user: owner });
    await page.goto(`${BASE_URL}/pages/admin/admin.html`, { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 600));

    const adminTitle = await page.title();
    test('3.1. admin.html: <title> đồng bộ tên mới', adminTitle.includes('9.5 AI Innovation Hub'), adminTitle);

    const sidebarBrand = await page.$eval('.sidebar-brand .brand-text strong', el => el.textContent.trim());
    test('3.2. admin.html: Sidebar Brand đồng bộ tên mới', sidebarBrand === '9.5 AI Innovation Hub', sidebarBrand);

    const adminFooter = await page.$eval('.admin-footer span:first-child', el => el.textContent.trim());
    test('3.3. admin.html: Chân trang Admin đồng bộ tên mới', adminFooter.includes('9.5 AI Innovation Hub'), adminFooter);

    // 4. KIỂM TRA CHẶN ĐĂNG KÝ TRÊN TRANG SIGNUP (SIGNUP.HTML)
    console.log('\n4. Kiểm tra hiệu lực allow_registration=false trên Signup (signup.html)...');
    await page.goto(`${BASE_URL}/pages/auth/signup.html`, { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 600));

    const warningExists = await page.$eval('#reg-closed-warning', el => !!el).catch(() => false);
    test('4.1. signup.html: Hiển thị cảnh báo tạm đóng đăng ký', warningExists);

    // 5. KHÔI PHỤC TOÀN BỘ CÀI ĐẶT VỀ MẶC ĐỊNH CHUẨN
    console.log('\n5. Khôi phục cài đặt gốc...');
    const originalSettings = {
      website_name: '9.5 AI CLUB',
      short_description: 'AI Learning Platform & Community for Students',
      social_links: { facebook: '', discord: '', youtube: '', x: '', github: '' },
      default_theme: 'system',
      default_accent: 'blue',
      allow_registration: true,
      require_approval: true,
      min_password_length: 6,
      session_days: 1
    };

    const restoreRes = await fetch(`${BASE_URL}/api/admin/settings`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tokenOwner}`
      },
      body: JSON.stringify(originalSettings)
    });
    test('5.1. Khôi phục toàn bộ cài đặt về ban đầu thành công 200', restoreRes.status === 200);

  } catch (err) {
    test('Ngoại lệ khi kiểm thử đồng bộ thương hiệu', false, err.message);
  } finally {
    await browser.close();
  }

  console.log('\n=== BẢNG TỔNG KẾT KIỂM THỬ GIAI ĐOẠN 4 (BRANDING SYNC) ===');
  console.table(tests);

  const failed = tests.filter(t => t.status === 'FAIL');
  if (failed.length === 0) {
    console.log('\n🎉 GIAI ĐOẠN 4 HOÀN TOÀN ĐẠT TIÊU CHUẨN!');
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
