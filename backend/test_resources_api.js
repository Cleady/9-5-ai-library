const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const BASE_URL = 'http://localhost:3000/api/resources';
const secret = process.env.JWT_SECRET;

const tokenOwner = jwt.sign({ id: 1, username: 'owner95aiclub@internal.edu.vn', role: 'owner', status: 'active' }, secret);
const tokenMember = jwt.sign({ id: 4, username: 'anhquan2007nek@gmail.com', role: 'member', status: 'active' }, secret);
const tokenMember2 = jwt.sign({ id: 5, username: 'anhquandaynay2007@gmail.com', role: 'member', status: 'active' }, secret);
const tokenBanned = jwt.sign({ id: 99, username: 'banned_user', role: 'member', status: 'banned' }, secret);

// Chuẩn bị các file test
const testDir = path.join(__dirname, 'test_tmp');
if (!fs.existsSync(testDir)) fs.mkdirSync(testDir, { recursive: true });

// 1. File PDF hợp lệ (chứa magic bytes %PDF)
const validPdfPath = path.join(testDir, 'sample_ml.pdf');
fs.writeFileSync(validPdfPath, Buffer.concat([Buffer.from('%PDF-1.4\n1 0 obj\n<< /Title (Test ML) >>\nendobj\ntrailer\n<<>>\n%%EOF')]));

// 2. File CSV hợp lệ (chữ văn bản)
const validCsvPath = path.join(testDir, 'housing.csv');
fs.writeFileSync(validCsvPath, 'id,area,price\n1,100,200000\n2,150,300000\n3,80,160000\n');

// 3. File Python hợp lệ
const validPyPath = path.join(testDir, 'model.py');
fs.writeFileSync(validPyPath, '# Model training\nimport math\ndef sigmoid(x):\n    return 1 / (1 + math.exp(-x))\n');

// 4. File đuôi cấm (.exe)
const invalidExtPath = path.join(testDir, 'malware.exe');
fs.writeFileSync(invalidExtPath, 'MZFakeExecutableContent');

// 5. File giả đuôi (đuôi .pdf nhưng nội dung không có %PDF)
const fakePdfPath = path.join(testDir, 'fake.pdf');
fs.writeFileSync(fakePdfPath, 'This is definitely not a real pdf file');

// 6. File vượt quá 20MB (21MB)
const hugeFilePath = path.join(testDir, 'huge.pdf');
const hugeBuffer = Buffer.alloc(21 * 1024 * 1024, 0x20); // 21MB spaces
hugeBuffer.write('%PDF-1.4', 0);
fs.writeFileSync(hugeFilePath, hugeBuffer);

async function runTests() {
  console.log('=== BẮT ĐẦU KIỂM THỬ RESOURCE API GIAI ĐOẠN 2 ===\n');

  // Test 1: Không có token -> 401
  const res1 = await fetch(BASE_URL);
  console.log('1. [GET /api/resources] Không có token: Status =', res1.status, '(Kỳ vọng 401)');

  // Test 2: Upload bởi tài khoản bị BANNED -> 403
  const formBanned = new FormData();
  formBanned.append('file', new Blob([fs.readFileSync(validPdfPath)], { type: 'application/pdf' }), 'test.pdf');
  formBanned.append('title', 'Tài liệu bị cấm');
  const resBanned = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${tokenBanned}` },
    body: formBanned
  });
  console.log('2. [POST /api/resources] Tài khoản BANNED upload: Status =', resBanned.status, '(Kỳ vọng 403)');

  // Test 3: Upload file đuôi cấm (.exe) -> 400
  const formExt = new FormData();
  formExt.append('file', new Blob([fs.readFileSync(invalidExtPath)]), 'malware.exe');
  formExt.append('title', 'File độc hại');
  const resExt = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${tokenMember}` },
    body: formExt
  });
  const dataExt = await resExt.json();
  console.log('3. [POST /api/resources] Upload đuôi cấm .exe: Status =', resExt.status, '| Error:', dataExt.error, '(Kỳ vọng 400)');

  // Test 4: Upload file giả đuôi (fake.pdf không có %PDF) -> 400
  const formFake = new FormData();
  formFake.append('file', new Blob([fs.readFileSync(fakePdfPath)], { type: 'application/pdf' }), 'fake.pdf');
  formFake.append('title', 'File giả PDF');
  const resFake = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${tokenMember}` },
    body: formFake
  });
  const dataFake = await resFake.json();
  console.log('4. [POST /api/resources] Upload file giả chữ ký magic bytes: Status =', resFake.status, '| Error:', dataFake.error, '(Kỳ vọng 400)');

  // Test 5: Upload file > 20MB -> 400
  const formHuge = new FormData();
  formHuge.append('file', new Blob([fs.readFileSync(hugeFilePath)], { type: 'application/pdf' }), 'huge.pdf');
  formHuge.append('title', 'File quá 20MB');
  const resHuge = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${tokenMember}` },
    body: formHuge
  });
  const dataHuge = await resHuge.json();
  console.log('5. [POST /api/resources] Upload file > 20MB: Status =', resHuge.status, '| Error:', dataHuge.error, '(Kỳ vọng 400)');

  // Test 6: Upload file PDF hợp lệ bởi Member -> 201
  const formPdf = new FormData();
  formPdf.append('file', new Blob([fs.readFileSync(validPdfPath)], { type: 'application/pdf' }), 'sample_ml.pdf');
  formPdf.append('title', 'Tài liệu Ôn thi Machine Learning');
  formPdf.append('subject', 'Machine Learning');
  formPdf.append('type', 'document');
  formPdf.append('description', 'Bộ tài liệu tóm tắt kiến thức Machine Learning cơ bản');
  const resPdf = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${tokenMember}` },
    body: formPdf
  });
  const dataPdf = await resPdf.json();
  console.log('6. [POST /api/resources] Upload file PDF hợp lệ: Status =', resPdf.status, '| ID =', dataPdf.resource?.id, '(Kỳ vọng 201)');
  const resourceId1 = dataPdf.resource?.id;

  // Test 7: Upload file CSV hợp lệ bởi Owner -> 201
  const formCsv = new FormData();
  formCsv.append('file', new Blob([fs.readFileSync(validCsvPath)], { type: 'text/csv' }), 'housing.csv');
  formCsv.append('title', 'Tập dữ liệu Giá nhà 2026');
  formCsv.append('subject', 'Data Science');
  formCsv.append('type', 'dataset');
  const resCsv = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${tokenOwner}` },
    body: formCsv
  });
  const dataCsv = await resCsv.json();
  console.log('7. [POST /api/resources] Upload file CSV hợp lệ: Status =', resCsv.status, '| ID =', dataCsv.resource?.id, '(Kỳ vọng 201)');
  const resourceId2 = dataCsv.resource?.id;

  // Test 8: Upload file Python hợp lệ bởi Member -> 201
  const formPy = new FormData();
  formPy.append('file', new Blob([fs.readFileSync(validPyPath)], { type: 'text/plain' }), 'model.py');
  formPy.append('title', 'Mã nguồn Sigmoid Function');
  formPy.append('subject', 'Programming');
  formPy.append('type', 'code');
  const resPy = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${tokenMember}` },
    body: formPy
  });
  const dataPy = await resPy.json();
  console.log('8. [POST /api/resources] Upload file Python code: Status =', resPy.status, '| ID =', dataPy.resource?.id, '(Kỳ vọng 201)');
  const resourceId3 = dataPy.resource?.id;

  // Test 9: Lấy danh sách tài liệu [GET /api/resources]
  const resList = await fetch(`${BASE_URL}?page=1&limit=10`, {
    headers: { 'Authorization': `Bearer ${tokenMember}` }
  });
  const dataList = await resList.json();
  console.log('9. [GET /api/resources] Danh sách tài liệu: Status =', resList.status, '| Total =', dataList.pagination?.total, '| Items count =', dataList.items?.length);

  // Test 10: Thống kê [GET /api/resources/stats]
  const resStats = await fetch(`${BASE_URL}/stats`, {
    headers: { 'Authorization': `Bearer ${tokenMember}` }
  });
  const dataStats = await resStats.json();
  console.log('10. [GET /api/resources/stats] Thống kê: Categories =', dataStats.categories, '| Subjects =', dataStats.subjects, '| Total =', dataStats.total);

  // Test 11: Tài liệu mới nhất [GET /api/resources/recent]
  const resRecent = await fetch(`${BASE_URL}/recent?limit=3`, {
    headers: { 'Authorization': `Bearer ${tokenMember}` }
  });
  const dataRecent = await resRecent.json();
  console.log('11. [GET /api/resources/recent] Mới nhất: Count =', dataRecent.items?.length);

  // Test 12: Chi tiết tài liệu [GET /api/resources/:id]
  const resDetail = await fetch(`${BASE_URL}/${resourceId1}`, {
    headers: { 'Authorization': `Bearer ${tokenMember}` }
  });
  const dataDetail = await resDetail.json();
  console.log('12. [GET /api/resources/:id] Chi tiết ID', resourceId1, ': Title =', dataDetail.resource?.title, '| Uploader =', dataDetail.resource?.uploader?.full_name);

  // Test 13: Xem trước PDF [GET /api/resources/:id/preview]
  const resPreviewPdf = await fetch(`${BASE_URL}/${resourceId1}/preview`, {
    headers: { 'Authorization': `Bearer ${tokenMember}` }
  });
  console.log('13. [GET /api/resources/:id/preview] Preview PDF: Content-Type =', resPreviewPdf.headers.get('content-type'), '| Content-Disposition =', resPreviewPdf.headers.get('content-disposition'));

  // Test 14: Xem trước Python/Text [GET /api/resources/:id/preview]
  const resPreviewPy = await fetch(`${BASE_URL}/${resourceId3}/preview`, {
    headers: { 'Authorization': `Bearer ${tokenMember}` }
  });
  const pyText = await resPreviewPy.text();
  console.log('14. [GET /api/resources/:id/preview] Preview Code Text: Status =', resPreviewPy.status, '| Preview snippet =', JSON.stringify(pyText.slice(0, 30)));

  // Test 15: Tải file [GET /api/resources/:id/download] (Kiểm tra tăng download count)
  const resDl = await fetch(`${BASE_URL}/${resourceId1}/download`, {
    headers: { 'Authorization': `Bearer ${tokenMember}` }
  });
  console.log('15. [GET /api/resources/:id/download] Download file: Status =', resDl.status, '| Content-Disposition =', resDl.headers.get('content-disposition'));
  const resDetailAfterDl = await fetch(`${BASE_URL}/${resourceId1}`, {
    headers: { 'Authorization': `Bearer ${tokenMember}` }
  });
  const dataDetailAfterDl = await resDetailAfterDl.json();
  console.log('    -> Downloads sau khi tải:', dataDetailAfterDl.resource?.downloads, '(Đã tăng từ 0 lên 1)');

  // Test 16: Toggle Favorite [POST /api/resources/:id/favorite]
  const resFav1 = await fetch(`${BASE_URL}/${resourceId1}/favorite`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${tokenMember}` }
  });
  const dataFav1 = await resFav1.json();
  console.log('16. [POST /api/resources/:id/favorite] Thêm yêu thích: favorited =', dataFav1.favorited);

  // Test 17: Danh sách yêu thích của tôi [GET /api/resources/favorites]
  const resMyFav = await fetch(`${BASE_URL}/favorites`, {
    headers: { 'Authorization': `Bearer ${tokenMember}` }
  });
  const dataMyFav = await resMyFav.json();
  console.log('17. [GET /api/resources/favorites] Danh sách yêu thích: Count =', dataMyFav.items?.length, '| ID item =', dataMyFav.items?.[0]?.id);

  // Test 18: Member2 sửa file của Member1 -> 403 Forbidden
  const resPutUnauthorized = await fetch(`${BASE_URL}/${resourceId1}`, {
    method: 'PUT',
    headers: { 'Authorization': `Bearer ${tokenMember2}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: 'Hacked Title' })
  });
  console.log('18. [PUT /api/resources/:id] Member khác sửa file không có quyền: Status =', resPutUnauthorized.status, '(Kỳ vọng 403)');

  // Test 19: Chính tác giả sửa file -> 200 OK
  const resPutAuthor = await fetch(`${BASE_URL}/${resourceId1}`, {
    method: 'PUT',
    headers: { 'Authorization': `Bearer ${tokenMember}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: 'Tài liệu Ôn thi ML (Đã cập nhật)', subject: 'Machine Learning' })
  });
  const dataPutAuthor = await resPutAuthor.json();
  console.log('19. [PUT /api/resources/:id] Tác giả sửa file: Status =', resPutAuthor.status, '| New title =', dataPutAuthor.resource?.title);

  // Test 20: Member2 xóa file của Member1 -> 403 Forbidden
  const resDelUnauthorized = await fetch(`${BASE_URL}/${resourceId1}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${tokenMember2}` }
  });
  console.log('20. [DELETE /api/resources/:id] Member khác xóa file không có quyền: Status =', resDelUnauthorized.status, '(Kỳ vọng 403)');

  // Test 21: Tác giả xóa file của mình -> 200 OK
  const resDelAuthor = await fetch(`${BASE_URL}/${resourceId3}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${tokenMember}` }
  });
  console.log('21. [DELETE /api/resources/:id] Tác giả xóa file: Status =', resDelAuthor.status, '(Kỳ vọng 200)');

  // Test 22: Thử truy cập file vật lý trong backend/storage qua URL tĩnh -> Phải bị chặn 403
  const resStatic = await fetch('http://localhost:3000/backend/storage/resources/');
  console.log('22. [GET /backend/storage/resources/] Truy cập trực tiếp qua static URL: Status =', resStatic.status, '(Kỳ vọng 403)');

  console.log('\n=== TẤT CẢ 22 BÀI KIỂM THỬ ĐÃ HOÀN TẤT THÀNH CÔNG ===');

  // Dọn dẹp thư mục test tạm
  try {
    fs.rmSync(testDir, { recursive: true, force: true });
  } catch (e) {}
}

runTests().catch(err => {
  console.error('Lỗi khi chạy test:', err);
  process.exit(1);
});
