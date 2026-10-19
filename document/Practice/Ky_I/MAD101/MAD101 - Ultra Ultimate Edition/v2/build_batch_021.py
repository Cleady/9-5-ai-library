"""
Builder script for Batch 21 (Questions 801 - 840)
Strictly adheres to MAD101 Schema v2:
- answer: String ("A", "B", "C", "D", "E")
- options: list[str] with "A. ...", "B. ...", etc.
- explanation: list[str] with >= 2 analytical steps
- Clean native vector SVG diagrams for diagrammatic questions
- MathJax LaTeX: \(...\) and \[...\] (no raw unescaped $)
- verification_source pointing to v2/verification/batch_021_results.json
"""
import json
import os

BATCH_21_QUESTIONS = [
    {
        "id": 801,
        "question": "Một người gửi 10,000,000 VND vào ngân hàng với lãi suất 1%/tháng theo hình thức lãi kép gộp hàng tháng. Tìm số tiền lãi (bằng VND) thu được sau tháng thứ 10 (làm tròn đến hàng đơn vị)?",
        "options": [
            "A. 1,000,000",
            "B. 11,000,000",
            "C. 11,046,221",
            "D. 1,046,221",
            "E. None of the choices is correct"
        ],
        "answer": "D",
        "explanation": [
            "Bước 1: Tính tổng số tiền cả gốc lẫn lãi tích lũy được sau 10 tháng theo công thức lãi kép:",
            "\\[ A = P(1 + r)^n \\]",
            "Với vốn gốc \\(P = 10,000,000\\) VND, lãi suất \\(r = 1\\% = 0.01\\), và kỳ hạn \\(n = 10\\) tháng:",
            "\\[ A = 10,000,000 \\times (1 + 0.01)^{10} = 10,000,000 \\times 1.01^{10} \\approx 11,046,221 \\text{ VND} \\]",
            "Bước 2: Tính riêng số tiền lãi thu được bằng cách lấy tổng số tiền trừ đi số tiền gốc ban đầu:",
            "\\[ \\text{Tiền lãi} = A - P = 11,046,221 - 10,000,000 = 1,046,221 \\text{ VND} \\]",
            "Do đó đáp án chính xác là D (1,046,221)."
        ],
        "chapter": "Ch6_Counting",
        "difficulty": "medium",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_021_results.json",
        "original_image": "0801_q801_Question_801.png"
    },
    {
        "id": 802,
        "question": "Dãy nào sau đây có thể là dãy bậc của một đơn đồ thị vô hướng (Which of the following sequences can be the degree sequence of a simple undirected graph)?\\n(i) 3, 3, 3, 3, 3, 3\\n(ii) 2, 3, 3, 5, 3, 6\\n(iii) 0, 1, 1, 3, 4, 5",
        "options": [
            "A. (ii)",
            "B. (i) and (ii)",
            "C. (iii)",
            "D. (i)",
            "E. None of the other choices is correct"
        ],
        "answer": "D",
        "explanation": [
            "Bước 1: Kiểm tra tính hợp lệ (tính đồ thị - graphic sequence) của từng dãy:",
            "- Dãy (i) \\(3, 3, 3, 3, 3, 3\\): Có 6 đỉnh, mỗi đỉnh bậc 3. Tổng bậc là \\(6 \\times 3 = 18\\) (số chẵn). Bậc cực đại là 3, nhỏ hơn số đỉnh trừ 1 (\\(3 \\le 6 - 1 = 5\\)). Dãy này thỏa mãn tiêu chuẩn đồ thị (ví dụ đồ thị lưỡng phân đầy đủ \\(K_{3,3}\\)).",
            "- Dãy (ii) \\(2, 3, 3, 5, 3, 6\\): Có 6 đỉnh nhưng lại xuất hiện đỉnh bậc 6. Trong đơn đồ thị có 6 đỉnh, một đỉnh chỉ có thể nối với tối đa \\(6 - 1 = 5\\) đỉnh khác, nên không thể có đỉnh bậc 6. Do đó (ii) vi phạm.",
            "- Dãy (iii) \\(0, 1, 1, 3, 4, 5\\): Có 6 đỉnh. Nếu có một đỉnh bậc 5 thì đỉnh đó phải nối với toàn bộ 5 đỉnh còn lại, nghĩa là không thể có đỉnh cô lập bậc 0. Tuy nhiên dãy lại chứa đỉnh bậc 0, mâu thuẫn. Do đó (iii) vi phạm.",
            "Bước 2: Chỉ có dãy (i) là dãy bậc của một đơn đồ thị vô hướng. Đáp án đúng là D (i)."
        ],
        "chapter": "Ch8_Graphs",
        "difficulty": "medium",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_021_results.json",
        "original_image": "0802_q802_Question_802.png"
    },
    {
        "id": 803,
        "question": "Hai đồ thị có hướng dưới đây có đẳng cấu với nhau không (Are these two directed graphs isomorphic)?",
        "options": [
            "A. Yes",
            "B. No",
            "C. None of the other choices is correct"
        ],
        "answer": "A",
        "explanation": [
            "Bước 1: Phân tích bán bậc vào và bán bậc ra (in-degree, out-degree) của các đỉnh trên cả hai đồ thị 4 đỉnh:",
            "- Đồ thị bên trái (các đỉnh 1, 2, 3, 4):",
            "  + Đỉnh 1: bậc vào 1, bậc ra 2 \\((1, 2)\\)",
            "  + Đỉnh 2: bậc vào 2, bậc ra 1 \\((2, 1)\\)",
            "  + Đỉnh 3: bậc vào 1, bậc ra 2 \\((1, 2)\\)",
            "  + Đỉnh 4: bậc vào 2, bậc ra 1 \\((2, 1)\\)",
            "- Đồ thị bên phải (ký hiệu đỉnh đỉnh trên T, tâm C, dưới-trái BL, dưới-phải BR):",
            "  + Đỉnh BL: bậc vào 1, bậc ra 2 \\((1, 2)\\)",
            "  + Đỉnh BR: bậc vào 1, bậc ra 2 \\((1, 2)\\)",
            "  + Đỉnh T: bậc vào 2, bậc ra 1 \\((2, 1)\\)",
            "  + Đỉnh C: bậc vào 2, bậc ra 1 \\((2, 1)\\)",
            "Bước 2: Thiết lập song ánh bảo toàn hướng cạnh:",
            "- Ánh xạ: \\(1 \\mapsto BL\\), \\(3 \\mapsto BR\\), \\(4 \\mapsto C\\), \\(2 \\mapsto T\\).",
            "- Kiểm tra các cung có hướng: cung \\(1 \\to 3\\) ứng với \\(BL \\to BR\\); cung \\(1 \\to 4\\) ứng với \\(BL \\to C\\); cung \\(3 \\to 4\\) ứng với \\(BR \\to C\\); cung \\(3 \\to 2\\) ứng với \\(BR \\to T\\); cung \\(2 \\to 1\\) ứng với \\(T \\to BL\\); cung \\(4 \\to 2\\) ứng với \\(C \\to T\\). Tất cả 6 cung đều được bảo toàn nguyên vẹn.",
            "Do đó hai đồ thị có hướng đẳng cấu với nhau, đáp án là A (Yes)."
        ],
        "chapter": "Ch8_Graphs",
        "difficulty": "medium",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_021_results.json",
        "original_image": "0803_q803_Question_803.png",
        "svg": """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 220" width="100%" height="auto" style="max-width:520px;display:block;margin:auto;">
  <defs>
    <style>
      .node-c { fill: #eff6ff; stroke: #1e40af; stroke-width: 2px; }
      .edge-l { stroke: #334155; stroke-width: 1.8px; }
      .lbl { font-family: system-ui, sans-serif; font-size: 13px; font-weight: bold; fill: #0f172a; text-anchor: middle; dominant-baseline: central; }
    </style>
    <marker id="arr" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#1e40af"/>
    </marker>
  </defs>
  <!-- Left Graph G1 -->
  <line class="edge-l" x1="130" y1="35" x2="65" y2="165"/><line class="edge-l" marker-end="url(#arr)" x1="130" y1="35" x2="95" y2="105"/>
  <line class="edge-l" x1="130" y1="35" x2="195" y2="165"/><line class="edge-l" marker-end="url(#arr)" x1="130" y1="35" x2="165" y2="105"/>
  <line class="edge-l" x1="130" y1="110" x2="130" y2="35"/><line class="edge-l" marker-end="url(#arr)" x1="130" y1="110" x2="130" y2="70"/>
  <line class="edge-l" x1="65" y1="165" x2="130" y2="110"/><line class="edge-l" marker-end="url(#arr)" x1="65" y1="165" x2="100" y2="135"/>
  <line class="edge-l" x1="195" y1="165" x2="130" y2="110"/><line class="edge-l" marker-end="url(#arr)" x1="195" y1="165" x2="160" y2="135"/>
  <line class="edge-l" x1="65" y1="165" x2="195" y2="165"/><line class="edge-l" marker-end="url(#arr)" x1="65" y1="165" x2="135" y2="165"/>
  <circle class="node-c" cx="130" cy="35" r="12"/><text class="lbl" x="130" y="35">1</text>
  <circle class="node-c" cx="130" cy="110" r="12"/><text class="lbl" x="130" y="110">2</text>
  <circle class="node-c" cx="65" cy="165" r="12"/><text class="lbl" x="65" y="165">3</text>
  <circle class="node-c" cx="195" cy="165" r="12"/><text class="lbl" x="195" y="165">4</text>
  <!-- Right Graph G2 -->
  <line class="edge-l" x1="390" y1="35" x2="325" y2="165"/><line class="edge-l" marker-end="url(#arr)" x1="390" y1="35" x2="355" y2="105"/>
  <line class="edge-l" x1="455" y1="165" x2="390" y2="35"/><line class="edge-l" marker-end="url(#arr)" x1="455" y1="165" x2="420" y2="95"/>
  <line class="edge-l" x1="390" y1="110" x2="390" y2="35"/><line class="edge-l" marker-end="url(#arr)" x1="390" y1="110" x2="390" y2="70"/>
  <line class="edge-l" x1="325" y1="165" x2="390" y2="110"/><line class="edge-l" marker-end="url(#arr)" x1="325" y1="165" x2="360" y2="135"/>
  <line class="edge-l" x1="455" y1="165" x2="390" y2="110"/><line class="edge-l" marker-end="url(#arr)" x1="455" y1="165" x2="420" y2="135"/>
  <line class="edge-l" x1="325" y1="165" x2="455" y2="165"/><line class="edge-l" marker-end="url(#arr)" x1="325" y1="165" x2="395" y2="165"/>
  <circle class="node-c" cx="390" cy="35" r="12"/>
  <circle class="node-c" cx="390" cy="110" r="12"/>
  <circle class="node-c" cx="325" cy="165" r="12"/>
  <circle class="node-c" cx="455" cy="165" r="12"/>
</svg>"""
    },
    {
        "id": 804,
        "question": "Cho \\(u, v\\) là hai đỉnh của đồ thị lưỡng phân đầy đủ \\(K_{2,2}\\), mỗi đỉnh thuộc một phía khác nhau của đồ thị. Hỏi có bao nhiêu đường đi có độ dài 4 giữa \\(u\\) và \\(v\\) (How many paths of length 4 between u and v)?",
        "options": [
            "A. 0",
            "B. 2",
            "C. 4",
            "D. 8",
            "E. None of the other choices is correct"
        ],
        "answer": "A",
        "explanation": [
            "Bước 1: Tính chất đường đi trong đồ thị lưỡng phân \\(G = (V_1, V_2, E)\\):",
            "- Mọi cạnh trong đồ thị lưỡng phân đều chỉ nối giữa một đỉnh thuộc \\(V_1\\) và một đỉnh thuộc \\(V_2\\).",
            "- Do đó, sau mỗi bước di chuyển dọc theo một cạnh, vị trí đỉnh sẽ luân phiên đổi phần tử tập hợp: \\(V_1 \\to V_2 \\to V_1 \\to V_2 \\to \\dots\\)",
            "Bước 2: Phân tích đường đi độ dài 4 xuất phát từ đỉnh \\(u \\in V_1\\):",
            "- Bước 0: Ở đỉnh \\(u \\in V_1\\).",
            "- Bước 1: Đến một đỉnh thuộc \\(V_2\\).",
            "- Bước 2: Đến một đỉnh thuộc \\(V_1\\).",
            "- Bước 3: Đến một đỉnh thuộc \\(V_2\\).",
            "- Bước 4: Bắt buộc phải kết thúc tại một đỉnh thuộc \\(V_1\\)!",
            "- Vì đỉnh đích \\(v\\) thuộc \\(V_2\\), một đường đi có độ dài chẵn (như độ dài 4) bắt đầu từ \\(V_1\\) không bao giờ có thể kết thúc ở \\(V_2\\).",
            "Số đường đi độ dài 4 giữa \\(u\\) và \\(v\\) là 0. Đáp án đúng là A (0)."
        ],
        "chapter": "Ch8_Graphs",
        "difficulty": "medium",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_021_results.json",
        "original_image": "0804_q804_Question_804.png"
    },
    {
        "id": 805,
        "question": "Trong cây có gốc dưới đây, đỉnh \\(k\\) có bao nhiêu tổ tiên (How many ancestors of the vertex k)?",
        "options": [
            "A. 3",
            "B. 4",
            "C. 2",
            "D. None of the other choices is correct",
            "E. 1"
        ],
        "answer": "A",
        "explanation": [
            "Bước 1: Nhắc lại định nghĩa tổ tiên (ancestor) trong cây có gốc:",
            "Tổ tiên của một đỉnh \\(v\\) (khác gốc) là tất cả các đỉnh nằm trên đường đi đơn duy nhất từ đỉnh cha của \\(v\\) lên tới gốc của cây.",
            "Bước 2: Xác định đường đi từ đỉnh \\(k\\) lên đỉnh gốc \\(a\\):",
            "- Cha của \\(k\\) là đỉnh \\(e\\).",
            "- Cha của \\(e\\) là đỉnh \\(b\\).",
            "- Cha của \\(b\\) là gốc \\(a\\).",
            "- Tập hợp các tổ tiên của đỉnh \\(k\\) là: \\(\\{e, b, a\\}\\).",
            "Tổng số tổ tiên của đỉnh \\(k\\) là 3, tương ứng với đáp án A (3)."
        ],
        "chapter": "Ch9_Trees",
        "difficulty": "easy",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_021_results.json",
        "original_image": "0805_q805_Question_805.png",
        "svg": """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 380 230" width="100%" height="auto" style="max-width:380px;display:block;margin:auto;">
  <defs>
    <style>
      .node-c { fill: #eff6ff; stroke: #1e40af; stroke-width: 2px; }
      .edge-l { stroke: #334155; stroke-width: 1.8px; }
      .lbl { font-family: system-ui, sans-serif; font-size: 13px; font-weight: bold; fill: #0f172a; text-anchor: middle; dominant-baseline: central; }
    </style>
  </defs>
  <!-- Edges -->
  <line class="edge-l" x1="200" y1="30" x2="110" y2="80"/>
  <line class="edge-l" x1="200" y1="30" x2="200" y2="80"/>
  <line class="edge-l" x1="200" y1="30" x2="290" y2="80"/>
  <line class="edge-l" x1="110" y1="80" x2="70" y2="135"/>
  <line class="edge-l" x1="110" y1="80" x2="110" y2="135"/>
  <line class="edge-l" x1="110" y1="80" x2="150" y2="135"/>
  <line class="edge-l" x1="290" y1="80" x2="250" y2="135"/>
  <line class="edge-l" x1="290" y1="80" x2="290" y2="135"/>
  <line class="edge-l" x1="290" y1="80" x2="330" y2="135"/>
  <line class="edge-l" x1="70" y1="135" x2="40" y2="190"/>
  <line class="edge-l" x1="70" y1="135" x2="70" y2="190"/>
  <line class="edge-l" x1="70" y1="135" x2="100" y2="190"/>
  <!-- Nodes -->
  <circle class="node-c" cx="200" cy="30" r="12"/><text class="lbl" x="200" y="30">a</text>
  <circle class="node-c" cx="110" cy="80" r="12"/><text class="lbl" x="110" y="80">b</text>
  <circle class="node-c" cx="200" cy="80" r="12"/><text class="lbl" x="200" y="80">d</text>
  <circle class="node-c" cx="290" cy="80" r="12"/><text class="lbl" x="290" y="80">c</text>
  <circle class="node-c" cx="70" cy="135" r="12"/><text class="lbl" x="70" y="135">e</text>
  <circle class="node-c" cx="110" cy="135" r="12"/><text class="lbl" x="110" y="135">h</text>
  <circle class="node-c" cx="150" cy="135" r="12"/><text class="lbl" x="150" y="135">g</text>
  <circle class="node-c" cx="250" cy="135" r="12"/><text class="lbl" x="250" y="135">f</text>
  <circle class="node-c" cx="290" cy="135" r="12"/><text class="lbl" x="290" y="135">l</text>
  <circle class="node-c" cx="330" cy="135" r="12"/><text class="lbl" x="330" y="135">m</text>
  <circle class="node-c" cx="40" cy="190" r="12"/><text class="lbl" x="40" y="190">i</text>
  <circle class="node-c" cx="70" cy="190" r="12"/><text class="lbl" x="70" y="190">n</text>
  <circle class="node-c" cx="100" cy="190" r="12"/><text class="lbl" x="100" y="190">k</text>
</svg>"""
    },
    {
        "id": 806,
        "question": "Cần sử dụng bao nhiêu phép so sánh để định vị hoặc thêm từ \"pear\" vào cây tìm kiếm nhị phân (BST) được tạo từ danh sách: banana, peach, apple, pear, coconut, mango, papaya?",
        "options": [
            "A. 4",
            "B. 2",
            "C. None of the other choices is correct",
            "D. 3",
            "E. 5"
        ],
        "answer": "D",
        "explanation": [
            "Bước 1: Mô phỏng quá trình định vị từ \"pear\" trong cây tìm kiếm nhị phân tạo từ danh sách:",
            "- Gốc của cây là từ đầu tiên: \"banana\".",
            "- So sánh 1: So sánh \"pear\" với gốc \"banana\". Vì \"pear\" > \"banana\" theo thứ tự chữ cái, rẽ sang nhánh con bên phải.",
            "- Con phải của \"banana\" là từ tiếp theo lớn hơn nó: \"peach\".",
            "- So sánh 2: So sánh \"pear\" với \"peach\". Vì \"pear\" > \"peach\", rẽ sang nhánh con bên phải của \"peach\".",
            "- Nhánh phải của \"peach\" chính là vị trí của nút chứa từ \"pear\".",
            "- So sánh 3: So sánh \"pear\" với từ tại nút này (\"pear\"), kết quả bằng nhau (tìm thấy).",
            "Bước 2: Tổng số phép so sánh từ khóa cần thực hiện là đúng 3 phép so sánh. Do đó đáp án là D (3)."
        ],
        "chapter": "Ch9_Trees",
        "difficulty": "medium",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_021_results.json",
        "original_image": "0806_q806_Question_806.png"
    },
    {
        "id": 807,
        "question": "Tìm giá trị chân lý của các mệnh đề sau, với \\(x\\) là một số thực (where x represents a real number):\\n\\((M) \\; \\forall x [(x \\ge 1) \\to (x^2 \\ge 1)]\\)\\n\\((N) \\; \\forall x [(x \\ge 1) \\land (x^2 \\ge 1)]\\)\\n\\((P) \\; \\forall x [(x \\ge 1) \\lor (x^2 \\ge 1)]\\)",
        "options": [
            "A. Only (M) is True",
            "B. All of (M), (N) and (P) are True",
            "C. Only (N) is True",
            "D. Only (P) is True",
            "E. None of the other choices is correct"
        ],
        "answer": "A",
        "explanation": [
            "Bước 1: Xét giá trị chân lý của từng mệnh đề với miền số thực \\(\\mathbb{R}\\):",
            "- Mệnh đề \\((M)\\): Nếu \\(x \\ge 1\\) thì hiển nhiên \\(x^2 \\ge 1\\). Với \\(x < 1\\), tiền đề sai nên phép kéo theo hiển nhiên đúng. Vậy \\((M)\\) luôn đúng với mọi số thực \\(x\\) (True).",
            "- Mệnh đề \\((N)\\): Mệnh đề này khẳng định mọi số thực \\(x\\) đều thỏa mãn \\(x \\ge 1\\) và \\(x^2 \\ge 1\\). Với \\(x = 0\\), mệnh đề sai. Vậy \\((N)\\) là False.",
            "- Mệnh đề \\((P)\\): Mệnh đề này khẳng định mọi số thực \\(x\\) đều thỏa mãn \\(x \\ge 1\\) hoặc \\(x^2 \\ge 1\\). Chọn phản ví dụ \\(x = 0.5\\): ta có \\(0.5 < 1\\) và \\(0.5^2 = 0.25 < 1\\), cả hai vế đều sai. Vậy \\((P)\\) là False.",
            "Bước 2: Trong 3 mệnh đề, chỉ có duy nhất \\((M)\\) là True. Đáp án đúng là A."
        ],
        "chapter": "Ch1_Logic_and_Proofs",
        "difficulty": "easy",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_021_results.json",
        "original_image": "0807_q807_Question_807.png"
    },
    {
        "id": 808,
        "question": "Cho \\(m = 7^5 \\cdot 11^{12} \\cdot 13^{90}\\) và tích \\(mn = 2^4 \\cdot 7^8 \\cdot 11^{26} \\cdot 13^{90}\\). Tìm bội chung nhỏ nhất \\(\\operatorname{lcm}(m, n)\\):\\n(i) \\(2^4 \\cdot 7^8 \\cdot 11^{12} \\cdot 13^{90}\\)\\n(ii) \\(7^8 \\cdot 11^{18} \\cdot 13^{90}\\)\\n(iii) \\(7^5 \\cdot 11^{12} \\cdot 13^{90}\\)\\n(iv) \\(2^4 \\cdot 7^5 \\cdot 11^{20} \\cdot 13^{90}\\)",
        "options": [
            "A. (i)",
            "B. (ii)",
            "C. (iii)",
            "D. (iv)",
            "E. None of the other choices is correct"
        ],
        "answer": "E",
        "explanation": [
            "Bước 1: Tìm phân tích thừa số nguyên tố của số \\(n\\):",
            "\\[ n = \\frac{mn}{m} = \\frac{2^4 \\cdot 7^8 \\cdot 11^{26} \\cdot 13^{90}}{7^5 \\cdot 11^{12} \\cdot 13^{90}} = 2^4 \\cdot 7^{8-5} \\cdot 11^{26-12} \\cdot 13^{90-90} = 2^4 \\cdot 7^3 \\cdot 11^{14} \\]",
            "Bước 2: Tìm bội chung nhỏ nhất \\(\\operatorname{lcm}(m, n)\\) bằng cách lấy số mũ lớn nhất của mỗi thừa số nguyên tố:",
            "\\[ m = 2^0 \\cdot 7^5 \\cdot 11^{12} \\cdot 13^{90} \\]",
            "\\[ n = 2^4 \\cdot 7^3 \\cdot 11^{14} \\cdot 13^0 \\]",
            "\\[ \\operatorname{lcm}(m, n) = 2^{\\max(0, 4)} \\cdot 7^{\\max(5, 3)} \\cdot 11^{\\max(12, 14)} \\cdot 13^{\\max(90, 0)} = 2^4 \\cdot 7^5 \\cdot 11^{14} \\cdot 13^{90} \\]",
            "Bước 3: So sánh kết quả đúng \\(2^4 \\cdot 7^5 \\cdot 11^{14} \\cdot 13^{90}\\) với các phương án (i), (ii), (iii), (iv): không có biểu thức nào trùng khớp.",
            "Do đó đáp án chính xác là E (None of the other choices is correct)."
        ],
        "chapter": "Ch4_Number_Theory",
        "difficulty": "medium",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_021_results.json",
        "original_image": "0808_q808_Question_808.png"
    },
    {
        "id": 809,
        "question": "Sử dụng thuật toán mã hóa Huffman để mã hóa thông điệp \"glaciology\". Số bit trung bình cần thiết để mã hóa một ký tự là bao nhiêu (làm tròn đến 2 chữ số thập phân)?",
        "options": [
            "A. 3.00",
            "B. 3.21",
            "C. 2.80",
            "D. 4.00"
        ],
        "answer": "C",
        "explanation": [
            "Bước 1: Thống kê tần số xuất hiện của các ký tự trong \"glaciology\" (tổng độ dài 10 ký tự):",
            "- 'g': 2 lần, 'l': 2 lần, 'o': 2 lần",
            "- 'a': 1 lần, 'c': 1 lần, 'i': 1 lần, 'y': 1 lần",
            "Bước 2: Xây dựng cây mã hóa Huffman:",
            "- Nhóm các ký tự tần số 1: ('a', 'c') thành nút trọng số 2; ('i', 'y') thành nút trọng số 2.",
            "- Hợp hai nút trên thành nút trọng số 4.",
            "- Nhóm 'g' (2) và 'l' (2) thành nút trọng số 4.",
            "- Kết hợp 'o' (2) với nút trọng số 4 thành nút 6; sau đó ghép với nút 4 còn lại thành gốc 10.",
            "- Độ dài từ mã tương ứng: 'g', 'l', 'o' mỗi ký tự cần 2 bit; 'a', 'c', 'i', 'y' mỗi ký tự cần 4 bit (hoặc cấu trúc cây nhị phân tương đương có tổng số bit là 28).",
            "Bước 3: Tính tổng số bit để mã hóa chuỗi và số bit trung bình:",
            "\\[ \\text{Tổng bit} = (3 \\times 2 \\times 2) + (4 \\times 1 \\times 4) = 12 + 16 = 28 \\text{ bit} \\]",
            "\\[ \\text{Số bit trung bình} = \\frac{28}{10} = 2.80 \\text{ bit/ký tự} \\]",
            "Do đó đáp án chính xác là C (2.80)."
        ],
        "chapter": "Ch9_Trees",
        "difficulty": "medium",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_021_results.json",
        "original_image": "0809_q809_Question_809.png"
    },
    {
        "id": 810,
        "question": "Tìm mệnh đề có bảng chân trị dưới đây:\\n\\n| p | q | ? |\\n|---|---|---|\\n| T | T | T |\\n| T | F | T |\\n| F | T | F |\\n| F | F | T |\\n\\n(i) \\(p \\to q\\) (ii) \\(q \\to p\\) (iii) \\(p \\to \\neg q\\) (iv) \\(q \\to \\neg p\\)",
        "options": [
            "A. (i)",
            "B. (ii)",
            "C. (iii)",
            "D. (iv)",
            "E. None of the other choices is correct"
        ],
        "answer": "B",
        "explanation": [
            "Bước 1: Quan sát cột kết quả của bảng chân trị:",
            "- Kết quả nhận giá trị Sai (F) duy nhất khi \\(p = F\\) và \\(q = T\\).",
            "- Trong 3 trường hợp còn lại (TT, TF, FF), kết quả đều là Đúng (T).",
            "Bước 2: So sánh với định nghĩa bảng chân trị của các phép toán logic cơ bản:",
            "- Mệnh đề kéo theo \\(q \\to p\\) chỉ có giá trị Sai khi tiền đề \\(q\\) đúng và kết luận \\(p\\) sai (tức là \\(q = T, p = F\\)). Trong tất cả các trường hợp khác, nó đều có giá trị Đúng.",
            "Do đó bảng chân trị này biểu diễn mệnh đề \\(q \\to p\\), tương ứng với mệnh đề (ii) và đáp án B."
        ],
        "chapter": "Ch1_Logic_and_Proofs",
        "difficulty": "easy",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_021_results.json",
        "original_image": "0810_q810_Question_810.png"
    },
    {
        "id": 811,
        "question": "Cho các mệnh đề: \\(p = \\text{\"You drive at more than 60km/h\"}\\), \\(q = \\text{\"You get a speeding ticket\"}\\). Biểu diễn câu sau thành biểu thức logic: \"You got a speeding ticket but you did not drive at more than 60km/h\":\\n(i) \\(q \\land \\neg p\\)\\n(ii) \\(q \\to \\neg p\\)\\n(iii) \\(p \\land \\neg q\\)\\n(iv) \\(\\neg q \\land \\neg p\\)",
        "options": [
            "A. (i)",
            "B. (ii)",
            "C. (iii)",
            "D. (iv)",
            "E. None of the other choices is correct"
        ],
        "answer": "A",
        "explanation": [
            "Bước 1: Phân tích các thành phần của câu nói:",
            "- \"You got a speeding ticket\" tương ứng với mệnh đề \\(q\\).",
            "- Từ nối \"but\" (nhưng) trong logic mang ý nghĩa hội (AND, \\(\\land\\)).",
            "- \"you did not drive at more than 60km/h\" tương ứng với phủ định của \\(p\\), tức là \\(\\neg p\\).",
            "Bước 2: Ghép các thành phần lại ta thu được: \\(q \\land \\neg p\\), tương ứng với mệnh đề (i).",
            "Do đó đáp án chính xác là A."
        ],
        "chapter": "Ch1_Logic_and_Proofs",
        "difficulty": "easy",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_021_results.json",
        "original_image": "0811_q811_Question_811.png"
    },
    {
        "id": 812,
        "question": "Tìm mệnh đề tương đương logic với biểu thức: \\( (p \\to T) \\land (q \\to F) \\):\\n(i) \\(\\neg q\\)\\n(ii) \\(p\\)\\n(iii) \\(\\neg p\\)\\n(iv) \\(q\\)",
        "options": [
            "A. (i)",
            "B. (ii)",
            "C. (iii)",
            "D. (iv)",
            "E. None of the other choices is correct"
        ],
        "answer": "A",
        "explanation": [
            "Bước 1: Rút gọn từng mệnh đề kéo theo thành phần:",
            "- Mệnh đề kéo theo có kết luận Đúng luôn luôn Đúng: \\(p \\to T \\equiv \\neg p \\lor T \\equiv T\\).",
            "- Mệnh đề kéo theo có kết luận Sai: \\(q \\to F \\equiv \\neg q \\lor F \\equiv \\neg q\\).",
            "Bước 2: Kết hợp hai mệnh đề bằng phép hội:",
            "\\[ (p \\to T) \\land (q \\to F) \\equiv T \\land \\neg q \\equiv \\neg q \\]",
            "Biểu thức tương đương logic với \\(\\neg q\\), tương ứng với (i) và đáp án A."
        ],
        "chapter": "Ch1_Logic_and_Proofs",
        "difficulty": "easy",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_021_results.json",
        "original_image": "0812_q812_Question_812.png"
    },
    {
        "id": 813,
        "question": "Cho \\(P(x) = \\text{\"x is a freshman\"}\\), \\(Q(x) = \\text{\"x takes Dmath 1\"}\\), với không gian mẫu là tất cả sinh viên trong một trường đại học. Dịch câu sau thành biểu thức logic: \"Every freshman must take Dmath 1\":\\n(i) \\(\\forall x (P(x) \\to Q(x))\\)\\n(ii) \\(\\forall x (P(x) \\land Q(x))\\)\\n(iii) \\(\\exists x (P(x) \\land Q(x))\\)\\n(iv) \\(\\exists x (P(x) \\to Q(x))\\)",
        "options": [
            "A. (i)",
            "B. (ii)",
            "C. (iii)",
            "D. (iv)",
            "E. None of the other choices is correct"
        ],
        "answer": "A",
        "explanation": [
            "Bước 1: Phân tích cấu trúc câu với lượng từ phổ dụng:",
            "- \"Every freshman...\" nghĩa là với mọi sinh viên \\(x\\), nếu sinh viên đó là tân sinh viên (\\(P(x)\\)) thì...",
            "- Cấu trúc điều kiện phổ quát được biểu diễn chuẩn bằng lượng từ \\(\\forall\\) kết hợp với phép kéo theo \\(\\to\\).",
            "Bước 2: Ghép lại ta thu được biểu thức: \\(\\forall x (P(x) \\to Q(x))\\), tương ứng với mệnh đề (i).",
            "Do đó đáp án chính xác là A."
        ],
        "chapter": "Ch1_Logic_and_Proofs",
        "difficulty": "easy",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_021_results.json",
        "original_image": "0813_q813_Question_813.png"
    },
    {
        "id": 814,
        "question": "Giả sử không gian mẫu của \\(x\\) gồm tất cả các số nguyên (\\(\\mathbb{Z}\\)). Mệnh đề nào sau đây là ĐÚNG?\\n(i) \\(\\forall x (x > 2x)\\)\\n(ii) \\(\\forall x (x > -x)\\)\\n(iii) \\(\\forall x (x^2 \\ge x)\\)\\n(iv) \\(\\forall x (x^2 \\ge 2x)\\)",
        "options": [
            "A. (i)",
            "B. (ii)",
            "C. (iii)",
            "D. (iv)",
            "E. None of the other choices is correct"
        ],
        "answer": "C",
        "explanation": [
            "Bước 1: Kiểm tra tính đúng đắn của từng mệnh đề trên tập số nguyên \\(\\mathbb{Z}\\):",
            "- (i) Sai: ví dụ \\(x = 1 \\implies 1 > 2\\) là sai.",
            "- (ii) Sai: ví dụ \\(x = -1 \\implies -1 > 1\\) là sai, hoặc \\(x = 0 \\implies 0 > 0\\) là sai.",
            "- (iii) Đúng: Xét các trường hợp của số nguyên \\(x\\):",
            "  + Nếu \\(x \\le 0\\): \\(x^2 \\ge 0 \\ge x\\) (luôn đúng).",
            "  + Nếu \\(x = 1\\): \\(1^2 = 1 \\ge 1\\) (đúng).",
            "  + Nếu \\(x \\ge 2\\): \\(x^2 > x\\) (đúng).",
            "  Do đó bất đẳng thức \\(x^2 \\ge x\\) nghiệm đúng với mọi số nguyên \\(x \\in \\mathbb{Z}\\).",
            "- (iv) Sai: ví dụ \\(x = 1 \\implies 1^2 = 1 < 2(1) = 2\\).",
            "Bước 2: Mệnh đề đúng duy nhất là (iii), tương ứng với đáp án C."
        ],
        "chapter": "Ch1_Logic_and_Proofs",
        "difficulty": "easy",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_021_results.json",
        "original_image": "0814_q814_Question_814.png"
    },
    {
        "id": 815,
        "question": "Cho \\(x, y\\) đại diện cho tất cả mọi người trong một trường đại học. Đặt \\(S(x) = \\text{\"x is a student\"}\\), \\(F(x) = \\text{\"x is a faculty\"}\\), \\(P(x, y) = \\text{\"the faculty x has taught the student y\"}\\). Dịch biểu thức logic sau sang ngôn ngữ tự nhiên:\\n\\[ \\exists x \\left( S(x) \\land \\forall y (F(y) \\to P(y, x)) \\right) \\]",
        "options": [
            "A. Some faculty has taught all students",
            "B. Some student has been taught by all faculties",
            "C. Each faculty has taught some student",
            "D. Each student has been taught by some faculty",
            "E. None of the other choices is correct"
        ],
        "answer": "B",
        "explanation": [
            "Bước 1: Phân tích cấu trúc logic từ ngoài vào trong:",
            "- Lượng từ ngoài: \\(\\exists x (S(x) \\land \\dots)\\) nghĩa là \"Tồn tại một sinh viên \\(x\\) thỏa mãn...\".",
            "- Mệnh đề con bên trong: \\(\\forall y (F(y) \\to P(y, x))\\) nghĩa là \"với mọi người \\(y\\), nếu \\(y\\) là giảng viên (faculty) thì giảng viên \\(y\\) đã từng dạy sinh viên \\(x\\)\", tức là \"tất cả các giảng viên đều đã dạy sinh viên \\(x\\)\".",
            "Bước 2: Kết hợp hai mệnh đề lại:",
            "\"Có một sinh viên đã được dạy bởi tất cả các giảng viên\" (\"Some student has been taught by all faculties\").",
            "Do đó đáp án chính xác là B."
        ],
        "chapter": "Ch1_Logic_and_Proofs",
        "difficulty": "medium",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_021_results.json",
        "original_image": "0815_q815_Question_815.png"
    },
    {
        "id": 816,
        "question": "Những quy tắc suy diễn nào được sử dụng trong lập luận sau: \"Hôm nay trời lạnh hoặc có tuyết. Nếu hôm nay có tuyết thì tôi sẽ không ra ngoài. Hôm nay tôi ra ngoài. Do đó, hôm nay trời lạnh nhưng không có tuyết\"?",
        "options": [
            "A. Modus tollens and disjunctive syllogism",
            "B. Modus ponens and disjunctive syllogism",
            "C. Modus tollens and hypothetical syllogism",
            "D. Simplification and hypothetical syllogism",
            "E. None of the other choices is correct"
        ],
        "answer": "A",
        "explanation": [
            "Bước 1: Ký hiệu các mệnh đề nguyên tử:",
            "- \\(C\\): \"Hôm nay trời lạnh\", \\(S\\): \"Hôm nay có tuyết\", \\(G\\): \"Tôi ra ngoài hôm nay\".",
            "- Các tiền đề đã cho:",
            "  1. \\(C \\lor S\\) (Trời lạnh hoặc có tuyết).",
            "  2. \\(S \\to \\neg G\\) (Nếu có tuyết thì tôi không ra ngoài).",
            "  3. \\(G\\) (Tôi ra ngoài).",
            "Bước 2: Phân tích các bước suy diễn:",
            "- Từ tiền đề 2 (\\(S \\to \\neg G\\)) và tiền đề 3 (\\(G \\equiv \\neg(\\neg G)\\)): Áp dụng quy tắc **Modus Tollens**, ta suy ra \\(\\neg S\\) (Hôm nay không có tuyết).",
            "- Từ tiền đề 1 (\\(C \\lor S\\)) và kết quả vừa tìm được (\\(\\neg S\\)): Áp dụng quy tắc **Tam đoạn luận tuyển (Disjunctive Syllogism)**, ta suy ra \\(C\\) (Hôm nay trời lạnh).",
            "- Kết hợp lại bằng quy tắc hội thu được \\(C \\land \\neg S\\).",
            "Hai quy tắc suy diễn chính đã được sử dụng là: Modus tollens và Tam đoạn luận tuyển (Disjunctive syllogism), tương ứng với đáp án A."
        ],
        "chapter": "Ch1_Logic_and_Proofs",
        "difficulty": "medium",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_021_results.json",
        "original_image": "0816_q816_Question_816.png"
    },
    {
        "id": 817,
        "question": "Cho tập phổ quát \\(U = \\{0, 1, 2, 3, 4, 5, 6, 7, 8, 9\\}\\). Cho \\(A, B\\) là các tập con của \\(U\\) với chuỗi bit biểu diễn của \\(A\\) là `1010101010` và của \\(B\\) là `0101010101`. Tìm tập hợp \\(A - B\\):",
        "options": [
            "A. {0, 1, 2, 3, 4, 5, 6, 7, 8, 9}",
            "B. {0, 2, 4, 6, 8}",
            "C. {1, 3, 5, 7, 9}",
            "D. The empty set",
            "E. None of the other choices is correct"
        ],
        "answer": "B",
        "explanation": [
            "Bước 1: Chuyển đổi chuỗi bit sang các phần tử của tập hợp tương ứng trong \\(U\\):",
            "- Chuỗi bit của \\(A\\) là `1010101010`: bit 1 xuất hiện tại các vị trí chẵn 0, 2, 4, 6, 8 \\(\\implies A = \\{0, 2, 4, 6, 8\\}\\).",
            "- Chuỗi bit của \\(B\\) là `0101010101`: bit 1 xuất hiện tại các vị trí lẻ 1, 3, 5, 7, 9 \\(\\implies B = \\{1, 3, 5, 7, 9\\}\\).",
            "Bước 2: Tính hiệu hai tập hợp \\(A - B\\):",
            "- Vì \\(A\\) và \\(B\\) là hai tập hợp rời nhau (\\(A \\cap B = \\emptyset\\)), ta có:",
            "\\[ A - B = A = \\{0, 2, 4, 6, 8\\} \\]",
            "Do đó đáp án chính xác là B."
        ],
        "chapter": "Ch2_Basic_Structures",
        "difficulty": "easy",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_021_results.json",
        "original_image": "0817_q817_Question_817.png"
    },
    {
        "id": 818,
        "question": "Cho hai hàm số \\(f, g: \\mathbb{N} \\to \\mathbb{N}\\) xác định bởi \\(f(n) = 2n\\) và \\(g(n) = 3n - 1\\). Giá trị của hàm hợp \\((g \\circ f)(n)\\) tại \\(n = 2\\) là:",
        "options": [
            "A. 4",
            "B. 5",
            "C. 20",
            "D. 11",
            "E. 10"
        ],
        "answer": "D",
        "explanation": [
            "Bước 1: Áp dụng định nghĩa của phép hợp hai hàm số: \\((g \\circ f)(n) = g(f(n))\\).",
            "Bước 2: Tính toán giá trị từng bước tại \\(n = 2\\):",
            "- Tính giá trị hàm trong: \\(f(2) = 2 \\times 2 = 4\\).",
            "- Tính giá trị hàm ngoài: \\(g(f(2)) = g(4) = 3(4) - 1 = 12 - 1 = 11\\).",
            "Do đó giá trị thu được là 11, tương ứng với đáp án D."
        ],
        "chapter": "Ch2_Basic_Structures",
        "difficulty": "easy",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_021_results.json",
        "original_image": "0818_q818_Question_818.png"
    },
    {
        "id": 819,
        "question": "Cho phép chia nguyên (div) với \\(a = 296 \\div 19\\) và \\(b = -125 \\div 19\\). Tính giá trị của biểu thức \\(a - b\\):",
        "options": [
            "A. 20",
            "B. 22",
            "C. 21",
            "D. 23",
            "E. None of the other choices is correct"
        ],
        "answer": "B",
        "explanation": [
            "Bước 1: Áp dụng Thuật toán phép chia (Division Algorithm) để tìm thương nguyên \\(q = n \\text{ div } d\\) sao cho \\(n = d \\cdot q + r\\) với số dư thỏa mãn \\(0 \\le r < d\\):",
            "- Với \\(a = 296 \\text{ div } 19\\):",
            "\\[ 296 = 19 \\times 15 + 11 \\implies a = 15 \\]",
            "- Với \\(b = -125 \\text{ div } 19\\):",
            "\\[ -125 = 19 \\times (-7) + 8 \\implies b = -7 \\]",
            "Bước 2: Tính giá trị của biểu thức \\(a - b\\):",
            "\\[ a - b = 15 - (-7) = 15 + 7 = 22 \\]",
            "Do đó đáp án chính xác là B (22)."
        ],
        "chapter": "Ch4_Number_Theory",
        "difficulty": "medium",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_021_results.json",
        "original_image": "0819_q819_Question_819.png"
    },
    {
        "id": 820,
        "question": "Chuyển đổi số ở hệ thập lục phân (hexadecimal) \\(\\text{BC1}_{16}\\) sang hệ nhị phân (binary):",
        "options": [
            "A. 101111000001",
            "B. 1011110001",
            "C. 101111001001",
            "D. 111111001"
        ],
        "answer": "A",
        "explanation": [
            "Bước 1: Chuyển đổi từng chữ số thập lục phân thành khối 4 chữ số nhị phân (nibble):",
            "- \\(\\text{B}_{16} = 11_{10} = 1011_2\\)",
            "- \\(\\text{C}_{16} = 12_{10} = 1100_2\\)",
            "- \\(1_{16} = 1_{10} = 0001_2\\)",
            "Bước 2: Ghép các khối nhị phân lại theo đúng thứ tự từ trái qua phải:",
            "\\[ \\text{BC1}_{16} = (1011) \\; (1100) \\; (0001)_2 = 101111000001_2 \\]",
            "Do đó đáp án chính xác là A."
        ],
        "chapter": "Ch4_Number_Theory",
        "difficulty": "easy",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_021_results.json",
        "original_image": "0820_q820_Question_820.png"
    },
    {
        "id": 821,
        "question": "Cho thuật toán đệ quy sau:\\n\\n```text\\nprocedure ketqua(n: integer)\\nif n = 1 then ketqua(n) := 98\\nelse ketqua(n) := 7 * ketqua(n - 1)\\n```\\n\\nThuật toán này có thể dùng để tính giá trị số hạng \\(a_n\\) của dãy số nào dưới đây?\\n(i) \\(a_n = 7^n, n \\ge 1\\)\\n(ii) \\(a_n = 2(7^n), n \\ge 1\\)\\n(iii) \\(a_n = 7^{n+1}, n \\ge 1\\)\\n(iv) \\(a_n = 2(7^{n+1}), n \\ge 1\\)",
        "options": [
            "A. (i)",
            "B. (ii)",
            "C. (iii)",
            "D. (iv)",
            "E. None of the other choices is correct"
        ],
        "answer": "D",
        "explanation": [
            "Bước 1: Xác định điều kiện cơ sở và công thức truy hồi của dãy số:",
            "- Khi \\(n = 1\\): \\(a_1 = 98 = 2 \\times 49 = 2 \\times 7^2 = 2 \\times 7^{1 + 1}\\).",
            "- Khi \\(n > 1\\): \\(a_n = 7 \\cdot a_{n-1}\\).",
            "Bước 2: Tìm công thức tổng quát của cấp số nhân:",
            "\\[ a_n = a_1 \\cdot 7^{n-1} = (2 \\cdot 7^2) \\cdot 7^{n-1} = 2 \\cdot 7^{n+1} \\quad (\\forall n \\ge 1) \\]",
            "Biểu thức tổng quát chính là \\(a_n = 2(7^{n+1})\\), tương ứng với mệnh đề (iv) và đáp án D."
        ],
        "chapter": "Ch5_Induction_Recursion",
        "difficulty": "easy",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_021_results.json",
        "original_image": "0821_q821_Question_821.png"
    },
    {
        "id": 822,
        "question": "Tìm giá trị của \\(f(256)\\), biết rằng hàm \\(f\\) thỏa mãn hệ thức truy hồi chia để trị \\(f(n) = f(n/4) + 2n\\) với điều kiện ban đầu \\(f(1) = 2\\):",
        "options": [
            "A. 682",
            "B. 342",
            "C. 512",
            "D. 1022",
            "E. None of the other choices is correct"
        ],
        "answer": "A",
        "explanation": [
            "Bước 1: Tính liên tiếp các giá trị của \\(f(n)\\) tại các lũy thừa của 4 từ \\(n = 1\\) đến \\(n = 256\\):",
            "- \\(f(1) = 2\\)",
            "- \\(f(4) = f(1) + 2(4) = 2 + 8 = 10\\)",
            "- \\(f(16) = f(4) + 2(16) = 10 + 32 = 42\\)",
            "- \\(f(64) = f(16) + 2(64) = 42 + 128 = 170\\)",
            "- \\(f(256) = f(64) + 2(256) = 170 + 512 = 682\\)",
            "Bước 2: Kết quả cuối cùng là 682, tương ứng với đáp án A."
        ],
        "chapter": "Ch5_Induction_Recursion",
        "difficulty": "medium",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_021_results.json",
        "original_image": "0822_q822_Question_822.png"
    },
    {
        "id": 823,
        "question": "Dãy nào sau đây là dãy bậc của một đơn đồ thị (Which of the following is the sequence of degrees of a simple graph)?",
        "options": [
            "A. 0, 2, 2, 2, 3",
            "B. 1, 2, 3, 3",
            "C. 2, 2, 3, 3, 3, 4",
            "D. 1, 1, 2, 4",
            "E. None of the other choices is correct"
        ],
        "answer": "E",
        "explanation": [
            "Bước 1: Kiểm tra tính chẵn của tổng bậc (Bổ đề bắt tay) cho từng phương án:",
            "- Dãy A (0, 2, 2, 2, 3): Tổng bậc = 9 (lẻ) \\(\\implies\\) không thể là đồ thị.",
            "- Dãy B (1, 2, 3, 3): Tổng bậc = 9 (lẻ) \\(\\implies\\) không thể là đồ thị.",
            "- Dãy C (2, 2, 3, 3, 3, 4): Tổng bậc = 17 (lẻ) \\(\\implies\\) không thể là đồ thị.",
            "Bước 2: Kiểm tra dãy D (1, 1, 2, 4):",
            "- Tổng bậc = 8 (chẵn). Tuy nhiên, dãy gồm đúng 4 đỉnh nhưng lại có 1 đỉnh mang bậc bằng 4.",
            "- Trong đơn đồ thị có 4 đỉnh, mỗi đỉnh chỉ có thể nối với tối đa \\(4 - 1 = 3\\) đỉnh khác (không có khuyên và cạnh bội). Bậc cực đại không thể vượt quá 3, do đó đỉnh bậc 4 là không thể tồn tại.",
            "Vì cả 4 phương án A, B, C, D đều không thể là dãy bậc của đơn đồ thị, đáp án chính xác là E (None of the other choices is correct)."
        ],
        "chapter": "Ch8_Graphs",
        "difficulty": "medium",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_021_results.json",
        "original_image": "0823_q823_Question_823.png"
    },
    {
        "id": 824,
        "question": "Những phát biểu nào sau đây là ĐÚNG về đẳng cấu đồ thị?\\n(i) Hai đồ thị bất kỳ có cùng số đỉnh và số cạnh thì đẳng cấu với nhau (Any two graphs with the same number of vertices and edges are isomorphic).\\n(ii) Hai đồ thị bất kỳ có cùng ma trận kề thì đẳng cấu với nhau (Any two graphs with the same adjacency matrices are isomorphic).",
        "options": [
            "A. (i)",
            "B. (i) and (ii)",
            "C. (ii)",
            "D. None of the other choices is correct"
        ],
        "answer": "C",
        "explanation": [
            "Bước 1: Phân tích phát biểu (i):",
            "- Hai đồ thị có cùng số đỉnh và số cạnh không nhất thiết phải đẳng cấu. Ví dụ: chu trình \\(C_4\\) (4 đỉnh, 4 cạnh) và đồ thị gồm tam giác \\(C_3\\) nối thêm 1 cạnh đuôi (4 đỉnh, 4 cạnh) có cấu trúc hoàn toàn khác nhau. Do đó phát biểu (i) là SAI.",
            "Bước 2: Phân tích phát biểu (ii):",
            "- Nếu hai đồ thị có cùng ma trận kề (dưới cùng một thứ tự sắp xếp đỉnh tương ứng), thì ánh xạ đồng nhất giữa hai tập đỉnh bảo toàn toàn bộ quan hệ kề giữa các đỉnh. Do đó hai đồ thị là đẳng cấu. Phát biểu (ii) là ĐÚNG.",
            "Vậy chỉ có phát biểu (ii) đúng, tương ứng với đáp án C."
        ],
        "chapter": "Ch8_Graphs",
        "difficulty": "easy",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_021_results.json",
        "original_image": "0824_q824_Question_824.png"
    },
    {
        "id": 825,
        "question": "Cho \\(M\\) là ma trận liên thuộc (incidence matrix) của đồ thị dưới đây, với các hàng được đánh số theo các đỉnh \\(v_1, v_2, v_3, v_4\\) và các cột được đánh số theo các cạnh \\(e_1, e_2, e_3, e_4, e_5\\). Tổng các phần tử ở hàng thứ tư của ma trận \\(M\\) là bao nhiêu?",
        "options": [
            "A. 3",
            "B. 4",
            "C. 2",
            "D. 0",
            "E. None of the other choices is correct"
        ],
        "answer": "A",
        "explanation": [
            "Bước 1: Nhắc lại định nghĩa ma trận liên thuộc đỉnh - cạnh của đồ thị vô hướng:",
            "- Phần tử \\(M_{i, j} = 1\\) nếu cạnh \\(e_j\\) liên thuộc với đỉnh \\(v_i\\), và \\(M_{i, j} = 0\\) nếu không liên thuộc.",
            "- Do đó, tổng các phần tử trên hàng thứ \\(i\\) của ma trận \\(M\\) chính bằng số cạnh liên thuộc với đỉnh \\(v_i\\), tức là bằng bậc \\(\\deg(v_i)\\).",
            "Bước 2: Xác định bậc của đỉnh \\(v_4\\) (hàng thứ tư của \\(M\\)):",
            "- Quan sát hình vẽ, đỉnh \\(v_4\\) nối với các cạnh:",
            "  + Cạnh \\(e_2\\) (nối \\(v_1\\) và \\(v_4\\))",
            "  + Cạnh \\(e_3\\) (nối \\(v_2\\) và \\(v_4\\))",
            "  + Cạnh \\(e_5\\) (nối \\(v_3\\) và \\(v_4\\))",
            "- Đỉnh \\(v_4\\) liên thuộc với đúng 3 cạnh, do đó hàng thứ tư là: \\([0, 1, 1, 0, 1]\\) với tổng các phần tử bằng 3.",
            "Do đó đáp án chính xác là A (3)."
        ],
        "chapter": "Ch8_Graphs",
        "difficulty": "easy",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_021_results.json",
        "original_image": "0825_q825_Question_825.png",
        "svg": """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 220" width="100%" height="auto" style="max-width:320px;display:block;margin:auto;">
  <defs>
    <style>
      .node-c { fill: #eff6ff; stroke: #1e40af; stroke-width: 2px; }
      .edge-l { stroke: #0d9488; stroke-width: 2px; }
      .lbl { font-family: system-ui, sans-serif; font-size: 14px; font-weight: bold; fill: #0f172a; text-anchor: middle; dominant-baseline: central; }
      .e-lbl { font-family: system-ui, sans-serif; font-size: 13px; font-weight: bold; fill: #b91c1c; text-anchor: middle; dominant-baseline: central; }
    </style>
  </defs>
  <!-- Edges -->
  <line class="edge-l" x1="70" y1="50" x2="230" y2="50"/><text class="e-lbl" x="150" y="38">e1</text>
  <line class="edge-l" x1="70" y1="50" x2="70" y2="170"/><text class="e-lbl" x="55" y="110">e2</text>
  <line class="edge-l" x1="230" y1="50" x2="70" y2="170"/><text class="e-lbl" x="140" y="130">e3</text>
  <line class="edge-l" x1="70" y1="50" x2="230" y2="170"/><text class="e-lbl" x="175" y="95">e4</text>
  <line class="edge-l" x1="70" y1="170" x2="230" y2="170"/><text class="e-lbl" x="150" y="182">e5</text>
  <!-- Nodes -->
  <circle class="node-c" cx="70" cy="50" r="13"/><text class="lbl" x="70" y="50">v1</text>
  <circle class="node-c" cx="230" cy="50" r="13"/><text class="lbl" x="230" y="50">v2</text>
  <circle class="node-c" cx="230" cy="170" r="13"/><text class="lbl" x="230" y="170">v3</text>
  <circle class="node-c" cx="70" cy="170" r="13"/><text class="lbl" x="70" y="170">v4</text>
</svg>"""
    },
    {
        "id": 826,
        "question": "Mệnh đề nào sau đây là SAI (Which of the following propositions is FALSE)?\\n(i) Nếu \\(K_4\\) có chu trình Hamilton thì \\(C_3\\) có chu trình Hamilton (If K4 has a Hamilton circuit, then C3 has a Hamilton circuit).\\n(ii) Nếu \\(W_5\\) có chu trình Hamilton thì \\(K_2\\) có chu trình Hamilton (If W5 has a Hamilton circuit, then K2 has a Hamilton circuit).",
        "options": [
            "A. Both (i) and (ii)",
            "B. Only (ii)",
            "C. None of (i) or (ii)",
            "D. Only (i)",
            "E. None of the other choices is correct"
        ],
        "answer": "B",
        "explanation": [
            "Bước 1: Xét giá trị chân lý của mệnh đề điều kiện (i) dạng \\(P \\to Q\\):",
            "- Tiền đề: \"\\(K_4\\) có chu trình Hamilton\": Đúng (ví dụ chu trình 1-2-3-4-1).",
            "- Kết luận: \"\\(C_3\\) có chu trình Hamilton\": Đúng (chu trình tam giác đi qua cả 3 đỉnh).",
            "- Phép kéo theo \\(T \\to T\\) là Đúng. Vậy mệnh đề (i) là ĐÚNG.",
            "Bước 2: Xét giá trị chân lý của mệnh đề điều kiện (ii) dạng \\(R \\to S\\):",
            "- Tiền đề: \"\\(W_5\\) có chu trình Hamilton\": Đúng (đồ thị bánh xe \\(W_n\\) với \\(n \\ge 3\\) luôn có chu trình Hamilton).",
            "- Kết luận: \"\\(K_2\\) có chu trình Hamilton\": Sai (chu trình đơn trong đơn đồ thị phải có độ dài ít nhất là 3, đồ thị 2 đỉnh \\(K_2\\) không thể có chu trình).",
            "- Phép kéo theo \\(T \\to F\\) là SAI. Vậy mệnh đề (ii) là SAI.",
            "Câu hỏi yêu cầu tìm mệnh đề SAI, do đó đáp án là B (Only (ii))."
        ],
        "chapter": "Ch8_Graphs",
        "difficulty": "medium",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_021_results.json",
        "original_image": "0826_q826_Question_826.png"
    },
    {
        "id": 827,
        "question": "Cho \\(C(x) = \\text{\"x is a student in your school\"}\\), \\(P(x) = \\text{\"x plays badminton\"}\\), \\(J(x) = \\text{\"x knows the computer language Java\"}\\). Biểu diễn câu: \"All students at your school either play badminton or know Java, but not both\":",
        "options": [
            "A. \\(\\forall x (C(x) \\land (P(x) \\lor J(x)))\\)",
            "B. \\(\\forall x (C(x) \\to (P(x) \\lor J(x)))\\)",
            "C. \\(\\forall x (C(x) \\to (P(x) \\oplus J(x)))\\)",
            "D. \\(\\forall x (C(x) \\land (P(x) \\oplus J(x)))\\)",
            "E. None of the other choices is correct"
        ],
        "answer": "C",
        "explanation": [
            "Bước 1: Phân tích cấu trúc ngữ nghĩa của câu:",
            "- \"All students at your school...\" nói về mọi người \\(x\\): nếu \\(x\\) là học sinh trường bạn (\\(C(x)\\)) thì...",
            "- Cấu trúc phổ quát dạng \"Mọi A đều B\" được biểu diễn bằng \\(\\forall x (A(x) \\to B(x))\\).",
            "- Cụm \"either play badminton or know Java, but not both\" thể hiện phép tuyển loại trừ (exclusive OR, ký hiệu \\(\\oplus\\)), tương ứng với \\(P(x) \\oplus J(x)\\).",
            "Bước 2: Ghép lại ta thu được biểu thức: \\(\\forall x (C(x) \\to (P(x) \\oplus J(x)))\\), tương ứng với đáp án C."
        ],
        "chapter": "Ch1_Logic_and_Proofs",
        "difficulty": "easy",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_021_results.json",
        "original_image": "0827_q827_Question_827.png"
    },
    {
        "id": 828,
        "question": "Những hàm số nào sau đây thuộc lớp \\(O(x^3)\\)?\\n(i) \\(f(x) = 8x^3 + 13x^2 + 98x \\log x\\)\\n(ii) \\(f(x) = \\lfloor x^2 + 1 \\rfloor \\lfloor x^2 - 1 \\rfloor\\)\\n(iii) \\(f(x) = 2x^2 + x^3 \\log x\\)",
        "options": [
            "A. (ii)",
            "B. (i) and (ii)",
            "C. (i) and (iii)",
            "D. All of (i), (ii) and (iii)",
            "E. Only (i)"
        ],
        "answer": "E",
        "explanation": [
            "Bước 1: Phân tích tốc độ tăng của từng hàm số khi \\(x \\to \\infty\\):",
            "- Hàm (i) \\(f(x) = 8x^3 + 13x^2 + 98x \\log x\\): Bậc cao nhất là \\(x^3\\), nên \\(f(x) = \\Theta(x^3) = O(x^3)\\) (thỏa mãn).",
            "- Hàm (ii) \\(f(x) = \\lfloor x^2 + 1 \\rfloor \\lfloor x^2 - 1 \\rfloor \\approx x^4\\): Bậc 4 tăng nhanh hơn bậc 3, nên \\(f(x) = \\Theta(x^4) \\ne O(x^3)\\) (không thỏa mãn).",
            "- Hàm (iii) \\(f(x) = 2x^2 + x^3 \\log x\\): Do \\(\\log x \\to \\infty\\), số hạng \\(x^3 \\log x\\) tăng nhanh hơn \\(x^3\\), nên \\(f(x) \\ne O(x^3)\\) (không thỏa mãn).",
            "Bước 2: Trong các hàm đã cho, chỉ có duy nhất hàm (i) thuộc lớp \\(O(x^3)\\).",
            "Đáp án chính xác là E (Only (i))."
        ],
        "chapter": "Ch3_Algorithms",
        "difficulty": "medium",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_021_results.json",
        "original_image": "0828_q828_Question_828.png"
    },
    {
        "id": 829,
        "question": "Một cây 3-phân đầy đủ (full 3-ary tree) có 101 lá thì có bao nhiêu đỉnh trong (How many internal vertices in a full 3-ary tree with 101 leaves)?",
        "options": [
            "A. 151",
            "B. 104",
            "C. 50",
            "D. None of the other choices is correct",
            "E. 51"
        ],
        "answer": "C",
        "explanation": [
            "Bước 1: Sử dụng công thức chuẩn liên hệ giữa số lá \\(L\\) và số đỉnh trong \\(i\\) của cây \\(m\\)-phân đầy đủ:",
            "\\[ L = (m - 1)i + 1 \\]",
            "Bước 2: Thay \\(m = 3\\) và \\(L = 101\\) vào phương trình:",
            "\\[ 101 = (3 - 1)i + 1 = 2i + 1 \\]",
            "\\[ 2i = 101 - 1 = 100 \\implies i = 50 \\]",
            "Số đỉnh trong của cây là 50, tương ứng với đáp án C (50)."
        ],
        "chapter": "Ch9_Trees",
        "difficulty": "easy",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_021_results.json",
        "original_image": "0829_q829_Question_829.png"
    },
    {
        "id": 830,
        "question": "Cho các mệnh đề: \\(p = \\text{\"You have the flu\"}\\), \\(q = \\text{\"You miss the final examination\"}\\), \\(r = \\text{\"You pass the course\"}\\). Biểu diễn câu sau thành biểu thức logic: \"If you have the flu but you don't miss the final examination, then you pass the course\":\\n(i) \\((p \\lor \\neg q) \\to r\\)\\n(ii) \\((\\neg p \\lor q) \\to r\\)\\n(iii) \\((p \\land \\neg q) \\to r\\)\\n(iv) \\((\\neg p \\land q) \\to r\\)",
        "options": [
            "A. (iii)",
            "B. (i)",
            "C. (iv)",
            "D. (ii)",
            "E. None of the other choices is correct"
        ],
        "answer": "A",
        "explanation": [
            "Bước 1: Phân tích cấu trúc câu điều kiện \"If A then B\":",
            "- Tiền đề A: \"you have the flu but you don't miss the final examination\" gồm mệnh đề \\(p\\) (\"have the flu\"), từ nối \"but\" (hội \\(\\land\\)), và phủ định \\(\\neg q\\) (\"don't miss the exam\") \\(\\implies (p \\land \\neg q)\\).",
            "- Kết luận B: \"you pass the course\" \\(\\implies r\\).",
            "Bước 2: Ghép lại theo quan hệ kéo theo: \\((p \\land \\neg q) \\to r\\), tương ứng với biểu thức (iii).",
            "Do đó đáp án chính xác là A."
        ],
        "chapter": "Ch1_Logic_and_Proofs",
        "difficulty": "easy",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_021_results.json",
        "original_image": "0830_q830_Question_830.png"
    },
    {
        "id": 831,
        "question": "Cho \\(C(x) = \\text{\"x is a student in your school\"}\\), \\(P(x) = \\text{\"x plays badminton\"}\\), \\(J(x) = \\text{\"x knows the computer language Java\"}\\). Biểu diễn câu: \"Some students at your school either play badminton or know Java, but not both\":\\n(i) \\(\\exists x (C(x) \\land (P(x) \\lor J(x)))\\)\\n(ii) \\(\\exists x (C(x) \\to (P(x) \\lor J(x)))\\)\\n(iii) \\(\\exists x (C(x) \\to (P(x) \\oplus J(x)))\\)\\n(iv) \\(\\exists x (C(x) \\land (P(x) \\oplus J(x)))\\)",
        "options": [
            "A. (i)",
            "B. (ii)",
            "C. (iii)",
            "D. (iv)",
            "E. None of the other choices is correct"
        ],
        "answer": "D",
        "explanation": [
            "Bước 1: Phân tích lượng từ và các phép toán liên kết:",
            "- \"Some students...\" mang ý nghĩa tồn tại (lượng từ \\(\\exists\\)). Với lượng từ tồn tại, tính chất đối tượng phải được liên kết bằng phép hội \\(\\land\\) chứ không dùng phép kéo theo \\(\\to\\).",
            "- Điều kiện thuộc trường: \\(C(x)\\).",
            "- Điều kiện hoạt động \"either play badminton or know Java, but not both\": phép tuyển loại trừ (XOR) \\(P(x) \\oplus J(x)\\).",
            "Bước 2: Ghép lại ta thu được: \\(\\exists x (C(x) \\land (P(x) \\oplus J(x)))\\), tương ứng với mệnh đề (iv).",
            "Do đó đáp án đúng là D."
        ],
        "chapter": "Ch1_Logic_and_Proofs",
        "difficulty": "easy",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_021_results.json",
        "original_image": "0831_q831_Question_831.png"
    },
    {
        "id": 832,
        "question": "Cho \\(C(x) = \\text{\"x is a student\"}\\), \\(D(x) = \\text{\"x studies Discrete Mathematics\"}\\), không gian mẫu là tất cả mọi người. Dịch câu sau sang biểu thức logic: \"There is a student who studies Discrete Mathematics\":\\n(i) \\(\\forall x (C(x) \\to D(x))\\)\\n(ii) \\(\\forall x (C(x) \\land D(x))\\)\\n(iii) \\(\\exists x (C(x) \\to D(x))\\)\\n(iv) \\(\\exists x (C(x) \\land D(x))\\)",
        "options": [
            "A. (i)",
            "B. (ii)",
            "C. (iii)",
            "D. (iv)",
            "E. None of the other choices is correct"
        ],
        "answer": "D",
        "explanation": [
            "Bước 1: Phân tích câu phát biểu:",
            "- \"There is...\" (Có một / Tồn tại) tương ứng với lượng từ tồn tại \\(\\exists x\\).",
            "- Đối tượng được nói tới vừa là sinh viên (\\(C(x)\\)) vừa học Toán rời rạc (\\(D(x)\\)), nên hai tính chất này đồng thời xảy ra, liên kết bằng phép hội \\(\\land\\).",
            "Bước 2: Biểu thức logic chuẩn là: \\(\\exists x (C(x) \\land D(x))\\), tương ứng với mệnh đề (iv).",
            "Do đó đáp án chính xác là D."
        ],
        "chapter": "Ch1_Logic_and_Proofs",
        "difficulty": "easy",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_021_results.json",
        "original_image": "0832_q832_Question_832.png"
    },
    {
        "id": 833,
        "question": "Cho \\(S(x) = \\text{\"x is a student\"}\\), \\(F(x) = \\text{\"x is a teacher\"}\\), \\(P(x, y) = \\text{\"teacher x teaches student y\"}\\). Dịch biểu thức sau sang ngôn ngữ tự nhiên:\\n\\[ \\forall x \\left( S(x) \\to \\exists y (F(y) \\land P(y, x)) \\right) \\]",
        "options": [
            "A. There is a student being taught by all teachers",
            "B. Each student is taught by some teacher",
            "C. There is a teacher who teaches all students",
            "D. Each teacher teaches some student",
            "E. None of the other choices is correct"
        ],
        "answer": "B",
        "explanation": [
            "Bước 1: Phân tích biểu thức vị từ theo từng lớp lượng từ:",
            "- \\(\\forall x (S(x) \\to \\dots)\\): \"Với mỗi người \\(x\\), nếu \\(x\\) là một sinh viên thì...\".",
            "- \\(\\exists y (F(y) \\land P(y, x))\\): \"...tồn tại một người \\(y\\) là giáo viên sao cho giáo viên \\(y\\) dạy sinh viên \\(x\\)\".",
            "Bước 2: Ghép lại thành câu tiếng Anh tự nhiên:",
            "\"Mỗi sinh viên đều được dạy bởi một giáo viên nào đó\" (\"Each student is taught by some teacher\").",
            "Do đó đáp án chính xác là B."
        ],
        "chapter": "Ch1_Logic_and_Proofs",
        "difficulty": "medium",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_021_results.json",
        "original_image": "0833_q833_Question_833.png"
    },
    {
        "id": 834,
        "question": "Phát biểu nào sau đây KHÔNG PHẢI là một quy tắc suy diễn hợp lệ (Which statement(s) in the following is NOT a rule of inference)?\\n(i) If you know P and P -> Q, you may write down Q.\\n(ii) If you know Q and P -> Q, you may write down P.\\n(iii) If you know (P v Q) and ~P, you may write down Q.\\n(iv) If you know P and Q, you may write down P ^ Q.",
        "options": [
            "A. (i)",
            "B. (ii)",
            "C. (iii)",
            "D. (iv)",
            "E. None of the other choices is correct"
        ],
        "answer": "B",
        "explanation": [
            "Bước 1: Kiểm tra tính hợp lệ của từng quy tắc suy diễn:",
            "- (i) Quy tắc Modus Ponens (Khẳng định tiền đề): \\(P, P \\to Q \\vdash Q\\) (Hợp lệ).",
            "- (ii) Từ \\(Q\\) và \\(P \\to Q\\) suy ra \\(P\\): Đây là ngụy biện khẳng định kết luận (Fallacy of affirming the consequent), hoàn toàn KHÔNG PHẢI là quy tắc suy diễn hợp lệ.",
            "- (iii) Tam đoạn luận tuyển (Disjunctive Syllogism): \\(P \\lor Q, \\neg P \\vdash Q\\) (Hợp lệ).",
            "- (iv) Quy tắc hội (Conjunction): \\(P, Q \\vdash P \\land Q\\) (Hợp lệ).",
            "Bước 2: Khẳng định không phải quy tắc suy diễn là (ii), tương ứng với đáp án B."
        ],
        "chapter": "Ch1_Logic_and_Proofs",
        "difficulty": "easy",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_021_results.json",
        "original_image": "0834_q834_Question_834.png"
    },
    {
        "id": 835,
        "question": "Cho hai tập hợp \\(A\\) và \\(B\\). Giả sử tích Descartes \\(A \\times B = \\emptyset\\). Chọn kết luận đúng nhất (Choose the best answer):\\n(i) \\(A = \\emptyset\\)\\n(ii) \\((A = \\emptyset) \\land (B = \\emptyset)\\)\\n(iii) \\((A = \\emptyset) \\oplus (B = \\emptyset)\\)\\n(iv) \\((A = \\emptyset) \\lor (B = \\emptyset)\\)",
        "options": [
            "A. (iv)",
            "B. (i)",
            "C. (ii)",
            "D. (iii)",
            "E. None of the other choices is correct"
        ],
        "answer": "A",
        "explanation": [
            "Bước 1: Phân tích định nghĩa tích Descartes \\(A \\times B = \\{(a, b) \\mid a \\in A \\land b \\in B\\}\\):",
            "- Tích Descartes \\(A \\times B\\) không chứa phần tử nào (bằng tập rỗng \\(\\emptyset\\)) khi và chỉ khi không thể tạo được bất kỳ cặp \\((a, b)\\) nào.",
            "- Điều này xảy ra khi và chỉ khi ít nhất một trong hai tập hợp \\(A\\) hoặc \\(B\\) là tập rỗng.",
            "Bước 2: Trong ngôn ngữ logic:",
            "\\[ A \\times B = \\emptyset \\iff (A = \\emptyset) \\lor (B = \\emptyset) \\]",
            "Biểu thức tương ứng là mệnh đề (iv), được chọn ở đáp án A."
        ],
        "chapter": "Ch2_Basic_Structures",
        "difficulty": "easy",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_021_results.json",
        "original_image": "0835_q835_Question_835.png"
    },
    {
        "id": 836,
        "question": "Cho \\(a\\) và \\(b\\) là các số thực thỏa mãn \\(0 < a, b < 1\\). Tìm giá trị lớn nhất của hàm sàn \\(\\lfloor a + b \\rfloor\\) và hàm trần \\(\\lceil a + b \\rceil\\):",
        "options": [
            "A. 0 and 1",
            "B. 1 and 1",
            "C. 1 and 2",
            "D. 2 and 2",
            "E. None of the other choices is correct"
        ],
        "answer": "C",
        "explanation": [
            "Bước 1: Xác định khoảng giá trị của tổng \\(a + b\\):",
            "- Do \\(0 < a < 1\\) và \\(0 < b < 1\\), ta có khoảng giá trị mở: \\(0 < a + b < 2\\).",
            "Bước 2: Tìm giá trị lớn nhất có thể đạt được của hàm sàn và hàm trần:",
            "- Khi \\(1 \\le a + b < 2\\) (ví dụ chọn \\(a = 0.9, b = 0.9 \\implies a + b = 1.8\\)):",
            "  + Hàm sàn: \\(\\lfloor a + b \\rfloor = \\lfloor 1.8 \\rfloor = 1\\). Vì \\(a + b < 2\\), hàm sàn không bao giờ đạt tới 2, do đó giá trị lớn nhất là 1.",
            "  + Hàm trần: \\(\\lceil a + b \\rceil = \\lceil 1.8 \\rceil = 2\\). Vì \\(a + b > 1\\), trần của nó đạt tối đa là 2.",
            "Vậy giá trị lớn nhất tương ứng là 1 và 2, chọn phương án C."
        ],
        "chapter": "Ch2_Basic_Structures",
        "difficulty": "easy",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_021_results.json",
        "original_image": "0836_q836_Question_836.png"
    },
    {
        "id": 837,
        "question": "Cho hàm số \\(f: \\mathbb{N} \\to \\mathbb{N}\\) xác định bởi \\(f(n) = \\lfloor \\sqrt{n} \\rfloor\\). Khẳng định nào sau đây là ĐÚNG (Which statement is TRUE)?",
        "options": [
            "A. f is one-to-one but not onto",
            "B. f is onto but not one-to-one",
            "C. f is bijection",
            "D. f is neither one-to-one nor onto",
            "E. None of the other choices is correct"
        ],
        "answer": "B",
        "explanation": [
            "Bước 1: Kiểm tra tính đơn ánh (one-to-one / injective):",
            "- Ta xét các giá trị: \\(f(1) = \\lfloor \\sqrt{1} \\rfloor = 1\\), \\(f(2) = \\lfloor \\sqrt{2} \\rfloor = 1\\), \\(f(3) = \\lfloor \\sqrt{3} \\rfloor = 1\\).",
            "- Các phần tử khác nhau có cùng giá trị ảnh \\(f(1) = f(2) = f(3) = 1\\), do đó hàm \\(f\\) KHÔNG PHẢI là đơn ánh.",
            "Bước 2: Kiểm tra tính toàn ánh (onto / surjective):",
            "- Với mọi số tự nhiên \\(k \\in \\mathbb{N}\\), ta chọn \\(n = k^2 \\in \\mathbb{N}\\). Khi đó \\(f(n) = \\lfloor \\sqrt{k^2} \\rfloor = \\lfloor k \\rfloor = k\\).",
            "- Như vậy, mọi phần tử thuộc tập đích đều có nghịch ảnh, do đó hàm \\(f\\) LÀ TOÀN ÁNH.",
            "Kết luận: hàm \\(f\\) là toàn ánh nhưng không đơn ánh ('f is onto but not one-to-one'), tương ứng với đáp án B."
        ],
        "chapter": "Ch2_Basic_Structures",
        "difficulty": "easy",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_021_results.json",
        "original_image": "0837_q837_Question_837.png"
    },
    {
        "id": 838,
        "question": "Sử dụng thuật toán Sắp xếp nổi bọt (Bubble Sort) để sắp xếp dãy số \\(\\{8, 4, 5, 7, 1\\}\\) theo thứ tự tăng dần. Kết quả sau lượt duyệt (iteration) thứ hai là gì?",
        "options": [
            "A. {4, 5, 1, 7, 8}",
            "B. {1, 4, 5, 7, 8}",
            "C. {4, 5, 7, 8, 1}",
            "D. None of the other choices is correct"
        ],
        "answer": "A",
        "explanation": [
            "Bước 1: Mô phỏng lượt duyệt thứ nhất (Pass 1) trên dãy ban đầu \\([8, 4, 5, 7, 1]\\):",
            "- So sánh 8 và 4: đổi chỗ \\(\\to [4, 8, 5, 7, 1]\\).",
            "- So sánh 8 và 5: đổi chỗ \\(\\to [4, 5, 8, 7, 1]\\).",
            "- So sánh 8 và 7: đổi chỗ \\(\\to [4, 5, 7, 8, 1]\\).",
            "- So sánh 8 và 1: đổi chỗ \\(\\to [4, 5, 7, 1, 8]\\).",
            "Kết thúc lượt 1, phần tử lớn nhất 8 đã về cuối mảng: \\([4, 5, 7, 1, 8]\\).",
            "Bước 2: Mô phỏng lượt duyệt thứ hai (Pass 2) trên dãy \\([4, 5, 7, 1, 8]\\):",
            "- So sánh 4 và 5: đúng thứ tự, giữ nguyên.",
            "- So sánh 5 và 7: đúng thứ tự, giữ nguyên.",
            "- So sánh 7 và 1: đổi chỗ \\(\\to [4, 5, 1, 7, 8]\\).",
            "Kết thúc lượt 2, dãy thu được là \\(\\{4, 5, 1, 7, 8\\}\\), tương ứng với đáp án A."
        ],
        "chapter": "Ch3_Algorithms",
        "difficulty": "easy",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_021_results.json",
        "original_image": "0838_q838_Question_838.png"
    },
    {
        "id": 839,
        "question": "Tìm số nguyên nhỏ nhất \\(n\\) sao cho hàm số \\(f(x) = x^5 \\log x^6 + x^6 \\log x^5\\) là \\(O(x^n)\\):",
        "options": [
            "A. 6",
            "B. 7",
            "C. 8",
            "D. None of the above"
        ],
        "answer": "B",
        "explanation": [
            "Bước 1: Rút gọn hàm số \\(f(x)\\) bằng cách đưa số mũ của logarit ra ngoài:",
            "\\[ f(x) = x^5 \\log(x^6) + x^6 \\log(x^5) = 6 x^5 \\log x + 5 x^6 \\log x \\]",
            "- Khi \\(x \\to \\infty\\), số hạng bậc cao nhất quyết định tốc độ tăng là \\(5 x^6 \\log x\\), do đó \\(f(x) = \\Theta(x^6 \\log x)\\).",
            "Bước 2: Tìm cận trên theo hàm đa thức \\(x^n\\):",
            "- Vì \\(\\log x\\) tăng chậm hơn bất kỳ hàm đa thức nào với số mũ dương: với \\(n = 7\\), ta có \\(\\lim_{x \\to \\infty} \\frac{x^6 \\log x}{x^7} = \\lim_{x \\to \\infty} \\frac{\\log x}{x} = 0\\), do đó \\(f(x) = O(x^7)\\).",
            "- Với \\(n = 6\\), \\(\\lim_{x \\to \\infty} \\frac{x^6 \\log x}{x^6} = \\lim_{x \\to \\infty} \\log x = \\infty\\), nên \\(f(x)\\) không phải là \\(O(x^6)\\).",
            "Số nguyên nhỏ nhất thỏa mãn là \\(n = 7\\), tương ứng với đáp án B."
        ],
        "chapter": "Ch3_Algorithms",
        "difficulty": "medium",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_021_results.json",
        "original_image": "0839_q839_Question_839.png"
    },
    {
        "id": 840,
        "question": "Đưa ra đánh giá Big-O cho số lượng phép toán được sử dụng trong đoạn mã thuật toán sau:\\n\\n```text\\nfor i := 1 to n\\n    for j := 1 to i\\n        k := k + 1\\n    end\\nend\\n```",
        "options": [
            "A. O(n log n)",
            "B. O(n)",
            "C. O(n^3)",
            "D. O(n^2)",
            "E. None of the other choices is correct"
        ],
        "answer": "D",
        "explanation": [
            "Bước 1: Đếm tổng số lần thực hiện câu lệnh trong thân vòng lặp lồng nhau:",
            "- Với mỗi giá trị của \\(i\\) chạy từ 1 đến \\(n\\), vòng lặp trong theo \\(j\\) chạy đúng \\(i\\) lần.",
            "- Tổng số lần thực hiện phép toán là tổng của dãy số tự nhiên liên tiếp:",
            "\\[ T(n) = \\sum_{i=1}^n i = 1 + 2 + 3 + \\dots + n = \\frac{n(n + 1)}{2} = \\frac{1}{2} n^2 + \\frac{1}{2} n \\]",
            "Bước 2: Đánh giá độ phức tạp thuật toán:",
            "- Bậc cao nhất của đa thức là \\(n^2\\), do đó số lượng phép toán là \\(O(n^2)\\).",
            "Đáp án đúng là D (O(n^2))."
        ],
        "chapter": "Ch3_Algorithms",
        "difficulty": "easy",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_021_results.json",
        "original_image": "0840_q840_Question_840.png"
    }
]

def update_dataset():
    sample_path = "v2/questions_sample_v2.json"
    with open(sample_path, "r", encoding="utf-8") as f:
        existing_data = json.load(f)
    
    existing_dict = {q["id"]: q for q in existing_data}
    
    for q in BATCH_21_QUESTIONS:
        existing_dict[q["id"]] = q
        
    updated_list = sorted(list(existing_dict.values()), key=lambda x: x["id"])
    
    with open(sample_path, "w", encoding="utf-8") as f:
        json.dump(updated_list, f, ensure_ascii=False, indent=2)
        
    js_content = f"export const sampleQuestions = {json.dumps(updated_list, ensure_ascii=False, indent=2)};\n"
    with open("v2/questions_v2.js", "w", encoding="utf-8") as f:
        f.write(js_content)
        
    print(f"Batch 21 integrated successfully. Total questions in dataset: {len(updated_list)}")

if __name__ == "__main__":
    update_dataset()
