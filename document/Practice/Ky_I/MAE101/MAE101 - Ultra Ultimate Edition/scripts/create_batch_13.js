const fs = require('fs');
const path = require('path');

const batch13 = [
  {
    id: 481,
    chapter: "DSTT1",
    folder: "DSTT1",
    topic: "KhongGianVector",
    type: "single_choice",
    question: "Let \\(U\\) be a subspace of \\(\\mathbb{R}^4\\) and\n\\[ \\{F_1 = [1\\quad 0\\quad 1\\quad 1]^T, F_2 = [-2\\quad 1\\quad 2\\quad 0]^T\\} \\]\nan orthogonal basis of \\(U\\). Let \\(X = [19\\quad -7\\quad -9\\quad 5]^T\\) in \\(U\\).\nWrite \\(X = aF_1 + bF_2\\). Find \\(a + b\\).",
    options: [
      "1",
      "2",
      "0",
      "-1",
      "None of the other choices is correct"
    ],
    answer: "E",
    answer_original: "E",
    answer_status: "verified",
    explanation: [
      "Biểu diễn vector \\(X\\) dưới dạng tổ hợp tuyến tính của cơ sở trực giao \\(\\{F_1, F_2\\}\\):",
      "\\[ X = aF_1 + bF_2 \\]",
      "\\[ \\begin{bmatrix} 19 \\\\ -7 \\\\ -9 \\\\ 5 \\end{bmatrix} = a \\begin{bmatrix} 1 \\\\ 0 \\\\ 1 \\\\ 1 \\end{bmatrix} + b \\begin{bmatrix} -2 \\\\ 1 \\\\ 2 \\\\ 0 \\end{bmatrix} \\]",
      "Xét các thành phần tọa độ:",
      "- Thành phần thứ 2: \\(a(0) + b(1) = -7 \\implies b = -7\\).",
      "- Thành phần thứ 4: \\(a(1) + b(0) = 5 \\implies a = 5\\).",
      "Kiểm tra lại với các thành phần còn lại:",
      "- Thành phần 1: \\(a(1) + b(-2) = 5(1) + (-7)(-2) = 5 + 14 = 19\\) (thỏa mãn).",
      "- Thành phần 3: \\(a(1) + b(2) = 5(1) + (-7)(2) = 5 - 14 = -9\\) (thỏa mãn).",
      "Do đó hệ số là \\(a = 5\\) và \\(b = -7\\).",
      "Tổng cần tìm:",
      "\\[ a + b = 5 + (-7) = -2 \\]",
      "Vì giá trị \\(-2\\) không trùng với các phương án A (1), B (2), C (0), D (-1), đáp án đúng là E ('None of the other choices is correct')."
    ],
    image: "assets/questions/0481_q481_Question_481.png",
    needs_image: false,
    confidence: "high",
    review_flags: []
  },
  {
    id: 482,
    chapter: "GT1",
    folder: "GT1",
    topic: "HamSo",
    type: "single_choice",
    question: "Describe how the graph of \\(y = -f(x) + 3\\) is obtained from graph of \\(y = f(x)\\).",
    options: [
      "Reflect about the x-axis, and then shift 3 units upward",
      "Reflect about the y-axis, and then shift 3 units upward",
      "Reflect about the x-axis, and then shift 3 units downward",
      "Reflect about the y-axis, and then shift 3 units downward",
      "None of the other choices is correct"
    ],
    answer: "A",
    answer_original: "A",
    answer_status: "verified",
    explanation: [
      "Phép biến đổi đồ thị từ \\(y = f(x)\\) sang \\(y = -f(x) + 3\\) gồm hai bước liên tiếp:",
      "1) Biến đổi \\(y = f(x) \\to y = -f(x)\\): Lấy đối xứng đồ thị qua trục hoành (Reflect about the x-axis).",
      "2) Biến đổi \\(y = -f(x) \\to y = -f(x) + 3\\): Dịch chuyển đồ thị lên trên 3 đơn vị (Shift 3 units upward).",
      "Vậy thứ tự thực hiện là: 'Reflect about the x-axis, and then shift 3 units upward'.",
      "Đáp án đúng là A."
    ],
    image: "assets/questions/0482_q482_Question_482.png",
    needs_image: false,
    confidence: "high",
    review_flags: []
  },
  {
    id: 483,
    chapter: "GT1",
    folder: "GT1",
    topic: "TichPhan",
    type: "single_choice",
    question: "Evaluate\n\\[ \\int 10(2x + 5)^4\\,dx \\]\n(i) \\((2x + 5)^5 + C\\)\n(ii) \\(5(2x + 5)^5 + C\\)\n(iii) \\(2(2x + 5)^5 + C\\)",
    options: [
      "(i)",
      "(iii)",
      "(ii)",
      "None of them"
    ],
    answer: "A",
    answer_original: "A",
    answer_status: "verified",
    explanation: [
      "Sử dụng phương pháp đổi biến số:",
      "Đặt \\(u = 2x + 5 \\implies du = 2\\,dx\\).",
      "Biến đổi biểu thức tích phân:",
      "\\[ \\int 10(2x + 5)^4\\,dx = \\int 5(2x + 5)^4 \\cdot (2\\,dx) = 5 \\int u^4\\,du \\]",
      "\\[ = 5 \\cdot \\frac{u^5}{5} + C = u^5 + C = (2x + 5)^5 + C \\]",
      "Kết quả trùng khớp với (i), tương ứng với lựa chọn A."
    ],
    image: "assets/questions/0483_q483_Question_483.png",
    needs_image: false,
    confidence: "high",
    review_flags: []
  },
  {
    id: 484,
    chapter: "DSTT1",
    folder: "DSTT1",
    topic: "DinhThuc",
    type: "single_choice",
    question: "If \\(A\\) is \\(3 \\times 3\\) and \\(\\det(2A^{-1}) = -4\\), then \\(\\det A\\) is...",
    options: [
      "1/2",
      "-2",
      "-1/2",
      "2",
      "None of the others."
    ],
    answer: "B",
    answer_original: "B",
    answer_status: "verified",
    explanation: [
      "Vì ma trận \\(A\\) có kích thước \\(3 \\times 3\\), áp dụng các tính chất của định thức:",
      "1) \\(\\det(kM) = k^n \\det(M) \\implies \\det(2A^{-1}) = 2^3 \\det(A^{-1}) = 8 \\det(A^{-1})\\).",
      "2) \\(\\det(A^{-1}) = \\frac{1}{\\det(A)}\\).",
      "Do đó:",
      "\\[ \\det(2A^{-1}) = \\frac{8}{\\det(A)} = -4 \\]",
      "\\[ \\det(A) = \\frac{8}{-4} = -2 \\]",
      "Đáp án đúng là B."
    ],
    image: "assets/questions/0484_q484_Question_484.png",
    needs_image: false,
    confidence: "high",
    review_flags: []
  },
  {
    id: 485,
    chapter: "GT1",
    folder: "GT1",
    topic: "CucTri",
    type: "single_choice",
    question: "Find the critical numbers of the function \\(y = x^2 e^{x - 1}\\).",
    options: [
      "0; 1",
      "-2; 0",
      "0; 2",
      "None of the other choices is correct",
      "-2; 1"
    ],
    answer: "B",
    answer_original: "B",
    answer_status: "verified",
    explanation: [
      "Tính đạo hàm bậc nhất theo quy tắc nhân đạo hàm:",
      "\\[ y' = \\frac{d}{dx}(x^2) \\cdot e^{x - 1} + x^2 \\cdot \\frac{d}{dx}(e^{x - 1}) = 2x e^{x - 1} + x^2 e^{x - 1} \\]",
      "\\[ = (x^2 + 2x)e^{x - 1} = x(x + 2)e^{x - 1} \\]",
      "Điểm tới hạn (critical numbers) là các điểm tại đó đạo hàm bằng 0 hoặc không xác định.",
      "Vì \\(e^{x - 1} > 0\\) với mọi \\(x\\):",
      "\\[ y' = 0 \\iff x(x + 2) = 0 \\iff x = 0 \\quad \\text{hoặc} \\quad x = -2 \\]",
      "Vậy các điểm tới hạn là \\(-2\\) và \\(0\\).",
      "Đáp án đúng là B."
    ],
    image: "assets/questions/0485_q485_Question_485.png",
    needs_image: false,
    confidence: "high",
    review_flags: []
  },
  {
    id: 486,
    chapter: "GT1",
    folder: "GT1",
    topic: "DaoHam",
    type: "single_choice",
    question: "Find \\(dy/dx\\) by implicit differentiation\n\\[ x^3 + y^3 = 8 \\]\n(i) \\(x^2/y^2\\)\n(ii) \\(-x^2/y^2\\)\n(iii) \\(y^2/x^2\\)\n(iv) \\(-y^2/x^2\\)",
    options: [
      "(iii)",
      "(iv)",
      "(i)",
      "(ii)",
      "None of the other choices is correct"
    ],
    answer: "D",
    answer_original: "D",
    answer_status: "verified",
    explanation: [
      "Lấy đạo hàm hai vế theo biến \\(x\\) (đạo hàm ẩn):",
      "\\[ \\frac{d}{dx}(x^3) + \\frac{d}{dx}(y^3) = \\frac{d}{dx}(8) \\]",
      "\\[ 3x^2 + 3y^2 \\cdot \\frac{dy}{dx} = 0 \\]",
      "\\[ 3y^2 \\frac{dy}{dx} = -3x^2 \\implies \\frac{dy}{dx} = -\\frac{x^2}{y^2} \\]",
      "Biểu thức trùng khớp với (ii), tương ứng với lựa chọn D."
    ],
    image: "assets/questions/0486_q486_Question_486.png",
    needs_image: false,
    confidence: "high",
    review_flags: []
  },
  {
    id: 487,
    chapter: "GT1",
    folder: "GT1",
    topic: "DaoHam",
    type: "single_choice",
    question: "The position of a body moving on a coordinate line is given by \\(s = t^2 - 6t + 6\\), with \\(s\\) in meters and \\(t\\) in seconds. When, if ever, during the interval \\(0 \\le t \\le 6\\) does the body change direction?",
    options: [
      "t = 3 sec",
      "t = 12 sec",
      "t = 6 sec",
      "None of the other choices is correct",
      "no change in direction"
    ],
    answer: "A",
    answer_original: "A",
    answer_status: "verified",
    explanation: [
      "Vận tốc của vật là đạo hàm của phương trình chuyển động:",
      "\\[ v(t) = s'(t) = 2t - 6 \\]",
      "Vật đổi chiều chuyển động khi vận tốc bằng 0 và đổi dấu:",
      "\\[ v(t) = 0 \\iff 2t - 6 = 0 \\iff t = 3\\text{ sec} \\]",
      "Xét dấu vận tốc:",
      "- Với \\(0 \\le t < 3\\): \\(v(t) < 0\\) (vật di chuyển theo chiều âm).",
      "- Với \\(3 < t \\le 6\\): \\(v(t) > 0\\) (vật di chuyển theo chiều dương).",
      "Vì thời điểm \\(t = 3\\) nằm trong khoảng đang xét \\((0, 6)\\) và vận tốc đổi dấu qua điểm đó, vật đổi chiều chuyển động tại \\(t = 3\\text{ sec}\\).",
      "Đáp án đúng là A."
    ],
    image: "assets/questions/0487_q487_Question_487.png",
    needs_image: false,
    confidence: "high",
    review_flags: []
  },
  {
    id: 488,
    chapter: "GT1",
    folder: "GT1",
    topic: "GioiHan",
    type: "single_choice",
    question: "For the function whose graph is given below, find \\(\\lim_{x \\to -1} f(x)\\).\n(i) 2\n(ii) \\(-\\infty\\)\n(iii) -2\n(iv) \\(\\infty\\)",
    options: [
      "(ii)",
      "(i)",
      "(iv)",
      "(iii)"
    ],
    answer: "C",
    answer_original: "C",
    answer_status: "verified",
    explanation: [
      "Quan sát đồ thị hàm số tại lân cận điểm \\(x = -1\\):",
      "- Khi \\(x\\) tiến dần về \\(-1\\) từ phía bên trái (\\(x \\to -1^-\\)), nhánh đồ thị đi lên vô hạn (tiến tới \\(+\\infty\\)).",
      "- Khi \\(x\\) tiến dần về \\(-1\\) từ phía bên phải (\\(x \\to -1^+\\)), nhánh đồ thị cũng đi lên vô hạn (tiến tới \\(+\\infty\\)).",
      "Vì giới hạn một bên ở cả hai phía đều tiến tới \\(+\\infty\\), ta kết luận:",
      "\\[ \\lim_{x \\to -1} f(x) = \\infty \\]",
      "Khẳng định (iv) đúng, tương ứng với lựa chọn C."
    ],
    image: "assets/questions/0488_q488_Question_488.webp",
    needs_image: true,
    confidence: "high",
    review_flags: []
  },
  {
    id: 489,
    chapter: "GT1",
    folder: "GT1",
    topic: "GioiHan",
    type: "single_choice",
    question: "For the function whose graph is given below, find \\(\\lim_{x \\to -1} f(x)\\).\n(i) 2\n(ii) \\(-\\infty\\)\n(iii) -2\n(iv) \\(\\infty\\)",
    options: [
      "(ii)",
      "(i)",
      "(iv)",
      "(iii)"
    ],
    answer: "C",
    answer_original: "C",
    answer_status: "verified",
    explanation: [
      "Lưu ý: Ảnh chụp `0489_q489_Question_489.webp` là ảnh chụp cùng một câu hỏi trắc nghiệm (Q: 12) với `0488` nhưng khung xem bị cuộn xuống một phần khiến dòng chữ đề bài bị ẩn một phần bên trên.",
      "Đối chiếu đồ thị và các phương án cho thấy đây là câu hỏi tìm \\(\\lim_{x \\to -1} f(x)\\).",
      "Tại đường tiệm cận đứng \\(x = -1\\), cả hai nhánh đồ thị (từ trái và từ phải) đều tiến tới \\(+\\infty\\):",
      "\\[ \\lim_{x \\to -1} f(x) = \\infty \\]",
      "Khẳng định (iv) đúng, tương ứng với lựa chọn C."
    ],
    image: "assets/questions/0489_q489_Question_489.webp",
    needs_image: true,
    confidence: "high",
    review_flags: [
      "prompt_anomaly"
    ]
  },
  {
    id: 490,
    chapter: "GT1",
    folder: "GT1",
    topic: "PhuongPhapSo",
    type: "single_choice",
    question: "Use the Trapezoidal Rule with \\(n = 5\\) to approximate the integral\n\\[ \\int_1^6 f(x)\\,dx \\]\nBảng số liệu:\n\\[ \\begin{array}{|c|c|c|c|c|c|c|} \\hline x & 1 & 2 & 3 & 4 & 5 & 6 \\\\ \\hline f(x) & 3.2 & 1.6 & 2.4 & 3.8 & 4.4 & 1.3 \\\\ \\hline \\end{array} \\]",
    options: [
      "31.1",
      "None of the other choices is correct",
      "15.55",
      "14.45",
      "28.90"
    ],
    answer: "D",
    answer_original: "D",
    answer_status: "verified",
    explanation: [
      "Khoảng cách giữa các điểm chia: \\(\\Delta x = \\frac{b - a}{n} = \\frac{6 - 1}{5} = 1\\).",
      "Áp dụng công thức quy tắc hình thang (Trapezoidal Rule) với \\(n = 5\\):",
      "\\[ T_5 = \\frac{\\Delta x}{2} [f(x_0) + 2f(x_1) + 2f(x_2) + 2f(x_3) + 2f(x_4) + f(x_5)] \\]",
      "Thay các giá trị tương ứng từ bảng số liệu:",
      "\\[ T_5 = \\frac{1}{2} [3.2 + 2(1.6) + 2(2.4) + 2(3.8) + 2(4.4) + 1.3] \\]",
      "\\[ = \\frac{1}{2} [3.2 + 3.2 + 4.8 + 7.6 + 8.8 + 1.3] = \\frac{1}{2} [28.9] = 14.45 \\]",
      "Đáp án đúng là D."
    ],
    image: "assets/questions/0490_q490_Question_490.png",
    needs_image: false,
    confidence: "high",
    review_flags: []
  },
  {
    id: 491,
    chapter: "GT1",
    folder: "GT1",
    topic: "PhuongPhapSo",
    type: "single_choice",
    question: "Use Newton's method with the specified initial approximation \\(x_1 = 1\\) to find \\(x_3\\) of the following equation\n\\[ \\tan x = x^2 \\]",
    options: [
      "None of the other choices is correct",
      "0.5171",
      "0.6090",
      "-0.2131",
      "-0.6076"
    ],
    answer: "E",
    answer_original: "E",
    answer_status: "verified",
    explanation: [
      "Xét hàm số: \\(f(x) = \\tan x - x^2 = 0\\).",
      "Đạo hàm: \\(f'(x) = \\sec^2 x - 2x = 1 + \\tan^2 x - 2x\\).",
      "Công thức lặp Newton: \\(x_{n+1} = x_n - \\frac{f(x_n)}{f'(x_n)}\\).",
      "Bước 1: Với giá trị khởi tạo \\(x_1 = 1\\) (tính theo radian):",
      "- \\(f(1) = \\tan(1) - 1^2 \\approx 1.557408 - 1 = 0.557408\\).",
      "- \\(f'(1) = 1 + \\tan^2(1) - 2(1) = 1 + 2.425519 - 2 = 1.425519\\).",
      "- \\(x_2 = 1 - \\frac{0.557408}{1.425519} \\approx 0.608979 \\approx 0.6090\\).",
      "Bước 2: Với \\(x_2 \\approx 0.608979\\):",
      "- \\(f(x_2) = \\tan(0.608979) - (0.608979)^2 \\approx 0.698058 - 0.370855 = 0.327203\\).",
      "- \\(f'(x_2) = 1 + \\tan^2(0.608979) - 2(0.608979) \\approx 1 + 0.487285 - 1.217958 = 0.269327\\).",
      "- \\(x_3 = 0.608979 - \\frac{0.327203}{0.269327} \\approx 0.608979 - 1.214890 = -0.605911 \\approx -0.6076\\).",
      "(Sử dụng giá trị chính xác không làm tròn giữa chừng: \\(x_3 = -0.607615\\)).",
      "Đáp án đúng là E (-0.6076)."
    ],
    image: "assets/questions/0491_q491_Question_491.png",
    needs_image: false,
    confidence: "high",
    review_flags: []
  },
  {
    id: 492,
    chapter: "DSTT1",
    folder: "DSTT1",
    topic: "MaTran",
    type: "single_choice",
    question: "Let \\(A\\) be a \\(3 \\times 3\\) matrix. Assume that \\(\\operatorname{rank}(A) = 3\\). What is the reduced row-echelon form of \\(A\\)?",
    options: [
      "The identity matrix",
      "None of the other choices is correct",
      "It does not have a reduced row-echelon form",
      "There is not enough information",
      "The zero matrix"
    ],
    answer: "A",
    answer_original: "A",
    answer_status: "verified",
    explanation: [
      "Theo định lý cơ bản của đại số tuyến tính về ma trận vuông khả nghịch:",
      "Một ma trận vuông \\(A\\) cấp \\(n \\times n\\) có \\(\\operatorname{rank}(A) = n\\) khi và chỉ khi nó có đầy đủ \\(n\\) vị trí cơ sở (pivot positions).",
      "Khi thực hiện các phép khử Gauss-Jordan để đưa \\(A\\) về dạng bậc thang thu gọn (Reduced Row-Echelon Form - RREF), mỗi dòng và mỗi cột đều chứa một phần tử cơ sở bằng 1 và tất cả các phần tử khác trong cột đều bằng 0.",
      "Ma trận duy nhất cấp \\(3 \\times 3\\) thỏa mãn điều kiện này là ma trận đơn vị \\(I_3\\) (The identity matrix).",
      "Đáp án đúng là A."
    ],
    image: "assets/questions/0492_q492_Question_492.png",
    needs_image: false,
    confidence: "high",
    review_flags: []
  },
  {
    id: 493,
    chapter: "GT1",
    folder: "GT1",
    topic: "DaoHam",
    type: "single_choice",
    question: "A cube's edge of length \\(s\\) is growing according to the equation \\(s = 2t^2 + 1\\), where \\(t\\) is measured in seconds and \\(s\\) is measured in meters. How fast (in \\(\\text{m}^2/\\text{s}\\)) is the cube's surface area increasing at the time when \\(t = 1\\text{ (s)}\\)?",
    options: [
      "145",
      "143",
      "142",
      "None of the other choices is correct",
      "144",
      "141"
    ],
    answer: "E",
    answer_original: "E",
    answer_status: "verified",
    explanation: [
      "Hình lập phương có 6 mặt bằng nhau, mỗi mặt là hình vuông cạnh \\(s\\).",
      "Tổng diện tích toàn phần của hình lập phương là:",
      "\\[ A = 6s^2 \\]",
      "Lấy đạo hàm hai vế theo thời gian \\(t\\) bằng quy tắc chuỗi:",
      "\\[ \\frac{dA}{dt} = 12s \\cdot \\frac{ds}{dt} \\]",
      "Từ phương trình cạnh \\(s(t) = 2t^2 + 1\\), ta có \\(\\frac{ds}{dt} = 4t\\).",
      "Tại thời điểm \\(t = 1\\text{ s}\\):",
      "- Cạnh: \\(s(1) = 2(1)^2 + 1 = 3\\text{ m}\\).",
      "- Tốc độ tăng cạnh: \\(\\frac{ds}{dt}(1) = 4(1) = 4\\text{ m/s}\\).",
      "Thay vào công thức tốc độ tăng diện tích:",
      "\\[ \\frac{dA}{dt} = 12(3)(4) = 144\\text{ m}^2/\\text{s} \\]",
      "Đáp án đúng là E."
    ],
    image: "assets/questions/0493_q493_Question_493.png",
    needs_image: false,
    confidence: "high",
    review_flags: []
  },
  {
    id: 494,
    chapter: "DSTT1",
    folder: "DSTT1",
    topic: "MaTran",
    type: "single_choice",
    question: "Let \\(A\\) be a square matrix of size \\(3 \\times 3\\), and \\(X\\) is a column vector of size \\(3 \\times 1\\). Which statements are true?\n(i) If \\(AX = 0\\) and \\(X \\ne 0\\) then \\(A = 0\\)\n(ii) If \\(AX = 0\\) has only the trivial solution \\(X = 0\\), then \\(AX = B\\) has a unique solution for every column vector \\(B\\) of size \\(3 \\times 1\\).",
    options: [
      "Only (i)",
      "Both (i) and (ii)",
      "Only (ii)",
      "None of the other choices is correct"
    ],
    answer: "C",
    answer_original: "C",
    answer_status: "verified",
    explanation: [
      "Xét từng mệnh đề:",
      "1) Mệnh đề (i): 'Nếu \\(AX = 0\\) và \\(X \\ne 0\\) thì \\(A = 0\\)'. Mệnh đề này SAI. Bất kỳ ma trận suy biến (không khả nghịch) khác không nào cũng có vector nghiệm không tầm thường, ví dụ \\(A = \\begin{bmatrix} 1 & 0 & 0 \\\\ 0 & 0 & 0 \\\\ 0 & 0 & 0 \\end{bmatrix} \\ne 0\\) nhưng với \\(X = [0, 1, 0]^T \\ne 0\\) thì \\(AX = 0\\).",
      "2) Mệnh đề (ii): 'Nếu \\(AX = 0\\) chỉ có nghiệm tầm thường \\(X = 0\\), thì \\(AX = B\\) có nghiệm duy nhất với mọi vector cột \\(B\\) cỡ \\(3 \\times 1\\)'. Mệnh đề này ĐÚNG theo Định lý Ma trận Khả nghịch (Invertible Matrix Theorem): Hệ thuần nhất chỉ có nghiệm tầm thường \\(\\iff A\\) khả nghịch \\(\\iff AX = B\\) có nghiệm duy nhất \\(X = A^{-1}B\\) với mọi \\(B\\).",
      "Vậy chỉ có mệnh đề (ii) đúng (Đáp án C)."
    ],
    image: "assets/questions/0494_q494_Question_494.png",
    needs_image: false,
    confidence: "high",
    review_flags: []
  },
  {
    id: 495,
    chapter: "DSTT1",
    folder: "DSTT1",
    topic: "HePhuongTrinh",
    type: "single_choice",
    question: "The echelon form of the augmented matrix of a system of linear equations has the following form\n\\[ \\begin{bmatrix} 1 & * & * & * & | & * \\\\ 0 & 1 & * & * & | & * \\\\ 0 & 0 & 0 & 1 & | & * \\\\ 0 & 0 & 0 & 0 & | & * \\end{bmatrix} \\]\nwhere \\((*)\\) denotes any real number. What can you say about the number of the solutions of this system?",
    options: [
      "Not enough information",
      "This system has a unique solution",
      "This system has no solution",
      "This system has infinitely many solutions"
    ],
    answer: "A",
    answer_original: "D",
    answer_status: "conflict",
    explanation: [
      "Xét dòng cuối cùng (dòng 4) của ma trận bổ sung:",
      "\\[ [0\\quad 0\\quad 0\\quad 0\\quad |\\quad *] \\]",
      "Ký hiệu \\((*)\\) đại diện cho một số thực bất kỳ:",
      "1) Nếu phần tử \\((*)\\) ở cột bổ sung của dòng 4 là một số khác 0 (ví dụ \\(c \\ne 0\\)), dòng này trở thành \\(0x_1 + 0x_2 + 0x_3 + 0x_4 = c\\), dẫn đến hệ phương trình VÔ NGHIỆM (inconsistent).",
      "2) Nếu phần tử \\((*)\\) ở dòng 4 bằng 0, hệ phương trình tương thích. Khi đó hệ có 4 ẩn, 3 vị trí cơ sở (ở cột 1, 2, 4), cột 3 là biến tự do, dẫn đến hệ có VÔ SỐ NGHIỆM.",
      "Vì đề bài chỉ cho biết \\((*)\\) là một số thực bất kỳ mà không nêu rõ phần tử ở dòng 4 bằng 0 hay khác 0, ta KHÔNG THỂ kết luận chắc chắn hệ có vô số nghiệm hay vô nghiệm.",
      "Do đó, đáp án toán học chính xác là A ('Not enough information').",
      "Ngân hàng đề chọn D ('infinitely many solutions') do tác giả ngầm giả định hệ tương thích hoặc nhầm phần tử bổ sung dòng 4 là số 0."
    ],
    image: "assets/questions/0495_q495_Question_495.png",
    needs_image: false,
    confidence: "high",
    review_flags: [
      "answer_conflict"
    ]
  },
  {
    id: 496,
    chapter: "DSTT1",
    folder: "DSTT1",
    topic: "VectorHinhHoc",
    type: "single_choice",
    question: "Find the parametric equation of the line through the point \\(A(1, 1, 0)\\) and perpendicular to the vectors \\(\\mathbf{u} = [1, 1, 1]\\), \\(\\mathbf{v} = [2, 1, 3]\\).",
    options: [
      "x = 1 + 2t, y = 1 - t, z = -t",
      "x = 1 + 2t, y = 1 - t, z = t",
      "x = 1 + 2t, y = 1 + t, z = -t",
      "x = 1 + 2t, y = 1 + t, z = t",
      "None of the other choices is correct"
    ],
    answer: "A",
    answer_original: "A",
    answer_status: "verified",
    explanation: [
      "Đường thẳng cần tìm vuông góc với cả hai vector \\(\\mathbf{u}\\) và \\(\\mathbf{v}\\), nên nhận tích có hướng \\(\\mathbf{u} \\times \\mathbf{v}\\) làm vector chỉ phương:",
      "\\[ \\mathbf{d} = \\mathbf{u} \\times \\mathbf{v} = \\begin{vmatrix} \\mathbf{i} & \\mathbf{j} & \\mathbf{k} \\\\ 1 & 1 & 1 \\\\ 2 & 1 & 3 \\end{vmatrix} \\]",
      "\\[ = \\mathbf{i}(1 \\cdot 3 - 1 \\cdot 1) - \\mathbf{j}(1 \\cdot 3 - 1 \\cdot 2) + \\mathbf{k}(1 \\cdot 1 - 1 \\cdot 2) = 2\\mathbf{i} - 1\\mathbf{j} - 1\\mathbf{k} = (2, -1, -1) \\]",
      "Đường thẳng đi qua điểm \\(A(1, 1, 0)\\) với vector chỉ phương \\(\\mathbf{d} = (2, -1, -1)\\) có phương trình tham số:",
      "\\[ \\begin{cases} x = 1 + 2t \\\\ y = 1 - t \\\\ z = 0 - t = -t \\end{cases} \\]",
      "Đáp án đúng là A."
    ],
    image: "assets/questions/0496_q496_Question_496.png",
    needs_image: false,
    confidence: "high",
    review_flags: []
  },
  {
    id: 497,
    chapter: "DSTT1",
    folder: "DSTT1",
    topic: "MaTran",
    type: "single_choice",
    question: "Let \\(A = \\begin{pmatrix} 1 & 0 & 2 \\\\ 3 & 2 & -1 \\end{pmatrix}\\), \\(B = \\begin{pmatrix} 1 & 1 \\\\ 2 & -1 \\\\ 3 & 0 \\end{pmatrix}\\). Find \\(B - 2A^T\\).\n(i) \\(\\begin{pmatrix} -1 & 5 \\\\ 2 & -5 \\\\ -1 & 2 \\end{pmatrix}\\)\n(ii) \\(\\begin{pmatrix} -1 & 5 \\\\ 2 & -5 \\\\ 1 & 2 \\end{pmatrix}\\)\n(iii) \\(\\begin{pmatrix} -1 & -5 \\\\ 2 & -5 \\\\ -1 & 2 \\end{pmatrix}\\)",
    options: [
      "(i)",
      "None of the other choices is correct",
      "(iii)",
      "(ii)"
    ],
    answer: "C",
    answer_original: "C",
    answer_status: "verified",
    explanation: [
      "Tìm ma trận chuyển vị \\(A^T\\) của ma trận \\(A\\) cỡ \\(2 \\times 3\\):",
      "\\[ A^T = \\begin{pmatrix} 1 & 3 \\\\ 0 & 2 \\\\ 2 & -1 \\end{pmatrix} \\]",
      "Nhân vô hướng với 2:",
      "\\[ 2A^T = \\begin{pmatrix} 2 & 6 \\\\ 0 & 4 \\\\ 4 & -2 \\end{pmatrix} \\]",
      "Thực hiện phép trừ ma trận \\(B - 2A^T\\):",
      "\\[ B - 2A^T = \\begin{pmatrix} 1 & 1 \\\\ 2 & -1 \\\\ 3 & 0 \\end{pmatrix} - \\begin{pmatrix} 2 & 6 \\\\ 0 & 4 \\\\ 4 & -2 \\end{pmatrix} = \\begin{pmatrix} 1 - 2 & 1 - 6 \\\\ 2 - 0 & -1 - 4 \\\\ 3 - 4 & 0 - (-2) \\end{pmatrix} = \\begin{pmatrix} -1 & -5 \\\\ 2 & -5 \\\\ -1 & 2 \\end{pmatrix} \\]",
      "Kết quả trùng khớp với (iii), tương ứng với lựa chọn C."
    ],
    image: "assets/questions/0497_q497_Question_497.png",
    needs_image: false,
    confidence: "high",
    review_flags: []
  },
  {
    id: 498,
    chapter: "GT1",
    folder: "GT1",
    topic: "TichPhan",
    type: "single_choice",
    question: "The average value of \\(f(x) = x^2 + x\\) over the interval \\([0, a]\\) is \\(-\\frac{1}{6}\\). Find the number \\(a\\).",
    options: [
      "-0.5",
      "-0.5 and -1",
      "-1",
      "None of the other choices is corect"
    ],
    answer: "B",
    answer_original: "B",
    answer_status: "verified",
    explanation: [
      "Công thức giá trị trung bình của hàm số trên đoạn \\([0, a]\\):",
      "\\[ f_{\\text{avg}} = \\frac{1}{a - 0} \\int_0^a (x^2 + x)\\,dx = \\frac{1}{a} \\left[ \\frac{x^3}{3} + \\frac{x^2}{2} \\right]_0^a = \\frac{1}{a} \\left( \\frac{a^3}{3} + \\frac{a^2}{2} \\right) = \\frac{a^2}{3} + \\frac{a}{2} \\]",
      "Theo giả thiết bài toán:",
      "\\[ \\frac{a^2}{3} + \\frac{a}{2} = -\\frac{1}{6} \\]",
      "Nhân cả hai vế với 6:",
      "\\[ 2a^2 + 3a = -1 \\iff 2a^2 + 3a + 1 = 0 \\]",
      "Giải phương trình bậc hai:",
      "\\[ (2a + 1)(a + 1) = 0 \\implies a = -\\frac{1}{2} = -0.5 \\quad \\text{hoặc} \\quad a = -1 \\]",
      "Cả hai giá trị đều thỏa mãn phương trình.",
      "Đáp án đúng là B (-0.5 and -1)."
    ],
    image: "assets/questions/0498_q498_Question_498.png",
    needs_image: false,
    confidence: "high",
    review_flags: []
  },
  {
    id: 499,
    chapter: "GT1",
    folder: "GT1",
    topic: "CucTri",
    type: "single_choice",
    question: "Determine where the given function is increasing and where it is decreasing\n\\[ f(x) = -4x^2 - 2x - 12 \\]\n(i) Increasing on \\((-\\infty, -1/4)\\), decreasing on \\((-1/4, \\infty)\\)\n(ii) Decreasing on \\((-\\infty, -1/4)\\), increasing on \\((-1/4, \\infty)\\)\n(iii) Decreasing on \\((-\\infty, 1/4)\\), increasing on \\((1/4, \\infty)\\)\n(iv) Increasing on \\((-\\infty, 1/4)\\), decreasing on \\((1/4, \\infty)\\)",
    options: [
      "(i)",
      "(iii)",
      "(iv)",
      "None of the other choices is correct",
      "(ii)"
    ],
    answer: "A",
    answer_original: "A",
    answer_status: "verified",
    explanation: [
      "Tìm đạo hàm bậc nhất của hàm số:",
      "\\[ f'(x) = -8x - 2 \\]",
      "Giải phương trình \\(f'(x) = 0\\):",
      "\\[ -8x - 2 = 0 \\iff -8x = 2 \\iff x = -\\frac{1}{4} \\]",
      "Xét dấu của \\(f'(x)\\):",
      "- Khi \\(x < -1/4\\): \\(f'(x) > 0\\), hàm số đồng biến (increasing) trên khoảng \\((-\\infty, -1/4)\\).",
      "- Khi \\(x > -1/4\\): \\(f'(x) < 0\\), hàm số nghịch biến (decreasing) trên khoảng \\((-1/4, \\infty)\\).",
      "Khẳng định (i) đúng, tương ứng với lựa chọn A."
    ],
    image: "assets/questions/0499_q499_Question_499.png",
    needs_image: false,
    confidence: "high",
    review_flags: []
  },
  {
    id: 500,
    chapter: "DSTT1",
    folder: "DSTT1",
    topic: "VectorHinhHoc",
    type: "single_choice",
    question: "Find the unit vector with the same direction as the vector \\(\\mathbf{u} = (4, 3)\\).",
    options: [
      "(4/7, 3/7)",
      "(4/3, 1)",
      "(0.4, 0.3)",
      "(1, 3/4)",
      "(0.8, 0.6)",
      "None of the other choices is correct"
    ],
    answer: "E",
    answer_original: "E",
    answer_status: "verified",
    explanation: [
      "Tính độ dài của vector \\(\\mathbf{u}\\):",
      "\\[ \\|\\mathbf{u}\\| = \\sqrt{4^2 + 3^2} = \\sqrt{16 + 9} = \\sqrt{25} = 5 \\]",
      "Vector đơn vị cùng hướng với \\(\\mathbf{u}\\) là:",
      "\\[ \\hat{\\mathbf{u}} = \\frac{\\mathbf{u}}{\\|\\mathbf{u}\\|} = \\left( \\frac{4}{5}, \\frac{3}{5} \\right) = (0.8, 0.6) \\]",
      "Đáp án đúng là E."
    ],
    image: "assets/questions/0500_q500_Question_500.png",
    needs_image: false,
    confidence: "high",
    review_flags: []
  },
  {
    id: 501,
    chapter: "DSTT1",
    folder: "DSTT1",
    topic: "TriRieng",
    type: "single_choice",
    question: "Let \\(\\mathbf{x} = [-1, 2]^T\\), \\(\\mathbf{y} = [2, 1]^T\\), \\(\\mathbf{z} = [3, -1]^T\\) be vectors in \\(\\mathbb{R}^2\\) and\n\\[ A = \\begin{bmatrix} -2 & -2 \\\\ 2 & 3 \\end{bmatrix} \\]\nWhich are eigenvectors of the matrix \\(A\\)?",
    options: [
      "All of x, y and z",
      "Only x",
      "Only z",
      "Only x and y"
    ],
    answer: "B",
    answer_original: "B",
    answer_status: "verified",
    explanation: [
      "Vector \\(\\mathbf{v} \\ne \\mathbf{0}\\) là vector riêng của \\(A\\) khi và chỉ khi \\(A\\mathbf{v} = \\lambda \\mathbf{v}\\) (kết quả nhân song song với \\(\\mathbf{v}\\)):",
      "1) Nhân với \\(\\mathbf{x}\\):",
      "\\[ A\\mathbf{x} = \\begin{bmatrix} -2 & -2 \\\\ 2 & 3 \\end{bmatrix} \\begin{bmatrix} -1 \\\\ 2 \\end{bmatrix} = \\begin{bmatrix} 2 - 4 \\\\ -2 + 6 \\end{bmatrix} = \\begin{bmatrix} -2 \\\\ 4 \\end{bmatrix} = 2 \\begin{bmatrix} -1 \\\\ 2 \\end{bmatrix} = 2\\mathbf{x} \\]",
      "Do đó \\(\\mathbf{x}\\) là vector riêng ứng với giá trị riêng \\(\\lambda = 2\\).",
      "2) Nhân với \\(\\mathbf{y}\\):",
      "\\[ A\\mathbf{y} = \\begin{bmatrix} -2 & -2 \\\\ 2 & 3 \\end{bmatrix} \\begin{bmatrix} 2 \\\\ 1 \\end{bmatrix} = \\begin{bmatrix} -4 - 2 \\\\ 4 + 3 \\end{bmatrix} = \\begin{bmatrix} -6 \\\\ 7 \\end{bmatrix} \\]",
      "Vector \\([-6, 7]^T\\) không tỷ lệ với \\([2, 1]^T\\) (vì \\(-6/2 = -3 \\ne 7/1 = 7\\)). Do đó \\(\\mathbf{y}\\) không phải là vector riêng.",
      "3) Nhân với \\(\\mathbf{z}\\):",
      "\\[ A\\mathbf{z} = \\begin{bmatrix} -2 & -2 \\\\ 2 & 3 \\end{bmatrix} \\begin{bmatrix} 3 \\\\ -1 \\end{bmatrix} = \\begin{bmatrix} -6 + 2 \\\\ 6 - 3 \\end{bmatrix} = \\begin{bmatrix} -4 \\\\ 3 \\end{bmatrix} \\]",
      "Vector \\([-4, 3]^T\\) không tỷ lệ với \\([3, -1]^T\\). Do đó \\(\\mathbf{z}\\) không phải là vector riêng.",
      "Vậy chỉ có duy nhất \\(\\mathbf{x}\\) là vector riêng ('Only x' - Đáp án B)."
    ],
    image: "assets/questions/0501_q501_Question_501.png",
    needs_image: false,
    confidence: "high",
    review_flags: []
  },
  {
    id: 502,
    chapter: "GT1",
    folder: "GT1",
    topic: "TichPhan",
    type: "single_choice",
    question: "Find the derivative of the following function\n\\[ g(x) = \\int_x^6 e^{\\sin t}(\\cos t^2 - 2)\\,dt \\]\n(i) \\(e^{\\sin(6 - x)}(\\cos(6 - x)^2 - 2)\\)\n(ii) \\(e^{\\sin x}(\\cos x^2 - 2)\\)\n(iii) \\(-e^{\\sin x}(\\cos x^2 - 2)\\)\n(iv) \\(-e^{\\sin(6 - x)}(\\cos(6 - x)^2 - 2)\\)",
    options: [
      "None of the other choices is correct",
      "(i)",
      "(iv)",
      "(iii)",
      "(ii)"
    ],
    answer: "D",
    answer_original: "D",
    answer_status: "verified",
    explanation: [
      "Đổi cận tích phân để biến \\(x\\) nằm ở cận trên:",
      "\\[ g(x) = -\\int_6^x e^{\\sin t}(\\cos t^2 - 2)\\,dt \\]",
      "Áp dụng định lý cơ bản của giải tích phần 1 (Leibniz rule):",
      "\\[ g'(x) = \\frac{d}{dx} \\left[ -\\int_6^x e^{\\sin t}(\\cos t^2 - 2)\\,dt \\right] = -e^{\\sin x}(\\cos x^2 - 2) \\]",
      "Kết quả trùng khớp với (iii), tương ứng với lựa chọn D."
    ],
    image: "assets/questions/0502_q502_Question_502.png",
    needs_image: false,
    confidence: "high",
    review_flags: []
  },
  {
    id: 503,
    chapter: "DSTT1",
    folder: "DSTT1",
    topic: "MaTran",
    type: "single_choice",
    question: "Let \\(T : \\mathbb{R}^2 \\to \\mathbb{R}^2\\) be the matrix transformation induced by \\(A = \\begin{bmatrix} 1 & 1 \\\\ 0 & 1 \\end{bmatrix}\\) and \\(S : \\mathbb{R}^2 \\to \\mathbb{R}^2\\) be the matrix transformation induced by \\(B = \\begin{bmatrix} 1 & 0 \\\\ -1 & 1 \\end{bmatrix}\\). Find \\((T \\circ S)\\begin{bmatrix} 2 \\\\ 3 \\end{bmatrix}\\).\n(i) \\(\\begin{bmatrix} 1 \\\\ 3 \\end{bmatrix}\\)\n(ii) \\(\\begin{bmatrix} 3 \\\\ 1 \\end{bmatrix}\\)\n(iii) \\(\\begin{bmatrix} -1 \\\\ 3 \\end{bmatrix}\\)",
    options: [
      "(i)",
      "(ii)",
      "(iii)",
      "None of them"
    ],
    answer: "B",
    answer_original: "B",
    answer_status: "verified",
    explanation: [
      "Ánh xạ hợp \\(T \\circ S\\) tác động lên vector \\(\\mathbf{v}\\) được tính bằng \\(T(S(\\mathbf{v})) = A(B\\mathbf{v})\\):",
      "1) Tính \\(S\\begin{bmatrix} 2 \\\\ 3 \\end{bmatrix} = B\\begin{bmatrix} 2 \\\\ 3 \\end{bmatrix}\\):",
      "\\[ \\begin{bmatrix} 1 & 0 \\\\ -1 & 1 \\end{bmatrix} \\begin{bmatrix} 2 \\\\ 3 \\end{bmatrix} = \\begin{bmatrix} 1(2) + 0(3) \\\\ -1(2) + 1(3) \\end{bmatrix} = \\begin{bmatrix} 2 \\\\ 1 \\end{bmatrix} \\]",
      "2) Tính tiếp \\(T\\begin{bmatrix} 2 \\\\ 1 \\end{bmatrix} = A\\begin{bmatrix} 2 \\\\ 1 \\end{bmatrix}\\):",
      "\\[ \\begin{bmatrix} 1 & 1 \\\\ 0 & 1 \\end{bmatrix} \\begin{bmatrix} 2 \\\\ 1 \\end{bmatrix} = \\begin{bmatrix} 1(2) + 1(1) \\\\ 0(2) + 1(1) \\end{bmatrix} = \\begin{bmatrix} 3 \\\\ 1 \\end{bmatrix} \\]",
      "Kết quả là \\(\\begin{bmatrix} 3 \\\\ 1 \\end{bmatrix}\\), trùng khớp với (ii).",
      "Đáp án đúng là B."
    ],
    image: "assets/questions/0503_q503_Question_503.png",
    needs_image: false,
    confidence: "high",
    review_flags: []
  },
  {
    id: 504,
    chapter: "GT1",
    folder: "GT1",
    topic: "DaoHam",
    type: "single_choice",
    question: "Find \\(y'(1)\\) for \\(y = \\frac{5x + 7}{9x - 2}\\).",
    options: [
      "73/49",
      "-73/49",
      "73/7",
      "-73/7",
      "None of the other choices is correct"
    ],
    answer: "B",
    answer_original: "B",
    answer_status: "verified",
    explanation: [
      "Áp dụng quy tắc đạo hàm phân thức bậc nhất trên bậc nhất \\(y = \\frac{ax + b}{cx + d}\\):",
      "\\[ y' = \\frac{ad - bc}{(cx + d)^2} \\]",
      "Với \\(a = 5, b = 7, c = 9, d = -2\\):",
      "\\[ y' = \\frac{5(-2) - 7(9)}{(9x - 2)^2} = \\frac{-10 - 63}{(9x - 2)^2} = \\frac{-73}{(9x - 2)^2} \\]",
      "Tại \\(x = 1\\):",
      "\\[ y'(1) = \\frac{-73}{(9(1) - 2)^2} = \\frac{-73}{7^2} = -\\frac{73}{49} \\]",
      "Đáp án đúng là B."
    ],
    image: "assets/questions/0504_q504_Question_504.png",
    needs_image: false,
    confidence: "high",
    review_flags: []
  },
  {
    id: 505,
    chapter: "GT1",
    folder: "GT1",
    topic: "DaoHam",
    type: "single_choice",
    question: "Differentiate \\(y = \\sqrt{13x - x^5}\\).\n(i) \\(dy/dx = \\frac{1 - 5x^4}{2\\sqrt{13x - x^5}}\\)\n(ii) \\(dy/dx = \\frac{13 - 5x^4}{2\\sqrt{13x - x^5}}\\)\n(iii) \\(dy/dx = \\frac{13 - x^4}{2\\sqrt{13x - x^5}}\\)\n(iv) \\(dy/dx = \\frac{13}{2\\sqrt{13x - x^5}}\\)",
    options: [
      "None of the other choices is correct",
      "(i)",
      "(iv)",
      "(ii)",
      "(iii)"
    ],
    answer: "D",
    answer_original: "D",
    answer_status: "verified",
    explanation: [
      "Áp dụng quy tắc đạo hàm của căn thức bậc hai \\(\\frac{d}{dx}(\\sqrt{u}) = \\frac{u'}{2\\sqrt{u}}\\):",
      "Với \\(u = 13x - x^5 \\implies u' = 13 - 5x^4\\).",
      "Do đó:",
      "\\[ \\frac{dy}{dx} = \\frac{13 - 5x^4}{2\\sqrt{13x - x^5}} \\]",
      "Kết quả trùng khớp với (ii), tương ứng với lựa chọn D."
    ],
    image: "assets/questions/0505_q505_Question_505.png",
    needs_image: false,
    confidence: "high",
    review_flags: []
  },
  {
    id: 506,
    chapter: "GT1",
    folder: "GT1",
    topic: "CucTri",
    type: "single_choice",
    question: "Find the points on the graph of the function \\(y = \\frac{3}{2} - x^2\\) that are closest to the point \\((0, -3)\\).",
    options: [
      "Does not exist",
      "(2, -5/2) and (-2, 5/2)",
      "(-2, -5/2) and (2, -5/2)",
      "(-2, 5/2) and (2, 5/2)",
      "(2, -5/2) and (2, 5/2)"
    ],
    answer: "C",
    answer_original: "C",
    answer_status: "verified",
    explanation: [
      "Điểm trên đồ thị có tọa độ \\((x, y) = \\left(x, \\frac{3}{2} - x^2\\right)\\).",
      "Khoảng cách bình phương từ điểm đó đến \\((0, -3)\\) là:",
      "\\[ D(x) = (x - 0)^2 + (y - (-3))^2 = x^2 + \\left( \\frac{3}{2} - x^2 + 3 \\right)^2 = x^2 + \\left( \\frac{9}{2} - x^2 \\right)^2 \\]",
      "Đặt biến phụ \\(u = x^2 \\ge 0\\):",
      "\\[ g(u) = u + \\left(\\frac{9}{2} - u\\right)^2 = u + \\frac{81}{4} - 9u + u^2 = u^2 - 8u + \\frac{81}{4} \\]",
      "Đạo hàm theo \\(u\\): \\(g'(u) = 2u - 8 = 0 \\implies u = 4\\).",
      "Vì \\(u = 4 \\ge 0\\), khoảng cách đạt cực tiểu tại \\(x^2 = 4 \\implies x = \\pm 2\\).",
      "Tính tung độ tương ứng:",
      "\\[ y = \\frac{3}{2} - (\\pm 2)^2 = \\frac{3}{2} - 4 = -\\frac{5}{2} \\]",
      "Vậy hai điểm gần nhất là \\((-2, -5/2)\\) và \\((2, -5/2)\\).",
      "Đáp án đúng là C."
    ],
    image: "assets/questions/0506_q506_Question_506.png",
    needs_image: false,
    confidence: "high",
    review_flags: []
  },
  {
    id: 507,
    chapter: "DSTT1",
    folder: "DSTT1",
    topic: "KhongGianVector",
    type: "single_choice",
    question: "Determine whether the set is linearly independent\n(i) \\(\\{[1\\ -1\\ 2]^T, [1\\ -1\\ 1]^T, [-1\\ 1\\ -3]^T, [4\\ 5\\ 6]^T\\}\\)\n(ii) \\(\\{[1\\ 1\\ 1]^T, [1\\ -1\\ 1]^T, [0\\ 0\\ 1]^T\\}\\)\n(iii) \\(\\{[1\\ 2]^T, [1\\ 1]^T, [0\\ 2]^T\\}\\)",
    options: [
      "(ii)",
      "(i)",
      "(iii)",
      "None of the other choices is correct"
    ],
    answer: "A",
    answer_original: "A",
    answer_status: "verified",
    explanation: [
      "Kiểm tra tính độc lập tuyến tính của từng tập vector:",
      "1) Tập (i) gồm 4 vector trong không gian \\(\\mathbb{R}^3\\). Do số vector (4) lớn hơn số chiều của không gian (3), tập (i) chắc chắn phụ thuộc tuyến tính.",
      "2) Tập (iii) gồm 3 vector trong không gian \\(\\mathbb{R}^2\\). Do số vector (3) lớn hơn số chiều của không gian (2), tập (iii) chắc chắn phụ thuộc tuyến tính.",
      "3) Tập (ii) gồm 3 vector trong \\(\\mathbb{R}^3\\). Lập ma trận chứa các vector này làm cột và tính định thức:",
      "\\[ \\det \\begin{bmatrix} 1 & 1 & 0 \\\\ 1 & -1 & 0 \\\\ 1 & 1 & 1 \\end{bmatrix} = 1 \\cdot \\begin{vmatrix} 1 & 1 \\\\ 1 & -1 \\end{vmatrix} = 1(-1 - 1) = -2 \\ne 0 \\]",
      "Vì định thức khác 0, tập vector (ii) độc lập tuyến tính.",
      "Đáp án đúng là A."
    ],
    image: "assets/questions/0507_q507_Question_507.png",
    needs_image: false,
    confidence: "high",
    review_flags: []
  },
  {
    id: 508,
    chapter: "DSTT1",
    folder: "DSTT1",
    topic: "TriRieng",
    type: "single_choice",
    question: "Find the characteristic polynomial of the matrix:\n\\[ A = \\begin{bmatrix} 3 & 4 \\\\ 5 & 6 \\end{bmatrix} \\]\n(i) \\(-X^2 + 9X - 2\\)\n(ii) \\(X^2 + 9X - 2\\)\n(iii) \\(X^2 - 9X - 2\\)",
    options: [
      "(iii)",
      "(i)",
      "(ii)",
      "None of the other choices is correct"
    ],
    answer: "A",
    answer_original: "A",
    answer_status: "verified",
    explanation: [
      "Đa thức đặc trưng của ma trận \\(A\\) được tính theo công thức \\(p(X) = \\det(XI - A)\\):",
      "\\[ p(X) = \\begin{vmatrix} X - 3 & -4 \\\\ -5 & X - 6 \\end{vmatrix} \\]",
      "\\[ = (X - 3)(X - 6) - (-4)(-5) = X^2 - 9X + 18 - 20 = X^2 - 9X - 2 \\]",
      "Biểu thức trùng khớp với (iii), tương ứng với lựa chọn A."
    ],
    image: "assets/questions/0508_q508_Question_508.png",
    needs_image: false,
    confidence: "high",
    review_flags: []
  },
  {
    id: 509,
    chapter: "GT1",
    folder: "GT1",
    topic: "HamSo",
    type: "single_choice",
    question: "Find the range of the function\n\\[ f(x) = x^4 + 2x^2 + 1 \\]\n(i) \\((0, \\infty)\\)\n(ii) \\([0, \\infty)\\)\n(iii) \\((1, \\infty)\\)\n(iv) \\([1, \\infty)\\)",
    options: [
      "(ii)",
      "None of the other choices is correct",
      "(iii)",
      "(iv)",
      "(i)"
    ],
    answer: "D",
    answer_original: "D",
    answer_status: "verified",
    explanation: [
      "Hằng đẳng thức đáng nhớ:",
      "\\[ f(x) = x^4 + 2x^2 + 1 = (x^2 + 1)^2 \\]",
      "Với mọi số thực \\(x\\), ta luôn có \\(x^2 \\ge 0\\), do đó:",
      "\\[ x^2 + 1 \\ge 1 \\implies (x^2 + 1)^2 \\ge 1^2 = 1 \\]",
      "Dấu bằng xảy ra khi \\(x = 0\\), tại đó \\(f(0) = 1\\).",
      "Khi \\(x \\to \\pm\\infty\\), \\(f(x) \\to +\\infty\\). Vì hàm số liên tục trên \\(\\mathbb{R}\\), tập giá trị (range) của hàm số là \\([1, \\infty)\\).",
      "Khẳng định (iv) đúng, tương ứng với lựa chọn D."
    ],
    image: "assets/questions/0509_q509_Question_509.png",
    needs_image: false,
    confidence: "high",
    review_flags: []
  },
  {
    id: 510,
    chapter: "DSTT1",
    folder: "DSTT1",
    topic: "KhongGianVector",
    type: "single_choice",
    question: "Find the dimension of the subspace\n\\[ U = \\{[a\\quad a - b\\quad a + 2b\\quad a]^T \\mid a, b \\text{ are real numbers}\\} \\text{ in } \\mathbb{R}^4. \\]",
    options: [
      "1",
      "4",
      "2",
      "3"
    ],
    answer: "C",
    answer_original: "C",
    answer_status: "verified",
    explanation: [
      "Tách mọi vector trong \\(U\\) theo hai tham số tự do \\(a\\) và \\(b\\):",
      "\\[ \\begin{bmatrix} a \\\\ a - b \\\\ a + 2b \\\\ a \\end{bmatrix} = a \\begin{bmatrix} 1 \\\\ 1 \\\\ 1 \\\\ 1 \\end{bmatrix} + b \\begin{bmatrix} 0 \\\\ -1 \\\\ 2 \\\\ 0 \\end{bmatrix} \\]",
      "Hai vector \\(\\mathbf{v}_1 = [1, 1, 1, 1]^T\\) và \\(\\mathbf{v}_2 = [0, -1, 2, 0]^T\\) sinh ra không gian con \\(U\\).",
      "Dễ thấy \\(\\mathbf{v}_1\\) và \\(\\mathbf{v}_2\\) không tỷ lệ với nhau nên chúng độc lập tuyến tính.",
      "Vậy hệ \\(\\{\\mathbf{v}_1, \\mathbf{v}_2\\}\\) là một cơ sở của \\(U\\), suy ra \\(\\dim(U) = 2\\).",
      "Đáp án đúng là C."
    ],
    image: "assets/questions/0510_q510_Question_510.png",
    needs_image: false,
    confidence: "high",
    review_flags: []
  },
  {
    id: 511,
    chapter: "GT1",
    folder: "GT1",
    topic: "TichPhan",
    type: "single_choice",
    question: "Evaluate\n\\[ \\int \\frac{t^2 \\ln(t^3 + 6)}{t^3 + 6}\\,dt \\]\n(i) \\((1/6)[\\ln(t^3 + 6)]^2 + C\\)\n(ii) \\(6[\\ln(t^3 + 6)]^2 + C\\)\n(iii) \\(1/(6[\\ln(t^3 + 6)]^2) + C\\)\n(iv) \\([\\ln(t^3 + 6)]^2 + C\\)",
    options: [
      "(iv)",
      "(iii)",
      "(i)",
      "(ii)",
      "None of the other choices is correct"
    ],
    answer: "C",
    answer_original: "C",
    answer_status: "verified",
    explanation: [
      "Sử dụng phương pháp đổi biến số:",
      "Đặt \\(u = \\ln(t^3 + 6)\\).",
      "Đạo hàm hai vế: \\(du = \\frac{3t^2}{t^3 + 6}\\,dt \\implies \\frac{t^2}{t^3 + 6}\\,dt = \\frac{du}{3}\\).",
      "Thay vào tích phân ban đầu:",
      "\\[ \\int u \\cdot \\frac{du}{3} = \\frac{1}{3} \\int u\\,du = \\frac{1}{3} \\cdot \\frac{u^2}{2} + C = \\frac{1}{6} u^2 + C \\]",
      "Thay lại biến \\(u\\):",
      "\\[ \\frac{1}{6}[\\ln(t^3 + 6)]^2 + C \\]",
      "Biểu thức trùng khớp với (i), tương ứng với lựa chọn C."
    ],
    image: "assets/questions/0511_q511_Question_511.png",
    needs_image: false,
    confidence: "high",
    review_flags: []
  },
  {
    id: 512,
    chapter: "DSTT1",
    folder: "DSTT1",
    topic: "KhongGianVector",
    type: "single_choice",
    question: "Find the dimension of the space\n\\[ U = \\operatorname{span}\\left\\{ \\begin{bmatrix} 0 \\\\ 3 \\\\ 1 \\end{bmatrix}, \\begin{bmatrix} 1 \\\\ 1 \\\\ 1 \\end{bmatrix}, \\begin{bmatrix} 2 \\\\ -1 \\\\ 1 \\end{bmatrix}, \\begin{bmatrix} 3 \\\\ 0 \\\\ 2 \\end{bmatrix} \\right\\}. \\]",
    options: [
      "2",
      "4",
      "3",
      "1"
    ],
    answer: "A",
    answer_original: "A",
    answer_status: "verified",
    explanation: [
      "Số chiều của không gian sinh bằng hạng của ma trận tạo bởi các vector này làm cột:",
      "\\[ M = \\begin{bmatrix} 0 & 1 & 2 & 3 \\\\ 3 & 1 & -1 & 0 \\\\ 1 & 1 & 1 & 2 \\end{bmatrix} \\]",
      "Thực hiện phép biến đổi sơ cấp theo dòng:",
      "Đổi chỗ dòng 1 và dòng 3:",
      "\\[ \\begin{bmatrix} 1 & 1 & 1 & 2 \\\\ 3 & 1 & -1 & 0 \\\\ 0 & 1 & 2 & 3 \\end{bmatrix} \\xrightarrow{R_2 \\to R_2 - 3R_1} \\begin{bmatrix} 1 & 1 & 1 & 2 \\\\ 0 & -2 & -4 & -6 \\\\ 0 & 1 & 2 & 3 \\end{bmatrix} \\]",
      "\\[ \\xrightarrow{R_2 \\to -\\frac{1}{2}R_2} \\begin{bmatrix} 1 & 1 & 1 & 2 \\\\ 0 & 1 & 2 & 3 \\\\ 0 & 1 & 2 & 3 \\end{bmatrix} \\xrightarrow{R_3 \\to R_3 - R_2} \\begin{bmatrix} 1 & 1 & 1 & 2 \\\\ 0 & 1 & 2 & 3 \\\\ 0 & 0 & 0 & 0 \\end{bmatrix} \\]",
      "Ma trận dạng bậc thang có đúng 2 dòng khác không, do đó \\(\\operatorname{rank}(M) = 2\\).",
      "Vậy \\(\\dim(U) = 2\\) (Đáp án A)."
    ],
    image: "assets/questions/0512_q512_Question_512.png",
    needs_image: false,
    confidence: "high",
    review_flags: []
  },
  {
    id: 513,
    chapter: "DSTT1",
    folder: "DSTT1",
    topic: "VectorHinhHoc",
    type: "single_choice",
    question: "Let \\(\\mathbf{u} = (1, 1, 2)\\), \\(\\mathbf{v} = (-1, 0, 1)\\). Find the length of \\((200\\mathbf{u} + 3\\mathbf{v}) \\times \\mathbf{u}\\).\n(i) \\(\\sqrt{11}\\)\n(ii) \\(3\\sqrt{11}\\)\n(iii) \\(\\sqrt{211}\\)",
    options: [
      "(iii)",
      "(i)",
      "None of the other choices is correct",
      "(ii)"
    ],
    answer: "D",
    answer_original: "D",
    answer_status: "verified",
    explanation: [
      "Áp dụng tính chất phân phối và phản đối xứng của tích có hướng:",
      "\\[ (200\\mathbf{u} + 3\\mathbf{v}) \\times \\mathbf{u} = 200(\\mathbf{u} \\times \\mathbf{u}) + 3(\\mathbf{v} \\times \\mathbf{u}) \\]",
      "Vì tích có hướng của một vector với chính nó bằng vector không (\\(\\mathbf{u} \\times \\mathbf{u} = \\mathbf{0}\\)):",
      "\\[ (200\\mathbf{u} + 3\\mathbf{v}) \\times \\mathbf{u} = 3(\\mathbf{v} \\times \\mathbf{u}) \\]",
      "Tính tích có hướng \\(\\mathbf{v} \\times \\mathbf{u}\\):",
      "\\[ \\mathbf{v} \\times \\mathbf{u} = \\begin{vmatrix} \\mathbf{i} & \\mathbf{j} & \\mathbf{k} \\\\ -1 & 0 & 1 \\\\ 1 & 1 & 2 \\end{vmatrix} = \\mathbf{i}(0 - 1) - \\mathbf{j}(-2 - 1) + \\mathbf{k}(-1 - 0) = (-1, 3, -1) \\]",
      "Độ dài của \\(\\mathbf{v} \\times \\mathbf{u}\\):",
      "\\[ \\|\\mathbf{v} \\times \\mathbf{u}\\| = \\sqrt{(-1)^2 + 3^2 + (-1)^2} = \\sqrt{1 + 9 + 1} = \\sqrt{11} \\]",
      "Độ dài cần tìm:",
      "\\[ \\|(200\\mathbf{u} + 3\\mathbf{v}) \\times \\mathbf{u}\\| = 3\\|\\mathbf{v} \\times \\mathbf{u}\\| = 3\\sqrt{11} \\]",
      "Kết quả trùng khớp với (ii), tương ứng với lựa chọn D."
    ],
    image: "assets/questions/0513_q513_Question_513.png",
    needs_image: false,
    confidence: "high",
    review_flags: []
  },
  {
    id: 514,
    chapter: "DSTT1",
    folder: "DSTT1",
    topic: "MaTran",
    type: "single_choice",
    question: "Let \\(T\\) be the rotation about the origin of angle \\(\\frac{\\pi}{2}\\) followed by reflection in the x-axis. Find \\(T\\begin{bmatrix} 1 \\\\ 0 \\end{bmatrix}\\).\n(i) \\(\\begin{bmatrix} -1 \\\\ -1 \\end{bmatrix}\\)\n(ii) \\(\\begin{bmatrix} 1 \\\\ 1 \\end{bmatrix}\\)\n(iii) \\(\\begin{bmatrix} 0 \\\\ -1 \\end{bmatrix}\\)",
    options: [
      "(iii)",
      "(ii)",
      "None of the choices is correct",
      "(i)"
    ],
    answer: "A",
    answer_original: "A",
    answer_status: "verified",
    explanation: [
      "Thực hiện tuần tự hai phép biến đổi hình học trên vector \\(\\begin{bmatrix} 1 \\\\ 0 \\end{bmatrix}\\):",
      "1) Phép quay tâm gốc tọa độ góc \\(\\frac{\\pi}{2}\\) ngược chiều kim đồng hồ:",
      "Biến điểm \\((1, 0)\\) trên trục hoành thành điểm \\((0, 1)\\) trên trục tung:",
      "\\[ R_{\\pi/2}\\begin{bmatrix} 1 \\\\ 0 \\end{bmatrix} = \\begin{bmatrix} \\cos(\\pi/2) & -\\sin(\\pi/2) \\\\ \\sin(\\pi/2) & \\cos(\\pi/2) \\end{bmatrix} \\begin{bmatrix} 1 \\\\ 0 \\end{bmatrix} = \\begin{bmatrix} 0 \\\\ 1 \\end{bmatrix} \\]",
      "2) Phép lấy đối xứng qua trục hoành (x-axis):",
      "Quy tắc phản xạ qua trục x: \\((x, y) \\mapsto (x, -y)\\).",
      "Do đó điểm \\((0, 1)\\) biến thành \\((0, -1)\\):",
      "\\[ T\\begin{bmatrix} 1 \\\\ 0 \\end{bmatrix} = \\begin{bmatrix} 0 \\\\ -1 \\end{bmatrix} \\]",
      "Kết quả trùng khớp với (iii), tương ứng với lựa chọn A."
    ],
    image: "assets/questions/0514_q514_Question_514.png",
    needs_image: false,
    confidence: "high",
    review_flags: []
  },
  {
    id: 515,
    chapter: "DSTT1",
    folder: "DSTT1",
    topic: "DinhThuc",
    type: "single_choice",
    question: "Let \\(A, B\\) be square matrices of the same size. If \\(\\det(A) = 4\\) and \\(\\det(B) = -3\\), evaluate\n\\[ \\det(A^{-3} B^{-14} B^{15} A^2) \\]",
    options: [
      "-12",
      "-3/4",
      "-4/3",
      "12"
    ],
    answer: "B",
    answer_original: "B",
    answer_status: "verified",
    explanation: [
      "Áp dụng tính chất nhân định thức \\(\\det(XY) = \\det(X)\\det(Y)\\) (định thức của tích các ma trận là tích các định thức số thực nên có tính giao hoán):",
      "\\[ \\det(A^{-3} B^{-14} B^{15} A^2) = \\det(A^{-3}) \\cdot \\det(B^{-14}) \\cdot \\det(B^{15}) \\cdot \\det(A^2) \\]",
      "\\[ = (\\det A)^{-3} \\cdot (\\det B)^{-14} \\cdot (\\det B)^{15} \\cdot (\\det A)^2 \\]",
      "\\[ = (\\det A)^{-3 + 2} \\cdot (\\det B)^{-14 + 15} = (\\det A)^{-1} \\cdot (\\det B)^1 = \\frac{\\det B}{\\det A} \\]",
      "Thay số với \\(\\det(A) = 4\\) và \\(\\det(B) = -3\\):",
      "\\[ = \\frac{-3}{4} = -\\frac{3}{4} \\]",
      "Đáp án đúng là B."
    ],
    image: "assets/questions/0515_q515_Question_515.png",
    needs_image: false,
    confidence: "high",
    review_flags: []
  },
  {
    id: 516,
    chapter: "GT1",
    folder: "GT1",
    topic: "DaoHam",
    type: "single_choice",
    question: "A table of values for \\(f, g, f', g'\\) is given:\n\\[ \\begin{array}{|c|c|c|c|c|} \\hline x & f(x) & g(x) & f'(x) & g'(x) \\\\ \\hline 0 & 1 & 1 & 2 & -2 \\\\ 1 & 0 & 2 & 3 & -1 \\\\ 2 & 4 & -1 & 5 & 6 \\\\ \\hline \\end{array} \\]\nFind \\(h'(0)\\) if \\(h(x) = g(f(x))\\).",
    options: [
      "-5",
      "0",
      "-6",
      "-2",
      "None of the other choices is correct",
      "None determined"
    ],
    answer: "D",
    answer_original: "D",
    answer_status: "verified",
    explanation: [
      "Theo quy tắc đạo hàm hàm hợp (Chain Rule):",
      "\\[ h'(x) = g'(f(x)) \\cdot f'(x) \\]",
      "Tại \\(x = 0\\):",
      "\\[ h'(0) = g'(f(0)) \\cdot f'(0) \\]",
      "Tra cứu các giá trị từ bảng tại dòng \\(x = 0\\):",
      "- \\(f(0) = 1\\)",
      "- \\(f'(0) = 2\\)",
      "Do đó:",
      "\\[ h'(0) = g'(1) \\cdot 2 \\]",
      "Tra cứu giá trị \\(g'(1)\\) từ bảng tại dòng \\(x = 1\\):",
      "- \\(g'(1) = -1\\)",
      "Thay vào biểu thức:",
      "\\[ h'(0) = (-1) \\cdot 2 = -2 \\]",
      "Đáp án đúng là D."
    ],
    image: "assets/questions/0516_q516_Question_516.png",
    needs_image: false,
    confidence: "high",
    review_flags: []
  },
  {
    id: 517,
    chapter: "DSTT1",
    folder: "DSTT1",
    topic: "VectorHinhHoc",
    type: "single_choice",
    question: "Let \\(Q(a, b, c)\\) be the point on the plane with equation \\(x + y + z = 1\\) that is closest to the point \\(P(1, 0, 3)\\). Find \\(b\\).",
    options: [
      "-1",
      "1",
      "0",
      "2",
      "-2",
      "None of the others"
    ],
    answer: "A",
    answer_original: "A",
    answer_status: "verified",
    explanation: [
      "Điểm \\(Q\\) trên mặt phẳng gần \\(P\\) nhất chính là hình chiếu vuông góc của \\(P\\) lên mặt phẳng \\(\\mathcal{P}: x + y + z - 1 = 0\\).",
      "Vector pháp tuyến của mặt phẳng: \\(\\mathbf{n} = (1, 1, 1)\\).",
      "Đường thẳng đi qua \\(P(1, 0, 3)\\) vuông góc với mặt phẳng có phương trình tham số:",
      "\\[ \\begin{cases} x = 1 + t \\\\ y = 0 + t = t \\\\ z = 3 + t \\end{cases} \\]",
      "Thay phương trình tham số vào phương trình mặt phẳng:",
      "\\[ (1 + t) + t + (3 + t) = 1 \\iff 3t + 4 = 1 \\iff 3t = -3 \\iff t = -1 \\]",
      "Thay \\(t = -1\\) vào để tìm tọa độ của \\(Q\\):",
      "- \\(a = 1 + (-1) = 0\\)",
      "- \\(b = -1\\)",
      "- \\(c = 3 + (-1) = 2\\)",
      "Vậy \\(Q = (0, -1, 2)\\). Tung độ \\(b = -1\\).",
      "Đáp án đúng là A."
    ],
    image: "assets/questions/0517_q517_Question_517.png",
    needs_image: false,
    confidence: "high",
    review_flags: []
  },
  {
    id: 518,
    chapter: "DSTT1",
    folder: "DSTT1",
    topic: "KhongGianVector",
    type: "single_choice",
    question: "Which of the following sets are bases for \\(\\mathbb{R}^3\\)?\n(i) \\(\\{(1, 1, 1), (1, 8, 9), (0, 3, 4)\\}\\)\n(ii) \\(\\{(0, 3, 1), (1, -8, 9), (0, 3, 4), (2, 3, 5)\\}\\)\n(iii) \\(\\{(1, -1, -1), (1, -4, 3), (3, -6, 1)\\}\\)",
    options: [
      "(ii) and (iii)",
      "None of the other choices is correct",
      "(iii)",
      "(i)",
      "(i) and (iii)"
    ],
    answer: "D",
    answer_original: "D",
    answer_status: "verified",
    explanation: [
      "Để một tập hợp là cơ sở của \\(\\mathbb{R}^3\\), tập đó phải gồm đúng 3 vector độc lập tuyến tính:",
      "1) Tập (ii) có 4 vector trong \\(\\mathbb{R}^3\\), nên không thể là cơ sở (phụ thuộc tuyến tính).",
      "2) Xét tập (i) gồm 3 vector: Tính định thức của ma trận tọa độ:",
      "\\[ \\det \\begin{bmatrix} 1 & 1 & 0 \\\\ 1 & 8 & 3 \\\\ 1 & 9 & 4 \\end{bmatrix} = 1(32 - 27) - 1(4 - 0) + 0 = 5 - 4 = 1 \\ne 0 \\]",
      "Vì định thức khác 0, tập (i) độc lập tuyến tính và là cơ sở của \\(\\mathbb{R}^3\\).",
      "3) Xét tập (iii) gồm 3 vector: Tính định thức của ma trận tọa độ:",
      "\\[ \\det \\begin{bmatrix} 1 & 1 & 3 \\\\ -1 & -4 & -6 \\\\ -1 & 3 & 1 \\end{bmatrix} = 1(-4 + 18) - 1(-1 - 6) + 3(-3 - 4) = 14 - (-7) + 3(-7) = 14 + 7 - 21 = 0 \\]",
      "Vì định thức bằng 0, tập (iii) phụ thuộc tuyến tính, không phải là cơ sở.",
      "Vậy chỉ có tập (i) là cơ sở của \\(\\mathbb{R}^3\\) (Đáp án D)."
    ],
    image: "assets/questions/0518_q518_Question_518.png",
    needs_image: false,
    confidence: "high",
    review_flags: []
  },
  {
    id: 519,
    chapter: "DSTT1",
    folder: "DSTT1",
    topic: "HePhuongTrinh",
    type: "single_choice",
    question: "John and Joe earn a total of 39.5 dollars when John works 2 hours and Joe works 3 hours. If John works 3 hours and Joe works 2 hours, they get 38 dollars. Find Joe's hourly rates (in dollars).",
    options: [
      "6.5",
      "7",
      "5.5",
      "6",
      "8.5"
    ],
    answer: "E",
    answer_original: "E",
    answer_status: "verified",
    explanation: [
      "Gọi \\(x\\) là mức lương theo giờ của John và \\(y\\) là mức lương theo giờ của Joe (đơn vị: dollars).",
      "Từ giả thiết bài toán ta lập hệ phương trình bậc nhất hai ẩn:",
      "\\[ \\begin{cases} 2x + 3y = 39.5 & (1) \\\\ 3x + 2y = 38 & (2) \\end{cases} \\]",
      "Trừ phương trình (2) cho phương trình (1):",
      "\\[ (3x + 2y) - (2x + 3y) = 38 - 39.5 \\implies x - y = -1.5 \\implies x = y - 1.5 \\]",
      "Thay \\(x = y - 1.5\\) vào phương trình (1):",
      "\\[ 2(y - 1.5) + 3y = 39.5 \\iff 2y - 3 + 3y = 39.5 \\iff 5y = 42.5 \\iff y = 8.5 \\]",
      "Khi đó lương của John là \\(x = 8.5 - 1.5 = 7\\) dollars/giờ.",
      "Mức lương theo giờ của Joe là 8.5 dollars.",
      "Đáp án đúng là E."
    ],
    image: "assets/questions/0519_q519_Question_519.png",
    needs_image: false,
    confidence: "high",
    review_flags: [
      "prompt_anomaly"
    ]
  },
  {
    id: 520,
    chapter: "GT1",
    folder: "GT1",
    topic: "CucTri",
    type: "single_choice",
    question: "Find two real numbers such that the first minus two times the second is 10 and the sum of their square is minimum.",
    options: [
      "The first is 10, the second is 0",
      "The first is 0, the second is 10",
      "The first is 2, the second is -4",
      "The first is -4, the second is 2",
      "None of the other choices is correct"
    ],
    answer: "C",
    answer_original: "C",
    answer_status: "verified",
    explanation: [
      "Gọi số thứ nhất là \\(x\\) và số thứ hai là \\(y\\).",
      "Theo giả thiết: \\(x - 2y = 10 \\implies x = 2y + 10\\).",
      "Tổng bình phương của hai số là:",
      "\\[ S = x^2 + y^2 = (2y + 10)^2 + y^2 = 4y^2 + 40y + 100 + y^2 = 5y^2 + 40y + 100 \\]",
      "Để tìm giá trị nhỏ nhất, lấy đạo hàm theo \\(y\\):",
      "\\[ S'(y) = 10y + 40 = 0 \\implies y = -4 \\]",
      "Vì \\(S''(y) = 10 > 0\\), hàm số đạt cực tiểu tuyệt đối tại \\(y = -4\\).",
      "Tìm số thứ nhất tương ứng:",
      "\\[ x = 2(-4) + 10 = -8 + 10 = 2 \\]",
      "Vậy số thứ nhất là 2 và số thứ hai là -4 ('The first is 2, the second is -4').",
      "Đáp án đúng là C."
    ],
    image: "assets/questions/0520_q520_Question_520.png",
    needs_image: false,
    confidence: "high",
    review_flags: []
  }
];

const outputPath = path.join(__dirname, '..', 'data', 'v2', 'batches', 'batch_13.json');
fs.writeFileSync(outputPath, JSON.stringify(batch13, null, 2), 'utf-8');
console.log(`Successfully wrote batch_13.json with ${batch13.length} questions to ${outputPath}`);
