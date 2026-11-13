# SỔ ĐĂNG KÝ LỖI VÀ RỦI RO HỆ THỐNG (02_FINDINGS_REGISTER.md)

**Dự án:** 9-5-ai-library  
**Phiên bản tài liệu:** v1 (Baseline)  
**Thời điểm khảo sát:** 22/10/2026  
**Quy ước định danh:** `F-xxx` (Phát hiện tồn đọng), `VF-xxx` (Đã kiểm chứng khắc phục ở các đợt trước).

---

## 1. BẢNG TỔNG HỢP PHÁT HIỆN THEO MỨC ĐỘ VÀ NHÓM

| Nhóm phân loại (Category) | Critical (Nghiêm trọng) | High (Cao) | Medium (Trung bình) | Low (Thấp) | Tổng số |
|:---|:---:|:---:|:---:|:---:|:---:|
| **Security** (Bảo mật) | 3 | 5 | 0 | 0 | **8** |
| **Data Integrity** (Toàn vẹn dữ liệu) | 0 | 2 | 0 | 1 | **3** |
| **Logic / Consistency** (Nghiệp vụ & Logic) | 0 | 2 | 3 | 0 | **5** |
| **UX / UI** (Giao diện & Trải nghiệm) | 0 | 0 | 1 | 1 | **2** |
| **Performance** (Hiệu năng tải trang & CSDL) | 0 | 0 | 2 | 0 | **2** |
| **Config / Deploy** (Cấu hình & Triển khai) | 0 | 0 | 1 | 0 | **1** |
| **Maintainability** (Bảo trì mã nguồn) | 0 | 0 | 0 | 3 | **3** |
| **Tổng cộng** | **3** | **9** | **7** | **5** | **24** |

---

## 2. DANH SÁCH CHI TIẾT CÁC PHÁT HIỆN TỒN ĐỌNG (OPEN FINDINGS)

### [MỨC ĐỘ: CRITICAL - NGHIÊM TRỌNG]

#### F-001: Lộ lọt tệp sao lưu dữ liệu và tài liệu nội bộ qua `express.static` phục vụ thư mục gốc
- **Nhóm:** Security
- **Mô tả:** `backend/server.js:69-71` cấu hình phục vụ toàn bộ thư mục gốc dự án. Bộ lọc danh sách đen tại `server.js:43-66` chỉ chặn đuôi `.sql`, `.env`, `.bak`, `.log` và bỏ sót tệp sao lưu `.json` cùng các tài liệu `*_AUDIT.md`.
- **Bằng chứng:**
  - `curl -s -o NUL -w "%{http_code}" http://localhost:3000/tools/backup/backup_before_settings_1792315787059.json` -> Trả về mã **`200 OK`**.
  - `curl -s -o NUL -w "%{http_code}" http://localhost:3000/DARK_THEME_AUDIT.md` -> Trả về mã **`200 OK`**.
- **Tác động:** Kẻ tấn công trên mạng công khai có thể tải về toàn bộ tệp sao lưu CSDL cấu hình hệ thống và đọc các báo cáo kiểm thử nội bộ.
- **Đề xuất khắc phục:** Chỉ định danh sách thư mục web được phép phục vụ tĩnh (`pages`, `css`, `js`, `assets`), chuyển thư mục `tools/` và tài liệu markdown ra ngoài phạm vi `express.static`.
- **Trạng thái:** Open
- **Test case liên kết:** `TC-SEC-001`, `TC-SEC-002`

---

#### F-002: Lỗ hổng XSS lưu trữ (Stored XSS) trong tính năng bình luận bài giảng
- **Nhóm:** Security
- **Mô tả:** API gửi bình luận bài giảng không bắt buộc xác thực, đồng thời frontend render nối chuỗi HTML trực tiếp không qua hàm escape.
- **Bằng chứng:**
  - `backend/routes/lmsRoutes.js:185-190`: Middleware kiểm tra token bị fallback mở, cho phép gọi `next()` khi không có header Authorization.
  - `backend/controllers/lmsController.js:468`: Cho phép lưu `user_id = NULL` và lấy trực tiếp `userName = req.body.userName`.
  - `js/lecture-player.js:620,626`: Nối chuỗi `c.user_name` và `c.content` trực tiếp vào `innerHTML`.
- **Tác động:** Kẻ tấn công ẩn danh có thể gửi payload JavaScript độc hại; script sẽ tự động thực thi trong trình duyệt của học viên và quản trị viên khi xem bài học.
- **Đề xuất khắc phục:** Áp dụng `verifyToken` bắt buộc trên route POST bình luận bài giảng; áp dụng `escapeHtml()` cho `c.user_name` và `c.content` tại `lecture-player.js`.
- **Trạng thái:** Open
- **Test case liên kết:** `TC-SEC-003`, `TC-LMS-015`

---

#### F-003: Lỗ hổng leo thang đặc quyền - Quản trị viên (Admin) có thể hạ bệ hoặc khoá Chủ sở hữu (Owner)
- **Nhóm:** Security
- **Mô tả:** API cập nhật thông tin người dùng cho phép quyền `admin` thực hiện, nhưng chỉ ngăn người dùng tự sửa chính mình (`req.user.id == targetUserId`) mà không bảo vệ tài khoản Owner.
- **Bằng chứng:** [`backend/controllers/adminController.js:19-21, 42`](file:///c:/Users/anhqu/Documents/Computer%20Science%20Training/PRIVATE%20PROJECT/9-5-ai-library/backend/controllers/adminController.js#L19-L21) cho phép Admin gửi `PUT /api/admin/users/1` với body `{ "role": "member", "status": "banned" }` và cập nhật trực tiếp vào MySQL.
- **Tác động:** Phá vỡ hệ thống phân quyền tối cao của Owner, quản trị viên cấp dưới có thể tiếm quyền kiểm soát hệ thống.
- **Đề xuất khắc phục:** Bổ sung điều kiện: Chỉ có `req.user.role === 'owner'` mới được phép sửa đổi vai trò/trạng thái của tài khoản mang role `owner` hoặc nâng tài khoản khác lên `owner`.
- **Trạng thái:** Open
- **Test case liên kết:** `TC-SEC-004`, `TC-ADM-008`

---

### [MỨC ĐỘ: HIGH - CAO]

#### F-004: Bỏ qua kiểm tra email xác nhận khi tự xoá tài khoản cá nhân
- **Nhóm:** Security
- **Mô tả:** Câu lệnh điều kiện kiểm tra email xác nhận sử dụng `confirm_email && ...`. Nếu client không gửi trường `confirm_email`, điều kiện kiểm tra bị bỏ qua và tài khoản bị xoá vĩnh viễn.
- **Bằng chứng:** [`backend/controllers/userController.js:82-86`](file:///c:/Users/anhqu/Documents/Computer%20Science%20Training/PRIVATE%20PROJECT/9-5-ai-library/backend/controllers/userController.js#L82-L86):
  ```javascript
  if (confirm_email && confirm_email.trim().toLowerCase() !== rows[0].username.toLowerCase()) {
      return res.status(400).json({ error: 'Email xác nhận không khớp' });
  }
  await db.query('DELETE FROM users WHERE id = ?', [userId]);
  ```
- **Tác động:** Rủi ro xoá nhầm tài khoản do một cú click vô tình từ script hoặc tiện ích mở rộng mà không có lớp bảo vệ xác nhận.
- **Đề xuất khắc phục:** Sửa điều kiện thành: `if (!confirm_email || confirm_email.trim().toLowerCase() !== rows[0].username.toLowerCase())`.
- **Trạng thái:** Open
- **Test case liên kết:** `TC-SEC-005`, `TC-SET-012`

---

#### F-005: Phiên đăng nhập (JWT Token) không bị vô hiệu hoá khi tài khoản bị Banned hoặc đổi mật khẩu
- **Nhóm:** Security
- **Mô tả:** Middleware `verifyToken` (`backend/middlewares/authMiddleware.js:15-18`) chỉ giải mã JWT tĩnh mà không kiểm tra lại trạng thái người dùng trong CSDL.
- **Bằng chứng:** Khi Admin đổi trạng thái một user thành `banned` qua API `/api/admin/users/:id`, token cũ của người dùng này vẫn vượt qua `verifyToken` và tiếp tục gọi các API nội bộ cho tới khi hết hạn (từ 1 đến 30 ngày).
- **Tác động:** Hành động khoá tài khoản khẩn cấp của quản trị viên không có tác dụng ngay lập tức đối với các phiên đang mở.
- **Đề xuất khắc phục:** Kiểm tra trường `status !== 'banned'` trực tiếp trong CSDL hoặc sử dụng cơ chế token blacklist / token version.
- **Trạng thái:** Open
- **Test case liên kết:** `TC-SEC-006`, `TC-AUTH-009`

---

#### F-006: Video bài giảng nội bộ phục vụ công khai không qua kiểm tra quyền truy cập
- **Nhóm:** Security
- **Mô tả:** Các tệp video trong thư mục `document/Lectures/` được phục vụ công khai qua `express.static`.
- **Bằng chứng:** `curl -s -o NUL -w "%{http_code}" "http://localhost:3000/document/Lectures/Ky_II/CEA201/test/Giải_mã_Hệ_thống_Số.mp4"` -> Trả về mã **`200 OK`** mà không cần bất kỳ header xác thực nào.
- **Tác động:** Người dùng chưa đăng nhập hoặc học viên chưa hoàn thành bài trước vẫn có thể tải hoặc xem trực tiếp video bằng liên kết tĩnh, làm vô hiệu hoá quy tắc bài giảng tuần tự.
- **Đề xuất khắc phục:** Định tuyến việc phát video qua endpoint streaming có xác thực: `GET /api/lms/lectures/:id/stream` và chặn thư mục `document/Lectures/` trong `express.static`.
- **Trạng thái:** Open
- **Test case liên kết:** `TC-SEC-007`, `TC-LMS-010`

---

#### F-007: Thiếu cơ chế giới hạn tần suất yêu cầu (Rate Limiting) trên toàn bộ hệ thống
- **Nhóm:** Security
- **Mô tả:** Không có middleware giới hạn tốc độ (rate limiter) cho các route nhạy cảm.
- **Bằng chứng:** `backend/server.js` và `backend/package.json` không tích hợp thư viện `express-rate-limit`.
- **Tác động:** Kẻ tấn công có thể thực hiện tấn công dò mật khẩu (brute-force) vào `/api/auth/login`, tạo tài khoản rác hàng loạt qua `/api/auth/register`, hoặc làm đầy ổ đĩa máy chủ qua `/api/lms/upload-video`.
- **Đề xuất khắc phục:** Cài đặt `express-rate-limit` và cấu hình giới hạn 5 lần đăng nhập sai / 15 phút.
- **Trạng thái:** Open
- **Test case liên kết:** `TC-SEC-008`, `TC-AUTH-010`

---

#### F-008: Cấu hình CORS mở hoàn toàn và thiếu các tiêu đề bảo mật chuẩn (Security Headers)
- **Nhóm:** Security
- **Mô tả:** Ứng dụng cấu hình `app.use(cors())` mở cho mọi nguồn (`*`) và không thiết lập các header bảo vệ.
- **Bằng chứng:** [`backend/server.js:23-27`](file:///c:/Users/anhqu/Documents/Computer%20Science%20Training/PRIVATE%20PROJECT/9-5-ai-library/backend/server.js#L23-L27) chỉ có `X-Content-Type-Options: nosniff`. Thiếu hoàn toàn `Content-Security-Policy` (CSP), `X-Frame-Options`, và `Strict-Transport-Security` (HSTS).
- **Tác động:** Nguy cơ tấn công Clickjacking (nhúng trang vào iframe giả mạo) và nguy cơ CSRF/XSS diện rộng.
- **Đề xuất khắc phục:** Tích hợp `helmet` middleware và giới hạn danh sách domain CORS được phép.
- **Trạng thái:** Open
- **Test case liên kết:** `TC-SEC-009`

---

#### F-009: `auth-guard.js` chỉ được cài đặt trên `index.html`, 27/28 trang còn lại thiếu bảo vệ điều hướng
- **Nhóm:** Logic / Consistency
- **Mô tả:** Module `auth-guard.js` chặn người dùng chưa đăng nhập chỉ được nạp tại `index.html`. 27 trang còn lại trong thư mục `pages/` không có script này.
- **Bằng chứng:** Quét toàn bộ HTML trong dự án: chỉ duy nhất `index.html:357` chứa `<script src="js/auth-guard.js"></script>`.
- **Tác động:** Nếu khách chưa đăng nhập gõ trực tiếp URL vào thanh địa chỉ trình duyệt (ví dụ: `/pages/lectures/lectures.html` hoặc `/pages/settings/settings.html`), trang vẫn nạp giao diện đầy đủ mà không hiện modal đăng nhập.
- **Đề xuất khắc phục:** Nhúng `auth-guard.js` vào tất cả các trang cần bảo vệ hoặc chuyển hướng tự động về login nếu không tìm thấy `token` trong localStorage.
- **Trạng thái:** Open
- **Test case liên kết:** `TC-AUTH-006`, `TC-ROLE-002`

---

#### F-010: 60/123 Đề thi trắc nghiệm (Quizzes) trong `practice-data.js` bị rỗng không có câu hỏi
- **Nhóm:** Data Integrity
- **Mô tả:** Trong tổng số 123 đề trắc nghiệm của 7 môn học, có tới 60 đề thi không chứa bất kỳ câu hỏi nào trong mảng `questions`.
- **Bằng chứng:** Script kiểm tra `check_practice_data.js` báo cáo: `Empty Quizzes: 60`. Điển hình các quiz từ ID 61 đến ID 120 thuộc các chương nâng cao của CSI106, PFP191, CSD203, CEA201.
- **Tác động:** Học viên chọn làm các đề thi này sẽ gặp lỗi giao diện phòng thi rỗng hoặc hiển thị thông báo kết quả 0/0 câu.
- **Đề xuất khắc phục:** Bổ sung dữ liệu câu hỏi cho các đề này hoặc ẩn các đề chưa có dữ liệu khỏi danh sách hiển thị trên UI.
- **Trạng thái:** Open
- **Test case liên kết:** `TC-PRC-005`, `TC-DATA-003`

---

#### F-011: 39 Câu hỏi trắc nghiệm trong `practice-data.js` bị lỗi dữ liệu đáp án nghiêm trọng
- **Nhóm:** Data Integrity
- **Mô tả:** Phát hiện 35 câu hỏi có mảng phương án `options: []` rỗng (thuộc Quiz 101, 104, 110, 113) và 4 câu hỏi có chỉ số đáp án đúng `correctIndex` vượt quá độ dài mảng `options` (ID 5416, 5454, 5533, 5550).
- **Bằng chứng:**
  - Câu ID 5075-5079 (Quiz 101): `options: []`, `correctIndex: 0`.
  - Câu ID 5416 (Quiz 104): `optionsCount: 1`, `correctIndex: 3`.
  - Câu ID 5454, 5533, 5550 (Quiz 104): `optionsCount: 3`, `correctIndex: 3`.
- **Tác động:** Học viên không thể làm bài (không có lựa chọn để click) hoặc câu hỏi bị chấm sai do chỉ số đáp án ngoài phạm vi.
- **Đề xuất khắc phục:** Cập nhật lại mảng `options` và chỉ số `correctIndex` (0 đến n-1) chuẩn xác cho 39 câu hỏi này trong `js/practice-data.js`.
- **Trạng thái:** Open
- **Test case liên kết:** `TC-PRC-006`, `TC-DATA-004`

---

#### F-012: Trùng lặp thứ tự chương (`chapter_order = 1`) cho tất cả các bài giảng trong CSDL
- **Nhóm:** Logic / Consistency
- **Mô tả:** Tất cả 3 bài giảng thuộc môn học ID 1 trong bảng `lectures` đều có giá trị `chapter_order = 1`.
- **Bằng chứng:** Truy vấn `SELECT id, course_id, chapter_order, title FROM lectures`:
  - ID 1: `chapter_order = 1`
  - ID 13: `chapter_order = 1`
  - ID 20: `chapter_order = 1`
- **Tác động:** Hệ thống khoá bài tuần tự (`lectures-core.js`) hoạt động dựa trên logic "bài trước hoàn thành mới mở bài sau". Khi các bài trùng thứ tự chương, UI không xác định được bài nào là tiên quyết, hiển thị cả 3 bài đồng cấp hoặc khoá sai bài học.
- **Đề xuất khắc phục:** Cập nhật `chapter_order` thành 1, 2, 3 tăng dần và thêm ràng buộc hoặc logic tự động tăng thứ tự khi tạo bài giảng mới.
- **Trạng thái:** Open
- **Test case liên kết:** `TC-LMS-004`, `TC-DATA-005`

---

### [MỨC ĐỘ: MEDIUM - TRUNG BÌNH]

#### F-013: Tiến độ hoàn thành bài giảng chỉ lưu tại localStorage trình duyệt, không đồng bộ tài khoản
- **Nhóm:** Logic / Consistency
- **Mô tả:** Khi học viên xem $\ge 90\%$ video, trạng thái hoàn thành chỉ được ghi vào `localStorage.getItem('lib95:lectures:completedIds')` tại máy client (`js/lectures-core.js:141`).
- **Bằng chứng:** Database MySQL không có bảng `user_lecture_progress`. Toàn bộ controller `lmsController.js` không có API lưu mốc thời gian xem của người dùng.
- **Tác động:** Học viên đổi máy tính hoặc mở trình duyệt ẩn danh sẽ bị mất 100% tiến độ và toàn bộ bài giảng (trừ bài 1) bị khoá lại từ đầu. Nếu 2 người dùng chung máy, người sau sẽ kế thừa tiến độ của người trước.
- **Đề xuất khắc phục:** Tạo bảng `user_lecture_progress (user_id, lecture_id, watched_sec, is_completed)` và đồng bộ qua API backend.
- **Trạng thái:** Open
- **Test case liên kết:** `TC-LMS-008`, `TC-COMPAT-002`

---

#### F-014: Luồng Quên mật khẩu và Đặt lại mật khẩu hoàn toàn là giao diện tĩnh (Mock / Stub)
- **Nhóm:** Logic / Consistency
- **Mô tả:** Các trang `pages/auth/forgot_pass.html`, `pages/auth/reset_pass.html`, và `pages/auth/send_email.html` không có logic backend xử lý.
- **Bằng chứng:** Form trong `forgot_pass.html:68` có `action="#" method="post"`; khi bấm submit chỉ tải lại trang. Backend `authController.js` hoàn toàn không có hàm gửi mail hay đặt lại mật khẩu.
- **Tác động:** Người dùng quên mật khẩu không thể tự khôi phục tài khoản.
- **Đề xuất khắc phục:** Tích hợp dịch vụ gửi email (Nodemailer / SendGrid) và bảng lưu `password_reset_tokens`.
- **Trạng thái:** Open
- **Test case liên kết:** `TC-AUTH-004`, `TC-AUTH-005`

---

#### F-015: Lỗi tính toán % tiến độ môn học trên thẻ "Your subjects" tại trang chủ (Home)
- **Nhóm:** Logic / Consistency
- **Mô tả:** Biến tính phần trăm tiến độ `progressPct` tại `home_page/home_page.js:84` luôn trả về 0 do lỗi truy cập thuộc tính `.currentIndex` trên biến kiểu số (`prog` là số nguyên thời gian hoặc index, không phải object).
- **Bằng chứng:** `HOME_SUBJECTS_AUDIT.md:9` và `home_page/home_page.js:83-86`: Thẻ môn phải dùng fallback `avgScore` (điểm trung bình trắc nghiệm) thay vì tiến độ học thật sự.
- **Tác động:** Thông tin hiển thị trên thẻ môn gây hiểu lầm giữa "điểm trung bình thi" và "tiến độ hoàn thành bài học".
- **Đề xuất khắc phục:** Chuẩn hoá cấu trúc trả về của `core.getQuizProgress()` thành object `{ currentIndex, total }` nhất quán.
- **Trạng thái:** Open
- **Test case liên kết:** `TC-HOME-003`

---

#### F-016: Trùng lặp thuộc tính `id` trên các trang xác thực (`reset_pass.html`, `signup.html`)
- **Nhóm:** UX / UI
- **Mô tả:** Thẻ HTML có `id` trùng lặp: `pages/auth/reset_pass.html` trùng `id="password"`, `togglePassword`, `eyeIcon`; `pages/auth/signup.html` trùng `id="togglePassword"`, `eyeIcon`.
- **Bằng chứng:** Quét DOM HTML tự động qua `audit_html_resources.js`: `pages/auth/reset_pass.html` có 2 phần tử `id="password"`, 2 phần tử `id="togglePassword"`.
- **Tác động:** Nút bấm ẩn/hiện mật khẩu của ô "Confirm password" bị liệt hoàn toàn; các trình quản lý mật khẩu của trình duyệt (password manager) điền sai ô dữ liệu.
- **Đề xuất khắc phục:** Đổi tên id ô xác nhận thành `confirm_password`, `toggleConfirmPassword`, `eyeIconConfirm`.
- **Trạng thái:** Open
- **Test case liên kết:** `TC-AUTH-002`, `TC-UI-003`

---

#### F-017: 101 Vị trí hardcode URL máy chủ `http://localhost:3000`
- **Nhóm:** Config / Deploy
- **Mô tả:** Các tệp JavaScript gọi trực tiếp tới `http://localhost:3000` thay vì sử dụng đường dẫn tương đối `/api/...`.
- **Bằng chứng:** Quét đĩa phát hiện 101 lần xuất hiện của chuỗi `http://localhost:3000`, tiêu biểu tại `js/auth.js:46,63`.
- **Tác động:** Khi triển khai website lên máy chủ thực tế (domain khác hoặc IP khác), các yêu cầu đăng ký/đăng nhập của người dùng sẽ thất bại do gửi nhầm về localhost máy cá nhân.
- **Đề xuất khắc phục:** Thay toàn bộ `http://localhost:3000/api/...` thành đường dẫn tương đối `/api/...`.
- **Trạng thái:** Open
- **Test case liên kết:** `TC-CONF-001`

---

#### F-018: Tệp dữ liệu `js/practice-data.js` quá nặng (2.41 MB) nạp đồng bộ ở Client
- **Nhóm:** Performance
- **Mô tả:** Toàn bộ 2,359 câu hỏi trắc nghiệm của 7 môn học được đóng gói trong một tệp `.js` duy nhất và nạp đồng bộ.
- **Bằng chứng:** Kích thước tệp `js/practice-data.js` là **2,465 KB** (~2.41 MB).
- **Tác động:** Gây nghẽn băng thông trên mạng 3G/4G di động (thời gian tải 1.5 - 3 giây) và làm đơ luồng xử lý UI (UI freeze) trong lúc trình duyệt phân tích cú pháp chuỗi JSON khổng lồ này.
- **Đề xuất khắc phục:** Chia nhỏ dữ liệu theo từng môn học (lazy loading: môn nào học mới tải môn đó) hoặc chuyển sang API phân trang từ CSDL.
- **Trạng thái:** Open
- **Test case liên kết:** `TC-PERF-001`

---

#### F-019: Truy vấn N+1 và Correlated Subqueries tại Endpoint danh sách bài viết cộng đồng
- **Nhóm:** Performance
- **Mô tả:** `GET /api/community/posts` (`communityController.js:86-90`) sử dụng các câu truy vấn con tương quan để đếm like và comment cho từng dòng kết quả.
- **Bằng chứng:** Mã SQL tại `communityController.js:89-90`:
  ```sql
  (SELECT COUNT(*) FROM community_likes WHERE post_id = p.id) AS likeCount,
  (SELECT COUNT(*) FROM community_comments WHERE post_id = p.id) AS commentCount
  ```
- **Tác động:** Khi số lượng bài viết và tương tác tăng lên hàng nghìn dòng, thời gian phản hồi của trang Community Feed sẽ tăng theo cấp số nhân.
- **Đề xuất khắc phục:** Sử dụng `LEFT JOIN ... GROUP BY` hoặc cập nhật cột đếm `likes_count`, `comments_count` trực tiếp trên bảng `community_posts`.
- **Trạng thái:** Open
- **Test case liên kết:** `TC-PERF-002`

---

### [MỨC ĐỘ: LOW - THẤP]

#### F-020: Tồn tại tệp đồ hoạ Paint.NET (`.pdn`), tệp bản sao `(1)` và tệp sao lưu `.bak` trong kho mã
- **Nhóm:** Maintainability
- **Mô tả:** Kho mã chứa các tệp thiết kế độc quyền không chạy được trên web và các tệp copy thừa.
- **Bằng chứng:** `assets/icon/Better_Icon/email2.pdn`, `assets/icon/alert (1).png`, `js/resources.js.bak`.
- **Tác động:** Làm bẩn kho mã nguồn và tăng dung lượng tải repo không cần thiết.
- **Đề xuất khắc phục:** Xoá bỏ các tệp `.pdn`, `.bak` và các tệp có hậu tố `(1)`.
- **Trạng thái:** Open
- **Test case liên kết:** `TC-DATA-006`

---

#### F-021: Sao chép lặp lại thư viện MathJax nặng 2.05 MB ở 3 thư mục khác nhau
- **Nhóm:** Maintainability
- **Mô tả:** Tệp `tex-svg.js` (2.05 MB) bị nhân bản ở `assets/vendor/mathjax/`, `document/Practice/Ky_I/MAD101/...`, và `document/Practice/Ky_I/MAE101/...`.
- **Bằng chứng:** Quét dung lượng đĩa: 3 tệp giống nhau chiếm tổng cộng hơn 6.1 MB bộ nhớ.
- **Tác động:** Lãng phí tài nguyên lưu trữ và khó khăn khi nâng cấp phiên bản thư viện.
- **Đề xuất khắc phục:** Gom về một nguồn chung duy nhất tại `assets/vendor/mathjax/` và chia sẻ đường dẫn nạp.
- **Trạng thái:** Open
- **Test case liên kết:** `TC-DATA-007`

---

#### F-022: Nút "View all subjects" trên trang chủ là liên kết rỗng (Dead Link)
- **Nhóm:** UX / UI
- **Mô tả:** Thẻ `<a href="#" class="card-link">View all subjects</a>` tại `home_page/home_page.html:286` không có liên kết điều hướng và không có event listener.
- **Bằng chứng:** `HOME_SUBJECTS_AUDIT.md:13`: Nút bấm có `href="#"`, người dùng bấm vào chỉ bị cuộn trang lên đầu.
- **Tác động:** Trải nghiệm người dùng bị đứt gãy khi muốn xem danh sách toàn bộ các môn học.
- **Đề xuất khắc phục:** Gán `href="../pages/practice/practice.html"` hoặc mở modal danh sách môn học tổng thể.
- **Trạng thái:** Open
- **Test case liên kết:** `TC-HOME-004`

---

#### F-023: Thư mục rỗng `document/Practice/Ky_II/AGIc`
- **Nhóm:** Maintainability
- **Mô tả:** Thư mục rỗng tồn tại trong cấu trúc thư mục thực hành Kỳ II.
- **Bằng chứng:** `Get-ChildItem -Path "document/Practice/Ky_II/AGIc"` trả về kết quả rỗng (0 files).
- **Tác động:** Gây nhầm lẫn trong quá trình bảo trì danh mục môn học.
- **Đề xuất khắc phục:** Xoá bỏ thư mục rỗng này.
- **Trạng thái:** Open
- **Test case liên kết:** `TC-DATA-008`

---

#### F-024: Git theo dõi các tệp sao lưu dữ liệu lớn trong thư mục thực hành
- **Nhóm:** Data Integrity / Maintainability
- **Mô tả:** Các tệp sao lưu `v2_backup_20261017_223323/questions_v2.js` (~1.9 MB) và `classified_data.json` bị commit vào git repository.
- **Bằng chứng:** Lệnh `git ls-files` liệt kê các tệp này nằm trong danh sách theo dõi của git.
- **Tác động:** Làm phình to dung lượng git repository `.git` lên hàng trăm MB.
- **Đề xuất khắc phục:** Bổ sung `document/Practice/**/v2_backup_*/` và `**/backup_original/` vào `.gitignore` và dùng `git rm --cached` để gỡ bỏ.
- **Trạng thái:** Open
- **Test case liên kết:** `TC-DATA-009`

---

## 3. CÁC HẠNG MỤC ĐÃ KIỂM CHỨNG KHẮC PHỤC (VERIFIED FIXED)

| ID | Nhóm | Mô tả hạng mục | Bằng chứng kiểm chứng mã nguồn | Trạng thái |
|:---:|:---|:---|:---|:---:|
| **VF-001** | UI / UX | Chống chớp trắng giao diện (FOUC) khi chuyển Dark/Light mode | Toàn bộ 28/28 trang HTML đều nạp `<script src="/js/theme-init.js"></script>` ở đầu `<head>` trước khi parse CSS | **Verified fixed** |
| **VF-002** | Performance | Tối ưu hoá streaming video MP4 qua ffmpeg `+faststart` | `backend/routes/lmsRoutes.js:158-181` tự động chạy ffmpeg `-movflags +faststart` chuyển moov atom lên đầu tệp video khi upload | **Verified fixed** |
| **VF-003** | Security | Ngăn chặn tấn công SSRF qua tính năng lấy thông tin YouTube | `backend/routes/lmsRoutes.js:46-51` bóc tách `youtubeId` theo biểu thức chính quy chặt chẽ và chỉ gọi tới URL cố định `https://www.youtube.com/watch?v=${youtubeId}` | **Verified fixed** |
| **VF-004** | UX / UI | Hiển thị công thức Toán học MathJax với ký tự thoát | `js/mathjax-config.js:14` cấu hình `processEscapes: true` và `assets/vendor/mathjax/tex-svg.js` render công thức mượt mà | **Verified fixed** |
