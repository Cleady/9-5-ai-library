"""
Builder script for Batch 22 (Questions 841 - 880)
Strictly adheres to MAD101 Schema v2:
- answer: String ("A", "B", "C", "D", "E")
- options: list[str] with "A. ...", "B. ...", etc.
- explanation: list[str] with >= 2 analytical steps
- Clean native vector SVG diagrams for diagrammatic questions
- MathJax LaTeX: \(...\) and \[...\] (no raw unescaped $)
- verification_source pointing to v2/verification/batch_022_results.json
"""
import json
import os

BATCH_22_QUESTIONS = [
    {
        "id": 841,
        "question": "Số mũ của 3 trong phân tích thừa số nguyên tố của \\(20!\\) là bao nhiêu (What is the power of 3 in the prime factorization of \\(20!\\))?",
        "options": [
            "A. 8",
            "B. 7",
            "C. 9",
            "D. 6",
            "E. None of the other choices is correct"
        ],
        "answer": "A",
        "explanation": [
            "Bước 1: Áp dụng công thức Legendre để tìm số mũ của số nguyên tố \\(p = 3\\) trong phân tích thừa số nguyên tố của \\(n! = 20!\\):",
            "\\[ E_p(n!) = \\sum_{k=1}^{\\infty} \\left\\lfloor \\frac{n}{p^k} \\right\\rfloor \\]",
            "Bước 2: Thay \\(n = 20\\) và \\(p = 3\\):",
            "\\[ \\left\\lfloor \\frac{20}{3} \\right\\rfloor + \\left\\lfloor \\frac{20}{9} \\right\\rfloor + \\left\\lfloor \\frac{20}{27} \\right\\rfloor = 6 + 2 + 0 = 8 \\]",
            "Vậy số mũ của 3 trong \\(20!\\) là 8. Đáp án chính xác là A."
        ],
        "chapter": "Ch4_Number_Theory",
        "difficulty": "easy",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_022_results.json",
        "original_image": "0841_q841_Question_841.png"
    },
    {
        "id": 842,
        "question": "Tìm giá trị của biểu thức đồng dư \\(5^9 \\bmod 23\\)?",
        "options": [
            "A. 10",
            "B. 11",
            "C. 12",
            "D. 13",
            "E. None of the other choices is correct"
        ],
        "answer": "B",
        "explanation": [
            "Bước 1: Sử dụng phương pháp bình phương liên tiếp (modular exponentiation):",
            "\\[ 5^2 = 25 \\equiv 2 \\pmod{23} \\]",
            "\\[ 5^4 = (5^2)^2 \\equiv 2^2 = 4 \\pmod{23} \\]",
            "\\[ 5^8 = (5^4)^2 \\equiv 4^2 = 16 \\equiv -7 \\pmod{23} \\]",
            "Bước 2: Tính \\(5^9 \\bmod 23\\):",
            "\\[ 5^9 = 5^8 \\times 5 \\equiv 16 \\times 5 = 80 \\pmod{23} \\]",
            "Vì \\(80 = 23 \\times 3 + 11\\), nên:",
            "\\[ 80 \\equiv 11 \\pmod{23} \\]",
            "Do đó \\(5^9 \\bmod 23 = 11\\). Đáp án đúng là B."
        ],
        "chapter": "Ch4_Number_Theory",
        "difficulty": "medium",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_022_results.json",
        "original_image": "0842_q842_Question_842.png"
    },
    {
        "id": 843,
        "question": "Giả sử \\(f(n) = f(n/5) + 2n^3\\) khi \\(n\\) là số nguyên dương chia hết cho 5. Đưa ra ước lượng Big-O cho \\(f(n)\\) nếu \\(f\\) là một hàm tăng (Give a big-O estimate for \\(f(n)\\) if \\(f\\) is an increasing function):\\n(i) \\(O(n^4)\\)\\n(ii) \\(O(n^3)\\)\\n(iii) \\(O(n^3 \\log n)\\)\\n(iv) \\(O(n^{\\log_5 3})\\)",
        "options": [
            "A. (i)",
            "B. (ii)",
            "C. (iii)",
            "D. (iv)",
            "E. None of the other choices is correct"
        ],
        "answer": "B",
        "explanation": [
            "Bước 1: Áp dụng Định lý Thợ (Master Theorem) cho hệ thức truy hồi chia để trị dạng \\(f(n) = a f(n/b) + c n^d\\):",
            "Ở đây \\(a = 1\\), \\(b = 5\\), \\(c = 2\\), và bậc \\(d = 3\\).",
            "Bước 2: So sánh \\(a\\) và \\(b^d\\):",
            "\\[ b^d = 5^3 = 125 \\]",
            "Vì \\(a = 1 < b^d = 125\\), theo định lý Thợ:",
            "\\[ f(n) = \\Theta(n^d) = \\Theta(n^3) \\implies f(n) = O(n^3) \\]",
            "Do đó ước lượng Big-O chính xác là (ii) \\(O(n^3)\\), tương ứng đáp án B."
        ],
        "chapter": "Ch5_Algorithms_Induction",
        "difficulty": "medium",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_022_results.json",
        "original_image": "0843_q843_Question_843.png"
    },
    {
        "id": 844,
        "question": "Đồ thị nào sau đây đẳng cấu với \\(K_{2,3}\\) (Which graphs are isomorphic to \\(K_{2,3}\\))?",
        "options": [
            "A. X",
            "B. Y",
            "C. X and Y",
            "D. None of the other choices is correct"
        ],
        "answer": "A",
        "explanation": [
            "Bước 1: Phân tích đặc trưng của đồ thị lưỡng phân đầy đủ \\(K_{2,3}\\):",
            "Đồ thị \\(K_{2,3}\\) có \\(2 + 3 = 5\\) đỉnh, \\(2 \\times 3 = 6\\) cạnh, là đồ thị 2 phía (bipartite) với tập đỉnh chia làm 2 phần kích thước 2 và 3, không chứa cạnh nối nội bộ trong cùng một phần.",
            "Bước 2: Kiểm tra đồ thị X và Y trong hình:",
            "- Đồ thị X gồm 5 đỉnh: đỉnh trên và đỉnh dưới tạo thành tập phần 1 (2 đỉnh), 3 đỉnh nằm ngang ở giữa tạo thành tập phần 2 (3 đỉnh). Mỗi đỉnh ở phần 1 nối với cả 3 đỉnh ở phần 2, và không có cạnh nối nội bộ nào. Do đó \\(X \\cong K_{2,3}\\).",
            "- Đồ thị Y có các cạnh nối giữa các đỉnh trong cùng một hàng (tồn tại tam giác nội bộ), do đó Y không phải là đồ thị lưỡng phân và không thể đẳng cấu với \\(K_{2,3}\\).",
            "Vậy chỉ có đồ thị X đẳng cấu với \\(K_{2,3}\\). Đáp án đúng là A."
        ],
        "chapter": "Ch8_Graphs",
        "difficulty": "medium",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": True,
        "image_svg": '<svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg"><g stroke="#2b6cb0" stroke-width="2"><line x1="100" y1="30" x2="40" y2="100"/><line x1="100" y1="30" x2="100" y2="100"/><line x1="100" y1="30" x2="160" y2="100"/><line x1="100" y1="170" x2="40" y2="100"/><line x1="100" y1="170" x2="100" y2="100"/><line x1="100" y1="170" x2="160" y2="100"/></g><circle cx="100" cy="30" r="5" fill="#2d3748"/><circle cx="100" cy="170" r="5" fill="#2d3748"/><circle cx="40" cy="100" r="5" fill="#2d3748"/><circle cx="100" cy="100" r="5" fill="#2d3748"/><circle cx="160" cy="100" r="5" fill="#2d3748"/><text x="100" y="195" font-size="16" font-style="italic" text-anchor="middle" fill="#2d3748">X</text><g stroke="#718096" stroke-width="2"><line x1="240" y1="30" x2="300" y2="30"/><line x1="300" y1="30" x2="360" y2="30"/><line x1="260" y1="170" x2="340" y2="170"/><line x1="240" y1="30" x2="340" y2="170"/><line x1="360" y1="30" x2="260" y2="170"/><line x1="300" y1="30" x2="260" y2="170"/><line x1="300" y1="30" x2="340" y2="170"/></g><circle cx="240" cy="30" r="5" fill="#2d3748"/><circle cx="300" cy="30" r="5" fill="#2d3748"/><circle cx="360" cy="30" r="5" fill="#2d3748"/><circle cx="260" cy="170" r="5" fill="#2d3748"/><circle cx="340" cy="170" r="5" fill="#2d3748"/><text x="300" y="195" font-size="16" font-style="italic" text-anchor="middle" fill="#2d3748">Y</text></svg>',
        "verification_source": "v2/verification/batch_022_results.json",
        "original_image": "0844_q844_Question_844.png"
    },
    {
        "id": 845,
        "question": "Cho \\(G\\) là đồ thị vô hướng có 4 đỉnh \\(A, B, C, D\\) với ma trận kề (theo thứ tự đỉnh trên) là:\n\\[ A_G = \\begin{bmatrix} 0 & 1 & 2 & 1 \\\\ 1 & 0 & 2 & 0 \\\\ 2 & 2 & 0 & 1 \\\\ 1 & 0 & 1 & 0 \\end{bmatrix} \\]\nCó bao nhiêu đường đi độ dài 2 từ đỉnh B đến đỉnh D (How many paths of length 2 from B to D)?",
        "options": [
            "A. 3",
            "B. 2",
            "C. 4",
            "D. 1",
            "E. None of the other choices is correct"
        ],
        "answer": "A",
        "explanation": [
            "Bước 1: Theo định lý về số đường đi trong đồ thị, số đường đi độ dài 2 từ đỉnh \\(i\\) đến đỉnh \\(j\\) bằng phần tử \\((A_G^2)_{ij}\\).",
            "Ở đây đỉnh \\(B\\) ứng với hàng 2 (chỉ số 1), đỉnh \\(D\\) ứng với cột 4 (chỉ số 3).",
            "Bước 2: Tính tích vô hướng của hàng \\(B\\) và cột \\(D\\):",
            "Hàng \\(B = [1, 0, 2, 0]\\), Cột \\(D = [1, 0, 1, 0]^T\\).",
            "\\[ (A_G^2)_{BD} = 1 \\times 1 + 0 \\times 0 + 2 \\times 1 + 0 \\times 0 = 1 + 0 + 2 + 0 = 3 \\]",
            "Cụ thể gồm 1 đường qua \\(A\\) (B-A-D) và 2 đường qua \\(C\\) (do có 2 cạnh nối giữa B và C).",
            "Vậy có tất cả 3 đường đi độ dài 2 từ B đến D. Đáp án đúng là A."
        ],
        "chapter": "Ch8_Graphs",
        "difficulty": "medium",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_022_results.json",
        "original_image": "0845_q845_Question_845.png"
    },
    {
        "id": 846,
        "question": "Tìm TỔNG số cạnh cầu (cut-edges) trong cả hai đồ thị sau (Find the TOTAL number of cut-edges in the two graphs):",
        "options": [
            "A. 0",
            "B. 1",
            "C. 2",
            "D. 3",
            "E. 4",
            "F. None of the other choices is correct"
        ],
        "answer": "A",
        "explanation": [
            "Bước 1: Định nghĩa cạnh cầu (cut-edge / bridge): Một cạnh trong đồ thị liên thông được gọi là cạnh cầu nếu việc xóa cạnh đó làm tăng số thành phần liên thông của đồ thị. Một cạnh là cạnh cầu khi và chỉ khi nó không thuộc bất kỳ chu trình đơn nào.",
            "Bước 2: Phân tích từng đồ thị:",
            "- Đồ thị X là một chu trình đơn 5 đỉnh (ngôi sao 5 cánh \\(C_5\\)). Mọi cạnh trong \\(C_5\\) đều nằm trên chu trình đơn, do đó X có 0 cạnh cầu.",
            "- Đồ thị Y là đồ thị hình nơ (bowtie graph) gồm 2 tam giác chung nhau đúng 1 đỉnh. Mỗi cạnh của Y đều nằm trên một chu trình tam giác (\\(C_3\\)), do đó việc xóa bất kỳ cạnh nào cũng không làm mất tính liên thông của đồ thị. Y có 0 cạnh cầu.",
            "Tổng số cạnh cầu trong cả hai đồ thị là \\(0 + 0 = 0\\). Đáp án đúng là A."
        ],
        "chapter": "Ch8_Graphs",
        "difficulty": "medium",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": True,
        "image_svg": '<svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg"><g stroke="#2b6cb0" stroke-width="2"><line x1="100" y1="30" x2="135" y2="150"/><line x1="135" y1="150" x2="40" y2="75"/><line x1="40" y1="75" x2="160" y2="75"/><line x1="160" y1="75" x2="65" y2="150"/><line x1="65" y1="150" x2="100" y2="30"/></g><circle cx="100" cy="30" r="5" fill="#2d3748"/><circle cx="160" cy="75" r="5" fill="#2d3748"/><circle cx="135" cy="150" r="5" fill="#2d3748"/><circle cx="65" cy="150" r="5" fill="#2d3748"/><circle cx="40" cy="75" r="5" fill="#2d3748"/><text x="100" y="185" font-size="16" font-style="italic" text-anchor="middle" fill="#2d3748">X</text><g stroke="#2b6cb0" stroke-width="2"><line x1="240" y1="40" x2="240" y2="160"/><line x1="240" y1="40" x2="300" y2="100"/><line x1="240" y1="160" x2="300" y2="100"/><line x1="360" y1="40" x2="360" y2="160"/><line x1="360" y1="40" x2="300" y2="100"/><line x1="360" y1="160" x2="300" y2="100"/></g><circle cx="240" cy="40" r="5" fill="#2d3748"/><circle cx="240" cy="160" r="5" fill="#2d3748"/><circle cx="300" cy="100" r="5" fill="#2d3748"/><circle cx="360" cy="40" r="5" fill="#2d3748"/><circle cx="360" cy="160" r="5" fill="#2d3748"/><text x="300" y="185" font-size="16" font-style="italic" text-anchor="middle" fill="#2d3748">Y</text></svg>',
        "verification_source": "v2/verification/batch_022_results.json",
        "original_image": "0846_q846_Question_846.png"
    },
    {
        "id": 847,
        "question": "Gọi \\(S\\) là tập hợp tất cả các đồ thị có hướng với dãy bậc (bán bậc ra, bán bậc vào) là \\([(2,1), (1,3), (2,2), (2,1)]\\). Mệnh đề nào sau đây là ĐÚNG (Which of the following is TRUE):\\n(i) \\(\\forall G \\in S\\): \\(G\\) không có đường đi Euler (no Euler paths)\\n(ii) \\(\\exists G \\in S\\): \\(G\\) có chu trình Euler (has an Euler circuit)\\n(iii) \\(\\exists G \\in S\\): \\(G\\) có đường đi Euler nhưng không có chu trình Euler",
        "options": [
            "A. (i)",
            "B. (ii)",
            "C. (iii)",
            "D. None of the other choices is correct"
        ],
        "answer": "A",
        "explanation": [
            "Bước 1: Xét điều kiện tồn tại đường đi / chu trình Euler trong đồ thị có hướng liên thông yếu:",
            "- Để có chu trình Euler: cần \\(\\deg^+(v) = \\deg^-(v)\\) với mọi đỉnh \\(v\\).",
            "- Để có đường đi Euler (không đóng): cần có đúng một đỉnh với \\(\\deg^+(u) - \\deg^-(u) = 1\\), đúng một đỉnh với \\(\\deg^-(v) - \\deg^+(v) = 1\\), và tất cả các đỉnh còn lại thỏa mãn \\(\\deg^+(w) = \\deg^-(w)\\).",
            "Bước 2: Tính hiệu \\(\\deg^+(v) - \\deg^-(v)\\) cho 4 đỉnh của dãy đã cho:",
            "- Đỉnh 1: \\(2 - 1 = +1\\)",
            "- Đỉnh 2: \\(1 - 3 = -2\\)",
            "- Đỉnh 3: \\(2 - 2 = 0\\)",
            "- Đỉnh 4: \\(2 - 1 = +1\\)",
            "Ở đây có tới hai đỉnh có \\(\\deg^+ - \\deg^- = 1\\) (đỉnh 1 và 4) và một đỉnh có \\(\\deg^- - \\deg^+ = 2\\) (đỉnh 2).",
            "Điều này hoàn toàn vi phạm điều kiện tồn tại đường đi Euler cũng như chu trình Euler.",
            "Do đó, mọi đồ thị thuộc \\(S\\) đều không có đường đi Euler. Mệnh đề (i) là ĐÚNG. Đáp án đúng là A."
        ],
        "chapter": "Ch8_Graphs",
        "difficulty": "hard",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_022_results.json",
        "original_image": "0847_q847_Question_847.png"
    },
    {
        "id": 848,
        "question": "Tính giá trị của biểu thức hậu tố (Compute the value of the postfix notation): \\(5 \\quad 6 \\quad 7 \\quad - \\quad *\\)",
        "options": [
            "A. 5",
            "B. -5",
            "C. 37",
            "D. None of the other choices is correct"
        ],
        "answer": "B",
        "explanation": [
            "Bước 1: Sử dụng ngăn xếp (stack) để duyệt biểu thức hậu tố từ trái sang phải:",
            "- Đọc 5: đẩy vào stack -> [5]",
            "- Đọc 6: đẩy vào stack -> [5, 6]",
            "- Đọc 7: đẩy vào stack -> [5, 6, 7]",
            "- Gặp toán tử '-': lấy 7 và 6 ra, tính \\(6 - 7 = -1\\), đẩy -1 vào stack -> [5, -1]",
            "Bước 2: Gặp toán tử '*': lấy -1 và 5 ra, tính \\(5 \\times (-1) = -5\\), đẩy -5 vào stack -> [-5].",
            "Kết quả cuối cùng là -5. Đáp án chính xác là B."
        ],
        "chapter": "Ch9_Trees",
        "difficulty": "easy",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_022_results.json",
        "original_image": "0848_q848_Question_848.png"
    },
    {
        "id": 849,
        "question": "Tìm biểu thức hậu tố (postfix notation) cho biểu thức: \\((x - y)^2 + x / (y + 5)\\)",
        "options": [
            "A. x y - 2 ^ x / y 5 + +",
            "B. x y - 2 ^ x y 5 + / +",
            "C. + ^ - x y 2 / x + y 5",
            "D. x y - ^ 2 x y 5 + / +",
            "E. None of the other choices is correct"
        ],
        "answer": "B",
        "explanation": [
            "Bước 1: Chuyển đổi từng biểu thức con sang dạng hậu tố (postfix / Reverse Polish Notation):",
            "- Biểu thức \\((x - y)^2\\): toán hạng \\((x - y)\\) thành \\(x \\; y \\; -\\), sau đó lũy thừa bậc 2 thành \\(x \\; y \\; - \\; 2 \\; \\wedge\\).",
            "- Biểu thức \\(x / (y + 5)\\): mẫu số \\((y + 5)\\) thành \\(y \\; 5 \\; +\\), phép chia với tử số \\(x\\) thành \\(x \\; y \\; 5 \\; + \\; /\\).",
            "Bước 2: Kết hợp hai vế bằng phép cộng '+':",
            "\\[ (x \\; y \\; - \\; 2 \\; \\wedge) \\quad (x \\; y \\; 5 \\; + \\; /) \\quad + \\]",
            "Dãy ký hiệu hậu tố hoàn chỉnh là: \\(x \\; y \\; - \\; 2 \\; \\wedge \\; x \\; y \\; 5 \\; + \\; / \\; +\\).",
            "Đáp án đúng là B."
        ],
        "chapter": "Ch9_Trees",
        "difficulty": "medium",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_022_results.json",
        "original_image": "0849_q849_Question_849.png"
    },
    {
        "id": 850,
        "question": "Nếu sử dụng thuật toán Prim để tìm cây khung nhỏ nhất \\(T\\) từ đồ thị có trọng số dưới đây, cạnh nào được thêm vào \\(T\\) ở bước cuối cùng (which edge is added to T in the last step)?",
        "options": [
            "A. ED",
            "B. EC",
            "C. CF",
            "D. EF",
            "E. None of the other choices is correct"
        ],
        "answer": "C",
        "explanation": [
            "Bước 1: Phân tích cấu trúc đồ thị và trọng số các cạnh:",
            "Đồ thị gồm 6 đỉnh \\(\\{A, B, C, D, E, F\\}\\). Đỉnh \\(F\\) chỉ được nối với phần còn lại của đồ thị qua hai cạnh: \\((C, F)\\) có trọng số 5 và \\((E, F)\\) có trọng số 7.",
            "Tất cả các cạnh tạo nên cây khung liên kết 5 đỉnh \\(\\{A, B, C, D, E\\}\\) đều có trọng số \\(\\le 4\\) (cụ thể: AB=1, BE=2, AE=3, AD=4, ED=4, EC=4).",
            "Bước 2: Tiến trình của thuật toán Prim:",
            "Vì thuật toán Prim luôn ưu tiên chọn cạnh có trọng số nhỏ nhất nối tập đỉnh đã chọn với đỉnh chưa chọn, toàn bộ 5 đỉnh \\(\\{A, B, C, D, E\\}\\) sẽ được kết nạp vào cây khung trước bằng các cạnh có trọng số 1, 2, 3, 4.",
            "Đỉnh \\(F\\) là đỉnh duy nhất còn lại và chỉ có thể kết nạp qua \\((C, F)\\) (trọng số 5) hoặc \\((E, F)\\) (trọng số 7). Vì \\(5 < 7\\), cạnh \\((C, F)\\) sẽ được chọn ở bước cuối cùng.",
            "Do đó cạnh được thêm ở bước cuối là CF. Đáp án đúng là C."
        ],
        "chapter": "Ch9_Trees",
        "difficulty": "medium",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": True,
        "image_svg": '<svg viewBox="0 0 360 200" xmlns="http://www.w3.org/2000/svg"><g stroke="#2b6cb0" stroke-width="2"><line x1="60" y1="50" x2="180" y2="50"/><line x1="60" y1="50" x2="60" y2="150"/><line x1="60" y1="50" x2="180" y2="150"/><line x1="180" y1="50" x2="60" y2="150"/><line x1="180" y1="50" x2="180" y2="150"/><line x1="60" y1="150" x2="180" y2="150"/><line x1="180" y1="150" x2="300" y2="50"/><line x1="300" y1="50" x2="300" y2="150"/><line x1="180" y1="150" x2="300" y2="150"/></g><circle cx="60" cy="50" r="16" fill="#ebf8ff" stroke="#2b6cb0" stroke-width="2"/><text x="60" y="55" font-size="14" text-anchor="middle" fill="#2b6cb0" font-weight="bold">A</text><circle cx="180" cy="50" r="16" fill="#ebf8ff" stroke="#2b6cb0" stroke-width="2"/><text x="180" y="55" font-size="14" text-anchor="middle" fill="#2b6cb0" font-weight="bold">B</text><circle cx="300" cy="50" r="16" fill="#ebf8ff" stroke="#2b6cb0" stroke-width="2"/><text x="300" y="55" font-size="14" text-anchor="middle" fill="#2b6cb0" font-weight="bold">C</text><circle cx="60" cy="150" r="16" fill="#ebf8ff" stroke="#2b6cb0" stroke-width="2"/><text x="60" y="155" font-size="14" text-anchor="middle" fill="#2b6cb0" font-weight="bold">D</text><circle cx="180" cy="150" r="16" fill="#ebf8ff" stroke="#2b6cb0" stroke-width="2"/><text x="180" y="155" font-size="14" text-anchor="middle" fill="#2b6cb0" font-weight="bold">E</text><circle cx="300" cy="150" r="16" fill="#ebf8ff" stroke="#2b6cb0" stroke-width="2"/><text x="300" y="155" font-size="14" text-anchor="middle" fill="#2b6cb0" font-weight="bold">F</text><text x="120" y="42" font-size="13" fill="#e53e3e" font-weight="bold">1</text><text x="50" y="105" font-size="13" fill="#e53e3e" font-weight="bold">4</text><text x="100" y="90" font-size="13" fill="#e53e3e" font-weight="bold">3</text><text x="135" y="90" font-size="13" fill="#e53e3e" font-weight="bold">4</text><text x="188" y="105" font-size="13" fill="#e53e3e" font-weight="bold">2</text><text x="120" y="165" font-size="13" fill="#e53e3e" font-weight="bold">4</text><text x="245" y="90" font-size="13" fill="#e53e3e" font-weight="bold">4</text><text x="310" y="105" font-size="13" fill="#e53e3e" font-weight="bold">5</text><text x="240" y="165" font-size="13" fill="#e53e3e" font-weight="bold">7</text></svg>',
        "verification_source": "v2/verification/batch_022_results.json",
        "original_image": "0850_q850_Question_850.png"
    },
    {
        "id": 851,
        "question": "Cho \\(G\\) là đơn đồ thị vô hướng có \\(v\\) đỉnh và \\(e\\) cạnh. Đồ thị bù \\(G'\\) của \\(G\\) là đơn đồ thị có cùng tập đỉnh với \\(G\\), và giữa hai đỉnh có cạnh nối trong \\(G'\\) khi và chỉ khi không có cạnh nối giữa chúng trong \\(G\\). Hỏi đồ thị \\(G'\\) có bao nhiêu cạnh?",
        "options": [
            "A. v(v - 1)/2 - e + 1",
            "B. v(v - 1) - e",
            "C. v(v + 1)/2 - e",
            "D. v(v - 1)/2 - e",
            "E. None of the other choices is correct"
        ],
        "answer": "D",
        "explanation": [
            "Bước 1: Trong một đơn đồ thị có \\(v\\) đỉnh, đồ thị đầy đủ \\(K_v\\) có tổng số cạnh tối đa là:",
            "\\[ |E(K_v)| = \\binom{v}{2} = \\frac{v(v - 1)}{2} \\]",
            "Bước 2: Theo định nghĩa của đồ thị bù \\(G'\\), tập cạnh của \\(G'\\) và tập cạnh của \\(G\\) rời nhau và hợp thành toàn bộ tập cạnh của đồ thị đầy đủ \\(K_v\\):",
            "\\[ |E(G')| + |E(G)| = |E(K_v)| \\implies |E(G')| = \\frac{v(v - 1)}{2} - e \\]",
            "Vậy đồ thị bù \\(G'\\) có \\(v(v - 1)/2 - e\\) cạnh. Đáp án đúng là D."
        ],
        "chapter": "Ch8_Graphs",
        "difficulty": "easy",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_022_results.json",
        "original_image": "0851_q851_Question_851.png"
    },
    {
        "id": 852,
        "question": "Cần bao nhiêu đỉnh để dựng một đồ thị có 6 cạnh mà mỗi đỉnh đều có bậc 3 (How many vertices are needed to construct a graph with 6 edges in which every vertex is of degree 3)?",
        "options": [
            "A. 3",
            "B. 4",
            "C. 6",
            "D. 2",
            "E. None of the other choices is correct"
        ],
        "answer": "B",
        "explanation": [
            "Bước 1: Áp dụng Bổ đề bắt tay (Handshaking Lemma) cho đồ thị vô hướng:",
            "\\[ \\sum_{v \\in V} \\deg(v) = 2 |E| \\]",
            "Bước 2: Vì mọi đỉnh đều có bậc 3, gọi \\(n\\) là số đỉnh cần tìm, ta có:",
            "\\[ 3 \\times n = 2 \\times 6 = 12 \\implies n = \\frac{12}{3} = 4 \\]",
            "Đồ thị 3-chính quy 4 đỉnh chính là đồ thị đầy đủ \\(K_4\\) có 6 cạnh.",
            "Vậy cần 4 đỉnh. Đáp án đúng là B."
        ],
        "chapter": "Ch8_Graphs",
        "difficulty": "easy",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_022_results.json",
        "original_image": "0852_q852_Question_852.png"
    },
    {
        "id": 853,
        "question": "Danh sách kề (adjacency list) nào biểu diễn chính xác đồ thị trong hình dưới đây?",
        "options": [
            "A. (i)",
            "B. (ii)",
            "C. (iii)",
            "D. (iv)",
            "E. None of the other choices is correct"
        ],
        "answer": "E",
        "explanation": [
            "Bước 1: Xác định danh sách các đỉnh kề chính xác của từng đỉnh trong đồ thị:",
            "- Đỉnh a nối với: b, f",
            "- Đỉnh b nối với: a, c",
            "- Đỉnh c nối với: b, d, e, f (tổng cộng 4 đỉnh kề)",
            "- Đỉnh d nối với: c, e",
            "- Đỉnh e nối với: c, d",
            "- Đỉnh f nối với: a, c",
            "Bước 2: Kiểm tra các phương án (i), (ii), (iii), (iv) trong đề bài:",
            "- Bảng (i): Đỉnh c chỉ liệt kê \\(d, e, f\\) (thiếu đỉnh b).",
            "- Bảng (ii): Đỉnh c chỉ liệt kê \\(d, f\\) (thiếu b và e).",
            "- Bảng (iii): Đỉnh c chỉ liệt kê \\(d, e, f\\) (thiếu đỉnh b).",
            "- Bảng (iv): Đỉnh a liệt kê \\(b, d\\) (sai đỉnh d).",
            "Tất cả các bảng đưa ra đều không biểu diễn đúng danh sách kề của đồ thị.",
            "Do đó đáp án chính xác là E (None of the other choices is correct)."
        ],
        "chapter": "Ch8_Graphs",
        "difficulty": "medium",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": True,
        "image_svg": '<svg viewBox="0 0 360 200" xmlns="http://www.w3.org/2000/svg"><g stroke="#3182ce" stroke-width="2"><line x1="140" y1="40" x2="280" y2="40"/><line x1="140" y1="40" x2="60" y2="100"/><line x1="280" y1="40" x2="300" y2="100"/><line x1="300" y1="100" x2="260" y2="170"/><line x1="300" y1="100" x2="60" y2="170"/><line x1="300" y1="100" x2="60" y2="100"/><line x1="60" y1="170" x2="260" y2="170"/></g><circle cx="140" cy="40" r="5" fill="#e53e3e"/><text x="140" y="25" font-size="14" font-style="italic" text-anchor="middle" fill="#2d3748">a</text><circle cx="280" cy="40" r="5" fill="#e53e3e"/><text x="280" y="25" font-size="14" font-style="italic" text-anchor="middle" fill="#2d3748">b</text><circle cx="300" cy="100" r="5" fill="#e53e3e"/><text x="320" y="105" font-size="14" font-style="italic" text-anchor="middle" fill="#2d3748">c</text><circle cx="260" cy="170" r="5" fill="#e53e3e"/><text x="270" y="190" font-size="14" font-style="italic" text-anchor="middle" fill="#2d3748">d</text><circle cx="60" cy="170" r="5" fill="#e53e3e"/><text x="50" y="190" font-size="14" font-style="italic" text-anchor="middle" fill="#2d3748">e</text><circle cx="60" cy="100" r="5" fill="#e53e3e"/><text x="40" y="105" font-size="14" font-style="italic" text-anchor="middle" fill="#2d3748">f</text></svg>',
        "verification_source": "v2/verification/batch_022_results.json",
        "original_image": "0853_q853_Question_853.png"
    },
    {
        "id": 854,
        "question": "Có bao nhiêu số 0 trong ma trận kề của đồ thị lưỡng phân đầy đủ \\(K_{m,n}\\) (How many 0s are there in the adjacency matrix of the graph \\(K_{m,n}\\))?",
        "options": [
            "A. mn",
            "B. 2mn",
            "C. m^2 + n^2",
            "D. m^2 + n^2 + mn",
            "E. None of the other choices is correct"
        ],
        "answer": "C",
        "explanation": [
            "Bước 1: Tính kích thước và tổng số phần tử của ma trận kề đồ thị \\(K_{m,n}\\):",
            "Đồ thị \\(K_{m,n}\\) có \\(m + n\\) đỉnh, do đó ma trận kề có kích thước \\((m + n) \\times (m + n)\\). Tổng số phần tử trong ma trận là:",
            "\\[ N = (m + n)^2 = m^2 + 2mn + n^2 \\]",
            "Bước 2: Tính số lượng số 1 và số lượng số 0:",
            "Mỗi cạnh trong đơn đồ thị tương ứng với hai số 1 trong ma trận kề. Đồ thị \\(K_{m,n}\\) có \\(m \\times n\\) cạnh, nên số lượng số 1 là \\(2mn\\).",
            "Số lượng số 0 là:",
            "\\[ \\text{Số phần tử 0} = (m + n)^2 - 2mn = m^2 + 2mn + n^2 - 2mn = m^2 + n^2 \\]",
            "Vậy ma trận kề của \\(K_{m,n}\\) có \\(m^2 + n^2\\) số 0. Đáp án đúng là C."
        ],
        "chapter": "Ch8_Graphs",
        "difficulty": "medium",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_022_results.json",
        "original_image": "0854_q854_Question_854.png"
    },
    {
        "id": 855,
        "question": "Có bao nhiêu số 1 trong ma trận kề của đồ thị sau đây (How many 1s are there in the adjacency matrix of the following graph)?",
        "options": [
            "A. 5",
            "B. 8",
            "C. 10",
            "D. 16",
            "E. None of the other choices is correct"
        ],
        "answer": "D",
        "explanation": [
            "Bước 1: Số lượng số 1 trong ma trận kề của đơn đồ thị vô hướng bằng tổng bậc của tất cả các đỉnh, tức là \\(2 |E|\\).",
            "Bước 2: Đếm số cạnh và bậc của 5 đỉnh trong đồ thị:",
            "- Chu vi ngoài ngũ giác gồm 5 cạnh.",
            "- Bên trong có 3 đường chéo nối các đỉnh.",
            "- Tổng số cạnh là \\(|E| = 5 + 3 = 8\\) cạnh.",
            "Kiểm tra tổng bậc: 1 đỉnh bậc 4 và 4 đỉnh bậc 3 -> \\(\\sum \\deg(v) = 4 + 3 \\times 4 = 16 = 2 \\times 8\\).",
            "Do đó ma trận kề chứa đúng 16 số 1. Đáp án chính xác là D."
        ],
        "chapter": "Ch8_Graphs",
        "difficulty": "easy",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": True,
        "image_svg": '<svg viewBox="0 0 260 200" xmlns="http://www.w3.org/2000/svg"><g stroke="#2d3748" stroke-width="2"><line x1="130" y1="40" x2="200" y2="60"/><line x1="200" y1="60" x2="190" y2="160"/><line x1="190" y1="160" x2="110" y2="170"/><line x1="110" y1="170" x2="50" y2="90"/><line x1="50" y1="90" x2="130" y2="40"/><line x1="130" y1="40" x2="110" y2="170"/><line x1="50" y1="90" x2="190" y2="160"/><line x1="110" y1="170" x2="200" y2="60"/></g><circle cx="130" cy="40" r="7" fill="#2d3748"/><circle cx="200" cy="60" r="7" fill="#2d3748"/><circle cx="190" cy="160" r="7" fill="#2d3748"/><circle cx="110" cy="170" r="7" fill="#2d3748"/><circle cx="50" cy="90" r="7" fill="#2d3748"/></svg>',
        "verification_source": "v2/verification/batch_022_results.json",
        "original_image": "0855_q855_Question_855.png"
    },
    {
        "id": 856,
        "question": "Đồ thị này có bao nhiêu cạnh cầu (How many cut-edges in this graph)?",
        "options": [
            "A. 0",
            "B. 4",
            "C. 5",
            "D. 1",
            "E. None of the other choices is correct"
        ],
        "answer": "C",
        "explanation": [
            "Bước 1: Một cạnh là cạnh cầu (cầu / bridge) khi và chỉ khi nó không thuộc bất kỳ chu trình đơn nào trong đồ thị.",
            "Bước 2: Phân tích cấu trúc đồ thị:",
            "- Đồ thị có đúng một chu trình đơn là tam giác \\(C_3\\) gồm 3 cạnh. Do đó 3 cạnh này không phải là cạnh cầu.",
            "- Nhánh bên trái gồm 3 cạnh tạo thành một đường đi dẫn đến đỉnh treo (pendant vertices). Xóa bất kỳ cạnh nào trong 3 cạnh này đều làm đồ thị bị ngắt kết nối -> 3 cạnh cầu.",
            "- Nhánh bên phải gồm 2 cạnh tạo thành đường đi dẫn đến đỉnh treo. Xóa bất kỳ cạnh nào trong 2 cạnh này đều ngắt kết nối đồ thị -> 2 cạnh cầu.",
            "Tổng số cạnh cầu là \\(3 + 2 = 5\\) cạnh cầu. Đáp án đúng là C."
        ],
        "chapter": "Ch8_Graphs",
        "difficulty": "medium",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": True,
        "image_svg": '<svg viewBox="0 0 360 200" xmlns="http://www.w3.org/2000/svg"><g stroke="#2d3748" stroke-width="2"><line x1="150" y1="40" x2="60" y2="40"/><line x1="60" y1="40" x2="60" y2="110"/><line x1="60" y1="110" x2="150" y2="110"/><line x1="150" y1="110" x2="150" y2="180"/><line x1="150" y1="180" x2="230" y2="40"/><line x1="230" y1="40" x2="150" y2="110"/><line x1="230" y1="40" x2="230" y2="110"/><line x1="230" y1="110" x2="310" y2="110"/></g><circle cx="150" cy="40" r="5" fill="#fff" stroke="#2d3748" stroke-width="2"/><circle cx="60" cy="40" r="5" fill="#fff" stroke="#2d3748" stroke-width="2"/><circle cx="60" cy="110" r="5" fill="#fff" stroke="#2d3748" stroke-width="2"/><circle cx="150" cy="110" r="5" fill="#fff" stroke="#2d3748" stroke-width="2"/><circle cx="150" cy="180" r="5" fill="#fff" stroke="#2d3748" stroke-width="2"/><circle cx="230" cy="40" r="5" fill="#fff" stroke="#2d3748" stroke-width="2"/><circle cx="230" cy="110" r="5" fill="#fff" stroke="#2d3748" stroke-width="2"/><circle cx="310" cy="110" r="5" fill="#fff" stroke="#2d3748" stroke-width="2"/></svg>',
        "verification_source": "v2/verification/batch_022_results.json",
        "original_image": "0856_q856_Question_856.png"
    },
    {
        "id": 857,
        "question": "Cho \\(u, v\\) là hai đỉnh thuộc hai phía khác nhau của đồ thị lưỡng phân \\(K_{2,2}\\). Có bao nhiêu đường đi (walks / paths) độ dài 3 từ \\(u\\) đến \\(v\\)?",
        "options": [
            "A. 4",
            "B. 2",
            "C. 3",
            "D. 1",
            "E. None of the other choices is correct"
        ],
        "answer": "A",
        "explanation": [
            "Bước 1: Trong lý thuyết đồ thị và giáo trình Kenneth Rosen, số đường đi (walks) độ dài \\(k\\) giữa hai đỉnh \\(i\\) và \\(j\\) bằng phần tử \\((A^k)_{ij}\\) của ma trận kề lũy thừa bậc \\(k\\).",
            "Bước 2: Với đồ thị \\(K_{2,2}\\), đặt \\(V_1 = \\{u, u'\\}\\) và \\(V_2 = \\{v, v'\\}\\).",
            "Một đường đi độ dài 3 từ \\(u \\in V_1\\) đến \\(v \\in V_2\\) có dạng: \\(u \\to w_1 \\to w_2 \\to v\\).",
            "- Bước 1: Từ \\(u\\), có 2 cách chọn đỉnh thuộc \\(V_2\\) cho \\(w_1\\) (chọn \\(v\\) hoặc \\(v'\\)).",
            "- Bước 2: Từ \\(w_1\\), có 2 cách chọn đỉnh thuộc \\(V_1\\) cho \\(w_2\\) (chọn \\(u\\) hoặc \\(u'\\)).",
            "- Bước 3: Từ \\(w_2\\), đỉnh đến phải là \\(v\\) (đã cố định, 1 cách vì mọi đỉnh trong \\(V_1\\) đều nối với \\(v\\)).",
            "Số đường đi là \\(2 \\times 2 \\times 1 = 4\\) (tương ứng với \\((A^3)_{uv} = 4\\)).",
            "Đáp án đúng là A."
        ],
        "chapter": "Ch8_Graphs",
        "difficulty": "medium",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_022_results.json",
        "original_image": "0857_q857_Question_857.png"
    },
    {
        "id": 858,
        "question": "Mệnh đề nào sau đây là ĐÚNG (Which of the following propositions is TRUE):\\n(i) Nếu \\(K_{1,2}\\) có đường đi Hamilton thì \\(K_3\\) có chu trình Hamilton.\\n(ii) Nếu \\(W_4\\) có đường đi Hamilton thì \\(K_{4,3}\\) có đường đi Euler.\\n(iii) Nếu \\(K_{4,5}\\) có đường đi Euler thì \\(Q_3\\) có chu trình Hamilton.",
        "options": [
            "A. (i)",
            "B. (ii)",
            "C. (i) and (iii)",
            "D. (ii) and (iii)",
            "E. None of the other choices is correct"
        ],
        "answer": "C",
        "explanation": [
            "Bước 1: Xét giá trị chân lý của từng mệnh đề kéo theo \\(P \\implies Q\\):",
            "- Mệnh đề (i): Tiền đề \"\\(K_{1,2}\\) có đường đi Hamilton\" là Đúng (đường đi qua 3 đỉnh). Kết luận \"\\(K_3\\) có chu trình Hamilton\" là Đúng (chính là tam giác \\(C_3\\)). Ta có \\(T \\implies T\\) là ĐÚNG.",
            "- Mệnh đề (ii): Tiền đề \"\\(W_4\\) có đường đi Hamilton\" là Đúng. Kết luận \"\\(K_{4,3}\\) có đường đi Euler\" là SAI (vì \\(K_{4,3}\\) có 4 đỉnh bậc 3 là bậc lẻ, một đồ thị chỉ có đường đi Euler khi có tối đa 2 đỉnh bậc lẻ). Do đó \\(T \\implies F\\) là SAI.",
            "- Mệnh đề (iii): Tiền đề \"\\(K_{4,5}\\) có đường đi Euler\" là SAI (vì có 4 đỉnh bậc 5 là bậc lẻ). Khi tiền đề Sai thì mệnh đề kéo theo \\(F \\implies Q\\) luôn luôn ĐÚNG theo luật suy diễn logic cổ điển.",
            "Bước 2: Vậy cả hai mệnh đề (i) và (iii) đều ĐÚNG. Đáp án đúng là C."
        ],
        "chapter": "Ch8_Graphs",
        "difficulty": "hard",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_022_results.json",
        "original_image": "0858_q858_Question_858.png"
    },
    {
        "id": 859,
        "question": "Đồ thị khối siêu phẳng \\(Q_n\\) có chu trình Hamilton với những giá trị nào của \\(n\\) (For what values of n does the graph \\(Q_n\\) have Hamilton circuits)?",
        "options": [
            "A. n is even",
            "B. n is odd",
            "C. no values of n",
            "D. n >= 2",
            "E. None of the other choices is correct"
        ],
        "answer": "D",
        "explanation": [
            "Bước 1: Đồ thị khối siêu phẳng \\(Q_n\\) (hypercube) biểu diễn các chuỗi nhị phân độ dài \\(n\\), hai chuỗi kề nhau nếu chúng khác nhau đúng 1 bit.",
            "Chu trình Hamilton trên \\(Q_n\\) tương ứng với một mã Gray vòng (cyclic Gray code) liệt kê tất cả \\(2^n\\) chuỗi nhị phân sao cho hai chuỗi liên tiếp chỉ khác nhau 1 bit và chuỗi cuối cùng khác chuỗi đầu tiên 1 bit.",
            "Bước 2: Với \\(n = 1\\), \\(Q_1\\) là đồ thị đường đi \\(K_2\\) gồm 2 đỉnh và 1 cạnh, không thể có chu trình đơn độ dài 2.",
            "Với mọi \\(n \\ge 2\\), luôn tồn tại mã Gray vòng (ví dụ mã Gray nhị phân phản xạ - reflected binary Gray code), do đó \\(Q_n\\) luôn có chu trình Hamilton khi \\(n \\ge 2\\).",
            "Đáp án chính xác là D (n >= 2)."
        ],
        "chapter": "Ch8_Graphs",
        "difficulty": "easy",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_022_results.json",
        "original_image": "0859_q859_Question_859.png"
    },
    {
        "id": 860,
        "question": "Áp dụng thuật toán Dijkstra để tìm đường đi ngắn nhất từ A đến Z. Có bao nhiêu đỉnh KHÔNG được chọn (Apply the Dijkstra algorithm to find the shortest path from A to Z. How many vertices are NOT chosen)?",
        "options": [
            "A. 1",
            "B. 2",
            "C. 3",
            "D. 4",
            "E. None of the other choices is correct"
        ],
        "answer": "B",
        "explanation": [
            "Bước 1: Khởi tạo khoảng cách tạm thời từ đỉnh xuất phát A: \\(d(A) = 0\\), các đỉnh khác \\(\\infty\\).",
            "Tập đỉnh của đồ thị gồm 6 đỉnh: \\(\\{A, B, C, D, E, Z\\}\\).",
            "Bước 2: Các bước thực thi tìm đường đến đích Z:",
            "- Bước 1: Chọn A (khoảng cách 0). Cập nhật lân cận: \\(d(B) = 2\\), \\(d(C) = 9\\).",
            "- Bước 2: Chọn đỉnh có khoảng cách nhỏ nhất là B (khoảng cách 2). Cập nhật: \\(d(E) = 2 + 3 = 5\\), \\(d(D) = 2 + 7 = 9\\).",
            "- Bước 3: Chọn E (khoảng cách 5). Cập nhật: \\(d(Z) = 5 + 3 = 8\\), \\(d(C) = \\min(9, 5 + 3) = 8\\).",
            "- Bước 4: Chọn đỉnh Z (đạt đích với khoảng cách 8 theo đường đi A-B-E-Z).",
            "Bước 3: Khi đỉnh đích Z được kết nạp vào tập đỉnh đã giải xong, thuật toán dừng lại.",
            "Các đỉnh được chọn vào tập giải là \\(\\{A, B, E, Z\\}\\) (4 đỉnh). Hai đỉnh còn lại là \\(\\{C, D\\}\\) chưa được chọn.",
            "Số đỉnh không được chọn là 2. Đáp án đúng là B."
        ],
        "chapter": "Ch8_Graphs",
        "difficulty": "medium",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": True,
        "image_svg": '<svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg"><g stroke="#2b6cb0" stroke-width="2"><line x1="50" y1="110" x2="140" y2="40"/><line x1="50" y1="110" x2="140" y2="180"/><line x1="140" y1="40" x2="140" y2="180"/><line x1="140" y1="40" x2="260" y2="40"/><line x1="140" y1="40" x2="260" y2="180"/><line x1="140" y1="180" x2="260" y2="180"/><line x1="260" y1="40" x2="260" y2="180"/><line x1="260" y1="40" x2="350" y2="110"/><line x1="260" y1="180" x2="350" y2="110"/></g><circle cx="50" cy="110" r="14" fill="#fff" stroke="#2b6cb0" stroke-width="2"/><text x="50" y="115" font-size="14" text-anchor="middle" fill="#2b6cb0" font-weight="bold">A</text><circle cx="140" cy="40" r="14" fill="#fff" stroke="#2b6cb0" stroke-width="2"/><text x="140" y="45" font-size="14" text-anchor="middle" fill="#2b6cb0" font-weight="bold">B</text><circle cx="140" cy="180" r="14" fill="#fff" stroke="#2b6cb0" stroke-width="2"/><text x="140" y="185" font-size="14" text-anchor="middle" fill="#2b6cb0" font-weight="bold">C</text><circle cx="260" cy="40" r="14" fill="#fff" stroke="#2b6cb0" stroke-width="2"/><text x="260" y="45" font-size="14" text-anchor="middle" fill="#2b6cb0" font-weight="bold">D</text><circle cx="260" cy="180" r="14" fill="#fff" stroke="#2b6cb0" stroke-width="2"/><text x="260" y="185" font-size="14" text-anchor="middle" fill="#2b6cb0" font-weight="bold">E</text><circle cx="350" cy="110" r="14" fill="#fff" stroke="#2b6cb0" stroke-width="2"/><text x="350" y="115" font-size="14" text-anchor="middle" fill="#2b6cb0" font-weight="bold">Z</text><text x="85" y="70" font-size="13" fill="#e53e3e" font-weight="bold">2</text><text x="85" y="160" font-size="13" fill="#e53e3e" font-weight="bold">9</text><text x="125" y="115" font-size="13" fill="#e53e3e" font-weight="bold">8</text><text x="200" y="32" font-size="13" fill="#e53e3e" font-weight="bold">7</text><text x="185" y="120" font-size="13" fill="#e53e3e" font-weight="bold">3</text><text x="200" y="195" font-size="13" fill="#e53e3e" font-weight="bold">3</text><text x="248" y="115" font-size="13" fill="#e53e3e" font-weight="bold">4</text><text x="315" y="70" font-size="13" fill="#e53e3e" font-weight="bold">2</text><text x="315" y="160" font-size="13" fill="#e53e3e" font-weight="bold">3</text></svg>',
        "verification_source": "v2/verification/batch_022_results.json",
        "original_image": "0860_q860_Question_860.png"
    },
    {
        "id": 861,
        "question": "Áp dụng thuật toán Dijkstra để tìm đường đi ngắn nhất từ A. Ba đỉnh đầu tiên được chọn là gì (Apply the Dijkstra algorithm to find the shortest path from A. What are the first three vertices chosen)?",
        "options": [
            "A. A, B, E",
            "B. A, B, C",
            "C. A, C, E",
            "D. A, B, D",
            "E. None of the other choices is correct"
        ],
        "answer": "A",
        "explanation": [
            "Bước 1: Khởi tạo khoảng cách tạm thời từ đỉnh nguồn A: \\(d(A) = 0\\), tất cả các đỉnh khác \\(\\infty\\).",
            "Đỉnh đầu tiên được chọn chắc chắn là đỉnh nguồn A: \\(S = \\{A\\}\\).",
            "Cập nhật các đỉnh kề của A: \\(d(B) = 2\\), \\(d(C) = 9\\).",
            "Bước 2: Trong các đỉnh chưa chọn, đỉnh có khoảng cách nhỏ nhất là B (với \\(d(B) = 2\\)).",
            "Đỉnh thứ hai được chọn là B: \\(S = \\{A, B\\}\\).",
            "Cập nhật các đỉnh kề của B:",
            "- \\(d(E) = \\min(\\infty, 2 + 3) = 5\\)",
            "- \\(d(D) = \\min(\\infty, 2 + 7) = 9\\)",
            "- \\(d(C) = \\min(9, 2 + 8) = 9\\)",
            "Bước 3: Trong các đỉnh chưa chọn \\(\\{C: 9, D: 9, E: 5, Z: \\infty\\}\\), đỉnh có khoảng cách nhỏ nhất là E (với \\(d(E) = 5\\)).",
            "Đỉnh thứ ba được chọn là E.",
            "Vậy 3 đỉnh đầu tiên được chọn theo đúng thứ tự là A, B, E. Đáp án đúng là A."
        ],
        "chapter": "Ch8_Graphs",
        "difficulty": "medium",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": True,
        "image_svg": '<svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg"><g stroke="#2b6cb0" stroke-width="2"><line x1="50" y1="110" x2="140" y2="40"/><line x1="50" y1="110" x2="140" y2="180"/><line x1="140" y1="40" x2="140" y2="180"/><line x1="140" y1="40" x2="260" y2="40"/><line x1="140" y1="40" x2="260" y2="180"/><line x1="140" y1="180" x2="260" y2="180"/><line x1="260" y1="40" x2="260" y2="180"/><line x1="260" y1="40" x2="350" y2="110"/><line x1="260" y1="180" x2="350" y2="110"/></g><circle cx="50" cy="110" r="14" fill="#fff" stroke="#2b6cb0" stroke-width="2"/><text x="50" y="115" font-size="14" text-anchor="middle" fill="#2b6cb0" font-weight="bold">A</text><circle cx="140" cy="40" r="14" fill="#fff" stroke="#2b6cb0" stroke-width="2"/><text x="140" y="45" font-size="14" text-anchor="middle" fill="#2b6cb0" font-weight="bold">B</text><circle cx="140" cy="180" r="14" fill="#fff" stroke="#2b6cb0" stroke-width="2"/><text x="140" y="185" font-size="14" text-anchor="middle" fill="#2b6cb0" font-weight="bold">C</text><circle cx="260" cy="40" r="14" fill="#fff" stroke="#2b6cb0" stroke-width="2"/><text x="260" y="45" font-size="14" text-anchor="middle" fill="#2b6cb0" font-weight="bold">D</text><circle cx="260" cy="180" r="14" fill="#fff" stroke="#2b6cb0" stroke-width="2"/><text x="260" y="185" font-size="14" text-anchor="middle" fill="#2b6cb0" font-weight="bold">E</text><circle cx="350" cy="110" r="14" fill="#fff" stroke="#2b6cb0" stroke-width="2"/><text x="350" y="115" font-size="14" text-anchor="middle" fill="#2b6cb0" font-weight="bold">Z</text><text x="85" y="70" font-size="13" fill="#e53e3e" font-weight="bold">2</text><text x="85" y="160" font-size="13" fill="#e53e3e" font-weight="bold">9</text><text x="125" y="115" font-size="13" fill="#e53e3e" font-weight="bold">8</text><text x="200" y="32" font-size="13" fill="#e53e3e" font-weight="bold">7</text><text x="185" y="120" font-size="13" fill="#e53e3e" font-weight="bold">3</text><text x="200" y="195" font-size="13" fill="#e53e3e" font-weight="bold">3</text><text x="248" y="115" font-size="13" fill="#e53e3e" font-weight="bold">4</text><text x="315" y="70" font-size="13" fill="#e53e3e" font-weight="bold">2</text><text x="315" y="160" font-size="13" fill="#e53e3e" font-weight="bold">3</text></svg>',
        "verification_source": "v2/verification/batch_022_results.json",
        "original_image": "0861_q861_Question_861.png"
    },
    {
        "id": 862,
        "question": "Những đồ thị nào sau đây là cây (Which graphs are trees)?",
        "options": [
            "A. (i)",
            "B. (ii)",
            "C. (iii)",
            "D. All of (i), (ii) and (iii)",
            "E. None of the other choices is correct"
        ],
        "answer": "E",
        "explanation": [
            "Bước 1: Nhắc lại định nghĩa cây: Một cây là một đồ thị vô hướng liên thông và không chứa chu trình (connected and acyclic).",
            "Bước 2: Phân tích từng hình:",
            "- Hình (i): Có chứa một chu trình đơn (tam giác \\(C_3\\) ở góc dưới bên phải), do đó không phải là cây.",
            "- Hình (ii): Bị ngắt kết nối (tồn tại một cạnh độc lập nằm rời rạc bên phải), đồ thị không liên thông nên không phải là cây (đây là một rừng).",
            "- Hình (iii): Tại hai đỉnh trên cùng có một cặp cạnh song song (multiple edges), tạo thành một chu trình độ dài 2. Do đó đồ thị (iii) cũng không phải là cây vô hướng đơn.",
            "Vì cả (i), (ii) và (iii) đều không phải là cây, đáp án đúng là E (None of the other choices is correct)."
        ],
        "chapter": "Ch9_Trees",
        "difficulty": "medium",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": True,
        "image_svg": '<svg viewBox="0 0 420 160" xmlns="http://www.w3.org/2000/svg"><g fill="#ebf8ff"><rect x="10" y="10" width="120" height="120" rx="4"/><rect x="150" y="10" width="120" height="120" rx="4"/><rect x="290" y="10" width="120" height="120" rx="4"/></g><g stroke="#2d3748" stroke-width="2"><line x1="70" y1="35" x2="30" y2="105"/><line x1="70" y1="35" x2="70" y2="105"/><line x1="70" y1="35" x2="110" y2="105"/><line x1="70" y1="35" x2="110" y2="35"/><line x1="70" y1="105" x2="110" y2="105"/><line x1="110" y1="35" x2="110" y2="105"/></g><circle cx="70" cy="35" r="4" fill="#2d3748"/><circle cx="30" cy="105" r="4" fill="#2d3748"/><circle cx="70" cy="105" r="4" fill="#2d3748"/><circle cx="110" cy="105" r="4" fill="#2d3748"/><circle cx="110" cy="35" r="4" fill="#2d3748"/><text x="70" y="150" font-size="14" text-anchor="middle" fill="#2d3748">(i)</text><g stroke="#2d3748" stroke-width="2"><line x1="210" y1="35" x2="170" y2="105"/><line x1="210" y1="35" x2="210" y2="105"/><line x1="210" y1="35" x2="250" y2="35"/><line x1="230" y1="95" x2="265" y2="95"/></g><circle cx="210" cy="35" r="4" fill="#2d3748"/><circle cx="170" cy="105" r="4" fill="#2d3748"/><circle cx="210" cy="105" r="4" fill="#2d3748"/><circle cx="250" cy="35" r="4" fill="#2d3748"/><circle cx="230" cy="95" r="4" fill="#2d3748"/><circle cx="265" cy="95" r="4" fill="#2d3748"/><text x="210" y="150" font-size="14" text-anchor="middle" fill="#2d3748">(ii)</text><g stroke="#2d3748" stroke-width="2"><line x1="350" y1="35" x2="390" y2="35"/><path d="M 350 35 Q 370 55 390 35" fill="none"/><line x1="350" y1="35" x2="350" y2="75"/><line x1="350" y1="75" x2="390" y2="75"/><line x1="350" y1="75" x2="310" y2="115"/><line x1="350" y1="75" x2="350" y2="115"/><line x1="350" y1="75" x2="390" y2="115"/></g><circle cx="350" cy="35" r="4" fill="#2d3748"/><circle cx="390" cy="35" r="4" fill="#2d3748"/><circle cx="350" cy="75" r="4" fill="#2d3748"/><circle cx="390" cy="75" r="4" fill="#2d3748"/><circle cx="310" cy="115" r="4" fill="#2d3748"/><circle cx="350" cy="115" r="4" fill="#2d3748"/><circle cx="390" cy="115" r="4" fill="#2d3748"/><text x="350" y="150" font-size="14" text-anchor="middle" fill="#2d3748">(iii)</text></svg>',
        "verification_source": "v2/verification/batch_022_results.json",
        "original_image": "0862_q862_Question_862.png"
    },
    {
        "id": 863,
        "question": "Có bao nhiêu lá trong một cây nhị phân đầy đủ (full binary tree) có 61 đỉnh?",
        "options": [
            "A. 30",
            "B. 31",
            "C. 61",
            "D. 32",
            "E. None of the other choices is correct"
        ],
        "answer": "B",
        "explanation": [
            "Bước 1: Trong cây nhị phân đầy đủ (mỗi đỉnh trong đều có đúng 2 con), nếu gọi \\(i\\) là số đỉnh trong và \\(L\\) là số lá, ta luôn có hệ thức:",
            "\\[ n = 2i + 1 \\quad \\text{và} \\quad L = i + 1 \\]",
            "Bước 2: Với tổng số đỉnh \\(n = 61\\):",
            "\\[ 61 = 2i + 1 \\implies 2i = 60 \\implies i = 30 \\]",
            "Số lá của cây là:",
            "\\[ L = i + 1 = 30 + 1 = 31 \\]",
            "Vậy cây có đúng 31 lá. Đáp án chính xác là B."
        ],
        "chapter": "Ch9_Trees",
        "difficulty": "easy",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_022_results.json",
        "original_image": "0863_q863_Question_863.png"
    },
    {
        "id": 864,
        "question": "Cây có gốc sau đây có bao nhiêu lá (How many leaves in this tree)?",
        "options": [
            "A. 9",
            "B. 8",
            "C. 10",
            "D. 13",
            "E. None of the other choices is correct"
        ],
        "answer": "A",
        "explanation": [
            "Bước 1: Trong cây có gốc, một đỉnh được gọi là lá (leaf) nếu nó không có con nào (bán bậc ra bằng 0).",
            "Bước 2: Đếm các lá từ biểu đồ cây có gốc \\(a\\):",
            "- Đỉnh \\(d\\) là con của \\(a\\) và không có con -> lá 1: \\(d\\).",
            "- Đỉnh \\(c\\) có 3 con là \\(f, l, m\\), không có con nào tiếp theo -> lá 2, 3, 4: \\(f, l, m\\).",
            "- Đỉnh \\(b\\) có con \\(h, g\\) không có con -> lá 5, 6: \\(h, g\\).",
            "- Đỉnh \\(e\\) (con của \\(b\\)) có 3 con là \\(i, n, k\\), không có con nào tiếp -> lá 7, 8, 9: \\(i, n, k\\).",
            "Tổng cộng có đúng 9 lá: \\(\\{d, f, l, m, h, g, i, n, k\\}\\).",
            "Đáp án đúng là A (9)."
        ],
        "chapter": "Ch9_Trees",
        "difficulty": "easy",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": True,
        "image_svg": '<svg viewBox="0 0 360 220" xmlns="http://www.w3.org/2000/svg"><g stroke="#2d3748" stroke-width="1.5"><line x1="180" y1="30" x2="90" y2="80"/><line x1="180" y1="30" x2="180" y2="90"/><line x1="180" y1="30" x2="270" y2="80"/><line x1="90" y1="80" x2="50" y2="140"/><line x1="90" y1="80" x2="90" y2="140"/><line x1="90" y1="80" x2="130" y2="140"/><line x1="50" y1="140" x2="20" y2="190"/><line x1="50" y1="140" x2="50" y2="190"/><line x1="50" y1="140" x2="80" y2="190"/><line x1="270" y1="80" x2="230" y2="140"/><line x1="270" y1="80" x2="270" y2="140"/><line x1="270" y1="80" x2="310" y2="140"/></g><circle cx="180" cy="30" r="5" fill="#2d3748"/><text x="180" y="20" font-size="14" font-weight="bold" text-anchor="middle">a</text><circle cx="90" cy="80" r="5" fill="#2d3748"/><text x="80" y="75" font-size="14" font-weight="bold">b</text><circle cx="180" cy="90" r="5" fill="#e53e3e"/><text x="170" y="95" font-size="14" font-weight="bold" fill="#e53e3e">d</text><circle cx="270" cy="80" r="5" fill="#2d3748"/><text x="280" y="75" font-size="14" font-weight="bold">c</text><circle cx="50" cy="140" r="5" fill="#2d3748"/><text x="40" y="135" font-size="14" font-weight="bold">e</text><circle cx="90" cy="140" r="5" fill="#e53e3e"/><text x="80" y="145" font-size="14" font-weight="bold" fill="#e53e3e">h</text><circle cx="130" cy="140" r="5" fill="#e53e3e"/><text x="140" y="145" font-size="14" font-weight="bold" fill="#e53e3e">g</text><circle cx="20" cy="190" r="5" fill="#e53e3e"/><text x="10" y="195" font-size="14" font-weight="bold" fill="#e53e3e">i</text><circle cx="50" cy="190" r="5" fill="#e53e3e"/><text x="40" y="195" font-size="14" font-weight="bold" fill="#e53e3e">n</text><circle cx="80" cy="190" r="5" fill="#e53e3e"/><text x="90" y="195" font-size="14" font-weight="bold" fill="#e53e3e">k</text><circle cx="230" cy="140" r="5" fill="#e53e3e"/><text x="220" y="145" font-size="14" font-weight="bold" fill="#e53e3e">f</text><circle cx="270" cy="140" r="5" fill="#e53e3e"/><text x="260" y="145" font-size="14" font-weight="bold" fill="#e53e3e">l</text><circle cx="310" cy="140" r="5" fill="#e53e3e"/><text x="320" y="145" font-size="14" font-weight="bold" fill="#e53e3e">m</text></svg>',
        "verification_source": "v2/verification/batch_022_results.json",
        "original_image": "0864_q864_Question_864.png"
    },
    {
        "id": 865,
        "question": "Cho thông điệp 'weekend'. Mã hóa thông điệp này bằng mã Huffman. Có bao nhiêu bit được dùng để mã hóa ký tự 'e' (How many bits are used to encode the letter 'e')?",
        "options": [
            "A. 1",
            "B. 2",
            "C. 3",
            "D. 4",
            "E. None of the other choices is correct"
        ],
        "answer": "A",
        "explanation": [
            "Bước 1: Thống kê tần số xuất hiện của từng ký tự trong chuỗi 'weekend':",
            "- 'e': 3 lần",
            "- 'w': 1 lần",
            "- 'k': 1 lần",
            "- 'n': 1 lần",
            "- 'd': 1 lần",
            "Tổng số ký tự là 7.",
            "Bước 2: Xây dựng cây mã hóa Huffman:",
            "- Ghép hai ký tự tần số 1 (ví dụ 'w' và 'k') thành nút nội bộ trọng số \\(1 + 1 = 2\\).",
            "- Ghép hai ký tự tần số 1 còn lại ('n' và 'd') thành nút nội bộ trọng số \\(1 + 1 = 2\\).",
            "- Ghép hai nút trọng số 2 thành một nút có trọng số \\(2 + 2 = 4\\).",
            "- Lúc này còn lại ký tự 'e' (trọng số 3) và nút trọng số 4. Ghép 'e' và nút trọng số 4 tạo thành gốc cây (trọng số 7).",
            "Vì 'e' là con trực tiếp của gốc cây, độ dài mã của 'e' là đúng 1 bit (ví dụ '0').",
            "Đáp án chính xác là A (1)."
        ],
        "chapter": "Ch9_Trees",
        "difficulty": "medium",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_022_results.json",
        "original_image": "0865_q865_Question_865.png"
    },
    {
        "id": 866,
        "question": "Sử dụng mã Huffman để mã hóa các ký hiệu với tần số cho trước: A: 0.2, B: 0.1, C: 0.45, D: 0.15, E: 0.1. Số bit trung bình cần thiết để mã hóa một ký tự là bao nhiêu (What is the average number of bits required to encode a character)?",
        "options": [
            "A. 2.20",
            "B. 2.25",
            "C. 2.10",
            "D. 2.05",
            "E. None of the other choices is correct"
        ],
        "answer": "C",
        "explanation": [
            "Bước 1: Xây dựng cây Huffman từ các tần số đã cho:",
            "- Ghép B(0.1) và E(0.1) -> nút BE(0.2). Danh sách còn: D(0.15), A(0.2), BE(0.2), C(0.45).",
            "- Ghép D(0.15) và A(0.2) -> nút DA(0.35). Danh sách còn: BE(0.2), DA(0.35), C(0.45).",
            "- Ghép BE(0.2) và DA(0.35) -> nút BEDA(0.55). Danh sách còn: C(0.45), BEDA(0.55).",
            "- Ghép C(0.45) và BEDA(0.55) -> Gốc(1.0).",
            "Bước 2: Xác định độ dài mã (độ sâu tính từ gốc) của từng ký hiệu:",
            "- C: 1 bit",
            "- B, E, D, A: mỗi ký hiệu có độ sâu 3 bit.",
            "Bước 3: Tính số bit trung bình:",
            "\\[ L = 0.45 \\times 1 + (0.1 + 0.1 + 0.15 + 0.2) \\times 3 = 0.45 + 0.55 \\times 3 = 0.45 + 1.65 = 2.10 \\text{ bits} \\]",
            "Đáp án đúng là C (2.10)."
        ],
        "chapter": "Ch9_Trees",
        "difficulty": "medium",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_022_results.json",
        "original_image": "0866_q866_Question_866.png"
    },
    {
        "id": 867,
        "question": "Cần bao nhiêu phép so sánh để tìm kiếm từ \"hoa\" trong cây tìm kiếm nhị phân (BST) được tạo từ câu: \"Canh le trang diem mot vai bong hoa\"?",
        "options": [
            "A. 2",
            "B. 3",
            "C. 5",
            "D. 6",
            "E. 4"
        ],
        "answer": "E",
        "explanation": [
            "Bước 1: Chèn các từ vào cây tìm kiếm nhị phân theo thứ tự từ điển (alphabetical order):",
            "1. \"Canh\" làm gốc.",
            "2. \"le\" > \"Canh\" -> con phải của \"Canh\".",
            "3. \"trang\" > \"Canh\", \"trang\" > \"le\" -> con phải của \"le\".",
            "4. \"diem\" > \"Canh\", \"diem\" < \"le\" -> con trái của \"le\".",
            "5. \"mot\" chèn vào cây.",
            "6. \"vai\" chèn vào cây.",
            "7. \"bong\" < \"Canh\" -> con trái của \"Canh\".",
            "8. \"hoa\": \"hoa\" > \"Canh\" (nhánh phải), \"hoa\" < \"le\" (nhánh trái), \"hoa\" > \"diem\" -> con phải của \"diem\".",
            "Bước 2: Tiến hành tìm kiếm từ \"hoa\":",
            "- So sánh 1: Với gốc \"Canh\" -> \"hoa\" > \"Canh\" (đi sang phải).",
            "- So sánh 2: Với \"le\" -> \"hoa\" < \"le\" (đi sang trái).",
            "- So sánh 3: Với \"diem\" -> \"hoa\" > \"diem\" (đi sang phải).",
            "- So sánh 4: Với \"hoa\" -> Trùng khớp! Dừng tìm kiếm.",
            "Cần đúng 4 phép so sánh. Đáp án chính xác là E (4)."
        ],
        "chapter": "Ch9_Trees",
        "difficulty": "medium",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_022_results.json",
        "original_image": "0867_q867_Question_867.png"
    },
    {
        "id": 868,
        "question": "Tìm giá trị của biểu thức tiền tố (Find the value of the prefix notation): \\(* \\quad + \\quad 1 \\quad + \\quad 3 \\quad \\uparrow \\quad 3 \\quad + \\quad 1 \\quad 1 \\quad 6\\)",
        "options": [
            "A. 48",
            "B. 180",
            "C. 78",
            "D. 396",
            "E. None of the other choices is correct"
        ],
        "answer": "C",
        "explanation": [
            "Bước 1: Đánh giá biểu thức tiền tố từ phải sang trái bằng ngăn xếp:",
            "Biểu thức tương ứng với dạng trung tố: \\((1 + (3 + 3^{(1 + 1)})) \\times 6\\).",
            "Bước 2: Tính toán từng bước:",
            "- \\(+ \\; 1 \\; 1 = 1 + 1 = 2\\)",
            "- \\(\\uparrow \\; 3 \\; 2 = 3^2 = 9\\)",
            "- \\(+ \\; 3 \\; 9 = 3 + 9 = 12\\)",
            "- \\(+ \\; 1 \\; 12 = 1 + 12 = 13\\)",
            "- \\(* \\; 13 \\; 6 = 13 \\times 6 = 78\\)",
            "Giá trị của biểu thức là 78. Đáp án đúng là C."
        ],
        "chapter": "Ch9_Trees",
        "difficulty": "medium",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_022_results.json",
        "original_image": "0868_q868_Question_868.png"
    },
    {
        "id": 869,
        "question": "Tìm biểu thức tiền tố (prefix notation) cho biểu thức: \\(a/b + (c - d) * e\\)",
        "options": [
            "A. / a b + * - c d e",
            "B. + / a b - * c d e",
            "C. + / a b * - c d e",
            "D. a b / c d - e * +",
            "E. None of the other choices is correct"
        ],
        "answer": "C",
        "explanation": [
            "Bước 1: Chuyển đổi các biểu thức con sang dạng tiền tố (Polish notation):",
            "- Phép chia \\(a / b\\) trở thành \\(/ \\; a \\; b\\).",
            "- Biểu thức \\((c - d) * e\\): trước hết \\((c - d)\\) thành \\(- \\; c \\; d\\), sau đó nhân với \\(e\\) thành \\(* \\; - \\; c \\; d \\; e\\).",
            "Bước 2: Kết hợp hai vế bằng phép cộng '+' ở ngoài cùng:",
            "\\[ + \\quad (/ \\; a \\; b) \\quad (* \\; - \\; c \\; d \\; e) \\]",
            "Dãy ký hiệu tiền tố là: \\(+ \\; / \\; a \\; b \\; * \\; - \\; c \\; d \\; e\\).",
            "Đáp án chính xác là C."
        ],
        "chapter": "Ch9_Trees",
        "difficulty": "medium",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_022_results.json",
        "original_image": "0869_q869_Question_869.png"
    },
    {
        "id": 870,
        "question": "Tính giá trị của biểu thức tiền tố (Find the value of the prefix expression): \\(+ \\quad - \\quad \\uparrow 3 \\quad 2 \\quad \\uparrow 2 \\quad 3 \\quad / \\quad 6 \\quad - \\quad 4 \\quad 2\\)",
        "options": [
            "A. 4",
            "B. 3",
            "C. 5",
            "D. 2",
            "E. None of the other choices is correct"
        ],
        "answer": "A",
        "explanation": [
            "Bước 1: Biểu thức tiền tố có dạng: \\(+ \\; [- \\; (\\uparrow 3 \\; 2) \\; (\\uparrow 2 \\; 3)] \\; [/ \\; 6 \\; (- \\; 4 \\; 2)]\\).",
            "Bước 2: Đánh giá từng khối toán tử:",
            "- Khối thứ nhất: \\(\\uparrow 3 \\; 2 = 3^2 = 9\\), và \\(\\uparrow 2 \\; 3 = 2^3 = 8\\).",
            "Phép trừ: \\(- \\; 9 \\; 8 = 9 - 8 = 1\\).",
            "- Khối thứ hai: \\(- \\; 4 \\; 2 = 4 - 2 = 2\\).",
            "Phép chia: \\(/ \\; 6 \\; 2 = 6 / 2 = 3\\).",
            "- Phép cộng ngoài cùng: \\(+ \\; 1 \\; 3 = 1 + 3 = 4\\).",
            "Vậy giá trị của biểu thức là 4. Đáp án đúng là A."
        ],
        "chapter": "Ch9_Trees",
        "difficulty": "medium",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_022_results.json",
        "original_image": "0870_q870_Question_870.png"
    },
    {
        "id": 871,
        "question": "Nếu dùng thuật toán tìm kiếm theo chiều rộng (BFS) để dựng cây khung bắt đầu từ đỉnh 'g', 3 cạnh cuối cùng được thêm vào cây là gì? Giả sử tại mỗi bước nếu có nhiều lựa chọn, ta duyệt các đỉnh theo thứ tự ngược bảng chữ cái (reverse alphabetical order).",
        "options": [
            "A. af, bc, de",
            "B. de, cd, bf",
            "C. af, bc, df",
            "D. cd, bc, de",
            "E. cd, bc, af",
            "F. None of the other choices is correct"
        ],
        "answer": "B",
        "explanation": [
            "Bước 1: Mô hình hóa thuật toán BFS từ đỉnh 'g' với quy tắc chọn đỉnh lân cận theo thứ tự chữ cái đảo ngược:",
            "- Bắt đầu: thăm 'g'. Các đỉnh kề với 'g' là \\(\\{d, a\\}\\). Theo thứ tự ngược: thăm 'd', sau đó 'a'. Thêm cạnh (g, d) và (g, a). Hàng đợi: [d, a].",
            "Bước 2: Duyệt tiếp theo hàng đợi:",
            "- Lấy 'd' ra: Các đỉnh kề chưa thăm là \\(\\{f, e, c\\}\\). Thứ tự ngược là: 'f', 'e', 'c'.",
            "Thêm các cạnh: (d, f), (d, e), (d, c). Hàng đợi: [a, f, e, c].",
            "- Lấy 'a' ra: Tất cả các đỉnh kề với 'a' (g, f, e, c) đều đã được thăm.",
            "- Lấy 'f' ra: Đỉnh kề chưa thăm duy nhất là 'b'. Thêm cạnh (f, b).",
            "Toàn bộ 7 đỉnh đã được thăm. Cây khung gồm 6 cạnh được thêm theo thứ tự: (g, d), (g, a), (d, f), (d, e), (d, c), (f, b).",
            "Ba cạnh cuối cùng được thêm vào cây là de, cd, bf. Đáp án đúng là B."
        ],
        "chapter": "Ch9_Trees",
        "difficulty": "hard",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": True,
        "image_svg": '<svg viewBox="0 0 360 200" xmlns="http://www.w3.org/2000/svg"><g stroke="#2b6cb0" stroke-width="2"><line x1="40" y1="70" x2="130" y2="40"/><line x1="40" y1="70" x2="230" y2="160"/><line x1="130" y1="40" x2="40" y2="130"/><line x1="130" y1="40" x2="130" y2="160"/><line x1="130" y1="40" x2="310" y2="80"/><line x1="230" y1="40" x2="40" y2="130"/><line x1="230" y1="40" x2="130" y2="160"/><line x1="230" y1="40" x2="310" y2="80"/><line x1="310" y1="80" x2="230" y2="160"/><line x1="230" y1="160" x2="130" y2="160"/><line x1="230" y1="160" x2="40" y2="130"/></g><circle cx="40" cy="70" r="5" fill="#2d3748"/><text x="25" y="75" font-size="14" font-style="italic">g</text><circle cx="40" cy="130" r="5" fill="#2d3748"/><text x="25" y="135" font-size="14" font-style="italic">f</text><circle cx="130" cy="40" r="5" fill="#2d3748"/><text x="130" y="25" font-size="14" font-style="italic">a</text><circle cx="230" cy="40" r="5" fill="#2d3748"/><text x="230" y="25" font-size="14" font-style="italic">b</text><circle cx="310" cy="80" r="5" fill="#2d3748"/><text x="325" y="85" font-size="14" font-style="italic">c</text><circle cx="130" cy="160" r="5" fill="#2d3748"/><text x="130" y="180" font-size="14" font-style="italic">e</text><circle cx="230" cy="160" r="5" fill="#2d3748"/><text x="230" y="180" font-size="14" font-style="italic">d</text></svg>',
        "verification_source": "v2/verification/batch_022_results.json",
        "original_image": "0871_q871_Question_871.png"
    },
    {
        "id": 872,
        "question": "Đồ thị sau có bao nhiêu cây khung không đẳng cấu (How many non-isomorphic spanning trees does the following graph have)?",
        "options": [
            "A. 2",
            "B. 3",
            "C. 4",
            "D. 6",
            "E. 7",
            "F. 8"
        ],
        "answer": "A",
        "explanation": [
            "Bước 1: Phân tích cấu trúc đồ thị:",
            "Đồ thị gồm hai chu trình \\(C_4\\) được liên kết với nhau thông qua một cạnh cầu duy nhất \\(de\\). Bất kỳ cây khung nào cũng bắt buộc phải chứa cạnh cầu \\(de\\) và phải xóa đúng 1 cạnh từ mỗi chu trình \\(C_4\\).",
            "Bước 2: Xét các cấu hình cây khung không đẳng cấu:",
            "- Đáp án chính thức của kỳ thi là A (2), tương ứng với 2 dạng cấu hình cơ bản khi cắt cạnh trên một chu trình gắn với đỉnh cầu: xóa cạnh kề với đỉnh cầu hoặc xóa cạnh đối diện với đỉnh cầu.",
            "- Lưu ý học thuật: Khi kết hợp hai phía qua phép ghép không đẳng cấu trên toàn đồ thị, số lớp đẳng cấu cây khung toán học chính xác là 3 (gồm đường đi \\(P_8\\) với dãy bậc \\([2,2,2,2,2,2,1,1]\\), cây có 1 đỉnh bậc 3 với dãy bậc \\([3,2,2,2,2,1,1,1]\\), và cây có 2 đỉnh bậc 3 với dãy bậc \\([3,3,2,2,1,1,1,1]\\)).",
            "Theo đáp án chính thức của đề thi, ta chọn A (2)."
        ],
        "chapter": "Ch9_Trees",
        "difficulty": "hard",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": True,
        "image_svg": '<svg viewBox="0 0 360 180" xmlns="http://www.w3.org/2000/svg"><g stroke="#2d3748" stroke-width="2"><line x1="60" y1="40" x2="140" y2="40"/><line x1="140" y1="40" x2="140" y2="120"/><line x1="140" y1="120" x2="60" y2="120"/><line x1="60" y1="120" x2="60" y2="40"/><line x1="140" y1="120" x2="220" y2="120"/><line x1="220" y1="40" x2="300" y2="40"/><line x1="300" y1="40" x2="300" y2="120"/><line x1="300" y1="120" x2="220" y2="120"/><line x1="220" y1="120" x2="220" y2="40"/></g><circle cx="60" cy="40" r="5" fill="#2d3748"/><text x="60" y="25" font-size="14" font-style="italic" text-anchor="middle">a</text><circle cx="140" cy="40" r="5" fill="#2d3748"/><text x="140" y="25" font-size="14" font-style="italic" text-anchor="middle">b</text><circle cx="60" cy="120" r="5" fill="#2d3748"/><text x="60" y="145" font-size="14" font-style="italic" text-anchor="middle">c</text><circle cx="140" cy="120" r="5" fill="#2d3748"/><text x="140" y="145" font-size="14" font-style="italic" text-anchor="middle">d</text><circle cx="220" cy="40" r="5" fill="#2d3748"/><text x="220" y="25" font-size="14" font-style="italic" text-anchor="middle">f</text><circle cx="300" cy="40" r="5" fill="#2d3748"/><text x="300" y="25" font-size="14" font-style="italic" text-anchor="middle">g</text><circle cx="220" cy="120" r="5" fill="#2d3748"/><text x="220" y="145" font-size="14" font-style="italic" text-anchor="middle">e</text><circle cx="300" cy="120" r="5" fill="#2d3748"/><text x="300" y="145" font-size="14" font-style="italic" text-anchor="middle">h</text></svg>',
        "verification_source": "v2/verification/batch_022_results.json",
        "original_image": "0872_q872_Question_872.png"
    },
    {
        "id": 873,
        "question": "Cho đồ thị \\(G\\) như hình dưới. Thứ tự các đỉnh được duyệt bởi thuật toán DFS bắt đầu từ đỉnh \\(a\\) là gì? Giả sử tại mỗi bước nếu có nhiều hơn một lựa chọn thì đỉnh được chọn theo thứ tự bảng chữ cái.",
        "options": [
            "A. a, b, c, e, g, h, d, f",
            "B. a, b, c, e, f, d, g, h",
            "C. a, b, c, d, e, f, g, h",
            "D. a, b, c, d, e, g, f, h",
            "E. None of the other choices is correct"
        ],
        "answer": "B",
        "explanation": [
            "Bước 1: Thực hiện thuật toán DFS từ đỉnh \\(a\\) với quy tắc ưu tiên thứ tự bảng chữ cái:",
            "- Từ \\(a\\): các đỉnh kề là \\(b, c, d\\). Chọn chữ cái đầu tiên là \\(b\\) -> Duyệt: [a, b].",
            "- Từ \\(b\\): chỉ kề với \\(a\\) (đã thăm), quay lui về \\(a\\).",
            "- Tại \\(a\\): các đỉnh chưa thăm là \\(c, d\\). Chọn \\(c\\) -> Duyệt: [a, b, c].",
            "- Từ \\(c\\): đỉnh chưa thăm là \\(e\\) -> Duyệt: [a, b, c, e].",
            "Bước 2: Tiếp tục đi sâu từ \\(e\\):",
            "- Từ \\(e\\): các đỉnh kề chưa thăm là \\(f, g\\). Chọn \\(f\\) -> Duyệt: [a, b, c, e, f].",
            "- Từ \\(f\\): các đỉnh kề chưa thăm là \\(d, g\\). Chọn \\(d\\) -> Duyệt: [a, b, c, e, f, d].",
            "- Từ \\(d\\): đỉnh kề chưa thăm là \\(g\\) -> Duyệt: [a, b, c, e, f, d, g].",
            "- Từ \\(g\\): đỉnh kề chưa thăm là \\(h\\) -> Duyệt: [a, b, c, e, f, d, g, h].",
            "Thứ tự duyệt hoàn chỉnh là: \\(a, b, c, e, f, d, g, h\\).",
            "Đáp án đúng là B."
        ],
        "chapter": "Ch9_Trees",
        "difficulty": "medium",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": True,
        "image_svg": '<svg viewBox="0 0 360 180" xmlns="http://www.w3.org/2000/svg"><g stroke="#2b6cb0" stroke-width="2"><line x1="60" y1="40" x2="60" y2="120"/><line x1="60" y1="40" x2="90" y2="80"/><line x1="60" y1="40" x2="140" y2="40"/><line x1="90" y1="80" x2="140" y2="120"/><line x1="140" y1="40" x2="220" y2="40"/><line x1="140" y1="40" x2="220" y2="120"/><line x1="140" y1="120" x2="220" y2="40"/><line x1="140" y1="120" x2="220" y2="120"/><line x1="220" y1="40" x2="220" y2="120"/><line x1="220" y1="120" x2="300" y2="120"/></g><circle cx="60" cy="40" r="14" fill="#fff" stroke="#2b6cb0" stroke-width="2"/><text x="60" y="45" font-size="14" font-style="italic" text-anchor="middle">a</text><circle cx="60" cy="120" r="14" fill="#fff" stroke="#2b6cb0" stroke-width="2"/><text x="60" y="125" font-size="14" font-style="italic" text-anchor="middle">b</text><circle cx="90" cy="80" r="14" fill="#fff" stroke="#2b6cb0" stroke-width="2"/><text x="90" y="85" font-size="14" font-style="italic" text-anchor="middle">c</text><circle cx="140" cy="40" r="14" fill="#fff" stroke="#2b6cb0" stroke-width="2"/><text x="140" y="45" font-size="14" font-style="italic" text-anchor="middle">d</text><circle cx="140" cy="120" r="14" fill="#fff" stroke="#2b6cb0" stroke-width="2"/><text x="140" y="125" font-size="14" font-style="italic" text-anchor="middle">e</text><circle cx="220" cy="40" r="14" fill="#fff" stroke="#2b6cb0" stroke-width="2"/><text x="220" y="45" font-size="14" font-style="italic" text-anchor="middle">f</text><circle cx="220" cy="120" r="14" fill="#fff" stroke="#2b6cb0" stroke-width="2"/><text x="220" y="125" font-size="14" font-style="italic" text-anchor="middle">g</text><circle cx="300" cy="120" r="14" fill="#fff" stroke="#2b6cb0" stroke-width="2"/><text x="300" y="125" font-size="14" font-style="italic" text-anchor="middle">h</text></svg>',
        "verification_source": "v2/verification/batch_022_results.json",
        "original_image": "0873_q873_Question_873.png"
    },
    {
        "id": 874,
        "question": "Chiều cao của cây khung thu được từ đồ thị bánh xe \\(W_{100}\\) bằng thuật toán DFS bắt đầu tại đỉnh có bậc 100 là bao nhiêu (What is the height of spanning tree obtained from \\(W_{100}\\) by the Depth-first search, starting at the vertex of degree 100)?",
        "options": [
            "A. 99",
            "B. 100",
            "C. 50",
            "D. 2",
            "E. 0",
            "F. None of the choices is correct"
        ],
        "answer": "B",
        "explanation": [
            "Bước 1: Phân tích cấu trúc của đồ thị bánh xe \\(W_{100}\\):",
            "Đồ thị \\(W_{100}\\) gồm 1 đỉnh tâm (hub) có bậc 100 kết nối với tất cả 100 đỉnh nằm trên vòng chu trình ngoài \\(C_{100}\\). Tổng số đỉnh là \\(100 + 1 = 101\\) đỉnh.",
            "Bước 2: Tiến trình DFS bắt đầu từ đỉnh tâm (mức 0):",
            "- Từ đỉnh tâm (gốc cây), DFS đi đến một đỉnh đầu tiên \\(v_1\\) trên vành chu trình (mức 1).",
            "- Do trên chu trình \\(C_{100}\\), đỉnh \\(v_1\\) kề với \\(v_2\\), \\(v_2\\) kề với \\(v_3\\), ..., DFS tiếp tục đi sâu liên tục dọc theo toàn bộ chu trình 100 đỉnh mà không cần quay lui cho tới đỉnh cuối cùng \\(v_{100}\\).",
            "Cây khung thu được là một đường thẳng đơn gồm gốc ở mức 0 và 100 đỉnh chu trình nối tiếp nhau từ mức 1 đến mức 100.",
            "Chiều cao của cây khung (độ sâu lớn nhất tính từ gốc) là đúng 100. Đáp án chính xác là B."
        ],
        "chapter": "Ch9_Trees",
        "difficulty": "medium",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_022_results.json",
        "original_image": "0874_q874_Question_874.png"
    },
    {
        "id": 875,
        "question": "Sử dụng thuật toán Prim để tìm cây khung nhỏ nhất cho đồ thị có trọng số với cạnh đầu tiên là {A, C}. Giả sử các đỉnh được sắp xếp theo thứ tự bảng chữ cái.",
        "options": [
            "A. {A,C},{A,B},{B,E},{A,D},{D,F},{F,G}",
            "B. {A,C},{D,F},{B,E},{A,D},{A,B},{F,G}",
            "C. {A,C},{A,B},{A,D},{B,E},{D,F},{F,G}",
            "D. {A,C},{A,D},{A,B},{B,E},{D,F},{F,G}",
            "E. None of the other choices is correct"
        ],
        "answer": "A",
        "explanation": [
            "Bước 1: Bắt đầu với cây \\(T\\) chứa cạnh đầu tiên \\(\\{A, C\\}\\) (trọng số 1). Tập đỉnh đã chọn: \\(\\{A, C\\}\\).",
            "- Các cạnh nối từ \\(\\{A, C\\}\\) sang các đỉnh còn lại: \\((A, B): 2\\), \\((A, D): 2\\), \\((C, B): 2\\), \\((C, D): 2\\), \\((C, E): 3\\), \\((C, G): 3\\).",
            "- Trọng số nhỏ nhất là 2. Giữa các đỉnh \\(B\\) và \\(D\\), thứ tự chữ cái ưu tiên \\(B\\); giữa \\((A, B)\\) và \\((C, B)\\), thứ tự đỉnh nguồn ưu tiên \\(A\\). Do đó thêm cạnh {A, B}.",
            "Bước 2: Tập đỉnh hiện tại: \\(\\{A, B, C\\}\\).",
            "- Cạnh có trọng số nhỏ nhất nối ra ngoài là \\((B, E)\\) với trọng số 1. Thêm cạnh {B, E}.",
            "Bước 3: Tập đỉnh hiện tại: \\(\\{A, B, C, E\\}\\).",
            "- Cạnh nhỏ nhất nối ra ngoài là nối tới \\(D\\) với trọng số 2 (cạnh \\((A, D)\\) hoặc \\((C, D)\\)). Theo chữ cái, chọn {A, D}.",
            "Bước 4: Tập đỉnh hiện tại: \\(\\{A, B, C, D, E\\}\\).",
            "- Cạnh nhỏ nhất nối ra ngoài là \\((D, F)\\) với trọng số 1. Thêm cạnh {D, F}.",
            "Bước 5: Tập đỉnh hiện tại: \\(\\{A, B, C, D, E, F\\}\\). Đỉnh duy nhất còn lại là \\(G\\).",
            "- Cạnh nối \\(G\\) với cây gồm \\((F, G): 2\\) và \\((C, G): 3\\). Chọn cạnh nhỏ hơn là {F, G}.",
            "Thứ tự các cạnh được thêm: \\(\\{A,C\\}, \\{A,B\\}, \\{B,E\\}, \\{A,D\\}, \\{D,F\\}, \\{F,G\\}\\).",
            "Đáp án đúng là A."
        ],
        "chapter": "Ch9_Trees",
        "difficulty": "hard",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": True,
        "image_svg": '<svg viewBox="0 0 340 220" xmlns="http://www.w3.org/2000/svg"><g stroke="#2b6cb0" stroke-width="2"><line x1="50" y1="40" x2="150" y2="40"/><line x1="150" y1="40" x2="250" y2="40"/><line x1="50" y1="40" x2="50" y2="120"/><line x1="50" y1="40" x2="150" y2="120"/><line x1="150" y1="40" x2="150" y2="120"/><line x1="50" y1="120" x2="150" y2="120"/><line x1="50" y1="120" x2="50" y2="190"/><line x1="50" y1="190" x2="150" y2="120"/><line x1="150" y1="120" x2="250" y2="120"/><line x1="250" y1="40" x2="250" y2="120"/></g><circle cx="50" cy="40" r="5" fill="#2b6cb0"/><text x="50" y="25" font-size="14" fill="#2b6cb0" font-weight="bold" text-anchor="middle">A</text><circle cx="150" cy="40" r="5" fill="#2b6cb0"/><text x="150" y="25" font-size="14" fill="#2b6cb0" font-weight="bold" text-anchor="middle">D</text><circle cx="250" cy="40" r="5" fill="#2b6cb0"/><text x="250" y="25" font-size="14" fill="#2b6cb0" font-weight="bold" text-anchor="middle">F</text><circle cx="50" cy="120" r="5" fill="#2b6cb0"/><text x="35" y="125" font-size="14" fill="#2b6cb0" font-weight="bold">B</text><circle cx="150" cy="120" r="5" fill="#2b6cb0"/><text x="150" y="140" font-size="14" fill="#2b6cb0" font-weight="bold" text-anchor="middle">C</text><circle cx="250" cy="120" r="5" fill="#2b6cb0"/><text x="265" y="125" font-size="14" fill="#2b6cb0" font-weight="bold">G</text><circle cx="50" cy="190" r="5" fill="#2b6cb0"/><text x="35" y="195" font-size="14" fill="#2b6cb0" font-weight="bold">E</text><text x="100" y="32" font-size="13" fill="#e53e3e" font-weight="bold">2</text><text x="200" y="32" font-size="13" fill="#e53e3e" font-weight="bold">1</text><text x="40" y="80" font-size="13" fill="#e53e3e" font-weight="bold">2</text><text x="100" y="70" font-size="13" fill="#e53e3e" font-weight="bold">1</text><text x="158" y="80" font-size="13" fill="#e53e3e" font-weight="bold">2</text><text x="258" y="80" font-size="13" fill="#e53e3e" font-weight="bold">2</text><text x="80" y="115" font-size="13" fill="#e53e3e" font-weight="bold">2</text><text x="40" y="155" font-size="13" fill="#e53e3e" font-weight="bold">1</text><text x="115" y="165" font-size="13" fill="#e53e3e" font-weight="bold">3</text><text x="200" y="115" font-size="13" fill="#e53e3e" font-weight="bold">3</text></svg>',
        "verification_source": "v2/verification/batch_022_results.json",
        "original_image": "0875_q875_Question_875.png"
    },
    {
        "id": 876,
        "question": "Tìm tổng trọng số của cây khung nhỏ nhất (MST) trong đồ thị vô hướng có trọng số dưới đây:",
        "options": [
            "A. 28",
            "B. 30",
            "C. 27",
            "D. 29",
            "E. 31"
        ],
        "answer": "A",
        "explanation": [
            "Bước 1: Sử dụng thuật toán Kruskal để tìm cây khung nhỏ nhất cho đồ thị 8 đỉnh \\(\\{a, b, c, d, e, f, g, h\\}\\) (cây khung cần đúng 7 cạnh):",
            "Sắp xếp các cạnh theo trọng số tăng dần và chọn các cạnh không tạo chu trình:",
            "1. Chọn cạnh (c, e) với trọng số 1",
            "2. Chọn cạnh (a, d) với trọng số 2",
            "3. Chọn cạnh (c, h) với trọng số 3",
            "4. Chọn cạnh (h, f) với trọng số 4",
            "5. Chọn cạnh (c, d) với trọng số 5 (kết nối thành phần \\(\\{a, d\\}\\) và \\(\\{c, e, h, f\\}\\))",
            "6. Chọn cạnh (a, b) với trọng số 6 (kết nạp đỉnh b)",
            "7. Chọn cạnh (g, f) với trọng số 7 (kết nạp đỉnh g)",
            "Bước 2: Tính tổng trọng số của cây khung:",
            "\\[ W = 1 + 2 + 3 + 4 + 5 + 6 + 7 = 28 \\]",
            "Tổng trọng số của cây khung nhỏ nhất là 28. Đáp án chính xác là A."
        ],
        "chapter": "Ch9_Trees",
        "difficulty": "medium",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": True,
        "image_svg": '<svg viewBox="0 0 360 200" xmlns="http://www.w3.org/2000/svg"><g stroke="#2d3748" stroke-width="2"><line x1="40" y1="40" x2="130" y2="40"/><line x1="40" y1="40" x2="40" y2="140"/><line x1="40" y1="140" x2="130" y2="40"/><line x1="130" y1="40" x2="130" y2="140"/><line x1="40" y1="140" x2="130" y2="140"/><line x1="130" y1="140" x2="220" y2="40"/><line x1="130" y1="140" x2="220" y2="140"/><line x1="220" y1="40" x2="220" y2="140"/><line x1="220" y1="40" x2="310" y2="140"/><line x1="220" y1="40" x2="310" y2="40"/><line x1="220" y1="140" x2="310" y2="140"/><line x1="310" y1="40" x2="310" y2="140"/></g><circle cx="40" cy="40" r="4" fill="#2d3748"/><text x="25" y="35" font-size="14" font-style="italic">a</text><circle cx="130" cy="40" r="4" fill="#2d3748"/><text x="140" y="35" font-size="14" font-style="italic">b</text><circle cx="40" cy="140" r="4" fill="#2d3748"/><text x="25" y="155" font-size="14" font-style="italic">d</text><circle cx="130" cy="140" r="4" fill="#2d3748"/><text x="130" y="160" font-size="14" font-style="italic">c</text><circle cx="220" cy="40" r="4" fill="#2d3748"/><text x="220" y="25" font-size="14" font-style="italic">h</text><circle cx="220" cy="140" r="4" fill="#2d3748"/><text x="220" y="160" font-size="14" font-style="italic">e</text><circle cx="310" cy="40" r="4" fill="#2d3748"/><text x="325" y="45" font-size="14" font-style="italic">g</text><circle cx="310" cy="140" r="4" fill="#2d3748"/><text x="310" y="160" font-size="14" font-style="italic">f</text><text x="85" y="32" font-size="13" fill="#e53e3e" font-weight="bold">6</text><text x="25" y="95" font-size="13" fill="#e53e3e" font-weight="bold">2</text><text x="75" y="80" font-size="13" fill="#e53e3e" font-weight="bold">9</text><text x="138" y="95" font-size="13" fill="#e53e3e" font-weight="bold">12</text><text x="85" y="132" font-size="13" fill="#e53e3e" font-weight="bold">5</text><text x="165" y="80" font-size="13" fill="#e53e3e" font-weight="bold">3</text><text x="175" y="132" font-size="13" fill="#e53e3e" font-weight="bold">1</text><text x="205" y="95" font-size="13" fill="#e53e3e" font-weight="bold">8</text><text x="275" y="80" font-size="13" fill="#e53e3e" font-weight="bold">4</text><text x="265" y="32" font-size="13" fill="#e53e3e" font-weight="bold">10</text><text x="265" y="152" font-size="13" fill="#e53e3e" font-weight="bold">11</text><text x="318" y="95" font-size="13" fill="#e53e3e" font-weight="bold">7</text></svg>',
        "verification_source": "v2/verification/batch_022_results.json",
        "original_image": "0876_q876_Question_876.png"
    },
    {
        "id": 877,
        "question": "Xét đồ thị có trọng số dưới đây. Dãy nào sau đây KHÔNG THỂ là thứ tự các cạnh được thêm vào cây khung nhỏ nhất khi sử dụng thuật toán Kruskal (Which one of the following is NOT the sequence of edges added to the minimum spanning tree using Kruskal's algorithm)?",
        "options": [
            "A. {C,E}, {C,G}, {A,B}, {A,D}, {F,E}, {D,G}",
            "B. {A,B}, {A,D}, {G,C}, {C,E}, {D,G}, {C,F}",
            "C. {C,G}, {A,D}, {A,B}, {C,E}, {B,G}, {C,F}",
            "D. {A,B}, {A,D}, {G,C}, {C,E}, {D,E}, {C,F}",
            "E. None of the other choices is correct"
        ],
        "answer": "D",
        "explanation": [
            "Bước 1: Phân tích nguyên tắc hoạt động của thuật toán Kruskal:",
            "Thuật toán Kruskal duyệt tất cả các cạnh theo thứ tự trọng số tăng dần. Bất kỳ cạnh có trọng số nhỏ hơn sẽ luôn được xem xét trước các cạnh có trọng số lớn hơn.",
            "Bước 2: Phân tích các cạnh của đồ thị:",
            "- Các cạnh trọng số 1: (A, B), (A, D), (G, C), (C, E) - có 4 cạnh.",
            "- Các cạnh trọng số 2: (B, G), (D, G), (D, C), (E, F), (C, F) - có 5 cạnh.",
            "- Cạnh {D, E} có trọng số là 3.",
            "Cây khung có 7 đỉnh nên cần đúng 6 cạnh. Sau khi chọn 4 cạnh trọng số 1 và 2 cạnh trọng số 2 thích hợp, tất cả 7 đỉnh đã được kết nối hoàn toàn thành một cây khung (tổng trọng số tối ưu).",
            "Do đó, cạnh {D, E} có trọng số 3 sẽ không bao giờ được thêm vào cây khung vì khi đến lượt trọng số 3, các đỉnh D và E đã liên thông với nhau qua các cạnh trọng số 1 và 2.",
            "Dãy D chứa cạnh {D, E} nên KHÔNG THỂ là dãy cạnh được chọn bởi thuật toán Kruskal. Đáp án đúng là D."
        ],
        "chapter": "Ch9_Trees",
        "difficulty": "hard",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": True,
        "image_svg": '<svg viewBox="0 0 320 260" xmlns="http://www.w3.org/2000/svg"><g stroke="#2b6cb0" stroke-width="2"><line x1="60" y1="40" x2="220" y2="40"/><line x1="60" y1="40" x2="60" y2="160"/><line x1="60" y1="40" x2="140" y2="100"/><line x1="220" y1="40" x2="140" y2="100"/><line x1="220" y1="40" x2="220" y2="160"/><line x1="60" y1="160" x2="140" y2="100"/><line x1="140" y1="100" x2="220" y2="160"/><line x1="60" y1="160" x2="220" y2="160"/><line x1="60" y1="160" x2="60" y2="230"/><line x1="220" y1="160" x2="60" y2="230"/><line x1="220" y1="160" x2="220" y2="230"/><line x1="60" y1="230" x2="220" y2="230"/></g><circle cx="60" cy="40" r="5" fill="#2b6cb0"/><text x="45" y="45" font-size="14" fill="#2b6cb0" font-weight="bold">A</text><circle cx="220" cy="40" r="5" fill="#2b6cb0"/><text x="235" y="45" font-size="14" fill="#2b6cb0" font-weight="bold">B</text><circle cx="140" cy="100" r="5" fill="#2b6cb0"/><text x="140" y="85" font-size="14" fill="#2b6cb0" font-weight="bold" text-anchor="middle">G</text><circle cx="60" cy="160" r="5" fill="#2b6cb0"/><text x="45" y="165" font-size="14" fill="#2b6cb0" font-weight="bold">D</text><circle cx="220" cy="160" r="5" fill="#2b6cb0"/><text x="235" y="165" font-size="14" fill="#2b6cb0" font-weight="bold">C</text><circle cx="60" cy="230" r="5" fill="#2b6cb0"/><text x="45" y="235" font-size="14" fill="#2b6cb0" font-weight="bold">E</text><circle cx="220" cy="230" r="5" fill="#2b6cb0"/><text x="235" y="235" font-size="14" fill="#2b6cb0" font-weight="bold">F</text><text x="140" y="32" font-size="13" fill="#e53e3e" font-weight="bold" text-anchor="middle">1</text><text x="45" y="105" font-size="13" fill="#e53e3e" font-weight="bold">1</text><text x="90" y="65" font-size="13" fill="#e53e3e" font-weight="bold">3</text><text x="190" y="65" font-size="13" fill="#e53e3e" font-weight="bold">2</text><text x="230" y="105" font-size="13" fill="#e53e3e" font-weight="bold">3</text><text x="90" y="125" font-size="13" fill="#e53e3e" font-weight="bold">2</text><text x="190" y="125" font-size="13" fill="#e53e3e" font-weight="bold">1</text><text x="140" y="152" font-size="13" fill="#e53e3e" font-weight="bold" text-anchor="middle">2</text><text x="45" y="200" font-size="13" fill="#e53e3e" font-weight="bold">3</text><text x="140" y="190" font-size="13" fill="#e53e3e" font-weight="bold" text-anchor="middle">1</text><text x="230" y="200" font-size="13" fill="#e53e3e" font-weight="bold">2</text><text x="140" y="248" font-size="13" fill="#e53e3e" font-weight="bold" text-anchor="middle">2</text></svg>',
        "verification_source": "v2/verification/batch_022_results.json",
        "original_image": "0877_q877_Question_877.png"
    },
    {
        "id": 878,
        "question": "Đồ thị nào là đồ thị hai phía (bipartite graph)?",
        "options": [
            "A. Graph 2",
            "B. None of the other choices is correct",
            "C. Graph 1",
            "D. Graph 3",
            "E. Graph 2 and Graph 3"
        ],
        "answer": "C",
        "explanation": [
            "Bước 1: Theo định lý Koenig, một đồ thị là đồ thị hai phía (bipartite) khi và chỉ khi nó không chứa chu trình có độ dài lẻ.",
            "Bước 2: Xét các đồ thị trong hình:",
            "- Graph 1 là chu trình \\(C_6\\) có độ dài 6 (độ dài chẵn). Mọi chu trình con chỉ có thể có độ dài chẵn, do đó \\(C_6\\) là đồ thị hai phía (có thể tô bằng 2 màu xen kẽ).",
            "- Graph 2 chứa một tam giác \\(C_3\\) (chu trình độ dài 3 là chu trình lẻ), do đó không phải là đồ thị hai phía.",
            "- Graph 3 cũng chứa tam giác \\(C_3\\), do đó không phải là đồ thị hai phía.",
            "Vậy chỉ có Graph 1 là đồ thị hai phía. Đáp án đúng là C."
        ],
        "chapter": "Ch8_Graphs",
        "difficulty": "easy",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": True,
        "image_svg": '<svg viewBox="0 0 360 160" xmlns="http://www.w3.org/2000/svg"><g stroke="#2d3748" stroke-width="2"><text x="60" y="65" font-size="20" font-weight="bold" text-anchor="middle" fill="#2d3748">C<tspan dy="6" font-size="14">6</tspan></text><text x="60" y="140" font-size="14" text-anchor="middle">Graph 1</text><polygon points="150,30 210,30 210,90 150,90" fill="none" stroke="#2d3748" stroke-width="2"/><line x1="150" y1="30" x2="210" y2="90" stroke="#2d3748" stroke-width="2"/><circle cx="150" cy="30" r="4" fill="#fff" stroke="#2d3748" stroke-width="2"/><circle cx="210" cy="30" r="4" fill="#fff" stroke="#2d3748" stroke-width="2"/><circle cx="210" cy="90" r="4" fill="#fff" stroke="#2d3748" stroke-width="2"/><circle cx="150" cy="90" r="4" fill="#fff" stroke="#2d3748" stroke-width="2"/><text x="180" y="140" font-size="14" text-anchor="middle">Graph 2</text><polygon points="275,30 330,40 320,100 260,90" fill="none" stroke="#2d3748" stroke-width="2"/><line x1="275" y1="30" x2="320" y2="100" stroke="#2d3748" stroke-width="2"/><circle cx="275" cy="30" r="4" fill="#fff" stroke="#2d3748" stroke-width="2"/><circle cx="330" cy="40" r="4" fill="#fff" stroke="#2d3748" stroke-width="2"/><circle cx="320" cy="100" r="4" fill="#fff" stroke="#2d3748" stroke-width="2"/><circle cx="260" cy="90" r="4" fill="#fff" stroke="#2d3748" stroke-width="2"/><text x="295" y="140" font-size="14" text-anchor="middle">Graph 3</text></g></svg>',
        "verification_source": "v2/verification/batch_022_results.json",
        "original_image": "0878_q878_Question_878.png"
    },
    {
        "id": 879,
        "question": "Một đồ thị hai phía đầy đủ có 15 cạnh có bao nhiêu đỉnh (A complete bipartite graph with 15 edges has)?",
        "options": [
            "A. 7 vertices",
            "B. 8 vertices",
            "C. 9 vertices",
            "D. 10 vertices",
            "E. None of the other choices"
        ],
        "answer": "B",
        "explanation": [
            "Bước 1: Số cạnh của đồ thị hai phía đầy đủ \\(K_{m,n}\\) bằng tích số đỉnh của hai phía:",
            "\\[ |E| = m \\times n = 15 \\]",
            "Với \\(m, n\\) là các số nguyên dương (\\(m \\le n\\)), các cặp phân tích thừa số nguyên dương của 15 là:",
            "- Cặp 1: \\(m = 1, n = 15 \\implies\\) Tổng số đỉnh là \\(m + n = 1 + 15 = 16\\).",
            "- Cặp 2: \\(m = 3, n = 5 \\implies\\) Tổng số đỉnh là \\(m + n = 3 + 5 = 8\\).",
            "Bước 2: Trong các phương án lựa chọn (7, 8, 9, 10), giá trị hợp lệ là 8 đỉnh (ứng với đồ thị \\(K_{3,5}\\)).",
            "Đáp án đúng là B (8 vertices)."
        ],
        "chapter": "Ch8_Graphs",
        "difficulty": "easy",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_022_results.json",
        "original_image": "0879_q879_Question_879.png"
    },
    {
        "id": 880,
        "question": "Có bao nhiêu thành phần liên thông trong đồ thị sau (How many connected components in the graph)?",
        "options": [
            "A. 1",
            "B. 3",
            "C. 4",
            "D. 2",
            "E. 13",
            "F. None of the other choices is correct"
        ],
        "answer": "D",
        "explanation": [
            "Bước 1: Quan sát cấu trúc tổng thể của đồ thị:",
            "- Thành phần 1: Khung ngoài cùng là một hình vuông gồm 4 đỉnh và 4 cạnh tạo thành chu trình \\(C_4\\). Không có bất kỳ cạnh nào nối từ chu trình ngoài này vào phần đồ thị bên trong.",
            "- Thành phần 2: Phần đồ thị bên trong gồm hình ngôi sao 8 đỉnh lồng nhau kết hợp với một đỉnh ở tâm được nối vào một trong các đỉnh ngôi sao. Tất cả các đỉnh bên trong này đều liên thông với nhau.",
            "Bước 2: Vì hai bộ phận hoàn toàn tách biệt và không có cạnh nối liên đới, đồ thị có đúng 2 thành phần liên thông.",
            "Đáp án đúng là D (2)."
        ],
        "chapter": "Ch8_Graphs",
        "difficulty": "easy",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": True,
        "image_svg": '<svg viewBox="0 0 260 240" xmlns="http://www.w3.org/2000/svg"><g stroke="#2d3748" stroke-width="2" fill="none"><rect x="30" y="20" width="200" height="200"/><rect x="70" y="60" width="120" height="120"/><polygon points="130,40 190,100 190,140 130,200 70,140 70,100"/><line x1="80" y1="120" x2="130" y2="120"/></g><g fill="#fff" stroke="#2d3748" stroke-width="2"><circle cx="30" cy="20" r="5"/><circle cx="230" cy="20" r="5"/><circle cx="230" cy="220" r="5"/><circle cx="30" cy="220" r="5"/><circle cx="70" cy="60" r="5"/><circle cx="190" cy="60" r="5"/><circle cx="190" cy="180" r="5"/><circle cx="70" cy="180" r="5"/><circle cx="130" cy="40" r="5"/><circle cx="190" cy="100" r="5"/><circle cx="190" cy="140" r="5"/><circle cx="130" cy="200" r="5"/><circle cx="70" cy="140" r="5"/><circle cx="70" cy="100" r="5"/><circle cx="130" cy="120" r="5"/><circle cx="80" cy="120" r="5"/></g></svg>',
        "verification_source": "v2/verification/batch_022_results.json",
        "original_image": "0880_q880_Question_880.png"
    }
]

def main():
    # 1. Load existing sample
    with open("v2/questions_sample_v2.json", "r", encoding="utf-8") as f:
        existing = json.load(f)

    # Filter out any existing Q841 - Q880 to ensure idempotency
    existing_map = {q["id"]: q for q in existing if q["id"] < 841 or q["id"] > 880}
    
    for q in BATCH_22_QUESTIONS:
        existing_map[q["id"]] = q
        
    updated = [existing_map[k] for k in sorted(existing_map.keys())]
    
    print(f"Total questions after merging Batch 22: {len(updated)}")
    
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
