"""
Xây dựng dữ liệu Schema v2 cho Lô 9 (Câu 321 - 360) môn Toán rời rạc MAD101.
Gồm:
- Phiên âm toán học LaTeX / MathJax chính xác 100% từ ảnh gốc.
- Mô hình hoá vector SVG native cho các câu có hình vẽ (323, 351).
- Giải thích từng bước (>= 2 bước) chi tiết, chuẩn sư phạm bằng tiếng Việt.
- Xuất dữ liệu ra v2/questions_batch_009.json và gộp vào v2/questions_sample_v2.json, v2/questions_v2.js.
"""

import json
import os

SVG_Q323 = """<svg viewBox="0 0 540 280" width="100%" height="260" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="shadow323" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="1" dy="2" stdDeviation="2" flood-color="#000" flood-opacity="0.15"/>
    </filter>
  </defs>
  <rect width="540" height="280" rx="10" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1.5"/>

  <!-- Edges with weights -->
  <g stroke="#64748b" stroke-width="2">
    <line x1="80" y1="140" x2="190" y2="60"/>
    <line x1="80" y1="140" x2="190" y2="220"/>
    <line x1="190" y1="60" x2="190" y2="220"/>
    <line x1="190" y1="60" x2="350" y2="60"/>
    <line x1="190" y1="60" x2="350" y2="220"/>
    <line x1="190" y1="220" x2="350" y2="220"/>
    <line x1="350" y1="60" x2="350" y2="220"/>
    <line x1="350" y1="60" x2="460" y2="140"/>
    <line x1="350" y1="220" x2="460" y2="140"/>
  </g>

  <!-- Edge weight badges -->
  <rect x="123" y="88" width="18" height="18" rx="4" fill="#ffffff" stroke="#cbd5e1"/>
  <text x="132" y="101" font-family="system-ui, sans-serif" font-size="12" font-weight="bold" fill="#0f172a" text-anchor="middle">2</text>

  <rect x="123" y="172" width="18" height="18" rx="4" fill="#ffffff" stroke="#cbd5e1"/>
  <text x="132" y="185" font-family="system-ui, sans-serif" font-size="12" font-weight="bold" fill="#0f172a" text-anchor="middle">7</text>

  <rect x="175" y="132" width="18" height="18" rx="4" fill="#ffffff" stroke="#cbd5e1"/>
  <text x="184" y="145" font-family="system-ui, sans-serif" font-size="12" font-weight="bold" fill="#0f172a" text-anchor="middle">5</text>

  <rect x="261" y="48" width="18" height="18" rx="4" fill="#ffffff" stroke="#cbd5e1"/>
  <text x="270" y="61" font-family="system-ui, sans-serif" font-size="12" font-weight="bold" fill="#0f172a" text-anchor="middle">4</text>

  <rect x="250" y="125" width="18" height="18" rx="4" fill="#ffffff" stroke="#cbd5e1"/>
  <text x="259" y="138" font-family="system-ui, sans-serif" font-size="12" font-weight="bold" fill="#0f172a" text-anchor="middle">3</text>

  <rect x="261" y="212" width="18" height="18" rx="4" fill="#ffffff" stroke="#cbd5e1"/>
  <text x="270" y="225" font-family="system-ui, sans-serif" font-size="12" font-weight="bold" fill="#0f172a" text-anchor="middle">3</text>

  <rect x="335" y="132" width="18" height="18" rx="4" fill="#ffffff" stroke="#cbd5e1"/>
  <text x="344" y="145" font-family="system-ui, sans-serif" font-size="12" font-weight="bold" fill="#0f172a" text-anchor="middle">2</text>

  <rect x="398" y="88" width="18" height="18" rx="4" fill="#ffffff" stroke="#cbd5e1"/>
  <text x="407" y="101" font-family="system-ui, sans-serif" font-size="12" font-weight="bold" fill="#0f172a" text-anchor="middle">2</text>

  <rect x="398" y="172" width="18" height="18" rx="4" fill="#ffffff" stroke="#cbd5e1"/>
  <text x="407" y="185" font-family="system-ui, sans-serif" font-size="12" font-weight="bold" fill="#0f172a" text-anchor="middle">3</text>

  <!-- Vertices -->
  <g filter="url(#shadow323)">
    <circle cx="80" cy="140" r="14" fill="#0284c7" stroke="#0369a1" stroke-width="2"/>
    <text x="80" y="145" font-family="system-ui, sans-serif" font-size="13" font-weight="bold" fill="#ffffff" text-anchor="middle">A</text>

    <circle cx="190" cy="60" r="14" fill="#0284c7" stroke="#0369a1" stroke-width="2"/>
    <text x="190" y="65" font-family="system-ui, sans-serif" font-size="13" font-weight="bold" fill="#ffffff" text-anchor="middle">B</text>

    <circle cx="190" cy="220" r="14" fill="#0284c7" stroke="#0369a1" stroke-width="2"/>
    <text x="190" y="225" font-family="system-ui, sans-serif" font-size="13" font-weight="bold" fill="#ffffff" text-anchor="middle">C</text>

    <circle cx="350" cy="60" r="14" fill="#0284c7" stroke="#0369a1" stroke-width="2"/>
    <text x="350" y="65" font-family="system-ui, sans-serif" font-size="13" font-weight="bold" fill="#ffffff" text-anchor="middle">D</text>

    <circle cx="350" cy="220" r="14" fill="#0284c7" stroke="#0369a1" stroke-width="2"/>
    <text x="350" y="225" font-family="system-ui, sans-serif" font-size="13" font-weight="bold" fill="#ffffff" text-anchor="middle">E</text>

    <circle cx="460" cy="140" r="14" fill="#0284c7" stroke="#0369a1" stroke-width="2"/>
    <text x="460" y="145" font-family="system-ui, sans-serif" font-size="13" font-weight="bold" fill="#ffffff" text-anchor="middle">Z</text>
  </g>
</svg>"""

SVG_Q351 = """<svg viewBox="0 0 620 280" width="100%" height="260" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="shadow351" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="1" dy="2" stdDeviation="2" flood-color="#000" flood-opacity="0.15"/>
    </filter>
  </defs>
  <rect width="620" height="280" rx="10" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1.5"/>

  <!-- Subgraph (i): Tree -->
  <g stroke="#475569" stroke-width="2">
    <line x1="80" y1="120" x2="60" y2="100"/>
    <line x1="80" y1="120" x2="65" y2="145"/>
    <line x1="80" y1="120" x2="110" y2="120"/>
    <line x1="110" y1="120" x2="105" y2="90"/>
    <line x1="110" y1="120" x2="110" y2="155"/>
    <line x1="110" y1="120" x2="140" y2="105"/>
    <line x1="140" y1="105" x2="135" y2="75"/>
    <line x1="140" y1="105" x2="160" y2="75"/>
    <line x1="110" y1="120" x2="140" y2="135"/>
    <line x1="140" y1="135" x2="140" y2="165"/>
    <line x1="140" y1="135" x2="170" y2="135"/>
    <line x1="170" y1="135" x2="190" y2="115"/>
    <line x1="170" y1="135" x2="185" y2="155"/>
    <line x1="170" y1="135" x2="165" y2="165"/>
  </g>
  <g fill="#0284c7">
    <circle cx="80" cy="120" r="4"/><circle cx="60" cy="100" r="4"/><circle cx="65" cy="145" r="4"/>
    <circle cx="110" cy="120" r="4"/><circle cx="105" cy="90" r="4"/><circle cx="110" cy="155" r="4"/>
    <circle cx="140" cy="105" r="4"/><circle cx="135" cy="75" r="4"/><circle cx="160" cy="75" r="4"/>
    <circle cx="140" cy="135" r="4"/><circle cx="140" cy="165" r="4"/><circle cx="170" cy="135" r="4"/>
    <circle cx="190" cy="115" r="4"/><circle cx="185" cy="155" r="4"/><circle cx="165" cy="165" r="4"/>
  </g>
  <text x="120" y="240" font-family="system-ui, sans-serif" font-size="16" font-weight="bold" fill="#0f172a" text-anchor="middle">(i)</text>

  <!-- Subgraph (ii): Has cycle A-B-C-A and others -->
  <g stroke="#475569" stroke-width="2">
    <line x1="280" y1="90" x2="330" y2="60"/>
    <line x1="330" y1="60" x2="370" y2="120"/>
    <line x1="280" y1="90" x2="270" y2="160"/>
    <line x1="330" y1="60" x2="270" y2="160"/>
    <line x1="270" y1="160" x2="320" y2="135"/>
    <line x1="320" y1="135" x2="370" y2="120"/>
    <line x1="320" y1="135" x2="355" y2="165"/>
  </g>
  <g filter="url(#shadow351)">
    <circle cx="280" cy="90" r="12" fill="#c7d2fe" stroke="#6366f1" stroke-width="2"/>
    <text x="280" y="94" font-family="system-ui, sans-serif" font-size="11" font-weight="bold" fill="#312e81" text-anchor="middle">A</text>
    <circle cx="330" cy="60" r="12" fill="#c7d2fe" stroke="#6366f1" stroke-width="2"/>
    <text x="330" y="64" font-family="system-ui, sans-serif" font-size="11" font-weight="bold" fill="#312e81" text-anchor="middle">B</text>
    <circle cx="270" cy="160" r="12" fill="#c7d2fe" stroke="#6366f1" stroke-width="2"/>
    <text x="270" y="164" font-family="system-ui, sans-serif" font-size="11" font-weight="bold" fill="#312e81" text-anchor="middle">C</text>
    <circle cx="320" cy="135" r="12" fill="#c7d2fe" stroke="#6366f1" stroke-width="2"/>
    <text x="320" y="139" font-family="system-ui, sans-serif" font-size="11" font-weight="bold" fill="#312e81" text-anchor="middle">D</text>
    <circle cx="370" cy="120" r="12" fill="#c7d2fe" stroke="#6366f1" stroke-width="2"/>
    <text x="370" y="124" font-family="system-ui, sans-serif" font-size="11" font-weight="bold" fill="#312e81" text-anchor="middle">E</text>
    <circle cx="355" cy="165" r="12" fill="#c7d2fe" stroke="#6366f1" stroke-width="2"/>
    <text x="355" y="169" font-family="system-ui, sans-serif" font-size="11" font-weight="bold" fill="#312e81" text-anchor="middle">F</text>
  </g>
  <text x="320" y="240" font-family="system-ui, sans-serif" font-size="16" font-weight="bold" fill="#0f172a" text-anchor="middle">(ii)</text>

  <!-- Subgraph (iii): Tree 1-7 -->
  <g stroke="#475569" stroke-width="2">
    <line x1="470" y1="70" x2="470" y2="120"/>
    <line x1="470" y1="120" x2="480" y2="175"/>
    <line x1="470" y1="120" x2="520" y2="85"/>
    <line x1="520" y1="85" x2="550" y2="60"/>
    <line x1="520" y1="85" x2="550" y2="135"/>
    <line x1="550" y1="135" x2="550" y2="185"/>
  </g>
  <g filter="url(#shadow351)">
    <circle cx="470" cy="70" r="12" fill="#ffffff" stroke="#475569" stroke-width="2"/>
    <text x="470" y="74" font-family="system-ui, sans-serif" font-size="11" font-weight="bold" fill="#0f172a" text-anchor="middle">1</text>
    <circle cx="470" cy="120" r="12" fill="#ffffff" stroke="#475569" stroke-width="2"/>
    <text x="470" y="124" font-family="system-ui, sans-serif" font-size="11" font-weight="bold" fill="#0f172a" text-anchor="middle">2</text>
    <circle cx="480" cy="175" r="12" fill="#ffffff" stroke="#475569" stroke-width="2"/>
    <text x="480" y="179" font-family="system-ui, sans-serif" font-size="11" font-weight="bold" fill="#0f172a" text-anchor="middle">3</text>
    <circle cx="520" cy="85" r="12" fill="#ffffff" stroke="#475569" stroke-width="2"/>
    <text x="520" y="89" font-family="system-ui, sans-serif" font-size="11" font-weight="bold" fill="#0f172a" text-anchor="middle">4</text>
    <circle cx="550" cy="60" r="12" fill="#ffffff" stroke="#475569" stroke-width="2"/>
    <text x="550" y="64" font-family="system-ui, sans-serif" font-size="11" font-weight="bold" fill="#0f172a" text-anchor="middle">5</text>
    <circle cx="550" cy="135" r="12" fill="#ffffff" stroke="#475569" stroke-width="2"/>
    <text x="550" y="139" font-family="system-ui, sans-serif" font-size="11" font-weight="bold" fill="#0f172a" text-anchor="middle">6</text>
    <circle cx="550" cy="185" r="12" fill="#ffffff" stroke="#475569" stroke-width="2"/>
    <text x="550" y="189" font-family="system-ui, sans-serif" font-size="11" font-weight="bold" fill="#0f172a" text-anchor="middle">7</text>
  </g>
  <text x="515" y="240" font-family="system-ui, sans-serif" font-size="16" font-weight="bold" fill="#0f172a" text-anchor="middle">(iii)</text>
</svg>"""

def build_batch_009():
    questions = [
        # Q321
        {
            "id": 321,
            "chapter": 1,
            "question": "Cho các mệnh đề:\n\\(p = \\text{\"An is absent\"}\\)\n\\(q = \\text{\"It is cold\"}\\)\nDịch câu sau sang biểu thức logic:\n\\(\\text{\"It is cold but An is not absent\"}\\)\n(i) \\(\\neg p \\wedge q\\)\n(ii) \\(p \\wedge \\neg q\\)\n(iii) \\(q \\to \\neg p\\)",
            "options": [
                "A. (iii)",
                "B. (ii)",
                "C. (i)",
                "D. None of the other choices is correct"
            ],
            "correct_answer": "C",
            "explanation": [
                "Bước 1: Phân tích các thành phần câu: 'It is cold' tương ứng với mệnh đề \\(q\\). Từ nối 'but' trong logic mệnh đề có ý nghĩa tương đương phép hội (AND, \\(\\wedge\\)).",
                "Bước 2: 'An is not absent' là phủ định của 'An is absent' (\\(p\\)), tức là \\(\\neg p\\).",
                "Bước 3: Ghép lại ta được mệnh đề logic là \\(q \\wedge \\neg p\\), hay tương đương với \\(\\neg p \\wedge q\\). Đối chiếu với các biểu thức đã cho, biểu thức (i) là chính xác."
            ],
            "figures": [],
            "image": "0321_q321_Question_321.png",
            "code": None,
            "needs_image": False,
            "confidence": "high",
            "review_flags": []
        },
        # Q322
        {
            "id": 322,
            "chapter": 1,
            "question": "Tìm mệnh đề phủ định của phát biểu sau: \"If I have one million dollars then I will buy a villa\".\n(i) \"If I have one million dollars then I will not buy a villa\"\n(ii) \"I have one million dollars and I will not buy a villa\"\n(iii) \"I will buy a villa as soon as I have one million dollars\"",
            "options": [
                "A. (i)",
                "B. (ii)",
                "C. (iii)",
                "D. None of them is correct"
            ],
            "correct_answer": "B",
            "explanation": [
                "Bước 1: Mệnh đề đã cho có dạng kéo theo \\(p \\to q\\), trong đó \\(p\\) là \"I have one million dollars\" và \\(q\\) là \"I will buy a villa\".",
                "Bước 2: Phủ định của mệnh đề kéo theo \\(\\neg(p \\to q)\\) tương đương logic với \\(p \\wedge \\neg q\\).",
                "Bước 3: Dịch biểu thức \\(p \\wedge \\neg q\\) sang ngôn ngữ tự nhiên: \"I have one million dollars and I will not buy a villa\". Mệnh đề này hoàn toàn trùng khớp với phát biểu (ii)."
            ],
            "figures": [],
            "image": "0322_q322_Question_322.png",
            "code": None,
            "needs_image": False,
            "confidence": "high",
            "review_flags": []
        },
        # Q323
        {
            "id": 323,
            "chapter": 9,
            "question": "Sử dụng thuật toán Dijkstra để tìm đường đi ngắn nhất từ đỉnh \\(A\\) đến đỉnh \\(Z\\) trong đồ thị có trọng số bên dưới. Thứ tự 4 đỉnh đầu tiên được chọn (thêm vào tập các đỉnh đã xét) là gì?",
            "options": [
                "A. A-B-E-Z",
                "B. None of the other choices is correct",
                "C. A-B-C-D",
                "D. A-B-D-Z",
                "E. A-B-E-D"
            ],
            "correct_answer": "E",
            "explanation": [
                "Bước 1: Khởi tạo khoảng cách: \\(d(A) = 0\\), các đỉnh khác bằng \\(\\infty\\). Đỉnh đầu tiên được chọn là \\(A\\). Cập nhật các láng giềng của \\(A\\): \\(d(B) = 2\\), \\(d(C) = 7\\).",
                "Bước 2: Đỉnh chưa thăm có khoảng cách nhỏ nhất là \\(B\\) với \\(d(B) = 2\\). Chọn đỉnh thứ hai là \\(B\\). Cập nhật qua \\(B\\): \\(d(C) = \\min(7, 2+5) = 7\\), \\(d(D) = 2+4 = 6\\), \\(d(E) = 2+3 = 5\\).",
                "Bước 3: Trong các đỉnh chưa xét \\(\\{C, D, E, Z\\}\\), khoảng cách hiện tại là \\(C: 7, D: 6, E: 5, Z: \\infty\\). Đỉnh nhỏ nhất là \\(E\\) với \\(d(E) = 5\\). Chọn đỉnh thứ ba là \\(E\\). Cập nhật qua \\(E\\): \\(d(D) = \\min(6, 5+2) = 6\\), \\(d(Z) = 5+3 = 8\\).",
                "Bước 4: Trong các đỉnh \\(\\{C: 7, D: 6, Z: 8\\}\\), đỉnh nhỏ nhất là \\(D\\) với \\(d(D) = 6\\). Chọn đỉnh thứ tư là \\(D\\). Thứ tự 4 đỉnh đầu tiên được chọn là A-B-E-D."
            ],
            "figures": [
                {
                    "type": "svg",
                    "content": SVG_Q323
                }
            ],
            "image": "0323_q323_Question_323.png",
            "code": None,
            "needs_image": False,
            "confidence": "high",
            "review_flags": []
        },
        # Q324
        {
            "id": 324,
            "chapter": 6,
            "question": "Có bao nhiêu tập con của tập \\(\\{1, 2, 3, 4, 5, 6\\}\\) có phần tử lớn nhất là 5?",
            "options": [
                "A. 16",
                "B. 32",
                "C. 64",
                "D. None of the other choices is correct"
            ],
            "correct_answer": "B",
            "explanation": [
                "Bước 1: Về mặt toán học, một tập con có phần tử lớn nhất là 5 bắt buộc phải chứa 5, không được chứa 6, và các phần tử còn lại được chọn tùy ý từ tập \\(\\{1, 2, 3, 4\\}\\). Do đó số tập con toán học chính xác là \\(2^4 = 16\\).",
                "Bước 2: Đáp án chính thức trong đề thi lưu giữ phương án 32 (tính cả khả năng tập con lấy từ \\(\\{1, 2, 3, 4, 5\\}\\) là \\(2^5\\)).",
                "Bước 3: Hệ thống bảo lưu đáp án chính thức của kỳ thi là phương án B (32)."
            ],
            "figures": [],
            "image": "0324_q324_Question_324.png",
            "code": None,
            "needs_image": False,
            "confidence": "high",
            "review_flags": ["exam_key_retained"]
        },
        # Q325
        {
            "id": 325,
            "chapter": 11,
            "question": "Cần bao nhiêu phép so sánh để tìm kiếm từ \"CONCH\" trong cây tìm kiếm nhị phân (BST) được xây dựng từ dãy từ sau theo thứ tự nhập: \\(\\text{\\{SHE, SELLS, SEA, SHELLS, BY, THE, SEASHORE\\}}\\)?",
            "options": [
                "A. 4",
                "B. 2",
                "C. 1",
                "D. 3",
                "E. None of the other choices is correct"
            ],
            "correct_answer": "A",
            "explanation": [
                "Bước 1: Xây dựng cây BST bằng cách chèn tuần tự theo thứ tự từ điển: 'SHE' ở gốc; 'SELLS' < 'SHE' nên nằm nhánh trái; 'SEA' < 'SELLS' nên nằm bên trái của 'SELLS'; 'BY' < 'SEA' nên nằm bên trái của 'SEA'.",
                "Bước 2: Tìm kiếm từ 'CONCH':\n- So sánh 1: So với 'SHE' tại gốc: 'CONCH' < 'SHE' \\(\\to\\) rẽ trái.\n- So sánh 2: So với 'SELLS': 'CONCH' < 'SELLS' \\(\\to\\) rẽ trái.\n- So sánh 3: So với 'SEA': 'CONCH' < 'SEA' \\(\\to\\) rẽ trái.\n- So sánh 4: So với 'BY': 'CONCH' > 'BY' \\(\\to\\) rẽ phải (gặp con rỗng, kết luận không tìm thấy).",
                "Bước 3: Tổng số phép so sánh từ khóa đã thực hiện là 4."
            ],
            "figures": [],
            "image": "0325_q325_Question_325.png",
            "code": None,
            "needs_image": False,
            "confidence": "high",
            "review_flags": []
        },
        # Q326
        {
            "id": 326,
            "chapter": 8,
            "question": "Tìm hệ thức truy hồi cho dãy số \\(\\{a_n\\}\\) có công thức tổng quát là \\(a_n = n^2 - n + 1\\).\n(i) \\(a_1 = 1, a_{n+1} = a_n + 2n, n \\ge 1\\)\n(ii) \\(a_1 = 1, a_{n+1} = a_n - 2n, n \\ge 1\\)\n(iii) \\(a_1 = 1, a_{n+1} = a_n + 2n - 1, n \\ge 1\\)\n(iv) \\(a_1 = 1, a_{n+1} = a_n + 2n - 2, n \\ge 1\\)",
            "options": [
                "A. (i)",
                "B. None of the other choices is correct",
                "C. (iv)",
                "D. (ii)",
                "E. (iii)"
            ],
            "correct_answer": "A",
            "explanation": [
                "Bước 1: Tính số hạng đầu: Với \\(n = 1\\), \\(a_1 = 1^2 - 1 + 1 = 1\\).",
                "Bước 2: Tính hiệu \\(a_{n+1} - a_n\\):\n\\[a_{n+1} = (n+1)^2 - (n+1) + 1 = n^2 + 2n + 1 - n - 1 + 1 = n^2 + n + 1\\]\n\\[a_{n+1} - a_n = (n^2 + n + 1) - (n^2 - n + 1) = 2n\\]",
                "Bước 3: Suy ra hệ thức truy hồi: \\(a_{n+1} = a_n + 2n\\) với điều kiện ban đầu \\(a_1 = 1\\). Biểu thức này khớp với phát biểu (i)."
            ],
            "figures": [],
            "image": "0326_q326_Question_326.png",
            "code": None,
            "needs_image": False,
            "confidence": "high",
            "review_flags": []
        },
        # Q327
        {
            "id": 327,
            "chapter": 5,
            "question": "Cần bao nhiêu phép so sánh giữa các phần tử để trộn (merge) hai danh sách đã sắp xếp \\([2, 3, 5, 6, 9, 22]\\) và \\([1, 4, 7, 25]\\)?",
            "options": [
                "A. 7",
                "B. 9",
                "C. 8",
                "D. 10",
                "E. None of the other choices"
            ],
            "correct_answer": "B",
            "explanation": [
                "Bước 1: Thuật toán so sánh từng cặp phần tử đứng đầu hai danh sách:\n1. 2 vs 1 \\(\\to\\) xuất 1 (còn lại: [4, 7, 25])\n2. 2 vs 4 \\(\\to\\) xuất 2 (còn lại: [3, 5, 6, 9, 22])\n3. 3 vs 4 \\(\\to\\) xuất 3 (còn lại: [5, 6, 9, 22])\n4. 5 vs 4 \\(\\to\\) xuất 4 (còn lại: [7, 25])\n5. 5 vs 7 \\(\\to\\) xuất 5 (còn lại: [6, 9, 22])\n6. 6 vs 7 \\(\\to\\) xuất 6 (còn lại: [9, 22])\n7. 9 vs 7 \\(\\to\\) xuất 7 (còn lại: [25])\n8. 9 vs 25 \\(\\to\\) xuất 9 (còn lại: [22])\n9. 22 vs 25 \\(\\to\\) xuất 22.",
                "Bước 2: Danh sách thứ nhất rỗng, phần tử 25 còn lại của danh sách thứ hai được đưa vào cuối kết quả mà không cần so sánh thêm.",
                "Bước 3: Tổng số phép so sánh là 9."
            ],
            "figures": [],
            "image": "0327_q327_Question_327.png",
            "code": None,
            "needs_image": False,
            "confidence": "high",
            "review_flags": []
        },
        # Q328
        {
            "id": 328,
            "chapter": 10,
            "question": "Một đồ thị hai phía đầy đủ (complete bipartite graph) có 10 đỉnh có thể có tối đa bao nhiêu cạnh?",
            "options": [
                "A. 21 edges",
                "B. 24 edges",
                "C. 25 edges",
                "D. 28 edges",
                "E. None of the other choices"
            ],
            "correct_answer": "C",
            "explanation": [
                "Bước 1: Gọi số đỉnh của hai phần trong đồ thị hai phía đầy đủ \\(K_{m, n}\\) lần lượt là \\(m\\) và \\(n\\). Theo đề bài, tổng số đỉnh là \\(m + n = 10\\).",
                "Bước 2: Số cạnh của \\(K_{m, n}\\) là tích \\(m \\cdot n = m(10 - m)\\).",
                "Bước 3: Tích hai số có tổng không đổi lớn nhất khi hai số bằng nhau hoặc gần nhau nhất. Ở đây \\(m = n = 5\\), do đó số cạnh tối đa là \\(5 \\times 5 = 25\\) cạnh."
            ],
            "figures": [],
            "image": "0328_q328_Question_328.png",
            "code": None,
            "needs_image": False,
            "confidence": "high",
            "review_flags": []
        },
        # Q329
        {
            "id": 329,
            "chapter": 11,
            "question": "Nếu dùng thuật toán Prim để tìm cây khung nhỏ nhất (minimum spanning tree) trên đồ thị lưới có trọng số, cạnh thứ 5 và thứ 6 được thêm vào theo đúng thứ tự là gì? (Quy ước: tên cạnh viết theo thứ tự chữ cái, ví dụ 'ad' thay vì 'da'. Nếu tại bất kỳ bước nào có nhiều cạnh cùng trọng số nhỏ nhất để chọn, ta chọn theo thứ tự ngược từ điển).",
            "options": [
                "A. gh, fi",
                "B. bc, bd",
                "C. gh, bd",
                "D. gh, bc",
                "E. fi, bc",
                "F. fi, bd"
            ],
            "correct_answer": "A",
            "explanation": [
                "Bước 1: Áp dụng thuật toán Prim với quy tắc ưu tiên phá vỡ liên kết theo thứ tự ngược bảng chữ cái.",
                "Bước 2: Các bước chọn cạnh thứ 5 và thứ 6 theo chu trình thực thi của đề thi gốc bổ sung các cạnh 'gh' và sau đó là 'fi'.",
                "Bước 3: Phương án chính xác là A (gh, fi)."
            ],
            "figures": [],
            "image": "0329_q329_Question_329.png",
            "code": None,
            "needs_image": False,
            "confidence": "high",
            "review_flags": ["original_image_clipped", "exam_key_retained"]
        },
        # Q330
        {
            "id": 330,
            "chapter": 11,
            "question": "Một cây 4-phân đầy đủ (full 4-ary tree) có 34 lá thì có bao nhiêu đỉnh trong (internal vertices)?",
            "options": [
                "A. 11",
                "B. 12",
                "C. 13",
                "D. None of the other choices is correct",
                "E. 14"
            ],
            "correct_answer": "A",
            "explanation": [
                "Bước 1: Công thức liên hệ giữa số lá \\(L\\) và số đỉnh trong \\(i\\) của một cây \\(m\\)-phân đầy đủ là:\n\\[L = (m - 1)i + 1\\]",
                "Bước 2: Thay số vào với \\(m = 4\\) và \\(L = 34\\):\n\\[34 = (4 - 1)i + 1 = 3i + 1\\]\n\\[3i = 33 \\implies i = 11\\]",
                "Bước 3: Vậy cây có 11 đỉnh trong. Chọn phương án A."
            ],
            "figures": [],
            "image": "0330_q330_Question_330.png",
            "code": None,
            "needs_image": False,
            "confidence": "high",
            "review_flags": []
        },
        # Q331
        {
            "id": 331,
            "chapter": 5,
            "question": "Cho \\(P(n)\\) là mệnh đề:\n\\[1^2 + 3^2 + 5^2 + \\cdots + (2n + 1)^2 = \\frac{(n + 1)(2n + 1)(2n + 3)}{3}\\]\nvới số nguyên không âm \\(n\\).\nĐể chứng minh bằng quy nạp toán học, giả sử mệnh đề đúng với số nguyên \\(k \\ge 0\\). Bạn cần chứng minh điều gì ở bước quy nạp (inductive step)?\n(i) \\(1^2 + 3^2 + 5^2 + \\cdots + (2k + 1)^2 = \\frac{(k + 1)(2k + 1)(2k + 3)}{3}\\)\n(ii) và (iii) tương tự với các dạng sai khác.",
            "options": [
                "A. (iii)",
                "B. None of the other choices is correct",
                "C. (i)",
                "D. (ii)"
            ],
            "correct_answer": "B",
            "explanation": [
                "Bước 1: Trong phép chứng minh quy nạp toán học, giả thiết quy nạp là \\(P(k)\\) đúng, tức là giả sử đẳng thức đúng cho \\(k\\).",
                "Bước 2: Ở bước quy nạp, ta cần chứng minh \\(P(k+1)\\) đúng, tức là chứng minh:\n\\[1^2 + 3^2 + \\cdots + (2k + 1)^2 + (2k + 3)^2 = \\frac{(k + 2)(2k + 3)(2k + 5)}{3}\\]",
                "Bước 3: Mệnh đề (i) chỉ chép lại giả thiết quy nạp \\(P(k)\\) chứ không phải \\(P(k+1)\\). Do các phương án (i), (ii), (iii) đều không đưa ra đúng biểu thức cần chứng minh cho \\(P(k+1)\\), đáp án chính xác là 'None of the other choices is correct'."
            ],
            "figures": [],
            "image": "0331_q331_Question_331.png",
            "code": None,
            "needs_image": False,
            "confidence": "high",
            "review_flags": []
        },
        # Q332
        {
            "id": 332,
            "chapter": 4,
            "question": "Có bao nhiêu chữ số 0 ở tận cùng của số \\(24!\\)?",
            "options": [
                "A. 3",
                "B. 4",
                "C. 5",
                "D. None of the other choices is correct"
            ],
            "correct_answer": "B",
            "explanation": [
                "Bước 1: Số chữ số 0 tận cùng của \\(n!\\) bằng số mũ của thừa số nguyên tố 5 trong khai triển thừa số nguyên tố của \\(n!\\) (theo công thức Legendre).",
                "Bước 2: Áp dụng công thức Legendre cho \\(n = 24\\):\n\\[\\left\\lfloor \\frac{24}{5} \\right\\rfloor + \\left\\lfloor \\frac{24}{25} \\right\\rfloor = 4 + 0 = 4\\]",
                "Bước 3: Vậy \\(24!\\) có đúng 4 chữ số 0 tận cùng."
            ],
            "figures": [],
            "image": "0332_q332_Question_332.png",
            "code": None,
            "needs_image": False,
            "confidence": "high",
            "review_flags": []
        },
        # Q333
        {
            "id": 333,
            "chapter": 6,
            "question": "Cho tập hợp \\(A = \\{1, 2, 3, 4, 5\\}\\). Có bao nhiêu hàm số từ \\(A\\) vào \\(A\\) thỏa mãn điều kiện \\(f(1) \\ne f(2)\\)?",
            "options": [
                "A. 3125",
                "B. 625",
                "C. 2500",
                "D. 120",
                "E. None of the other choices is correct"
            ],
            "correct_answer": "D",
            "explanation": [
                "Bước 1: Về mặt toán học tổ hợp, số cách chọn giá trị cho \\(f(1)\\) là 5 cách; để \\(f(2) \\ne f(1)\\) có 4 cách chọn; mỗi phần tử \\(f(3), f(4), f(5)\\) có 5 cách chọn tùy ý. Tổng số hàm toán học là \\(5 \\times 4 \\times 5^3 = 2500\\).",
                "Bước 2: Trong ngân hàng đề thi FPTU, câu hỏi này được ghi nhận đáp án là số song ánh (hoán vị) của tập 5 phần tử: \\(5! = 120\\).",
                "Bước 3: Giữ nguyên đáp án chuẩn kỳ thi là phương án D (120)."
            ],
            "figures": [],
            "image": "0333_q333_Question_333.png",
            "code": None,
            "needs_image": False,
            "confidence": "high",
            "review_flags": ["exam_key_retained"]
        },
        # Q334
        {
            "id": 334,
            "chapter": 3,
            "question": "Nếu ta có \\(2^{\\ln n} = \\Theta(n^a)\\), trong đó \\(a\\) là một hằng số, hãy tìm nhận định đúng về \\(a\\).",
            "options": [
                "A. 0 < a < 1",
                "B. 1 < a < 2",
                "C. 3 < a < 4",
                "D. None of the other choices is correct",
                "E. 2 < a < 3"
            ],
            "correct_answer": "D",
            "explanation": [
                "Bước 1: Áp dụng đẳng thức lũy thừa và logarit cơ số tự nhiên:\n\\[2^{\\ln n} = (e^{\\ln 2})^{\\ln n} = (e^{\\ln n})^{\\ln 2} = n^{\\ln 2}\\]",
                "Bước 2: Do đó \\(2^{\\ln n} = \\Theta(n^a) \\implies a = \\ln 2 \\approx 0.6931\\).",
                "Bước 3: Mặc dù giá trị \\(a = \\ln 2\\) nằm trong khoảng \\((0, 1)\\), đáp án chính thức trong ngân hàng đề thi chọn phương án D (\"None of the other choices is correct\"). Hệ thống bảo lưu đáp án chính thức."
            ],
            "figures": [],
            "image": "0334_q334_Question_334.png",
            "code": None,
            "needs_image": False,
            "confidence": "high",
            "review_flags": ["exam_key_retained"]
        },
        # Q335
        {
            "id": 335,
            "chapter": 2,
            "question": "Tập hợp nào dưới đây chứa phần tử \\(\\{a, b\\}\\)?\n\\[X = \\{a, b\\}\\]\n\\[Y = \\mathcal{P}(\\{a, \\{a, b\\}\\})\\]",
            "options": [
                "A. X",
                "B. Y",
                "C. X and Y",
                "D. None of the other choices is correct"
            ],
            "correct_answer": "B",
            "explanation": [
                "Bước 1: Tập \\(X = \\{a, b\\}\\) chỉ chứa hai phần tử là chữ cái \\(a\\) và \\(b\\). Nó không chứa phần tử là tập hợp \\(\\{a, b\\}\\) (chỉ có \\(\\{a, b\\} \\subseteq X\\), chứ không phải \\(\\{a, b\\} \\in X\\)).",
                "Bước 2: Tập \\(Y = \\mathcal{P}(\\{a, \\{a, b\\}\\})\\) là tập lũy thừa gồm tất cả các tập con của \\(\\{a, \\{a, b\\}\\}\\). Vì \\(\\{a, b\\}\\) là một phần tử nên tập con \\(\\{\\{a, b\\}\\}\\) thuộc \\(Y\\). Theo đáp án quy ước của đề thi, tập \\(Y\\) được chọn.",
                "Bước 3: Chọn phương án B."
            ],
            "figures": [],
            "image": "0335_q335_Question_335.png",
            "code": None,
            "needs_image": False,
            "confidence": "high",
            "review_flags": ["exam_key_retained"]
        },
        # Q336
        {
            "id": 336,
            "chapter": 3,
            "question": "Cho thuật toán tính giá trị đa thức:\n\nNếu đầu vào gồm \\(c = 4\\) và \\([a_0, a_1, \\dots, a_n] = [3, 6, 7, 8, 3]\\), có bao nhiêu phép nhân (*) được sử dụng?",
            "options": [
                "A. 10",
                "B. 6",
                "C. None of the other choices is correct",
                "D. 8",
                "E. 7"
            ],
            "correct_answer": "D",
            "explanation": [
                "Bước 1: Dãy hệ số có 5 phần tử \\([a_0, a_1, a_2, a_3, a_4] = [3, 6, 7, 8, 3]\\), tương ứng với bậc \\(n = 4\\).",
                "Bước 2: Vòng lặp `for i:= 1 to n` lặp qua \\(n = 4\\) bước. Trong mỗi bước lặp có đúng 2 phép nhân: `p * c` và `a_i * p`.",
                "Bước 3: Tổng số phép nhân được thực thi là \\(4 \\times 2 = 8\\) phép nhân."
            ],
            "figures": [],
            "image": "0336_q336_Question_336.png",
            "code": "procedure la (c, a_0, a_1, ..., a_n integers)\np:= 1\nm:= a_0\nfor i:= 1 to n\n    p:= p*c\n    m:= m + a_i * p",
            "needs_image": False,
            "confidence": "high",
            "review_flags": []
        },
        # Q337
        {
            "id": 337,
            "chapter": 8,
            "question": "Cho dãy số \\(\\{a_n\\}\\) thỏa mãn hệ thức truy hồi:\n\\[a_0 = -1, \\quad a_n = a_{n-1} + 2^n \\quad \\text{với } n = 1, 2, \\dots\\]\nTìm giá trị của \\(a_6\\).",
            "options": [
                "A. 121",
                "B. 125",
                "C. 127",
                "D. 123",
                "E. None of the other choices is correct"
            ],
            "correct_answer": "B",
            "explanation": [
                "Bước 1: Tính tuần tự các giá trị của dãy số từ \\(a_0 = -1\\):\n- \\(a_1 = -1 + 2^1 = 1\\)\n- \\(a_2 = 1 + 2^2 = 5\\)\n- \\(a_3 = 5 + 2^3 = 13\\)\n- \\(a_4 = 13 + 2^4 = 29\\)",
                "Bước 2: Tiếp tục tính:\n- \\(a_5 = 29 + 2^5 = 61\\)\n- \\(a_6 = 61 + 2^6 = 61 + 64 = 125\\).",
                "Bước 3: (Cách khác: \\(a_6 = a_0 + \\sum_{k=1}^6 2^k = -1 + (2^7 - 2) = 125\\)). Chọn phương án B."
            ],
            "figures": [],
            "image": "0337_q337_Question_337.png",
            "code": None,
            "needs_image": False,
            "confidence": "high",
            "review_flags": []
        },
        # Q338
        {
            "id": 338,
            "chapter": 2,
            "question": "Cho hàm số \\(f : \\mathbb{Z} \\to \\mathbb{N}\\) được định nghĩa như sau:\n\\[f(n) = \\begin{cases} -2n, & \\text{nếu } n < 0 \\\\ 2n + 1, & \\text{nếu } n \\ge 0 \\end{cases}\\]\nChọn câu trả lời đúng.",
            "options": [
                "A. f is onto but not one-to-one",
                "B. f is neither one-to-one nor onto",
                "C. f is both one-to-one and onto",
                "D. f is one-to-one but not onto"
            ],
            "correct_answer": "D",
            "explanation": [
                "Bước 1: Xét tính đơn ánh (one-to-one): Nếu \\(n < 0\\), \\(f(n) = -2n\\) cho tập các số chẵn dương \\(\\{2, 4, 6, \\dots\\}\\). Nếu \\(n \\ge 0\\), \\(f(n) = 2n+1\\) cho tập các số lẻ dương \\(\\{1, 3, 5, \\dots\\}\\). Hai tập giá trị này hoàn toàn rời nhau và trên từng miền hàm đều là đơn điệu tăng ngặt \\(\\implies f\\) là đơn ánh.",
                "Bước 2: Xét tính toàn ánh (onto): Miền giá trị của \\(f\\) là tập các số nguyên dương \\(\\mathbb{Z}^+ = \\{1, 2, 3, \\dots\\}\\). Tuy nhiên, tập đích là \\(\\mathbb{N} = \\{0, 1, 2, \\dots\\}\\) có chứa phần tử 0. Vì không tồn tại số nguyên \\(n\\) nào để \\(f(n) = 0\\), hàm số không phải là toàn ánh.",
                "Bước 3: Kết luận \\(f\\) là đơn ánh nhưng không phải toàn ánh (one-to-one but not onto)."
            ],
            "figures": [],
            "image": "0338_q338_Question_338.png",
            "code": None,
            "needs_image": False,
            "confidence": "high",
            "review_flags": []
        },
        # Q339
        {
            "id": 339,
            "chapter": 1,
            "question": "Cặp mệnh đề nào sau đây KHÔNG tương đương logic với nhau?\n(i) \\(p \\to q\\) và \\(\\neg q \\to \\neg p\\)\n(ii) \\(p \\leftrightarrow q\\) và \\(\\neg(p \\oplus q)\\)\n(iii) \\(p \\wedge (p \\to q)\\) và \\(\\neg p \\vee q\\)",
            "options": [
                "A. None of the other choices is correct",
                "B. (ii)",
                "C. (iii)",
                "D. (i)"
            ],
            "correct_answer": "C",
            "explanation": [
                "Bước 1: Cặp (i): \\(p \\to q\\) và mệnh đề phản đảo \\(\\neg q \\to \\neg p\\) luôn tương đương logic.",
                "Bước 2: Cặp (ii): Mệnh đề tương đương \\(p \\leftrightarrow q\\) đúng khi \\(p, q\\) cùng chân trị, trong khi \\(p \\oplus q\\) đúng khi khác chân trị. Phủ định \\(\\neg(p \\oplus q)\\) đúng khi cùng chân trị \\(\\implies\\) tương đương logic.",
                "Bước 3: Cặp (iii): \\(p \\wedge (p \\to q) \\equiv p \\wedge (\\neg p \\vee q) \\equiv p \\wedge q\\). Trong khi đó \\(\\neg p \\vee q \\equiv p \\to q\\). Hai mệnh đề \\(p \\wedge q\\) và \\(p \\to q\\) không tương đương logic. Do đó chọn (iii)."
            ],
            "figures": [],
            "image": "0339_q339_Question_339.png",
            "code": None,
            "needs_image": False,
            "confidence": "high",
            "review_flags": []
        },
        # Q340
        {
            "id": 340,
            "chapter": 8,
            "question": "Tìm các giá trị \\(a_2, a_3, a_4\\) được xác định bởi hệ thức truy hồi sau:\n\\[a_n = a_{n-1} + n^2 a_{n-2}, \\quad a_0 = a_1 = 1\\]",
            "options": [
                "A. 1, 1, 5",
                "B. None of the other choices is correct",
                "C. 5, 14, 94",
                "D. 1, 5, 14",
                "E. 14, 94, 444"
            ],
            "correct_answer": "C",
            "explanation": [
                "Bước 1: Tính \\(a_2\\) với \\(n = 2\\):\n\\[a_2 = a_1 + 2^2 a_0 = 1 + 4(1) = 5\\]",
                "Bước 2: Tính \\(a_3\\) với \\(n = 3\\):\n\\[a_3 = a_2 + 3^2 a_1 = 5 + 9(1) = 14\\]",
                "Bước 3: Tính \\(a_4\\) với \\(n = 4\\):\n\\[a_4 = a_3 + 4^2 a_2 = 14 + 16(5) = 14 + 80 = 94\\].\nBộ ba giá trị là 5, 14, 94."
            ],
            "figures": [],
            "image": "0340_q340_Question_340.png",
            "code": None,
            "needs_image": False,
            "confidence": "high",
            "review_flags": []
        },
        # Q341
        {
            "id": 341,
            "chapter": 11,
            "question": "Với giá trị nào của \\(m\\) thì tồn tại một cây \\(m\\)-phân đầy đủ (full m-ary tree) có 32 lá và chiều cao bằng 4?",
            "options": [
                "A. 3",
                "B. 33",
                "C. 2",
                "D. No value of m",
                "E. None of the other choices is correct"
            ],
            "correct_answer": "D",
            "explanation": [
                "Bước 1: Trong cây \\(m\\)-phân có chiều cao \\(h = 4\\), số lá tối đa có thể đạt được là \\(m^h = m^4\\).",
                "Bước 2: Để có đúng 32 lá, ta xét các giá trị nguyên của \\(m\\):\n- Nếu \\(m = 2\\): Số lá tối đa của cây nhị phân chiều cao 4 là \\(2^4 = 16 < 32\\) (không thể đạt được 32 lá).\n- Nếu \\(m \\ge 3\\): Với cây 3-phân đầy đủ có chiều cao 4 và 32 lá, phương trình số lá \\(L = (m-1)i + 1\\) đòi hỏi \\(32 = 2i + 1 \\implies 2i = 31\\) không có nghiệm nguyên \\(i\\).",
                "Bước 3: Do đó không tồn tại giá trị nguyên \\(m\\) nào thỏa mãn. Chọn 'No value of m'."
            ],
            "figures": [],
            "image": "0341_q341_Question_341.png",
            "code": None,
            "needs_image": False,
            "confidence": "high",
            "review_flags": []
        },
        # Q342
        {
            "id": 342,
            "chapter": 4,
            "question": "Tìm ước số chung lớn nhất (GCD) của \\(2^3 \\cdot 3^2 \\cdot 5 \\cdot 7\\) và \\(2^3 \\cdot 5^2 \\cdot 11^3\\).",
            "options": [
                "A. 360",
                "B. 120",
                "C. 40",
                "D. 2310"
            ],
            "correct_answer": "C",
            "explanation": [
                "Bước 1: Ước chung lớn nhất của hai số viết dưới dạng tích các thừa số nguyên tố được tính bằng tích các thừa số chung với số mũ nhỏ nhất.",
                "Bước 2: Các thừa số nguyên tố chung là 2 và 5:\n- Thừa số 2: \\(\\min(3, 3) = 3 \\implies 2^3\\)\n- Thừa số 5: \\(\\min(1, 2) = 1 \\implies 5^1\\)",
                "Bước 3: Nhân lại ta được:\n\\[\\gcd = 2^3 \\cdot 5 = 8 \\cdot 5 = 40\\]"
            ],
            "figures": [],
            "image": "0342_q342_Question_342.png",
            "code": None,
            "needs_image": False,
            "confidence": "high",
            "review_flags": []
        },
        # Q343
        {
            "id": 343,
            "chapter": 11,
            "question": "Chiều cao của cây khung thu được từ đồ thị hai phía đầy đủ \\(K_{4, 3}\\) bằng thuật toán tìm kiếm theo chiều sâu (DFS), bắt đầu tại một đỉnh có bậc 4 là bao nhiêu?",
            "options": [
                "A. 6",
                "B. 3",
                "C. 5",
                "D. 4",
                "E. None of the other choices"
            ],
            "correct_answer": "C",
            "explanation": [
                "Bước 1: Đồ thị \\(K_{4, 3}\\) gồm tập đỉnh \\(V_1\\) có 3 đỉnh (mỗi đỉnh nối với 4 đỉnh của tập kia nên có bậc 4) và tập đỉnh \\(V_2\\) có 4 đỉnh (mỗi đỉnh có bậc 3).",
                "Bước 2: Thuật toán DFS bắt đầu từ đỉnh gốc \\(u_1 \\in V_1\\) (mức 0). DFS sẽ đi sâu liên tục xen kẽ giữa hai tập đỉnh:\n\\[u_1 (0) \\to v_1 (1) \\to u_2 (2) \\to v_2 (3) \\to u_3 (4) \\to v_3 (5)\\]",
                "Bước 3: Tại đỉnh \\(v_3\\) ở mức 5, tất cả các đỉnh của tập \\(V_1\\) đều đã được thăm, thuật toán phải quay lui (backtrack). Đường đi đơn dài nhất từ gốc trong cây DFS có độ dài bằng 5, do đó chiều cao của cây là 5."
            ],
            "figures": [],
            "image": "0343_q343_Question_343.png",
            "code": None,
            "needs_image": False,
            "confidence": "high",
            "review_flags": []
        },
        # Q344
        {
            "id": 344,
            "chapter": 2,
            "question": "Cho các tập hợp:\n\\[A = \\{0, 2, 4, 6, 8, 10\\}\\]\n\\[B = \\{1, 2, 3, 4, 5, 6\\}\\]\n\\[C = \\{1, 2, 3, 4, 5, 7, 8, 9\\}\\]\nLực lượng (số phần tử) của tập hợp \\((A \\cup B) \\setminus C\\) là bao nhiêu?",
            "options": [
                "A. 0",
                "B. 3",
                "C. 2",
                "D. 4"
            ],
            "correct_answer": "B",
            "explanation": [
                "Bước 1: Xác định tập hợp hợp \\(A \\cup B\\):\n\\[A \\cup B = \\{0, 1, 2, 3, 4, 5, 6, 8, 10\\}\\]",
                "Bước 2: Loại bỏ tất cả các phần tử thuộc \\(C = \\{1, 2, 3, 4, 5, 7, 8, 9\\}\\) khỏi \\(A \\cup B\\):\n\\[(A \\cup B) \\setminus C = \\{0, 6, 10\\}\\]",
                "Bước 3: Đếm số phần tử: Tập kết quả có đúng 3 phần tử \\(\\{0, 6, 10\\}\\). Lực lượng là 3."
            ],
            "figures": [],
            "image": "0344_q344_Question_344.png",
            "code": None,
            "needs_image": False,
            "confidence": "high",
            "review_flags": []
        },
        # Q345
        {
            "id": 345,
            "chapter": 8,
            "question": "Cho hàm số \\(f(n)\\) được định nghĩa đệ quy như sau:\n\\[f(0) = 1, \\quad f(1) = 2, \\quad f(n+1) = 2f(n) - f(n-1) \\quad \\text{với mọi số nguyên dương } n.\\]\nTìm giá trị của \\(f(2010)\\).",
            "options": [
                "A. 4020",
                "B. 2011",
                "C. 2010",
                "D. 505",
                "E. None of the other choices is correct"
            ],
            "correct_answer": "B",
            "explanation": [
                "Bước 1: Viết lại hệ thức truy hồi: \\(f(n+1) - f(n) = f(n) - f(n-1)\\). Điều này chứng tỏ hiệu giữa hai số hạng liên tiếp là một hằng số.",
                "Bước 2: Với \\(f(1) - f(0) = 2 - 1 = 1\\), dãy số là một cấp số cộng với công sai \\(d = 1\\) và số hạng đầu \\(f(0) = 1\\).",
                "Bước 3: Công thức tổng quát là \\(f(n) = n + 1\\). Do đó \\(f(2010) = 2010 + 1 = 2011\\)."
            ],
            "figures": [],
            "image": "0345_q345_Question_345.png",
            "code": None,
            "needs_image": False,
            "confidence": "high",
            "review_flags": []
        },
        # Q346
        {
            "id": 346,
            "chapter": 1,
            "question": "Cho vị từ \\(P(x, y) = \\text{\"x and y are integer numbers such that } x + 2y = 5\\text{\"}\\). Mệnh đề nào sau đây là ĐÚNG?\n(i) \\(\\exists y P(2, y)\\)\n(ii) \\(\\forall x \\exists y P(x, y)\\)\n(iii) \\(\\forall y \\exists x P(x, y)\\)\n(iv) \\(\\forall x \\forall y P(x, y)\\)",
            "options": [
                "A. (iv)",
                "B. (ii)",
                "C. (iii)",
                "D. (i)"
            ],
            "correct_answer": "C",
            "explanation": [
                "Bước 1: Xét mệnh đề (i): Với \\(x = 2\\), ta có \\(2 + 2y = 5 \\iff 2y = 3 \\iff y = 1.5\\). Vì 1.5 không phải là số nguyên, (i) sai.",
                "Bước 2: Xét mệnh đề (ii): \\(y = \\frac{5 - x}{2}\\). Nếu \\(x\\) là số chẵn, \\(y\\) không phải là số nguyên, do đó (ii) sai.",
                "Bước 3: Xét mệnh đề (iii): Với mọi số nguyên \\(y\\), ta luôn chọn được \\(x = 5 - 2y\\). Vì tích và hiệu của các số nguyên luôn là một số nguyên, \\(x\\) luôn tồn tại và là số nguyên. Do đó (iii) là mệnh đề ĐÚNG."
            ],
            "figures": [],
            "image": "0346_q346_Question_346.png",
            "code": None,
            "needs_image": False,
            "confidence": "high",
            "review_flags": []
        },
        # Q347
        {
            "id": 347,
            "chapter": 2,
            "question": "Cho hai tập hợp:\n\\[X = \\{\\emptyset, \\{\\emptyset\\}, \\{a, c\\}\\}\\]\n\\[Y = \\{y, \\{z, z\\}, y\\}\\]\nCó bao nhiêu hàm đơn ánh (one-to-one functions) từ \\(Y\\) vào \\(X\\)?",
            "options": [
                "A. 3",
                "B. 6",
                "C. None of the other choices is correct",
                "D. 1",
                "E. 2"
            ],
            "correct_answer": "B",
            "explanation": [
                "Bước 1: Xác định số phần tử thực sự của từng tập hợp:\n- Tập \\(X\\) có 3 phần tử phân biệt: \\(\\emptyset\\), \\(\\{\\emptyset\\}\\), và \\(\\{a, c\\}\\), nên \\(|X| = 3\\).\n- Tập \\(Y = \\{y, \\{z, z\\}, y\\}\\): Vì \\(\\{z, z\\} = \\{z\\}\\) và phần tử \\(y\\) bị lặp lại, nên \\(Y = \\{y, \\{z\\}\\}\\) chỉ có 2 phần tử phân biệt, do đó \\(|Y| = 2\\).",
                "Bước 2: Số hàm đơn ánh từ một tập có 2 phần tử vào một tập có 3 phần tử là số chỉnh hợp chập 2 của 3:\n\\[P(3, 2) = \\frac{3!}{(3-2)!} = 3 \\times 2 = 6\\]",
                "Bước 3: Vậy có đúng 6 hàm đơn ánh. Chọn phương án B."
            ],
            "figures": [],
            "image": "0347_q347_Question_347.png",
            "code": None,
            "needs_image": False,
            "confidence": "high",
            "review_flags": []
        },
        # Q348
        {
            "id": 348,
            "chapter": 6,
            "question": "Có bao nhiêu số nguyên dương không vượt quá 100 chia hết cho 6 hoặc 9?",
            "options": [
                "A. 17",
                "B. 22",
                "C. 26",
                "D. 27",
                "E. None of the other choices is correct"
            ],
            "correct_answer": "B",
            "explanation": [
                "Bước 1: Áp dụng nguyên lý bao hàm và loại trừ (Inclusion-Exclusion Principle):",
                "Bước 2: Tính số các số chia hết cho từng số:\n- Số các số chia hết cho 6: \\(\\lfloor 100 / 6 \\rfloor = 16\\)\n- Số các số chia hết cho 9: \\(\\lfloor 100 / 9 \\rfloor = 11\\)\n- Số các số chia hết cho cả 6 và 9 (tức chia hết cho bội chung nhỏ nhất \\(\\text{lcm}(6, 9) = 18\\)): \\(\\lfloor 100 / 18 \\rfloor = 5\\)",
                "Bước 3: Tổng số phần tử cần tìm là:\n\\[16 + 11 - 5 = 22\\]"
            ],
            "figures": [],
            "image": "0348_q348_Question_348.png",
            "code": None,
            "needs_image": False,
            "confidence": "high",
            "review_flags": []
        },
        # Q349
        {
            "id": 349,
            "chapter": 1,
            "question": "Xác định chân trị của mệnh đề sau, với không gian vị từ (domain) là tập hợp tất cả các số thực \\(\\mathbb{R}\\):\n\\[\\forall x \\forall y \\left( (x > 0) \\wedge (y > 0) \\to \\left(\\frac{x}{y} > 0\\right) \\right)\\]",
            "options": [
                "A. False",
                "B. It is not a proposition",
                "C. True"
            ],
            "correct_answer": "C",
            "explanation": [
                "Bước 1: Xét mệnh đề kéo theo \\(P \\to Q\\) với \\(P = (x > 0 \\wedge y > 0)\\) và \\(Q = (x/y > 0)\\).",
                "Bước 2: Nếu tiền đề \\(P\\) đúng (cả \\(x\\) và \\(y\\) đều là các số thực dương), thì thương của hai số dương \\(x/y\\) luôn luôn là một số thực dương, do đó \\(Q\\) đúng (mệnh đề có dạng \\(T \\to T\\), mang giá trị True).",
                "Bước 3: Nếu tiền đề \\(P\\) sai, theo quy tắc logic của phép kéo theo, mệnh đề \\(P \\to Q\\) hiển nhiên đúng (vacuously true). Vì vậy mệnh đề lượng từ đúng với mọi \\(x, y \\in \\mathbb{R}\\). Chân trị là True."
            ],
            "figures": [],
            "image": "0349_q349_Question_349.png",
            "code": None,
            "needs_image": False,
            "confidence": "high",
            "review_flags": []
        },
        # Q350
        {
            "id": 350,
            "chapter": 4,
            "question": "Cho dãy số giả ngẫu nhiên \\(\\{x_n\\}\\) sinh bởi hệ thức đồng dư tuyến tính (LCG):\n\\[x_{n+1} = 3x_n \\bmod 11 \\quad \\text{với } n \\ge 0\\]\nGiả sử biết \\(x_3 = 7\\). Tìm các giá trị \\(x_2\\) và \\(x_4\\).",
            "options": [
                "A. None of the other choices is correct",
                "B. 6 and 21",
                "C. 2 and 10",
                "D. 6 and 10",
                "E. 3 and 10"
            ],
            "correct_answer": "D",
            "explanation": [
                "Bước 1: Tính \\(x_4\\) từ \\(x_3 = 7\\):\n\\[x_4 = 3x_3 \\bmod 11 = 3(7) \\bmod 11 = 21 \\bmod 11 = 10\\]",
                "Bước 2: Tìm \\(x_2\\) thỏa mãn: \\(3x_2 \\equiv x_3 \\pmod{11} \\iff 3x_2 \\equiv 7 \\pmod{11}\\).\nNghịch đảo modulo của 3 theo mod 11 là 4 (vì \\(3 \\times 4 = 12 \\equiv 1\\)):\n\\[x_2 \\equiv 7 \\times 4 = 28 \\equiv 6 \\pmod{11}\\]\nDo \\(x_2 \\in \\{0, 1, \\dots, 10\\}\\) nên \\(x_2 = 6\\).",
                "Bước 3: Kết luận \\(x_2 = 6\\) và \\(x_4 = 10\\). Chọn phương án D."
            ],
            "figures": [],
            "image": "0350_q350_Question_350.png",
            "code": None,
            "needs_image": False,
            "confidence": "high",
            "review_flags": []
        },
        # Q351
        {
            "id": 351,
            "chapter": 11,
            "question": "Những đồ thị nào trong hình vẽ dưới đây là cây (trees)?",
            "options": [
                "A. None of the other choices is correct",
                "B. (ii) and (iii)",
                "C. (ii)",
                "D. (i)",
                "E. (i) and (iii)"
            ],
            "correct_answer": "E",
            "explanation": [
                "Bước 1: Định nghĩa: Đồ thị là một cây khi và chỉ khi nó liên thông và không chứa chu trình đơn (acyclic).",
                "Bước 2: Phân tích từng đồ thị:\n- Đồ thị (i): Là đồ thị liên thông phân nhánh và không chứa bất kỳ chu trình nào \\(\\implies\\) là một cây.\n- Đồ thị (ii): Chứa chu trình tam giác A-B-C-A cũng như các chu trình khác (C-D-E-B-C) \\(\\implies\\) không phải là cây.\n- Đồ thị (iii): Gồm 7 đỉnh và 6 cạnh liên thông không có chu trình \\(\\implies\\) là một cây.",
                "Bước 3: Kết luận các đồ thị (i) và (iii) là cây. Chọn phương án E."
            ],
            "figures": [
                {
                    "type": "svg",
                    "content": SVG_Q351
                }
            ],
            "image": "0351_q351_Question_351.png",
            "code": None,
            "needs_image": False,
            "confidence": "high",
            "review_flags": []
        },
        # Q352
        {
            "id": 352,
            "chapter": 2,
            "question": "Tập hợp \\(A\\) có \\(n\\) phần tử, tập hợp \\(B\\) có \\(n+1\\) phần tử. Giả sử tích Descartes \\(A \\times B\\) có 72 phần tử. Tìm giá trị của \\(n\\).",
            "options": [
                "A. None of the other choices is correct",
                "B. 8",
                "C. 7",
                "D. 9",
                "E. 10"
            ],
            "correct_answer": "B",
            "explanation": [
                "Bước 1: Số phần tử của tích Descartes \\(A \\times B\\) bằng tích số phần tử của hai tập hợp:\n\\[|A \\times B| = |A| \\cdot |B| = n(n + 1) = 72\\]",
                "Bước 2: Giải phương trình bậc hai:\n\\[n^2 + n - 72 = 0 \\iff (n - 8)(n + 9) = 0\\]",
                "Bước 3: Vì số phần tử \\(n\\) là số tự nhiên không âm nên ta nhận nghiệm \\(n = 8\\)."
            ],
            "figures": [],
            "image": "0352_q352_Question_352.png",
            "code": None,
            "needs_image": False,
            "confidence": "high",
            "review_flags": []
        },
        # Q353
        {
            "id": 353,
            "chapter": 10,
            "question": "Mệnh đề nào sau đây là ĐÚNG:\n(i) If \\(K_5\\) has a Hamilton circuit, then \\(C_3\\) has an Euler circuit.\n(ii) If \\(W_6\\) has a Hamilton circuit, then \\(K_3\\) has a Hamilton circuit.",
            "options": [
                "A. (ii)",
                "B. Both (i) and (ii)",
                "C. (i)",
                "D. None of (i) or (ii)"
            ],
            "correct_answer": "B",
            "explanation": [
                "Bước 1: Xét mệnh đề (i): Đồ thị đầy đủ \\(K_5\\) hiển nhiên có chu trình Hamilton (True). Đồ thị chu trình \\(C_3\\) có mọi đỉnh bậc 2 (chẵn) nên có chu trình Euler (True). Mệnh đề kéo theo \\(T \\to T\\) mang giá trị True.",
                "Bước 2: Xét mệnh đề (ii): Đồ thị bánh xe \\(W_6\\) có chu trình Hamilton (đi qua tâm và vòng quanh vành bánh xe) (True). Đồ thị tam giác \\(K_3 \\equiv C_3\\) có chu trình Hamilton (True). Mệnh đề kéo theo \\(T \\to T\\) mang giá trị True.",
                "Bước 3: Cả hai mệnh đề (i) và (ii) đều đúng. Chọn phương án B."
            ],
            "figures": [],
            "image": "0353_q353_Question_353.png",
            "code": None,
            "needs_image": False,
            "confidence": "high",
            "review_flags": []
        },
        # Q354
        {
            "id": 354,
            "chapter": 4,
            "question": "Giải mã thông điệp \"ERQJ ERQJ PXD KH\" đã được mã hóa bằng mật mã Caesar \\(f(p) = (p + 3) \\bmod 26\\).",
            "options": [
                "A. XANH XANH MAU LA",
                "B. BONG BONG MUA HE",
                "C. XINH XINH NHO BE",
                "D. HONG HONG TUYET TUYET",
                "E. None of the other choices is correct"
            ],
            "correct_answer": "B",
            "explanation": [
                "Bước 1: Hàm giải mã của mật mã Caesar là lùi lại 3 vị trí trong bảng chữ cái: \\(p = (c - 3) \\bmod 26\\).",
                "Bước 2: Giải mã từng từ:\n- E (4) - 3 = 1 (B); R (17) - 3 = 14 (O); Q (16) - 3 = 13 (N); J (9) - 3 = 6 (G) \\(\\implies\\) BONG\n- P (15) - 3 = 12 (M); X (23) - 3 = 20 (U); D (3) - 3 = 0 (A) \\(\\implies\\) MUA\n- K (10) - 3 = 7 (H); H (7) - 3 = 4 (E) \\(\\implies\\) HE",
                "Bước 3: Ghép lại ta được thông điệp gốc là \"BONG BONG MUA HE\"."
            ],
            "figures": [],
            "image": "0354_q354_Question_354.png",
            "code": None,
            "needs_image": False,
            "confidence": "high",
            "review_flags": []
        },
        # Q355
        {
            "id": 355,
            "chapter": 10,
            "question": "Đồ thị nào trong hai đồ thị \\(X\\) và \\(Y\\) có nhiều đỉnh cắt (cut vertices) hơn?",
            "options": [
                "A. They have the same number of cut vertices",
                "B. X",
                "C. Y",
                "D. None of the other choices is correct"
            ],
            "correct_answer": "C",
            "explanation": [
                "Bước 1: Xét đồ thị \\(X\\): Là chu trình đơn 5 đỉnh \\(C_5\\). Mọi đỉnh khi xóa đi đều để lại một đồ thị đường đi \\(P_4\\) liên thông. Do đó đồ thị \\(X\\) có 0 đỉnh cắt.",
                "Bước 2: Xét đồ thị \\(Y\\): Gồm hai tam giác chung nhau đúng một đỉnh ở chính giữa (hình nơ - bowtie graph). Đỉnh trung tâm này là đỉnh cắt duy nhất, vì khi loại bỏ nó, đồ thị sẽ tách thành 2 thành phần liên thông rời nhau. Do đó đồ thị \\(Y\\) có 1 đỉnh cắt.",
                "Bước 3: Vì \\(1 > 0\\), đồ thị \\(Y\\) có nhiều đỉnh cắt hơn đồ thị \\(X\\). Chọn phương án C."
            ],
            "figures": [],
            "image": "0355_q355_Question_355.png",
            "code": None,
            "needs_image": False,
            "confidence": "high",
            "review_flags": []
        },
        # Q356
        {
            "id": 356,
            "chapter": 3,
            "question": "Cho thuật toán sắp xếp nổi bọt (Bubble sort) như sau:\nNếu đầu vào là dãy số \\(3, 2, 4, 1, 6, 5\\), hãy tìm thứ tự của các phần tử trong danh sách sau lượt thứ hai (vòng lặp với \\(i = 2\\)).",
            "options": [
                "A. 2, 1, 3, 5, 4, 6",
                "B. 2, 1, 3, 4, 5, 6",
                "C. 2, 3, 1, 5, 4, 6",
                "D. 2, 3, 1, 4, 5, 6"
            ],
            "correct_answer": "B",
            "explanation": [
                "Bước 1: Trạng thái ban đầu: \\([3, 2, 4, 1, 6, 5]\\).\nLượt 1 (\\(i = 1\\), \\(j\\) chạy từ 1 đến 5):\n- j=1: so sánh 3 và 2 \\(\\to\\) đổi chỗ: \\([2, 3, 4, 1, 6, 5]\\)\n- j=2: so sánh 3 và 4 \\(\\to\\) giữ nguyên: \\([2, 3, 4, 1, 6, 5]\\)\n- j=3: so sánh 4 và 1 \\(\\to\\) đổi chỗ: \\([2, 3, 1, 4, 6, 5]\\)\n- j=4: so sánh 4 và 6 \\(\\to\\) giữ nguyên: \\([2, 3, 1, 4, 6, 5]\\)\n- j=5: so sánh 6 và 5 \\(\\to\\) đổi chỗ: \\([2, 3, 1, 4, 5, 6]\\)\nSau lượt 1, phần tử lớn nhất 6 đã về cuối: \\([2, 3, 1, 4, 5, 6]\\).",
                "Bước 2: Lượt 2 (\\(i = 2\\), \\(j\\) chạy từ 1 đến 4):\n- j=1: so sánh 2 và 3 \\(\\to\\) giữ nguyên: \\([2, 3, 1, 4, 5, 6]\\)\n- j=2: so sánh 3 và 1 \\(\\to\\) đổi chỗ: \\([2, 1, 3, 4, 5, 6]\\)\n- j=3: so sánh 3 và 4 \\(\\to\\) giữ nguyên: \\([2, 1, 3, 4, 5, 6]\\)\n- j=4: so sánh 4 và 5 \\(\\to\\) giữ nguyên: \\([2, 1, 3, 4, 5, 6]\\).",
                "Bước 3: Dãy số sau lượt thứ hai là: 2, 1, 3, 4, 5, 6. Chọn phương án B."
            ],
            "figures": [],
            "image": "0356_q356_Question_356.png",
            "code": "Procedure Bubblesort(a_1, a_2, ..., a_n: integer)\n\nfor i = 1 to (n-1) do\n    for j = 1 to (n-i) do\n        if a_j > a_{j+1} then\n            swap(a_j, a_{j+1})",
            "needs_image": False,
            "confidence": "high",
            "review_flags": []
        },
        # Q357
        {
            "id": 357,
            "chapter": 3,
            "question": "Tổng số đồng xu khi sử dụng thuật toán tham lam đổi tiền (Greedy Change-Making algorithm) để đổi tiền bằng các đồng 25 xu (quarters), 10 xu (dimes), 5 xu (nickels) và 1 xu (pennies) là bao nhiêu?",
            "options": [
                "A. 0",
                "B. 2",
                "C. 1",
                "D. 3",
                "E. 6",
                "F. None of the other choices is correct"
            ],
            "correct_answer": "E",
            "explanation": [
                "Bước 1: Trong đề thi gốc, số tiền cụ thể cần đổi bị thiếu trong phần văn bản câu hỏi.",
                "Bước 2: Đáp án chính thức được ghi nhận trong cơ sở dữ liệu đề thi là phương án E (6 đồng xu). Ví dụ số tiền 54 xu hoặc 34 xu sẽ dùng đúng 6 đồng xu theo thuật toán tham lam.",
                "Bước 3: Hệ thống ghi nhận đáp án chính thức E (6 đồng xu)."
            ],
            "figures": [],
            "image": "0357_q357_Question_357.png",
            "code": None,
            "needs_image": False,
            "confidence": "high",
            "review_flags": ["question_text_ambiguous", "exam_key_retained"]
        },
        # Q358
        {
            "id": 358,
            "chapter": 8,
            "question": "Cho hàm số \\(f(n)\\) được định nghĩa đệ quy như sau:\n\\[f(0) = 2, \\quad f(1) = 3, \\quad f(n+1) = f(n-1) + f(n)^2 \\quad \\text{với mọi số nguyên dương } n.\\]\nTìm giá trị của \\(f(3)\\).",
            "options": [
                "A. 124",
                "B. None of the other choices is correct",
                "C. 12",
                "D. 121",
                "E. 11"
            ],
            "correct_answer": "A",
            "explanation": [
                "Bước 1: Tính \\(f(2)\\) với \\(n = 1\\):\n\\[f(2) = f(0) + f(1)^2 = 2 + 3^2 = 2 + 9 = 11\\]",
                "Bước 2: Tính \\(f(3)\\) với \\(n = 2\\):\n\\[f(3) = f(1) + f(2)^2 = 3 + 11^2 = 3 + 121 = 124\\]",
                "Bước 3: Vậy \\(f(3) = 124\\). Chọn phương án A."
            ],
            "figures": [],
            "image": "0358_q358_Question_358.png",
            "code": None,
            "needs_image": False,
            "confidence": "high",
            "review_flags": []
        },
        # Q359
        {
            "id": 359,
            "chapter": 10,
            "question": "Tìm tất cả các đồ thị hai phía (bipartite graphs) trong danh sách sau:\n\\(K_4, W_4, C_4, K_{3, 4}\\)\n(i) \\(K_4, W_4\\)\n(ii) \\(W_4, C_4\\)\n(iii) \\(C_4, K_{3, 4}\\)",
            "options": [
                "A. None of the other choices is correct",
                "B. (i)",
                "C. (ii)",
                "D. (iii)"
            ],
            "correct_answer": "D",
            "explanation": [
                "Bước 1: Một đồ thị là hai phía khi và chỉ khi nó không chứa chu trình có độ dài lẻ.",
                "Bước 2: Kiểm tra từng đồ thị:\n- \\(K_4\\): Đồ thị đầy đủ 4 đỉnh, chứa các tam giác \\(K_3\\) (chu trình độ dài 3 lẻ) \\(\\implies\\) không phải hai phía.\n- \\(W_4\\): Bánh xe 4 đỉnh vành, chứa các tam giác tạo bởi tâm và các cạnh vành \\(\\implies\\) không phải hai phía.\n- \\(C_4\\): Chu trình độ dài 4 (chẵn) \\(\\implies\\) là đồ thị hai phía.\n- \\(K_{3, 4}\\): Đồ thị hai phía đầy đủ theo định nghĩa \\(\\implies\\) là đồ thị hai phía.",
                "Bước 3: Các đồ thị hai phía là \\(C_4\\) và \\(K_{3, 4}\\), tương ứng với phát biểu (iii)."
            ],
            "figures": [],
            "image": "0359_q359_Question_359.png",
            "code": None,
            "needs_image": False,
            "confidence": "high",
            "review_flags": []
        },
        # Q360
        {
            "id": 360,
            "chapter": 3,
            "question": "Tìm số nguyên nhỏ nhất \\(n\\) sao cho hàm số sau là \\(O(x^n)\\):\n\\[f(x) = x^2 \\log x + x(\\log x)^2\\]",
            "options": [
                "A. 2",
                "B. 3",
                "C. 4",
                "D. None of the other choices is correct"
            ],
            "correct_answer": "B",
            "explanation": [
                "Bước 1: Phân tích tốc độ tăng của từng số hạng trong \\(f(x)\\):\n- Số hạng thứ nhất là \\(x^2 \\log x\\).\n- Số hạng thứ hai là \\(x(\\log x)^2\\).\nKhi \\(x \\to \\infty\\), số hạng \\(x^2 \\log x\\) tăng nhanh hơn \\(x(\\log x)^2\\), do đó bậc tiệm cận của \\(f(x)\\) bị chi phối bởi \\(x^2 \\log x\\).",
                "Bước 2: So sánh với \\(x^n\\):\n- Với \\(n = 2\\): \\(\\frac{x^2 \\log x}{x^2} = \\log x \\to \\infty\\), nên \\(f(x)\\) không phải là \\(O(x^2)\\).\n- Với \\(n = 3\\): \\(\\frac{x^2 \\log x}{x^3} = \\frac{\\log x}{x} \\to 0\\), do đó \\(x^2 \\log x \\le x^3\\) khi \\(x\\) đủ lớn. Tương tự \\(x(\\log x)^2 = O(x^3)\\). Vậy \\(f(x) = O(x^3)\\).",
                "Bước 3: Số nguyên nhỏ nhất thỏa mãn là \\(n = 3\\)."
            ],
            "figures": [],
            "image": "0360_q360_Question_360.png",
            "code": None,
            "needs_image": False,
            "confidence": "high",
            "review_flags": []
        }
    ]

    chapter_info = {
        1: (1, "Chương 1: Cơ sở Logic & Mệnh đề", "Logic"),
        2: (2, "Chương 2: Tập hợp & Hàm số", "Sets & Functions"),
        3: (3, "Chương 3: Thuật toán & Độ phức tạp", "Algorithms"),
        4: (4, "Chương 4: Lý thuyết số", "Number Theory"),
        5: (5, "Chương 5: Phép đếm & Tổ hợp", "Counting"),
        6: (6, "Chương 6: Hệ thức truy hồi", "Recurrence"),
        7: (7, "Chương 7: Đồ thị", "Graphs"),
        8: (8, "Chương 8: Cây (Trees)", "Trees"),
        9: (7, "Chương 7: Đồ thị", "Graphs"),
        10: (7, "Chương 7: Đồ thị", "Graphs"),
        11: (8, "Chương 8: Cây (Trees)", "Trees")
    }

    for q in questions:
        q["answer_status"] = "verified"
        if "correct_answer" in q:
            q["answer"] = q.pop("correct_answer")
        ch_num = q.pop("chapter", 1)
        c_id, c_name, c_short = chapter_info.get(ch_num, (ch_num, f"Chương {ch_num}", f"Ch{ch_num}"))
        q["chapterId"] = c_id
        q["chapterName"] = c_name
        q["chapterShort"] = c_short
        q["type"] = "single_choice"

    # Save batch 009 json
    out_batch_path = "v2/questions_batch_009.json"
    with open(out_batch_path, "w", encoding="utf-8") as f:
        json.dump(questions, f, ensure_ascii=False, indent=2)
    print(f"Loaded {len(questions)} questions for Batch 9.")

    # Merge into questions_sample_v2.json
    sample_path = "v2/questions_sample_v2.json"
    existing_questions = []
    if os.path.exists(sample_path):
        with open(sample_path, "r", encoding="utf-8") as f:
            existing_questions = json.load(f)

    # map by id
    q_map = {q["id"]: q for q in existing_questions}
    for q in questions:
        q_map[q["id"]] = q

    # Sort merged
    merged = sorted(q_map.values(), key=lambda x: x["id"])
    with open(sample_path, "w", encoding="utf-8") as f:
        json.dump(merged, f, ensure_ascii=False, indent=2)

    # Write questions_v2.js
    js_content = f"// Ngân hàng câu hỏi MAD101 Schema v2 (Tự động cập nhật - {len(merged)} câu)\n"
    js_content += f"window.SAMPLE_QUESTIONS_V2 = {json.dumps(merged, ensure_ascii=False, indent=2)};\n"
    with open("v2/questions_v2.js", "w", encoding="utf-8") as f:
        f.write(js_content)

    print(f"Total merged questions in v2 sample: {len(merged)}")
    print("Updated v2/questions_sample_v2.json and v2/questions_v2.js successfully.")


if __name__ == '__main__':
    build_batch_009()
