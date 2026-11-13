# MA TRẬN ĐỘ PHỦ KIỂM THỬ BẢN 1 (COVERAGE_MATRIX_v1.md)

**Dự án:** 9-5-ai-library  
**Phiên bản:** v1  
**Tổng ca kiểm thử:** 290 ca  

---

## 1. THỐNG KÊ TỔNG QUAN PHÂN PHỐI TEST CASE

| Phân nhóm | Chỉ số thống kê |
|:---|:---|
| **Theo Module** | AUTH: 20, ROLE: 16, HOME: 16, LMS: 22, PRACTICE: 35, COMMUNITY: 40, RESOURCES: 20, NOTIFICATIONS: 20, SETTINGS: 24, ADMIN: 30, THEME: 4, RESPONSIVE: 3, A11Y: 3, SECURITY: 20, DATA: 5, PERF: 2, COMPAT: 2, LECTURES: 8 |
| **Theo Mức ưu tiên** | P0: 80, P1: 75, P2: 134, P3: 1 |
| **Theo Trạng thái** | Pass: 81, Not run: 181, Fail: 28 |

---

## 2. MA TRẬN PHỦ PHÁT HIỆN LỖI (FINDING × TEST CASE)

| Mã Finding | Mức độ | Nhóm | Mô tả ngắn | Test Case liên kết tái hiện / kiểm thử |
|:---|:---:|:---:|:---|:---|
| `F-001` | **Critical** | Security | Lộ lọt backup JSON và tài liệu nội bộ qua express.static | `TC-SEC-001, TC-SEC-002` |
| `F-002` | **Critical** | Security | Stored XSS trong bình luận bài giảng | `TC-SEC-003, TC-LMS-014, TC-LMS-015, TC-DAT-002` |
| `F-003` | **Critical** | Security | Leo thang đặc quyền: Admin có thể hạ bệ/khoá Owner | `TC-SEC-004, TC-ROL-005, TC-ADM-006` |
| `F-004` | **High** | Security | Bỏ qua email xác nhận khi xoá tài khoản | `TC-SEC-005, TC-SET-005` |
| `F-005` | **High** | Security | JWT Token vẫn hợp lệ sau khi user bị banned | `TC-SEC-006, TC-AUTH-004` |
| `F-006` | **High** | Security | Video bài giảng phục vụ công khai qua HTTP GET | `TC-SEC-007, TC-LMS-010` |
| `F-007` | **High** | Security | Thiếu Rate Limiting chống dò mật khẩu brute force | `TC-SEC-008, TC-AUTH-018` |
| `F-008` | **High** | Security | CORS mở toàn bộ và thiếu CSP/X-Frame-Options | `TC-SEC-007, TC-SEC-008` |
| `F-009` | **High** | Logic | auth-guard.js chỉ có trên index.html, thiếu ở 27 trang con | `TC-AUTH-013` |
| `F-010` | **High** | Data | 60 đề thi trắc nghiệm rỗng trong practice-data.js | `TC-PRC-005` |
| `F-011` | **High** | Data | 39 câu hỏi bị lỗi đáp án options rỗng và correctIndex sai | `TC-PRC-006` |
| `F-012` | **High** | Logic | Cả 3 bài giảng course 1 đều mang chapter_order = 1 | `TC-LMS-004` |
| `F-013` | **Medium** | Logic | Tiến độ bài giảng chỉ lưu localStorage client, mất khi đổi máy | `TC-LMS-008` |
| `F-014` | **Medium** | Logic | Quên / Đặt lại mật khẩu hoàn toàn là giao diện tĩnh | `TC-AUTH-016, TC-AUTH-017` |
| `F-015` | **Medium** | Logic | Tiến độ thẻ môn trên Home bị lỗi tính toán luôn = 0% | `TC-HOM-003` |
| `F-016` | **Medium** | UX | Trùng DOM ID password/togglePassword trên trang auth | `TC-UI-003` |
| `F-017` | **Medium** | Config | 101 vị trí hardcode http://localhost:3000 | `TC-CONF-001` |
| `F-018` | **Medium** | Perf | practice-data.js nặng 2.41 MB nạp đồng bộ | `TC-PRC-001, TC-PRF-001` |
| `F-019` | **Medium** | Perf | N+1 subqueries đếm like và comment trên feed | `TC-PRF-002` |
| `F-020` | **Low** | Maintain | Tệp rác .pdn, .bak và bản sao (1) trong kho mã | `TC-DAT-003, TC-DAT-004, TC-DAT-005` |
| `F-021` | **Low** | Maintain | Sao chép trùng lặp tệp tex-svg.js 2MB ở 3 thư mục | `TC-DAT-007` |
| `F-022` | **Low** | UX | Nút View all subjects trên Home là link chết href='#' | `TC-HOM-004` |
| `F-023` | **Low** | Maintain | Thư mục document/Practice/Ky_II/AGIc rỗng | `TC-PRC-015` |
| `F-024` | **Low** | Maintain | Git theo dõi tệp sao lưu dữ liệu lớn v2_backup | `TC-DAT-009` |

---

## 3. MA TRẬN PHỦ ENDPOINT BACKEND (ENDPOINT × TEST CASE)

| Method & Endpoint | File Route | Test Case chính phụ trách |
|:---|:---|:---|
| `POST /api/auth/login` | `authRoutes.js` | `TC-AUTH-001, TC-AUTH-002, TC-AUTH-003, TC-AUTH-018` |
| `POST /api/auth/register` | `authRoutes.js` | `TC-AUTH-007, TC-AUTH-008, TC-AUTH-009, TC-AUTH-010` |
| `GET /api/users/me` | `userRoutes.js` | `TC-AUTH-001, TC-ROL-008` |
| `PUT /api/users/profile` | `userRoutes.js` | `TC-SET-001, TC-SET-002` |
| `PUT /api/users/change-password` | `userRoutes.js` | `TC-SET-003, TC-SET-004` |
| `DELETE /api/users/me` | `userRoutes.js` | `TC-SET-005, TC-SEC-005` |
| `GET /api/admin/dashboard` | `dashboardRoutes.js` | `TC-ADM-001` |
| `GET /api/admin/users` | `adminRoutes.js` | `TC-ADM-002, TC-ROL-001, TC-ROL-002` |
| `PUT /api/admin/users/:id` | `adminRoutes.js` | `TC-ADM-003, TC-ADM-004, TC-ROL-004, TC-ROL-005` |
| `GET /api/admin/reports` | `moderationRoutes.js` | `TC-ADM-007` |
| `PUT /api/admin/reports/:id` | `moderationRoutes.js` | `TC-ADM-008` |
| `GET /api/lms/courses` | `lmsRoutes.js` | `TC-LMS-001` |
| `GET /api/lms/lectures/:id` | `lmsRoutes.js` | `TC-LMS-002, TC-LMS-003` |
| `GET /api/lms/youtube-info` | `lmsRoutes.js` | `TC-LMS-012, TC-LMS-013` |
| `POST /api/lms/upload-video` | `lmsRoutes.js` | `TC-LMS-019, TC-LMS-020` |
| `POST /api/lms/lectures/:id/comments` | `lmsRoutes.js` | `TC-LMS-014, TC-LMS-015, TC-SEC-003` |
| `DELETE /api/lms/comments/:id` | `lmsRoutes.js` | `TC-LMS-016, TC-LMS-017, TC-LMS-018` |
| `GET /api/community/posts` | `communityRoutes.js` | `TC-COM-001, TC-PRF-002` |
| `POST /api/community/posts` | `communityRoutes.js` | `TC-COM-002, TC-COM-003, TC-COM-004` |
| `PUT /api/community/posts/:id/pin` | `communityRoutes.js` | `TC-COM-011, TC-COM-012` |
| `POST /api/community/posts/:id/like` | `communityRoutes.js` | `TC-COM-007` |
| `POST /api/community/posts/:id/comments` | `communityRoutes.js` | `TC-COM-008` |
| `POST /api/community/report` | `communityRoutes.js` | `TC-COM-013` |
| `GET /api/resources` | `resourceRoutes.js` | `TC-RES-001` |
| `POST /api/resources` | `resourceRoutes.js` | `TC-RES-002, TC-RES-003, TC-RES-004` |
| `GET /api/resources/:id/download` | `resourceRoutes.js` | `TC-RES-005` |
| `DELETE /api/resources/:id` | `resourceRoutes.js` | `TC-RES-007, TC-RES-008, TC-RES-009` |
| `GET /api/community/notifications/unread-count` | `communityRoutes.js` | `TC-NOT-001, TC-NOT-002` |
| `POST /api/community/notifications/read-all` | `communityRoutes.js` | `TC-NOT-005, TC-NOT-006` |
| `GET /api/favorites` | `favoriteRoutes.js` | `TC-ROL-013` |
| `POST /api/favorites/toggle` | `favoriteRoutes.js` | `TC-HOM-007, TC-RES-010` |
| `PUT /api/admin/settings` | `settingsRoutes.js` | `TC-ROL-006, TC-ADM-009` |

---

## 4. DANH SÁCH CÁC KHU VỰC CHƯA THỂ PHỦ HOẶC CHƯA KIỂM CHỨNG TRỰC TIẾP

1. **Các thao tác ghi CSDL nhạy cảm (Ghi mới / Sửa / Xoá thật):**
   - `POST /api/auth/register` tạo người dùng mới.
   - `DELETE /api/users/me` xoá vĩnh viễn tài khoản trong CSDL.
   - `POST /api/lms/upload-video` tải tệp lớn 1GB lên ổ đĩa.
   - *Lý do:* Tuân thủ Quy tắc An toàn Bắt buộc của dự án (Chỉ chạy truy vấn SELECT, không INSERT/UPDATE/DELETE/ALTER, không sửa đổi dữ liệu thật).

2. **Luồng quên và đặt lại mật khẩu bằng Email:**
   - *Lý do:* Chưa có backend implementation (chỉ là giao diện tĩnh mock).

3. **Tương tác thời gian thực trên đa trình duyệt vật lý khác nhau:**
   - *Lý do:* Khảo sát tĩnh và chạy thử trên một môi trường máy cục bộ; các ca đa trình duyệt cần môi trường QA kiểm thử tương tác thực tế.
