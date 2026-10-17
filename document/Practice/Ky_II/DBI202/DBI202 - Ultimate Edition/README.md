# DBI202 Study Hub

Trang học DBI202 dùng cùng bố cục và luồng học với `CEA_Illustrator`, đổi nhận diện sang tông xanh lá và dùng bộ câu hỏi đã phân loại theo chương.

## Mở trang

Mở `index.html` bằng trình duyệt. Trang chạy tĩnh, không cần cài thư viện hay backend. File `data/questions.js` cho phép nạp câu hỏi khi mở trực tiếp từ máy.

## Chức năng

- Học từng câu hoặc làm đề thi thử theo chương.
- Tìm trong câu hỏi, xem câu sai, đánh dấu câu cần ôn.
- Lưu tiến độ trong trình duyệt và sao lưu/khôi phục bằng JSON.
- Xem hình gốc đối với câu có hình trong nguồn. Những ảnh này dùng liên kết có sẵn trong CSV nên cần kết nối mạng để tải.
- Mỗi câu có phần giải thích chi tiết bằng tiếng Việt, phân tích đáp án/nội dung chương và liên kết đọc thêm từ giáo trình DBMS, đại học và tài liệu SQL chính thức.
- Ghi chú nguồn, ghi chú phân loại và các trường hợp thiếu lựa chọn/đề gốc được giữ để người học nhận biết giới hạn của dữ liệu.

## Dữ liệu

`DBI202_VIP_348_questions_by_chapter.md` là bản câu hỏi phân loại kèm giải thích để đọc. CSV nguồn nằm trong `sources/`; nội dung giải thích biên soạn nằm trong `data/explanations.json`; dữ liệu máy đọc nằm trong `data/questions.json` và `data/questions.js`.

Sau khi cập nhật CSV hoặc cách phân loại trong Markdown, tạo lại dữ liệu câu hỏi trước, rồi tạo lời giải và đồng bộ cả JSON cùng hai bản Markdown:

```powershell
python scripts/build-data.py
python scripts/enrich-explanations.py
python scripts/build-data.py
python scripts/render-classified-markdown.py
```

Bộ hiện tại có 798 câu từ 28 chương trong đề cương; 20 chương có câu hỏi. Các câu trùng từ nhiều mã đề được giữ riêng theo mã đề và số câu.
