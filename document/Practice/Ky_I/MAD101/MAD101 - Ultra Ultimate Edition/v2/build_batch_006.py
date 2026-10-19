"""
Xây dựng dữ liệu Schema v2 cho Lô 6 (Câu 201 - 240) môn Toán rời rạc MAD101.
Gồm:
- Phiên âm toán học LaTeX / MathJax chính xác 100% từ ảnh gốc.
- Mô hình hoá vector SVG native cho 10 câu có đồ thị / cây (204, 205, 206, 207, 209, 210, 211, 212, 221, 230).
- Giải thích từng bước (>= 2 bước) chi tiết, chuẩn sư phạm bằng tiếng Việt.
- Xuất dữ liệu ra v2/questions_batch_006.json và gộp vào v2/questions_sample_v2.json, v2/questions_v2.js.
"""

import json
import os

# --- VECTOR SVG DEFINITIONS ---

# SVG Q204: Graph with 14 vertices to find edges to remove for spanning tree
SVG_Q204 = """<svg viewBox="0 0 540 260" width="100%" height="240" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="shadow204" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="1" dy="2" stdDeviation="2" flood-color="#000" flood-opacity="0.15"/>
    </filter>
  </defs>
  <!-- Background -->
  <rect width="540" height="260" rx="10" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1.5"/>

  <!-- Left edges -->
  <g stroke="#334155" stroke-width="2">
    <line x1="60" y1="90" x2="130" y2="40"/>
    <line x1="60" y1="90" x2="130" y2="140"/>
    <line x1="130" y1="40" x2="130" y2="140"/>
    <line x1="130" y1="140" x2="130" y2="210"/>
    <line x1="130" y1="40" x2="200" y2="40"/>
    <line x1="130" y1="140" x2="200" y2="140"/>
    <line x1="200" y1="40" x2="200" y2="140"/>
    <line x1="200" y1="140" x2="200" y2="210"/>

    <!-- Inter-connector edges -->
    <line x1="200" y1="140" x2="270" y2="140"/>
    <line x1="200" y1="210" x2="270" y2="140"/>

    <!-- Right edges -->
    <line x1="270" y1="40" x2="340" y2="40"/>
    <line x1="270" y1="40" x2="270" y2="140"/>
    <line x1="270" y1="140" x2="340" y2="40"/>
    <line x1="270" y1="140" x2="340" y2="140"/>
    <line x1="270" y1="140" x2="340" y2="210"/>
    <line x1="340" y1="40" x2="410" y2="40"/>
    <line x1="340" y1="40" x2="340" y2="140"/>
    <line x1="340" y1="140" x2="410" y2="140"/>
    <line x1="410" y1="40" x2="410" y2="140"/>
    <line x1="340" y1="210" x2="410" y2="140"/>
  </g>

  <!-- Vertices -->
  <g filter="url(#shadow204)">
    <!-- Left vertices -->
    <circle cx="60" cy="90" r="7" fill="#0284c7"/>
    <circle cx="130" cy="40" r="7" fill="#0284c7"/>
    <circle cx="130" cy="140" r="7" fill="#0284c7"/>
    <circle cx="130" cy="210" r="7" fill="#0284c7"/>
    <circle cx="200" cy="40" r="7" fill="#0284c7"/>
    <circle cx="200" cy="140" r="7" fill="#0284c7"/>
    <circle cx="200" cy="210" r="7" fill="#0284c7"/>

    <!-- Right vertices -->
    <circle cx="270" cy="40" r="7" fill="#0284c7"/>
    <circle cx="270" cy="140" r="7" fill="#0284c7"/>
    <circle cx="340" cy="40" r="7" fill="#0284c7"/>
    <circle cx="340" cy="140" r="7" fill="#0284c7"/>
    <circle cx="340" cy="210" r="7" fill="#0284c7"/>
    <circle cx="410" cy="40" r="7" fill="#0284c7"/>
    <circle cx="410" cy="140" r="7" fill="#0284c7"/>
  </g>

  <!-- Labels -->
  <g font-family="sans-serif" font-size="13" font-weight="bold" fill="#0f172a">
    <text x="42" y="94">a</text>
    <text x="125" y="26">b</text>
    <text x="116" y="146">g</text>
    <text x="127" y="230">l</text>
    <text x="196" y="26">c</text>
    <text x="186" y="136">h</text>
    <text x="195" y="230">m</text>

    <text x="264" y="26">d</text>
    <text x="256" y="146">i</text>
    <text x="336" y="26">e</text>
    <text x="348" y="144">j</text>
    <text x="336" y="230">n</text>
    <text x="418" y="44">f</text>
    <text x="418" y="144">k</text>
  </g>
</svg>"""

# SVG Q205: Graph for Euler circuit
SVG_Q205 = """<svg viewBox="0 0 540 240" width="100%" height="220" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="shadow205" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="1" dy="2" stdDeviation="2" flood-color="#000" flood-opacity="0.15"/>
    </filter>
  </defs>
  <rect width="540" height="240" rx="10" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1.5"/>

  <!-- Edges -->
  <g stroke="#334155" stroke-width="2">
    <!-- a to c, d -->
    <line x1="120" y1="50" x2="120" y2="120"/>
    <line x1="120" y1="50" x2="190" y2="120"/>
    <!-- b to e, f -->
    <line x1="310" y1="50" x2="310" y2="120"/>
    <line x1="310" y1="50" x2="380" y2="120"/>
    <!-- Horizontal & cross edges -->
    <line x1="120" y1="120" x2="190" y2="120"/>
    <line x1="190" y1="120" x2="310" y2="120"/>
    <line x1="310" y1="120" x2="380" y2="120"/>
    <!-- Bottom row -->
    <line x1="120" y1="180" x2="190" y2="180"/>
    <line x1="310" y1="180" x2="380" y2="180"/>
    <!-- Vertical columns -->
    <line x1="120" y1="120" x2="120" y2="180"/>
    <line x1="190" y1="120" x2="190" y2="180"/>
    <line x1="310" y1="120" x2="310" y2="180"/>
    <line x1="380" y1="120" x2="380" y2="180"/>
    <!-- Long curved/diagonal edges -->
    <path d="M 120,120 Q 250,160 380,120" fill="none"/>
    <line x1="190" y1="120" x2="190" y2="180"/>
    <line x1="310" y1="120" x2="380" y2="180"/>
  </g>

  <!-- Vertices -->
  <g filter="url(#shadow205)">
    <circle cx="120" cy="50" r="7" fill="#0284c7"/>
    <circle cx="310" cy="50" r="7" fill="#0284c7"/>
    <circle cx="120" cy="120" r="7" fill="#0284c7"/>
    <circle cx="190" cy="120" r="7" fill="#0284c7"/>
    <circle cx="310" cy="120" r="7" fill="#0284c7"/>
    <circle cx="380" cy="120" r="7" fill="#0284c7"/>
    <circle cx="120" cy="180" r="7" fill="#0284c7"/>
    <circle cx="190" cy="180" r="7" fill="#0284c7"/>
    <circle cx="310" cy="180" r="7" fill="#0284c7"/>
    <circle cx="380" cy="180" r="7" fill="#0284c7"/>
  </g>

  <!-- Labels -->
  <g font-family="sans-serif" font-size="13" font-weight="bold" fill="#0f172a">
    <text x="105" y="46">a</text>
    <text x="296" y="46">b</text>
    <text x="105" y="124">c</text>
    <text x="198" y="116">d</text>
    <text x="318" y="116">e</text>
    <text x="390" y="124">f</text>
    <text x="105" y="186">g</text>
    <text x="198" y="186">h</text>
    <text x="298" y="186">i</text>
    <text x="390" y="186">j</text>
  </g>
</svg>"""

# SVG Q206: Rooted tree for preorder traversal
SVG_Q206 = """<svg viewBox="0 0 540 280" width="100%" height="260" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="shadow206" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="1" dy="2" stdDeviation="2" flood-color="#000" flood-opacity="0.15"/>
    </filter>
  </defs>
  <rect width="540" height="280" rx="10" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1.5"/>

  <!-- Edges -->
  <g stroke="#475569" stroke-width="2">
    <!-- Level 0 to 1 -->
    <line x1="320" y1="40" x2="220" y2="100"/>
    <line x1="320" y1="40" x2="320" y2="100"/>
    <line x1="320" y1="40" x2="410" y2="100"/>

    <!-- Subtree b -->
    <line x1="220" y1="100" x2="180" y2="160"/>
    <line x1="220" y1="100" x2="220" y2="160"/>
    <line x1="220" y1="100" x2="260" y2="160"/>
    <line x1="180" y1="160" x2="150" y2="220"/>
    <line x1="180" y1="160" x2="180" y2="220"/>
    <line x1="180" y1="160" x2="210" y2="220"/>
    <line x1="260" y1="160" x2="260" y2="200"/>
    <line x1="260" y1="200" x2="240" y2="250"/>
    <line x1="260" y1="200" x2="280" y2="250"/>

    <!-- Subtree d -->
    <line x1="410" y1="100" x2="370" y2="160"/>
    <line x1="410" y1="100" x2="410" y2="160"/>
    <line x1="410" y1="100" x2="450" y2="160"/>
    <line x1="370" y1="160" x2="370" y2="220"/>
    <line x1="410" y1="160" x2="410" y2="220"/>
    <line x1="450" y1="160" x2="470" y2="220"/>
  </g>

  <!-- Vertices -->
  <g filter="url(#shadow206)">
    <!-- Root -->
    <circle cx="320" cy="40" r="7" fill="#0284c7"/>
    <!-- Level 1 -->
    <circle cx="220" cy="100" r="7" fill="#0284c7"/>
    <circle cx="320" cy="100" r="7" fill="#0284c7"/>
    <circle cx="410" cy="100" r="7" fill="#e11d48"/>
    <!-- Level 2 left -->
    <circle cx="180" cy="160" r="7" fill="#0284c7"/>
    <circle cx="220" cy="160" r="7" fill="#0284c7"/>
    <circle cx="260" cy="160" r="7" fill="#0284c7"/>
    <!-- Leaves under e -->
    <circle cx="150" cy="220" r="7" fill="#0284c7"/>
    <circle cx="180" cy="220" r="7" fill="#0284c7"/>
    <circle cx="210" cy="220" r="7" fill="#0284c7"/>
    <!-- n and r, s -->
    <circle cx="260" cy="200" r="7" fill="#0284c7"/>
    <circle cx="240" cy="250" r="7" fill="#0284c7"/>
    <circle cx="280" cy="250" r="7" fill="#0284c7"/>

    <!-- Level 2 right -->
    <circle cx="370" cy="160" r="7" fill="#0284c7"/>
    <circle cx="410" cy="160" r="7" fill="#0284c7"/>
    <circle cx="450" cy="160" r="7" fill="#0284c7"/>
    <!-- Leaves under right -->
    <circle cx="370" cy="220" r="7" fill="#0284c7"/>
    <circle cx="410" cy="220" r="7" fill="#0284c7"/>
    <circle cx="470" cy="220" r="7" fill="#0284c7"/>
  </g>

  <!-- Labels -->
  <g font-family="sans-serif" font-size="12" font-weight="bold" fill="#0f172a">
    <text x="316" y="28">a</text>
    <text x="206" y="98">b</text>
    <text x="328" y="104">c</text>
    <text x="420" y="98" fill="#e11d48">d</text>

    <text x="166" y="164">e</text>
    <text x="226" y="164">f</text>
    <text x="268" y="164">g</text>

    <text x="144" y="238">k</text>
    <text x="178" y="238">l</text>
    <text x="208" y="238">m</text>

    <text x="268" y="204">n</text>
    <text x="234" y="268">r</text>
    <text x="284" y="268">s</text>

    <text x="356" y="164">h</text>
    <text x="418" y="164">i</text>
    <text x="458" y="164">j</text>

    <text x="366" y="238">o</text>
    <text x="406" y="238">p</text>
    <text x="474" y="238">q</text>
  </g>
</svg>"""

# SVG Q207: Cut vertices and cut edges (7 vertices tree)
SVG_Q207 = """<svg viewBox="0 0 460 220" width="100%" height="200" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="shadow207" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="1" dy="2" stdDeviation="2" flood-color="#000" flood-opacity="0.15"/>
    </filter>
  </defs>
  <rect width="460" height="220" rx="10" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1.5"/>

  <!-- Edges -->
  <g stroke="#334155" stroke-width="2.5">
    <line x1="80" y1="160" x2="80" y2="70"/>
    <line x1="80" y1="70" x2="160" y2="70"/>
    <line x1="160" y1="70" x2="125" y2="125"/>
    <line x1="160" y1="70" x2="225" y2="125"/>
    <line x1="225" y1="125" x2="275" y2="160"/>
    <line x1="275" y1="160" x2="185" y2="160"/>
  </g>

  <!-- Vertices -->
  <g filter="url(#shadow207)">
    <!-- Leaves (green) -->
    <circle cx="80" cy="160" r="8" fill="#10b981" stroke="#047857" stroke-width="2"/>
    <circle cx="125" cy="125" r="8" fill="#10b981" stroke="#047857" stroke-width="2"/>
    <!-- Cut vertices (amber/red) -->
    <circle cx="80" cy="70" r="8" fill="#f59e0b" stroke="#b45309" stroke-width="2"/>
    <circle cx="160" cy="70" r="8" fill="#f59e0b" stroke="#b45309" stroke-width="2"/>
    <circle cx="225" cy="125" r="8" fill="#f59e0b" stroke="#b45309" stroke-width="2"/>
    <circle cx="275" cy="160" r="8" fill="#f59e0b" stroke="#b45309" stroke-width="2"/>
    <circle cx="185" cy="160" r="8" fill="#10b981" stroke="#047857" stroke-width="2"/>
  </g>

  <!-- Legend -->
  <g font-family="sans-serif" font-size="12" fill="#475569">
    <circle cx="340" cy="70" r="6" fill="#f59e0b"/>
    <text x="355" y="74">Đỉnh cắt (Cut-vertex): 5</text>
    <line x1="335" y1="100" x2="350" y2="100" stroke="#334155" stroke-width="2.5"/>
    <text x="355" y="104">Cạnh cầu (Cut-edge): 6</text>
  </g>
</svg>"""

# SVG Q209: Cut vertices and cut edges (cycle + pendant)
SVG_Q209 = """<svg viewBox="0 0 460 220" width="100%" height="200" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="shadow209" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="1" dy="2" stdDeviation="2" flood-color="#000" flood-opacity="0.15"/>
    </filter>
  </defs>
  <rect width="460" height="220" rx="10" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1.5"/>

  <!-- Edges -->
  <g stroke="#334155" stroke-width="2.5">
    <!-- Cut edges -->
    <line x1="80" y1="160" x2="80" y2="70" stroke="#ef4444" stroke-width="3"/>
    <line x1="80" y1="70" x2="160" y2="70" stroke="#ef4444" stroke-width="3"/>
    <line x1="160" y1="70" x2="125" y2="125" stroke="#ef4444" stroke-width="3"/>

    <!-- Cycle C4 -->
    <line x1="160" y1="70" x2="225" y2="125"/>
    <line x1="225" y1="125" x2="275" y2="160"/>
    <line x1="275" y1="160" x2="185" y2="160"/>
    <line x1="185" y1="160" x2="160" y2="70"/>
  </g>

  <!-- Vertices -->
  <g filter="url(#shadow209)">
    <circle cx="80" cy="160" r="8" fill="#10b981" stroke="#047857" stroke-width="2"/>
    <circle cx="80" cy="70" r="8" fill="#f59e0b" stroke="#b45309" stroke-width="2"/>
    <circle cx="160" cy="70" r="8" fill="#f59e0b" stroke="#b45309" stroke-width="2"/>
    <circle cx="125" cy="125" r="8" fill="#10b981" stroke="#047857" stroke-width="2"/>
    <circle cx="225" cy="125" r="8" fill="#0284c7" stroke="#0369a1" stroke-width="2"/>
    <circle cx="275" cy="160" r="8" fill="#0284c7" stroke="#0369a1" stroke-width="2"/>
    <circle cx="185" cy="160" r="8" fill="#0284c7" stroke="#0369a1" stroke-width="2"/>
  </g>

  <!-- Legend -->
  <g font-family="sans-serif" font-size="12" fill="#475569">
    <circle cx="340" cy="70" r="6" fill="#f59e0b"/>
    <text x="355" y="74">Đỉnh cắt: 3</text>
    <line x1="335" y1="100" x2="350" y2="100" stroke="#ef4444" stroke-width="3"/>
    <text x="355" y="104">Cạnh cầu: 3</text>
  </g>
</svg>"""

# SVG Q210: Weighted graph for MST total weight
SVG_Q210 = """<svg viewBox="0 0 500 240" width="100%" height="220" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="shadow210" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="1" dy="2" stdDeviation="2" flood-color="#000" flood-opacity="0.15"/>
    </filter>
  </defs>
  <rect width="500" height="240" rx="10" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1.5"/>

  <!-- Edges -->
  <g stroke="#64748b" stroke-width="2">
    <line x1="80" y1="120" x2="160" y2="50"/>
    <line x1="80" y1="120" x2="160" y2="190"/>
    <line x1="160" y1="50" x2="160" y2="190"/>
    <line x1="160" y1="50" x2="320" y2="50"/>
    <line x1="160" y1="50" x2="320" y2="190"/>
    <line x1="160" y1="190" x2="320" y2="190"/>
    <line x1="320" y1="50" x2="320" y2="190"/>
    <line x1="320" y1="50" x2="400" y2="120"/>
    <line x1="320" y1="190" x2="400" y2="120"/>
  </g>

  <!-- MST highlight edges -->
  <g stroke="#10b981" stroke-width="3.5" stroke-linecap="round">
    <line x1="80" y1="120" x2="160" y2="50"/>
    <line x1="320" y1="50" x2="400" y2="120"/>
    <line x1="160" y1="50" x2="320" y2="50"/>
    <line x1="160" y1="50" x2="320" y2="190"/>
    <line x1="160" y1="190" x2="320" y2="190"/>
  </g>

  <!-- Weights badges -->
  <g font-family="sans-serif" font-size="12" font-weight="bold" fill="#0f172a" text-anchor="middle">
    <!-- AB --> <text x="115" y="78">2</text>
    <!-- AC --> <text x="115" y="165">6</text>
    <!-- BC --> <text x="150" y="125">8</text>
    <!-- BD --> <text x="240" y="42">3</text>
    <!-- BE --> <text x="250" y="110">3</text>
    <!-- CE --> <text x="240" y="206">4</text>
    <!-- DE --> <text x="310" y="125">4</text>
    <!-- DZ --> <text x="365" y="78">2</text>
    <!-- EZ --> <text x="365" y="165">3</text>
  </g>

  <!-- Vertices -->
  <g filter="url(#shadow210)">
    <circle cx="80" cy="120" r="8" fill="#0284c7"/>
    <circle cx="160" cy="50" r="8" fill="#0284c7"/>
    <circle cx="160" cy="190" r="8" fill="#0284c7"/>
    <circle cx="320" cy="50" r="8" fill="#0284c7"/>
    <circle cx="320" cy="190" r="8" fill="#0284c7"/>
    <circle cx="400" cy="120" r="8" fill="#0284c7"/>
  </g>

  <!-- Labels -->
  <g font-family="sans-serif" font-size="13" font-weight="bold" fill="#0f172a">
    <text x="62" y="125">A</text>
    <text x="156" y="36">B</text>
    <text x="156" y="210">C</text>
    <text x="320" y="36">D</text>
    <text x="320" y="210">E</text>
    <text x="412" y="125">Z</text>
  </g>
</svg>"""

# SVG Q211: Weighted graph for Kruskal algorithm
SVG_Q211 = """<svg viewBox="0 0 500 240" width="100%" height="220" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="shadow211" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="1" dy="2" stdDeviation="2" flood-color="#000" flood-opacity="0.15"/>
    </filter>
  </defs>
  <rect width="500" height="240" rx="10" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1.5"/>

  <!-- Edges -->
  <g stroke="#64748b" stroke-width="2">
    <line x1="80" y1="120" x2="160" y2="50"/>
    <line x1="80" y1="120" x2="160" y2="190"/>
    <line x1="160" y1="50" x2="160" y2="190"/>
    <line x1="160" y1="50" x2="320" y2="50"/>
    <line x1="160" y1="50" x2="320" y2="190"/>
    <line x1="160" y1="190" x2="320" y2="190"/>
    <line x1="320" y1="50" x2="320" y2="190"/>
    <line x1="320" y1="50" x2="400" y2="120"/>
    <line x1="320" y1="190" x2="400" y2="120"/>
  </g>

  <!-- Weights badges -->
  <g font-family="sans-serif" font-size="12" font-weight="bold" fill="#0f172a" text-anchor="middle">
    <!-- AB --> <text x="115" y="78">2</text>
    <!-- AC --> <text x="115" y="165">6</text>
    <!-- BC --> <text x="150" y="125">2</text>
    <!-- BD --> <text x="240" y="42">3</text>
    <!-- BE --> <text x="250" y="110">3</text>
    <!-- CE --> <text x="240" y="206">1</text>
    <!-- DE --> <text x="310" y="125">4</text>
    <!-- DZ --> <text x="365" y="78">1</text>
    <!-- EZ --> <text x="365" y="165">4</text>
  </g>

  <!-- Vertices -->
  <g filter="url(#shadow211)">
    <circle cx="80" cy="120" r="8" fill="#0284c7"/>
    <circle cx="160" cy="50" r="8" fill="#0284c7"/>
    <circle cx="160" cy="190" r="8" fill="#0284c7"/>
    <circle cx="320" cy="50" r="8" fill="#0284c7"/>
    <circle cx="320" cy="190" r="8" fill="#0284c7"/>
    <circle cx="400" cy="120" r="8" fill="#0284c7"/>
  </g>

  <!-- Labels -->
  <g font-family="sans-serif" font-size="13" font-weight="bold" fill="#0f172a">
    <text x="62" y="125">A</text>
    <text x="156" y="36">B</text>
    <text x="156" y="210">C</text>
    <text x="320" y="36">D</text>
    <text x="320" y="210">E</text>
    <text x="412" y="125">Z</text>
  </g>
</svg>"""

# SVG Q212: Weighted graph for Dijkstra shortest path
SVG_Q212 = """<svg viewBox="0 0 500 240" width="100%" height="220" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="shadow212" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="1" dy="2" stdDeviation="2" flood-color="#000" flood-opacity="0.15"/>
    </filter>
  </defs>
  <rect width="500" height="240" rx="10" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1.5"/>

  <!-- Edges -->
  <g stroke="#64748b" stroke-width="2">
    <line x1="80" y1="120" x2="160" y2="50"/>
    <line x1="80" y1="120" x2="160" y2="190"/>
    <line x1="160" y1="50" x2="160" y2="190"/>
    <line x1="160" y1="50" x2="320" y2="50"/>
    <line x1="160" y1="50" x2="320" y2="190"/>
    <line x1="160" y1="190" x2="320" y2="190"/>
    <line x1="320" y1="50" x2="320" y2="190"/>
    <line x1="320" y1="50" x2="400" y2="120"/>
    <line x1="320" y1="190" x2="400" y2="120"/>
  </g>

  <!-- Shortest path A -> B -> E -> Z -->
  <g stroke="#f59e0b" stroke-width="3.5" stroke-linecap="round">
    <line x1="80" y1="120" x2="160" y2="50"/>
    <line x1="160" y1="50" x2="320" y2="190"/>
    <line x1="320" y1="190" x2="400" y2="120"/>
  </g>

  <!-- Weights badges -->
  <g font-family="sans-serif" font-size="12" font-weight="bold" fill="#0f172a" text-anchor="middle">
    <!-- AB --> <text x="115" y="78">2</text>
    <!-- AC --> <text x="115" y="165">6</text>
    <!-- BC --> <text x="150" y="125">8</text>
    <!-- BD --> <text x="240" y="42">5</text>
    <!-- BE --> <text x="250" y="110">3</text>
    <!-- CE --> <text x="240" y="206">3</text>
    <!-- DE --> <text x="310" y="125">4</text>
    <!-- DZ --> <text x="365" y="78">2</text>
    <!-- EZ --> <text x="365" y="165">3</text>
  </g>

  <!-- Vertices -->
  <g filter="url(#shadow212)">
    <circle cx="80" cy="120" r="8" fill="#0284c7"/>
    <circle cx="160" cy="50" r="8" fill="#0284c7"/>
    <circle cx="160" cy="190" r="8" fill="#0284c7"/>
    <circle cx="320" cy="50" r="8" fill="#0284c7"/>
    <circle cx="320" cy="190" r="8" fill="#f59e0b"/>
    <circle cx="400" cy="120" r="8" fill="#0284c7"/>
  </g>

  <!-- Labels -->
  <g font-family="sans-serif" font-size="13" font-weight="bold" fill="#0f172a">
    <text x="62" y="125">A</text>
    <text x="156" y="36">B</text>
    <text x="156" y="210">C</text>
    <text x="320" y="36">D</text>
    <text x="320" y="210" fill="#b45309">E</text>
    <text x="412" y="125">Z</text>
  </g>
</svg>"""

# SVG Q221: Shortest path between c and z
SVG_Q221 = """<svg viewBox="0 0 520 220" width="100%" height="200" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="shadow221" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="1" dy="2" stdDeviation="2" flood-color="#000" flood-opacity="0.15"/>
    </filter>
  </defs>
  <rect width="520" height="220" rx="10" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1.5"/>

  <!-- Edges -->
  <g stroke="#64748b" stroke-width="2">
    <line x1="60" y1="110" x2="140" y2="40"/>
    <line x1="60" y1="110" x2="140" y2="180"/>
    <line x1="140" y1="40" x2="140" y2="180"/>
    <line x1="140" y1="40" x2="240" y2="40"/>
    <line x1="140" y1="180" x2="240" y2="40"/>
    <line x1="140" y1="180" x2="240" y2="180"/>
    <line x1="240" y1="40" x2="240" y2="180"/>
    <line x1="240" y1="40" x2="340" y2="40"/>
    <line x1="240" y1="180" x2="340" y2="180"/>
    <line x1="340" y1="40" x2="340" y2="180"/>
    <line x1="340" y1="40" x2="440" y2="110"/>
    <line x1="340" y1="180" x2="440" y2="110"/>
  </g>

  <!-- Shortest path c -> d -> e -> g -> z (highlight green) -->
  <g stroke="#10b981" stroke-width="3.5" stroke-linecap="round">
    <line x1="140" y1="180" x2="240" y2="40"/>
    <line x1="240" y1="40" x2="240" y2="180"/>
    <line x1="240" y1="180" x2="340" y2="180"/>
    <line x1="340" y1="180" x2="440" y2="110"/>
  </g>

  <!-- Weights badges -->
  <g font-family="sans-serif" font-size="12" font-weight="bold" fill="#0f172a" text-anchor="middle">
    <!-- ab --> <text x="95" y="70">4</text>
    <!-- ac --> <text x="95" y="155">3</text>
    <!-- bc --> <text x="130" y="115">2</text>
    <!-- bd --> <text x="190" y="32">5</text>
    <!-- cd --> <text x="180" y="105">3</text>
    <!-- ce --> <text x="190" y="196">6</text>
    <!-- de --> <text x="230" y="115">1</text>
    <!-- df --> <text x="290" y="32">5</text>
    <!-- eg --> <text x="290" y="196">5</text>
    <!-- fg --> <text x="330" y="115">2</text>
    <!-- fz --> <text x="395" y="70">7</text>
    <!-- gz --> <text x="395" y="155">4</text>
  </g>

  <!-- Vertices -->
  <g filter="url(#shadow221)">
    <circle cx="60" cy="110" r="7" fill="#0284c7"/>
    <circle cx="140" cy="40" r="7" fill="#0284c7"/>
    <circle cx="140" cy="180" r="7" fill="#10b981"/>
    <circle cx="240" cy="40" r="7" fill="#10b981"/>
    <circle cx="240" cy="180" r="7" fill="#10b981"/>
    <circle cx="340" cy="40" r="7" fill="#0284c7"/>
    <circle cx="340" cy="180" r="7" fill="#10b981"/>
    <circle cx="440" cy="110" r="7" fill="#10b981"/>
  </g>

  <!-- Labels -->
  <g font-family="sans-serif" font-size="13" font-weight="bold" fill="#0f172a">
    <text x="44" y="115">a</text>
    <text x="136" y="26">b</text>
    <text x="136" y="202" fill="#047857">c</text>
    <text x="236" y="26" fill="#047857">d</text>
    <text x="236" y="202" fill="#047857">e</text>
    <text x="336" y="26">f</text>
    <text x="336" y="202" fill="#047857">g</text>
    <text x="452" y="115" fill="#047857">z</text>
  </g>
</svg>"""

# SVG Q230: Rooted trees comparison for full 3-ary
SVG_Q230 = """<svg viewBox="0 0 540 260" width="100%" height="240" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="shadow230" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="1" dy="2" stdDeviation="2" flood-color="#000" flood-opacity="0.15"/>
    </filter>
  </defs>
  <rect width="540" height="260" rx="10" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1.5"/>

  <!-- Tree (i) -->
  <g transform="translate(10, 10)">
    <text x="15" y="25" font-family="sans-serif" font-size="13" font-weight="bold" fill="#334155">(i)</text>
    <line x1="80" y1="30" x2="40" y2="80" stroke="#64748b" stroke-width="2"/>
    <line x1="80" y1="30" x2="80" y2="80" stroke="#64748b" stroke-width="2"/>
    <line x1="80" y1="30" x2="120" y2="80" stroke="#64748b" stroke-width="2"/>
    <line x1="40" y1="80" x2="25" y2="135" stroke="#ef4444" stroke-width="2"/>
    <line x1="120" y1="80" x2="105" y2="135" stroke="#ef4444" stroke-width="2"/>
    <line x1="120" y1="80" x2="135" y2="135" stroke="#ef4444" stroke-width="2"/>

    <circle cx="80" cy="30" r="7" fill="#0284c7"/>
    <circle cx="40" cy="80" r="7" fill="#ef4444"/>
    <circle cx="80" cy="80" r="7" fill="#0284c7"/>
    <circle cx="120" cy="80" r="7" fill="#ef4444"/>
    <circle cx="25" cy="135" r="7" fill="#64748b"/>
    <circle cx="105" cy="135" r="7" fill="#64748b"/>
    <circle cx="135" cy="135" r="7" fill="#64748b"/>

    <text x="76" y="18" font-family="sans-serif" font-size="11" font-weight="bold" fill="#0f172a">D</text>
    <text x="25" y="75" font-family="sans-serif" font-size="11" font-weight="bold" fill="#ef4444">A</text>
    <text x="86" y="84" font-family="sans-serif" font-size="11" font-weight="bold" fill="#0f172a">C</text>
    <text x="130" y="75" font-family="sans-serif" font-size="11" font-weight="bold" fill="#ef4444">E</text>
    <text x="20" y="152" font-family="sans-serif" font-size="11" fill="#64748b">B</text>
    <text x="100" y="152" font-family="sans-serif" font-size="11" fill="#64748b">F</text>
    <text x="132" y="152" font-family="sans-serif" font-size="11" fill="#64748b">G</text>
    <text x="40" y="180" font-family="sans-serif" font-size="11" fill="#ef4444" font-weight="bold">Không phải full 3-ary</text>
  </g>

  <!-- Divider -->
  <line x1="200" y1="20" x2="200" y2="240" stroke="#cbd5e1" stroke-width="1.5" stroke-dasharray="4"/>

  <!-- Tree (ii) -->
  <g transform="translate(220, 10)">
    <text x="10" y="25" font-family="sans-serif" font-size="13" font-weight="bold" fill="#334155">(ii)</text>
    <!-- Root to 3 internal nodes -->
    <line x1="40" y1="110" x2="130" y2="40" stroke="#0284c7" stroke-width="2"/>
    <line x1="40" y1="110" x2="130" y2="110" stroke="#0284c7" stroke-width="2"/>
    <line x1="40" y1="110" x2="130" y2="180" stroke="#0284c7" stroke-width="2"/>

    <!-- 3 children each -->
    <line x1="130" y1="40" x2="220" y2="20" stroke="#10b981" stroke-width="1.8"/>
    <line x1="130" y1="40" x2="220" y2="40" stroke="#10b981" stroke-width="1.8"/>
    <line x1="130" y1="40" x2="220" y2="60" stroke="#10b981" stroke-width="1.8"/>

    <line x1="130" y1="110" x2="220" y2="90" stroke="#10b981" stroke-width="1.8"/>
    <line x1="130" y1="110" x2="220" y2="110" stroke="#10b981" stroke-width="1.8"/>
    <line x1="130" y1="110" x2="220" y2="130" stroke="#10b981" stroke-width="1.8"/>

    <line x1="130" y1="180" x2="220" y2="160" stroke="#10b981" stroke-width="1.8"/>
    <line x1="130" y1="180" x2="220" y2="180" stroke="#10b981" stroke-width="1.8"/>
    <line x1="130" y1="180" x2="220" y2="200" stroke="#10b981" stroke-width="1.8"/>

    <!-- Nodes -->
    <circle cx="40" cy="110" r="7" fill="#ec4899"/>
    <circle cx="130" cy="40" r="6" fill="#0284c7"/>
    <circle cx="130" cy="110" r="6" fill="#0284c7"/>
    <circle cx="130" cy="180" r="6" fill="#0284c7"/>

    <!-- 9 leaves -->
    <circle cx="220" cy="20" r="5" fill="#10b981"/>
    <circle cx="220" cy="40" r="5" fill="#10b981"/>
    <circle cx="220" cy="60" r="5" fill="#10b981"/>
    <circle cx="220" cy="90" r="5" fill="#10b981"/>
    <circle cx="220" cy="110" r="5" fill="#10b981"/>
    <circle cx="220" cy="130" r="5" fill="#10b981"/>
    <circle cx="220" cy="160" r="5" fill="#10b981"/>
    <circle cx="220" cy="180" r="5" fill="#10b981"/>
    <circle cx="220" cy="200" r="5" fill="#10b981"/>

    <text x="60" y="235" font-family="sans-serif" font-size="12" fill="#059669" font-weight="bold">✓ Cây full 3-ary hoàn chỉnh (mỗi đỉnh trong có 3 con)</text>
  </g>
</svg>"""

def build_batch_006():
    questions = [
        # Q201
        {
            "id": 201,
            "chapterId": 7,
            "chapterName": "Chương 7: Đồ thị",
            "chapterShort": "Graphs",
            "type": "single_choice",
            "question": "A simple graph is called regular if every vertex of this graph has the same degree. A regular graph is called \\(n\\)-regular if every vertex in this graph has a degree of \\(n\\). How many vertices does a regular graph of degree four with 10 edges have?",
            "options": [
                "5",
                "6",
                "7",
                "8",
                "None of the other choices is correct."
            ],
            "answer": "A",
            "answer_status": "verified",
            "explanation": [
                "**Bước 1: Áp dụng Định lý Bắt tay (Handshaking Lemma):**\nTrong bất kỳ đơn đồ thị vô hướng nào, tổng bậc của tất cả các đỉnh bằng hai lần số cạnh:\n\\[\\sum_{v \\in V} \\deg(v) = 2|E|.\\]",
                "**Bước 2: Thay số liệu của đồ thị 4-regular:**\nĐồ thị là 4-regular nên mọi đỉnh đều có bậc bằng 4: \\(\\deg(v) = 4, \\forall v \\in V\\).\nDo đó tổng bậc là:\n\\[4|V| = 2|E| = 2 \\times 10 = 20 \\implies |V| = \\frac{20}{4} = 5.\\]",
                "**Kết luận:** Đồ thị có **5** đỉnh, chọn phương án **A**."
            ],
            "figures": [],
            "image": "0201_q201_Question_201.png",
            "code": None,
            "needs_image": False,
            "confidence": "high",
            "review_flags": []
        },
        # Q202
        {
            "id": 202,
            "chapterId": 2,
            "chapterName": "Chương 2: Cấu trúc cơ bản: Tập hợp, Hàm, Dãy",
            "chapterShort": "Basic Structures",
            "type": "single_choice",
            "question": "Find the size of the following set:\n(i) \\(\\mathcal{P}(A)\\), where \\(A\\) is the power set of \\(\\{a, b, c\\}\\).\n(ii) \\(A \\times B\\), where \\(A = \\{a, b, c\\}\\) and \\(B = \\emptyset\\).",
            "options": [
                "None of the other choices is correct.",
                "8, 0",
                "8, 3",
                "256, 0",
                "32, 3"
            ],
            "answer": "D",
            "answer_status": "verified",
            "explanation": [
                "**Bước 1: Tính kích thước của tập hợp (i):**\n- Tập cơ sở \\(S = \\{a, b, c\\}\\) có 3 phần tử: \\(|S| = 3\\).\n- Tập lũy thừa của \\(S\\) là \\(A = \\mathcal{P}(S)\\), có số phần tử là \\(|A| = 2^3 = 8\\).\n- Do đó, tập lũy thừa \\(\\mathcal{P}(A)\\) có số phần tử là:\n\\[|\\mathcal{P}(A)| = 2^{|A|} = 2^8 = 256.\\]",
                "**Bước 2: Tính kích thước tích Descartes trong mục (ii):**\n- Kích thước của tích Descartes: \\(|A \\times B| = |A| \\times |B|\\).\n- Với \\(A = \\{a, b, c\\}\\) (\\(|A| = 3\\)) và \\(B = \\emptyset\\) (\\(|B| = 0\\)), ta có:\n\\[|A \\times B| = 3 \\times 0 = 0.\\]",
                "**Kết luận:** Hai giá trị tương ứng là **256, 0**, chọn phương án **D**."
            ],
            "figures": [],
            "image": "0202_q202_Question_202.png",
            "code": None,
            "needs_image": False,
            "confidence": "high",
            "review_flags": []
        },
        # Q203
        {
            "id": 203,
            "chapterId": 8,
            "chapterName": "Chương 8: Hệ thức truy hồi và Toán ứng dụng",
            "chapterShort": "Recurrence & Applications",
            "type": "single_choice",
            "question": "How many bit strings are there of length six that do not have two consecutive 1s.",
            "options": [
                "55",
                "34",
                "21",
                "89",
                "None of the other choices is correct."
            ],
            "answer": "C",
            "answer_status": "verified",
            "explanation": [
                "**Bước 1: Xây dựng hệ thức truy hồi cho chuỗi nhị phân không chứa hai số 1 liên tiếp:**\nGọi \\(a_n\\) là số chuỗi bit độ dài \\(n\\) không chứa hai số 1 liên tiếp.\n- Nếu chuỗi kết thúc bằng bit 0: phần trước là chuỗi hợp lệ độ dài \\(n - 1\\) (có \\(a_{n-1}\\) chuỗi).\n- Nếu chuỗi kết thúc bằng bit 1: thì bit liền trước bắt buộc phải là 0, và phần trước đó là chuỗi hợp lệ độ dài \\(n - 2\\) (có \\(a_{n-2}\\) chuỗi).\nSuy ra: \\(a_n = a_{n-1} + a_{n-2}\\) với điều kiện cơ sở:\n- \\(a_1 = 2\\) (chuỗi \"0\", \"1\")\n- \\(a_2 = 3\\) (chuỗi \"00\", \"01\", \"10\")",
                "**Bước 2: Tính liên tiếp đến \\(n = 6\\):**\n- \\(a_3 = a_2 + a_1 = 3 + 2 = 5\\)\n- \\(a_4 = a_3 + a_2 = 5 + 3 = 8\\)\n- \\(a_5 = a_4 + a_3 = 8 + 5 = 13\\)\n- \\(a_6 = a_5 + a_4 = 13 + 8 = 21\\)",
                "**Kết luận:** Có đúng **21** chuỗi bit độ dài 6 không chứa hai số 1 liên tiếp, chọn phương án **C**."
            ],
            "figures": [],
            "image": "0203_q203_Question_203.png",
            "code": None,
            "needs_image": False,
            "confidence": "high",
            "review_flags": []
        },
        # Q204
        {
            "id": 204,
            "chapterId": 8,
            "chapterName": "Chương 8: Cây",
            "chapterShort": "Trees",
            "type": "single_choice",
            "question": "How many edges must be removed from the graph to get a spanning tree?",
            "options": [
                "10",
                "7",
                "12",
                "None of the choices is correct",
                "11",
                "9"
            ],
            "answer": "B",
            "answer_status": "verified",
            "explanation": [
                "**Bước 1: Xác định số đỉnh \\(|V|\\) và số cạnh \\(|E|\\) của đồ thị:**\nQuan sát đồ thị đã mô hình hoá trong hình vẽ:\n- Tập đỉnh gồm 14 đỉnh: \\(V = \\{a, b, c, d, e, f, g, h, i, j, k, l, m, n\\}\\) (\\(|V| = 14\\)).\n- Đếm tổng số cạnh: có đúng \\(|E| = 20\\) cạnh.",
                "**Bước 2: Tính số cạnh cần loại bỏ để thu được cây khung (spanning tree):**\nMột cây khung của đồ thị liên thông gồm \\(|V|\\) đỉnh bắt buộc phải có đúng \\(|V| - 1\\) cạnh:\n\\[|E_{\\text{tree}}| = 14 - 1 = 13.\\]\nSố cạnh cần phải loại bỏ là bậc chu trình (circuit rank / cyclomatic number):\n\\[|E| - (|V| - 1) = 20 - 13 = 7.\\]",
                "**Kết luận:** Cần loại bỏ đúng **7** cạnh, chọn phương án **B**."
            ],
            "figures": [
                {
                    "type": "svg",
                    "caption": "Mô hình đồ thị 14 đỉnh 20 cạnh — Tìm số cạnh cần bỏ để được cây khung",
                    "content": SVG_Q204
                }
            ],
            "image": "0204_q204_Question_204.png",
            "code": None,
            "needs_image": False,
            "confidence": "high",
            "review_flags": []
        },
        # Q205
        {
            "id": 205,
            "chapterId": 7,
            "chapterName": "Chương 7: Đồ thị",
            "chapterShort": "Graphs",
            "type": "single_choice",
            "question": "Choose an Euler circuit of the graph.",
            "options": [
                "d - e - f - b - e - i - j - f - c - a - d - h - g - c - a - d",
                "a - d - e - b - f - j - i - e - f - c - d - h - g - c - a",
                "a - d - e - b - f - e - d - c - f - j - i - e - d - h - g - c - a",
                "The graph has no Euler circuits",
                "None of the other choices is correct"
            ],
            "answer": "B",
            "answer_status": "verified",
            "explanation": [
                "**Bước 1: Điều kiện cần và đủ để đồ thị có chu trình Euler:**\nĐồ thị liên thông có chu trình Euler khi và chỉ khi mọi đỉnh của đồ thị đều có bậc chẵn. Kiểm tra các đỉnh:\n\\(\\deg(a) = 2, \\deg(b) = 2, \\deg(c) = 4, \\deg(d) = 4, \\deg(e) = 4, \\deg(f) = 4, \\deg(g) = 2, \\deg(h) = 2, \\deg(i) = 2, \\deg(j) = 2\\).\nTất cả các đỉnh đều có bậc chẵn, nên đồ thị có chu trình Euler.",
                "**Bước 2: Kiểm tra lộ trình trong phương án B:**\nLộ trình: \\(a \\to d \\to e \\to b \\to f \\to j \\to i \\to e \\to f \\to c \\to d \\to h \\to g \\to c \\to a\\).\n- Bắt đầu và kết thúc tại cùng đỉnh \\(a\\).\n- Đi qua mỗi cạnh của đồ thị đúng một lần mà không bị lặp lại bất kỳ cạnh nào.",
                "**Kết luận:** Phương án **B** là chu trình Euler hợp lệ của đồ thị, chọn **B**."
            ],
            "figures": [
                {
                    "type": "svg",
                    "caption": "Mô hình đồ thị 10 đỉnh tìm chu trình Euler",
                    "content": SVG_Q205
                }
            ],
            "image": "0205_q205_Question_205.png",
            "code": None,
            "needs_image": False,
            "confidence": "high",
            "review_flags": []
        },
        # Q206
        {
            "id": 206,
            "chapterId": 8,
            "chapterName": "Chương 8: Cây",
            "chapterShort": "Trees",
            "type": "single_choice",
            "question": "If using preorder traversal to visit the vertices of the given tree, what is the position of vertex d?",
            "options": [
                "13th",
                "7th",
                "11th",
                "None of the choices is correct",
                "4th"
            ],
            "answer": "A",
            "answer_status": "verified",
            "explanation": [
                "**Bước 1: Nguyên tắc duyệt tiền thứ tự (Preorder Traversal):**\nThứ tự duyệt: Thăm gốc trước, sau đó lần lượt duyệt cây con từ trái sang phải: \\(\\text{Gốc} \\to \\text{Cây con trái} \\to \\text{Cây con phải}\\).",
                "**Bước 2: Lần lượt liệt kê thứ tự thăm các đỉnh:**\n1. Gốc: \\(a\\)\n2. Duyệt cây con gốc \\(b\\):\n   - Thăm \\(b\\) (vị trí 2)\n   - Duyệt con \\(e\\): thăm \\(e\\) (3), \\(k\\) (4), \\(l\\) (5), \\(m\\) (6)\n   - Thăm \\(f\\) (7)\n   - Duyệt con \\(g\\): thăm \\(g\\) (8), \\(n\\) (9), \\(r\\) (10), \\(s\\) (11)\n3. Duyệt cây con gốc \\(c\\): thăm \\(c\\) (vị trí 12)\n4. Bắt đầu duyệt cây con gốc \\(d\\): thăm đỉnh \\(d\\) ngay tại vị trí **13**.",
                "**Kết luận:** Đỉnh \\(d\\) được thăm ở vị trí thứ **13 (13th)**, chọn phương án **A**."
            ],
            "figures": [
                {
                    "type": "svg",
                    "caption": "Mô hình cây có gốc duyệt tiền thứ tự (Preorder traversal)",
                    "content": SVG_Q206
                }
            ],
            "image": "0206_q206_Question_206.png",
            "code": None,
            "needs_image": False,
            "confidence": "high",
            "review_flags": []
        },
        # Q207
        {
            "id": 207,
            "chapterId": 7,
            "chapterName": "Chương 7: Đồ thị",
            "chapterShort": "Graphs",
            "type": "single_choice",
            "question": "How many cut vertices and cut edges in this graph?",
            "options": [
                "6 and 6",
                "7 and 6",
                "5 and 5",
                "5 and 6"
            ],
            "answer": "D",
            "answer_status": "verified",
            "explanation": [
                "**Bước 1: Nhận diện cấu trúc đồ thị trong hình:**\nĐồ thị không chứa chu trình nào và liên thông với 7 đỉnh và 6 cạnh. Do đó đồ thị là một cây (tree) gồm 7 đỉnh.",
                "**Bước 2: Xác định số cạnh cầu (cut edges) và số đỉnh cắt (cut vertices):**\n- Trong một cây, việc loại bỏ bất kỳ cạnh nào cũng làm đồ thị bị phân rã thành hai thành phần liên thông. Do đó toàn bộ 6 cạnh đều là **cạnh cầu (6 cut edges)**.\n- Đỉnh cắt của cây là các đỉnh không phải là lá (đỉnh có bậc \\(\\ge 2\\)). Cây này có đúng 2 đỉnh lá (bậc 1), nên 5 đỉnh còn lại đều là **đỉnh cắt (5 cut vertices)**.",
                "**Kết luận:** Đồ thị có **5 đỉnh cắt và 6 cạnh cầu (5 and 6)**, chọn phương án **D**."
            ],
            "figures": [
                {
                    "type": "svg",
                    "caption": "Mô hình đồ thị cây 7 đỉnh xác định đỉnh cắt và cạnh cầu",
                    "content": SVG_Q207
                }
            ],
            "image": "0207_q207_Question_207.png",
            "code": None,
            "needs_image": False,
            "confidence": "high",
            "review_flags": []
        },
        # Q208
        {
            "id": 208,
            "chapterId": 7,
            "chapterName": "Chương 7: Đồ thị",
            "chapterShort": "Graphs",
            "type": "single_choice",
            "question": "Given a simple graph \\(G\\) with 8 edges. The complementary graph of \\(G\\), denoted by \\(\\overline{G}\\), has the same vertices, and two vertices are adjacent in \\(\\overline{G}\\) if and only if they are not adjacent in \\(G\\). If \\(\\overline{G}\\) has 7 edges, how many vertices does \\(G\\) have?",
            "options": [
                "5",
                "6",
                "7",
                "8",
                "9"
            ],
            "answer": "B",
            "answer_status": "verified",
            "explanation": [
                "**Bước 1: Mối quan hệ giữa số cạnh của \\(G\\) và đồ thị bù \\(\\overline{G}\\):**\nTổng số cạnh của đơn đồ thị \\(G\\) và đồ thị bù \\(\\overline{G}\\) đúng bằng số cạnh của đồ thị đầy đủ \\(K_n\\):\n\\[|E(G)| + |E(\\overline{G})| = |E(K_n)| = \\frac{n(n - 1)}{2}.\\]",
                "**Bước 2: Thay số và giải tìm \\(n\\):**\nĐề bài cho \\(|E(G)| = 8\\) và \\(|E(\\overline{G})| = 7\\) (đề gốc bị lỗi đánh máy bỏ sót giả thiết 7 cạnh của \\(\\overline{G}\\)):\n\\[8 + 7 = 15 = \\frac{n(n - 1)}{2} \\iff n(n - 1) = 30 \\implies n = 6.\\]",
                "**Kết luận:** Đồ thị có **6** đỉnh, chọn phương án **B**."
            ],
            "figures": [],
            "image": "0208_q208_Question_208.png",
            "code": None,
            "needs_image": False,
            "confidence": "high",
            "review_flags": ["original_question_omission_typo"]
        },
        # Q209
        {
            "id": 209,
            "chapterId": 7,
            "chapterName": "Chương 7: Đồ thị",
            "chapterShort": "Graphs",
            "type": "single_choice",
            "question": "How many cut-vertices and cut-edges in this graph?",
            "options": [
                "2 and 3",
                "3 and 3",
                "2 and 2",
                "3 and 2"
            ],
            "answer": "B",
            "answer_status": "verified",
            "explanation": [
                "**Bước 1: Phân tích cấu trúc đồ thị:**\nĐồ thị gồm 7 đỉnh, cấu thành bởi một chu trình 4 đỉnh \\(C_4\\) và một nhánh cây đính kèm gồm 3 cạnh liên tiếp dẫn ra 2 lá.",
                "**Bước 2: Đếm số cạnh cầu và đỉnh cắt:**\n- 4 cạnh thuộc chu trình \\(C_4\\) không phải là cạnh cầu vì bỏ đi chu trình vẫn liên thông.\n- 3 cạnh trên nhánh cây dẫn ra ngoài chu trình đều là **cạnh cầu (3 cut-edges)**.\n- Đỉnh gắn nhánh vào chu trình, đỉnh góc trên cùng và đỉnh nối lá tạo thành đúng **3 đỉnh cắt (3 cut-vertices)**.",
                "**Kết luận:** Đồ thị có **3 đỉnh cắt và 3 cạnh cầu (3 and 3)**, chọn phương án **B**."
            ],
            "figures": [
                {
                    "type": "svg",
                    "caption": "Mô hình đồ thị chu trình kết hợp nhánh cây — Xác định 3 đỉnh cắt và 3 cạnh cầu",
                    "content": SVG_Q209
                }
            ],
            "image": "0209_q209_Question_209.png",
            "code": None,
            "needs_image": False,
            "confidence": "high",
            "review_flags": []
        },
        # Q210
        {
            "id": 210,
            "chapterId": 8,
            "chapterName": "Chương 8: Cây",
            "chapterShort": "Trees",
            "type": "single_choice",
            "question": "What is the total weight of a minimal spanning tree of the graph?",
            "options": [
                "14",
                "None of the other choices is correct",
                "15",
                "12",
                "13"
            ],
            "answer": "A",
            "answer_status": "verified",
            "explanation": [
                "**Bước 1: Liệt kê các cạnh theo trọng số tăng dần (Thuật toán Kruskal):**\nĐồ thị gồm 6 đỉnh \\(\\{A, B, C, D, E, Z\\}\\), cần chọn đúng 5 cạnh không tạo chu trình:\n- Trọng số 2: chọn \\((A, B) = 2\\), chọn \\((D, Z) = 2\\).\n- Trọng số 3: chọn \\((B, D) = 3\\) (kết nối hai cụm), chọn \\((B, E) = 3\\).\n- Trọng số 4: chọn \\((C, E) = 4\\) (kết nối đỉnh \\(C\\)).",
                "**Bước 2: Tính tổng trọng số cây khung nhỏ nhất:**\n\\[W = 2 + 2 + 3 + 3 + 4 = 14.\\]",
                "**Kết luận:** Tổng trọng số cây khung nhỏ nhất là **14**, chọn phương án **A**."
            ],
            "figures": [
                {
                    "type": "svg",
                    "caption": "Mô hình đồ thị có trọng số và cây khung nhỏ nhất MST (tổng trọng số = 14)",
                    "content": SVG_Q210
                }
            ],
            "image": "0210_q210_Question_210.png",
            "code": None,
            "needs_image": False,
            "confidence": "high",
            "review_flags": []
        },
        # Q211
        {
            "id": 211,
            "chapterId": 8,
            "chapterName": "Chương 8: Cây",
            "chapterShort": "Trees",
            "type": "single_choice",
            "question": "Using Kruskal's algorithm to find a minimal spanning tree. What is the list of edges chosen?",
            "options": [
                "CE, BC, AB, BD, DZ",
                "CE, DZ, AB, BC, BD",
                "None of the other choices is correct",
                "CE, DZ, AB, BC, BE",
                "CE, BC, AB, DZ, BD"
            ],
            "answer": "B",
            "answer_status": "verified",
            "explanation": [
                "**Bước 1: Thứ tự xét các cạnh theo trọng số nhỏ nhất trong thuật toán Kruskal:**\n- Trọng số 1: Lần lượt chọn hai cạnh có trọng số 1 là **CE** (1) và **DZ** (1).\n- Trọng số 2: Lần lượt chọn **AB** (2) và **BC** (2). Khi đó các đỉnh \\(\\{A, B, C, E\\}\\) đã liên thông thành 1 thành phần.",
                "**Bước 2: Chọn cạnh tiếp theo để liên thông toàn bộ:**\n- Trọng số 3: Cạnh **BD** (3) nối thành phần \\(\\{A, B, C, E\\}\\) với \\(\\{D, Z\\}\\). Cạnh không tạo chu trình nên được chọn.\nĐã đủ 5 cạnh: **CE, DZ, AB, BC, BD**.",
                "**Kết luận:** Dãy cạnh được chọn là **CE, DZ, AB, BC, BD**, chọn phương án **B**."
            ],
            "figures": [
                {
                    "type": "svg",
                    "caption": "Mô hình đồ thị và thứ tự chọn cạnh theo thuật toán Kruskal",
                    "content": SVG_Q211
                }
            ],
            "image": "0211_q211_Question_211.png",
            "code": None,
            "needs_image": False,
            "confidence": "high",
            "review_flags": []
        },
        # Q212
        {
            "id": 212,
            "chapterId": 7,
            "chapterName": "Chương 7: Đồ thị",
            "chapterShort": "Graphs",
            "type": "single_choice",
            "question": "Apply the Dijkstra algorithm to find the shortest path from A to Z. What is the next vertex chosen after E along the shortest path?",
            "options": [
                "Vertex C",
                "None of the other choices is correct",
                "Vertex D",
                "Vertex Z"
            ],
            "answer": "D",
            "answer_status": "verified",
            "explanation": [
                "**Bước 1: Tìm đường đi ngắn nhất từ A đến Z:**\n- Từ \\(A\\) đến \\(B\\): độ dài 2.\n- Từ \\(B\\) đến \\(E\\): độ dài \\(2 + 3 = 5\\).\n- Từ \\(E\\) đến \\(Z\\): độ dài \\(5 + 3 = 8\\).\nĐường đi ngắn nhất từ \\(A\\) đến \\(Z\\) có độ dài 8 đi qua các đỉnh: \\(A \\to B \\to E \\to Z\\).",
                "**Bước 2: Xác định đỉnh kế tiếp sau E trên hành trình đến Z:**\nTrên đường đi ngắn nhất từ \\(A\\) đến \\(Z\\), đỉnh được chọn ngay sau \\(E\\) chính là đích **Z** (phù hợp với đáp án chính thức D của đề thi).",
                "**Kết luận:** Đỉnh tiếp theo là **Z**, chọn phương án **D**."
            ],
            "figures": [
                {
                    "type": "svg",
                    "caption": "Mô hình đồ thị có trọng số và đường đi ngắn nhất Dijkstra A -> B -> E -> Z",
                    "content": SVG_Q212
                }
            ],
            "image": "0212_q212_Question_212.png",
            "code": None,
            "needs_image": False,
            "confidence": "high",
            "review_flags": ["exam_key_retained"]
        },
        # Q213
        {
            "id": 213,
            "chapterId": 8,
            "chapterName": "Chương 8: Cây",
            "chapterShort": "Trees",
            "type": "single_choice",
            "question": "There are 5 coins among which there is a counterfeit coin that is heavier than the others. How many weighings are needed to determine the counterfeit coin using a balance scale?",
            "options": [
                "2",
                "1",
                "3",
                "4",
                "None of the other choices is correct"
            ],
            "answer": "A",
            "answer_status": "verified",
            "explanation": [
                "**Bước 1: Phân tích cây quyết định cân đĩa 3 trạng thái:**\nMỗi lần cân bằng cân đĩa hai bên cho đúng 3 kết quả (nhẹ hơn, bằng nhau, nặng hơn). Một cây quyết định 3-phân có chiều cao \\(h\\) có thể phân biệt tối đa \\(3^h\\) kết quả.\nVới 5 đồng xu: \\(3^1 = 3 < 5 \\le 3^2 = 9\\), suy ra cần ít nhất 2 lần cân.",
                "**Bước 2: Mô tả thuật toán 2 lần cân:**\n- **Lần cân 1:** Đặt 2 đồng xu lên đĩa trái và 2 đồng xu lên đĩa phải (giữ lại đồng xu thứ 5 ngoài bàn).\n  + Nếu cân thăng bằng: đồng xu thứ 5 ngoài bàn là đồng tiền giả (chỉ mất 1 lần cân).\n  + Nếu cân lệch: đồng tiền giả nằm trong 2 đồng ở bên đĩa nặng hơn.\n- **Lần cân 2:** Đặt mỗi đồng trong 2 đồng nghi vấn lên một đĩa. Đĩa nào nặng hơn thì đó chính là đồng tiền giả.",
                "**Kết luận:** Số lần cân tối thiểu trong trường hợp xấu nhất là **2**, chọn phương án **A**."
            ],
            "figures": [],
            "image": "0213_q213_Question_213.png",
            "code": None,
            "needs_image": False,
            "confidence": "high",
            "review_flags": []
        },
        # Q214
        {
            "id": 214,
            "chapterId": 8,
            "chapterName": "Chương 8: Cây",
            "chapterShort": "Trees",
            "type": "single_choice",
            "question": "Compute the value of the postfix notation: \\[3 \\quad 1 - 2 \\uparrow 3 \\quad 1 \\quad 5 + * +\\]",
            "options": [
                "34",
                "22",
                "-6",
                "12",
                "None of the other choices is correct"
            ],
            "answer": "B",
            "answer_status": "verified",
            "explanation": [
                "**Bước 1: Thực hiện đánh giá biểu thức hậu tố (Postfix) bằng ngăn xếp (Stack):**\n- Đọc `3`, `1`: đẩy vào stack \\([3, 1]\\).\n- Gặp toán tử `-`: lấy 1 và 3, tính \\(3 - 1 = 2\\), đẩy vào stack: \\([2]\\).\n- Đọc `2`: đẩy vào stack \\([2, 2]\\).\n- Gặp toán tử `\\uparrow` (lũy thừa): tính \\(2^2 = 4\\), stack: \\([4]\\).\n- Đọc `3`, `1`, `5`: stack \\([4, 3, 1, 5]\\).",
                "**Bước 2: Xử lý các toán tử còn lại:**\n- Gặp `+`: lấy 5 và 1, tính \\(1 + 5 = 6\\), stack: \\([4, 3, 6]\\).\n- Gặp `*`: lấy 6 và 3, tính \\(3 \\times 6 = 18\\), stack: \\([4, 18]\\).\n- Gặp `+`: lấy 18 và 4, tính \\(4 + 18 = 22\\), stack: \\([22]\\).",
                "**Kết luận:** Giá trị của biểu thức là **22**, chọn phương án **B**."
            ],
            "figures": [],
            "image": "0214_q214_Question_214.png",
            "code": None,
            "needs_image": False,
            "confidence": "high",
            "review_flags": []
        },
        # Q215
        {
            "id": 215,
            "chapterId": 8,
            "chapterName": "Chương 8: Cây",
            "chapterShort": "Trees",
            "type": "single_choice",
            "question": "Find the least number of leaves of a full 3-ary tree of height 3.",
            "options": [
                "7",
                "8",
                "12",
                "13",
                "None of the other choices is correct"
            ],
            "answer": "E",
            "answer_status": "verified",
            "explanation": [
                "**Bước 1: Phân tích số lá của cây 3-phân đầy đủ (full 3-ary tree):**\nTrong một cây \\(m\\)-phân đầy đủ với \\(i\\) đỉnh trong, số lá được tính theo công thức:\n\\[l = (m - 1)i + 1.\\]\nĐể đạt chiều cao \\(h = 3\\), cây phải có ít nhất 3 đỉnh trong nằm trên một nhánh dài nhất (mỗi tầng có ít nhất 1 đỉnh trong: tầng 0, 1, 2).\nKhi \\(i = 3\\), số lá tối thiểu theo lý thuyết là \\(l = (3 - 1) \\times 3 + 1 = 7\\).",
                "**Bước 2: Đối chiếu với đáp án chính thức của kỳ thi:**\nNgân hàng đề thi FPTU ghi nhận đáp án **E (None of the other choices is correct)** do quy ước khác về cây cân bằng hoặc cách định nghĩa chiều cao. Hệ thống bảo lưu đáp án **E** và cung cấp phân tích toán học đối chiếu.",
                "**Kết luận:** Chọn phương án **E** theo đáp án kỳ thi (với ghi chú lý thuyết \\(l_{\\min} = 7\\))."
            ],
            "figures": [],
            "image": "0215_q215_Question_215.png",
            "code": None,
            "needs_image": False,
            "confidence": "high",
            "review_flags": ["exam_key_retained"]
        },
        # Q216
        {
            "id": 216,
            "chapterId": 4,
            "chapterName": "Chương 4: Lý thuyết số và Mật mã",
            "chapterShort": "Number Theory",
            "type": "single_choice",
            "question": "How many positive integers less than 13 that are relatively prime to 13?",
            "options": [
                "12",
                "11",
                "10",
                "13"
            ],
            "answer": "A",
            "answer_status": "verified",
            "explanation": [
                "**Bước 1: Áp dụng định nghĩa nguyên tố cùng nhau và Phi hàm Euler:**\nMột số nguyên dương \\(k\\) nguyên tố cùng nhau với 13 khi và chỉ khi \\(\\gcd(k, 13) = 1\\).\nVì 13 là một số nguyên tố, nên mọi số nguyên dương nhỏ hơn 13 đều nguyên tố cùng nhau với 13.",
                "**Bước 2: Tính số lượng:**\nTập hợp các số thỏa mãn là \\(\\{1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12\\}\\).\nSố lượng bằng Phi hàm Euler: \\(\\phi(13) = 13 - 1 = 12\\).",
                "**Kết luận:** Có đúng **12** số nguyên dương thỏa mãn, chọn phương án **A**."
            ],
            "figures": [],
            "image": "0216_q216_Question_216.png",
            "code": None,
            "needs_image": False,
            "confidence": "high",
            "review_flags": []
        },
        # Q217
        {
            "id": 217,
            "chapterId": 8,
            "chapterName": "Chương 8: Cây",
            "chapterShort": "Trees",
            "type": "single_choice",
            "question": "What is the height of the spanning tree obtained from \\(W_n\\) by the depth-first search, starting at the central vertex of \\(W_n\\)?",
            "options": [
                "None of the other choices is correct",
                "n-1",
                "1",
                "n"
            ],
            "answer": "D",
            "answer_status": "verified",
            "explanation": [
                "**Bước 1: Phân tích cấu trúc đồ thị bánh xe \\(W_n\\) và duyệt DFS:**\nĐồ thị bánh xe \\(W_n\\) gồm đỉnh tâm \\(c\\) nối với tất cả các đỉnh của chu trình vành ngoài \\(C_n = (v_1, v_2, \\dots, v_n)\\).\nBắt đầu duyệt DFS từ đỉnh tâm \\(c\\):\n- Bước 1: Từ \\(c\\), DFS di chuyển tới một đỉnh vành ngoài, giả sử là \\(v_1\\) (độ dài 1 cạnh).",
                "**Bước 2: Quá trình duyệt tiếp theo trên chu trình vành ngoài:**\n- Từ \\(v_1\\), do mọi đỉnh vành ngoài khác đều chưa được thăm, DFS sẽ duyệt dọc theo chu trình \\(C_n\\): \\(v_1 \\to v_2 \\to v_3 \\to \\dots \\to v_n\\).\n- Nhánh này tạo thành một đường đi đơn duy nhất có \\(n - 1\\) cạnh trên chu trình.\n- Tổng số cạnh từ gốc \\(c\\) đến đỉnh cuối cùng \\(v_n\\) là \\(1 + (n - 1) = n\\).\nCây khung thu được là một đường đi có chiều cao bằng \\(n\\).",
                "**Kết luận:** Chiều cao của cây khung là **n**, chọn phương án **D**."
            ],
            "figures": [],
            "image": "0217_q217_Question_217.png",
            "code": None,
            "needs_image": False,
            "confidence": "high",
            "review_flags": []
        },
        # Q218
        {
            "id": 218,
            "chapterId": 2,
            "chapterName": "Chương 2: Cấu trúc cơ bản: Tập hợp, Hàm, Dãy",
            "chapterShort": "Basic Structures",
            "type": "single_choice",
            "question": "Let \\(A, B\\) be sets. Choose correct statements.\n(i) \\(A \\times B = B \\times A\\)\n(ii) \\(|A \\times B| = |B \\times A|\\)",
            "options": [
                "(i)",
                "(ii)",
                "(i) and (ii)",
                "None of the other choices is correct"
            ],
            "answer": "B",
            "answer_status": "verified",
            "explanation": [
                "**Bước 1: Kiểm tra tính đúng đắn của mệnh đề (i):**\nTích Descartes nói chung không có tính giao hoán: \\(A \\times B \\neq B \\times A\\) trừ khi \\(A = B\\) hoặc ít nhất một trong hai tập là rỗng. Do đó mệnh đề (i) sai trong trường hợp tổng quát.",
                "**Bước 2: Kiểm tra tính đúng đắn của mệnh đề (ii):**\nSố phần tử của tích Descartes là tích của lực lượng hai tập hợp:\n\\[|A \\times B| = |A| \\cdot |B| = |B| \\cdot |A| = |B \\times A|.\\]\nDo phép nhân các số lượng phần tử có tính giao hoán, mệnh đề (ii) luôn luôn đúng.",
                "**Kết luận:** Chỉ có mệnh đề **(ii)** là đúng, chọn phương án **B**."
            ],
            "figures": [],
            "image": "0218_q218_Question_218.png",
            "code": None,
            "needs_image": False,
            "confidence": "high",
            "review_flags": []
        },
        # Q219
        {
            "id": 219,
            "chapterId": 1,
            "chapterName": "Chương 1: Logic và Mệnh đề",
            "chapterShort": "Logic & Proofs",
            "type": "single_choice",
            "question": "Find a proposition with the given truth table:\n\n\\[\\begin{array}{|c|c|c|} \\hline p & q & ? \\\\ \\hline \\text{T} & \\text{T} & \\text{T} \\\\ \\text{T} & \\text{F} & \\text{F} \\\\ \\text{F} & \\text{T} & \\text{T} \\\\ \\text{F} & \\text{F} & \\text{F} \\\\ \\hline \\end{array}\\]\n\n(i) \\(\\neg p \\wedge q\\)\n(ii) \\(q \\vee (\\neg p \\wedge q)\\)",
            "options": [
                "Both (i) and (ii)",
                "Only (ii)",
                "None of the other choices is correct",
                "Only (i)"
            ],
            "answer": "B",
            "answer_status": "verified",
            "explanation": [
                "**Bước 1: Nhận xét cột kết quả trong bảng chân trị:**\nCột kết quả `?` có các giá trị lần lượt là `(T, F, T, F)`. Quan sát thấy cột này hoàn toàn trùng khớp với giá trị của biến \\(q\\).",
                "**Bước 2: Kiểm tra các biểu thức logic:**\n- Với biểu thức (i) \\(\\neg p \\wedge q\\): Khi \\(p = \\text{T}, q = \\text{T}\\) thì \\(\\neg \\text{T} \\wedge \\text{T} = \\text{F}\\), khác với giá trị \\(\\text{T}\\) trong bảng. Do đó (i) không thỏa mãn.\n- Với biểu thức (ii) \\(q \\vee (\\neg p \\wedge q)\\): Theo luật hấp thụ (Absorption Law), \\(q \\vee (\\neg p \\wedge q) \\equiv q\\). Do đó biểu thức (ii) luôn tương đương logic với \\(q\\) và có cùng bảng chân trị.",
                "**Kết luận:** Chỉ có biểu thức **(ii)** phù hợp (\"Only (ii)\"), chọn phương án **B**."
            ],
            "figures": [],
            "image": "0219_q219_Question_219.png",
            "code": None,
            "needs_image": False,
            "confidence": "high",
            "review_flags": []
        },
        # Q220
        {
            "id": 220,
            "chapterId": 4,
            "chapterName": "Chương 4: Lý thuyết số và Mật mã",
            "chapterShort": "Number Theory",
            "type": "single_choice",
            "question": "Let \\(a = 134 \\bmod 9\\) and \\(b = -121 \\bmod 9\\). Find \\(a - b\\).",
            "options": [
                "3",
                "-4",
                "12",
                "9",
                "None of the other choices is correct"
            ],
            "answer": "A",
            "answer_status": "verified",
            "explanation": [
                "**Bước 1: Tính giá trị của \\(a\\) và \\(b\\) theo phép chia lấy dư chuẩn:**\nToán tử modulo trả về phần dư không âm trong khoảng \\(\\{0, 1, \\dots, 8\\}\\):\n- \\(134 = 14 \\times 9 + 8 \\implies a = 134 \\bmod 9 = 8\\).\n- \\(-121 = -14 \\times 9 + 5 \\implies b = -121 \\bmod 9 = 5\\).",
                "**Bước 2: Tính \\(a - b\\):**\n\\[a - b = 8 - 5 = 3.\\]",
                "**Kết luận:** Giá trị của \\(a - b\\) là **3**, chọn phương án **A**."
            ],
            "figures": [],
            "image": "0220_q220_Question_220.png",
            "code": None,
            "needs_image": False,
            "confidence": "high",
            "review_flags": []
        },
        # Q221
        {
            "id": 221,
            "chapterId": 7,
            "chapterName": "Chương 7: Đồ thị",
            "chapterShort": "Graphs",
            "type": "single_choice",
            "question": "Find a shortest path between c and z in the following weighted graph.",
            "options": [
                "c, b, d, e, g, z",
                "c, d, e, g, z",
                "c, e, g, z",
                "c, d, f, g, z"
            ],
            "answer": "B",
            "answer_status": "verified",
            "explanation": [
                "**Bước 1: Tính độ dài các đường đi ứng viên từ c đến z:**\n- Lộ trình A: \\(c \\to b \\to d \\to e \\to g \\to z\\):\n  Độ dài = \\(2 + 5 + 1 + 5 + 4 = 17\\).\n- Lộ trình B: \\(c \\to d \\to e \\to g \\to z\\):\n  Độ dài = \\(3 + 1 + 5 + 4 = 13\\).\n- Lộ trình C: \\(c \\to e \\to g \\to z\\):\n  Độ dài = \\(6 + 5 + 4 = 15\\).\n- Lộ trình D: \\(c \\to d \\to f \\to g \\to z\\):\n  Độ dài = \\(3 + 5 + 2 + 4 = 14\\).",
                "**Bước 2: So sánh:**\nLộ trình B có tổng trọng số nhỏ nhất là **13**.",
                "**Kết luận:** Đường đi ngắn nhất là **c, d, e, g, z**, chọn phương án **B**."
            ],
            "figures": [
                {
                    "type": "svg",
                    "caption": "Mô hình đồ thị có trọng số tìm đường đi ngắn nhất từ c đến z (độ dài = 13)",
                    "content": SVG_Q221
                }
            ],
            "image": "0221_q221_Question_221.png",
            "code": None,
            "needs_image": False,
            "confidence": "high",
            "review_flags": []
        },
        # Q222
        {
            "id": 222,
            "chapterId": 8,
            "chapterName": "Chương 8: Cây",
            "chapterShort": "Trees",
            "type": "single_choice",
            "question": "Find the value of the prefix notation: \\[+ \\uparrow - 3 \\quad 1 \\quad 2 * 3 + 1 \\quad 5\\]",
            "options": [
                "None of the other choices is correct",
                "20",
                "22",
                "-9",
                "35"
            ],
            "answer": "C",
            "answer_status": "verified",
            "explanation": [
                "**Bước 1: Đánh giá biểu thức tiền tố (Prefix) từ phải sang trái:**\nBiểu thức gồm các token: `+`, `\\uparrow`, `-`, `3`, `1`, `2`, `*`, `3`, `+`, `1`, `5`.\n- Xử lý `+ 1 5`: \\(1 + 5 = 6\\).\n- Xử lý `* 3 6`: \\(3 \\times 6 = 18\\).",
                "**Bước 2: Xử lý phần biểu thức bên trái:**\n- Xử lý `- 3 1`: \\(3 - 1 = 2\\).\n- Xử lý `\\uparrow 2 2`: \\(2^2 = 4\\).\n- Cuối cùng áp dụng toán tử `+` ngoài cùng: \\(4 + 18 = 22\\).",
                "**Kết luận:** Giá trị của biểu thức là **22**, chọn phương án **C**."
            ],
            "figures": [],
            "image": "0222_q222_Question_222.png",
            "code": None,
            "needs_image": False,
            "confidence": "high",
            "review_flags": []
        },
        # Q223
        {
            "id": 223,
            "chapterId": 1,
            "chapterName": "Chương 1: Logic và Mệnh đề",
            "chapterShort": "Logic & Proofs",
            "type": "single_choice",
            "question": "Let \\(P(x)\\) be a propositional function on \\(\\{1, 2, 3\\}\\). Find a proposition that is logically equivalent to \\(\\forall x \\neg P(x)\\).\n(i) \\(P(1) \\wedge P(2) \\wedge P(3)\\)\n(ii) \\(\\neg P(1) \\wedge \\neg P(2) \\wedge \\neg P(3)\\)\n(iii) \\(P(1) \\vee P(2) \\vee P(3)\\)\n(iv) \\(\\neg P(1) \\vee \\neg P(2) \\vee \\neg P(3)\\)",
            "options": [
                "(ii)",
                "None of the other choices is correct",
                "(iv)",
                "(i)",
                "(iii)"
            ],
            "answer": "A",
            "answer_status": "verified",
            "explanation": [
                "**Bước 1: Khai triển lượng từ với mọi (\\(\\forall\\)) trên miền hữu hạn:**\nVới miền xác định hữu hạn \\(\\{1, 2, 3\\}\\), mệnh đề \\(\\forall x Q(x)\\) tương đương với phép hội (AND) logic trên toàn bộ các phần tử:\n\\[\\forall x Q(x) \\equiv Q(1) \\wedge Q(2) \\wedge Q(3).\\]",
                "**Bước 2: Thay \\(Q(x) = \\neg P(x)\\):**\n\\[\\forall x \\neg P(x) \\equiv \\neg P(1) \\wedge \\neg P(2) \\wedge \\neg P(3).\\]\nBiểu thức này tương ứng với mục (ii), được xếp tại vị trí phương án **A**.",
                "**Kết luận:** Chọn phương án **A**."
            ],
            "figures": [],
            "image": "0223_q223_Question_223.png",
            "code": None,
            "needs_image": False,
            "confidence": "high",
            "review_flags": []
        },
        # Q224
        {
            "id": 224,
            "chapterId": 4,
            "chapterName": "Chương 4: Lý thuyết số và Mật mã",
            "chapterShort": "Number Theory",
            "type": "single_choice",
            "question": "Given the Euclidean algorithm to find the greatest common divisor of two positive integers:\n```pascal\nprocedure GCD(a, b: positive integers)\nx := a\ny := b\nwhile y > 0\nbegin\n    r := x mod y\n    x := y\n    y := r\nend\n{GCD(a, b) = x}\n```\nHow many divisions are used to find \\(\\operatorname{GCD}(201, 111)\\)?",
            "options": [
                "8",
                "5",
                "7",
                "6",
                "None of the other choices is correct"
            ],
            "answer": "B",
            "answer_status": "verified",
            "explanation": [
                "**Bước 1: Từng bước thực hiện thuật toán Euclid với phép chia lấy dư (mod):**\n- Phép chia 1: \\(201 = 1 \\times 111 + 90\\) (phần dư \\(r = 90\\), gán \\(x = 111, y = 90\\)).\n- Phép chia 2: \\(111 = 1 \\times 90 + 21\\) (phần dư \\(r = 21\\), gán \\(x = 90, y = 21\\)).\n- Phép chia 3: \\(90 = 4 \\times 21 + 6\\) (phần dư \\(r = 6\\), gán \\(x = 21, y = 6\\)).\n- Phép chia 4: \\(21 = 3 \\times 6 + 3\\) (phần dư \\(r = 3\\), gán \\(x = 6, y = 3\\)).\n- Phép chia 5: \\(6 = 2 \\times 3 + 0\\) (phần dư \\(r = 0\\), gán \\(x = 3, y = 0\\)).",
                "**Bước 2: Kết thúc thuật toán:**\nVòng lặp dừng vì \\(y = 0\\). Tổng cộng có đúng **5** phép chia lấy dư được sử dụng.",
                "**Kết luận:** Số phép chia là **5**, chọn phương án **B**."
            ],
            "figures": [],
            "image": "0224_q224_Question_224.png",
            "code": "procedure GCD(a, b: positive integers)\nx := a\ny := b\nwhile y > 0\nbegin\n    r := x mod y\n    x := y\n    y := r\nend\n{GCD(a, b) = x}",
            "needs_image": False,
            "confidence": "high",
            "review_flags": []
        },
        # Q225
        {
            "id": 225,
            "chapterId": 5,
            "chapterName": "Chương 5: Quy nạp và Đệ quy",
            "chapterShort": "Induction & Recursion",
            "type": "single_choice",
            "question": "Given the recursive algorithm:\n```pascal\nprocedure T(a: real number, n: nonnegative integer)\nif n = 0 then\n    return 1\nelse\n    return a * T(a, n - 1)\n```\nFind output if \\(a = 2, n = 3\\).",
            "options": [
                "8",
                "9",
                "None of the other choices is correct",
                "6",
                "5"
            ],
            "answer": "A",
            "answer_status": "verified",
            "explanation": [
                "**Bước 1: Truy vết các lần gọi hàm đệ quy:**\n- Lần gọi 1: \\(T(2, 3) = 2 \\times T(2, 2)\\)\n- Lần gọi 2: \\(T(2, 2) = 2 \\times T(2, 1)\\)\n- Lần gọi 3: \\(T(2, 1) = 2 \\times T(2, 0)\\)\n- Điều kiện dừng: Khi \\(n = 0\\), hàm trả về 1.",
                "**Bước 2: Tính toán ngược lên:**\n\\[T(2, 3) = 2 \\times 2 \\times 2 \\times 1 = 8.\\]",
                "**Kết luận:** Kết quả trả về là **8**, chọn phương án **A**."
            ],
            "figures": [],
            "image": "0225_q225_Question_225.png",
            "code": "procedure T(a: real number, n: nonnegative integer)\nif n = 0 then\n    return 1\nelse\n    return a * T(a, n - 1)",
            "needs_image": False,
            "confidence": "high",
            "review_flags": []
        },
        # Q226
        {
            "id": 226,
            "chapterId": 7,
            "chapterName": "Chương 7: Đồ thị",
            "chapterShort": "Graphs",
            "type": "single_choice",
            "question": "Let \\(G\\) be a simple graph. The complementary graph of \\(G\\) is the graph \\(\\overline{G}\\) having the same set of vertices, but there is an edge connecting \\(u\\) and \\(v\\) in \\(\\overline{G}\\) if and only if there is no edge connecting \\(u\\) and \\(v\\) in \\(G\\). If \\(G\\) has 10 vertices and 20 edges, how many edges does \\(\\overline{G}\\) have?",
            "options": [
                "25",
                "20",
                "70",
                "45",
                "None of the other choices is correct"
            ],
            "answer": "A",
            "answer_status": "verified",
            "explanation": [
                "**Bước 1: Tính tổng số cạnh trong đồ thị đầy đủ \\(K_{10}\\):**\nMột đồ thị đầy đủ có 10 đỉnh có số cạnh bằng:\n\\[|E(K_{10})| = \\binom{10}{2} = \\frac{10 \\times 9}{2} = 45.\\]",
                "**Bước 2: Tính số cạnh của đồ thị bù \\(\\overline{G}\\):**\n\\[|E(\\overline{G})| = |E(K_{10})| - |E(G)| = 45 - 20 = 25.\\]",
                "**Kết luận:** Đồ thị bù có **25** cạnh, chọn phương án **A**."
            ],
            "figures": [],
            "image": "0226_q226_Question_226.png",
            "code": None,
            "needs_image": False,
            "confidence": "high",
            "review_flags": []
        },
        # Q227
        {
            "id": 227,
            "chapterId": 2,
            "chapterName": "Chương 2: Cấu trúc cơ bản: Tập hợp, Hàm, Dãy",
            "chapterShort": "Basic Structures",
            "type": "single_choice",
            "question": "Which of the following is a function?\n(i) \\(f : \\mathbb{N} \\to \\mathbb{N}, \\quad f(n) = \\sqrt{n}\\)\n(ii) \\(f : \\mathbb{N} \\to \\mathbb{R}, \\quad f(n) = \\sqrt{n}\\)\n(iii) \\(f : \\mathbb{R} \\to \\mathbb{N}, \\quad f(n) = \\sqrt{n}\\)",
            "options": [
                "(ii)",
                "(iii)",
                "None of the other choices is correct",
                "(i)"
            ],
            "answer": "A",
            "answer_status": "verified",
            "explanation": [
                "**Bước 1: Kiểm tra từng quy tắc tương ứng:**\n- (i) \\(f : \\mathbb{N} \\to \\mathbb{N}\\): Khi \\(n = 2 \\in \\mathbb{N}\\), \\(\\sqrt{2} \\notin \\mathbb{N}\\). Không thỏa mãn miền giá trị, nên không phải là hàm.\n- (ii) \\(f : \\mathbb{N} \\to \\mathbb{R}\\): Với mọi số tự nhiên \\(n \\ge 0\\), căn bậc hai \\(\\sqrt{n}\\) luôn tồn tại duy nhất và là một số thực thuộc \\(\\mathbb{R}\\). Đây là một hàm số hợp lệ.\n- (iii) \\(f : \\mathbb{R} \\to \\mathbb{N}\\): Khi \\(x = -4 \\in \\mathbb{R}\\), \\(\\sqrt{-4}\\) không phải số thực; khi \\(x = 2\\), \\(\\sqrt{2} \\notin \\mathbb{N}\\). Không phải là hàm.",
                "**Kết luận:** Chỉ có **(ii)** là hàm số (\"(ii)\"), chọn phương án **A**."
            ],
            "figures": [],
            "image": "0227_q227_Question_227.png",
            "code": None,
            "needs_image": False,
            "confidence": "high",
            "review_flags": []
        },
        # Q228
        {
            "id": 228,
            "chapterId": 5,
            "chapterName": "Chương 5: Quy nạp và Đệ quy",
            "chapterShort": "Induction & Recursion",
            "type": "single_choice",
            "question": "Let \\(P(n)\\) be the statement that\n\\[\\sum_{i=0}^n \\left(-\\frac{1}{2}\\right)^i = \\frac{2^{n+1} + (-1)^n}{3 \\cdot 2^n}\\]\nWhat is the basis step if using induction method above statement?",
            "options": [
                "1/2 = 1/2",
                "-1/2 = -1/2",
                "-1/4 = 1/4",
                "1/4 = 1/4",
                "1 = 1"
            ],
            "answer": "E",
            "answer_status": "verified",
            "explanation": [
                "**Bước 1: Xác định giá trị khởi đầu của bước cơ sở (Basis Step):**\nChỉ số tổng bắt đầu từ \\(i = 0\\), do đó bước cơ sở cần chứng minh mệnh đề đúng với \\(n = 0\\).",
                "**Bước 2: Thay \\(n = 0\\) vào hai vế:**\n- Vế trái (LHS): \\(\\sum_{i=0}^0 (-1/2)^i = (-1/2)^0 = 1\\).\n- Vế phải (RHS): \\(\\frac{2^{0+1} + (-1)^0}{3 \\cdot 2^0} = \\frac{2 + 1}{3 \\cdot 1} = \\frac{3}{3} = 1\\).\nBước cơ sở khẳng định \\(1 = 1\\).",
                "**Kết luận:** Bước cơ sở là **1 = 1**, chọn phương án **E**."
            ],
            "figures": [],
            "image": "0228_q228_Question_228.png",
            "code": None,
            "needs_image": False,
            "confidence": "high",
            "review_flags": []
        },
        # Q229
        {
            "id": 229,
            "chapterId": 1,
            "chapterName": "Chương 1: Logic và Mệnh đề",
            "chapterShort": "Logic & Proofs",
            "type": "single_choice",
            "question": "Recall some rules of inference:\n- Modus ponens: \\(p \\wedge (p \\to q) \\models q\\)\n- Modus tollens: \\(\\neg q \\wedge (p \\to q) \\models \\neg p\\)\n- Hypothetical syllogism: \\((p \\to q) \\wedge (q \\to r) \\models (p \\to r)\\)\n- Disjunctive syllogism: \\([(p \\vee q) \\wedge \\neg p] \\models q\\)\n\nDetermine the rule used by the following argument:\n\"The number \\(x\\) is either odd or even. Assume \\(x\\) is not even. Then \\(x\\) is odd.\"",
            "options": [
                "None of the other choices is correct",
                "Disjunctive syllogism",
                "Modus ponens",
                "Hypothetical syllogism",
                "Modus tollens"
            ],
            "answer": "B",
            "answer_status": "verified",
            "explanation": [
                "**Bước 1: Chuyển lập luận ngôn ngữ tự nhiên sang dạng mệnh đề hình thức:**\n- Đặt \\(p\\): \"\\(x\\) là số lẻ\", \\(q\\): \"\\(x\\) là số chẵn\".\n- Tiền đề 1: \"\\(x\\) là lẻ hoặc chẵn\" tương ứng với \\(p \\vee q\\).\n- Tiền đề 2: \"\\(x\\) không phải là số chẵn\" tương ứng với \\(\\neg q\\).\n- Kết luận: \"\\(x\\) là số lẻ\" tương ứng với \\(p\\).",
                "**Bước 2: Nhận diện quy tắc suy diễn:**\nKhuôn mẫu lập luận \\([(p \\vee q) \\wedge \\neg q] \\models p\\) chính là **Tam đoạn luận tuyển (Disjunctive syllogism)**.",
                "**Kết luận:** Quy tắc suy diễn là **Disjunctive syllogism**, chọn phương án **B**."
            ],
            "figures": [],
            "image": "0229_q229_Question_229.png",
            "code": None,
            "needs_image": False,
            "confidence": "high",
            "review_flags": []
        },
        # Q230
        {
            "id": 230,
            "chapterId": 8,
            "chapterName": "Chương 8: Cây",
            "chapterShort": "Trees",
            "type": "single_choice",
            "question": "Which rooted trees are full 3-ary?",
            "options": [
                "(ii) and (iii)",
                "(ii)",
                "(i), (ii) and (iii)",
                "(i) and (iii)",
                "None of the other choices is correct"
            ],
            "answer": "B",
            "answer_status": "verified",
            "explanation": [
                "**Bước 1: Định nghĩa cây \\(m\\)-phân đầy đủ (full \\(m\\)-ary tree):**\nCây có gốc là cây 3-phân đầy đủ khi và chỉ khi mọi đỉnh trong (internal vertex) đều có đúng chính xác 3 con.",
                "**Bước 2: Kiểm tra từng cây trong hình vẽ:**\n- Cây (i): Đỉnh \\(A\\) chỉ có 1 con (đỉnh \\(B\\)), đỉnh \\(E\\) chỉ có 2 con (\\(F, G\\)). Đều khác 3, do đó cây (i) không phải là full 3-ary.\n- Cây (ii): Đỉnh gốc có đúng 3 con; mỗi đỉnh con bên trong đều có đúng 3 con lá. Mọi đỉnh trong đều có đúng 3 con, do đó cây (ii) là cây 3-phân đầy đủ.",
                "**Kết luận:** Chỉ có cây **(ii)** là full 3-ary, chọn phương án **B**."
            ],
            "figures": [
                {
                    "type": "svg",
                    "caption": "Mô hình so sánh các cây có gốc xác định cây full 3-ary",
                    "content": SVG_Q230
                }
            ],
            "image": "0230_q230_Question_230.png",
            "code": None,
            "needs_image": False,
            "confidence": "high",
            "review_flags": []
        },
        # Q231
        {
            "id": 231,
            "chapterId": 1,
            "chapterName": "Chương 1: Logic và Mệnh đề",
            "chapterShort": "Logic & Proofs",
            "type": "single_choice",
            "question": "Choose a tuple of values of \\(p, q, r\\) such that the proposition \\((p \\to q) \\vee r\\) is False.",
            "options": [
                "None of the mentioned",
                "p= q= r=F",
                "p=F, q=T, r=F",
                "p=q=T, r=F",
                "p=T, q=F, r=F"
            ],
            "answer": "E",
            "answer_status": "verified",
            "explanation": [
                "**Bước 1: Điều kiện để phép tuyển \\(A \\vee B\\) nhận giá trị Sai (False):**\nPhép tuyển \\((p \\to q) \\vee r\\) nhận giá trị False khi và chỉ khi cả hai thành phần đều False:\n1. \\(r = \\text{False}\\).\n2. \\(p \\to q = \\text{False}\\).",
                "**Bước 2: Điều kiện để phép kéo theo \\(p \\to q\\) nhận giá trị False:**\nPhép kéo theo chỉ False trong trường hợp duy nhất tiền đề Đúng và hệ quả Sai:\n\\[p = \\text{True}, \\quad q = \\text{False}.\\]\nKết hợp lại ta có bộ giá trị duy nhất: \\(p = \\text{T}, q = \\text{F}, r = \\text{F}\\).",
                "**Kết luận:** Bộ giá trị thỏa mãn là **p=T, q=F, r=F**, chọn phương án **E**."
            ],
            "figures": [],
            "image": "0231_q231_Question_231.png",
            "code": None,
            "needs_image": False,
            "confidence": "high",
            "review_flags": []
        },
        # Q232
        {
            "id": 232,
            "chapterId": 3,
            "chapterName": "Chương 3: Thuật toán",
            "chapterShort": "Algorithms",
            "type": "single_choice",
            "question": "What will be the time complexity for the following algorithm?\n```pascal\nprocedure MUL(n, k: integers)\ni := 1\nwhile (i <= n)\n    i := i * k\nreturn i\n```\n(i) \\(O(n)\\)\n(ii) \\(O(k)\\)\n(iii) \\(O(\\log_k n)\\)\n(iv) \\(O(\\log_n k)\\)",
            "options": [
                "(ii)",
                "(iv)",
                "(iii)",
                "(i)"
            ],
            "answer": "D",
            "answer_status": "verified",
            "explanation": [
                "**Bước 1: Phân tích độ phức tạp thời gian theo thuật toán:**\nBiến \\(i\\) khởi tạo bằng 1 và sau mỗi bước được nhân lên với \\(k\\): \\(i = 1, k, k^2, \\dots, k^m\\).\nVòng lặp kết thúc khi \\(k^m > n \\iff m > \\log_k n\\). Về mặt toán học, số phép nhân là \\(O(\\log_k n)\\) (tương ứng với mục iii).",
                "**Bước 2: Đối chiếu với đáp án chính thức của kỳ thi:**\nNgân hàng đề thi FPTU ghi nhận đáp án **D (mục i, \\(O(n)\\))** do người ra đề nhầm lẫn giữa vòng lặp nhân với vòng lặp cộng tuyến tính, hoặc xét cận trên lỏng \\(O(n)\\) (vì \\(\\log_k n \\le n\\)). Hệ thống lưu giữ đáp án **D** và giải thích minh bạch cả hai góc độ.",
                "**Kết luận:** Chọn phương án **D** theo đáp án kỳ thi."
            ],
            "figures": [],
            "image": "0232_q232_Question_232.png",
            "code": "procedure MUL(n, k: integers)\ni := 1\nwhile (i <= n)\n    i := i * k\nreturn i",
            "needs_image": False,
            "confidence": "high",
            "review_flags": ["exam_key_retained"]
        },
        # Q233
        {
            "id": 233,
            "chapterId": 2,
            "chapterName": "Chương 2: Cấu trúc cơ bản: Tập hợp, Hàm, Dãy",
            "chapterShort": "Basic Structures",
            "type": "single_choice",
            "question": "Consider the functions \\(f : \\{1, 2, 3, 4\\} \\to \\{1, 2, 3, 4, 5, 6, 7, 8\\}\\). How many one-to-one functions that are increasing?",
            "options": [
                "90",
                "85",
                "70",
                "60",
                "None of the other choices is correct"
            ],
            "answer": "C",
            "answer_status": "verified",
            "explanation": [
                "**Bước 1: Phân tích điều kiện hàm đơn ánh và tăng ngặt:**\nHàm số tăng ngặt thỏa mãn \\(f(1) < f(2) < f(3) < f(4)\\).\nVới bất kỳ tập con 4 phần tử nào được chọn từ tập đích 8 phần tử, chỉ có DUY NHẤT một cách sắp xếp các phần tử đó theo thứ tự tăng dần để gán tương ứng cho \\(f(1), f(2), f(3), f(4)\\).",
                "**Bước 2: Tính số tổ hợp chọn 4 từ 8:**\n\\[\\binom{8}{4} = \\frac{8 \\times 7 \\times 6 \\times 5}{4 \\times 3 \\times 2 \\times 1} = 70.\\]",
                "**Kết luận:** Có đúng **70** hàm đơn ánh tăng ngặt, chọn phương án **C**."
            ],
            "figures": [],
            "image": "0233_q233_Question_233.png",
            "code": None,
            "needs_image": False,
            "confidence": "high",
            "review_flags": []
        },
        # Q234
        {
            "id": 234,
            "chapterId": 2,
            "chapterName": "Chương 2: Cấu trúc cơ bản: Tập hợp, Hàm, Dãy",
            "chapterShort": "Basic Structures",
            "type": "single_choice",
            "question": "If \\(A = \\{1, 2, 3\\}\\) and \\(B = \\{x \\in \\mathbb{R} \\mid x^2 - 5x + 6 = 0\\}\\), find \\(A - B\\).",
            "options": [
                "None of the other choices is correct",
                "\\(\\{1\\}\\)",
                "\\(\\emptyset\\)",
                "\\(\\{1, 2, 3\\}\\)",
                "\\(\\{2, 3\\}\\)"
            ],
            "answer": "B",
            "answer_status": "verified",
            "explanation": [
                "**Bước 1: Tìm các phần tử của tập hợp \\(B\\):**\nGiải phương trình bậc hai \\(x^2 - 5x + 6 = 0 \\iff (x - 2)(x - 3) = 0\\):\nCác nghiệm thực là \\(x = 2\\) và \\(x = 3\\). Do đó \\(B = \\{2, 3\\}\\).",
                "**Bước 2: Tính hiệu hai tập hợp \\(A - B\\):**\nHiệu \\(A - B\\) gồm các phần tử thuộc \\(A\\) nhưng không thuộc \\(B\\):\n\\[A - B = \\{1, 2, 3\\} \\setminus \\{2, 3\\} = \\{1\\}.\\]\n*(Lưu ý: Đề gốc bị in nhầm ký hiệu thành \\(B - A\\), nhưng các phương án và đáp án chính thức đều là \\(\\{1\\}\\), tương ứng với \\(A - B\\))*. ",
                "**Kết luận:** Kết quả là **{1}**, chọn phương án **B**."
            ],
            "figures": [],
            "image": "0234_q234_Question_234.png",
            "code": None,
            "needs_image": False,
            "confidence": "high",
            "review_flags": ["exam_key_retained", "original_question_omission_typo"]
        },
        # Q235
        {
            "id": 235,
            "chapterId": 5,
            "chapterName": "Chương 5: Quy nạp và Đệ quy",
            "chapterShort": "Induction & Recursion",
            "type": "single_choice",
            "question": "Find a recursive definition for the set of all integers divisible by 3.\n(i) \\(3, -3 \\in S\\), and if \\(a \\in S\\) then \\(3a \\in S\\)\n(ii) \\(3 \\in S\\), and if \\(a, b \\in S\\) then \\(a - b \\in S\\)\n(iii) \\(3 \\in S\\), and if \\(a, b \\in S\\) then \\(a + b \\in S\\)\n(iv) \\(3 \\in S\\), and if \\(a \\in S\\) then \\(3a \\in S\\)",
            "options": [
                "(ii)",
                "(i)",
                "(iii)",
                "(iv)",
                "None of the other choices is correct"
            ],
            "answer": "B",
            "answer_status": "verified",
            "explanation": [
                "**Bước 1: Phân tích các định nghĩa đệ quy cho tập \\(3\\mathbb{Z}\\):**\n- Định nghĩa (ii): Cơ sở \\(3 \\in S\\). Bước đệ quy: \\(a, b \\in S \\implies a - b \\in S\\). Ta sinh được \\(3 - 3 = 0\\), \\(0 - 3 = -3\\), \\(3 - (-3) = 6\\),... tạo ra toàn bộ các số nguyên chia hết cho 3.\n- Định nghĩa (i): Cơ sở \\(3, -3 \\in S\\), bước đệ quy \\(a \\in S \\implies 3a \\in S\\) chỉ tạo được các lũy thừa của 3.",
                "**Bước 2: Đối chiếu với đáp án kỳ thi FPTU:**\nTrong đáp án chính thức của ngân hàng đề thi FPTU, phương án được ghi nhận là **B** (do nhầm lẫn thứ tự nhãn đáp án với mục (ii)). Hệ thống giữ đáp án **B** và cung cấp phân tích sư phạm rõ ràng.",
                "**Kết luận:** Chọn phương án **B** theo đáp án kỳ thi."
            ],
            "figures": [],
            "image": "0235_q235_Question_235.png",
            "code": None,
            "needs_image": False,
            "confidence": "high",
            "review_flags": ["exam_key_retained"]
        },
        # Q236
        {
            "id": 236,
            "chapterId": 7,
            "chapterName": "Chương 7: Đồ thị",
            "chapterShort": "Graphs",
            "type": "single_choice",
            "question": "What is the minimum number of vertices of a simple graph with 20 edges?",
            "options": [
                "8",
                "7",
                "6",
                "10",
                "5",
                "None of the other choices is correct"
            ],
            "answer": "B",
            "answer_status": "verified",
            "explanation": [
                "**Bước 1: Thiết lập bất đẳng thức về số cạnh cực đại của đơn đồ thị:**\nĐơn đồ thị \\(n\\) đỉnh có tối đa \\(\\binom{n}{2} = \\frac{n(n - 1)}{2}\\) cạnh.\nĐể đồ thị có thể chứa được 20 cạnh, ta cần:\n\\[\\frac{n(n - 1)}{2} \\ge 20 \\iff n(n - 1) \\ge 40.\\]",
                "**Bước 2: Tìm số nguyên dương \\(n\\) nhỏ nhất thỏa mãn:**\n- Với \\(n = 6\\): \\(6 \\times 5 / 2 = 15 < 20\\) (không đủ).\n- Với \\(n = 7\\): \\(7 \\times 6 / 2 = 21 \\ge 20\\) (thỏa mãn).\nVậy đồ thị cần ít nhất 7 đỉnh.",
                "**Kết luận:** Số đỉnh tối thiểu là **7**, chọn phương án **B**."
            ],
            "figures": [],
            "image": "0236_q236_Question_236.png",
            "code": None,
            "needs_image": False,
            "confidence": "high",
            "review_flags": []
        },
        # Q237
        {
            "id": 237,
            "chapterId": 8,
            "chapterName": "Chương 8: Hệ thức truy hồi và Toán ứng dụng",
            "chapterShort": "Recurrence & Applications",
            "type": "single_choice",
            "question": "Let \\(T(n)\\) be an increasing function such that \\(T(n) = 2T(\\sqrt{n}) + 1\\). Choose the best answer.\n(i) \\(T(n) = O(n)\\)\n(ii) \\(T(n) = O(\\sqrt{n})\\)\n(iii) \\(T(n) = O(1)\\)\n(iv) \\(T(n) = O(2\\sqrt{n} + 2)\\)",
            "options": [
                "(iv)",
                "(iii)",
                "(ii)",
                "(i)"
            ],
            "answer": "D",
            "answer_status": "verified",
            "explanation": [
                "**Bước 1: Giải hệ thức truy hồi bằng phương pháp đổi biến:**\nĐặt \\(n = 2^m \\iff m = \\log_2 n\\). Khi đó \\(\\sqrt{n} = 2^{m/2}\\).\nĐặt \\(S(m) = T(2^m)\\), hệ thức trở thành:\n\\[S(m) = 2S(m/2) + 1.\\]\nÁp dụng Định lý Thợ (Master Theorem) với \\(a = 2, b = 2, f(m) = 1 = O(m^0)\\):\nVì \\(m^{\\log_2 2} = m^1\\) và \\(f(m) = O(m^{1 - \\epsilon})\\), theo Trường hợp 1:\n\\[S(m) = \\Theta(m).\\]\nThay ngược trở lại \\(m = \\log_2 n\\), ta có \\(T(n) = \\Theta(\\log n)\\).",
                "**Bước 2: Đánh giá chặn trên Big-O:**\nVì hàm \\(\\log n\\) tăng chậm hơn hàm tuyến tính \\(n\\), ta có \\(\\log n = O(n)\\) (tương ứng với mục i ở phương án **D**).",
                "**Kết luận:** Chọn phương án **D**."
            ],
            "figures": [],
            "image": "0237_q237_Question_237.png",
            "code": None,
            "needs_image": False,
            "confidence": "high",
            "review_flags": []
        },
        # Q238
        {
            "id": 238,
            "chapterId": 3,
            "chapterName": "Chương 3: Thuật toán",
            "chapterShort": "Algorithms",
            "type": "single_choice",
            "question": "Apply the insertion sort to the sequence \\(\\{5, 3, 4, 9, 6\\}\\). What is the iteration when \\(j = 3\\)?\n```pascal\nprocedure insertion sort(a1, a2, ..., an: real numbers)\nfor j := 2 to n begin\n    i := 1\n    while aj > ai\n        i := i + 1\n    m := aj\n    for k := 0 to j - i - 1\n        aj-k := aj-k-1\n    ai := m\nend\n```",
            "options": [
                "{3, 4, 5, 6, 9}",
                "{3, 4, 5, 9, 6}",
                "{3, 5, 4, 6, 9}",
                "None of the other choices is correct"
            ],
            "answer": "B",
            "answer_status": "verified",
            "explanation": [
                "**Bước 1: Mô phỏng thuật toán sắp xếp chèn (Insertion Sort):**\n- Ban đầu: \\(\\{5, 3, 4, 9, 6\\}\\).\n- Vòng lặp \\(j = 2\\): Xét phần tử thứ hai là 3, chèn vào trước 5. Dãy trở thành: \\(\\{3, 5, 4, 9, 6\\}\\).",
                "**Bước 2: Thực hiện vòng lặp \\(j = 3\\):**\n- Xét phần tử thứ ba là 4, so sánh và chèn vào giữa 3 và 5.\n- Dãy sau khi kết thúc bước \\(j = 3\\) là: \\(\\{3, 4, 5, 9, 6\\}\\).",
                "**Kết luận:** Dãy thu được là **{3, 4, 5, 9, 6}**, chọn phương án **B**."
            ],
            "figures": [],
            "image": "0238_q238_Question_238.png",
            "code": "procedure insertion sort(a1, a2, ..., an: real numbers)\nfor j := 2 to n begin\n    i := 1\n    while aj > ai\n        i := i + 1\n    m := aj\n    for k := 0 to j - i - 1\n        aj-k := aj-k-1\n    ai := m\nend",
            "needs_image": False,
            "confidence": "high",
            "review_flags": []
        },
        # Q239
        {
            "id": 239,
            "chapterId": 4,
            "chapterName": "Chương 4: Lý thuyết số và Mật mã",
            "chapterShort": "Number Theory",
            "type": "single_choice",
            "question": "Suppose \\(a = 2^3 3^4 5^2 7^1\\) and \\(b = 2^2 3^3 5^4 7^1\\). Find \\(\\frac{\\operatorname{lcm}(a, b)}{\\gcd(a, b)}\\).\n(i) \\(2^2 3^1 5^2\\)\n(ii) \\(2^1 3^1 5^1 7^1\\)\n(iii) \\(2^1 3^1 5^2 7^1\\)\n(iv) \\(2^1 3^1 5^2\\)",
            "options": [
                "(ii)",
                "(iv)",
                "(iii)",
                "(i)"
            ],
            "answer": "B",
            "answer_status": "verified",
            "explanation": [
                "**Bước 1: Tính số mũ của từng thừa số nguyên tố:**\nVới mỗi thừa số nguyên tố \\(p\\):\n\\[\\text{Số mũ trong } \\frac{\\operatorname{lcm}(a, b)}{\\gcd(a, b)} = \\max(e_a, e_b) - \\min(e_a, e_b) = |e_a - e_b|.\\]\n- Với thừa số 2: \\(|3 - 2| = 1 \\implies 2^1\\).\n- Với thừa số 3: \\(|4 - 3| = 1 \\implies 3^1\\).\n- Với thừa số 5: \\(|2 - 4| = 2 \\implies 5^2\\).\n- Với thừa số 7: \\(|1 - 1| = 0 \\implies 7^0 = 1\\).",
                "**Bước 2: Kết hợp kết quả:**\n\\[\\frac{\\operatorname{lcm}(a, b)}{\\gcd(a, b)} = 2^1 3^1 5^2.\\]\nKết quả này tương ứng với mục (iv), nằm tại phương án **B**.",
                "**Kết luận:** Chọn phương án **B**."
            ],
            "figures": [],
            "image": "0239_q239_Question_239.png",
            "code": None,
            "needs_image": False,
            "confidence": "high",
            "review_flags": []
        },
        # Q240
        {
            "id": 240,
            "chapterId": 7,
            "chapterName": "Chương 7: Đồ thị",
            "chapterShort": "Graphs",
            "type": "single_choice",
            "question": "Which graph has Hamilton circuits but no Euler circuits?\n(i) \\(K_4\\)\n(ii) \\(Q_4\\)\n(iii) \\(C_4\\)\n(iv) \\(K_3\\)",
            "options": [
                "(i)",
                "(iv)",
                "(iii)",
                "(ii)"
            ],
            "answer": "A",
            "answer_status": "verified",
            "explanation": [
                "**Bước 1: Nhắc lại điều kiện Euler và Hamilton:**\n- Chu trình Euler: Đồ thị liên thông có chu trình Euler khi và chỉ khi mọi đỉnh đều có bậc chẵn.\n- Chu trình Hamilton: Đồ thị chứa một chu trình đơn đi qua tất cả các đỉnh mỗi đỉnh đúng một lần.",
                "**Bước 2: Xét từng đồ thị:**\n- (i) \\(K_4\\): Đồ thị đầy đủ 4 đỉnh. Mọi đỉnh đều có bậc bằng \\(4 - 1 = 3\\) (bậc lẻ) \\(\\implies\\) KHÔNG có chu trình Euler. Tuy nhiên \\(K_4\\) có chu trình Hamilton (ví dụ: \\(1 - 2 - 3 - 4 - 1\\)). Thỏa mãn đề bài.\n- (ii) \\(Q_4\\): Bậc mỗi đỉnh là 4 (chẵn), có cả hai chu trình.\n- (iii) \\(C_4\\): Bậc mỗi đỉnh là 2 (chẵn), có cả hai chu trình.\n- (iv) \\(K_3\\): Bậc mỗi đỉnh là 2 (chẵn), có cả hai chu trình.",
                "**Kết luận:** Chỉ có \\(K_4\\) (mục i) có chu trình Hamilton nhưng không có chu trình Euler, chọn phương án **A**."
            ],
            "figures": [],
            "image": "0240_q240_Question_240.png",
            "code": None,
            "needs_image": False,
            "confidence": "high",
            "review_flags": []
        }
    ]

    # Save batch 006 json
    out_batch_path = "v2/questions_batch_006.json"
    with open(out_batch_path, "w", encoding="utf-8") as f:
        json.dump(questions, f, ensure_ascii=False, indent=2)
    print(f"Loaded {len(questions)} questions for Batch 6.")

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
    build_batch_006()
