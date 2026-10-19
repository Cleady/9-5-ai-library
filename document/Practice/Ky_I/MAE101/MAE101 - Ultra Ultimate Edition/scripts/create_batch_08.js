const fs = require('fs');
const path = require('path');

const batch08 = [
  {
    "id": 281,
    "chapter": "GT1",
    "folder": "GT1",
    "topic": "TichPhan",
    "type": "single_choice",
    "question": "Evaluate \\(\\int \\frac{19}{2+5y} dy\\)\n(i) \\((19/5)(2+5y)^{-2} + C\\)\n(ii) \\((9/5)\\ln|2+5y| + C\\)\n(iii) \\((1/5)\\ln|2+5y| + C\\)\n(iv) \\((19/5)\\ln|2+5y| + C\\)",
    "options": [
      "None of the other choices is correct",
      "(ii)",
      "(i)",
      "(iii)",
      "(iv)"
    ],
    "answer": "E",
    "answer_original": "E",
    "answer_status": "verified",
    "explanation": [
      "Đặt \\(u = 2 + 5y \\implies du = 5 dy \\implies dy = \\frac{du}{5}\\).",
      "Thay vào tích phân:\n\\[ \\int \\frac{19}{2+5y} dy = 19 \\int \\frac{1}{u} \\cdot \\frac{du}{5} = \\frac{19}{5} \\ln|u| + C = \\frac{19}{5} \\ln|2+5y| + C \\]",
      "Biểu thức này trùng khớp với khẳng định (iv). Lựa chọn E tương ứng với (iv).",
      "Vậy đáp án đúng là E."
    ],
    "image": "assets/questions/0281_q281_Question_281.png",
    "needs_image": false,
    "review_flags": [],
    "confidence": "high"
  },
  {
    "id": 282,
    "chapter": "GT1",
    "folder": "GT1",
    "topic": "GioiHan",
    "type": "single_choice",
    "question": "Which statement is true for the function \\(f(x) = \\frac{2x}{x^2+1} \\cos x\\) ?",
    "options": [
      "The graph of \\(f(x)\\) has a vertical asymptote of \\(x = 0\\) and no horizontal asymptote",
      "The graph of \\(f(x)\\) has a vertical asymptote of \\(x = 0\\) and a horizontal asymptote of \\(y = 0\\)",
      "None of the other choices is correct",
      "The graph of \\(f(x)\\) has a horizontal asymptote of \\(y = 0\\) and no vertical asymptote"
    ],
    "answer": "D",
    "answer_original": "D",
    "answer_status": "verified",
    "explanation": [
      "1) Xét tiệm cận đứng:\nMẫu số \\(x^2 + 1 \\ge 1 > 0\\) với mọi \\(x \\in \\mathbb{R}\\), do đó hàm số liên tục trên \\(\\mathbb{R}\\) và không có tiệm cận đứng.",
      "2) Xét tiệm cận ngang:\nTa có \\(|\\cos x| \\le 1\\) với mọi \\(x\\). Do đó:\n\\[ 0 \\le |f(x)| = \\left| \\frac{2x}{x^2+1} \\cos x \\right| \\le \\frac{2|x|}{x^2+1} \\]",
      "Khi \\(x \\to \\pm\\infty\\), \\(\\lim_{x \\to \\pm\\infty} \\frac{2|x|}{x^2+1} = 0\\). Theo định lý kẹp (Squeeze Theorem):\n\\[ \\lim_{x \\to \\pm\\infty} f(x) = 0 \\]",
      "Vậy đường thẳng \\(y = 0\\) là tiệm cận ngang của đồ thị hàm số.",
      "Do đó, đồ thị hàm số có tiệm cận ngang \\(y = 0\\) và không có tiệm cận đứng. Đáp án đúng là D."
    ],
    "image": "assets/questions/0282_q282_Question_282.png",
    "needs_image": false,
    "review_flags": [],
    "confidence": "high"
  },
  {
    "id": 283,
    "chapter": "DSTT1",
    "folder": "DSTT1",
    "topic": "VectorHinhHoc",
    "type": "single_choice",
    "question": "Simplify \\((a\\mathbf{u} + b\\mathbf{v}) \\times (c\\mathbf{u} + d\\mathbf{v})\\), where a, b, c, d are real numbers and \\(\\mathbf{u}, \\mathbf{v}\\) are vectors in \\(\\mathbb{R}^3\\).",
    "options": [
      "\\((ac - bd)\\mathbf{u} \\times \\mathbf{v}\\)",
      "\\((ad - bc)\\mathbf{u} \\times \\mathbf{v}\\)",
      "None of the choices is correct",
      "\\((ab - cd)\\mathbf{u} \\times \\mathbf{v}\\)",
      "\\((ad + bc)\\mathbf{u} \\times \\mathbf{v}\\)"
    ],
    "answer": "B",
    "answer_original": "B",
    "answer_status": "verified",
    "explanation": [
      "Sử dụng tính chất phân phối và tính phản xứng của tích có hướng trong \\(\\mathbb{R}^3\\):\n\\[ (a\\mathbf{u} + b\\mathbf{v}) \\times (c\\mathbf{u} + d\\mathbf{v}) = ac(\\mathbf{u} \\times \\mathbf{u}) + ad(\\mathbf{u} \\times \\mathbf{v}) + bc(\\mathbf{v} \\times \\mathbf{u}) + bd(\\mathbf{v} \\times \\mathbf{v}) \\]",
      "Do tích có hướng của một vectơ với chính nó bằng vectơ không:\n\\[ \\mathbf{u} \\times \\mathbf{u} = \\mathbf{0}, \\quad \\mathbf{v} \\times \\mathbf{v} = \\mathbf{0} \\]",
      "Và do tính phản đối xứng:\n\\[ \\mathbf{v} \\times \\mathbf{u} = -(\\mathbf{u} \\times \\mathbf{v}) \\]",
      "Thay vào biểu thức:\n\\[ = \\mathbf{0} + ad(\\mathbf{u} \\times \\mathbf{v}) - bc(\\mathbf{u} \\times \\mathbf{v}) + \\mathbf{0} = (ad - bc)(\\mathbf{u} \\times \\mathbf{v}) \\]",
      "Vậy đáp án đúng là B."
    ],
    "image": "assets/questions/0283_q283_Question_283.png",
    "needs_image": false,
    "review_flags": [],
    "confidence": "high"
  },
  {
    "id": 284,
    "chapter": "GT1",
    "folder": "GT1",
    "topic": "TichPhan",
    "type": "single_choice",
    "question": "Evaluate \\(\\int_e^{e^2} \\ln x \\, dx\\).\n(i) 1\n(ii) \\(2e^2\\)\n(iii) \\(e^2\\)\n(iv) \\(e\\)",
    "options": [
      "(ii)",
      "None of the other choices is correct",
      "(iii)",
      "(iv)",
      "(i)"
    ],
    "answer": "C",
    "answer_original": "C",
    "answer_status": "verified",
    "explanation": [
      "Sử dụng công thức tích phân từng phần \\(\\int u dv = uv - \\int v du\\) với \\(u = \\ln x, dv = dx \\implies du = \\frac{1}{x}dx, v = x\\):\n\\[ \\int \\ln x \\, dx = x\\ln x - \\int x \\cdot \\frac{1}{x} dx = x\\ln x - x \\]",
      "Thay cận từ \\(e\\) đến \\(e^2\\):\n\\[ \\left[ x\\ln x - x \\right]_e^{e^2} = (e^2 \\ln(e^2) - e^2) - (e\\ln e - e) \\]",
      "Tính từng giá trị:\n- Tại \\(e^2\\): \\(e^2(2) - e^2 = 2e^2 - e^2 = e^2\\)\n- Tại \\(e\\): \\(e(1) - e = 0\\)",
      "Hiệu số bằng \\(e^2 - 0 = e^2\\). Khẳng định này trùng với (iii). Lựa chọn C tương ứng với (iii).",
      "Vậy đáp án đúng là C."
    ],
    "image": "assets/questions/0284_q284_Question_284.png",
    "needs_image": false,
    "review_flags": [],
    "confidence": "high"
  },
  {
    "id": 285,
    "chapter": "DSTT1",
    "folder": "DSTT1",
    "topic": "HePhuongTrinh",
    "type": "single_choice",
    "question": "How many solutions would a HOMOGENEOUS system of linear equations of 4 equations and in 6 variables have?",
    "options": [
      "Unique solution",
      "Infinitely many solutions",
      "There is not enough information",
      "No solution"
    ],
    "answer": "B",
    "answer_original": "B",
    "answer_status": "verified",
    "explanation": [
      "Hệ phương trình tuyến tính thuần nhất \\(Ax = 0\\) luôn luôn có nghiệm (ít nhất là nghiệm tầm thường \\(x = 0\\)), nên không bao giờ vô nghiệm.",
      "Ở đây số phương trình là \\(m = 4\\) và số ẩn là \\(n = 6\\).",
      "Hạng của ma trận hệ số \\(A\\) thỏa mãn \\(\\operatorname{rank}(A) \\le m = 4 < 6\\).",
      "Số ẩn tự do bằng \\(n - \\operatorname{rank}(A) \\ge 6 - 4 = 2 > 0\\).",
      "Vì hệ có ít nhất 2 ẩn tự do và luôn tương thích, nên hệ nhất định có vô số nghiệm (Infinitely many solutions).",
      "Vậy đáp án đúng là B."
    ],
    "image": "assets/questions/0285_q285_Question_285.png",
    "needs_image": false,
    "review_flags": [],
    "confidence": "high"
  },
  {
    "id": 286,
    "chapter": "GT1",
    "folder": "GT1",
    "topic": "CucTri",
    "type": "single_choice",
    "question": "Find the critical numbers of \\(f(x) = |x^2 - 1|\\).",
    "options": [
      "-1, 0",
      "0",
      "None of the other choices is correct",
      "1, -1",
      "1, 0",
      "1, -1, 0"
    ],
    "answer": "F",
    "answer_original": "F",
    "answer_status": "verified",
    "explanation": [
      "Hàm số \\(f(x) = |x^2 - 1|\\) xác định trên toàn bộ \\(\\mathbb{R}\\).",
      "Khai triển giá trị tuyệt đối:\n\\[ f(x) = \\begin{cases} x^2 - 1 & \\text{nếu } |x| \\ge 1 \\\\ 1 - x^2 & \\text{nếu } |x| < 1 \\end{cases} \\]",
      "Tính đạo hàm:\n- Với \\(|x| > 1\\): \\(f'(x) = 2x\\)\n- Với \\(|x| < 1\\): \\(f'(x) = -2x\\)\n- Tại \\(x = 1\\) và \\(x = -1\\): đạo hàm một phía trái và phải không bằng nhau, do đó hàm số không có đạo hàm tại \\(x = \\pm 1\\). Vì \\(\\pm 1\\) thuộc tập xác định, nên \\(1\\) và \\(-1\\) là các điểm tới hạn.",
      "Xét \\(f'(x) = 0\\):\n- Trên khoảng \\((-1, 1)\\), \\(-2x = 0 \\iff x = 0\\). Do đó \\(x = 0\\) là một điểm tới hạn.",
      "Vậy tập các điểm tới hạn của hàm số là \\(1, -1, 0\\).",
      "Đáp án đúng là F."
    ],
    "image": "assets/questions/0286_q286_Question_286.png",
    "needs_image": false,
    "review_flags": [],
    "confidence": "high"
  },
  {
    "id": 287,
    "chapter": "GT1",
    "folder": "GT1",
    "topic": "TichPhan",
    "type": "single_choice",
    "question": "Compute \\(\\int_{-1}^2 |2x - 1| dx\\)",
    "options": [
      "0",
      "9/2",
      "None of the other choices is correct",
      "3/2",
      "19/4",
      "5"
    ],
    "answer": "B",
    "answer_original": "B",
    "answer_status": "verified",
    "explanation": [
      "Nghiệm của biểu thức trong dấu giá trị tuyệt đối là \\(2x - 1 = 0 \\iff x = 1/2\\).",
      "Điểm \\(x = 1/2\\) nằm trong đoạn lấy tích phân \\([-1, 2]\\). Ta tách tích phân thành hai đoạn:\n\\[ \\int_{-1}^2 |2x - 1| dx = \\int_{-1}^{1/2} -(2x - 1) dx + \\int_{1/2}^2 (2x - 1) dx \\]",
      "Tính tích phân thứ nhất:\n\\[ \\int_{-1}^{1/2} (1 - 2x) dx = \\left[ x - x^2 \\right]_{-1}^{1/2} = \\left(\\frac{1}{2} - \\frac{1}{4}\\right) - (-1 - 1) = \\frac{1}{4} - (-2) = \\frac{9}{4} \\]",
      "Tính tích phân thứ hai:\n\\[ \\int_{1/2}^2 (2x - 1) dx = \\left[ x^2 - x \\right]_{1/2}^2 = (4 - 2) - \\left(\\frac{1}{4} - \\frac{1}{2}\\right) = 2 - \\left(-\\frac{1}{4}\\right) = \\frac{9}{4} \\]",
      "Tổng hai tích phân:\n\\[ I = \\frac{9}{4} + \\frac{9}{4} = \\frac{18}{4} = \\frac{9}{2} \\]",
      "Vậy đáp án đúng là B (9/2)."
    ],
    "image": "assets/questions/0287_q287_Question_287.png",
    "needs_image": false,
    "review_flags": [],
    "confidence": "high"
  },
  {
    "id": 288,
    "chapter": "DSTT1",
    "folder": "DSTT1",
    "topic": "MaTran",
    "type": "single_choice",
    "question": "Let \\(A\\) be a matrix of size \\(5 \\times 3\\). How many of the following statements are true?\n(i) If \\(A\\) has a zero entry, then \\(A\\) has a row of zeros\n(ii) If \\(Ax = 0\\) where \\(x \\neq 0\\), then \\(A = 0\\)\n(iii) If \\(Ax = 0\\) has only the trivial solution \\(x = 0\\), then \\(Ax = b\\) has a solution for every \\(b\\)",
    "options": [
      "1",
      "3",
      "0",
      "2"
    ],
    "answer": "C",
    "answer_original": "A",
    "answer_status": "conflict",
    "explanation": [
      "Phân tích tính đúng sai của từng mệnh đề đối với ma trận \\(A\\) cỡ \\(5 \\times 3\\):",
      "1) Mệnh đề (i): 'Nếu \\(A\\) có một phần tử bằng 0 thì \\(A\\) có một dòng toàn số 0'. Mệnh đề này SAI (ví dụ ma trận đơn vị hoặc ma trận chỉ có đúng 1 phần tử bằng 0).",
      "2) Mệnh đề (ii): 'Nếu \\(Ax = 0\\) với \\(x \\neq 0\\) thì \\(A = 0\\)'. Mệnh đề này SAI (bất kỳ ma trận khác không nào có các cột phụ thuộc tuyến tính đều có nghiệm không tầm thường).",
      "3) Mệnh đề (iii): 'Nếu \\(Ax = 0\\) chỉ có nghiệm tầm thường \\(x = 0\\) thì \\(Ax = b\\) có nghiệm với mọi \\(b\\)'. Mệnh đề này SAI vì \\(A\\) có cỡ \\(5 \\times 3\\), không gian cột của \\(A\\) có số chiều tối đa là 3, trong khi \\(b \\in \\mathbb{R}^5\\) (không gian 5 chiều), nên không thể có nghiệm với mọi \\(b \\in \\mathbb{R}^5\\). (Định lý tương đương khả nghịch chỉ đúng cho ma trận vuông).",
      "Như vậy, cả 3 mệnh đề đều sai, số mệnh đề đúng là 0.",
      "Ghi chú kiểm định xung đột: Khóa đáp án gốc của ngân hàng chọn A (1 mệnh đề đúng), do người ra đề nhầm lẫn áp dụng định lý ma trận khả nghịch vuông cho ma trận hình chữ nhật \\(5 \\times 3\\). Đáp án toán học chính xác là C (0 mệnh đề đúng)."
    ],
    "image": "assets/questions/0288_q288_Question_288.png",
    "needs_image": false,
    "review_flags": ["answer_conflict"],
    "confidence": "high"
  },
  {
    "id": 289,
    "chapter": "GT1",
    "folder": "GT1",
    "topic": "DaoHam",
    "type": "single_choice",
    "question": "Given the relation \\(x^2 + x y^2 = 3\\), find \\(dy/dx\\).\n(i) \\(-\\frac{y}{2x}\\)\n(ii) \\(-\\frac{2x}{y^2}\\)\n(iii) \\(-\\frac{1}{y}\\)\n(iv) \\(-\\frac{y^2+2x}{2xy}\\)",
    "options": [
      "(iv)",
      "All of the other choices are incorrect",
      "(iii)",
      "(ii)",
      "(i)"
    ],
    "answer": "A",
    "answer_original": "A",
    "answer_status": "verified",
    "explanation": [
      "Lấy đạo hàm hai vế theo biến \\(x\\):\n\\[ \\frac{d}{dx}[x^2 + x y^2] = \\frac{d}{dx}[3] \\]",
      "Sử dụng quy tắc tích cho số hạng \\(x y^2\\):\n\\[ 2x + 1 \\cdot y^2 + x \\cdot 2y \\frac{dy}{dx} = 0 \\]",
      "\\[ 2x + y^2 + 2xy \\frac{dy}{dx} = 0 \\implies 2xy \\frac{dy}{dx} = -(y^2 + 2x) \\]",
      "Rút ra đạo hàm:\n\\[ \\frac{dy}{dx} = -\\frac{y^2 + 2x}{2xy} \\]",
      "Khẳng định này trùng với (iv). Lựa chọn A tương ứng với (iv).",
      "Vậy đáp án đúng là A."
    ],
    "image": "assets/questions/0289_q289_Question_289.png",
    "needs_image": false,
    "review_flags": [],
    "confidence": "high"
  },
  {
    "id": 290,
    "chapter": "GT1",
    "folder": "GT1",
    "topic": "PhuongPhapSo",
    "type": "single_choice",
    "question": "Use the Trapezoidal Rule with \\(n = 4\\) to estimate the value of the integral\n\\[ \\int_0^4 f(x) dx \\]\n\\[ \\begin{array}{|c|c|c|c|c|c|} \\hline x & 0.0 & 1.0 & 2.0 & 3.0 & 4.0 \\\\ \\hline f(x) & 1.00 & 1.19 & 1.50 & 1.78 & 2.03 \\\\ \\hline \\end{array} \\]",
    "options": [
      "2.9813",
      "5.985",
      "None of the other choices is correct",
      "5.6620",
      "6.425"
    ],
    "answer": "B",
    "answer_original": "B",
    "answer_status": "verified",
    "explanation": [
      "Độ rộng mỗi khoảng chia:\n\\[ \\Delta x = \\frac{b - a}{n} = \\frac{4.0 - 0.0}{4} = 1.0 \\]",
      "Công thức hình thang (Trapezoidal Rule) với \\(n = 4\\):\n\\[ T_4 = \\frac{\\Delta x}{2} \\left[ f(x_0) + 2f(x_1) + 2f(x_2) + 2f(x_3) + f(x_4) \\right] \\]",
      "Thay các giá trị hàm số từ bảng:\n\\[ T_4 = \\frac{1.0}{2} \\left[ 1.00 + 2(1.19) + 2(1.50) + 2(1.78) + 2.03 \\right] \\]",
      "\\[ = \\frac{1}{2} \\left[ 1.00 + 2.38 + 3.00 + 3.56 + 2.03 \\right] = \\frac{1}{2} [11.97] = 5.985 \\]",
      "Vậy đáp án đúng là B (5.985)."
    ],
    "image": "assets/questions/0290_q290_Question_290.png",
    "needs_image": false,
    "review_flags": [],
    "confidence": "high"
  },
  {
    "id": 291,
    "chapter": "DSTT1",
    "folder": "DSTT1",
    "topic": "TriRiengVectorRieng",
    "type": "single_choice",
    "question": "Find the characteristic polynomial of the matrix \\(\\begin{bmatrix} 1 & 1 \\\\ 0 & 2 \\end{bmatrix}\\).\n(i) \\(x^2 + 3x - 2\\)\n(ii) \\(x^2 - 3x + 2\\)\n(iii) \\(x^2 - 3x + 1\\)\n(iv) \\(x^2 + 3x - 1\\)",
    "options": [
      "(iii)",
      "(iv)",
      "(i)",
      "None of the other choices is correct",
      "(ii)"
    ],
    "answer": "E",
    "answer_original": "E",
    "answer_status": "verified",
    "explanation": [
      "Đa thức đặc trưng của ma trận vuông \\(A\\) được tính bởi:\n\\[ p(x) = \\det(xI - A) = \\det \\begin{bmatrix} x - 1 & -1 \\\\ 0 & x - 2 \\end{bmatrix} \\]",
      "Khai triển định thức ma trận tam giác trên:\n\\[ p(x) = (x - 1)(x - 2) - 0(-1) = x^2 - 3x + 2 \\]",
      "Biểu thức này tương ứng với khẳng định (ii). Lựa chọn E tương ứng với (ii).",
      "Vậy đáp án đúng là E."
    ],
    "image": "assets/questions/0291_q291_Question_291.png",
    "needs_image": false,
    "review_flags": [],
    "confidence": "high"
  },
  {
    "id": 292,
    "chapter": "GT1",
    "folder": "GT1",
    "topic": "HamSo",
    "type": "single_choice",
    "question": "Find the domain of the composite function \\(g \\circ f\\) if \\(f(x) = \\sqrt{x}\\) and \\(g(x) = \\frac{1}{x-2}\\).\n(i) \\((2, +\\infty)\\)\n(ii) \\([0, +\\infty)\\)\n(iii) \\([0, 2) \\cup (2, +\\infty)\\)\n(iv) \\([0, 4) \\cup (4, +\\infty)\\)",
    "options": [
      "None of the other choices is correct",
      "(ii)",
      "(i)",
      "(iii)",
      "(iv)"
    ],
    "answer": "E",
    "answer_original": "E",
    "answer_status": "verified",
    "explanation": [
      "Hàm hợp được xác định bởi:\n\\[ (g \\circ f)(x) = g(f(x)) = \\frac{1}{\\sqrt{x} - 2} \\]",
      "Điều kiện xác định của hàm hợp:\n1) Biểu thức trong căn có nghĩa: \\(x \\ge 0\\).\n2) Mẫu số khác 0: \\(\\sqrt{x} - 2 \\neq 0 \\iff \\sqrt{x} \\neq 2 \\iff x \\neq 4\\).",
      "Kết hợp hai điều kiện, tập xác định là:\n\\[ D = [0, 4) \\cup (4, +\\infty) \\]",
      "Biểu thức này tương ứng với khẳng định (iv). Lựa chọn E tương ứng với (iv).",
      "Vậy đáp án đúng là E."
    ],
    "image": "assets/questions/0292_q292_Question_292.png",
    "needs_image": false,
    "review_flags": [],
    "confidence": "high"
  },
  {
    "id": 293,
    "chapter": "GT1",
    "folder": "GT1",
    "topic": "TichPhan",
    "type": "single_choice",
    "question": "Estimate the area under the graph of \\(f(x) = 20 - x^2\\) from \\(x = 0\\) to 4 using four approximating rectangles and right endpoints.",
    "options": [
      "50",
      "58",
      "50/4",
      "59",
      "58/4",
      "None of others"
    ],
    "answer": "A",
    "answer_original": "A",
    "answer_status": "verified",
    "explanation": [
      "Độ rộng của mỗi hình chữ nhật xấp xỉ:\n\\[ \\Delta x = \\frac{b - a}{n} = \\frac{4 - 0}{4} = 1 \\]",
      "Các điểm đầu mút phải là:\n\\(x_1 = 1, x_2 = 2, x_3 = 3, x_4 = 4\\)",
      "Tính giá trị của hàm số \\(f(x) = 20 - x^2\\) tại các điểm này:\n\\(f(1) = 20 - 1^2 = 19\\)\n\\(f(2) = 20 - 2^2 = 16\\)\n\\(f(3) = 20 - 3^2 = 11\\)\n\\(f(4) = 20 - 4^2 = 4\\)",
      "Tổng diện tích xấp xỉ (Tổng Riemann phải):\n\\[ R_4 = \\sum_{i=1}^4 f(x_i) \\Delta x = 1 \\times (19 + 16 + 11 + 4) = 50 \\]",
      "Vậy đáp án đúng là A (50)."
    ],
    "image": "assets/questions/0293_q293_Question_293.png",
    "needs_image": false,
    "review_flags": [],
    "confidence": "high"
  },
  {
    "id": 294,
    "chapter": "DSTT1",
    "folder": "DSTT1",
    "topic": "DinhThuc",
    "type": "single_choice",
    "question": "Let \\(A\\) be a \\(4 \\times 4\\) matrix and \\(\\det A = 2\\). Find \\(\\det(2A)\\).",
    "options": [
      "16",
      "32",
      "4",
      "8",
      "None of the other choices is correct",
      "2"
    ],
    "answer": "B",
    "answer_original": "B",
    "answer_status": "verified",
    "explanation": [
      "Theo tính chất của định thức, với ma trận vuông \\(A\\) cấp \\(n\\) và số thực \\(c\\):\n\\[ \\det(c A) = c^n \\det(A) \\]",
      "Ở đây ma trận \\(A\\) có cấp \\(n = 4\\), hằng số \\(c = 2\\), và \\(\\det(A) = 2\\).",
      "Thay vào công thức:\n\\[ \\det(2A) = 2^4 \\det(A) = 16 \\times 2 = 32 \\]",
      "Vậy đáp án đúng là B (32)."
    ],
    "image": "assets/questions/0294_q294_Question_294.png",
    "needs_image": false,
    "review_flags": [],
    "confidence": "high"
  },
  {
    "id": 295,
    "chapter": "GT1",
    "folder": "GT1",
    "topic": "DaoHam",
    "type": "single_choice",
    "question": "Find the differential of the function \\(y = \\sqrt{4 + 5x}\\).\n(i) \\(dy = \\frac{5\\sqrt{4+5x}}{2} dx\\)\n(ii) \\(dy = \\frac{5}{2\\sqrt{4+5x}} dx\\)\n(iii) \\(dy = \\frac{1}{2\\sqrt{4+5x}} dx\\)\n(iv) \\(dy = \\frac{1}{2}\\sqrt{4+5x} dx\\)",
    "options": [
      "(ii)",
      "None of the other choices is correct",
      "(iii)",
      "(i)",
      "(iv)"
    ],
    "answer": "A",
    "answer_original": "A",
    "answer_status": "verified",
    "explanation": [
      "Theo định nghĩa vi phân: \\(dy = y'(x) dx\\).",
      "Tính đạo hàm của hàm hợp \\(y = (4 + 5x)^{1/2}\\):\n\\[ y'(x) = \\frac{1}{2}(4 + 5x)^{-1/2} \\cdot \\frac{d}{dx}[4 + 5x] = \\frac{1}{2\\sqrt{4 + 5x}} \\cdot 5 = \\frac{5}{2\\sqrt{4 + 5x}} \\]",
      "Do đó vi phân là:\n\\[ dy = \\frac{5}{2\\sqrt{4 + 5x}} dx \\]",
      "Khẳng định này trùng với (ii). Lựa chọn A tương ứng với (ii).",
      "Vậy đáp án đúng là A."
    ],
    "image": "assets/questions/0295_q295_Question_295.png",
    "needs_image": false,
    "review_flags": [],
    "confidence": "high"
  },
  {
    "id": 296,
    "chapter": "GT1",
    "folder": "GT1",
    "topic": "GioiHan",
    "type": "single_choice",
    "question": "Evaluate the limit, if it exists:\n\\[ \\lim_{x \\to 2} \\frac{x^2 - 3x + 2}{x - 2} \\]",
    "options": [
      "None of the other choices is correct",
      "-1",
      "-2",
      "0",
      "2",
      "1"
    ],
    "answer": "F",
    "answer_original": "B",
    "answer_status": "conflict",
    "explanation": [
      "Phân tích đa thức ở tử số thành nhân tử:\n\\[ x^2 - 3x + 2 = (x - 2)(x - 1) \\]",
      "Với \\(x \\neq 2\\), ta triệt tiêu thừa số \\(x - 2\\):\n\\[ \\lim_{x \\to 2} \\frac{x^2 - 3x + 2}{x - 2} = \\lim_{x \\to 2} \\frac{(x - 2)(x - 1)}{x - 2} = \\lim_{x \\to 2} (x - 1) = 2 - 1 = 1 \\]",
      "Ghi chú kiểm định xung đột: Khóa đáp án gốc của ngân hàng chọn B (-1) do người làm đề sao chép nhầm đáp án của câu kế tiếp (câu 297 có phân thức chia cho \\(x^2 - 5x + 6\\) cho ra giới hạn bằng -1). Đáp án toán học chính xác 100% là F (1)."
    ],
    "image": "assets/questions/0296_q296_Question_296.png",
    "needs_image": false,
    "review_flags": ["answer_conflict"],
    "confidence": "high"
  },
  {
    "id": 297,
    "chapter": "GT1",
    "folder": "GT1",
    "topic": "GioiHan",
    "type": "single_choice",
    "question": "Evaluate the limit, if it exists:\n\\[ \\lim_{x \\to 2} \\frac{x^2 - 3x + 2}{x^2 - 5x + 6} \\]",
    "options": [
      "None of the other choices is correct",
      "-1",
      "-2",
      "0",
      "2",
      "1"
    ],
    "answer": "B",
    "answer_original": "B",
    "answer_status": "verified",
    "explanation": [
      "Phân tích cả tử số và mẫu số thành nhân tử:\n- Tử số: \\(x^2 - 3x + 2 = (x - 2)(x - 1)\\)\n- Mẫu số: \\(x^2 - 5x + 6 = (x - 2)(x - 3)\\)",
      "Triệt tiêu nhân tử chung \\(x - 2\\) khi \\(x \\to 2\\):\n\\[ \\lim_{x \\to 2} \\frac{x^2 - 3x + 2}{x^2 - 5x + 6} = \\lim_{x \\to 2} \\frac{(x - 2)(x - 1)}{(x - 2)(x - 3)} = \\lim_{x \\to 2} \\frac{x - 1}{x - 3} = \\frac{2 - 1}{2 - 3} = \\frac{1}{-1} = -1 \\]",
      "Vậy đáp án đúng là B (-1)."
    ],
    "image": "assets/questions/0297_q297_Question_297.png",
    "needs_image": false,
    "review_flags": [],
    "confidence": "high"
  },
  {
    "id": 298,
    "chapter": "GT1",
    "folder": "GT1",
    "topic": "HamSo",
    "type": "single_choice",
    "question": "Find \\(c\\) so that the function is continuous on \\(\\mathbb{R}\\):\n\\[ f(x) = \\begin{cases} \\cos(x + \\sin x) & \\text{if } x > 0 \\\\ x^2 + cx + c & \\text{if } x \\le 0 \\end{cases} \\]",
    "options": [
      "None of the other choices is correct",
      "1",
      "3",
      "2",
      "4"
    ],
    "answer": "B",
    "answer_original": "B",
    "answer_status": "verified",
    "explanation": [
      "Các hàm thành phần \\(\\cos(x + \\sin x)\\) và \\(x^2 + cx + c\\) đều liên tục trên các khoảng tương ứng \\((0, +\\infty)\\) và \\((-\\infty, 0)\\).",
      "Để hàm số liên tục trên \\(\\mathbb{R}\\), hàm số cần liên tục tại điểm nối \\(x = 0\\), tức là:\n\\[ \\lim_{x \\to 0^+} f(x) = \\lim_{x \\to 0^-} f(x) = f(0) \\]",
      "Tính các giới hạn một phía:\n- Giới hạn phải: \\(\\lim_{x \\to 0^+} \\cos(x + \\sin x) = \\cos(0 + \\sin 0) = \\cos 0 = 1\\).\n- Giới hạn trái và giá trị tại điểm: \\(\\lim_{x \\to 0^-} (x^2 + cx + c) = f(0) = 0 + 0 + c = c\\).",
      "Đồng nhất hai giá trị:\n\\[ c = 1 \\]",
      "Vậy \\(c = 1\\). Đáp án đúng là B."
    ],
    "image": "assets/questions/0298_q298_Question_298.png",
    "needs_image": false,
    "review_flags": [],
    "confidence": "high"
  },
  {
    "id": 299,
    "chapter": "GT1",
    "folder": "GT1",
    "topic": "DaoHam",
    "type": "single_choice",
    "question": "Find \\(\\frac{d^4 y}{dx^4}\\) for \\(y = \\sqrt[3]{x}\\).\n(i) \\(-\\frac{80}{81x^{7/3}}\\)\n(ii) \\(\\frac{80}{81x^{7/3}}\\)\n(iii) \\(\\frac{80}{81x^{11/3}}\\)\n(iv) \\(-\\frac{80}{81x^{11/3}}\\)",
    "options": [
      "None of the other choices is correct",
      "(i)",
      "(iv)",
      "(iii)",
      "(ii)"
    ],
    "answer": "C",
    "answer_original": "C",
    "answer_status": "verified",
    "explanation": [
      "Viết hàm dưới dạng lũy thừa: \\(y = x^{1/3}\\).",
      "Tính lần lượt các cấp đạo hàm:\n- Đạo hàm cấp 1: \\(y' = \\frac{1}{3} x^{-2/3}\\)\n- Đạo hàm cấp 2: \\(y'' = \\frac{1}{3} \\left(-\\frac{2}{3}\\right) x^{-5/3} = -\\frac{2}{9} x^{-5/3}\\)\n- Đạo hàm cấp 3: \\(y''' = -\\frac{2}{9} \\left(-\\frac{5}{3}\\right) x^{-8/3} = \\frac{10}{27} x^{-8/3}\\)\n- Đạo hàm cấp 4: \\(y^{(4)} = \\frac{10}{27} \\left(-\\frac{8}{3}\\right) x^{-11/3} = -\\frac{80}{81} x^{-11/3} = -\\frac{80}{81x^{11/3}}\\)",
      "Biểu thức này tương ứng với khẳng định (iv). Lựa chọn C tương ứng với (iv).",
      "Vậy đáp án đúng là C."
    ],
    "image": "assets/questions/0299_q299_Question_299.png",
    "needs_image": false,
    "review_flags": [],
    "confidence": "high"
  },
  {
    "id": 300,
    "chapter": "GT1",
    "folder": "GT1",
    "topic": "PhuongPhapSo",
    "type": "single_choice",
    "question": "Use Newton's method with initial approximation \\(x_1 = 1\\) to find \\(x_3\\), the third approximation to the root of the equation\n\\[ x^3 + 2x - 4 = 0 \\]",
    "options": [
      "1.31",
      "None of the other choices is correct",
      "1.18",
      "1.01",
      "1.56",
      "1.90"
    ],
    "answer": "C",
    "answer_original": "C",
    "answer_status": "verified",
    "explanation": [
      "Đặt \\(f(x) = x^3 + 2x - 4\\), ta có \\(f'(x) = 3x^2 + 2\\).",
      "Công thức lặp Newton:\n\\[ x_{n+1} = x_n - \\frac{x_n^3 + 2x_n - 4}{3x_n^2 + 2} = \\frac{2x_n^3 + 4}{3x_n^2 + 2} \\]",
      "Bước 1: Với \\(x_1 = 1\\):\n\\[ x_2 = \\frac{2(1)^3 + 4}{3(1)^2 + 2} = \\frac{6}{5} = 1.2 \\]",
      "Bước 2: Với \\(x_2 = 1.2\\):\n\\[ x_3 = \\frac{2(1.2)^3 + 4}{3(1.2)^2 + 2} = \\frac{2(1.728) + 4}{3(1.44) + 2} = \\frac{3.456 + 4}{4.32 + 2} = \\frac{7.456}{6.32} \\approx 1.179747 \\]",
      "Làm tròn đến 2 chữ số thập phân ta được \\(1.18\\).",
      "Vậy đáp án đúng là C (1.18)."
    ],
    "image": "assets/questions/0300_q300_Question_300.png",
    "needs_image": false,
    "review_flags": [],
    "confidence": "high"
  },
  {
    "id": 301,
    "chapter": "GT1",
    "folder": "GT1",
    "topic": "CucTri",
    "type": "single_choice",
    "question": "Find the relative extrema, if they exist, of the function\n\\[ f(x) = \\frac{2}{3}x^3 - \\frac{3}{2}x^2 - 9x + 2 \\]",
    "options": [
      "Relative maximum at \\((-3/2, 79/8)\\); relative minimum at \\((3, -41/2)\\)",
      "Relative maximum at \\((-3, -5/2)\\); relative minimum at \\((3, -41/2)\\)",
      "None of the other choices is correct",
      "Relative maximum at \\((-3/2, 79/8)\\); relative minimum at \\((3/2, -101/8)\\)",
      "Relative maximum at \\((3, -41/2)\\); relative minimum at \\((-3/2, 79/8)\\)"
    ],
    "answer": "A",
    "answer_original": "A",
    "answer_status": "verified",
    "explanation": [
      "Tính đạo hàm cấp một:\n\\[ f'(x) = 2x^2 - 3x - 9 \\]",
      "Giải phương trình \\(f'(x) = 0\\):\n\\[ (2x + 3)(x - 3) = 0 \\iff x = -3/2 \\text{ hoặc } x = 3 \\]",
      "Tính đạo hàm cấp hai:\n\\[ f''(x) = 4x - 3 \\]",
      "- Tại \\(x = -3/2\\): \\(f''(-3/2) = 4(-3/2) - 3 = -9 < 0\\), do đó hàm số đạt cực đại tương đối (relative maximum).\n\\[ f(-3/2) = \\frac{2}{3}\\left(-\\frac{27}{8}\\right) - \\frac{3}{2}\\left(\\frac{9}{4}\\right) - 9\\left(-\\frac{3}{2}\\right) + 2 = -\\frac{9}{4} - \\frac{27}{8} + \\frac{27}{2} + 2 = \\frac{79}{8} \\]",
      "- Tại \\(x = 3\\): \\(f''(3) = 4(3) - 3 = 9 > 0\\), do đó hàm số đạt cực tiểu tương đối (relative minimum).\n\\[ f(3) = \\frac{2}{3}(27) - \\frac{3}{2}(9) - 9(3) + 2 = 18 - \\frac{27}{2} - 27 + 2 = -7 - \\frac{27}{2} = -\\frac{41}{2} \\]",
      "Vậy cực đại tại \\((-3/2, 79/8)\\) và cực tiểu tại \\((3, -41/2)\\). Đáp án đúng là A."
    ],
    "image": "assets/questions/0301_q301_Question_301.png",
    "needs_image": false,
    "review_flags": [],
    "confidence": "high"
  },
  {
    "id": 302,
    "chapter": "GT1",
    "folder": "GT1",
    "topic": "GioiHan",
    "type": "single_choice",
    "question": "Find the limit:\n\\[ \\lim_{x \\to 0^-} \\frac{x - 1}{x(x + 1)} \\]",
    "options": [
      "negative infinity",
      "-1",
      "None of the other choices is correct",
      "1",
      "0",
      "positive infinity"
    ],
    "answer": "F",
    "answer_original": "F",
    "answer_status": "verified",
    "explanation": [
      "Xét giới hạn khi \\(x \\to 0^-\\):",
      "1) Giới hạn của tử số:\n\\[ \\lim_{x \\to 0^-} (x - 1) = 0 - 1 = -1 < 0 \\]",
      "2) Giới hạn của mẫu số:\nKhi \\(x \\to 0^-\\), ta có \\(x < 0\\) và \\(x + 1 \\to 1 > 0\\).\nDo đó tích \\(x(x + 1) < 0\\) và dần về 0 từ phía âm (tức là \\(0^-\\)).",
      "3) Thương của một số âm chia cho số âm tiến về 0:\n\\[ \\frac{-1}{0^-} = +\\infty \\text{ (positive infinity)} \\]",
      "Vậy đáp án đúng là F (positive infinity)."
    ],
    "image": "assets/questions/0302_q302_Question_302.png",
    "needs_image": false,
    "review_flags": [],
    "confidence": "high"
  },
  {
    "id": 303,
    "chapter": "GT1",
    "folder": "GT1",
    "topic": "DaoHam",
    "type": "single_choice",
    "question": "The edge of a cube was found to be 20 cm with a possible error in measurement of at most 0.1cm. What is the maximum possible error in computing the surface area of the cube?",
    "options": [
      "24",
      "2.4",
      "240",
      "0.24",
      "None of the other choices is correct"
    ],
    "answer": "A",
    "answer_original": "A",
    "answer_status": "verified",
    "explanation": [
      "Gọi cạnh hình lập phương là \\(x\\) (cm).",
      "Diện tích toàn phần của hình lập phương là:\n\\[ S = 6x^2 \\]",
      "Lấy vi phân để ước lượng sai số tuyệt đối lớn nhất:\n\\[ dS = S'(x) dx = 12x \\, dx \\]",
      "Theo đề bài: \\(x = 20\\text{ cm}\\) và sai số đo cạnh \\(dx = 0.1\\text{ cm}\\).",
      "Thay số vào biểu thức vi phân:\n\\[ dS = 12(20)(0.1) = 24\\text{ cm}^2 \\]",
      "Vậy sai số lớn nhất có thể khi tính diện tích là 24. Đáp án đúng là A."
    ],
    "image": "assets/questions/0303_q303_Question_303.png",
    "needs_image": false,
    "review_flags": [],
    "confidence": "high"
  },
  {
    "id": 304,
    "chapter": "GT1",
    "folder": "GT1",
    "topic": "HamSo",
    "type": "single_choice",
    "question": "Find the range of the function\n\\[ f(x) = x^2 + 1. \\]\n(i) \\([1, \\infty)\\)\n(ii) \\((1, \\infty)\\)\n(iii) \\([0, \\infty)\\)\n(iv) \\((-\\infty, \\infty)\\)\n(v) \\((0, \\infty)\\)",
    "options": [
      "(iv)",
      "(v)",
      "(iii)",
      "(i)",
      "(ii)",
      "None of the other choices is correct"
    ],
    "answer": "D",
    "answer_original": "D",
    "answer_status": "verified",
    "explanation": [
      "Tập xác định của hàm số \\(f(x) = x^2 + 1\\) là \\(\\mathbb{R}\\).",
      "Với mọi \\(x \\in \\mathbb{R}\\), ta luôn có \\(x^2 \\ge 0\\).",
      "Cộng 1 vào cả hai vế:\n\\[ x^2 + 1 \\ge 1 \\implies f(x) \\ge 1 \\]",
      "Giá trị nhỏ nhất đạt được khi \\(x = 0\\), và khi \\(x \\to \\pm\\infty\\) thì \\(f(x) \\to +\\infty\\).",
      "Do đó tập giá trị (range) của hàm số là \\([1, \\infty)\\), tương ứng với khẳng định (i). Lựa chọn D tương ứng với (i).",
      "Vậy đáp án đúng là D."
    ],
    "image": "assets/questions/0304_q304_Question_304.png",
    "needs_image": false,
    "review_flags": [],
    "confidence": "high"
  },
  {
    "id": 305,
    "chapter": "GT1",
    "folder": "GT1",
    "topic": "DaoHam",
    "type": "single_choice",
    "question": "Simplify the quotient \\(\\frac{f(x+h) - f(x)}{h}\\) for \\(f(x) = -\\frac{1}{x}\\).\n(i) \\(\\frac{-1}{(x+h)x}\\)\n(ii) \\(\\frac{1}{x^2}\\)\n(iii) \\(\\frac{1}{(x+h)x}\\)\n(iv) \\(\\frac{-1}{x^2}\\)",
    "options": [
      "(i)",
      "(iv)",
      "(ii)",
      "None of the other choices is correct",
      "(iii)"
    ],
    "answer": "E",
    "answer_original": "E",
    "answer_status": "verified",
    "explanation": [
      "Thay hàm số \\(f(x) = -\\frac{1}{x}\\) vào tỉ số sai phân:\n\\[ \\frac{f(x+h) - f(x)}{h} = \\frac{-\\frac{1}{x+h} - \\left(-\\frac{1}{x}\\right)}{h} = \\frac{\\frac{1}{x} - \\frac{1}{x+h}}{h} \\]",
      "Quy đồng mẫu số ở tử thức:\n\\[ \\frac{1}{x} - \\frac{1}{x+h} = \\frac{(x+h) - x}{x(x+h)} = \\frac{h}{x(x+h)} \\]",
      "Chia cho \\(h\\) (với \\(h \\neq 0\\)):\n\\[ \\frac{\\frac{h}{x(x+h)}}{h} = \\frac{1}{(x+h)x} \\]",
      "Biểu thức này tương ứng với khẳng định (iii). Lựa chọn E tương ứng với (iii).",
      "Vậy đáp án đúng là E."
    ],
    "image": "assets/questions/0305_q305_Question_305.png",
    "needs_image": false,
    "review_flags": [],
    "confidence": "high"
  },
  {
    "id": 306,
    "chapter": "GT1",
    "folder": "GT1",
    "topic": "PhuongTrinhViPhan",
    "type": "single_choice",
    "question": "A _____ is a node that can accommodate more than one record. The disadvantage of this method is that there may be a lot of wasted (unoccupied) locations.",
    "options": [
      "Linked list resolution",
      "Open addressing resolution",
      "Bucket hashing",
      "Digit extraction hashing"
    ],
    "answer": "C",
    "answer_original": "F",
    "answer_status": "conflict",
    "explanation": [
      "Ghi chú kiểm định: Đây là câu hỏi thuộc môn Cấu trúc dữ liệu và giải thuật (CSD201 - Data Structures & Algorithms), phần Bảng băm (Hashing Techniques), bị trộn lẫn vào bộ ảnh đề thi môn MAE101.",
      "Về mặt kiến thức kỹ thuật:",
      "Trong kỹ thuật băm khối (Bucket Hashing), mỗi vị trí trong bảng băm là một 'bucket' (ngăn chứa) gồm nhiều ô (node) có thể lưu trữ nhiều bản ghi có cùng giá trị băm. Nhược điểm lớn của phương pháp này là chiếm dụng nhiều bộ nhớ tĩnh không được sử dụng hết (wasted/unoccupied locations).",
      "Khóa đáp án gốc trong ngân hàng ghi nhận ký tự 'F' (phương án không hề tồn tại trong 4 lựa chọn A, B, C, D).",
      "Đáp án chính xác về mặt nội dung là phương án C ('Bucket hashing')."
    ],
    "image": "assets/questions/0306_q306_Question_306.png",
    "needs_image": false,
    "review_flags": ["out_of_scope_subject", "answer_conflict"],
    "confidence": "high"
  },
  {
    "id": 307,
    "chapter": "GT1",
    "folder": "GT1",
    "topic": "GioiHan",
    "type": "single_choice",
    "question": "Find the vertical and horizontal asymptotes of the following function\n\\[ f(x) = x + \\frac{1}{x - 1} \\]",
    "options": [
      "vertical asymptote \\(x = 1\\) and there is no horizontal asymptote",
      "vertical asymptote \\(x = 0\\) and horizontal asymptote \\(y = -1\\)",
      "vertical asymptote \\(x = 1\\) and horizontal asymptote \\(y = 0\\)",
      "There is no vertical and no horizontal asymptote"
    ],
    "answer": "A",
    "answer_original": "A",
    "answer_status": "verified",
    "explanation": [
      "1) Tiệm cận đứng:\nXét giới hạn khi \\(x \\to 1\\):\n\\[ \\lim_{x \\to 1^+} \\left(x + \\frac{1}{x - 1}\\right) = +\\infty, \\quad \\lim_{x \\to 1^-} \\left(x + \\frac{1}{x - 1}\\right) = -\\infty \\]\nDo đó \\(x = 1\\) là tiệm cận đứng của đồ thị hàm số.",
      "2) Tiệm cận ngang:\nXét giới hạn khi \\(x \\to \\pm\\infty\\):\n\\[ \\lim_{x \\to +\\infty} \\left(x + \\frac{1}{x - 1}\\right) = +\\infty, \\quad \\lim_{x \\to -\\infty} \\left(x + \\frac{1}{x - 1}\\right) = -\\infty \\]\nVì các giới hạn ở vô cực đều không hữu hạn, đồ thị không có tiệm cận ngang (đồ thị có tiệm cận xiên \\(y = x\\)).",
      "Vậy hàm số có tiệm cận đứng \\(x = 1\\) và không có tiệm cận ngang.",
      "Đáp án đúng là A."
    ],
    "image": "assets/questions/0307_q307_Question_307.png",
    "needs_image": false,
    "review_flags": [],
    "confidence": "high"
  },
  {
    "id": 308,
    "chapter": "GT1",
    "folder": "GT1",
    "topic": "CucTri",
    "type": "single_choice",
    "question": "Find the minimum value of the product of two numbers in which one number is 2 more than three times the other.",
    "options": [
      "-1/3",
      "None of the other choices is correct",
      "1",
      "1/3",
      "1/2"
    ],
    "answer": "A",
    "answer_original": "A",
    "answer_status": "verified",
    "explanation": [
      "Gọi hai số là \\(x\\) và \\(y\\). Theo giả thiết: \\(y = 3x + 2\\).",
      "Tích của hai số là hàm theo biến \\(x\\):\n\\[ P(x) = xy = x(3x + 2) = 3x^2 + 2x \\]",
      "Đây là tam thức bậc hai với hệ số \\(a = 3 > 0\\), đạt cực tiểu tại đỉnh:\n\\[ x = -\\frac{b}{2a} = -\\frac{2}{2(3)} = -\\frac{1}{3} \\]",
      "Giá trị nhỏ nhất của tích là:\n\\[ P\\left(-\\frac{1}{3}\\right) = 3\\left(-\\frac{1}{3}\\right)^2 + 2\\left(-\\frac{1}{3}\\right) = 3\\left(\\frac{1}{9}\\right) - \\frac{2}{3} = \\frac{1}{3} - \\frac{2}{3} = -\\frac{1}{3} \\]",
      "Vậy đáp án đúng là A (-1/3)."
    ],
    "image": "assets/questions/0308_q308_Question_308.png",
    "needs_image": false,
    "review_flags": [],
    "confidence": "high"
  },
  {
    "id": 309,
    "chapter": "GT1",
    "folder": "GT1",
    "topic": "GioiHan",
    "type": "single_choice",
    "question": "If \\(1 \\le f(x) \\le x^2 + 2x + 2\\) for all \\(x\\), find the limit \\(\\lim_{x \\to -1} f(x)\\).",
    "options": [
      "-1",
      "1",
      "None of the other choices is correct",
      "Limit does not exist",
      "Between 1 and 2"
    ],
    "answer": "B",
    "answer_original": "B",
    "answer_status": "verified",
    "explanation": [
      "Áp dụng định lý kẹp (Squeeze Theorem) cho các giới hạn khi \\(x \\to -1\\):",
      "1) Giới hạn của hàm chặn dưới:\n\\[ \\lim_{x \\to -1} 1 = 1 \\]",
      "2) Giới hạn của hàm chặn trên:\n\\[ \\lim_{x \\to -1} (x^2 + 2x + 2) = (-1)^2 + 2(-1) + 2 = 1 - 2 + 2 = 1 \\]",
      "Vì giới hạn của cả hai hàm kẹp đều bằng 1 khi \\(x \\to -1\\), nên:\n\\[ \\lim_{x \\to -1} f(x) = 1 \\]",
      "Vậy đáp án đúng là B (1)."
    ],
    "image": "assets/questions/0309_q309_Question_309.png",
    "needs_image": false,
    "review_flags": [],
    "confidence": "high"
  },
  {
    "id": 310,
    "chapter": "GT1",
    "folder": "GT1",
    "topic": "DaoHam",
    "type": "single_choice",
    "question": "Find \\(f'(1)\\) for \\(f(x) = (2x + 1)^3 (x^2 + x)^2\\).",
    "options": [
      "320",
      "270",
      "None of the other choices is correct",
      "240",
      "540"
    ],
    "answer": "E",
    "answer_original": "E",
    "answer_status": "verified",
    "explanation": [
      "Sử dụng quy tắc đạo hàm của tích \\((uv)' = u'v + uv'\\):",
      "Đặt \\(u(x) = (2x + 1)^3\\):\n\\[ u'(x) = 3(2x + 1)^2 \\cdot 2 = 6(2x + 1)^2 \\]\nTại \\(x = 1\\): \\(u(1) = (2(1)+1)^3 = 27\\), \\(u'(1) = 6(3^2) = 54\\).",
      "Đặt \\(v(x) = (x^2 + x)^2\\):\n\\[ v'(x) = 2(x^2 + x)(2x + 1) \\]\nTại \\(x = 1\\): \\(v(1) = (1+1)^2 = 4\\), \\(v'(1) = 2(2)(3) = 12\\).",
      "Thay vào công thức đạo hàm của tích:\n\\[ f'(1) = u'(1)v(1) + u(1)v'(1) = 54(4) + 27(12) = 216 + 324 = 540 \\]",
      "Vậy đáp án đúng là E (540)."
    ],
    "image": "assets/questions/0310_q310_Question_310.png",
    "needs_image": false,
    "review_flags": [],
    "confidence": "high"
  },
  {
    "id": 311,
    "chapter": "GT1",
    "folder": "GT1",
    "topic": "DaoHam",
    "type": "single_choice",
    "question": "Find the linear approximation of the function \\(f(x) = (1+x)^2 \\sqrt{1+2x}\\) at \\(x = 0\\).",
    "options": [
      "\\(1 + x\\)",
      "\\(1 + 3x\\)",
      "\\(1 + 2x\\)",
      "\\(3x\\)",
      "None of the other choices is correct"
    ],
    "answer": "B",
    "answer_original": "B",
    "answer_status": "verified",
    "explanation": [
      "Công thức xấp xỉ tuyến tính tại \\(a = 0\\):\n\\[ L(x) = f(0) + f'(0) x \\]",
      "Tính \\(f(0)\\):\n\\[ f(0) = (1+0)^2 \\sqrt{1+0} = 1 \\]",
      "Tính đạo hàm qua logarit:\n\\[ \\ln f(x) = 2\\ln(1+x) + \\frac{1}{2}\\ln(1+2x) \\]\n\\[ \\frac{f'(x)}{f(x)} = \\frac{2}{1+x} + \\frac{1}{2} \\cdot \\frac{2}{1+2x} = \\frac{2}{1+x} + \\frac{1}{1+2x} \\]\nTại \\(x = 0\\):\n\\[ \\frac{f'(0)}{f(0)} = 2 + 1 = 3 \\implies f'(0) = 3 \\cdot 1 = 3 \\]",
      "Xấp xỉ tuyến tính:\n\\[ L(x) = 1 + 3x \\]",
      "Vậy đáp án đúng là B (\\(1 + 3x\\))."
    ],
    "image": "assets/questions/0311_q311_Question_311.png",
    "needs_image": false,
    "review_flags": [],
    "confidence": "high"
  },
  {
    "id": 312,
    "chapter": "GT1",
    "folder": "GT1",
    "topic": "DaoHam",
    "type": "single_choice",
    "question": "If \\(f(x) = e^{3x}\\), find \\(f^{(3)}(0)\\).",
    "options": [
      "\\(9e\\)",
      "27",
      "\\(27e\\)",
      "None of them",
      "9"
    ],
    "answer": "B",
    "answer_original": "B",
    "answer_status": "verified",
    "explanation": [
      "Tính lần lượt các cấp đạo hàm của hàm số \\(f(x) = e^{3x}\\):\n\\[ f'(x) = 3e^{3x} \\]\n\\[ f''(x) = 3^2 e^{3x} = 9e^{3x} \\]\n\\[ f^{(3)}(x) = 3^3 e^{3x} = 27e^{3x} \\]",
      "Tính giá trị tại \\(x = 0\\):\n\\[ f^{(3)}(0) = 27 e^{3(0)} = 27 e^0 = 27 \\]",
      "Vậy đáp án đúng là B (27)."
    ],
    "image": "assets/questions/0312_q312_Question_312.png",
    "needs_image": false,
    "review_flags": [],
    "confidence": "high"
  },
  {
    "id": 313,
    "chapter": "GT1",
    "folder": "GT1",
    "topic": "CucTri",
    "type": "single_choice",
    "question": "Find the absolute maximum and absolute minimum values of \\(f(x) = (1/3)x^3 - 4x\\) on \\([-8, 8]\\).",
    "options": [
      "Absolute maximum: 416/3, absolute minimum: -16/3",
      "Absolute maximum: 16/3, absolute minimum: -16/3",
      "Absolute maximum: 16/3, absolute minimum: -416/3",
      "Absolute maximum: 416/3, absolute minimum: -416/3",
      "None of the other choices is correct"
    ],
    "answer": "D",
    "answer_original": "D",
    "answer_status": "verified",
    "explanation": [
      "Tính đạo hàm:\n\\[ f'(x) = x^2 - 4 \\]",
      "Tìm các điểm tới hạn trong khoảng \\((-8, 8)\\):\n\\[ x^2 - 4 = 0 \\iff x = \\pm 2 \\]",
      "Tính giá trị của hàm số tại các điểm tới hạn và hai đầu mút của đoạn \\([-8, 8]\\):\n- \\(f(2) = \\frac{1}{3}(8) - 4(2) = \\frac{8}{3} - 8 = -\\frac{16}{3}\\)\n- \\(f(-2) = \\frac{1}{3}(-8) - 4(-2) = -\\frac{8}{3} + 8 = \\frac{16}{3}\\)\n- \\(f(8) = \\frac{1}{3}(512) - 4(8) = \\frac{512}{3} - 32 = \\frac{416}{3}\\)\n- \\(f(-8) = \\frac{1}{3}(-512) - 4(-8) = -\\frac{512}{3} + 32 = -\\frac{416}{3}\\)",
      "So sánh các giá trị:\n- Giá trị lớn nhất tuyệt đối (Absolute maximum): \\(416/3\\)\n- Giá trị nhỏ nhất tuyệt đối (Absolute minimum): \\(-416/3\\)",
      "Vậy đáp án đúng là D."
    ],
    "image": "assets/questions/0313_q313_Question_313.png",
    "needs_image": false,
    "review_flags": [],
    "confidence": "high"
  },
  {
    "id": 314,
    "chapter": "GT1",
    "folder": "GT1",
    "topic": "CucTri",
    "type": "single_choice",
    "question": "Find the absolute maximum and minimum values of the function \\(f(x) = x^4 - 2x^3\\) on the interval \\([-1, 1]\\).",
    "options": [
      "None of the other choices is correct",
      "Absolute maximum: 2, absolute minimum: 0",
      "Absolute maximum: 3, absolute minimum: -27/16",
      "Absolute maximum: 3, absolute minimum: -1",
      "Absolute maximum: 1, absolute minimum: -3"
    ],
    "answer": "D",
    "answer_original": "D",
    "answer_status": "verified",
    "explanation": [
      "Tính đạo hàm:\n\\[ f'(x) = 4x^3 - 6x^2 = 2x^2(2x - 3) \\]",
      "Tìm nghiệm của \\(f'(x) = 0\\):\n\\[ x = 0 \\quad \\text{hoặc} \\quad x = 3/2 \\]",
      "Nhận xét: Điểm \\(x = 3/2 = 1.5\\) không thuộc đoạn \\([-1, 1]\\). Do đó trong khoảng \\((-1, 1)\\) chỉ có duy nhất điểm tới hạn \\(x = 0\\).",
      "Tính giá trị của hàm số tại các điểm cần kiểm tra:\n- Tại \\(x = 0\\): \\(f(0) = 0\\)\n- Tại \\(x = -1\\): \\(f(-1) = (-1)^4 - 2(-1)^3 = 1 + 2 = 3\\)\n- Tại \\(x = 1\\): \\(f(1) = 1^4 - 2(1)^3 = 1 - 2 = -1\\)",
      "So sánh các giá trị:\n- Giá trị lớn nhất tuyệt đối là 3 (tại \\(x = -1\\))\n- Giá trị nhỏ nhất tuyệt đối là -1 (tại \\(x = 1\\))",
      "(Lưu ý: Phương án C có giá trị cực tiểu \\(-27/16\\) tại \\(x = 3/2\\), nhưng đây là phương án bẫy vì điểm này nằm ngoài đoạn \\([-1, 1]\\)).",
      "Vậy đáp án đúng là D."
    ],
    "image": "assets/questions/0314_q314_Question_314.png",
    "needs_image": false,
    "review_flags": [],
    "confidence": "high"
  },
  {
    "id": 315,
    "chapter": "GT1",
    "folder": "GT1",
    "topic": "HamSo",
    "type": "single_choice",
    "question": "Find \\(f \\circ g \\circ h\\), where \\(f(x) = 2x + 1; \\quad g(x) = \\sin(x^2); \\quad h(x) = e^{-x}\\).\n(i) \\(2\\sin(e^{-2x}) + 1\\)\n(ii) \\(2\\sin(x^2 e^{-x}) + 1\\)\n(iii) \\(2\\sin(e^{-2x} + 1)\\)\n(iv) \\(2\\sin(x^2 e^{-2x} + 1)\\)",
    "options": [
      "(i)",
      "(ii)",
      "(iii)",
      "(iv)",
      "None of the other choices is correct"
    ],
    "answer": "A",
    "answer_original": "A",
    "answer_status": "verified",
    "explanation": [
      "Thực hiện hợp thành các hàm số từ trong ra ngoài:",
      "1) \\(h(x) = e^{-x}\\)",
      "2) \\((g \\circ h)(x) = g(h(x)) = \\sin((e^{-x})^2) = \\sin(e^{-2x})\\)",
      "3) \\((f \\circ g \\circ h)(x) = f(g(h(x))) = 2\\sin(e^{-2x}) + 1\\)",
      "Kết quả này tương ứng với khẳng định (i). Lựa chọn A tương ứng với (i).",
      "Vậy đáp án đúng là A."
    ],
    "image": "assets/questions/0315_q315_Question_315.png",
    "needs_image": false,
    "review_flags": [],
    "confidence": "high"
  },
  {
    "id": 316,
    "chapter": "DSTT1",
    "folder": "DSTT1",
    "topic": "DinhThuc",
    "type": "single_choice",
    "question": "If \\(\\det \\begin{bmatrix} a & b & c \\\\ p & q & r \\\\ x & y & z \\end{bmatrix} = -1\\), compute \\(\\det \\begin{bmatrix} -2a & -2b & -2c \\\\ 2p + x & 2q + y & 2r + z \\\\ 3x & 3y & 3z \\end{bmatrix}\\).",
    "options": [
      "-6",
      "6",
      "12",
      "-12",
      "None of the other choices is correct"
    ],
    "answer": "C",
    "answer_original": "C",
    "answer_status": "verified",
    "explanation": [
      "Áp dụng tính chất định thức đối với phép nhân một dòng với một số:\n- Đặt thừa số chung \\(-2\\) từ dòng 1 ra ngoài.\n- Đặt thừa số chung \\(3\\) từ dòng 3 ra ngoài.",
      "\\[ \\det = (-2)(3) \\det \\begin{bmatrix} a & b & c \\\\ 2p + x & 2q + y & 2r + z \\\\ x & y & z \\end{bmatrix} = -6 \\det \\begin{bmatrix} a & b & c \\\\ 2p + x & 2q + y & 2r + z \\\\ x & y & z \\end{bmatrix} \\]",
      "Trừ dòng 3 khỏi dòng 2 (phép biến đổi sơ cấp này không làm đổi định thức):\n\\[ R_2 \\gets R_2 - R_3 = [2p, 2q, 2r] \\]",
      "Đặt tiếp thừa số 2 từ dòng 2 ra ngoài:\n\\[ = -6 \\cdot 2 \\det \\begin{bmatrix} a & b & c \\\\ p & q & r \\\\ x & y & z \\end{bmatrix} = -12 \\det \\begin{bmatrix} a & b & c \\\\ p & q & r \\\\ x & y & z \\end{bmatrix} \\]",
      "Thay giá trị định thức ban đầu bằng \\(-1\\):\n\\[ = -12 \\times (-1) = 12 \\]",
      "Vậy đáp án đúng là C (12)."
    ],
    "image": "assets/questions/0316_q316_Question_316.png",
    "needs_image": false,
    "review_flags": [],
    "confidence": "high"
  },
  {
    "id": 317,
    "chapter": "DSTT1",
    "folder": "DSTT1",
    "topic": "AnhXaTuyenTinh",
    "type": "single_choice",
    "question": "Let \\(T : \\mathbb{R}^2 \\to \\mathbb{R}^2\\) be a linear transformation satisfying \\(T(1, 1) = (1, 2)\\) and \\(T(1, 2) = (3, 4)\\). Find \\(T(5, 8)\\).",
    "options": [
      "(10, 17)",
      "(11, 15)",
      "(9, 11)",
      "(11, 16)"
    ],
    "answer": "D",
    "answer_original": "D",
    "answer_status": "verified",
    "explanation": [
      "Biểu diễn vectơ \\((5, 8)\\) thành tổ hợp tuyến tính của hai vectơ \\((1, 1)\\) và \\((1, 2)\\):\n\\[ c_1(1, 1) + c_2(1, 2) = (5, 8) \\]",
      "Hệ phương trình:\n\\[ \\begin{cases} c_1 + c_2 = 5 \\\\ c_1 + 2c_2 = 8 \\end{cases} \\implies \\begin{cases} c_2 = 8 - 5 = 3 \\\\ c_1 = 5 - 3 = 2 \\end{cases} \\]",
      "Theo tính chất tuyến tính của ánh xạ \\(T\\):\n\\[ T(5, 8) = 2 T(1, 1) + 3 T(1, 2) \\]",
      "Thay ảnh của các vectơ đề bài đã cho:\n\\[ T(5, 8) = 2(1, 2) + 3(3, 4) = (2, 4) + (9, 12) = (11, 16) \\]",
      "Vậy \\(T(5, 8) = (11, 16)\\). Đáp án đúng là D."
    ],
    "image": "assets/questions/0317_q317_Question_317.png",
    "needs_image": false,
    "review_flags": [],
    "confidence": "high"
  },
  {
    "id": 318,
    "chapter": "DSTT1",
    "folder": "DSTT1",
    "topic": "MaTran",
    "type": "single_choice",
    "question": "Which of the following matrices are in row-echelon form?\n(i) \\(\\begin{bmatrix} 1 & 2 & 3 \\\\ -1 & 0 & 0 \\\\ 0 & 1 & 0 \\end{bmatrix}\\)\n(ii) \\(\\begin{bmatrix} 2 & 4 & 1 \\\\ 0 & 1 & 3 \\\\ 0 & 0 & 0 \\end{bmatrix}\\)",
    "options": [
      "(i)",
      "(i) and (ii)",
      "None of the other choices is correct",
      "(ii)"
    ],
    "answer": "C",
    "answer_original": "C",
    "answer_status": "verified",
    "explanation": [
      "Theo giáo trình MAE101 (sách Elementary Linear Algebra của Howard Anton), định nghĩa dạng bậc thang (Row Echelon Form - REF) quy định:",
      "1) Phần tử khác 0 đầu tiên của mỗi dòng không phải toàn số 0 phải là số 1 (gọi là leading 1).",
      "2) Các dòng toàn số 0 (nếu có) phải nằm ở dưới cùng.",
      "3) Số 1 dẫn đầu ở dòng dưới phải nằm lệch sang phải so với số 1 dẫn đầu ở dòng ngay trên.",
      "Kiểm tra từng ma trận:",
      "- Ma trận (i): Phần tử ở dòng 2, cột 1 là \\(-1 \\neq 0\\) nằm dưới phần tử dẫn đầu của dòng 1, vi phạm quy tắc. Vậy (i) không ở dạng bậc thang.",
      "- Ma trận (ii): Phần tử khác không đầu tiên của dòng 1 là số 2 (không phải là số 1 dẫn đầu theo chuẩn Anton). Do đó (ii) không ở dạng bậc thang.",
      "Vì cả hai ma trận đều không ở dạng bậc thang, đáp án đúng là 'None of the other choices is correct' (lựa chọn C)."
    ],
    "image": "assets/questions/0318_q318_Question_318.png",
    "needs_image": false,
    "review_flags": [],
    "confidence": "high"
  },
  {
    "id": 319,
    "chapter": "DSTT1",
    "folder": "DSTT1",
    "topic": "MaTran",
    "type": "single_choice",
    "question": "Let \\(A\\) be an arbitrary square matrix. Which of the following matrices are symmetric:\n(i) \\(A + A^T\\)\n(ii) \\(A + 2A^T\\)",
    "options": [
      "(i) and (ii)",
      "None of the other choices is correct",
      "(i)",
      "(ii)"
    ],
    "answer": "C",
    "answer_original": "C",
    "answer_status": "verified",
    "explanation": [
      "Theo định nghĩa, ma trận vuông \\(M\\) là ma trận đối xứng khi và chỉ khi \\(M^T = M\\).",
      "Xét ma trận (i) \\(M_1 = A + A^T\\):\n\\[ M_1^T = (A + A^T)^T = A^T + (A^T)^T = A^T + A = A + A^T = M_1 \\]\nDo đó \\(A + A^T\\) luôn luôn là ma trận đối xứng với mọi ma trận vuông \\(A\\).",
      "Xét ma trận (ii) \\(M_2 = A + 2A^T\\):\n\\[ M_2^T = (A + 2A^T)^T = A^T + 2(A^T)^T = A^T + 2A = 2A + A^T \\]\nNói chung \\(2A + A^T \\neq A + 2A^T\\) trừ khi \\(A = A^T\\). Vì \\(A\\) là ma trận vuông tùy ý nên \\(A + 2A^T\\) không nhất thiết đối xứng.",
      "Vậy chỉ có ma trận (i) luôn đối xứng. Đáp án đúng là C."
    ],
    "image": "assets/questions/0319_q319_Question_319.png",
    "needs_image": false,
    "review_flags": [],
    "confidence": "high"
  },
  {
    "id": 320,
    "chapter": "DSTT1",
    "folder": "DSTT1",
    "topic": "TriRiengVectorRieng",
    "type": "single_choice",
    "question": "Let A be a \\(3 \\times 3\\) matrix with eigenvalues \\(\\lambda_1 = 2, \\lambda_2 = -3\\) and \\(\\lambda_3 = 4\\). What is the determinant of A ?",
    "options": [
      "-6",
      "-24",
      "3",
      "There is not enough information to conclude"
    ],
    "answer": "B",
    "answer_original": "B",
    "answer_status": "verified",
    "explanation": [
      "Theo tính chất quan trọng của ma trận vuông, định thức của ma trận bằng tích tất cả các giá trị riêng (kể cả bội):",
      "\\[ \\det(A) = \\prod_{i=1}^n \\lambda_i = \\lambda_1 \\cdot \\lambda_2 \\cdot \\lambda_3 \\]",
      "Thay các giá trị riêng đã cho:\n\\[ \\det(A) = 2 \\cdot (-3) \\cdot 4 = -24 \\]",
      "Vậy định thức của \\(A\\) bằng \\(-24\\).",
      "Đáp án đúng là B."
    ],
    "image": "assets/questions/0320_q320_Question_320.png",
    "needs_image": false,
    "review_flags": [],
    "confidence": "high"
  }
];

fs.writeFileSync(path.join(__dirname, '../data/v2/batches/batch_08.json'), JSON.stringify(batch08, null, 2), 'utf8');
console.log('Batch 08 created successfully with 40 questions (Q281 - Q320).');
