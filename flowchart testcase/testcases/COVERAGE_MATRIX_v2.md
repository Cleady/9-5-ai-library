# MA TRẬN BAO PHỦ KIỂM THỬ BẢN 2.1 (COVERAGE MATRIX v2.1)

Thời gian cập nhật: 2026-10-23 10:30:00  
Tổng số kịch bản kiểm thử: **331** (Trong đó: **329 Active**, **1 Obsolete**, **1 Planned**)  
Tổng số module bao phủ: **21 Active Modules + 1 Obsolete Module**  

---

## 1. Ma Trận Bao Phủ Theo Phân Nhóm Tính Năng (Active Test Cases)

| STT | Module | Số lượng Test Case | P0 (Blocker) | P1 (High) | P2 (Medium) | P3 (Low) | Tỷ lệ tự động hóa | Trạng thái an ninh & dữ liệu |
| :---: | :--- | :---: | :---: | :---: | :---: | :---: | :---: | :--- |
| 1 | **A11Y** | 3 | 0 | 3 | 0 | 0 | 0% | ✅ Đã kiểm soát |
| 2 | **ADMIN** | 30 | 0 | 10 | 20 | 0 | 3.3% | ✅ Đã kiểm soát |
| 3 | **AUTH** | 20 | 7 | 8 | 5 | 0 | 0% | ✅ Đã kiểm soát |
| 4 | **COMMUNITY** | 41 | 0 | 16 | 25 | 0 | 2.4% | ✅ Đã kiểm soát |
| 5 | **COMPAT** | 5 | 0 | 2 | 3 | 0 | 60% | ✅ Đã kiểm soát |
| 6 | **DATA** | 7 | 2 | 2 | 3 | 0 | 42.9% | ✅ Đã kiểm soát |
| 7 | **HISTORY** | 4 | 0 | 2 | 2 | 0 | 100% | ✅ Đã kiểm soát |
| 8 | **HOME** | 20 | 0 | 11 | 9 | 0 | 20% | ✅ Đã kiểm soát |
| 9 | **LECTURES** | 8 | 0 | 0 | 8 | 0 | 0% | ✅ Đã kiểm soát |
| 10 | **LECTURES-YT** | 4 | 0 | 3 | 1 | 0 | 100% | ✅ Đã kiểm soát |
| 11 | **LMS** | 23 | 3 | 18 | 2 | 0 | 13.0% | ✅ Đã kiểm soát |
| 12 | **NOTIFICATIONS** | 20 | 0 | 5 | 15 | 0 | 0% | ✅ Đã kiểm soát |
| 13 | **PERF** | 2 | 0 | 2 | 0 | 0 | 0% | ✅ Đã kiểm soát |
| 14 | **PRACTICE** | 37 | 0 | 15 | 21 | 1 | 0% | ✅ Đã kiểm soát |
| 15 | **PRACTICE-MATH** | 4 | 1 | 2 | 1 | 0 | 100% | ✅ Đã kiểm soát |
| 16 | **RESOURCES** | 21 | 1 | 10 | 10 | 0 | 4.8% | ✅ Đã kiểm soát |
| 17 | **RESPONSIVE** | 3 | 0 | 3 | 0 | 0 | 0% | ✅ Đã kiểm soát |
| 18 | **ROLE** | 16 | 0 | 16 | 0 | 0 | 6.3% | ✅ Đã kiểm soát |
| 19 | **SECURITY** | 29 | 23 | 6 | 0 | 0 | 44.8% | ✅ Đã kiểm soát |
| 20 | **SETTINGS** | 24 | 0 | 6 | 18 | 0 | 4.2% | ✅ Đã kiểm soát |
| 21 | **THEME** | 8 | 0 | 5 | 2 | 1 | 50% | ✅ Đã kiểm soát |
| | **TỔNG CỘNG ACTIVE** | **329** | **37** | **145** | **145** | **2** | **14.9%** | ✅ An toàn & Ổn định |
| *22* | *PAYMENT (Obsolete)* | *1* | *0* | *0* | *0* | *1* | *0%* | *Chưa có router/bảng DB* |
| *23* | *PRACTICE (Planned)* | *1* | *0* | *0* | *1* | *0* | *0%* | *Kế hoạch lưu điểm qua API* |

---

## 2. Ánh Xạ Kiểm Thử Tới Các Phát Hiện Lỗi & Rủi Ro (Findings Mapping)

| Mã Finding | Mức độ | Trạng thái v2.1 | Test case liên kết chính | Kịch bản hồi quy (Regression) |
| :--- | :---: | :---: | :--- | :--- |
| `F-001` | Critical | **Fixed-Verified** | `TC-SEC-001`, `TC-SEC-002`, `TC-RES-021` | `TC-REG-001`, `TC-SEC-029`, `TC-LMS-023`, `TC-COM-041` |
| `F-002` | Critical | **Fixed-Verified** | `TC-SEC-003`, `TC-SEC-004` | `TC-REG-002`, `TC-REG-003` |
| `F-003` | Critical | **Fixed-Verified** | `TC-ROL-005`, `TC-ADM-008` | `TC-REG-004` |
| `F-004` | High | **Fixed-Verified** | `TC-SET-005`, `TC-SEC-008` | `TC-REG-005` |
| `F-005` | High | **Fixed-Verified** | `TC-AUTH-004`, `TC-SEC-012` | `TC-REG-006` |
| `F-006` | High | **Needs-Decision** | `TC-LMS-006`, `TC-SEC-005` | (Chờ quyết định thiết kế: Cookie HttpOnly vs Signed URL vs Media Token) |
| `F-007` | High | **Fixed-Verified** | `TC-AUTH-008`, `TC-SEC-015` | `TC-REG-007` |
| `F-008` | High / Med | **Fixed-Verified** | `TC-SEC-018`, `TC-SEC-020` | `TC-REG-008` |
| `F-010` | High / Med | **Fixed-Verified** | `TC-PRC-001`, `TC-MTH-004` | `TC-REG-009`, `TC-PRC-036` (Khôi phục 13 câu DBI202) |
| `F-011` | High / Med | **Fixed-Verified** | `TC-PRC-010`, `TC-PRC-011` | `TC-REG-009`, `TC-PRC-037` (Nạp script toán đủ 5 trang) |
| `F-012` | Medium | **Fixed-Verified** | `TC-LMS-004`, `TC-ADM-015` | `TC-REG-010` |
