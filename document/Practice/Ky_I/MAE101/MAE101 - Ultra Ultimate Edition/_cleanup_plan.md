# KẾ HOẠCH DỌN DẸP VÀ RÀ SOÁT TÀI NGUYÊN ẢNH (_cleanup_plan.md)

> **TRẠNG THÁI HIỆN TẠI**: KHẢO SÁT & LẬP DANH MỤC AN TOÀN.  
> **QUY TẮC BẤT DI BẤT DỊCH**: **TUYỆT ĐỐI KHÔNG ĐỤNG** ảnh câu hỏi gốc và hình vẽ phụ của đề cho tới khi người dùng tuyên bố rõ ràng dữ liệu v2 đã duyệt xong; sau đó mới xem xét theo yêu cầu riêng. Chưa có bất kỳ file ảnh nào bị di chuyển hay xóa bỏ.

---

## 1. Tổng quan kiểm tra toàn bộ kho tài nguyên ảnh

| Hạng mục rà soát | Số lượng | Dung lượng | Ghi chú an toàn |
| :--- | :--- | :--- | :--- |
| **Tổng số ảnh quét được** | **1.135** file | ~36.2 MB | Toàn bộ nằm trong `assets/questions/` |
| **Ảnh hỏng / 0 byte** | **0** file | 0 B | Tất cả ảnh đều đọc được, nguyên vẹn |
| **Nhóm trùng SHA-256** | **0** nhóm | 0 B | 1.135 file có 1.135 hash SHA-256 duy nhất |
| **Ảnh do agent sinh (test/screenshot)** | **0** file | 0 B | Không có ảnh rác phát sinh |
| **Cặp định dạng `.png` & `.webp`** | **3** cặp (6 file) | 176.6 KB | Đã mở xem trực quan từng cặp (xem mục 2) |
| **Ảnh không có ai tham chiếu** | **4** file | 97.1 KB | Chứa các câu hỏi toán thật MAE101 bị sót (xem mục 3) |
| **Ảnh dung lượng lớn (>100KB)** | **4** file | 808.6 KB | Chỉ liệt kê, không dọn (xem mục 4) |

---

## 2. Chi tiết 3 cặp ảnh `.png` / `.webp` (Đã mở xem trực quan)

| ID | File `.png` (Trạng thái trong `questions.js`) | File `.webp` (Không được trỏ trong `questions.js`) | Kết quả đối chiếu thị giác (Visual Inspection) | Đề xuất phân nhóm |
| :---: | :--- | :--- | :--- | :--- |
| **247** | `0247_q247_Question_247.png`<br>(33.2 KB, **Có trỏ**) | `0247_q247_Question_247.webp`<br>(19.6 KB, **Không trỏ**) | • `.png`: Đề toán Giải tích MAE101 (Diện tích giới hạn bởi \(y = 3/x, x=1, x=e\)).<br>• `.webp`: Câu hỏi lưu đồ thuật toán lập trình ("What is the output of the following flowchart?"), lạc đề từ môn khác. | • Giữ `.png` (**Nhóm C**).<br>• `.webp` đưa vào **Nhóm B** (chờ cách ly). |
| **306** | `0306_q306_Question_306.png`<br>(35.4 KB, **Có trỏ nhầm**) | `0306_q306_Question_306.webp`<br>(24.8 KB, **Không trỏ**) | • `.png`: Câu hỏi môn CSD201 Cấu trúc dữ liệu ("Bucket hashing can be used for...").<br>• `.webp`: **ĐỀ TOÁN MAE101 THẬT** tính tích phân \(\int_0^2 f(x)dx\) bằng đồ thị! | • **TUYỆT ĐỐI GIỮ `.webp`** (**Nhóm C**).<br>• Sửa v2 trỏ đúng vào `.webp`. |
| **410** | `0410_q410_Question_410.png`<br>(38.1 KB, **Có trỏ nhầm**) | `0410_q410_Question_410.webp`<br>(25.4 KB, **Không trỏ**) | • `.png`: Câu hỏi môn CSD201 Cấu trúc dữ liệu ("Which of the following statements about binary search is true?").<br>• `.webp`: **ĐỀ TOÁN MAE101 THẬT** tìm giới hạn \(\lim_{x \to 3} f(x)\) từ đồ thị hàm số! | • **TUYỆT ĐỐI GIỮ `.webp`** (**Nhóm C**).<br>• Sửa v2 trỏ đúng vào `.webp`. |

---

## 3. Danh sách ảnh không ai tham chiếu & Phát hiện quan trọng

| Tên file | Kích thước | Nội dung sau khi mở xem | Phân loại & Quyết định |
| :--- | :---: | :--- | :--- |
| `assets/questions/0247_q247_Question_247.webp` | 19.6 KB | Sơ đồ khối lập trình không thuộc MAE101 | **Nhóm B** (Ứng viên cách ly) |
| `assets/questions/0306_q306_Question_306.webp` | 24.8 KB | Đề tích phân hình vẽ MAE101 thật (thay cho ảnh CSD201) | **Nhóm C** (GIỮ NGUYÊN & CẬP NHẬT V2) |
| `assets/questions/0410_q410_Question_410.webp` | 25.4 KB | Đề giới hạn hình vẽ MAE101 thật (thay cho ảnh CSD201) | **Nhóm C** (GIỮ NGUYÊN & CẬP NHẬT V2) |
| `assets/questions/0455_q455_Question_455.png` | 27.3 KB | Đề tích phân MAE101 thật (thay cho `0001_q455...` AI Perceptron) | **Nhóm C** (GIỮ NGUYÊN & CẬP NHẬT V2) |

> [!CRITICAL]
> **PHÁT HIỆN ĐẶC BIỆT NGUY HIỂM NẾU DỌN TỰ ĐỘNG:**
> 3 trong số 4 file "không được tham chiếu" (`0306...webp`, `0410...webp`, `0455...png`) thực chất chính là **ĐỀ TOÁN MAE101 CHÍNH XÁC** bị bỏ quên trong khi bản `.png` đang dùng trong `questions.js` lại trỏ nhầm sang môn Cấu trúc dữ liệu (CSD201) và Trí tuệ nhân tạo!  
> Nếu xóa các file này theo cách thông thường, dữ liệu gốc MAE101 sẽ bị mất vĩnh viễn. Nhờ cơ chế soi ảnh trực quan, toàn bộ 3 file quý giá này đã được bảo toàn trong **Nhóm C**.

---

## 4. Danh sách ảnh dung lượng lớn (>100KB) - Giữ nguyên, không nén lúc này

| STT | Tên file | Kích thước | Ghi chú nội dung |
| :---: | :--- | :---: | :--- |
| 1 | `assets/questions/0595_q595_Question_595.png` | 307.04 KB | Đề câu hỏi bảng số liệu / đồ thị |
| 2 | `assets/questions/0131_q131_Question_131.png` | 208.42 KB | Đồ thị hàm vận tốc / gia tốc |
| 3 | `assets/questions/0254_q254_Question_254.png` | 154.74 KB | Đồ thị hàm số tích phân |
| 4 | `assets/questions/0112_q112_Question_112.png` | 138.39 KB | Đồ thị đạo hàm chuyển động |

---

## 5. Phân nhóm tổng thể (Cleanup Grouping)

### **Nhóm A: An toàn dọn ngay (0 file - 0 KB)**
- Ảnh hỏng / 0 byte: 0.
- Ảnh agent sinh / screenshot: 0.
- Ảnh trùng hash không dùng: 0.
- **Dung lượng giải phóng: 0 KB.**

### **Nhóm B: Ứng viên cách ly cần người dùng duyệt (1 file - 19.6 KB)**
- `assets/questions/0247_q247_Question_247.webp` (Ảnh lưu đồ thuật toán lập trình, không liên quan MAE101).
- **Dung lượng thu hồi tiềm năng: 19.6 KB.**

### **Nhóm C: BẮT BUỘC GIỮ LẠI (1.134 file - ~36.2 MB)**
- 1.131 file ảnh câu hỏi gốc đang phục vụ app và chế độ so sánh đối chiếu.
- 3 file ảnh cứu hộ toán học: `0306...webp`, `0410...webp`, `0455...png`.
- Toàn bộ ảnh giữ nguyên vị trí, không di chuyển vào thư mục cách ly.

---

## 6. Quy trình tiếp theo khi thực hiện Bước 2 (Cách ly) & Bước 3 (Xóa vĩnh viễn)
1. **Bước 2 (Chỉ chạy khi người dùng yêu cầu chuyển vào `_cleanup_quarantine/`)**:
   - Chỉ chuyển duy nhất file Nhóm B (`0247_q247_Question_247.webp`) vào `_cleanup_quarantine/<timestamp>/`.
   - Mở app kiểm tra ngẫu nhiên 30 câu hỏi đảm bảo không có mã 404 hình ảnh.
2. **Bước 3 (Chỉ chạy khi người dùng nhắn đúng cụm từ "xóa vĩnh viễn")**:
   - In danh sách các mục trong `_cleanup_quarantine/`.
   - Hỏi lại một lần để người dùng xác nhận bằng cụm "đồng ý xóa".
   - Chỉ xóa thư mục cách ly, báo cáo dung lượng đã giải phóng.
