const fs = require('fs');
const path = require('path');

const batch11 = [
  {
    id: 401,
    chapter: "GT1",
    folder: "GT1",
    topic: "CucTri",
    type: "single_choice",
    question: "Find the relative extrema if they exist, of the function\n\\[ f(x) = x^3 - 3x^4 \\]",
    options: [
      "Relative minimum at \\((-1/4, -5/256)\\); relative maximum at \\((0, 0)\\)",
      "Relative maximum at \\((1/4, 1/256)\\); relative minimum at \\((0, 0)\\)",
      "Relative maximum at \\((0, 0)\\); relative minima at \\((-1/4, -5/256)\\) and \\((1/4, 1/256)\\)",
      "Relative maximum at \\((1/4, 1/256)\\). No relative minimum",
      "None of the other choices is correct"
    ],
    answer: "D",
    answer_original: "D",
    answer_status: "verified",
    explanation: [
      "Tìm đạo hàm bậc nhất của hàm số:",
      "\\[ f'(x) = 3x^2 - 12x^3 = 3x^2(1 - 4x) \\]",
      "Giải phương trình \\(f'(x) = 0\\):",
      "- \\(x = 0\\) (nghiệm bội 2)",
      "- \\(1 - 4x = 0 \\implies x = 1/4\\)",
      "Xét dấu của \\(f'(x)\\):",
      "- Vì thừa số \\(3x^2 \\ge 0\\) với mọi \\(x\\), \\(f'(x)\\) không đổi dấu khi qua điểm \\(x = 0\\) (hàm số đồng biến trên lân cận của 0). Do đó tại \\(x = 0\\) không có cực trị (đây là điểm uốn).",
      "- Khi qua điểm \\(x = 1/4\\), \\(1 - 4x\\) đổi dấu từ dương sang âm, nên \\(f(x)\\) đạt cực đại tương đối tại \\(x = 1/4\\).",
      "Tính giá trị cực đại:",
      "\\[ f(1/4) = \\left(\\frac{1}{4}\\right)^3 - 3\\left(\\frac{1}{4}\\right)^4 = \\frac{1}{64} - \\frac{3}{256} = \\frac{1}{256} \\]",
      "Vậy hàm số đạt cực đại tương đối tại \\((1/4, 1/256)\\) và không có cực tiểu tương đối (Đáp án D)."
    ],
    image: "assets/questions/0401_q401_Question_401.png",
    needs_image: false,
    confidence: "high"
  },
  {
    id: 402,
    chapter: "GT1",
    folder: "GT1",
    topic: "DaoHam",
    type: "single_choice",
    question: "Differentiate \\(y = \\sqrt[5]{x^7 + 9x}\\)\n(i) \\(dy/dx = \\frac{1}{5}(x^7 + 9x)^{-4/5}\\)\n(ii) \\(dy/dx = \\frac{1}{5}(x^7 + 9x)^{4/5}(7x^6 + 9)\\)\n(iii) \\(dy/dx = \\frac{1}{5}(x^7 + 9x)^{-4/5}(7x^6 + 9)\\)\n(iv) \\(dy/dx = \\frac{1}{5}(x^7 + 9x)^{-4/5}(x^6 + 9)\\)",
    options: [
      "None of the other choices is correct",
      "(iv)",
      "(ii)",
      "(i)",
      "(iii)"
    ],
    answer: "E",
    answer_original: "E",
    answer_status: "verified",
    explanation: [
      "Viết lại hàm số dưới dạng số mũ hữu tỉ: \\(y = (x^7 + 9x)^{1/5}\\).",
      "Áp dụng quy tắc đạo hàm hàm hợp:",
      "\\[ \\frac{dy}{dx} = \\frac{1}{5}(x^7 + 9x)^{\\frac{1}{5} - 1} \\cdot \\frac{d}{dx}(x^7 + 9x) = \\frac{1}{5}(x^7 + 9x)^{-4/5}(7x^6 + 9) \\]",
      "Kết quả trùng khớp hoàn toàn với (iii) (Đáp án E)."
    ],
    image: "assets/questions/0402_q402_Question_402.png",
    needs_image: false,
    confidence: "high"
  },
  {
    id: 403,
    chapter: "DSTT1",
    folder: "DSTT1",
    topic: "VectorHinhHoc",
    type: "single_choice",
    question: "Given \\(\\vec{u} = (3, 0, 3)\\) and \\(\\vec{v} = (-5, 1, 8)\\); the orthogonal projection of \\(\\vec{v}\\) along \\(\\vec{u}\\) is:",
    options: [
      "\\((1, -1/5, -8/5)\\)",
      "\\((3/2, 0, 3/2)\\)",
      "\\((-1, 1/5, 8/5)\\)",
      "None of the other choices is correct",
      "\\((5, -1, -8)\\)",
      "\\((-3/2, 0, -3/2)\\)"
    ],
    answer: "B",
    answer_original: "B",
    answer_status: "verified",
    explanation: [
      "Công thức hình chiếu trực giao của vectơ \\(\\vec{v}\\) lên vectơ \\(\\vec{u}\\) là:",
      "\\[ \\operatorname{proj}_{\\vec{u}}(\\vec{v}) = \\frac{\\vec{u} \\cdot \\vec{v}}{\\|\\vec{u}\\|^2} \\vec{u} \\]",
      "Tính tích vô hướng:",
      "\\[ \\vec{u} \\cdot \\vec{v} = 3(-5) + 0(1) + 3(8) = -15 + 24 = 9 \\]",
      "Tính bình phương độ dài của \\(\\vec{u}\\):",
      "\\[ \\|\\vec{u}\\|^2 = 3^2 + 0^2 + 3^2 = 9 + 0 + 9 = 18 \\]",
      "Hệ số tỉ lệ:",
      "\\[ c = \\frac{9}{18} = \\frac{1}{2} \\]",
      "Vậy hình chiếu trực giao là:",
      "\\[ \\operatorname{proj}_{\\vec{u}}(\\vec{v}) = \\frac{1}{2}(3, 0, 3) = \\left(\\frac{3}{2}, 0, \\frac{3}{2}\\right) \\]",
      "Đáp án đúng là B."
    ],
    image: "assets/questions/0403_q403_Question_403.png",
    needs_image: false,
    confidence: "high"
  },
  {
    id: 404,
    chapter: "DSTT1",
    folder: "DSTT1",
    topic: "AnhXaTuyenTinh",
    type: "single_choice",
    question: "Find the matrix of the transformation \\(T : \\mathbb{R}^3 \\to \\mathbb{R}^3\\) which is reflection in the YZ-plane\n(i) \\(\\begin{bmatrix} -1 & 0 & 0 \\\\ 0 & 1 & 0 \\\\ 0 & 0 & 1 \\end{bmatrix}\\)\n(ii) \\(\\begin{bmatrix} 1 & 0 & 0 \\\\ 0 & 1 & 0 \\\\ 0 & 0 & 1 \\end{bmatrix}\\)\n(iii) \\(\\begin{bmatrix} 1 & 0 & 0 \\\\ 0 & -1 & 0 \\\\ 0 & 0 & 1 \\end{bmatrix}\\)\n(iv) \\(\\begin{bmatrix} 1 & 0 & 0 \\\\ 0 & 1 & 0 \\\\ 0 & 0 & -1 \\end{bmatrix}\\)",
    options: [
      "(i)",
      "(iv)",
      "(ii)",
      "All of the other choices are incorrect",
      "(iii)"
    ],
    answer: "A",
    answer_original: "A",
    answer_status: "verified",
    explanation: [
      "Phép đối xứng qua mặt phẳng \\(YZ\\) (phương trình \\(x = 0\\)) giữ nguyên tọa độ \\(y\\) và \\(z\\), đồng thời đổi dấu tọa độ \\(x\\):",
      "\\[ T(x, y, z) = (-x, y, z) \\]",
      "Xét ảnh của các vectơ cơ sở chính tắc:",
      "- \\(T(e_1) = T(1, 0, 0) = (-1, 0, 0)^T\\)",
      "- \\(T(e_2) = T(0, 1, 0) = (0, 1, 0)^T\\)",
      "- \\(T(e_3) = T(0, 0, 1) = (0, 0, 1)^T\\)",
      "Ghép các cột lại ta được ma trận tiêu chuẩn của biến đổi tuyến tính:",
      "\\[ [T] = \\begin{bmatrix} -1 & 0 & 0 \\\\ 0 & 1 & 0 \\\\ 0 & 0 & 1 \\end{bmatrix} \\]",
      "Tương ứng với (i) (Đáp án A)."
    ],
    image: "assets/questions/0404_q404_Question_404.png",
    needs_image: false,
    confidence: "high"
  },
  {
    id: 405,
    chapter: "GT1",
    folder: "GT1",
    topic: "TichPhan",
    type: "single_choice",
    question: "Calculate the following integral (if it converges)\n\\[ \\int_2^\\infty \\frac{1}{x^2}\\,dx \\]",
    options: [
      "0.25",
      "It is divergent",
      "-0.5",
      "0.5",
      "None of the other choices is correct"
    ],
    answer: "D",
    answer_original: "D",
    answer_status: "verified",
    explanation: [
      "Tích phân suy rộng loại 1 được định nghĩa qua giới hạn:",
      "\\[ \\int_2^\\infty \\frac{1}{x^2}\\,dx = \\lim_{t \\to \\infty} \\int_2^t x^{-2}\\,dx \\]",
      "Tìm nguyên hàm:",
      "\\[ \\int x^{-2}\\,dx = -x^{-1} = -\\frac{1}{x} \\]",
      "Thay cận:",
      "\\[ \\lim_{t \\to \\infty} \\left[ -\\frac{1}{t} - \\left(-\\frac{1}{2}\\right) \\right] = \\lim_{t \\to \\infty} \\left( \\frac{1}{2} - \\frac{1}{t} \\right) = \\frac{1}{2} - 0 = 0.5 \\]",
      "Tích phân hội tụ và có giá trị bằng 0.5 (Đáp án D)."
    ],
    image: "assets/questions/0405_q405_Question_405.png",
    needs_image: false,
    confidence: "high"
  },
  {
    id: 406,
    chapter: "DSTT1",
    folder: "DSTT1",
    topic: "MaTran",
    type: "single_choice",
    question: "Let \\(A = \\begin{pmatrix} 1 & 0 & 2 \\\\ 3 & 2 & -1 \\end{pmatrix}\\), \\(B = \\begin{pmatrix} 1 & 1 \\\\ 2 & -1 \\\\ 3 & 0 \\end{pmatrix}\\). Find \\((-3A) + B^T\\).\n(i) \\(\\begin{pmatrix} 2 & 2 & 3 \\\\ -8 & -7 & 3 \\end{pmatrix}\\)\n(ii) \\(\\begin{pmatrix} -2 & 2 & -3 \\\\ 8 & 7 & 3 \\end{pmatrix}\\)\n(iii) \\(\\begin{pmatrix} -2 & 2 & -3 \\\\ -8 & -7 & 3 \\end{pmatrix}\\)",
    options: [
      "(iii)",
      "(i)",
      "None of the other choices is correct",
      "(ii)"
    ],
    answer: "A",
    answer_original: "A",
    answer_status: "verified",
    explanation: [
      "Nhân vô hướng ma trận \\(A\\) với \\(-3\\):",
      "\\[ -3A = -3 \\begin{pmatrix} 1 & 0 & 2 \\\\ 3 & 2 & -1 \\end{pmatrix} = \\begin{pmatrix} -3 & 0 & -6 \\\\ -9 & -6 & 3 \\end{pmatrix} \\]",
      "Tìm ma trận chuyển vị của \\(B\\):",
      "\\[ B^T = \\begin{pmatrix} 1 & 2 & 3 \\\\ 1 & -1 & 0 \\end{pmatrix} \\]",
      "Cộng hai ma trận cùng kích thước \\(2 \\times 3\\):",
      "\\[ (-3A) + B^T = \\begin{pmatrix} -3 + 1 & 0 + 2 & -6 + 3 \\\\ -9 + 1 & -6 + (-1) & 3 + 0 \\end{pmatrix} = \\begin{pmatrix} -2 & 2 & -3 \\\\ -8 & -7 & 3 \\end{pmatrix} \\]",
      "Kết quả tương ứng với (iii) (Đáp án A)."
    ],
    image: "assets/questions/0406_q406_Question_406.png",
    needs_image: false,
    confidence: "high"
  },
  {
    id: 407,
    chapter: "DSTT1",
    folder: "DSTT1",
    topic: "MaTran",
    type: "single_choice",
    question: "Which of the following matrices are in reduced row-echelon form?\n(i) \\(\\begin{bmatrix} 1 & 0 & 2 & 8 \\\\ 0 & 1 & 3 & 5 \\\\ 0 & 0 & 0 & 0 \\end{bmatrix}\\)\n(ii) \\(\\begin{bmatrix} 1 & 3 & 0 & 0 \\\\ 0 & 1 & 0 & 0 \\\\ 0 & 0 & 0 & 1 \\end{bmatrix}\\)",
    options: [
      "None of the other choices is correct",
      "(i)",
      "(ii)",
      "(i) and (ii)"
    ],
    answer: "B",
    answer_original: "B",
    answer_status: "verified",
    explanation: [
      "Định nghĩa dạng bậc thang rút gọn (Reduced Row-Echelon Form - RREF):",
      "1. Thỏa mãn các điều kiện của dạng bậc thang (REF).",
      "2. Phần tử khác không đầu tiên của mỗi hàng (leading entry) bằng 1.",
      "3. Mỗi cột chứa một leading 1 thì tất cả các phần tử khác trong cột đó phải bằng 0.",
      "Xét ma trận (i): leading 1 ở cột 1 và cột 2. Cột 1 và cột 2 đều có các phần tử còn lại bằng 0. Hàng số 0 ở dưới cùng. Thỏa mãn đầy đủ RREF.",
      "Xét ma trận (ii): leading 1 của hàng 2 nằm ở cột 2, nhưng ở hàng 1 cùng cột 2 có phần tử bằng 3 (khác 0). Do đó vi phạm tính chất 3 của RREF.",
      "Vậy chỉ có ma trận (i) ở dạng bậc thang rút gọn (Đáp án B)."
    ],
    image: "assets/questions/0407_q407_Question_407.png",
    needs_image: false,
    confidence: "high"
  },
  {
    id: 408,
    chapter: "GT1",
    folder: "GT1",
    topic: "GioiHan",
    type: "single_choice",
    question: "Evaluate the limit, if it exists\n\\[ \\lim_{x \\to 1^-} \\frac{|x^2 - 4x + 3|}{x - 1} \\]",
    options: [
      "None of the other choices is correct",
      "3",
      "0",
      "-2",
      "2",
      "-3"
    ],
    answer: "D",
    answer_original: "D",
    answer_status: "verified",
    explanation: [
      "Phân tích đa thức trong dấu giá trị tuyệt đối: \\(x^2 - 4x + 3 = (x - 1)(x - 3)\\).",
      "Khi \\(x \\to 1^-\\), ta có \\(x < 1\\):",
      "- \\(x - 1 < 0\\)",
      "- \\(x - 3 < 0\\)",
      "Do tích hai số âm là một số dương, nên \\((x - 1)(x - 3) > 0\\), suy ra:",
      "\\[ |x^2 - 4x + 3| = (x - 1)(x - 3) \\]",
      "Khử dạng vô định:",
      "\\[ \\lim_{x \\to 1^-} \\frac{(x - 1)(x - 3)}{x - 1} = \\lim_{x \\to 1^-} (x - 3) = 1 - 3 = -2 \\]",
      "Đáp án đúng là D."
    ],
    image: "assets/questions/0408_q408_Question_408.png",
    needs_image: false,
    confidence: "high"
  },
  {
    id: 409,
    chapter: "GT1",
    folder: "GT1",
    topic: "HamSo",
    type: "single_choice",
    question: "Let (L) be the line passing through \\((1, -1)\\) with slope \\(-1/2\\). Which of the following points lies in (L)?",
    options: [
      "\\((-2, 1/2)\\)",
      "\\((-2, -3/2)\\)",
      "\\((2, 1)\\)",
      "\\((2, 0)\\)",
      "None of the other choices is correct"
    ],
    answer: "A",
    answer_original: "A",
    answer_status: "verified",
    explanation: [
      "Phương trình đường thẳng đi qua \\((x_0, y_0) = (1, -1)\\) với hệ số góc \\(m = -1/2\\) là:",
      "\\[ y - y_0 = m(x - x_0) \\implies y - (-1) = -\\frac{1}{2}(x - 1) \\implies y = -\\frac{1}{2}x - \\frac{1}{2} \\]",
      "Kiểm tra tọa độ các điểm:",
      "- Với điểm \\((-2, 1/2)\\): thay \\(x = -2\\), ta có \\(y = -\\frac{1}{2}(-2) - \\frac{1}{2} = 1 - \\frac{1}{2} = \\frac{1}{2}\\) (Thỏa mãn).",
      "Vậy điểm \\((-2, 1/2)\\) nằm trên đường thẳng (L) (Đáp án A)."
    ],
    image: "assets/questions/0409_q409_Question_409.png",
    needs_image: false,
    confidence: "high"
  },
  {
    id: 410,
    chapter: "GT1",
    folder: "GT1",
    topic: "PhuongPhapSo",
    type: "single_choice",
    question: "Which of the following statements about binary search is true?",
    options: [
      "Binary search can be used on unsorted data",
      "Binary search divides the search space into three parts",
      "Binary search is faster than linear search for sorted data",
      "Binary search has a time complexity of O(n)"
    ],
    answer: "C",
    answer_original: "C",
    answer_status: "verified",
    explanation: [
      "Phân tích các phát biểu về thuật toán tìm kiếm nhị phân (Binary Search):",
      "- A sai: Tìm kiếm nhị phân bắt buộc dữ liệu đầu vào phải được sắp xếp trước.",
      "- B sai: Tìm kiếm nhị phân chia không gian tìm kiếm thành 2 nửa bằng nhau qua phần tử ở giữa.",
      "- C đúng: Với dữ liệu đã sắp xếp, tìm kiếm nhị phân có độ phức tạp thời gian \\(O(\\log n)\\), nhanh hơn rất nhiều so với tìm kiếm tuyến tính \\(O(n)\\).",
      "- D sai: Độ phức tạp thời gian của tìm kiếm nhị phân là \\(O(\\log n)\\), không phải \\(O(n)\\).",
      "Đáp án đúng là C."
    ],
    image: "assets/questions/0410_q410_Question_410.png",
    needs_image: false,
    confidence: "high"
  },
  {
    id: 411,
    chapter: "GT1",
    folder: "GT1",
    topic: "TichPhan",
    type: "single_choice",
    question: "Let\n\\[ \\int_1^6 f(x)\\,dx = 12, \\quad \\int_3^6 f(x)\\,dx = 10. \\]\nFind \\(\\int_1^3 f(x)\\,dx\\).",
    options: [
      "0",
      "-2",
      "-22",
      "22",
      "2",
      "None of the other choices is correct"
    ],
    answer: "E",
    answer_original: "E",
    answer_status: "verified",
    explanation: [
      "Theo tính chất cộng đoạn của tích phân xác định:",
      "\\[ \\int_1^6 f(x)\\,dx = \\int_1^3 f(x)\\,dx + \\int_3^6 f(x)\\,dx \\]",
      "Thay các giá trị đã biết vào đẳng thức:",
      "\\[ 12 = \\int_1^3 f(x)\\,dx + 10 \\implies \\int_1^3 f(x)\\,dx = 12 - 10 = 2 \\]",
      "Đáp án đúng là E."
    ],
    image: "assets/questions/0411_q411_Question_411.png",
    needs_image: false,
    confidence: "high"
  },
  {
    id: 412,
    chapter: "GT1",
    folder: "GT1",
    topic: "DaoHam",
    type: "single_choice",
    question: "Find a linear approximation for \\(f(x) = e^{2x}\\) at \\(x = 1\\).\n(i) \\(2e^2x - e^2\\)\n(ii) \\(2e^2x + e^2\\)\n(iii) \\(e^2x - e^2\\)\n(iv) \\(e^2x + e^2\\)",
    options: [
      "(ii)",
      "(i)",
      "(iii)",
      "(iv)",
      "None of the other choices is correct"
    ],
    answer: "B",
    answer_original: "B",
    answer_status: "verified",
    explanation: [
      "Công thức xấp xỉ tuyến tính của hàm số tại \\(x = a\\) là \\(L(x) = f(a) + f'(a)(x - a)\\).",
      "Tại \\(a = 1\\):",
      "- \\(f(1) = e^{2(1)} = e^2\\)",
      "- Đạo hàm: \\(f'(x) = 2e^{2x} \\implies f'(1) = 2e^2\\)",
      "Thay vào công thức:",
      "\\[ L(x) = e^2 + 2e^2(x - 1) = e^2 + 2e^2x - 2e^2 = 2e^2x - e^2 \\]",
      "Biểu thức này tương ứng với (i) (Đáp án B)."
    ],
    image: "assets/questions/0412_q412_Question_412.png",
    needs_image: false,
    confidence: "high"
  },
  {
    id: 413,
    chapter: "DSTT1",
    folder: "DSTT1",
    topic: "VectorHinhHoc",
    type: "single_choice",
    question: "Let A be the point in the plane \\(2x - y - z = 6\\) that is closest to the point \\((1, -2, 3)\\). Determine the \\(y\\)-coordinate of A.",
    options: [
      "\\(-17/6\\)",
      "\\(5/3\\)",
      "None of the other choices is correct",
      "\\(4/6\\)",
      "\\(-5/3\\)"
    ],
    answer: "A",
    answer_original: "A",
    answer_status: "verified",
    explanation: [
      "Điểm \\(A\\) trên mặt phẳng gần điểm \\(P(1, -2, 3)\\) nhất chính là hình chiếu vuông góc của \\(P\\) lên mặt phẳng \\(2x - y - z - 6 = 0\\).",
      "Mặt phẳng có vectơ pháp tuyến là \\(\\vec{n} = (2, -1, -1)\\).",
      "Đường thẳng đi qua \\(P\\) vuông góc với mặt phẳng có phương trình tham số:",
      "\\[ \\begin{cases} x = 1 + 2t \\\\ y = -2 - t \\\\ z = 3 - t \\end{cases} \\]",
      "Thay tọa độ tham số vào phương trình mặt phẳng:",
      "\\[ 2(1 + 2t) - (-2 - t) - (3 - t) = 6 \\]",
      "\\[ 2 + 4t + 2 + t - 3 + t = 6 \\implies 6t + 1 = 6 \\implies 6t = 5 \\implies t = \\frac{5}{6} \\]",
      "Tọa độ của điểm \\(A\\) là:",
      "- \\(x = 1 + 2\\left(\\frac{5}{6}\\right) = \\frac{8}{3}\\)",
      "- \\(y = -2 - \\frac{5}{6} = -\\frac{17}{6}\\)",
      "- \\(z = 3 - \\frac{5}{6} = \\frac{13}{6}\\)",
      "Đề bài hỏi tung độ (y-coordinate) của A, do đó kết quả là \\(-\\frac{17}{6}\\) (Đáp án A)."
    ],
    image: "assets/questions/0413_q413_Question_413.png",
    needs_image: false,
    review_flags: [
      "prompt_anomaly_resolved"
    ],
    confidence: "high"
  },
  {
    id: 414,
    chapter: "GT1",
    folder: "GT1",
    topic: "DaoHam",
    type: "single_choice",
    question: "Simplify the quotient \\(\\frac{f(x+h) - f(x)}{h}\\) for \\(f(x) = 1 + \\frac{2}{x}\\).\n(i) \\(\\frac{-2}{(x+h)x}\\)\n(ii) \\(\\frac{2}{(x+h)x}\\)\n(iii) \\(\\frac{-2}{(x+h)x} + 1\\)\n(iv) \\(\\frac{2}{(x+h)x} + 1\\)",
    options: [
      "None of the other choices is correct",
      "(iv)",
      "(ii)",
      "(iii)",
      "(i)"
    ],
    answer: "E",
    answer_original: "E",
    answer_status: "verified",
    explanation: [
      "Tính hiệu số tử thức:",
      "\\[ f(x+h) - f(x) = \\left(1 + \\frac{2}{x+h}\\right) - \\left(1 + \\frac{2}{x}\\right) = \\frac{2}{x+h} - \\frac{2}{x} \\]",
      "Quy đồng mẫu số chung \\((x+h)x\\):",
      "\\[ \\frac{2x - 2(x+h)}{(x+h)x} = \\frac{-2h}{(x+h)x} \\]",
      "Chia cho \\(h\\) (với \\(h \\ne 0\\)):",
      "\\[ \\frac{f(x+h) - f(x)}{h} = \\frac{-2h}{h(x+h)x} = \\frac{-2}{(x+h)x} \\]",
      "Kết quả tương ứng với (i) (Đáp án E)."
    ],
    image: "assets/questions/0414_q414_Question_414.png",
    needs_image: false,
    confidence: "high"
  },
  {
    id: 415,
    chapter: "DSTT1",
    folder: "DSTT1",
    topic: "DinhThuc",
    type: "single_choice",
    question: "Let \\(\\begin{vmatrix} a & m & d \\\\ b & n & e \\\\ c & p & f \\end{vmatrix} = 10\\). Find \\(\\begin{vmatrix} 2a + 3d & d & -m \\\\ 2b + 3e & e & -n \\\\ 2c + 3f & f & -p \\end{vmatrix}\\).",
    options: [
      "60",
      "-60",
      "20",
      "-20",
      "None of the other choices is correct"
    ],
    answer: "C",
    answer_original: "C",
    answer_status: "verified",
    explanation: [
      "Áp dụng tính chất tuyến tính của định thức đối với cột 1:",
      "\\[ \\begin{vmatrix} 2a + 3d & d & -m \\\\ 2b + 3e & e & -n \\\\ 2c + 3f & f & -p \\end{vmatrix} = \\begin{vmatrix} 2a & d & -m \\\\ 2b & e & -n \\\\ 2c & f & -p \\end{vmatrix} + \\begin{vmatrix} 3d & d & -m \\\\ 3e & e & -n \\\\ 3f & f & -p \\end{vmatrix} \\]",
      "Định thức thứ hai bằng 0 vì cột 1 tỷ lệ với cột 2 (gấp 3 lần).",
      "Ở định thức thứ nhất, đưa thừa số 2 từ cột 1 và \\(-1\\) từ cột 3 ra ngoài:",
      "\\[ = 2(-1) \\begin{vmatrix} a & d & m \\\\ b & e & n \\\\ c & f & p \\end{vmatrix} = -2 \\begin{vmatrix} a & d & m \\\\ b & e & n \\\\ c & f & p \\end{vmatrix} \\]",
      "Hoán vị cột 2 và cột 3 để đưa về ma trận ban đầu (mỗi lần đổi chỗ 2 cột, định thức đổi dấu):",
      "\\[ \\begin{vmatrix} a & d & m \\\\ b & e & n \\\\ c & f & p \\end{vmatrix} = -\\begin{vmatrix} a & m & d \\\\ b & n & e \\\\ c & p & f \\end{vmatrix} = -10 \\]",
      "Vậy giá trị cần tìm là:",
      "\\[ -2 \\times (-10) = 20 \\]",
      "Đáp án đúng là C."
    ],
    image: "assets/questions/0415_q415_Question_415.png",
    needs_image: false,
    confidence: "high"
  },
  {
    id: 416,
    chapter: "GT1",
    folder: "GT1",
    topic: "CucTri",
    type: "single_choice",
    question: "Find points of inflection for\n\\[ f(x) = (1/2)x^4 - 3x^3 + 12 \\]",
    options: [
      "None of the other choices is correct",
      "\\((0, 12); (3, -28.5)\\)",
      "\\((0, 12); (-3, -28.5)\\)",
      "\\((0, 12); (3, 28.5)\\)",
      "\\((0, 12)\\)"
    ],
    answer: "B",
    answer_original: "B",
    answer_status: "verified",
    explanation: [
      "Tính đạo hàm cấp một và cấp hai của hàm số:",
      "\\[ f'(x) = 2x^3 - 9x^2 \\]",
      "\\[ f''(x) = 6x^2 - 18x = 6x(x - 3) \\]",
      "Giải phương trình \\(f''(x) = 0\\): ta được \\(x = 0\\) hoặc \\(x = 3\\).",
      "Xét dấu đạo hàm cấp hai:",
      "- Với \\(x < 0\\): \\(f''(x) > 0\\)",
      "- Với \\(0 < x < 3\\): \\(f''(x) < 0\\)",
      "- Với \\(x > 3\\): \\(f''(x) > 0\\)",
      "Đạo hàm cấp hai đổi dấu qua cả hai điểm \\(x = 0\\) và \\(x = 3\\), do đó cả hai đều là hoành độ điểm uốn.",
      "Tính các tung độ tương ứng:",
      "- \\(f(0) = 12 \\implies (0, 12)\\)",
      "- \\(f(3) = \\frac{1}{2}(3^4) - 3(3^3) + 12 = \\frac{81}{2} - 81 + 12 = 40.5 - 81 + 12 = -28.5 \\implies (3, -28.5)\\)",
      "Đáp án đúng là B."
    ],
    image: "assets/questions/0416_q416_Question_416.png",
    needs_image: false,
    confidence: "high"
  },
  {
    id: 417,
    chapter: "DSTT1",
    folder: "DSTT1",
    topic: "VectorHinhHoc",
    type: "single_choice",
    question: "Find all \\(a\\) and \\(b\\) such that the set \\(\\{[1/2, a, b], [0, 0, 2a]\\}\\) is orthonormal.",
    options: [
      "\\(a = 0\\) or \\(b = 0\\)",
      "\\(a = 2\\) and \\(b = 1/2\\)",
      "\\(a = b = 0\\)",
      "There do not exist such \\(a\\) and \\(b\\)"
    ],
    answer: "D",
    answer_original: "D",
    answer_status: "verified",
    explanation: [
      "Hệ gồm hai vectơ \\(v_1 = [1/2, a, b]\\) và \\(v_2 = [0, 0, 2a]\\) là hệ trực chuẩn (orthonormal) khi và chỉ khi cả hai vectơ đều có độ dài bằng 1 và trực giao với nhau.",
      "1. Điều kiện độ dài của \\(v_2\\) bằng 1:",
      "\\[ \\|v_2\\|^2 = 0^2 + 0^2 + (2a)^2 = 4a^2 = 1 \\implies a^2 = \\frac{1}{4} \\implies a = \\pm\\frac{1}{2} \\]",
      "2. Điều kiện trực giao giữa \\(v_1\\) và \\(v_2\\):",
      "\\[ v_1 \\cdot v_2 = \\frac{1}{2}(0) + a(0) + b(2a) = 2ab = 0 \\]",
      "Vì \\(a = \\pm 1/2 \\ne 0\\), suy ra \\(b = 0\\).",
      "3. Kiểm tra lại điều kiện độ dài của \\(v_1\\) bằng 1:",
      "\\[ \\|v_1\\|^2 = \\left(\\frac{1}{2}\\right)^2 + a^2 + b^2 = \\frac{1}{4} + \\frac{1}{4} + 0 = \\frac{1}{2} \\ne 1 \\]",
      "Như vậy \\(\\|v_1\\| = \\frac{1}{\\sqrt{2}} < 1\\) với mọi giá trị \\(a, b\\) tìm được.",
      "Do đó không tồn tại các số \\(a\\) và \\(b\\) thỏa mãn yêu cầu đề bài (Đáp án D)."
    ],
    image: "assets/questions/0417_q417_Question_417.png",
    needs_image: false,
    confidence: "high"
  },
  {
    id: 418,
    chapter: "GT1",
    folder: "GT1",
    topic: "TichPhan",
    type: "single_choice",
    question: "Find \\(\\int \\frac{x\\,dx}{(\\cos x)^2}\\)\n(i) \\(x\\sin x - \\tan x + C\\)\n(ii) \\(x\\tan x + \\ln|\\cos x| + C\\)\n(iii) \\(x\\sin x + \\ln|\\cos x| + C\\)\n(iv) \\(x\\tan x + \\ln(\\cos x) + C\\)\n(v) \\(x\\tan x + \\ln|\\cos x|\\)",
    options: [
      "None of the other choices is correct",
      "(v)",
      "(i)",
      "(ii)",
      "(iv)",
      "(iii)"
    ],
    answer: "D",
    answer_original: "D",
    answer_status: "verified",
    explanation: [
      "Tích phân cần tính là \\(\\int x\\sec^2 x\\,dx\\).",
      "Áp dụng phương pháp tích phân từng phần:",
      "- Đặt \\(u = x \\implies du = dx\\)",
      "- Đặt \\(dv = \\sec^2 x\\,dx = \\frac{dx}{\\cos^2 x} \\implies v = \\tan x\\)",
      "Theo công thức từng phần:",
      "\\[ \\int x\\sec^2 x\\,dx = uv - \\int v\\,du = x\\tan x - \\int \\tan x\\,dx \\]",
      "Vì \\(\\int \\tan x\\,dx = -\\ln|\\cos x|\\), ta được:",
      "\\[ = x\\tan x - (-\\ln|\\cos x|) + C = x\\tan x + \\ln|\\cos x| + C \\]",
      "Biểu thức này tương ứng với (ii) (Đáp án D)."
    ],
    image: "assets/questions/0418_q418_Question_418.png",
    needs_image: false,
    confidence: "high"
  },
  {
    id: 419,
    chapter: "GT1",
    folder: "GT1",
    topic: "DaoHam",
    type: "single_choice",
    question: "The equation of motion given for a particle is \\(s = \\sin 2\\pi t\\), where \\(s\\) is in meters and \\(t\\) is seconds. Find the acceleration after 4.5 seconds.",
    options: [
      "(i) \\(-81\\pi^2\\,\\text{m/s}^2\\)",
      "(v) \\(9\\pi^2\\,\\text{m/s}^2\\)",
      "(iii) \\(0\\,\\text{m/s}^2\\)",
      "(ii) \\(81\\pi^2\\,\\text{m/s}^2\\)",
      "(iv) \\(-9\\pi^2\\,\\text{m/s}^2\\)"
    ],
    answer: "C",
    answer_original: "C",
    answer_status: "verified",
    explanation: [
      "Vận tốc là đạo hàm cấp một của phương trình chuyển động:",
      "\\[ v(t) = s'(t) = 2\\pi \\cos(2\\pi t) \\]",
      "Gia tốc là đạo hàm cấp hai của phương trình chuyển động:",
      "\\[ a(t) = v'(t) = s''(t) = -4\\pi^2 \\sin(2\\pi t) \\]",
      "Tại thời điểm \\(t = 4.5\\text{ s}\\):",
      "\\[ 2\\pi(4.5) = 9\\pi \\]",
      "\\[ a(4.5) = -4\\pi^2 \\sin(9\\pi) = -4\\pi^2(0) = 0\\,\\text{m/s}^2 \\]",
      "Kết quả tương ứng với (iii) \\(0\\,\\text{m/s}^2\\) (Đáp án C)."
    ],
    image: "assets/questions/0419_q419_Question_419.png",
    needs_image: false,
    confidence: "high"
  },
  {
    id: 420,
    chapter: "GT1",
    folder: "GT1",
    topic: "CucTri",
    type: "single_choice",
    question: "Find two positive numbers whose product is 24 and the sum of 2 times the first and 3 times the second is a minimum.",
    options: [
      "12 and 12",
      "4 and 6",
      "10 and 12",
      "6 and 4",
      "8 and 3"
    ],
    answer: "D",
    answer_original: "B",
    answer_status: "conflict",
    explanation: [
      "Gọi số dương thứ nhất là \\(x > 0\\) và số dương thứ hai là \\(y > 0\\).",
      "Tích của hai số là \\(xy = 24 \\implies y = \\frac{24}{x}\\).",
      "Hàm mục tiêu cần tối thiểu hóa là tổng \\(S(x) = 2x + 3y\\):",
      "\\[ S(x) = 2x + 3\\left(\\frac{24}{x}\\right) = 2x + \\frac{72}{x} \\]",
      "Áp dụng bất đẳng thức AM-GM cho hai số dương:",
      "\\[ 2x + \\frac{72}{x} \\ge 2\\sqrt{2x \\cdot \\frac{72}{x}} = 2\\sqrt{144} = 2(12) = 24 \\]",
      "Dấu bằng xảy ra khi và chỉ khi:",
      "\\[ 2x = \\frac{72}{x} \\implies 2x^2 = 72 \\implies x^2 = 36 \\implies x = 6 \\]",
      "Suy ra số thứ hai là \\(y = \\frac{24}{6} = 4\\).",
      "Thử lại:",
      "- Với \\((x, y) = (6, 4)\\): \\(2(6) + 3(4) = 12 + 12 = 24\\) (giá trị nhỏ nhất).",
      "- Với \\((x, y) = (4, 6)\\): \\(2(4) + 3(6) = 8 + 18 = 26 > 24\\).",
      "Do đó số thứ nhất là 6 và số thứ hai là 4, tương ứng với lựa chọn D (\"6 and 4\").",
      "Lưu ý đối chiếu: Ngân hàng câu hỏi gốc đánh dấu B (\"4 and 6\") do nhầm lẫn thứ tự của hai số (tổng khi đó là 26 chứ không phải cực tiểu 24). Đáp án chuẩn xác về mặt toán học là D."
    ],
    image: "assets/questions/0420_q420_Question_420.png",
    needs_image: false,
    review_flags: [
      "answer_conflict"
    ],
    confidence: "medium"
  },
  {
    id: 421,
    chapter: "DSTT1",
    folder: "DSTT1",
    topic: "KhongGianVector",
    type: "single_choice",
    question: "Find dimension of null \\(A\\)\n\\[ A = \\begin{bmatrix} 1 & 2 & 3 & 4 \\\\ 2 & 0 & 1 & 3 \\\\ 1 & 0 & 1 & 2 \\\\ 0 & 0 & 2 & 2 \\end{bmatrix} \\]",
    options: [
      "4",
      "2",
      "3",
      "0",
      "1"
    ],
    answer: "E",
    answer_original: "E",
    answer_status: "verified",
    explanation: [
      "Theo định lý Rank-Nullity cho ma trận \\(A\\) có kích thước \\(4 \\times 4\\) (với số cột \\(n = 4\\)):",
      "\\[ \\operatorname{rank}(A) + \\dim(\\operatorname{null}(A)) = 4 \\implies \\dim(\\operatorname{null}(A)) = 4 - \\operatorname{rank}(A) \\]",
      "Thực hiện biến đổi sơ cấp theo hàng để tìm hạng của \\(A\\):",
      "1. Trừ 2 lần hàng 3 khỏi hàng 2: \\([2, 0, 1, 3] - 2[1, 0, 1, 2] = [0, 0, -1, -1]\\).",
      "2. Nhận thấy hàng 4 là \\([0, 0, 2, 2] = -2[0, 0, -1, -1]\\), do đó hàng 4 bị triệt tiêu hoàn toàn thành toàn số 0.",
      "3. Ba hàng còn lại độc lập tuyến tính vì cột 2 chỉ có hàng 1 khác 0, và hàng 2, hàng 3 không tỷ lệ.",
      "Suy ra \\(\\operatorname{rank}(A) = 3\\).",
      "Vậy \\(\\dim(\\operatorname{null}(A)) = 4 - 3 = 1\\) (Đáp án E)."
    ],
    image: "assets/questions/0421_q421_Question_421.png",
    needs_image: false,
    confidence: "high"
  },
  {
    id: 422,
    chapter: "GT1",
    folder: "GT1",
    topic: "DaoHam",
    type: "single_choice",
    question: "Find \\(\\frac{dy}{dx}\\) for \\(y = \\int_1^x e^{\\cos t}\\,dt\\)\n(i) \\(e^{\\cos x}\\)\n(ii) \\(e^{\\cos x + 1}\\)\n(iii) \\((e + 1)^{\\cos x}\\)\n(iv) \\(e^x\\)",
    options: [
      "(iv)",
      "(ii)",
      "None of the other choices is correct",
      "(i)",
      "(iii)"
    ],
    answer: "D",
    answer_original: "D",
    answer_status: "verified",
    explanation: [
      "Theo định lý cơ bản của giải tích phần 1 (FTC 1):",
      "Nếu \\(y = \\int_a^x f(t)\\,dt\\) với cận dưới là hằng số, thì đạo hàm là:",
      "\\[ \\frac{dy}{dx} = f(x) \\]",
      "Ở đây \\(f(t) = e^{\\cos t}\\), suy ra:",
      "\\[ \\frac{dy}{dx} = e^{\\cos x} \\]",
      "Biểu thức này tương ứng với (i) (Đáp án D)."
    ],
    image: "assets/questions/0422_q422_Question_422.png",
    needs_image: false,
    confidence: "high"
  },
  {
    id: 423,
    chapter: "GT1",
    folder: "GT1",
    topic: "DaoHam",
    type: "single_choice",
    question: "Find all the values of \\(x\\) where the tangent line to the graph of the function is horizontal\n\\[ f(x) = \\frac{1}{3}x^3 - 2x + 7 \\]\n(i) \\(-2; 2\\)\n(ii) \\(7 - \\sqrt{2}; 7 + \\sqrt{2}\\)\n(iii) \\(-7; 7\\)\n(iv) \\(-\\sqrt{2}; \\sqrt{2}\\)",
    options: [
      "(iv)",
      "(iii)",
      "(i)",
      "(ii)",
      "None of the other choices is correct"
    ],
    answer: "A",
    answer_original: "A",
    answer_status: "verified",
    explanation: [
      "Tiếp tuyến của đồ thị hàm số nằm ngang (horizontal) khi và chỉ khi hệ số góc bằng 0, tức là \\(f'(x) = 0\\).",
      "Tính đạo hàm:",
      "\\[ f'(x) = \\frac{d}{dx}\\left(\\frac{1}{3}x^3 - 2x + 7\\right) = x^2 - 2 \\]",
      "Giải phương trình đạo hàm bằng 0:",
      "\\[ x^2 - 2 = 0 \\iff x^2 = 2 \\iff x = \\pm\\sqrt{2} \\]",
      "Tương ứng với (iv) \\(-\\sqrt{2}; \\sqrt{2}\\) (Đáp án A)."
    ],
    image: "assets/questions/0423_q423_Question_423.png",
    needs_image: false,
    confidence: "high"
  },
  {
    id: 424,
    chapter: "DSTT1",
    folder: "DSTT1",
    topic: "TriRieng",
    type: "single_choice",
    question: "Find the characteristic polynomial of the matrix \\(\\begin{bmatrix} 2 & 3 \\\\ 3 & 2 \\end{bmatrix}\\)\n(i) \\(x^2 - 4x - 5\\)\n(ii) \\(x^2 - 4x + 5\\)\n(iii) \\(x^2 + 4x - 5\\)\n(iv) \\(x^2 + 4x + 5\\)",
    options: [
      "None of the other choices is correct",
      "(i)",
      "(iv)",
      "(ii)",
      "(iii)"
    ],
    answer: "B",
    answer_original: "B",
    answer_status: "verified",
    explanation: [
      "Đa thức đặc trưng của ma trận \\(A\\) được xác định bởi \\(p(x) = \\det(xI - A)\\):",
      "\\[ xI - A = \\begin{bmatrix} x - 2 & -3 \\\\ -3 & x - 2 \\end{bmatrix} \\]",
      "Tính định thức:",
      "\\[ \\det(xI - A) = (x - 2)(x - 2) - (-3)(-3) = (x - 2)^2 - 9 = x^2 - 4x + 4 - 9 = x^2 - 4x - 5 \\]",
      "Biểu thức này tương ứng với (i) (Đáp án B)."
    ],
    image: "assets/questions/0424_q424_Question_424.png",
    needs_image: false,
    confidence: "high"
  },
  {
    id: 425,
    chapter: "GT1",
    folder: "GT1",
    topic: "GioiHan",
    type: "single_choice",
    question: "Which statements are true for the following piecewise function?\n\\[ f(x) = \\begin{cases} x^2 + 3x, & x < -3 \\\\ x^2 - 9, & -3 \\le x \\le 1 \\\\ 3x - 2, & x > 1 \\end{cases} \\]",
    options: [
      "The function is continuous at \\(x = 1\\) but discontinuous at \\(x = -3\\)",
      "The function is continuous at both \\(x = 1\\) and \\(x = -3\\)",
      "None of the other choices is correct",
      "The function is continuous at \\(x = -3\\) but discontinuous at \\(x = 1\\)"
    ],
    answer: "D",
    answer_original: "D",
    answer_status: "verified",
    explanation: [
      "1. Xét tính liên tục tại \\(x = -3\\):",
      "- Giới hạn trái: \\(\\lim_{x \\to -3^-} f(x) = (-3)^2 + 3(-3) = 9 - 9 = 0\\)",
      "- Giới hạn phải và giá trị hàm: \\(\\lim_{x \\to -3^+} f(x) = f(-3) = (-3)^2 - 9 = 0\\)",
      "Vì giới hạn trái bằng giới hạn phải và bằng \\(f(-3)\\), hàm số liên tục tại \\(x = -3\\).",
      "2. Xét tính liên tục tại \\(x = 1\\):",
      "- Giới hạn trái và giá trị hàm: \\(\\lim_{x \\to 1^-} f(x) = f(1) = 1^2 - 9 = -8\\)",
      "- Giới hạn phải: \\(\\lim_{x \\to 1^+} f(x) = 3(1) - 2 = 1\\)",
      "Vì giới hạn trái (\\(-8\\)) khác giới hạn phải (\\(1\\)), hàm số gián đoạn tại \\(x = 1\\).",
      "Kết luận: 'The function is continuous at \\(x = -3\\) but discontinuous at \\(x = 1\\)' (Đáp án D)."
    ],
    image: "assets/questions/0425_q425_Question_425.png",
    needs_image: false,
    confidence: "high"
  },
  {
    id: 426,
    chapter: "GT1",
    folder: "GT1",
    topic: "DaoHam",
    type: "single_choice",
    question: "A ball is thrown upward such that its height (in meters) takes the form \\(h(t) = 1 + 25t + at^2\\). Assume that the velocity of the ball at time \\(t = 2\\) is 5 m/s. Find \\(a\\).",
    options: [
      "None of the other choices is correct",
      "10",
      "-5",
      "5",
      "-10"
    ],
    answer: "C",
    answer_original: "C",
    answer_status: "verified",
    explanation: [
      "Vận tốc tức thời là đạo hàm bậc nhất của hàm độ cao theo thời gian:",
      "\\[ v(t) = h'(t) = \\frac{d}{dt}(1 + 25t + at^2) = 25 + 2at \\]",
      "Tại thời điểm \\(t = 2\\), vận tốc bằng 5 m/s:",
      "\\[ v(2) = 25 + 2a(2) = 25 + 4a = 5 \\]",
      "Giải phương trình tìm \\(a\\):",
      "\\[ 4a = 5 - 25 = -20 \\implies a = -5 \\]",
      "Đáp án đúng là C."
    ],
    image: "assets/questions/0426_q426_Question_426.png",
    needs_image: false,
    confidence: "high"
  },
  {
    id: 427,
    chapter: "DSTT1",
    folder: "DSTT1",
    topic: "TriRieng",
    type: "single_choice",
    question: "Given\n\\[ A = \\begin{bmatrix} 3 & 1 & 1 \\\\ 2 & 2 & 1 \\\\ 1 & 0 & 4 \\end{bmatrix}, \\quad u = [1, -1, 2]^T \\text{ and } v = [-3, 5, 1]^T. \\]\nChoose the correct statement.",
    options: [
      "\\(v\\) is an eigenvector of \\(A\\)",
      "Both \\(u\\) and \\(v\\) are eigenvectors of \\(A\\)",
      "\\(u\\) is an eigenvector of \\(A\\)",
      "None of the other choices is correct"
    ],
    answer: "A",
    answer_original: "D",
    answer_status: "conflict",
    explanation: [
      "Vectơ \\(\\mathbf{x} \\ne \\mathbf{0}\\) là vectơ riêng của ma trận \\(A\\) nếu tồn tại số thực \\(\\lambda\\) sao cho \\(A\\mathbf{x} = \\lambda \\mathbf{x}\\).",
      "1. Kiểm tra vectơ \\(u = [1, -1, 2]^T\\):",
      "\\[ Au = \\begin{bmatrix} 3(1) + 1(-1) + 1(2) \\\\ 2(1) + 2(-1) + 1(2) \\\\ 1(1) + 0(-1) + 4(2) \\end{bmatrix} = \\begin{bmatrix} 4 \\\\ 2 \\\\ 9 \\end{bmatrix} \\]",
      "Vì \\([4, 2, 9]^T\\) không cùng phương với \\([1, -1, 2]^T\\) (tỉ số \\(4/1 \\ne 2/(-1)\\)), nên \\(u\\) không phải là vectơ riêng.",
      "2. Kiểm tra vectơ \\(v = [-3, 5, 1]^T\\):",
      "\\[ Av = \\begin{bmatrix} 3(-3) + 1(5) + 1(1) \\\\ 2(-3) + 2(5) + 1(1) \\\\ 1(-3) + 0(5) + 4(1) \\end{bmatrix} = \\begin{bmatrix} -9 + 5 + 1 \\\\ -6 + 10 + 1 \\\\ -3 + 4 \\end{bmatrix} = \\begin{bmatrix} -3 \\\\ 5 \\\\ 1 \\end{bmatrix} = 1 \\cdot v \\]",
      "Ta thấy \\(Av = 1 \\cdot v\\), do đó \\(v\\) chính xác là một vectơ riêng của ma trận \\(A\\) ứng với giá trị riêng \\(\\lambda = 1\\).",
      "Phát biểu đúng là 'v is an eigenvector of A' (Đáp án A).",
      "Lưu ý đối chiếu: Ngân hàng câu hỏi gốc đánh dấu D (\"None of the other choices is correct\") do người ra đề tính toán nhầm phép nhân ma trận đối với vectơ \\(v\\). Đáp án toán học chính xác là A."
    ],
    image: "assets/questions/0427_q427_Question_427.png",
    needs_image: false,
    review_flags: [
      "answer_conflict"
    ],
    confidence: "medium"
  },
  {
    id: 428,
    chapter: "DSTT1",
    folder: "DSTT1",
    topic: "MaTran",
    type: "single_choice",
    question: "Let \\(A\\) be such that\n\\[ (A^T)^{-1} = \\begin{bmatrix} 3 & 5 \\\\ 2 & 4 \\end{bmatrix} \\]\nFind the \\((2, 2)\\)-entry of \\(A\\).",
    options: [
      "\\(3/2\\)",
      "\\(-1/2\\)",
      "None of the other choices is correct",
      "\\(1/2\\)",
      "\\(-3/2\\)"
    ],
    answer: "A",
    answer_original: "A",
    answer_status: "verified",
    explanation: [
      "Theo tính chất nghịch đảo và chuyển vị ma trận, ta có:",
      "\\[ A^T = \\left((A^T)^{-1}\\right)^{-1} = \\begin{bmatrix} 3 & 5 \\\\ 2 & 4 \\end{bmatrix}^{-1} \\]",
      "Tính định thức của ma trận \\(M = \\begin{bmatrix} 3 & 5 \\\\ 2 & 4 \\end{bmatrix}\\):",
      "\\[ \\det(M) = 3(4) - 5(2) = 12 - 10 = 2 \\]",
      "Nghịch đảo của \\(M\\) là:",
      "\\[ M^{-1} = \\frac{1}{2} \\begin{bmatrix} 4 & -5 \\\\ -2 & 3 \\end{bmatrix} = \\begin{bmatrix} 2 & -5/2 \\\\ -1 & 3/2 \\end{bmatrix} \\]",
      "Suy ra ma trận \\(A\\) là chuyển vị của \\(M^{-1}\\):",
      "\\[ A = (M^{-1})^T = \\begin{bmatrix} 2 & -1 \\\\ -5/2 & 3/2 \\end{bmatrix} \\]",
      "Phần tử ở vị trí \\((2, 2)\\) của ma trận \\(A\\) là \\(3/2\\) (Đáp án A)."
    ],
    image: "assets/questions/0428_q428_Question_428.png",
    needs_image: false,
    confidence: "high"
  },
  {
    id: 429,
    chapter: "DSTT1",
    folder: "DSTT1",
    topic: "KhongGianVector",
    type: "single_choice",
    question: "Let \\(u = [1, 0, 1]\\), \\(v = [0, 1, 1]\\). Which of the following vectors belong to \\(\\operatorname{span}\\{u, v\\}\\)?\n\\(x = [2, 3, 5], \\; y = [0, 0, 1]\\)",
    options: [
      "Only \\(y\\)",
      "Both \\(x\\) and \\(y\\)",
      "Only \\(x\\)",
      "None of \\(x\\) and \\(y\\)"
    ],
    answer: "C",
    answer_original: "C",
    answer_status: "verified",
    explanation: [
      "Vectơ \\([a, b, c]\\) thuộc \\(\\operatorname{span}\\{u, v\\}\\) khi và chỉ khi tồn tại hai số thực \\(c_1, c_2\\) sao cho:",
      "\\[ c_1[1, 0, 1] + c_2[0, 1, 1] = [c_1, c_2, c_1 + c_2] = [a, b, c] \\]",
      "Điều kiện tương đương là tọa độ thứ ba phải bằng tổng hai tọa độ đầu: \\(c = a + b\\).",
      "1. Với vectơ \\(x = [2, 3, 5]\\): ta có \\(2 + 3 = 5\\) (Thỏa mãn, với \\(c_1 = 2, c_2 = 3\\)). Do đó \\(x \\in \\operatorname{span}\\{u, v\\}\\).",
      "2. Với vectơ \\(y = [0, 0, 1]\\): ta có \\(0 + 0 = 0 \\ne 1\\) (Không thỏa mãn). Do đó \\(y \\notin \\operatorname{span}\\{u, v\\}\\).",
      "Vậy chỉ có vectơ \\(x\\) thuộc không gian sinh (Đáp án C)."
    ],
    image: "assets/questions/0429_q429_Question_429.png",
    needs_image: false,
    confidence: "high"
  },
  {
    id: 430,
    chapter: "DSTT1",
    folder: "DSTT1",
    topic: "VectorHinhHoc",
    type: "single_choice",
    question: "Find the point where the line through \\(A = (3, -2, 7)\\) and \\(B = (13, 3, -8)\\) meets the XZ-plane.",
    options: [
      "\\((7, 0, 1)\\)",
      "\\((7, 0, 0)\\)",
      "\\((7, 1, -1)\\)",
      "\\((-7, 0, 1)\\)",
      "None of the other choices is correct"
    ],
    answer: "A",
    answer_original: "A",
    answer_status: "verified",
    explanation: [
      "Vectơ chỉ phương của đường thẳng đi qua \\(A\\) và \\(B\\) là:",
      "\\[ \\vec{AB} = (13 - 3, 3 - (-2), -8 - 7) = (10, 5, -15) \\]",
      "Chọn vectơ chỉ phương tối giản \\(\\vec{u} = (2, 1, -3)\\).",
      "Phương trình tham số của đường thẳng:",
      "\\[ \\begin{cases} x = 3 + 2t \\\\ y = -2 + t \\\\ z = 7 - 3t \\end{cases} \\]",
      "Mặt phẳng XZ có phương trình \\(y = 0\\). Thay vào phương trình tham số:",
      "\\[ -2 + t = 0 \\implies t = 2 \\]",
      "Thay \\(t = 2\\) vào \\(x\\) và \\(z\\):",
      "- \\(x = 3 + 2(2) = 7\\)",
      "- \\(y = 0\\)",
      "- \\(z = 7 - 3(2) = 1\\)",
      "Tọa độ giao điểm là \\((7, 0, 1)\\) (Đáp án A)."
    ],
    image: "assets/questions/0430_q430_Question_430.png",
    needs_image: false,
    confidence: "high"
  },
  {
    id: 431,
    chapter: "GT1",
    folder: "GT1",
    topic: "DaoHam",
    type: "single_choice",
    question: "Find \\(y'(0)\\) for \\(y = \\sqrt{1 - 8x} + (1 - 4x)^2\\).",
    options: [
      "None of the other choices is correct",
      "-12",
      "-8",
      "-10",
      "-14"
    ],
    answer: "B",
    answer_original: "B",
    answer_status: "verified",
    explanation: [
      "Lấy đạo hàm của từng thành phần trong hàm số:",
      "\\[ y' = \\frac{d}{dx}\\left(\\sqrt{1 - 8x}\\right) + \\frac{d}{dx}\\left((1 - 4x)^2\\right) \\]",
      "\\[ = \\frac{-8}{2\\sqrt{1 - 8x}} + 2(1 - 4x)(-4) = \\frac{-4}{\\sqrt{1 - 8x}} - 8(1 - 4x) \\]",
      "Thay \\(x = 0\\) vào biểu thức đạo hàm:",
      "\\[ y'(0) = \\frac{-4}{\\sqrt{1 - 0}} - 8(1 - 0) = -4 - 8 = -12 \\]",
      "Đáp án đúng là B."
    ],
    image: "assets/questions/0431_q431_Question_431.png",
    needs_image: false,
    confidence: "high"
  },
  {
    id: 432,
    chapter: "GT1",
    folder: "GT1",
    topic: "HamSo",
    type: "single_choice",
    question: "Find the range of the function\n\\[ f(x) = e^{x^2} \\]\n(i) \\([0, \\infty)\\)\n(ii) \\((1, \\infty)\\)\n(iii) \\((0, \\infty)\\)\n(iv) \\([1, \\infty)\\)",
    options: [
      "(iv)",
      "(ii)",
      "None of them",
      "(i)",
      "(iii)"
    ],
    answer: "A",
    answer_original: "A",
    answer_status: "verified",
    explanation: [
      "Với mọi số thực \\(x \\in \\mathbb{R}\\), ta luôn có \\(x^2 \\ge 0\\).",
      "Do hàm số mũ \\(e^u\\) là hàm đồng biến thực sự trên \\(\\mathbb{R}\\), ta có:",
      "\\[ e^{x^2} \\ge e^0 = 1 \\]",
      "Hơn nữa, khi \\(x \\to \\pm\\infty\\) thì \\(x^2 \\to \\infty \\implies e^{x^2} \\to \\infty\\).",
      "Vì hàm số liên tục trên \\(\\mathbb{R}\\), hàm số nhận mọi giá trị từ 1 đến \\(+\\infty\\).",
      "Do đó tập giá trị (range) của hàm số là \\([1, \\infty)\\), tương ứng với (iv) (Đáp án A)."
    ],
    image: "assets/questions/0432_q432_Question_432.png",
    needs_image: false,
    confidence: "high"
  },
  {
    id: 433,
    chapter: "DSTT1",
    folder: "DSTT1",
    topic: "HePhuongTrinh",
    type: "single_choice",
    question: "Find all solutions of the following system of linear equations\n\\[ \\begin{cases} x - y - z = 3 \\\\ -x - y + z = -1 \\end{cases} \\]",
    options: [
      "\\(x = t, y = -1, z = t - 2\\)",
      "\\(x = 8, y = 4, z = 1\\)",
      "\\(x = t - 2, y = -1, z = t\\)",
      "None of the other choices is correct"
    ],
    answer: "A",
    answer_original: "A",
    answer_status: "verified",
    explanation: [
      "Cộng hai phương trình của hệ:",
      "\\[ (x - y - z) + (-x - y + z) = 3 + (-1) \\implies -2y = 2 \\implies y = -1 \\]",
      "Thay \\(y = -1\\) vào phương trình thứ nhất:",
      "\\[ x - (-1) - z = 3 \\implies x + 1 - z = 3 \\implies z = x - 2 \\]",
      "Chọn ẩn tự do \\(x = t\\) (với \\(t \\in \\mathbb{R}\\)):",
      "\\[ \\begin{cases} x = t \\\\ y = -1 \\\\ z = t - 2 \\end{cases} \\]",
      "Đáp án đúng là A."
    ],
    image: "assets/questions/0433_q433_Question_433.png",
    needs_image: false,
    confidence: "high"
  },
  {
    id: 434,
    chapter: "GT1",
    folder: "GT1",
    topic: "CucTri",
    type: "single_choice",
    question: "Find the absolute maximum and absolute minimum values of\n\\[ f(x) = \\frac{-1}{x^2} \\]\non \\([1/2, 2]\\).",
    options: [
      "Absolute maximum: \\(-1/4\\), absolute minimum: \\(-2\\)",
      "None of the other choices is correct",
      "Absolute maximum: \\(-1/2\\), absolute minimum: \\(-2\\)",
      "Absolute maximum: \\(-1/4\\), absolute minimum: \\(-4\\)",
      "Absolute maximum: \\(-1/2\\), absolute minimum: \\(-4\\)"
    ],
    answer: "D",
    answer_original: "D",
    answer_status: "verified",
    explanation: [
      "Xét hàm số \\(f(x) = -x^{-2}\\) trên đoạn \\([1/2, 2]\\).",
      "Tính đạo hàm:",
      "\\[ f'(x) = 2x^{-3} = \\frac{2}{x^3} \\]",
      "Với mọi \\(x \\in [1/2, 2]\\), \\(f'(x) > 0\\), do đó hàm số đồng biến thực sự trên đoạn \\([1/2, 2]\\).",
      "Giá trị lớn nhất và nhỏ nhất đạt được tại hai đầu mút:",
      "- Giá trị nhỏ nhất tuyệt đối (Absolute minimum) tại đầu mút trái \\(x = 1/2\\):",
      "\\[ f(1/2) = \\frac{-1}{(1/2)^2} = \\frac{-1}{1/4} = -4 \\]",
      "- Giá trị lớn nhất tuyệt đối (Absolute maximum) tại đầu mút phải \\(x = 2\\):",
      "\\[ f(2) = \\frac{-1}{2^2} = -\\frac{1}{4} \\]",
      "Vậy giá trị lớn nhất là \\(-1/4\\) và giá trị nhỏ nhất là \\(-4\\) (Đáp án D)."
    ],
    image: "assets/questions/0434_q434_Question_434.png",
    needs_image: false,
    confidence: "high"
  },
  {
    id: 435,
    chapter: "GT1",
    folder: "GT1",
    topic: "DaoHam",
    type: "single_choice",
    question: "Let \\(f(x) = \\int_0^{x^2 + 1} \\cos(t)\\,t\\,dt\\). Find \\(f'(x)\\).\n(i) \\((x^2 + 1)(t^2 + 1)\\cos(t^2 + 1)\\)\n(ii) \\((x^2 + 1)\\cos(x^2 + 1)\\)\n(iii) \\((t^2 + 1)\\cos(t^2 + 1)\\)\n(iv) \\(2x(x^2 + 1)\\cos(x^2 + 1)\\)",
    options: [
      "(iv)",
      "(iii)",
      "(ii)",
      "(i)",
      "None of the other choices is correct"
    ],
    answer: "A",
    answer_original: "A",
    answer_status: "verified",
    explanation: [
      "Áp dụng quy tắc đạo hàm theo cận tích phân (định lý cơ bản của giải tích kết hợp quy tắc dây chuyền Leibniz):",
      "\\[ \\frac{d}{dx} \\left( \\int_a^{u(x)} g(t)\\,dt \\right) = g(u(x)) \\cdot u'(x) \\]",
      "Ở đây:",
      "- Hàm dưới dấu tích phân: \\(g(t) = t\\cos(t)\\)",
      "- Cận trên: \\(u(x) = x^2 + 1 \\implies u'(x) = 2x\\)",
      "Thay vào công thức:",
      "\\[ f'(x) = (x^2 + 1)\\cos(x^2 + 1) \\cdot (2x) = 2x(x^2 + 1)\\cos(x^2 + 1) \\]",
      "Biểu thức này tương ứng với (iv) (Đáp án A)."
    ],
    image: "assets/questions/0435_q435_Question_435.png",
    needs_image: false,
    confidence: "high"
  },
  {
    id: 436,
    chapter: "GT1",
    folder: "GT1",
    topic: "TichPhan",
    type: "single_choice",
    question: "Use the Trapezoidal Rule with \\(n = 4\\) to estimate the value of the integral \\(\\int_1^5 f(x)\\,dx\\) using the table:\n\\(\\begin{array}{|c|c|c|c|c|c|}\\hline x & 1.0 & 2.0 & 3.0 & 4.0 & 5.0 \\\\ \\hline f(x) & 0.54 & 0.21 & 0.33 & 0.16 & 0.06 \\\\ \\hline\\end{array}\\)",
    options: [
      "0.55",
      "1.25",
      "1.0",
      "0.5",
      "None of the other choices is correct"
    ],
    answer: "C",
    answer_original: "C",
    answer_status: "verified",
    explanation: [
      "Độ dài mỗi khoảng chia: \\(\\Delta x = \\frac{5.0 - 1.0}{4} = 1.0\\).",
      "Công thức hình thang (Trapezoidal Rule) cho \\(n = 4\\):",
      "\\[ T_4 = \\frac{\\Delta x}{2} \\left[ f(x_0) + 2f(x_1) + 2f(x_2) + 2f(x_3) + f(x_4) \\right] \\]",
      "Thay các giá trị tương ứng từ bảng số liệu:",
      "\\[ T_4 = \\frac{1.0}{2} \\left[ 0.54 + 2(0.21) + 2(0.33) + 2(0.16) + 0.06 \\right] \\]",
      "\\[ = 0.5 \\times \\left[ 0.54 + 0.42 + 0.66 + 0.32 + 0.06 \\right] = 0.5 \\times 2.00 = 1.0 \\]",
      "Đáp án đúng là C."
    ],
    image: "assets/questions/0436_q436_Question_436.png",
    needs_image: false,
    confidence: "high"
  },
  {
    id: 437,
    chapter: "DSTT1",
    folder: "DSTT1",
    topic: "KhongGianVector",
    type: "single_choice",
    question: "Let A be a \\(3 \\times 4\\) matrix. If \\(\\dim(\\operatorname{Row}(A)) = 3\\), what is \\(\\dim(\\operatorname{Null}(A))\\)?",
    options: [
      "1",
      "2",
      "3",
      "4",
      "0"
    ],
    answer: "A",
    answer_original: "A",
    answer_status: "verified",
    explanation: [
      "Số chiều của không gian hàng chính là hạng của ma trận: \\(\\operatorname{rank}(A) = \\dim(\\operatorname{Row}(A)) = 3\\).",
      "Ma trận \\(A\\) có kích thước \\(3 \\times 4\\), số cột là \\(n = 4\\).",
      "Theo định lý Rank-Nullity (định lý về số chiều của không gian nghiệm):",
      "\\[ \\operatorname{rank}(A) + \\dim(\\operatorname{Null}(A)) = n \\]",
      "\\[ 3 + \\dim(\\operatorname{Null}(A)) = 4 \\implies \\dim(\\operatorname{Null}(A)) = 4 - 3 = 1 \\]",
      "Đáp án đúng là A."
    ],
    image: "assets/questions/0437_q437_Question_437.png",
    needs_image: false,
    confidence: "high"
  },
  {
    id: 438,
    chapter: "GT1",
    folder: "GT1",
    topic: "DaoHam",
    type: "single_choice",
    question: "Find \\(f'(0)\\) for \\(f(x) = \\cos(x^3 + 3x + 4)\\).",
    options: [
      "\\(-3\\sin(4)\\)",
      "\\(3\\cos(4)\\)",
      "\\(3\\sin(4)\\)",
      "\\(\\cos(4)\\)",
      "None of the other choices is correct"
    ],
    answer: "A",
    answer_original: "A",
    answer_status: "verified",
    explanation: [
      "Áp dụng quy tắc đạo hàm hàm hợp \\(\\frac{d}{dx}\\cos(u) = -\\sin(u) \\cdot u'\\):",
      "\\[ f'(x) = -\\sin(x^3 + 3x + 4) \\cdot \\frac{d}{dx}(x^3 + 3x + 4) = -\\sin(x^3 + 3x + 4) \\cdot (3x^2 + 3) \\]",
      "Tại \\(x = 0\\):",
      "\\[ f'(0) = -\\sin(0 + 0 + 4) \\cdot (3(0)^2 + 3) = -3\\sin(4) \\]",
      "Đáp án đúng là A."
    ],
    image: "assets/questions/0438_q438_Question_438.png",
    needs_image: false,
    confidence: "high"
  },
  {
    id: 439,
    chapter: "DSTT1",
    folder: "DSTT1",
    topic: "MaTran",
    type: "single_choice",
    question: "Let\n\\[ A = \\begin{bmatrix} 1 & 1 \\\\ 1 & m \\end{bmatrix}. \\]\nFind all values of \\(m\\) such that \\(A^2 = I_2\\).",
    options: [
      "-1",
      "0",
      "None of the other choices is correct",
      "1",
      "-2"
    ],
    answer: "C",
    answer_original: "C",
    answer_status: "verified",
    explanation: [
      "Tính bình phương ma trận \\(A\\):",
      "\\[ A^2 = \\begin{bmatrix} 1 & 1 \\\\ 1 & m \\end{bmatrix} \\begin{bmatrix} 1 & 1 \\\\ 1 & m \\end{bmatrix} = \\begin{bmatrix} 1(1) + 1(1) & 1(1) + 1(m) \\\\ 1(1) + m(1) & 1(1) + m(m) \\end{bmatrix} = \\begin{bmatrix} 2 & 1 + m \\\\ 1 + m & 1 + m^2 \\end{bmatrix} \\]",
      "Để \\(A^2 = I_2 = \\begin{bmatrix} 1 & 0 \\\\ 0 & 1 \\end{bmatrix}\\), các phần tử tương ứng ở vị trí \\((1, 1)\\) phải bằng nhau:",
      "\\[ 2 = 1 \\]",
      "Điều này là vô lý (mâu thuẫn). Do đó không tồn tại bất kỳ giá trị nào của \\(m\\) để \\(A^2 = I_2\\).",
      "Vậy đáp án là 'None of the other choices is correct' (Đáp án C)."
    ],
    image: "assets/questions/0439_q439_Question_439.png",
    needs_image: false,
    confidence: "high"
  },
  {
    id: 440,
    chapter: "DSTT1",
    folder: "DSTT1",
    topic: "DinhThuc",
    type: "single_choice",
    question: "Let A, B be \\(3 \\times 3\\) matrices, \\(\\det A = -2\\), \\(\\det B = 5\\). Choose the correct statement.\n(i) \\(\\det(2AB^T) = -80\\)\n(ii) \\(\\det(A + B) = 3\\)\n(iii) \\(\\det(2AB) = -20\\)",
    options: [
      "(iii)",
      "None of the others",
      "(ii)",
      "(i)"
    ],
    answer: "D",
    answer_original: "D",
    answer_status: "verified",
    explanation: [
      "Cho \\(A, B\\) là ma trận vuông cấp \\(n = 3\\). Áp dụng các tính chất của định thức:",
      "1. \\(\\det(cM) = c^n \\det(M) = c^3 \\det(M)\\) với \\(c = 2\\).",
      "2. \\(\\det(MN) = \\det(M)\\det(N)\\).",
      "3. \\(\\det(B^T) = \\det(B)\\).",
      "Xét mệnh đề (i):",
      "\\[ \\det(2AB^T) = 2^3 \\det(A) \\det(B^T) = 8 \\cdot (-2) \\cdot 5 = -80 \\]",
      "Mệnh đề (i) hoàn toàn ĐÚNG.",
      "Xét mệnh đề (ii):",
      "Định thức không có tính chất cộng \\(\\det(A + B) \\ne \\det(A) + \\det(B)\\). (ii) sai.",
      "Xét mệnh đề (iii):",
      "\\[ \\det(2AB) = 2^3 \\det(A)\\det(B) = 8 \\cdot (-2) \\cdot 5 = -80 \\ne -20 \\]",
      "Do đó chỉ có (i) đúng, tương ứng với lựa chọn D (Đáp án D)."
    ],
    image: "assets/questions/0440_q440_Question_440.png",
    needs_image: false,
    confidence: "high"
  }
];

batch11.forEach(q => {
  if (!q.review_flags) q.review_flags = [];
});

const outputPath = path.join(__dirname, '..', 'data', 'v2', 'batches', 'batch_11.json');
fs.writeFileSync(outputPath, JSON.stringify(batch11, null, 2), 'utf8');
console.log(`Successfully written ${batch11.length} questions to ${outputPath}`);
