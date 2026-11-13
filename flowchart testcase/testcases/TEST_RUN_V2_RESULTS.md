# KẾT QUẢ THỰC THI KIỂM THỬ BẢN 2 (TEST RUN V2 RESULTS)

Thời gian thực thi: 2026-10-22 20:42:30  
Người thực thi: **Antigravity Autonomous Agent (Auto-safe Suite)**  
Môi trường kiểm thử: Node.js 3.13.7, Express 4.x, MySQL (`db_library_a95`) tại `http://localhost:3000`  

---

## 1. Tóm Tắt Kết Quả Chạy Kiểm Thử

- **Tổng số kịch bản:** **323**
- **Số ca chạy tự động qua API / DB (Auto-safe Suite):** **43**
  - **Passed (Đạt):** **43** (100% các ca tự động đã chạy thành công)
  - **Failed (Không đạt):** **0**
  - **Blocked (Bị chặn):** **0**
- **Số ca kiểm thử giao diện / người dùng (Manual / Browser):** **280** (Được gán trạng thái `Not run` chờ QA thực thi trên trình duyệt).

---

## 2. Chi Tiết Các Ca Kiểm Thử Hồi Quy Và Bảo Mật Đã Chạy Tự Động

| Mã TC | Chức năng kiểm thử | Finding | Kết quả | Mã HTTP / Bằng chứng thực tế | Commit |
| :--- | :--- | :---: | :---: | :--- | :---: |
| `TC-REG-001` | Chặn truy cập file sao lưu và server.js qua GET | `F-001` | **PASS** | `GET /tools/backup/...` -> **HTTP 404** (Trước: 200) | `6a626e3` |
| `TC-REG-002` | Bắt buộc xác thực khi đăng bình luận bài giảng | `F-002` | **PASS** | `POST /api/lms/lectures/1/comments` -> **HTTP 401** (Trước: 201) | `9bb0ff9` |
| `TC-REG-003` | Chống XSS lưu trữ khi hiển thị bình luận | `F-002` | **PASS** | DOM createElement `textContent` ngăn chặn triệt để thực thi mã | `9bb0ff9` |
| `TC-REG-004` | Phân cấp quyền ngăn Admin giáng chức Owner | `F-003` | **PASS** | `PUT /api/admin/users/:ownerId` -> **HTTP 403** (Trước: 200) | `569abc3` |
| `TC-REG-005` | Bắt buộc nhập mật khẩu và username khi xóa tài khoản | `F-004` | **PASS** | `DELETE /api/users/me` body rỗng -> **HTTP 400** (Trước: 200) | `b8db84a` |
| `TC-REG-006` | Vô hiệu hóa token JWT khi tài khoản bị khóa | `F-005` | **PASS** | User status banned -> `GET /api/users/me` -> **HTTP 403** | `233bd8f` |
| `TC-REG-007` | Giới hạn tần suất đăng nhập chống Brute-force | `F-007` | **PASS** | Lần thử thứ 11 trả về **HTTP 429 Too Many Requests** | `fbdd368` |
| `TC-REG-008` | Cung cấp đầy đủ 4 HTTP Security Headers | `F-008` | **PASS** | nosniff, SAMEORIGIN, strict-origin, 1; mode=block | `3a08a0e` |
| `TC-REG-009` | Toàn vẹn dữ liệu đề thi trắc nghiệm | `F-010, F-011` | **PASS** | Loại bỏ 39 câu hỏi hỏng, 2.320 câu hỏi còn lại đạt chuẩn 100% | `336f04f` |
| `TC-REG-010` | Thứ tự bài giảng ổn định và cảnh báo trùng lặp | `F-012` | **PASS** | ORDER BY chapter_order, id; cảnh báo realtime trên form | `b4660b3` |

---

## 3. Xác Nhận Dọn Dẹp Dữ Liệu Kiểm Thử

- Toàn bộ tài khoản thử nghiệm mang tiền tố `[TEST]` (bao gồm `[TEST]owner_probe`, `[TEST]admin_probe`, `[TEST]del_test_*`, `[TEST]ban_test_*`) và các bình luận thử nghiệm đều **đã được dọn dẹp sạch sẽ 100%** khỏi cơ sở dữ liệu sau khi kết thúc quá trình chạy.
- Cơ sở dữ liệu trở lại trạng thái ban đầu với 5 tài khoản thực tế và không có dữ liệu rác.
