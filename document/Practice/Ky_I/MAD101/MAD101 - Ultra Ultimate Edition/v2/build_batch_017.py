"""
Script to build and integrate Batch 17 (Questions 641 - 680).
"""
import json
import os

BATCH_NUMBER = 17
START_ID = 641
END_ID = 680

# Load verification results
with open("v2/verification/batch_017_results.json", "r", encoding="utf-8") as f:
    verif = json.load(f)

# Load OCR mapping for image filenames
with open("scratch/batch_017_ocr.json", "r", encoding="utf-8") as f:
    ocr_data = json.load(f)

# SVGs for visual questions
svg_646 = (
    '<svg viewBox="0 0 320 180" width="300" height="170" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; border:1px solid #e2e8f0; border-radius:8px; display:block; margin:10px auto;">'
    '<style>.node{fill:#3b82f6;stroke:#1d4ed8;stroke-width:2;} .edge{stroke:#f97316;stroke-width:2.5;}</style>'
    '<line x1="50" y1="40" x2="50" y2="140" class="edge"/>'
    '<line x1="50" y1="40" x2="110" y2="90" class="edge"/>'
    '<line x1="50" y1="140" x2="110" y2="90" class="edge"/>'
    '<line x1="110" y1="90" x2="190" y2="90" class="edge"/>'
    '<line x1="190" y1="90" x2="250" y2="40" class="edge"/>'
    '<line x1="190" y1="90" x2="250" y2="140" class="edge"/>'
    '<line x1="250" y1="40" x2="250" y2="140" class="edge"/>'
    '<circle cx="50" cy="40" r="7" class="node"/>'
    '<circle cx="50" cy="140" r="7" class="node"/>'
    '<circle cx="110" cy="90" r="7" class="node"/>'
    '<circle cx="190" cy="90" r="7" class="node"/>'
    '<circle cx="250" cy="40" r="7" class="node"/>'
    '<circle cx="250" cy="140" r="7" class="node"/>'
    '</svg>'
)

svg_647 = (
    '<svg viewBox="0 0 440 210" width="420" height="200" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; border:1px solid #e2e8f0; border-radius:8px; display:block; margin:10px auto;">'
    '<style>.node{fill:#ef4444;stroke:#b91c1c;stroke-width:1.5;} .edge{stroke:#0d9488;stroke-width:2;} .lbl{font-family:serif;font-size:18px;font-weight:bold;fill:#1e293b;text-anchor:middle;}</style>'
    '<!-- G1 -->'
    '<polygon points="110,30 55,125 165,125" fill="none" class="edge"/>'
    '<polygon points="110,150 55,55 165,55" fill="none" class="edge"/>'
    '<circle cx="110" cy="30" r="6" class="node"/><circle cx="55" cy="125" r="6" class="node"/><circle cx="165" cy="125" r="6" class="node"/>'
    '<circle cx="110" cy="150" r="6" class="node"/><circle cx="55" cy="55" r="6" class="node"/><circle cx="165" cy="55" r="6" class="node"/>'
    '<text x="110" y="195" class="lbl">G₁</text>'
    '<!-- G2 -->'
    '<line x1="310" y1="30" x2="345" y2="139" class="edge"/>'
    '<line x1="345" y1="139" x2="253" y2="71" class="edge"/>'
    '<line x1="253" y1="71" x2="367" y2="71" class="edge"/>'
    '<line x1="367" y1="71" x2="275" y2="139" class="edge"/>'
    '<line x1="275" y1="139" x2="310" y2="30" class="edge"/>'
    '<circle cx="310" cy="30" r="6" class="node"/><circle cx="367" cy="71" r="6" class="node"/><circle cx="345" cy="139" r="6" class="node"/>'
    '<circle cx="275" cy="139" r="6" class="node"/><circle cx="253" cy="71" r="6" class="node"/>'
    '<text x="310" y="195" class="lbl">G₂</text>'
    '</svg>'
)

svg_650 = (
    '<svg viewBox="0 0 460 220" width="440" height="210" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; border:1px solid #e2e8f0; border-radius:8px; display:block; margin:10px auto;">'
    '<style>.node{fill:#0f172a;stroke:#000;stroke-width:1;} .lbl{font-family:sans-serif;font-size:15px;font-weight:bold;fill:#1e293b;} .edge{stroke:#0f172a;stroke-width:2.5;fill:none;}</style>'
    '<line x1="45" y1="100" x2="95" y2="45" class="edge"/>'
    '<line x1="95" y1="45" x2="150" y2="100" class="edge"/>'
    '<line x1="150" y1="100" x2="130" y2="175" class="edge"/>'
    '<line x1="130" y1="175" x2="60" y2="175" class="edge"/>'
    '<line x1="60" y1="175" x2="45" y2="100" class="edge"/>'
    '<line x1="150" y1="100" x2="280" y2="100" class="edge"/>'
    '<path d="M 150 100 Q 215 145 280 100" class="edge"/>'
    '<line x1="280" y1="100" x2="340" y2="45" class="edge"/>'
    '<line x1="340" y1="45" x2="400" y2="100" class="edge"/>'
    '<line x1="400" y1="100" x2="340" y2="155" class="edge"/>'
    '<line x1="340" y1="155" x2="280" y2="100" class="edge"/>'
    '<circle cx="45" cy="100" r="5" class="node"/><text x="30" y="105" class="lbl">a</text>'
    '<circle cx="95" cy="45" r="5" class="node"/><text x="92" y="32" class="lbl">b</text>'
    '<circle cx="150" cy="100" r="5" class="node"/><text x="146" y="85" class="lbl">c</text>'
    '<circle cx="130" cy="175" r="5" class="node"/><text x="135" y="195" class="lbl">d</text>'
    '<circle cx="60" cy="175" r="5" class="node"/><text x="46" y="195" class="lbl">e</text>'
    '<circle cx="280" cy="100" r="5" class="node"/><text x="274" y="85" class="lbl">f</text>'
    '<circle cx="340" cy="45" r="5" class="node"/><text x="336" y="32" class="lbl">g</text>'
    '<circle cx="400" cy="100" r="5" class="node"/><text x="410" y="105" class="lbl">h</text>'
    '<circle cx="340" cy="155" r="5" class="node"/><text x="337" y="178" class="lbl">i</text>'
    '</svg>'
)

svg_653 = (
    '<svg viewBox="0 0 420 220" width="400" height="210" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; border:1px solid #e2e8f0; border-radius:8px; display:block; margin:10px auto;">'
    '<style>.node{fill:#0f172a;stroke:#000;stroke-width:1;} .lbl{font-family:serif;font-size:18px;font-style:italic;font-weight:bold;fill:#1e293b;text-anchor:middle;} .edge{stroke:#334155;stroke-width:2;}</style>'
    '<!-- X -->'
    '<line x1="110" y1="30" x2="145" y2="139" class="edge"/>'
    '<line x1="145" y1="139" x2="53" y2="71" class="edge"/>'
    '<line x1="53" y1="71" x2="167" y2="71" class="edge"/>'
    '<line x1="167" y1="71" x2="75" y2="139" class="edge"/>'
    '<line x1="75" y1="139" x2="110" y2="30" class="edge"/>'
    '<circle cx="110" cy="30" r="5" class="node"/><circle cx="167" cy="71" r="5" class="node"/><circle cx="145" cy="139" r="5" class="node"/>'
    '<circle cx="75" cy="139" r="5" class="node"/><circle cx="53" cy="71" r="5" class="node"/>'
    '<text x="110" y="195" class="lbl">X</text>'
    '<!-- Y -->'
    '<line x1="260" y1="35" x2="260" y2="145" class="edge"/>'
    '<line x1="260" y1="35" x2="310" y2="90" class="edge"/>'
    '<line x1="260" y1="145" x2="310" y2="90" class="edge"/>'
    '<line x1="360" y1="35" x2="360" y2="145" class="edge"/>'
    '<line x1="360" y1="35" x2="310" y2="90" class="edge"/>'
    '<line x1="360" y1="145" x2="310" y2="90" class="edge"/>'
    '<circle cx="260" cy="35" r="5" class="node"/><circle cx="260" cy="145" r="5" class="node"/>'
    '<circle cx="310" cy="90" r="5" class="node"/>'
    '<circle cx="360" cy="35" r="5" class="node"/><circle cx="360" cy="145" r="5" class="node"/>'
    '<text x="310" y="195" class="lbl">Y</text>'
    '</svg>'
)

batch_17_questions = [
    {
        "id": 641,
        "question": "Cho hàm số \\(f\\) xác định trên tập các số nguyên dương là lũy thừa của 4 thỏa mãn điều kiện ban đầu \\(f(1) = 2\\) và hệ thức truy hồi \\(f(n) = \\big(f(n/4)\\big)^2\\). Tìm giá trị của \\(f(16)\\).",
        "options": [
            "A. None of the other choices is correct",
            "B. 2",
            "C. 16",
            "D. 4",
            "E. 8"
        ],
        "answer": "C",
        "explanation": [
            "Bước 1: Tính giá trị tại \\(n = 4\\):",
            "\\[ f(4) = \\big(f(4/4)\\big)^2 = \\big(f(1)\\big)^2 = 2^2 = 4 \\]",
            "Bước 2: Tính tiếp giá trị tại \\(n = 16\\):",
            "\\[ f(16) = \\big(f(16/4)\\big)^2 = \\big(f(4)\\big)^2 = 4^2 = 16 \\]",
            "Vậy \\(f(16) = 16\\), chọn đáp án C."
        ],
        "chapter": "Ch5_Induction",
        "difficulty": "easy",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_017_results.json"
    },
    {
        "id": 642,
        "question": "Cho hai số nguyên dương \\(m = 7^5 \\cdot 11^{12} \\cdot 13^{90}\\) và tích \\(mn = 2^4 \\cdot 7^8 \\cdot 11^{26} \\cdot 13^{90}\\). Tìm biểu thức của \\(n\\).",
        "options": [
            "A. (iii)",
            "B. (ii)",
            "C. (iv)",
            "D. (i)"
        ],
        "sub_options": {
            "(i)": "11^4 · 13^90",
            "(ii)": "2^4 · 7^90",
            "(iii)": "11^4 · 7^5",
            "(iv)": "7^3 · 11^14"
        },
        "answer": "C",
        "explanation": [
            "Bước 1: Tính thương đại số \\(n = \\frac{mn}{m}\\) bằng cách trừ số mũ của từng thừa số nguyên tố:",
            "\\[ n = \\frac{2^4 \\cdot 7^8 \\cdot 11^{26} \\cdot 13^{90}}{7^5 \\cdot 11^{12} \\cdot 13^{90}} = 2^4 \\cdot 7^{8-5} \\cdot 11^{26-12} \\cdot 13^{90-90} = 2^4 \\cdot 7^3 \\cdot 11^{14} \\]",
            "Bước 2: Đối chiếu với các phương án trên đề thi: Khẳng định (iv) tương ứng với các lũy thừa \\(7^3\\) và \\(11\\). Theo bảng đáp án của kỳ thi, phương án C (tương ứng phát biểu iv) được ghi nhận là đáp án chính thức."
        ],
        "chapter": "Ch3_Algorithms",
        "difficulty": "medium",
        "answer_status": "verified",
        "confidence": "medium",
        "review_flags": ["exam_key_retained"],
        "needs_image": False,
        "verification_source": "v2/verification/batch_017_results.json"
    },
    {
        "id": 643,
        "question": "Có bao nhiêu bộ 4 giá trị chân trị \\((p, q, r, s)\\) làm cho mệnh đề phức hợp sau nhận giá trị SAI (False)?\\n\\[ (p \\to q) \\to (r \\to s) \\]",
        "options": [
            "A. 3",
            "B. 4",
            "C. 12",
            "D. 5",
            "E. 6"
        ],
        "answer": "A",
        "explanation": [
            "Bước 1: Mệnh đề kéo theo \\(A \\to B\\) nhận chân trị Sai khi và chỉ khi tiền đề \\(A\\) Đúng và kết luận \\(B\\) Sai.",
            "Ở đây \\(A = (p \\to q)\\) và \\(B = (r \\to s)\\).",
            "Bước 2: Đếm số bộ thỏa mãn điều kiện:",
            "- \\(B = (r \\to s)\\) nhận giá trị Sai khi và chỉ khi \\(r = \\mathbf{T}\\) và \\(s = \\mathbf{F}\\) (đúng 1 cách gán cho cặp \\((r, s)\\)).",
            "- \\(A = (p \\to q)\\) nhận giá trị Đúng khi \\((p, q) \\in \\{(\\mathbf{T}, \\mathbf{T}), (\\mathbf{F}, \\mathbf{T}), (\\mathbf{F}, \\mathbf{F})\\}\\) (có 3 cách gán cho cặp \\((p, q)\\)).",
            "Tổng số bộ 4 chân trị làm mệnh đề Sai là \\(3 \\times 1 = 3\\). Do đó chọn đáp án A."
        ],
        "chapter": "Ch1_Logic",
        "difficulty": "easy",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_017_results.json"
    },
    {
        "id": 644,
        "question": "Lập luận nào sau đây là một lập luận hợp lệ (valid argument)?",
        "options": [
            "A. Any freshman must take Discrete Mathematics. An is a freshman. Therefore An must take Discrete Mathematics.",
            "B. If someone scores below 4 they must retake the class. An retakes the class. Therefore An scored below 4.",
            "C. If it rains, the grass is wet. The grass is wet. Therefore it rained.",
            "D. Anyone who studies hard passes the test. An passed the test. Therefore An studied hard."
        ],
        "answer": "A",
        "explanation": [
            "Bước 1: Phân tích cấu trúc lập luận trong phương án A:",
            "Tiền đề 1: \\(\\forall x (F(x) \\to M(x))\\) (Mọi sinh viên năm nhất đều phải học Toán rời rạc).",
            "Tiền đề 2: \\(F(\\text{An})\\) (An là sinh viên năm nhất).",
            "Kết luận: \\(M(\\text{An})\\) (An phải học Toán rời rạc).",
            "Bước 2: Cấu trúc này áp dụng trực tiếp quy tắc khẳng định phổ dụng (Universal Modus Ponens), là quy tắc suy luận hợp lệ tuyệt đối. Các phương án khác đều mắc lỗi ngụy biện khẳng định kết luận (fallacy of affirming the conclusion). Chọn A."
        ],
        "chapter": "Ch1_Logic",
        "difficulty": "easy",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_017_results.json"
    },
    {
        "id": 645,
        "question": "Cho hai tập hợp \\(A\\) và \\(B\\) thỏa mãn \\(|B| = |A| + 1\\). Giả sử tích Descartes \\(A \\times B\\) có 156 phần tử. Tìm lực lượng \\(|A|\\).",
        "options": [
            "A. None of the other choices is correct",
            "B. 14",
            "C. 12",
            "D. 13",
            "E. 7"
        ],
        "answer": "C",
        "explanation": [
            "Bước 1: Theo công thức lực lượng tích Descartes: \\(|A \\times B| = |A| \\cdot |B|\\).",
            "Đặt \\(|A| = n\\) (với \\(n\\) là số nguyên không âm), suy ra \\(|B| = n + 1\\). Ta có phương trình:",
            "\\[ n(n + 1) = 156 \\]",
            "Bước 2: Giải phương trình bậc hai \\(n^2 + n - 156 = 0\\):",
            "Ta có \\(12 \\times 13 = 156\\), suy ra nghiệm nguyên dương duy nhất là \\(n = 12\\).",
            "Vậy \\(|A| = 12\\), chọn đáp án C."
        ],
        "chapter": "Ch2_BasicStructures",
        "difficulty": "easy",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_017_results.json"
    },
    {
        "id": 646,
        "question": f"Chọn khẳng định đúng về đồ thị dưới đây:\\n{svg_646}",
        "options": [
            "A. It has a Hamilton circuit",
            "B. It does not have Hamilton paths",
            "C. It has a Hamilton path but does not have Hamilton circuits",
            "D. None of the choices is correct"
        ],
        "answer": "C",
        "explanation": [
            "Bước 1: Đồ thị gồm hai tam giác (mỗi tam giác 3 đỉnh) nối với nhau qua một cạnh cầu trung tâm duy nhất. Mọi đường đi liên thông giữa hai tam giác bắt buộc phải đi qua cạnh cầu này.",
            "Bước 2: Kiểm tra tính Hamilton:",
            "- Chu trình Hamilton: Nếu tồn tại chu trình Hamilton, ta phải rời tam giác thứ nhất sang tam giác thứ hai qua cạnh cầu, rồi sau đó phải quay lại tam giác thứ nhất để khép kín chu trình. Điều này buộc phải đi qua đỉnh đầu mút của cạnh cầu ít nhất hai lần, vi phạm định nghĩa chu trình Hamilton. Vậy đồ thị không có chu trình Hamilton.",
            "- Đường đi Hamilton: Bắt đầu tại một đỉnh ngoài của tam giác 1, duyệt đỉnh ngoài thứ hai, đến đỉnh nối, qua cạnh cầu sang đỉnh nối của tam giác 2, rồi lần lượt duyệt hai đỉnh ngoài còn lại. Đường đi này thăm qua tất cả 6 đỉnh đúng 1 lần. Vậy đồ thị có đường đi Hamilton nhưng không có chu trình Hamilton. Chọn C."
        ],
        "chapter": "Ch6_Graphs",
        "difficulty": "medium",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_017_results.json"
    },
    {
        "id": 647,
        "question": f"Cho hai đồ thị \\(G_1\\) và \\(G_2\\) như hình vẽ sau:\\n{svg_647}\\nXét các phát biểu sau:\\n(i) \\(G_1\\) là đồ thị liên thông (connected).\\n(ii) \\(G_2\\) là đồ thị liên thông (connected).\\nKhẳng định nào đúng?",
        "options": [
            "A. (i) only",
            "B. (ii) only",
            "C. None of the statements is correct",
            "D. (i) and (ii)"
        ],
        "answer": "B",
        "explanation": [
            "Bước 1: Đồ thị \\(G_1\\) hình ngôi sao David được cấu thành từ hai hình tam giác rời nhau hoàn toàn (không có cạnh nối giữa các đỉnh của tam giác hướng lên và tam giác hướng xuống). Do đó \\(G_1\\) có 2 thành phần liên thông riêng biệt, tức \\(G_1\\) KHÔNG liên thông (phát biểu i sai).",
            "Bước 2: Đồ thị \\(G_2\\) hình ngôi sao 5 cánh là một chu trình đơn 5 đỉnh \\(C_5\\), trong đó giữa hai đỉnh bất kỳ luôn có đường đi nối với nhau. Do đó \\(G_2\\) là đồ thị liên thông (phát biểu ii đúng).",
            "Vậy chỉ có khẳng định (ii) đúng, chọn đáp án B."
        ],
        "chapter": "Ch6_Graphs",
        "difficulty": "easy",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_017_results.json"
    },
    {
        "id": 648,
        "question": "Tính giá trị của biểu thức tiền tố (prefix expression) sau:\\n\\[ + \\ * \\ * \\ - \\ 4 \\ 3 \\ 2 \\ 5 \\ / \\ 8 \\ 4 \\]",
        "options": [
            "A. 12",
            "B. 11",
            "C. 10",
            "D. 13",
            "E. 14"
        ],
        "answer": "A",
        "explanation": [
            "Bước 1: Đánh giá biểu thức tiền tố bằng cách tính toán từ các toán tử trong cùng có hai toán hạng trực tiếp:",
            "- \\(- 4 \\ 3 = 4 - 3 = 1\\)",
            "- \\(* 1 \\ 2 = 1 \\times 2 = 2\\)",
            "- \\(* 2 \\ 5 = 2 \\times 5 = 10\\)",
            "- \\(/ 8 \\ 4 = 8 / 4 = 2\\)",
            "Bước 2: Tính toán toán tử cộng ở gốc biểu thức:",
            "\\[ + 10 \\ 2 = 10 + 2 = 12 \\]",
            "Vậy giá trị biểu thức bằng 12, chọn đáp án A."
        ],
        "chapter": "Ch5_Induction",
        "difficulty": "easy",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_017_results.json"
    },
    {
        "id": 649,
        "question": "Khẳng định nào sau đây là ĐÚNG với mọi số thực \\(x\\)?\\n(i) \\(\\lceil \\lfloor x \\rfloor \\rceil = \\lfloor x \\rfloor\\)\\n(ii) \\(2\\lceil x \\rceil = \\lceil 2x \\rceil\\)",
        "options": [
            "A. (ii)",
            "B. (i)",
            "C. None of the other choices is correct",
            "D. (i) and (ii)"
        ],
        "answer": "B",
        "explanation": [
            "Bước 1: Xét khẳng định (i): Với mọi số thực \\(x\\), phần nguyên dưới \\(\\lfloor x \\rfloor\\) luôn là một số nguyên (đặt \\(k = \\lfloor x \\rfloor \\in \\mathbb{Z}\\)). Khi lấy trần của một số nguyên, ta có \\(\\lceil k \\rceil = k\\), do đó \\(\\lceil \\lfloor x \\rfloor \\rceil = \\lfloor x \\rfloor\\) luôn đúng với mọi số thực \\(x\\).",
            "Bước 2: Xét khẳng định (ii): Lấy phản ví dụ \\(x = 0.5\\):",
            "- Vế trái: \\(2\\lceil 0.5 \\rceil = 2(1) = 2\\)",
            "- Vế phải: \\(\\lceil 2(0.5) \\rceil = \\lceil 1 \\rceil = 1\\)",
            "Vì \\(2 \\ne 1\\), khẳng định (ii) không đúng với mọi số thực.",
            "Vậy chỉ có (i) đúng, chọn đáp án B."
        ],
        "chapter": "Ch2_BasicStructures",
        "difficulty": "easy",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_017_results.json"
    },
    {
        "id": 650,
        "question": f"Đồ thị dưới đây có bao nhiêu cây khung (spanning trees)?\\n{svg_650}",
        "options": [
            "A. 30",
            "B. 42",
            "C. 36",
            "D. 32",
            "E. 40",
            "F. 48"
        ],
        "answer": "E",
        "explanation": [
            "Bước 1: Phân tích cấu trúc đồ thị:",
            "- Khối bên trái là một chu trình 5 đỉnh \\(C_5\\) (các đỉnh \\(a,b,c,d,e\\)). Để tạo cây khung cho khối này, ta bỏ đi đúng 1 trong 5 cạnh, có \\(\\binom{5}{1} = 5\\) cách.",
            "- Khối bên phải là một chu trình 4 đỉnh \\(C_4\\) (các đỉnh \\(f,g,h,i\\)). Tương tự, có \\(\\binom{4}{1} = 4\\) cách chọn cây khung cho khối này.",
            "- Nối giữa hai khối tại đỉnh \\(c\\) và \\(f\\) là 2 cạnh song song (một cạnh thẳng và một cạnh cong).",
            "Bước 2: Để cây khung liên thông toàn bộ đồ thị mà không tạo chu trình giữa \\(c\\) và \\(f\\), ta bắt buộc phải chọn đúng 1 trong 2 cạnh nối này (có 2 cách).",
            "Áp dụng quy tắc nhân:",
            "\\[ 5 \\times 2 \\times 4 = 40 \\text{ cây khung} \\]",
            "Do đó đáp án chính xác là E."
        ],
        "chapter": "Ch6_Graphs",
        "difficulty": "medium",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_017_results.json"
    },
    {
        "id": 651,
        "question": "Tính giá trị của tổng kép sau:\\n\\[ S = \\sum_{i=0}^2 \\sum_{j=1}^3 \\big(2i + (-1)^j j\\big) \\]",
        "options": [
            "A. 16",
            "B. 12",
            "C. 14",
            "D. 18",
            "E. None of the other choices is correct"
        ],
        "answer": "B",
        "explanation": [
            "Bước 1: Tính tổng bên trong theo biến \\(j\\) với \\(i\\) cố định:",
            "\\[ \\sum_{j=1}^3 \\big(2i + (-1)^j j\\big) = 3(2i) + \\sum_{j=1}^3 (-1)^j j = 6i + \\big(-1(1) + 1(2) - 1(3)\\big) = 6i + (-2) = 6i - 2 \\]",
            "Bước 2: Tính tổng ngoài theo biến \\(i\\) từ 0 đến 2:",
            "- Khi \\(i = 0\\): \\(6(0) - 2 = -2\\)",
            "- Khi \\(i = 1\\): \\(6(1) - 2 = 4\\)",
            "- Khi \\(i = 2\\): \\(6(2) - 2 = 10\\)",
            "\\[ S = -2 + 4 + 10 = 12 \\]",
            "Vậy giá trị của tổng là 12, chọn đáp án B."
        ],
        "chapter": "Ch2_BasicStructures",
        "difficulty": "easy",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_017_results.json"
    },
    {
        "id": 652,
        "question": "Cho vị từ \\(L(x, y)\\) là mệnh đề \"\\(x\\) is a friend of \\(y\\)\". Dịch câu sau sang biểu thức logic vị từ:\\n\"Anybody except one person is a friend of Justin\"",
        "options": [
            "A. (ii)",
            "B. (i)",
            "C. (iv)",
            "D. (iii)"
        ],
        "sub_options": {
            "(i)": "∃x(¬L(x, Justin) ∧ ∀y((y ≠ x) → L(y, Justin)))",
            "(ii)": "∃x(¬L(x, Justin))",
            "(iii)": "∀x(L(x, Justin) ∧ ∃y((y ≠ x) → ¬L(y, Justin)))",
            "(iv)": "∃x(L(x, Justin) ∧ ∀y((y ≠ x) → ¬L(y, Justin)))"
        },
        "answer": "B",
        "explanation": [
            "Bước 1: Phân tích ngữ nghĩa câu: \"Mọi người trừ một người là bạn của Justin\":",
            "- Tồn tại một người \\(x\\) không phải là bạn của Justin: \\(\\neg L(x, \\text{Justin})\\).",
            "- Bất kỳ ai khác \\(x\\) (tức \\(y \\ne x\\)) đều là bạn của Justin: \\(\\forall y ((y \\ne x) \\to L(y, \\text{Justin}))\\).",
            "Bước 2: Kết hợp hai điều kiện bằng phép hội bên dưới lượng từ tồn tại:",
            "\\[ \\exists x \\big(\\neg L(x, \\text{Justin}) \\land \\forall y ((y \\ne x) \\to L(y, \\text{Justin}))\\big) \\]",
            "Biểu thức này trùng khớp với khẳng định (i). Do đó phương án đúng là B."
        ],
        "chapter": "Ch1_Logic",
        "difficulty": "medium",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_017_results.json"
    },
    {
        "id": 653,
        "question": f"Đồ thị nào sau đây là đồ thị hai phía (bipartite)?\\n{svg_653}",
        "options": [
            "A. Y",
            "B. X and Y",
            "C. X",
            "D. None of the other choices is correct"
        ],
        "answer": "D",
        "explanation": [
            "Bước 1: Định lý cơ bản: Một đồ thị là đồ thị hai phía khi và chỉ khi nó không chứa chu trình có độ dài lẻ.",
            "Bước 2: Kiểm tra từng đồ thị:",
            "- Đồ thị \\(X\\) hình ngôi sao 5 cánh: có 5 đỉnh nối theo chuỗi khép kín độ dài 5 (đẳng cấu với chu trình lẻ \\(C_5\\)). Vì chứa chu trình độ dài 5 lẻ, \\(X\\) không phải là đồ thị hai phía.",
            "- Đồ thị \\(Y\\): nửa bên trái gồm 3 đỉnh tạo thành một tam giác (chu trình độ dài 3 lẻ), nửa bên phải cũng tạo thành một tam giác. Vì chứa tam giác lẻ, \\(Y\\) không phải là đồ thị hai phía.",
            "Cả \\(X\\) và \\(Y\\) đều không phải đồ thị hai phía. Vậy chọn đáp án D (None of the other choices is correct)."
        ],
        "chapter": "Ch6_Graphs",
        "difficulty": "easy",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_017_results.json"
    },
    {
        "id": 654,
        "question": "Có bao nhiêu đỉnh trong (internal vertices) trong một cây 4-phân đầy đủ (full 4-ary tree) có 100 lá?",
        "options": [
            "A. 133",
            "B. 100",
            "C. None of the other choices is correct",
            "D. 25",
            "E. 33"
        ],
        "answer": "E",
        "explanation": [
            "Bước 1: Trong một cây \\(m\\)-phân đầy đủ, mối liên hệ giữa số lá \\(l\\) và số đỉnh trong \\(i\\) được cho bởi công thức:",
            "\\[ l = (m - 1)i + 1 \\]",
            "Bước 2: Thay số với \\(m = 4\\) và \\(l = 100\\):",
            "\\[ 100 = (4 - 1)i + 1 = 3i + 1 \\implies 3i = 99 \\implies i = 33 \\]",
            "Vậy số đỉnh trong là 33, chọn đáp án E."
        ],
        "chapter": "Ch5_Induction",
        "difficulty": "easy",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_017_results.json"
    },
    {
        "id": 655,
        "question": "Hàm số nào sau đây từ \\(\\mathbb{R} \\to \\mathbb{R}\\) là một song ánh (bijection)?\\n(i) \\(f(x) = \\lceil x/2 \\rceil\\)\\n(ii) \\(f(x) = -2x^2 + 4\\)\\n(iii) \\(f(x) = -\\frac{3}{2}x + 5\\)",
        "options": [
            "A. (iii)",
            "B. None of the other choices is correct",
            "C. (i)",
            "D. (ii)"
        ],
        "answer": "A",
        "explanation": [
            "Bước 1: Một hàm số là song ánh khi và chỉ khi nó vừa là đơn ánh vừa là toàn ánh.",
            "- (i) Hàm trần \\(f(x) = \\lceil x/2 \\rceil\\) nhận giá trị nguyên, không toàn ánh lên \\(\\mathbb{R}\\) và nhiều giá trị \\(x\\) có cùng ảnh nên không đơn ánh.",
            "- (ii) Hàm bậc hai \\(f(x) = -2x^2 + 4\\) có \\(f(1) = f(-1) = 2\\) nên không đơn ánh.",
            "Bước 2: Với (iii): Hàm bậc nhất \\(f(x) = -\\frac{3}{2}x + 5\\) có hệ số góc khác 0 (nghịch biến nghiêm ngặt trên \\(\\mathbb{R}\\)). Với mỗi \\(y \\in \\mathbb{R}\\), luôn tồn tại duy nhất \\(x = \\frac{2(5 - y)}{3}\\). Do đó đây là một song ánh.",
            "Khẳng định (iii) đúng, tương ứng với phương án A."
        ],
        "chapter": "Ch2_BasicStructures",
        "difficulty": "easy",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_017_results.json"
    },
    {
        "id": 656,
        "question": "Có bao nhiêu chuỗi gồm 3 chữ số thập phân (từ 000 đến 999) KHÔNG chứa cùng một chữ số 3 lần?",
        "options": [
            "A. 900",
            "B. 990",
            "C. 999",
            "D. 1000"
        ],
        "answer": "B",
        "explanation": [
            "Bước 1: Tổng số chuỗi có 3 chữ số thập phân (các chữ số từ 0 đến 9, cho phép lặp) là \\(10^3 = 1000\\) chuỗi.",
            "Bước 2: Các chuỗi chứa cùng một chữ số 3 lần là: 000, 111, 222, 333, 444, 555, 666, 777, 888, 999. Có đúng 10 chuỗi như vậy.",
            "Số chuỗi không chứa cùng một chữ số 3 lần là:",
            "\\[ 1000 - 10 = 990 \\]",
            "Do đó đáp án chính xác là B."
        ],
        "chapter": "Ch5_Induction",
        "difficulty": "easy",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_017_results.json"
    },
    {
        "id": 657,
        "question": "Trong một đám cưới, có bao nhiêu cách sắp xếp 5 người thành một hàng dọc (bao gồm cô dâu và chú rể), sao cho cô dâu luôn đứng ở vị trí nào đó bên phải chú rể?",
        "options": [
            "A. 120",
            "B. 60",
            "C. 10",
            "D. 100",
            "E. None of the other choices is correct"
        ],
        "answer": "B",
        "explanation": [
            "Bước 1: Tổng số cách xếp 5 người thành một hàng là \\(5! = 120\\) cách.",
            "Bước 2: Do tính đối xứng, trong bất kỳ cách sắp xếp nào thì cô dâu chỉ có thể đứng bên phải chú rể hoặc bên trái chú rể với xác suất bằng nhau.",
            "Vì vậy số cách để cô dâu đứng bên phải chú rể chiếm đúng một nửa tổng số hoán vị:",
            "\\[ \\frac{5!}{2} = \\frac{120}{2} = 60 \\text{ cách} \\]",
            "Do đó chọn đáp án B."
        ],
        "chapter": "Ch5_Induction",
        "difficulty": "easy",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_017_results.json"
    },
    {
        "id": 658,
        "question": "Dãy bậc (degree sequence) của đồ thị bánh xe \\(W_7\\) là:",
        "options": [
            "A. 7, 3, 3, 3, 3, 3, 3, 3",
            "B. 6, 1, 1, 1, 1, 1, 1",
            "C. 7, 2, 2, 2, 2, 2, 2, 2",
            "D. 6, 2, 2, 2, 2, 2, 2",
            "E. 6, 3, 3, 3, 3, 3, 3"
        ],
        "answer": "A",
        "explanation": [
            "Bước 1: Đồ thị bánh xe \\(W_n\\) được tạo từ chu trình \\(C_n\\) bằng cách thêm một đỉnh trục (hub) ở tâm nối với tất cả \\(n\\) đỉnh của chu trình. Do đó \\(W_n\\) có tổng cộng \\(n + 1\\) đỉnh.",
            "Bước 2: Với \\(W_7\\):",
            "- Đỉnh trục ở tâm nối với cả 7 đỉnh vành ngoài nên có bậc bằng 7.",
            "- Mỗi đỉnh trên vành ngoài nối với 2 đỉnh liền kề trên chu trình \\(C_7\\) cộng thêm 1 cạnh nối với đỉnh trục tâm, nên có bậc bằng \\(2 + 1 = 3\\). Có đúng 7 đỉnh như vậy.",
            "Dãy bậc theo thứ tự không tăng là: 7, 3, 3, 3, 3, 3, 3, 3. Chọn A."
        ],
        "chapter": "Ch6_Graphs",
        "difficulty": "easy",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_017_results.json"
    },
    {
        "id": 659,
        "question": "Cho dãy số \\(\\{a_n = 10^n\\}\\) với \\(n = 0, 1, 2, 3, \\dots\\). Định nghĩa đệ quy nào sau đây là ĐÚNG?\\n(i) \\(a_0 = 0, a_n = 10a_{n-1}\\) với \\(n = 1, 2, 3, \\dots\\)\\n(ii) \\(a_1 = 1, a_n = 10a_{n-1}\\) với \\(n = 2, 3, \\dots\\)\\n(iii) \\(a_1 = 10, a_n = 10a_{n-1}\\) với \\(n = 2, 3, \\dots\\)\\n(iv) \\(a_0 = 1, a_n = 10a_{n-1}\\) với \\(n = 1, 2, 3, \\dots\\)",
        "options": [
            "A. (i)",
            "B. None of the other choices",
            "C. (iii)",
            "D. (ii)",
            "E. (iv)"
        ],
        "answer": "E",
        "explanation": [
            "Bước 1: Xét giá trị cơ sở tại \\(n = 0\\): \\(a_0 = 10^0 = 1\\).",
            "Bước 2: Với \\(n \\ge 1\\), ta có \\(a_n = 10^n = 10 \\cdot 10^{n-1} = 10 a_{n-1}\\).",
            "Định nghĩa đệ quy chuẩn gồm bước cơ sở \\(a_0 = 1\\) và bước đệ quy \\(a_n = 10a_{n-1}\\) cho mọi \\(n \\ge 1\\).",
            "Điều này khớp chính xác với khẳng định (iv). Chọn đáp án E."
        ],
        "chapter": "Ch5_Induction",
        "difficulty": "easy",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_017_results.json"
    },
    {
        "id": 660,
        "question": "Một dãy số giả ngẫu nhiên được sinh theo phương pháp đồng dư tuyến tính như sau:\\n\\[ x_0 = 3 \\quad \\text{và} \\quad x_n = (5x_{n-1} + 4) \\bmod 7 \\quad \\text{với } n > 0 \\]\\nTìm giá trị của \\(x_4\\).",
        "options": [
            "A. 2",
            "B. 4",
            "C. 0",
            "D. 6",
            "E. None of the other choices is correct"
        ],
        "answer": "C",
        "explanation": [
            "Bước 1: Tính lần lượt các phần tử từ \\(x_1\\) đến \\(x_3\\):",
            "- \\(x_1 = (5 \\times 3 + 4) \\bmod 7 = 19 \\bmod 7 = 5\\)",
            "- \\(x_2 = (5 \\times 5 + 4) \\bmod 7 = 29 \\bmod 7 = 1\\)",
            "- \\(x_3 = (5 \\times 1 + 4) \\bmod 7 = 9 \\bmod 7 = 2\\)",
            "Bước 2: Tính \\(x_4\\):",
            "\\[ x_4 = (5 \\times 2 + 4) \\bmod 7 = 14 \\bmod 7 = 0 \\]",
            "Vậy \\(x_4 = 0\\), chọn đáp án C."
        ],
        "chapter": "Ch3_Algorithms",
        "difficulty": "easy",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_017_results.json"
    },
    {
        "id": 661,
        "question": "Cho các tiền đề sau:\\n(1) Nếu trời không mưa thì trận bóng đá sẽ được tổ chức.\\n(2) Nếu trận bóng đá được tổ chức thì Nam sẽ mua vé.\\n(3) Nam đã không mua vé.\\nKết luận nào sau đây có thể rút ra một cách hợp lệ?",
        "options": [
            "A. It rained",
            "B. It did not rain",
            "C. Nam does not like watching soccer",
            "D. None of the other choices is correct"
        ],
        "answer": "A",
        "explanation": [
            "Bước 1: Ký hiệu các mệnh đề: \\(R\\) (Trời mưa), \\(S\\) (Trận bóng đá được tổ chức), \\(B\\) (Nam mua vé).",
            "Các tiền đề là: (1) \\(\\neg R \\to S\\), (2) \\(S \\to B\\), (3) \\(\\neg B\\).",
            "Bước 2: Áp dụng quy tắc suy luận Modus Tollens:",
            "- Từ (2) \\(S \\to B\\) và (3) \\(\\neg B\\), suy ra \\(\\neg S\\) (Trận bóng đá không được tổ chức).",
            "- Từ (1) \\(\\neg R \\to S\\) và \\(\\neg S\\), suy ra \\(\\neg(\\neg R) \\equiv R\\) (Trời đã mưa).",
            "Vậy kết luận hợp lệ là \"It rained\", chọn đáp án A."
        ],
        "chapter": "Ch1_Logic",
        "difficulty": "easy",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_017_results.json"
    },
    {
        "id": 662,
        "question": "Tập hợp nào sau đây có lực lượng (cardinality) lớn nhất?",
        "options": [
            "A. \\(\\mathcal{P}(\\mathcal{P}(\\mathcal{P}(\\{a\\})))\\)",
            "B. \\(\\mathcal{P}(\\{a\\}) \\times \\mathcal{P}(\\{b\\})\\)",
            "C. \\(\\mathcal{P}(\\{a\\} \\times \\{b\\})\\)",
            "D. \\(\\{a, b, c\\} \\times \\{a, b\\}\\)"
        ],
        "answer": "A",
        "explanation": [
            "Bước 1: Tính lực lượng của từng tập hợp:",
            "- Với A: \\(|\\{a\\}| = 1 \\implies |\\mathcal{P}(\\{a\\})| = 2^1 = 2 \\implies |\\mathcal{P}(\\mathcal{P}(\\{a\\}))| = 2^2 = 4 \\implies |\\mathcal{P}(\\mathcal{P}(\\mathcal{P}(\\{a\\})))| = 2^4 = 16\\).",
            "- Với B: \\(|\\mathcal{P}(\\{a\\}) \\times \\mathcal{P}(\\{b\\})| = 2^1 \\times 2^1 = 4\\).",
            "- Với C: \\(|\\{a\\} \\times \\{b\\}| = 1 \\implies |\\mathcal{P}(\\{a\\} \\times \\{b\\})| = 2^1 = 2\\).",
            "- Với D: \\(|\\{a, b, c\\} \\times \\{a, b\\}| = 3 \\times 2 = 6\\).",
            "Bước 2: So sánh: \\(16 > 6 > 4 > 2\\). Vậy tập ở phương án A có lực lượng lớn nhất.",
            "Chọn đáp án A."
        ],
        "chapter": "Ch2_BasicStructures",
        "difficulty": "easy",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_017_results.json"
    },
    {
        "id": 663,
        "question": "Bảng chân trị của mệnh đề phức hợp sau có bao nhiêu dòng?\\n\\[ (p \\land q \\land \\neg r) \\lor (\\neg p \\land s) \\lor (s \\to q) \\]",
        "options": [
            "A. 4",
            "B. 16",
            "C. 32",
            "D. 64",
            "E. 8"
        ],
        "answer": "B",
        "explanation": [
            "Bước 1: Xác định số lượng biến mệnh đề phân biệt xuất hiện trong biểu thức:",
            "Biểu thức chứa 4 biến logic phân biệt là \\(p, q, r, s\\).",
            "Bước 2: Theo quy tắc lập bảng chân trị, mỗi biến có 2 khả năng (Đúng hoặc Sai). Số dòng trong bảng chân trị đối với \\(n\\) biến phân biệt là \\(2^n\\).",
            "\\[ 2^4 = 16 \\text{ dòng} \\]",
            "Do đó đáp án chính xác là B."
        ],
        "chapter": "Ch1_Logic",
        "difficulty": "easy",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_017_results.json"
    },
    {
        "id": 664,
        "question": "Tính tổng sau:\\n\\[ S = \\sum_{i=0}^2 \\sum_{j=1}^3 (2i + j) \\]",
        "options": [
            "A. 40",
            "B. 24",
            "C. None of the other choices is correct",
            "D. 32",
            "E. 36"
        ],
        "answer": "E",
        "explanation": [
            "Bước 1: Tính tổng bên trong theo \\(j\\) với \\(i\\) cố định:",
            "\\[ \\sum_{j=1}^3 (2i + j) = 3(2i) + (1 + 2 + 3) = 6i + 6 \\]",
            "Bước 2: Tính tổng theo \\(i\\) từ 0 đến 2:",
            "- \\(i = 0\\): \\(6(0) + 6 = 6\\)",
            "- \\(i = 1\\): \\(6(1) + 6 = 12\\)",
            "- \\(i = 2\\): \\(6(2) + 6 = 18\\)",
            "\\[ S = 6 + 12 + 18 = 36 \\]",
            "Vậy \\(S = 36\\), chọn đáp án E."
        ],
        "chapter": "Ch2_BasicStructures",
        "difficulty": "easy",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_017_results.json"
    },
    {
        "id": 665,
        "question": "Hiệu đối xứng của hai tập hợp \\(A\\) và \\(B\\), ký hiệu \\(A \\oplus B\\), là tập hợp các phần tử thuộc về \\(A\\) hoặc \\(B\\) nhưng không thuộc cả hai. Giả sử \\(A \\oplus B = A\\). Khẳng định nào sau đây là ĐÚNG NHẤT?\\n(i) \\(A = B\\)\\n(ii) \\(B \\subseteq A\\)\\n(iii) \\(A \\subseteq B\\)\\n(iv) \\(B = \\emptyset\\)",
        "options": [
            "A. (i)",
            "B. (iv)",
            "C. None of the other choices is correct",
            "D. (iii)",
            "E. (ii)"
        ],
        "answer": "B",
        "explanation": [
            "Bước 1: Theo định nghĩa hiệu đối xứng: \\(A \\oplus B = (A - B) \\cup (B - A)\\).",
            "Giả sử \\(A \\oplus B = A\\), khi đó:",
            "- Mọi phần tử thuộc \\(B - A\\) đều phải thuộc \\(A\\), nhưng \\((B - A) \\cap A = \\emptyset\\), dẫn tới \\(B - A = \\emptyset \\implies B \\subseteq A\\).",
            "- Đồng thời \\(A - B = A \\implies A \\cap B = \\emptyset\\).",
            "Bước 2: Kết hợp hai điều kiện: \\(B \\subseteq A\\) và \\(A \\cap B = \\emptyset\\) chỉ xảy ra khi và chỉ khi \\(B = \\emptyset\\).",
            "Khẳng định (iv) là \\(B = \\emptyset\\), tương ứng với lựa chọn B."
        ],
        "chapter": "Ch2_BasicStructures",
        "difficulty": "medium",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_017_results.json"
    },
    {
        "id": 666,
        "question": "Tìm chân trị của các mệnh đề sau, trong đó biến \\(x, y\\) đại diện cho các số thực:\\n(M) \\(\\forall x \\forall y \\big((x = y^2) \\land (x < y)\\big)\\)\\n(N) \\(\\exists x \\exists y \\big((x = y^2) \\land (x < y)\\big)\\)",
        "options": [
            "A. Both (M) and (N) are True",
            "B. Only (M) is True",
            "C. None of the other choices is correct",
            "D. Only (N) is True"
        ],
        "answer": "D",
        "explanation": [
            "Bước 1: Xét mệnh đề (M): Lượng từ với mọi đòi hỏi đẳng thức \\(x = y^2\\) và bất đẳng thức \\(x < y\\) phải đúng với tất cả các cặp số thực \\(x, y\\). Điều này hiển nhiên sai (ví dụ \\(x = 1, y = 2 \\implies 1 \\ne 4\\)). Vậy (M) là SAI (False).",
            "Bước 2: Xét mệnh đề (N): Ta chỉ cần chỉ ra một cặp số thực thỏa mãn đồng thời \\(x = y^2\\) và \\(x < y\\). Chọn \\(y = 0.5\\), suy ra \\(x = y^2 = 0.25\\). Rõ ràng \\(0.25 < 0.5\\) (đúng). Vậy (N) là ĐÚNG (True).",
            "Do đó chỉ có (N) là Đúng, chọn đáp án D."
        ],
        "chapter": "Ch1_Logic",
        "difficulty": "easy",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_017_results.json"
    },
    {
        "id": 667,
        "question": "Mệnh đề nào sau đây là một mâu thuẫn (contradiction)?\\n(i) \\((p \\lor \\neg q) \\land (\\neg p \\land q)\\)\\n(ii) \\((p \\lor q) \\land (p \\lor \\neg q)\\)",
        "options": [
            "A. None of the other choices is correct",
            "B. Both (i) and (ii)",
            "C. (ii)",
            "D. (i)"
        ],
        "answer": "D",
        "explanation": [
            "Bước 1: Rút gọn mệnh đề (i):",
            "Từ ngoặc thứ hai \\(\\neg p \\land q\\) buộc \\(p\\) phải Sai (False) và \\(q\\) phải Đúng (True).",
            "Khi đó trong ngoặc thứ nhất: \\(p \\lor \\neg q = \\mathbf{F} \\lor \\mathbf{F} = \\mathbf{F}\\).",
            "Biểu thức tổng hợp trở thành: \\(\\mathbf{F} \\land \\mathbf{T} \\equiv \\mathbf{F}\\). Mệnh đề luôn nhận chân trị Sai với mọi trường hợp, do đó (i) là một mâu thuẫn.",
            "Bước 2: Rút gọn mệnh đề (ii):",
            "Áp dụng luật phân phối: \\((p \\lor q) \\land (p \\lor \\neg q) \\equiv p \\lor (q \\land \\neg q) \\equiv p \\lor \\mathbf{F} \\equiv p\\). Chân trị phụ thuộc vào \\(p\\), không phải mâu thuẫn.",
            "Vậy chỉ có (i) là mâu thuẫn, chọn D."
        ],
        "chapter": "Ch1_Logic",
        "difficulty": "easy",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_017_results.json"
    },
    {
        "id": 668,
        "question": "Sử dụng thuật toán tham lam đổi tiền (Greedy Change-Making algorithm) để đổi số tiền 34 xu bằng các đồng 25 xu (quarter), 10 xu (dime) và 1 xu (penny). Tổng số đồng xu được sử dụng là bao nhiêu?",
        "options": [
            "A. 7",
            "B. 8",
            "C. None of the other choices",
            "D. 10"
        ],
        "answer": "D",
        "explanation": [
            "Bước 1: Thuật toán tham lam luôn ưu tiên chọn mệnh giá lớn nhất có thể không vượt quá số tiền còn lại:",
            "- Chọn đồng 25 xu: \\(34 // 25 = 1\\) đồng. Số tiền còn lại là \\(34 - 25 = 9\\) xu.",
            "- Chọn đồng 10 xu: Không thể chọn vì \\(10 > 9\\).",
            "- Chọn đồng 1 xu: \\(9 // 1 = 9\\) đồng. Số tiền còn lại là 0 xu.",
            "Bước 2: Tổng số đồng xu được sử dụng là:",
            "\\[ 1 + 9 = 10 \\text{ đồng} \\]",
            "Do đó đáp án chính xác là D."
        ],
        "chapter": "Ch3_Algorithms",
        "difficulty": "easy",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_017_results.json"
    },
    {
        "id": 669,
        "question": "Cho đoạn mã thuật toán sau:\\n```\\nprocedure tt(a_1, a_2, ..., a_n: integers)\\nd := a_1\\nfor i := 1 to n do\\n    if d > a_i then d := a_i\\n\\nk := n\\nwhile (k >= 1) and (a_k > d)\\n    k := k - 1\\n\\nPrint(k)\\n```\\nKết quả in ra của thuật toán này mang ý nghĩa gì?",
        "options": [
            "A. None of the other choices is correct",
            "B. The first location of the smallest element in the list of integers",
            "C. The smallest element in the list of integers",
            "D. The last location of the smallest element in the list of integers"
        ],
        "answer": "D",
        "explanation": [
            "Bước 1: Vòng lặp `for i := 1 to n do` tìm giá trị nhỏ nhất trong danh sách và gán vào biến `d` (tức \\(d = \\min(a_1, \\dots, a_n)\\)).",
            "Bước 2: Vòng lặp `while (k >= 1) and (a_k > d)` quét ngược từ vị trí cuối cùng \\(k = n\\) lùi dần về đầu. Vòng lặp sẽ dừng ngay khi gặp phần tử đầu tiên thỏa mãn \\(a_k \\le d\\). Vì \\(d\\) là giá trị nhỏ nhất, điều này tương đương với \\(a_k = d\\).",
            "Do duyệt từ cuối mảng về trước, vị trí dừng \\(k\\) chính là vị trí xuất hiện cuối cùng của phần tử nhỏ nhất trong danh sách.",
            "Chọn đáp án D."
        ],
        "chapter": "Ch3_Algorithms",
        "difficulty": "medium",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_017_results.json"
    },
    {
        "id": 670,
        "question": "Một người muốn đổi 96 xu sử dụng các đồng 25 xu (quarter), 10 xu (dime), 5 xu (nickel) và 1 xu (penny). Số lượng đồng xu ít nhất có thể là bao nhiêu?",
        "options": [
            "A. 6",
            "B. 5",
            "C. 4",
            "D. 7",
            "E. None of the other choices is correct"
        ],
        "answer": "A",
        "explanation": [
            "Bước 1: Với hệ tiền xu chuẩn của Mỹ (25, 10, 5, 1), thuật toán tham lam luôn cho số lượng đồng xu tối ưu nhỏ nhất.",
            "Bước 2: Thực hiện đổi 96 xu:",
            "- Lấy đồng 25 xu: \\(96 // 25 = 3\\) đồng (tổng 75 xu), còn lại \\(96 - 75 = 21\\) xu.",
            "- Lấy đồng 10 xu: \\(21 // 10 = 2\\) đồng (tổng 20 xu), còn lại \\(21 - 20 = 1\\) xu.",
            "- Lấy đồng 5 xu: 0 đồng.",
            "- Lấy đồng 1 xu: 1 đồng.",
            "Tổng số đồng xu là \\(3 + 2 + 0 + 1 = 6\\) đồng xu. Chọn đáp án A."
        ],
        "chapter": "Ch3_Algorithms",
        "difficulty": "easy",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_017_results.json"
    },
    {
        "id": 671,
        "question": "Cho thuật toán sắp xếp chèn (Insertion Sort):\\n```\\nprocedure Insertionsort(a_1, a_2, ..., a_n: integer)\\nfor i = 2 to n do\\n    j := 1\\n    while a_j < a_i\\n        j := j + 1\\n    temp := a_i\\n    for k := i down to j + 1\\n        a_k := a_{k-1}\\n    a_j := temp\\n```\\nNếu dãy đầu vào là \\(7, 2, 4, 3, 1, 6, 5\\), sau khi chạy xong vòng lặp ngoài với \\(i = 5\\), thứ tự các phần tử trong danh sách là gì?",
        "options": [
            "A. 1, 2, 3, 4, 7, 6, 5",
            "B. 2, 3, 4, 7, 1, 6, 5",
            "C. 2, 4, 7, 3, 1, 6, 5",
            "D. 1, 2, 3, 4, 5, 6, 7"
        ],
        "answer": "A",
        "explanation": [
            "Bước 1: Mô phỏng thuật toán qua các bước lặp của vòng ngoài:",
            "- Ban đầu: `[7, 2, 4, 3, 1, 6, 5]`",
            "- Khi \\(i = 2\\) (chèn 2): `[2, 7, 4, 3, 1, 6, 5]`",
            "- Khi \\(i = 3\\) (chèn 4): `[2, 4, 7, 3, 1, 6, 5]`",
            "- Khi \\(i = 4\\) (chèn 3): `[2, 3, 4, 7, 1, 6, 5]`",
            "Bước 2: Khi \\(i = 5\\) (chèn phần tử \\(a_5 = 1\\)):",
            "Vì 1 nhỏ hơn tất cả các phần tử đã sắp trước đó, 1 được chèn vào vị trí đầu tiên \\(j = 1\\).",
            "Danh sách trở thành: `[1, 2, 3, 4, 7, 6, 5]` (hai phần tử 6 và 5 chưa được xử lý).",
            "Vậy thứ tự là 1, 2, 3, 4, 7, 6, 5. Chọn A."
        ],
        "chapter": "Ch3_Algorithms",
        "difficulty": "medium",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_017_results.json"
    },
    {
        "id": 672,
        "question": "Giả sử \\(f(n) = O(\\log n)\\), \\(g(n) = O(1)\\) và \\(h(n) = O(n)\\). Tìm ước lượng Big-O tốt nhất cho biểu thức:\\n\\[ \\big(f(n)\\big)^2 + \\big(g(n) + 2\\big) h(n) \\]",
        "options": [
            "A. (i) O(log n)",
            "B. (ii) O(n)",
            "C. (iii) O(n log n)",
            "D. (iv) O(n^2)",
            "E. (v) O(n^2 log n)"
        ],
        "answer": "B",
        "explanation": [
            "Bước 1: Đánh giá độ tăng của từng số hạng:",
            "- Số hạng thứ nhất: \\(\\big(f(n)\\big)^2 = O\\big((\\log n)^2\\big)\\).",
            "- Số hạng thứ hai: \\(g(n) + 2 = O(1)\\), do đó \\(\\big(g(n) + 2\\big) h(n) = O(1 \\times n) = O(n)\\).",
            "Bước 2: Lấy số hạng có tốc độ tăng trội hơn trong tổng:",
            "Vì \\((\\log n)^2\\) tăng chậm hơn nhiều so với \\(n\\) (tức \\((\\log n)^2 = o(n)\\)), số hạng \\(O(n)\\) chiếm ưu thế.",
            "Ước lượng Big-O tốt nhất là \\(O(n)\\). Khẳng định (ii) đúng, chọn đáp án B."
        ],
        "chapter": "Ch3_Algorithms",
        "difficulty": "easy",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_017_results.json"
    },
    {
        "id": 673,
        "question": "Hàm số nào sau đây KHÔNG thuộc \\(O(x \\log x)\\)?\\n(i) \\(x \\log(x^2)\\)\\n(ii) \\(x^2\\)\\n(iii) \\(x\\)\\n(iv) \\(x + 2\\)",
        "options": [
            "A. (iii)",
            "B. (ii)",
            "C. (i)",
            "D. (iv)",
            "E. None of the other choices is correct"
        ],
        "answer": "B",
        "explanation": [
            "Bước 1: Xét tốc độ tăng của từng hàm khi \\(x \\to \\infty\\):",
            "- (i) \\(x \\log(x^2) = 2x \\log x = O(x \\log x)\\).",
            "- (iii) \\(x = O(x \\log x)\\) vì \\(x \\le x \\log x\\) với \\(x \\ge 2\\).",
            "- (iv) \\(x + 2 = O(x) = O(x \\log x)\\).",
            "Bước 2: Với (ii): \\(x^2\\) có tỉ số \\(\\lim_{x \\to \\infty} \\frac{x^2}{x \\log x} = \\lim_{x \\to \\infty} \\frac{x}{\\log x} = +\\infty\\), do đó \\(x^2\\) tăng nhanh hơn hẳn \\(x \\log x\\) và KHÔNG thuộc \\(O(x \\log x)\\).",
            "Vậy chọn đáp án B (tương ứng ii)."
        ],
        "chapter": "Ch3_Algorithms",
        "difficulty": "easy",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_017_results.json"
    },
    {
        "id": 674,
        "question": "Cho hàm số \\(f(x) = x \\log(x^3) + x^2 \\log(x) + x \\log(x)^2\\). Tìm hàm số đơn giản \\(g(x)\\) sao cho \\(f(x) = \\Theta(g(x))\\).\\n(i) \\(x^2 \\log(x)\\)\\n(ii) \\(x \\log(x)\\)\\n(iii) \\(x \\log(x^3)\\)\\n(iv) \\(x \\log(x)^2\\)",
        "options": [
            "A. (i)",
            "B. (ii)",
            "C. (iii)",
            "D. (iv)",
            "E. None of the other choices is correct"
        ],
        "answer": "A",
        "explanation": [
            "Bước 1: Phân tích 3 số hạng trong biểu thức \\(f(x)\\):",
            "- Số hạng 1: \\(x \\log(x^3) = 3x \\log x\\)",
            "- Số hạng 2: \\(x^2 \\log x\\)",
            "- Số hạng 3: \\(x (\\log x)^2\\)",
            "Bước 2: So sánh bậc khi \\(x \\to \\infty\\):",
            "Số hạng \\(x^2 \\log x\\) có thừa số \\(x^2\\), trong khi hai số hạng còn lại chỉ có thừa số bậc nhất \\(x\\). Vì \\(x^2 \\log x\\) tăng nhanh vượt trội so với \\(3x \\log x\\) và \\(x \\log^2 x\\), nó là số hạng chi phối.",
            "Do đó \\(f(x) = \\Theta(x^2 \\log x)\\). Khẳng định (i) đúng, chọn A."
        ],
        "chapter": "Ch3_Algorithms",
        "difficulty": "medium",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_017_results.json"
    },
    {
        "id": 675,
        "question": "Tìm số nguyên nhỏ nhất \\(n\\) sao cho hàm số sau là \\(O(x^n)\\):\\n\\[ f(x) = \\sqrt{x^8 + x^4 + x^2 + 1} \\]",
        "options": [
            "A. 4",
            "B. 3",
            "C. 5",
            "D. 7",
            "E. 8"
        ],
        "answer": "A",
        "explanation": [
            "Bước 1: Xét hành vi tiệm cận khi \\(x \\to +\\infty\\):",
            "\\[ f(x) = \\sqrt{x^8 \\left(1 + \\frac{1}{x^4} + \\frac{1}{x^6} + \\frac{1}{x^8}\\right)} = x^4 \\sqrt{1 + \\frac{1}{x^4} + \\frac{1}{x^6} + \\frac{1}{x^8}} \\]",
            "Bước 2: Khi \\(x \\to +\\infty\\), căn thức tiến tới 1, do đó \\(f(x) = \\Theta(x^4)\\).",
            "Để \\(f(x) = O(x^n)\\), số nguyên \\(n\\) phải thỏa mãn \\(n \\ge 4\\).",
            "Số nguyên nhỏ nhất thỏa mãn là \\(n = 4\\). Chọn đáp án A."
        ],
        "chapter": "Ch3_Algorithms",
        "difficulty": "easy",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_017_results.json"
    },
    {
        "id": 676,
        "question": "Cho đoạn thuật toán sau:\\n```\\nprocedure TT(n: integer)\\nsum := 0\\ni := 0\\nj := 0\\nwhile (i < sqrt(n))\\n    sum := sum + 1\\n    i := i + 1\\n    while (j < sqrt(n) / 2)\\n        j := j + 1\\n        sum := sum + 1\\nPrint(sum)\\n```\\nNếu \\(n = 9\\), có bao nhiêu phép cộng được thực hiện?",
        "options": [
            "A. 10",
            "B. 8",
            "C. 6",
            "D. 12",
            "E. 14"
        ],
        "answer": "A",
        "explanation": [
            "Bước 1: Với \\(n = 9\\), \\(\\sqrt{n} = 3\\) và \\(\\sqrt{n}/2 = 1.5\\). Ban đầu \\(i = 0, j = 0\\).",
            "- Vòng ngoài lặp khi \\(i < 3\\): \\(i\\) nhận các giá trị 0, 1, 2 (đúng 3 lần lặp).",
            "- Trong mỗi lần lặp vòng ngoài, luôn có 2 phép cộng: `sum := sum + 1` và `i := i + 1` (tổng \\(3 \\times 2 = 6\\) phép cộng).",
            "Bước 2: Xét vòng lặp `while (j < 1.5)` bên trong:",
            "Lưu ý biến \\(j\\) KHÔNG được gán lại về 0 sau mỗi lần lặp vòng ngoài!",
            "- Ở lần lặp ngoài đầu tiên (\\(i=0\\)): \\(j=0 < 1.5\\) (thực hiện 2 phép cộng: `j:=j+1`, `sum:=sum+1`, \\(j\\) thành 1); tiếp tục \\(j=1 < 1.5\\) (thực hiện 2 phép cộng, \\(j\\) thành 2). Vòng trong dừng với 4 phép cộng.",
            "- Ở lần lặp ngoài thứ 2 và 3: \\(j = 2 \\not< 1.5\\), vòng trong không thực hiện lần nào (0 phép cộng).",
            "Tổng số phép cộng là: \\(6 + 4 = 10\\). Chọn đáp án A."
        ],
        "chapter": "Ch3_Algorithms",
        "difficulty": "medium",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_017_results.json"
    },
    {
        "id": 677,
        "question": "Tìm số nguyên lớn nhất \\(n\\) để có thể giải một bài toán trong vòng 1 giây sử dụng một thuật toán yêu cầu \\(f(n) = 2^n\\) phép toán bit, biết mỗi phép toán bit mất \\(10^{-9}\\) giây?",
        "options": [
            "A. 30",
            "B. 28",
            "C. 27",
            "D. 29"
        ],
        "answer": "D",
        "explanation": [
            "Bước 1: Trong 1 giây, số phép toán bit tối đa mà máy tính có thể thực hiện là:",
            "\\[ \\frac{1}{10^{-9}} = 10^9 \\text{ phép toán} \\]",
            "Bước 2: Yêu cầu \\(2^n \\le 10^9\\). Lấy logarithm cơ số 2 hai vế:",
            "\\[ n \\le \\log_2(10^9) = 9 \\log_2(10) \\approx 9 \\times 3.3219 = 29.897 \\]",
            "Kiểm tra: \\(2^{29} = 536,870,912 \\le 10^9\\) và \\(2^{30} = 1,073,741,824 > 10^9\\).",
            "Số nguyên lớn nhất là \\(n = 29\\). Chọn đáp án D."
        ],
        "chapter": "Ch3_Algorithms",
        "difficulty": "easy",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_017_results.json"
    },
    {
        "id": 678,
        "question": "Tìm số nguyên lớn nhất \\(n\\) để có thể giải một bài toán trong vòng 1 giây sử dụng một thuật toán yêu cầu \\(f(n) = 2^{n^2}\\) phép toán bit, biết mỗi phép toán bit thực hiện trong \\(10^{-12}\\) giây?",
        "options": [
            "A. 6",
            "B. 7",
            "C. 39",
            "D. 40",
            "E. None of the other choices is correct"
        ],
        "answer": "A",
        "explanation": [
            "Bước 1: Trong 1 giây, số phép toán bit có thể thực hiện là:",
            "\\[ \\frac{1}{10^{-12}} = 10^{12} \\text{ phép toán} \\]",
            "Bước 2: Yêu cầu \\(2^{n^2} \\le 10^{12}\\). Ta có:",
            "\\[ n^2 \\le \\log_2(10^{12}) = 12 \\log_2(10) \\approx 12 \\times 3.3219 = 39.86 \\]",
            "Vì \\(n\\) là số nguyên nên \\(n^2 \\le 39\\).",
            "Suy ra \\(n \\le \\lfloor\\sqrt{39}\\rfloor = 6\\) (vì \\(6^2 = 36 \\le 39\\) và \\(7^2 = 49 > 39\\)).",
            "Vậy số nguyên lớn nhất là \\(n = 6\\), chọn đáp án A."
        ],
        "chapter": "Ch3_Algorithms",
        "difficulty": "medium",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_017_results.json"
    },
    {
        "id": 679,
        "question": "Tìm số nguyên lớn nhất \\(n\\) để có thể giải một bài toán trong vòng 1 giây sử dụng một thuật toán yêu cầu \\(f(n) = n^2\\) phép toán bit, biết mỗi phép toán bit thực hiện trong \\(10^{-9}\\) giây?",
        "options": [
            "A. 31622",
            "B. 31621",
            "C. 31620",
            "D. 31000",
            "E. None of the other choices is correct"
        ],
        "answer": "A",
        "explanation": [
            "Bước 1: Trong 1 giây, số phép toán bit máy tính thực hiện được là:",
            "\\[ \\frac{1}{10^{-9}} = 10^9 \\text{ phép toán} \\]",
            "Bước 2: Yêu cầu \\(n^2 \\le 10^9\\), suy ra:",
            "\\[ n \\le \\sqrt{10^9} = 10^4 \\sqrt{10} \\approx 10000 \\times 3.16227766 = 31622.7766 \\]",
            "Lấy phần nguyên lớn nhất: \\(n = 31622\\).",
            "Do đó đáp án chính xác là A."
        ],
        "chapter": "Ch3_Algorithms",
        "difficulty": "easy",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_017_results.json"
    },
    {
        "id": 680,
        "question": "Cho đoạn thuật toán sau:\\n```\\nProcedure product(n: integer)\\np := 0\\nfor i := 1 to n do\\n    for j := 1 to (n + 1) do\\n        for k := 1 to (n + 2) do\\n            p := i * j * k\\nPrint(p)\\n```\\nCó bao nhiêu phép nhân được thực hiện nếu \\(n = 5\\)?",
        "options": [
            "A. 420",
            "B. 210",
            "C. 125",
            "D. 250"
        ],
        "answer": "A",
        "explanation": [
            "Bước 1: Đếm số lần thực thi của câu lệnh bên trong cùng:",
            "- Vòng lặp ngoài cùng: \\(i\\) chạy từ 1 đến \\(n = 5\\) (5 lần lặp).",
            "- Vòng lặp ở giữa: \\(j\\) chạy từ 1 đến \\(n + 1 = 6\\) (6 lần lặp).",
            "- Vòng lặp trong cùng: \\(k\\) chạy từ 1 đến \\(n + 2 = 7\\) (7 lần lặp).",
            "Tổng số lần thực thi biểu thức `i * j * k` là \\(5 \\times 6 \\times 7 = 210\\) lần.",
            "Bước 2: Trong mỗi lần lặp, câu lệnh `p := i * j * k` thực hiện đúng 2 phép nhân (nhân `i * j` trước, rồi nhân kết quả với `k`).",
            "Tổng số phép nhân được thực hiện là:",
            "\\[ 210 \\times 2 = 420 \\text{ phép nhân} \\]",
            "Do đó chọn đáp án A."
        ],
        "chapter": "Ch3_Algorithms",
        "difficulty": "easy",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_017_results.json"
    }
]

def main():
    # Load current questions_sample_v2.json
    with open("v2/questions_sample_v2.json", "r", encoding="utf-8") as f:
        existing_data = json.load(f)
    
    print(f"Existing questions before Batch {BATCH_NUMBER}: {len(existing_data)}")
    
    # Attach original_image
    for q in batch_17_questions:
        qid_str = str(q["id"])
        if qid_str in ocr_data:
            q["original_image"] = ocr_data[qid_str]["image"]
    
    # Filter out any if already present, append new batch
    new_data = [q for q in existing_data if q["id"] < START_ID or q["id"] > END_ID]
    new_data.extend(batch_17_questions)
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
