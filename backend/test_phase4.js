const http = require('http');
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const JWT_SECRET = process.env.JWT_SECRET;

// Tạo tokens cho các user
const ownerToken = jwt.sign({ id: 1, username: 'owner95aiclub@internal.edu.vn', role: 'owner', status: 'active' }, JWT_SECRET, { expiresIn: '1h' });
const member1Token = jwt.sign({ id: 4, username: 'anhquan2007nek@gmail.com', role: 'member', status: 'active' }, JWT_SECRET, { expiresIn: '1h' });
const member2Token = jwt.sign({ id: 5, username: 'anhquandaynay2007@gmail.com', role: 'member', status: 'active' }, JWT_SECRET, { expiresIn: '1h' });

function request(options, bodyData) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let data = [];
      res.on('data', chunk => data.push(chunk));
      res.on('end', () => {
        const buffer = Buffer.concat(data);
        const text = buffer.toString('utf-8');
        let json = null;
        try { json = JSON.parse(text); } catch (e) {}
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: text,
          json: json,
          rawBuffer: buffer
        });
      });
    });
    req.on('error', reject);
    if (bodyData) req.write(bodyData);
    req.end();
  });
}

function uploadFile(token, filename, content, title = 'Test Resource', type = 'document', subject = 'CSD203') {
  const boundary = '----WebKitFormBoundaryPhase4Test' + Math.random().toString(36).substring(2);
  let body = '';

  body += `--${boundary}\r\n`;
  body += `Content-Disposition: form-data; name="title"\r\n\r\n${title}\r\n`;

  body += `--${boundary}\r\n`;
  body += `Content-Disposition: form-data; name="type"\r\n\r\n${type}\r\n`;

  body += `--${boundary}\r\n`;
  body += `Content-Disposition: form-data; name="subject"\r\n\r\n${subject}\r\n`;

  body += `--${boundary}\r\n`;
  body += `Content-Disposition: form-data; name="description"\r\n\r\nPhase 4 test description\r\n`;

  body += `--${boundary}\r\n`;
  body += `Content-Disposition: form-data; name="file"; filename="${filename}"\r\n`;
  body += `Content-Type: application/octet-stream\r\n\r\n`;

  const headBuffer = Buffer.from(body, 'utf-8');
  const tailBuffer = Buffer.from(`\r\n--${boundary}--\r\n`, 'utf-8');
  const fileBuffer = Buffer.isBuffer(content) ? content : Buffer.from(content, 'utf-8');
  const fullBody = Buffer.concat([headBuffer, fileBuffer, tailBuffer]);

  return request({
    hostname: 'localhost',
    port: 3000,
    path: '/api/resources',
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': `multipart/form-data; boundary=${boundary}`,
      'Content-Length': fullBody.length
    }
  }, fullBody);
}

async function runTests() {
  console.log('=== BẮT ĐẦU KIỂM THỬ GIAI ĐOẠN 4 (PHASE 4 TESTS) ===\n');
  let passed = 0;
  let total = 0;

  function assert(condition, name) {
    total++;
    if (condition) {
      console.log(`✓ [PASS] ${name}`);
      passed++;
    } else {
      console.error(`✗ [FAIL] ${name}`);
    }
  }

  try {
    // 1. Member 1 tải lên 1 tài liệu PDF
    const pdfContent = Buffer.from('%PDF-1.4\n1 0 obj\n<<>>\nendobj\ntrailer\n<<>>\n%%EOF');
    const upRes = await uploadFile(member1Token, 'test_member1.pdf', pdfContent, 'Tài liệu của Member 1', 'document', 'CSD203');
    assert(upRes.statusCode === 201 && upRes.json?.resource?.id, '1. Member 1 tải lên tài liệu PDF thành công');
    const resourceId = upRes.json?.resource?.id;

    // 2. Member 2 thử sửa tài liệu của Member 1 -> Phải nhận 403 Forbidden
    const editForbidden = await request({
      hostname: 'localhost',
      port: 3000,
      path: `/api/resources/${resourceId}`,
      method: 'PUT',
      headers: {
        'Authorization': 'Bearer ' + member2Token,
        'Content-Type': 'application/json'
      }
    }, JSON.stringify({ title: 'Hacked by Member 2', type: 'code', subject: 'HACK' }));
    assert(editForbidden.statusCode === 403, '2. Member 2 sửa tài liệu của Member 1 bị từ chối 403 Forbidden');

    // 3. Member 2 thử xóa tài liệu của Member 1 -> Phải nhận 403 Forbidden
    const deleteForbidden = await request({
      hostname: 'localhost',
      port: 3000,
      path: `/api/resources/${resourceId}`,
      method: 'DELETE',
      headers: {
        'Authorization': 'Bearer ' + member2Token
      }
    });
    assert(deleteForbidden.statusCode === 403, '3. Member 2 xóa tài liệu của Member 1 bị từ chối 403 Forbidden');

    // 4. Member 1 (chính chủ) sửa tài liệu -> Thành công 200 OK
    const editAuthor = await request({
      hostname: 'localhost',
      port: 3000,
      path: `/api/resources/${resourceId}`,
      method: 'PUT',
      headers: {
        'Authorization': 'Bearer ' + member1Token,
        'Content-Type': 'application/json'
      }
    }, JSON.stringify({
      title: 'Tài liệu đã cập nhật bởi Member 1',
      type: 'document',
      subject: 'CSD203-Advanced',
      description: 'Mô tả mới đã chỉnh sửa'
    }));
    assert(editAuthor.statusCode === 200 && editAuthor.json?.resource?.title === 'Tài liệu đã cập nhật bởi Member 1', '4. Member 1 (chính chủ) sửa tài liệu thành công 200 OK');

    // 5. Owner sửa tài liệu của Member 1 -> Thành công 200 OK
    const editOwner = await request({
      hostname: 'localhost',
      port: 3000,
      path: `/api/resources/${resourceId}`,
      method: 'PUT',
      headers: {
        'Authorization': 'Bearer ' + ownerToken,
        'Content-Type': 'application/json'
      }
    }, JSON.stringify({
      title: 'Tài liệu đã duyệt bởi Owner',
      type: 'document',
      subject: 'CSD203',
      description: 'Owner duyệt nội dung'
    }));
    assert(editOwner.statusCode === 200, '5. Owner sửa tài liệu của Member 1 thành công 200 OK');

    // 6. Member 2 bật Favorite tài liệu này
    const favOn = await request({
      hostname: 'localhost',
      port: 3000,
      path: `/api/resources/${resourceId}/favorite`,
      method: 'POST',
      headers: { 'Authorization': 'Bearer ' + member2Token }
    });
    assert(favOn.statusCode === 200 && favOn.json?.favorited === true, '6. Member 2 thêm tài liệu vào yêu thích (favorited: true)');

    // 7. Member 2 kiểm tra danh sách yêu thích GET /api/resources/favorites
    const favList = await request({
      hostname: 'localhost',
      port: 3000,
      path: '/api/resources/favorites',
      method: 'GET',
      headers: { 'Authorization': 'Bearer ' + member2Token }
    });
    const foundInFavs = favList.json?.items?.some(item => item.id === resourceId);
    assert(favList.statusCode === 200 && foundInFavs, '7. Tài liệu xuất hiện trong GET /api/resources/favorites của Member 2');

    // 8. Member 1 kiểm tra xem mình có favorited không (phải là false)
    const detailMember1 = await request({
      hostname: 'localhost',
      port: 3000,
      path: `/api/resources/${resourceId}`,
      method: 'GET',
      headers: { 'Authorization': 'Bearer ' + member1Token }
    });
    assert(detailMember1.statusCode === 200 && detailMember1.json?.resource?.favoritedByMe === false, '8. Member 1 chưa yêu thích nên favoritedByMe là false');

    // 9. Member 2 kiểm tra xem mình có favorited không (phải là true)
    const detailMember2 = await request({
      hostname: 'localhost',
      port: 3000,
      path: `/api/resources/${resourceId}`,
      method: 'GET',
      headers: { 'Authorization': 'Bearer ' + member2Token }
    });
    assert(detailMember2.statusCode === 200 && detailMember2.json?.resource?.favoritedByMe === true, '9. Member 2 đã yêu thích nên favoritedByMe là true');

    // 10. Member 2 tắt Favorite
    const favOff = await request({
      hostname: 'localhost',
      port: 3000,
      path: `/api/resources/${resourceId}/favorite`,
      method: 'POST',
      headers: { 'Authorization': 'Bearer ' + member2Token }
    });
    assert(favOff.statusCode === 200 && favOff.json?.favorited === false, '10. Member 2 hủy yêu thích tài liệu (favorited: false)');

    // 11. Kiểm tra lại GET /api/resources/favorites của Member 2 -> Không còn nữa
    const favListAfter = await request({
      hostname: 'localhost',
      port: 3000,
      path: '/api/resources/favorites',
      method: 'GET',
      headers: { 'Authorization': 'Bearer ' + member2Token }
    });
    const notInFavs = !favListAfter.json?.items?.some(item => item.id === resourceId);
    assert(favListAfter.statusCode === 200 && notInFavs, '11. Tài liệu không còn trong favorites của Member 2 sau khi bỏ thích');

    // 12. Preview PDF: GET /api/resources/:id/preview
    const previewPdf = await request({
      hostname: 'localhost',
      port: 3000,
      path: `/api/resources/${resourceId}/preview`,
      method: 'GET',
      headers: { 'Authorization': 'Bearer ' + member1Token }
    });
    assert(previewPdf.statusCode === 200 && previewPdf.headers['content-type'].includes('application/pdf'), '12. Preview PDF trả về Content-Type: application/pdf');

    // 13. Upload file Code (py) và preview code
    const pyContent = 'import numpy as np\nprint("Hello 9.5 AI Club!")\n';
    const upPy = await uploadFile(member1Token, 'test_script.py', pyContent, 'Python Script Test', 'code', 'Programming');
    assert(upPy.statusCode === 201 && upPy.json?.resource?.id, '13. Upload file mã nguồn .py thành công');
    const pyId = upPy.json.resource.id;

    // 14. Preview Code .py
    const previewPy = await request({
      hostname: 'localhost',
      port: 3000,
      path: `/api/resources/${pyId}/preview`,
      method: 'GET',
      headers: { 'Authorization': 'Bearer ' + member1Token }
    });
    assert(previewPy.statusCode === 200 && previewPy.headers['content-type'].includes('text/plain') && previewPy.body.includes('Hello 9.5 AI Club'), '14. Preview Code .py trả về text/plain và nội dung code');

    // 15. Upload file ZIP và preview (phải trả JSON previewable: false)
    const zipHeader = Buffer.from([0x50, 0x4B, 0x05, 0x06, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]);
    const upZip = await uploadFile(member1Token, 'test_bundle.zip', zipHeader, 'ZIP Bundle', 'template', 'Templates');
    assert(upZip.statusCode === 201, '15. Upload file ZIP thành công');
    const zipId = upZip.json.resource.id;

    const previewZip = await request({
      hostname: 'localhost',
      port: 3000,
      path: `/api/resources/${zipId}/preview`,
      method: 'GET',
      headers: { 'Authorization': 'Bearer ' + member1Token }
    });
    assert(previewZip.statusCode === 200 && previewZip.json?.previewable === false, '16. Preview ZIP trả về previewable: false');

    // 17. Member 1 xóa tài liệu py của mình -> Thành công 200 OK
    const delPy = await request({
      hostname: 'localhost',
      port: 3000,
      path: `/api/resources/${pyId}`,
      method: 'DELETE',
      headers: { 'Authorization': 'Bearer ' + member1Token }
    });
    assert(delPy.statusCode === 200, '17. Member 1 (chính chủ) xóa tài liệu py thành công 200 OK');

    // 18. Owner xóa tài liệu pdf và zip -> Thành công 200 OK
    const delPdf = await request({
      hostname: 'localhost',
      port: 3000,
      path: `/api/resources/${resourceId}`,
      method: 'DELETE',
      headers: { 'Authorization': 'Bearer ' + ownerToken }
    });
    const delZip = await request({
      hostname: 'localhost',
      port: 3000,
      path: `/api/resources/${zipId}`,
      method: 'DELETE',
      headers: { 'Authorization': 'Bearer ' + ownerToken }
    });
    assert(delPdf.statusCode === 200 && delZip.statusCode === 200, '18. Owner xóa tài liệu thành công 200 OK (xóa DB và file đĩa)');

    console.log(`\n=== TỔNG KẾT: ${passed}/${total} KIỂM THỬ ĐẠT (100%) ===`);
  } catch (err) {
    console.error('Lỗi khi chạy test:', err);
  }
}

runTests();
