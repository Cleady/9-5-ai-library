import json
import os

with open('scratch/comprehensive_image_analysis.json', 'r', encoding='utf-8') as f:
    full_data = json.load(f)

with open('scratch/detailed_pairs.json', 'r', encoding='utf-8') as f:
    detailed_pairs = json.load(f)

file_info = full_data['file_info']
dup_redundant = full_data['dup_redundant']

# Collect duplicate details
# We have 1139 duplicate redundant files
# 8 in legacy/archived_converted_images
# 1131 in chapters/
legacy_dups = []
chapters_dups = []
for d in dup_redundant:
    k = d['keeper']
    for r in d['redundant']:
        sz = file_info[r]['size']
        if 'legacy' in r:
            legacy_dups.append((r, k, sz))
        else:
            chapters_dups.append((r, k, sz))

# Markdown generation
md = []
md.append("# KẾ HOẠCH DỌN DẸP DỰ ÁN & QUÉT PHÂN LOẠI ẢNH THỪA (_cleanup_plan.md)")
md.append("\n> **Thời gian tạo:** 2026-10-17 22:15  ")
md.append("> **Trạng thái:** BƯỚC 1 - LẬP KẾ HOẠCH & DỪNG CHỜ DUYỆT (Chưa di chuyển hay xóa bất kỳ file nào)")
md.append("\n---\n")

md.append("## 1. NGUYÊN TẮC AN TOÀN TUYỆT ĐỐI")
md.append("- **TUYỆT ĐỐI KHÔNG ĐỤNG:** Toàn bộ ảnh câu hỏi gốc và hình vẽ phụ của đề cho tới khi người dùng duyệt xong hoàn tất dữ liệu v2.")
md.append("- **TUYỆT ĐỐI KHÔNG XÓA:** Thư mục dữ liệu `data/v2/`, các file đáp án `answers.*`, `questions_raw.json`, `questions_data.js` và các script xử lý dữ liệu.")
md.append("- **QUY TRÌNH 3 BƯỚC BẮT BUỘC:**")
md.append("  1. **Bước 1 (Hiện tại):** Quét, so hash SHA-256, đối chiếu từng cặp ảnh, phân nhóm A/B/C và xuất bản kế hoạch chi tiết.")
md.append("  2. **Bước 2 (Chờ duyệt):** Sau khi người dùng duyệt Bước 1, chỉ di chuyển các file Nhóm A vào thư mục cách ly `_cleanup_quarantine/<YYYYMMDD_HHMMSS>/`. Mở app test ít nhất 30 câu ngẫu nhiên, kiểm tra 0 lỗi 404 image request, so khớp 100% số lượng ảnh tham chiếu.")
md.append("  3. **Bước 3 (Xóa vĩnh viễn):** CHỈ chạy khi người dùng nhắn đúng cú pháp `\"xóa vĩnh viễn\"`, in danh sách mục cách ly và yêu cầu người dùng xác nhận lại bằng cụm `\"đồng ý xóa\"`. Sau đó chỉ xóa bên trong thư mục cách ly chỉ định.")

md.append("\n---\n")
md.append("## 2. TỔNG HỢP KẾT QUẢ QUÉT TOÀN BỘ DỰ ÁN")
md.append(f"- **Tổng số file ảnh trong dự án:** {full_data['total_count']} file (gồm .png và .webp)")
md.append(f"- **Số file ảnh đang được `questions_data.js` tham chiếu trực tiếp:** 1,131 câu (1,067 file .png + 64 file .webp)")
md.append(f"- **Số nhóm trùng hash SHA-256 tuyệt đối (100% identical byte-for-byte):** {full_data['dup_groups_count']} nhóm ({len(legacy_dups) + len(chapters_dups)} file bản sao thừa)")
md.append(f"- **Số cặp ảnh cùng ID (.png và .webp):** {len(detailed_pairs)} cặp")
md.append(f"- **Số ảnh hỏng / 0-byte:** 0 file")
md.append(f"- **Số ảnh do agent sinh ra (preview/screenshot):** 0 file")
md.append(f"- **Số ảnh quá khổ (> 300 KB):** 2 file (được bảo lưu, chờ quyết định nén)")

md.append("\n---\n")
md.append("## 3. PHÂN LOẠI ỨNG VIÊN DỌN DẸP (NHÓM A / NHÓM B / NHÓM C)")

md.append("\n### 3.1. NHÓM A — AN TOÀN TUYỆT ĐỐI ĐỂ CÁCH LY (Sau khi người dùng duyệt)")
md.append("*Bản sao trùng hash SHA-256 của các ảnh gốc, hoàn toàn không được dữ liệu tham chiếu, an toàn 100%:*")
md.append("\n| STT | File thừa (Ứng viên cách ly) | Bản giữ lại (Gốc đang tham chiếu) | Dung lượng | SHA-256 (rút gọn) | Ghi chú |")
md.append("|:---:|:---|:---|:---:|:---:|:---|")
for idx, (r, k, sz) in enumerate(legacy_dups, 1):
    h = file_info[r]['hash'][:12]
    md.append(f"| {idx} | `{r}` | `{k}` | {sz/1024:.1f} KB | `{h}...` | Bản sao trong legacy do phiên làm việc trước sao lưu |")
md.append(f"\n> **Tiểu kế Nhóm A:** {len(legacy_dups)} file — **Tổng dung lượng thu hồi:** {sum(x[2] for x in legacy_dups)/1024:.1f} KB (~0.26 MB)")

md.append("\n---\n")
md.append("### 3.2. NHÓM B — CẦN XÁC NHẬN RIÊNG TỪ NGƯỜI DÙNG (Dự kiến thu hồi 50.12 MB)")
md.append("*Toàn bộ 1,131 file ảnh trong thư mục `chapters/` có hash SHA-256 TRÙNG KHỚP 100% với 1,131 file ảnh tại thư mục gốc:*")
md.append("\n- **Nguồn gốc:** Do script `classify_by_search.js` chạy trước đây để phân loại ảnh theo folder chương.")
md.append("- **Hiện trạng tham chiếu:** Mã nguồn `index.html` và `app.bundle.js` tải ảnh qua `questions_data.js`, tất cả đều trỏ vào thư mục gốc `0001_q001_Question_1.png`... (KHÔNG hề dùng tiền tố `chapters/`).")
md.append("- **Nguyên tắc an toàn:** Dù trùng hash 100%, nhưng vì đây là ảnh câu hỏi, tuân thủ nguyên tắc *'TUYỆT ĐỐI KHÔNG ĐỤNG ảnh câu hỏi gốc cho tới khi duyệt xong v2'*, chúng tôi xếp 1,131 file này vào **NHÓM B** (Bảo lưu chờ ý kiến người dùng).")
md.append("\n**Phân bổ 1,131 file trùng hash theo từng chương:**")
md.append("\n| Thư mục chương | Số lượng file trùng hash | Dung lượng trùng thừa | Bản giữ lại tương ứng |")
md.append("|:---|:---:|:---:|:---|")
ch_dirs = {}
for r, k, sz in chapters_dups:
    d = os.path.dirname(r)
    if d not in ch_dirs:
        ch_dirs[d] = {'count': 0, 'size': 0}
    ch_dirs[d]['count'] += 1
    ch_dirs[d]['size'] += sz

for d, v in sorted(ch_dirs.items()):
    md.append(f"| `{d}` | {v['count']} file | {v['size']/(1024*1024):.2f} MB | Thư mục gốc `.` (đang nạp trong app) |")
md.append(f"| **TỔNG CỘNG** | **1,131 file** | **{sum(v['size'] for v in ch_dirs.values())/(1024*1024):.2f} MB** | |")

md.append("\n---\n")
md.append("### 3.3. NHÓM C — TUYỆT ĐỐI GIỮ LẠI (KHÔNG ĐỤNG)")
md.append("Toàn bộ các tài nguyên sau thuộc diện bảo tồn bắt buộc:")
md.append("1. **1,131 ảnh câu hỏi gốc đang được ứng dụng nạp** (1,067 file .png và 64 file .webp tại thư mục gốc).")
md.append("2. **105 cặp ảnh .png vs .webp cùng ID câu hỏi:**")
md.append("   - Đã mở và kiểm tra trực quan từng cặp bằng PIL/Pixel Diff.")
md.append("   - **Kết quả đối chiếu:** KHÔNG CÓ cặp nào là bản sao của nhau (toàn bộ diff MSE > 400).")
md.append("   - **Hiện trạng:** 41 file `.png` là câu hỏi MAD101 chính thức (được app dùng), trong khi file `.webp` cùng ID là ảnh đề môn khác (OSG201). Ngược lại, 64 file `.webp` là câu hỏi MAD101 kèm đồ thị/hình vẽ (được app dùng), trong khi file `.png` cùng ID là ảnh câu hỏi OSG201.")
md.append("   - **Kết luận:** Giữ lại toàn bộ 105 cặp trong **NHÓM C** để đảm bảo không thất thoát bất kỳ hình vẽ đề thi nào.")
md.append("3. **Các file tài nguyên dữ liệu và script:** `data/v2/`, `answers.json`, `answers.csv`, `answers.txt`, `questions_raw.json`, `questions_data.js`, `manifest.webmanifest`, `sw.js`, `ui/tokens.css`, `ui/base.css`, `ui/components.css`, `app.bundle.js`, `classify_by_search.js`, `classify_by_gemini.js`, `fix_answers.js`, `generate_index.js`.")

md.append("\n---\n")
md.append("## 4. CHI TIẾT ĐỐI CHIẾU 105 CẶP ẢNH CÙNG ID (.png vs .webp)")
md.append("\n*Toàn bộ 105 cặp đã được quét và xác minh. Dưới đây là bảng trích lục 25 cặp tiêu biểu:*")
md.append("\n| ID Câu | File .PNG | Dung lượng .PNG | File .WEBP | Dung lượng .WEBP | File đang nạp trong App | Kết luận trực quan | Phân nhóm |")
md.append("|:---|:---|:---:|:---|:---:|:---:|:---|:---:|")

for p in detailed_pairs[:25]:
    ref_name = p['png_path'] if p['png_in_v1'] else p['webp_path']
    conclusion = "PNG là đề MAD101, WEBP là đề môn khác" if p['png_in_v1'] else "WEBP là đề MAD101 có hình, PNG là đề môn khác"
    md.append(f"| `{p['base']}` | `{os.path.basename(p['png_path'])}` | {p['png_size']/1024:.1f} KB | `{os.path.basename(p['webp_path'])}` | {p['webp_size']/1024:.1f} KB | `{os.path.basename(ref_name)}` | {conclusion} | **NHÓM C (Giữ)** |")

md.append(f"\n*(Còn 80 cặp khác đều tuân theo đúng quy luật trên và toàn bộ được bảo lưu 100% trong Nhóm C)*")

md.append("\n---\n")
md.append("## 5. DANH SÁCH ẢNH QUÁ KHỔ (> 300 KB) — BẢO LƯU CHỜ NÉN")
md.append("| STT | Đường dẫn file | Dung lượng | Khuyến nghị |")
md.append("|:---:|:---|:---:|:---|")
md.append("| 1 | `0886_q886_Question_886.png` | 301.6 KB (308,806 bytes) | Giữ nguyên (nén WebP lossless nếu người dùng yêu cầu sau) |")
md.append("| 2 | `chapters/Ch7_Graphs/0886_q886_Question_886.png` | 301.6 KB (308,806 bytes) | Bản sao trùng hash thuộc Nhóm B |")

md.append("\n---\n")
md.append("## 6. DUNG LƯỢNG THU HỒI DỰ KIẾN THEO TỪNG NHÓM")
md.append("\n| Phân nhóm | Số lượng file | Dung lượng giải phóng | Mức độ rủi ro | Hành động tiếp theo |")
md.append("|:---|:---:|:---:|:---:|:---|")
md.append(f"| **Nhóm A (Bản sao thừa an toàn)** | {len(legacy_dups)} file | ~0.26 MB | 0% (Không rủi ro) | Sẵn sàng chuyển vào `_cleanup_quarantine/` khi người dùng duyệt Bước 2 |")
md.append(f"| **Nhóm B (Bản sao chapters/ trùng hash)** | {len(chapters_dups)} file | 50.12 MB | Cực thấp (nhưng thuộc ảnh câu hỏi) | Giữ nguyên, chỉ cách ly khi người dùng có lệnh riêng |")
md.append("| **Nhóm C (Bảo lưu tuyệt đối)** | 1,236 file | 0 MB (Bảo tồn) | 100% An toàn | Tuyệt đối giữ nguyên không đụng |")

md.append("\n---\n")
md.append("## 7. QUY TRÌNH THỰC HIỆN TIẾP THEO")
md.append("1. **Hiện tại (Dừng ở Bước 1):** Báo cáo kế hoạch chi tiết này cho người dùng duyệt.")
md.append("2. **Bước 2 (Chờ duyệt):** Khi người dùng đồng ý:")
md.append("   - Chuyển các file Nhóm A vào `_cleanup_quarantine/<YYYYMMDD_HHMMSS>/`.")
md.append("   - Chạy test kiểm tra: Mở ứng dụng duyệt ngẫu nhiên 30 câu hỏi liên tiếp.")
md.append("   - Kiểm tra log Network/Console: Đảm bảo 0 lỗi 404 hình ảnh.")
md.append("   - So khớp số lượng ảnh tham chiếu: 1,131 / 1,131 câu hiển thị hoàn hảo.")
md.append("3. **Bước 3 (Xóa vĩnh viễn):** CHỈ thực hiện khi người dùng nhắn tin chính xác cụm từ: `\"xóa vĩnh viễn\"`.")

with open('_cleanup_plan.md', 'w', encoding='utf-8') as f:
    f.write('\n'.join(md))

print(f"_cleanup_plan.md successfully written with {len(md)} lines.")
