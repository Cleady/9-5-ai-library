# BÁO CÁO KIỂM TRA MẪU ĐỘC LẬP (MATH QUIZ SPOT CHECK)

*30 câu hỏi ngẫu nhiên mỗi môn (seed=42) để kiểm tra định dạng và danh sách cần rà soát*

## I. MẪU KIỂM TRA MAD101 (30 CÂU)

### Câu 1 (Web ID: 40229 | Quiz ID: 506)
**Câu hỏi:** Cho tập phổ dụng \(U = \{a, b, c, d, e, f, g, h, i, j\}\) được sắp theo thứ tự bảng chữ cái. Cho hai tập con:
\[A = \{a, c, d, e, g, i\}, \quad B = \{a, f, g, h, j\}\]
Chuỗi bit biểu diễn tập giao \(A \cap B\) là chuỗi nào?

**Các lựa chọn:**
- A. 10 0000 0100
- B. 10 0000 0010
- C. 10 0000 1000 [ĐÚNG]
- D. 10 0001 0000
- E. None of the other choices

**Giải thích:**
Bước 1: Tìm tập hợp giao \(A \cap B\): Các phần tử xuất hiện trong cả hai tập là \(a\) và \(g\). Do đó \(A \cap B = \{a, g\}\).

Bước 2: Lập chuỗi bit 10 ký tự tương ứng với các phần tử của \(U = \{a, b, c, d, e, f, g, h, i, j\}\):
- Vị trí 1 (a): 1
- Vị trí 2 đến 6 (b, c, d, e, f): 00000
- Vị trí 7 (g): 1
- Vị trí 8 đến 10 (h, i, j): 000.

Bước 3: Chuỗi bit kết quả là `10 0000 1000`. Chọn phương án C.

---

### Câu 2 (Web ID: 40052 | Quiz ID: 502)
**Câu hỏi:** Cặp mệnh đề nào sau đây KHÔNG tương đương logic với nhau?
(i) \(p \to q\) và \(\neg q \to \neg p\)
(ii) \(p \leftrightarrow q\) và \(\neg(p \oplus q)\)
(iii) \(p \wedge (p \to q)\) và \(\neg p \vee q\)

**Các lựa chọn:**
- A. None of the other choices is correct
- B. (ii)
- C. (iii) [ĐÚNG]
- D. (i)

**Giải thích:**
Bước 1: Cặp (i): \(p \to q\) và mệnh đề phản đảo \(\neg q \to \neg p\) luôn tương đương logic.

Bước 2: Cặp (ii): Mệnh đề tương đương \(p \leftrightarrow q\) đúng khi \(p, q\) cùng chân trị, trong khi \(p \oplus q\) đúng khi khác chân trị. Phủ định \(\neg(p \oplus q)\) đúng khi cùng chân trị \(\implies\) tương đương logic.

Bước 3: Cặp (iii): \(p \wedge (p \to q) \equiv p \wedge (\neg p \vee q) \equiv p \wedge q\). Trong khi đó \(\neg p \vee q \equiv p \to q\). Hai mệnh đề \(p \wedge q\) và \(p \to q\) không tương đương logic. Do đó chọn (iii).

---

### Câu 3 (Web ID: 40564 | Quiz ID: 514)
**Câu hỏi:** Giải mã thông điệp "ERQJ ERQJ PXD KH" đã được mã hóa bằng mật mã Caesar \(f(p) = (p + 3) \bmod 26\).

**Các lựa chọn:**
- A. XANH XANH MAU LA
- B. BONG BONG MUA HE [ĐÚNG]
- C. XINH XINH NHO BE
- D. HONG HONG TUYET TUYET
- E. None of the other choices is correct

**Giải thích:**
Bước 1: Hàm giải mã của mật mã Caesar là lùi lại 3 vị trí trong bảng chữ cái: \(p = (c - 3) \bmod 26\).

Bước 2: Giải mã từng từ:
- E (4) - 3 = 1 (B); R (17) - 3 = 14 (O); Q (16) - 3 = 13 (N); J (9) - 3 = 6 (G) \(\implies\) BONG
- P (15) - 3 = 12 (M); X (23) - 3 = 20 (U); D (3) - 3 = 0 (A) \(\implies\) MUA
- K (10) - 3 = 7 (H); H (7) - 3 = 4 (E) \(\implies\) HE

Bước 3: Ghép lại ta được thông điệp gốc là "BONG BONG MUA HE".

---

### Câu 4 (Web ID: 40502 | Quiz ID: 512)
**Câu hỏi:** Cho thuật toán Euclid tìm ước chung lớn nhất:
```pascal
procedure gcd(a, b: positive integers)
x := a; y := b
while y != 0 begin
  r := x mod y
  x := y
  y := r
end
return x
```
Nếu \(a = 610, b = 233\), thì trước khi thực hiện vòng lặp lần thứ 3, giá trị của \(x\) và \(y\) là bao nhiêu?

**Các lựa chọn:**
- A. x = 144, y = 55
- B. x = 89, y = 55
- C. x = 144, y = 89 [ĐÚNG]
- D. x = 233, y = 89
- E. None of the other choices is correct

**Giải thích:**
Bước 1: Khởi tạo ban đầu: \(x = 610, y = 233\).
Trước lần lặp 1: \(x = 610, y = 233\).
Trong lần lặp 1: \(r = 610 \bmod 233 = 144\), gán \(x = 233, y = 144\).

Bước 2: Trước lần lặp 2: \(x = 233, y = 144\).
Trong lần lặp 2: \(r = 233 \bmod 144 = 89\), gán \(x = 144, y = 89\).

Bước 3: Trước khi thực hiện vòng lặp lần 3, các giá trị hiện tại là \(x = 144\) và \(y = 89\), tương ứng với đáp án C.

---

### Câu 5 (Web ID: 40458 | Quiz ID: 511)
**Câu hỏi:** Giả sử \(f(n) = O(\log n)\), \(g(n) = O(1)\) và \(h(n) = O(n)\). Tìm ước lượng Big-O tốt nhất cho biểu thức:\n\[ \big(f(n)\big)^2 + \big(g(n) + 2\big) h(n) \]

**Các lựa chọn:**
- A. (i) O(log n)
- B. (ii) O(n) [ĐÚNG]
- C. (iii) O(n log n)
- D. (iv) O(n^2)
- E. (v) O(n^2 log n)

**Giải thích:**
Bước 1: Đánh giá độ tăng của từng số hạng:

- Số hạng thứ nhất: \(\big(f(n)\big)^2 = O\big((\log n)^2\big)\).

- Số hạng thứ hai: \(g(n) + 2 = O(1)\), do đó \(\big(g(n) + 2\big) h(n) = O(1 \times n) = O(n)\).

Bước 2: Lấy số hạng có tốc độ tăng trội hơn trong tổng:

Vì \((\log n)^2\) tăng chậm hơn nhiều so với \(n\) (tức \((\log n)^2 = o(n)\)), số hạng \(O(n)\) chiếm ưu thế.

Ước lượng Big-O tốt nhất là \(O(n)\). Khẳng định (ii) đúng, chọn đáp án B.

---

### Câu 6 (Web ID: 40286 | Quiz ID: 507)
**Câu hỏi:** Cho hai tập hợp \(A\) và \(B\). Giả sử tích Descartes \(A \times B = \emptyset\). Chọn kết luận đúng nhất (Choose the best answer):\n(i) \(A = \emptyset\)\n(ii) \((A = \emptyset) \land (B = \emptyset)\)\n(iii) \((A = \emptyset) \oplus (B = \emptyset)\)\n(iv) \((A = \emptyset) \lor (B = \emptyset)\)

**Các lựa chọn:**
- A. (iv) [ĐÚNG]
- B. (i)
- C. (ii)
- D. (iii)
- E. None of the other choices is correct

**Giải thích:**
Bước 1: Phân tích định nghĩa tích Descartes \(A \times B = \{(a, b) \mid a \in A \land b \in B\}\):

- Tích Descartes \(A \times B\) không chứa phần tử nào (bằng tập rỗng \(\emptyset\)) khi và chỉ khi không thể tạo được bất kỳ cặp \((a, b)\) nào.

- Điều này xảy ra khi và chỉ khi ít nhất một trong hai tập hợp \(A\) hoặc \(B\) là tập rỗng.

Bước 2: Trong ngôn ngữ logic:

\[ A \times B = \emptyset \iff (A = \emptyset) \lor (B = \emptyset) \]

Biểu thức tương ứng là mệnh đề (iv), được chọn ở đáp án A.

---

### Câu 7 (Web ID: 40210 | Quiz ID: 505)
**Câu hỏi:** Let \(A, B\) be sets. Find the truth values of the propositions:
(i) \(\overline{A} \cup (A \cap B) = \overline{A} \cup B\)
(ii) \(\overline{A} \cap (A \cap B) = \overline{A} \cap B\)

**Các lựa chọn:**
- A. False, true
- B. True, false [ĐÚNG]
- C. True, true
- D. False, false

**Giải thích:**
**Bước 1: Kiểm tra mệnh đề (i):**
- Áp dụng luật phân phối của phép hợp đối với phép giao:
  \[\overline{A} \cup (A \cap B) = (\overline{A} \cup A) \cap (\overline{A} \cup B) = U \cap (\overline{A} \cup B) = \overline{A} \cup B\]
- Đẳng thức luôn đúng với mọi tập hợp \(A, B \implies\) (i) là **True**.

**Bước 2: Kiểm tra mệnh đề (ii):**
- Vế trái: \(\overline{A} \cap (A \cap B) = (\overline{A} \cap A) \cap B = \emptyset \cap B = \emptyset\).
- Vế phải: \(\overline{A} \cap B = B \setminus A\).
- Hai vế chỉ bằng nhau khi \(B \subseteq A\); trong trường hợp tổng quát \(B \setminus A \neq \emptyset \implies\) (ii) là **False**.

**Kết luận:** Kết quả chân trị tương ứng là True, false, chọn phương án **B**.

---

### Câu 8 (Web ID: 41117 | Quiz ID: 530)
**Câu hỏi:** Cho hàm hợp \(h(x) = f(g(x))\). Nếu \(f(x) = 2x - 4\) và \(g(x) = x - 5\) thì \(h(x)\) là:

**Các lựa chọn:**
- A. -2x + 7
- B. -2x - 10 [ĐÚNG]
- C. -2x + 3
- D. 2x - 14
- E. None of the other choices is correct

**Giải thích:**
Bước 1: Tính toán giải tích hàm hợp:
\[h(x) = f(g(x)) = 2(x - 5) - 4 = 2x - 10 - 4 = 2x - 14\]
Biểu thức toán học chính xác là \(2x - 14\) (ứng với lựa chọn D).

Bước 2: Ghi chú đáp án ngân hàng câu hỏi: Trong khóa dữ liệu gốc của ngân hàng đề thi FUO, câu hỏi này được gán đáp án chính thức là B (\(-2x - 10\)). Ta bảo toàn khóa B theo ngân hàng đề đồng thời trình bày đầy đủ lời giải giải tích.

---

### Câu 9 (Web ID: 40179 | Quiz ID: 505)
**Câu hỏi:** Evaluate the sum \[\sum_{i=1}^{10} [(i+1)2^i - i2^{i-1}]\]

**Các lựa chọn:**
- A. \(11262\)
- B. None of the other choices is correct
- C. \(11264\)
- D. \(11265\)
- E. \(11263\) [ĐÚNG]

**Giải thích:**
**Bước 1: Nhận dạng dạng sai phân triệt tiêu (Telescoping Sum):**
Đặt \(a_i = i \cdot 2^{i-1}\). Khi đó: \[a_{i+1} = (i+1) \cdot 2^{(i+1)-1} = (i+1)2^i.\]
Biểu thức trong dấu tổng chính là: \[(i+1)2^i - i2^{i-1} = a_{i+1} - a_i.\]

**Bước 2: Tính tổng rút gọn:**
Tổng sai phân triệt tiêu: \[\sum_{i=1}^{10} (a_{i+1} - a_i) = a_{11} - a_1.\]
Ta có:
- \(a_1 = 1 \cdot 2^0 = 1\).
- \(a_{11} = 11 \cdot 2^{10} = 11 \times 1024 = 11264\).
Suy ra tổng là: \[11264 - 1 = 11263.\]

**Kết luận:** Giá trị của tổng là **11263**, chọn phương án **E**.

---

### Câu 10 (Web ID: 40865 | Quiz ID: 522)
**Câu hỏi:** Chọn khẳng định đúng về hai đồ thị \(G\) và \(H\) sau đây (Choose the correct statement about the graphs):

<svg viewBox="0 0 460 260" width="420" height="240" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; border:1px solid #e2e8f0; border-radius:8px; display:block; margin:10px auto;">
  <text x="60" y="70" font-family="sans-serif" font-size="16" font-weight="bold" fill="#1e293b">G</text>
  <line x1="110" y1="30" x2="110" y2="110" stroke="#f59e0b" stroke-width="2.5" />
  <line x1="110" y1="30" x2="180" y2="70" stroke="#f59e0b" stroke-width="2.5" />
  <line x1="110" y1="110" x2="180" y2="70" stroke="#f59e0b" stroke-width="2.5" />
  <line x1="180" y1="70" x2="260" y2="70" stroke="#f59e0b" stroke-width="2.5" />
  <line x1="260" y1="70" x2="330" y2="30" stroke="#f59e0b" stroke-width="2.5" />
  <line x1="260" y1="70" x2="330" y2="110" stroke="#f59e0b" stroke-width="2.5" />
  <line x1="330" y1="30" x2="330" y2="110" stroke="#f59e0b" stroke-width="2.5" />
  <circle cx="110" cy="30" r="5" fill="#2563eb" />
  <circle cx="110" cy="110" r="5" fill="#2563eb" />
  <circle cx="180" cy="70" r="5" fill="#2563eb" />
  <circle cx="260" cy="70" r="5" fill="#2563eb" />
  <circle cx="330" cy="30" r="5" fill="#2563eb" />
  <circle cx="330" cy="110" r="5" fill="#2563eb" />
  <text x="60" y="200" font-family="sans-serif" font-size="16" font-weight="bold" fill="#1e293b">H</text>
  <line x1="110" y1="160" x2="110" y2="240" stroke="#334155" stroke-width="2.5" />
  <line x1="110" y1="160" x2="180" y2="200" stroke="#334155" stroke-width="2.5" />
  <line x1="110" y1="240" x2="180" y2="200" stroke="#334155" stroke-width="2.5" />
  <line x1="180" y1="200" x2="260" y2="200" stroke="#334155" stroke-width="2.5" />
  <line x1="260" y1="200" x2="330" y2="160" stroke="#334155" stroke-width="2.5" />
  <line x1="260" y1="200" x2="330" y2="240" stroke="#334155" stroke-width="2.5" />
  <line x1="330" y1="160" x2="330" y2="240" stroke="#334155" stroke-width="2.5" />
  <line x1="110" y1="240" x2="330" y2="240" stroke="#2563eb" stroke-width="2.5" />
  <circle cx="110" cy="160" r="5" fill="#2563eb" />
  <circle cx="110" cy="240" r="5" fill="#2563eb" />
  <circle cx="180" cy="200" r="5" fill="#2563eb" />
  <circle cx="260" cy="200" r="5" fill="#2563eb" />
  <circle cx="330" cy="160" r="5" fill="#2563eb" />
  <circle cx="330" cy="240" r="5" fill="#2563eb" />
</svg>

**Các lựa chọn:**
- A. Both G and H have Hamilton circuits
- B. None of G or H has Hamilton paths
- C. G has a Hamilton path and H has a Hamilton circuit. [ĐÚNG]
- D. G has a Hamilton circuit and H has a Hamilton path.

**Giải thích:**
Bước 1: Phân tích đồ thị \(G\):

- Đồ thị \(G\) gồm hai tam giác liên kết qua một cầu (cạnh nối ở giữa). Một chu trình đơn không thể đi qua một cạnh cầu để sang nửa bên kia rồi quay lại đỉnh ban đầu mà không đi qua cạnh đó lần thứ hai. Do đó \(G\) không có chu trình Hamilton.

- Tuy nhiên, \(G\) có đường đi Hamilton: Đi từ đỉnh trên trái \(\to\) đỉnh dưới trái \(\to\) đỉnh giữa trái \(\to\) đỉnh giữa phải \(\to\) đỉnh trên phải \(\to\) đỉnh dưới phải. Lộ trình này đi qua cả 6 đỉnh của \(G\).

Bước 2: Phân tích đồ thị \(H\):

- Đồ thị \(H\) có thêm một cạnh đáy nối giữa đỉnh dưới cùng bên trái và đỉnh dưới cùng bên phải.

- Nhờ có cạnh đáy này, ta thiết lập được chu trình Hamilton khép kín: đỉnh trên trái \(\to\) đỉnh giữa trái \(\to\) đỉnh giữa phải \(\to\) đỉnh trên phải \(\to\) đỉnh dưới phải \(\to\) đỉnh dưới trái \(\to\) đỉnh trên trái.

Vậy \(G\) có đường đi Hamilton và \(H\) có chu trình Hamilton (chọn C).

---

### Câu 11 (Web ID: 40066 | Quiz ID: 502)
**Câu hỏi:** Các suy luận nào sau đây là hợp lệ (valid)?
(i) If Andy gets sick, she will not go to the class. She didn't go to the class yesterday. Therefore, she got sick yesterday.
(ii) If Andy gets sick, she will not go to the class. She did not get sick today. Therefore, she will go to the class today.
(iii) If Andy gets sick, she will not go to the class. She went to the class yesterday. Therefore, she did not get sick yesterday.

**Các lựa chọn:**
- A. Only (i)
- B. Only (ii)
- C. Only (iii) [ĐÚNG]
- D. (i) and (iii)
- E. All of (i), (ii), (iii) are valid

**Giải thích:**
Bước 1: Ký hiệu: \(p\): "Andy gets sick", \(q\): "she will not go to the class". Mệnh đề tiền đề là \(p \to q\).
- Suy luận (i): có \(p \to q\) và \(q\), kết luận \(p\). Đây là ngụy biện khẳng định kết luận (affirming the consequent), không hợp lệ.
- Suy luận (ii): có \(p \to q\) và \(\neg p\), kết luận \(\neg q\). Đây là ngụy biện phủ định tiền đề (denying the antecedent), không hợp lệ.

Bước 2: Suy luận (iii): có \(p \to q\) và \(\neg q\) ("she went to the class"), kết luận \(\neg p\) ("she did not get sick"). Đây là quy tắc Modus Tollens hợp lệ: \([(p \to q) \land \neg q] \implies \neg p\). Do đó chỉ có (iii) là suy luận hợp lệ. Chọn phương án C.

---

### Câu 12 (Web ID: 40062 | Quiz ID: 502)
**Câu hỏi:** Dịch câu sau thành biểu thức logic với miền xác định gồm tất cả các số thực:
"The quotient of any two positive real numbers is also positive"
Xét các dạng biểu diễn:
(i) \(\forall x \forall y ((x > 0 \land y > 0) \to (x/y > 0))\)
(ii) \(\forall x \forall y ((x > 0 \land y > 0) \land (x/y > 0))\)
(iii) \((x > 0 \land y > 0) \to (x/y > 0)\)
(iv) \(\exists x \exists y ((x > 0 \land y > 0) \to (x/y > 0))\)

**Các lựa chọn:**
- A. (iii)
- B. (i) [ĐÚNG]
- C. (ii)
- D. None of the other choices is correct
- E. (iv)

**Giải thích:**
Bước 1: Phân tích câu: "The quotient of any two positive real numbers is also positive" áp dụng cho hai số thực dương bất kỳ, do đó cần hai lượng từ phổ dụng \(\forall x \forall y\).

Bước 2: Điều kiện giả thiết là \(x > 0 \land y > 0\), và kết luận là thương \(x/y > 0\). Phép suy luận có dạng kéo theo \(\to\). Vậy công thức đúng là \(\forall x \forall y ((x > 0 \land y > 0) \to (x/y > 0))\), tương ứng phát biểu (i). Chọn phương án B.

---

### Câu 13 (Web ID: 40192 | Quiz ID: 505)
**Câu hỏi:** Find a formula that generates the following sequence with the initial items \(a_1, a_2, a_3, \dots\):
\[0, 2, 0, 2, 0, 2, 0, \dots\]
(i) \(a_n = 1 + (-1)^n\)
(ii) \(a_n = 1 - (-1)^n\)
(iii) \(a_n = 1 + (-1)^{n+1}\)
(iv) None of the other choices is correct

**Các lựa chọn:**
- A. (iii)
- B. (i) [ĐÚNG]
- C. (ii)
- D. (iv)

**Giải thích:**
**Bước 1: Kiểm tra công thức (i) với các số hạng đầu tiên:**
Với \(a_n = 1 + (-1)^n\):
- \(n = 1\): \(a_1 = 1 + (-1)^1 = 1 - 1 = 0\).
- \(n = 2\): \(a_2 = 1 + (-1)^2 = 1 + 1 = 2\).
- \(n = 3\): \(a_3 = 1 + (-1)^3 = 1 - 1 = 0\).
- \(n = 4\): \(a_4 = 1 + (-1)^4 = 1 + 1 = 2\).
Dãy sinh ra là \(0, 2, 0, 2, 0, \dots\) trùng khớp hoàn toàn với đề bài.

**Bước 2: Kiểm tra các công thức còn lại:**
- Công thức (ii): \(a_1 = 1 - (-1) = 2, a_2 = 0\) (bị lệch pha).
- Công thức (iii): \(a_1 = 2, a_2 = 0\) (bị lệch pha).

**Kết luận:** Công thức chính xác là **(i)**, chọn phương án **B**.

---

### Câu 14 (Web ID: 40448 | Quiz ID: 511)
**Câu hỏi:** Cho hàm số \(f(x) = x^2 \log(x^3) + x^2 \log x + (x \log x)^2\). Tìm hàm số đơn giản nhất \(g(x)\) sao cho \(f(x) = O(g(x))\).

**Các lựa chọn:**
- A. (iv) [ĐÚNG]
- B. (i)
- C. (ii)
- D. (iii)

**Giải thích:**
Bước 1: Rút gọn biểu thức của \(f(x)\):

- \(x^2 \log(x^3) = 3x^2 \log x\)

- Tổng hai số hạng đầu: \(3x^2 \log x + x^2 \log x = 4x^2 \log x\)

- Số hạng thứ ba: \((x \log x)^2 = x^2 (\log x)^2\)

Bước 2: So sánh tốc độ tăng khi \(x \to \infty\):

Do \((\log x)^2\) tăng nhanh hơn \(\log x\), số hạng \(x^2 (\log x)^2\) là số hạng chi phối (dominant term).

Do đó \(f(x) = O(x^2 (\log x)^2)\). Khẳng định (iv) đúng, tương ứng đáp án A.

---

### Câu 15 (Web ID: 40477 | Quiz ID: 512)
**Câu hỏi:** Cần bao nhiêu phép so sánh giữa các phần tử để trộn hai danh sách đã sắp xếp \([1, 3, 5, 7, 8, 10]\) và \([2, 4, 6, 9]\) bằng thuật toán Merge?

**Các lựa chọn:**
- A. 6
- B. 7
- C. 8
- D. 9 [ĐÚNG]
- E. 10

**Giải thích:**
Bước 1: Mô phỏng từng phép so sánh của thuật toán trộn:

1. So sánh 1 và 2: đưa 1 ra. (1 phép so sánh)

2. So sánh 3 và 2: đưa 2 ra. (2 phép so sánh)

3. So sánh 3 và 4: đưa 3 ra. (3 phép so sánh)

4. So sánh 5 và 4: đưa 4 ra. (4 phép so sánh)

5. So sánh 5 và 6: đưa 5 ra. (5 phép so sánh)

6. So sánh 7 và 6: đưa 6 ra. (6 phép so sánh)

7. So sánh 7 và 9: đưa 7 ra. (7 phép so sánh)

8. So sánh 8 và 9: đưa 8 ra. (8 phép so sánh)

9. So sánh 10 và 9: đưa 9 ra. (9 phép so sánh)

Bước 2: Lúc này danh sách thứ hai rỗng, phần tử 10 còn lại được đưa thẳng vào danh sách kết quả mà không cần so sánh thêm.

Tổng số phép so sánh là 9. Chọn đáp án D.

---

### Câu 16 (Web ID: 41035 | Quiz ID: 526)
**Câu hỏi:** Cho thông điệp 'weekend'. Mã hóa thông điệp này bằng mã Huffman. Có bao nhiêu bit được dùng để mã hóa ký tự 'e' (How many bits are used to encode the letter 'e')?

**Các lựa chọn:**
- A. 1 [ĐÚNG]
- B. 2
- C. 3
- D. 4
- E. None of the other choices is correct

**Giải thích:**
Bước 1: Thống kê tần số xuất hiện của từng ký tự trong chuỗi 'weekend':

- 'e': 3 lần

- 'w': 1 lần

- 'k': 1 lần

- 'n': 1 lần

- 'd': 1 lần

Tổng số ký tự là 7.

Bước 2: Xây dựng cây mã hóa Huffman:

- Ghép hai ký tự tần số 1 (ví dụ 'w' và 'k') thành nút nội bộ trọng số \(1 + 1 = 2\).

- Ghép hai ký tự tần số 1 còn lại ('n' và 'd') thành nút nội bộ trọng số \(1 + 1 = 2\).

- Ghép hai nút trọng số 2 thành một nút có trọng số \(2 + 2 = 4\).

- Lúc này còn lại ký tự 'e' (trọng số 3) và nút trọng số 4. Ghép 'e' và nút trọng số 4 tạo thành gốc cây (trọng số 7).

Vì 'e' là con trực tiếp của gốc cây, độ dài mã của 'e' là đúng 1 bit (ví dụ '0').

Đáp án chính xác là A (1).

---

### Câu 17 (Web ID: 40055 | Quiz ID: 502)
**Câu hỏi:** Tìm mệnh đề phủ định của mệnh đề lượng từ sau:
\[\exists x (P(x) \to Q(x))\]

**Các lựa chọn:**
- A. \(\forall x (Q(x) \to P(x))\)
- B. \(\forall x (\neg Q(x) \wedge P(x))\) [ĐÚNG]
- C. \(\forall x (\neg Q(x) \to P(x))\)
- D. \(\forall x (\neg Q(x) \wedge \neg P(x))\)
- E. None of the other choices is correct

**Giải thích:**
Bước 1: Áp dụng quy tắc phủ định lượng từ tồn tại:
\[\neg \exists x (P(x) \to Q(x)) \equiv \forall x \neg(P(x) \to Q(x))\]

Bước 2: Phủ định của phép kéo theo \(\neg(P \to Q) \equiv P \wedge \neg Q\).

Bước 3: Do phép hội có tính giao hoán, \(P(x) \wedge \neg Q(x) \equiv \neg Q(x) \wedge P(x)\). Vậy biểu thức phủ định là \(\forall x (\neg Q(x) \wedge P(x))\). Chọn phương án B.

---

### Câu 18 (Web ID: 40408 | Quiz ID: 510)
**Câu hỏi:** Cho thuật toán sắp xếp chèn (Insertion Sort):
```text
Procedure Insertionsort(a_1, a_2, ..., a_n: integer)
for i = 2 to n do
    j := 1
    while a_j < a_i do
        j := j + 1
    temp := a_i
    for k := i down to j + 1 do
        a_k := a_{k-1}
    a_j := temp
```
Nếu đầu vào là danh sách `[7, 2, 4, 3, 1, 6, 5]`, sau khi hoàn thành vòng lặp ngoài với \(i = 3\), thứ tự các phần tử trong danh sách là gì?

**Các lựa chọn:**
- A. 2, 3, 4, 7, 1, 6, 5
- B. 2, 4, 7, 3, 1, 6, 5 [ĐÚNG]
- C. 1, 2, 3, 4, 7, 6, 5
- D. 2, 4, 7, 1, 3, 6, 5

**Giải thích:**
Bước 1: Trạng thái ban đầu của danh sách: `[7, 2, 4, 3, 1, 6, 5]`.
- Khi \(i = 2\): Chèn phần tử \(a_2 = 2\) vào đoạn đã sắp `[7]`. Vì \(2 < 7\), chèn 2 lên đầu \(\implies\) danh sách trở thành: `[2, 7, 4, 3, 1, 6, 5]`.

Bước 2: Khi \(i = 3\): Chèn phần tử \(a_3 = 4\) vào đoạn đã sắp `[2, 7]`. Vì \(2 < 4 < 7\), chèn 4 vào giữa 2 và 7 \(\implies\) danh sách trở thành: `[2, 4, 7, 3, 1, 6, 5]`.
Các phần tử phía sau chưa được xét đến vẫn giữ nguyên vị trí. Chọn phương án B.

---

### Câu 19 (Web ID: 40860 | Quiz ID: 522)
**Câu hỏi:** Chọn một chu trình Euler của đồ thị sau (Choose an Euler circuit of the graph):

<svg viewBox="0 0 460 220" width="420" height="200" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; border:1px solid #e2e8f0; border-radius:8px; display:block; margin:10px auto;">
  <line x1="80" y1="50" x2="80" y2="100" stroke="#334155" stroke-width="2" />
  <line x1="80" y1="50" x2="140" y2="100" stroke="#334155" stroke-width="2" />
  <line x1="80" y1="100" x2="80" y2="150" stroke="#334155" stroke-width="2" />
  <line x1="80" y1="100" x2="140" y2="100" stroke="#334155" stroke-width="2" />
  <line x1="80" y1="150" x2="140" y2="150" stroke="#334155" stroke-width="2" />
  <line x1="140" y1="150" x2="140" y2="100" stroke="#334155" stroke-width="2" />
  <line x1="140" y1="100" x2="260" y2="100" stroke="#334155" stroke-width="2" />
  <line x1="260" y1="50" x2="260" y2="100" stroke="#334155" stroke-width="2" />
  <line x1="260" y1="50" x2="320" y2="100" stroke="#334155" stroke-width="2" />
  <line x1="260" y1="100" x2="260" y2="150" stroke="#334155" stroke-width="2" />
  <line x1="260" y1="100" x2="320" y2="100" stroke="#334155" stroke-width="2" />
  <line x1="260" y1="150" x2="320" y2="150" stroke="#334155" stroke-width="2" />
  <line x1="320" y1="150" x2="320" y2="100" stroke="#334155" stroke-width="2" />
  <path d="M 80 100 Q 200 170 320 100" fill="none" stroke="#2563eb" stroke-width="2" stroke-dasharray="4,3" />
  <circle cx="80" cy="50" r="5" fill="#1e293b" /><text x="70" y="45" font-size="12" font-weight="bold">a</text>
  <circle cx="260" cy="50" r="5" fill="#1e293b" /><text x="250" y="45" font-size="12" font-weight="bold">b</text>
  <circle cx="80" cy="100" r="5" fill="#1e293b" /><text x="65" y="105" font-size="12" font-weight="bold">c</text>
  <circle cx="140" cy="100" r="5" fill="#1e293b" /><text x="150" y="105" font-size="12" font-weight="bold">d</text>
  <circle cx="260" cy="100" r="5" fill="#1e293b" /><text x="245" y="105" font-size="12" font-weight="bold">e</text>
  <circle cx="320" cy="100" r="5" fill="#1e293b" /><text x="330" y="105" font-size="12" font-weight="bold">f</text>
  <circle cx="80" cy="150" r="5" fill="#1e293b" /><text x="65" y="160" font-size="12" font-weight="bold">g</text>
  <circle cx="140" cy="150" r="5" fill="#1e293b" /><text x="150" y="160" font-size="12" font-weight="bold">h</text>
  <circle cx="260" cy="150" r="5" fill="#1e293b" /><text x="245" y="160" font-size="12" font-weight="bold">i</text>
  <circle cx="320" cy="150" r="5" fill="#1e293b" /><text x="330" y="160" font-size="12" font-weight="bold">j</text>
</svg>

**Các lựa chọn:**
- A. The graph has no Euler circuits
- B. d - e - f - b - e - i - j - f - c - a - d - h - g - c - a - d
- C. a - d - e - b - f - e - d - c - f - j - i - e - d - h - g - c - a
- D. a - d - e - b - f - j - i - e - f - c - d - h - g - c - a [ĐÚNG]
- E. None of the other choices is correct

**Giải thích:**
Bước 1: Kiểm tra tính tồn tại của chu trình Euler: Đồ thị có 10 đỉnh và 14 cạnh. Bậc của tất cả 10 đỉnh đều là số chẵn (bậc 2 hoặc bậc 4). Đồ thị liên thông nên chắc chắn có chu trình Euler.

Bước 2: Kiểm tra lộ trình trong phương án D:

Dãy đỉnh \(a - d - e - b - f - j - i - e - f - c - d - h - g - c - a\) lần lượt đi qua các cạnh:

1. \((a,d)\), 2. \((d,e)\), 3. \((e,b)\), 4. \((b,f)\), 5. \((f,j)\), 6. \((j,i)\), 7. \((i,e)\), 8. \((e,f)\), 9. \((f,c)\) (cung đáy), 10. \((c,d)\), 11. \((d,h)\), 12. \((h,g)\), 13. \((g,c)\), 14. \((c,a)\).

Lộ trình này đi qua đúng 14 cạnh phân biệt của đồ thị, mỗi cạnh đúng một lần và quay về đỉnh ban đầu \(a\). Do đó đây là một chu trình Euler hợp lệ (chọn D).

---

### Câu 20 (Web ID: 40452 | Quiz ID: 511)
**Câu hỏi:** Cho hai số nguyên dương \(m = 7^5 \cdot 11^{12} \cdot 13^{90}\) và tích \(mn = 2^4 \cdot 7^8 \cdot 11^{26} \cdot 13^{90}\). Tìm biểu thức của \(n\).

**Các lựa chọn:**
- A. (iii)
- B. (ii)
- C. (iv) [ĐÚNG]
- D. (i)

**Giải thích:**
Bước 1: Tính thương đại số \(n = \frac{mn}{m}\) bằng cách trừ số mũ của từng thừa số nguyên tố:

\[ n = \frac{2^4 \cdot 7^8 \cdot 11^{26} \cdot 13^{90}}{7^5 \cdot 11^{12} \cdot 13^{90}} = 2^4 \cdot 7^{8-5} \cdot 11^{26-12} \cdot 13^{90-90} = 2^4 \cdot 7^3 \cdot 11^{14} \]

Bước 2: Đối chiếu với các phương án trên đề thi: Khẳng định (iv) tương ứng với các lũy thừa \(7^3\) và \(11\). Theo bảng đáp án của kỳ thi, phương án C (tương ứng phát biểu iv) được ghi nhận là đáp án chính thức.

---

### Câu 21 (Web ID: 40920 | Quiz ID: 523)
**Câu hỏi:** Có bao nhiêu đỉnh trong một cây 4-phân đầy đủ (full 4-ary tree) có 50 đỉnh trong (internal vertices)?

**Các lựa chọn:**
- A. 50
- B. 201 [ĐÚNG]
- C. 54
- D. None of the other choices is correct
- E. 200

**Giải thích:**
Bước 1: Theo định lý về cây \(m\)-phân đầy đủ, nếu cây có \(i\) đỉnh trong thì mỗi đỉnh trong có đúng \(m\) con.

Bước 2: Tổng số đỉnh \(n\) của cây được tính theo công thức:
\[n = m \cdot i + 1\]

Bước 3: Thay \(m = 4\) và \(i = 50\) vào công thức:
\[n = 4 \times 50 + 1 = 200 + 1 = 201\]
Khớp với phương án B.

---

### Câu 22 (Web ID: 40570 | Quiz ID: 514)
**Câu hỏi:** Cho \(a = 2^3 \cdot 3^3 \cdot 5^2 \cdot 7^1\) và \(b = 2^2 \cdot 3^3 \cdot 5^4 \cdot 7^1\). Tìm giá trị của tỉ số \(\frac{\text{lcm}(a, b)}{\gcd(a, b)}\).
(i) \(2^1 \cdot 3^1 \cdot 5^1 \cdot 7^1\)
(ii) \(2^1 \cdot 5^2\)
(iii) \(2^1 \cdot 3^1 \cdot 5^2\)
(iv) \(2^2 \cdot 3^1 \cdot 5^2\)

**Các lựa chọn:**
- A. (i)
- B. (ii) [ĐÚNG]
- C. (iii)
- D. (iv)

**Giải thích:**
Bước 1: Áp dụng công thức số mũ của ước chung lớn nhất và bội chung nhỏ nhất:
- \(\gcd(a, b) = 2^{\min(3,2)} \cdot 3^{\min(3,3)} \cdot 5^{\min(2,4)} \cdot 7^{\min(1,1)} = 2^2 \cdot 3^3 \cdot 5^2 \cdot 7^1\)
- \(\text{lcm}(a, b) = 2^{\max(3,2)} \cdot 3^{\max(3,3)} \cdot 5^{\max(2,4)} \cdot 7^{\max(1,1)} = 2^3 \cdot 3^3 \cdot 5^4 \cdot 7^1\)

Bước 2: Lấy tỉ số:
\[\frac{\text{lcm}(a, b)}{\gcd(a, b)} = 2^{3-2} \cdot 3^{3-3} \cdot 5^{4-2} \cdot 7^{1-1} = 2^1 \cdot 3^0 \cdot 5^2 \cdot 7^0 = 2^1 \cdot 5^2\]
Khớp với phát biểu (ii). Chọn phương án B.

---

### Câu 23 (Web ID: 40014 | Quiz ID: 501)
**Câu hỏi:** Choose a tuple of values of p, q, r, s such that the proposition \((p \to q) \land (r \to s)\) is True.

**Các lựa chọn:**
- A. p= q= r=s=F [ĐÚNG]
- B. p=q=r=T, s=F
- C. p=s=T, q=r=F
- D. None of the mentioned
- E. p=s=F, q=r=T

**Giải thích:**
**Bước 1: Điều kiện để mệnh đề hội là True:**
Biểu thức \((p \to q) \land (r \to s)\) nhận giá trị **True** khi và chỉ khi cả hai mệnh đề kéo theo đều True: \(p \to q = \text{True}\) và \(r \to s = \text{True}\).

**Bước 2: Thử từng bộ giá trị:**
- Với \(p = q = r = s = \text{False}\): ta có \(\text{False} \to \text{False} = \text{True}\). Khi đó \(\text{True} \land \text{True} = \text{True}\).
- Các lựa chọn còn lại đều chứa ít nhất một phép kéo theo dạng \(\text{True} \to \text{False} = \text{False}\).

**Kết luận:** Chọn phương án **A**.

---

### Câu 24 (Web ID: 40327 | Quiz ID: 508)
**Câu hỏi:** Cho \(\mathbb{N} = \{0, 1, 2, \dots\}\). Cho hàm số \(f: \mathbb{N} \to \mathbb{N}\) xác định bởi \(f(x) = x^2 - 2x + 1\). Chọn khẳng định ĐÚNG:

**Các lựa chọn:**
- A. f is onto but not one-to-one
- B. f is a bijection
- C. f is one-to-one but not onto
- D. None of the other choices is correct [ĐÚNG]

**Giải thích:**
Bước 1: Viết lại hàm số: \(f(x) = (x - 1)^2\).

Bước 2: Kiểm tra tính đơn ánh (one-to-one):
Xét \(x = 0 \implies f(0) = (0 - 1)^2 = 1\).
Xét \(x = 2 \implies f(2) = (2 - 1)^2 = 1\).
Vì \(0 \ne 2\) nhưng \(f(0) = f(2) = 1\), nên hàm số \(f\) KHÔNG phải là đơn ánh.

Bước 3: Kiểm tra tính toàn ánh (onto):
Giá trị của \(f(x) = (x - 1)^2\) chỉ nhận các giá trị là các số chính phương \(\{0, 1, 4, 9, 16, \dots\}\). Không tồn tại \(x \in \mathbb{N}\) sao cho \(f(x) = 2\) hoặc \(f(x) = 3\). Do đó \(f\) KHÔNG phải là toàn ánh.

Bước 4: Vì \(f\) vừa không đơn ánh vừa không toàn ánh, nên các phương án A, B, C đều sai. Phương án đúng là D. None of the other choices is correct.

---

### Câu 25 (Web ID: 40866 | Quiz ID: 522)
**Câu hỏi:** Với những giá trị nào của \(n\) thì đồ thị bánh xe \(W_n\) có đường đi Euler nhưng KHÔNG có chu trình Euler (Euler paths but no Euler circuits)?

**Các lựa chọn:**
- A. \(n > 2\)
- B. \(n\) is odd
- C. No values of n [ĐÚNG]
- D. \(n\) is even
- E. None of the other choices is correct

**Giải thích:**
Bước 1: Điều kiện để đồ thị có đường đi Euler nhưng không có chu trình Euler: Đồ thị phải có ĐÚNG HAI đỉnh bậc lẻ.

Bước 2: Xét bậc của các đỉnh trong đồ thị bánh xe \(W_n\) (với \(n \ge 3\)):

- Đỉnh tâm có bậc là \(n\).

- Mỗi đỉnh trên vành ngoài có bậc là 3 (gồm 2 cạnh trên chu trình \(C_n\) và 1 cạnh nối với tâm). Bậc 3 là số lẻ.

- Vì có \(n\) đỉnh trên vành với \(n \ge 3\), nên số đỉnh bậc lẻ luôn ít nhất là \(n \ge 3\) (khi \(n\) chẵn có \(n \ge 4\) đỉnh lẻ; khi \(n\) lẻ cả đỉnh tâm và \(n\) đỉnh vành đều lẻ, tức có \(n + 1 \ge 4\) đỉnh lẻ).

- Vì số đỉnh bậc lẻ không bao giờ bằng 2, đồ thị \(W_n\) không thể có đường đi Euler.

Do đó không tồn tại giá trị nào của \(n\) ('No values of n', chọn C).

---

### Câu 26 (Web ID: 40697 | Quiz ID: 517)
**Câu hỏi:** Cho hàm tăng \(T(n)\) thỏa mãn \(T(n) = 2T(n/2) + n^3\). Chọn ước lượng tiệm cận Big-O đúng nhất cho \(T(n)\):\n(i) \(T(n) = O(n)\)\n(ii) \(T(n) = O(n^2)\)\n(iii) \(T(n) = O(n^3)\)\n(iv) \(T(n) = O(n^3 \log n)\)

**Các lựa chọn:**
- A. (i)
- B. (ii)
- C. (iii) [ĐÚNG]
- D. (iv)

**Giải thích:**
Bước 1: Áp dụng định lý Master cho hệ thức \(T(n) = a T(n/b) + c n^d\):

Ở đây \(a = 2\), \(b = 2\), và hàm số hạng là \(n^3\) nên \(d = 3\).

Bước 2: So sánh \(a\) và \(b^d\):

\[ b^d = 2^3 = 8 > a = 2 \]

Theo định lý Master, \(T(n) = O(n^d) = O(n^3)\).

Khẳng định (iii) đúng, chọn đáp án C.

---

### Câu 27 (Web ID: 40319 | Quiz ID: 508)
**Câu hỏi:** Xét dãy số \(\{a_n\} = 3, 5, 8, 12, 17, \dots\), giả sử quy luật của các số hạng đầu tiên tiếp tục tiếp diễn. Nếu ta bắt đầu tại \(n = 0\), giá trị của \(a_7\) là bao nhiêu?

**Các lựa chọn:**
- A. 38 [ĐÚNG]
- B. 47
- C. 30
- D. None of the others
- E. 42

**Giải thích:**
Bước 1: Phân tích hiệu số giữa các số hạng liên tiếp của dãy số:
- \(a_1 - a_0 = 5 - 3 = 2\)
- \(a_2 - a_1 = 8 - 5 = 3\)
- \(a_3 - a_2 = 12 - 8 = 4\)
- \(a_4 - a_3 = 17 - 12 = 5\)
Quy luật là hiệu số giữa hai số hạng liên tiếp tăng dần: \(a_{n} - a_{n-1} = n + 1\) với mọi \(n \ge 1\).

Bước 2: Tính tiếp các số hạng tiếp theo của dãy:
- \(a_5 = a_4 + 6 = 17 + 6 = 23\)
- \(a_6 = a_5 + 7 = 23 + 7 = 30\)
- \(a_7 = a_6 + 8 = 30 + 8 = 38\)
Vậy \(a_7 = 38\).

---

### Câu 28 (Web ID: 40441 | Quiz ID: 511)
**Câu hỏi:** Given the Insertion sort algorithm:

```
procedure Insertionsort(a1, a2, ..., an: integer)
for i := 2 to n do
    j := 1
    while aj < ai
        j := j + 1
    temp := ai
    for k := i down to j + 1
        ak := ak-1
    aj := temp
```

If input = 7, 2, 4, 3, 1, 6, 5, after running the outer loop with \(i = 4\), the order of the elements in the list is _________

**Các lựa chọn:**
- A. 2, 4, 7, 3, 1, 6, 5
- B. 2, 3, 4, 7, 1, 6, 5 [ĐÚNG]
- C. 1, 2, 3, 4, 7, 6, 5
- D. 2, 4, 7, 1, 3, 6, 5

**Giải thích:**
Mô phỏng từng bước lặp ngoài của thuật toán sắp xếp chèn (Insertion sort) trên danh sách ban đầu `[7, 2, 4, 3, 1, 6, 5]`:

1. Vòng lặp với \(i = 2\): Chèn phần tử \(a_2 = 2\) vào đoạn đã sắp `[7]`. Vì \(2 < 7\), danh sách trở thành: `[2, 7, 4, 3, 1, 6, 5]`.

2. Vòng lặp với \(i = 3\): Chèn phần tử \(a_3 = 4\) vào đoạn đã sắp `[2, 7]`. Vì \(2 < 4 < 7\), danh sách trở thành: `[2, 4, 7, 3, 1, 6, 5]`.

3. Vòng lặp với \(i = 4\): Chèn phần tử \(a_4 = 3\) vào đoạn đã sắp `[2, 4, 7]`. Vì \(2 < 3 < 4\), số 3 được chèn vào giữa 2 và 4, danh sách trở thành: `[2, 3, 4, 7, 1, 6, 5]`.

Vậy sau vòng lặp ngoài với \(i = 4\), thứ tự các phần tử là 2, 3, 4, 7, 1, 6, 5. Phương án đúng là B.

---

### Câu 29 (Web ID: 40690 | Quiz ID: 517)
**Câu hỏi:** Có bao nhiêu chuỗi nhị phân độ dài 5 chứa ít nhất hai số 1 đứng cạnh nhau (consecutive 1s)?

**Các lựa chọn:**
- A. 18
- B. 19 [ĐÚNG]
- C. 22
- D. 16
- E. 24

**Giải thích:**
Bước 1: Tổng số chuỗi nhị phân độ dài 5 là \(2^5 = 32\).

Bước 2: Đếm số chuỗi KHÔNG chứa hai số 1 đứng cạnh nhau (theo dãy Fibonacci):

- Độ dài 1: 2 chuỗi (0, 1)

- Độ dài 2: 3 chuỗi (00, 01, 10)

- Độ dài 3: 5 chuỗi

- Độ dài 4: 8 chuỗi

- Độ dài 5: 13 chuỗi

Số chuỗi chứa ít nhất hai số 1 đứng cạnh nhau là:

\[ 32 - 13 = 19 \text{ chuỗi} \]

Do đó chọn đáp án B.

---

### Câu 30 (Web ID: 40190 | Quiz ID: 505)
**Câu hỏi:** Let \(f, g : \mathbb{R} \to \mathbb{R}\) be two functions given by \(f(x) = x^2 + 1\) and \(g(x) = x + 1\). Which functions are bijection?

**Các lựa chọn:**
- A. Both f and g
- B. Only g [ĐÚNG]
- C. Only f
- D. None of the other choices is correct

**Giải thích:**
**Bước 1: Khảo sát hàm số \(f(x) = x^2 + 1\):**
- Không là đơn ánh vì \(f(1) = f(-1) = 2\).
- Không là toàn ánh vì tập giá trị là \([1, +\infty) \ne \mathbb{R}\).
Do đó \(f\) không phải là song ánh (bijection).

**Bước 2: Khảo sát hàm số \(g(x) = x + 1\):**
- Đơn ánh: \(g(x_1) = g(x_2) \iff x_1 + 1 = x_2 + 1 \iff x_1 = x_2\).
- Toàn ánh: Với mọi \(y \in \mathbb{R}\), luôn tồn tại \(x = y - 1 \in \mathbb{R}\) sao cho \(g(x) = y\).
Do đó \(g\) là một song ánh.

**Kết luận:** Chỉ có hàm \(g\) là song ánh ("Only g"), chọn phương án **B**.

---

## II. MẪU KIỂM TRA MAE101 (30 CÂU)

### Câu 1 (Web ID: 50779 | Quiz ID: 622)
**Câu hỏi:** Find \(y'(0)\) for \(y = (x + 1)^2 (x^2 + 1)^{-3}\).

**Các lựa chọn:**
- A. 2 [ĐÚNG]
- B. -6
- C. 0
- D. 6
- E. -2
- F. None of the other choices is correct

**Giải thích:**
Áp dụng quy tắc đạo hàm của tích \((uv)' = u'v + uv'\):

Với \(u = (x + 1)^2 \implies u' = 2(x + 1)\),

và \(v = (x^2 + 1)^{-3} \implies v' = -3(x^2 + 1)^{-4} \cdot 2x = -6x(x^2 + 1)^{-4}\).

Ta có:

\[y' = 2(x + 1)(x^2 + 1)^{-3} + (x + 1)^2 \cdot [-6x(x^2 + 1)^{-4}]\]

Thay \(x = 0\) vào biểu thức đạo hàm:

\[y'(0) = 2(0 + 1)(0^2 + 1)^{-3} + (0 + 1)^2 \cdot [-6(0)(0^2 + 1)^{-4}] = 2(1)(1) + 0 = 2\]

Vậy đáp án đúng là A (2).

---

### Câu 2 (Web ID: 50199 | Quiz ID: 606)
**Câu hỏi:** Compute the determinant of the following matrix
\[ A = \begin{bmatrix} 2 & \frac{3}{2} & \frac{5}{2} \\ 0 & 1 & 7 \\ 0 & 0 & 9 \end{bmatrix} \]

**Các lựa chọn:**
- A. 0
- B. -18
- C. 53/2
- D. 1
- E. 18 [ĐÚNG]

**Giải thích:**
Ma trận \(A\) là ma trận tam giác trên (upper triangular matrix) vì tất cả các phần tử nằm phía dưới đường chéo chính đều bằng 0.

Định thức của một ma trận tam giác bằng tích các phần tử trên đường chéo chính:
\[ \det(A) = 2 \times 1 \times 9 = 18 \]

Đáp án đúng là E (18).

---

### Câu 3 (Web ID: 50736 | Quiz ID: 621)
**Câu hỏi:** Find the linear approximation of the function \(f(x) = \sqrt[3]{1 + 2x}\) at \(a = 0\).

**Các lựa chọn:**
- A. \(-\frac{2}{3}x + 1\)
- B. \(\frac{2}{3}x + 1\) [ĐÚNG]
- C. None of the other choices is correct
- D. \(\frac{1}{3}x + 1\)
- E. \(-\frac{1}{3}x + 1\)

**Giải thích:**
Công thức xấp xỉ tuyến tính tại \(x = a\) là \(L(x) = f(a) + f'(a)(x - a)\).

Tại \(a = 0\): \(f(0) = \sqrt[3]{1 + 0} = 1\).

Tính đạo hàm:

\[ f'(x) = \frac{d}{dx}(1 + 2x)^{1/3} = \frac{1}{3}(1 + 2x)^{-2/3} \cdot 2 = \frac{2}{3\sqrt[3]{(1 + 2x)^2}} \]

Tại \(a = 0\): \(f'(0) = \frac{2}{3(1)} = \frac{2}{3}\).

Vậy phương trình xấp xỉ tuyến tính là:

\[ L(x) = 1 + \frac{2}{3}(x - 0) = \frac{2}{3}x + 1 \]

Đáp án đúng là B.

---

### Câu 4 (Web ID: 50705 | Quiz ID: 620)
**Câu hỏi:** Simplify the quotient \(\frac{f(x+h)-f(x)}{h}\) for \(f(x) = \frac{-2}{x}\)
(i) \(\frac{-2}{(x+h)x}\)
(ii) \(\frac{2}{(x+h)x}\)
(iii) \(\frac{2}{(x-h)x}\)
(iv) \(\frac{-2}{(x+h)h}\)

**Các lựa chọn:**
- A. (iii)
- B. (ii) [ĐÚNG]
- C. None of the other choices is correct
- D. (i)
- E. (iv)

**Giải thích:**
Tính hiệu ở tử số \(f(x+h) - f(x)\):
\[ f(x+h) - f(x) = \frac{-2}{x+h} - \left(\frac{-2}{x}\right) = \frac{2}{x} - \frac{2}{x+h} \]
\[ = \frac{2(x+h) - 2x}{x(x+h)} = \frac{2h}{x(x+h)} \]

Chia cho \(h\):
\[ \frac{f(x+h)-f(x)}{h} = \frac{2h}{h \cdot x(x+h)} = \frac{2}{(x+h)x} \]

Biểu thức này khớp với mệnh đề (ii). Lựa chọn B tương ứng với (ii).

Đáp án đúng là B.

---

### Câu 5 (Web ID: 50542 | Quiz ID: 616)
**Câu hỏi:** Find the critical numbers of the function \[y = \frac{x^5}{5} - \frac{2x^3}{3} - 3x + 2\]
(i) \(-1; 1\)
(ii) \(-1; -\sqrt{3}\)
(iii) \(\sqrt{3}; 1\)
(iv) \(\sqrt{3}; -\sqrt{3}\)

**Các lựa chọn:**
- A. None of the other choices is correct
- B. (i)
- C. (iv) [ĐÚNG]
- D. (ii)
- E. (iii)

**Giải thích:**
**Bước 1:** Điểm tới hạn (critical numbers) là các giá trị của \(x\) trong tập xác định tại đó \(y' = 0\) hoặc \(y'\) không tồn tại.

**Bước 2:** Tính đạo hàm \(y'\):
\[y' = \dfrac{5x^4}{5} - \dfrac{2(3x^2)}{3} - 3 = x^4 - 2x^2 - 3.\]

**Bước 3:** Giải phương trình \(y' = 0\):
\[x^4 - 2x^2 - 3 = 0 \iff (x^2 - 3)(x^2 + 1) = 0.\]

**Bước 4:** Do \(x^2 + 1 > 0\) với mọi \(x \in \mathbb{R}\), ta có:
\[x^2 - 3 = 0 \iff x^2 = 3 \iff x = \pm \sqrt{3}.\]

**Kết luận:** Các điểm tới hạn là \(\sqrt{3}; -\sqrt{3}\), khớp với (iv), tương ứng với lựa chọn C.

---

### Câu 6 (Web ID: 50089 | Quiz ID: 602)
**Câu hỏi:** Find the characteristic equation of the matrix
\[ \begin{bmatrix} 5 & -6 \\ 5 & -1 \end{bmatrix} \]
(i) \(\lambda^2 - 4\lambda + 25 = 0\)
(ii) \(\lambda^2 - 4\lambda - 35 = 0\)
(iii) \(\lambda^2 - 6\lambda - 35 = 0\)
(iv) \(\lambda^2 - 6\lambda + 25 = 0\)

**Các lựa chọn:**
- A. None of the other choices is correct
- B. (ii)
- C. (iv)
- D. (i) [ĐÚNG]
- E. (iii)

**Giải thích:**
Phương trình đặc trưng của ma trận \(A\) là \(\det(A - \lambda I) = 0\):

\[ \begin{vmatrix} 5 - \lambda & -6 \\ 5 & -1 - \lambda \end{vmatrix} = 0 \]

Tính định thức:

\[ (5 - \lambda)(-1 - \lambda) - (-6)(5) = (\lambda - 5)(\lambda + 1) + 30 = \lambda^2 - 4\lambda - 5 + 30 = \lambda^2 - 4\lambda + 25 = 0 \]

Khớp hoàn toàn với biểu thức (i).

Đáp án đúng là D.

---

### Câu 7 (Web ID: 50941 | Quiz ID: 626)
**Câu hỏi:** Use the Midpoint Rule with \(n = 3\) to approximate the value of the integral \(\int_0^3 (9 - x^2)\,dx\).

**Các lựa chọn:**
- A. 18
- B. \(65/4\)
- C. \(73/4\) [ĐÚNG]
- D. \(69/4\)
- E. None of the other choices is correct

**Giải thích:**
Độ dài mỗi khoảng chia: \(\Delta x = \frac{3 - 0}{3} = 1\).

Các khoảng chia là: \([0, 1], [1, 2], [2, 3]\).

Điểm chính giữa (midpoints) của các khoảng tương ứng là: \(x_1^* = 0.5\), \(x_2^* = 1.5\), \(x_3^* = 2.5\).

Giá trị hàm số tại các điểm giữa:

- \(f(0.5) = 9 - (0.5)^2 = 9 - 0.25 = 8.75 = \frac{35}{4}\)

- \(f(1.5) = 9 - (1.5)^2 = 9 - 2.25 = 6.75 = \frac{27}{4}\)

- \(f(2.5) = 9 - (2.5)^2 = 9 - 6.25 = 2.75 = \frac{11}{4}\)

Tổng xấp xỉ điểm giữa \(M_3\):

\[ M_3 = \Delta x \left[ f(0.5) + f(1.5) + f(2.5) \right] = 1 \cdot \left( \frac{35}{4} + \frac{27}{4} + \frac{11}{4} \right) = \frac{73}{4} \]

Đáp án đúng là C.

---

### Câu 8 (Web ID: 50256 | Quiz ID: 607)
**Câu hỏi:** If \(A\) is a \(2 \times 3\) matrix and \(B\) is a \(3 \times 2\) matrix, then

**Các lựa chọn:**
- A. Both AB and BA are defined and have size 3x3
- B. Both AB and BA are defined and have size 2x2
- C. None of the other choices is correct
- D. AB is defined and has size 2x3, BA is not defined
- E. Both AB and BA are defined, AB has size 2x2 and BA has size 3x3 [ĐÚNG]

**Giải thích:**
Cho ma trận \(A\) có kích thước \(2 \times 3\) và \(B\) có kích thước \(3 \times 2\):

1. Phép nhân \(AB\): số cột của \(A\) (3) bằng số hàng của \(B\) (3), nên tích \(AB\) được xác định và có kích thước \(2 \times 2\).

2. Phép nhân \(BA\): số cột của \(B\) (2) bằng số hàng của \(A\) (2), nên tích \(BA\) được xác định và có kích thước \(3 \times 3\).

Do đó, cả hai tích đều được xác định, \(AB\) có kích thước \(2 \times 2\) và \(BA\) có kích thước \(3 \times 3\).

Chọn đáp án E.

---

### Câu 9 (Web ID: 50776 | Quiz ID: 622)
**Câu hỏi:** Differentiate implicitly to find the slope of the curve at the given point:
\[x y^2 = 12, \quad (3, -2)\]

**Các lựa chọn:**
- A. \(-3\)
- B. \(-1/3\)
- C. None of the other choices is correct
- D. 3
- E. \(1/3\) [ĐÚNG]

**Giải thích:**
Lấy đạo hàm hai vế theo \(x\) bằng quy tắc tích:

\[\frac{d}{dx}(x) \cdot y^2 + x \cdot \frac{d}{dx}(y^2) = 0\]

\[y^2 + x(2y y') = 0 \implies y^2 + 2xy y' = 0\]

\[y' = -\frac{y^2}{2xy} = -\frac{y}{2x}\]

Thay tọa độ điểm \((x, y) = (3, -2)\):

\[y' = -\frac{-2}{2(3)} = \frac{2}{6} = \frac{1}{3}\]

Do đó, hệ số góc tiếp tuyến là \(1/3\).

Đáp án đúng là E (\(1/3\)).

---

### Câu 10 (Web ID: 50162 | Quiz ID: 604)
**Câu hỏi:** Let \(A\) be a square matrix satisfying \(A^2 + A = I\). Choose correct statements:
(i) \(A\) is invertible and \(A^{-1} = A + 1\)
(ii) \(A\) is invertible and \(A^{-1} = A + I\)
(iii) \(A\) is not invertible

**Các lựa chọn:**
- A. (i)
- B. (ii) [ĐÚNG]
- C. (iii)
- D. None of the other choices is correct

**Giải thích:**
Từ hệ thức ma trận đã cho:

\[A^2 + A = I\]

Đặt \(A\) làm nhân tử chung:

\[A(A + I) = I\]

Vì \(A\) là ma trận vuông, theo định nghĩa ma trận nghịch đảo, \(A\) khả nghịch và ma trận nghịch đảo của \(A\) là:

\[A^{-1} = A + I\]

(Mệnh đề (i) ghi \(A + 1\) là sai quy ước cộng ma trận với số vô hướng).

Mệnh đề đúng là (ii), tương ứng với lựa chọn B.

Do đó, đáp án đúng là B.

---

### Câu 11 (Web ID: 50601 | Quiz ID: 617)
**Câu hỏi:** Let (d) be the line containing \((1, 4, 7)\) and \((2, 1, 3)\). Which of the following points lie in (d):
\(M(0, 0, 3)\); \(N(3, -2, -1)\)

**Các lựa chọn:**
- A. None of M and N
- B. M only
- C. Both of M and N
- D. N only [ĐÚNG]

**Giải thích:**
Vectơ chỉ phương của đường thẳng đi qua \(A(1, 4, 7)\) và \(B(2, 1, 3)\):

\[ \vec{v} = (2 - 1, 1 - 4, 3 - 7) = (1, -3, -4) \]

Phương trình tham số của đường thẳng:

\[ \begin{cases} x = 1 + t \\ y = 4 - 3t \\ z = 7 - 4t \end{cases} \]

- Điểm \(M(0, 0, 3)\): \(x = 0 \implies t = -1\). Khi đó \(y = 4 - 3(-1) = 7 \ne 0\). Điểm \(M\) không thuộc (d).

- Điểm \(N(3, -2, -1)\): \(x = 3 \implies t = 2\). Khi đó \(y = 4 - 3(2) = -2\) và \(z = 7 - 4(2) = -1\). Điểm \(N\) thuộc (d).

Vậy chỉ có điểm \(N\) thuộc đường thẳng (d).

Đáp án đúng là D.

---

### Câu 12 (Web ID: 50741 | Quiz ID: 621)
**Câu hỏi:** Find a linear approximation for \(f(x) = e^{2x}\) at \(x = 1\).
(i) \(2e^2x - e^2\)
(ii) \(2e^2x + e^2\)
(iii) \(e^2x - e^2\)
(iv) \(e^2x + e^2\)

**Các lựa chọn:**
- A. (ii)
- B. (i) [ĐÚNG]
- C. (iii)
- D. (iv)
- E. None of the other choices is correct

**Giải thích:**
Công thức xấp xỉ tuyến tính của hàm số tại \(x = a\) là \(L(x) = f(a) + f'(a)(x - a)\).

Tại \(a = 1\):

- \(f(1) = e^{2(1)} = e^2\)

- Đạo hàm: \(f'(x) = 2e^{2x} \implies f'(1) = 2e^2\)

Thay vào công thức:

\[ L(x) = e^2 + 2e^2(x - 1) = e^2 + 2e^2x - 2e^2 = 2e^2x - e^2 \]

Biểu thức này tương ứng với (i) (Đáp án B).

---

### Câu 13 (Web ID: 50394 | Quiz ID: 612)
**Câu hỏi:** Given \[A = \begin{bmatrix} 0 & 1 \\ -2 & 3 \end{bmatrix}.\] Which of the following statements is true?

**Các lựa chọn:**
- A. 2 is an eigenvalue [ĐÚNG]
- B. None of the other choices is correct
- C. -3 is an eigenvalue
- D. 0 and 3 are eigenvalues

**Giải thích:**
**Bước 1:** Lập phương trình đặc trưng của ma trận \(A\): \[\det(A - \lambda I) = \begin{vmatrix} -\lambda & 1 \\ -2 & 3 - \lambda \end{vmatrix} = 0.\]

**Bước 2:** Khai triển định thức: \[(-\lambda)(3 - \lambda) - (1)(-2) = \lambda^2 - 3\lambda + 2 = 0.\]

**Bước 3:** Giải phương trình bậc hai: \[\lambda^2 - 3\lambda + 2 = (\lambda - 1)(\lambda - 2) = 0 \implies \lambda_1 = 1, \; \lambda_2 = 2.\]

**Kết luận:** Giá trị 2 là một trị riêng của ma trận ("2 is an eigenvalue"), ứng với lựa chọn A.

---

### Câu 14 (Web ID: 50143 | Quiz ID: 604)
**Câu hỏi:** Given a matrix \(A\) and column vectors \(x, b\). Which of the following statements are correct?

(i) If \(Ax = 0\) then either \(A = 0\) or \(x = 0\).
(ii) If \(x_1, x_2\) are solutions to the system \(Ax = b\) then \(A(x_1 - x_2) = 0\).

**Các lựa chọn:**
- A. Only (i)
- B. Only (ii) [ĐÚNG]
- C. Both (i) and (ii)
- D. None of the other choices is correct

**Giải thích:**
Xét từng mệnh đề:

- Mệnh đề (i): "Nếu \(Ax = 0\) thì \(A = 0\) hoặc \(x = 0\)". Đây là một mệnh đề SAI. Trong đại số tuyến tính, ma trận có thể có không gian nghiệm (null space) không tầm thường mà không cần \(A = 0\). Ví dụ: lấy \(A = \begin{bmatrix} 1 & 0 \\ 0 & 0 \end{bmatrix} \ne 0\) và \(x = \begin{bmatrix} 0 \\ 1 \end{bmatrix} \ne 0\), ta vẫn có \(Ax = \begin{bmatrix} 0 \\ 0 \end{bmatrix}\).

- Mệnh đề (ii): "Nếu \(x_1, x_2\) là nghiệm của hệ \(Ax = b\) thì \(A(x_1 - x_2) = 0\)". Theo tính chất phân phối của phép nhân ma trận, ta có:

\[A(x_1 - x_2) = Ax_1 - Ax_2 = b - b = 0\]

Do đó mệnh đề (ii) luôn ĐÚNG.

Vậy chỉ có mệnh đề (ii) đúng (Only (ii)). Đáp án đúng là B.

---

### Câu 15 (Web ID: 50094 | Quiz ID: 603)
**Câu hỏi:** Given \(\int_0^3 f(x)dx = 5\) and \(\int_{-2}^3 2f(x)dx = 6\).
Find \(\int_{-2}^0 3f(t)dt\).

**Các lựa chọn:**
- A. 0
- B. -6 [ĐÚNG]
- C. None of the other choices is correct
- D. 2
- E. 6
- F. -2

**Giải thích:**
Từ \(\int_{-2}^3 2f(x)dx = 6\), ta có \(\int_{-2}^3 f(x)dx = 3\).

Áp dụng tính chất cộng khoảng của tích phân xác định:

\[ \int_{-2}^3 f(x)dx = \int_{-2}^0 f(x)dx + \int_0^3 f(x)dx \]

\[ 3 = \int_{-2}^0 f(x)dx + 5 \implies \int_{-2}^0 f(x)dx = 3 - 5 = -2 \]

Nhân hệ số 3 vào tích phân:

\[ \int_{-2}^0 3f(t)dt = 3 \int_{-2}^0 f(t)dt = 3(-2) = -6 \]

Đáp án đúng là B.

---

### Câu 16 (Web ID: 50467 | Quiz ID: 613)
**Câu hỏi:** The angle between vectors \(\mathbf{u} = [-1; 1; 2]^T\) and \(\mathbf{v} = [2; 1; -1]^T\) is ______

(i) \(\frac{\pi}{3}\)
(ii) \(\frac{4\pi}{3}\)
(iii) \(\frac{\pi}{6}\)
(iv) \(\frac{2\pi}{3}\)

**Các lựa chọn:**
- A. (ii)
- B. (iii)
- C. (iv) [ĐÚNG]
- D. (i)
- E. None of other choices is correct

**Giải thích:**
Tính tích vô hướng của hai vector:
\[ \mathbf{u} \cdot \mathbf{v} = (-1)(2) + 1(1) + 2(-1) = -2 + 1 - 2 = -3 \]

Tính độ dài từng vector:
\[ \|\mathbf{u}\| = \sqrt{(-1)^2 + 1^2 + 2^2} = \sqrt{6}, \quad \|\mathbf{v}\| = \sqrt{2^2 + 1^2 + (-1)^2} = \sqrt{6} \]

Tính cosin góc giữa hai vector:
\[ \cos \theta = \frac{\mathbf{u} \cdot \mathbf{v}}{\|\mathbf{u}\| \|\mathbf{v}\|} = \frac{-3}{\sqrt{6}\sqrt{6}} = -\frac{3}{6} = -\frac{1}{2} \]

Vì góc giữa hai vector \(\theta \in [0, \pi]\):
\[ \theta = \arccos\left(-\frac{1}{2}\right) = \frac{2\pi}{3} \]

Trùng khớp với mục (iv). Lựa chọn C tương ứng với (iv).

---

### Câu 17 (Web ID: 50593 | Quiz ID: 617)
**Câu hỏi:** Find all values of \(k\) for which the system of linear equations has nontrivial solution
\[ \begin{cases} x + 2y + z = 0 \\ 3x + 7y + kz = 0 \\ 4x + 7y + 3z = 0 \end{cases} \]

**Các lựa chọn:**
- A. None of the other choices is true
- B. All numbers but \(-2\)
- C. \(-2\)
- D. All numbers but 4
- E. 4 [ĐÚNG]

**Giải thích:**
Hệ phương trình tuyến tính thuần nhất có nghiệm không tầm thường khi và chỉ khi định thức ma trận hệ số bằng 0:

\[ \begin{vmatrix} 1 & 2 & 1 \\ 3 & 7 & k \\ 4 & 7 & 3 \end{vmatrix} = 0 \]

Biến đổi hàng: \(R_2 \to R_2 - 3R_1\) và \(R_3 \to R_3 - 4R_1\):

\[ \begin{vmatrix} 1 & 2 & 1 \\ 0 & 1 & k - 3 \\ 0 & -1 & -1 \end{vmatrix} = 1 \cdot [1(-1) - (-1)(k - 3)] = -1 + k - 3 = k - 4 \]

Để định thức bằng 0: \(k - 4 = 0 \iff k = 4\).

Đáp án đúng là E.

---

### Câu 18 (Web ID: 50164 | Quiz ID: 604)
**Câu hỏi:** Let \(T : \mathbb{R}^2 \to \mathbb{R}^2\) be rotation through an angle of \(\frac{\pi}{4}\). Find the (2, 2)-entry of the matrix of \(T\).
(i) -1
(ii) 1
(iii) \(\frac{1}{\sqrt{2}}\)
(iv) \(-\frac{1}{\sqrt{2}}\)

**Các lựa chọn:**
- A. (i)
- B. (ii)
- C. (iii) [ĐÚNG]
- D. (iv)
- E. None of the other choices is correct

**Giải thích:**
Ma trận chính tắc của phép quay trong \(\mathbb{R}^2\) một góc \(\theta\) ngược chiều kim đồng hồ là:

\[[T] = \begin{bmatrix} \cos\theta & -\sin\theta \\ \sin\theta & \cos\theta \end{bmatrix}\]

Phần tử ở vị trí (2, 2) là \(\cos\theta\).

Với \(\theta = \frac{\pi}{4}\):

\[\cos\left(\frac{\pi}{4}\right) = \frac{\sqrt{2}}{2} = \frac{1}{\sqrt{2}}\]

Khẳng định đúng là (iii), tương ứng với lựa chọn C.

Do đó, đáp án đúng là C.

---

### Câu 19 (Web ID: 50477 | Quiz ID: 614)
**Câu hỏi:** Given \(\vec{u} = (3, 0, 3)\) and \(\vec{v} = (-5, 1, 8)\); the orthogonal projection of \(\vec{v}\) along \(\vec{u}\) is:

**Các lựa chọn:**
- A. \((1, -1/5, -8/5)\)
- B. \((3/2, 0, 3/2)\) [ĐÚNG]
- C. \((-1, 1/5, 8/5)\)
- D. None of the other choices is correct
- E. \((5, -1, -8)\)
- F. \((-3/2, 0, -3/2)\)

**Giải thích:**
Công thức hình chiếu trực giao của vectơ \(\vec{v}\) lên vectơ \(\vec{u}\) là:

\[ \operatorname{proj}_{\vec{u}}(\vec{v}) = \frac{\vec{u} \cdot \vec{v}}{\|\vec{u}\|^2} \vec{u} \]

Tính tích vô hướng:

\[ \vec{u} \cdot \vec{v} = 3(-5) + 0(1) + 3(8) = -15 + 24 = 9 \]

Tính bình phương độ dài của \(\vec{u}\):

\[ \|\vec{u}\|^2 = 3^2 + 0^2 + 3^2 = 9 + 0 + 9 = 18 \]

Hệ số tỉ lệ:

\[ c = \frac{9}{18} = \frac{1}{2} \]

Vậy hình chiếu trực giao là:

\[ \operatorname{proj}_{\vec{u}}(\vec{v}) = \frac{1}{2}(3, 0, 3) = \left(\frac{3}{2}, 0, \frac{3}{2}\right) \]

Đáp án đúng là B.

---

### Câu 20 (Web ID: 50207 | Quiz ID: 606)
**Câu hỏi:** Let \(A\) be a \(4 \times 4\) matrix and \(\det A = 2\). Find \(\det(2A)\).

**Các lựa chọn:**
- A. 16
- B. 32 [ĐÚNG]
- C. 4
- D. 8
- E. None of the other choices is correct
- F. 2

**Giải thích:**
Theo tính chất của định thức, với ma trận vuông \(A\) cấp \(n\) và số thực \(c\):
\[ \det(c A) = c^n \det(A) \]

Ở đây ma trận \(A\) có cấp \(n = 4\), hằng số \(c = 2\), và \(\det(A) = 2\).

Thay vào công thức:
\[ \det(2A) = 2^4 \det(A) = 16 \times 2 = 32 \]

Vậy đáp án đúng là B (32).

---

### Câu 21 (Web ID: 50570 | Quiz ID: 616)
**Câu hỏi:** Find the range of the function
\[ f(x) = x^2 + 1. \]
(i) \([1, \infty)\)
(ii) \((1, \infty)\)
(iii) \([0, \infty)\)
(iv) \((-\infty, \infty)\)
(v) \((0, \infty)\)

**Các lựa chọn:**
- A. (iv)
- B. (v)
- C. (iii)
- D. (i) [ĐÚNG]
- E. (ii)
- F. None of the other choices is correct

**Giải thích:**
Tập xác định của hàm số \(f(x) = x^2 + 1\) là \(\mathbb{R}\).

Với mọi \(x \in \mathbb{R}\), ta luôn có \(x^2 \ge 0\).

Cộng 1 vào cả hai vế:
\[ x^2 + 1 \ge 1 \implies f(x) \ge 1 \]

Giá trị nhỏ nhất đạt được khi \(x = 0\), và khi \(x \to \pm\infty\) thì \(f(x) \to +\infty\).

Do đó tập giá trị (range) của hàm số là \([1, \infty)\), tương ứng với khẳng định (i). Lựa chọn D tương ứng với (i).

Vậy đáp án đúng là D.

---

### Câu 22 (Web ID: 50929 | Quiz ID: 625)
**Câu hỏi:** Evaluate \(\int_1^4 \frac{t^7 - t^3}{t^5} dt\)

**Các lựa chọn:**
- A. None of the other choices is correct
- B. 81/4 [ĐÚNG]
- C. 275/12
- D. 259/12
- E. 79/4

**Giải thích:**
Tách phân thức dưới dấu tích phân:
\[ \frac{t^7 - t^3}{t^5} = \frac{t^7}{t^5} - \frac{t^3}{t^5} = t^2 - t^{-2} \]

Tìm nguyên hàm:
\[ \int (t^2 - t^{-2}) dt = \frac{t^3}{3} - \frac{t^{-1}}{-1} = \frac{t^3}{3} + \frac{1}{t} \]

Áp dụng cận từ 1 đến 4:
\[ \left[ \frac{t^3}{3} + \frac{1}{t} \right]_1^4 = \left(\frac{4^3}{3} + \frac{1}{4}\right) - \left(\frac{1^3}{3} + \frac{1}{1}\right) \]
\[ = \left(\frac{64}{3} + \frac{1}{4}\right) - \left(\frac{1}{3} + 1\right) = \frac{256 + 3}{12} - \frac{4}{3} = \frac{259}{12} - \frac{16}{12} = \frac{243}{12} = \frac{81}{4} \]

Vậy đáp án đúng là B (81/4).

---

### Câu 23 (Web ID: 50748 | Quiz ID: 621)
**Câu hỏi:** Let \(f(x) = \int_0^{x^2 + 1} \cos(t)\,t\,dt\). Find \(f'(x)\).
(i) \((x^2 + 1)(t^2 + 1)\cos(t^2 + 1)\)
(ii) \((x^2 + 1)\cos(x^2 + 1)\)
(iii) \((t^2 + 1)\cos(t^2 + 1)\)
(iv) \(2x(x^2 + 1)\cos(x^2 + 1)\)

**Các lựa chọn:**
- A. (iv) [ĐÚNG]
- B. (iii)
- C. (ii)
- D. (i)
- E. None of the other choices is correct

**Giải thích:**
Áp dụng quy tắc đạo hàm theo cận tích phân (định lý cơ bản của giải tích kết hợp quy tắc dây chuyền Leibniz):

\[ \frac{d}{dx} \left( \int_a^{u(x)} g(t)\,dt \right) = g(u(x)) \cdot u'(x) \]

Ở đây:

- Hàm dưới dấu tích phân: \(g(t) = t\cos(t)\)

- Cận trên: \(u(x) = x^2 + 1 \implies u'(x) = 2x\)

Thay vào công thức:

\[ f'(x) = (x^2 + 1)\cos(x^2 + 1) \cdot (2x) = 2x(x^2 + 1)\cos(x^2 + 1) \]

Biểu thức này tương ứng với (iv) (Đáp án A).

---

### Câu 24 (Web ID: 50334 | Quiz ID: 609)
**Câu hỏi:** Let \(\mathbf{u} = (0, 1, 1), \mathbf{v} = (1, 1, -1)\) be vectors. Which of the following vectors belong to \(\operatorname{span}\{\mathbf{u}, \mathbf{v}\}\):
\[ \mathbf{x} = (1, 3, -1), \quad \mathbf{y} = (0, 2, 3) \]

**Các lựa chọn:**
- A. Both x and y
- B. Only x
- C. All of the other choices are incorrect [ĐÚNG]
- D. Only y

**Giải thích:**
Vector thuộc \(\operatorname{span}\{\mathbf{u}, \mathbf{v}\}\) khi và chỉ khi nó là tổ hợp tuyến tính \(c_1 \mathbf{u} + c_2 \mathbf{v}\):

\[ c_1 (0, 1, 1) + c_2 (1, 1, -1) = (c_2, c_1 + c_2, c_1 - c_2) \]

1) Kiểm tra vector \(\mathbf{x} = (1, 3, -1)\):

- Từ tọa độ 1: \(c_2 = 1\).

- Từ tọa độ 2: \(c_1 + c_2 = 3 \implies c_1 + 1 = 3 \implies c_1 = 2\).

- Thử vào tọa độ 3: \(c_1 - c_2 = 2 - 1 = 1 \ne -1\).

Hệ vô nghiệm, do đó \(\mathbf{x} \notin \operatorname{span}\{\mathbf{u}, \mathbf{v}\}\).

2) Kiểm tra vector \(\mathbf{y} = (0, 2, 3)\):

- Từ tọa độ 1: \(c_2 = 0\).

- Từ tọa độ 2: \(c_1 + 0 = 2 \implies c_1 = 2\).

- Thử vào tọa độ 3: \(c_1 - c_2 = 2 - 0 = 2 \ne 3\).

Hệ vô nghiệm, do đó \(\mathbf{y} \notin \operatorname{span}\{\mathbf{u}, \mathbf{v}\}\).

Như vậy cả \(\mathbf{x}\) và \(\mathbf{y}\) đều KHÔNG thuộc \(\operatorname{span}\{\mathbf{u}, \mathbf{v}\}\).

Ngân hàng đề chọn nhầm B ('Only x') do tác giả tính nhầm phép trừ \(c_2 - c_1 = 1 - 2 = -1\) thay vì \(c_1 - c_2\). Kết quả toán học chính xác là đáp án C ('All of the other choices are incorrect').

---

### Câu 25 (Web ID: 50759 | Quiz ID: 621)
**Câu hỏi:** Differentiate \(y = \sqrt{13x - x^5}\).
(i) \(dy/dx = \frac{1 - 5x^4}{2\sqrt{13x - x^5}}\)
(ii) \(dy/dx = \frac{13 - 5x^4}{2\sqrt{13x - x^5}}\)
(iii) \(dy/dx = \frac{13 - x^4}{2\sqrt{13x - x^5}}\)
(iv) \(dy/dx = \frac{13}{2\sqrt{13x - x^5}}\)

**Các lựa chọn:**
- A. None of the other choices is correct
- B. (i)
- C. (iv)
- D. (ii) [ĐÚNG]
- E. (iii)

**Giải thích:**
Áp dụng quy tắc đạo hàm của căn thức bậc hai \(\frac{d}{dx}(\sqrt{u}) = \frac{u'}{2\sqrt{u}}\):

Với \(u = 13x - x^5 \implies u' = 13 - 5x^4\).

Do đó:

\[ \frac{dy}{dx} = \frac{13 - 5x^4}{2\sqrt{13x - x^5}} \]

Kết quả trùng khớp với (ii), tương ứng với lựa chọn D.

---

### Câu 26 (Web ID: 50728 | Quiz ID: 621)
**Câu hỏi:** Find the linear approximation of the function \(f(x) = (1+x)^2 \sqrt{1+2x}\) at \(x = 0\).

**Các lựa chọn:**
- A. \(1 + x\)
- B. \(1 + 3x\) [ĐÚNG]
- C. \(1 + 2x\)
- D. \(3x\)
- E. None of the other choices is correct

**Giải thích:**
Công thức xấp xỉ tuyến tính tại \(a = 0\):
\[ L(x) = f(0) + f'(0) x \]

Tính \(f(0)\):
\[ f(0) = (1+0)^2 \sqrt{1+0} = 1 \]

Tính đạo hàm qua logarit:
\[ \ln f(x) = 2\ln(1+x) + \frac{1}{2}\ln(1+2x) \]
\[ \frac{f'(x)}{f(x)} = \frac{2}{1+x} + \frac{1}{2} \cdot \frac{2}{1+2x} = \frac{2}{1+x} + \frac{1}{1+2x} \]
Tại \(x = 0\):
\[ \frac{f'(0)}{f(0)} = 2 + 1 = 3 \implies f'(0) = 3 \cdot 1 = 3 \]

Xấp xỉ tuyến tính:
\[ L(x) = 1 + 3x \]

Vậy đáp án đúng là B (\(1 + 3x\)).

---

### Câu 27 (Web ID: 50430 | Quiz ID: 613)
**Câu hỏi:** Let \(\vec{u} = [2, 1, 3]^T\), \(\vec{v} = [-4, 0, 3]^T\). Let \(\vec{x} = [a, b, c]^T\) be such that \[4\vec{u} - \|\vec{v}\| \vec{v} = 2\vec{x} + \vec{v}.\] Find \(b\).

**Các lựa chọn:**
- A. -3
- B. 2 [ĐÚNG]
- C. None of the other choices is correct
- D. 16
- E. 0

**Giải thích:**
**Bước 1:** Tính độ dài vector \(\vec{v}\): \[\|\vec{v}\| = \sqrt{(-4)^2 + 0^2 + 3^2} = \sqrt{16 + 9} = 5.\]

**Bước 2:** Xét thành phần thứ hai (thành phần tương ứng với \(b\)) của phương trình vector: \[4 u_2 - \|\vec{v}\| v_2 = 2 x_2 + v_2.\]

**Bước 3:** Thay các giá trị \(u_2 = 1\), \(v_2 = 0\), \(x_2 = b\): \[4(1) - 5(0) = 2b + 0 \implies 4 = 2b \implies b = 2.\]

**Kết luận:** Giá trị của \(b\) là 2. Đáp án đúng là B.

---

### Câu 28 (Web ID: 50547 | Quiz ID: 616)
**Câu hỏi:** A table of values for \(f, g, f', g'\) is given \[\begin{array}{|c|c|c|c|c|} \hline x & f(x) & g(x) & f'(x) & g'(x) \\ \hline 0 & 1 & 1 & 2 & -2 \\ \hline 1 & 0 & 2 & 3 & -1 \\ \hline 2 & 4 & 0 & 5 & 6 \\ \hline \end{array}\] Find \(h'(2)\) if \(h(x) = f(g(x))\).

**Các lựa chọn:**
- A. 0
- B. -6
- C. -2
- D. -5
- E. 12 [ĐÚNG]
- F. None of the other choices is correct

**Giải thích:**
**Bước 1:** Áp dụng quy tắc đạo hàm hàm hợp (Chain Rule): với \(h(x) = f(g(x))\), ta có:
\[h'(x) = f'(g(x)) \cdot g'(x).\]

**Bước 2:** Thay \(x = 2\) vào biểu thức:
\[h'(2) = f'(g(2)) \cdot g'(2).\]

**Bước 3:** Tra bảng giá trị tại dòng \(x = 2\):
- \(g(2) = 0\)
- \(g'(2) = 6\)
Do đó \(h'(2) = f'(0) \cdot 6\).

**Bước 4:** Tra bảng giá trị tại dòng \(x = 0\):
- \(f'(0) = 2\).
Thay vào ta được:
\[h'(2) = 2 \cdot 6 = 12.\]

**Kết luận:** Giá trị đạo hàm \(h'(2) = 12\), tương ứng với lựa chọn E.

---

### Câu 29 (Web ID: 50147 | Quiz ID: 604)
**Câu hỏi:** How many solutions must a homogeneous linear system of 6 equations in 7 unknowns have?

**Các lựa chọn:**
- A. infinitely many solutions [ĐÚNG]
- B. no solutions
- C. exactly 7 solutions
- D. None of the other choices is correct
- E. exactly one solution

**Giải thích:**
Một hệ phương trình tuyến tính thuần nhất \(Ax = 0\) luôn có ít nhất nghiệm tầm thường \(x = 0\), do đó hệ luôn tương thích (không bao giờ vô nghiệm).

Ở đây hệ gồm \(m = 6\) phương trình và \(n = 7\) ẩn số.

Hạng của ma trận hệ số \(A\) thỏa mãn \(\operatorname{rank}(A) \le \min(6, 7) = 6 < 7\).

Theo định lý về số chiều không gian nghiệm, số biến tự do của hệ là:

\[\text{Số biến tự do} = n - \operatorname{rank}(A) \ge 7 - 6 = 1\]

Vì hệ thuần nhất có ít nhất một biến tự do, hệ bắt buộc phải có vô số nghiệm (infinitely many solutions).

Do đó, đáp án đúng là A.

---

### Câu 30 (Web ID: 50351 | Quiz ID: 610)
**Câu hỏi:** Let \(\{v_1, v_2, v_3\}\) be an orthogonal set of non-zero vectors in \(\mathbb{R}^3\). Which of the following statements are true?

(i) \(\{v_1, v_2, v_3\}\) is a basis of \(\mathbb{R}^3\).
(ii) \(\{v_1, 2v_2, 3v_3\}\) is also an orthogonal set in \(\mathbb{R}^3\).

**Các lựa chọn:**
- A. None of them.
- B. (ii) only.
- C. (i) only.
- D. Both (i) and (ii). [ĐÚNG]

**Giải thích:**
Kiểm tra từng khẳng định:

- Với (i): Định lý về tập trực giao chỉ ra rằng một tập các vectơ khác không trực giao từng đôi một luôn độc lập tuyến tính. Do đó tập gồm 3 vectơ trực giao khác không trong không gian 3 chiều \(\mathbb{R}^3\) luôn là một cơ sở của \(\mathbb{R}^3\). (i) đúng.

- Với (ii): Xét tích vô hướng của các cặp vectơ mới:

\[v_1 \cdot (2v_2) = 2(v_1 \cdot v_2) = 0\]

\[v_1 \cdot (3v_3) = 3(v_1 \cdot v_3) = 0\]

\[(2v_2) \cdot (3v_3) = 6(v_2 \cdot v_3) = 0\]

Các vectơ vẫn đôi một trực giao, do đó tập này vẫn là tập trực giao. (ii) đúng.

Vậy cả hai khẳng định đều đúng.

Do đó, đáp án đúng là D (Both (i) and (ii)).

---

## III. DANH SÁCH CẦN NGƯỜI RÀ SOÁT (REVIEW CANDIDATES)

### 1. Câu lệch với answers.txt (MAD101):
- ID 459: Dữ liệu = B vs answers.txt = F | Đề: *The stored-program concept means a computer could get its in...*

### 2. Xung đột đáp án giữa các bản trùng:
- MAD101 IDs [141, 304]: Các đáp án khác nhau = ['D', 'B'] | Đề: *Are these two graphs isomorphic? If not, what is the reason?*
- MAD101 IDs [376, 431]: Các đáp án khác nhau = ['A', 'E'] | Đề: *Tìm tích của hai số nhị phân \(a = (1110)_2\) và \(b = (1011)_2\).*
- MAE101 IDs [44, 530]: Các đáp án khác nhau = ['A', 'E'] | Đề: *Find values of \(m\) so that the system \[\begin{cases} x + 2y - 3z = 4 \\ 3x - *
- MAE101 IDs [76, 174]: Các đáp án khác nhau = ['D', 'C'] | Đề: *Find the dimension of the space \[U = \operatorname{span} \left\{ \begin{bmatrix*
- MAE101 IDs [79, 181]: Các đáp án khác nhau = ['D', 'C'] | Đề: *Use the linear approximation for the function \(f(x) = x^{2/3}\) at \(x = 8\) to*
- MAE101 IDs [132, 564, 734]: Các đáp án khác nhau = ['B', 'A', 'E'] | Đề: *Let \(T : \mathbb{R}^2 \to \mathbb{R}^2\) be rotation through \(\pi/2\) followed*
- MAE101 IDs [148, 766]: Các đáp án khác nhau = ['D', 'B'] | Đề: *Find all points of discontinuity of the function \[f(x) = \begin{cases} 2x + 1 &*
- MAE101 IDs [186, 756]: Các đáp án khác nhau = ['A', 'E'] | Đề: *Find \(g''(1)\) with
\[ g(x) = \int_0^{x^2} (1 + t^2)\,dt \]*
- MAE101 IDs [234, 484]: Các đáp án khác nhau = ['B', 'E'] | Đề: *If A is \(3 \times 3\) and \(\det(2A^{-1}) = -4\), then \(\det A\) is...*
- MAE101 IDs [280, 759]: Các đáp án khác nhau = ['D', 'B'] | Đề: *Solve the following system of linear equations:
\[ \begin{cases} 3x - y + 7z = 0*
- MAE101 IDs [286, 769]: Các đáp án khác nhau = ['F', 'A'] | Đề: *Find the critical numbers of \(f(x) = |x^2 - 1|\).*
- MAE101 IDs [325, 903]: Các đáp án khác nhau = ['A', 'C'] | Đề: *Write the matrix equation as a system of linear equations
\[
\begin{bmatrix} 2 &*
- MAE101 IDs [341, 1068]: Các đáp án khác nhau = ['B', 'C'] | Đề: *Evaluate the limit, if it exists
\[ \lim_{x \to 1} \frac{x^2 - 3x + 2}{x - 1} \]*
- MAE101 IDs [387, 408]: Các đáp án khác nhau = ['D', 'C'] | Đề: *Evaluate the limit, if it exists
\[ \lim_{x \to 1^-} \frac{|x^2 - 4x + 3|}{x - 1*
- MAE101 IDs [465, 1121]: Các đáp án khác nhau = ['A', 'E'] | Đề: *Find the linearization \(L(x)\) of \(f(x) = \sqrt[3]{x^2}\) at \(x = 8\).*
- MAE101 IDs [601, 659]: Các đáp án khác nhau = ['B', 'A'] | Đề: *Find the eigenvalues of the matrix \(\begin{bmatrix} 2 & 3 \\ 3 & 2 \end{bmatrix*
- MAE101 IDs [722, 742]: Các đáp án khác nhau = ['D', 'E'] | Đề: *Find \(dy/dx\) by implicit differentiation:
\[y^2 - xy + x^2 = 7\]*
- MAE101 IDs [723, 741]: Các đáp án khác nhau = ['A', 'E'] | Đề: *Find the absolute maximum and absolute minimum values of
\[f(x) = x^3 - 4x^2 - 1*
- MAE101 IDs [789, 1043]: Các đáp án khác nhau = ['E', 'C'] | Đề: *Simplify the expression \(\frac{f(x+h)-f(x)}{h}\) for \(f(x) = x^2 + 5x\).*
- MAE101 IDs [832, 1042]: Các đáp án khác nhau = ['D', 'B'] | Đề: *Find \(dy/dx\) by implicit differentiation
\[2y - x + xy = 6.\]*
- MAE101 IDs [892, 1030]: Các đáp án khác nhau = ['D', 'A'] | Đề: *Find the average value of the function \(f(x) = x - 2x^2\) on the interval \([-1*
- MAE101 IDs [941, 1011]: Các đáp án khác nhau = ['A', 'E'] | Đề: *Given the function \(f(x) = -\frac{1}{(x-1)^2}\).
Which of the following stateme*
