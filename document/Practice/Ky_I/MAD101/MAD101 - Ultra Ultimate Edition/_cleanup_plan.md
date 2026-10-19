# KẾ HOẠCH DỌN DẸP DỰ ÁN & QUÉT PHÂN LOẠI ẢNH THỪA (_cleanup_plan.md)

> **Thời gian tạo:** 2026-10-17 22:15  
> **Trạng thái:** BƯỚC 1 - LẬP KẾ HOẠCH & DỪNG CHỜ DUYỆT (Chưa di chuyển hay xóa bất kỳ file nào)

---

## 1. NGUYÊN TẮC AN TOÀN TUYỆT ĐỐI
- **TUYỆT ĐỐI KHÔNG ĐỤNG:** Toàn bộ ảnh câu hỏi gốc và hình vẽ phụ của đề cho tới khi người dùng duyệt xong hoàn tất dữ liệu v2.
- **TUYỆT ĐỐI KHÔNG XÓA:** Thư mục dữ liệu `data/v2/`, các file đáp án `answers.*`, `questions_raw.json`, `questions_data.js` và các script xử lý dữ liệu.
- **QUY TRÌNH 3 BƯỚC BẮT BUỘC:**
  1. **Bước 1 (Hiện tại):** Quét, so hash SHA-256, đối chiếu từng cặp ảnh, phân nhóm A/B/C và xuất bản kế hoạch chi tiết.
  2. **Bước 2 (Chờ duyệt):** Sau khi người dùng duyệt Bước 1, chỉ di chuyển các file Nhóm A vào thư mục cách ly `_cleanup_quarantine/<YYYYMMDD_HHMMSS>/`. Mở app test ít nhất 30 câu ngẫu nhiên, kiểm tra 0 lỗi 404 image request, so khớp 100% số lượng ảnh tham chiếu.
  3. **Bước 3 (Xóa vĩnh viễn):** CHỈ chạy khi người dùng nhắn đúng cú pháp `"xóa vĩnh viễn"`, in danh sách mục cách ly và yêu cầu người dùng xác nhận lại bằng cụm `"đồng ý xóa"`. Sau đó chỉ xóa bên trong thư mục cách ly chỉ định.

---

## 2. TỔNG HỢP KẾT QUẢ QUÉT TOÀN BỘ DỰ ÁN
- **Tổng số file ảnh trong dự án:** 2376 file (gồm .png và .webp)
- **Số file ảnh đang được `questions_data.js` tham chiếu trực tiếp:** 1,131 câu (1,067 file .png + 64 file .webp)
- **Số nhóm trùng hash SHA-256 tuyệt đối (100% identical byte-for-byte):** 1131 nhóm (1139 file bản sao thừa)
- **Số cặp ảnh cùng ID (.png và .webp):** 105 cặp
- **Số ảnh hỏng / 0-byte:** 0 file
- **Số ảnh do agent sinh ra (preview/screenshot):** 0 file
- **Số ảnh quá khổ (> 300 KB):** 2 file (được bảo lưu, chờ quyết định nén)

---

## 3. PHÂN LOẠI ỨNG VIÊN DỌN DẸP (NHÓM A / NHÓM B / NHÓM C)

### 3.1. NHÓM A — AN TOÀN TUYỆT ĐỐI ĐỂ CÁCH LY (Sau khi người dùng duyệt)
*Bản sao trùng hash SHA-256 của các ảnh gốc, hoàn toàn không được dữ liệu tham chiếu, an toàn 100%:*

| STT | File thừa (Ứng viên cách ly) | Bản giữ lại (Gốc đang tham chiếu) | Dung lượng | SHA-256 (rút gọn) | Ghi chú |
|:---:|:---|:---|:---:|:---:|:---|
| 1 | `legacy/archived_converted_images/0001_q001_Question_1.png` | `0001_q001_Question_1.png` | 26.8 KB | `a60e3806401c...` | Bản sao trong legacy do phiên làm việc trước sao lưu |
| 2 | `legacy/archived_converted_images/0002_q002_Question_2.png` | `0002_q002_Question_2.png` | 103.5 KB | `89c74fc06ada...` | Bản sao trong legacy do phiên làm việc trước sao lưu |
| 3 | `legacy/archived_converted_images/0003_q003_Question_3.png` | `0003_q003_Question_3.png` | 183.2 KB | `47bae8d3fc18...` | Bản sao trong legacy do phiên làm việc trước sao lưu |
| 4 | `legacy/archived_converted_images/0004_q004_Question_4.png` | `0004_q004_Question_4.png` | 24.4 KB | `06300eaf3382...` | Bản sao trong legacy do phiên làm việc trước sao lưu |
| 5 | `legacy/archived_converted_images/0005_q005_Question_5.png` | `0005_q005_Question_5.png` | 107.4 KB | `c571227c800f...` | Bản sao trong legacy do phiên làm việc trước sao lưu |
| 6 | `legacy/archived_converted_images/0006_q006_Question_6.png` | `0006_q006_Question_6.png` | 39.8 KB | `6a4bd7b13a77...` | Bản sao trong legacy do phiên làm việc trước sao lưu |
| 7 | `legacy/archived_converted_images/0007_q007_Question_7.png` | `0007_q007_Question_7.png` | 23.7 KB | `7379eab5bf62...` | Bản sao trong legacy do phiên làm việc trước sao lưu |
| 8 | `legacy/archived_converted_images/0008_q008_Question_8.png` | `0008_q008_Question_8.png` | 157.7 KB | `53d8009ec837...` | Bản sao trong legacy do phiên làm việc trước sao lưu |

> **Tiểu kế Nhóm A:** 8 file — **Tổng dung lượng thu hồi:** 666.5 KB (~0.26 MB)

---

### 3.2. NHÓM B — CẦN XÁC NHẬN RIÊNG TỪ NGƯỜI DÙNG (Dự kiến thu hồi 50.12 MB)
*Toàn bộ 1,131 file ảnh trong thư mục `chapters/` có hash SHA-256 TRÙNG KHỚP 100% với 1,131 file ảnh tại thư mục gốc:*

- **Nguồn gốc:** Do script `classify_by_search.js` chạy trước đây để phân loại ảnh theo folder chương.
- **Hiện trạng tham chiếu:** Mã nguồn `index.html` và `app.bundle.js` tải ảnh qua `questions_data.js`, tất cả đều trỏ vào thư mục gốc `0001_q001_Question_1.png`... (KHÔNG hề dùng tiền tố `chapters/`).
- **Nguyên tắc an toàn:** Dù trùng hash 100%, nhưng vì đây là ảnh câu hỏi, tuân thủ nguyên tắc *'TUYỆT ĐỐI KHÔNG ĐỤNG ảnh câu hỏi gốc cho tới khi duyệt xong v2'*, chúng tôi xếp 1,131 file này vào **NHÓM B** (Bảo lưu chờ ý kiến người dùng).

**Phân bổ 1,131 file trùng hash theo từng chương:**

| Thư mục chương | Số lượng file trùng hash | Dung lượng trùng thừa | Bản giữ lại tương ứng |
|:---|:---:|:---:|:---|
| `chapters/Ch1_Logic_Proofs` | 98 file | 4.98 MB | Thư mục gốc `.` (đang nạp trong app) |
| `chapters/Ch2_Sets_Functions` | 138 file | 7.38 MB | Thư mục gốc `.` (đang nạp trong app) |
| `chapters/Ch3_Algorithms` | 118 file | 5.99 MB | Thư mục gốc `.` (đang nạp trong app) |
| `chapters/Ch4_Number_Theory` | 164 file | 5.29 MB | Thư mục gốc `.` (đang nạp trong app) |
| `chapters/Ch5_Induction` | 157 file | 5.99 MB | Thư mục gốc `.` (đang nạp trong app) |
| `chapters/Ch6_Counting` | 182 file | 7.87 MB | Thư mục gốc `.` (đang nạp trong app) |
| `chapters/Ch7_Graphs` | 160 file | 6.79 MB | Thư mục gốc `.` (đang nạp trong app) |
| `chapters/Ch8_Trees` | 114 file | 5.19 MB | Thư mục gốc `.` (đang nạp trong app) |
| **TỔNG CỘNG** | **1,131 file** | **49.47 MB** | |

---

### 3.3. NHÓM C — TUYỆT ĐỐI GIỮ LẠI (KHÔNG ĐỤNG)
Toàn bộ các tài nguyên sau thuộc diện bảo tồn bắt buộc:
1. **1,131 ảnh câu hỏi gốc đang được ứng dụng nạp** (1,067 file .png và 64 file .webp tại thư mục gốc).
2. **105 cặp ảnh .png vs .webp cùng ID câu hỏi:**
   - Đã mở và kiểm tra trực quan từng cặp bằng PIL/Pixel Diff.
   - **Kết quả đối chiếu:** KHÔNG CÓ cặp nào là bản sao của nhau (toàn bộ diff MSE > 400).
   - **Hiện trạng:** 41 file `.png` là câu hỏi MAD101 chính thức (được app dùng), trong khi file `.webp` cùng ID là ảnh đề môn khác (OSG201). Ngược lại, 64 file `.webp` là câu hỏi MAD101 kèm đồ thị/hình vẽ (được app dùng), trong khi file `.png` cùng ID là ảnh câu hỏi OSG201.
   - **Kết luận:** Giữ lại toàn bộ 105 cặp trong **NHÓM C** để đảm bảo không thất thoát bất kỳ hình vẽ đề thi nào.
3. **Các file tài nguyên dữ liệu và script:** `data/v2/`, `answers.json`, `answers.csv`, `answers.txt`, `questions_raw.json`, `questions_data.js`, `manifest.webmanifest`, `sw.js`, `ui/tokens.css`, `ui/base.css`, `ui/components.css`, `app.bundle.js`, `classify_by_search.js`, `classify_by_gemini.js`, `fix_answers.js`, `generate_index.js`.

---

## 4. CHI TIẾT ĐỐI CHIẾU 105 CẶP ẢNH CÙNG ID (.png vs .webp)

*Toàn bộ 105 cặp đã được quét và xác minh. Dưới đây là bảng trích lục 25 cặp tiêu biểu:*

| ID Câu | File .PNG | Dung lượng .PNG | File .WEBP | Dung lượng .WEBP | File đang nạp trong App | Kết luận trực quan | Phân nhóm |
|:---|:---|:---:|:---|:---:|:---:|:---|:---:|
| `0193_q193_Question_193` | `0193_q193_Question_193.png` | 24.2 KB | `0193_q193_Question_193.webp` | 21.1 KB | `0193_q193_Question_193.png` | PNG là đề MAD101, WEBP là đề môn khác | **NHÓM C (Giữ)** |
| `0194_q194_Question_194` | `0194_q194_Question_194.png` | 22.4 KB | `0194_q194_Question_194.webp` | 21.2 KB | `0194_q194_Question_194.png` | PNG là đề MAD101, WEBP là đề môn khác | **NHÓM C (Giữ)** |
| `0195_q195_Question_195` | `0195_q195_Question_195.png` | 29.9 KB | `0195_q195_Question_195.webp` | 20.5 KB | `0195_q195_Question_195.png` | PNG là đề MAD101, WEBP là đề môn khác | **NHÓM C (Giữ)** |
| `0196_q196_Question_196` | `0196_q196_Question_196.png` | 22.8 KB | `0196_q196_Question_196.webp` | 19.4 KB | `0196_q196_Question_196.png` | PNG là đề MAD101, WEBP là đề môn khác | **NHÓM C (Giữ)** |
| `0197_q197_Question_197` | `0197_q197_Question_197.png` | 35.7 KB | `0197_q197_Question_197.webp` | 19.1 KB | `0197_q197_Question_197.png` | PNG là đề MAD101, WEBP là đề môn khác | **NHÓM C (Giữ)** |
| `0198_q198_Question_198` | `0198_q198_Question_198.png` | 53.1 KB | `0198_q198_Question_198.webp` | 17.4 KB | `0198_q198_Question_198.png` | PNG là đề MAD101, WEBP là đề môn khác | **NHÓM C (Giữ)** |
| `0199_q199_Question_199` | `0199_q199_Question_199.png` | 29.1 KB | `0199_q199_Question_199.webp` | 16.6 KB | `0199_q199_Question_199.png` | PNG là đề MAD101, WEBP là đề môn khác | **NHÓM C (Giữ)** |
| `0200_q200_Question_200` | `0200_q200_Question_200.png` | 35.1 KB | `0200_q200_Question_200.webp` | 17.6 KB | `0200_q200_Question_200.png` | PNG là đề MAD101, WEBP là đề môn khác | **NHÓM C (Giữ)** |
| `0201_q201_Question_201` | `0201_q201_Question_201.png` | 37.9 KB | `0201_q201_Question_201.webp` | 18.1 KB | `0201_q201_Question_201.png` | PNG là đề MAD101, WEBP là đề môn khác | **NHÓM C (Giữ)** |
| `0202_q202_Question_202` | `0202_q202_Question_202.png` | 32.4 KB | `0202_q202_Question_202.webp` | 22.7 KB | `0202_q202_Question_202.png` | PNG là đề MAD101, WEBP là đề môn khác | **NHÓM C (Giữ)** |
| `0203_q203_Question_203` | `0203_q203_Question_203.png` | 25.0 KB | `0203_q203_Question_203.webp` | 21.0 KB | `0203_q203_Question_203.png` | PNG là đề MAD101, WEBP là đề môn khác | **NHÓM C (Giữ)** |
| `0206_q206_Question_206` | `0206_q206_Question_206.png` | 176.9 KB | `0206_q206_Question_206.webp` | 20.0 KB | `0206_q206_Question_206.png` | PNG là đề MAD101, WEBP là đề môn khác | **NHÓM C (Giữ)** |
| `0207_q207_Question_207` | `0207_q207_Question_207.png` | 114.0 KB | `0207_q207_Question_207.webp` | 21.8 KB | `0207_q207_Question_207.png` | PNG là đề MAD101, WEBP là đề môn khác | **NHÓM C (Giữ)** |
| `0208_q208_Question_208` | `0208_q208_Question_208.png` | 34.8 KB | `0208_q208_Question_208.webp` | 16.1 KB | `0208_q208_Question_208.png` | PNG là đề MAD101, WEBP là đề môn khác | **NHÓM C (Giữ)** |
| `0209_q209_Question_209` | `0209_q209_Question_209.png` | 111.4 KB | `0209_q209_Question_209.webp` | 18.6 KB | `0209_q209_Question_209.png` | PNG là đề MAD101, WEBP là đề môn khác | **NHÓM C (Giữ)** |
| `0210_q210_Question_210` | `0210_q210_Question_210.png` | 139.9 KB | `0210_q210_Question_210.webp` | 19.4 KB | `0210_q210_Question_210.png` | PNG là đề MAD101, WEBP là đề môn khác | **NHÓM C (Giữ)** |
| `0211_q211_Question_211` | `0211_q211_Question_211.png` | 160.9 KB | `0211_q211_Question_211.webp` | 17.7 KB | `0211_q211_Question_211.png` | PNG là đề MAD101, WEBP là đề môn khác | **NHÓM C (Giữ)** |
| `0212_q212_Question_212` | `0212_q212_Question_212.png` | 149.8 KB | `0212_q212_Question_212.webp` | 20.2 KB | `0212_q212_Question_212.png` | PNG là đề MAD101, WEBP là đề môn khác | **NHÓM C (Giữ)** |
| `0213_q213_Question_213` | `0213_q213_Question_213.png` | 30.4 KB | `0213_q213_Question_213.webp` | 23.0 KB | `0213_q213_Question_213.png` | PNG là đề MAD101, WEBP là đề môn khác | **NHÓM C (Giữ)** |
| `0214_q214_Question_214` | `0214_q214_Question_214.png` | 24.2 KB | `0214_q214_Question_214.webp` | 23.4 KB | `0214_q214_Question_214.png` | PNG là đề MAD101, WEBP là đề môn khác | **NHÓM C (Giữ)** |
| `0215_q215_Question_215` | `0215_q215_Question_215.png` | 23.3 KB | `0215_q215_Question_215.webp` | 18.5 KB | `0215_q215_Question_215.png` | PNG là đề MAD101, WEBP là đề môn khác | **NHÓM C (Giữ)** |
| `0216_q216_Question_216` | `0216_q216_Question_216.png` | 20.4 KB | `0216_q216_Question_216.webp` | 20.3 KB | `0216_q216_Question_216.png` | PNG là đề MAD101, WEBP là đề môn khác | **NHÓM C (Giữ)** |
| `0217_q217_Question_217` | `0217_q217_Question_217.png` | 129.9 KB | `0217_q217_Question_217.webp` | 17.4 KB | `0217_q217_Question_217.png` | PNG là đề MAD101, WEBP là đề môn khác | **NHÓM C (Giữ)** |
| `0218_q218_Question_218` | `0218_q218_Question_218.png` | 27.1 KB | `0218_q218_Question_218.webp` | 24.5 KB | `0218_q218_Question_218.png` | PNG là đề MAD101, WEBP là đề môn khác | **NHÓM C (Giữ)** |
| `0220_q220_Question_220` | `0220_q220_Question_220.png` | 22.1 KB | `0220_q220_Question_220.webp` | 19.8 KB | `0220_q220_Question_220.png` | PNG là đề MAD101, WEBP là đề môn khác | **NHÓM C (Giữ)** |

*(Còn 80 cặp khác đều tuân theo đúng quy luật trên và toàn bộ được bảo lưu 100% trong Nhóm C)*

---

## 5. DANH SÁCH ẢNH QUÁ KHỔ (> 300 KB) — BẢO LƯU CHỜ NÉN
| STT | Đường dẫn file | Dung lượng | Khuyến nghị |
|:---:|:---|:---:|:---|
| 1 | `0886_q886_Question_886.png` | 301.6 KB (308,806 bytes) | Giữ nguyên (nén WebP lossless nếu người dùng yêu cầu sau) |
| 2 | `chapters/Ch7_Graphs/0886_q886_Question_886.png` | 301.6 KB (308,806 bytes) | Bản sao trùng hash thuộc Nhóm B |

---

## 6. DUNG LƯỢNG THU HỒI DỰ KIẾN THEO TỪNG NHÓM

| Phân nhóm | Số lượng file | Dung lượng giải phóng | Mức độ rủi ro | Hành động tiếp theo |
|:---|:---:|:---:|:---:|:---|
| **Nhóm A (Bản sao thừa an toàn)** | 8 file | ~0.26 MB | 0% (Không rủi ro) | Sẵn sàng chuyển vào `_cleanup_quarantine/` khi người dùng duyệt Bước 2 |
| **Nhóm B (Bản sao chapters/ trùng hash)** | 1131 file | 50.12 MB | Cực thấp (nhưng thuộc ảnh câu hỏi) | Giữ nguyên, chỉ cách ly khi người dùng có lệnh riêng |
| **Nhóm C (Bảo lưu tuyệt đối)** | 1,236 file | 0 MB (Bảo tồn) | 100% An toàn | Tuyệt đối giữ nguyên không đụng |

---

## 7. DANH SÁCH FILE SCRATCH TẠM THỜI CẦN DỌN (Bảo lưu chờ lệnh dọn)

*Các file phân tích và kiểm toán tạm thời do agent sinh ra trong thư mục `scratch/`, được ghi danh sách đầy đủ, không xóa ngay mà đưa vào diện dọn dẹp sau:*
- `scratch/audit_v2.py` (Script kiểm toán dữ liệu Giai đoạn 1)
- `scratch/reset_sample_v2.py` (Script reset nhãn Giai đoạn 2)
- `scratch/scan_images.py`, `scratch/inspect_summary.py`, `scratch/check_refs.py`, `scratch/check_webp.py`, `scratch/check_q193.py`, `scratch/find_q193.py`, `scratch/test_exist.py`, `scratch/inspect_images.py`, `scratch/test_ocr.py`, `scratch/check_q_images.py`, `scratch/full_image_analysis.py`, `scratch/breakdown.py`, `scratch/check_chapters_ref.py`, `scratch/analyze_pairs.py`, `scratch/generate_plan.py`

---

## 8. QUY TRÌNH THỰC HIỆN TIẾP THEO
1. **Hiện tại (Dừng ở Bước 1):** Báo cáo kế hoạch chi tiết này cho người dùng duyệt.
2. **Bước 2 (Chờ duyệt):** Khi người dùng đồng ý:
   - Chuyển các file Nhóm A vào `_cleanup_quarantine/<YYYYMMDD_HHMMSS>/`.
   - Chạy test kiểm tra: Mở ứng dụng duyệt ngẫu nhiên 30 câu hỏi liên tiếp.
   - Kiểm tra log Network/Console: Đảm bảo 0 lỗi 404 hình ảnh.
   - So khớp số lượng ảnh tham chiếu: 1,131 / 1,131 câu hiển thị hoàn hảo.
3. **Bước 3 (Xóa vĩnh viễn):** CHỈ thực hiện khi người dùng nhắn tin chính xác cụm từ: `"xóa vĩnh viễn"`.