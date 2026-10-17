# PFP191 Study Hub

Mở `index.html` bằng trình duyệt để học hoặc thi thử trắc nghiệm môn **Lập trình Python (PFP191 - Programming Fundamentals with Python)**. Giao diện dạng thẻ hiện đại tông màu ấm (rose theme), hiển thị toàn bộ đề bài, khối mã nguồn (code blocks) và các lựa chọn dưới dạng văn bản thuần, không phụ thuộc vào ảnh chụp đề thi. Chạy trực tiếp trên trình duyệt, không cần backend hay cài đặt thêm phần mềm.

## Cập nhật và build lại dữ liệu

Chạy lệnh sau từ thư mục `PFP - Illustrator`:

```sh
node scripts/build-data.mjs
```

Script sẽ đọc từ `extracted_questions_by_chapter.tex`, `answers.txt` và `answers.json`. Kết quả sẽ ghi ra `data/questions.json` và `data/questions.js`; file `.js` cho phép trang HTML nạp trực tiếp dữ liệu câu hỏi ngay cả khi mở qua giao thức `file://` trên đĩa cứng.

Báo cáo phân tích gồm:
- Số câu từng chương (5 chương / 193 câu).
- Số câu khớp đáp án (100% khớp).
- Số câu có giải thích chi tiết (100% có giải thích).
- Danh sách câu hỏi chọn nhiều đáp án hoặc các cờ ghi chú.

## Cấu trúc 5 Chương / Stages

1. **Chương 1: Python Basics & Syntax** (Câu 1 – 40): Cú pháp căn bản, biến, kiểu dữ liệu, toán tử, ép kiểu, input/output.
2. **Chương 2: Control Flow & Loops** (Câu 41 – 80): Cấu trúc rẽ nhánh `if/elif/else`, vòng lặp `for`, `while`, `break`, `continue`.
3. **Chương 3: Functions & Modules** (Câu 81 – 120): Hàm, tham số mặc định, `*args`, `**kwargs`, scope biến, module & package.
4. **Chương 4: Data Structures & Collections** (Câu 121 – 160): `List`, `Tuple`, `Set`, `Dictionary`, comprehension, slicing.
5. **Chương 5: Strings, Files & Advanced Python** (Câu 161 – 193): Xử lý chuỗi, đọc/ghi tệp tin, ngoại lệ `try/except`, lập trình hướng đối tượng (OOP).

## Xem lại giải thích và cờ câu hỏi đặc biệt

- `data/explanations.ai.json`: Chứa giải thích chi tiết bằng tiếng Việt cho toàn bộ 193 câu hỏi, phân tích rõ lý do đúng/sai của từng phương án.
- `data/review_flags.json`: Ghi nhận các câu chọn nhiều đáp án (Q6, Q34, Q91, Q114, Q192), toán tử đặc biệt (Q79 lũy thừa `**`), và ký hiệu số thực (Q115).
- Trong ứng dụng, bấm **Báo câu hỏi hoặc giải thích sai** trên mỗi câu hỏi để lưu ghi chú lỗi vào bộ nhớ máy.
- Bấm nút **JSON** trên thanh điều hướng để xuất (export) hoặc nhập (restore) toàn bộ tiến độ, câu đánh dấu, sổ câu sai và lịch sử làm bài.

## Danh sách tệp tin trong thư mục

- `index.html`: Web app mô phỏng học và thi thử trắc nghiệm hoàn chỉnh.
- `styles.css`: Hệ thống giao diện responsive, hỗ trợ Light/Dark mode.
- `answers.txt`: Danh sách đáp án chuẩn dạng text (`Câu 001: C...`).
- `answers.json`: Dữ liệu gốc liên kết giữa số câu, đáp án và tên file ảnh chụp.
- `answers.csv`: Bảng tổng hợp đáp án dạng bảng tính CSV.
- `classifications.json`: Phân loại 193 câu hỏi vào 5 chương.
- `extracted_questions.tex`: Toàn bộ 193 câu hỏi dưới dạng tài liệu LaTeX độc lập.
- `extracted_questions_by_chapter.tex`: 193 câu hỏi LaTeX tổ chức theo từng chương.
- `compile_latex.py`: Script Python xuất câu hỏi sang LaTeX.
- `compile_latex_by_chapter.py`: Script Python nhóm câu hỏi theo chương sang LaTeX.
- `heuristic_classifier.py`: Script Python phân loại câu hỏi vào các chương.
- `data/questions.json`: Cơ sở dữ liệu câu hỏi đầy đủ dạng JSON.
- `data/questions.js`: Đối tượng `window.EXAM_QUESTIONS` phục vụ chạy offline.
- `data/explanations.ai.json`: Cơ sở dữ liệu giải thích câu hỏi.
- `data/review_flags.json`: Ghi chú các câu hỏi đặc biệt.
- `scripts/build-data.mjs`: Script Node.js build dữ liệu tự động.
