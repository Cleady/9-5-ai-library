# DBI202 — Database Systems (Hệ Cơ Sở Dữ Liệu)

Tài liệu câu hỏi và ngân hàng đề thi trắc nghiệm môn DBI202 tích hợp trên nền tảng **9.5 AI CLUB**.

## 1. Cấu trúc dữ liệu hiện tại
- **Nguồn dữ liệu:** `DBI202_Ultra_Edition.tex` (590 câu hỏi, phân loại chuẩn theo 8 chương trọng tâm của môn học).
- **File xuất dữ liệu:** `questions.json` (dữ liệu câu hỏi JSON trích xuất tự động từ file .tex).
- **Thư mục tài nguyên:** `assets/` (các sơ đồ ERD phục vụ câu hỏi).
- **Tích hợp hệ thống:** Dữ liệu được đưa trực tiếp vào `js/practice-data.js` và đồng bộ tìm kiếm qua `backend/data/quizzes-index.json`.

## 2. Quy trình cập nhật Quiz tự động từ file .tex
Mỗi khi có file `.tex` mới (hoặc cập nhật nội dung trong `DBI202_Ultra_Edition.tex`), chỉ cần thực hiện 1 câu lệnh duy nhất từ thư mục gốc của dự án:

```bash
# Kiểm tra trước (dry-run, không ghi file)
node tools/quiz-build/build_subject_quiz.js --subject=DBI202 --dry-run

# Cập nhật chính thức vào toàn bộ nền tảng
node tools/quiz-build/build_subject_quiz.js --subject=DBI202
```

Script sẽ tự động:
1. Đọc và phân tách cấu trúc 8 chương từ `\section{...}`.
2. Bóc tách từng câu hỏi trong môi trường `\begin{question}`, phương án A/B/C/D, đáp án đúng và giải thích chi tiết trong `\explain`.
3. Chuẩn hóa công thức toán học sang cú pháp an toàn cho MathJax `\( ... \)`.
4. Cập nhật `js/practice-data.js` (chỉ cập nhật DBI202, không ảnh hưởng các môn khác).
5. Tự động đồng bộ `tools/build-quiz-index.js` để thanh tìm kiếm toàn cục nhận diện các chương mới.

## 3. Danh sách 8 Chương thi & Luyện tập
1. **Chương 1:** The Worlds of Database Systems (73 câu)
2. **Chương 2:** The Relational Model of Data (42 câu)
3. **Chương 3:** Design Theory for Relational Databases (104 câu)
4. **Chương 4:** High-Level Database Model (66 câu)
5. **Chương 5:** Algebraic Query Language (10 câu)
6. **Chương 6:** The Database Language SQL (171 câu)
7. **Chương 7:** Practical Issues of Database Application (74 câu)
8. **Chương 8:** Database Programming on SQL Server (50 câu)
