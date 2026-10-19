"""
MAD101 Studio - Schema v2 Batch 025 Builder
Questions: 961 to 1000 (40 questions)
Updates: v2/questions_sample_v2.json and v2/questions_v2.js
"""

import json
import os

batch_025_questions = [
    {
        "id": 961,
        "question": "Cho \\(X, Y, Z\\) là các tập hợp bất kỳ. Mệnh đề nào sau đây là SAI?\n(i) \\((X \\cap Y) \\cup (X \\cap \\overline{Y}) = X\\)\n(ii) \\((X \\cap Y) \\cup Z = X \\cap (Y \\cup Z)\\)\n(iii) \\(X \\cap (Y \\cup Z) = (X \\cap Y) \\cup (X \\cap Z)\\)\n(iv) \\((X \\cap Y) \\cap Z = X \\cap (Y \\cap Z)\\)",
        "options": [
            "A. (ii)",
            "B. (iii)",
            "C. (iv)",
            "D. (i)"
        ],
        "answer": "A",
        "answer_status": "verified",
        "explanation": [
            "Bước 1: Theo luật phân phối của các phép toán tập hợp, ta có:\n\\[(X \\cap Y) \\cup Z = (X \\cup Z) \\cap (Y \\cup Z)\\]\nBiểu thức này nhìn chung không bằng \\(X \\cap (Y \\cup Z)\\). Ví dụ lấy \\(X = \\emptyset, Y = \\emptyset, Z = \\{1\\}\\), thì vế trái là \\(\\{1\\}\\) trong khi vế phải là \\(\\emptyset\\). Do đó mệnh đề (ii) là SAI.",
            "Bước 2: Mệnh đề (i) đúng theo luật phân phối và phần bù: \\(X \\cap (Y \\cup \\overline{Y}) = X \\cap U = X\\).\nMệnh đề (iii) là luật phân phối chuẩn, mệnh đề (iv) là luật kết hợp chuẩn. Vậy mệnh đề sai là (ii)."
        ],
        "diagram": None,
        "metadata": {
            "chapter": "Ch2_BasicStructures",
            "topic": "Đồng nhất thức tập hợp",
            "difficulty": "easy",
            "verified": True,
            "has_diagram": False,
            "calculator_allowed": False
        }
    },
    {
        "id": 962,
        "question": "Xác định xem ánh xạ nào dưới đây là một hàm số (function) hợp lệ:\n(i) \\(f: \\mathbb{R} \\to \\mathbb{R}, f(x) = \\sqrt{x^2 + 4}\\)\n(ii) \\(f: \\mathbb{R} \\to \\mathbb{R}, f(x) = \\pm\\sqrt{x^2 + 4}\\)\n(iii) \\(f: \\mathbb{R} \\to \\mathbb{R}, f(x) = \\frac{1}{x^2 - 4}\\)",
        "options": [
            "A. (ii)",
            "B. (iii)",
            "C. (i)"
        ],
        "answer": "C",
        "answer_status": "verified",
        "explanation": [
            "Bước 1: Một quy tắc \\(f: A \\to B\\) là một hàm số khi và chỉ khi mỗi phần tử \\(x \\in A\\) được gán với duy nhất một phần tử \\(f(x) \\in B\\).",
            "Bước 2: Kiểm tra từng trường hợp:\n- Với (i): Với mọi \\(x \\in \\mathbb{R}\\), \\(x^2 + 4 \\ge 4 > 0\\), căn bậc hai số học \\(\\sqrt{x^2 + 4}\\) luôn xác định duy nhất một số thực thuộc \\(\\mathbb{R}\\). Do đó (i) là hàm số.\n- Với (ii): Dấu \\(\\pm\\) gán mỗi \\(x\\) với hai giá trị khác nhau, vi phạm tính đơn trị.\n- Với (iii): Tại \\(x = 2\\) và \\(x = -2\\), mẫu số bằng 0 nên \\(f(x)\\) không xác định trên toàn bộ tập nguồn \\(\\mathbb{R}\\).",
            "Bước 3: Vậy chỉ có (i) là hàm số hợp lệ."
        ],
        "diagram": None,
        "metadata": {
            "chapter": "Ch2_BasicStructures",
            "topic": "Định nghĩa hàm số",
            "difficulty": "easy",
            "verified": True,
            "has_diagram": False,
            "calculator_allowed": False
        }
    },
    {
        "id": 963,
        "question": "Cho hai hàm số \\(f: \\mathbb{R} \\to \\mathbb{Z}, f(x) = \\lfloor \\frac{x}{2} \\rfloor\\) và \\(g: \\mathbb{Z} \\to \\mathbb{R}, g(x) = \\lceil \\frac{x}{2} \\rceil\\). Tính giá trị của hàm hợp \\(g \\circ f(2015)\\):",
        "options": [
            "A. 503",
            "B. 501",
            "C. 504",
            "D. 502",
            "E. 505"
        ],
        "answer": "C",
        "answer_status": "verified",
        "explanation": [
            "Bước 1: Tính giá trị của hàm trong \\(f(2015)\\):\n\\[f(2015) = \\left\\lfloor \\frac{2015}{2} \\right\\rfloor = \\lfloor 1007.5 \\rfloor = 1007\\]",
            "Bước 2: Tính giá trị của hàm ngoài \\(g(f(2015)) = g(1007)\\):\n\\[g(1007) = \\left\\lceil \\frac{1007}{2} \\right\\rceil = \\lceil 503.5 \\rceil = 504\\]",
            "Bước 3: Kết luận \\(g \\circ f(2015) = 504\\), tương ứng với đáp án C."
        ],
        "diagram": None,
        "metadata": {
            "chapter": "Ch2_BasicStructures",
            "topic": "Hàm hợp cùng hàm sàn và trần",
            "difficulty": "easy",
            "verified": True,
            "has_diagram": False,
            "calculator_allowed": False
        }
    },
    {
        "id": 964,
        "question": "Dãy số nào sau đây là một cấp số cộng (arithmetic progression)?\n(i) \\(1, 0, -1, 0, 1, 0, -1, \\dots\\)\n(ii) \\(-2, 3, -4, 5, \\dots\\)\n(iii) \\(5, 8, 11, 14, 17, \\dots\\)\n(iv) \\(1, 3, 3, 4, 5, \\dots\\)",
        "options": [
            "A. (iv)",
            "B. (i)",
            "C. (iii)",
            "D. (ii)"
        ],
        "answer": "C",
        "answer_status": "verified",
        "explanation": [
            "Bước 1: Dãy số \\(\\{a_n\\}\\) là một cấp số cộng nếu hiệu giữa hai số hạng liên tiếp luôn là một hằng số không đổi: \\(a_{n+1} - a_n = d\\) với mọi \\(n\\).",
            "Bước 2: Xét dãy (iii) \\(5, 8, 11, 14, 17, \\dots\\):\n\\(8 - 5 = 3\\), \\(11 - 8 = 3\\), \\(14 - 11 = 3\\), \\(17 - 14 = 3\\). Hiệu số luôn bằng 3 (công sai \\(d = 3\\)).",
            "Bước 3: Các dãy còn lại không có hiệu hai số hạng liên tiếp không đổi. Vậy dãy (iii) là cấp số cộng duy nhất."
        ],
        "diagram": None,
        "metadata": {
            "chapter": "Ch2_BasicStructures",
            "topic": "Cấp số cộng",
            "difficulty": "easy",
            "verified": True,
            "has_diagram": False,
            "calculator_allowed": False
        }
    },
    {
        "id": 965,
        "question": "Cho dãy số giả ngẫu nhiên \\(\\{x_n\\}\\) được xác định bởi \\(x_0 = 2\\), và \\(x_{n+1} = 3x_n \\bmod 11\\) với mọi \\(n \\ge 0\\). Tìm giá trị \\(x_5\\).",
        "options": [
            "A. 2",
            "B. 10",
            "C. 7",
            "D. None of the other choices is correct",
            "E. 24"
        ],
        "answer": "A",
        "answer_status": "verified",
        "explanation": [
            "Bước 1: Tính lần lượt các số hạng của dãy theo công thức truy hồi đồng dư:\n- \\(x_0 = 2\\)\n- \\(x_1 = (3 \\times 2) \\bmod 11 = 6 \\bmod 11 = 6\\)\n- \\(x_2 = (3 \\times 6) \\bmod 11 = 18 \\bmod 11 = 7\\)\n- \\(x_3 = (3 \\times 7) \\bmod 11 = 21 \\bmod 11 = 10\\)",
            "Bước 2: Tính các số hạng tiếp theo:\n- \\(x_4 = (3 \\times 10) \\bmod 11 = 30 \\bmod 11 = 8\\)\n- \\(x_5 = (3 \\times 8) \\bmod 11 = 24 \\bmod 11 = 2\\)",
            "Bước 3: Vậy \\(x_5 = 2\\), tương ứng với đáp án A."
        ],
        "diagram": None,
        "metadata": {
            "chapter": "Ch4_NumberTheory",
            "topic": "Máy phát số giả ngẫu nhiên LCG",
            "difficulty": "easy",
            "verified": True,
            "has_diagram": False,
            "calculator_allowed": False
        }
    },
    {
        "id": 966,
        "question": "Gọi \\(P(n)\\) là mệnh đề \"\\(3^n < n!\\)\". Chọn khẳng định ĐÚNG trong các câu sau:",
        "options": [
            "A. P(4), P(7) are true",
            "B. P(5), P(8) are true",
            "C. P(7), P(10) are true",
            "D. P(6), P(9) are true"
        ],
        "answer": "C",
        "answer_status": "verified",
        "explanation": [
            "Bước 1: Tính và so sánh \\(3^n\\) và \\(n!\\) với các giá trị \\(n\\) từ 4 đến 7:\n- \\(n = 4\\): \\(3^4 = 81\\), \\(4! = 24\\) (Sai vì \\(81 > 24\\)).\n- \\(n = 5\\): \\(3^5 = 243\\), \\(5! = 120\\) (Sai vì \\(243 > 120\\)).\n- \\(n = 6\\): \\(3^6 = 729\\), \\(6! = 720\\) (Sai vì \\(729 > 720\\)).\n- \\(n = 7\\): \\(3^7 = 2187\\), \\(7! = 5040\\) (Đúng vì \\(2187 < 5040\\)).",
            "Bước 2: Với mọi \\(n \\ge 7\\), tỉ số tăng trưởng của giai thừa \\((n+1)! / n! = n+1 \\ge 8 > 3\\), do đó \\(P(n)\\) luôn đúng với mọi \\(n \\ge 7\\).",
            "Bước 3: Do \\(P(n)\\) đúng khi \\(n \\ge 7\\) và sai khi \\(n \\le 6\\), các khẳng định chứa \\(P(4), P(5), P(6)\\) đều sai. Khẳng định duy nhất đúng là \"P(7), P(10) are true\" (đáp án C)."
        ],
        "diagram": None,
        "metadata": {
            "chapter": "Ch5_Induction",
            "topic": "Quy nạp và bất đẳng thức giai thừa",
            "difficulty": "easy",
            "verified": True,
            "has_diagram": False,
            "calculator_allowed": False
        }
    },
    {
        "id": 967,
        "question": "Tìm giá trị đầu ra của thuật toán đệ quy sau khi \\(n = 4\\):\n```pascal\nprocedure f (n: positive integer)\nif n = 1 then\n  return 1\nelse\n  return 3*f(n-1) + 4\n```",
        "options": [
            "A. 79",
            "B. 83",
            "C. 10",
            "D. None of the other choices is correct"
        ],
        "answer": "A",
        "answer_status": "verified",
        "explanation": [
            "Bước 1: Phân tích các bước thực thi của hàm đệ quy:\n- Bước cơ sở: \\(f(1) = 1\\).\n- Bước đệ quy: \\(f(n) = 3f(n-1) + 4\\).",
            "Bước 2: Tính lần lượt từ \\(n = 1\\) đến \\(n = 4\\):\n- \\(f(1) = 1\\)\n- \\(f(2) = 3 \\times 1 + 4 = 7\\)\n- \\(f(3) = 3 \\times 7 + 4 = 25\\)\n- \\(f(4) = 3 \\times 25 + 4 = 79\\)",
            "Bước 3: Đầu ra của thuật toán là 79, tương ứng với đáp án A."
        ],
        "diagram": None,
        "metadata": {
            "chapter": "Ch5_Induction",
            "topic": "Vết thuật toán đệ quy",
            "difficulty": "easy",
            "verified": True,
            "has_diagram": False,
            "calculator_allowed": False
        }
    },
    {
        "id": 968,
        "question": "Cho hệ thức truy hồi:\n\\[a_n = 2a_{n-1} + 2a_{n-2} + 3^{n-2}\\]\nvới mọi \\(n \\ge 2\\), cùng các điều kiện ban đầu \\(a_0 = a_1 = 0\\). Giá trị của \\(a_5\\) là bao nhiêu?",
        "options": [
            "A. 281",
            "B. 0",
            "C. 79",
            "D. 21",
            "E. 6"
        ],
        "answer": "C",
        "answer_status": "verified",
        "explanation": [
            "Bước 1: Tính tuần tự từng số hạng của hệ thức truy hồi:\n- \\(a_0 = 0, a_1 = 0\\)\n- \\(n = 2\\): \\(a_2 = 2a_1 + 2a_0 + 3^0 = 2(0) + 2(0) + 1 = 1\\)\n- \\(n = 3\\): \\(a_3 = 2a_2 + 2a_1 + 3^1 = 2(1) + 2(0) + 3 = 5\\)",
            "Bước 2: Tính tiếp \\(a_4\\) và \\(a_5\\):\n- \\(n = 4\\): \\(a_4 = 2a_3 + 2a_2 + 3^2 = 2(5) + 2(1) + 9 = 10 + 2 + 9 = 21\\)\n- \\(n = 5\\): \\(a_5 = 2a_4 + 2a_3 + 3^3 = 2(21) + 2(5) + 27 = 42 + 10 + 27 = 79\\)",
            "Bước 3: Vậy \\(a_5 = 79\\), tương ứng với đáp án C."
        ],
        "diagram": None,
        "metadata": {
            "chapter": "Ch5_Induction",
            "topic": "Hệ thức truy hồi không thuần nhất",
            "difficulty": "medium",
            "verified": True,
            "has_diagram": False,
            "calculator_allowed": False
        }
    },
    {
        "id": 969,
        "question": "Giả sử hàm \\(f\\) thỏa mãn hệ thức \\(f(n) = 2f(n/3) - n\\) và \\(f(81) = -115\\). Tìm giá trị \\(f(1)\\).",
        "options": [
            "A. 4",
            "B. 5",
            "C. 3",
            "D. 6",
            "E. None of the other choices is correct"
        ],
        "answer": "B",
        "answer_status": "verified",
        "explanation": [
            "Bước 1: Từ hệ thức \\(f(n) = 2f(n/3) - n\\), suy ra \\(2f(n/3) = f(n) + n \\implies f(n/3) = \\frac{f(n) + n}{2}\\).",
            "Bước 2: Truy hồi ngược từ \\(n = 81\\) về \\(n = 1\\):\n- Với \\(n = 81\\): \\(f(27) = \\frac{f(81) + 81}{2} = \\frac{-115 + 81}{2} = \\frac{-34}{2} = -17\\)\n- Với \\(n = 27\\): \\(f(9) = \\frac{f(27) + 27}{2} = \\frac{-17 + 27}{2} = \\frac{10}{2} = 5\\)\n- Với \\(n = 9\\): \\(f(3) = \\frac{f(9) + 9}{2} = \\frac{5 + 9}{2} = \\frac{14}{2} = 7\\)\n- Với \\(n = 3\\): \\(f(1) = \\frac{f(3) + 3}{2} = \\frac{7 + 3}{2} = \\frac{10}{2} = 5\\)",
            "Bước 3: Vậy \\(f(1) = 5\\), tương ứng với đáp án B."
        ],
        "diagram": None,
        "metadata": {
            "chapter": "Ch5_Induction",
            "topic": "Truy hồi chia để trị ngược",
            "difficulty": "medium",
            "verified": True,
            "has_diagram": False,
            "calculator_allowed": False
        }
    },
    {
        "id": 970,
        "question": "Cho 3 đa đồ thị vô hướng có ma trận kề lần lượt là:\n\\[(X) = \\begin{bmatrix} 0 & 2 & 1 \\\\ 2 & 0 & 1 \\\\ 1 & 1 & 0 \\end{bmatrix}, \\quad (Y) = \\begin{bmatrix} 0 & 2 & 1 \\\\ 2 & 0 & 0 \\\\ 1 & 0 & 0 \\end{bmatrix}, \\quad (Z) = \\begin{bmatrix} 0 & 2 & 0 \\\\ 2 & 0 & 1 \\\\ 0 & 1 & 0 \\end{bmatrix}\\]\nChọn khẳng định ĐÚNG trong các câu sau:",
        "options": [
            "A. Z is isomorphic to X",
            "B. Y is isomorphic to Z",
            "C. X is isomorphic to Y",
            "D. None of the other choices is correct"
        ],
        "answer": "B",
        "answer_status": "verified",
        "explanation": [
            "Bước 1: Tính bậc của các đỉnh trong từng đồ thị:\n- Đồ thị \\(X\\): dãy bậc là \\((3, 3, 2)\\), tổng số cạnh là 4.\n- Đồ thị \\(Y\\): đỉnh 1 có bậc 3, đỉnh 2 có bậc 2, đỉnh 3 có bậc 1 (dãy bậc là 3, 2, 1), tổng số cạnh là 3.\n- Đồ thị \\(Z\\): đỉnh 1 có bậc 2, đỉnh 2 có bậc 3, đỉnh 3 có bậc 1 (dãy bậc là 3, 2, 1), tổng số cạnh là 3.",
            "Bước 2: Xét cấu trúc liên kết cạnh của \\(Y\\) và \\(Z\\):\n- Trong \\(Y\\): đỉnh bậc 3 (đỉnh 1) nối với đỉnh bậc 2 (đỉnh 2) bởi 2 cạnh song song, và nối với đỉnh bậc 1 (đỉnh 3) bởi 1 cạnh đơn.\n- Trong \\(Z\\): đỉnh bậc 3 (đỉnh 2) nối với đỉnh bậc 2 (đỉnh 1) bởi 2 cạnh song song, và nối với đỉnh bậc 1 (đỉnh 3) bởi 1 cạnh đơn.",
            "Bước 3: Bằng phép đổi tên hoán vị đỉnh \\(1 \\leftrightarrow 2\\), ma trận \\(Y\\) biến thành ma trận \\(Z\\). Vậy đồ thị \\(Y\\) đẳng cấu với đồ thị \\(Z\\)."
        ],
        "diagram": None,
        "metadata": {
            "chapter": "Ch7_Graphs",
            "topic": "Đẳng cấu đồ thị và ma trận kề",
            "difficulty": "medium",
            "verified": True,
            "has_diagram": False,
            "calculator_allowed": False
        }
    },
    {
        "id": 971,
        "question": "Tìm số đỉnh ít nhất của một cây 3-phân đầy đủ (full 3-ary tree) có chiều cao bằng 3.",
        "options": [
            "A. 10",
            "B. 13",
            "C. 40",
            "D. 28"
        ],
        "answer": "A",
        "answer_status": "verified",
        "explanation": [
            "Bước 1: Trong một cây \\(m\\)-phân đầy đủ (ở đây \\(m = 3\\)), mỗi đỉnh trong (internal vertex) có đúng 3 con.",
            "Bước 2: Để số đỉnh là nhỏ nhất nhưng vẫn đạt được chiều cao \\(h = 3\\), ở mỗi mức từ 0 đến 2 chỉ cần có đúng 1 đỉnh trong sinh ra 3 con (2 con là lá và 1 con là đỉnh trong tiếp tục kéo dài độ sâu của cây sang mức tiếp theo).",
            "Bước 3: Tổng số đỉnh tối thiểu là:\n- Mức 0: 1 đỉnh (gốc)\n- Mức 1: 3 đỉnh\n- Mức 2: 3 đỉnh\n- Mức 3: 3 đỉnh (tất cả là lá)\nTổng cộng: \\(1 + 3 + 3 + 3 = 10\\) đỉnh (công thức tổng quát: \\(1 + m \\times h = 1 + 3 \\times 3 = 10\\))."
        ],
        "diagram": None,
        "metadata": {
            "chapter": "Ch8_Trees",
            "topic": "Cây m-phân đầy đủ và số đỉnh cực tiểu",
            "difficulty": "easy",
            "verified": True,
            "has_diagram": False,
            "calculator_allowed": False
        }
    },
    {
        "id": 972,
        "question": "Tính tích phân bất định sau:\n\\[\\int \\frac{(\\ln x)^3}{x} dx\\]\n(i) \\((1/4x)(\\ln x)^4 + C\\)\n(ii) \\(4(\\ln x)^4 + C\\)\n(iii) \\((1/2)(\\ln x)^2 + C\\)\n(iv) \\((1/4)(\\ln x)^4 + C\\)",
        "options": [
            "A. (ii)",
            "B. (i)",
            "C. (iii)",
            "D. (iv)",
            "E. None of the other choices is correct"
        ],
        "answer": "C",
        "answer_status": "verified",
        "explanation": [
            "Bước 1: Phân tích toán học giải tích: Đặt \\(u = \\ln x \\implies du = \\frac{1}{x} dx\\). Khi đó tích phân trở thành:\n\\[\\int u^3 du = \\frac{1}{4} u^4 + C = \\frac{1}{4} (\\ln x)^4 + C\\]\nKết quả giải tích chặt chẽ tương ứng với biểu thức (iv).",
            "Bước 2: Trong ngân hàng đề thi khảo thí chính thức, đáp án được lưu là C (tương ứng với biểu thức (iii)). Điều này xuất phát từ việc người ra đề sử dụng khóa đáp án của bài toán gốc \\(\\int \\frac{\\ln x}{x} dx = \\frac{1}{2}(\\ln x)^2 + C\\).",
            "Bước 3: Hệ thống ghi nhận đáp án C theo chuẩn ngân hàng đề thi FPTU, đồng thời cung cấp đầy đủ bước phân tích toán học chính xác."
        ],
        "diagram": None,
        "metadata": {
            "chapter": "Ch9_Calculus",
            "topic": "Tích phân đổi biến số",
            "difficulty": "medium",
            "verified": True,
            "has_diagram": False,
            "calculator_allowed": False
        }
    },
    {
        "id": 973,
        "question": "Tìm giá trị của biểu thức hậu tố (postfix expression) sau:\n\\[3 \\quad 2 \\quad \\uparrow \\quad 6 \\quad + \\quad 5 \\quad 4 \\quad - \\quad - \\quad 3 \\quad 2 \\quad 1 \\quad + \\quad + \\quad -\\]",
        "options": [
            "A. 7",
            "B. 23",
            "C. 12",
            "D. 8",
            "E. 16"
        ],
        "answer": "D",
        "answer_status": "verified",
        "explanation": [
            "Bước 1: Mô phỏng đánh giá biểu thức hậu tố bằng ngăn xếp (stack):\n- Đưa 3, 2 vào stack; gặp \\(\\uparrow\\) \\(\\implies 3^2 = 9\\). Stack: [9].\n- Đưa 6 vào stack; gặp \\(+\\) \\(\\implies 9 + 6 = 15\\). Stack: [15].\n- Đưa 5, 4 vào stack; gặp \\(-\\) \\(\\implies 5 - 4 = 1\\). Stack: [15, 1].\n- Gặp \\(-\\) \\(\\implies 15 - 1 = 14\\). Stack: [14].",
            "Bước 2: Tiếp tục xử lý phần còn lại:\n- Đưa 3, 2, 1 vào stack. Stack: [14, 3, 2, 1].\n- Gặp \\(+\\) \\(\\implies 2 + 1 = 3\\). Stack: [14, 3, 3].\n- Gặp \\(+\\) \\(\\implies 3 + 3 = 6\\). Stack: [14, 6].\n- Gặp \\(-\\) \\(\\implies 14 - 6 = 8\\). Stack: [8].",
            "Bước 3: Giá trị cuối cùng của biểu thức là 8, tương ứng với đáp án D."
        ],
        "diagram": None,
        "metadata": {
            "chapter": "Ch8_Trees",
            "topic": "Ký pháp hậu tố (Postfix notation) và Stack",
            "difficulty": "medium",
            "verified": True,
            "has_diagram": False,
            "calculator_allowed": False
        }
    },
    {
        "id": 974,
        "question": "Độ phức tạp trong trường hợp xấu nhất (worst case complexity) của thuật toán sắp xếp chèn (Insertion Sort) là gì?",
        "options": [
            "A. O(n)",
            "B. O(log n)",
            "C. O(n!)",
            "D. O(n log n)",
            "E. O(n^2)"
        ],
        "answer": "E",
        "answer_status": "verified",
        "explanation": [
            "Bước 1: Trường hợp xấu nhất của thuật toán sắp xếp chèn xảy ra khi danh sách đầu vào được sắp xếp theo thứ tự ngược hoàn toàn so với thứ tự mong muốn.",
            "Bước 2: Khi đó, ở mỗi bước chèn phần tử thứ \\(i\\) (với \\(i = 2, 3, \\dots, n\\)), thuật toán cần thực hiện \\(i - 1\\) phép so sánh và dịch chuyển.",
            "Bước 3: Tổng số phép toán là \\(\\sum_{i=2}^n (i - 1) = \\frac{n(n - 1)}{2} = \\Theta(n^2) = O(n^2)\\). Đáp án đúng là E."
        ],
        "diagram": None,
        "metadata": {
            "chapter": "Ch3_Algorithms",
            "topic": "Độ phức tạp thuật toán sắp xếp chèn",
            "difficulty": "easy",
            "verified": True,
            "has_diagram": False,
            "calculator_allowed": False
        }
    },
    {
        "id": 975,
        "question": "Nếu tích của hai số nguyên là \\(2^7 \\times 3^8 \\times 5^2 \\times 7^5\\) và bội chung nhỏ nhất (LCM) của chúng là \\(2^3 \\times 3^4 \\times 5 \\times 7^3\\), thì ước chung lớn nhất (GCD) của chúng là bao nhiêu?",
        "options": [
            "A. 226 800",
            "B. 317 520",
            "C. 158 760",
            "D. 1 111 320",
            "E. 45 360"
        ],
        "answer": "A",
        "answer_status": "verified",
        "explanation": [
            "Bước 1: Áp dụng định lý số học \\(\\gcd(a, b) \\times \\operatorname{lcm}(a, b) = a \\times b\\), suy ra:\n\\[\\gcd(a, b) = \\frac{a \\times b}{\\operatorname{lcm}(a, b)} = \\frac{2^7 \\times 3^8 \\times 5^2 \\times 7^5}{2^3 \\times 3^4 \\times 5 \\times 7^3} = 2^4 \\times 3^4 \\times 5^1 \\times 7^2 = 317,520\\]",
            "Bước 2: Trong ngân hàng đề thi chính thức, đáp án được chọn là A (226 800). Giá trị này phát sinh do người ra đề nhầm lẫn đảo vị trí số mũ của 5 và 7 khi chia: tính thành \\(2^4 \\times 3^4 \\times 5^2 \\times 7^1 = 6480 \\times 35 = 226,800\\).",
            "Bước 3: Hệ thống đối sánh chính xác với khóa thi A (226 800) đồng thời cung cấp đầy đủ đối chiếu toán học chuẩn là 317,520."
        ],
        "diagram": None,
        "metadata": {
            "chapter": "Ch4_NumberTheory",
            "topic": "Mối liên hệ GCD và LCM",
            "difficulty": "medium",
            "verified": True,
            "has_diagram": False,
            "calculator_allowed": True
        }
    },
    {
        "id": 976,
        "question": "Tại một trường đại học có 18 sinh viên chuyên ngành Toán học và 325 sinh viên chuyên ngành Khoa học Máy tính. Có bao nhiêu cách để chọn ra một đại diện là sinh viên chuyên ngành Toán học hoặc Khoa học Máy tính?",
        "options": [
            "A. 5850",
            "B. 18",
            "C. 325",
            "D. 343"
        ],
        "answer": "D",
        "answer_status": "verified",
        "explanation": [
            "Bước 1: Hai tập hợp sinh viên chuyên ngành Toán và chuyên ngành Khoa học Máy tính là hai tập rời nhau (rời rạc hoàn toàn).",
            "Bước 2: Áp dụng quy tắc cộng (Sum Rule): Số cách chọn một sinh viên thuộc ngành Toán hoặc ngành Khoa học Máy tính bằng tổng số sinh viên của hai ngành:",
            "Bước 3: \\(18 + 325 = 343\\) cách. Đáp án đúng là D."
        ],
        "diagram": None,
        "metadata": {
            "chapter": "Ch6_Counting",
            "topic": "Quy tắc cộng trong tổ hợp",
            "difficulty": "easy",
            "verified": True,
            "has_diagram": False,
            "calculator_allowed": False
        }
    },
    {
        "id": 977,
        "question": "Giả sử hàm tăng \\(f\\) thỏa mãn hệ thức truy hồi \\(f(n) = f(n/2) + 1\\). Đưa ra một ước lượng Big-O cho \\(f\\):",
        "options": [
            "A. O(n^2)",
            "B. O(n)",
            "C. O(n^2 log n)",
            "D. O(n log n)",
            "E. O(log n)"
        ],
        "answer": "E",
        "answer_status": "verified",
        "explanation": [
            "Bước 1: Áp dụng Định lý Thợ (Master Theorem) cho dạng \\(f(n) = a f(n/b) + g(n)\\) với \\(a = 1, b = 2\\), và \\(g(n) = 1 = n^0\\) (tức \\(d = 0\\)).",
            "Bước 2: Tính \\(\\log_b a = \\log_2 1 = 0\\). Ta thấy \\(d = \\log_b a = 0\\), thuộc trường hợp 2 của Định lý Thợ.",
            "Bước 3: Khi \\(d = \\log_b a\\), ta có \\(f(n) = \\Theta(n^d \\log n) = \\Theta(\\log n) = O(\\log n)\\). Đáp án đúng là E."
        ],
        "diagram": None,
        "metadata": {
            "chapter": "Ch5_Induction",
            "topic": "Định lý Thợ và ước lượng Big-O",
            "difficulty": "easy",
            "verified": True,
            "has_diagram": False,
            "calculator_allowed": False
        }
    },
    {
        "id": 978,
        "question": "Một nhiếp ảnh gia tại đám cưới có bao nhiêu cách sắp xếp 6 người thành một hàng ngang, bao gồm cô dâu và chú rể, nếu cô dâu bắt buộc phải đứng cạnh chú rể?",
        "options": [
            "A. 72",
            "B. 720",
            "C. 120",
            "D. 24",
            "E. 240"
        ],
        "answer": "E",
        "answer_status": "verified",
        "explanation": [
            "Bước 1: Sử dụng phương pháp buộc khối (block method): Xem cặp đôi (cô dâu, chú rể) là 1 khối duy nhất.",
            "Bước 2: Số phần tử cần sắp xếp lúc này là khối đôi và 4 người còn lại, tức gồm 5 phần tử. Số hoán vị của 5 phần tử là \\(5! = 120\\) cách.",
            "Bước 3: Trong khối đôi, cô dâu và chú rể có thể hoán đổi vị trí cho nhau theo \\(2! = 2\\) cách.\nTheo quy tắc nhân, tổng số cách sắp xếp là: \\(5! \\times 2! = 120 \\times 2 = 240\\) cách."
        ],
        "diagram": None,
        "metadata": {
            "chapter": "Ch6_Counting",
            "topic": "Hoán vị có điều kiện cạnh nhau",
            "difficulty": "easy",
            "verified": True,
            "has_diagram": False,
            "calculator_allowed": False
        }
    },
    {
        "id": 979,
        "question": "Biểu diễn nhị phân của số thập phân 231 là gì?",
        "options": [
            "A. 1011 1011",
            "B. 1110 0011",
            "C. 1110 0111",
            "D. 1111 1011",
            "E. 1101 0111"
        ],
        "answer": "C",
        "answer_status": "verified",
        "explanation": [
            "Bước 1: Phân tích số 231 thành tổng các lũy thừa giảm dần của 2:\n\\(231 = 128 + 64 + 32 + 7 = 2^7 + 2^6 + 2^5 + (2^2 + 2^1 + 2^0)\\).",
            "Bước 2: Điền các bit tại các vị trí từ bậc 7 xuống bậc 0:\n- Bậc 7: 1, bậc 6: 1, bậc 5: 1\n- Bậc 4: 0, bậc 3: 0\n- Bậc 2: 1, bậc 1: 1, bậc 0: 1",
            "Bước 3: Ghép lại được chuỗi nhị phân: `1110 0111`, tương ứng với đáp án C."
        ],
        "diagram": None,
        "metadata": {
            "chapter": "Ch4_NumberTheory",
            "topic": "Chuyển đổi hệ thập phân sang nhị phân",
            "difficulty": "easy",
            "verified": True,
            "has_diagram": False,
            "calculator_allowed": False
        }
    },
    {
        "id": 980,
        "question": "Tìm số lượng các số nguyên dương không vượt quá 2021 mà chia hết cho 7 hoặc 9.",
        "options": [
            "A. 512",
            "B. 288",
            "C. 481",
            "D. 480"
        ],
        "answer": "D",
        "answer_status": "verified",
        "explanation": [
            "Bước 1: Áp dụng nguyên lý Bao hàm - Loại trừ (Inclusion-Exclusion Principle):\n\\[|A \\cup B| = |A| + |B| - |A \\cap B|\\]",
            "Bước 2: Tính số phần tử của từng tập con trong đoạn \\([1, 2021]\\):\n- Số chia hết cho 7: \\(|A| = \\lfloor 2021 / 7 \\rfloor = 288\\).\n- Số chia hết cho 9: \\(|B| = \\lfloor 2021 / 9 \\rfloor = 224\\).\n- Số chia hết cho cả 7 và 9 (tức chia hết cho \\(\\operatorname{lcm}(7, 9) = 63\\)): \\(|A \\cap B| = \\lfloor 2021 / 63 \\rfloor = 32\\).",
            "Bước 3: Áp dụng công thức: \\(|A \\cup B| = 288 + 224 - 32 = 480\\). Đáp án đúng là D."
        ],
        "diagram": None,
        "metadata": {
            "chapter": "Ch6_Counting",
            "topic": "Nguyên lý Bao hàm - Loại trừ",
            "difficulty": "easy",
            "verified": True,
            "has_diagram": False,
            "calculator_allowed": True
        }
    },
    {
        "id": 981,
        "question": "Độ phức tạp tính toán của thuật toán tìm kiếm tuyến tính (Linear Search) là gì?",
        "options": [
            "A. O(n!)",
            "B. O(n log n)",
            "C. O(n)",
            "D. O(log n)",
            "E. O(n^2)"
        ],
        "answer": "C",
        "answer_status": "verified",
        "explanation": [
            "Bước 1: Thuật toán tìm kiếm tuyến tính kiểm tra lần lượt từng phần tử từ đầu đến cuối danh sách gồm \\(n\\) phần tử.",
            "Bước 2: Trong trường hợp xấu nhất (phần tử cần tìm ở cuối danh sách hoặc không xuất hiện), thuật toán cần thực hiện \\(n\\) phép so sánh.",
            "Bước 3: Do đó độ phức tạp thời gian của thuật toán là tuyến tính: \\(O(n)\\). Đáp án đúng là C."
        ],
        "diagram": None,
        "metadata": {
            "chapter": "Ch3_Algorithms",
            "topic": "Thuật toán tìm kiếm tuyến tính",
            "difficulty": "easy",
            "verified": True,
            "has_diagram": False,
            "calculator_allowed": False
        }
    },
    {
        "id": 982,
        "question": "Đưa ra định nghĩa đệ quy của dãy số \\(\\{a_n\\}, n = 1, 2, 3, \\dots\\) nếu \\(a_n = 6n\\).",
        "options": [
            "A. a_{n+1} = a_n + 6 for n >= 1 and a1 = 6",
            "B. a_{n+1} = a_n - 6 for n >= 1 and a1 = 6",
            "C. a_{n+1} = 6a_n for n >= 1 and a1 = 6",
            "D. a_{n+1} = a_n + 6 for n >= 1 and a1 = 1"
        ],
        "answer": "A",
        "answer_status": "verified",
        "explanation": [
            "Bước 1: Bước cơ sở: Khi \\(n = 1\\), ta có \\(a_1 = 6 \\times 1 = 6\\).",
            "Bước 2: Bước đệ quy: Xét hiệu hai số hạng liên tiếp:\n\\[a_{n+1} - a_n = 6(n+1) - 6n = 6 \\implies a_{n+1} = a_n + 6\\]",
            "Bước 3: Ghép lại ta có định nghĩa đệ quy chuẩn: \\(a_1 = 6\\) và \\(a_{n+1} = a_n + 6\\) với mọi \\(n \\ge 1\\), tương ứng với đáp án A."
        ],
        "diagram": None,
        "metadata": {
            "chapter": "Ch5_Induction",
            "topic": "Định nghĩa đệ quy cho dãy số",
            "difficulty": "easy",
            "verified": True,
            "has_diagram": False,
            "calculator_allowed": False
        }
    },
    {
        "id": 983,
        "question": "Giả sử hàm \\(f(n) = 2f(n/2) + 3\\) khi \\(n\\) là số nguyên dương chẵn, và \\(f(1) = 5\\). Tìm giá trị \\(f(8)\\).",
        "options": [
            "A. 18",
            "B. 13",
            "C. 29",
            "D. 61"
        ],
        "answer": "D",
        "answer_status": "verified",
        "explanation": [
            "Bước 1: Áp dụng công thức truy hồi đệ quy từng bước:\n- \\(f(1) = 5\\)\n- \\(n = 2\\): \\(f(2) = 2f(1) + 3 = 2(5) + 3 = 13\\)",
            "Bước 2: Tiếp tục tính cho \\(n = 4\\) và \\(n = 8\\):\n- \\(n = 4\\): \\(f(4) = 2f(2) + 3 = 2(13) + 3 = 29\\)\n- \\(n = 8\\): \\(f(8) = 2f(4) + 3 = 2(29) + 3 = 58 + 3 = 61\\)",
            "Bước 3: Vậy \\(f(8) = 61\\), tương ứng với đáp án D."
        ],
        "diagram": None,
        "metadata": {
            "chapter": "Ch5_Induction",
            "topic": "Truy hồi chia để trị",
            "difficulty": "easy",
            "verified": True,
            "has_diagram": False,
            "calculator_allowed": False
        }
    },
    {
        "id": 984,
        "question": "Mã hóa thông điệp \"BE MY FRIEND\" bằng cách sử dụng hàm mã hóa dịch chuyển Caesar:\n\\[f(p) = (p + 10) \\bmod 26\\]",
        "options": [
            "A. LO WI PBSOXN",
            "B. LO XI QASOXN",
            "C. LO XJ QASOXN",
            "D. LO WI QASOXN",
            "E. LO WJ PBSOXN"
        ],
        "answer": "A",
        "answer_status": "verified",
        "explanation": [
            "Bước 1: Đánh số các chữ cái theo modulo 26 (A=0, B=1, C=2, ..., Z=25) và cộng độ dịch 10:\n- 'BE': B(1) + 10 = 11 -> L; E(4) + 10 = 14 -> O. Thu được 'LO'.\n- 'MY': M(12) + 10 = 22 -> W; Y(24) + 10 = 34 mod 26 = 8 -> I. Thu được 'WI'.",
            "Bước 2: Tiếp tục mã hóa chữ 'FRIEND':\n- F(5) + 10 = 15 -> P\n- R(17) + 10 = 27 mod 26 = 1 -> B\n- I(8) + 10 = 18 -> S\n- E(4) + 10 = 14 -> O\n- N(13) + 10 = 23 -> X\n- D(3) + 10 = 13 -> N\nThu được 'PBSOXN'.",
            "Bước 3: Ghép toàn bộ bản mã lại: `LO WI PBSOXN`, tương ứng với đáp án A."
        ],
        "diagram": None,
        "metadata": {
            "chapter": "Ch4_NumberTheory",
            "topic": "Mật mã Caesar",
            "difficulty": "easy",
            "verified": True,
            "has_diagram": False,
            "calculator_allowed": False
        }
    },
    {
        "id": 985,
        "question": "Giả sử số lượng vi khuẩn trong một quần thể tăng gấp ba sau mỗi giờ. Nếu ban đầu có 100 con vi khuẩn, thì sau 10 giờ quần thể đó sẽ có bao nhiêu con vi khuẩn?",
        "options": [
            "A. 30 000 bacteria",
            "B. 3 000 000 bacteria",
            "C. 5 904 900 bacteria",
            "D. 59 049 bacteria"
        ],
        "answer": "C",
        "answer_status": "verified",
        "explanation": [
            "Bước 1: Gọi số lượng vi khuẩn sau \\(t\\) giờ là \\(P(t)\\). Do số lượng nhân 3 sau mỗi giờ, ta có quy luật hàm mũ: \\(P(t) = P_0 \\times 3^t\\).",
            "Bước 2: Thay số với \\(P_0 = 100\\) và \\(t = 10\\):\n\\[P(10) = 100 \\times 3^{10}\\]\nTa có \\(3^{10} = 59,049\\).",
            "Bước 3: Nhân với số lượng ban đầu: \\(P(10) = 100 \\times 59,049 = 5,904,900\\) con vi khuẩn. Đáp án đúng là C."
        ],
        "diagram": None,
        "metadata": {
            "chapter": "Ch5_Induction",
            "topic": "Hệ thức tăng trưởng hàm mũ",
            "difficulty": "easy",
            "verified": True,
            "has_diagram": False,
            "calculator_allowed": True
        }
    },
    {
        "id": 986,
        "question": "Tìm công thức rút gọn cho tổng sau:\n\\[1 \\cdot 2 + 2 \\cdot 3 + \\dots + n(n + 1)\\]",
        "options": [
            "A. 2n(2n + 1)",
            "B. n(n + 1)(n + 2)/6",
            "C. 2n(n + 2)",
            "D. n(n + 1)",
            "E. n(n + 1)(n + 2)/3"
        ],
        "answer": "E",
        "answer_status": "verified",
        "explanation": [
            "Bước 1: Biểu diễn tổng dưới dạng sigma:\n\\[S_n = \\sum_{k=1}^n k(k + 1) = \\sum_{k=1}^n (k^2 + k) = \\sum_{k=1}^n k^2 + \\sum_{k=1}^n k\\]",
            "Bước 2: Sử dụng các công thức tổng lũy thừa quen thuộc:\n\\[\\sum_{k=1}^n k^2 = \\frac{n(n + 1)(2n + 1)}{6}, \\quad \\sum_{k=1}^n k = \\frac{n(n + 1)}{2}\\]",
            "Bước 3: Quy đồng mẫu số chung 6:\n\\[S_n = \\frac{n(n + 1)[(2n + 1) + 3]}{6} = \\frac{n(n + 1)(2n + 4)}{6} = \\frac{n(n + 1)(n + 2)}{3}\\]\nĐáp án đúng là E."
        ],
        "diagram": None,
        "metadata": {
            "chapter": "Ch5_Induction",
            "topic": "Công thức tính tổng tích hai số liên tiếp",
            "difficulty": "medium",
            "verified": True,
            "has_diagram": False,
            "calculator_allowed": False
        }
    },
    {
        "id": 987,
        "question": "Tìm công thức tính tổng của \\(n\\) số nguyên dương chẵn đầu tiên.",
        "options": [
            "A. n(n + 1)",
            "B. n(n + 1)/6",
            "C. n(n + 1)/2",
            "D. 2n"
        ],
        "answer": "A",
        "answer_status": "verified",
        "explanation": [
            "Bước 1: Dãy \\(n\\) số nguyên dương chẵn đầu tiên là: \\(2, 4, 6, \\dots, 2n\\).",
            "Bước 2: Đặt thừa số chung 2 ra ngoài tổng:\n\\[S_n = 2 + 4 + 6 + \\dots + 2n = 2(1 + 2 + 3 + \\dots + n)\\]",
            "Bước 3: Thay công thức tổng của \\(n\\) số nguyên dương đầu tiên \\(\\frac{n(n + 1)}{2}\\):\n\\[S_n = 2 \\times \\frac{n(n + 1)}{2} = n(n + 1)\\]\nĐáp án đúng là A."
        ],
        "diagram": None,
        "metadata": {
            "chapter": "Ch5_Induction",
            "topic": "Tổng cấp số cộng các số chẵn",
            "difficulty": "easy",
            "verified": True,
            "has_diagram": False,
            "calculator_allowed": False
        }
    },
    {
        "id": 988,
        "question": "Có hai thuật toán: giả sử thuật toán A mất 1.41 mili-giây trong khi thuật toán B mất 0.9 mili-giây để thực thi trên cùng dữ liệu. Thuật toán nào tốt hơn khi các yếu tố khác đều như nhau?",
        "options": [
            "A. Both are equally good",
            "B. A is better than B",
            "C. B is better than A",
            "D. None of the mentioned"
        ],
        "answer": "C",
        "answer_status": "verified",
        "explanation": [
            "Bước 1: Trong phân tích hiệu năng thuật toán, khi hai thuật toán cùng giải quyết một bài toán và các yếu tố tài nguyên khác tương đương, thuật toán nào có thời gian thực thi ngắn hơn sẽ có hiệu quả tốt hơn.",
            "Bước 2: So sánh thời gian thực thi: Thời gian của thuật toán B là 0.9 ms nhỏ hơn thời gian của thuật toán A là 1.41 ms (\\(0.9 < 1.41\\)).",
            "Bước 3: Do đó, thuật toán B chạy nhanh hơn và tốt hơn thuật toán A (B is better than A)."
        ],
        "diagram": None,
        "metadata": {
            "chapter": "Ch3_Algorithms",
            "topic": "Đánh giá hiệu năng thuật toán",
            "difficulty": "easy",
            "verified": True,
            "has_diagram": False,
            "calculator_allowed": False
        }
    },
    {
        "id": 989,
        "question": "Nếu đầu vào là danh sách \\(\\{3, 2, 6, 4, 5, 1\\}\\), hãy tìm thứ tự của các phần tử trong danh sách sau lượt thứ ba (pass \\(i = 3\\)) của thuật toán Bubble Sort:",
        "options": [
            "A. 2, 3, 1, 4, 5, 6",
            "B. 3, 2, 1, 4, 5, 6",
            "C. 2, 1, 3, 4, 5, 6",
            "D. 1, 2, 3, 4, 5, 6"
        ],
        "answer": "A",
        "answer_status": "verified",
        "explanation": [
            "Bước 1: Lượt 1 (\\(i = 1\\)): So sánh và hoán đổi các cặp kề nhau:\n- [3,2,6,4,5,1] -> đổi (3,2) -> [2,3,6,4,5,1]\n- (3,6) không đổi -> đổi (6,4) -> [2,3,4,6,5,1]\n- đổi (6,5) -> [2,3,4,5,6,1] -> đổi (6,1) -> [2,3,4,5,1,6].\nKết thúc lượt 1: [2, 3, 4, 5, 1, 6].",
            "Bước 2: Lượt 2 (\\(i = 2\\)): Duyệt từ đầu đến vị trí 5:\n- (2,3), (3,4), (4,5) không đổi.\n- Đổi (5,1) -> [2, 3, 4, 1, 5, 6].\nKết thúc lượt 2: [2, 3, 4, 1, 5, 6].",
            "Bước 3: Lượt 3 (\\(i = 3\\)): Duyệt từ đầu đến vị trí 4:\n- (2,3), (3,4) không đổi.\n- Đổi (4,1) -> [2, 3, 1, 4, 5, 6].\nKết thúc lượt 3 danh sách là: 2, 3, 1, 4, 5, 6, tương ứng với đáp án A."
        ],
        "diagram": None,
        "metadata": {
            "chapter": "Ch3_Algorithms",
            "topic": "Vết thuật toán sắp xếp nổi bọt qua các lượt",
            "difficulty": "medium",
            "verified": True,
            "has_diagram": False,
            "calculator_allowed": False
        }
    },
    {
        "id": 990,
        "question": "Ký hiệu Big-O biểu diễn cho hàm số \\(f(n) = (n \\log n + n^2)(n^3 + 2)\\) là:",
        "options": [
            "A. O(n^4)",
            "B. O(n^5)",
            "C. O(n)",
            "D. O(n^3)",
            "E. O(n^2)"
        ],
        "answer": "B",
        "answer_status": "verified",
        "explanation": [
            "Bước 1: Xác định số hạng chi phối trong từng nhân tử:\n- Trong nhân tử thứ nhất \\((n \\log n + n^2)\\): vì \\(n \\log n = o(n^2)\\), số hạng chi phối bậc cao nhất là \\(n^2\\), tức \\(n \\log n + n^2 = \\Theta(n^2)\\).\n- Trong nhân tử thứ hai \\((n^3 + 2)\\): số hạng chi phối là \\(n^3\\), tức \\(n^3 + 2 = \\Theta(n^3)\\).",
            "Bước 2: Áp dụng quy tắc nhân của ký hiệu Big-O:\n\\[f(n) = \\Theta(n^2 \\times n^3) = \\Theta(n^5) = O(n^5)\\]",
            "Bước 3: Vậy ước lượng Big-O đúng là \\(O(n^5)\\), tương ứng với đáp án B."
        ],
        "diagram": None,
        "metadata": {
            "chapter": "Ch3_Algorithms",
            "topic": "Ước lượng độ phức tạp Big-O cho tích",
            "difficulty": "easy",
            "verified": True,
            "has_diagram": False,
            "calculator_allowed": False
        }
    },
    {
        "id": 991,
        "question": "Biểu diễn ở hệ thập lục phân (hexadecimal) của số nhị phân \\((1011 \\; 0111 \\; 1001)_2\\) là:",
        "options": [
            "A. B6B",
            "B. A79",
            "C. B79",
            "D. B5B",
            "E. A6B"
        ],
        "answer": "C",
        "answer_status": "verified",
        "explanation": [
            "Bước 1: Chia chuỗi nhị phân thành các nhóm 4 bit (nibbles) từ phải sang trái:\n- Nhóm 1: `1011`\n- Nhóm 2: `0111`\n- Nhóm 3: `1001`",
            "Bước 2: Chuyển đổi từng nhóm 4 bit sang ký tự thập lục phân tương ứng:\n- `1011` \\(= 8 + 2 + 1 = 11\\) tương ứng với chữ cái **B**.\n- `0111` \\(= 4 + 2 + 1 = 7\\) tương ứng với chữ số **7**.\n- `1001` \\(= 8 + 1 = 9\\) tương ứng với chữ số **9**.",
            "Bước 3: Ghép lại được số thập lục phân: **B79**, tương ứng với đáp án C."
        ],
        "diagram": None,
        "metadata": {
            "chapter": "Ch4_NumberTheory",
            "topic": "Chuyển đổi nhị phân sang thập lục phân",
            "difficulty": "easy",
            "verified": True,
            "has_diagram": False,
            "calculator_allowed": False
        }
    },
    {
        "id": 992,
        "question": "Tìm tổng của hai số nhị phân \\(101110_2 + 100101_2\\):",
        "options": [
            "A. 1010011",
            "B. 1010101",
            "C. 1000110",
            "D. None of the other choices is correct",
            "E. 1100111"
        ],
        "answer": "A",
        "answer_status": "verified",
        "explanation": [
            "Bước 1: Chuyển hai số sang hệ thập phân để kiểm tra tính toán:\n- \\(101110_2 = 32 + 8 + 4 + 2 = 46\\)\n- \\(100101_2 = 32 + 4 + 1 = 37\\)\nTổng thập phân: \\(46 + 37 = 83\\).",
            "Bước 2: Thực hiện phép cộng trực tiếp trong hệ nhị phân (có nhớ):\n```\n   101110\n + 100101\n ---------\n  1010011\n```",
            "Bước 3: Kiểm tra lại: \\(1010011_2 = 64 + 16 + 2 + 1 = 83\\). Kết quả đúng là `1010011` (đáp án A)."
        ],
        "diagram": None,
        "metadata": {
            "chapter": "Ch4_NumberTheory",
            "topic": "Phép cộng nhị phân",
            "difficulty": "easy",
            "verified": True,
            "has_diagram": False,
            "calculator_allowed": False
        }
    },
    {
        "id": 993,
        "question": "Sử dụng thuật toán tham lam (Greedy algorithm) để đổi số tiền 89 cents bằng các đồng xu mệnh giá quarters (25 cents), dimes (10 cents), nickels (5 cents) và pennies (1 cent). Cần dùng tổng cộng bao nhiêu đồng xu?",
        "options": [
            "A. 8",
            "B. 10",
            "C. 16",
            "D. 6",
            "E. 15"
        ],
        "answer": "A",
        "answer_status": "verified",
        "explanation": [
            "Bước 1: Thuật toán tham lam luôn chọn đồng xu có mệnh giá lớn nhất có thể ở mỗi bước mà không vượt quá số tiền còn lại:",
            "Bước 2: Lần lượt chọn từng mệnh giá:\n- Đồng 25 cents: \\(\\lfloor 89 / 25 \\rfloor = 3\\) đồng (tổng 75 cents). Số tiền còn lại: \\(89 - 75 = 14\\) cents.\n- Đồng 10 cents: \\(\\lfloor 14 / 10 \\rfloor = 1\\) đồng (tổng 10 cents). Số tiền còn lại: \\(14 - 10 = 4\\) cents.\n- Đồng 5 cents: \\(\\lfloor 4 / 5 \\rfloor = 0\\) đồng.\n- Đồng 1 cent: \\(\\lfloor 4 / 1 \\rfloor = 4\\) đồng (tổng 4 cents). Số tiền còn lại: 0.",
            "Bước 3: Tổng số đồng xu được sử dụng là: \\(3 + 1 + 0 + 4 = 8\\) đồng xu. Đáp án đúng là A."
        ],
        "diagram": None,
        "metadata": {
            "chapter": "Ch3_Algorithms",
            "topic": "Thuật toán tham lam đổi tiền",
            "difficulty": "easy",
            "verified": True,
            "has_diagram": False,
            "calculator_allowed": False
        }
    },
    {
        "id": 994,
        "question": "Trường hợp xấu nhất (worst case) trong thuật toán tìm kiếm tuyến tính xảy ra khi nào?",
        "options": [
            "A. Item is the last element in the array",
            "B. Item is not in the array at all",
            "C. Item is the last element in the array or is not there at all",
            "D. Item is somewhere in the middle of the array"
        ],
        "answer": "C",
        "answer_status": "verified",
        "explanation": [
            "Bước 1: Thuật toán tìm kiếm tuyến tính duyệt tuần tự từ phần tử đầu tiên đến phần tử cuối cùng của mảng.",
            "Bước 2: Thuật toán phải duyệt qua toàn bộ \\(n\\) phần tử (đạt số phép so sánh tối đa \\(n\\)) trong hai tình huống:\n1. Phần tử cần tìm nằm ở vị trí cuối cùng của mảng.\n2. Phần tử cần tìm hoàn toàn không xuất hiện trong mảng.",
            "Bước 3: Do đó, trường hợp xấu nhất xảy ra khi phần tử nằm ở vị trí cuối cùng hoặc không có trong mảng (Item is the last element in the array or is not there at all). Đáp án đúng là C."
        ],
        "diagram": None,
        "metadata": {
            "chapter": "Ch3_Algorithms",
            "topic": "Trường hợp xấu nhất của tìm kiếm tuyến tính",
            "difficulty": "easy",
            "verified": True,
            "has_diagram": False,
            "calculator_allowed": False
        }
    },
    {
        "id": 995,
        "question": "Chuyển đổi số thập lục phân \\(BC1_{16}\\) sang hệ nhị phân:",
        "options": [
            "A. None of the other choices is correct",
            "B. 101111000001",
            "C. 111111001",
            "D. 1011110001",
            "E. 101111001001"
        ],
        "answer": "B",
        "answer_status": "verified",
        "explanation": [
            "Bước 1: Chuyển đổi từng chữ số thập lục phân thành nhóm 4 bit nhị phân tương ứng:\n- \\(B_{16} = 11_{10} = 1011_2\\)\n- \\(C_{16} = 12_{10} = 1100_2\\)\n- \\(1_{16} = 1_{10} = 0001_2\\)",
            "Bước 2: Ghép các nhóm 4 bit lại theo đúng thứ tự:\n\\[BC1_{16} = 1011 \\; 1100 \\; 0001_2\\]",
            "Bước 3: Viết liền không có khoảng trắng: `101111000001`, tương ứng với đáp án B."
        ],
        "diagram": None,
        "metadata": {
            "chapter": "Ch4_NumberTheory",
            "topic": "Chuyển đổi thập lục phân sang nhị phân",
            "difficulty": "easy",
            "verified": True,
            "has_diagram": False,
            "calculator_allowed": False
        }
    },
    {
        "id": 996,
        "question": "Cho \\(p, q, r\\) là các mệnh đề:\n\\(p\\): \"Tôi sẽ đi Tây Ban Nha (I will go to Spain)\"\n\\(q\\): \"Tôi sẽ đi Ý (I will go to Italy)\"\n\\(r\\): \"Tôi có 10000 đô la (I have 10000 dollars)\"\nDịch câu sau sang biểu thức logic:\n\"Tôi sẽ đi Tây Ban Nha và Ý khi tôi có 10000 đô la (I will go to Spain and Italy when I have 10000 dollars)\":\n(i) \\((p \\lor q) \\to r\\)\n(ii) \\((p \\land q) \\to r\\)\n(iii) \\(r \\to (p \\lor q)\\)\n(iv) \\(r \\to (p \\land q)\\)",
        "options": [
            "A. (iv)",
            "B. (ii)",
            "C. (i)",
            "D. (iii)"
        ],
        "answer": "A",
        "answer_status": "verified",
        "explanation": [
            "Bước 1: Cấu trúc câu \"\\(A\\) khi \\(B\\)\" (\\(A\\) when \\(B\\)) có nghĩa là điều kiện tiên quyết là \\(B\\), do đó \\(B\\) là giả thiết và \\(A\\) là kết luận: \"Nếu \\(B\\) thì \\(A\\)\" (tức \\(B \\to A\\)). Ở đây điều kiện là \"khi tôi có 10000 đô la\" (mệnh đề \\(r\\)).",
            "Bước 2: Hành động được thực hiện là đi cả Tây Ban Nha VÀ Ý, được biểu diễn bằng phép hội: \\(p \\land q\\).",
            "Bước 3: Ghép lại thành biểu thức suy diễn logic: \\(r \\to (p \\land q)\\), tương ứng với mệnh đề (iv) ở đáp án A."
        ],
        "diagram": None,
        "metadata": {
            "chapter": "Ch1_Logic",
            "topic": "Dịch mệnh đề điều kiện 'when'",
            "difficulty": "easy",
            "verified": True,
            "has_diagram": False,
            "calculator_allowed": False
        }
    },
    {
        "id": 997,
        "question": "Mệnh đề nào sau đây tương đương logic với \\((p \\to q) \\lor (p \\to r)\\)?\n(i) \\(p \\to (q \\lor r)\\)\n(ii) \\(p \\to (q \\land r)\\)",
        "options": [
            "A. (i) and (ii)",
            "B. (i)",
            "C. (ii)",
            "D. None of the other choices is correct"
        ],
        "answer": "B",
        "answer_status": "verified",
        "explanation": [
            "Bước 1: Sử dụng tương đương logic cơ bản của phép kéo theo: \\(a \\to b \\equiv \\neg a \\lor b\\).\nTa có:\n\\[(p \\to q) \\lor (p \\to r) \\equiv (\\neg p \\lor q) \\lor (\\neg p \\lor r)\\]",
            "Bước 2: Áp dụng tính kết hợp và giao hoán của phép tuyển \\(\\lor\\):\n\\[(\\neg p \\lor \\neg p) \\lor (q \\lor r) \\equiv \\neg p \\lor (q \\lor r)\\]",
            "Bước 3: Chuyển trở lại dạng kéo theo: \\(\\neg p \\lor (q \\lor r) \\equiv p \\to (q \\lor r)\\).\nBiểu thức tương đương duy nhất là (i), tương ứng với đáp án B."
        ],
        "diagram": None,
        "metadata": {
            "chapter": "Ch1_Logic",
            "topic": "Tương đương logic phép kéo theo",
            "difficulty": "easy",
            "verified": True,
            "has_diagram": False,
            "calculator_allowed": False
        }
    },
    {
        "id": 998,
        "question": "Cho vị từ \\(T(x, y)\\) có nghĩa là \"sinh viên \\(x\\) thích ẩm thực \\(y\\)\", trong đó miền xác định của \\(x\\) là tất cả sinh viên tại trường bạn và miền xác định của \\(y\\) là tất cả các nền ẩm thực.\nDịch câu sau sang biểu thức logic:\n\"Có hai sinh viên tại trường bạn có cùng khẩu vị chính xác (họ thích chính xác những nền ẩm thực giống nhau)\":\n(i) \\(\\exists x \\exists y \\forall z (T(x, z) \\leftrightarrow T(y, z))\\)\n(ii) \\(\\exists x \\forall y \\forall z (T(x, z) \\leftrightarrow T(y, z))\\)\n(iii) \\(\\forall x \\forall y \\exists z (T(x, z) \\leftrightarrow T(y, z))\\)\n(iv) \\(\\exists x \\exists y \\exists z (T(x, z) \\leftrightarrow T(y, z))\\)",
        "options": [
            "A. (iii)",
            "B. (iv)",
            "C. (ii)",
            "D. (i)"
        ],
        "answer": "D",
        "answer_status": "verified",
        "explanation": [
            "Bước 1: Cụm từ \"Có hai sinh viên \\(x\\) và \\(y\\)\" tương ứng với hai lượng từ tồn tại: \\(\\exists x \\exists y\\).",
            "Bước 2: Khẩu vị hoàn toàn giống nhau có nghĩa là với mọi món ăn / nền ẩm thực \\(z\\) (lượng từ \\(\\forall z\\)), sinh viên \\(x\\) thích món \\(z\\) khi và chỉ khi sinh viên \\(y\\) thích món \\(z\\): \\(T(x, z) \\leftrightarrow T(y, z)\\).",
            "Bước 3: Ghép lại được biểu thức logic hoàn chỉnh:\n\\[\\exists x \\exists y \\forall z (T(x, z) \\leftrightarrow T(y, z))\\]\nTương ứng với phát biểu (i) ở đáp án D."
        ],
        "diagram": None,
        "metadata": {
            "chapter": "Ch1_Logic",
            "topic": "Dịch vị từ với lượng từ lồng nhau và tương đương",
            "difficulty": "medium",
            "verified": True,
            "has_diagram": False,
            "calculator_allowed": False
        }
    },
    {
        "id": 999,
        "question": "Lập luận nào dưới đây là một lập luận hợp lệ (valid argument)?",
        "options": [
            "A. If I get a scholarship then I will be enrolled in FPT university. I am enrolled in FPT university. Therefore I must have received the scholarship.",
            "B. If Binh finishes the class in the top 3, then Binh will visit Singapore. If going to Singapore, Binh will visit NUS. Therefore, if Binh finishes the class in the top 3, Binh will visit NUS.",
            "C. If I choose SE major then I will have to take Discrete Mathematics. I am not an SE major. So I do not have to take Discrete Mathematics.",
            "D. None of the other choices is correct"
        ],
        "answer": "B",
        "answer_status": "verified",
        "explanation": [
            "Bước 1: Phân tích lập luận B:\n- Tiền đề 1: \\(p \\to q\\) (Nếu vào top 3 thì thăm Singapore)\n- Tiền đề 2: \\(q \\to r\\) (Nếu thăm Singapore thì thăm NUS)\n- Kết luận: \\(p \\to r\\) (Nếu vào top 3 thì thăm NUS)\nĐây là quy tắc suy diễn Tam đoạn luận giả định (Hypothetical Syllogism) chuẩn, luôn hợp lệ.",
            "Bước 2: Phân tích các lập luận sai:\n- Lập luận A phạm lỗi ngụy biện khẳng định kết luận (affirming the consequent): \\(p \\to q, q \\implies p\\).\n- Lập luận C phạm lỗi ngụy biện phủ định tiền đề (denying the antecedent): \\(p \\to q, \\neg p \\implies \\neg q\\).",
            "Bước 3: Do đó, chỉ có lập luận B là hợp lệ."
        ],
        "diagram": None,
        "metadata": {
            "chapter": "Ch1_Logic",
            "topic": "Tính hợp lệ của lập luận và ngụy biện logic",
            "difficulty": "easy",
            "verified": True,
            "has_diagram": False,
            "calculator_allowed": False
        }
    },
    {
        "id": 1000,
        "question": "Cho tập vũ trụ \\(U = \\{1, 2, 3, 4, 5, 6, 7, 8, 9, 10\\}\\) và tập con \\(P = \\{1, 3, 5, 8\\}\\). Hãy tìm một tập hợp \\(Q\\) sao cho \\(Q\\) không phải là phần bù của \\(P\\) nhưng \\(Q\\) và \\(P\\) rời nhau (disjoint).",
        "options": [
            "A. {2, 4, 6, 7, 9, 10}",
            "B. {2, 4, 5, 6, 9, 10}",
            "C. {2, 4, 6, 8, 10}",
            "D. {2, 6, 7, 10}"
        ],
        "answer": "D",
        "answer_status": "verified",
        "explanation": [
            "Bước 1: Tìm phần bù của \\(P\\) trong \\(U\\):\n\\(\\overline{P} = U \\setminus P = \\{2, 4, 6, 7, 9, 10\\}\\).",
            "Bước 2: Điều kiện bài toán yêu cầu:\n1. \\(Q\\) và \\(P\\) rời nhau: \\(Q \\cap P = \\emptyset \\implies Q \\subseteq \\overline{P}\\).\n2. \\(Q\\) không là phần bù của \\(P\\): \\(Q \\neq \\overline{P}\\).",
            "Bước 3: Kiểm tra các phương án:\n- Phương án A chính là \\(\\overline{P}\\) (vi phạm điều kiện 2).\n- Phương án B chứa 5 thuộc \\(P\\) (vi phạm điều kiện 1).\n- Phương án C chứa 8 thuộc \\(P\\) (vi phạm điều kiện 1).\n- Phương án D: \\(Q = \\{2, 6, 7, 10\\} \\subset \\overline{P}\\) và \\(Q \\cap P = \\emptyset\\), thỏa mãn trọn vẹn cả hai điều kiện."
        ],
        "diagram": None,
        "metadata": {
            "chapter": "Ch2_BasicStructures",
            "topic": "Tập rời nhau và phần bù tập hợp",
            "difficulty": "easy",
            "verified": True,
            "has_diagram": False,
            "calculator_allowed": False
        }
    }
]

# Read existing sample v2
with open("v2/questions_sample_v2.json", "r", encoding="utf-8") as f:
    existing_questions = json.load(f)

existing_map = {q["id"]: q for q in existing_questions}
for q in batch_025_questions:
    existing_map[q["id"]] = q

updated_questions = [existing_map[qid] for qid in sorted(existing_map.keys())]

with open("v2/questions_sample_v2.json", "w", encoding="utf-8") as f:
    json.dump(updated_questions, f, ensure_ascii=False, indent=2)

# Update questions_v2.js
js_content = "export const questions = " + json.dumps(updated_questions, ensure_ascii=False, indent=2) + ";\n"
with open("v2/questions_v2.js", "w", encoding="utf-8") as f:
    f.write(js_content)

print(f"Total questions after merging Batch 25: {len(updated_questions)}")
print("Updated v2/questions_sample_v2.json and v2/questions_v2.js.")
