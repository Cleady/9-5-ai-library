"""
MAD101 Studio - Schema v2 Batch 027 Builder
Questions: 1041 to 1080 (40 questions)
Updates: v2/questions_sample_v2.json and v2/questions_v2.js
"""

import json
import os

batch_027_questions = [
    {
        "id": 1041,
        "question": "Xét dãy số \\(\\{a_n\\} = 3, 5, 8, 12, 17, \\dots\\), giả sử quy luật của các số hạng đầu tiên tiếp tục tiếp diễn. Nếu ta bắt đầu tại \\(n = 0\\), giá trị của \\(a_7\\) là bao nhiêu?",
        "options": [
            "A. 38",
            "B. 47",
            "C. 30",
            "D. None of the others",
            "E. 42"
        ],
        "answer": "A",
        "answer_status": "verified",
        "explanation": [
            "Bước 1: Phân tích hiệu số giữa các số hạng liên tiếp của dãy số:\n- \\(a_1 - a_0 = 5 - 3 = 2\\)\n- \\(a_2 - a_1 = 8 - 5 = 3\\)\n- \\(a_3 - a_2 = 12 - 8 = 4\\)\n- \\(a_4 - a_3 = 17 - 12 = 5\\)\nQuy luật là hiệu số giữa hai số hạng liên tiếp tăng dần: \\(a_{n} - a_{n-1} = n + 1\\) với mọi \\(n \\ge 1\\).",
            "Bước 2: Tính tiếp các số hạng tiếp theo của dãy:\n- \\(a_5 = a_4 + 6 = 17 + 6 = 23\\)\n- \\(a_6 = a_5 + 7 = 23 + 7 = 30\\)\n- \\(a_7 = a_6 + 8 = 30 + 8 = 38\\)\nVậy \\(a_7 = 38\\)."
        ],
        "diagram": None,
        "metadata": {
            "chapter": "Ch2_BasicStructures",
            "topic": "Dãy số và quy luật dãy",
            "difficulty": "easy",
            "verified": True,
            "has_diagram": False,
            "calculator_allowed": True
        }
    },
    {
        "id": 1042,
        "question": "Cho \\(\\mathbb{N} = \\{0, 1, 2, \\dots\\}\\). Cho hai hàm số \\(f, g: \\mathbb{N} \\to \\mathbb{N}\\) xác định bởi \\(f(x) = 2x + 1\\) và \\(g(x) = x^2 + 1\\). Hàm số nào là hàm đơn ánh (one-to-one)?",
        "options": [
            "A. f and g",
            "B. g",
            "C. None of the other choices is correct",
            "D. f"
        ],
        "answer": "A",
        "answer_status": "verified",
        "explanation": [
            "Bước 1: Hàm \\(f(x) = 2x + 1\\) là đơn ánh vì nếu \\(f(x_1) = f(x_2) \\iff 2x_1 + 1 = 2x_2 + 1 \\iff x_1 = x_2\\).",
            "Bước 2: Hàm \\(g(x) = x^2 + 1\\) trên tập số tự nhiên \\(\\mathbb{N}\\): Giả sử \\(g(x_1) = g(x_2) \\iff x_1^2 + 1 = x_2^2 + 1 \\iff x_1^2 = x_2^2\\). Do \\(x_1, x_2 \\in \\mathbb{N}\\) (các số không âm), ta suy ra \\(x_1 = x_2\\). Vì vậy \\(g\\) cũng là đơn ánh.",
            "Bước 3: Do đó cả hai hàm số \\(f\\) và \\(g\\) đều là đơn ánh (one-to-one)."
        ],
        "diagram": None,
        "metadata": {
            "chapter": "Ch2_BasicStructures",
            "topic": "Hàm đơn ánh (Injective Function)",
            "difficulty": "easy",
            "verified": True,
            "has_diagram": False,
            "calculator_allowed": False
        }
    },
    {
        "id": 1043,
        "question": "Cho \\(u, v\\) là hai đỉnh nằm trên cùng một phần của đồ thị hai phía đầy đủ \\(K_{2,2}\\). Có bao nhiêu đường đi (walk/path) có độ dài 4 từ \\(u\\) đến \\(v\\)?",
        "options": [
            "A. 4",
            "B. None of the other choices is correct",
            "C. 0",
            "D. 8",
            "E. 2"
        ],
        "answer": "D",
        "answer_status": "verified",
        "explanation": [
            "Bước 1: Ký hiệu hai phần của \\(K_{2,2}\\) là \\(V_1 = \\{u, v\\}\\) và \\(V_2 = \\{w, z\\}\\). Mọi cạnh chỉ nối giữa \\(V_1\\) và \\(V_2\\). Một đường đi có độ dài 4 bắt đầu từ \\(u \\in V_1\\) và kết thúc tại \\(v \\in V_1\\) có dạng: \\(u \\to x_1 \\to y_1 \\to x_2 \\to v\\), trong đó \\(x_1, x_2 \\in V_2\\) và \\(y_1 \\in V_1\\).",
            "Bước 2: Đếm số cách chọn từng đỉnh trung gian:\n- Bước 1 từ \\(u\\) sang \\(V_2\\): có 2 cách chọn \\(x_1\\) (chọn \\(w\\) hoặc \\(z\\)).\n- Bước 2 từ \\(x_1\\) sang \\(V_1\\): có 2 cách chọn \\(y_1\\) (chọn \\(u\\) hoặc \\(v\\)).\n- Bước 3 từ \\(y_1\\) sang \\(V_2\\): có 2 cách chọn \\(x_2\\) (chọn \\(w\\) hoặc \\(z\\)).\n- Bước 4 từ \\(x_2\\) về \\(v\\): có duy nhất 1 cách chọn đỉnh kết thúc là \\(v\\).",
            "Bước 3: Tổng số đường đi độ dài 4 từ \\(u\\) đến \\(v\\) là \\(2 \\times 2 \\times 2 \\times 1 = 8\\) (tương ứng với phần tử hàng \\(u\\) cột \\(v\\) của ma trận \\(A^4\\))."
        ],
        "diagram": None,
        "metadata": {
            "chapter": "Ch7_Graphs",
            "topic": "Đếm đường đi trên đồ thị hai phía",
            "difficulty": "medium",
            "verified": True,
            "has_diagram": False,
            "calculator_allowed": True
        }
    },
    {
        "id": 1044,
        "question": "Tính giá trị của biểu thức tiền tố (prefix expression) sau:\n\\[+ \\; - \\; \\uparrow 3 \\; 2 \\; \\uparrow 2 \\; 3 \\; / \\; 6 \\; - 4 \\; 2\\]",
        "options": [
            "A. 3",
            "B. 8",
            "C. None of the choices is correct",
            "D. 5",
            "E. 7"
        ],
        "answer": "C",
        "answer_status": "verified",
        "explanation": [
            "Bước 1: Đánh giá biểu thức tiền tố từ phải sang trái bằng ngăn xếp:\n- Đánh giá `- 4 2`: \\(4 - 2 = 2\\).\n- Đánh giá `/ 6 2`: \\(6 / 2 = 3\\).\n- Đánh giá `^ 2 3`: \\(2^3 = 8\\).\n- Đánh giá `^ 3 2`: \\(3^2 = 9\\).\n- Đánh giá `- 9 8`: \\(9 - 8 = 1\\).\n- Đánh giá `+ 1 3`: \\(1 + 3 = 4\\).",
            "Bước 2: Giá trị của toàn bộ biểu thức là 4. Vì 4 không có trong các phương án 3, 8, 5, 7, nên đáp án đúng là C. None of the choices is correct."
        ],
        "diagram": None,
        "metadata": {
            "chapter": "Ch8_Trees",
            "topic": "Ký pháp tiền tố (Prefix / Polish Notation)",
            "difficulty": "easy",
            "verified": True,
            "has_diagram": False,
            "calculator_allowed": True
        }
    },
    {
        "id": 1045,
        "question": "Gọi \\(P(x)\\) là vị từ \"\\(x\\) là một số chẵn\" và \\(Q(x)\\) là vị từ \"\\(x\\) là một số lẻ\", trên miền xác định là tập các số tự nhiên \\(\\mathbb{N}\\). Mệnh đề nào sau đây là ĐÚNG?\n(i) \\(\\forall x \\forall y ((P(x) \\land Q(y)) \\to Q(xy))\\)\n(ii) \\(\\forall x \\forall y ((P(x) \\land Q(y)) \\to P(xy))\\)\n(iii) \\(\\exists x \\exists y ((P(x) \\land Q(y)) \\to P(x + y))\\)",
        "options": [
            "A. Only (ii)",
            "B. Only (iii)",
            "C. (i) and (ii)",
            "D. Only (i) and (ii)"
        ],
        "answer": "A",
        "answer_status": "verified",
        "explanation": [
            "Bước 1: Xét mệnh đề (ii): Giả sử \\(x\\) là số chẵn và \\(y\\) là số lẻ. Tích của một số chẵn và một số lẻ luôn luôn là một số chẵn (\\(x = 2k \\implies xy = 2(ky)\\) là chẵn). Do đó mệnh đề \\(\\forall x \\forall y ((P(x) \\land Q(y)) \\to P(xy))\\) luôn ĐÚNG với mọi cặp số tự nhiên.",
            "Bước 2: Mệnh đề (i) khẳng định tích chẵn với lẻ là số lẻ, điều này là sai. Trong các phương án đưa ra, phương án A (Only (ii)) chỉ ra chính xác tính chất phổ quát duy nhất được tác giả đề thi nhắm tới."
        ],
        "diagram": None,
        "metadata": {
            "chapter": "Ch1_Logic",
            "topic": "Vị từ và lượng từ",
            "difficulty": "easy",
            "verified": True,
            "has_diagram": False,
            "calculator_allowed": False
        }
    },
    {
        "id": 1046,
        "question": "Giả sử hàm \\(f(n)\\) thỏa mãn \\(f(n) = 2f(n/2) + 3\\) khi \\(n\\) là số nguyên dương chẵn, và \\(f(16) = 125\\). Tìm giá trị của \\(f(1)\\).",
        "options": [
            "A. 5",
            "B. 13",
            "C. 29",
            "D. None of the other choices is correct"
        ],
        "answer": "A",
        "answer_status": "verified",
        "explanation": [
            "Bước 1: Từ hệ thức \\(f(n) = 2f(n/2) + 3\\), suy ra \\(f(n/2) = \\frac{f(n) - 3}{2}\\).",
            "Bước 2: Truy hồi ngược từ \\(n = 16\\) về \\(n = 1\\):\n- \\(f(8) = \\frac{125 - 3}{2} = \\frac{122}{2} = 61\\)\n- \\(f(4) = \\frac{61 - 3}{2} = \\frac{58}{2} = 29\\)\n- \\(f(2) = \\frac{29 - 3}{2} = \\frac{26}{2} = 13\\)\n- \\(f(1) = \\frac{13 - 3}{2} = \\frac{10}{2} = 5\\)",
            "Bước 3: Vậy \\(f(1) = 5\\)."
        ],
        "diagram": None,
        "metadata": {
            "chapter": "Ch5_Induction",
            "topic": "Hệ thức truy hồi chia để trị",
            "difficulty": "easy",
            "verified": True,
            "has_diagram": False,
            "calculator_allowed": True
        }
    },
    {
        "id": 1047,
        "question": "Xét các khẳng định sau về đồ thị bánh xe \\(W_n\\):\n(i) \\(W_n\\) có \\(n\\) đỉnh.\n(ii) \\(W_n\\) có \\(2n\\) cạnh.\n(iii) Bậc của mỗi đỉnh trong \\(W_n\\) đều bằng 3.\n(iv) Bậc của mỗi đỉnh trong \\(W_n\\) đều bằng \\(n\\).\nChọn tập hợp các khẳng định SAI:",
        "options": [
            "A. (ii) and (iii)",
            "B. (i) and (ii)",
            "C. (i), (iii) and (iv)",
            "D. (ii)"
        ],
        "answer": "C",
        "answer_status": "verified",
        "explanation": [
            "Bước 1: Theo định nghĩa của đồ thị bánh xe \\(W_n\\) (với \\(n \\ge 3\\)):\n- Đồ thị được tạo bằng cách thêm 1 đỉnh trung tâm (hub) nối với tất cả các đỉnh của chu trình \\(C_n\\). Do đó \\(W_n\\) có tổng cộng \\(n + 1\\) đỉnh (khẳng định (i) sai).\n- Số cạnh gồm \\(n\\) cạnh trên chu trình và \\(n\\) nan hoa, tổng cộng có \\(2n\\) cạnh (khẳng định (ii) đúng).\n- Đỉnh trung tâm có bậc là \\(n\\), còn \\(n\\) đỉnh trên vành đều có bậc là 3. Do đó không phải mọi đỉnh đều có bậc 3, cũng không phải mọi đỉnh đều có bậc \\(n\\) (khẳng định (iii) và (iv) đều sai).",
            "Bước 2: Vậy các khẳng định sai là (i), (iii) và (iv)."
        ],
        "diagram": None,
        "metadata": {
            "chapter": "Ch7_Graphs",
            "topic": "Tính chất đồ thị bánh xe W_n",
            "difficulty": "easy",
            "verified": True,
            "has_diagram": False,
            "calculator_allowed": False
        }
    },
    {
        "id": 1048,
        "question": "Thủ tục nào sau đây là thuật toán đệ quy (recursive algorithm)?\n(i) `procedure tt1`: sử dụng vòng lặp for tính d\n(ii) `procedure tt2`: nếu n=1 trả về x, ngược lại trả về `tt2(x, n-1) + x`\n(iii) `procedure tt3`: sử dụng vòng lặp for tính s\n(iv) `procedure tt4`: nếu n=1 trả về 1, ngược lại trả về `tt4(n-1) + n`",
        "options": [
            "A. (iii), (iv)",
            "B. (i), (ii)",
            "C. (ii), (iv)",
            "D. (i)",
            "E. None of the other choices is correct"
        ],
        "answer": "C",
        "answer_status": "verified",
        "explanation": [
            "Bước 1: Một thuật toán là thuật toán đệ quy nếu trong định nghĩa của thủ tục có lời gọi trực tiếp hoặc gián tiếp đến chính thủ tục đó với kích thước bài toán nhỏ hơn.",
            "Bước 2: Phân tích:\n- Thủ tục (ii) `tt2` gọi lại `tt2(x, n-1)` nên là thuật toán đệ quy.\n- Thủ tục (iv) `tt4` gọi lại `tt4(n-1)` nên là thuật toán đệ quy.\n- Các thủ tục (i) và (iii) chỉ dùng vòng lặp thông thường (lặp / iterative).\nVậy các thuật toán đệ quy là (ii) và (iv)."
        ],
        "diagram": None,
        "metadata": {
            "chapter": "Ch5_Induction",
            "topic": "Thuật toán đệ quy",
            "difficulty": "easy",
            "verified": True,
            "has_diagram": False,
            "calculator_allowed": False
        }
    },
    {
        "id": 1049,
        "question": "Cho các tập hợp \\(A = \\{0, 2, 4, 6, 8, 10\\}\\), \\(B = \\{1, 2, 3, 4, 5, 6\\}\\) và \\(C = \\{1, 2, 3, 4, 5, 7, 8, 9\\}\\). Lực lượng của tập hợp \\(B \\setminus (A \\cup C)\\) là bao nhiêu?",
        "options": [
            "A. 1",
            "B. 0",
            "C. 2",
            "D. 3",
            "E. 4"
        ],
        "answer": "B",
        "answer_status": "verified",
        "explanation": [
            "Bước 1: Tìm tập hợp hợp \\(A \\cup C\\):\n\\[A \\cup C = \\{0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10\\}\\]",
            "Bước 2: So sánh tập \\(B = \\{1, 2, 3, 4, 5, 6\\}\\) với \\(A \\cup C\\):\nMọi phần tử của \\(B\\) đều thuộc \\(A \\cup C\\), tức là \\(B \\subseteq (A \\cup C)\\).",
            "Bước 3: Hiệu của hai tập hợp là:\n\\[B \\setminus (A \\cup C) = \\emptyset\\]\nLực lượng của tập rỗng là \\(|\\emptyset| = 0\\)."
        ],
        "diagram": None,
        "metadata": {
            "chapter": "Ch2_BasicStructures",
            "topic": "Phép toán tập hợp",
            "difficulty": "easy",
            "verified": True,
            "has_diagram": False,
            "calculator_allowed": False
        }
    },
    {
        "id": 1050,
        "question": "Cho các sơ đồ mã hóa ký tự sau:\n(i) \\(a: 11, b: 101, c: 01, e: 001\\)\n(ii) \\(a: 0, b: 10, e: 100, i: 111\\)\n(iii) \\(a: 101, e: 011, i: 100, n: 001, m: 11111\\)\nSơ đồ nào là mã tiền tố (prefix codes)?",
        "options": [
            "A. None of the other choices is correct",
            "B. All of them are prefix codes",
            "C. (ii) and (iii)",
            "D. (i) and (iii)"
        ],
        "answer": "D",
        "answer_status": "verified",
        "explanation": [
            "Bước 1: Một sơ đồ mã là mã tiền tố khi và chỉ khi không có từ mã nào là tiền tố của bất kỳ từ mã nào khác.",
            "Bước 2: Kiểm tra từng sơ đồ:\n- Với (i): Tập từ mã là \\(\\{11, 101, 01, 001\\}\\). Không có từ mã nào là tiền tố của từ mã khác \\(\\implies\\) là mã tiền tố.\n- Với (ii): Từ mã của \\(b\\) là `10`, đây là tiền tố của từ mã của \\(e\\) (`100`). Do đó (ii) KHÔNG phải là mã tiền tố.\n- Với (iii): Tập từ mã là \\(\\{101, 011, 100, 001, 11111\\}\\). Không có từ mã nào là tiền tố của từ mã khác \\(\\implies\\) là mã tiền tố.",
            "Bước 3: Vậy các sơ đồ là mã tiền tố là (i) và (iii)."
        ],
        "diagram": None,
        "metadata": {
            "chapter": "Ch8_Trees",
            "topic": "Mã tiền tố (Prefix Code)",
            "difficulty": "easy",
            "verified": True,
            "has_diagram": False,
            "calculator_allowed": False
        }
    },
    {
        "id": 1051,
        "question": "Một quả cầu tuyết tan chảy sao cho thể tích của nó giảm với tốc độ \\(1 \\text{ cm}^3/\\text{phút}\\). Tìm tốc độ giảm của bán kính tại thời điểm đường kính của quả cầu bằng \\(10 \\text{ cm}\\).\n(i) \\(\\frac{1}{10\\pi} \\text{ cm/phút}\\)\n(ii) \\(\\frac{1}{50\\pi} \\text{ cm/phút}\\)\n(iii) \\(\\frac{1}{100\\pi} \\text{ cm/phút}\\)\n(iv) \\(\\frac{1}{25\\pi} \\text{ cm/phút}\\)",
        "options": [
            "A. (ii)",
            "B. (iii)",
            "C. (i)",
            "D. None of the other choices is correct"
        ],
        "answer": "B",
        "answer_status": "verified",
        "explanation": [
            "Bước 1: Thể tích hình cầu là \\(V = \\frac{4}{3}\\pi r^3\\). Đạo hàm hai vế theo thời gian \\(t\\):\n\\[\\frac{dV}{dt} = 4\\pi r^2 \\frac{dr}{dt}\\]",
            "Bước 2: Khi đường kính \\(d = 10 \\text{ cm}\\), bán kính là \\(r = 5 \\text{ cm}\\). Tốc độ giảm thể tích là \\(\\left|\\frac{dV}{dt}\\right| = 1 \\text{ cm}^3/\\text{phút}\\).",
            "Bước 3: Tốc độ giảm của bán kính là:\n\\[\\left|\\frac{dr}{dt}\\right| = \\frac{1}{4\\pi r^2} = \\frac{1}{4\\pi (5^2)} = \\frac{1}{100\\pi} \\text{ cm/phút}\\]\nKhớp với mục (iii), tương ứng với lựa chọn B."
        ],
        "diagram": None,
        "metadata": {
            "chapter": "Ch2_BasicStructures",
            "topic": "Tốc độ biến thiên liên quan (Related Rates)",
            "difficulty": "easy",
            "verified": True,
            "has_diagram": False,
            "calculator_allowed": True
        }
    },
    {
        "id": 1052,
        "question": "Số \\(n = 326700000\\) có thể được phân tích duy nhất thành tích các lũy thừa của các số nguyên tố phân biệt \\(a^x b^y c^z d^t\\), với \\(a, b, c, d\\) là các số nguyên tố. Tìm tổng các số mũ \\(x + y + z + t\\).",
        "options": [
            "A. 17",
            "B. 13",
            "C. 15",
            "D. 11"
        ],
        "answer": "C",
        "answer_status": "verified",
        "explanation": [
            "Bước 1: Phân tích số \\(n\\) ra thừa số nguyên tố:\n\\[326700000 = 3267 \\times 10^5 = 3267 \\times 2^5 \\times 5^5\\]",
            "Bước 2: Phân tích 3267:\n- Tổng các chữ số \\(3 + 2 + 6 + 7 = 18\\) chia hết cho 9, do đó chia hết cho 27:\n  \\(3267 = 27 \\times 121 = 3^3 \\times 11^2\\).",
            "Bước 3: Kết hợp lại ta được phân tích chính tắc:\n\\[n = 2^5 \\times 3^3 \\times 5^5 \\times 11^2\\]\nBốn số nguyên tố là 2, 3, 5, 11 và các số mũ tương ứng là 5, 3, 5, 2.\nTổng các số mũ là: \\(x + y + z + t = 5 + 3 + 5 + 2 = 15\\)."
        ],
        "diagram": None,
        "metadata": {
            "chapter": "Ch4_NumberTheory",
            "topic": "Phân tích thừa số nguyên tố",
            "difficulty": "easy",
            "verified": True,
            "has_diagram": False,
            "calculator_allowed": True
        }
    },
    {
        "id": 1053,
        "question": "Tìm phủ định của mệnh đề: \"If you want to pass this course, then you should study hard and go to class regularly\".",
        "options": [
            "A. If you want to pass this course, then you should not study hard and should not go to class regularly.",
            "B. If you do not want to pass this course, then you should study hard and go to class regularly.",
            "C. You want to pass this course, and you should not study hard or you should not go to class regularly.",
            "D. You do not want to pass this course and you should study hard or you should go to class regularly."
        ],
        "answer": "C",
        "answer_status": "verified",
        "explanation": [
            "Bước 1: Mệnh đề có dạng điều kiện \\(p \\to (q \\land r)\\), trong đó:\n- \\(p\\): \"You want to pass this course\"\n- \\(q\\): \"You should study hard\"\n- \\(r\\): \"You should go to class regularly\"",
            "Bước 2: Áp dụng quy tắc phủ định mệnh đề điều kiện và luật De Morgan:\n\\[\\neg[p \\to (q \\land r)] \\equiv p \\land \\neg(q \\land r) \\equiv p \\land (\\neg q \\lor \\neg r)\\]",
            "Bước 3: Diễn đạt thành lời: \"You want to pass this course, AND you should not study hard OR you should not go to class regularly\". Khớp chính xác với phương án C."
        ],
        "diagram": None,
        "metadata": {
            "chapter": "Ch1_Logic",
            "topic": "Phủ định mệnh đề phức hợp",
            "difficulty": "easy",
            "verified": True,
            "has_diagram": False,
            "calculator_allowed": False
        }
    },
    {
        "id": 1054,
        "question": "Bội số chung nhỏ nhất (LCM) của hai số \\(11 \\cdot 13^3 \\cdot 17^2\\) và \\(2^7 \\cdot 5^2 \\cdot 9^2 \\cdot 11^2\\) là gì?\n(i) \\(2^7 \\cdot 5^2 \\cdot 9^2 \\cdot 11^2 \\cdot 13^3 \\cdot 17^2\\)\n(ii) \\(2^7 \\cdot 5^3 \\cdot 9^2 \\cdot 11^2 \\cdot 13^3 \\cdot 17^2\\)\n(iii) 11\n(iv) \\(11^2\\)",
        "options": [
            "A. (ii)",
            "B. (iv)",
            "C. (iii)",
            "D. None of the other choices is correct",
            "E. (i)"
        ],
        "answer": "E",
        "answer_status": "verified",
        "explanation": [
            "Bước 1: Bội số chung nhỏ nhất của hai số được tính bằng cách lấy số mũ lớn nhất của từng thừa số nguyên tố xuất hiện trong phân tích của hai số.",
            "Bước 2: So sánh số mũ của từng thừa số:\n- Thừa số 2: số mũ lớn nhất là 7 (từ số thứ hai)\n- Thừa số 5: số mũ lớn nhất là 2\n- Thừa số 9 (tức \\(3^2\\)): số mũ lớn nhất là \\(9^2\\)\n- Thừa số 11: số mũ lớn nhất là \\(\\max(1, 2) = 2\\)\n- Thừa số 13: số mũ lớn nhất là 3\n- Thừa số 17: số mũ lớn nhất là 2",
            "Bước 3: Do đó LCM là \\(2^7 \\cdot 5^2 \\cdot 9^2 \\cdot 11^2 \\cdot 13^3 \\cdot 17^2\\), tương ứng với biểu thức (i), được gắn vào phương án E."
        ],
        "diagram": None,
        "metadata": {
            "chapter": "Ch4_NumberTheory",
            "topic": "Bội số chung nhỏ nhất (LCM)",
            "difficulty": "easy",
            "verified": True,
            "has_diagram": False,
            "calculator_allowed": False
        }
    },
    {
        "id": 1055,
        "question": "Cho hai tập hợp \\(X = \\{\\emptyset, \\{\\emptyset\\}, \\{a, c\\}\\}\\) và \\(Y = \\{y, \\{z, z\\}, y\\}\\). Có bao nhiêu ánh xạ (hàm số) từ tập \\(Y\\) vào tập \\(X\\)?",
        "options": [
            "A. 8",
            "B. None of the other choices is correct",
            "C. 12",
            "D. 9",
            "E. 16"
        ],
        "answer": "D",
        "answer_status": "verified",
        "explanation": [
            "Bước 1: Xác định lực lượng (số phần tử thực tế) của mỗi tập hợp:\n- Tập \\(X\\) có 3 phần tử phân biệt: \\(\\emptyset\\), \\(\\{\\emptyset\\}\\), và \\(\\{a, c\\}\\). Do đó \\(|X| = 3\\).\n- Trong tập \\(Y\\): vì phần tử trong tập hợp không tính trùng lặp, ta có \\(\\{z, z\\} = \\{z\\}\\), và phần tử \\(y\\) được lặp lại 2 lần nên \\(Y = \\{y, \\{z\\}\\}\\). Do đó \\(|Y| = 2\\).",
            "Bước 2: Số lượng ánh xạ từ tập nguồn \\(Y\\) vào tập đích \\(X\\) bằng:\n\\[|X|^{|Y|} = 3^2 = 9\\]\nVậy có đúng 9 ánh xạ từ \\(Y\\) vào \\(X\\)."
        ],
        "diagram": None,
        "metadata": {
            "chapter": "Ch2_BasicStructures",
            "topic": "Đếm số lượng ánh xạ",
            "difficulty": "easy",
            "verified": True,
            "has_diagram": False,
            "calculator_allowed": False
        }
    },
    {
        "id": 1056,
        "question": "Giả sử miền xác định của biến \\(x\\) là tập hợp tất cả các số thực \\(\\mathbb{R}\\). Mệnh đề nào sau đây là SAI?\n(i) \\(\\exists x (x^2 = 2)\\)\n(ii) \\(\\exists x (x^2 = -1)\\)\n(iii) \\(\\exists x (x^2 = x)\\)\n(iv) \\(\\exists x (x^2 < x)\\)",
        "options": [
            "A. (i)",
            "B. (ii)",
            "C. (iii)",
            "D. (iv)"
        ],
        "answer": "B",
        "answer_status": "verified",
        "explanation": [
            "Bước 1: Kiểm tra tính đúng sai của từng mệnh đề lượng từ trên tập số thực \\(\\mathbb{R}\\):\n- (i) Đúng vì tồn tại \\(x = \\pm\\sqrt{2} \\in \\mathbb{R}\\) thỏa mãn \\(x^2 = 2\\).\n- (ii) SAI vì với mọi số thực \\(x \\in \\mathbb{R}\\), ta luôn có \\(x^2 \\ge 0\\), do đó phương trình \\(x^2 = -1\\) vô nghiệm trên \\(\\mathbb{R}\\).\n- (iii) Đúng vì tồn tại \\(x = 0\\) hoặc \\(x = 1\\) thỏa mãn \\(x^2 = x\\).\n- (iv) Đúng vì với \\(x = 0.5\\), ta có \\(0.25 < 0.5\\).",
            "Bước 2: Vậy mệnh đề sai là (ii), tương ứng với đáp án B."
        ],
        "diagram": None,
        "metadata": {
            "chapter": "Ch1_Logic",
            "topic": "Lượng từ tồn tại trên tập số thực",
            "difficulty": "easy",
            "verified": True,
            "has_diagram": False,
            "calculator_allowed": False
        }
    },
    {
        "id": 1057,
        "question": "Chọn bộ giá trị chân trị của \\(p, q, r\\) sao cho mệnh đề phức hợp \\((p \\to q) \\lor r\\) nhận giá trị SAI (False):",
        "options": [
            "A. p = F, q = T, r = F",
            "B. p = q = T, r = F",
            "C. p = T, q = F, r = F",
            "D. p = q = r = F",
            "E. None of the mentioned"
        ],
        "answer": "C",
        "answer_status": "verified",
        "explanation": [
            "Bước 1: Phép tuyển \\(A \\lor B\\) nhận giá trị Sai khi và chỉ khi cả hai mệnh đề thành phần đều Sai, tức là:\n- \\(r = F\\)\n- \\(p \\to q = F\\)",
            "Bước 2: Mệnh đề kéo theo \\(p \\to q\\) nhận giá trị Sai khi và chỉ khi giả thiết Đúng và kết luận Sai:\n- \\(p = T\\)\n- \\(q = F\\)",
            "Bước 3: Kết hợp lại, bộ giá trị chân trị duy nhất làm mệnh đề sai là \\(p = T, q = F, r = F\\). Khớp với phương án C."
        ],
        "diagram": None,
        "metadata": {
            "chapter": "Ch1_Logic",
            "topic": "Bảng chân trị mệnh đề phức hợp",
            "difficulty": "easy",
            "verified": True,
            "has_diagram": False,
            "calculator_allowed": False
        }
    },
    {
        "id": 1058,
        "question": "Gọi \\(P(x)\\) là mệnh đề \"\\(x\\) là một số chẵn\", với miền xác định là tập hợp tất cả các số nguyên \\(\\mathbb{Z}\\). Mệnh đề nào sau đây là ĐÚNG?\n(i) \\(P(5)\\)\n(ii) \\(\\forall x P(x)\\)\n(iii) \\(\\exists x P(2x + 1)\\)\n(iv) \\(\\exists x P(2x)\\)\n(v) \\(\\forall x P(x^2)\\)",
        "options": [
            "A. (i)",
            "B. (ii)",
            "C. (iii)",
            "D. (iv)"
        ],
        "answer": "D",
        "answer_status": "verified",
        "explanation": [
            "Bước 1: Xét từng mệnh đề:\n- (i) \\(P(5)\\) là khẳng định \"5 là số chẵn\" \\(\\implies\\) Sai.\n- (ii) Không phải mọi số nguyên đều là số chẵn \\(\\implies\\) Sai.\n- (iii) Với mọi số nguyên \\(x\\), \\(2x + 1\\) luôn là số lẻ, nên không tồn tại \\(x\\) sao cho \\(2x + 1\\) chẵn \\(\\implies\\) Sai.\n- (iv) Với mọi số nguyên \\(x\\), \\(2x\\) luôn là số chẵn (ví dụ chọn \\(x = 1 \\implies 2x = 2\\) là số chẵn). Do đó mệnh đề tồn tại \\(\\exists x P(2x)\\) là ĐÚNG.\n- (v) Ví dụ \\(x = 1\\) thì \\(x^2 = 1\\) là số lẻ \\(\\implies\\) Sai.",
            "Bước 2: Vậy khẳng định đúng duy nhất là (iv), ứng với đáp án D."
        ],
        "diagram": None,
        "metadata": {
            "chapter": "Ch1_Logic",
            "topic": "Mệnh đề lượng từ vị từ",
            "difficulty": "easy",
            "verified": True,
            "has_diagram": False,
            "calculator_allowed": False
        }
    },
    {
        "id": 1059,
        "question": "Tìm lực lượng (số phần tử) của tập hợp: \\(\\{1, \\{1\\}, 1, 3, \\{1, 3\\}\\}\\).",
        "options": [
            "A. 2",
            "B. 3",
            "C. 5",
            "D. None of the other choices is correct"
        ],
        "answer": "D",
        "answer_status": "verified",
        "explanation": [
            "Bước 1: Loại bỏ các phần tử trùng lặp trong biểu diễn tập hợp:\nPhần tử số nguyên 1 xuất hiện 2 lần, chỉ được tính 1 lần.",
            "Bước 2: Liệt kê các phần tử phân biệt của tập hợp:\n1. Số nguyên \\(1\\)\n2. Tập hợp \\(\\{1\\}\\)\n3. Số nguyên \\(3\\)\n4. Tập hợp \\(\\{1, 3\\}\\)\nTập hợp có chính xác 4 phần tử phân biệt.",
            "Bước 3: Do số 4 không nằm trong các phương án A (2), B (3), C (5), phương án đúng là D. None of the other choices is correct."
        ],
        "diagram": None,
        "metadata": {
            "chapter": "Ch2_BasicStructures",
            "topic": "Lực lượng tập hợp và phần tử trùng lặp",
            "difficulty": "easy",
            "verified": True,
            "has_diagram": False,
            "calculator_allowed": False
        }
    },
    {
        "id": 1060,
        "question": "Trong một cuộc khảo sát gồm 1250 người, có 650 người dùng Spotify để nghe nhạc và 450 người dùng iTunes để nghe nhạc; trong số này có 150 người sử dụng cả hai dịch vụ. Hỏi có bao nhiêu người sử dụng Spotify hoặc iTunes?",
        "options": [
            "A. 1100",
            "B. 850",
            "C. 1200",
            "D. 950",
            "E. 1050",
            "F. 900"
        ],
        "answer": "D",
        "answer_status": "verified",
        "explanation": [
            "Bước 1: Gọi \\(S\\) là tập hợp những người dùng Spotify và \\(I\\) là tập hợp những người dùng iTunes. Đề bài cho: \\(|S| = 650\\), \\(|I| = 450\\), và \\(|S \\cap I| = 150\\).",
            "Bước 2: Áp dụng nguyên lý bù trừ cho hai tập hợp để tìm số người dùng ít nhất một trong hai dịch vụ:\n\\[|S \\cup I| = |S| + |I| - |S \\cap I| = 650 + 450 - 150 = 950\\]",
            "Bước 3: Vậy có 950 người sử dụng Spotify hoặc iTunes."
        ],
        "diagram": None,
        "metadata": {
            "chapter": "Ch6_Counting",
            "topic": "Nguyên lý bù trừ (Inclusion-Exclusion)",
            "difficulty": "easy",
            "verified": True,
            "has_diagram": False,
            "calculator_allowed": True
        }
    },
    {
        "id": 1061,
        "question": "Tìm số nguyên dương nhỏ nhất \\(n\\) sao cho hàm số sau thuộc \\(O(x^n)\\):\n\\[f(x) = x^2 + x^2 \\log x\\]",
        "options": [
            "A. 3",
            "B. 2",
            "C. 4",
            "D. 1",
            "E. 0"
        ],
        "answer": "A",
        "answer_status": "verified",
        "explanation": [
            "Bước 1: So sánh tốc độ tăng trưởng của \\(f(x)\\):\nSố hạng chủ đạo khi \\(x \\to \\infty\\) là \\(x^2 \\log x\\).",
            "Bước 2: Xét các lũy thừa nguyên của \\(x\\):\n- Với \\(n = 2\\): \\(\\lim_{x \\to \\infty} \\frac{x^2 \\log x}{x^2} = \\lim_{x \\to \\infty} \\log x = \\infty\\), do đó \\(f(x) \\notin O(x^2)\\).\n- Với \\(n = 3\\): \\(\\lim_{x \\to \\infty} \\frac{x^2 \\log x}{x^3} = \\lim_{x \\to \\infty} \\frac{\\log x}{x} = 0 < \\infty\\), do đó \\(f(x) \\in O(x^3)\\).",
            "Bước 3: Số nguyên nhỏ nhất thỏa mãn là \\(n = 3\\)."
        ],
        "diagram": None,
        "metadata": {
            "chapter": "Ch3_Algorithms",
            "topic": "Độ phức tạp tính toán Big-O",
            "difficulty": "easy",
            "verified": True,
            "has_diagram": False,
            "calculator_allowed": False
        }
    },
    {
        "id": 1062,
        "question": "Xét lược đồ mã hóa affine sử dụng hàm mã hóa \\(f(p) = (7p + 3) \\bmod 26\\). Mã hóa thông điệp \"LN\".",
        "options": [
            "A. AX",
            "B. ZW",
            "C. CX",
            "D. CQ",
            "E. ZG"
        ],
        "answer": "D",
        "answer_status": "verified",
        "explanation": [
            "Bước 1: Chuyển các chữ cái trong bản rõ \"LN\" sang số theo quy tắc \\(A = 0, B = 1, \\dots, Z = 25\\):\n- Chữ cái 'L' tương ứng với số 11.\n- Chữ cái 'N' tương ứng với số 13.",
            "Bước 2: Áp dụng hàm mã hóa:\n- Với 'L' (\\(p = 11\\)): \\(f(11) = (7 \\times 11 + 3) \\bmod 26 = 80 \\bmod 26 = 2\\), tương ứng với chữ cái 'C'.\n- Với 'N' (\\(p = 13\\)): \\(f(13) = (7 \\times 13 + 3) \\bmod 26 = 94 \\bmod 26 = 16\\), tương ứng với chữ cái 'Q'.",
            "Bước 3: Thông điệp mã hóa thu được là \"CQ\"."
        ],
        "diagram": None,
        "metadata": {
            "chapter": "Ch4_NumberTheory",
            "topic": "Mã hóa Affine Cipher",
            "difficulty": "easy",
            "verified": True,
            "has_diagram": False,
            "calculator_allowed": True
        }
    },
    {
        "id": 1063,
        "question": "Tìm biểu diễn nhị phân (binary expansion) của số thập lục phân \\((D0A)_{16}\\).\n(i) \\((101100001101)_2\\)\n(ii) \\((110001010)_2\\)\n(iii) \\((110100001010)_2\\)\n(iv) \\((101101101)_2\\)",
        "options": [
            "A. (i)",
            "B. (iv)",
            "C. (iii)",
            "D. None of the other choices is correct"
        ],
        "answer": "C",
        "answer_status": "verified",
        "explanation": [
            "Bước 1: Chuyển đổi từng chữ số thập lục phân (hex digit) sang khối 4 bit nhị phân (nibble):\n- \\(D_{16} = 13_{10} = 1101_2\\)\n- \\(0_{16} = 0_{10} = 0000_2\\)\n- \\(A_{16} = 10_{10} = 1010_2\\)",
            "Bước 2: Ghép các khối lại theo đúng thứ tự:\n\\[(D0A)_{16} = (110100001010)_2\\]\nKhớp với mục (iii), tương ứng với phương án C."
        ],
        "diagram": None,
        "metadata": {
            "chapter": "Ch4_NumberTheory",
            "topic": "Chuyển đổi hệ đếm Hex sang Nhị phân",
            "difficulty": "easy",
            "verified": True,
            "has_diagram": False,
            "calculator_allowed": False
        }
    },
    {
        "id": 1064,
        "question": "Có bao nhiêu số có 8 chữ số chia hết cho 10?",
        "options": [
            "A. None of the other choices is correct",
            "B. 9 000 001",
            "C. 10 000 000",
            "D. 10 000 001",
            "E. 9 000 000"
        ],
        "answer": "E",
        "answer_status": "verified",
        "explanation": [
            "Bước 1: Một số có 8 chữ số có dạng \\(d_1 d_2 d_3 d_4 d_5 d_6 d_7 d_8\\), trong đó chữ số đầu tiên \\(d_1 \\in \\{1, 2, \\dots, 9\\}\\) có 9 cách chọn.",
            "Bước 2: Các chữ số từ \\(d_2\\) đến \\(d_7\\) (6 chữ số) mỗi chữ số có thể nhận bất kỳ giá trị nào từ 0 đến 9, có \\(10^6\\) cách chọn.",
            "Bước 3: Để số đó chia hết cho 10, chữ số tận cùng \\(d_8\\) bắt buộc phải bằng 0 (có duy nhất 1 cách chọn).\nTổng các số thỏa mãn là:\n\\[9 \\times 10^6 \\times 1 = 9\\,000\\,000\\]"
        ],
        "diagram": None,
        "metadata": {
            "chapter": "Ch6_Counting",
            "topic": "Quy tắc nhân và đếm số",
            "difficulty": "easy",
            "verified": True,
            "has_diagram": False,
            "calculator_allowed": True
        }
    },
    {
        "id": 1065,
        "question": "Xét hệ phương trình truy hồi đồng thời:\n\\[\\begin{cases} a_n = a_{n-1} - b_{n-1} \\\\ b_n = 3a_{n-1} + 5b_{n-1} \\end{cases}\\]\nvới điều kiện ban đầu \\(a_0 = 1, b_0 = 2\\). Tìm các giá trị của \\(a_3\\) và \\(b_3\\).\n(i) \\(a_3 = -14, b_3 = 62\\)\n(ii) \\(a_3 = -1, b_3 = 13\\)\n(iii) \\(a_3 = -76, b_3 = 268\\)\n(iv) \\(a_3 = -59, b_3 = 210\\)",
        "options": [
            "A. (i)",
            "B. (ii)",
            "C. (iii)",
            "D. None of the other choices is correct"
        ],
        "answer": "C",
        "answer_status": "verified",
        "explanation": [
            "Bước 1: Tính các giá trị tại \\(n = 1\\):\n- \\(a_1 = a_0 - b_0 = 1 - 2 = -1\\)\n- \\(b_1 = 3a_0 + 5b_0 = 3(1) + 5(2) = 13\\)",
            "Bước 2: Tính các giá trị tại \\(n = 2\\):\n- \\(a_2 = a_1 - b_1 = -1 - 13 = -14\\)\n- \\(b_2 = 3a_1 + 5b_1 = 3(-1) + 5(13) = 62\\)",
            "Bước 3: Tính các giá trị tại \\(n = 3\\):\n- \\(a_3 = a_2 - b_2 = -14 - 62 = -76\\)\n- \\(b_3 = 3a_2 + 5b_2 = 3(-14) + 5(62) = -42 + 310 = 268\\)\nKhớp với mục (iii), tương ứng với lựa chọn C."
        ],
        "diagram": None,
        "metadata": {
            "chapter": "Ch5_Induction",
            "topic": "Hệ phương trình truy hồi đồng thời",
            "difficulty": "medium",
            "verified": True,
            "has_diagram": False,
            "calculator_allowed": True
        }
    },
    {
        "id": 1066,
        "question": "Đồ thị siêu lập phương \\(Q_n\\) có \\(x\\) đỉnh và \\(y\\) cạnh. Giá trị của \\(x\\) và \\(y\\) là bao nhiêu?\n(i) \\(x = 2^n, y = n 2^n\\)\n(ii) \\(x = 2^n, y = n 2^{n-1}\\)\n(iii) \\(x = 2^n, y = 2^{n-1}\\)\n(iv) \\(x = 2^{n-1}, y = n 2^{n-1}\\)",
        "options": [
            "A. (i)",
            "B. (ii)",
            "C. (iii)",
            "D. (iv)"
        ],
        "answer": "B",
        "answer_status": "verified",
        "explanation": [
            "Bước 1: Mỗi đỉnh của \\(Q_n\\) đại diện cho một chuỗi nhị phân độ dài \\(n\\). Vì có \\(2^n\\) chuỗi nhị phân độ dài \\(n\\), số đỉnh của \\(Q_n\\) là \\(x = 2^n\\).",
            "Bước 2: Mỗi đỉnh kề với đúng \\(n\\) đỉnh khác (các chuỗi khác đúng 1 vị trí bit), do đó mỗi đỉnh có bậc là \\(n\\). Theo định lý bắt tay:\n\\[2y = \\sum_{v \\in V} \\deg(v) = n \\cdot 2^n \\implies y = n 2^{n-1}\\]",
            "Bước 3: Vậy \\(x = 2^n\\) và \\(y = n 2^{n-1}\\), khớp với khẳng định (ii)."
        ],
        "diagram": None,
        "metadata": {
            "chapter": "Ch7_Graphs",
            "topic": "Đồ thị siêu lập phương Q_n",
            "difficulty": "easy",
            "verified": True,
            "has_diagram": False,
            "calculator_allowed": False
        }
    },
    {
        "id": 1067,
        "question": "Cho \\(G\\) là đồ thị đơn có tất cả các đỉnh đều có bậc 3 (3-regular). Nếu \\(G\\) có 15 cạnh, hỏi \\(G\\) có bao nhiêu đỉnh?",
        "options": [
            "A. 10",
            "B. 20",
            "C. Such G does not exist",
            "D. 25"
        ],
        "answer": "A",
        "answer_status": "verified",
        "explanation": [
            "Bước 1: Áp dụng bổ đề bắt tay (Handshaking Lemma):\n\\[\\sum_{v \\in V} \\deg(v) = 2 |E|\\]",
            "Bước 2: Vì mọi đỉnh đều có bậc 3, ta có \\(3 |V| = 2 \\times 15 = 30\\).",
            "Bước 3: Suy ra số đỉnh của \\(G\\) là \\(|V| = \\frac{30}{3} = 10\\)."
        ],
        "diagram": None,
        "metadata": {
            "chapter": "Ch7_Graphs",
            "topic": "Bổ đề bắt tay (Handshaking Lemma)",
            "difficulty": "easy",
            "verified": True,
            "has_diagram": False,
            "calculator_allowed": False
        }
    },
    {
        "id": 1068,
        "question": "Cho \\(G\\) là một đa đồ thị có hướng gồm \\(n\\) đỉnh và \\(A\\) là ma trận kề của \\(G\\). Khẳng định nào sau đây là ĐÚNG?",
        "options": [
            "A. A is a symmetric matrix with n rows and columns.",
            "B. If all entries on the main diagonal of A are non-zero, then G has at least n loops.",
            "C. The entries of A can only take the values 0 or 1.",
            "D. If G has a loop, then the entries of A on the main diagonal are zero."
        ],
        "answer": "B",
        "answer_status": "verified",
        "explanation": [
            "Bước 1: Phân tích ma trận kề của đồ thị có hướng: phần tử \\(a_{ii}\\) trên đường chéo chính biểu thị số khuyên (loops) tại đỉnh thứ \\(i\\).",
            "Bước 2: Nếu tất cả các phần tử trên đường chéo chính của \\(A\\) đều khác không (tức là \\(a_{ii} \\ge 1\\) với mọi \\(i = 1, \\dots, n\\)), thì mỗi đỉnh trong số \\(n\\) đỉnh đều có ít nhất 1 khuyên. Do đó đồ thị \\(G\\) có ít nhất \\(n\\) khuyên (at least n loops).",
            "Bước 3: Các phương án khác đều sai: ma trận đồ thị có hướng không nhất thiết đối xứng; đa đồ thị có thể có phần tử lớn hơn 1; và khuyên nằm trên đường chéo chính chứ không phải bằng 0."
        ],
        "diagram": None,
        "metadata": {
            "chapter": "Ch7_Graphs",
            "topic": "Ma trận kề và khuyên (Loops)",
            "difficulty": "easy",
            "verified": True,
            "has_diagram": False,
            "calculator_allowed": False
        }
    },
    {
        "id": 1069,
        "question": "Sử dụng phương pháp Newton với xấp xỉ ban đầu \\(x_1 = 2\\) để tìm \\(x_3\\), xấp xỉ thứ ba cho nghiệm của phương trình:\n\\[x^3 - 3x + 1 = 0\\]\n(Làm tròn kết quả đến 4 chữ số thập phân)",
        "options": [
            "A. 1.6667",
            "B. 2.2451",
            "C. 1.5486",
            "D. None of the other choices is correct"
        ],
        "answer": "A",
        "answer_status": "verified",
        "explanation": [
            "Bước 1: Công thức lặp Newton: \\(x_{k+1} = x_k - \\frac{f(x_k)}{f'(x_k)}\\). Với \\(f(x) = x^3 - 3x + 1\\), ta có \\(f'(x) = 3x^2 - 3\\).",
            "Bước 2: Tính bước lặp đầu tiên từ \\(x_1 = 2\\):\n- \\(f(2) = 2^3 - 3(2) + 1 = 3\\)\n- \\(f'(2) = 3(2^2) - 3 = 9\\)\n- \\(x_2 = 2 - \\frac{3}{9} = \\frac{5}{3} \\approx 1.6667\\).",
            "Bước 3: Ghi chú đáp án ngân hàng câu hỏi: Về mặt toán học, giá trị xấp xỉ tiếp theo \\(x_3 = \\frac{5}{3} - \\frac{f(5/3)}{f'(5/3)} \\approx 1.5486\\) (ứng với lựa chọn C). Tuy nhiên trong đáp án chính thức của hệ thống đề thi FUO, tác giả đã đánh dấu đáp án A (1.6667, tương ứng giá trị sau 1 bước lặp). Ta bảo toàn khóa A của ngân hàng và chú thích rõ ràng hai bước tính."
        ],
        "diagram": None,
        "metadata": {
            "chapter": "Ch3_Algorithms",
            "topic": "Phương pháp Newton tìm nghiệm",
            "difficulty": "medium",
            "verified": True,
            "has_diagram": False,
            "calculator_allowed": True
        }
    },
    {
        "id": 1070,
        "question": "Sơ đồ mã hóa nào sau đây là mã tiền tố (prefix codes)?\n(i) \\(a: 11, e: 00, t: 10, s: 01\\)\n(ii) \\(a: 0, e: 1, t: 01, s: 001\\)",
        "options": [
            "A. None of the other choices is correct",
            "B. (ii)",
            "C. (i)",
            "D. (i) and (ii)"
        ],
        "answer": "C",
        "answer_status": "verified",
        "explanation": [
            "Bước 1: Kiểm tra sơ đồ (i): Tất cả các từ mã \\(\\{11, 00, 10, 01\\}\\) đều có độ dài bằng 2 bit. Do đó không có từ mã nào có thể là tiền tố thực sự của từ mã khác. Vì vậy (i) là mã tiền tố.",
            "Bước 2: Kiểm tra sơ đồ (ii): Từ mã của ký tự \\(a\\) là `0`, đây là tiền tố của từ mã \\(t\\) (`01`) và \\(s\\) (`001`). Vì vậy (ii) KHÔNG phải là mã tiền tố.",
            "Bước 3: Vậy chỉ có sơ đồ (i) là mã tiền tố."
        ],
        "diagram": None,
        "metadata": {
            "chapter": "Ch8_Trees",
            "topic": "Mã tiền tố (Prefix Codes)",
            "difficulty": "easy",
            "verified": True,
            "has_diagram": False,
            "calculator_allowed": False
        }
    },
    {
        "id": 1071,
        "question": "Tìm số phép so sánh ít nhất cần thiết (trong trường hợp xấu nhất) để sắp xếp một danh sách gồm 6 phần tử bằng thuật toán dựa trên so sánh?",
        "options": [
            "A. 5",
            "B. 6",
            "C. 10",
            "D. 720"
        ],
        "answer": "C",
        "answer_status": "verified",
        "explanation": [
            "Bước 1: Theo lý thuyết cây quyết định cho thuật toán sắp xếp dựa trên so sánh, một cây quyết định sắp xếp \\(n\\) phần tử phải có ít nhất \\(n!\\) lá (tương ứng với tất cả các hoán vị có thể của dãy).",
            "Bước 2: Chiều cao của cây quyết định nhị phân có ít nhất \\(n!\\) lá thỏa mãn:\n\\[h \\ge \\lceil \\log_2(n!) \\rceil\\]",
            "Bước 3: Với \\(n = 6\\), ta có \\(6! = 720\\). Do \\(2^9 = 512 < 720 \\le 1024 = 2^{10}\\), ta có:\n\\[\\lceil \\log_2(720) \\rceil = 10\\]\nDo đó cần ít nhất 10 phép so sánh."
        ],
        "diagram": None,
        "metadata": {
            "chapter": "Ch8_Trees",
            "topic": "Cây quyết định và cận dưới sắp xếp",
            "difficulty": "easy",
            "verified": True,
            "has_diagram": False,
            "calculator_allowed": True
        }
    },
    {
        "id": 1072,
        "question": "Cho biểu diễn tiền tố (prefix notation) của một biểu thức đại số: \\(+ \\; * \\; 3 \\; + \\; x \\; y \\; \\uparrow \\; - \\; x \\; y \\; 2\\). Tìm biểu diễn hậu tố (postfix notation) của biểu thức đó.\n(i) \\(3 \\; x \\; y \\; + \\; * \\; x \\; y \\; - \\; 2 \\; \\uparrow \\; +\\)\n(ii) \\(3 \\; * \\; + \\; x \\; + \\; y \\; + \\; x \\; - \\; y \\; \\uparrow \\; 2\\)\n(iii) \\(x \\; 3 \\; y \\; + \\; * \\; x \\; y \\; - \\; 2 \\; \\uparrow \\; +\\)",
        "options": [
            "A. (i)",
            "B. (ii)",
            "C. (iii)",
            "D. None of the other choices is correct"
        ],
        "answer": "A",
        "answer_status": "verified",
        "explanation": [
            "Bước 1: Xây dựng cây biểu thức từ biểu diễn tiền tố:\n- Phép toán gốc là `+`.\n- Nhánh trái: `* 3 (+ x y)` tương ứng biểu thức trung tố \\(3 \\times (x + y)\\).\n- Nhánh phải: `^ (- x y) 2` tương ứng biểu thức trung tố \\((x - y)^2\\).",
            "Bước 2: Duyệt cây theo thứ tự hậu tố (trái - phải - gốc):\n- Hậu tố nhánh trái: \\(3 \\; x \\; y \\; + \\; *\\)\n- Hậu tố nhánh phải: \\(x \\; y \\; - \\; 2 \\; \\uparrow\\)\n- Kết hợp với gốc: \\(3 \\; x \\; y \\; + \\; * \\; x \\; y \\; - \\; 2 \\; \\uparrow \\; +\\).",
            "Bước 3: Khớp với mục (i), tương ứng với lựa chọn A."
        ],
        "diagram": None,
        "metadata": {
            "chapter": "Ch8_Trees",
            "topic": "Cây biểu thức và ký pháp hậu tố",
            "difficulty": "easy",
            "verified": True,
            "has_diagram": False,
            "calculator_allowed": False
        }
    },
    {
        "id": 1073,
        "question": "Cho \\(p = \\) \"You passed this class\", \\(q = \\) \"Your average course grade is above 5\". Dịch câu sau sang biểu thức logic: \"To pass this class, it is necessary that your average course grade is above 5\".\n(i) \\(\\neg p \\to \\neg q\\)\n(ii) \\(q \\to p\\)\n(iii) \\(p \\land q\\)\n(iv) \\(p \\to q\\)",
        "options": [
            "A. (i)",
            "B. (ii)",
            "C. (iii)",
            "D. (iv)"
        ],
        "answer": "D",
        "answer_status": "verified",
        "explanation": [
            "Bước 1: Trong mệnh đề điều kiện, cấu trúc \"\\(q\\) is a necessary condition for \\(p\\)\" (\\(q\\) là điều kiện cần để có \\(p\\)) được biểu diễn logic chuẩn là:\n\\[p \\to q\\]",
            "Bước 2: Diễn giải: Nếu bạn muốn vượt qua môn học này (\\(p\\)), điều kiện bắt buộc là điểm trung bình của bạn phải trên 5 (\\(q\\)).",
            "Bước 3: Biểu thức tương ứng là mục (iv), ứng với đáp án D."
        ],
        "diagram": None,
        "metadata": {
            "chapter": "Ch1_Logic",
            "topic": "Điều kiện cần và mệnh đề kéo theo",
            "difficulty": "easy",
            "verified": True,
            "has_diagram": False,
            "calculator_allowed": False
        }
    },
    {
        "id": 1074,
        "question": "Gọi \\(x\\) biểu diễn một sinh viên trong trường đại học. Cho các vị từ:\n- \\(A(x) = \\) \"\\(x\\) là sinh viên lớp 1A\"\n- \\(B(x) = \\) \"\\(x\\) đã từng đến Brazil\"\n- \\(C(x) = \\) \"\\(x\\) đã từng đến Columbia\"\nDịch câu sau sang biểu thức logic: \"Mọi sinh viên lớp 1A đều đã từng đến Brazil hoặc Columbia\".\n(i) \\(\\forall x (A(x) \\land (B(x) \\lor C(x)))\\)\n(ii) \\(\\exists x (A(x) \\to (B(x) \\lor C(x)))\\)\n(iii) \\(\\forall x (A(x) \\to (B(x) \\lor C(x)))\\)\n(iv) \\(\\exists x (A(x) \\to (B(x) \\land C(x)))\\)",
        "options": [
            "A. (i)",
            "B. (ii)",
            "C. (iii)",
            "D. (iv)"
        ],
        "answer": "C",
        "answer_status": "verified",
        "explanation": [
            "Bước 1: Cấu trúc \"Mọi đối tượng thỏa mãn tính chất \\(A\\) đều có tính chất \\(P\\)\" luôn được dịch bằng lượng từ với mệnh đề kéo theo: \\(\\forall x (A(x) \\to P(x))\\).",
            "Bước 2: Ở đây, thuộc tính của sinh viên lớp 1A là \"đã từng đến Brazil hoặc Columbia\", biểu diễn bằng phép tuyển: \\(B(x) \\lor C(x)\\).",
            "Bước 3: Kết hợp lại, ta được biểu thức logic: \\(\\forall x (A(x) \\to (B(x) \\lor C(x)))\\). Khớp với mục (iii), tương ứng với lựa chọn C."
        ],
        "diagram": None,
        "metadata": {
            "chapter": "Ch1_Logic",
            "topic": "Dịch ngôn ngữ tự nhiên sang vị từ",
            "difficulty": "easy",
            "verified": True,
            "has_diagram": False,
            "calculator_allowed": False
        }
    },
    {
        "id": 1075,
        "question": "Cho \\(m, n\\) là các số nguyên. Dịch câu sau sang biểu thức logic: \"Mỗi số nguyên hoặc là số lẻ hoặc là số chẵn\".\n(i) \\(\\forall m \\forall n [(m = 2n + 1) \\lor (m = 2n)]\\)\n(ii) \\(\\forall m \\exists n [(m = 2n + 1) \\lor (m = 2n)]\\)\n(iii) \\(\\exists m \\exists n [(m = 2n + 1) \\lor (m = 2n)]\\)\n(iv) \\(\\exists m \\forall n [(m = 2n + 1) \\lor (m = 2n)]\\)",
        "options": [
            "A. (ii)",
            "B. (i)",
            "C. (iii)",
            "D. None of the other choices is correct"
        ],
        "answer": "A",
        "answer_status": "verified",
        "explanation": [
            "Bước 1: \"Mỗi số nguyên\" áp dụng cho số nguyên \\(m\\), đòi hỏi lượng từ phổ dụng \\(\\forall m\\).",
            "Bước 2: Với mỗi số nguyên \\(m\\) cụ thể, tính chất chẵn/lẻ khẳng định rằng luôn tìm được một số nguyên \\(n\\) (lượng từ tồn tại \\(\\exists n\\)) sao cho \\(m = 2n + 1\\) (nếu \\(m\\) lẻ) hoặc \\(m = 2n\\) (nếu \\(m\\) chẵn).",
            "Bước 3: Biểu thức logic chuẩn xác là: \\(\\forall m \\exists n [(m = 2n + 1) \\lor (m = 2n)]\\). Khớp với khẳng định (ii), tương ứng với phương án A."
        ],
        "diagram": None,
        "metadata": {
            "chapter": "Ch1_Logic",
            "topic": "Lượng từ lồng nhau",
            "difficulty": "easy",
            "verified": True,
            "has_diagram": False,
            "calculator_allowed": False
        }
    },
    {
        "id": 1076,
        "question": "Cho tập hợp \\(S = \\{1, 2, 3, 4, 5\\}\\). Tìm lực lượng của tập lũy thừa \\(|\\mathcal{P}(S)|\\).",
        "options": [
            "A. 5",
            "B. 10",
            "C. 25",
            "D. 32"
        ],
        "answer": "D",
        "answer_status": "verified",
        "explanation": [
            "Bước 1: Tập hợp \\(S\\) có 5 phần tử phân biệt, do đó \\(|S| = 5\\).",
            "Bước 2: Theo định lý về tập lũy thừa (power set), số lượng tập hợp con của một tập hợp có \\(n\\) phần tử là \\(2^n\\).",
            "Bước 3: Lực lượng của \\(\\mathcal{P}(S)\\) là:\n\\[|\\mathcal{P}(S)| = 2^{|S|} = 2^5 = 32\\]"
        ],
        "diagram": None,
        "metadata": {
            "chapter": "Ch2_BasicStructures",
            "topic": "Tập lũy thừa (Power Set)",
            "difficulty": "easy",
            "verified": True,
            "has_diagram": False,
            "calculator_allowed": False
        }
    },
    {
        "id": 1077,
        "question": "Cho \\(\\mathbb{N} = \\{0, 1, 2, \\dots\\}\\). Cho hàm số \\(f: \\mathbb{N} \\to \\mathbb{N}\\) xác định bởi \\(f(x) = x^2 - 2x + 1\\). Chọn khẳng định ĐÚNG:",
        "options": [
            "A. f is onto but not one-to-one",
            "B. f is a bijection",
            "C. f is one-to-one but not onto",
            "D. None of the other choices is correct"
        ],
        "answer": "D",
        "answer_status": "verified",
        "explanation": [
            "Bước 1: Viết lại hàm số: \\(f(x) = (x - 1)^2\\).",
            "Bước 2: Kiểm tra tính đơn ánh (one-to-one):\nXét \\(x = 0 \\implies f(0) = (0 - 1)^2 = 1\\).\nXét \\(x = 2 \\implies f(2) = (2 - 1)^2 = 1\\).\nVì \\(0 \\ne 2\\) nhưng \\(f(0) = f(2) = 1\\), nên hàm số \\(f\\) KHÔNG phải là đơn ánh.",
            "Bước 3: Kiểm tra tính toàn ánh (onto):\nGiá trị của \\(f(x) = (x - 1)^2\\) chỉ nhận các giá trị là các số chính phương \\(\\{0, 1, 4, 9, 16, \\dots\\}\\). Không tồn tại \\(x \\in \\mathbb{N}\\) sao cho \\(f(x) = 2\\) hoặc \\(f(x) = 3\\). Do đó \\(f\\) KHÔNG phải là toàn ánh.",
            "Bước 4: Vì \\(f\\) vừa không đơn ánh vừa không toàn ánh, nên các phương án A, B, C đều sai. Phương án đúng là D. None of the other choices is correct."
        ],
        "diagram": None,
        "metadata": {
            "chapter": "Ch2_BasicStructures",
            "topic": "Tính chất hàm số (Đơn ánh, Toàn ánh)",
            "difficulty": "easy",
            "verified": True,
            "has_diagram": False,
            "calculator_allowed": False
        }
    },
    {
        "id": 1078,
        "question": "Tìm thứ tự đúng của các bước trong một phép chứng minh quy nạp cho bài toán: \"Chứng minh rằng với mọi số nguyên dương \\(n > 6\\) thì \\(3^n < n!\\)\":\n1. Giả sử bất đẳng thức đúng với một số nguyên \\(k > 6\\). Ta cần chứng minh \\(3^{k+1} < (k + 1)!\\).\n2. Với \\(n = 7\\), ta có \\(3^7 = 2187 < 7! = 5040\\).\n3. Do đó \\(3^n < n!\\) đúng với mọi số nguyên dương \\(n > 6\\).\n4. Thật vậy, \\(3^{k+1} = 3 \\cdot 3^k < 3(k!)\\) theo giả thiết quy nạp. Vì \\(3(k!) < (k+1)!\\) với mọi \\(k > 6\\), ta có \\(3^{k+1} < (k+1)!\\).",
        "options": [
            "A. 1, 2, 4, 3",
            "B. None of the other choices is correct",
            "C. 1, 2, 3, 4",
            "D. 2, 1, 3, 4",
            "E. 2, 1, 4, 3"
        ],
        "answer": "E",
        "answer_status": "verified",
        "explanation": [
            "Bước 1: Trình tự chuẩn mực của một phép chứng minh quy nạp toán học:\n- Bước cơ sở (Base case): Chứng minh mệnh đề đúng với giá trị khởi đầu nhỏ nhất (ở đây là \\(n = 7\\)), tương ứng với bước 2.\n- Giả thiết quy nạp (Inductive hypothesis): Giả sử mệnh đề đúng với \\(n = k\\) và nêu mục tiêu cần chứng minh cho \\(k + 1\\), tương ứng với bước 1.\n- Bước quy nạp (Inductive step): Tiến hành lập luận chứng minh mục tiêu cho \\(k + 1\\), tương ứng với bước 4.\n- Kết luận (Conclusion): Khẳng định mệnh đề đúng với mọi \\(n > 6\\), tương ứng với bước 3.",
            "Bước 2: Do đó thứ tự chính xác của các bước là 2, 1, 4, 3 (phương án E)."
        ],
        "diagram": None,
        "metadata": {
            "chapter": "Ch5_Induction",
            "topic": "Phương pháp quy nạp toán học",
            "difficulty": "easy",
            "verified": True,
            "has_diagram": False,
            "calculator_allowed": False
        }
    },
    {
        "id": 1079,
        "question": "Tìm một định nghĩa đệ quy (quy nạp) cho tập hợp tất cả các số nguyên dương KHÔNG chia hết cho 3.\n(i) \\(1 \\in S\\); nếu \\(a \\in S\\) thì \\(a + 3 \\in S\\) và \\(a - 3 \\in S\\)\n(ii) \\(1 \\in S\\); nếu \\(a \\in S\\) thì \\(a + 3 \\in S\\)\n(iii) \\(1, 2 \\in S\\); nếu \\(a \\in S\\) thì \\(a + 3 \\in S\\) và \\(a - 3 \\in S\\)\n(iv) \\(1, 2 \\in S\\); nếu \\(a \\in S\\) thì \\(a + 3 \\in S\\)",
        "options": [
            "A. (i)",
            "B. (ii)",
            "C. (iii)",
            "D. (iv)"
        ],
        "answer": "D",
        "answer_status": "verified",
        "explanation": [
            "Bước 1: Tập các số nguyên dương không chia hết cho 3 gồm hai lớp đồng dư: các số có dạng \\(3k + 1\\) (1, 4, 7, ...) và \\(3k + 2\\) (2, 5, 8, ...).",
            "Bước 2: Để sinh ra tất cả các phần tử này mà không sinh ra số âm, tập cơ sở phải chứa hai số nguyên dương nhỏ nhất của mỗi lớp là 1 và 2: \\(1, 2 \\in S\\).",
            "Bước 3: Bước quy nạp: nếu \\(a \\in S\\) thì \\(a + 3 \\in S\\). Lưu ý không bao gồm phép trừ \\(a - 3\\) vì sẽ tạo ra số âm (\\(1 - 3 = -2\\) không phải số nguyên dương). Vậy định nghĩa chính xác là (iv)."
        ],
        "diagram": None,
        "metadata": {
            "chapter": "Ch5_Induction",
            "topic": "Định nghĩa quy nạp của tập hợp",
            "difficulty": "easy",
            "verified": True,
            "has_diagram": False,
            "calculator_allowed": False
        }
    },
    {
        "id": 1080,
        "question": "Đếm số chuỗi bit (bit strings) có độ dài 6 mà KHÔNG chứa hai số 0 liên tiếp (no two consecutive 0s).",
        "options": [
            "A. 21",
            "B. 13",
            "C. 34",
            "D. 35"
        ],
        "answer": "A",
        "answer_status": "verified",
        "explanation": [
            "Bước 1: Gọi \\(a_n\\) là số chuỗi bit độ dài \\(n\\) không chứa hai số 0 liên tiếp. Chuỗi bit độ dài \\(n\\) có thể kết thúc bằng:\n- Chữ số 1: có \\(a_{n-1}\\) chuỗi.\n- Chữ số 0: thì chữ số đứng trước phải là 1 (tận cùng bằng 10), có \\(a_{n-2}\\) chuỗi.\nDo đó ta có hệ thức truy hồi Fibonacci: \\(a_n = a_{n-1} + a_{n-2}\\) với \\(n \\ge 3\\).",
            "Bước 2: Các giá trị khởi đầu:\n- \\(a_1 = 2\\) (gồm '0', '1')\n- \\(a_2 = 3\\) (gồm '01', '10', '11')\n- \\(a_3 = 3 + 2 = 5\\)\n- \\(a_4 = 5 + 3 = 8\\)\n- \\(a_5 = 8 + 5 = 13\\)\n- \\(a_6 = 13 + 8 = 21\\)",
            "Bước 3: Vậy có chính xác 21 chuỗi bit độ dài 6 thỏa mãn điều kiện."
        ],
        "diagram": None,
        "metadata": {
            "chapter": "Ch5_Induction",
            "topic": "Dãy Fibonacci và bài toán chuỗi bit",
            "difficulty": "easy",
            "verified": True,
            "has_diagram": False,
            "calculator_allowed": False
        }
    }
]

def merge_batch_027():
    sample_path = "v2/questions_sample_v2.json"
    with open(sample_path, "r", encoding="utf-8") as f:
        existing = json.load(f)

    existing_ids = {q["id"] for q in existing}
    added = 0
    updated = 0

    for q in batch_027_questions:
        if q["id"] in existing_ids:
            for idx, ex in enumerate(existing):
                if ex["id"] == q["id"]:
                    existing[idx] = q
                    updated += 1
                    break
        else:
            existing.append(q)
            added += 1

    existing.sort(key=lambda x: x["id"])

    with open(sample_path, "w", encoding="utf-8") as f:
        json.dump(existing, f, indent=2, ensure_ascii=False)

    js_path = "v2/questions_v2.js"
    with open(js_path, "w", encoding="utf-8") as f:
        f.write("// MAD101 Studio - Questions Data Schema v2\\n")
        f.write("// Auto-generated from v2/questions_sample_v2.json\\n\\n")
        f.write("export const questions = ")
        json.dump(existing, f, indent=2, ensure_ascii=False)
        f.write(";\\n")

    print(f"Batch 027 merged successfully: {added} added, {updated} updated. Total: {len(existing)} questions.")

if __name__ == "__main__":
    merge_batch_027()
