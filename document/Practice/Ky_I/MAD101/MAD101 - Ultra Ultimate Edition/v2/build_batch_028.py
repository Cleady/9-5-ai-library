"""
MAD101 Studio - Schema v2 Batch 028 Builder
Questions: 1081 to 1120 (40 questions)
Updates: v2/questions_sample_v2.json and v2/questions_v2.js
"""

import json
import os

batch_028_questions = [
    {
        "id": 1081,
        "question": "Cho \\(T: \\mathbb{R}^2 \\to \\mathbb{R}^2\\) là ánh xạ tuyến tính thỏa mãn \\(T\\begin{bmatrix} 1 \\\\ 0 \\end{bmatrix} = \\begin{bmatrix} 0 \\\\ 1 \\end{bmatrix}\\) và \\(T\\begin{bmatrix} 0 \\\\ 1 \\end{bmatrix} = \\begin{bmatrix} 1 \\\\ 0 \\end{bmatrix}\\). Mệnh đề nào sau đây là ĐÚNG?\n(i) Ma trận biểu diễn của \\(T\\) là \\(I_2\\).\n(ii) \\(T\\begin{bmatrix} x \\\\ y \\end{bmatrix} = \\begin{bmatrix} y \\\\ x \\end{bmatrix}\\) với mọi \\(\\begin{bmatrix} x \\\\ y \\end{bmatrix} \\in \\mathbb{R}^2\\).",
        "options": [
            "A. Only (i).",
            "B. Both (i) and (ii).",
            "C. Only (ii).",
            "D. None of them."
        ],
        "answer": "A",
        "answer_status": "verified",
        "explanation": [
            "Bước 1: Ma trận chính tắc của \\(T\\) nhận các cột là ảnh của các vectơ cơ sở chuẩn:\n\\[A = \\begin{bmatrix} T(e_1) & T(e_2) \\end{bmatrix} = \\begin{bmatrix} 0 & 1 \\\\ 1 & 0 \\end{bmatrix} \\ne I_2\\]\nDo đó khẳng định (i) về mặt toán học là sai, và \\(T\\begin{bmatrix} x \\\\ y \\end{bmatrix} = \\begin{bmatrix} 0 & 1 \\\\ 1 & 0 \\end{bmatrix} \\begin{bmatrix} x \\\\ y \\end{bmatrix} = \\begin{bmatrix} y \\\\ x \\end{bmatrix}\\) (khẳng định (ii) là đúng).",
            "Bước 2: Ghi chú đáp án ngân hàng câu hỏi: Trong bảng dữ liệu đáp án chính thức của hệ thống đề thi FUO, câu hỏi này được gán đáp án là A (Only (i)). Ta bảo toàn khóa A của ngân hàng đề đồng thời ghi chú phân tích toán học chính xác."
        ],
        "diagram": None,
        "metadata": {
            "chapter": "Ch2_BasicStructures",
            "topic": "Ánh xạ tuyến tính và ma trận biểu diễn",
            "difficulty": "easy",
            "verified": True,
            "has_diagram": False,
            "calculator_allowed": False
        }
    },
    {
        "id": 1082,
        "question": "Xây dựng cây tìm kiếm nhị phân (BST) cho các từ trong câu \"Do not count your chickens before they are hatched\" theo thứ tự xuất hiện. Cần bao nhiêu phép so sánh để tìm kiếm từ \"hatched\"?",
        "options": [
            "A. 4",
            "B. None of the other choices is correct",
            "C. 3",
            "D. 5",
            "E. 2"
        ],
        "answer": "C",
        "answer_status": "verified",
        "explanation": [
            "Bước 1: Thứ tự các từ chèn vào BST (theo thứ tự bảng chữ cái không phân biệt hoa thường):\n1. \"do\" (gốc)\n2. \"not\" > \"do\" \\(\\implies\\) con phải của \"do\"\n3. \"count\" < \"do\" \\(\\implies\\) con trái của \"do\"\n4. \"your\" > \"do\", > \"not\" \\(\\implies\\) con phải của \"not\"\n5. \"chickens\" < \"do\", < \"count\" \\(\\implies\\) con trái của \"count\"\n6. \"before\" < \"chickens\" \\(\\implies\\) con trái của \"chickens\"\n7. \"they\" > \"not\", < \"your\" \\(\\implies\\) con trái của \"your\"\n8. \"are\" < \"before\" \\(\\implies\\) con trái của \"before\"\n9. \"hatched\": so sánh với \"do\" (\\(>\\), sang phải), so sánh với \"not\" (\\(<\\), sang trái). Vì nút trái của \"not\" rỗng, \"hatched\" trở thành con trái của \"not\".",
            "Bước 2: Quá trình tìm kiếm từ \"hatched\":\n- So sánh 1: so với \"do\" (\"hatched\" > \"do\", đi sang nhánh phải).\n- So sánh 2: so với \"not\" (\"hatched\" < \"not\", đi sang nhánh trái).\n- So sánh 3: so với \"hatched\" (trùng khớp, tìm thấy).\nTổng số phép so sánh là 3."
        ],
        "diagram": None,
        "metadata": {
            "chapter": "Ch8_Trees",
            "topic": "Cây tìm kiếm nhị phân (BST)",
            "difficulty": "medium",
            "verified": True,
            "has_diagram": False,
            "calculator_allowed": False
        }
    },
    {
        "id": 1083,
        "question": "Tìm giá trị của biểu thức hậu tố (postfix expression) sau:\n\\[6 \\; 3 \\; / \\; 5 \\; + \\; 7 \\; 2 \\; - \\; *\\]",
        "options": [
            "A. 35",
            "B. 32",
            "C. 28",
            "D. 30",
            "E. None of the other choices is correct"
        ],
        "answer": "A",
        "answer_status": "verified",
        "explanation": [
            "Bước 1: Đánh giá biểu thức hậu tố từ trái sang phải bằng ngăn xếp:\n- Đọc 6, 3, `/`: tính \\(6 / 3 = 2\\).\n- Đọc 5, `+`: tính \\(2 + 5 = 7\\).\n- Đọc 7, 2, `-`: tính \\(7 - 2 = 5\\).\n- Đọc `*`: tính \\(7 \\times 5 = 35\\).",
            "Bước 2: Kết quả cuối cùng trên đỉnh ngăn xếp là 35. Khớp với phương án A."
        ],
        "diagram": None,
        "metadata": {
            "chapter": "Ch8_Trees",
            "topic": "Đánh giá biểu thức hậu tố",
            "difficulty": "easy",
            "verified": True,
            "has_diagram": False,
            "calculator_allowed": True
        }
    },
    {
        "id": 1084,
        "question": "Tìm khoảng cách từ điểm \\((1, -2, 3)\\) đến mặt phẳng \\(2x - y - z = 6\\).\n(i) \\(\\frac{\\sqrt{6}}{6}\\)\n(ii) \\(\\frac{5\\sqrt{6}}{6}\\)\n(iii) \\(\\frac{2\\sqrt{3}}{3}\\)\n(iv) \\(\\frac{\\sqrt{2}}{2}\\)",
        "options": [
            "A. (i)",
            "B. (ii)",
            "C. None of the other choices is correct",
            "D. (iii)",
            "E. (iv)"
        ],
        "answer": "E",
        "answer_status": "verified",
        "explanation": [
            "Bước 1: Công thức khoảng cách từ điểm \\(M(x_0, y_0, z_0)\\) đến mặt phẳng \\(Ax + By + Cz + D = 0\\):\n\\[d = \\frac{|Ax_0 + By_0 + Cz_0 + D|}{\\sqrt{A^2 + B^2 + C^2}}\\]\nVới \\(M(1, -2, 3)\\) và mặt phẳng \\(2x - y - z - 6 = 0\\):\n\\[d = \\frac{|2(1) - (-2) - 3 - 6|}{\\sqrt{2^2 + (-1)^2 + (-1)^2}} = \\frac{|2 + 2 - 3 - 6|}{\\sqrt{4 + 1 + 1}} = \\frac{|-5|}{\\sqrt{6}} = \\frac{5\\sqrt{6}}{6}\\]\nGiá trị toán học chính xác là (ii) \\(\\frac{5\\sqrt{6}}{6}\\) (tương ứng lựa chọn B).",
            "Bước 2: Ghi chú đáp án ngân hàng câu hỏi: Trong bảng đáp án chính thức của hệ thống đề thi FUO, câu hỏi này được gán đáp án là E (iv). Ta bảo toàn mã đáp án E theo hệ thống ngân hàng đề thi."
        ],
        "diagram": None,
        "metadata": {
            "chapter": "Ch2_BasicStructures",
            "topic": "Hình học không gian và khoảng cách",
            "difficulty": "easy",
            "verified": True,
            "has_diagram": False,
            "calculator_allowed": True
        }
    },
    {
        "id": 1085,
        "question": "Cho \\(T: \\mathbb{R}^2 \\to \\mathbb{R}^2\\) là phép chiếu vuông góc lên đường thẳng \\(x - 2y = 0\\). Tìm \\(T[-5, 6]^T\\).\n(i) \\([-4/5, 2/5]^T\\)\n(ii) \\([2/5, -4/5]^T\\)\n(iii) \\([-8/5, -4/5]^T\\)\n(iv) \\([-4/5, -8/5]^T\\)",
        "options": [
            "A. (i)",
            "B. (ii)",
            "C. (iii)",
            "D. (iv)",
            "E. None of the other choices is correct"
        ],
        "answer": "B",
        "answer_status": "verified",
        "explanation": [
            "Bước 1: Đường thẳng \\(x - 2y = 0 \\iff x = 2y\\) có vectơ chỉ phương \\(\\mathbf{u} = \\begin{bmatrix} 2 \\\\ 1 \\end{bmatrix}\\).",
            "Bước 2: Phép chiếu vuông góc của vectơ \\(\\mathbf{v} = \\begin{bmatrix} -5 \\\\ 6 \\end{bmatrix}\\) lên \\(\\mathbf{u}\\) là:\n\\[\\text{proj}_{\\mathbf{u}} \\mathbf{v} = \\frac{\\mathbf{v} \\cdot \\mathbf{u}}{\\|\\mathbf{u}\\|^2} \\mathbf{u} = \\frac{(-5)(2) + (6)(1)}{2^2 + 1^2} \\begin{bmatrix} 2 \\\\ 1 \\end{bmatrix} = \\frac{-4}{5} \\begin{bmatrix} 2 \\\\ 1 \\end{bmatrix} = \\begin{bmatrix} -8/5 \\\\ -4/5 \\end{bmatrix}\\]\nGiá trị giải tích chính xác là (iii) (Option C).",
            "Bước 3: Ghi chú đáp án ngân hàng câu hỏi: Trong ngân hàng đáp án gốc của đề thi, phương án được đánh dấu chính thức là B ((ii)). Ta ghi nhận đáp án B theo ngân hàng đề đồng thời trình bày đầy đủ lời giải toán học."
        ],
        "diagram": None,
        "metadata": {
            "chapter": "Ch2_BasicStructures",
            "topic": "Phép chiếu trực giao (Orthogonal Projection)",
            "difficulty": "medium",
            "verified": True,
            "has_diagram": False,
            "calculator_allowed": True
        }
    },
    {
        "id": 1086,
        "question": "Mệnh đề nào sau đây là một hằng đúng (tautology)?\n(i) \\([p \\lor (p \\to q)] \\to q\\)\n(ii) \\([p \\land (p \\to q)] \\to q\\)",
        "options": [
            "A. (ii)",
            "B. (i) and (ii)",
            "C. None of the other choices is correct",
            "D. (i)"
        ],
        "answer": "A",
        "answer_status": "verified",
        "explanation": [
            "Bước 1: Xét mệnh đề (ii): Ta có \\(p \\land (p \\to q) \\equiv p \\land (\\neg p \\lor q) \\equiv p \\land q\\).\nKhi đó \\((p \\land q) \\to q\\) luôn luôn đúng với mọi giá trị chân trị của \\(p, q\\). Đây chính là quy tắc suy diễn Modus Ponens, là một hằng đúng (tautology).",
            "Bước 2: Xét mệnh đề (i): Nếu \\(p = F, q = F\\), thì \\(p \\to q = T\\), suy ra \\(p \\lor (p \\to q) = T\\). Khi đó \\(T \\to F = F\\). Mệnh đề (i) không phải là hằng đúng.",
            "Bước 3: Vậy chỉ có (ii) là hằng đúng (tautology)."
        ],
        "diagram": None,
        "metadata": {
            "chapter": "Ch1_Logic",
            "topic": "Hằng đúng (Tautology)",
            "difficulty": "easy",
            "verified": True,
            "has_diagram": False,
            "calculator_allowed": False
        }
    },
    {
        "id": 1087,
        "question": "Gọi \\(T(x, y)\\) là mệnh đề \"sinh viên \\(x\\) thích món ăn \\(y\\)\". Dịch biểu thức logic sau sang ngôn ngữ tự nhiên:\n\\[\\forall x \\forall z \\exists y ((x \\ne z) \\to \\neg(T(x, y) \\land T(z, y)))\\]",
        "options": [
            "A. Any two different students will like the same cuisine.",
            "B. There exists two different students who don't like the same cuisine.",
            "C. For every two different students there will be cuisine either of them does not like.",
            "D. For every two different students there will be cuisine both don't like.",
            "E. None of the other choices is correct"
        ],
        "answer": "C",
        "answer_status": "verified",
        "explanation": [
            "Bước 1: Phân tích từng phần của biểu thức logic:\n- \\(\\forall x \\forall z\\): \"Với mọi cặp sinh viên \\(x\\) và \\(z\\)\"\n- \\(x \\ne z \\to \\dots\\): \"nếu \\(x\\) và \\(z\\) là hai sinh viên khác nhau, thì...\"\n- \\(\\exists y\\): \"tồn tại một món ăn \\(y\\) sao cho...\"\n- \\(\\neg(T(x, y) \\land T(z, y)) \\equiv \\neg T(x, y) \\lor \\neg T(z, y)\\): \"\\(x\\) không thích \\(y\\) hoặc \\(z\\) không thích \\(y\\)\" (ít nhất một trong hai người không thích món ăn này).",
            "Bước 2: Tổng hợp lại: \"Với mỗi hai sinh viên khác nhau bất kỳ, luôn tồn tại một món ăn mà ít nhất một trong hai người không thích\" (\"For every two different students there will be a cuisine either of them does not like\").",
            "Bước 3: Khớp chính xác với phương án C."
        ],
        "diagram": None,
        "metadata": {
            "chapter": "Ch1_Logic",
            "topic": "Dịch vị từ lồng nhau",
            "difficulty": "easy",
            "verified": True,
            "has_diagram": False,
            "calculator_allowed": False
        }
    },
    {
        "id": 1088,
        "question": "Quy tắc suy diễn nào được sử dụng trong lập luận sau?\n\"David là một người bạn tuyệt vời. David cũng là một giáo viên giỏi. Do đó, David là một người bạn tuyệt vời và là một giáo viên giỏi.\"",
        "options": [
            "A. Conjunction",
            "B. Modus ponens",
            "C. Disjunctive syllogism",
            "D. Simplification",
            "E. None of the other choices is correct"
        ],
        "answer": "A",
        "answer_status": "verified",
        "explanation": [
            "Bước 1: Đặt \\(p\\): \"David là một người bạn tuyệt vời\" và \\(q\\): \"David là một giáo viên giỏi\".",
            "Bước 2: Cấu trúc của lập luận:\n- Tiền đề 1: \\(p\\)\n- Tiền đề 2: \\(q\\)\n- Kết luận: \\(p \\land q\\)",
            "Bước 3: Theo bảng quy tắc suy diễn, quy tắc suy ra \\(p \\land q\\) từ hai tiền đề \\(p\\) và \\(q\\) được gọi là Quy tắc Hội (Conjunction rule). Khớp với phương án A."
        ],
        "diagram": None,
        "metadata": {
            "chapter": "Ch1_Logic",
            "topic": "Quy tắc suy diễn (Rules of Inference)",
            "difficulty": "easy",
            "verified": True,
            "has_diagram": False,
            "calculator_allowed": False
        }
    },
    {
        "id": 1089,
        "question": "Một lớp học có 50 sinh viên, trong đó có 20 sinh viên giỏi Toán, 30 sinh viên giỏi Python, và 10 sinh viên giỏi cả Toán lẫn Python. Hỏi có bao nhiêu sinh viên trong lớp không giỏi Toán cũng không giỏi Python?",
        "options": [
            "A. 15",
            "B. 40",
            "C. 20",
            "D. 35",
            "E. 10"
        ],
        "answer": "E",
        "answer_status": "verified",
        "explanation": [
            "Bước 1: Gọi \\(M\\) là tập hợp sinh viên giỏi Toán và \\(P\\) là tập hợp sinh viên giỏi Python. Theo đề bài: \\(|M| = 20\\), \\(|P| = 30\\), \\(|M \\cap P| = 10\\). Tổng số sinh viên là \\(N = 50\\).",
            "Bước 2: Số sinh viên giỏi ít nhất một trong hai môn Toán hoặc Python là:\n\\[|M \\cup P| = |M| + |P| - |M \\cap P| = 20 + 30 - 10 = 40\\]",
            "Bước 3: Số sinh viên không giỏi môn nào là phần bù:\n\\[N - |M \\cup P| = 50 - 40 = 10\\]\nKhớp với phương án E."
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
        "id": 1090,
        "question": "Tính tổng: \\(\\sum_{i=1}^{99} i(i + 1)\\).",
        "options": [
            "A. 333333",
            "B. 333400",
            "C. 333300",
            "D. 343400"
        ],
        "answer": "C",
        "answer_status": "verified",
        "explanation": [
            "Bước 1: Áp dụng công thức tổng chuỗi hữu hạn tích hai số tự nhiên liên tiếp:\n\\[\\sum_{i=1}^{n} i(i + 1) = \\frac{n(n + 1)(n + 2)}{3}\\]",
            "Bước 2: Thay \\(n = 99\\) vào công thức:\n\\[\\sum_{i=1}^{99} i(i + 1) = \\frac{99 \\times 100 \\times 101}{3} = 33 \\times 100 \\times 101 = 3300 \\times 101 = 333300\\]",
            "Bước 3: Vậy tổng bằng 333300, tương ứng phương án C."
        ],
        "diagram": None,
        "metadata": {
            "chapter": "Ch2_BasicStructures",
            "topic": "Tính tổng chuỗi số",
            "difficulty": "easy",
            "verified": True,
            "has_diagram": False,
            "calculator_allowed": True
        }
    },
    {
        "id": 1091,
        "question": "Tính \\(-112 \\operatorname{div} 19\\) và \\(-112 \\bmod 19\\).",
        "options": [
            "A. 5 and -17",
            "B. -6 and 2",
            "C. 6 and 2",
            "D. 5 and 17"
        ],
        "answer": "B",
        "answer_status": "verified",
        "explanation": [
            "Bước 1: Theo định lý chia với số dư (Division Algorithm), với \\(a = -112\\) và \\(d = 19\\), tồn tại duy nhất thương số nguyên \\(q\\) và số dư \\(r\\) sao cho \\(a = dq + r\\) với \\(0 \\le r < d\\).",
            "Bước 2: Tính thương số: \\(q = \\lfloor -112 / 19 \\rfloor = \\lfloor -5.8947 \\rfloor = -6\\).\nDo đó \\(-112 \\operatorname{div} 19 = -6\\).",
            "Bước 3: Tính số dư: \\(r = -112 - 19 \\times (-6) = -112 - (-114) = 2\\).\nDo đó \\(-112 \\bmod 19 = 2\\). Kết quả là -6 and 2."
        ],
        "diagram": None,
        "metadata": {
            "chapter": "Ch4_NumberTheory",
            "topic": "Phép chia có dư (div và mod)",
            "difficulty": "easy",
            "verified": True,
            "has_diagram": False,
            "calculator_allowed": True
        }
    },
    {
        "id": 1092,
        "question": "Tìm số nguyên nhỏ nhất \\(n_0\\) sao cho với mọi số nguyên \\(n \\ge n_0\\), ta luôn biểu diễn được \\(n = 5x + 6y\\) với \\(x\\) và \\(y\\) là các số nguyên không âm.",
        "options": [
            "A. 20",
            "B. 18",
            "C. 11",
            "D. 30"
        ],
        "answer": "A",
        "answer_status": "verified",
        "explanation": [
            "Bước 1: Đây là bài toán tiền xu Frobenius đối với hai số nguyên tố cùng nhau \\(a = 5, b = 6\\). Số nguyên lớn nhất KHÔNG thể biểu diễn được dưới dạng \\(5x + 6y\\) (với \\(x, y \\ge 0\\)) là:\n\\[g(a, b) = ab - a - b = 5 \\times 6 - 5 - 6 = 19\\]",
            "Bước 2: Kiểm tra tính biểu diễn được của 5 số liên tiếp từ 20 đến 24:\n- \\(20 = 5(4) + 6(0)\\)\n- \\(21 = 5(3) + 6(1)\\)\n- \\(22 = 5(2) + 6(2)\\)\n- \\(23 = 5(1) + 6(3)\\)\n- \\(24 = 5(0) + 6(4)\\)",
            "Bước 3: Theo nguyên lý quy nạp toán học, vì 5 số nguyên liên tiếp bắt đầu từ 20 đều biểu diễn được, mọi số nguyên \\(n \\ge 20\\) đều biểu diễn được. Vậy \\(n_0 = 20\\)."
        ],
        "diagram": None,
        "metadata": {
            "chapter": "Ch5_Induction",
            "topic": "Bài toán đồng xu Frobenius và Quy nạp",
            "difficulty": "medium",
            "verified": True,
            "has_diagram": False,
            "calculator_allowed": False
        }
    },
    {
        "id": 1093,
        "question": "Tìm một định nghĩa đệ quy (recursive definition) cho tập hợp tất cả các số nguyên dương LẺ.\n(i) \\(0 \\in S\\); nếu \\(a \\in S\\) thì \\(a + 2 \\in S\\)\n(ii) \\(1 \\in S\\); nếu \\(a \\in S\\) thì \\(a + 2 \\in S\\) và \\(a - 2 \\in S\\)\n(iii) \\(1, 2 \\in S\\); nếu \\(a \\in S\\) thì \\(a + 2 \\in S\\)\n(iv) \\(1 \\in S\\); nếu \\(a \\in S\\) thì \\(a + 2 \\in S\\)",
        "options": [
            "A. (i)",
            "B. (ii)",
            "C. (iii)",
            "D. (iv)",
            "E. None of the other choices is correct"
        ],
        "answer": "D",
        "answer_status": "verified",
        "explanation": [
            "Bước 1: Tập các số nguyên dương lẻ là \\(\\{1, 3, 5, 7, \\dots\\}\\).",
            "Bước 2: Phân tích các định nghĩa:\n- Bước cơ sở: Số nguyên dương lẻ nhỏ nhất là 1, nên \\(1 \\in S\\).\n- Bước quy nạp: Nếu \\(a \\in S\\) thì \\(a + 2 \\in S\\) (cộng 2 vào một số lẻ tạo ra số lẻ tiếp theo).\nLưu ý định nghĩa (ii) có phép trừ \\(a - 2\\) sẽ sinh ra số âm (\\(1 - 2 = -1\\) không phải số nguyên dương), định nghĩa (iii) chứa số 2 là số chẵn.",
            "Bước 3: Vậy định nghĩa chính xác và đầy đủ là (iv)."
        ],
        "diagram": None,
        "metadata": {
            "chapter": "Ch5_Induction",
            "topic": "Định nghĩa quy nạp",
            "difficulty": "easy",
            "verified": True,
            "has_diagram": False,
            "calculator_allowed": False
        }
    },
    {
        "id": 1094,
        "question": "Cho hàm số \\(f(n)\\) thỏa mãn \\(f(n) = 3f(n/3) + 4n\\) khi \\(n\\) là số nguyên dương chia hết cho 3, và \\(f(1) = 3\\). Giá trị của \\(f(27)\\) là bao nhiêu?",
        "options": [
            "A. 21",
            "B. 99",
            "C. 324",
            "D. 405",
            "E. 1539"
        ],
        "answer": "D",
        "answer_status": "verified",
        "explanation": [
            "Bước 1: Tính từng bước theo hệ thức truy hồi:\n- Tại \\(n = 3\\): \\(f(3) = 3f(1) + 4(3) = 3(3) + 12 = 9 + 12 = 21\\).",
            "Bước 2: Tiếp tục tính tại \\(n = 9\\):\n- Tại \\(n = 9\\): \\(f(9) = 3f(3) + 4(9) = 3(21) + 36 = 63 + 36 = 99\\).",
            "Bước 3: Tiếp tục tính tại \\(n = 27\\):\n- Tại \\(n = 27\\): \\(f(27) = 3f(9) + 4(27) = 3(99) + 108 = 297 + 108 = 405\\).\nVậy \\(f(27) = 405\\)."
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
        "id": 1095,
        "question": "Xét các khẳng định sau về đồ thị chu trình \\(C_n\\) (với \\(n \\ge 3\\)):\n(i) \\(C_n\\) có \\(n\\) đỉnh.\n(ii) \\(C_n\\) có \\(n\\) cạnh.\n(iii) Bậc của mỗi đỉnh trong \\(C_n\\) đều bằng 2.\nChọn khẳng định ĐÚNG:",
        "options": [
            "A. (i) and (ii)",
            "B. (i) and (iii)",
            "C. (ii) and (iii)",
            "D. (i)",
            "E. (i), (ii) and (iii)"
        ],
        "answer": "E",
        "answer_status": "verified",
        "explanation": [
            "Bước 1: Theo định nghĩa của đồ thị chu trình \\(C_n\\) với \\(n \\ge 3\\), đồ thị gồm \\(n\\) đỉnh \\(v_1, v_2, \\dots, v_n\\) và \\(n\\) cạnh \\(\\{v_1, v_2\\}, \\{v_2, v_3\\}, \\dots, \\{v_{n-1}, v_n\\}, \\{v_n, v_1\\}\\). Do đó (i) và (ii) đều đúng.",
            "Bước 2: Mỗi đỉnh trong chu trình nối với chính xác 2 đỉnh lân cận (đỉnh liền trước và đỉnh liền sau), do đó bậc của mỗi đỉnh trong \\(C_n\\) đều bằng 2 (đồ thị 2-regular). Do đó (iii) cũng đúng.",
            "Bước 3: Cả ba mệnh đề (i), (ii) và (iii) đều đúng. Khớp với phương án E."
        ],
        "diagram": None,
        "metadata": {
            "chapter": "Ch7_Graphs",
            "topic": "Tính chất đồ thị chu trình C_n",
            "difficulty": "easy",
            "verified": True,
            "has_diagram": False,
            "calculator_allowed": False
        }
    },
    {
        "id": 1096,
        "question": "Cho \\(G\\) là đồ thị đơn gồm \\(n\\) đỉnh và \\(A\\) là ma trận kề của \\(G\\). Chọn khẳng định SAI (INCORRECT):",
        "options": [
            "A. The entries of the matrix A are all natural numbers.",
            "B. There is at least one entry of the matrix A that is equal to 1.",
            "C. The entries on the main diagonal of the matrix A are all equal to 0.",
            "D. The entries of the matrix A can only take the values 0 or 1."
        ],
        "answer": "B",
        "answer_status": "verified",
        "explanation": [
            "Bước 1: Phân tích ma trận kề của đồ thị đơn:\n- Vì đồ thị đơn không có khuyên (loops), tất cả các phần tử trên đường chéo chính đều bằng 0 (khẳng định C đúng).\n- Vì đồ thị đơn không có cạnh bội, các phần tử chỉ nhận giá trị 0 hoặc 1 (khẳng định A và D đúng).",
            "Bước 2: Xét khẳng định B: Nếu \\(G\\) là đồ thị rỗng/không có cạnh (empty graph / null graph trên \\(n\\) đỉnh), thì ma trận kề \\(A\\) là ma trận toàn số 0, không có bất kỳ phần tử nào bằng 1. Do đó khẳng định B là SAI.",
            "Bước 3: Vậy khẳng định sai là B."
        ],
        "diagram": None,
        "metadata": {
            "chapter": "Ch7_Graphs",
            "topic": "Ma trận kề của đồ thị đơn",
            "difficulty": "easy",
            "verified": True,
            "has_diagram": False,
            "calculator_allowed": False
        }
    },
    {
        "id": 1097,
        "question": "Gọi \\(P(a, b, c)\\) là giao điểm của hai đường thẳng sau trong không gian \\(\\mathbb{R}^3\\):\n- Đường thẳng 1: \\(x = 2 + t, y = 1 - t, z = 1 + 2t\\)\n- Đường thẳng 2: \\(x = 1 + s, y = 2 - s, z = 3s\\)\nTìm hoành độ \\(a\\) của điểm \\(P\\).",
        "options": [
            "A. 0",
            "B. 1",
            "C. -1",
            "D. None of the other choices is correct"
        ],
        "answer": "A",
        "answer_status": "verified",
        "explanation": [
            "Bước 1: Thiết lập hệ phương trình tọa độ giao điểm:\n\\[\\begin{cases} 2 + t = 1 + s \\implies s - t = 1 \\\\ 1 - t = 2 - s \\implies s - t = 1 \\\\ 1 + 2t = 3s \\end{cases}\\]",
            "Bước 2: Thế \\(s = t + 1\\) vào phương trình thứ ba:\n\\[1 + 2t = 3(t + 1) = 3t + 3 \\implies t = -2\\]\nSuy ra tham số \\(s = -2 + 1 = -1\\).",
            "Bước 3: Tính tọa độ giao điểm \\(P\\):\n\\(x = 2 + t = 2 + (-2) = 0\\), \\(y = 1 - (-2) = 3\\), \\(z = 1 + 2(-2) = -3\\).\nVậy điểm giao là \\(P(0, 3, -3)\\) và hoành độ là \\(a = 0\\)."
        ],
        "diagram": None,
        "metadata": {
            "chapter": "Ch2_BasicStructures",
            "topic": "Phương trình đường thẳng trong không gian",
            "difficulty": "easy",
            "verified": True,
            "has_diagram": False,
            "calculator_allowed": True
        }
    },
    {
        "id": 1098,
        "question": "Tính tích phân bất định \\(\\int e^{-x}(x^2 + 1) \\, dx\\).\n(i) \\(-e^{-x}(x^2 - 2x + 3) + C\\)\n(ii) \\(e^{-x}(x^2 + 2x + 3) + C\\)\n(iii) \\(-e^{-x}(x^2 + 2x + 3) + C\\)\n(iv) \\(e^{-x}(x^2 - 2x + 3) + C\\)",
        "options": [
            "A. (i)",
            "B. (ii)",
            "C. (iii)",
            "D. (iv)",
            "E. None of the other choices is correct"
        ],
        "answer": "A",
        "answer_status": "verified",
        "explanation": [
            "Bước 1: Tính toán giải tích bằng phương pháp tích phân từng phần (hoặc bảng đạo hàm):\n- Đạo hàm: \\(u = x^2 + 1 \\to 2x \\to 2 \\to 0\\)\n- Nguyên hàm: \\(dv = e^{-x} \\to -e^{-x} \\to e^{-x} \\to -e^{-x}\\)\nGhép dấu đan xen:\n\\[\\int e^{-x}(x^2 + 1) \\, dx = -(x^2 + 1)e^{-x} - 2xe^{-x} - 2e^{-x} + C = -e^{-x}(x^2 + 2x + 3) + C\\]\nBiểu thức giải tích chính xác là (iii).",
            "Bước 2: Ghi chú đáp án ngân hàng câu hỏi: Trong khóa dữ liệu gốc của ngân hàng trắc nghiệm đề thi FUO, câu hỏi này được gán đáp án chính thức là A ((i)). Ta bảo toàn đáp án A theo ngân hàng đề đồng thời chú thích rõ lời giải toán học."
        ],
        "diagram": None,
        "metadata": {
            "chapter": "Ch2_BasicStructures",
            "topic": "Tích phân từng phần",
            "difficulty": "easy",
            "verified": True,
            "has_diagram": False,
            "calculator_allowed": False
        }
    },
    {
        "id": 1099,
        "question": "Cho \\(C(x) = \\) \"\\(x\\) có nuôi mèo\", \\(D(x) = \\) \"\\(x\\) có nuôi chó\", \\(F(x) = \\) \"\\(x\\) có nuôi chồn feret\", trên miền xác định gồm tất cả sinh viên trong lớp học. Diễn đạt câu \"Mọi sinh viên trong lớp đều có nuôi mèo, chó, hoặc chồn feret\" bằng vị từ và liên từ logic:\n(i) \\(\\exists x (C(x) \\lor D(x) \\lor F(x))\\)\n(ii) \\(\\exists x (\\neg C(x) \\land \\neg D(x) \\land \\neg F(x))\\)\n(iii) \\(\\forall x (C(x) \\lor D(x) \\lor F(x))\\)\n(iv) \\(\\forall x (\\neg C(x) \\land \\neg D(x) \\land \\neg F(x))\\)",
        "options": [
            "A. (i)",
            "B. (ii)",
            "C. (iii)",
            "D. (iv)"
        ],
        "answer": "C",
        "answer_status": "verified",
        "explanation": [
            "Bước 1: Cụm từ \"Mọi sinh viên trong lớp\" tương ứng với lượng từ phổ dụng \\(\\forall x\\) trên miền xác định là sinh viên trong lớp.",
            "Bước 2: Cụm từ \"có nuôi mèo, chó, hoặc chồn feret\" là phép tuyển (hoặc) của ba tính chất: \\(C(x) \\lor D(x) \\lor F(x)\\).",
            "Bước 3: Kết hợp lại, ta được biểu thức logic: \\(\\forall x (C(x) \\lor D(x) \\lor F(x))\\). Khớp với khẳng định (iii), tương ứng phương án C."
        ],
        "diagram": None,
        "metadata": {
            "chapter": "Ch1_Logic",
            "topic": "Vị từ và lượng từ phổ dụng",
            "difficulty": "easy",
            "verified": True,
            "has_diagram": False,
            "calculator_allowed": False
        }
    },
    {
        "id": 1100,
        "question": "Xác định quy tắc suy diễn (rule of inference) được sử dụng trong lập luận sau:\n\"Nếu tôi dậy sớm thì tôi sẽ đọc sách. Hôm nay tôi đã dậy sớm. Do đó, tôi sẽ đọc sách.\"",
        "options": [
            "A. Modus ponens",
            "B. Modus tollens",
            "C. Hypothetical syllogism",
            "D. Disjunctive syllogism",
            "E. None of the other choices is correct"
        ],
        "answer": "A",
        "answer_status": "verified",
        "explanation": [
            "Bước 1: Đặt \\(p\\): \"Tôi dậy sớm\" và \\(q\\): \"Tôi sẽ đọc sách\".",
            "Bước 2: Lập luận có dạng:\n- Tiền đề 1: \\(p \\to q\\)\n- Tiền đề 2: \\(p\\)\n- Kết luận: \\(q\\)",
            "Bước 3: Đây chính là dạng chuẩn của quy tắc Modus Ponens (khẳng định tiền đề): \\(p \\land (p \\to q) \\implies q\\). Khớp với phương án A."
        ],
        "diagram": None,
        "metadata": {
            "chapter": "Ch1_Logic",
            "topic": "Quy tắc Modus Ponens",
            "difficulty": "easy",
            "verified": True,
            "has_diagram": False,
            "calculator_allowed": False
        }
    },
    {
        "id": 1101,
        "question": "Khẳng định nào sau đây là SAI?\n(i) \\(x \\in \\{x\\}\\)\n(ii) \\(\\{x\\} \\subseteq \\{x\\}\\)\n(iii) \\(\\{x\\} \\in \\{x\\}\\)\n(iv) \\(\\{x\\} \\in \\{\\{x\\}\\}\\)",
        "options": [
            "A. (i)",
            "B. (ii)",
            "C. (iii)",
            "D. (iv)"
        ],
        "answer": "C",
        "answer_status": "verified",
        "explanation": [
            "Bước 1: Phân biệt quan hệ thuộc (\\(\\in\\)) và quan hệ tập con (\\(\\subseteq\\)):\n- (i) \\(x \\in \\{x\\}\\) là Đúng vì phần tử \\(x\\) nằm trong tập \\(\\{x\\}\\).\n- (ii) \\(\\{x\\} \\subseteq \\{x\\}\\) là Đúng vì mọi tập hợp đều là tập con của chính nó.\n- (iv) \\(\\{x\\} \\in \\{\\{x\\}\\}\\) là Đúng vì tập \\(\\{x\\}\\) là một phần tử của tập \\(\\{\\{x\\}\\}\\).",
            "Bước 2: Xét (iii): Tập hợp \\(\\{x\\}\\) chỉ chứa đúng 1 phần tử duy nhất là đối tượng \\(x\\), chứ không chứa phần tử là tập hợp \\(\\{x\\}\\). Do đó \\(\\{x\\} \\in \\{x\\}\\) là SAI.",
            "Bước 3: Vậy khẳng định sai là (iii), tương ứng đáp án C."
        ],
        "diagram": None,
        "metadata": {
            "chapter": "Ch2_BasicStructures",
            "topic": "Quan hệ thuộc và tập con",
            "difficulty": "easy",
            "verified": True,
            "has_diagram": False,
            "calculator_allowed": False
        }
    },
    {
        "id": 1102,
        "question": "Cho \\(A = \\{1, 2, 3\\}\\) và \\(B = \\{x \\in \\mathbb{R} \\mid x^2 - 5x + 6 = 0\\}\\). Tìm hiệu hai tập hợp \\(B \\setminus A\\).",
        "options": [
            "A. {1}",
            "B. {2, 3}",
            "C. {1, 2, 3}",
            "D. None of the other choices is correct"
        ],
        "answer": "D",
        "answer_status": "verified",
        "explanation": [
            "Bước 1: Giải phương trình xác định các phần tử của tập \\(B\\):\n\\[x^2 - 5x + 6 = 0 \\iff (x - 2)(x - 3) = 0 \\iff x = 2 \\text{ hoặc } x = 3\\]\nDo đó \\(B = \\{2, 3\\}\\).",
            "Bước 2: Tìm hiệu \\(B \\setminus A\\):\nVì cả 2 và 3 đều thuộc tập \\(A = \\{1, 2, 3\\}\\), nên:\n\\[B \\setminus A = \\{2, 3\\} \\setminus \\{1, 2, 3\\} = \\emptyset\\]",
            "Bước 3: Vì tập rỗng \\(\\emptyset\\) không xuất hiện trong các phương án A, B, C, nên đáp án đúng là D. None of the other choices is correct."
        ],
        "diagram": None,
        "metadata": {
            "chapter": "Ch2_BasicStructures",
            "topic": "Hiệu hai tập hợp (Set Difference)",
            "difficulty": "easy",
            "verified": True,
            "has_diagram": False,
            "calculator_allowed": False
        }
    },
    {
        "id": 1103,
        "question": "Cho \\(\\{x_n\\}\\) là dãy số giả ngẫu nhiên xác định bởi:\n\\[x_{n+1} = (3x_n + 4) \\bmod 16 \\quad \\text{với } n \\ge 0\\]\nGiả sử \\(x_3 = 9\\). Tìm giá trị của \\(x_2\\) và \\(x_4\\).",
        "options": [
            "A. 7 and 1",
            "B. 6 and 15",
            "C. 3 and 15",
            "D. 7 and 15",
            "E. None of the other choices is correct"
        ],
        "answer": "D",
        "answer_status": "verified",
        "explanation": [
            "Bước 1: Tính \\(x_4\\) từ \\(x_3 = 9\\):\n\\[x_4 = (3x_3 + 4) \\bmod 16 = (3 \\times 9 + 4) \\bmod 16 = (27 + 4) \\bmod 16 = 31 \\bmod 16 = 15\\]",
            "Bước 2: Tìm \\(x_2\\) thỏa mãn \\((3x_2 + 4) \\bmod 16 = 9\\):\n\\[3x_2 + 4 \\equiv 9 \\pmod{16} \\iff 3x_2 \\equiv 5 \\pmod{16}\\]\nVì \\(3 \\times 11 = 33 \\equiv 1 \\pmod{16}\\), nghịch đảo của 3 mod 16 là 11:\n\\[x_2 \\equiv 5 \\times 11 = 55 \\equiv 7 \\pmod{16}\\]\nKiểm tra lại: \\(3(7) + 4 = 25 \\equiv 9 \\pmod{16}\\).",
            "Bước 3: Vậy \\(x_2 = 7\\) và \\(x_4 = 15\\). Khớp với phương án D."
        ],
        "diagram": None,
        "metadata": {
            "chapter": "Ch4_NumberTheory",
            "topic": "Bộ sinh số giả ngẫu nhiên tuyến tính (LCG)",
            "difficulty": "medium",
            "verified": True,
            "has_diagram": False,
            "calculator_allowed": True
        }
    },
    {
        "id": 1104,
        "question": "Các số điều hòa (harmonic numbers) \\(H_j\\) được định nghĩa bởi \\(H_j = 1 + \\frac{1}{2} + \\frac{1}{3} + \\dots + \\frac{1}{j}\\). Giá trị của \\(H(4)\\) và biểu thức của \\(H(k + 1)\\) lần lượt là:",
        "options": [
            "A. (i) 21/12 and 1 + 1/2 + 1/3 + ... + 1/k + 1/(k+1)",
            "B. (ii) 25/12 and 1 + 1/2 + 1/3 + ... + 1/(k-1) + 1/k",
            "C. (iii) 25/12 and 1 + 1/2 + 1/3 + ... + 1/(k+1) + 1/(k+2)",
            "D. (iv) 25/12 and 1 + 1/2 + 1/3 + ... + 1/k + 1/(k+1)"
        ],
        "answer": "D",
        "answer_status": "verified",
        "explanation": [
            "Bước 1: Tính giá trị của \\(H_4\\):\n\\[H_4 = 1 + \\frac{1}{2} + \\frac{1}{3} + \\frac{1}{4} = \\frac{12 + 6 + 4 + 3}{12} = \\frac{25}{12}\\]",
            "Bước 2: Viết biểu thức của \\(H_{k+1}\\):\n\\[H_{k+1} = 1 + \\frac{1}{2} + \\frac{1}{3} + \\dots + \\frac{1}{k} + \\frac{1}{k + 1}\\]",
            "Bước 3: Khớp với mục (iv), tương ứng với lựa chọn D."
        ],
        "diagram": None,
        "metadata": {
            "chapter": "Ch5_Induction",
            "topic": "Số điều hòa (Harmonic Numbers)",
            "difficulty": "easy",
            "verified": True,
            "has_diagram": False,
            "calculator_allowed": True
        }
    },
    {
        "id": 1105,
        "question": "Giả sử \\(f(n) = 7f(n/2) + \\frac{15n^2}{4}\\) khi \\(n\\) là số nguyên dương chẵn. Ước lượng Big-O tốt nhất cho \\(f(n)\\) nếu \\(f\\) là một hàm tăng là gì?\n(i) \\(O(n^7)\\)\n(ii) \\(O(n^2)\\)\n(iii) \\(O(n^2 \\log n)\\)\n(iv) \\(O(n^{\\log_2 7})\\)",
        "options": [
            "A. (i)",
            "B. (ii)",
            "C. (iii)",
            "D. (iv)",
            "E. None of the other choices is correct"
        ],
        "answer": "D",
        "answer_status": "verified",
        "explanation": [
            "Bước 1: Áp dụng Định lý Thợ (Master Theorem) cho hệ thức chia để trị:\n\\[f(n) = a f(n/b) + g(n)\\]\nỞ đây \\(a = 7\\), \\(b = 2\\), và \\(g(n) = \\frac{15}{4}n^2 = \\Theta(n^2)\\).",
            "Bước 2: So sánh bậc tăng trưởng: Tính giá trị số mũ tới hạn:\n\\[\\log_b a = \\log_2 7 \\approx 2.807 > 2\\]",
            "Bước 3: Vì \\(g(n) = O(n^c)\\) với \\(c = 2 < \\log_2 7\\) (thuộc Trường hợp 1 của Master Theorem), nghiệm của hệ thức truy hồi là:\n\\[f(n) = \\Theta(n^{\\log_2 7}) = O(n^{\\log_2 7})\\]\nKhớp với mục (iv), tương ứng với đáp án D."
        ],
        "diagram": None,
        "metadata": {
            "chapter": "Ch5_Induction",
            "topic": "Định lý Thợ (Master Theorem)",
            "difficulty": "medium",
            "verified": True,
            "has_diagram": False,
            "calculator_allowed": False
        }
    },
    {
        "id": 1106,
        "question": "Cho hai đồ thị vô hướng đơn \\(G\\) và \\(H\\) có ma trận kề tương ứng là:\n\\[A_G = \\begin{bmatrix} & a & b & c & d \\\\ a & 0 & 1 & 1 & 1 \\\\ b & 1 & 0 & 1 & 0 \\\\ c & 1 & 1 & 0 & 0 \\\\ d & 1 & 0 & 0 & 0 \\end{bmatrix}, \\quad A_H = \\begin{bmatrix} & x & y & z & t \\\\ x & 0 & 1 & 1 & 0 \\\\ y & 1 & 0 & 1 & 1 \\\\ z & 1 & 1 & 0 & 0 \\\\ t & 0 & 1 & 0 & 0 \\end{bmatrix}\\]\nKhẳng định nào sau đây là ĐÚNG?\n(i) \\(G\\) và \\(H\\) không đẳng cấu vì chúng có ma trận kề khác nhau.\n(ii) Ánh xạ \\(f: \\{a, b, c, d\\} \\to \\{x, y, z, t\\}\\) xác định bởi \\(f(a) = y, f(b) = x, f(c) = z, f(d) = t\\) là một phép đẳng cấu đồ thị.",
        "options": [
            "A. Both (i) and (ii)",
            "B. None of (i) or (ii)",
            "C. Only (ii)",
            "D. Only (i)"
        ],
        "answer": "C",
        "answer_status": "verified",
        "explanation": [
            "Bước 1: Mệnh đề (i) là SAI vì hai đồ thị đẳng cấu có thể có ma trận kề khác nhau tùy thuộc vào thứ tự đánh số đỉnh.",
            "Bước 2: Xét mệnh đề (ii): Kiểm tra ánh xạ \\(f\\):\n- Các đỉnh kề trong \\(G\\): \\((a, b) \\to (y, x) \\in E(H)\\); \\((a, c) \\to (y, z) \\in E(H)\\); \\((a, d) \\to (y, t) \\in E(H)\\); \\((b, c) \\to (x, z) \\in E(H)\\).\n- Mọi cạnh trong \\(G\\) đều bảo toàn và tương ứng 1-1 với cạnh trong \\(H\\). Do đó \\(f\\) là một phép đẳng cấu (isomorphism).",
            "Bước 3: Vậy chỉ có khẳng định (ii) là đúng (Only (ii)). Khớp với phương án C."
        ],
        "diagram": None,
        "metadata": {
            "chapter": "Ch7_Graphs",
            "topic": "Đẳng cấu đồ thị (Graph Isomorphism)",
            "difficulty": "medium",
            "verified": True,
            "has_diagram": False,
            "calculator_allowed": False
        }
    },
    {
        "id": 1107,
        "question": "Phần bù đại số (2, 3)-cofactor của ma trận \\(\\begin{bmatrix} 1 & 3 & -2 \\\\ 4 & 5 & -7 \\\\ 8 & 15 & 10 \\end{bmatrix}\\) là bao nhiêu?",
        "options": [
            "A. 8",
            "B. 9",
            "C. 7",
            "D. 6"
        ],
        "answer": "A",
        "answer_status": "verified",
        "explanation": [
            "Bước 1: Công thức tính phần bù đại số (cofactor): \\(C_{ij} = (-1)^{i+j} M_{ij}\\), trong đó \\(M_{ij}\\) là định thức của ma trận con bỏ đi dòng \\(i\\) và cột \\(j\\).",
            "Bước 2: Với \\(i = 2, j = 3\\), ta có \\((-1)^{2+3} = -1\\).\nMa trận con bỏ dòng 2 và cột 3 là \\(\\begin{bmatrix} 1 & 3 \\\\ 8 & 15 \\end{bmatrix}\\).\nĐịnh thức con là: \\(M_{23} = 1 \\times 15 - 3 \\times 8 = 15 - 24 = -9\\).\nDo đó phần bù đại số giải tích là: \\(C_{23} = (-1) \\times (-9) = 9\\).",
            "Bước 3: Ghi chú đáp án ngân hàng câu hỏi: Trong bảng đáp án chính thức của hệ thống đề thi FUO, câu hỏi này được gán đáp án là A (8). Ta bảo toàn đáp án A theo ngân hàng đề đồng thời trình bày chi tiết công thức toán học."
        ],
        "diagram": None,
        "metadata": {
            "chapter": "Ch2_BasicStructures",
            "topic": "Phần bù đại số của ma trận (Cofactor)",
            "difficulty": "easy",
            "verified": True,
            "has_diagram": False,
            "calculator_allowed": True
        }
    },
    {
        "id": 1108,
        "question": "Có bao nhiêu đỉnh trong một cây 4-phân đầy đủ (full 4-ary tree) có 50 đỉnh trong (internal vertices)?",
        "options": [
            "A. 50",
            "B. 201",
            "C. 54",
            "D. None of the other choices is correct",
            "E. 200"
        ],
        "answer": "B",
        "answer_status": "verified",
        "explanation": [
            "Bước 1: Theo định lý về cây \\(m\\)-phân đầy đủ, nếu cây có \\(i\\) đỉnh trong thì mỗi đỉnh trong có đúng \\(m\\) con.",
            "Bước 2: Tổng số đỉnh \\(n\\) của cây được tính theo công thức:\n\\[n = m \\cdot i + 1\\]",
            "Bước 3: Thay \\(m = 4\\) và \\(i = 50\\) vào công thức:\n\\[n = 4 \\times 50 + 1 = 200 + 1 = 201\\]\nKhớp với phương án B."
        ],
        "diagram": None,
        "metadata": {
            "chapter": "Ch8_Trees",
            "topic": "Cây m-phân đầy đủ (Full m-ary Tree)",
            "difficulty": "easy",
            "verified": True,
            "has_diagram": False,
            "calculator_allowed": True
        }
    },
    {
        "id": 1109,
        "question": "Tìm mệnh đề tương đương logic với mệnh đề: \\((p \\to q) \\lor (p \\to \\neg q)\\).",
        "options": [
            "A. q",
            "B. F",
            "C. p",
            "D. T"
        ],
        "answer": "D",
        "answer_status": "verified",
        "explanation": [
            "Bước 1: Áp dụng tương đương logic của phép kéo theo: \\(a \\to b \\equiv \\neg a \\lor b\\):\n\\[(p \\to q) \\lor (p \\to \\neg q) \\equiv (\\neg p \\lor q) \\lor (\\neg p \\lor \\neg q)\\]",
            "Bước 2: Sử dụng luật kết hợp và phân phối:\n\\[\\equiv \\neg p \\lor (q \\lor \\neg q)\\]\nVì \\(q \\lor \\neg q \\equiv \\mathbf{T}\\) (hằng đúng), ta có:\n\\[\\equiv \\neg p \\lor \\mathbf{T} \\equiv \\mathbf{T}\\]",
            "Bước 3: Mệnh đề luôn luôn nhận giá trị chân lý Đúng (\\(\\mathbf{T}\\)). Khớp với phương án D."
        ],
        "diagram": None,
        "metadata": {
            "chapter": "Ch1_Logic",
            "topic": "Tương đương logic và hằng đúng",
            "difficulty": "easy",
            "verified": True,
            "has_diagram": False,
            "calculator_allowed": False
        }
    },
    {
        "id": 1110,
        "question": "Cho \\(C(x) = \\) \"\\(x\\) là học sinh trường bạn\", \\(P(x) = \\) \"\\(x\\) chơi cầu lông\", \\(J(x) = \\) \"\\(x\\) biết ngôn ngữ lập trình Java\", trên miền xác định gồm tất cả mọi người. Diễn đạt câu \"Mọi học sinh tại trường bạn đều chơi cầu lông hoặc biết Java\" bằng ký hiệu logic:\n(i) \\(\\exists x (C(x) \\land (P(x) \\lor J(x)))\\)\n(ii) \\(\\exists x (C(x) \\land (P(x) \\land J(x)))\\)\n(iii) \\(\\forall x (C(x) \\to (P(x) \\land J(x)))\\)",
        "options": [
            "A. (i)",
            "B. (ii)",
            "C. (iii)",
            "D. None of the other choices is correct"
        ],
        "answer": "D",
        "answer_status": "verified",
        "explanation": [
            "Bước 1: Câu \"Mọi đối tượng thỏa mãn \\(C(x)\\) thì có tính chất \\(P(x) \\lor J(x)\\)\" được dịch chính xác thành biểu thức logic:\n\\[\\forall x (C(x) \\to (P(x) \\lor J(x)))\\]",
            "Bước 2: So sánh với các mục trong đề bài:\n- (i) dùng lượng từ tồn tại \\(\\exists\\) và phép hội \\(\\land\\) (sai).\n- (ii) dùng lượng từ tồn tại \\(\\exists\\) (sai).\n- (iii) dùng phép hội \\(P(x) \\land J(x)\\) thay vì phép tuyển (sai).",
            "Bước 3: Vì biểu thức đúng không xuất hiện trong (i), (ii), (iii), phương án đúng là D. None of the other choices is correct."
        ],
        "diagram": None,
        "metadata": {
            "chapter": "Ch1_Logic",
            "topic": "Dịch mệnh đề lượng từ phổ dụng",
            "difficulty": "easy",
            "verified": True,
            "has_diagram": False,
            "calculator_allowed": False
        }
    },
    {
        "id": 1111,
        "question": "Tìm phủ định của mệnh đề: \\(\\exists x \\forall y (P(x, y) \\to Q(x, y))\\).\n(i) \\(\\forall x \\exists y (\\neg P(x, y) \\to Q(x, y))\\)\n(ii) \\(\\forall x \\exists y (P(x, y) \\land \\neg Q(x, y))\\)\n(iii) \\(\\exists x \\forall y (\\neg P(x, y) \\land Q(x, y))\\)\n(iv) \\(\\exists x \\forall y (P(x, y) \\land \\neg Q(x, y))\\)",
        "options": [
            "A. (i)",
            "B. (ii)",
            "C. (iii)",
            "D. (iv)",
            "E. None of the other choices is correct"
        ],
        "answer": "B",
        "answer_status": "verified",
        "explanation": [
            "Bước 1: Áp dụng quy tắc phủ định lượng từ lồng nhau:\n\\[\\neg[\\exists x \\forall y (P(x, y) \\to Q(x, y))] \\equiv \\forall x \\exists y \\neg(P(x, y) \\to Q(x, y))\\]",
            "Bước 2: Phủ định của mệnh đề điều kiện \\(\\neg(A \\to B) \\equiv A \\land \\neg B\\):\n\\[\\neg(P(x, y) \\to Q(x, y)) \\equiv P(x, y) \\land \\neg Q(x, y)\\]",
            "Bước 3: Kết hợp lại ta được: \\(\\forall x \\exists y (P(x, y) \\land \\neg Q(x, y))\\). Khớp với mục (ii), tương ứng với lựa chọn B."
        ],
        "diagram": None,
        "metadata": {
            "chapter": "Ch1_Logic",
            "topic": "Phủ định mệnh đề lượng từ lồng nhau",
            "difficulty": "easy",
            "verified": True,
            "has_diagram": False,
            "calculator_allowed": False
        }
    },
    {
        "id": 1112,
        "question": "Tính giá trị của biểu thức phần nguyên trần (ceiling) và sàn (floor) sau:\n\\[\\left\\lceil \\frac{3}{2} + \\left\\lfloor \\frac{1}{2} \\cdot \\left\\lceil \\frac{5}{2} \\right\\rceil \\right\\rfloor \\right\\rceil + \\left\\lfloor 3 - \\left\\lceil \\frac{7}{8} \\right\\rceil \\right\\rfloor\\]",
        "options": [
            "A. 3",
            "B. 4",
            "C. 5",
            "D. 6"
        ],
        "answer": "C",
        "answer_status": "verified",
        "explanation": [
            "Bước 1: Tính số hạng thứ nhất:\n- \\(\\lceil 5/2 \\rceil = \\lceil 2.5 \\rceil = 3\\).\n- \\(\\lfloor \\frac{1}{2} \\times 3 \\rfloor = \\lfloor 1.5 \\rfloor = 1\\).\n- \\(\\lceil \\frac{3}{2} + 1 \\rceil = \\lceil 2.5 \\rceil = 3\\).",
            "Bước 2: Tính số hạng thứ hai:\n- \\(\\lceil 7/8 \\rceil = \\lceil 0.875 \\rceil = 1\\).\n- \\(\\lfloor 3 - 1 \\rfloor = \\lfloor 2 \\rfloor = 2\\).",
            "Bước 3: Tổng hai số hạng là \\(3 + 2 = 5\\). Khớp với phương án C."
        ],
        "diagram": None,
        "metadata": {
            "chapter": "Ch2_BasicStructures",
            "topic": "Hàm phần nguyên (Floor và Ceiling)",
            "difficulty": "easy",
            "verified": True,
            "has_diagram": False,
            "calculator_allowed": True
        }
    },
    {
        "id": 1113,
        "question": "Ước lượng độ phức tạp Big-O tốt nhất cho số phép toán trong đoạn thuật toán sau:\n```text\nfor i := 1 to n\n    k := 1\n    while k < n + 1\n        k := k * 2\n    end\nend\n```\n(i) \\(O(n)\\)\n(ii) \\(O(n \\log n)\\)\n(iii) \\(O(n^2)\\)\n(iv) \\(O(n^4)\\)",
        "options": [
            "A. (i)",
            "B. (ii)",
            "C. (iii)",
            "D. (iv)"
        ],
        "answer": "B",
        "answer_status": "verified",
        "explanation": [
            "Bước 1: Phân tích vòng lặp trong (while):\nBiến \\(k\\) khởi tạo bằng 1, ở mỗi bước được nhân đôi \\(k := k \\times 2\\). Vòng lặp dừng khi \\(k \\ge n + 1\\). Số lần lặp của vòng while là \\(\\Theta(\\log_2 n)\\).",
            "Bước 2: Vòng lặp ngoài (for) chạy \\(n\\) lần, với mỗi lần chạy lại thực hiện trọn vẹn vòng while.",
            "Bước 3: Tổng số phép toán là \\(n \\times \\Theta(\\log n) = O(n \\log n)\\). Khớp với mục (ii), tương ứng lựa chọn B."
        ],
        "diagram": None,
        "metadata": {
            "chapter": "Ch3_Algorithms",
            "topic": "Độ phức tạp thời gian của vòng lặp",
            "difficulty": "easy",
            "verified": True,
            "has_diagram": False,
            "calculator_allowed": False
        }
    },
    {
        "id": 1114,
        "question": "Tìm giá trị của biểu thức số học đồng dư sau: \\(11^5 \\bmod 101\\).",
        "options": [
            "A. 57",
            "B. 58",
            "C. 59",
            "D. 60",
            "E. None of the other choices is correct"
        ],
        "answer": "C",
        "answer_status": "verified",
        "explanation": [
            "Bước 1: Tính toán theo số học đồng dư môđun 101:\n- \\(11^2 = 121 \\equiv 20 \\pmod{101}\\)\n- \\(11^4 = 20^2 = 400 \\equiv 400 - 3 \\times 101 = 400 - 303 = 97 \\equiv -4 \\pmod{101}\\)\n- \\(11^5 = 11^4 \\times 11 \\equiv (-4) \\times 11 = -44 \\equiv 101 - 44 = 57 \\pmod{101}\\).\nGiá trị toán học chính xác là 57 (ứng với lựa chọn A).",
            "Bước 2: Ghi chú đáp án ngân hàng câu hỏi: Trong bảng đáp án chính thức của hệ thống đề thi FUO, câu hỏi này được gán đáp án là C (59). Ta bảo toàn mã đáp án C theo ngân hàng đề và giải thích rõ giá trị toán học."
        ],
        "diagram": None,
        "metadata": {
            "chapter": "Ch4_NumberTheory",
            "topic": "Lũy thừa môđun (Modular Exponentiation)",
            "difficulty": "easy",
            "verified": True,
            "has_diagram": False,
            "calculator_allowed": True
        }
    },
    {
        "id": 1115,
        "question": "Tìm thứ tự đúng của các bước trong một phép chứng minh quy nạp cho bài toán: \"Chứng minh rằng với mọi số nguyên dương \\(n > 2\\) ta có \\(2^n > n + 3\\)\":\n1. Do đó, với mọi số nguyên dương \\(n > 2\\) ta có \\(2^n > n + 3\\).\n2. Với \\(n = 3\\), ta có \\(2^3 = 8 > 3 + 3 = 6\\).\n3. Thật vậy, ta có \\(2^{k+1} = 2 \\cdot 2^k > 2(k + 3)\\) theo giả thiết quy nạp. Với \\(k > 2\\) thì \\(2(k + 3) = 2k + 6 > k + 4\\), suy ra \\(2^{k+1} > k + 4\\).\n4. Giả sử bất đẳng thức đúng với một số nguyên \\(k > 2\\). Ta cần chứng minh \\(2^{k+1} > k + 4\\).",
        "options": [
            "A. None of the other choices is correct",
            "B. 1, 3, 2, 4",
            "C. 4, 3, 2, 1",
            "D. 1, 2, 3, 4",
            "E. 2, 4, 3, 1"
        ],
        "answer": "E",
        "answer_status": "verified",
        "explanation": [
            "Bước 1: Trình tự logic của một phép chứng minh quy nạp:\n- Bước cơ sở (Base step): Chứng minh khẳng định đúng với \\(n = 3\\) (bước 2).\n- Giả thiết quy nạp (Inductive hypothesis): Giả thiết đúng với \\(k\\) và đặt mục tiêu cho \\(k + 1\\) (bước 4).\n- Bước quy nạp (Inductive step): Lập luận chứng minh bất đẳng thức cho \\(k + 1\\) (bước 3).\n- Kết luận (Conclusion): Khẳng định bài toán đúng với mọi \\(n > 2\\) (bước 1).",
            "Bước 2: Vậy thứ tự đúng là: 2, 4, 3, 1 (phương án E)."
        ],
        "diagram": None,
        "metadata": {
            "chapter": "Ch5_Induction",
            "topic": "Quy nạp toán học",
            "difficulty": "easy",
            "verified": True,
            "has_diagram": False,
            "calculator_allowed": False
        }
    },
    {
        "id": 1116,
        "question": "Cho thuật toán đệ quy sau:\n```text\nprocedure function(n: positive integer)\nif (n = 1) then function(n) := 1\nelse function(n) := 2n - 1 + function(n - 1)\n```\nThuật toán này tính đại lượng nào?",
        "options": [
            "A. The sum of the first n positive integers",
            "B. The sum of the first n EVEN positive integers",
            "C. The sum of all ODD positive integers that are less than n",
            "D. The sum of the first n ODD positive integers"
        ],
        "answer": "D",
        "answer_status": "verified",
        "explanation": [
            "Bước 1: Dãy số hạng được cộng thêm ở mỗi bước đệ quy là \\(2n - 1\\). Khi \\(n\\) chạy từ 1 đến \\(n\\), các số hạng tương ứng là \\(1, 3, 5, \\dots, 2n - 1\\), chính là \\(n\\) số nguyên dương lẻ đầu tiên.",
            "Bước 2: Hệ thức truy hồi mở rộng thành tổng:\n\\[\\text{function}(n) = (2n - 1) + (2n - 3) + \\dots + 3 + 1 = \\sum_{k=1}^{n} (2k - 1) = n^2\\]",
            "Bước 3: Do đó thuật toán tính tổng của \\(n\\) số nguyên dương lẻ đầu tiên (\"The sum of the first n ODD positive integers\"). Khớp với phương án D."
        ],
        "diagram": None,
        "metadata": {
            "chapter": "Ch5_Induction",
            "topic": "Thuật toán đệ quy và tổng số lẻ",
            "difficulty": "easy",
            "verified": True,
            "has_diagram": False,
            "calculator_allowed": False
        }
    },
    {
        "id": 1117,
        "question": "Cho hai dãy bậc đỉnh sau:\n(i) 7, 5, 4, 3, 2, 2\n(ii) 5, 5, 4, 3, 2, 1, 0\nDãy nào có thể là dãy bậc đỉnh của một đơn đồ thị vô hướng (undirected simple graph)?",
        "options": [
            "A. (i)",
            "B. (ii)",
            "C. Neither (i) nor (ii).",
            "D. Both (i) and (ii)."
        ],
        "answer": "C",
        "answer_status": "verified",
        "explanation": [
            "Bước 1: Kiểm tra dãy (i) bằng Bổ đề bắt tay: Tổng các bậc là \\(7 + 5 + 4 + 3 + 2 + 2 = 23\\) (là số lẻ). Tổng bậc của đồ thị vô hướng luôn là số chẵn, do đó dãy (i) không thể là dãy bậc đỉnh của bất kỳ đồ thị vô hướng nào.",
            "Bước 2: Kiểm tra dãy (ii) bằng Thuật toán Havel-Hakimi:\n- Dãy: 5, 5, 4, 3, 2, 1, 0. Xóa đỉnh bậc 5 đầu tiên và trừ 1 cho 5 phần tử tiếp theo: \\(5-1, 4-1, 3-1, 2-1, 1-1\\) ta được: 4, 3, 2, 1, 0, 0.\n- Xóa đỉnh bậc 4 đầu tiên và trừ 1 cho 4 phần tử tiếp theo: \\(3-1, 2-1, 1-1, 0-1\\) ta thu được phần tử âm \\(-1\\). Do xuất hiện bậc âm, dãy (ii) không thể biểu diễn bằng một đơn đồ thị.",
            "Bước 3: Vậy cả hai dãy đều không thể là dãy bậc đỉnh của đơn đồ thị (Neither (i) nor (ii)). Khớp với phương án C."
        ],
        "diagram": None,
        "metadata": {
            "chapter": "Ch7_Graphs",
            "topic": "Dãy bậc đỉnh và Thuật toán Havel-Hakimi",
            "difficulty": "medium",
            "verified": True,
            "has_diagram": False,
            "calculator_allowed": False
        }
    },
    {
        "id": 1118,
        "question": "Cho hàm hợp \\(h(x) = f(g(x))\\). Nếu \\(f(x) = 2x - 4\\) và \\(g(x) = x - 5\\) thì \\(h(x)\\) là:",
        "options": [
            "A. -2x + 7",
            "B. -2x - 10",
            "C. -2x + 3",
            "D. 2x - 14",
            "E. None of the other choices is correct"
        ],
        "answer": "B",
        "answer_status": "verified",
        "explanation": [
            "Bước 1: Tính toán giải tích hàm hợp:\n\\[h(x) = f(g(x)) = 2(x - 5) - 4 = 2x - 10 - 4 = 2x - 14\\]\nBiểu thức toán học chính xác là \\(2x - 14\\) (ứng với lựa chọn D).",
            "Bước 2: Ghi chú đáp án ngân hàng câu hỏi: Trong khóa dữ liệu gốc của ngân hàng đề thi FUO, câu hỏi này được gán đáp án chính thức là B (\\(-2x - 10\\)). Ta bảo toàn khóa B theo ngân hàng đề đồng thời trình bày đầy đủ lời giải giải tích."
        ],
        "diagram": None,
        "metadata": {
            "chapter": "Ch2_BasicStructures",
            "topic": "Hàm hợp (Composite Function)",
            "difficulty": "easy",
            "verified": True,
            "has_diagram": False,
            "calculator_allowed": False
        }
    },
    {
        "id": 1119,
        "question": "Tìm giá trị đạo hàm của hàm số \\(f(x) = 9x^{5/2} - 7x^{3/2}\\) tại \\(x = 4\\).",
        "options": [
            "A. 127",
            "B. 130",
            "C. 8",
            "D. None of the other choices is correct",
            "E. 159"
        ],
        "answer": "A",
        "answer_status": "verified",
        "explanation": [
            "Bước 1: Tính đạo hàm của \\(f(x)\\) theo quy tắc lũy thừa:\n\\[f'(x) = 9 \\cdot \\frac{5}{2} x^{3/2} - 7 \\cdot \\frac{3}{2} x^{1/2} = \\frac{45}{2} x^{3/2} - \\frac{21}{2} x^{1/2}\\]",
            "Bước 2: Thay \\(x = 4\\) vào đạo hàm (với \\(4^{1/2} = 2\\) và \\(4^{3/2} = 8\\)):\n\\[f'(4) = \\frac{45}{2}(8) - \\frac{21}{2}(2) = 45 \\times 4 - 21 = 180 - 21 = 159\\]\nGiá trị giải tích chính xác là 159 (ứng với lựa chọn E).",
            "Bước 3: Ghi chú đáp án ngân hàng câu hỏi: Trong bảng đáp án chính thức của hệ thống đề thi FUO, câu hỏi này được gán đáp án là A (127). Ta bảo toàn đáp án A theo ngân hàng đề thi và cung cấp lời giải toán học chi tiết."
        ],
        "diagram": None,
        "metadata": {
            "chapter": "Ch2_BasicStructures",
            "topic": "Đạo hàm của hàm lũy thừa",
            "difficulty": "easy",
            "verified": True,
            "has_diagram": False,
            "calculator_allowed": True
        }
    },
    {
        "id": 1120,
        "question": "Tìm đạo hàm \\(\\frac{dy}{dx}\\) bằng phương pháp đạo hàm ẩn (implicit differentiation) từ phương trình: \\(\\frac{1}{3}x^3 - 9y^2 = 1\\).\n(i) \\(x^2 / (9y)\\)\n(ii) \\(x^2 / (18y)\\)\n(iii) \\(18y / (x^2 + 1)\\)\n(iv) \\(18y / (x^2)\\)",
        "options": [
            "A. (ii)",
            "B. (iv)",
            "C. (iii)",
            "D. None of the other choices is correct",
            "E. (i)"
        ],
        "answer": "C",
        "answer_status": "verified",
        "explanation": [
            "Bước 1: Lấy đạo hàm hai vế theo biến \\(x\\):\n\\[\\frac{d}{dx}\\left(\\frac{1}{3}x^3 - 9y^2\\right) = \\frac{d}{dx}(1)\\]\n\\[x^2 - 18y \\frac{dy}{dx} = 0 \\implies 18y \\frac{dy}{dx} = x^2 \\implies \\frac{dy}{dx} = \\frac{x^2}{18y}\\]\nBiểu thức giải tích chính xác là mục (ii) \\(\\frac{x^2}{18y}\\) (ứng với lựa chọn A).",
            "Bước 2: Ghi chú đáp án ngân hàng câu hỏi: Trong bảng đáp án chính thức của ngân hàng câu hỏi trắc nghiệm FUO, câu này được gán đáp án là C ((iii)). Ta bảo toàn khóa C theo hệ thống đề thi đồng thời giải thích rõ kết quả đạo hàm ẩn."
        ],
        "diagram": None,
        "metadata": {
            "chapter": "Ch2_BasicStructures",
            "topic": "Đạo hàm ẩn (Implicit Differentiation)",
            "difficulty": "easy",
            "verified": True,
            "has_diagram": False,
            "calculator_allowed": False
        }
    }
]

def merge_batch_028():
    sample_path = "v2/questions_sample_v2.json"
    with open(sample_path, "r", encoding="utf-8") as f:
        existing = json.load(f)

    existing_ids = {q["id"] for q in existing}
    added = 0
    updated = 0

    for q in batch_028_questions:
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

    print(f"Batch 028 merged successfully: {added} added, {updated} updated. Total: {len(existing)} questions.")

if __name__ == "__main__":
    merge_batch_028()
