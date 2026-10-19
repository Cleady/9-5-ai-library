window.TEST_20_QUESTIONS = [
  {
    "id": 1,
    "chapter": "DSTT1 - Đại số tuyến tính 1",
    "folder": "DSTT1",
    "topic": "MaTran",
    "type": "single_choice",
    "question": "Find the square matrix \\(A\\) that satisfies \\[2A^T = A + \\begin{bmatrix} 1 & 0 \\\\ 0 & -1 \\end{bmatrix}.\\] \\[(i) \\begin{bmatrix} 1 & 1 \\\\ 0 & -1 \\end{bmatrix} \\quad (ii) \\begin{bmatrix} 1 & 0 \\\\ -1 & 1 \\end{bmatrix} \\quad (iii) \\begin{bmatrix} 1 & 0 \\\\ 0 & -1 \\end{bmatrix}\\]",
    "options": [
      "All choices are correct",
      "(ii)",
      "(iii)",
      "(i)"
    ],
    "answer": "C",
    "answer_original": "C",
    "answer_status": "verified",
    "explanation": [
      "**Bước 1:** Đặt ma trận cần tìm \\(A = \\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix}\\). Khi đó ma trận chuyển vị là \\(A^T = \\begin{bmatrix} a & c \\\\ b & d \\end{bmatrix}\\).",
      "**Bước 2:** Tính vế trái: \\[2A^T = \\begin{bmatrix} 2a & 2c \\\\ 2b & 2d \\end{bmatrix}\\] và vế phải: \\[A + \\begin{bmatrix} 1 & 0 \\\\ 0 & -1 \\end{bmatrix} = \\begin{bmatrix} a+1 & b \\\\ c & d-1 \\end{bmatrix}.\\]",
      "**Bước 3:** Cân bằng từng phần tử tương ứng ta có hệ phương trình: \\[\\begin{cases} 2a = a + 1 \\implies a = 1 \\\\ 2c = b \\\\ 2b = c \\implies 2(2c) = c \\implies 3c = 0 \\implies c = 0, \\; b = 0 \\\\ 2d = d - 1 \\implies d = -1 \\end{cases}\\]",
      "**Bước 4:** Suy ra ma trận \\(A = \\begin{bmatrix} 1 & 0 \\\\ 0 & -1 \\end{bmatrix}\\), chính là ma trận ở khẳng định (iii).",
      "**Kết luận:** Đáp án đúng là C ((iii))."
    ],
    "image": "0001_q001_Question_1.png",
    "needs_image": false,
    "review_flags": [],
    "confidence": "high"
  },
  {
    "id": 4,
    "chapter": "DSTT1 - Đại số tuyến tính 1",
    "folder": "DSTT1",
    "topic": "MaTran",
    "type": "single_choice",
    "question": "Which of the matrices below is the reduced row-echelon form of the matrix \\[\\begin{bmatrix} 0 & 0 & 0 \\\\ 2 & 4 & 0 \\end{bmatrix}\\] \\[(i) \\begin{bmatrix} 1 & 2 & 0 \\\\ 0 & 0 & 1 \\end{bmatrix} \\quad (ii) \\begin{bmatrix} 1 & 2 & 0 \\\\ 0 & 0 & 0 \\end{bmatrix} \\quad (iii) \\begin{bmatrix} 1 & 2 & 0 \\\\ 0 & 1 & 0 \\end{bmatrix} \\quad (iv) \\begin{bmatrix} 1 & 0 & 0 \\\\ 0 & 0 & 0 \\end{bmatrix}\\]",
    "options": [
      "(iii)",
      "(iv)",
      "(ii)",
      "None of the other choices is correct",
      "(i)"
    ],
    "answer": "C",
    "answer_original": "C",
    "answer_status": "verified",
    "explanation": [
      "**Bước 1:** Xét ma trận ban đầu \\[\\begin{bmatrix} 0 & 0 & 0 \\\\ 2 & 4 & 0 \\end{bmatrix}.\\] Hàng 1 gồm toàn số 0 nên ta thực hiện phép đổi chỗ hai hàng: \\(R_1 \\leftrightarrow R_2\\).",
      "**Bước 2:** Sau khi đổi chỗ, ta được ma trận \\[\\begin{bmatrix} 2 & 4 & 0 \\\\ 0 & 0 & 0 \\end{bmatrix}.\\]",
      "**Bước 3:** Chia hàng 1 cho 2 (tức \\(R_1 \\leftarrow \\frac{1}{2} R_1\\)) để đưa phần tử dẫn đầu (leading entry) về 1: \\[\\begin{bmatrix} 1 & 2 & 0 \\\\ 0 & 0 & 0 \\end{bmatrix}.\\]",
      "**Bước 4:** Ma trận này thỏa mãn đầy đủ các điều kiện của dạng bậc thang rút gọn (RREF): hàng số 0 nằm dưới cùng, phần tử dẫn đầu của hàng khác 0 bằng 1 và là phần tử khác 0 duy nhất trên cột của nó. Đây chính là ma trận (ii).",
      "**Kết luận:** Đáp án đúng là C ((ii))."
    ],
    "image": "0004_q004_Question_4.png",
    "needs_image": false,
    "review_flags": [],
    "confidence": "high"
  },
  {
    "id": 9,
    "chapter": "DSTT1 - Đại số tuyến tính 1",
    "folder": "DSTT1",
    "topic": "HePhuongTrinh",
    "type": "single_choice",
    "question": "Find the solution of the system of linear equations: \\[\\begin{cases} x + y + 2z = 9 \\\\ x - y - 2z = -7 \\\\ 2x + y + 3z = 13 \\end{cases}\\]",
    "options": [
      "(1, 2, 3)",
      "(-1, 2, -3)",
      "None of the other choices is correct",
      "(1, -2, -3)",
      "(-1, -2, -3)"
    ],
    "answer": "A",
    "answer_original": "A",
    "answer_status": "verified",
    "explanation": [
      "**Bước 1:** Cộng phương trình (1) và phương trình (2): \\[(x + y + 2z) + (x - y - 2z) = 9 + (-7) \\implies 2x = 2 \\implies x = 1.\\]",
      "**Bước 2:** Thay \\(x = 1\\) vào phương trình (1): \\[1 + y + 2z = 9 \\implies y + 2z = 8.\\]",
      "**Bước 3:** Thay \\(x = 1\\) vào phương trình (3): \\[2(1) + y + 3z = 13 \\implies y + 3z = 11.\\]",
      "**Bước 4:** Lấy phương trình ở Bước 3 trừ đi phương trình ở Bước 2: \\[(y + 3z) - (y + 2z) = 11 - 8 \\implies z = 3.\\] Từ đó \\(y = 8 - 2(3) = 2\\).",
      "**Kết luận:** Nghiệm duy nhất của hệ là \\((x, y, z) = (1, 2, 3)\\), tương ứng với lựa chọn A."
    ],
    "image": "0009_q009_Question_9.png",
    "needs_image": false,
    "review_flags": [],
    "confidence": "high"
  },
  {
    "id": 10,
    "chapter": "DSTT1 - Đại số tuyến tính 1",
    "folder": "DSTT1",
    "topic": "TriRieng",
    "type": "single_choice",
    "question": "Given that \\(\\lambda = 1\\) is an eigenvalue of the matrix \\[\\begin{bmatrix} 1 & 1 & 1 \\\\ 0 & 1 & 1 \\\\ 0 & 0 & 0 \\end{bmatrix}.\\] Find a set of basic eigenvectors corresponding to this eigenvalue \\(\\lambda = 1\\). \\[(i) \\; \\{[0, 0, 1]^T\\} \\quad (ii) \\; \\{[1, 0, 0]^T, [0, 0, 1]^T\\} \\quad (iii) \\; \\{[1, 0, 0]^T\\}\\]",
    "options": [
      "(i)",
      "(ii)",
      "(iii)",
      "None of the others",
      "(iv)"
    ],
    "answer": "C",
    "answer_original": "C",
    "answer_status": "verified",
    "explanation": [
      "**Bước 1:** Vector riêng ứng với giá trị riêng \\(\\lambda = 1\\) là nghiệm không tầm thường của hệ thuần nhất \\((A - 1\\cdot I)\\mathbf{x} = \\mathbf{0}\\).",
      "**Bước 2:** Lập ma trận \\(A - I\\): \\[A - I = \\begin{bmatrix} 0 & 1 & 1 \\\\ 0 & 0 & 1 \\\\ 0 & 0 & -1 \\end{bmatrix}.\\]",
      "**Bước 3:** Giải hệ phương trình: từ hàng 2 ta có \\(z = 0\\). Thay \\(z = 0\\) vào hàng 1 suy ra \\(y + z = 0 \\implies y = 0\\). Cột 1 không có phần tử cơ sở nên biến \\(x\\) là biến tự do (đặt \\(x = t \\in \\mathbb{R}\\)).",
      "**Bước 4:** Nghiệm tổng quát có dạng \\(\\mathbf{x} = \\begin{bmatrix} x \\\\ y \\\\ z \\end{bmatrix} = \\begin{bmatrix} t \\\\ 0 \\\\ 0 \\end{bmatrix} = t \\begin{bmatrix} 1 \\\\ 0 \\\\ 0 \\end{bmatrix}\\) với \\(t \\neq 0\\). Do đó cơ sở không gian riêng gồm một vector cơ bản duy nhất \\([1, 0, 0]^T\\), tương ứng với (iii).",
      "**Kết luận:** Đáp án đúng là C ((iii))."
    ],
    "image": "0010_q010_Question_10.png",
    "needs_image": false,
    "review_flags": [],
    "confidence": "high"
  },
  {
    "id": 11,
    "chapter": "GT1 - Giải tích 1",
    "folder": "GT1",
    "topic": "GioiHan",
    "type": "single_choice",
    "question": "Find the limit \\[\\lim_{x \\to 0} \\dfrac{\\sin^2 3x}{2x}.\\]",
    "options": [
      "Does not exist",
      "0",
      "1/2",
      "1",
      "None of the other choices is correct"
    ],
    "answer": "B",
    "answer_original": "B",
    "answer_status": "verified",
    "explanation": [
      "**Bước 1:** Phân tích biểu thức giới hạn: \\[\\dfrac{\\sin^2 3x}{2x} = \\dfrac{\\sin 3x}{2x} \\cdot \\sin 3x = \\dfrac{3}{2} \\cdot \\dfrac{\\sin 3x}{3x} \\cdot \\sin 3x.\\]",
      "**Bước 2:** Sử dụng giới hạn lượng giác cơ bản: \\[\\lim_{x \\to 0} \\dfrac{\\sin 3x}{3x} = 1.\\]",
      "**Bước 3:** Khi \\(x \\to 0\\), ta có \\(\\lim_{x \\to 0} \\sin 3x = \\sin 0 = 0\\). Do đó: \\[\\lim_{x \\to 0} \\dfrac{\\sin^2 3x}{2x} = \\dfrac{3}{2} \\cdot 1 \\cdot 0 = 0.\\]",
      "**Kết luận:** Giới hạn bằng 0, tương ứng với lựa chọn B."
    ],
    "image": "0011_q011_Question_11.png",
    "needs_image": false,
    "review_flags": [],
    "confidence": "high"
  },
  {
    "id": 12,
    "chapter": "GT1 - Giải tích 1",
    "folder": "GT1",
    "topic": "CucTri",
    "type": "single_choice",
    "question": "Find the relative extrema, if they exist, of the function \\[f(x) = x^3 - 12x + 4\\]",
    "options": [
      "Relative maximum at \\((-2, 20)\\); relative minimum at \\((2, -12)\\)",
      "Relative maximum at \\((2, -12)\\); relative minimum at \\((-2, 20)\\)",
      "Relative maximum at \\((5, 69)\\); relative minimum at \\((2, -12)\\)",
      "None of the other choices is correct",
      "Relative maximum at \\((5, 69)\\); relative minimum at \\((-3, 13)\\)"
    ],
    "answer": "A",
    "answer_original": "A",
    "answer_status": "verified",
    "explanation": [
      "**Bước 1:** Tính đạo hàm cấp một: \\[f'(x) = 3x^2 - 12 = 3(x^2 - 4) = 3(x - 2)(x + 2).\\] Điểm dừng thỏa mãn \\(f'(x) = 0 \\iff x = -2\\) hoặc \\(x = 2\\).",
      "**Bước 2:** Tính đạo hàm cấp hai: \\(f''(x) = 6x\\).",
      "**Bước 3:** Kiểm tra điểm \\(x = -2\\): \\(f''(-2) = -12 < 0\\) nên hàm số đạt cực đại tương đối tại \\(x = -2\\). Giá trị cực đại là \\(f(-2) = (-2)^3 - 12(-2) + 4 = -8 + 24 + 4 = 20\\), tức điểm \\((-2, 20)\\).",
      "**Bước 4:** Kiểm tra điểm \\(x = 2\\): \\(f''(2) = 12 > 0\\) nên hàm số đạt cực tiểu tương đối tại \\(x = 2\\). Giá trị cực tiểu là \\(f(2) = 2^3 - 12(2) + 4 = 8 - 24 + 4 = -12\\), tức điểm \\((2, -12)\\).",
      "**Kết luận:** Hàm số đạt cực đại tương đối tại \\((-2, 20)\\) và cực tiểu tương đối tại \\((2, -12)\\), ứng với lựa chọn A."
    ],
    "image": "0012_q012_Question_12.png",
    "needs_image": false,
    "review_flags": [],
    "confidence": "high"
  },
  {
    "id": 19,
    "chapter": "GT1 - Giải tích 1",
    "folder": "GT1",
    "topic": "DaoHam",
    "type": "single_choice",
    "question": "Find the equation for the tangent to the curve \\(f(x) = \\dfrac{\\sqrt{x}}{5}\\) at the point \\(M(4; 2/5)\\).",
    "options": [
      "\\(y = -2x + 1\\)",
      "\\(y = x + 1\\)",
      "\\(y = -x + (1/5)\\)",
      "None of the other choices is correct",
      "\\(y = (1/20)x + (1/5)\\)"
    ],
    "answer": "E",
    "answer_original": "E",
    "answer_status": "verified",
    "explanation": [
      "**Bước 1:** Viết lại hàm số dưới dạng lũy thừa: \\(f(x) = \\dfrac{1}{5} x^{1/2}\\). Đạo hàm là \\[f'(x) = \\dfrac{1}{5} \\cdot \\dfrac{1}{2\\sqrt{x}} = \\dfrac{1}{10\\sqrt{x}}.\\]",
      "**Bước 2:** Hệ số góc của tiếp tuyến tại điểm có hoành độ \\(x = 4\\) là: \\[k = f'(4) = \\dfrac{1}{10\\sqrt{4}} = \\dfrac{1}{20}.\\]",
      "**Bước 3:** Phương trình tiếp tuyến đi qua điểm \\(M(4, 2/5)\\) là: \\[y - \\dfrac{2}{5} = \\dfrac{1}{20}(x - 4) \\iff y = \\dfrac{1}{20}x - \\dfrac{4}{20} + \\dfrac{2}{5} = \\dfrac{1}{20}x + \\dfrac{1}{5}.\\]",
      "**Kết luận:** Phương trình tiếp tuyến là \\(y = (1/20)x + (1/5)\\), ứng với lựa chọn E."
    ],
    "image": "0019_q019_Question_19.png",
    "needs_image": false,
    "review_flags": [],
    "confidence": "high"
  },
  {
    "id": 22,
    "chapter": "GT1 - Giải tích 1",
    "folder": "GT1",
    "topic": "TichPhan",
    "type": "single_choice",
    "question": "Evaluate the integral \\[\\int x \\ln x \\, dx\\] \\[(i) \\; \\dfrac{x^2 \\ln x}{2} - \\dfrac{x^2}{4} + C \\quad (ii) \\; \\dfrac{x^2 \\ln x}{2} + \\dfrac{x^2}{4} + C \\quad (iii) \\; \\dfrac{x^2 \\ln x}{2} - \\dfrac{x^2}{2} + C \\quad (iv) \\; \\dfrac{x^2 \\ln x}{2} + \\dfrac{x^2}{2} + C\\]",
    "options": [
      "(i)",
      "(iv)",
      "None of the other choices is correct",
      "(ii)",
      "(iii)"
    ],
    "answer": "A",
    "answer_original": "A",
    "answer_status": "verified",
    "explanation": [
      "**Bước 1:** Áp dụng phương pháp tích phân từng phần: đặt \\(u = \\ln x\\) và \\(dv = x \\, dx\\).",
      "**Bước 2:** Suy ra vi phân \\(du = \\dfrac{1}{x} dx\\) và nguyên hàm \\(v = \\dfrac{x^2}{2}\\).",
      "**Bước 3:** Theo công thức tích phân từng phần \\(\\int u \\, dv = uv - \\int v \\, du\\): \\[\\int x \\ln x \\, dx = \\dfrac{x^2 \\ln x}{2} - \\int \\dfrac{x^2}{2} \\cdot \\dfrac{1}{x} dx = \\dfrac{x^2 \\ln x}{2} - \\dfrac{1}{2} \\int x \\, dx = \\dfrac{x^2 \\ln x}{2} - \\dfrac{x^2}{4} + C.\\]",
      "**Kết luận:** Kết quả tích phân trùng với biểu thức (i), do đó đáp án đúng là A ((i))."
    ],
    "image": "0022_q022_Question_22.png",
    "needs_image": false,
    "review_flags": [],
    "confidence": "high"
  },
  {
    "id": 24,
    "chapter": "GT1 - Giải tích 1",
    "folder": "GT1",
    "topic": "DaoHam",
    "type": "single_choice",
    "question": "Find \\(dy/dx\\) by implicit differentiation \\[9xy + 2y - 2 = 0\\] \\[(i) \\; (-9y(x + 1))/2 \\quad (ii) \\; (-9y)/(9xy + 2) \\quad (iii) \\; -9(x + y)/2 \\quad (iv) \\; (-9y)/(9x + 2)\\]",
    "options": [
      "(iv)",
      "(ii)",
      "(i)",
      "None of the other choices is correct",
      "(iii)"
    ],
    "answer": "A",
    "answer_original": "A",
    "answer_status": "verified",
    "explanation": [
      "**Bước 1:** Lấy đạo hàm hai vế theo biến \\(x\\), xem \\(y = y(x)\\): \\[\\dfrac{d}{dx}(9xy) + \\dfrac{d}{dx}(2y) - \\dfrac{d}{dx}(2) = 0.\\]",
      "**Bước 2:** Dùng quy tắc nhân cho số hạng đầu tiên: \\[9\\left(1 \\cdot y + x \\cdot \\dfrac{dy}{dx}\\right) + 2\\dfrac{dy}{dx} = 0.\\]",
      "**Bước 3:** Gom nhóm các số hạng chứa \\(\\dfrac{dy}{dx}\\): \\[(9x + 2)\\dfrac{dy}{dx} + 9y = 0 \\iff (9x + 2)\\dfrac{dy}{dx} = -9y.\\]",
      "**Bước 4:** Rút ra đạo hàm: \\[\\dfrac{dy}{dx} = \\dfrac{-9y}{9x + 2}.\\] Biểu thức này khớp với (iv).",
      "**Kết luận:** Đáp án đúng là A ((iv))."
    ],
    "image": "0024_q024_Question_24.png",
    "needs_image": false,
    "review_flags": [],
    "confidence": "high"
  },
  {
    "id": 27,
    "chapter": "GT1 - Giải tích 1",
    "folder": "GT1",
    "topic": "PhuongPhapSo",
    "type": "single_choice",
    "question": "Use Newton's method with the specified initial approximation \\(X_1\\) to find the third approximation \\(X_3\\) to the root of the given equation. \\[X^3 + X + 3 = 0, \\quad X_1 = -1.\\] (Given your answer to 4 decimal places)",
    "options": [
      "-1.2100",
      "-1.2741",
      "-1.2143",
      "None of the other choices is correct",
      "-1.3140"
    ],
    "answer": "C",
    "answer_original": "C",
    "answer_status": "verified",
    "explanation": [
      "**Bước 1:** Đặt \\(f(X) = X^3 + X + 3\\), khi đó đạo hàm là \\(f'(X) = 3X^2 + 1\\). Công thức lặp Newton: \\[X_{n+1} = X_n - \\dfrac{f(X_n)}{f'(X_n)}.\\]",
      "**Bước 2:** Tính bước lặp thứ nhất với \\(X_1 = -1\\): \\(f(-1) = (-1)^3 + (-1) + 3 = 1\\) và \\(f'(-1) = 3(-1)^2 + 1 = 4\\). Suy ra \\[X_2 = -1 - \\dfrac{1}{4} = -1.25.\\]",
      "**Bước 3:** Tính bước lặp thứ hai với \\(X_2 = -1.25\\): \\(f(-1.25) = (-1.25)^3 + (-1.25) + 3 = -0.203125\\) và \\(f'(-1.25) = 3(-1.25)^2 + 1 = 5.6875\\).",
      "**Bước 4:** Suy ra \\[X_3 = -1.25 - \\dfrac{-0.203125}{5.6875} = -1.25 + 0.0357143 \\approx -1.2142857 \\approx -1.2143.\\]",
      "**Kết luận:** Xấp xỉ thứ ba \\(X_3\\) làm tròn đến 4 chữ số thập phân là \\(-1.2143\\), tương ứng với lựa chọn C."
    ],
    "image": "0027_q027_Question_27.png",
    "needs_image": false,
    "review_flags": [],
    "confidence": "high"
  },
  {
    "id": 33,
    "chapter": "DSTT1 - Đại số tuyến tính 1",
    "folder": "DSTT1",
    "topic": "AnhXaTuyenTinh",
    "type": "single_choice",
    "question": "Let T be the linear transformation defined by \\[T(X) = \\begin{bmatrix} 1 & 0 \\\\ 6 & 1 \\end{bmatrix} X.\\] Describe geometrically the effect of T.",
    "options": [
      "Projection onto y-axis",
      "Horizontal shear",
      "Vertical shear",
      "None of the other choices is correct",
      "Projection onto x-axis"
    ],
    "answer": "C",
    "answer_original": "C",
    "answer_status": "verified",
    "explanation": [
      "**Bước 1:** Xét tác động của biến đổi lên vector tổng quát \\(X = \\begin{bmatrix} x \\\\ y \\end{bmatrix}\\): \\[T(X) = \\begin{bmatrix} 1 & 0 \\\\ 6 & 1 \\end{bmatrix} \\begin{bmatrix} x \\\\ y \\end{bmatrix} = \\begin{bmatrix} x \\\\ 6x + y \\end{bmatrix}.\\]",
      "**Bước 2:** Điểm \\((x, y)\\) chuyển thành \\((x, 6x + y)\\). Hoành độ \\(x\\) được giữ nguyên, trong khi tung độ \\(y\\) dịch chuyển một khoảng tỷ lệ thuận với \\(x\\) (độ dời \\(6x\\)).",
      "**Bước 3:** Phép biến đổi giữ nguyên một tọa độ và làm lệch tọa độ còn lại theo phương thẳng đứng được gọi là phép trượt dọc (Vertical shear) với hệ số \\(k = 6\\).",
      "**Kết luận:** Tác động hình học của \\(T\\) là Vertical shear, ứng với lựa chọn C."
    ],
    "image": "0033_q033_Question_33.png",
    "needs_image": false,
    "review_flags": [],
    "confidence": "high"
  },
  {
    "id": 37,
    "chapter": "DSTT1 - Đại số tuyến tính 1",
    "folder": "DSTT1",
    "topic": "DinhThuc",
    "type": "single_choice",
    "question": "Let \\(A = \\begin{bmatrix} 1 & * & * & * \\\\ 0 & 3 & * & * \\\\ 0 & 0 & 5 & * \\\\ 0 & 0 & 0 & 7 \\end{bmatrix}\\), where \\((*)\\) denotes any number. Find \\(\\det(2A^{-1})\\).",
    "options": [
      "Not enough information",
      "2/105",
      "210",
      "16/105",
      "All of the other choices are incorrect"
    ],
    "answer": "D",
    "answer_original": "D",
    "answer_status": "verified",
    "explanation": [
      "**Bước 1:** \\(A\\) là ma trận tam giác trên cấp \\(4 \\times 4\\). Định thức của ma trận tam giác bằng tích các phần tử trên đường chéo chính: \\[\\det(A) = 1 \\cdot 3 \\cdot 5 \\cdot 7 = 105.\\]",
      "**Bước 2:** Với ma trận khả nghịch \\(M\\) cấp \\(n \\times n\\), ta có hai tính chất: \\(\\det(c M) = c^n \\det(M)\\) và \\(\\det(M^{-1}) = \\dfrac{1}{\\det(M)}\\).",
      "**Bước 3:** Áp dụng cho ma trận \\(A^{-1}\\) cấp \\(4 \\times 4\\) nhân với số vô hướng \\(c = 2\\): \\[\\det(2A^{-1}) = 2^4 \\det(A^{-1}) = 16 \\cdot \\dfrac{1}{\\det(A)} = \\dfrac{16}{105}.\\]",
      "**Kết luận:** Giá trị định thức cần tìm là \\(\\dfrac{16}{105}\\), ứng với lựa chọn D."
    ],
    "image": "0037_q037_Question_37.png",
    "needs_image": false,
    "review_flags": [],
    "confidence": "high"
  },
  {
    "id": 46,
    "chapter": "GT1 - Giải tích 1",
    "folder": "GT1",
    "topic": "TichPhan",
    "type": "single_choice",
    "question": "Use the Simpson's Rule with \\(n = 4\\) steps to approximate the integral \\[\\int_1^5 x \\cos x \\, dx\\]",
    "options": [
      "-3.43",
      "-5.92",
      "None of the other choices is correct",
      "-6.26",
      "-6.89"
    ],
    "answer": "B",
    "answer_original": "B",
    "answer_status": "verified",
    "explanation": [
      "**Bước 1:** Khoảng tích phân \\([a, b] = [1, 5]\\) được chia thành \\(n = 4\\) đoạn con. Độ dài mỗi bước: \\[h = \\dfrac{b - a}{n} = \\dfrac{5 - 1}{4} = 1.\\] Các mốc điểm chia: \\(x_0 = 1, x_1 = 2, x_2 = 3, x_3 = 4, x_4 = 5\\).",
      "**Bước 2:** Tính giá trị hàm số \\(f(x) = x \\cos x\\) tại các mốc (đo bằng radian): \\(f(1) \\approx 0.54030\\), \\(f(2) \\approx -0.83229\\), \\(f(3) \\approx -2.96998\\), \\(f(4) \\approx -2.61457\\), \\(f(5) \\approx 1.41831\\).",
      "**Bước 3:** Áp dụng công thức Simpson: \\[S_4 = \\dfrac{h}{3} [f(x_0) + 4f(x_1) + 2f(x_2) + 4f(x_3) + f(x_4)].\\]",
      "**Bước 4:** Thay số: \\[S_4 = \\dfrac{1}{3} [0.54030 + 4(-0.83229) + 2(-2.96998) + 4(-2.61457) + 1.41831] = \\dfrac{1}{3} [-17.76881] \\approx -5.92.\\]",
      "**Kết luận:** Giá trị xấp xỉ bằng \\(-5.92\\), tương ứng với lựa chọn B."
    ],
    "image": "0046_q046_Question_46.png",
    "needs_image": false,
    "review_flags": [],
    "confidence": "high"
  },
  {
    "id": 53,
    "chapter": "DSTT1 - Đại số tuyến tính 1",
    "folder": "DSTT1",
    "topic": "VectorHinhHoc",
    "type": "single_choice",
    "question": "Let \\(A(1, 2, -4)\\), \\(B(0, 1, -2)\\), \\(C(3, 1, 0)\\). Find the distance from the point A to the line passing through the points B and C. \\[(i) \\; 7\\sqrt{\\dfrac{11}{13}} \\quad (ii) \\; 2\\sqrt{\\dfrac{77}{13}} \\quad (iii) \\; \\sqrt{\\dfrac{77}{13}} \\quad (iv) \\; 14\\sqrt{\\dfrac{11}{13}}\\]",
    "options": [
      "(iii)",
      "None of the other choices is correct",
      "(iv)",
      "(i)",
      "(ii)"
    ],
    "answer": "A",
    "answer_original": "A",
    "answer_status": "verified",
    "explanation": [
      "**Bước 1:** Tìm vector chỉ phương của đường thẳng \\(BC\\): \\[\\vec{BC} = C - B = (3 - 0, 1 - 1, 0 - (-2)) = (3, 0, 2).\\] Vector nối \\(B\\) với \\(A\\): \\[\\vec{BA} = A - B = (1 - 0, 2 - 1, -4 - (-2)) = (1, 1, -2).\\]",
      "**Bước 2:** Tính tích có hướng: \\[\\vec{BC} \\times \\vec{BA} = \\begin{vmatrix} \\mathbf{i} & \\mathbf{j} & \\mathbf{k} \\\\ 3 & 0 & 2 \\\\ 1 & 1 & -2 \\end{vmatrix} = (-2)\\mathbf{i} - (-6 - 2)\\mathbf{j} + (3)\\mathbf{k} = (-2, 8, 3).\\]",
      "**Bước 3:** Tính độ dài các vector: \\(\\|\\vec{BC} \\times \\vec{BA}\\| = \\sqrt{(-2)^2 + 8^2 + 3^2} = \\sqrt{4 + 64 + 9} = \\sqrt{77}\\), và \\(\\|\\vec{BC}\\| = \\sqrt{3^2 + 0^2 + 2^2} = \\sqrt{13}\\).",
      "**Bước 4:** Khoảng cách từ điểm \\(A\\) đến đường thẳng \\(BC\\) là: \\[d = \\dfrac{\\|\\vec{BC} \\times \\vec{BA}\\|}{\\|\\vec{BC}\\|} = \\dfrac{\\sqrt{77}}{\\sqrt{13}} = \\sqrt{\\dfrac{77}{13}}.\\] Biểu thức này khớp với (iii).",
      "**Kết luận:** Đáp án đúng là A ((iii))."
    ],
    "image": "0053_q053_Question_53.png",
    "needs_image": false,
    "review_flags": [],
    "confidence": "high"
  },
  {
    "id": 55,
    "chapter": "DSTT1 - Đại số tuyến tính 1",
    "folder": "DSTT1",
    "topic": "KhongGianVector",
    "type": "single_choice",
    "question": "Let \\[U = \\{(a, b, c, d) \\mid 3a - 5d = 0, \\; b + c + d = 0\\}\\] be a subspace of \\(\\mathbb{R}^4\\). Find the dimension of \\(U\\).",
    "options": [
      "1",
      "3",
      "2",
      "4"
    ],
    "answer": "C",
    "answer_original": "C",
    "answer_status": "verified",
    "explanation": [
      "**Bước 1:** Không gian con \\(U\\) là không gian nghiệm (nullspace) của hệ gồm 2 phương trình tuyến tính thuần nhất trên 4 ẩn trong \\(\\mathbb{R}^4\\): \\[\\begin{cases} 3a + 0b + 0c - 5d = 0 \\\\ 0a + b + c + d = 0 \\end{cases}\\]",
      "**Bước 2:** Ma trận hệ số của hệ là: \\[A = \\begin{bmatrix} 3 & 0 & 0 & -5 \\\\ 0 & 1 & 1 & 1 \\end{bmatrix}.\\] Do hai hàng độc lập tuyến tính nên hạng của ma trận \\(\\text{rank}(A) = 2\\).",
      "**Bước 3:** Áp dụng định lý hạng và số chiều (Rank-Nullity Theorem): số chiều của không gian nghiệm \\(U\\) bằng số ẩn trừ đi hạng: \\[\\dim(U) = n - \\text{rank}(A) = 4 - 2 = 2.\\]",
      "**Kết luận:** Số chiều của \\(U\\) bằng 2, ứng với lựa chọn C."
    ],
    "image": "0055_q055_Question_55.png",
    "needs_image": false,
    "review_flags": [],
    "confidence": "high"
  },
  {
    "id": 78,
    "chapter": "DSTT1 - Đại số tuyến tính 1",
    "folder": "DSTT1",
    "topic": "VectorHinhHoc",
    "type": "single_choice",
    "question": "Let \\(\\mathbf{u}, \\mathbf{v}\\) be two vectors in \\(\\mathbb{R}^3\\) such that \\(\\|\\mathbf{u}\\| = 4\\), \\(\\|\\mathbf{v}\\| = 5\\), \\(\\mathbf{u}\\) and \\(\\mathbf{v}\\) are perpendicular. Find the length of the vector \\(2\\mathbf{u} \\times 3\\mathbf{v}\\).",
    "options": [
      "40",
      "20",
      "120",
      "0",
      "80"
    ],
    "answer": "C",
    "answer_original": "C",
    "answer_status": "verified",
    "explanation": [
      "**Bước 1:** Áp dụng tính chất của tích có hướng: \\[2\\mathbf{u} \\times 3\\mathbf{v} = (2 \\cdot 3)(\\mathbf{u} \\times \\mathbf{v}) = 6(\\mathbf{u} \\times \\mathbf{v}).\\]",
      "**Bước 2:** Độ dài của vector tích có hướng được tính theo công thức: \\[\n\\|2\\mathbf{u} \\times 3\\mathbf{v}\\| = 6 \\|\\mathbf{u} \\times \\mathbf{v}\\| = 6 \\|\\mathbf{u}\\| \\|\\mathbf{v}\\| \\sin\\theta,\\] trong đó \\(\\theta\\) là góc giữa hai vector \\(\\mathbf{u}\\) và \\(\\mathbf{v}\\).",
      "**Bước 3:** Vì \\(\\mathbf{u}\\) và \\(\\mathbf{v}\\) vuông góc nên \\(\\theta = 90^\\circ \\implies \\sin\\theta = 1\\).",
      "**Bước 4:** Thay số: \\[\n\\|2\\mathbf{u} \\times 3\\mathbf{v}\\| = 6 \\cdot 4 \\cdot 5 \\cdot 1 = 120.\\]",
      "**Kết luận:** Độ dài vector bằng 120, ứng với lựa chọn C."
    ],
    "image": "0078_q078_Question_78.png",
    "needs_image": false,
    "review_flags": [],
    "confidence": "high"
  },
  {
    "id": 97,
    "chapter": "GT1 - Giải tích 1",
    "folder": "GT1",
    "topic": "TichPhan",
    "type": "single_choice",
    "question": "Evaluate the improper integral \\[\\int_0^1 \\dfrac{dx}{x^{0.2}}\\]",
    "options": [
      "None of the other choices is correct",
      "Does not exist",
      "2.5",
      "1.25",
      "0.2"
    ],
    "answer": "D",
    "answer_original": "D",
    "answer_status": "verified",
    "explanation": [
      "**Bước 1:** Tích phân có điểm bất định tại cận dưới \\(x = 0\\) do mẫu số triệt tiêu. Định nghĩa tích phân suy rộng: \\[\\int_0^1 \\dfrac{dx}{x^{0.2}} = \\lim_{t \\to 0^+} \\int_t^1 x^{-0.2} \\, dx.\\]",
      "**Bước 2:** Tìm nguyên hàm bằng công thức lũy thừa: \\[\\int x^{-0.2} \\, dx = \\dfrac{x^{-0.2 + 1}}{-0.2 + 1} = \\dfrac{x^{0.8}}{0.8} = \\dfrac{5}{4} x^{0.8}.\\]",
      "**Bước 3:** Thay cận và lấy giới hạn: \\[\\lim_{t \\to 0^+} \\left[ \\dfrac{5}{4} x^{0.8} \\right]_t^1 = \\dfrac{5}{4}(1^{0.8}) - \\lim_{t \\to 0^+} \\dfrac{5}{4}(t^{0.8}) = \\dfrac{5}{4} - 0 = 1.25.\\]",
      "**Kết luận:** Tích phân hội tụ và có giá trị bằng 1.25, ứng với lựa chọn D."
    ],
    "image": "0097_q097_Question_97.png",
    "needs_image": false,
    "review_flags": [],
    "confidence": "high"
  },
  {
    "id": 100,
    "chapter": "DSTT1 - Đại số tuyến tính 1",
    "folder": "DSTT1",
    "topic": "HePhuongTrinh",
    "type": "single_choice",
    "question": "Solve the systems of equations for \\(y\\) \\[\\begin{cases} x + 4y + 2z = 1 \\\\ 2x + 3y + 3z = -1 \\\\ 4x + y + 4z = 0 \\end{cases}\\]",
    "options": [
      "All of the other choices are incorrect",
      "-8/5",
      "4/5",
      "8/5",
      "-4/5"
    ],
    "answer": "D",
    "answer_original": "D",
    "answer_status": "verified",
    "explanation": [
      "**Bước 1:** Áp dụng định lý Cramer. Tính định thức ma trận hệ số \\(A\\): \\[\\det(A) = \\begin{vmatrix} 1 & 4 & 2 \\\\ 2 & 3 & 3 \\\\ 4 & 1 & 4 \\end{vmatrix} = 1(12 - 3) - 4(8 - 12) + 2(2 - 12) = 9 + 16 - 20 = 5.\\]",
      "**Bước 2:** Thay cột thứ 2 (cột của \\(y\\)) bằng vector hệ số tự do \\(\\begin{bmatrix} 1 \\\\ -1 \\\\ 0 \\end{bmatrix}\\) để tính \\(\\det(A_y)\\): \\[\\det(A_y) = \\begin{vmatrix} 1 & 1 & 2 \\\\ 2 & -1 & 3 \\\\ 4 & 0 & 4 \\end{vmatrix} = 1(-4 - 0) - 1(8 - 12) + 2(0 - (-4)) = -4 + 4 + 8 = 8.\\]",
      "**Bước 3:** Theo công thức Cramer: \\[y = \\dfrac{\\det(A_y)}{\\det(A)} = \\dfrac{8}{5}.\\]",
      "**Kết luận:** Giá trị của \\(y\\) là \\(8/5\\), tương ứng với lựa chọn D."
    ],
    "image": "0100_q100_Question_100.png",
    "needs_image": false,
    "review_flags": [],
    "confidence": "high"
  },
  {
    "id": 112,
    "chapter": "GT1 - Giải tích 1",
    "folder": "GT1",
    "topic": "HamSo",
    "type": "single_choice",
    "question": "The graph of \\(f(x)\\) is given. State the numbers at which \\(f(x)\\) is not differentiable.",
    "options": [
      "0; 3",
      "None of the other choices is correct",
      "3",
      "0; 2; 4",
      "0; 1; 3; 4"
    ],
    "answer": "A",
    "answer_original": "A",
    "answer_status": "verified",
    "explanation": [
      "**Bước 1:** Một hàm số không có đạo hàm tại các điểm mà hàm số bị gián đoạn (tiệm cận đứng/nhảy), hoặc đồ thị có điểm gãy/nhọn (góc nhọn - corner/cusp) khiến đạo hàm một phía không bằng nhau.",
      "**Bước 2:** Quan sát đồ thị đính kèm: tại \\(x = 0\\), đồ thị có tiệm cận đứng đi xuống \\(-\\infty\\), do đó hàm không liên tục tại \\(x = 0\\), dẫn đến không khả vi.",
      "**Bước 3:** Tại \\(x = 3\\), đồ thị có một đỉnh gãy nhọn (sharp corner), tại đây tiếp tuyến trái và tiếp tuyến phải có hệ số góc khác nhau, do đó hàm không có đạo hàm tại \\(x = 3\\).",
      "**Bước 4:** Tại các điểm khác như \\(x = 1, 2, 4\\), đường cong trơn và liên tục nên hàm số khả vi.",
      "**Kết luận:** Hàm số không khả vi tại \\(x = 0\\) và \\(x = 3\\), ứng với lựa chọn A."
    ],
    "image": "0112_q112_Question_112.png",
    "needs_image": true,
    "review_flags": [],
    "confidence": "high"
  },
  {
    "id": 123,
    "chapter": "GT1 - Giải tích 1",
    "folder": "GT1",
    "topic": "HamSo",
    "type": "single_choice",
    "question": "A table of values for \\(f, g, f', g'\\) is given \\[\\begin{array}{|c|c|c|c|c|} \\hline x & f(x) & g(x) & f'(x) & g'(x) \\\\ \\hline 0 & 1 & 1 & 2 & -2 \\\\ \\hline 1 & 0 & 2 & 3 & -1 \\\\ \\hline 2 & 4 & -1 & 5 & 6 \\\\ \\hline \\end{array}\\] Find \\(h'(1)\\) if \\(h(x) = g(f(x))\\).",
    "options": [
      "-5",
      "-6",
      "None determined",
      "-2",
      "None of the other choices is correct",
      "0"
    ],
    "answer": "B",
    "answer_original": "B",
    "answer_status": "verified",
    "explanation": [
      "**Bước 1:** Áp dụng quy tắc đạo hàm của hàm hợp (Chain Rule): với \\(h(x) = g(f(x))\\), ta có đạo hàm \\[h'(x) = g'(f(x)) \\cdot f'(x).\\]",
      "**Bước 2:** Thay \\(x = 1\\) vào công thức: \\[h'(1) = g'(f(1)) \\cdot f'(1).\\]",
      "**Bước 3:** Tra cứu các giá trị từ bảng: tại dòng \\(x = 1\\), ta có \\(f(1) = 0\\) và \\(f'(1) = 3\\). Do đó: \\[h'(1) = g'(0) \\cdot 3.\\]",
      "**Bước 4:** Tra cứu giá trị \\(g'(0)\\): tại dòng \\(x = 0\\), ta có \\(g'(0) = -2\\). Thay vào ta được: \\[h'(1) = (-2) \\cdot 3 = -6.\\]",
      "**Kết luận:** Giá trị đạo hàm \\(h'(1) = -6\\), tương ứng với lựa chọn B."
    ],
    "image": "0123_q123_Question_123.png",
    "needs_image": false,
    "review_flags": [],
    "confidence": "high"
  }
];