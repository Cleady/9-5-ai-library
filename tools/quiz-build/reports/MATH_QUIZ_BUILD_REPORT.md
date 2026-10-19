# BÁO CÁO XÂY DỰNG DỮ LIỆU QUIZ TOÁN (MATH QUIZ BUILD REPORT)

*Ngày sinh: 19/10/2026 | Công cụ: tools/quiz-build/build_math_quizzes.py*

## 1. Tổng quan số lượng câu hỏi và xử lý

| Chỉ số | MAD101 (Toán rời rạc) | MAE101 (Toán kỹ thuật) |
| :--- | :---: | :---: |
| **Số câu đầu vào (raw)** | 1131 | 1131 |
| **Trùng lặp chính xác (gộp)** | 1 | 10 |
| **Xung đột đáp án (loại)** | 4 | 41 |
| **Phụ thuộc hình vẽ bị thiếu (loại)** | 1 | 1 |
| **Số câu cuối cùng đưa vào Web** | **1125** | **1079** |
| **Số lượng Quiz / Chương** | **30 bài** | **30 bài** |
| **Dung lượng file JS sinh ra** | 1274.8 KB | 1173.4 KB |

## 2. Bảng cơ cấu Quiz và Chương của MAD101

| Quiz ID | Tên chương / Bài thi | Thời lượng | Số câu |
| :---: | :--- | :---: | :---: |
| 501 | Chương 1: Cơ sở Logic & Mệnh đề – Phần 1 | 90 phút | 45 câu |
| 502 | Chương 1: Cơ sở Logic & Mệnh đề – Phần 2 | 90 phút | 45 câu |
| 503 | Chương 1: Cơ sở Logic & Mệnh đề – Phần 3 | 90 phút | 45 câu |
| 504 | Chương 1: Cơ sở Logic & Mệnh đề – Phần 4 | 74 phút | 37 câu |
| 505 | Chương 2: Tập hợp, Hàm số & Dãy số – Phần 1 | 90 phút | 45 câu |
| 506 | Chương 2: Tập hợp, Hàm số & Dãy số – Phần 2 | 90 phút | 45 câu |
| 507 | Chương 2: Tập hợp, Hàm số & Dãy số – Phần 3 | 90 phút | 45 câu |
| 508 | Chương 2: Tập hợp, Hàm số & Dãy số – Phần 4 | 62 phút | 31 câu |
| 509 | Chương 3: Thuật toán & Độ phức tạp – Phần 1 | 90 phút | 45 câu |
| 510 | Chương 3: Thuật toán & Độ phức tạp – Phần 2 | 90 phút | 45 câu |
| 511 | Chương 3: Thuật toán & Độ phức tạp – Phần 3 | 90 phút | 45 câu |
| 512 | Chương 3: Thuật toán & Độ phức tạp – Phần 4 | 90 phút | 45 câu |
| 513 | Chương 3: Thuật toán & Độ phức tạp – Phần 5 | 24 phút | 12 câu |
| 514 | Chương 4: Lý thuyết số & Mật mã – Phần 1 | 90 phút | 45 câu |
| 515 | Chương 4: Lý thuyết số & Mật mã – Phần 2 | 64 phút | 32 câu |
| 516 | Chương 5: Quy nạp toán học & Đệ quy – Phần 1 | 90 phút | 45 câu |
| 517 | Chương 5: Quy nạp toán học & Đệ quy – Phần 2 | 90 phút | 45 câu |
| 518 | Chương 5: Quy nạp toán học & Đệ quy – Phần 3 | 24 phút | 12 câu |
| 519 | Chương 6: Đại số tổ hợp & Phép đếm | 92 phút | 46 câu |
| 520 | Chương 7: Lý thuyết Đồ thị – Phần 1 | 90 phút | 45 câu |
| 521 | Chương 7: Lý thuyết Đồ thị – Phần 2 | 90 phút | 45 câu |
| 522 | Chương 7: Lý thuyết Đồ thị – Phần 3 | 90 phút | 45 câu |
| 523 | Chương 7: Lý thuyết Đồ thị – Phần 4 | 62 phút | 31 câu |
| 524 | Chương 8: Cây (Trees) – Phần 1 | 90 phút | 45 câu |
| 525 | Chương 8: Cây (Trees) – Phần 2 | 90 phút | 45 câu |
| 526 | Chương 8: Cây (Trees) – Phần 3 | 90 phút | 45 câu |
| 527 | Chương 8: Cây (Trees) – Phần 4 | 15 phút | 1 câu |
| 528 | Chương 9: Quan hệ & Đại số Boole | 15 phút | 1 câu |
| 529 | Chương 10: Ôn tập tổng hợp Toán rời rạc – Phần 1 | 90 phút | 45 câu |
| 530 | Chương 10: Ôn tập tổng hợp Toán rời rạc – Phần 2 | 44 phút | 22 câu |

## 3. Bảng cơ cấu Quiz và Chương của MAE101

| Quiz ID | Tên chương / Bài thi | Thời lượng | Số câu |
| :---: | :--- | :---: | :---: |
| 601 | Chương 1: Ma trận & Các phép toán ma trận – Phần 1 | 90 phút | 45 câu |
| 602 | Chương 1: Ma trận & Các phép toán ma trận – Phần 2 | 90 phút | 45 câu |
| 603 | Chương 1: Ma trận & Các phép toán ma trận – Phần 3 | 90 phút | 45 câu |
| 604 | Chương 1: Ma trận & Các phép toán ma trận – Phần 4 | 90 phút | 45 câu |
| 605 | Chương 1: Ma trận & Các phép toán ma trận – Phần 5 | 15 phút | 1 câu |
| 606 | Chương 2: Định thức & Hệ phương trình tuyến tính – Phần 1 | 90 phút | 45 câu |
| 607 | Chương 2: Định thức & Hệ phương trình tuyến tính – Phần 2 | 90 phút | 45 câu |
| 608 | Chương 2: Định thức & Hệ phương trình tuyến tính – Phần 3 | 48 phút | 24 câu |
| 609 | Chương 3: Không gian Vector & Trực giao – Phần 1 | 90 phút | 45 câu |
| 610 | Chương 3: Không gian Vector & Trực giao – Phần 2 | 90 phút | 45 câu |
| 611 | Chương 3: Không gian Vector & Trực giao – Phần 3 | 15 phút | 7 câu |
| 612 | Chương 4: Trị riêng, Vector riêng & Chéo hóa | 64 phút | 32 câu |
| 613 | Chương 5: Vector & Hình học trong không gian – Phần 1 | 90 phút | 45 câu |
| 614 | Chương 5: Vector & Hình học trong không gian – Phần 2 | 90 phút | 45 câu |
| 615 | Chương 5: Vector & Hình học trong không gian – Phần 3 | 32 phút | 16 câu |
| 616 | Chương 6: Hàm số, Giới hạn & Tính liên tục – Phần 1 | 90 phút | 45 câu |
| 617 | Chương 6: Hàm số, Giới hạn & Tính liên tục – Phần 2 | 90 phút | 45 câu |
| 618 | Chương 6: Hàm số, Giới hạn & Tính liên tục – Phần 3 | 90 phút | 45 câu |
| 619 | Chương 6: Hàm số, Giới hạn & Tính liên tục – Phần 4 | 30 phút | 15 câu |
| 620 | Chương 7: Đạo hàm & Quy tắc tính đạo hàm – Phần 1 | 90 phút | 45 câu |
| 621 | Chương 7: Đạo hàm & Quy tắc tính đạo hàm – Phần 2 | 90 phút | 45 câu |
| 622 | Chương 7: Đạo hàm & Quy tắc tính đạo hàm – Phần 3 | 90 phút | 45 câu |
| 623 | Chương 7: Đạo hàm & Quy tắc tính đạo hàm – Phần 4 | 58 phút | 29 câu |
| 624 | Chương 8: Ứng dụng đạo hàm, Cực trị & Tối ưu | 96 phút | 48 câu |
| 625 | Chương 9: Tích phân & Kỹ thuật tính tích phân – Phần 1 | 90 phút | 45 câu |
| 626 | Chương 9: Tích phân & Kỹ thuật tính tích phân – Phần 2 | 90 phút | 45 câu |
| 627 | Chương 9: Tích phân & Kỹ thuật tính tích phân – Phần 3 | 90 phút | 45 câu |
| 628 | Chương 9: Tích phân & Kỹ thuật tính tích phân – Phần 4 | 58 phút | 29 câu |
| 629 | Chương 10: Ứng dụng tích phân & Phương trình vi phân | 40 phút | 20 câu |
| 630 | Chương 11: Ôn tập tổng hợp Toán kỹ thuật | 15 phút | 3 câu |

## 4. Kết quả kiểm tra đối chiếu (answers.txt & SymPy)

- **Đối chiếu đáp án MAD101 với `answers.txt`:**
  - Tổng số câu đã đối chiếu: 1115/1125
  - Khớp 100%: **1114 câu** (99.9%)
  - Lệch đáp án: 1 câu (đã liệt kê vào danh sách rà soát).
- **Kiểm tra ngữ nghĩa bằng SymPy:**
  - MAD101 (Hệ thức truy hồi): Kiểm tra 1 câu -> Khớp 1 câu.
  - MAE101 (Giới hạn / Định thức): Kiểm tra 0 câu -> Khớp 0 câu.

## 5. Danh sách câu hỏi bị loại khỏi Web Quiz

### a. MAD101 - Câu hỏi phụ thuộc hình hoặc lỗi hiển thị gốc:
- **ID 551:** Ảnh chụp gốc bị lỗi/thiếu - *Ảnh chụp gốc bị lỗi hiển thị từ hệ thống thi FUOverflow (chưa render đ...*

### b. MAE101 - Câu hỏi phụ thuộc hình vẽ:
- **ID 718:** Cần hình vẽ/đồ thị nhưng thiếu trong dữ liệu - *Which function is shown in the graph below?

(i) \(f(x) = \begin{cases...*

