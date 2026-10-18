/**
 * tools/test-phase4-reports.js
 * Kiểm thử toàn diện Phase 4: Báo cáo vi phạm và cơ chế kiểm duyệt nội dung
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

async function runTests() {
  console.log('🧪 BẮT ĐẦU KIỂM THỬ GIAI ĐOẠN 4: BÁO CÁO VI PHẠM & KIỂM DUYỆT CỘNG ĐỒNG\n');
  let passed = 0;
  let total = 0;

  function assert(condition, message) {
    total++;
    if (condition) {
      console.log(`  ✅ [PASS] ${message}`);
      passed++;
    } else {
      console.error(`  ❌ [FAIL] ${message}`);
    }
  }

  // 1. Chuẩn bị người dùng kiểm thử
  const [users] = await db.query("SELECT id, username, role, status FROM users ORDER BY id ASC");
  const owner = users.find(u => u.role === 'owner');
  const admin = users.find(u => u.role === 'admin');
  const member1 = users.find(u => u.role === 'member');
  const staff = users.find(u => u.role === 'staff');

  const ownerToken = generateToken(owner);
  const adminToken = generateToken(admin);
  const member1Token = generateToken(member1);
  const staffToken = generateToken(staff);

  // Lấy một bài viết có sẵn trong DB để test
  const [posts] = await db.query("SELECT id, user_id, content FROM community_posts ORDER BY id DESC LIMIT 5");
  if (posts.length === 0) {
    console.error('Không tìm thấy bài viết nào trong DB để kiểm thử.');
    process.exit(1);
  }

  // Tìm bài viết mà tác giả khác member1 (để member1 report)
  const targetPost = posts.find(p => p.user_id !== member1.id) || posts[0];
  // Bài viết của chính member1 (nếu có) hoặc một bài do authorId = targetPost.user_id để test self-report
  const authorUser = users.find(u => u.id === targetPost.user_id) || owner;
  const authorToken = generateToken(authorUser);

  console.log(`📌 Target post ID: ${targetPost.id}, Author ID: ${targetPost.user_id}, Reporter ID: ${member1.id}\n`);

  try {
    // TEST 1: Chưa đăng nhập -> 401
    const res1 = await fetch(`${BASE_URL}/api/community/report`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ targetType: 'post', targetId: targetPost.id, reason: 'spam' })
    });
    assert(res1.status === 401, 'POST /api/community/report không có token trả về 401');

    // TEST 2: Lý do không hợp lệ -> 400
    const res2 = await fetch(`${BASE_URL}/api/community/report`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${member1Token}`
      },
      body: JSON.stringify({ targetType: 'post', targetId: targetPost.id, reason: 'invalid_reason_xyz' })
    });
    assert(res2.status === 400, 'POST /api/community/report với reason không hợp lệ trả về 400');

    // TEST 3: Tự báo cáo nội dung của chính mình -> 400
    const res3 = await fetch(`${BASE_URL}/api/community/report`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authorToken}`
      },
      body: JSON.stringify({ targetType: 'post', targetId: targetPost.id, reason: 'spam' })
    });
    assert(res3.status === 400, 'Tự báo cáo bài viết của chính mình bị chặn (400)');

    // Dọn dẹp báo cáo cũ của member1 cho targetPost (nếu có trước đó)
    await db.query(
      "DELETE FROM community_reports WHERE reporter_id = ? AND target_type = 'post' AND target_id = ?",
      [member1.id, targetPost.id]
    );

    // TEST 4: Báo cáo hợp lệ -> 201
    const res4 = await fetch(`${BASE_URL}/api/community/report`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${member1Token}`
      },
      body: JSON.stringify({
        targetType: 'post',
        targetId: targetPost.id,
        reason: 'spam',
        note: 'Bài viết chứa liên kết quảng cáo spam'
      })
    });
    const data4 = await res4.json();
    assert(res4.status === 201 && data4.success && data4.reportId, 'Member gửi báo cáo thành công (201)');
    const createdReportId = data4.reportId;

    // TEST 5: Gửi lại báo cáo trùng lặp -> 409 Conflict
    const res5 = await fetch(`${BASE_URL}/api/community/report`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${member1Token}`
      },
      body: JSON.stringify({
        targetType: 'post',
        targetId: targetPost.id,
        reason: 'spam'
      })
    });
    assert(res5.status === 409, 'Gửi lại báo cáo trùng lặp trả về 409 Conflict');

    // TEST 6: Member xem danh sách báo cáo -> 403 Forbidden
    const res6 = await fetch(`${BASE_URL}/api/admin/reports`, {
      headers: { 'Authorization': `Bearer ${member1Token}` }
    });
    assert(res6.status === 403, 'Member xem danh sách báo cáo admin bị từ chối (403)');

    // TEST 7: Staff/Admin xem danh sách báo cáo -> 200
    const res7 = await fetch(`${BASE_URL}/api/admin/reports?status=open`, {
      headers: { 'Authorization': `Bearer ${adminToken}` }
    });
    const data7 = await res7.json();
    const foundReport = data7.reports && data7.reports.find(r => r.id === createdReportId);
    assert(
      res7.status === 200 && data7.success && foundReport && foundReport.reason === 'spam',
      'Admin lấy danh sách báo cáo vi phạm thành công, tìm thấy báo cáo vừa tạo'
    );

    // TEST 8: Staff xử lý báo cáo (thao tác hide) -> 403 (chỉ Admin/Owner được xử lý)
    const res8 = await fetch(`${BASE_URL}/api/admin/reports/${createdReportId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${staffToken}`
      },
      body: JSON.stringify({ action: 'hide' })
    });
    assert(res8.status === 403, 'Staff không có quyền xử lý báo cáo (chỉ Admin/Owner) -> 403');

    // TEST 9: Admin ẩn nội dung vi phạm (action: hide) -> 200
    const res9 = await fetch(`${BASE_URL}/api/admin/reports/${createdReportId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${adminToken}`
      },
      body: JSON.stringify({ action: 'hide' })
    });
    const data9 = await res9.json();
    assert(res9.status === 200 && data9.success, 'Admin ẩn nội dung bài viết vi phạm thành công (200)');

    // TEST 10: Kiểm tra bài viết bị ẩn trong feed người dùng thường
    const res10 = await fetch(`${BASE_URL}/api/community/posts?limit=50`, {
      headers: { 'Authorization': `Bearer ${member1Token}` }
    });
    const data10 = await res10.json();
    const isHiddenFromFeed = !(data10.posts && data10.posts.some(p => p.id === targetPost.id));
    assert(isHiddenFromFeed, 'Bài viết bị ẩn đã biến mất khỏi bảng tin cộng đồng của Member');

    // TEST 11: Kiểm tra Admin vẫn thấy bài viết nếu query trực tiếp
    const [[postInDb]] = await db.query("SELECT is_hidden, hidden_by FROM community_posts WHERE id = ?", [targetPost.id]);
    assert(postInDb.is_hidden === 1 && postInDb.hidden_by === admin.id, 'Cột is_hidden = 1 và hidden_by = admin.id trong DB');

    // TEST 12: Admin khôi phục nội dung (action: restore) -> 200
    const res12 = await fetch(`${BASE_URL}/api/admin/reports/${createdReportId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${adminToken}`
      },
      body: JSON.stringify({ action: 'restore' })
    });
    const data12 = await res12.json();
    assert(res12.status === 200 && data12.success, 'Admin khôi phục nội dung bài viết thành công (200)');

    // TEST 13: Kiểm tra bài viết xuất hiện lại trong feed người dùng thường
    const res13 = await fetch(`${BASE_URL}/api/community/posts?limit=50`, {
      headers: { 'Authorization': `Bearer ${member1Token}` }
    });
    const data13 = await res13.json();
    const reappeared = Boolean(data13.posts && data13.posts.some(p => p.id === targetPost.id));
    assert(reappeared, 'Bài viết đã xuất hiện trở lại trên bảng tin Member sau khi khôi phục');

    // Dọn dẹp báo cáo kiểm thử
    await db.query("DELETE FROM community_reports WHERE id = ?", [createdReportId]);

    console.log(`\n========================================`);
    console.log(`KẾT QUẢ KIỂM THỬ: ${passed}/${total} ĐẠT (${Math.round((passed/total)*100)}%)`);
    console.log(`========================================\n`);

    if (passed === total) {
      console.log('🎉 TOÀN BỘ CÁC BƯỚC KIỂM THỬ GIAI ĐOẠN 4 HOÀN TẤT XUẤT SẮC!');
      process.exit(0);
    } else {
      console.error('⚠️ Có bước kiểm thử thất bại.');
      process.exit(1);
    }

  } catch (err) {
    console.error('Lỗi khi chạy kiểm thử:', err);
    process.exit(1);
  }
}

runTests();
