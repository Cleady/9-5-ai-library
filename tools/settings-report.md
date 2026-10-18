# BÁO CÁO NGHIỆM THU: HOÀN THIỆN TRANG CÀI ĐẶT HỆ THỐNG (ADMIN SETTINGS)
**Dự án:** 9.5 AI Library (Node.js + Express 5 + MySQL + HTML/CSS/JS thuần)  
**Ngày hoàn thành:** 18/10/2026  
**Trạng thái:** ✅ **HOÀN THÀNH 100% (78/78 Kiểm thử Tự động ĐẠT XUẤT SẮC)**

---

## 1. TỔNG QUAN DỰ ÁN VÀ MỤC TIÊU ĐÃ ĐẠT ĐƯỢC

Trang Cài đặt Hệ thống (`pages/admin/admin.html#page-settings`) trước đây chỉ là một bản phác thảo giao diện tĩnh (HTML hardcode, nút Save Changes và Upload không có sự kiện, không có CSDL, lỗi màu sắc icon nghiêm trọng, chữ quá nhỏ 7-8px, thanh topbar che tiêu đề, các quy tắc CSS bị trùng lặp 4 lần).

Sau quá trình nâng cấp toàn diện và có hệ thống qua 7 giai đoạn nghiêm ngặt:
1. **Lưu trữ CSDL thực tế:** Bảng `site_settings` lưu cấu hình hệ thống bằng MySQL chuẩn `key-value`.
2. **Phân quyền chặt chẽ:** Chủ sở hữu (**Owner**) toàn quyền xem và sửa; Quản trị viên (**Admin**) xem ở chế độ **Chỉ đọc (Read-only)**; Nhân viên (**Staff**) và Thành viên (**Member**) bị chặn hoàn toàn với mã lỗi HTTP 403.
3. **Tối ưu hóa tài nguyên:** Giảm kích thước ảnh thương hiệu từ **1.22 MB** xuống **27.9 KB** (giảm 98% băng thông tải trang) bằng các file tối ưu `cool_book_128.png`, `favicon-32.png`, `favicon-64.png` mà vẫn bảo toàn 100% file gốc.
4. **Giao diện chuẩn tiếp cận WCAG 2.1 AA:** Tạo `css/admin-settings.css` độc lập, loại bỏ triệt để lỗi màu chữ icon bị biến thành màu đỏ hồng (`#e7616a`), font chữ tối thiểu 12px, kích thước nút và input đạt chuẩn $\ge 40$px, hỗ trợ hoàn hảo Dark mode và Light mode, responsive mượt mà từ màn hình điện thoại 390px đến màn hình 1440px.
5. **Đồng bộ thương hiệu toàn website:** Script `js/site-branding.js` nạp qua `js/theme-init.js` tự động cập nhật tiêu đề trang (`<title>`), biểu tượng tab (`<link rel="icon">`), logo và tên website trên Sidebar/Header/Footer và các kênh mạng xã hội trên toàn bộ website.
6. **Khung Admin 100% Tiếng Việt:** Việt hóa chuẩn xác toàn bộ thanh điều hướng bên (Sidebar), menu tài khoản người dùng, sửa dứt điểm lỗi icon chuông nhảy giật kích thước khi hover và lỗi topbar che khuất tiêu đề khi cuộn.

---

## 2. KIẾN TRÚC HỆ THỐNG VÀ CƠ SỞ DỮ LIỆU

### 2.1. Cấu trúc bảng `site_settings`
Được định nghĩa tại `backend/config/initDb.js`:
```sql
CREATE TABLE IF NOT EXISTS site_settings (
  setting_key VARCHAR(100) PRIMARY KEY,
  setting_value TEXT NOT NULL,
  updated_by INT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_settings_updated_by FOREIGN KEY (updated_by) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

### 2.2. Dữ liệu cấu hình mặc định (Seed data)
| Khóa (`setting_key`) | Giá trị mặc định | Giải thích nghiệp vụ |
|---|---|---|
| `website_name` | `'9.5 AI CLUB'` | Tên thương hiệu hiển thị toàn hệ thống ($\le 60$ ký tự) |
| `short_description` | `'AI Learning Platform & Community for Students'` | Mô tả ngắn / Tagline ($\le 160$ ký tự) |
| `logo_url` | `'/assets/icon/cool_book_128.png'` | Đường dẫn logo website tối ưu |
| `favicon_url` | `'/assets/icon/favicon-32.png'` | Đường dẫn favicon tab trình duyệt tối ưu |
| `social_links` | `{"facebook":"","discord":"","youtube":"","x":"","github":""}` | JSON lưu trữ các liên kết mạng xã hội chính thức |
| `default_theme` | `'system'` | Giao diện mặc định (`system`, `light`, `dark`) |
| `default_accent` | `'blue'` | Màu nhấn mặc định (`blue`, `purple`, `green`, `orange`, `pink`) |
| `allow_registration` | `'true'` | Cho phép người dùng mới đăng ký tài khoản tự do |
| `require_approval` | `'true'` | Tài khoản mới đăng ký phải qua phê duyệt (trạng thái `pending`) |
| `min_password_length` | `'6'` | Độ dài mật khẩu tối thiểu khi đăng ký và đổi mật khẩu |
| `session_days` | `'1'` | Thời hạn phiên đăng nhập JWT (1 ngày, 7 ngày, 30 ngày) |

---

## 3. HỆ THỐNG API VÀ BẢO MẬT BACKEND

Toàn bộ các endpoint được định tuyến tại `backend/routes/settingsRoutes.js` và xử lý tại `backend/controllers/settingsController.js`:

### 3.1. Danh sách API Endpoints
1. **`GET /api/settings/public`** (Công khai, không cần đăng nhập):
   - Trả về cấu hình thương hiệu: `website_name`, `short_description`, `logo_url`, `favicon_url`, `social_links`, `default_theme`, `default_accent`, `allow_registration`.
   - **Bảo mật tuyệt đối:** KHÔNG trả về các khóa nhạy cảm như `require_approval`, `min_password_length`, `session_days`.
   - **Tối ưu hiệu năng:** Gắn bộ nhớ đệm (In-memory cache) 5 phút và header HTTP `Cache-Control: public, max-age=60`.
2. **`GET /api/admin/settings`** (Yêu cầu JWT: Admin hoặc Owner):
   - Trả về toàn bộ các khóa cài đặt.
   - Bổ sung trường `canEdit: req.user.role === 'owner'` để client hiển thị đúng trạng thái.
3. **`PUT /api/admin/settings`** (Yêu cầu JWT: **Chỉ Owner**):
   - Nhận payload JSON cập nhật các trường cấu hình.
   - Validate nghiêm ngặt: kiểm tra độ dài chuỗi, regex URL `http://` / `https://`, enum hợp lệ, chống XSS và ký tự điều khiển độc hại.
   - Thực thi cập nhật qua MySQL Transaction, tự động ghi nhật ký vào bảng `audit_logs`.
   - Làm mới bộ nhớ đệm public settings ngay lập tức.
4. **`POST /api/admin/settings/branding/:kind`** (Yêu cầu JWT: **Chỉ Owner**, `:kind` là `logo` hoặc `favicon`):
   - Sử dụng Multer lưu tệp vào thư mục an toàn `document/uploads/branding/`.
   - **Kiểm tra chữ ký tệp thực tế (Magic numbers):** Đọc buffer nhị phân để nhận diện PNG (`89 50 4E 47`), JPEG (`FF D8 FF`), WEBP (`52 49 46 46...57 45 42 50`). Chặn triệt để file EXE hoặc SVG chứa script trá hình đuôi ảnh.
   - Kiểm tra kích thước điểm ảnh thực tế (16px–1024px) và giới hạn dung lượng $\le 1$MB.
5. **`DELETE /api/admin/settings/branding/:kind`** (Yêu cầu JWT: **Chỉ Owner**):
   - Khôi phục logo về `/assets/icon/cool_book_128.png` hoặc favicon về `/assets/icon/favicon-32.png`.
   - Tự động xóa tệp ảnh tải lên cũ trên đĩa cứng để tránh lãng phí dung lượng lưu trữ.

### 3.2. Tích hợp cấu hình vào luồng xác thực hệ thống
- `backend/controllers/authController.js`:
  - Kiểm tra `allow_registration`: Nếu `false`, từ chối yêu cầu đăng ký mới với mã HTTP 403.
  - Kiểm tra `min_password_length`: Từ chối mật khẩu không đủ độ dài với mã HTTP 400.
  - Kiểm tra `require_approval`: Gán `status = 'pending'` nếu `true`, hoặc `status = 'active'` nếu `false`.
  - Sinh token JWT có thời hạn động dựa theo `session_days` (`1d`, `7d`, `30d`).
- `backend/controllers/userController.js`:
  - Áp dụng kiểm tra độ dài `min_password_length` khi người dùng thực hiện đổi mật khẩu cá nhân tại `/api/users/change-password`.

---

## 4. CHI TIẾT GIAO DIỆN VÀ TRẢI NGHIỆM NGƯỜI DÙNG (FRONTEND)

### 4.1. Hệ thống 4 Sub-Tabs chuẩn ARIA Tablist
Được xây dựng trên tiêu chuẩn ngữ nghĩa web (Semantic HTML) với các thuộc tính `role="tablist"`, `role="tab"`, `role="tabpanel"`, `aria-selected`, `aria-controls`:
1. **Thông tin chung (General Information):**
   - Ô nhập Tên website (tối đa 60 ký tự, có nhãn đếm và cảnh báo bắt buộc).
   - Ô nhập Mô tả ngắn (textarea 160 ký tự, tự động co giãn).
   - Khối nhận diện thương hiệu (Branding): 2 thẻ Logo và Favicon riêng biệt có khung xem trước họa tiết bàn cờ (checkerboard) cho ảnh trong suốt, nút "Tải ảnh lên..." và "Mặc định".
   - **Tiền xử lý Canvas phía trình duyệt:** Khi người dùng chọn ảnh, Canvas client-side tự động thu nhỏ và nén (Logo tối đa 256x256, Favicon cắt vuông 64x64) trước khi gửi lên server.
   - Danh sách Mạng xã hội: 5 hàng liên kết (Facebook, Discord, YouTube, Twitter/X, GitHub).
2. **Giao diện (Appearance):**
   - Chọn chủ đề mặc định: 3 thẻ trực quan (Hệ thống, Sáng, Tối) có biểu tượng minh họa.
   - Chọn màu nhấn chủ đạo: 5 mẫu màu tròn (Xanh lam, Tím, Xanh lá, Cam, Hồng) có viền lựa chọn.
3. **Email & Thông báo (Email):**
   - Bảng trạng thái trung thực: Huy hiệu `[Chưa kích hoạt]` và nhãn `[Sắp ra mắt]`.
   - Thẻ thông tin giải thích kiến trúc bảo mật: Xác thực hiện tại sử dụng phân quyền nội bộ, hạ tầng SMTP trong tương lai sẽ nạp qua `.env`, cam kết không lưu mật khẩu thư vào CSDL.
4. **Bảo mật & Phiên làm việc (Security):**
   - Công tắc chuyển đổi (Switch toggle): Cho phép đăng ký mới, Kiểm duyệt tài khoản mới.
   - Hộp chọn (Select): Độ dài mật khẩu tối thiểu (6, 8, 10, 12 ký tự).
   - Hộp chọn (Select): Thời hạn phiên đăng nhập JWT (1 ngày, 7 ngày, 30 ngày).
   - Ghi chú nhật ký kiểm toán (Audit logs).

### 4.2. Khắc phục triệt để các lỗi giao diện tồn đọng
- **Lỗi biểu tượng MXH và màu chữ đỏ hồng (#e7616a):**
  - Xóa bỏ hoàn toàn rule cũ `.settings-form>label>span { color: #e7616a }` trong `css/admin.css`.
  - Thay thế các ký tự Unicode ('f', '◈', '▶', '𝕏') bằng **SVG inline vector chính hãng** của Facebook, Discord, YouTube, X và GitHub với nền màu nhận diện thương hiệu chuẩn.
  - Màu chữ nhãn MXH luôn giữ màu chữ chính của hệ thống (`#0f172a` ở Light mode, `#f1f5f9` ở Dark mode).
- **Lỗi Icon Chuông nhảy giật khi Hover:**
  - Sửa rule `.bell-icon:hover` từ `32×32px` về cố định `20×20px`, giữ thanh topbar ổn định 100%.
- **Lỗi Topbar che tiêu đề khi cuộn:**
  - Bổ sung `padding-top: 12px` và `scroll-margin-top: 85px` cho các trang quản trị.
- **Loại bỏ nút theme chết:**
  - Xóa bỏ nút `.theme-button` không gắn sự kiện ở topbar.
- **Khung Admin 100% Tiếng Việt:**
  - Sidebar: Tổng quan, Quản lý học tập, Kiểm duyệt cộng đồng, Quản lý người dùng, Cài đặt hệ thống.
  - Menu người dùng: Hồ sơ cá nhân, Bảo mật tài khoản, Đăng xuất.

### 4.3. Quản lý trạng thái và trải nghiệm người dùng
- **Chế độ Chỉ đọc (Read-only) cho Admin:** Khi tài khoản có role `admin` đăng nhập, hiển thị thanh cảnh báo màu vàng, vô hiệu hóa toàn bộ input/select và ẩn nút Lưu thay đổi.
- **Theo dõi thay đổi (Dirty State Tracking):** Tự động phát hiện thay đổi so với dữ liệu ban đầu, kích hoạt đèn báo vàng `Có thay đổi chưa lưu`, bật nút `Lưu thay đổi` và nút `Hủy thay đổi`. Cảnh báo người dùng khi đóng tab trình duyệt nếu còn thay đổi chưa lưu.
- **Đồng bộ URL Hash:** Ghi nhớ sub-tab đang mở (`#settings:general`, `#settings:appearance`, `#settings:email`, `#settings:security`) khi F5 hoặc chuyển trang.

---

## 5. ĐỒNG BỘ THƯƠNG HIỆU TOÀN WEBSITE (WHOLE-SITE SYNC)

Được đảm nhiệm bởi mô-đun `js/site-branding.js` được tích hợp tự động qua `js/theme-init.js`:
- **Tiêu đề trang (`document.title`):** Tự động thay thế chuỗi tên cũ thành tên thương hiệu mới cấu hình (ví dụ: `Admin Dashboard | 9.5 AI Innovation Hub`).
- **Biểu tượng Favicon (`<link rel="icon">`):** Cập nhật động theo `favicon_url` trên mọi tab trình duyệt.
- **Thanh bên và đầu trang:** Tự động đồng bộ `.sidebar-brand .brand-text strong`, `.sidebar-brand .brand-logo`, `.home-page__brand span strong`, `.home-page__brand-icon`.
- **Chân trang (Footer):** Cập nhật năm và tên bản quyền tại `.admin-footer span:first-child` và `.home-page__footer-bottom span:first-child`.
- **Liên kết MXH tại Footer Landing Page (`index.html`):** Chỉ hiển thị các kênh có URL hợp lệ (`http://` hoặc `https://`), tự động ẩn các kênh có URL rỗng, không để liên kết rỗng `href="#"`.
- **Chủ đề mặc định hệ thống:** Áp dụng `default_theme` và `default_accent` cho khách vãng lai nếu chưa có cấu hình giao diện cá nhân trong `lib95:settings:data`.
- **Chặn đăng ký:** Tự động hiển thị cảnh báo đỏ và khóa nút gửi tại `pages/auth/signup.html` khi `allow_registration = false`.

---

## 6. KẾT QUẢ KIỂM THỬ TOÀN DIỆN (78/78 TEST PASS)

Toàn bộ 4 bộ kiểm thử tự động đã được chạy thông qua runner trung tâm `tools/run-all-settings-tests.js`:

```text
===============================================================
                  BẢNG TỔNG KẾT TOÀN DIỆN                      
===============================================================
┌─────────┬──────────────────────────────────────────────────────┬────────┬──────────┐
│ (index) │ name                                                 │ status │ duration │
├─────────┼──────────────────────────────────────────────────────┼────────┼──────────┤
│ 0       │ 'Giai đoạn 1: Backend & DB API Verification'         │ 'PASS' │ '0.54s'  │
│ 1       │ 'Giai đoạn 3: Settings UI & Visual Testing'          │ 'PASS' │ '9.06s'  │
│ 2       │ 'Giai đoạn 4: Whole-Site Branding Sync Testing'      │ 'PASS' │ '6.67s'  │
│ 3       │ 'Giai đoạn 5: Admin Frame Polish & Security Testing' │ 'PASS' │ '4.70s'  │
└─────────┴──────────────────────────────────────────────────────┴────────┴──────────┘

🎉 TOÀN BỘ 78 BÀI KIỂM THỬ ĐÃ ĐẠT 100% TIÊU CHUẨN XUẤT SẮC!
```

### Chi tiết 4 bộ test tự động:
1. **Bộ kiểm thử Backend & CSDL (`tools/verify-settings.js` - 35 tests):**
   - 6/6 test: Public GET API, trường dữ liệu an toàn, không lộ bí mật, Cache-Control.
   - 8/8 test: Phân quyền xem Admin Settings (chặn unauth 401, member 403, staff 403, admin 200 canEdit=false, owner 200 canEdit=true).
   - 10/10 test: PUT Admin Settings, validate tên rỗng, tên dài, URL hợp lệ, enum hợp lệ, chống XSS.
   - 6/6 test: Upload branding, phân quyền Owner, chặn EXE giả đuôi PNG, chặn SVG độc hại, khôi phục mặc định.
   - 5/5 test: Hiệu lực cấu hình bảo mật (`allow_registration`, `min_password_length`, `require_approval`, `session_days`).
2. **Bộ kiểm thử Giao diện Settings (`tools/test-settings-ui.js` - 23 tests):**
   - Tiêu đề Tiếng Việt $\ge 20$px, 4 sub-tabs ARIA chiều cao $\ge 40$px, ô nhập liệu $\ge 40$px.
   - 5 biểu tượng MXH bằng SVG chính hãng, không bị lỗi màu đỏ `#e7616a`.
   - Chuyển 4 sub-tabs mượt mà, dirty state hiển thị và kích hoạt nút Lưu.
   - Nút Hủy khôi phục dữ liệu gốc, Dark mode tương phản tốt, Mobile 390px cuộn ngang mượt mà.
   - Chế độ Chỉ đọc hiển thị banner vàng và vô hiệu hóa controls đối với Admin.
3. **Bộ kiểm thử Đồng bộ Toàn trang (`tools/test-branding-sync.js` - 15 tests):**
   - Đổi tên website thành công trên `index.html` và `admin.html` (tiêu đề trang, header, footer, bản quyền).
   - Kiểm tra liên kết MXH ở footer (kênh có URL hiển thị đúng link, kênh rỗng bị ẩn).
   - Kiểm tra chặn đăng ký trên `signup.html`.
   - Khôi phục cài đặt gốc thành công.
4. **Bộ kiểm thử Khung Admin & Bảo mật (`tools/test-admin-polish.js` - 5 tests):**
   - Loại bỏ nút theme chết.
   - Icon chuông giữ nguyên 20px khi hover, không bị nhảy giật.
   - Thanh điều hướng bên hiển thị 100% Tiếng Việt chuẩn.
   - Menu người dùng hiển thị 100% Tiếng Việt chuẩn.
   - Chặn và chuyển hướng tài khoản Member về `index.html`.

---

## 7. DANH SÁCH FILE VÀ ARTIFACTS ĐÃ TẠO / CẬP NHẬT

### 7.1. File mới tạo:
- `backend/controllers/settingsController.js`: Bộ điều khiển trung tâm xử lý cấu hình, upload ảnh, xóa ảnh.
- `backend/routes/settingsRoutes.js`: Khai báo tuyến đường API và cấu hình Multer.
- `css/admin-settings.css`: Bảng kiểu CSS hoàn chỉnh cho trang Settings (chuẩn WCAG AA).
- `js/admin-settings.js`: Xử lý giao diện, Canvas resize, Dirty state, Tab routing.
- `js/site-branding.js`: Đồng bộ thương hiệu toàn website với cơ chế Cache-First.
- `assets/icon/cool_book_128.png`: Ảnh logo tối ưu 128×128px (27.9 KB).
- `assets/icon/favicon-64.png`: Ảnh favicon 64×64px (8.45 KB).
- `assets/icon/favicon-32.png`: Ảnh favicon 32×32px (2.53 KB).
- `tools/backup/backup_before_settings_1792315787059.json`: Bản sao lưu 22 bảng CSDL gốc.
- `tools/verify-settings.js`: Bộ test tự động Backend & CSDL.
- `tools/test-settings-ui.js`: Bộ test tự động Giao diện Settings.
- `tools/test-branding-sync.js`: Bộ test tự động Đồng bộ thương hiệu.
- `tools/test-admin-polish.js`: Bộ test tự động Khung Admin.
- `tools/run-all-settings-tests.js`: Master test runner.
- `tools/settings-progress.md`: Nhật ký tiến độ chi tiết toàn bộ các giai đoạn.
- `tools/settings-report.md`: Báo cáo nghiệm thu hoàn chỉnh.
- `tools/shots/settings_phase3_*.png`: Bộ ảnh chụp nghiệm thu Desktop và Mobile (Light & Dark).

### 7.2. File cập nhật:
- `backend/config/initDb.js`: Tạo bảng `site_settings` và seed dữ liệu ban đầu.
- `backend/middlewares/authMiddleware.js`: Thêm middleware `isOwner`.
- `backend/server.js`: Mount `settingsRoutes` và bổ sung header `X-Content-Type-Options: nosniff`.
- `backend/controllers/authController.js`: Tích hợp các cài đặt bảo mật vào đăng ký và đăng nhập.
- `backend/controllers/userController.js`: Tích hợp `min_password_length` vào đổi mật khẩu.
- `pages/admin/admin.html`: Cập nhật cấu trúc HTML 4 sub-tabs, liên kết CSS/JS, Việt hóa khung admin.
- `css/admin.css`: Dọn dẹp mã trùng lặp, xóa bỏ rule đổi màu đỏ icon, sửa lỗi icon chuông nhảy giật.
- `js/theme-init.js`: Tích hợp nạp `site-branding.js` và áp dụng theme/accent mặc định hệ thống.
- `js/admin-dashboard.js`: Xử lý chuyển hướng khi gặp lỗi 403 và gắn sự kiện đăng xuất.
- `index.html`: Cập nhật liên kết MXH ở footer và tối ưu ảnh logo/favicon.
- 27 file HTML khác: Đồng bộ thẻ `<link rel="icon">` trỏ về `favicon-32.png`.

---

## 8. HƯỚNG DẪN KIỂM TRA NHANH (VERIFICATION STEPS CHO USER)

Người dùng có thể kiểm tra thực tế hệ thống bất kỳ lúc nào theo các bước sau:

1. **Khởi động máy chủ:**
   ```bash
   cd backend && node server.js
   ```
2. **Kiểm tra tự động toàn bộ 78 bài test:**
   ```bash
   node tools/run-all-settings-tests.js
   ```
3. **Kiểm tra trực quan trên trình duyệt:**
   - Mở `http://localhost:3000/pages/auth/login.html`
   - Đăng nhập với tài khoản Owner: truy cập `http://localhost:3000/pages/admin/admin.html#page-settings`
   - Kiểm tra 4 sub-tab: **Thông tin chung**, **Giao diện**, **Email**, **Bảo mật**.
   - Thử sửa Tên website hoặc đổi màu nhấn: Đèn báo `Có thay đổi chưa lưu` sáng lên, nút `Lưu thay đổi` kích hoạt.
   - Nhấn `Lưu thay đổi`: Toast thông báo thành công xuất hiện, tiêu đề tab trình duyệt và logo/sidebar tự động cập nhật ngay lập tức.
   - Đăng xuất và đăng nhập với tài khoản Admin: Truy cập lại trang Cài đặt hệ thống, thấy banner màu vàng thông báo **Chế độ Chỉ đọc**, toàn bộ các ô nhập liệu bị khóa và nút Lưu bị ẩn.
