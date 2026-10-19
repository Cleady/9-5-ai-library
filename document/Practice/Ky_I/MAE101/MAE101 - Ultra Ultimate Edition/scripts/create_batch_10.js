const fs = require('fs');
const path = require('path');
const batch10 = [
  {
    "id": 361,
    "chapter": "DSTT1",
    "folder": "DSTT1",
    "topic": "VectorHinhHoc",
    "type": "single_choice",
    "question": "Find the distance from the point \\(P(1, -1, 0)\\) to the plane \\(2x - y + 2z - 3 = 0\\).",
    "options": [
      "0",
      "\\(5/3\\)",
      "\\(4/3\\)",
      "\\(2/3\\)",
      "None of the other choices is correct"
    ],
    "answer": "A",
    "answer_original": "A",
    "answer_status": "verified",
    "explanation": [
      "Khoảng cách từ điểm \\(P(x_0, y_0, z_0)\\) đến mặt phẳng \\(Ax + By + Cz + D = 0\\) được tính bởi công thức:",
      "\\[ d = \\frac{|Ax_0 + By_0 + Cz_0 + D|}{\\sqrt{A^2 + B^2 + C^2}} \\]",
      "Thay tọa độ \\(P(1, -1, 0)\\) và phương trình mặt phẳng \\(2x - y + 2z - 3 = 0\\):",
      "\\[ d = \\frac{|2(1) - (-1) + 2(0) - 3|}{\\sqrt{2^2 + (-1)^2 + 2^2}} = \\frac{|2 + 1 + 0 - 3|}{\\sqrt{4 + 1 + 4}} = \\frac{0}{3} = 0 \\]",
      "Điểm \\(P\\) nằm ngay trên mặt phẳng, do đó khoảng cách bằng 0 (Đáp án A)."
    ],
    "image": "assets/questions/0361_q361_Question_361.png",
    "needs_image": false,
    "confidence": "high",
    "review_flags": []
  },
  {
    "id": 362,
    "chapter": "GT1",
    "folder": "GT1",
    "topic": "UngDungDaoHam",
    "type": "single_choice",
    "question": "Find the line that passes through the point \\((4, 5)\\) and bounds the smallest area in the first quadrant.\n(i) \\(\\frac{x}{8} - \\frac{y}{10} = 1\\)\n(ii) \\(\\frac{x}{10} + \\frac{y}{8} = 1\\)\n(iii) \\(\\frac{x}{8} + \\frac{y}{10} = 1\\)",
    "options": [
      "None of the other choices is correct",
      "(ii)",
      "(iii)",
      "(i)"
    ],
    "answer": "C",
    "answer_original": "C",
    "answer_status": "verified",
    "explanation": [
      "Phương trình đoạn chắn của đường thẳng cắt trục hoành tại \\(a > 0\\) và trục tung tại \\(b > 0\\) là \\(\\frac{x}{a} + \\frac{y}{b} = 1\\).",
      "Diện tích tam giác trong góc phần tư thứ nhất là \\(S = \\frac{1}{2}ab\\).",
      "Đường thẳng đi qua điểm \\((4, 5)\\) nên \\(\\frac{4}{a} + \\frac{5}{b} = 1\\).",
      "Áp dụng bất đẳng thức AM-GM: \\(1 = \\frac{4}{a} + \\frac{5}{b} \\ge 2\\sqrt{\\frac{20}{ab}} \\implies 1 \\ge \\frac{80}{ab} \\implies ab \\ge 80\\).",
      "Dấu bằng xảy ra khi \\(\\frac{4}{a} = \\frac{5}{b} = \\frac{1}{2} \\implies a = 8,\\; b = 10\\).",
      "Phương trình đường thẳng là \\(\\frac{x}{8} + \\frac{y}{10} = 1\\), tương ứng với (iii) (Đáp án C)."
    ],
    "image": "assets/questions/0362_q362_Question_362.png",
    "needs_image": false,
    "confidence": "high",
    "review_flags": []
  },
  {
    "id": 363,
    "chapter": "DSTT1",
    "folder": "DSTT1",
    "topic": "MaTran",
    "type": "single_choice",
    "question": "Which of the following matrices are in row-echelon form?\n(i) \\(\\begin{bmatrix} 1 & 0 & -1 \\\\ 0 & 2 & 1 \\\\ 0 & 0 & -1 \\end{bmatrix}\\)\n(ii) \\(\\begin{bmatrix} 0 & 1 & 1 \\\\ 1 & 0 & 1 \\\\ 0 & 0 & 0 \\end{bmatrix}\\)",
    "options": [
      "(i) and (ii)",
      "(i)",
      "(ii)",
      "None of the other choices is correct"
    ],
    "answer": "B",
    "answer_original": "B",
    "answer_status": "verified",
    "explanation": [
      "Định nghĩa dạng bậc thang (Row-Echelon Form - REF):",
      "1. Các hàng toàn số 0 (nếu có) phải nằm ở dưới cùng.",
      "2. Phần tử khác 0 đầu tiên của mỗi hàng (leading entry) phải nằm về phía bên phải của phần tử đầu tiên khác 0 của hàng phía trên nó.",
      "Xét ma trận (i): leading entries ở cột 1 (hàng 1), cột 2 (hàng 2), cột 3 (hàng 3). Thỏa mãn đầy đủ tính chất REF.",
      "Xét ma trận (ii): hàng 1 có leading entry ở cột 2, nhưng hàng 2 lại có leading entry ở cột 1 (nằm về phía bên trái). Vi phạm định nghĩa REF.",
      "Do đó chỉ có (i) ở dạng bậc thang (Đáp án B)."
    ],
    "image": "assets/questions/0363_q363_Question_363.png",
    "needs_image": false,
    "confidence": "high",
    "review_flags": []
  },
  {
    "id": 364,
    "chapter": "GT1",
    "folder": "GT1",
    "topic": "TichPhan",
    "type": "single_choice",
    "question": "Suppose that \\(\\int_4^6 f(x)\\,dx = \\frac{6}{57}\\). Find \\(\\int_6^4 f(x)\\,dx\\).",
    "options": [
      "0",
      "\\(6/57\\)",
      "\\(-6/57\\)",
      "None of the other choices is correct"
    ],
    "answer": "C",
    "answer_original": "C",
    "answer_status": "verified",
    "explanation": [
      "Theo tính chất đổi cận của tích phân xác định:",
      "\\[ \\int_b^a f(x)\\,dx = -\\int_a^b f(x)\\,dx \\]",
      "Ở đây:",
      "\\[ \\int_6^4 f(x)\\,dx = -\\int_4^6 f(x)\\,dx = -\\frac{6}{57} \\]",
      "Đáp án đúng là C."
    ],
    "image": "assets/questions/0364_q364_Question_364.png",
    "needs_image": false,
    "confidence": "high",
    "review_flags": []
  },
  {
    "id": 365,
    "chapter": "DSTT1",
    "folder": "DSTT1",
    "topic": "VectorHinhHoc",
    "type": "single_choice",
    "question": "Which of the following are vector equations for the line through the points \\(P(1, 2, 3)\\) and \\(Q(2, 0, 6)\\)?\n(i) \\([x, y, z] = [2, 0, 6] + t[1, 2, 3]\\)\n(ii) \\([x, y, z] = [1, 2, 3] + t[1, -2, 3]\\)\n(iii) \\([x, y, z] = [2, 0, 6] + t[-1, 2, -3]\\)",
    "options": [
      "(ii)",
      "(i) and (ii)",
      "(ii) and (iii)",
      "(iii)",
      "None of the other choices is correct"
    ],
    "answer": "C",
    "answer_original": "C",
    "answer_status": "verified",
    "explanation": [
      "Vectơ chỉ phương của đường thẳng đi qua \\(P(1, 2, 3)\\) và \\(Q(2, 0, 6)\\) là:",
      "\\[ \\vec{v} = \\vec{PQ} = [2 - 1, 0 - 2, 6 - 3] = [1, -2, 3] \\]",
      "Mọi vectơ chỉ phương cùng phương với \\([1, -2, 3]\\) đều có dạng \\(k[1, -2, 3]\\).",
      "- Phương trình (i) dùng vectơ chỉ phương \\([1, 2, 3]\\) không cùng phương (Loại).",
      "- Phương trình (ii) đi qua \\(P(1, 2, 3)\\) với vectơ chỉ phương \\([1, -2, 3]\\) (Đúng).",
      "- Phương trình (iii) đi qua \\(Q(2, 0, 6)\\) với vectơ chỉ phương \\([-1, 2, -3] = -[1, -2, 3]\\) (Đúng).",
      "Vậy cả (ii) và (iii) đều là phương trình vectơ của đường thẳng (Đáp án C)."
    ],
    "image": "assets/questions/0365_q365_Question_365.png",
    "needs_image": false,
    "confidence": "high",
    "review_flags": []
  },
  {
    "id": 366,
    "chapter": "DSTT1",
    "folder": "DSTT1",
    "topic": "DinhThuc",
    "type": "single_choice",
    "question": "Find \\(a\\) such that \\(\\det\\begin{bmatrix} a & 2 \\\\ 2 & 5 \\end{bmatrix} = 6\\).",
    "options": [
      "5",
      "1",
      "4",
      "2",
      "3"
    ],
    "answer": "D",
    "answer_original": "D",
    "answer_status": "verified",
    "explanation": [
      "Định thức của ma trận cấp 2 được tính theo công thức:",
      "\\[ \\det\\begin{bmatrix} a & 2 \\\\ 2 & 5 \\end{bmatrix} = 5a - 2 \\cdot 2 = 5a - 4 \\]",
      "Theo đề bài:",
      "\\[ 5a - 4 = 6 \\implies 5a = 10 \\implies a = 2 \\]",
      "Đáp án đúng là D."
    ],
    "image": "assets/questions/0366_q366_Question_366.png",
    "needs_image": false,
    "confidence": "high",
    "review_flags": []
  },
  {
    "id": 367,
    "chapter": "GT1",
    "folder": "GT1",
    "topic": "HamSo",
    "type": "single_choice",
    "question": "Find the composite function \\(f(g(x))\\) where \\(f(x) = \\sin(x)\\) and \\(g(x) = x^2 + 6\\).\n(i) \\(\\sin(x)(x^2 + 6)\\)\n(ii) \\(\\sin^2(x) + 6\\)\n(iii) \\(\\sin(x^2 + 6)\\)",
    "options": [
      "(ii)",
      "(iii)",
      "(i)",
      "None of the other choices is correct"
    ],
    "answer": "B",
    "answer_original": "B",
    "answer_status": "verified",
    "explanation": [
      "Hàm hợp \\(f(g(x))\\) được xác định bằng cách thay biến \\(x\\) trong \\(f(x)\\) bởi biểu thức \\(g(x)\\):",
      "\\[ f(g(x)) = f(x^2 + 6) = \\sin(x^2 + 6) \\]",
      "Biểu thức này tương ứng với (iii) (Đáp án B)."
    ],
    "image": "assets/questions/0367_q367_Question_367.png",
    "needs_image": false,
    "confidence": "high",
    "review_flags": []
  },
  {
    "id": 368,
    "chapter": "GT1",
    "folder": "GT1",
    "topic": "TichPhan",
    "type": "single_choice",
    "question": "Use the Midpoint Rule with \\(n = 3\\) to approximate the value of the integral \\(\\int_0^3 (9 - x^2)\\,dx\\).",
    "options": [
      "18",
      "\\(65/4\\)",
      "\\(73/4\\)",
      "\\(69/4\\)",
      "None of the other choices is correct"
    ],
    "answer": "C",
    "answer_original": "C",
    "answer_status": "verified",
    "explanation": [
      "Độ dài mỗi khoảng chia: \\(\\Delta x = \\frac{3 - 0}{3} = 1\\).",
      "Các khoảng chia là: \\([0, 1], [1, 2], [2, 3]\\).",
      "Điểm chính giữa (midpoints) của các khoảng tương ứng là: \\(x_1^* = 0.5\\), \\(x_2^* = 1.5\\), \\(x_3^* = 2.5\\).",
      "Giá trị hàm số tại các điểm giữa:",
      "- \\(f(0.5) = 9 - (0.5)^2 = 9 - 0.25 = 8.75 = \\frac{35}{4}\\)",
      "- \\(f(1.5) = 9 - (1.5)^2 = 9 - 2.25 = 6.75 = \\frac{27}{4}\\)",
      "- \\(f(2.5) = 9 - (2.5)^2 = 9 - 6.25 = 2.75 = \\frac{11}{4}\\)",
      "Tổng xấp xỉ điểm giữa \\(M_3\\):",
      "\\[ M_3 = \\Delta x \\left[ f(0.5) + f(1.5) + f(2.5) \\right] = 1 \\cdot \\left( \\frac{35}{4} + \\frac{27}{4} + \\frac{11}{4} \\right) = \\frac{73}{4} \\]",
      "Đáp án đúng là C."
    ],
    "image": "assets/questions/0368_q368_Question_368.png",
    "needs_image": false,
    "confidence": "high",
    "review_flags": []
  },
  {
    "id": 369,
    "chapter": "GT1",
    "folder": "GT1",
    "topic": "GioiHan",
    "type": "single_choice",
    "question": "Find all horizontal asymptotes of the function \\(f(x) = \\frac{\\sin x}{x} + 1\\).",
    "options": [
      "\\(y = 1\\)",
      "None of the other choices is correct",
      "\\(y = 0\\)",
      "\\(y = -1\\)"
    ],
    "answer": "A",
    "answer_original": "A",
    "answer_status": "verified",
    "explanation": [
      "Tiệm cận ngang của hàm số \\(y = f(x)\\) là đường thẳng \\(y = L\\) nếu \\(\\lim_{x \\to \\pm\\infty} f(x) = L\\).",
      "Ta xét giới hạn khi \\(x \\to \\pm\\infty\\):",
      "\\[ \\lim_{x \\to \\pm\\infty} \\left( \\frac{\\sin x}{x} + 1 \\right) \\]",
      "Vì \\(|\\sin x| \\le 1\\), theo định lý kẹp ta có \\(\\lim_{x \\to \\pm\\infty} \\frac{\\sin x}{x} = 0\\).",
      "Do đó \\(\\lim_{x \\to \\pm\\infty} f(x) = 0 + 1 = 1\\).",
      "Vậy hàm số có duy nhất một tiệm cận ngang là \\(y = 1\\) (Đáp án A)."
    ],
    "image": "assets/questions/0369_q369_Question_369.png",
    "needs_image": false,
    "confidence": "high",
    "review_flags": []
  },
  {
    "id": 370,
    "chapter": "GT1",
    "folder": "GT1",
    "topic": "DaoHam",
    "type": "single_choice",
    "question": "The position function of a particle is given by \\(s(t) = t^2\\cos t + 4t^2\\) (t in seconds, s in meters). Find the velocity of the particle at \\(t = \\pi\\).\n(i) \\(6\\pi - 1\\)\n(ii) \\(2\\pi\\)\n(iii) \\(6\\pi\\)",
    "options": [
      "(i)",
      "(iii)",
      "(ii)",
      "None of the other choices is correct"
    ],
    "answer": "B",
    "answer_original": "B",
    "answer_status": "verified",
    "explanation": [
      "Vận tốc là đạo hàm bậc nhất của phương trình chuyển động theo thời gian: \\(v(t) = s'(t)\\).",
      "Áp dụng quy tắc đạo hàm tích và luỹ thừa:",
      "\\[ s'(t) = \\frac{d}{dt}(t^2\\cos t) + \\frac{d}{dt}(4t^2) = 2t\\cos t - t^2\\sin t + 8t \\]",
      "Tại thời điểm \\(t = \\pi\\):",
      "\\[ v(\\pi) = 2\\pi\\cos(\\pi) - \\pi^2\\sin(\\pi) + 8\\pi = 2\\pi(-1) - 0 + 8\\pi = -2\\pi + 8\\pi = 6\\pi \\]",
      "Kết quả là \\(6\\pi\\), tương ứng với (iii) (Đáp án B)."
    ],
    "image": "assets/questions/0370_q370_Question_370.png",
    "needs_image": false,
    "confidence": "high",
    "review_flags": []
  },
  {
    "id": 371,
    "chapter": "GT1",
    "folder": "GT1",
    "topic": "TichPhan",
    "type": "single_choice",
    "question": "Find \\(b\\) such that the average value of \\(f(x) = 3x^2 + 2x\\) on the interval \\([0, b]\\) is equal to 72.",
    "options": [
      "\\(b = 9\\)",
      "None of the other choices is correct",
      "\\(b = 7\\)",
      "\\(b = 6\\)",
      "\\(b = 8\\)"
    ],
    "answer": "E",
    "answer_original": "E",
    "answer_status": "verified",
    "explanation": [
      "Giá trị trung bình của hàm số \\(f(x)\\) trên đoạn \\([a, b]\\) là:",
      "\\[ f_{\\text{avg}} = \\frac{1}{b - a} \\int_a^b f(x)\\,dx \\]",
      "Ở đây trên đoạn \\([0, b]\\):",
      "\\[ f_{\\text{avg}} = \\frac{1}{b} \\int_0^b (3x^2 + 2x)\\,dx = \\frac{1}{b} \\left[ x^3 + x^2 \\right]_0^b = \\frac{b^3 + b^2}{b} = b^2 + b \\]",
      "Theo bài ra:",
      "\\[ b^2 + b = 72 \\iff b^2 + b - 72 = 0 \\iff (b + 9)(b - 8) = 0 \\]",
      "Vì \\(b > 0\\) trên khoảng \\([0, b]\\), ta nhận nghiệm \\(b = 8\\) (Đáp án E)."
    ],
    "image": "assets/questions/0371_q371_Question_371.png",
    "needs_image": false,
    "confidence": "high",
    "review_flags": []
  },
  {
    "id": 372,
    "chapter": "GT1",
    "folder": "GT1",
    "topic": "TichPhan",
    "type": "single_choice",
    "question": "Find \\(\\frac{d}{dx} \\int_1^x \\frac{1}{\\sqrt{16 - t^2}}\\,dt\\).\n(i) \\(\\arcsin(x/4) - \\arcsin(1/4)\\)\n(ii) \\(\\frac{-x}{(16-x^2)^{3/2}}\\)\n(iii) \\(\\frac{1}{\\sqrt{16-x^2}}\\)",
    "options": [
      "(ii)",
      "(i)",
      "None of the other choices is correct",
      "(iii)"
    ],
    "answer": "D",
    "answer_original": "D",
    "answer_status": "verified",
    "explanation": [
      "Theo định lý cơ bản của giải tích phần 1 (Fundamental Theorem of Calculus, Part 1):",
      "Nếu \\(g(x) = \\int_a^x f(t)\\,dt\\) thì \\(g'(x) = f(x)\\).",
      "Áp dụng trực tiếp với \\(f(t) = \\frac{1}{\\sqrt{16 - t^2}}\\):",
      "\\[ \\frac{d}{dx} \\int_1^x \\frac{1}{\\sqrt{16 - t^2}}\\,dt = \\frac{1}{\\sqrt{16 - x^2}} \\]",
      "Kết quả tương ứng với (iii) (Đáp án D)."
    ],
    "image": "assets/questions/0372_q372_Question_372.png",
    "needs_image": false,
    "confidence": "high",
    "review_flags": []
  },
  {
    "id": 373,
    "chapter": "DSTT1",
    "folder": "DSTT1",
    "topic": "KhongGianVector",
    "type": "single_choice",
    "question": "Find \\(t\\) such that \\((1, t, 3, 4)\\) belongs to the subspace of \\(\\mathbb{R}^4\\) spanned by \\(\\{(1, 1, 2, 1), (0, 1, 1, -2)\\}\\).",
    "options": [
      "There is no such \\(t\\)",
      "\\(t = 2\\)",
      "\\(t = -1\\)",
      "\\(t = 0\\)",
      "None of the other choices is correct"
    ],
    "answer": "A",
    "answer_original": "A",
    "answer_status": "verified",
    "explanation": [
      "Vectơ \\((1, t, 3, 4)\\) thuộc không gian sinh bởi \\(\\{(1, 1, 2, 1), (0, 1, 1, -2)\\}\\) khi và chỉ khi tồn tại hai số thực \\(c_1, c_2\\) sao cho:",
      "\\[ c_1(1, 1, 2, 1) + c_2(0, 1, 1, -2) = (1, t, 3, 4) \\]",
      "Viết thành hệ phương trình theo từng thành phần tọa độ:",
      "1) \\(c_1 = 1\\)",
      "2) \\(c_1 + c_2 = t\\)",
      "3) \\(2c_1 + c_2 = 3\\)",
      "4) \\(c_1 - 2c_2 = 4\\)",
      "Từ phương trình (1) ta có \\(c_1 = 1\\).",
      "Thay vào (3): \\(2(1) + c_2 = 3 \\implies c_2 = 1\\).",
      "Kiểm tra lại với phương trình (4):",
      "\\[ c_1 - 2c_2 = 1 - 2(1) = -1 \\ne 4 \\]",
      "Hệ phương trình vô nghiệm, do đó không tồn tại giá trị nào của \\(t\\) (Đáp án A)."
    ],
    "image": "assets/questions/0373_q373_Question_373.png",
    "needs_image": false,
    "confidence": "high",
    "review_flags": []
  },
  {
    "id": 374,
    "chapter": "GT1",
    "folder": "GT1",
    "topic": "DaoHam",
    "type": "single_choice",
    "question": "Find the linear approximation of the function \\(f(x) = \\sqrt[3]{1 + 2x}\\) at \\(a = 0\\).",
    "options": [
      "\\(-\\frac{2}{3}x + 1\\)",
      "\\(\\frac{2}{3}x + 1\\)",
      "None of the other choices is correct",
      "\\(\\frac{1}{3}x + 1\\)",
      "\\(-\\frac{1}{3}x + 1\\)"
    ],
    "answer": "B",
    "answer_original": "B",
    "answer_status": "verified",
    "explanation": [
      "Công thức xấp xỉ tuyến tính tại \\(x = a\\) là \\(L(x) = f(a) + f'(a)(x - a)\\).",
      "Tại \\(a = 0\\): \\(f(0) = \\sqrt[3]{1 + 0} = 1\\).",
      "Tính đạo hàm:",
      "\\[ f'(x) = \\frac{d}{dx}(1 + 2x)^{1/3} = \\frac{1}{3}(1 + 2x)^{-2/3} \\cdot 2 = \\frac{2}{3\\sqrt[3]{(1 + 2x)^2}} \\]",
      "Tại \\(a = 0\\): \\(f'(0) = \\frac{2}{3(1)} = \\frac{2}{3}\\).",
      "Vậy phương trình xấp xỉ tuyến tính là:",
      "\\[ L(x) = 1 + \\frac{2}{3}(x - 0) = \\frac{2}{3}x + 1 \\]",
      "Đáp án đúng là B."
    ],
    "image": "assets/questions/0374_q374_Question_374.png",
    "needs_image": false,
    "confidence": "high",
    "review_flags": []
  },
  {
    "id": 375,
    "chapter": "DSTT1",
    "folder": "DSTT1",
    "topic": "VectorHinhHoc",
    "type": "single_choice",
    "question": "Let \\(ABCD\\) be a parallelogram. Given \\(A(1, 2, -1)\\), \\(B(1, 0, 2)\\) and the intersection of the two diagonals is \\(O(1, -1, -1)\\). Find the vector \\(\\vec{BC}\\).",
    "options": [
      "\\([0, -4, -3]\\)",
      "\\([0, -2, -1]\\)",
      "\\([0, 4, 3]\\)",
      "\\([0, 2, 1]\\)",
      "None of the other choices is correct"
    ],
    "answer": "A",
    "answer_original": "A",
    "answer_status": "verified",
    "explanation": [
      "Trong hình bình hành \\(ABCD\\), giao điểm \\(O\\) của hai đường chéo là trung điểm của \\(AC\\) và \\(BD\\).",
      "Vì \\(O\\) là trung điểm của \\(AC\\), tọa độ đỉnh \\(C\\) thỏa mãn:",
      "\\[ C = 2O - A = 2(1, -1, -1) - (1, 2, -1) = (2 - 1, -2 - 2, -2 - (-1)) = (1, -4, -1) \\]",
      "Vectơ \\(\\vec{BC}\\) có tọa độ là:",
      "\\[ \\vec{BC} = C - B = (1 - 1, -4 - 0, -1 - 2) = [0, -4, -3] \\]",
      "Đáp án đúng là A."
    ],
    "image": "assets/questions/0375_q375_Question_375.png",
    "needs_image": false,
    "confidence": "high",
    "review_flags": []
  },
  {
    "id": 376,
    "chapter": "DSTT1",
    "folder": "DSTT1",
    "topic": "KhongGianVector",
    "type": "single_choice",
    "question": "Find the dimension of the subspace spanned by the vectors \\(\\{(1, 2, 3), (-2, 4, 0), (0, 8, 6)\\}\\).",
    "options": [
      "1",
      "0",
      "2",
      "3",
      "None of the other choices is correct"
    ],
    "answer": "C",
    "answer_original": "C",
    "answer_status": "verified",
    "explanation": [
      "Số chiều (dimension) của không gian sinh bởi hệ vectơ chính là hạng của ma trận tạo bởi các vectơ đó:",
      "\\[ M = \\begin{bmatrix} 1 & 2 & 3 \\\\ -2 & 4 & 0 \\\\ 0 & 8 & 6 \\end{bmatrix} \\]",
      "Biến đổi sơ cấp theo hàng: cộng 2 lần hàng 1 vào hàng 2:",
      "\\[ \\begin{bmatrix} 1 & 2 & 3 \\\\ 0 & 8 & 6 \\\\ 0 & 8 & 6 \\end{bmatrix} \\]",
      "Trừ hàng 2 khỏi hàng 3:",
      "\\[ \\begin{bmatrix} 1 & 2 & 3 \\\\ 0 & 8 & 6 \\\\ 0 & 0 & 0 \\end{bmatrix} \\]",
      "Ma trận bậc thang có đúng 2 hàng khác 0, do đó hạng bằng 2.",
      "Vậy số chiều của không gian con là 2 (Đáp án C)."
    ],
    "image": "assets/questions/0376_q376_Question_376.png",
    "needs_image": false,
    "confidence": "high",
    "review_flags": []
  },
  {
    "id": 377,
    "chapter": "DSTT1",
    "folder": "DSTT1",
    "topic": "TriRieng",
    "type": "single_choice",
    "question": "Find the characteristic polynomial of the matrix\n\\[ \\begin{bmatrix} 1 & 0 & 2 \\\\ -2 & 3 & 1 \\\\ 0 & 2 & 2 \\end{bmatrix} \\]\n(i) \\(-x^3 + 6x^2 - 9x + 4\\)\n(ii) \\(x^3 - 6x^2 + 9x + 4\\)\n(iii) \\(x^3 - 6x^2 - 9x - 4\\)",
    "options": [
      "(i)",
      "All of the other choices are incorrect",
      "(iii)",
      "(ii)"
    ],
    "answer": "D",
    "answer_original": "D",
    "answer_status": "verified",
    "explanation": [
      "Đa thức đặc trưng được tính bởi \\(p(x) = \\det(xI - A)\\):",
      "\\[ xI - A = \\begin{bmatrix} x - 1 & 0 & -2 \\\\ 2 & x - 3 & -1 \\\\ 0 & -2 & x - 2 \\end{bmatrix} \\]",
      "Khai triển định thức theo hàng 1:",
      "\\[ \\det(xI - A) = (x - 1) \\begin{vmatrix} x - 3 & -1 \\\\ -2 & x - 2 \\end{vmatrix} - 2 \\begin{vmatrix} 2 & x - 3 \\\\ 0 & -2 \\end{vmatrix} \\]",
      "\\[ = (x - 1)[(x - 3)(x - 2) - 2] - 2[2(-2) - 0] \\]",
      "\\[ = (x - 1)(x^2 - 5x + 6 - 2) - 2(-4) \\]",
      "\\[ = (x - 1)(x^2 - 5x + 4) + 8 \\]",
      "\\[ = x^3 - 5x^2 + 4x - x^2 + 5x - 4 + 8 = x^3 - 6x^2 + 9x + 4 \\]",
      "Biểu thức này tương ứng với (ii) (Đáp án D)."
    ],
    "image": "assets/questions/0377_q377_Question_377.png",
    "needs_image": false,
    "confidence": "high",
    "review_flags": []
  },
  {
    "id": 378,
    "chapter": "DSTT1",
    "folder": "DSTT1",
    "topic": "HePhuongTrinh",
    "type": "single_choice",
    "question": "John and Joe earn a total of 34 dollars when John works 2 hours and Joe works 3 hours. If John works 3 hours and Joe works 2 hours, they get 33.5 dollars. Find John's hourly rate (in dollars).",
    "options": [
      "6.5",
      "7",
      "5.5",
      "6",
      "8"
    ],
    "answer": "A",
    "answer_original": "A",
    "answer_status": "verified",
    "explanation": [
      "Gọi \\(x\\) là mức lương theo giờ của John và \\(y\\) là mức lương theo giờ của Joe (đơn vị: đô la).",
      "Từ các dữ kiện của bài toán, ta lập hệ phương trình tuyến tính:",
      "\\[ \\begin{cases} 2x + 3y = 34 \\\\ 3x + 2y = 33.5 \\end{cases} \\]",
      "Trừ phương trình thứ hai cho phương trình thứ nhất:",
      "Vậy mức lương theo giờ của John là 6.5 dollars (Đáp án A).",
      "Thế vào phương trình thứ nhất:",
      "\\[ 2x + 3(x + 0.5) = 34 \\implies 5x + 1.5 = 34 \\implies 5x = 32.5 \\implies x = 6.5 \\]",
      "Vậy mức lương theo giờ của John là \\6.5 (Đáp án A)."
    ],
    "image": "assets/questions/0378_q378_Question_378.png",
    "needs_image": false,
    "review_flags": [
      "prompt_anomaly_resolved"
    ],
    "confidence": "high"
  },
  {
    "id": 379,
    "chapter": "DSTT1",
    "folder": "DSTT1",
    "topic": "HePhuongTrinh",
    "type": "single_choice",
    "question": "For a homogeneous system of 3 equations in 5 variables, which of the following statement are true?",
    "options": [
      "The system can have a unique solution",
      "The system can have infinitely many solutions",
      "The system can be inconsistent",
      "The system has no solution"
    ],
    "answer": "B",
    "answer_original": "B",
    "answer_status": "verified",
    "explanation": [
      "Xét hệ phương trình tuyến tính thuần nhất \\(A\\mathbf{x} = \\mathbf{0}\\):",
      "1. Hệ thuần nhất luôn có ít nhất nghiệm tầm thường \\(\\mathbf{x} = \\mathbf{0}\\), do đó hệ không bao giờ vô nghiệm (không thể inconsistent).",
      "2. Hệ có \\(m = 3\\) phương trình và \\(n = 5\\) ẩn. Hạng của ma trận hệ số \\(r(A) \\le \\min(3, 5) = 3\\).",
      "3. Số ẩn tự do là \\(n - r(A) \\ge 5 - 3 = 2 > 0\\). Do luôn tồn tại ẩn tự do, hệ phương trình luôn có vô số nghiệm.",
      "Vậy phát biểu đúng là 'The system can have infinitely many solutions' (Đáp án B)."
    ],
    "image": "assets/questions/0379_q379_Question_379.png",
    "needs_image": false,
    "confidence": "high",
    "review_flags": []
  },
  {
    "id": 380,
    "chapter": "DSTT1",
    "folder": "DSTT1",
    "topic": "VectorHinhHoc",
    "type": "single_choice",
    "question": "Find \\(a - 2b\\) if the set \\(\\{[1, 0, 1], [-2, 1, 2], [1, a, b]\\}\\) is orthogonal.",
    "options": [
      "1",
      "6",
      "3",
      "4"
    ],
    "answer": "B",
    "answer_original": "B",
    "answer_status": "verified",
    "explanation": [
      "Hệ ba vectơ trực giao khi tích vô hướng giữa hai vectơ bất kỳ bằng 0.",
      "1. Trực giao giữa vectơ 1 và vectơ 3:",
      "\\[ [1, 0, 1] \\cdot [1, a, b] = 1(1) + 0(a) + 1(b) = 1 + b = 0 \\implies b = -1 \\]",
      "2. Trực giao giữa vectơ 2 và vectơ 3:",
      "\\[ [-2, 1, 2] \\cdot [1, a, b] = -2(1) + 1(a) + 2(b) = -2 + a + 2b = 0 \\]",
      "Thay \\(b = -1\\) vào:",
      "\\[ -2 + a + 2(-1) = 0 \\implies a - 4 = 0 \\implies a = 4 \\]",
      "Tính giá trị biểu thức:",
      "\\[ a - 2b = 4 - 2(-1) = 4 + 2 = 6 \\]",
      "Đáp án đúng là B."
    ],
    "image": "assets/questions/0380_q380_Question_380.png",
    "needs_image": false,
    "confidence": "high",
    "review_flags": []
  },
  {
    "id": 381,
    "chapter": "DSTT1",
    "folder": "DSTT1",
    "topic": "MaTran",
    "type": "single_choice",
    "question": "Compute \\(A\\mathbf{x}\\) where \\(\\mathbf{x} = [-2, 1, 0]^T\\) and\n\\[ A = \\begin{bmatrix} 1 & 2 & 3 \\\\ 4 & 5 & 6 \\\\ 7 & 8 & 9 \\\\ 10 & 11 & 12 \\end{bmatrix} \\]\n(i) \\([0, 3, -6, -9]^T\\)\n(ii) \\([0, -3, 6, -9]^T\\)\n(iii) \\([0, -3, -6, -9]^T\\)\n(iv) \\([0, -3, -6, 9]^T\\)",
    "options": [
      "(ii)",
      "(iv)",
      "(iii)",
      "(i)",
      "None of the choices is correct"
    ],
    "answer": "C",
    "answer_original": "C",
    "answer_status": "verified",
    "explanation": [
      "Thực hiện nhân ma trận \\(A\\) kích thước \\(4 \\times 3\\) với vectơ cột \\(\\mathbf{x}\\) kích thước \\(3 \\times 1\\):",
      "- Hàng 1: \\(1(-2) + 2(1) + 3(0) = -2 + 2 = 0\\)",
      "- Hàng 2: \\(4(-2) + 5(1) + 6(0) = -8 + 5 = -3\\)",
      "- Hàng 3: \\(7(-2) + 8(1) + 9(0) = -14 + 8 = -6\\)",
      "- Hàng 4: \\(10(-2) + 11(1) + 12(0) = -20 + 11 = -9\\)",
      "Kết quả thu được là vectơ \\([0, -3, -6, -9]^T\\), tương ứng với (iii) (Đáp án C)."
    ],
    "image": "assets/questions/0381_q381_Question_381.png",
    "needs_image": false,
    "confidence": "high",
    "review_flags": []
  },
  {
    "id": 382,
    "chapter": "DSTT1",
    "folder": "DSTT1",
    "topic": "KhongGianVector",
    "type": "single_choice",
    "question": "Let \\(\\{u, v, w\\}\\) be independent. Which of the following sets are independent?\n(i) \\(\\{u, v - w, w\\}\\)\n(ii) \\(\\{u, u - v, u + v, w\\}\\)",
    "options": [
      "(i)",
      "(ii)",
      "(i) and (ii)",
      "None of the other choices is correct"
    ],
    "answer": "A",
    "answer_original": "A",
    "answer_status": "verified",
    "explanation": [
      "Kiểm tra tập (i):",
      "Xét đẳng thức \\(c_1 u + c_2(v - w) + c_3 w = 0\\):",
      "\\[ c_1 u + c_2 v + (c_3 - c_2)w = 0 \\]",
      "Vì \\(\\{u, v, w\\}\\) độc lập tuyến tính, nên \\(c_1 = 0\\), \\(c_2 = 0\\), và \\(c_3 - c_2 = 0 \\implies c_3 = 0\\). Do đó tập (i) độc lập tuyến tính.",
      "Kiểm tra tập (ii):",
      "Nhận thấy \\((u - v) + (u + v) = 2u \\implies 2u - (u - v) - (u + v) = 0\\).",
      "Tồn tại tổ hợp tuyến tính không tầm thường bằng 0, do đó tập (ii) phụ thuộc tuyến tính.",
      "Vậy chỉ có tập (i) độc lập tuyến tính (Đáp án A)."
    ],
    "image": "assets/questions/0382_q382_Question_382.png",
    "needs_image": false,
    "confidence": "high",
    "review_flags": []
  },
  {
    "id": 383,
    "chapter": "DSTT1",
    "folder": "DSTT1",
    "topic": "KhongGianVector",
    "type": "single_choice",
    "question": "Which of the followings are subspaces of \\(R^3\\)?\n(i) \\(U = \\{(x, y, z) \\mid x + 2y - 3z = 0\\}\\)\n(ii) \\(U = \\{(x, y, z) \\mid x^2 + y^2 + z^2 = 1\\}\\)",
    "options": [
      "(i) and (ii)",
      "(i)",
      "None of the other choices is correct",
      "(ii)"
    ],
    "answer": "B",
    "answer_original": "B",
    "answer_status": "verified",
    "explanation": [
      "Kiểm tra tính chất không gian con (subspace) của \\(\\mathbb{R}^3\\):",
      "1. Tập (i) là mặt phẳng đi qua gốc tọa độ \\(x + 2y - 3z = 0\\). Chứa vectơ không \\((0, 0, 0)\\), đóng kín đối với phép cộng và phép nhân vô hướng. Do đó (i) là không gian con.",
      "2. Tập (ii) là mặt cầu đơn vị. Vectơ không \\((0, 0, 0)\\) không thuộc tập vì \\(0^2 + 0^2 + 0^2 = 0 \\ne 1\\). Do đó (ii) không phải là không gian con.",
      "Vậy chỉ có (i) là không gian con (Đáp án B)."
    ],
    "image": "assets/questions/0383_q383_Question_383.png",
    "needs_image": false,
    "confidence": "high",
    "review_flags": []
  },
  {
    "id": 384,
    "chapter": "DSTT1",
    "folder": "DSTT1",
    "topic": "MaTran",
    "type": "single_choice",
    "question": "Let \\(A = \\begin{bmatrix} a & a & a \\\\ x & y & z \\\\ b & b & b \\end{bmatrix}\\), where \\(a, b, x, y, z\\) are real numbers.\nFind the second column of \\(\\operatorname{adj}(A)\\).\n(i) \\(\\begin{bmatrix} bz - bx \\\\ 0 \\\\ ax - az \\end{bmatrix}\\)\n(ii) \\(\\begin{bmatrix} bx - bz \\\\ 0 \\\\ az - ax \\end{bmatrix}\\)\n(iii) \\(\\begin{bmatrix} 0 \\\\ 0 \\\\ 0 \\end{bmatrix}\\)",
    "options": [
      "All of the other choices are incorrect",
      "(ii)",
      "(iii)",
      "(i)"
    ],
    "answer": "C",
    "answer_original": "C",
    "answer_status": "verified",
    "explanation": [
      "Ma trận phụ hợp \\(\\operatorname{adj}(A)\\) được định nghĩa là chuyển vị của ma trận phần bù đại số: \\(\\operatorname{adj}(A) = C^T\\).",
      "Cột thứ 2 của \\(\\operatorname{adj}(A)\\) gồm các phần bù đại số của hàng thứ 2 của \\(A\\):",
      "\\[ \\operatorname{Col}_2(\\operatorname{adj}(A)) = \\begin{bmatrix} C_{21} \\\\ C_{22} \\\\ C_{23} \\end{bmatrix} \\]",
      "Tính các phần bù đại số tương ứng:",
      "- \\(C_{21} = -\\det\\begin{bmatrix} a & a \\\\ b & b \\end{bmatrix} = -(ab - ab) = 0\\)",
      "- \\(C_{22} = +\\det\\begin{bmatrix} a & a \\\\ b & b \\end{bmatrix} = ab - ab = 0\\)",
      "- \\(C_{23} = -\\det\\begin{bmatrix} a & a \\\\ b & b \\end{bmatrix} = -(ab - ab) = 0\\)",
      "Như vậy, cột thứ hai của \\(\\operatorname{adj}(A)\\) là \\([0, 0, 0]^T\\), tương ứng với (iii) (Đáp án C)."
    ],
    "image": "assets/questions/0384_q384_Question_384.png",
    "needs_image": false,
    "confidence": "high",
    "review_flags": []
  },
  {
    "id": 385,
    "chapter": "GT1",
    "folder": "GT1",
    "topic": "DaoHam",
    "type": "single_choice",
    "question": "Find \\(f'(1)\\) for \\(f(x) = \\frac{7}{x^3} - \\frac{4}{x}\\).",
    "options": [
      "25",
      "17",
      "None of the other choices is correct",
      "-25",
      "-17"
    ],
    "answer": "E",
    "answer_original": "E",
    "answer_status": "verified",
    "explanation": [
      "Viết lại hàm số dưới dạng luỹ thừa: \\(f(x) = 7x^{-3} - 4x^{-1}\\).",
      "Lấy đạo hàm:",
      "\\[ f'(x) = 7(-3x^{-4}) - 4(-1x^{-2}) = -21x^{-4} + 4x^{-2} = -\\frac{21}{x^4} + \\frac{4}{x^2} \\]",
      "Tại \\(x = 1\\):",
      "\\[ f'(1) = -21(1) + 4(1) = -21 + 4 = -17 \\]",
      "Đáp án đúng là E."
    ],
    "image": "assets/questions/0385_q385_Question_385.png",
    "needs_image": false,
    "confidence": "high",
    "review_flags": []
  },
  {
    "id": 386,
    "chapter": "GT1",
    "folder": "GT1",
    "topic": "TichPhan",
    "type": "single_choice",
    "question": "Use the Midpoint Rule with \\(n = 4\\) to estimate the value of the integral \\(\\int_0^2 f(x)\\,dx\\) using the table:\n\\(\\begin{array}{|c|c|c|c|c|c|c|c|c|c|}\\hline x & 0.00 & 0.25 & 0.50 & 0.75 & 1.00 & 1.25 & 1.50 & 1.75 & 2.00 \\\\ \\hline f(x) & 1.00 & 0.61 & 0.49 & 0.42 & 0.37 & 0.33 & 0.29 & 0.27 & 0.24 \\\\ \\hline\\end{array}\\)",
    "options": [
      "0.4075",
      "0.815",
      "0.855",
      "0.4225",
      "None of the other choices is correct"
    ],
    "answer": "B",
    "answer_original": "B",
    "answer_status": "verified",
    "explanation": [
      "Độ dài mỗi khoảng chia: \\(\\Delta x = \\frac{2 - 0}{4} = 0.50\\).",
      "Bốn khoảng chia là: \\([0, 0.5], [0.5, 1.0], [1.0, 1.5], [1.5, 2.0]\\).",
      "Các điểm giữa (midpoints) tương ứng là: \\(x = 0.25, 0.75, 1.25, 1.75\\).",
      "Tra giá trị hàm số từ bảng:",
      "- \\(f(0.25) = 0.61\\)",
      "- \\(f(0.75) = 0.42\\)",
      "- \\(f(1.25) = 0.33\\)",
      "- \\(f(1.75) = 0.27\\)",
      "Áp dụng công thức điểm giữa:",
      "\\[ M_4 = \\Delta x \\left[ f(0.25) + f(0.75) + f(1.25) + f(1.75) \\right] = 0.5 \\times (0.61 + 0.42 + 0.33 + 0.27) = 0.5 \\times 1.63 = 0.815 \\]",
      "Đáp án đúng là B."
    ],
    "image": "assets/questions/0386_q386_Question_386.png",
    "needs_image": false,
    "confidence": "high",
    "review_flags": []
  },
  {
    "id": 387,
    "chapter": "GT1",
    "folder": "GT1",
    "topic": "GioiHan",
    "type": "single_choice",
    "question": "Evaluate the limit, if it exists\n\\[ \\lim_{x \\to 1^-} \\frac{|x^2 - 4x + 3|}{x - 1} \\]",
    "options": [
      "2",
      "0",
      "-2",
      "3",
      "-3",
      "None of the other choices is correct"
    ],
    "answer": "C",
    "answer_original": "C",
    "answer_status": "verified",
    "explanation": [
      "Phân tích tử thức thành nhân tử: \\(x^2 - 4x + 3 = (x - 1)(x - 3)\\).",
      "Khi \\(x \\to 1^-\\), ta có \\(x < 1\\):",
      "- \\(x - 1 < 0\\)",
      "- \\(x - 3 < 0\\)",
      "Do đó tích \\((x - 1)(x - 3) > 0\\), suy ra \\(|x^2 - 4x + 3| = (x - 1)(x - 3)\\).",
      "Tính giới hạn:",
      "\\[ \\lim_{x \\to 1^-} \\frac{|x^2 - 4x + 3|}{x - 1} = \\lim_{x \\to 1^-} \\frac{(x - 1)(x - 3)}{x - 1} = \\lim_{x \\to 1^-} (x - 3) = 1 - 3 = -2 \\]",
      "Đáp án đúng là C."
    ],
    "image": "assets/questions/0387_q387_Question_387.png",
    "needs_image": false,
    "confidence": "high",
    "review_flags": []
  },
  {
    "id": 388,
    "chapter": "GT1",
    "folder": "GT1",
    "topic": "DaoHam",
    "type": "single_choice",
    "question": "At 2:00 PM a car's speedometer reads 30 mi/h. At 2:10 PM it reads 50 mi/h. Find the average acceleration from 2:00 PM to 2:10 PM.",
    "options": [
      "120",
      "30",
      "80",
      "60",
      "None of the other choices is correct",
      "50"
    ],
    "answer": "A",
    "answer_original": "A",
    "answer_status": "verified",
    "explanation": [
      "Gia tốc trung bình được tính theo công thức:",
      "\\[ a_{\\text{avg}} = \\frac{\\Delta v}{\\Delta t} \\]",
      "Ở đây:",
      "- Độ biến thiên vận tốc: \\(\\Delta v = 50 - 30 = 20\\text{ mi/h}\\).",
      "- Khoảng thời gian: \\(\\Delta t = 10\\text{ phút} = \\frac{10}{60}\\text{ giờ} = \\frac{1}{6}\\text{ giờ}\\).",
      "Thay số:",
      "\\[ a_{\\text{avg}} = \\frac{20}{1/6} = 20 \\times 6 = 120\\text{ mi/h}^2 \\]",
      "Đáp án đúng là A."
    ],
    "image": "assets/questions/0388_q388_Question_388.png",
    "needs_image": false,
    "confidence": "high",
    "review_flags": []
  },
  {
    "id": 389,
    "chapter": "GT1",
    "folder": "GT1",
    "topic": "TichPhan",
    "type": "single_choice",
    "question": "Compute the left Riemann sum for\n\\[ f(x) = \\frac{1}{x(x - 1)} \\]\non \\([2, 6]\\) using 4 subintervals. (Give your answer to 2 decimal places)",
    "options": [
      "1",
      "0.33",
      "0.57",
      "0.80"
    ],
    "answer": "D",
    "answer_original": "D",
    "answer_status": "verified",
    "explanation": [
      "Độ dài mỗi khoảng chia: \\(\\Delta x = \\frac{6 - 2}{4} = 1\\).",
      "Các đầu mút bên trái của 4 khoảng con là: \\(x_0 = 2, x_1 = 3, x_2 = 4, x_3 = 5\\).",
      "Tính giá trị hàm số tại các đầu mút bên trái:",
      "- \\(f(2) = \\frac{1}{2(1)} = \\frac{1}{2} = 0.50\\)",
      "- \\(f(3) = \\frac{1}{3(2)} = \\frac{1}{6}\\)",
      "- \\(f(4) = \\frac{1}{4(3)} = \\frac{1}{12}\\)",
      "- \\(f(5) = \\frac{1}{5(4)} = \\frac{1}{20} = 0.05\\)",
      "Tổng Riemann trái là:",
      "\\[ L_4 = 1 \\cdot \\left( \\frac{1}{2} + \\frac{1}{6} + \\frac{1}{12} + \\frac{1}{20} \\right) \\]",
      "\\[ = 0.50 + \\frac{10 + 5 + 3}{60} = 0.50 + \\frac{18}{60} = 0.50 + 0.30 = 0.80 \\]",
      "Đáp án đúng là D."
    ],
    "image": "assets/questions/0389_q389_Question_389.png",
    "needs_image": false,
    "confidence": "high",
    "review_flags": []
  },
  {
    "id": 390,
    "chapter": "DSTT1",
    "folder": "DSTT1",
    "topic": "TriRieng",
    "type": "single_choice",
    "question": "Let A be a \\(2 \\times 2\\) matrix with two eigenvectors \\(v_1 = [1, -1]^T\\) and \\(v_2 = [-1, 2]^T\\) corresponding to the eigenvalues \\(\\lambda_1 = 2\\) and \\(\\lambda_2 = 3\\), respectively. Find A.\n(i) \\(\\begin{bmatrix} 1 & -1 \\\\ 2 & 4 \\end{bmatrix}\\)\n(ii) \\(\\begin{bmatrix} 1 & 1 \\\\ 2 & 4 \\end{bmatrix}\\)\n(iii) \\(\\begin{bmatrix} 1 & 2 \\\\ -1 & 4 \\end{bmatrix}\\)",
    "options": [
      "(iii)",
      "(iv)",
      "(i)",
      "(ii)"
    ],
    "answer": "C",
    "answer_original": "C",
    "answer_status": "verified",
    "explanation": [
      "Theo định lý chéo hóa, \\(A = PDP^{-1}\\), trong đó ma trận các vectơ riêng là:",
      "\\[ P = \\begin{bmatrix} 1 & -1 \\\\ -1 & 2 \\end{bmatrix} \\]",
      "Định thức \\(\\det(P) = 1(2) - (-1)(-1) = 2 - 1 = 1\\).",
      "Ma trận nghịch đảo:",
      "\\[ P^{-1} = \\begin{bmatrix} 2 & 1 \\\\ 1 & 1 \\end{bmatrix} \\]",
      "Ma trận đường chéo chứa các giá trị riêng:",
      "\\[ D = \\begin{bmatrix} 2 & 0 \\\\ 0 & 3 \\end{bmatrix} \\]",
      "Thực hiện phép nhân ma trận:",
      "\\[ PD = \\begin{bmatrix} 1 & -1 \\\\ -1 & 2 \\end{bmatrix} \\begin{bmatrix} 2 & 0 \\\\ 0 & 3 \\end{bmatrix} = \\begin{bmatrix} 2 & -3 \\\\ -2 & 6 \\end{bmatrix} \\]",
      "\\[ A = (PD)P^{-1} = \\begin{bmatrix} 2 & -3 \\\\ -2 & 6 \\end{bmatrix} \\begin{bmatrix} 2 & 1 \\\\ 1 & 1 \\end{bmatrix} = \\begin{bmatrix} 4 - 3 & 2 - 3 \\\\ -4 + 6 & -2 + 6 \\end{bmatrix} = \\begin{bmatrix} 1 & -1 \\\\ 2 & 4 \\end{bmatrix} \\]",
      "Kết quả trùng khớp với (i) (Đáp án C)."
    ],
    "image": "assets/questions/0390_q390_Question_390.png",
    "needs_image": false,
    "confidence": "high",
    "review_flags": []
  },
  {
    "id": 391,
    "chapter": "GT1",
    "folder": "GT1",
    "topic": "DaoHam",
    "type": "single_choice",
    "question": "Find \\(dy/dx\\) by implicit differentiation \\(xy^2 = 4\\).",
    "options": [
      "None of the other choices is correct",
      "\\(-y/(2x)\\)",
      "\\(x/(2y)\\)",
      "\\(2x/y\\)",
      "\\(-2y/x\\)"
    ],
    "answer": "B",
    "answer_original": "B",
    "answer_status": "verified",
    "explanation": [
      "Lấy đạo hàm hai vế của phương trình \\(xy^2 = 4\\) theo biến \\(x\\):",
      "\\[ \\frac{d}{dx}(x) \\cdot y^2 + x \\cdot \\frac{d}{dx}(y^2) = 0 \\]",
      "\\[ 1 \\cdot y^2 + x \\cdot (2y y') = 0 \\]",
      "\\[ 2xy y' = -y^2 \\]",
      "Rút ra \\(y' = \\frac{dy}{dx}\\):",
      "\\[ y' = -\\frac{y^2}{2xy} = -\\frac{y}{2x} \\]",
      "Đáp án đúng là B."
    ],
    "image": "assets/questions/0391_q391_Question_391.png",
    "needs_image": false,
    "confidence": "high",
    "review_flags": []
  },
  {
    "id": 392,
    "chapter": "GT1",
    "folder": "GT1",
    "topic": "HamSo",
    "type": "single_choice",
    "question": "Let \\((L)\\) be the line passing through \\((2, -1)\\) with slope \\(\\frac{1}{2}\\). Which of the following point lies in \\((L)\\)?",
    "options": [
      "\\((-2, -3)\\)",
      "\\((-2, 0)\\)",
      "\\((2, 2)\\)",
      "\\((2, 4)\\)",
      "None of the other choices is correct"
    ],
    "answer": "A",
    "answer_original": "A",
    "answer_status": "verified",
    "explanation": [
      "Phương trình đường thẳng đi qua điểm \\((x_0, y_0) = (2, -1)\\) với hệ số góc \\(m = 1/2\\) là:",
      "\\[ y - y_0 = m(x - x_0) \\implies y - (-1) = \\frac{1}{2}(x - 2) \\implies y = \\frac{1}{2}x - 2 \\]",
      "Thử tọa độ các điểm đáp án:",
      "- Với điểm \\((-2, -3)\\): thay \\(x = -2\\) vào phương trình: \\(y = \\frac{1}{2}(-2) - 2 = -1 - 2 = -3\\) (Thỏa mãn).",
      "Vậy điểm \\((-2, -3)\\) nằm trên đường thẳng \\((L)\\) (Đáp án A)."
    ],
    "image": "assets/questions/0392_q392_Question_392.png",
    "needs_image": false,
    "confidence": "high",
    "review_flags": []
  },
  {
    "id": 393,
    "chapter": "DSTT1",
    "folder": "DSTT1",
    "topic": "MaTran",
    "type": "single_choice",
    "question": "Let \\(A, B\\) be \\(2 \\times 2\\) matrices with\n\\[ A^{-1} = \\begin{bmatrix} 1 & 3 \\\\ 2 & -1 \\end{bmatrix}, \\quad B^{-1} = \\begin{bmatrix} 2 & 0 \\\\ 1 & 3 \\end{bmatrix}. \\]\nFind the \\((1, 1)\\)-entry of the matrix \\((AB^T)^{-1}\\).",
    "options": [
      "4",
      "5",
      "None of the other choices is correct",
      "-2",
      "2"
    ],
    "answer": "A",
    "answer_original": "A",
    "answer_status": "verified",
    "explanation": [
      "Áp dụng tính chất nghịch đảo của tích ma trận:",
      "\\[ (AB^T)^{-1} = (B^T)^{-1} A^{-1} = (B^{-1})^T A^{-1} \\]",
      "Ta có chuyển vị của \\(B^{-1}\\):",
      "\\[ (B^{-1})^T = \\begin{bmatrix} 2 & 1 \\\\ 0 & 3 \\end{bmatrix} \\]",
      "Phần tử ở vị trí \\((1, 1)\\) của tích \\((B^{-1})^T A^{-1}\\) là tích vô hướng của hàng 1 của \\((B^{-1})^T\\) và cột 1 của \\(A^{-1}\\):",
      "\\[ ((AB^T)^{-1})_{11} = [2, 1] \\cdot \\begin{bmatrix} 1 \\\\ 2 \\end{bmatrix} = 2(1) + 1(2) = 4 \\]",
      "Đáp án đúng là A."
    ],
    "image": "assets/questions/0393_q393_Question_393.png",
    "needs_image": false,
    "confidence": "high",
    "review_flags": []
  },
  {
    "id": 394,
    "chapter": "DSTT1",
    "folder": "DSTT1",
    "topic": "AnhXaTuyenTinh",
    "type": "single_choice",
    "question": "Let T be projection on the line \\(y = x\\) followed by reflection in the x-axis in the xy-plane. Find the sum of all entries in the first row of the matrix of T.",
    "options": [
      "1",
      "0",
      "None of the other choices is correct",
      "-1",
      "2"
    ],
    "answer": "A",
    "answer_original": "A",
    "answer_status": "verified",
    "explanation": [
      "Phép chiếu vuông góc lên đường thẳng \\(y = x\\) có ma trận tiêu chuẩn là:",
      "\\[ P = \\begin{bmatrix} 1/2 & 1/2 \\\\ 1/2 & 1/2 \\end{bmatrix} \\]",
      "Phép đối xứng qua trục hoành (x-axis) biến \\((x, y) \\mapsto (x, -y)\\), có ma trận tiêu chuẩn là:",
      "\\[ R = \\begin{bmatrix} 1 & 0 \\\\ 0 & -1 \\end{bmatrix} \\]",
      "Biến đổi tuyến tính \\(T\\) thực hiện phép chiếu trước, sau đó đối xứng, nên ma trận của \\(T\\) là:",
      "\\[ [T] = RP = \\begin{bmatrix} 1 & 0 \\\\ 0 & -1 \\end{bmatrix} \\begin{bmatrix} 1/2 & 1/2 \\\\ 1/2 & 1/2 \\end{bmatrix} = \\begin{bmatrix} 1/2 & 1/2 \\\\ -1/2 & -1/2 \\end{bmatrix} \\]",
      "Hàng thứ nhất của ma trận là \\([1/2, 1/2]\\). Tổng các phần tử ở hàng thứ nhất là:",
      "\\[ \\frac{1}{2} + \\frac{1}{2} = 1 \\]",
      "Đáp án đúng là A."
    ],
    "image": "assets/questions/0394_q394_Question_394.png",
    "needs_image": false,
    "confidence": "high",
    "review_flags": []
  },
  {
    "id": 395,
    "chapter": "GT1",
    "folder": "GT1",
    "topic": "HamSo",
    "type": "single_choice",
    "question": "Find the function \\(f \\circ g(x)\\) for\n\\[ f(x) = \\sqrt{x + 2}, \\quad g(x) = x^2 + 4x + 5 \\]\n(i) \\(\\sqrt{x^2 + 4x + 7}\\)\n(ii) \\(\\sqrt{x^2 + 4x + 5}\\)\n(iii) \\(\\sqrt{x^2 + 4x + 2}\\)\n(iv) \\(\\sqrt{x^2 + 4x + 10}\\)",
    "options": [
      "(iii)",
      "None of them",
      "(ii)",
      "(iv)",
      "(i)"
    ],
    "answer": "E",
    "answer_original": "E",
    "answer_status": "verified",
    "explanation": [
      "Hàm hợp \\(f \\circ g(x) = f(g(x))\\) được xác định bằng cách thay \\(x\\) trong biểu thức của \\(f(x)\\) bởi \\(g(x)\\):",
      "\\[ f(g(x)) = \\sqrt{g(x) + 2} = \\sqrt{(x^2 + 4x + 5) + 2} = \\sqrt{x^2 + 4x + 7} \\]",
      "Biểu thức này tương ứng với (i) (Đáp án E)."
    ],
    "image": "assets/questions/0395_q395_Question_395.png",
    "needs_image": false,
    "confidence": "high",
    "review_flags": []
  },
  {
    "id": 396,
    "chapter": "GT1",
    "folder": "GT1",
    "topic": "GioiHan",
    "type": "single_choice",
    "question": "Find all the constant \\(c\\) that makes \\(g\\) DISCONTINUOUS at \\(x = 4\\)\n\\[ g(x) = \\begin{cases} x^2 + c^2 & \\text{if } x < 4 \\\\ cx + 13 & \\text{if } x \\ge 4 \\end{cases} \\]",
    "options": [
      "All c values, except \\(c = 1\\) and \\(c = 3\\)",
      "All c values, except \\(c = 1\\) and \\(c = 0\\)",
      "All c values, except \\(c = 4\\) and \\(c = 3\\)",
      "All c values, except \\(c = 1\\) and \\(c = 4\\)",
      "All c values, except \\(c = 0\\) and \\(c = 3\\)",
      "None of the other choices is correct"
    ],
    "answer": "A",
    "answer_original": "F",
    "answer_status": "conflict",
    "explanation": [
      "Hàm số \\(g(x)\\) liên tục tại \\(x = 4\\) khi và chỉ khi:",
      "\\[ \\lim_{x \\to 4^-} g(x) = \\lim_{x \\to 4^+} g(x) = g(4) \\]",
      "Ta có:",
      "- \\(\\lim_{x \\to 4^-} g(x) = 4^2 + c^2 = 16 + c^2\\)",
      "- \\(\\lim_{x \\to 4^+} g(x) = g(4) = 4c + 13\\)",
      "Điều kiện để hàm số LIÊN TỤC tại \\(x = 4\\) là:",
      "\\[ 16 + c^2 = 4c + 13 \\iff c^2 - 4c + 3 = 0 \\iff (c - 1)(c - 3) = 0 \\iff c = 1 \\text{ hoặc } c = 3 \\]",
      "Do đó, hàm số GIÁN ĐOẠN (DISCONTINUOUS) tại \\(x = 4\\) khi và chỉ khi \\(c\\) không thuộc tập \\(\\{1, 3\\}\\), tức là 'All c values, except \\(c = 1\\) and \\(c = 3\\)' (Đáp án A).",
      "Lưu ý đối chiếu: Ngân hàng câu hỏi gốc chọn F (\"None of the other choices is correct\") do người biên soạn nhầm lẫn câu hỏi tìm điểm liên tục và không chú ý đề bài hỏi tìm điểm GIÁN ĐOẠN. Đáp án chuẩn toán học chính xác là A."
    ],
    "image": "assets/questions/0396_q396_Question_396.png",
    "needs_image": false,
    "review_flags": [
      "answer_conflict"
    ],
    "confidence": "medium"
  },
  {
    "id": 397,
    "chapter": "GT1",
    "folder": "GT1",
    "topic": "TichPhan",
    "type": "single_choice",
    "question": "Find the average value of the function\n\\[ f(x) = 5 - x^2 \\]\nover interval \\([-4, 2]\\).",
    "options": [
      "\\(-7/3\\)",
      "\\(13/9\\)",
      "None of the other choices is correct",
      "\\(73/9\\)",
      "1"
    ],
    "answer": "E",
    "answer_original": "E",
    "answer_status": "verified",
    "explanation": [
      "Giá trị trung bình của hàm số \\(f(x)\\) trên đoạn \\([a, b] = [-4, 2]\\) là:",
      "\\[ f_{\\text{avg}} = \\frac{1}{b - a} \\int_a^b f(x)\\,dx = \\frac{1}{2 - (-4)} \\int_{-4}^2 (5 - x^2)\\,dx = \\frac{1}{6} \\int_{-4}^2 (5 - x^2)\\,dx \\]",
      "Tính tích phân xác định:",
      "\\[ \\int_{-4}^2 (5 - x^2)\\,dx = \\left[ 5x - \\frac{x^3}{3} \\right]_{-4}^2 \\]",
      "- Tại cận trên \\(x = 2\\): \\(5(2) - \\frac{8}{3} = 10 - \\frac{8}{3} = \\frac{22}{3}\\)",
      "- Tại cận dưới \\(x = -4\\): \\(5(-4) - \\frac{(-4)^3}{3} = -20 + \\frac{64}{3} = \\frac{4}{3}\\)",
      "Hiệu số hai cận:",
      "\\[ \\frac{22}{3} - \\frac{4}{3} = \\frac{18}{3} = 6 \\]",
      "Giá trị trung bình:",
      "\\[ f_{\\text{avg}} = \\frac{1}{6} \\times 6 = 1 \\]",
      "Đáp án đúng là E."
    ],
    "image": "assets/questions/0397_q397_Question_397.png",
    "needs_image": false,
    "confidence": "high",
    "review_flags": []
  },
  {
    "id": 398,
    "chapter": "DSTT1",
    "folder": "DSTT1",
    "topic": "DinhThuc",
    "type": "single_choice",
    "question": "Let A and B be square matrices of the same size. Which of the following statements are true?\n(i) \\(\\det(A + B) = \\det(A) + \\det(B)\\).\n(ii) If A is \\(2 \\times 2\\), then \\(\\det(5A) = 25 \\det(A)\\).",
    "options": [
      "(i) and (ii)",
      "(i)",
      "(ii)",
      "None of the other choices is correct"
    ],
    "answer": "C",
    "answer_original": "A",
    "answer_status": "conflict",
    "explanation": [
      "Xét mệnh đề (i): \\(\\det(A + B) = \\det(A) + \\det(B)\\).",
      "Mệnh đề này SAI vì định thức không có tính chất cộng tính. Phản ví dụ: Cho \\(A = \\begin{bmatrix} 1 & 0 \\\\ 0 & 0 \\end{bmatrix}\\) và \\(B = \\begin{bmatrix} 0 & 0 \\\\ 0 & 1 \\end{bmatrix}\\). Khi đó \\(\\det(A) = 0\\), \\(\\det(B) = 0\\), nhưng \\(A + B = I_2 \\implies \\det(A + B) = 1 \\ne 0 + 0 = 0\\).",
      "Xét mệnh đề (ii): Nếu A có kích thước \\(2 \\times 2\\), theo tính chất định thức: \\(\\det(cA) = c^n \\det(A)\\) với \\(n = 2\\), ta có \\(\\det(5A) = 5^2 \\det(A) = 25 \\det(A)\\). Mệnh đề này ĐÚNG.",
      "Do đó, chỉ có (ii) đúng (Đáp án C).",
      "Lưu ý đối chiếu: Ngân hàng câu hỏi gốc đánh dấu A (\"(i) and (ii)\") do người ra đề nhầm lẫn rằng định thức có tính chất cộng. Hệ thống ghi nhận đáp án toán học chính xác là C ((ii)) kèm cờ mâu thuẫn."
    ],
    "image": "assets/questions/0398_q398_Question_398.png",
    "needs_image": false,
    "review_flags": [
      "answer_conflict"
    ],
    "confidence": "medium"
  },
  {
    "id": 399,
    "chapter": "DSTT1",
    "folder": "DSTT1",
    "topic": "AnhXaTuyenTinh",
    "type": "single_choice",
    "question": "Let \\(T : \\mathbb{R}^2 \\to \\mathbb{R}^2\\) be a linear transformation such that \\(T(1, -1) = (0, 1)\\), \\(T(1, 1) = (1, 0)\\). Find \\(T(1, -7)\\).",
    "options": [
      "\\((-3, 4)\\)",
      "None of the other choices is correct",
      "\\((0, 7)\\)",
      "\\((4, 9)\\)",
      "\\((2, 5)\\)"
    ],
    "answer": "A",
    "answer_original": "A",
    "answer_status": "verified",
    "explanation": [
      "Biểu diễn vectơ \\((1, -7)\\) dưới dạng tổ hợp tuyến tính của \\((1, -1)\\) và \\((1, 1)\\):",
      "\\[ (1, -7) = c_1(1, -1) + c_2(1, 1) \\]",
      "Ta có hệ phương trình:",
      "\\[ \\begin{cases} c_1 + c_2 = 1 \\\\ -c_1 + c_2 = -7 \\end{cases} \\]",
      "Cộng hai phương trình lại: \\(2c_2 = -6 \\implies c_2 = -3\\).",
      "Suy ra \\(c_1 = 1 - c_2 = 1 - (-3) = 4\\).",
      "Do \\(T\\) là biến đổi tuyến tính, ta có:",
      "\\[ T(1, -7) = 4T(1, -1) - 3T(1, 1) = 4(0, 1) - 3(1, 0) = (0, 4) - (3, 0) = (-3, 4) \\]",
      "Đáp án đúng là A."
    ],
    "image": "assets/questions/0399_q399_Question_399.png",
    "needs_image": false,
    "confidence": "high",
    "review_flags": []
  },
  {
    "id": 400,
    "chapter": "GT1",
    "folder": "GT1",
    "topic": "TichPhan",
    "type": "single_choice",
    "question": "Evaluate the integral of\n\\[ f(x) = (x^2 + 1)e^{-x} \\]\non the interval \\([0, 1]\\).",
    "options": [
      "\\((2e + 5)/e\\)",
      "\\((5 - 2e)/e\\)",
      "\\(-(2e + 3)/e\\)",
      "\\((3e - 6)/e\\)"
    ],
    "answer": "D",
    "answer_original": "D",
    "answer_status": "verified",
    "explanation": [
      "Tính tích phân từng phần \\(\\int (x^2 + 1)e^{-x}\\,dx\\):",
      "Áp dụng phương pháp bảng hoặc từng phần lặp:",
      "- Đặt \\(u = x^2 + 1 \\implies u' = 2x \\implies u'' = 2 \\implies u''' = 0\\)",
      "- \\(dv = e^{-x}dx \\implies v = -e^{-x} \\implies \\int v = e^{-x} \\implies \\iint v = -e^{-x}\\)",
      "Nguyên hàm là:",
      "\\[ \\int (x^2 + 1)e^{-x}\\,dx = -(x^2 + 1)e^{-x} - 2xe^{-x} - 2e^{-x} + C = -(x^2 + 2x + 3)e^{-x} + C \\]",
      "Thay cận từ 0 đến 1:",
      "- Tại cận trên \\(x = 1\\): \\(-(1^2 + 2(1) + 3)e^{-1} = -6e^{-1} = -\\frac{6}{e}\\)",
      "- Tại cận dưới \\(x = 0\\): \\(-(0 + 0 + 3)e^0 = -3\\)",
      "Giá trị tích phân là:",
      "\\[ \\left[ -(x^2 + 2x + 3)e^{-x} \\right]_0^1 = -\\frac{6}{e} - (-3) = 3 - \\frac{6}{e} = \\frac{3e - 6}{e} \\]",
      "Đáp án đúng là D."
    ],
    "image": "assets/questions/0400_q400_Question_400.png",
    "needs_image": false,
    "confidence": "high",
    "review_flags": []
  }
];
const outputPath = path.join(__dirname, '..', 'data', 'v2', 'batches', 'batch_10.json');
fs.writeFileSync(outputPath, JSON.stringify(batch10, null, 2), 'utf8');
console.log(Successfully written  questions to );
