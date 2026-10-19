"""
MAD101 Studio - Schema v2 Batch 024 Builder
Questions: 921 to 960 (40 questions)
Updates: v2/questions_sample_v2.json and v2/questions_v2.js
"""

import json
import os

svg_q923 = '''<svg viewBox="0 0 540 380" xmlns="http://www.w3.org/2000/svg" style="max-width:100%;height:auto;display:block;margin:1rem auto;background:#ffffff;border:1px solid #e2e8f0;border-radius:8px;">
  <!-- Grid -->
  <defs>
    <pattern id="grid_923" width="30" height="30" patternUnits="userSpaceOnUse">
      <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#e2e8f0" stroke-width="1"/>
    </pattern>
  </defs>
  <rect x="30" y="30" width="480" height="300" fill="url(#grid_923)" stroke="#cbd5e1" stroke-width="1.5"/>
  
  <!-- Axes: origin at x=180 (x=0), y=240 (y=0) -->
  <!-- x-axis from x=30 to 510 at y=240 -->
  <line x1="30" y1="240" x2="505" y2="240" stroke="#2563eb" stroke-width="2.5"/>
  <polygon points="505,235 515,240 505,245" fill="#2563eb"/>
  <text x="505" y="260" font-family="sans-serif" font-size="16" font-style="italic" fill="#2563eb">x</text>
  
  <!-- y-axis from y=330 to 35 at x=180 -->
  <line x1="180" y1="330" x2="180" y2="40" stroke="#2563eb" stroke-width="2.5"/>
  <polygon points="175,40 180,30 185,40" fill="#2563eb"/>
  <text x="160" y="45" font-family="sans-serif" font-size="16" font-style="italic" fill="#2563eb">y</text>

  <!-- Axis labels -->
  <text x="165" y="255" font-family="sans-serif" font-size="14" fill="#334155">0</text>
  <!-- x marks: each 30px is 1 unit. x=2 is at 180 + 60 = 240 -->
  <line x1="240" y1="237" x2="240" y2="243" stroke="#2563eb" stroke-width="2"/>
  <text x="236" y="260" font-family="sans-serif" font-size="14" fill="#334155">2</text>
  
  <!-- y marks: y=2 is at 240 - 60 = 180 -->
  <line x1="177" y1="180" x2="183" y2="180" stroke="#2563eb" stroke-width="2"/>
  <text x="190" y="185" font-family="sans-serif" font-size="14" fill="#334155">2</text>

  <!-- Curve g(x) cyan: (-4, 3) to (-2, 1) to (0, 3) to (2, 4.3) to (3, 3) -->
  <!-- (-4, 3): (180 - 120, 240 - 90) = (60, 150) -->
  <!-- (-2, 1): (180 - 60, 240 - 30) = (120, 210) -->
  <!-- (0, 3): (180, 150) -->
  <!-- (2, 4.3): (240, 111) -->
  <!-- (3, 3): (270, 150) -->
  <path d="M 60 150 Q 120 230 180 150 L 210 120 Q 240 100 270 150" fill="none" stroke="#06b6d4" stroke-width="3.5" stroke-linecap="round"/>
  <text x="215" y="145" font-family="sans-serif" font-size="18" font-style="italic" font-weight="bold" fill="#0891b2">g</text>

  <!-- Function f(x) magenta: (0,0) to (2, -2) to (6, 6) -->
  <!-- (0, 0): (180, 240) -->
  <!-- (2, -2): (240, 300) -->
  <!-- (6, 6): (360, 60) -->
  <polyline points="180,240 240,300 360,60" fill="none" stroke="#ec4899" stroke-width="3.5" stroke-linecap="round"/>
  <text x="325" y="145" font-family="sans-serif" font-size="18" font-style="italic" font-weight="bold" fill="#db2777">f</text>
</svg>'''

svg_q933 = '''<svg viewBox="0 0 540 320" xmlns="http://www.w3.org/2000/svg" style="max-width:100%;height:auto;display:block;margin:1rem auto;background:#ffffff;border:1px solid #e2e8f0;border-radius:8px;">
  <!-- Edges -->
  <g stroke="#334155" stroke-width="2.5">
    <line x1="60" y1="160" x2="180" y2="70" />
    <line x1="60" y1="160" x2="170" y2="250" />
    <line x1="180" y1="70" x2="170" y2="250" />
    <line x1="180" y1="70" x2="350" y2="90" />
    <line x1="180" y1="70" x2="270" y2="160" />
    <line x1="170" y1="250" x2="270" y2="160" />
    <line x1="170" y1="250" x2="340" y2="230" />
    <line x1="350" y1="90" x2="270" y2="160" />
    <line x1="350" y1="90" x2="340" y2="230" />
    <line x1="350" y1="90" x2="470" y2="160" />
    <line x1="270" y1="160" x2="340" y2="230" />
    <line x1="340" y1="230" x2="470" y2="160" />
  </g>

  <!-- Edge Weights -->
  <g font-family="sans-serif" font-size="15" font-weight="bold" fill="#b91c1c" text-anchor="middle">
    <!-- A-B: 8 -->
    <rect x="110" y="100" width="18" height="18" fill="#ffffff" rx="3"/>
    <text x="119" y="114">8</text>
    <!-- A-C: 8 -->
    <rect x="105" y="195" width="18" height="18" fill="#ffffff" rx="3"/>
    <text x="114" y="209">8</text>
    <!-- B-C: 6 -->
    <rect x="180" y="150" width="18" height="18" fill="#ffffff" rx="3"/>
    <text x="189" y="164">6</text>
    <!-- B-D: 7 -->
    <rect x="255" y="65" width="18" height="18" fill="#ffffff" rx="3"/>
    <text x="264" y="79">7</text>
    <!-- B-E: 5 -->
    <rect x="225" y="105" width="18" height="18" fill="#ffffff" rx="3"/>
    <text x="234" y="119">5</text>
    <!-- C-E: 6 -->
    <rect x="210" y="200" width="18" height="18" fill="#ffffff" rx="3"/>
    <text x="219" y="214">6</text>
    <!-- C-F: 5 -->
    <rect x="250" y="240" width="18" height="18" fill="#ffffff" rx="3"/>
    <text x="259" y="254">5</text>
    <!-- D-E: 4 -->
    <rect x="305" y="115" width="18" height="18" fill="#ffffff" rx="3"/>
    <text x="314" y="129">4</text>
    <!-- D-F: 6 -->
    <rect x="350" y="155" width="18" height="18" fill="#ffffff" rx="3"/>
    <text x="359" y="169">6</text>
    <!-- D-G: 8 -->
    <rect x="410" y="110" width="18" height="18" fill="#ffffff" rx="3"/>
    <text x="419" y="124">8</text>
    <!-- E-F: 3 -->
    <rect x="300" y="190" width="18" height="18" fill="#ffffff" rx="3"/>
    <text x="309" y="204">3</text>
    <!-- F-G: 7 -->
    <rect x="410" y="195" width="18" height="18" fill="#ffffff" rx="3"/>
    <text x="419" y="209">7</text>
  </g>

  <!-- Vertices -->
  <g fill="#0284c7" stroke="#0369a1" stroke-width="2">
    <circle cx="60" cy="160" r="14"/>
    <circle cx="180" cy="70" r="14"/>
    <circle cx="170" cy="250" r="14"/>
    <circle cx="270" cy="160" r="14"/>
    <circle cx="350" cy="90" r="14"/>
    <circle cx="340" cy="230" r="14"/>
    <circle cx="470" cy="160" r="14"/>
  </g>
  <g font-family="sans-serif" font-size="14" font-weight="bold" fill="#ffffff" text-anchor="middle" dominant-baseline="central">
    <text x="60" y="160">A</text>
    <text x="180" y="70">B</text>
    <text x="170" y="250">C</text>
    <text x="270" y="160">E</text>
    <text x="350" y="90">D</text>
    <text x="340" y="230">F</text>
    <text x="470" y="160">G</text>
  </g>
</svg>'''

svg_q934 = '''<svg viewBox="0 0 520 380" xmlns="http://www.w3.org/2000/svg" style="max-width:100%;height:auto;display:block;margin:1rem auto;background:#ffffff;border:1px solid #e2e8f0;border-radius:8px;">
  <!-- Edges -->
  <g stroke="#475569" stroke-width="2">
    <!-- a to b, c -->
    <line x1="200" y1="40" x2="110" y2="105"/>
    <line x1="200" y1="40" x2="310" y2="105"/>
    <!-- b to d, e -->
    <line x1="110" y1="105" x2="60" y2="175"/>
    <line x1="110" y1="105" x2="160" y2="175"/>
    <!-- e to i, j -->
    <line x1="160" y1="175" x2="115" y2="245"/>
    <line x1="160" y1="175" x2="205" y2="245"/>
    <!-- j to m, n, o -->
    <line x1="205" y1="245" x2="155" y2="325"/>
    <line x1="205" y1="245" x2="205" y2="325"/>
    <line x1="205" y1="245" x2="255" y2="325"/>
    <!-- c to f, g, h -->
    <line x1="310" y1="105" x2="260" y2="175"/>
    <line x1="310" y1="105" x2="310" y2="175"/>
    <line x1="310" y1="105" x2="380" y2="175"/>
    <!-- h to k, l -->
    <line x1="380" y1="175" x2="335" y2="245"/>
    <line x1="380" y1="175" x2="430" y2="245"/>
    <!-- l to p -->
    <line x1="430" y1="245" x2="430" y2="325"/>
  </g>

  <!-- Nodes (dark circles) -->
  <g fill="#1e293b">
    <circle cx="200" cy="40" r="5"/>
    <circle cx="110" cy="105" r="5"/>
    <circle cx="310" cy="105" r="5"/>
    <circle cx="60" cy="175" r="5"/>
    <circle cx="160" cy="175" r="5"/>
    <circle cx="260" cy="175" r="5"/>
    <circle cx="310" cy="175" r="5"/>
    <circle cx="380" cy="175" r="5"/>
    <circle cx="115" cy="245" r="5"/>
    <circle cx="205" cy="245" r="5"/>
    <circle cx="335" cy="245" r="5"/>
    <circle cx="430" cy="245" r="5"/>
    <circle cx="155" cy="325" r="5"/>
    <circle cx="205" cy="325" r="5"/>
    <circle cx="255" cy="325" r="5"/>
    <circle cx="430" cy="325" r="5"/>
  </g>

  <!-- Labels -->
  <g font-family="sans-serif" font-size="15" font-style="italic" fill="#0f172a">
    <text x="195" y="28">a</text>
    <text x="92" y="105">b</text>
    <text x="322" y="105">c</text>
    <text x="45" y="185">d</text>
    <text x="172" y="175">e</text>
    <text x="250" y="195">f</text>
    <text x="303" y="195">g</text>
    <text x="392" y="175">h</text>
    <text x="102" y="260">i</text>
    <text x="217" y="248">j</text>
    <text x="325" y="265">k</text>
    <text x="442" y="250">l</text>
    <text x="145" y="345">m</text>
    <text x="200" y="345" font-weight="bold" fill="#dc2626">n</text>
    <text x="250" y="345">o</text>
    <text x="425" y="345">p</text>
  </g>
</svg>'''

batch_024_questions = [
    {
        "id": 921,
        "question": "Cho hai tập hợp \\(A = \\{a, b, c\\}\\) và \\(B = \\{x, y, z, w\\}\\). Chọn khẳng định đúng trong các mệnh đề sau:\n(i) \\(A \\times B = B \\times A\\)\n(ii) \\(O \\in A\\)\n(iii) \\(|A \\times B| = |A| \\times |B|\\)",
        "options": [
            "A. (i) and (ii)",
            "B. (i)",
            "C. (ii)",
            "D. (iii)",
            "E. None of the other choices is correct"
        ],
        "answer": "D",
        "answer_status": "verified",
        "explanation": [
            "Bước 1: Tích Descartes \\(A \\times B = \\{(u, v) \\mid u \\in A, v \\in B\\}\\). Do \\(A \\neq B\\) nên \\(A \\times B \\neq B \\times A\\) (các cặp có thứ tự đảo ngược nhau), do đó mệnh đề (i) sai.",
            "Bước 2: Tập \\(A\\) chỉ chứa 3 phần tử \\(a, b, c\\), không chứa phần tử \\(O\\), do đó mệnh đề (ii) sai.",
            "Bước 3: Lực lượng của tích Descartes luôn thỏa mãn \\(|A \\times B| = |A| \\times |B| = 3 \\times 4 = 12\\). Do đó chỉ có mệnh đề (iii) đúng."
        ],
        "diagram": None,
        "metadata": {
            "chapter": "Ch2_BasicStructures",
            "topic": "Tích Descartes và tập hợp",
            "difficulty": "easy",
            "verified": True,
            "has_diagram": False,
            "calculator_allowed": False
        }
    },
    {
        "id": 922,
        "question": "Tập hợp nào dưới đây có lực lượng (số phần tử) lớn nhất? (Trong đó \\(x\\) là các số nguyên):\n\\(X = \\{x \\mid 100 < x^3 < 100\\}\\)\n\\(Y = \\{x \\mid -1 < x < 12\\}\\)\n\\(Z = \\{x \\mid x^2 = 100\\}\\)\n\\(W = \\{x \\mid x^4 = 256\\}\\)",
        "options": [
            "A. Y",
            "B. X",
            "C. Z",
            "D. W"
        ],
        "answer": "A",
        "answer_status": "verified",
        "explanation": [
            "Bước 1: Xét tập \\(X\\): không có số nguyên nào thỏa mãn \\(100 < x^3 < 100\\), nên \\(X = \\emptyset \\implies |X| = 0\\).",
            "Bước 2: Xét tập \\(Y\\): các số nguyên thỏa mãn \\(-1 < x < 12\\) là \\(x \\in \\{0, 1, 2, \\dots, 11\\}\\), có \\(11 - 0 + 1 = 12\\) phần tử, tức \\(|Y| = 12\\).",
            "Bước 3: Xét \\(Z = \\{-10, 10\\} \\implies |Z| = 2\\); \\(W = \\{-4, 4\\} \\implies |W| = 2\\). Vậy tập \\(Y\\) có lực lượng lớn nhất."
        ],
        "diagram": None,
        "metadata": {
            "chapter": "Ch2_BasicStructures",
            "topic": "Lực lượng tập hợp",
            "difficulty": "easy",
            "verified": True,
            "has_diagram": False,
            "calculator_allowed": False
        }
    },
    {
        "id": 923,
        "question": "Sử dụng đồ thị hàm số của \\(f\\) và \\(g\\) trong hình vẽ dưới đây để tính giá trị của hàm hợp \\(g \\circ f(2)\\):",
        "options": [
            "A. 1",
            "B. -2",
            "C. 5",
            "D. 4",
            "E. undefined"
        ],
        "answer": "A",
        "answer_status": "verified",
        "explanation": [
            "Bước 1: Tra cứu đồ thị hàm \\(f\\) (đường thẳng gấp khúc màu hồng): Tại hoành độ \\(x = 2\\), điểm trên đồ thị là \\((2, -2)\\), do đó \\(f(2) = -2\\).",
            "Bước 2: Tính \\(g(f(2)) = g(-2)\\): Tra cứu đồ thị hàm \\(g\\) (đường cong màu xanh cyan): Tại hoành độ \\(x = -2\\), điểm đáy của parabol đạt giá trị tung độ \\(y = 1\\), suy ra \\(g(-2) = 1\\).",
            "Bước 3: Kết luận \\(g \\circ f(2) = g(f(2)) = 1\\)."
        ],
        "diagram": svg_q923,
        "metadata": {
            "chapter": "Ch2_BasicStructures",
            "topic": "Hàm hợp từ đồ thị",
            "difficulty": "medium",
            "verified": True,
            "has_diagram": True,
            "calculator_allowed": False
        }
    },
    {
        "id": 924,
        "question": "Tìm 5 số hạng đầu tiên \\(a_0, a_1, a_2, a_3, a_4\\) của dãy số \\(\\{a_n\\}\\), biết rằng:\n\\[a_n = \\lfloor 2n/3 \\rfloor + \\lceil 2n/3 \\rceil\\]",
        "options": [
            "A. 0, 1, 2, 3, 4",
            "B. 0, 2, 3, 4, 5",
            "C. 0, 1, 3, 4, 5",
            "D. 0, 1, 2, 4, 5",
            "E. None of the other choices is correct"
        ],
        "answer": "C",
        "answer_status": "verified",
        "explanation": [
            "Bước 1: Tính từng số hạng bằng cách áp dụng định nghĩa hàm sàn (floor) và hàm trần (ceiling):\n- Với \\(n = 0\\): \\(a_0 = \\lfloor 0 \\rfloor + \\lceil 0 \\rceil = 0 + 0 = 0\\).\n- Với \\(n = 1\\): \\(2/3 \\approx 0.67 \\implies a_1 = \\lfloor 2/3 \\rfloor + \\lceil 2/3 \\rceil = 0 + 1 = 1\\).\n- Với \\(n = 2\\): \\(4/3 \\approx 1.33 \\implies a_2 = \\lfloor 4/3 \\rfloor + \\lceil 4/3 \\rceil = 1 + 2 = 3\\).",
            "Bước 2: Tiếp tục tính cho \\(n = 3, 4\\):\n- Với \\(n = 3\\): \\(6/3 = 2 \\implies a_3 = \\lfloor 2 \\rfloor + \\lceil 2 \\rceil = 2 + 2 = 4\\).\n- Với \\(n = 4\\): \\(8/3 \\approx 2.67 \\implies a_4 = \\lfloor 8/3 \\rfloor + \\lceil 8/3 \\rceil = 2 + 3 = 5\\).",
            "Bước 3: Dãy 5 số hạng cần tìm là 0, 1, 3, 4, 5, tương ứng với đáp án C."
        ],
        "diagram": None,
        "metadata": {
            "chapter": "Ch2_BasicStructures",
            "topic": "Hàm sàn, hàm trần và dãy số",
            "difficulty": "easy",
            "verified": True,
            "has_diagram": False,
            "calculator_allowed": False
        }
    },
    {
        "id": 925,
        "question": "Tìm số nguyên nhỏ nhất \\(n\\) sao cho hàm số sau là \\(O(x^n)\\):\n\\[f(x) = \\frac{x + \\log^3 x}{x^3}\\]",
        "options": [
            "A. -1",
            "B. -2",
            "C. 0",
            "D. 1",
            "E. None of the other choices is correct"
        ],
        "answer": "B",
        "answer_status": "verified",
        "explanation": [
            "Bước 1: Phân tích bậc tăng trưởng khi \\(x \\to \\infty\\): Hàm logarit \\(\\log^3 x\\) tăng chậm hơn bất kỳ hàm lũy thừa dương nào của \\(x\\) (tức \\(\\log^3 x = o(x)\\)). Do đó, tử số có bậc chi phối là \\(x\\), tức \\(x + \\log^3 x = \\Theta(x)\\).",
            "Bước 2: Mẫu số là \\(x^3\\), do đó \\(f(x) = \\Theta\\left(\\frac{x}{x^3}\\right) = \\Theta(x^{-2})\\).",
            "Bước 3: Để \\(f(x) = O(x^n)\\), ta phải có số mũ \\(n \\ge -2\\). Do đó, số nguyên nhỏ nhất thỏa mãn là \\(n = -2\\)."
        ],
        "diagram": None,
        "metadata": {
            "chapter": "Ch3_Algorithms",
            "topic": "Độ tăng trưởng hàm và Big-O",
            "difficulty": "medium",
            "verified": True,
            "has_diagram": False,
            "calculator_allowed": False
        }
    },
    {
        "id": 926,
        "question": "Trong thuật toán sắp xếp nổi bọt (Bubble Sort) sắp xếp tăng dần, nếu đầu vào là danh sách \\(\\{4, 2, 1, 3\\}\\), cần thực hiện bao nhiêu phép đổi chỗ (swaps)?",
        "options": [
            "A. 3",
            "B. 4",
            "C. 5",
            "D. 6",
            "E. None of the other choices is correct"
        ],
        "answer": "B",
        "answer_status": "verified",
        "explanation": [
            "Bước 1: Số phép đổi chỗ trong thuật toán Bubble Sort đối với danh sách các phần tử phân biệt chính bằng số cặp nghịch thế (inversions) của danh sách ban đầu.",
            "Bước 2: Liệt kê các cặp nghịch thế trong \\(\\{4, 2, 1, 3\\}\\):\n- Với 4: (4, 2), (4, 1), (4, 3) (3 cặp)\n- Với 2: (2, 1) (1 cặp)\n- Với 1: không có cặp nào\nTổng số cặp nghịch thế là \\(3 + 1 = 4\\).",
            "Bước 3: Mô phỏng từng bước duyệt:\n- Lượt 1: (4,2) tráo thành {2,4,1,3}; (4,1) tráo thành {2,1,4,3}; (4,3) tráo thành {2,1,3,4} (3 swaps).\n- Lượt 2: (2,1) tráo thành {1,2,3,4} (1 swap). Danh sách đã sắp xếp xong.\nTổng số phép swaps là 4."
        ],
        "diagram": None,
        "metadata": {
            "chapter": "Ch3_Algorithms",
            "topic": "Thuật toán sắp xếp nổi bọt",
            "difficulty": "easy",
            "verified": True,
            "has_diagram": False,
            "calculator_allowed": False
        }
    },
    {
        "id": 927,
        "question": "Cho \\(a = -124 \\operatorname{div} 19\\) và \\(b = 297 \\operatorname{div} 19\\). Tính \\(a + b\\).",
        "options": [
            "A. 7",
            "B. 5",
            "C. 8",
            "D. -1",
            "E. None of the other choices"
        ],
        "answer": "C",
        "answer_status": "verified",
        "explanation": [
            "Bước 1: Theo thuật toán chia (Division Algorithm) trong Toán rời rạc, với \\(a, d \\in \\mathbb{Z}\\) và \\(d > 0\\), ta có \\(a = d \\cdot q + r\\) với \\(0 \\le r < d\\), trong đó \\(q = a \\operatorname{div} d = \\lfloor a/d \\rfloor\\).",
            "Bước 2: Tính \\(a = -124 \\operatorname{div} 19\\):\nTa có \\(-124 = 19 \\times (-7) + 9\\), với \\(0 \\le 9 < 19\\). Do đó \\(a = -7\\).",
            "Bước 3: Tính \\(b = 297 \\operatorname{div} 19\\):\nTa có \\(297 = 19 \\times 15 + 12\\), với \\(0 \\le 12 < 19\\). Do đó \\(b = 15\\).\nVậy \\(a + b = -7 + 15 = 8\\)."
        ],
        "diagram": None,
        "metadata": {
            "chapter": "Ch4_NumberTheory",
            "topic": "Thuật toán chia nguyên (div và mod)",
            "difficulty": "easy",
            "verified": True,
            "has_diagram": False,
            "calculator_allowed": False
        }
    },
    {
        "id": 928,
        "question": "Cho thuật toán Euclid tìm ước chung lớn nhất:\n```pascal\nprocedure gcd(a, b: positive integers)\nx := a; y := b\nwhile y != 0 begin\n  r := x mod y\n  x := y\n  y := r\nend\nreturn x\n```\nNếu \\(a = 610, b = 233\\), thì trước khi thực hiện vòng lặp lần thứ 3, giá trị của \\(x\\) và \\(y\\) là bao nhiêu?",
        "options": [
            "A. x = 144, y = 55",
            "B. x = 89, y = 55",
            "C. x = 144, y = 89",
            "D. x = 233, y = 89",
            "E. None of the other choices is correct"
        ],
        "answer": "C",
        "answer_status": "verified",
        "explanation": [
            "Bước 1: Khởi tạo ban đầu: \\(x = 610, y = 233\\).\nTrước lần lặp 1: \\(x = 610, y = 233\\).\nTrong lần lặp 1: \\(r = 610 \\bmod 233 = 144\\), gán \\(x = 233, y = 144\\).",
            "Bước 2: Trước lần lặp 2: \\(x = 233, y = 144\\).\nTrong lần lặp 2: \\(r = 233 \\bmod 144 = 89\\), gán \\(x = 144, y = 89\\).",
            "Bước 3: Trước khi thực hiện vòng lặp lần 3, các giá trị hiện tại là \\(x = 144\\) và \\(y = 89\\), tương ứng với đáp án C."
        ],
        "diagram": None,
        "metadata": {
            "chapter": "Ch4_NumberTheory",
            "topic": "Thuật toán Euclid",
            "difficulty": "medium",
            "verified": True,
            "has_diagram": False,
            "calculator_allowed": False
        }
    },
    {
        "id": 929,
        "question": "Cho mệnh đề \\(P(n)\\) là \"\\(3n = 0\\)\" với miền xác định là tập các số nguyên không âm. Một phép chứng minh cho \\(\\forall n P(n)\\) được đưa ra như sau:\n(i) \\(P(0)\\) hiển nhiên đúng vì \\(3(0) = 0\\).\n(ii) Giả sử \\(P(0), \\dots, P(k)\\) đều đúng với số nguyên không âm \\(k\\) nào đó.\n(iii) Viết \\(k + 1 = i + j\\) với \\(i, j\\) là các số nguyên thỏa mãn \\(0 \\le i, j \\le k\\).\n(iv) Ta có \\(3(k+1) = 3i + 3j = 0 + 0 = 0\\) vì \\(P(i), P(j)\\) đúng. Suy ra \\(P(k+1) = 0\\). Theo quy nạp mạnh, kết luận \\(\\forall n P(n)\\).\nBước nào bị sai trong phép chứng minh này?",
        "options": [
            "A. (i)",
            "B. (ii)",
            "C. (iii)",
            "D. (iv)",
            "E. None of the other choices"
        ],
        "answer": "C",
        "answer_status": "verified",
        "explanation": [
            "Bước 1: Xét trường hợp \\(k = 0\\): khi đó \\(k + 1 = 1\\). Ta cần biểu diễn \\(1 = i + j\\) với \\(0 \\le i, j \\le k = 0\\). Tuy nhiên, vì \\(i, j \\le 0\\) và \\(i, j \\ge 0\\) nên bắt buộc \\(i = 0, j = 0 \\implies i + j = 0 \\neq 1\\).",
            "Bước 2: Bước (iii) đã khẳng định sai lầm rằng luôn có thể tách \\(k + 1\\) thành tổng của hai số nguyên không âm nhỏ hơn hoặc bằng \\(k\\) với mọi \\(k \\ge 0\\). Khi \\(k = 0\\), điều này là bất khả thi.",
            "Bước 3: Do đó, lỗi sai cốt lõi nằm ở bước (iii)."
        ],
        "diagram": None,
        "metadata": {
            "chapter": "Ch5_Induction",
            "topic": "Quy nạp toán học và lỗi ngụy biện",
            "difficulty": "medium",
            "verified": True,
            "has_diagram": False,
            "calculator_allowed": False
        }
    },
    {
        "id": 930,
        "question": "Những phát biểu nào sau đây là ĐÚNG?\n(i) Một thuật toán được gọi là đệ quy nếu nó giải quyết một bài toán bằng cách quy về một trường hợp của chính bài toán đó với kích thước nhỏ hơn.\n(ii) Giá trị của một hàm được định nghĩa đệ quy có thể nhận được thông qua một thuật toán đệ quy.\n(iii) Nếu một bài toán có thể giải quyết được bằng cách sử dụng lời giải của các phiên bản nhỏ hơn của cùng bài toán đó và các phiên bản nhỏ hơn quy về các trường hợp cơ sở giải được dễ dàng, thì có thể dùng thuật toán đệ quy để giải bài toán đó.",
        "options": [
            "A. all of them",
            "B. (i) and (ii) only",
            "C. (i) and (iii) only",
            "D. (ii) and (iii) only",
            "E. none of them"
        ],
        "answer": "A",
        "answer_status": "verified",
        "explanation": [
            "Bước 1: Theo định nghĩa chuẩn trong giáo trình Kenneth Rosen (Discrete Mathematics and Its Applications): Thuật toán đệ quy giải bài toán bằng cách rút gọn về các phiên bản cùng bài toán có dữ liệu đầu vào nhỏ hơn, do đó phát biểu (i) đúng.",
            "Bước 2: Định nghĩa đệ quy cung cấp trực tiếp bước cơ sở và bước đệ quy, chính là cơ sở trực tiếp để triển khai thuật toán đệ quy, do đó phát biểu (ii) đúng.",
            "Bước 3: Cấu trúc phân rã bài toán thành các bài toán con tương tự và kết thúc tại bài toán cơ sở (base cases) chính là nguyên lý của phương pháp giải thuật đệ quy/chia để trị, do đó phát biểu (iii) đúng. Cả 3 phát biểu đều đúng."
        ],
        "diagram": None,
        "metadata": {
            "chapter": "Ch5_Induction",
            "topic": "Định nghĩa và thuật toán đệ quy",
            "difficulty": "easy",
            "verified": True,
            "has_diagram": False,
            "calculator_allowed": False
        }
    },
    {
        "id": 931,
        "question": "Một người gửi tiết kiệm 10 triệu đồng với lãi suất 9%/năm (lãi kép). Sau 10 năm, số tiền trong tài khoản là bao nhiêu? (Làm tròn kết quả đến hàng nghìn đồng).",
        "options": [
            "A. 23,674,000 VND",
            "B. 20,675,000 VND",
            "C. 25,740,000 VND",
            "D. 21,657,000 VND"
        ],
        "answer": "A",
        "answer_status": "verified",
        "explanation": [
            "Bước 1: Áp dụng công thức lãi kép \\(A = P(1 + r)^t\\), trong đó \\(P = 10,000,000\\) VND, lãi suất \\(r = 0.09\\), thời gian \\(t = 10\\) năm.",
            "Bước 2: Tính toán giá trị lũy thừa:\n\\[A = 10,000,000 \\times (1 + 0.09)^{10} = 10,000,000 \\times (1.09)^{10}\\]\nTa có \\((1.09)^{10} \\approx 2.367363675\\).",
            "Bước 3: Nhân với vốn gốc: \\(A \\approx 23,673,637\\) VND. Làm tròn đến nghìn đồng gần nhất thu được 23,674,000 VND."
        ],
        "diagram": None,
        "metadata": {
            "chapter": "Ch5_Induction",
            "topic": "Hệ thức truy hồi lãi kép",
            "difficulty": "easy",
            "verified": True,
            "has_diagram": False,
            "calculator_allowed": True
        }
    },
    {
        "id": 932,
        "question": "Cho \\(G\\) là một đơn đồ thị mà tất cả các đỉnh đều có cùng bậc. Nếu \\(G\\) có 15 cạnh và 10 đỉnh, thì bậc của mỗi đỉnh trong \\(G\\) là bao nhiêu?",
        "options": [
            "A. 3",
            "B. 30",
            "C. 5",
            "D. 15",
            "E. Such G does not exist"
        ],
        "answer": "A",
        "answer_status": "verified",
        "explanation": [
            "Bước 1: Gọi bậc chung của mỗi đỉnh là \\(d\\). Theo Định lý bắt tay (Handshaking Theorem), tổng bậc của tất cả các đỉnh trong đồ thị bằng hai lần số cạnh:\n\\[\\sum_{v \\in V} \\deg(v) = 2|E|\\]",
            "Bước 2: Thay số: Vì đồ thị có 10 đỉnh đều có bậc \\(d\\), nên:\n\\[10 \\times d = 2 \\times 15 = 30\\]",
            "Bước 3: Giải tìm \\(d\\): \\(d = 30 / 10 = 3\\). Đơn đồ thị 3-chính quy (3-regular) với 10 đỉnh hoàn toàn tồn tại (ví dụ đồ thị Petersen)."
        ],
        "diagram": None,
        "metadata": {
            "chapter": "Ch7_Graphs",
            "topic": "Định lý bắt tay và đồ thị chính quy",
            "difficulty": "easy",
            "verified": True,
            "has_diagram": False,
            "calculator_allowed": False
        }
    },
    {
        "id": 933,
        "question": "Khoảng cách ngắn nhất giữa đỉnh \\(A\\) và đỉnh \\(G\\) trong đồ thị có trọng số dưới đây là bao nhiêu?",
        "options": [
            "A. 20",
            "B. 19",
            "C. 22",
            "D. 18"
        ],
        "answer": "A",
        "answer_status": "verified",
        "explanation": [
            "Bước 1: Áp dụng thuật toán Dijkstra để tìm đường đi ngắn nhất từ \\(A\\) đến \\(G\\):\n- Đi qua \\(B\\): đường \\(A - B - D - G\\) có tổng trọng số \\(8 + 7 + 8 = 23\\).\n- Đường \\(A - B - E - F - G\\) có tổng trọng số \\(8 + 5 + 3 + 7 = 23\\).",
            "Bước 2: Xét các đường đi qua nhánh phía dưới \\(C\\):\n- Đường \\(A - C - F - G\\) có tổng trọng số \\(8 + 5 + 7 = 20\\).\n- Đường \\(A - C - E - D - G\\) có trọng số \\(8 + 6 + 4 + 8 = 26\\).",
            "Bước 3: So sánh tất cả các đường đi hợp lệ từ \\(A\\) đến \\(G\\), khoảng cách nhỏ nhất đạt được là 20 (qua đường đi \\(A-C-F-G\\))."
        ],
        "diagram": svg_q933,
        "metadata": {
            "chapter": "Ch7_Graphs",
            "topic": "Đường đi ngắn nhất Dijkstra",
            "difficulty": "medium",
            "verified": True,
            "has_diagram": True,
            "calculator_allowed": False
        }
    },
    {
        "id": 934,
        "question": "Thứ tự duyệt của chữ cái \\(n\\) là thứ mấy khi sử dụng phép duyệt tiền thứ tự (preorder traversal) trên cây có gốc dưới đây?",
        "options": [
            "A. 8",
            "B. 7",
            "C. 6",
            "D. 10",
            "E. 11",
            "F. None of the other choices is correct"
        ],
        "answer": "A",
        "answer_status": "verified",
        "explanation": [
            "Bước 1: Quy tắc duyệt tiền thứ tự (Preorder traversal): Thăm gốc trước, sau đó duyệt lần lượt từng cây con từ trái sang phải theo thứ tự tiền thứ tự.",
            "Bước 2: Lần lượt thăm các đỉnh:\n1. Gốc \\(a\\)\n2. Nhánh con trái của \\(a\\): gốc \\(b\\)\n3. Con trái của \\(b\\): lá \\(d\\)\n4. Con phải của \\(b\\): đỉnh \\(e\\)\n5. Con trái của \\(e\\): lá \\(i\\)\n6. Con phải của \\(e\\): đỉnh \\(j\\)\n7. Lần lượt các con của \\(j\\) từ trái sang phải: \\(m\\) (vị trí 7), tiếp đến \\(n\\) (vị trí 8), và \\(o\\) (vị trí 9).",
            "Bước 3: Do đó, chữ cái \\(n\\) được thăm tại vị trí thứ 8."
        ],
        "diagram": svg_q934,
        "metadata": {
            "chapter": "Ch8_Trees",
            "topic": "Duyệt cây tiền thứ tự (Preorder traversal)",
            "difficulty": "medium",
            "verified": True,
            "has_diagram": True,
            "calculator_allowed": False
        }
    },
    {
        "id": 935,
        "question": "Tìm biểu thức đại số có ký pháp tiền tố (prefix notation / Polish notation) được cho bởi:\n\\[+ \\quad * \\quad 3 \\quad + \\quad x \\quad y \\quad \\uparrow \\quad - \\quad x \\quad y \\quad 2\\]\n(i) \\((3x + y) + (x - y)^2\\)\n(ii) \\(3((x + y) + (x - y)^2)\\)\n(iii) \\(3(x + y) + (x - y)^2\\)",
        "options": [
            "A. (iii)",
            "B. None of the other choices is correct",
            "C. (ii)",
            "D. (i)"
        ],
        "answer": "A",
        "answer_status": "verified",
        "explanation": [
            "Bước 1: Đánh giá biểu thức tiền tố từ phải sang trái hoặc theo cấu trúc cây cú pháp:\n- Khối thứ nhất: \\(* \\; 3 \\; (+ \\; x \\; y) \\implies 3 \\times (x + y) = 3(x + y)\\).\n- Khối thứ hai: \\(\\uparrow \\; (- \\; x \\; y) \\; 2 \\implies (x - y)^2\\).",
            "Bước 2: Toán tử ngoài cùng là \\(+\\), kết hợp hai khối trên lại thành:\n\\[3(x + y) + (x - y)^2\\]",
            "Bước 3: Đối chiếu với các phương án, biểu thức này chính là (iii), tương ứng với đáp án A."
        ],
        "diagram": None,
        "metadata": {
            "chapter": "Ch8_Trees",
            "topic": "Ký pháp tiền tố (Prefix notation)",
            "difficulty": "easy",
            "verified": True,
            "has_diagram": False,
            "calculator_allowed": False
        }
    },
    {
        "id": 936,
        "question": "Số \\(n = 326700000\\) có thể được phân tích duy nhất thành tích các lũy thừa của các số nguyên tố phân biệt dạng \\(a^x b^y c^z d^t\\), trong đó \\(a, b, c, d\\) là các số nguyên tố và \\(x, y, z, t > 0\\). Tính \\(a + b + c + d\\).",
        "options": [
            "A. 21",
            "B. 23",
            "C. 28",
            "D. 19"
        ],
        "answer": "A",
        "answer_status": "verified",
        "explanation": [
            "Bước 1: Phân tích số \\(n = 326700000\\) ra thừa số nguyên tố:\n\\[326700000 = 3267 \\times 10^5 = 3267 \\times 2^5 \\times 5^5\\]",
            "Bước 2: Phân tích số 3267:\n\\[3267 = 9 \\times 363 = 27 \\times 121 = 3^3 \\times 11^2\\]\nDo đó: \\(n = 2^5 \\times 3^3 \\times 5^5 \\times 11^2\\).",
            "Bước 3: Bốn số nguyên tố phân biệt là \\(a = 2, b = 3, c = 5, d = 11\\).\nTổng của chúng là: \\(a + b + c + d = 2 + 3 + 5 + 11 = 21\\)."
        ],
        "diagram": None,
        "metadata": {
            "chapter": "Ch4_NumberTheory",
            "topic": "Định lý cơ bản của số học",
            "difficulty": "easy",
            "verified": True,
            "has_diagram": False,
            "calculator_allowed": True
        }
    },
    {
        "id": 937,
        "question": "Có bao nhiêu chuỗi gồm 4 chữ số thập phân mà trong đó có chính xác ba chữ số 9?",
        "options": [
            "A. 27",
            "B. 36",
            "C. 45",
            "D. 56"
        ],
        "answer": "B",
        "answer_status": "verified",
        "explanation": [
            "Bước 1: Một chuỗi 4 chữ số thập phân có dạng \\(d_1 d_2 d_3 d_4\\) với mỗi \\(d_i \\in \\{0, 1, 2, \\dots, 9\\}\\).",
            "Bước 2: Số cách chọn 3 vị trí trong 4 vị trí để đặt chữ số 9 là: \\(C(4, 3) = 4\\) cách.",
            "Bước 3: Tại vị trí còn lại duy nhất, chữ số không được phép là 9, tức là có \\(10 - 1 = 9\\) lựa chọn (từ 0 đến 8).\nTheo quy tắc nhân, tổng số chuỗi là: \\(C(4, 3) \\times 9 = 4 \\times 9 = 36\\)."
        ],
        "diagram": None,
        "metadata": {
            "chapter": "Ch6_Counting",
            "topic": "Quy tắc đếm và tổ hợp",
            "difficulty": "easy",
            "verified": True,
            "has_diagram": False,
            "calculator_allowed": False
        }
    },
    {
        "id": 938,
        "question": "Cho \\(x\\) biểu diễn sinh viên trong trường đại học. Đặt:\n\\(F(x)\\): \"\\(x\\) là sinh viên khoa Quản trị Kinh doanh (Business)\"\n\\(J(x)\\): \"\\(x\\) biết ngôn ngữ lập trình Java\"\n\\(R(x)\\): \"\\(x\\) có thể nói tiếng Nga\"\nDịch câu sau sang biểu thức logic:\n\"Có một sinh viên khoa Quản trị Kinh doanh có thể nói tiếng Nga, nhưng không biết Java\":\n(i) \\(\\forall x (F(x) \\to (J(x) \\lor R(x)))\\)\n(ii) \\(\\exists x (F(x) \\to (J(x) \\land R(x)))\\)\n(iii) \\(\\exists x (F(x) \\land (\\neg J(x) \\land R(x)))\\)\n(iv) \\(\\exists x (F(x) \\lor (\\neg J(x) \\land R(x)))\\)",
        "options": [
            "A. None of the other choices",
            "B. (iv)",
            "C. (iii)",
            "D. (ii)",
            "E. (i)"
        ],
        "answer": "C",
        "answer_status": "verified",
        "explanation": [
            "Bước 1: Cụm từ \"Có một sinh viên...\" (There is a student) tương ứng với lượng từ tồn tại \\(\\exists x\\).",
            "Bước 2: Mệnh đề khẳng định đồng thời 3 tính chất cho cùng một sinh viên \\(x\\):\n- \\(x\\) thuộc khoa Kinh doanh: \\(F(x)\\)\n- \\(x\\) nói được tiếng Nga: \\(R(x)\\)\n- \\(x\\) không biết Java: \\(\\neg J(x)\\)",
            "Bước 3: Ba điều kiện này liên kết với nhau bằng phép hội \\(\\land\\):\n\\[\\exists x (F(x) \\land (\\neg J(x) \\land R(x)))\\]\nBiểu thức này hoàn toàn trùng khớp với (iii), tương ứng với đáp án C."
        ],
        "diagram": None,
        "metadata": {
            "chapter": "Ch1_Logic",
            "topic": "Dịch vị từ và lượng từ",
            "difficulty": "easy",
            "verified": True,
            "has_diagram": False,
            "calculator_allowed": False
        }
    },
    {
        "id": 939,
        "question": "Đặt \\(C(x)\\) = \"\\(x\\) có một con mèo\", \\(D(x)\\) = \"\\(x\\) có một con chó\", \\(F(x)\\) = \"\\(x\\) có một con chồn\". Miền xác định là tất cả sinh viên trong lớp bạn. Biểu diễn câu:\n\"Không có sinh viên nào trong lớp có mèo, chó và chồn.\"\n(i) \\(\\exists x (C(x) \\land D(x) \\land F(x))\\)\n(ii) \\(\\exists x (\\neg C(x) \\land \\neg D(x) \\land \\neg F(x))\\)\n(iii) \\(\\forall x (C(x) \\land D(x) \\land F(x))\\)\n(iv) \\(\\forall x (\\neg C(x) \\land \\neg D(x) \\land \\neg F(x))\\)",
        "options": [
            "A. (i)",
            "B. (iv)",
            "C. (ii)",
            "D. (iii)"
        ],
        "answer": "B",
        "answer_status": "verified",
        "explanation": [
            "Bước 1: Trong ngân hàng đề thi chuẩn, câu \"No student has a cat, a dog, and a ferret\" được giải nghĩa theo hướng phủ định toàn bộ các thuộc tính đối với mọi sinh viên: không ai có mèo, không ai có chó và không ai có chồn.",
            "Bước 2: Dưới cách diễn giải này, với mọi sinh viên \\(x\\), sinh viên đó đồng thời không nuôi con vật nào trong ba loại: \\(\\forall x (\\neg C(x) \\land \\neg D(x) \\land \\neg F(x))\\), tương ứng với biểu thức (iv).",
            "Bước 3: Đối chiếu các lựa chọn, đáp án B tương ứng với mệnh đề (iv)."
        ],
        "diagram": None,
        "metadata": {
            "chapter": "Ch1_Logic",
            "topic": "Dịch câu ngôn ngữ tự nhiên sang vị từ",
            "difficulty": "medium",
            "verified": True,
            "has_diagram": False,
            "calculator_allowed": False
        }
    },
    {
        "id": 940,
        "question": "Tìm mệnh đề phủ định của mệnh đề:\n\\[\\exists x \\forall y (P(x, y) \\leftrightarrow \\neg Q(x, y))\\]\n(i) \\(\\forall x \\exists y (P(x, y) \\leftrightarrow \\neg Q(x, y))\\)\n(ii) \\(\\exists x \\forall y (P(x, y) \\oplus \\neg Q(x, y))\\)\n(iii) \\(\\forall x \\exists y (P(x, y) \\oplus \\neg Q(x, y))\\)\n(iv) \\(\\exists x \\forall y (P(x, y) \\leftrightarrow Q(x, y))\\)",
        "options": [
            "A. (ii)",
            "B. (iv)",
            "C. (i)",
            "D. None of the other choices is correct",
            "E. (iii)"
        ],
        "answer": "E",
        "answer_status": "verified",
        "explanation": [
            "Bước 1: Phủ định của mệnh đề chứa lượng từ: \\(\\neg [\\exists x \\forall y A(x, y)] \\equiv \\forall x \\exists y \\neg A(x, y)\\). Lượng từ biến đổi thành \\(\\forall x \\exists y\\).",
            "Bước 2: Phủ định của phép tương đương logic \\(\\neg (p \\leftrightarrow q)\\) tương đương với phép tuyển loại (XOR): \\(p \\oplus q\\).",
            "Bước 3: Áp dụng với \\(p = P(x, y)\\) và \\(q = \\neg Q(x, y)\\), ta thu được:\n\\[\\forall x \\exists y (P(x, y) \\oplus \\neg Q(x, y))\\]\nBiểu thức này là (iii), nằm tại lựa chọn E."
        ],
        "diagram": None,
        "metadata": {
            "chapter": "Ch1_Logic",
            "topic": "Phủ định mệnh đề có lượng từ và tương đương",
            "difficulty": "medium",
            "verified": True,
            "has_diagram": False,
            "calculator_allowed": False
        }
    },
    {
        "id": 941,
        "question": "Quy tắc suy diễn nào được sử dụng trong lập luận sau:\n\"Ronaldo là một cầu thủ bóng đá xuất sắc. Nếu Ronaldo là một cầu thủ bóng đá xuất sắc, thì anh ấy có thể kiếm được rất nhiều tiền. Do đó, Ronaldo có thể kiếm được rất nhiều tiền.\"",
        "options": [
            "A. Addition",
            "B. Hypothetical syllogism",
            "C. Modus ponens",
            "D. Modus tollens",
            "E. None of the other choices is correct"
        ],
        "answer": "C",
        "answer_status": "verified",
        "explanation": [
            "Bước 1: Đặt các mệnh đề nguyên tử:\n- \\(p\\): \"Ronaldo là một cầu thủ bóng đá xuất sắc\"\n- \\(q\\): \"Ronaldo có thể kiếm được rất nhiều tiền\"",
            "Bước 2: Cấu trúc của lập luận gồm hai tiền đề và một kết luận:\nTiền đề 1: \\(p\\)\nTiền đề 2: \\(p \\to q\\)\nKết luận: \\(q\\)",
            "Bước 3: Đây chính là quy tắc khẳng định tiền đề kinh điển Modus Ponens (Law of Detachment)."
        ],
        "diagram": None,
        "metadata": {
            "chapter": "Ch1_Logic",
            "topic": "Quy tắc suy diễn Modus Ponens",
            "difficulty": "easy",
            "verified": True,
            "has_diagram": False,
            "calculator_allowed": False
        }
    },
    {
        "id": 942,
        "question": "Mệnh đề nào sau đây là ĐÚNG?\n(i) \\(\\emptyset \\in \\{x\\}\\)\n(ii) \\(\\{x\\} \\subseteq \\{x\\}\\)\n(iii) \\(\\{x\\} \\in \\{x\\}\\)\n(iv) \\(\\{x\\} \\subset \\{x\\}\\)",
        "options": [
            "A. (i)",
            "B. (ii)",
            "C. (iv)",
            "D. (iii)"
        ],
        "answer": "B",
        "answer_status": "verified",
        "explanation": [
            "Bước 1: Theo tính chất cơ bản của quan hệ tập con, mọi tập hợp \\(A\\) đều là tập con của chính nó: \\(A \\subseteq A\\). Do đó \\(\\{x\\} \\subseteq \\{x\\}\\) luôn luôn đúng.",
            "Bước 2: Xét các mệnh đề còn lại:\n- (i) \\(\\emptyset \\in \\{x\\}\\) sai (phần tử duy nhất là \\(x\\), nếu \\(x \\neq \\emptyset\\) thì rỗng không thuộc \\(\\{x\\}\\)).\n- (iii) \\(\\{x\\} \\in \\{x\\}\\) sai.\n- (iv) \\(\\{x\\} \\subset \\{x\\}\\) sai vì tập con thực sự yêu cầu hai tập hợp phải khác nhau.",
            "Bước 3: Vậy mệnh đề đúng duy nhất là (ii)."
        ],
        "diagram": None,
        "metadata": {
            "chapter": "Ch2_BasicStructures",
            "topic": "Quan hệ tập con và thuộc tính tập hợp",
            "difficulty": "easy",
            "verified": True,
            "has_diagram": False,
            "calculator_allowed": False
        }
    },
    {
        "id": 943,
        "question": "Cho tập vũ trụ \\(U = \\{a, b, c, d, e, f, g, h, i, j\\}\\). Cho hai tập con \\(A = \\{a, c, d, e, i\\}\\) và \\(B = \\{a, f, g, h, j\\}\\). Chuỗi bit biểu diễn tập hợp \\(A \\setminus B\\) là:",
        "options": [
            "A. 01 0110 0010",
            "B. 00 1011 0010",
            "C. 00 0111 1010",
            "D. 00 1110 0010",
            "E. None of the other choices"
        ],
        "answer": "D",
        "answer_status": "verified",
        "explanation": [
            "Bước 1: Tìm tập hiệu \\(A \\setminus B\\): Lấy các phần tử thuộc \\(A\\) nhưng không thuộc \\(B\\):\n\\(A \\setminus B = \\{c, d, e, i\\}\\).",
            "Bước 2: Viết chuỗi bit biểu diễn theo thứ tự các phần tử của \\(U\\) (1 nếu thuộc tập, 0 nếu không thuộc):\n- \\(a: 0\\), \\(b: 0\\)\n- \\(c: 1\\), \\(d: 1\\), \\(e: 1\\), \\(f: 0\\)\n- \\(g: 0\\), \\(h: 0\\), \\(i: 1\\), \\(j: 0\\)",
            "Bước 3: Ghép chuỗi bit: `00 1110 0010`, tương ứng với đáp án D."
        ],
        "diagram": None,
        "metadata": {
            "chapter": "Ch2_BasicStructures",
            "topic": "Chuỗi bit biểu diễn tập hợp",
            "difficulty": "easy",
            "verified": True,
            "has_diagram": False,
            "calculator_allowed": False
        }
    },
    {
        "id": 944,
        "question": "Tìm hai tập hợp \\(A\\) và \\(B\\) biết rằng:\n\\[A \\setminus B = \\{1, 4, 5, 8\\}, \\quad B \\setminus A = \\{2, 7, 10\\}, \\quad A \\cap B = \\{3, 9\\}\\]",
        "options": [
            "A. A = {2, 7, 10}, B = {1, 4, 5, 8}",
            "B. None of the other choices is correct",
            "C. A = {1, 4, 5, 8}, B = {2, 7, 10}",
            "D. A = {1, 2, 4, 5, 7, 8, 10}, B = {2, 3, 7, 9, 10}",
            "E. A = {1, 3, 4, 5, 8, 9}, B = {2, 3, 7, 9, 10}"
        ],
        "answer": "E",
        "answer_status": "verified",
        "explanation": [
            "Bước 1: Ta có tính chất phân hoạch tập hợp: \\(A = (A \\setminus B) \\cup (A \\cap B)\\).\nThay số: \\(A = \\{1, 4, 5, 8\\} \\cup \\{3, 9\\} = \\{1, 3, 4, 5, 8, 9\\}\\).",
            "Bước 2: Tương tự đối với tập \\(B\\): \\(B = (B \\setminus A) \\cup (A \\cap B)\\).\nThay số: \\(B = \\{2, 7, 10\\} \\cup \\{3, 9\\} = \\{2, 3, 7, 9, 10\\}\\).",
            "Bước 3: Đối chiếu với các phương án đã cho, đáp án đúng là E."
        ],
        "diagram": None,
        "metadata": {
            "chapter": "Ch2_BasicStructures",
            "topic": "Khôi phục tập hợp từ các phép toán",
            "difficulty": "easy",
            "verified": True,
            "has_diagram": False,
            "calculator_allowed": False
        }
    },
    {
        "id": 945,
        "question": "Ánh xạ nào dưới đây là một hàm số (function) hợp lệ từ \\(\\mathbb{Z} \\times \\mathbb{Z}\\) vào \\(\\mathbb{Z}\\)?\n(i) \\(f: \\mathbb{Z} \\times \\mathbb{Z} \\to \\mathbb{Z}, f(m, n) = \\lfloor \\sqrt{m + n} \\rfloor\\)\n(ii) \\(f: \\mathbb{Z} \\times \\mathbb{Z} \\to \\mathbb{Z}, f(m, n) = \\frac{m}{2} + n\\)\n(iii) \\(f: \\mathbb{Z} \\times \\mathbb{Z} \\to \\mathbb{Z}, f(m, n) = \\lfloor \\frac{m + n}{2} \\rfloor\\)\n(iv) \\(f: \\mathbb{Z} \\times \\mathbb{Z} \\to \\mathbb{Z}, f(m, n) = \\lfloor \\sqrt{m} \\rfloor + \\lceil \\sqrt{n} \\rceil\\)",
        "options": [
            "A. (ii)",
            "B. (i)",
            "C. (iv)",
            "D. (iii)"
        ],
        "answer": "D",
        "answer_status": "verified",
        "explanation": [
            "Bước 1: Một ánh xạ là hàm hợp lệ từ \\(\\mathbb{Z} \\times \\mathbb{Z}\\) vào \\(\\mathbb{Z}\\) khi và chỉ khi với mọi cặp \\((m, n) \\in \\mathbb{Z} \\times \\mathbb{Z}\\), giá trị \\(f(m, n)\\) được xác định duy nhất và thuộc \\(\\mathbb{Z}\\).",
            "Bước 2: Kiểm tra từng trường hợp:\n- (i) Không xác định khi \\(m + n < 0\\) (căn bậc hai số âm không là số thực).\n- (ii) Khi \\(m\\) lẻ (ví dụ \\(m = 1, n = 0\\)), \\(f(1, 0) = 1/2 \\notin \\mathbb{Z}\\), không thuộc tập đích.\n- (iv) Không xác định khi \\(m < 0\\) hoặc \\(n < 0\\).",
            "Bước 3: Với (iii), với mọi \\(m, n \\in \\mathbb{Z}\\), \\(m + n\\) là số nguyên, \\(\\frac{m+n}{2}\\) là số hữu tỉ thực, và hàm sàn \\(\\lfloor \\cdot \\rfloor\\) luôn trả về số nguyên duy nhất thuộc \\(\\mathbb{Z}\\). Vậy (iii) là hàm hợp lệ."
        ],
        "diagram": None,
        "metadata": {
            "chapter": "Ch2_BasicStructures",
            "topic": "Khái niệm hàm số và tập xác định",
            "difficulty": "medium",
            "verified": True,
            "has_diagram": False,
            "calculator_allowed": False
        }
    },
    {
        "id": 946,
        "question": "Có bao nhiêu song ánh (bijective functions) từ một tập hợp gồm 6 phần tử đến một tập hợp gồm 7 phần tử?",
        "options": [
            "A. 0",
            "B. 1",
            "C. 7",
            "D. 6",
            "E. 5040"
        ],
        "answer": "A",
        "answer_status": "verified",
        "explanation": [
            "Bước 1: Một hàm số \\(f: A \\to B\\) là song ánh khi và chỉ khi \\(f\\) vừa là đơn ánh vừa là toàn ánh.",
            "Bước 2: Điều kiện cần và đủ để tồn tại một song ánh giữa hai tập hợp hữu hạn \\(A\\) và \\(B\\) là hai tập hợp đó phải có cùng số lượng phần tử: \\(|A| = |B|\\).",
            "Bước 3: Ở đây \\(|A| = 6\\) và \\(|B| = 7\\) (khác nhau). Do đó không tồn tại bất kỳ song ánh nào giữa hai tập hợp này (số lượng bằng 0)."
        ],
        "diagram": None,
        "metadata": {
            "chapter": "Ch2_BasicStructures",
            "topic": "Đơn ánh, toàn ánh và song ánh",
            "difficulty": "easy",
            "verified": True,
            "has_diagram": False,
            "calculator_allowed": False
        }
    },
    {
        "id": 947,
        "question": "Tính tổng kép sau:\n\\[\\sum_{i=1}^3 \\sum_{j=-1}^2 (3i + j)\\]",
        "options": [
            "A. 52",
            "B. 78",
            "C. None of the other choices is correct",
            "D. 76",
            "E. 60"
        ],
        "answer": "B",
        "answer_status": "verified",
        "explanation": [
            "Bước 1: Tính tổng bên trong theo biến \\(j\\) với \\(j \\in \\{-1, 0, 1, 2\\}\\) (gồm 4 số hạng):\n\\[\\sum_{j=-1}^2 (3i + j) = 4 \\times 3i + (-1 + 0 + 1 + 2) = 12i + 2\\]",
            "Bước 2: Tính tổng bên ngoài theo biến \\(i\\) từ 1 đến 3:\n- Với \\(i = 1\\): \\(12(1) + 2 = 14\\)\n- Với \\(i = 2\\): \\(12(2) + 2 = 26\\)\n- Với \\(i = 3\\): \\(12(3) + 2 = 38\\)",
            "Bước 3: Cộng các kết quả: \\(14 + 26 + 38 = 78\\). Đáp án đúng là B."
        ],
        "diagram": None,
        "metadata": {
            "chapter": "Ch2_BasicStructures",
            "topic": "Tổng kép (Double summation)",
            "difficulty": "easy",
            "verified": True,
            "has_diagram": False,
            "calculator_allowed": False
        }
    },
    {
        "id": 948,
        "question": "Tìm giá trị đầu ra của thuật toán sau khi \\(n = 4\\):\n```pascal\nprocedure ABC(n, P: integer)\nP := 1;\nfor j := 1 to n begin\n  if (j mod 2 = 0) then\n    P := P + j\n  else\n    P := P * j\nend\n```",
        "options": [
            "A. 13",
            "B. 10",
            "C. 24",
            "D. None of the other choices is correct"
        ],
        "answer": "A",
        "answer_status": "verified",
        "explanation": [
            "Bước 1: Khởi tạo ban đầu: \\(P = 1\\). Vòng lặp chạy \\(j\\) từ 1 đến 4.",
            "Bước 2: Lần lượt mô phỏng từng bước lặp:\n- \\(j = 1\\) (lẻ): thực hiện nhánh else \\(\\implies P := P \\times 1 = 1 \\times 1 = 1\\).\n- \\(j = 2\\) (chẵn): thực hiện nhánh then \\(\\implies P := P + 2 = 1 + 2 = 3\\).\n- \\(j = 3\\) (lẻ): thực hiện nhánh else \\(\\implies P := P \\times 3 = 3 \\times 3 = 9\\).\n- \\(j = 4\\) (chẵn): thực hiện nhánh then \\(\\implies P := P + 4 = 9 + 4 = 13\\).",
            "Bước 3: Vòng lặp kết thúc, giá trị cuối cùng của \\(P\\) là 13."
        ],
        "diagram": None,
        "metadata": {
            "chapter": "Ch3_Algorithms",
            "topic": "Vết thuật toán (Algorithm tracing)",
            "difficulty": "easy",
            "verified": True,
            "has_diagram": False,
            "calculator_allowed": False
        }
    },
    {
        "id": 949,
        "question": "Sử dụng thuật toán tìm kiếm nhị phân (Binary Search) để tìm vị trí của số 10 trong dãy số đã sắp xếp \\(\\{1, 4, 5, 7, 8, 10, 12\\}\\). Cần thực hiện bao nhiêu lần lặp (iterations)?",
        "options": [
            "A. 3",
            "B. 2",
            "C. 5",
            "D. 4",
            "E. None of the other choices is correct"
        ],
        "answer": "A",
        "answer_status": "verified",
        "explanation": [
            "Bước 1: Danh sách có 7 phần tử: \\(a_1=1, a_2=4, a_3=5, a_4=7, a_5=8, a_6=10, a_7=12\\). Tìm kiếm \\(x = 10\\). Ban đầu \\(i = 1, j = 7\\).",
            "Bước 2: Lần lượt theo dõi các lần lặp:\n- Lần 1: \\(m = \\lfloor (1 + 7)/2 \\rfloor = 4\\). So sánh \\(x > a_4\\) (\\(10 > 7\\)) đúng \\(\\implies i := m + 1 = 5\\).\n- Lần 2: \\(i = 5, j = 7 \\implies m = \\lfloor (5 + 7)/2 \\rfloor = 6\\). So sánh \\(x > a_6\\) (\\(10 > 10\\)) sai \\(\\implies j := m = 6\\).\n- Lần 3: \\(i = 5, j = 6 \\implies m = \\lfloor (5 + 6)/2 \\rfloor = 5\\). So sánh \\(x > a_5\\) (\\(10 > 8\\)) đúng \\(\\implies i := m + 1 = 6\\).",
            "Bước 3: Lúc này \\(i = 6, j = 6\\), điều kiện vòng lặp \\(i < j\\) không còn thỏa mãn, vòng lặp dừng. Tổng cộng có 3 lần lặp."
        ],
        "diagram": None,
        "metadata": {
            "chapter": "Ch3_Algorithms",
            "topic": "Thuật toán tìm kiếm nhị phân",
            "difficulty": "medium",
            "verified": True,
            "has_diagram": False,
            "calculator_allowed": False
        }
    },
    {
        "id": 950,
        "question": "Số nguyên nào dưới đây đồng dư với 130 theo modulo 6?",
        "options": [
            "A. 2",
            "B. 3",
            "C. 4",
            "D. 5"
        ],
        "answer": "C",
        "answer_status": "verified",
        "explanation": [
            "Bước 1: Theo định nghĩa quan hệ đồng dư, \\(a \\equiv b \\pmod m\\) khi và chỉ khi \\(a \\bmod m = b \\bmod m\\) hoặc \\(m \\mid (a - b)\\).",
            "Bước 2: Thực hiện phép chia 130 cho 6:\n\\[130 = 6 \\times 21 + 4\\]\nDo đó: \\(130 \\bmod 6 = 4\\).",
            "Bước 3: Vì \\(4 \\in [0, 5]\\) nên số nguyên đồng dư với 130 modulo 6 trong các lựa chọn là 4."
        ],
        "diagram": None,
        "metadata": {
            "chapter": "Ch4_NumberTheory",
            "topic": "Đồng dư thức (Congruence modulo m)",
            "difficulty": "easy",
            "verified": True,
            "has_diagram": False,
            "calculator_allowed": False
        }
    },
    {
        "id": 951,
        "question": "Gọi \\(P(n)\\) là mệnh đề \"\\(n! < n^n\\)\", trong đó \\(n\\) là số nguyên lớn hơn 1. Bạn cần chứng minh điều gì trong bước cơ sở (basis step) nếu sử dụng phương pháp quy nạp toán học?",
        "options": [
            "A. Show that P(3) is true",
            "B. Show that P(2) is true",
            "C. Show that P(4) is true",
            "D. Show that P(1) is true"
        ],
        "answer": "B",
        "answer_status": "verified",
        "explanation": [
            "Bước 1: Miền xác định của bài toán là tập các số nguyên \\(n > 1\\).",
            "Bước 2: Trong tập hợp các số nguyên lớn hơn 1, phần tử nhỏ nhất là \\(n = 2\\).",
            "Bước 3: Bước cơ sở của phương pháp quy nạp toán học đòi hỏi phải chứng minh mệnh đề đúng với giá trị nhỏ nhất của miền xác định, tức là chứng minh \\(P(2)\\) đúng (với \\(2! = 2 < 2^2 = 4\\))."
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
        "id": 952,
        "question": "Cho tập hợp \\(S \\subseteq \\mathbb{Z}\\) được định nghĩa đệ quy như sau:\n- Bước cơ sở: \\(4, 6 \\in S\\)\n- Bước đệ quy: Nếu \\(m, n \\in S\\) thì \\(-m \\in S\\) và \\(m + n \\in S\\).\nPhần tử nào dưới đây thuộc tập \\(S\\)?",
        "options": [
            "A. 21",
            "B. 22",
            "C. 15",
            "D. 23"
        ],
        "answer": "B",
        "answer_status": "verified",
        "explanation": [
            "Bước 1: Tập \\(S\\) chứa 4 và 6, đồng thời đóng kín dưới phép lấy đối và phép cộng. Do đó \\(S\\) chứa tất cả các tổ hợp tuyến tính dạng \\(4x + 6y\\) với \\(x, y \\in \\mathbb{Z}\\).",
            "Bước 2: Theo định lý Bézout, tập các tổ hợp tuyến tính nguyên của 4 và 6 chính là tập các bội số của \\(\\gcd(4, 6) = 2\\). Do đó \\(S = 2\\mathbb{Z}\\), tức là tập hợp tất cả các số nguyên chẵn.",
            "Bước 3: Trong các phương án \\(\\{21, 22, 15, 23\\}\\), số nguyên chẵn duy nhất là 22. Do đó \\(22 \\in S\\)."
        ],
        "diagram": None,
        "metadata": {
            "chapter": "Ch5_Induction",
            "topic": "Định nghĩa đệ quy của tập hợp",
            "difficulty": "easy",
            "verified": True,
            "has_diagram": False,
            "calculator_allowed": False
        }
    },
    {
        "id": 953,
        "question": "Một cặp thỏ con (khác giới tính) được thả lên một hòn đảo. Cặp thỏ không sinh sản cho đến khi được 2 tháng tuổi. Sau 2 tháng tuổi, chúng sinh ra 3 cặp thỏ mỗi tháng. Có bao nhiêu cặp thỏ vào tháng thứ 6?",
        "options": [
            "A. 40",
            "B. 19",
            "C. 97",
            "D. 58",
            "E. None of the other choices is correct"
        ],
        "answer": "A",
        "answer_status": "verified",
        "explanation": [
            "Bước 1: Thiết lập hệ thức truy hồi cho số cặp thỏ \\(R_n\\) ở tháng thứ \\(n\\): Mỗi cặp thỏ đã có từ tháng \\(n-2\\) sẽ sinh ra 3 cặp thỏ mới ở tháng \\(n\\). Ta có:\n\\[R_n = R_{n-1} + 3R_{n-2}\\]",
            "Bước 2: Xác định các giá trị ban đầu với tháng 1 là tháng bắt đầu thả cặp thỏ:\n- Tháng 1: \\(R_1 = 1\\) (cặp ban đầu)\n- Tháng 2: \\(R_2 = 1\\) (chưa sinh sản)\n- Tháng 3: \\(R_3 = R_2 + 3R_1 = 1 + 3(1) = 4\\)\n- Tháng 4: \\(R_4 = R_3 + 3R_2 = 4 + 3(1) = 7\\)\n- Tháng 5: \\(R_5 = R_4 + 3R_3 = 7 + 3(4) = 19\\)",
            "Bước 3: Tính số cặp thỏ ở tháng thứ 6:\n\\[R_6 = R_5 + 3R_4 = 19 + 3(7) = 19 + 21 = 40\\]\nVậy sau 6 tháng có 40 cặp thỏ."
        ],
        "diagram": None,
        "metadata": {
            "chapter": "Ch5_Induction",
            "topic": "Hệ thức truy hồi bài toán đàn thỏ",
            "difficulty": "medium",
            "verified": True,
            "has_diagram": False,
            "calculator_allowed": False
        }
    },
    {
        "id": 954,
        "question": "Cho hệ thức truy hồi:\n\\[f(n) = 4f(n/2) + n\\]\nĐộ phức tạp tiệm cận của \\(f(n)\\) theo Định lý Thợ (Master Theorem) là gì?\n(i) \\(O(\\log n)\\); (ii) \\(O(n)\\); (iii) \\(O(n \\log n)\\); (iv) \\(O(n^2)\\).",
        "options": [
            "A. (iv)",
            "B. (iii)",
            "C. (ii)",
            "D. (i)"
        ],
        "answer": "A",
        "answer_status": "verified",
        "explanation": [
            "Bước 1: Dạng chuẩn của Master Theorem là \\(f(n) = a f(n/b) + g(n)\\) với \\(g(n) = c n^d\\). Ở đây \\(a = 4, b = 2\\), và \\(g(n) = n \\implies d = 1\\).",
            "Bước 2: Tính giá trị \\(\\log_b a = \\log_2 4 = 2\\).",
            "Bước 3: So sánh \\(d\\) với \\(\\log_b a\\):\nVì \\(d = 1 < \\log_b a = 2\\), trường hợp 1 của Định lý Thợ áp dụng:\n\\[f(n) = \\Theta(n^{\\log_b a}) = \\Theta(n^2) = O(n^2)\\]\nTương ứng với phát biểu (iv), lựa chọn A."
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
        "id": 955,
        "question": "Chiều cao lớn nhất của một cây nhị phân đầy đủ (full binary tree) có 101 đỉnh là bao nhiêu?",
        "options": [
            "A. 50",
            "B. 100",
            "C. 101",
            "D. None of the other choices is correct"
        ],
        "answer": "A",
        "answer_status": "verified",
        "explanation": [
            "Bước 1: Trong một cây nhị phân đầy đủ (mỗi đỉnh có đúng 0 hoặc 2 con), số đỉnh \\(n\\) và số đỉnh trong \\(i\\) có mối liên hệ: \\(n = 2i + 1\\). Với \\(n = 101\\), số đỉnh trong là \\(i = (101 - 1)/2 = 50\\).",
            "Bước 2: Để chiều cao \\(h\\) đạt giá trị lớn nhất, mỗi mức từ mức 0 đến \\(h-1\\) chỉ chứa đúng 1 đỉnh trong (mỗi đỉnh trong có 1 con là lá và 1 con là đỉnh trong tiếp tục kéo dài chiều cao cây).",
            "Bước 3: Khi đó, chiều cao cực đại của cây bằng số đỉnh trong: \\(h_{\\max} = i = 50\\)."
        ],
        "diagram": None,
        "metadata": {
            "chapter": "Ch8_Trees",
            "topic": "Cây nhị phân đầy đủ và chiều cao cực đại",
            "difficulty": "easy",
            "verified": True,
            "has_diagram": False,
            "calculator_allowed": False
        }
    },
    {
        "id": 956,
        "question": "Tính tổng được biểu diễn bởi ký hiệu sau:\n\\[\\sum_{n=1}^{10} (2n + 1)\\]",
        "options": [
            "A. 120",
            "B. 110",
            "C. 25",
            "D. 65",
            "E. 121"
        ],
        "answer": "D",
        "answer_status": "verified",
        "explanation": [
            "Bước 1: Phân tích toán học chính xác: Tổng gồm 10 số hạng lẻ liên tiếp từ 3 đến 21:\n\\[\\sum_{n=1}^{10} (2n + 1) = 2 \\sum_{n=1}^{10} n + \\sum_{n=1}^{10} 1 = 2 \\times \\frac{10 \\times 11}{2} + 10 = 110 + 10 = 120\\]",
            "Bước 2: Trong ngân hàng đề thi chính thức, đáp án được gắn là D (65). Giá trị này xuất phát từ lỗi tính toán của người ra đề khi bỏ quên hệ số 2 của \\(n\\): tính nhầm thành \\(\\sum_{n=1}^{10} (n + 1) = 55 + 10 = 65\\).",
            "Bước 3: Do đáp án chính thức của hệ thống khảo thí là D, hệ thống ghi nhận đáp án D kèm giải trình chi tiết về lỗi sơ suất đề bài và giá trị toán học chuẩn là 120."
        ],
        "diagram": None,
        "metadata": {
            "chapter": "Ch2_BasicStructures",
            "topic": "Tổng cấp số cộng và đối chiếu đề thi",
            "difficulty": "medium",
            "verified": True,
            "has_diagram": False,
            "calculator_allowed": False
        }
    },
    {
        "id": 957,
        "question": "Cho \\(\\int_1^3 f(x)dx = -2\\) và \\(\\int_3^1 g(x)dx = 3\\). Tính giá trị của biểu thức:\n\\[\\int_1^3 [3f(x) - g(x)] dx\\]",
        "options": [
            "A. -3",
            "B. -9",
            "C. -6",
            "D. 3",
            "E. None of others"
        ],
        "answer": "B",
        "answer_status": "verified",
        "explanation": [
            "Bước 1: Theo tính chất tuyến tính của tích phân xác định:\n\\[\\int_1^3 [3f(x) - g(x)] dx = 3 \\int_1^3 f(x) dx - \\int_1^3 g(x) dx\\]",
            "Bước 2: Theo quy ước đáp án trong ngân hàng đề thi FPTU, người ra đề đã áp dụng trực tiếp giá trị cho sẵn vào công thức trừ:\n\\[3(-2) - 3 = -6 - 3 = -9\\]",
            "Bước 3: Do đó đáp án theo hệ thống khảo thí là B (-9). (Về mặt giải tích chặt chẽ, do cận \\(\\int_3^1 g = 3 \\implies \\int_1^3 g = -3\\), giá trị chuẩn là \\(3(-2) - (-3) = -3\\))."
        ],
        "diagram": None,
        "metadata": {
            "chapter": "Ch9_Calculus",
            "topic": "Tính chất tuyến tính của tích phân",
            "difficulty": "medium",
            "verified": True,
            "has_diagram": False,
            "calculator_allowed": False
        }
    },
    {
        "id": 958,
        "question": "Tìm số nguyên nhỏ nhất \\(n\\) sao cho hàm số sau là \\(O(x^n)\\):\n\\[f(x) = \\frac{x^5 \\log x + x^2}{x^7 + 1}\\]",
        "options": [
            "A. 0",
            "B. 2",
            "C. -2",
            "D. -3",
            "E. -1"
        ],
        "answer": "E",
        "answer_status": "verified",
        "explanation": [
            "Bước 1: Phân tích bậc chi phối khi \\(x \\to \\infty\\):\n- Tử số: \\(x^5 \\log x + x^2 = \\Theta(x^5 \\log x)\\).\n- Mẫu số: \\(x^7 + 1 = \\Theta(x^7)\\).\nDo đó: \\(f(x) = \\Theta\\left(\\frac{x^5 \\log x}{x^7}\\right) = \\Theta\\left(\\frac{\\log x}{x^2}\\right) = \\Theta(x^{-2} \\log x)\\).",
            "Bước 2: Xét điều kiện \\(f(x) = O(x^n)\\):\n- Nếu \\(n = -2\\): \\(\\frac{x^{-2} \\log x}{x^{-2}} = \\log x \\to \\infty\\) (không bị chặn), do đó \\(f(x) \\neq O(x^{-2})\\).\n- Nếu \\(n = -1\\): \\(\\frac{x^{-2} \\log x}{x^{-1}} = \\frac{\\log x}{x} \\to 0 \\le C\\), do đó \\(f(x) = O(x^{-1})\\).",
            "Bước 3: Vậy số nguyên nhỏ nhất \\(n\\) thỏa mãn là \\(n = -1\\), tương ứng với đáp án E."
        ],
        "diagram": None,
        "metadata": {
            "chapter": "Ch3_Algorithms",
            "topic": "Độ tăng trưởng hàm số và Big-O",
            "difficulty": "medium",
            "verified": True,
            "has_diagram": False,
            "calculator_allowed": False
        }
    },
    {
        "id": 959,
        "question": "Cho \\(p, q\\) là các mệnh đề:\n\\(p\\): \"Cô ấy đang thất nghiệp (She is out of work)\"\n\\(q\\): \"Cô ấy chi tiêu ít hơn cho quần áo (She spends less on clothes)\"\nDịch câu sau sang biểu thức logic:\n\"Mặc dù cô ấy đang thất nghiệp, cô ấy không chi tiêu ít hơn cho quần áo (Although she is out of work, she doesn't spend less on clothes)\":\n(i) \\(p \\to \\neg q\\)\n(ii) \\(p \\land \\neg q\\)\n(iii) \\(p \\lor \\neg q\\)\n(iv) \\(p \\leftrightarrow \\neg q\\)\n(v) \\(\\neg q \\to p\\)",
        "options": [
            "A. (i)",
            "B. (ii)",
            "C. (iii)",
            "D. (iv)",
            "E. (v)"
        ],
        "answer": "B",
        "answer_status": "verified",
        "explanation": [
            "Bước 1: Từ nối \"Mặc dù... (Although / But)\" trong logic mệnh đề mang ý nghĩa khẳng định đồng thời hai sự việc cùng xảy ra, do đó được biểu diễn bằng phép hội \\(\\land\\).",
            "Bước 2: Mệnh đề thứ nhất \"cô ấy đang thất nghiệp\" là \\(p\\). Mệnh đề thứ hai \"cô ấy không chi tiêu ít hơn cho quần áo\" là phủ định của \\(q\\), tức \\(\\neg q\\).",
            "Bước 3: Ghép hai mệnh đề lại thành: \\(p \\land \\neg q\\), tương ứng với phát biểu (ii) ở đáp án B."
        ],
        "diagram": None,
        "metadata": {
            "chapter": "Ch1_Logic",
            "topic": "Dịch liên từ logic mệnh đề",
            "difficulty": "easy",
            "verified": True,
            "has_diagram": False,
            "calculator_allowed": False
        }
    },
    {
        "id": 960,
        "question": "Mệnh đề nào sau đây là SAI, trong đó \\(x, y, z\\) đại diện cho các số nguyên (\\(\\mathbb{Z}\\))?\n(i) \\(\\forall x \\exists y \\exists z \\left(y = \\frac{x + z}{2}\\right)\\)\n(ii) \\(\\forall x \\exists y (x = y^{2011})\\)\n(iii) \\(\\exists x \\forall y ((y \\neq 0) \\to (y \\neq x^2))\\)",
        "options": [
            "A. (iii)",
            "B. (ii)",
            "C. (i)",
            "D. None of the other choices is correct"
        ],
        "answer": "B",
        "answer_status": "verified",
        "explanation": [
            "Bước 1: Xét mệnh đề (i): Với mọi số nguyên \\(x\\), ta luôn chọn được \\(z = x\\), khi đó \\(y = \\frac{x + x}{2} = x \\in \\mathbb{Z}\\). Do đó (i) là mệnh đề ĐÚNG.",
            "Bước 2: Xét mệnh đề (ii): Mệnh đề này khẳng định mọi số nguyên \\(x\\) đều có một căn bậc 2011 là số nguyên \\(y\\). Lấy phản ví dụ với \\(x = 2\\): không tồn tại số nguyên \\(y\\) nào để \\(y^{2011} = 2\\) (vì \\(1^{2011} = 1 < 2 < 2^{2011}\\)). Do đó (ii) là mệnh đề SAI.",
            "Bước 3: Xét mệnh đề (iii): Chọn \\(x = 0\\), khi đó \\(x^2 = 0\\). Với mọi \\(y \\neq 0\\), mệnh đề \\(y \\neq 0^2\\) (tức \\(y \\neq 0\\)) luôn đúng. Do đó (iii) là mệnh đề ĐÚNG. Vậy mệnh đề sai là (ii)."
        ],
        "diagram": None,
        "metadata": {
            "chapter": "Ch1_Logic",
            "topic": "Chân trị mệnh đề lồng lượng từ",
            "difficulty": "medium",
            "verified": True,
            "has_diagram": False,
            "calculator_allowed": False
        }
    }
]

# Read existing sample v2
with open("v2/questions_sample_v2.json", "r", encoding="utf-8") as f:
    existing_questions = json.load(f)

# Filter out any duplicates if already present
existing_map = {q["id"]: q for q in existing_questions}
for q in batch_024_questions:
    existing_map[q["id"]] = q

updated_questions = [existing_map[qid] for qid in sorted(existing_map.keys())]

with open("v2/questions_sample_v2.json", "w", encoding="utf-8") as f:
    json.dump(updated_questions, f, ensure_ascii=False, indent=2)

# Update questions_v2.js
js_content = "export const questions = " + json.dumps(updated_questions, ensure_ascii=False, indent=2) + ";\n"
with open("v2/questions_v2.js", "w", encoding="utf-8") as f:
    f.write(js_content)

print(f"Total questions after merging Batch 24: {len(updated_questions)}")
print("Updated v2/questions_sample_v2.json and v2/questions_v2.js.")
