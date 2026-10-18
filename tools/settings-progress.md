# TIẾN ĐỘ THỰC HIỆN HOÀN THIỆN TRANG ADMIN SETTINGS

*Nguồn sự thật ghi nhận toàn bộ quá trình khảo sát, thay đổi DB, sửa file, kiểm thử và lộ trình.*

---

## 1. TỔNG QUAN TIẾN ĐỘ CÁC GIAI ĐOẠN

- [x] **GIAI ĐOẠN 0: AN TOÀN, BASELINE, KIỂM TRA MÂU THUẪN** (Hoàn thành)
- [x] **GIAI ĐOẠN 1: DATABASE VÀ BACKEND** (Hoàn thành - 35/35 test PASS)
- [x] **GIAI ĐOẠN 2: TỐI ƯU ẢNH LOGO VÀ FAVICON** (Hoàn thành - giảm 98% dung lượng)
- [x] **GIAI ĐOẠN 3: GIAO DIỆN TRANG SETTINGS** (Hoàn thành - 23/23 UI test PASS)
- [x] **GIAI ĐOẠN 4: ÁP DỤNG CẤU HÌNH LÊN TOÀN WEBSITE** (Hoàn thành - 15/15 test PASS)
- [x] **GIAI ĐOẠN 5: DỌN KHUNG ADMIN VÀ CÁC LỖI ICON/LIÊN QUAN** (Hoàn thành - 5/5 test PASS)
- [x] **GIAI ĐOẠN 6: KIỂM TRA TỔNG VÀ HOÀN THIỆN** (Hoàn thành - 78/78 master tests PASS)

---

## 2. KẾT QUẢ THỰC HIỆN GIAI ĐOẠN 0

### a) Sao lưu Cơ sở dữ liệu (Database Backup)
- Đã sao lưu toàn bộ 22 bảng dữ liệu và cấu trúc `CREATE TABLE` vào file:
  `tools/backup/backup_before_settings_1792315787059.json`
- Thư mục `tools/backup/` đã nằm trong `.gitignore` (dòng 15).

### b) Ảnh chụp chuẩn đối chiếu (Baseline Screenshots)
Đã chụp và lưu thành công trong `tools/shots/`:
- `baseline_index_light_1440.png`, `baseline_index_dark_1440.png`
- `baseline_login_light_1440.png`, `baseline_login_dark_1440.png`
- `baseline_signup_light_1440.png`, `baseline_signup_dark_1440.png`
- `baseline_resources_light_1440.png`, `baseline_resources_dark_1440.png`
- `baseline_community_light_1440.png`, `baseline_community_dark_1440.png`
- `baseline_admin_dashboard_light_1440.png`, `baseline_admin_dashboard_dark_1440.png`, `baseline_admin_dashboard_light_390.png`, `baseline_admin_dashboard_dark_390.png`
- `baseline_admin_settings_light_1440.png`, `baseline_admin_settings_dark_1440.png`, `baseline_admin_settings_light_390.png`, `baseline_admin_settings_dark_390.png`

### c) Kết quả xác minh thực nghiệm
1. **Kiểm tra truy cập admin của tài khoản member:**
   - Trong `pages/admin/admin.html` (dòng 5–17) có một đoạn script inline kiểm tra `localStorage.getItem('user')`:
     - Nếu không có user -> `window.location.href = '../../index.html'`
     - Nếu `user.role === 'member'` -> `alert('You không có quyền truy cập trang Quản trị!'); window.location.href = '../../index.html'`
   - Tuy nhiên, nếu user xóa hoặc chỉnh sửa localStorage thủ công, trang vẫn render. Tại `admin-dashboard.js:192`, khi API trả 403 chỉ hiện toast chứ không chuyển hướng. Cần siết chặt ở Giai đoạn 5.
2. **Hành vi đăng ký & Mật khẩu:**
   - `authController.js:84-87`: Đăng ký mặc định gán `role = 'member'`, `status = 'pending'`.
   - Backend `authController.js:69-71`: Hoàn toàn **chưa kiểm tra độ dài mật khẩu** tối thiểu!
   - Frontend `auth.js:38`: Chỉ kiểm tra `password !== confirmPassword`, không kiểm tra độ dài.
   - Trang Settings cá nhân `settings-account.js:100` gọi `PUT /api/users/change-password` và tự kiểm tra `pNew.length < 8 || !/\d/.test(pNew)`.
   - Backend `userController.js:58`: Không kiểm tra độ dài mật khẩu mới khi đổi.
   - Do đó, cấu hình `min_password_length` sẽ được áp dụng trực tiếp vào `authController.register` và `userController.changePassword`.
3. **Sử dụng file ảnh `cool_book.png`:**
   - Kích thước gốc: 1254 × 1254 px, dung lượng 1.22 MB.
   - Xuất hiện trong 28 file HTML dưới dạng `<link rel="icon">`, 2 vị trí thẻ `<img>` trong `index.html` và `admin.html:725`, 5 vị trí CSS `.brand-logo` (`admin.css`, `login.css`, `reset_pass.css`, `signup.css`, `style.css`).
   - Mọi nơi hiển thị thực tế đều có kích thước ≤ 40 CSS pixels (32px–38px).
4. **Selector hiển thị thương hiệu trên các trang:**
   - Tiêu đề tab: `<title>` chứa `9.5 AI CLUB`.
   - Sidebar brand: `.sidebar-brand .brand-text strong` (hoặc `.sidebar-brand .brand-text`).
   - Header index.html: `.home-page__brand span strong`.
   - Footer index.html: `.home-page__footer-brand span strong`, bản quyền: `.home-page__footer-bottom span:first-child`.
   - Footer admin: `.admin-footer span:first-child`.
5. **Cột users trong CSDL:**
   - `id`, `username` (chứa email), `full_name`, `password_hash`, `role`, `status`, `created_at`, `bio`, `avatar_url`, `last_login_at`. Không có cột `email`.

---

## 3. KẾT QUẢ THỰC HIỆN GIAI ĐOẠN 1 (DATABASE VÀ BACKEND)
- **Tạo bảng `site_settings`:** `setting_key VARCHAR(100) PRIMARY KEY, setting_value TEXT, updated_by INT, updated_at TIMESTAMP`.
  - Đã seed dữ liệu ban đầu bằng `INSERT IGNORE` trong `backend/config/initDb.js`.
- **Middleware phân quyền:**
  - `isOwner` trong `backend/middlewares/authMiddleware.js`: Trả về 403 Forbidden nếu `req.user.role !== 'owner'`.
- **Controllers & Routes:**
  - `backend/controllers/settingsController.js`:
    - `getPublicSettings`: Public GET (trả về website_name, short_description, logo_url, favicon_url, social_links, default_theme, default_accent, allow_registration). Đã gắn cache bộ nhớ 5 phút và header `Cache-Control: public, max-age=60`. Tuyệt đối không để lộ cấu hình nhạy cảm.
    - `getAdminSettings`: Cho Admin và Owner (`isAdminOrOwner`). Trả về toàn bộ cài đặt kèm cờ `canEdit: req.user.role === 'owner'`.
    - `updateAdminSettings`: Chỉ cho Owner (`isOwner`). Validate nghiêm ngặt (độ dài, regex http/https, enum, transaction commit, ghi `recordAudit`).
    - `uploadBranding`: Chỉ cho Owner (`isOwner`). Multer 1MB, kiểm tra magic number chữ ký file thực tế (PNG, JPEG, WEBP), đọc kích thước ảnh thực tế (16px–1024px), chống file EXE/SVG trá hình.
    - `resetBranding`: Khôi phục logo hoặc favicon về mặc định.
  - `backend/routes/settingsRoutes.js`: Định tuyến đầy đủ `/api/settings/public`, `/api/admin/settings`, `/api/admin/settings/branding/:kind`.
  - `backend/server.js`: Mount routes và bổ sung header `X-Content-Type-Options: nosniff`.
- **Tích hợp các cài đặt bảo mật:**
  - `authController.js`: Áp dụng `allow_registration`, `min_password_length`, `require_approval`, `session_days` (thời hạn JWT theo ngày cấu hình).
  - `userController.js`: Áp dụng `min_password_length` khi người dùng đổi mật khẩu.
- **Kết quả kiểm thử tự động (`tools/verify-settings.js`):**
  - **35/35 test PASS (100% ĐẠT)**

---

## 4. KẾT QUẢ THỰC HIỆN GIAI ĐOẠN 2 (TỐI ƯU ẢNH LOGO VÀ FAVICON)
- **Trích xuất & Tối ưu hóa ảnh từ `assets/icon/cool_book.png` (1.22 MB):**
  - `assets/icon/cool_book_128.png`: 128×128px, dung lượng 27.91 KB (chuẩn ≤ 40 KB, nền trong suốt).
  - `assets/icon/favicon-64.png`: 64×64px, dung lượng 8.45 KB (chuẩn ≤ 25 KB).
  - `assets/icon/favicon-32.png`: 32×32px, dung lượng 2.53 KB (chuẩn ≤ 15 KB).
  - **Bảo toàn:** File gốc `assets/icon/cool_book.png` (1.22 MB) được giữ nguyên vẹn 100%, không bị xóa hay ghi đè.
- **Áp dụng cập nhật trên toàn codebase (34 files):**
  - 5 file CSS (`css/admin.css`, `css/login.css`, `css/reset_pass.css`, `css/signup.css`, `css/style.css`): chuyển background logo sang `cool_book_128.png`.
  - `index.html`: favicon sang `favicon-32.png`, logo header và footer sang `cool_book_128.png`.
  - `pages/admin/admin.html`: favicon sang `favicon-32.png`, preview logo sang `cool_book_128.png`.
  - 27 file HTML khác: cập nhật toàn bộ `<link rel="icon">` sang `favicon-32.png`.
  - Cập nhật mặc định CSDL và controller sang `/assets/icon/cool_book_128.png` và `/assets/icon/favicon-32.png`.

---

- [x] **GIAI ĐOẠN 0: AN TOÀN, BASELINE, KIỂM TRA MÂU THUẪN** (Hoàn thành)
- [x] **GIAI ĐOẠN 1: DATABASE VÀ BACKEND** (Hoàn thành - 35/35 test PASS)
- [x] **GIAI ĐOẠN 2: TỐI ƯU ẢNH LOGO VÀ FAVICON** (Hoàn thành - giảm 98% dung lượng)
- [x] **GIAI ĐOẠN 3: GIAO DIỆN TRANG SETTINGS** (Hoàn thành - 23/23 UI test PASS)
- [ ] **GIAI ĐOẠN 4: ÁP DỤNG CẤU HÌNH LÊN TOÀN WEBSITE**
- [ ] **GIAI ĐOẠN 5: DỌN KHUNG ADMIN VÀ CÁC LỖI ICON/LIÊN QUAN**
- [ ] **GIAI ĐOẠN 6: KIỂM TRA TỔNG VÀ HOÀN THIỆN**

---

## 2. KẾT QUẢ THỰC HIỆN GIAI ĐOẠN 0

### a) Sao lưu Cơ sở dữ liệu (Database Backup)
- Đã sao lưu toàn bộ 22 bảng dữ liệu và cấu trúc `CREATE TABLE` vào file:
  `tools/backup/backup_before_settings_1792315787059.json`
- Thư mục `tools/backup/` đã nằm trong `.gitignore` (dòng 15).

### b) Ảnh chụp chuẩn đối chiếu (Baseline Screenshots)
Đã chụp và lưu thành công trong `tools/shots/`:
- `baseline_index_light_1440.png`, `baseline_index_dark_1440.png`
- `baseline_login_light_1440.png`, `baseline_login_dark_1440.png`
- `baseline_signup_light_1440.png`, `baseline_signup_dark_1440.png`
- `baseline_resources_light_1440.png`, `baseline_resources_dark_1440.png`
- `baseline_community_light_1440.png`, `baseline_community_dark_1440.png`
- `baseline_admin_dashboard_light_1440.png`, `baseline_admin_dashboard_dark_1440.png`, `baseline_admin_dashboard_light_390.png`, `baseline_admin_dashboard_dark_390.png`
- `baseline_admin_settings_light_1440.png`, `baseline_admin_settings_dark_1440.png`, `baseline_admin_settings_light_390.png`, `baseline_admin_settings_dark_390.png`

### c) Kết quả xác minh thực nghiệm
1. **Kiểm tra truy cập admin của tài khoản member:**
   - Trong `pages/admin/admin.html` (dòng 5–17) có một đoạn script inline kiểm tra `localStorage.getItem('user')`:
     - Nếu không có user -> `window.location.href = '../../index.html'`
     - Nếu `user.role === 'member'` -> `alert('You không có quyền truy cập trang Quản trị!'); window.location.href = '../../index.html'`
   - Tuy nhiên, nếu user xóa hoặc chỉnh sửa localStorage thủ công, trang vẫn render. Tại `admin-dashboard.js:192`, khi API trả 403 chỉ hiện toast chứ không chuyển hướng. Cần siết chặt ở Giai đoạn 5.
2. **Hành vi đăng ký & Mật khẩu:**
   - `authController.js:84-87`: Đăng ký mặc định gán `role = 'member'`, `status = 'pending'`.
   - Backend `authController.js:69-71`: Hoàn toàn **chưa kiểm tra độ dài mật khẩu** tối thiểu!
   - Frontend `auth.js:38`: Chỉ kiểm tra `password !== confirmPassword`, không kiểm tra độ dài.
   - Trang Settings cá nhân `settings-account.js:100` gọi `PUT /api/users/change-password` và tự kiểm tra `pNew.length < 8 || !/\d/.test(pNew)`.
   - Backend `userController.js:58`: Không kiểm tra độ dài mật khẩu mới khi đổi.
   - Do đó, cấu hình `min_password_length` sẽ được áp dụng trực tiếp vào `authController.register` và `userController.changePassword`.
3. **Sử dụng file ảnh `cool_book.png`:**
   - Kích thước gốc: 1254 × 1254 px, dung lượng 1.22 MB.
   - Xuất hiện trong 28 file HTML dưới dạng `<link rel="icon">`, 2 vị trí thẻ `<img>` trong `index.html` và `admin.html:725`, 5 vị trí CSS `.brand-logo` (`admin.css`, `login.css`, `reset_pass.css`, `signup.css`, `style.css`).
   - Mọi nơi hiển thị thực tế đều có kích thước ≤ 40 CSS pixels (32px–38px).
4. **Selector hiển thị thương hiệu trên các trang:**
   - Tiêu đề tab: `<title>` chứa `9.5 AI CLUB`.
   - Sidebar brand: `.sidebar-brand .brand-text strong` (hoặc `.sidebar-brand .brand-text`).
   - Header index.html: `.home-page__brand span strong`.
   - Footer index.html: `.home-page__footer-brand span strong`, bản quyền: `.home-page__footer-bottom span:first-child`.
   - Footer admin: `.admin-footer span:first-child`.
5. **Cột users trong CSDL:**
   - `id`, `username` (chứa email), `full_name`, `password_hash`, `role`, `status`, `created_at`, `bio`, `avatar_url`, `last_login_at`. Không có cột `email`.

---

## 3. KẾT QUẢ THỰC HIỆN GIAI ĐOẠN 1 (DATABASE VÀ BACKEND)
- **Tạo bảng `site_settings`:** `setting_key VARCHAR(100) PRIMARY KEY, setting_value TEXT, updated_by INT, updated_at TIMESTAMP`.
  - Đã seed dữ liệu ban đầu bằng `INSERT IGNORE` trong `backend/config/initDb.js`.
- **Middleware phân quyền:**
  - `isOwner` trong `backend/middlewares/authMiddleware.js`: Trả về 403 Forbidden nếu `req.user.role !== 'owner'`.
- **Controllers & Routes:**
  - `backend/controllers/settingsController.js`:
    - `getPublicSettings`: Public GET (trả về website_name, short_description, logo_url, favicon_url, social_links, default_theme, default_accent, allow_registration). Đã gắn cache bộ nhớ 5 phút và header `Cache-Control: public, max-age=60`. Tuyệt đối không để lộ cấu hình nhạy cảm.
    - `getAdminSettings`: Cho Admin và Owner (`isAdminOrOwner`). Trả về toàn bộ cài đặt kèm cờ `canEdit: req.user.role === 'owner'`.
    - `updateAdminSettings`: Chỉ cho Owner (`isOwner`). Validate nghiêm ngặt (độ dài, regex http/https, enum, transaction commit, ghi `recordAudit`).
    - `uploadBranding`: Chỉ cho Owner (`isOwner`). Multer 1MB, kiểm tra magic number chữ ký file thực tế (PNG, JPEG, WEBP), đọc kích thước ảnh thực tế (16px–1024px), chống file EXE/SVG trá hình.
    - `resetBranding`: Khôi phục logo hoặc favicon về mặc định.
  - `backend/routes/settingsRoutes.js`: Định tuyến đầy đủ `/api/settings/public`, `/api/admin/settings`, `/api/admin/settings/branding/:kind`.
  - `backend/server.js`: Mount routes và bổ sung header `X-Content-Type-Options: nosniff`.
- **Tích hợp các cài đặt bảo mật:**
  - `authController.js`: Áp dụng `allow_registration`, `min_password_length`, `require_approval`, `session_days` (thời hạn JWT theo ngày cấu hình).
  - `userController.js`: Áp dụng `min_password_length` khi người dùng đổi mật khẩu.
- **Kết quả kiểm thử tự động (`tools/verify-settings.js`):**
  - **35/35 test PASS (100% ĐẠT)**

---

## 4. KẾT QUẢ THỰC HIỆN GIAI ĐOẠN 2 (TỐI ƯU ẢNH LOGO VÀ FAVICON)
- **Trích xuất & Tối ưu hóa ảnh từ `assets/icon/cool_book.png` (1.22 MB):**
  - `assets/icon/cool_book_128.png`: 128×128px, dung lượng 27.91 KB (chuẩn ≤ 40 KB, nền trong suốt).
  - `assets/icon/favicon-64.png`: 64×64px, dung lượng 8.45 KB (chuẩn ≤ 25 KB).
  - `assets/icon/favicon-32.png`: 32×32px, dung lượng 2.53 KB (chuẩn ≤ 15 KB).
  - **Bảo toàn:** File gốc `assets/icon/cool_book.png` (1.22 MB) được giữ nguyên vẹn 100%, không bị xóa hay ghi đè.
- **Áp dụng cập nhật trên toàn codebase (34 files):**
  - 5 file CSS (`css/admin.css`, `css/login.css`, `css/reset_pass.css`, `css/signup.css`, `css/style.css`): chuyển background logo sang `cool_book_128.png`.
  - `index.html`: favicon sang `favicon-32.png`, logo header và footer sang `cool_book_128.png`.
  - `pages/admin/admin.html`: favicon sang `favicon-32.png`, preview logo sang `cool_book_128.png`.
  - 27 file HTML khác: cập nhật toàn bộ `<link rel="icon">` sang `favicon-32.png`.
  - Cập nhật mặc định CSDL và controller sang `/assets/icon/cool_book_128.png` và `/assets/icon/favicon-32.png`.

---

## 5. KẾT QUẢ THỰC HIỆN GIAI ĐOẠN 3 (GIAO DIỆN TRANG SETTINGS)
- **Tạo `css/admin-settings.css` hoàn chỉnh & chuẩn tiếp cận:**
  - Font size tối thiểu 12px (tiêu đề 22px, nhãn 13.5px, input 14px, chú thích 12px).
  - Chiều cao các nút và trường nhập liệu $\ge 40$px (tiêu chuẩn WCAG).
  - **Khắc phục triệt để lỗi màu đỏ/hồng:** Loại bỏ hoàn toàn rule cũ `.settings-form>label>span { color: #e7616a }` trong `css/admin.css`.
  - Hỗ trợ hoàn chỉnh Dark mode và Light mode, độ tương phản chuẩn.
  - Mobile responsive: thanh sub-tabs cuộn ngang mượt mà, social links và buttons tự động co giãn thông minh ở màn hình 390px.
- **Dọn dẹp `css/admin.css`:**
  - Xóa bỏ sạch sẽ các khối selector trùng lặp và các kích thước 7px, 8px, 9px cũ tại các dòng ~800, ~1550, ~1835, ~3250 và dark theme ~3660.
- **Cập nhật `pages/admin/admin.html` phần `#page-settings`:**
  - 4 sub-tab chuẩn ARIA tablist/tabpanel: Thông tin chung (General), Giao diện (Appearance), Email & Thông báo, Bảo mật & Phiên (Security).
  - Social Links dùng toàn bộ SVG inline chính hãng cho Facebook, Discord, YouTube, Twitter (X), GitHub. Không dùng text unicode giả icon, không bị sai màu.
  - Tích hợp banner chế độ Chỉ đọc cho Quản trị viên (Admin), chỉ cho phép Chủ sở hữu (Owner) chỉnh sửa và lưu.
- **Tạo `js/admin-settings.js`:**
  - Kết nối `/api/admin/settings`, đồng bộ dữ liệu vào form.
  - Thu nhỏ và cắt ảnh trực tiếp trên trình duyệt bằng Canvas trước khi tải lên (logo $\le 256$px, favicon vuông 64px) giúp tiết kiệm băng thông và tăng tốc tải.
  - Dirty state tracking: cảnh báo khi có thay đổi chưa lưu, vô hiệu hóa nút Lưu khi chưa thay đổi, hỗ trợ nút Hủy bỏ khôi phục giá trị gốc.
  - Đồng bộ sub-tab với URL hash (`#settings:general`, `#settings:appearance`, `#settings:email`, `#settings:security`), ghi nhớ tab khi tải lại trang.
- **Kết quả kiểm thử tự động (`tools/test-settings-ui.js`):**
  - **23/23 UI test PASS (100% ĐẠT):**
    - Kiểm tra tiêu đề tiếng Việt: PASS
    - Kích thước font chữ & chiều cao nút tiếp cận: PASS
    - 5 biểu tượng MXH bằng SVG chính hãng: PASS
    - Kiểm tra màu sắc nhãn MXH (không bị màu đỏ #e7616a): PASS
    - Chuyển 4 sub-tabs mượt mà: PASS
    - Dirty state & Hủy thay đổi: PASS
    - Dark mode tương phản tab được chọn: PASS
    - Responsive 390px trên điện thoại: PASS
    - Phân quyền Chỉ đọc đối với vai trò Admin: PASS
  - Đã chụp 4 ảnh nghiệm thu:
    - `tools/shots/settings_phase3_light_1440.png`
    - `tools/shots/settings_phase3_dark_1440.png`
    - `tools/shots/settings_phase3_light_390.png`
    - `tools/shots/settings_phase3_dark_390.png`

- [x] **GIAI ĐOẠN 0: AN TOÀN, BASELINE, KIỂM TRA MÂU THUẪN** (Hoàn thành)
- [x] **GIAI ĐOẠN 1: DATABASE VÀ BACKEND** (Hoàn thành - 35/35 test PASS)
- [x] **GIAI ĐOẠN 2: TỐI ƯU ẢNH LOGO VÀ FAVICON** (Hoàn thành - giảm 98% dung lượng)
- [x] **GIAI ĐOẠN 3: GIAO DIỆN TRANG SETTINGS** (Hoàn thành - 23/23 UI test PASS)
- [x] **GIAI ĐOẠN 4: ÁP DỤNG CẤU HÌNH LÊN TOÀN WEBSITE** (Hoàn thành - 15/15 test PASS)
- [ ] **GIAI ĐOẠN 5: DỌN KHUNG ADMIN VÀ CÁC LỖI ICON/LIÊN QUAN**
- [ ] **GIAI ĐOẠN 6: KIỂM TRA TỔNG VÀ HOÀN THIỆN**

---

## 6. KẾT QUẢ THỰC HIỆN GIAI ĐOẠN 4 (ÁP DỤNG CẤU HÌNH LÊN TOÀN WEBSITE)
- **Tạo `js/site-branding.js` (Cơ chế Cache-First thông minh):**
  - Đọc từ `localStorage.getItem('site_settings_cache')` để áp dụng ngay lập tức các thiết lập thương hiệu khi người dùng vừa mở trang, không chớp nháy (zero FOUC).
  - Nạp ngầm từ `/api/settings/public` và tự động cập nhật cache nếu có sự thay đổi.
  - Đồng bộ `document.title` theo `website_name` (hỗ trợ phân cách dấu `|` hoặc `-`).
  - Đồng bộ `<link rel="icon">` theo `favicon_url`.
  - Cập nhật logo & tên trên thanh điều hướng bên (Sidebar) và đầu trang (Header): `.sidebar-brand .brand-text strong`, `.sidebar-brand .brand-logo`, `.home-page__brand span strong`, `.home-page__brand-icon`.
  - Cập nhật bản quyền chân trang (Footer): `.admin-footer span:first-child`, `.home-page__footer-bottom span:first-child`.
  - Xử lý các liên kết mạng xã hội ở Footer `index.html`:
    - Chỉ hiển thị các kênh có URL hợp lệ (Facebook, Discord, YouTube, Twitter/X, GitHub).
    - Tự động ẩn các kênh có URL rỗng, tuyệt đối không để liên kết rác `href="#"`.
  - Áp dụng `default_theme` và `default_accent` làm mặc định hệ thống cho khách vãng lai nếu người dùng chưa chọn giao diện riêng trong `lib95:settings:data`.
  - Kiểm soát cổng đăng ký: Khi `allow_registration = false`, tự động hiển thị cảnh báo đỏ và khóa nút gửi tại `pages/auth/signup.html`.
- **Tích hợp vào `js/theme-init.js`:**
  - `theme-init.js` tự động tiêm nạp `site-branding.js` trên mọi trang ngay khi DOM sẵn sàng.
- **Kết quả kiểm thử tự động (`tools/test-branding-sync.js`):**
  - **15/15 test PASS (100% ĐẠT):**
    - Đổi tên website sang "9.5 AI Innovation Hub" -> Kiểm tra index.html, admin.html: PASS
    - Kiểm tra liên kết mạng xã hội (Facebook, Discord, GitHub hiển thị; YouTube, X bị ẩn): PASS
    - Kiểm tra chặn đăng ký trên signup.html: PASS
    - Khôi phục cấu hình gốc: PASS

- [x] **GIAI ĐOẠN 0: AN TOÀN, BASELINE, KIỂM TRA MÂU THUẪN** (Hoàn thành)
- [x] **GIAI ĐOẠN 1: DATABASE VÀ BACKEND** (Hoàn thành - 35/35 test PASS)
- [x] **GIAI ĐOẠN 2: TỐI ƯU ẢNH LOGO VÀ FAVICON** (Hoàn thành - giảm 98% dung lượng)
- [x] **GIAI ĐOẠN 3: GIAO DIỆN TRANG SETTINGS** (Hoàn thành - 23/23 UI test PASS)
- [x] **GIAI ĐOẠN 4: ÁP DỤNG CẤU HÌNH LÊN TOÀN WEBSITE** (Hoàn thành - 15/15 test PASS)
- [x] **GIAI ĐOẠN 5: DỌN KHUNG ADMIN VÀ CÁC LỖI ICON/LIÊN QUAN** (Hoàn thành - 5/5 test PASS)
- [ ] **GIAI ĐOẠN 6: KIỂM TRA TỔNG VÀ HOÀN THIỆN**

---

## 7. KẾT QUẢ THỰC HIỆN GIAI ĐOẠN 5 (DỌN KHUNG ADMIN VÀ CÁC LỖI ICON/LIÊN QUAN)
- **Sửa triệt để lỗi Icon Chuông thông báo (Bell icon) bị nhảy giật kích thước khi hover:**
  - `css/admin.css`: Sửa rule `.bell-icon:hover` từ `32×32px` về cố định `20×20px`, loại bỏ 100% hiện tượng xô lệch thanh topbar khi di chuột.
- **Sửa lỗi Topbar sticky che tiêu đề khi cuộn:**
  - Bổ sung `padding-top: 12px` và `scroll-margin-top: 85px` cho `.admin-page` trong `css/admin.css`, cùng với `scroll-margin-top: 80px` trong `css/admin-settings.css`.
- **Loại bỏ nút `.theme-button` chết ở topbar `pages/admin/admin.html`:**
  - Xóa bỏ nút không có sự kiện để giao diện sạch sẽ, chuyên nghiệp.
- **Khung Admin 100% Tiếng Việt chuẩn:**
  - Sidebar labels: Tổng quan (Dashboard), Quản lý học tập (LMS Manager), Kiểm duyệt cộng đồng (Community Moderation), Quản lý người dùng (User Management), Cài đặt hệ thống (Settings).
  - Khẩu hiệu Sidebar: "Tri thức vì một ngày mai tươi sáng".
  - Ô tìm kiếm: `placeholder="Tìm kiếm mọi thứ..."`.
  - Thông báo: "Thông báo", "Đánh dấu đã đọc", "Xem tất cả thông báo".
  - Menu người dùng: "Hồ sơ cá nhân", "Bảo mật tài khoản", "Đăng xuất".
  - Huy hiệu chức vụ: "Quản trị viên".
- **Siết chặt bảo vệ chuyển hướng Member trong admin:**
  - Head script trong `pages/admin/admin.html`: Chủ động kiểm tra role và `window.location.replace('../../index.html')` nếu là member hoặc chưa đăng nhập.
  - `js/admin-dashboard.js`: Khi API trả 403, tự động chuyển hướng về trang chủ sau 1 giây.
  - Gắn sự kiện đăng xuất cho liên kết "Đăng xuất", xóa sạch token và user, chuyển về trang đăng nhập.
- **Kết quả kiểm thử tự động (`tools/test-admin-polish.js`):**
  - **5/5 test PASS (100% ĐẠT):**
    - Loại bỏ nút theme chết: PASS
    - Icon chuông giữ nguyên 20px khi hover: PASS
    - Sidebar hiển thị 100% Tiếng Việt chuẩn: PASS
    - Menu người dùng hiển thị 100% Tiếng Việt chuẩn: PASS
    - Chặn và chuyển hướng tài khoản Member: PASS

---

## 8. KẾT QUẢ THỰC HIỆN GIAI ĐOẠN 6 (KIỂM TRA TỔNG VÀ HOÀN THIỆN)
- **Chạy toàn bộ 4 bộ kiểm thử tự động tuần tự qua `tools/run-all-settings-tests.js`:**
  - `Giai đoạn 1 (Backend & DB API)`: 35/35 test PASS (thời gian chạy: 0.54s)
  - `Giai đoạn 3 (Settings UI & Visual Testing)`: 23/23 test PASS (thời gian chạy: 9.06s)
  - `Giai đoạn 4 (Whole-Site Branding Sync)`: 15/15 test PASS (thời gian chạy: 6.67s)
  - `Giai đoạn 5 (Admin Frame Polish & Security)`: 5/5 test PASS (thời gian chạy: 4.70s)
  - **TỔNG KẾT:** 78/78 test PASS (100% ĐẠT TIÊU CHUẨN XUẤT SẮC).
- **Console logs trình duyệt:** Hoàn toàn sạch sẽ, không lỗi runtime, không cảnh báo FOUC.
- **Bảo toàn dữ liệu & Mã nguồn:**
  - Bản sao lưu CSDL gốc nguyên vẹn tại `tools/backup/backup_before_settings_1792315787059.json`.
  - File logo gốc `assets/icon/cool_book.png` (1.22 MB) được bảo toàn 100%.
  - Cấu trúc thư mục ngăn nắp, các file mới độc lập, tuân thủ kiến trúc mô-đun.
- **Xuất báo cáo nghiệm thu:** Đã hoàn thành báo cáo đầy đủ tại `tools/settings-report.md`.
