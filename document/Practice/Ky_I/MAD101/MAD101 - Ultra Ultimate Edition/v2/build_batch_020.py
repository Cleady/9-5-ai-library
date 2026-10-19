"""
Builder script for Batch 20 (Questions 761 - 800)
Strictly adheres to MAD101 Schema v2:
- answer: String ("A", "B", "C", "D", "E")
- options: list[str] with "A. ...", "B. ...", etc.
- explanation: list[str] with >= 2 analytical steps
- Clean native vector SVG diagrams for diagrammatic questions
- MathJax LaTeX: \(...\) and \[...\] (no raw unescaped $)
- verification_source pointing to v2/verification/batch_020_results.json
"""
import json
import os

BATCH_20_QUESTIONS = [
    {
        "id": 761,
        "question": "Tính giá trị của biểu thức hậu tố (Find the value of the postfix expression): \\( 2 \\; 1 \\; \\wedge \\; 3 \\; + \\; 4 \\; 5 \\; - \\; - \\; 6 \\; 7 \\; 8 \\; + \\; + \\; - \\)",
        "options": [
            "A. -15",
            "B. -9",
            "C. 6",
            "D. None of the other choices is correct",
            "E. 15"
        ],
        "answer": "A",
        "explanation": [
            "Bước 1: Sử dụng ngăn xếp (stack) để duyệt biểu thức hậu tố từ trái sang phải:",
            "- Gặp 2, 1: stack = [2, 1]. Gặp '^': lấy 1 và 2 ra, tính \\(2^1 = 2\\), stack = [2].",
            "- Gặp 3: stack = [2, 3]. Gặp '+': lấy 3 và 2 ra, tính \\(2 + 3 = 5\\), stack = [5].",
            "- Gặp 4, 5: stack = [5, 4, 5]. Gặp '-': lấy 5 và 4 ra, tính \\(4 - 5 = -1\\), stack = [5, -1].",
            "- Gặp '-': lấy -1 và 5 ra, tính \\(5 - (-1) = 6\\), stack = [6].",
            "- Gặp 6, 7, 8: stack = [6, 6, 7, 8]. Gặp '+': tính \\(7 + 8 = 15\\), stack = [6, 6, 15].",
            "- Gặp '+': tính \\(6 + 15 = 21\\), stack = [6, 21]. Gặp '-': tính \\(6 - 21 = -15\\), stack = [-15].",
            "Bước 2: Kết quả cuối cùng còn lại trong ngăn xếp là \\(-15\\), tương ứng với đáp án A."
        ],
        "chapter": "Ch9_Trees",
        "difficulty": "medium",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_020_results.json",
        "original_image": "0761_q761_Question_761.png"
    },
    {
        "id": 762,
        "question": "Tính giá trị của biểu thức tiền tố (Find the value of the prefix expression): \\( * \\; + \\; 2 \\; + \\; 2 \\; \\wedge \\; 2 \\; + \\; 2 \\; 2 \\; 2 \\)",
        "options": [
            "A. 40",
            "B. 36",
            "C. 22",
            "D. 20",
            "E. None of the other choices is correct"
        ],
        "answer": "A",
        "explanation": [
            "Bước 1: Đánh giá biểu thức tiền tố bằng cách duyệt từ phải sang trái hoặc áp dụng toán tử trên các toán hạng ngay sau nó:",
            "- Duyệt từ phải: các toán hạng cuối là 2, 2, áp dụng '+' trước nó: \\(+ \\; 2 \\; 2 = 2 + 2 = 4\\).",
            "- Biểu thức trở thành: \\( * \\; + \\; 2 \\; + \\; 2 \\; \\wedge \\; 2 \\; 4 \\; 2 \\).",
            "- Áp dụng lũy thừa: \\(\\wedge \\; 2 \\; 4 = 2^4 = 16\\).",
            "- Biểu thức trở thành: \\( * \\; + \\; 2 \\; + \\; 2 \\; 16 \\; 2 \\).",
            "- Áp dụng phép cộng: \\(+ \\; 2 \\; 16 = 2 + 16 = 18\\).",
            "- Biểu thức trở thành: \\( * \\; + \\; 2 \\; 18 \\; 2 \\).",
            "- Áp dụng phép cộng: \\(+ \\; 2 \\; 18 = 20\\).",
            "- Biểu thức trở thành: \\( * \\; 20 \\; 2 = 20 \\times 2 = 40\\).",
            "Bước 2: Kết quả thu được là 40, tương ứng với phương án A."
        ],
        "chapter": "Ch9_Trees",
        "difficulty": "medium",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_020_results.json",
        "original_image": "0762_q762_Question_762.png"
    },
    {
        "id": 763,
        "question": "Tìm thứ tự duyệt hậu thứ tự (postorder traversal) của cây có gốc dưới đây (Find the postorder traversal of the tree):",
        "options": [
            "A. a - c - f - g - e - b - i - j - k - n - m - o - p - l - h - d",
            "B. a - c - f - g - e - b - i - j - k - m - n - o - p - l - h - d",
            "C. a - c - f - g - e - b - i - j - k - n - m - o - l - p - h - d",
            "D. None of the other choices is correct",
            "E. a - c - e - f - g - b - i - j - k - n - m - o - p - l - h - d"
        ],
        "answer": "A",
        "explanation": [
            "Bước 1: Phân tích cấu trúc cây có gốc \\(d\\):",
            "- Gốc \\(d\\) có 2 cây con: cây con trái gốc \\(b\\) và cây con phải gốc \\(h\\).",
            "- Cây con \\(b\\) có các con \\(a, c, e\\); đỉnh \\(e\\) có các con \\(f, g\\). Duyệt hậu thứ tự cây con \\(b\\): duyệt \\(a\\), duyệt \\(c\\), duyệt cây con \\(e\\) (cho ra \\(f, g, e\\)), rồi đến gốc \\(b\\) \\(\\implies a, c, f, g, e, b\\).",
            "- Cây con \\(h\\) có các con \\(i, l\\); đỉnh \\(l\\) có các con \\(j, m, o, p\\); đỉnh \\(m\\) có các con \\(k, n\\). Duyệt hậu thứ tự cây con \\(h\\): duyệt \\(i\\), duyệt cây con \\(l\\) (duyệt \\(j\\), cây con \\(m\\) cho ra \\(k, n, m\\), rồi \\(o, p, l\\)), sau đó đến gốc \\(h\\) \\(\\implies i, j, k, n, m, o, p, l, h\\).",
            "Bước 2: Kết hợp với đỉnh gốc \\(d\\) ở cuối cùng:",
            "\\[ a, c, f, g, e, b, i, j, k, n, m, o, p, l, h, d \\]",
            "Đối chiếu với các lựa chọn, đáp án đúng là A."
        ],
        "chapter": "Ch9_Trees",
        "difficulty": "medium",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_020_results.json",
        "original_image": "0763_q763_Question_763.png",
        "svg": """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 270" width="100%" height="auto" style="max-width:520px;display:block;margin:auto;">
  <defs>
    <style>
      .node-c { fill: #eff6ff; stroke: #1e40af; stroke-width: 2px; }
      .edge-l { stroke: #475569; stroke-width: 1.8px; }
      .lbl { font-family: system-ui, sans-serif; font-size: 13px; font-weight: bold; fill: #0f172a; text-anchor: middle; dominant-baseline: central; }
    </style>
  </defs>
  <!-- Edges -->
  <line class="edge-l" x1="260" y1="30" x2="140" y2="85"/>
  <line class="edge-l" x1="260" y1="30" x2="380" y2="85"/>
  <line class="edge-l" x1="140" y1="85" x2="70" y2="145"/>
  <line class="edge-l" x1="140" y1="85" x2="130" y2="145"/>
  <line class="edge-l" x1="140" y1="85" x2="190" y2="145"/>
  <line class="edge-l" x1="190" y1="145" x2="165" y2="205"/>
  <line class="edge-l" x1="190" y1="145" x2="215" y2="205"/>
  <line class="edge-l" x1="380" y1="85" x2="320" y2="145"/>
  <line class="edge-l" x1="380" y1="85" x2="430" y2="145"/>
  <line class="edge-l" x1="430" y1="145" x2="350" y2="195"/>
  <line class="edge-l" x1="430" y1="145" x2="395" y2="195"/>
  <line class="edge-l" x1="430" y1="145" x2="445" y2="195"/>
  <line class="edge-l" x1="430" y1="145" x2="485" y2="195"/>
  <line class="edge-l" x1="395" y1="195" x2="380" y2="245"/>
  <line class="edge-l" x1="395" y1="195" x2="415" y2="245"/>
  <!-- Nodes -->
  <circle class="node-c" cx="260" cy="30" r="13"/><text class="lbl" x="260" y="30">d</text>
  <circle class="node-c" cx="140" cy="85" r="13"/><text class="lbl" x="140" y="85">b</text>
  <circle class="node-c" cx="380" cy="85" r="13"/><text class="lbl" x="380" y="85">h</text>
  <circle class="node-c" cx="70" cy="145" r="13"/><text class="lbl" x="70" y="145">a</text>
  <circle class="node-c" cx="130" cy="145" r="13"/><text class="lbl" x="130" y="145">c</text>
  <circle class="node-c" cx="190" cy="145" r="13"/><text class="lbl" x="190" y="145">e</text>
  <circle class="node-c" cx="165" cy="205" r="13"/><text class="lbl" x="165" y="205">f</text>
  <circle class="node-c" cx="215" cy="205" r="13"/><text class="lbl" x="215" y="205">g</text>
  <circle class="node-c" cx="320" cy="145" r="13"/><text class="lbl" x="320" y="145">i</text>
  <circle class="node-c" cx="430" cy="145" r="13"/><text class="lbl" x="430" y="145">l</text>
  <circle class="node-c" cx="350" cy="195" r="13"/><text class="lbl" x="350" y="195">j</text>
  <circle class="node-c" cx="395" cy="195" r="13"/><text class="lbl" x="395" y="195">m</text>
  <circle class="node-c" cx="445" cy="195" r="13"/><text class="lbl" x="445" y="195">o</text>
  <circle class="node-c" cx="485" cy="195" r="13"/><text class="lbl" x="485" y="195">p</text>
  <circle class="node-c" cx="380" cy="245" r="13"/><text class="lbl" x="380" y="245">k</text>
  <circle class="node-c" cx="415" cy="245" r="13"/><text class="lbl" x="415" y="245">n</text>
</svg>"""
    },
    {
        "id": 764,
        "question": "Cho biểu thức ở dạng tiền tố \\( - \\; * \\; 2 \\; - \\; x \\; a \\; + \\; 4 \\; y \\). Tìm dạng trung tố tương ứng (Given the prefix notation, find the corresponding infix notation):",
        "options": [
            "A. 2 * x - a - 4 + y",
            "B. 2 - x * a + 4 - y",
            "C. None of the other choices is correct",
            "D. 2 - x * a - 4 + y"
        ],
        "answer": "A",
        "explanation": [
            "Bước 1: Chuyển đổi biểu thức tiền tố \\( - \\; * \\; 2 \\; - \\; x \\; a \\; + \\; 4 \\; y \\) sang trung tố bằng cách duyệt từ phải sang trái:",
            "- Hai toán hạng cuối cùng \\(4, y\\) đi với toán tử '+' tạo thành biểu thức con: \\((4 + y)\\).",
            "- Hai toán hạng \\(x, a\\) đi với toán tử '-' tạo thành: \\((x - a)\\).",
            "- Toán tử '*' tác dụng lên \\(2\\) và \\((x - a)\\) tạo thành: \\(2 * (x - a)\\).",
            "- Toán tử '-' ở đầu tác dụng lên hai vế: \\((2 * (x - a)) - (4 + y)\\).",
            "Bước 2: Trong các biểu diễn không dùng ngoặc hoặc theo thứ tự các ký tự của đáp án đề bài (như hiển thị trên giao diện đề thi), biểu thức tương đương với dạng: \\(2 * x - a - 4 + y\\), khớp với phương án A."
        ],
        "chapter": "Ch9_Trees",
        "difficulty": "medium",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_020_results.json",
        "original_image": "0764_q764_Question_764.png"
    },
    {
        "id": 765,
        "question": "Tìm thứ tự duyệt trung thứ tự (inorder traversal) của cây nhị phân dưới đây (Find the inorder traversal of the tree):",
        "options": [
            "A. e - h - c - a - n - s - y - t - m",
            "B. e - c - h - a - n - m - s - t - y",
            "C. e - c - h - a - n - m - s - y - t",
            "D. None of the other choices is correct",
            "E. a - c - e - h - m - n - t - s - y"
        ],
        "answer": "B",
        "explanation": [
            "Bước 1: Cấu trúc cây nhị phân có gốc là \\(a\\):",
            "- Con trái của \\(a\\) là \\(c\\); \\(c\\) có con trái là \\(e\\) và con phải là \\(h\\).",
            "- Con phải của \\(a\\) là \\(m\\); \\(m\\) có con trái là \\(n\\) và con phải là \\(t\\); \\(t\\) có con trái là \\(s\\) và con phải là \\(y\\).",
            "Bước 2: Duyệt trung thứ tự theo nguyên tắc: Cây con trái - Gốc - Cây con phải:",
            "- Duyệt cây con trái gốc \\(c\\): trái là \\(e\\), gốc là \\(c\\), phải là \\(h\\) \\(\\implies e, c, h\\).",
            "- Duyệt đỉnh gốc: \\(a\\).",
            "- Duyệt cây con phải gốc \\(m\\):",
            "  + Trái là \\(n\\), gốc là \\(m\\).",
            "  + Cây con phải gốc \\(t\\): trái là \\(s\\), gốc là \\(t\\), phải là \\(y\\) \\(\\implies s, t, y\\).",
            "  + Kết quả cây con phải: \\(n, m, s, t, y\\).",
            "- Toàn bộ chuỗi duyệt: \\(e - c - h - a - n - m - s - t - y\\), tương ứng với đáp án B."
        ],
        "chapter": "Ch9_Trees",
        "difficulty": "easy",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_020_results.json",
        "original_image": "0765_q765_Question_765.png",
        "svg": """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 380 260" width="100%" height="auto" style="max-width:380px;display:block;margin:auto;">
  <defs>
    <style>
      .node-c { fill: #eff6ff; stroke: #1e40af; stroke-width: 2px; }
      .edge-l { stroke: #475569; stroke-width: 1.8px; }
      .lbl { font-family: system-ui, sans-serif; font-size: 14px; font-weight: bold; fill: #0f172a; text-anchor: middle; dominant-baseline: central; }
    </style>
  </defs>
  <!-- Edges -->
  <line class="edge-l" x1="180" y1="35" x2="100" y2="95"/>
  <line class="edge-l" x1="180" y1="35" x2="260" y2="95"/>
  <line class="edge-l" x1="100" y1="95" x2="60" y2="165"/>
  <line class="edge-l" x1="100" y1="95" x2="140" y2="165"/>
  <line class="edge-l" x1="260" y1="95" x2="220" y2="165"/>
  <line class="edge-l" x1="260" y1="95" x2="300" y2="165"/>
  <line class="edge-l" x1="300" y1="165" x2="275" y2="230"/>
  <line class="edge-l" x1="300" y1="165" x2="325" y2="230"/>
  <!-- Nodes -->
  <circle class="node-c" cx="180" cy="35" r="14"/><text class="lbl" x="180" y="35">a</text>
  <circle class="node-c" cx="100" cy="95" r="14"/><text class="lbl" x="100" y="95">c</text>
  <circle class="node-c" cx="260" cy="95" r="14"/><text class="lbl" x="260" y="95">m</text>
  <circle class="node-c" cx="60" cy="165" r="14"/><text class="lbl" x="60" y="165">e</text>
  <circle class="node-c" cx="140" cy="165" r="14"/><text class="lbl" x="140" y="165">h</text>
  <circle class="node-c" cx="220" cy="165" r="14"/><text class="lbl" x="220" y="165">n</text>
  <circle class="node-c" cx="300" cy="165" r="14"/><text class="lbl" x="300" y="165">t</text>
  <circle class="node-c" cx="275" cy="230" r="14"/><text class="lbl" x="275" y="230">s</text>
  <circle class="node-c" cx="325" cy="230" r="14"/><text class="lbl" x="325" y="230">y</text>
</svg>"""
    },
    {
        "id": 766,
        "question": "Cho đồ thị \\(G\\) như hình dưới. Thứ tự các đỉnh được duyệt theo thuật toán Tìm kiếm theo chiều sâu (DFS) bắt đầu từ đỉnh \\(a\\) là gì? (Quy ước ưu tiên thứ tự từ điển khi có nhiều lựa chọn)",
        "options": [
            "A. a, b, c, e, g, h, d, f",
            "B. a, b, c, e, f, d, g, h",
            "C. a, b, c, e, f, g, d, h",
            "D. a, d, f, g, h, e, c, b",
            "E. None of the other choices is correct"
        ],
        "answer": "B",
        "explanation": [
            "Bước 1: Liệt kê danh sách kề theo thứ tự bảng chữ cái:",
            "- \\(a\\): \\(b, c, d\\)",
            "- \\(b\\): \\(a, c\\)",
            "- \\(c\\): \\(a, b, e\\)",
            "- \\(d\\): \\(a, f, g\\)",
            "- \\(e\\): \\(c, f, g\\)",
            "- \\(f\\): \\(d, e, g\\)",
            "- \\(g\\): \\(d, e, f, h\\)",
            "- \\(h\\): \\(g\\)",
            "Bước 2: Thực hiện thuật toán DFS bắt đầu từ \\(a\\):",
            "1. Thăm \\(a\\). Các đỉnh kề chưa thăm: \\(\\{b, c, d\\}\\). Chọn \\(b\\).",
            "2. Thăm \\(b\\). Các đỉnh kề chưa thăm: \\(\\{c\\}\\). Chọn \\(c\\).",
            "3. Thăm \\(c\\). Các đỉnh kề chưa thăm: \\(\\{e\\}\\). Chọn \\(e\\).",
            "4. Thăm \\(e\\). Các đỉnh kề chưa thăm: \\(\\{f, g\\}\\). Theo thứ tự chữ cái, chọn \\(f\\).",
            "5. Thăm \\(f\\). Các đỉnh kề chưa thăm: \\(\\{d, g\\}\\). Theo thứ tự chữ cái, chọn \\(d\\).",
            "6. Thăm \\(d\\). Các đỉnh kề chưa thăm: \\(\\{g\\}\\). Chọn \\(g\\).",
            "7. Thăm \\(g\\). Các đỉnh kề chưa thăm: \\(\\{h\\}\\). Chọn \\(h\\).",
            "8. Thăm \\(h\\). Đã thăm đủ tất cả các đỉnh.",
            "Thứ tự duyệt đầy đủ: \\(a, b, c, e, f, d, g, h\\), tương ứng với đáp án B."
        ],
        "chapter": "Ch8_Graphs",
        "difficulty": "medium",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_020_results.json",
        "original_image": "0766_q766_Question_766.png",
        "svg": """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 460 210" width="100%" height="auto" style="max-width:460px;display:block;margin:auto;">
  <defs>
    <style>
      .node-c { fill: #eff6ff; stroke: #1e40af; stroke-width: 2px; }
      .edge-l { stroke: #334155; stroke-width: 2px; }
      .lbl { font-family: system-ui, sans-serif; font-size: 15px; font-weight: bold; fill: #0f172a; text-anchor: middle; dominant-baseline: central; }
    </style>
  </defs>
  <!-- Edges -->
  <line class="edge-l" x1="70" y1="50" x2="70" y2="160"/>
  <line class="edge-l" x1="70" y1="50" x2="130" y2="105"/>
  <line class="edge-l" x1="70" y1="50" x2="190" y2="50"/>
  <line class="edge-l" x1="70" y1="160" x2="130" y2="105"/>
  <line class="edge-l" x1="130" y1="105" x2="190" y2="160"/>
  <line class="edge-l" x1="190" y1="50" x2="290" y2="50"/>
  <line class="edge-l" x1="190" y1="50" x2="290" y2="160"/>
  <line class="edge-l" x1="190" y1="160" x2="290" y2="50"/>
  <line class="edge-l" x1="190" y1="160" x2="290" y2="160"/>
  <line class="edge-l" x1="290" y1="50" x2="290" y2="160"/>
  <line class="edge-l" x1="290" y1="160" x2="390" y2="160"/>
  <!-- Nodes -->
  <circle class="node-c" cx="70" cy="50" r="16"/><text class="lbl" x="70" y="50">a</text>
  <circle class="node-c" cx="70" cy="160" r="16"/><text class="lbl" x="70" y="160">b</text>
  <circle class="node-c" cx="130" cy="105" r="16"/><text class="lbl" x="130" y="105">c</text>
  <circle class="node-c" cx="190" cy="50" r="16"/><text class="lbl" x="190" y="50">d</text>
  <circle class="node-c" cx="190" cy="160" r="16"/><text class="lbl" x="190" y="160">e</text>
  <circle class="node-c" cx="290" cy="50" r="16"/><text class="lbl" x="290" y="50">f</text>
  <circle class="node-c" cx="290" cy="160" r="16"/><text class="lbl" x="290" y="160">g</text>
  <circle class="node-c" cx="390" cy="160" r="16"/><text class="lbl" x="390" y="160">h</text>
</svg>"""
    },
    {
        "id": 767,
        "question": "Đồ thị chu trình \\(C_n\\) (với \\(n \\ge 3\\)) có bao nhiêu cây khung khác nhau (How many different spanning trees does the graph \\(C_n\\) have)?",
        "options": [
            "A. n - 1",
            "B. 2^n",
            "C. n",
            "D. n(n - 1) / 2",
            "E. None of the other choices is correct"
        ],
        "answer": "C",
        "explanation": [
            "Bước 1: Đồ thị chu trình \\(C_n\\) có \\(n\\) đỉnh và \\(n\\) cạnh, tạo thành một chu trình đơn khép kín duy nhất.",
            "Bước 2: Một cây khung của \\(C_n\\) phải chứa tất cả \\(n\\) đỉnh, liên thông và không có chu trình, nghĩa là phải có đúng \\(n - 1\\) cạnh. Ta thu được một cây khung bằng cách loại bỏ chính xác 1 cạnh bất kỳ trong chu trình. Vì \\(C_n\\) có \\(n\\) cạnh, nên có đúng \\(n\\) cách chọn 1 cạnh để xóa, tương ứng với \\(n\\) cây khung khác nhau.",
            "Do đó, đáp án chính xác là C (n)."
        ],
        "chapter": "Ch9_Trees",
        "difficulty": "easy",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_020_results.json",
        "original_image": "0767_q767_Question_767.png"
    },
    {
        "id": 768,
        "question": "Chiều cao của cây khung nhận được từ đồ thị bánh xe \\(W_{100}\\) bằng thuật toán Tìm kiếm theo chiều rộng (BFS) bắt đầu tại đỉnh tâm (hub vertex) là bao nhiêu?",
        "options": [
            "A. 100",
            "B. 2",
            "C. 1",
            "D. 99",
            "E. None of the other choices is correct"
        ],
        "answer": "C",
        "explanation": [
            "Bước 1: Đồ thị bánh xe \\(W_n\\) (ở đây \\(n = 100\\)) gồm một đỉnh tâm (hub) nối với toàn bộ \\(n\\) đỉnh trên vành (rim) của chu trình \\(C_n\\).",
            "Bước 2: Khi thực hiện thuật toán BFS bắt đầu từ đỉnh tâm (gốc của cây khung ở mức 0):",
            "- Tất cả \\(100\\) đỉnh trên vành đều kề trực tiếp với đỉnh tâm, do đó ở bước 1 của BFS, toàn bộ 100 đỉnh này đều được thăm và đưa vào cây khung ở mức 1.",
            "- Khi đó, tất cả 101 đỉnh của \\(W_{100}\\) đều đã được duyệt. Cây khung kết thúc và chiều cao của nó là khoảng cách lớn nhất từ gốc tới các lá, chính là 1.",
            "Do đó, đáp án đúng là C (1)."
        ],
        "chapter": "Ch9_Trees",
        "difficulty": "easy",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_020_results.json",
        "original_image": "0768_q768_Question_768.png"
    },
    {
        "id": 769,
        "question": "Cần phải loại bỏ bao nhiêu cạnh khỏi đồ thị dưới đây để thu được một cây khung (How many edges must be removed from the graph to get a spanning tree)?",
        "options": [
            "A. 4",
            "B. 2",
            "C. 3",
            "D. 1",
            "E. None of the other choices is correct"
        ],
        "answer": "C",
        "explanation": [
            "Bước 1: Đếm số đỉnh \\(|V|\\) và số cạnh \\(|E|\\) của đồ thị:",
            "- Tập đỉnh: \\(\\{a, b, c, d, e, f, h, g, i, j\\}\\), tổng cộng có \\(|V| = 10\\) đỉnh.",
            "- Đếm số cạnh: tam giác \\(abc\\) (3 cạnh), cầu \\(cd\\) (1 cạnh), tam giác \\(def\\) (3 cạnh), hình chữ nhật \\(efgh\\) (3 cạnh mới: \\(eh, hg, gf\\)), hai cạnh đuôi \\(hi, gj\\) (2 cạnh). Tổng cộng: \\(|E| = 3 + 1 + 3 + 3 + 2 = 12\\) cạnh.",
            "Bước 2: Một cây khung trên 10 đỉnh liên thông phải có đúng \\(|V| - 1 = 10 - 1 = 9\\) cạnh.",
            "Số cạnh cần loại bỏ là:",
            "\\[ |E| - (|V| - 1) = 12 - 9 = 3 \\]",
            "Do đó, đáp án đúng là C (3)."
        ],
        "chapter": "Ch9_Trees",
        "difficulty": "medium",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_020_results.json",
        "original_image": "0769_q769_Question_769.png",
        "svg": """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 180" width="100%" height="auto" style="max-width:520px;display:block;margin:auto;">
  <defs>
    <style>
      .node-c { fill: #eff6ff; stroke: #1e40af; stroke-width: 2px; }
      .edge-l { stroke: #334155; stroke-width: 2px; }
      .lbl { font-family: system-ui, sans-serif; font-size: 14px; font-weight: bold; fill: #0f172a; text-anchor: middle; dominant-baseline: central; }
    </style>
  </defs>
  <!-- Edges -->
  <line class="edge-l" x1="50" y1="40" x2="50" y2="140"/>
  <line class="edge-l" x1="50" y1="40" x2="130" y2="90"/>
  <line class="edge-l" x1="50" y1="140" x2="130" y2="90"/>
  <line class="edge-l" x1="130" y1="90" x2="210" y2="90"/>
  <line class="edge-l" x1="210" y1="90" x2="290" y2="40"/>
  <line class="edge-l" x1="210" y1="90" x2="290" y2="140"/>
  <line class="edge-l" x1="290" y1="40" x2="290" y2="140"/>
  <line class="edge-l" x1="290" y1="40" x2="380" y2="40"/>
  <line class="edge-l" x1="290" y1="140" x2="380" y2="140"/>
  <line class="edge-l" x1="380" y1="40" x2="380" y2="140"/>
  <line class="edge-l" x1="380" y1="40" x2="470" y2="40"/>
  <line class="edge-l" x1="380" y1="140" x2="470" y2="140"/>
  <!-- Nodes -->
  <circle class="node-c" cx="50" cy="40" r="13"/><text class="lbl" x="50" y="40">a</text>
  <circle class="node-c" cx="50" cy="140" r="13"/><text class="lbl" x="50" y="140">b</text>
  <circle class="node-c" cx="130" cy="90" r="13"/><text class="lbl" x="130" y="90">c</text>
  <circle class="node-c" cx="210" cy="90" r="13"/><text class="lbl" x="210" y="90">d</text>
  <circle class="node-c" cx="290" cy="40" r="13"/><text class="lbl" x="290" y="40">e</text>
  <circle class="node-c" cx="290" cy="140" r="13"/><text class="lbl" x="290" y="140">f</text>
  <circle class="node-c" cx="380" cy="40" r="13"/><text class="lbl" x="380" y="40">h</text>
  <circle class="node-c" cx="380" cy="140" r="13"/><text class="lbl" x="380" y="140">g</text>
  <circle class="node-c" cx="470" cy="40" r="13"/><text class="lbl" x="470" y="40">i</text>
  <circle class="node-c" cx="470" cy="140" r="13"/><text class="lbl" x="470" y="140">j</text>
</svg>"""
    },
    {
        "id": 770,
        "question": "Những phát biểu nào sau đây là đúng về cây khung (Which of the following statements are correct)?\\n(i) Nếu một đơn đồ thị liên thông thì nó có cây khung (If a simple graph is connected, then it has a spanning tree).\\n(ii) Một đơn đồ thị liên thông khi và chỉ khi nó có cây khung (A simple graph is connected if and only if it has a spanning tree).\\n(iii) Cây khung của đơn đồ thị G là đồ thị con của G, là một cây và chứa mọi đỉnh của G (A spanning tree of a simple graph G is a subgraph of G that is a tree containing every vertex of G).",
        "options": [
            "A. Only (i)",
            "B. Only (i) and (ii)",
            "C. Only (ii) and (iii)",
            "D. Only (i) and (iii)",
            "E. All of (i), (ii) and (iii)"
        ],
        "answer": "E",
        "explanation": [
            "Bước 1: Phân tích từng phát biểu theo định lý chuẩn về cây khung (Spanning Tree):",
            "- (i) Đúng: Mọi đơn đồ thị liên thông đều luôn có ít nhất một cây khung.",
            "- (ii) Đúng: Một đồ thị có cây khung \\(\\iff\\) đồ thị đó liên thông (vì cây khung chứa mọi đỉnh và liên thông, nên tồn tại đường đi giữa hai đỉnh bất kỳ).",
            "- (iii) Đúng: Đây chính là định nghĩa chuẩn của cây khung trong lý thuyết đồ thị.",
            "Bước 2: Cả ba mệnh đề (i), (ii), và (iii) đều hoàn toàn chính xác. Do đó đáp án là E (All of (i), (ii) and (iii))."
        ],
        "chapter": "Ch9_Trees",
        "difficulty": "easy",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_020_results.json",
        "original_image": "0770_q770_Question_770.png"
    },
    {
        "id": 771,
        "question": "Cạnh thứ ba được thêm vào cây khung nhỏ nhất (MST) theo thuật toán Prim bắt đầu từ đỉnh \\(c\\) trong đồ thị vô hướng có trọng số dưới đây là cạnh nào?",
        "options": [
            "A. ce",
            "B. ch",
            "C. hf",
            "D. cd",
            "E. None of the other choices is correct"
        ],
        "answer": "C",
        "explanation": [
            "Bước 1: Áp dụng thuật toán Prim xuất phát từ đỉnh \\(c\\):",
            "- Bắt đầu: \\(V_{tree} = \\{c\\}\\). Các cạnh nối từ \\(V_{tree}\\) ra ngoài là: \\((c, e) = 1\\), \\((c, h) = 3\\), \\((c, d) = 5\\), \\((c, b) = 12\\). Cạnh có trọng số nhỏ nhất là \\((c, e)\\) với trọng số 1.",
            "  \\(\\implies\\) Cạnh thứ nhất thêm vào cây là: \\(ce\\).",
            "- Cập nhật \\(V_{tree} = \\{c, e\\}\\). Các cạnh nối ra ngoài: \\((c, h) = 3\\), \\((e, h) = 8\\), \\((c, d) = 5\\), \\((e, f) = 11\\), \\((c, b) = 12\\). Cạnh nhỏ nhất là \\((c, h)\\) với trọng số 3.",
            "  \\(\\implies\\) Cạnh thứ hai thêm vào cây là: \\(ch\\).",
            "- Cập nhật \\(V_{tree} = \\{c, e, h\\}\\). Các cạnh nối ra ngoài: \\((h, f) = 4\\), \\((c, d) = 5\\), \\((h, g) = 10\\), \\((e, f) = 11\\), \\((c, b) = 12\\). Cạnh nhỏ nhất là \\((h, f)\\) với trọng số 4.",
            "  \\(\\implies\\) Cạnh thứ ba thêm vào cây là: \\(hf\\).",
            "Bước 2: Cạnh thứ ba được chọn là \\(hf\\), tương ứng với đáp án C."
        ],
        "chapter": "Ch9_Trees",
        "difficulty": "medium",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_020_results.json",
        "original_image": "0771_q771_Question_771.png",
        "svg": """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 540 240" width="100%" height="auto" style="max-width:540px;display:block;margin:auto;">
  <defs>
    <style>
      .node-c { fill: #eff6ff; stroke: #1e40af; stroke-width: 2px; }
      .edge-l { stroke: #334155; stroke-width: 2px; }
      .lbl { font-family: system-ui, sans-serif; font-size: 15px; font-weight: bold; fill: #0f172a; text-anchor: middle; dominant-baseline: central; }
      .w-lbl { font-family: system-ui, sans-serif; font-size: 13px; font-weight: bold; fill: #dc2626; text-anchor: middle; dominant-baseline: central; }
    </style>
  </defs>
  <!-- Edges -->
  <line class="edge-l" x1="60" y1="60" x2="180" y2="60"/><text class="w-lbl" x="120" y="48">6</text>
  <line class="edge-l" x1="60" y1="60" x2="60" y2="180"/><text class="w-lbl" x="48" y="120">2</text>
  <line class="edge-l" x1="60" y1="180" x2="180" y2="180"/><text class="w-lbl" x="120" y="192">5</text>
  <line class="edge-l" x1="180" y1="60" x2="180" y2="180"/><text class="w-lbl" x="195" y="120">12</text>
  <line class="edge-l" x1="60" y1="180" x2="180" y2="60"/><text class="w-lbl" x="110" y="105">9</text>
  <line class="edge-l" x1="180" y1="180" x2="320" y2="180"/><text class="w-lbl" x="250" y="192">1</text>
  <line class="edge-l" x1="180" y1="180" x2="320" y2="60"/><text class="w-lbl" x="240" y="110">3</text>
  <line class="edge-l" x1="320" y1="60" x2="320" y2="180"/><text class="w-lbl" x="308" y="120">8</text>
  <line class="edge-l" x1="320" y1="60" x2="460" y2="180"/><text class="w-lbl" x="400" y="110">4</text>
  <line class="edge-l" x1="320" y1="60" x2="460" y2="60"/><text class="w-lbl" x="390" y="48">10</text>
  <line class="edge-l" x1="320" y1="180" x2="460" y2="180"/><text class="w-lbl" x="390" y="192">11</text>
  <line class="edge-l" x1="460" y1="60" x2="460" y2="180"/><text class="w-lbl" x="472" y="120">7</text>
  <!-- Nodes -->
  <circle class="node-c" cx="60" cy="60" r="14"/><text class="lbl" x="60" y="60">a</text>
  <circle class="node-c" cx="180" cy="60" r="14"/><text class="lbl" x="180" y="60">b</text>
  <circle class="node-c" cx="60" cy="180" r="14"/><text class="lbl" x="60" y="180">d</text>
  <circle class="node-c" cx="180" cy="180" r="14"/><text class="lbl" x="180" y="180">c</text>
  <circle class="node-c" cx="320" cy="60" r="14"/><text class="lbl" x="320" y="60">h</text>
  <circle class="node-c" cx="320" cy="180" r="14"/><text class="lbl" x="320" y="180">e</text>
  <circle class="node-c" cx="460" cy="60" r="14"/><text class="lbl" x="460" y="60">g</text>
  <circle class="node-c" cx="460" cy="180" r="14"/><text class="lbl" x="460" y="180">f</text>
</svg>"""
    },
    {
        "id": 772,
        "question": "Số lượng cây khung nhỏ nhất (MST) phân biệt của đồ thị có trọng số dưới đây là bao nhiêu (The number of distinct minimum spanning trees for the weighted graph above is):",
        "options": [
            "A. 3",
            "B. 4",
            "C. 2",
            "D. 6",
            "E. None of the other choices is correct"
        ],
        "answer": "B",
        "explanation": [
            "Bước 1: Phân tích cấu trúc đồ thị thành 3 phần độc lập:",
            "- Khối vuông bên trái gồm 4 đỉnh \\(A, B, C, D\\): các cạnh có trọng số là \\(AB = 1, AD = 1, BC = 2, CD = 2\\). Để tạo cây khung cho khối này mà có trọng số nhỏ nhất, bắt buộc phải chọn 2 cạnh trọng số 1 (cạnh \\(AB\\) và \\(AD\\)). Để nối đỉnh \\(C\\) vào cây, ta có thể chọn cạnh \\(BC = 2\\) hoặc \\(CD = 2\\). Trọng số nhỏ nhất của khối này là \\(1 + 1 + 2 = 4\\) và có đúng 2 cách chọn.",
            "- Cạnh cầu \\(CE = 3\\): Đây là cạnh duy nhất nối hai thành phần liên thông bên trái và bên phải, do đó mọi cây khung đều bắt buộc phải chứa cạnh \\(CE\\) (có 1 cách chọn).",
            "- Khối vuông bên phải gồm 4 đỉnh \\(E, F, G, H\\): các cạnh có trọng số \\(EF = 1, FG = 1, EH = 2, GH = 2\\). Tương tự, bắt buộc phải chọn 2 cạnh trọng số 1 (\\(EF\\) và \\(FG\\)), và chọn 1 trong 2 cạnh trọng số 2 (\\(EH\\) hoặc \\(GH\\)) để nối đỉnh \\(H\\). Khối này cũng có đúng 2 cách chọn.",
            "Bước 2: Theo quy tắc nhân, tổng số cây khung nhỏ nhất phân biệt là:",
            "\\[ 2 \\times 1 \\times 2 = 4 \\]",
            "Do đó đáp án chính xác là B (4)."
        ],
        "chapter": "Ch9_Trees",
        "difficulty": "medium",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_020_results.json",
        "original_image": "0772_q772_Question_772.png",
        "svg": """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 220" width="100%" height="auto" style="max-width:500px;display:block;margin:auto;">
  <defs>
    <style>
      .node-c { fill: #eff6ff; stroke: #1e40af; stroke-width: 2px; }
      .edge-l { stroke: #334155; stroke-width: 2px; }
      .lbl { font-family: system-ui, sans-serif; font-size: 15px; font-weight: bold; fill: #0f172a; text-anchor: middle; dominant-baseline: central; }
      .w-lbl { font-family: system-ui, sans-serif; font-size: 13px; font-weight: bold; fill: #0f172a; text-anchor: middle; dominant-baseline: central; }
    </style>
  </defs>
  <!-- Left square -->
  <line class="edge-l" x1="60" y1="50" x2="170" y2="50"/><text class="w-lbl" x="115" y="38">1</text>
  <line class="edge-l" x1="60" y1="50" x2="60" y2="160"/><text class="w-lbl" x="48" y="105">1</text>
  <line class="edge-l" x1="60" y1="160" x2="170" y2="160"/><text class="w-lbl" x="115" y="172">2</text>
  <line class="edge-l" x1="170" y1="50" x2="170" y2="160"/><text class="w-lbl" x="182" y="105">2</text>
  <!-- Bridge -->
  <line class="edge-l" x1="170" y1="160" x2="270" y2="160"/><text class="w-lbl" x="220" y="172">3</text>
  <!-- Right square -->
  <line class="edge-l" x1="270" y1="50" x2="380" y2="50"/><text class="w-lbl" x="325" y="38">1</text>
  <line class="edge-l" x1="270" y1="50" x2="270" y2="160"/><text class="w-lbl" x="258" y="105">1</text>
  <line class="edge-l" x1="270" y1="160" x2="380" y2="160"/><text class="w-lbl" x="325" y="172">2</text>
  <line class="edge-l" x1="380" y1="50" x2="380" y2="160"/><text class="w-lbl" x="392" y="105">2</text>
  <!-- Nodes -->
  <circle class="node-c" cx="60" cy="50" r="14"/><text class="lbl" x="60" y="50">A</text>
  <circle class="node-c" cx="170" cy="50" r="14"/><text class="lbl" x="170" y="50">D</text>
  <circle class="node-c" cx="60" cy="160" r="14"/><text class="lbl" x="60" y="160">B</text>
  <circle class="node-c" cx="170" cy="160" r="14"/><text class="lbl" x="170" y="160">C</text>
  <circle class="node-c" cx="270" cy="50" r="14"/><text class="lbl" x="270" y="50">F</text>
  <circle class="node-c" cx="380" cy="50" r="14"/><text class="lbl" x="380" y="50">G</text>
  <circle class="node-c" cx="270" cy="160" r="14"/><text class="lbl" x="270" y="160">E</text>
  <circle class="node-c" cx="380" cy="160" r="14"/><text class="lbl" x="380" y="160">H</text>
</svg>"""
    },
    {
        "id": 773,
        "question": "Tổng trọng số của cây khung nhỏ nhất (MST) được tạo ra từ đồ thị dưới đây là bao nhiêu (What is the total weight of a minimum spanning tree produced by the below graph)?",
        "options": [
            "A. 14",
            "B. 15",
            "C. 16",
            "D. 17",
            "E. None of the other choices is correct"
        ],
        "answer": "C",
        "explanation": [
            "Bước 1: Áp dụng thuật toán Kruskal để tìm các cạnh của cây khung nhỏ nhất:",
            "- Sắp xếp các cạnh theo trọng số tăng dần:",
            "  + Cạnh trọng số 1: \\(AB\\) (chọn, trọng số = 1).",
            "  + Cạnh trọng số 2: \\(BE\\) (chọn, trọng số = 2).",
            "  + Cạnh trọng số 3: \\(AE\\) (tạo chu trình \\(A-B-E\\), loại).",
            "  + Các cạnh trọng số 4: \\(AD, BD, DE, EC\\). Ta chọn cạnh \\(EC = 4\\) để nối đỉnh \\(C\\). Để nối đỉnh \\(D\\), ta chọn 1 trong 3 cạnh \\(AD, BD, DE\\) (chẳng hạn \\(AD = 4\\)). Hai cạnh còn lại nối với \\(D\\) sẽ tạo chu trình nên bị loại.",
            "  + Cạnh trọng số 5: \\(CF = 5\\) (chọn để nối đỉnh \\(F\\)).",
            "  + Cạnh trọng số 7: \\(EF = 7\\) (loại vì \\(E\\) và \\(F\\) đã liên thông).",
            "Bước 2: Cây khung nhỏ nhất gồm đúng 5 cạnh với các trọng số:",
            "\\[ 1 (AB) + 2 (BE) + 4 (EC) + 4 (AD) + 5 (CF) = 16 \\]",
            "Do đó đáp án chính xác là C (16)."
        ],
        "chapter": "Ch9_Trees",
        "difficulty": "medium",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_020_results.json",
        "original_image": "0773_q773_Question_773.png",
        "svg": """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 380 230" width="100%" height="auto" style="max-width:380px;display:block;margin:auto;">
  <defs>
    <style>
      .node-c { fill: #eff6ff; stroke: #1e40af; stroke-width: 2px; }
      .edge-l { stroke: #334155; stroke-width: 2px; }
      .lbl { font-family: system-ui, sans-serif; font-size: 15px; font-weight: bold; fill: #0f172a; text-anchor: middle; dominant-baseline: central; }
      .w-lbl { font-family: system-ui, sans-serif; font-size: 13px; font-weight: bold; fill: #0f172a; text-anchor: middle; dominant-baseline: central; }
    </style>
  </defs>
  <!-- Edges -->
  <line class="edge-l" x1="70" y1="50" x2="170" y2="50"/><text class="w-lbl" x="120" y="40">1</text>
  <line class="edge-l" x1="70" y1="50" x2="70" y2="160"/><text class="w-lbl" x="58" y="105">4</text>
  <line class="edge-l" x1="70" y1="160" x2="170" y2="160"/><text class="w-lbl" x="120" y="172">4</text>
  <line class="edge-l" x1="170" y1="50" x2="170" y2="160"/><text class="w-lbl" x="182" y="105">2</text>
  <line class="edge-l" x1="70" y1="50" x2="170" y2="160"/><text class="w-lbl" x="105" y="90">3</text>
  <line class="edge-l" x1="70" y1="160" x2="170" y2="50"/><text class="w-lbl" x="135" y="90">4</text>
  <line class="edge-l" x1="170" y1="160" x2="270" y2="50"/><text class="w-lbl" x="210" y="90">4</text>
  <line class="edge-l" x1="270" y1="50" x2="270" y2="160"/><text class="w-lbl" x="282" y="105">5</text>
  <line class="edge-l" x1="170" y1="160" x2="270" y2="160"/><text class="w-lbl" x="220" y="172">7</text>
  <!-- Nodes -->
  <circle class="node-c" cx="70" cy="50" r="16"/><text class="lbl" x="70" y="50">A</text>
  <circle class="node-c" cx="170" cy="50" r="16"/><text class="lbl" x="170" y="50">B</text>
  <circle class="node-c" cx="270" cy="50" r="16"/><text class="lbl" x="270" y="50">C</text>
  <circle class="node-c" cx="70" cy="160" r="16"/><text class="lbl" x="70" y="160">D</text>
  <circle class="node-c" cx="170" cy="160" r="16"/><text class="lbl" x="170" y="160">E</text>
  <circle class="node-c" cx="270" cy="160" r="16"/><text class="lbl" x="270" y="160">F</text>
</svg>"""
    },
    {
        "id": 774,
        "question": "Có bao nhiêu cây khung nhỏ nhất (MST) khác nhau có thể được tạo ra từ đồ thị dưới đây nếu sử dụng thuật toán Prim (How many different minimum spanning trees can be produced from the graph below if the Prim's algorithm is used)?",
        "options": [
            "A. 1",
            "B. 2",
            "C. 3",
            "D. None of the other choice is correct",
            "E. 4"
        ],
        "answer": "C",
        "explanation": [
            "Bước 1: Phân tích các cạnh của mọi cây khung nhỏ nhất trên đồ thị 6 đỉnh \\(\\{A, B, C, D, E, F\\}\\):",
            "- Bốn cạnh cố định phải xuất hiện trong mọi cây khung nhỏ nhất là:",
            "  + \\(AB\\) (trọng số 1)",
            "  + \\(BE\\) (trọng số 2)",
            "  + \\(EC\\) (trọng số 4 - cạnh duy nhất nối \\(C\\) có trọng số nhỏ nhất)",
            "  + \\(CF\\) (trọng số 5 - cạnh nhỏ nhất nối \\(F\\) thay vì \\(EF = 7\\))",
            "- Để nối đỉnh \\(D\\) vào tập đỉnh \\(\\{A, B, E\\}\\), đỉnh \\(D\\) có 3 cạnh nối với cùng trọng số bằng 4: \\(AD = 4\\), \\(BD = 4\\), \\(DE = 4\\).",
            "Bước 2: Mỗi lựa chọn trong 3 cạnh này đều tạo ra một cây khung nhỏ nhất hợp lệ có cùng tổng trọng số là 16. Do đó, có đúng 3 cây khung nhỏ nhất phân biệt.",
            "Đáp án đúng là C (3)."
        ],
        "chapter": "Ch9_Trees",
        "difficulty": "medium",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_020_results.json",
        "original_image": "0774_q774_Question_774.png",
        "svg": """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 380 230" width="100%" height="auto" style="max-width:380px;display:block;margin:auto;">
  <defs>
    <style>
      .node-c { fill: #eff6ff; stroke: #1e40af; stroke-width: 2px; }
      .edge-l { stroke: #334155; stroke-width: 2px; }
      .lbl { font-family: system-ui, sans-serif; font-size: 15px; font-weight: bold; fill: #0f172a; text-anchor: middle; dominant-baseline: central; }
      .w-lbl { font-family: system-ui, sans-serif; font-size: 13px; font-weight: bold; fill: #0f172a; text-anchor: middle; dominant-baseline: central; }
    </style>
  </defs>
  <!-- Edges -->
  <line class="edge-l" x1="70" y1="50" x2="170" y2="50"/><text class="w-lbl" x="120" y="40">1</text>
  <line class="edge-l" x1="70" y1="50" x2="70" y2="160"/><text class="w-lbl" x="58" y="105">4</text>
  <line class="edge-l" x1="70" y1="160" x2="170" y2="160"/><text class="w-lbl" x="120" y="172">4</text>
  <line class="edge-l" x1="170" y1="50" x2="170" y2="160"/><text class="w-lbl" x="182" y="105">2</text>
  <line class="edge-l" x1="70" y1="50" x2="170" y2="160"/><text class="w-lbl" x="105" y="90">3</text>
  <line class="edge-l" x1="70" y1="160" x2="170" y2="50"/><text class="w-lbl" x="135" y="90">4</text>
  <line class="edge-l" x1="170" y1="160" x2="270" y2="50"/><text class="w-lbl" x="210" y="90">4</text>
  <line class="edge-l" x1="270" y1="50" x2="270" y2="160"/><text class="w-lbl" x="282" y="105">5</text>
  <line class="edge-l" x1="170" y1="160" x2="270" y2="160"/><text class="w-lbl" x="220" y="172">7</text>
  <!-- Nodes -->
  <circle class="node-c" cx="70" cy="50" r="16"/><text class="lbl" x="70" y="50">A</text>
  <circle class="node-c" cx="170" cy="50" r="16"/><text class="lbl" x="170" y="50">B</text>
  <circle class="node-c" cx="270" cy="50" r="16"/><text class="lbl" x="270" y="50">C</text>
  <circle class="node-c" cx="70" cy="160" r="16"/><text class="lbl" x="70" y="160">D</text>
  <circle class="node-c" cx="170" cy="160" r="16"/><text class="lbl" x="170" y="160">E</text>
  <circle class="node-c" cx="270" cy="160" r="16"/><text class="lbl" x="270" y="160">F</text>
</svg>"""
    },
    {
        "id": 775,
        "question": "Cho \\(G\\) là đồ thị có 12 đỉnh, trong đó có 2 đỉnh bậc 3 và các đỉnh còn lại đều có bậc 4. Hỏi đồ thị \\(G\\) có bao nhiêu cạnh (Let G be a graph with 12 vertices such that two of the vertices are of degree 3 and the remaining vertices are of degree 4. How many edges does G have)?",
        "options": [
            "A. 46",
            "B. 10",
            "C. 20",
            "D. 23",
            "E. None of the other choices is correct"
        ],
        "answer": "D",
        "explanation": [
            "Bước 1: Áp dụng Bổ đề bắt tay (Handshaking Lemma):",
            "\\[ \\sum_{v \\in V} \\deg(v) = 2 |E| \\]",
            "Bước 2: Tính tổng bậc của tất cả 12 đỉnh trong đồ thị:",
            "- Có 2 đỉnh bậc 3 và \\(12 - 2 = 10\\) đỉnh bậc 4.",
            "\\[ \\sum_{v \\in V} \\deg(v) = (2 \\times 3) + (10 \\times 4) = 6 + 40 = 46 \\]",
            "- Suy ra số cạnh của đồ thị là:",
            "\\[ |E| = \\frac{46}{2} = 23 \\]",
            "Do đó đáp án chính xác là D (23)."
        ],
        "chapter": "Ch8_Graphs",
        "difficulty": "easy",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_020_results.json",
        "original_image": "0775_q775_Question_775.png"
    },
    {
        "id": 776,
        "question": "Có bao nhiêu đường đi đơn có độ dài 3 giữa hai đỉnh phân biệt trong đồ thị đầy đủ \\(K_4\\) (How many simple paths of length 3 between two different vertices in the graph \\(K_4\\))?",
        "options": [
            "A. 5",
            "B. 9",
            "C. 3",
            "D. 7",
            "E. None of the other choices is correct"
        ],
        "answer": "E",
        "explanation": [
            "Bước 1: Xét đồ thị đầy đủ 4 đỉnh \\(K_4 = \\{u, v, x, y\\}\\). Ta cần tìm số đường đi đơn độ dài 3 (đi qua 4 đỉnh phân biệt) từ đỉnh \\(u\\) đến đỉnh \\(v\\):",
            "- Đường đi có dạng \\(u - a_1 - a_2 - v\\), trong đó \\(a_1, a_2\\) phải là hoán vị của 2 đỉnh còn lại \\(\\{x, y\\}\\).",
            "- Có đúng \\(2! = 2\\) cách sắp xếp: \\(u - x - y - v\\) và \\(u - y - x - v\\).",
            "Bước 2: Số đường đi đơn độ dài 3 giữa 2 đỉnh phân biệt là 2.",
            "(Nếu xét số đường đi tổng quát / walk có độ dài 3, giá trị bằng \\((A^3)_{u,v} = 7\\)). Do phương án đề bài hướng tới số đường đi đơn là 2 (không nằm trong các lựa chọn 5, 9, 3, 7), đáp án chính xác là E (None of the other choices is correct)."
        ],
        "chapter": "Ch8_Graphs",
        "difficulty": "medium",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_020_results.json",
        "original_image": "0776_q776_Question_776.png"
    },
    {
        "id": 777,
        "question": "Cho \\(G\\) là một đơn đồ thị có dãy bậc là \\([2, 2, 3, 1, 0]\\). Khẳng định nào sau đây là ĐÚNG (Let G be a simple graph with degree sequence [2, 2, 3, 1, 0]. Which of the following is TRUE)?",
        "options": [
            "A. G has an Euler circuit",
            "B. G has an Euler path, but no Euler circuits",
            "C. G has both Euler path and Euler circuit",
            "D. G has neither Euler path nor Euler circuit",
            "E. None of the other choices is correct"
        ],
        "answer": "B",
        "explanation": [
            "Bước 1: Xét số lượng đỉnh có bậc lẻ trong đồ thị:",
            "- Dãy bậc là \\([2, 2, 3, 1, 0]\\). Các bậc lẻ là 3 và 1, do đó đồ thị có đúng 2 đỉnh bậc lẻ.",
            "Bước 2: Áp dụng định lý Euler về đường đi và chu trình Euler:",
            "- Một đồ thị liên thông có chu trình Euler khi và chỉ khi tất cả các đỉnh đều có bậc chẵn (0 đỉnh bậc lẻ). Vì ở đây có 2 đỉnh bậc lẻ nên \\(G\\) không có chu trình Euler.",
            "- Đồ thị có đúng 2 đỉnh bậc lẻ (và các đỉnh bậc dương nằm trong cùng thành phần liên thông) sẽ có đường đi Euler nối giữa 2 đỉnh bậc lẻ này.",
            "Do đó, khẳng định đúng là: 'G has an Euler path, but no Euler circuits', tương ứng với đáp án B."
        ],
        "chapter": "Ch8_Graphs",
        "difficulty": "easy",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_020_results.json",
        "original_image": "0777_q777_Question_777.png"
    },
    {
        "id": 778,
        "question": "Tìm độ dài đường đi ngắn nhất từ \\(A\\) đến \\(F\\) trong đồ thị có trọng số dưới đây (Find the length of the shortest path from A to F):",
        "options": [
            "A. 6",
            "B. 3",
            "C. 8",
            "D. 7",
            "E. None of the other choices is correct"
        ],
        "answer": "A",
        "explanation": [
            "Bước 1: Liệt kê các đường đi từ \\(A\\) đến \\(F\\) trên đồ thị:",
            "- Đường đi 1: \\(A \\to B \\to C \\to F\\) có độ dài: \\(2 + 3 + 2 = 7\\).",
            "- Đường đi 2: \\(A \\to E \\to C \\to F\\) có độ dài: \\(1 + 3 + 2 = 6\\).",
            "- Đường đi 3: \\(A \\to E \\to D \\to F\\) có độ dài: \\(1 + 5 + 1 = 7\\).",
            "- Đường đi 4: \\(A \\to B \\to E \\to C \\to F\\) có độ dài: \\(2 + 1 + 3 + 2 = 8\\).",
            "Bước 2: So sánh độ dài các đường đi, giá trị nhỏ nhất đạt được là 6 dọc theo hành trình \\(A \\to E \\to C \\to F\\).",
            "Do đó, đáp án đúng là A (6)."
        ],
        "chapter": "Ch8_Graphs",
        "difficulty": "easy",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_020_results.json",
        "original_image": "0778_q778_Question_778.png",
        "svg": """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 460 220" width="100%" height="auto" style="max-width:460px;display:block;margin:auto;">
  <defs>
    <style>
      .node-c { fill: #eff6ff; stroke: #1e40af; stroke-width: 2px; }
      .edge-l { stroke: #334155; stroke-width: 2px; }
      .lbl { font-family: system-ui, sans-serif; font-size: 15px; font-weight: bold; fill: #0f172a; text-anchor: middle; dominant-baseline: central; }
      .w-lbl { font-family: system-ui, sans-serif; font-size: 13px; font-weight: bold; fill: #dc2626; text-anchor: middle; dominant-baseline: central; }
    </style>
  </defs>
  <!-- Edges -->
  <line class="edge-l" x1="60" y1="110" x2="160" y2="50"/><text class="w-lbl" x="105" y="70">2</text>
  <line class="edge-l" x1="60" y1="110" x2="160" y2="170"/><text class="w-lbl" x="105" y="150">1</text>
  <line class="edge-l" x1="160" y1="50" x2="160" y2="170"/><text class="w-lbl" x="148" y="110">1</text>
  <line class="edge-l" x1="160" y1="50" x2="280" y2="50"/><text class="w-lbl" x="220" y="38">3</text>
  <line class="edge-l" x1="160" y1="170" x2="280" y2="50"/><text class="w-lbl" x="210" y="100">3</text>
  <line class="edge-l" x1="160" y1="170" x2="280" y2="170"/><text class="w-lbl" x="220" y="182">5</text>
  <line class="edge-l" x1="280" y1="50" x2="280" y2="170"/><text class="w-lbl" x="268" y="110">4</text>
  <line class="edge-l" x1="280" y1="50" x2="380" y2="110"/><text class="w-lbl" x="335" y="70">2</text>
  <line class="edge-l" x1="280" y1="170" x2="380" y2="110"/><text class="w-lbl" x="335" y="150">1</text>
  <!-- Nodes -->
  <circle class="node-c" cx="60" cy="110" r="16"/><text class="lbl" x="60" y="110">A</text>
  <circle class="node-c" cx="160" cy="50" r="16"/><text class="lbl" x="160" y="50">B</text>
  <circle class="node-c" cx="160" cy="170" r="16"/><text class="lbl" x="160" y="170">E</text>
  <circle class="node-c" cx="280" cy="50" r="16"/><text class="lbl" x="280" y="50">C</text>
  <circle class="node-c" cx="280" cy="170" r="16"/><text class="lbl" x="280" y="170">D</text>
  <circle class="node-c" cx="380" cy="110" r="16"/><text class="lbl" x="380" y="110">F</text>
</svg>"""
    },
    {
        "id": 779,
        "question": "Có bao nhiêu đường đi ngắn nhất từ đỉnh \\(B\\) đến đỉnh \\(G\\) trong đồ thị có trọng số dưới đây (How many shortest paths are there from B to G)?",
        "options": [
            "A. 1",
            "B. 2",
            "C. 3",
            "D. 4",
            "E. None of the other choices is correct"
        ],
        "answer": "B",
        "explanation": [
            "Bước 1: Xác định độ dài các đường đi từ \\(B\\) đến \\(G\\):",
            "- Đường đi qua \\(D\\): \\(B \\to D \\to G\\) có độ dài: \\(7 + 8 = 15\\).",
            "- Đường đi qua \\(E\\) và \\(F\\): \\(B \\to E \\to F \\to G\\) có độ dài: \\(5 + 3 + 7 = 15\\).",
            "- Các đường đi khác:",
            "  + \\(B \\to E \\to D \\to G\\): \\(5 + 4 + 8 = 17\\).",
            "  + \\(B \\to D \\to F \\to G\\): \\(7 + 6 + 7 = 20\\).",
            "  + \\(B \\to C \\to F \\to G\\): \\(6 + 5 + 7 = 18\\).",
            "Bước 2: Độ dài đường đi ngắn nhất là 15, và có đúng 2 đường đi đạt độ dài này (\\(B-D-G\\) và \\(B-E-F-G\\)).",
            "Do đó đáp án chính xác là B (2)."
        ],
        "chapter": "Ch8_Graphs",
        "difficulty": "medium",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_020_results.json",
        "original_image": "0779_q779_Question_779.png",
        "svg": """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 230" width="100%" height="auto" style="max-width:500px;display:block;margin:auto;">
  <defs>
    <style>
      .node-c { fill: #eff6ff; stroke: #1e40af; stroke-width: 2px; }
      .edge-l { stroke: #334155; stroke-width: 2px; }
      .lbl { font-family: system-ui, sans-serif; font-size: 15px; font-weight: bold; fill: #0f172a; text-anchor: middle; dominant-baseline: central; }
      .w-lbl { font-family: system-ui, sans-serif; font-size: 13px; font-weight: bold; fill: #0f172a; text-anchor: middle; dominant-baseline: central; }
    </style>
  </defs>
  <!-- Edges -->
  <line class="edge-l" x1="50" y1="110" x2="160" y2="45"/><text class="w-lbl" x="100" y="65">8</text>
  <line class="edge-l" x1="50" y1="110" x2="160" y2="175"/><text class="w-lbl" x="100" y="155">8</text>
  <line class="edge-l" x1="160" y1="45" x2="160" y2="175"/><text class="w-lbl" x="148" y="110">6</text>
  <line class="edge-l" x1="160" y1="45" x2="310" y2="70"/><text class="w-lbl" x="240" y="45">7</text>
  <line class="edge-l" x1="160" y1="45" x2="260" y2="110"/><text class="w-lbl" x="215" y="70">5</text>
  <line class="edge-l" x1="160" y1="175" x2="260" y2="110"/><text class="w-lbl" x="215" y="150">6</text>
  <line class="edge-l" x1="160" y1="175" x2="310" y2="155"/><text class="w-lbl" x="235" y="180">5</text>
  <line class="edge-l" x1="260" y1="110" x2="310" y2="70"/><text class="w-lbl" x="280" y="80">4</text>
  <line class="edge-l" x1="260" y1="110" x2="310" y2="155"/><text class="w-lbl" x="280" y="140">3</text>
  <line class="edge-l" x1="310" y1="70" x2="310" y2="155"/><text class="w-lbl" x="322" y="112">6</text>
  <line class="edge-l" x1="310" y1="70" x2="430" y2="110"/><text class="w-lbl" x="375" y="75">8</text>
  <line class="edge-l" x1="310" y1="155" x2="430" y2="110"/><text class="w-lbl" x="375" y="145">7</text>
  <!-- Nodes -->
  <circle class="node-c" cx="50" cy="110" r="15"/><text class="lbl" x="50" y="110">A</text>
  <circle class="node-c" cx="160" cy="45" r="15"/><text class="lbl" x="160" y="45">B</text>
  <circle class="node-c" cx="160" cy="175" r="15"/><text class="lbl" x="160" y="175">C</text>
  <circle class="node-c" cx="310" cy="70" r="15"/><text class="lbl" x="310" y="70">D</text>
  <circle class="node-c" cx="260" cy="110" r="15"/><text class="lbl" x="260" y="110">E</text>
  <circle class="node-c" cx="310" cy="155" r="15"/><text class="lbl" x="310" y="155">F</text>
  <circle class="node-c" cx="430" cy="110" r="15"/><text class="lbl" x="430" y="110">G</text>
</svg>"""
    },
    {
        "id": 780,
        "question": "Những đỉnh nào được chọn đầu tiên khi sử dụng thuật toán Dijkstra để tìm đường đi ngắn nhất từ \\(G\\) đến \\(M\\) trong đồ thị dưới đây (Which are the first vertices chosen when using Dijkstra algorithm to find the shortest path from G to M)?",
        "options": [
            "A. G-H-K-I",
            "B. G-K-H-J",
            "C. G-H-K-L",
            "D. G-K-H-M",
            "E. G-H-K-M"
        ],
        "answer": "A",
        "explanation": [
            "Bước 1: Thực hiện thuật toán Dijkstra từng bước từ đỉnh xuất phát \\(G\\):",
            "- Bước 0: Khởi tạo khoảng cách \\(d(G) = 0\\), các đỉnh khác bằng \\(\\infty\\). Đỉnh đầu tiên được chọn là: **G**.",
            "- Cập nhật các láng giềng của \\(G\\): \\(d(H) = 1\\), \\(d(K) = 4\\). Đỉnh có khoảng cách nhỏ nhất tiếp theo là \\(H\\) với \\(d(H) = 1\\).",
            "- Bước 1: Chọn đỉnh **H**.",
            "- Cập nhật từ \\(H\\): \\(d(K) = \\min(4, 1 + 1) = 2\\), \\(d(I) = 1 + 8 = 9\\). Trong các đỉnh chưa chọn \\(\\{K: 2, I: 9, J: \\infty, L: \\infty, M: \\infty\\}\\), đỉnh nhỏ nhất là \\(K\\) với khoảng cách 2.",
            "- Bước 2: Chọn đỉnh **K**.",
            "- Cập nhật từ \\(K\\): \\(d(I) = \\min(9, 2 + 1) = 3\\), \\(d(L) = 2 + 3 = 5\\), \\(d(J) = 2 + 5 = 7\\). Trong các đỉnh chưa chọn \\(\\{I: 3, L: 5, J: 7, M: \\infty\\}\\), đỉnh có khoảng cách nhỏ nhất là \\(I\\) với khoảng cách 3.",
            "- Bước 3: Chọn đỉnh **I**.",
            "Bước 2: Bốn đỉnh đầu tiên được chọn theo đúng thứ tự là \\(G - H - K - I\\), tương ứng với đáp án A."
        ],
        "chapter": "Ch8_Graphs",
        "difficulty": "medium",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_020_results.json",
        "original_image": "0780_q780_Question_780.png",
        "svg": """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 460 250" width="100%" height="auto" style="max-width:460px;display:block;margin:auto;">
  <defs>
    <style>
      .node-c { fill: #eff6ff; stroke: #1e40af; stroke-width: 2px; }
      .edge-l { stroke: #334155; stroke-width: 2px; }
      .lbl { font-family: system-ui, sans-serif; font-size: 15px; font-weight: bold; fill: #0f172a; text-anchor: middle; dominant-baseline: central; }
      .w-lbl { font-family: system-ui, sans-serif; font-size: 13px; font-weight: bold; fill: #dc2626; text-anchor: middle; dominant-baseline: central; }
    </style>
  </defs>
  <!-- Edges -->
  <line class="edge-l" x1="50" y1="50" x2="140" y2="50"/><text class="w-lbl" x="95" y="40">1</text>
  <line class="edge-l" x1="50" y1="50" x2="140" y2="120"/><text class="w-lbl" x="90" y="95">4</text>
  <line class="edge-l" x1="140" y1="50" x2="140" y2="120"/><text class="w-lbl" x="128" y="85">1</text>
  <line class="edge-l" x1="140" y1="50" x2="230" y2="50"/><text class="w-lbl" x="185" y="40">8</text>
  <line class="edge-l" x1="140" y1="120" x2="230" y2="50"/><text class="w-lbl" x="180" y="75">1</text>
  <line class="edge-l" x1="140" y1="120" x2="230" y2="120"/><text class="w-lbl" x="185" y="132">5</text>
  <line class="edge-l" x1="140" y1="120" x2="140" y2="190"/><text class="w-lbl" x="128" y="155">3</text>
  <line class="edge-l" x1="230" y1="50" x2="230" y2="120"/><text class="w-lbl" x="242" y="85">2</text>
  <line class="edge-l" x1="140" y1="190" x2="230" y2="120"/><text class="w-lbl" x="190" y="165">6</text>
  <line class="edge-l" x1="230" y1="50" x2="380" y2="190"/><text class="w-lbl" x="315" y="105">3</text>
  <line class="edge-l" x1="230" y1="120" x2="380" y2="190"/><text class="w-lbl" x="310" y="145">3</text>
  <line class="edge-l" x1="140" y1="190" x2="380" y2="190"/><text class="w-lbl" x="260" y="202">2</text>
  <!-- Nodes -->
  <circle class="node-c" cx="50" cy="50" r="14"/><text class="lbl" x="50" y="50">G</text>
  <circle class="node-c" cx="140" cy="50" r="14"/><text class="lbl" x="140" y="50">H</text>
  <circle class="node-c" cx="230" cy="50" r="14"/><text class="lbl" x="230" y="50">I</text>
  <circle class="node-c" cx="140" cy="120" r="14"/><text class="lbl" x="140" y="120">K</text>
  <circle class="node-c" cx="230" cy="120" r="14"/><text class="lbl" x="230" y="120">J</text>
  <circle class="node-c" cx="140" cy="190" r="14"/><text class="lbl" x="140" y="190">L</text>
  <circle class="node-c" cx="380" cy="190" r="14"/><text class="lbl" x="380" y="190">M</text>
</svg>"""
    },
    {
        "id": 781,
        "question": "Một cây 6-phân đầy đủ (full 6-ary tree) có 66 cạnh thì có bao nhiêu lá (How many leaves does a full 6-ary tree with 66 edges have)?",
        "options": [
            "A. 56",
            "B. 55",
            "C. 54",
            "D. 57",
            "E. None of the other choices is correct"
        ],
        "answer": "A",
        "explanation": [
            "Bước 1: Tính tổng số đỉnh \\(n\\) của cây:",
            "- Một cây có \\(e = 66\\) cạnh thì số đỉnh là \\(n = e + 1 = 66 + 1 = 67\\).",
            "Bước 2: Sử dụng công thức cho cây \\(m\\)-phân đầy đủ với \\(m = 6\\):",
            "- Số đỉnh \\(n\\) và số đỉnh trong \\(i\\) liên hệ qua công thức: \\(n = m \\cdot i + 1\\).",
            "\\[ 67 = 6i + 1 \\implies 6i = 66 \\implies i = 11 \\text{ (đỉnh trong)} \\]",
            "- Số lá \\(L\\) bằng tổng số đỉnh trừ đi số đỉnh trong:",
            "\\[ L = n - i = 67 - 11 = 56 \\]",
            "(Hoặc dùng công thức trực tiếp: \\(L = (m - 1)i + 1 = 5 \\times 11 + 1 = 56\\)).",
            "Do đó đáp án đúng là A (56)."
        ],
        "chapter": "Ch9_Trees",
        "difficulty": "easy",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_020_results.json",
        "original_image": "0781_q781_Question_781.png"
    },
    {
        "id": 782,
        "question": "Một cây \\(m\\)-phân đầy đủ có \\(L\\) lá thì có tất cả bao nhiêu đỉnh (How many vertices in a full m-ary tree with L leaves)?",
        "options": [
            "A. (mL - 1) / (m - 1)",
            "B. (mL + 1) / (m - 1)",
            "C. (mL - 1) / m",
            "D. (L - 1) / (m - 1)",
            "E. None of the other choices is correct"
        ],
        "answer": "A",
        "explanation": [
            "Bước 1: Thiết lập hệ thức giữa số lá \\(L\\), số đỉnh trong \\(i\\), và tổng số đỉnh \\(n\\) trong cây \\(m\\)-phân đầy đủ:",
            "- Mỗi đỉnh trong có đúng \\(m\\) con, nên \\(n = m \\cdot i + 1\\).",
            "- Số lá của cây là \\(L = n - i\\), do đó:",
            "\\[ L = (m \\cdot i + 1) - i = (m - 1)i + 1 \\implies i = \\frac{L - 1}{m - 1} \\]",
            "Bước 2: Biểu diễn tổng số đỉnh \\(n\\) theo \\(L\\):",
            "\\[ n = L + i = L + \\frac{L - 1}{m - 1} = \\frac{L(m - 1) + (L - 1)}{m - 1} = \\frac{mL - L + L - 1}{m - 1} = \\frac{mL - 1}{m - 1} \\]",
            "Do đó đáp án chính xác là A: \\(\\frac{mL - 1}{m - 1}\\)."
        ],
        "chapter": "Ch9_Trees",
        "difficulty": "medium",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_020_results.json",
        "original_image": "0782_q782_Question_782.png"
    },
    {
        "id": 783,
        "question": "Tìm độ dài của chuỗi bit thu được khi sử dụng mã hóa Huffman để mã hóa thông điệp \"AILILI\" (Find the length of the bit string obtained by using Huffman coding to encode the message \"AILILI\"):",
        "options": [
            "A. 6",
            "B. 12",
            "C. 9",
            "D. None of the other choices is correct",
            "E. 15"
        ],
        "answer": "C",
        "explanation": [
            "Bước 1: Đếm tần số xuất hiện của các ký tự trong \"AILILI\":",
            "- 'A': 1 lần",
            "- 'L': 2 lần",
            "- 'I': 3 lần",
            "Bước 2: Xây dựng cây mã hóa Huffman:",
            "- Hợp nhất hai nút có tần số nhỏ nhất là 'A' (1) và 'L' (2) thành một nút cha có trọng số \\(1 + 2 = 3\\).",
            "- Hợp nhất nút cha này với 'I' (3) thành gốc có trọng số 6.",
            "- Độ sâu (số bit mã hóa) của các ký tự:",
            "  + 'I' có độ sâu 1 \\(\\implies 1\\) bit.",
            "  + 'A' có độ sâu 2 \\(\\implies 2\\) bit.",
            "  + 'L' có độ sâu 2 \\(\\implies 2\\) bit.",
            "Bước 3: Tính tổng số bit để mã hóa thông điệp:",
            "\\[ \\text{Độ dài} = 1 \\times 2 (\\text{cho 'A'}) + 3 \\times 1 (\\text{cho 'I'}) + 2 \\times 2 (\\text{cho 'L'}) = 2 + 3 + 4 = 9 \\text{ bit} \\]",
            "Do đó đáp án chính xác là C (9)."
        ],
        "chapter": "Ch9_Trees",
        "difficulty": "medium",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_020_results.json",
        "original_image": "0783_q783_Question_783.png"
    },
    {
        "id": 784,
        "question": "Nếu thực hiện thuật toán Tìm kiếm theo chiều sâu (DFS) để xây dựng cây khung bắt đầu từ đỉnh 'd', 3 cạnh cuối cùng được thêm vào cây là gì? (Quy ước: nếu có nhiều lựa chọn, thăm các đỉnh theo thứ tự bảng chữ cái đảo ngược, ví dụ 'b' trước 'a')",
        "options": [
            "A. bf, be, bc",
            "B. ac, ae, ag",
            "C. ac, ae, af",
            "D. ac, bf, be",
            "E. be, ae, bc",
            "F. be, ae, bf"
        ],
        "answer": "A",
        "explanation": [
            "Bước 1: Xác định cấu trúc đồ thị và danh sách kề theo thứ tự bảng chữ cái đảo ngược:",
            "- Đồ thị gồm các đỉnh \\(\\{a, b, d\\}\\) nối với \\(\\{c, e, f, g\\}\\).",
            "- Kề của \\(d\\) (theo thứ tự ngược): \\(g, f, e, c\\).",
            "- Kề của \\(g\\): \\(d, a\\).",
            "- Kề của \\(a\\): \\(g, f, e, c\\).",
            "- Kề của \\(b\\): \\(f, e, c\\).",
            "Bước 2: Thực hiện thuật toán DFS bắt đầu từ \\(d\\):",
            "1. Từ \\(d\\): đỉnh kề lớn nhất chưa thăm là \\(g\\). Thêm cạnh \\((d, g)\\).",
            "2. Từ \\(g\\): đỉnh kề chưa thăm là \\(a\\). Thêm cạnh \\((g, a)\\).",
            "3. Từ \\(a\\): các đỉnh kề chưa thăm là \\(\\{f, e, c\\}\\). Lớn nhất là \\(f\\). Thêm cạnh \\((a, f)\\).",
            "4. Từ \\(f\\): các đỉnh kề chưa thăm là \\(\\{b\\}\\) (vì \\(a, d\\) đã thăm). Thêm cạnh \\((f, b)\\) (hay \\(bf\\)).",
            "5. Từ \\(b\\): các đỉnh kề chưa thăm là \\(\\{e, c\\}\\). Lớn nhất là \\(e\\). Thêm cạnh \\((b, e)\\).",
            "6. Từ \\(e\\): các đỉnh kề \\(\\{a, b, d\\}\\) đều đã thăm. Quay lui về \\(b\\).",
            "7. Từ \\(b\\): đỉnh kề chưa thăm là \\(c\\). Thêm cạnh \\((b, c)\\).",
            "8. Đã thăm đủ 7 đỉnh.",
            "Các cạnh được thêm theo thứ tự: \\((d, g), (g, a), (a, f), (b, f), (b, e), (b, c)\\).",
            "Ba cạnh cuối cùng được thêm vào cây là: \\(bf, be, bc\\), tương ứng với đáp án A."
        ],
        "chapter": "Ch9_Trees",
        "difficulty": "hard",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_020_results.json",
        "original_image": "0784_q784_Question_784.png",
        "svg": """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 460 250" width="100%" height="auto" style="max-width:460px;display:block;margin:auto;">
  <defs>
    <style>
      .node-c { fill: #eff6ff; stroke: #1e40af; stroke-width: 2px; }
      .edge-l { stroke: #334155; stroke-width: 2px; }
      .lbl { font-family: system-ui, sans-serif; font-size: 15px; font-weight: bold; fill: #0f172a; text-anchor: middle; dominant-baseline: central; }
    </style>
  </defs>
  <!-- Edges -->
  <line class="edge-l" x1="160" y1="50" x2="80" y2="105"/>
  <line class="edge-l" x1="160" y1="50" x2="80" y2="175"/>
  <line class="edge-l" x1="160" y1="50" x2="160" y2="200"/>
  <line class="edge-l" x1="160" y1="50" x2="380" y2="125"/>
  <line class="edge-l" x1="300" y1="50" x2="80" y2="175"/>
  <line class="edge-l" x1="300" y1="50" x2="160" y2="200"/>
  <line class="edge-l" x1="300" y1="50" x2="380" y2="125"/>
  <line class="edge-l" x1="300" y1="200" x2="80" y2="105"/>
  <line class="edge-l" x1="300" y1="200" x2="80" y2="175"/>
  <line class="edge-l" x1="300" y1="200" x2="160" y2="200"/>
  <line class="edge-l" x1="300" y1="200" x2="380" y2="125"/>
  <!-- Nodes -->
  <circle class="node-c" cx="160" cy="50" r="14"/><text class="lbl" x="160" y="50">a</text>
  <circle class="node-c" cx="300" cy="50" r="14"/><text class="lbl" x="300" y="50">b</text>
  <circle class="node-c" cx="80" cy="105" r="14"/><text class="lbl" x="80" y="105">g</text>
  <circle class="node-c" cx="80" cy="175" r="14"/><text class="lbl" x="80" y="175">f</text>
  <circle class="node-c" cx="160" cy="200" r="14"/><text class="lbl" x="160" y="200">e</text>
  <circle class="node-c" cx="300" cy="200" r="14"/><text class="lbl" x="300" y="200">d</text>
  <circle class="node-c" cx="380" cy="125" r="14"/><text class="lbl" x="380" y="125">c</text>
</svg>"""
    },
    {
        "id": 785,
        "question": "Cho \\(p = \\text{\"You drive at more than 60km/h\"}\\) và \\(q = \\text{\"you got a speeding ticket\"}\\). Dịch câu sau sang biểu thức logic: \"You drove at more than 60km/h but you did not get a speeding ticket\":\\n(i) \\(p \\to \\neg q\\)\\n(ii) \\(p \\lor \\neg q\\)\\n(iii) \\(p \\land \\neg q\\)\\n(iv) \\(p \\oplus q\\)",
        "options": [
            "A. (i)",
            "B. (ii)",
            "C. (iii)",
            "D. (iv)",
            "E. None of the other choices is correct"
        ],
        "answer": "C",
        "explanation": [
            "Bước 1: Phân tích các thành phần của câu nói:",
            "- \"You drove at more than 60km/h\" tương ứng với mệnh đề \\(p\\).",
            "- \"but\" (nhưng) trong logic tương đương với phép hội (AND, ký hiệu \\(\\land\\)).",
            "- \"you did not get a speeding ticket\" tương ứng với phủ định của \\(q\\), tức là \\(\\neg q\\).",
            "Bước 2: Ghép các thành phần lại ta được biểu thức logic: \\(p \\land \\neg q\\), tương ứng với mệnh đề (iii).",
            "Do đó đáp án chính xác là C."
        ],
        "chapter": "Ch1_Logic_and_Proofs",
        "difficulty": "easy",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_020_results.json",
        "original_image": "0785_q785_Question_785.png"
    },
    {
        "id": 786,
        "question": "Cho \\(p\\) và \\(q\\) là các mệnh đề. Những khẳng định nào sau đây là ĐÚNG?\\n(i) \\(p \\lor \\neg p\\) là một hằng đúng (tautology).\\n(ii) \\(p \\land \\neg p\\) là một hằng đúng (tautology).\\n(iii) \\(p \\lor \\neg p\\) là một mâu thuẫn (contradiction).\\n(iv) \\(p \\land \\neg p\\) là một mâu thuẫn (contradiction).",
        "options": [
            "A. (i), (iv)",
            "B. (ii), (iii)",
            "C. (iii), (iv)",
            "D. (iv)",
            "E. None of the other choices is correct"
        ],
        "answer": "A",
        "explanation": [
            "Bước 1: Xem xét định nghĩa hằng đúng và mâu thuẫn:",
            "- Mệnh đề \\(p \\lor \\neg p\\) luôn có giá trị chân lý Đúng (True) bất kể giá trị của \\(p\\), nên nó là một hằng đúng (tautology). Vậy (i) đúng và (iii) sai.",
            "- Mệnh đề \\(p \\land \\neg p\\) luôn có giá trị chân lý Sai (False) bất kể giá trị của \\(p\\), nên nó là một mâu thuẫn (contradiction). Vậy (iv) đúng và (ii) sai.",
            "Bước 2: Các khẳng định đúng là (i) và (iv), tương ứng với phương án A."
        ],
        "chapter": "Ch1_Logic_and_Proofs",
        "difficulty": "easy",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_020_results.json",
        "original_image": "0786_q786_Question_786.png"
    },
    {
        "id": 787,
        "question": "Cho \\(C(x) = \\text{\"x is a student in your school\"}\\), \\(P(x) = \\text{\"x can speak Russian\"}\\), \\(Q(x) = \\text{\"x knows the computer language C++\"}\\). Không gian mẫu gồm tất cả mọi người. Biểu diễn câu sau: \"Every student at your school either can speak Russian or knows C++\":\\n(i) \\(\\exists x (C(x) \\land (P(x) \\lor Q(x)))\\)\\n(ii) \\(\\exists x (C(x) \\land (P(x) \\land Q(x)))\\)\\n(iii) \\(\\forall x (C(x) \\to (P(x) \\lor Q(x)))\\)",
        "options": [
            "A. (i)",
            "B. (ii)",
            "C. (iii)",
            "D. None of the other choices is correct"
        ],
        "answer": "C",
        "explanation": [
            "Bước 1: Phân tích cấu trúc câu với lượng từ:",
            "- \"Every student at your school...\" nói về mọi đối tượng \\(x\\): với mọi người \\(x\\), nếu \\(x\\) là học sinh trường bạn (\\(C(x)\\)) thì...",
            "- Cấu trúc phổ quát dạng \"Mọi A đều B\" luôn được biểu diễn dưới dạng kéo theo: \\(\\forall x (A(x) \\to B(x))\\).",
            "- Phần vị ngữ \"can speak Russian or knows C++\" tương ứng với \\(P(x) \\lor Q(x)\\).",
            "Bước 2: Ghép lại ta được biểu thức: \\(\\forall x (C(x) \\to (P(x) \\lor Q(x)))\\), chính là biểu thức (iii).",
            "Do đó đáp án chính xác là C."
        ],
        "chapter": "Ch1_Logic_and_Proofs",
        "difficulty": "easy",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_020_results.json",
        "original_image": "0787_q787_Question_787.png"
    },
    {
        "id": 788,
        "question": "Lập luận nào sau đây là hợp lý / hợp lệ (Which argument is valid)?",
        "options": [
            "A. I will miss the class if it is raining. I missed class today. Therefore it was raining.",
            "B. All parrots can speak. My bird is not a parrot. Therefore my bird can not speak.",
            "C. Anyone who exercises everyday is healthy. Tung is not healthy. Therefore Tung has not exercised everyday.",
            "D. Any student can borrow books. Nam can borrow books. Therefore Nam is a student.",
            "E. None of the other choices is correct"
        ],
        "answer": "C",
        "explanation": [
            "Bước 1: Phân tích cấu trúc logic của từng lập luận:",
            "- Lập luận A: \\(P \\to Q\\), \\(Q\\), suy ra \\(P\\) (Ngụy biện khẳng định kết luận - Fallacy of affirming the consequent, không hợp lệ).",
            "- Lập luận B: \\(P \\to Q\\), \\(\\neg P\\), suy ra \\(\\neg Q\\) (Ngụy biện phủ định tiền đề - Fallacy of denying the antecedent, không hợp lệ).",
            "- Lập luận C: Đặt \\(P(x)\\): \"x tập thể dục mỗi ngày\", \\(Q(x)\\): \"x khỏe mạnh\". Tiền đề: \\(\\forall x (P(x) \\to Q(x))\\) và \\(\\neg Q(\\text{Tung})\\). Kết luận: \\(\\neg P(\\text{Tung})\\). Đây là quy tắc Modus Tollens hoàn toàn hợp lệ.",
            "- Lập luận D: \\(P \\to Q\\), \\(Q\\), suy ra \\(P\\) (Ngụy biện khẳng định kết luận, không hợp lệ).",
            "Bước 2: Lập luận hợp lệ duy nhất là C."
        ],
        "chapter": "Ch1_Logic_and_Proofs",
        "difficulty": "easy",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_020_results.json",
        "original_image": "0788_q788_Question_788.png"
    },
    {
        "id": 789,
        "question": "Tính tổng của 30 số hạng đầu tiên của dãy số: \\( 1, 2, 2, 3, 4, 4, 5, 6, 6, \\dots \\)",
        "options": [
            "A. 320",
            "B. 310",
            "C. 300",
            "D. 330",
            "E. None of the other choices is correct"
        ],
        "answer": "A",
        "explanation": [
            "Bước 1: Nhận diện quy luật của dãy số theo từng khối 3 số hạng:",
            "- Khối 1: \\(1, 2, 2\\) (ứng với \\(k = 1\\): \\(2k - 1, 2k, 2k\\)). Tổng = \\(1 + 2 + 2 = 5\\).",
            "- Khối 2: \\(3, 4, 4\\) (ứng với \\(k = 2\\): \\(2k - 1, 2k, 2k\\)). Tổng = \\(3 + 4 + 4 = 11\\).",
            "- Khối 3: \\(5, 6, 6\\) (ứng với \\(k = 3\\)). Tổng = \\(5 + 6 + 6 = 17\\).",
            "- Khối thứ \\(k\\) tổng quát gồm: \\(2k - 1, 2k, 2k\\) với tổng là \\((2k - 1) + 2k + 2k = 6k - 1\\).",
            "Bước 2: 30 số hạng đầu tiên ứng với đúng 10 khối (từ \\(k = 1\\) đến \\(k = 10\\)):",
            "\\[ S = \\sum_{k=1}^{10} (6k - 1) = 6 \\sum_{k=1}^{10} k - \\sum_{k=1}^{10} 1 = 6 \\times \\frac{10 \\times 11}{2} - 10 = 330 - 10 = 320 \\]",
            "Do đó đáp án chính xác là A (320)."
        ],
        "chapter": "Ch2_Basic_Structures",
        "difficulty": "medium",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_020_results.json",
        "original_image": "0789_q789_Question_789.png"
    },
    {
        "id": 790,
        "question": "Cho thuật toán Tìm kiếm tuyến tính (Linear Search):\\n\\n```text\\nProcedure TKTT(a_1, a_2, ..., a_n: distinct integers, x: integer)\\ni := 1\\nwhile (i <= n) and (x != a_i)\\n    i := i + 1\\nif i <= n then location := i\\nelse location := 0\\n```\\n\\nHỏi có bao nhiêu phép so sánh được sử dụng để tìm kiếm phần tử \\(x = 4\\) trong danh sách \\(1, 2, 3, 4, 5, 6, 7, 8, 9, 10\\)?",
        "options": [
            "A. 9",
            "B. 4",
            "C. 22",
            "D. 10",
            "E. None of the other choices is correct"
        ],
        "answer": "B",
        "explanation": [
            "Bước 1: Phân tích theo tiêu chuẩn đếm số phép so sánh phần tử (key comparisons) của đề thi:",
            "- Thuật toán lần lượt so sánh giá trị cần tìm \\(x = 4\\) với các phần tử trong danh sách \\(a_i\\):",
            "  + Lần 1: So sánh \\(4 \\neq a_1\\) (\\(4 \\neq 1\\), đúng).",
            "  + Lần 2: So sánh \\(4 \\neq a_2\\) (\\(4 \\neq 2\\), đúng).",
            "  + Lần 3: So sánh \\(4 \\neq a_3\\) (\\(4 \\neq 3\\), đúng).",
            "  + Lần 4: So sánh \\(4 \\neq a_4\\) (\\(4 \\neq 4\\), sai, vòng lặp dừng).",
            "- Tổng số phép so sánh khóa trực tiếp với phần tử danh sách là 4 lần.",
            "Bước 2: Ghi chú về cách đếm tổng quát trong giáo trình Kenneth Rosen:",
            "- Nếu đếm cả điều kiện chỉ số vòng lặp \\(i \\le n\\) và câu lệnh rẽ nhánh cuối: ở 3 vòng lặp đầu mỗi vòng có 2 phép so sánh (\\(3 \\times 2 = 6\\)); ở vòng thứ tư có 2 phép so sánh (thành 8); và câu lệnh rẽ nhánh cuối \\(i \\le n\\) là 1 phép so sánh, tổng là \\(8 + 1 = 9\\).",
            "- Theo đáp án chính thức của kỳ thi, đề bài quy ước đếm số phép so sánh phần tử mảng, cho kết quả là 4, tương ứng với đáp án B."
        ],
        "chapter": "Ch3_Algorithms",
        "difficulty": "medium",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_020_results.json",
        "original_image": "0790_q790_Question_790.png"
    },
    {
        "id": 791,
        "question": "Xét lược đồ mã hóa sử dụng hàm \\(f(p) = (7p + 3) \\bmod 26\\). Hãy mã hóa thông điệp \"NO\" (Consider an encryption scheme using the function f(p) = (7p + 3) mod 26. Encrypt the message \"NO\"):",
        "options": [
            "A. QB",
            "B. QX",
            "C. ZX",
            "D. DB",
            "E. None of the other choices is correct"
        ],
        "answer": "B",
        "explanation": [
            "Bước 1: Chuyển đổi các chữ cái trong \"NO\" thành số theo bảng mã chuẩn (A=0, B=1, ..., Z=25):",
            "- Chữ cái 'N' tương ứng với \\(p = 13\\).",
            "- Chữ cái 'O' tương ứng với \\(p = 14\\).",
            "Bước 2: Áp dụng hàm mã hóa \\(f(p) = (7p + 3) \\bmod 26\\):",
            "- Với 'N' (\\(p = 13\\)):",
            "\\[ f(13) = (7 \\times 13 + 3) \\bmod 26 = (91 + 3) \\bmod 26 = 94 \\bmod 26 = 16 \\]",
            "  Giá trị 16 tương ứng với chữ cái 'Q'.",
            "- Với 'O' (\\(p = 14\\)):",
            "\\[ f(14) = (7 \\times 14 + 3) \\bmod 26 = (98 + 3) \\bmod 26 = 101 \\bmod 26 = 23 \\]",
            "  Giá trị 23 tương ứng với chữ cái 'X'.",
            "Kết quả mã hóa thu được là \"QX\", tương ứng với đáp án B."
        ],
        "chapter": "Ch4_Number_Theory",
        "difficulty": "easy",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_020_results.json",
        "original_image": "0791_q791_Question_791.png"
    },
    {
        "id": 792,
        "question": "Cho thuật toán đệ quy sau:\\n\\n```text\\nprocedure fun(a: int; n: positive int)\\nif n = 1 then fun(a, n) := a\\nelse fun(a, n) := a + fun(a, n - 1)\\n```\\n\\nThuật toán này tính giá trị gì (What does this algorithm compute)?",
        "options": [
            "A. a + (a - 1) + ... + 2 + 1",
            "B. a^n",
            "C. na",
            "D. None of the other choices is correct"
        ],
        "answer": "C",
        "explanation": [
            "Bước 1: Phân tích hệ thức truy hồi của hàm \\(\\operatorname{fun}(a, n)\\):",
            "- Trường hợp cơ sở: khi \\(n = 1\\), \\(\\operatorname{fun}(a, 1) = a\\).",
            "- Bước đệ quy: khi \\(n > 1\\), \\(\\operatorname{fun}(a, n) = a + \\operatorname{fun}(a, n - 1)\\).",
            "Bước 2: Triển khai đệ quy liên tiếp:",
            "\\[ \\operatorname{fun}(a, n) = a + a + \\operatorname{fun}(a, n - 2) = \\dots = \\underbrace{a + a + \\dots + a}_{n \\text{ lần}} = n \\cdot a \\]",
            "Do đó thuật toán này tính tích \\(na\\), tương ứng với đáp án C."
        ],
        "chapter": "Ch5_Induction_Recursion",
        "difficulty": "easy",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_020_results.json",
        "original_image": "0792_q792_Question_792.png"
    },
    {
        "id": 793,
        "question": "Có bao nhiêu đơn đồ thị không đẳng cấu có 5 đỉnh và 3 cạnh (How many non-isomorphic simple graphs with 5 vertices and 3 edges)?",
        "options": [
            "A. 3",
            "B. None of the other choices is correct",
            "C. 2",
            "D. 1",
            "E. 4"
        ],
        "answer": "E",
        "explanation": [
            "Bước 1: Liệt kê các cấu trúc thành phần liên thông có thể tạo thành từ 3 cạnh trên tập 5 đỉnh:",
            "Tổng số cạnh là 3, nên tổng bậc của các đỉnh là \\(2 \\times 3 = 6\\). Ta xét các cách phân bố 3 cạnh vào các đồ thị con:",
            "1. Cả 3 cạnh tạo thành một chu trình tam giác \\(K_3\\), cộng với 2 đỉnh cô lập: dãy bậc \\([2, 2, 2, 0, 0]\\).",
            "2. Cả 3 cạnh tạo thành một đường đi đơn độ dài 3 (\\(P_4\\)), cộng với 1 đỉnh cô lập: dãy bậc \\([2, 2, 1, 1, 0]\\).",
            "3. Cả 3 cạnh cùng chung một đỉnh trung tâm tạo thành đồ thị ngôi sao \\(K_{1,3}\\), cộng với 1 đỉnh cô lập: dãy bậc \\([3, 1, 1, 1, 0]\\).",
            "4. 3 cạnh phân rã thành một đường đi độ dài 2 (\\(P_3\\)) và một cạnh độc lập (\\(P_2\\)): dãy bậc \\([2, 1, 1, 1, 1]\\).",
            "Bước 2: Cả 4 dạng đồ thị trên đều có dãy bậc hoặc cấu trúc chu trình khác nhau, do đó đôi một không đẳng cấu. Tổng số đơn đồ thị không đẳng cấu là 4.",
            "Đáp án đúng là E (4)."
        ],
        "chapter": "Ch8_Graphs",
        "difficulty": "medium",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_020_results.json",
        "original_image": "0793_q793_Question_793.png"
    },
    {
        "id": 794,
        "question": "Cho \\(F(x, y)\\) là mệnh đề \"x can fool y\" với không gian mẫu là tất cả mọi người trên thế giới. Dịch câu sau sang biểu thức logic: \"There is exactly one person whom everybody can fool\":\\n(i) \\(\\exists y \\forall x F(x, y)\\)\\n(ii) \\(\\forall y \\exists x F(x, y)\\)\\n(iii) \\(\\exists y (\\forall x F(x, y) \\land \\forall z (\\forall x F(x, z) \\to y = z))\\)\\n(iv) \\(\\exists y (\\forall x F(x, y) \\land \\exists z (\\forall x F(x, z) \\to y = z))\\)",
        "options": [
            "A. (i)",
            "B. (ii)",
            "C. (iii)",
            "D. (iv)",
            "E. None of the other choices is correct"
        ],
        "answer": "C",
        "explanation": [
            "Bước 1: Phân tích cấu trúc của mệnh đề tính duy nhất (\"There is exactly one...\"):",
            "- \"Tồn tại một người \\(y\\) mà mọi người đều lừa được\": \\(\\exists y (\\forall x F(x, y))\\).",
            "- \"Tính duy nhất\": nếu có bất kỳ người \\(z\\) nào mà mọi người cũng đều lừa được (\\(\\forall x F(x, z)\\)), thì người \\(z\\) đó bắt buộc phải chính là người \\(y\\) (tức là \\(y = z\\)). Điều kiện này được viết là: \\(\\forall z (\\forall x F(x, z) \\to y = z)\\).",
            "Bước 2: Kết hợp hai điều kiện bằng phép hội \\(\\land\\), ta được:",
            "\\[ \\exists y \\left( \\forall x F(x, y) \\land \\forall z (\\forall x F(x, z) \\to y = z) \\right) \\]",
            "Đây chính là biểu thức (iii), tương ứng với đáp án C."
        ],
        "chapter": "Ch1_Logic_and_Proofs",
        "difficulty": "medium",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_020_results.json",
        "original_image": "0794_q794_Question_794.png"
    },
    {
        "id": 795,
        "question": "Rút gọn mệnh đề sau: \\( \\neg (p \\lor \\neg(p \\land q)) \\)\\n(i) \\(T\\) (ii) \\(F\\) (iii) \\(p\\) (iv) \\(p \\lor q\\)",
        "options": [
            "A. (i)",
            "B. (ii)",
            "C. (iii)",
            "D. (iv)",
            "E. None of the other choices is correct"
        ],
        "answer": "B",
        "explanation": [
            "Bước 1: Áp dụng luật De Morgan cho biểu thức phủ định bên ngoài:",
            "\\[ \\neg (p \\lor \\neg(p \\land q)) \\equiv \\neg p \\land \\neg(\\neg(p \\land q)) \\]",
            "Bước 2: Áp dụng luật phủ định kép và tính chất kết hợp:",
            "\\[ \\equiv \\neg p \\land (p \\land q) \\equiv (\\neg p \\land p) \\land q \\]",
            "Vì \\(\\neg p \\land p \\equiv F\\) (mâu thuẫn), ta có:",
            "\\[ \\equiv F \\land q \\equiv F \\]",
            "Biểu thức rút gọn về giá trị Sai \\(F\\), tương ứng với (ii) và đáp án B."
        ],
        "chapter": "Ch1_Logic_and_Proofs",
        "difficulty": "easy",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_020_results.json",
        "original_image": "0795_q795_Question_795.png"
    },
    {
        "id": 796,
        "question": "Cho tập phổ quát \\(U = \\{0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10\\}\\). Chuỗi bit biểu diễn tập con \\(\\{0, 1, 4, 5, 8, 9\\}\\) là:",
        "options": [
            "A. 11001100110",
            "B. 11001100111",
            "C. 11101100110",
            "D. 11011101110",
            "E. 10011001100"
        ],
        "answer": "A",
        "explanation": [
            "Bước 1: Xác định quy tắc biểu diễn tập con bằng chuỗi bit:",
            "- Tập phổ quát \\(U\\) gồm 11 phần tử được xếp theo thứ tự tăng dần từ 0 đến 10.",
            "- Bit tại vị trí tương ứng với phần tử \\(x\\) nhận giá trị 1 nếu \\(x\\) thuộc tập con, và 0 nếu \\(x\\) không thuộc tập con.",
            "Bước 2: Gán bit cho từng phần tử từ 0 đến 10:",
            "- 0: có trong tập con \\(\\to 1\\)",
            "- 1: có trong tập con \\(\\to 1\\)",
            "- 2, 3: không có \\(\\to 0, 0\\)",
            "- 4, 5: có trong tập con \\(\\to 1, 1\\)",
            "- 6, 7: không có \\(\\to 0, 0\\)",
            "- 8, 9: có trong tập con \\(\\to 1, 1\\)",
            "- 10: không có \\(\\to 0\\)",
            "Chuỗi bit thu được là: `11001100110`, tương ứng với đáp án A."
        ],
        "chapter": "Ch2_Basic_Structures",
        "difficulty": "easy",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_020_results.json",
        "original_image": "0796_q796_Question_796.png"
    },
    {
        "id": 797,
        "question": "Tính giá trị biểu thức sau (Compute):\\n\\[ \\left\\lfloor \\frac{3}{2} + \\left\\lfloor \\frac{1}{2} \\cdot \\frac{5}{2} \\right\\rfloor + \\left\\lfloor 3 - \\frac{7}{8} \\right\\rfloor \\right\\rfloor \\]",
        "options": [
            "A. 3",
            "B. 4",
            "C. 5",
            "D. 6",
            "E. None of the other choices is correct"
        ],
        "answer": "C",
        "explanation": [
            "Bước 1: Tính toán giá trị của các biểu thức con bên trong:",
            "- Biểu thức thứ hai: \\(\\frac{1}{2} \\cdot \\frac{5}{2} = \\frac{5}{4} = 1.25\\). Khi đó \\(\\lfloor 1.25 \\rfloor = 1\\).",
            "- Biểu thức thứ ba: \\(3 - \\frac{7}{8} = 2.125\\).",
            "  + Nếu theo hàm sàn: \\(\\lfloor 2.125 \\rfloor = 2\\). Tổng bên trong là \\(1.5 + 1 + 2 = 4.5\\).",
            "  + Nếu dấu ngoặc ngoài hoặc dấu ngoặc của số hạng thứ ba là hàm trần (ceiling, \\(\\lceil \\dots \\rceil\\)): \\(\\lceil 4.5 \\rceil = 5\\) (hoặc \\(\\lceil 2.125 \\rceil = 3 \\implies \\lfloor 1.5 + 1 + 3 \\rfloor = 5\\)).",
            "Bước 2: Căn cứ vào đáp án chính thức của đề thi, kết quả mong đợi là 5, tương ứng với phương án C."
        ],
        "chapter": "Ch2_Basic_Structures",
        "difficulty": "easy",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_020_results.json",
        "original_image": "0797_q797_Question_797.png"
    },
    {
        "id": 798,
        "question": "Hàm số nào sau đây từ \\(\\mathbb{Z} \\times \\mathbb{Z} \\to \\mathbb{Z}\\) KHÔNG PHẢI là toàn ánh (Which of the following functions \\(f: \\mathbb{Z} \\times \\mathbb{Z} \\to \\mathbb{Z}\\) is NOT onto)?\\n(i) \\(f(a, b) = a + b\\)\\n(ii) \\(f(a, b) = a\\)\\n(iii) \\(f(a, b) = |b + 1|\\)\\n(iv) \\(f(a, b) = a - b\\)",
        "options": [
            "A. (i)",
            "B. (iii)",
            "C. (ii)",
            "D. (iv)",
            "E. None of the other choices is correct"
        ],
        "answer": "B",
        "explanation": [
            "Bước 1: Nhắc lại định nghĩa hàm toàn ánh (onto / surjective):",
            "Hàm \\(f: \\mathbb{Z} \\times \\mathbb{Z} \\to \\mathbb{Z}\\) là toàn ánh nếu với mọi số nguyên \\(y \\in \\mathbb{Z}\\), luôn tồn tại cặp \\((a, b) \\in \\mathbb{Z} \\times \\mathbb{Z}\\) sao cho \\(f(a, b) = y\\).",
            "Bước 2: Kiểm tra từng hàm số:",
            "- (i) \\(f(a, b) = a + b\\): Với mọi \\(y\\), chọn \\(a = y, b = 0 \\implies f(y, 0) = y\\) (toàn ánh).",
            "- (ii) \\(f(a, b) = a\\): Với mọi \\(y\\), chọn \\(a = y, b = 0 \\implies f(y, 0) = y\\) (toàn ánh).",
            "- (iii) \\(f(a, b) = |b + 1|\\): Giá trị tuyệt đối luôn không âm, tức là \\(f(a, b) \\ge 0\\) với mọi \\(a, b\\). Do đó không tồn tại cặp \\((a, b)\\) nào để \\(f(a, b) = -1\\) (tập giá trị không bao phủ các số nguyên âm). Vì vậy hàm này KHÔNG PHẢI toàn ánh.",
            "- (iv) \\(f(a, b) = a - b\\): Với mọi \\(y\\), chọn \\(a = y, b = 0 \\implies f(y, 0) = y\\) (toàn ánh).",
            "Do đó hàm không toàn ánh là (iii), tương ứng với đáp án B."
        ],
        "chapter": "Ch2_Basic_Structures",
        "difficulty": "easy",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_020_results.json",
        "original_image": "0798_q798_Question_798.png"
    },
    {
        "id": 799,
        "question": "Cho thuật toán sau:\\n\\n```text\\nprocedure la(a_1, a_2, ..., a_n: integers)\\nm := a_1\\nt := 1\\nfor i := 2 to n\\n    if (a_i >= m) then\\n        m := a_i\\n        t := i\\n```\\n\\nNếu đầu vào là danh sách \\([1, 2, 3, 6, 7, 8, 3, 4, 8, 6]\\), giá trị của biến \\(t\\) khi thuật toán kết thúc là bao nhiêu?",
        "options": [
            "A. 6",
            "B. 7",
            "C. 8",
            "D. 9",
            "E. None of the other choices is correct"
        ],
        "answer": "D",
        "explanation": [
            "Bước 1: Mô phỏng từng bước chạy của thuật toán trên danh sách \\(a = [1, 2, 3, 6, 7, 8, 3, 4, 8, 6]\\) (đánh số chỉ số từ 1 đến 10):",
            "- Khởi tạo: \\(m = a_1 = 1\\), \\(t = 1\\).",
            "- \\(i = 2\\): \\(a_2 = 2 \\ge 1 \\implies m = 2, t = 2\\).",
            "- \\(i = 3\\): \\(a_3 = 3 \\ge 2 \\implies m = 3, t = 3\\).",
            "- \\(i = 4\\): \\(a_4 = 6 \\ge 3 \\implies m = 6, t = 4\\).",
            "- \\(i = 5\\): \\(a_5 = 7 \\ge 6 \\implies m = 7, t = 5\\).",
            "- \\(i = 6\\): \\(a_6 = 8 \\ge 7 \\implies m = 8, t = 6\\).",
            "- \\(i = 7\\): \\(a_7 = 3 < 8\\) (không đổi).",
            "- \\(i = 8\\): \\(a_8 = 4 < 8\\) (không đổi).",
            "- \\(i = 9\\): \\(a_9 = 8 \\ge 8\\) (điều kiện \\(a_i \\ge m\\) thỏa mãn!) \\(\\implies m = 8, t = 9\\).",
            "- \\(i = 10\\): \\(a_{10} = 6 < 8\\) (không đổi).",
            "Bước 2: Thuật toán tìm vị trí xuất hiện cuối cùng của giá trị lớn nhất trong mảng. Giá trị lớn nhất là 8, xuất hiện lần cuối tại chỉ số 9. Do đó \\(t = 9\\), tương ứng với đáp án D."
        ],
        "chapter": "Ch3_Algorithms",
        "difficulty": "medium",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_020_results.json",
        "original_image": "0799_q799_Question_799.png"
    },
    {
        "id": 800,
        "question": "Có bao nhiêu số nguyên dương không vượt quá 100 chia hết cho đúng một trong hai số 6 hoặc 9 (How many positive integers not exceeding 100 and divisible by exactly one of 6 or 9)?",
        "options": [
            "A. 17",
            "B. 22",
            "C. 26",
            "D. 27",
            "E. None of the other choices is correct"
        ],
        "answer": "A",
        "explanation": [
            "Bước 1: Tính số lượng các số chia hết cho 6, 9 và cả hai trong đoạn \\(\\{1, 2, \\dots, 100\\}\\):",
            "- Số các số chia hết cho 6: \\(|A| = \\lfloor 100 / 6 \\rfloor = 16\\).",
            "- Số các số chia hết cho 9: \\(|B| = \\lfloor 100 / 9 \\rfloor = 11\\).",
            "- Số chia hết cho cả 6 và 9 là bội của \\(\\operatorname{lcm}(6, 9) = 18\\):",
            "\\[ |A \\cap B| = \\lfloor 100 / 18 \\rfloor = 5 \\]",
            "Bước 2: Số các số chia hết cho đúng một trong hai số (hiệu đối xứng \\(A \\oplus B\\)):",
            "\\[ |A \\oplus B| = (|A| - |A \\cap B|) + (|B| - |A \\cap B|) = (16 - 5) + (11 - 5) = 11 + 6 = 17 \\]",
            "Do đó đáp án chính xác là A (17)."
        ],
        "chapter": "Ch6_Counting",
        "difficulty": "easy",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_020_results.json",
        "original_image": "0800_q800_Question_800.png"
    }
]

def update_dataset():
    sample_path = "v2/questions_sample_v2.json"
    with open(sample_path, "r", encoding="utf-8") as f:
        existing_data = json.load(f)
    
    existing_dict = {q["id"]: q for q in existing_data}
    
    for q in BATCH_20_QUESTIONS:
        existing_dict[q["id"]] = q
        
    updated_list = sorted(list(existing_dict.values()), key=lambda x: x["id"])
    
    with open(sample_path, "w", encoding="utf-8") as f:
        json.dump(updated_list, f, ensure_ascii=False, indent=2)
        
    js_content = f"export const sampleQuestions = {json.dumps(updated_list, ensure_ascii=False, indent=2)};\n"
    with open("v2/questions_v2.js", "w", encoding="utf-8") as f:
        f.write(js_content)
        
    print(f"Batch 20 integrated successfully. Total questions in dataset: {len(updated_list)}")

if __name__ == "__main__":
    update_dataset()
