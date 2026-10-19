const fs = require('fs');
const path = require('path');

const batch29 = [
  {
    id: 1121,
    chapter: "Chapter 3: Derivatives",
    topic: "Xấp xỉ tuyến tính (Linearization)",
    folder: "GT1",
    type: "multiple_choice",
    question: "Find the linearization \\(L(x)\\) of \\(f(x) = \\sqrt[3]{x^2}\\) at \\(x = 8\\).",
    options: [
      "L(x) = x/3 + 4/3",
      "L(x) = x/3 + 1/3",
      "L(x) = x/3 - 4/3",
      "L(x) = -x/3 + 4/3",
      "L(x) = -x/3 + 1/3",
      "None of the other choices is correct"
    ],
    answer: "A",
    answer_original: "A",
    answer_status: "verified",
    confidence: "high",
    review_flags: [],
    needs_image: false,
    image: "assets/questions/1121_q1121_Question_1121.png",
    explanation: [
      "Viết lại hàm số dưới dạng lũy thừa: \\(f(x) = x^{2/3}\\).",
      "Tại \\(a = 8\\):",
      "\\[f(8) = 8^{2/3} = (\\sqrt[3]{8})^2 = 2^2 = 4\\]",
      "Tính đạo hàm bậc nhất của \\(f(x)\\):",
      "\\[f'(x) = \\frac{2}{3}x^{-1/3} = \\frac{2}{3\\sqrt[3]{x}}\\]",
      "\\[f'(8) = \\frac{2}{3\\sqrt[3]{8}} = \\frac{2}{3(2)} = \\frac{1}{3}\\]",
      "Công thức xấp xỉ tuyến tính tại \\(a = 8\\):",
      "\\[L(x) = f(8) + f'(8)(x - 8) = 4 + \\frac{1}{3}(x - 8) = \\frac{x}{3} + 4 - \\frac{8}{3} = \\frac{x}{3} + \\frac{4}{3}\\]",
      "Đáp án đúng là A."
    ]
  },
  {
    id: 1122,
    chapter: "Chapter 4: Applications of Differentiation",
    topic: "Khoảng lồi lõm của đồ thị hàm số",
    folder: "GT1",
    type: "multiple_choice",
    question: "Determine where the function\n\\[f(x) = (x + 3)^{2/3}\\]\nis concave up and where it is concave down.\n(i) Concave down on \\((-\\infty, -3)\\) and concave up on \\((-3, \\infty)\\)\n(ii) Concave down on \\((-\\infty, -3)\\) and \\((-3, \\infty)\\)\n(iii) Concave up on \\((-\\infty, -3)\\) and \\((-3, \\infty)\\)\n(iv) Concave up on \\((-\\infty, -3)\\) and concave down on \\((-3, \\infty)\\)",
    options: [
      "(i)",
      "(ii)",
      "(iii)",
      "(iv)",
      "None of the other choices is correct"
    ],
    answer: "B",
    answer_original: "B",
    answer_status: "verified",
    confidence: "high",
    review_flags: [],
    needs_image: false,
    image: "assets/questions/1122_q1122_Question_1122.png",
    explanation: [
      "Tính đạo hàm cấp 1 và cấp 2 của hàm số \\(f(x) = (x + 3)^{2/3}\\):",
      "\\[f'(x) = \\frac{2}{3}(x + 3)^{-1/3}\\]",
      "\\[f''(x) = \\frac{2}{3}\\left(-\\frac{1}{3}\\right)(x + 3)^{-4/3} = -\\frac{2}{9(x + 3)^{4/3}}\\]",
      "Nhận xét về dấu của \\(f''(x)\\):",
      "Với mọi \\(x \\ne -3\\), ta có \\((x + 3)^{4/3} = \\left((x + 3)^{1/3}\\right)^4 > 0\\).",
      "Do đó \\(f''(x) < 0\\) với mọi \\(x \\ne -3\\), tức là trên cả hai khoảng \\((-\\infty, -3)\\) và \\((-3, \\infty)\\).",
      "Vì vậy, hàm số lõm xuống (concave down) trên cả \\((-\\infty, -3)\\) và \\((-3, \\infty)\\).",
      "Khẳng định đúng là (ii), ứng với đáp án B."
    ]
  },
  {
    id: 1123,
    chapter: "Chapter 4: Applications of Differentiation",
    topic: "Phương pháp Newton tìm nghiệm",
    folder: "GT1",
    type: "multiple_choice",
    question: "Use Newton's method with the specified initial approximation \\(x_1\\) to find \\(x_3\\), the third approximation to the root of the given equation.\n\\[x^3 - 3x^2 + 1 = 0, \\quad x_1 = 3\\]\n(Give your answer to 4 decimal places)",
    options: [
      "2.8794",
      "2.9888",
      "1.8794",
      "1.1112",
      "1.1206",
      "None of the other choices is correct"
    ],
    answer: "A",
    answer_original: "A",
    answer_status: "verified",
    confidence: "high",
    review_flags: [],
    needs_image: false,
    image: "assets/questions/1123_q1123_Question_1123.png",
    explanation: [
      "Đặt \\(f(x) = x^3 - 3x^2 + 1\\), khi đó đạo hàm là \\(f'(x) = 3x^2 - 6x\\).",
      "Công thức lặp Newton: \\(x_{n+1} = x_n - \\frac{f(x_n)}{f'(x_n)}\\).",
      "1. Với \\(x_1 = 3\\):",
      "\\[f(3) = 3^3 - 3(3^2) + 1 = 1\\]",
      "\\[f'(3) = 3(3^2) - 6(3) = 27 - 18 = 9\\]",
      "\\[x_2 = 3 - \\frac{1}{9} = \\frac{26}{9} \\approx 2.888889\\]",
      "2. Tính giá trị tại \\(x_2 = \\frac{26}{9}\\):",
      "\\[f(26/9) = \\left(\\frac{26}{9}\\right)^3 - 3\\left(\\frac{26}{9}\\right)^2 + 1 = \\frac{17576}{729} - \\frac{18252}{729} + \\frac{729}{729} = \\frac{53}{729} \\approx 0.072702\\]",
      "\\[f'(26/9) = 3\\left(\\frac{26}{9}\\right)^2 - 6\\left(\\frac{26}{9}\\right) = \\frac{2028}{81} - \\frac{1404}{81} = \\frac{624}{81} = \\frac{208}{27} \\approx 7.703704\\]",
      "\\[x_3 = \\frac{26}{9} - \\frac{53/729}{208/27} = \\frac{26}{9} - \\frac{53}{5616} = \\frac{16171}{5616} \\approx 2.879451567 \\approx 2.8794\\]",
      "Đáp án đúng là A."
    ]
  },
  {
    id: 1124,
    chapter: "Chapter 5: Integrals",
    topic: "Định lý cơ bản của giải tích (Phần 1 - Đạo hàm tích phân)",
    folder: "GT1",
    type: "multiple_choice",
    question: "Find the derivative of the function\n\\[g(x) = \\int_5^{\\sin x} (1 + t) \\, dt.\\]",
    options: [
      "(1 + sin x) cos x",
      "-(1 + sin x) cos x",
      "(1 + sin x) sin x",
      "-(1 + sin x) sin x",
      "None of the other choices is correct"
    ],
    answer: "A",
    answer_original: "A",
    answer_status: "verified",
    confidence: "high",
    review_flags: [],
    needs_image: false,
    image: "assets/questions/1124_q1124_Question_1124.png",
    explanation: [
      "Theo Định lý cơ bản của Giải tích (Part 1) kết hợp quy tắc chuỗi:",
      "\\[\\frac{d}{dx} \\left[ \\int_a^{u(x)} f(t) \\, dt \\right] = f(u(x)) \\cdot u'(x)\\]",
      "Ở đây cận trên \\(u(x) = \\sin x\\) có đạo hàm \\(u'(x) = \\cos x\\), và hàm dưới dấu tích phân là \\(f(t) = 1 + t\\):",
      "\\[g'(x) = (1 + \\sin x) \\cdot \\cos x\\]",
      "Đáp án đúng là A."
    ]
  },
  {
    id: 1125,
    chapter: "Chapter 5: Integrals",
    topic: "Phương pháp đổi biến số cho tích phân",
    folder: "GT1",
    type: "multiple_choice",
    question: "Evaluate \\(\\int \\frac{dx}{x(\\ln x)^6}\\).\n(i) \\(\\frac{-1}{x(\\ln x)^7} + C\\)\n(ii) \\(\\frac{-1}{5(\\ln x)^5} + C\\)\n(iii) \\(\\frac{1}{7(\\ln x)^7} + C\\)\n(iv) \\(\\frac{-1}{5x(\\ln x)^5} + C\\)",
    options: [
      "(iii)",
      "(i)",
      "(iv)",
      "(ii)",
      "None of the other choices is correct"
    ],
    answer: "D",
    answer_original: "D",
    answer_status: "verified",
    confidence: "high",
    review_flags: [],
    needs_image: false,
    image: "assets/questions/1125_q1125_Question_1125.png",
    explanation: [
      "Đặt \\(u = \\ln x\\), lấy vi phân hai vế:",
      "\\[du = \\frac{1}{x} \\, dx\\]",
      "Thay vào biểu thức tích phân:",
      "\\[\\int \\frac{dx}{x(\\ln x)^6} = \\int \\frac{1}{u^6} \\, du = \\int u^{-6} \\, du = \\frac{u^{-5}}{-5} + C = -\\frac{1}{5u^5} + C\\]",
      "Thay ngược lại \\(u = \\ln x\\):",
      "\\[= -\\frac{1}{5(\\ln x)^5} + C = \\frac{-1}{5(\\ln x)^5} + C\\]",
      "Khẳng định đúng là (ii), ứng với đáp án D."
    ]
  },
  {
    id: 1126,
    chapter: "Chapter 1: Systems of Linear Equations",
    topic: "Giải hệ phương trình tuyến tính ba ẩn",
    folder: "DSTT1",
    type: "multiple_choice",
    question: "Find the solution of the following system of linear equations\n\\[\\begin{cases} x + 2y - 3z = -1 \\\\ x + 5z = 5 \\\\ 2x - 4y + 5z = 1 \\end{cases}\\]",
    options: [
      "(0, 1, 1)",
      "(1, 0, 1)",
      "(1, 1, 0)",
      "No solution",
      "None of the other choices is correct"
    ],
    answer: "A",
    answer_original: "A",
    answer_status: "verified",
    confidence: "high",
    review_flags: [],
    needs_image: false,
    image: "assets/questions/1126_q1126_Question_1126.png",
    explanation: [
      "Từ phương trình (2): \\(x + 5z = 5 \\implies x = 5 - 5z\\).",
      "Thay \\(x = 5 - 5z\\) vào phương trình (1):",
      "\\[(5 - 5z) + 2y - 3z = -1 \\implies 2y - 8z = -6 \\implies y = 4z - 3\\]",
      "Thay \\(x\\) và \\(y\\) theo \\(z\\) vào phương trình (3):",
      "\\[2(5 - 5z) - 4(4z - 3) + 5z = 1\\]",
      "\\[10 - 10z - 16z + 12 + 5z = 1\\]",
      "\\[22 - 21z = 1 \\implies 21z = 21 \\implies z = 1\\]",
      "Tìm nghiệm \\(x\\) và \\(y\\):",
      "\\[x = 5 - 5(1) = 0\\]",
      "\\[y = 4(1) - 3 = 1\\]",
      "Vậy hệ phương trình có nghiệm duy nhất là \\((x, y, z) = (0, 1, 1)\\), ứng với đáp án A."
    ]
  },
  {
    id: 1127,
    chapter: "Chapter 1: Systems of Linear Equations",
    topic: "Phép nhân ma trận với vector",
    folder: "DSTT1",
    type: "multiple_choice",
    question: "Compute \\(Ax\\) where\n\\[A = \\begin{bmatrix} 1 & -1 \\\\ 0 & 1 \\end{bmatrix} \\quad \\text{and} \\quad x = [x_1 \\quad x_2]^T.\\]\n(i) \\([x_1 - x_2 \\quad x_2]^T\\)\n(ii) \\([x_1 \\quad -x_1 + x_2]^T\\)\n(iii) \\([x_2 \\quad x_1 - x_2]^T\\)\n(iv) \\([-x_1 + x_2 \\quad x_1]^T\\)",
    options: [
      "(i)",
      "(ii)",
      "(iii)",
      "(iv)"
    ],
    answer: "A",
    answer_original: "A",
    answer_status: "verified",
    confidence: "high",
    review_flags: [],
    needs_image: false,
    image: "assets/questions/1127_q1127_Question_1127.png",
    explanation: [
      "Thực hiện phép nhân ma trận với vector cột:",
      "\\[Ax = \\begin{bmatrix} 1 & -1 \\\\ 0 & 1 \\end{bmatrix} \\begin{bmatrix} x_1 \\\\ x_2 \\end{bmatrix} = \\begin{bmatrix} 1 \\cdot x_1 + (-1) \\cdot x_2 \\\\ 0 \\cdot x_1 + 1 \\cdot x_2 \\end{bmatrix} = \\begin{bmatrix} x_1 - x_2 \\\\ x_2 \\end{bmatrix}\\]",
      "Dưới dạng chuyển vị, kết quả là \\([x_1 - x_2 \\quad x_2]^T\\).",
      "Khẳng định đúng là (i), ứng với đáp án A."
    ]
  },
  {
    id: 1128,
    chapter: "Chapter 2: Determinants",
    topic: "Hàng thứ nhất của ma trận phụ hợp",
    folder: "DSTT1",
    type: "multiple_choice",
    question: "Given \\(A = \\begin{pmatrix} 2 & 3 & 1 \\\\ 2 & -1 & 2 \\\\ 3 & 4 & -2 \\end{pmatrix}\\), find the first row of the adjugate matrix of \\(A\\).",
    options: [
      "[-6  10  7]",
      "[-6  -10  7]",
      "[-6  10  -7]",
      "[6  10  7]",
      "None of the other choices is correct"
    ],
    answer: "A",
    answer_original: "A",
    answer_status: "verified",
    confidence: "high",
    review_flags: [],
    needs_image: false,
    image: "assets/questions/1128_q1128_Question_1128.png",
    explanation: [
      "Theo định nghĩa ma trận phụ hợp, \\(\\text{adj}(A) = C^T\\), trong đó \\(C = [C_{ij}]\\) là ma trận các phần bù đại số.",
      "Do đó, hàng thứ nhất của \\(\\text{adj}(A)\\) chính là cột thứ nhất của ma trận \\(C\\), tức là \\([C_{11} \\quad C_{21} \\quad C_{31}]\\):",
      "1. \\(C_{11} = (-1)^{1+1} \\begin{vmatrix} -1 & 2 \\\\ 4 & -2 \\end{vmatrix} = (-1)(-2) - (2)(4) = 2 - 8 = -6\\).",
      "2. \\(C_{21} = (-1)^{2+1} \\begin{vmatrix} 3 & 1 \\\\ 4 & -2 \\end{vmatrix} = -[3(-2) - 1(4)] = -[-6 - 4] = -(-10) = 10\\).",
      "3. \\(C_{31} = (-1)^{3+1} \\begin{vmatrix} 3 & 1 \\\\ -1 & 2 \\end{vmatrix} = 3(2) - 1(-1) = 6 + 1 = 7\\).",
      "Vậy hàng thứ nhất của \\(\\text{adj}(A)\\) là \\([-6 \\quad 10 \\quad 7]\\).",
      "Đáp án đúng là A."
    ]
  },
  {
    id: 1129,
    chapter: "Chapter 2: Determinants",
    topic: "Cột thứ nhất của ma trận phụ hợp",
    folder: "DSTT1",
    type: "multiple_choice",
    question: "Find the first column of the adjugate matrix of\n\\[A = \\begin{pmatrix} a & b & c \\\\ 2 & -1 & 2 \\\\ 3 & 4 & -2 \\end{pmatrix}, \\quad (a, b, c \\text{ are real numbers})\\]\n(i) \\(\\begin{pmatrix} -6 \\\\ 10 \\\\ 11 \\end{pmatrix}\\)\n(ii) \\(\\begin{pmatrix} -6 \\\\ -a \\\\ -11 \\end{pmatrix}\\)\n(iii) \\(\\begin{pmatrix} b \\\\ 10 \\\\ 11 \\end{pmatrix}\\)",
    options: [
      "(i)",
      "(ii)",
      "(iii)",
      "None of the other choices is correct"
    ],
    answer: "A",
    answer_original: "A",
    answer_status: "verified",
    confidence: "high",
    review_flags: [],
    needs_image: false,
    image: "assets/questions/1129_q1129_Question_1129.png",
    explanation: [
      "Theo định nghĩa, ma trận phụ hợp \\(\\text{adj}(A) = C^T\\).",
      "Cột thứ nhất của \\(\\text{adj}(A)\\) chính là hàng thứ nhất của ma trận các phần bù đại số \\(C\\), tức là vector cột:",
      "\\[\\begin{pmatrix} C_{11} \\\\ C_{12} \\\\ C_{13} \\end{pmatrix}\\]",
      "Tính từng phần tử bù đại số:",
      "1. \\(C_{11} = (-1)^{1+1} \\begin{vmatrix} -1 & 2 \\\\ 4 & -2 \\end{vmatrix} = (-1)(-2) - 2(4) = 2 - 8 = -6\\).",
      "2. \\(C_{12} = (-1)^{1+2} \\begin{vmatrix} 2 & 2 \\\\ 3 & -2 \\end{vmatrix} = -[2(-2) - 2(3)] = -[-4 - 6] = -(-10) = 10\\).",
      "3. \\(C_{13} = (-1)^{1+3} \\begin{vmatrix} 2 & -1 \\\\ 3 & 4 \\end{vmatrix} = 2(4) - (-1)(3) = 8 + 3 = 11\\).",
      "Do đó cột thứ nhất của \\(\\text{adj}(A)\\) là \\(\\begin{pmatrix} -6 \\\\ 10 \\\\ 11 \\end{pmatrix}\\).",
      "Khẳng định đúng là (i), ứng với đáp án A."
    ]
  },
  {
    id: 1130,
    chapter: "Chapter 3: Eigenvalues and Eigenvectors",
    topic: "Tìm vector riêng tương ứng với giá trị riêng",
    folder: "DSTT1",
    type: "multiple_choice",
    question: "Given that \\(-5\\) is an eigenvalue for the matrix\n\\[\\begin{bmatrix} 3 & -6 \\\\ 8 & -11 \\end{bmatrix}\\]\nFind all eigenvectors corresponding to this eigenvalue.",
    options: [
      "t[3, -4], t \\ne 0",
      "t[-4, 3], t \\ne 0",
      "t[4, 3], t \\ne 0",
      "t[3, 4], t \\ne 0",
      "None of the other choices is correct"
    ],
    answer: "D",
    answer_original: "D",
    answer_status: "verified",
    confidence: "high",
    review_flags: [],
    needs_image: false,
    image: "assets/questions/1130_q1130_Question_1130.png",
    explanation: [
      "Vector riêng \\(v = \\begin{bmatrix} x \\\\ y \\end{bmatrix} \\ne \\mathbf{0}\\) ứng với giá trị riêng \\(\\lambda = -5\\) thỏa mãn phương trình:",
      "\\[(A - \\lambda I)v = \\mathbf{0} \\iff (A + 5I)v = \\mathbf{0}\\]",
      "Tính ma trận \\(A + 5I\\):",
      "\\[A + 5I = \\begin{bmatrix} 3 + 5 & -6 \\\\ 8 & -11 + 5 \\end{bmatrix} = \\begin{bmatrix} 8 & -6 \\\\ 8 & -6 \\end{bmatrix}\\]",
      "Hệ phương trình tương đương với:",
      "\\[8x - 6y = 0 \\iff 4x - 3y = 0 \\iff 4x = 3y\\]",
      "Chọn \\(x = 3t \\implies y = 4t\\) với \\(t \\ne 0\\):",
      "\\[v = t\\begin{bmatrix} 3 \\\\ 4 \\end{bmatrix} = t[3, 4], \\quad t \\ne 0\\]",
      "Đáp án đúng là D."
    ]
  },
  {
    id: 1131,
    chapter: "Chapter 4: Linear Transformations",
    topic: "Số chiều của không gian con nghiệm hệ thuần nhất",
    folder: "DSTT1",
    type: "multiple_choice",
    question: "Consider the following subspace of \\(\\mathbb{R}^3\\):\n\\[W = \\{(x, y, z) \\in \\mathbb{R}^3 \\mid x + y - z = 0, \\quad 2x + 2y + 3z = 0, \\quad 3x + 3y - 2z = 0\\}.\\]\nThe dimension of \\(W\\) is \\(\\underline{\\quad\\quad\\quad}\\)",
    options: [
      "0",
      "1",
      "2",
      "3"
    ],
    answer: "B",
    answer_original: "B",
    answer_status: "verified",
    confidence: "high",
    review_flags: [],
    needs_image: false,
    image: "assets/questions/1131_q1131_Question_1131.png",
    explanation: [
      "Không gian con \\(W\\) là không gian nghiệm (Null space) của hệ phương trình tuyến tính thuần nhất có ma trận hệ số:",
      "\\[A = \\begin{bmatrix} 1 & 1 & -1 \\\\ 2 & 2 & 3 \\\\ 3 & 3 & -2 \\end{bmatrix}\\]",
      "Biến đổi sơ cấp theo hàng để tìm hạng của ma trận \\(A\\):",
      "Thực hiện \\(R_2 \\to R_2 - 2R_1\\) và \\(R_3 \\to R_3 - 3R_1\\):",
      "\\[\\begin{bmatrix} 1 & 1 & -1 \\\\ 0 & 0 & 5 \\\\ 0 & 0 & 1 \\end{bmatrix}\\]",
      "Thực hiện \\(R_3 \\to R_3 - \\frac{1}{5}R_2\\):",
      "\\[\\begin{bmatrix} 1 & 1 & -1 \\\\ 0 & 0 & 5 \\\\ 0 & 0 & 0 \\end{bmatrix}\\]",
      "Ma trận có 2 hàng khác 0, suy ra \\(\\text{rank}(A) = 2\\).",
      "Số ẩn của hệ trong \\(\\mathbb{R}^3\\) là \\(n = 3\\).",
      "Theo định lý Rank-Nullity:",
      "\\[\\dim(W) = n - \\text{rank}(A) = 3 - 2 = 1\\]",
      "(Nghiệm tổng quát của hệ là \\(z = 0, x = -y \\implies (x, y, z) = (-t, t, 0) = t(-1, 1, 0)\\), là một đường thẳng đi qua gốc tọa độ có số chiều bằng 1).",
      "Đáp án đúng là B."
    ]
  }
];

const outPath = path.join(__dirname, '..', 'data', 'v2', 'batches', 'batch_29.json');
fs.writeFileSync(outPath, JSON.stringify(batch29, null, 2), 'utf-8');
console.log('Successfully written Batch 29 to', outPath, 'with', batch29.length, 'questions.');
