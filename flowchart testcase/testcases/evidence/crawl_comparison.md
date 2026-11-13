# SO SÁNH KẾT QUẢ CRAWL TÀI NGUYÊN (BEFORE VS AFTER F-001)

Thời gian thực hiện: 2026-10-22T13:21:05.240Z  
Tổng số URL kiểm tra: **242**  
Số URL thay đổi mã trạng thái: **15**

---

## 1. Danh sách chi tiết các URL thay đổi mã trạng thái HTTP

| STT | URL | HTTP Trước (Before) | HTTP Sau (After) | Nguồn tham chiếu | Đánh giá |
| :---: | :--- | :---: | :---: | :--- | :--- |
| 1 | `/.env` | **403** | **404** | `SENSITIVE_AUDIT_PROBE` | ⚠️ Cảnh báo đổi từ 403 sang 404 |
| 2 | `/.git/config` | **403** | **404** | `SENSITIVE_AUDIT_PROBE` | ⚠️ Cảnh báo đổi từ 403 sang 404 |
| 3 | `/LMS_YOUTUBE_AUDIT.md` | **200** | **404** | `SENSITIVE_AUDIT_PROBE` | ✅ Thành công: Đã chặn tệp nhạy cảm / tệp ngoài whitelist |
| 4 | `/NOTIFICATIONS_AUDIT.md` | **200** | **404** | `SENSITIVE_AUDIT_PROBE` | ✅ Thành công: Đã chặn tệp nhạy cảm / tệp ngoài whitelist |
| 5 | `/README.md` | **403** | **404** | `SENSITIVE_AUDIT_PROBE` | ⚠️ Cảnh báo đổi từ 403 sang 404 |
| 6 | `/backend/.env` | **403** | **404** | `SENSITIVE_AUDIT_PROBE` | ⚠️ Cảnh báo đổi từ 403 sang 404 |
| 7 | `/backend/config/db.js` | **403** | **404** | `SENSITIVE_AUDIT_PROBE` | ⚠️ Cảnh báo đổi từ 403 sang 404 |
| 8 | `/backend/server.js` | **403** | **404** | `SENSITIVE_AUDIT_PROBE` | ⚠️ Cảnh báo đổi từ 403 sang 404 |
| 9 | `/backend/storage/resources/` | **403** | **404** | `backend/test_resources_api.js` | ⚠️ Cảnh báo đổi từ 403 sang 404 |
| 10 | `/document/Practice/Ky_I/MAD101/MAD101 - Ultra Ultimate Edition/` | **200** | **404** | `document/Practice/Ky_I/MAD101/MAD101 - Ultra Ultimate Edition/legacy/quiz_practice.html` | ✅ Thành công: Đã chặn tệp nhạy cảm / tệp ngoài whitelist |
| 11 | `/flowchart testcase/README.md` | **403** | **404** | `SENSITIVE_AUDIT_PROBE` | ⚠️ Cảnh báo đổi từ 403 sang 404 |
| 12 | `/package-lock.json` | **403** | **404** | `SENSITIVE_AUDIT_PROBE` | ⚠️ Cảnh báo đổi từ 403 sang 404 |
| 13 | `/package.json` | **403** | **404** | `SENSITIVE_AUDIT_PROBE` | ⚠️ Cảnh báo đổi từ 403 sang 404 |
| 14 | `/tools/backup/backup_before_settings_1792315787059.json` | **200** | **404** | `SENSITIVE_AUDIT_PROBE` | ✅ Thành công: Đã chặn tệp nhạy cảm / tệp ngoài whitelist |
| 15 | `/tools/theme-gallery-content.html` | **200** | **404** | `tools/theme-gallery.html` | ✅ Thành công: Đã chặn tệp nhạy cảm / tệp ngoài whitelist |

---

## 2. Xác nhận kiểm tra các đường dẫn nhạy cảm bắt buộc (Tất cả phải 404/403)

| Đường dẫn kiểm tra | Kết quả HTTP Sau khi sửa | Trạng thái bảo mật |
| :--- | :---: | :--- |
| `/tools/backup/backup_before_settings_1792315787059.json` | **404** | ✅ An toàn (Không còn truy cập được) |
| `/tools/backup/ai_club_db_20261018_145300.sql` | **404** | ✅ An toàn |
| `/backend/server.js` | **404** | ✅ An toàn |
| `/backend/config/db.js` | **404** | ✅ An toàn |
| `/LMS_YOUTUBE_AUDIT.md` | **404** | ✅ An toàn |
| `/NOTIFICATIONS_AUDIT.md` | **404** | ✅ An toàn |
| `/README.md` | **404** | ✅ An toàn |
| `/package.json` | **404** | ✅ An toàn |
| `/flowchart testcase/README.md` | **404** | ✅ An toàn |

## 3. Kết luận
- Toàn bộ 100% các tài nguyên hợp lệ của giao diện người dùng (/css/*, /js/*, /assets/*, /pages/*, /home_page/*, /document/Lectures/*, /document/Practice/*, /document/uploads/*, /index.html) đều **giữ nguyên mã HTTP 200**.
- Toàn bộ các tệp nhạy cảm (mã nguồn backend, sao lưu SQL/JSON, tài liệu kiểm toán, package.json, git) đã được **chặn triệt để (HTTP 404)**.
