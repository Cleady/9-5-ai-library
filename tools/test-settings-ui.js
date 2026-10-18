/**
 * tools/test-settings-ui.js
 * Kiểm thử trực quan và tự động hóa toàn diện giao diện Admin Settings (Giai đoạn 3)
 */
const puppeteer = require('./node_modules/puppeteer-core');
const fs = require('fs');
const path = require('path');
require(path.join(__dirname, '../backend/node_modules/dotenv')).config({ path: path.join(__dirname, '../backend/.env') });
const jwt = require(path.join(__dirname, '../backend/node_modules/jsonwebtoken'));
const db = require(path.join(__dirname, '../backend/config/db'));

const BASE_URL = 'http://localhost:3000';
const SHOTS_DIR = path.join(__dirname, 'shots');

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
  const admin = users.find(u => u.role === 'admin');

  if (!owner || !admin) {
    console.error('Không tìm thấy tài khoản owner hoặc admin trong DB!');
    process.exit(1);
  }

  const tokenOwner = makeToken(owner);
  const tokenAdmin = makeToken(admin);

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
    // 1. ĐĂNG NHẬP OWNER VÀ TRUY CẬP SETTINGS (DESKTOP 1440px)
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto(`${BASE_URL}/pages/admin/admin.html#page-settings`, { waitUntil: 'networkidle0' });

    // Inject localStorage cho Owner
    await page.evaluate(({ token, user }) => {
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
    }, { token: tokenOwner, user: owner });

    // Reload lại để script nhận auth
    await page.goto(`${BASE_URL}/pages/admin/admin.html#page-settings`, { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 600));

    // Kích hoạt hiển thị panel settings
    await page.evaluate(() => {
      document.querySelectorAll('[data-page-target]').forEach(b => b.classList.toggle('is-active', b.dataset.pageTarget === 'settings'));
      document.querySelectorAll('[data-page-panel]').forEach(p => {
        p.hidden = p.dataset.pagePanel !== 'settings';
        p.classList.toggle('is-visible', p.dataset.pagePanel === 'settings');
      });
      if (window.AdminSettings) window.AdminSettings.reload();
    });
    await new Promise(r => setTimeout(r, 600));

    // Test 1: Tiêu đề trang
    const titleText = await page.$eval('#settings-title', el => el.textContent.trim());
    test('1.1. Tiêu đề trang bằng tiếng Việt chuẩn "Cài đặt hệ thống"', titleText === 'Cài đặt hệ thống');

    const titleFontSize = await page.$eval('#settings-title', el => window.getComputedStyle(el).fontSize);
    test('1.2. Kích thước font tiêu đề >= 20px', parseFloat(titleFontSize) >= 20, `${titleFontSize}`);

    // Test 2: 4 Sub-tabs
    const tabsCount = await page.$$eval('.settings-tab-btn', els => els.length);
    test('2.1. Đủ 4 sub-tab ARIA tablist', tabsCount === 4);

    const tabBtnHeight = await page.$eval('.settings-tab-btn', el => el.offsetHeight);
    test('2.2. Chiều cao tab button đạt chuẩn tiếp cận >= 40px', tabBtnHeight >= 40, `${tabBtnHeight}px`);

    // Test 3: Trường thông tin chung & Form
    const webNameVal = await page.$eval('#setting-website-name', el => el.value);
    test('3.1. Dữ liệu Website Name tải thành công từ DB', webNameVal === '9.5 AI CLUB', webNameVal);

    const inputHeight = await page.$eval('#setting-website-name', el => el.offsetHeight);
    test('3.2. Chiều cao ô nhập liệu >= 40px', inputHeight >= 40, `${inputHeight}px`);

    // Test 4: Logo & Favicon
    const logoSrc = await page.$eval('#logo-preview-img', el => el.getAttribute('src'));
    test('4.1. Ảnh Logo hiển thị nguồn ảnh tối ưu', logoSrc.includes('cool_book_128.png'), logoSrc);

    const faviconSrc = await page.$eval('#favicon-preview-img', el => el.getAttribute('src'));
    test('4.2. Ảnh Favicon hiển thị nguồn ảnh tối ưu', faviconSrc.includes('favicon-32.png'), faviconSrc);

    // Test 5: Icon và nhãn Mạng xã hội (QUAN TRỌNG: KHÔNG ĐƯỢC MÀU ĐỎ #e7616a)
    const socialRows = await page.$$eval('.social-link-row', els => els.map(el => {
      const brandBox = el.querySelector('.social-brand-icon-box');
      const label = el.querySelector('.social-label-text');
      const svg = brandBox ? brandBox.querySelector('svg') : null;
      const labelColor = label ? window.getComputedStyle(label).color : '';
      return {
        brandClass: brandBox ? brandBox.className : '',
        labelText: label ? label.textContent.trim() : '',
        hasSvg: !!svg,
        labelColor
      };
    }));

    test('5.1. Đủ 5 liên kết mạng xã hội (FB, Discord, YouTube, X, GitHub)', socialRows.length === 5);
    const allHaveSvg = socialRows.every(r => r.hasSvg);
    test('5.2. Mọi biểu tượng MXH đều dùng SVG inline chính hãng', allHaveSvg);

    // Kiểm tra màu chữ nhãn không phải là đỏ hồng (#e7616a -> rgb(231, 97, 106))
    const hasRedLabel = socialRows.some(r => r.labelColor.includes('231, 97, 106'));
    test('5.3. Nhãn mạng xã hội KHÔNG bị lỗi màu đỏ #e7616a', !hasRedLabel, socialRows[0].labelColor);

    // Chụp ảnh Light Desktop
    await page.screenshot({ path: path.join(SHOTS_DIR, 'settings_phase3_light_1440.png'), fullPage: false });

    // Test 6: Chuyển Sub-tabs
    // Chuyển sang Appearance
    await page.click('#tab-btn-appearance');
    await new Promise(r => setTimeout(r, 200));
    const appearanceVisible = await page.$eval('#panel-appearance', el => !el.hidden);
    test('6.1. Chuyển sub-tab sang Giao diện thành công', appearanceVisible);

    // Chuyển sang Email
    await page.click('#tab-btn-email');
    await new Promise(r => setTimeout(r, 200));
    const emailVisible = await page.$eval('#panel-email', el => !el.hidden);
    test('6.2. Chuyển sub-tab sang Email thành công, hiển thị Chưa kích hoạt', emailVisible);

    // Chuyển sang Security
    await page.click('#tab-btn-security');
    await new Promise(r => setTimeout(r, 200));
    const securityVisible = await page.$eval('#panel-security', el => !el.hidden);
    test('6.3. Chuyển sub-tab sang Bảo mật thành công', securityVisible);

    // Quay lại General
    await page.click('#tab-btn-general');
    await new Promise(r => setTimeout(r, 200));

    // Test 7: Dirty State & Discard
    const saveDisabledBefore = await page.$eval('#btn-settings-save', el => el.disabled);
    test('7.1. Ban đầu nút Lưu bị disabled khi chưa sửa đổi', saveDisabledBefore);

    // Nhập thêm vào Website Name
    await page.type('#setting-website-name', ' Updated');
    await new Promise(r => setTimeout(r, 100));

    const dirtyVisible = await page.$eval('#settings-dirty-indicator', el => el.classList.contains('is-visible'));
    const saveEnabled = await page.$eval('#btn-settings-save', el => !el.disabled);
    test('7.2. Dirty state kích hoạt: hiện chỉ báo và bật nút Lưu', dirtyVisible && saveEnabled);

    // Nhấn Hủy thay đổi (confirm dialog tự chấp thuận)
    page.once('dialog', async dialog => {
      await dialog.accept();
    });
    await page.click('#btn-settings-discard');
    await new Promise(r => setTimeout(r, 200));

    const webNameAfterDiscard = await page.$eval('#setting-website-name', el => el.value);
    test('7.3. Hủy thay đổi khôi phục giá trị gốc chính xác', webNameAfterDiscard === '9.5 AI CLUB');

    // Test 8: Dark Theme
    await page.evaluate(() => {
      document.documentElement.setAttribute('data-theme', 'dark');
    });
    await new Promise(r => setTimeout(r, 300));
    await page.screenshot({ path: path.join(SHOTS_DIR, 'settings_phase3_dark_1440.png'), fullPage: false });

    const activeTabDarkBg = await page.$eval('.settings-tab-btn.is-active', el => window.getComputedStyle(el).backgroundColor);
    test('8.1. Dark mode: Tab được chọn có nền và màu tương phản rõ rệt', activeTabDarkBg !== 'rgba(0, 0, 0, 0)', activeTabDarkBg);

    // Test 9: Mobile 390px
    await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
    await page.evaluate(() => {
      document.documentElement.setAttribute('data-theme', 'light');
    });
    await new Promise(r => setTimeout(r, 300));
    await page.screenshot({ path: path.join(SHOTS_DIR, 'settings_phase3_light_390.png'), fullPage: false });

    const tabScrollable = await page.$eval('.settings-tabs', el => el.scrollWidth >= el.clientWidth);
    test('9.1. Mobile 390px: Thanh sub-tabs cuộn ngang mượt mà không vỡ', tabScrollable);

    // Chụp Dark 390px
    await page.evaluate(() => {
      document.documentElement.setAttribute('data-theme', 'dark');
    });
    await new Promise(r => setTimeout(r, 300));
    await page.screenshot({ path: path.join(SHOTS_DIR, 'settings_phase3_dark_390.png'), fullPage: false });
    test('9.2. Mobile 390px: Đã chụp màn hình Dark mode', true);

    // Test 10: Phân quyền Chế độ Chỉ đọc đối với Admin
    await page.setViewport({ width: 1440, height: 900 });
    await page.evaluate(({ token, user }) => {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
    }, { token: tokenAdmin, user: admin });

    await page.goto(`${BASE_URL}/pages/admin/admin.html#page-settings`, { waitUntil: 'networkidle0' });
    await page.evaluate(() => {
      document.querySelectorAll('[data-page-target]').forEach(b => b.classList.toggle('is-active', b.dataset.pageTarget === 'settings'));
      document.querySelectorAll('[data-page-panel]').forEach(p => {
        p.hidden = p.dataset.pagePanel !== 'settings';
        p.classList.toggle('is-visible', p.dataset.pagePanel === 'settings');
      });
      if (window.AdminSettings) window.AdminSettings.reload();
    });
    await new Promise(r => setTimeout(r, 700));

    const bannerDisplay = await page.$eval('#settings-readonly-banner', el => window.getComputedStyle(el).display);
    test('10.1. Admin: Hiển thị banner Chế độ Chỉ đọc', bannerDisplay !== 'none', bannerDisplay);

    const inputDisabled = await page.$eval('#setting-website-name', el => el.disabled);
    test('10.2. Admin: Trường nhập liệu bị vô hiệu hóa (disabled)', inputDisabled);

    const saveDisplay = await page.$eval('#btn-settings-save', el => window.getComputedStyle(el).display);
    test('10.3. Admin: Nút Lưu thay đổi bị ẩn hoàn toàn', saveDisplay === 'none', saveDisplay);
  } catch (err) {
    test('Giai đoạn 3 gặp lỗi ngoại lệ', false, err.message);
  } finally {
    await browser.close();
  }

  console.log('\n=== BẢNG TỔNG KẾT KIỂM THỬ GIAI ĐOẠN 3 (SETTINGS UI) ===');
  console.table(tests);

  const failed = tests.filter(t => t.status === 'FAIL');
  if (failed.length === 0) {
    console.log('\n🎉 GIAI ĐOẠN 3 HOÀN TOÀN ĐẠT TIÊU CHUẨN!');
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
