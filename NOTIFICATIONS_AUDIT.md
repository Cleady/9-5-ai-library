# BÁO CÁO KHẢO SÁT TOÀN DIỆN HỆ THỐNG THÔNG BÁO, BÀI ĐĂNG & GHIM (9.5 AI LIBRARY)

**Dự án:** 9-5-ai-library  
**Chế độ khảo sát:** Chỉ đọc (Read-only Audit)  
**Thời điểm thực hiện:** 22/10/2026  
**File báo cáo:** `NOTIFICATIONS_AUDIT.md` (Thư mục gốc)

---

## TÓM TẮT 10 DÒNG
1. **Tình trạng chuông hiện tại:** 22 trang giao diện có sẵn khung chuông HTML nhưng 17 trang để danh sách rỗng, 5 trang viết cứng `<li>` giả; module `js/notifications-bell.js` đã được nạp trên 21 trang để ghi đè nội dung động khi mở dropdown.
2. **Community-notifications đã có gì:** Trang `pages/community/community-notifications.html` đã dựng sẵn giao diện đầy đủ (header, 3 tab All/Unread/Pinned, danh sách card, nút Mark all read, load more) và gọi API thật qua `js/community-notifications.js`.
3. **Đã có bảng thông báo chưa:** Đã có bảng `community_notifications` trong `backend/config/initDb.js:229-245` với foreign key liên kết `users` và `community_posts`, kèm index `(user_id, is_read)` và `(user_id, created_at)`.
4. **Có khái niệm ghim chưa:** Bảng `community_posts` đã có các cột `is_pinned`, `pinned_at`, `pinned_by`; giao diện menu `⋯` của bài viết và backend `PUT /api/community/posts/:id/pin` đã hỗ trợ ghim/bỏ ghim tối đa 3 bài.
5. **Loại "bài đăng" và quyền tạo:** Bao gồm Feed posts (5 loại: `post`, `photo`, `link`, `question`, `poll` - tạo bởi member/staff/admin/owner qua `canWriteCommunity`), Thảo luận (`canWriteCommunity`), Nhóm (`isStaffAdminOwner`), Bài giảng LMS (`admin`/`owner`/`staff`), Tài nguyên Resource (`canWriteCommunity`).
6. **Kiểm duyệt ảnh hưởng thế nào:** Bài viết hiển thị ngay lập tức khi tạo (hậu kiểm qua báo cáo `community_reports`); Admin có thể ẩn bài (`is_hidden = 1`); API lấy thông báo hiện chưa lọc `is_hidden = 0`, có nguy cơ lộ thông báo của bài bị ẩn.
7. **Cách tránh sửa tay 21 trang:** Tận dụng selector chung `.notification` và `#notification-panel` (hoặc `home-page__notification-wrap` trên trang chủ); một module JS duy nhất (`notifications-bell.js`) tự động dọn rác HTML cũ và render dropdown theo API.
8. **Cơ chế cập nhật:** Hiện sử dụng polling chu kỳ 60 giây khi tab hiển thị (tạm dừng khi tab ẩn) và làm mới tức thì khi người dùng click mở chuông; chưa có cơ chế đồng bộ tức thì giữa các tab trình duyệt (`BroadcastChannel`).
9. **Phương án dữ liệu khuyến nghị:** Giữ nguyên mô hình Fan-out khi ghi (`community_notifications`) do quy mô câu lạc bộ (hiện tại 5 users, tương lai vài trăm/nghìn users) đạt tốc độ đọc cực cao `O(1)`, đếm chưa đọc tức thì và tự động xóa dòng theo cascade khi bài viết bị xóa.
10. **Rủi ro lớn nhất:** Cài đặt người dùng `communityActivity` trong `lib95:settings:data` mặc định là `false` (nếu lọc mù quáng ở client sẽ làm biến mất thông báo cộng đồng) và trang `admin.html` không nạp `main.js`/`notifications-bell.js` nên chuông admin đang hoạt động tách rời.

---

## PHẦN A: CHUÔNG THÔNG BÁO HIỆN TẠI

### 1. Khảo sát Markup chuông, Dropdown panel và JavaScript điều khiển

#### 1.1. Cấu trúc Markup chuẩn
Trong hầu hết các trang HTML của hệ thống, khối chuông thông báo nằm ở thanh công cụ `.topbar-actions` với cấu trúc:
- Khung chứa: `<div class="notification">`
- Nút bấm chuông: `<button type="button" class="icon-button" aria-label="Notifications" aria-expanded="false" aria-controls="notification-panel">`
- Biểu tượng và chấm đỏ: `<span class="bell-icon" aria-hidden="true"></span>` và `<span class="notification-dot" aria-hidden="true" hidden></span>`
- Khung thả xuống: `<section class="notification-panel" id="notification-panel" aria-label="Notifications" hidden>`
  - Header: `<header class="notification-header">` gồm `<p class="notification-title">Notifications</p>` và `<button type="button" class="notification-clear">Mark all as read</button>`
  - Danh sách mục: `<ul class="notification-list"></ul>`
  - Footer: `<a href="/pages/community/community-notifications.html" class="notification-footer">View all notifications</a>`

#### 1.2. Đoạn mã một mục thông báo mẫu (viết cứng)
Trích từ [pages/community/community-feed.html:131-137](file:///c:/Users/anhqu/Documents/Computer%20Science%20Training/PRIVATE%20PROJECT/9-5-ai-library/pages/community/community-feed.html#L131-L137):
```html
<li class="notification-item is-unread"><span class="notification-item-icon"
        aria-hidden="true"></span>
    <div>
        <p class="notification-text">Sarah Nguyen mentioned you in a post</p><time
            class="notification-time">2 hours ago</time>
    </div>
</li>
```
Trích từ [pages/admin/admin.html:126-132](file:///c:/Users/anhqu/Documents/Computer%20Science%20Training/PRIVATE%20PROJECT/9-5-ai-library/pages/admin/admin.html#L126-L132):
```html
<li class="notification-item is-unread"><span class="notification-item-icon"
        aria-hidden="true"></span>
    <div>
        <p class="notification-text">Có 12 posts đang chờ kiểm duyệt.</p><time
            class="notification-time">5 phút trước</time>
    </div>
</li>
```

#### 1.3. JavaScript xử lý chuông cơ sở (`js/main.js`)
Trong [js/main.js:61-77](file:///c:/Users/anhqu/Documents/Computer%20Science%20Training/PRIVATE%20PROJECT/9-5-ai-library/js/main.js#L61-L77):
```javascript
function initNotifications() {
    const bell = $(".notification .icon-button");
    createDropdown(bell, $("#notification-panel"), $(".notification"));

    // Nút "Mark as read": bỏ nền xanh của các mục chưa đọc và ẩn chấm đỏ
    const clearButton = $(".notification-clear");
    const dot = $(".notification-dot");
    if (!clearButton || !dot || !bell) return;

    clearButton.addEventListener("click", () => {
        document.querySelectorAll(".notification-item.is-unread").forEach((item) => {
            item.classList.remove("is-unread");
        });
        dot.hidden = true;
        bell.setAttribute("aria-label", "Notifications (không có thông báo mới)");
    });
}
```
Hàm `createDropdown` ([js/main.js:8-53](file:///c:/Users/anhqu/Documents/Computer%20Science%20Training/PRIVATE%20PROJECT/9-5-ai-library/js/main.js#L8-L53)) xử lý:
- Mở / Đóng qua thuộc tính `aria-expanded="true|false"` và `list.hidden = false|true`.
- Hiệu ứng đóng chuyển động `menu-lift` qua class `.is-closing`.
- Đóng khi click ra ngoài (`document.addEventListener("click", ...)`).
- Đóng khi nhấn phím Esc (`event.key === "Escape"`).

#### 1.4. Bảng kiểm kê toàn bộ trang có chuông thông báo trong dự án
Khảo sát quét toàn bộ 43 file HTML trong repo:
- **5 file Auth** (`login.html`, `signup.html`, `forgot_pass.html`, `reset_pass.html`, `send_email.html`): **Không có chuông**, không có topbar.
- **13 file Practice Quiz/Preview tài liệu** trong `document/Practice/`: **Không có chuông**.
- **1 file Sandbox/Preview** (`tools/theme-gallery-content.html`): Khung xem trước linh kiện giao diện.
- **22 file giao diện chính thức** có chuông thông báo (chi tiết ở bảng dưới):

| STT | Tên file HTML | Loại Markup | Số `<li>` cứng | Có nạp `main.js` | Có nạp `notifications-bell.js` | Script phụ trách Dropdown | Ghi chú khác biệt |
| :--- | :--- | :--- | :---: | :---: | :---: | :--- | :--- |
| 1 | `index.html` | Custom (`home-page__*`) | 0 | **Không** | **Có** | `notifications-bell.js` | Dùng class riêng của trang chủ khách, nút có `data-home-notifications` |
| 2 | `home_page/home_page.html` | Chuẩn (`.notification`) | 0 | **Có** | **Có** | `main.js` + `bell.js` | Danh sách rỗng ban đầu, nạp động |
| 3 | `pages/admin/admin.html` | Chuẩn (`.notification`) | 3 | **Không** | **Không** | `admin.js` | Có chuông riêng, text tiếng Việt ("Thông báo"), nạp `admin.js` tự viết `createDropdown` |
| 4 | `pages/community/community-feed.html` | Chuẩn (`.notification`) | 1 | **Có** | **Có** | `main.js` + `bell.js` | Có 1 `<li>` cứng (Sarah Nguyen), footer link `community-notifications.html` |
| 5 | `pages/community/community-discussions.html` | Chuẩn (`.notification`) | 1 | **Có** | **Có** | `main.js` + `bell.js` | Có 1 `<li>` cứng, footer ghi "View tất cả thông báo" |
| 6 | `pages/community/community-groups.html` | Chuẩn (`.notification`) | 0 | **Có** | **Có** | `main.js` + `bell.js` | Danh sách rỗng, footer link tương đối |
| 7 | `pages/community/community-leaderboard.html` | Chuẩn (`.notification`) | 0 | **Có** | **Có** | `main.js` + `bell.js` | Danh sách rỗng, footer link tương đối |
| 8 | `pages/community/community-notifications.html` | Chuẩn (`.notification`) | 0 | **Có** | **Có** | `main.js` + `bell.js` | Trang xem tất cả thông báo, danh sách chuông rỗng |
| 9 | `pages/community/community-search.html` | Chuẩn (`.notification`) | 1 | **Có** | **Có** | `main.js` + `bell.js` | Có 1 `<li>` cứng, footer ghi "View tất cả thông báo" |
| 10 | `pages/community/discussion-detail.html` | Chuẩn (`.notification`) | 1 | **Có** | **Có** | `main.js` + `bell.js` | Có 1 `<li>` cứng, footer ghi "View tất cả thông báo" |
| 11 | `pages/lectures/lecture.html` | Chuẩn (`.notification`) | 0 | **Có** | **Có** | `main.js` + `bell.js` | Danh sách rỗng, footer link tuyệt đối |
| 12 | `pages/lectures/lectures.html` | Chuẩn (`.notification`) | 0 | **Có** | **Có** | `main.js` + `bell.js` | Danh sách rỗng, footer link tuyệt đối |
| 13 | `pages/lectures/next-lectures.html` | Chuẩn (`.notification`) | 0 | **Có** | **Có** | `main.js` + `bell.js` | Danh sách rỗng, footer link tuyệt đối |
| 14 | `pages/lectures/resources.html` | Chuẩn (`.notification`) | 0 | **Không** | **Có** | `resources.js` + `bell.js` | Không nạp `main.js`, dùng hàm `createDropdown` trong `resources.js` |
| 15 | `pages/lectures/subject.html` | Chuẩn (`.notification`) | 0 | **Có** | **Có** | `main.js` + `bell.js` | Danh sách rỗng, footer link tuyệt đối |
| 16 | `pages/practice/practice.html` | Chuẩn (`.notification`) | 0 | **Có** | **Có** | `main.js` + `bell.js` | Danh sách rỗng, footer link tuyệt đối |
| 17 | `pages/practice/practice-subject.html` | Chuẩn (`.notification`) | 0 | **Có** | **Có** | `main.js` + `bell.js` | Danh sách rỗng, footer link tuyệt đối |
| 18 | `pages/practice/practice-quiz-intro.html` | Chuẩn (`.notification`) | 0 | **Có** | **Có** | `main.js` + `bell.js` | Danh sách rỗng, footer link tuyệt đối |
| 19 | `pages/practice/practice-quiz.html` | Chuẩn (`.notification`) | 0 | **Có** | **Có** | `main.js` + `bell.js` | Danh sách rỗng, footer link tuyệt đối |
| 20 | `pages/practice/practice-result.html` | Chuẩn (`.notification`) | 0 | **Có** | **Có** | `main.js` + `bell.js` | Danh sách rỗng, footer link tuyệt đối |
| 21 | `pages/settings/settings.html` | Chuẩn (`.notification`) | 0 | **Có** | **Có** | `main.js` + `bell.js` | Danh sách rỗng, footer link tuyệt đối |
| 22 | `pages/favorites.html` | Chuẩn (`.notification`) | 0 | **Có** | **Có** | `main.js` + `bell.js` | Danh sách rỗng, footer link tuyệt đối |
| 23 | `pages/history.html` | Chuẩn (`.notification`) | 0 | **Có** | **Có** | `main.js` + `bell.js` | Danh sách rỗng, footer link tuyệt đối |

---

### 2. Khảo sát CSS: Light/Dark Theme, Kích thước, Chấm đỏ, Responsive & Z-Index

#### 2.1. Các file định kiểu
- [css/style.css](file:///c:/Users/anhqu/Documents/Computer%20Science%20Training/PRIVATE%20PROJECT/9-5-ai-library/css/style.css): Định nghĩa nền tảng ở dòng 832–959 (Light Mode cơ bản) và dòng 2714–2748 (Dark Mode Overrides).
- [css/admin.css](file:///c:/Users/anhqu/Documents/Computer%20Science%20Training/PRIVATE%20PROJECT/9-5-ai-library/css/admin.css): Định nghĩa riêng cho trang Admin ở dòng 397–565 và 2489–2580.
- [css/notifications.css](file:///c:/Users/anhqu/Documents/Computer%20Science%20Training/PRIVATE%20PROJECT/9-5-ai-library/css/notifications.css): Hệ thống thiết kế chuyên sâu (Glassmorphism, token hiện đại, Avatar, Badge, Ghim bài, Tabs).

#### 2.2. Chi tiết thông số giao diện
- **Chấm đỏ báo thông báo mới (`.notification-dot`):**
  - Trích [css/style.css:832-841](file:///c:/Users/anhqu/Documents/Computer%20Science%20Training/PRIVATE%20PROJECT/9-5-ai-library/css/style.css#L832-L841):
    `position: absolute; top: 9px; right: 10px; width: 9px; height: 9px; border-radius: 50%; background-color: #ef4444; border: 2px solid var(--color-white);`
- **Kích thước Panel (`.notification-panel`):**
  - Chiều rộng: `340px` (trang Admin là `318px`).
  - Vị trí: `position: absolute; top: calc(100% + 8px); right: 0;`
  - Giới hạn cuộn: `max-height: 480px; overflow: hidden;` (danh sách bên trong `.notification-list` có `max-height: 360px; overflow-y: auto;`).
  - Bo góc và bóng đổ: `border-radius: 16px; box-shadow: var(--card-shadow); backdrop-filter: var(--card-blur);`
- **Chế độ Tối (Dark Theme):**
  - Trích [css/style.css:2731-2748](file:///c:/Users/anhqu/Documents/Computer%20Science%20Training/PRIVATE%20PROJECT/9-5-ai-library/css/style.css#L2731-L2748):
    `html[data-theme="dark"] .notification-panel { background: rgba(10, 22, 44, 0.95) !important; backdrop-filter: blur(16px); border: 1px solid rgba(56, 189, 248, 0.18) !important; box-shadow: 0 12px 36px rgba(0, 0, 0, 0.5) !important; }`
    Mục chưa đọc trong dark mode dùng nền: `rgba(37, 99, 235, 0.22)`.
    Mục hover dùng nền: `rgba(255, 255, 255, 0.04)`.
    Nút Clear và link footer dùng màu: `var(--accent-bright)`.
- **Mục chưa đọc (`.is-unread`):**
  - Light mode: `background-color: var(--color-primary-soft);` hoặc `color-mix(in srgb, var(--card-bg-elevated) 88%, var(--color-primary-soft));`
  - Có chấm tròn xanh báo trạng thái: `.notif-unread-dot` kích thước 8x8px màu `var(--color-primary)`.
- **Thứ tự xếp chồng (Z-Index):**
  - `.topbar` có `z-index: 100` ([css/style.css:708](file:///c:/Users/anhqu/Documents/Computer%20Science%20Training/PRIVATE%20PROJECT/9-5-ai-library/css/style.css#L708)).
  - Trong `css/admin.css:470`, `.notification-panel` có `z-index: 30`.
  - `.notification-footer` dạng dính (sticky) ở đáy panel có `z-index: 2` ([css/notifications.css:275](file:///c:/Users/anhqu/Documents/Computer%20Science%20Training/PRIVATE%20PROJECT/9-5-ai-library/css/notifications.css#L275)).
- **Responsive (Mobile 360px - 480px):**
  - Trích [css/notifications.css:472-477](file:///c:/Users/anhqu/Documents/Computer%20Science%20Training/PRIVATE%20PROJECT/9-5-ai-library/css/notifications.css#L472-L477):
    `@media (max-width: 480px) { .notification-panel, .home-page__notification-panel { width: min(340px, calc(100vw - 24px)); right: -12px; } }`
    Đảm bảo không bị tràn mép màn hình điện thoại.

#### 2.3. Quy chuẩn phong cách thiết kế mục thông báo đồng bộ
Để mục thông báo mới ăn khớp 100% với hệ thống, cần tuân thủ các token giao diện sẵn có:
1. **Avatar người tương tác:** Kích thước `36x36px`, bo tròn `50%`, chữ cái đầu in hoa màu `var(--color-primary)` trên nền `var(--color-primary-soft)` hoặc ảnh nền `avatar_url`.
2. **Icon thể loại tương tác (`.notif-type-bubble`):** Kích thước `18x18px`, nằm đè ở góc dưới bên phải avatar (📌 bài ghim, 📝 bài viết, ♥ lượt thích, 💬 bình luận, ↩ thảo luận, 👥 nhóm).
3. **Tiêu đề & Tên người gửi:** Tên in đậm (`font-weight: 700; color: var(--color-text);`), kèm micro-badge vai trò nếu là ban quản trị (`.notif-role-badge--owner`: chữ đỏ nền đỏ nhạt, `--admin`: xanh dương, `--staff`: tím).
4. **Thời gian tương tác:** Phông chữ `11px`, màu `var(--color-text-muted)`.
5. **Đoạn trích dẫn (`.notif-excerpt`):** Tối đa 2 dòng (`-webkit-line-clamp: 2`), nghiêng `italic`, màu `var(--color-text-secondary)`.
6. **Mục thông báo ghim (`.notif-item--pinned`):** Nền nhấn `var(--color-primary-soft)`, viền trái `3px solid var(--color-primary)`, huy hiệu `📌 Pinned`.

---

### 3. Giải pháp cấp phát chuông không sửa tay 21 trang HTML

#### 3.1. Điểm bám Selector chung trên các trang
Qua khảo sát toàn bộ 22 trang:
- **21 trang ứng dụng chính** đều có sẵn selector chung: `.notification` và `#notification-panel`.
- **1 trang chủ Landing page** (`index.html`) có selector tương đương: `.home-page__notification-wrap` và `#home-notification-panel`.

#### 3.2. Cơ chế module tự động lắp ráp (Auto-mount & Rehydrate)
Hiện tại, module [js/notifications-bell.js:324-364](file:///c:/Users/anhqu/Documents/Computer%20Science%20Training/PRIVATE%20PROJECT/9-5-ai-library/js/notifications-bell.js#L324-L364) đã được thiết kế theo hướng này:
1. Khi nạp vào trang, script tự tìm:
   `const bellBtn = document.querySelector('.notification .icon-button, [data-home-notifications]');`
   `const panel = document.querySelector('#notification-panel, #home-notification-panel');`
2. Thay vì yêu cầu sửa tay từng file HTML để xoá các thẻ `<li>` cũ, khi người dùng bấm chuông hoặc khi DOM sẵn sàng:
   Hàm `renderDropdown(panel)` ghi đè toàn bộ `panel.innerHTML` bằng bộ khung chuẩn có skeleton loading, sau đó nạp API `GET /api/community/notifications?page=1&limit=8` và gắn các sự kiện click trực tiếp.
3. Nếu một trang trong tương lai chưa có thẻ `#notification-panel`, script có thể tự kiểm tra `if (!panel && container)` để tự sinh DOM `<section class="notification-panel" id="notification-panel">` và chèn vào cuối `.notification`.

#### 3.3. Các biến thể đặc thù cần xử lý
- **Biến thể Trang chủ (`index.html`):** Sử dụng các thuộc tính riêng (`data-home-notifications`, `#home-notification-panel`). Module `notifications-bell.js` cần duy trì selector kép để nhận diện cả 2 loại.
- **Biến thể Trang Quản trị (`pages/admin/admin.html`):** Trang này nạp `admin.js` mà không nạp `main.js` hay `notifications-bell.js`. Để trang admin cũng có chuông thật mà không sửa HTML thủ công, chỉ cần thêm việc nạp `notifications-bell.js` vào trang admin hoặc móc lệnh gọi của `notifications-bell.js` vào cuối `admin.js`.
- **Biến thể Trang Tài nguyên (`pages/lectures/resources.html`):** Không nạp `main.js` nhưng đã có nạp `resources.js` và `notifications-bell.js`. Do `resources.js` tự mở dropdown bằng listener nội bộ, listener có `useCapture: true` trong `notifications-bell.js` ([dòng 359](file:///c:/Users/anhqu/Documents/Computer%20Science%20Training/PRIVATE%20PROJECT/9-5-ai-library/js/notifications-bell.js#L359)) đã chặn và kiểm tra quyền đăng nhập thành công.
- **Đường dẫn liên kết View All:** Trên 4 trang con community (`community-discussions.html`, `community-feed.html`, `community-search.html`, `discussion-detail.html`), thẻ `<a>` viết cứng dạng tương đối `community-notifications.html`, trong khi các trang khác là `/pages/community/community-notifications.html`. Khi module JS tự render panel, URL luôn được chuẩn hóa thành đường dẫn tuyệt đối `/pages/community/community-notifications.html`.

---

## PHẦN B: HỆ THỐNG THÔNG BÁO ĐÃ CÓ Ở COMMUNITY

### 4. Khảo sát trang `community-notifications.html` và Script liên quan

#### 4.1. Cấu trúc và Dữ liệu hiện tại
- **File HTML:** [pages/community/community-notifications.html](file:///c:/Users/anhqu/Documents/Computer%20Science%20Training/PRIVATE%20PROJECT/9-5-ai-library/pages/community/community-notifications.html)
  - Khung chính gồm: Header ("All Notifications"), nút "Mark all as read" ([dòng 157](file:///c:/Users/anhqu/Documents/Computer%20Science%20Training/PRIVATE%20PROJECT/9-5-ai-library/pages/community/community-notifications.html#L157)), thanh 3 tab lọc (`All`, `Unread`, `📌 Pinned` tại [dòng 163-173](file:///c:/Users/anhqu/Documents/Computer%20Science%20Training/PRIVATE%20PROJECT/9-5-ai-library/pages/community/community-notifications.html#L163-L173)), cột chứa danh sách thông báo `[data-com-notif-full-list]`, và cột phụ tóm tắt phân loại thông báo (Thích bài viết, Bình luận, Thảo luận, Nhóm).
- **Thực tế dữ liệu:** **Dữ liệu THẬT 100% từ Database**, không dùng mock data.
  - Script [js/community-notifications.js:219-221](file:///c:/Users/anhqu/Documents/Computer%20Science%20Training/PRIVATE%20PROJECT/9-5-ai-library/js/community-notifications.js#L219-L221) gọi trực tiếp endpoint:
    `GET /api/community/notifications?page=X&limit=15&filter=all|unread|pinned`
- **Tính năng đã có:**
  - Đánh dấu 1 mục đã đọc khi click: `POST /api/community/notifications/:id/read` ([dòng 125](file:///c:/Users/anhqu/Documents/Computer%20Science%20Training/PRIVATE%20PROJECT/9-5-ai-library/js/community-notifications.js#L125)).
  - Đánh dấu tất cả đã đọc: `POST /api/community/notifications/read-all` ([dòng 273](file:///c:/Users/anhqu/Documents/Computer%20Science%20Training/PRIVATE%20PROJECT/9-5-ai-library/js/community-notifications.js#L273)).
  - Phân trang dạng nút "Load more notifications" ([dòng 186-194](file:///c:/Users/anhqu/Documents/Computer%20Science%20Training/PRIVATE%20PROJECT/9-5-ai-library/js/community-notifications.js#L186-L194)).
  - Lọc theo Tab (All, Unread, Pinned).
  - Tách riêng khu vực thông báo ghim lên đầu: "📌 Pinned Announcements" ([dòng 165-175](file:///c:/Users/anhqu/Documents/Computer%20Science%20Training/PRIVATE%20PROJECT/9-5-ai-library/js/community-notifications.js#L165-L175)).
- **Tab trong thanh Community:**
  - Thanh tab phụ `.com-tabs` của phân hệ Community ([pages/community/community-feed.html:171-176](file:///c:/Users/anhqu/Documents/Computer%20Science%20Training/PRIVATE%20PROJECT/9-5-ai-library/pages/community/community-feed.html#L171-L176)) hiện **chỉ có 4 tab**: `Feed`, `Discussions`, `Groups`, `Leaderboard`. **Chưa có tab Notifications**.
  - Trên chính trang `community-notifications.html`, thanh `.com-tabs` bị ẩn/bỏ qua, đi thẳng vào nội dung thông báo.

#### 4.2. So sánh: Nâng cấp `community-notifications.html` vs Tạo mới `pages/notifications.html`

| Tiêu chí | Phương án A: Nâng cấp `community-notifications.html` | Phương án B: Tạo trang mới `pages/notifications.html` |
| :--- | :--- | :--- |
| **Trạng thái hiện tại** | Đã hoàn thiện 90% giao diện và kết nối API thật. | Chưa có file, phải dựng mới từ đầu. |
| **Khả năng hồi quy liên kết** | **0% rủi ro:** 22 file HTML hiện có đều đang trỏ sẵn về `/pages/community/community-notifications.html`. | **Rủi ro cao:** Cần cập nhật link footer ở cả 22 file HTML hoặc tạo redirect. |
| **Vị trí điều hướng Sidebar** | Nằm trong nhóm Community (`sidebar` highlight mục Community). | Đứng độc lập ở root `/pages/`, sidebar hiện tại không có mục Notifications nên không có menu nào sáng đèn. |
| **Phạm vi hiển thị thông báo** | Dễ dàng hiển thị cả bài đăng cộng đồng, bài ghim, bài giảng mới và thông báo hệ thống. | Tương đương phương án A. |
| **Đánh giá & Khuyến nghị** | **KHUYÊN DÙNG:** Tối ưu công sức, không gây gãy vỡ các trang đang chạy, đáp ứng hoàn hảo yêu cầu bài toán. | Không khuyến nghị trừ khi sản phẩm tái cấu trúc toàn bộ thanh điều hướng cấp 1. |

---

### 5. Backend Community: Bảng dữ liệu, DDL và API Controller

#### 5.1. Các bảng liên quan trong Database
Trong [backend/config/initDb.js](file:///c:/Users/anhqu/Documents/Computer%20Science%20Training/PRIVATE%20PROJECT/9-5-ai-library/backend/config/initDb.js), phân hệ Community bao gồm:
1. `community_posts`: Bài viết feed, lưu loại (`kind`), nội dung, ảnh, link, cờ ghim.
2. `community_post_tags`: Hashtag của bài viết.
3. `community_comments`: Bình luận trên bài viết.
4. `community_likes`: Lượt thích bài viết (cặp `post_id`, `user_id`).
5. `community_poll_options` & `community_poll_votes`: Tùy chọn và lượt bình chọn khảo sát.
6. `community_discussions` & `community_discussion_replies`: Chủ đề và câu trả lời thảo luận.
7. `community_groups` & `community_group_members`: Nhóm và thành viên nhóm.
8. `community_notifications`: **Bảng lưu trữ thông báo cho người dùng**.
9. `community_reports`: Báo cáo vi phạm để kiểm duyệt.

#### 5.2. DDL chi tiết bảng `community_notifications`
Trích từ [backend/config/initDb.js:228-245](file:///c:/Users/anhqu/Documents/Computer%20Science%20Training/PRIVATE%20PROJECT/9-5-ai-library/backend/config/initDb.js#L228-L245):
```sql
CREATE TABLE IF NOT EXISTS community_notifications (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  actor_id INT NOT NULL,
  type ENUM('like', 'comment', 'reply', 'mention', 'group', 'post') NOT NULL,
  post_id INT NULL,
  is_read TINYINT(1) DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_com_notif_user_read (user_id, is_read),
  INDEX idx_com_notif_user_created (user_id, created_at),
  INDEX idx_com_notif_actor (actor_id),
  INDEX idx_com_notif_post (post_id),
  CONSTRAINT fk_com_notif_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT fk_com_notif_actor FOREIGN KEY (actor_id) REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT fk_com_notif_post FOREIGN KEY (post_id) REFERENCES community_posts(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

#### 5.3. DDL chi tiết bảng `community_posts`
Trích từ [backend/config/initDb.js:82-101](file:///c:/Users/anhqu/Documents/Computer%20Science%20Training/PRIVATE%20PROJECT/9-5-ai-library/backend/config/initDb.js#L82-L101):
```sql
CREATE TABLE IF NOT EXISTS community_posts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  kind ENUM('post', 'photo', 'link', 'question', 'poll') DEFAULT 'post',
  content TEXT NOT NULL,
  media_url TEXT NULL,
  link_url TEXT NULL,
  is_pinned TINYINT(1) NOT NULL DEFAULT 0,
  pinned_at TIMESTAMP NULL DEFAULT NULL,
  pinned_by INT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_com_post_user (user_id),
  INDEX idx_com_post_created (created_at),
  INDEX idx_com_posts_pinned (is_pinned, pinned_at),
  CONSTRAINT fk_com_posts_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT fk_com_posts_pinned_by FOREIGN KEY (pinned_by) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

#### 5.4. Các Endpoint và Route hiện có (`communityRoutes.js` & `communityController.js`)
Trong [backend/routes/communityRoutes.js](file:///c:/Users/anhqu/Documents/Computer%20Science%20Training/PRIVATE%20PROJECT/9-5-ai-library/backend/routes/communityRoutes.js):
- `GET /api/community/posts`: Lấy bảng tin bài viết.
- `POST /api/community/posts`: Đăng bài mới (`verifyToken`, `canWriteCommunity`).
- `PUT /api/community/posts/:id/pin`: Ghim hoặc bỏ ghim bài viết (`verifyToken`, `isAdminOrOwner`).
- `PUT /api/community/posts/:id`: Sửa bài viết (chính tác giả).
- `DELETE /api/community/posts/:id`: Xoá bài viết (tác giả hoặc admin/owner).
- `POST /api/community/posts/:id/like`: Thích / Bỏ thích bài viết.
- `GET /api/community/posts/:id/comments` & `POST .../comments`: Lấy và gửi bình luận.
- `POST /api/community/posts/:id/vote`: Bỏ phiếu poll.
- `GET /api/community/notifications/unread-count`: Đếm số lượng thông báo chưa đọc (`communityController.getUnreadCount`).
- `GET /api/community/notifications`: Lấy danh sách thông báo phân trang và lọc (`communityController.getNotifications`).
- `POST /api/community/notifications/read-all`: Đánh dấu đọc tất cả (`communityController.markAllNotificationsRead`).
- `POST /api/community/notifications/:id/read`: Đánh dấu đọc một thông báo (`communityController.markNotificationRead`).

---

### 6. Khảo sát "Bài đăng": Chủng loại, Quyền hạn & Cơ chế Kiểm duyệt

#### 6.1. Danh mục các loại nội dung có thể coi là "Bài đăng"
1. **Bài viết Bảng tin Feed (`community_posts`):**
   - Loại con (`kind`): `post` (văn bản), `photo` (ảnh), `link` (liên kết ngoài), `question` (câu hỏi trợ giúp), `poll` (bình chọn khảo sát).
   - Ai được tạo: Mọi người dùng đã kích hoạt tài khoản (`canWriteCommunity` - loại trừ tài khoản `banned` hoặc `pending`).
2. **Chủ đề Thảo luận (`community_discussions`):**
   - Ai được tạo: Thành viên có quyền `canWriteCommunity`.
3. **Nhóm Học tập (`community_groups`):**
   - Ai được tạo: Chỉ Staff, Admin, Owner (`isStaffAdminOwner` tại [communityRoutes.js:106](file:///c:/Users/anhqu/Documents/Computer%20Science%20Training/PRIVATE%20PROJECT/9-5-ai-library/backend/routes/communityRoutes.js#L106)).
4. **Bài giảng / Khoá học mới (`lectures`):**
   - Ai được tạo: Quản trị viên (`isAdminOrOwner` / `isStaffAdminOwner` tại `lmsRoutes.js:77-79`).
5. **Tài liệu / Tài nguyên mới (`resources`):**
   - Ai được tạo: Thành viên hoạt động (`canWriteCommunity` tại `resourceRoutes.js:46-47`).

#### 6.2. Trạng thái kiểm duyệt và Quy trình hiển thị
- **Cơ chế kiểm duyệt:** Hệ thống áp dụng **Hậu kiểm (Post-moderation)**, không dùng tiền kiểm (không có trạng thái `pending` cho bài viết). Bài viết xuất hiện trên Feed ngay sau khi `INSERT` thành công.
- **Báo cáo vi phạm:** Người dùng gửi báo cáo qua `POST /api/community/report` vào bảng `community_reports` ([backend/controllers/moderationController.js:15-100](file:///c:/Users/anhqu/Documents/Computer%20Science%20Training/PRIVATE%20PROJECT/9-5-ai-library/backend/controllers/moderationController.js#L15-L100)).
- **Nơi xử lý kiểm duyệt:** Tab "Kiểm duyệt cộng đồng" trên trang `admin.html` kết nối với API:
  - `GET /api/admin/reports`: Lấy danh sách báo cáo vi phạm.
  - `PUT /api/admin/reports/:id`: Xử lý báo cáo với 4 hành động:
    - `dismiss`: Bỏ qua báo cáo (bài viết vẫn hiện bình thường).
    - `hide`: Cập nhật `is_hidden = 1, hidden_by = adminId, hidden_at = NOW()` vào bảng `community_posts` (hoặc comments/discussions).
    - `restore`: Khôi phục `is_hidden = 0`.
    - `delete`: Xoá vĩnh viễn bài viết khỏi DB.
- **Điều kiện phát thông báo:**
  - Thông báo bài đăng mới chỉ nên sinh ra và hiển thị khi bài viết đang hoạt động (`is_hidden = 0` hoặc `is_hidden IS NULL`).
  - **LỖ HỔNG PHÁT HIỆN QUA AUDIT:** Trong [backend/controllers/communityController.js:1549](file:///c:/Users/anhqu/Documents/Computer%20Science%20Training/PRIVATE%20PROJECT/9-5-ai-library/backend/controllers/communityController.js#L1549), câu lệnh `getNotifications` đang dùng:
    `LEFT JOIN community_posts p ON n.post_id = p.id WHERE n.user_id = ?`
    **Chưa có điều kiện `AND (p.is_hidden = 0 OR p.is_hidden IS NULL)`**. Do đó, nếu admin đã ẩn một bài viết vi phạm, thông báo về bài viết đó vẫn còn hiện trong chuông của người dùng. Cần bổ sung điều kiện lọc này vào backend.

---

### 7. Khảo sát Chức năng Ghim (Pinning)

#### 7.1. Cấu trúc dữ liệu Ghim
Bảng `community_posts` đã có đầy đủ 3 trường phục vụ ghim bài:
- `is_pinned TINYINT(1) NOT NULL DEFAULT 0`
- `pinned_at TIMESTAMP NULL DEFAULT NULL`
- `pinned_by INT NULL` (khoá ngoại tới `users.id`)
- Chỉ mục tối ưu: `INDEX idx_com_posts_pinned (is_pinned, pinned_at)`

#### 7.2. Giao diện Ghim hiện tại
- **Trên bài viết Bảng tin (`community-feed.html`):**
  - Trong [js/community-interactions.js:159-166](file:///c:/Users/anhqu/Documents/Computer%20Science%20Training/PRIVATE%20PROJECT/9-5-ai-library/js/community-interactions.js#L159-L166), khi người dùng là Admin/Owner mở menu `⋯` ở góc bài viết, giao diện tự động bổ sung nút:
    `<button type="button" class="com-dropdown-item--pin" data-com-pin-post="ID" data-com-pin-target="pin|unpin">📌 Pin post / 📌 Unpin post</button>`
  - Khi click ([dòng 304-325](file:///c:/Users/anhqu/Documents/Computer%20Science%20Training/PRIVATE%20PROJECT/9-5-ai-library/js/community-interactions.js#L304-L325)), script gửi request `PUT /api/community/posts/:id/pin` với `{ pinned: true|false }`.
  - Bài được ghim hiển thị nhãn `📌 Pinned Announcement` ([js/community-feed.js:93-96](file:///c:/Users/anhqu/Documents/Computer%20Science%20Training/PRIVATE%20PROJECT/9-5-ai-library/js/community-feed.js#L93-L96)) và viền nổi bật.

#### 7.3. Quyền hạn Ghim và Đề xuất
- **Middleware kiểm tra:** [backend/middlewares/authMiddleware.js:39-45](file:///c:/Users/anhqu/Documents/Computer%20Science%20Training/PRIVATE%20PROJECT/9-5-ai-library/backend/middlewares/authMiddleware.js#L39-L45) cung cấp hàm `isAdminOrOwner`:
  ```javascript
  exports.isAdminOrOwner = (req, res, next) => {
      if (req.user && (req.user.role === 'admin' || req.user.role === 'owner')) {
          next();
      } else {
          res.status(403).json({ error: 'You không có quyền Quản trị viên để thực hiện hành động này' });
      }
  };
  ```
- **Xác nhận yêu cầu:** Tuyệt đối chỉ cho phép **Owner** và **Admin** được ghim bài. Staff và Member thông thường không được phép ghim. Route `PUT /api/community/posts/:id/pin` hiện đã gắn đúng middleware `isAdminOrOwner`.
- **Số lượng ghim tối đa:** Backend [backend/controllers/communityController.js:404-413](file:///c:/Users/anhqu/Documents/Computer%20Science%20Training/PRIVATE%20PROJECT/9-5-ai-library/backend/controllers/communityController.js#L404-L413) đã khống chế cứng tối đa **3 bài ghim cùng lúc**. Nếu ghim bài thứ 4, hệ thống trả mã lỗi `400 Bad Request`.

---

### 8. Bảng tổng hợp các "Điểm móc" (Hook Points) sinh thông báo

| Sự kiện sinh thông báo | Vị trí File:Dòng | Có thông tin người nhận không | Đối tượng nên nhận thông báo | Trạng thái hiện tại trong Code |
| :--- | :--- | :--- | :--- | :--- |
| **Đăng bài mới (`createPost`)** | [backend/controllers/communityController.js:349](file:///c:/Users/anhqu/Documents/Computer%20Science%20Training/PRIVATE%20PROJECT/9-5-ai-library/backend/controllers/communityController.js#L349) | Có (truy vấn danh sách user) | - Nếu tác giả là Owner/Admin/Staff: Toàn bộ thành viên active.<br>- Nếu tác giả là Member: Ban quản trị (Owner, Admin, Staff). | **Đã kích hoạt:** Gọi hàm `notifyNewPost`. |
| **Ghim bài viết (`pinPost`)** | [backend/controllers/communityController.js:421-438](file:///c:/Users/anhqu/Documents/Computer%20Science%20Training/PRIVATE%20PROJECT/9-5-ai-library/backend/controllers/communityController.js#L421-L438) | Có (truy vấn tất cả users active) | Toàn bộ thành viên trong hệ thống (đặt lại `is_read = 0` để bài ghim luôn nổi lên). | **Đã kích hoạt:** Tự động phát thông báo ghim. |
| **Thích bài viết (`toggleLike`)** | [backend/controllers/communityController.js:599](file:///c:/Users/anhqu/Documents/Computer%20Science%20Training/PRIVATE%20PROJECT/9-5-ai-library/backend/controllers/communityController.js#L599) | Có (`post.user_id`) | Tác giả bài viết (nếu người like khác tác giả). | **Đã kích hoạt:** Gọi `createNotification(..., 'like', postId)`. |
| **Bình luận bài viết (`createComment`)** | [backend/controllers/communityController.js:686](file:///c:/Users/anhqu/Documents/Computer%20Science%20Training/PRIVATE%20PROJECT/9-5-ai-library/backend/controllers/communityController.js#L686) | Có (`post.user_id`) | Tác giả bài viết (và các thành viên cùng tham gia thảo luận). | **Đã kích hoạt:** Gọi `createNotification(..., 'comment', postId)`. |
| **Trả lời thảo luận (`createDiscussionReply`)** | [backend/controllers/communityController.js:1148](file:///c:/Users/anhqu/Documents/Computer%20Science%20Training/PRIVATE%20PROJECT/9-5-ai-library/backend/controllers/communityController.js#L1148) | Có (`discussion.user_id`) | Người khởi tạo chủ đề thảo luận. | **Đã kích hoạt:** Gọi `createNotification(..., 'reply', null)`. |
| **Nhắc tên (@mention)** | Frontend đã có định dạng `@mention` | Không | Người được gắn thẻ `@username` trong nội dung. | **Chưa có:** Backend chưa parse chuỗi `@mention` khi lưu post/comment. |
| **Tham gia nhóm (`joinGroup`)** | [backend/controllers/communityController.js:1380](file:///c:/Users/anhqu/Documents/Computer%20Science%20Training/PRIVATE%20PROJECT/9-5-ai-library/backend/controllers/communityController.js#L1380) | Có (`group.created_by`) | Người quản lý/sáng lập nhóm học tập. | **Chưa có:** Chưa gọi hàm tạo thông báo. |
| **Tạo bài giảng mới (`createLecture`)** | [backend/controllers/lmsController.js:288](file:///c:/Users/anhqu/Documents/Computer%20Science%20Training/PRIVATE%20PROJECT/9-5-ai-library/backend/controllers/lmsController.js#L288) | Có (truy vấn danh sách users) | Toàn bộ thành viên (nhóm Thông báo bài giảng). | **Chưa có:** Chưa tích hợp móc sang bảng thông báo. |
| **Tải lên tài nguyên (`createResource`)** | [backend/controllers/resourceController.js:150](file:///c:/Users/anhqu/Documents/Computer%20Science%20Training/PRIVATE%20PROJECT/9-5-ai-library/backend/controllers/resourceController.js#L150) | Có (danh sách users quan tâm môn) | Toàn bộ thành viên hoặc sinh viên cùng môn học. | **Chưa có:** Chưa tích hợp thông báo. |
| **Duyệt tài khoản mới (`updateUser`)** | [backend/controllers/adminController.js:46](file:///c:/Users/anhqu/Documents/Computer%20Science%20Training/PRIVATE%20PROJECT/9-5-ai-library/backend/controllers/adminController.js#L46) | Có (`targetUserId`) | Người dùng vừa được chuyển trạng thái `active`. | **Chưa có:** Chưa gửi thông báo chào mừng. |
| **Kết quả kiểm duyệt (`handleReport`)** | [backend/controllers/moderationController.js:292-327](file:///c:/Users/anhqu/Documents/Computer%20Science%20Training/PRIVATE%20PROJECT/9-5-ai-library/backend/controllers/moderationController.js#L292-L327) | Có (`reporter_id` và `author_id`) | Người gửi báo cáo (đã xử lý) và tác giả bài viết vi phạm (bị ẩn/xoá). | **Chưa có:** Mới chỉ ghi log vào `audit_logs`. |

---

## PHẦN C: DỮ LIỆU, QUYỀN, THỜI GIAN THỰC

### 9. Quy mô người dùng, Di chuyển dữ liệu (Migration) & An toàn cơ sở dữ liệu
- **Quy mô dữ liệu thực tế trong Database:**
  - Qua kiểm tra trực tiếp qua kết nối MySQL:
    - Bảng `users`: Có 5 người dùng mẫu gồm **1 Owner, 1 Admin, 1 Staff, 2 Members**, tất cả đều ở trạng thái `status = 'active'`.
    - Bảng `community_posts`: Đang có 21 bài viết.
    - Bảng `community_notifications`: Đang có 16 dòng thông báo mẫu.
  - Trạng thái người dùng (`pending`/`banned`) có ảnh hưởng trực tiếp đến thông báo:
    - Tài khoản `banned` hoặc `pending` bị chặn quyền tạo tương tác (`canWriteCommunity`).
    - Khi phát thông báo toàn hệ thống (`notifyNewPost`), truy vấn luôn lọc `WHERE status = 'active' AND id != ?`, do đó người dùng đang bị khoá hoặc chờ duyệt sẽ không bị gửi thông báo rác.
- **Quy chuẩn Migration trong `backend/config/initDb.js`:**
  - Tính lũy kế (Idempotent): Tất cả câu lệnh tạo bảng dùng `CREATE TABLE IF NOT EXISTS`.
  - Bổ sung cột mới: Truy vấn bảng `INFORMATION_SCHEMA.COLUMNS` với `TABLE_SCHEMA = DATABASE() AND TABLE_NAME = ? AND COLUMN_NAME = ?`. Chỉ chạy `ALTER TABLE ADD COLUMN` khi cột chưa tồn tại.
  - Bổ sung chỉ mục (Index): Kiểm tra `INFORMATION_SCHEMA.STATISTICS` trước khi `ADD INDEX`.
  - Khóa ngoại: Kiểm tra `INFORMATION_SCHEMA.TABLE_CONSTRAINTS` trước khi `ADD CONSTRAINT`, luôn kèm quy tắc `ON DELETE CASCADE` (xoá post/user tự dọn thông báo) hoặc `ON DELETE SET NULL` (`pinned_by`).
  - Mã hoá ký tự đồng bộ: `ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`.
- **Nguy cơ từ script seed/backup:**
  - `backend/seed.js`: Dùng `INSERT IGNORE INTO users ...`, không xoá bảng.
  - `backend/seedCommunity.js`: Kiểm tra `if (postCount[0].count > 0) process.exit(0);`, không xoá bảng.
  - Tuyệt đối không có lệnh `DROP TABLE` hay `TRUNCATE TABLE` trong toàn bộ mã nguồn khởi tạo.

---

### 10. Cơ chế Thời gian thực và Giao tiếp Frontend - Backend
- **Công nghệ hiện tại:** Chưa có WebSocket hoặc Server-Sent Events (SSE). Hệ thống sử dụng kiến trúc RESTful HTTP API thuần túy.
- **Phương thức gọi API của Frontend:**
  - Gọi qua đường dẫn tương đối `/api/...` (nhờ server Node.js Express phục vụ cả static files và API trên cổng 3000).
  - Đính kèm token xác thực: Lấy từ `localStorage.getItem('token')` và truyền trong header `Authorization: Bearer <token>`.
  - Khách vãng lai chưa đăng nhập: Khi click vào chuông, hàm chặn capture ([js/notifications-bell.js:335-352](file:///c:/Users/anhqu/Documents/Computer%20Science%20Training/PRIVATE%20PROJECT/9-5-ai-library/js/notifications-bell.js#L335-L352)) ngăn mở dropdown và mở modal `#auth-guard-overlay` yêu cầu đăng nhập.
  - Token hết hạn (HTTP 401): [js/community-core.js:43-48](file:///c:/Users/anhqu/Documents/Computer%20Science%20Training/PRIVATE%20PROJECT/9-5-ai-library/js/community-core.js#L43-L48) hiển thị thông báo toast và chuyển hướng về `/pages/auth/login.html`.
- **Cơ chế Polling đề xuất:**
  - Hiện tại `notifications-bell.js` đã triển khai polling định kỳ **60 giây một lần**:
    - Chỉ chạy khi người dùng đã đăng nhập (`localStorage.getItem('token')`).
    - Lắng nghe sự kiện `document.addEventListener('visibilitychange', ...)`: Tạm dừng polling khi tab bị ẩn (`document.hidden === true`) và kích hoạt cập nhật ngay khi tab hiển thị trở lại.
    - Cập nhật danh sách chi tiết ngay lập tức khi người dùng click vào nút chuông.
  - **Đồng bộ đa tab (Multi-tab Sync):**
    - Đề xuất bổ sung sự kiện `window.addEventListener('storage', ...)` với khoá `lib95:notif:update` hoặc sử dụng `BroadcastChannel('lib95_notifications')`. Khi người dùng click "Mark all as read" ở Tab A, Tab B sẽ lập tức ẩn chấm đỏ mà không cần chờ hết chu kỳ 60 giây.

---

### 11. Thiết kế Mô hình Dữ liệu Thông báo: Đánh giá & So sánh

#### 11.1. So sánh 2 phương án kiến trúc
1. **Phương án A: Fan-out khi ghi (Mỗi người nhận 1 bản ghi riêng trong `community_notifications`):**
   - *Ưu điểm:* Truy vấn đọc cực kỳ đơn giản và nhanh `O(1)`: `SELECT * FROM community_notifications WHERE user_id = ? ORDER BY ... LIMIT 8`. Đếm số chưa đọc nhanh nhất: `SELECT COUNT(*) FROM community_notifications WHERE user_id = ? AND is_read = 0` sử dụng index tổ hợp `(user_id, is_read)`. Quản lý trạng thái đã đọc/xoá hoàn toàn độc lập cho từng người dùng.
   - *Nhược điểm:* Tốn dung lượng đĩa khi hệ thống có hàng chục vạn người dùng (mỗi bài đăng sinh ra n bản ghi).
2. **Phương án B: Bảng sự kiện chung (`notifications`) + Bảng đọc (`notification_reads`):**
   - *Ưu điểm:* Tiết kiệm dòng ghi khi một bài đăng được phát đi (chỉ ghi 1 dòng sự kiện).
   - *Nhược điểm:* Truy vấn đọc và đếm số lượng chưa đọc trở nên phức tạp và nặng nề vì phải `LEFT JOIN` và kiểm tra điều kiện loại trừ, phân trang khó tối ưu khi kết hợp giữa thông báo cá nhân và thông báo phát sóng.

#### 11.2. Lựa chọn và Đề xuất tối ưu
- **Lựa chọn:** **Phương án A (Fan-out khi ghi)** đã được tích hợp trong dự án và là lựa chọn phù hợp nhất với quy mô của 9.5 AI CLUB (quy mô nội bộ/câu lạc bộ từ vài chục đến vài nghìn người dùng).
- **Chỉ mục bắt buộc (Đã có trong `initDb.js`):**
  - `INDEX idx_com_notif_user_read (user_id, is_read)`: Phục vụ đếm badge chưa đọc.
  - `INDEX idx_com_notif_user_created (user_id, created_at)`: Phục vụ phân trang xem danh sách.
  - `INDEX idx_com_notif_post (post_id)`: Phục vụ xoá cascade và đồng bộ ghim.
- **Chính sách dọn dẹp và thời gian lưu trữ:**
  - Thông báo đã đọc lưu trữ tối đa **90 ngày**.
  - Có thể chạy tác vụ dọn dẹp định kỳ:
    `DELETE FROM community_notifications WHERE is_read = 1 AND created_at < DATE_SUB(NOW(), INTERVAL 90 DAY);`
  - Khi bài viết bị xoá khỏi `community_posts`, ràng buộc `ON DELETE CASCADE` tự động xoá toàn bộ thông báo liên quan, đảm bảo không có bản ghi mồ côi.

---

### 12. Cài đặt Thông báo Người dùng & Bộ lọc Client-side

#### 12.1. Cấu trúc lưu trữ trong LocalStorage
- Trong [js/settings-core.js:11](file:///c:/Users/anhqu/Documents/Computer%20Science%20Training/PRIVATE%20PROJECT/9-5-ai-library/js/settings-core.js#L11), dữ liệu cài đặt lưu tại key:
  `lib95:settings:data`
- Cấu trúc đối tượng `notifications` trong [js/settings-data.js:21-27](file:///c:/Users/anhqu/Documents/Computer%20Science%20Training/PRIVATE%20PROJECT/9-5-ai-library/js/settings-data.js#L21-L27):
  ```json
  {
    "settings": {
      "notifications": {
        "lectureUpdates": true,
        "assignmentReminders": true,
        "communityActivity": false,
        "productUpdates": true,
        "frequency": "Immediately"
      }
    }
  }
  ```
  > [!IMPORTANT]
  > Giá trị mặc định của `communityActivity` trong mã nguồn hiện tại là **`false`**.

#### 12.2. Chiến lược phân loại và lọc thông báo tại Client
Nếu bộ lọc client-side lọc cứng theo `communityActivity === false`, người dùng mới đăng ký sẽ không nhìn thấy bất kỳ thông báo cộng đồng nào. Do đó quy tắc phân loại thông minh cần áp dụng như sau:
1. **Thông báo Ghim (`is_pinned === 1`):** **LUÔN LUÔN HIỂN THỊ**, bỏ qua mọi công tắc cài đặt vì đây là thông báo khẩn cấp/quan trọng từ Ban Quản trị.
2. **Thông báo từ Ban Quản trị (Owner / Admin / Staff):** Phân loại là **System / Announcement (Product updates)** -> Hiển thị khi `productUpdates !== false`, không bị chặn bởi công tắc `communityActivity`.
3. **Thông báo cập nhật Bài giảng (`type === 'lecture'`):** Phân loại là **Lecture updates** -> Phụ thuộc vào công tắc `lectureUpdates`.
4. **Tương tác trực tiếp tới chính người dùng (Ai đó Like bài tôi, Comment bài tôi):** Phân loại là **Direct Alerts** -> Luôn hiển thị vì liên quan trực tiếp đến tài khoản.
5. **Hoạt động cộng đồng chung từ thành viên khác (Member đăng bài mới vào feed):** Phân loại là **Community activity** -> Lọc theo công tắc `communityActivity`.

---

### 13. Bảo mật, Chống XSS & Kiểm soát Spam / Tần suất

#### 13.1. Phân quyền và Bảo mật dữ liệu
- Mọi API truy vấn thông báo (`getNotifications`, `getUnreadCount`, `markNotificationRead`, `markAllNotificationsRead`) đều bắt buộc qua middleware `verifyToken`.
- Bộ điều khiển [backend/controllers/communityController.js:1519](file:///c:/Users/anhqu/Documents/Computer%20Science%20Training/PRIVATE%20PROJECT/9-5-ai-library/backend/controllers/communityController.js#L1519) luôn cố định điều kiện:
  `WHERE n.user_id = req.user.id`
  Tuyệt đối không nhận `user_id` từ query params của client, đảm bảo người dùng chỉ xem và thao tác được trên thông báo của chính mình.

#### 13.2. Phòng chống tấn công XSS
- Tiêu đề bài viết và tên người gửi do người dùng tự do nhập liệu có nguy cơ chứa mã độc `<script>` hoặc HTML injection.
- Cơ chế phòng ngừa hiện tại:
  - Trong [js/notifications-bell.js:28-36](file:///c:/Users/anhqu/Documents/Computer%20Science%20Training/PRIVATE%20PROJECT/9-5-ai-library/js/notifications-bell.js#L28-L36): Hàm `escapeHtml()` chuyển đổi triệt để các ký tự `&`, `<`, `>`, `"`, `'` thành HTML entities an toàn.
  - Trong [js/community-notifications.js:83-99](file:///c:/Users/anhqu/Documents/Computer%20Science%20Training/PRIVATE%20PROJECT/9-5-ai-library/js/community-notifications.js#L83-L99): Sử dụng `document.createTextNode()` và helper `makeElement()` gán qua `.textContent`, ngăn chặn việc biên dịch HTML độc hại.

#### 13.3. Giới hạn tốc độ (Rate Limiting) & Gộp thông báo (Aggregation)
- **Hiện tượng Spam Like/Unlike:** Trong `communityController.js:toggleLike`, nếu một user liên tục like/unlike một bài viết, mỗi lần like hệ thống lại sinh thêm một dòng thông báo mới.
  - *Giải pháp đề xuất:* Khi like, kiểm tra xem đã có thông báo `like` chưa đọc nào từ actor này cho post này trong vòng 24 giờ qua chưa (`SELECT id FROM community_notifications WHERE user_id = ? AND actor_id = ? AND type = 'like' AND post_id = ? AND is_read = 0`). Nếu có rồi thì không insert thêm.
- **Gộp thông báo (Notification Aggregation):**
  - Khi có 10 người cùng like một bài viết, thay vì hiển thị 10 dòng riêng lẻ, câu truy vấn hoặc module hiển thị có thể nhóm lại thành: *"Alex và 9 người khác đã thích bài viết của bạn"*.

---

## PHẦN D: GIAO DIỆN ĐỂ ĐỒNG BỘ

### 14. Bảng mẫu UI Linh kiện Tái sử dụng (Reusable UI Patterns)

| Thành phần UI | Tên Class / Hàm đại diện | File định nghĩa / Script | Mô tả ứng dụng cho hệ thống thông báo |
| :--- | :--- | :--- | :--- |
| **Dropdown Menu** | `createDropdown(toggle, list, container)` | `js/main.js:8-53` | Đóng mở popup chuông, animation `menu-drop` / `menu-lift`, bẫy click ngoài & Esc. |
| **Thanh Tab lọc** | `.notif-tabs`, `.notif-tab`, `.notif-tab.is-active` | `css/notifications.css:343-391` | Segmented control dạng viên thuốc bo tròn (All, Unread, Pinned) có đếm số lượng. |
| **Thẻ danh sách (Card)** | `.notif-full-card`, `.notif-full-card.is-unread` | `css/notifications.css:410-440` | Card thông báo trên trang đầy đủ, có hover nâng nhẹ `translateY(-2px)`. |
| **Huy hiệu Vai trò** | `.notif-role-badge--owner`, `--admin`, `--staff` | `css/notifications.css:185-212` | Micro-badge gắn cạnh tên (Owner đỏ `--badge-owner-bg`, Admin xanh, Staff tím). |
| **Đồng bộ Avatar** | `syncProfile.js`, class `.notif-avatar` | `js/syncProfile.js`, `notifications.css:129` | Tự động đồng bộ ảnh đại diện hoặc chữ cái viết hoa đầu của họ tên. |
| **Thời gian tương đối** | `formatRelativeTime(date)`, `app.relativeTime` | `notifications-bell.js:14`, `community-core.js:87` | Hiển thị "Just now", "5m ago", "2h ago", "1d ago" tự nhiên. |
| **Toast thông báo** | `app.showToast(msg)`, `.com-toast` | `js/community-core.js:63-84` | Hộp thông báo nổi góc màn hình khi đánh dấu đã đọc hoặc gặp lỗi. |
| **Trạng thái rỗng** | `.notif-empty`, `.notif-empty-icon` | `css/notifications.css:283-298` | Minh hoạ chuông mờ kèm thông điệp "You're all caught up!" khi không có thông báo. |
| **Khung chờ tải (Skeleton)**| `.notif-skeleton-item`, `.notif-skeleton-avatar` | `css/notifications.css:300-333` | Animation mờ tỏ `notifPulse` tạo cảm giác tải mượt mà trước khi có dữ liệu thật. |

---

### 15. Thiết kế và Cấu trúc Trang "View All" (`community-notifications.html`)
- **Cấu trúc Layout:** Sao chép nguyên mẫu chuẩn của phân hệ Community (`sidebar` cố định bên trái, `topbar` với ô tìm kiếm và chuông ở trên, vùng nội dung `com-main` cuộn độc lập).
- **Mục Sidebar kích hoạt:** Duy trì highlight tại mục **Community** (`<a href="../community/community-feed.html" class="nav-link is-active">`).
- **Ngôn ngữ hiển thị:** Đồng bộ tiếng Anh chuẩn quốc tế theo toàn bộ hệ thống topbar và sidebar (`Notifications`, `All`, `Unread`, `Pinned Announcements`, `Mark all as read`, `Load more notifications`).
- **Các Script bắt buộc phải nạp:**
  1. `/js/theme-init.js` (Bắt buộc ở đầu thẻ `<head>` để chống chớp trắng FOUC).
  2. `/js/main.js` (Điều khiển dropdowns).
  3. `/js/community-data.js` & `/js/community-core.js` (Thư viện tiện ích, API fetch, relative time).
  4. `/js/notifications-bell.js` (Điều khiển chuông topbar).
  5. `/js/community-notifications.js` (Điều khiển trang xem toàn bộ thông báo).
  6. `/js/syncProfile.js` (Đồng bộ họ tên và avatar user menu).

---

### 16. Thiết kế chi tiết cho Thông báo GHIM (Pinned Notification)
- **Vị trí hiển thị:**
  - *Trên Dropdown chuông:* Luôn được ưu tiên sắp xếp ở các vị trí đầu tiên của danh sách, đứng trước các thông báo thông thường nhờ mệnh đề SQL: `ORDER BY COALESCE(p.is_pinned, 0) DESC, p.pinned_at DESC, n.created_at DESC`.
  - *Trên trang View All:* Được gom thành một phân khu nổi bật riêng biệt ở trên cùng mang tên **📌 PINNED ANNOUNCEMENTS** ([css/notifications.css:393-407](file:///c:/Users/anhqu/Documents/Computer%20Science%20Training/PRIVATE%20PROJECT/9-5-ai-library/css/notifications.css#L393-L407)), sau đó mới đến danh sách thông báo thường.
- **Phong cách thị giác (Visual Style):**
  - Nền nhấn đồng bộ token: `var(--color-primary-soft)` (hòa trộn theo accent color hiện tại).
  - Viền nhấn: Đường viền trái `3px solid var(--color-primary)` tạo điểm nhấn thị giác rõ ràng.
  - Biểu tượng ghim: Dùng icon 📌 thay cho chuông hoặc bút viết.
  - Huy hiệu trạng thái: Nhãn `.notif-badge-pinned` nền mờ chữ đậm `📌 Pinned`.
- **Giới hạn số lượng ghim:** Tối đa **3 bài ghim** trong toàn hệ thống.
- **Thứ tự nhiều bài ghim:** Sắp xếp theo `pinned_at DESC` (bài nào được ghim gần nhất sẽ nằm trên cùng).
- **Hành vi khi đã đọc:** Sau khi người dùng bấm vào xem và thông báo đã được đánh dấu `is_read = 1`, thông báo ghim **vẫn giữ nguyên vị trí trên cùng và phong cách viền nhấn ghim**; chỉ có chấm xanh báo chưa đọc là biến mất.

---

### 17. Điều hướng và Xử lý Anchor khi bấm vào Thông báo
- **Bản đồ điều hướng theo loại:**
  - Thông báo bài viết mới, like, comment, mention: Dẫn về `/pages/community/community-feed.html#post-${post_id}`.
  - Thông báo trả lời thảo luận: Dẫn về `/pages/community/community-discussions.html`.
  - Thông báo cập nhật nhóm: Dẫn về `/pages/community/community-groups.html`.
  - Thông báo bài giảng mới: Dẫn về `/pages/lectures/lecture.html?id=${lecture_id}`.
- **Vấn đề phát hiện tại trang Feed:**
  - Trong [js/community-feed.js:89-90](file:///c:/Users/anhqu/Documents/Computer%20Science%20Training/PRIVATE%20PROJECT/9-5-ai-library/js/community-feed.js#L89-L90), thẻ bài viết hiện chỉ có `card.dataset.comPostId = post.id` mà **chưa gán thuộc tính `id="post-${post.id}"`**.
  - Đồng thời, feed nạp bài viết bất đồng bộ qua API nên khi trình duyệt nhảy tới hash `#post-12`, phần tử chưa kịp xuất hiện trong DOM.
  - *Yêu cầu hoàn thiện:* Cần gán `card.id = 'post-' + post.id` và trong hàm hoàn tất tải feed, kiểm tra `if (window.location.hash)` để tự động cuộn mượt (`scrollIntoView({ behavior: 'smooth', block: 'center' })`) và thêm hiệu ứng viền sáng nhẹ trong 2 giây.

---

## PHẦN E: ĐỀ XUẤT VÀ RỦI RO

### 18. Danh sách File Cần Sửa / Cần Tạo & Đánh giá Rủi ro Hồi quy

#### 18.1. Phân nhóm File

**Nhóm Bắt buộc (Mandatory):**
1. [backend/controllers/communityController.js](file:///c:/Users/anhqu/Documents/Computer%20Science%20Training/PRIVATE%20PROJECT/9-5-ai-library/backend/controllers/communityController.js):
   - Thêm điều kiện lọc `(p.is_hidden = 0 OR p.is_hidden IS NULL)` vào `getNotifications` và `getUnreadCount`.
   - Chặn spam lặp thông báo like khi user toggle liên tục.
2. [js/community-feed.js](file:///c:/Users/anhqu/Documents/Computer%20Science%20Training/PRIVATE%20PROJECT/9-5-ai-library/js/community-feed.js):
   - Bổ sung `card.id = 'post-' + post.id` và hàm cuộn tới bài viết theo anchor `#post-ID`.
3. [pages/admin/admin.html](file:///c:/Users/anhqu/Documents/Computer%20Science%20Training/PRIVATE%20PROJECT/9-5-ai-library/pages/admin/admin.html) hoặc [js/admin.js](file:///c:/Users/anhqu/Documents/Computer%20Science%20Training/PRIVATE%20PROJECT/9-5-ai-library/js/admin.js):
   - Tích hợp nạp `notifications-bell.js` và `notifications.css` để chuông trang Admin kết nối dữ liệu thật.
4. [js/notifications-bell.js](file:///c:/Users/anhqu/Documents/Computer%20Science%20Training/PRIVATE%20PROJECT/9-5-ai-library/js/notifications-bell.js):
   - Bổ sung phát sóng `BroadcastChannel` hoặc `storage` event để đồng bộ tức thì trạng thái đọc giữa các tab trình duyệt.

**Nhóm Tùy chọn mở rộng (Optional / Enhancements):**
1. [backend/controllers/lmsController.js](file:///c:/Users/anhqu/Documents/Computer%20Science%20Training/PRIVATE%20PROJECT/9-5-ai-library/backend/controllers/lmsController.js):
   - Tích hợp hook point phát thông báo khi Admin tạo bài giảng mới (`createLecture`).
2. [backend/controllers/resourceController.js](file:///c:/Users/anhqu/Documents/Computer%20Science%20Training/PRIVATE%20PROJECT/9-5-ai-library/backend/controllers/resourceController.js):
   - Tích hợp hook point thông báo khi có tài liệu mới được chia sẻ.
3. [backend/controllers/moderationController.js](file:///c:/Users/anhqu/Documents/Computer%20Science%20Training/PRIVATE%20PROJECT/9-5-ai-library/backend/controllers/moderationController.js):
   - Gửi thông báo kết quả kiểm duyệt tới người gửi báo cáo.

#### 18.2. Đánh giá Rủi ro Hồi quy (Regression Matrix)
- **Rủi ro trên 22 trang có chuông:** Rất thấp nếu tiếp tục duy trì cơ chế inject tự động của `notifications-bell.js`. Không được sửa cấu trúc HTML của 22 trang để tránh lỗi FOUC hoặc vỡ giao diện.
- **Rủi ro Dark Theme / Accent Colors:** Không có rủi ro vì `css/notifications.css` sử dụng 100% biến CSS (`var(--card-bg-elevated)`, `var(--color-primary)`, `var(--card-border)`) đã được chuẩn hóa ở các giai đoạn trước.
- **Rủi ro Cài đặt người dùng:** Cần thận trọng với giá trị mặc định `communityActivity: false` trong `lib95:settings:data`. Khuyến nghị coi các bài viết ghim và bài đăng từ Owner/Admin/Staff là Thông báo hệ thống để không bao giờ bị lọc mất.

---

### 19. Lộ trình Thực hiện theo Giai đoạn (Implementation Roadmap)

#### Giai đoạn 1: Hoàn thiện Backend, Lọc bài ẩn & Quyền hạn Ghim
- **Phạm vi file:** `backend/controllers/communityController.js`, `backend/routes/communityRoutes.js`.
- **Nội dung:**
  - Bổ sung điều kiện `(p.is_hidden = 0 OR p.is_hidden IS NULL)` vào `getNotifications` và `getUnreadCount`.
  - Kiểm tra và đảm bảo chỉ `owner` và `admin` được gọi `PUT /api/community/posts/:id/pin`.
  - Chống spam duplicate like notifications trong 24h.
- **Cách kiểm tra:** Dùng Postman hoặc curl test ghim bài với token của Member (phải trả 403), Admin (trả 200); kiểm tra ẩn bài viết thì thông báo của bài đó không còn trả về trong danh sách.

#### Giai đoạn 2: Chuẩn hóa Module Chuông dùng chung & Đồng bộ Đa tab
- **Phạm vi file:** `js/notifications-bell.js`, `css/notifications.css`, `pages/admin/admin.html`.
- **Nội dung:**
  - Đảm bảo `notifications-bell.js` hoạt động hoàn hảo trên cả 22 trang (kể cả `index.html` và `pages/admin/admin.html`).
  - Tích hợp `BroadcastChannel('lib95_notifications')` để khi đọc ở Tab 1, Tab 2 cập nhật chấm đỏ tức thì.
- **Cách kiểm tra:** Mở đồng thời 2 tab trình duyệt trên cùng một tài khoản, click đọc thông báo ở tab A và quan sát chấm đỏ ở tab B tự biến mất.

#### Giai đoạn 3: Tinh chỉnh Trang View All & Điều hướng Anchor Feed
- **Phạm vi file:** `pages/community/community-notifications.html`, `js/community-notifications.js`, `js/community-feed.js`.
- **Nội dung:**
  - Thêm thuộc tính `id="post-${post.id}"` vào card bài viết trong `community-feed.js`.
  - Thêm logic tự cuộn và highlight bài viết khi có URL dạng `#post-123`.
  - Kiểm tra các tab All, Unread, Pinned trên trang `community-notifications.html`.
- **Cách kiểm tra:** Từ trang View All, bấm vào một thông báo bình luận, kiểm tra trình duyệt chuyển sang trang Feed và cuộn đúng vào vị trí bài viết đó.

#### Giai đoạn 4: Tích hợp các Điểm móc (Hook Points) Mở rộng
- **Phạm vi file:** `backend/controllers/lmsController.js`, `backend/controllers/resourceController.js`.
- **Nội dung:**
  - Gắn hàm sinh thông báo khi tạo bài giảng LMS mới hoặc tải lên tài nguyên quan trọng.
- **Cách kiểm tra:** Đăng nhập tài khoản Admin, tạo một bài giảng mới trong trang Quản trị, sau đó đăng nhập tài khoản Member và kiểm tra xem chuông có nhận được thông báo bài giảng mới hay không.

#### Giai đoạn 5: Tích hợp Bộ lọc Settings & Kiểm thử Hồi quy Tổng thể
- **Phạm vi file:** `js/community-notifications.js`, `js/notifications-bell.js`.
- **Nội dung:**
  - Áp dụng bộ lọc client-side dựa trên `lib95:settings:data`, đảm bảo bài ghim và thông báo ban quản trị luôn hiển thị.
  - Kiểm tra toàn bộ 22 trang ở cả Light Mode, Dark Mode và 5 tông màu accent (Blue, Green, Purple, Orange, Dark Blue).
- **Cách kiểm tra:** Bật/tắt các công tắc trong Settings > Notifications, kiểm tra thông báo xuất hiện đúng theo tuỳ chọn và không xảy ra lỗi console trên bất kỳ trang nào.
