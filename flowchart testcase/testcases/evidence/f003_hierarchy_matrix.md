# MA TRẬN KIỂM THỬ PHÂN CẤP QUẢN TRỊ NGƯỜI DÙNG (F-003 EVIDENCE)

Quy tắc phân cấp: `owner (4) > admin (3) > staff (2) > member (1)`
Thời gian kiểm thử: 2026-10-22T13:27:06.613Z

| STT | Kịch bản kiểm thử | Actor (Người gọi) | Target (Đối tượng) | Payload | Mã HTTP | Kỳ vọng | Kết quả | Thông điệp phản hồi |
| :---: | :--- | :---: | :---: | :--- | :---: | :---: | :---: | :--- |
| 1 | Admin hạ bệ Owner | `admin` | `owner` | `{"role":"member"}` | **403** | 403 | ✅ PASS | Bạn chỉ có quyền thao tác trên người dùng có cấp bậc thấp hơn bạn |
| 2 | Admin khoá (ban) Owner | `admin` | `owner` | `{"status":"banned"}` | **403** | 403 | ✅ PASS | Bạn chỉ có quyền thao tác trên người dùng có cấp bậc thấp hơn bạn |
| 3 | Admin sửa Admin khác | `admin` | `admin` | `{"status":"banned"}` | **403** | 403 | ✅ PASS | Không thể tự thay đổi vai trò hoặc trạng thái của chính mình |
| 4 | Admin tự sửa chính mình | `admin` | `admin` | `{"role":"owner"}` | **403** | 403 | ✅ PASS | Không thể tự thay đổi vai trò hoặc trạng thái của chính mình |
| 5 | Admin gán vai trò ngang cấp (Admin) | `admin` | `member` | `{"role":"admin"}` | **403** | 403 | ✅ PASS | Không thể gán vai trò bằng hoặc cao hơn cấp bậc của bạn |
| 6 | Admin hạ Staff xuống Member | `admin` | `staff` | `{"role":"member"}` | **200** | 200 | ✅ PASS | Thành công |
| 7 | Admin khoá Member | `admin` | `member` | `{"status":"banned"}` | **200** | 200 | ✅ PASS | Thành công |
| 8 | Owner gán Staff thành Admin | `owner` | `staff` | `{"role":"admin"}` | **200** | 200 | ✅ PASS | Thành công |
| 9 | Staff gọi API quản trị | `staff` | `member` | `{"status":"banned"}` | **403** | 403 | ✅ PASS | You không có quyền Quản trị viên để thực hiện hành động này |
| 10 | Member gọi API quản trị | `member` | `member` | `{"status":"banned"}` | **403** | 403 | ✅ PASS | You không có quyền Quản trị viên để thực hiện hành động này |
