# BẰNG CHỨNG KIỂM THỬ TRƯỚC KHI KHẮC PHỤC (BASELINE EVIDENCE BEFORE FIXES)

Thời gian kiểm thử: 2026-10-22T13:17:43.127Z
Môi trường: Node.js v24.15.0, Express 4.x, MySQL (Localhost:3000)

---

## 1. F-001: Phục vụ tĩnh toàn bộ thư mục gốc dự án qua express.static
Kết quả gửi yêu cầu HTTP GET trực tiếp tới các tệp nhạy cảm trên máy chủ:

| Đường dẫn nhạy cảm | Mã HTTP trả về | Đánh giá trước khi sửa |
| :--- | :---: | :--- |
| `/tools/backup/backup_before_settings_1792315787059.json` | **200** | ❌ THẤT BẠI (Lộ tệp nhạy cảm) |
| `/backend/server.js` | **403** | ✅ An toàn |
| `/backend/config/db.js` | **403** | ✅ An toàn |
| `/README.md` | **403** | ✅ An toàn |
| `/package.json` | **403** | ✅ An toàn |
| `/LMS_YOUTUBE_AUDIT.md` | **200** | ❌ THẤT BẠI (Lộ tệp nhạy cảm) |
| `/NOTIFICATIONS_AUDIT.md` | **200** | ❌ THẤT BẠI (Lộ tệp nhạy cảm) |

**Nhận định:** Máy chủ trả về HTTP 200 cho toàn bộ các tệp sao lưu dữ liệu JSON, mã nguồn server.js, cấu hình DB, tài liệu kiểm toán và mã nguồn gốc.

---

## 2. F-002: Lỗ hổng Stored XSS & Đăng bình luận bài giảng không cần đăng nhập
- **Endpoint:** `POST /api/lms/lectures/1/comments`
- **Payload:** `{"author": "[TEST] Anonymous Attacker", "content": "<img src=x onerror=alert(1)>"}` (Không kèm header Authorization)
- **Mã HTTP trả về:** **201**
- **Dữ liệu phản hồi:** `{"success":true,"comment":{"id":5,"user_id":null,"user_name":"Thành viên","user_role":"member","user_avatar":"T","content":"<img src=x onerror=alert(1)>","created_at":"20:17 22/10/2026"}}`

**Nhận định:** API chấp nhận bình luận ẩn danh không cần token (HTTP 201), cho phép lưu trữ trực tiếp chuỗi XSS vào cơ sở dữ liệu.

---

## 3. F-003: Leo thang đặc quyền - Admin hạ quyền/khoá Owner
- **Endpoint:** `PUT /api/admin/users/:ownerId`
- **Actor:** Tài khoản kiểm thử vai trò `admin` (`[TEST]admin_probe`)
- **Target:** Tài khoản kiểm thử vai trò `owner` (`[TEST]owner_probe`)
- **Payload:** `{"role": "member", "status": "banned"}`
- **Mã HTTP trả về:** **200**
- **Trạng thái thực tế trong DB sau lệnh:** Vai trò chuyển thành `member`, trạng thái `banned`.

**Nhận định:** API trả về HTTP 200 và cập nhật thành công việc giáng chức và khoá tài khoản Owner bởi một tài khoản Admin.

---

## 4. F-004: Bỏ qua bước xác nhận khi xóa tài khoản
- **Endpoint:** `DELETE /api/users/account`
- **Actor:** Người dùng thường (`[TEST]del_probe`)
- **Payload gửi đi:** `{}` (Đối tượng rỗng, không có password, không có confirm_email/username)
- **Mã HTTP trả về:** **200**
- **Dữ liệu phản hồi:** `{"message":"Tài khoản đã được xoá vĩnh viễn"}`
- **Tài khoản còn trong DB không:** **Đã bị xóa mất**

**Nhận định:** Lỗ hổng logic (`if (confirm_email && ...)`) khiến tài khoản bị xóa ngay lập tức nếu client không gửi trường xác nhận.
