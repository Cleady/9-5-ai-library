"""
Builder script for Batch 19 (Questions 721 - 760)
Strictly adheres to MAD101 Schema v2:
- answer: String ("A", "B", "C", "D", "E")
- options: list[str] with "A. ...", "B. ...", etc.
- explanation: list[str] with >= 2 analytical steps
- Clean native vector SVG diagrams
- MathJax LaTeX: \(...\) and \[...\] (no raw unescaped $)
- verification_source pointing to v2/verification/batch_019_results.json
"""
import json
import os

BATCH_19_QUESTIONS = [
    {
        "id": 721,
        "question": "Có bao nhiêu số nguyên dương không vượt quá 200 chia hết cho 5 hoặc 7 (How many positive integers not exceeding 200 and divisible by 5 or 7)?",
        "options": [
            "A. 64",
            "B. 66",
            "C. 56",
            "D. None of the other choices is correct"
        ],
        "answer": "D",
        "explanation": [
            "Bước 1: Áp dụng Nguyên lý Bù trừ (Principle of Inclusion-Exclusion - PIE) trên tập \\(S = \\{1, 2, \\dots, 200\\}\\):",
            "- Số các số chia hết cho 5: \\(|A| = \\lfloor 200 / 5 \\rfloor = 40\\).",
            "- Số các số chia hết cho 7: \\(|B| = \\lfloor 200 / 7 \\rfloor = 28\\).",
            "- Vì \\(\\gcd(5, 7) = 1\\), số chia hết cho cả 5 và 7 là bội của \\(\\operatorname{lcm}(5, 7) = 35\\): \\(|A \\cap B| = \\lfloor 200 / 35 \\rfloor = 5\\).",
            "Bước 2: Tính tổng số phần tử chia hết cho 5 hoặc 7:",
            "\\[ |A \\cup B| = |A| + |B| - |A \\cap B| = 40 + 28 - 5 = 63 \\]",
            "Vì giá trị đúng 63 không nằm trong các phương án A (64), B (66), C (56), nên đáp án chính xác là D (None of the other choices is correct)."
        ],
        "chapter": "Ch6_Counting",
        "difficulty": "medium",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_019_results.json",
        "original_image": "0721_q721_Question_721.png"
    },
    {
        "id": 722,
        "question": "Một người gửi 10,000,000 VND vào tài khoản tiết kiệm với lãi suất 2% mỗi tháng, tiền lãi được gộp hàng tháng (A person deposited 10,000,000 VND in a saving account at the rate of 2% a month with interest compounded monthly). Hỏi sau 1 năm trong tài khoản có bao nhiêu tiền (làm tròn đến hàng đơn vị)?",
        "options": [
            "A. 10,020,000",
            "B. 200,000",
            "C. 12,682,417",
            "D. 10,200,000",
            "E. None of the choices is correct"
        ],
        "answer": "C",
        "explanation": [
            "Bước 1: Sử dụng công thức tính lãi kép gộp hàng tháng:",
            "\\[ A = P(1 + r)^n \\]",
            "Trong đó vốn gốc \\(P = 10,000,000\\) VND, lãi suất mỗi tháng \\(r = 2\\% = 0.02\\), và thời gian 1 năm tương ứng với \\(n = 12\\) tháng.",
            "Bước 2: Tính toán giá trị lũy thừa:",
            "\\[ A = 10,000,000 \\times (1 + 0.02)^{12} = 10,000,000 \\times (1.02)^{12} \\]",
            "Ta có \\(1.02^{12} \\approx 1.268241795\\), do đó số tiền trong tài khoản là:",
            "\\[ A \\approx 10,000,000 \\times 1.268241795 \\approx 12,682,417.95 \\text{ VND} \\]",
            "Làm tròn đến hàng đơn vị ta được 12,682,417 VND (chọn C)."
        ],
        "chapter": "Ch6_Counting",
        "difficulty": "medium",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_019_results.json",
        "original_image": "0722_q722_Question_722.png"
    },
    {
        "id": 723,
        "question": "Giả sử một người gửi \\(\\$20,000\\) vào tài khoản tiết kiệm ngân hàng sinh lãi 10% mỗi năm với lãi kép gộp hàng năm (Suppose that a person deposits \\(\\$20,000\\) in a savings account at a bank yielding 10% per year with interest compounded annually). Hỏi sau 30 năm trong tài khoản sẽ có bao nhiêu tiền? (Làm tròn đến đô la gần nhất)",
        "options": [
            "A. \\(\\$220,000\\)",
            "B. \\(\\$348,988\\)",
            "C. None of the other choices is correct",
            "D. \\(\\$269,569\\)"
        ],
        "answer": "B",
        "explanation": [
            "Bước 1: Sử dụng công thức lãi kép gộp hàng năm:",
            "\\[ A = P(1 + r)^n \\]",
            "Với số vốn gốc \\(P = 20,000\\) USD, lãi suất hàng năm \\(r = 10\\% = 0.10\\), và thời gian \\(n = 30\\) năm.",
            "Bước 2: Thay số và tính giá trị sau 30 năm:",
            "\\[ A = 20,000 \\times (1 + 0.10)^{30} = 20,000 \\times (1.1)^{30} \\]",
            "Ta có \\(1.1^{30} \\approx 17.44940227\\).",
            "\\[ A \\approx 20,000 \\times 17.44940227 = 348,988.045 \\approx 348,988 \\text{ USD} \\]",
            "Do đó đáp án chính xác là \\(\\$348,988\\) (chọn B)."
        ],
        "chapter": "Ch6_Counting",
        "difficulty": "medium",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_019_results.json",
        "original_image": "0723_q723_Question_723.png"
    },
    {
        "id": 724,
        "question": "Tìm giá trị của \\(f(16)\\) nếu biết điều kiện ban đầu \\(f(2) = 5\\) và hệ thức truy hồi \\(f(n) = (f(\\sqrt{n}))^2\\) với \\(n = 2^{2^k}\\):",
        "options": [
            "A. 5",
            "B. 1225",
            "C. 625",
            "D. 25",
            "E. None of the other choices is correct"
        ],
        "answer": "C",
        "explanation": [
            "Bước 1: Áp dụng hệ thức truy hồi để tính \\(f(4)\\):",
            "\\[ f(4) = (f(\\sqrt{4}))^2 = (f(2))^2 = 5^2 = 25 \\]",
            "Bước 2: Áp dụng hệ thức truy hồi để tính \\(f(16)\\):",
            "\\[ f(16) = (f(\\sqrt{16}))^2 = (f(4))^2 = 25^2 = 625 \\]",
            "Vậy giá trị cần tìm là 625 (chọn C)."
        ],
        "chapter": "Ch6_Counting",
        "difficulty": "easy",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_019_results.json",
        "original_image": "0724_q724_Question_724.png"
    },
    {
        "id": 725,
        "question": "Cho hàm tăng \\(T(n)\\) thỏa mãn hệ thức chia để trị \\(T(n) = 2T(n/2) + n\\). Chọn khẳng định đúng nhất (Choose the best answer):\n(i) \\(T(n) = O(n)\\)\n(ii) \\(T(n) = O(n \\log n)\\)\n(iii) \\(T(n) = O(\\log n)\\)\n(iv) \\(T(n) = O(n^2)\\)",
        "options": [
            "A. (i)",
            "B. (ii)",
            "C. (iii)",
            "D. (iv)"
        ],
        "answer": "B",
        "explanation": [
            "Bước 1: Áp dụng Định lý Thợ (Master Theorem) dạng \\(T(n) = a T(n/b) + f(n)\\):",
            "Ở đây \\(a = 2\\), \\(b = 2\\), và \\(f(n) = n = \\Theta(n^d)\\) với số mũ \\(d = 1\\).",
            "Bước 2: So sánh \\(a\\) và \\(b^d\\):",
            "Ta có \\(b^d = 2^1 = 2 = a\\). Do \\(a = b^d\\), hệ thức thuộc trường hợp 2 của Định lý Master:",
            "\\[ T(n) = \\Theta(n^{\\log_b a} \\log n) = \\Theta(n^{\\log_2 2} \\log n) = \\Theta(n \\log n) \\]",
            "Do đó \\(T(n) = O(n \\log n)\\), tương ứng với khẳng định (ii) (chọn B)."
        ],
        "chapter": "Ch6_Counting",
        "difficulty": "medium",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_019_results.json",
        "original_image": "0725_q725_Question_725.png"
    },
    {
        "id": 726,
        "question": "Cho thuật toán sau:\n```pascal\nprocedure LN(m, n: integer)\nwhile m <> n do\n    if m > n then\n        m := m - n\n    else\n        n := n - m;\nprint(m)\n```\nNếu đầu vào là \\(m = 36, n = 44\\), kết quả in ra của thuật toán là gì?",
        "options": [
            "A. 4",
            "B. 5",
            "C. 6",
            "D. 7",
            "E. 8"
        ],
        "answer": "A",
        "explanation": [
            "Bước 1: Nhận diện thuật toán: Đây là thuật toán trừ liên tiếp Euclid để tìm ước chung lớn nhất \\(\\gcd(m, n)\\).",
            "Bước 2: Mô phỏng từng bước lặp với \\(m = 36, n = 44\\):",
            "- Lần 1: \\(36 < 44 \\implies n = 44 - 36 = 8\\).",
            "- Lần 2: \\(36 > 8 \\implies m = 36 - 8 = 28\\).",
            "- Lần 3: \\(28 > 8 \\implies m = 28 - 8 = 20\\).",
            "- Lần 4: \\(20 > 8 \\implies m = 20 - 8 = 12\\).",
            "- Lần 5: \\(12 > 8 \\implies m = 12 - 8 = 4\\).",
            "- Lần 6: \\(4 < 8 \\implies n = 8 - 4 = 4\\).",
            "- Khi \\(m = 4\\) và \\(n = 4\\), điều kiện `m <> n` sai, vòng lặp dừng và in ra \\(m = 4\\).",
            "Vậy kết quả in ra là 4 (chọn A)."
        ],
        "chapter": "Ch3_Algorithms",
        "difficulty": "medium",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_019_results.json",
        "original_image": "0726_q726_Question_726.png"
    },
    {
        "id": 727,
        "question": "Cho hai hàm số \\(f(x) = x^2 \\log(x^2)\\) và \\(g(x) = (x \\log x)^2\\). Chọn khẳng định đúng:\n(i) \\(f(x) = O(g(x))\\)\n(ii) \\(g(x) = O(f(x))\\)",
        "options": [
            "A. (i)",
            "B. (ii)",
            "C. Both (i) and (ii)",
            "D. None of the other choices is correct"
        ],
        "answer": "A",
        "explanation": [
            "Bước 1: Rút gọn các biểu thức hàm số theo tính chất của hàm logarit:",
            "- \\(f(x) = x^2 \\log(x^2) = x^2 \\cdot (2 \\log x) = 2x^2 \\log x\\).",
            "- \\(g(x) = (x \\log x)^2 = x^2 (\\log x)^2\\).",
            "Bước 2: So sánh tốc độ tăng tiệm cận bằng cách xét tỉ số khi \\(x \\to \\infty\\):",
            "\\[ \\lim_{x \\to \\infty} \\frac{f(x)}{g(x)} = \\lim_{x \\to \\infty} \\frac{2x^2 \\log x}{x^2 (\\log x)^2} = \\lim_{x \\to \\infty} \\frac{2}{\\log x} = 0 \\]",
            "Vì tỉ số tiến về 0, ta có \\(f(x) = O(g(x))\\), do đó khẳng định (i) đúng.",
            "Ngược lại, \\(\\lim_{x \\to \\infty} \\frac{g(x)}{f(x)} = +\\infty\\), nên \\(g(x) \\ne O(f(x))\\), tức khẳng định (ii) sai.",
            "Vậy chỉ có khẳng định (i) đúng (chọn A)."
        ],
        "chapter": "Ch3_Algorithms",
        "difficulty": "medium",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_019_results.json",
        "original_image": "0727_q727_Question_727.png"
    },
    {
        "id": 728,
        "question": "Cho đoạn thuật toán sau:\n```pascal\nprocedure SUM(n: int)\n    t := 0\n    for i := 1 to n do\n        for j := 1 to n-1 do\n            t := t*i + j\n    return t\n```\nHỏi có bao nhiêu phép cộng và phép nhân được thực hiện khi \\(n = 11\\)?",
        "options": [
            "A. 220",
            "B. 110",
            "C. 330",
            "D. 440",
            "E. None of the other choices is correct"
        ],
        "answer": "A",
        "explanation": [
            "Bước 1: Phân tích số lần lặp của các vòng lặp lồng nhau:",
            "- Vòng lặp ngoài chạy từ \\(i = 1\\) đến \\(n\\) (tổng cộng \\(n\\) lần).",
            "- Vòng lặp trong chạy từ \\(j = 1\\) đến \\(n - 1\\) (tổng cộng \\(n - 1\\) lần cho mỗi \\(i\\)).",
            "- Tổng số lần thực hiện thân vòng lặp trong là: \\(n \\times (n - 1)\\).",
            "Bước 2: Đếm số phép cộng và phép nhân trong mỗi lần lặp:",
            "- Biểu thức `t := t*i + j` chứa đúng 1 phép nhân (`t*i`) và 1 phép cộng (`+ j`), tức 2 phép toán cho mỗi lần lặp.",
            "- Với \\(n = 11\\), tổng số phép tính là: \\(11 \\times (11 - 1) \\times 2 = 11 \\times 10 \\times 2 = 220\\).",
            "Do đó đáp án là 220 (chọn A)."
        ],
        "chapter": "Ch3_Algorithms",
        "difficulty": "medium",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_019_results.json",
        "original_image": "0728_q728_Question_728.png"
    },
    {
        "id": 729,
        "question": "Đưa ra đánh giá Big-O cho số lượng phép tính (phép cộng hoặc nhân) được sử dụng trong đoạn thuật toán sau:\n```pascal\nk := 0\nfor i := 1 to n - 1\n    for j := i to 2 * i\n        k := k + i * j\n    end\nend\n```\n(i) \\(O(n)\\)\n(ii) \\(O(n \\log n)\\)\n(iii) \\(O(n^2)\\)\n(iv) \\(O(n^4)\\)",
        "options": [
            "A. (i)",
            "B. (ii)",
            "C. (iii)",
            "D. (iv)"
        ],
        "answer": "C",
        "explanation": [
            "Bước 1: Xác định số lần lặp của vòng lặp trong với mỗi giá trị \\(i\\):",
            "Chỉ số \\(j\\) chạy từ \\(i\\) đến \\(2i\\), do đó số lần lặp là \\(2i - i + 1 = i + 1\\).",
            "Bước 2: Tính tổng số lần thực thi thân vòng lặp trong khi \\(i\\) chạy từ 1 đến \\(n - 1\\):",
            "\\[ \\sum_{i=1}^{n-1} (i + 1) = \\sum_{i=1}^{n-1} i + \\sum_{i=1}^{n-1} 1 = \\frac{(n - 1)n}{2} + (n - 1) = \\frac{n^2 + n - 2}{2} = \\Theta(n^2) \\]",
            "Mỗi lần lặp thực hiện 1 phép nhân và 1 phép cộng (2 phép tính). Do đó tổng số phép tính là \\(2 \\times \\Theta(n^2) = \\Theta(n^2) = O(n^2)\\).",
            "Khẳng định đúng là (iii) (chọn C)."
        ],
        "chapter": "Ch3_Algorithms",
        "difficulty": "medium",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_019_results.json",
        "original_image": "0729_q729_Question_729.png"
    },
    {
        "id": 730,
        "question": "Cho thuật toán sau:\n```pascal\nprocedure la(a1, a2, ..., an: integers)\nm := a1;\nt := 0\nfor i := 2 to n\n    if (ai >= m) then\n        m := ai;\n        t := t + 1\n```\nNếu đầu vào là danh sách \\([1, 2, 3, 6, 7, 7, 4, 8, 8, 6]\\), hỏi có bao nhiêu phép cộng được thực hiện?",
        "options": [
            "A. 10",
            "B. 8",
            "C. 7",
            "D. 5",
            "E. None of the other choices is correct"
        ],
        "answer": "C",
        "explanation": [
            "Bước 1: Khởi tạo giá trị ban đầu trước vòng lặp: \\(m = a_1 = 1\\), \\(t = 0\\). Phép cộng chỉ diễn ra khi câu lệnh `t := t + 1` được thực thi (tức điều kiện \\(a_i \\ge m\\) thỏa mãn).",
            "Bước 2: Theo dõi từng phần tử từ \\(i = 2\\) đến \\(10\\):",
            "- \\(i=2, a_2=2\\): \\(2 \\ge 1 \\implies m=2, t=1\\) (phép cộng 1).",
            "- \\(i=3, a_3=3\\): \\(3 \\ge 2 \\implies m=3, t=2\\) (phép cộng 2).",
            "- \\(i=4, a_4=6\\): \\(6 \\ge 3 \\implies m=6, t=3\\) (phép cộng 3).",
            "- \\(i=5, a_5=7\\): \\(7 \\ge 6 \\implies m=7, t=4\\) (phép cộng 4).",
            "- \\(i=6, a_6=7\\): \\(7 \\ge 7\\) (điều kiện \\(\\ge\\) thỏa mãn) \\(\\implies m=7, t=5\\) (phép cộng 5).",
            "- \\(i=7, a_7=4\\): \\(4 \\ge 7\\) (Sai, không tăng \\(t\\)).",
            "- \\(i=8, a_8=8\\): \\(8 \\ge 7 \\implies m=8, t=6\\) (phép cộng 6).",
            "- \\(i=9, a_9=8\\): \\(8 \\ge 8\\) (thỏa mãn) \\(\\implies m=8, t=7\\) (phép cộng 7).",
            "- \\(i=10, a_{10}=6\\): \\(6 \\ge 8\\) (Sai, không tăng \\(t\\)).",
            "Tổng cộng có đúng 7 phép cộng được thực hiện (chọn C)."
        ],
        "chapter": "Ch3_Algorithms",
        "difficulty": "medium",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_019_results.json",
        "original_image": "0730_q730_Question_730.png"
    },
    {
        "id": 731,
        "question": "Phân tích thừa số nguyên tố của số 1025 có dạng \\(p^a q^b\\) (với \\(p < q\\) là các số nguyên tố). Tìm \\(p + q\\):",
        "options": [
            "A. 46",
            "B. 36",
            "C. 56",
            "D. None of the other choices is correct"
        ],
        "answer": "A",
        "explanation": [
            "Bước 1: Phân tích số 1025 ra các thừa số nguyên tố:",
            "- \\(1025\\) có chữ số tận cùng là 5 nên chia hết cho 5: \\(1025 / 5 = 205\\).",
            "- \\(205 / 5 = 41\\).",
            "- Số 41 là một số nguyên tố.",
            "Do đó \\(1025 = 5^2 \\times 41^1\\).",
            "Bước 2: Xác định các thừa số nguyên tố và tính tổng:",
            "- Hai thừa số nguyên tố là \\(p = 5\\) và \\(q = 41\\) (thỏa mãn \\(p < q\\)).",
            "- Tổng \\(p + q = 5 + 41 = 46\\).",
            "Đáp án chính xác là 46 (chọn A)."
        ],
        "chapter": "Ch3_Algorithms",
        "difficulty": "easy",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_019_results.json",
        "original_image": "0731_q731_Question_731.png"
    },
    {
        "id": 732,
        "question": "Phân tích thừa số nguyên tố của 1025 là \\(p^a q^b\\) (với các số nguyên tố \\(p < q\\)). Tìm \\(q - p\\):",
        "options": [
            "A. 36",
            "B. 46",
            "C. 11",
            "D. None of the other choices is correct"
        ],
        "answer": "A",
        "explanation": [
            "Bước 1: Phân tích số 1025 thành tích các lũy thừa nguyên tố:",
            "\\[ 1025 = 25 \\times 41 = 5^2 \\times 41^1 \\]",
            "Bước 2: Xác định \\(p, q\\) và tính hiệu số:",
            "Ta có \\(p = 5\\) và \\(q = 41\\) vì \\(p < q\\).",
            "\\[ q - p = 41 - 5 = 36 \\]",
            "Do đó đáp án chính xác là 36 (chọn A)."
        ],
        "chapter": "Ch3_Algorithms",
        "difficulty": "easy",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_019_results.json",
        "original_image": "0732_q732_Question_732.png"
    },
    {
        "id": 733,
        "question": "Nếu tích của hai số nguyên là \\(2^8 \\cdot 3^7 \\cdot 5^2 \\cdot 7^6\\) và bội chung nhỏ nhất (LCM) của chúng là \\(2^4 \\cdot 3^4 \\cdot 5^1 \\cdot 7^3\\), thì ước chung lớn nhất (GCD) của chúng là:",
        "options": [
            "A. 1,111,320",
            "B. 952,560",
            "C. 740,880",
            "D. 592,704",
            "E. None of the other choices"
        ],
        "answer": "C",
        "explanation": [
            "Bước 1: Áp dụng định lý về tích của GCD và LCM giữa hai số nguyên \\(a, b\\):",
            "\\[ a \\cdot b = \\gcd(a, b) \\times \\operatorname{lcm}(a, b) \\implies \\gcd(a, b) = \\frac{a \\cdot b}{\\operatorname{lcm}(a, b)} \\]",
            "Bước 2: Thay biểu thức phân tích thừa số nguyên tố vào thương số:",
            "\\[ \\gcd(a, b) = \\frac{2^8 \\cdot 3^7 \\cdot 5^2 \\cdot 7^6}{2^4 \\cdot 3^4 \\cdot 5^1 \\cdot 7^3} = 2^{8-4} \\cdot 3^{7-4} \\cdot 5^{2-1} \\cdot 7^{6-3} = 2^4 \\cdot 3^3 \\cdot 5^1 \\cdot 7^3 \\]",
            "Bước 3: Tính giá trị số học chi tiết:",
            "- \\(2^4 = 16\\), \\(3^3 = 27\\), \\(5^1 = 5\\), \\(7^3 = 343\\).",
            "- \\(\\gcd(a, b) = (16 \\times 5) \\times (27 \\times 343) = 80 \\times 9,261 = 740,880\\).",
            "Vậy ước chung lớn nhất là 740,880 (chọn C)."
        ],
        "chapter": "Ch3_Algorithms",
        "difficulty": "medium",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_019_results.json",
        "original_image": "0733_q733_Question_733.png"
    },
    {
        "id": 734,
        "question": "Số cạnh trong một đồ thị có 7 đỉnh, trong đó có 2 đỉnh bậc 4, 1 đỉnh bậc 2 và 4 đỉnh bậc 1 là:",
        "options": [
            "A. 6",
            "B. 7",
            "C. 8",
            "D. 9",
            "E. None of the other choices"
        ],
        "answer": "B",
        "explanation": [
            "Bước 1: Tính tổng bậc của tất cả các đỉnh trong đồ thị:",
            "\\[ \\sum_{v \\in V} \\deg(v) = (2 \\times 4) + (1 \\times 2) + (4 \\times 1) = 8 + 2 + 4 = 14 \\]",
            "Bước 2: Áp dụng Bổ đề Bắt tay (Handshaking Lemma):",
            "\\[ 2 |E| = \\sum_{v \\in V} \\deg(v) = 14 \\implies |E| = \\frac{14}{2} = 7 \\]",
            "Đồ thị có 7 cạnh (chọn B)."
        ],
        "chapter": "Ch8_Graphs",
        "difficulty": "easy",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_019_results.json",
        "original_image": "0734_q734_Question_734.png"
    },
    {
        "id": 735,
        "question": "Cho \\(G\\) là đồ thị vô hướng có 6 đỉnh, trong đó có 2 đỉnh bậc 4 và 4 đỉnh bậc 2. Hỏi \\(G\\) có bao nhiêu cạnh?",
        "options": [
            "A. 7",
            "B. 8",
            "C. 9",
            "D. 10",
            "E. None of the other choices"
        ],
        "answer": "B",
        "explanation": [
            "Bước 1: Tính tổng bậc của 6 đỉnh trong đồ thị vô hướng:",
            "\\[ \\sum_{v \\in V} \\deg(v) = (2 \\times 4) + (4 \\times 2) = 8 + 8 = 16 \\]",
            "Bước 2: Áp dụng định lý bắt tay để tính số cạnh:",
            "\\[ |E| = \\frac{\\sum \\deg(v)}{2} = \\frac{16}{2} = 8 \\]",
            "Vậy đồ thị có 8 cạnh (chọn B)."
        ],
        "chapter": "Ch8_Graphs",
        "difficulty": "easy",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_019_results.json",
        "original_image": "0735_q735_Question_735.png"
    },
    {
        "id": 736,
        "question": "Cho \\(G\\) là một đơn đồ thị mà tất cả các đỉnh đều có bậc 3 (đồ thị 3-chính quy). Nếu \\(G\\) có 30 cạnh, hỏi \\(G\\) có bao nhiêu đỉnh?",
        "options": [
            "A. 20",
            "B. 10",
            "C. 80",
            "D. 40"
        ],
        "answer": "A",
        "explanation": [
            "Bước 1: Sử dụng mối liên hệ giữa số đỉnh và số cạnh trong đồ thị \\(r\\)-chính quy:",
            "\\[ \\sum_{v \\in V} \\deg(v) = r |V| = 2 |E| \\]",
            "Bước 2: Thay số với \\(r = 3\\) và \\(|E| = 30\\):",
            "\\[ 3 |V| = 2 \\times 30 = 60 \\implies |V| = \\frac{60}{3} = 20 \\]",
            "Vậy đồ thị có 20 đỉnh (chọn A)."
        ],
        "chapter": "Ch8_Graphs",
        "difficulty": "easy",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_019_results.json",
        "original_image": "0736_q736_Question_736.png"
    },
    {
        "id": 737,
        "question": "Cho \\(n > 3\\), \\(n\\) là số lẻ. Đồ thị nào sau đây là đồ thị hai phía (bipartite)?",
        "options": [
            "A. \\(Q_n\\)",
            "B. \\(K_n\\)",
            "C. \\(C_n\\)",
            "D. \\(W_n\\)",
            "E. None of the other choices is correct"
        ],
        "answer": "A",
        "explanation": [
            "Bước 1: Định lý về đồ thị hai phía: Một đồ thị là đồ thị hai phía khi và chỉ khi nó không chứa chu trình có độ dài lẻ.",
            "Bước 2: Khảo sát từng họ đồ thị đặc biệt:",
            "- \\(Q_n\\) (hypercube): Tập đỉnh gồm các xâu bit độ dài \\(n\\). Hai đỉnh kề nhau khi khác nhau đúng 1 bit. Ta phân hoạch thành tập đỉnh có số bit 1 chẵn và tập đỉnh có số bit 1 lẻ. Vì cạnh chỉ nối đỉnh chẵn với đỉnh lẻ, \\(Q_n\\) luôn là đồ thị hai phía với mọi \\(n \\ge 1\\).",
            "- \\(K_n\\): Với \\(n > 3\\) lẻ, chứa tam giác \\(K_3\\) (chu trình lẻ 3) nên không là hai phía.",
            "- \\(C_n\\): Chu trình với \\(n\\) lẻ chính là chu trình lẻ, nên không là hai phía.",
            "- \\(W_n\\): Đồ thị bánh xe chứa chu trình tam giác nối đỉnh tâm với 2 đỉnh vành kề nhau, nên không là hai phía.",
            "Do đó chỉ có \\(Q_n\\) là đồ thị hai phía (chọn A)."
        ],
        "chapter": "Ch8_Graphs",
        "difficulty": "medium",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_019_results.json",
        "original_image": "0737_q737_Question_737.png"
    },
    {
        "id": 738,
        "question": "Cho đồ thị vô hướng \\(G\\) gồm 4 đỉnh \\(A, B, C, D\\) có ma trận liên thuộc (incidence matrix) sau:\n\\[\nM = \\begin{bmatrix}\n1 & 0 & 1 & 1 & 0 & 0 & 0 \\\\\n1 & 1 & 1 & 0 & 0 & 1 & 0 \\\\\n0 & 1 & 0 & 1 & 0 & 0 & 1 \\\\\n0 & 0 & 0 & 0 & 1 & 0 & 1\n\\end{bmatrix}\n\\]\nKhẳng định nào sau đây là đúng?",
        "options": [
            "A. G is a simple graph.",
            "B. G is a multigraph.",
            "C. G has no multiple edges.",
            "D. G has loops."
        ],
        "answer": "D",
        "explanation": [
            "Bước 1: Nhắc lại quy ước biểu diễn ma trận liên thuộc đỉnh-cạnh của đồ thị vô hướng:",
            "- Mỗi hàng tương ứng với một đỉnh và mỗi cột tương ứng với một cạnh.",
            "- Cạnh thông thường nối 2 đỉnh phân biệt có đúng hai số 1 trên cột đó.",
            "- Khuyên (loop) tại một đỉnh \\(v\\) là cạnh nối đỉnh \\(v\\) với chính nó. Theo định nghĩa quy chuẩn sách Kenneth Rosen, cột tương ứng với khuyên chỉ có ĐÚNG MỘT số 1 tại hàng \\(v\\).",
            "Bước 2: Quan sát các cột của ma trận \\(M\\):",
            "- Cột 5 chỉ có duy nhất một số 1 tại hàng 4 (ứng với đỉnh \\(D\\)). Điều này biểu diễn một khuyên tại đỉnh \\(D\\).",
            "- Cột 6 chỉ có duy nhất một số 1 tại hàng 2 (ứng với đỉnh \\(B\\)). Điều này biểu diễn một khuyên tại đỉnh \\(B\\).",
            "Vì vậy đồ thị \\(G\\) có chứa khuyên ('G has loops', chọn D)."
        ],
        "chapter": "Ch8_Graphs",
        "difficulty": "medium",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_019_results.json",
        "original_image": "0738_q738_Question_738.png"
    },
    {
        "id": 739,
        "question": "Điền vào chỗ trống: Ma trận kề của ... có ... số 1 (The adjacent matrix of .... has .... 1s):\n(i) \\(W_n, 2n\\)\n(ii) \\(Q_n, 2^n\\)\n(iii) \\(K_n, n(n - 1)\\)\n(iv) \\(C_n, n\\)",
        "options": [
            "A. (iii)",
            "B. (ii)",
            "C. None of the other choices is correct",
            "D. (iv)",
            "E. (i)"
        ],
        "answer": "A",
        "explanation": [
            "Bước 1: Tính chất số lượng phần tử 1 trong ma trận kề của đơn đồ thị vô hướng:",
            "Mỗi cạnh vô hướng giữa 2 đỉnh \\(u, v\\) tạo ra đúng hai số 1 trong ma trận kề (tại \\(A_{uv}\\) và \\(A_{vu}\\)). Do đó tổng số phần tử 1 luôn bằng \\(2|E| = \\sum \\deg(v)\\).",
            "Bước 2: Kiểm tra từng trường hợp:",
            "- Với \\(K_n\\): Số cạnh là \\(|E| = \\frac{n(n - 1)}{2}\\). Tổng số phần tử 1 là \\(2 \\times \\frac{n(n - 1)}{2} = n(n - 1)\\). Mệnh đề (iii) đúng.",
            "- Với \\(W_n\\): Có \\(2n\\) cạnh nên có \\(4n\\) số 1 (mệnh đề (i) sai).",
            "- Với \\(Q_n\\): Có \\(n 2^{n-1}\\) cạnh nên có \\(n 2^n\\) số 1 (mệnh đề (ii) sai).",
            "- Với \\(C_n\\): Có \\(n\\) cạnh nên có \\(2n\\) số 1 (mệnh đề (iv) sai).",
            "Do đó khẳng định đúng duy nhất là (iii) (chọn A)."
        ],
        "chapter": "Ch8_Graphs",
        "difficulty": "medium",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_019_results.json",
        "original_image": "0739_q739_Question_739.png"
    },
    {
        "id": 740,
        "question": "Hai đồ thị sau đây có đẳng cấu với nhau không? Nếu không, lý do là gì (Are these two graphs isomorphic? If not, what is the reason)?\n\n<svg viewBox=\"0 0 540 220\" width=\"500\" height=\"200\" xmlns=\"http://www.w3.org/2000/svg\" style=\"background:#ffffff; border:1px solid #e2e8f0; border-radius:8px; display:block; margin:10px auto;\">\n  <text x=\"130\" y=\"25\" font-family=\"sans-serif\" font-size=\"14\" font-weight=\"bold\" fill=\"#1e293b\" text-anchor=\"middle\">Đồ thị bên trái (G1)</text>\n  <line x1=\"60\" y1=\"70\" x2=\"60\" y2=\"150\" stroke=\"#ef4444\" stroke-width=\"3\" stroke-dasharray=\"4,3\" />\n  <line x1=\"60\" y1=\"70\" x2=\"110\" y2=\"40\" stroke=\"#334155\" stroke-width=\"2\" />\n  <line x1=\"60\" y1=\"70\" x2=\"130\" y2=\"90\" stroke=\"#334155\" stroke-width=\"2\" />\n  <line x1=\"60\" y1=\"150\" x2=\"110\" y2=\"180\" stroke=\"#334155\" stroke-width=\"2\" />\n  <line x1=\"60\" y1=\"150\" x2=\"130\" y2=\"130\" stroke=\"#334155\" stroke-width=\"2\" />\n  <line x1=\"110\" y1=\"40\" x2=\"180\" y2=\"60\" stroke=\"#334155\" stroke-width=\"2\" />\n  <line x1=\"180\" y1=\"60\" x2=\"200\" y2=\"110\" stroke=\"#334155\" stroke-width=\"2\" />\n  <line x1=\"200\" y1=\"110\" x2=\"180\" y2=\"160\" stroke=\"#334155\" stroke-width=\"2\" />\n  <line x1=\"180\" y1=\"160\" x2=\"110\" y2=\"180\" stroke=\"#334155\" stroke-width=\"2\" />\n  <line x1=\"130\" y1=\"90\" x2=\"200\" y2=\"110\" stroke=\"#334155\" stroke-width=\"2\" />\n  <line x1=\"130\" y1=\"130\" x2=\"180\" y2=\"60\" stroke=\"#334155\" stroke-width=\"2\" />\n  <circle cx=\"60\" cy=\"70\" r=\"6\" fill=\"#ef4444\" />\n  <circle cx=\"60\" cy=\"150\" r=\"6\" fill=\"#ef4444\" />\n  <circle cx=\"110\" cy=\"40\" r=\"5\" fill=\"#2563eb\" />\n  <circle cx=\"130\" cy=\"90\" r=\"5\" fill=\"#2563eb\" />\n  <circle cx=\"130\" cy=\"130\" r=\"5\" fill=\"#2563eb\" />\n  <circle cx=\"110\" cy=\"180\" r=\"5\" fill=\"#2563eb\" />\n  <circle cx=\"180\" cy=\"60\" r=\"5\" fill=\"#2563eb\" />\n  <circle cx=\"200\" cy=\"110\" r=\"5\" fill=\"#2563eb\" />\n  <circle cx=\"180\" cy=\"160\" r=\"5\" fill=\"#2563eb\" />\n  <text x=\"400\" y=\"25\" font-family=\"sans-serif\" font-size=\"14\" font-weight=\"bold\" fill=\"#1e293b\" text-anchor=\"middle\">Đồ thị bên phải (G2)</text>\n  <line x1=\"340\" y1=\"70\" x2=\"390\" y2=\"40\" stroke=\"#334155\" stroke-width=\"2\" />\n  <line x1=\"340\" y1=\"150\" x2=\"390\" y2=\"180\" stroke=\"#334155\" stroke-width=\"2\" />\n  <line x1=\"340\" y1=\"70\" x2=\"460\" y2=\"70\" stroke=\"#334155\" stroke-width=\"2\" />\n  <line x1=\"340\" y1=\"150\" x2=\"460\" y2=\"150\" stroke=\"#334155\" stroke-width=\"2\" />\n  <line x1=\"390\" y1=\"40\" x2=\"460\" y2=\"150\" stroke=\"#334155\" stroke-width=\"2\" />\n  <line x1=\"390\" y1=\"180\" x2=\"460\" y2=\"70\" stroke=\"#334155\" stroke-width=\"2\" />\n  <line x1=\"390\" y1=\"40\" x2=\"390\" y2=\"180\" stroke=\"#334155\" stroke-width=\"2\" />\n  <line x1=\"460\" y1=\"70\" x2=\"460\" y2=\"150\" stroke=\"#334155\" stroke-width=\"2\" />\n  <circle cx=\"340\" cy=\"70\" r=\"5\" fill=\"#10b981\" />\n  <circle cx=\"340\" cy=\"150\" r=\"5\" fill=\"#10b981\" />\n  <circle cx=\"390\" cy=\"40\" r=\"5\" fill=\"#10b981\" />\n  <circle cx=\"390\" cy=\"180\" r=\"5\" fill=\"#10b981\" />\n  <circle cx=\"460\" cy=\"70\" r=\"5\" fill=\"#10b981\" />\n  <circle cx=\"460\" cy=\"150\" r=\"5\" fill=\"#10b981\" />\n</svg>",
        "options": [
            "A. No, they are not isomorphic because the edge connecting the two vertices of degree 3 in the graph on the left is a cut edge, and the graph on the right does not have that property",
            "B. No, they are not isomorphic because the graph on the left is not connected, and the graph on the right is connected",
            "C. No, they are not isomorphic because they do not have the same number of simple circuits of length 3",
            "D. Yes, they are isomorphic",
            "E. None of the other choices is correct"
        ],
        "answer": "A",
        "explanation": [
            "Bước 1: Kiểm tra các điều kiện cần cơ bản cho sự đẳng cấu (số đỉnh, số cạnh, dãy bậc): Cả hai đồ thị đều có cùng số đỉnh và cùng dãy bậc.",
            "Bước 2: Xét cấu trúc liên thông và cạnh cầu (cut edge):",
            "- Ở đồ thị bên trái, cạnh nối hai đỉnh bậc 3 ở ngoài cùng bên trái là một cạnh cầu (cut edge) mà khi loại bỏ nó cấu trúc liên thông bị ảnh hưởng đặc trưng.",
            "- Ở đồ thị bên phải, đồ thị là 2-liên thông cạnh và không tồn tại cạnh nào nối hai đỉnh bậc 3 là một cạnh cầu.",
            "Do đó hai đồ thị không đẳng cấu vì đồ thị bên trái có cạnh nối hai đỉnh bậc 3 là một cầu, còn đồ thị bên phải không có tính chất này (chọn A)."
        ],
        "chapter": "Ch8_Graphs",
        "difficulty": "hard",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_019_results.json",
        "original_image": "0740_q740_Question_740.png"
    },
    {
        "id": 741,
        "question": "Hai đồ thị sau đây có đẳng cấu với nhau không? Nếu không, nguyên nhân là gì (Are these two graphs isomorphic? If not, what is the reason)?\n\n<svg viewBox=\"0 0 520 200\" width=\"480\" height=\"180\" xmlns=\"http://www.w3.org/2000/svg\" style=\"background:#ffffff; border:1px solid #e2e8f0; border-radius:8px; display:block; margin:10px auto;\">\n  <text x=\"130\" y=\"25\" font-family=\"sans-serif\" font-size=\"14\" font-weight=\"bold\" fill=\"#1e293b\" text-anchor=\"middle\">Đồ thị G1 (Trái)</text>\n  <line x1=\"60\" y1=\"100\" x2=\"110\" y2=\"50\" stroke=\"#334155\" stroke-width=\"2\" />\n  <line x1=\"60\" y1=\"100\" x2=\"110\" y2=\"150\" stroke=\"#334155\" stroke-width=\"2\" />\n  <line x1=\"110\" y1=\"50\" x2=\"110\" y2=\"150\" stroke=\"#ef4444\" stroke-width=\"2.5\" />\n  <line x1=\"110\" y1=\"50\" x2=\"170\" y2=\"50\" stroke=\"#334155\" stroke-width=\"2\" />\n  <line x1=\"110\" y1=\"150\" x2=\"170\" y2=\"150\" stroke=\"#334155\" stroke-width=\"2\" />\n  <line x1=\"170\" y1=\"50\" x2=\"170\" y2=\"150\" stroke=\"#ef4444\" stroke-width=\"2.5\" />\n  <line x1=\"170\" y1=\"50\" x2=\"220\" y2=\"100\" stroke=\"#334155\" stroke-width=\"2\" />\n  <line x1=\"170\" y1=\"150\" x2=\"220\" y2=\"100\" stroke=\"#334155\" stroke-width=\"2\" />\n  <circle cx=\"60\" cy=\"100\" r=\"5\" fill=\"#2563eb\" />\n  <circle cx=\"110\" cy=\"50\" r=\"5\" fill=\"#2563eb\" />\n  <circle cx=\"110\" cy=\"150\" r=\"5\" fill=\"#2563eb\" />\n  <circle cx=\"170\" cy=\"50\" r=\"5\" fill=\"#2563eb\" />\n  <circle cx=\"170\" cy=\"150\" r=\"5\" fill=\"#2563eb\" />\n  <circle cx=\"220\" cy=\"100\" r=\"5\" fill=\"#2563eb\" />\n  <text x=\"390\" y=\"25\" font-family=\"sans-serif\" font-size=\"14\" font-weight=\"bold\" fill=\"#1e293b\" text-anchor=\"middle\">Đồ thị G2 (Phải)</text>\n  <line x1=\"320\" y1=\"100\" x2=\"370\" y2=\"50\" stroke=\"#334155\" stroke-width=\"2\" />\n  <line x1=\"320\" y1=\"100\" x2=\"370\" y2=\"150\" stroke=\"#334155\" stroke-width=\"2\" />\n  <line x1=\"370\" y1=\"50\" x2=\"430\" y2=\"50\" stroke=\"#334155\" stroke-width=\"2\" />\n  <line x1=\"370\" y1=\"150\" x2=\"430\" y2=\"150\" stroke=\"#334155\" stroke-width=\"2\" />\n  <line x1=\"370\" y1=\"50\" x2=\"430\" y2=\"150\" stroke=\"#10b981\" stroke-width=\"2.5\" />\n  <line x1=\"370\" y1=\"150\" x2=\"430\" y2=\"50\" stroke=\"#10b981\" stroke-width=\"2.5\" />\n  <line x1=\"430\" y1=\"50\" x2=\"480\" y2=\"100\" stroke=\"#334155\" stroke-width=\"2\" />\n  <line x1=\"430\" y1=\"150\" x2=\"480\" y2=\"100\" stroke=\"#334155\" stroke-width=\"2\" />\n  <circle cx=\"320\" cy=\"100\" r=\"5\" fill=\"#10b981\" />\n  <circle cx=\"370\" cy=\"50\" r=\"5\" fill=\"#10b981\" />\n  <circle cx=\"370\" cy=\"150\" r=\"5\" fill=\"#10b981\" />\n  <circle cx=\"430\" cy=\"50\" r=\"5\" fill=\"#10b981\" />\n  <circle cx=\"430\" cy=\"150\" r=\"5\" fill=\"#10b981\" />\n  <circle cx=\"480\" cy=\"100\" r=\"5\" fill=\"#10b981\" />\n</svg>",
        "options": [
            "A. No, they are not isomorphic because the graph on the right does not have a simple circuit of length 3",
            "B. No, they are not isomorphic because they do not have the same number of vertices",
            "C. No, they are not isomorphic because they do not have the same number of edges",
            "D. Yes, they are isomorphic",
            "E. None of the other choices is correct"
        ],
        "answer": "A",
        "explanation": [
            "Bước 1: Kiểm tra bất biến số chu trình đơn độ dài 3 (tam giác con):",
            "Số chu trình đơn độ dài 3 là một bất biến đẳng cấu quan trọng. Nếu hai đồ thị đẳng cấu, chúng bắt buộc phải có cùng số chu trình đơn độ dài 3.",
            "Bước 2: Đếm số chu trình đơn độ dài 3 trên hai đồ thị:",
            "- Đồ thị bên trái có 2 tam giác (chu trình đơn độ dài 3): tam giác bên trái tạo bởi đỉnh ngoài cùng và 2 đỉnh giữa liên kết bởi đoạn thẳng đứng; và tam giác bên phải tương tự.",
            "- Đồ thị bên phải thay thế các cạnh đứng bằng các đường chéo đan chéo, tạo thành một đồ thị hai phía không chứa bất kỳ chu trình đơn độ dài 3 nào.",
            "Vì đồ thị bên phải không có chu trình đơn độ dài 3 nên hai đồ thị không thể đẳng cấu (chọn A)."
        ],
        "chapter": "Ch8_Graphs",
        "difficulty": "medium",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_019_results.json",
        "original_image": "0741_q741_Question_741.png"
    },
    {
        "id": 742,
        "question": "Xóa tất cả các cạnh liên thuộc với đỉnh \\(v_6\\) để thu được đồ thị mới. Hỏi đồ thị mới có bao nhiêu thành phần liên thông (Delete all the edges that are incident to \\(v_6\\) to obtain a new graph. How many connected components in the new graph)?\n\n<svg viewBox=\"0 0 340 320\" width=\"300\" height=\"280\" xmlns=\"http://www.w3.org/2000/svg\" style=\"background:#ffffff; border:1px solid #e2e8f0; border-radius:8px; display:block; margin:10px auto;\">\n  <polygon points=\"170,40 280,110 240,230 100,230 60,110\" fill=\"none\" stroke=\"#334155\" stroke-width=\"2\" />\n  <line x1=\"170\" y1=\"90\" x2=\"215\" y2=\"200\" stroke=\"#ef4444\" stroke-width=\"2.5\" />\n  <line x1=\"215\" y1=\"200\" x2=\"100\" y2=\"135\" stroke=\"#334155\" stroke-width=\"2\" />\n  <line x1=\"100\" y1=\"135\" x2=\"240\" y2=\"135\" stroke=\"#334155\" stroke-width=\"2\" />\n  <line x1=\"240\" y1=\"135\" x2=\"125\" y2=\"200\" stroke=\"#334155\" stroke-width=\"2\" />\n  <line x1=\"125\" y1=\"200\" x2=\"170\" y2=\"90\" stroke=\"#ef4444\" stroke-width=\"2.5\" />\n  <line x1=\"170\" y1=\"40\" x2=\"170\" y2=\"90\" stroke=\"#ef4444\" stroke-width=\"2.5\" stroke-dasharray=\"3,3\" />\n  <line x1=\"280\" y1=\"110\" x2=\"240\" y2=\"135\" stroke=\"#334155\" stroke-width=\"2\" />\n  <line x1=\"240\" y1=\"230\" x2=\"215\" y2=\"200\" stroke=\"#334155\" stroke-width=\"2\" />\n  <line x1=\"100\" y1=\"230\" x2=\"125\" y2=\"200\" stroke=\"#334155\" stroke-width=\"2\" />\n  <line x1=\"60\" y1=\"110\" x2=\"100\" y2=\"135\" stroke=\"#334155\" stroke-width=\"2\" />\n  <circle cx=\"170\" cy=\"40\" r=\"6\" fill=\"#2563eb\" /><text x=\"170\" y=\"30\" font-size=\"12\" font-weight=\"bold\" text-anchor=\"middle\" fill=\"#1e293b\">v1</text>\n  <circle cx=\"280\" cy=\"110\" r=\"6\" fill=\"#2563eb\" /><text x=\"295\" y=\"115\" font-size=\"12\" font-weight=\"bold\" text-anchor=\"middle\" fill=\"#1e293b\">v2</text>\n  <circle cx=\"240\" cy=\"230\" r=\"6\" fill=\"#2563eb\" /><text x=\"255\" y=\"245\" font-size=\"12\" font-weight=\"bold\" text-anchor=\"middle\" fill=\"#1e293b\">v3</text>\n  <circle cx=\"100\" cy=\"230\" r=\"6\" fill=\"#2563eb\" /><text x=\"85\" y=\"245\" font-size=\"12\" font-weight=\"bold\" text-anchor=\"middle\" fill=\"#1e293b\">v4</text>\n  <circle cx=\"60\" cy=\"110\" r=\"6\" fill=\"#2563eb\" /><text x=\"45\" y=\"115\" font-size=\"12\" font-weight=\"bold\" text-anchor=\"middle\" fill=\"#1e293b\">v5</text>\n  <circle cx=\"170\" cy=\"90\" r=\"7\" fill=\"#ef4444\" /><text x=\"170\" y=\"82\" font-size=\"12\" font-weight=\"bold\" text-anchor=\"middle\" fill=\"#ef4444\">v6</text>\n  <circle cx=\"240\" cy=\"135\" r=\"5\" fill=\"#2563eb\" /><text x=\"250\" y=\"145\" font-size=\"11\" text-anchor=\"start\" fill=\"#1e293b\">v7</text>\n  <circle cx=\"215\" cy=\"200\" r=\"5\" fill=\"#2563eb\" /><text x=\"225\" y=\"215\" font-size=\"11\" text-anchor=\"start\" fill=\"#1e293b\">v8</text>\n  <circle cx=\"125\" cy=\"200\" r=\"5\" fill=\"#2563eb\" /><text x=\"115\" y=\"215\" font-size=\"11\" text-anchor=\"end\" fill=\"#1e293b\">v9</text>\n  <circle cx=\"100\" cy=\"135\" r=\"5\" fill=\"#2563eb\" /><text x=\"90\" y=\"145\" font-size=\"11\" text-anchor=\"end\" fill=\"#1e293b\">v10</text>\n</svg>",
        "options": [
            "A. 1",
            "B. 3",
            "C. 5",
            "D. 4",
            "E. 2",
            "F. None of the other choices is correct"
        ],
        "answer": "E",
        "explanation": [
            "Bước 1: Phân tích trạng thái của đỉnh \\(v_6\\): Khi xóa tất cả các cạnh liên thuộc với \\(v_6\\) (gồm cạnh nối với \\(v_1, v_8, v_9\\)), đỉnh \\(v_6\\) không còn cạnh nào nối với bất kỳ đỉnh nào khác và trở thành một đỉnh cô lập. Đỉnh cô lập này cấu thành 1 thành phần liên thông riêng lẻ.",
            "Bước 2: Phân tích 9 đỉnh còn lại của đồ thị Petersen:",
            "- Chu trình ngũ giác bên ngoài \\(v_1 - v_2 - v_3 - v_4 - v_5 - v_1\\) vẫn còn nguyên vẹn, đảm bảo cả 5 đỉnh ngoài cùng đều liên thông.",
            "- Bốn nan hoa \\(v_2-v_7, v_3-v_8, v_4-v_9, v_5-v_{10}\\) liên kết các đỉnh \\(v_7, v_8, v_9, v_{10}\\) trực tiếp vào chu trình ngoài.",
            "- Do đó, toàn bộ 9 đỉnh \\(\\{v_1, v_2, v_3, v_4, v_5, v_7, v_8, v_9, v_{10}\\}\\) vẫn thuộc về 1 thành phần liên thông duy nhất.",
            "Tổng số thành phần liên thông của đồ thị mới là \\(1 + 1 = 2\\) (chọn E)."
        ],
        "chapter": "Ch8_Graphs",
        "difficulty": "medium",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_019_results.json",
        "original_image": "0742_q742_Question_742.png"
    },
    {
        "id": 743,
        "question": "Cho đa đồ thị vô hướng gồm ba đỉnh \\(A, B, C\\) với ma trận kề (theo thứ tự các đỉnh) là:\n\\[\nM = \\begin{bmatrix}\n0 & 3 & 1 \\\\\n3 & 1 & 1 \\\\\n1 & 1 & 1\n\\end{bmatrix}\n\\]\nHỏi có bao nhiêu đường đi độ dài 2 từ đỉnh \\(B\\) đến đỉnh \\(C\\)?",
        "options": [
            "A. 2",
            "B. 4",
            "C. 5",
            "D. 7",
            "E. None of the other choices is correct"
        ],
        "answer": "C",
        "explanation": [
            "Bước 1: Áp dụng định lý về lũy thừa của ma trận kề: Số đường đi độ dài \\(k\\) giữa đỉnh thứ \\(i\\) và đỉnh thứ \\(j\\) bằng phần tử \\((M^k)_{i, j}\\).",
            "Bước 2: Với \\(k = 2\\), đỉnh \\(B\\) ứng với hàng 2 và đỉnh \\(C\\) ứng với cột 3:",
            "\\[ (M^2)_{2, 3} = \\sum_{k=1}^3 M_{2, k} M_{k, 3} \\]",
            "- Hàng 2 của \\(M\\) là: \\([3, 1, 1]\\).",
            "- Cột 3 của \\(M\\) là: \\([1, 1, 1]^T\\).",
            "\\[ (M^2)_{2, 3} = (3 \\times 1) + (1 \\times 1) + (1 \\times 1) = 3 + 1 + 1 = 5 \\]",
            "Do đó có 5 đường đi độ dài 2 từ \\(B\\) đến \\(C\\) (chọn C)."
        ],
        "chapter": "Ch8_Graphs",
        "difficulty": "medium",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_019_results.json",
        "original_image": "0743_q743_Question_743.png"
    },
    {
        "id": 744,
        "question": "Đồ thị có hướng sau đây có bao nhiêu thành phần liên thông mạnh (How many strongly connected components does this directed graph have)?\n\n<svg viewBox=\"0 0 380 200\" width=\"350\" height=\"180\" xmlns=\"http://www.w3.org/2000/svg\" style=\"background:#ffffff; border:1px solid #e2e8f0; border-radius:8px; display:block; margin:10px auto;\">\n  <defs>\n    <marker id=\"arrow-744-b\" viewBox=\"0 0 10 10\" refX=\"8\" refY=\"5\" markerWidth=\"6\" markerHeight=\"6\" orient=\"auto-start-reverse\">\n      <path d=\"M 0 1 L 10 5 L 0 9 z\" fill=\"#2563eb\" />\n    </marker>\n    <marker id=\"arrow-red-744-b\" viewBox=\"0 0 10 10\" refX=\"8\" refY=\"5\" markerWidth=\"6\" markerHeight=\"6\" orient=\"auto-start-reverse\">\n      <path d=\"M 0 1 L 10 5 L 0 9 z\" fill=\"#ef4444\" />\n    </marker>\n  </defs>\n  <line x1=\"60\" y1=\"50\" x2=\"160\" y2=\"50\" stroke=\"#2563eb\" stroke-width=\"2\" marker-end=\"url(#arrow-744-b)\" />\n  <line x1=\"300\" y1=\"50\" x2=\"180\" y2=\"50\" stroke=\"#2563eb\" stroke-width=\"2\" marker-end=\"url(#arrow-744-b)\" />\n  <line x1=\"300\" y1=\"50\" x2=\"218\" y2=\"135\" stroke=\"#2563eb\" stroke-width=\"2\" marker-end=\"url(#arrow-744-b)\" />\n  <path d=\"M 55 50 Q 40 95 55 140\" fill=\"none\" stroke=\"#ef4444\" stroke-width=\"2\" marker-end=\"url(#arrow-red-744-b)\" />\n  <path d=\"M 65 140 Q 80 95 65 50\" fill=\"none\" stroke=\"#ef4444\" stroke-width=\"2\" marker-end=\"url(#arrow-red-744-b)\" />\n  <path d=\"M 60 135 Q 135 120 210 135\" fill=\"none\" stroke=\"#ef4444\" stroke-width=\"2\" marker-end=\"url(#arrow-red-744-b)\" />\n  <path d=\"M 210 145 Q 135 160 60 145\" fill=\"none\" stroke=\"#ef4444\" stroke-width=\"2\" marker-end=\"url(#arrow-red-744-b)\" />\n  <path d=\"M 55 140 C 25 125, 25 155, 55 145\" fill=\"none\" stroke=\"#ef4444\" stroke-width=\"1.8\" marker-end=\"url(#arrow-red-744-b)\" />\n  <circle cx=\"60\" cy=\"50\" r=\"6\" fill=\"#ef4444\" /><text x=\"60\" y=\"35\" font-size=\"14\" font-weight=\"bold\" text-anchor=\"middle\" fill=\"#1e293b\">a</text>\n  <circle cx=\"170\" cy=\"50\" r=\"6\" fill=\"#f59e0b\" /><text x=\"170\" y=\"35\" font-size=\"14\" font-weight=\"bold\" text-anchor=\"middle\" fill=\"#1e293b\">b</text>\n  <circle cx=\"300\" cy=\"50\" r=\"6\" fill=\"#10b981\" /><text x=\"300\" y=\"35\" font-size=\"14\" font-weight=\"bold\" text-anchor=\"middle\" fill=\"#1e293b\">c</text>\n  <circle cx=\"210\" cy=\"140\" r=\"6\" fill=\"#ef4444\" /><text x=\"210\" y=\"160\" font-size=\"14\" font-weight=\"bold\" text-anchor=\"middle\" fill=\"#1e293b\">d</text>\n  <circle cx=\"60\" cy=\"140\" r=\"6\" fill=\"#ef4444\" /><text x=\"75\" y=\"155\" font-size=\"14\" font-weight=\"bold\" text-anchor=\"middle\" fill=\"#1e293b\">e</text>\n</svg>",
        "options": [
            "A. 1",
            "B. 2",
            "C. 3",
            "D. 4"
        ],
        "answer": "C",
        "explanation": [
            "Bước 1: Nhắc lại định nghĩa thành phần liên thông mạnh (SCC): Một tập đỉnh mà giữa hai đỉnh bất kỳ luôn có đường đi có hướng cả hai chiều.",
            "Bước 2: Phân tích khả năng đi lại giữa các đỉnh:",
            "- Tập \\(\\{a, d, e\\}\\): Ta có cặp cung ngược chiều \\(a \\leftrightarrow e\\) và \\(e \\leftrightarrow d\\). Do đó \\(a, d, e\\) đều đến được nhau hai chiều, tạo thành 1 thành phần liên thông mạnh.",
            "- Đỉnh \\(b\\): Chỉ có cung đi vào (từ \\(a\\) và \\(c\\)), không có bất kỳ cung nào đi ra. Do đó \\(b\\) không thể đi đến đỉnh nào khác. Vậy \\(\\{b\\}\\) là một SCC riêng.",
            "- Đỉnh \\(c\\): Chỉ có cung đi ra (tới \\(b\\) và \\(d\\)), không có cung đi vào từ bất kỳ đỉnh nào. Không đỉnh nào đi tới được \\(c\\). Vậy \\(\\{c\\}\\) là một SCC riêng.",
            "Tổng số thành phần liên thông mạnh là 3: \\(\\{a, d, e\\}\\), \\(\\{b\\}\\), và \\(\\{c\\}\\) (chọn C)."
        ],
        "chapter": "Ch8_Graphs",
        "difficulty": "medium",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_019_results.json",
        "original_image": "0744_q744_Question_744.png"
    },
    {
        "id": 745,
        "question": "Chọn một chu trình Euler của đồ thị sau (Choose an Euler circuit of the graph):\n\n<svg viewBox=\"0 0 460 220\" width=\"420\" height=\"200\" xmlns=\"http://www.w3.org/2000/svg\" style=\"background:#ffffff; border:1px solid #e2e8f0; border-radius:8px; display:block; margin:10px auto;\">\n  <line x1=\"80\" y1=\"50\" x2=\"80\" y2=\"100\" stroke=\"#334155\" stroke-width=\"2\" />\n  <line x1=\"80\" y1=\"50\" x2=\"140\" y2=\"100\" stroke=\"#334155\" stroke-width=\"2\" />\n  <line x1=\"80\" y1=\"100\" x2=\"80\" y2=\"150\" stroke=\"#334155\" stroke-width=\"2\" />\n  <line x1=\"80\" y1=\"100\" x2=\"140\" y2=\"100\" stroke=\"#334155\" stroke-width=\"2\" />\n  <line x1=\"80\" y1=\"150\" x2=\"140\" y2=\"150\" stroke=\"#334155\" stroke-width=\"2\" />\n  <line x1=\"140\" y1=\"150\" x2=\"140\" y2=\"100\" stroke=\"#334155\" stroke-width=\"2\" />\n  <line x1=\"140\" y1=\"100\" x2=\"260\" y2=\"100\" stroke=\"#334155\" stroke-width=\"2\" />\n  <line x1=\"260\" y1=\"50\" x2=\"260\" y2=\"100\" stroke=\"#334155\" stroke-width=\"2\" />\n  <line x1=\"260\" y1=\"50\" x2=\"320\" y2=\"100\" stroke=\"#334155\" stroke-width=\"2\" />\n  <line x1=\"260\" y1=\"100\" x2=\"260\" y2=\"150\" stroke=\"#334155\" stroke-width=\"2\" />\n  <line x1=\"260\" y1=\"100\" x2=\"320\" y2=\"100\" stroke=\"#334155\" stroke-width=\"2\" />\n  <line x1=\"260\" y1=\"150\" x2=\"320\" y2=\"150\" stroke=\"#334155\" stroke-width=\"2\" />\n  <line x1=\"320\" y1=\"150\" x2=\"320\" y2=\"100\" stroke=\"#334155\" stroke-width=\"2\" />\n  <path d=\"M 80 100 Q 200 170 320 100\" fill=\"none\" stroke=\"#2563eb\" stroke-width=\"2\" stroke-dasharray=\"4,3\" />\n  <circle cx=\"80\" cy=\"50\" r=\"5\" fill=\"#1e293b\" /><text x=\"70\" y=\"45\" font-size=\"12\" font-weight=\"bold\">a</text>\n  <circle cx=\"260\" cy=\"50\" r=\"5\" fill=\"#1e293b\" /><text x=\"250\" y=\"45\" font-size=\"12\" font-weight=\"bold\">b</text>\n  <circle cx=\"80\" cy=\"100\" r=\"5\" fill=\"#1e293b\" /><text x=\"65\" y=\"105\" font-size=\"12\" font-weight=\"bold\">c</text>\n  <circle cx=\"140\" cy=\"100\" r=\"5\" fill=\"#1e293b\" /><text x=\"150\" y=\"105\" font-size=\"12\" font-weight=\"bold\">d</text>\n  <circle cx=\"260\" cy=\"100\" r=\"5\" fill=\"#1e293b\" /><text x=\"245\" y=\"105\" font-size=\"12\" font-weight=\"bold\">e</text>\n  <circle cx=\"320\" cy=\"100\" r=\"5\" fill=\"#1e293b\" /><text x=\"330\" y=\"105\" font-size=\"12\" font-weight=\"bold\">f</text>\n  <circle cx=\"80\" cy=\"150\" r=\"5\" fill=\"#1e293b\" /><text x=\"65\" y=\"160\" font-size=\"12\" font-weight=\"bold\">g</text>\n  <circle cx=\"140\" cy=\"150\" r=\"5\" fill=\"#1e293b\" /><text x=\"150\" y=\"160\" font-size=\"12\" font-weight=\"bold\">h</text>\n  <circle cx=\"260\" cy=\"150\" r=\"5\" fill=\"#1e293b\" /><text x=\"245\" y=\"160\" font-size=\"12\" font-weight=\"bold\">i</text>\n  <circle cx=\"320\" cy=\"150\" r=\"5\" fill=\"#1e293b\" /><text x=\"330\" y=\"160\" font-size=\"12\" font-weight=\"bold\">j</text>\n</svg>",
        "options": [
            "A. The graph has no Euler circuits",
            "B. d - e - f - b - e - i - j - f - c - a - d - h - g - c - a - d",
            "C. a - d - e - b - f - e - d - c - f - j - i - e - d - h - g - c - a",
            "D. a - d - e - b - f - j - i - e - f - c - d - h - g - c - a",
            "E. None of the other choices is correct"
        ],
        "answer": "D",
        "explanation": [
            "Bước 1: Kiểm tra tính tồn tại của chu trình Euler: Đồ thị có 10 đỉnh và 14 cạnh. Bậc của tất cả 10 đỉnh đều là số chẵn (bậc 2 hoặc bậc 4). Đồ thị liên thông nên chắc chắn có chu trình Euler.",
            "Bước 2: Kiểm tra lộ trình trong phương án D:",
            "Dãy đỉnh \\(a - d - e - b - f - j - i - e - f - c - d - h - g - c - a\\) lần lượt đi qua các cạnh:",
            "1. \\((a,d)\\), 2. \\((d,e)\\), 3. \\((e,b)\\), 4. \\((b,f)\\), 5. \\((f,j)\\), 6. \\((j,i)\\), 7. \\((i,e)\\), 8. \\((e,f)\\), 9. \\((f,c)\\) (cung đáy), 10. \\((c,d)\\), 11. \\((d,h)\\), 12. \\((h,g)\\), 13. \\((g,c)\\), 14. \\((c,a)\\).",
            "Lộ trình này đi qua đúng 14 cạnh phân biệt của đồ thị, mỗi cạnh đúng một lần và quay về đỉnh ban đầu \\(a\\). Do đó đây là một chu trình Euler hợp lệ (chọn D)."
        ],
        "chapter": "Ch8_Graphs",
        "difficulty": "medium",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_019_results.json",
        "original_image": "0745_q745_Question_745.png"
    },
    {
        "id": 746,
        "question": "Những đồ thị nào sau đây có chu trình Euler (Euler circuits)?\n(i) \\(K_4\\)\n(ii) \\(C_4\\)\n(iii) \\(C_5\\)\n(iv) \\(Q_3\\)",
        "options": [
            "A. (i)",
            "B. (iv)",
            "C. (ii) and (iii)",
            "D. (i) and (ii)"
        ],
        "answer": "C",
        "explanation": [
            "Bước 1: Điều kiện cần và đủ để đồ thị liên thông có chu trình Euler: Tất cả các đỉnh của đồ thị đều phải có bậc chẵn.",
            "Bước 2: Kiểm tra bậc các đỉnh của từng đồ thị:",
            "- \\(K_4\\): Đồ thị đầy đủ 4 đỉnh, mỗi đỉnh có bậc \\(4 - 1 = 3\\) (bậc lẻ) \\(\\implies\\) Không có chu trình Euler.",
            "- \\(C_4\\): Chu trình 4 đỉnh, mỗi đỉnh có bậc 2 (chẵn) \\(\\implies\\) Có chu trình Euler.",
            "- \\(C_5\\): Chu trình 5 đỉnh, mỗi đỉnh có bậc 2 (chẵn) \\(\\implies\\) Có chu trình Euler.",
            "- \\(Q_3\\): Siêu lập phương 3 chiều, mỗi đỉnh có bậc 3 (bậc lẻ) \\(\\implies\\) Không có chu trình Euler.",
            "Vậy các đồ thị có chu trình Euler là (ii) và (iii) (chọn C)."
        ],
        "chapter": "Ch8_Graphs",
        "difficulty": "easy",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_019_results.json",
        "original_image": "0746_q746_Question_746.png"
    },
    {
        "id": 747,
        "question": "Với các giá trị nào của \\(n\\) thì đồ thị đầy đủ \\(K_n\\) KHÔNG có chu trình Euler (NO Euler circuits)?",
        "options": [
            "A. Any \\(n > 2\\)",
            "B. \\(n\\) is odd",
            "C. None of the other choices is correct",
            "D. \\(n\\) is even"
        ],
        "answer": "D",
        "explanation": [
            "Bước 1: Xét bậc của mỗi đỉnh trong đồ thị đầy đủ \\(K_n\\):",
            "Mỗi đỉnh trong \\(K_n\\) đều nối với tất cả \\(n - 1\\) đỉnh còn lại, do đó \\(\\deg(v) = n - 1\\).",
            "Bước 2: Xét tính chẵn/lẻ của bậc:",
            "- \\(K_n\\) có chu trình Euler khi và chỉ khi \\(n - 1\\) là số chẵn, tức \\(n\\) là số lẻ.",
            "- Ngược lại, \\(K_n\\) không có chu trình Euler khi \\(n - 1\\) là số lẻ, tức \\(n\\) là số chẵn.",
            "Do đó \\(K_n\\) không có chu trình Euler khi \\(n\\) là số chẵn ('n is even', chọn D)."
        ],
        "chapter": "Ch8_Graphs",
        "difficulty": "easy",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_019_results.json",
        "original_image": "0747_q747_Question_747.png"
    },
    {
        "id": 748,
        "question": "Cho \\(m > n > 2\\). Đồ thị nào sau đây KHÔNG có chu trình Hamilton (do NOT have Hamilton circuits)?",
        "options": [
            "A. \\(K_{m,n}\\)",
            "B. \\(C_n\\)",
            "C. \\(Q_n\\)",
            "D. \\(K_n\\)",
            "E. \\(W_n\\)",
            "F. None of the other choices is correct"
        ],
        "answer": "A",
        "explanation": [
            "Bước 1: Điều kiện cần để đồ thị hai phía \\(K_{m,n}\\) có chu trình Hamilton:",
            "Trong một chu trình, các đỉnh phải luân phiên đi giữa hai tập đỉnh của đồ thị hai phía. Do đó, để đi qua tất cả các đỉnh và quay lại đỉnh xuất phát, hai tập phân hoạch bắt buộc phải có cùng số lượng đỉnh: \\(|V_1| = |V_2|\\), tức \\(m = n\\).",
            "Bước 2: Vì \\(m > n > 2\\), ta có \\(m \\ne n\\), do đó \\(K_{m,n}\\) không thể có chu trình Hamilton.",
            "Các đồ thị \\(C_n, Q_n, K_n, W_n\\) đều luôn có chu trình Hamilton.",
            "Vậy đồ thị không có chu trình Hamilton là \\(K_{m,n}\\) (chọn A)."
        ],
        "chapter": "Ch8_Graphs",
        "difficulty": "medium",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_019_results.json",
        "original_image": "0748_q748_Question_748.png"
    },
    {
        "id": 749,
        "question": "Cho hai đồ thị vô hướng có ma trận kề sau:\n\\[\nX = \\begin{bmatrix}\n0 & 1 & 2 & 1 \\\\\n1 & 0 & 1 & 0 \\\\\n2 & 1 & 0 & 1 \\\\\n1 & 0 & 1 & 0\n\\end{bmatrix}, \\quad\nY = \\begin{bmatrix}\n0 & 1 & 2 & 1 \\\\\n1 & 0 & 2 & 0 \\\\\n2 & 2 & 0 & 1 \\\\\n1 & 0 & 1 & 0\n\\end{bmatrix}\n\\]\nĐồ thị nào có chu trình Euler (Euler circuits)?",
        "options": [
            "A. X",
            "B. Y",
            "C. X and Y",
            "D. None of the other choices is correct"
        ],
        "answer": "A",
        "explanation": [
            "Bước 1: Tính bậc của từng đỉnh từ ma trận kề (bằng tổng các phần tử trên từng hàng):",
            "Với đồ thị \\(X\\):",
            "- Hàng 1: \\(0 + 1 + 2 + 1 = 4\\) (chẵn)",
            "- Hàng 2: \\(1 + 0 + 1 + 0 = 2\\) (chẵn)",
            "- Hàng 3: \\(2 + 1 + 0 + 1 = 4\\) (chẵn)",
            "- Hàng 4: \\(1 + 0 + 1 + 0 = 2\\) (chẵn)",
            "Tất cả các đỉnh của \\(X\\) đều có bậc chẵn và đồ thị liên thông nên \\(X\\) có chu trình Euler.",
            "Bước 2: Với đồ thị \\(Y\\):",
            "- Hàng 2: \\(1 + 0 + 2 + 0 = 3\\) (lẻ)",
            "- Hàng 3: \\(2 + 2 + 0 + 1 = 5\\) (lẻ)",
            "Do có các đỉnh bậc lẻ, đồ thị \\(Y\\) không có chu trình Euler.",
            "Vậy chỉ có đồ thị \\(X\\) có chu trình Euler (chọn A)."
        ],
        "chapter": "Ch8_Graphs",
        "difficulty": "medium",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_019_results.json",
        "original_image": "0749_q749_Question_749.png"
    },
    {
        "id": 750,
        "question": "Chọn khẳng định đúng về hai đồ thị \\(G\\) và \\(H\\) sau đây (Choose the correct statement about the graphs):\n\n<svg viewBox=\"0 0 460 260\" width=\"420\" height=\"240\" xmlns=\"http://www.w3.org/2000/svg\" style=\"background:#ffffff; border:1px solid #e2e8f0; border-radius:8px; display:block; margin:10px auto;\">\n  <text x=\"60\" y=\"70\" font-family=\"sans-serif\" font-size=\"16\" font-weight=\"bold\" fill=\"#1e293b\">G</text>\n  <line x1=\"110\" y1=\"30\" x2=\"110\" y2=\"110\" stroke=\"#f59e0b\" stroke-width=\"2.5\" />\n  <line x1=\"110\" y1=\"30\" x2=\"180\" y2=\"70\" stroke=\"#f59e0b\" stroke-width=\"2.5\" />\n  <line x1=\"110\" y1=\"110\" x2=\"180\" y2=\"70\" stroke=\"#f59e0b\" stroke-width=\"2.5\" />\n  <line x1=\"180\" y1=\"70\" x2=\"260\" y2=\"70\" stroke=\"#f59e0b\" stroke-width=\"2.5\" />\n  <line x1=\"260\" y1=\"70\" x2=\"330\" y2=\"30\" stroke=\"#f59e0b\" stroke-width=\"2.5\" />\n  <line x1=\"260\" y1=\"70\" x2=\"330\" y2=\"110\" stroke=\"#f59e0b\" stroke-width=\"2.5\" />\n  <line x1=\"330\" y1=\"30\" x2=\"330\" y2=\"110\" stroke=\"#f59e0b\" stroke-width=\"2.5\" />\n  <circle cx=\"110\" cy=\"30\" r=\"5\" fill=\"#2563eb\" />\n  <circle cx=\"110\" cy=\"110\" r=\"5\" fill=\"#2563eb\" />\n  <circle cx=\"180\" cy=\"70\" r=\"5\" fill=\"#2563eb\" />\n  <circle cx=\"260\" cy=\"70\" r=\"5\" fill=\"#2563eb\" />\n  <circle cx=\"330\" cy=\"30\" r=\"5\" fill=\"#2563eb\" />\n  <circle cx=\"330\" cy=\"110\" r=\"5\" fill=\"#2563eb\" />\n  <text x=\"60\" y=\"200\" font-family=\"sans-serif\" font-size=\"16\" font-weight=\"bold\" fill=\"#1e293b\">H</text>\n  <line x1=\"110\" y1=\"160\" x2=\"110\" y2=\"240\" stroke=\"#334155\" stroke-width=\"2.5\" />\n  <line x1=\"110\" y1=\"160\" x2=\"180\" y2=\"200\" stroke=\"#334155\" stroke-width=\"2.5\" />\n  <line x1=\"110\" y1=\"240\" x2=\"180\" y2=\"200\" stroke=\"#334155\" stroke-width=\"2.5\" />\n  <line x1=\"180\" y1=\"200\" x2=\"260\" y2=\"200\" stroke=\"#334155\" stroke-width=\"2.5\" />\n  <line x1=\"260\" y1=\"200\" x2=\"330\" y2=\"160\" stroke=\"#334155\" stroke-width=\"2.5\" />\n  <line x1=\"260\" y1=\"200\" x2=\"330\" y2=\"240\" stroke=\"#334155\" stroke-width=\"2.5\" />\n  <line x1=\"330\" y1=\"160\" x2=\"330\" y2=\"240\" stroke=\"#334155\" stroke-width=\"2.5\" />\n  <line x1=\"110\" y1=\"240\" x2=\"330\" y2=\"240\" stroke=\"#2563eb\" stroke-width=\"2.5\" />\n  <circle cx=\"110\" cy=\"160\" r=\"5\" fill=\"#2563eb\" />\n  <circle cx=\"110\" cy=\"240\" r=\"5\" fill=\"#2563eb\" />\n  <circle cx=\"180\" cy=\"200\" r=\"5\" fill=\"#2563eb\" />\n  <circle cx=\"260\" cy=\"200\" r=\"5\" fill=\"#2563eb\" />\n  <circle cx=\"330\" cy=\"160\" r=\"5\" fill=\"#2563eb\" />\n  <circle cx=\"330\" cy=\"240\" r=\"5\" fill=\"#2563eb\" />\n</svg>",
        "options": [
            "A. Both G and H have Hamilton circuits",
            "B. None of G or H has Hamilton paths",
            "C. G has a Hamilton path and H has a Hamilton circuit.",
            "D. G has a Hamilton circuit and H has a Hamilton path."
        ],
        "answer": "C",
        "explanation": [
            "Bước 1: Phân tích đồ thị \\(G\\):",
            "- Đồ thị \\(G\\) gồm hai tam giác liên kết qua một cầu (cạnh nối ở giữa). Một chu trình đơn không thể đi qua một cạnh cầu để sang nửa bên kia rồi quay lại đỉnh ban đầu mà không đi qua cạnh đó lần thứ hai. Do đó \\(G\\) không có chu trình Hamilton.",
            "- Tuy nhiên, \\(G\\) có đường đi Hamilton: Đi từ đỉnh trên trái \\(\\to\\) đỉnh dưới trái \\(\\to\\) đỉnh giữa trái \\(\\to\\) đỉnh giữa phải \\(\\to\\) đỉnh trên phải \\(\\to\\) đỉnh dưới phải. Lộ trình này đi qua cả 6 đỉnh của \\(G\\).",
            "Bước 2: Phân tích đồ thị \\(H\\):",
            "- Đồ thị \\(H\\) có thêm một cạnh đáy nối giữa đỉnh dưới cùng bên trái và đỉnh dưới cùng bên phải.",
            "- Nhờ có cạnh đáy này, ta thiết lập được chu trình Hamilton khép kín: đỉnh trên trái \\(\\to\\) đỉnh giữa trái \\(\\to\\) đỉnh giữa phải \\(\\to\\) đỉnh trên phải \\(\\to\\) đỉnh dưới phải \\(\\to\\) đỉnh dưới trái \\(\\to\\) đỉnh trên trái.",
            "Vậy \\(G\\) có đường đi Hamilton và \\(H\\) có chu trình Hamilton (chọn C)."
        ],
        "chapter": "Ch8_Graphs",
        "difficulty": "medium",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_019_results.json",
        "original_image": "0750_q750_Question_750.png"
    },
    {
        "id": 751,
        "question": "Với những giá trị nào của \\(n\\) thì đồ thị bánh xe \\(W_n\\) có đường đi Euler nhưng KHÔNG có chu trình Euler (Euler paths but no Euler circuits)?",
        "options": [
            "A. \\(n > 2\\)",
            "B. \\(n\\) is odd",
            "C. No values of n",
            "D. \\(n\\) is even",
            "E. None of the other choices is correct"
        ],
        "answer": "C",
        "explanation": [
            "Bước 1: Điều kiện để đồ thị có đường đi Euler nhưng không có chu trình Euler: Đồ thị phải có ĐÚNG HAI đỉnh bậc lẻ.",
            "Bước 2: Xét bậc của các đỉnh trong đồ thị bánh xe \\(W_n\\) (với \\(n \\ge 3\\)):",
            "- Đỉnh tâm có bậc là \\(n\\).",
            "- Mỗi đỉnh trên vành ngoài có bậc là 3 (gồm 2 cạnh trên chu trình \\(C_n\\) và 1 cạnh nối với tâm). Bậc 3 là số lẻ.",
            "- Vì có \\(n\\) đỉnh trên vành với \\(n \\ge 3\\), nên số đỉnh bậc lẻ luôn ít nhất là \\(n \\ge 3\\) (khi \\(n\\) chẵn có \\(n \\ge 4\\) đỉnh lẻ; khi \\(n\\) lẻ cả đỉnh tâm và \\(n\\) đỉnh vành đều lẻ, tức có \\(n + 1 \\ge 4\\) đỉnh lẻ).",
            "- Vì số đỉnh bậc lẻ không bao giờ bằng 2, đồ thị \\(W_n\\) không thể có đường đi Euler.",
            "Do đó không tồn tại giá trị nào của \\(n\\) ('No values of n', chọn C)."
        ],
        "chapter": "Ch8_Graphs",
        "difficulty": "medium",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_019_results.json",
        "original_image": "0751_q751_Question_751.png"
    },
    {
        "id": 752,
        "question": "Tìm thứ tự 3 đỉnh đầu tiên được chọn khi áp dụng thuật toán Dijkstra để tìm đường đi ngắn nhất từ \\(A\\) đến \\(Z\\) (Find the first 3 vertices when using Dijkstra's algorithm to find the shortest path from A to Z):\n\n<svg viewBox=\"0 0 460 220\" width=\"420\" height=\"200\" xmlns=\"http://www.w3.org/2000/svg\" style=\"background:#ffffff; border:1px solid #e2e8f0; border-radius:8px; display:block; margin:10px auto;\">\n  <line x1=\"60\" y1=\"110\" x2=\"140\" y2=\"40\" stroke=\"#334155\" stroke-width=\"2\" />\n  <text x=\"90\" y=\"65\" font-size=\"13\" font-weight=\"bold\" fill=\"#ef4444\">2</text>\n  <line x1=\"60\" y1=\"110\" x2=\"140\" y2=\"180\" stroke=\"#334155\" stroke-width=\"2\" />\n  <text x=\"90\" y=\"160\" font-size=\"13\" font-weight=\"bold\" fill=\"#ef4444\">9</text>\n  <line x1=\"140\" y1=\"40\" x2=\"140\" y2=\"180\" stroke=\"#334155\" stroke-width=\"2\" />\n  <text x=\"125\" y=\"115\" font-size=\"13\" font-weight=\"bold\" fill=\"#ef4444\">8</text>\n  <line x1=\"140\" y1=\"40\" x2=\"280\" y2=\"40\" stroke=\"#334155\" stroke-width=\"2\" />\n  <text x=\"210\" y=\"30\" font-size=\"13\" font-weight=\"bold\" fill=\"#ef4444\">7</text>\n  <line x1=\"140\" y1=\"40\" x2=\"280\" y2=\"180\" stroke=\"#334155\" stroke-width=\"2\" />\n  <text x=\"200\" y=\"95\" font-size=\"13\" font-weight=\"bold\" fill=\"#ef4444\">3</text>\n  <line x1=\"140\" y1=\"180\" x2=\"280\" y2=\"180\" stroke=\"#334155\" stroke-width=\"2\" />\n  <text x=\"210\" y=\"195\" font-size=\"13\" font-weight=\"bold\" fill=\"#ef4444\">3</text>\n  <line x1=\"280\" y1=\"40\" x2=\"280\" y2=\"180\" stroke=\"#334155\" stroke-width=\"2\" />\n  <text x=\"265\" y=\"115\" font-size=\"13\" font-weight=\"bold\" fill=\"#ef4444\">4</text>\n  <line x1=\"280\" y1=\"40\" x2=\"360\" y2=\"110\" stroke=\"#334155\" stroke-width=\"2\" />\n  <text x=\"325\" y=\"65\" font-size=\"13\" font-weight=\"bold\" fill=\"#ef4444\">2</text>\n  <line x1=\"280\" y1=\"180\" x2=\"360\" y2=\"110\" stroke=\"#334155\" stroke-width=\"2\" />\n  <text x=\"325\" y=\"160\" font-size=\"13\" font-weight=\"bold\" fill=\"#ef4444\">3</text>\n  <circle cx=\"60\" cy=\"110\" r=\"7\" fill=\"#2563eb\" /><text x=\"40\" y=\"115\" font-size=\"14\" font-weight=\"bold\" fill=\"#1e293b\">A</text>\n  <circle cx=\"140\" cy=\"40\" r=\"7\" fill=\"#2563eb\" /><text x=\"135\" y=\"25\" font-size=\"14\" font-weight=\"bold\" fill=\"#1e293b\">B</text>\n  <circle cx=\"140\" cy=\"180\" r=\"7\" fill=\"#2563eb\" /><text x=\"135\" y=\"205\" font-size=\"14\" font-weight=\"bold\" fill=\"#1e293b\">C</text>\n  <circle cx=\"280\" cy=\"40\" r=\"7\" fill=\"#2563eb\" /><text x=\"280\" y=\"25\" font-size=\"14\" font-weight=\"bold\" fill=\"#1e293b\">D</text>\n  <circle cx=\"280\" cy=\"180\" r=\"7\" fill=\"#2563eb\" /><text x=\"280\" y=\"205\" font-size=\"14\" font-weight=\"bold\" fill=\"#1e293b\">E</text>\n  <circle cx=\"360\" cy=\"110\" r=\"7\" fill=\"#2563eb\" /><text x=\"375\" y=\"115\" font-size=\"14\" font-weight=\"bold\" fill=\"#1e293b\">Z</text>\n</svg>",
        "options": [
            "A. A-B-E",
            "B. A-B-C",
            "C. A-B-D",
            "D. A-B-Z",
            "E. None of the other choices is correct"
        ],
        "answer": "A",
        "explanation": [
            "Bước 1: Khởi tạo khoảng cách xuất phát từ \\(A\\):",
            "\\(d(A) = 0\\), các đỉnh khác có nhãn \\(\\infty\\). Đỉnh cố định đầu tiên là **A**.",
            "Cập nhật các láng giềng của \\(A\\): \\(d(B) = 2\\), \\(d(C) = 9\\).",
            "Bước 2: Chọn đỉnh có nhãn tạm thời nhỏ nhất:",
            "Trong tập chưa cố định \\(\\{B(2), C(9), D(\\infty), E(\\infty), Z(\\infty)\\}\\), đỉnh **B** có khoảng cách nhỏ nhất là 2. Đỉnh cố định thứ hai là **B**.",
            "Cập nhật các láng giềng của \\(B\\):",
            "- \\(d(C) = \\min(9, 2 + 8) = 9\\)",
            "- \\(d(D) = \\min(\\infty, 2 + 7) = 9\\)",
            "- \\(d(E) = \\min(\\infty, 2 + 3) = 5\\)",
            "Bước 3: Chọn đỉnh chưa cố định có khoảng cách nhỏ nhất tiếp theo:",
            "Tập chưa cố định: \\(\\{E(5), C(9), D(9), Z(\\infty)\\}\\). Giá trị nhỏ nhất là đỉnh **E** với \\(d(E) = 5\\). Đỉnh cố định thứ ba là **E**.",
            "Vậy thứ tự 3 đỉnh đầu tiên được chọn là: **A - B - E** (chọn A)."
        ],
        "chapter": "Ch8_Graphs",
        "difficulty": "medium",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_019_results.json",
        "original_image": "0752_q752_Question_752.png"
    },
    {
        "id": 753,
        "question": "Đỉnh thứ tư được chọn khi áp dụng thuật toán Dijkstra để tìm đường đi ngắn nhất từ \\(A\\) đến \\(D\\) trong đồ thị có trọng số sau là đỉnh nào (What is the fourth vertex chosen when using Dijkstra's algorithm to find the shortest path from A to D in this weighted graph)?\n\n<svg viewBox=\"0 0 360 260\" width=\"320\" height=\"240\" xmlns=\"http://www.w3.org/2000/svg\" style=\"background:#ffffff; border:1px solid #e2e8f0; border-radius:8px; display:block; margin:10px auto;\">\n  <line x1=\"110\" y1=\"200\" x2=\"200\" y2=\"200\" stroke=\"#334155\" stroke-width=\"2\" />\n  <text x=\"155\" y=\"218\" font-size=\"13\" font-weight=\"bold\" fill=\"#ef4444\">7</text>\n  <line x1=\"110\" y1=\"200\" x2=\"80\" y2=\"110\" stroke=\"#334155\" stroke-width=\"2\" />\n  <text x=\"80\" y=\"160\" font-size=\"13\" font-weight=\"bold\" fill=\"#ef4444\">14</text>\n  <line x1=\"110\" y1=\"200\" x2=\"160\" y2=\"130\" stroke=\"#334155\" stroke-width=\"2\" />\n  <text x=\"125\" y=\"160\" font-size=\"13\" font-weight=\"bold\" fill=\"#ef4444\">9</text>\n  <line x1=\"200\" y1=\"200\" x2=\"160\" y2=\"130\" stroke=\"#334155\" stroke-width=\"2\" />\n  <text x=\"190\" y=\"160\" font-size=\"13\" font-weight=\"bold\" fill=\"#ef4444\">8</text>\n  <line x1=\"200\" y1=\"200\" x2=\"260\" y2=\"110\" stroke=\"#334155\" stroke-width=\"2\" />\n  <text x=\"245\" y=\"160\" font-size=\"13\" font-weight=\"bold\" fill=\"#ef4444\">15</text>\n  <line x1=\"160\" y1=\"130\" x2=\"80\" y2=\"110\" stroke=\"#334155\" stroke-width=\"2\" />\n  <text x=\"115\" y=\"115\" font-size=\"13\" font-weight=\"bold\" fill=\"#ef4444\">2</text>\n  <line x1=\"160\" y1=\"130\" x2=\"260\" y2=\"110\" stroke=\"#334155\" stroke-width=\"2\" />\n  <text x=\"215\" y=\"115\" font-size=\"13\" font-weight=\"bold\" fill=\"#ef4444\">6</text>\n  <line x1=\"80\" y1=\"110\" x2=\"170\" y2=\"50\" stroke=\"#334155\" stroke-width=\"2\" />\n  <text x=\"115\" y=\"70\" font-size=\"13\" font-weight=\"bold\" fill=\"#ef4444\">9</text>\n  <line x1=\"260\" y1=\"110\" x2=\"170\" y2=\"50\" stroke=\"#334155\" stroke-width=\"2\" />\n  <text x=\"225\" y=\"70\" font-size=\"13\" font-weight=\"bold\" fill=\"#ef4444\">4</text>\n  <circle cx=\"110\" cy=\"200\" r=\"16\" fill=\"#fef3c7\" stroke=\"#1e293b\" stroke-width=\"2\" /><text x=\"110\" y=\"206\" font-size=\"15\" font-weight=\"bold\" text-anchor=\"middle\">A</text>\n  <circle cx=\"200\" cy=\"200\" r=\"16\" fill=\"#fef3c7\" stroke=\"#1e293b\" stroke-width=\"2\" /><text x=\"200\" y=\"206\" font-size=\"15\" font-weight=\"bold\" text-anchor=\"middle\">B</text>\n  <circle cx=\"260\" cy=\"110\" r=\"16\" fill=\"#fef3c7\" stroke=\"#1e293b\" stroke-width=\"2\" /><text x=\"260\" y=\"116\" font-size=\"15\" font-weight=\"bold\" text-anchor=\"middle\">C</text>\n  <circle cx=\"170\" cy=\"50\" r=\"16\" fill=\"#fef3c7\" stroke=\"#1e293b\" stroke-width=\"2\" /><text x=\"170\" y=\"56\" font-size=\"15\" font-weight=\"bold\" text-anchor=\"middle\">D</text>\n  <circle cx=\"80\" cy=\"110\" r=\"16\" fill=\"#fef3c7\" stroke=\"#1e293b\" stroke-width=\"2\" /><text x=\"80\" y=\"116\" font-size=\"15\" font-weight=\"bold\" text-anchor=\"middle\">E</text>\n  <circle cx=\"160\" cy=\"130\" r=\"16\" fill=\"#fef3c7\" stroke=\"#1e293b\" stroke-width=\"2\" /><text x=\"160\" y=\"136\" font-size=\"15\" font-weight=\"bold\" text-anchor=\"middle\">F</text>\n</svg>",
        "options": [
            "A. The vertex C",
            "B. The vertex E",
            "C. The vertex F",
            "D. The vertex D"
        ],
        "answer": "B",
        "explanation": [
            "Bước 1: Mô phỏng thuật toán Dijkstra từ gốc \\(A\\):",
            "- Bước 1: Chọn đỉnh **A** với khoảng cách 0. Cập nhật láng giềng: \\(d(B) = 7\\), \\(d(F) = 9\\), \\(d(E) = 14\\).",
            "- Bước 2: Chọn đỉnh **B** với khoảng cách \\(d(B) = 7\\). Cập nhật láng giềng: \\(d(F) = \\min(9, 7 + 8) = 9\\), \\(d(C) = \\min(\\infty, 7 + 15) = 22\\).",
            "Bước 2: Xác định đỉnh thứ ba và cập nhật nhãn:",
            "- Bước 3: Trong tập chưa cố định \\(\\{F(9), E(14), C(22), D(\\infty)\\}\\), đỉnh nhỏ nhất là **F** với \\(d(F) = 9\\).",
            "Cập nhật láng giềng của \\(F\\):",
            "  + \\(d(E) = \\min(14, 9 + 2) = 11\\)",
            "  + \\(d(C) = \\min(22, 9 + 6) = 15\\)",
            "Bước 3: Chọn đỉnh thứ tư:",
            "Các đỉnh chưa cố định hiện tại gồm: \\(E(11), C(15), D(\\infty)\\).",
            "Đỉnh có khoảng cách nhỏ nhất là **E** với \\(d(E) = 11\\).",
            "Vậy đỉnh thứ tư được chọn chính là đỉnh E ('The vertex E', chọn B)."
        ],
        "chapter": "Ch8_Graphs",
        "difficulty": "medium",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_019_results.json",
        "original_image": "0753_q753_Question_753.png"
    },
    {
        "id": 754,
        "question": "Có bao nhiêu đỉnh trong một cây nhị phân đầy đủ (full binary tree) có 50 lá?",
        "options": [
            "A. None of the other choices is correct",
            "B. 101",
            "C. 99",
            "D. 51",
            "E. 100"
        ],
        "answer": "C",
        "explanation": [
            "Bước 1: Nhắc lại tính chất của cây nhị phân đầy đủ (full binary tree, trong đó mọi đỉnh trong đều có đúng 2 con):",
            "Nếu gọi \\(L\\) là số lá và \\(i\\) là số đỉnh trong, ta có công thức định lý: \\(L = i + 1\\).",
            "Bước 2: Tính tổng số đỉnh \\(n\\):",
            "- Số đỉnh trong: \\(i = L - 1 = 50 - 1 = 49\\).",
            "- Tổng số đỉnh: \\(n = L + i = 2L - 1 = 2 \\times 50 - 1 = 99\\).",
            "Vậy cây nhị phân đầy đủ có 99 đỉnh (chọn C)."
        ],
        "chapter": "Ch9_Trees",
        "difficulty": "easy",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_019_results.json",
        "original_image": "0754_q754_Question_754.png"
    },
    {
        "id": 755,
        "question": "Có bao nhiêu cây không đẳng cấu (non-isomorphic trees) có 4 đỉnh?",
        "options": [
            "A. 4",
            "B. None of the other choices is correct",
            "C. 3",
            "D. 2",
            "E. 1"
        ],
        "answer": "D",
        "explanation": [
            "Bước 1: Mọi cây có 4 đỉnh đều có đúng \\(4 - 1 = 3\\) cạnh và tổng bậc của 4 đỉnh là \\(2 \\times 3 = 6\\).",
            "Bước 2: Phân tích các phân hoạch bậc hợp lệ cho 4 đỉnh:",
            "- Dãy bậc \\((2, 2, 1, 1)\\): Tương ứng duy nhất với đồ thị đường đi \\(P_4\\) (dạng dây xích \\(v_1 - v_2 - v_3 - v_4\\)).",
            "- Dãy bậc \\((3, 1, 1, 1)\\): Tương ứng duy nhất với đồ thị hình sao \\(K_{1,3}\\) (một đỉnh trung tâm bậc 3 nối với 3 đỉnh lá).",
            "Không còn cấu hình cây nào khác cho 4 đỉnh. Vì vậy có đúng 2 cây không đẳng cấu có 4 đỉnh (chọn D)."
        ],
        "chapter": "Ch9_Trees",
        "difficulty": "easy",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_019_results.json",
        "original_image": "0755_q755_Question_755.png"
    },
    {
        "id": 756,
        "question": "Có bao nhiêu cạnh trong một cây có 10000 đỉnh?",
        "options": [
            "A. 10002",
            "B. 10001",
            "C. 9999",
            "D. 10000",
            "E. None of the other choices is correct"
        ],
        "answer": "C",
        "explanation": [
            "Bước 1: Áp dụng định lý cơ bản của lý thuyết đồ thị cây:",
            "Mọi cây có \\(n\\) đỉnh luôn có đúng \\(|E| = n - 1\\) cạnh.",
            "Bước 2: Thay số với \\(n = 10000\\):",
            "\\[ |E| = 10000 - 1 = 9999 \\]",
            "Vậy cây có 9999 cạnh (chọn C)."
        ],
        "chapter": "Ch9_Trees",
        "difficulty": "easy",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_019_results.json",
        "original_image": "0756_q756_Question_756.png"
    },
    {
        "id": 757,
        "question": "Có bao nhiêu đỉnh trong (internal vertices) trong cây sau đây (How many internal vertices in this tree)?\n\n<svg viewBox=\"0 0 360 260\" width=\"320\" height=\"230\" xmlns=\"http://www.w3.org/2000/svg\" style=\"background:#ffffff; border:1px solid #e2e8f0; border-radius:8px; display:block; margin:10px auto;\">\n  <line x1=\"180\" y1=\"40\" x2=\"100\" y2=\"100\" stroke=\"#334155\" stroke-width=\"2\" />\n  <line x1=\"180\" y1=\"40\" x2=\"180\" y2=\"100\" stroke=\"#334155\" stroke-width=\"2\" />\n  <line x1=\"180\" y1=\"40\" x2=\"260\" y2=\"100\" stroke=\"#334155\" stroke-width=\"2\" />\n  <line x1=\"100\" y1=\"100\" x2=\"60\" y2=\"160\" stroke=\"#334155\" stroke-width=\"2\" />\n  <line x1=\"100\" y1=\"100\" x2=\"100\" y2=\"160\" stroke=\"#334155\" stroke-width=\"2\" />\n  <line x1=\"100\" y1=\"100\" x2=\"130\" y2=\"160\" stroke=\"#334155\" stroke-width=\"2\" />\n  <line x1=\"260\" y1=\"100\" x2=\"230\" y2=\"160\" stroke=\"#334155\" stroke-width=\"2\" />\n  <line x1=\"260\" y1=\"100\" x2=\"260\" y2=\"160\" stroke=\"#334155\" stroke-width=\"2\" />\n  <line x1=\"260\" y1=\"100\" x2=\"290\" y2=\"160\" stroke=\"#334155\" stroke-width=\"2\" />\n  <line x1=\"60\" y1=\"160\" x2=\"30\" y2=\"220\" stroke=\"#334155\" stroke-width=\"2\" />\n  <line x1=\"60\" y1=\"160\" x2=\"60\" y2=\"220\" stroke=\"#334155\" stroke-width=\"2\" />\n  <line x1=\"60\" y1=\"160\" x2=\"90\" y2=\"220\" stroke=\"#334155\" stroke-width=\"2\" />\n  <circle cx=\"180\" cy=\"40\" r=\"6\" fill=\"#ef4444\" /><text x=\"180\" y=\"25\" font-size=\"14\" font-weight=\"bold\" text-anchor=\"middle\">a</text>\n  <circle cx=\"100\" cy=\"100\" r=\"6\" fill=\"#ef4444\" /><text x=\"85\" y=\"100\" font-size=\"14\" font-weight=\"bold\" text-anchor=\"middle\">b</text>\n  <circle cx=\"260\" cy=\"100\" r=\"6\" fill=\"#ef4444\" /><text x=\"275\" y=\"100\" font-size=\"14\" font-weight=\"bold\" text-anchor=\"middle\">c</text>\n  <circle cx=\"60\" cy=\"160\" r=\"6\" fill=\"#ef4444\" /><text x=\"45\" y=\"160\" font-size=\"14\" font-weight=\"bold\" text-anchor=\"middle\">e</text>\n  <circle cx=\"180\" cy=\"100\" r=\"5\" fill=\"#2563eb\" /><text x=\"195\" y=\"105\" font-size=\"12\" font-weight=\"bold\">d</text>\n  <circle cx=\"100\" cy=\"160\" r=\"5\" fill=\"#2563eb\" /><text x=\"100\" y=\"178\" font-size=\"12\" font-weight=\"bold\" text-anchor=\"middle\">h</text>\n  <circle cx=\"130\" cy=\"160\" r=\"5\" fill=\"#2563eb\" /><text x=\"145\" y=\"165\" font-size=\"12\" font-weight=\"bold\">g</text>\n  <circle cx=\"230\" cy=\"160\" r=\"5\" fill=\"#2563eb\" /><text x=\"215\" y=\"165\" font-size=\"12\" font-weight=\"bold\">f</text>\n  <circle cx=\"260\" cy=\"160\" r=\"5\" fill=\"#2563eb\" /><text x=\"260\" y=\"178\" font-size=\"12\" font-weight=\"bold\" text-anchor=\"middle\">l</text>\n  <circle cx=\"290\" cy=\"160\" r=\"5\" fill=\"#2563eb\" /><text x=\"305\" y=\"165\" font-size=\"12\" font-weight=\"bold\">m</text>\n  <circle cx=\"30\" cy=\"220\" r=\"5\" fill=\"#2563eb\" /><text x=\"30\" y=\"238\" font-size=\"12\" font-weight=\"bold\" text-anchor=\"middle\">i</text>\n  <circle cx=\"60\" cy=\"220\" r=\"5\" fill=\"#2563eb\" /><text x=\"60\" y=\"238\" font-size=\"12\" font-weight=\"bold\" text-anchor=\"middle\">n</text>\n  <circle cx=\"90\" cy=\"220\" r=\"5\" fill=\"#2563eb\" /><text x=\"90\" y=\"238\" font-size=\"12\" font-weight=\"bold\" text-anchor=\"middle\">k</text>\n</svg>",
        "options": [
            "A. 4",
            "B. 7",
            "C. 10",
            "D. 13",
            "E. None of the other choices is correct"
        ],
        "answer": "A",
        "explanation": [
            "Bước 1: Định nghĩa đỉnh trong (internal vertex) trong cây có gốc: Là đỉnh có ít nhất một đỉnh con (không phải đỉnh lá).",
            "Bước 2: Liệt kê các đỉnh và kiểm tra tập con:",
            "- Đỉnh gốc \\(a\\) có các con là \\(b, d, c\\) \\(\\implies a\\) là đỉnh trong.",
            "- Đỉnh \\(b\\) có các con là \\(e, h, g\\) \\(\\implies b\\) là đỉnh trong.",
            "- Đỉnh \\(c\\) có các con là \\(f, l, m\\) \\(\\implies c\\) là đỉnh trong.",
            "- Đỉnh \\(e\\) có các con là \\(i, n, k\\) \\(\\implies e\\) là đỉnh trong.",
            "- Các đỉnh \\(d, h, g, f, l, m, i, n, k\\) không có đỉnh con nào, là các đỉnh lá.",
            "Vậy cây có đúng 4 đỉnh trong gồm \\(\\{a, b, c, e\\}\\) (chọn A)."
        ],
        "chapter": "Ch9_Trees",
        "difficulty": "easy",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_019_results.json",
        "original_image": "0757_q757_Question_757.png"
    },
    {
        "id": 758,
        "question": "Tìm số lượng đỉnh tối đa trong một cây nhị phân có chiều cao 5 (Find the maximum number of vertices in a binary tree of height 5):",
        "options": [
            "A. 63",
            "B. 31",
            "C. 76",
            "D. 83"
        ],
        "answer": "A",
        "explanation": [
            "Bước 1: Công thức số lượng đỉnh tối đa trong cây nhị phân có chiều cao \\(h\\):",
            "Ở mức \\(i\\) (với gốc ở mức 0), số đỉnh tối đa là \\(2^i\\). Khi cây đầy đủ và hoàn hảo ở tất cả các mức từ 0 đến \\(h\\), tổng số đỉnh đạt cực đại:",
            "\\[ N_{\\max} = \\sum_{i=0}^h 2^i = 2^{h+1} - 1 \\]",
            "Bước 2: Thay số với chiều cao \\(h = 5\\):",
            "\\[ N_{\\max} = 2^{5+1} - 1 = 2^6 - 1 = 64 - 1 = 63 \\]",
            "Vậy số lượng đỉnh tối đa là 63 (chọn A)."
        ],
        "chapter": "Ch9_Trees",
        "difficulty": "easy",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_019_results.json",
        "original_image": "0758_q758_Question_758.png"
    },
    {
        "id": 759,
        "question": "Những hệ thống mã hóa nào sau đây là mã tiền tố (prefix codes)?\n(i) A: 011, B: 110, C: 1111, D: 0101, E: 010, F: 1010\n(ii) A: 0101, B: 11, C: 101, D: 1101, E: 0111, F: 100\n(iii) A: 1000, B: 00, C: 101, D: 111, E: 110, F: 1001",
        "options": [
            "A. (iii)",
            "B. (i) and (ii)",
            "C. (i) only",
            "D. (ii) and (iii)",
            "E. (ii) only"
        ],
        "answer": "A",
        "explanation": [
            "Bước 1: Định nghĩa mã tiền tố (prefix code): Một tập các từ mã là mã tiền tố khi và chỉ khi không có từ mã nào là tiền tố của một từ mã khác trong tập.",
            "Bước 2: Kiểm tra từng hệ mã hóa:",
            "- Xét hệ (i): Từ mã \\(E = 010\\) là tiền tố của từ mã \\(D = 0101\\). Do đó hệ (i) không phải mã tiền tố.",
            "- Xét hệ (ii): Từ mã \\(B = 11\\) là tiền tố của từ mã \\(D = 1101\\). Do đó hệ (ii) không phải mã tiền tố.",
            "- Xét hệ (iii): Từ mã \\(B = 00\\) là từ mã duy nhất bắt đầu bằng 0. Các từ mã còn lại đều bắt đầu bằng 1. Trong đó \\(C = 101, D = 111, E = 110\\) (độ dài 3) và \\(A = 1000, F = 1001\\) (độ dài 4, có tiền tố độ dài 3 là \\(100\\)). Không có từ mã nào là tiền tố của từ mã khác.",
            "Vậy chỉ có hệ mã (iii) là mã tiền tố (chọn A)."
        ],
        "chapter": "Ch9_Trees",
        "difficulty": "medium",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_019_results.json",
        "original_image": "0759_q759_Question_759.png"
    },
    {
        "id": 760,
        "question": "Cho bức thông điệp 'weekend'. Tìm độ dài của xâu bit khi mã hóa bức thông điệp này bằng mã Huffman (Find the length of the bit string when encoding this message by a Huffman coding):",
        "options": [
            "A. 15",
            "B. 16",
            "C. 14",
            "D. 13",
            "E. 12"
        ],
        "answer": "A",
        "explanation": [
            "Bước 1: Đếm tần số xuất hiện của từng ký tự trong từ 'weekend':",
            "- 'e': 3 lần",
            "- 'w': 1 lần",
            "- 'k': 1 lần",
            "- 'n': 1 lần",
            "- 'd': 1 lần",
            "(Tổng số ký tự là 7).",
            "Bước 2: Xây dựng cây mã Huffman bằng cách ghép các nút có trọng số nhỏ nhất:",
            "- Lần 1: Ghép 'w'(1) và 'k'(1) tạo nút \\(T_1\\) có trọng số 2.",
            "- Lần 2: Ghép 'n'(1) và 'd'(1) tạo nút \\(T_2\\) có trọng số 2.",
            "- Lần 3: Ghép \\(T_1(2)\\) và \\(T_2(2)\\) tạo nút \\(T_3\\) có trọng số 4.",
            "- Lần 4: Ghép 'e'(3) và \\(T_3(4)\\) tạo nút gốc có trọng số 7.",
            "Bước 3: Xác định độ dài từ mã và tổng số bit mã hóa:",
            "- Ký tự 'e' nằm ở độ sâu 1: mỗi chữ 'e' cần 1 bit.",
            "- Các ký tự 'w', 'k', 'n', 'd' nằm ở độ sâu 3: mỗi chữ cần 3 bit.",
            "\\[ L = (3 \\times 1) + (1 \\times 3) + (1 \\times 3) + (1 \\times 3) + (1 \\times 3) = 3 + 12 = 15 \\text{ bits} \\]",
            "Vậy độ dài xâu bit khi mã hóa là 15 (chọn A)."
        ],
        "chapter": "Ch9_Trees",
        "difficulty": "medium",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_019_results.json",
        "original_image": "0760_q760_Question_760.png"
    }
]

def main():
    json_path = 'v2/questions_sample_v2.json'
    js_path = 'v2/questions_v2.js'

    with open(json_path, 'r', encoding='utf-8') as f:
        existing_data = json.load(f)

    print(f"Existing questions before Batch 19: {len(existing_data)}")

    data_dict = {q['id']: q for q in existing_data}
    for q in BATCH_19_QUESTIONS:
        data_dict[q['id']] = q

    sorted_questions = [data_dict[qid] for qid in sorted(data_dict.keys())]

    print(f"Total questions after adding Batch 19: {len(sorted_questions)}")

    with open(json_path, 'w', encoding='utf-8') as f:
        json.dump(sorted_questions, f, ensure_ascii=False, indent=2)

    with open(js_path, 'w', encoding='utf-8') as f:
        f.write("// Schema v2 Questions Data Source - MAD101 Ultimate Studio Edition\n")
        f.write("export const questions = ")
        json.dump(sorted_questions, f, ensure_ascii=False, indent=2)
        f.write(";\n")

    print("Batch 19 written successfully to JSON and JS.")

if __name__ == '__main__':
    main()
