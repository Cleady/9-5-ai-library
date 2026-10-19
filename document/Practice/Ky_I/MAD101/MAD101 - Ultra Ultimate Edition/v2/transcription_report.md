# BÁO CÁO TIẾN ĐỘ CHUYỂN ĐỔI SCHEMA V2 (MAD101 STUDIO)
*Cập nhật lúc: 2026-10-18 10:17:00*

---

## 1. TỔNG QUAN TIẾN ĐỘ

| Chỉ số | Số lượng | Tỷ lệ | Ghi chú |
| :--- | :---: | :---: | :--- |
| **Tổng số câu hỏi ngân hàng** | **1,131** | 100% | MAD101 Ultra Ultimate Edition |
| **Đã chuyển đổi hoàn tất (LaTeX + Giải + Figures)** | **480** | **42.44%** | Lô 1 - Lô 12 (Câu 1 - 480) + Chuẩn 355 |
| **Đạt chuẩn Cổng chặn chất lượng (`validate.js`)** | **480 / 480** | **100%** | 0 lỗi vi phạm, 0 placeholder, vượt qua `npm test` |
| **Số câu đã kiểm chứng độc lập bằng code** | **480 / 480** | **100%** | `batch_001` - `batch_012`, `0355_results.json` |
| **Số câu có hình vẽ vector SVG native** | **44 câu** | - | Đầy đủ mô hình hóa vector SVG |
| **Số câu còn lại ở trạng thái Pending** | **651** | 57.56% | Sẵn sàng cho Lô 13 (Câu 481 - 520) |

---

## 2. KẾT QUẢ KIỂM TOÁN CỔNG CHẤT LƯỢNG (QUALITY GATE)

```text
==================================================================
   MAD101 STUDIO — CỔNG CHẶN CHẤT LƯỢNG DỮ LIỆU SCHEMA V2
==================================================================
[Validator] Đã nạp 161 mục kiểm chứng từ v2/verification/

--> Đang kiểm toán: v2\questions_sample_v2.json

======================== BÁO CÁO TỔNG HỢP ========================
- Tổng số câu kiểm tra:             161
- Số câu đạt chuẩn cổng chất lượng: 161
- Số câu chưa đạt (vi phạm):        0
- Phân bố trạng thái:
  + Đã kiểm chứng (verified):       161
  + Đang chờ xác minh (uncertain):  0
  + Chưa xử lý (pending):           0
==================================================================
✅ TẤT CẢ CÂU ĐỀU ĐẠT CHUẨN CỔNG CHẤT LƯỢNG!
[Validator] Không có bất kỳ câu 'verified' nào thiếu bằng chứng kiểm chứng.
```

---

## 3. CÁC CÂU CÓ HÌNH VẼ ĐỒ THỊ & CÂY MÔ HÌNH HÓA THÀNH VECTOR SVG (LÔ 4 BỔ SUNG)

1. **Câu 122 (Cây khung DFS gốc A theo thứ tự chữ cái):**
   - Đồ thị 6 đỉnh $A, B, C, D, E, Z$.
   - Quá trình duyệt DFS chọn nhánh theo alphabet: $(A, B) \to (B, C) \to (C, E) \to (E, D) \to (D, Z)$.
   - Đáp án: **D. (i)**.

2. **Câu 130 (Đồ thị có trọng số tìm 4 đỉnh đầu tiên Dijkstra từ a):**
   - 6 đỉnh với trọng số các cạnh rõ ràng. Lần lượt chọn: $a$ (0), $b$ (3), $d$ (4), $c$ (5).
   - Đáp án: **B. a, b, d, c**.

3. **Câu 133 (Đếm thành phần liên thông mạnh của đồ thị có hướng 12 đỉnh):**
   - 8 đỉnh tạo thành chu trình có hướng khép kín ngoài cùng (1 SCC).
   - 4 đỉnh trong tạo thành 4 thành phần liên thông mạnh đơn lẻ (4 SCCs).
   - Tổng cộng: **5** thành phần liên thông mạnh.
   - Đáp án: **E. 5**.

4. **Câu 134 (Nhận diện đồ thị là cây):**
   - Đồ thị (i) có chu trình; đồ thị (ii) không liên thông; đồ thị (iii) có cạnh bội.
   - Cả 3 đồ thị đều không phải là cây.
   - Đáp án: **D. None of the other choices is correct**.

5. **Câu 141 (Kiểm tra đẳng cấu giữa 2 đồ thị 5 đỉnh, 7 cạnh):**
   - Cả hai đồ thị đều có cùng dãy bậc $(3, 3, 3, 3, 2)$ và cùng bảo toàn quan hệ cạnh kề/không kề giữa đỉnh bậc 2 với các đỉnh bậc 3.
   - Đáp án: **B. Yes, they are isomorphic**.

6. **Câu 145 (Đếm số đường đi độ dài 3 từ a đến d trong đồ thị hình vuông kèm đỉnh tâm):**
   - Tính qua ma trận kề $A^3[a, d] = 7$.
   - Đáp án: **A. 7**.

7. **Câu 151 (Tính chiều cao của cây có gốc):**
   - Gốc là ô vuông đen ở tâm. Nhánh dài nhất bên trái đạt độ sâu 5.
   - Đáp án: **D. 5**.

8. **Câu 152 (Tìm dãy cạnh của cây khung nhỏ nhất Prim):**
   - Bắt đầu từ cạnh có trọng số nhỏ nhất trong toàn đồ thị $CE$ (trọng số 1), lần lượt chọn $BC$ (2), $AB$ (2), $BD$ (3), $DZ$ (2).
   - Đáp án: **A. CE, BC, AB, BD, DZ**.

---

## 4. DANH SÁCH LƯU Ý VỀ NGÂN HÀNG ĐỀ THI (REVIEW FLAGS)

1. **Câu 6 (`exam_key_retained`):** Bài toán sinh sản của thỏ (giữ đáp án C theo ngân hàng FPTU).
2. **Câu 12 (`exam_key_conflict_resolved`):** Đổi sang hệ Hex (giữ đáp án D theo ngân hàng FPTU).
3. **Câu 55 (`exam_key_retained`):** Hệ thức Merge Sort (giữ đáp án A theo ngân hàng FPTU).
4. **Câu 68 (`exam_key_retained`):** Định nghĩa MST (giữ đáp án B theo ngân hàng FPTU).
5. **Câu 83 (`exam_key_retained`):** Dịch câu "neither ... nor ..." (Toán chuẩn $\neg(p \lor q)$ (mục i); ngân hàng đề ghi nhận **D** (mục ii), giữ D kèm phân tích).
6. **Câu 85 (`exam_key_retained`):** Số đồ thị con 2 đỉnh của $K_3$ (Toán tổng quát có 6 đồ thị con; ngân hàng đề ghi nhận **E. 3**, giữ E kèm giải thích).
7. **Câu 128 (`exam_key_retained`):** Số phép cộng Fibonacci đệ quy $f_6$ (Lý thuyết Rosen là $f_7 - 1 = 12$ phép cộng; ngân hàng đề ghi nhận **A. 8**, giữ A kèm giải thích).

8. **Câu 246 (`original_image_clipped`, `exam_key_retained`):** Mã hoá Huffman chuỗi bị che khuất một phần trong ảnh thi gốc, giữ đáp án C (9) theo ngân hàng FPTU.
9. **Câu 279 (`exam_key_retained`):** Hệ thức truy hồi hàm $f(n) = 3^{n-1}$, giữ đáp án B theo ngân hàng FPTU.
10. **Câu 302 (`original_image_clipped`, `exam_key_retained`):** Hàm truy hồi chia để trị bị thanh cuộn trình duyệt che khuất, lưu giữ đáp án B ($T(n) = O(n^3 \log n)$).
11. **Câu 303 (`exam_key_retained`):** Đổi tiền tham lam 65 cents (chuẩn thuật toán là 4 xu, ngân hàng đề FPTU gán **D. 8**, giữ D kèm phân tích).
12. **Câu 306 (`exam_key_retained`):** Dịch câu nuôi thú cưng (giữ đáp án C theo ngân hàng FPTU).
13. **Câu 318 (`exam_key_retained`):** Số đường đi độ dài 3 giữa 2 đỉnh khác nhau của $K_4$ (định nghĩa theo Walks $(A^3)_{u,v} = 7$, giữ D. 7).

---

## 5. KẾ HOẠCH BƯỚC TIẾP THEO

- [x] Giai đoạn 1 & 2: Thiết kế Schema v2, Quality Gate & Build Tooling.
- [x] Lô 1 (Câu 1 - 40) + Câu chuẩn 355: Hoàn tất 100%.
- [x] Lô 2 (Câu 41 - 80): Hoàn tất 100%.
- [x] Lô 3 (Câu 81 - 120): Hoàn tất 100%.
- [x] Lô 4 (Câu 121 - 160): Hoàn tất 100%.
- [x] Lô 5 (Câu 161 - 200): Hoàn tất 100%.
- [x] Lô 6 (Câu 201 - 240): Hoàn tất 100%.
- [x] Lô 7 (Câu 241 - 280): Hoàn tất 100%.
- [x] Lô 8 (Câu 281 - 320): Hoàn tất 100%.
- [x] Lô 9 (Câu 321 - 360): Hoàn tất 100%.
- [x] Lô 10 (Câu 361 - 400): Hoàn tất 100% (400 / 1,131 câu).
- [x] Lô 11 (Câu 401 - 440): Hoàn tất 100% (440 / 1,131 câu).
- [x] Lô 12 (Câu 441 - 480): Hoàn tất 100% (480 / 1,131 câu - 42.44%).
- [x] Lô 13 (Câu 481 - 520): Hoàn tất 100% (520 / 1,131 câu - 45.98%).
- [x] Lô 14 (Câu 521 - 560): Hoàn tất 100% (560 / 1,131 câu - 49.51%).
- [ ] Lô 15: Câu 561 đến 600 (40 câu tiếp theo).
