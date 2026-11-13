# BÁO CÁO ĐÁNH GIÁ TOÀN DIỆN DỮ LIỆU VÀ TỆP TIN (01_DATA_ASSESSMENT.md)

**Dự án:** 9-5-ai-library  
**Phiên bản tài liệu:** v1 (Baseline)  
**Thời điểm khảo sát:** 22/10/2026  
**Phương pháp:** Chạy truy vấn SQL thực tế (`SELECT/SHOW/DESCRIBE`), phân tích cú pháp tĩnh Node.js VM, quét hệ thống tệp và đối chiếu mã nguồn.

---

## 1. THỐNG KÊ SỐ LIỆU BẢNG VÀ PHÂN BỐ NGƯỜI DÙNG

### 1.1. Số dòng thực tế trên 23 bảng cơ sở dữ liệu
*Truy vấn thực hiện: `SELECT COUNT(*) FROM \`<table>\`` thông qua connection pool của backend (`backend/config/db.js`).*

| Tên bảng CSDL | Số dòng thực tế | Ghi chú trạng thái dữ liệu |
|:---|:---:|:---|
| `users` | **5** | Đủ 4 vai trò: owner, admin, staff, member |
| `courses` | **2** | 2 khoá học (CEA201 Kỳ II và môn cơ bản) |
| `lectures` | **3** | Cả 3 bài đều thuộc `course_id = 1` |
| `lecture_resources` | **2** | Tài liệu đính kèm cho bài giảng 1 |
| `lecture_comments` | **2** | 2 bình luận mẫu (Đều có `user_id = NULL`) |
| `community_posts` | **21** | 21 bài viết bảng tin đa dạng các loại (post, poll, link) |
| `community_post_tags` | **29** | Tag chủ đề gắn với các bài viết |
| `community_comments` | **4** | Bình luận trên các bài viết cộng đồng |
| `community_likes` | **6** | Lượt thích bài viết cộng đồng |
| `community_poll_options` | **11** | Các phương án bình chọn cho bài poll |
| `community_poll_votes` | **4** | Lượt bỏ phiếu bình chọn |
| `community_discussions` | **5** | 5 chủ đề thảo luận trên diễn đàn |
| `community_discussion_replies` | **3** | Phản hồi thảo luận |
| `community_groups` | **4** | 4 nhóm học tập cộng đồng |
| `community_group_members` | **6** | Thành viên trong các nhóm |
| `community_notifications` | **20** | Thông báo hệ thống gửi tới các user |
| `resources` | **1** | 1 bản ghi tài liệu học tập trong CSDL |
| `resource_favorites` | **0** | Bảng trống (Chưa có lượt bookmark tài liệu nào) |
| `user_favorites` | **3** | 1 khoá bài giảng và 2 môn thực hành |
| `user_activity_daily` | **11** | Nhật ký điểm danh hoạt động theo ngày |
| `community_reports` | **1** | 1 báo cáo vi phạm đang chờ xử lý |
| `audit_logs` | **103** | Nhật ký thao tác quản trị viên |
| `site_settings` | **11** | Cấu hình tham số toàn trang |

### 1.2. Phân bố Vai trò (Role) và Trạng thái (Status) người dùng
*Truy vấn thực hiện:*  
- `SELECT role, COUNT(*) as count FROM users GROUP BY role`
- `SELECT status, COUNT(*) as count FROM users GROUP BY status`

```
Phân bố Vai trò (Roles):
- owner  : 1 tài khoản (ID 1)
- admin  : 1 tài khoản (ID 2)
- staff  : 1 tài khoản (ID 3)
- member : 2 tài khoản (ID 4, ID 5)
Tổng cộng: 5 tài khoản

Phân bố Trạng thái (Statuses):
- active  : 5 tài khoản (100%)
- pending : 0 tài khoản
- banned  : 0 tài khoản
```

### 1.3. Trùng lặp Username và Cột Email
- **Kiểm tra trùng Username:** `SELECT username, COUNT(*) as count FROM users GROUP BY username HAVING count > 1` -> **0 trùng lặp** (Trường `username` có chỉ mục `UNIQUE` trong CSDL).
- **Phát hiện cấu trúc về Email:** Khi chạy truy vấn kiểm tra trùng lặp email, CSDL trả về lỗi `ER_BAD_FIELD_ERROR: Unknown column 'email' in 'field list'`. Bảng `users` trong CSDL thực tế **hoàn toàn không có cột `email`**. Thay vào đó, trường `username` được hệ thống dùng để lưu chuỗi định danh (thường là email hoặc tên đăng nhập của học viên).

---

## 2. ĐÁNH GIÁ TÍNH TOÀN VẸN DỮ LIỆU VÀ KHOÁ NGOẠI

### 2.1. Kiểm tra bản ghi mồ côi (Orphan Records)
*Chạy các truy vấn `LEFT JOIN ... WHERE <parent>.id IS NULL`:*

1. **`lectures` -> `courses`:** 0 bản ghi mồ côi (Tất cả bài giảng đều trỏ về khoá học hợp lệ ID 1).
2. **`lecture_comments` -> `lectures`:** 0 bản ghi mồ côi.
3. **`lecture_comments` -> `users`:** **PHÁT HIỆN BẤT THƯỜNG:** Có 2/2 bản ghi trong `lecture_comments` có trường `user_id = NULL` (ID 1 và ID 2). Nguyên nhân: API `POST /api/lms/lectures/:lectureId/comments` tại `backend/routes/lmsRoutes.js:183-192` không ép buộc middleware `verifyToken`, cho phép người dùng gửi request không có token và controller `lmsController.js:468` ghi `user_id = NULL`.
4. **`community_comments` -> `community_posts`:** 0 bản ghi mồ côi.
5. **`community_notifications` -> `community_posts` / `users`:** 0 bản ghi mồ côi (Tất cả thông báo đều gắn đúng user nhận và bài viết tồn tại).
6. **`user_favorites` -> `courses`:** `item_type = 'lecture_course'` trỏ đúng `course_id = 1`. Riêng `item_type = 'practice_subject'` lưu `item_id = 1` và `item_id = 5` (đây là ID tĩnh trong mảng JS của `practice-data.js`, CSDL MySQL không có bảng `subjects` tương ứng nên không thể tạo khoá ngoại).

### 2.2. Kiểm tra tính hợp lệ của thời gian (Timestamps Anomaly)
*Truy vấn thực hiện: Kiểm tra thời gian tương lai (`created_at > NOW()`) và thời gian cập nhật trước ngày tạo (`updated_at < created_at`):*
- `SELECT id, created_at FROM users WHERE created_at > NOW()` -> **0 dòng** (Không có mốc thời gian tương lai).
- `SELECT id, created_at, updated_at FROM community_posts WHERE updated_at < created_at` -> **0 dòng**.

---

## 3. ĐÁNH GIÁ DỮ LIỆU BÀI GIẢNG (LMS MODULE)

### 3.1. Trùng lặp thứ tự chương (`chapter_order`)
*Truy vấn: `SELECT course_id, chapter_order, COUNT(*) as count FROM lectures GROUP BY course_id, chapter_order HAVING count > 1`*
- **KẾT QUẢ PHÁT HIỆN:** Tại khoá học `course_id = 1`, cả 3 bài giảng hiện có đều mang giá trị `chapter_order = 1`:
  - Bài ID 1: `"Computer Organization and Architecture: Number Systems"` (`chapter_order = 1`, nguồn: file local).
  - Bài ID 13: `"Can You Beat Minecraft But It's 100% Obsidian?"` (`chapter_order = 1`, nguồn: YouTube).
  - Bài ID 20: `"Cleady - Skies [Summer Sounds Release]"` (`chapter_order = 1`, nguồn: YouTube).
- **Tác động:** Khi render danh sách bài học và thanh tiến độ tuần tự (`lectures-core.js`), việc cả 3 bài đều là "Chương 1" làm sai lệch thứ tự hiển thị, khiến bài sau không xác định được chính xác bài tiên quyết của mình.

### 3.2. Kiểm tra liên kết tệp video trên đĩa (`video_url`)
- **Tệp video nội bộ:** Bài ID 1 trỏ tới `video_url: '/document/Lectures/Ky_II/CEA201/test/Giải_mã_Hệ_thống_Số.mp4'`.
- **Kiểm tra trên đĩa vật lý:** Tệp tồn tại thực tế tại `c:\Users\anhqu\Documents\Computer Science Training\PRIVATE PROJECT\9-5-ai-library\document\Lectures\Ky_II\CEA201\test\Giải_mã_Hệ_thống_Số.mp4` với dung lượng 8,367,078 bytes (~8 MB).
- **Các video upload:** Thư mục `document/Lectures/Uploads/` có 3 video hợp lệ (dung lượng ~102 MB).

### 3.3. Thời lượng và Tính nhất quán YouTube ID
- `duration_min`: Bài 1 (18 phút), Bài 13 (15 phút), Bài 20 (5 phút). Không có bài nào bị `duration_min = 0` hoặc âm.
- Hai bài YouTube (ID 13 và 20) đều có trường `youtube_id` hợp lệ (`Gx6I0Uf5UHM` và `Sf1p8p8CvBQ`) và `video_source = 'youtube'`.
- Bài file (ID 1) có `youtube_id = NULL` và `video_source = 'file'`.

---

## 4. ĐÁNH GIÁ DỮ LIỆU TRẮC NGHIỆM THỰC HÀNH (PRACTICE DATA)

### 4.1. Khảo sát tệp `js/practice-data.js`
*Thực thi phân tích dữ liệu qua môi trường cô lập Node.js VM:*
- **Dung lượng tệp:** **2,465.09 KB** (~2.41 MB). Nạp đồng bộ bằng thẻ `<script>` ở client.
- **Tổng số môn học:** 7 môn (`CEA201`, `DBI202`, `PFP191`, `CSD203`, `CSI106`, `MAD101`, `MAE101`).
- **Tổng số đề thi (Quizzes):** 123 quizzes.
- **Tổng số câu hỏi (Questions):** 2,359 câu hỏi trắc nghiệm.
- **Trùng lặp ID:**
  - Duplicate Quiz IDs: **0** (Các quiz có ID từ 1 đến 123 duy nhất).
  - Duplicate Question IDs: **0** (Tất cả 2,359 câu hỏi đều có ID duy nhất từ 1000 đến 25484).
- **Câu hỏi thiếu lời giải (`explanation`):** **0 câu** (100% câu hỏi đều có giải thích chi tiết).

### 4.2. Các lỗi cấu trúc dữ liệu nghiêm trọng trong `practice-data.js`
1. **60 Đề thi rỗng không có câu hỏi (`emptyQuizzes`):**
   - Trong 123 đề thi, có tới **60 đề thi (chiếm 48.7%)** không có bất kỳ câu hỏi nào trong mảng `questions` (chủ yếu nằm ở môn CEA201, DBI202, PFP191, CSD203, CSI106 với các quiz từ chương 6 trở đi). Khi học viên bấm vào các đề này, giao diện phòng thi sẽ không tải được câu hỏi nào.
2. **39 Câu hỏi có chỉ số đáp án đúng (`correctIndex`) bất hợp lệ:**
   - **35 câu hỏi có mảng `options: []` rỗng** (nhưng lại đặt `correctIndex = 0` hoặc `1`). Các câu này tập trung tại Quiz 101, 104, 110, 113 (ví dụ câu ID 5075, 5076, 5077, 5078, 5079 thuộc môn DBI202). Khi render, học viên thấy câu hỏi nhưng không có 4 phương án A/B/C/D để chọn!
   - **4 câu hỏi có `correctIndex` vượt quá phạm vi mảng**:
     - ID 5416 (Quiz 104): `optionsCount = 1`, nhưng `correctIndex = 3` (Chỉ số 3 không tồn tại).
     - ID 5454 (Quiz 104): `optionsCount = 3`, nhưng `correctIndex = 3` (Mảng 3 phần tử có chỉ số 0, 1, 2; `correctIndex = 3` gây lỗi chấm điểm).
     - ID 5533 (Quiz 104): `optionsCount = 3`, `correctIndex = 3`.
     - ID 5550 (Quiz 104): `optionsCount = 3`, `correctIndex = 3`.

### 4.3. Đánh giá thư mục `document/Practice/` (5 bộ môn + 2 bộ toán)
- **Tổng dung lượng thư mục:** **209.25 MB** với **4,400 tệp tin**.
- **Thư mục rác / rỗng (`AGIc`):**
  - Tại `document/Practice/Ky_II/AGIc`: Thư mục rỗng hoàn toàn, không có tệp nào bên trong (tồn tại do tạo nhầm hoặc chưa dọn dẹp).
- **Phình to dung lượng môn Toán (MAD101 & MAE101):**
  - Thư mục `document/Practice/Ky_I/MAD101/MAD101 - Ultra Ultimate Edition/` chứa **1,131 tệp ảnh PNG câu hỏi** (`0001_q001_...png` đến `1131_q1131_...png`) nằm lẫn lộn ngay ở thư mục gốc của môn học thay vì gom vào thư mục con `assets/img/`.
  - Chứa thư mục `node_modules` riêng bên trong `MAD101 - Ultra Ultimate Edition/node_modules/` (không được loại trừ đúng cách).
  - Chứa nhiều thư mục backup trùng lặp: `v2_backup_20261017_223323/`, `legacy/`, `scratch/`, `preview_v2.html`.

---

## 5. ĐÁNH GIÁ MODULE CỘNG ĐỒNG (COMMUNITY)

- **Số bài viết được ghim (`is_pinned = 1`):** Hiện có **0 bài** được ghim (Giới hạn tối đa là 3 bài theo quy định nghiệp vụ).
- **Bài viết ẩn (`is_hidden = 1`):** Hiện có **0 bài** bị ẩn.
- **Thông báo trỏ tới bài viết không tồn tại:** 0 thông báo mồ côi.
- **Lượt thích (`community_likes`) trùng lặp:** 0 bản ghi trùng (Bảng có khoá chính phức hợp `PRIMARY KEY (post_id, user_id)`).
- **Bình chọn (`community_poll_votes`) trùng lặp:** 0 bản ghi trùng (Có `UNIQUE KEY (post_id, user_id)`).
- **Nội dung từ người dùng bị banned:** Hiện không có người dùng nào bị gắn cờ `status = 'banned'` trong CSDL.

---

## 6. ĐÁNH GIÁ TỆP TIN VÀ LIÊN KẾT NỘI BỘ (RESOURCES & ASSETS)

### 6.1. Trùng lặp ID trong cùng một trang HTML (Duplicate DOM IDs)
*Quét thuộc tính `id="..."` trên toàn bộ 28 trang HTML của dự án:*
- **Trang `pages/auth/reset_pass.html`:**
  - `id="password"`: Xuất hiện **2 lần** (ở cả ô "New password" và ô "Confirm new password").
  - `id="togglePassword"`: Xuất hiện **2 lần**.
  - `id="eyeIcon"`: Xuất hiện **2 lần**.
- **Trang `pages/auth/signup.html`:**
  - `id="togglePassword"`: Xuất hiện **2 lần**.
  - `id="eyeIcon"`: Xuất hiện **2 lần**.
- **Tác động:** Theo chuẩn HTML/W3C, thuộc tính `id` phải là duy nhất trong tài liệu. Khi có trùng lặp, hàm `document.getElementById('togglePassword')` chỉ chọn phần tử đầu tiên, khiến nút bấm ẩn/hiện mật khẩu của ô thứ hai (Confirm Password) bị tê liệt hoàn toàn.

### 6.2. Kiểm tra nạp Script nền tảng (Foundation Scripts)
- **`js/theme-init.js`:** Được nạp đầy đủ trên 28/28 trang HTML ở vị trí đầu thẻ `<head>` (đảm bảo chống FOUC toàn diện).
- **`js/syncProfile.js`:** Đã nạp trên 24/28 trang. Thiếu trên `index.html` (do dùng `auth-guard.js`), `pages/auth/send_email.html`.
- **`js/auth-guard.js`:** **CHỈ XUẤT HIỆN DUY NHẤT TRÊN `index.html`** (Dòng 19 và Dòng 357). 27 trang còn lại trong thư mục `pages/` (bao gồm `pages/admin/admin.html`, `pages/settings/settings.html`, `pages/lectures/lectures.html`) hoàn toàn **không nạp `auth-guard.js`**. Nếu người dùng truy cập trực tiếp bằng URL thanh địa chỉ trình duyệt, `auth-guard.js` không thể bảo vệ trang.

### 6.3. URL máy chủ Hardcode (`http://localhost:3000`)
- **Số lượng vị trí phát hiện:** **101 vị trí** trong các tệp JavaScript và HTML.
- **Các vị trí điển hình:**
  - `js/auth.js:46`: `fetch('http://localhost:3000/api/auth/register', ...)`
  - `js/auth.js:63`: `fetch('http://localhost:3000/api/auth/login', ...)`
  - `document/Practice/...`: Hàng chục script gọi cứng `http://localhost:3000`.
- **Hậu quả:** Khi ứng dụng được triển khai lên domain thật, mạng nội bộ hoặc qua IP khác, các yêu cầu API này sẽ trỏ về chính máy tính client của người dùng và thất bại hoàn toàn.

---

## 7. ĐÁNH GIÁ KHO MÃ NGUỒN VÀ QUẢN LÝ TỆP (GIT & JUNK FILES)

### 7.1. Tệp rác, tệp đồ hoạ nguồn và tệp sao lưu thừa thãi
Quét đĩa phát hiện nhiều tệp không phục vụ môi trường chạy chính thức:
- **Tệp nguồn đồ hoạ độc quyền Paint.NET (`.pdn`):**
  - `assets/icon/Better_Icon/email2.pdn`
  - `assets/icon/Green_Icon_theme/email2.pdn`
  - `assets/icon/Purple_icon_theme/email2.pdn`
- **Tệp sao chép trùng tên có hậu tố `" (1)"`:
  - `assets/icon/Better_Icon/future (1).png`
  - `assets/icon/Better_Icon/profile (1).png`
  - `assets/icon/Better_Icon/time-planning (1).png`
  - `assets/icon/Green_Icon_theme/future (1).png`
  - `assets/icon/Green_Icon_theme/profile (1).png`
  - `assets/icon/Green_Icon_theme/time-planning (1).png`
  - `assets/icon/Purple_icon_theme/future (1).png`
  - `assets/icon/Purple_icon_theme/profile (1).png`
  - `assets/icon/Purple_icon_theme/time-planning (1).png`
  - `assets/icon/alert (1).png`
- **Tệp backup code:** `js/resources.js.bak` (Dung lượng 65 KB).

### 7.2. Kiểm tra Git Tracking (`git ls-files`) và `.gitignore`
- Các tệp nhạy cảm như `.env`, `backend/.env`, và thư mục `tools/backup/` đã được cấu hình trong `.gitignore` và không bị git theo dõi.
- **Tuy nhiên**, lệnh `git ls-files` phát hiện Git đang theo dõi trực tiếp các tệp dữ liệu backup lớn trong thư mục thực hành:
  - `document/Practice/Ky_I/MAD101/MAD101 - Ultra Ultimate Edition/v2_backup_20261017_223323/questions_v2.js` (~1.9 MB)
  - `document/Practice/Ky_I/MAD101/MAD101 - Ultra Ultimate Edition/v2_backup_20261017_223323/questions_sample_v2.json` (~1.9 MB)
  - `document/Practice/Ky_I/MAE101/MAE101 - Ultra Ultimate Edition/data/backup_original/classified_data.json`
  - `document/Practice/Ky_I/MAE101/MAE101 - Ultra Ultimate Edition/data/backup_original/ocr_results_full.json`

---

## 8. ĐÁNH GIÁ KHÓA LƯU TRỮ TRÌNH DUYỆT (LOCALSTORAGE SCHEMA)

### 8.1. Phân nhóm các khóa lưu trữ
Hệ thống sử dụng 2 nhóm tiền tố chính:
1. `lib95:lectures:*`: Quản lý tiến độ video, bookmark ID, ghi chú học viên.
2. `lib95:practice:*`: Quản lý danh sách kết quả bài thi (`attempts`), tiến độ làm dở.

### 8.2. Xung đột và Khóa mồ côi (Legacy / Duplicate Keys)
- **Xung đột `user` vs `currentUser`:**
  - `localStorage.getItem('user')` được dùng trong `syncProfile.js`, `auth-guard.js`, `settings-*.js`.
  - Tuy nhiên, `lecture-player.js:571` lại đọc từ `localStorage.getItem('currentUser')`. Nếu khóa này rỗng, tính năng bình luận bài giảng của học viên sẽ bị nhận diện là khách ẩn danh mặc dù họ đã đăng nhập!
- **Khóa trùng lặp Site Settings:** `lib95:site_settings` (sử dụng bởi `site-branding.js`) và `site_settings_cache` (dùng bởi `admin-settings.js`) lưu cùng loại thông tin nhưng ở 2 khóa độc lập không đồng bộ với nhau.
- **Tiến độ học tập không gắn với User ID:** Khóa `lib95:lectures:completedIds` và `lib95:practice:attempts` lưu chung cho trình duyệt, không phân tách `user_<id>`. Nếu hai người dùng đăng nhập lần lượt trên cùng một máy, người dùng B sẽ kế thừa toàn bộ lịch sử điểm và bài giảng đã mở khóa của người dùng A.

---

## 9. ĐÁNH GIÁ HIỆU NĂNG VÀ TRUY VẤN N+1

### 9.1. Danh sách 10 tệp mã nguồn lớn nhất cần tối ưu tải trang

| STT | Đường dẫn tệp | Dung lượng | Đánh giá tác động tải trang |
|:---:|:---|:---:|:---|
| 1 | `js/practice-data.js` | **2,465 KB** | Nạp cứng 2.4 MB JSON khiến trang `practice.html` bị trễ phân tích JavaScript 300-800ms trên thiết bị di động. |
| 2 | `document/Practice/Ky_II/DBI202/.../questions.js` | **2,246 KB** | Chứa toàn bộ câu hỏi DBI202 trong một tệp duy nhất. |
| 3 | `assets/vendor/mathjax/tex-svg.js` | **2,059 KB** | Tệp bundle MathJax rất nặng (~2 MB). Tệp này bị sao chép lặp lại thành 3 bản ở 3 thư mục khác nhau. |
| 4 | `document/Practice/Ky_I/MAD101/.../questions_v2.js` | **1,935 KB** | Trắc nghiệm toán rời rạc bản v2. |
| 5 | `document/Practice/Ky_I/MAE101/.../questions_v2.js` | **1,611 KB** | Trắc nghiệm toán kỹ thuật bản v2. |
| 6 | `document/Practice/Ky_II/DBI202/.../explanations.json` | **1,360 KB** | Tệp giải thích riêng biệt. |
| 7 | `js/practice-data-mad101.js` | **1,275 KB** | Tệp dữ liệu toán tách rời. |
| 8 | `js/practice-data-mae101.js` | **1,173 KB** | Tệp dữ liệu toán kỹ thuật tách rời. |
| 9 | `tools/backup/backup_before_settings_...json` | **194 KB** | Tệp backup cấu hình nằm trong thư mục web công khai. |
| 10 | `tools/backup/ai_club_db_...sql` | **178 KB** | Tệp sao lưu CSDL nằm trong thư mục `tools/backup/`. |

### 9.2. Phân tích nghi ngờ truy vấn N+1 tại các Endpoint danh sách
- **Endpoint `GET /api/community/posts` (`communityController.js:86-90`):**
  - Câu truy vấn chính lấy danh sách bài viết kèm 2 subquery tương quan:
    ```sql
    (SELECT COUNT(*) FROM community_likes WHERE post_id = p.id) AS likeCount,
    (SELECT COUNT(*) FROM community_comments WHERE post_id = p.id) AS commentCount
    ```
  - Khi lấy 20 bài viết, MySQL phải thực hiện 20 lần đếm trên bảng `community_likes` và 20 lần đếm trên `community_comments`. Khi dữ liệu cộng đồng tăng lên hàng chục ngàn tương tác, các subquery này sẽ làm chậm đáng kể thời gian phản hồi API.
  - *Đề xuất:* Sử dụng `LEFT JOIN` với bảng tổng hợp gom nhóm (`GROUP BY`) hoặc lưu bộ đếm `likes_count`, `comments_count` trực tiếp trên bảng `community_posts`.
- **Endpoint `GET /api/community/posts` - Đoạn lấy dữ liệu Poll (`communityController.js:125-135`):**
  - Với mỗi bài viết có `kind = 'poll'`, hệ thống chạy truy vấn:
    ```sql
    SELECT o.id, o.post_id, o.label,
      (SELECT COUNT(*) FROM community_poll_votes WHERE option_id = o.id) AS voteCount
    FROM community_poll_options o WHERE o.post_id IN (?)
    ```
  - Subquery đếm số vote theo từng option gây thêm tải lặp cho CSDL.
