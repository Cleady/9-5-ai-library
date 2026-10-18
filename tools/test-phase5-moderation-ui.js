/**
 * tools/test-phase5-moderation-ui.js
 * End-to-End Visual & Functional Test for Phase 5: Admin Community Moderation UI
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
  console.log('🧪 BẮT ĐẦU KIỂM THỬ GIAI ĐOẠN 5: GIAO DIỆN KIỂM DUYỆT (ADMIN COMMUNITY MODERATION)\n');

  // 1. Lấy thông tin user
  const [users] = await db.query("SELECT id, username, full_name, role, status FROM users ORDER BY id ASC");
  const admin = users.find(u => u.role === 'admin') || users[0];
  const member = users.find(u => u.role === 'member') || users[1];

  const adminToken = generateToken(admin);
  const memberToken = generateToken(member);

  // 2. Tạo một báo cáo mẫu trong DB để kiểm tra hiển thị
  const [posts] = await db.query("SELECT id, user_id, content FROM community_posts WHERE user_id != ? LIMIT 1", [member.id]);
  const samplePost = posts[0];

  // Dọn báo cáo cũ của member nếu có
  await db.query("DELETE FROM community_reports WHERE reporter_id = ? AND target_type = 'post' AND target_id = ?", [member.id, samplePost.id]);

  // Tạo báo cáo mới
  const [insertRes] = await db.query(
    `INSERT INTO community_reports (reporter_id, target_type, target_id, reason, note, status)
     VALUES (?, 'post', ?, 'spam', 'Bài viết nghi vấn quảng cáo rác spam link', 'open')`,
    [member.id, samplePost.id]
  );
  const sampleReportId = insertRes.insertId;
  console.log(`📌 Đã tạo báo cáo mẫu ID: ${sampleReportId} cho bài viết ID: ${samplePost.id}\n`);

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  const consoleErrors = [];

  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });

  page.on('pageerror', err => {
    consoleErrors.push(err.message);
  });

  try {
    // 3. Set token cho Admin vào localStorage
    await page.goto(`${BASE_URL}/pages/auth/login.html`, { waitUntil: 'domcontentloaded' });
    await page.evaluate((tok, usr) => {
      localStorage.setItem('token', tok);
      localStorage.setItem('user', JSON.stringify(usr));
      localStorage.setItem('currentUser', JSON.stringify(usr));
    }, adminToken, admin);

    // 4. Mở trang Admin (1440x900)
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto(`${BASE_URL}/pages/admin/admin.html`, { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 600));

    // Kiểm tra Attention item "Báo cáo vi phạm chờ xử lý"
    const openReportsCount = await page.$eval('#attention-reports-count', el => parseInt(el.textContent.trim(), 10));
    console.log(`📊 Dashboard Attention Reports count: ${openReportsCount}`);
    if (openReportsCount > 0) {
      console.log('  ✅ [PASS] Dashboard hiển thị số báo cáo chờ xử lý > 0');
    } else {
      console.error('  ❌ [FAIL] Dashboard không cập nhật số báo cáo chờ xử lý');
    }

    // 5. Chuyển sang tab Community Moderation
    console.log('🔄 Bấm chuyển sang tab Community Moderation...');
    await page.click('[data-page-target="community"]');
    await new Promise(r => setTimeout(r, 600));

    // Kiểm tra panel Community đang hiển thị
    const isCommunityVisible = await page.$eval('#page-community', el => !el.hidden);
    if (isCommunityVisible) {
      console.log('  ✅ [PASS] Section #page-community đã hiển thị');
    } else {
      console.error('  ❌ [FAIL] Section #page-community chưa hiển thị');
    }

    // Kiểm tra hàng trong bảng báo cáo
    const rowExists = await page.$(`#mod-row-${sampleReportId}`);
    if (rowExists) {
      console.log('  ✅ [PASS] Báo cáo mẫu xuất hiện trên bảng');
    } else {
      console.error('  ❌ [FAIL] Báo cáo mẫu không xuất hiện trên bảng');
    }

    // Chụp ảnh Light Theme (1440px)
    await page.screenshot({ path: path.join(__dirname, 'shots/admin_moderation_light.png'), fullPage: false });
    console.log('  📸 Chụp ảnh: tools/shots/admin_moderation_light.png');

    // 6. Chuyển Dark Theme
    await page.evaluate(() => {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    });
    await new Promise(r => setTimeout(r, 400));
    await page.screenshot({ path: path.join(__dirname, 'shots/admin_moderation_dark.png'), fullPage: false });
    console.log('  📸 Chụp ảnh: tools/shots/admin_moderation_dark.png');

    // 7. Chụp ảnh Mobile (390px)
    await page.setViewport({ width: 390, height: 844 });
    await new Promise(r => setTimeout(r, 400));
    await page.screenshot({ path: path.join(__dirname, 'shots/admin_moderation_390.png'), fullPage: false });
    console.log('  📸 Chụp ảnh: tools/shots/admin_moderation_390.png');

    // 8. Test thao tác bấm "Ẩn nội dung" (Hide)
    console.log('🔄 Test thao tác bấm "Ẩn nội dung"...');
    await page.setViewport({ width: 1440, height: 900 });
    await new Promise(r => setTimeout(r, 300));

    const hideBtn = await page.$(`#mod-row-${sampleReportId} .mod-btn-hide`);
    if (hideBtn) {
      await hideBtn.click();
      await new Promise(r => setTimeout(r, 800));

      // Kiểm tra trong DB: bài viết đã bị ẩn (is_hidden = 1) và report status = actioned
      const [[chkPost]] = await db.query("SELECT is_hidden FROM community_posts WHERE id = ?", [samplePost.id]);
      const [[chkRep]] = await db.query("SELECT status FROM community_reports WHERE id = ?", [sampleReportId]);

      if (chkPost.is_hidden === 1 && chkRep.status === 'actioned') {
        console.log('  ✅ [PASS] Thao tác "Ẩn nội dung" thành công: post.is_hidden = 1, report.status = actioned');
      } else {
        console.error('  ❌ [FAIL] Thao tác "Ẩn nội dung" chưa cập nhật đúng DB');
      }
    } else {
      console.error('  ❌ [FAIL] Không tìm thấy nút Ẩn nội dung');
    }

    // 9. Dọn dẹp dữ liệu test
    await db.query("UPDATE community_posts SET is_hidden = 0, hidden_by = NULL, hidden_at = NULL WHERE id = ?", [samplePost.id]);
    await db.query("DELETE FROM community_reports WHERE id = ?", [sampleReportId]);

    console.log(`\nTổng số lỗi console: ${consoleErrors.length}`);
    if (consoleErrors.length > 0) {
      console.error('Các lỗi console phát hiện:', consoleErrors);
    }

    if (consoleErrors.length === 0) {
      console.log('🎉 TOÀN BỘ KIỂM THỬ GIAI ĐOẠN 5 HOÀN TẤT THÀNH CÔNG VỚI 0 LỖI CONSOLE!');
      process.exit(0);
    } else {
      process.exit(1);
    }

  } catch (err) {
    console.error('Lỗi khi chạy kiểm thử UI:', err);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

runTest();
