"""
MAD101 Studio - Schema v2 Batch 029 Builder
Questions: 1121 to 1131 (11 questions - FINAL BATCH TO COMPLETE 1,131 / 1,131)
Updates: v2/questions_sample_v2.json and v2/questions_v2.js
"""

import json
import os

batch_029_questions = [
    {
        "id": 1121,
        "question": "Cho cây \\(m\\)-phân đầy đủ (full \\(m\\)-ary tree) \\(T\\) có chiều cao bằng 4 và có 63 lá. Tìm giá trị của \\(m\\).",
        "options": [
            "A. 3",
            "B. 4",
            "C. 5",
            "D. 6",
            "E. 2"
        ],
        "answer": "A",
        "answer_status": "verified",
        "explanation": [
            "Bước 1: Trong một cây \\(m\\)-phân đầy đủ với \\(i\\) đỉnh trong (internal vertices), số lá được tính theo công thức:\n\\[L = (m - 1)i + 1\\]\nTheo đề bài, \\(L = 63\\), suy ra:\n\\[(m - 1)i = 63 - 1 = 62\\]",
            "Bước 2: Phân tích số 62 ra thừa số nguyên tố: \\(62 = 2 \\times 31\\). Vì cây có chiều cao \\(h = 4\\), số đỉnh trong phải thỏa mãn \\(i \\ge h = 4\\). Do đó \\(i = 31\\) và \\(m - 1 = 2 \\implies m = 3\\).\nKiểm tra số lá tối đa của cây bậc 3 chiều cao 4: \\(m^h = 3^4 = 81 \\ge 63\\) (thỏa mãn). Vậy \\(m = 3\\)."
        ],
        "diagram": None,
        "metadata": {
            "chapter": "Ch8_Trees",
            "topic": "Cây m-phân đầy đủ và số lá",
            "difficulty": "medium",
            "verified": True,
            "has_diagram": False,
            "calculator_allowed": False
        }
    },
    {
        "id": 1122,
        "question": "Xác định khoảng lồi (concave up) và khoảng lõm (concave down) của hàm số:\n\\[f(x) = (x + 3)^{2/3}\\]\n(i) Lõm trên \\((-\\infty, -3)\\) và lồi trên \\((-3, \\infty)\\)\n(ii) Lõm trên \\((-\\infty, -3)\\) và \\((-3, \\infty)\\)\n(iii) Lồi trên \\((-\\infty, -3)\\) và \\((-3, \\infty)\\)\n(iv) Lồi trên \\((-\\infty, -3)\\) và lõm trên \\((-3, \\infty)\\)",
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
            "Bước 1: Tính đạo hàm cấp 1 và cấp 2 của hàm số với \\(x \\ne -3\\):\n\\[f'(x) = \\frac{2}{3}(x + 3)^{-1/3}\\]\n\\[f''(x) = \\frac{2}{3} \\cdot \\left(-\\frac{1}{3}\\right)(x + 3)^{-4/3} = -\\frac{2}{9(x + 3)^{4/3}} = -\\frac{2}{9\\sqrt[3]{(x+3)^4}}\\]",
            "Bước 2: Vì \\((x + 3)^4 > 0\\) với mọi \\(x \\ne -3\\), ta có \\(f''(x) < 0\\) với mọi \\(x \\in (-\\infty, -3) \\cup (-3, \\infty)\\).\nDo đạo hàm cấp 2 luôn âm trên từng khoảng xác định, đồ thị hàm số lõm (concave down) trên cả hai khoảng \\((-\\infty, -3)\\) và \\((-3, \\infty)\\). Khớp với khẳng định (ii), tương ứng với đáp án B."
        ],
        "diagram": None,
        "metadata": {
            "chapter": "Ch2_BasicStructures",
            "topic": "Khảo sát tính lồi lõm của hàm số",
            "difficulty": "medium",
            "verified": True,
            "has_diagram": False,
            "calculator_allowed": False
        }
    },
    {
        "id": 1123,
        "question": "Sử dụng phương pháp Newton với xấp xỉ ban đầu \\(x_1 = 3\\) để tìm xấp xỉ thứ ba \\(x_3\\) cho nghiệm của phương trình:\n\\[x^3 - 3x^2 + 1 = 0\\]\n(Làm tròn kết quả đến 4 chữ số thập phân).",
        "options": [
            "A. 2.8794",
            "B. 2.9888",
            "C. 1.8794",
            "D. 1.1112",
            "E. 1.1206",
            "F. None of the other choices is correct"
        ],
        "answer": "A",
        "answer_status": "verified",
        "explanation": [
            "Bước 1: Đặt \\(f(x) = x^3 - 3x^2 + 1\\), có đạo hàm \\(f'(x) = 3x^2 - 6x\\).\nCông thức lặp Newton: \\(x_{n+1} = x_n - \\frac{f(x_n)}{f'(x_n)}\\).\nVới \\(x_1 = 3\\):\n\\[f(3) = 3^3 - 3(3^2) + 1 = 1\\]\n\\[f'(3) = 3(3^2) - 6(3) = 27 - 18 = 9\\]\n\\[x_2 = 3 - \\frac{1}{9} = \\frac{26}{9} \\approx 2.888889\\]",
            "Bước 2: Tính tiếp bước thứ hai để tìm \\(x_3\\):\n\\[f\\left(\\frac{26}{9}\\right) = \\left(\\frac{26}{9}\\right)^3 - 3\\left(\\frac{26}{9}\\right)^2 + 1 = \\frac{53}{729} \\approx 0.072702\\]\n\\[f'\\left(\\frac{26}{9}\\right) = 3\\left(\\frac{26}{9}\\right)^2 - 6\\left(\\frac{26}{9}\\right) = \\frac{208}{27} \\approx 7.703704\\]\n\\[x_3 = \\frac{26}{9} - \\frac{53/729}{208/27} = \\frac{26}{9} - \\frac{53}{5616} = \\frac{16171}{5616} \\approx 2.879452\\]\nLàm tròn đến 4 chữ số thập phân ta được 2.8794. Khớp với phương án A."
        ],
        "diagram": None,
        "metadata": {
            "chapter": "Ch2_BasicStructures",
            "topic": "Phương pháp lặp Newton-Raphson",
            "difficulty": "medium",
            "verified": True,
            "has_diagram": False,
            "calculator_allowed": True
        }
    },
    {
        "id": 1124,
        "question": "Tìm đạo hàm của hàm số sau theo định lý cơ bản của giải tích:\n\\[g(x) = \\int_5^{\\sin x} (1 + t) \\, dt\\]",
        "options": [
            "A. (1 + \\sin x) \\cos x",
            "B. -(1 + \\sin x) \\cos x",
            "C. (1 + \\sin x) \\sin x",
            "D. -(1 + \\sin x) \\sin x",
            "E. None of the other choices is correct"
        ],
        "answer": "A",
        "answer_status": "verified",
        "explanation": [
            "Bước 1: Áp dụng định lý cơ bản của giải tích và quy tắc đạo hàm hàm hợp (Leibniz rule):\nNếu \\(g(x) = \\int_a^{u(x)} f(t) \\, dt\\) thì \\(g'(x) = f(u(x)) \\cdot u'(x)\\).",
            "Bước 2: Ở đây \\(f(t) = 1 + t\\), cận trên \\(u(x) = \\sin x\\) có đạo hàm \\(u'(x) = \\cos x\\).\nThay vào công thức ta được:\n\\[g'(x) = (1 + \\sin x) \\cdot \\cos x = (1 + \\sin x) \\cos x\\]\nKhớp với phương án A."
        ],
        "diagram": None,
        "metadata": {
            "chapter": "Ch2_BasicStructures",
            "topic": "Đạo hàm của tích phân theo cận trên",
            "difficulty": "easy",
            "verified": True,
            "has_diagram": False,
            "calculator_allowed": False
        }
    },
    {
        "id": 1125,
        "question": "Tính tích phân bất định sau:\n\\[\\int \\frac{dx}{x(\\ln x)^6}\\]\n(i) \\(\\frac{-1}{x(\\ln x)^7} + C\\)\n(ii) \\(\\frac{-1}{5(\\ln x)^5} + C\\)\n(iii) \\(\\frac{1}{7(\\ln x)^7} + C\\)\n(iv) \\(\\frac{-1}{5x(\\ln x)^5} + C\\)",
        "options": [
            "A. (iii)",
            "B. (i)",
            "C. (iv)",
            "D. (ii)",
            "E. None of the other choices is correct"
        ],
        "answer": "D",
        "answer_status": "verified",
        "explanation": [
            "Bước 1: Đổi biến số, đặt \\(u = \\ln x\\). Khi đó vi phân \\(du = \\frac{dx}{x}\\).\nTích phân trở thành:\n\\[\\int u^{-6} \\, du = \\frac{u^{-6+1}}{-6+1} + C = -\\frac{u^{-5}}{5} + C = -\\frac{1}{5u^5} + C\\]",
            "Bước 2: Thay lại \\(u = \\ln x\\):\n\\[\\int \\frac{dx}{x(\\ln x)^6} = -\\frac{1}{5(\\ln x)^5} + C\\]\nKết quả này tương ứng với biểu thức (ii), được xếp tại vị trí lựa chọn D."
        ],
        "diagram": None,
        "metadata": {
            "chapter": "Ch2_BasicStructures",
            "topic": "Tích phân bất định đổi biến số",
            "difficulty": "easy",
            "verified": True,
            "has_diagram": False,
            "calculator_allowed": False
        }
    },
    {
        "id": 1126,
        "question": "Tìm nghiệm của hệ phương trình tuyến tính sau:\n\\[\\begin{cases} x + 2y - 3z = -1 \\\\ x + 5z = 5 \\\\ 2x - 4y + 5z = 1 \\end{cases}\\]",
        "options": [
            "A. (0, 1, 1)",
            "B. (1, 0, 1)",
            "C. (1, 1, 0)",
            "D. No solution",
            "E. None of the other choices is correct"
        ],
        "answer": "A",
        "answer_status": "verified",
        "explanation": [
            "Bước 1: Từ phương trình thứ hai: \\(x = 5 - 5z\\).\nThay vào hai phương trình còn lại:\n1) \\((5 - 5z) + 2y - 3z = -1 \\iff 2y - 8z = -6 \\iff y - 4z = -3 \\iff y = 4z - 3\\).\n2) \\(2(5 - 5z) - 4y + 5z = 1 \\iff 10 - 10z - 4y + 5z = 1 \\iff -4y - 5z = -9 \\iff 4y + 5z = 9\\).",
            "Bước 2: Thay \\(y = 4z - 3\\) vào: \\(4(4z - 3) + 5z = 9 \\iff 16z - 12 + 5z = 9 \\iff 21z = 21 \\iff z = 1\\).\nTừ đó suy ra:\n\\[y = 4(1) - 3 = 1\\]\n\\[x = 5 - 5(1) = 0\\]\nVậy nghiệm duy nhất của hệ là \\((x, y, z) = (0, 1, 1)\\), ứng với phương án A."
        ],
        "diagram": None,
        "metadata": {
            "chapter": "Ch2_BasicStructures",
            "topic": "Hệ phương trình đại số tuyến tính",
            "difficulty": "easy",
            "verified": True,
            "has_diagram": False,
            "calculator_allowed": False
        }
    },
    {
        "id": 1127,
        "question": "Tính tích ma trận - vectơ \\(Ax\\) với ma trận \\(A = \\begin{bmatrix} 1 & -1 \\\\ 0 & 1 \\end{bmatrix}\\) và vectơ \\(x = [x_1 \\quad x_2]^T\\).\n(i) \\([x_1 - x_2 \\quad x_2]^T\\)\n(ii) \\([x_1 \\quad -x_1 + x_2]^T\\)\n(iii) \\([x_2 \\quad x_1 - x_2]^T\\)\n(iv) \\([-x_1 + x_2 \\quad x_1]^T\\)",
        "options": [
            "A. (i)",
            "B. (ii)",
            "C. (iii)",
            "D. (iv)"
        ],
        "answer": "A",
        "answer_status": "verified",
        "explanation": [
            "Bước 1: Thực hiện nhân ma trận với vectơ cột:\n\\[Ax = \\begin{bmatrix} 1 & -1 \\\\ 0 & 1 \\end{bmatrix} \\begin{bmatrix} x_1 \\\\ x_2 \\end{bmatrix} = \\begin{bmatrix} 1 \\cdot x_1 + (-1) \\cdot x_2 \\\\ 0 \\cdot x_1 + 1 \\cdot x_2 \\end{bmatrix} = \\begin{bmatrix} x_1 - x_2 \\\\ x_2 \\end{bmatrix}\\]",
            "Bước 2: Dưới dạng chuyển vị, vectơ kết quả được viết là \\([x_1 - x_2 \\quad x_2]^T\\).\nKhớp với biểu thức (i), tương ứng với lựa chọn A."
        ],
        "diagram": None,
        "metadata": {
            "chapter": "Ch2_BasicStructures",
            "topic": "Nhân ma trận và vectơ",
            "difficulty": "easy",
            "verified": True,
            "has_diagram": False,
            "calculator_allowed": False
        }
    },
    {
        "id": 1128,
        "question": "Cho ma trận \\(A = \\begin{pmatrix} 2 & 3 & 1 \\\\ 2 & -1 & 2 \\\\ 3 & 4 & -2 \\end{pmatrix}\\). Tìm hàng đầu tiên của ma trận phù hợp (adjugate matrix) \\(\\operatorname{adj}(A)\\).",
        "options": [
            "A. [-6   10   7]",
            "B. [-6   -10   7]",
            "C. [-6   10   -7]",
            "D. [6   10   7]",
            "E. None of the other choices is correct"
        ],
        "answer": "A",
        "answer_status": "verified",
        "explanation": [
            "Bước 1: Theo định nghĩa, ma trận phù hợp \\(\\operatorname{adj}(A)\\) là chuyển vị của ma trận phần bù đại số (cofactor matrix): \\(\\operatorname{adj}(A) = C^T\\).\nDo đó, hàng thứ nhất của \\(\\operatorname{adj}(A)\\) chính là cột thứ nhất của ma trận phần bù đại số \\(C\\), tức là bộ ba giá trị \\([C_{11} \\quad C_{21} \\quad C_{31}]\\).",
            "Bước 2: Tính từng phần bù đại số:\n\\[C_{11} = (-1)^{1+1} \\det \\begin{pmatrix} -1 & 2 \\\\ 4 & -2 \\end{pmatrix} = (-1)(-2) - 2(4) = 2 - 8 = -6\\]\n\\[C_{21} = (-1)^{2+1} \\det \\begin{pmatrix} 3 & 1 \\\\ 4 & -2 \\end{pmatrix} = -[3(-2) - 1(4)] = -(-6 - 4) = 10\\]\n\\[C_{31} = (-1)^{3+1} \\det \\begin{pmatrix} 3 & 1 \\\\ -1 & 2 \\end{pmatrix} = 3(2) - 1(-1) = 6 + 1 = 7\\]\nVậy hàng đầu tiên của \\(\\operatorname{adj}(A)\\) là \\([-6 \\quad 10 \\quad 7]\\), khớp với phương án A."
        ],
        "diagram": None,
        "metadata": {
            "chapter": "Ch2_BasicStructures",
            "topic": "Ma trận phụ hợp (Adjugate Matrix)",
            "difficulty": "medium",
            "verified": True,
            "has_diagram": False,
            "calculator_allowed": False
        }
    },
    {
        "id": 1129,
        "question": "Tìm cột đầu tiên của ma trận phù hợp (adjugate matrix) của ma trận:\n\\[A = \\begin{pmatrix} a & b & c \\\\ 2 & -1 & 2 \\\\ 3 & 4 & -2 \\end{pmatrix}, \\quad (a, b, c \\in \\mathbb{R})\\]\n(i) \\(\\begin{pmatrix} -6 \\\\ 10 \\\\ 11 \\end{pmatrix}\\)\n(ii) \\(\\begin{pmatrix} -6 \\\\ -a \\\\ -11 \\end{pmatrix}\\)\n(iii) \\(\\begin{pmatrix} b \\\\ 10 \\\\ 11 \\end{pmatrix}\\)",
        "options": [
            "A. (i)",
            "B. (ii)",
            "C. (iii)",
            "D. None of the other choices is correct"
        ],
        "answer": "A",
        "answer_status": "verified",
        "explanation": [
            "Bước 1: Cột đầu tiên của ma trận phù hợp \\(\\operatorname{adj}(A) = C^T\\) chính là hàng đầu tiên của ma trận các phần bù đại số \\(C\\), tức là các giá trị \\(\\begin{pmatrix} C_{11} \\\\ C_{12} \\\\ C_{13} \\end{pmatrix}\\).\nCác phần tử này chỉ phụ thuộc vào các hàng 2 và 3 của \\(A\\), không hề phụ thuộc vào các tham số \\(a, b, c\\) ở hàng 1.",
            "Bước 2: Tính các phần tử:\n\\[C_{11} = +\\det \\begin{pmatrix} -1 & 2 \\\\ 4 & -2 \\end{pmatrix} = 2 - 8 = -6\\]\n\\[C_{12} = -\\det \\begin{pmatrix} 2 & 2 \\\\ 3 & -2 \\end{pmatrix} = -[2(-2) - 2(3)] = -(-4 - 6) = 10\\]\n\\[C_{13} = +\\det \\begin{pmatrix} 2 & -1 \\\\ 3 & 4 \\end{pmatrix} = 2(4) - (-1)(3) = 8 + 3 = 11\\]\nVậy cột đầu tiên của \\(\\operatorname{adj}(A)\\) là \\(\\begin{pmatrix} -6 \\\\ 10 \\\\ 11 \\end{pmatrix}\\), khớp với khẳng định (i), chọn A."
        ],
        "diagram": None,
        "metadata": {
            "chapter": "Ch2_BasicStructures",
            "topic": "Cột ma trận phụ hợp độc lập tham số",
            "difficulty": "medium",
            "verified": True,
            "has_diagram": False,
            "calculator_allowed": False
        }
    },
    {
        "id": 1130,
        "question": "Cho biết \\(\\lambda = -5\\) là một giá trị riêng của ma trận \\(A = \\begin{bmatrix} 3 & -6 \\\\ 8 & -11 \\end{bmatrix}\\). Tìm tất cả các vectơ riêng tương ứng với giá trị riêng này.",
        "options": [
            "A. t[3, -4], t != 0",
            "B. t[-4, 3], t != 0",
            "C. t[4, 3], t != 0",
            "D. t[3, 4], t != 0",
            "E. None of the other choices is correct"
        ],
        "answer": "D",
        "answer_status": "verified",
        "explanation": [
            "Bước 1: Vectơ riêng \\(v = \\begin{bmatrix} v_1 \\\\ v_2 \\end{bmatrix} \\ne 0\\) tương ứng với \\(\\lambda = -5\\) thỏa mãn hệ thuần nhất \\((A - \\lambda I)v = 0 \\iff (A + 5I)v = 0\\):\n\\[\\begin{bmatrix} 3 + 5 & -6 \\\\ 8 & -11 + 5 \\end{bmatrix} \\begin{bmatrix} v_1 \\\\ v_2 \\end{bmatrix} = \\begin{bmatrix} 8 & -6 \\\\ 8 & -6 \\end{bmatrix} \\begin{bmatrix} v_1 \\\\ v_2 \\end{bmatrix} = \\begin{bmatrix} 0 \\\\ 0 \\end{bmatrix}\\]",
            "Bước 2: Hệ phương trình tương đương với phương trình duy nhất:\n\\[8v_1 - 6v_2 = 0 \\iff 4v_1 = 3v_2 \\iff v_1 = \\frac{3}{4}v_2\\]\nĐặt \\(v_2 = 4t\\) với \\(t \\ne 0\\), ta được \\(v_1 = 3t\\).\nDo đó tập hợp tất cả các vectơ riêng có dạng \\(v = t[3, \\; 4]\\) với \\(t \\ne 0\\). Khớp với phương án D."
        ],
        "diagram": None,
        "metadata": {
            "chapter": "Ch2_BasicStructures",
            "topic": "Giá trị riêng và không gian vectơ riêng",
            "difficulty": "medium",
            "verified": True,
            "has_diagram": False,
            "calculator_allowed": False
        }
    },
    {
        "id": 1131,
        "question": "Xét không gian con sau của \\(\\mathbb{R}^3\\):\n\\[W = \\{(x, y, z) \\in \\mathbb{R}^3 \\mid x + y - z = 0, \\; 2x + 2y + 3z = 0, \\; 3x + 3y - 2z = 0\\}\\]\nSố chiều của không gian con \\(W\\) là bao nhiêu?",
        "options": [
            "A. 0",
            "B. 1",
            "C. 2",
            "D. 3"
        ],
        "answer": "B",
        "answer_status": "verified",
        "explanation": [
            "Bước 1: Không gian con \\(W\\) là không gian nghiệm (null space) của ma trận hệ số thuần nhất:\n\\[A = \\begin{pmatrix} 1 & 1 & -1 \\\\ 2 & 2 & 3 \\\\ 3 & 3 & -2 \\end{pmatrix}\\]\nBiến đổi ma trận về dạng bậc thang:\n- \\(R_2 \\leftarrow R_2 - 2R_1\\): \\([0 \\quad 0 \\quad 5]\\)\n- \\(R_3 \\leftarrow R_3 - 3R_1\\): \\([0 \\quad 0 \\quad 1]\\)\n- Từ \\(5z = 0\\) và \\(z = 0\\), suy ra \\(z = 0\\) và hàng 3 trở thành các số 0.",
            "Bước 2: Ma trận bậc thang có 2 hàng khác không (2 phần tử cơ sở), do đó \\(\\operatorname{rank}(A) = 2\\).\nTheo định lý số chiều (Rank-Nullity Theorem):\n\\[\\dim(W) = 3 - \\operatorname{rank}(A) = 3 - 2 = 1\\]\nCụ thể, nghiệm có dạng \\((x, y, z) = (-y, y, 0) = y(-1, 1, 0)\\) với cơ sở chỉ gồm 1 vectơ. Do đó số chiều của \\(W\\) bằng 1, ứng với phương án B."
        ],
        "diagram": None,
        "metadata": {
            "chapter": "Ch2_BasicStructures",
            "topic": "Số chiều của không gian con (Subspace Dimension)",
            "difficulty": "medium",
            "verified": True,
            "has_diagram": False,
            "calculator_allowed": False
        }
    }
]

def merge_batch_029():
    sample_path = "v2/questions_sample_v2.json"
    with open(sample_path, "r", encoding="utf-8") as f:
        existing = json.load(f)

    existing_ids = {q["id"] for q in existing}
    added = 0
    updated = 0

    for q in batch_029_questions:
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
        f.write("// MAD101 Studio - Questions Data Schema v2\n")
        f.write("// Auto-generated from v2/questions_sample_v2.json\n\n")
        f.write("export const questions = ")
        json.dump(existing, f, indent=2, ensure_ascii=False)
        f.write(";\n")

    print(f"Batch 029 merged successfully: {added} added, {updated} updated. Total: {len(existing)} questions.")

if __name__ == "__main__":
    merge_batch_029()
