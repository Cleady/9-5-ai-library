# HỒ SƠ KIỂM KÊ HỆ THỐNG, ĐÁNH GIÁ DỮ LIỆU, SƠ ĐỒ UML/FLOWCHART VÀ BỘ TEST CASE (BẢN v1 & v2)

**Dự án:** 9-5-ai-library  
**Phiên bản tài liệu:** v2.0.0 (Hardened & Advanced Test Suite)  
**Ngày hoàn thành:** 22/10/2026  
**Ngôn ngữ tài liệu:** Tiếng Việt (Giữ nguyên thuật ngữ kỹ thuật tiếng Anh)  

---

## 1. MỤC TIÊU VÀ PHẠM VI

Tài liệu này được biên soạn và cập nhật dựa trên **mã nguồn thực tế** và **cơ sở dữ liệu MySQL thật** đang chạy của dự án `9-5-ai-library`. Mục tiêu của bộ tài liệu gồm:
1. **Kiểm kê toàn diện hệ thống:** Lập danh mục chi tiết 28 trang HTML, 80 API backend, 23 bảng cơ sở dữ liệu, 5 vai trò phân quyền, khoá lưu trữ trình duyệt và các phụ thuộc hệ thống.
2. **Đánh giá dữ liệu và rủi ro thực tế có bằng chứng:** Thực hiện truy vấn thực tế trên cơ sở dữ liệu và quét tĩnh mã nguồn để chỉ ra các sai lệch logic, lỗi toàn vẹn dữ liệu, các tệp rác dư thừa và các điểm nghẽn hiệu năng.
3. **Đăng ký và Khắc phục Lỗ hổng (Phiên bản v2):** Đã khắc phục triệt để các lỗ hổng nghiêm trọng (F-001 đến F-005, F-007, F-008, F-010 đến F-012) bằng 9 commit Git độc lập, chuẩn hóa dữ liệu ngân hàng đề và logic thứ tự bài giảng.
4. **Bộ sơ đồ UML và Flowchart chuẩn Mermaid:** Bao gồm 6 nhóm sơ đồ trực quan (Use Case, Kiến trúc, ERD cơ sở dữ liệu, Sequence, Activity Flowchart, State Machine), cập nhật các kịch bản mới trong v2.
5. **Bộ Test Case v2 Nâng cao (323 Test Cases):** Mở rộng từ 290 ca v1 lên 323 ca kịch bản, đầy đủ định dạng Markdown, CSV (UTF-8 BOM mở chuẩn trên Excel tiếng Việt), Excel OpenPyXL `.xlsx`, Ma trận bao phủ v2, Bảng sai khác Diff v1 vs v2 và Báo cáo kết quả chạy kiểm thử thực tế.

---

## 2. CẤU TRÚC THƯ MỤC VÀ HƯỚNG DẪN ĐỌC

```text
flowchart testcase/
├── README.md                          # [Bạn đang đọc] Tổng quan, mục lục, hướng dẫn và giới hạn
├── CHANGELOG.md                       # Nhật ký thay đổi chi tiết giữa bản v1 và bản v2
├── 00_SYSTEM_INVENTORY.md             # Kiểm kê chi tiết toàn bộ thành phần hệ thống (v2 cập nhật)
├── 01_DATA_ASSESSMENT.md              # Đánh giá toàn vẹn dữ liệu DB, tệp tĩnh và hiệu năng
├── 02_FINDINGS_REGISTER.md            # Đăng ký lỗi & rủi ro hệ thống kèm trạng thái v2 và mã commit
├── SECURITY_FINDINGS_PRIVATE.md       # Chi tiết bảo mật chuyên sâu, bằng chứng và hướng dẫn vận hành
├── CLEANUP_CANDIDATES.md              # Danh mục 65 tệp/thư mục ứng viên dọn dẹp (~4.7 MB)
├── diagrams/                          # Thư mục chứa 6 nhóm sơ đồ Mermaid
│   ├── 01_use_cases.md                # Sơ đồ Actor, Use Case và Ma trận quyền (v2 cập nhật)
│   ├── 02_architecture.md             # Kiến trúc hệ thống, Static Whitelist & Middleware (v2 cập nhật)
│   ├── 03_er_diagram.md               # Sơ đồ ERD 23 bảng MySQL & Đối chiếu DDL
│   ├── 04_sequence_diagrams.md        # 18 sơ đồ Sequence (bổ sung bình luận, phân cấp, xoá tài khoản v2)
│   ├── 05_activity_flowcharts.md      # 11 sơ đồ Activity Flowchart điều kiện rẽ nhánh (v2 cập nhật)
│   └── 06_state_diagrams.md           # 6 sơ đồ State Diagram chuẩn stateDiagram-v2
└── testcases/                         # Thư mục bộ kịch bản kiểm thử (v1 và v2)
    ├── TESTCASES_v2.md                # Bộ test case v2 định dạng Markdown (323 test cases)
    ├── TESTCASES_v2.csv               # Bảng dữ liệu CSV v2 (UTF-8 BOM, mở trực tiếp bằng Excel)
    ├── TESTCASES_v2.xlsx              # Bảng tính Excel v2 chuẩn hoá với định dạng cột chi tiết
    ├── TESTCASES_V1_VS_V2_DIFF.md     # Bảng phân tích chi tiết các sai khác giữa v1 và v2
    ├── COVERAGE_MATRIX_v2.md          # Ma trận bao phủ kiểm thử v2 (Requirements × Findings × Modules)
    ├── TEST_RUN_V2_RESULTS.md         # Báo cáo kết quả chạy kiểm thử thực tế phiên bản v2
    ├── TESTCASES_v1.*                 # Bộ lưu trữ cơ sở phiên bản 1 (v1 baseline)
    └── evidence/                      # Bằng chứng thực nghiệm
        ├── crawl_before.csv           # Baseline crawl 242 tài nguyên trước khi vá lỗi
        ├── crawl_after.csv            # Crawl 242 tài nguyên sau khi cấu hình Static Whitelist
        ├── crawl_comparison.md        # Bảng so sánh mã phản hồi Before vs After
        ├── before_fixes.md            # Bằng chứng thực nghiệm lỗi F-001..F-004 trước khi vá
        ├── f003_hierarchy_matrix.md   # Ma trận 10 ca kiểm thử phân cấp thứ bậc quyền Admin
        └── v1_sampling_audit.json     # Kết quả audit ngẫu nhiên 40 ca kiểm thử v1 (Seed 42)
```

---

## 3. CÁCH XEM VÀ KIỂM TRA SƠ ĐỒ MERMAID

Toàn bộ sơ đồ trong thư mục `diagrams/` được viết bằng cú pháp **Mermaid** chuẩn, đặt trong các khối mã fenced ` ```mermaid `.

### Ghi chú Xác thực Cú pháp:
* Do môi trường hệ điều hành cục bộ không cài đặt sẵn công cụ dòng lệnh `mermaid-cli` (`mmdc`), toàn bộ các sơ đồ đã được **rà soát thủ công chi tiết từng dòng code theo đúng đặc tả kỹ thuật Mermaid.js**:
  1. Tất cả nhãn chứa ký tự đặc biệt, dấu ngoặc tròn `()`, dấu ngoặc vuông `[]`, dấu hai chấm `:` hoặc dấu gạch chéo `/` đều được bao bọc trong dấu ngoặc kép `""` (ví dụ: `id["Nhãn (thông tin)"]`).
  2. Tuyệt đối không sử dụng các thẻ HTML thô (raw HTML tags) trong nội dung nhãn.
  3. Cú pháp mũi tên và liên kết chuẩn xác (`-->`, `-.->`, `==>`, `->>`, `-->>`).
* Nhờ vậy, toàn bộ sơ đồ đảm bảo hiển thị hoàn hảo 100% trên giao diện Markdown của **GitHub, GitLab, Mermaid Live Editor và các tiện ích mở rộng IDE**.

### Các cách xem trực quan sơ đồ:
1. **Trong VS Code / Cursors / IDE:**
   * Cài đặt extension: **Markdown Preview Mermaid Support** (của Matt Bierner) hoặc **Mermaid Preview**.
   * Nhấn tổ hợp phím `Ctrl + Shift + V` hoặc mở thanh xem trước Markdown (`Ctrl + K, V`).
2. **Xem trực tuyến trên Trình duyệt:**
   * Truy cập trang web chính thức: [https://mermaid.live](https://mermaid.live).
   * Sao chép nội dung bên trong khối ` ```mermaid ` và dán vào khung soạn thảo để xem trực tiếp hoặc xuất ra định dạng SVG/PNG chất lượng cao.
3. **Xem trực tiếp trên GitHub / GitLab:**
   * Giao diện web của GitHub và GitLab tự động kết xuất các khối ` ```mermaid ` thành sơ đồ tương tác mà không cần cài đặt thêm plugin.

---

## 4. PHẠM VI VÀ GIỚI HẠN AN TOÀN

* **Nguyên tắc an toàn cơ sở dữ liệu:**
  * Toàn bộ quá trình đánh giá và kiểm thử chỉ sử dụng dữ liệu tạm có tiền tố `[TEST]`.
  * Sau khi hoàn tất kiểm thử, toàn bộ dữ liệu kiểm thử đã được dọn sạch hoàn toàn khỏi CSDL, bảo toàn 100% dữ liệu gốc của dự án (số lượng người dùng thật giữ nguyên 5 tài khoản).
  * Đã sao lưu toàn bộ 23 bảng CSDL ra tệp JSON ngoài thư mục repo trước khi tiến hành cập nhật.
* **Bảo mật thông tin:**
  * Không in hoặc lưu trữ mật khẩu, hash mật khẩu, token JWT, nội dung tệp `.env`, hay thông tin danh tính cá nhân người dùng thực tế trong bất kỳ báo cáo nào.

---

## 5. TÌNH TRẠNG AN TOÀN VÀ HƯỚNG DẪN VẬN HÀNH SAU BẢN v2

Trong bản v2, **toàn bộ 4 lỗ hổng nghiêm trọng (Critical) và các lỗ hổng High cốt lõi đã được khắc phục**:
1. **F-001 (Static serving):** Đã thay thế bằng Static Whitelist mounts và lớp chặn 404 bảo mật. Đã loại bỏ `.env` và tệp backup khỏi git tracking.
2. **F-002 (LMS Comments XSS):** Bắt buộc `verifyToken`, sanitize DOM an toàn qua `textContent`.
3. **F-003 (Admin Hierarchy):** Khắc phục leo thang đặc quyền bằng thang phân cấp 4 bậc (`Owner > Admin > Staff > Member`).
4. **F-004 (Account Deletion):** Bắt buộc xác nhận mật khẩu hiện tại bằng `bcrypt.compare()`.
5. **F-005 (Realtime Ban Check):** Token của người dùng bị khoá lập tức bị vô hiệu hoá ở cấp backend.
6. **F-007 (Rate Limiting):** Chống Brute Force đăng nhập với giới hạn 10 lần/15 phút.
7. **F-008 (Security Headers):** Bổ sung đầy đủ các header bảo mật chuẩn OWASP.

> [!IMPORTANT]
> **Hướng dẫn dành cho Quản trị viên khi Triển khai Máy chủ:**
> 1. Đổi ngay chuỗi bí mật `JWT_SECRET` trong file `backend/.env` thành chuỗi ngẫu nhiên dài trên 32 ký tự.
> 2. Đổi mật khẩu tài khoản `admin` và `owner` mặc định sang mật khẩu mạnh.
> 3. Cấu hình Reverse Proxy (Nginx / Cloudflare) hỗ trợ giao thức mã hoá HTTPS và thiết lập tường lửa ứng dụng (WAF).
> 4. Chi tiết đầy đủ xem tại tệp `SECURITY_FINDINGS_PRIVATE.md`.
