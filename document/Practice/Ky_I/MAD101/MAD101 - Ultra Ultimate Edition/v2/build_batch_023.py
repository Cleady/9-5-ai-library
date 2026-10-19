"""
Builder script for Batch 23 (Questions 881 - 920)
Strictly adheres to MAD101 Schema v2:
- answer: String ("A", "B", "C", "D", "E", "F")
- options: list[str] with "A. ...", "B. ...", etc.
- explanation: list[str] with >= 2 analytical steps
- Clean native vector SVG diagrams for diagrammatic questions
- MathJax LaTeX: \(...\) and \[...\] (no raw unescaped $)
- verification_source pointing to v2/verification/batch_023_results.json
"""
import json
import os

BATCH_23_QUESTIONS = [
    {
        "id": 881,
        "question": "Tìm số lượng đỉnh trong tối đa của một cây 3-phân đầy đủ có chiều cao 3 (Find the maximum number of internal vertices of a full 3-ary tree of height 3).",
        "options": [
            "A. 13",
            "B. 17",
            "C. 19",
            "D. 21",
            "E. None of the other choices is correct"
        ],
        "answer": "A",
        "explanation": [
            "Bước 1: Trong một cây \\(m\\)-phân (với \\(m = 3\\)) có chiều cao \\(h = 3\\), các đỉnh trong (internal vertices) là những đỉnh có ít nhất một con (nằm ở các mức từ 0 đến \\(h - 1 = 2\\)).",
            "Bước 2: Để số lượng đỉnh trong đạt tối đa, tất cả các đỉnh ở các mức từ 0 đến 2 đều phải là đỉnh trong và có đủ 3 con:",
            "- Mức 0 (gốc): có \\(3^0 = 1\\) đỉnh trong.",
            "- Mức 1: có \\(3^1 = 3\\) đỉnh trong.",
            "- Mức 2: có \\(3^2 = 9\\) đỉnh trong.",
            "Tất cả các đỉnh ở mức 3 là lá (chiều cao của cây là 3).",
            "Tổng số đỉnh trong tối đa là:",
            "\\[ 1 + 3 + 9 = 13 \\]",
            "Do đó đáp án chính xác là A (13)."
        ],
        "chapter": "Ch9_Trees",
        "difficulty": "medium",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_023_results.json",
        "original_image": "0881_q881_Question_881.png"
    },
    {
        "id": 882,
        "question": "Để mã hóa một thông điệp chỉ gồm các chữ cái \\(\\{a, b, i, n, s, t\\}\\), người ta sử dụng sơ đồ mã tiền tố sau: \\(a: 10, b: 01, i: 001, n: 110, s: 1111, t: \\text{(cần xác định)}\\). Chuỗi bit nào sau đây có thể dùng để mã hóa chữ cái \\(t\\)?",
        "options": [
            "A. 0001",
            "B. 111",
            "C. 100",
            "D. None of the other choices is correct"
        ],
        "answer": "A",
        "explanation": [
            "Bước 1: Định nghĩa mã tiền tố (prefix code): Không có từ mã nào là tiền tố (prefix) của một từ mã khác trong bảng mã.",
            "Bước 2: Kiểm tra các phương án cho từ mã của chữ cái \\(t\\):",
            "- Phương án B ('111'): Là tiền tố trực tiếp của '1111' (chữ \\(s\\)), vi phạm quy tắc tiền tố.",
            "- Phương án C ('100'): Có '10' (chữ \\(a\\)) là tiền tố của '100', vi phạm quy tắc tiền tố.",
            "- Phương án A ('0001'): Các tiền tố của '0001' là '0', '00', '000'. Không có tiền tố nào trùng với bất kỳ từ mã nào đã có \\(\\{10, 01, 001, 110, 1111\\}\\), và '0001' cũng không phải là tiền tố của bất kỳ từ mã nào đã có. Thỏa mãn hoàn toàn tính chất mã tiền tố.",
            "Vậy chuỗi bit hợp lệ để mã hóa \\(t\\) là 0001. Đáp án đúng là A."
        ],
        "chapter": "Ch9_Trees",
        "difficulty": "medium",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_023_results.json",
        "original_image": "0882_q882_Question_882.png"
    },
    {
        "id": 883,
        "question": "Tìm thứ tự duyệt giữa (inorder traversal) của cây nhị phân trong hình dưới đây:",
        "options": [
            "A. e, h, c, a, n, s, y, t, m",
            "B. e, c, h, a, n, m, s, t, y",
            "C. c, h, n, m, s, t, y, a, e",
            "D. a, c, e, h, m, n, t, s, y",
            "E. None of the other choices is correct"
        ],
        "answer": "B",
        "explanation": [
            "Bước 1: Quy tắc duyệt giữa (inorder traversal) của cây nhị phân: Duyệt cây con trái (Left), thăm gốc (Root), sau đó duyệt cây con phải (Right).",
            "Bước 2: Áp dụng đệ quy cho cây có gốc là \\(a\\):",
            "1. Cây con trái của \\(a\\) có gốc là \\(c\\):",
            "   - Con trái của \\(c\\) là \\(e\\).",
            "   - Gốc \\(c\\).",
            "   - Con phải của \\(c\\) là \\(h\\).",
            "   -> Thứ tự cây con trái: \\(e, c, h\\).",
            "2. Thăm gốc chính: \\(a\\).",
            "3. Cây con phải của \\(a\\) có gốc là \\(m\\):",
            "   - Con trái của \\(m\\) là \\(n\\).",
            "   - Gốc \\(m\\).",
            "   - Con phải của \\(m\\) là cây con gốc \\(t\\): con trái \\(s\\), gốc \\(t\\), con phải \\(y\\) -> \\(s, t, y\\).",
            "   -> Thứ tự cây con phải: \\(n, m, s, t, y\\).",
            "Kết hợp toàn bộ: \\(e, c, h, a, n, m, s, t, y\\).",
            "Đáp án chính xác là B."
        ],
        "chapter": "Ch9_Trees",
        "difficulty": "medium",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": True,
        "image_svg": '<svg viewBox="0 0 360 200" xmlns="http://www.w3.org/2000/svg"><g stroke="#2d3748" stroke-width="1.5"><line x1="180" y1="30" x2="100" y2="75"/><line x1="180" y1="30" x2="260" y2="75"/><line x1="100" y1="75" x2="60" y2="130"/><line x1="100" y1="75" x2="140" y2="130"/><line x1="260" y1="75" x2="220" y2="130"/><line x1="260" y1="75" x2="300" y2="130"/><line x1="300" y1="130" x2="270" y2="175"/><line x1="300" y1="130" x2="330" y2="175"/></g><circle cx="180" cy="30" r="4" fill="#2d3748"/><text x="180" y="20" font-size="14" font-style="italic" text-anchor="middle">a</text><circle cx="100" cy="75" r="4" fill="#2d3748"/><text x="88" y="70" font-size="14" font-style="italic">c</text><circle cx="260" cy="75" r="4" fill="#2d3748"/><text x="272" y="70" font-size="14" font-style="italic">m</text><circle cx="60" cy="130" r="4" fill="#2d3748"/><text x="48" y="135" font-size="14" font-style="italic">e</text><circle cx="140" cy="130" r="4" fill="#2d3748"/><text x="140" y="148" font-size="14" font-style="italic" text-anchor="middle">h</text><circle cx="220" cy="130" r="4" fill="#2d3748"/><text x="220" y="148" font-size="14" font-style="italic" text-anchor="middle">n</text><circle cx="300" cy="130" r="4" fill="#2d3748"/><text x="312" y="125" font-size="14" font-style="italic">t</text><circle cx="270" cy="175" r="4" fill="#2d3748"/><text x="260" y="185" font-size="14" font-style="italic">s</text><circle cx="330" cy="175" r="4" fill="#2d3748"/><text x="340" y="185" font-size="14" font-style="italic">y</text></svg>',
        "verification_source": "v2/verification/batch_023_results.json",
        "original_image": "0883_q883_Question_883.png"
    },
    {
        "id": 884,
        "question": "Cần phải loại bỏ bao nhiêu cạnh từ một đồ thị liên thông có 5 đỉnh và 8 cạnh để tạo thành một cây khung (How many edges must be removed from a connected graph with 5 vertices and 8 edges to produce a spanning tree)?",
        "options": [
            "A. 3",
            "B. 4",
            "C. 5",
            "D. 2",
            "E. None of the other choices is correct"
        ],
        "answer": "B",
        "explanation": [
            "Bước 1: Theo định lý về cây, một cây có \\(n\\) đỉnh luôn có đúng \\(n - 1\\) cạnh.",
            "Cây khung của đồ thị có 5 đỉnh sẽ có số cạnh là:",
            "\\[ |E(T)| = 5 - 1 = 4 \\text{ cạnh} \\]",
            "Bước 2: Đồ thị ban đầu có 8 cạnh. Số cạnh cần phải loại bỏ là:",
            "\\[ 8 - 4 = 4 \\text{ cạnh} \\]",
            "Do đó cần loại bỏ đúng 4 cạnh. Đáp án đúng là B."
        ],
        "chapter": "Ch9_Trees",
        "difficulty": "easy",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_023_results.json",
        "original_image": "0884_q884_Question_884.png"
    },
    {
        "id": 885,
        "question": "Có bao nhiêu số nguyên dương từ 100 đến 999 (bao gồm cả hai đầu) KHÔNG chia hết cho cả 7 và 11 (How many positive integers between 100 and 999, inclusive, that are NOT divisible by both 7 and 11)?",
        "options": [
            "A. 889",
            "B. 901",
            "C. 899",
            "D. 911",
            "E. None of the other choices is correct"
        ],
        "answer": "A",
        "explanation": [
            "Bước 1: Tính tổng số các số nguyên dương từ 100 đến 999:",
            "\\[ N = 999 - 100 + 1 = 900 \\text{ số} \\]",
            "Bước 2: Tìm số các số chia hết cho cả 7 và 11, tức chia hết cho \\(\\text{BCNN}(7, 11) = 77\\):",
            "Số các số chia hết cho 77 từ 1 đến 999 là \\(\\lfloor 999 / 77 \\rfloor = 12\\).",
            "Số các số chia hết cho 77 từ 1 đến 99 là \\(\\lfloor 99 / 77 \\rfloor = 1\\).",
            "Số lượng các số trong đoạn [100, 999] chia hết cho cả 7 và 11 là:",
            "\\[ 12 - 1 = 11 \\text{ số} \\]",
            "Bước 3: Số các số không chia hết cho cả 7 và 11 là:",
            "\\[ 900 - 11 = 889 \\text{ số} \\]",
            "Đáp án chính xác là A (889)."
        ],
        "chapter": "Ch6_Counting",
        "difficulty": "medium",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_023_results.json",
        "original_image": "0885_q885_Question_885.png"
    },
    {
        "id": 886,
        "question": "Đường đi ngắn nhất giữa G và A trong đồ thị có trọng số dưới đây là gì (What is the shortest path between G and A)?",
        "options": [
            "A. G-F-C-A",
            "B. G-E-A",
            "C. G-B-A",
            "D. G-D-B-A",
            "E. None of the other choices is correct"
        ],
        "answer": "A",
        "explanation": [
            "Bước 1: Tính chiều dài của các đường đi hợp lệ kết nối G và A trong đồ thị:",
            "- Đường đi A: G-F-C-A:",
            "\\[ \\text{Độ dài} = w(G, F) + w(F, C) + w(C, A) = 7 + 5 + 8 = 20 \\]",
            "- Đường đi D: G-D-B-A:",
            "\\[ \\text{Độ dài} = w(G, D) + w(D, B) + w(B, A) = 8 + 7 + 8 = 23 \\]",
            "Bước 2: Xét các phương án khác:",
            "- G-E-A và G-B-A không phải là đường đi hợp lệ vì không có cạnh trực tiếp nối G với E hoặc G với B.",
            "So sánh độ dài: \\(20 < 23\\). Do đó đường đi ngắn nhất giữa G và A là G-F-C-A.",
            "Đáp án đúng là A."
        ],
        "chapter": "Ch8_Graphs",
        "difficulty": "medium",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": True,
        "image_svg": '<svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg"><g stroke="#2b6cb0" stroke-width="2"><line x1="50" y1="110" x2="160" y2="40"/><line x1="50" y1="110" x2="160" y2="180"/><line x1="160" y1="40" x2="160" y2="180"/><line x1="160" y1="40" x2="300" y2="70"/><line x1="160" y1="40" x2="230" y2="110"/><line x1="160" y1="180" x2="230" y2="110"/><line x1="230" y1="110" x2="300" y2="70"/><line x1="230" y1="110" x2="300" y2="160"/><line x1="160" y1="180" x2="300" y2="160"/><line x1="300" y1="70" x2="300" y2="160"/><line x1="300" y1="70" x2="370" y2="110"/><line x1="300" y1="160" x2="370" y2="110"/></g><circle cx="50" cy="110" r="5" fill="#2d3748"/><text x="35" y="115" font-size="14" font-weight="bold">A</text><circle cx="160" cy="40" r="5" fill="#2d3748"/><text x="160" y="25" font-size="14" font-weight="bold" text-anchor="middle">B</text><circle cx="160" cy="180" r="5" fill="#2d3748"/><text x="160" y="200" font-size="14" font-weight="bold" text-anchor="middle">C</text><circle cx="230" cy="110" r="4" fill="#2d3748"/><text x="230" y="130" font-size="14" font-weight="bold">E</text><circle cx="300" cy="70" r="5" fill="#2d3748"/><text x="300" y="55" font-size="14" font-weight="bold" text-anchor="middle">D</text><circle cx="300" cy="160" r="5" fill="#2d3748"/><text x="300" y="180" font-size="14" font-weight="bold" text-anchor="middle">F</text><circle cx="370" cy="110" r="5" fill="#2d3748"/><text x="385" y="115" font-size="14" font-weight="bold">G</text><text x="95" y="70" font-size="13" fill="#e53e3e" font-weight="bold">8</text><text x="95" y="160" font-size="13" fill="#e53e3e" font-weight="bold">8</text><text x="150" y="115" font-size="13" fill="#e53e3e" font-weight="bold">6</text><text x="230" y="50" font-size="13" fill="#e53e3e" font-weight="bold">7</text><text x="200" y="85" font-size="13" fill="#e53e3e" font-weight="bold">5</text><text x="190" y="150" font-size="13" fill="#e53e3e" font-weight="bold">6</text><text x="260" y="85" font-size="13" fill="#e53e3e" font-weight="bold">4</text><text x="260" y="145" font-size="13" fill="#e53e3e" font-weight="bold">3</text><text x="308" y="115" font-size="13" fill="#e53e3e" font-weight="bold">6</text><text x="230" y="195" font-size="13" fill="#e53e3e" font-weight="bold">5</text><text x="340" y="85" font-size="13" fill="#e53e3e" font-weight="bold">8</text><text x="340" y="150" font-size="13" fill="#e53e3e" font-weight="bold">7</text></svg>',
        "verification_source": "v2/verification/batch_023_results.json",
        "original_image": "0886_q886_Question_886.png"
    },
    {
        "id": 887,
        "question": "Tìm số mũ của 2 trong phân tích thừa số nguyên tố của \\(20!\\) (Find the exponent of 2 in the prime factorization of \\(20!\\)).",
        "options": [
            "A. 18",
            "B. 20",
            "C. 16",
            "D. 17",
            "E. 22"
        ],
        "answer": "A",
        "explanation": [
            "Bước 1: Áp dụng công thức Legendre cho số nguyên tố \\(p = 2\\) và \\(n = 20\\):",
            "\\[ E_2(20!) = \\sum_{k=1}^{\\infty} \\left\\lfloor \\frac{20}{2^k} \\right\\rfloor \\]",
            "Bước 2: Tính từng số hạng phần nguyên:",
            "\\[ \\left\\lfloor \\frac{20}{2} \\right\\rfloor = 10 \\]",
            "\\[ \\left\\lfloor \\frac{20}{4} \\right\\rfloor = 5 \\]",
            "\\[ \\left\\lfloor \\frac{20}{8} \\right\\rfloor = 2 \\]",
            "\\[ \\left\\lfloor \\frac{20}{16} \\right\\rfloor = 1 \\]",
            "Tổng số mũ là \\(10 + 5 + 2 + 1 = 18\\).",
            "Do đó đáp án chính xác là A (18)."
        ],
        "chapter": "Ch4_Number_Theory",
        "difficulty": "easy",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_023_results.json",
        "original_image": "0887_q887_Question_887.png"
    },
    {
        "id": 888,
        "question": "Công thức tính tổng của \\(n\\) số nguyên dương chẵn đầu tiên là gì (A formula for the sum of the first n even positive integers is):\\n(i) \\(n(n + 1)\\)\\n(ii) \\((n + 1)^2\\)\\n(iii) \\((n - 1)^2\\)\\n(iv) \\(2n^2\\)",
        "options": [
            "A. (ii)",
            "B. (iii)",
            "C. (i)",
            "D. (iv)",
            "E. None of the other choices is correct"
        ],
        "answer": "C",
        "explanation": [
            "Bước 1: Tổng của \\(n\\) số nguyên dương chẵn đầu tiên được biểu diễn dưới dạng:",
            "\\[ S = 2 + 4 + 6 + \\dots + 2n \\]",
            "Bước 2: Đặt thừa số chung 2 ra ngoài:",
            "\\[ S = 2 \\times (1 + 2 + 3 + \\dots + n) = 2 \\times \\frac{n(n + 1)}{2} = n(n + 1) \\]",
            "Công thức chính xác là (i) \\(n(n + 1)\\).",
            "Đáp án đúng là C (tương ứng mệnh đề (i))."
        ],
        "chapter": "Ch5_Algorithms_Induction",
        "difficulty": "easy",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_023_results.json",
        "original_image": "0888_q888_Question_888.png"
    },
    {
        "id": 889,
        "question": "Nếu \\(C\\) là tập con của \\(B\\) và \\(B\\) là tập con của \\(A\\), thì lực lượng của \\(A \\cup B \\cup C\\) bằng (If C is a subset of B and B is a subset of A, then the cardinality of A U B U C is equal to):",
        "options": [
            "A. Cardinality of C",
            "B. Cardinality of A",
            "C. Cardinality of B",
            "D. None of the other choices is correct"
        ],
        "answer": "B",
        "explanation": [
            "Bước 1: Theo giả thiết, ta có quan hệ bao hàm liên tiếp:",
            "\\[ C \\subseteq B \\subseteq A \\]",
            "Bước 2: Khi hợp các tập con vào tập cha:",
            "Vì mọi phần tử của \\(C\\) đều thuộc \\(B\\), và mọi phần tử của \\(B\\) đều thuộc \\(A\\), phép hợp của 3 tập thỏa mãn:",
            "\\[ A \\cup B \\cup C = A \\]",
            "Do đó lực lượng của \\(A \\cup B \\cup C\\) chính bằng lực lượng của tập \\(A\\) (Cardinality of A).",
            "Đáp án đúng là B."
        ],
        "chapter": "Ch2_Sets_Functions",
        "difficulty": "easy",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_023_results.json",
        "original_image": "0889_q889_Question_889.png"
    },
    {
        "id": 890,
        "question": "Tìm định nghĩa đệ quy cho tập hợp tất cả các số nguyên không chia hết cho 3 (Find a recursive definition for the set of all integers not divisible by 3):\\n(i) \\(1 \\in S\\), nếu \\(a \\in S\\) thì \\(a + 3 \\in S, a - 3 \\in S\\)\\n(ii) \\(1 \\in S\\), nếu \\(a \\in S\\) thì \\(a + 3 \\in S\\)\\n(iii) \\(1, 2 \\in S\\), nếu \\(a \\in S\\) thì \\(a + 3 \\in S\\)\\n(iv) \\(1, 2 \\in S\\), nếu \\(a \\in S\\) thì \\(a + 3 \\in S, a - 3 \\in S\\)",
        "options": [
            "A. (i)",
            "B. (ii)",
            "C. (iii)",
            "D. (iv)",
            "E. None of the other choices is correct"
        ],
        "answer": "D",
        "explanation": [
            "Bước 1: Một số nguyên không chia hết cho 3 khi và chỉ khi nó đồng dư với 1 hoặc 2 theo modulo 3:",
            "\\[ x \\equiv 1 \\pmod 3 \\quad \\text{hoặc} \\quad x \\equiv 2 \\pmod 3 \\]",
            "Tập các số nguyên gồm cả số nguyên dương, số nguyên âm và số 0 (số 0 chia hết cho 3 nên không thuộc tập).",
            "Bước 2: Phân tích các bước định nghĩa đệ quy:",
            "- Bước cơ sở (Base case): Cần đưa vào hai số đại diện cho 2 lớp thặng dư không chia hết cho 3 là \\(1, 2 \\in S\\).",
            "- Bước đệ quy (Recursive step): Để sinh ra toàn bộ các số nguyên thuộc cả hai chiều âm và dương, với mỗi \\(a \\in S\\), ta phải thêm cả \\(a + 3 \\in S\\) và \\(a - 3 \\in S\\).",
            "Vậy định nghĩa chính xác nhất là (iv): \\(1, 2 \\in S\\), nếu \\(a \\in S\\) thì \\(a + 3 \\in S, a - 3 \\in S\\).",
            "Đáp án đúng là D."
        ],
        "chapter": "Ch5_Algorithms_Induction",
        "difficulty": "medium",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_023_results.json",
        "original_image": "0890_q890_Question_890.png"
    },
    {
        "id": 891,
        "question": "Tìm số nguyên nhỏ nhất \\(n\\) sao cho \\(f(x) = \\frac{x^7 \\log(x^2)}{x^2 + 1}\\) là \\(O(x^n)\\) (Find the least integer n such that f(x) is O(x^n)).",
        "options": [
            "A. 7",
            "B. 5",
            "C. 6",
            "D. 8",
            "E. None of the other choices is correct"
        ],
        "answer": "C",
        "explanation": [
            "Bước 1: Rút gọn biểu thức hàm số khi \\(x \\to \\infty\\):",
            "Ta có \\(\\log(x^2) = 2 \\log x\\). Khi \\(x\\) đủ lớn, mẫu số \\(x^2 + 1 \\sim x^2\\), do đó:",
            "\\[ f(x) = \\frac{2 x^7 \\log x}{x^2 + 1} \\sim 2 x^5 \\log x \\]",
            "Bước 2: Xác định bậc tiệm cận nhỏ nhất:",
            "- Vì \\(\\log x\\) tăng chậm hơn bất kỳ lũy thừa dương nào \\(x^\\epsilon\\) (\\(\\forall \\epsilon > 0\\)), nhưng \\(\\lim_{x \\to \\infty} \\log x = \\infty\\), nên \\(x^5 \\log x\\) tăng nhanh hơn \\(x^5\\), nghĩa là \\(f(x)\\) không phải là \\(O(x^5)\\).",
            "- Mặt khác, vì \\(\\log x < x\\) với mọi \\(x > 0\\), ta có \\(x^5 \\log x < x^6\\), do đó \\(f(x) = O(x^6)\\).",
            "Số nguyên \\(n\\) nhỏ nhất thỏa mãn là \\(n = 6\\). Đáp án đúng là C."
        ],
        "chapter": "Ch3_Algorithms_Complexity",
        "difficulty": "medium",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_023_results.json",
        "original_image": "0891_q891_Question_891.png"
    },
    {
        "id": 892,
        "question": "Tìm giá trị của biểu thức tiền tố (Find the value of the prefix expression): \\(* \\quad + \\quad 2 \\quad + \\quad 2 \\quad \\uparrow \\quad 2 \\quad + \\quad 2 \\quad 2 \\quad 2\\)",
        "options": [
            "A. None of the other choices is correct",
            "B. 22",
            "C. 20",
            "D. 36",
            "E. 40"
        ],
        "answer": "E",
        "explanation": [
            "Bước 1: Đánh giá biểu thức tiền tố từ phải sang trái bằng ngăn xếp (stack):",
            "Biểu thức tương đương với dạng trung tố: \\((2 + (2 + 2^{(2 + 2)})) \\times 2\\).",
            "Bước 2: Tính toán tuần tự từng bước:",
            "- \\(+ \\; 2 \\; 2 = 2 + 2 = 4\\)",
            "- \\(\\uparrow \\; 2 \\; 4 = 2^4 = 16\\)",
            "- \\(+ \\; 2 \\; 16 = 2 + 16 = 18\\)",
            "- \\(+ \\; 2 \\; 18 = 2 + 18 = 20\\)",
            "- \\(* \\; 20 \\; 2 = 20 \\times 2 = 40\\)",
            "Giá trị của biểu thức là 40. Đáp án đúng là E."
        ],
        "chapter": "Ch9_Trees",
        "difficulty": "medium",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_023_results.json",
        "original_image": "0892_q892_Question_892.png"
    },
    {
        "id": 893,
        "question": "Cho dãy số giả ngẫu nhiên \\(\\{x_n\\}\\) thỏa mãn: \\(x_0 = 2, \\quad x_{n+1} = 3 x_n \\bmod 11\\) với \\(n \\ge 0\\). Tìm số nguyên dương nhỏ nhất \\(k\\) sao cho \\(x_k = x_0\\).",
        "options": [
            "A. 2",
            "B. 10",
            "C. 3",
            "D. 4",
            "E. 5"
        ],
        "answer": "E",
        "explanation": [
            "Bước 1: Tính các số hạng liên tiếp của dãy bằng phép toán đồng dư modulo 11:",
            "- \\(x_0 = 2\\)",
            "- \\(x_1 = 3 \\times 2 = 6 \\bmod 11 = 6\\)",
            "- \\(x_2 = 3 \\times 6 = 18 \\equiv 7 \\pmod{11}\\)",
            "- \\(x_3 = 3 \\times 7 = 21 \\equiv 10 \\pmod{11}\\)",
            "- \\(x_4 = 3 \\times 10 = 30 \\equiv 8 \\pmod{11}\\)",
            "- \\(x_5 = 3 \\times 8 = 24 \\equiv 2 \\pmod{11}\\)",
            "Bước 2: So sánh với \\(x_0\\):",
            "Ta thấy \\(x_5 = 2 = x_0\\). Số nguyên dương \\(k\\) nhỏ nhất là \\(k = 5\\).",
            "Đáp án đúng là E (5)."
        ],
        "chapter": "Ch4_Number_Theory",
        "difficulty": "medium",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_023_results.json",
        "original_image": "0893_q893_Question_893.png"
    },
    {
        "id": 894,
        "question": "Độ phức tạp tính toán của thuật toán sau là gì (What is the complexity of the following algorithm)?\n```\nprocedure POLYNOMIAL(c, a0, a1, ..., an: integers)\npower := 1\ny := a0\nfor i := 1 to n\n    power := power * c\n    y := y + ai * power\nreturn y\n```",
        "options": [
            "A. Linear complexity",
            "B. Polynomial complexity",
            "C. Constant complexity",
            "D. Logarithmic complexity"
        ],
        "answer": "A",
        "explanation": [
            "Bước 1: Phân tích số lượng phép tính cơ bản trong thuật toán:",
            "Vòng lặp `for i := 1 to n` thực hiện đúng \\(n\\) lần lặp.",
            "Bước 2: Trong mỗi lần lặp:",
            "- Một phép nhân `power := power * c`.",
            "- Một phép nhân `ai * power` và một phép cộng vào `y`.",
            "Số phép tính cơ bản trong mỗi vòng lặp là hằng số \\(O(1)\\).",
            "Tổng số phép tính là \\(O(n)\\), tương ứng với độ phức tạp tuyến tính (Linear complexity).",
            "Đáp án chính xác là A."
        ],
        "chapter": "Ch3_Algorithms_Complexity",
        "difficulty": "easy",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_023_results.json",
        "original_image": "0894_q894_Question_894.png"
    },
    {
        "id": 895,
        "question": "Có bao nhiêu đỉnh trong thành phần liên thông mạnh có số đỉnh lớn nhất trong đồ thị có hướng sau (How many vertices in the strongly connected component of maximal number of vertices in the given graph)?",
        "options": [
            "A. None of the other choices is correct",
            "B. 2",
            "C. 3",
            "D. 4",
            "E. 5"
        ],
        "answer": "D",
        "explanation": [
            "Bước 1: Một thành phần liên thông mạnh (strongly connected component - SCC) là một tập đỉnh con cực đại sao cho từ đỉnh bất kỳ trong tập đều có đường đi có hướng đến mọi đỉnh khác trong tập.",
            "Bước 2: Phân tích đồ thị gồm 6 đỉnh:",
            "- Đỉnh góc dưới trái (BL) chỉ có cung đi vào, không có cung đi ra (bán bậc ra bằng 0) -> tạo thành SCC độc lập kích thước 1.",
            "- Đỉnh góc dưới phải (BR) chỉ có cung đi ra, không có cung đi vào (bán bậc vào bằng 0) -> tạo thành SCC độc lập kích thước 1.",
            "- Bốn đỉnh còn lại gồm: đỉnh trên trái (TL), đỉnh trên phải (TR), đỉnh giữa (C), và đỉnh ngoài cùng bên phải (FR).",
            "Giữa 4 đỉnh này tồn tại các chu trình có hướng khép kín: \\(C \\to TL \\to TR \\to C\\) và \\(C \\to FR \\to TR \\to C\\). Do đó cả 4 đỉnh đều liên thông mạnh với nhau.",
            "Số đỉnh trong thành phần liên thông mạnh lớn nhất là 4. Đáp án đúng là D."
        ],
        "chapter": "Ch8_Graphs",
        "difficulty": "hard",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": True,
        "image_svg": '<svg viewBox="0 0 320 260" xmlns="http://www.w3.org/2000/svg"><defs><marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#2d3748"/></marker></defs><g stroke="#2d3748" stroke-width="2" marker-end="url(#arrow)"><line x1="60" y1="50" x2="230" y2="50"/><line x1="60" y1="50" x2="60" y2="200"/><line x1="150" y1="130" x2="65" y2="55"/><line x1="240" y1="50" x2="155" y2="125"/><line x1="240" y1="210" x2="240" y2="60"/><line x1="240" y1="210" x2="155" y2="135"/><line x1="240" y1="210" x2="70" y2="210"/><line x1="150" y1="130" x2="280" y2="130"/><line x1="290" y1="130" x2="245" y2="55"/></g><circle cx="60" cy="50" r="6" fill="#fff" stroke="#2d3748" stroke-width="2"/><circle cx="60" cy="210" r="6" fill="#fff" stroke="#2d3748" stroke-width="2"/><circle cx="150" cy="130" r="6" fill="#fff" stroke="#2d3748" stroke-width="2"/><circle cx="240" cy="50" r="6" fill="#fff" stroke="#2d3748" stroke-width="2"/><circle cx="240" cy="210" r="6" fill="#fff" stroke="#2d3748" stroke-width="2"/><circle cx="290" cy="130" r="6" fill="#fff" stroke="#2d3748" stroke-width="2"/></svg>',
        "verification_source": "v2/verification/batch_023_results.json",
        "original_image": "0895_q895_Question_895.png"
    },
    {
        "id": 896,
        "question": "Công thức nào sau đây là một hằng đúng (Which of the following is a tautology)?\\ni. \\((p \\land q) \\to (p \\to q)\\)\\nii. \\((p \\lor q) \\to (p \\to q)\\)",
        "options": [
            "A. (i)",
            "B. (ii)",
            "C. Both (i) and (ii)",
            "D. None of the other choices is correct"
        ],
        "answer": "A",
        "explanation": [
            "Bước 1: Kiểm tra công thức (i) bằng phép biến đổi tương đương logic:",
            "\\[ (p \\land q) \\to (p \\to q) \\equiv \\neg(p \\land q) \\lor (\\neg p \\lor q) \\equiv (\\neg p \\lor \\neg q) \\lor \\neg p \\lor q \\]",
            "Giao hoán và kết hợp: \\(\\neg p \\lor (\\neg q \\lor q) \\equiv \\neg p \\lor \\mathbf{T} \\equiv \\mathbf{T}\\).",
            "Vì công thức (i) luôn nhận giá trị Đúng với mọi giá trị của \\(p\\) và \\(q\\), (i) là một hằng đúng (tautology).",
            "Bước 2: Kiểm tra công thức (ii):",
            "Xét trường hợp \\(p = \\mathbf{T}\\) và \\(q = \\mathbf{F}\\):",
            "Vế trái: \\(p \\lor q = \\mathbf{T} \\lor \\mathbf{F} = \\mathbf{T}\\).",
            "Vế phải: \\(p \\to q = \\mathbf{T} \\to \\mathbf{F} = \\mathbf{F}\\).",
            "Khi đó \\(\\mathbf{T} \\to \\mathbf{F} = \\mathbf{F}\\), không phải hằng đúng.",
            "Vậy chỉ có (i) là hằng đúng. Đáp án đúng là A."
        ],
        "chapter": "Ch1_Logic_Proofs",
        "difficulty": "easy",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_023_results.json",
        "original_image": "0896_q896_Question_896.png"
    },
    {
        "id": 897,
        "question": "Trong đồ thị bánh xe \\(W_{10}\\), chu trình đơn dài nhất có bao nhiêu cạnh (In the graph W10, how many edges in the longest simple circuit)?",
        "options": [
            "A. 10",
            "B. 11",
            "C. 20",
            "D. None of the other choices is correct",
            "E. 12"
        ],
        "answer": "B",
        "explanation": [
            "Bước 1: Cấu trúc của đồ thị bánh xe \\(W_{10}\\):",
            "Gồm 1 đỉnh tâm (hub) và 10 đỉnh trên vòng chu trình ngoài \\(C_{10}\\). Tổng số đỉnh của \\(W_{10}\\) là \\(10 + 1 = 11\\) đỉnh.",
            "Bước 2: Xác định chu trình đơn dài nhất:",
            "Một chu trình đơn dài nhất trong đồ thị có thể đi qua tối đa tất cả các đỉnh của đồ thị (chu trình Hamilton).",
            "Trong \\(W_{10}\\), chu trình Hamilton được dựng bằng cách: đi từ một đỉnh vành \\(v_1\\) vào tâm, từ tâm đi ra đỉnh vành kế tiếp \\(v_2\\), sau đó đi vòng qua toàn bộ 9 đỉnh còn lại của chu trình \\(C_{10}\\) và quay về \\(v_1\\).",
            "Chu trình này đi qua toàn bộ 11 đỉnh của đồ thị, do đó nó có đúng 11 cạnh.",
            "Đáp án chính xác là B (11)."
        ],
        "chapter": "Ch8_Graphs",
        "difficulty": "medium",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_023_results.json",
        "original_image": "0897_q897_Question_897.png"
    },
    {
        "id": 898,
        "question": "Cho \\(C(x) = \\text{\"x là sinh viên\"}\\), \\(D(x) = \\text{\"x học môn Toán rời rạc\"}\\), với không gian vị từ (domain) gồm tất cả mọi người. Dịch câu sau sang biểu thức logic: \"Mọi sinh viên đều học Toán rời rạc\" (Every student studies Discrete Mathematics).",
        "options": [
            "A. \\forall x (C(x) \\land D(x))",
            "B. \\forall x (C(x) \\to D(x))",
            "C. \\exists x (C(x) \\to D(x))",
            "D. \\exists x (C(x) \\land D(x))",
            "E. None of the other choices is correct"
        ],
        "answer": "B",
        "explanation": [
            "Bước 1: Phân tích cấu trúc câu vị từ phổ dụng:",
            "Câu có dạng: \"Với mọi người \\(x\\), nếu \\(x\\) là sinh viên thì \\(x\\) học môn Toán rời rạc\".",
            "Bước 2: Áp dụng phép kéo theo logic:",
            "Biểu thức tương ứng là \\(\\forall x (C(x) \\to D(x))\\).",
            "Lưu ý: Không dùng \\(\\forall x (C(x) \\land D(x))\\) vì biểu thức đó khẳng định rằng \"tất cả mọi người trên thế giới đều là sinh viên và đều học Toán rời rạc\".",
            "Đáp án đúng là B."
        ],
        "chapter": "Ch1_Logic_Proofs",
        "difficulty": "easy",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_023_results.json",
        "original_image": "0898_q898_Question_898.png"
    },
    {
        "id": 899,
        "question": "Cho tập hợp \\(A = \\{1, 2, a\\}\\). Tìm tập lũy thừa (power set) của \\(A\\).",
        "options": [
            "A. {{1}, {2}, {a}, {1,2}, {1,a}, {2,a}, {1,2,a}}",
            "B. {{1,2,a}}",
            "C. {\\emptyset, {1}, {2}, {a}, {1,2}, {1,a}, {2,a}, {1,2,a}}",
            "D. {\\emptyset, {1}, {2}, {a}}"
        ],
        "answer": "C",
        "explanation": [
            "Bước 1: Định nghĩa tập lũy thừa \\(\\mathcal{P}(A)\\): Tập hợp tất cả các tập con của \\(A\\).",
            "Nếu \\(|A| = 3\\) thì số phần tử của \\(\\mathcal{P}(A)\\) là \\(2^3 = 8\\).",
            "Bước 2: Liệt kê đầy đủ 8 tập con:",
            "- Tập con 0 phần tử: \\(\\emptyset\\)",
            "- Tập con 1 phần tử: \\(\\{1\\}, \\{2\\}, \\{a\\}\\)",
            "- Tập con 2 phần tử: \\(\\{1, 2\\}, \\{1, a\\}, \\{2, a\\}\\)",
            "- Tập con 3 phần tử: \\(\\{1, 2, a\\}\\)",
            "Do đó \\(\\mathcal{P}(A) = \\{\\emptyset, \\{1\\}, \\{2\\}, \\{a\\}, \\{1, 2\\}, \\{1, a\\}, \\{2, a\\}, \\{1, 2, a\\}\\}\\).",
            "Đáp án đúng là C."
        ],
        "chapter": "Ch2_Sets_Functions",
        "difficulty": "easy",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_023_results.json",
        "original_image": "0899_q899_Question_899.png"
    },
    {
        "id": 900,
        "question": "Lập luận nào sau đây KHÔNG hợp lệ (Which argument is NOT valid)?",
        "options": [
            "A. Any hardworking student gets good result in class. An did not get good result in class. Therefore An was not working hard.",
            "B. Anyone in class understands logics. An is a student in class. Therefore An understands logics.",
            "C. Any computer science major must take Discrete Mathematics. An is taking Discrete Mathematics. Therefore An is a computer science major.",
            "D. Any student of FPT university lives in the dorm. An is living in a house. Therefore An is not a student of FPT university."
        ],
        "answer": "C",
        "explanation": [
            "Bước 1: Phân tích cấu trúc logic của từng lập luận:",
            "- Lập luận A: \\(P \\to Q\\), \\(\\neg Q\\), suy ra \\(\\neg P\\) (Quy tắc Modus Tollens - Hợp lệ).",
            "- Lập luận B: \\(P \\to Q\\), \\(P\\), suy ra \\(Q\\) (Quy tắc Modus Ponens - Hợp lệ).",
            "- Lập luận D: \\(P \\to Q\\), \\(\\neg Q\\), suy ra \\(\\neg P\\) (Quy tắc Modus Tollens - Hợp lệ).",
            "Bước 2: Phân tích lập luận C:",
            "Tiền đề: \"Nếu là sinh viên ngành Khoa học máy tính thì phải học Toán rời rạc\" (\\(P \\to Q\\)).",
            "Điều kiện: \"An đang học Toán rời rạc\" (\\(Q\\)).",
            "Kết luận: \"An là sinh viên ngành Khoa học máy tính\" (\\(P\\)).",
            "Đây là Ngụy biện khẳng định kết luận (Fallacy of Affirming the Consequent) vì sinh viên ngành khác cũng có thể học môn Toán rời rạc.",
            "Do đó lập luận C không hợp lệ. Đáp án đúng là C."
        ],
        "chapter": "Ch1_Logic_Proofs",
        "difficulty": "medium",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_023_results.json",
        "original_image": "0900_q900_Question_900.png"
    },
    {
        "id": 901,
        "question": "Tính giá trị của tổng kép sau (Find the double summation): \\(\\sum_{i=1}^5 \\sum_{j=i}^5 2\\)",
        "options": [
            "A. 10",
            "B. 40",
            "C. 20",
            "D. 30",
            "E. 50"
        ],
        "answer": "D",
        "explanation": [
            "Bước 1: Tính tổng bên trong theo biến \\(j\\):",
            "\\[ \\sum_{j=i}^5 2 = 2 \\times (5 - i + 1) = 2(6 - i) \\]",
            "Bước 2: Tính tổng bên ngoài theo biến \\(i\\) chạy từ 1 đến 5:",
            "\\[ \\sum_{i=1}^5 2(6 - i) = 2 \\left[ (6 - 1) + (6 - 2) + (6 - 3) + (6 - 4) + (6 - 5) \\right] \\]",
            "\\[ = 2 \\times [5 + 4 + 3 + 2 + 1] = 2 \\times 15 = 30 \\]",
            "Giá trị của tổng kép là 30. Đáp án đúng là D."
        ],
        "chapter": "Ch2_Sets_Functions",
        "difficulty": "easy",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_023_results.json",
        "original_image": "0901_q901_Question_901.png"
    },
    {
        "id": 902,
        "question": "Cần bao nhiêu phép chia khi sử dụng thuật toán Euclid để tìm ước chung lớn nhất của 6468 và 3135 (How many divisions are needed when using Euclidean algorithm to find gcd(6468, 3135))?",
        "options": [
            "A. 4",
            "B. 5",
            "C. 3",
            "D. 6",
            "E. None of the other choices is correct"
        ],
        "answer": "A",
        "explanation": [
            "Bước 1: Thực hiện thuật toán chia Euclid liên tiếp:",
            "- Phép chia 1: \\(6468 = 3135 \\times 2 + 198\\)",
            "- Phép chia 2: \\(3135 = 198 \\times 15 + 165\\)",
            "- Phép chia 3: \\(198 = 165 \\times 1 + 33\\)",
            "- Phép chia 4: \\(165 = 33 \\times 5 + 0\\)",
            "Bước 2: Thuật toán dừng lại khi số dư bằng 0.",
            "Tổng số phép chia được thực hiện là đúng 4 phép chia.",
            "Đáp án chính xác là A (4)."
        ],
        "chapter": "Ch4_Number_Theory",
        "difficulty": "medium",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_023_results.json",
        "original_image": "0902_q902_Question_902.png"
    },
    {
        "id": 903,
        "question": "Tính kết quả của phép toán bitwise: \\(1011001 \\text{ XOR } 0111011\\)",
        "options": [
            "A. 1100001",
            "B. None of the other choices is correct",
            "C. 1100110",
            "D. 1100010"
        ],
        "answer": "D",
        "explanation": [
            "Bước 1: Phép toán XOR (phép cộng loại trừ) cho kết quả 1 khi hai bit khác nhau và cho 0 khi hai bit giống nhau.",
            "Bước 2: Thực hiện phép toán theo từng vị trí bit từ trái sang phải:",
            "  1 XOR 0 = 1",
            "  0 XOR 1 = 1",
            "  1 XOR 1 = 0",
            "  1 XOR 1 = 0",
            "  0 XOR 0 = 0",
            "  0 XOR 1 = 1",
            "  1 XOR 1 = 0",
            "Ghép kết quả lại ta được chuỗi bit: `1100010`.",
            "Đáp án chính xác là D."
        ],
        "chapter": "Ch1_Logic_Proofs",
        "difficulty": "easy",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_023_results.json",
        "original_image": "0903_q903_Question_903.png"
    },
    {
        "id": 904,
        "question": "Cho hàm mệnh đề \\(P(x)\\) trên miền xác định \\(\\{a, b, c\\}\\). Biểu thức nào sau đây là một mệnh đề (Which statements are propositions)?\\n(i) \\(P(c)\\)\\n(ii) \\(\\exists x P(x)\\)\\n(iii) \\(\\neg P(a) \\lor P(b)\\)",
        "options": [
            "A. (i) and (ii)",
            "B. (ii)",
            "C. (iii)",
            "D. (i), (ii) and (iii)",
            "E. None of the other choices is correct"
        ],
        "answer": "D",
        "explanation": [
            "Bước 1: Định nghĩa mệnh đề (proposition): Một câu khẳng định có giá trị chân lý xác định (Đúng hoặc Sai), không chứa biến tự do.",
            "Bước 2: Phân tích từng biểu thức:",
            "- Biểu thức (i) \\(P(c)\\): Biến \\(x\\) đã được gán bằng giá trị cụ thể \\(c\\) trong miền xác định, có giá trị chân lý xác định -> là một mệnh đề.",
            "- Biểu thức (ii) \\(\\exists x P(x)\\): Biến \\(x\\) đã bị lượng từ hóa bởi lượng từ tồn tại, có giá trị chân lý xác định -> là một mệnh đề.",
            "- Biểu thức (iii) \\(\\neg P(a) \\lor P(b)\\): Phép toán logic giữa hai mệnh đề đơn \\(P(a)\\) và \\(P(b)\\) -> là một mệnh đề.",
            "Do đó cả (i), (ii) và (iii) đều là mệnh đề. Đáp án đúng là D."
        ],
        "chapter": "Ch1_Logic_Proofs",
        "difficulty": "easy",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_023_results.json",
        "original_image": "0904_q904_Question_904.png"
    },
    {
        "id": 905,
        "question": "Cho \\(F(x) = \\text{\"x là sinh viên khoa Quản trị Kinh doanh\"}\\), \\(J(x) = \\text{\"x biết ngôn ngữ máy tính Java\"}\\), \\(R(x) = \\text{\"x có thể nói tiếng Nga\"}\\). Miền xác định gồm tất cả sinh viên của trường đại học. Diễn đạt câu sau thành biểu thức logic: \"Có sinh viên của khoa Quản trị Kinh doanh hoặc biết nói tiếng Nga hoặc biết tiếng Java\" (Some student of the Business department either can speak Russian or knows Java).",
        "options": [
            "A. \\forall x (F(x) \\to (J(x) \\lor R(x)))",
            "B. \\forall x (F(x) \\to (J(x) \\land R(x)))",
            "C. \\exists x (F(x) \\land (J(x) \\lor R(x)))",
            "D. \\exists x (F(x) \\lor (J(x) \\lor R(x)))",
            "E. None of the other choices"
        ],
        "answer": "C",
        "explanation": [
            "Bước 1: Phân tích cụm từ \"Có sinh viên...\" (Some student...): biểu diễn bằng lượng từ tồn tại \\(\\exists x\\).",
            "Bước 2: Sinh viên đó đồng thời thỏa mãn:",
            "1. Là sinh viên khoa Quản trị Kinh doanh: \\(F(x)\\).",
            "2. Biết tiếng Nga hoặc biết Java: \\(J(x) \\lor R(x)\\).",
            "Cả hai điều kiện này phải đồng thời xảy ra (phép hội \\(\\land\\)):",
            "\\[ \\exists x (F(x) \\land (J(x) \\lor R(x))) \\]",
            "Đáp án đúng là C."
        ],
        "chapter": "Ch1_Logic_Proofs",
        "difficulty": "medium",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_023_results.json",
        "original_image": "0905_q905_Question_905.png"
    },
    {
        "id": 906,
        "question": "Cho tập vũ trụ \\(U = \\{a,b,c,d,e,f,g,h,i,j\\}\\). Cho hai tập con \\(A = \\{a,c,d,e,i\\}\\) và \\(B = \\{a,f,g,h,j\\}\\). Chuỗi bit biểu diễn hợp của \\(A\\) và \\(B\\) là:",
        "options": [
            "A. 11 0111 1111",
            "B. 10 1111 1111",
            "C. 10 1011 1111",
            "D. 10 1111 1011",
            "E. None of the other choices"
        ],
        "answer": "B",
        "explanation": [
            "Bước 1: Xác định tập hợp hợp \\(A \\cup B\\):",
            "\\[ A \\cup B = \\{a, c, d, e, i\\} \\cup \\{a, f, g, h, j\\} = \\{a, c, d, e, f, g, h, i, j\\} \\]",
            "Bước 2: So sánh với tập vũ trụ \\(U\\) gồm 10 phần tử theo thứ tự chữ cái:",
            "Tập \\(A \\cup B\\) chứa tất cả các phần tử của \\(U\\) ngoại trừ phần tử 'b'.",
            "- Vị trí thứ 1 ('a'): 1",
            "- Vị trí thứ 2 ('b'): 0",
            "- Vị trí 3 đến 10 ('c, d, e, f, g, h, i, j'): 1 1 1 1 1 1 1 1.",
            "Chuỗi bit tương ứng là: `10 1111 1111`.",
            "Đáp án đúng là B."
        ],
        "chapter": "Ch2_Sets_Functions",
        "difficulty": "easy",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_023_results.json",
        "original_image": "0906_q906_Question_906.png"
    },
    {
        "id": 907,
        "question": "Cho \\(A, B\\) là các tập hợp thỏa mãn \\(|B| = |A| + 1\\). Giả sử tích Descartes \\(A \\times B\\) có 90 phần tử. Tìm lực lượng \\(|A|\\).",
        "options": [
            "A. 9",
            "B. 10",
            "C. 8",
            "D. 11",
            "E. 12"
        ],
        "answer": "A",
        "explanation": [
            "Bước 1: Lực lượng của tích Descartes \\(A \\times B\\) được tính bởi:",
            "\\[ |A \\times B| = |A| \\times |B| \\]",
            "Bước 2: Thay \\(|B| = |A| + 1\\) vào phương trình:",
            "\\[ |A| \\times (|A| + 1) = 90 \\]",
            "Vì \\(|A|\\) là số nguyên không âm, ta giải phương trình bậc hai:",
            "\\[ |A|^2 + |A| - 90 = 0 \\implies (|A| - 9)(|A| + 10) = 0 \\implies |A| = 9 \\]",
            "Vậy \\(|A| = 9\\). Đáp án đúng là A."
        ],
        "chapter": "Ch2_Sets_Functions",
        "difficulty": "easy",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_023_results.json",
        "original_image": "0907_q907_Question_907.png"
    },
    {
        "id": 908,
        "question": "Cho \\(X = \\{1,2,3,4,5\\}, Y = \\{0,3,6,9\\}, Z = \\{0,2,4,6,8\\}\\). Tập hợp nào sau đây có lực lượng lớn nhất (Which of the following sets has the maximal cardinality)?",
        "options": [
            "A. X \\ Y",
            "B. Y \\ Z",
            "C. Z \\ X",
            "D. None of the other choices is correct"
        ],
        "answer": "A",
        "explanation": [
            "Bước 1: Tính các hiệu tập hợp:",
            "- \\(X \\setminus Y = \\{1, 2, 3, 4, 5\\} \\setminus \\{0, 3, 6, 9\\} = \\{1, 2, 4, 5\\} \\implies |X \\setminus Y| = 4\\).",
            "- \\(Y \\setminus Z = \\{0, 3, 6, 9\\} \\setminus \\{0, 2, 4, 6, 8\\} = \\{3, 9\\} \\implies |Y \\setminus Z| = 2\\).",
            "- \\(Z \\setminus X = \\{0, 2, 4, 6, 8\\} \\setminus \\{1, 2, 3, 4, 5\\} = \\{0, 6, 8\\} \\implies |Z \\setminus X| = 3\\).",
            "Bước 2: So sánh lực lượng:",
            "Ta có \\(4 > 3 > 2\\). Do đó tập \\(X \\setminus Y\\) có lực lượng lớn nhất.",
            "Đáp án đúng là A."
        ],
        "chapter": "Ch2_Sets_Functions",
        "difficulty": "easy",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_023_results.json",
        "original_image": "0908_q908_Question_908.png"
    },
    {
        "id": 909,
        "question": "Tính tổng cấp số nhân (Find): \\(2 + 2^2 + 2^3 + \\dots + 2^9\\)",
        "options": [
            "A. 1021",
            "B. 1022",
            "C. 1023",
            "D. 1024",
            "E. None of the other choices is correct"
        ],
        "answer": "B",
        "explanation": [
            "Bước 1: Áp dụng công thức tính tổng cấp số nhân với số hạng đầu \\(a = 2\\), công bội \\(q = 2\\) và số số hạng \\(n = 9\\):",
            "\\[ S = \\sum_{k=1}^9 2^k = 2 \\times \\frac{2^9 - 1}{2 - 1} \\]",
            "Bước 2: Tính giá trị số học:",
            "\\[ S = 2 \\times (512 - 1) = 2 \\times 511 = 1022 \\]",
            "Tổng nhận được là 1022. Đáp án đúng là B."
        ],
        "chapter": "Ch2_Sets_Functions",
        "difficulty": "easy",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_023_results.json",
        "original_image": "0909_q909_Question_909.png"
    },
    {
        "id": 910,
        "question": "Tìm ước chung lớn nhất \\(\\gcd(899, 941)\\).",
        "options": [
            "A. 13",
            "B. 17",
            "C. 29",
            "D. 31",
            "E. None of the other choices is correct"
        ],
        "answer": "E",
        "explanation": [
            "Bước 1: Áp dụng thuật toán chia Euclid liên tiếp:",
            "- \\(941 = 899 \\times 1 + 42\\)",
            "- \\(899 = 42 \\times 21 + 17\\) (vì \\(42 \\times 21 = 882\\))",
            "- \\(42 = 17 \\times 2 + 8\\)",
            "- \\(17 = 8 \\times 2 + 1\\)",
            "- \\(8 = 1 \\times 8 + 0\\)",
            "Bước 2: Số dư khác 0 cuối cùng là 1, do đó \\(\\gcd(899, 941) = 1\\).",
            "Vì 1 không xuất hiện trong các phương án 13, 17, 29, 31, đáp án chính xác là E (None of the other choices is correct)."
        ],
        "chapter": "Ch4_Number_Theory",
        "difficulty": "medium",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_023_results.json",
        "original_image": "0910_q910_Question_910.png"
    },
    {
        "id": 911,
        "question": "Chuyển đổi số nhị phân \\(11101_2\\) sang hệ cơ số 16 (hexadecimal).",
        "options": [
            "A. 1D",
            "B. E1",
            "C. 1E",
            "D. D1",
            "E. None of the other choices is correct"
        ],
        "answer": "A",
        "explanation": [
            "Bước 1: Chia chuỗi nhị phân thành từng nhóm 4 bit từ phải qua trái (thêm các số 0 ở đầu nếu cần):",
            "\\[ 11101_2 = 0001 \\quad 1101_2 \\]",
            "Bước 2: Đổi từng nhóm 4 bit sang ký tự hexa tương ứng:",
            "- \\(0001_2 = 1_{16}\\)",
            "- \\(1101_2 = 1 \\times 8 + 1 \\times 4 + 0 \\times 2 + 1 \\times 1 = 13_{10} = \\text{D}_{16}\\)",
            "Ghép lại ta được biểu diễn hexa là: `1D`.",
            "Đáp án đúng là A."
        ],
        "chapter": "Ch4_Number_Theory",
        "difficulty": "easy",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_023_results.json",
        "original_image": "0911_q911_Question_911.png"
    },
    {
        "id": 912,
        "question": "Giả sử \\(f(n)\\) được định nghĩa đệ quy bởi: \\(f(0) = 3, \\quad f(n+1) = 2f(n) + 3\\) với \\(n = 0, 1, 2, \\dots\\). Tìm \\(f(1), f(2), f(3)\\).",
        "options": [
            "A. 9, 21, 45",
            "B. 12, 21, 45",
            "C. 18, 21, 45",
            "D. 24, 45, 93",
            "E. None of the other choices is correct"
        ],
        "answer": "A",
        "explanation": [
            "Bước 1: Áp dụng công thức truy hồi từng bước từ giá trị ban đầu \\(f(0) = 3\\):",
            "- \\(f(1) = 2 f(0) + 3 = 2 \\times 3 + 3 = 6 + 3 = 9\\)",
            "- \\(f(2) = 2 f(1) + 3 = 2 \\times 9 + 3 = 18 + 3 = 21\\)",
            "- \\(f(3) = 2 f(2) + 3 = 2 \\times 21 + 3 = 42 + 3 = 45\\)",
            "Bước 2: Dãy các giá trị là 9, 21, 45.",
            "Đáp án chính xác là A."
        ],
        "chapter": "Ch5_Algorithms_Induction",
        "difficulty": "easy",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_023_results.json",
        "original_image": "0912_q912_Question_912.png"
    },
    {
        "id": 913,
        "question": "Giả sử \\(f(n) = 2f(n/4) + 3n\\) và \\(f(1) = 2\\). Tìm \\(f(64)\\).",
        "options": [
            "A. 352",
            "B. 420",
            "C. 280",
            "D. 384",
            "E. None of the other choices is correct"
        ],
        "answer": "A",
        "explanation": [
            "Bước 1: Tính liên tiếp các giá trị \\(f(n)\\) tại các lũy thừa của 4:",
            "- Với \\(n = 4\\): \\(f(4) = 2 f(1) + 3 \\times 4 = 2 \\times 2 + 12 = 4 + 12 = 16\\).",
            "- Với \\(n = 16\\): \\(f(16) = 2 f(4) + 3 \\times 16 = 2 \\times 16 + 48 = 32 + 48 = 80\\).",
            "- Với \\(n = 64\\): \\(f(64) = 2 f(16) + 3 \\times 64 = 2 \\times 80 + 192 = 160 + 192 = 352\\).",
            "Bước 2: Giá trị thu được là 352.",
            "Đáp án chính xác là A."
        ],
        "chapter": "Ch5_Algorithms_Induction",
        "difficulty": "medium",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_023_results.json",
        "original_image": "0913_q913_Question_913.png"
    },
    {
        "id": 914,
        "question": "Tổng các số trên hàng thứ ba của ma trận kề (theo thứ tự đỉnh a, b, c, d) của đồ thị sau là bao nhiêu (What is the sum of the numbers in the third row of the adjacency matrix, in the order a,b,c,d of the given graph)?",
        "options": [
            "A. 5",
            "B. 6",
            "C. 7",
            "D. 8",
            "E. None of the other choices is correct"
        ],
        "answer": "C",
        "explanation": [
            "Bước 1: Hàng thứ ba của ma trận kề tương ứng với đỉnh \\(c\\). Giá trị mỗi phần tử \\(A_{cj}\\) bằng số cạnh nối trực tiếp giữa \\(c\\) và đỉnh \\(j\\).",
            "Bước 2: Đếm số cạnh nối từ đỉnh \\(c\\) đến từng đỉnh:",
            "- Nối với \\(a\\): có 3 cạnh song song -> \\(A_{ca} = 3\\).",
            "- Nối với \\(b\\): có 1 cạnh -> \\(A_{cb} = 1\\).",
            "- Nối với chính nó \\(c\\): có 1 khuyên (self-loop) -> \\(A_{cc} = 1\\).",
            "- Nối với \\(d\\): có 2 cạnh song song -> \\(A_{cd} = 2\\).",
            "Tổng các số trên hàng thứ ba là:",
            "\\[ 3 + 1 + 1 + 2 = 7 \\]",
            "Đáp án chính xác là C."
        ],
        "chapter": "Ch8_Graphs",
        "difficulty": "medium",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": True,
        "image_svg": '<svg viewBox="0 0 260 240" xmlns="http://www.w3.org/2000/svg"><g stroke="#2b6cb0" stroke-width="2" fill="none"><line x1="60" y1="50" x2="180" y2="50"/><path d="M 60 50 Q 120 30 180 50"/><path d="M 60 50 Q 120 70 180 50"/><line x1="60" y1="50" x2="60" y2="170"/><line x1="180" y1="50" x2="180" y2="170"/><line x1="60" y1="170" x2="180" y2="170"/><path d="M 60 170 Q 120 185 180 170"/><line x1="60" y1="50" x2="180" y2="170"/><path d="M 60 50 Q 140 90 180 170"/><path d="M 60 50 Q 100 130 180 170"/><circle cx="195" cy="40" r="10"/><circle cx="45" cy="180" r="10"/><circle cx="195" cy="180" r="10"/></g><circle cx="60" cy="50" r="4" fill="#e53e3e"/><text x="45" y="45" font-size="14" font-style="italic">a</text><circle cx="180" cy="50" r="4" fill="#e53e3e"/><text x="195" y="70" font-size="14" font-style="italic">b</text><circle cx="60" cy="170" r="4" fill="#e53e3e"/><text x="75" y="190" font-size="14" font-style="italic">d</text><circle cx="180" cy="170" r="4" fill="#e53e3e"/><text x="195" y="200" font-size="14" font-style="italic">c</text></svg>',
        "verification_source": "v2/verification/batch_023_results.json",
        "original_image": "0914_q914_Question_914.png"
    },
    {
        "id": 915,
        "question": "Cho \\(G\\) là đồ thị vô hướng có 3 đỉnh \\(A, B, C\\) với ma trận liên thuộc (incidence matrix) theo thứ tự đỉnh là:\n\\[ M = \\begin{bmatrix} 1 & 1 & 1 & 1 \\\\ 1 & 1 & 1 & 0 \\\\ 0 & 0 & 0 & 1 \\end{bmatrix} \\]\nCó bao nhiêu đường đi độ dài 2 từ đỉnh B đến đỉnh C?",
        "options": [
            "A. 3",
            "B. 2",
            "C. 1",
            "D. 4",
            "E. None of the other choices is correct"
        ],
        "answer": "A",
        "explanation": [
            "Bước 1: Phân tích ma trận liên thuộc đỉnh - cạnh \\(M\\) (các hàng là đỉnh \\(A, B, C\\), các cột là cạnh \\(e_1, e_2, e_3, e_4\\)):",
            "- Cột 1: có số 1 tại hàng \\(A\\) và \\(B\\) -> cạnh \\(e_1 = (A, B)\\).",
            "- Cột 2: có số 1 tại hàng \\(A\\) và \\(B\\) -> cạnh \\(e_2 = (A, B)\\).",
            "- Cột 3: có số 1 tại hàng \\(A\\) và \\(B\\) -> cạnh \\(e_3 = (A, B)\\).",
            "- Cột 4: có số 1 tại hàng \\(A\\) và \\(C\\) -> cạnh \\(e_4 = (A, C)\\).",
            "Bước 2: Tìm số đường đi độ dài 2 từ \\(B\\) đến \\(C\\):",
            "Một đường đi độ dài 2 từ \\(B\\) đến \\(C\\) bắt buộc phải qua đỉnh trung gian \\(A\\) vì chỉ có \\(A\\) nối với \\(C\\).",
            "- Đi từ \\(B\\) đến \\(A\\): có 3 cạnh song song \\(e_1, e_2, e_3\\) (3 cách).",
            "- Đi từ \\(A\\) đến \\(C\\): có 1 cạnh \\(e_4\\) (1 cách).",
            "Số đường đi phân biệt là \\(3 \\times 1 = 3\\) đường đi (tương ứng các dãy cạnh \\(e_1 e_4\\), \\(e_2 e_4\\), \\(e_3 e_4\\)).",
            "Đáp án đúng là A."
        ],
        "chapter": "Ch8_Graphs",
        "difficulty": "medium",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_023_results.json",
        "original_image": "0915_q915_Question_915.png"
    },
    {
        "id": 916,
        "question": "Những đồ thị nào sau đây có đường đi Euler (Which graphs have Euler paths)?\\n(i) \\(K_{1,2}\\)\\n(ii) \\(K_2\\)\\n(iii) \\(K_{2,3}\\)\\n(iv) \\(Q_3\\)",
        "options": [
            "A. (i), (ii) and (iii)",
            "B. (ii) and (iii)",
            "C. Only (iv)",
            "D. (i) and (iv)",
            "E. Only (i)"
        ],
        "answer": "A",
        "explanation": [
            "Bước 1: Theo định lý Euler, một đồ thị vô hướng liên thông có đường đi Euler khi và chỉ khi nó có đúng 0 hoặc 2 đỉnh bậc lẻ.",
            "Bước 2: Kiểm tra số đỉnh bậc lẻ của từng đồ thị:",
            "- (i) \\(K_{1,2}\\): gồm 1 đỉnh bậc 2 và 2 đỉnh bậc 1 -> có đúng 2 đỉnh bậc lẻ -> CÓ đường đi Euler.",
            "- (ii) \\(K_2\\): gồm 2 đỉnh bậc 1 -> có đúng 2 đỉnh bậc lẻ -> CÓ đường đi Euler.",
            "- (iii) \\(K_{2,3}\\): gồm 2 đỉnh bậc 3 (bậc lẻ) và 3 đỉnh bậc 2 (bậc chẵn) -> có đúng 2 đỉnh bậc lẻ -> CÓ đường đi Euler.",
            "- (iv) \\(Q_3\\): là đồ thị 3-chính quy gồm 8 đỉnh, tất cả 8 đỉnh đều có bậc 3 (bậc lẻ) -> có 8 đỉnh bậc lẻ (> 2) -> KHÔNG có đường đi Euler.",
            "Vậy các đồ thị có đường đi Euler là (i), (ii) và (iii).",
            "Đáp án chính xác là A."
        ],
        "chapter": "Ch8_Graphs",
        "difficulty": "medium",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_023_results.json",
        "original_image": "0916_q916_Question_916.png"
    },
    {
        "id": 917,
        "question": "Có 4 đồng xu, trong đó có một đồng xu giả có khối lượng khác (nặng hơn hoặc nhẹ hơn) so với các đồng xu thật còn lại. Sử dụng cân đĩa thăng bằng hai bên, cần ít nhất bao nhiêu lần cân để xác định chắc chắn đồng xu giả (không cần biết đồng xu giả nặng hơn hay nhẹ hơn)?",
        "options": [
            "A. 1",
            "B. 2",
            "C. 3",
            "D. None of the other choices is correct",
            "E. 4"
        ],
        "answer": "B",
        "explanation": [
            "Bước 1: Đánh số 4 đồng xu là A, B, C, D.",
            "Lần cân 1: Đặt A lên đĩa trái, B lên đĩa phải.",
            "Bước 2: Phân tích hai trường hợp của lần cân 1:",
            "- Trường hợp 1: Cân thăng bằng (A = B). Điều này chứng minh A và B là hai đồng xu thật, đồng xu giả nằm trong tập \\(\\{C, D\\}\\).",
            "  + Lần cân 2: Đặt C lên đĩa trái và đặt đồng xu thật A lên đĩa phải. Nếu cân lệch, C là xu giả; nếu cân thăng bằng, D là xu giả.",
            "- Trường hợp 2: Cân lệch (A khác B). Điều này chứng minh C và D là hai đồng xu thật, đồng xu giả nằm trong tập \\(\\{A, B\\}\\).",
            "  + Lần cân 2: Đặt A lên đĩa trái và đặt đồng xu thật C lên đĩa phải. Nếu cân lệch, A là xu giả; nếu cân thăng bằng, B là xu giả.",
            "Trong mọi kịch bản, đúng 2 lần cân là đủ để tìm chính xác đồng xu giả.",
            "Đáp án đúng là B (2)."
        ],
        "chapter": "Ch9_Trees",
        "difficulty": "medium",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_023_results.json",
        "original_image": "0917_q917_Question_917.png"
    },
    {
        "id": 918,
        "question": "Cho \\(L(x, y)\\) là mệnh đề \"\\(\\sin(x + y) = 1\\)\". Dịch câu sau sang biểu thức logic: \"Với mọi x, có nhiều hơn một y sao cho \\(\\sin(x + y) = 1\\)\" (For any x, there are more than one y so that sin(x + y) = 1).",
        "options": [
            "A. \\exists x (\\forall y L(x,y))",
            "B. \\forall x \\exists y (L(x,y) \\land \\exists y' ((y' \\ne y) \\land L(x,y')))",
            "C. \\forall x \\exists y (L(x,y) \\land \\forall y' ((y' \\ne y) \\to \\neg L(x,y')))",
            "D. \\forall x \\exists y (L(x,y) \\land \\exists y' ((y' \\ne y) \\land L(y', y)))",
            "E. None of the other choices is correct"
        ],
        "answer": "B",
        "explanation": [
            "Bước 1: Phân tích ý nghĩa mệnh đề:",
            "- \"Với mọi \\(x\\)\": biểu diễn bằng lượng từ \\(\\forall x\\).",
            "- \"Có nhiều hơn một \\(y\\)\" (tức có ít nhất hai giá trị \\(y\\) khác nhau): nghĩa là tồn tại một giá trị \\(y\\) thỏa mãn \\(L(x, y)\\), và đồng thời tồn tại một giá trị \\(y'\\) khác \\(y\\) (\\(y' \\ne y\\)) cũng thỏa mãn \\(L(x, y')\\).",
            "Bước 2: Kết hợp các thành phần logic:",
            "\\[ \\forall x \\exists y \\left( L(x, y) \\land \\exists y' ( (y' \\ne y) \\land L(x, y') ) \\right) \\]",
            "Biểu thức này hoàn toàn trùng khớp với phương án B.",
            "Đáp án đúng là B."
        ],
        "chapter": "Ch1_Logic_Proofs",
        "difficulty": "hard",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_023_results.json",
        "original_image": "0891_q918_Question_918.png" if os.path.exists("0891_q918_Question_918.png") else "0918_q918_Question_918.png"
    },
    {
        "id": 919,
        "question": "Cho các nhận định: \"Nếu bạn học chăm chỉ, bạn sẽ tốt nghiệp đúng hạn. Tuy nhiên, dù bạn học chăm chỉ, bạn không thể đạt bằng giỏi trừ khi bạn có chiến lược học tập hiệu quả. Nếu bạn đạt bằng giỏi, bạn sẽ dễ dàng kiếm được việc làm tốt sau khi tốt nghiệp\". Chọn kết luận tốt nhất từ các nhận định trên.",
        "options": [
            "A. Studying hard is sufficient for getting an excellent diploma.",
            "B. If you do not get the excellent diploma, it is hard for you to get good jobs after the graduation.",
            "C. You can easily get good jobs after the graduation only if you study hard and you have effective studying strategies.",
            "D. If you study hard and have effective studying strategies, you can easily get good jobs after the graduation."
        ],
        "answer": "D",
        "explanation": [
            "Bước 1: Ký hiệu các mệnh đề:",
            "- \\(H\\): Bạn học chăm chỉ.",
            "- \\(S\\): Bạn có chiến lược học tập hiệu quả.",
            "- \\(E\\): Bạn đạt bằng giỏi.",
            "- \\(J\\): Bạn dễ dàng kiếm được việc làm tốt.",
            "Theo đề bài: Có chiến lược hiệu quả \\(S\\) cùng việc học chăm chỉ \\(H\\) là điều kiện cần và đủ trong ngữ cảnh để mở đường đạt bằng giỏi \\(E\\), và đạt bằng giỏi \\(E \\to J\\).",
            "Bước 2: Kết hợp chuỗi suy luận:",
            "Khi kết hợp việc học chăm chỉ cùng với chiến lược học tập hiệu quả (\\(H \\land S\\)), sinh viên thỏa mãn đầy đủ các điều kiện để đạt bằng giỏi và từ đó dẫn tới dễ dàng kiếm được việc làm tốt sau khi ra trường (\\(J\\)).",
            "Do đó kết luận logic tốt nhất được đưa ra là phương án D.",
            "Đáp án đúng là D."
        ],
        "chapter": "Ch1_Logic_Proofs",
        "difficulty": "medium",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_023_results.json",
        "original_image": "0919_q919_Question_919.png"
    },
    {
        "id": 920,
        "question": "Cho tập vũ trụ \\(U = \\{0,1,2,3,4,5,6,7,8,9\\}\\). Cho \\(A, B\\) là các tập con của \\(U\\). Chuỗi bit biểu diễn tập \\(A\\) là `1010101010`, và chuỗi bit biểu diễn tập \\(B\\) là `0101010101`. Tìm giao của \\(A\\) và \\(B\\) (Find the intersection of A and B).",
        "options": [
            "A. The empty set",
            "B. {0,3}",
            "C. {2,4,7}",
            "D. U",
            "E. {0,1,4,6,9}"
        ],
        "answer": "A",
        "explanation": [
            "Bước 1: Phép giao của hai tập con tương ứng với phép toán bitwise AND trên hai chuỗi bit biểu diễn của chúng:",
            "\\[ A = 1010101010 \\]",
            "\\[ B = 0101010101 \\]",
            "Bước 2: Thực hiện phép toán AND theo từng bit:",
            "\\[ 1010101010 \\text{ AND } 0101010101 = 0000000000 \\]",
            "Chuỗi bit toàn số 0 biểu diễn tập hợp không chứa phần tử nào, tức là tập rỗng (The empty set \\(\\emptyset\\)).",
            "Đáp án chính xác là A."
        ],
        "chapter": "Ch2_Sets_Functions",
        "difficulty": "easy",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_023_results.json",
        "original_image": "0920_q920_Question_920.png"
    }
]

def main():
    with open("v2/questions_sample_v2.json", "r", encoding="utf-8") as f:
        existing = json.load(f)

    # Filter out any existing Q881 - Q920 to ensure idempotency
    existing_map = {q["id"]: q for q in existing if q["id"] < 881 or q["id"] > 920}
    
    for q in BATCH_23_QUESTIONS:
        existing_map[q["id"]] = q
        
    updated = [existing_map[k] for k in sorted(existing_map.keys())]
    
    print(f"Total questions after merging Batch 23: {len(updated)}")
    
    with open("v2/questions_sample_v2.json", "w", encoding="utf-8") as f:
        json.dump(updated, f, indent=2, ensure_ascii=False)
        
    # Also update v2/questions_v2.js for ES module export
    with open("v2/questions_v2.js", "w", encoding="utf-8") as f:
        f.write("export const sampleQuestions = ")
        json.dump(updated, f, indent=2, ensure_ascii=False)
        f.write(";\n")
        
    print("Updated v2/questions_sample_v2.json and v2/questions_v2.js.")

if __name__ == "__main__":
    main()
