# SƠ ĐỒ TRẠNG THÁI HỆ THỐNG - 6 THỰC THỂ CỐT LÕI (06_state_diagrams.md)

**Dự án:** 9-5-ai-library  
**Phiên bản:** v1  
**Ghi chú kiểm tra:** Viết bằng chuẩn `stateDiagram-v2` của Mermaid. Cú pháp đã tự rà soát từng sơ đồ đảm bảo không có từ khoá lỗi.

---

## 1. TRẠNG THÁI TÀI KHOẢN NGƯỜI DÙNG (USER ACCOUNT STATE)
- **Mục đích:** Mô tả vòng đời của một tài khoản từ lúc đăng ký, chờ duyệt, hoạt động, bị khoá và xoá khỏi cơ sở dữ liệu.
- **Nguồn:** [`backend/controllers/authController.js:25-30, 98`](file:///c:/Users/anhqu/Documents/Computer%20Science%20Training/PRIVATE%20PROJECT/9-5-ai-library/backend/controllers/authController.js#L25-L30), [`backend/controllers/adminController.js:27-31`](file:///c:/Users/anhqu/Documents/Computer%20Science%20Training/PRIVATE%20PROJECT/9-5-ai-library/backend/controllers/adminController.js#L27-L31), [`backend/controllers/userController.js:86`](file:///c:/Users/anhqu/Documents/Computer%20Science%20Training/PRIVATE%20PROJECT/9-5-ai-library/backend/controllers/userController.js#L86).

```mermaid
stateDiagram-v2
    [*] --> Pending: Đăng ký khi require_approval = true
    [*] --> Active: Đăng ký khi require_approval = false

    Pending --> Active: Admin phê duyệt tài khoản (status = 'active')
    Pending --> Banned: Admin từ chối / khoá tài khoản

    Active --> Banned: Admin khoá tài khoản do vi phạm
    Banned --> Active: Admin mở khoá (Unban)

    Active --> Deleted: Người dùng tự xoá tài khoản (DELETE /api/users/me)
    Banned --> Deleted: Admin xoá người dùng khỏi hệ thống

    Deleted --> [*]: Bản ghi bị xoá vĩnh viễn khỏi MySQL (Cascade xoá dữ liệu)

    note right of Pending
        Bị chặn đăng nhập tại authController
        với mã HTTP 403
    end note

    note right of Banned
        Bị chặn đăng nhập và hiển thị
        Overlay khoá toàn màn hình ở frontend
    end note
```

---

## 2. TRẠNG THÁI TIẾN ĐỘ BÀI GIẢNG THEO HỌC VIÊN (LECTURE PROGRESS STATE)
- **Mục đích:** Mô tả trạng thái của từng bài giảng đối với một học viên (Khoá, Đang học, Hoàn thành).
- **Nguồn:** [`js/lectures-core.js:70-90, 135-155`](file:///c:/Users/anhqu/Documents/Computer%20Science%20Training/PRIVATE%20PROJECT/9-5-ai-library/js/lectures-core.js#L70-L90), [`js/lecture-player.js:200-220, 310-315`](file:///c:/Users/anhqu/Documents/Computer%20Science%20Training/PRIVATE%20PROJECT/9-5-ai-library/js/lecture-player.js#L200-L220).

```mermaid
stateDiagram-v2
    [*] --> Locked: Bài giảng thứ 2 trở đi trong khoá học
    [*] --> InProgress: Bài giảng đầu tiên trong lộ trình môn học

    Locked --> InProgress: Bài giảng liền trước đạt trạng thái Completed
    
    InProgress --> InProgress: Học viên xem video (< 90% thời lượng)
    InProgress --> Completed: Học viên xem video đạt >= 90% thời lượng

    Completed --> InProgress: Học viên chủ động xoá cache / học lại từ đầu (Đề xuất)
    
    Completed --> [*]

    note right of Locked
        Icon ổ khoá xám
        Không thể click vào xem video
    end note

    note right of InProgress
        Icon đồng hồ xanh
        Lưu số giây xem dở dang vào localStorage
    end note

    note right of Completed
        Icon tích xanh hoàn thành
        Lưu ID vào mảng completedIds
    end note
```

---

## 3. TRẠNG THÁI BÀI VIẾT BẢNG TIN CỘNG ĐỒNG (COMMUNITY POST STATE)
- **Mục đích:** Mô tả các trạng thái hiển thị của bài viết: Bình thường, Được ghim, Bị ẩn do kiểm duyệt và Đã xoá.
- **Nguồn:** [`backend/controllers/communityController.js:180-260, 330-380`](file:///c:/Users/anhqu/Documents/Computer%20Science%20Training/PRIVATE%20PROJECT/9-5-ai-library/backend/controllers/communityController.js#L180-L260), [`backend/controllers/moderationController.js:290-325`](file:///c:/Users/anhqu/Documents/Computer%20Science%20Training/PRIVATE%20PROJECT/9-5-ai-library/backend/controllers/moderationController.js#L290-L325).

```mermaid
stateDiagram-v2
    [*] --> Visible: Thành viên đăng bài viết thành công (is_hidden = 0)

    Visible --> Pinned: Admin ghim bài viết lên đầu (is_pinned = 1, tối đa 3 bài)
    Pinned --> Visible: Admin bỏ ghim bài viết (is_pinned = 0)

    Visible --> Hidden: Admin xử lý báo cáo vi phạm: Ẩn bài viết (is_hidden = 1)
    Pinned --> Hidden: Admin ẩn bài viết vi phạm đang ghim

    Hidden --> Visible: Admin khôi phục bài viết (Restore: is_hidden = 0)

    Visible --> Deleted: Tác giả hoặc Admin xoá bài viết
    Pinned --> Deleted: Tác giả hoặc Admin xoá bài viết
    Hidden --> Deleted: Admin duyệt xoá vĩnh viễn nội dung vi phạm

    Deleted --> [*]: Bản ghi bị DELETE khỏi MySQL (Cascade xoá like, comment, tag, poll)
```

---

## 4. TRẠNG THÁI THÔNG BÁO CỘNG ĐỒNG (NOTIFICATION STATE)
- **Mục đích:** Mô tả trạng thái của thông báo gửi tới người dùng trong quá trình tiếp nhận và đọc.
- **Nguồn:** [`backend/controllers/communityController.js:1450-1550`](file:///c:/Users/anhqu/Documents/Computer%20Science%20Training/PRIVATE%20PROJECT/9-5-ai-library/backend/controllers/communityController.js#L1450-L1550), [`js/notifications-bell.js`](file:///c:/Users/anhqu/Documents/Computer%20Science%20Training/PRIVATE%20PROJECT/9-5-ai-library/js/notifications-bell.js).

```mermaid
stateDiagram-v2
    [*] --> Unread: Sự kiện mới sinh ra thông báo (is_read = 0)

    Unread --> Read: Học viên click xem thông báo cụ thể (is_read = 1)
    Unread --> Read: Học viên bấm nút "Mark all as read"

    Read --> Read: Học viên xem lại thông báo cũ trong danh sách

    Unread --> ExpiredOrDeleted: Bài viết gốc bị xoá (Cascade xoá thông báo liên quan)
    Read --> ExpiredOrDeleted: Bài viết gốc bị xoá

    ExpiredOrDeleted --> [*]

    note right of Unread
        Hiển thị chấm đỏ trên chuông topbar
        Được tính vào unreadCount
    end note

    note right of Read
        Ẩn chấm đỏ, chữ mờ hơn trong dropdown
    end note
```

---

## 5. VÒNG ĐỜI LƯỢT LÀM BÀI TRẮC NGHIỆM (QUIZ ATTEMPT LIFECYCLE)
- **Mục đích:** Mô tả các bước chuyển trạng thái từ lúc bắt đầu thi đến khi nộp bài và xem lại đáp án.
- **Nguồn:** [`js/practice-quiz.js`](file:///c:/Users/anhqu/Documents/Computer%20Science%20Training/PRIVATE%20PROJECT/9-5-ai-library/js/practice-quiz.js), [`pages/practice/practice-quiz-intro.html`](file:///c:/Users/anhqu/Documents/Computer%20Science%20Training/PRIVATE%20PROJECT/9-5-ai-library/pages/practice/practice-quiz-intro.html).

```mermaid
stateDiagram-v2
    [*] --> Idle: Xem trang giới thiệu bài thi (practice-quiz-intro.html)

    Idle --> InProgress: Bấm "Start Quiz" (Bắt đầu đếm ngược thời gian)
    
    InProgress --> InProgress: Học viên chọn đáp án từng câu (Autosave draft vào localStorage)
    
    InProgress --> Submitted: Học viên bấm "Submit" hoặc đồng hồ đếm ngược về 0
    
    Submitted --> Reviewed: Chuyển hướng sang practice-result.html (Tính điểm & hiện lời giải)
    
    Reviewed --> Idle: Học viên chọn thi lại đề này (Retake Quiz)
    Reviewed --> [*]: Học viên quay về danh mục môn học
```

---

## 6. VÒNG ĐỜI PHIÊN ĐĂNG NHẬP VÀ MÃ JWT (AUTH SESSION & JWT LIFECYCLE)
- **Mục đích:** Mô tả vòng đời của token xác thực từ khi đăng nhập đến khi hết hạn hoặc bị đăng xuất.
- **Nguồn:** [`backend/controllers/authController.js:38-55`](file:///c:/Users/anhqu/Documents/Computer%20Science%20Training/PRIVATE%20PROJECT/9-5-ai-library/backend/controllers/authController.js#L38-L55), [`backend/middlewares/authMiddleware.js:5-27`](file:///c:/Users/anhqu/Documents/Computer%20Science%20Training/PRIVATE%20PROJECT/9-5-ai-library/backend/middlewares/authMiddleware.js#L5-L27), [`js/syncProfile.js:80-90`](file:///c:/Users/anhqu/Documents/Computer%20Science%20Training/PRIVATE%20PROJECT/9-5-ai-library/js/syncProfile.js#L80-L90).

```mermaid
stateDiagram-v2
    [*] --> Unauthenticated: Khách truy cập lần đầu hoặc đã đăng xuất

    Unauthenticated --> ActiveSession: Đăng nhập thành công với thông tin hợp lệ
    
    ActiveSession --> ActiveSession: Gọi các API được bảo vệ kèm Bearer Token (Ghi nhận hit hoạt động)

    ActiveSession --> ExpiredSession: Hết hạn thời gian phiên (1 ngày đến 30 ngày theo cấu hình)
    ActiveSession --> Unauthenticated: Người dùng bấm "Logout" (Xoá token khỏi localStorage)
    
    ExpiredSession --> Unauthenticated: API trả về 401, client tự động xoá token và chuyển về login

    note right of ActiveSession
        Token lưu tại client localStorage
        Mã JWT chứa payload: id, username, role, status
    end note

    note right of ExpiredSession
        jwt.verify() quăng lỗi TokenExpiredError
        Server phản hồi HTTP 401
    end note
```
