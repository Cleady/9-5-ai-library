// scripts/create_batch_06.js
const fs = require('fs');
const path = require('path');

const batch_06 = [
  {
    id: 201,
    chapter: "DSTT1",
    folder: "DSTT1",
    topic: "VectorHinhHoc",
    type: "single_choice",
    question: "Given three vectors \\(\\mathbf{u}, \\mathbf{v}, \\mathbf{w}\\):\n\\[ \\mathbf{u} = [1, 2, 3]^T, \\quad \\mathbf{v} = [0, 1, \\mathbf{a}]^T, \\quad \\mathbf{w} = [0, 2, 5]^T \\]\nFind all possible values of \\(\\mathbf{a}\\) such that the volume of the parallelepiped determined by \\(\\mathbf{u}, \\mathbf{v}, \\mathbf{w}\\) is 7.",
    options: [
      "1 and -6",
      "-1 and 6",
      "-1 and -6",
      "1 and 6"
    ],
    answer: "B",
    answer_original: "B",
    answer_status: "verified",
    explanation: [
      "Thể tích của khối hộp tạo bởi ba vectơ \\(\\mathbf{u}, \\mathbf{v}, \\mathbf{w}\\) trong \\(\\mathbb{R}^3\\) bằng giá trị tuyệt đối của định thức ma trận lập bởi 3 vectơ đó:\n\\[ V = |\\det([\\mathbf{u}, \\mathbf{v}, \\mathbf{w}])| = 7 \\]",
      "Lập ma trận và tính định thức (khai triển theo cột 1 do có hai số 0):\n\\[ \\det \\begin{bmatrix} 1 & 0 & 0 \\\\ 2 & 1 & 2 \\\\ 3 & a & 5 \\end{bmatrix} = 1 \\cdot \\begin{vmatrix} 1 & 2 \\\\ a & 5 \\end{vmatrix} = 1(5 - 2a) = 5 - 2a \\]",
      "Do thể tích bằng 7 nên:\n\\[ |5 - 2a| = 7 \\]",
      "Xét hai trường hợp:\n- Trường hợp 1: \\(5 - 2a = 7 \\implies -2a = 2 \\implies a = -1\\)\n- Trường hợp 2: \\(5 - 2a = -7 \\implies -2a = -12 \\implies a = 6\\)",
      "Vậy các giá trị của \\(a\\) là \\(-1\\) và \\(6\\). Đáp án đúng là B."
    ],
    image: "assets/questions/0201_q201_Question_201.png",
    needs_image: false,
    review_flags: [],
    confidence: "high"
  },
  {
    id: 202,
    chapter: "DSTT1",
    folder: "DSTT1",
    topic: "MaTran",
    type: "single_choice",
    question: "Find \\(x\\) such that the set\n\\[ \\{[2 \\quad x \\quad -1]^T, \\quad [2 \\quad 0 \\quad 1]^T, \\quad [0 \\quad 1 \\quad 2]^T\\} \\]\nis dependent.",
    options: [
      "2",
      "-1",
      "None of the other choices is correct",
      "All numbers but -1",
      "All numbers but 2"
    ],
    answer: "B",
    answer_original: "B",
    answer_status: "verified",
    explanation: [
      "Tập hợp ba vectơ trong \\(\\mathbb{R}^3\\) phụ thuộc tuyến tính khi và chỉ khi định thức của ma trận lập bởi các vectơ này bằng 0.",
      "Lập ma trận các cột:\n\\[ M = \\begin{bmatrix} 2 & 2 & 0 \\\\ x & 0 & 1 \\\\ -1 & 1 & 2 \\end{bmatrix} \\]",
      "Khai triển định thức theo dòng 1:\n\\[ \\det(M) = 2 \\cdot \\begin{vmatrix} 0 & 1 \\\\ 1 & 2 \\end{vmatrix} - 2 \\cdot \\begin{vmatrix} x & 1 \\\\ -1 & 2 \\end{vmatrix} + 0 \\]\n\\[ = 2(0 - 1) - 2(2x - (-1)) = -2 - 2(2x + 1) = -2 - 4x - 2 = -4x - 4 \\]",
      "Để tập phụ thuộc tuyến tính:\n\\[ -4x - 4 = 0 \\iff -4x = 4 \\iff x = -1 \\]",
      "Đáp án đúng là B (-1)."
    ],
    image: "assets/questions/0202_q202_Question_202.png",
    needs_image: false,
    review_flags: [],
    confidence: "high"
  },
  {
    id: 203,
    chapter: "DSTT1",
    folder: "DSTT1",
    topic: "HePhuongTrinh",
    type: "single_choice",
    question: "Find all values of \\(t\\) such that the system\n\\[ \\begin{cases} x + ty = 0 \\\\ tx + y = 2 \\\\ x + y = 1 \\end{cases} \\]\nis consistent.",
    options: [
      "None of the other choices is corect",
      "t = -1",
      "All numbers but 1",
      "Does not exist",
      "t = 1",
      "All numbers but -1"
    ],
    answer: "D",
    answer_original: "D",
    answer_status: "verified",
    explanation: [
      "Từ phương trình (1): \\(x = -ty\\). Thay vào phương trình (3):\n\\[ -ty + y = 1 \\iff y(1 - t) = 1 \\]",
      "Nếu \\(t = 1\\): Phương trình (1) thành \\(x + y = 0\\), mâu thuẫn với phương trình (3) \\(x + y = 1\\). Do đó hệ vô nghiệm khi \\(t = 1\\).",
      "Nếu \\(t \\ne 1\\): Ta có \\(y = \\frac{1}{1 - t}\\) và \\(x = \\frac{-t}{1 - t}\\).",
      "Thay \\(x, y\\) vào phương trình (2):\n\\[ t\\left(\\frac{-t}{1 - t}\\right) + \\frac{1}{1 - t} = 2 \\iff \\frac{1 - t^2}{1 - t} = 2 \\]",
      "Vì \\(t \\ne 1\\), ta rút gọn \\(\\frac{(1 - t)(1 + t)}{1 - t} = 1 + t\\):\n\\[ 1 + t = 2 \\iff t = 1 \\]",
      "Điều này mâu thuẫn với điều kiện \\(t \\ne 1\\).",
      "Vậy không tồn tại giá trị nào của \\(t\\) để hệ có nghiệm (consistent). Đáp án đúng là D (Does not exist)."
    ],
    image: "assets/questions/0203_q203_Question_203.png",
    needs_image: false,
    review_flags: [],
    confidence: "high"
  },
  {
    id: 204,
    chapter: "GT1",
    folder: "GT1",
    topic: "DaoHam",
    type: "single_choice",
    question: "Simplify the quotient \\(\\frac{f(x+h)-f(x)}{h}\\) for \\(f(x) = \\frac{-2}{x}\\)\n(i) \\(\\frac{-2}{(x+h)x}\\)\n(ii) \\(\\frac{2}{(x+h)x}\\)\n(iii) \\(\\frac{2}{(x-h)x}\\)\n(iv) \\(\\frac{-2}{(x+h)h}\\)",
    options: [
      "(iii)",
      "(ii)",
      "None of the other choices is correct",
      "(i)",
      "(iv)"
    ],
    answer: "B",
    answer_original: "B",
    answer_status: "verified",
    explanation: [
      "Tính hiệu ở tử số \\(f(x+h) - f(x)\\):\n\\[ f(x+h) - f(x) = \\frac{-2}{x+h} - \\left(\\frac{-2}{x}\\right) = \\frac{2}{x} - \\frac{2}{x+h} \\]\n\\[ = \\frac{2(x+h) - 2x}{x(x+h)} = \\frac{2h}{x(x+h)} \\]",
      "Chia cho \\(h\\):\n\\[ \\frac{f(x+h)-f(x)}{h} = \\frac{2h}{h \\cdot x(x+h)} = \\frac{2}{(x+h)x} \\]",
      "Biểu thức này khớp với mệnh đề (ii). Lựa chọn B tương ứng với (ii).",
      "Đáp án đúng là B."
    ],
    image: "assets/questions/0204_q204_Question_204.png",
    needs_image: false,
    review_flags: [],
    confidence: "high"
  },
  {
    id: 205,
    chapter: "DSTT1",
    folder: "DSTT1",
    topic: "MaTran",
    type: "single_choice",
    question: "Determine ALL the values of \\(s, t\\) such that the following matrix is symmetric:\n\\[ \\begin{bmatrix} s & 2s & st \\\\ t & -1 & s \\\\ t & s^2 & s \\end{bmatrix} \\]",
    options: [
      "s arbitrary, t = 0",
      "s = 1, t = 2",
      "s = 0, t = 0",
      "none of the other choices is true.",
      "(s = 1, t = 2) or (s = 0, t = 0)",
      "s = 2, t = 4"
    ],
    answer: "E",
    answer_original: "E",
    answer_status: "verified",
    explanation: [
      "Ma trận đối xứng khi và chỉ khi \\(A = A^T\\), tức các phần tử đối xứng qua đường chéo chính bằng nhau:\n1) \\(a_{12} = a_{21} \\implies 2s = t\\)\n2) \\(a_{13} = a_{31} \\implies st = t\\)\n3) \\(a_{23} = a_{32} \\implies s = s^2\\)",
      "Từ phương trình (3): \\(s^2 - s = 0 \\iff s(s - 1) = 0 \\implies s = 0\\) hoặc \\(s = 1\\).",
      "- Nếu \\(s = 0\\): Từ (1) có \\(t = 2(0) = 0\\). Kiểm tra (2): \\(0 \\times 0 = 0\\) (thỏa mãn). Ta được nghiệm \\((s = 0, t = 0)\\).",
      "- Nếu \\(s = 1\\): Từ (1) có \\(t = 2(1) = 2\\). Kiểm tra (2): \\(1 \\times 2 = 2\\) (thỏa mãn). Ta được nghiệm \\((s = 1, t = 2)\\).",
      "Vậy TẤT CẢ các bộ giá trị là \\((s = 1, t = 2)\\) hoặc \\((s = 0, t = 0)\\).",
      "Đáp án đúng là E."
    ],
    image: "assets/questions/0205_q205_Question_205.png",
    needs_image: false,
    review_flags: [],
    confidence: "high"
  },
  {
    id: 206,
    chapter: "DSTT1",
    folder: "DSTT1",
    topic: "MaTran",
    type: "single_choice",
    question: "Which of the following statements are true for every square matrix \\(A\\):\n(1) If \\(A^2 = 0\\) then \\(A\\) is invertible\n(2) If \\(A^3 = -I\\) then \\(A\\) is invertible",
    options: [
      "None of (1) and (2) is true",
      "Both (1) and (2) are true",
      "Only (1) is true",
      "Only (2) is true"
    ],
    answer: "D",
    answer_original: "D",
    answer_status: "verified",
    explanation: [
      "Xét mệnh đề (1): Nếu \\(A^2 = 0\\), lấy định thức hai vế: \\(\\det(A^2) = (\\det A)^2 = 0 \\implies \\det A = 0\\). Do đó ma trận \\(A\\) không bao giờ khả nghịch. Mệnh đề (1) SAI.",
      "Xét mệnh đề (2): Nếu \\(A^3 = -I\\), ta có thể viết lại: \\(A(-A^2) = -A^3 = -(-I) = I\\). Theo định nghĩa, ma trận nghịch đảo của \\(A\\) chính là \\(A^{-1} = -A^2\\), do đó \\(A\\) luôn khả nghịch. Mệnh đề (2) ĐÚNG.",
      "Vậy chỉ có mệnh đề (2) đúng. Đáp án đúng là D."
    ],
    image: "assets/questions/0206_q206_Question_206.png",
    needs_image: false,
    review_flags: [],
    confidence: "high"
  },
  {
    id: 207,
    chapter: "DSTT1",
    folder: "DSTT1",
    topic: "DinhThuc",
    type: "single_choice",
    question: "Let \\(A = \\begin{bmatrix} 1 & 2 & 3 \\\\ 0 & 3 & 4 \\\\ 0 & 1 & 2 \\end{bmatrix}\\). Compute \\(\\det(2A^3 A^T A^{-1})\\).",
    options: [
      "16",
      "64",
      "none of the other choices is true",
      "24",
      "32"
    ],
    answer: "B",
    answer_original: "B",
    answer_status: "verified",
    explanation: [
      "Tính định thức của ma trận \\(A\\) bằng cách khai triển theo cột 1:\n\\[ \\det(A) = 1 \\cdot \\begin{vmatrix} 3 & 4 \\\\ 1 & 2 \\end{vmatrix} = 1(3 \\times 2 - 4 \\times 1) = 6 - 4 = 2 \\]",
      "Sử dụng các tính chất của định thức đối với ma trận kích thước \\(3 \\times 3\\):\n- \\(\\det(2M) = 2^3 \\det(M) = 8\\det(M)\\)\n- \\(\\det(A^3 A^T A^{-1}) = (\\det A)^3 \\cdot (\\det A) \\cdot \\frac{1}{\\det A} = (\\det A)^3\\)",
      "Thay \\(\\det A = 2\\) vào:\n\\[ \\det(A^3 A^T A^{-1}) = 2^3 = 8 \\]\n\\[ \\det(2A^3 A^T A^{-1}) = 8 \\times 8 = 64 \\]",
      "Đáp án đúng là B (64)."
    ],
    image: "assets/questions/0207_q207_Question_207.png",
    needs_image: false,
    review_flags: [],
    confidence: "high"
  },
  {
    id: 208,
    chapter: "DSTT1",
    folder: "DSTT1",
    topic: "MaTran",
    type: "single_choice",
    question: "Find all values of \\(x\\) and \\(y\\) so that the matrix\n\\[ \\begin{bmatrix} y & 1 & x \\\\ 0 & x & y \\end{bmatrix} \\]\nis reduced row-echelon.",
    options: [
      "x = y = 0 or x = 0, y = 1",
      "x = y = 1",
      "None of the other choices is correct",
      "x = 1, y = 0",
      "x = 0, y = 0 only."
    ],
    answer: "A",
    answer_original: "A",
    answer_status: "verified",
    explanation: [
      "Các điều kiện của dạng bậc thang rút gọn (Reduced Row Echelon Form - RREF):\n1. Phần tử dẫn đầu khác 0 đầu tiên của mỗi hàng phải bằng 1.\n2. Cột chứa phần tử dẫn đầu 1 phải có các phần tử khác đều bằng 0.\n3. Phần tử dẫn đầu 1 của hàng dưới phải nằm bên phải phần tử dẫn đầu của hàng trên.\n4. Các hàng toàn số 0 (nếu có) phải nằm ở dưới cùng.",
      "Kiểm tra trường hợp \\(x = 0, y = 0\\):\nMa trận là \\(\\begin{bmatrix} 0 & 1 & 0 \\\\ 0 & 0 & 0 \\end{bmatrix}\\). Hàng 1 có phần tử dẫn đầu là 1 ở cột 2, cột 2 có các phần tử khác bằng 0, hàng 2 toàn số 0 ở dưới cùng. Thỏa mãn RREF.",
      "Kiểm tra trường hợp \\(x = 0, y = 1\\):\nMa trận là \\(\\begin{bmatrix} 1 & 1 & 0 \\\\ 0 & 0 & 1 \\end{bmatrix}\\). Hàng 1 có dẫn đầu 1 ở cột 1. Hàng 2 có dẫn đầu 1 ở cột 3 (nằm bên phải cột 1). Cột 1 và cột 3 đều có các phần tử khác bằng 0. Thỏa mãn RREF.",
      "Với các trường hợp khác như \\(x = 1\\), hàng 2 sẽ có phần tử 1 ở cột 2 trùng cột với phần tử 1 ở hàng 1, vi phạm tính chất cột dẫn đầu chỉ chứa duy nhất một số 1.",
      "Vậy nghiệm là \\(x = y = 0\\) hoặc \\(x = 0, y = 1\\). Đáp án đúng là A."
    ],
    image: "assets/questions/0208_q208_Question_208.png",
    needs_image: false,
    review_flags: [],
    confidence: "high"
  },
  {
    id: 209,
    chapter: "DSTT1",
    folder: "DSTT1",
    topic: "TriRieng",
    type: "single_choice",
    question: "Given that \\(-3\\) is an eigenvalue for the matrix\n\\[ \\begin{bmatrix} 3 & -6 \\\\ 8 & -11 \\end{bmatrix} \\]\nFind all eigenvectors corresponding to this eigenvalue \\(\\lambda = -3\\).",
    options: [
      "None of the other choices is correct",
      "t(1, -2), t is nonzero",
      "t(1, 1), t is nonzero",
      "t(2, 1), t is nonzero",
      "t(1, -1), t is nonzero"
    ],
    answer: "C",
    answer_original: "C",
    answer_status: "verified",
    explanation: [
      "Vectơ riêng ứng với \\(\\lambda = -3\\) là nghiệm khác 0 của hệ \\((A - \\lambda I)v = 0\\), tức \\((A + 3I)v = 0\\).",
      "Thiết lập ma trận hệ số:\n\\[ A + 3I = \\begin{bmatrix} 3 + 3 & -6 \\\\ 8 & -11 + 3 \\end{bmatrix} = \\begin{bmatrix} 6 & -6 \\\\ 8 & -8 \\end{bmatrix} \\]",
      "Biến đổi sơ cấp về dạng bậc thang đưa về một phương trình duy nhất:\n\\[ 6x_1 - 6x_2 = 0 \\iff x_1 = x_2 \\]",
      "Đặt \\(x_2 = t\\) (với \\(t \\ne 0\\)), ta có \\(x_1 = t\\).",
      "Không gian vectơ riêng gồm các vectơ có dạng \\(v = \\begin{bmatrix} t \\\\ t \\end{bmatrix} = t(1, 1)\\) với \\(t \\ne 0\\).",
      "Đáp án đúng là C."
    ],
    image: "assets/questions/0209_q209_Question_209.png",
    needs_image: false,
    review_flags: [],
    confidence: "high"
  },
  {
    id: 210,
    chapter: "DSTT1",
    folder: "DSTT1",
    topic: "VectorHinhHoc",
    type: "single_choice",
    question: "Let \\(\\{X, Y\\}\\) be an orthogonal set with \\(\\|X\\| = \\|Y\\| = 1\\). Which of the following sets are orthogonal?\n(i) \\(\\{X + Y, X - Y\\}\\)\n(ii) \\(\\{X + 2Y, X - Y\\}\\)",
    options: [
      "Only (i) is orthogonal",
      "Not enough information",
      "None of (i) and (ii) is orthogonal",
      "Only (ii) is orthogonal",
      "Both (i) and (ii) are orthogonal"
    ],
    answer: "A",
    answer_original: "A",
    answer_status: "verified",
    explanation: [
      "Theo giả thiết, \\(\\{X, Y\\}\\) trực giao và có độ dài đơn vị: \\(X \\cdot Y = 0\\), \\(\\|X\\|^2 = 1\\), \\(\\|Y\\|^2 = 1\\).",
      "Kiểm tra tập (i): Tính tích vô hướng của hai vectơ:\n\\[ (X + Y) \\cdot (X - Y) = X \\cdot X - X \\cdot Y + Y \\cdot X - Y \\cdot Y = \\|X\\|^2 - \\|Y\\|^2 = 1 - 1 = 0 \\]\nVì tích vô hướng bằng 0 nên tập (i) là tập trực giao.",
      "Kiểm tra tập (ii): Tính tích vô hướng:\n\\[ (X + 2Y) \\cdot (X - Y) = X \\cdot X - X \\cdot Y + 2Y \\cdot X - 2Y \\cdot Y = \\|X\\|^2 - 2\\|Y\\|^2 = 1 - 2(1) = -1 \\ne 0 \\]\nVì tích vô hướng khác 0 nên tập (ii) không trực giao.",
      "Vậy chỉ có tập (i) là trực giao (Only (i) is orthogonal). Đáp án đúng là A."
    ],
    image: "assets/questions/0210_q210_Question_210.png",
    needs_image: false,
    review_flags: [],
    confidence: "high"
  },
  {
    id: 211,
    chapter: "GT1",
    folder: "GT1",
    topic: "CucTri",
    type: "single_choice",
    question: "Find the absolute minimum and absolute maximum values of\n\\[ f(x) = x^3 - 3x^2 + 1 \\]\non \\([-1, 3]\\)",
    options: [
      "Absolute maximum: 3, no absolute minimum",
      "Absolute maximum: 1, absolute minimum: -3",
      "Absolute maximum: 3, absolute minimum: -1",
      "No absolute maximum, absolute minimum: -3",
      "None of the other choices is correct"
    ],
    answer: "B",
    answer_original: "B",
    answer_status: "verified",
    explanation: [
      "Tìm đạo hàm bậc nhất:\n\\[ f'(x) = 3x^2 - 6x = 3x(x - 2) \\]\nGiải phương trình \\(f'(x) = 0\\) trên khoảng \\((-1, 3)\\) thu được hai điểm tới hạn: \\(x = 0\\) và \\(x = 2\\).",
      "Tính giá trị của \\(f(x)\\) tại các điểm tới hạn và tại hai đầu mút khoảng:\n- Tại đầu mút \\(x = -1\\): \\(f(-1) = (-1)^3 - 3(-1)^2 + 1 = -1 - 3 + 1 = -3\\)\n- Tại điểm tới hạn \\(x = 0\\): \\(f(0) = 0 - 0 + 1 = 1\\)\n- Tại điểm tới hạn \\(x = 2\\): \\(f(2) = 2^3 - 3(2^2) + 1 = 8 - 12 + 1 = -3\\)\n- Tại đầu mút \\(x = 3\\): \\(f(3) = 3^3 - 3(3^2) + 1 = 27 - 27 + 1 = 1\\)",
      "So sánh các giá trị:\n- Giá trị lớn nhất tuyệt đối (Absolute maximum) là 1 (đạt tại \\(x = 0\\) và \\(x = 3\\)).\n- Giá trị nhỏ nhất tuyệt đối (Absolute minimum) là -3 (đạt tại \\(x = -1\\) và \\(x = 2\\)).",
      "Đáp án đúng là B."
    ],
    image: "assets/questions/0211_q211_Question_211.png",
    needs_image: false,
    review_flags: [],
    confidence: "high"
  },
  {
    id: 212,
    chapter: "DSTT1",
    folder: "DSTT1",
    topic: "HePhuongTrinh",
    type: "single_choice",
    question: "Find the solution of the linear system whose augmented matrix is\n\\[ \\left[\\begin{array}{cccc|c} 1 & 2 & 4 & 6 & 9 \\\\ 0 & 0 & 1 & 2 & 3 \\\\ 0 & 0 & 0 & 1 & 1 \\end{array}\\right] \\]",
    options: [
      "none of the other choices is true",
      "(-1 - 2t, t, 1, 1)",
      "(-1, 0, 1, 1)",
      "the system is inconsistent"
    ],
    answer: "B",
    answer_original: "B",
    answer_status: "verified",
    explanation: [
      "Hệ phương trình có 4 ẩn \\(x_1, x_2, x_3, x_4\\). Ma trận bổ sung đã ở dạng bậc thang.",
      "Các cột chứa phần tử chốt (pivot) là cột 1, 3, 4. Cột 2 không có pivot, nên \\(x_2\\) là ẩn tự do: đặt \\(x_2 = t\\).",
      "Giải ngược từ dưới lên:\n- Từ hàng 3: \\(x_4 = 1\\)\n- Từ hàng 2: \\(x_3 + 2x_4 = 3 \\implies x_3 + 2(1) = 3 \\implies x_3 = 1\\)\n- Từ hàng 1: \\(x_1 + 2x_2 + 4x_3 + 6x_4 = 9 \\implies x_1 + 2t + 4(1) + 6(1) = 9 \\implies x_1 + 2t + 10 = 9 \\implies x_1 = -1 - 2t\\)",
      "Vậy nghiệm tổng quát là \\((x_1, x_2, x_3, x_4) = (-1 - 2t, t, 1, 1)\\).",
      "Đáp án đúng là B."
    ],
    image: "assets/questions/0212_q212_Question_212.png",
    needs_image: false,
    review_flags: [],
    confidence: "high"
  },
  {
    id: 213,
    chapter: "GT1",
    folder: "GT1",
    topic: "GioiHan",
    type: "single_choice",
    question: "Find the constant \\(c\\) that makes \\(g\\) continuous on \\((-\\infty; \\infty)\\)\n\\[ g(x) = \\begin{cases} \\frac{x^2 - 2x - 8}{x + 2} & \\text{if } x \\ne -2 \\\\ cx + 1 & \\text{if } x = -2 \\end{cases} \\]",
    options: [
      "-7/2",
      "3/2",
      "0",
      "None of the other choices is correct",
      "7/2",
      "-3/2"
    ],
    answer: "E",
    answer_original: "E",
    answer_status: "verified",
    explanation: [
      "Hàm số liên tục trên \\((-\\infty, \\infty)\\) khi và chỉ khi nó liên tục tại điểm nối \\(x = -2\\), tức là:\n\\[ \\lim_{x \\to -2} g(x) = g(-2) \\]",
      "Tính giới hạn khi \\(x \\to -2\\):\n\\[ \\lim_{x \\to -2} \\frac{x^2 - 2x - 8}{x + 2} = \\lim_{x \\to -2} \\frac{(x + 2)(x - 4)}{x + 2} = \\lim_{x \\to -2} (x - 4) = -2 - 4 = -6 \\]",
      "Giá trị hàm số tại \\(x = -2\\):\n\\[ g(-2) = c(-2) + 1 = -2c + 1 \\]",
      "Cho hai giá trị bằng nhau:\n\\[ -2c + 1 = -6 \\iff -2c = -7 \\iff c = \\frac{7}{2} \\]",
      "Đáp án đúng là E (7/2)."
    ],
    image: "assets/questions/0213_q213_Question_213.png",
    needs_image: false,
    review_flags: [],
    confidence: "high"
  },
  {
    id: 214,
    chapter: "GT1",
    folder: "GT1",
    topic: "CucTri",
    type: "single_choice",
    question: "Determine where the given function is increasing and where it is decreasing\n\\[ f(x) = x^2 + 5x - 9 \\]\n(i) Decreasing on \\((-\\infty, 5/2)\\), increasing on \\((5/2, \\infty)\\)\n(ii) Decreasing on \\((-\\infty, -5/2)\\), increasing on \\((-5/2, \\infty)\\)\n(iii) Increasing on \\((-\\infty, -5/2)\\) and \\((0, \\infty)\\), decreasing on \\((-5/2, 0)\\)\n(iv) Increasing on \\((-\\infty, -5/2)\\), decreasing on \\((-5/2, \\infty)\\)",
    options: [
      "(ii)",
      "(iii)",
      "(i)",
      "None of the other choices is correct",
      "(iv)"
    ],
    answer: "A",
    answer_original: "A",
    answer_status: "verified",
    explanation: [
      "Tính đạo hàm bậc nhất của hàm số:\n\\[ f'(x) = 2x + 5 \\]",
      "Xét dấu của đạo hàm:\n- \\(f'(x) > 0 \\iff 2x + 5 > 0 \\iff x > -5/2\\): Hàm số đồng biến (increasing) trên khoảng \\((-5/2, \\infty)\\).\n- \\(f'(x) < 0 \\iff 2x + 5 < 0 \\iff x < -5/2\\): Hàm số nghịch biến (decreasing) trên khoảng \\((-\\infty, -5/2)\\).",
      "Kết luận này trùng với khẳng định (ii). Lựa chọn A tương ứng với (ii).",
      "Đáp án đúng là A."
    ],
    image: "assets/questions/0214_q214_Question_214.png",
    needs_image: false,
    review_flags: [],
    confidence: "high"
  },
  {
    id: 215,
    chapter: "DSTT1",
    folder: "DSTT1",
    topic: "TriRieng",
    type: "single_choice",
    question: "Find all the eigenvalues of the matrix\n\\[ \\mathbf{A} = \\begin{bmatrix} 2 & 3 & 4 \\\\ 0 & 5 & 0 \\\\ 0 & 6 & 7 \\end{bmatrix} \\]",
    options: [
      "None of the others",
      "2; 5; 7",
      "2; 4; 7",
      "2; 5; 6"
    ],
    answer: "B",
    answer_original: "B",
    answer_status: "verified",
    explanation: [
      "Thiết lập phương trình đặc trưng \\(\\det(\\mathbf{A} - \\lambda I) = 0\\):\n\\[ \\begin{vmatrix} 2 - \\lambda & 3 & 4 \\\\ 0 & 5 - \\lambda & 0 \\\\ 0 & 6 & 7 - \\lambda \\end{vmatrix} = 0 \\]",
      "Khai triển theo dòng 2 (có hai phần tử bằng 0):\n\\[ (5 - \\lambda) \\cdot \\begin{vmatrix} 2 - \\lambda & 4 \\\\ 0 & 7 - \\lambda \\end{vmatrix} = (5 - \\lambda)(2 - \\lambda)(7 - \\lambda) = 0 \\]",
      "Các nghiệm của phương trình là các giá trị riêng:\n\\[ \\lambda = 2, \\quad \\lambda = 5, \\quad \\lambda = 7 \\]",
      "Đáp án đúng là B (2; 5; 7)."
    ],
    image: "assets/questions/0215_q215_Question_215.png",
    needs_image: false,
    review_flags: [],
    confidence: "high"
  },
  {
    id: 216,
    chapter: "DSTT1",
    folder: "DSTT1",
    topic: "DinhThuc",
    type: "single_choice",
    question: "Compute the determinant of the following matrix\n\\[ A = \\begin{bmatrix} 2 & \\frac{3}{2} & \\frac{5}{2} \\\\ 0 & 1 & 7 \\\\ 0 & 0 & 9 \\end{bmatrix} \\]",
    options: [
      "0",
      "-18",
      "53/2",
      "1",
      "18"
    ],
    answer: "E",
    answer_original: "E",
    answer_status: "verified",
    explanation: [
      "Ma trận \\(A\\) là ma trận tam giác trên (upper triangular matrix) vì tất cả các phần tử nằm phía dưới đường chéo chính đều bằng 0.",
      "Định thức của một ma trận tam giác bằng tích các phần tử trên đường chéo chính:\n\\[ \\det(A) = 2 \\times 1 \\times 9 = 18 \\]",
      "Đáp án đúng là E (18)."
    ],
    image: "assets/questions/0216_q216_Question_216.png",
    needs_image: false,
    review_flags: [],
    confidence: "high"
  },
  {
    id: 217,
    chapter: "GT1",
    folder: "GT1",
    topic: "TichPhan",
    type: "single_choice",
    question: "Evaluate \\(\\int_0^1 \\frac{4x\\,dx}{\\sqrt{4 + 2x^2}}\\)\n(i) \\(2\\sqrt{6} - 4\\)\n(ii) \\(\\sqrt{6} - 2\\)\n(iii) \\(\\sqrt{6}/2 - 1\\)\n(iv) \\(-2\\sqrt{6} + 4\\)",
    options: [
      "(iii)",
      "(iv)",
      "(i)",
      "(ii)",
      "None of the other choices is correct"
    ],
    answer: "C",
    answer_original: "C",
    answer_status: "verified",
    explanation: [
      "Đặt ẩn phụ: \\(u = 4 + 2x^2 \\implies du = 4x\\,dx\\).",
      "Đổi cận:\n- Khi \\(x = 0 \\implies u = 4 + 2(0)^2 = 4\\)\n- Khi \\(x = 1 \\implies u = 4 + 2(1)^2 = 6\\)",
      "Tích phân trở thành:\n\\[ \\int_4^6 \\frac{du}{\\sqrt{u}} = \\int_4^6 u^{-1/2}\\,du = \\left[ 2\\sqrt{u} \\right]_4^6 = 2\\sqrt{6} - 2\\sqrt{4} = 2\\sqrt{6} - 4 \\]",
      "Kết quả khớp với khẳng định (i). Lựa chọn C tương ứng với (i).",
      "Đáp án đúng là C."
    ],
    image: "assets/questions/0217_q217_Question_217.png",
    needs_image: false,
    review_flags: [],
    confidence: "high"
  },
  {
    id: 218,
    chapter: "GT1",
    folder: "GT1",
    topic: "TichPhan",
    type: "single_choice",
    question: "Evaluate \\(\\int_2^{+\\infty} e^{-x}\\,dx\\)\n(i) \\(\\frac{1}{e^2}\\)\n(ii) \\(\\frac{1}{e}\\)\n(iii) \\(-\\frac{1}{e^2}\\)\n(iv) 0",
    options: [
      "(ii)",
      "(i)",
      "(iii)",
      "(iv)"
    ],
    answer: "B",
    answer_original: "B",
    answer_status: "verified",
    explanation: [
      "Đây là tích phân suy rộng loại 1. Tính theo định nghĩa giới hạn:\n\\[ \\int_2^{+\\infty} e^{-x}\\,dx = \\lim_{b \\to +\\infty} \\int_2^b e^{-x}\\,dx = \\lim_{b \\to +\\infty} \\left[ -e^{-x} \\right]_2^b \\]",
      "Thay cận vào biểu thức:\n\\[ = \\lim_{b \\to +\\infty} \\left( -e^{-b} - (-e^{-2}) \\right) = \\lim_{b \\to +\\infty} \\left( -\\frac{1}{e^b} + \\frac{1}{e^2} \\right) \\]",
      "Vì \\(\\lim_{b \\to +\\infty} \\frac{1}{e^b} = 0\\), ta thu được:\n\\[ 0 + \\frac{1}{e^2} = \\frac{1}{e^2} \\]",
      "Kết quả khớp với mệnh đề (i). Lựa chọn B tương ứng với (i).",
      "Đáp án đúng là B."
    ],
    image: "assets/questions/0218_q218_Question_218.png",
    needs_image: false,
    review_flags: [],
    confidence: "high"
  },
  {
    id: 219,
    chapter: "GT1",
    folder: "GT1",
    topic: "DaoHam",
    type: "single_choice",
    question: "Find \\(\\frac{d^2 y}{dx^2}\\) for \\(y = \\sqrt{3x - 7}\\)\n(i) \\(\\frac{9}{4(3x-7)^{3/2}}\\)\n(ii) \\(-\\frac{1}{4(3x-7)^{3/2}}\\)\n(iii) \\(-\\frac{9}{4(3x-7)^{3/2}}\\)\n(iv) \\(-\\frac{9}{4(3x-7)^{1/2}}\\)",
    options: [
      "(iii)",
      "(ii)",
      "None of the other choices is correct",
      "(iv)",
      "(i)"
    ],
    answer: "A",
    answer_original: "A",
    answer_status: "verified",
    explanation: [
      "Viết lại hàm số dưới dạng lũy thừa: \\(y = (3x - 7)^{1/2}\\).",
      "Tính đạo hàm cấp 1 theo quy tắc chuỗi:\n\\[ \\frac{dy}{dx} = \\frac{1}{2}(3x - 7)^{-1/2} \\cdot (3x - 7)' = \\frac{1}{2}(3x - 7)^{-1/2} \\cdot 3 = \\frac{3}{2}(3x - 7)^{-1/2} \\]",
      "Tính đạo hàm cấp 2:\n\\[ \\frac{d^2 y}{dx^2} = \\frac{3}{2} \\cdot \\left(-\\frac{1}{2}\\right)(3x - 7)^{-3/2} \\cdot (3x - 7)' = -\\frac{3}{4}(3x - 7)^{-3/2} \\cdot 3 = -\\frac{9}{4(3x - 7)^{3/2}} \\]",
      "Khẳng định này khớp với (iii). Lựa chọn A tương ứng với (iii).",
      "Đáp án đúng là A."
    ],
    image: "assets/questions/0219_q219_Question_219.png",
    needs_image: false,
    review_flags: [],
    confidence: "high"
  },
  {
    id: 220,
    chapter: "GT1",
    folder: "GT1",
    topic: "TichPhan",
    type: "single_choice",
    question: "Evaluate \\(\\int_1^4 \\frac{t^2 + 1}{\\sqrt{t}}\\,dt\\)",
    options: [
      "72/5",
      "77/5",
      "None of the other choices is correct",
      "32",
      "92/5"
    ],
    answer: "A",
    answer_original: "A",
    answer_status: "verified",
    explanation: [
      "Chia từng số hạng của tử số cho mẫu số \\(\\sqrt{t} = t^{1/2}\\):\n\\[ \\frac{t^2 + 1}{t^{1/2}} = t^{2 - 1/2} + t^{-1/2} = t^{3/2} + t^{-1/2} \\]",
      "Tìm nguyên hàm:\n\\[ \\int (t^{3/2} + t^{-1/2})\\,dt = \\frac{t^{5/2}}{5/2} + \\frac{t^{1/2}}{1/2} = \\frac{2}{5}t^{5/2} + 2\\sqrt{t} \\]",
      "Tính tích phân từ 1 đến 4:\n- Tại \\(t = 4\\): \\(\\frac{2}{5}(4^{5/2}) + 2\\sqrt{4} = \\frac{2}{5}(32) + 2(2) = \\frac{64}{5} + 4 = \\frac{84}{5}\\)\n- Tại \\(t = 1\\): \\(\\frac{2}{5}(1^{5/2}) + 2\\sqrt{1} = \\frac{2}{5} + 2 = \\frac{12}{5}\\)",
      "Hiệu hai giá trị:\n\\[ \\frac{84}{5} - \\frac{12}{5} = \\frac{72}{5} \\]",
      "Đáp án đúng là A."
    ],
    image: "assets/questions/0220_q220_Question_220.png",
    needs_image: false,
    review_flags: [],
    confidence: "high"
  },
  {
    id: 221,
    chapter: "DSTT1",
    folder: "DSTT1",
    topic: "KhongGianVector",
    type: "single_choice",
    question: "Which of the following statements is true?\n(i) \\(\\left\\{ \\begin{bmatrix} 1 \\\\ 2 \\\\ 3 \\end{bmatrix}, \\begin{bmatrix} 1 \\\\ -1 \\\\ 0 \\end{bmatrix}, \\begin{bmatrix} 4 \\\\ -1 \\\\ 3 \\end{bmatrix} \\right\\}\\) is a basis of \\(\\mathbb{R}^3\\).\n(ii) \\(\\left\\{ \\begin{bmatrix} 3 \\\\ 1 \\end{bmatrix}, \\begin{bmatrix} 1 \\\\ 2 \\end{bmatrix}, \\begin{bmatrix} 1 \\\\ -3 \\end{bmatrix} \\right\\}\\) is a basis of \\(\\mathbb{R}^2\\).",
    options: [
      "Neither (i) nor (ii)",
      "Both (i) and (ii)",
      "(i)",
      "(ii)"
    ],
    answer: "A",
    answer_original: "A",
    answer_status: "verified",
    explanation: [
      "Xét mệnh đề (i): Nhận thấy vectơ thứ ba là tổ hợp tuyến tính của hai vectơ đầu:\n\\[ 1\\begin{bmatrix} 1 \\\\ 2 \\\\ 3 \\end{bmatrix} + 3\\begin{bmatrix} 1 \\\\ -1 \\\\ 0 \\end{bmatrix} = \\begin{bmatrix} 1 + 3 \\\\ 2 - 3 \\\\ 3 + 0 \\end{bmatrix} = \\begin{bmatrix} 4 \\\\ -1 \\\\ 3 \\end{bmatrix} \\]\nDo đó ba vectơ này phụ thuộc tuyến tính, không thể tạo thành cơ sở của \\(\\mathbb{R}^3\\). Mệnh đề (i) SAI.",
      "Xét mệnh đề (ii): Không gian \\(\\mathbb{R}^2\\) có số chiều bằng 2, vì vậy một cơ sở của \\(\\mathbb{R}^2\\) phải chứa ĐÚNG 2 vectơ độc lập tuyến tính. Tập hợp gồm 3 vectơ trong \\(\\mathbb{R}^2\\) luôn phụ thuộc tuyến tính nên không thể là cơ sở. Mệnh đề (ii) SAI.",
      "Vậy cả hai mệnh đề đều sai (Neither (i) nor (ii)). Đáp án đúng là A."
    ],
    image: "assets/questions/0221_q221_Question_221.png",
    needs_image: false,
    review_flags: [],
    confidence: "high"
  },
  {
    id: 222,
    chapter: "GT1",
    folder: "GT1",
    topic: "DaoHam",
    type: "single_choice",
    question: "Find a linear approximation for\n\\[ f(x) = e^{2x} \\]\nat \\(a = 0\\).",
    options: [
      "x",
      "2x + 1",
      "2x",
      "None of the other choices is correct",
      "x + 1"
    ],
    answer: "B",
    answer_original: "B",
    answer_status: "verified",
    explanation: [
      "Công thức xấp xỉ tuyến tính tại \\(x = a\\) là \\(L(x) = f(a) + f'(a)(x - a)\\).",
      "Với \\(f(x) = e^{2x}\\) và \\(a = 0\\):\n- \\(f(0) = e^0 = 1\\)\n- \\(f'(x) = 2e^{2x} \\implies f'(0) = 2e^0 = 2\\)",
      "Thay vào công thức:\n\\[ L(x) = 1 + 2(x - 0) = 2x + 1 \\]",
      "Đáp án đúng là B (2x + 1)."
    ],
    image: "assets/questions/0222_q222_Question_222.png",
    needs_image: false,
    review_flags: [],
    confidence: "high"
  },
  {
    id: 223,
    chapter: "DSTT1",
    folder: "DSTT1",
    topic: "VectorHinhHoc",
    type: "single_choice",
    question: "Let \\(T : \\mathbb{R}^2 \\to \\mathbb{R}^2\\) be rotation through \\(-\\pi/2\\) and let \\(u = [3 \\quad 0]^T, v = [0 \\quad 4]^T\\). Find the area of the parallelogram determined by \\(T(u)\\) and \\(T(v)\\).",
    options: [
      "12",
      "6",
      "0",
      "None of the other choices is correct"
    ],
    answer: "A",
    answer_original: "B",
    answer_status: "conflict",
    explanation: [
      "Phép quay \\(T\\) là một phép dời hình (isometry) bảo toàn độ dài, góc và diện tích hình học.",
      "Diện tích hình bình hành (parallelogram) tạo bởi \\(T(u)\\) và \\(T(v)\\) bằng diện tích hình bình hành tạo bởi \\(u\\) và \\(v\\):\n\\[ \\operatorname{Area} = |\\det([u, v])| = \\left| \\det \\begin{bmatrix} 3 & 0 \\\\ 0 & 4 \\end{bmatrix} \\right| = |3 \\times 4 - 0 \\times 0| = 12 \\]",
      "Lưu ý: Ngân hàng đề thi cũ lưu đáp án B (6) do tác giả đề nhầm lẫn diện tích hình bình hành (parallelogram) với diện tích hình tam giác (triangle) có công thức \\(\\frac{1}{2}|\\det| = \\frac{1}{2}(12) = 6\\). Đề bài yêu cầu diện tích hình bình hành nên giá trị chính xác tuyệt đối phải là 12 (lựa chọn A)."
    ],
    image: "assets/questions/0223_q223_Question_223.png",
    needs_image: false,
    review_flags: [
      "ANSWER_CONFLICT: Bank has B (6), mathematically correct is A (12). Question asks for parallelogram area (base * height = 12), author used triangle formula (1/2 * 12 = 6)."
    ],
    confidence: "high"
  },
  {
    id: 224,
    chapter: "DSTT1",
    folder: "DSTT1",
    topic: "VectorHinhHoc",
    type: "single_choice",
    question: "Let \\(u = [3 \\quad 0 \\quad 5]^T, v = [-1 \\quad 2 \\quad 2]^T\\).\nFind the vector \\(x\\) such that\n\\[ 2u - v = \\|v\\|(5x + v) \\]\n(i) \\(\\frac{5}{8} [9 \\quad -8 \\quad 12]^T\\)\n(ii) \\(\\frac{1}{15} [9 \\quad -7 \\quad 2]^T\\)\n(iii) \\(\\frac{1}{15} [10 \\quad -8 \\quad 2]^T\\)\n(iv) \\(\\frac{5}{8} [9 \\quad 8 \\quad 12]^T\\)",
    options: [
      "(iii)",
      "(ii)",
      "(i)",
      "(iv)",
      "None of the other choices is correct"
    ],
    answer: "A",
    answer_original: "A",
    answer_status: "verified",
    explanation: [
      "Tính độ dài vectơ \\(v\\):\n\\[ \\|v\\| = \\sqrt{(-1)^2 + 2^2 + 2^2} = \\sqrt{1 + 4 + 4} = \\sqrt{9} = 3 \\]",
      "Phương trình trở thành:\n\\[ 2u - v = 3(5x + v) = 15x + 3v \\iff 15x = 2u - 4v \\iff x = \\frac{1}{15}(2u - 4v) \\]",
      "Tính vectơ \\(2u - 4v\\):\n\\[ 2u = 2[3, 0, 5]^T = [6, 0, 10]^T \\]\n\\[ 4v = 4[-1, 2, 2]^T = [-4, 8, 8]^T \\]\n\\[ 2u - 4v = [6 - (-4), 0 - 8, 10 - 8]^T = [10, -8, 2]^T \\]",
      "Suy ra \\(x = \\frac{1}{15} [10, -8, 2]^T\\). Khẳng định này khớp với (iii). Lựa chọn A tương ứng với (iii).",
      "Đáp án đúng là A."
    ],
    image: "assets/questions/0224_q224_Question_224.png",
    needs_image: false,
    review_flags: [],
    confidence: "high"
  },
  {
    id: 225,
    chapter: "DSTT1",
    folder: "DSTT1",
    topic: "MaTran",
    type: "single_choice",
    question: "Let \\(A\\) be a \\(30 \\times 70\\) matrix having \\(\\operatorname{rank} A = 20\\). Find \\(\\dim(\\operatorname{Col}(A))\\), \\(\\dim(\\operatorname{Row}(A))\\) and \\(\\dim(\\operatorname{Null}(A))\\).",
    options: [
      "70, 30, 20",
      "20, 20, 40",
      "20, 30, 50",
      "None of the other choices is correct."
    ],
    answer: "D",
    answer_original: "D",
    answer_status: "verified",
    explanation: [
      "Theo định lý về hạng (Rank Theorem):\n- Số chiều không gian cột: \\(\\dim(\\operatorname{Col}(A)) = \\operatorname{rank}(A) = 20\\).\n- Số chiều không gian hàng: \\(\\dim(\\operatorname{Row}(A)) = \\operatorname{rank}(A) = 20\\).",
      "Theo định lý Rank-Nullity: Với ma trận \\(m \\times n\\) (ở đây số cột \\(n = 70\\)):\n\\[ \\operatorname{rank}(A) + \\dim(\\operatorname{Null}(A)) = n \\implies 20 + \\dim(\\operatorname{Null}(A)) = 70 \\implies \\dim(\\operatorname{Null}(A)) = 50 \\]",
      "Ba giá trị cần tìm lần lượt là: 20, 20, 50.",
      "Quan sát các phương án: A là (70, 30, 20), B là (20, 20, 40), C là (20, 30, 50). Không có phương án nào chứa bộ số (20, 20, 50).",
      "Do đó đáp án chính xác là D (None of the other choices is correct)."
    ],
    image: "assets/questions/0225_q225_Question_225.png",
    needs_image: false,
    review_flags: [],
    confidence: "high"
  },
  {
    id: 226,
    chapter: "DSTT1",
    folder: "DSTT1",
    topic: "VectorHinhHoc",
    type: "single_choice",
    question: "Find the value of \\(t\\) for which \\((4, 6, t)\\) is a linear combination of the vectors \\((1, 3, 1), (2, 8, -1)\\)",
    options: [
      "4",
      "11",
      "0",
      "7",
      "13",
      "None of the other choices is correct"
    ],
    answer: "E",
    answer_original: "E",
    answer_status: "verified",
    explanation: [
      "Để \\((4, 6, t)\\) là tổ hợp tuyến tính của \\((1, 3, 1)\\) và \\((2, 8, -1)\\), phải tồn tại các hệ số \\(c_1, c_2\\) sao cho:\n\\[ c_1(1, 3, 1) + c_2(2, 8, -1) = (4, 6, t) \\]",
      "Thiết lập hệ phương trình cho 2 thành phần đầu:\n\\[ \\begin{cases} c_1 + 2c_2 = 4 \\\\ 3c_1 + 8c_2 = 6 \\end{cases} \\]",
      "Nhân phương trình thứ nhất với 3 rồi trừ đi phương trình thứ hai:\n\\[ (3c_1 + 6c_2) - (3c_1 + 8c_2) = 12 - 6 \\implies -2c_2 = 6 \\implies c_2 = -3 \\]",
      "Thay \\(c_2 = -3\\) vào phương trình đầu:\n\\[ c_1 + 2(-3) = 4 \\implies c_1 = 10 \\]",
      "Thay \\(c_1, c_2\\) vào thành phần thứ ba để tìm \\(t\\):\n\\[ t = c_1(1) + c_2(-1) = 10(1) + (-3)(-1) = 10 + 3 = 13 \\]",
      "Đáp án đúng là E (13)."
    ],
    image: "assets/questions/0226_q226_Question_226.png",
    needs_image: false,
    review_flags: [],
    confidence: "high"
  },
  {
    id: 227,
    chapter: "DSTT1",
    folder: "DSTT1",
    topic: "VectorHinhHoc",
    type: "single_choice",
    question: "Find the shortest distance between two parallel lines\n\\[ (L_1) : [x, y, z] = [-1, 1, 2] + t[2, 1, 1] \\]\n\\[ (L_2) : [x, y, z] = [0, 3, 1] + t[2, 1, 1] \\]\n(i) \\(\\sqrt{3}\\)\n(ii) \\(\\frac{3\\sqrt{2}}{2}\\)\n(iii) \\(\\frac{3\\sqrt{2}}{4}\\)\n(iv) \\(\\frac{3}{2}\\)",
    options: [
      "(iv)",
      "(iii)",
      "(i)",
      "None of the other choices is correct",
      "(ii)"
    ],
    answer: "E",
    answer_original: "E",
    answer_status: "verified",
    explanation: [
      "Vectơ chỉ phương chung của hai đường thẳng là \\(\\mathbf{d} = [2, 1, 1]\\).",
      "Lấy điểm \\(P_1(-1, 1, 2) \\in L_1\\) và \\(P_2(0, 3, 1) \\in L_2\\). Vectơ nối hai điểm là:\n\\[ \\mathbf{P_1P_2} = [0 - (-1), 3 - 1, 1 - 2] = [1, 2, -1] \\]",
      "Tính tích có hướng \\(\\mathbf{P_1P_2} \\times \\mathbf{d}\\):\n\\[ \\mathbf{P_1P_2} \\times \\mathbf{d} = \\begin{vmatrix} \\mathbf{i} & \\mathbf{j} & \\mathbf{k} \\\\ 1 & 2 & -1 \\\\ 2 & 1 & 1 \\end{vmatrix} = \\mathbf{i}(2 + 1) - \\mathbf{j}(1 + 2) + \\mathbf{k}(1 - 4) = [3, -3, -3] \\]",
      "Tính độ dài:\n- \\(\\|\\mathbf{P_1P_2} \\times \\mathbf{d}\\| = \\sqrt{3^2 + (-3)^2 + (-3)^2} = \\sqrt{27} = 3\\sqrt{3}\\)\n- \\(\\|\\mathbf{d}\\| = \\sqrt{2^2 + 1^2 + 1^2} = \\sqrt{6}\\)",
      "Khoảng cách giữa hai đường thẳng song song là:\n\\[ D = \\frac{\\|\\mathbf{P_1P_2} \\times \\mathbf{d}\\|}{\\|\\mathbf{d}\\|} = \\frac{3\\sqrt{3}}{\\sqrt{6}} = \\frac{3}{\\sqrt{2}} = \\frac{3\\sqrt{2}}{2} \\]",
      "Kết quả khớp với mệnh đề (ii). Lựa chọn E tương ứng với (ii). Đáp án đúng là E."
    ],
    image: "assets/questions/0227_q227_Question_227.png",
    needs_image: false,
    review_flags: [],
    confidence: "high"
  },
  {
    id: 228,
    chapter: "GT1",
    folder: "GT1",
    topic: "UngDungDaoHam",
    type: "single_choice",
    question: "A box with a square base and open top must have a volume of 13500 (in cubic centimeter). Find the dimensions of the box that minimize the amount of material used.",
    options: [
      "The box is of side length 15 cm and height 20 cm",
      "The box is of side length 20 cm and height 15 cm",
      "The box is of side length 30 cm and height 15 cm",
      "The box is of side length 15 cm and height 30 cm"
    ],
    answer: "C",
    answer_original: "C",
    answer_status: "verified",
    explanation: [
      "Gọi cạnh đáy hình vuông là \\(x\\) (cm) và chiều cao hình hộp là \\(h\\) (cm) với \\(x, h > 0\\).",
      "Thể tích của hộp là:\n\\[ V = x^2 h = 13500 \\implies h = \\frac{13500}{x^2} \\]",
      "Diện tích vật liệu sử dụng (hộp không nắp gồm 1 đáy và 4 mặt bên):\n\\[ S(x) = x^2 + 4xh = x^2 + 4x\\left(\\frac{13500}{x^2}\\right) = x^2 + \\frac{54000}{x} \\]",
      "Lấy đạo hàm để tìm cực tiểu:\n\\[ S'(x) = 2x - \\frac{54000}{x^2} = 0 \\iff 2x^3 = 54000 \\iff x^3 = 27000 \\iff x = 30\\text{ cm} \\]",
      "Tính chiều cao tương ứng:\n\\[ h = \\frac{13500}{30^2} = \\frac{13500}{900} = 15\\text{ cm} \\]",
      "Vậy kích thước tối ưu là cạnh đáy 30 cm và chiều cao 15 cm. Đáp án đúng là C."
    ],
    image: "assets/questions/0228_q228_Question_228.png",
    needs_image: false,
    review_flags: [],
    confidence: "high"
  },
  {
    id: 229,
    chapter: "GT1",
    folder: "GT1",
    topic: "TichPhan",
    type: "single_choice",
    question: "Suppose \\(f(x)\\) is continuous and differentiable, \\(f(1) = 5\\) and \\(\\int_0^1 f(x)\\,dx = 8\\). Find \\(\\int_0^1 x f'(x)\\,dx\\).",
    options: [
      "-2",
      "-1",
      "1",
      "3",
      "-3",
      "2"
    ],
    answer: "E",
    answer_original: "F",
    answer_status: "conflict",
    explanation: [
      "Áp dụng phương pháp tích phân từng phần: đặt \\(u = x\\) và \\(dv = f'(x)\\,dx\\).",
      "Suy ra \\(du = dx\\) và \\(v = f(x)\\).",
      "Công thức tích phân từng phần:\n\\[ \\int_0^1 x f'(x)\\,dx = \\left[ x f(x) \\right]_0^1 - \\int_0^1 f(x)\\,dx \\]",
      "Thay các cận và dữ kiện đã cho:\n\\[ = \\left( 1 \\cdot f(1) - 0 \\cdot f(0) \\right) - \\int_0^1 f(x)\\,dx = f(1) - 8 = 5 - 8 = -3 \\]",
      "Lưu ý: Ngân hàng đề thi cũ lưu đáp án F (2). Đây là lỗi tính toán của tác giả ra đề khi áp dụng công thức tích phân từng phần. Kết quả toán học chuẩn xác là \\(-3\\) (lựa chọn E)."
    ],
    image: "assets/questions/0229_q229_Question_229.png",
    needs_image: false,
    review_flags: [
      "ANSWER_CONFLICT: Bank has F (2), mathematically correct is E (-3). Standard integration by parts gives [x f(x)]_0^1 - int_0^1 f(x)dx = 5 - 8 = -3."
    ],
    confidence: "high"
  },
  {
    id: 230,
    chapter: "DSTT1",
    folder: "DSTT1",
    topic: "MaTran",
    type: "single_choice",
    question: "The sizes of two matrices A and B are \\(2 \\times 1\\) and \\(1 \\times 1\\), respectively. Find the sizes of the products AB and BA, if they are defined.",
    options: [
      "AB is 2 x 1, BA is undefined.",
      "AB is 2 x 2, BA is 1 x 1.",
      "AB is undefined, BA is 1 x 2.",
      "AB is 1 x 2, BA is 1 x 1.",
      "None of the other choices is correct"
    ],
    answer: "A",
    answer_original: "A",
    answer_status: "verified",
    explanation: [
      "Quy tắc nhân ma trận: Tích \\(M \\cdot N\\) xác định khi và chỉ khi số cột của ma trận trước bằng số hàng của ma trận sau.",
      "- Xét tích \\(AB\\): \\(A\\) có kích thước \\(2 \\times 1\\) (1 cột) và \\(B\\) có kích thước \\(1 \\times 1\\) (1 hàng). Vì số cột của \\(A\\) bằng số hàng của \\(B\\) (đều bằng 1), tích \\(AB\\) xác định và có kích thước \\(2 \\times 1\\).",
      "- Xét tích \\(BA\\): \\(B\\) có kích thước \\(1 \\times 1\\) (1 cột) và \\(A\\) có kích thước \\(2 \\times 1\\) (2 hàng). Vì số cột của \\(B\\) (1) khác số hàng của \\(A\\) (2), tích \\(BA\\) không xác định (undefined).",
      "Vậy: \\(AB\\) có kích thước \\(2 \\times 1\\), \\(BA\\) không xác định. Đáp án đúng là A."
    ],
    image: "assets/questions/0230_q230_Question_230.png",
    needs_image: false,
    review_flags: [],
    confidence: "high"
  },
  {
    id: 231,
    chapter: "DSTT1",
    folder: "DSTT1",
    topic: "HePhuongTrinh",
    type: "single_choice",
    question: "How many solutions would a HOMOGENEOUS system of linear equations of 4 equations and have?",
    options: [
      "No solution",
      "Unique solution",
      "Infinitely many solutions",
      "There is not enough information"
    ],
    answer: "C",
    answer_original: "C",
    answer_status: "verified",
    explanation: [
      "Lưu ý dị thường đề gốc FUO: Câu văn trong đề gốc bị khuyết/cắt chữ ('of 4 equations and have?'). Ngữ cảnh gốc của bài toán là hệ phương trình thuần nhất gồm 4 phương trình và số ẩn lớn hơn số phương trình (ví dụ 5 hoặc 6 ẩn).",
      "Hệ phương trình tuyến tính thuần nhất có số phương trình ít hơn số ẩn luôn có nghiệm không tầm thường, tức là luôn có vô số nghiệm (Infinitely many solutions).",
      "Đáp án của ngân hàng thi là C (Infinitely many solutions)."
    ],
    image: "assets/questions/0231_q231_Question_231.png",
    needs_image: false,
    review_flags: [
      "PROMPT_ANOMALY: Text truncated in original FUO bank ('of 4 equations and have?'). Bank key C corresponds to a system with fewer equations than unknowns having infinitely many solutions."
    ],
    confidence: "medium"
  },
  {
    id: 232,
    chapter: "GT1",
    folder: "GT1",
    topic: "GioiHan",
    type: "single_choice",
    question: "Find the horizontal asymptote of\n\\[ f(x) = \\frac{\\sin(x^2)}{x} - 1 \\]",
    options: [
      "y = 1",
      "y = 0",
      "y = -1",
      "No horizontal asymptotes"
    ],
    answer: "C",
    answer_original: "C",
    answer_status: "verified",
    explanation: [
      "Tiệm cận ngang của đồ thị hàm số \\(y = f(x)\\) được xác định bởi giới hạn \\(\\lim_{x \\to \\pm\\infty} f(x)\\).",
      "Vì hàm sin bị chặn trong đoạn \\([-1, 1]\\), nên với mọi \\(x \\ne 0\\):\n\\[ -\\frac{1}{|x|} \\le \\frac{\\sin(x^2)}{x} \\le \\frac{1}{|x|} \\]",
      "Theo định lý kẹp (Squeeze Theorem), vì \\(\\lim_{x \\to \\pm\\infty} \\frac{\\pm 1}{|x|} = 0\\), ta có:\n\\[ \\lim_{x \\to \\pm\\infty} \\frac{\\sin(x^2)}{x} = 0 \\]",
      "Do đó:\n\\[ \\lim_{x \\to \\pm\\infty} f(x) = \\lim_{x \\to \\pm\\infty} \\left( \\frac{\\sin(x^2)}{x} - 1 \\right) = 0 - 1 = -1 \\]",
      "Vậy đường tiệm cận ngang là \\(y = -1\\). Đáp án đúng là C."
    ],
    image: "assets/questions/0232_q232_Question_232.png",
    needs_image: false,
    review_flags: [],
    confidence: "high"
  },
  {
    id: 233,
    chapter: "DSTT1",
    folder: "DSTT1",
    topic: "KhongGianVector",
    type: "single_choice",
    question: "Which of the following statements are true?\n(i) \\(\\mathbb{R}^3 = \\operatorname{Span}\\{(1, 0, 0), (0, 1, 1), (0, 0, 1)\\}\\)\n(ii) \\((3, 4, 1)\\) is a linear combination of \\((1, 1, 1)\\) and \\((0, 1, -1)\\).",
    options: [
      "(i)",
      "(ii)",
      "Neither",
      "Both (i) and (ii)"
    ],
    answer: "A",
    answer_original: "A",
    answer_status: "verified",
    explanation: [
      "Kiểm tra mệnh đề (i): Tính định thức của ma trận tạo bởi 3 vectơ:\n\\[ \\det \\begin{bmatrix} 1 & 0 & 0 \\\\ 0 & 1 & 1 \\\\ 0 & 0 & 1 \\end{bmatrix} = 1 \\cdot (1 - 0) = 1 \\ne 0 \\]\nVì định thức khác 0, 3 vectơ này độc lập tuyến tính trong \\(\\mathbb{R}^3\\), do đó chúng tạo thành cơ sở và sinh ra toàn bộ \\(\\mathbb{R}^3\\). Mệnh đề (i) ĐÚNG.",
      "Kiểm tra mệnh đề (ii): Giả sử \\(c_1(1, 1, 1) + c_2(0, 1, -1) = (3, 4, 1)\\).\n- Từ thành phần 1: \\(c_1 = 3\\).\n- Từ thành phần 2: \\(c_1 + c_2 = 4 \\implies 3 + c_2 = 4 \\implies c_2 = 1\\).\n- Kiểm tra thành phần 3: \\(c_1 - c_2 = 3 - 1 = 2 \\ne 1\\) (mâu thuẫn!).\nDo đó \\((3, 4, 1)\\) không phải là tổ hợp tuyến tính. Mệnh đề (ii) SAI.",
      "Vậy chỉ có (i) đúng. Đáp án đúng là A."
    ],
    image: "assets/questions/0233_q233_Question_233.png",
    needs_image: false,
    review_flags: [],
    confidence: "high"
  },
  {
    id: 234,
    chapter: "DSTT1",
    folder: "DSTT1",
    topic: "DinhThuc",
    type: "single_choice",
    question: "If A is \\(3 \\times 3\\) and \\(\\det(2A^{-1}) = -4\\), then \\(\\det A\\) is...",
    options: [
      "None of the others.",
      "1/2",
      "2",
      "-1/2",
      "-2"
    ],
    answer: "E",
    answer_original: "E",
    answer_status: "verified",
    explanation: [
      "Sử dụng tính chất định thức của ma trận cấp \\(n = 3\\):\n\\[ \\det(kA^{-1}) = k^n \\det(A^{-1}) = k^3 \\cdot \\frac{1}{\\det A} \\]",
      "Ở đây \\(k = 2\\) và \\(\\det(2A^{-1}) = -4\\):\n\\[ 2^3 \\cdot \\frac{1}{\\det A} = -4 \\iff \\frac{8}{\\det A} = -4 \\]",
      "Suy ra:\n\\[ \\det A = \\frac{8}{-4} = -2 \\]",
      "Đáp án đúng là E (-2)."
    ],
    image: "assets/questions/0234_q234_Question_234.png",
    needs_image: false,
    review_flags: [],
    confidence: "high"
  },
  {
    id: 235,
    chapter: "GT1",
    folder: "GT1",
    topic: "TichPhan",
    type: "single_choice",
    question: "Find \\(\\int 4x \\sin(2x)\\,dx\\)",
    options: [
      "\\sin(2x) + 2x \\cos(2x) + C",
      "2\\sin(2x) - 2x \\cos(2x) + C",
      "2\\sin(2x) + 2x \\cos(2x) + C",
      "\\sin(2x) - 2x \\cos(2x) + C",
      "None of the other choices is correct"
    ],
    answer: "D",
    answer_original: "D",
    answer_status: "verified",
    explanation: [
      "Áp dụng phương pháp tích phân từng phần: đặt \\(u = 4x \\implies du = 4\\,dx\\) và \\(dv = \\sin(2x)\\,dx \\implies v = -\\frac{1}{2}\\cos(2x)\\).",
      "Tính theo công thức \\(\\int u\\,dv = uv - \\int v\\,du\\):\n\\[ \\int 4x\\sin(2x)\\,dx = (4x)\\left(-\\frac{1}{2}\\cos(2x)\\right) - \\int \\left(-\\frac{1}{2}\\cos(2x)\\right)(4\\,dx) \\]\n\\[ = -2x\\cos(2x) + 2\\int \\cos(2x)\\,dx = -2x\\cos(2x) + \\sin(2x) + C = \\sin(2x) - 2x\\cos(2x) + C \\]",
      "Đáp án đúng là D."
    ],
    image: "assets/questions/0235_q235_Question_235.png",
    needs_image: false,
    review_flags: [],
    confidence: "high"
  },
  {
    id: 236,
    chapter: "DSTT1",
    folder: "DSTT1",
    topic: "TriRieng",
    type: "single_choice",
    question: "The characteristic polynomial of\n\\[ A = \\begin{bmatrix} 3 & -2 \\\\ 1 & 0 \\end{bmatrix} \\]\nis:\n(i) \\((x - 2)(x + 1)\\)\n(ii) \\(x^2 - 3x + 2\\)\n(iii) \\((x + 2)(x + 1)\\)\n(iv) \\(3x^2\\)",
    options: [
      "(i)",
      "(iv)",
      "(ii)",
      "None of the other choices is correct",
      "(iii)"
    ],
    answer: "C",
    answer_original: "C",
    answer_status: "verified",
    explanation: [
      "Đa thức đặc trưng của ma trận \\(A\\) được xác định bởi công thức \\(p(x) = \\det(xI - A)\\) (hoặc \\(\\det(A - xI)\\)):\n\\[ p(x) = \\begin{vmatrix} x - 3 & 2 \\\\ -1 & x \\end{vmatrix} = (x - 3)x - 2(-1) = x^2 - 3x + 2 \\]",
      "Kết quả này trùng khớp với biểu thức (ii). Lựa chọn C tương ứng với (ii).",
      "Đáp án đúng là C."
    ],
    image: "assets/questions/0236_q236_Question_236.png",
    needs_image: false,
    review_flags: [],
    confidence: "high"
  },
  {
    id: 237,
    chapter: "DSTT1",
    folder: "DSTT1",
    topic: "VectorHinhHoc",
    type: "single_choice",
    question: "Let L be the line passing though \\(A(1, 2, 1)\\) and parallel to the line\n\\[ x = 2 - t, \\quad y = 4 + 3t, \\quad z = 2t \\]\nWhich of the following points lie in L?\n\\[ P(3, -4, -3), \\quad Q(3, 6, 1) \\]",
    options: [
      "Both P and Q",
      "Only P",
      "Only Q",
      "None of P and Q"
    ],
    answer: "B",
    answer_original: "B",
    answer_status: "verified",
    explanation: [
      "Đường thẳng đã cho có vectơ chỉ phương là \\(\\mathbf{d} = [-1, 3, 2]\\).",
      "Vì \\(L\\) song song với đường thẳng đó và đi qua \\(A(1, 2, 1)\\), phương trình tham số của \\(L\\) là:\n\\[ \\begin{cases} x = 1 - k \\\\ y = 2 + 3k \\\\ z = 1 + 2k \\end{cases} \\]",
      "Kiểm tra điểm \\(P(3, -4, -3)\\):\n- \\(x = 3 \\implies 1 - k = 3 \\implies k = -2\\)\n- Với \\(k = -2\\): \\(y = 2 + 3(-2) = -4\\) (khớp), \\(z = 1 + 2(-2) = -3\\) (khớp).\nVậy điểm \\(P\\) nằm trên \\(L\\).",
      "Kiểm tra điểm \\(Q(3, 6, 1)\\):\n- \\(x = 3 \\implies k = -2\\)\n- Với \\(k = -2\\): \\(y = -4 \\ne 6\\).\nVậy điểm \\(Q\\) không nằm trên \\(L\\).",
      "Do đó chỉ có điểm \\(P\\) thuộc \\(L\\) (Only P). Đáp án đúng là B."
    ],
    image: "assets/questions/0237_q237_Question_237.png",
    needs_image: false,
    review_flags: [],
    confidence: "high"
  },
  {
    id: 238,
    chapter: "GT1",
    folder: "GT1",
    topic: "DaoHam",
    type: "single_choice",
    question: "What is the slope of the line passing \\((1, 2)\\) and \\((3, -8)\\)?",
    options: [
      "-5",
      "3",
      "-8/3",
      "3/2",
      "None of the other choices is correct"
    ],
    answer: "A",
    answer_original: "A",
    answer_status: "verified",
    explanation: [
      "Hệ số góc (slope) của đường thẳng đi qua hai điểm \\((x_1, y_1)\\) và \\((x_2, y_2)\\) là:\n\\[ m = \\frac{y_2 - y_1}{x_2 - x_1} \\]",
      "Thay tọa độ của hai điểm \\((1, 2)\\) và \\((3, -8)\\):\n\\[ m = \\frac{-8 - 2}{3 - 1} = \\frac{-10}{2} = -5 \\]",
      "Đáp án đúng là A (-5)."
    ],
    image: "assets/questions/0238_q238_Question_238.png",
    needs_image: false,
    review_flags: [],
    confidence: "high"
  },
  {
    id: 239,
    chapter: "GT1",
    folder: "GT1",
    topic: "DaoHam",
    type: "single_choice",
    question: "Two cars start moving from the same point. One travels south at 28 mi/h and the other travels west at 70 mi/h. At what rate is the distance between the cars increasing 5 hours later? Round result to the nearest hundredth.",
    options: [
      "75.39 mi/h",
      "75.49 mi/h",
      "75.38 mi/h",
      "75.42 mi/h",
      "None of the other choices is correct",
      "76.4 mi/h"
    ],
    answer: "A",
    answer_original: "A",
    answer_status: "verified",
    explanation: [
      "Gọi quãng đường đi về hướng tây là \\(x(t)\\) và hướng nam là \\(y(t)\\). Do hai hướng vuông góc nhau, khoảng cách \\(z(t)\\) giữa hai xe thỏa mãn định lý Pythagore:\n\\[ z(t)^2 = x(t)^2 + y(t)^2 \\]",
      "Lấy đạo hàm theo thời gian \\(t\\):\n\\[ 2z \\frac{dz}{dt} = 2x \\frac{dx}{dt} + 2y \\frac{dy}{dt} \\implies \\frac{dz}{dt} = \\frac{x \\frac{dx}{dt} + y \\frac{dy}{dt}}{z} \\]",
      "Vì hai xe chuyển động đều từ gốc tại \\(t = 0\\):\n- \\(x(t) = 70t\\), \\(\\frac{dx}{dt} = 70\\)\n- \\(y(t) = 28t\\), \\(\\frac{dy}{dt} = 28\\)\n- \\(z(t) = \\sqrt{(70t)^2 + (28t)^2} = t\\sqrt{70^2 + 28^2} = t\\sqrt{4900 + 784} = t\\sqrt{5684}\\)",
      "Thay vào biểu thức tốc độ thay đổi khoảng cách:\n\\[ \\frac{dz}{dt} = \\frac{(70t)(70) + (28t)(28)}{t\\sqrt{5684}} = \\frac{t(4900 + 784)}{t\\sqrt{5684}} = \\frac{5684}{\\sqrt{5684}} = \\sqrt{5684} \\approx 75.3923\\text{ mi/h} \\]",
      "Lưu ý: Tốc độ tăng khoảng cách giữa hai xe là hằng số và không đổi theo thời gian \\(t\\).",
      "Làm tròn đến chữ số phần trăm (nearest hundredth) được 75.39 mi/h. Đáp án đúng là A."
    ],
    image: "assets/questions/0239_q239_Question_239.png",
    needs_image: false,
    review_flags: [],
    confidence: "high"
  },
  {
    id: 240,
    chapter: "GT1",
    folder: "GT1",
    topic: "TichPhan",
    type: "single_choice",
    question: "Use the Simpson's Rule with \\(n = 6\\) steps to approximate \\(\\int_1^4 f(x)\\,dx\\), given the table\n\n| \\(x\\) | 1 | 1.5 | 2 | 2.5 | 3 |\n| :--- | :--- | :--- | :--- | :--- | :--- |\n| \\(f(x)\\) | 2 | 6 | 4 | 8 | 2 |",
    options: [
      "17",
      "None of the other choices is correct.",
      "13.5",
      "16.5",
      "19",
      "15.25"
    ],
    answer: "B",
    answer_original: "B",
    answer_status: "verified",
    explanation: [
      "Khoảng lấy tích phân là \\([1, 4]\\) với \\(n = 6\\) bước, độ dài mỗi bước con phải là:\n\\[ \\Delta x = \\frac{4 - 1}{6} = 0.5 \\]",
      "Các mốc điểm cần thiết để áp dụng quy tắc Simpson là: \\(x_0 = 1, x_1 = 1.5, x_2 = 2, x_3 = 2.5, x_4 = 3, x_5 = 3.5, x_6 = 4\\).",
      "Tuy nhiên, bảng số liệu trong đề bài chỉ cung cấp giá trị hàm số tại \\(x \\in \\{1, 1.5, 2, 2.5, 3\\}\\), thiếu hoàn toàn giá trị tại \\(x = 3.5\\) và \\(x = 4\\).",
      "Do dữ liệu bị thiếu ở hai mốc cuối, không đủ điều kiện để tính quy tắc Simpson trên toàn bộ đoạn \\([1, 4]\\).",
      "Vì vậy không có đáp số nào trong các số cụ thể là đúng. Phương án chính xác là B (None of the other choices is correct)."
    ],
    image: "assets/questions/0240_q240_Question_240.png",
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
const outFile = path.join(outDir, 'batch_06.json');
fs.writeFileSync(outFile, JSON.stringify(batch_06, null, 2), 'utf8');
console.log(`Saved ${batch_06.length} questions to ${outFile}`);
