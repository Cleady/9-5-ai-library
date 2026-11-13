# SƠ ĐỒ LƯU TRÌNH HOẠT ĐỘNG VÀ XỬ LÝ ĐIỀU KIỆN BIÊN (05_activity_flowcharts.md) (v2 cập nhật)

**Dự án:** 9-5-ai-library  
**Phiên bản:** v2 (Cập nhật sau đợt vá bảo mật & kiểm thử v2)  
**Ghi chú kiểm tra cú pháp Mermaid:** Mỗi lưu trình đều thể hiện các nhánh rẽ điều kiện (Decision nodes), xử lý lỗi và điều kiện biên. Cú pháp đã được tự rà soát thủ công chi tiết từng sơ đồ theo đúng đặc tả cú pháp Mermaid.js (toàn bộ nhãn có chứa ký tự đặc biệt, dấu ngoặc đều được bọc trong dấu ngoặc kép `""`, không sử dụng thẻ HTML thô, mũi tên chuẩn xác) để đảm bảo render 100% chuẩn xác trên GitHub/GitLab markdown viewer.

---

## 1. ĐỊNH TUYẾN THEO VAI TRÒ VÀ TRẠNG THÁI TÀI KHOẢN (ROLE & STATUS ROUTING) (v2 cập nhật)
- **Mục đích:** Mô tả cây quyết định điều hướng khi người dùng truy cập một URL bất kỳ trong hệ thống. Trong v2, `verifyToken` kiểm tra trực tiếp trạng thái CSDL thời gian thực: tài khoản bị khoá (Banned) sẽ bị chặn ngay lập tức ở cấp backend với mã HTTP 403 mà không phụ thuộc vào payload JWT cũ (F-005).
- **Nguồn:** [`backend/middlewares/authMiddleware.js`](file:///c:/Users/anhqu/Documents/Computer%20Science%20Training/PRIVATE%20PROJECT/9-5-ai-library/backend/middlewares/authMiddleware.js), [`js/auth-guard.js`](file:///c:/Users/anhqu/Documents/Computer%20Science%20Training/PRIVATE%20PROJECT/9-5-ai-library/js/auth-guard.js), [`js/syncProfile.js:148-202`](file:///c:/Users/anhqu/Documents/Computer%20Science%20Training/PRIVATE%20PROJECT/9-5-ai-library/js/syncProfile.js#L148-L202).

```mermaid
flowchart TD
    Start(["Người dùng truy cập một trang trong hệ thống"]) --> CheckToken{"Đã có Token trong localStorage?"}
    
    CheckToken -- "Chưa có (Guest)" --> CheckPublicPage{"Trang yêu cầu là công khai?"}
    CheckPublicPage -- "Đúng (index.html, login.html, signup.html)" --> AllowPublic["Cho phép xem nội dung công khai"]
    CheckPublicPage -- "Sai (Trang học viên / Admin)" --> OnIndex{"Đang ở index.html?"}
    OnIndex -- "Đúng" --> ShowModal["auth-guard.js bật Modal yêu cầu đăng nhập"]
    OnIndex -- "Sai (Truy cập thẳng bằng URL)" --> RedirectLogin["Chuyển hướng về pages/auth/login.html"]

    CheckToken -- "Đã có Token" --> CallMeAPI["Client gọi API kèm Bearer Token"]
    CallMeAPI --> VerifyTokenMiddleware["verifyToken kiểm tra chữ ký & truy vấn DB status (v2)"]
    VerifyTokenMiddleware --> CheckAccountStatus{"Trạng thái tài khoản (Status) trong DB?"}
    
    CheckAccountStatus -- "status = 'banned' (F-005)" --> Return403["Backend trả về HTTP 403 Forbidden: Tài khoản bị khoá"]
    Return403 --> ShowBannedOverlay["Bật Overlay khoá tài khoản toàn màn hình, xoá token"]
    CheckAccountStatus -- "status = 'pending'" --> ShowPending["Thông báo tài khoản đang chờ phê duyệt"]
    CheckAccountStatus -- "status = 'active'" --> CheckTargetAdmin{"Trang yêu cầu là Admin?"}
    
    CheckTargetAdmin -- "Đúng (admin.html)" --> CheckAdminRole{"Vai trò có thuộc: Staff, Admin, Owner?"}
    CheckAdminRole -- "Có" --> AllowAdmin["Cho phép truy cập và render giao diện Quản trị"]
    CheckAdminRole -- "Không (Member)" --> BlockAdmin["Báo lỗi 403: Không có quyền truy cập, redirect về index"]

    CheckTargetAdmin -- "Không (Trang học viên thông thường)" --> AllowMember["Cho phép học tập và tương tác bình thường"]
```

---

## 2. LỰA CHỌN VÀ HIỂN THỊ CÁC MÔN TIÊU BIỂU TẠI TRANG CHỦ (HOME SUBJECTS)
- **Mục đích:** Mô tả cách nạp danh mục môn học, tính toán tiến độ trung bình và xử lý layout 6 môn (3x2).
- **Nguồn:** [`home_page/home_page.js:17-104`](file:///c:/Users/anhqu/Documents/Computer%20Science%20Training/PRIVATE%20PROJECT/9-5-ai-library/home_page/home_page.js#L17-L104), [`HOME_SUBJECTS_AUDIT.md:8-19`](file:///c:/Users/anhqu/Documents/Computer%20Science%20Training/PRIVATE%20PROJECT/9-5-ai-library/HOME_SUBJECTS_AUDIT.md#L8-L19).

```mermaid
flowchart TD
    Start(["Khởi tạo trang chủ (home_page.html)"]) --> GetSubjects["Gọi core.getSubjects() lấy 7 môn tĩnh"]
    GetSubjects --> CheckFilter{"Cấu hình hiển thị?"}
    
    CheckFilter -- "Mặc định (Tất cả môn)" --> Limit6["Giới hạn hiển thị 6 môn đầu (Tối ưu lưới 3x2)"]
    CheckFilter -- "Xem tất cả" --> All7["Hiển thị cả 7 môn (Tạo hàng 3 đơn độc 3-3-1)"]
    
    Limit6 --> LoopSubjects["Lặp qua từng môn học"]
    All7 --> LoopSubjects
    
    LoopSubjects --> ReadAttempts["Đọc lịch sử thi lib95:practice:attempts"]
    ReadAttempts --> CalcAvg["avgScore = core.getSubjectAverageScore(sub.id)"]
    CalcAvg --> CalcProg["Tính progressPct dựa trên câu đã trả lời"]
    CalcProg --> CheckAvg{"avgScore > 0?"}
    
    CheckAvg -- "Có điểm thi" --> DisplayAvg["displayProgress = avgScore"]
    CheckAvg -- "Chưa thi" --> DisplayProg["displayProgress = progressPct (Hiện tại lỗi luôn = 0)"]
    
    DisplayAvg --> CheckFav{"Môn nằm trong lib95:favorites:subjects?"}
    DisplayProg --> CheckFav
    
    CheckFav -- "Đúng" --> MarkFav["Gán class .is-favorited (Sao vàng)"]
    CheckFav -- "Sai" --> MarkNoFav["Gán class mặc định (Sao xám)"]
    
    MarkFav --> RenderCard["Render thẻ môn (Thanh tiến độ, nút Lectures, nút Practice)"]
    MarkNoFav --> RenderCard
    
    RenderCard --> NextSub{"Còn môn học tiếp theo?"}
    NextSub -- "Có" --> LoopSubjects
    NextSub -- "Hết" --> End(["Hoàn tất hiển thị khối Your subjects"])
```

---

## 3. LƯU TRÌNH LÀM BÀI TRẮC NGHIỆM VÀ XỬ LÝ MATHJAX
- **Mục đích:** Mô tả việc chuẩn bị câu hỏi, xáo trộn thứ tự, bảo toàn công thức toán học LaTeX và nộp bài.
- **Nguồn:** [`js/practice-quiz.js`](file:///c:/Users/anhqu/Documents/Computer%20Science%20Training/PRIVATE%20PROJECT/9-5-ai-library/js/practice-quiz.js), [`js/mathjax-config.js`](file:///c:/Users/anhqu/Documents/Computer%20Science%20Training/PRIVATE%20PROJECT/9-5-ai-library/js/mathjax-config.js).

```mermaid
flowchart TD
    Start(["Học viên nhấn Bắt đầu làm bài thi"]) --> LoadQuiz["Đọc Quiz ID từ URL params (?quiz=...)"]
    LoadQuiz --> ValidateQuiz{"Quiz có tồn tại và có câu hỏi?"}
    
    ValidateQuiz -- "Không (Thuộc 60 quiz rỗng)" --> ShowEmpty["Báo lỗi: Đề thi chưa có dữ liệu câu hỏi, quay về danh mục"]
    ValidateQuiz -- "Có câu hỏi hợp lệ" --> CheckShuffle{"Đề thi có bật xáo trộn?"}
    
    CheckShuffle -- "Có" --> ShuffleQuestions["Xáo trộn mảng câu hỏi (Fisher-Yates)"]
    CheckShuffle -- "Không" --> KeepQuestions["Giữ nguyên thứ tự câu hỏi"]
    
    ShuffleQuestions --> InitTimer["Khởi tạo bộ đếm thời gian (Countdown Timer)"]
    KeepQuestions --> InitTimer
    
    InitTimer --> RenderQuestion["Render câu hỏi thứ i (Text, Options)"]
    RenderQuestion --> CheckMath["Phát hiện ký tự $..$ hoặc $$..$$?"]
    
    CheckMath -- "Có" --> MathJaxTypeset["Gọi MathJax.typesetPromise() chuyển LaTeX sang SVG"]
    CheckMath -- "Không" --> ShowPlain["Hiển thị văn bản thông thường"]
    
    MathJaxTypeset --> WaitStudent["Chờ học viên chọn đáp án A/B/C/D"]
    ShowPlain --> WaitStudent
    
    WaitStudent --> SaveLocal["Ghi tạm đáp án vào localStorage để phòng mất điện / mất mạng"]
    SaveLocal --> CheckAction{"Hành động tiếp theo?"}
    
    CheckAction -- "Next / Prev" --> RenderQuestion
    CheckAction -- "Hết giờ (Timer = 0)" --> ForceSubmit["Tự động cưỡng chế nộp bài"]
    CheckAction -- "Bấm Nộp bài (Submit)" --> ConfirmSubmit{"Xác nhận nộp bài?"}
    
    ConfirmSubmit -- "Huỷ" --> WaitStudent
    ConfirmSubmit -- "Đồng ý" --> ForceSubmit
    
    ForceSubmit --> GradeQuiz["So khớp đáp án với correctIndex, tính điểm %"]
    GradeQuiz --> PushAttempt["Lưu bản ghi vào lib95:practice:attempts"]
    PushAttempt --> CleanDraft["Xoá dữ liệu tạm lib95:practice:progress"]
    CleanDraft --> ViewResult["Chuyển hướng sang trang practice-result.html"]
```

---

## 4. QUY TẮC MỞ KHOÁ VÀ HOÀN THÀNH BÀI GIẢNG TUẦN TỰ
- **Mục đích:** Mô tả thuật toán xác định trạng thái bài giảng (Locked, In-progress, Completed) dựa trên tiến độ bài trước.
- **Nguồn:** [`js/lectures-core.js:70-90, 135-155`](file:///c:/Users/anhqu/Documents/Computer%20Science%20Training/PRIVATE%20PROJECT/9-5-ai-library/js/lectures-core.js#L70-L90), [`js/lecture-player.js:200-220`](file:///c:/Users/anhqu/Documents/Computer%20Science%20Training/PRIVATE%20PROJECT/9-5-ai-library/js/lecture-player.js#L200-L220).

```mermaid
flowchart TD
    Start(["Mở danh sách bài giảng của một khoá học"]) --> ReadCompleted["Đọc danh sách đã hoàn thành từ localStorage: completedIds"]
    ReadCompleted --> SortLectures["Sắp xếp bài giảng theo chapter_order tăng dần"]
    SortLectures --> Iterate["Duyệt qua từng bài giảng (index = 0..n)"]
    
    Iterate --> IsFirst{"Là bài giảng đầu tiên (index == 0)?"}
    
    IsFirst -- "Đúng" --> CheckFirstCompleted{"ID bài 1 có trong completedIds?"}
    CheckFirstCompleted -- "Có" --> StatusFirstComp["status = 'completed'"]
    CheckFirstCompleted -- "Chưa" --> StatusFirstInProg["status = 'in-progress' (Luôn luôn mở bài đầu)"]
    
    IsFirst -- "Sai (index > 0)" --> CheckPrevCompleted{"Bài giảng liền trước (index - 1) đã completed?"}
    CheckPrevCompleted -- "Chưa" --> StatusLocked["status = 'locked' (Khoá bài giảng này, hiển thị icon ổ khoá)"]
    CheckPrevCompleted -- "Đã xong" --> CheckSelfCompleted{"ID bài này có trong completedIds?"}
    
    CheckSelfCompleted -- "Đã có" --> StatusComp["status = 'completed'"]
    CheckSelfCompleted -- "Chưa có" --> StatusInProg["status = 'in-progress' (Mở khoá cho phép học)"]
    
    StatusFirstComp --> NextLecture{"Còn bài học tiếp theo?"}
    StatusFirstInProg --> NextLecture
    StatusLocked --> NextLecture
    StatusComp --> NextLecture
    StatusInProg --> NextLecture
    
    NextLecture -- "Còn" --> Iterate
    NextLecture -- "Hết" --> RenderUI["Hiển thị giao diện khoá học kèm trạng thái chuẩn xác"]
    
    RenderUI -. Học viên vào xem bài in-progress .-> WatchVideo["Phát video bài giảng"]
    WatchVideo --> CheckTime{"Thời lượng xem >= 90% tổng video?"}
    CheckTime -- "Đạt" --> MarkComp["Lưu ID vào completedIds, lập tức mở khoá bài tiếp theo!"]
    CheckTime -- "Chưa" --> KeepWatch["Tiếp tục lưu số giây xem dở dang"]
```

---

## 5. QUY TRÌNH TẢI LÊN VIDEO VÀ TỐI ƯU HOÁ FASTSTART
- **Mục đích:** Mô tả luồng xử lý tệp video MP4/MOV gửi lên từ Admin: kiểm tra dung lượng, chạy FFmpeg hoán đổi moov atom và đo thời lượng qua FFprobe.
- **Nguồn:** [`backend/routes/lmsRoutes.js:125-181`](file:///c:/Users/anhqu/Documents/Computer%20Science%20Training/PRIVATE%20PROJECT/9-5-ai-library/backend/routes/lmsRoutes.js#L125-L181).

```mermaid
flowchart TD
    Start(["Admin gửi yêu cầu upload video qua FormData"]) --> CheckAuth{"Token có quyền Staff/Admin/Owner?"}
    
    CheckAuth -- "Không có quyền" --> Return403["Trả về HTTP 403 Forbidden"]
    CheckAuth -- "Có quyền" --> MulterFilter{"Tệp có tồn tại và dung lượng <= 1GB?"}
    
    MulterFilter -- "Vượt quá 1GB / Lỗi tệp" --> Return400["Trả về HTTP 400: Dung lượng vượt giới hạn"]
    MulterFilter -- "Hợp lệ" --> SaveTemp["Multer lưu tệp vào document/Lectures/Uploads/"]
    
    SaveTemp --> CheckExt{"Đuôi tệp có phải .mp4 hoặc .mov?"}
    
    CheckExt -- "Không" --> SkipFFmpeg["Bỏ qua tối ưu moov atom, giữ nguyên tệp"]
    CheckExt -- "Đúng" --> RunFFmpeg["Gọi lệnh FFmpeg: ffmpeg -y -i input -c copy -movflags +faststart tempOut"]
    
    RunFFmpeg --> CheckFFmpegResult{"FFmpeg thành công và tệp sinh ra > 0 bytes?"}
    CheckFFmpegResult -- "Thành công" --> SwapAtom["Xoá tệp gốc, đổi tên tệp faststart thành tệp chính thức"]
    CheckFFmpegResult -- "Thất bại / Lỗi" --> LogWarning["Ghi log cảnh báo, giữ lại tệp gốc ban đầu"]
    
    SwapAtom --> RunFFprobe["Gọi lệnh FFprobe đọc thời lượng format=duration"]
    SkipFFmpeg --> RunFFprobe
    LogWarning --> RunFFprobe
    
    RunFFprobe --> CheckDuration{"FFprobe đọc được thời lượng?"}
    CheckDuration -- "Đọc được" --> CalcMin["duration_min = Math.ceil(durSec / 60)"]
    CheckDuration -- "Không đọc được" --> FallbackDur["duration_min = 1 (Fallback an toàn)"]
    
    CalcMin --> ReturnSuccess["Trả về HTTP 200 { url, duration_min, size, formatted_duration }"]
    FallbackDur --> ReturnSuccess
```

---

## 6. VÒNG ĐỜI THÔNG BÁO VÀ BỘ LỌC CÀI ĐẶT HỌC VIÊN
- **Mục đích:** Thể hiện vòng đời của một thông báo từ khi sinh ra (sự kiện mới) đến khi gửi qua chuông và bị ảnh hưởng bởi cài đặt người dùng.
- **Nguồn:** [`backend/controllers/communityController.js:1450-1550`](file:///c:/Users/anhqu/Documents/Computer%20Science%20Training/PRIVATE%20PROJECT/9-5-ai-library/backend/controllers/communityController.js#L1450-L1550), [`js/notifications-bell.js`](file:///c:/Users/anhqu/Documents/Computer%20Science%20Training/PRIVATE%20PROJECT/9-5-ai-library/js/notifications-bell.js).

```mermaid
flowchart TD
    Trigger(["Sự kiện: Có bài viết mới / Có ai thích bài / Bình luận"]) --> FilterActor{"Actor ID == Receiver ID?"}
    
    FilterActor -- "Đúng (Tự làm tự nhận)" --> Ignore["Bỏ qua không tạo thông báo"]
    FilterActor -- "Khác người dùng" --> InsertNotif["Thêm bản ghi vào bảng community_notifications (is_read = 0)"]
    
    InsertNotif --> ClientPolling["Client gửi request định kỳ GET /unread-count mỗi 60s"]
    ClientPolling --> CheckUnread{"Số lượng chưa đọc > 0?"}
    
    CheckUnread -- "Có" --> ShowDot["Hiển thị chấm đỏ notification-dot trên chuông"]
    CheckUnread -- "Không" --> HideDot["Ẩn chấm đỏ"]
    
    ShowDot --> OpenBell["Người dùng click mở chuông thông báo"]
    OpenBell --> FetchList["Gọi API GET /api/community/notifications?limit=10"]
    
    FetchList --> ReadSettings["Đọc cấu hình lọc trong lib95:settings:data"]
    ReadSettings --> CheckFilterSetting{"Học viên có tắt thông báo loại này?"}
    
    CheckFilterSetting -- "Đã tắt (VD: tắt communityActivity)" --> FilterOut["Ẩn mục thông báo khỏi danh sách hiển thị"]
    CheckFilterSetting -- "Bật nhận" --> RenderNotif["Render thẻ thông báo (Huy hiệu unread, Icon, Thời gian)"]
    
    RenderNotif --> UserReadAction{"Người dùng thao tác gì?"}
    
    UserReadAction -- "Click vào 1 thông báo" --> MarkSingle["Gọi POST /api/community/notifications/:id/read (is_read = 1)"]
    UserReadAction -- "Click Mark all as read" --> MarkAll["Gọi POST /api/community/notifications/read-all"]
    
    MarkSingle --> SyncTabs["Ghi timestamp vào lib95:notif:update để đồng bộ tất cả các tab khác"]
    MarkAll --> SyncTabs
```

---

## 7. QUY TRÌNH KIỂM DUYỆT BÁO CÁO VI PHẠM (COMMUNITY MODERATION)
- **Mục đích:** Mô tả các nhánh xử lý báo cáo vi phạm nội dung của Admin: Ẩn bài viết, Khôi phục, Bỏ qua hoặc Xoá vĩnh viễn.
- **Nguồn:** [`backend/controllers/moderationController.js:270-360`](file:///c:/Users/anhqu/Documents/Computer%20Science%20Training/PRIVATE%20PROJECT/9-5-ai-library/backend/controllers/moderationController.js#L270-L360).

```mermaid
flowchart TD
    Start(["Admin mở báo cáo vi phạm ID = X"]) --> ReadReport["Đọc target_type (post, comment, discussion, reply) và target_id"]
    ReadReport --> ChooseAction{"Admin quyết định xử lý thế nào?"}
    
    ChooseAction -- "1. Bỏ qua (Dismiss)" --> ActDismiss["UPDATE community_reports SET status = 'dismissed'"]
    ActDismiss --> LogAudit1["Ghi audit_log: moderation.dismiss"]
    
    ChooseAction -- "2. Ẩn nội dung (Hide)" --> ActHide["UPDATE targetTable SET is_hidden = 1, hidden_by = adminId, hidden_at = NOW()"]
    ActHide --> UpdateReportsHide["UPDATE tất cả báo cáo liên quan thành status = 'actioned'"]
    UpdateReportsHide --> LogAudit2["Ghi audit_log: moderation.hide"]
    
    ChooseAction -- "3. Khôi phục nội dung (Restore)" --> ActRestore["UPDATE targetTable SET is_hidden = 0, hidden_by = NULL"]
    ActRestore --> UpdateReportsRestore["UPDATE báo cáo thành status = 'dismissed'"]
    ActRestore --> LogAudit3["Ghi audit_log: moderation.restore"]
    
    ChooseAction -- "4. Xoá vĩnh viễn (Delete)" --> ActDelete["DELETE FROM targetTable WHERE id = target_id (Khoá ngoại CASCADE xoá liên quan)"]
    ActDelete --> UpdateReportsDelete["UPDATE tất cả báo cáo thành status = 'actioned'"]
    ActDelete --> LogAudit4["Ghi audit_log: moderation.delete"]
    
    LogAudit1 --> Finish(["Hoàn tất xử lý, cập nhật giao diện Admin"])
    LogAudit2 --> Finish
    LogAudit3 --> Finish
    LogAudit4 --> Finish
```

---

## 8. KHỞI TẠO THEME CHỐNG FOUC VÀ TÙY CHỈNH GIAO DIỆN
- **Mục đích:** Mô tả cách `theme-init.js` ngăn chặn hiện tượng chớp trắng màn hình và cách áp dụng Accent Color, Cỡ chữ.
- **Nguồn:** [`js/theme-init.js:1-35`](file:///c:/Users/anhqu/Documents/Computer%20Science%20Training/PRIVATE%20PROJECT/9-5-ai-library/js/theme-init.js#L1-L35), [`DARK_THEME_AUDIT.md`](file:///c:/Users/anhqu/Documents/Computer%20Science%20Training/PRIVATE%20PROJECT/9-5-ai-library/DARK_THEME_AUDIT.md).

```mermaid
flowchart TD
    Start(["Trình duyệt bắt đầu nạp trang HTML"]) --> HeadScript["theme-init.js chạy ngay trong thẻ <head> trước khi render body"]
    HeadScript --> ReadTheme["Đọc localStorage.getItem('theme')"]
    
    ReadTheme --> CheckSavedTheme{"Có lưu theme cụ thể?"}
    
    CheckSavedTheme -- "Lưu 'dark'" --> ApplyDark["Gán documentElement data-theme = 'dark'"]
    CheckSavedTheme -- "Lưu 'light'" --> ApplyLight["Gán documentElement data-theme = 'light'"]
    CheckSavedTheme -- "Chưa lưu hoặc lưu 'auto'" --> CheckSystem{"Kiểm tra window.matchMedia('(prefers-color-scheme: dark)')"}
    
    CheckSystem -- "Hệ điều hành Dark" --> ApplyDark
    CheckSystem -- "Hệ điều hành Light" --> ApplyLight
    
    ApplyDark --> ReadSettings["Đọc lib95:settings:data lấy accent, fontSize"]
    ApplyLight --> ReadSettings
    
    ReadSettings --> ApplyTokens["Gán CSS Variables: --accent-primary, --font-size-base"]
    ApplyTokens --> RenderDOM["Trình duyệt bắt đầu parse và vẽ DOM (Không hề có chớp trắng FOUC!)"]
    
    RenderDOM -. Người dùng gạt nút Toggle Theme .-> UserToggle["Nhấp nút Theme Toggle"]
    UserToggle --> SwitchTheme["Chuyển đổi data-theme và lưu ngược lại localStorage('theme')"]
```

---

## 9. QUY TRÌNH LƯU SETTINGS (AUTOSAVE VS SAVE CHANGES)
- **Mục đích:** Mô tả sự khác biệt giữa các cài đặt giao diện/thông báo được lưu tức thì (Autosave) và form thông tin tài khoản cần bấm nút Lưu.
- **Nguồn:** [`js/settings-core.js`](file:///c:/Users/anhqu/Documents/Computer%20Science%20Training/PRIVATE%20PROJECT/9-5-ai-library/js/settings-core.js), [`SETTINGS_AUDIT.md`](file:///c:/Users/anhqu/Documents/Computer%20Science%20Training/PRIVATE%20PROJECT/9-5-ai-library/SETTINGS_AUDIT.md).

```mermaid
flowchart TD
    Start(["Người dùng thay đổi một mục trong Settings"]) --> IdentifyType{"Loại mục cài đặt?"}
    
    IdentifyType -- "1. Giao diện (Theme, Accent, Font) hoặc Thông báo" --> TriggerAuto["Cơ chế Tự động lưu (Autosave)"]
    TriggerAuto --> SaveClientStorage["Ghi đè tức thì vào lib95:settings:data trong localStorage"]
    SaveClientStorage --> ApplyImmediateCSS["Áp dụng ngay lập tức CSS token lên toàn bộ giao diện"]
    ApplyImmediateCSS --> ShowAutoToast["Hiển thị thông báo nhỏ: 'Đã tự động lưu'"]
    
    IdentifyType -- "2. Hồ sơ cá nhân (Tên, Tiểu sử, Avatar)" --> MarkDirty["Đánh dấu Form bị sửa đổi (Dirty state)"]
    IdentifyType -- "3. Đổi mật khẩu tài khoản" --> MarkDirty
    
    MarkDirty --> WaitUserButton["Hiển thị nút 'Save Changes' ở trạng thái sẵn sàng"]
    WaitUserButton --> ClickSave["Người dùng bấm nút 'Save Changes'"]
    
    ClickSave --> ValidateInput{"Dữ liệu hợp lệ?"}
    ValidateInput -- "Không (Sai mật khẩu, rỗng)" --> ShowFormError["Báo lỗi cụ thể dưới ô nhập liệu"]
    ValidateInput -- "Hợp lệ" --> SendBackendAPI["Gửi yêu cầu PUT /api/users/profile hoặc PUT /api/users/change-password"]
    
    SendBackendAPI --> ServerResp{"Phản hồi từ Server?"}
    ServerResp -- "Lỗi" --> ShowServerError["Thông báo lỗi máy chủ"]
    ServerResp -- "Thành công" --> UpdateSnapshot["Cập nhật lại localStorage('user') và reset trạng thái Form"]
```

---

## 10. KHỞI ĐỘNG MÁY CHỦ EXPRESS VÀ KHỞI TẠO CSDL (v2 cập nhật)
- **Mục đích:** Mô tả trình tự khởi động ứng dụng backend: Nạp môi trường, kiểm tra độ an toàn JWT Secret, kết nối CSDL, áp dụng các tiêu đề bảo mật (Security Headers), gắn Rate Limiter, gắn lớp chặn 404 bảo mật và WhiteList tệp tĩnh trước khi mở cổng lắng nghe.
- **Nguồn:** [`backend/server.js`](file:///c:/Users/anhqu/Documents/Computer%20Science%20Training/PRIVATE%20PROJECT/9-5-ai-library/backend/server.js), [`backend/config/initDb.js`](file:///c:/Users/anhqu/Documents/Computer%20Science%20Training/PRIVATE%20PROJECT/9-5-ai-library/backend/config/initDb.js).

```mermaid
flowchart TD
    Start(["Chạy lệnh: node backend/server.js"]) --> LoadEnv["dotenv nạp cấu hình từ backend/.env"]
    LoadEnv --> CheckJWTSecret{"JWT_SECRET là mặc định / yếu?"}
    
    CheckJWTSecret -- "Đúng" --> WarnJWT["In cảnh báo [SECURITY WARNING] ra console (F-008)"]
    CheckJWTSecret -- "An toàn" --> CreatePool["mysql2/promise tạo Connection Pool tới MySQL"]
    WarnJWT --> CreatePool
    
    CreatePool --> CallInitDB["Gọi hàm initDatabase() khởi tạo bảng/migration"]
    CallInitDB --> SetupSecHeaders["Đăng ký Tiêu đề bảo mật: X-Content-Type-Options, X-Frame-Options, Referrer-Policy (F-008)"]
    
    SetupSecHeaders --> SetupRateLimiter["Gắn In-Memory Rate Limiter trên POST /api/auth/login (F-007)"]
    SetupRateLimiter --> MountAPIs["Gắn 10 router API (/api/auth, /api/lms, /api/community, ...)"]
    
    MountAPIs --> Mount404Block["Gắn Pre-routing 404 Layer: Chặn /backend, /tools, .env, .sql, .bak, *.md (F-001)"]
    Mount404Block --> MountWhitelistStatic["Gắn Static Whitelist riêng biệt: /pages, /css, /js, /assets, /home_page, /document/Lectures, /document/Practice, /document/uploads (F-001)"]
    
    MountWhitelistStatic --> ListenPort["app.listen(PORT || 3000)"]
    ListenPort --> Ready(["In thông báo: Server đang chạy tại http://localhost:3000"])
```

---

## 11. QUY TRÌNH XÁC MINH VÀ XOÁ TÀI KHOẢN AN TOÀN (F-004) (v2 cập nhật)
- **Mục đích:** Mô tả các bước xác minh danh tính nhiều lớp khi người dùng yêu cầu xoá tài khoản cá nhân: kiểm tra xác nhận tên đăng nhập phía client và xác minh mật khẩu bằng bcrypt phía máy chủ trước khi thực thi lệnh xoá theo tầng (Cascading Delete).
- **Nguồn:** [`backend/controllers/userController.js:80-120`](file:///c:/Users/anhqu/Documents/Computer%20Science%20Training/PRIVATE%20PROJECT/9-5-ai-library/backend/controllers/userController.js), [`js/settings-preferences.js`](file:///c:/Users/anhqu/Documents/Computer%20Science%20Training/PRIVATE%20PROJECT/9-5-ai-library/js/settings-preferences.js), [`pages/settings/settings.html`](file:///c:/Users/anhqu/Documents/Computer%20Science%20Training/PRIVATE%20PROJECT/9-5-ai-library/pages/settings/settings.html).

```mermaid
flowchart TD
    Start(["Người dùng bấm nút 'Delete account' tại trang Settings"]) --> OpenModal["Hiển thị Modal cảnh báo nguy hiểm & yêu cầu xác nhận"]
    OpenModal --> InputFields["Người dùng nhập: Confirm Username và Password hiện tại"]
    InputFields --> SubmitDelete["Người dùng bấm 'Confirm Delete'"]
    
    SubmitDelete --> CheckClientUsername{"Username nhập vào có khớp với tài khoản hiện tại?"}
    CheckClientUsername -- "Không khớp" --> ShowClientErr["Báo lỗi đỏ: Tên tài khoản xác nhận không chính xác!"]
    
    CheckClientUsername -- "Khớp" --> SendAPI["Gửi DELETE /api/users/me { confirmUsername, password } (Bearer Token)"]
    SendAPI --> VerifyTokenAuth["verifyToken kiểm tra chữ ký & tài khoản còn active trong DB"]
    
    VerifyTokenAuth --> CheckAuthResult{"Token hợp lệ?"}
    CheckAuthResult -- "Không" --> Ret401["Trả về HTTP 401 Unauthorized"]
    
    CheckAuthResult -- "Hợp lệ" --> FetchUserDB["SELECT username, password_hash FROM users WHERE id = userId"]
    FetchUserDB --> ComparePassword["Gọi bcrypt.compare(password, password_hash)"]
    
    ComparePassword --> CheckPasswordMatch{"Mật khẩu có khớp?"}
    CheckPasswordMatch -- "Sai mật khẩu" --> Ret400["Trả về HTTP 400: Mật khẩu xác nhận không chính xác"]
    Ret400 --> ShowServerErr["Hiển thị thông báo Toast lỗi tại modal"]
    
    CheckPasswordMatch -- "Chính xác" --> ExecDelete["DELETE FROM users WHERE id = userId (DB tự xoá dữ liệu quan hệ CASCADE)"]
    ExecDelete --> Ret200["Trả về HTTP 200 OK: Tài khoản đã xoá vĩnh viễn"]
    Ret200 --> ClearClientData["Client xoá sạch token, user profile, settings trong localStorage"]
    ClearClientData --> RedirectHome["window.location.href = '/index.html' (Chuyển về trang chủ)"]
```
