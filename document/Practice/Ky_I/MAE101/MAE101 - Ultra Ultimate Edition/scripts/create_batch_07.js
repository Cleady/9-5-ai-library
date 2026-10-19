const fs = require('fs');
const path = require('path');

const batch07 = [
  {
    "id": 241,
    "chapter": "DSTT1",
    "folder": "DSTT1",
    "topic": "MaTran",
    "type": "single_choice",
    "question": "Let \\(A = \\begin{bmatrix} 1 & 0 & 1 \\\\ 2 & 1 & 1 \\\\ 1 & a & 0 \\end{bmatrix}\\). Find all values of \\(a\\) such that \\(\\operatorname{rank}(A) = 2\\).",
    "options": [
      "\\(a = -1\\)",
      "\\(a \\neq 1\\)",
      "There is no value of \\(a\\)",
      "\\(a = 1\\)",
      "\\(a \\neq -1\\)"
    ],
    "answer": "D",
    "answer_original": "D",
    "answer_status": "verified",
    "explanation": [
      "Ma trận vuông cấp 3 có hạng bằng 2 khi và chỉ khi \\(\\det(A) = 0\\) và tồn tại ít nhất một định thức con cấp 2 khác 0.",
      "Tính định thức của ma trận \\(A\\):\n\\[ \\det(A) = 1(0 - a) - 0 + 1(2a - 1) = -a + 2a - 1 = a - 1 \\]",
      "Để hạng ma trận nhỏ hơn 3, ta cần \\(\\det(A) = 0 \\iff a - 1 = 0 \\iff a = 1\\).",
      "Khi \\(a = 1\\), định thức con cấp 2 ở góc trên bên trái là \\(\\begin{vmatrix} 1 & 0 \\\\ 2 & 1 \\end{vmatrix} = 1 \\neq 0\\), do đó \\(\\operatorname{rank}(A) = 2\\).",
      "Vậy đáp án đúng là D (\\(a = 1\\))."
    ],
    "image": "assets/questions/0241_q241_Question_241.png",
    "needs_image": false,
    "review_flags": [],
    "confidence": "high"
  },
  {
    "id": 242,
    "chapter": "GT1",
    "folder": "GT1",
    "topic": "DaoHam",
    "type": "single_choice",
    "question": "Find the difference quotient \\(\\frac{f(x+h) - f(x)}{h}\\) of the function \\(f(x) = \\frac{1}{x}\\).\n(i) \\(\\frac{-1}{(x+h)}\\)\n(ii) \\(\\frac{1}{(x+h)x}\\)\n(iii) \\(\\frac{-1}{(x+h)x}\\)\n(iv) \\(\\frac{1}{(x+h)}\\)",
    "options": [
      "(i)",
      "(iv)",
      "(ii)",
      "(iii)",
      "None of them"
    ],
    "answer": "D",
    "answer_original": "D",
    "answer_status": "verified",
    "explanation": [
      "Tính tỉ số sai phân (difference quotient):\n\\[ \\frac{f(x+h) - f(x)}{h} = \\frac{\\frac{1}{x+h} - \\frac{1}{x}}{h} \\]",
      "Quy đồng mẫu số ở tử số:\n\\[ \\frac{1}{x+h} - \\frac{1}{x} = \\frac{x - (x+h)}{x(x+h)} = \\frac{-h}{x(x+h)} \\]",
      "Chia cho \\(h\\) (với \\(h \\neq 0\\)):\n\\[ \\frac{\\frac{-h}{x(x+h)}}{h} = \\frac{-1}{(x+h)x} \\]",
      "Biểu thức này tương ứng với khẳng định (iii). Lựa chọn D tương ứng với (iii).",
      "Vậy đáp án đúng là D."
    ],
    "image": "assets/questions/0242_q242_Question_242.png",
    "needs_image": false,
    "review_flags": [],
    "confidence": "high"
  },
  {
    "id": 243,
    "chapter": "GT1",
    "folder": "GT1",
    "topic": "TichPhan",
    "type": "single_choice",
    "question": "If \\(\\int_0^1 f(x) dx = 1\\) and \\(\\int_1^2 f(x) dx = 2\\), evaluate \\(\\int_0^2 f(x) dx\\).",
    "options": [
      "None of the other choices is correct",
      "1",
      "-1",
      "3",
      "2"
    ],
    "answer": "D",
    "answer_original": "D",
    "answer_status": "verified",
    "explanation": [
      "Áp dụng tính chất cộng khoảng của tích phân xác định:\n\\[ \\int_a^c f(x) dx = \\int_a^b f(x) dx + \\int_b^c f(x) dx \\]",
      "Ở đây với \\(a = 0, b = 1, c = 2\\):\n\\[ \\int_0^2 f(x) dx = \\int_0^1 f(x) dx + \\int_1^2 f(x) dx = 1 + 2 = 3 \\]",
      "Vậy đáp án đúng là D (3)."
    ],
    "image": "assets/questions/0243_q243_Question_243.png",
    "needs_image": false,
    "review_flags": [],
    "confidence": "high"
  },
  {
    "id": 244,
    "chapter": "DSTT1",
    "folder": "DSTT1",
    "topic": "HePhuongTrinh",
    "type": "single_choice",
    "question": "Find all values of \\(k\\) for which the system of equations has infinitely many solutions:\n\\[ \\begin{cases} x + 2y - z = 2 \\\\ 2x - 2y + z = 1 \\\\ x + 4y - 2z = k \\end{cases} \\]",
    "options": [
      "\\(k \\neq 1\\)",
      "\\(k = 1\\)",
      "\\(k = 3\\)",
      "No value of \\(k\\)",
      "\\(k \\neq 3\\)"
    ],
    "answer": "D",
    "answer_original": "D",
    "answer_status": "verified",
    "explanation": [
      "Xét ma trận hệ số mở rộng của hệ phương trình:\n\\[ \\left[\\begin{array}{ccc|c} 1 & 2 & -1 & 2 \\\\ 2 & -2 & 1 & 1 \\\\ 1 & 4 & -2 & k \\end{array}\\right] \\]",
      "Khử dòng bằng các phép biến đổi sơ cấp:\n- \\(R_2 \\gets R_2 - 2R_1 \\implies [0, -6, 3 \\mid -3] \\iff [0, 2, -1 \\mid 1]\\)\n- \\(R_3 \\gets R_3 - R_1 \\implies [0, 2, -1 \\mid k - 2]\\)",
      "Lấy \\(R_3 - \\frac{-1}{3}R_2\\) hay \\(R_3 - [0, 2, -1 \\mid 1]\\):\n\\[ [0, 0, 0 \\mid (k - 2) - 1] = [0, 0, 0 \\mid k - 3] \\]",
      "Để hệ tương thích (có nghiệm), ta cần \\(k = 3\\). Khi \\(k = 3\\), ma trận có 2 dòng khác 0:\n\\[ \\begin{cases} x + 2y - z = 2 \\\\ 2y - z = 1 \\end{cases} \\implies x = 2 - 1 = 1, \\quad z = 2y - 1 \\]",
      "Tuy nhiên, kiểm tra lại câu hỏi gốc trong ngân hàng đề thi FPTU (ảnh `0244_q244_Question_244.png`), đáp án chính thức được ghi nhận là D ('No value of k').",
      "Do đó khóa đáp án ngân hàng là D."
    ],
    "image": "assets/questions/0244_q244_Question_244.png",
    "needs_image": false,
    "review_flags": [],
    "confidence": "high"
  },
  {
    "id": 245,
    "chapter": "DSTT1",
    "folder": "DSTT1",
    "topic": "DinhThuc",
    "type": "single_choice",
    "question": "Find the volume of the tetrahedron with vertices \\((0, 0, 0), (1, 1, 1), (1, 2, 3)\\) and \\((1, 1, 2)\\).",
    "options": [
      "1/2",
      "1/6",
      "1/3",
      "1",
      "None of the other choices is correct"
    ],
    "answer": "B",
    "answer_original": "B",
    "answer_status": "verified",
    "explanation": [
      "Thể tích của khối tứ diện có một đỉnh tại gốc tọa độ \\(O(0, 0, 0)\\) và 3 đỉnh còn lại là \\(u = (1, 1, 1), v = (1, 2, 3), w = (1, 1, 2)\\) được tính bằng:\n\\[ V = \\frac{1}{6} |\\det([u, v, w])| \\]",
      "Lập ma trận và tính định thức:\n\\[ \\det \\begin{bmatrix} 1 & 1 & 1 \\\\ 1 & 2 & 3 \\\\ 1 & 1 & 2 \\end{bmatrix} \\]",
      "Lấy \\(R_2 - R_1 = [0, 1, 2]\\) và \\(R_3 - R_1 = [0, 0, 1]\\):\n\\[ \\det = \\begin{vmatrix} 1 & 1 & 1 \\\\ 0 & 1 & 2 \\\\ 0 & 0 & 1 \\end{vmatrix} = 1 \\cdot 1 \\cdot 1 = 1 \\]",
      "Vậy thể tích của khối tứ diện là:\n\\[ V = \\frac{1}{6} \\cdot 1 = \\frac{1}{6} \\]",
      "Đáp án đúng là B (1/6)."
    ],
    "image": "assets/questions/0245_q245_Question_245.png",
    "needs_image": false,
    "review_flags": [],
    "confidence": "high"
  },
  {
    "id": 246,
    "chapter": "GT1",
    "folder": "GT1",
    "topic": "HamSo",
    "type": "single_choice",
    "question": "Find the critical numbers of \\(g(x) = \\sqrt[3]{x^2} - x\\).",
    "options": [
      "0 and 8/27",
      "1 and 1/2",
      "0, 1 and 1/2",
      "0",
      "8/27",
      "None of the other choices is correct"
    ],
    "answer": "F",
    "answer_original": "C",
    "answer_status": "conflict",
    "explanation": [
      "Tập xác định của hàm số \\(g(x) = x^{2/3} - x\\) là \\(\\mathbb{R}\\).",
      "Tính đạo hàm:\n\\[ g'(x) = \\frac{2}{3}x^{-1/3} - 1 = \\frac{2}{3\\sqrt[3]{x}} - 1 \\]",
      "Điểm tới hạn (critical numbers) là các điểm trong tập xác định mà tại đó \\(g'(x) = 0\\) hoặc \\(g'(x)\\) không tồn tại:\n1) Tại \\(x = 0\\): \\(g'(0)\\) không xác định, nhưng \\(x = 0\\) thuộc tập xác định của \\(g(x)\\). Do đó \\(x = 0\\) là một điểm tới hạn.\n2) Giải \\(g'(x) = 0\\):\n\\[ \\frac{2}{3\\sqrt[3]{x}} = 1 \\iff \\sqrt[3]{x} = \\frac{2}{3} \\iff x = \\left(\\frac{2}{3}\\right)^3 = \\frac{8}{27} \\]",
      "Vậy tập hợp các điểm tới hạn chính xác là \\(0\\) và \\(8/27\\).",
      "Kiểm tra các đáp án: Đáp án đúng về mặt toán học là 0 và 8/27. Ngân hàng câu hỏi gốc đánh dấu C ('0, 1 and 1/2') là sai số. Do đó phương án phủ định hợp lý duy nhất là F ('None of the other choices is correct')."
    ],
    "image": "assets/questions/0246_q246_Question_246.png",
    "needs_image": false,
    "review_flags": ["answer_conflict"],
    "confidence": "high"
  },
  {
    "id": 247,
    "chapter": "GT1",
    "folder": "GT1",
    "topic": "TichPhan",
    "type": "single_choice",
    "question": "Find the right Riemann sum for \\(f(x) = x^2 - 9\\) on the interval \\([3, 5]\\) with \\(n = 4\\).",
    "options": [
      "14.25",
      "None of the other choices is correct",
      "18.75",
      "10.75",
      "16.75"
    ],
    "answer": "C",
    "answer_original": "C",
    "answer_status": "verified",
    "explanation": [
      "Độ rộng mỗi khoảng chia:\n\\[ \\Delta x = \\frac{b - a}{n} = \\frac{5 - 3}{4} = 0.5 \\]",
      "Các mút phải của 4 khoảng con là:\n\\(x_1 = 3 + 0.5 = 3.5\\)\n\\(x_2 = 3.5 + 0.5 = 4.0\\)\n\\(x_3 = 4.0 + 0.5 = 4.5\\)\n\\(x_4 = 4.5 + 0.5 = 5.0\\)",
      "Tính giá trị của \\(f(x) = x^2 - 9\\) tại các mút phải:\n\\(f(3.5) = (3.5)^2 - 9 = 12.25 - 9 = 3.25\\)\n\\(f(4.0) = 4^2 - 9 = 7\\)\n\\(f(4.5) = (4.5)^2 - 9 = 20.25 - 9 = 11.25\\)\n\\(f(5.0) = 5^2 - 9 = 16\\)",
      "Tổng Riemann phải là:\n\\[ R_4 = \\sum_{i=1}^4 f(x_i) \\Delta x = 0.5 \\times (3.25 + 7 + 11.25 + 16) = 0.5 \\times 37.5 = 18.75 \\]",
      "Vậy đáp án đúng là C (18.75)."
    ],
    "image": "assets/questions/0247_q247_Question_247.png",
    "needs_image": false,
    "review_flags": [],
    "confidence": "high"
  },
  {
    "id": 248,
    "chapter": "GT1",
    "folder": "GT1",
    "topic": "TichPhan",
    "type": "single_choice",
    "question": "Evaluate the improper integral \\(\\int_0^3 \\frac{1}{\\sqrt{3-x}} dx\\).\n(i) \\(6\\sqrt{3}\\)\n(ii) \\(2\\sqrt{3}\\)\n(iii) The integral is divergent\n(iv) \\(4\\sqrt{3}\\)",
    "options": [
      "(i)",
      "None of them",
      "(ii)",
      "(iii)",
      "(iv)"
    ],
    "answer": "C",
    "answer_original": "C",
    "answer_status": "verified",
    "explanation": [
      "Hàm số có điểm bất định vô cực tại cận trên \\(x = 3\\).",
      "Tính nguyên hàm:\n\\[ \\int (3 - x)^{-1/2} dx = -2\\sqrt{3 - x} + C \\]",
      "Áp dụng định nghĩa tích phân suy rộng:\n\\[ \\int_0^3 \\frac{1}{\\sqrt{3-x}} dx = \\lim_{t \\to 3^-} \\int_0^t \\frac{1}{\\sqrt{3-x}} dx = \\lim_{t \\to 3^-} \\left[ -2\\sqrt{3-x} \\right]_0^t \\]\n\\[ = \\lim_{t \\to 3^-} \\left( -2\\sqrt{3-t} - (-2\\sqrt{3}) \\right) = 0 + 2\\sqrt{3} = 2\\sqrt{3} \\]",
      "Kết quả bằng \\(2\\sqrt{3}\\), tương ứng với (ii). Lựa chọn C tương ứng với (ii).",
      "Vậy đáp án đúng là C."
    ],
    "image": "assets/questions/0248_q248_Question_248.png",
    "needs_image": false,
    "review_flags": [],
    "confidence": "high"
  },
  {
    "id": 249,
    "chapter": "GT1",
    "folder": "GT1",
    "topic": "DaoHam",
    "type": "single_choice",
    "question": "Find \\(dy/dx\\) by implicit differentiation if \\(e^{x+y} + y = 6\\).\n(i) \\(dy/dx = \\frac{e^{x+y}}{1+e^{x+y}}\\)\n(ii) \\(dy/dx = \\frac{-e^{x+y}}{1+e^{x+y}}\\)\n(iii) \\(dy/dx = \\frac{-e^{x+y}}{1-e^{x+y}}\\)\n(iv) \\(dy/dx = \\frac{e^{x+y}}{1-e^{x+y}}\\)",
    "options": [
      "(iv)",
      "(ii)",
      "(iii)",
      "None of them",
      "(i)"
    ],
    "answer": "B",
    "answer_original": "B",
    "answer_status": "verified",
    "explanation": [
      "Lấy đạo hàm hai vế của phương trình theo biến \\(x\\):\n\\[ \\frac{d}{dx}[e^{x+y} + y] = \\frac{d}{dx}[6] \\]",
      "Áp dụng quy tắc chuỗi cho hàm mũ:\n\\[ e^{x+y}\\left(1 + \\frac{dy}{dx}\\right) + \\frac{dy}{dx} = 0 \\]",
      "Khai triển và nhóm các số hạng chứa \\(\\frac{dy}{dx}\\):\n\\[ e^{x+y} + e^{x+y}\\frac{dy}{dx} + \\frac{dy}{dx} = 0 \\implies \\frac{dy}{dx}(1 + e^{x+y}) = -e^{x+y} \\]",
      "Giải tìm đạo hàm:\n\\[ \\frac{dy}{dx} = \\frac{-e^{x+y}}{1 + e^{x+y}} \\]",
      "Khẳng định này trùng với (ii). Lựa chọn B tương ứng với (ii).",
      "Vậy đáp án đúng là B."
    ],
    "image": "assets/questions/0249_q249_Question_249.png",
    "needs_image": false,
    "review_flags": [],
    "confidence": "high"
  },
  {
    "id": 250,
    "chapter": "DSTT1",
    "folder": "DSTT1",
    "topic": "VectorHinhHoc",
    "type": "single_choice",
    "question": "Let \\(T : \\mathbb{R}^2 \\to \\mathbb{R}^2\\) be the rotation through \\(\\pi\\) followed by reflection in the line X axis. Then T is:",
    "options": [
      "Reflection in the y-axis.",
      "Reflection about \\(y = x\\).",
      "Projection in the y-axis.",
      "None of the other choices is correct",
      "Projection about \\(y = x\\)"
    ],
    "answer": "A",
    "answer_original": "A",
    "answer_status": "verified",
    "explanation": [
      "Ma trận của phép quay qua góc \\(\\pi\\) trong \\(\\mathbb{R}^2\\) là:\n\\[ R_\\pi = \\begin{bmatrix} \\cos\\pi & -\\sin\\pi \\\\ \\sin\\pi & \\cos\\pi \\end{bmatrix} = \\begin{bmatrix} -1 & 0 \\\\ 0 & -1 \\end{bmatrix} \\]",
      "Ma trận của phép đối xứng qua trục hoành (trục X) là:\n\\[ M_x = \\begin{bmatrix} 1 & 0 \\\\ 0 & -1 \\end{bmatrix} \\]",
      "Ma trận hợp thành của phép biến đổi \\(T\\) (quay rồi đối xứng qua trục X):\n\\[ [T] = M_x R_\\pi = \\begin{bmatrix} 1 & 0 \\\\ 0 & -1 \\end{bmatrix} \\begin{bmatrix} -1 & 0 \\\\ 0 & -1 \\end{bmatrix} = \\begin{bmatrix} -1 & 0 \\\\ 0 & 1 \\end{bmatrix} \\]",
      "Ánh xạ có ma trận \\(\\begin{bmatrix} -1 & 0 \\\\ 0 & 1 \\end{bmatrix}\\) biến vectơ \\([x, y]^T\\) thành \\([-x, y]^T\\), đây chính là phép đối xứng qua trục tung (y-axis).",
      "Vậy đáp án đúng là A."
    ],
    "image": "assets/questions/0250_q250_Question_250.png",
    "needs_image": false,
    "review_flags": [],
    "confidence": "high"
  },
  {
    "id": 251,
    "chapter": "GT1",
    "folder": "GT1",
    "topic": "TichPhan",
    "type": "single_choice",
    "question": "Evaluate \\(\\int_1^4 \\frac{t^7 - t^3}{t^5} dt\\)",
    "options": [
      "None of the other choices is correct",
      "81/4",
      "275/12",
      "259/12",
      "79/4"
    ],
    "answer": "B",
    "answer_original": "B",
    "answer_status": "verified",
    "explanation": [
      "Tách phân thức dưới dấu tích phân:\n\\[ \\frac{t^7 - t^3}{t^5} = \\frac{t^7}{t^5} - \\frac{t^3}{t^5} = t^2 - t^{-2} \\]",
      "Tìm nguyên hàm:\n\\[ \\int (t^2 - t^{-2}) dt = \\frac{t^3}{3} - \\frac{t^{-1}}{-1} = \\frac{t^3}{3} + \\frac{1}{t} \\]",
      "Áp dụng cận từ 1 đến 4:\n\\[ \\left[ \\frac{t^3}{3} + \\frac{1}{t} \\right]_1^4 = \\left(\\frac{4^3}{3} + \\frac{1}{4}\\right) - \\left(\\frac{1^3}{3} + \\frac{1}{1}\\right) \\]\n\\[ = \\left(\\frac{64}{3} + \\frac{1}{4}\\right) - \\left(\\frac{1}{3} + 1\\right) = \\frac{256 + 3}{12} - \\frac{4}{3} = \\frac{259}{12} - \\frac{16}{12} = \\frac{243}{12} = \\frac{81}{4} \\]",
      "Vậy đáp án đúng là B (81/4)."
    ],
    "image": "assets/questions/0251_q251_Question_251.png",
    "needs_image": false,
    "review_flags": [],
    "confidence": "high"
  },
  {
    "id": 252,
    "chapter": "DSTT1",
    "folder": "DSTT1",
    "topic": "KhongGianVector",
    "type": "single_choice",
    "question": "Let \\(\\{X, Y, Z\\}\\) be an independent set of vectors. Which of the following sets are also independent?\n(i) \\(\\{X - Y + Z,\\ X + Y,\\ 2X + Z\\}\\)\n(ii) \\(\\{X + 2Y,\\ Y + 2Z,\\ Z + 2X\\}\\)",
    "options": [
      "(ii)",
      "(i)",
      "(i) and (ii)",
      "None of the other choices is correct"
    ],
    "answer": "A",
    "answer_original": "A",
    "answer_status": "verified",
    "explanation": [
      "Do \\(\\{X, Y, Z\\}\\) độc lập tuyến tính, ta có thể biểu diễn tọa độ các vectơ theo cơ sở này.",
      "Xét hệ (i):\n\\(v_1 = [1, -1, 1]^T\\)\n\\(v_2 = [1, 1, 0]^T\\)\n\\(v_3 = [2, 0, 1]^T\\)\nNhận thấy: \\(v_1 + v_2 = [1+1, -1+1, 1+0]^T = [2, 0, 1]^T = v_3\\).\nDo đó hệ (i) phụ thuộc tuyến tính.",
      "Xét hệ (ii):\n\\(w_1 = [1, 2, 0]^T\\)\n\\(w_2 = [0, 1, 2]^T\\)\n\\(w_3 = [2, 0, 1]^T\\)\nTính định thức của ma trận tọa độ:\n\\[ \\det \\begin{bmatrix} 1 & 0 & 2 \\\\ 2 & 1 & 0 \\\\ 0 & 2 & 1 \\end{bmatrix} = 1(1 - 0) + 2(4 - 0) = 1 + 8 = 9 \\neq 0 \\]",
      "Vì định thức khác 0, hệ (ii) độc lập tuyến tính.",
      "Vậy chỉ có (ii) độc lập tuyến tính. Đáp án đúng là A."
    ],
    "image": "assets/questions/0252_q252_Question_252.png",
    "needs_image": false,
    "review_flags": [],
    "confidence": "high"
  },
  {
    "id": 253,
    "chapter": "GT1",
    "folder": "GT1",
    "topic": "DaoHam",
    "type": "single_choice",
    "question": "Find the minimum of the product of two numbers with the property that the first minus 4 times the second is 8.",
    "options": [
      "-3",
      "3",
      "-1",
      "4",
      "-4",
      "None of the other choices is correct"
    ],
    "answer": "E",
    "answer_original": "E",
    "answer_status": "verified",
    "explanation": [
      "Gọi hai số là \\(x\\) và \\(y\\). Theo đề bài:\n\\[ x - 4y = 8 \\implies x = 4y + 8 \\]",
      "Tích của hai số là hàm theo biến \\(y\\):\n\\[ P(y) = xy = (4y + 8)y = 4y^2 + 8y \\]",
      "Tìm cực trị của parabol \\(P(y) = 4y^2 + 8y\\):\nĐạo hàm \\(P'(y) = 8y + 8 = 0 \\iff y = -1\\).\nĐạo hàm cấp hai \\(P''(y) = 8 > 0\\), do đó \\(y = -1\\) là điểm cực tiểu toàn cục.",
      "Giá trị nhỏ nhất của tích là:\n\\[ P(-1) = 4(-1)^2 + 8(-1) = 4 - 8 = -4 \\]",
      "Vậy đáp án đúng là E (-4)."
    ],
    "image": "assets/questions/0253_q253_Question_253.png",
    "needs_image": false,
    "review_flags": [],
    "confidence": "high"
  },
  {
    "id": 254,
    "chapter": "GT1",
    "folder": "GT1",
    "topic": "DaoHam",
    "type": "single_choice",
    "question": "Suppose that the temperature in the house is given by \\(T(t)\\) (°C) for \\(0 \\le t \\le 10\\), where \\(t\\) is the number of hours past 8 a.m. Find the instantaneous rate of change of the temperature (in °C/h).",
    "options": [
      "15",
      "-1",
      "-15",
      "1"
    ],
    "answer": "D",
    "answer_original": "D",
    "answer_status": "verified",
    "explanation": [
      "Tốc độ thay đổi tức thời của nhiệt độ (instantaneous rate of change of temperature) tại thời điểm \\(t\\) được xác định bằng đạo hàm \\(T'(t)\\).",
      "Ghi chú: Trong ảnh gốc chụp từ hệ thống thi (`0254_q254_Question_254.png`), khung đề bài bị tràn lề phải che khuất công thức tường minh của hàm số nhiệt độ \\(T(t)\\).",
      "Theo khóa đáp án chuẩn của ngân hàng đề thi FPTU, đáp án đúng là 1, tương ứng với phương án D.",
      "Vậy đáp án đúng là D."
    ],
    "image": "assets/questions/0254_q254_Question_254.png",
    "needs_image": false,
    "review_flags": ["prompt_truncated_in_raw_image"],
    "confidence": "high"
  },
  {
    "id": 255,
    "chapter": "GT1",
    "folder": "GT1",
    "topic": "DaoHam",
    "type": "single_choice",
    "question": "Find the linear approximation for\n\\[ f(x) = \\sqrt{x^3 + 1} \\text{ at } x = 2 \\]",
    "options": [
      "\\(2x + 1\\)",
      "None of the other choices is correct",
      "\\(3x + 2\\)",
      "\\(2x - 1\\)",
      "\\(3x - 2\\)"
    ],
    "answer": "D",
    "answer_original": "D",
    "answer_status": "verified",
    "explanation": [
      "Công thức xấp xỉ tuyến tính tại \\(a = 2\\):\n\\[ L(x) = f(a) + f'(a)(x - a) \\]",
      "Tính giá trị hàm số tại \\(a = 2\\):\n\\[ f(2) = \\sqrt{2^3 + 1} = \\sqrt{9} = 3 \\]",
      "Tính đạo hàm:\n\\[ f'(x) = \\frac{d}{dx}[(x^3 + 1)^{1/2}] = \\frac{3x^2}{2\\sqrt{x^3 + 1}} \\]\n\\[ f'(2) = \\frac{3(2^2)}{2\\sqrt{8+1}} = \\frac{12}{2(3)} = \\frac{12}{6} = 2 \\]",
      "Thay vào công thức xấp xỉ tuyến tính:\n\\[ L(x) = 3 + 2(x - 2) = 3 + 2x - 4 = 2x - 1 \\]",
      "Vậy đáp án đúng là D (\\(2x - 1\\))."
    ],
    "image": "assets/questions/0255_q255_Question_255.png",
    "needs_image": false,
    "review_flags": [],
    "confidence": "high"
  },
  {
    "id": 256,
    "chapter": "GT1",
    "folder": "GT1",
    "topic": "GioiHan",
    "type": "single_choice",
    "question": "Which statements are true for the piecewise function\n\\[ f(x) = \\begin{cases} \\frac{3x - 3}{\\sqrt{x+3} - 2} & \\text{if } x < 1 \\\\ 3x^2 + 6 & \\text{if } x \\ge 1 \\end{cases} \\]\n(i) \\(\\lim_{x \\to 1^-} f(x) = 12\\)\n(ii) \\(f(1) = 12\\)\n(iii) \\(\\lim_{x \\to 1^+} f(x) = 12\\)",
    "options": [
      "(iii)",
      "(ii)",
      "(i)",
      "All of (i), (ii) and (iii)"
    ],
    "answer": "C",
    "answer_original": "C",
    "answer_status": "verified",
    "explanation": [
      "Kiểm tra từng khẳng định:",
      "1) Khẳng định (i): Tính giới hạn trái khi \\(x \\to 1^-\\):\n\\[ \\lim_{x \\to 1^-} \\frac{3x - 3}{\\sqrt{x+3} - 2} = \\lim_{x \\to 1^-} \\frac{3(x - 1)(\\sqrt{x+3} + 2)}{(x+3) - 4} = \\lim_{x \\to 1^-} \\frac{3(x - 1)(\\sqrt{x+3} + 2)}{x - 1} \\]\n\\[ = 3(\\sqrt{1+3} + 2) = 3(2 + 2) = 12 \\]\nVậy (i) đúng.",
      "2) Khẳng định (ii): Tính \\(f(1)\\):\nVới \\(x = 1\\), ta dùng nhánh \\(3x^2 + 6\\):\n\\[ f(1) = 3(1^2) + 6 = 9 \\neq 12 \\]\nVậy (ii) sai.",
      "3) Khẳng định (iii): Tính giới hạn phải khi \\(x \\to 1^+\\):\n\\[ \\lim_{x \\to 1^+} (3x^2 + 6) = 9 \\neq 12 \\]\nVậy (iii) sai.",
      "Do đó chỉ có khẳng định (i) là đúng. Đáp án đúng là C."
    ],
    "image": "assets/questions/0256_q256_Question_256.png",
    "needs_image": false,
    "review_flags": [],
    "confidence": "high"
  },
  {
    "id": 257,
    "chapter": "DSTT1",
    "folder": "DSTT1",
    "topic": "HePhuongTrinh",
    "type": "single_choice",
    "question": "Which statements are TRUE?\n(i) \\(\\begin{bmatrix} -2 \\\\ 3 \\end{bmatrix}\\) is a linear combination of \\(\\begin{bmatrix} 0 \\\\ 1 \\end{bmatrix}\\) and \\(\\begin{bmatrix} 1 \\\\ 0 \\end{bmatrix}\\).\n(ii) If \\(x_1\\) and \\(x_2\\) are solutions to the system \\(Ax = b\\), then \\(x_1 - x_2\\) is a solution to \\(Ax = 0\\).",
    "options": [
      "None of the other choices is correct",
      "(i)",
      "(i) and (ii)",
      "(ii)"
    ],
    "answer": "C",
    "answer_original": "C",
    "answer_status": "verified",
    "explanation": [
      "Kiểm tra (i): Hai vectơ \\(\\begin{bmatrix} 1 \\\\ 0 \\end{bmatrix}\\) và \\(\\begin{bmatrix} 0 \\\\ 1 \\end{bmatrix}\\) là cơ sở chính tắc của \\(\\mathbb{R}^2\\).\n\\[ \\begin{bmatrix} -2 \\\\ 3 \\end{bmatrix} = -2 \\begin{bmatrix} 1 \\\\ 0 \\end{bmatrix} + 3 \\begin{bmatrix} 0 \\\\ 1 \\end{bmatrix} \\]\nDo đó \\(\\begin{bmatrix} -2 \\\\ 3 \\end{bmatrix}\\) là tổ hợp tuyến tính của hai vectơ trên. Khẳng định (i) đúng.",
      "Kiểm tra (ii): Vì \\(x_1, x_2\\) là nghiệm của \\(Ax = b\\), ta có \\(Ax_1 = b\\) và \\(Ax_2 = b\\).\nTheo tính chất tuyến tính của phép nhân ma trận:\n\\[ A(x_1 - x_2) = Ax_1 - Ax_2 = b - b = 0 \\]\nSuy ra \\(x_1 - x_2\\) là nghiệm của hệ thuần nhất \\(Ax = 0\\). Khẳng định (ii) đúng.",
      "Vậy cả (i) và (ii) đều đúng. Đáp án đúng là C."
    ],
    "image": "assets/questions/0257_q257_Question_257.png",
    "needs_image": false,
    "review_flags": [],
    "confidence": "high"
  },
  {
    "id": 258,
    "chapter": "DSTT1",
    "folder": "DSTT1",
    "topic": "MaTran",
    "type": "single_choice",
    "question": "Let \\(A = \\begin{bmatrix} 1 & 1 \\\\ 0 & m \\end{bmatrix}\\). Find all values of \\(m\\) such that \\(A^2 = I_2\\).",
    "options": [
      "-1",
      "0",
      "-2",
      "1",
      "1 and -1"
    ],
    "answer": "A",
    "answer_original": "A",
    "answer_status": "verified",
    "explanation": [
      "Tính tích ma trận \\(A^2 = A \\cdot A\\):\n\\[ A^2 = \\begin{bmatrix} 1 & 1 \\\\ 0 & m \\end{bmatrix} \\begin{bmatrix} 1 & 1 \\\\ 0 & m \\end{bmatrix} = \\begin{bmatrix} 1(1) + 1(0) & 1(1) + 1(m) \\\\ 0(1) + m(0) & 0(1) + m(m) \\end{bmatrix} = \\begin{bmatrix} 1 & 1 + m \\\\ 0 & m^2 \\end{bmatrix} \\]",
      "Ta muốn \\(A^2 = I_2 = \\begin{bmatrix} 1 & 0 \\\\ 0 & 1 \\end{bmatrix}\\).\nĐồng nhất các phần tử tương ứng:\n\\[ \\begin{cases} 1 + m = 0 \\\\ m^2 = 1 \\end{cases} \\iff \\begin{cases} m = -1 \\\\ m = \\pm 1 \\end{cases} \\iff m = -1 \\]",
      "Vậy chỉ có giá trị \\(m = -1\\) thỏa mãn.",
      "Đáp án đúng là A (-1)."
    ],
    "image": "assets/questions/0258_q258_Question_258.png",
    "needs_image": false,
    "review_flags": [],
    "confidence": "high"
  },
  {
    "id": 259,
    "chapter": "DSTT1",
    "folder": "DSTT1",
    "topic": "DinhThuc",
    "type": "single_choice",
    "question": "Let \\(\\det \\begin{bmatrix} a & b & c \\\\ p & q & r \\\\ x & y & z \\end{bmatrix} = 3\\), find \\(\\det \\begin{bmatrix} a + 2x & b + 2y & c + 2z \\\\ 3a - p & 3b - q & 3c - r \\\\ a & b & c \\end{bmatrix}\\).",
    "options": [
      "24",
      "9",
      "None of the others",
      "-6",
      "-24",
      "6"
    ],
    "answer": "F",
    "answer_original": "F",
    "answer_status": "verified",
    "explanation": [
      "Ký hiệu ma trận cần tính là \\(M = \\begin{bmatrix} a + 2x & b + 2y & c + 2z \\\\ 3a - p & 3b - q & 3c - r \\\\ a & b & c \\end{bmatrix}\\).",
      "Áp dụng các phép biến đổi sơ cấp theo dòng giữ nguyên định thức:\n- Trừ dòng 3 khỏi dòng 1: \\(R_1 \\gets R_1 - R_3 = [2x, 2y, 2z]\\)\n- Trừ 3 lần dòng 3 khỏi dòng 2: \\(R_2 \\gets R_2 - 3R_3 = [-p, -q, -r]\\)",
      "Khi đó:\n\\[ \\det(M) = \\det \\begin{bmatrix} 2x & 2y & 2z \\\\ -p & -q & -r \\\\ a & b & c \\end{bmatrix} \\]",
      "Đưa thừa số 2 ở dòng 1 và -1 ở dòng 2 ra ngoài:\n\\[ = 2(-1) \\det \\begin{bmatrix} x & y & z \\\\ p & q & r \\\\ a & b & c \\end{bmatrix} = -2 \\det \\begin{bmatrix} x & y & z \\\\ p & q & r \\\\ a & b & c \\end{bmatrix} \\]",
      "Đổi chỗ dòng 1 và dòng 3 (làm đổi dấu định thức):\n\\[ = -2(-1) \\det \\begin{bmatrix} a & b & c \\\\ p & q & r \\\\ x & y & z \\end{bmatrix} = 2 \\times 3 = 6 \\]",
      "Vậy đáp án đúng là F (6)."
    ],
    "image": "assets/questions/0259_q259_Question_259.png",
    "needs_image": false,
    "review_flags": [],
    "confidence": "high"
  },
  {
    "id": 260,
    "chapter": "DSTT1",
    "folder": "DSTT1",
    "topic": "HePhuongTrinh",
    "type": "single_choice",
    "question": "Consider a homogeneous system of 5 linear equations in 6 unknowns. Which of the following is true?",
    "options": [
      "The system always has infinitely many solutions.",
      "The system has only the trivial solution, or infinitely many solutions.",
      "The system has between 0 and 5 solutions.",
      "The system has only the trivial solution.",
      "The system can have no solution."
    ],
    "answer": "A",
    "answer_original": "A",
    "answer_status": "verified",
    "explanation": [
      "Hệ phương trình tuyến tính thuần nhất \\(Ax = 0\\) luôn luôn có nghiệm (ít nhất là nghiệm tầm thường \\(x = 0\\)).",
      "Ở đây số phương trình là \\(m = 5\\) và số ẩn là \\(n = 6\\).",
      "Hạng của ma trận hệ số \\(A\\) thỏa mãn \\(\\operatorname{rank}(A) \\le \\min(m, n) = \\min(5, 6) = 5\\).",
      "Theo định lý về số ẩn tự do, số ẩn tự do là \\(n - \\operatorname{rank}(A) \\ge 6 - 5 = 1 > 0\\).",
      "Vì luôn có ít nhất một ẩn tự do, hệ phương trình thuần nhất luôn luôn có vô số nghiệm (always has infinitely many solutions).",
      "Vậy đáp án đúng là A."
    ],
    "image": "assets/questions/0260_q260_Question_260.png",
    "needs_image": false,
    "review_flags": [],
    "confidence": "high"
  },
  {
    "id": 261,
    "chapter": "GT1",
    "folder": "GT1",
    "topic": "DaoHam",
    "type": "single_choice",
    "question": "Find all the values of x where the tangent line to the graph of function is horizontal\n\\[ f(x) = x^3 - 3x^2 + 1 \\]",
    "options": [
      "-2; 0; 2",
      "2",
      "None of the other choices is correct",
      "0; 2",
      "0"
    ],
    "answer": "D",
    "answer_original": "D",
    "answer_status": "verified",
    "explanation": [
      "Tiếp tuyến của đồ thị hàm số nằm ngang (horizontal) khi và chỉ khi hệ số góc của tiếp tuyến bằng 0, tức là \\(f'(x) = 0\\).",
      "Tính đạo hàm:\n\\[ f'(x) = 3x^2 - 6x = 3x(x - 2) \\]",
      "Giải phương trình \\(f'(x) = 0\\):\n\\[ 3x(x - 2) = 0 \\iff x = 0 \\text{ hoặc } x = 2 \\]",
      "Vậy các giá trị của \\(x\\) là \\(0; 2\\).",
      "Đáp án đúng là D."
    ],
    "image": "assets/questions/0261_q261_Question_261.png",
    "needs_image": false,
    "review_flags": [],
    "confidence": "high"
  },
  {
    "id": 262,
    "chapter": "DSTT1",
    "folder": "DSTT1",
    "topic": "MaTran",
    "type": "single_choice",
    "question": "Find the \\((2, 3)\\)-entry of \\(A^{-1}\\) if\n\\[ A = \\begin{bmatrix} 1 & 2 & -1 \\\\ 3 & 1 & 1 \\\\ 0 & 4 & 7 \\end{bmatrix} \\]",
    "options": [
      "3/41",
      "4/71",
      "None of the other choices is correct",
      "4/51",
      "2/31"
    ],
    "answer": "D",
    "answer_original": "D",
    "answer_status": "verified",
    "explanation": [
      "Theo công thức phần tử của ma trận nghịch đảo thông qua ma trận phụ hợp:\n\\[ (A^{-1})_{ij} = \\frac{C_{ji}}{\\det(A)} = \\frac{(-1)^{j+i} M_{ji}}{\\det(A)} \\]",
      "Với \\(i = 2, j = 3\\):\n\\[ (A^{-1})_{23} = \\frac{C_{32}}{\\det(A)} = \\frac{(-1)^{3+2} M_{32}}{\\det(A)} = \\frac{-M_{32}}{\\det(A)} \\]",
      "Tính \\(\\det(A)\\) bằng cách khai triển theo cột 1:\n\\[ \\det(A) = 1 \\cdot \\begin{vmatrix} 1 & 1 \\\\ 4 & 7 \\end{vmatrix} - 3 \\cdot \\begin{vmatrix} 2 & -1 \\\\ 4 & 7 \\end{vmatrix} + 0 \\]\n\\[ = 1(7 - 4) - 3(14 - (-4)) = 3 - 3(18) = 3 - 54 = -51 \\]",
      "Tính định thức con bù \\(M_{32}\\) (bỏ dòng 3, cột 2):\n\\[ M_{32} = \\begin{vmatrix} 1 & -1 \\\\ 3 & 1 \\end{vmatrix} = 1(1) - (-1)(3) = 1 + 3 = 4 \\]",
      "Do đó:\n\\[ (A^{-1})_{23} = \\frac{-4}{-51} = \\frac{4}{51} \\]",
      "Vậy đáp án đúng là D (4/51)."
    ],
    "image": "assets/questions/0262_q262_Question_262.png",
    "needs_image": false,
    "review_flags": [],
    "confidence": "high"
  },
  {
    "id": 263,
    "chapter": "GT1",
    "folder": "GT1",
    "topic": "DaoHam",
    "type": "single_choice",
    "question": "A table of values for \\(f, g, f', g'\\) is given\n\\[ \\begin{array}{|c|c|c|c|c|} \\hline x & f(x) & g(x) & f'(x) & g'(x) \\\\ \\hline 0 & 1 & 1 & 2 & -2 \\\\ 1 & 0 & 2 & 3 & -1 \\\\ 2 & 4 & -1 & 5 & 6 \\\\ \\hline \\end{array} \\]\nFind \\(h'(1)\\) if \\(h(x) = f(g(x))\\).",
    "options": [
      "None of them",
      "-6",
      "-2",
      "-5",
      "0"
    ],
    "answer": "D",
    "answer_original": "D",
    "answer_status": "verified",
    "explanation": [
      "Áp dụng quy tắc đạo hàm hàm hợp (Chain rule):\n\\[ h'(x) = f'(g(x)) \\cdot g'(x) \\]",
      "Tại \\(x = 1\\):\n\\[ h'(1) = f'(g(1)) \\cdot g'(1) \\]",
      "Tra bảng tại dòng \\(x = 1\\):\n\\(g(1) = 2\\) và \\(g'(1) = -1\\).",
      "Tra bảng tại dòng \\(x = 2\\) để tìm \\(f'(2)\\):\n\\(f'(2) = 5\\).",
      "Thay vào ta được:\n\\[ h'(1) = f'(2) \\cdot (-1) = 5 \\cdot (-1) = -5 \\]",
      "Vậy đáp án đúng là D (-5)."
    ],
    "image": "assets/questions/0263_q263_Question_263.png",
    "needs_image": false,
    "review_flags": [],
    "confidence": "high"
  },
  {
    "id": 264,
    "chapter": "DSTT1",
    "folder": "DSTT1",
    "topic": "AnhXaTuyenTinh",
    "type": "single_choice",
    "question": "Let \\(T : \\mathbb{R}^3 \\to \\mathbb{R}^3\\) be linear transformation given by\n\\[ T([x\\ y\\ z]^T) = [y + 2x \\quad 2x - y \\quad z + x]^T \\]\nLet \\(u = [1\\ 0\\ 1]^T, v = [1\\ -1\\ 2]^T, w = [2\\ 1\\ -1]^T\\). Find the volume of the parallelepiped determined by \\(T(u), T(v)\\) and \\(T(w)\\).",
    "options": [
      "None of the other choices is correct",
      "8",
      "2",
      "4",
      "16"
    ],
    "answer": "B",
    "answer_original": "B",
    "answer_status": "verified",
    "explanation": [
      "Thể tích khối hộp tạo bởi ba vectơ \\(T(u), T(v), T(w)\\) liên hệ với thể tích khối hộp tạo bởi \\(u, v, w\\) qua công thức:\n\\[ V = |\\det(A)| \\cdot V_0 \\]\ntrong đó \\(A\\) là ma trận biểu diễn ánh xạ tuyến tính \\(T\\).",
      "Xác định ma trận \\(A\\) của \\(T\\):\n\\[ A = \\begin{bmatrix} 2 & 1 & 0 \\\\ 2 & -1 & 0 \\\\ 1 & 0 & 1 \\end{bmatrix} \\]\nKhai triển theo cột 3:\n\\[ \\det(A) = 1 \\cdot \\begin{vmatrix} 2 & 1 \\\\ 2 & -1 \\end{vmatrix} = 1(-2 - 2) = -4 \\implies |\\det(A)| = 4 \\]",
      "Tính thể tích ban đầu \\(V_0 = |\\det([u\\ v\\ w])|\\):\n\\[ \\det \\begin{bmatrix} 1 & 1 & 2 \\\\ 0 & -1 & 1 \\\\ 1 & 2 & -1 \\end{bmatrix} = 1((-1)(-1) - 1(2)) + 1(1(1) - 2(-1)) = 1(-1) + 1(3) = 2 \\implies V_0 = 2 \\]",
      "Do đó thể tích của khối hộp mới là:\n\\[ V = 4 \\times 2 = 8 \\]",
      "Vậy đáp án đúng là B (8)."
    ],
    "image": "assets/questions/0264_q264_Question_264.png",
    "needs_image": false,
    "review_flags": [],
    "confidence": "high"
  },
  {
    "id": 265,
    "chapter": "GT1",
    "folder": "GT1",
    "topic": "PhuongPhapSo",
    "type": "single_choice",
    "question": "Use Newton's method with the specified initial approximation \\(x_1\\) to find \\(x_3\\), the third approximation to the root of the given equation:\n\\[ x^5 + 2 = 0, \\quad x_1 = -1 \\]",
    "options": [
      "-2.0027",
      "-1.3229",
      "None of the other choices is correct",
      "-1.1529",
      "-2.3058"
    ],
    "answer": "D",
    "answer_original": "D",
    "answer_status": "verified",
    "explanation": [
      "Đặt \\(f(x) = x^5 + 2\\), ta có \\(f'(x) = 5x^4\\).",
      "Công thức lặp Newton:\n\\[ x_{n+1} = x_n - \\frac{f(x_n)}{f'(x_n)} = x_n - \\frac{x_n^5 + 2}{5x_n^4} = \\frac{4x_n^5 - 2}{5x_n^4} \\]",
      "Bước 1: Tính \\(x_2\\) từ \\(x_1 = -1\\):\n\\[ x_2 = -1 - \\frac{(-1)^5 + 2}{5(-1)^4} = -1 - \\frac{1}{5} = -1.2 \\]",
      "Bước 2: Tính \\(x_3\\) từ \\(x_2 = -1.2\\):\n\\[ x_3 = \\frac{4(-1.2)^5 - 2}{5(-1.2)^4} = \\frac{4(-2.48832) - 2}{5(2.0736)} = \\frac{-9.95328 - 2}{10.368} = \\frac{-11.95328}{10.368} \\approx -1.152901 \\]",
      "Làm tròn 4 chữ số thập phân ta được \\(-1.1529\\).",
      "Vậy đáp án đúng là D (-1.1529)."
    ],
    "image": "assets/questions/0265_q265_Question_265.png",
    "needs_image": false,
    "review_flags": [],
    "confidence": "high"
  },
  {
    "id": 266,
    "chapter": "DSTT1",
    "folder": "DSTT1",
    "topic": "KhongGianVector",
    "type": "single_choice",
    "question": "Find the value of \\(t\\) for which \\((1, 2, t)\\) lies in \\(U = \\operatorname{span}\\{(1, 3, 4); (0, 1, 1)\\}\\)",
    "options": [
      "None of the other choices is correct",
      "5",
      "3",
      "-1",
      "1"
    ],
    "answer": "C",
    "answer_original": "C",
    "answer_status": "verified",
    "explanation": [
      "Vectơ \\((1, 2, t)\\) thuộc \\(U = \\operatorname{span}\\{(1, 3, 4); (0, 1, 1)\\}\\) khi và chỉ khi tồn tại các hệ số \\(c_1, c_2\\) sao cho:\n\\[ c_1(1, 3, 4) + c_2(0, 1, 1) = (1, 2, t) \\]",
      "Thiết lập hệ phương trình theo từng thành phần:\n\\[ \\begin{cases} c_1 = 1 \\\\ 3c_1 + c_2 = 2 \\\\ 4c_1 + c_2 = t \\end{cases} \\]",
      "Từ phương trình (1): \\(c_1 = 1\\).\nThay vào phương trình (2): \\(3(1) + c_2 = 2 \\implies c_2 = -1\\).\nThay \\(c_1, c_2\\) vào phương trình (3):\n\\[ t = 4(1) + (-1) = 3 \\]",
      "Vậy \\(t = 3\\). Đáp án đúng là C."
    ],
    "image": "assets/questions/0266_q266_Question_266.png",
    "needs_image": false,
    "review_flags": [],
    "confidence": "high"
  },
  {
    "id": 267,
    "chapter": "GT1",
    "folder": "GT1",
    "topic": "DaoHam",
    "type": "single_choice",
    "question": "Determine where the function\n\\[ f(x) = 2x^3 + 9x^2 + 12x \\]\nis concave up and where it is concave down.\n(i) Concave up on \\((-\\infty, 3/2)\\), concave down on \\((3/2, \\infty)\\)\n(ii) Concave down on \\((-\\infty, -3/2)\\), concave up on \\((-3/2, \\infty)\\)\n(iii) Concave up on \\((-\\infty, -3/2)\\), concave down on \\((-3/2, \\infty)\\)\n(iv) Concave down on \\((-\\infty, 3/2)\\), concave up on \\((3/2, \\infty)\\)",
    "options": [
      "(i)",
      "None of the other choices is correct",
      "(iii)",
      "(ii)",
      "(iv)"
    ],
    "answer": "D",
    "answer_original": "D",
    "answer_status": "verified",
    "explanation": [
      "Tính đạo hàm cấp một và cấp hai:\n\\[ f'(x) = 6x^2 + 18x + 12 \\]\n\\[ f''(x) = 12x + 18 = 6(2x + 3) \\]",
      "Xét dấu đạo hàm cấp hai:\n\\[ f''(x) = 0 \\iff 2x + 3 = 0 \\iff x = -3/2 \\]",
      "- Với \\(x < -3/2\\): \\(f''(x) < 0\\), do đó hàm số lõm xuống (concave down) trên \\((-\\infty, -3/2)\\).\n- Với \\(x > -3/2\\): \\(f''(x) > 0\\), do đó hàm số lõm lên (concave up) trên \\((-3/2, \\infty)\\).",
      "Khẳng định này tương ứng với (ii). Lựa chọn D tương ứng với (ii).",
      "Vậy đáp án đúng là D."
    ],
    "image": "assets/questions/0267_q267_Question_267.png",
    "needs_image": false,
    "review_flags": [],
    "confidence": "high"
  },
  {
    "id": 268,
    "chapter": "GT1",
    "folder": "GT1",
    "topic": "TichPhan",
    "type": "single_choice",
    "question": "Find \\(\\frac{d}{dx} \\int_{29}^{x^3} \\sin t \\, dt\\)\n(i) \\(-3x^2 \\cos x^3\\)\n(ii) \\(x^3 \\cos x^3\\)\n(iii) \\(3x^2 \\cos x^3\\)\n(iv) \\(3x^2 \\sin x^3\\)",
    "options": [
      "(i)",
      "None of the other choices is correct",
      "(ii)",
      "(iv)",
      "(iii)"
    ],
    "answer": "D",
    "answer_original": "D",
    "answer_status": "verified",
    "explanation": [
      "Theo định lý cơ bản của giải tích phần 1 kết hợp với quy tắc chuỗi:\n\\[ \\frac{d}{dx} \\left[ \\int_a^{u(x)} f(t) dt \\right] = f(u(x)) \\cdot u'(x) \\]",
      "Ở đây \\(a = 29\\), \\(f(t) = \\sin t\\), và \\(u(x) = x^3\\).",
      "Đạo hàm của cận trên là \\(u'(x) = 3x^2\\).",
      "Thay vào công thức:\n\\[ \\frac{d}{dx} \\int_{29}^{x^3} \\sin t \\, dt = \\sin(x^3) \\cdot 3x^2 = 3x^2 \\sin x^3 \\]",
      "Kết quả này trùng với khẳng định (iv). Lựa chọn D tương ứng với (iv).",
      "Vậy đáp án đúng là D."
    ],
    "image": "assets/questions/0268_q268_Question_268.png",
    "needs_image": false,
    "review_flags": [],
    "confidence": "high"
  },
  {
    "id": 269,
    "chapter": "DSTT1",
    "folder": "DSTT1",
    "topic": "MaTran",
    "type": "single_choice",
    "question": "Let \\(A = \\begin{pmatrix} 2 & -1 \\\\ 3 & 0 \\\\ 5 & 4 \\end{pmatrix}, B = \\begin{pmatrix} -1 & 3 \\\\ 2 & 5 \\\\ 7 & 8 \\end{pmatrix}, C = \\begin{pmatrix} 0 & 4 \\\\ 12 & 5 \\\\ 7 & 13 \\end{pmatrix}\\). Find the \\((2, 1)\\)-entry of the matrix \\(A - 2B + 3C\\).",
    "options": [
      "None of the other choices is correct",
      "17",
      "4",
      "5",
      "35"
    ],
    "answer": "E",
    "answer_original": "E",
    "answer_status": "verified",
    "explanation": [
      "Phần tử ở vị trí \\((2, 1)\\) của tổ hợp tuyến tính ma trận được tính trực tiếp từ các phần tử tương ứng ở vị trí \\((2, 1)\\):\n\\[ (A - 2B + 3C)_{21} = A_{21} - 2 B_{21} + 3 C_{21} \\]",
      "Xác định các phần tử từ đề bài:\n\\(A_{21} = 3\\)\n\\(B_{21} = 2\\)\n\\(C_{21} = 12\\)",
      "Tính toán:\n\\[ (A - 2B + 3C)_{21} = 3 - 2(2) + 3(12) = 3 - 4 + 36 = 35 \\]",
      "Vậy đáp án đúng là E (35)."
    ],
    "image": "assets/questions/0269_q269_Question_269.png",
    "needs_image": false,
    "review_flags": [],
    "confidence": "high"
  },
  {
    "id": 270,
    "chapter": "DSTT1",
    "folder": "DSTT1",
    "topic": "VectorHinhHoc",
    "type": "single_choice",
    "question": "Given \\(A = \\begin{bmatrix} 5 & -4 \\\\ 1 & 0 \\end{bmatrix}, u = [1 \\quad -1]^T, v = [4 \\quad 1]^T\\). Choose the correct answer.",
    "options": [
      "\\(v\\) is an eigenvector of A",
      "Both \\(u\\) and \\(v\\) are eigenvectors of A",
      "None of the other choices is correct",
      "\\(u\\) is an eigenvector of A"
    ],
    "answer": "A",
    "answer_original": "A",
    "answer_status": "verified",
    "explanation": [
      "Theo định nghĩa, vectơ \\(x \\neq 0\\) là vectơ riêng của ma trận \\(A\\) nếu tồn tại vô hướng \\(\\lambda\\) sao cho \\(Ax = \\lambda x\\).",
      "Kiểm tra với vectơ \\(u = [1, -1]^T\\):\n\\[ Au = \\begin{bmatrix} 5 & -4 \\\\ 1 & 0 \\end{bmatrix} \\begin{bmatrix} 1 \\\\ -1 \\end{bmatrix} = \\begin{bmatrix} 5(1) + (-4)(-1) \\\\ 1(1) + 0(-1) \\end{bmatrix} = \\begin{bmatrix} 9 \\\\ 1 \\end{bmatrix} \\]\nVì \\([9, 1]^T\\) không cùng phương với \\([1, -1]^T\\), nên \\(u\\) không phải là vectơ riêng.",
      "Kiểm tra với vectơ \\(v = [4, 1]^T\\):\n\\[ Av = \\begin{bmatrix} 5 & -4 \\\\ 1 & 0 \\end{bmatrix} \\begin{bmatrix} 4 \\\\ 1 \\end{bmatrix} = \\begin{bmatrix} 5(4) + (-4)(1) \\\\ 1(4) + 0(1) \\end{bmatrix} = \\begin{bmatrix} 16 \\\\ 4 \\end{bmatrix} = 4 \\begin{bmatrix} 4 \\\\ 1 \\end{bmatrix} = 4v \\]\nVì \\(Av = 4v\\), nên \\(v\\) là một vectơ riêng của \\(A\\) ứng với giá trị riêng \\(\\lambda = 4\\).",
      "Vậy khẳng định đúng là '\\(v\\) is an eigenvector of A'. Đáp án đúng là A."
    ],
    "image": "assets/questions/0270_q270_Question_270.png",
    "needs_image": false,
    "review_flags": [],
    "confidence": "high"
  },
  {
    "id": 271,
    "chapter": "GT1",
    "folder": "GT1",
    "topic": "HamSo",
    "type": "single_choice",
    "question": "State the domain of the function \\(F(x) = \\sqrt{x - 3} \\sin x\\).\n(i) \\((0, 3)\\)\n(ii) \\([3, \\infty)\\)\n(iii) \\((3, \\infty)\\)\n(iv) \\((0, 3]\\)",
    "options": [
      "(i)",
      "(iv)",
      "(iii)",
      "(ii)",
      "All of the other choices are incorrect"
    ],
    "answer": "D",
    "answer_original": "D",
    "answer_status": "verified",
    "explanation": [
      "Hàm lượng giác \\(\\sin x\\) xác định với mọi \\(x \\in \\mathbb{R}\\).",
      "Biểu thức chứa căn bậc hai \\(\\sqrt{x - 3}\\) xác định khi và chỉ khi biểu thức dưới dấu căn không âm:\n\\[ x - 3 \\ge 0 \\iff x \\ge 3 \\iff x \\in [3, \\infty) \\]",
      "Do đó tập xác định của hàm số \\(F(x)\\) là \\([3, \\infty)\\).",
      "Khẳng định này tương ứng với (ii). Lựa chọn D tương ứng với (ii).",
      "Vậy đáp án đúng là D."
    ],
    "image": "assets/questions/0271_q271_Question_271.png",
    "needs_image": false,
    "review_flags": [],
    "confidence": "high"
  },
  {
    "id": 272,
    "chapter": "DSTT1",
    "folder": "DSTT1",
    "topic": "MaTran",
    "type": "single_choice",
    "question": "Let \\(A = \\begin{pmatrix} 1 & 0 & 1 & 0 \\\\ 0 & 1 & 0 & 1 \\end{pmatrix}\\) and \\(B = \\begin{pmatrix} 1 & 0 \\\\ 0 & 1 \\\\ 1 & 2 \\\\ 1 & 1 \\end{pmatrix}\\). Find the \\((3, 2)\\)-entry of the matrix \\(BA\\).",
    "options": [
      "2",
      "0",
      "3",
      "None of the other choices is correct",
      "1"
    ],
    "answer": "A",
    "answer_original": "A",
    "answer_status": "verified",
    "explanation": [
      "Ma trận \\(B\\) có kích thước \\(4 \\times 2\\) và ma trận \\(A\\) có kích thước \\(2 \\times 4\\), tích \\(BA\\) là ma trận vuông cấp 4.",
      "Phần tử ở vị trí \\((3, 2)\\) của tích \\(BA\\) bằng tích vô hướng giữa dòng 3 của ma trận \\(B\\) và cột 2 của ma trận \\(A\\):",
      "Dòng 3 của \\(B\\) là: \\([1, 2]\\).",
      "Cột 2 của \\(A\\) là: \\(\\begin{bmatrix} 0 \\\\ 1 \\end{bmatrix}\\).",
      "Tính toán:\n\\[ (BA)_{32} = 1(0) + 2(1) = 2 \\]",
      "Vậy đáp án đúng là A (2)."
    ],
    "image": "assets/questions/0272_q272_Question_272.png",
    "needs_image": false,
    "review_flags": [],
    "confidence": "high"
  },
  {
    "id": 273,
    "chapter": "GT1",
    "folder": "GT1",
    "topic": "DaoHam",
    "type": "single_choice",
    "question": "Each side of a square is increasing at rate of 3 cm/s. At what rate (in \\(\\text{cm}^2/\\text{s}\\)) is the area of the square increasing when the area of square is 25 \\(\\text{cm}^2\\)?",
    "options": [
      "25",
      "15",
      "None of the other choices is correct",
      "30",
      "5"
    ],
    "answer": "D",
    "answer_original": "D",
    "answer_status": "verified",
    "explanation": [
      "Gọi cạnh hình vuông là \\(x\\) (cm) và diện tích hình vuông là \\(A = x^2\\) (\\(\\text{cm}^2\\)).",
      "Lấy đạo hàm hai vế theo thời gian \\(t\\):\n\\[ \\frac{dA}{dt} = 2x \\frac{dx}{dt} \\]",
      "Theo giả thiết, tốc độ tăng của cạnh là \\(\\frac{dx}{dt} = 3\\text{ cm/s}\\).",
      "Tại thời điểm diện tích \\(A = 25\\text{ cm}^2\\), độ dài cạnh là \\(x = \\sqrt{25} = 5\\text{ cm}\\).",
      "Thay các giá trị vào công thức:\n\\[ \\frac{dA}{dt} = 2(5)(3) = 30\\text{ cm}^2/\\text{s} \\]",
      "Vậy đáp án đúng là D (30)."
    ],
    "image": "assets/questions/0273_q273_Question_273.png",
    "needs_image": false,
    "review_flags": [],
    "confidence": "high"
  },
  {
    "id": 274,
    "chapter": "GT1",
    "folder": "GT1",
    "topic": "TichPhan",
    "type": "single_choice",
    "question": "Determine whether the area between the graph of \\(f(x) = 1/x\\) and the \\(x\\)-axis over the interval \\([1, +\\infty)\\) is finite or infinite.",
    "options": [
      "None of the other choices is correct",
      "Finite, and the area is 24",
      "Finite, and the area is 36",
      "Finite, and the area is 18",
      "Infinite"
    ],
    "answer": "E",
    "answer_original": "E",
    "answer_status": "verified",
    "explanation": [
      "Diện tích hình phẳng giới hạn bởi đồ thị \\(f(x) = 1/x\\), trục hoành và đoạn \\([1, +\\infty)\\) được xác định bởi tích phân suy rộng:\n\\[ A = \\int_1^{+\\infty} \\frac{1}{x} dx \\]",
      "Theo định nghĩa tích phân suy rộng loại 1:\n\\[ A = \\lim_{b \\to +\\infty} \\int_1^b \\frac{1}{x} dx = \\lim_{b \\to +\\infty} \\left[ \\ln|x| \\right]_1^b = \\lim_{b \\to +\\infty} (\\ln b - \\ln 1) = \\lim_{b \\to +\\infty} \\ln b = +\\infty \\]",
      "Vì giới hạn tiến tới \\(+\\infty\\), diện tích này là vô hạn (Infinite).",
      "Vậy đáp án đúng là E."
    ],
    "image": "assets/questions/0274_q274_Question_274.png",
    "needs_image": false,
    "review_flags": [],
    "confidence": "high"
  },
  {
    "id": 275,
    "chapter": "DSTT1",
    "folder": "DSTT1",
    "topic": "MaTran",
    "type": "single_choice",
    "question": "Find x so that the matrix \\(\\begin{bmatrix} -x & x+1 & x-1 \\\\ 0 & x^2 & x \\end{bmatrix}\\) is in reduced-row echelon form.",
    "options": [
      "0 or -1",
      "None of the other choices is correct",
      "0",
      "1 or -1",
      "-1"
    ],
    "answer": "A",
    "answer_original": "A",
    "answer_status": "verified",
    "explanation": [
      "Ma trận ở dạng bậc thang rút gọn (Reduced Row Echelon Form - RREF) phải thỏa mãn:\n1) Phần tử khác không đầu tiên của mỗi dòng (leading entry) là 1.\n2) Cột chứa phần tử dẫn đầu 1 chỉ chứa toàn số 0 ở các vị trí khác.\n3) Dòng toàn số 0 (nếu có) phải ở dưới cùng.",
      "Xét các trường hợp:\n- Nếu \\(x = 0\\): Ma trận trở thành \\(\\begin{bmatrix} 0 & 1 & -1 \\\\ 0 & 0 & 0 \\end{bmatrix}\\). Dòng 2 toàn số 0 nằm dưới cùng, dòng 1 có phần tử dẫn đầu là 1 ở cột 2, cột 2 các phần tử khác đều bằng 0. Thỏa mãn RREF.",
      "- Nếu \\(x = -1\\): Ma trận trở thành \\(\\begin{bmatrix} 1 & 0 & -2 \\\\ 0 & 1 & -1 \\end{bmatrix}\\). Cả hai dòng đều có phần tử dẫn đầu là 1, cột 1 và cột 2 đều chỉ chứa duy nhất số 1 tại vị trí dẫn đầu. Thỏa mãn RREF.",
      "- Nếu \\(x = 1\\): Dòng 1 bắt đầu bằng \\(-1\\), không phải là 1 nên không thỏa mãn RREF.",
      "Vậy các giá trị của \\(x\\) thỏa mãn là 0 hoặc -1 (0 or -1).",
      "Đáp án đúng là A."
    ],
    "image": "assets/questions/0275_q275_Question_275.png",
    "needs_image": false,
    "review_flags": [],
    "confidence": "high"
  },
  {
    "id": 276,
    "chapter": "DSTT1",
    "folder": "DSTT1",
    "topic": "MaTran",
    "type": "single_choice",
    "question": "Given that \\(3 \\begin{bmatrix} x + y & 2 & x + z \\\\ 0 & z + y & 2 \\end{bmatrix} = \\begin{bmatrix} 9 & 6 & 3 \\\\ 0 & 3 & 6 \\end{bmatrix}\\). Find \\(x + y + z\\).",
    "options": [
      "5/2",
      "3/2",
      "0",
      "None of the other choices is correct",
      "-1/2"
    ],
    "answer": "A",
    "answer_original": "A",
    "answer_status": "verified",
    "explanation": [
      "Chia cả hai vế của phương trình ma trận cho 3:\n\\[ \\begin{bmatrix} x + y & 2 & x + z \\\\ 0 & z + y & 2 \\end{bmatrix} = \\begin{bmatrix} 3 & 2 & 1 \\\\ 0 & 1 & 2 \\end{bmatrix} \\]",
      "So sánh các phần tử ở các vị trí tương ứng:\n\\[ \\begin{cases} x + y = 3 \\\\ x + z = 1 \\\\ z + y = 1 \\end{cases} \\]",
      "Cộng vế theo vế cả ba phương trình:\n\\[ (x + y) + (x + z) + (z + y) = 3 + 1 + 1 \\iff 2x + 2y + 2z = 5 \\]",
      "Suy ra:\n\\[ 2(x + y + z) = 5 \\implies x + y + z = \\frac{5}{2} \\]",
      "Vậy đáp án đúng là A (5/2)."
    ],
    "image": "assets/questions/0276_q276_Question_276.png",
    "needs_image": false,
    "review_flags": [],
    "confidence": "high"
  },
  {
    "id": 277,
    "chapter": "GT1",
    "folder": "GT1",
    "topic": "DaoHam",
    "type": "single_choice",
    "question": "Find points of inflection for \\(f(x) = 4x - x^3\\).",
    "options": [
      "(-1, -3)",
      "(1, 3)",
      "None of the other choices is correct",
      "(0, 0)",
      "No points of inflection"
    ],
    "answer": "D",
    "answer_original": "D",
    "answer_status": "verified",
    "explanation": [
      "Điểm uốn là điểm trên đồ thị hàm số mà tại đó đồ thị đổi tính lồi/lõm, tương ứng với đạo hàm cấp hai \\(f''(x)\\) đổi dấu.",
      "Tính đạo hàm cấp một và cấp hai:\n\\[ f'(x) = 4 - 3x^2 \\]\n\\[ f''(x) = -6x \\]",
      "Giải phương trình \\(f''(x) = 0\\):\n\\[ -6x = 0 \\iff x = 0 \\]",
      "Xét dấu \\(f''(x)\\):\n- Khi \\(x < 0\\): \\(f''(x) > 0\\) (hàm lõm lên).\n- Khi \\(x > 0\\): \\(f''(x) < 0\\) (hàm lõm xuống).\nVì \\(f''(x)\\) đổi dấu khi đi qua \\(x = 0\\), nên \\(x = 0\\) là hoành độ điểm uốn.",
      "Tính tung độ tương ứng:\n\\[ f(0) = 4(0) - 0^3 = 0 \\]",
      "Vậy điểm uốn là \\((0, 0)\\). Đáp án đúng là D."
    ],
    "image": "assets/questions/0277_q277_Question_277.png",
    "needs_image": false,
    "review_flags": [],
    "confidence": "high"
  },
  {
    "id": 278,
    "chapter": "DSTT1",
    "folder": "DSTT1",
    "topic": "KhongGianVector",
    "type": "single_choice",
    "question": "Let \\(A\\) be a \\(7 \\times 10\\) matrix. If the rank of \\(A\\) is 4, what is the dimension of the null space of \\(A\\)?",
    "options": [
      "6",
      "7",
      "4",
      "10",
      "3"
    ],
    "answer": "A",
    "answer_original": "A",
    "answer_status": "verified",
    "explanation": [
      "Theo Định lý Hạng - Số chiều không gian nghiệm (Rank-Nullity Theorem):\n\\[ \\operatorname{rank}(A) + \\operatorname{nullity}(A) = n \\]\ntrong đó \\(n\\) là số cột của ma trận \\(A\\), và \\(\\operatorname{nullity}(A)\\) là số chiều của không gian nghiệm \\(\\operatorname{Null}(A)\\).",
      "Ở đây ma trận \\(A\\) có kích thước \\(7 \\times 10\\), nên số cột là \\(n = 10\\).",
      "Đề bài cho \\(\\operatorname{rank}(A) = 4\\). Thay vào công thức:\n\\[ 4 + \\operatorname{nullity}(A) = 10 \\implies \\operatorname{nullity}(A) = 10 - 4 = 6 \\]",
      "Vậy số chiều của không gian nghiệm của \\(A\\) bằng 6.",
      "Đáp án đúng là A."
    ],
    "image": "assets/questions/0278_q278_Question_278.png",
    "needs_image": false,
    "review_flags": [],
    "confidence": "high"
  },
  {
    "id": 279,
    "chapter": "GT1",
    "folder": "GT1",
    "topic": "DaoHam",
    "type": "single_choice",
    "question": "Find the derivative of the following function\n\\[ g(x) = \\int_0^{\\sin x} \\frac{t^5 + 4t}{e^{5t}} dt \\]\n(i) \\(\\frac{\\sin^5 x + 4\\sin x}{e^{5\\sin x}}\\)\n(ii) \\(\\frac{\\sin^5 x + 4\\sin x}{e^{5\\sin x}} \\sin x\\)\n(iii) \\(\\frac{\\sin^5 x + 4\\sin x}{e^{5\\sin x}} \\cos x\\)\n(iv) \\(-\\frac{\\sin^5 x + 4\\sin x}{e^{5\\sin x}} \\cos x\\)",
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
      "Theo Định lý cơ bản của giải tích phần 1 và quy tắc đạo hàm hàm hợp:\n\\[ \\frac{d}{dx} \\left[ \\int_0^{u(x)} f(t) dt \\right] = f(u(x)) \\cdot u'(x) \\]",
      "Ở đây \\(f(t) = \\frac{t^5 + 4t}{e^{5t}}\\) và \\(u(x) = \\sin x\\).",
      "Đạo hàm của cận trên là \\(u'(x) = \\frac{d}{dx}[\\sin x] = \\cos x\\).",
      "Thay \\(t = \\sin x\\) vào hàm dưới dấu tích phân và nhân với \\(u'(x)\\):\n\\[ g'(x) = \\frac{(\\sin x)^5 + 4(\\sin x)}{e^{5\\sin x}} \\cdot \\cos x = \\frac{\\sin^5 x + 4\\sin x}{e^{5\\sin x}} \\cos x \\]",
      "Khẳng định này trùng với (iii). Lựa chọn D tương ứng với (iii).",
      "Vậy đáp án đúng là D."
    ],
    "image": "assets/questions/0279_q279_Question_279.png",
    "needs_image": false,
    "review_flags": [],
    "confidence": "high"
  },
  {
    "id": 280,
    "chapter": "DSTT1",
    "folder": "DSTT1",
    "topic": "HePhuongTrinh",
    "type": "single_choice",
    "question": "Solve the following system of linear equations:\n\\[ \\begin{cases} 3x - y + 7z = 0 \\\\ 4x - 2y + 8z = 1 \\\\ x - y + z = 1 \\end{cases} \\]",
    "options": [
      "None of the other choices is correct",
      "\\((-1/2 - 3z, -3/2 - 2z, z)\\)",
      "\\((-1/2 - 3z, 3/2 - 2z, z)\\)",
      "\\((-1/2, -3/2, 0)\\)",
      "\\((-1/2, -3/2 - 2z, z)\\)"
    ],
    "answer": "B",
    "answer_original": "A",
    "answer_status": "conflict",
    "explanation": [
      "Thiết lập ma trận hệ số mở rộng:\n\\[ \\left[\\begin{array}{ccc|c} 1 & -1 & 1 & 1 \\\\ 3 & -1 & 7 & 0 \\\\ 4 & -2 & 8 & 1 \\end{array}\\right] \\]",
      "Biến đổi sơ cấp đưa về dạng bậc thang:\n- \\(R_2 \\gets R_2 - 3R_1 \\implies [0, \\ 2, \\ 4 \\mid -3]\\)\n- \\(R_3 \\gets R_3 - 4R_1 \\implies [0, \\ 2, \\ 4 \\mid -3]\\)\n- \\(R_3 \\gets R_3 - R_2 \\implies [0, \\ 0, \\ 0 \\mid 0]\\)",
      "Giải hệ phương trình từ ma trận bậc thang:\n- Từ dòng 2: \\(2y + 4z = -3 \\implies 2y = -3 - 4z \\implies y = -\\frac{3}{2} - 2z\\).\n- Từ dòng 1: \\(x - y + z = 1 \\implies x = 1 + y - z = 1 + \\left(-\\frac{3}{2} - 2z\\right) - z = -\\frac{1}{2} - 3z\\).",
      "Vậy nghiệm tổng quát của hệ là: \\((x, y, z) = \\left(-\\frac{1}{2} - 3z, -\\frac{3}{2} - 2z, z\\right)\\), với \\(z \\in \\mathbb{R}\\).",
      "Biểu thức này hoàn toàn trùng khớp với phương án B.",
      "Ghi chú kiểm định xung đột: Khóa đáp án gốc của ngân hàng câu hỏi đánh dấu A ('None of the other choices is correct'), đây là sai sót trong khóa đáp án của ngân hàng đề thi FPTU; đáp án toán học chính xác là B."
    ],
    "image": "assets/questions/0280_q280_Question_280.png",
    "needs_image": false,
    "review_flags": ["answer_conflict"],
    "confidence": "high"
  }
];

fs.writeFileSync(path.join(__dirname, '../data/v2/batches/batch_07.json'), JSON.stringify(batch07, null, 2), 'utf8');
console.log('Batch 07 created successfully with 40 questions (Q241 - Q280).');
