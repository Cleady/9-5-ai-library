# JPD113 — Elementary Japanese 1- A1.1 (Tiếng Nhật Sơ Cấp 1)

Tài liệu câu hỏi và ngân hàng đề thi trắc nghiệm môn JPD113 tích hợp trên nền tảng **9.5 AI CLUB**.

## 1. Cấu trúc dữ liệu hiện tại
- **Nguồn dữ liệu:** `JPD113_Ultra_Edition.tex` (180 câu hỏi trắc nghiệm, phân loại theo 4 chương trọng tâm của môn học).
- **File xuất dữ liệu:** `questions.json` (dữ liệu câu hỏi JSON trích xuất tự động từ file .tex).
- **Tích hợp hệ thống:** Dữ liệu được đưa trực tiếp vào `js/practice-data.js` (Subject ID: 8) và đồng bộ tìm kiếm toàn cục qua `backend/data/quizzes-index.json`.

## 2. Quy trình cập nhật Quiz tự động từ file .tex
Mỗi khi có file `.tex` mới (hoặc cập nhật nội dung trong `JPD113_Ultra_Edition.tex`), chỉ cần thực hiện lệnh từ thư mục gốc của dự án:

```bash
# Kiểm tra trước (dry-run, không ghi file)
node tools/quiz-build/build_subject_quiz.js --subject=JPD113 --dry-run

# Cập nhật chính thức vào toàn bộ nền tảng
node tools/quiz-build/build_subject_quiz.js --subject=JPD113
```

Script sẽ tự động:
1. Đọc và phân tách cấu trúc 4 chương từ `\chapter{...}`.
2. Bóc tách từng câu hỏi trong môi trường `\begin{question}`, phương án A/B/C/D, đáp án đúng và giải thích chi tiết trong `\explain`.
3. Chuẩn hóa công thức toán/ký hiệu an toàn cho MathJax `\( ... \)`.
4. Cập nhật `js/practice-data.js` (chỉ cập nhật JPD113, bảo tồn nguyên vẹn 100% dữ liệu các môn khác).
5. Tự động đồng bộ `tools/build-quiz-index.js` để thanh tìm kiếm toàn cục nhận diện các chương mới.

## 3. Danh sách 4 Chương thi & Luyện tập
1. **Chương 1:** Chữ Hán & Từ vựng (Kanji & Vocabulary) — 39 câu (59 phút)
2. **Chương 2:** Ngữ pháp & Trợ từ cốt lõi (Core Grammar & Particles) — 63 câu (95 phút)
3. **Chương 3:** Hội thoại & Mẫu câu Giao tiếp (Daily Dialogues & Expressions) — 72 câu (108 phút)
4. **Chương 4:** Sắp xếp từ thành câu hoàn chỉnh (Sentence Reordering & Syntax) — 6 câu (9 phút)
