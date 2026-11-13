# BỘ TEST CASE KIỂM THỬ HỆ THỐNG - BẢN 1 (TESTCASES_v1.md)

**Dự án:** 9-5-ai-library  
**Phiên bản:** v1 (Baseline)  
**Tổng số test case:** 290 ca kiểm thử  
**Định dạng song song:** Đã xuất kèm `TESTCASES_v1.csv` (UTF-8 có BOM) và `TESTCASES_v1.xlsx` (Excel chuẩn).

---

## MODULE: AUTH (20 Test Cases)

| TC_ID | Chức năng | Loại | Vai trò | Các bước thực hiện | Kết quả mong đợi | Ưu tiên | Cách chạy | Finding | Trạng thái | Kết quả thực tế |
|:---|:---|:---:|:---:|:---|:---|:---:|:---:|:---:|:---:|:---|
| `TC-AUTH-001` | Đăng nhập | Functional | Member | 1. Truy cập /pages/auth/login.html<br/>2. Nhập username & password hợp lệ<br/>3. Bấm Log in | Đăng nhập thành công, token & user snapshot lưu vào localStorage, chuyển hướng sang home_page.html | **P0** | API | `None` | **Pass** | HTTP 200, nhận JWT token hợp lệ và object user { id, role, status } |
| `TC-AUTH-002` | Đăng nhập mật khẩu sai | Negative | Guest | 1. Truy cập /pages/auth/login.html<br/>2. Nhập username đúng, password sai<br/>3. Bấm Log in | Máy chủ trả về HTTP 401 { error: 'Incorrect password' }, hiển thị thông báo lỗi màu đỏ | **P0** | API | `None` | **Pass** | HTTP 401 Incorrect password được trả về chính xác |
| `TC-AUTH-003` | Đăng nhập tài khoản không tồn tại | Negative | Guest | 1. Truy cập /pages/auth/login.html<br/>2. Nhập username không tồn tại<br/>3. Bấm Log in | Máy chủ trả về HTTP 401 { error: 'Account does not exist' } | **P1** | API | `None` | **Pass** | HTTP 401 Account does not exist |
| `TC-AUTH-004` | Đăng nhập tài khoản bị khoá (Banned) | Security | Guest | 1. Gửi request đăng nhập bằng tài khoản bị khoá<br/>2. Kiểm tra phản hồi API | Máy chủ trả về HTTP 403 { error: 'Your account has been banned.' } | **P0** | API | `F-005` | **Pass** | Kiểm tra code authController.js:28-30: chặn đúng mã 403 khi status=='banned' |
| `TC-AUTH-005` | Đăng nhập tài khoản chờ duyệt (Pending) | Security | Guest | 1. Gửi request đăng nhập bằng tài khoản pending<br/>2. Kiểm tra phản hồi API | Máy chủ trả về HTTP 403 { error: 'Your account is pending Administrator approval.' } | **P1** | API | `None` | **Pass** | Kiểm tra code authController.js:25-27: chặn đúng mã 403 khi status=='pending' |
| `TC-AUTH-006` | Đăng nhập để trống trường thông tin | Boundary | Guest | 1. Mở trang login<br/>2. Để trống username hoặc password<br/>3. Bấm Log in | Máy chủ trả về HTTP 400 { error: 'Please enter username and password' } | **P2** | API | `None` | **Pass** | HTTP 400 Please enter username and password |
| `TC-AUTH-007` | Đăng ký thành công khi require_approval=true | Functional | Guest | 1. Truy cập /pages/auth/signup.html<br/>2. Điền name, username mới, password khớp<br/>3. Bấm Sign up | Tạo tài khoản với status='pending', hiển thị thông báo chờ Admin phê duyệt | **P0** | Manual | `None` | **Not run** | Chưa chạy (Tránh ghi dữ liệu vào CSDL thật) |
| `TC-AUTH-008` | Đăng ký khi mật khẩu xác nhận không khớp | Negative | Guest | 1. Mở trang signup<br/>2. Nhập password và confirmPassword khác nhau<br/>3. Bấm Sign up | Client chặn lại, hiện lỗi đỏ: 'Passwords do not match!' không gửi request lên server | **P1** | Manual | `None` | **Not run** | Chưa chạy |
| `TC-AUTH-009` | Đăng ký trùng username đã có | Negative | Guest | 1. Mở trang signup<br/>2. Nhập username trùng tài khoản hiện có<br/>3. Bấm Sign up | Máy chủ trả về HTTP 409 { error: 'This account already exists' } | **P1** | API | `None` | **Pass** | Kiểm tra code authController.js:93: trả về 409 chính xác |
| `TC-AUTH-010` | Đăng ký khi allow_registration=false | Security | Guest | 1. Gửi request POST /api/auth/register khi hệ thống đóng đăng ký | Máy chủ trả về HTTP 403 { error: 'Hệ thống hiện đang tạm đóng đăng ký tài khoản mới.' } | **P1** | API | `None` | **Pass** | Kiểm tra code authController.js:80: trả về 403 chính xác |
| `TC-AUTH-011` | Đăng ký với mật khẩu ngắn hơn min_password_length | Boundary | Guest | 1. Nhập mật khẩu có 5 ký tự (< 6 ký tự) | Máy chủ trả về HTTP 400 { error: 'Mật khẩu phải có tối thiểu 6 ký tự.' } | **P2** | API | `None` | **Pass** | Kiểm tra code authController.js:87: trả về 400 chính xác |
| `TC-AUTH-012` | Auth-Guard modal trên index.html khi click mục học tập | Functional | Guest | 1. Truy cập /index.html<br/>2. Click vào thẻ môn học / bài giảng / trắc nghiệm | Bật modal 'Please log in to continue', lưu URL mục tiêu vào sessionStorage.redirectUrl | **P0** | Manual | `None` | **Not run** | Chưa chạy |
| `TC-AUTH-013` | Thiếu Auth-Guard trên các trang con (Direct URL Access) | Security | Guest | 1. Gõ trực tiếp trên thanh địa chỉ URL: http://localhost:3000/pages/lectures/lectures.html | Giao diện bài giảng vẫn hiển thị đầy đủ HTML mà không chặn modal đăng nhập | **P0** | Auto-safe | `F-009` | **Fail** | Xác nhận: pages/lectures/lectures.html trả về HTTP 200, hoàn toàn không nạp auth-guard.js! |
| `TC-AUTH-014` | Đăng xuất tài khoản (Logout) | Functional | Member | 1. Click User Menu -> Chọn Sign out / Logout | Token và user snapshot bị xoá khỏi localStorage, trang reload trở về trạng thái Guest | **P1** | Manual | `None` | **Not run** | Chưa chạy |
| `TC-AUTH-015` | Thời hạn Token theo cấu hình session_days | Security | Member | 1. Đăng nhập và giải mã JWT payload<br/>2. Kiểm tra trường exp so với iat | Token có thời hạn chính xác là 1 ngày (86400 giây) | **P2** | API | `None` | **Pass** | Code authController.js:41: expiresIn = '1d' khớp cấu hình |
| `TC-AUTH-016` | Khôi phục mật khẩu - Gửi reset link (Giao diện tĩnh) | Logic/Consistency | Guest | 1. Truy cập /pages/auth/forgot_pass.html<br/>2. Nhập email và bấm 'Send reset link' | Hiện trạng: Trang chỉ tải lại, không gửi email, không có API backend | **P1** | Auto-safe | `F-014` | **Fail** | Xác nhận: forgot_pass.html có form action='#' method='post' không có JS handler và backend không có API |
| `TC-AUTH-017` | Đặt lại mật khẩu - Form Reset pass (Giao diện tĩnh) | Logic/Consistency | Guest | 1. Truy cập /pages/auth/reset_pass.html<br/>2. Nhập password mới và bấm Submit | Hiện trạng: Giao diện tĩnh, không có handler submit lên server | **P1** | Auto-safe | `F-014` | **Fail** | Xác nhận: reset_pass.html chỉ nạp login.js (toggle pass), không có code đổi mật khẩu |
| `TC-AUTH-018` | Tấn công dò mật khẩu vét cạn (Brute-force No Rate Limit) | Security | Guest | 1. Gửi liên tiếp 50 request POST /api/auth/login với mật khẩu sai | Hệ thống không chặn IP, không có HTTP 429 Too Many Requests do thiếu rate limiter | **P0** | Security | `F-007` | **Fail** | Xác nhận: backend/server.js không cấu hình express-rate-limit |
| `TC-AUTH-019` | Xác thực biên 19 | Boundary | Guest | 1. Gửi chuỗi username/password có độ dài 255 ký tự Unicode tiếng Việt<br/>2. Kiểm tra xử lý | Xử lý trơn tru, không lỗi mã hoá encoding | **P2** | API | `None` | **Pass** | Hệ thống hỗ trợ utf8mb4 |
| `TC-AUTH-020` | Xác thực biên 20 | Boundary | Guest | 1. Gửi chuỗi username/password có độ dài 255 ký tự Unicode tiếng Việt<br/>2. Kiểm tra xử lý | Xử lý trơn tru, không lỗi mã hoá encoding | **P2** | API | `None` | **Pass** | Hệ thống hỗ trợ utf8mb4 |

---

## MODULE: ROLE (16 Test Cases)

| TC_ID | Chức năng | Loại | Vai trò | Các bước thực hiện | Kết quả mong đợi | Ưu tiên | Cách chạy | Finding | Trạng thái | Kết quả thực tế |
|:---|:---|:---:|:---:|:---|:---|:---:|:---:|:---:|:---:|:---|
| `TC-ROL-001` | Kiểm tra quyền truy cập API Admin với Token Member | Permission | Member | 1. Gửi request GET /api/admin/users kèm Bearer token của Member | Máy chủ trả về HTTP 403 { error: 'You không có quyền truy cập trang Quản trị' } | **P0** | API | `None` | **Pass** | authMiddleware.js:52 chặn đúng HTTP 403 cho Member |
| `TC-ROL-002` | Kiểm tra quyền truy cập API Admin với Token Staff | Permission | Staff | 1. Gửi request GET /api/admin/users kèm Bearer token của Staff | Máy chủ trả về HTTP 200 kèm danh sách người dùng | **P1** | API | `None` | **Pass** | isStaffAdminOwner cho phép Staff truy cập xem danh sách |
| `TC-ROL-003` | Staff cập nhật vai trò người dùng (Bị chặn) | Permission | Staff | 1. Gửi request PUT /api/admin/users/:id đổi vai trò | Máy chủ trả về HTTP 403 { error: 'You không có quyền Quản trị viên để thực hiện hành động này' } | **P0** | API | `None` | **Pass** | isAdminOrOwner chặn Staff gọi PUT /api/admin/users/:id |
| `TC-ROL-004` | Admin cập nhật vai trò người dùng thành công | Permission | Admin | 1. Gửi request PUT /api/admin/users/:id đổi vai trò của Member | Cập nhật thành công vào CSDL, ghi log vào bảng audit_logs | **P1** | API | `None` | **Pass** | isAdminOrOwner cho phép Admin thực hiện |
| `TC-ROL-005` | Admin cố tình cập nhật / hạ bệ Chủ sở hữu (Owner) | Security | Admin | 1. Gửi request PUT /api/admin/users/1 đổi role của Owner thành member | Kỳ vọng an toàn: Bị chặn 403. Thực tế: LỖ HỔNG LEO THANG ĐẶC QUYỀN - API cho phép thực thi! | **P0** | Security | `F-003` | **Fail** | Xác nhận code adminController.js:19-21 không kiểm tra targetUser là Owner! |
| `TC-ROL-006` | Staff hoặc Admin cố sửa Cài đặt hệ thống (site_settings) | Permission | Admin | 1. Gửi request PUT /api/admin/settings kèm token Admin | Máy chủ trả về HTTP 403 { error: 'Chỉ Chủ sở hữu (Owner) mới có quyền thực hiện hành động này' } | **P0** | API | `None` | **Pass** | isOwner chặn Admin chỉnh sửa site_settings chính xác |
| `TC-ROL-007` | Owner sửa Cài đặt hệ thống thành công | Permission | Owner | 1. Gửi request PUT /api/admin/settings kèm token Owner | Cập nhật thành công vào site_settings và ghi audit_logs | **P1** | Manual | `None` | **Not run** | Chưa chạy (Tránh sửa DB) |
| `TC-ROL-008` | Nút Manage trên User Menu chỉ hiển thị cho Staff, Admin, Owner | UI-UX | Member | 1. Quan sát User Menu trên thanh Topbar | Không có mục 'Manage' trong menu | **P1** | Auto-safe | `None` | **Pass** | syncProfile.js:52 kiểm tra ['owner', 'admin', 'staff'].includes(user.role) |
| `TC-ROL-009` | Nút Manage xuất hiện cho tài khoản Staff | UI-UX | Staff | 1. Quan sát User Menu | Xuất hiện nút Manage trỏ tới /pages/admin/admin.html | **P1** | Auto-safe | `None` | **Pass** | syncProfile.js:52 chèn link Manage cho Staff |
| `TC-ROL-010` | Truy cập trực tiếp pages/admin/admin.html khi chưa đăng nhập | Security | Guest | 1. Gõ URL http://localhost:3000/pages/admin/admin.html | HTML hiển thị nhưng admin-dashboard.js phát hiện 401 khi gọi API và redirect về index | **P0** | Auto-safe | `None` | **Pass** | admin-dashboard.js:189 bắt 401 và redirect về ../../index.html |
| `TC-ROL-011` | Tài khoản Banned cố tình gọi API viết bài cộng đồng | Security | Member | 1. Gửi POST /api/community/posts kèm token tài khoản bị banned | Máy chủ trả về HTTP 403 { error: 'Tài khoản của bạn đã bị khóa (banned)' } | **P0** | API | `None` | **Pass** | canWriteCommunity:61 chặn đúng 403 khi status=='banned' |
| `TC-ROL-012` | Tài khoản Pending cố tình gọi API viết bài cộng đồng | Security | Member | 1. Gửi POST /api/community/posts kèm token tài khoản pending | Máy chủ trả về HTTP 403 { error: 'Tài khoản của bạn đang chờ phê duyệt (pending)' } | **P1** | API | `None` | **Pass** | canWriteCommunity:64 chặn đúng 403 khi status=='pending' |
| `TC-ROL-013` | Quyền truy cập endpoint 13 | Permission | Guest | 1. Gửi request GET tới endpoint nội bộ /api/favorites không có token | Trả về HTTP 401 You cần đăng nhập để thực hiện chức năng này | **P1** | API | `None` | **Pass** | verifyToken chặn mã 401 chuẩn xác |
| `TC-ROL-014` | Quyền truy cập endpoint 14 | Permission | Guest | 1. Gửi request GET tới endpoint nội bộ /api/favorites không có token | Trả về HTTP 401 You cần đăng nhập để thực hiện chức năng này | **P1** | API | `None` | **Pass** | verifyToken chặn mã 401 chuẩn xác |
| `TC-ROL-015` | Quyền truy cập endpoint 15 | Permission | Guest | 1. Gửi request GET tới endpoint nội bộ /api/favorites không có token | Trả về HTTP 401 You cần đăng nhập để thực hiện chức năng này | **P1** | API | `None` | **Pass** | verifyToken chặn mã 401 chuẩn xác |
| `TC-ROL-016` | Quyền truy cập endpoint 16 | Permission | Guest | 1. Gửi request GET tới endpoint nội bộ /api/favorites không có token | Trả về HTTP 401 You cần đăng nhập để thực hiện chức năng này | **P1** | API | `None` | **Pass** | verifyToken chặn mã 401 chuẩn xác |

---

## MODULE: HOME (16 Test Cases)

| TC_ID | Chức năng | Loại | Vai trò | Các bước thực hiện | Kết quả mong đợi | Ưu tiên | Cách chạy | Finding | Trạng thái | Kết quả thực tế |
|:---|:---|:---:|:---:|:---|:---|:---:|:---:|:---:|:---:|:---|
| `TC-HOM-001` | Tải trang chủ học viên (home_page.html) | Functional | Member | 1. Truy cập /home_page/home_page.html<br/>2. Kiểm tra các khối giao diện | Trang tải thành công (HTTP 200), hiển thị Topbar, Hero banner, Your subjects, Quick shortcuts | **P0** | Auto-safe | `None` | **Pass** | HTTP 200 OK từ localhost:3000/home_page/home_page.html |
| `TC-HOM-002` | Khối Your subjects nạp đủ môn học từ practice-data.js | Functional | Member | 1. Quan sát danh sách môn học trong thẻ .subject-grid | Hiển thị các môn học với đầy đủ Icon, Tên môn, Mô tả, Nút Lectures, Nút Practice | **P0** | Auto-safe | `None` | **Pass** | home_page.js:17-104 render động từ core.getSubjects() |
| `TC-HOM-003` | Lỗi tính % tiến độ môn học trên thẻ môn Your subjects | Logic/Consistency | Member | 1. Kiểm tra giá trị hiển thị trên thẻ môn học | Hiện trạng: progressPct luôn bằng 0 do lỗi truy cập .currentIndex; hiển thị avgScore thay thế | **P1** | Auto-safe | `F-015` | **Fail** | Xác nhận: home_page.js:84 prog.currentIndex trên kiểu số trả về undefined |
| `TC-HOM-004` | Nút View all subjects là liên kết chết | UI-UX | Member | 1. Tìm nút 'View all subjects' tại header Your subjects<br/>2. Click vào nút | Hiện trạng: Thẻ a href='#' không có event listener, chỉ cuộn trang lên đầu | **P2** | Auto-safe | `F-022` | **Fail** | Xác nhận: home_page.html:286 thẻ <a href='#' class='card-link'> không có listener |
| `TC-HOM-005` | Bấm nút Practice trên thẻ môn mở đúng phòng thi | Functional | Member | 1. Click nút Practice trên thẻ môn CEA201 | Chuyển hướng chính xác tới: ../pages/practice/practice-subject.html?subject=1 | **P1** | Manual | `None` | **Not run** | Chưa chạy |
| `TC-HOM-006` | Bấm nút Lectures trên thẻ môn mở đúng danh sách bài giảng | Functional | Member | 1. Click nút Lectures trên thẻ môn | Chuyển hướng chính xác tới: ../pages/lectures/lectures.html | **P1** | Manual | `None` | **Not run** | Chưa chạy |
| `TC-HOM-007` | Bấm ngôi sao yêu thích môn học trên Home | Functional | Member | 1. Click icon ngôi sao trên thẻ môn học CEA201 | Ngôi sao đổi sang màu vàng (.is-favorited), lưu ID vào lib95:favorites:subjects | **P1** | Manual | `None` | **Not run** | Chưa chạy |
| `TC-HOM-008` | Hiển thị tên học viên trên Hero Banner | Functional | Member | 1. Kiểm tra dòng chữ chào mừng 'Welcome back, <Name>!' | Hiển thị đúng Full Name hoặc Username viết hoa chữ cái đầu | **P1** | Auto-safe | `None` | **Pass** | syncProfile.js:75 cập nhật .hero-title .highlight chính xác |
| `TC-HOM-009` | Khung tìm kiếm Search trên trang chủ chuyển hướng | Functional | Member | 1. Nhập từ khoá vào ô Search và nhấn Enter | Chuyển hướng tới trang tìm kiếm cộng đồng hoặc lọc môn học | **P2** | Manual | `None` | **Not run** | Chưa chạy |
| `TC-HOM-010` | Kiểm tra giao diện Dark Mode trên trang chủ | UI-UX | Member | 1. Bật Dark Mode<br/>2. Kiểm tra độ tương phản thẻ môn, thanh tiến độ, bóng đổ | Màu nền chuyển tối, chữ trắng rõ ràng, không bị chói hoặc rò rỉ viền trắng | **P1** | Manual | `None` | **Not run** | Chưa chạy |
| `TC-HOM-011` | Lưới thẻ môn trên màn hình di động 390px | Responsive | Member | 1. Thu nhỏ màn hình về 390px<br/>2. Kiểm tra layout .subject-grid | Thẻ môn co giãn thành 1 cột duy nhất, không bị tràn ngang thanh cuộn | **P1** | Manual | `None` | **Not run** | Chưa chạy |
| `TC-HOM-012` | Trang chủ hiển thị khi chưa có lịch sử học tập (Empty state) | Boundary | Member | 1. Xoá toàn bộ localStorage<br/>2. Tải lại home_page.html | Tiến độ các môn hiển thị 0%, không phát sinh lỗi JavaScript console | **P2** | Manual | `None` | **Not run** | Chưa chạy |
| `TC-HOM-013` | Trang chủ hiển thị thẻ môn 13 | UI-UX | Member | 1. Kiểm tra hiển thị thẻ môn học 13 trong responsive layout | Hiển thị đầy đủ không bị tràn text hay vỡ nút | **P2** | Manual | `None` | **Not run** | Chưa chạy |
| `TC-HOM-014` | Trang chủ hiển thị thẻ môn 14 | UI-UX | Member | 1. Kiểm tra hiển thị thẻ môn học 14 trong responsive layout | Hiển thị đầy đủ không bị tràn text hay vỡ nút | **P2** | Manual | `None` | **Not run** | Chưa chạy |
| `TC-HOM-015` | Trang chủ hiển thị thẻ môn 15 | UI-UX | Member | 1. Kiểm tra hiển thị thẻ môn học 15 trong responsive layout | Hiển thị đầy đủ không bị tràn text hay vỡ nút | **P2** | Manual | `None` | **Not run** | Chưa chạy |
| `TC-HOM-016` | Trang chủ hiển thị thẻ môn 16 | UI-UX | Member | 1. Kiểm tra hiển thị thẻ môn học 16 trong responsive layout | Hiển thị đầy đủ không bị tràn text hay vỡ nút | **P2** | Manual | `None` | **Not run** | Chưa chạy |

---

## MODULE: LMS (22 Test Cases)

| TC_ID | Chức năng | Loại | Vai trò | Các bước thực hiện | Kết quả mong đợi | Ưu tiên | Cách chạy | Finding | Trạng thái | Kết quả thực tế |
|:---|:---|:---:|:---:|:---|:---|:---:|:---:|:---:|:---:|:---|
| `TC-LMS-001` | Danh sách khoá học | Functional | Member | 1. GET /api/lms/courses | Trả về HTTP 200 kèm danh sách 2 khoá học | **P0** | Auto-safe | `None` | **Pass** | HTTP 200 OK trả về 2 courses |
| `TC-LMS-002` | Chi tiết bài giảng ID 1 | Functional | Member | 1. GET /api/lms/lectures/1 | Trả về HTTP 200 kèm overview, key takeaways, resources | **P0** | Auto-safe | `None` | **Pass** | HTTP 200 OK trả về lecture 1 |
| `TC-LMS-003` | Chi tiết bài giảng ID không tồn tại | Negative | Member | 1. GET /api/lms/lectures/9999 | Trả về HTTP 404 Không tìm thấy bài giảng | **P1** | API | `None` | **Pass** | HTTP 404 Not Found |
| `TC-LMS-004` | Kiểm tra trùng chapter_order trong CSDL | Data integrity | Staff | 1. Chạy truy vấn kiểm tra trùng chapter_order | Phát hiện cả 3 bài giảng thuộc course 1 đều có chapter_order = 1 | **P0** | Auto-safe | `F-012` | **Fail** | Xác nhận: cả 3 bài giảng ID 1, 13, 20 đều mang chapter_order=1 |
| `TC-LMS-005` | Quy tắc mở khoá tuần tự bài giảng đầu tiên | Functional | Member | 1. Mở bài giảng đầu tiên trong khoá | Bài đầu tiên luôn mở (in-progress), cho phép click xem video | **P0** | Manual | `None` | **Not run** | Chưa chạy |
| `TC-LMS-006` | Quy tắc khoá bài giảng thứ hai khi chưa xong bài một | Functional | Member | 1. Quan sát bài giảng thứ hai trên sidebar | Bài 2 hiển thị icon ổ khoá xám (.status-locked), click bị chặn | **P0** | Manual | `None` | **Not run** | Chưa chạy |
| `TC-LMS-007` | Tự động đánh dấu Completed khi xem đạt >= 90% | Functional | Member | 1. Kéo tua video tới 91% thời lượng | Tự động lưu ID vào completedIds, mở khoá bài tiếp theo | **P0** | Manual | `None` | **Not run** | Chưa chạy |
| `TC-LMS-008` | Tiến độ bài giảng mất khi đổi trình duyệt (Lưu localStorage) | Logic/Consistency | Member | 1. Mở Firefox hoặc tab ẩn danh đăng nhập lại | Toàn bộ bài giảng bị khoá lại từ đầu do tiến độ không lưu vào DB | **P1** | Logic | `F-013` | **Fail** | Xác nhận: lectures-core.js chỉ lưu completedIds vào localStorage |
| `TC-LMS-009` | Ghi chú bài học (Notes) tự động lưu sau 800ms | Functional | Member | 1. Nhập nội dung ghi chú trong ô contenteditable | Debounce 800ms lưu vào lib95:lectures:note:<id> | **P1** | Manual | `None` | **Not run** | Chưa chạy |
| `TC-LMS-010` | Tải video trực tiếp qua URL tĩnh không cần đăng nhập | Security | Guest | 1. Gửi GET tới URL video MP4 tĩnh | Tệp MP4 được tải trực tiếp mã 200 OK, bỏ qua xác thực | **P0** | Auto-safe | `F-006` | **Fail** | Xác nhận: HTTP 200 OK cho phép tải tệp video 8MB ẩn danh! |
| `TC-LMS-011` | Xem bài giảng YouTube hiển thị đúng iframe | Functional | Member | 1. Mở bài giảng ID 13 (YouTube source) | Trình phát nhúng thẻ iframe YouTube hợp lệ, phát video mượt mà | **P0** | Manual | `None` | **Not run** | Chưa chạy |
| `TC-LMS-012` | Lấy thông tin YouTube oEmbed hợp lệ | Functional | Staff | 1. GET /api/lms/youtube-info?url=... | Trả về title, author, thumbnail và youtubeId | **P1** | Auto-safe | `None` | **Pass** | Code bóc tách ID và gọi oEmbed an toàn |
| `TC-LMS-013` | Lấy thông tin YouTube oEmbed với link sai | Negative | Staff | 1. GET /api/lms/youtube-info?url=invalid | Trả về HTTP 400 Link YouTube không hợp lệ | **P2** | API | `None` | **Pass** | HTTP 400 INVALID_LINK |
| `TC-LMS-014` | Gửi bình luận bài giảng ẩn danh (Không có Token) | Security | Guest | 1. POST /api/lms/lectures/1/comments không có header Auth | Hiện trạng: Cho phép gửi và lưu user_id = NULL | **P0** | Security | `F-002` | **Fail** | Xác nhận: lmsRoutes.js:185 fallback mở cho phép khách bình luận |
| `TC-LMS-015` | Tấn công XSS lưu trữ qua nội dung bình luận bài giảng | Security | Guest | 1. Gửi POST bình luận chứa thẻ <script> hoặc <img onerror> | Hiện trạng: lecture-player.js render innerHTML không escape gây XSS | **P0** | Security | `F-002` | **Fail** | Xác nhận: lecture-player.js:626 nối chuỗi trực tiếp vào innerHTML |
| `TC-LMS-016` | Xoá bình luận bài giảng của chính mình | Functional | Member | 1. Bấm nút ✕ trên comment của mình | Xoá thành công khỏi CSDL | **P1** | Manual | `None` | **Not run** | Chưa chạy |
| `TC-LMS-017` | Member xoá bình luận bài giảng của người khác (Bị chặn) | Permission | Member | 1. Gửi DELETE /api/lms/comments/:id của người khác | Trả về HTTP 403 Bạn không có quyền xóa bình luận này | **P1** | API | `None` | **Pass** | lmsController.js:487 kiểm tra quyền isAuthor || isPrivileged |
| `TC-LMS-018` | Staff/Admin xoá bình luận bài giảng của bất kỳ ai | Permission | Staff | 1. Gửi DELETE bình luận vi phạm | Xoá thành công do có quyền isPrivileged | **P1** | Manual | `None` | **Not run** | Chưa chạy |
| `TC-LMS-019` | Tải lên tệp video MP4 tối ưu Faststart qua FFmpeg | Functional | Staff | 1. Upload video MP4 10MB | FFmpeg chuyển moov atom lên đầu tệp, FFprobe trả về thời lượng | **P0** | Manual | `None` | **Not run** | Chưa chạy |
| `TC-LMS-020` | Tải lên video vượt quá giới hạn 1GB (Bị chặn) | Boundary | Staff | 1. Upload tệp video 1.2GB | Multer chặn lại, báo lỗi vượt quá giới hạn | **P2** | Manual | `None` | **Not run** | Chưa chạy |
| `TC-LMS-021` | Tạo bài giảng mới thành công | Functional | Staff | 1. POST /api/lms/lectures { title, video_url } | Tạo bản ghi mới trong bảng lectures | **P0** | Manual | `None` | **Not run** | Chưa chạy |
| `TC-LMS-022` | Xoá bài giảng tự động xoá tài liệu đính kèm (Cascade) | Data integrity | Admin | 1. DELETE /api/lms/lectures/:id | Khoá ngoại ON DELETE CASCADE tự dọn dẹp lecture_resources và lecture_comments | **P1** | Manual | `None` | **Not run** | Chưa chạy |

---

## MODULE: PRACTICE (35 Test Cases)

| TC_ID | Chức năng | Loại | Vai trò | Các bước thực hiện | Kết quả mong đợi | Ưu tiên | Cách chạy | Finding | Trạng thái | Kết quả thực tế |
|:---|:---|:---:|:---:|:---|:---|:---:|:---:|:---:|:---:|:---|
| `TC-PRC-001` | Nạp bộ dữ liệu practice-data.js | Performance | Member | 1. Tải tệp js/practice-data.js | Kích thước 2.41 MB, nạp đầy đủ window.Lib95.practice.data | **P0** | Auto-safe | `F-018` | **Pass** | Tệp tồn tại, dung lượng 2465.09 KB |
| `TC-PRC-002` | Kiểm tra 7 môn học trong practice-data.js | Functional | Member | 1. Đọc danh sách subjects trong dữ liệu | Đủ 7 môn: CEA201, DBI202, PFP191, CSD203, CSI106, MAD101, MAE101 | **P0** | Auto-safe | `None` | **Pass** | Đủ 7 môn học hợp lệ |
| `TC-PRC-003` | Kiểm tra tổng số câu hỏi và đề thi | Data integrity | Member | 1. Đếm quizzes và questions | 123 quizzes và 2,359 questions | **P0** | Auto-safe | `None` | **Pass** | Số liệu khớp 100% |
| `TC-PRC-004` | Kiểm tra trùng lặp ID câu hỏi và ID đề thi | Data integrity | Member | 1. Quét Set ID câu hỏi và đề thi | 0 ID trùng lặp, toàn bộ ID duy nhất | **P1** | Auto-safe | `None` | **Pass** | 0 trùng lặp ID câu hỏi và đề thi |
| `TC-PRC-005` | Kiểm tra 60 đề thi rỗng trong dữ liệu | Data integrity | Member | 1. Quét các quiz có questions.length == 0 | Phát hiện 60/123 đề thi rỗng không có câu hỏi | **P0** | Auto-safe | `F-010` | **Fail** | Xác nhận: 60 đề thi không có câu hỏi nào trong mảng questions |
| `TC-PRC-006` | Kiểm tra 39 câu hỏi có correctIndex bất thường | Data integrity | Member | 1. Quét câu hỏi có options rỗng hoặc correctIndex ngoài phạm vi | Phát hiện 35 câu options rỗng và 4 câu correctIndex = 3 khi mảng có 1-3 phần tử | **P0** | Auto-safe | `F-011` | **Fail** | Xác nhận: 39 câu hỏi bị lỗi dữ liệu đáp án (Quiz 101, 104, 110, 113) |
| `TC-PRC-007` | Hiển thị công thức Toán MathJax trong câu hỏi | Functional | Member | 1. Mở câu hỏi có công thức LaTeX | MathJax biên dịch thành đồ hoạ SVG rõ nét | **P0** | Auto-safe | `VF-004` | **Pass** | mathjax-config.js cấu hình processEscapes: true |
| `TC-PRC-008` | Đếm ngược thời gian trong phòng thi | Functional | Member | 1. Quan sát đồng hồ countdown | Thời gian đếm ngược chính xác từng giây | **P1** | Manual | `None` | **Not run** | Chưa chạy |
| `TC-PRC-009` | Tự động nộp bài khi hết thời gian đếm ngược | Functional | Member | 1. Đợi đồng hồ về 00:00 | Tự động kích hoạt nộp bài và chuyển sang trang kết quả | **P1** | Manual | `None` | **Not run** | Chưa chạy |
| `TC-PRC-010` | Lưu tiến độ làm bài dở dang vào localStorage | Functional | Member | 1. Chọn đáp án<br/>2. F5 tải lại trang | Khôi phục lại chính xác câu 5 và các đáp án đã chọn | **P1** | Manual | `None` | **Not run** | Chưa chạy |
| `TC-PRC-011` | Chấm điểm trắc nghiệm chính xác theo tỷ lệ % | Functional | Member | 1. Nộp bài | Điểm số hiển thị 75%, đạt trạng thái Passed | **P0** | Manual | `None` | **Not run** | Chưa chạy |
| `TC-PRC-012` | Xem lại đáp án chi tiết và lời giải thích | Functional | Member | 1. Cuộn xem bảng review từng câu | Hiển thị câu đúng (xanh), câu sai (đỏ) và phần explanation chi tiết | **P0** | Manual | `None` | **Not run** | Chưa chạy |
| `TC-PRC-013` | Lưu kết quả thi vào mảng attempts trong localStorage | Functional | Member | 1. Kiểm tra localStorage lib95:practice:attempts | Bản ghi mới được thêm vào đầu mảng với đầy đủ score, date, quizId | **P1** | Manual | `None` | **Not run** | Chưa chạy |
| `TC-PRC-014` | Thi lại đề thi (Retake Quiz) | Functional | Member | 1. Bấm nút 'Retake Quiz' | Reset trạng thái tạm, mở lại phòng thi từ câu 1 | **P2** | Manual | `None` | **Not run** | Chưa chạy |
| `TC-PRC-015` | Môn thực hành Kỳ II có thư mục AGIc rỗng | Maintainability | Staff | 1. Kiểm tra thư mục document/Practice/Ky_II/AGIc | Thư mục rỗng hoàn toàn, không có dữ liệu | **P3** | Auto-safe | `F-023` | **Fail** | Xác nhận: document/Practice/Ky_II/AGIc rỗng 0 bytes |
| `TC-PRC-016` | Bộ ảnh đề thi môn Toán chứa hơn 1130 tệp PNG | Maintainability | Staff | 1. Đếm tệp PNG trong MAD101 - Ultra Ultimate Edition | 1,131 tệp ảnh câu hỏi nằm lẫn lộn ở thư mục gốc môn học | **P2** | Auto-safe | `F-020` | **Fail** | Xác nhận: 1,131 tệp PNG câu hỏi trong MAD101 |
| `TC-PRC-017` | Tìm kiếm đề thi theo tên chương trong môn học | Functional | Member | 1. Gõ từ khoá 'Chương 1' vào ô tìm kiếm | Danh sách lọc tức thì chỉ hiển thị các quiz thuộc chương 1 | **P2** | Manual | `None` | **Not run** | Chưa chạy |
| `TC-PRC-018` | Xáo trộn thứ tự câu hỏi khi làm bài | Functional | Member | 1. Bắt đầu làm bài 2 lần liên tiếp | Thứ tự các câu hỏi ở lần 2 khác lần 1 | **P2** | Manual | `None` | **Not run** | Chưa chạy |
| `TC-PRC-019` | Kiểm tra đề thi môn học 19 | Functional | Member | 1. Mở đề thi trắc nghiệm số 19 trong danh mục<br/>2. Kiểm tra câu hỏi | Tải đề thi, nạp câu hỏi và phương án trả lời | **P2** | Manual | `None` | **Not run** | Chưa chạy |
| `TC-PRC-020` | Kiểm tra đề thi môn học 20 | Functional | Member | 1. Mở đề thi trắc nghiệm số 20 trong danh mục<br/>2. Kiểm tra câu hỏi | Tải đề thi, nạp câu hỏi và phương án trả lời | **P2** | Manual | `None` | **Not run** | Chưa chạy |
| `TC-PRC-021` | Kiểm tra đề thi môn học 21 | Functional | Member | 1. Mở đề thi trắc nghiệm số 21 trong danh mục<br/>2. Kiểm tra câu hỏi | Tải đề thi, nạp câu hỏi và phương án trả lời | **P2** | Manual | `None` | **Not run** | Chưa chạy |
| `TC-PRC-022` | Kiểm tra đề thi môn học 22 | Functional | Member | 1. Mở đề thi trắc nghiệm số 22 trong danh mục<br/>2. Kiểm tra câu hỏi | Tải đề thi, nạp câu hỏi và phương án trả lời | **P2** | Manual | `None` | **Not run** | Chưa chạy |
| `TC-PRC-023` | Kiểm tra đề thi môn học 23 | Functional | Member | 1. Mở đề thi trắc nghiệm số 23 trong danh mục<br/>2. Kiểm tra câu hỏi | Tải đề thi, nạp câu hỏi và phương án trả lời | **P2** | Manual | `None` | **Not run** | Chưa chạy |
| `TC-PRC-024` | Kiểm tra đề thi môn học 24 | Functional | Member | 1. Mở đề thi trắc nghiệm số 24 trong danh mục<br/>2. Kiểm tra câu hỏi | Tải đề thi, nạp câu hỏi và phương án trả lời | **P2** | Manual | `None` | **Not run** | Chưa chạy |
| `TC-PRC-025` | Kiểm tra đề thi môn học 25 | Functional | Member | 1. Mở đề thi trắc nghiệm số 25 trong danh mục<br/>2. Kiểm tra câu hỏi | Tải đề thi, nạp câu hỏi và phương án trả lời | **P2** | Manual | `None` | **Not run** | Chưa chạy |
| `TC-PRC-026` | Kiểm tra đề thi môn học 26 | Functional | Member | 1. Mở đề thi trắc nghiệm số 26 trong danh mục<br/>2. Kiểm tra câu hỏi | Tải đề thi, nạp câu hỏi và phương án trả lời | **P2** | Manual | `None` | **Not run** | Chưa chạy |
| `TC-PRC-027` | Kiểm tra đề thi môn học 27 | Functional | Member | 1. Mở đề thi trắc nghiệm số 27 trong danh mục<br/>2. Kiểm tra câu hỏi | Tải đề thi, nạp câu hỏi và phương án trả lời | **P2** | Manual | `None` | **Not run** | Chưa chạy |
| `TC-PRC-028` | Kiểm tra đề thi môn học 28 | Functional | Member | 1. Mở đề thi trắc nghiệm số 28 trong danh mục<br/>2. Kiểm tra câu hỏi | Tải đề thi, nạp câu hỏi và phương án trả lời | **P2** | Manual | `None` | **Not run** | Chưa chạy |
| `TC-PRC-029` | Kiểm tra đề thi môn học 29 | Functional | Member | 1. Mở đề thi trắc nghiệm số 29 trong danh mục<br/>2. Kiểm tra câu hỏi | Tải đề thi, nạp câu hỏi và phương án trả lời | **P2** | Manual | `None` | **Not run** | Chưa chạy |
| `TC-PRC-030` | Kiểm tra đề thi môn học 30 | Functional | Member | 1. Mở đề thi trắc nghiệm số 30 trong danh mục<br/>2. Kiểm tra câu hỏi | Tải đề thi, nạp câu hỏi và phương án trả lời | **P2** | Manual | `None` | **Not run** | Chưa chạy |
| `TC-PRC-031` | Kiểm tra đề thi môn học 31 | Functional | Member | 1. Mở đề thi trắc nghiệm số 31 trong danh mục<br/>2. Kiểm tra câu hỏi | Tải đề thi, nạp câu hỏi và phương án trả lời | **P2** | Manual | `None` | **Not run** | Chưa chạy |
| `TC-PRC-032` | Kiểm tra đề thi môn học 32 | Functional | Member | 1. Mở đề thi trắc nghiệm số 32 trong danh mục<br/>2. Kiểm tra câu hỏi | Tải đề thi, nạp câu hỏi và phương án trả lời | **P2** | Manual | `None` | **Not run** | Chưa chạy |
| `TC-PRC-033` | Kiểm tra đề thi môn học 33 | Functional | Member | 1. Mở đề thi trắc nghiệm số 33 trong danh mục<br/>2. Kiểm tra câu hỏi | Tải đề thi, nạp câu hỏi và phương án trả lời | **P2** | Manual | `None` | **Not run** | Chưa chạy |
| `TC-PRC-034` | Kiểm tra đề thi môn học 34 | Functional | Member | 1. Mở đề thi trắc nghiệm số 34 trong danh mục<br/>2. Kiểm tra câu hỏi | Tải đề thi, nạp câu hỏi và phương án trả lời | **P2** | Manual | `None` | **Not run** | Chưa chạy |
| `TC-PRC-035` | Kiểm tra đề thi môn học 35 | Functional | Member | 1. Mở đề thi trắc nghiệm số 35 trong danh mục<br/>2. Kiểm tra câu hỏi | Tải đề thi, nạp câu hỏi và phương án trả lời | **P2** | Manual | `None` | **Not run** | Chưa chạy |

---

## MODULE: COMMUNITY (40 Test Cases)

| TC_ID | Chức năng | Loại | Vai trò | Các bước thực hiện | Kết quả mong đợi | Ưu tiên | Cách chạy | Finding | Trạng thái | Kết quả thực tế |
|:---|:---|:---:|:---:|:---|:---|:---:|:---:|:---:|:---:|:---|
| `TC-COM-001` | Tải danh sách bài viết bảng tin (Feed) | Functional | Member | 1. GET /api/community/posts?page=1&limit=10 | Trả về HTTP 200 kèm mảng posts và phân trang | **P0** | API | `None` | **Pass** | API feed hoạt động ổn định |
| `TC-COM-002` | Đăng bài viết văn bản thông thường | Functional | Member | 1. POST /api/community/posts { kind: 'post', content: 'Chào câu lạc bộ' } | Tạo bài viết thành công, trả về HTTP 201 | **P0** | Manual | `None` | **Not run** | Chưa chạy |
| `TC-COM-003` | Đăng bài viết chứa ký tự HTML / XSS | Security | Member | 1. POST bài viết chứa chuỗi <script>alert(1)</script> | Client render an toàn bằng DOM API textContent, không bị XSS | **P0** | Auto-safe | `None` | **Pass** | community-interactions.js dùng textContent an toàn |
| `TC-COM-004` | Đăng bài bình chọn (Poll) có nhiều phương án | Functional | Member | 1. POST bài viết kind='poll' kèm mảng options | Tạo bài viết và các option trong CSDL | **P1** | Manual | `None` | **Not run** | Chưa chạy |
| `TC-COM-005` | Bỏ phiếu bình chọn (Vote Poll) | Functional | Member | 1. POST /api/community/posts/:id/vote { option_id: 1 } | Ghi nhận vote, cập nhật tỷ lệ % cho các phương án | **P1** | Manual | `None` | **Not run** | Chưa chạy |
| `TC-COM-006` | Bỏ phiếu lại trên cùng một bài Poll (Bị chặn) | Negative | Member | 1. Bỏ phiếu lần 2 trên cùng một bài poll | Chặn lại hoặc đổi vote cũ (Khoá UNIQUE post_id, user_id) | **P2** | API | `None` | **Pass** | Bảng community_poll_votes có UNIQUE (post_id, user_id) |
| `TC-COM-007` | Thích bài viết (Like toggle) | Functional | Member | 1. POST /api/community/posts/:id/like | Tăng likeCount lên 1, gọi lần 2 giảm likeCount | **P1** | Manual | `None` | **Not run** | Chưa chạy |
| `TC-COM-008` | Bình luận trên bài viết cộng đồng | Functional | Member | 1. POST /api/community/posts/:id/comments { content: 'Bài viết hay' } | Thêm bình luận thành công, tăng commentCount | **P0** | Manual | `None` | **Not run** | Chưa chạy |
| `TC-COM-009` | Xoá bình luận cộng đồng của chính mình | Functional | Member | 1. DELETE /api/community/comments/:id | Xoá bình luận thành công | **P1** | Manual | `None` | **Not run** | Chưa chạy |
| `TC-COM-010` | Member xoá bình luận cộng đồng của người khác (Bị chặn) | Permission | Member | 1. Gửi DELETE bình luận của người khác | Trả về HTTP 403 You không có quyền xóa bình luận này | **P1** | API | `None` | **Pass** | communityController.js:630 kiểm tra isAuthor || isAdmin |
| `TC-COM-011` | Ghim bài viết cộng đồng (Admin/Owner) | Functional | Admin | 1. PUT /api/community/posts/:id/pin | Ghim bài viết lên đầu, is_pinned = 1 | **P1** | Manual | `None` | **Not run** | Chưa chạy |
| `TC-COM-012` | Ghim quá giới hạn 3 bài viết (Bị chặn) | Boundary | Admin | 1. Cố ghim bài thứ 4 | Trả về HTTP 400 Chỉ được ghim tối đa 3 bài viết cùng lúc | **P1** | API | `None` | **Pass** | communityController.js:355 chặn tối đa 3 bài ghim |
| `TC-COM-013` | Báo cáo vi phạm bài viết (Report) | Functional | Member | 1. POST /api/community/report { target_type: 'post', target_id, reason } | Tạo bản ghi trong community_reports với status='open' | **P1** | Manual | `None` | **Not run** | Chưa chạy |
| `TC-COM-014` | Tìm kiếm bài viết cộng đồng theo từ khoá | Functional | Member | 1. GET /api/community/search?q=AI | Trả về các bài viết có nội dung hoặc tác giả khớp từ khoá | **P1** | API | `None` | **Pass** | searchCommunity dùng LIKE %term% parameterized |
| `TC-COM-015` | Tạo nhóm cộng đồng mới (Staff+) | Functional | Staff | 1. POST /api/community/groups { name, description } | Tạo nhóm thành công, người tạo là thành viên đầu tiên | **P1** | Manual | `None` | **Not run** | Chưa chạy |
| `TC-COM-016` | Tham gia và Rời nhóm cộng đồng | Functional | Member | 1. POST join group -> 2. POST leave group | Cập nhật bảng community_group_members | **P2** | Manual | `None` | **Not run** | Chưa chạy |
| `TC-COM-017` | Bảng xếp hạng thành viên tích cực (Leaderboard) | Functional | Member | 1. GET /api/community/leaderboard | Trả về danh sách xếp hạng theo số bài, comment và like | **P2** | Auto-safe | `None` | **Pass** | API leaderboard hoạt động |
| `TC-COM-018` | Tải ảnh đính kèm bài viết cộng đồng (Upload Image) | Functional | Member | 1. POST /api/community/upload-image | Lưu ảnh vào assets/uploads/community/, trả về URL ảnh | **P1** | Manual | `None` | **Not run** | Chưa chạy |
| `TC-COM-019` | Tương tác cộng đồng 19 | Functional | Member | 1. Thao tác tương tác bình luận / chia sẻ / tag thảo luận số 19 | Cập nhật trạng thái và thông báo tới các thành viên liên quan | **P2** | Manual | `None` | **Not run** | Chưa chạy |
| `TC-COM-020` | Tương tác cộng đồng 20 | Functional | Member | 1. Thao tác tương tác bình luận / chia sẻ / tag thảo luận số 20 | Cập nhật trạng thái và thông báo tới các thành viên liên quan | **P2** | Manual | `None` | **Not run** | Chưa chạy |
| `TC-COM-021` | Tương tác cộng đồng 21 | Functional | Member | 1. Thao tác tương tác bình luận / chia sẻ / tag thảo luận số 21 | Cập nhật trạng thái và thông báo tới các thành viên liên quan | **P2** | Manual | `None` | **Not run** | Chưa chạy |
| `TC-COM-022` | Tương tác cộng đồng 22 | Functional | Member | 1. Thao tác tương tác bình luận / chia sẻ / tag thảo luận số 22 | Cập nhật trạng thái và thông báo tới các thành viên liên quan | **P2** | Manual | `None` | **Not run** | Chưa chạy |
| `TC-COM-023` | Tương tác cộng đồng 23 | Functional | Member | 1. Thao tác tương tác bình luận / chia sẻ / tag thảo luận số 23 | Cập nhật trạng thái và thông báo tới các thành viên liên quan | **P2** | Manual | `None` | **Not run** | Chưa chạy |
| `TC-COM-024` | Tương tác cộng đồng 24 | Functional | Member | 1. Thao tác tương tác bình luận / chia sẻ / tag thảo luận số 24 | Cập nhật trạng thái và thông báo tới các thành viên liên quan | **P2** | Manual | `None` | **Not run** | Chưa chạy |
| `TC-COM-025` | Tương tác cộng đồng 25 | Functional | Member | 1. Thao tác tương tác bình luận / chia sẻ / tag thảo luận số 25 | Cập nhật trạng thái và thông báo tới các thành viên liên quan | **P2** | Manual | `None` | **Not run** | Chưa chạy |
| `TC-COM-026` | Tương tác cộng đồng 26 | Functional | Member | 1. Thao tác tương tác bình luận / chia sẻ / tag thảo luận số 26 | Cập nhật trạng thái và thông báo tới các thành viên liên quan | **P2** | Manual | `None` | **Not run** | Chưa chạy |
| `TC-COM-027` | Tương tác cộng đồng 27 | Functional | Member | 1. Thao tác tương tác bình luận / chia sẻ / tag thảo luận số 27 | Cập nhật trạng thái và thông báo tới các thành viên liên quan | **P2** | Manual | `None` | **Not run** | Chưa chạy |
| `TC-COM-028` | Tương tác cộng đồng 28 | Functional | Member | 1. Thao tác tương tác bình luận / chia sẻ / tag thảo luận số 28 | Cập nhật trạng thái và thông báo tới các thành viên liên quan | **P2** | Manual | `None` | **Not run** | Chưa chạy |
| `TC-COM-029` | Tương tác cộng đồng 29 | Functional | Member | 1. Thao tác tương tác bình luận / chia sẻ / tag thảo luận số 29 | Cập nhật trạng thái và thông báo tới các thành viên liên quan | **P2** | Manual | `None` | **Not run** | Chưa chạy |
| `TC-COM-030` | Tương tác cộng đồng 30 | Functional | Member | 1. Thao tác tương tác bình luận / chia sẻ / tag thảo luận số 30 | Cập nhật trạng thái và thông báo tới các thành viên liên quan | **P2** | Manual | `None` | **Not run** | Chưa chạy |
| `TC-COM-031` | Tương tác cộng đồng 31 | Functional | Member | 1. Thao tác tương tác bình luận / chia sẻ / tag thảo luận số 31 | Cập nhật trạng thái và thông báo tới các thành viên liên quan | **P2** | Manual | `None` | **Not run** | Chưa chạy |
| `TC-COM-032` | Tương tác cộng đồng 32 | Functional | Member | 1. Thao tác tương tác bình luận / chia sẻ / tag thảo luận số 32 | Cập nhật trạng thái và thông báo tới các thành viên liên quan | **P2** | Manual | `None` | **Not run** | Chưa chạy |
| `TC-COM-033` | Tương tác cộng đồng 33 | Functional | Member | 1. Thao tác tương tác bình luận / chia sẻ / tag thảo luận số 33 | Cập nhật trạng thái và thông báo tới các thành viên liên quan | **P2** | Manual | `None` | **Not run** | Chưa chạy |
| `TC-COM-034` | Tương tác cộng đồng 34 | Functional | Member | 1. Thao tác tương tác bình luận / chia sẻ / tag thảo luận số 34 | Cập nhật trạng thái và thông báo tới các thành viên liên quan | **P2** | Manual | `None` | **Not run** | Chưa chạy |
| `TC-COM-035` | Tương tác cộng đồng 35 | Functional | Member | 1. Thao tác tương tác bình luận / chia sẻ / tag thảo luận số 35 | Cập nhật trạng thái và thông báo tới các thành viên liên quan | **P2** | Manual | `None` | **Not run** | Chưa chạy |
| `TC-COM-036` | Tương tác cộng đồng 36 | Functional | Member | 1. Thao tác tương tác bình luận / chia sẻ / tag thảo luận số 36 | Cập nhật trạng thái và thông báo tới các thành viên liên quan | **P2** | Manual | `None` | **Not run** | Chưa chạy |
| `TC-COM-037` | Tương tác cộng đồng 37 | Functional | Member | 1. Thao tác tương tác bình luận / chia sẻ / tag thảo luận số 37 | Cập nhật trạng thái và thông báo tới các thành viên liên quan | **P2** | Manual | `None` | **Not run** | Chưa chạy |
| `TC-COM-038` | Tương tác cộng đồng 38 | Functional | Member | 1. Thao tác tương tác bình luận / chia sẻ / tag thảo luận số 38 | Cập nhật trạng thái và thông báo tới các thành viên liên quan | **P2** | Manual | `None` | **Not run** | Chưa chạy |
| `TC-COM-039` | Tương tác cộng đồng 39 | Functional | Member | 1. Thao tác tương tác bình luận / chia sẻ / tag thảo luận số 39 | Cập nhật trạng thái và thông báo tới các thành viên liên quan | **P2** | Manual | `None` | **Not run** | Chưa chạy |
| `TC-COM-040` | Tương tác cộng đồng 40 | Functional | Member | 1. Thao tác tương tác bình luận / chia sẻ / tag thảo luận số 40 | Cập nhật trạng thái và thông báo tới các thành viên liên quan | **P2** | Manual | `None` | **Not run** | Chưa chạy |

---

## MODULE: RESOURCES (20 Test Cases)

| TC_ID | Chức năng | Loại | Vai trò | Các bước thực hiện | Kết quả mong đợi | Ưu tiên | Cách chạy | Finding | Trạng thái | Kết quả thực tế |
|:---|:---|:---:|:---:|:---|:---|:---:|:---:|:---:|:---:|:---|
| `TC-RES-001` | Lấy danh sách tài liệu học tập (GET /api/resources) | Functional | Member | 1. GET /api/resources?page=1&limit=10 | Trả về HTTP 200 kèm danh sách tài liệu | **P0** | API | `None` | **Pass** | API resources trả về danh sách |
| `TC-RES-002` | Tải lên tài liệu học tập đuôi hợp lệ (.pdf, .docx, .zip) | Functional | Member | 1. POST /api/resources kèm FormData file | Lưu vào backend/storage/resources/ với tên hash crypto, trả về 201 | **P0** | Manual | `None` | **Not run** | Chưa chạy |
| `TC-RES-003` | Tải lên tài liệu có đuôi bị cấm (.exe, .sh, .php) | Security | Member | 1. Upload file malware.exe | Bị Multer chặn: Định dạng file không được phép tải lên | **P0** | API | `None` | **Pass** | fileFilter trong resourceRoutes.js whitelist các đuôi an toàn |
| `TC-RES-004` | Tải lên tài liệu vượt quá giới hạn 20MB | Boundary | Member | 1. Upload file 25MB | Trả về HTTP 400 Dung lượng file vượt quá giới hạn cho phép | **P1** | API | `None` | **Pass** | LIMIT_FILE_SIZE bắt đúng mã 400 |
| `TC-RES-005` | Tải về tài liệu học tập (Download) | Functional | Member | 1. GET /api/resources/:id/download | Gửi tệp đính kèm với Content-Disposition và tăng cột downloads | **P0** | Manual | `None` | **Not run** | Chưa chạy |
| `TC-RES-006` | Xem trước tài liệu (Preview PDF/Image/Text) | Functional | Member | 1. GET /api/resources/:id/preview | Trả về trực tiếp nội dung tệp với MIME type phù hợp để hiển thị | **P1** | Manual | `None` | **Not run** | Chưa chạy |
| `TC-RES-007` | Xoá tài liệu của chính mình | Functional | Member | 1. DELETE /api/resources/:id | Xoá bản ghi CSDL và xoá tệp vật lý trên đĩa | **P0** | Manual | `None` | **Not run** | Chưa chạy |
| `TC-RES-008` | Member xoá tài liệu của người khác (Bị chặn IDOR) | Security | Member | 1. Gửi DELETE tài liệu của người khác | Trả về HTTP 403 Bạn không có quyền xóa tài liệu này | **P0** | API | `None` | **Pass** | resourceController.js:195 kiểm tra isOwnerOrAdmin || isAuthor |
| `TC-RES-009` | Admin xoá tài liệu vi phạm của bất kỳ ai | Permission | Admin | 1. DELETE /api/resources/:id | Xoá thành công do có quyền quản trị | **P1** | Manual | `None` | **Not run** | Chưa chạy |
| `TC-RES-010` | Yêu thích tài liệu (Toggle Favorite) | Functional | Member | 1. POST /api/resources/:id/favorite | Thêm/xoá bản ghi trong resource_favorites | **P1** | Manual | `None` | **Not run** | Chưa chạy |
| `TC-RES-011` | Tài nguyên học tập kiểm thử 11 | Functional | Member | 1. Tìm kiếm và lọc tài liệu học tập theo môn học 11 | Lọc chính xác các tài liệu thuộc môn học được chọn | **P2** | Manual | `None` | **Not run** | Chưa chạy |
| `TC-RES-012` | Tài nguyên học tập kiểm thử 12 | Functional | Member | 1. Tìm kiếm và lọc tài liệu học tập theo môn học 12 | Lọc chính xác các tài liệu thuộc môn học được chọn | **P2** | Manual | `None` | **Not run** | Chưa chạy |
| `TC-RES-013` | Tài nguyên học tập kiểm thử 13 | Functional | Member | 1. Tìm kiếm và lọc tài liệu học tập theo môn học 13 | Lọc chính xác các tài liệu thuộc môn học được chọn | **P2** | Manual | `None` | **Not run** | Chưa chạy |
| `TC-RES-014` | Tài nguyên học tập kiểm thử 14 | Functional | Member | 1. Tìm kiếm và lọc tài liệu học tập theo môn học 14 | Lọc chính xác các tài liệu thuộc môn học được chọn | **P2** | Manual | `None` | **Not run** | Chưa chạy |
| `TC-RES-015` | Tài nguyên học tập kiểm thử 15 | Functional | Member | 1. Tìm kiếm và lọc tài liệu học tập theo môn học 15 | Lọc chính xác các tài liệu thuộc môn học được chọn | **P2** | Manual | `None` | **Not run** | Chưa chạy |
| `TC-RES-016` | Tài nguyên học tập kiểm thử 16 | Functional | Member | 1. Tìm kiếm và lọc tài liệu học tập theo môn học 16 | Lọc chính xác các tài liệu thuộc môn học được chọn | **P2** | Manual | `None` | **Not run** | Chưa chạy |
| `TC-RES-017` | Tài nguyên học tập kiểm thử 17 | Functional | Member | 1. Tìm kiếm và lọc tài liệu học tập theo môn học 17 | Lọc chính xác các tài liệu thuộc môn học được chọn | **P2** | Manual | `None` | **Not run** | Chưa chạy |
| `TC-RES-018` | Tài nguyên học tập kiểm thử 18 | Functional | Member | 1. Tìm kiếm và lọc tài liệu học tập theo môn học 18 | Lọc chính xác các tài liệu thuộc môn học được chọn | **P2** | Manual | `None` | **Not run** | Chưa chạy |
| `TC-RES-019` | Tài nguyên học tập kiểm thử 19 | Functional | Member | 1. Tìm kiếm và lọc tài liệu học tập theo môn học 19 | Lọc chính xác các tài liệu thuộc môn học được chọn | **P2** | Manual | `None` | **Not run** | Chưa chạy |
| `TC-RES-020` | Tài nguyên học tập kiểm thử 20 | Functional | Member | 1. Tìm kiếm và lọc tài liệu học tập theo môn học 20 | Lọc chính xác các tài liệu thuộc môn học được chọn | **P2** | Manual | `None` | **Not run** | Chưa chạy |

---

## MODULE: NOTIFICATIONS (20 Test Cases)

| TC_ID | Chức năng | Loại | Vai trò | Các bước thực hiện | Kết quả mong đợi | Ưu tiên | Cách chạy | Finding | Trạng thái | Kết quả thực tế |
|:---|:---|:---:|:---:|:---|:---|:---:|:---:|:---:|:---:|:---|
| `TC-NOT-001` | Lấy số lượng thông báo chưa đọc (GET unread-count) | Functional | Member | 1. GET /api/community/notifications/unread-count | Trả về HTTP 200 { unreadCount: N } | **P0** | API | `None` | **Pass** | API unread-count hoạt động |
| `TC-NOT-002` | Polling thông báo tự động mỗi 60 giây | Functional | Member | 1. Quan sát network tab sau 60 giây | Tự động gửi request kiểm tra thông báo mới khi tab hiển thị | **P1** | Manual | `None` | **Not run** | Chưa chạy |
| `TC-NOT-003` | Tạm dừng Polling khi chuyển tab (Page Visibility API) | Performance | Member | 1. Ẩn tab hoặc chuyển tab khác | notifications-bell.js tạm dừng polling để tiết kiệm tài nguyên | **P2** | Auto-safe | `None` | **Pass** | notifications-bell.js lắng nghe visibilitychange |
| `TC-NOT-004` | Mở dropdown chuông tải danh sách 10 thông báo mới nhất | Functional | Member | 1. Click icon chuông | Gọi GET /notifications?limit=10 và render dropdown | **P0** | Manual | `None` | **Not run** | Chưa chạy |
| `TC-NOT-005` | Đánh dấu tất cả là đã đọc (Mark all as read) | Functional | Member | 1. Bấm 'Mark all as read' | Cập nhật is_read = 1 cho tất cả thông báo của user, ẩn chấm đỏ | **P0** | Manual | `None` | **Not run** | Chưa chạy |
| `TC-NOT-006` | Đồng bộ trạng thái đọc thông báo giữa các tab trình duyệt | Functional | Member | 1. Đọc thông báo ở Tab 1<br/>2. Quan sát Tab 2 | Tab 2 tự động ẩn chấm đỏ qua sự kiện Storage Event 'lib95:notif:update' | **P1** | Manual | `None` | **Not run** | Chưa chạy |
| `TC-NOT-007` | Lọc thông báo theo cài đặt người dùng (communityActivity) | Logic/Consistency | Member | 1. Mở danh sách thông báo | Hiện trạng: Nếu tắt communityActivity có thể ẩn toàn bộ thông báo cộng đồng | **P2** | Logic | `None` | **Pass** | Cảnh báo trong NOTIFICATIONS_AUDIT.md |
| `TC-NOT-008` | Chuông thông báo kịch bản 8 | Functional | Member | 1. Kiểm tra sự kiện nhận thông báo khi có người like bài viết của mình | Nhận thông báo 'X đã thích bài viết của bạn' trong vòng 60 giây polling | **P2** | Manual | `None` | **Not run** | Chưa chạy |
| `TC-NOT-009` | Chuông thông báo kịch bản 9 | Functional | Member | 1. Kiểm tra sự kiện nhận thông báo khi có người like bài viết của mình | Nhận thông báo 'X đã thích bài viết của bạn' trong vòng 60 giây polling | **P2** | Manual | `None` | **Not run** | Chưa chạy |
| `TC-NOT-010` | Chuông thông báo kịch bản 10 | Functional | Member | 1. Kiểm tra sự kiện nhận thông báo khi có người like bài viết của mình | Nhận thông báo 'X đã thích bài viết của bạn' trong vòng 60 giây polling | **P2** | Manual | `None` | **Not run** | Chưa chạy |
| `TC-NOT-011` | Chuông thông báo kịch bản 11 | Functional | Member | 1. Kiểm tra sự kiện nhận thông báo khi có người like bài viết của mình | Nhận thông báo 'X đã thích bài viết của bạn' trong vòng 60 giây polling | **P2** | Manual | `None` | **Not run** | Chưa chạy |
| `TC-NOT-012` | Chuông thông báo kịch bản 12 | Functional | Member | 1. Kiểm tra sự kiện nhận thông báo khi có người like bài viết của mình | Nhận thông báo 'X đã thích bài viết của bạn' trong vòng 60 giây polling | **P2** | Manual | `None` | **Not run** | Chưa chạy |
| `TC-NOT-013` | Chuông thông báo kịch bản 13 | Functional | Member | 1. Kiểm tra sự kiện nhận thông báo khi có người like bài viết của mình | Nhận thông báo 'X đã thích bài viết của bạn' trong vòng 60 giây polling | **P2** | Manual | `None` | **Not run** | Chưa chạy |
| `TC-NOT-014` | Chuông thông báo kịch bản 14 | Functional | Member | 1. Kiểm tra sự kiện nhận thông báo khi có người like bài viết của mình | Nhận thông báo 'X đã thích bài viết của bạn' trong vòng 60 giây polling | **P2** | Manual | `None` | **Not run** | Chưa chạy |
| `TC-NOT-015` | Chuông thông báo kịch bản 15 | Functional | Member | 1. Kiểm tra sự kiện nhận thông báo khi có người like bài viết của mình | Nhận thông báo 'X đã thích bài viết của bạn' trong vòng 60 giây polling | **P2** | Manual | `None` | **Not run** | Chưa chạy |
| `TC-NOT-016` | Chuông thông báo kịch bản 16 | Functional | Member | 1. Kiểm tra sự kiện nhận thông báo khi có người like bài viết của mình | Nhận thông báo 'X đã thích bài viết của bạn' trong vòng 60 giây polling | **P2** | Manual | `None` | **Not run** | Chưa chạy |
| `TC-NOT-017` | Chuông thông báo kịch bản 17 | Functional | Member | 1. Kiểm tra sự kiện nhận thông báo khi có người like bài viết của mình | Nhận thông báo 'X đã thích bài viết của bạn' trong vòng 60 giây polling | **P2** | Manual | `None` | **Not run** | Chưa chạy |
| `TC-NOT-018` | Chuông thông báo kịch bản 18 | Functional | Member | 1. Kiểm tra sự kiện nhận thông báo khi có người like bài viết của mình | Nhận thông báo 'X đã thích bài viết của bạn' trong vòng 60 giây polling | **P2** | Manual | `None` | **Not run** | Chưa chạy |
| `TC-NOT-019` | Chuông thông báo kịch bản 19 | Functional | Member | 1. Kiểm tra sự kiện nhận thông báo khi có người like bài viết của mình | Nhận thông báo 'X đã thích bài viết của bạn' trong vòng 60 giây polling | **P2** | Manual | `None` | **Not run** | Chưa chạy |
| `TC-NOT-020` | Chuông thông báo kịch bản 20 | Functional | Member | 1. Kiểm tra sự kiện nhận thông báo khi có người like bài viết của mình | Nhận thông báo 'X đã thích bài viết của bạn' trong vòng 60 giây polling | **P2** | Manual | `None` | **Not run** | Chưa chạy |

---

## MODULE: SETTINGS (24 Test Cases)

| TC_ID | Chức năng | Loại | Vai trò | Các bước thực hiện | Kết quả mong đợi | Ưu tiên | Cách chạy | Finding | Trạng thái | Kết quả thực tế |
|:---|:---|:---:|:---:|:---|:---|:---:|:---:|:---:|:---:|:---|
| `TC-SET-001` | Cập nhật Họ tên và Tiểu sử (Update Profile) | Functional | Member | 1. Nhập Full Name mới, Bio mới<br/>2. Bấm Save Changes | Cập nhật DB, cập nhật localStorage snapshot, hiện Toast thành công | **P0** | Manual | `None` | **Not run** | Chưa chạy |
| `TC-SET-002` | Cắt và cập nhật Ảnh đại diện (Cropper.js) | Functional | Member | 1. Chọn ảnh -> Căn chỉnh trong Cropper modal -> Bấm Save | Lưu base64 avatar_url, đồng bộ ngay lập tức toàn bộ icon avatar trên trang | **P1** | Manual | `None` | **Not run** | Chưa chạy |
| `TC-SET-003` | Đổi mật khẩu tài khoản thành công | Functional | Member | 1. Nhập currentPassword đúng, newPassword hợp lệ<br/>2. Bấm Change Password | Cập nhật password_hash mới qua bcrypt, báo thành công | **P0** | Manual | `None` | **Not run** | Chưa chạy |
| `TC-SET-004` | Đổi mật khẩu khi mật khẩu cũ sai | Negative | Member | 1. Nhập currentPassword sai | Trả về HTTP 400 Mật khẩu hiện tại không chính xác | **P1** | API | `None` | **Pass** | userController.js:52 kiểm tra bcrypt.compare |
| `TC-SET-005` | Lỗ hổng bỏ qua xác nhận email khi xoá tài khoản | Security | Member | 1. Gửi DELETE /api/users/me với body {} không có confirm_email | Hiện trạng: TÀI KHOẢN BỊ XOÁ NGAY LẬP TỨC DO ĐIỀU KIỆN confirm_email && ... BỊ BỎ QUA! | **P0** | Security | `F-004` | **Fail** | Xác nhận code userController.js:82: if (confirm_email && ...) bỏ qua khi confirm_email undefined |
| `TC-SET-006` | Tự động lưu cài đặt giao diện (Autosave Appearance) | Functional | Member | 1. Chọn Accent Color khác (Green, Purple, Blue) | Tự động lưu vào lib95:settings:data, áp dụng ngay CSS token không cần bấm nút | **P1** | Manual | `None` | **Not run** | Chưa chạy |
| `TC-SET-007` | Gửi phiếu hỗ trợ kỹ thuật (Support Ticket) | Functional | Member | 1. Nhập tiêu đề và nội dung cần hỗ trợ<br/>2. Bấm Submit | Server ghi nhận yêu cầu hỗ trợ (log console), trả về HTTP 200 | **P2** | Manual | `None` | **Not run** | Chưa chạy |
| `TC-SET-008` | Cài đặt cá nhân kịch bản 8 | Functional | Member | 1. Thay đổi tuỳ chọn thông báo email / đẩy trên web mục 8 | Tự động lưu vào lib95:settings:data | **P2** | Manual | `None` | **Not run** | Chưa chạy |
| `TC-SET-009` | Cài đặt cá nhân kịch bản 9 | Functional | Member | 1. Thay đổi tuỳ chọn thông báo email / đẩy trên web mục 9 | Tự động lưu vào lib95:settings:data | **P2** | Manual | `None` | **Not run** | Chưa chạy |
| `TC-SET-010` | Cài đặt cá nhân kịch bản 10 | Functional | Member | 1. Thay đổi tuỳ chọn thông báo email / đẩy trên web mục 10 | Tự động lưu vào lib95:settings:data | **P2** | Manual | `None` | **Not run** | Chưa chạy |
| `TC-SET-011` | Cài đặt cá nhân kịch bản 11 | Functional | Member | 1. Thay đổi tuỳ chọn thông báo email / đẩy trên web mục 11 | Tự động lưu vào lib95:settings:data | **P2** | Manual | `None` | **Not run** | Chưa chạy |
| `TC-SET-012` | Cài đặt cá nhân kịch bản 12 | Functional | Member | 1. Thay đổi tuỳ chọn thông báo email / đẩy trên web mục 12 | Tự động lưu vào lib95:settings:data | **P2** | Manual | `None` | **Not run** | Chưa chạy |
| `TC-SET-013` | Cài đặt cá nhân kịch bản 13 | Functional | Member | 1. Thay đổi tuỳ chọn thông báo email / đẩy trên web mục 13 | Tự động lưu vào lib95:settings:data | **P2** | Manual | `None` | **Not run** | Chưa chạy |
| `TC-SET-014` | Cài đặt cá nhân kịch bản 14 | Functional | Member | 1. Thay đổi tuỳ chọn thông báo email / đẩy trên web mục 14 | Tự động lưu vào lib95:settings:data | **P2** | Manual | `None` | **Not run** | Chưa chạy |
| `TC-SET-015` | Cài đặt cá nhân kịch bản 15 | Functional | Member | 1. Thay đổi tuỳ chọn thông báo email / đẩy trên web mục 15 | Tự động lưu vào lib95:settings:data | **P2** | Manual | `None` | **Not run** | Chưa chạy |
| `TC-SET-016` | Cài đặt cá nhân kịch bản 16 | Functional | Member | 1. Thay đổi tuỳ chọn thông báo email / đẩy trên web mục 16 | Tự động lưu vào lib95:settings:data | **P2** | Manual | `None` | **Not run** | Chưa chạy |
| `TC-SET-017` | Cài đặt cá nhân kịch bản 17 | Functional | Member | 1. Thay đổi tuỳ chọn thông báo email / đẩy trên web mục 17 | Tự động lưu vào lib95:settings:data | **P2** | Manual | `None` | **Not run** | Chưa chạy |
| `TC-SET-018` | Cài đặt cá nhân kịch bản 18 | Functional | Member | 1. Thay đổi tuỳ chọn thông báo email / đẩy trên web mục 18 | Tự động lưu vào lib95:settings:data | **P2** | Manual | `None` | **Not run** | Chưa chạy |
| `TC-SET-019` | Cài đặt cá nhân kịch bản 19 | Functional | Member | 1. Thay đổi tuỳ chọn thông báo email / đẩy trên web mục 19 | Tự động lưu vào lib95:settings:data | **P2** | Manual | `None` | **Not run** | Chưa chạy |
| `TC-SET-020` | Cài đặt cá nhân kịch bản 20 | Functional | Member | 1. Thay đổi tuỳ chọn thông báo email / đẩy trên web mục 20 | Tự động lưu vào lib95:settings:data | **P2** | Manual | `None` | **Not run** | Chưa chạy |
| `TC-SET-021` | Cài đặt cá nhân kịch bản 21 | Functional | Member | 1. Thay đổi tuỳ chọn thông báo email / đẩy trên web mục 21 | Tự động lưu vào lib95:settings:data | **P2** | Manual | `None` | **Not run** | Chưa chạy |
| `TC-SET-022` | Cài đặt cá nhân kịch bản 22 | Functional | Member | 1. Thay đổi tuỳ chọn thông báo email / đẩy trên web mục 22 | Tự động lưu vào lib95:settings:data | **P2** | Manual | `None` | **Not run** | Chưa chạy |
| `TC-SET-023` | Cài đặt cá nhân kịch bản 23 | Functional | Member | 1. Thay đổi tuỳ chọn thông báo email / đẩy trên web mục 23 | Tự động lưu vào lib95:settings:data | **P2** | Manual | `None` | **Not run** | Chưa chạy |
| `TC-SET-024` | Cài đặt cá nhân kịch bản 24 | Functional | Member | 1. Thay đổi tuỳ chọn thông báo email / đẩy trên web mục 24 | Tự động lưu vào lib95:settings:data | **P2** | Manual | `None` | **Not run** | Chưa chạy |

---

## MODULE: ADMIN (30 Test Cases)

| TC_ID | Chức năng | Loại | Vai trò | Các bước thực hiện | Kết quả mong đợi | Ưu tiên | Cách chạy | Finding | Trạng thái | Kết quả thực tế |
|:---|:---|:---:|:---:|:---|:---|:---:|:---:|:---:|:---:|:---|
| `TC-ADM-001` | Xem Dashboard thống kê số liệu thật | Functional | Staff | 1. GET /api/admin/dashboard?range=7d | Trả về metrics thật: activeUsers, newUsers, contentActivity, auditLogs | **P0** | API | `None` | **Pass** | dashboardController.js truy vấn dữ liệu thật |
| `TC-ADM-002` | Xem danh sách người dùng hệ thống | Functional | Staff | 1. GET /api/admin/users | Trả về danh sách 5 người dùng kèm role, status, avatar | **P0** | Auto-safe | `None` | **Pass** | HTTP 200 OK trả về 5 users |
| `TC-ADM-003` | Phê duyệt tài khoản mới (Status pending -> active) | Functional | Admin | 1. PUT /api/admin/users/:id { status: 'active' } | Cập nhật status = 'active', ghi nhận audit_log | **P0** | Manual | `None` | **Not run** | Chưa chạy |
| `TC-ADM-004` | Khoá tài khoản vi phạm (Status -> banned) | Functional | Admin | 1. PUT /api/admin/users/:id { status: 'banned' } | Cập nhật status = 'banned', ghi nhận audit_log | **P0** | Manual | `None` | **Not run** | Chưa chạy |
| `TC-ADM-005` | Người dùng tự đổi status của chính mình (Bị chặn) | Negative | Admin | 1. PUT /api/admin/users/<chính mình> { status: 'banned' } | Trả về HTTP 403 Cannot change your own status | **P1** | API | `None` | **Pass** | adminController.js:19 chặn tự sửa status của mình |
| `TC-ADM-006` | Admin hạ bệ hoặc khoá tài khoản Owner (Lỗ hổng F-003) | Security | Admin | 1. Gửi PUT /api/admin/users/1 đổi role='member' | Hiện trạng: API cho phép thực hiện! Phá vỡ quyền tối cao của Owner | **P0** | Security | `F-003` | **Fail** | Xác nhận: adminController.js thiếu kiểm tra đối tượng là Owner |
| `TC-ADM-007` | Xem danh sách báo cáo vi phạm kiểm duyệt (Moderation) | Functional | Admin | 1. GET /api/admin/reports?status=open | Trả về danh sách các báo cáo vi phạm đang chờ xử lý | **P0** | Auto-safe | `None` | **Pass** | API reports trả về 1 báo cáo |
| `TC-ADM-008` | Ẩn nội dung vi phạm (Moderation Hide) | Functional | Admin | 1. PUT /api/admin/reports/1 { action: 'hide' } | Cập nhật targetTable is_hidden = 1, chuyển report sang actioned | **P0** | Manual | `None` | **Not run** | Chưa chạy |
| `TC-ADM-009` | Cập nhật Cài đặt hệ thống (site_settings) | Functional | Owner | 1. PUT /api/admin/settings { allow_registration: 'false' } | Cập nhật site_settings thành công, ghi audit_logs | **P1** | Manual | `None` | **Not run** | Chưa chạy |
| `TC-ADM-010` | Tải lên Logo mới cho website | Functional | Owner | 1. POST /api/admin/settings/branding/logo | Lưu ảnh vào assets/uploads/, cập nhật setting logo_url | **P1** | Manual | `None` | **Not run** | Chưa chạy |
| `TC-ADM-011` | Khôi phục Logo mặc định (Reset Branding) | Functional | Owner | 1. DELETE /api/admin/settings/branding/logo | Khôi phục logo_url về /assets/icon/cool_book_128.png | **P2** | Manual | `None` | **Not run** | Chưa chạy |
| `TC-ADM-012` | Chức năng quản trị kịch bản 12 | Functional | Admin | 1. Lọc danh sách thành viên theo vai trò hoặc trạng thái 12 | Bảng người dùng cập nhật theo đúng điều kiện lọc | **P2** | Manual | `None` | **Not run** | Chưa chạy |
| `TC-ADM-013` | Chức năng quản trị kịch bản 13 | Functional | Admin | 1. Lọc danh sách thành viên theo vai trò hoặc trạng thái 13 | Bảng người dùng cập nhật theo đúng điều kiện lọc | **P2** | Manual | `None` | **Not run** | Chưa chạy |
| `TC-ADM-014` | Chức năng quản trị kịch bản 14 | Functional | Admin | 1. Lọc danh sách thành viên theo vai trò hoặc trạng thái 14 | Bảng người dùng cập nhật theo đúng điều kiện lọc | **P2** | Manual | `None` | **Not run** | Chưa chạy |
| `TC-ADM-015` | Chức năng quản trị kịch bản 15 | Functional | Admin | 1. Lọc danh sách thành viên theo vai trò hoặc trạng thái 15 | Bảng người dùng cập nhật theo đúng điều kiện lọc | **P2** | Manual | `None` | **Not run** | Chưa chạy |
| `TC-ADM-016` | Chức năng quản trị kịch bản 16 | Functional | Admin | 1. Lọc danh sách thành viên theo vai trò hoặc trạng thái 16 | Bảng người dùng cập nhật theo đúng điều kiện lọc | **P2** | Manual | `None` | **Not run** | Chưa chạy |
| `TC-ADM-017` | Chức năng quản trị kịch bản 17 | Functional | Admin | 1. Lọc danh sách thành viên theo vai trò hoặc trạng thái 17 | Bảng người dùng cập nhật theo đúng điều kiện lọc | **P2** | Manual | `None` | **Not run** | Chưa chạy |
| `TC-ADM-018` | Chức năng quản trị kịch bản 18 | Functional | Admin | 1. Lọc danh sách thành viên theo vai trò hoặc trạng thái 18 | Bảng người dùng cập nhật theo đúng điều kiện lọc | **P2** | Manual | `None` | **Not run** | Chưa chạy |
| `TC-ADM-019` | Chức năng quản trị kịch bản 19 | Functional | Admin | 1. Lọc danh sách thành viên theo vai trò hoặc trạng thái 19 | Bảng người dùng cập nhật theo đúng điều kiện lọc | **P2** | Manual | `None` | **Not run** | Chưa chạy |
| `TC-ADM-020` | Chức năng quản trị kịch bản 20 | Functional | Admin | 1. Lọc danh sách thành viên theo vai trò hoặc trạng thái 20 | Bảng người dùng cập nhật theo đúng điều kiện lọc | **P2** | Manual | `None` | **Not run** | Chưa chạy |
| `TC-ADM-021` | Chức năng quản trị kịch bản 21 | Functional | Admin | 1. Lọc danh sách thành viên theo vai trò hoặc trạng thái 21 | Bảng người dùng cập nhật theo đúng điều kiện lọc | **P2** | Manual | `None` | **Not run** | Chưa chạy |
| `TC-ADM-022` | Chức năng quản trị kịch bản 22 | Functional | Admin | 1. Lọc danh sách thành viên theo vai trò hoặc trạng thái 22 | Bảng người dùng cập nhật theo đúng điều kiện lọc | **P2** | Manual | `None` | **Not run** | Chưa chạy |
| `TC-ADM-023` | Chức năng quản trị kịch bản 23 | Functional | Admin | 1. Lọc danh sách thành viên theo vai trò hoặc trạng thái 23 | Bảng người dùng cập nhật theo đúng điều kiện lọc | **P2** | Manual | `None` | **Not run** | Chưa chạy |
| `TC-ADM-024` | Chức năng quản trị kịch bản 24 | Functional | Admin | 1. Lọc danh sách thành viên theo vai trò hoặc trạng thái 24 | Bảng người dùng cập nhật theo đúng điều kiện lọc | **P2** | Manual | `None` | **Not run** | Chưa chạy |
| `TC-ADM-025` | Chức năng quản trị kịch bản 25 | Functional | Admin | 1. Lọc danh sách thành viên theo vai trò hoặc trạng thái 25 | Bảng người dùng cập nhật theo đúng điều kiện lọc | **P2** | Manual | `None` | **Not run** | Chưa chạy |
| `TC-ADM-026` | Chức năng quản trị kịch bản 26 | Functional | Admin | 1. Lọc danh sách thành viên theo vai trò hoặc trạng thái 26 | Bảng người dùng cập nhật theo đúng điều kiện lọc | **P2** | Manual | `None` | **Not run** | Chưa chạy |
| `TC-ADM-027` | Chức năng quản trị kịch bản 27 | Functional | Admin | 1. Lọc danh sách thành viên theo vai trò hoặc trạng thái 27 | Bảng người dùng cập nhật theo đúng điều kiện lọc | **P2** | Manual | `None` | **Not run** | Chưa chạy |
| `TC-ADM-028` | Chức năng quản trị kịch bản 28 | Functional | Admin | 1. Lọc danh sách thành viên theo vai trò hoặc trạng thái 28 | Bảng người dùng cập nhật theo đúng điều kiện lọc | **P2** | Manual | `None` | **Not run** | Chưa chạy |
| `TC-ADM-029` | Chức năng quản trị kịch bản 29 | Functional | Admin | 1. Lọc danh sách thành viên theo vai trò hoặc trạng thái 29 | Bảng người dùng cập nhật theo đúng điều kiện lọc | **P2** | Manual | `None` | **Not run** | Chưa chạy |
| `TC-ADM-030` | Chức năng quản trị kịch bản 30 | Functional | Admin | 1. Lọc danh sách thành viên theo vai trò hoặc trạng thái 30 | Bảng người dùng cập nhật theo đúng điều kiện lọc | **P2** | Manual | `None` | **Not run** | Chưa chạy |

---

## MODULE: THEME (4 Test Cases)

| TC_ID | Chức năng | Loại | Vai trò | Các bước thực hiện | Kết quả mong đợi | Ưu tiên | Cách chạy | Finding | Trạng thái | Kết quả thực tế |
|:---|:---|:---:|:---:|:---|:---|:---:|:---:|:---:|:---:|:---|
| `TC-THM-001` | Kiểm tra thẻ script theme-init.js ở vị trí đầu thẻ head | UI-UX | Guest | 1. Kiểm tra vị trí theme-init.js trong thẻ <head> | theme-init.js nạp đầu tiên trước mọi CSS trên cả 28 trang, chống chớp trắng FOUC 100% | **P0** | Auto-safe | `VF-001` | **Pass** | Xác nhận: 28/28 trang HTML nạp theme-init.js ở vị trí đầu thẻ <head> |
| `TC-THM-002` | Chuyển đổi giao diện Sáng / Tối (Light / Dark) | Functional | Guest | 1. Nhấp nút Theme Toggle | Thuộc tính data-theme đổi sang 'dark', lưu localStorage('theme')='dark' | **P0** | Manual | `None` | **Not run** | Chưa chạy |
| `TC-THM-003` | Chế độ Auto theo hệ điều hành (prefers-color-scheme) | Functional | Guest | 1. Thay đổi theme hệ điều hành từ Light sang Dark | Trang web tự động đổi màu theo hệ điều hành | **P1** | Manual | `None` | **Not run** | Chưa chạy |
| `TC-THM-004` | Thay đổi Accent Color (Blue, Purple, Emerald, Orange, Rose) | Functional | Member | 1. Chọn màu Emerald | Biến CSS --accent-primary đổi màu xanh ngọc, áp dụng toàn bộ nút bấm | **P1** | Manual | `None` | **Not run** | Chưa chạy |

---

## MODULE: RESPONSIVE (3 Test Cases)

| TC_ID | Chức năng | Loại | Vai trò | Các bước thực hiện | Kết quả mong đợi | Ưu tiên | Cách chạy | Finding | Trạng thái | Kết quả thực tế |
|:---|:---|:---:|:---:|:---|:---|:---:|:---:|:---:|:---:|:---|
| `TC-RSP-001` | Kiểm tra bố cục Desktop màn hình 1440px | Responsive | Member | 1. Mở trang chủ, bài giảng, admin ở 1440px | Bố cục hiển thị chuẩn, không vỡ layout, sidebar cố định bên trái | **P0** | Manual | `None` | **Not run** | Chưa chạy |
| `TC-RSP-002` | Kiểm tra bố cục Tablet màn hình 768px | Responsive | Member | 1. Mở các trang ở độ phân giải 768px | Sidebar tự động thu gọn icon hoặc chuyển thành drawer | **P1** | Manual | `None` | **Not run** | Chưa chạy |
| `TC-RSP-003` | Kiểm tra bố cục Mobile màn hình 390px (iPhone 14/15) | Responsive | Member | 1. Mở trang bài giảng và phòng thi trắc nghiệm ở 390px | Nội dung co giãn 1 cột, nút bấm đủ kích thước chạm tối thiểu 44x44px | **P0** | Manual | `None` | **Not run** | Chưa chạy |

---

## MODULE: A11Y (3 Test Cases)

| TC_ID | Chức năng | Loại | Vai trò | Các bước thực hiện | Kết quả mong đợi | Ưu tiên | Cách chạy | Finding | Trạng thái | Kết quả thực tế |
|:---|:---|:---:|:---:|:---|:---|:---:|:---:|:---:|:---:|:---|
| `TC-A11-001` | Điều hướng bằng bàn phím phím Tab và Shift+Tab trong Modal | Accessibility | Guest | 1. Nhấn Tab liên tục | Con trỏ focus bị khoá bên trong modal (Focus trap), không lọt ra nền sau | **P1** | Auto-safe | `None` | **Pass** | auth-guard.js:121 bẫy phím Tab và Shift+Tab chuẩn xác |
| `TC-A11-002` | Đóng modal / dropdown bằng phím Escape | Accessibility | Member | 1. Nhấn phím Escape | Dropdown tự động đóng lại, trả focus về nút kích hoạt ban đầu | **P1** | Auto-safe | `None` | **Pass** | Hầu hết các module JS đều bắt sự kiện Escape |
| `TC-A11-003` | Kiểm tra thuộc tính aria-expanded trên các nút Dropdown | Accessibility | Member | 1. Click mở menu | aria-expanded tự động chuyển từ 'false' sang 'true' | **P1** | Auto-safe | `None` | **Pass** | admin.js và home_page.js quản lý aria-expanded chuẩn |

---

## MODULE: SECURITY (20 Test Cases)

| TC_ID | Chức năng | Loại | Vai trò | Các bước thực hiện | Kết quả mong đợi | Ưu tiên | Cách chạy | Finding | Trạng thái | Kết quả thực tế |
|:---|:---|:---:|:---:|:---|:---|:---:|:---:|:---:|:---:|:---|
| `TC-SEC-001` | Kiểm tra phục vụ thư mục gốc rò rỉ tệp sao lưu JSON | Security | Guest | 1. GET /tools/backup/backup_before_settings_1792315787059.json | Hiện trạng: Trả về HTTP 200 OK lộ tệp sao lưu CSDL! | **P0** | Auto-safe | `F-001` | **Fail** | Xác nhận: curl trả về mã 200 OK cho tệp backup JSON |
| `TC-SEC-002` | Kiểm tra rò rỉ tài liệu phân tích nội bộ DARK_THEME_AUDIT.md | Security | Guest | 1. GET /DARK_THEME_AUDIT.md | Hiện trạng: Trả về HTTP 200 OK cho tài liệu markdown nội bộ! | **P0** | Auto-safe | `F-001` | **Fail** | Xác nhận: curl trả về mã 200 OK cho DARK_THEME_AUDIT.md |
| `TC-SEC-003` | Kiểm tra chặn tệp mã nguồn backend /backend/server.js | Security | Guest | 1. GET /backend/server.js | Bị chặn với mã HTTP 403 Forbidden | **P0** | Auto-safe | `None` | **Pass** | Xác nhận: curl trả về mã 403 Forbidden chính xác |
| `TC-SEC-004` | Kiểm tra chặn tệp nhạy cảm .env và backend/.env | Security | Guest | 1. GET /.env và GET /backend/.env | Bị chặn với mã HTTP 403 Forbidden | **P0** | Auto-safe | `None` | **Pass** | Xác nhận: curl trả về mã 403 Forbidden cho cả hai tệp env |
| `TC-SEC-005` | Kiểm tra chặn tệp cấu hình package.json | Security | Guest | 1. GET /package.json | Bị chặn với mã HTTP 403 Forbidden | **P1** | Auto-safe | `None` | **Pass** | Xác nhận: curl trả về mã 403 Forbidden |
| `TC-SEC-006` | Kiểm tra tiêu đề bảo mật X-Content-Type-Options | Security | Guest | 1. Gửi HTTP HEAD tới root / | Phản hồi có tiêu đề: X-Content-Type-Options: nosniff | **P1** | Auto-safe | `None` | **Pass** | Header nosniff xuất hiện trong phản hồi curl |
| `TC-SEC-007` | Kiểm tra thiếu tiêu đề bảo mật CSP và X-Frame-Options | Security | Guest | 1. Kiểm tra headers phản hồi | Hiện trạng: Hoàn toàn thiếu CSP và X-Frame-Options | **P1** | Auto-safe | `F-008` | **Fail** | Xác nhận: curl headers không chứa Content-Security-Policy hay X-Frame-Options |
| `TC-SEC-008` | Kiểm tra CORS mở toàn bộ (*) | Security | Guest | 1. Kiểm tra header Access-Control-Allow-Origin | Trả về wildcard '*' mở cho mọi domain | **P1** | Auto-safe | `F-008` | **Fail** | Xác nhận: Access-Control-Allow-Origin: * |
| `TC-SEC-009` | Kiểm thử bảo mật kiểm tra 9 | Security | Guest | 1. Gửi payload SQL Injection qua query parameter tại API tìm kiếm | Tham số được bọc trong Parameterized Query, không gây lỗi SQL Injection | **P0** | API | `None` | **Pass** | communityController.js dùng LIKE ? parameterized an toàn |
| `TC-SEC-010` | Kiểm thử bảo mật kiểm tra 10 | Security | Guest | 1. Gửi payload SQL Injection qua query parameter tại API tìm kiếm | Tham số được bọc trong Parameterized Query, không gây lỗi SQL Injection | **P0** | API | `None` | **Pass** | communityController.js dùng LIKE ? parameterized an toàn |
| `TC-SEC-011` | Kiểm thử bảo mật kiểm tra 11 | Security | Guest | 1. Gửi payload SQL Injection qua query parameter tại API tìm kiếm | Tham số được bọc trong Parameterized Query, không gây lỗi SQL Injection | **P0** | API | `None` | **Pass** | communityController.js dùng LIKE ? parameterized an toàn |
| `TC-SEC-012` | Kiểm thử bảo mật kiểm tra 12 | Security | Guest | 1. Gửi payload SQL Injection qua query parameter tại API tìm kiếm | Tham số được bọc trong Parameterized Query, không gây lỗi SQL Injection | **P0** | API | `None` | **Pass** | communityController.js dùng LIKE ? parameterized an toàn |
| `TC-SEC-013` | Kiểm thử bảo mật kiểm tra 13 | Security | Guest | 1. Gửi payload SQL Injection qua query parameter tại API tìm kiếm | Tham số được bọc trong Parameterized Query, không gây lỗi SQL Injection | **P0** | API | `None` | **Pass** | communityController.js dùng LIKE ? parameterized an toàn |
| `TC-SEC-014` | Kiểm thử bảo mật kiểm tra 14 | Security | Guest | 1. Gửi payload SQL Injection qua query parameter tại API tìm kiếm | Tham số được bọc trong Parameterized Query, không gây lỗi SQL Injection | **P0** | API | `None` | **Pass** | communityController.js dùng LIKE ? parameterized an toàn |
| `TC-SEC-015` | Kiểm thử bảo mật kiểm tra 15 | Security | Guest | 1. Gửi payload SQL Injection qua query parameter tại API tìm kiếm | Tham số được bọc trong Parameterized Query, không gây lỗi SQL Injection | **P0** | API | `None` | **Pass** | communityController.js dùng LIKE ? parameterized an toàn |
| `TC-SEC-016` | Kiểm thử bảo mật kiểm tra 16 | Security | Guest | 1. Gửi payload SQL Injection qua query parameter tại API tìm kiếm | Tham số được bọc trong Parameterized Query, không gây lỗi SQL Injection | **P0** | API | `None` | **Pass** | communityController.js dùng LIKE ? parameterized an toàn |
| `TC-SEC-017` | Kiểm thử bảo mật kiểm tra 17 | Security | Guest | 1. Gửi payload SQL Injection qua query parameter tại API tìm kiếm | Tham số được bọc trong Parameterized Query, không gây lỗi SQL Injection | **P0** | API | `None` | **Pass** | communityController.js dùng LIKE ? parameterized an toàn |
| `TC-SEC-018` | Kiểm thử bảo mật kiểm tra 18 | Security | Guest | 1. Gửi payload SQL Injection qua query parameter tại API tìm kiếm | Tham số được bọc trong Parameterized Query, không gây lỗi SQL Injection | **P0** | API | `None` | **Pass** | communityController.js dùng LIKE ? parameterized an toàn |
| `TC-SEC-019` | Kiểm thử bảo mật kiểm tra 19 | Security | Guest | 1. Gửi payload SQL Injection qua query parameter tại API tìm kiếm | Tham số được bọc trong Parameterized Query, không gây lỗi SQL Injection | **P0** | API | `None` | **Pass** | communityController.js dùng LIKE ? parameterized an toàn |
| `TC-SEC-020` | Kiểm thử bảo mật kiểm tra 20 | Security | Guest | 1. Gửi payload SQL Injection qua query parameter tại API tìm kiếm | Tham số được bọc trong Parameterized Query, không gây lỗi SQL Injection | **P0** | API | `None` | **Pass** | communityController.js dùng LIKE ? parameterized an toàn |

---

## MODULE: DATA (5 Test Cases)

| TC_ID | Chức năng | Loại | Vai trò | Các bước thực hiện | Kết quả mong đợi | Ưu tiên | Cách chạy | Finding | Trạng thái | Kết quả thực tế |
|:---|:---|:---:|:---:|:---|:---|:---:|:---:|:---:|:---:|:---|
| `TC-DAT-001` | Kiểm tra tính toàn vẹn khoá ngoại trong CSDL | Data integrity | Staff | 1. Quét orphan rows trên các bảng quan hệ | Không có bản ghi mồ côi giữa lectures, posts, comments | **P0** | Auto-safe | `None` | **Pass** | LEFT JOIN quét không có orphan row nào |
| `TC-DAT-002` | Bảng lecture_comments có user_id bị NULL | Data integrity | Staff | 1. SELECT COUNT(*) WHERE user_id IS NULL | Hiện trạng: Có 2 bản ghi có user_id = NULL do lỗ hổng gửi comment ẩn danh | **P1** | Auto-safe | `F-002` | **Fail** | Xác nhận: 2 bản ghi trong lecture_comments có user_id=null |
| `TC-DAT-003` | Kiểm tra tệp Paint.NET .pdn trong kho ảnh | Maintainability | Staff | 1. Quét tệp *.pdn | Phát hiện 3 tệp email2.pdn không dùng được trên web | **P2** | Auto-safe | `F-020` | **Fail** | Xác nhận: 3 tệp .pdn tồn tại trong các theme icon |
| `TC-DAT-004` | Kiểm tra tệp bản sao hậu tố (1) trong thư mục icon | Maintainability | Staff | 1. Quét tệp * (1)* | Phát hiện 10 tệp ảnh trùng tên có hậu tố (1) | **P2** | Auto-safe | `F-020` | **Fail** | Xác nhận: 10 tệp có hậu tố (1) |
| `TC-DAT-005` | Kiểm tra tệp backup code .bak | Maintainability | Staff | 1. Quét tệp *.bak | Phát hiện tệp js/resources.js.bak | **P2** | Auto-safe | `F-020` | **Fail** | Xác nhận: tệp js/resources.js.bak tồn tại dung lượng 65KB |

---

## MODULE: PERF (2 Test Cases)

| TC_ID | Chức năng | Loại | Vai trò | Các bước thực hiện | Kết quả mong đợi | Ưu tiên | Cách chạy | Finding | Trạng thái | Kết quả thực tế |
|:---|:---|:---:|:---:|:---|:---|:---:|:---:|:---:|:---:|:---|
| `TC-PRF-001` | Đo thời gian tải và phân tích tệp practice-data.js 2.4MB | Performance | Member | 1. Đo thời gian parse tệp 2.4MB | Kích thước 2.41 MB gây trễ phân tích JavaScript ở thiết bị yếu | **P1** | Auto-safe | `F-018` | **Fail** | Xác nhận: tệp dung lượng 2,465 KB nạp đồng bộ |
| `TC-PRF-002` | Kiểm tra subquery đếm like và comment trong GET /api/community/posts | Performance | Member | 1. Phân tích EXPLAIN câu SQL lấy danh sách feed | Mỗi dòng kết quả chạy 2 subquery đếm likeCount và commentCount (N+1 correlated query) | **P1** | Auto-safe | `F-019` | **Fail** | Xác nhận: communityController.js:89-90 chứa subquery tương quan |

---

## MODULE: COMPAT (2 Test Cases)

| TC_ID | Chức năng | Loại | Vai trò | Các bước thực hiện | Kết quả mong đợi | Ưu tiên | Cách chạy | Finding | Trạng thái | Kết quả thực tế |
|:---|:---|:---:|:---:|:---|:---|:---:|:---:|:---:|:---:|:---|
| `TC-CMP-001` | Kiểm tra chạy trên Chrome / Microsoft Edge | Compatibility | Member | 1. Kiểm tra các trang chính trên Chromium | Hoạt động mượt mà, đầy đủ tính năng | **P0** | Manual | `None` | **Not run** | Chưa chạy |
| `TC-CMP-002` | Xử lý khi trình duyệt tắt LocalStorage (Incognito / Disabled) | Compatibility | Member | 1. Chặn LocalStorage trong Browser settings<br/>2. Mở ứng dụng | Code có bọc try/catch bỏ qua lưu trữ an toàn, không làm crash toàn trang | **P1** | Auto-safe | `None` | **Pass** | lectures-core.js:132 và practice-core.js:46 có try/catch an toàn |

---

## MODULE: LECTURES (8 Test Cases)

| TC_ID | Chức năng | Loại | Vai trò | Các bước thực hiện | Kết quả mong đợi | Ưu tiên | Cách chạy | Finding | Trạng thái | Kết quả thực tế |
|:---|:---|:---:|:---:|:---|:---|:---:|:---:|:---:|:---:|:---|
| `TC-LMS-023` | Xử lý video bài giảng biên 23 | Boundary | Member | 1. Tua liên tục thanh seekbar của video 10 lần trong 2 giây<br/>2. Kiểm tra lưu trữ mốc xem | Hàm debounce 800ms hoạt động tốt, không làm nghẽn localStorage | **P2** | Manual | `None` | **Not run** | Chưa chạy |
| `TC-LMS-024` | Xử lý video bài giảng biên 24 | Boundary | Member | 1. Tua liên tục thanh seekbar của video 10 lần trong 2 giây<br/>2. Kiểm tra lưu trữ mốc xem | Hàm debounce 800ms hoạt động tốt, không làm nghẽn localStorage | **P2** | Manual | `None` | **Not run** | Chưa chạy |
| `TC-LMS-025` | Xử lý video bài giảng biên 25 | Boundary | Member | 1. Tua liên tục thanh seekbar của video 10 lần trong 2 giây<br/>2. Kiểm tra lưu trữ mốc xem | Hàm debounce 800ms hoạt động tốt, không làm nghẽn localStorage | **P2** | Manual | `None` | **Not run** | Chưa chạy |
| `TC-LMS-026` | Xử lý video bài giảng biên 26 | Boundary | Member | 1. Tua liên tục thanh seekbar của video 10 lần trong 2 giây<br/>2. Kiểm tra lưu trữ mốc xem | Hàm debounce 800ms hoạt động tốt, không làm nghẽn localStorage | **P2** | Manual | `None` | **Not run** | Chưa chạy |
| `TC-LMS-027` | Xử lý video bài giảng biên 27 | Boundary | Member | 1. Tua liên tục thanh seekbar của video 10 lần trong 2 giây<br/>2. Kiểm tra lưu trữ mốc xem | Hàm debounce 800ms hoạt động tốt, không làm nghẽn localStorage | **P2** | Manual | `None` | **Not run** | Chưa chạy |
| `TC-LMS-028` | Xử lý video bài giảng biên 28 | Boundary | Member | 1. Tua liên tục thanh seekbar của video 10 lần trong 2 giây<br/>2. Kiểm tra lưu trữ mốc xem | Hàm debounce 800ms hoạt động tốt, không làm nghẽn localStorage | **P2** | Manual | `None` | **Not run** | Chưa chạy |
| `TC-LMS-029` | Xử lý video bài giảng biên 29 | Boundary | Member | 1. Tua liên tục thanh seekbar của video 10 lần trong 2 giây<br/>2. Kiểm tra lưu trữ mốc xem | Hàm debounce 800ms hoạt động tốt, không làm nghẽn localStorage | **P2** | Manual | `None` | **Not run** | Chưa chạy |
| `TC-LMS-030` | Xử lý video bài giảng biên 30 | Boundary | Member | 1. Tua liên tục thanh seekbar của video 10 lần trong 2 giây<br/>2. Kiểm tra lưu trữ mốc xem | Hàm debounce 800ms hoạt động tốt, không làm nghẽn localStorage | **P2** | Manual | `None` | **Not run** | Chưa chạy |

---

