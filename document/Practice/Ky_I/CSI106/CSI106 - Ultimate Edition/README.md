# CSI106 Study Hub

Mở `index.html` trong bất kỳ trình duyệt nào để học hoặc làm bài thi thử. Giao diện sử dụng thiết kế thẻ hiện đại với tông màu chủ đạo **xanh da trời (Sky Blue)**, hiển thị toàn bộ nội dung câu hỏi và các lựa chọn dưới dạng văn bản (không dùng ảnh chụp đề), kèm đáp án và giải thích chi tiết. Trang web chạy hoàn toàn offline trên trình duyệt mà không cần cài đặt hay cấu hình máy chủ.

## Dữ liệu và chức năng

- **455 câu hỏi trắc nghiệm** trải dài trên 13 chương của môn CSI106 (Foundations of Computer Science).
- **100% câu hỏi** có đáp án và giải thích chi tiết (tiếng Việt).
- **Hai chế độ học**:
  - **Học từng câu (Practice)**: Chọn đáp án, nhấn "Kiểm tra" hoặc "Hiện đáp án" để xem ngay kết quả và giải thích.
  - **Thi thử (Exam)**: Đặt thời gian (15, 30, 60, 90 phút hoặc không giới hạn), chấm điểm tổng thể sau khi nộp bài.
- **Tiến độ học tập**: Lưu tự động trên `localStorage` (độ chính xác, số lượt trả lời, danh sách câu sai, câu đánh dấu, phiên học đang dở).
- **Sao lưu / Khôi phục**: Nhấn nút **JSON** trên thanh điều hướng để xuất file sao lưu tiến độ hoặc khôi phục từ tệp đã xuất.
- **Giao diện Sáng / Tối**: Nhấn nút chuyển đổi giao diện (☾ / ☀) với bảng màu xanh da trời tối ưu cho mắt.

## Tái tạo dữ liệu câu hỏi

Chạy lệnh sau từ thư mục `CSI106 - Illustrator`:

```sh
node scripts/build-data.mjs
```

Kịch bản đọc dữ liệu từ `extracted_questions_by_chapter.tex`, `answers.txt`, `answers.json`, và `data/explanations.ai.json`. Kịch bản sẽ xuất ra hai tệp:
1. `data/questions.json`: Dữ liệu dạng JSON chuẩn.
2. `data/questions.js`: Khai báo biến toàn cục `window.EXAM_QUESTIONS` giúp mở trang trực tiếp từ đĩa (`file://`) mà không gặp lỗi CORS.

Báo cáo sau khi build sẽ liệt kê:
- Số lượng câu hỏi theo từng chương.
- Các câu thiếu đáp án / thiếu giải thích (nếu có).
- Các câu bị trùng ID hoặc lựa chọn bất thường.
- Cờ kiểm tra đáp án (`data/review_flags.json`).

## Danh sách 13 chương

1. **Chương 1**: Computer Organization (40 câu)
2. **Chương 2**: Numbering Systems (38 câu)
3. **Chương 3.1**: Data Storage (20 câu)
4. **Chương 3.2**: Operations on Data (17 câu)
5. **Chương 4**: Computer Networks and Internet (40 câu)
6. **Chương 5**: Operating System (38 câu)
7. **Chương 6**: Algorithms (38 câu)
8. **Chương 7**: Programming (38 câu)
9. **Chương 8**: Software Engineering (38 câu)
10. **Chương 9**: Data Structures (38 câu)
11. **Chương 10**: File Structure (36 câu)
12. **Chương 11**: Databases (37 câu)
13. **Chương 12**: Security and Ethical Issues (37 câu)
