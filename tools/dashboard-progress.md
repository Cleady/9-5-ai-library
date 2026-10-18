# Tiến Độ Triển Khai Admin Dashboard, Đo Lường Hoạt Động, Báo Cáo Vi Phạm & Nhật Ký Quản Trị

## 1. Trạng Thái Tổng Thể
- **Trạng thái:** Đang thực hiện
- **Giai đoạn hiện tại:** Giai đoạn 7: Hoàn thiện và kiểm tra tổng
- **Giai đoạn đã hoàn thành:** Giai đoạn 0, Giai đoạn 1, Giai đoạn 2, Giai đoạn 3, Giai đoạn 4, Giai đoạn 5, Giai đoạn 6

---

## 2. Nhật Ký Thay Đổi File Dùng Chung
| File | Vị trí / Dòng | Lý do sửa đổi | Thời điểm |
| :--- | :--- | :--- | :--- |
| `.gitignore` | Dòng 15 | Thêm `tools/backup/` để không commit file dump nhạy cảm | 2026-10-18 14:53 |
| `backend/server.js` | Dòng 8, 28 | Import và đăng ký `dashboardRoutes`, `moderationRoutes` vào `/api/admin` | 2026-10-18 14:55 |
| `backend/config/initDb.js` | Dòng 468-540 | Thêm tạo bảng `user_activity_daily`, `community_reports`, `audit_logs` và các cột `is_hidden` | 2026-10-18 15:24 |
| `backend/controllers/authController.js` | Dòng 4, 50 | Gọi `recordLogin(user.id)` khi đăng nhập thành công | 2026-10-18 15:00 |
| `backend/middlewares/authMiddleware.js` | Dòng 2, 18 | Gọi `recordApiActivity(decoded)` (fire-and-forget, throttle 5p) trong `verifyToken` | 2026-10-18 15:00 |
| `backend/routes/communityRoutes.js` | Dòng 122-124 | Đăng ký route `POST /report` với `moderationController.createReport` | 2026-10-18 15:10 |
| `backend/controllers/communityController.js` | Nhiều dòng | Lọc bỏ `is_hidden=1` cho người dùng thường ở getPosts, getComments, getDiscussions, search | 2026-10-18 15:13 |
| `backend/controllers/adminController.js` | Dòng 2, 40-55 | Ghi nhận Audit Log khi Admin cập nhật role/status người dùng | 2026-10-18 15:25 |
| `backend/routes/adminRoutes.js` | Dòng 5, 12-23 | Đăng ký route `GET /api/admin/audit` có phân trang và bộ lọc | 2026-10-18 15:26 |
| `js/community-interactions.js` | Dòng 50-65, 145-155 | Thêm nút Báo cáo vi phạm vào menu bài viết và từng bình luận | 2026-10-18 15:15 |
| `pages/community/*.html` | Cuối file | Nhúng script `js/community-report.js` | 2026-10-18 15:16 |
| `pages/admin/admin.html` | Dòng 28-30 | Nhúng link `css/admin-dashboard.css`, `css/admin-moderation.css` | 2026-10-18 15:20 |
| `pages/admin/admin.html` | Dòng 168-272 | Thay thế nội dung HTML tĩnh bằng giao diện động kết nối API thật | 2026-10-18 15:05 |
| `pages/admin/admin.html` | Dòng 537-614 | Thay thế section `#page-community` tĩnh bằng giao diện kiểm duyệt động | 2026-10-18 15:22 |
| `pages/admin/admin.html` | Cuối file | Nhúng script `js/admin-dashboard.js`, `js/admin-moderation.js` | 2026-10-18 15:22 |
| `js/admin-dashboard.js` | Dòng 600-645 | Hỗ trợ xem dòng thời gian Audit Log trong Activity Modal | 2026-10-18 15:27 |
| `pages/admin/admin.html` | Dòng 190-210 | Bổ sung vector SVG icon cho Tài khoản chờ duyệt và Báo cáo vi phạm | 2026-10-18 15:40 |
| `css/admin-dashboard.css`| Dòng 192-260 | Tinh chỉnh màu sắc, viền glassmorphism, hiệu ứng hover và dark theme glow cho attention icons | 2026-10-18 15:40 |
| `css/style.css`          | Dòng 1007, 2469, 2555 | Đồng bộ kích thước font, padding, border 1px transparent cho `.role-badge` và `<kbd>` (triệt tiêu 100% lệch vị trí topbar khi đổi theme) | 2026-10-18 16:01 |
| `css/admin.css`          | Dòng 2769, 3533 | Đồng bộ `box-sizing: border-box`, padding 4px 11px và border 1px transparent cho `.role-badge` | 2026-10-18 16:01 |
| `css/resources.css`      | Dòng 43, 373 | Loại trừ `.search-input` khỏi font:inherit và chuẩn hóa `.role-badge` | 2026-10-18 16:01 |

---

## 3. Nhật Ký Thay Đổi CSDL (Chỉ thêm)
| Bảng / Cột | Câu lệnh SQL | Mục đích | Thời điểm |
| :--- | :--- | :--- | :--- |
| `user_activity_daily` | `CREATE TABLE IF NOT EXISTS user_activity_daily ...` | Lưu vết người dùng hoạt động theo ngày | 2026-10-18 14:59 |
| `users.last_login_at` | `ALTER TABLE users ADD COLUMN last_login_at ...` | Lưu mốc thời gian đăng nhập gần nhất của user | 2026-10-18 14:59 |
| `community_reports` | `CREATE TABLE IF NOT EXISTS community_reports ...` | Lưu báo cáo vi phạm nội dung cộng đồng | 2026-10-18 15:10 |
| `posts, comments, discussions, replies` | `ALTER TABLE ... ADD COLUMN is_hidden TINYINT(1) DEFAULT 0, ADD COLUMN hidden_by INT NULL, ADD COLUMN hidden_at TIMESTAMP NULL` | Đánh dấu trạng thái ẩn/hiện do kiểm duyệt | 2026-10-18 15:12 |
| `audit_logs` | `CREATE TABLE IF NOT EXISTS audit_logs ...` | Ghi vết nhật ký các thao tác quản trị hệ thống | 2026-10-18 15:24 |

---

## 4. Chi Tiết Từng Giai Đoạn
### Giai đoạn 0: An toàn và múi giờ
- [x] Sao lưu toàn bộ DB ra `tools/backup/ai_club_db_20261018_145300.sql` (178,678 bytes)
- [x] Thêm `tools/backup/` vào `.gitignore`
- [x] Khảo sát múi giờ (MySQL vs Node vs Asia/Saigon): Node và MySQL đồng bộ trong 733ms, múi giờ hệ thống UTC+7.
- [x] Tạo `tools/tz-check.js` chạy thành công.
- [x] Khảo sát tab "Community Moderation" trong `admin.html`: section `#page-community` tại dòng 462-560, kích hoạt qua nút sidebar `data-page-target="community"`.

### Giai đoạn 1: API tổng hợp và số liệu thật
- [x] Tạo `backend/routes/dashboardRoutes.js` + `backend/controllers/dashboardController.js`
- [x] Đăng ký route trong `backend/server.js` (dòng 8, 28)
- [x] Tạo `tools/verify-dashboard.js` kiểm tra khớp 100% DB (10/10 chỉ số khớp tuyệt đối, RBAC đạt 9/9)
- [x] Test curl các quyền (owner: 200, staff: 200, member: 403, 401, 400). Không lộ email/hash.

### Giai đoạn 2: Đo "Người dùng hoạt động"
- [x] Bổ sung bảng `user_activity_daily` và cột `users.last_login_at` trong `initDb.js`
- [x] Cập nhật `authController.js` (khi login) và middleware ghi nhận hoạt động (fire-and-forget, throttle 5p trong `backend/utils/activityTracker.js`)
- [x] Tích hợp `series.activeUsers` vào dashboard API (trả về số active users thật và `activeSince: 2026-10-18`)
- [x] Viết `tools/test-activity-tracking.js` kiểm thử đạt 100%

### Giai đoạn 3: Giao diện Dashboard chạy dữ liệu thật
- [x] Tạo `css/admin-dashboard.css` và `js/admin-dashboard.js`
- [x] Nhúng vào `pages/admin/admin.html`
- [x] Cá nhân hóa lời chào ("Chào mừng trở lại, Owner 👋 OWNER"), bộ lọc 7d/30d/90d tùy biến, 4 thẻ số thật (Users 5, Courses 2, Posts 20, Resources 1), SVG tự vẽ co giãn + tooltip hover, Donut vai trò thật (Owner 20%, Admin 20%, Staff 20%, Member 40%), danh sách hoạt động thật + modal phân trang
- [x] Xóa bỏ 100% số/nhãn giả ("2,486", "Nguyễn Văn A", "Sinh viên", "Sep 14")
- [x] Chụp ảnh kiểm thử: `dashboard_1440_light.png`, `dashboard_1440_dark.png`, `dashboard_390_light.png`, `dashboard_390_dark.png`, `dashboard_mock_large.png`
- [x] 0 lỗi console, dữ liệu trên DOM khớp 100% DB

### Giai đoạn 4: Báo cáo vi phạm (Cộng đồng)
- [x] Tạo bảng `community_reports` và thêm cột `is_hidden` vào posts/comments/discussions/replies
- [x] Tạo `backend/routes/moderationRoutes.js` + `backend/controllers/moderationController.js`
- [x] Tạo `js/community-report.js` và gắn nút Báo cáo vi phạm (modal, validation, chống tự report)
- [x] Cập nhật query feed loại bỏ `is_hidden=1` cho người dùng thông thường
- [x] Viết `tools/test-phase4-reports.js` kiểm thử 13/13 ca đạt 100% (RBAC, duplicate 409, self-report 400, hide/restore feed exclusion)

### Giai đoạn 5: Trang Community Moderation (Admin)
- [x] Dựng giao diện Moderation trong `pages/admin/admin.html` (thay thế 100% markup giả bằng tabs động, filter dropdown và bảng dữ liệu)
- [x] Tạo `css/admin-moderation.css` và `js/admin-moderation.js` xử lý duyệt/bỏ qua/ẩn/xóa/khôi phục
- [x] Liên kết số báo cáo chờ xử lý lên Dashboard attention badge
- [x] Viết `tools/test-phase5-moderation-ui.js` kiểm thử E2E: chuyển tab, ẩn nội dung cập nhật DB, 0 console error
- [x] Chụp ảnh kiểm thử: `admin_moderation_light.png`, `admin_moderation_dark.png`, `admin_moderation_390.png`

### Giai đoạn 6: Nhật ký quản trị (Audit Log)
- [x] Tạo bảng `audit_logs`
- [x] Tạo `backend/utils/audit.js` ghi vết các thao tác quản trị (fire-and-forget, non-blocking)
- [x] Gắn `recordAudit` vào `adminController.js` và `moderationController.js`
- [x] Tạo API `GET /api/admin/audit` với phân trang và lọc action/target
- [x] Tích hợp chip "🛡️ Nhật ký quản trị" trong Activity Modal của Dashboard
- [x] Viết `tools/test-phase6-audit.js` kiểm thử 7/7 ca đạt 100%, chụp ảnh `dashboard_audit_modal.png`

### Giai đoạn 7: Hoàn thiện và kiểm tra tổng
- [ ] Chạy lại toàn bộ test, đo hiệu năng (<200ms)
- [ ] Kiểm tra XSS, kiểm tra múi giờ, bảo mật role
- [ ] Cập nhật `README.md` và xuất `tools/dashboard-report.md`
