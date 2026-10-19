"""
Script to build and integrate Batch 16 (Questions 601 - 640).
"""
import json
import os

BATCH_NUMBER = 16
START_ID = 601
END_ID = 640

# Load verification results
with open("v2/verification/batch_016_results.json", "r", encoding="utf-8") as f:
    verif = json.load(f)

# SVG diagrams for visual questions
svg_612 = (
    '<svg viewBox="0 0 320 220" width="320" height="220" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; border:1px solid #e2e8f0; border-radius:8px; display:block; margin:10px auto;">'
    '<style>.node{fill:#3b82f6;stroke:#1d4ed8;stroke-width:2;} .lbl{font-family:sans-serif;font-size:15px;font-weight:bold;fill:#1e293b;} .edge{stroke:#64748b;stroke-width:2;}</style>'
    '<line x1="60" y1="50" x2="160" y2="50" class="edge"/>'
    '<line x1="160" y1="50" x2="260" y2="50" class="edge"/>'
    '<line x1="60" y1="50" x2="60" y2="170" class="edge"/>'
    '<line x1="60" y1="170" x2="160" y2="170" class="edge"/>'
    '<line x1="160" y1="50" x2="160" y2="170" class="edge"/>'
    '<line x1="60" y1="50" x2="160" y2="170" class="edge"/>'
    '<line x1="60" y1="170" x2="260" y2="50" class="edge"/>'
    '<circle cx="60" cy="50" r="10" class="node"/><text x="55" y="32" class="lbl">a</text>'
    '<circle cx="160" cy="50" r="10" class="node"/><text x="156" y="32" class="lbl">b</text>'
    '<circle cx="260" cy="50" r="10" class="node"/><text x="256" y="32" class="lbl">c</text>'
    '<circle cx="60" cy="170" r="10" class="node"/><text x="55" y="196" class="lbl">d</text>'
    '<circle cx="160" cy="170" r="10" class="node"/><text x="156" y="196" class="lbl">e</text>'
    '</svg>'
)

svg_613 = (
    '<svg viewBox="0 0 460 260" width="460" height="260" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; border:1px solid #e2e8f0; border-radius:8px; display:block; margin:10px auto;">'
    '<style>.node{fill:#3b82f6;stroke:#1d4ed8;stroke-width:2;} .lbl{font-family:sans-serif;font-size:15px;font-weight:bold;fill:#1e293b;} .w{font-family:sans-serif;font-size:13px;font-weight:bold;fill:#b91c1c;background:#fff;} .edge{stroke:#64748b;stroke-width:2;}</style>'
    '<line x1="60" y1="110" x2="180" y2="50" class="edge"/><text x="110" y="70" class="w">4</text>'
    '<line x1="60" y1="110" x2="180" y2="210" class="edge"/><text x="110" y="180" class="w">8</text>'
    '<line x1="180" y1="50" x2="180" y2="210" class="edge"/><text x="185" y="135" class="w">6</text>'
    '<line x1="180" y1="50" x2="320" y2="90" class="edge"/><text x="250" y="62" class="w">9</text>'
    '<line x1="180" y1="50" x2="250" y2="135" class="edge"/><text x="222" y="88" class="w">5</text>'
    '<line x1="250" y1="135" x2="310" y2="190" class="edge"/><text x="278" y="176" class="w">3</text>'
    '<line x1="180" y1="210" x2="250" y2="135" class="edge"/><text x="202" y="184" class="w">6</text>'
    '<line x1="250" y1="135" x2="320" y2="90" class="edge"/><text x="290" y="110" class="w">4</text>'
    '<line x1="180" y1="210" x2="310" y2="190" class="edge"/><text x="245" y="215" class="w">5</text>'
    '<line x1="320" y1="90" x2="310" y2="190" class="edge"/><text x="325" y="145" class="w">6</text>'
    '<line x1="320" y1="90" x2="400" y2="140" class="edge"/><text x="365" y="105" class="w">8</text>'
    '<line x1="310" y1="190" x2="400" y2="140" class="edge"/><text x="365" y="180" class="w">7</text>'
    '<circle cx="60" cy="110" r="12" class="node"/><text x="40" y="115" class="lbl">A</text>'
    '<circle cx="180" cy="50" r="12" class="node"/><text x="175" y="32" class="lbl">B</text>'
    '<circle cx="180" cy="210" r="12" class="node"/><text x="175" y="235" class="lbl">C</text>'
    '<circle cx="250" cy="135" r="10" class="node"/><text x="256" y="132" class="lbl">E</text>'
    '<circle cx="320" cy="90" r="12" class="node"/><text x="325" y="78" class="lbl">D</text>'
    '<circle cx="310" cy="190" r="12" class="node"/><text x="315" y="210" class="lbl">F</text>'
    '<circle cx="400" cy="140" r="12" class="node"/><text x="418" y="145" class="lbl">G</text>'
    '</svg>'
)

svg_614 = (
    '<svg viewBox="0 0 340 340" width="300" height="300" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; border:1px solid #e2e8f0; border-radius:8px; display:block; margin:10px auto;">'
    '<style>.root{fill:#0f172a;stroke:#000;stroke-width:2;} .leaf{fill:#86efac;stroke:#16a34a;stroke-width:1.5;} .edge{stroke:#94a3b8;stroke-width:1.5;}</style>'
    '<line x1="170" y1="170" x2="110" y2="170" class="edge"/><line x1="110" y1="170" x2="70" y2="170" class="edge"/><line x1="70" y1="170" x2="40" y2="170" class="edge"/><line x1="40" y1="170" x2="15" y2="170" class="edge"/>'
    '<line x1="170" y1="170" x2="170" y2="110" class="edge"/><line x1="170" y1="110" x2="170" y2="70" class="edge"/><line x1="170" y1="70" x2="170" y2="35" class="edge"/>'
    '<line x1="170" y1="170" x2="230" y2="170" class="edge"/><line x1="230" y1="170" x2="270" y2="170" class="edge"/><line x1="270" y1="170" x2="305" y2="170" class="edge"/>'
    '<line x1="170" y1="170" x2="170" y2="230" class="edge"/><line x1="170" y1="230" x2="170" y2="275" class="edge"/><line x1="170" y1="275" x2="170" y2="310" class="edge"/>'
    '<line x1="170" y1="170" x2="130" y2="130" class="edge"/><line x1="130" y1="130" x2="90" y2="100" class="edge"/><line x1="90" y1="100" x2="55" y2="80" class="edge"/>'
    '<line x1="170" y1="170" x2="210" y2="130" class="edge"/><line x1="210" y1="130" x2="250" y2="100" class="edge"/><line x1="250" y1="100" x2="285" y2="80" class="edge"/>'
    '<line x1="170" y1="170" x2="130" y2="210" class="edge"/><line x1="130" y1="210" x2="90" y2="240" class="edge"/><line x1="90" y1="240" x2="55" y2="260" class="edge"/>'
    '<line x1="170" y1="170" x2="210" y2="210" class="edge"/><line x1="210" y1="210" x2="250" y2="240" class="edge"/><line x1="250" y1="240" x2="285" y2="260" class="edge"/>'
    '<rect x="162" y="162" width="16" height="16" class="root"/>'
    '<rect x="103" y="163" width="14" height="14" class="leaf"/><rect x="63" y="163" width="14" height="14" class="leaf"/><rect x="33" y="163" width="14" height="14" class="leaf"/><rect x="8" y="163" width="14" height="14" class="leaf"/>'
    '<rect x="163" y="103" width="14" height="14" class="leaf"/><rect x="163" y="63" width="14" height="14" class="leaf"/><rect x="163" y="28" width="14" height="14" class="leaf"/>'
    '<rect x="223" y="163" width="14" height="14" class="leaf"/><rect x="263" y="163" width="14" height="14" class="leaf"/><rect x="298" y="163" width="14" height="14" class="leaf"/>'
    '<rect x="163" y="223" width="14" height="14" class="leaf"/><rect x="163" y="268" width="14" height="14" class="leaf"/><rect x="163" y="303" width="14" height="14" class="leaf"/>'
    '<rect x="123" y="123" width="14" height="14" class="leaf"/><rect x="83" y="93" width="14" height="14" class="leaf"/><rect x="48" y="73" width="14" height="14" class="leaf"/>'
    '<rect x="203" y="123" width="14" height="14" class="leaf"/><rect x="243" y="93" width="14" height="14" class="leaf"/><rect x="278" y="73" width="14" height="14" class="leaf"/>'
    '<rect x="123" y="203" width="14" height="14" class="leaf"/><rect x="83" y="233" width="14" height="14" class="leaf"/><rect x="48" y="253" width="14" height="14" class="leaf"/>'
    '<rect x="203" y="203" width="14" height="14" class="leaf"/><rect x="243" y="233" width="14" height="14" class="leaf"/><rect x="278" y="253" width="14" height="14" class="leaf"/>'
    '</svg>'
)

svg_617 = (
    '<svg viewBox="0 0 380 200" width="360" height="190" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; border:1px solid #e2e8f0; border-radius:8px; display:block; margin:10px auto;">'
    '<style>.node{fill:#3b82f6;stroke:#1d4ed8;stroke-width:2;} .lbl{font-family:sans-serif;font-size:15px;font-weight:bold;fill:#1e293b;} .edge{stroke:#64748b;stroke-width:2;} .bridge{stroke:#ef4444;stroke-width:2.5;stroke-dasharray:4 2;}</style>'
    '<line x1="60" y1="50" x2="140" y2="50" class="edge"/>'
    '<line x1="140" y1="50" x2="140" y2="140" class="edge"/>'
    '<line x1="140" y1="140" x2="60" y2="140" class="edge"/>'
    '<line x1="60" y1="140" x2="60" y2="50" class="edge"/>'
    '<line x1="140" y1="140" x2="230" y2="140" class="bridge"/>'
    '<line x1="230" y1="50" x2="310" y2="50" class="edge"/>'
    '<line x1="310" y1="50" x2="310" y2="140" class="edge"/>'
    '<line x1="310" y1="140" x2="230" y2="140" class="edge"/>'
    '<line x1="230" y1="140" x2="230" y2="50" class="edge"/>'
    '<circle cx="60" cy="50" r="8" class="node"/><text x="56" y="36" class="lbl">a</text>'
    '<circle cx="140" cy="50" r="8" class="node"/><text x="136" y="36" class="lbl">b</text>'
    '<circle cx="60" cy="140" r="8" class="node"/><text x="56" y="165" class="lbl">c</text>'
    '<circle cx="140" cy="140" r="8" class="node"/><text x="136" y="165" class="lbl">d</text>'
    '<circle cx="230" cy="50" r="8" class="node"/><text x="226" y="36" class="lbl">f</text>'
    '<circle cx="310" cy="50" r="8" class="node"/><text x="306" y="36" class="lbl">g</text>'
    '<circle cx="230" cy="140" r="8" class="node"/><text x="226" y="165" class="lbl">e</text>'
    '<circle cx="310" cy="140" r="8" class="node"/><text x="306" y="165" class="lbl">h</text>'
    '</svg>'
)

svg_633 = (
    '<svg viewBox="0 0 340 380" width="320" height="360" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; border:1px solid #e2e8f0; border-radius:8px; display:block; margin:10px auto;">'
    '<style>.node{fill:#3b82f6;stroke:#1d4ed8;stroke-width:2;} .lbl{font-family:sans-serif;font-size:15px;font-weight:bold;fill:#1e293b;} .w{font-family:sans-serif;font-size:13px;font-weight:bold;fill:#b91c1c;} .edge{stroke:#64748b;stroke-width:2;}</style>'
    '<line x1="70" y1="50" x2="250" y2="50" class="edge"/><text x="155" y="40" class="w">1</text>'
    '<line x1="70" y1="50" x2="70" y2="160" class="edge"/><text x="55" y="110" class="w">1</text>'
    '<line x1="250" y1="50" x2="250" y2="170" class="edge"/><text x="258" y="110" class="w">3</text>'
    '<line x1="70" y1="160" x2="250" y2="170" class="edge"/><text x="155" y="162" class="w">2</text>'
    '<line x1="70" y1="50" x2="160" y2="110" class="edge"/><text x="105" y="85" class="w">3</text>'
    '<line x1="250" y1="50" x2="160" y2="110" class="edge"/><text x="210" y="85" class="w">2</text>'
    '<line x1="70" y1="160" x2="160" y2="110" class="edge"/><text x="105" y="140" class="w">2</text>'
    '<line x1="250" y1="170" x2="160" y2="110" class="edge"/><text x="210" y="140" class="w">1</text>'
    '<line x1="70" y1="160" x2="70" y2="300" class="edge"/><text x="55" y="235" class="w">3</text>'
    '<line x1="250" y1="170" x2="250" y2="300" class="edge"/><text x="258" y="235" class="w">2</text>'
    '<line x1="70" y1="300" x2="250" y2="300" class="edge"/><text x="155" y="318" class="w">2</text>'
    '<line x1="70" y1="300" x2="250" y2="170" class="edge"/><text x="175" y="240" class="w">1</text>'
    '<circle cx="70" cy="50" r="10" class="node"/><text x="52" y="45" class="lbl">A</text>'
    '<circle cx="250" cy="50" r="10" class="node"/><text x="258" y="45" class="lbl">B</text>'
    '<circle cx="70" cy="160" r="10" class="node"/><text x="50" y="165" class="lbl">D</text>'
    '<circle cx="250" cy="170" r="10" class="node"/><text x="260" y="172" class="lbl">C</text>'
    '<circle cx="160" cy="110" r="10" class="node"/><text x="155" y="98" class="lbl">G</text>'
    '<circle cx="70" cy="300" r="10" class="node"/><text x="50" y="310" class="lbl">E</text>'
    '<circle cx="250" cy="300" r="10" class="node"/><text x="260" y="310" class="lbl">F</text>'
    '</svg>'
)

batch_16_questions = [
    {
        "id": 601,
        "question": "Cho tập phổ quát \\(U = \\{0, 1, 2, 3, 4, 5, 6, 7, 8, 9\\}\\). Giả sử hai tập con \\(A\\) và \\(B\\) được biểu diễn bằng các chuỗi bit lần lượt là \\(1010101010\\) và \\(0101010101\\). Hỏi chuỗi bit tương ứng với tập hợp \\(A \\cup B\\) biểu diễn tập con nào sau đây?",
        "options": [
            "A. \\(\\{0, 2, 4, 6, 8\\}\\)",
            "B. \\(\\{1, 3, 5, 7, 9\\}\\)",
            "C. \\(\\emptyset\\)",
            "D. \\(\\{0, 1, 2, 3, 4, 5, 6, 7, 8, 9\\}\\)"
        ],
        "answer": "D",
        "explanation": "Bước 1: Phép hợp hai tập hợp \\(A \\cup B\\) tương ứng với phép toán bitwise OR giữa hai chuỗi bit đại diện.\\nBước 2: Ta thực hiện phép OR theo từng vị trí:\\n\\[ 1010101010 \\lor 0101010101 = 1111111111 \\]\\nChuỗi bit toàn 1 đại diện cho toàn bộ tập phổ quát \\(U = \\{0, 1, 2, 3, 4, 5, 6, 7, 8, 9\\}\\). Do đó chọn đáp án D.",
        "chapter": "Ch2_BasicStructures",
        "difficulty": "easy",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_016_results.json"
    },
    {
        "id": 602,
        "question": "Tìm biểu diễn dạng hậu tố (postfix / reverse Polish notation) của biểu thức đại số sau:\\n\\[ (x - y)^2 + x(y + 5) \\]",
        "options": [
            "A. (ii)",
            "B. (i)",
            "C. (iii)",
            "D. None of the other choices is correct"
        ],
        "sub_options": {
            "(i)": "x y - 2 ↑ x y 5 + * +",
            "(ii)": "x y 2 - ↑ x y 5 * + +",
            "(iii)": "x y - 2 ↑ x y + 5 * +"
        },
        "answer": "B",
        "explanation": "Bước 1: Chuyển đổi từng cụm toán hạng sang dạng hậu tố:\\n- \\((x - y) \\to x\\ y\\ -\\)\\n- \\((x - y)^2 \\to x\\ y\\ -\\ 2\\ \\uparrow\\)\\n- \\((y + 5) \\to y\\ 5\\ +\\)\\n- \\(x(y + 5) \\to x\\ y\\ 5\\ +\\ *\\)\\nBước 2: Kết hợp hai toán hạng bằng phép cộng ở gốc biểu thức:\\n\\[ x\\ y\\ -\\ 2\\ \\uparrow\\ x\\ y\\ 5\\ +\\ *\\ + \\]\\nBiểu thức này trùng khớp chính xác với khẳng định (i). Do đó phương án đúng là B.",
        "chapter": "Ch5_Induction",
        "difficulty": "medium",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_016_results.json"
    },
    {
        "id": 603,
        "question": "Cho thủ tục đệ quy \\(T(n)\\) xác định trên tập số nguyên dương như sau:\\n\\[ T(n) = \\begin{cases} 3 & \\text{nếu } n < 3 \\\\ n & \\text{nếu } n \\text{ chẵn} \\\\ 3T(n - 1) - 2 & \\text{nếu } n \\text{ lẻ và } n \\ge 3 \\end{cases} \\]\\nTính giá trị của \\(T(9)\\).",
        "options": [
            "A. 15",
            "B. 18",
            "C. 24",
            "D. 20",
            "E. 22"
        ],
        "answer": "E",
        "explanation": "Bước 1: Vì \\(n = 9\\) là số lẻ lớn hơn hoặc bằng 3, theo định nghĩa:\\n\\[ T(9) = 3T(8) - 2 \\]\\nBước 2: Với \\(n = 8\\) là số chẵn, theo trường hợp 2 thì \\(T(8) = 8\\).\\nThay vào ta được:\\n\\[ T(9) = 3(8) - 2 = 24 - 2 = 22 \\]\\nDo đó đáp án chính xác là E.",
        "chapter": "Ch5_Induction",
        "difficulty": "easy",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_016_results.json"
    },
    {
        "id": 604,
        "question": "Cho hàm \\(f\\) thỏa mãn hệ thức chia để trị \\(f(n) = 2f(n/3) + n\\) với \\(n\\) là lũy thừa của 3 và điều kiện ban đầu \\(f(1) = 2\\). Tìm giá trị của \\(f(81)\\).",
        "options": [
            "A. 227",
            "B. 73",
            "C. 23",
            "D. 189"
        ],
        "answer": "A",
        "explanation": "Bước 1: Tính các giá trị kế tiếp của \\(f(n)\\) tại các lũy thừa của 3:\\n- \\(f(1) = 2\\)\\n- \\(f(3) = 2f(1) + 3 = 2(2) + 3 = 7\\)\\n- \\(f(9) = 2f(3) + 9 = 2(7) + 9 = 23\\)\\nBước 2: Tiếp tục tính tới \\(n = 81\\):\\n- \\(f(27) = 2f(9) + 27 = 2(23) + 27 = 46 + 27 = 73\\)\\n- \\(f(81) = 2f(27) + 81 = 2(73) + 81 = 146 + 81 = 227\\)\\nVậy \\(f(81) = 227\\), chọn đáp án A.",
        "chapter": "Ch5_Induction",
        "difficulty": "medium",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_016_results.json"
    },
    {
        "id": 605,
        "question": "Xét các khẳng định sau với mọi số thực \\(x\\):\\n(i) \\(\\lceil \\lfloor x \\rfloor \\rceil = \\lceil x \\rceil\\)\\n(ii) \\(\\lceil \\lfloor x \\rfloor \\rceil \\le x\\)\\n(iii) \\(\\lceil \\lfloor x \\rfloor \\rceil > x\\)\\nKhẳng định nào đúng với mọi số thực \\(x\\)?",
        "options": [
            "A. Only (i)",
            "B. Only (iii)",
            "C. Only (ii)",
            "D. (i) and (ii)"
        ],
        "answer": "C",
        "explanation": "Bước 1: Với mọi số thực \\(x\\), phần nguyên dưới \\(\\lfloor x \\rfloor\\) là một số nguyên (đặt \\(k = \\lfloor x \\rfloor \\in \\mathbb{Z}\\)). Khi lấy trần của một số nguyên, ta có \\(\\lceil k \\rceil = k\\), do đó:\\n\\[ \\lceil \\lfloor x \\rfloor \\rceil = \\lfloor x \\rfloor \\]\\nBước 2: Theo định nghĩa của hàm sàn, \\(\\lfloor x \\rfloor \\le x\\) với mọi số thực \\(x\\). Do đó \\(\\lceil \\lfloor x \\rfloor \\rceil \\le x\\) luôn đúng (khẳng định ii đúng).\\nVới \\(x\\) không nguyên (ví dụ \\(x = 1.5\\)), \\(\\lceil \\lfloor 1.5 \\rfloor \\rceil = 1\\) trong khi \\(\\lceil 1.5 \\rceil = 2\\), nên (i) sai. Vậy chỉ có (ii) đúng, chọn C.",
        "chapter": "Ch2_BasicStructures",
        "difficulty": "medium",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_016_results.json"
    },
    {
        "id": 606,
        "question": "Xét các hàm số sau theo biến nguyên dương \\(n\\):\\n(i) \\(f_1(n) = \\sum_{i=1}^{n+2} i^3\\)\\n(ii) \\(f_2(n) = (n + 4)^5 - (n - 2)^5\\)\\n(iii) \\(f_3(n) = (n \\log n - 1)^4\\)\\nHàm số nào KHÔNG thuộc \\(O(n^4)\\)? (Theo đáp án chính thức của kỳ thi)",
        "options": [
            "A. (ii)",
            "B. (i)",
            "C. (iii)",
            "D. None of the other choices is correct"
        ],
        "answer": "A",
        "explanation": "Bước 1: Phân tích độ phức tạp lý thuyết:\\n- Với (i): \\(\\sum_{i=1}^{n+2} i^3 = O(n^4)\\).\\n- Với (ii): Khai triển nhị thức bậc 5: \\((n+4)^5 - (n-2)^5 = 5n^4(4) - 5n^4(-2) + O(n^3) = 30n^4 + O(n^3)\\), do hệ số bậc 5 triệt tiêu nên hàm thực chất là \\(\\Theta(n^4) = O(n^4)\\).\\n- Với (iii): \\((n \\log n - 1)^4 = \\Theta(n^4 \\log^4 n)\\), tăng nhanh hơn hẳn \\(n^4\\) nên về mặt toán học (iii) KHÔNG thuộc \\(O(n^4)\\).\\nBước 2: Tuy nhiên đề thi gốc đưa ra đáp án chính thức là A ((ii)) do người ra đề nhìn lũy thừa bậc 5 mà không rút gọn hệ số \\(n^5\\). Để đảm bảo tính nhất quán với thang điểm của kỳ thi FPT, hệ thống bảo lưu đáp án A kèm cờ ghi chú.",
        "chapter": "Ch3_Algorithms",
        "difficulty": "medium",
        "answer_status": "verified",
        "confidence": "medium",
        "review_flags": ["exam_key_retained", "question_design_flawed"],
        "needs_image": False,
        "verification_source": "v2/verification/batch_016_results.json"
    },
    {
        "id": 607,
        "question": "Xét thuật toán tính giá trị đa thức \\(P(c) = a_n c^n + \\dots + a_1 c + a_0\\) sử dụng đoạn mã sau:\\n```\\ny := a_0\\npower := 1\\nfor i := 1 to n\\nbegin\\n    power := power * c\\n    y := y + a_i * power\\nend\\n```\\nCó bao nhiêu phép nhân được thực hiện trong thuật toán trên?",
        "options": [
            "A. (ii)",
            "B. (i)",
            "C. (iii)",
            "D. (iv)"
        ],
        "sub_options": {
            "(i)": "n",
            "(ii)": "2n",
            "(iii)": "n(n+1)/2",
            "(iv)": "2n + 1"
        },
        "answer": "A",
        "explanation": "Bước 1: Vòng lặp `for i := 1 to n` lặp lại đúng \\(n\\) lần.\\nBước 2: Trong mỗi lần lặp, có 2 phép nhân được thực hiện:\\n- Phép tính `power * c` (1 phép nhân)\\n- Phép tính `a_i * power` (1 phép nhân)\\nTổng số phép nhân sau \\(n\\) lần lặp là \\(2 \\times n = 2n\\). Khẳng định (ii) đúng, tương ứng với phương án A.",
        "chapter": "Ch3_Algorithms",
        "difficulty": "easy",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_016_results.json"
    },
    {
        "id": 608,
        "question": "Cho đồ thị đơn vô hướng \\(C_4\\) (chu trình 4 đỉnh). Hỏi ma trận kề của đồ thị này chứa bao nhiêu số 1?",
        "options": [
            "A. (i)",
            "B. (ii)",
            "C. (iii)",
            "D. (iv)"
        ],
        "sub_options": {
            "(i)": "4",
            "(ii)": "6",
            "(iii)": "16",
            "(iv)": "8"
        },
        "answer": "D",
        "explanation": "Bước 1: Trong ma trận kề của một đơn đồ thị vô hướng, mỗi cạnh nối giữa hai đỉnh phân biệt \\(u\\) và \\(v\\) sẽ đóng góp đúng hai số 1 (một tại ô \\((u, v)\\) và một tại ô \\((v, u)\\)).\\nBước 2: Chu trình \\(C_4\\) có đúng 4 đỉnh và 4 cạnh. Tổng số phần tử 1 trong ma trận kề là:\\n\\[ 2 \\times |E| = 2 \\times 4 = 8 \\]\\nKhẳng định (iv) là 8, tương ứng với phương án D.",
        "chapter": "Ch6_Graphs",
        "difficulty": "easy",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_016_results.json"
    },
    {
        "id": 609,
        "question": "Cho miền xác định của biến \\(x\\) là tập hợp các số nguyên \\(\\{-2, -1, 0, 1, 2, 3, 4\\}\\). Mệnh đề \\(\\exists x \\big((x \\ge 0) \\land P(x)\\big)\\) tương đương logic với mệnh đề nào sau đây?",
        "options": [
            "A. (iv)",
            "B. (ii)",
            "C. (i)",
            "D. (iii)"
        ],
        "sub_options": {
            "(i)": "P(0) ∨ P(1) ∨ P(2) ∨ P(3) ∨ P(4)",
            "(ii)": "P(-2) ∨ P(-1) ∨ P(0) ∨ P(1) ∨ P(2) ∨ P(3) ∨ P(4)",
            "(iii)": "P(0) ∧ P(1) ∧ P(2) ∧ P(3) ∧ P(4)",
            "(iv)": "P(1) ∨ P(2) ∨ P(3) ∨ P(4)"
        },
        "answer": "C",
        "explanation": "Bước 1: Lượng từ tồn tại \\(\\exists x\\) trên miền hữu hạn tương đương với phép tuyển (OR, \\(\\lor\\)) của các mệnh đề thành phần thỏa mãn điều kiện.\\nBước 2: Điều kiện \\(x \\ge 0\\) trên tập \\(\\{-2, -1, 0, 1, 2, 3, 4\\}\\) lọc ra các giá trị \\(x \\in \\{0, 1, 2, 3, 4\\}\\). Do đó mệnh đề trở thành:\\n\\[ P(0) \\lor P(1) \\lor P(2) \\lor P(3) \\lor P(4) \\]\\nKhẳng định này là (i), tương ứng với lựa chọn C.",
        "chapter": "Ch1_Logic",
        "difficulty": "easy",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_016_results.json"
    },
    {
        "id": 610,
        "question": "Cho bảng tần suất xuất hiện của 5 ký tự \\(A, B, C, D, E\\) lần lượt là: \\(A: 0.30\\), \\(B: 0.15\\), \\(C: 0.25\\), \\(D: 0.20\\), \\(E: 0.10\\). Sử dụng mã hóa Huffman tối ưu, độ dài trung bình (số bit trên mỗi ký tự) là bao nhiêu?",
        "options": [
            "A. 2.25",
            "B. 2.15",
            "C. 2.30",
            "D. 2.40"
        ],
        "answer": "A",
        "explanation": "Bước 1: Xây dựng cây Huffman từng bước gom hai nút có tần suất nhỏ nhất:\\n- Gom \\(E(0.10)\\) và \\(B(0.15) \\to N_1(0.25)\\).\\n- Các nút hiện tại: \\(D(0.20), C(0.25), N_1(0.25), A(0.30)\\). Gom \\(D(0.20)\\) và \\(C(0.25) \\to N_2(0.45)\\).\\n- Gom \\(N_1(0.25)\\) và \\(A(0.30) \\to N_3(0.55)\\).\\n- Gom \\(N_2(0.45)\\) và \\(N_3(0.55) \\to \\text{Gốc}(1.00)\\).\\nBước 2: Xác định độ dài mã:\\n- \\(A\\) có độ sâu 2, \\(C\\) có độ sâu 2, \\(D\\) có độ sâu 2, \\(B\\) có độ sâu 3, \\(E\\) có độ sâu 3.\\nChiều dài trung bình:\\n\\[ \\bar{L} = 0.30(2) + 0.15(3) + 0.25(2) + 0.20(2) + 0.10(3) = 0.60 + 0.45 + 0.50 + 0.40 + 0.30 = 2.25 \\]\\nDo đó đáp án chính xác là A.",
        "chapter": "Ch5_Induction",
        "difficulty": "medium",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_016_results.json"
    },
    {
        "id": 611,
        "question": "Xét các phát biểu về tập hợp sau:\\n1. \\(a \\in \\{a\\}\\)\\n2. \\(\\{a\\} \\in \\{a\\}\\)\\n3. \\(a \\subseteq \\{a, b\\}\\)\\n4. \\(\\{a, b\\} \\in \\{a, b, c, d\\}\\)\\n5. \\(\\emptyset \\subseteq \\{\\emptyset\\}\\)\\n6. \\(\\emptyset \\times \\{a\\} = \\emptyset\\)\\nNhững phát biểu nào sau đây là ĐÚNG?",
        "options": [
            "A. 1, 3, 5",
            "B. 1, 5, 6",
            "C. 1, 4, 6",
            "D. 2, 5, 6"
        ],
        "answer": "B",
        "explanation": "Bước 1: Kiểm tra từng mệnh đề theo định nghĩa tập hợp:\\n- 1: \\(a \\in \\{a\\}\\) là đúng vì \\(a\\) là phần tử của tập.\\n- 2: \\(\\{a\\} \\in \\{a\\}\\) là sai vì phần tử duy nhất là \\(a\\), không phải tập \\(\\{a\\}\\).\\n- 3: \\(a \\subseteq \\{a, b\\}\\) là sai vì quan hệ con \\(\\subseteq\\) chỉ áp dụng giữa tập hợp với tập hợp, không áp dụng cho phần tử \\(a\\).\\n- 4: \\(\\{a, b\\} \\in \\{a, b, c, d\\}\\) sai vì các phần tử là các chữ cái đơn lẻ.\\nBước 2: Kiểm tra các phát biểu còn lại:\\n- 5: \\(\\emptyset \\subseteq \\{\\emptyset\\}\\) là đúng vì tập rỗng là tập con của mọi tập hợp.\\n- 6: \\(\\emptyset \\times \\{a\\} = \\emptyset\\) là đúng vì tích Descartes với tập rỗng luôn là tập rỗng.\\nVậy các phát biểu đúng là 1, 5, 6. Chọn B.",
        "chapter": "Ch2_BasicStructures",
        "difficulty": "easy",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_016_results.json"
    },
    {
        "id": 612,
        "question": f"Cho đồ thị vô hướng như hình vẽ dưới đây:\\n{svg_612}\\nHỏi có bao nhiêu đường đi (path) có độ dài bằng 3 từ đỉnh \\(b\\) đến đỉnh \\(e\\)?",
        "options": [
            "A. 3",
            "B. 6",
            "C. 7",
            "D. 5"
        ],
        "answer": "C",
        "explanation": "Bước 1: Lập ma trận kề \\(A\\) với thứ tự các đỉnh \\((a, b, c, d, e)\\):\\n\\[ A = \\begin{pmatrix} 0 & 1 & 0 & 1 & 1 \\\\ 1 & 0 & 1 & 0 & 1 \\\\ 0 & 1 & 0 & 1 & 0 \\\\ 1 & 0 & 1 & 0 & 1 \\\\ 1 & 1 & 0 & 1 & 0 \\end{pmatrix} \\]\\nBước 2: Số đường đi độ dài 3 từ \\(b\\) đến \\(e\\) chính là phần tử tại hàng \\(b\\) (hàng 2), cột \\(e\\) (cột 5) của lũy thừa ma trận \\(A^3\\).\\nTính lũy thừa:\\n- Hàng 2 của \\(A^2 = A \\times A\\) là: \\([1, 3, 0, 3, 1]\\).\\n- Nhân hàng 2 của \\(A^2\\) với cột 5 của \\(A\\):\\n\\[ (A^3)_{b, e} = 1(1) + 3(1) + 0(0) + 3(1) + 1(0) = 1 + 3 + 0 + 3 + 0 = 7 \\]\\nVậy có đúng 7 đường đi độ dài 3 từ \\(b\\) tới \\(e\\). Chọn C.",
        "chapter": "Ch6_Graphs",
        "difficulty": "medium",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_016_results.json"
    },
    {
        "id": 613,
        "question": f"Cho đồ thị có trọng số như hình vẽ sau:\\n{svg_613}\\nTìm khoảng cách ngắn nhất (shortest distance) giữa hai đỉnh \\(A\\) và \\(G\\).",
        "options": [
            "A. 20",
            "B. 19",
            "C. 21",
            "D. 18"
        ],
        "answer": "B",
        "explanation": "Bước 1: Áp dụng thuật toán Dijkstra để tìm đường đi ngắn nhất từ đỉnh nguồn \\(A\\):\\n- \\(d(A) = 0\\)\\n- \\(d(B) = 4\\), \\(d(C) = 8\\)\\n- Từ \\(B\\): cập nhật \\(d(E) = 4 + 5 = 9\\), \\(d(D) = 4 + 9 = 13\\)\\n- Từ \\(E\\): cập nhật \\(d(F) = 9 + 3 = 12\\), \\(d(D) = \\min(13, 9 + 4) = 13\\)\\nBước 2: Xét đỉnh \\(F\\) (với \\(d(F) = 12\\)):\\n- Đường đi tới \\(G\\): \\(d(G) = d(F) + w(F, G) = 12 + 7 = 19\\).\\n- Xét đỉnh \\(D\\) (với \\(d(D) = 13\\)): đường đi tới \\(G\\) qua \\(D\\) có độ dài \\(13 + 8 = 21 > 19\\).\\nĐường đi ngắn nhất là \\(A \\to B \\to E \\to F \\to G\\) với tổng trọng số \\(4 + 5 + 3 + 7 = 19\\). Chọn B.",
        "chapter": "Ch6_Graphs",
        "difficulty": "medium",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_016_results.json"
    },
    {
        "id": 614,
        "question": f"Xét cây có gốc (rooted tree) như hình vẽ dưới đây, trong đó gốc là ô vuông màu đen ở tâm:\\n{svg_614}\\nChiều cao (height) của cây này bằng bao nhiêu?",
        "options": [
            "A. 2",
            "B. 4",
            "C. 6",
            "D. 3",
            "E. 5"
        ],
        "answer": "B",
        "explanation": "Bước 1: Chiều cao của cây có gốc là độ dài của đường đi dài nhất từ gốc tới một lá bất kỳ (tính theo số cạnh).\\nBước 2: Gốc ở ô vuông đen (mức 0). Lần theo các nhánh lan tỏa ra xa nhất (ví dụ nhánh phía ngoài cùng bên trái):\\n- Mức 0: Nút gốc (ô vuông đen)\\n- Mức 1: Nút con thứ nhất\\n- Mức 2: Nút con thứ hai\\n- Mức 3: Nút con thứ ba\\n- Mức 4: Lá ngoài cùng (cách gốc 4 cạnh)\\nKhông có lá nào cách gốc quá 4 cạnh. Vậy chiều cao của cây là 4. Chọn đáp án B.",
        "chapter": "Ch5_Induction",
        "difficulty": "easy",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_016_results.json"
    },
    {
        "id": 615,
        "question": "Cho các vị từ sau:\\n- \\(F(x)\\): \"\\(x\\) is a faculty member\"\\n- \\(S(y)\\): \"\\(y\\) is a student\"\\n- \\(P(x, y)\\): \"\\(x\\) taught \\(y\\)\"\\nCâu nào dịch chính xác công thức logic vị từ sau:\\n\\[ \\exists x \\big(F(x) \\land \\forall y (S(y) \\to P(x, y))\\big) \\]",
        "options": [
            "A. All faculties taught all students",
            "B. Some faculties taught all students",
            "C. Some faculties taught some students",
            "D. All faculties taught some students"
        ],
        "answer": "B",
        "explanation": "Bước 1: Phân tích thành phần bên trong lượng từ phổ dụng: \\(\\forall y (S(y) \\to P(x, y))\\) có nghĩa là \"đối với mọi \\(y\\), nếu \\(y\\) là sinh viên thì \\(x\\) dạy \\(y\\)\", tức là \"\\(x\\) dạy tất cả các sinh viên\".\\nBước 2: Lượng từ tồn tại ngoài cùng: \\(\\exists x (F(x) \\land \\dots)\\) nghĩa là \"tồn tại một giảng viên \\(x\\) thỏa mãn ...\", diễn đạt thông thường bằng tiếng Anh là \"Some faculties taught all students\". Chọn đáp án B.",
        "chapter": "Ch1_Logic",
        "difficulty": "easy",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_016_results.json"
    },
    {
        "id": 616,
        "question": "Cho tập phổ quát \\(U = \\{0, 1, 2, 3, 4, 5, 6, 7, 8, 9\\}\\) được sắp theo thứ tự tăng dần. Chuỗi bit \\(0101010101\\) đại diện cho tập con nào của \\(U\\)?",
        "options": [
            "A. \\(\\{0, 2, 4, 6, 8\\}\\)",
            "B. \\(\\{1, 3, 5, 7, 9\\}\\)",
            "C. \\(\\{0, 1, 2, 3, 4, 5, 6, 7, 8, 9\\}\\)",
            "D. \\(\\emptyset\\)"
        ],
        "answer": "B",
        "explanation": "Bước 1: Chuỗi bit biểu diễn tập con có độ dài 10, trong đó bit thứ \\(i\\) (tính từ chỉ số 0 đến 9) bằng 1 nếu phần tử \\(i \\in U\\) thuộc tập con, và bằng 0 nếu không thuộc.\\nBước 2: Với chuỗi bit `0101010101`, các vị trí mang bit 1 là 1, 3, 5, 7, 9. Do đó tập con được đại diện là \\(\\{1, 3, 5, 7, 9\\}\\). Chọn B.",
        "chapter": "Ch2_BasicStructures",
        "difficulty": "easy",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_016_results.json"
    },
    {
        "id": 617,
        "question": f"Đồ thị dưới đây có bao nhiêu cây khung (spanning trees)?\\n{svg_617}",
        "options": [
            "A. 14",
            "B. 16",
            "C. 20",
            "D. 18",
            "E. 12"
        ],
        "answer": "B",
        "explanation": "Bước 1: Đồ thị gồm hai chu trình 4 đỉnh \\(C_4\\) (khối bên trái gồm các đỉnh \\(a,b,d,c\\) và khối bên phải gồm \\(f,g,h,e\\)) được liên kết với nhau bằng đúng một cạnh cầu \\((d, e)\\).\\nBước 2: Trong mọi cây khung của đồ thị, cạnh cầu \\((d, e)\\) bắt buộc phải được giữ lại để đảm bảo tính liên thông. Mỗi chu trình \\(C_4\\) có đúng 4 cạnh, để tạo thành một cây thành phần trên 4 đỉnh thì ta phải bỏ đi đúng 1 cạnh bất kỳ trong 4 cạnh, tức có \\(\\binom{4}{1} = 4\\) cách chọn.\\nÁp dụng quy tắc nhân, tổng số cây khung là:\\n\\[ 4 \\times 1 \\times 4 = 16 \\]\\nDo đó chọn đáp án B.",
        "chapter": "Ch6_Graphs",
        "difficulty": "medium",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_016_results.json"
    },
    {
        "id": 618,
        "question": "Cho các mệnh đề cơ sở:\\n- \\(p\\): \"Bạn đã vượt qua môn học\"\\n- \\(q\\): \"Bạn đạt điểm tổng kết trên 5\"\\n- \\(r\\): \"Bạn nộp bài tập đúng hạn\"\\nBiểu thức logic nào đại diện cho câu: \"Bạn đạt điểm tổng kết trên 5 và nộp bài tập đúng hạn nhưng bạn không vượt qua môn học\"?",
        "options": [
            "A. (ii)",
            "B. (iv)",
            "C. (i)",
            "D. (iii)"
        ],
        "sub_options": {
            "(i)": "q ∧ r ∧ ¬p",
            "(ii)": "q ∨ r ∨ ¬p",
            "(iii)": "(q ∧ r) → ¬p",
            "(iv)": "q ∧ (r → ¬p)"
        },
        "answer": "C",
        "explanation": "Bước 1: Phân tích các liên từ logic trong câu phát biểu:\\n- \"Bạn đạt điểm trên 5\": \\(q\\)\\n- \"và nộp bài tập đúng hạn\": liên từ \"và\" là hội \\(\\land r\\)\\n- \"nhưng bạn không vượt qua\": trong logic mệnh đề, từ \"nhưng\" tương đương logic với liên từ hội \"và\", phủ định của vượt qua là \\(\\neg p\\).\\nBước 2: Kết hợp cả ba thành phần bằng phép hội: \\(q \\land r \\land \\neg p\\). Khẳng định này là (i), tương ứng với lựa chọn C.",
        "chapter": "Ch1_Logic",
        "difficulty": "easy",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_016_results.json"
    },
    {
        "id": 619,
        "question": "Một suy luận (argument) được định nghĩa là hợp lệ (valid) khi và chỉ khi điều kiện nào sau đây được thỏa mãn?",
        "options": [
            "A. The premises are true",
            "B. The conclusion must be true if the premises are true",
            "C. The conclusion is true",
            "D. The premises and conclusion are all true"
        ],
        "answer": "B",
        "explanation": "Bước 1: Theo định nghĩa toán rời rạc về quy tắc suy luận, một lập luận có dạng \\(p_1 \\land p_2 \\land \\dots \\land p_k \\to q\\) được gọi là hợp lệ (valid) nếu chân trị của kết luận \\(q\\) bắt buộc phải đúng trong mọi trường hợp mà tất cả các tiền đề \\(p_1, \\dots, p_k\\) đều đúng.\\nBước 2: Điều này tương ứng với phát biểu: \"The conclusion must be true if the premises are true\". Do đó chọn đáp án B.",
        "chapter": "Ch1_Logic",
        "difficulty": "easy",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_016_results.json"
    },
    {
        "id": 620,
        "question": "Biểu diễn số \\((204)_5\\) trong hệ cơ số 5 sang hệ nhị phân (cơ số 2) là:",
        "options": [
            "A. 110100",
            "B. 110110",
            "C. 101110",
            "D. 111010"
        ],
        "answer": "B",
        "explanation": "Bước 1: Chuyển số từ hệ cơ số 5 sang hệ thập phân:\\n\\[ (204)_5 = 2 \\times 5^2 + 0 \\times 5^1 + 4 \\times 5^0 = 2 \\times 25 + 0 + 4 = 54_{10} \\]\\nBước 2: Phân tích 54 thành tổng các lũy thừa của 2:\\n\\[ 54 = 32 + 16 + 4 + 2 = 2^5 + 2^4 + 2^2 + 2^1 \\]\\nViết dưới dạng chuỗi bit nhị phân:\\n\\[ 110110_2 \\]\\nDo đó đáp án đúng là B.",
        "chapter": "Ch3_Algorithms",
        "difficulty": "easy",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_016_results.json"
    },
    {
        "id": 621,
        "question": "Tính giá trị của tổng sau:\\n\\[ S = \\sum_{i=1}^{97} i(i + 3) \\]",
        "options": [
            "A. 323204",
            "B. 312500",
            "C. 321500",
            "D. 330200"
        ],
        "answer": "A",
        "explanation": "Bước 1: Tách tổng thành hai tổng quen thuộc:\\n\\[ S = \\sum_{i=1}^{n} i^2 + 3 \\sum_{i=1}^{n} i \\quad \\text{với } n = 97 \\]\\nBước 2: Áp dụng các công thức tính tổng:\\n- \\(\\sum_{i=1}^{n} i = \\frac{n(n + 1)}{2} = \\frac{97 \\times 98}{2} = 4753\\)\\n- \\(\\sum_{i=1}^{n} i^2 = \\frac{n(n + 1)(2n + 1)}{6} = \\frac{97 \\times 98 \\times 195}{6} = 308945\\)\\nCộng lại:\\n\\[ S = 308945 + 3(4753) = 308945 + 14259 = 323204 \\]\\nVậy đáp án chính xác là A.",
        "chapter": "Ch2_BasicStructures",
        "difficulty": "medium",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_016_results.json"
    },
    {
        "id": 622,
        "question": "Biểu thức logic \\((p \\to q) \\land (\\neg p \\to q)\\) tương đương logic với mệnh đề nào sau đây?",
        "options": [
            "A. (ii)",
            "B. (iv)",
            "C. (iii)",
            "D. (i)"
        ],
        "sub_options": {
            "(i)": "q",
            "(ii)": "p",
            "(iii)": "p ∨ q",
            "(iv)": "p ∧ q"
        },
        "answer": "D",
        "explanation": "Bước 1: Biến đổi phép kéo theo về phép tuyển:\\n\\[ p \\to q \\equiv \\neg p \\lor q \\quad \\text{và} \\quad \\neg p \\to q \\equiv p \\lor q \\]\\nBước 2: Áp dụng luật phân phối ngược:\\n\\[ (\\neg p \\lor q) \\land (p \\lor q) \\equiv (\\neg p \\land p) \\lor q \\equiv \\mathbf{F} \\lor q \\equiv q \\]\\nKhẳng định (i) là \\(q\\), tương ứng với lựa chọn D.",
        "chapter": "Ch1_Logic",
        "difficulty": "easy",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_016_results.json"
    },
    {
        "id": 623,
        "question": "Có bao nhiêu chuỗi gồm 4 chữ số (từ 0 đến 9, các chữ số có thể lặp lại) chứa chính xác hai chữ số 0?",
        "options": [
            "A. 486",
            "B. 405",
            "C. 576",
            "D. 324"
        ],
        "answer": "A",
        "explanation": "Bước 1: Một chuỗi 4 chữ số có 4 vị trí. Số cách chọn 2 vị trí để đặt chữ số 0 là:\\n\\[ \\binom{4}{2} = 6 \\text{ cách} \\]\\nBước 2: Tại 2 vị trí còn lại, mỗi vị trí có thể chọn một chữ số bất kỳ khác 0 (từ 1 đến 9), có \\(9 \\times 9 = 81\\) cách.\\nTổng số chuỗi thỏa mãn là:\\n\\[ 6 \\times 81 = 486 \\]\\nDo đó đáp án chính xác là A.",
        "chapter": "Ch5_Induction",
        "difficulty": "easy",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_016_results.json"
    },
    {
        "id": 624,
        "question": "Cho dãy số \\(f(n)\\) xác định bởi hệ thức truy hồi:\\n\\[ f(n) = 1 + f(n - 1)f(n - 2) - 2f(n - 1) \\quad \\text{với } n \\ge 3 \\]\\nvà các điều kiện ban đầu \\(f(1) = 1\\), \\(f(2) = -1\\). Tính giá trị của \\(f(5)\\).",
        "options": [
            "A. -3",
            "B. 1",
            "C. 3",
            "D. -1"
        ],
        "answer": "B",
        "explanation": "Bước 1: Tính lần lượt các phần tử tiếp theo:\\n- \\(f(3) = 1 + f(2)f(1) - 2f(2) = 1 + (-1)(1) - 2(-1) = 1 - 1 + 2 = 2\\)\\n- \\(f(4) = 1 + f(3)f(2) - 2f(3) = 1 + (2)(-1) - 2(2) = 1 - 2 - 4 = -5\\)\\nBước 2: Tính \\(f(5)\\):\\n\\[ f(5) = 1 + f(4)f(3) - 2f(4) = 1 + (-5)(2) - 2(-5) = 1 - 10 + 10 = 1 \\]\\nVậy \\(f(5) = 1\\), chọn đáp án B.",
        "chapter": "Ch5_Induction",
        "difficulty": "medium",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_016_results.json"
    },
    {
        "id": 625,
        "question": "Xét các mệnh đề sau:\\n(i) \"Nếu \\(K_4\\) có chu trình Hamilton thì \\(K_3\\) có chu trình Hamilton\"\\n(ii) \"Nếu bánh xe \\(W_5\\) có chu trình Hamilton thì đồ thị đầy đủ \\(K_2\\) có chu trình Hamilton\"\\n(iii) \"Nếu \\(K_2\\) có chu trình Hamilton thì \\(W_5\\) có chu trình Hamilton\"\\nMệnh đề nào là mệnh đề SAI (False)?",
        "options": [
            "A. (i)",
            "B. (iii)",
            "C. None of the other choices is correct",
            "D. (ii)"
        ],
        "answer": "D",
        "explanation": "Bước 1: Xét chân trị của các mệnh đề thành phần về chu trình Hamilton:\\n- \\(K_4\\) có chu trình Hamilton (Đúng), \\(K_3\\) có chu trình Hamilton (Đúng).\\n- Bánh xe \\(W_n\\) với \\(n \\ge 3\\) luôn có chu trình Hamilton, do đó \\(W_5\\) có chu trình Hamilton là mệnh đề ĐÚNG (True).\\n- \\(K_2\\) chỉ có 2 đỉnh nên không thể có chu trình (cần ít nhất 3 đỉnh), do đó \"\\(K_2\\) có chu trình Hamilton\" là SAI (False).\\nBước 2: Xét chân trị phép kéo theo \\(P \\to Q\\):\\n- Với (ii): Tiền đề \\(P\\) (\"\\(W_5\\) có chu trình Hamilton\") là Đúng, nhưng hệ quả \\(Q\\) (\"\\(K_2\\) có chu trình Hamilton\") là Sai. Do đó mệnh đề kéo theo \\(T \\to F\\) có chân trị là SAI (False).\\nVậy mệnh đề (ii) là sai, tương ứng đáp án D.",
        "chapter": "Ch6_Graphs",
        "difficulty": "medium",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_016_results.json"
    },
    {
        "id": 626,
        "question": "Tính giá trị của biểu thức tiền tố (prefix / Polish notation) sau:\\n\\[ - \\ * \\ / \\ 15 \\ - \\ 7 \\ + \\ 1 \\ 1 \\ 3 \\ + \\ 2 \\ + \\ 1 \\ 1 \\]",
        "options": [
            "A. 5",
            "B. 7",
            "C. 6",
            "D. 4"
        ],
        "answer": "A",
        "explanation": "Bước 1: Rút gọn biểu thức tiền tố từ phải sang trái hoặc từ các phép toán cơ sở bên trong:\\n- \\(+ 1\\ 1 = 2\\)\\n- \\(+ 2\\ 2 = 4\\)\\n- \\(+ 1\\ 1 = 2\\)\\n- \\(- 7\\ 2 = 5\\)\\n- \\(/ 15\\ 5 = 3\\)\\nBước 2: Tiếp tục tính toán phần còn lại:\\n- \\(* 3\\ 3 = 9\\)\\n- \\(- 9\\ 4 = 5\\)\\nVậy biểu thức có giá trị bằng 5, chọn A.",
        "chapter": "Ch5_Induction",
        "difficulty": "medium",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_016_results.json"
    },
    {
        "id": 627,
        "question": "Cho các vị từ sau với biến \\(x\\) thuộc tập tất cả sinh viên:\\n- \\(F(x)\\): \"\\(x\\) is a Business student\"\\n- \\(R(x)\\): \"\\(x\\) speaks Russian\"\\n- \\(J(x)\\): \"\\(x\\) knows Java\"\\nCông thức nào sau đây diễn đạt chính xác câu: \"Mọi sinh viên khoa Quản trị kinh doanh đều biết tiếng Nga hoặc biết ngôn ngữ Java\"?",
        "options": [
            "A. (i)",
            "B. (ii)",
            "C. (iii)",
            "D. (iv)"
        ],
        "sub_options": {
            "(i)": "∀x (F(x) → (J(x) ∨ R(x)))",
            "(ii)": "∀x (F(x) ∧ (J(x) ∨ R(x)))",
            "(iii)": "∃x (F(x) → (J(x) ∨ R(x)))",
            "(iv)": "∀x ((F(x) ∧ J(x)) ∨ R(x))"
        },
        "answer": "A",
        "explanation": "Bước 1: Mệnh đề có cấu trúc \"Mọi đối tượng thuộc nhóm A đều thỏa mãn B\": lượng từ toàn thể \\(\\forall x\\) đi kèm phép kéo theo \\(A(x) \\to B(x)\\).\\nBước 2: Ở đây nhóm A là \"sinh viên Quản trị kinh doanh\" (\\(F(x)\\)), tính chất B là \"biết tiếng Nga hoặc biết Java\" (\\(R(x) \\lor J(x)\\)).\\nDo đó công thức chuẩn xác là \\(\\forall x \\big(F(x) \\to (J(x) \\lor R(x))\\big)\\), khớp với khẳng định (i). Chọn A.",
        "chapter": "Ch1_Logic",
        "difficulty": "easy",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_016_results.json"
    },
    {
        "id": 628,
        "question": "Cho thuật toán tìm số lớn nhất sau đây:\\n```\\nprocedure find_max(a_1, a_2, ..., a_n)\\nmax := a_1\\nfor i := 2 to n\\n    if a_i > max then max := a_i\\nreturn max\\n```\\nKhi chạy thuật toán với dãy đầu vào \\(1, 4, 5, 2, 7, 9, 3\\), biến `max` lần lượt nhận các giá trị nào trong quá trình thực thi?",
        "options": [
            "A. 1, 4, 5, 7",
            "B. 1, 4, 7, 9",
            "C. 4, 5, 7, 9",
            "D. 1, 4, 5, 7, 9"
        ],
        "answer": "D",
        "explanation": "Bước 1: Khởi tạo ban đầu: `max := a_1 = 1`.\\nBước 2: Lần lượt duyệt các phần tử tiếp theo qua vòng lặp:\\n- Xét \\(a_2 = 4 > 1\\): cập nhật `max = 4`.\\n- Xét \\(a_3 = 5 > 4\\): cập nhật `max = 5`.\\n- Xét \\(a_4 = 2 < 5\\): giữ nguyên `max = 5`.\\n- Xét \\(a_5 = 7 > 5\\): cập nhật `max = 7`.\\n- Xét \\(a_6 = 9 > 7\\): cập nhật `max = 9`.\\n- Xét \\(a_7 = 3 < 9\\): giữ nguyên `max = 9`.\\nCác giá trị mà `max` lần lượt nhận là 1, 4, 5, 7, 9. Chọn D.",
        "chapter": "Ch3_Algorithms",
        "difficulty": "easy",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_016_results.json"
    },
    {
        "id": 629,
        "question": "Cho hai số nguyên dương phân tích ra thừa số nguyên tố như sau:\\n\\[ m = 29^5 \\times 31^{12} \\times 37^{90} \\quad \\text{và} \\quad n = 17^3 \\times 29^4 \\times 37^{14} \\]\\nXét các khẳng định sau:\\n(i) \\(\\gcd(m, n) = 29^4 \\times 37^{14}\\)\\n(ii) \\(\\text{lcm}(m, n) = 29^5 \\times 31^{12} \\times 37^{90}\\)\\n(iii) \\(\\text{lcm}(m, n) = 17^3 \\times 29^5 \\times 31^{12} \\times 37^{90}\\)\\nNhững khẳng định nào là ĐÚNG?",
        "options": [
            "A. Only (i)",
            "B. (i), (ii)",
            "C. (iii), (i)",
            "D. Only (iii)"
        ],
        "answer": "C",
        "explanation": "Bước 1: Tính ước chung lớn nhất (\\(\\gcd\\)): Lấy các thừa số nguyên tố chung với số mũ nhỏ nhất:\\n- Thừa số 17: số mũ \\(\\min(0, 3) = 0\\)\\n- Thừa số 29: số mũ \\(\\min(5, 4) = 4\\)\\n- Thừa số 31: số mũ \\(\\min(12, 0) = 0\\)\\n- Thừa số 37: số mũ \\(\\min(90, 14) = 14\\)\\nSuy ra \\(\\gcd(m, n) = 29^4 \\times 37^{14}\\) (khẳng định i đúng).\\nBước 2: Tính bội chung nhỏ nhất (\\(\\text{lcm}\\)): Lấy tất cả thừa số nguyên tố với số mũ lớn nhất:\\n- \\(\\text{lcm}(m, n) = 17^3 \\times 29^5 \\times 31^{12} \\times 37^{90}\\) (khẳng định iii đúng).\\nVậy (i) và (iii) đều đúng, chọn đáp án C.",
        "chapter": "Ch3_Algorithms",
        "difficulty": "easy",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_016_results.json"
    },
    {
        "id": 630,
        "question": "Tìm ước chung lớn nhất \\(\\gcd(851, 931)\\).",
        "options": [
            "A. 13",
            "B. 17",
            "C. 7",
            "D. 19",
            "E. None of the other choices is correct"
        ],
        "answer": "E",
        "explanation": "Bước 1: Áp dụng thuật toán Euclid:\\n- \\(931 = 1 \\times 851 + 80\\)\\n- \\(851 = 10 \\times 80 + 51\\)\\n- \\(80 = 1 \\times 51 + 29\\)\\n- \\(51 = 1 \\times 29 + 22\\)\\n- \\(29 = 1 \\times 22 + 7\\)\\n- \\(22 = 3 \\times 7 + 1\\)\\n- \\(7 = 7 \\times 1 + 0\\)\\nBước 2: Số dư khác 0 cuối cùng là 1, do đó \\(\\gcd(851, 931) = 1\\). Vì 1 không trùng với bất kỳ giá trị nào trong các phương án A, B, C, D, ta chọn đáp án E (None of the other choices is correct).",
        "chapter": "Ch3_Algorithms",
        "difficulty": "medium",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_016_results.json"
    },
    {
        "id": 631,
        "question": "Xét hai thủ tục tính \\(a^n\\) sau đây:\\n(i)\\n```\\nprocedure power(b, n)\\nif n = 0 then return 1\\nelse if n mod 2 = 0 then\\n    return power(b, n div 2)^2\\nelse\\n    return b * power(b, n - 1)\\n```\\n(ii)\\n```\\nprocedure power(b, n)\\nresult := 1\\nfor i := 1 to n\\n    result := result * b\\nreturn result\\n```\\nThủ tục nào là thuật toán đệ quy (recursive)?",
        "options": [
            "A. Only (i)",
            "B. Both (i) and (ii)",
            "C. Only (ii)",
            "D. Neither (i) nor (ii)"
        ],
        "answer": "A",
        "explanation": "Bước 1: Theo định nghĩa, một thuật toán đệ quy là thuật toán tự gọi lại chính nó với các tham số đầu vào có kích thước nhỏ hơn.\\nBước 2: Trong thủ tục (i), bên trong thân hàm xuất hiện các lời gọi lại `power(b, n div 2)` và `power(b, n - 1)`, do đó (i) là giải thuật đệ quy. Trong khi đó, thủ tục (ii) chỉ sử dụng vòng lặp lặp đơn thuần (`for i := 1 to n`), đây là giải thuật lặp (iterative). Vậy chỉ có (i) là đệ quy, chọn A.",
        "chapter": "Ch5_Induction",
        "difficulty": "easy",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_016_results.json"
    },
    {
        "id": 632,
        "question": "Cho hàm số \\(f(x) = x^2 \\log(x^3) + x^2 \\log x + (x \\log x)^2\\). Tìm hàm số đơn giản nhất \\(g(x)\\) sao cho \\(f(x) = O(g(x))\\).",
        "options": [
            "A. (iv)",
            "B. (i)",
            "C. (ii)",
            "D. (iii)"
        ],
        "sub_options": {
            "(i)": "x^3",
            "(ii)": "x^2",
            "(iii)": "x^2 \\log x",
            "(iv)": "x^2 (\\log x)^2"
        },
        "answer": "A",
        "explanation": "Bước 1: Rút gọn biểu thức của \\(f(x)\\):\\n- \\(x^2 \\log(x^3) = 3x^2 \\log x\\)\\n- Tổng hai số hạng đầu: \\(3x^2 \\log x + x^2 \\log x = 4x^2 \\log x\\)\\n- Số hạng thứ ba: \\((x \\log x)^2 = x^2 (\\log x)^2\\)\\nBước 2: So sánh tốc độ tăng khi \\(x \\to \\infty\\):\\nDo \\((\\log x)^2\\) tăng nhanh hơn \\(\\log x\\), số hạng \\(x^2 (\\log x)^2\\) là số hạng chi phối (dominant term).\\nDo đó \\(f(x) = O(x^2 (\\log x)^2)\\). Khẳng định (iv) đúng, tương ứng đáp án A.",
        "chapter": "Ch3_Algorithms",
        "difficulty": "medium",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_016_results.json"
    },
    {
        "id": 633,
        "question": f"Cho đồ thị có trọng số như hình vẽ sau:\\n{svg_633}\\nTheo thuật toán Kruskal, tập các cạnh nào sau đây tạo thành cây khung có trọng số nhỏ nhất (MST)?",
        "options": [
            "A. {C,G}, {A,D}, {A,B}, {C,E}, {B,G}, {C,F}",
            "B. {A,B}, {A,D}, {G,C}, {C,E}, {D,E}, {C,F}",
            "C. {C,E}, {C,G}, {A,B}, {A,D}, {F,E}, {D,G}",
            "D. {A,B}, {A,D}, {G,C}, {C,E}, {D,G}, {C,F}"
        ],
        "answer": "D",
        "explanation": "Bước 1: Liệt kê các cạnh theo thứ tự trọng số tăng dần và áp dụng thuật toán Kruskal (không chọn cạnh tạo chu trình):\\n- Các cạnh trọng số 1: \\(\\{A, B\\}\\), \\(\\{A, D\\}\\), \\(\\{G, C\\}\\), \\(\\{C, E\\}\\). Cả 4 cạnh này đều không tạo chu trình nên đều được chọn vào cây.\\nBước 2: Xét tiếp các cạnh trọng số 2:\\n- Cạnh \\(\\{D, G\\}\\) (trọng số 2): kết nối thành phần liên thông \\(\\{A, B, D\\}\\) với \\(\\{C, E, G\\}\\) mà không tạo chu trình, được chọn.\\n- Cạnh \\(\\{C, F\\}\\) (trọng số 2): kết nối đỉnh cô lập \\(F\\) vào cây khung, được chọn.\\nTổng cộng đã chọn đủ \\(7 - 1 = 6\\) cạnh và liên thông toàn bộ 7 đỉnh. Danh sách cạnh trùng khớp hoàn toàn với phương án D.",
        "chapter": "Ch6_Graphs",
        "difficulty": "medium",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_016_results.json"
    },
    {
        "id": 634,
        "question": "Khi tìm ước chung lớn nhất \\(\\gcd(287, 91)\\) bằng thuật toán chia Euclid, có bao nhiêu phép chia có dư được thực hiện?",
        "options": [
            "A. 1",
            "B. 4",
            "C. 3",
            "D. 2"
        ],
        "answer": "C",
        "explanation": "Bước 1: Thực hiện lần lượt các bước chia theo thuật toán Euclid:\\n- Phép chia 1: \\(287 = 3 \\times 91 + 14\\) (số dư 14)\\n- Phép chia 2: \\(91 = 6 \\times 14 + 7\\) (số dư 7)\\n- Phép chia 3: \\(14 = 2 \\times 7 + 0\\) (số dư 0, thuật toán kết thúc)\\nBước 2: Đếm tổng số phép chia đã thực hiện: Đúng 3 phép chia.\\nDo đó đáp án chính xác là C.",
        "chapter": "Ch3_Algorithms",
        "difficulty": "easy",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_016_results.json"
    },
    {
        "id": 635,
        "question": "Xét hệ thức truy hồi tuyến tính thuần nhất hệ số hằng: \\(a_n = -3a_{n-1} + 4a_{n-2}\\). Các công thức nào sau đây là nghiệm của hệ thức truy hồi trên?\\n(i) \\(a_n = -12\\)\\n(ii) \\(a_n = (-4)^n\\)\\n(iii) \\(a_n = -1\\)",
        "options": [
            "A. (i) and (ii)",
            "B. Only (i)",
            "C. Only (ii)",
            "D. (i), (ii) and (iii)"
        ],
        "answer": "D",
        "explanation": "Bước 1: Phương trình đặc trưng của hệ thức là:\\n\\[ r^2 + 3r - 4 = 0 \\iff (r - 1)(r + 4) = 0 \\iff r_1 = 1, \\, r_2 = -4 \\]\\nNghiệm tổng quát có dạng \\(a_n = c_1 (1)^n + c_2 (-4)^n = c_1 + c_2 (-4)^n\\).\\nBước 2: Kiểm tra từng công thức:\\n- Với (i): \\(a_n = -12\\) tương ứng với \\(c_1 = -12, c_2 = 0\\), là nghiệm.\\n- Với (ii): \\(a_n = (-4)^n\\) tương ứng với \\(c_1 = 0, c_2 = 1\\), là nghiệm.\\n- Với (iii): \\(a_n = -1\\) tương ứng với \\(c_1 = -1, c_2 = 0\\), là nghiệm.\\nCả ba công thức đều thỏa mãn hệ thức truy hồi. Chọn D.",
        "chapter": "Ch5_Induction",
        "difficulty": "medium",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_016_results.json"
    },
    {
        "id": 636,
        "question": "Cho hai tập hợp \\(A\\) và \\(B\\). Biểu thức hiệu đối xứng \\(A \\oplus (A \\cap B)\\) bằng với tập hợp nào sau đây?",
        "options": [
            "A. (i)",
            "B. (iv)",
            "C. (ii)",
            "D. (iii)"
        ],
        "sub_options": {
            "(i)": "A ∪ B",
            "(ii)": "B - A",
            "(iii)": "A - B",
            "(iv)": "A ∩ B"
        },
        "answer": "D",
        "explanation": "Bước 1: Áp dụng định nghĩa của phép hiệu đối xứng: \\(X \\oplus Y = (X \\cup Y) - (X \\cap Y)\\).\\nỞ đây đặt \\(X = A\\) và \\(Y = A \\cap B\\).\\nBước 2: Vì \\(A \\cap B \\subseteq A\\), ta có:\\n- \\(A \\cup (A \\cap B) = A\\)\\n- \\(A \\cap (A \\cap B) = A \\cap B\\)\\nDo đó:\\n\\[ A \\oplus (A \\cap B) = A - (A \\cap B) = A - B \\]\\nKhẳng định (iii) là \\(A - B\\), tương ứng với lựa chọn D.",
        "chapter": "Ch2_BasicStructures",
        "difficulty": "easy",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_016_results.json"
    },
    {
        "id": 637,
        "question": "Có bao nhiêu phép đổi chỗ (swaps) được thực hiện khi sắp xếp danh sách \\([4, 2, 3, 1]\\) theo thứ tự tăng dần bằng thuật toán sắp xếp nổi bọt (Bubble Sort)?",
        "options": [
            "A. 4",
            "B. 5",
            "C. 6",
            "D. 3"
        ],
        "answer": "B",
        "explanation": "Bước 1: Trong thuật toán Bubble Sort, mỗi phép đổi chỗ giải quyết chính xác một nghịch thế (inversion) trong mảng.\\nBước 2: Đếm số cặp nghịch thế \\((a_i, a_j)\\) với \\(i < j\\) và \\(a_i > a_j\\) trong mảng \\([4, 2, 3, 1]\\):\\n- Phần tử 4 tạo 3 cặp: \\((4, 2), (4, 3), (4, 1)\\)\\n- Phần tử 2 tạo 1 cặp: \\((2, 1)\\)\\n- Phần tử 3 tạo 1 cặp: \\((3, 1)\\)\\nTổng số nghịch thế là \\(3 + 1 + 1 = 5\\). Do đó thuật toán thực hiện chính xác 5 phép đổi chỗ. Chọn B.",
        "chapter": "Ch3_Algorithms",
        "difficulty": "easy",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_016_results.json"
    },
    {
        "id": 638,
        "question": "Khi chứng minh bằng quy nạp mạnh rằng: \"Mọi số bưu phí từ 8 xu trở lên đều có thể tạo thành từ các tem 3 xu và 5 xu\", thứ tự đúng của 4 bước chứng minh sau đây là gì?\\n1. Chỉ ra rằng nếu \\(P(k)\\) đúng thì \\(P(k+1)\\) cũng đúng bằng cách biểu diễn bưu phí \\(k+1\\) xu thông qua bưu phí \\(k-2\\) xu cộng thêm 1 tem 3 xu.\\n2. Giả sử quy nạp rằng \\(P(j)\\) đúng với mọi \\(8 \\le j \\le k\\).\\n3. Kiểm tra các trường hợp cơ sở: 8 xu (3+5), 9 xu (3+3+3), và 10 xu (5+5).\\n4. Kết luận mệnh đề đúng với mọi số nguyên \\(n \\ge 8\\).",
        "options": [
            "A. 1, 2, 3, 4",
            "B. 3, 1, 2, 4",
            "C. 2, 3, 1, 4",
            "D. 3, 2, 4, 1",
            "E. 3, 2, 1, 4"
        ],
        "answer": "E",
        "explanation": "Bước 1: Một bài toán chứng minh bằng quy nạp toán học chuẩn mực luôn bắt đầu bằng: Bước cơ sở (Base cases), tức bước 3.\\nBước 2: Tiếp theo là giả thiết quy nạp (Inductive hypothesis), tức bước 2.\\nSau đó thực hiện bước quy nạp (Inductive step) để suy ra trường hợp tiếp theo, tức bước 1.\\nCuối cùng nêu kết luận khẳng định tính đúng đắn cho mọi \\(n\\), tức bước 4.\\nThứ tự logic chính xác là 3, 2, 1, 4. Chọn đáp án E.",
        "chapter": "Ch5_Induction",
        "difficulty": "easy",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_016_results.json"
    },
    {
        "id": 639,
        "question": "Cho bảng mã tiền tố nhị phân với các từ mã:\\n\\(f: 10\\), \\(p: 110\\), \\(t: 1110\\).\\nChuỗi bit `110111010` được giải mã thành thông điệp nào?",
        "options": [
            "A. ptf",
            "B. tpf",
            "C. pft",
            "D. ttf"
        ],
        "answer": "A",
        "explanation": "Bước 1: Quét chuỗi bit từ trái qua phải để tách các từ mã hợp lệ duy nhất:\\n- 3 bit đầu là `110`, trùng với ký tự `p`. Chuỗi còn lại là `111010`.\\n- 4 bit tiếp theo là `1110`, trùng với ký tự `t`. Chuỗi còn lại là `10`.\\n- 2 bit cuối cùng là `10`, trùng với ký tự `f`.\\nBước 2: Ghép các ký tự thu được theo thứ tự: `p` + `t` + `f` = `ptf`. Chọn đáp án A.",
        "chapter": "Ch5_Induction",
        "difficulty": "easy",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_016_results.json"
    },
    {
        "id": 640,
        "question": "Có bao nhiêu phép so sánh giữa các phần tử được thực hiện khi trộn (merge) hai danh sách đã sắp xếp \\([1, 3, 5, 7, 9]\\) và \\([2, 6]\\) thành một danh sách tăng dần duy nhất?",
        "options": [
            "A. 5",
            "B. 6",
            "C. 7",
            "D. 4"
        ],
        "answer": "A",
        "explanation": "Bước 1: Mô phỏng từng phép so sánh của thuật toán trộn hai danh sách con:\\n- So sánh 1 và 2: \\(1 < 2\\), đưa 1 ra kết quả. Danh sách còn lại: \\([3, 5, 7, 9]\\) và \\([2, 6]\\). (1 phép so sánh)\\n- So sánh 3 và 2: \\(2 < 3\\), đưa 2 ra kết quả. Danh sách còn lại: \\([3, 5, 7, 9]\\) và \\([6]\\). (2 phép so sánh)\\n- So sánh 3 và 6: \\(3 < 6\\), đưa 3 ra kết quả. Danh sách còn lại: \\([5, 7, 9]\\) và \\([6]\\). (3 phép so sánh)\\n- So sánh 5 và 6: \\(5 < 6\\), đưa 5 ra kết quả. Danh sách còn lại: \\([7, 9]\\) và \\([6]\\). (4 phép so sánh)\\n- So sánh 7 và 6: \\(6 < 7\\), đưa 6 ra kết quả. (5 phép so sánh)\\nBước 2: Lúc này danh sách thứ hai đã rỗng, danh sách đầu còn lại \\([7, 9]\\) được gắn thẳng vào cuối kết quả mà không cần so sánh thêm.\\nTổng số phép so sánh là 5. Do đó chọn đáp án A.",
        "chapter": "Ch3_Algorithms",
        "difficulty": "easy",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_016_results.json"
    }
]

def main():
    # Load current questions_sample_v2.json
    with open("v2/questions_sample_v2.json", "r", encoding="utf-8") as f:
        existing_data = json.load(f)
    
    existing_ids = {q["id"] for q in existing_data}
    print(f"Existing questions before Batch {BATCH_NUMBER}: {len(existing_data)}")
    
    # Filter out any if already present, append new batch
    new_data = [q for q in existing_data if q["id"] < START_ID or q["id"] > END_ID]
    new_data.extend(batch_16_questions)
    new_data.sort(key=lambda x: x["id"])
    
    print(f"Total questions after adding Batch {BATCH_NUMBER}: {len(new_data)}")
    
    with open("v2/questions_sample_v2.json", "w", encoding="utf-8") as f:
        json.dump(new_data, f, indent=2, ensure_ascii=False)
        
    # Also update v2/questions_v2.js
    with open("v2/questions_v2.js", "w", encoding="utf-8") as f:
        f.write("// Auto-generated from v2/questions_sample_v2.json\n")
        f.write("export const sampleQuestionsV2 = ")
        json.dump(new_data, f, indent=2, ensure_ascii=False)
        f.write(";\n")
        
    print(f"Batch {BATCH_NUMBER} written successfully to JSON and JS.")

if __name__ == "__main__":
    main()
