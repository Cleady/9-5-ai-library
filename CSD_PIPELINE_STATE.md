# CSD203 PIPELINE STATE - TRẠNG THÁI TIẾN TRÌNH

**Thời gian cập nhật:** 18/11/2026 21:50  
**Nhánh Git:** `main` (Đã lưu snapshot branch `backup-csd-20261118`)  
**Thư mục Backup:** `backup_csd_20261118/` (Đầy đủ 5 tầng dữ liệu an toàn)  
**Tiến độ tổng thể:** **100% HOÀN THÀNH (TẤT CẢ 8 PHA)**

---

## BẢNG TIẾN ĐỘ CÁC PHA

| Pha | Tên công việc | Trạng thái | Ghi chú & Số liệu |
| :---: | :--- | :---: | :--- |
| **Pha 0** | Khảo sát, Backup 5 tầng dữ liệu & Phân tích Frontend ID | **HOÀN THÀNH** | Đã backup 5 tầng vào `backup_csd_20261118`, xác nhận cơ chế ID frontend |
| **Pha 1** | Nhập 150 câu mới vào STAGING & Làm sạch | **HOÀN THÀNH** | Parse 3 bộ .tex, chuyển 9 ảnh WebP sang `assets/images/practice/csd203/`, dọn TeX/MathJax |
| **Pha 2** | Xác minh đáp án câu mới (Chạy Python / Tính toán) | **HOÀN THÀNH** | Chạy kiểm thử 20 câu code Python (100% pass), tính tay 9 câu hình & duyệt |
| **Pha 3** | Phân chương cho câu mới | **HOÀN THÀNH** | Phân loại 150 câu vào Quiz 301..308 bằng dual-method (k-NN + syllabus) |
| **Pha 4** | Gộp và khử trùng toàn cục | **HOÀN THÀNH** | Khử 5 câu trùng bộ mới, 21 câu trùng 100% ngân hàng cũ, nâng cấp 73 câu cũ, thêm 72 câu mới |
| **Pha 5** | Sửa lỗi các câu cũ còn lại | **HOÀN THÀNH** | Khôi phục 73 code block 4-space indent từ TeX gốc, sửa ID 10230, xóa rỗng 14 giải thích lệch |
| **Pha 6** | Xuất CSD_MISSING_FIGURES.md (Chương 6 thiếu hình) | **HOÀN THÀNH** | Xuất đầy đủ 33 câu Chương 6 thiếu hình, phân thành các nhóm ghép cặp cùng câu dẫn |
| **Pha 7** | Nâng cấp Frontend (Ảnh diagrams, CSS, options A-F) | **HOÀN THÀNH** | Nâng cấp `renderQuestionDiagrams` hỗ trợ WebP `d.src`, thêm CSS code block & diagram, bảo vệ MathJax |
| **Pha 8** | Đồng bộ .tex gốc, sinh 5 tầng, bump cache & Báo cáo cuối | **HOÀN THÀNH** | Đồng bộ .tex gốc, sinh 5 tầng (427 câu 100% khớp), bump cache `20261118v1`, xuất 3 file báo cáo |

---

## KẾT QUẢ ĐỒNG BỘ 5 TẦNG DỮ LIỆU
- **Tầng 1 (.tex):** 427 câu hỏi
- **Tầng 2 (questions.json):** 427 câu hỏi
- **Tầng 3 (practice-data.js):** 427 câu hỏi CSD203 (Tổng toàn hệ thống: 2,449 câu)
- **Tầng 4 (quizzes-index.json):** 427 câu hỏi CSD203 (123 quizzes toàn hệ thống)
- **Tầng 5 (Cache Buster):** `20261118v1` (Đã cập nhật trên toàn bộ 8 file HTML)
- **Kiểm định chất lượng:** 0 lỗi, 0 trùng lặp ID, 0 ảnh hỏng, 0 lỗi MathJax backtick.
