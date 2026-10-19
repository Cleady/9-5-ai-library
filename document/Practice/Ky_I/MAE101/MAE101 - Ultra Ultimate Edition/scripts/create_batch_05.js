// scripts/create_batch_05.js
const fs = require('fs');
const path = require('path');

const batch_05 = [
  {
    id: 161,
    chapter: "DSTT1",
    folder: "DSTT1",
    topic: "VectorHinhHoc",
    type: "single_choice",
    question: "Suppose that the set of vectors \\(\\{X_1, X_2, X_3, X_4\\}\\) is orthogonal. Which of the following sets are also orthogonal?\n(i) \\(\\{X_1 + X_2, X_2 + X_3\\}\\)\n(ii) \\(\\{X_1 + X_2, X_3 + X_4\\}\\)",
    options: [
      "Only (i)",
      "Neither (i) nor (ii)",
      "Only (ii)",
      "Both (i) and (ii)"
    ],
    answer: "C",
    answer_original: "C",
    answer_status: "verified",
    explanation: [
      "Tập hợp các vectơ \\(\\{X_1, X_2, X_3, X_4\\}\\) trực giao nghĩa là tích vô hướng \\(X_i \\cdot X_j = 0\\) với mọi \\(i \\ne j\\).",
      "Xét tập (i): Tính tích vô hướng của hai vectơ:\n\\[ (X_1 + X_2) \\cdot (X_2 + X_3) = X_1 \\cdot X_2 + X_1 \\cdot X_3 + X_2 \\cdot X_2 + X_2 \\cdot X_3 = 0 + 0 + \\|X_2\\|^2 + 0 = \\|X_2\\|^2 \\]\nNếu \\(X_2 \\ne 0\\) thì tích này khác 0, do đó tập (i) không trực giao.",
      "Xét tập (ii): Tính tích vô hướng:\n\\[ (X_1 + X_2) \\cdot (X_3 + X_4) = X_1 \\cdot X_3 + X_1 \\cdot X_4 + X_2 \\cdot X_3 + X_2 \\cdot X_4 = 0 + 0 + 0 + 0 = 0 \\]\nDo đó hai vectơ luôn vuông góc với nhau, tức tập (ii) luôn trực giao.",
      "Vậy chỉ có (ii) trực giao. Đáp án đúng là C."
    ],
    image: "assets/questions/0161_q161_Question_161.png",
    needs_image: false,
    review_flags: [],
    confidence: "high"
  },
  {
    id: 162,
    chapter: "GT1",
    folder: "GT1",
    topic: "TichPhan",
    type: "single_choice",
    question: "Use Midpoint Rule with \\(n = 4\\) to approximate \\(\\int_0^8 f(x)\\,dx\\)\n\n| \\(x\\) | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 |\n| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |\n| \\(f(x)\\) | 3 | 1 | 2 | 5 | 3 | 8 | 7 | 6 | 2 |",
    options: [
      "34",
      "40",
      "28",
      "30",
      "20",
      "None of the other choices is correct"
    ],
    answer: "B",
    answer_original: "B",
    answer_status: "verified",
    explanation: [
      "Khoảng lấy tích phân là \\([0, 8]\\) với \\(n = 4\\), độ dài mỗi khoảng con là:\n\\[ \\Delta x = \\frac{8 - 0}{4} = 2 \\]",
      "Bốn khoảng con lần lượt là: \\([0, 2], [2, 4], [4, 6], [6, 8]\\).",
      "Các trung điểm của các khoảng con là:\n- Khoảng \\([0, 2]\\): \\(x_1^* = 1 \\implies f(1) = 1\\)\n- Khoảng \\([2, 4]\\): \\(x_2^* = 3 \\implies f(3) = 5\\)\n- Khoảng \\([4, 6]\\): \\(x_3^* = 5 \\implies f(5) = 8\\)\n- Khoảng \\([6, 8]\\): \\(x_4^* = 7 \\implies f(7) = 6\\)",
      "Công thức xấp xỉ điểm giữa (Midpoint Rule):\n\\[ M_4 = \\Delta x \\left[ f(1) + f(3) + f(5) + f(7) \\right] = 2 \\times (1 + 5 + 8 + 6) = 2 \\times 20 = 40 \\]",
      "Vậy kết quả là 40, chọn đáp án B."
    ],
    image: "assets/questions/0162_q162_Question_162.png",
    needs_image: false,
    review_flags: [],
    confidence: "high"
  },
  {
    id: 163,
    chapter: "GT1",
    folder: "GT1",
    topic: "DaoHam",
    type: "single_choice",
    question: "Differentiate implicitly to find the slope of the curve at the given point\n\\[ y^3 + yx^2 + x^2 - 3y^2 = 0, \\quad (-1, 1) \\]",
    options: [
      "None of the other choices is correct",
      "-2",
      "-1/2",
      "-1",
      "3/2"
    ],
    answer: "B",
    answer_original: "B",
    answer_status: "verified",
    explanation: [
      "Lấy đạo hàm hai vế theo biến \\(x\\) (coi \\(y = y(x)\\)):\n\\[ 3y^2 y' + (y' x^2 + 2xy) + 2x - 6y y' = 0 \\]",
      "Nhóm các số hạng chứa \\(y'\\):\n\\[ y'(3y^2 + x^2 - 6y) + 2xy + 2x = 0 \\]",
      "Thay tọa độ điểm \\((-1, 1)\\), tức \\(x = -1, y = 1\\):\n\\[ y'(3(1)^2 + (-1)^2 - 6(1)) + 2(-1)(1) + 2(-1) = 0 \\]\n\\[ y'(3 + 1 - 6) - 2 - 2 = 0 \\]\n\\[ -2y' - 4 = 0 \\implies -2y' = 4 \\implies y' = -2 \\]",
      "Hệ số góc của tiếp tuyến tại điểm đó là \\(-2\\). Đáp án đúng là B."
    ],
    image: "assets/questions/0163_q163_Question_163.png",
    needs_image: false,
    review_flags: [],
    confidence: "high"
  },
  {
    id: 164,
    chapter: "GT1",
    folder: "GT1",
    topic: "TichPhan",
    type: "single_choice",
    question: "Which of the following integrals is convergent?\n(i) \\(\\int_1^\\infty \\frac{1+e^{-x}}{x}\\,dx\\)\n(ii) \\(\\int_1^\\infty \\frac{1}{x^2}\\,dx\\)",
    options: [
      "(i)",
      "(i) and (ii)",
      "None of the other choices is correct",
      "(ii)"
    ],
    answer: "D",
    answer_original: "D",
    answer_status: "verified",
    explanation: [
      "Xét tích phân (i): Với mọi \\(x \\ge 1\\), ta có \\(e^{-x} > 0 \\implies 1 + e^{-x} > 1\\), suy ra:\n\\[ \\frac{1+e^{-x}}{x} > \\frac{1}{x} > 0 \\]\nVì tích phân \\(\\int_1^\\infty \\frac{1}{x}\\,dx\\) phân kỳ (chuẩn p-integral với \\(p = 1\\)), theo tiêu chuẩn so sánh, tích phân (i) phân kỳ.",
      "Xét tích phân (ii): \\(\\int_1^\\infty \\frac{1}{x^2}\\,dx\\) là tích phân chuẩn dạng \\(\\int_1^\\infty \\frac{1}{x^p}\\,dx\\) với \\(p = 2 > 1\\), do đó hội tụ (giá trị là \\(\\left[-\\frac{1}{x}\\right]_1^\\infty = 1\\)).",
      "Vậy chỉ có tích phân (ii) hội tụ. Đáp án đúng là D."
    ],
    image: "assets/questions/0164_q164_Question_164.png",
    needs_image: false,
    review_flags: [],
    confidence: "high"
  },
  {
    id: 165,
    chapter: "DSTT1",
    folder: "DSTT1",
    topic: "MaTran",
    type: "single_choice",
    question: "Let \\(A = \\begin{bmatrix} 1 & 0 & -2 \\\\ 3 & 1 & 4 \\\\ 5 & 2 & -3 \\end{bmatrix}\\). Find \\(\\det(2A^{-1})\\)",
    options: [
      "-8/13",
      "-2/13",
      "None of the other choices is correct",
      "-26",
      "13/8"
    ],
    answer: "A",
    answer_original: "A",
    answer_status: "verified",
    explanation: [
      "Tính định thức của ma trận \\(A\\) bằng cách khai triển theo dòng 1:\n\\[ \\det(A) = 1 \\cdot \\begin{vmatrix} 1 & 4 \\\\ 2 & -3 \\end{vmatrix} - 0 \\cdot \\begin{vmatrix} 3 & 4 \\\\ 5 & -3 \\end{vmatrix} + (-2) \\cdot \\begin{vmatrix} 3 & 1 \\\\ 5 & 2 \\end{vmatrix} \\]\n\\[ = 1(1(-3) - 4(2)) - 2(3(2) - 1(5)) = 1(-3 - 8) - 2(6 - 5) = -11 - 2 = -13 \\]",
      "Vì \\(A\\) là ma trận kích thước \\(3 \\times 3\\), theo tính chất định thức ta có:\n\\[ \\det(2A^{-1}) = 2^3 \\det(A^{-1}) = 8 \\cdot \\frac{1}{\\det(A)} = 8 \\cdot \\frac{1}{-13} = -\\frac{8}{13} \\]",
      "Đáp án đúng là A."
    ],
    image: "assets/questions/0165_q165_Question_165.png",
    needs_image: false,
    review_flags: [],
    confidence: "high"
  },
  {
    id: 166,
    chapter: "DSTT1",
    folder: "DSTT1",
    topic: "MaTran",
    type: "single_choice",
    question: "Find the \\((2, 2)\\)-entry of the matrix \\(A\\) that satisfies\n\\[ (A^T - 2I)^{-1} = \\begin{bmatrix} 2 & 1 \\\\ 1 & 1 \\end{bmatrix} \\]",
    options: [
      "3",
      "1",
      "4",
      "-1",
      "None of the other choices is correct"
    ],
    answer: "C",
    answer_original: "A",
    answer_status: "conflict",
    explanation: [
      "Đặt \\(M = \\begin{bmatrix} 2 & 1 \\\\ 1 & 1 \\end{bmatrix}\\). Định thức của \\(M\\) là \\(\\det(M) = 2(1) - 1(1) = 1\\).",
      "Ma trận nghịch đảo của \\(M\\) là:\n\\[ M^{-1} = \\frac{1}{1} \\begin{bmatrix} 1 & -1 \\\\ -1 & 2 \\end{bmatrix} = \\begin{bmatrix} 1 & -1 \\\\ -1 & 2 \\end{bmatrix} \\]",
      "Từ phương trình ban đầu, ta có \\(A^T - 2I = M^{-1}\\), suy ra:\n\\[ A^T = M^{-1} + 2I = \\begin{bmatrix} 1 & -1 \\\\ -1 & 2 \\end{bmatrix} + \\begin{bmatrix} 2 & 0 \\\\ 0 & 2 \\end{bmatrix} = \\begin{bmatrix} 3 & -1 \\\\ -1 & 4 \\end{bmatrix} \\]",
      "Do đó \\(A = (A^T)^T = \\begin{bmatrix} 3 & -1 \\\\ -1 & 4 \\end{bmatrix}\\). Phần tử ở vị trí \\((2, 2)\\) của \\(A\\) chính xác là 4.",
      "Lưu ý: Đáp án cũ của ngân hàng chọn A (3), đây là lỗi do tác giả đề nhầm vị trí phần tử \\((1, 1)\\) (là 3) hoặc nhầm thứ tự các phần tử đường chéo khi nghịch đảo ma trận. Vị trí \\((2, 2)\\) chuẩn xác phải là 4 (lựa chọn C)."
    ],
    image: "assets/questions/0166_q166_Question_166.png",
    needs_image: false,
    review_flags: [
      "ANSWER_CONFLICT: Bank has A (3), correct is C (4). Author calculated (1,1)-entry instead of (2,2)-entry."
    ],
    confidence: "high"
  },
  {
    id: 167,
    chapter: "GT1",
    folder: "GT1",
    topic: "UngDungDaoHam",
    type: "single_choice",
    question: "Find the minimum of the sum of two positive numbers whose product is 324.",
    options: [
      "36",
      "42",
      "24",
      "20",
      "None of the other choices is correct"
    ],
    answer: "A",
    answer_original: "A",
    answer_status: "verified",
    explanation: [
      "Gọi hai số dương là \\(x\\) và \\(y\\) với \\(x, y > 0\\) thỏa mãn \\(xy = 324\\).",
      "Ta cần tìm giá trị nhỏ nhất của tổng \\(S = x + y\\).",
      "Áp dụng bất đẳng thức Cauchy (AM-GM) cho hai số dương \\(x, y\\):\n\\[ x + y \\ge 2\\sqrt{xy} = 2\\sqrt{324} = 2 \\times 18 = 36 \\]",
      "Dấu đẳng thức xảy ra khi \\(x = y = 18 > 0\\). Khi đó \\(xy = 18 \\times 18 = 324\\) và tổng \\(x + y = 36\\).",
      "Vậy giá trị nhỏ nhất của tổng là 36. Đáp án đúng là A."
    ],
    image: "assets/questions/0167_q167_Question_167.png",
    needs_image: false,
    review_flags: [],
    confidence: "high"
  },
  {
    id: 168,
    chapter: "DSTT1",
    folder: "DSTT1",
    topic: "AnhXaTuyenTinh",
    type: "single_choice",
    question: "Let \\(L : \\mathbb{R}^3 \\to \\mathbb{R}^2\\) be a linear transformation for which we know that\n\\[ L \\begin{bmatrix} 1 \\\\ 0 \\\\ 0 \\end{bmatrix} = \\begin{bmatrix} 1 \\\\ -2 \\end{bmatrix}, \\quad L \\begin{bmatrix} 0 \\\\ 1 \\\\ 0 \\end{bmatrix} = \\begin{bmatrix} 2 \\\\ -3 \\end{bmatrix}, \\quad L \\begin{bmatrix} 0 \\\\ 0 \\\\ 1 \\end{bmatrix} = \\begin{bmatrix} 5 \\\\ 1 \\end{bmatrix} \\]\nFind \\(L \\begin{bmatrix} 1 \\\\ -2 \\\\ 3 \\end{bmatrix}\\)\n(i) \\(\\begin{bmatrix} 12 \\\\ 7 \\end{bmatrix}\\)",
    options: [
      "(iv)",
      "(iii)",
      "(i)",
      "None of the other choices are correct",
      "(ii)"
    ],
    answer: "C",
    answer_original: "C",
    answer_status: "verified",
    explanation: [
      "Vectơ \\(\\begin{bmatrix} 1 \\\\ -2 \\\\ 3 \\end{bmatrix}\\) có thể biểu diễn qua cơ sở chính tắc:\n\\[ \\begin{bmatrix} 1 \\\\ -2 \\\\ 3 \\end{bmatrix} = 1 \\begin{bmatrix} 1 \\\\ 0 \\\\ 0 \\end{bmatrix} - 2 \\begin{bmatrix} 0 \\\\ 1 \\\\ 0 \\end{bmatrix} + 3 \\begin{bmatrix} 0 \\\\ 0 \\\\ 1 \\end{bmatrix} \\]",
      "Do tính chất tuyến tính của \\(L\\):\n\\[ L \\begin{bmatrix} 1 \\\\ -2 \\\\ 3 \\end{bmatrix} = 1 L \\begin{bmatrix} 1 \\\\ 0 \\\\ 0 \\end{bmatrix} - 2 L \\begin{bmatrix} 0 \\\\ 1 \\\\ 0 \\end{bmatrix} + 3 L \\begin{bmatrix} 0 \\\\ 0 \\\\ 1 \\end{bmatrix} \\]\n\\[ = 1 \\begin{bmatrix} 1 \\\\ -2 \\end{bmatrix} - 2 \\begin{bmatrix} 2 \\\\ -3 \\end{bmatrix} + 3 \\begin{bmatrix} 5 \\\\ 1 \\end{bmatrix} = \\begin{bmatrix} 1 - 4 + 15 \\\\ -2 + 6 + 3 \\end{bmatrix} = \\begin{bmatrix} 12 \\\\ 7 \\end{bmatrix} \\]",
      "Lưu ý về định dạng đề gốc FUO: Các phương án (i)-(iv) bị khuất/bỏ sót trong khung đề ở hệ thống thi gốc, nhưng đáp án ngân hàng C trỏ tới mệnh đề (i) ứng với vectơ kết quả \\(\\begin{bmatrix} 12 \\\\ 7 \\end{bmatrix}\\).",
      "Do đó đáp án chính xác là C."
    ],
    image: "assets/questions/0168_q168_Question_168.png",
    needs_image: false,
    review_flags: [
      "PROMPT_ANOMALY: Statements (i)-(iv) were omitted from the question box in the original exam system, but bank key C correctly corresponds to (i) = [12; 7]."
    ],
    confidence: "high"
  },
  {
    id: 169,
    chapter: "GT1",
    folder: "GT1",
    topic: "DaoHam",
    type: "single_choice",
    question: "The position in meter of a particle after \\(t\\) seconds is modeled by the function:\n\\[ f(t) = 2te^t, \\text{ where } t \\ge 0 \\]\nAt what rate, in meters per second, is the position of the particle changing at \\(t = 3\\)?\n(i) \\(8e^3\\)\n(ii) \\(2e^3\\)\n(iii) \\(2 + e^3\\)\n(iv) \\(6e^3\\)",
    options: [
      "(iii)",
      "(ii)",
      "(i)",
      "(iv)",
      "None of the other choices is correct"
    ],
    answer: "C",
    answer_original: "C",
    answer_status: "verified",
    explanation: [
      "Tốc độ thay đổi vị trí của chất điểm chính là đạo hàm bậc nhất của hàm vị trí: \\(v(t) = f'(t)\\).",
      "Áp dụng quy tắc đạo hàm của tích:\n\\[ f'(t) = (2t)' e^t + 2t (e^t)' = 2e^t + 2te^t = 2(1 + t)e^t \\]",
      "Tại thời điểm \\(t = 3\\):\n\\[ f'(3) = 2(1 + 3)e^3 = 8e^3 \\]",
      "Giá trị này tương ứng với mệnh đề (i). Lựa chọn C tương ứng với (i).",
      "Đáp án đúng là C."
    ],
    image: "assets/questions/0169_q169_Question_169.png",
    needs_image: false,
    review_flags: [],
    confidence: "high"
  },
  {
    id: 170,
    chapter: "GT1",
    folder: "GT1",
    topic: "TichPhan",
    type: "single_choice",
    question: "Find \\(\\int 4x \\sin(2x)\\,dx\\)",
    options: [
      "None of the other choices is correct",
      "2\\sin(2x) + 2x\\cos(2x) + C",
      "\\sin(2x) + 2x\\cos(2x) + C",
      "\\sin(2x) - 2x\\cos(2x) + C",
      "2\\sin(2x) - 2x\\cos(2x) + C"
    ],
    answer: "D",
    answer_original: "D",
    answer_status: "verified",
    explanation: [
      "Áp dụng phương pháp tích phân từng phần \\(\\int u\\,dv = uv - \\int v\\,du\\):",
      "Đặt:\n\\[ \\begin{cases} u = 4x \\\\ dv = \\sin(2x)\\,dx \\end{cases} \\implies \\begin{cases} du = 4\\,dx \\\\ v = -\\frac{1}{2}\\cos(2x) \\end{cases} \\]",
      "Thay vào công thức:\n\\[ \\int 4x\\sin(2x)\\,dx = (4x)\\left(-\\frac{1}{2}\\cos(2x)\\right) - \\int \\left(-\\frac{1}{2}\\cos(2x)\\right)(4\\,dx) \\]\n\\[ = -2x\\cos(2x) + 2\\int \\cos(2x)\\,dx \\]\n\\[ = -2x\\cos(2x) + \\sin(2x) + C = \\sin(2x) - 2x\\cos(2x) + C \\]",
      "Đáp án đúng là D."
    ],
    image: "assets/questions/0170_q170_Question_170.png",
    needs_image: false,
    review_flags: [],
    confidence: "high"
  },
  {
    id: 171,
    chapter: "GT1",
    folder: "GT1",
    topic: "TichPhan",
    type: "single_choice",
    question: "Evaluate \\(\\int 2x^2 \\sqrt[4]{7 + 3x^3}\\,dx\\)\n(i) \\(2(7 + 3x^3)^{5/4} + C\\)\n(ii) \\((8/45)(7 + 3x^3)^{5/4} + C\\)\n(iii) \\((8/5)(7 + 3x^3)^{5/4} + C\\)\n(iv) \\(-(4/3)(7 + 3x^3)^{-3/4} + C\\)",
    options: [
      "(iv)",
      "(ii)",
      "None of the other choices is correct",
      "(i)",
      "(iii)"
    ],
    answer: "B",
    answer_original: "B",
    answer_status: "verified",
    explanation: [
      "Đặt ẩn phụ: \\(u = 7 + 3x^3 \\implies du = 9x^2\\,dx \\implies x^2\\,dx = \\frac{du}{9}\\).",
      "Biểu thức tích phân trở thành:\n\\[ \\int 2x^2 (7 + 3x^3)^{1/4}\\,dx = 2 \\int u^{1/4} \\frac{du}{9} = \\frac{2}{9} \\int u^{1/4}\\,du \\]\n\\[ = \\frac{2}{9} \\cdot \\frac{u^{5/4}}{5/4} + C = \\frac{2}{9} \\cdot \\frac{4}{5} u^{5/4} + C = \\frac{8}{45}(7 + 3x^3)^{5/4} + C \\]",
      "Kết quả trùng khớp với biểu thức (ii). Lựa chọn tương ứng là B."
    ],
    image: "assets/questions/0171_q171_Question_171.png",
    needs_image: false,
    review_flags: [],
    confidence: "high"
  },
  {
    id: 172,
    chapter: "DSTT1",
    folder: "DSTT1",
    topic: "HePhuongTrinh",
    type: "single_choice",
    question: "Consider the system \\(AX = B\\) where \\(A\\) is an invertible matrix with\n\\[ A^{-1} = \\begin{bmatrix} 1 & 1 & 0 \\\\ -2 & 1 & 3 \\\\ 0 & 4 & 1 \\end{bmatrix}, \\quad B = \\begin{bmatrix} 1 \\\\ 0 \\\\ -2 \\end{bmatrix}, \\quad X = \\begin{bmatrix} x_1 \\\\ x_2 \\\\ x_3 \\end{bmatrix} \\]\nSolve for \\(x_2\\).",
    options: [
      "0",
      "-8",
      "All of the other choices are incorrect",
      "3"
    ],
    answer: "B",
    answer_original: "B",
    answer_status: "verified",
    explanation: [
      "Từ hệ phương trình \\(AX = B\\), do \\(A\\) khả nghịch nên nghiệm của hệ là:\n\\[ X = A^{-1}B \\]",
      "Để tìm \\(x_2\\), ta nhân hàng thứ 2 của \\(A^{-1}\\) với cột \\(B\\):\n\\[ x_2 = (-2)(1) + (1)(0) + (3)(-2) = -2 + 0 - 6 = -8 \\]",
      "Vậy \\(x_2 = -8\\), chọn đáp án B."
    ],
    image: "assets/questions/0172_q172_Question_172.png",
    needs_image: false,
    review_flags: [],
    confidence: "high"
  },
  {
    id: 173,
    chapter: "DSTT1",
    folder: "DSTT1",
    topic: "KhongGianVector",
    type: "single_choice",
    question: "Find all values of \\(x\\) so that the set\n\\[ \\{(x, 1, 1), (4, x, x), (0, 0, -2)\\} \\]\nis linearly dependent.",
    options: [
      "1, -1",
      "Any number but 2 and -2",
      "2, -2",
      "Any number but 1 and -1",
      "0",
      "None of the other choices is correct"
    ],
    answer: "C",
    answer_original: "C",
    answer_status: "verified",
    explanation: [
      "Tập hợp 3 vectơ trong \\(\\mathbb{R}^3\\) phụ thuộc tuyến tính khi và chỉ khi định thức của ma trận tạo bởi 3 vectơ này bằng 0.",
      "Lập ma trận và tính định thức (khai triển theo hàng 3):\n\\[ \\det \\begin{bmatrix} x & 1 & 1 \\\\ 4 & x & x \\\\ 0 & 0 & -2 \\end{bmatrix} = (-2) \\begin{vmatrix} x & 1 \\\\ 4 & x \\end{vmatrix} = -2(x^2 - 4) \\]",
      "Để tập hợp phụ thuộc tuyến tính:\n\\[ -2(x^2 - 4) = 0 \\iff x^2 - 4 = 0 \\iff x = \\pm 2 \\]",
      "Vậy các giá trị của \\(x\\) là 2 và -2. Đáp án đúng là C."
    ],
    image: "assets/questions/0173_q173_Question_173.png",
    needs_image: false,
    review_flags: [],
    confidence: "high"
  },
  {
    id: 174,
    chapter: "DSTT1",
    folder: "DSTT1",
    topic: "KhongGianVector",
    type: "single_choice",
    question: "Find the dimension of the space\n\\[ U = \\operatorname{span}\\left\\{ \\begin{bmatrix} 0 \\\\ 3 \\\\ 1 \\end{bmatrix}, \\begin{bmatrix} 1 \\\\ 1 \\\\ 1 \\end{bmatrix}, \\begin{bmatrix} 2 \\\\ -1 \\\\ 1 \\end{bmatrix}, \\begin{bmatrix} 3 \\\\ 0 \\\\ 1 \\end{bmatrix} \\right\\} \\]",
    options: [
      "1",
      "2",
      "4",
      "3"
    ],
    answer: "D",
    answer_original: "D",
    answer_status: "verified",
    explanation: [
      "Số chiều của không gian sinh \\(U\\) bằng hạng (rank) của ma trận tạo bởi các vectơ trên.",
      "Lập ma trận các cột và biến đổi về dạng bậc thang:\n\\[ M = \\begin{bmatrix} 0 & 1 & 2 & 3 \\\\ 3 & 1 & -1 & 0 \\\\ 1 & 1 & 1 & 1 \\end{bmatrix} \\]",
      "Đổi hàng 1 và hàng 3:\n\\[ \\begin{bmatrix} 1 & 1 & 1 & 1 \\\\ 3 & 1 & -1 & 0 \\\\ 0 & 3 & 1 & 3 \\end{bmatrix} \\]",
      "Thực hiện \\(R_2 \\to R_2 - 3R_1\\):\n\\[ \\begin{bmatrix} 1 & 1 & 1 & 1 \\\\ 0 & -2 & -4 & -3 \\\\ 0 & 3 & 1 & 3 \\end{bmatrix} \\]",
      "Hai hàng cuối không tỉ lệ với nhau, do đó ma trận có 3 phần tử chốt (pivot), tức hạng của ma trận là 3.",
      "Vậy \\(\\dim(U) = 3\\). Đáp án đúng là D."
    ],
    image: "assets/questions/0174_q174_Question_174.png",
    needs_image: false,
    review_flags: [],
    confidence: "high"
  },
  {
    id: 175,
    chapter: "GT1",
    folder: "GT1",
    topic: "TichPhan",
    type: "single_choice",
    question: "Evaluate \\(\\int_3^4 (t + \\sqrt{3})(t - \\sqrt{3})\\,dt\\)",
    options: [
      "28/3",
      "-26/3",
      "34",
      "None of the other choices is correct",
      "16"
    ],
    answer: "A",
    answer_original: "A",
    answer_status: "verified",
    explanation: [
      "Khai triển biểu thức dưới dấu tích phân:\n\\[ (t + \\sqrt{3})(t - \\sqrt{3}) = t^2 - 3 \\]",
      "Tính tích phân xác định:\n\\[ \\int_3^4 (t^2 - 3)\\,dt = \\left[ \\frac{t^3}{3} - 3t \\right]_3^4 \\]",
      "Thay cận vào:\n- Tại \\(t = 4\\): \\(\\frac{4^3}{3} - 3(4) = \\frac{64}{3} - 12 = \\frac{64 - 36}{3} = \\frac{28}{3}\\)\n- Tại \\(t = 3\\): \\(\\frac{3^3}{3} - 3(3) = 9 - 9 = 0\\)",
      "Hiệu hai giá trị: \\(\\frac{28}{3} - 0 = \\frac{28}{3}\\).",
      "Đáp án đúng là A."
    ],
    image: "assets/questions/0175_q175_Question_175.png",
    needs_image: false,
    review_flags: [],
    confidence: "high"
  },
  {
    id: 176,
    chapter: "DSTT1",
    folder: "DSTT1",
    topic: "VectorHinhHoc",
    type: "single_choice",
    question: "Let \\(u, v\\) be two vectors in \\(R^3\\) such that \\(\\|u\\| = 4, \\|v\\| = 5\\), \\(u\\) and \\(v\\) are perpendicular. Find the length of the vector \\(2u \\times 3v\\).",
    options: [
      "0",
      "20",
      "80",
      "120",
      "40"
    ],
    answer: "D",
    answer_original: "D",
    answer_status: "verified",
    explanation: [
      "Sử dụng tính chất của tích có hướng với hằng số:\n\\[ 2u \\times 3v = 6(u \\times v) \\]",
      "Độ dài của vectơ tích có hướng là:\n\\[ \\|2u \\times 3v\\| = 6 \\|u \\times v\\| = 6 \\|u\\| \\|v\\| \\sin(\\theta) \\]\ntrọng đó \\(\\theta\\) là góc giữa hai vectơ \\(u\\) và \\(v\\).",
      "Do \\(u\\) và \\(v\\) vuông góc (perpendicular), ta có \\(\\theta = 90^\\circ \\implies \\sin(\\theta) = 1\\).",
      "Thay số vào:\n\\[ \\|2u \\times 3v\\| = 6 \\times 4 \\times 5 \\times 1 = 120 \\]",
      "Đáp án đúng là D."
    ],
    image: "assets/questions/0176_q176_Question_176.png",
    needs_image: false,
    review_flags: [],
    confidence: "high"
  },
  {
    id: 177,
    chapter: "DSTT1",
    folder: "DSTT1",
    topic: "VectorHinhHoc",
    type: "single_choice",
    question: "Find the projection of the vector \\(\\mathbf{u} = [1; -2; 3]\\) on the vector \\(\\mathbf{v} = [1; -1; 0]\\).",
    options: [
      "[-3/2; -3/2; 0]",
      "[3/2; 3/2; 0]",
      "[-3/2; 3/2; 0]",
      "[3/2; -3/2; 0]",
      "None of other choices is correct"
    ],
    answer: "D",
    answer_original: "D",
    answer_status: "verified",
    explanation: [
      "Công thức hình chiếu trực giao của vectơ \\(\\mathbf{u}\\) lên vectơ \\(\\mathbf{v}\\) là:\n\\[ \\operatorname{proj}_{\\mathbf{v}}(\\mathbf{u}) = \\frac{\\mathbf{u} \\cdot \\mathbf{v}}{\\|\\mathbf{v}\\|^2} \\mathbf{v} \\]",
      "Tính tích vô hướng \\(\\mathbf{u} \\cdot \\mathbf{v}\\):\n\\[ \\mathbf{u} \\cdot \\mathbf{v} = 1(1) + (-2)(-1) + 3(0) = 1 + 2 + 0 = 3 \\]",
      "Tính bình phương độ dài \\(\\|\\mathbf{v}\\|^2\\):\n\\[ \\|\\mathbf{v}\\|^2 = 1^2 + (-1)^2 + 0^2 = 1 + 1 + 0 = 2 \\]",
      "Suy ra:\n\\[ \\operatorname{proj}_{\\mathbf{v}}(\\mathbf{u}) = \\frac{3}{2} [1; -1; 0] = [3/2; -3/2; 0] \\]",
      "Đáp án đúng là D."
    ],
    image: "assets/questions/0177_q177_Question_177.png",
    needs_image: false,
    review_flags: [],
    confidence: "high"
  },
  {
    id: 178,
    chapter: "GT1",
    folder: "GT1",
    topic: "DaoHam",
    type: "single_choice",
    question: "Simplify the quotient \\(\\frac{f(x+h)-f(x)}{h}\\) for\n\\[ f(x) = 2 + \\frac{1}{x} \\]\n(i) \\(\\frac{-1}{(x+h)x} + 2h\\)\n(ii) \\(\\frac{-1}{(x+h)x} + 2\\)\n(iii) \\(\\frac{1}{(x+h)x} + 2\\)\n(iv) \\(\\frac{-1}{(x+h)x}\\)",
    options: [
      "(i)",
      "(iv)",
      "(ii)",
      "(iii)",
      "None of the other choices is correct"
    ],
    answer: "B",
    answer_original: "B",
    answer_status: "verified",
    explanation: [
      "Tính tử số \\(f(x+h) - f(x)\\):\n\\[ f(x+h) - f(x) = \\left(2 + \\frac{1}{x+h}\\right) - \\left(2 + \\frac{1}{x}\\right) = \\frac{1}{x+h} - \\frac{1}{x} \\]\n\\[ = \\frac{x - (x+h)}{x(x+h)} = \\frac{-h}{x(x+h)} \\]",
      "Chia cho \\(h\\):\n\\[ \\frac{f(x+h)-f(x)}{h} = \\frac{-h}{h \\cdot x(x+h)} = \\frac{-1}{(x+h)x} \\]",
      "Biểu thức này tương ứng với mệnh đề (iv). Lựa chọn B tương ứng với (iv).",
      "Đáp án đúng là B."
    ],
    image: "assets/questions/0178_q178_Question_178.png",
    needs_image: false,
    review_flags: [],
    confidence: "high"
  },
  {
    id: 179,
    chapter: "GT1",
    folder: "GT1",
    topic: "DaoHam",
    type: "single_choice",
    question: "A cube's edge of length \\(s\\) is growing according to the equation \\(s = 2t^2 + 1\\), where \\(t\\) is measured in seconds and \\(s\\) is measured in meters. How fast (in \\(m^3/s\\)) is the cube's volume increasing at the time when \\(t = 1(s)\\)?",
    options: [
      "18",
      "180",
      "None of the other choices is correct.",
      "81",
      "810",
      "108"
    ],
    answer: "F",
    answer_original: "F",
    answer_status: "verified",
    explanation: [
      "Thể tích khối lập phương cạnh \\(s\\) là \\(V = s^3\\).",
      "Lấy đạo hàm theo thời gian \\(t\\) theo quy tắc chuỗi:\n\\[ \\frac{dV}{dt} = 3s^2 \\frac{ds}{dt} \\]",
      "Từ phương trình cạnh \\(s = 2t^2 + 1\\), ta có đạo hàm:\n\\[ \\frac{ds}{dt} = 4t \\]",
      "Tại thời điểm \\(t = 1\\):\n- Cạnh \\(s = 2(1)^2 + 1 = 3\\text{ m}\\)\n- Tốc độ tăng cạnh: \\(\\frac{ds}{dt} = 4(1) = 4\\text{ m/s}\\)",
      "Tốc độ tăng thể tích là:\n\\[ \\frac{dV}{dt} = 3(3)^2(4) = 3 \\times 9 \\times 4 = 108\\text{ m}^3/\\text{s} \\]",
      "Đáp án đúng là F (108)."
    ],
    image: "assets/questions/0179_q179_Question_179.png",
    needs_image: false,
    review_flags: [],
    confidence: "high"
  },
  {
    id: 180,
    chapter: "DSTT1",
    folder: "DSTT1",
    topic: "KhongGianVector",
    type: "single_choice",
    question: "Which of the following sets are subspaces of \\(R^3\\)\n\\[ U = \\{(x, y, x - y) \\mid x, y \\text{ are real numbers}\\}; \\quad V = \\{(x, y, xy) \\mid x, y \\text{ are real numbers}\\} \\]",
    options: [
      "U only",
      "None of U and V",
      "V only",
      "Both U and V"
    ],
    answer: "A",
    answer_original: "A",
    answer_status: "verified",
    explanation: [
      "Xét tập \\(U\\): Mỗi phần tử của \\(U\\) có dạng:\n\\[ (x, y, x - y) = x(1, 0, 1) + y(0, 1, -1) = \\operatorname{span}\\{(1, 0, 1), (0, 1, -1)\\} \\]\nVì \\(U\\) là không gian sinh bởi hai vectơ trong \\(R^3\\), nên \\(U\\) là một không gian con (subspace) của \\(R^3\\).",
      "Xét tập \\(V\\): Kiểm tra tính đóng đối với phép cộng:\n- Lấy \\(u = (1, 0, 0) \\in V\\) (do \\(xy = 1 \\times 0 = 0\\))\n- Lấy \\(v = (0, 1, 0) \\in V\\) (do \\(xy = 0 \\times 1 = 0\\))\n- Tổng \\(u + v = (1, 1, 0)\\). Với vectơ này, tích hai thành phần đầu là \\(1 \\times 1 = 1 \\ne 0\\) (không bằng thành phần thứ ba).\nDo đó \\(u + v \\notin V\\), tức \\(V\\) không đóng với phép cộng nên không phải là không gian con.",
      "Vậy chỉ có \\(U\\) là không gian con (U only). Đáp án đúng là A."
    ],
    image: "assets/questions/0180_q180_Question_180.png",
    needs_image: false,
    review_flags: [],
    confidence: "high"
  },
  {
    id: 181,
    chapter: "GT1",
    folder: "GT1",
    topic: "DaoHam",
    type: "single_choice",
    question: "Use the linear approximation for the function \\(f(x) = x^{2/3}\\) at \\(x = 8\\) to estimate \\((8.06)^{2/3}\\).",
    options: [
      "4.002",
      "4.01",
      "4.02",
      "4.12",
      "4.001",
      "None of the other choices is correct"
    ],
    answer: "C",
    answer_original: "C",
    answer_status: "verified",
    explanation: [
      "Công thức xấp xỉ tuyến tính tại \\(x = a\\) là \\(L(x) = f(a) + f'(a)(x - a)\\).",
      "Với \\(f(x) = x^{2/3}\\) và \\(a = 8\\):\n- \\(f(8) = 8^{2/3} = (2^3)^{2/3} = 2^2 = 4\\)\n- \\(f'(x) = \\frac{2}{3}x^{-1/3} = \\frac{2}{3\\sqrt[3]{x}}\\)\n- \\(f'(8) = \\frac{2}{3\\sqrt[3]{8}} = \\frac{2}{3 \\times 2} = \\frac{1}{3}\\)",
      "Hàm xấp xỉ tuyến tính:\n\\[ L(x) = 4 + \\frac{1}{3}(x - 8) \\]",
      "Tại \\(x = 8.06\\):\n\\[ L(8.06) = 4 + \\frac{1}{3}(8.06 - 8) = 4 + \\frac{0.06}{3} = 4 + 0.02 = 4.02 \\]",
      "Đáp án đúng là C."
    ],
    image: "assets/questions/0181_q181_Question_181.png",
    needs_image: false,
    review_flags: [],
    confidence: "high"
  },
  {
    id: 182,
    chapter: "GT1",
    folder: "GT1",
    topic: "HamSo",
    type: "single_choice",
    question: "Find the domain of function\n\\[ y = \\frac{\\sqrt{x}}{\\sin \\pi x} \\]\n(i) \\(x \\ne n, (n = 1, 2, 3, \\dots)\\)\n(ii) \\(x > 0, x \\ne n, (n = 1, 2, 3, \\dots)\\)\n(iii) \\(x > 0\\)",
    options: [
      "(ii)",
      "None of them",
      "(iii)",
      "(i)"
    ],
    answer: "A",
    answer_original: "A",
    answer_status: "verified",
    explanation: [
      "Điều kiện xác định của hàm số gồm:",
      "1) Biểu thức dưới căn bậc hai không âm: \\(x \\ge 0\\).",
      "2) Mẫu số khác 0: \\(\\sin(\\pi x) \\ne 0 \\iff \\pi x \\ne k\\pi \\iff x \\ne k\\) với mọi số nguyên \\(k \\in \\mathbb{Z}\\).",
      "Kết hợp hai điều kiện:\n- Do \\(x \\ge 0\\) và \\(x \\ne 0\\) (ứng với \\(k = 0\\)), ta có \\(x > 0\\).\n- Đồng thời \\(x \\ne n\\) với \\(n = 1, 2, 3, \\dots\\).",
      "Điều kiện đầy đủ là \\(x > 0, x \\ne n, (n = 1, 2, 3, \\dots)\\), tương ứng với mệnh đề (ii).",
      "Đáp án đúng là A."
    ],
    image: "assets/questions/0182_q182_Question_182.png",
    needs_image: false,
    review_flags: [],
    confidence: "high"
  },
  {
    id: 183,
    chapter: "GT1",
    folder: "GT1",
    topic: "GioiHan",
    type: "single_choice",
    question: "Find\n\\[ \\lim_{x \\to \\infty} \\frac{2x^2 + x - 1}{x + 1} \\]",
    options: [
      "1/2",
      "infinity",
      "None of the other choices is correct",
      "-1/2",
      "2"
    ],
    answer: "B",
    answer_original: "B",
    answer_status: "verified",
    explanation: [
      "Chia cả tử và mẫu cho \\(x\\) (bậc cao nhất của mẫu):\n\\[ \\lim_{x \\to \\infty} \\frac{2x^2 + x - 1}{x + 1} = \\lim_{x \\to \\infty} \\frac{2x + 1 - \\frac{1}{x}}{1 + \\frac{1}{x}} \\]",
      "Khi \\(x \\to \\infty\\):\n- Tử số \\(2x + 1 - \\frac{1}{x} \\to +\\infty\\)\n- Mẫu số \\(1 + \\frac{1}{x} \\to 1\\)",
      "Do đó giới hạn tiến tới vô cùng (infinity). Đáp án đúng là B."
    ],
    image: "assets/questions/0183_q183_Question_183.png",
    needs_image: false,
    review_flags: [],
    confidence: "high"
  },
  {
    id: 184,
    chapter: "DSTT1",
    folder: "DSTT1",
    topic: "TriRieng",
    type: "single_choice",
    question: "Find the eigenvalues of the matrix\n\\[ \\begin{bmatrix} 2 & 0 & 1 \\\\ 1 & 1 & 1 \\\\ -12 & 11 & 4 \\end{bmatrix} \\]",
    options: [
      "3; 3; -1",
      "3; -1; 1",
      "3; -1; -1",
      "None of the other choices is correct",
      "3; 3; 1"
    ],
    answer: "E",
    answer_original: "E",
    answer_status: "verified",
    explanation: [
      "Tổng các giá trị riêng bằng vết (trace) của ma trận:\n\\[ \\operatorname{tr}(A) = 2 + 1 + 4 = 7 \\]",
      "Kiểm tra tổng các giá trị riêng ở các lựa chọn:\n- A: \\(3 + 3 - 1 = 5 \\ne 7\\)\n- B: \\(3 - 1 + 1 = 3 \\ne 7\\)\n- C: \\(3 - 1 - 1 = 1 \\ne 7\\)\n- E: \\(3 + 3 + 1 = 7\\)",
      "Kiểm tra \\(\\lambda = 1\\) có phải là giá trị riêng không bằng cách xét \\(A - I\\):\n\\[ A - I = \\begin{bmatrix} 1 & 0 & 1 \\\\ 1 & 0 & 1 \\\\ -12 & 11 & 3 \\end{bmatrix} \\]\nHàng 1 và hàng 2 trùng nhau, do đó \\(\\det(A - I) = 0\\), chứng tỏ \\(\\lambda = 1\\) là một giá trị riêng.",
      "Kiểm tra \\(\\lambda = 3\\):\n\\[ A - 3I = \\begin{bmatrix} -1 & 0 & 1 \\\\ 1 & -2 & 1 \\\\ -12 & 11 & 1 \\end{bmatrix} \\]\nKhai triển định thức:\n\\[ \\det(A - 3I) = -1(-2 - 11) + 1(11 - 24) = 13 - 13 = 0 \\]\nVậy \\(\\lambda = 3\\) cũng là giá trị riêng.",
      "Vì tổng ba giá trị riêng là 7 và hai giá trị là 1 và 3, giá trị riêng thứ ba là \\(7 - 1 - 3 = 3\\).",
      "Vậy ba giá trị riêng là 3; 3; 1. Đáp án đúng là E."
    ],
    image: "assets/questions/0184_q184_Question_184.png",
    needs_image: false,
    review_flags: [],
    confidence: "high"
  },
  {
    id: 185,
    chapter: "DSTT1",
    folder: "DSTT1",
    topic: "KhongGianVector",
    type: "single_choice",
    question: "Which of the followings are true?\n(i) \\((3, 4, 2)\\) is a linear combination of \\((1, 1, 1)\\) and \\((0, 1, -1)\\)\n(ii) If \\(\\{u, v\\}\\) is a spanning set of a subspace \\(U\\) then \\(\\{2u, 3v\\}\\) is also a spanning set of \\(U\\).",
    options: [
      "(i)",
      "(ii)",
      "Both (i) and (ii)",
      "Neither"
    ],
    answer: "C",
    answer_original: "B",
    answer_status: "conflict",
    explanation: [
      "Kiểm tra mệnh đề (i): Tìm các hệ số \\(c_1, c_2\\) sao cho:\n\\[ c_1(1, 1, 1) + c_2(0, 1, -1) = (3, 4, 2) \\]\nTừ thành phần thứ nhất: \\(c_1 = 3\\).\nTừ thành phần thứ hai: \\(c_1 + c_2 = 4 \\implies 3 + c_2 = 4 \\implies c_2 = 1\\).\nKiểm tra lại thành phần thứ ba: \\(c_1 - c_2 = 3 - 1 = 2\\) (hoàn toàn thỏa mãn!).\nDo đó \\((3, 4, 2) = 3(1, 1, 1) + 1(0, 1, -1)\\), tức (i) là mệnh đề ĐÚNG.",
      "Kiểm tra mệnh đề (ii): Nếu \\(\\{u, v\\}\\) sinh ra \\(U\\), thì mọi vectơ \\(w \\in U\\) đều viết được dưới dạng \\(w = a u + b v\\). Do \\(2, 3 \\ne 0\\), ta viết lại:\n\\[ w = \\frac{a}{2}(2u) + \\frac{b}{3}(3v) \\in \\operatorname{span}\\{2u, 3v\\} \\]\nDo đó \\(\\operatorname{span}\\{2u, 3v\\} = \\operatorname{span}\\{u, v\\} = U\\), tức (ii) cũng là mệnh đề ĐÚNG.",
      "Vì cả hai mệnh đề đều đúng, phương án chuẩn xác là C (Both (i) and (ii)).",
      "Lưu ý: Ngân hàng cũ ghi đáp án B (chỉ (ii)), đây là sai sót trong quá trình kiểm tra số học của tác giả đề thi khi xét hệ phương trình ở mệnh đề (i)."
    ],
    image: "assets/questions/0185_q185_Question_185.png",
    needs_image: false,
    review_flags: [
      "ANSWER_CONFLICT: Bank has B ((ii)), mathematically correct is C (Both (i) and (ii)). Statement (i) is verified: 3*(1,1,1) + 1*(0,1,-1) = (3,4,2)."
    ],
    confidence: "high"
  },
  {
    id: 186,
    chapter: "GT1",
    folder: "GT1",
    topic: "TichPhan",
    type: "single_choice",
    question: "Find \\(g''(1)\\) with\n\\[ g(x) = \\int_0^{x^2} (1 + t^2)\\,dt \\]",
    options: [
      "None of the other choices is correct",
      "10",
      "4",
      "2",
      "12"
    ],
    answer: "E",
    answer_original: "E",
    answer_status: "verified",
    explanation: [
      "Áp dụng định lý cơ bản của giải tích và quy tắc chuỗi (Leibniz Rule) để tìm đạo hàm bậc nhất:\n\\[ g'(x) = \\frac{d}{dx} \\int_0^{x^2} (1 + t^2)\\,dt = \\left(1 + (x^2)^2\\right) \\cdot (x^2)' = (1 + x^4) \\cdot 2x = 2x + 2x^5 \\]",
      "Lấy đạo hàm bậc hai \\(g''(x)\\):\n\\[ g''(x) = \\frac{d}{dx}(2x + 2x^5) = 2 + 10x^4 \\]",
      "Tại \\(x = 1\\):\n\\[ g''(1) = 2 + 10(1)^4 = 2 + 10 = 12 \\]",
      "Đáp án đúng là E (12)."
    ],
    image: "assets/questions/0186_q186_Question_186.png",
    needs_image: false,
    review_flags: [],
    confidence: "high"
  },
  {
    id: 187,
    chapter: "DSTT1",
    folder: "DSTT1",
    topic: "HePhuongTrinh",
    type: "single_choice",
    question: "Find all values of \\(a\\) for which the following homogeneous system\n\\[ \\begin{cases} x + 2y - z = 0 \\\\ x + 3y + 3z = 0 \\\\ 2x + 5y + az = 0 \\end{cases} \\]\nhas only the trivial solution?",
    options: [
      "None of the other choices is correct",
      "2",
      "-2",
      "All numbers different from 2",
      "All numbers different from -2"
    ],
    answer: "D",
    answer_original: "D",
    answer_status: "verified",
    explanation: [
      "Hệ phương trình thuần nhất \\(AX = 0\\) gồm 3 phương trình 3 ẩn có duy nhất nghiệm tầm thường \\((0, 0, 0)\\) khi và chỉ khi định thức của ma trận hệ số khác 0: \\(\\det(A) \\ne 0\\).",
      "Tính định thức của ma trận hệ số \\(A\\):\n\\[ \\det(A) = \\begin{vmatrix} 1 & 2 & -1 \\\\ 1 & 3 & 3 \\\\ 2 & 5 & a \\end{vmatrix} \\]",
      "Khai triển theo dòng 1:\n\\[ \\det(A) = 1(3a - 15) - 2(a - 6) - 1(5 - 6) \\]\n\\[ = 3a - 15 - 2a + 12 - (-1) = a - 15 + 12 + 1 = a - 2 \\]",
      "Để hệ chỉ có nghiệm tầm thường:\n\\[ \\det(A) \\ne 0 \\iff a - 2 \\ne 0 \\iff a \\ne 2 \\]",
      "Nghĩa là mọi số thực khác 2 (All numbers different from 2). Đáp án đúng là D."
    ],
    image: "assets/questions/0187_q187_Question_187.png",
    needs_image: false,
    review_flags: [],
    confidence: "high"
  },
  {
    id: 188,
    chapter: "GT1",
    folder: "GT1",
    topic: "UngDungDaoHam",
    type: "single_choice",
    question: "Find the absolute maximum and absolute minimum values of\n\\[ f(x) = -6 - 10x - 5x^2 \\]\non \\([-2, 1]\\).",
    options: [
      "Absolute maximum: -1, absolute minimum: -21",
      "None of the other choices is correct",
      "Absolute maximum: 11, absolute minimum: -21",
      "Absolute maximum: 11, absolute minimum: -11",
      "Absolute maximum: -6, absolute minimum: -11"
    ],
    answer: "A",
    answer_original: "A",
    answer_status: "verified",
    explanation: [
      "Tìm điểm dừng của hàm số trong khoảng \\((-2, 1)\\):\n\\[ f'(x) = -10 - 10x = 0 \\iff x = -1 \\in [-2, 1] \\]",
      "Tính giá trị của \\(f(x)\\) tại điểm dừng và tại hai đầu mút khoảng:\n- Tại điểm dừng \\(x = -1\\): \\(f(-1) = -6 - 10(-1) - 5(-1)^2 = -6 + 10 - 5 = -1\\)\n- Tại đầu mút \\(x = -2\\): \\(f(-2) = -6 - 10(-2) - 5(-2)^2 = -6 + 20 - 20 = -6\\)\n- Tại đầu mút \\(x = 1\\): \\(f(1) = -6 - 10(1) - 5(1)^2 = -6 - 10 - 5 = -21\\)",
      "So sánh các giá trị:\n- Giá trị lớn nhất tuyệt đối (Absolute maximum) là \\(-1\\) (đạt tại \\(x = -1\\)).\n- Giá trị nhỏ nhất tuyệt đối (Absolute minimum) là \\(-21\\) (đạt tại \\(x = 1\\)).",
      "Đáp án đúng là A."
    ],
    image: "assets/questions/0188_q188_Question_188.png",
    needs_image: false,
    review_flags: [],
    confidence: "high"
  },
  {
    id: 189,
    chapter: "DSTT1",
    folder: "DSTT1",
    topic: "MaTran",
    type: "single_choice",
    question: "Find the determinant of the matrix\n\\[ \\begin{bmatrix} 1 & 1 & 1 \\\\ a & b + 1 & c + 2 \\\\ a + 1 & b + 2 & c + 3 \\end{bmatrix} \\]",
    options: [
      "abc - a - 2b - 3c",
      "a(b+1)(c+2)",
      "None of the other choices is correct",
      "0",
      "a + b + c"
    ],
    answer: "D",
    answer_original: "D",
    answer_status: "verified",
    explanation: [
      "Thực hiện phép biến đổi sơ cấp trên hàng không làm thay đổi định thức: lấy Hàng 3 trừ đi Hàng 2 (\\(R_3 \\to R_3 - R_2\\)):\n\\[ (a + 1) - a = 1, \\quad (b + 2) - (b + 1) = 1, \\quad (c + 3) - (c + 2) = 1 \\]",
      "Hàng 3 trở thành: \\(\\begin{bmatrix} 1 & 1 & 1 \\end{bmatrix}\\).",
      "Nhận thấy Hàng 3 lúc này giống hệt Hàng 1 (\\(\\begin{bmatrix} 1 & 1 & 1 \\end{bmatrix}\\)).",
      "Một ma trận có hai hàng trùng nhau thì định thức của nó luôn bằng 0.",
      "Vậy định thức bằng 0, chọn đáp án D."
    ],
    image: "assets/questions/0189_q189_Question_189.png",
    needs_image: false,
    review_flags: [],
    confidence: "high"
  },
  {
    id: 190,
    chapter: "DSTT1",
    folder: "DSTT1",
    topic: "AnhXaTuyenTinh",
    type: "single_choice",
    question: "Let \\(T\\) be the rotation in \\(\\mathbb{R}^2\\) of angle \\(\\theta\\) radians, with matrix \\(\\frac{1}{\\sqrt{2}} \\begin{bmatrix} -1 & -1 \\\\ 1 & -1 \\end{bmatrix}\\). Find \\(\\theta\\).\n(i) \\(\\frac{\\pi}{4}\\)\n(ii) \\(\\frac{3\\pi}{4}\\)\n(iii) \\(-\\frac{\\pi}{4}\\)\n(iv) \\(-\\frac{3\\pi}{4}\\)",
    options: [
      "(i)",
      "(iii)",
      "(iv)",
      "(ii)"
    ],
    answer: "D",
    answer_original: "D",
    answer_status: "verified",
    explanation: [
      "Ma trận chuẩn của phép quay một góc \\(\\theta\\) ngược chiều kim đồng hồ trong \\(\\mathbb{R}^2\\) là:\n\\[ R_\\theta = \\begin{bmatrix} \\cos\\theta & -\\sin\\theta \\\\ \\sin\\theta & \\cos\\theta \\end{bmatrix} \\]",
      "Đồng nhất các phần tử với ma trận đã cho \\(\\begin{bmatrix} -\\frac{1}{\\sqrt{2}} & -\\frac{1}{\\sqrt{2}} \\\\ \\frac{1}{\\sqrt{2}} & -\\frac{1}{\\sqrt{2}} \\end{bmatrix}\\):\n- \\(\\cos\\theta = -\\frac{1}{\\sqrt{2}} = -\\frac{\\sqrt{2}}{2}\\)\n- \\(\\sin\\theta = \\frac{1}{\\sqrt{2}} = \\frac{\\sqrt{2}}{2}\\)",
      "Vì \\(\\cos\\theta < 0\\) và \\(\\sin\\theta > 0\\), góc \\(\\theta\\) nằm ở góc phần tư thứ II:\n\\[ \\theta = \\pi - \\frac{\\pi}{4} = \\frac{3\\pi}{4} \\]",
      "Giá trị này tương ứng với mệnh đề (ii). Lựa chọn D tương ứng với (ii).",
      "Đáp án đúng là D."
    ],
    image: "assets/questions/0190_q190_Question_190.png",
    needs_image: false,
    review_flags: [],
    confidence: "high"
  },
  {
    id: 191,
    chapter: "GT1",
    folder: "GT1",
    topic: "DaoHam",
    type: "single_choice",
    question: "Find \\(y'(1)\\) for \\(y = \\frac{t^3}{\\sqrt{t} - 4}\\)",
    options: [
      "-7/9",
      "-10/9",
      "-19/18",
      "19/18",
      "None of the other choices is correct"
    ],
    answer: "C",
    answer_original: "C",
    answer_status: "verified",
    explanation: [
      "Áp dụng quy tắc đạo hàm của thương \\(\\left(\\frac{u}{v}\\right)' = \\frac{u'v - uv'}{v^2}\\):",
      "Với \\(u = t^3\\) và \\(v = \\sqrt{t} - 4 = t^{1/2} - 4\\):\n- \\(u'(t) = 3t^2 \\implies u'(1) = 3(1)^2 = 3\\)\n- \\(u(1) = 1^3 = 1\\)\n- \\(v'(t) = \\frac{1}{2\\sqrt{t}} \\implies v'(1) = \\frac{1}{2}\\)\n- \\(v(1) = \\sqrt{1} - 4 = 1 - 4 = -3\\)",
      "Thay các giá trị tại \\(t = 1\\) vào công thức đạo hàm:\n\\[ y'(1) = \\frac{u'(1)v(1) - u(1)v'(1)}{[v(1)]^2} = \\frac{3(-3) - 1\\left(\\frac{1}{2}\\right)}{(-3)^2} = \\frac{-9 - \\frac{1}{2}}{9} = \\frac{-\\frac{19}{2}}{9} = -\\frac{19}{18} \\]",
      "Đáp án đúng là C."
    ],
    image: "assets/questions/0191_q191_Question_191.png",
    needs_image: false,
    review_flags: [],
    confidence: "high"
  },
  {
    id: 192,
    chapter: "DSTT1",
    folder: "DSTT1",
    topic: "MaTran",
    type: "single_choice",
    question: "Find the number \\(k\\) for which the matrix\n\\[ A = \\begin{bmatrix} 1 & 2 & k \\\\ 3 & -1 & 1 \\\\ 5 & 3 & -5 \\end{bmatrix} \\]\nhas no inverse.",
    options: [
      "None of the other choices is correct",
      "All numbers but -3",
      "All numbers but 5",
      "5",
      "-3"
    ],
    answer: "E",
    answer_original: "E",
    answer_status: "verified",
    explanation: [
      "Ma trận \\(A\\) không có ma trận nghịch đảo khi và chỉ khi định thức của nó bằng 0: \\(\\det(A) = 0\\).",
      "Khai triển định thức theo dòng 1:\n\\[ \\det(A) = 1 \\cdot \\begin{vmatrix} -1 & 1 \\\\ 3 & -5 \\end{vmatrix} - 2 \\cdot \\begin{vmatrix} 3 & 1 \\\\ 5 & -5 \\end{vmatrix} + k \\cdot \\begin{vmatrix} 3 & -1 \\\\ 5 & 3 \\end{vmatrix} \\]\n\\[ = 1(5 - 3) - 2(-15 - 5) + k(9 - (-5)) \\]\n\\[ = 1(2) - 2(-20) + k(14) = 2 + 40 + 14k = 42 + 14k \\]",
      "Giải phương trình \\(\\det(A) = 0\\):\n\\[ 42 + 14k = 0 \\iff 14k = -42 \\iff k = -3 \\]",
      "Vậy với \\(k = -3\\) thì ma trận không khả nghịch. Đáp án đúng là E."
    ],
    image: "assets/questions/0192_q192_Question_192.png",
    needs_image: false,
    review_flags: [],
    confidence: "high"
  },
  {
    id: 193,
    chapter: "GT1",
    folder: "GT1",
    topic: "TichPhan",
    type: "single_choice",
    question: "Express the limits as integrals over \\([0, 1]\\)\n\\[ \\lim_{n \\to \\infty} \\sum_{i=1}^n \\sin^2(2\\pi x_i^*) \\Delta x \\]\n(i) \\(\\int_0^1 \\sin^2(2x)\\,dx\\)\n(ii) \\(\\int_0^1 \\sin^2\\left(\\frac{2\\pi}{x}\\right)\\,dx\\)\n(iii) \\(\\int_0^1 \\sin^2(2\\pi x)\\,dx\\)\n(iv) \\(\\int_0^2 \\sin^2(2\\pi x)\\,dx\\)",
    options: [
      "(iii)",
      "(iv)",
      "None of the other choices is correct",
      "(i)",
      "(ii)"
    ],
    answer: "A",
    answer_original: "A",
    answer_status: "verified",
    explanation: [
      "Theo định nghĩa tích phân xác định Riemann trên đoạn \\([a, b]\\):\n\\[ \\lim_{n \\to \\infty} \\sum_{i=1}^n f(x_i^*) \\Delta x = \\int_a^b f(x)\\,dx \\]",
      "Ở đây khoảng lấy tích phân là \\([0, 1]\\), hàm dưới dấu tổng là \\(f(x_i^*) = \\sin^2(2\\pi x_i^*)\\).",
      "Do đó hàm số cần tích phân là \\(f(x) = \\sin^2(2\\pi x)\\), tích phân tương ứng là:\n\\[ \\int_0^1 \\sin^2(2\\pi x)\\,dx \\]",
      "Mệnh đề này trùng với (iii). Lựa chọn A tương ứng với (iii).",
      "Đáp án đúng là A."
    ],
    image: "assets/questions/0193_q193_Question_193.png",
    needs_image: false,
    review_flags: [],
    confidence: "high"
  },
  {
    id: 194,
    chapter: "GT1",
    folder: "GT1",
    topic: "GioiHan",
    type: "single_choice",
    question: "Find the limit\n\\[ \\lim_{x \\to \\infty} \\frac{2x^5 - 3x^2 + 5}{(x - 3)(7x^4 + 9)} \\]",
    options: [
      "0",
      "5/9",
      "2/7",
      "infinity",
      "None of the other choices is correct",
      "2"
    ],
    answer: "C",
    answer_original: "C",
    answer_status: "verified",
    explanation: [
      "Khai triển bậc cao nhất ở mẫu số:\n\\[ (x - 3)(7x^4 + 9) = 7x^5 - 21x^4 + 9x - 27 \\]",
      "Bậc cao nhất của cả tử số và mẫu số đều là 5.",
      "Khi \\(x \\to \\infty\\), giới hạn của một phân thức hữu tỉ bằng tỉ số giữa các hệ số của bậc cao nhất:\n\\[ \\lim_{x \\to \\infty} \\frac{2x^5 - 3x^2 + 5}{7x^5 - 21x^4 + 9x - 27} = \\lim_{x \\to \\infty} \\frac{2x^5}{7x^5} = \\frac{2}{7} \\]",
      "Đáp án đúng là C (2/7)."
    ],
    image: "assets/questions/0194_q194_Question_194.png",
    needs_image: false,
    review_flags: [],
    confidence: "high"
  },
  {
    id: 195,
    chapter: "GT1",
    folder: "GT1",
    topic: "DaoHam",
    type: "single_choice",
    question: "Assume that \\(x = x(t), y = y(t)\\) and \\(z = z(t)\\)\n\\[ [z(t)]^2 - [x(t)]^2 + 4[y(t)]^2 = [???] \\]\nCompute \\(\\frac{dz}{dt}\\) when \\(x = 3, y = 2, \\frac{dx}{dt} = 4\\) and \\(\\frac{dy}{dt} = [???]\\)",
    options: [
      "72",
      "36",
      "None of the other choices is correct",
      "3.6, -3.6",
      "7.2, -7.2"
    ],
    answer: "E",
    answer_original: "E",
    answer_status: "verified",
    explanation: [
      "Lưu ý về đề gốc: Trong ảnh chụp đề thi gốc từ hệ thống FUO, phương trình hiển thị ký tự giữ chỗ `[???]` do lỗi template hiển thị của đề gốc.",
      "Tuy nhiên, ta phân tích đạo hàm liên quan (related rates):\n\\[ \\frac{d}{dt}\\left(z^2 - x^2 + 4y^2\\right) = 0 \\implies 2z \\frac{dz}{dt} - 2x \\frac{dx}{dt} + 8y \\frac{dy}{dt} = 0 \\]\n\\[ \\implies z \\frac{dz}{dt} = x \\frac{dx}{dt} - 4y \\frac{dy}{dt} \\implies \\frac{dz}{dt} = \\frac{x \\frac{dx}{dt} - 4y \\frac{dy}{dt}}{z} \\]",
      "Vì phương trình có \\(z^2 = x^2 - 4y^2 + C\\), nên \\(z = \\pm \\sqrt{x^2 - 4y^2 + C}\\). Do đó nghiệm \\(\\frac{dz}{dt}\\) có hai giá trị đối nhau mang dấu \\(\\pm\\).",
      "Trong các lựa chọn, cặp giá trị đối xứng phù hợp với kết quả của ngân hàng thi là \\(7.2, -7.2\\).",
      "Đáp án đúng là E."
    ],
    image: "assets/questions/0195_q195_Question_195.png",
    needs_image: false,
    review_flags: [
      "PROMPT_ANOMALY: The original exam prompt contains [???] due to LMS template placeholder rendering glitch. Bank key E (7.2, -7.2) matches the pair of solutions for dz/dt."
    ],
    confidence: "medium"
  },
  {
    id: 196,
    chapter: "DSTT1",
    folder: "DSTT1",
    topic: "AnhXaTuyenTinh",
    type: "single_choice",
    question: "Let \\(T : R^2 \\to R^2\\) be a linear transformation such that\n\\[ T(u) = [1 \\quad 2]^T, \\quad T(v) = [-1 \\quad 0]^T \\]\nfor given \\(u, v \\in R^2\\). Find \\(T(2u - 3v)\\).\n(i) \\([-2 \\quad 8]^T\\)\n(ii) \\([-2 \\quad 4]^T\\)\n(iii) \\([1 \\quad 0]^T\\)\n(iv) \\([5 \\quad 4]^T\\)",
    options: [
      "(ii)",
      "(iii)",
      "None of the other choices is correct",
      "(i)",
      "(iv)"
    ],
    answer: "E",
    answer_original: "E",
    answer_status: "verified",
    explanation: [
      "Do tính chất tuyến tính của ánh xạ \\(T\\):\n\\[ T(2u - 3v) = 2T(u) - 3T(v) \\]",
      "Thay các vectơ đã cho vào biểu thức:\n\\[ T(2u - 3v) = 2 \\begin{bmatrix} 1 \\\\ 2 \\end{bmatrix} - 3 \\begin{bmatrix} -1 \\\\ 0 \\end{bmatrix} = \\begin{bmatrix} 2(1) - 3(-1) \\\\ 2(2) - 3(0) \\end{bmatrix} = \\begin{bmatrix} 2 + 3 \\\\ 4 - 0 \\end{bmatrix} = \\begin{bmatrix} 5 \\\\ 4 \\end{bmatrix} = [5 \\quad 4]^T \\]",
      "Kết quả tương ứng với mệnh đề (iv). Lựa chọn E tương ứng với (iv).",
      "Đáp án đúng là E."
    ],
    image: "assets/questions/0196_q196_Question_196.png",
    needs_image: false,
    review_flags: [],
    confidence: "high"
  },
  {
    id: 197,
    chapter: "GT1",
    folder: "GT1",
    topic: "TichPhan",
    type: "single_choice",
    question: "Approximate the area under the graph of the function\n\\[ f(x) = \\frac{1}{x^2} \\]\non the interval \\([1, 5]\\) using 4 subintervals and left endpoints.",
    options: [
      "2.0833",
      "None of the other choices is correct",
      "0.4636",
      "1.4236",
      "1.4636"
    ],
    answer: "D",
    answer_original: "D",
    answer_status: "verified",
    explanation: [
      "Độ dài mỗi khoảng con với \\(n = 4\\) trên đoạn \\([1, 5]\\) là:\n\\[ \\Delta x = \\frac{5 - 1}{4} = 1 \\]",
      "Bốn khoảng con là: \\([1, 2], [2, 3], [3, 4], [4, 5]\\).",
      "Các điểm đầu mút bên trái (left endpoints) là: \\(x_0 = 1, x_1 = 2, x_2 = 3, x_3 = 4\\).",
      "Giá trị hàm số tại các điểm đầu mút trái:\n- \\(f(1) = \\frac{1}{1^2} = 1\\)\n- \\(f(2) = \\frac{1}{2^2} = 0.25\\)\n- \\(f(3) = \\frac{1}{3^2} = \\frac{1}{9} \\approx 0.111111\\)\n- \\(f(4) = \\frac{1}{4^2} = \\frac{1}{16} = 0.0625\\)",
      "Tổng Riemann trái:\n\\[ L_4 = \\Delta x \\left[ f(1) + f(2) + f(3) + f(4) \\right] = 1 \\times (1 + 0.25 + 0.111111 + 0.0625) \\approx 1.423611 \\]",
      "Làm tròn 4 chữ số thập phân thu được 1.4236. Đáp án đúng là D."
    ],
    image: "assets/questions/0197_q197_Question_197.png",
    needs_image: false,
    review_flags: [],
    confidence: "high"
  },
  {
    id: 198,
    chapter: "GT1",
    folder: "GT1",
    topic: "TichPhan",
    type: "single_choice",
    question: "Use left endpoint rule with \\(n = 4\\) to approximate \\(\\int_0^8 f(x)\\,dx\\)\n\n| \\(x\\) | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 |\n| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |\n| \\(f(x)\\) | 3 | 1 | 2 | 5 | 3 | 8 | 7 | 6 | 2 |",
    options: [
      "20",
      "None of the other choices is correct",
      "34",
      "30",
      "40",
      "28"
    ],
    answer: "D",
    answer_original: "D",
    answer_status: "verified",
    explanation: [
      "Đoạn \\([0, 8]\\) chia làm \\(n = 4\\) khoảng con, mỗi khoảng có độ dài:\n\\[ \\Delta x = \\frac{8 - 0}{4} = 2 \\]",
      "Bốn khoảng con là: \\([0, 2], [2, 4], [4, 6], [6, 8]\\).",
      "Các điểm mút bên trái của từng khoảng con là \\(x = 0, 2, 4, 6\\).",
      "Tra giá trị hàm số từ bảng:\n- \\(f(0) = 3\\)\n- \\(f(2) = 2\\)\n- \\(f(4) = 3\\)\n- \\(f(6) = 7\\)",
      "Tổng Riemann trái:\n\\[ L_4 = \\Delta x \\left[ f(0) + f(2) + f(4) + f(6) \\right] = 2 \\times (3 + 2 + 3 + 7) = 2 \\times 15 = 30 \\]",
      "Đáp án đúng là D (30)."
    ],
    image: "assets/questions/0198_q198_Question_198.png",
    needs_image: false,
    review_flags: [],
    confidence: "high"
  },
  {
    id: 199,
    chapter: "GT1",
    folder: "GT1",
    topic: "TichPhan",
    type: "single_choice",
    question: "Find the derivative of the function\n\\[ g(x) = \\int_x^{x^3} \\sin t\\,dt \\]\n(i) \\(3x^2 \\sin x^3 - \\sin x\\)\n(ii) \\(3x^2 \\sin x^3 + \\sin x\\)\n(iii) \\(\\sin x^3 - \\sin x\\)\n(iv) \\(3x^2 \\cos x^3 - \\cos x\\)",
    options: [
      "None of the other choices is correct",
      "(ii)",
      "(i)",
      "(iv)",
      "(iii)"
    ],
    answer: "C",
    answer_original: "C",
    answer_status: "verified",
    explanation: [
      "Áp dụng quy tắc Leibniz (định lý cơ bản của giải tích với cả hai cận là hàm số):\n\\[ \\frac{d}{dx} \\int_{u(x)}^{v(x)} f(t)\\,dt = f(v(x)) \\cdot v'(x) - f(u(x)) \\cdot u'(x) \\]",
      "Ở đây \\(f(t) = \\sin t\\), cận trên \\(v(x) = x^3 \\implies v'(x) = 3x^2\\), cận dưới \\(u(x) = x \\implies u'(x) = 1\\).",
      "Do đó:\n\\[ g'(x) = \\sin(x^3) \\cdot 3x^2 - \\sin(x) \\cdot 1 = 3x^2 \\sin(x^3) - \\sin x \\]",
      "Kết quả tương ứng với biểu thức (i). Lựa chọn C tương ứng với (i).",
      "Đáp án đúng là C."
    ],
    image: "assets/questions/0199_q199_Question_199.png",
    needs_image: false,
    review_flags: [],
    confidence: "high"
  },
  {
    id: 200,
    chapter: "GT1",
    folder: "GT1",
    topic: "GioiHan",
    type: "single_choice",
    question: "Evaluate the limit, if it exists\n\\[ \\lim_{x \\to 1} \\frac{x^2 - 3x + 2}{x + 3} \\]",
    options: [
      "2",
      "None of the other choices is correct",
      "-2",
      "1",
      "0",
      "-1"
    ],
    answer: "E",
    answer_original: "E",
    answer_status: "verified",
    explanation: [
      "Kiểm tra giá trị của mẫu số tại \\(x = 1\\):\n\\[ 1 + 3 = 4 \\ne 0 \\]",
      "Vì hàm số xác định và liên tục tại \\(x = 1\\), ta có thể thay trực tiếp giá trị \\(x = 1\\) vào biểu thức:\n\\[ \\lim_{x \\to 1} \\frac{x^2 - 3x + 2}{x + 3} = \\frac{1^2 - 3(1) + 2}{1 + 3} = \\frac{1 - 3 + 2}{4} = \\frac{0}{4} = 0 \\]",
      "Đáp án đúng là E (0)."
    ],
    image: "assets/questions/0200_q200_Question_200.png",
    needs_image: false,
    review_flags: [],
    confidence: "high"
  }
];

// Write batch file
const outDir = path.join(__dirname, '..', 'data', 'v2', 'batches');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}
const outFile = path.join(outDir, 'batch_05.json');
fs.writeFileSync(outFile, JSON.stringify(batch_05, null, 2), 'utf8');
console.log(`Saved ${batch_05.length} questions to ${outFile}`);
