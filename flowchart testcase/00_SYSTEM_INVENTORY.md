# KIỂM KÊ TOÀN DIỆN HỆ THỐNG (00_SYSTEM_INVENTORY.md) (v2 cập nhật)

**Dự án:** 9-5-ai-library  
**Phiên bản tài liệu:** v2 (Cập nhật sau đợt vá bảo mật & kiểm thử v2)  
**Thời điểm khảo sát:** 22/10/2026  
**Chế độ khảo sát:** Dựa trên CODE VÀ DỮ LIỆU THẬT của dự án  

---

## 1. DANH MỤC TRANG GIAO DIỆN HTML

Dưới đây là bảng thống kê toàn bộ 28 trang HTML của hệ thống (bao gồm các trang chính, các trang con theo module và trang công cụ):

| STT | Đường dẫn tương đối | Mục đích / Chức năng | Vai trò truy cập (Kỳ vọng) | Script chính | CSS chính |
|:---:|:---|:---|:---|:---|:---|
| 1 | `index.html` | Cổng thông tin trang chủ chính thức, giới thiệu câu lạc bộ, hiển thị tổng quan môn học, sự kiện, chặn truy cập khi chưa đăng nhập | Guest, Member, Staff, Admin, Owner | `js/theme-init.js`, `js/auth-guard.js`, `js/main.js` | `css/home_page.css`, `css/auth-guard.css`, `css/theme-tokens.css` |
| 2 | `home_page/home_page.html` | Dashboard trang chủ sau đăng nhập của học viên: "Your subjects", tiến độ học tập, thông báo, phím tắt nhanh | Member, Staff, Admin, Owner | `js/theme-init.js`, `home_page/home_page.js`, `js/syncProfile.js`, `js/notifications-bell.js` | `css/home_page.css`, `css/theme-tokens.css`, `css/site-branding.css` |
| 3 | `pages/favorites.html` | Danh mục yêu thích tổng hợp: Môn học bài giảng, Môn thực hành và Tài liệu tài nguyên đã lưu | Member, Staff, Admin, Owner | `js/theme-init.js`, `js/favorites-logic.js`, `js/favorites-ui.js`, `js/syncProfile.js`, `js/notifications-bell.js` | `css/favorites.css`, `css/theme-tokens.css` |
| 4 | `pages/history.html` | Lịch sử học tập: Lịch sử làm trắc nghiệm (quiz attempts), xem lại bài thi, nhật ký ghi chú bài học | Member, Staff, Admin, Owner | `js/theme-init.js`, `js/history.js`, `js/practice-core.js`, `js/syncProfile.js`, `js/notifications-bell.js` | `css/history.css`, `css/theme-tokens.css` |
| 5 | `pages/admin/admin.html` | Cổng quản trị hợp nhất: Quản lý người dùng, LMS bài giảng (file/YouTube), Kiểm duyệt nội dung (báo cáo vi phạm), Cài đặt hệ thống | Staff, Admin, Owner | `js/theme-init.js`, `js/admin.js`, `js/admin-users.js`, `js/admin-lms.js`, `js/admin-dashboard.js`, `js/admin-moderation.js`, `js/admin-settings.js`, `js/notifications-bell.js` | `css/admin.css`, `css/theme-tokens.css` |
| 6 | `pages/auth/login.html` | Đăng nhập tài khoản bằng Username/Email và Password | Guest | `js/theme-init.js`, `js/login.js`, `js/auth.js` | `css/login.css`, `css/theme-tokens.css` |
| 7 | `pages/auth/signup.html` | Đăng ký tài khoản mới (Họ tên, Username/Email, Mật khẩu, Xác nhận mật khẩu) | Guest | `js/theme-init.js`, `js/login.js`, `js/auth.js` | `css/signup.css`, `css/theme-tokens.css` |
| 8 | `pages/auth/forgot_pass.html` | Giao diện gửi link khôi phục mật khẩu qua Email (Hiện tại là UI tĩnh) | Guest | `js/theme-init.js`, `js/login.js` | `css/reset_pass.css`, `css/theme-tokens.css` |
| 9 | `pages/auth/reset_pass.html` | Giao diện đặt lại mật khẩu mới với token (Hiện tại là UI tĩnh) | Guest | `js/theme-init.js`, `js/login.js` | `css/reset_pass.css`, `css/theme-tokens.css` |
| 10 | `pages/auth/send_email.html` | Giao diện thông báo đã gửi email xác nhận đặt lại mật khẩu (UI tĩnh) | Guest | `js/theme-init.js` | `css/send_email.css`, `css/theme-tokens.css` |
| 11 | `pages/community/community-feed.html` | Bảng tin cộng đồng (Newsfeed): Đăng bài, bình luận, like, bình chọn (poll), chia sẻ link/ảnh | Member, Staff, Admin, Owner | `js/theme-init.js`, `js/community-core.js`, `js/community-feed.js`, `js/community-interactions.js`, `js/community-report.js`, `js/syncProfile.js`, `js/notifications-bell.js` | `css/community.css`, `css/theme-tokens.css` |
| 12 | `pages/community/community-discussions.html` | Diễn đàn thảo luận theo chủ đề, lọc theo tag học tập | Member, Staff, Admin, Owner | `js/theme-init.js`, `js/community-core.js`, `js/community-nav.js`, `js/syncProfile.js`, `js/notifications-bell.js` | `css/community.css`, `css/theme-tokens.css` |
| 13 | `pages/community/community-groups.html` | Danh sách nhóm học tập cộng đồng, tạo nhóm và tham gia nhóm | Member, Staff, Admin, Owner | `js/theme-init.js`, `js/community-core.js`, `js/community-groups.js`, `js/syncProfile.js`, `js/notifications-bell.js` | `css/community.css`, `css/theme-tokens.css` |
| 14 | `pages/community/community-leaderboard.html` | Bảng xếp hạng thành viên tích cực (bài viết, bình luận, lượt thích) | Member, Staff, Admin, Owner | `js/theme-init.js`, `js/community-core.js`, `js/community-leaderboard.js`, `js/syncProfile.js`, `js/notifications-bell.js` | `css/community.css`, `css/theme-tokens.css` |
| 15 | `pages/community/community-notifications.html` | Trang trung tâm thông báo toàn màn hình (tab Tất cả, Chưa đọc, Đã ghim) | Member, Staff, Admin, Owner | `js/theme-init.js`, `js/community-core.js`, `js/community-notifications.js`, `js/syncProfile.js`, `js/notifications-bell.js` | `css/community.css`, `css/theme-tokens.css` |
| 16 | `pages/community/community-search.html` | Tìm kiếm bài viết, tác giả và thẻ thảo luận trong cộng đồng | Member, Staff, Admin, Owner | `js/theme-init.js`, `js/community-core.js`, `js/community-nav.js`, `js/syncProfile.js`, `js/notifications-bell.js` | `css/community.css`, `css/theme-tokens.css` |
| 17 | `pages/community/discussion-detail.html` | Chi tiết một chủ đề thảo luận và danh sách phản hồi (replies) | Member, Staff, Admin, Owner | `js/theme-init.js`, `js/community-core.js`, `js/community-nav.js`, `js/community-report.js`, `js/syncProfile.js`, `js/notifications-bell.js` | `css/community.css`, `css/theme-tokens.css` |
| 18 | `pages/lectures/lectures.html` | Danh mục toàn bộ khoá học / bài giảng video (LMS) | Member, Staff, Admin, Owner | `js/theme-init.js`, `js/lectures-core.js`, `js/lectures-list.js`, `js/syncProfile.js`, `js/notifications-bell.js` | `css/lectures.css`, `css/theme-tokens.css` |
| 19 | `pages/lectures/lecture.html` | Trình phát bài giảng (Video player tự dựng / YouTube iframe), ghi chú học tập, tài liệu đính kèm, bình luận bài giảng | Member, Staff, Admin, Owner | `js/theme-init.js`, `js/lectures-core.js`, `js/lecture-player.js`, `js/lecture-notes.js`, `js/syncProfile.js`, `js/notifications-bell.js` | `css/lectures.css`, `css/theme-tokens.css` |
| 20 | `pages/lectures/next-lectures.html` | Danh sách bài giảng tiếp theo chưa hoàn thành trong môn học | Member, Staff, Admin, Owner | `js/theme-init.js`, `js/lectures-core.js`, `js/lectures-list.js`, `js/syncProfile.js`, `js/notifications-bell.js` | `css/lectures.css`, `css/theme-tokens.css` |
| 21 | `pages/lectures/resources.html` | Thư viện tài nguyên & tài liệu học tập tải lên (PDF, DOCX, ZIP, PY...), xem trước, tải về, yêu thích | Member, Staff, Admin, Owner | `js/theme-init.js`, `js/resources.js`, `js/syncProfile.js`, `js/notifications-bell.js` | `css/resources.css`, `css/theme-tokens.css` |
| 22 | `pages/lectures/subject.html` | Trang chi tiết môn học bài giảng: lộ trình các chương, tỷ lệ hoàn thành | Member, Staff, Admin, Owner | `js/theme-init.js`, `js/lectures-core.js`, `js/lectures-list.js`, `js/syncProfile.js`, `js/notifications-bell.js` | `css/lectures.css`, `css/theme-tokens.css` |
| 23 | `pages/practice/practice.html` | Trang chủ trắc nghiệm thực hành: Danh sách 7 môn, số đề thi, tìm kiếm | Member, Staff, Admin, Owner | `js/theme-init.js`, `js/practice-core.js`, `js/practice-list.js`, `js/syncProfile.js`, `js/notifications-bell.js` | `css/practice.css`, `css/theme-tokens.css` |
| 24 | `pages/practice/practice-subject.html` | Danh sách các đề trắc nghiệm (quizzes) theo môn học đã chọn | Member, Staff, Admin, Owner | `js/theme-init.js`, `js/practice-core.js`, `js/practice-list.js`, `js/syncProfile.js`, `js/notifications-bell.js` | `css/practice.css`, `css/theme-tokens.css` |
| 25 | `pages/practice/practice-quiz-intro.html` | Màn hình chuẩn bị trước khi thi (số câu, thời gian, quy chế, nút bắt đầu) | Member, Staff, Admin, Owner | `js/theme-init.js`, `js/practice-core.js`, `js/practice-list.js`, `js/syncProfile.js`, `js/notifications-bell.js` | `css/practice.css`, `css/theme-tokens.css` |
| 26 | `pages/practice/practice-quiz.html` | Giao diện phòng thi trắc nghiệm: Đếm ngược thời gian, thẻ câu hỏi, MathJax LaTeX, nộp bài | Member, Staff, Admin, Owner | `js/theme-init.js`, `js/practice-core.js`, `js/practice-quiz.js`, `js/mathjax-config.js` | `css/practice.css`, `css/theme-tokens.css` |
| 27 | `pages/practice/practice-result.html` | Kết quả thi trắc nghiệm: Điểm số, tỷ lệ đúng, bảng xem lại từng câu kèm lời giải chi tiết | Member, Staff, Admin, Owner | `js/theme-init.js`, `js/practice-core.js`, `js/practice-quiz.js`, `js/mathjax-config.js` | `css/practice.css`, `css/theme-tokens.css` |
| 28 | `pages/settings/settings.html` | Cài đặt cá nhân: Hồ sơ (Avatar crop), Tài khoản (đổi mật khẩu, xoá tài khoản), Giao diện (Theme, Accent, Font), Thông báo, Quyền riêng tư | Member, Staff, Admin, Owner | `js/theme-init.js`, `js/settings-core.js`, `js/settings-profile.js`, `js/settings-account.js`, `js/settings-appearance.js`, `js/settings-preferences.js`, `js/settings-data.js`, `js/settings-support.js`, `js/syncProfile.js`, `js/notifications-bell.js` | `css/settings.css`, `css/theme-tokens.css` |

---

## 2. VAI TRÒ VÀ MA TRẬN PHÂN QUYỀN HỆ THỐNG

### 2.1. Danh mục vai trò (Roles) và Trạng thái (Statuses)
- **Vai trò trong Database (ENUM `users.role`):** `'owner'`, `'admin'`, `'staff'`, `'member'`.
- **Vai trò khách (Guest):** Trạng thái truy cập khi chưa có JWT token trong header hoặc `localStorage.getItem('token')` rỗng.
- **Trạng thái tài khoản (ENUM `users.status`):**
  - `'pending'`: Tài khoản mới đăng ký, chờ quản trị viên phê duyệt (bị chặn đăng nhập tại `backend/controllers/authController.js:25-27`).
  - `'active'`: Tài khoản đang hoạt động bình thường, được cấp token khi đăng nhập.
  - `'banned'`: Tài khoản bị khoá vi phạm, bị chặn đăng nhập tại backend (`authController.js:28-30`), bị chặn đăng bài (`authMiddleware.js:61-63`) và hiển thị overlay chặn tại client (`js/syncProfile.js:148-202`).

### 2.2. Ma trận quyền hạn chi tiết (Đối chiếu giữa Backend Middleware và Frontend UI) (v2 cập nhật)

| Tính năng / Hành động | Guest | Member | Staff | Admin | Owner | Middleware Backend bảo vệ | Điều kiện Frontend | Ghi chú cập nhật v2 |
|:---|:---:|:---:|:---:|:---:|:---:|:---|:---|:---|
| Xem trang chủ `index.html` | ✅ | ✅ | ✅ | ✅ | ✅ | Không có (Static Whitelist) | Không chặn | Đã whitelist static route |
| Xem bảng tin cộng đồng (Public Feed) | ❌ | ✅ | ✅ | ✅ | ✅ | `verifyToken` (`communityRoutes.js`) | Redirect nếu chưa đăng nhập | Realtime ban check trong verifyToken |
| Đăng bài viết cộng đồng (Post/Poll/Link) | ❌ | ✅ | ✅ | ✅ | ✅ | `verifyToken`, `canWriteCommunity` | Cần `token` và `status === 'active'` | Chặn Banned/Pending |
| Sửa bài viết cộng đồng của chính mình | ❌ | ✅ | ✅ | ✅ | ✅ | `verifyToken`, `communityController.updatePost` | Kiểm tra `post.user_id === user.id` | |
| Sửa bài viết cộng đồng của người khác | ❌ | ❌ | ❌ | ❌ | ❌ | Bị chặn (Chỉ tác giả mới được sửa nội dung) | Nút Edit chỉ hiện cho tác giả | |
| Xoá bài viết cộng đồng của chính mình | ❌ | ✅ | ✅ | ✅ | ✅ | `verifyToken`, `communityController.deletePost` | Kiểm tra `post.user_id === user.id` | |
| Xoá bài viết cộng đồng của người khác | ❌ | ❌ | ❌ | ✅ | ✅ | `verifyToken`, `communityController.deletePost` | Kiểm tra `['admin', 'owner'].includes(user.role)` | |
| Bình luận bài viết cộng đồng | ❌ | ✅ | ✅ | ✅ | ✅ | `verifyToken`, `canWriteCommunity` | Form bình luận yêu cầu đăng nhập | |
| Xoá bình luận cộng đồng của người khác | ❌ | ❌ | ❌ | ✅ | ✅ | `verifyToken`, `communityController.deleteComment` | Kiểm tra `['admin', 'owner'].includes(user.role)` | |
| Ghim bài viết cộng đồng (`is_pinned`) | ❌ | ❌ | ❌ | ✅ | ✅ | `verifyToken`, `isAdminOrOwner` | Menu `⋯` chỉ hiển thị nút Pin cho Admin/Owner | |
| Tạo nhóm cộng đồng (`community_groups`) | ❌ | ❌ | ✅ | ✅ | ✅ | `verifyToken`, `isStaffAdminOwner` | Nút "Create Group" ẩn với Member | |
| Tham gia / Rời nhóm cộng đồng | ❌ | ✅ | ✅ | ✅ | ✅ | `verifyToken` | Member được phép tham gia | |
| Xem video bài giảng (Streaming) | ⚠️ (1) | ✅ | ✅ | ✅ | ✅ | Không có (Static Whitelist Mount) | Auth-guard chặn click ở `index.html` | Stream Range 206 |
| Đăng bình luận bài giảng (`lecture_comments`) | ❌ | ✅ | ✅ | ✅ | ✅ | `verifyToken` (`lmsRoutes.js`) | Bắt buộc Token, toast thông báo nếu chưa đăng nhập | **(v2) Đã vá F-002: Bắt buộc verifyToken, sanitize DOM** |
| Tải video bài giảng mới (Upload MP4/MOV) | ❌ | ❌ | ✅ | ✅ | ✅ | `verifyToken`, `isStaffAdminOwner` | Chỉ có trong trang `admin.html` | |
| Thêm bài giảng YouTube (oEmbed) | ❌ | ❌ | ✅ | ✅ | ✅ | `verifyToken`, `isStaffAdminOwner` | Chỉ có trong trang `admin.html` | |
| Làm bài trắc nghiệm (Practice Quiz) | ❌ | ✅ | ✅ | ✅ | ✅ | Không có (Chạy ở Client qua `practice-data.js`) | Auth-guard chặn click ở `index.html` | Làm sạch 39 câu lỗi |
| Tải tài liệu học tập lên (`resources`) | ❌ | ✅ | ✅ | ✅ | ✅ | `verifyToken` (`resourceRoutes.js:63`) | Bất kỳ thành viên đăng nhập nào cũng upload được | |
| Xoá tài liệu học tập của người khác | ❌ | ❌ | ❌ | ✅ | ✅ | `verifyToken`, `resourceController.deleteResource` | Kiểm tra `['admin', 'owner'].includes(user.role)` | |
| Xem trang Quản trị (`admin.html`) | ❌ | ❌ | ✅ | ✅ | ✅ | `verifyToken`, `isStaffAdminOwner` cho các API dữ liệu | Frontend redirect về index nếu 401/403 | |
| Xem danh sách người dùng & Audit Log | ❌ | ❌ | ✅ | ✅ | ✅ | `verifyToken`, `isStaffAdminOwner` (`adminRoutes.js:9,15`) | Tab Users và Dashboard hiển thị cho Staff+ | |
| Đổi vai trò / trạng thái thành viên | ❌ | ❌ | ❌ | ⚠️ (2) | ✅ | `verifyToken`, `isAdminOrOwner` (`adminRoutes.js:12`) | **(v2) Đã vá F-003: Thứ bậc nghiêm ngặt (Owner > Admin > Staff > Member)** | Admin không thể sửa Owner, không thể gán quyền Owner |
| Xử lý báo cáo vi phạm (Hide/Dismiss/Delete) | ❌ | ❌ | ❌ | ✅ | ✅ | `verifyToken`, `isAdminOrOwner` (`moderationRoutes.js:10`) | Tab Moderation chỉ xử lý được bởi Admin/Owner | |
| Đổi cấu hình hệ thống (`site_settings`) | ❌ | ❌ | ❌ | ❌ | ✅ | `verifyToken`, `isOwner` (`settingsRoutes.js:58,66,71`) | Nút Save Settings chỉ có tác dụng với Owner | |
| Tự xoá tài khoản cá nhân (`DELETE /api/users/me`) | ❌ | ✅ | ✅ | ✅ | ✅ | `verifyToken` (`userRoutes.js:9`) | **(v2) Đã vá F-004: Modal xác nhận mật khẩu & username** | Bắt buộc bcrypt xác thực mật khẩu cũ |

*(1) Ghi chú: File video bài giảng được phục vụ qua Whitelist Static Mount (`/document/Lectures`) với hỗ trợ HTTP Range 206 Partial Content.*  
*(2) Ghi chú thứ bậc v2 (F-003): Admin chỉ được thao tác trên tài khoản cấp thấp hơn mình (Staff, Member). Mọi thao tác của Admin lên Owner hoặc gán role Owner đều bị chặn với HTTP 403 Forbidden.*

---

## 3. DANH MỤC TOÀN BỘ ENDPOINT BACKEND (80 ENDPOINTS)

Dưới đây là bảng thống kê toàn bộ 80 endpoint backend trong 10 file định tuyến (`backend/routes/`):

| STT | Phương thức | Đường dẫn API | Middleware bảo mật | Controller xử lý | Bảng CSDL chạm tới |
|:---:|:---:|:---|:---|:---|:---|
| 1 | POST | `/api/auth/login` | `rateLimiter` (10 req/15m - v2) | `authController.login` | `users`, `site_settings`, `user_activity_daily` |
| 2 | POST | `/api/auth/register` | Không | `authController.register` | `users`, `site_settings` |
| 3 | GET | `/api/users/me` | `verifyToken` (Realtime status check v2) | `userController.getCurrentUser` | `users` |
| 4 | PUT | `/api/users/profile` | `verifyToken` | `userController.updateProfile` | `users` |
| 5 | PUT | `/api/users/change-password` | `verifyToken` | `userController.changePassword` | `users` |
| 6 | DELETE | `/api/users/me` | `verifyToken` (Xác nhận pass + username v2) | `userController.deleteAccount` | `users` (Cascade xoá các bảng liên quan) |
| 7 | POST | `/api/users/support` | Không bắt buộc | `userController.submitSupportTicket` | Không lưu DB (Log console) |
| 8 | GET | `/api/admin/users` | `verifyToken`, `isStaffAdminOwner` | `adminController.getAllUsers` | `users` |
| 9 | PUT | `/api/admin/users/:id` | `verifyToken`, `isAdminOrOwner` (Hierarchy check v2) | `adminController.updateUser` | `users`, `audit_logs` |
| 10 | GET | `/api/admin/audit` | `verifyToken`, `isStaffAdminOwner` | Inline handler (`getAuditLogs`) | `audit_logs`, `users` |
| 11 | GET | `/api/admin/dashboard` | `verifyToken`, `isStaffAdminOwner` | `dashboardController.getDashboardStats` | `users`, `community_posts`, `community_comments`, `resources`, `lectures`, `user_activity_daily`, `audit_logs` |
| 12 | GET | `/api/admin/activity` | `verifyToken`, `isStaffAdminOwner` | `dashboardController.getActivityBreakdown` | `user_activity_daily`, `users` |
| 13 | GET | `/api/admin/reports` | `verifyToken`, `isAdminOrOwner` | `moderationController.getReports` | `community_reports`, `users`, `community_posts`, `community_comments`, `community_discussions`, `community_discussion_replies` |
| 14 | PUT | `/api/admin/reports/:id` | `verifyToken`, `isAdminOrOwner` | `moderationController.handleReport` | `community_reports`, `community_posts`, `community_comments`, `community_discussions`, `community_discussion_replies`, `audit_logs` |
| 15 | GET | `/api/settings/public` | Không | `settingsController.getPublicSettings` | `site_settings` |
| 16 | GET | `/api/admin/settings` | `verifyToken`, `isStaffAdminOwner` | `settingsController.getAllSettings` | `site_settings` |
| 17 | PUT | `/api/admin/settings` | `verifyToken`, `isOwner` | `settingsController.updateSettings` | `site_settings`, `audit_logs` |
| 18 | POST | `/api/admin/settings/branding/:kind` | `verifyToken`, `isOwner`, `upload.single` | `settingsController.uploadBranding` | `site_settings`, `audit_logs` |
| 19 | DELETE | `/api/admin/settings/branding/:kind` | `verifyToken`, `isOwner` | `settingsController.resetBranding` | `site_settings`, `audit_logs` |
| 20 | GET | `/api/lms/courses` | Không | `lmsController.getAllCourses` | `courses`, `lectures` |
| 21 | GET | `/api/lms/courses/:id` | Không | `lmsController.getCourseById` | `courses`, `lectures` |
| 22 | POST | `/api/lms/courses` | `verifyToken`, `isStaffAdminOwner` | `lmsController.createCourse` | `courses` |
| 23 | PUT | `/api/lms/courses/:id` | `verifyToken`, `isStaffAdminOwner` | `lmsController.updateCourse` | `courses` |
| 24 | DELETE | `/api/lms/courses/:id` | `verifyToken`, `isStaffAdminOwner` | `lmsController.deleteCourse` | `courses`, `lectures` |
| 25 | GET | `/api/lms/courses/:courseId/lectures` | Không | `lmsController.getCourseLectures` | `lectures` |
| 26 | GET | `/api/lms/lectures/:id` | Không | `lmsController.getLectureDetail` | `lectures`, `courses`, `lecture_resources`, `lecture_comments` |
| 27 | POST | `/api/lms/courses/:courseId/lectures` | `verifyToken`, `isStaffAdminOwner` | `lmsController.createLecture` | `lectures` |
| 28 | POST | `/api/lms/lectures` | `verifyToken`, `isStaffAdminOwner` | `lmsController.createLecture` | `lectures` |
| 29 | PUT | `/api/lms/lectures/:id` | `verifyToken`, `isStaffAdminOwner` | `lmsController.updateLecture` | `lectures` |
| 30 | DELETE | `/api/lms/lectures/:id` | `verifyToken`, `isStaffAdminOwner` | `lmsController.deleteLecture` | `lectures`, `lecture_resources`, `lecture_comments` |
| 31 | GET | `/api/lms/youtube-info` | `verifyToken`, `isStaffAdminOwner` | Inline handler (Fetch oEmbed) | Không chạm DB (Gọi YouTube oEmbed) |
| 32 | POST | `/api/lms/upload-video` | `verifyToken`, `isStaffAdminOwner`, `upload.single` | Inline handler (`applyFastStart`, `ffprobe`) | Hệ thống tệp đĩa (`document/Lectures/Uploads/`) |
| 33 | GET | `/api/lms/browse-videos` | `verifyToken`, `isStaffAdminOwner` | `lmsController.browseLocalVideos` | Hệ thống tệp đĩa (`document/Lectures/`) |
| 34 | GET | `/api/lms/lectures/:lectureId/comments` | Không | `lmsController.getComments` | `lecture_comments` |
| 35 | POST | `/api/lms/lectures/:lectureId/comments` | `verifyToken` (Bắt buộc Token v2) | `lmsController.addComment` | `lecture_comments` |
| 36 | DELETE | `/api/lms/comments/:commentId` | `verifyToken` | `lmsController.deleteComment` | `lecture_comments` |
| 37 | POST | `/api/community/upload-image` | `verifyToken`, `canWriteCommunity`, `upload.single` | `communityController.uploadImage` | Hệ thống tệp đĩa (`assets/uploads/community/`) |
| 38 | GET | `/api/community/posts` | `verifyToken` | `communityController.getAllPosts` | `community_posts`, `users`, `community_likes`, `community_comments`, `community_post_tags`, `community_poll_options`, `community_poll_votes` |
| 39 | POST | `/api/community/posts` | `verifyToken`, `canWriteCommunity` | `communityController.createPost` | `community_posts`, `community_post_tags`, `community_poll_options`, `community_notifications`, `users` |
| 40 | PUT | `/api/community/posts/:id/pin` | `verifyToken`, `isAdminOrOwner` | `communityController.togglePinPost` | `community_posts` |
| 41 | PUT | `/api/community/posts/:id` | `verifyToken`, `canWriteCommunity` | `communityController.updatePost` | `community_posts`, `community_post_tags` |
| 42 | DELETE | `/api/community/posts/:id` | `verifyToken` | `communityController.deletePost` | `community_posts`, `community_comments`, `community_likes`, `community_notifications`, `community_post_tags`, `community_poll_options`, `community_poll_votes` |
| 43 | POST | `/api/community/posts/:id/like` | `verifyToken`, `canWriteCommunity` | `communityController.toggleLike` | `community_likes`, `community_posts`, `community_notifications` |
| 44 | GET | `/api/community/posts/:id/comments` | `verifyToken` | `communityController.getComments` | `community_comments`, `users` |
| 45 | POST | `/api/community/posts/:id/comments` | `verifyToken`, `canWriteCommunity` | `communityController.addComment` | `community_comments`, `community_posts`, `community_notifications` |
| 46 | DELETE | `/api/community/comments/:id` | `verifyToken` | `communityController.deleteComment` | `community_comments` |
| 47 | POST | `/api/community/posts/:id/vote` | `verifyToken`, `canWriteCommunity` | `communityController.votePoll` | `community_poll_votes`, `community_poll_options`, `community_posts` |
| 48 | GET | `/api/community/trending` | `verifyToken` | `communityController.getTrendingTags` | `community_post_tags`, `community_posts` |
| 49 | GET | `/api/community/top-contributors` | `verifyToken` | `communityController.getTopContributors` | `users`, `community_posts`, `community_comments`, `community_likes` |
| 50 | GET | `/api/community/discussions` | `verifyToken` | `communityController.getAllDiscussions` | `community_discussions`, `users`, `community_discussion_replies` |
| 51 | GET | `/api/community/discussions/:id` | `verifyToken` | `communityController.getDiscussionById` | `community_discussions`, `users`, `community_discussion_replies` |
| 52 | POST | `/api/community/discussions` | `verifyToken`, `canWriteCommunity` | `communityController.createDiscussion` | `community_discussions`, `community_notifications`, `users` |
| 53 | POST | `/api/community/discussions/:id/replies` | `verifyToken`, `canWriteCommunity` | `communityController.addDiscussionReply` | `community_discussion_replies`, `community_discussions`, `community_notifications` |
| 54 | DELETE | `/api/community/discussions/replies/:replyId` | `verifyToken` | `communityController.deleteDiscussionReply` | `community_discussion_replies` |
| 55 | DELETE | `/api/community/discussions/:id` | `verifyToken` | `communityController.deleteDiscussion` | `community_discussions`, `community_discussion_replies` |
| 56 | GET | `/api/community/groups` | `verifyToken` | `communityController.getAllGroups` | `community_groups`, `community_group_members` |
| 57 | POST | `/api/community/groups` | `verifyToken`, `isStaffAdminOwner` | `communityController.createGroup` | `community_groups`, `community_group_members` |
| 58 | GET | `/api/community/groups/:id` | `verifyToken` | `communityController.getGroupById` | `community_groups`, `community_group_members`, `users` |
| 59 | POST | `/api/community/groups/:id/join` | `verifyToken`, `canWriteCommunity` | `communityController.joinGroup` | `community_group_members`, `community_groups` |
| 60 | POST | `/api/community/groups/:id/leave` | `verifyToken` | `communityController.leaveGroup` | `community_group_members`, `community_groups` |
| 61 | GET | `/api/community/leaderboard` | `verifyToken` | `communityController.getLeaderboard` | `users`, `community_posts`, `community_comments`, `community_likes` |
| 62 | GET | `/api/community/notifications/unread-count` | `verifyToken` | `communityController.getUnreadCount` | `community_notifications` |
| 63 | GET | `/api/community/notifications` | `verifyToken` | `communityController.getNotifications` | `community_notifications`, `users`, `community_posts`, `lectures`, `resources` |
| 64 | POST | `/api/community/notifications/read-all` | `verifyToken` | `communityController.markAllNotificationsRead` | `community_notifications` |
| 65 | POST | `/api/community/notifications/:id/read` | `verifyToken` | `communityController.markNotificationRead` | `community_notifications` |
| 66 | GET | `/api/community/search` | `verifyToken` | `communityController.searchCommunity` | `community_posts`, `community_discussions`, `users` |
| 67 | POST | `/api/community/report` | `verifyToken`, `canWriteCommunity` | `communityController.createReport` | `community_reports` |
| 68 | GET | `/api/favorites` | `verifyToken` | `favoriteController.getFavorites` | `user_favorites`, `courses`, `lectures`, `resource_favorites`, `resources`, `users` |
| 69 | POST | `/api/favorites/toggle` | `verifyToken` | `favoriteController.toggleFavorite` | `user_favorites`, `resource_favorites`, `courses`, `resources` |
| 70 | GET | `/api/resources/stats` | `verifyToken` | `resourceController.getStats` | `resources`, `resource_favorites` |
| 71 | GET | `/api/resources/recent` | `verifyToken` | `resourceController.getRecent` | `resources`, `users`, `resource_favorites` |
| 72 | GET | `/api/resources/favorites` | `verifyToken` | `resourceController.getFavorites` | `resource_favorites`, `resources`, `users` |
| 73 | GET | `/api/resources` | `verifyToken` | `resourceController.getAllResources` | `resources`, `users`, `resource_favorites` |
| 74 | POST | `/api/resources` | `verifyToken`, `uploadSingle` | `resourceController.createResource` | `resources`, `community_notifications`, `users` |
| 75 | GET | `/api/resources/:id` | `verifyToken` | `resourceController.getResourceById` | `resources`, `users`, `resource_favorites` |
| 76 | GET | `/api/resources/:id/preview` | `verifyToken` | `resourceController.previewResource` | `resources`, Hệ thống tệp đĩa (`backend/storage/resources/`) |
| 77 | GET | `/api/resources/:id/download` | `verifyToken` | `resourceController.downloadResource` | `resources`, Hệ thống tệp đĩa (`backend/storage/resources/`) |
| 78 | PUT | `/api/resources/:id` | `verifyToken` | `resourceController.updateResource` | `resources` |
| 79 | DELETE | `/api/resources/:id` | `verifyToken` | `resourceController.deleteResource` | `resources`, `resource_favorites`, Hệ thống tệp đĩa |
| 80 | POST | `/api/resources/:id/favorite` | `verifyToken` | `resourceController.toggleFavorite` | `resource_favorites`, `resources` |

---

## 4. BẢNG CƠ SỞ DỮ LIỆU MYSQL (23 BẢNG)

| STT | Tên bảng | Số dòng thực tế | Khoá chính (PK) | Khoá ngoại (FK) và Ràng buộc xoá | Các chỉ mục (Indexes) chính |
|:---:|:---|:---:|:---|:---|:---|
| 1 | `users` | 5 | `id` (AUTO_INCREMENT) | Không có | `PRIMARY`, `UNIQUE (username)` |
| 2 | `courses` | 2 | `id` (AUTO_INCREMENT) | Không có | `PRIMARY`, `UNIQUE (code)` |
| 3 | `lectures` | 3 | `id` (AUTO_INCREMENT) | `fk_lecture_course` -> `courses(id)` ON DELETE CASCADE | `PRIMARY`, `INDEX (course_id)` |
| 4 | `lecture_resources` | 2 | `id` (AUTO_INCREMENT) | `fk_lec_res_lecture` -> `lectures(id)` ON DELETE CASCADE | `PRIMARY`, `INDEX (lecture_id)` |
| 5 | `lecture_comments` | 2 | `id` (AUTO_INCREMENT) | `fk_lec_cmt_lecture` -> `lectures(id)` ON DELETE CASCADE | `PRIMARY`, `INDEX (lecture_id)`, `INDEX (created_at)` |
| 6 | `community_posts` | 21 | `id` (AUTO_INCREMENT) | `fk_com_posts_user` -> `users(id)` ON DELETE CASCADE, `fk_com_posts_pinned_by` -> `users(id)` ON DELETE SET NULL | `PRIMARY`, `INDEX (user_id)`, `INDEX (created_at)`, `INDEX (is_pinned)` |
| 7 | `community_post_tags` | 29 | `(post_id, tag)` | `fk_com_post_tags_post` -> `community_posts(id)` ON DELETE CASCADE | `PRIMARY (post_id, tag)`, `INDEX (tag)` |
| 8 | `community_comments` | 4 | `id` (AUTO_INCREMENT) | `fk_com_comments_post` -> `community_posts(id)` ON DELETE CASCADE, `fk_com_comments_user` -> `users(id)` ON DELETE CASCADE | `PRIMARY`, `INDEX (post_id)`, `INDEX (user_id)` |
| 9 | `community_likes` | 6 | `(post_id, user_id)` | `fk_com_likes_post` -> `community_posts(id)` ON DELETE CASCADE, `fk_com_likes_user` -> `users(id)` ON DELETE CASCADE | `PRIMARY (post_id, user_id)` |
| 10 | `community_poll_options` | 11 | `id` (AUTO_INCREMENT) | `fk_com_poll_opt_post` -> `community_posts(id)` ON DELETE CASCADE | `PRIMARY`, `INDEX (post_id)` |
| 11 | `community_poll_votes` | 4 | `id` (AUTO_INCREMENT) | `fk_com_poll_votes_post` -> `community_posts(id)` ON DELETE CASCADE, `fk_com_poll_votes_opt` -> `community_poll_options(id)` ON DELETE CASCADE, `fk_com_poll_votes_user` -> `users(id)` ON DELETE CASCADE | `PRIMARY`, `UNIQUE (post_id, user_id)` |
| 12 | `community_discussions` | 5 | `id` (AUTO_INCREMENT) | `fk_com_disc_user` -> `users(id)` ON DELETE CASCADE | `PRIMARY`, `INDEX (user_id)`, `INDEX (tag)` |
| 13 | `community_discussion_replies` | 3 | `id` (AUTO_INCREMENT) | `fk_com_disc_replies_disc` -> `community_discussions(id)` ON DELETE CASCADE, `fk_com_disc_replies_user` -> `users(id)` ON DELETE CASCADE | `PRIMARY`, `INDEX (discussion_id)` |
| 14 | `community_groups` | 4 | `id` (AUTO_INCREMENT) | `fk_com_groups_creator` -> `users(id)` ON DELETE CASCADE | `PRIMARY`, `INDEX (created_by)` |
| 15 | `community_group_members` | 6 | `(group_id, user_id)` | `fk_com_group_members_group` -> `community_groups(id)` ON DELETE CASCADE, `fk_com_group_members_user` -> `users(id)` ON DELETE CASCADE | `PRIMARY (group_id, user_id)` |
| 16 | `community_notifications` | 20 | `id` (AUTO_INCREMENT) | `fk_com_notif_user` -> `users(id)` ON DELETE CASCADE, `fk_com_notif_actor` -> `users(id)` ON DELETE CASCADE, `fk_com_notif_post` -> `community_posts(id)` ON DELETE CASCADE | `PRIMARY`, `INDEX (user_id, is_read)`, `INDEX (user_id, created_at)` |
| 17 | `resources` | 1 | `id` (AUTO_INCREMENT) | `fk_resources_user` -> `users(id)` ON DELETE SET NULL | `PRIMARY`, `INDEX (user_id)`, `INDEX (subject)`, `INDEX (created_at)` |
| 18 | `resource_favorites` | 0 | `(resource_id, user_id)` | `fk_res_fav_resource` -> `resources(id)` ON DELETE CASCADE, `fk_res_fav_user` -> `users(id)` ON DELETE CASCADE | `PRIMARY (resource_id, user_id)` |
| 19 | `user_favorites` | 3 | `(user_id, item_type, item_id)` | `fk_user_fav_user` -> `users(id)` ON DELETE CASCADE (Không có FK cho `item_id` vì đa hình) | `PRIMARY (user_id, item_type, item_id)`, `INDEX (item_type, item_id)` |
| 20 | `user_activity_daily` | 11 | `(user_id, activity_date)` | `fk_user_act_user` -> `users(id)` ON DELETE CASCADE | `PRIMARY (user_id, activity_date)`, `INDEX (activity_date)` |
| 21 | `community_reports` | 1 | `id` (AUTO_INCREMENT) | `fk_rep_reporter` -> `users(id)` ON DELETE CASCADE, `fk_rep_handler` -> `users(id)` ON DELETE SET NULL | `PRIMARY`, `INDEX (target_type, target_id)`, `INDEX (status)` |
| 22 | `audit_logs` | 103 | `id` (AUTO_INCREMENT) | `fk_audit_actor` -> `users(id)` ON DELETE CASCADE | `PRIMARY`, `INDEX (created_at)`, `INDEX (target_type, target_id)`, `INDEX (action)` |
| 23 | `site_settings` | 11 | `setting_key` | `fk_settings_updated_by` -> `users(id)` ON DELETE SET NULL | `PRIMARY (setting_key)` |

---

## 5. BẢNG KHÓA LOCALSTORAGE VÀ SESSIONSTORAGE

| STT | Tên khóa lưu trữ | Phạm vi | Nơi ghi (Write) | Nơi đọc (Read) | Định dạng dữ liệu | Mục đích / Ý nghĩa |
|:---:|:---|:---:|:---|:---|:---|:---|
| 1 | `token` | localStorage | `js/auth.js:68` | `auth-guard.js`, `syncProfile.js`, `admin-dashboard.js`, `community-core.js`, `resources.js`, `lectures-core.js` | Chuỗi String (JWT base64) | JWT Token xác thực phiên đăng nhập |
| 2 | `user` | localStorage | `js/auth.js:69`, `syncProfile.js:132`, `settings-profile.js` | Hầu hết các script frontend | Chuỗi JSON Object (`{id, username, full_name, role, status, avatar_url}`) | Thông tin snapshot của người dùng hiện tại |
| 3 | `currentUser` | localStorage | `js/settings-core.js:142` | `js/lecture-player.js:571` | Chuỗi JSON Object | Khóa lưu trữ kế thừa cũ, gây phân mảnh với khóa `user` |
| 4 | `redirectUrl` | sessionStorage | `js/auth-guard.js:77` | `js/auth.js:73` | Chuỗi String (URL path) | Lưu URL mục tiêu để chuyển hướng lại sau khi login thành công |
| 5 | `lib95:lectures:completedIds` | localStorage | `js/lectures-core.js:141` | `js/lectures-core.js:96,423`, `lecture-player.js` | JSON Mảng số (`[1, 2, ...]`) | Danh sách ID các bài giảng đã xem $\ge 90\%$ (Chỉ lưu ở browser) |
| 6 | `lib95:lectures:watch:<id>` | localStorage | `js/lecture-player.js:308` | `js/lecture-player.js:180,305` | Số thực (Float: số giây đã xem) | Mốc thời gian dừng video để khôi phục khi xem lại |
| 7 | `lib95:lectures:note:<id>` | localStorage | `js/lecture-notes.js:38` | `js/lecture-notes.js:25` | Chuỗi String (HTML/Văn bản) | Nội dung ghi chú cá nhân của học viên cho bài giảng |
| 8 | `lib95:lectures:speed` | localStorage | `js/lecture-player.js:250` | `js/lecture-player.js:245` | Chuỗi String (`"1"`, `"1.25"`, `"1.5"`) | Tốc độ phát video yêu thích của học viên |
| 9 | `lib95:lectures:volume` | localStorage | `js/lecture-player.js:275` | `js/lecture-player.js:270` | Chuỗi String (`"0.8"`) | Mức âm lượng video đã thiết lập |
| 10 | `lib95:practice:attempts` | localStorage | `js/practice-core.js:145` | `practice-core.js`, `home_page.js`, `history.js` | JSON Mảng Objects (`[{quizId, score, date, ...}]`) | Toàn bộ lịch sử các lượt nộp bài trắc nghiệm của học viên |
| 11 | `lib95:practice:progress:<quizId>` | localStorage | `js/practice-quiz.js:185` | `js/practice-quiz.js:72`, `home_page.js` | JSON Object (`{currentIndex, answers, timeSpent}`) | Trạng thái bài thi đang làm dở để khôi phục khi mất kết nối |
| 12 | `lib95:favorites:data` | localStorage | `js/favorites-logic.js:85` | `js/favorites-logic.js:52`, `favorites-ui.js` | JSON Object (`{lectureCourses, practiceSubjects, resources}`) | Bộ nhớ đệm danh sách yêu thích đồng bộ từ API |
| 13 | `lib95:favorites:subjects` | localStorage | `js/home_page.js:125` | `home_page.js:35` | JSON Mảng số (`[1, 2, ...]`) | Khóa đệm cũ lưu danh sách ID môn thực hành yêu thích ở Home |
| 14 | `lib95:favorites:lectures:subjects` | localStorage | `js/lectures-list.js:88` | `lectures-list.js:55` | JSON Mảng số (`[1, 2, ...]`) | Khóa đệm cũ lưu môn bài giảng yêu thích |
| 15 | `lib95:settings:data` | localStorage | `js/settings-core.js:98` | `settings-core.js`, `notifications-bell.js` | JSON Object các tùy chọn Settings | Cài đặt cá nhân học viên (giao diện, bộ lọc thông báo, quyền riêng tư) |
| 16 | `lib95:history:note:<recordId>` | localStorage | `js/history.js:310` | `js/history.js:295` | Chuỗi String | Ghi chú cá nhân gắn với một lần làm bài trong History |
| 17 | `lib95:notif:update` | localStorage | `js/notifications-bell.js:115` | `notifications-bell.js` (Event storage) | Số nguyên Timestamp (`Date.now()`) | Tín hiệu broadcast giữa các tab khi người dùng đọc thông báo |
| 18 | `theme` | localStorage | `js/theme-init.js:18`, `settings-appearance.js` | `theme-init.js:8` | Chuỗi String (`"light"`, `"dark"`, `"auto"`) | Chế độ sáng/tối hiện tại để chống FOUC |
| 19 | `lib95:site_settings` | localStorage | `js/site-branding.js:45` | `site-branding.js:22` | JSON Object cấu hình hệ thống | Cache cấu hình tên website, logo, favicon từ server |
| 20 | `admin_dashboard_range` | localStorage | `js/admin-dashboard.js:18` | `admin-dashboard.js:14` | Chuỗi String (`"7d"`, `"30d"`, `"90d"`, `"all"`) | Khoảng thời gian thống kê đang chọn trên Admin Dashboard |
| 21 | `mad101_last_result` | localStorage | `document/Practice/Ky_I/MAD101/...` | Isolated script MAD101 | JSON Object | Khóa kết quả thi riêng biệt của đề toán rời |

---

## 6. DANH MỤC MODULE JAVASCRIPT DÙNG CHUNG VÀ THỨ TỰ NẠP

Các trang trong hệ thống tuân theo quy tắc thứ tự nạp JavaScript như sau:

1. **Giai đoạn Tiền nạp (Chống FOUC - Head block):**
   - File: `js/theme-init.js` (Phải đặt ở `<head>` trước mọi link CSS).
   - Nhiệm vụ: Đọc `localStorage.getItem('theme')`, kiểm tra `prefers-color-scheme`, gán ngay thuộc tính `data-theme="light|dark"` vào thẻ `<html>` để trình duyệt không bị chớp trắng giao diện.
2. **Giai đoạn Thư viện bên ngoài (Vendor Libraries - Defer / Head):**
   - MathJax / KaTeX: `assets/vendor/mathjax/tex-svg.js` hoặc CDN `katex.min.js` (Phục vụ hiển thị công thức toán học).
   - YouTube IFrame API: `https://www.youtube.com/iframe_api` (Chỉ nạp khi xem bài giảng YouTube).
3. **Giai đoạn Nền tảng & Đồng bộ nhận diện (Foundation & Identity):**
   - `js/syncProfile.js`: Đọc `localStorage.getItem('user')`, đồng bộ Tên hiển thị, Avatar, Role Badge, hiển thị nút Manage (nếu là Staff/Admin/Owner), kiểm tra trạng thái Banned.
   - `js/site-branding.js`: Nạp tên website, logo câu lạc bộ và favicon từ server hoặc cache.
   - `js/notifications-bell.js`: Quản lý dropdown chuông thông báo trên thanh topbar, đếm số chưa đọc, kích hoạt polling ngầm 60 giây.
4. **Giai đoạn Logic Nghiệp vụ Core (Module Core):**
   - Practice: `js/practice-data.js` -> `js/practice-core.js` -> `js/practice-list.js` hoặc `js/practice-quiz.js`.
   - Lectures: `js/lectures-data.js` -> `js/lectures-core.js` -> `js/lectures-list.js` hoặc `js/lecture-player.js`.
   - Community: `js/community-core.js` -> `js/community-interactions.js` -> `js/community-feed.js` / `community-nav.js`.
   - Settings: `js/settings-core.js` -> `js/settings-profile.js` -> `js/settings-account.js` -> `js/settings-appearance.js` -> `js/settings-preferences.js` -> `js/settings-data.js` -> `js/settings-support.js`.
   - Admin: `js/admin.js` -> `js/admin-users.js` -> `js/admin-lms.js` -> `js/admin-dashboard.js` -> `js/admin-moderation.js` -> `js/admin-settings.js`.

---

## 7. NGUỒN DỮ LIỆU TĨNH VÀ THỐNG KÊ DUNG LƯỢNG (v2 cập nhật)

| Nguồn dữ liệu | Vị trí trên đĩa | Dung lượng | Số lượng file | Đặc điểm cấu trúc / Nội dung (v2) |
|:---|:---|:---:|:---:|:---|
| **Bộ dữ liệu trắc nghiệm tổng** | `js/practice-data.js` | **2.40 MB** | 1 file | Chứa `window.Lib95.practice.data`. Trong v2, đã loại bỏ 39 câu hỏi lỗi (35 câu rỗng options, 4 câu sai correctIndex môn DBI202). Còn lại 2,320 câu hỏi hợp lệ 100%. |
| **Dữ liệu Toán rời rạc & Kỹ thuật** | `js/practice-data-mad101.js`, `practice-data-mae101.js` | **~2.1 MB** | 2 files | Chứa 60 quizzes và 2,204 câu hỏi trắc nghiệm toán. Đã bổ sung script nạp vào `practice-quiz-intro.html` trong v2. |
| **Dữ liệu thực hành rời Kỳ I & II** | `document/Practice/` | **~209.25 MB** | 4,400 files | Chứa mã nguồn các bộ luyện thi riêng: CSI106, PFP191, DBI202, CSD203, CEA201, MAD101, MAE101. Riêng môn toán chứa hơn 1,130 ảnh câu hỏi cắt nhỏ. |
| **Dữ liệu video bài giảng** | `document/Lectures/` | **~110.41 MB** | 4 files video | Gồm 1 video mẫu tại `Ky_II/CEA201/test/` (8.3 MB) và 3 video upload trong `Uploads/` (tổng ~102 MB). Phục vụ qua Whitelist Static Mount. |
| **Thư mục Assets & Icons** | `assets/` | **~24.8 MB** | ~350 files | Chứa icon hệ thống (Better_Icon, Green_Icon, Purple_icon), favicon, logo và thư viện MathJax local (2 MB). |
| **Kho lưu trữ tài liệu tải lên** | `backend/storage/resources/` | **0 B** | 0 files | Thư mục cách ly dành cho các file học tập được tải lên qua `POST /api/resources`. |

---

## 8. CẤU HÌNH HỆ THỐNG VÀ TRIỂN KHAI (v2 cập nhật)

- **Môi trường & Cổng chạy:** Chạy trên Node.js (v24.15.0), Express framework (v5.2.1), cổng mặc định qua biến môi trường `PORT=3000` (hoặc fallback 3000).
- **Cơ sở dữ liệu:** MySQL 8.x, kết nối qua `mysql2/promise` (`backend/config/db.js`), giới hạn connection pool tối đa 10 connections.
- **Cấu hình CORS:** `app.use(cors())` cho phép các request từ trình duyệt truy cập API.
- **Phục vụ Static Files (Đã khắc phục triệt để trong v2 - F-001):**
  - **Whitelist Static Mounts:** Thay thế `express.static(root)` bằng việc mount độc lập từng thư mục cần thiết: `/pages`, `/css`, `/js`, `/assets`, `/home_page`, `/document/Lectures`, `/document/Practice`, `/document/uploads` và file route riêng cho `/`, `/index.html`. Sử dụng `dotfiles: 'deny'`, `index: false`. Hỗ trợ streaming video Range 206 Partial Content cho video bài giảng.
  - **Lớp chặn bảo mật 404 Pre-routing:** Đặt trước toàn bộ các static mount, cưỡng chế trả HTTP 404 Not Found ngay lập tức cho các đường dẫn nhạy cảm: `/backend`, `/tools`, `/docs`, `/design`, `/flowchart testcase`, `/.git`, `/node_modules`, và mọi tệp gốc ngoài whitelist như `.env`, `.sql`, `.bak`, `.map`, `package*.json`, `*.py`, `*.md`, `*_AUDIT.md`.
- **Giới hạn Tần suất (In-Memory Rate Limiter - F-007 v2):**
  - Áp dụng trên endpoint `POST /api/auth/login`: Tối đa 10 lần thử sai trong 15 phút cho mỗi cặp (IP + Username). Lần thứ 11 trả về HTTP 429 Too Many Requests kèm tiêu đề `Retry-After`.
- **Giới hạn Payload & Upload:**
  - `express.json({ limit: '10mb' })`, `express.urlencoded({ limit: '10mb', extended: true })`.
  - Multer upload video bài giảng: Tối đa 1 GB (`limits: { fileSize: 1024 * 1024 * 1024 }`), lưu vào `document/Lectures/Uploads/`.
  - Multer upload tài nguyên học tập: Tối đa 20 MB, lưu vào `backend/storage/resources/`.
  - Multer upload ảnh đại diện / branding: Tối đa 5 MB, lưu vào `assets/uploads/`.
- **Bảo mật Header (Đã bổ sung trong v2 - F-008):**
  - Cấu hình tiêu đề bảo mật: `X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN` (chống Clickjacking), `Referrer-Policy: strict-origin-when-cross-origin`, `X-XSS-Protection: 1; mode=block`.
  - Khởi động an toàn: Tự động phát hiện và in cảnh báo `[SECURITY WARNING]` nếu `JWT_SECRET` là mặc định hoặc độ dài dưới 32 ký tự.

---

## 9. CÔNG CỤ VÀ PHỤ THUỘC BÊN NGOÀI

1. **Hiển thị công thức Toán (MathJax / KaTeX):**
   - Sử dụng MathJax SVG (`assets/vendor/mathjax/tex-svg.js`, dung lượng 2.05 MB) với cấu hình tại `js/mathjax-config.js` (inline `$..$` và block `$$..$$`).
   - Trên một số trang (`admin.html`), nạp kèm KaTeX qua CDN `jsdelivr.net` (`katex.min.js`, `auto-render.min.js`).
2. **Dịch vụ video YouTube:**
   - Sử dụng YouTube IFrame Player API (`https://www.youtube.com/iframe_api`) để điều khiển phát video nhúng, lấy thời lượng và đồng bộ thanh seekbar qua polling interval.
   - Sử dụng dịch vụ công khai `https://www.youtube.com/oembed` (Backend gọi) để lấy tiêu đề video, tên tác giả và thumbnail chuẩn không cần Google API Key.
3. **Thư viện cắt xén ảnh (Cropper.js):**
   - Dùng trong chức năng chỉnh sửa ảnh đại diện tại `pages/settings/settings.html` (`js/settings-profile.js`).
4. **Xử lý đa phương tiện máy chủ (FFmpeg & FFprobe):**
   - `ffprobe`: Dùng trong `backend/routes/lmsRoutes.js:145-156` để đọc chính xác thời lượng video gửi lên.
   - `ffmpeg`: Dùng trong `backend/routes/lmsRoutes.js:158-181` với tham số `-movflags +faststart` để chuyển vị trí `moov atom` lên đầu file MP4, cho phép trình duyệt học viên phát video ngay lập tức mà không cần đợi tải toàn bộ tệp.
