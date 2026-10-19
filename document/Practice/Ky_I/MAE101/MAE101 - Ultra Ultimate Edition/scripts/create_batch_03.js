const fs = require('fs');
const path = require('path');

// Pull Q97, Q100, Q112 directly from test_20.json if desired, or define cleanly.
const test20 = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/v2/test_20.json'), 'utf8'));
const getFromTest20 = (id) => test20.find(q => q.id === id);

const batch03 = [
  {
    "id": 81,
    "chapter": "DSTT1 - Đại số tuyến tính 1",
    "folder": "DSTT1",
    "topic": "MaTran",
    "type": "single_choice",
    "question": "Let \\[A = \\begin{bmatrix} 1 & 2 & 0 \\\\ 3 & 0 & 1 \\\\ -1 & 2 & 2 \\end{bmatrix}\\] Find the determinant of the matrix \\(2A^{-1}\\)",
    "options": [
      "-1/2",
      "-1/8",
      "1/2",
      "None of the other choices is correct",
      "1/8"
    ],
    "answer": "A",
    "answer_original": "A",
    "answer_status": "verified",
    "explanation": [
      "**Bước 1:** Tính định thức của ma trận \\(A\\) bằng cách khai triển theo hàng thứ nhất:\n\\[\\det(A) = 1(0 \\cdot 2 - 1 \\cdot 2) - 2(3 \\cdot 2 - 1 \\cdot (-1)) + 0 = 1(-2) - 2(6 + 1) = -2 - 14 = -16.\\]",
      "**Bước 2:** Sử dụng tính chất của định thức đối với ma trận cỡ \\(3 \\times 3\\):\n\\[\\det(kA) = k^n \\det(A) \\implies \\det(2A^{-1}) = 2^3 \\det(A^{-1}) = 8 \\cdot \\dfrac{1}{\\det(A)}.\\]",
      "**Bước 3:** Thay giá trị \\(\\det(A) = -16\\) vào:\n\\[\\det(2A^{-1}) = 8 \\cdot \\left(-\\dfrac{1}{16}\\right) = -\\dfrac{1}{2}.\\]",
      "**Kết luận:** Giá trị định thức là \\(-1/2\\), tương ứng với lựa chọn A."
    ],
    "image": "0081_q081_Question_81.png",
    "needs_image": false,
    "review_flags": [],
    "confidence": "high"
  },
  {
    "id": 82,
    "chapter": "GT1 - Giải tích 1",
    "folder": "GT1",
    "topic": "GioiHan",
    "type": "single_choice",
    "question": "Evaluate the limit, if it exists \\[\\lim_{x \\to \\pi} [5\\cos(2x) + 16\\tan(x)]\\]",
    "options": [
      "-5",
      "-3",
      "5",
      "0",
      "None of the other choices is correct",
      "3"
    ],
    "answer": "C",
    "answer_original": "C",
    "answer_status": "verified",
    "explanation": [
      "**Bước 1:** Kiểm tra tính liên tục của hàm số \\(f(x) = 5\\cos(2x) + 16\\tan(x)\\) tại điểm \\(x = \\pi\\). Cả hai hàm \\(\\cos(2x)\\) và \\(\\tan(x)\\) đều xác định và liên tục tại \\(x = \\pi\\).",
      "**Bước 2:** Áp dụng tính chất giới hạn bằng cách thay trực tiếp \\(x = \\pi\\):\n\\[\\lim_{x \\to \\pi} [5\\cos(2x) + 16\\tan(x)] = 5\\cos(2\\pi) + 16\\tan(\\pi).\\]",
      "**Bước 3:** Tính các giá trị lượng giác:\n- \\(\\cos(2\\pi) = 1 \\implies 5\\cos(2\\pi) = 5\\)\n- \\(\\tan(\\pi) = 0 \\implies 16\\tan(\\pi) = 0\\)",
      "**Bước 4:** Cộng các giá trị lại: \\[5 + 0 = 5.\\]",
      "**Kết luận:** Giới hạn bằng 5, tương ứng với lựa chọn C."
    ],
    "image": "0082_q082_Question_82.png",
    "needs_image": false,
    "review_flags": [],
    "confidence": "high"
  },
  {
    "id": 83,
    "chapter": "GT1 - Giải tích 1",
    "folder": "GT1",
    "topic": "HamSo",
    "type": "single_choice",
    "question": "Write equation for the graphs that are obtained from stretch the graph of \\(y = f(x)\\) vertically by a factor of 5 and then shift 1 unit upward",
    "options": [
      "\\(y = 5f(x) + 1\\)",
      "\\(y = 5f(x) - 1\\)",
      "\\(y = f(5x) + 1\\)",
      "\\(y = f(x/5) + 1\\)",
      "None of the other choices is correct"
    ],
    "answer": "A",
    "answer_original": "A",
    "answer_status": "verified",
    "explanation": [
      "**Bước 1:** Phép co giãn đồ thị theo phương thẳng đứng (vertical stretching) với hệ số \\(c = 5\\) biến hàm số \\(y = f(x)\\) thành: \\[y = 5f(x).\\]",
      "**Bước 2:** Phép tịnh tiến đồ thị lên trên 1 đơn vị (shift 1 unit upward) thêm 1 vào giá trị của hàm: \\[y = 5f(x) + 1.\\]",
      "**Kết luận:** Phương trình đồ thị thu được là \\(y = 5f(x) + 1\\), tương ứng với lựa chọn A."
    ],
    "image": "0083_q083_Question_83.png",
    "needs_image": false,
    "review_flags": [],
    "confidence": "high"
  },
  {
    "id": 84,
    "chapter": "GT1 - Giải tích 1",
    "folder": "GT1",
    "topic": "DaoHam",
    "type": "single_choice",
    "question": "Let \\(h(x) = \\sin(f(x))\\). Given that \\(f(0) = \\pi\\) and \\(f'(0) = 2\\), find \\(h'(0)\\)",
    "options": [
      "2",
      "1",
      "None of them",
      "-2",
      "-1"
    ],
    "answer": "D",
    "answer_original": "D",
    "answer_status": "verified",
    "explanation": [
      "**Bước 1:** Áp dụng quy tắc đạo hàm của hàm hợp (chain rule) đối với \\(h(x) = \\sin(f(x))\\):\n\\[h'(x) = [\\sin(f(x))]' = \\cos(f(x)) \\cdot f'(x).\\]",
      "**Bước 2:** Thay \\(x = 0\\) vào biểu thức đạo hàm:\n\\[h'(0) = \\cos(f(0)) \\cdot f'(0).\\]",
      "**Bước 3:** Sử dụng các giá trị đã cho \\(f(0) = \\pi\\) và \\(f'(0) = 2\\):\n\\[h'(0) = \\cos(\\pi) \\cdot 2 = (-1) \\cdot 2 = -2.\\]",
      "**Kết luận:** Giá trị \\(h'(0) = -2\\), tương ứng với lựa chọn D."
    ],
    "image": "0084_q084_Question_84.png",
    "needs_image": false,
    "review_flags": [],
    "confidence": "high"
  },
  {
    "id": 85,
    "chapter": "DSTT1 - Đại số tuyến tính 1",
    "folder": "DSTT1",
    "topic": "HinhHocGiaiTich",
    "type": "single_choice",
    "question": "Let \\(B(1, 0, 1)\\). Find all points M on the line passing through \\(A(2, 0, 0)\\) and parallel to the vector \\(d = [1 \\ -1 \\ 1]^T\\) such that \\(MB = \\sqrt{5}\\).",
    "options": [
      "\\(M(1, 1, -1)\\)",
      "\\(M(2, 5, 1/3)\\)",
      "\\(M(1, 1, 1)\\) or \\(M(2, 3, -4)\\)",
      "None of the other choices is correct",
      "\\(M(3, -1, 1)\\) or \\(M(1, 1, -1)\\)"
    ],
    "answer": "E",
    "answer_original": "E",
    "answer_status": "verified",
    "explanation": [
      "**Bước 1:** Viết phương trình tham số của đường thẳng đi qua \\(A(2, 0, 0)\\) có vector chỉ phương \\(d = (1, -1, 1)\\):\n\\[M(t) = (2 + t, -t, t), \\quad t \\in \\mathbb{R}.\\]",
      "**Bước 2:** Vector nối từ \\(B(1, 0, 1)\\) đến \\(M(t)\\) là:\n\\[\\vec{BM} = (2 + t - 1, -t - 0, t - 1) = (t + 1, -t, t - 1).\\]",
      "**Bước 3:** Độ dài bình phương khoảng cách \\(MB^2\\) là:\n\\[MB^2 = (t + 1)^2 + (-t)^2 + (t - 1)^2 = (t^2 + 2t + 1) + t^2 + (t^2 - 2t + 1) = 3t^2 + 2.\\]",
      "**Bước 4:** Theo đề bài, \\(MB = \\sqrt{5} \\implies MB^2 = 5\\):\n\\[3t^2 + 2 = 5 \\iff 3t^2 = 3 \\iff t^2 = 1 \\iff t = \\pm 1.\\]",
      "**Bước 5:** Thay giá trị của \\(t\\) để tìm tọa độ điểm \\(M\\):\n- Với \\(t = 1\\): \\(M(2 + 1, -1, 1) = M(3, -1, 1)\\).\n- Với \\(t = -1\\): \\(M(2 - 1, -(-1), -1) = M(1, 1, -1)\\).",
      "**Kết luận:** Các điểm thỏa mãn là \\(M(3, -1, 1)\\) hoặc \\(M(1, 1, -1)\\), tương ứng với lựa chọn E."
    ],
    "image": "0085_q085_Question_85.png",
    "needs_image": false,
    "review_flags": [],
    "confidence": "high"
  },
  {
    "id": 86,
    "chapter": "GT1 - Giải tích 1",
    "folder": "GT1",
    "topic": "DaoHam",
    "type": "single_choice",
    "question": "Find the equation for the tangent to the curve \\(f(x) = \\dfrac{\\sqrt{x}}{5}\\) at the point \\(M(4; 2/5)\\).",
    "options": [
      "None of the other choices is correct",
      "\\(y = x + 1\\)",
      "\\(y = -2x + 1\\)",
      "\\(y = -x + (1/5)\\)",
      "\\(y = (1/20)x + (1/5)\\)"
    ],
    "answer": "E",
    "answer_original": "E",
    "answer_status": "verified",
    "explanation": [
      "**Bước 1:** Viết lại hàm số dưới dạng lũy thừa: \\(f(x) = \\dfrac{1}{5} x^{1/2}\\).",
      "**Bước 2:** Tính đạo hàm của hàm số:\n\\[f'(x) = \\dfrac{1}{5} \\cdot \\dfrac{1}{2} x^{-1/2} = \\dfrac{1}{10\\sqrt{x}}.\\]",
      "**Bước 3:** Hệ số góc của tiếp tuyến tại điểm \\(x = 4\\) là:\n\\[k = f'(4) = \\dfrac{1}{10\\sqrt{4}} = \\dfrac{1}{20}.\\]",
      "**Bước 4:** Phương trình tiếp tuyến tại \\(M(4, 2/5)\\) có dạng \\(y - y_0 = k(x - x_0)\\):\n\\[y - \\dfrac{2}{5} = \\dfrac{1}{20}(x - 4) \\iff y = \\dfrac{1}{20}x - \\dfrac{4}{20} + \\dfrac{2}{5} = \\dfrac{1}{20}x - \\dfrac{1}{5} + \\dfrac{2}{5} = \\dfrac{1}{20}x + \\dfrac{1}{5}.\\]",
      "**Kết luận:** Phương trình tiếp tuyến là \\(y = (1/20)x + (1/5)\\), tương ứng với lựa chọn E."
    ],
    "image": "0086_q086_Question_86.png",
    "needs_image": false,
    "review_flags": [],
    "confidence": "high"
  },
  {
    "id": 87,
    "chapter": "GT1 - Giải tích 1",
    "folder": "GT1",
    "topic": "KhaoSatHamSo",
    "type": "single_choice",
    "question": "Find points of inflection for \\[f(x) = x^3 - 3x^2 + 2x + 15\\]",
    "options": [
      "\\((-1, 14)\\)",
      "\\((-1, 13)\\)",
      "\\((0, 15)\\)",
      "\\((1, 15)\\)",
      "None of the other choices is correct"
    ],
    "answer": "D",
    "answer_original": "D",
    "answer_status": "verified",
    "explanation": [
      "**Bước 1:** Điểm uốn (point of inflection) xảy ra tại nơi đạo hàm cấp hai \\(f''(x) = 0\\) (hoặc không xác định) và đổi dấu qua điểm đó.",
      "**Bước 2:** Tính đạo hàm cấp một và cấp hai:\n\\[f'(x) = 3x^2 - 6x + 2,\\]\n\\[f''(x) = 6x - 6.\\]",
      "**Bước 3:** Giải phương trình \\(f''(x) = 0\\):\n\\[6x - 6 = 0 \\iff x = 1.\\]\nVì \\(f''(x) < 0\\) khi \\(x < 1\\) và \\(f''(x) > 0\\) khi \\(x > 1\\), nên \\(f''(x)\\) đổi dấu qua \\(x = 1\\), do đó \\(x = 1\\) là hoành độ điểm uốn.",
      "**Bước 4:** Tính tung độ tại \\(x = 1\\):\n\\[f(1) = 1^3 - 3(1)^2 + 2(1) + 15 = 1 - 3 + 2 + 15 = 15.\\]",
      "**Kết luận:** Tọa độ điểm uốn là \\((1, 15)\\), tương ứng với lựa chọn D."
    ],
    "image": "0087_q087_Question_87.png",
    "needs_image": false,
    "review_flags": [],
    "confidence": "high"
  },
  {
    "id": 88,
    "chapter": "GT1 - Giải tích 1",
    "folder": "GT1",
    "topic": "TichPhan",
    "type": "single_choice",
    "question": "Estimate the area of under the graph of \\[f(x) = \\sin x\\] from \\(x = 0\\) to \\(x = \\pi/2\\), using three rectangles and left endpoints.\n(i) \\(\\frac{\\pi(1+\\sqrt{3})}{12}\\)\n(ii) \\(\\frac{\\pi(3+\\sqrt{3})}{12}\\)\n(iii) \\(\\frac{\\pi(3+\\sqrt{3})}{6}\\)\n(iv) \\(\\frac{\\pi(1+\\sqrt{3})}{6}\\)",
    "options": [
      "(i)",
      "(iv)",
      "(iii)",
      "(ii)"
    ],
    "answer": "A",
    "answer_original": "A",
    "answer_status": "verified",
    "explanation": [
      "**Bước 1:** Khoảng \\([a, b] = [0, \\pi/2]\\) chia làm \\(n = 3\\) đoạn con bằng nhau. Chiều rộng mỗi đoạn:\n\\[\\Delta x = \\dfrac{\\pi/2 - 0}{3} = \\dfrac{\\pi}{6}.\\]",
      "**Bước 2:** Các điểm đầu mút trái (left endpoints) của 3 đoạn là: \\(x_0 = 0\\), \\(x_1 = \\pi/6\\), \\(x_2 = \\pi/3\\).",
      "**Bước 3:** Tính giá trị hàm số tại các điểm đầu mút trái:\n- \\(f(0) = \\sin(0) = 0\\)\n- \\(f(\\pi/6) = \\sin(\\pi/6) = 1/2\\)\n- \\(f(\\pi/3) = \\sin(\\pi/3) = \\sqrt{3}/2\\)",
      "**Bước 4:** Tổng diện tích các hình chữ nhật xấp xỉ bằng tổng Riemann mút trái:\n\\[L_3 = \\Delta x [f(0) + f(\\pi/6) + f(\\pi/3)] = \\dfrac{\\pi}{6} \\left(0 + \\dfrac{1}{2} + \\dfrac{\\sqrt{3}}{2}\\right) = \\dfrac{\\pi(1 + \\sqrt{3})}{12}.\\]",
      "**Kết luận:** Biểu thức đúng là (i), tương ứng với lựa chọn A."
    ],
    "image": "0088_q088_Question_88.png",
    "needs_image": false,
    "review_flags": [],
    "confidence": "high"
  },
  {
    "id": 89,
    "chapter": "DSTT1 - Đại số tuyến tính 1",
    "folder": "DSTT1",
    "topic": "MaTran",
    "type": "single_choice",
    "question": "Let \\[A = \\begin{bmatrix} 1 & 1 \\\\ 1 & 1 \\end{bmatrix}\\] Find the (1, 2)-entry of \\(A^6\\).",
    "options": [
      "64",
      "16",
      "32",
      "6"
    ],
    "answer": "C",
    "answer_original": "C",
    "answer_status": "verified",
    "explanation": [
      "**Bước 1:** Tính bình phương của ma trận \\(A\\):\n\\[A^2 = \\begin{bmatrix} 1 & 1 \\\\ 1 & 1 \\end{bmatrix} \\begin{bmatrix} 1 & 1 \\\\ 1 & 1 \\end{bmatrix} = \\begin{bmatrix} 2 & 2 \\\\ 2 & 2 \\end{bmatrix} = 2A.\\]",
      "**Bước 2:** Bằng quy nạp toán học, ta có công thức tổng quát cho lũy thừa bậc \\(k\\) của \\(A\\):\n\\[A^k = 2^{k-1} A.\\]",
      "**Bước 3:** Với \\(k = 6\\):\n\\[A^6 = 2^{6-1} A = 2^5 A = 32 A = 32 \\begin{bmatrix} 1 & 1 \\\\ 1 & 1 \\end{bmatrix} = \\begin{bmatrix} 32 & 32 \\\\ 32 & 32 \\end{bmatrix}.\\]",
      "**Bước 4:** Phần tử ở vị trí hàng 1, cột 2 là: \\((A^6)_{1, 2} = 32\\).",
      "**Kết luận:** Giá trị của phần tử (1, 2) là 32, tương ứng với lựa chọn C."
    ],
    "image": "0089_q089_Question_89.png",
    "needs_image": false,
    "review_flags": [],
    "confidence": "high"
  },
  {
    "id": 90,
    "chapter": "DSTT1 - Đại số tuyến tính 1",
    "folder": "DSTT1",
    "topic": "MaTran",
    "type": "single_choice",
    "question": "Find the product \\(AB\\), where \\[A = \\begin{bmatrix} -5 & 7 & 6 \\\\ 9 & -3 & -1 \\\\ 2 & 4 & -8 \\end{bmatrix} \\quad \\text{and} \\quad B = \\begin{bmatrix} 2 \\\\ 8 \\\\ 5 \\end{bmatrix}\\]\n(i) \\([76 \\quad -11 \\quad -4]^T\\)\n(ii) \\([75 \\quad -11 \\quad -4]^T\\)\n(iii) \\([76 \\quad -12 \\quad -4]^T\\)\n(iv) \\([76 \\quad -11 \\quad -3]^T\\)",
    "options": [
      "None of the choices is correct",
      "(iv)",
      "(i)",
      "(iii)",
      "(ii)"
    ],
    "answer": "C",
    "answer_original": "C",
    "answer_status": "verified",
    "explanation": [
      "**Bước 1:** Thực hiện phép nhân ma trận \\(A\\) (cỡ \\(3 \\times 3\\)) với vector cột \\(B\\) (cỡ \\(3 \\times 1\\)):\n\\[AB = \\begin{bmatrix} -5 & 7 & 6 \\\\ 9 & -3 & -1 \\\\ 2 & 4 & -8 \\end{bmatrix} \\begin{bmatrix} 2 \\\\ 8 \\\\ 5 \\end{bmatrix}.\\]",
      "**Bước 2:** Tính từng hàng của tích:\n- Hàng 1: \\((-5) \\cdot 2 + 7 \\cdot 8 + 6 \\cdot 5 = -10 + 56 + 30 = 76\\).\n- Hàng 2: \\(9 \\cdot 2 + (-3) \\cdot 8 + (-1) \\cdot 5 = 18 - 24 - 5 = -11\\).\n- Hàng 3: \\(2 \\cdot 2 + 4 \\cdot 8 + (-8) \\cdot 5 = 4 + 32 - 40 = -4\\).",
      "**Bước 3:** Kết quả là vector cột \\(\\begin{bmatrix} 76 \\\\ -11 \\\\ -4 \\end{bmatrix}\\), hay chuyển vị thành \\([76 \\quad -11 \\quad -4]^T\\).",
      "**Kết luận:** Kết quả khớp với biểu thức (i), tương ứng với lựa chọn C."
    ],
    "image": "0090_q090_Question_90.png",
    "needs_image": false,
    "review_flags": [],
    "confidence": "high"
  },
  {
    "id": 91,
    "chapter": "DSTT1 - Đại số tuyến tính 1",
    "folder": "DSTT1",
    "topic": "HinhHocGiaiTich",
    "type": "single_choice",
    "question": "Let \\(X\\) and \\(Y\\) be vectors in \\(\\mathbb{R}^n\\) such that \\[\\|X\\| = 4, \\quad \\|Y\\| = 3, \\quad X \\cdot Y = -2.\\] Compute \\(\\|2X - 3Y\\|\\)",
    "options": [
      "11",
      "13",
      "9",
      "10"
    ],
    "answer": "B",
    "answer_original": "B",
    "answer_status": "verified",
    "explanation": [
      "**Bước 1:** Sử dụng công thức tính bình phương độ dài của vector thông qua tích vô hướng:\n\\[\\|2X - 3Y\\|^2 = (2X - 3Y) \\cdot (2X - 3Y).\\]",
      "**Bước 2:** Khai triển biểu thức tích vô hướng:\n\\[\\|2X - 3Y\\|^2 = 4(X \\cdot X) - 12(X \\cdot Y) + 9(Y \\cdot Y) = 4\\|X\\|^2 - 12(X \\cdot Y) + 9\\|Y\\|^2.\\]",
      "**Bước 3:** Thay các giá trị đề bài đã cho: \\(\\|X\\| = 4\\), \\(\\|Y\\| = 3\\), \\(X \\cdot Y = -2\\):\n\\[\\|2X - 3Y\\|^2 = 4(4^2) - 12(-2) + 9(3^2) = 4(16) + 24 + 9(9) = 64 + 24 + 81 = 169.\\]",
      "**Bước 4:** Lấy căn bậc hai: \\[\\|2X - 3Y\\| = \\sqrt{169} = 13.\\]",
      "**Kết luận:** Độ dài cần tìm là 13, tương ứng với lựa chọn B."
    ],
    "image": "0091_q091_Question_91.png",
    "needs_image": false,
    "review_flags": [],
    "confidence": "high"
  },
  {
    "id": 92,
    "chapter": "DSTT1 - Đại số tuyến tính 1",
    "folder": "DSTT1",
    "topic": "MaTran",
    "type": "single_choice",
    "question": "Let A be an \\(3 \\times 3\\) matrix. Find \\(\\det A\\) if \\(A A^T = 3I\\).\n(i) 1\n(ii) \\(3\\sqrt{3}\\) or 1\n(iii) \\(3\\sqrt{3}\\) or \\(-3\\sqrt{3}\\)\n(iv) \\(\\sqrt{3}\\) or \\(-\\sqrt{3}\\)",
    "options": [
      "(iii)",
      "(ii)",
      "(i)",
      "(iv)"
    ],
    "answer": "A",
    "answer_original": "C",
    "answer_status": "conflict",
    "explanation": [
      "**Bước 1:** Lấy định thức hai vế của phương trình \\(A A^T = 3I\\):\n\\[\\det(A A^T) = \\det(3I).\\]",
      "**Bước 2:** Sử dụng tính chất của định thức đối với ma trận vuông cấp \\(n = 3\\):\n- \\(\\det(A A^T) = \\det(A) \\cdot \\det(A^T) = (\\det A)^2\\) (do \\(\\det A^T = \\det A\\)).\n- Với ma trận đơn vị \\(I\\) cấp 3: \\(\\det(3I) = 3^3 \\det(I) = 27 \\cdot 1 = 27\\).",
      "**Bước 3:** Giải phương trình:\n\\[(\\det A)^2 = 27 \\iff \\det A = \\pm \\sqrt{27} = \\pm 3\\sqrt{3}.\\]",
      "**Bước 4:** Do đó \\(\\det A = 3\\sqrt{3}\\) hoặc \\(\\det A = -3\\sqrt{3}\\), tương ứng với mệnh đề (iii).",
      "**Ghi chú đối chiếu:** Đáp án gốc trong ngân hàng là C (chọn (i): 1), đây là lỗi toán học nghiêm trọng (nhầm lẫn giữa \\(3I\\) và \\(I\\), hoặc quên bậc lũy thừa của hệ số trong \\(\\det(kI) = k^n\\)). Đáp án toán học chính xác tuyệt đối là A (chọn (iii))."
    ],
    "image": "0092_q092_Question_92.png",
    "needs_image": false,
    "review_flags": [
      "conflict_with_original_key: key says C (i), mathematically correct is A (iii)"
    ],
    "confidence": "high"
  },
  {
    "id": 93,
    "chapter": "GT1 - Giải tích 1",
    "folder": "GT1",
    "topic": "KhaoSatHamSo",
    "type": "single_choice",
    "question": "Find two positive numbers such that the sum of the first and three times the second is 60, and the numbers is as large as possible.",
    "options": [
      "30 and 10",
      "-10 and 90",
      "15 and 15",
      "0 and 60",
      "None of the other choices is correct"
    ],
    "answer": "A",
    "answer_original": "A",
    "answer_status": "verified",
    "explanation": [
      "**Bước 1:** Đề bài là bài toán tối ưu hóa trong giải tích (nguyên văn lược bớt từ 'product', ngụ ý tích hai số là lớn nhất). Gọi hai số dương cần tìm là \\(x > 0\\) và \\(y > 0\\).",
      "**Bước 2:** Theo giả thiết: tổng của số thứ nhất và 3 lần số thứ hai là 60: \\[x + 3y = 60 \\implies x = 60 - 3y.\\]",
      "**Bước 3:** Xét hàm mục tiêu tích của hai số \\(P(y) = x \\cdot y = (60 - 3y)y = 60y - 3y^2\\) trên khoảng \\(y \\in (0, 20)\\).",
      "**Bước 4:** Tìm điểm cực trị: \\[P'(y) = 60 - 6y = 0 \\implies y = 10.\\]",
      "**Bước 5:** Vì \\(P''(y) = -6 < 0\\), hàm đạt cực đại duy nhất tại \\(y = 10\\). Khi đó \\(x = 60 - 3(10) = 30\\). Cả hai số đều dương và thỏa mãn đề bài.",
      "**Kết luận:** Hai số cần tìm là 30 và 10, tương ứng với lựa chọn A."
    ],
    "image": "0093_q093_Question_93.png",
    "needs_image": false,
    "review_flags": [],
    "confidence": "high"
  },
  {
    "id": 94,
    "chapter": "DSTT1 - Đại số tuyến tính 1",
    "folder": "DSTT1",
    "topic": "HePhuongTrinh",
    "type": "single_choice",
    "question": "Write the linear system as a matrix equation in the form \\(AX = B\\)\n\\[5x + 4y = 42 \\quad 7x + 3y = 51\\]\n(i) \\(\\begin{bmatrix} 5 & 4 \\\\ 7 & 3 \\end{bmatrix} \\begin{bmatrix} x \\\\ y \\end{bmatrix} = \\begin{bmatrix} 42 \\\\ 51 \\end{bmatrix}\\)\n(ii) \\(\\begin{bmatrix} 42 & 4 \\\\ 51 & 7 \\end{bmatrix} \\begin{bmatrix} x \\\\ y \\end{bmatrix} = \\begin{bmatrix} 5 \\\\ 3 \\end{bmatrix}\\)\n(iii) \\(\\begin{bmatrix} 5 & 4 \\\\ 7 & 3 \\end{bmatrix} \\begin{bmatrix} x \\\\ y \\end{bmatrix} = \\begin{bmatrix} 51 \\\\ 42 \\end{bmatrix}\\)\n(iv) \\(\\begin{bmatrix} 5 & 7 \\\\ 4 & 3 \\end{bmatrix} \\begin{bmatrix} x \\\\ y \\end{bmatrix} = \\begin{bmatrix} 42 \\\\ 51 \\end{bmatrix}\\)",
    "options": [
      "None of the other choices is correct",
      "(iii)",
      "(ii)",
      "(iv)",
      "(i)"
    ],
    "answer": "E",
    "answer_original": "E",
    "answer_status": "verified",
    "explanation": [
      "**Bước 1:** Xét hệ phương trình tuyến tính:\n\\[\\begin{cases} 5x + 4y = 42 \\\\ 7x + 3y = 51 \\end{cases}\\]",
      "**Bước 2:** Xác định ma trận hệ số \\(A\\), vector ẩn \\(X\\), và vector vế phải \\(B\\):\n- Ma trận hệ số: \\(A = \\begin{bmatrix} 5 & 4 \\\\ 7 & 3 \\end{bmatrix}\\)\n- Vector biến: \\(X = \\begin{bmatrix} x \\\\ y \\end{bmatrix}\\)\n- Vector hằng số: \\(B = \\begin{bmatrix} 42 \\\\ 51 \\end{bmatrix}\\)",
      "**Bước 3:** Dạng phương trình ma trận \\(AX = B\\) là: \\[\\begin{bmatrix} 5 & 4 \\\\ 7 & 3 \\end{bmatrix} \\begin{bmatrix} x \\\\ y \\end{bmatrix} = \\begin{bmatrix} 42 \\\\ 51 \\end{bmatrix}.\\]",
      "**Kết luận:** Phương trình ma trận đúng là (i), tương ứng với lựa chọn E."
    ],
    "image": "0094_q094_Question_94.png",
    "needs_image": false,
    "review_flags": [],
    "confidence": "high"
  },
  {
    "id": 95,
    "chapter": "DSTT1 - Đại số tuyến tính 1",
    "folder": "DSTT1",
    "topic": "KhongGianVectơ",
    "type": "single_choice",
    "question": "Let A be a \\(5 \\times 10\\) matrix of rank 4. Find the dimension of the image space of A.",
    "options": [
      "6",
      "5",
      "4",
      "10",
      "None of the other choices is correct"
    ],
    "answer": "C",
    "answer_original": "C",
    "answer_status": "verified",
    "explanation": [
      "**Bước 1:** Không gian ảnh (image space hoặc column space / range) của ma trận \\(A\\), ký hiệu là \\(\\operatorname{im}(A)\\) hay \\(\\operatorname{Col}(A)\\), được sinh bởi các cột của \\(A\\).",
      "**Bước 2:** Theo định lý cơ bản của đại số tuyến tính, số chiều của không gian ảnh chính là hạng của ma trận \\(A\\):\n\\[\\dim(\\operatorname{im}(A)) = \\operatorname{rank}(A).\\]",
      "**Bước 3:** Đề bài cho \\(\\operatorname{rank}(A) = 4\\), suy ra \\(\\dim(\\operatorname{im}(A)) = 4\\).",
      "**Kết luận:** Số chiều của không gian ảnh là 4, tương ứng với lựa chọn C."
    ],
    "image": "0095_q095_Question_95.png",
    "needs_image": false,
    "review_flags": [],
    "confidence": "high"
  },
  {
    "id": 96,
    "chapter": "GT1 - Giải tích 1",
    "folder": "GT1",
    "topic": "TichPhan",
    "type": "single_choice",
    "question": "Express the following limit as a definite integral \\[\\lim_{n \\to \\infty} \\sum_{i=1}^n \\frac{2 + 4i/n}{1 + (2 + 4i/n)^5} \\cdot \\frac{4}{n}\\]\n(i) \\(\\int_2^6 \\frac{2+4x}{1+(2+4x)^5} \\, dx\\)\n(ii) \\(\\int_2^6 \\frac{2+x}{1+(2+x)^5} \\, dx\\)\n(iii) \\(\\int_2^6 \\frac{x}{1+x^5} \\, dx\\)",
    "options": [
      "(ii)",
      "None of the other choices is correct",
      "(iii)",
      "(i)",
      "(iv)"
    ],
    "answer": "C",
    "answer_original": "C",
    "answer_status": "verified",
    "explanation": [
      "**Bước 1:** Xét cấu trúc tổng Riemann \\[\\lim_{n \\to \\infty} \\sum_{i=1}^n f(x_i^*) \\Delta x = \\int_a^b f(x) \\, dx.\\]",
      "**Bước 2:** Nhận diện các thành phần trong biểu thức:\n- Độ rộng mỗi khoảng con: \\(\\Delta x = \\dfrac{4}{n} = \\dfrac{b - a}{n} \\implies b - a = 4\\).\n- Điểm mẫu: \\(x_i = a + i \\Delta x = 2 + \\dfrac{4i}{n} \\implies a = 2\\).\n- Cận trên: \\(b = a + 4 = 2 + 4 = 6\\).",
      "**Bước 3:** Xác định hàm dưới dấu tích phân: khi thay \\(x_i = 2 + 4i/n\\) bằng biến liên tục \\(x\\), biểu thức trở thành:\n\\[f(x) = \\dfrac{x}{1 + x^5}.\\]",
      "**Bước 4:** Do đó, giới hạn tổng Riemann biểu diễn tích phân xác định:\n\\[\\int_2^6 \\dfrac{x}{1 + x^5} \\, dx.\\]",
      "**Kết luận:** Tích phân tương ứng là (iii), tương ứng với lựa chọn C."
    ],
    "image": "0096_q096_Question_96.png",
    "needs_image": false,
    "review_flags": [],
    "confidence": "high"
  },
  getFromTest20(97),
  {
    "id": 98,
    "chapter": "DSTT1 - Đại số tuyến tính 1",
    "folder": "DSTT1",
    "topic": "HinhHocGiaiTich",
    "type": "single_choice",
    "question": "Assume that the set \\[\\{[1, 0, 1], [-2, 1, 2], [1, a, b]\\}\\] is orthogonal. Find \\(a\\).",
    "options": [
      "1",
      "2",
      "3",
      "4",
      "None of the other choices is correct"
    ],
    "answer": "D",
    "answer_original": "D",
    "answer_status": "verified",
    "explanation": [
      "**Bước 1:** Gọi ba vector lần lượt là \\(v_1 = [1, 0, 1]^T\\), \\(v_2 = [-2, 1, 2]^T\\), \\(v_3 = [1, a, b]^T\\). Tập hợp là trực giao nếu tích vô hướng giữa hai vector bất kỳ đôi một bằng 0.",
      "**Bước 2:** Thiết lập điều kiện trực giao giữa \\(v_3\\) với \\(v_1\\):\n\\[v_3 \\cdot v_1 = 0 \\iff 1(1) + a(0) + b(1) = 0 \\iff 1 + b = 0 \\implies b = -1.\\]",
      "**Bước 3:** Thiết lập điều kiện trực giao giữa \\(v_3\\) với \\(v_2\\):\n\\[v_3 \\cdot v_2 = 0 \\iff 1(-2) + a(1) + b(2) = 0 \\iff -2 + a + 2b = 0.\\]",
      "**Bước 4:** Thay \\(b = -1\\) vào phương trình trên:\n\\[-2 + a + 2(-1) = 0 \\iff a - 4 = 0 \\implies a = 4.\\]",
      "**Kết luận:** Giá trị của \\(a\\) là 4, tương ứng với lựa chọn D."
    ],
    "image": "0098_q098_Question_98.png",
    "needs_image": false,
    "review_flags": [],
    "confidence": "high"
  },
  {
    "id": 99,
    "chapter": "GT1 - Giải tích 1",
    "folder": "GT1",
    "topic": "DaoHam",
    "type": "single_choice",
    "question": "Two sides of a triangle are 3 m and 4 m in length and the angle between them is increasing at a rate of 0.02 rad/s. Find the rate at which the area of the triangle is increasing when the angle between the sides is \\(\\frac{\\pi}{3}\\).",
    "options": [
      "0.06",
      "None of the others",
      "0.12",
      "0.02",
      "0.006"
    ],
    "answer": "A",
    "answer_original": "A",
    "answer_status": "verified",
    "explanation": [
      "**Bước 1:** Công thức tính diện tích tam giác theo hai cạnh \\(a, b\\) và góc kẹp giữa \\(\\theta\\) là:\n\\[A = \\dfrac{1}{2} a b \\sin(\\theta).\\]",
      "**Bước 2:** Với \\(a = 3\\text{ m}\\) và \\(b = 4\\text{ m}\\) không đổi:\n\\[A(\\theta) = \\dfrac{1}{2}(3)(4) \\sin(\\theta) = 6 \\sin(\\theta).\\]",
      "**Bước 3:** Lấy đạo hàm hai vế theo thời gian \\(t\\) (bài toán tỉ số liên quan - related rates):\n\\[\\dfrac{dA}{dt} = 6 \\cos(\\theta) \\cdot \\dfrac{d\\theta}{dt}.\\]",
      "**Bước 4:** Thay các giá trị \\(\\theta = \\dfrac{\\pi}{3}\\) và \\(\\dfrac{d\\theta}{dt} = 0.02\\text{ rad/s}\\):\n\\[\\dfrac{dA}{dt} = 6 \\cos\\left(\\dfrac{\\pi}{3}\\right) \\cdot 0.02 = 6 \\cdot \\dfrac{1}{2} \\cdot 0.02 = 3 \\cdot 0.02 = 0.06\\text{ m}^2/\\text{s}.\\]",
      "**Kết luận:** Tốc độ tăng diện tích tam giác là 0.06, tương ứng với lựa chọn A."
    ],
    "image": "0099_q099_Question_99.png",
    "needs_image": false,
    "review_flags": [],
    "confidence": "high"
  },
  getFromTest20(100),
  {
    "id": 101,
    "chapter": "GT1 - Giải tích 1",
    "folder": "GT1",
    "topic": "DaoHam",
    "type": "single_choice",
    "question": "Find differential of \\[y = x^2 \\cos 2x\\]\n(i) \\(dy = 2x(\\cos 2x - x \\sin 2x)dx\\)\n(ii) \\(dy = x(\\cos 2x - 2x \\sin 2x)dx\\)\n(iii) \\(dy = 2x(\\cos 2x + x \\sin 2x)dx\\)\n(iv) \\(dy = x(2 \\cos 2x - x \\sin 2x)dx\\)",
    "options": [
      "(iii)",
      "(iv)",
      "None of the other choices is correct",
      "(ii)",
      "(i)"
    ],
    "answer": "E",
    "answer_original": "E",
    "answer_status": "verified",
    "explanation": [
      "**Bước 1:** Vi phân của hàm số \\(y = f(x)\\) được xác định bởi \\(dy = f'(x) dx\\).",
      "**Bước 2:** Tính đạo hàm của \\(y = x^2 \\cos 2x\\) bằng quy tắc nhân:\n\\[y' = (x^2)' \\cos 2x + x^2 (\\cos 2x)' = 2x \\cos 2x + x^2 (-2\\sin 2x) = 2x \\cos 2x - 2x^2 \\sin 2x.\\]",
      "**Bước 3:** Đặt nhân tử chung \\(2x\\) ra ngoài:\n\\[y' = 2x(\\cos 2x - x \\sin 2x).\\]",
      "**Bước 4:** Viết biểu thức vi phân:\n\\[dy = 2x(\\cos 2x - x \\sin 2x) dx.\\]",
      "**Kết luận:** Kết quả khớp với (i), tương ứng với lựa chọn E."
    ],
    "image": "0101_q101_Question_101.png",
    "needs_image": false,
    "review_flags": [],
    "confidence": "high"
  },
  {
    "id": 102,
    "chapter": "DSTT1 - Đại số tuyến tính 1",
    "folder": "DSTT1",
    "topic": "KhongGianVectơ",
    "type": "single_choice",
    "question": "Let \\(X = (-1, -3, 3)\\) and \\(U = \\operatorname{span}\\{Y = (1, 0, 3), Z = (1, 1, 1)\\}\\). If \\(X\\) is in \\(U\\), write \\(X = aY + bZ\\), then find \\(a + b\\).",
    "options": [
      "\\(X\\) is not in \\(U\\)",
      "\\(a + b = -1\\)",
      "\\(a + b = 4\\)",
      "\\(a + b = 0\\)",
      "None of the other choices is correct"
    ],
    "answer": "B",
    "answer_original": "B",
    "answer_status": "verified",
    "explanation": [
      "**Bước 1:** Giả sử \\(X \\in U\\), tức là tồn tại các số thực \\(a, b\\) sao cho:\n\\[X = aY + bZ \\iff (-1, -3, 3) = a(1, 0, 3) + b(1, 1, 1).\\]",
      "**Bước 2:** Viết hệ phương trình theo từng thành phần:\n\\[\\begin{cases} a + b = -1 \\\\ b = -3 \\\\ 3a + b = 3 \\end{cases}\\]",
      "**Bước 3:** Từ phương trình 2: \\(b = -3\\).\nTừ phương trình 1: \\(a + (-3) = -1 \\implies a = 2\\).\nKiểm tra lại với phương trình 3: \\(3(2) + (-3) = 6 - 3 = 3\\) (thỏa mãn).",
      "**Bước 4:** Tính tổng \\(a + b\\):\n\\[a + b = 2 + (-3) = -1.\\]",
      "**Kết luận:** Giá trị \\(a + b = -1\\), tương ứng với lựa chọn B."
    ],
    "image": "0102_q102_Question_102.png",
    "needs_image": false,
    "review_flags": [],
    "confidence": "high"
  },
  {
    "id": 103,
    "chapter": "GT1 - Giải tích 1",
    "folder": "GT1",
    "topic": "DaoHam",
    "type": "single_choice",
    "question": "Find \\(\\dfrac{dy}{dx}\\) when \\[y^5 + x^2 y^3 = 1 + y e^{x^2}\\]\n(i) \\(\\dfrac{2xy e^{x^2} - 2xy^3}{5y^4 + 3x^2 y^2 - e^{x^2}}\\)\n(ii) \\(\\dfrac{2xy e^{x^2}}{5y^4 + 3x^2 y^2 - e^{x^2}}\\)\n(iii) \\(\\dfrac{-2xy^3}{5y^4 + 3x^2 y^2 - e^{x^2}}\\)",
    "options": [
      "(i)",
      "(iii)",
      "(iv)",
      "None of the other choices is correct",
      "(ii)"
    ],
    "answer": "A",
    "answer_original": "A",
    "answer_status": "verified",
    "explanation": [
      "**Bước 1:** Lấy đạo hàm hai vế theo biến \\(x\\) (đạo hàm hàm ẩn - implicit differentiation):\n\\[\\dfrac{d}{dx}\\left(y^5 + x^2 y^3\\right) = \\dfrac{d}{dx}\\left(1 + y e^{x^2}\\right).\\]",
      "**Bước 2:** Tính đạo hàm từng vế:\n- Vế trái: \\(5y^4 y' + 2x y^3 + x^2 (3y^2 y') = (5y^4 + 3x^2 y^2)y' + 2xy^3\\).\n- Vế phải: \\(0 + y' e^{x^2} + y e^{x^2} (2x) = y' e^{x^2} + 2xy e^{x^2}\\).",
      "**Bước 3:** Chuyển các số hạng chứa \\(y'\\) về một vế và đặt nhân tử chung:\n\\[(5y^4 + 3x^2 y^2 - e^{x^2})y' = 2xy e^{x^2} - 2xy^3.\\]",
      "**Bước 4:** Rút ra \\(y' = \\dfrac{dy}{dx}\\):\n\\[\\dfrac{dy}{dx} = \\dfrac{2xy e^{x^2} - 2xy^3}{5y^4 + 3x^2 y^2 - e^{x^2}}.\\]",
      "**Kết luận:** Biểu thức đúng là (i), tương ứng với lựa chọn A. (Lưu ý: câu được phân loại lại từ Phương trình vi phân sang GT1 - Đạo hàm)."
    ],
    "image": "0103_q103_Question_103.png",
    "needs_image": false,
    "review_flags": [
      "reclassified_from_phuongtrinhvipan_to_gt1_daoham"
    ],
    "confidence": "high"
  },
  {
    "id": 104,
    "chapter": "DSTT1 - Đại số tuyến tính 1",
    "folder": "DSTT1",
    "topic": "KhongGianVectơ",
    "type": "single_choice",
    "question": "Let \\(u_1 = \\begin{bmatrix} 1 \\\\ 1 \\\\ 0 \\end{bmatrix}\\), \\(u_2 = \\begin{bmatrix} -2 \\\\ 0 \\\\ 1 \\end{bmatrix}\\), \\(u_3 = \\begin{bmatrix} 0 \\\\ 2 \\\\ 1 \\end{bmatrix}\\). Find \\(a, b, c \\in \\mathbb{R}\\) such \\[\\begin{bmatrix} 3 \\\\ 1 \\\\ -1 \\end{bmatrix} = a u_1 + b u_2 + c u_3.\\]",
    "options": [
      "\\(a = -1, b = 2, c = -1\\)",
      "None of the other choices is correct",
      "\\(a = 1, b = 2, c = 1\\)",
      "\\(a = -1, b = -2, c = 1\\)"
    ],
    "answer": "D",
    "answer_original": "D",
    "answer_status": "verified",
    "explanation": [
      "**Bước 1:** Khai triển phương trình vector thành hệ phương trình tuyến tính:\n\\[a \\begin{bmatrix} 1 \\\\ 1 \\\\ 0 \\end{bmatrix} + b \\begin{bmatrix} -2 \\\\ 0 \\\\ 1 \\end{bmatrix} + c \\begin{bmatrix} 0 \\\\ 2 \\\\ 1 \\end{bmatrix} = \\begin{bmatrix} 3 \\\\ 1 \\\\ -1 \\end{bmatrix}.\\]",
      "**Bước 2:** Hệ phương trình tương ứng:\n\\[\\begin{cases} a - 2b = 3 & (1) \\\\ a + 2c = 1 & (2) \\\\ b + c = -1 & (3) \\end{cases}\\]",
      "**Bước 3:** Giải hệ bằng phương pháp thế: từ (3) suy ra \\(c = -1 - b\\). Thay vào (2):\n\\[a + 2(-1 - b) = 1 \\iff a - 2b - 2 = 1 \\iff a - 2b = 3.\\]\nPhương trình này trùng với (1), nghĩa là hệ có nghiệm.\nKiểm tra phương án D với \\(a = -1, b = -2, c = 1\\):\n- Phương trình (1): \\(-1 - 2(-2) = -1 + 4 = 3\\) (đúng)\n- Phương trình (2): \\(-1 + 2(1) = 1\\) (đúng)\n- Phương trình (3): \\(-2 + 1 = -1\\) (đúng)",
      "**Kết luận:** Bộ nghiệm đúng là \\(a = -1, b = -2, c = 1\\), tương ứng với lựa chọn D."
    ],
    "image": "0104_q104_Question_104.png",
    "needs_image": false,
    "review_flags": [],
    "confidence": "high"
  },
  {
    "id": 105,
    "chapter": "GT1 - Giải tích 1",
    "folder": "GT1",
    "topic": "KhaoSatHamSo",
    "type": "single_choice",
    "question": "Find points of inflection of \\[f(x) = (x + 1)^4 + x\\]",
    "options": [
      "\\((0, 1)\\)",
      "None of the other choices is correct",
      "\\((-1, 1)\\)",
      "No points of inflection",
      "\\((-1, -1)\\)"
    ],
    "answer": "D",
    "answer_original": "D",
    "answer_status": "verified",
    "explanation": [
      "**Bước 1:** Điểm uốn là điểm mà tại đó đường cong liên tục đổi hướng bề lõm (tức đạo hàm cấp hai \\(f''(x)\\) đổi dấu).",
      "**Bước 2:** Tính đạo hàm cấp một và cấp hai:\n\\[f'(x) = 4(x + 1)^3 + 1,\\]\n\\[f''(x) = 12(x + 1)^2.\\]",
      "**Bước 3:** Xét dấu của \\(f''(x)\\):\nTa thấy \\(12(x + 1)^2 \\ge 0\\) với mọi \\(x \\in \\mathbb{R}\\).\nPhương trình \\(f''(x) = 0\\) có nghiệm \\(x = -1\\), tuy nhiên \\(f''(x)\\) luôn không âm trên cả hai phía của \\(x = -1\\) (không đổi dấu, đồ thị luôn lõm lên trên).",
      "**Kết luận:** Hàm số không có điểm uốn nào, tương ứng với lựa chọn D."
    ],
    "image": "0105_q105_Question_105.png",
    "needs_image": false,
    "review_flags": [],
    "confidence": "high"
  },
  {
    "id": 106,
    "chapter": "DSTT1 - Đại số tuyến tính 1",
    "folder": "DSTT1",
    "topic": "MaTran",
    "type": "single_choice",
    "question": "Let \\[A = \\begin{bmatrix} a & b & c \\\\ d & e & f \\\\ g & h & i \\end{bmatrix}.\\] Find the (3, 1)-entry of the adjugate of A.",
    "options": [
      "\\(dh - eg\\)",
      "\\(eg - dh\\)",
      "\\(bf - ce\\)",
      "\\(cd - bf\\)"
    ],
    "answer": "A",
    "answer_original": "A",
    "answer_status": "verified",
    "explanation": [
      "**Bước 1:** Định nghĩa ma trận phụ hợp (adjugate matrix): \\(\\operatorname{adj}(A) = C^T\\), trong đó \\(C\\) là ma trận các phần phụ đại số (cofactor matrix).",
      "**Bước 2:** Theo công thức chuyển vị, phần tử ở hàng 3, cột 1 của \\(\\operatorname{adj}(A)\\) là phần phụ đại số \\(C_{1, 3}\\) của phần tử ở hàng 1, cột 3 của \\(A\\):\n\\[(\\operatorname{adj}(A))_{3, 1} = C_{1, 3}.\\]",
      "**Bước 3:** Tính phần phụ đại số \\(C_{1, 3}\\):\n\\[C_{1, 3} = (-1)^{1 + 3} M_{1, 3} = (+1) \\cdot \\det \\begin{bmatrix} d & e \\\\ g & h \\end{bmatrix} = dh - eg.\\]",
      "**Kết luận:** Phần tử cần tìm là \\(dh - eg\\), tương ứng với lựa chọn A."
    ],
    "image": "0106_q106_Question_106.png",
    "needs_image": false,
    "review_flags": [],
    "confidence": "high"
  },
  {
    "id": 107,
    "chapter": "DSTT2 - Đại số tuyến tính 2",
    "folder": "DSTT2",
    "topic": "AnhXaTuyenTinh",
    "type": "single_choice",
    "question": "Let \\(T : \\mathbb{R}^3 \\to \\mathbb{R}^2\\) be a linear transformation such that \\(T(1, 1, 1) = (0, 1)\\), \\(T(1, 1, 0) = (1, 0)\\) and \\(T(1, 0, 0) = (1, 1)\\). Find \\(T(3, 2, 1)\\).",
    "options": [
      "\\((2, 2)\\)",
      "\\((1, 1)\\)",
      "\\((2, 1)\\)",
      "\\((1, 2)\\)",
      "None of the other choices is correct"
    ],
    "answer": "A",
    "answer_original": "A",
    "answer_status": "verified",
    "explanation": [
      "**Bước 1:** Phân tích vector \\((3, 2, 1)\\) thành tổ hợp tuyến tính của các vector đã biết ảnh:\n\\[(3, 2, 1) = c_1(1, 1, 1) + c_2(1, 1, 0) + c_3(1, 0, 0).\\]",
      "**Bước 2:** So sánh từng thành phần:\n- Thành phần thứ 3: \\(c_1 = 1\\).\n- Thành phần thứ 2: \\(c_1 + c_2 = 2 \\implies 1 + c_2 = 2 \\implies c_2 = 1\\).\n- Thành phần thứ 1: \\(c_1 + c_2 + c_3 = 3 \\implies 1 + 1 + c_3 = 3 \\implies c_3 = 1\\).\nNhư vậy: \\((3, 2, 1) = 1 \\cdot (1, 1, 1) + 1 \\cdot (1, 1, 0) + 1 \\cdot (1, 0, 0)\\).",
      "**Bước 3:** Sử dụng tính chất tuyến tính của ánh xạ \\(T\\):\n\\[T(3, 2, 1) = T(1, 1, 1) + T(1, 1, 0) + T(1, 0, 0) = (0, 1) + (1, 0) + (1, 1) = (2, 2).\\]",
      "**Kết luận:** Giá trị của \\(T(3, 2, 1)\\) là \\((2, 2)\\), tương ứng với lựa chọn A."
    ],
    "image": "0107_q107_Question_107.png",
    "needs_image": false,
    "review_flags": [],
    "confidence": "high"
  },
  {
    "id": 108,
    "chapter": "GT1 - Giải tích 1",
    "folder": "GT1",
    "topic": "HamSo",
    "type": "single_choice",
    "question": "Describe how the graph of \\[y = f(x - 2) + 3\\] is obtained from the graph of \\(y = f(x)\\).",
    "options": [
      "Shift 2 units to the right then shift 3 units up.",
      "Shift 2 units to the left then shift 3 units up.",
      "Shift 2 units to the right then shift 3 units down.",
      "Shift 2 units to the left then shift 3 units down",
      "None of the other choices is correct"
    ],
    "answer": "A",
    "answer_original": "A",
    "answer_status": "verified",
    "explanation": [
      "**Bước 1:** Phép biến đổi \\(f(x) \\to f(x - 2)\\) tịnh tiến đồ thị sang bên phải 2 đơn vị (horizontal shift right by 2 units).",
      "**Bước 2:** Phép biến đổi \\(f(x - 2) \\to f(x - 2) + 3\\) tịnh tiến đồ thị lên trên 3 đơn vị (vertical shift up by 3 units).",
      "**Kết luận:** Quy trình đúng là: 'Shift 2 units to the right then shift 3 units up', tương ứng với lựa chọn A."
    ],
    "image": "0108_q108_Question_108.png",
    "needs_image": false,
    "review_flags": [],
    "confidence": "high"
  },
  {
    "id": 109,
    "chapter": "GT1 - Giải tích 1",
    "folder": "GT1",
    "topic": "KhaoSatHamSo",
    "type": "single_choice",
    "question": "Find the critical numbers of the function \\[y = \\frac{x^5}{5} - \\frac{2x^3}{3} - 3x + 2\\]\n(i) \\(-1; 1\\)\n(ii) \\(-1; -\\sqrt{3}\\)\n(iii) \\(\\sqrt{3}; 1\\)\n(iv) \\(\\sqrt{3}; -\\sqrt{3}\\)",
    "options": [
      "None of the other choices is correct",
      "(i)",
      "(iv)",
      "(ii)",
      "(iii)"
    ],
    "answer": "C",
    "answer_original": "C",
    "answer_status": "verified",
    "explanation": [
      "**Bước 1:** Điểm tới hạn (critical numbers) là các giá trị của \\(x\\) trong tập xác định tại đó \\(y' = 0\\) hoặc \\(y'\\) không tồn tại.",
      "**Bước 2:** Tính đạo hàm \\(y'\\):\n\\[y' = \\dfrac{5x^4}{5} - \\dfrac{2(3x^2)}{3} - 3 = x^4 - 2x^2 - 3.\\]",
      "**Bước 3:** Giải phương trình \\(y' = 0\\):\n\\[x^4 - 2x^2 - 3 = 0 \\iff (x^2 - 3)(x^2 + 1) = 0.\\]",
      "**Bước 4:** Do \\(x^2 + 1 > 0\\) với mọi \\(x \\in \\mathbb{R}\\), ta có:\n\\[x^2 - 3 = 0 \\iff x^2 = 3 \\iff x = \\pm \\sqrt{3}.\\]",
      "**Kết luận:** Các điểm tới hạn là \\(\\sqrt{3}; -\\sqrt{3}\\), khớp với (iv), tương ứng với lựa chọn C."
    ],
    "image": "0109_q109_Question_109.png",
    "needs_image": false,
    "review_flags": [],
    "confidence": "high"
  },
  {
    "id": 110,
    "chapter": "DSTT1 - Đại số tuyến tính 1",
    "folder": "DSTT1",
    "topic": "HinhHocGiaiTich",
    "type": "single_choice",
    "question": "Which of the following vectors is perpendicular to the plane passing through the points \\((-7, 10, 0)\\), \\((4, 1, 6)\\) and \\((2, -1, 3)\\) ?",
    "options": [
      "None of the other choices is correct",
      "\\((-39; 21; 40)\\)",
      "\\((-12; 33; 22)\\)",
      "\\((12; 33; 22)\\)",
      "\\((39; 21; -40)\\)"
    ],
    "answer": "E",
    "answer_original": "D",
    "answer_status": "conflict",
    "explanation": [
      "**Bước 1:** Đặt ba điểm \\(P(-7, 10, 0)\\), \\(Q(4, 1, 6)\\), \\(R(2, -1, 3)\\). Tìm hai vector nằm trong mặt phẳng:\n\\[\\vec{PQ} = (4 - (-7), 1 - 10, 6 - 0) = (11, -9, 6),\\]\n\\[\\vec{PR} = (2 - (-7), -1 - 10, 3 - 0) = (9, -11, 3).\\]",
      "**Bước 2:** Vector pháp tuyến của mặt phẳng vuông góc với cả hai vector \\(\\vec{PQ}\\) và \\(\\vec{PR}\\), được tính bằng tích có hướng:\n\\[\\vec{n} = \\vec{PQ} \\times \\vec{PR} = \\begin{vmatrix} \\mathbf{i} & \\mathbf{j} & \\mathbf{k} \\\\ 11 & -9 & 6 \\\\ 9 & -11 & 3 \\end{vmatrix}.\\]",
      "**Bước 3:** Khai triển định thức:\n- Thành phần \\(x\\): \\((-9)(3) - (6)(-11) = -27 + 66 = 39\\).\n- Thành phần \\(y\\): \\(-[(11)(3) - (6)(9)] = -(33 - 54) = 21\\).\n- Thành phần \\(z\\): \\((11)(-11) - (-9)(9) = -121 + 81 = -40\\).\nDo đó \\(\\vec{n} = (39, 21, -40)\\).",
      "**Bước 4:** Kiểm tra tích vô hướng:\n- \\((39, 21, -40) \\cdot (11, -9, 6) = 429 - 189 - 240 = 0\\).\n- \\((39, 21, -40) \\cdot (9, -11, 3) = 351 - 231 - 120 = 0\\).\nVector \\((39, 21, -40)\\) hoàn toàn trực giao với mặt phẳng.",
      "**Ghi chú đối chiếu:** Đáp án gốc trong ngân hàng là D \\((12; 33; 22)\\). Thử tích vô hướng: \\(12(11) + 33(-9) + 22(6) = 132 - 297 + 132 = -33 \\ne 0\\), hoàn toàn không vuông góc. Đáp án chính xác toán học là E \\((39; 21; -40)\\)."
    ],
    "image": "0110_q110_Question_110.png",
    "needs_image": false,
    "review_flags": [
      "conflict_with_original_key: key says D (12; 33; 22), mathematically correct is E (39; 21; -40)"
    ],
    "confidence": "high"
  },
  {
    "id": 111,
    "chapter": "DSTT1 - Đại số tuyến tính 1",
    "folder": "DSTT1",
    "topic": "HePhuongTrinh",
    "type": "single_choice",
    "question": "Consider a homogeneous system of 3 linear equations in 5 variables. Assume that the augmented matrix has rank 2. Choose correct statements.",
    "options": [
      "There are exactly 2 parameters",
      "The system has no solution",
      "There are exactly 3 parameters",
      "None of the other choices is correct",
      "The system has only the trivial solution"
    ],
    "answer": "C",
    "answer_original": "C",
    "answer_status": "verified",
    "explanation": [
      "**Bước 1:** Hệ thuần nhất \\(Ax = 0\\) luôn luôn có nghiệm (ít nhất là nghiệm tầm thường \\(x = 0\\)), nên không bao giờ vô nghiệm.",
      "**Bước 2:** Số ẩn của hệ phương trình là \\(n = 5\\).",
      "**Bước 3:** Hạng của ma trận hệ số bằng hạng của ma trận bổ sung: \\(\\operatorname{rank}(A) = 2\\).",
      "**Bước 4:** Số tham số tự do (parameters) trong họ nghiệm tổng quát bằng số ẩn trừ đi hạng:\n\\[\\text{Số tham số} = n - \\operatorname{rank}(A) = 5 - 2 = 3.\\]",
      "**Kết luận:** Hệ có đúng 3 tham số ('There are exactly 3 parameters'), tương ứng với lựa chọn C. (Lưu ý: câu được phân loại lại từ Phương trình vi phân sang DSTT1 - Hệ phương trình)."
    ],
    "image": "0111_q111_Question_111.png",
    "needs_image": false,
    "review_flags": [
      "reclassified_from_phuongtrinhvipan_to_dstt1_hephuongtrinh"
    ],
    "confidence": "high"
  },
  getFromTest20(112),
  {
    "id": 113,
    "chapter": "GT1 - Giải tích 1",
    "folder": "GT1",
    "topic": "TichPhan",
    "type": "single_choice",
    "question": "Evaluate \\[\\int x^7 (x^8 - 5)^4 \\, dx\\]\n(i) \\((40)(x^8 - 5)^5 + C\\)\n(ii) \\((1/4)(x^8 - 5)^5 + C\\)\n(iii) \\((1/40)(x^8 - 5)^5 + C\\)\n(iv) \\((1/40)x^8(x^8 - 5)^5 + C\\)",
    "options": [
      "(ii)",
      "None of the other choices is correct",
      "(i)",
      "(iii)",
      "(iv)"
    ],
    "answer": "D",
    "answer_original": "D",
    "answer_status": "verified",
    "explanation": [
      "**Bước 1:** Áp dụng phương pháp đổi biến số (u-substitution). Đặt \\(u = x^8 - 5\\).",
      "**Bước 2:** Lấy vi phân hai vế: \\[du = 8x^7 \\, dx \\implies x^7 \\, dx = \\dfrac{1}{8} \\, du.\\]",
      "**Bước 3:** Thay vào tích phân ban đầu:\n\\[\\int x^7 (x^8 - 5)^4 \\, dx = \\int u^4 \\cdot \\dfrac{1}{8} \\, du = \\dfrac{1}{8} \\int u^4 \\, du = \\dfrac{1}{8} \\cdot \\dfrac{u^5}{5} + C = \\dfrac{1}{40} u^5 + C.\\]",
      "**Bước 4:** Trả về biến \\(x\\):\n\\[\\dfrac{1}{40} (x^8 - 5)^5 + C.\\]",
      "**Kết luận:** Biểu thức đúng là (iii), tương ứng với lựa chọn D."
    ],
    "image": "0113_q113_Question_113.png",
    "needs_image": false,
    "review_flags": [],
    "confidence": "high"
  },
  {
    "id": 114,
    "chapter": "GT1 - Giải tích 1",
    "folder": "GT1",
    "topic": "DaoHam",
    "type": "single_choice",
    "question": "Find an equation for the line tangent to the graph of the function \\[f(x) = \\frac{48}{x}\\] at \\((2, 24)\\)",
    "options": [
      "\\(y = 24x - 12\\)",
      "\\(y = -12x + 48\\)",
      "None of the other choices is correct",
      "\\(y = -12x + 4\\)",
      "\\(y = 12x - 48\\)"
    ],
    "answer": "B",
    "answer_original": "B",
    "answer_status": "verified",
    "explanation": [
      "**Bước 1:** Viết lại hàm số: \\(f(x) = 48 x^{-1}\\).",
      "**Bước 2:** Tính đạo hàm:\n\\[f'(x) = -48 x^{-2} = -\\dfrac{48}{x^2}.\\]",
      "**Bước 3:** Hệ số góc của tiếp tuyến tại \\(x = 2\\) là:\n\\[k = f'(2) = -\\dfrac{48}{2^2} = -\\dfrac{48}{4} = -12.\\]",
      "**Bước 4:** Phương trình tiếp tuyến tại điểm \\((2, 24)\\):\n\\[y - 24 = -12(x - 2) \\iff y = -12x + 24 + 24 \\iff y = -12x + 48.\\]",
      "**Kết luận:** Phương trình tiếp tuyến là \\(y = -12x + 48\\), tương ứng với lựa chọn B."
    ],
    "image": "0114_q114_Question_114.png",
    "needs_image": false,
    "review_flags": [],
    "confidence": "high"
  },
  {
    "id": 115,
    "chapter": "DSTT1 - Đại số tuyến tính 1",
    "folder": "DSTT1",
    "topic": "MaTran",
    "type": "single_choice",
    "question": "Find \\(A^T A - (A A^T)I_3\\) if \\(A = \\begin{bmatrix} 1 & 1 & 1 \\end{bmatrix}\\)\n(i) \\(\\begin{bmatrix} -2 & -2 & -2 \\\\ -2 & -2 & -2 \\\\ -2 & -2 & -2 \\end{bmatrix}\\)\n(ii) \\(\\begin{bmatrix} 1 & 1 & 1 \\\\ 1 & 1 & 1 \\\\ 1 & 1 & 1 \\end{bmatrix}\\)\n(iii) \\(\\begin{bmatrix} -2 & 1 & 1 \\\\ 1 & -2 & 1 \\\\ 1 & 1 & -2 \\end{bmatrix}\\)\n(iv) \\(\\begin{bmatrix} 0 & 0 & 0 \\\\ 0 & 0 & 0 \\\\ 0 & 0 & 0 \\end{bmatrix}\\)",
    "options": [
      "(iii)",
      "(ii)",
      "None of the other choices is correct",
      "(i)",
      "(iv)"
    ],
    "answer": "A",
    "answer_original": "A",
    "answer_status": "verified",
    "explanation": [
      "**Bước 1:** Xác định kích thước các ma trận. \\(A\\) có kích thước \\(1 \\times 3\\), do đó \\(A^T\\) có kích thước \\(3 \\times 1\\):\n\\[A^T = \\begin{bmatrix} 1 \\\\ 1 \\\\ 1 \\end{bmatrix}.\\]",
      "**Bước 2:** Tính tích \\(A^T A\\) (kích thước \\(3 \\times 3\\)):\n\\[A^T A = \\begin{bmatrix} 1 \\\\ 1 \\\\ 1 \\end{bmatrix} \\begin{bmatrix} 1 & 1 & 1 \\end{bmatrix} = \\begin{bmatrix} 1 & 1 & 1 \\\\ 1 & 1 & 1 \\\\ 1 & 1 & 1 \\end{bmatrix}.\\]",
      "**Bước 3:** Tính \\(A A^T\\) (kích thước \\(1 \\times 1\\), tương đương một số vô hướng):\n\\[A A^T = \\begin{bmatrix} 1 & 1 & 1 \\end{bmatrix} \\begin{bmatrix} 1 \\\\ 1 \\\\ 1 \\end{bmatrix} = 1(1) + 1(1) + 1(1) = 3.\\]",
      "**Bước 4:** Tính \\((A A^T) I_3 = 3 I_3 = \\begin{bmatrix} 3 & 0 & 0 \\\\ 0 & 3 & 0 \\\\ 0 & 0 & 3 \\end{bmatrix}\\).",
      "**Bước 5:** Thực hiện phép trừ:\n\\[A^T A - (A A^T)I_3 = \\begin{bmatrix} 1 & 1 & 1 \\\\ 1 & 1 & 1 \\\\ 1 & 1 & 1 \\end{bmatrix} - \\begin{bmatrix} 3 & 0 & 0 \\\\ 0 & 3 & 0 \\\\ 0 & 0 & 3 \\end{bmatrix} = \\begin{bmatrix} -2 & 1 & 1 \\\\ 1 & -2 & 1 \\\\ 1 & 1 & -2 \\end{bmatrix}.\\]",
      "**Kết luận:** Kết quả khớp với biểu thức (iii), tương ứng với lựa chọn A."
    ],
    "image": "0115_q115_Question_115.png",
    "needs_image": false,
    "review_flags": [],
    "confidence": "high"
  },
  {
    "id": 116,
    "chapter": "DSTT1 - Đại số tuyến tính 1",
    "folder": "DSTT1",
    "topic": "KhongGianVectơ",
    "type": "single_choice",
    "question": "Which of the following statements are true?\n(i) \\(\\mathbb{R}^2 = \\operatorname{span}\\{(1, 0), (0, 2)\\}\\)\n(ii) \\(\\mathbb{R}^3 = \\operatorname{span}\\{(1, 0, 0), (0, 1, 0), (1, 1, 0)\\}\\)",
    "options": [
      "Both (i) and (ii)",
      "Only (ii)",
      "None of (i) and (ii)",
      "Only (i)"
    ],
    "answer": "D",
    "answer_original": "D",
    "answer_status": "verified",
    "explanation": [
      "**Bước 1:** Xét khẳng định (i): Hai vector \\((1, 0)\\) và \\((0, 2)\\) rõ ràng độc lập tuyến tính trong \\(\\mathbb{R}^2\\). Vì số chiều của \\(\\mathbb{R}^2\\) là 2, hệ 2 vector độc lập tuyến tính tạo thành một cơ sở của \\(\\mathbb{R}^2\\). Do đó \\(\\operatorname{span}\\{(1, 0), (0, 2)\\} = \\mathbb{R}^2\\). Khẳng định (i) ĐÚNG.",
      "**Bước 2:** Xét khẳng định (ii): Cả ba vector \\((1, 0, 0)\\), \\((0, 1, 0)\\), \\((1, 1, 0)\\) đều có thành phần thứ ba (tọa độ z) bằng 0. Bất kỳ tổ hợp tuyến tính nào của chúng cũng có dạng \\((x, y, 0)\\), nằm hoàn toàn trong mặt phẳng xy chứ không thể bao quát toàn bộ không gian \\(\\mathbb{R}^3\\) (ví dụ vector \\((0, 0, 1) \\notin \\operatorname{span}\\)). Khẳng định (ii) SAI.",
      "**Kết luận:** Chỉ có mệnh đề (i) đúng ('Only (i)'), tương ứng với lựa chọn D."
    ],
    "image": "0116_q116_Question_116.png",
    "needs_image": false,
    "review_flags": [],
    "confidence": "high"
  },
  {
    "id": 117,
    "chapter": "DSTT2 - Đại số tuyến tính 2",
    "folder": "DSTT2",
    "topic": "TriRiengVectơRieng",
    "type": "single_choice",
    "question": "Given \\[A = \\begin{bmatrix} 2 & 4 & 3 \\\\ 4 & 1 & 2 \\\\ 1 & 0 & 4 \\end{bmatrix}, \\quad u = [2 \\quad -1 \\quad 2]^T \\quad \\text{and} \\quad v = [-1 \\quad -1 \\quad 1]^T.\\] Choose the correct statement.",
    "options": [
      "Both u and v are eigenvectors of A",
      "None of the other choices is correct",
      "v is an eigenvector of A",
      "u is an eigenvector of A"
    ],
    "answer": "C",
    "answer_original": "C",
    "answer_status": "verified",
    "explanation": [
      "**Bước 1:** Vector khác không \\(x\\) là vector riêng của ma trận \\(A\\) nếu tồn tại số vô hướng \\(\\lambda\\) sao cho \\(Ax = \\lambda x\\).",
      "**Bước 2:** Kiểm tra vector \\(u = \\begin{bmatrix} 2 \\\\ -1 \\\\ 2 \\end{bmatrix}\\):\n\\[Au = \\begin{bmatrix} 2 & 4 & 3 \\\\ 4 & 1 & 2 \\\\ 1 & 0 & 4 \\end{bmatrix} \\begin{bmatrix} 2 \\\\ -1 \\\\ 2 \\end{bmatrix} = \\begin{bmatrix} 4 - 4 + 6 \\\\ 8 - 1 + 4 \\\\ 2 + 0 + 8 \\end{bmatrix} = \\begin{bmatrix} 6 \\\\ 11 \\\\ 10 \\end{bmatrix}.\\]\nVector này không tỷ lệ với \\(u\\) vì \\(6/2 \\ne 11/(-1)\\). Vậy \\(u\\) không phải là vector riêng của \\(A\\).",
      "**Bước 3:** Kiểm tra vector \\(v = \\begin{bmatrix} -1 \\\\ -1 \\\\ 1 \\end{bmatrix}\\):\n\\[Av = \\begin{bmatrix} 2 & 4 & 3 \\\\ 4 & 1 & 2 \\\\ 1 & 0 & 4 \\end{bmatrix} \\begin{bmatrix} -1 \\\\ -1 \\\\ 1 \\end{bmatrix} = \\begin{bmatrix} -2 - 4 + 3 \\\\ -4 - 1 + 2 \\\\ -1 + 0 + 4 \\end{bmatrix} = \\begin{bmatrix} -3 \\\\ -3 \\\\ 3 \\end{bmatrix} = 3 \\begin{bmatrix} -1 \\\\ -1 \\\\ 1 \\end{bmatrix} = 3v.\\]\nVậy \\(v\\) là vector riêng của \\(A\\) ứng với giá trị riêng \\(\\lambda = 3\\).",
      "**Kết luận:** Chỉ có \\(v\\) là vector riêng của \\(A\\) ('v is an eigenvector of A'), tương ứng với lựa chọn C."
    ],
    "image": "0117_q117_Question_117.png",
    "needs_image": false,
    "review_flags": [],
    "confidence": "high"
  },
  {
    "id": 118,
    "chapter": "DSTT2 - Đại số tuyến tính 2",
    "folder": "DSTT2",
    "topic": "TriRiengVectơRieng",
    "type": "single_choice",
    "question": "Find all eigenvalues of the matrix \\[A = \\begin{bmatrix} 4 & 0 \\\\ 1 & 3 \\end{bmatrix}\\]",
    "options": [
      "none of the other choices is true",
      "2 and 4",
      "1 and 3",
      "3 and 4",
      "2 and 3"
    ],
    "answer": "D",
    "answer_original": "D",
    "answer_status": "verified",
    "explanation": [
      "**Bước 1:** Xét phương trình đặc trưng của ma trận \\(A\\): \\[\\det(A - \\lambda I) = 0.\\]",
      "**Bước 2:** Tính định thức:\n\\[\\det \\begin{bmatrix} 4 - \\lambda & 0 \\\\ 1 & 3 - \\lambda \\end{bmatrix} = (4 - \\lambda)(3 - \\lambda) - 0 \\cdot 1 = (4 - \\lambda)(3 - \\lambda).\\]\n(Chú ý: với ma trận tam giác dưới, các giá trị riêng chính là các phần tử nằm trên đường chéo chính).",
      "**Bước 3:** Giải phương trình đặc trưng: \\[(4 - \\lambda)(3 - \\lambda) = 0 \\iff \\lambda = 3 \\quad \\text{hoặc} \\quad \\lambda = 4.\\]",
      "**Kết luận:** Các giá trị riêng của ma trận là 3 và 4, tương ứng với lựa chọn D."
    ],
    "image": "0118_q118_Question_118.png",
    "needs_image": false,
    "review_flags": [],
    "confidence": "high"
  },
  {
    "id": 119,
    "chapter": "DSTT1 - Đại số tuyến tính 1",
    "folder": "DSTT1",
    "topic": "KhongGianVectơ",
    "type": "single_choice",
    "question": "If \\(\\{X, Y\\}\\) is independent, which of the following sets are independent?\n(i) \\(\\{2X, 4Y\\}\\)\n(ii) \\(\\{2X, X - 4Y\\}\\)\n(iii) \\(\\{2X - Y, 8X - 4Y\\}\\)",
    "options": [
      "(i) and (ii)",
      "(ii) and (iii)",
      "Only (ii)",
      "Only (i)",
      "None of the other choices is correct"
    ],
    "answer": "A",
    "answer_original": "A",
    "answer_status": "verified",
    "explanation": [
      "**Bước 1:** Vì tập \\(\\{X, Y\\}\\) độc lập tuyến tính, tính độc lập tuyến tính của hệ các tổ hợp tuyến tính phụ thuộc vào định thức của ma trận hệ số chuyển đổi.",
      "**Bước 2:** Xét tập (i) \\(\\{2X, 4Y\\}\\): Ma trận hệ số là \\(\\begin{bmatrix} 2 & 0 \\\\ 0 & 4 \\end{bmatrix}\\), có định thức bằng \\(2 \\cdot 4 = 8 \\ne 0\\). Do đó tập (i) độc lập tuyến tính.",
      "**Bước 3:** Xét tập (ii) \\(\\{2X, X - 4Y\\}\\): Ma trận hệ số là \\(\\begin{bmatrix} 2 & 0 \\\\ 1 & -4 \\end{bmatrix}\\), có định thức bằng \\(2(-4) - 0 = -8 \\ne 0\\). Do đó tập (ii) độc lập tuyến tính.",
      "**Bước 4:** Xét tập (iii) \\(\\{2X - Y, 8X - 4Y\\}\\): Nhận thấy vector thứ hai \\(8X - 4Y = 4(2X - Y)\\) là bội số của vector thứ nhất. Do đó tập (iii) phụ thuộc tuyến tính.",
      "**Kết luận:** Chỉ có các tập (i) và (ii) độc lập tuyến tính, tương ứng với lựa chọn A."
    ],
    "image": "0119_q119_Question_119.png",
    "needs_image": false,
    "review_flags": [],
    "confidence": "high"
  },
  {
    "id": 120,
    "chapter": "DSTT2 - Đại số tuyến tính 2",
    "folder": "DSTT2",
    "topic": "AnhXaTuyenTinh",
    "type": "single_choice",
    "question": "Let \\(T\\) be a linear transformation in the plane, \\[T[x, y] = \\frac{1}{2} [x - \\sqrt{3}y, \\sqrt{3}x + y]\\] Choose the correct statement.\n(i) \\(T\\) is projection on the line \\(y = \\sqrt{3}x\\)\n(ii) \\(T\\) is reflection in the line \\(y = -\\sqrt{3}x\\)\n(iii) \\(T\\) is rotation through \\(\\pi/3\\).",
    "options": [
      "(iii)",
      "(ii)",
      "None of the other choices is correct",
      "(i)"
    ],
    "answer": "A",
    "answer_original": "A",
    "answer_status": "verified",
    "explanation": [
      "**Bước 1:** Viết lại ánh xạ tuyến tính \\(T\\) dưới dạng ma trận chính tắc \\(A\\):\n\\[T\\begin{bmatrix} x \\\\ y \\end{bmatrix} = \\begin{bmatrix} \\frac{1}{2}x - \\frac{\\sqrt{3}}{2}y \\\\ \\frac{\\sqrt{3}}{2}x + \\frac{1}{2}y \\end{bmatrix} = \\begin{bmatrix} \\frac{1}{2} & -\\frac{\\sqrt{3}}{2} \\\\ \\frac{\\sqrt{3}}{2} & \\frac{1}{2} \\end{bmatrix} \\begin{bmatrix} x \\\\ y \\end{bmatrix}.\\]",
      "**Bước 2:** Nhớ lại dạng tổng quát của ma trận quay (rotation matrix) một góc \\(\\theta\\) ngược chiều kim đồng hồ trong mặt phẳng:\n\\[R_\\theta = \\begin{bmatrix} \\cos\\theta & -\\sin\\theta \\\\ \\sin\\theta & \\cos\\theta \\end{bmatrix}.\\]",
      "**Bước 3:** So sánh hai ma trận với \\(\\theta = \\pi/3\\) (hay \\(60^\\circ\\)):\n- \\(\\cos(\\pi/3) = \\frac{1}{2}\\)\n- \\(\\sin(\\pi/3) = \\frac{\\sqrt{3}}{2}\\)\nNhư vậy ma trận chính là \\(R_{\\pi/3}\\).",
      "**Kết luận:** Ánh xạ \\(T\\) là phép quay một góc \\(\\pi/3\\) ('rotation through \\(\\pi/3\\)'), ứng với mệnh đề (iii) và lựa chọn A."
    ],
    "image": "0120_q120_Question_120.png",
    "needs_image": false,
    "review_flags": [],
    "confidence": "high"
  }
];

const outPath = path.join(__dirname, '../data/v2/batches/batch_03.json');
fs.writeFileSync(outPath, JSON.stringify(batch03, null, 2), 'utf8');
console.log(`Successfully wrote ${batch03.length} questions to ${outPath}`);
