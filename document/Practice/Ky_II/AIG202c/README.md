# AIG202c — Artificial Intelligence Foundation IBM

Tài liệu câu hỏi và ngân hàng đề thi trắc nghiệm môn AIG202c (Artificial Intelligence Foundation IBM) tích hợp trên nền tảng **9.5 AI CLUB**.

## 1. Cấu trúc dữ liệu hiện tại
- **Nguồn dữ liệu:** `AIG202c_Ultra_Edition.tex` (190 câu hỏi trắc nghiệm, phân bổ theo 4 chương trọng tâm của môn học).
- **File xuất dữ liệu:** `questions.json` (dữ liệu câu hỏi JSON trích xuất tự động từ file .tex).
- **Tích hợp hệ thống:** Dữ liệu được đưa trực tiếp vào `js/practice-data.js` (Subject ID: 9) và đồng bộ tìm kiếm toàn cục qua `backend/data/quizzes-index.json`.

## 2. Quy trình cập nhật Quiz tự động từ file .tex
Mỗi khi có file `.tex` mới (hoặc cập nhật nội dung trong `AIG202c_Ultra_Edition.tex`), chỉ cần thực hiện lệnh từ thư mục gốc của dự án:

```bash
# Kiểm tra trước (dry-run, không ghi file)
node tools/quiz-build/build_subject_quiz.js --subject=AIG202c --dry-run

# Cập nhật chính thức vào toàn bộ nền tảng
node tools/quiz-build/build_subject_quiz.js --subject=AIG202c
```

Script sẽ tự động:
1. Đọc và phân tách cấu trúc 4 chương từ `\section{...}`.
2. Bóc tách từng câu hỏi trong môi trường `\begin{question}`, các phương án lựa chọn, đáp án đúng và phần giải thích chi tiết trong `\explain` kèm chú thích thuật ngữ `\vocab`.
3. Chuẩn hóa công thức toán/ký hiệu an toàn cho MathJax `\( ... \)`.
4. Cập nhật `js/practice-data.js` (chỉ cập nhật AIG202c, bảo tồn nguyên vẹn 100% dữ liệu các môn khác).
5. Tự động đồng bộ `tools/build-quiz-index.js` để thanh tìm kiếm toàn cục nhận diện các chương mới.

## 3. Danh sách 4 Chương thi & Luyện tập
1. **Chương 1:** Introduction to Artificial Intelligence — 71 câu (107 phút)
2. **Chương 2:** Generative AI: Introduction and Applications — 27 câu (41 phút)
3. **Chương 3:** Generative AI: Prompt Engineering Basics — 38 câu (57 phút)
4. **Chương 4:** Building AI Powered Chatbots Without Programming — 54 câu (81 phút)
