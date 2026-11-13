# CSD203 — Data Structures and Algorithms (Cấu trúc dữ liệu và giải thuật)

Tài liệu câu hỏi và ngân hàng đề thi trắc nghiệm môn CSD203 tích hợp trên nền tảng **9.5 AI CLUB**.

## 1. Cấu trúc dữ liệu hiện tại
- **Mã môn:** `CSD203` (Subject ID: `4`)
- **Nguồn dữ liệu master:** `CSD203_Ultra_Edition.tex` (376 câu hỏi toàn khóa, phân loại chuyên sâu theo 8 chương trọng tâm).
- **File xuất dữ liệu:** `questions.json` (dữ liệu câu hỏi JSON trích xuất tự động từ file .tex, tích hợp cả đồ thị và cây nhị phân SVG).
- **Giao diện:** Màu nền xanh lục đặc trưng (`prc-icon-green`) và biểu tượng đồ thị/nút mạng (`subject5-icon`).
- **Tích hợp hệ thống:** Dữ liệu được đưa trực tiếp vào `js/practice-data.js` và đồng bộ tìm kiếm qua `backend/data/quizzes-index.json` và `assets/data/quizzes-index.json`.

## 2. Quy trình cập nhật Quiz tự động từ file .tex
Mỗi khi có cập nhật trong file `CSD203_Ultra_Edition.tex` (hoặc thay file `.tex` mới), chỉ cần thực hiện lệnh builder từ thư mục gốc của dự án:

```bash
# Kiểm tra trước (dry-run, không ghi file)
node tools/quiz-build/build_subject_quiz.js --subject=CSD203 --dry-run

# Cập nhật chính thức vào toàn bộ nền tảng
node tools/quiz-build/build_subject_quiz.js --subject=CSD203
```

Script sẽ tự động:
1. Đọc và phân tách cấu trúc 8 chương từ `\section*{...}`.
2. Bóc tách từng câu hỏi trong môi trường `\begin{question}`, phương án trong `\begin{choices}`, đáp án đúng `\textbf{Đáp án:}` và giải thích chi tiết `\textbf{Giải thích:}`.
3. Chuyển đổi sơ đồ TikZ (cây nhị phân, đồ thị) thành vector SVG tối ưu nhúng trực tiếp.
4. Chuẩn hóa tất cả công thức toán học sang cú pháp MathJax an toàn `\( ... \)`.
5. Cập nhật `js/practice-data.js` (chỉ cập nhật CSD203, bảo tồn 100% dữ liệu các môn khác).
6. Tự động đồng bộ `tools/build-quiz-index.js` cho thanh tìm kiếm toàn cục.

## 3. Danh sách 8 Chương thi & Luyện tập (376 câu)
1. **Chương 1 (Quiz 301):** Mảng (Arrays, Lists, Slicing & Operations) — 25 câu (38 phút)
2. **Chương 2 (Quiz 302):** Danh sách liên kết (Linked Lists) — 30 câu (45 phút)
3. **Chương 3 (Quiz 303):** Ngăn xếp (Stacks) — 19 câu (29 phút)
4. **Chương 4 (Quiz 304):** Hàng đợi (Queues) — 16 câu (24 phút)
5. **Chương 5 (Quiz 305):** Bảng băm (Hash Tables) — 54 câu (81 phút)
6. **Chương 6 (Quiz 306):** Cây tìm kiếm nhị phân và Đồ thị (Binary Search Tree & Graph) — 112 câu (168 phút)
7. **Chương 7 (Quiz 307):** Thuật toán sắp xếp (Sorting Algorithms) — 29 câu (44 phút)
8. **Chương 8 (Quiz 308):** Các giải thuật bổ trợ (Độ phức tạp, Đệ quy, Tìm kiếm, Huffman & Xử lý chuỗi) — 91 câu (137 phút)
