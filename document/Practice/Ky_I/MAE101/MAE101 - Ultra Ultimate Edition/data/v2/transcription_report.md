# Báo Cáo Tiến Độ Dự Án MAE101 - Ultra Ultimate Edition (V2)

## 1. Tổng quan thực hiện
Dự án nâng cấp ngân hàng câu hỏi môn **MAE101 (Calculus 1 & Linear Algebra 1)** của Đại học FPT từ hiển thị thuần ảnh sang **văn bản toán học chuẩn MathJax v3 (LaTeX)**, có đáp án đã kiểm chứng toán học, lời giải chi tiết từng bước bằng tiếng Việt, và hệ thống phân loại chương/chủ đề chuẩn xác.

---

## 2. Thống kê theo từng giai đoạn

### GIAI ĐOẠN 1: Khảo sát + Hạ tầng + Chạy thử 20 câu
- **Sao lưu an toàn**: Đã sao lưu 3 file gốc `questions.js`, `classified_data.json`, `ocr_results_full.json` vào `data/backup_original/`. Tuyệt đối không ghi đè dữ liệu gốc.
- **MathJax v3 cục bộ offline**: Tải gói vector độc lập `vendor/mathjax/tex-svg.js` (2.1 MB). Hoạt động offline 100%, không cần kết nối mạng.
- **Rà soát bất thường (Anomaly Audit)**: Xuất file [anomalies.json](file:///c:/Users/anhqu/Documents/FPTU%20-%20Artificial%20Intelligent/SOURCE/MAE101%20-%20Ultra%20Ultimate%20Edition/data/v2/anomalies.json):
  - 1.135 file ảnh trên đĩa, không có mã hash ảnh nào bị trùng.
  - **Câu 455**: Trong đề gốc trỏ vào `0001_q455_Question_455.png` (câu hỏi môn Trí tuệ nhân tạo/Perceptron). Đã tìm thấy ảnh toán MAE101 thực sự nằm sót trên đĩa là `0455_q455_Question_455.png` (bài toán tích phân).
  - **Câu 306**: Đề gốc là câu hỏi môn Cấu trúc dữ liệu (CSD201 - Bucket Hashing), không thuộc MAE101. Đã đánh dấu `needs_review: true`.
- **Script kiểm tra tự động**: [validate_latex.js](file:///c:/Users/anhqu/Documents/FPTU%20-%20Artificial%20Intelligent/SOURCE/MAE101%20-%20Ultra%20Ultimate%20Edition/scripts/validate_latex.js) dùng `mathjax-full` trong môi trường Node: kiểm tra cú pháp TeX, cân bằng ngoặc, cấm triệt để `$`, mô phỏng DOM để phát hiện rò rỉ mã thô.
- **Bộ 20 câu chạy thử**: [test_20.json](file:///c:/Users/anhqu/Documents/FPTU%20-%20Artificial%20Intelligent/SOURCE/MAE101%20-%20Ultra%20Ultimate%20Edition/data/v2/test_20.json) và [test_20.js](file:///c:/Users/anhqu/Documents/FPTU%20-%20Artificial%20Intelligent/SOURCE/MAE101%20-%20Ultra%20Ultimate%20Edition/data/v2/test_20.js) đạt **0 Lỗi, 0 Cảnh báo**.

---

### GIAI ĐOẠN 2 & 3: Chuyển ảnh → LaTeX & Lời giải chi tiết
- **Lô 1 (Batch 01: Câu 1 đến 40)**: [batch_01.json](file:///c:/Users/anhqu/Documents/FPTU%20-%20Artificial%20Intelligent/SOURCE/MAE101%20-%20Ultra%20Ultimate%20Edition/data/v2/batches/batch_01.json). Toàn bộ 40 câu đã được đọc trực tiếp từ ảnh gốc, kiểm chứng toán học bằng Sympy/đại số giải tích, và viết lời giải chi tiết 4-5 bước.
- **Tổng số câu V2 hoàn chỉnh**: **48 câu** (40 câu Batch 01 + các câu đại diện thuộc test_20).
- **Kết quả kiểm tra cú pháp**: `100% Passed` (0 syntax error, 0 unclosed braces).
- **Nhật ký bất đồng đáp án (Answer Conflicts)**: Lưu tại [answer_conflicts.json](file:///c:/Users/anhqu/Documents/FPTU%20-%20Artificial%20Intelligent/SOURCE/MAE101%20-%20Ultra%20Ultimate%20Edition/data/v2/answer_conflicts.json):
  - **Câu 31**: Đề bài \(f(x) = \sqrt[4]{x}\) trên \([0, 8]\). Giá trị lớn nhất toán học là \(\sqrt[4]{8} \approx 1.6818 \neq 2\). Các phương án A, B, C, D đều sai về số liệu. Đáp án chính xác toán học là **E (None of the other choices is correct)**. Ngân hàng gốc chọn **A** (người ra đề có thể nhầm căn bậc 3 của 8 hoặc khoảng \([0, 16]\)).
  - **Câu 131**: Đồ thị vị trí theo thời gian \(s(t)\), hỏi khi nào vật chuyển động chậm dần (slowing down). Độ lớn vận tốc giảm khi \(v(t) \cdot a(t) < 0\), tức trên \((0, 1) \cup (5, 6)\) (Đáp án **B**). Đề gốc chọn **E** (\((0, 2) \cup (5, 7)\)).

---

### GIAI ĐOẠN 4: Phân loại lại chương (Reclassification)
Lưu chi tiết tại [reclassification.json](file:///c:/Users/anhqu/Documents/FPTU%20-%20Artificial%20Intelligent/SOURCE/MAE101%20-%20Ultra%20Ultimate%20Edition/data/v2/reclassification.json).
- **Số câu được điều chỉnh**: 150 câu.
- **Điểm mấu chốt**:
  - Xóa bỏ hoàn toàn chương rác `PhuongTrinhViPhan` (23 câu): Trong MAE101 không có chương này; 23 câu này thực chất là hệ phương trình tuyến tính (chuyển sang `DSTT1/HePhuongTrinh`), đạo hàm/tiếp tuyến (chuyển sang `GT1/DaoHam`), và tích phân (chuyển sang `GT1/TichPhan`).
  - Tách các câu tính định thức từ `MaTran` sang đúng chủ đề `DinhThuc` (+23 câu).
  - Tách các phép biến đổi hình học (phản xạ, quay, chiếu) sang `AnhXaTuyenTinh` (+30 câu).
  - Tách các bài toán trị riêng, vector riêng sang `TriRieng` (+14 câu).
  - Tách bài toán giới hạn, tính liên tục bị nhầm trong `HamSo` sang `GioiHan` (+2 câu).
  - Tách bài toán cực trị, điểm uốn, tối ưu hóa sang `CucTri` (+7 câu).
  - Tách bài toán tích phân và diện tích dưới đồ thị sang `TichPhan` (+24 câu).

#### Bảng phân bố trước và sau phân loại lại:
| Chương / Chủ đề | Số câu cũ | Số câu mới (V2) | Biến động |
| :--- | :---: | :---: | :---: |
| **DSTT1 / MaTran** | 245 | 195 | -50 (chuyển sang đúng DinhThuc, HePhuongTrinh, AnhXaTuyenTinh) |
| **DSTT1 / DinhThuc** | 22 | 45 | +23 |
| **DSTT1 / HePhuongTrinh** | 38 | 50 | +12 |
| **DSTT1 / AnhXaTuyenTinh** | 15 | 45 | +30 |
| **DSTT1 / TriRieng** | 19 | 33 | +14 |
| **DSTT1 / KhongGianVector** | 75 | 75 | 0 |
| **DSTT1 / VectorHinhHoc** | 145 | 120 | -25 (chuyển sang TriRieng, AnhXaTuyenTinh) |
| **GT1 / HamSo** | 213 | 161 | -52 (chuyển sang DaoHam, CucTri, TichPhan, GioiHan) |
| **GT1 / GioiHan** | 113 | 115 | +2 |
| **GT1 / DaoHam** | 58 | 95 | +37 |
| **GT1 / CucTri** | 89 | 96 | +7 |
| **GT1 / TichPhan** | 47 | 71 | +24 |
| **GT1 / PhuongPhapSo** | 29 | 29 | 0 |
| **GT1 / PhuongTrinhViPhan** | 23 | 0 | -23 (xóa bỏ nhóm gán nhầm) |
| **Unknown (Chờ duyệt)** | 0 | 1 | +1 (Câu 306 - môn CSD201) |
| **Tổng cộng** | **1.131** | **1.131** | **Bảo toàn 100% số lượng câu hỏi** |

---

### GIAI ĐOẠN 5: Tích hợp Giao diện & Trải nghiệm người dùng
- **Tương thích ngược hoàn hảo (Zero breaking changes)**:
  - Tệp [questions_v2.js](file:///c:/Users/anhqu/Documents/FPTU%20-%20Artificial%20Intelligent/SOURCE/MAE101%20-%20Ultra%20Ultimate%20Edition/data/v2/questions_v2.js) chứa đủ 1.131 câu: câu nào có LaTeX thì hiển thị định dạng toán MathJax; câu nào chưa chuyển sang lô V2 thì tự động fallback hiển thị ảnh gốc mượt mà.
  - Thêm nút **📷 Xem ảnh gốc**: Cho phép người học đối chiếu hình ảnh gốc bất cứ lúc nào. Với câu có `needs_image: true`, ảnh gốc tự động hiển thị kèm dưới đề.
  - **Lựa chọn phong phú (Rich Options)**: Các câu có công thức trong phương án lựa chọn được render dạng khối trực quan kèm huy hiệu chữ cái A, B, C, D...
  - **Accordion giải thích chi tiết**: Sau khi bấm kiểm tra hoặc nộp bài, lời giải từng bước xuất hiện ngay bên dưới thông báo đúng/sai, có thể thu gọn/mở rộng.
  - **Trang xem thử mở rộng [preview_v2.html](file:///c:/Users/anhqu/Documents/FPTU%20-%20Artificial%20Intelligent/SOURCE/MAE101%20-%20Ultra%20Ultimate%20Edition/preview_v2.html)**: Có menu chuyển đổi giữa "Lô 1 (Câu 1-40)", "Bộ test mẫu 20 câu", và "Toàn bộ 48 câu V2".
  - **Offline PWA**: Cache ServiceWorker được nâng cấp lên `mae101-study-hub-v4`, lưu trữ toàn bộ các tệp V2 và MathJax cục bộ.

---

## 3. Các tệp đã tạo & chỉnh sửa

### Tệp mới tạo:
1. `data/backup_original/questions.js`, `classified_data.json`, `ocr_results_full.json` (bản sao lưu gốc an toàn).
2. `vendor/mathjax/tex-svg.js` (MathJax v3 vector bundle chạy offline).
3. `data/v2/anomalies.json` (báo cáo kiểm tra 1.135 ảnh, phát hiện Q455 và Q306).
4. `data/v2/answer_conflicts.json` (báo cáo bất đồng đáp án Q31, Q131).
5. `data/v2/progress.json` (theo dõi tiến độ từng lô).
6. `data/v2/reclassification.json` (chi tiết 150 câu được phân loại lại).
7. `data/v2/test_20.json` & `data/v2/test_20.js` (20 câu mẫu đa dạng).
8. `data/v2/batches/batch_01.json` (Lô 1: Câu 1 đến 40 hoàn chỉnh).
9. `data/v2/questions_v2.json` & `data/v2/questions_v2.js` (toàn bộ 1.131 câu tích hợp).
10. `preview_v2.html` (trang xem thử tương tác).
11. `scripts/validate_latex.js` (script kiểm tra cú pháp LaTeX tự động bằng Node MathJax).
12. `scripts/analyze_reclassification.js` (script phân loại chủ đề tự động).
13. `scripts/create_batch_01.js` & `scripts/build_v2_dataset.js` (script build dữ liệu V2).
14. `scripts/test_ui_render.js` (script kiểm tra tích hợp DOM & MathJax).

### Tệp đã chỉnh sửa:
1. `index.html`: Thêm MathJax v3 script tag, container đề LaTeX, accordion lời giải, liên kết script V2.
2. `app.js`: Tích hợp hàm `typesetMath()`, ưu tiên `MAE_QUESTIONS_V2`, xử lý hiển thị LaTeX, rich options, và toggle lời giải.
3. `styles.css`: Bổ sung CSS cho `.latex-stage`, `.answer-option.rich-option`, `.explanation-box`, `.confidence-badge`.
4. `sw.js`: Nâng cấp cache lên `mae101-study-hub-v4`, thêm các file V2 vào cache offline.
