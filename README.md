# 9.5 AI CLUB - Thư Viện Học Tập & Phân Hệ Community

Dự án thư viện học tập AI và nền tảng cộng đồng trực tuyến xây dựng bằng Node.js (Express 5), MySQL (mysql2) và Vanilla HTML/CSS/JavaScript thuần.

---

## 1. Hướng Dẫn Khởi Chạy Hệ Thống

### Bước 1: Khởi động Database (MySQL)
1. Mở phần mềm **XAMPP** (hoặc dịch vụ MySQL trên máy tính).
2. Nhấn nút **Start** ở module **MySQL** (cổng 3306 mặc định).
3. Đảm bảo cấu hình trong `backend/.env` chính xác:
   ```env
   PORT=3000
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=
   DB_NAME=ai_club_db
   JWT_SECRET=super_secret_jwt_key_for_ai_club_123
   ```

### Bước 2: Cài đặt và Khởi chạy Backend Server
1. Mở Terminal tại thư mục `backend`:
   ```bash
   cd backend
   npm install
   node server.js
   ```
2. Màn hình console xuất hiện:
   ```
   🚀 Server đang chạy tại http://localhost:3000
   🎉 Database tables initialized and ready.
   ```
   *(Toàn bộ 11 bảng CSDL của Community sẽ tự động được khởi tạo an toàn qua `initDb.js` nếu chưa tồn tại).*

### Bước 3: Nạp dữ liệu mẫu (Tùy chọn)
Nếu muốn nạp bài viết, bình luận, thảo luận, nhóm và số liệu demo có sẵn:
```bash
cd backend
node seedCommunity.js
```

### Bước 4: Trải nghiệm trên trình duyệt
Truy cập: **[http://localhost:3000/pages/auth/login.html](http://localhost:3000/pages/auth/login.html)** hoặc vào thẳng **[http://localhost:3000/pages/community/community-feed.html](http://localhost:3000/pages/community/community-feed.html)** (nếu đã lưu phiên đăng nhập).

---

## 2. Danh Sách Tài Khoản Demo Để Kiểm Thử

| Vai trò | Email / Username | Mật khẩu | Quyền hạn nổi bật |
| :--- | :--- | :--- | :--- |
| **Owner** | `owner95aiclub@internal.edu.vn` | `owner1234` | Toàn quyền quản trị, xóa bài/thảo luận kiểm duyệt, tạo nhóm, ghim bài |
| **Admin** | `admin95aidev@internal.edu.vn` | `admin1234` | Kiểm duyệt nội dung, xóa bài/comment/thảo luận, tạo nhóm mới |
| **Member** | `anhquan2007nek@gmail.com` | `123456` | Đăng bài (Photo/Link/Question/Poll), like, bình luận, vote, tạo thảo luận, join/leave nhóm |

---

## 3. Cấu Trúc Bảng CSDL Community (MySQL)

Hệ thống Community gồm **11 bảng** có khóa ngoại liên kết với bảng `users`, ràng buộc toàn vẹn `ON DELETE CASCADE` và chỉ mục tối ưu truy vấn:

1. `community_posts`: Bài viết trên bảng tin (id, user_id, kind ENUM: post/photo/link/question/poll, content, media_url, link_url, created_at, updated_at).
2. `community_post_tags`: Hashtag bài viết (post_id, tag), chuẩn hóa chữ thường không dấu #.
3. `community_comments`: Bình luận bài viết (id, post_id, user_id, content, created_at).
4. `community_likes`: Lượt thích (post_id, user_id, created_at; khóa chính tổ hợp ngăn trùng lặp).
5. `community_poll_options`: Các lựa chọn của bài viết bình chọn (id, post_id, label).
6. `community_poll_votes`: Phiếu bầu của người dùng (option_id, post_id, user_id; UNIQUE (post_id, user_id) giới hạn mỗi user chỉ vote 1 lần).
7. `community_discussions`: Chủ đề thảo luận (id, user_id, title, body, tag, created_at).
8. `community_discussion_replies`: Câu trả lời trong chủ đề thảo luận (id, discussion_id, user_id, content, created_at).
9. `community_groups`: Nhóm cộng đồng (id, name, description, created_by, created_at).
10. `community_group_members`: Thành viên nhóm (group_id, user_id, joined_at).
11. `community_notifications`: Thông báo (id, user_id, actor_id, type: like/comment/reply/mention/group, post_id, is_read, created_at).

---

## 4. Danh Sách API Endpoints (/api/community)

Tất cả các route đều yêu cầu xác thực JWT qua header `Authorization: Bearer <token>`.

### Bảng tin & Bài viết
- `GET /api/community/posts`: Lấy danh sách bài viết kèm tác giả, tags, số like, số comment, trạng thái like của tôi, poll (hỗ trợ phân trang `?page=&limit=`, lọc theo `?tag=`, `?q=`).
- `POST /api/community/posts`: Tạo bài viết mới (hỗ trợ các kind: `post`, `photo`, `link`, `question`, `poll`).
- `PUT /api/community/posts/:id`: Chỉnh sửa nội dung bài viết (chỉ tác giả bài viết).
- `DELETE /api/community/posts/:id`: Xóa bài viết (tác giả bài viết hoặc Admin/Owner).
- `POST /api/community/upload-image`: Tải lên hình ảnh bằng Multer (giới hạn 5MB, định dạng JPG/PNG/WEBP/GIF, lưu tại `document/uploads/community/`).

### Tương tác Bài viết
- `POST /api/community/posts/:id/like`: Bật/tắt thả tim bài viết (tự động tạo thông báo khi thích bài người khác).
- `GET /api/community/posts/:id/comments`: Lấy danh sách bình luận của bài viết.
- `POST /api/community/posts/:id/comments`: Gửi bình luận mới (tự động tạo thông báo cho tác giả bài viết).
- `DELETE /api/community/comments/:id`: Xóa bình luận (tác giả bình luận hoặc Admin/Owner).
- `POST /api/community/posts/:id/vote`: Bầu chọn cho poll (ngăn chặn vote trùng lặp).

### Thảo luận (Discussions)
- `GET /api/community/discussions`: Danh sách cuộc thảo luận (hỗ trợ lọc `?tag=` và tìm kiếm `?q=`).
- `GET /api/community/discussions/:id`: Chi tiết thảo luận kèm đầy đủ các câu trả lời.
- `POST /api/community/discussions`: Tạo cuộc thảo luận mới (tiêu đề, nội dung, phân loại tag).
- `POST /api/community/discussions/:id/replies`: Gửi câu trả lời phản hồi thảo luận.
- `DELETE /api/community/discussions/replies/:replyId`: Xóa câu trả lời (tác giả hoặc Admin/Owner).
- `DELETE /api/community/discussions/:id`: Xóa thảo luận (tác giả hoặc Admin/Owner).

### Nhóm (Groups)
- `GET /api/community/groups`: Danh sách nhóm cộng đồng kèm số lượng thành viên và trạng thái tham gia của tôi.
- `GET /api/community/groups/:id`: Chi tiết nhóm và danh sách thành viên.
- `POST /api/community/groups`: Tạo nhóm mới (chỉ Admin/Owner/Staff).
- `POST /api/community/groups/:id/join`: Tham gia nhóm.
- `POST /api/community/groups/:id/leave`: Rời nhóm.

### Bảng xếp hạng (Leaderboard) & Xu hướng (Trending)
- `GET /api/community/leaderboard?range=week|month|all`: Bảng xếp hạng thành viên tính theo công thức: $\text{Điểm} = \text{Bài viết} \times 3 + \text{Bình luận} \times 2 + \text{Like nhận được} \times 1$.
- `GET /api/community/trending`: Top 5 hashtag/chủ đề nổi bật nhất.
- `GET /api/community/top-contributors`: Top 5 thành viên đóng góp nhiều nhất.

### Thông báo & Tìm kiếm
- `GET /api/community/notifications`: Lấy danh sách thông báo và số lượng thông báo chưa đọc.
- `POST /api/community/notifications/read-all`: Đánh dấu tất cả thông báo là đã đọc.
- `POST /api/community/notifications/:id/read`: Đánh dấu một thông báo cụ thể là đã đọc.
- `GET /api/community/search?q=...`: Tìm kiếm phân loại đồng thời cả 4 nhóm: **Members**, **Groups**, **Discussions**, **Topics**.

---

## 5. Kiến Trúc Bảo Mật & Ràng Buộc Kỹ Thuật

- **Chống XSS Tuyệt Đối**: 100% dữ liệu do người dùng nhập được render thông qua `textContent`, `document.createTextNode` hoặc các hàm DOM an toàn (`makeElement`). Không sử dụng `innerHTML` với dữ liệu người dùng.
- **Chống SQL Injection**: 100% các câu truy vấn MySQL được tham số hóa bằng dấu chấm hỏi (`?`), hoàn toàn không nối chuỗi dữ liệu đầu vào.
- **Xác Thực & Phân Quyền**:
  - Danh tính người dùng (`req.user.id`, `role`) luôn được giải mã từ JWT token ở backend, không tin cậy dữ liệu client gửi lên.
  - Middleware `canWriteCommunity` chặn hoàn toàn các tài khoản có trạng thái `banned` hoặc `pending`.
  - Thành viên thường bị chặn khi cố gắng can thiệp (sửa/xóa) tài nguyên của người khác hoặc tạo nhóm.
- **Kiểm Tra Đầu Vào (Validation)**:
  - Giới hạn độ dài nội dung bài viết (tối đa 2.000 ký tự), bình luận (500 ký tự), thảo luận (5.000 ký tự).
  - Multer kiểm tra MIME type ảnh và chặn tệp vượt quá 5MB.

---

## 6. Module Thư Viện Tài Liệu Học Tập (Resources Module)

Module **Resources** (`/pages/lectures/resources.html`, `/js/resources.js`, `/css/resources.css`) được xây dựng hoàn chỉnh end-to-end kết nối trực tiếp với MySQL và lưu trữ file thật trên máy chủ Node.js/Express:

### Lưu Trữ & An Toàn Tệp Tin
- **Kho lưu trữ cách ly**: Tệp tin tải lên được lưu tại thư mục riêng `backend/storage/resources/` (nằm ngoài vùng truy cập tĩnh của `express.static`). Người dùng không thể tải trực tiếp file bằng đường dẫn URL tĩnh.
- **Tên lưu ngẫu nhiên (Crypto)**: Tên tệp vật lý được tạo bằng chuỗi ngẫu nhiên `crypto.randomBytes(16)` + timestamp + đuôi mở rộng, ngăn chặn 100% tấn công ghi đè và Path Traversal. Tên gốc của người dùng được lưu an toàn trong cột `original_name`.
- **Giới hạn dung lượng**: Tối đa **20 MB** cho mỗi tệp tin (kiểm tra cả client-side lẫn backend qua Multer `LIMIT_FILE_SIZE`).
- **Whitelist định dạng cho phép**: `.pdf`, `.doc`, `.docx`, `.ppt`, `.pptx`, `.xls`, `.xlsx`, `.csv`, `.zip`, `.py`, `.ipynb`, `.txt`, `.md`. Chặn toàn bộ các định dạng thực thi hoặc nguy hiểm (`exe`, `sh`, `bat`, `js`, `html`, `php`, `svg`...).
- **Kiểm tra chữ ký số (Magic Bytes)**:
  - PDF: Kiểm tra 4 bytes đầu bắt buộc là `%PDF` (`0x25 0x50 0x44 0x46`).
  - DOCX / XLSX / PPTX / ZIP: Kiểm tra 2 bytes đầu là `PK` (`0x50 0x4B`).
  - DOC / XLS / PPT: Kiểm tra 4 bytes đầu là `D0 CF 11 E0`.
  - CSV / TXT / MD / PY / IPYNB: Đọc 512 bytes đầu, chặn toàn bộ file chứa byte `0x00` (NUL byte).
  - File giả mạo định dạng sẽ lập tức bị xóa khỏi đĩa và trả về mã lỗi HTTP `400 Bad Request`.

### Danh Sách RESTful API Endpoints (`/api/resources`)
Mọi route đều yêu cầu xác thực JWT qua header `Authorization: Bearer <token>`. Tài khoản có trạng thái `banned` hoặc `pending` bị từ chối truy cập (403).

- `GET /api/resources`: Lấy danh sách tài liệu (hỗ trợ phân trang `page`, `limit`; tìm kiếm `q`; lọc theo loại `type`, môn học `subject`, đuôi `extension`; sắp xếp `sort=newest|oldest|name|size`). Trả về kèm trạng thái `favoritedByMe` của người gọi API.
- `POST /api/resources`: Tải lên tài liệu mới (xử lý qua Multer multipart, tự động trích xuất metadata và lưu CSDL).
- `GET /api/resources/stats`: Thống kê số lượng tài liệu theo 4 danh mục (`document`, `code`, `template`, `dataset`) và danh sách môn học phục vụ bộ lọc sidebar.
- `GET /api/resources/recent?limit=4`: Lấy danh sách các tài liệu mới tải lên gần đây cho widget Recent uploads.
- `GET /api/resources/favorites`: Lấy danh sách tất cả tài liệu mà người dùng hiện tại đã đánh dấu yêu thích (đồng bộ với trang `/pages/favorites.html`).
- `GET /api/resources/:id`: Lấy thông tin chi tiết một tài liệu kèm danh sách tối đa 4 tài liệu liên quan cùng môn/loại.
- `GET /api/resources/:id/preview`: Xem trước tài liệu:
  - File PDF: Trả về inline stream `Content-Type: application/pdf`.
  - File Code/Text/CSV: Trả về nội dung văn bản tối đa 5KB / 20 dòng đầu với `Content-Type: text/plain; charset=utf-8`.
  - Các định dạng khác: Trả về JSON `{ previewable: false }`.
- `GET /api/resources/:id/download`: Tải file an toàn về máy tính với tên gốc được sanitize sạch, tự động tăng bộ đếm lượt tải `downloads` trong MySQL.
- `PUT /api/resources/:id`: Chỉnh sửa tiêu đề, môn học, phân loại, mô tả tài liệu. **Phân quyền nghiêm ngặt**: Chỉ người tải lên tài liệu (`user_id`) hoặc người dùng có vai trò `admin`/`owner` mới có quyền chỉnh sửa (trả về 403 nếu vi phạm).
- `DELETE /api/resources/:id`: Xóa vĩnh viễn tài liệu khỏi cơ sở dữ liệu MySQL và tự động xóa file vật lý trên đĩa máy chủ. **Phân quyền nghiêm ngặt**: Chỉ uploader hoặc `admin`/`owner` mới được phép xóa.
- `POST /api/resources/:id/favorite`: Bật/tắt trạng thái yêu thích (Toggle Favorite) cho tài liệu tương ứng với người dùng hiện tại.

### Kiểm Thử Tự Động (Automated Testing)
- Chạy kiểm thử API và bảo mật tệp tin:
  ```bash
  node backend/test_resources_api.js
  ```
  *(22/22 kịch bản pass: upload hợp lệ, chặn 20MB, chặn file cấm, chặn sai magic bytes, kiểm tra static security...)*
- Chạy kiểm thử tính năng đầy đủ (Phân quyền, Favorite, Preview, Xóa file):
  ```bash
  node backend/test_phase4.js
  ```
  *(18/18 kịch bản pass: uploader/admin/owner permissions, 403 authorization, toggle favorite, sync favorites, preview PDF/Code, file disk removal).*

