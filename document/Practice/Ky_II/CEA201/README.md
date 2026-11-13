# CEA201 — Computer Architecture (Kiến trúc Máy tính)

Tài liệu câu hỏi và ngân hàng đề thi trắc nghiệm môn CEA201 tích hợp trên nền tảng **9.5 AI CLUB**.

## 1. Cấu trúc dữ liệu hiện tại
- **Nguồn dữ liệu:** `CEA201_Ultra_Edition.tex` (537 câu hỏi, phân loại chuẩn theo 21 chương giáo trình COA 11th Edition).
- **File xuất dữ liệu:** `questions.json` (dữ liệu câu hỏi JSON trích xuất tự động từ file .tex).
- **Tích hợp hệ thống:** Dữ liệu được đưa trực tiếp vào `js/practice-data.js` và đồng bộ tìm kiếm qua `backend/data/quizzes-index.json`.

## 2. Quy trình cập nhật Quiz tự động từ file .tex
Mỗi khi có file `.tex` mới (hoặc cập nhật nội dung trong `CEA201_Ultra_Edition.tex`), chỉ cần thực hiện 1 câu lệnh duy nhất từ thư mục gốc của dự án:

```bash
# Kiểm tra trước (dry-run, không ghi file)
node tools/quiz-build/build_subject_quiz.js --subject=CEA201 --dry-run

# Cập nhật chính thức vào toàn bộ nền tảng
node tools/quiz-build/build_subject_quiz.js --subject=CEA201
```

Script sẽ tự động:
1. Đọc và phân tách cấu trúc 21 chương từ `\section{...}`.
2. Bóc tách từng câu hỏi trong môi trường `\begin{itemize}` / `\begin{cauhoi}`, phương án A/B/C/D, nhận diện đáp án đúng `\textcolor{red}{...}` và ánh xạ giải thích chi tiết chuẩn COA 11th Edition.
3. Chuẩn hóa công thức toán học sang cú pháp an toàn cho MathJax `\( ... \)`.
4. Cập nhật `js/practice-data.js` (chỉ cập nhật CEA201, không ảnh hưởng các môn khác).
5. Tự động đồng bộ `tools/build-quiz-index.js` để thanh tìm kiếm toàn cục nhận diện các chương mới.

## 3. Danh sách 21 Chương thi & Luyện tập
1. **Chương 1:** Basic Concepts and Computer Evolution (41 câu | 62 phút)
2. **Chương 2:** Performance Concepts (17 câu | 26 phút)
3. **Chương 3:** A Top-Level View of Computer Function and Interconnection (41 câu | 62 phút)
4. **Chương 4:** The Memory Hierarchy Locality and Performance (11 câu | 17 phút)
5. **Chương 5:** Cache Memory (27 câu | 41 phút)
6. **Chương 6:** Internal Memory (33 câu | 50 phút)
7. **Chương 7:** External Memory (28 câu | 42 phút)
8. **Chương 8:** Input & Output (38 câu | 57 phút)
9. **Chương 9:** Operating System Support (30 câu | 45 phút)
10. **Chương 10:** Number Systems (2 câu | 5 phút)
11. **Chương 11:** Computer Arithmetic (4 câu | 6 phút)
12. **Chương 12:** Digital Logic (49 câu | 74 phút)
13. **Chương 13:** Instruction Sets: Characteristics and Functions (146 câu | 219 phút)
14. **Chương 14:** Instruction Sets: Addressing Modes and Formats (25 câu | 38 phút)
15. **Chương 15:** Assembly Language and Related Topics (5 câu | 8 phút)
16. **Chương 16:** Processor Structure and Function (22 câu | 33 phút)
17. **Chương 17:** Reduced Instruction Set Computers (RISC) (10 câu | 15 phút)
18. **Chương 18:** Instruction-Level Parallelism and Superscalar Processors (2 câu | 5 phút)
19. **Chương 19:** Control Unit Operation and Microprogrammed Control (2 câu | 5 phút)
20. **Chương 20:** Parallel Processing (2 câu | 5 phút)
21. **Chương 21:** Multicore Computers (2 câu | 5 phút)
