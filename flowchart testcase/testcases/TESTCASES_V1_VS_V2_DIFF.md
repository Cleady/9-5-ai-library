# BÁO CÁO SO SÁNH VÀ KHÁC BIỆT TEST CASE (V1 VS V2 DIFF)

Thời gian tạo: 2026-10-22 20:42:30  
Phiên bản cơ sở: **v1.0.0** (290 test cases)  
Phiên bản cập nhật: **v2.0.0** (323 test cases)  
Tổng số test case mới thêm: **33**  
Tổng số test case sửa đổi / cập nhật: **15**  
Tổng số test case giữ nguyên: **275**  

---

## 1. Bảng Tổng Hợp Thay Đổi Theo Module (Sinh Tự Động Từ CSV)

| STT | Tên Module | Tổng v2 | Mới (New) | Cập nhật (Modified) | Giữ nguyên | P0 | P1 | P2 | P3 | Đã chạy Pass |
| :---: | :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| 1 | **A11Y** | 3 | 0 | 0 | 3 | 0 | 3 | 0 | 0 | 0 |
| 2 | **ADMIN** | 30 | 0 | 1 | 29 | 0 | 10 | 20 | 0 | 1 |
| 3 | **AUTH** | 20 | 0 | 2 | 18 | 7 | 8 | 5 | 0 | 0 |
| 4 | **COMMUNITY** | 40 | 0 | 0 | 40 | 0 | 15 | 25 | 0 | 0 |
| 5 | **COMPAT** | 5 | 3 | 0 | 2 | 0 | 2 | 3 | 0 | 3 |
| 6 | **DATA** | 7 | 2 | 1 | 4 | 2 | 2 | 3 | 0 | 3 |
| 7 | **HISTORY** | 4 | 4 | 0 | 0 | 0 | 2 | 2 | 0 | 4 |
| 8 | **HOME** | 20 | 4 | 0 | 16 | 0 | 11 | 9 | 0 | 4 |
| 9 | **LECTURES** | 8 | 0 | 0 | 8 | 0 | 0 | 8 | 0 | 0 |
| 10 | **LECTURES-YT** | 4 | 4 | 0 | 0 | 0 | 3 | 1 | 0 | 4 |
| 11 | **LMS** | 22 | 0 | 3 | 19 | 3 | 17 | 2 | 0 | 2 |
| 12 | **NOTIFICATIONS** | 20 | 0 | 0 | 20 | 0 | 5 | 15 | 0 | 0 |
| 13 | **PERF** | 2 | 0 | 0 | 2 | 0 | 2 | 0 | 0 | 0 |
| 14 | **PRACTICE** | 35 | 0 | 2 | 33 | 0 | 13 | 21 | 1 | 0 |
| 15 | **PRACTICE-MATH** | 4 | 4 | 0 | 0 | 1 | 2 | 1 | 0 | 4 |
| 16 | **RESOURCES** | 20 | 0 | 0 | 20 | 0 | 10 | 10 | 0 | 0 |
| 17 | **RESPONSIVE** | 3 | 0 | 0 | 3 | 0 | 3 | 0 | 0 | 0 |
| 18 | **ROLE** | 16 | 0 | 1 | 15 | 0 | 16 | 0 | 0 | 1 |
| 19 | **SECURITY** | 28 | 8 | 4 | 16 | 23 | 5 | 0 | 0 | 12 |
| 20 | **SETTINGS** | 24 | 0 | 1 | 23 | 0 | 6 | 18 | 0 | 1 |
| 21 | **THEME** | 8 | 4 | 0 | 4 | 0 | 5 | 2 | 1 | 4 |
| | **TỔNG CỘNG** | **323** | **33** | **15** | **275** | **36** | **140** | **145** | **2** | **43** |

> [!NOTE]
> **Xác nhận tính toàn vẹn số học:**
> - Tổng số ca theo dòng: `sum(Hàng) = 323` = Tổng cộng: `323`.
> - Tổng mức ưu tiên: `P0 (36) + P1 (140) + P2 (145) + P3 (2) = 323` = `323`.
> - Tỷ lệ P0: `11.1%` (Đạt tiêu chuẩn không vượt quá 15%).

---

## 2. Danh Sách Các Module Được Bổ Sung Mới Ở Bản v2

1. **HOME:** Bổ sung kịch bản hiển thị 6 môn học tiêu biểu, điều hướng liên kết 'View all subjects', tính toán thanh phần trăm tiến độ môn học, và kịch bản ngoại tuyến khi mất kết nối CDN.
2. **HISTORY:** Bổ sung các kịch bản xem lịch sử làm bài thi trắc nghiệm cá nhân, lọc bài làm theo môn học, xử lý trạng thái rỗng (empty state) và kiểm soát quyền truy cập trang lịch sử.
3. **THEME:** Bổ sung kiểm tra chuyển đổi Light/Dark mode tức thì, đổi 5 màu accent (Blue, Green, Purple, Orange, Red), điều chỉnh cỡ chữ (Font size) và tự động đồng bộ theo theme hệ điều hành.
4. **LECTURES-YT:** Bổ sung kịch bản tự động nhận diện và trích xuất ID YouTube, phát qua thẻ iframe nhúng, xử lý video bị chặn nhúng (Error 150) và ghi nhận mốc tiến độ hoàn thành 90%.
5. **PRACTICE-MATH:** Bổ sung kịch bản kết xuất ký hiệu toán KaTeX môn MAD101, ma trận và tích phân môn MAE101, bảo vệ ký tự `$` không bị hiểu nhầm trong môn lập trình, và nạp script toán đầy đủ tại intro.
6. **COMPAT:** Bổ sung kiểm thử tương thích đa trình duyệt (Google Chrome, Microsoft Edge, Mozilla Firefox).
7. **REGRESSION SUITE (TC-REG-001..010):** 10 kịch bản kiểm thử hồi quy độc lập cho các lỗi nghiêm trọng đã được vá (F-001, F-002, F-003, F-004, F-005, F-007, F-008, F-010, F-011, F-012).

---

## 3. Danh Mục Tính Năng Chưa Xây Dựng (PLANNED)

Các tính năng dưới đây chưa có mã nguồn backend/frontend hoàn thiện, được tách riêng khỏi bộ kịch bản kiểm thử chính thức để tránh nhầm lẫn:

- **[PLN-LMS-001] Nút khóa bài giảng thủ công theo quyền Giáo viên/Admin** (Dự kiến: v2.2): Cung cấp nút chuyển đổi trạng thái Khóa / Mở khóa độc lập trên từng bài giảng trong trang quản trị thay vì chỉ tự động theo tiến độ học tập.
- **[PLN-LMS-002] Đồng bộ tiến độ học tập bài giảng lên cơ sở dữ liệu MySQL theo tài khoản** (Dự kiến: v2.2): Chuyển đổi lưu trữ tiến độ từ máy khách (localStorage) sang bảng `user_lecture_progress` tại backend, hỗ trợ học tập đồng bộ trên nhiều thiết bị.
- **[PLN-AUTH-001] Dịch vụ gửi email khôi phục mật khẩu (SMTP / SendGrid)** (Dự kiến: v2.1): Tích hợp dịch vụ gửi email thực tế qua nodemailer và token khôi phục mật khẩu có thời hạn 15 phút.
