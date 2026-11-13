# NHẬT KÝ THAY ĐỔI TÀI LIỆU (CHANGELOG)

Tài liệu này theo dõi toàn bộ các phiên bản kiểm kê, đánh giá rủi ro, sơ đồ kiến trúc và bộ test case của dự án **9-5-ai-library**.

---

## [1.0.0] - 2026-10-22 (Phiên bản Cơ sở v1)

### Tổng quan Baseline v1
Phiên bản khởi tạo ban đầu (Baseline) được xây dựng trực tiếp dựa trên kiểm tra mã nguồn thực tế (tĩnh) và kết nối cơ sở dữ liệu MySQL cục bộ đang chạy của dự án.

### Thống kê Số liệu v1
* **Kiểm kê hệ thống (`00_SYSTEM_INVENTORY.md`):**
  * 28 trang HTML giao diện người dùng và quản trị.
  * 80 API endpoint backend (`backend/routes/`).
  * 23 bảng cơ sở dữ liệu MySQL (`db_library_a95`).
  * 5 vai trò người dùng: `guest`, `member`, `staff`, `admin`, `owner` và 3 trạng thái (`active`, `pending`, `banned`).
  * 21 khoá `localStorage` / `sessionStorage` tại trình duyệt.
* **Đánh giá dữ liệu thực tế (`01_DATA_ASSESSMENT.md`):**
  * 5 tài khoản thực tế (`1 owner`, `1 admin`, `1 staff`, `2 member`), không có cột `email` trong bảng `users`.
  * Khóa học 1 có 3 bài giảng đều bị trùng `chapter_order = 1`.
  * Ngân hàng đề thi tĩnh `practice-data.js` (2.41 MB) có 123 bài quiz, 2.359 câu hỏi; phát hiện **60 quiz rỗng**, **35 câu hỏi rỗng options**, **4 câu hỏi sai index đáp án**.
  * Phát hiện các tệp sao lưu rác/dư thừa (`.pdn`, `(1)`, `.bak`, `.sql`, `.json` dung lượng lớn).
* **Đăng ký lỗi & rủi ro (`02_FINDINGS_REGISTER.md` & `SECURITY_FINDINGS_PRIVATE.md`):**
  * Tổng cộng **24 phát hiện mở** (3 Critical, 9 High, 7 Medium, 5 Low).
  * Đã xác minh **4 hạng mục đã sửa thành công** (`VF-001` đến `VF-004`).
  * Phát hiện nghiêm trọng: Phục vụ tĩnh toàn bộ thư mục gốc dự án qua `express.static` (lộ tệp sao lưu DB), Stored XSS trong bình luận bài giảng, Leo thang đặc quyền Admin -> Owner, và Bỏ qua xác nhận xóa tài khoản.
* **Bộ sơ đồ UML & Flowchart (`diagrams/`):**
  * `01_use_cases.md`: 5 Actor, 2 sơ đồ Use Case, ma trận 46 phân quyền chi tiết.
  * `02_architecture.md`: Sơ đồ kiến trúc 3 tầng, cấu trúc component frontend, thứ tự nạp script.
  * `03_er_diagram.md`: Toàn bộ 23 bảng ERD Mermaid, đối chiếu sai khác DDL file vs MySQL thực tế.
  * `04_sequence_diagrams.md`: 15 sơ đồ Sequence chi tiết với nhánh Success và Error.
  * `05_activity_flowcharts.md`: 10 sơ đồ Activity Flowchart với nhánh điều kiện logic.
  * `06_state_diagrams.md`: 6 sơ đồ State Diagram chuẩn `stateDiagram-v2`.
* **Bộ Test Case v1 (`testcases/`):**
  * Tổng số: **290 test case** bao phủ 19 module chức năng và phi chức năng.
  * Phân bố độ ưu tiên: P0 (Blocker) = 85, P1 (High) = 115, P2 (Medium) = 65, P3 (Low) = 25.
  * Định dạng xuất bản: Markdown (`TESTCASES_v1.md`), CSV UTF-8 with BOM (`TESTCASES_v1.csv`), Excel OpenPyXL (`TESTCASES_v1.xlsx`), và Ma trận bao phủ (`COVERAGE_MATRIX_v1.md`).

---

## [2.0.0] - 2026-10-22 (Phiên bản Khắc phục & Kiểm thử Nâng cao v2)

### Tổng quan Bản v2
Phiên bản v2 hoàn thành toàn bộ đợt khắc phục các lỗ hổng bảo mật nghiêm trọng (F-001 đến F-005, F-007, F-008), chuẩn hoá dữ liệu và logic (F-010, F-011, F-012), cập nhật bộ sơ đồ kiến trúc/tuần tự/lưu trình theo thiết kế mới, và mở rộng bộ test case lên 323 kịch bản toàn diện kèm ma trận so sánh chi tiết.

### 1. Danh sách Commit Khắc phục (Git Commits)
1. `6a626e3` - `fix(security): F-001 restrict express.static to whitelist mounts`:
   - Gỡ bỏ `express.static(root)` phục vụ toàn bộ mã nguồn.
   - Thiết lập Whitelist mounts cho các thư mục cần thiết (`/pages`, `/css`, `/js`, `/assets`, `/home_page`, `/document/Lectures`, `/document/Practice`, `/document/uploads`) với `dotfiles: 'deny'`, `index: false`.
   - Bổ sung lớp chặn 404 bảo mật đặt trước static cho `/backend`, `/tools`, `/docs`, `/design`, `/flowchart testcase`, `.env`, `.sql`, `.bak`, `*.md`.
   - Đưa `.env` và `tools/backup/*.json` ra khỏi git cache (`git rm --cached`).
2. `9bb0ff9` - `fix(security): F-002 require auth and sanitize comments`:
   - Bổ sung middleware `verifyToken` trên `POST /api/lms/lectures/:lectureId/comments`.
   - Validate lectureId tồn tại trong DB, validate độ dài content (1-2000 ký tự), bỏ qua trường author gửi từ body.
   - Sửa `js/lecture-player.js` sử dụng `document.createElement()` và `.textContent` thay cho `innerHTML` chống XSS.
3. `569abc3` - `fix(security): F-003 enforce strict admin role hierarchy`:
   - Áp dụng thang phân cấp: `Owner (4) > Admin (3) > Staff (2) > Member (1)`.
   - Cấm Admin thao tác trên tài khoản có cấp bậc $\ge$ Admin (Owner).
   - Cấm người dùng gán vai trò mới $\ge$ quyền của chính mình (Admin không thể thăng cấp ai lên Owner).
   - Cập nhật giao diện `js/admin-users.js` vô hiệu hoá nút thao tác đối với các tài khoản cấp cao hơn hoặc ngang bằng.
4. `b8db84a` - `fix(security): F-004 require password to delete account`:
   - Endpoint `DELETE /api/users/me` yêu cầu xác nhận `confirmUsername` và `password` hiện tại.
   - Kiểm tra mật khẩu bằng `bcrypt.compare()` trước khi xoá dữ liệu vĩnh viễn trong CSDL.
   - Cập nhật Modal xác nhận nhập mật khẩu trong `pages/settings/settings.html` và `js/settings-preferences.js`.
5. `233bd8f` - `fix(security): F-005 check account status on each request`:
   - Cập nhật `verifyToken` (`backend/middlewares/authMiddleware.js`) thực hiện truy vấn thời gian thực `SELECT status, role FROM users WHERE id = ?`.
   - Tài khoản bị khoá (`banned`) hoặc không tồn tại sẽ bị từ chối ngay lập tức với mã HTTP 403 Forbidden.
6. `fbdd368` - `fix(security): F-007 rate limit login attempts`:
   - Triển khai In-Memory Rate Limiter trên `POST /api/auth/login`.
   - Giới hạn tối đa 10 lần thử trong cửa sổ 15 phút cho mỗi cặp (IP + Username). Lần thứ 11 trả về HTTP 429 Too Many Requests kèm header `Retry-After`.
7. `3a08a0e` - `fix(security): F-008 add standard security headers`:
   - Bổ sung các tiêu đề bảo mật: `X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN`, `Referrer-Policy: strict-origin-when-cross-origin`, `X-XSS-Protection: 1; mode=block`.
   - Khởi động an toàn: Tự động cảnh báo console nếu biến môi trường `JWT_SECRET` là mặc định hoặc dưới 32 ký tự.
8. `336f04f` - `fix(data): F-010/011 clean broken questions and load math scripts`:
   - Loại bỏ 39 câu hỏi lỗi trong `js/practice-data.js` (35 câu rỗng options, 4 câu sai index đáp án môn DBI202). Giữ lại 2,320 câu hỏi hợp lệ 100%.
   - Bổ sung script tags nạp `practice-data-mad101.js` và `practice-data-mae101.js` trong `pages/practice/practice-quiz-intro.html` để nạp đủ 2,204 câu hỏi toán.
9. `b4660b3` - `fix(logic): F-012 deterministic order and duplicate order warning`:
   - Sắp xếp bài giảng ổn định tuyệt đối: `ORDER BY chapter_order ASC, id ASC`.
   - Bổ sung cảnh báo trùng số thứ tự chương (Duplicate Chapter Order Warning) trong `backend/controllers/lmsController.js` và giao diện `js/admin-lms.js`.

### 2. Thống kê Kết quả Kiểm thử Bộ Test Case v2
* **Số lượng Test Case:** **323 test cases** (290 kịch bản v1 cơ sở + 33 kịch bản mới/hồi quy).
* **Phân bố độ ưu tiên nghiêm ngặt:**
  * **P0 (Blocker):** 42 (13.0%)
  * **P1 (Critical/High):** 138 (42.7%)
  * **P2 (Medium):** 118 (36.5%)
  * **P3 (Low):** 25 (7.7%)
  * **Tổng cộng:** 323 (100.0%)
* **Kết quả chạy kiểm thử tự động (Auto-safe / API regression):**
  * 45/45 test cases tự động đã chạy đều đạt kết quả **Passed (100%)**.
  * 0 ca kiểm thử thất bại (Failed: 0).
  * 278 ca kiểm thử thủ công/UI dành cho chuyên viên QA thực thi theo checklist.
* **Audit ngẫu nhiên mẫu v1 (Seed 42, 40 ca):** Tỷ lệ lỗi bước kiểm thử chỉ 2.5% (1/40: TC-A11-001 thiếu trap focus modal), đã được chuẩn hoá trong v2.

### 3. Cập nhật Tài liệu & Sơ đồ
* **`flowchart testcase/00_SYSTEM_INVENTORY.md`:** Cập nhật bảng endpoint, static whitelist mounts, cấu hình bảo mật mới và dữ liệu thực hành.
* **`flowchart testcase/02_FINDINGS_REGISTER.md` & `SECURITY_FINDINGS_PRIVATE.md`:** Chuyển trạng thái 10 finding sang Resolved, ghi nhận mã commit và hướng dẫn vận hành an toàn.
* **`flowchart testcase/CLEANUP_CANDIDATES.md`:** Lập danh mục kiểm kê 65 tệp/thư mục ứng viên dọn dẹp (tổng dung lượng ~4.7 MB) mà không xóa bất kỳ tệp nào.
* **`flowchart testcase/diagrams/`:** Cập nhật 4 sơ đồ cốt lõi (`01_use_cases.md`, `02_architecture.md`, `04_sequence_diagrams.md`, `05_activity_flowcharts.md`) gắn nhãn "(v2 cập nhật)".
* **Xác thực cú pháp Mermaid:** Toàn bộ các khối Mermaid được rà soát thủ công tỉ mỉ theo đúng đặc tả cú pháp Mermaid.js (toàn bộ nhãn chứa ký tự đặc biệt được bọc trong dấu ngoặc kép `""`, loại bỏ thẻ HTML thô, mũi tên chuẩn xác).
