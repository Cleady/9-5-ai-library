# MAD101 — Discrete Mathematics Studio (Version 2.0)

Ứng dụng luyện thi trắc nghiệm môn **Toán Rời Rạc (MAD101)** cho sinh viên Đại học FPT.  
Dựa trên giáo trình *Discrete Mathematics and Its Applications* (Kenneth H. Rosen), bao gồm **1,131 câu hỏi** trắc nghiệm được phân loại theo 8 chương.

---

## 1. Điểm nổi bật của Bản Nâng Cấp 2.0

- **Thuần HTML/CSS/JS (Vanilla & ES Modules):** Không sử dụng framework nặng, không phụ thuộc Tailwind hay Bootstrap.
- **Phong cách Thiết kế Công nghệ Cao (Dark Tech Glassmorphism):**
  - Nền xanh than cực đậm (`#060a12`) phủ lưới vi tính (Grid overlay 36x36px).
  - Thẻ kính mờ (`backdrop-filter: blur(12px)`), viền bán trong suốt 1px và đổ bóng nhẹ.
  - Điểm nhấn màu cam rực rỡ (`#f97316`).
  - Hỗ trợ chuyển đổi chế độ **Sáng / Tối** (Dark / Light) mượt mà.
- **MathJax Cục Bộ & An Toàn (100% Offline):**
  - Tích hợp cục bộ `vendor/mathjax/tex-svg.js`, không phụ thuộc CDN, hoạt động không cần mạng Internet.
  - Công thức toán LaTeX tự động kế thừa màu chữ theo theme (không bị lỗi chữ đen trên nền tối).
  - Tự động cuộn ngang trong khối công thức dài trên điện thoại.
- **Khối mã giả thuật toán (Pseudo-code):** Nền tối đậm, font `JetBrains Mono` / monospace sắc nét.
- **Bảo toàn dữ liệu người dùng:**
  - Tự động nhận diện và đọc dữ liệu cũ (`quiz_progress`, `quiz_practice_state`).
  - Tự động tạo bản sao lưu an toàn sang `mad101_legacy_backup`.
- **Hỗ trợ PWA Cài Đặt:** Đăng ký Service Worker (`sw.js`) và Manifest (`manifest.webmanifest`) giúp cài đặt trực tiếp vào màn hình chính điện thoại và máy tính.
- **Bảo tồn Giao diện Cũ:** Toàn bộ mã nguồn cũ được lưu trữ nguyên vẹn trong thư mục `legacy/`.

---

## 2. Cấu Trúc Thư Mục Dự Án

```
MAD101 - Ultra Ultimate Edition/
├── index.html                   # Giao diện chính thức mới (App Shell)
├── manifest.webmanifest         # Cấu hình PWA cài đặt ứng dụng
├── sw.js                        # Service Worker quản lý cache offline
├── questions_data.js            # Dữ liệu 1,131 câu hỏi gốc
├── questions_raw.json           # Dữ liệu JSON câu hỏi
├── chapter_mapping.json         # Bản đồ phân loại câu hỏi theo 8 chương
│
├── ui/                          # Hệ thống Thiết kế (Design System)
│   ├── tokens.css               # Định nghĩa duy nhất toàn bộ biến CSS (màu, font, spacing)
│   ├── base.css                 # Reset, Tech Grid Pattern, Typography, MathJax rules
│   └── components.css           # Thẻ kính, nút, badge, thanh tiến độ, modal, accordion
│
├── js/                          # Mã nguồn Logic Ứng dụng (ES Modules)
│   ├── app.js                   # Điểm khởi chạy ứng dụng (Entry Point)
│   ├── router.js                # Client Hash Router (#/home, #/setup, #/quiz...)
│   ├── store.js                 # Quản lý LocalStorage, migrate và lưu trữ lịch sử
│   ├── data.js                  # Hợp nhất dữ liệu Schema v2 và fallback ảnh câu hỏi
│   ├── mathjax-render.js        # Module typeset MathJax an toàn, chống giật layout
│   └── screens/                 # Các màn hình chức năng
│       ├── home.js              # Trang chủ: Lưới 8 chương, thống kê, tiếp tục bài dở
│       ├── setup.js             # Cấu hình đề thi: Chọn chương, số câu, tính giờ, xáo trộn
│       ├── quiz.js              # Màn làm bài (Core): 2 cột desktop, phím tắt, code, MathJax
│       ├── result.js            # Kết quả: Điểm số, biểu đồ 8 chương, ôn lại câu sai
│       ├── history.js           # Lịch sử bài thi và sổ tay câu đã đánh dấu
│       └── settings.js          # Cài đặt Theme, MathJax font size, sao lưu JSON
│
├── vendor/                      # Thư viện cục bộ (Không CDN)
│   └── mathjax/
│       └── tex-svg.js           # Bộ dựng công thức toán MathJax 3 (SVG offline)
│
├── data/
│   └── v2/
│       └── questions_sample_v2.json # Dữ liệu thử nghiệm chuẩn Schema v2
│
├── ui-preview/                  # 3 Màn hình mẫu HTML tĩnh đã dựng ở Giai đoạn 1
│   ├── home.html                # Preview Trang chủ
│   ├── quiz.html                # Preview Làm bài (có công thức toán + khối code)
│   ├── result.html              # Preview Báo cáo kết quả
│   └── preview.css              # CSS của bản preview
│
└── legacy/                      # Thư mục lưu trữ giao diện cũ nguyên bản
    ├── index.html               # Bản cũ phân loại theo chương
    ├── quiz_practice.html       # Bản cũ luyện tập tổng hợp
    ├── questions_data.js        # Dữ liệu cũ
    └── README.md                # Hướng dẫn mở nhanh giao diện cũ
```

---

## 3. Cách Tùy Biến Theme (Design Tokens)

Tất cả màu sắc, khoảng cách, bo góc và hiệu ứng bóng đổ được định nghĩa tại file [`ui/tokens.css`](file:///c:/Users/anhqu/Documents/FPTU%20-%20Artificial%20Intelligent/SOURCE/MAD101%20-%20Ultra%20Ultimate%20Edition/ui/tokens.css).

- Muốn đổi màu nhấn chính (Accent):
  Thay đổi giá trị biến:
  ```css
  --ui-accent: #f97316; /* Cam mặc định */
  --ui-accent-hover: #ea580c;
  ```
- Muốn đổi độ mờ nền thẻ kính (Glass Card):
  Thay đổi giá trị biến:
  ```css
  --ui-bg-glass-card: rgba(17, 28, 51, 0.65);
  --ui-blur-glass: blur(12px);
  ```

---

## 4. Cách Thêm Một Màn Hình Mới

1. Tạo file render màn hình trong `js/screens/ten_man_hinh.js`:
   ```javascript
   export function renderMyScreen(container, params) {
     container.innerHTML = `<h1>Màn hình mới</h1>`;
   }
   ```
2. Mở file [`js/app.js`](file:///c:/Users/anhqu/Documents/FPTU%20-%20Artificial%20Intelligent/SOURCE/MAD101%20-%20Ultra%20Ultimate%20Edition/js/app.js) và đăng ký route với Router:
   ```javascript
   import { renderMyScreen } from './screens/ten_man_hinh.js';
   router.register('ten_route', (el, params) => renderMyScreen(el, params));
   ```
3. Truy cập màn hình qua hash URL: `index.html#/ten_route`.

---

## 5. Danh Sách Các Key Lưu Trữ (Storage Keys)

| Key | Định dạng | Mục đích |
|---|---|---|
| `mad101_v2_profile` | JSON | Hồ sơ người dùng: Lịch sử thi, sổ câu đánh dấu sao, sổ câu sai tích lũy, cài đặt. |
| `mad101_v2_active_session` | JSON | Tự động lưu bài thi đang làm dở (câu hiện tại, câu đã chọn, thời gian còn lại). |
| `mad101_legacy_backup` | JSON | Bản snapshot sao lưu dữ liệu nguyên bản từ phiên bản trước. |
| `quiz_progress` | JSON | Duy trì tương thích ngược 100% với giao diện cũ (`legacy/index.html`). |

---

## 6. Hướng Dẫn Quay Lại Giao Diện Cũ (Legacy)

Nếu cần đối chiếu hoặc sử dụng lại giao diện trước đây:
- Nhấp đúp mở file [`legacy/index.html`](file:///c:/Users/anhqu/Documents/FPTU%20-%20Artificial%20Intelligent/SOURCE/MAD101%20-%20Ultra%20Ultimate%20Edition/legacy/index.html).
- Hoặc mở mục **Cài đặt** trong ứng dụng mới và bấm nút **"Mở Giao Diện Cũ"**.
