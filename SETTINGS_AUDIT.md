# BÁO CÁO KHẢO SÁT CHI TIẾT TRANG SETTINGS & KIẾN TRÚC HỆ THỐNG
**Project:** 9-5-ai-library  
**Chế độ khảo sát:** Chỉ đọc (Read-only Audit)  
**Thời điểm thực hiện:** 17/10/2026  

---

## PHẦN A: CẤU TRÚC CHUNG

### 1. Cây thư mục của project (độ sâu 3 cấp, loại bỏ `node_modules` và `.git`)

```text
./
  .gitignore
  index.html
  README.md
  translate.py
  translate_2.py
  assets/
    icon/
      alert (1).png
      alert.png
      book.png
      calendar-icon.png
      chip.png
      community.png
      cool_book.png
      data.png
      favorite.png
      fire.png
      history.png
      home.png
      hover-bell-icon.png
      lectures.png
      mas.png
      math.png
      notification.png
      practise.png
      program.png
      resources.png
      reward.png
      search.png
      setting.png
      soft.png
      warning-danger.png
      Better_Icon/
      Green_Icon_theme/
      Purple_icon_theme/
    theme/
      background.png
      background1.png
      background2.png
      continue-thumb.png
      home_page_backgroud.png
      login.png
      login_page.png
      scene.png
      scene2.png
      darktheme/
  backend/
    .env
    package-lock.json
    package.json
    seed.js
    seedCommunity.js
    server.js
    test_phase4.js
    test_resources_api.js
    config/
      db.js
      initDb.js
    controllers/
      adminController.js
      authController.js
      communityController.js
      favoriteController.js
      lmsController.js
      resourceController.js
      userController.js
    data/
      lms-store.json
    middlewares/
      authMiddleware.js
    routes/
      adminRoutes.js
      authRoutes.js
      communityRoutes.js
      favoriteRoutes.js
      lmsRoutes.js
      resourceRoutes.js
      userRoutes.js
    storage/
      resources/
  css/
    admin.css
    auth-guard.css
    community.css
    favorites.css
    history.css
    home_page.css
    lectures.css
    login.css
    pass_recovery.css
    practice.css
    reset_pass.css
    resources.css
    settings.css
    signup.css
    style.css
  design/
    backend.png
    community.png
    favorite_design.png
    history.png
    home_product!.png
    lectures_design.png
    login_signup_design.png
    practice_design.png
    resource.png
    setting_design.png
  docs/
    9.5AI_Source_Website.docx
    maintheme.docx
    System_designer.docx
  document/
    Lectures/
      Ky_I/
      Ky_II/
      Uploads/
    Practice/
      Ky_I/
      Ky_II/
    uploads/
      community/
  home_page/
    home_page.html
    home_page.js
  js/
    admin-lms.js
    admin-users.js
    admin.js
    auth-guard.js
    auth.js
    community-core.js
    community-data.js
    community-feed.js
    community-groups.js
    community-interactions.js
    community-leaderboard.js
    community-nav.js
    community-notifications.js
    favorites-logic.js
    favorites-ui.js
    history.js
    home_page.js
    lecture-notes.js
    lecture-player.js
    lectures-core.js
    lectures-data.js
    lectures-list.js
    login.js
    main.js
    practice-core.js
    practice-data.js
    practice-list.js
    practice-quiz.js
    resources.js
    resources.js.bak
    settings-account.js
    settings-appearance.js
    settings-core.js
    settings-data.js
    settings-preferences.js
    settings-profile.js
    settings-support.js
    signup.js
    syncProfile.js
  pages/
    favorites.html
    history.html
    admin/
      admin.html
    auth/
      forgot_pass.html
      login.html
      reset_pass.html
      send_email.html
      signup.html
    community/
      community-discussions.html
      community-feed.html
      community-groups.html
      community-leaderboard.html
      community-notifications.html
      community-search.html
      discussion-detail.html
    lectures/
      lecture.html
      lectures.html
      next-lectures.html
      resources.html
      subject.html
    practice/
      practice-quiz-intro.html
      practice-quiz.html
      practice-result.html
      practice-subject.html
      practice.html
    settings/
      settings.html
```

---

### 2. Thành phần file và Cơ chế chuyển Tab của trang Settings

#### Các file cấu thành trang Settings:
- **HTML:**
  - `pages/settings/settings.html`
- **CSS:**
  - `/css/style.css` (khung giao diện chung, sidebar chính, topbar)
  - `/css/settings.css` (giao diện riêng cho Settings, sub-sidebar, form, cards, modals)
  - External CDN: `https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.5.13/cropper.min.css` (dành cho modal crop avatar)
  - Inline `<style>` trong `pages/settings/settings.html` (dòng 15–22): định dạng bo tròn cropper, khung camera video và lỗi.
- **JS:**
  - `/js/main.js` (xử lý dropdown user menu, dropdown chuông thông báo, phím tắt Ctrl+K)
  - `/js/settings-data.js` (khởi tạo defaultData giả lập: user, appearance, notifications, privacy, storage, faq)
  - `/js/settings-core.js` (quản trị lớp storage `lib95:settings:data`, hash routing, mở/đóng modal, hiển thị toast)
  - `/js/settings-profile.js` (xử lý form Profile, upload ảnh, webcam camera, cropper, gửi API cập nhật profile)
  - `/js/settings-account.js` (hiển thị email, modal đổi mật khẩu giả lập, toggle 2FA autosave, render connected accounts)
  - `/js/settings-appearance.js` (xử lý radio theme, swatches màu accent, radio font-size, radio background style)
  - `/js/settings-preferences.js` (xử lý autosave các công tắc Notifications & Privacy, modal xóa tài khoản)
  - `/js/settings-support.js` (render thanh dung lượng storage, giả lập clear cache, accordion FAQ, mở các modal Contact/Report/Docs)
  - `../../js/syncProfile.js` (đồng bộ tên hiển thị, avatar, role badge từ `localStorage.getItem('user')` lên topbar và kiểm tra ban ngầm)
  - External CDN: `https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.5.13/cropper.min.js`

#### Cơ chế dựng và chuyển đổi các Tab:
Các tab **không dùng render động toàn bộ bằng JS** và **không dùng SPA Framework**, mà kết hợp giữa **Tĩnh trong HTML** và **Hash Routing điều khiển thuộc tính `hidden`**:

1. **Dựng giao diện (Cấu trúc DOM tĩnh):**
   Tất cả 7 panel đều được viết sẵn trực tiếp trong `pages/settings/settings.html` dưới dạng các thẻ `<section class="set-panel set-card" id="panel-{hash}" hidden>`:
   - Profile: `id="panel-profile"` (dòng 274)
   - Account: `id="panel-account"` (dòng 324)
   - Appearance: `id="panel-appearance"` (dòng 379)
   - Notifications: `id="panel-notifications"` (dòng 493)
   - Privacy: `id="panel-privacy"` (dòng 578)
   - Data & Storage: `id="panel-storage"` (dòng 650)
   - Help & Support: `id="panel-support"` (dòng 684)

2. **Cơ chế chuyển đổi (Hash Routing + Ẩn/Hiện bằng thuộc tính HTML `hidden`):**
   Trong `js/settings-core.js` (hàm `handleHashChange`, dòng 116–154):
   - Lắng nghe sự kiện: `window.addEventListener("hashchange", handleHashChange);` (dòng 154) và kích hoạt lần đầu khi `DOMContentLoaded` (dòng 177).
   - Lấy giá trị hash từ URL: `let hash = window.location.hash.replace("#", "");` nếu rỗng hoặc không hợp lệ thì mặc định là `"profile"` (dòng 117–121).
   - Ẩn/hiện panel: 
     ```javascript
     // js/settings-core.js (dòng 148-150)
     document.querySelectorAll(".set-panel").forEach(panel => {
       panel.hidden = panel.id !== `panel-${hash}`;
     });
     ```
   - Chuyển class active trên sub-sidebar:
     ```javascript
     // js/settings-core.js (dòng 143-145)
     document.querySelectorAll(".set-nav-item").forEach(item => {
       item.classList.toggle("is-active", item.dataset.panel === hash);
     });
     ```
   - Cập nhật tiêu đề và mô tả phụ (`#set-page-title`, `#set-page-subtitle`) từ từ điển `panelTitles[hash]` (dòng 135–140).
   - Riêng một số phần tử con bên trong panel được render bằng JS khi tải trang: FAQ (`loadFaq()` trong `settings-support.js`), Storage items (`loadStorage()` trong `settings-support.js`), Connected accounts (`loadAccount()` trong `settings-account.js`).

---

### 3. File JS/CSS dùng chung giữa các trang

Dựa trên kết quả rà soát tất cả các file HTML trong toàn bộ project:

#### File CSS dùng chung:
- **`/css/style.css`**:
  - **Phạm vi nạp:** Nạp ở hầu hết các trang chính của ứng dụng (`home_page/home_page.html`, `pages/settings/settings.html`, `pages/favorites.html`, `pages/history.html`, toàn bộ các trang con trong `pages/lectures/` và `pages/practice/`, toàn bộ các trang con trong `pages/community/`).
  - **Trang KHÔNG nạp:** `index.html` (dùng `css/home_page.css`), `pages/admin/admin.html` (dùng `css/admin.css`), các trang xác thực `pages/auth/*` (dùng `login.css`, `signup.css`, `reset_pass.css`, `pass_recovery.css`), và các file câu hỏi độc lập trong `document/Practice/*`.
  - **Nhiệm vụ:** Thiết lập biến `:root`, background body toàn site, khung layout 2 cột (`.app`, `.sidebar`, `.main`), cấu trúc thanh điều hướng sidebar và topbar header, brand logo, search bar, dropdown user menu, dropdown notifications.

#### File JS dùng chung:
- **`syncProfile.js`**:
  - **Phạm vi nạp:** Nạp tại **gần như mọi trang** của hệ thống (`home_page`, `pages/settings`, `pages/community/*`, `pages/favorites`, `pages/history`, `pages/lectures/*`, `pages/practice/*`, `pages/admin/admin.html`, và cả các trang auth `pages/auth/*`). Chỉ không nạp ở `index.html` và `document/Practice/*`.
  - **Nhiệm vụ:** 
    1. Đọc `localStorage.getItem('user')` và render tên người dùng (`.user-name`), chữ cái/ảnh đại diện (`.user-avatar`), badge quyền hạn (`.role-badge`).
    2. Tự động chèn liên kết "Manage" vào user dropdown nếu người dùng có vai trò `admin`, `owner`, hoặc `staff` (dòng 40–56).
    3. Chạy hàm ngầm `autoSyncUser()` gọi `GET /api/users/me` với Bearer token để cập nhật role/avatar mới nhất từ database và hiển thị overlay chặn nếu tài khoản bị khóa (`status === 'banned'`) (dòng 70–97).
- **`/js/main.js`**:
  - **Phạm vi nạp:** Nạp ở các trang ứng dụng tiêu chuẩn (`home_page`, `pages/settings`, `pages/community/*`, `pages/favorites`, `pages/history`, `pages/lectures/*` [ngoại trừ `resources.html`], `pages/practice/*`).
  - **Trang KHÔNG nạp:** `pages/lectures/resources.html`, `pages/admin/admin.html`, `index.html`, và các trang `pages/auth/*`.
  - **Nhiệm vụ:** 
    1. Quản lý tương tác đóng/mở dropdown của Topbar: User Menu (`initUserMenu()`, dòng 56–58) và Notifications Panel (`initNotifications()`, dòng 60–77).
    2. Nút "Mark as read" trong panel thông báo (xóa class `.is-unread`, ẩn `.notification-dot`).
    3. Phím tắt toàn cục `Ctrl + K` focus vào ô tìm kiếm (`initSearchShortcut()`, dòng 80–90).

---

### 4. Nơi lưu trữ dữ liệu người dùng & Cài đặt (Storage, Cookies, Backend API)

#### A. `localStorage` (Toàn bộ các key đang được sử dụng trong codebase):

| Tên Key | File & Dòng đọc/ghi | Ý nghĩa và mục đích sử dụng |
| :--- | :--- | :--- |
| `token` | `js/auth.js:83` (ghi)<br>`js/settings-profile.js:252` (đọc)<br>`js/syncProfile.js:71` (đọc)<br>`js/admin-users.js:98` (đọc)<br>`js/resources.js:55` (đọc)... | Chuỗi JWT token xác thực phiên đăng nhập của người dùng. Dùng để gửi header `Authorization: Bearer <token>` lên backend API. |
| `user` | `js/auth.js:84` (ghi khi login)<br>`js/settings-profile.js:275` (ghi khi sửa profile)<br>`js/syncProfile.js:83` (ghi khi auto-sync)<br>`js/settings-data.js:85` (đọc)<br>`js/settings-profile.js:47` (đọc)<br>`js/settings-account.js:26` (đọc) | Object JSON chứa thông tin người dùng đang đăng nhập: `{ id, username, full_name, role, status, bio, avatar_url }`. Là nguồn dữ liệu duy nhất cho profile thực tế. |
| `lib95:settings:data` | `js/settings-core.js:11, 22, 41` (đọc/ghi)<br>`js/settings-preferences.js:99` (xóa khi mock delete) | Object JSON lưu toàn bộ cài đặt giả lập của trang Settings (theme, accentColor, fontSize, backgroundStyle, notifications, privacy, account 2FA, storage mock, faq). |
| `lib95:history:note:{recordId}` | `js/history.js:227, 237` (đọc/ghi) | Lưu ghi chú cá nhân của người dùng cho từng lượt làm bài/học tập trong trang History. |
| `lib95:lectures:completed` | `js/lectures-core.js:121, 130` (đọc/ghi thông qua prefix) | Danh sách ID các bài giảng đã xem xong để tính tiến độ mở khóa. |
| `lib95:lectures:note:{lectureId}` | `js/lecture-notes.js:36, 45` (đọc/ghi) | Nội dung ghi chú HTML của người dùng trong tab Notes của bài giảng. |
| `lib95:practice:attempts` | `js/practice-core.js:40, 52` (đọc/ghi thông qua prefix) | Lịch sử các lần nộp bài trắc nghiệm practice. |
| `lib95:favorites:data`<br>`lib95:favorites:subjects`<br>`lib95:favorites:lectures:subjects` | `js/favorites-logic.js:14-16`<br>`js/lectures-core.js:173-175` (removeItem) | Các key cũ của phân hệ Favorites trước khi chuyển sang lưu trên Database MySQL; hiện tại code có lệnh xóa dọn rác các key này. |

#### B. `sessionStorage`:
- **`redirectUrl`** (`js/auth-guard.js:101`): Lưu URL trang người dùng đang muốn truy cập khi chưa đăng nhập, để sau khi đăng nhập thành công sẽ chuyển hướng trở lại.

#### C. `cookie`:
- Không có bất kỳ dòng code nào sử dụng `document.cookie` trong toàn bộ project frontend. Backend Express cũng không dùng cookie-parser.

#### D. Backend / Database / API:
Hệ thống có backend Node.js (Express + MySQL qua thư viện `mysql2/promise`), cấu hình tại `backend/server.js`.
Các endpoint liên quan trực tiếp tới User và Settings:
- **`POST /api/auth/login`** (`backend/routes/authRoutes.js:5`): Đăng nhập, trả về `token` và thông tin `user`.
- **`POST /api/auth/register`** (`backend/routes/authRoutes.js:6`): Đăng ký tài khoản mới (mặc định chờ duyệt).
- **`GET /api/users/me`** (`backend/routes/userRoutes.js:6` -> `controllers/userController.js:23`): Lấy thông tin user hiện tại (`id, username, full_name, role, status, bio, avatar_url`).
- **`PUT /api/users/profile`** (`backend/routes/userRoutes.js:7` -> `controllers/userController.js:4`): Nhận `{ full_name, bio, avatar_url }` và lưu trực tiếp vào bảng `users` trong MySQL.
- **LƯU Ý:** Backend **HOÀN TOÀN CHƯA CÓ** bất kỳ endpoint nào lưu trữ cài đặt giao diện (theme, accent color, font size), thông báo (notifications), quyền riêng tư (privacy), bảo mật 2FA, hoặc xoá tài khoản (`DELETE`). Tất cả các mục này hiện tại 100% chỉ chạy cục bộ ở frontend thông qua `localStorage['lib95:settings:data']`.

---

## PHẦN B: GIAO DIỆN (THEME, MÀU, FONT, NỀN)

### 5. Cách định nghĩa màu sắc trong CSS & Thống kê màu viết cứng

#### Định nghĩa biến CSS:
CSS có khai báo CSS Variables trong khối `:root` ở đầu file `css/style.css` (dòng 2–11):
```css
/* css/style.css (dòng 2-11) */
:root {
    --color-primary: #1d4ed8;
    --color-primary-light: #3b82f6;
    --color-primary-soft: #eff6ff;
    --color-bg: #f5f8ff;
    --color-text: #0f172a;
    --color-text-muted: #64748b;
    --color-white: #ffffff;
    --color-nav-text: #475569;
}
```
Tại `css/settings.css` (dòng 4–13), bổ sung thêm các biến cục bộ:
```css
/* css/settings.css (dòng 4-13) */
:root {
  --set-card-bg: rgba(255, 255, 255, 0.6);
  --set-card-blur: blur(12px);
  --set-card-border: 1px solid rgba(255, 255, 255, 0.8);
  --set-card-shadow: 0 4px 16px rgba(29, 78, 216, 0.06);
  --set-border-color: rgba(15, 23, 42, 0.1);
  --set-nav-hover: rgba(59, 130, 246, 0.1);
  --set-danger-color: #ef4444;
  --set-success-color: #22c55e;
}
```

#### Tình trạng viết cứng mã màu rải rác:
Mặc dù có khai báo biến trong `:root`, mã nguồn CSS bị tình trạng **viết cứng mã màu trực tiếp (hardcoded colors) rất nặng**. 
Thống kê quét toàn bộ thư mục `css/`:
- **Tổng số lần sử dụng hàm `var()`:** 764 lần.
- **Tổng số vị trí viết cứng các sắc thái màu xanh chủ đạo (`#1d4ed8`, `#3b82f6`, `#2563eb`, `#0d6efd`, `rgba(29, 78, 216, ...)`, `rgba(59, 130, 246, ...)`...):** **217 vị trí** trên **15 file CSS**.
- **Tỉ lệ viết cứng:** Ước tính khoảng **22% - 28%** các khai báo màu liên quan đến màu xanh thương hiệu không thông qua biến CSS mà viết cứng trực tiếp vào `background`, `border`, `box-shadow`, `color`.

Chi tiết số vị trí viết cứng màu xanh chủ đạo theo từng file:
1. `css/lectures.css`: **34 vị trí** (ví dụ: `--lec-color-inprogress: #2563eb;`, shadow `rgba(29, 78, 216, 0.05)`, viền `rgba(59, 130, 246, 0.15)`)
2. `css/style.css`: **32 vị trí** (ví dụ: dòng 78 `rgba(29, 78, 216, 0.08)`, dòng 130 `rgba(59, 130, 246, 0.1)`, dòng 144 gradient `#dbeafe` -> `#eff6ff`)
3. `css/history.css`: **29 vị trí** (tự định nghĩa lại `--his-blue: #2563eb;`, gradient `#3b82f6` -> `#1d4ed8`)
4. `css/admin.css`: **20 vị trí** (tự định nghĩa lại `--admin-shadow: rgba(29, 78, 216, .09);`, gradient `#5bb3ff` -> `#1d4ed8`)
5. `css/community.css`: **18 vị trí** (gradient `#dbeafe`, shadow `rgba(59, 130, 246, 0.25)`, nền `#eff6ff`)
6. `css/favorites.css`: **18 vị trí** (shadow `rgba(29, 78, 216, 0.08)`, gradient `#bfdbfe` -> `#60a5fa`)
7. `css/practice.css`: **15 vị trí** (shadow `rgba(29, 78, 216, 0.07)`, shadow `rgba(29, 78, 216, 0.3)`)
8. `css/home_page.css`: **14 vị trí** (tự tạo `--home-blue: #2563eb;`, fill `rgba(37, 99, 235, 0.12)`)
9. `css/pass_recovery.css`: **9 vị trí**
10. `css/resources.css`: **6 vị trí**
11. `css/login.css`: **6 vị trí**
12. `css/signup.css`: **6 vị trí**
13. `css/settings.css`: **4 vị trí** (dòng 8 `--set-card-shadow`, dòng 10 `--set-nav-hover`, dòng 133 viền focus `rgba(59, 130, 246, 0.2)`)
14. `css/reset_pass.css`: **4 vị trí**
15. `css/auth-guard.css`: **2 vị trí**

---

### 6. Đánh giá chi tiết từng mục trong Tab Appearance

#### A. Theme (Light / Dark / Auto):
- **Bấm vào có tác dụng gì:** 
  Trong `js/settings-appearance.js` (dòng 21–30):
  - Chọn `Dark`: gắn thuộc tính `data-theme="dark"` lên thẻ `<html>` (`htmlNode.setAttribute("data-theme", "dark")`).
  - Chọn `Light`: gỡ thuộc tính `data-theme` khỏi thẻ `<html>` (`htmlNode.removeAttribute("data-theme")`).
  - Chọn `Auto`: kiểm tra qua `sysThemeMatcher = window.matchMedia("(prefers-color-scheme: dark)")`. Nếu hệ điều hành đang bật dark mode thì gắn `data-theme="dark"`, ngược lại gỡ bỏ (dòng 23–25). Có đăng ký lắng nghe thay đổi của hệ thống: `sysThemeMatcher.addEventListener("change", ...)` (dòng 99–104).
- **Có lưu và áp dụng lại khi reload không:**
  - **Trên trang Settings:** CÓ lưu vào `localStorage['lib95:settings:data']` và khi reload trang Settings, hàm `loadAppearanceUI()` (dòng 51–66) đọc lại và kích hoạt lại.
  - **Ở các trang khác:** **KHÔNG HỀ ÁP DỤNG ĐƯỢC!** Vì không có bất kỳ trang nào khác nạp `settings-appearance.js` hay `settings-core.js`. Khi sang trang khác hoặc reload ở trang khác, thẻ `<html>` không được gắn `data-theme="dark"`, giao diện quay lại sáng 100%.
  - **Khuyết tật CSS:** Ngay tại file `css/settings.css` (dòng 787–843), các selector `html[data-theme="dark"]` chỉ được viết cục bộ cho riêng trang Settings (đúng như chú thích ở dòng 787: *"Scoped to settings UI only as per design"*). Khi Dark Theme bật, dòng 789–792 gỡ bỏ luôn ảnh nền: `background-image: none; background-color: #0f172a;` chứ không nạp ảnh nền tối `dark_background.png`!

#### B. Accent color (5 màu: Blue `#1d4ed8`, Purple `#7c3aed`, Green `#059669`, Orange `#ea580c`, Pink `#db2777`):
- **Bấm vào có đổi gì không:** 
  Trong `js/settings-appearance.js` (dòng 41):
  `htmlNode.style.setProperty("--color-primary", colorMap[appearanceObj.accentColor]);`
  Có đổi giá trị biến inline `--color-primary` trên phần tử `<html>`.
- **Màu đang được áp dụng vào những phần tử nào:**
  Chỉ những phần tử dùng biến `var(--color-primary)` mới đổi màu (ví dụ: nút bấm `.set-btn-primary`, chữ của tab sub-sidebar đang active `.set-nav-item.is-active`, thanh dung lượng `.set-storage-bar`).
- **Khuyết tật lớn:** 
  Các biến liên quan như `--color-primary-light` (`#3b82f6`) và `--color-primary-soft` (`#eff6ff`) **không hề được đổi theo**! Toàn bộ 217 vị trí mã màu xanh viết cứng và toàn bộ icon dạng ảnh PNG vẫn giữ nguyên màu xanh dương. Ở các trang khác, màu accent này hoàn toàn biến mất do không có script khởi tạo nạp biến.

#### C. Font size (Small / Medium / Large):
- **Đã áp dụng thật chưa, bằng cách nào:**
  Trong `js/settings-appearance.js` (dòng 45): gán thuộc tính `htmlNode.setAttribute("data-fontsize", appearanceObj.fontSize)`.
  Trong `css/settings.css` (dòng 855–865):
  ```css
  html[data-fontsize="small"] body { font-size: 14px; }
  html[data-fontsize="medium"] body { font-size: 16px; }
  html[data-fontsize="large"] body { font-size: 18px; }
  ```
- **CSS dùng đơn vị `rem` hay `px`:**
  CSS dùng **100% đơn vị `px` cứng**, hoàn toàn **không dùng `rem`**!
  (Quét thực tế: `css/style.css` có 410 chỗ dùng `px` và **0** chỗ dùng `rem`; `css/settings.css` có 206 chỗ dùng `px` và **0** chỗ dùng `rem`).
- **Hệ quả:** Do hầu hết các class phần tử (tiêu đề, nhãn, nút bấm, ô input, text phụ...) đều đã bị gán cứng kích thước bằng `px` (như `font-size: 14px;`, `font-size: 18px;`, `font-size: 12px;`), việc đổi `font-size` trên thẻ `body` gần như **không có tác dụng** lên các thành phần giao diện, ngoại trừ một vài đoạn văn bản thuần tuý không có class CSS riêng.

#### D. Background style (Default / Blurred):
- **Đã hoạt động chưa:** Chưa hoạt động đúng thực tế.
- **Cách gán:** 
  Trong `js/settings-appearance.js` (dòng 48): gán `htmlNode.setAttribute("data-bgstyle", appearanceObj.backgroundStyle)`.
  Trong `css/settings.css` (dòng 845–852):
  ```css
  html[data-bgstyle="blurred"] body::before {
    content: '';
    position: fixed;
    inset: 0;
    background: inherit;
    backdrop-filter: blur(10px);
    z-index: -1;
  }
  ```
- **Lỗi kỹ thuật:** 
  1. Thẻ `body` hiện đang mang `background-image: url("/assets/theme/background.png");` (`css/style.css:33`). Pseudo-element `body::before` nằm bên dưới nội dung và gán `z-index: -1`, `background: inherit`, việc áp dụng `backdrop-filter: blur(10px)` ở lớp này không tạo ra hiệu ứng làm mờ ảnh nền một cách rõ ràng và ổn định trên các trình duyệt.
  2. Khi `data-theme="dark"` được bật, `body` bị xóa ảnh nền (`background-image: none`), khiến tùy chọn `Blurred` trở nên vô nghĩa.
  3. Tại `pages/settings/settings.html` (dòng 474 và 482), thẻ preview ảnh nền đang viết đường dẫn sai: `url('assets/theme/background.png')` (thiếu dấu gạch chéo đầu `/`), dẫn đến việc trình duyệt tìm ở `/pages/settings/assets/...` và báo lỗi 404 console, làm ô preview bị vỡ ảnh.

---

### 7. Khảo sát Kho Icon & Ảnh theo Theme/Màu sắc

#### A. Cây thư mục đầy đủ của Icon & Theme:

```text
assets/
├── icon/
│   ├── alert (1).png
│   ├── alert.png
│   ├── book.png
│   ├── calendar-icon.png
│   ├── chip.png
│   ├── community.png
│   ├── cool_book.png
│   ├── data.png
│   ├── favorite.png
│   ├── fire.png
│   ├── history.png
│   ├── home.png
│   ├── hover-bell-icon.png
│   ├── lectures.png
│   ├── mas.png
│   ├── math.png
│   ├── notification.png
│   ├── practise.png
│   ├── program.png
│   ├── resources.png
│   ├── reward.png
│   ├── search.png
│   ├── setting.png
│   ├── soft.png
│   ├── warning-danger.png
│   │
│   ├── Better_Icon/               (47 files)
│   │   ├── artificial-intellegence.png
│   │   ├── avatar.png
│   │   ├── bookmark.png
│   │   ├── calendar.png
│   │   ├── calendar2.png
│   │   ├── communication.png
│   │   ├── document.png
│   │   ├── email.png
│   │   ├── email2.pdn            <-- File nguồn Paint.NET thừa
│   │   ├── email2.png
│   │   ├── email4.png
│   │   ├── email6.png
│   │   ├── email_sent.png
│   │   ├── file.png
│   │   ├── file2.png
│   │   ├── flame.png
│   │   ├── folder.png
│   │   ├── future (1).png
│   │   ├── future.png
│   │   ├── group.png
│   │   ├── heart.png
│   │   ├── history.png
│   │   ├── home-button.png
│   │   ├── home.png
│   │   ├── house.png
│   │   ├── lock.png
│   │   ├── locked.png
│   │   ├── locked2.png
│   │   ├── logout.png
│   │   ├── mail.png
│   │   ├── mail_sent.png
│   │   ├── media.png
│   │   ├── padlock.png
│   │   ├── profile (1).png
│   │   ├── profile.png
│   │   ├── rocket.png
│   │   ├── search.png
│   │   ├── sent.png
│   │   ├── settings.png
│   │   ├── star.png
│   │   ├── sustainable-development.png
│   │   ├── time-planning (1).png
│   │   ├── time-planning.png
│   │   ├── user.png
│   │   ├── writing.png
│   │   ├── writing2.png
│   │   └── writing3.png
│   │
│   ├── Green_Icon_theme/          (47 files)
│   │   └── [47 files tên giống hệt Better_Icon]
│   │
│   └── Purple_icon_theme/         (47 files)
│       └── [47 files tên giống hệt Better_Icon]
│
└── theme/
    ├── background.png             (Ảnh nền mặc định - Light)
    ├── background1.png
    ├── background2.png
    ├── continue-thumb.png
    ├── home_page_backgroud.png
    ├── login.png
    ├── login_page.png
    ├── scene.png
    ├── scene2.png                 (Ảnh banner Knowledge for a better tomorrow)
    │
    └── darktheme/                 (4 files)
        ├── dark-continue-thumb.png
        ├── dark-scene.png
        ├── dark-scene2.png        (Bản tối của banner promo)
        └── dark_background.png    (Bản tối của ảnh nền body)
```

#### B. Quy ước đặt tên, cấu trúc thư mục & Sự bất nhất nghiêm trọng:
1. **Cấu trúc thư mục:** Tách theo các folder chủ đề màu (`Better_Icon` đóng vai trò là icon màu xanh Blue mặc định, `Green_Icon_theme` cho màu Xanh lá, `Purple_icon_theme` cho màu Tím).
2. **Thiếu hụt bộ màu:** Trong Settings có **5 màu accent** (`blue`, `purple`, `green`, `orange`, `pink`). Tuy nhiên trong thư mục `assets/icon/` **chỉ có 3 folder** (`Better_Icon`, `Green_Icon_theme`, `Purple_icon_theme`). **Hoàn toàn KHÔNG CÓ thư mục icon cho màu Cam (Orange) và Hồng (Pink)**.
3. **Bất nhất nội dung file giữa các bộ icon (Phát hiện quan trọng):**
   Kiểm tra so sánh mã băm/dung lượng byte của từng file giữa 3 thư mục:
   - Danh sách tên file của cả 3 thư mục giống nhau 100% (47 file), và đều bị dính 1 file rác đồ họa `email2.pdn` (Paint.NET).
   - Tuy nhiên, so sánh giữa `Better_Icon` và `Green_Icon_theme`: Có tới **45 / 47 file trùng kích thước từng byte** (chỉ có duy nhất 2 file `artificial-intellegence.png` và `document.png` là có dung lượng khác).
   - So sánh giữa `Better_Icon` và `Purple_icon_theme`: Có tới **46 / 47 file trùng kích thước từng byte** (chỉ có duy nhất 1 file `media.png` là có dung lượng khác).
   - **Kết luận:** Người dùng mới chỉ thực sự đổi màu được 2 icon cho bộ Green và 1 icon cho bộ Purple; 44 file còn lại trong cả 2 thư mục thực chất là file copy nguyên bản từ `Better_Icon` (vẫn mang màu xanh dương).

#### C. Cách nhúng icon vào trang và các file viết cứng đường dẫn:
Dự án sử dụng kết hợp 3 hình thức nhúng icon, **hoàn toàn không có Icon Font** (không dùng FontAwesome hay Material Icons):

1. **CSS `background-image` (Chiếm đa số ở Sidebar và Header chung):**
   - Viết cứng trong `css/style.css`:
     - Dòng 164: `.brand-logo { background-image: url("/assets/icon/cool_book.png"); }`
     - Dòng 208: `.home-icon { background-image: url(/assets/icon/Better_Icon/home-button.png); }`
     - Dòng 215: `.lectures-icon { background-image: url(/assets/icon/Better_Icon/media.png); }`
     - Dòng 222: `.practice-icon { background-image: url(/assets/icon/Better_Icon/writing.png); }`
     - Dòng 229: `.history-icon { background-image: url(/assets/icon/Better_Icon/history.png); }`
     - Dòng 236: `.favorites-icon { background-image: url(/assets/icon/Better_Icon/star.png); }`
     - Dòng 243: `.resources-icon { background-image: url(/assets/icon/Better_Icon/folder.png); }`
     - Dòng 250: `.community-icon { background-image: url(/assets/icon/Better_Icon/group.png); }`
     - Dòng 257: `.settings-icon { background-image: url(/assets/icon/Better_Icon/settings.png); }`
     - Dòng 277: `.sidebar-promo { background-image: url("../assets/theme/scene2.png"); }`
   - Viết cứng trong `css/admin.css`:
     - Dòng 3297: `.metric-courses-icon { background-image: url("../assets/icon/Purple_icon_theme/media.png"); }` (vô tình dùng icon tím trong trang admin).

2. **SVG Inline (Được dùng riêng cho phần ruột của trang Settings):**
   - Toàn bộ icon danh mục trong sub-menu Settings (`pages/settings/settings.html` dòng 217, 224, 232, 239, 246, 253, 261) và các icon dòng danh sách (dòng 330, 345, 361, 499, 515, 534, 553, 584, 600, 616, 633, 668, 691...) đều là thẻ `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor">`. Nhóm icon này tự động ăn theo màu chữ văn bản hiện tại.

3. **Thẻ `<img>` chèn động từ Javascript:**
   - Trong `js/syncProfile.js` (dòng 50): Chèn nút Manage với đường dẫn cứng:
     `<img src="/assets/icon/Better_Icon/settings.png" alt="Manage" ...>`
   - Trong `js/auth-guard.js` (dòng 55): Chèn nút Manage với đường dẫn tương đối:
     `<img src="assets/icon/Better_Icon/settings.png" alt="Manage" ...>`
   - Thẻ `<link rel="icon">` tại `pages/settings/settings.html` (dòng 13):
     `<link rel="icon" type="image/png" href="/assets/icon/cool_book.png" />`

#### D. Các hình ảnh/logo/nền CHƯA CÓ phiên bản màu/theme nhưng bắt buộc cần có:
1. **Logo thương hiệu 9.5 AI CLUB (`/assets/icon/cool_book.png`):** Hiện chỉ có 1 bản duy nhất viền xanh sách xanh, chưa có bản Dark Theme (phát sáng hoặc đảo màu chữ/nền) và chưa có các bản theo accent color.
2. **Ảnh nền cửa sổ (`/assets/theme/background.png`):** Mặc dù trong `assets/theme/darktheme/` đã có sẵn file `dark_background.png`, nhưng CSS chưa từng liên kết đến file này. Chưa có các bản nền theo sắc thái Green, Purple, Orange, Pink.
3. **Ảnh banner Promo Sidebar (`Knowledge for a better tomorrow` - `/assets/theme/scene2.png`):** Đã có sẵn file `assets/theme/darktheme/dark-scene2.png` nhưng CSS chưa sử dụng. Chưa có phiên bản cho các màu accent.
4. **Ảnh thumbnail Home Page (`continue-thumb.png`, `scene.png`):** Đã có sẵn `dark-continue-thumb.png` và `dark-scene.png` trong thư mục `darktheme/` nhưng code chưa từng gọi tới.
5. **Icon các môn học (`assets/icon/`):** Các icon `chip.png`, `math.png`, `program.png`, `soft.png`, `mas.png`, `data.png` đều là ảnh PNG màu xanh cố định, chưa có phiên bản dark/accent.

---

### 8. Danh sách tất cả các trang & Tính kế thừa CSS/JS nền tảng

| STT | Trang (File Path) | Có nạp CSS dùng chung (`style.css`)? | Có nạp JS dùng chung (`main.js`, `syncProfile.js`)? | Có Sidebar & Topbar chuẩn không? | Đánh giá kiến trúc nền tảng |
| :---: | :--- | :---: | :---: | :---: | :--- |
| 1 | `index.html` | ❌ Không (`home_page.css`) | ❌ Chỉ nạp `auth-guard.js` & `home_page.js` | ❌ Không có sidebar/topbar | Bản landing page độc lập hoàn toàn. |
| 2 | `home_page/home_page.html` | ✅ Có `style.css` | ✅ Có cả 2 | ✅ Có cả hai | Dùng chung CSS/JS nền tảng. |
| 3 | `pages/settings/settings.html` | ✅ Có `style.css` + `settings.css` | ✅ Có cả 2 | ✅ Có cả hai | Dùng chung CSS/JS nền tảng. |
| 4 | `pages/favorites.html` | ✅ Có `style.css` + `favorites.css` | ✅ Có cả 2 | ✅ Có cả hai | Dùng chung CSS/JS nền tảng. |
| 5 | `pages/history.html` | ✅ Có `style.css` + `history.css` | ✅ Có cả 2 | ✅ Có cả hai | Dùng chung CSS/JS nền tảng. |
| 6 | `pages/lectures/lectures.html` | ✅ Có `style.css` + `lectures.css` | ✅ Có cả 2 | ✅ Có cả hai | Dùng chung CSS/JS nền tảng. |
| 7 | `pages/lectures/lecture.html` | ✅ Có `style.css` + `lectures.css` | ✅ Có cả 2 | ✅ Có cả hai | Dùng chung CSS/JS nền tảng. |
| 8 | `pages/lectures/next-lectures.html` | ✅ Có `style.css` + `lectures.css` | ✅ Có cả 2 | ✅ Có cả hai | Dùng chung CSS/JS nền tảng. |
| 9 | `pages/lectures/subject.html` | ✅ Có `style.css` + `lectures.css` | ✅ Có cả 2 | ✅ Có cả hai | Dùng chung CSS/JS nền tảng. |
| 10 | `pages/lectures/resources.html` | ✅ Có `style.css` + `resources.css` | ⚠️ Có `syncProfile`, **THIẾU `main.js`** | ✅ Có cả hai | Dùng chung CSS, nhưng thiếu `main.js` nên dropdown header không bấm được. |
| 11 | `pages/practice/practice.html` | ✅ Có `style.css` + `practice.css` | ✅ Có cả 2 | ✅ Có cả hai | Dùng chung CSS/JS nền tảng. |
| 12 | `pages/practice/practice-quiz.html` | ✅ Có `style.css` + `practice.css` | ✅ Có cả 2 | ✅ Có cả hai | Dùng chung CSS/JS nền tảng. |
| 13 | `pages/practice/practice-quiz-intro.html` | ✅ Có `style.css` + `practice.css` | ✅ Có cả 2 | ✅ Có cả hai | Dùng chung CSS/JS nền tảng. |
| 14 | `pages/practice/practice-result.html` | ✅ Có `style.css` + `practice.css` | ✅ Có cả 2 | ✅ Có cả hai | Dùng chung CSS/JS nền tảng. |
| 15 | `pages/practice/practice-subject.html` | ✅ Có `style.css` + `practice.css` | ✅ Có cả 2 | ✅ Có cả hai | Dùng chung CSS/JS nền tảng. |
| 16 | `pages/community/community-feed.html` | ✅ Có `style.css` + `community.css` | ✅ Có cả 2 | ✅ Có cả hai | Dùng chung CSS/JS nền tảng. |
| 17 | `pages/community/community-discussions.html`| ✅ Có `style.css` + `community.css` | ✅ Có cả 2 | ✅ Có cả hai | Dùng chung CSS/JS nền tảng. |
| 18 | `pages/community/community-groups.html` | ✅ Có `style.css` + `community.css` | ✅ Có cả 2 | ✅ Có cả hai | Dùng chung CSS/JS nền tảng. |
| 19 | `pages/community/community-leaderboard.html`| ✅ Có `style.css` + `community.css` | ✅ Có cả 2 | ✅ Có cả hai | Dùng chung CSS/JS nền tảng. |
| 20 | `pages/community/community-notifications.html`|✅ Có `style.css` + `community.css` | ✅ Có cả 2 | ✅ Có cả hai | Dùng chung CSS/JS nền tảng. |
| 21 | `pages/community/community-search.html` | ✅ Có `style.css` + `community.css` | ✅ Có cả 2 | ✅ Có cả hai | Dùng chung CSS/JS nền tảng. |
| 22 | `pages/community/discussion-detail.html` | ✅ Có `style.css` + `community.css` | ✅ Có cả 2 | ✅ Có cả hai | Dùng chung CSS/JS nền tảng. |
| 23 | `pages/admin/admin.html` | ❌ Dùng `admin.css` riêng | ⚠️ Có `syncProfile`, không nạp `main.js` | ⚠️ Có sidebar riêng, không có topbar chuẩn | Layout quản trị độc lập hoàn toàn. |
| 24 | `pages/auth/login.html` | ❌ Dùng `login.css` riêng | ⚠️ Có `syncProfile` & `auth.js` | ❌ Khung auth riêng, không có topbar chuẩn | Auth layout riêng. |
| 25 | `pages/auth/signup.html` | ❌ Dùng `signup.css` riêng | ⚠️ Có `syncProfile` & `auth.js` | ❌ Khung auth riêng, không có topbar chuẩn | Auth layout riêng. |
| 26 | `pages/auth/forgot_pass.html` | ❌ Dùng `reset_pass.css` | ⚠️ Có `syncProfile` & `login.js` | ❌ Khung auth riêng | Auth layout riêng. |
| 27 | `pages/auth/reset_pass.html` | ❌ Dùng `reset_pass.css` | ⚠️ Có `syncProfile` & `signup.js` | ❌ Khung auth riêng | Auth layout riêng. |
| 28 | `pages/auth/send_email.html` | ❌ Dùng `pass_recovery.css` | ⚠️ Có `syncProfile` | ❌ Không có sidebar | Auth layout riêng. |
| 29 | `document/Practice/*` (5 modules) | ❌ Dùng `styles.css` riêng | ❌ Chỉ dùng `data/questions.js` | ❌ Không | Bộ câu hỏi bài tập độc lập của môn học. |

#### Kết luận quan trọng về kiến trúc HTML:
Dự án là **thuần HTML tĩnh (Vanilla HTML/CSS/JS), không dùng Template Engine (như EJS, Nunjucks, PHP Include hay Component Framework)**.
Toàn bộ khối mã `<aside class="sidebar">` (khoảng 80 dòng HTML) và `<header class="topbar">` (khoảng 70 dòng HTML) **bị copy-paste lặp lại nguyên văn ở tất cả 21 trang ứng dụng**. 
Nếu muốn áp dụng Theme hoặc Accent Color toàn site, việc nhúng script đọc theme phải được thực hiện trên tất cả các trang, hoặc phải chuyển hóa hệ thống biến CSS của `style.css` để nạp đồng nhất.

---

## PHẦN C: CÁC TAB CÒN LẠI (ĐÁNH GIÁ THẬT HAY GIẢ)

### Bảng đánh giá chi tiết tính năng từng mục:

| Tab | Mục chức năng | Hiện đang làm gì khi tương tác | Có lưu dữ liệu không (ở đâu)? | Còn thiếu gì để hoạt động thật? |
| :--- | :--- | :--- | :--- | :--- |
| **Profile** | **Full name** | Load từ `localStorage.user.full_name`. Cho phép gõ (min 2, max 50). Khi gõ kích hoạt cờ dirty và bật nút "Save changes" (`btnSave.disabled = false`). (`js/settings-profile.js:59, 236`) | Có lưu khi bấm Save changes: lưu vào Database MySQL bảng `users` và cập nhật `localStorage.user`. | Đã hoạt động thật qua API backend. |
| **Profile** | **Bio (bộ đếm ký tự)** | Load từ `localStorage.user.bio`. Nhập liệu tối đa 200 ký tự. Có sự kiện `input` đếm ký tự theo thời gian thực (`bioCount.textContent = value.length`). Cập nhật cờ dirty. (`js/settings-profile.js:68, 244`) | Có lưu khi bấm Save changes: lưu vào Database MySQL bảng `users` và `localStorage.user`. | Đã hoạt động thật cả frontend và backend. |
| **Profile** | **Email address** | Hiển thị email người dùng từ `localStorage.user.username`. Bị vô hiệu hóa bằng thuộc tính `disabled` trong HTML (`pages/settings/settings.html:304`). | Không lưu (chế độ chỉ đọc / disabled). | Cần có luồng đổi email xác thực hai bước hoặc chuyển hướng sang tab Account. |
| **Profile** | **Save changes (Button)** | Bấm vào kiểm tra token, gửi request `PUT http://localhost:3000/api/users/profile` với body `{ full_name, bio, avatar_url }`. Cập nhật `localStorage.user`, gọi `renderProfile()` cập nhật avatar topbar, hiển thị overlay `set-overlay-saved`. (`js/settings-profile.js:250-291`) | Có lưu vào Database MySQL (`users.full_name`, `users.bio`, `users.avatar_url`) và `localStorage.setItem('user', ...)`. | Đã hoạt động thật. Tuy nhiên URL backend đang viết cứng `http://localhost:3000`. |
| **Account** | **Email "Edit" (Button)** | Bấm vào hiển thị một thông báo toast: `"Chức năng đổi Email sẽ gọi API thực tế."` (`js/settings-account.js:76-81`). | Không lưu ở bất kỳ đâu (Tính năng giả lập / Mock). | Thiếu modal nhập email mới, thiếu cơ chế gửi mã OTP xác nhận vào email, và thiếu endpoint API backend xử lý đổi email. |
| **Account** | **Password "Change" (Button)** | Bấm vào mở `#modal-password`. Kiểm tra form client: độ dài >= 8, có chứa số, xác nhận mật khẩu khớp. Khi Submit đóng modal và hiện toast: `"Đã lưu (TẠM THỜI - sẽ gọi API PHP)"` (`js/settings-account.js:84-118`). **KHÔNG liên kết** tới `pages/auth/reset_pass.html`. | Không lưu ở bất kỳ đâu (Tính năng giả lập / Mock). | Thiếu endpoint backend API `PUT /api/users/password` xác thực mật khẩu cũ bằng `bcrypt.compare` và băm lưu mật khẩu mới. |
| **Account** | **Two-factor authentication (Toggle)** | Gạt công tắc thì đổi trạng thái checkbox, hiển thị toast báo "Two-factor authentication enabled/disabled." (`js/settings-account.js:121-132`). | Có lưu cục bộ vào `localStorage['lib95:settings:data']` (thuộc tính `settings.account.twoFactor`). Không lưu backend. | Thiếu toàn bộ cơ chế 2FA thật (sinh secret key, hiển thị mã QR cho Google Authenticator, xác thực OTP 6 số khi login, lưu secret vào DB). |
| **Account** | **Connected accounts (Google)** | Render tĩnh 1 dòng Google với icon bị làm mờ grayscale, chú thích `"Chưa liên kết"`, nút `"Not connected"` bị khóa click `pointer-events: none; opacity: 0.5` (`js/settings-account.js:43-72`). | Không lưu ở đâu (Giao diện tĩnh). | Thiếu tích hợp Google OAuth 2.0 (Google Identity Services / Client ID) và API backend liên kết tài khoản. |
| **Notifications** | **4 công tắc** (Lecture updates, Assignment reminders, Community activity, Product updates) | Gạt bật/tắt công tắc, kích hoạt sự kiện `change` tự động lưu giá trị boolean và hiển thị toast `"Tuỳ chọn đã được lưu"` (`js/settings-preferences.js:49-72`). | Có lưu vào `localStorage['lib95:settings:data']` (nhánh `settings.notifications.*`). Khi tải trang có đọc lại để phục hồi trạng thái. | Thiếu hệ thống backend lưu cấu hình thông báo và service gửi email/push notification tương ứng. |
| **Notifications** | **Notification frequency (Dropdown)** | Chọn tần suất (Immediately, Daily digest, Weekly digest, Never), kích hoạt sự kiện `change` lưu giá trị và hiện toast (`js/settings-preferences.js:65-73`). | Có lưu vào `localStorage['lib95:settings:data']` (`settings.notifications.frequency`). Khi tải trang có đọc lại. | Thiếu cron-job backend gom thông báo định kỳ theo tần suất. |
| **Privacy** | **Profile visibility (Dropdown)** | Chọn "Members only" hoặc "Only me", kích hoạt lưu và hiện toast (`js/settings-preferences.js:75`). | Có lưu vào `localStorage['lib95:settings:data']` (`settings.privacy.profileVisibility`). Khi tải trang có đọc lại. | Toàn bộ ứng dụng không có logic phân quyền hiển thị profile theo cờ này. Backend không lưu trường này. |
| **Privacy** | **Learning activity (Toggle)** | Bật/tắt công tắc, tự động lưu và hiện toast (`js/settings-preferences.js:76`). | Có lưu vào `localStorage['lib95:settings:data']` (`settings.privacy.learningActivity`). Khi tải trang có đọc lại. | Thiếu logic ẩn tiến độ/khóa học khi người khác xem trang cá nhân. |
| **Privacy** | **Data usage (Toggle)** | Bật/tắt công tắc, tự động lưu và hiện toast (`js/settings-preferences.js:77`). | Có lưu vào `localStorage['lib95:settings:data']` (`settings.privacy.dataUsage`). Khi tải trang có đọc lại. | Không có hệ thống tracking/telemetry nào kết nối tới cờ này. |
| **Privacy** | **Delete account (Button)** | Bấm vào mở `#modal-delete`. Yêu cầu nhập đúng email để xác nhận. Khi xác nhận đúng, gọi `localStorage.removeItem("lib95:settings:data")`, hiện toast `"Tài khoản đã bị xoá!..."` và chuyển hướng về `index.html` sau 1.5s (`js/settings-preferences.js:80-108`). | Chỉ xóa duy nhất key `lib95:settings:data` trong `localStorage`. **KHÔNG xóa token, KHÔNG xóa user, KHÔNG xóa database**. | **KHÔNG đăng xuất thật** (user quay về index vẫn còn login do `token` và `user` còn nguyên). Thiếu API `DELETE /api/users/me` xóa vĩnh viễn trong MySQL và gọi xóa sạch session/token. |
| **Data & Storage**| **Số liệu dung lượng** (2.4 GB / 10 GB, 1.2 GB...) | Là **SỐ CỨNG GIẢ LẬP (MOCK)**. Lấy từ mảng `defaultData.storage` trong `js/settings-data.js:47-55`. Hàm `loadStorage()` trong `settings-support.js:20-57` chỉ cộng các con số tĩnh này lại rồi tính phần trăm thanh progress. | Không có số liệu thật. | Thiếu API Storage Manager của trình duyệt (`navigator.storage.estimate()`) hoặc API backend đo dung lượng file thực tế của user. |
| **Data & Storage**| **Clear cache (Button)** | Hiện hộp thoại `window.confirm("Are you sure you want to clear cache?")`. Nếu bấm OK, tìm mục có `key === "other"` trong object storage giả lập, gán `bytes = 0`, lưu lại vào `localStorage` và vẽ lại thanh tiến độ (`js/settings-support.js:60-75`). | Chỉ sửa số liệu `other.bytes = 0` trong key `lib95:settings:data`. | **Không xóa bất kỳ file cache thật nào của trình duyệt** (không gọi `caches.delete()`, không dọn Service Worker, không dọn IndexedDB). |
| **Help & Support**| **FAQ** | Bấm vào ẩn danh sách chính, mở view `#support-faq-view` ngay trong trang. Đọc danh sách 5 câu hỏi tiếng Việt từ mock data `settings-data.js:56-77`. Bấm vào câu hỏi thì trượt mở câu trả lời accordion (`js/settings-support.js:85-119`). | Đọc từ mock data tĩnh. | Chưa có trang FAQ đầy đủ hoặc trang quản trị thêm/sửa câu hỏi. |
| **Help & Support**| **Contact support** | Bấm vào mở `#modal-contact` có form Subject & Message. Khi Submit: `e.preventDefault()`, đóng modal, reset form, hiện toast `"Message sent! Support will contact you soon."` (`js/settings-support.js:145-153`). | Không lưu ở đâu. | Thiếu API backend tiếp nhận ticket hỗ trợ và gửi thông báo tới ban quản trị. |
| **Help & Support**| **Report a problem** | Bấm vào mở `#modal-report` có textarea mô tả lỗi. Khi Submit: đóng modal, reset form, hiện toast `"Report submitted! Thanks for helping us improve."` (`js/settings-support.js:156-164`). | Không lưu ở đâu. | Thiếu API backend ghi nhận báo cáo lỗi hệ thống vào database. |
| **Help & Support**| **Terms of Service** | Bấm vào mở `#modal-doc`. Tiêu đề đổi thành "Terms of Service", nội dung hiển thị đoạn văn placeholder ngắn: *"This is a placeholder for the Terms of Service..."* (`js/settings-support.js:134-136`). | Không có dữ liệu lưu trữ. | Chưa có trang tài liệu Điều khoản sử dụng chính thức. |
| **Help & Support**| **Privacy Policy** | Bấm vào mở chung `#modal-doc`. Tiêu đề đổi thành "Privacy Policy", nội dung hiển thị đoạn văn placeholder: *"This is a placeholder for the Privacy Policy..."* (`js/settings-support.js:130-132`). | Không có dữ liệu lưu trữ. | Chưa có trang tài liệu Chính sách quyền riêng tư chính thức. |

#### Trả lời bổ sung:
- **Chuông thông báo ở Header có đọc các cài đặt này không?** 
  **HOÀN TOÀN KHÔNG.** Khung chuông thông báo trên Topbar (`pages/settings/settings.html` dòng 131–170) là 3 thẻ `<li>` viết cứng trong HTML, được điều khiển mở/đóng đơn giản bởi `main.js`. Chuông thông báo không có bất kỳ dòng code nào đọc dữ liệu từ `localStorage['lib95:settings:data']` hay kết nối tới 4 công tắc thông báo.
- **Nút "Save changes" ở Profile có áp dụng cho các tab khác không, hay mỗi tab tự lưu riêng?**
  **KHÔNG ÁP DỤNG CHO CÁC TAB KHÁC.** Nút "Save changes" (`#btn-save-profile`) nằm riêng trong `<form id="form-profile">` và chỉ phụ trách gửi Full name, Bio, Avatar của tab Profile lên backend API. Tất cả các tab còn lại (Appearance, Notifications, Privacy, Account 2FA, Data Storage) đều hoạt động theo cơ chế **Autosave độc lập**: hễ người dùng click chọn radio, gạt switch hay chọn dropdown là code tự động ghi đè ngay lập tức vào `localStorage['lib95:settings:data']` và bắn Toast thông báo.

---

## PHẦN D: VẤN ĐỀ PHÁT HIỆN & RỦI RO

### 9. Danh sách lỗi, điểm bất nhất và mã nguồn trùng lặp

#### A. Lỗi Header bị dịch vị trí (Layout Shift / Scrollbar Jump) giữa các tab Settings:
- **Hiện tượng:** Khi bấm chuyển qua lại giữa các tab (ví dụ từ tab Appearance hoặc Account sang tab Notifications hoặc Help & Support), toàn bộ Topbar header và layout trang bị giật/nhảy sang trái hoặc sang phải khoảng 15–17px.
- **Nguyên nhân chính xác từ code:**
  - Layout sử dụng `.app { display: flex; gap: 24px; padding: 0 20px 20px; }` (`css/style.css:57-61`).
  - Trong `css/style.css`, thẻ `html` hoặc `body` **không được thiết lập** `overflow-y: scroll;` hoặc `scrollbar-gutter: stable;`.
  - Các tab có chiều dài nội dung ngắn (như Appearance, Account) có chiều cao nhỏ hơn chiều cao màn hình trình duyệt, dẫn đến việc **không xuất hiện thanh cuộn dọc**.
  - Khi chuyển sang các tab có nội dung dài (như Notifications hoặc Help & Support khi mở FAQ), chiều cao vượt quá màn hình, trình duyệt lập tức kích hoạt thanh cuộn dọc (scrollbar mặc định trên Windows chiếm khoảng 15–17px độ rộng).
  - Thanh cuộn xuất hiện làm độ rộng khả dụng của viewport co lại, đẩy toàn bộ khối container `.app` và `.topbar` dịch chuyển sang trái ngay lập tức, tạo ra cảm giác giao diện bị giật.

#### B. Hiện tượng hai mục sidebar cùng sáng khi chuyển tab:
- **Hiện tượng:** Khi chuyển tab trong Settings (như Privacy và Data & Storage), có cảm giác 2 mục cùng lúc bị highlight sáng.
- **Nguyên nhân chính xác từ code:**
  - Trong `css/settings.css` (dòng 50–59):
    ```css
    .set-nav-item:hover {
      background-color: var(--set-nav-hover);
      color: var(--color-primary);
    }
    .set-nav-item.is-active {
      background-color: var(--set-nav-hover);
      color: var(--color-primary);
      font-weight: 600;
    }
    ```
  - Trạng thái `:hover` và class `.is-active` **sử dụng màu nền giống hệt nhau** (`var(--set-nav-hover)` = `rgba(59, 130, 246, 0.1)`) và **màu chữ giống hệt nhau** (`var(--color-primary)` = `#1d4ed8`). Sự khác biệt duy nhất là `font-weight: 600` so với `500` (rất khó phân biệt bằng mắt thường).
  - Khi tab "Privacy" đang là active (`.is-active`), nếu người dùng rê chuột qua hoặc vừa click vào "Data & Storage", mục "Data & Storage" sẽ kích hoạt `:hover` (hoặc `:focus`), trong khi "Privacy" vẫn đang mang class `.is-active`. Cả hai mục cùng lúc có nền xanh nhạt và chữ xanh đậm giống hệt nhau, gây ra ảo giác hai mục cùng được chọn.
  - Ngoài ra, trên thiết bị cảm ứng hoặc màn hình nhỏ (`@media (max-width: 768px)` dòng 338–341), trạng thái `:hover` thường bị "kẹt" (hover-sticking) sau khi chạm vào mục trước đó.

#### C. Bất nhất và xung đột nguồn dữ liệu (Data Out-of-sync):
- **Hai nguồn dữ liệu User song song trong `localStorage`:**
  - Nguồn 1: `localStorage.getItem('user')` (chứa dữ liệu thật do Backend cấp khi đăng nhập và cập nhật profile).
  - Nguồn 2: `localStorage.getItem('lib95:settings:data')` (chứa nhánh con `data.user` khởi tạo từ mock data trong `settings-data.js`).
  - Trong `settings-profile.js` (dòng 275): Khi lưu profile thành công, code chỉ ghi vào `localStorage.setItem('user', ...)` mà **hoàn toàn quên cập nhật** nhánh `data.user` trong `lib95:settings:data`.
  - Trong `settings-preferences.js` (dòng 91): Khi xác nhận xóa tài khoản, code lại đi đọc email từ `S.core.getData().user.email` (đọc từ `lib95:settings:data`). Nếu user đã thay đổi thông tin ở profile thật, giá trị này sẽ bị lệch so với `localStorage.user`.
  - Khi bấm xóa tài khoản (dòng 99 `settings-preferences.js`), code chỉ xóa `lib95:settings:data`, giữ nguyên `token` và `user`, khiến chức năng xóa tài khoản hoàn toàn phản tác dụng.

#### D. Đường dẫn sai, tài nguyên không tồn tại (Lỗi 404 console tiềm ẩn):
1. **Lỗi 404 ảnh nền preview Settings:**
   Tại `pages/settings/settings.html` dòng 474 và 482:
   `<div class="set-bg-preview" style="background-image: url('assets/theme/background.png')"></div>`
   Đường dẫn tương đối này bị trình duyệt phân giải thành `http://.../pages/settings/assets/theme/background.png` (không tồn tại, báo lỗi 404 đỏ trên Console trình duyệt). Phải sửa thành `/assets/theme/background.png`.
2. **Lỗi 404 liên kết Đăng xuất và Đổi mật khẩu trên Header:**
   Tại `pages/settings/settings.html` dòng 188 và 192:
   - `<a href="reset_pass.html" ...>Change Password</a>` -> Sai đường dẫn (bị tìm ở `pages/settings/reset_pass.html`, thực tế là `../auth/reset_pass.html`).
   - `<a href="login.html" ...>Đăng xuất</a>` -> Sai đường dẫn (bị tìm ở `pages/settings/login.html`, thực tế là `../auth/login.html`).
3. **Lỗi 404 icon trong `js/auth-guard.js`:**
   Dòng 55: `<img src="assets/icon/Better_Icon/settings.png" ...>` thiếu dấu `/` ở đầu, nếu được gọi từ bất kỳ trang nào nằm trong thư mục con `pages/...` sẽ lập tức bị 404.

#### E. Mã thừa, lỗi cú pháp và mã viết cứng:
- **Cú pháp `if` lặp lại bất thường:**
  Trong `js/settings-profile.js` dòng 283:
  ```javascript
  if (S && S.core) if (S && S.core) S.core.openModal("set-overlay-saved"); else document.getElementById("set-overlay-saved").hidden = false;
  ```
  Câu lệnh bị gõ lặp 2 lần `if (S && S.core) if (S && S.core)`.
- **Hardcode URL localhost:**
  Trong `js/settings-profile.js` dòng 260 và `js/auth.js` dòng 45, 68: Viết cứng tuyệt đối `http://localhost:3000/api/...` thay vì dùng đường dẫn tương đối `/api/...`. Nếu dự án triển khai trên mạng LAN hoặc domain khác, toàn bộ các lệnh fetch này sẽ bị lỗi Network/CORS.
- **Hàm `onBeforeNavigate` chưa hoàn thiện:**
  Trong `js/settings-core.js` dòng 125 có bẫy chặn rời trang khi form bẩn (`if (S.core.onBeforeNavigate && !S.core.onBeforeNavigate(...))`), kèm ghi chú *"sẽ cài đặt chi tiết trong settings-profile.js"*, nhưng trong `settings-profile.js` hoàn toàn không có hàm này.

---

### 10. Rủi ro khi bổ sung Dark Theme & Accent Color toàn diện

1. **Rủi ro chữ tàng hình trên nền tối (Text Contrast Failure):**
   - Rất nhiều class văn bản và tiêu đề đang dùng mã màu đen/xám tối viết cứng (`#0f172a`, `#334e7a`, `#1e293b`) thay vì dùng `var(--color-text)` (ví dụ: `.brand-text strong` dòng 178 trong `style.css`, `.sidebar-promo p` dòng 272 trong `style.css`, tiêu đề card trong các trang lectures/practice).
   - Khi bật Dark Theme, nếu chỉ đổi màu nền của `body` sang đen (`#0f172a`) mà không rà soát triệt để 217 vị trí mã màu viết cứng, hàng loạt văn bản quan trọng sẽ bị chìm vào nền tối, người dùng không thể đọc được.

2. **Rủi ro phá vỡ hiệu ứng Kính mờ (Glassmorphism):**
   - Thiết kế chủ đạo của web dựa trên hiệu ứng kính mờ trong suốt: `background: rgba(255, 255, 255, 0.6); backdrop-filter: blur(12px); border: 1px solid rgba(255, 255, 255, 0.8)`.
   - Nền kính trắng mờ này chỉ hiển thị đẹp khi nằm đè lên ảnh nền desktop sáng màu. Nếu chuyển sang nền tối nhưng vẫn giữ `rgba(255, 255, 255, 0.6)`, các thẻ card sẽ biến thành các mảng trắng đục loang lổ. Ngược lại, nếu xóa bỏ ảnh nền như hiện tại (`background-image: none`), hiệu ứng `backdrop-filter: blur()` sẽ mất hoàn toàn tác dụng quang học.
   - Để Dark Theme hoạt động, bắt buộc phải đổi đồng bộ hệ thống biến card sang dạng kính tối: `background: rgba(15, 23, 42, 0.65); border: 1px solid rgba(255, 255, 255, 0.1);` và gắn ảnh nền tối `dark_background.png`.

3. **Rủi ro xung đột bóng đổ màu xanh (Glow Box-shadows):**
   - Rất nhiều phần tử card và container đang được gán bóng đổ mang sắc tố xanh cố định: `box-shadow: 0 8px 32px rgba(29, 78, 216, 0.08);` hoặc viền sáng `box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15)`.
   - Khi người dùng đổi Accent Color sang màu Xanh lá (Green), Cam (Orange), hoặc Hồng (Pink), các vệt bóng màu xanh dương này sẽ bị lạc quẻ, tạo cảm giác giao diện lem nhem và không đồng nhất.

4. **Rủi ro bế tắc về Icon PNG:**
   - Hầu hết icon sidebar (`css/style.css:207-260`) là file ảnh PNG tĩnh lấy từ `assets/icon/Better_Icon/`. Ảnh PNG không thể tự đổi màu bằng CSS variables.
   - Thư mục icon hiện tại chưa có các bộ màu Orange và Pink, và bộ Green/Purple thì có tới 95% file chưa hề được đổi màu. Nếu ép người dùng chọn 5 màu accent ngay bây giờ, các icon trên thanh menu vẫn sẽ giữ nguyên màu xanh dương.
   - Nếu áp dụng giải pháp đổi đường dẫn ảnh theo theme, ta sẽ phải quản lý số lượng file ảnh nhân lên gấp 5 lần (rất cồng kềnh và dễ sót file).

5. **Rủi ro chớp nháy giao diện khi chuyển trang (FOUC - Flash of Unstyled / Light Content):**
   - Vì dự án là các file HTML rời rạc, nếu logic nạp theme được đặt ở cuối file `<body>` hoặc trong sự kiện `DOMContentLoaded`, mỗi khi người dùng click chuyển từ trang này sang trang khác, trình duyệt sẽ vẽ giao diện sáng mặc định trước, sau đó mới đọc `localStorage` và đổi sang màu tối. Hiện tượng này sẽ làm màn hình bị chớp trắng giật cục liên tục, gây nhức mắt người dùng.

---

## ĐỀ XUẤT THỨ TỰ LÀM

Để hoàn thiện trang Settings, chuẩn hóa Dark Theme và Accent Color toàn diện với rủi ro thấp nhất (tránh làm vỡ layout hiện tại), đề xuất lộ trình triển khai gồm 4 giai đoạn sau:

### Giai đoạn 1: Sửa chữa các lỗi hỏng tức thì & Chuẩn hóa dữ liệu (Quick Wins)
- **Công việc:**
  1. Sửa ngay các đường dẫn bị 404: sửa `'assets/theme/background.png'` thành `'/assets/theme/background.png'` trong `settings.html`; sửa link `login.html` và `reset_pass.html` trên topbar thành đường dẫn chính xác.
  2. Sửa lỗi Header nhảy vị trí: Thêm `scrollbar-gutter: stable;` (hoặc `overflow-y: scroll;`) vào `html` trong `css/style.css` để giữ nguyên chiều rộng trang khi xuất hiện thanh cuộn.
  3. Phân biệt rõ ràng giữa `.set-nav-item:hover` và `.set-nav-item.is-active`: đổi màu nền hoặc thêm viền nhấn bên trái cho item đang active để loại bỏ triệt để lỗi "hai mục sidebar cùng sáng".
  4. Đồng bộ 1 nguồn dữ liệu User duy nhất: loại bỏ hoàn toàn nhánh `user` thừa trong `lib95:settings:data`, chuyển toàn bộ trang Settings sang đọc và ghi trực tiếp vào `localStorage.getItem('user')`.
- **Lý do:** Đây là các lỗi hiển thị và xung đột dữ liệu trực tiếp, cần sửa ngay để trang hoạt động ổn định mà chưa cần can thiệp sâu vào cấu trúc giao diện.

### Giai đoạn 2: Tái cấu trúc Hệ thống Biến CSS toàn site (Design Tokens)
- **Công việc:**
  1. Gom toàn bộ định nghĩa màu sắc vào một hệ thống biến `:root` hoàn chỉnh đặt ở đầu `css/style.css` (bổ sung các biến nền kính: `--card-bg`, `--card-border`, `--card-shadow`, `--text-primary`, `--text-secondary`, `--accent-color`, `--accent-hover`, `--accent-soft`).
  2. Rà soát và thay thế 217 vị trí mã màu xanh và đen viết cứng ở 15 file CSS sang sử dụng biến CSS tương ứng.
  3. Viết bộ quy tắc `html[data-theme="dark"]` tập trung trong `style.css` để áp dụng chung cho mọi trang (nạp ảnh nền `dark_background.png`, đổi biến nền kính sang màu tối, nạp `dark-scene2.png` cho banner promo).
- **Lý do:** Phải "dọn sạch" các mã màu viết cứng thì việc đổi Theme và Accent mới có thể tác động đến toàn bộ website mà không để lại các lỗi hiển thị loang lổ.

### Giai đoạn 3: Xây dựng Module nạp Theme toàn cục & Giải pháp Icon
- **Công việc:**
  1. Tạo một script nạp theme siêu nhẹ (ví dụ `theme-init.js`), đặt ở thẻ `<head>` của **tất cả các trang HTML** (trước cả CSS) để đọc `theme`, `accentColor`, `fontSize` từ `localStorage` và gán thuộc tính lên thẻ `<html>` ngay tức khắc, ngăn chặn hoàn toàn hiện tượng chớp nháy trắng (FOUC).
  2. **Giải pháp căn cơ cho Icon:** Thay vì xuất hàng trăm file PNG cho từng màu sắc, chuyển các icon sidebar trong `style.css` sang kỹ thuật **CSS `mask-image`** (sử dụng icon PNG hiện tại làm mặt nạ và tô màu bằng `background-color: var(--color-primary)`). Nhờ đó, người dùng chọn bất kỳ màu accent nào (Xanh, Tím, Lá, Cam, Hồng) hay Dark Theme thì toàn bộ icon sẽ tự động đổi màu chuẩn xác 100% mà không cần thêm bất kỳ file ảnh mới nào.
- **Lý do:** Kỹ thuật `mask-image` giải quyết triệt để vấn đề thiếu file ảnh ở các bộ màu Orange/Pink và giúp hệ thống cực kỳ gọn nhẹ.

### Giai đoạn 4: Hoàn thiện chức năng thực tế cho các Tab còn lại
- **Công việc:**
  1. **Tab Account:** Xây dựng API đổi mật khẩu thật ở backend (`PUT /api/users/change-password`), liên kết form với backend thay vì chỉ hiển thị toast giả lập.
  2. **Tab Privacy:** Xây dựng API xóa tài khoản (`DELETE /api/users/me`), xóa sạch token, user, và chuyển hướng đăng xuất triệt để.
  3. **Tab Data & Storage:** Sử dụng Storage API thật của trình duyệt (`navigator.storage.estimate()`) để đo dung lượng thật của IndexedDB/CacheStorage, và lập trình nút Clear Cache thật.
  4. **Tab Help & Support:** Hoàn thiện modal gửi ý kiến đóng góp / báo lỗi lưu vào Database.
- **Lý do:** Đưa các tab từ trạng thái giao diện tĩnh / mock data thành các tính năng có tính ứng dụng thực tế và bảo mật cao.
