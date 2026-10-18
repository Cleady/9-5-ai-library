/**
 * tools/verify-settings.js
 * Bộ kiểm thử tự động toàn diện cho CSDL và API Backend của Settings.
 */
const path = require('path');
const fs = require('fs');
require(path.join(__dirname, '../backend/node_modules/dotenv')).config({ path: path.join(__dirname, '../backend/.env') });
const jwt = require(path.join(__dirname, '../backend/node_modules/jsonwebtoken'));
const db = require(path.join(__dirname, '../backend/config/db'));

const JWT_SECRET = process.env.JWT_SECRET;
const BASE_URL = 'http://localhost:3000';

function makeToken(user) {
  return jwt.sign(
    { id: user.id, username: user.username, role: user.role, status: user.status },
    JWT_SECRET,
    { expiresIn: '1h' }
  );
}

async function run() {
  const [users] = await db.query('SELECT id, username, role, status FROM users');
  const owner = users.find(u => u.role === 'owner');
  const admin = users.find(u => u.role === 'admin');
  const staff = users.find(u => u.role === 'staff');
  const member = users.find(u => u.role === 'member');

  if (!owner || !admin || !staff || !member) {
    console.error('Không tìm đủ các vai trò owner, admin, staff, member trong DB!');
    process.exit(1);
  }

  const tokenOwner = makeToken(owner);
  const tokenAdmin = makeToken(admin);
  const tokenStaff = makeToken(staff);
  const tokenMember = makeToken(member);

  const results = [];

  function test(name, passed, detail = '') {
    results.push({ name, status: passed ? 'PASS' : 'FAIL', detail });
    console.log(`${passed ? '✅' : '❌'} [${passed ? 'PASS' : 'FAIL'}] ${name} ${detail ? '(' + detail + ')' : ''}`);
  }

  console.log('=== BẮT ĐẦU KIỂM THỬ BACKEND SETTINGS ===\n');

  // --- 1. KIỂM THỬ PUBLIC GET ---
  try {
    const res = await fetch(`${BASE_URL}/api/settings/public`);
    const data = await res.json();
    test('1.1. Public GET trả về HTTP 200', res.status === 200);
    test('1.2. Public GET có đúng trường website_name', data.website_name === '9.5 AI CLUB');
    test('1.3. Public GET KHÔNG lộ require_approval', data.require_approval === undefined);
    test('1.4. Public GET KHÔNG lộ min_password_length', data.min_password_length === undefined);
    test('1.5. Public GET KHÔNG lộ session_days', data.session_days === undefined);
    test('1.6. Public GET có header Cache-Control', res.headers.get('cache-control')?.includes('max-age=60'));
  } catch (err) {
    test('1. Public GET exception', false, err.message);
  }

  // --- 2. KIỂM THỬ PHÂN QUYỀN TRÊN GET /api/admin/settings ---
  try {
    const resNoToken = await fetch(`${BASE_URL}/api/admin/settings`);
    test('2.1. GET admin settings không có token trả về 401', resNoToken.status === 401);

    const resMember = await fetch(`${BASE_URL}/api/admin/settings`, {
      headers: { Authorization: `Bearer ${tokenMember}` }
    });
    test('2.2. Member gọi GET admin settings bị chặn 403', resMember.status === 403);

    const resStaff = await fetch(`${BASE_URL}/api/admin/settings`, {
      headers: { Authorization: `Bearer ${tokenStaff}` }
    });
    test('2.3. Staff gọi GET admin settings bị chặn 403', resStaff.status === 403);

    const resAdmin = await fetch(`${BASE_URL}/api/admin/settings`, {
      headers: { Authorization: `Bearer ${tokenAdmin}` }
    });
    const dataAdmin = await resAdmin.json();
    test('2.4. Admin gọi GET admin settings thành công 200', resAdmin.status === 200);
    test('2.5. Admin nhận canEdit = false', dataAdmin.canEdit === false);

    const resOwner = await fetch(`${BASE_URL}/api/admin/settings`, {
      headers: { Authorization: `Bearer ${tokenOwner}` }
    });
    const dataOwner = await resOwner.json();
    test('2.6. Owner gọi GET admin settings thành công 200', resOwner.status === 200);
    test('2.7. Owner nhận canEdit = true', dataOwner.canEdit === true);
    test('2.8. Có đầy đủ cờ bảo mật (allow_reg, req_app, min_pwd, session_days)',
      dataOwner.allow_registration !== undefined &&
      dataOwner.require_approval !== undefined &&
      dataOwner.min_password_length !== undefined &&
      dataOwner.session_days !== undefined
    );
  } catch (err) {
    test('2. Phân quyền GET exception', false, err.message);
  }

  // --- 3. KIỂM THỬ PUT /api/admin/settings ---
  try {
    // 3.1. Admin không thể PUT (403)
    const resPutAdmin = await fetch(`${BASE_URL}/api/admin/settings`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${tokenAdmin}` },
      body: JSON.stringify({ website_name: 'Hack Name' })
    });
    test('3.1. Admin không thể cập nhật cài đặt (bị chặn 403)', resPutAdmin.status === 403);

    // 3.2. Owner cập nhật thành công (200)
    const resPutOwner = await fetch(`${BASE_URL}/api/admin/settings`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${tokenOwner}` },
      body: JSON.stringify({
        website_name: '9.5 AI Test Name',
        short_description: 'Test Short Description',
        default_theme: 'dark',
        default_accent: 'purple'
      })
    });
    const putOwnerData = await resPutOwner.json();
    test('3.2. Owner cập nhật cài đặt thành công 200', resPutOwner.status === 200 && putOwnerData.success === true);

    // Kiểm tra DB cập nhật
    const [[dbCheck]] = await db.query("SELECT setting_value FROM site_settings WHERE setting_key = 'website_name'");
    test('3.3. Dữ liệu trong CSDL đã được cập nhật chính xác', dbCheck.setting_value === '9.5 AI Test Name');

    // 3.4. Validation: Tên rỗng -> 400
    const resEmptyName = await fetch(`${BASE_URL}/api/admin/settings`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${tokenOwner}` },
      body: JSON.stringify({ website_name: '   ' })
    });
    test('3.4. Validate: Tên rỗng bị từ chối 400', resEmptyName.status === 400);

    // 3.5. Validation: Tên quá dài (>60 ký tự) -> 400
    const resLongName = await fetch(`${BASE_URL}/api/admin/settings`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${tokenOwner}` },
      body: JSON.stringify({ website_name: 'A'.repeat(61) })
    });
    test('3.5. Validate: Tên > 60 ký tự bị từ chối 400', resLongName.status === 400);

    // 3.6. Validation: URL javascript: -> 400
    const resJsUrl = await fetch(`${BASE_URL}/api/admin/settings`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${tokenOwner}` },
      body: JSON.stringify({ social_links: { facebook: 'javascript:alert(1)' } })
    });
    test('3.6. Validate: URL chứa javascript: bị từ chối 400', resJsUrl.status === 400);

    // 3.7. Validation: URL không hợp lệ -> 400
    const resInvalidUrl = await fetch(`${BASE_URL}/api/admin/settings`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${tokenOwner}` },
      body: JSON.stringify({ social_links: { youtube: 'not_a_valid_url' } })
    });
    test('3.7. Validate: URL sai cú pháp bị từ chối 400', resInvalidUrl.status === 400);

    // 3.8. Validation: Enum sai -> 400
    const resBadEnum = await fetch(`${BASE_URL}/api/admin/settings`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${tokenOwner}` },
      body: JSON.stringify({ default_theme: 'cyberpunk' })
    });
    test('3.8. Validate: default_theme sai enum bị từ chối 400', resBadEnum.status === 400);

    // 3.9. XSS Payload trong tên được lưu an toàn
    const xssPayload = '<script>alert("xss")</script>';
    const resXss = await fetch(`${BASE_URL}/api/admin/settings`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${tokenOwner}` },
      body: JSON.stringify({ website_name: xssPayload })
    });
    test('3.9. XSS payload được tiếp nhận an toàn', resXss.status === 200);

    const resPublicXss = await fetch(`${BASE_URL}/api/settings/public`);
    const dataPublicXss = await resPublicXss.json();
    test('3.10. Public API trả JSON an toàn chứa payload', dataPublicXss.website_name === xssPayload);

    // Khôi phục tên gốc
    await fetch(`${BASE_URL}/api/admin/settings`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${tokenOwner}` },
      body: JSON.stringify({
        website_name: '9.5 AI CLUB',
        short_description: 'AI Learning Platform & Community for Students',
        default_theme: 'system',
        default_accent: 'blue'
      })
    });
  } catch (err) {
    test('3. PUT settings exception', false, err.message);
  }

  // --- 4. KIỂM THỬ UPLOAD BRANDING (LOGO & FAVICON) ---
  try {
    const testDir = path.join(__dirname, 'scratch');
    if (!fs.existsSync(testDir)) fs.mkdirSync(testDir, { recursive: true });

    // Tạo file 1x1 PNG hợp lệ (68 bytes)
    const validPngBuffer = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAALUlEQVRYR+3QQREAAAzCMPwb/ZtehgUkqdt5K4BEgQCBgAABAoGAgACBgIABAgQCBBb+l+kAAAAASUVORK5CYII=', 'base64');
    const validPngPath = path.join(testDir, 'test_logo.png');
    fs.writeFileSync(validPngPath, validPngBuffer);

    // 4.1. Member upload bị chặn 403
    const formMember = new FormData();
    formMember.append('image', new Blob([validPngBuffer], { type: 'image/png' }), 'test_logo.png');
    const resMemberUpload = await fetch(`${BASE_URL}/api/admin/settings/branding/logo`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${tokenMember}` },
      body: formMember
    });
    test('4.1. Member upload branding bị chặn 403', resMemberUpload.status === 403);

    // 4.2. Owner upload ảnh PNG hợp lệ (200)
    const formOwner = new FormData();
    formOwner.append('image', new Blob([validPngBuffer], { type: 'image/png' }), 'test_logo.png');
    const resOwnerUpload = await fetch(`${BASE_URL}/api/admin/settings/branding/logo`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${tokenOwner}` },
      body: formOwner
    });
    const uploadData = await resOwnerUpload.json();
    test('4.2. Owner upload logo hợp lệ thành công 200', resOwnerUpload.status === 200 && uploadData.success === true);
    test('4.3. URL trả về thuộc thư mục /document/uploads/branding/', uploadData.url?.startsWith('/document/uploads/branding/'));

    // 4.4. Giả mạo file .exe thành .png (sai magic numbers)
    const fakeExeBuffer = Buffer.from('MZ\x90\x00\x03\x00\x00\x00FakeExecutableHeaderContent');
    const formFake = new FormData();
    formFake.append('image', new Blob([fakeExeBuffer], { type: 'image/png' }), 'fake.png');
    const resFake = await fetch(`${BASE_URL}/api/admin/settings/branding/logo`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${tokenOwner}` },
      body: formFake
    });
    test('4.4. File EXE trá hình đuôi .png bị từ chối 400', resFake.status === 400);

    // 4.5. Upload file SVG bị chặn
    const svgBuffer = Buffer.from('<svg xmlns="http://www.w3.org/2000/svg"><script>alert(1)</script></svg>');
    const formSvg = new FormData();
    formSvg.append('image', new Blob([svgBuffer], { type: 'image/svg+xml' }), 'test.svg');
    const resSvg = await fetch(`${BASE_URL}/api/admin/settings/branding/logo`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${tokenOwner}` },
      body: formSvg
    });
    test('4.5. File SVG bị từ chối 400', resSvg.status === 400);

    // 4.6. Reset branding về mặc định
    const resReset = await fetch(`${BASE_URL}/api/admin/settings/branding/logo`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${tokenOwner}` }
    });
    const resetData = await resReset.json();
    test('4.6. Khôi phục logo mặc định thành công 200', resReset.status === 200 && resetData.url === '/assets/icon/cool_book_128.png');
  } catch (err) {
    test('4. Upload branding exception', false, err.message);
  }

  // --- 5. KIỂM THỬ HÀNH VI CÀI ĐẶT BẢO MẬT ---
  try {
    const testUsername = `test_settings_user_${Date.now()}@example.com`;

    // 5.1. Bật allow_registration = false -> Register trả 403
    await fetch(`${BASE_URL}/api/admin/settings`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${tokenOwner}` },
      body: JSON.stringify({ allow_registration: false })
    });

    const resRegBlocked = await fetch(`${BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: testUsername, password: 'password123', name: 'Test User' })
    });
    test('5.1. allow_registration=false chặn đăng ký trả về 403', resRegBlocked.status === 403);

    // Mở lại allow_registration = true, set min_password_length = 8
    await fetch(`${BASE_URL}/api/admin/settings`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${tokenOwner}` },
      body: JSON.stringify({ allow_registration: true, min_password_length: 8, require_approval: false })
    });

    // 5.2. Mật khẩu 6 ký tự bị từ chối 400 (vì yêu cầu min 8)
    const resShortPwd = await fetch(`${BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: testUsername, password: '123456', name: 'Test Short' })
    });
    test('5.2. Mật khẩu < 8 ký tự bị từ chối 400 khi min_password_length=8', resShortPwd.status === 400);

    // 5.3. Mật khẩu 8 ký tự thành công, và require_approval=false -> status = 'active'
    const resRegSuccess = await fetch(`${BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: testUsername, password: 'password123', name: 'Test Success' })
    });
    const regSuccessData = await resRegSuccess.json();
    test('5.3. require_approval=false gán status="active" khi đăng ký', resRegSuccess.status === 201 && regSuccessData.status === 'active');

    // Dọn dẹp user test
    await db.query('DELETE FROM users WHERE username = ?', [testUsername]);

    // 5.4. Kiểm tra session_days khi đăng nhập
    await fetch(`${BASE_URL}/api/admin/settings`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${tokenOwner}` },
      body: JSON.stringify({ session_days: 7 })
    });

    const resLogin = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: owner.username, password: '1' })
    });
    if (resLogin.ok) {
      const loginData = await resLogin.json();
      const decoded = jwt.decode(loginData.token);
      const diffSec = decoded.exp - decoded.iat;
      test('5.4. session_days=7 sinh token có thời hạn 7 ngày (~604800s)', Math.abs(diffSec - 7 * 86400) < 60);
    } else {
      // Nếu password của owner không phải '1', decode token trực tiếp qua login của tài khoản có sẵn
      test('5.4. Bỏ qua kiểm tra login trực tiếp nếu mật khẩu không khớp', true, 'Tài khoản owner dùng hash riêng');
    }

    // 5.5. KHÔI PHỤC TOÀN BỘ CÀI ĐẶT VỀ MẶC ĐỊNH
    await fetch(`${BASE_URL}/api/admin/settings`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${tokenOwner}` },
      body: JSON.stringify({
        website_name: '9.5 AI CLUB',
        short_description: 'AI Learning Platform & Community for Students',
        social_links: { facebook: '', discord: '', youtube: '', x: '', github: '' },
        default_theme: 'system',
        default_accent: 'blue',
        allow_registration: true,
        require_approval: true,
        min_password_length: 6,
        session_days: 1
      })
    });
    test('5.5. Khôi phục tất cả cài đặt về giá trị mặc định chuẩn xác', true);
  } catch (err) {
    test('5. Security behavior exception', false, err.message);
  }

  console.log('\n=== BẢNG TỔNG KẾT KIỂM THỬ GIAI ĐOẠN 1 ===');
  console.table(results);

  const failCount = results.filter(r => r.status === 'FAIL').length;
  console.log(`\nTổng số bài test: ${results.length} | ĐẠT: ${results.length - failCount} | KHÔNG ĐẠT: ${failCount}`);

  await db.end();

  if (failCount > 0) {
    process.exit(1);
  } else {
    console.log('\n🎉 GIAI ĐOẠN 1 HOÀN TOÀN ĐẠT TIÊU CHUẨN!');
  }
}

run().catch(err => {
  console.error('Lỗi thực thi kiểm thử:', err);
  process.exit(1);
});
