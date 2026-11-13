# BẢNG KIỂM THỬ NHANH THỦ CÔNG BẢN 2 (SMOKE CHECKLIST v2.1)

> **Mục đích:** Hướng dẫn kiểm thử viên chạy xác nhận nhanh toàn bộ các luồng nghiệp vụ cốt lõi và các chốt chặn an ninh đã vá trên trình duyệt thật.  
> **Thời gian dự kiến:** 20 – 25 phút.  
> **Điều kiện tiên quyết:**  
> 1. MariaDB (XAMPP) đang chạy trên cổng `3306` (CSDL `95_ai_lib_database`).  
> 2. Backend Express đang chạy trên cổng `3000` (`node backend/server.js`).  
> 3. Trình duyệt hiện đại (Chrome, Edge hoặc Firefox).

---

## BẢNG 30 BƯỚC KIỂM THỬ NHANH (SMOKE TEST STEPS)

| STT | Phân hệ / Tính năng | Thao tác thực hiện | Kết quả kỳ vọng | Kết quả thực tế | Đánh giá |
| :---: | :--- | :--- | :--- | :--- | :---: |
| 1 | **Khởi động hệ thống** | Mở trình duyệt, truy cập `http://localhost:3000/` | Trang chủ hiển thị Topbar, Banner, Danh sách môn học; không có lỗi đỏ trong Console (F12). | Trang chủ nạp mượt mà, assets HTTP 200. | [ ] Pass<br>[ ] Fail |
| 2 | **Chặn thư mục nhạy cảm** | Truy cập trực tiếp URL: `http://localhost:3000/backend/server.js` | Trả về mã lỗi **HTTP 404** (hoặc chuyển hướng an toàn); không tải/đọc được mã nguồn file server. | Đã chặn qua static whitelist. | [ ] Pass<br>[ ] Fail |
| 3 | **Đăng ký tài khoản mới** | Truy cập `/pages/auth/signup.html`, nhập username `[TEST]_user1`, mật khẩu `Pass123456` | Hiển thị thông báo đăng ký thành công, tự động chuyển hướng hoặc sẵn sàng đăng nhập. | Đăng ký thành công HTTP 201. | [ ] Pass<br>[ ] Fail |
| 4 | **Đăng nhập người dùng** | Truy cập `/pages/auth/login.html`, nhập tài khoản vừa tạo | Đăng nhập thành công, lưu token vào `localStorage`, chuyển về trang chủ và hiển thị tên người dùng trên Topbar. | Token JWT hợp lệ, Topbar cập nhật. | [ ] Pass<br>[ ] Fail |
| 5 | **Đăng xuất an toàn** | Bấm vào Avatar góc trên bên phải Topbar, chọn **Đăng xuất (Logout)** | Xoá sạch JWT token khỏi `localStorage`, giao diện Topbar trở lại trạng thái Khách (Guest). | Đăng xuất sạch sẽ, không còn token. | [ ] Pass<br>[ ] Fail |
| 6 | **Đăng nhập Member có sẵn** | Đăng nhập tài khoản mẫu: `member1` / `Password123` | Đăng nhập thành công, nạp thông tin vai trò Member đầy đủ. | Đăng nhập thành công HTTP 200. | [ ] Pass<br>[ ] Fail |
| 7 | **Cập nhật hồ sơ cá nhân** | Vào `/pages/settings.html`, đổi Họ và tên thành `Member One Updated`, bấm **Save Changes** | Thông báo lưu thành công (Toast xanh); tên mới lập tức cập nhật trên Topbar và menu người dùng. | Cập nhật hồ sơ thành công HTTP 200. | [ ] Pass<br>[ ] Fail |
| 8 | **Đổi mật khẩu người dùng** | Trong `/pages/settings.html`, tab Security, nhập sai mật khẩu cũ và bấm đổi | Hệ thống từ chối đổi mật khẩu, báo lỗi "Mật khẩu hiện tại không chính xác" (HTTP 401). | Không đổi nếu sai mật khẩu cũ. | [ ] Pass<br>[ ] Fail |
| 9 | **Xoá tài khoản có mật khẩu** | Trong tab Security, bấm nút "Xóa tài khoản" | Hộp thoại yêu cầu nhập mật khẩu xác nhận hiện ra; không thể xóa tài khoản nếu bỏ trống mật khẩu. | Chặn xoá tài khoản rỗng mật khẩu. | [ ] Pass<br>[ ] Fail |
| 10 | **Xem danh mục bài giảng** | Điều hướng tới `/pages/lms/lectures.html` | Hiển thị đầy đủ danh sách bài giảng phân theo chủ đề; thanh tìm kiếm và bộ lọc hoạt động mượt mà. | Nạp danh sách bài giảng HTTP 200. | [ ] Pass<br>[ ] Fail |
| 11 | **Phát video bài giảng (Range 206)** | Mở một bài giảng có video máy chủ nội bộ (ví dụ bài giảng CSD203) | Trình phát video phát mượt, người dùng có thể tua thanh thời gian tiến/lùi (mạng trả về HTTP 206 Partial Content). | Video streaming HTTP 206 chuẩn xác. | [ ] Pass<br>[ ] Fail |
| 12 | **Bài giảng YouTube nhúng** | Mở một bài giảng sử dụng video YouTube (ví dụ bài giảng AI) | Trình phát nhúng YouTube hiển thị khung xem và phát bình thường, không bị chặn liên kết nhúng. | YouTube embed phát bình thường. | [ ] Pass<br>[ ] Fail |
| 13 | **Gửi bình luận bài giảng** | Nhập nội dung thảo luận dưới bài giảng và bấm **Gửi bình luận** | Bình luận xuất hiện ngay lập tức trong danh sách bình luận kèm avatar và thời gian thực. | Gửi bình luận thành công HTTP 201. | [ ] Pass<br>[ ] Fail |
| 14 | **Chống XSS trong bình luận** | Gửi bình luận chứa mã script: `<script>alert(1)</script><b>Test</b>` | Trình duyệt hiển thị nguyên văn dạng chuỗi văn bản thuần, tuyệt đối không xuất hiện hộp thoại `alert(1)`. | Thoát mã HTML an toàn (Sanitized). | [ ] Pass<br>[ ] Fail |
| 15 | **Trang danh sách môn Practice** | Điều hướng tới `/pages/practice/practice.html` | Hiển thị đủ các môn học: DBI202, PRF192, CEA201, CSD203 và 2 môn toán MAD101, MAE101. | Đủ môn học, không lỗi Console. | [ ] Pass<br>[ ] Fail |
| 16 | **Kiểm tra câu hỏi DBI202 khôi phục** | Chọn môn **DBI202**, mở Quiz 101 hoặc Quiz 104 | Các câu hỏi (kể cả câu 5075-5079, 5350-5550) hiển thị đầy đủ đề bài và 4 phương án trả lời, không bị rỗng đáp án. | 13 câu khôi phục hiển thị chuẩn xác. | [ ] Pass<br>[ ] Fail |
| 17 | **Hiển thị công thức Toán (MathJax)** | Chọn môn **MAD101** hoặc **MAE101**, mở một bài trắc nghiệm bất kỳ | Toàn bộ ký hiệu logic, ma trận, cận tích phân hiển thị chuẩn định dạng đồ hoạ MathJax, không lộ mã LaTeX thô `\(...\)`. | Công thức toán kết xuất đẹp mắt. | [ ] Pass<br>[ ] Fail |
| 18 | **Thực hiện làm bài thi trắc nghiệm** | Chọn đáp án cho các câu hỏi, bấm nút **Nộp bài (Submit Quiz)** | Hệ thống tính điểm tức thì, chuyển hướng sang trang kết quả `/pages/practice/practice-result.html`. | Tính điểm và nộp bài hoàn tất. | [ ] Pass<br>[ ] Fail |
| 19 | **Trang kết quả & Lời giải chi tiết** | Xem trang kết quả vừa nộp | Hiển thị điểm số, tỷ lệ phần trăm, danh sách từng câu đúng/sai kèm khung Lời giải chi tiết (Explanation). | Kết quả và giải thích rõ ràng. | [ ] Pass<br>[ ] Fail |
| 20 | **Lịch sử làm bài (History)** | Vào menu cá nhân -> `/pages/history.html` | Lượt làm bài vừa nộp xuất hiện ở dòng đầu tiên của bảng lịch sử với đầy đủ tên môn, điểm và thời gian. | Lịch sử cập nhật tức thì. | [ ] Pass<br>[ ] Fail |
| 21 | **Đánh dấu mục Yêu thích (Favorites)** | Bấm icon Trái tim/Bookmark tại 1 bài giảng, sau đó vào `/pages/favorites.html` | Bài giảng vừa đánh dấu xuất hiện trong danh mục Yêu thích; bấm bỏ yêu thích thì mục lập tức biến mất. | Đồng bộ mục yêu thích chuẩn xác. | [ ] Pass<br>[ ] Fail |
| 22 | **Trang Cộng đồng (Community)** | Điều hướng tới `/pages/community.html` | Hiển thị danh sách các bài viết thảo luận cộng đồng; avatar và hình ảnh đính kèm hiển thị đầy đủ. | Nạp bài viết cộng đồng HTTP 200. | [ ] Pass<br>[ ] Fail |
| 23 | **Đăng bài viết kèm ảnh** | Nhập tiêu đề, nội dung và chọn 1 file ảnh hợp lệ (.png/.jpg) tải lên | Bài viết mới xuất hiện trên đầu bảng tin; hình ảnh tải lên nạp thành công qua URL `/document/uploads/community/...`. | Đăng bài kèm ảnh thành công. | [ ] Pass<br>[ ] Fail |
| 24 | **Tương tác Thích & Bình luận bài viết** | Bấm nút **Thích (Like)** và viết 1 bình luận ngắn vào bài viết | Số lượt thích tăng lên 1; bình luận hiển thị ngay dưới bài viết mà không cần tải lại trang. | Tương tác bài viết mượt mà. | [ ] Pass<br>[ ] Fail |
| 25 | **Tải tài liệu học tập (Resources)** | Điều hướng tới `/pages/resources.html`, bấm nút **Download** tại 1 tài liệu | Trình duyệt tải xuống file qua API `/api/resources/:id/download`; file tải về nguyên vẹn dung lượng. | Tải tài liệu qua API có token hợp lệ. | [ ] Pass<br>[ ] Fail |
| 26 | **Chặn truy cập trực tiếp kho tài liệu** | Nhập URL `/backend/storage/resources/sample.pdf` trực tiếp lên thanh địa chỉ | Máy chủ trả về **HTTP 404 Not Found**, tuyệt đối không cho phép bypass API để tải trực tiếp từ đĩa cứng. | Kho lưu trữ tài liệu được bảo vệ. | [ ] Pass<br>[ ] Fail |
| 27 | **Đăng nhập quản trị viên (Admin)** | Đăng xuất, sau đó đăng nhập tài khoản: `admin` / `Password123` | Đăng nhập thành công, Topbar xuất hiện nút truy cập **Admin Dashboard**. | Phân quyền Admin nhận diện đúng. | [ ] Pass<br>[ ] Fail |
| 28 | **Quản lý người dùng trong Admin Panel** | Vào `/pages/admin/users.html`, tìm tài khoản `[TEST]_user1` | Danh sách hiển thị người dùng tìm kiếm; bấm nút Khóa tài khoản (Ban) đổi trạng thái thành công. | Thao tác quản trị người dùng hiệu lực. | [ ] Pass<br>[ ] Fail |
| 29 | **Chặn thao tác phá hoại tài khoản Owner** | Thử thao tác Hạ quyền hoặc Xóa đối với tài khoản `owner` (ID=1) | Giao diện cảnh báo lỗi và máy chủ từ chối với mã **HTTP 403 Forbidden** ("Cannot modify owner account"). | Chốt chặn an toàn bảo vệ Owner. | [ ] Pass<br>[ ] Fail |
| 30 | **Chuyển đổi giao diện Sáng / Tối (Dark Mode)** | Bấm biểu tượng Mặt trời / Mặt trăng trên thanh Topbar | Giao diện toàn trang chuyển đổi ngay lập tức giữa chế độ Light và Dark mà không bị giật trang hay lỗi chữ. | Chuyển đổi theme mượt mà hoàn hảo. | [ ] Pass<br>[ ] Fail |

---

## KẾT QUẢ TỔNG QUAN ĐỢT KIỂM THỬ NHANH
- **Tổng số bước kiểm thử:** 30 bước
- **Số bước Đạt (Pass):** ...... / 30
- **Số bước Không đạt (Fail):** ...... / 30
- **Người thực hiện:** ............................................................
- **Thời gian hoàn thành:** ............................................................
- **Ghi chú / Phát hiện thêm:** ...................................................................................................................
