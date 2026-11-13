# BÁO CÁO CHI TIẾT BẢO MẬT HỆ THỐNG - BẢN NỘI BỘ (SECURITY_FINDINGS_PRIVATE.md)

> [!CAUTION]
> **CẢNH BÁO BẢO MẬT NGHIÊM NGẶT - TUYỆT ĐỐI KHÔNG TRIỂN KHAI THƯ MỤC NÀY LÊN MÔI TRƯỜNG CÔNG KHAI!**  
> Do cấu hình `express.static` hiện tại của backend đang phục vụ toàn bộ thư mục gốc dự án (`path.join(__dirname, '../')`), bất kỳ tệp tin nào nằm trong thư mục `flowchart testcase/` này đều **CÓ THỂ BỊ TRUY CẬP CÔNG KHAI QUA TRÌNH DUYỆT BẰNG HTTP GET** nếu máy chủ đang chạy mà không có bộ lọc bổ sung.  
> Tài liệu này chỉ được lưu trữ trên môi trường phát triển cục bộ của lập trình viên và quản trị viên bảo mật.

---

## 1. PHÂN TÍCH LỖ HỔNG LỘ LỌT TỆP TĨNH QUA EXPRESS.STATIC

### 1.1. Bằng chứng kiểm tra thực tế (Thực hiện qua HTTP GET tới localhost:3000)
Mã nguồn tại [`backend/server.js:69-71`](file:///c:/Users/anhqu/Documents/Computer%20Science%20Training/PRIVATE%20PROJECT/9-5-ai-library/backend/server.js#L69-L71):
```javascript
app.use(express.static(path.join(__dirname, '../'), {
  dotfiles: 'deny'
}));
```
Mặc dù hệ thống đã có middleware chặn tại `backend/server.js:43-66`, danh sách đen (blacklist) chỉ chặn:
- `/backend/**`
- `/node_modules/**`
- Tệp bắt đầu bằng dấu chấm (`.(.*)`)
- `package.json`, `package-lock.json`
- `README.md`
- Đuôi `.bak`, `.log`, `.sql`, `.env`

### 1.2. Kết quả thăm dò trực tiếp mã phản hồi HTTP (Chỉ ghi nhận Status Code)

| Đường dẫn kiểm tra mẫu qua URL | Mã phản hồi HTTP | Kết luận bảo mật |
|:---|:---:|:---|
| `http://localhost:3000/backend/server.js` | **403 Forbidden** | Đã chặn thành công theo tiền tố `/backend` |
| `http://localhost:3000/.env` | **403 Forbidden** | Đã chặn thành công theo regex tệp ẩn / đuôi env |
| `http://localhost:3000/backend/.env` | **403 Forbidden** | Đã chặn thành công |
| `http://localhost:3000/package.json` | **403 Forbidden** | Đã chặn thành công theo regex package.json |
| `http://localhost:3000/README.md` | **403 Forbidden** | Đã chặn thành công theo regex README |
| `http://localhost:3000/tools/backup/ai_club_db_...sql` | **403 Forbidden** | Đã chặn thành công do có đuôi `.sql` |
| `http://localhost:3000/DARK_THEME_AUDIT.md` | **200 OK** | **LỘ LỌT:** Chỉ chặn `README.md`, các tài liệu phân tích nội bộ `*_AUDIT.md` bị đọc công khai! |
| `http://localhost:3000/tools/backup/backup_before_settings_1792315787059.json` | **200 OK** | **NGUY CƠ CRITICAL:** Tệp sao lưu CSDL dạng JSON trong `tools/backup/` bị tải tự do do mang đuôi `.json`! |
| `http://localhost:3000/tools/summarize_measure.js` | **200 OK** | **LỘ LỌT:** Toàn bộ mã nguồn kịch bản trong `tools/` bị đọc công khai |
| `http://localhost:3000/translate.py` | **200 OK** | **LỘ LỌT:** Mã nguồn kịch bản Python ở thư mục gốc bị đọc |
| `http://localhost:3000/document/Lectures/Ky_II/CEA201/test/Giải_mã_Hệ_thống_Số.mp4` | **200 OK** | **LỘ LỌT:** Video bài giảng tải trực tiếp không cần đăng nhập hay kiểm tra bài khoá |

### 1.3. Đề xuất khắc phục dứt điểm
- **Không phục vụ thư mục gốc dự án:** Tách biệt hoàn toàn thư mục web tĩnh (VD: chỉ phục vụ thư mục `public/` hoặc chỉ định danh sách thư mục cho phép: `pages/`, `css/`, `js/`, `assets/`).
- **Thư mục `tools/`, `document/`, tài liệu markdown và mã nguồn backend:** Phải nằm ngoài phạm vi của `express.static`.

---

## 2. PHÂN TÍCH CÁC RỦI RO BẢO MẬT TRỌNG YẾU KHÁC

### 2.1. Lỗ hổng XSS lưu trữ (Stored XSS) trong bình luận bài giảng (F-SEC-01)
- **Vị trí bằng chứng:** [`js/lecture-player.js:620,626`](file:///c:/Users/anhqu/Documents/Computer%20Science%20Training/PRIVATE%20PROJECT/9-5-ai-library/js/lecture-player.js#L620-L626) và [`backend/routes/lmsRoutes.js:183-192`](file:///c:/Users/anhqu/Documents/Computer%20Science%20Training/PRIVATE%20PROJECT/9-5-ai-library/backend/routes/lmsRoutes.js#L183-L192).
- **Cơ chế:**
  1. API `POST /api/lms/lectures/:lectureId/comments` không bắt buộc header Authorization:
     ```javascript
     router.post('/lectures/:lectureId/comments', (req, res, next) => {
       const token = req.headers['authorization'];
       if (token) return verifyToken(req, res, next);
       next();
     }, lmsController.addComment);
     ```
  2. Bất kỳ người dùng ẩn danh nào cũng có thể gửi POST với nội dung chứa mã HTML/JavaScript trong trường `content` hoặc `userName`.
  3. Khi trình phát bài giảng render bình luận tại `lecture-player.js:626`:
     ```javascript
     '<div style="...">' + c.content + '</div>'
     ...
     commentsListEl.innerHTML = html;
     ```
     Dữ liệu `c.content` và `c.user_name` được nối trực tiếp vào chuỗi HTML mà không qua hàm `escapeHtml()`.
- **Tác động:** Kẻ tấn công có thể chèn script độc hại đánh cắp `token` trong localStorage của bất kỳ ai vào học bài giảng này.
- **Biện pháp khắc phục:**
  - Backend: Bắt buộc middleware `verifyToken` trên route POST bình luận.
  - Frontend: Sử dụng hàm `escapeHtml(c.content)` và `escapeHtml(c.user_name)` trước khi render, hoặc dùng DOM API an toàn (`textContent`).

### 2.2. Leo thang đặc quyền Admin tác động Owner (F-SEC-02)
- **Vị trí bằng chứng:** [`backend/controllers/adminController.js:19-21, 42`](file:///c:/Users/anhqu/Documents/Computer%20Science%20Training/PRIVATE%20PROJECT/9-5-ai-library/backend/controllers/adminController.js#L19-L21) và [`backend/routes/adminRoutes.js:12`](file:///c:/Users/anhqu/Documents/Computer%20Science%20Training/PRIVATE%20PROJECT/9-5-ai-library/backend/routes/adminRoutes.js#L12).
- **Cơ chế:** Endpoint `PUT /api/admin/users/:id` được bảo vệ bởi middleware `isAdminOrOwner`. Controller chỉ kiểm tra:
  ```javascript
  if (req.user.id == targetUserId) {
    return res.status(403).json({ error: 'Cannot change your own status' });
  }
  ```
  Nếu một tài khoản có vai trò `admin` gửi request cập nhật người dùng ID 1 (Owner), controller sẽ thực thi câu lệnh SQL:
  ```sql
  UPDATE users SET role = 'member', status = 'banned' WHERE id = 1
  ```
- **Tác động:** Quản trị viên cấp dưới (Admin) có thể chiếm quyền điều khiển bằng cách hạ bệ hoặc khoá tài khoản Chủ sở hữu (Owner), hoặc tự phong cho tài khoản khác lên làm Owner.
- **Biện pháp khắc phục:** Bổ sung điều kiện kiểm tra: Chỉ có `owner` mới được phép thay đổi tài khoản của `owner` hoặc gán quyền `owner` cho người khác (`if ((targetUser.role === 'owner' || newRole === 'owner') && req.user.role !== 'owner') return res.status(403)...`).

### 2.3. Bỏ qua xác nhận khi xoá tài khoản (F-SEC-03)
- **Vị trí bằng chứng:** [`backend/controllers/userController.js:82-86`](file:///c:/Users/anhqu/Documents/Computer%20Science%20Training/PRIVATE%20PROJECT/9-5-ai-library/backend/controllers/userController.js#L82-L86).
- **Cơ chế:**
  ```javascript
  if (confirm_email && confirm_email.trim().toLowerCase() !== rows[0].username.toLowerCase()) {
    return res.status(400).json({ error: 'Email xác nhận không khớp' });
  }
  await db.query('DELETE FROM users WHERE id = ?', [userId]);
  ```
  Biểu thức điều kiện sử dụng `confirm_email && ...`. Nếu kẻ tấn công hoặc client gửi request `DELETE /api/users/me` với body `{}` (hoặc không gửi trường `confirm_email`), điều kiện kiểm tra bị bỏ qua hoàn toàn và CSDL thực hiện lệnh xoá vĩnh viễn tài khoản ngay lập tức.
- **Biện pháp khắc phục:** Bắt buộc trường xác nhận: `if (!confirm_email || confirm_email.trim().toLowerCase() !== rows[0].username.toLowerCase()) return res.status(400)...`.

### 2.4. Thiếu cơ chế vô hiệu hoá Token khi đổi mật khẩu hoặc bị Banned (F-SEC-04)
- **Vị trí bằng chứng:** [`backend/middlewares/authMiddleware.js:15-18`](file:///c:/Users/anhqu/Documents/Computer%20Science%20Training/PRIVATE%20PROJECT/9-5-ai-library/backend/middlewares/authMiddleware.js#L15-L18).
- **Cơ chế:** Middleware `verifyToken` chỉ thực hiện xác thực chữ ký số bằng `jwt.verify(tokenBody, process.env.JWT_SECRET)` và gán `req.user = decoded;` mà không truy vấn lại CSDL.
  Khi một tài khoản bị Admin gắn cờ `status = 'banned'` hoặc khi người dùng đổi mật khẩu, JWT token đã cấp trước đó (có hạn 1 đến 30 ngày) vẫn tiếp tục hoạt động cho đến khi hết hạn.
- **Biện pháp khắc phục:** Bổ sung trường `token_version` hoặc truy vấn trạng thái `status` của người dùng trong middleware xác thực.

### 2.5. Không có giới hạn tần suất yêu cầu (Rate Limiting) (F-SEC-05)
- **Vị trí bằng chứng:** [`backend/server.js`](file:///c:/Users/anhqu/Documents/Computer%20Science%20Training/PRIVATE%20PROJECT/9-5-ai-library/backend/server.js) và [`backend/package.json`](file:///c:/Users/anhqu/Documents/Computer Science Training/PRIVATE PROJECT/9-5-ai-library/backend/package.json).
- **Cơ chế:** Không cài đặt thư viện `express-rate-limit`. Các endpoint nhạy cảm như `POST /api/auth/login`, `POST /api/auth/register`, `POST /api/lms/upload-video` không có bất kỳ rào cản nào chống lại tấn công dò mật khẩu vét cạn (brute force) hoặc tấn công từ chối dịch vụ làm cạn kiệt dung lượng đĩa.
- **Biện pháp khắc phục:** Áp dụng `express-rate-limit` (tối đa 5 lần thử sai / 15 phút cho login).

### 2.6. CORS mở hoàn toàn và thiếu tiêu đề bảo mật (Security Headers) (F-SEC-06)
- **Vị trí bằng chứng:** [`backend/server.js:23-27`](file:///c:/Users/anhqu/Documents/Computer%20Science%20Training/PRIVATE%20PROJECT/9-5-ai-library/backend/server.js#L23-L27).
- **Cơ chế:** Cấu hình `app.use(cors())` mở cho mọi domain (`*`). Chỉ có một header duy nhất là `X-Content-Type-Options: nosniff`. Hoàn toàn thiếu:
  - `Content-Security-Policy` (CSP)
  - `X-Frame-Options` (Nguy cơ Clickjacking)
  - `Strict-Transport-Security` (HSTS)
- **Biện pháp khắc phục:** Cài đặt `helmet` middleware và cấu hình CSP chặt chẽ.
