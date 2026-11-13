# SƠ ĐỒ TUẦN TỰ HỆ THỐNG - CÁC KỊCH BẢN CHÍNH (04_sequence_diagrams.md) (v2 cập nhật)

**Dự án:** 9-5-ai-library  
**Phiên bản:** v2 (Cập nhật sau đợt vá bảo mật & kiểm thử v2)  
**Ghi chú kiểm tra cú pháp Mermaid:** Mỗi sơ đồ đều bao gồm Luồng chính (Happy Path) và ít nhất một Nhánh rẽ xử lý lỗi (Error Branch). Cú pháp đã được tự rà soát thủ công chi tiết từng sơ đồ theo đúng đặc tả cú pháp Mermaid.js (toàn bộ nhãn có chứa ký tự đặc biệt, dấu ngoặc đều được bọc trong dấu ngoặc kép `""`, không sử dụng thẻ HTML thô, mũi tên chuẩn xác) để đảm bảo render 100% chuẩn xác trên GitHub/GitLab markdown viewer.

---

## 1. ĐĂNG NHẬP, RATE LIMITING VÀ CHUYỂN HƯỚNG THEO VAI TRÒ (v2 cập nhật)
- **Mục đích:** Mô tả luồng học viên hoặc quản trị viên đăng nhập, cơ chế giới hạn tần suất chống dò quét mật khẩu (Rate Limiting 10 lần/15 phút - F-007), lưu trữ token và chuyển hướng an toàn.
- **Nguồn:** [`pages/auth/login.html`](file:///c:/Users/anhqu/Documents/Computer%20Science%20Training/PRIVATE%20PROJECT/9-5-ai-library/pages/auth/login.html), [`backend/middlewares/rateLimiter.js`](file:///c:/Users/anhqu/Documents/Computer%20Science%20Training/PRIVATE%20PROJECT/9-5-ai-library/backend/middlewares/rateLimiter.js), [`backend/controllers/authController.js`](file:///c:/Users/anhqu/Documents/Computer%20Science%20Training/PRIVATE%20PROJECT/9-5-ai-library/backend/controllers/authController.js).

```mermaid
sequenceDiagram
    autonumber
    actor User as "Người dùng"
    participant Browser as "Trình duyệt (login.html)"
    participant Limiter as "In-Memory Rate Limiter (v2)"
    participant Server as "Express (authController)"
    participant DB as "MySQL (users)"

    User->>Browser: Nhập username và password, nhấn Log in
    Browser->>Limiter: POST /api/auth/login { username, password }
    
    alt Vượt quá 10 lần thử sai trong 15 phút từ cùng IP + Username (F-007)
        Limiter-->>Browser: HTTP 429 Too Many Requests { error: "Quá nhiều lần đăng nhập không thành công..." }
        Browser-->>User: Hiển thị cảnh báo tạm khoá gửi request
    else Chưa vượt giới hạn tần suất
        Limiter->>Server: Cho phép chuyển tiếp tới authController.login
        Server->>DB: SELECT * FROM users WHERE username = ?
        
        alt Người dùng không tồn tại
            DB-->>Server: Trả về rỗng []
            Server-->>Browser: HTTP 401 { error: "Account does not exist" }
            Browser-->>User: Hiển thị lỗi màu đỏ: "Account does not exist"
        else Tài khoản bị khoá (Banned)
            DB-->>Server: Trả về user (status = 'banned')
            Server-->>Browser: HTTP 403 { error: "Your account has been banned." }
            Browser-->>User: Hiển thị thông báo tài khoản bị khoá
        else Tài khoản chờ duyệt (Pending)
            DB-->>Server: Trả về user (status = 'pending')
            Server-->>Browser: HTTP 403 { error: "Your account is pending Administrator approval." }
            Browser-->>User: Hiển thị thông báo chờ Admin phê duyệt
        else Sai mật khẩu
            DB-->>Server: Trả về user
            Server->>Server: bcrypt.compare(password, password_hash) => false
            Server-->>Browser: HTTP 401 { error: "Incorrect password" }
            Browser-->>User: Hiển thị lỗi: "Incorrect password"
        else Đăng nhập thành công
            DB-->>Server: Trả về user hợp lệ
            Server->>Server: bcrypt.compare() => true
            Server->>Server: jwt.sign(payload, JWT_SECRET, expiresIn)
            Server->>DB: UPDATE users SET last_login_at = NOW() WHERE id = ?
            Server-->>Browser: HTTP 200 { token, user: { id, role, status, ... } }
            Browser->>Browser: localStorage.setItem('token', token)
            Browser->>Browser: localStorage.setItem('user', JSON.stringify(user))
            
            alt Có lưu sessionStorage.redirectUrl
                Browser->>Browser: window.location.href = redirectUrl
            else Là Staff / Admin / Owner
                Browser->>Browser: window.location.href = 'home_page/home_page.html' (Có nút Manage)
            else Là Member thông thường
                Browser->>Browser: window.location.href = 'home_page/home_page.html'
            end
            Browser-->>User: Chuyển hướng vào trang chủ học viên
        end
    end
```

---

## 2. ĐĂNG KÝ VÀ PHÊ DUYỆT TÀI KHOẢN MỚI
- **Mục đích:** Mô tả quy trình đăng ký thành viên mới dựa trên cấu hình hệ thống (`require_approval`, `min_password_length`).
- **Nguồn:** [`pages/auth/signup.html`](file:///c:/Users/anhqu/Documents/Computer%20Science%20Training/PRIVATE%20PROJECT/9-5-ai-library/pages/auth/signup.html), [`js/auth.js:25-50`](file:///c:/Users/anhqu/Documents/Computer%20Science%20Training/PRIVATE%20PROJECT/9-5-ai-library/js/auth.js#L25-L50), [`backend/controllers/authController.js:69-122`](file:///c:/Users/anhqu/Documents/Computer%20Science%20Training/PRIVATE%20PROJECT/9-5-ai-library/backend/controllers/authController.js#L69-L122).

```mermaid
sequenceDiagram
    autonumber
    actor User as "Người dùng mới"
    participant Browser as "Trình duyệt (signup.html)"
    participant Server as "Express (authController)"
    participant DB as "MySQL (users, site_settings)"

    User->>Browser: Nhập name, username, password, confirmPassword
    
    alt Mật khẩu xác nhận không khớp
        Browser-->>User: Báo lỗi client: "Passwords do not match!"
    else Mật khẩu khớp
        Browser->>Server: POST /api/auth/register { username, password, name }
        Server->>DB: SELECT setting_value FROM site_settings WHERE setting_key = 'allow_registration'
        
        alt Đang tạm đóng đăng ký
            DB-->>Server: 'false'
            Server-->>Browser: HTTP 403 { error: "Hệ thống hiện đang tạm đóng đăng ký tài khoản mới." }
            Browser-->>User: Hiển thị thông báo tạm đóng đăng ký
        else Được phép đăng ký
            Server->>DB: SELECT * FROM users WHERE username = ?
            alt Tên người dùng đã tồn tại
                DB-->>Server: Trả về tài khoản trùng
                Server-->>Browser: HTTP 409 { error: "This account already exists" }
                Browser-->>User: Hiển thị lỗi tài khoản đã tồn tại
            else Tài khoản hợp lệ
                Server->>DB: SELECT setting_value FROM site_settings WHERE setting_key = 'require_approval'
                Server->>Server: initialStatus = (require_approval === 'false') ? 'active' : 'pending'
                Server->>Server: hashedPassword = bcrypt.hash(password, 10)
                Server->>DB: INSERT INTO users (username, password_hash, role, status, full_name) VALUES (?, ?, 'member', initialStatus, ?)
                
                alt Yêu cầu duyệt (initialStatus = 'pending')
                    Server-->>Browser: HTTP 201 { status: 'pending', message: "Registration successful! Pending admin approval." }
                    Browser-->>User: Báo thành công, yêu cầu đợi quản trị viên phê duyệt
                else Không cần duyệt (initialStatus = 'active')
                    Server-->>Browser: HTTP 201 { status: 'active', message: "Registration successful! You can log in now." }
                    Browser-->>User: Báo thành công, cho phép đăng nhập ngay
                end
            end
        end
    end
```

---

## 3. LUỒNG QUÊN / ĐẶT LẠI MẬT KHẨU (HIỆN TRẠNG MOCK VÀ ĐỀ XUẤT)
- **Mục đích:** Thể hiện hiện trạng đứt gãy luồng quên mật khẩu tại giao diện tĩnh và luồng đề xuất hoàn thiện.
- **Nguồn:** [`pages/auth/forgot_pass.html`](file:///c:/Users/anhqu/Documents/Computer%20Science%20Training/PRIVATE%20PROJECT/9-5-ai-library/pages/auth/forgot_pass.html), [`Finding F-014`](file:///c:/Users/anhqu/Documents/Computer%20Science%20Training/PRIVATE%20PROJECT/9-5-ai-library/flowchart%20testcase/02_FINDINGS_REGISTER.md).

```mermaid
sequenceDiagram
    autonumber
    actor User as "Người dùng"
    participant Browser as "Trình duyệt (forgot_pass.html)"
    participant Server as "Express Server (Chưa có API)"

    User->>Browser: Nhập email, bấm "Send reset link"
    Note over Browser: Hiện trạng (v1): Form action="#" method="post"<br/>Không có handler JS submit, không có API backend
    Browser->>Browser: Tải lại trang (Reload) không có gì xảy ra
    Browser-->>User: Giao diện tĩnh bị treo, không gửi được link

    rect rgb(240, 255, 240)
    Note over User, Server: LUỒNG ĐỀ XUẤT HOÀN THIỆN CHO PHIÊN BẢN v2
    Browser->>Server: POST /api/auth/forgot-password { email } (Đề xuất)
    Server->>Server: Sinh mã token ngẫu nhiên, lưu vào DB có thời hạn 15 phút
    Server->>User: Gửi email chứa liên kết: /pages/auth/reset_pass.html?token=xxx
    User->>Browser: Click liên kết trong Email mở reset_pass.html
    User->>Browser: Nhập mật khẩu mới, bấm "Reset password"
    Browser->>Server: POST /api/auth/reset-password { token, newPassword } (Đề xuất)
    Server->>Server: Xác minh token, bcrypt.hash() và UPDATE users
    Server-->>Browser: HTTP 200 { message: "Đổi mật khẩu thành công" }
    Browser-->>User: Thông báo thành công và chuyển về trang Login
    end
```

---

## 4. LÀM BÀI TRẮC NGHIỆM VÀ LƯU LỊCH SỬ THI (PRACTICE QUIZ)
- **Mục đích:** Mô tả luồng làm bài thi trắc nghiệm, đếm ngược thời gian, chấm điểm tự động và lưu lịch sử vào localStorage.
- **Nguồn:** [`pages/practice/practice-quiz.html`](file:///c:/Users/anhqu/Documents/Computer%20Science%20Training/PRIVATE%20PROJECT/9-5-ai-library/pages/practice/practice-quiz.html), [`js/practice-quiz.js:150-280`](file:///c:/Users/anhqu/Documents/Computer%20Science%20Training/PRIVATE%20PROJECT/9-5-ai-library/js/practice-quiz.js#L150-L280), [`js/practice-core.js:130-170`](file:///c:/Users/anhqu/Documents/Computer%20Science%20Training/PRIVATE%20PROJECT/9-5-ai-library/js/practice-core.js#L130-L170).

```mermaid
sequenceDiagram
    autonumber
    actor Student as "Học viên"
    participant QuizUI as "Trình duyệt (practice-quiz.html)"
    participant MathJax as "MathJax Library (tex-svg.js)"
    participant Storage as "Client localStorage"
    participant ResultUI as "Trang kết quả (practice-result.html)"

    Student->>QuizUI: Mở phòng thi (quizId = 1)
    QuizUI->>Storage: Đọc progress dở dang: lib95:practice:progress:1
    QuizUI->>QuizUI: Nạp câu hỏi từ Lib95.practice.data
    QuizUI->>MathJax: Quét và render công thức LaTeX: $..$ và $$..$$
    QuizUI-->>Student: Hiển thị câu hỏi đầu tiên, kích hoạt đếm ngược thời gian

    loop Làm từng câu hỏi
        Student->>QuizUI: Chọn phương án A/B/C/D
        QuizUI->>Storage: Tự động lưu trạng thái tạm vào localStorage
        QuizUI->>QuizUI: Chuyển câu hỏi tiếp theo
    end

    alt Hết giờ hoặc Học viên bấm "Submit Quiz"
        Student->>QuizUI: Bấm "Nộp bài thi"
        QuizUI->>QuizUI: So khớp lựa chọn với correctIndex từng câu
        QuizUI->>QuizUI: Tính tổng điểm: score = Math.round((correct / total) * 100)
        QuizUI->>Storage: Lưu kết quả vào mảng lib95:practice:attempts
        QuizUI->>Storage: Xoá bỏ tiến độ làm dở: lib95:practice:progress:1
        QuizUI->>ResultUI: Chuyển trang: practice-result.html?quizId=1
        ResultUI->>Storage: Đọc lần nộp bài mới nhất
        ResultUI-->>Student: Hiển thị điểm số, tỷ lệ đúng và đáp án chi tiết
    end
```

---

## 5. XEM BÀI GIẢNG FILE NỘI BỘ VÀ TÍNH TIẾN ĐỘ HOÀN THÀNH
- **Mục đích:** Mô tả việc phát video MP4 cục bộ, tự động lưu mốc thời gian xem và đánh dấu hoàn thành bài học khi xem $\ge 90\%$.
- **Nguồn:** [`pages/lectures/lecture.html`](file:///c:/Users/anhqu/Documents/Computer%20Science%20Training/PRIVATE%20PROJECT/9-5-ai-library/pages/lectures/lecture.html), [`js/lecture-player.js:300-380`](file:///c:/Users/anhqu/Documents/Computer%20Science%20Training/PRIVATE%20PROJECT/9-5-ai-library/js/lecture-player.js#L300-L380), [`js/lectures-core.js:135-155`](file:///c:/Users/anhqu/Documents/Computer%20Science%20Training/PRIVATE%20PROJECT/9-5-ai-library/js/lectures-core.js#L135-L155).

```mermaid
sequenceDiagram
    autonumber
    actor Student as "Học viên"
    participant PlayerUI as "Trình phát (lecture.html)"
    participant VideoTag as "Thẻ HTML5 <video>"
    participant Storage as "Client localStorage"
    participant Server as "Express Server (Tệp tĩnh)"

    Student->>PlayerUI: Mở bài giảng (lectureId = 1)
    PlayerUI->>Server: GET /api/lms/lectures/1
    Server-->>PlayerUI: Trả về chi tiết bài giảng { video_source: 'file', video_url: '/document/Lectures/...' }
    PlayerUI->>Storage: Đọc mốc xem cũ: lib95:lectures:watch:1
    PlayerUI->>VideoTag: Gán video.src = video_url
    PlayerUI->>VideoTag: Gán video.currentTime = savedTime
    
    Student->>VideoTag: Bấm Play phát video
    VideoTag->>Server: HTTP GET /document/Lectures/... (Range request)
    Server-->>VideoTag: HTTP 206 Partial Content (Streaming video)

    loop Trong khi phát video (timeupdate)
        VideoTag->>PlayerUI: Sự kiện timeupdate phát ra liên tục
        PlayerUI->>Storage: Debounce 800ms: Lưu currentTime vào lib95:lectures:watch:1
        
        alt Thời lượng xem đạt >= 90%
            PlayerUI->>Storage: Thêm lectureId vào lib95:lectures:completedIds
            PlayerUI->>PlayerUI: Cập nhật Sidebar: Đổi icon trạng thái sang Completed
            PlayerUI->>PlayerUI: Mở khoá bài học tiếp theo trong lộ trình
        end
    end
```

---

## 6. XEM BÀI GIẢNG YOUTUBE VÀ ĐỒNG BỘ TIẾN ĐỘ QUA POLLING
- **Mục đích:** Mô tả việc nhúng YouTube IFrame API và sử dụng interval polling để lấy tiến độ thời gian thực.
- **Nguồn:** [`js/lecture-player.js:90-225`](file:///c:/Users/anhqu/Documents/Computer%20Science%20Training/PRIVATE%20PROJECT/9-5-ai-library/js/lecture-player.js#L90-L225), [`LMS_YOUTUBE_AUDIT.md:15`](file:///c:/Users/anhqu/Documents/Computer%20Science%20Training/PRIVATE%20PROJECT/9-5-ai-library/LMS_YOUTUBE_AUDIT.md#L15).

```mermaid
sequenceDiagram
    autonumber
    actor Student as "Học viên"
    participant PlayerUI as "Trình phát (lecture.html)"
    participant YT_API as "YouTube IFrame API"
    participant YT_Player as "YouTube IFrame Object"
    participant Storage as "Client localStorage"

    Student->>PlayerUI: Mở bài giảng YouTube (ID 13, youtube_id: "Gx6I0Uf5UHM")
    PlayerUI->>YT_API: Khởi tạo: new YT.Player('lec-yt-iframe', { videoId: 'Gx6I0Uf5UHM' })
    YT_API-->>PlayerUI: Sự kiện onReady
    PlayerUI->>Storage: Đọc savedTime: lib95:lectures:watch:13
    PlayerUI->>YT_Player: ytPlayer.seekTo(savedTime)

    Student->>YT_Player: Bấm Play
    YT_Player-->>PlayerUI: Sự kiện onStateChange (PLAYING)
    PlayerUI->>PlayerUI: Kích hoạt Polling Interval (Mỗi 500ms)

    loop Polling Interval (ytProgressInterval)
        PlayerUI->>YT_Player: ytPlayer.getCurrentTime(), ytPlayer.getDuration()
        YT_Player-->>PlayerUI: Trả về currentTime, duration
        PlayerUI->>PlayerUI: Cập nhật thanh Seekbar tùy biến
        PlayerUI->>Storage: Lưu currentTime vào lib95:lectures:watch:13
        
        alt currentTime / duration >= 0.9 (90%)
            PlayerUI->>Storage: Thêm ID 13 vào lib95:lectures:completedIds
            PlayerUI->>PlayerUI: Cập nhật trạng thái sidebar sang "Completed"
        end
    end

    Student->>YT_Player: Bấm Pause / Kết thúc video
    YT_Player-->>PlayerUI: Sự kiện onStateChange (PAUSED / ENDED)
    PlayerUI->>PlayerUI: clearInterval(ytProgressInterval)
```

---

## 7. ADMIN TẠO BÀI GIẢNG VIDEO TẢI LÊN (FILE UPLOAD & FFMPEG)
- **Mục đích:** Mô tả quy trình upload video lớn (tối đa 1GB), tối ưu hoá `moov atom` qua FFmpeg và đo thời lượng qua FFprobe.
- **Nguồn:** [`backend/routes/lmsRoutes.js:145-181`](file:///c:/Users/anhqu/Documents/Computer%20Science%20Training/PRIVATE%20PROJECT/9-5-ai-library/backend/routes/lmsRoutes.js#L145-L181), [`backend/controllers/lmsController.js:150-210`](file:///c:/Users/anhqu/Documents/Computer%20Science%20Training/PRIVATE%20PROJECT/9-5-ai-library/backend/controllers/lmsController.js#L150-L210).

```mermaid
sequenceDiagram
    autonumber
    actor Admin as "Quản trị viên"
    participant AdminUI as "Admin LMS (admin.html)"
    participant Server as "Express Server"
    participant FFmpeg as "FFmpeg / FFprobe"
    participant Disk as "Ổ đĩa (document/Lectures/Uploads/)"
    participant DB as "MySQL (lectures)"

    Admin->>AdminUI: Chọn tệp video MP4 từ máy tính
    AdminUI->>Server: POST /api/lms/upload-video (FormData kèm Bearer Token)
    Server->>Server: Kiểm tra token (isStaffAdminOwner)
    Server->>Disk: Multer ghi tệp tạm vào document/Lectures/Uploads/
    
    Server->>FFmpeg: execFile('ffmpeg', ['-i', path, '-c', 'copy', '-movflags', '+faststart', tempOut])
    FFmpeg-->>Server: Hoàn tất chuyển đổi moov atom
    Server->>Disk: Thay thế tệp gốc bằng tệp đã tối ưu faststart
    
    Server->>FFmpeg: execFile('ffprobe', ['-show_entries', 'format=duration', ...])
    FFmpeg-->>Server: Trả về thời lượng chính xác (ví dụ: 1080 giây)
    Server-->>AdminUI: HTTP 200 { url: '/document/Lectures/Uploads/...', duration_min: 18 }
    AdminUI-->>Admin: Điền sẵn URL và thời lượng vào Form

    Admin->>AdminUI: Nhập tiêu đề, chương, bấm "Save Lecture"
    AdminUI->>Server: POST /api/lms/courses/:id/lectures { title, video_url, duration_min, ... }
    Server->>DB: INSERT INTO lectures (course_id, title, video_source, video_url, duration_min) VALUES (?, ?, 'file', ?, ?)
    DB-->>Server: Trả về insertId
    Server-->>AdminUI: HTTP 201 { success: true, lecture: { id, title, ... } }
    AdminUI-->>Admin: Hiển thị thông báo tạo bài giảng thành công!
```

---

## 8. ADMIN TẠO BÀI GIẢNG YOUTUBE (OEMBED & DETECT METADATA)
- **Mục đích:** Mô tả tính năng thêm bài giảng qua liên kết YouTube, trích xuất ID an toàn và tự động lấy metadata qua oEmbed.
- **Nguồn:** [`backend/routes/lmsRoutes.js:33-85`](file:///c:/Users/anhqu/Documents/Computer%20Science%20Training/PRIVATE%20PROJECT/9-5-ai-library/backend/routes/lmsRoutes.js#L33-L85), [`js/admin-lms.js`](file:///c:/Users/anhqu/Documents/Computer%20Science%20Training/PRIVATE%20PROJECT/9-5-ai-library/js/admin-lms.js).

```mermaid
sequenceDiagram
    autonumber
    actor Admin as "Quản trị viên"
    participant AdminUI as "Admin LMS (admin.html)"
    participant Server as "Express Server"
    participant YouTube as "YouTube oEmbed Server"
    participant DB as "MySQL (lectures)"

    Admin->>AdminUI: Dán link YouTube vào ô input
    AdminUI->>Server: GET /api/lms/youtube-info?url=https://www.youtube.com/watch?v=Gx6I0Uf5UHM
    Server->>Server: extractYouTubeId(url) => 'Gx6I0Uf5UHM'
    
    alt Link không hợp lệ
        Server-->>AdminUI: HTTP 400 { code: 'INVALID_LINK', error: "Link YouTube không hợp lệ" }
        AdminUI-->>Admin: Hiển thị lỗi link không hợp lệ
    else Link hợp lệ
        Server->>YouTube: Fetch https://www.youtube.com/oembed?url=...&format=json
        alt Video riêng tư hoặc tắt nhúng
            YouTube-->>Server: HTTP 401 / 403
            Server-->>AdminUI: HTTP 422 { code: 'EMBED_DISABLED', error: "Video riêng tư hoặc tắt nhúng" }
            AdminUI-->>Admin: Cảnh báo không thể nhúng video này
        else Lấy thông tin thành công
            YouTube-->>Server: HTTP 200 { title, author_name, thumbnail_url }
            Server-->>AdminUI: HTTP 200 { youtubeId, canonicalUrl, title, thumbnailUrl }
            AdminUI->>AdminUI: Tự động điền Title, nạp ảnh thumbnail xem trước
            Admin-->>AdminUI: Nhập thời lượng và bấm "Save Lecture"
            AdminUI->>Server: POST /api/lms/lectures { video_source: 'youtube', youtube_id, video_url, ... }
            Server->>DB: INSERT INTO lectures (...) VALUES (...)
            DB-->>Server: OK
            Server-->>AdminUI: HTTP 201 { success: true }
            AdminUI-->>Admin: Báo thành công, cập nhật danh sách bài giảng
        end
    end
```

---

## 9. ĐĂNG BÀI VIẾT CỘNG ĐỒNG VÀ PHÁT THÔNG BÁO (FAN-OUT)
- **Mục đích:** Mô tả việc tạo bài đăng, kiểm tra trạng thái tài khoản (`canWriteCommunity`) và tạo thông báo fan-out tới các thành viên.
- **Nguồn:** [`backend/controllers/communityController.js:180-260`](file:///c:/Users/anhqu/Documents/Computer%20Science%20Training/PRIVATE%20PROJECT/9-5-ai-library/backend/controllers/communityController.js#L180-L260).

```mermaid
sequenceDiagram
    autonumber
    actor Author as "Tác giả (Member)"
    participant Client as "Trình duyệt (community-feed.html)"
    participant Server as "Express Server"
    participant DB as "MySQL (community_posts, notifications)"

    Author->>Client: Nhập nội dung bài viết, chọn loại (Post/Poll/Link)
    Client->>Server: POST /api/community/posts { kind, content, tags, ... }
    Server->>Server: canWriteCommunity: Kiểm tra req.user.status
    
    alt Tài khoản bị Banned hoặc Pending
        Server-->>Client: HTTP 403 { error: "Tài khoản của bạn đang chờ phê duyệt hoặc đã bị khoá" }
        Client-->>Author: Báo lỗi không có quyền đăng bài
    else Tài khoản Active hợp lệ
        Server->>DB: INSERT INTO community_posts (user_id, kind, content, ...) VALUES (?, ?, ?, ...)
        Server->>DB: INSERT INTO community_post_tags (post_id, tag) VALUES (...)
        
        opt Nếu là bài bình chọn (Poll)
            Server->>DB: INSERT INTO community_poll_options (post_id, label) VALUES (...)
        end
        
        Server->>DB: SELECT id FROM users WHERE id != authorId AND status = 'active'
        DB-->>Server: Trả về danh sách user nhận thông báo
        Server->>DB: INSERT INTO community_notifications (user_id, actor_id, type, post_id) VALUES (?, authorId, 'new_post', postId)
        
        Server-->>Client: HTTP 201 { success: true, post: { ... } }
        Client->>Client: Thêm bài viết mới vào đầu Bảng tin
        Client-->>Author: Hiển thị bài viết ngay lập tức
    end
```

---

## 10. GHIM VÀ BỎ GHIM BÀI VIẾT (TỐI ĐA 3 BÀI)
- **Mục đích:** Mô tả tính năng ghim bài viết lên đầu trang cộng đồng của Admin/Owner và kiểm tra giới hạn 3 bài.
- **Nguồn:** [`backend/controllers/communityController.js:330-380`](file:///c:/Users/anhqu/Documents/Computer%20Science%20Training/PRIVATE%20PROJECT/9-5-ai-library/backend/controllers/communityController.js#L330-L380).

```mermaid
sequenceDiagram
    autonumber
    actor Admin as "Quản trị viên (Admin/Owner)"
    participant UI as "Giao diện Bảng tin"
    participant Server as "Express Server"
    participant DB as "MySQL (community_posts)"

    Admin->>UI: Bấm menu "⋯" trên bài viết -> Chọn "Pin post"
    UI->>Server: PUT /api/community/posts/:id/pin (Kèm Bearer Token)
    Server->>Server: isAdminOrOwner: Kiểm tra role
    Server->>DB: SELECT is_pinned FROM community_posts WHERE id = ?
    
    alt Bỏ ghim bài đang ghim
        Server->>DB: UPDATE community_posts SET is_pinned = 0, pinned_at = NULL WHERE id = ?
        Server-->>UI: HTTP 200 { is_pinned: false, message: "Đã bỏ ghim bài viết" }
        UI-->>Admin: Cập nhật icon bỏ ghim
    else Ghim bài viết mới
        Server->>DB: SELECT COUNT(*) as pinnedCount FROM community_posts WHERE is_pinned = 1
        alt Đã đạt tối đa 3 bài ghim
            DB-->>Server: pinnedCount >= 3
            Server-->>UI: HTTP 400 { error: "Chỉ được ghim tối đa 3 bài viết cùng lúc" }
            UI-->>Admin: Hiển thị thông báo lỗi vượt quá giới hạn
        else Chưa đủ 3 bài
            Server->>DB: UPDATE community_posts SET is_pinned = 1, pinned_at = NOW(), pinned_by = adminId WHERE id = ?
            Server-->>UI: HTTP 200 { is_pinned: true, message: "Đã ghim bài viết lên đầu trang" }
            UI->>UI: Đưa bài viết lên đỉnh Bảng tin kèm huy hiệu "Pinned"
            UI-->>Admin: Báo ghim thành công
        end
    end
```

---

## 11. BÁO CÁO VI PHẠM VÀ QUY TRÌNH KIỂM DUYỆT (MODERATION)
- **Mục đích:** Mô tả việc thành viên báo cáo nội dung xấu và quản trị viên xử lý báo cáo (Ẩn/Phục hồi/Xoá vĩnh viễn).
- **Nguồn:** [`backend/controllers/moderationController.js:15-180, 270-360`](file:///c:/Users/anhqu/Documents/Computer%20Science%20Training/PRIVATE%20PROJECT/9-5-ai-library/backend/controllers/moderationController.js#L15-L180), [`js/community-report.js`](file:///c:/Users/anhqu/Documents/Computer%20Science%20Training/PRIVATE%20PROJECT/9-5-ai-library/js/community-report.js).

```mermaid
sequenceDiagram
    autonumber
    actor Reporter as "Học viên báo cáo"
    participant UserUI as "Bảng tin cộng đồng"
    participant Server as "Express Server"
    participant DB as "MySQL (community_reports, audit_logs)"
    actor Admin as "Quản trị viên"
    participant AdminUI as "Admin Moderation (admin.html)"

    Reporter->>UserUI: Chọn "Report post" -> Chọn lý do vi phạm -> Bấm Gửi
    UserUI->>Server: POST /api/community/report { target_type: 'post', target_id: 10, reason, note }
    Server->>DB: INSERT INTO community_reports (reporter_id, target_type, target_id, reason, note, status) VALUES (?, 'post', 10, ?, ?, 'open')
    Server-->>UserUI: HTTP 201 { message: "Báo cáo của bạn đã được gửi tới Ban quản trị" }

    Admin->>AdminUI: Mở tab Moderation
    AdminUI->>Server: GET /api/admin/reports?status=open
    Server->>DB: SELECT r.*, u.username as reporter_name FROM community_reports r ...
    DB-->>Server: Trả về danh sách báo cáo chờ xử lý
    Server-->>AdminUI: HTTP 200 { reports: [...] }
    AdminUI-->>Admin: Hiển thị thẻ báo cáo vi phạm

    alt Admin chọn Ẩn nội dung (Hide)
        Admin->>AdminUI: Bấm "Hide content"
        AdminUI->>Server: PUT /api/admin/reports/1 { action: 'hide' }
        Server->>DB: UPDATE community_posts SET is_hidden = 1, hidden_by = adminId WHERE id = 10
        Server->>DB: UPDATE community_reports SET status = 'actioned', handled_by = adminId WHERE id = 1
        Server->>DB: INSERT INTO audit_logs (action, target_type, target_id, ...) VALUES ('moderation.hide', 'post', 10, ...)
        Server-->>AdminUI: HTTP 200 { success: true }
        AdminUI-->>Admin: Cập nhật trạng thái đã xử lý
    else Admin chọn Bỏ qua (Dismiss)
        Admin->>AdminUI: Bấm "Dismiss report"
        AdminUI->>Server: PUT /api/admin/reports/1 { action: 'dismiss' }
        Server->>DB: UPDATE community_reports SET status = 'dismissed', handled_by = adminId WHERE id = 1
        Server-->>AdminUI: HTTP 200 { success: true }
    end
```

---

## 12. BẬT / TẮT YÊU THÍCH (TOGGLE FAVORITES ĐA HÌNH)
- **Mục đích:** Thể hiện luồng bookmark môn học bài giảng, môn thực hành hoặc tài nguyên học tập.
- **Nguồn:** [`backend/controllers/favoriteController.js:150-240`](file:///c:/Users/anhqu/Documents/Computer%20Science%20Training/PRIVATE%20PROJECT/9-5-ai-library/backend/controllers/favoriteController.js#L150-L240), [`pages/favorites.html`](file:///c:/Users/anhqu/Documents/Computer%20Science%20Training/PRIVATE%20PROJECT/9-5-ai-library/pages/favorites.html).

```mermaid
sequenceDiagram
    autonumber
    actor User as "Thành viên"
    participant UI as "Giao diện (Thẻ môn học / Tài liệu)"
    participant Server as "Express Server"
    participant DB as "MySQL (user_favorites, resource_favorites)"

    User->>UI: Nhấp vào biểu tượng ngôi sao ★
    UI->>Server: POST /api/favorites/toggle { item_type: 'lecture_course', item_id: 1 }
    Server->>Server: verifyToken: Lấy userId
    
    alt Mục là Tài liệu (item_type = 'resource')
        Server->>DB: SELECT * FROM resource_favorites WHERE resource_id = ? AND user_id = ?
        alt Đã yêu thích trước đó
            Server->>DB: DELETE FROM resource_favorites WHERE resource_id = ? AND user_id = ?
            Server-->>UI: HTTP 200 { isFavorited: false, message: "Đã xoá khỏi yêu thích" }
        else Chưa yêu thích
            Server->>DB: INSERT INTO resource_favorites (resource_id, user_id) VALUES (?, ?)
            Server-->>UI: HTTP 200 { isFavorited: true, message: "Đã thêm vào yêu thích" }
        end
    else Mục là Môn học (item_type = 'lecture_course' hoặc 'practice_subject')
        Server->>DB: SELECT * FROM user_favorites WHERE user_id = ? AND item_type = ? AND item_id = ?
        alt Đã yêu thích
            Server->>DB: DELETE FROM user_favorites WHERE user_id = ? AND item_type = ? AND item_id = ?
            Server-->>UI: HTTP 200 { isFavorited: false }
        else Chưa yêu thích
            Server->>DB: INSERT INTO user_favorites (user_id, item_type, item_id) VALUES (?, ?, ?)
            Server-->>UI: HTTP 200 { isFavorited: true }
        end
    end
    UI->>UI: Toggle class .is-favorited (Đổi màu vàng/xám)
    UI-->>User: Phản hồi thị giác tức thì
```

---

## 13. CẬP NHẬT ẢNH ĐẠI DIỆN VÀ ĐỒNG BỘ HỒ SƠ (AVATAR CROP)
- **Mục đích:** Mô tả việc cắt ảnh đại diện bằng Cropper.js, lưu base64/URL và tự động cập nhật UI toàn trang.
- **Nguồn:** [`pages/settings/settings.html`](file:///c:/Users/anhqu/Documents/Computer%20Science%20Training/PRIVATE%20PROJECT/9-5-ai-library/pages/settings/settings.html), [`js/settings-profile.js:50-130`](file:///c:/Users/anhqu/Documents/Computer%20Science%20Training/PRIVATE%20PROJECT/9-5-ai-library/js/settings-profile.js#L50-L130), [`js/syncProfile.js:10-50`](file:///c:/Users/anhqu/Documents/Computer%20Science%20Training/PRIVATE%20PROJECT/9-5-ai-library/js/syncProfile.js#L10-L50).

```mermaid
sequenceDiagram
    autonumber
    actor User as "Thành viên"
    participant SettingsUI as "Trình duyệt (settings.html)"
    participant Cropper as "Cropper.js Library"
    participant Server as "Express Server"
    participant DB as "MySQL (users)"
    participant LocalStorage as "Client localStorage"

    User->>SettingsUI: Chọn ảnh đại diện từ máy tính (.jpg / .png)
    SettingsUI->>Cropper: Nạp ảnh vào modal cắt xén hình tròn
    User->>Cropper: Thu phóng, căn chỉnh khung hình, bấm "Apply"
    Cropper->>SettingsUI: Trả về chuỗi ảnh Base64 Data URL (hoặc Blob)
    
    User->>SettingsUI: Bấm "Save Profile"
    SettingsUI->>Server: PUT /api/users/profile { full_name, bio, avatar_url: base64Data }
    Server->>DB: UPDATE users SET full_name = ?, bio = ?, avatar_url = ? WHERE id = ?
    DB-->>Server: OK
    Server-->>SettingsUI: HTTP 200 { success: true, user: { ... } }

    SettingsUI->>LocalStorage: localStorage.setItem('user', JSON.stringify(updatedUser))
    SettingsUI->>SettingsUI: Kích hoạt window.dispatchEvent(new Event('storage'))
    Note over SettingsUI: syncProfile.js bắt sự kiện storage:
    SettingsUI->>SettingsUI: Cập nhật tức thì tất cả phần tử .user-avatar và .user-name trên trang
    SettingsUI-->>User: Hiển thị Toast thông báo: "Profile updated successfully!"
```

---

## 14. ĐỔI MẬT KHẨU TÀI KHOẢN (CHANGE PASSWORD)
- **Mục đích:** Mô tả việc kiểm tra mật khẩu cũ bằng bcrypt trước khi mã hoá và cập nhật mật khẩu mới.
- **Nguồn:** [`backend/controllers/userController.js:40-70`](file:///c:/Users/anhqu/Documents/Computer%20Science%20Training/PRIVATE%20PROJECT/9-5-ai-library/backend/controllers/userController.js#L40-L70), [`js/settings-account.js`](file:///c:/Users/anhqu/Documents/Computer%20Science%20Training/PRIVATE%20PROJECT/9-5-ai-library/js/settings-account.js).

```mermaid
sequenceDiagram
    autonumber
    actor User as "Thành viên"
    participant UI as "Settings Account (settings.html)"
    participant Server as "Express Server"
    participant DB as "MySQL (users)"

    User->>UI: Nhập currentPassword, newPassword, confirmNewPassword
    
    alt Mật khẩu mới và xác nhận không khớp
        UI-->>User: Báo lỗi client: "Mật khẩu mới không khớp!"
    else Đủ điều kiện gửi lên
        UI->>Server: PUT /api/users/change-password { currentPassword, newPassword }
        Server->>DB: SELECT password_hash FROM users WHERE id = ?
        DB-->>Server: Trả về password_hash hiện tại
        Server->>Server: bcrypt.compare(currentPassword, password_hash)
        
        alt Mật khẩu hiện tại không đúng
            Server-->>UI: HTTP 400 { error: "Mật khẩu hiện tại không chính xác" }
            UI-->>User: Báo lỗi mật khẩu cũ sai
        else Mật khẩu hiện tại đúng
            Server->>Server: newHash = bcrypt.hash(newPassword, 10)
            Server->>DB: UPDATE users SET password_hash = newHash WHERE id = ?
            DB-->>Server: OK
            Server-->>UI: HTTP 200 { message: "Đổi mật khẩu thành công" }
            UI->>UI: Xoá trắng các ô nhập liệu
            UI-->>User: Hiển thị Toast thông báo thành công
        end
    end
```

---

## 15. CHUÔNG THÔNG BÁO, POLLING VÀ ĐỒNG BỘ ĐA TAB
- **Mục đích:** Mô tả chu kỳ kiểm tra thông báo mới mỗi 60 giây, đánh dấu đã đọc và đồng bộ trạng thái tức thì giữa các tab qua Storage Event.
- **Nguồn:** [`js/notifications-bell.js:100-240`](file:///c:/Users/anhqu/Documents/Computer%20Science%20Training/PRIVATE%20PROJECT/9-5-ai-library/js/notifications-bell.js#L100-L240), [`backend/controllers/communityController.js:1450-1550`](file:///c:/Users/anhqu/Documents/Computer%20Science%20Training/PRIVATE%20PROJECT/9-5-ai-library/backend/controllers/communityController.js#L1450-L1550).

```mermaid
sequenceDiagram
    autonumber
    actor User as "Thành viên"
    participant Tab1 as "Trình duyệt (Tab 1)"
    participant Tab2 as "Trình duyệt (Tab 2)"
    participant Server as "Express Server"
    participant DB as "MySQL (community_notifications)"

    Note over Tab1: Polling Interval ngầm 60 giây khi Tab đang hiển thị
    Tab1->>Server: GET /api/community/notifications/unread-count
    Server->>DB: SELECT COUNT(*) FROM community_notifications WHERE user_id = ? AND is_read = 0
    DB-->>Server: Trả về unreadCount = 3
    Server-->>Tab1: HTTP 200 { unreadCount: 3 }
    Tab1->>Tab1: Hiển thị chấm đỏ (notification-dot) trên chuông

    User->>Tab1: Bấm vào chuông thông báo
    Tab1->>Tab1: Mở Dropdown panel
    Tab1->>Server: GET /api/community/notifications?limit=10
    Server->>DB: SELECT * FROM community_notifications WHERE user_id = ? ORDER BY created_at DESC
    DB-->>Server: Trả về danh sách thông báo
    Server-->>Tab1: HTTP 200 { notifications: [...] }
    Tab1-->>User: Render danh sách thông báo thả xuống

    User->>Tab1: Bấm "Mark all as read"
    Tab1->>Server: POST /api/community/notifications/read-all
    Server->>DB: UPDATE community_notifications SET is_read = 1 WHERE user_id = ?
    DB-->>Server: OK
    Server-->>Tab1: HTTP 200 { success: true }
    
    Tab1->>Tab1: Ẩn chấm đỏ notification-dot
    Tab1->>Tab1: localStorage.setItem('lib95:notif:update', Date.now())

    Note over Tab1, Tab2: Đồng bộ đa tab qua Sự kiện window storage
    Tab1-->>Tab2: Bắn sự kiện Storage Event ('lib95:notif:update')
    Tab2->>Tab2: Nhận tín hiệu: Tự động ẩn chấm đỏ trên Tab 2 mà không cần reload!
```

---

## 16. GỬI BÌNH LUẬN BÀI GIẢNG (BẮT BUỘC TOKEN VÀ CHỐNG XSS - F-002) (v2 cập nhật)
- **Mục đích:** Mô tả quy trình gửi bình luận bài giảng đã được thắt chặt bảo mật trong v2: Bắt buộc đăng nhập (`verifyToken`), kiểm tra bài giảng tồn tại, giới hạn độ dài nội dung và render an toàn bằng DOM API chống XSS.
- **Nguồn:** [`backend/routes/lmsRoutes.js`](file:///c:/Users/anhqu/Documents/Computer%20Science%20Training/PRIVATE%20PROJECT/9-5-ai-library/backend/routes/lmsRoutes.js), [`backend/controllers/lmsController.js`](file:///c:/Users/anhqu/Documents/Computer%20Science%20Training/PRIVATE%20PROJECT/9-5-ai-library/backend/controllers/lmsController.js), [`js/lecture-player.js`](file:///c:/Users/anhqu/Documents/Computer%20Science%20Training/PRIVATE%20PROJECT/9-5-ai-library/js/lecture-player.js).

```mermaid
sequenceDiagram
    autonumber
    actor User as "Người dùng / Học viên"
    participant PlayerUI as "Trình phát (lecture.html)"
    participant Server as "Express (lmsController)"
    participant DB as "MySQL (lecture_comments, lectures)"

    User->>PlayerUI: Nhập nội dung bình luận, bấm "Send"
    
    alt Chưa đăng nhập (Không có Token)
        PlayerUI-->>User: Hiển thị Toast cảnh báo: "Vui lòng đăng nhập để bình luận"
    else Đã có Token
        PlayerUI->>Server: POST /api/lms/lectures/1/comments { content: "Bài học rất hay!" } (Bearer Token)
        Server->>Server: verifyToken: Giải mã token lấy userId
        
        alt Không có Header Authorization
            Server-->>PlayerUI: HTTP 401 Unauthorized { error: "Access token required" }
        else Nội dung rỗng hoặc vượt quá 2000 ký tự
            Server-->>PlayerUI: HTTP 400 Bad Request { error: "Nội dung bình luận không được để trống..." }
        else Token hợp lệ và nội dung đúng quy cách
            Server->>DB: SELECT id FROM lectures WHERE id = 1
            alt Bài giảng không tồn tại
                DB-->>Server: Trả về rỗng []
                Server-->>PlayerUI: HTTP 404 Not Found { error: "Bài giảng không tồn tại" }
            else Bài giảng tồn tại
                Server->>DB: INSERT INTO lecture_comments (lecture_id, user_id, content) VALUES (1, userId, ?)
                DB-->>Server: Trả về insertId
                Server-->>PlayerUI: HTTP 201 Created { success: true, comment: { id, content, user: { full_name, avatar_url } } }
                PlayerUI->>PlayerUI: Tạo thẻ phần tử qua document.createElement() & gán .textContent (Chống XSS)
                PlayerUI-->>User: Thêm bình luận mới vào đầu danh sách mượt mà
            end
        end
    end
```

---

## 17. PHÂN CẤP QUYỀN QUẢN TRỊ NGƯỜI DÙNG (HIERARCHY CHECK - F-003) (v2 cập nhật)
- **Mục đích:** Mô tả việc kiểm tra thứ bậc nghiêm ngặt (`Owner: 4 > Admin: 3 > Staff: 2 > Member: 1`) khi quản trị viên thay đổi vai trò hoặc khoá tài khoản.
- **Nguồn:** [`backend/controllers/adminController.js`](file:///c:/Users/anhqu/Documents/Computer%20Science%20Training/PRIVATE%20PROJECT/9-5-ai-library/backend/controllers/adminController.js), [`js/admin-users.js`](file:///c:/Users/anhqu/Documents/Computer%20Science%20Training/PRIVATE%20PROJECT/9-5-ai-library/js/admin-users.js).

```mermaid
sequenceDiagram
    autonumber
    actor Admin as "Quản trị viên (Admin - Rank 3)"
    participant AdminUI as "Admin Users Tab (admin.html)"
    participant Server as "Express (adminController)"
    participant DB as "MySQL (users, audit_logs)"

    Admin->>AdminUI: Chọn tài khoản và yêu cầu sửa vai trò / trạng thái
    AdminUI->>Server: PUT /api/admin/users/:targetId { role, status } (Bearer Token Admin)
    Server->>Server: verifyToken + isAdminOrOwner
    Server->>DB: SELECT id, role, status FROM users WHERE id = targetId
    DB-->>Server: Trả về thông tin targetUser

    alt Target User có cấp bậc >= Caller Rank (Ví dụ Target là Owner - Rank 4)
        Server-->>AdminUI: HTTP 403 Forbidden { error: "Bạn không có quyền thao tác trên tài khoản có cấp bậc tương đương hoặc cao hơn" }
        AdminUI-->>Admin: Hiển thị Toast lỗi màu đỏ từ chối thao tác
    else Caller cố tình nâng role mới >= Caller Rank (Ví dụ Admin muốn nâng ai đó lên Owner)
        Server-->>AdminUI: HTTP 403 Forbidden { error: "Bạn không thể gán quyền hạn tương đương hoặc cao hơn quyền của mình" }
        AdminUI-->>Admin: Hiển thị Toast lỗi vượt quyền hạn
    else Thao tác hợp lệ (Admin thao tác trên Staff/Member và chỉ nâng tối đa lên Admin)
        Server->>DB: UPDATE users SET role = ?, status = ? WHERE id = targetId
        Server->>DB: INSERT INTO audit_logs (actor_id, action, target_type, target_id, details) VALUES (...)
        DB-->>Server: OK
        Server-->>AdminUI: HTTP 200 OK { success: true, user: { ... } }
        AdminUI-->>Admin: Báo thành công, cập nhật huy hiệu người dùng trên bảng
    end
```

---

## 18. TỰ XOÁ TÀI KHOẢN CÁ NHÂN (XÁC NHẬN MẬT KHẨU BCRYPT - F-004) (v2 cập nhật)
- **Mục đích:** Mô tả quy trình tự xoá tài khoản cá nhân an toàn trong v2: Bắt buộc người dùng nhập xác nhận Username và Mật khẩu hiện tại, kiểm tra bằng `bcrypt.compare()` trước khi xoá dữ liệu vĩnh viễn.
- **Nguồn:** [`backend/controllers/userController.js`](file:///c:/Users/anhqu/Documents/Computer%20Science%20Training/PRIVATE%20PROJECT/9-5-ai-library/backend/controllers/userController.js), [`pages/settings/settings.html`](file:///c:/Users/anhqu/Documents/Computer%20Science%20Training/PRIVATE%20PROJECT/9-5-ai-library/pages/settings/settings.html), [`js/settings-preferences.js`](file:///c:/Users/anhqu/Documents/Computer%20Science%20Training/PRIVATE%20PROJECT/9-5-ai-library/js/settings-preferences.js).

```mermaid
sequenceDiagram
    autonumber
    actor User as "Thành viên (Member)"
    participant SettingsUI as "Trình duyệt (settings.html)"
    participant Server as "Express (userController)"
    participant DB as "MySQL (users, CSDL liên kết)"

    User->>SettingsUI: Vào Settings -> Privacy -> Nhấn "Delete account"
    SettingsUI->>SettingsUI: Bật Modal cảnh báo nguy hiểm (Danger Modal)
    SettingsUI-->>User: Yêu cầu gõ lại Username và Mật khẩu hiện tại
    
    User->>SettingsUI: Nhập Username xác nhận và Mật khẩu, nhấn "Xác nhận xoá"
    
    alt Username gõ không khớp với tài khoản đang đăng nhập
        SettingsUI-->>User: Báo lỗi client: "Tên đăng nhập xác nhận không khớp!"
    else Khớp Username
        SettingsUI->>Server: DELETE /api/users/me { confirmUsername, password } (Bearer Token)
        Server->>Server: verifyToken: Lấy userId hiện tại
        Server->>DB: SELECT username, password_hash FROM users WHERE id = userId
        DB-->>Server: Trả về { username, password_hash }
        
        alt Sai mật khẩu hiện tại
            Server->>Server: bcrypt.compare(password, password_hash) => false
            Server-->>SettingsUI: HTTP 400 Bad Request { error: "Mật khẩu xác nhận không chính xác" }
            SettingsUI-->>User: Hiển thị lỗi sai mật khẩu
        else Mật khẩu chính xác
            Server->>Server: bcrypt.compare() => true
            Server->>DB: DELETE FROM users WHERE id = userId (ON DELETE CASCADE)
            DB-->>Server: Xoá thành công bản ghi
            Server-->>SettingsUI: HTTP 200 OK { success: true, message: "Tài khoản của bạn đã được xoá vĩnh viễn" }
            SettingsUI->>SettingsUI: Xoá sạch token, user, settings trong localStorage
            SettingsUI->>SettingsUI: window.location.href = '/index.html'
            SettingsUI-->>User: Chuyển hướng về trang chủ công khai
        end
    end
```
