# BÁO CÁO KIỂM TOÁN (AUDIT) 3 BỘ ĐỀ MỚI CSD203
**Đối tượng kiểm toán:** 3 bộ đề thi mới: `CSD203_SP26_FE`, `CSD203_SP26_RE`, `CSD203_SU26_FE`  
**Thời gian thực hiện:** 18/11/2026  
**Nguyên tắc thực hiện:** TUYỆT ĐỐI KHÔNG SỬA, KHÔNG DI CHUYỂN, KHÔNG COPY BẤT KỲ FILE NÀO VÀO DỰ ÁN. CHỈ ĐỌC, PHÂN TÍCH VÀ XUẤT BÁO CÁO.

---

## 1. TỔNG QUAN 3 BỘ ĐỀ MỚI

| Tiêu chí | CSD203_SP26_FE | CSD203_SP26_RE | CSD203_SU26_FE | TỔNG CỘNG |
| :--- | :---: | :---: | :---: | :---: |
| **Tổng số câu hỏi** | **50 câu** | **50 câu** | **50 câu** | **150 câu** |
| **Số câu có đáp án (\answer)** | 50 (100%) | 50 (100%) | 50 (100%) | 150 (100%) |
| **Số câu chứa khối Code (\begin{code})** | 9 câu | 10 câu | 7 câu | **26 câu** |
| **Số câu có ảnh sơ đồ (\includegraphics)** | 3 câu | 4 câu | 2 câu | **9 câu** |
| **Số file ảnh sơ đồ trong `assets/`** | 4 files (360 KB) | 4 files (155 KB) | 2 files (65 KB) | **10 files (581 KB)** |
| **Số screenshot đề thi gốc** | 50 files JPG (3.28 MB) | 50 files JPG (3.39 MB) | 50 files WebP (2.16 MB) | **150 files (8.83 MB)** |
| **File dữ liệu khác** | `batch_fe_1_5.json` (16 KB) | Không có | Không có | 1 file phụ |
| **Số câu Multi-select (Chọn nhiều)** | 2 câu (Q12, Q26) | 0 câu | 0 câu | **2 câu** |

---

## 2. BƯỚC 0: CẤU TRÚC VÀ NGUYÊN VĂN CÁC TỆP DỮ LIỆU

### 2.1. Danh sách tệp, dung lượng và quy ước đặt tên ảnh
1. **Bộ `CSD203_SP26_FE`:**
   - `CSD203_SP26_FE.tex` (105,273 bytes)
   - `manifest.json` (1,202 bytes)
   - `batch_fe_1_5.json` (16,519 bytes)
   - Thư mục `assets/` (4 files, 360,142 bytes): `Q3_fig.png`, `Q5_fig.png`, `Q7_fig.png`, `Q24_fig.png`.
   - 50 ảnh screenshot: `Q1.jpg` đến `Q50.jpg` (tổng 3,281,424 bytes).
   - *Quy ước đặt tên ảnh:* Ảnh đề thi gốc đặt tên dạng `Q{1..50}.jpg`; ảnh sơ đồ trích xuất đặt trong thư mục con `assets/Q{id}_fig.png`.
2. **Bộ `CSD203_SP26_RE`:**
   - `CSD203_SP26_RE.tex` (105,507 bytes)
   - `manifest.json` (1,202 bytes)
   - Thư mục `assets/` (4 files, 155,209 bytes): `Q5_fig.png`, `Q7_fig.png`, `Q25_fig.png`, `Q26_fig.png`.
   - 50 ảnh screenshot: `Q1.jpg` đến `Q50.jpg` (tổng 3,392,108 bytes).
   - *Quy ước đặt tên ảnh:* Ảnh đề thi gốc đặt tên dạng `Q{1..50}.jpg`; ảnh sơ đồ trích xuất đặt trong `assets/Q{id}_fig.png`.
3. **Bộ `CSD203_SU26_FE`:**
   - `CSD203_SU26_FE.tex` (99,547 bytes)
   - `manifest.json` (1,252 bytes)
   - Thư mục `assets/` (2 files, 65,721 bytes): `Q6_fig.png`, `Q26_fig.png`.
   - 50 ảnh screenshot: `Q1.webp` đến `Q50.webp` (tổng 2,164,284 bytes).
   - *Quy ước đặt tên ảnh:* Ảnh đề thi gốc định dạng WebP hiện đại `Q{1..50}.webp`; ảnh sơ đồ trích xuất đặt trong `assets/Q{id}_fig.png`.

---

### 2.2. NGUYÊN VĂN tệp `manifest.json` của cả 3 bộ đề

#### Manifest: `CSD203_SP26_FE/manifest.json`
```json
{
  "exam_title": "CSD203_SP26_FE",
  "subject": "CSD203 - Data Structures and Algorithms",
  "profile": "cs",
  "duration_min": 60,
  "total_questions": 50,
  "files": [
    "Q1.jpg",
    "Q2.jpg",
    "Q3.jpg",
    "Q4.jpg",
    "Q5.jpg",
    "Q6.jpg",
    "Q7.jpg",
    "Q8.jpg",
    "Q9.jpg",
    "Q10.jpg",
    "Q11.jpg",
    "Q12.jpg",
    "Q13.jpg",
    "Q14.jpg",
    "Q15.jpg",
    "Q16.jpg",
    "Q17.jpg",
    "Q18.jpg",
    "Q19.jpg",
    "Q20.jpg",
    "Q21.jpg",
    "Q22.jpg",
    "Q23.jpg",
    "Q24.jpg",
    "Q25.jpg",
    "Q26.jpg",
    "Q27.jpg",
    "Q28.jpg",
    "Q29.jpg",
    "Q30.jpg",
    "Q31.jpg",
    "Q32.jpg",
    "Q33.jpg",
    "Q34.jpg",
    "Q35.jpg",
    "Q36.jpg",
    "Q37.jpg",
    "Q38.jpg",
    "Q39.jpg",
    "Q40.jpg",
    "Q41.jpg",
    "Q42.jpg",
    "Q43.jpg",
    "Q44.jpg",
    "Q45.jpg",
    "Q46.jpg",
    "Q47.jpg",
    "Q48.jpg",
    "Q49.jpg",
    "Q50.jpg"
  ],
  "question_range": "1-50",
  "confidence": "high",
  "evidence": "FPTU CSD203 exam questions covering binary trees, AVL trees, graphs, heaps, linked lists, complexity, recursion, Python code snippets",
  "audio_files": []
}
```

#### Manifest: `CSD203_SP26_RE/manifest.json`
```json
{
  "exam_title": "CSD203_SP26_RE",
  "subject": "CSD203 - Data Structures and Algorithms",
  "profile": "cs",
  "duration_min": 60,
  "total_questions": 50,
  "files": [
    "Q1.jpg",
    "Q2.jpg",
    "Q3.jpg",
    "Q4.jpg",
    "Q5.jpg",
    "Q6.jpg",
    "Q7.jpg",
    "Q8.jpg",
    "Q9.jpg",
    "Q10.jpg",
    "Q11.jpg",
    "Q12.jpg",
    "Q13.jpg",
    "Q14.jpg",
    "Q15.jpg",
    "Q16.jpg",
    "Q17.jpg",
    "Q18.jpg",
    "Q19.jpg",
    "Q20.jpg",
    "Q21.jpg",
    "Q22.jpg",
    "Q23.jpg",
    "Q24.jpg",
    "Q25.jpg",
    "Q26.jpg",
    "Q27.jpg",
    "Q28.jpg",
    "Q29.jpg",
    "Q30.jpg",
    "Q31.jpg",
    "Q32.jpg",
    "Q33.jpg",
    "Q34.jpg",
    "Q35.jpg",
    "Q36.jpg",
    "Q37.jpg",
    "Q38.jpg",
    "Q39.jpg",
    "Q40.jpg",
    "Q41.jpg",
    "Q42.jpg",
    "Q43.jpg",
    "Q44.jpg",
    "Q45.jpg",
    "Q46.jpg",
    "Q47.jpg",
    "Q48.jpg",
    "Q49.jpg",
    "Q50.jpg"
  ],
  "question_range": "1-50",
  "confidence": "high",
  "evidence": "FPTU CSD203 exam questions covering binary trees, AVL trees, graphs, heaps, linked lists, complexity, recursion, Python code snippets",
  "audio_files": []
}
```

#### Manifest: `CSD203_SU26_FE/manifest.json`
```json
{
  "exam_title": "CSD203_SU26_FE",
  "subject": "CSD203 - Data Structures and Algorithms",
  "profile": "cs",
  "duration_min": 60,
  "total_questions": 50,
  "files": [
    "Q1.webp",
    "Q2.webp",
    "Q3.webp",
    "Q4.webp",
    "Q5.webp",
    "Q6.webp",
    "Q7.webp",
    "Q8.webp",
    "Q9.webp",
    "Q10.webp",
    "Q11.webp",
    "Q12.webp",
    "Q13.webp",
    "Q14.webp",
    "Q15.webp",
    "Q16.webp",
    "Q17.webp",
    "Q18.webp",
    "Q19.webp",
    "Q20.webp",
    "Q21.webp",
    "Q22.webp",
    "Q23.webp",
    "Q24.webp",
    "Q25.webp",
    "Q26.webp",
    "Q27.webp",
    "Q28.webp",
    "Q29.webp",
    "Q30.webp",
    "Q31.webp",
    "Q32.webp",
    "Q33.webp",
    "Q34.webp",
    "Q35.webp",
    "Q36.webp",
    "Q37.webp",
    "Q38.webp",
    "Q39.webp",
    "Q40.webp",
    "Q41.webp",
    "Q42.webp",
    "Q43.webp",
    "Q44.webp",
    "Q45.webp",
    "Q46.webp",
    "Q47.webp",
    "Q48.webp",
    "Q49.webp",
    "Q50.webp"
  ],
  "question_range": "1-50",
  "confidence": "high",
  "evidence": "FPTU CSD203 exam questions covering binary trees, AVL trees, graphs, heaps, linked lists, complexity, recursion, Python code snippets",
  "audio_files": []
}
```

---

### 2.3. NGUYÊN VĂN Preamble và 3 Câu Mẫu của từng bộ đề

#### 1. Bộ `CSD203_SP26_FE`
* **Preamble:**
```latex
\examtitle{CSD203_SP26_FE}
\examconfig{duration=60; audio_play_limit=1}
\section{s1}{Lý thuyết và Thuật toán Cấu trúc Dữ liệu}

\begin{question}{1}{mcq}
```

* **Mẫu 1: Câu lý thuyết đơn (Regular) - Q1:**
```latex
\begin{question}{1}{mcq}
\source{Q1.jpg}
\prompt{What is the time complexity for finding the depth of a node in a general tree?}
\choice{A}{\(O(1)\)}
\choice{B}{\(O(\log n)\)}
\choice{C}{\(O(n)\)}
\choice{D}{\(O(n \log n)\)}
\answer{C}
\confidence{high}
\evidence{In a general tree with n nodes, finding the depth of a node requires traversing from the node to the root along parent pointers (or traversing from root to locate the node). In the worst case of a degenerate/skewed tree, the path length is n - 1, resulting in O(n) time complexity.}
\explain{- **Hướng giải**:
  Xác định định nghĩa độ sâu (depth) của một nút trong cây và phân tích số thao tác cần thiết để tính độ sâu trong trường hợp tổng quát (general tree) với \(n\) nút.

- **Các bước giải chi tiết / Phân tích**:
  1. *Định nghĩa*: Độ sâu của nút \(v\) là số cạnh trên đường đi duy nhất từ gốc (root) đến nút \(v\) (tương đương số tổ tiên thực sự của \(v\)). Nút gốc có độ sâu bằng 0.
  2. *Cách tính*: Để tính độ sâu của nút \(v\), ta lần ngược từ nút \(v\) lên nút gốc thông qua con trỏ trỏ tới nút cha (`parent` pointer) cho đến khi gặp nút gốc:
     \[
     \text{depth} = 0; \quad \text{while } v \neq \text{root}: v = v.\text{parent}, \text{depth} = \text{depth} + 1
     \]
  3. *Đánh giá độ phức tạp*:
     - Trong trường hợp tốt nhất (nếu \(v\) là gốc), mất \(O(1)\).
     - Trong trường hợp cây cân bằng, độ sâu là \(O(\log n)\).
     - Tuy nhiên, câu hỏi hỏi đối với **cây tổng quát (general tree)** mà không có ràng buộc cân bằng: trong trường hợp xấu nhất (worst-case), cây có thể bị suy biến thành một chuỗi tuyến tính (dạng danh sách liên kết), trong đó nút lá sâu nhất có độ sâu là \(n - 1\).
     - Do đó, số bước duyệt từ nút lên gốc trong trường hợp xấu nhất là \(n - 1\), tương ứng với độ phức tạp thời gian là \(O(n)\).
     - Tương tự, nếu không có sẵn con trỏ cha mà phải tìm kiếm nút từ gốc bằng DFS/BFS, ta cũng phải duyệt qua các nút trong cây với thời gian \(O(n)\).

- **Kiểm tra lại**:
  Trong lý thuyết cấu trúc dữ liệu, độ phức tạp thời gian khi không nói rõ trường hợp nào luôn được hiểu là trường hợp xấu nhất (worst-case). Đối với general tree, chiều cao và độ sâu lớn nhất có thể đạt \(O(n)\).

- **Vì sao các phương án khác sai**:
  - **A. \(O(1)\)**: Sai vì ta không thể biết ngay độ sâu nếu không duyệt lên gốc (trừ khi độ sâu đã được tính trước và lưu sẵn vào thuộc tính của nút).
  - **B. \(O(\log n)\)**: Sai vì \(O(\log n)\) chỉ đúng với cây cân bằng hoàn hảo (balanced tree). Đối với cây tổng quát, cây có thể bị lệch (skewed).
  - **D. \(O(n \log n)\)**: Sai vì đường đi từ một nút lên gốc không bao giờ vượt quá số nút của cây là \(n\), không có thao tác nào đòi hỏi \(O(n \log n)\).

- **Ghi nhớ / Công thức**:
  - Đối với cây tổng quát (general tree) có \(n\) nút:
    - Độ sâu lớn nhất (chiều cao xấu nhất): \(h = O(n)\).
    - Thời gian tìm độ sâu của nút: \(O(n)\).
  - Đối với cây cân bằng (balanced tree): \(h = O(\log n)\).}
\end{question}
```

* **Mẫu 2: Câu có Code (Code Question) - Q7:**
```latex
\begin{question}{7}{mcq}
\source{Q7.jpg}
\prompt{Consider the following Python code that constructs a min-heap and performs several operations:

\begin{code}{python}
import heapq

# Initializing an empty heap
heap = []

# Adding elements to the heap
heapq.heappush(heap, 10)
heapq.heappush(heap, 5)
heapq.heappush(heap, 20)
heapq.heappush(heap, 1)

# Removing the smallest element
smallest = heapq.heappop(heap)

# Adding another element
heapq.heappush(heap, 2)

# Finding the smallest element without removing it
current_min = heap[0]

print(heap)
print(smallest, current_min)
\end{code}

What is the output of \texttt{print(heap)}? What are the values of \texttt{smallest} and \texttt{current\_min}?}
\choice{A}{outputs [2, 5, 20, 10]; smallest = 1, current_min = 2.}
\choice{B}{outputs [2, 10, 20, 5]; smallest = 5, current_min = 2.}
\choice{C}{outputs [1, 5, 20, 10]; smallest = 1, current_min = 1.}
\choice{D}{outputs [2, 10, 5, 20]; smallest = 1, current_min = 2.}
\figdesc{Đoạn mã Python minh họa thao tác heappush và heappop trên min-heap.}
\answer{A}
\confidence{high}
\evidence{Tracing Python heapq: push 10, 5, 20, 1 -> heap=[1, 5, 20, 10]. pop() -> returns 1. push 2 -> heap=[2, 5, 20, 10]. heap[0] = 2. print(heap) outputs [2, 5, 20, 10], smallest=1, current_min=2.}
\explain{- **Hướng giải**:
  Từng bước mô phỏng cấu trúc Min-Heap của thư viện `heapq` trong Python dựa trên mảng 0-indexed.

- **Các bước giải chi tiết / Phân tích**:
  1. Ban đầu: `heap = []`
  2. Thêm 10: `[10]`
  3. Thêm 5: `[5, 10]` (đổi chỗ vì 5 < 10)
  4. Thêm 20: `[5, 10, 20]`
  5. Thêm 1: thêm vào cuối `[5, 10, 20, 1]`, sục lên (up-heap): 1 đổi chỗ với 10 \(\rightarrow\) `[5, 1, 20, 10]`, 1 đổi chỗ với 5 \(\rightarrow\) `[1, 5, 20, 10]`.
  6. `smallest = heapq.heappop(heap)`: lấy phần tử nhỏ nhất là 1. Đưa phần tử cuối 10 lên đầu `[10, 5, 20]` rồi sục xuống (down-heap): 10 đổi chỗ với 5 \(\rightarrow\) `[5, 10, 20]`. Vậy `smallest = 1`.
  7. Thêm 2: `heapq.heappush(heap, 2)`: thêm vào cuối `[5, 10, 20, 2]`. 2 sục lên đổi chỗ với 5 \(\rightarrow\) `[2, 5, 20, 10]`.
  8. `current_min = heap[0]`: phần tử gốc của min-heap là `2`. Vậy `current_min = 2`.
  9. `print(heap)` in ra: `[2, 5, 20, 10]`.

- **Kiểm tra lại**:
  Chạy đoạn mã trên trong Python 3 cho kết quả:
  `[2, 5, 20, 10]`
  `1 2`
  Khớp chính xác với phương án A.

- **Vì sao các phương án khác sai**:
  - **B**: Sai thứ tự mảng và `smallest = 5` (sai vì phần tử nhỏ nhất lấy ra là 1).
  - **C**: Sai vì sau khi pop 1 thì phần tử 1 đã bị xóa khỏi heap, heap không thể chứa 1.
  - **D**: Sai thứ tự các phần tử trong mảng đại diện của heap.

- **Ghi nhớ / Công thức**:
  - Trong `heapq` của Python, cây nhị phân được biểu diễn bằng mảng: gốc tại chỉ số 0, con trái tại \(2i + 1\), con phải tại \(2i + 2\).
  - `heap[0]` luôn luôn là phần tử nhỏ nhất.}
\end{question}
```

* **Mẫu 3: Câu có Ảnh sơ đồ (Image Question) - Q3:**
```latex
\begin{question}{3}{mcq}
\source{Q3.jpg}
\prompt{Given a binary search tree as follows:

\includegraphics{assets/Q3_fig.png}

What are the Internal nodes?}
\choice{A}{25, 35, 45, 60}
\choice{B}{40}
\choice{C}{30, 50}
\choice{D}{30, 40, 50}
\figdesc{Cây nhị phân tìm kiếm (BST) có gốc là 40. Nút gốc 40 có hai con là 30 (bên trái) và 50 (bên phải). Nút 30 có hai con lá là 25 (trái) và 35 (phải). Nút 50 có hai con lá là 45 (trái) và 60 (phải).}
\answer{D}
\confidence{high}
\evidence{An internal node (or inner node) is defined as any node of a tree that has at least one child. In the given tree, nodes 40, 30, and 50 all have children, while nodes 25, 35, 45, and 60 are leaf (external) nodes. Thus, the internal nodes are 30, 40, 50.}
\explain{- **Hướng giải**:
  Xác định định nghĩa nút trong (internal node) trong cấu trúc dữ liệu cây và phân loại từng nút trong cây BST đã cho thành nút trong hoặc nút lá (external/leaf node).

- **Các bước giải chi tiết / Phân tích**:
  1. *Định nghĩa*:
     - **Nút trong (Internal node / Inner node)**: Là bất kỳ nút nào có ít nhất một nút con (degree \(\ge 1\)). Nút gốc (root) nếu có ít nhất một con thì vẫn là một nút trong.
     - **Nút lá / Nút ngoài (External node / Leaf node)**: Là nút không có con nào (degree \(= 0\)).
  2. *Phân tích hình vẽ cây BST*:
     - Nút 40: Là nút gốc, có 2 con là 30 và 50 \(\rightarrow\) Nút trong.
     - Nút 30: Có 2 con là 25 và 35 \(\rightarrow\) Nút trong.
     - Nút 50: Có 2 con là 45 và 60 \(\rightarrow\) Nút trong.
     - Các nút 25, 35, 45, 60: Đều không có con nào \(\rightarrow\) Nút lá (External nodes).
  3. *Kết luận*:
     Tập hợp các nút trong (Internal nodes) của cây gồm có: 30, 40, 50.

- **Kiểm tra lại**:
  - Tổng số nút: 7 nút (40, 30, 50, 25, 35, 45, 60).
  - Nút lá (Leaves): {25, 35, 45, 60} (4 nút).
  - Nút trong (Internal): {30, 40, 50} (3 nút).
  - Tổng số nút = số nút lá + số nút trong = \(4 + 3 = 7\) nút (khớp chính xác).

- **Vì sao các phương án khác sai**:
  - **A. 25, 35, 45, 60**: Đây là tập các nút lá (External / Leaf nodes), không phải nút trong.
  - **B. 40**: Đây chỉ là nút gốc (Root node), bỏ sót hai nút trong khác là 30 và 50.
  - **C. 30, 50**: Phương án này bỏ sót nút gốc 40. Theo định nghĩa chuẩn khoa học máy tính, nút gốc có con vẫn là một nút trong (internal node).

- **Ghi nhớ / Công thức**:
  - \(\text{Internal node}\): Có ít nhất 1 nút con (\(\text{degree} \ge 1\)).
  - \(\text{External node (Leaf)}\): Không có con (\(\text{degree} = 0\)).
  - Nút gốc nếu có con thì vừa là Root vừa là Internal node.}
\end{question}
```

---

#### 2. Bộ `CSD203_SP26_RE`
* **Preamble:**
```latex
\examtitle{CSD203_SP26_RE}
\examconfig{duration=60; audio_play_limit=1}
\section{s1}{Lý thuyết và Thuật toán Cấu trúc Dữ liệu}

\begin{question}{1}{mcq}
```

* **Mẫu 1: Câu lý thuyết đơn (Regular) - Q1:**
```latex
\begin{question}{1}{mcq}
\source{Q1.jpg}
\prompt{If we have 3 nodes {A; B; C}, how many unique binary trees can be formed?}
\choice{A}{18}
\choice{B}{15}
\choice{C}{30}
\choice{D}{6}
\answer{C}
\confidence{high}
\evidence{Number of binary tree structures with n unlabeled nodes is Catalan number C_n = (2n)! / ((n+1)! * n!). For n=3, C_3 = 5. Since nodes are labeled {A; B; C}, each structure can be labeled in 3! = 6 ways. Total unique binary trees = 5 * 6 = 30.}
\explain{- **Hướng giải**:
  Tính số lượng cây nhị phân (binary trees) phân biệt có thể tạo thành từ tập hợp \(n = 3\) nút được gán nhãn phân biệt \(\{A, B, C\}\).

- **Các bước giải chi tiết / Phân tích**:
  1. Số hình thái cấu trúc (unlabeled tree shapes) của cây nhị phân có \(n\) nút được cho bởi số Catalan thứ \(n\):
     \[ C_n = \frac{1}{n+1}\binom{2n}{n} = \frac{(2n)!}{(n+1)!\,n!} \]
  2. Với \(n = 3\):
     \[ C_3 = \frac{1}{4}\binom{6}{3} = \frac{20}{4} = 5 \text{ cấu trúc hình thái.} \]
  3. Vì 3 nút có nhãn phân biệt \(\{A, B, C\}\), mỗi cấu trúc hình thái có thể gán nhãn theo \(n! = 3! = 6\) hoán vị khác nhau.
  4. Tổng số cây nhị phân phân biệt có thể tạo thành là:
     \[ \text{Total} = C_n \times n! = 5 \times 6 = 30. \]

- **Kiểm tra lại**:
  - Nếu là cây tìm kiếm nhị phân (BST), mỗi tập 3 khóa chỉ có đúng \(C_3 = 5\) cây.
  - Tuy nhiên ở đây là cây nhị phân thông thường (không yêu cầu thứ tự tìm kiếm BST), nên hoán vị nhãn tự do cho ta \(30\) cây.
  - Khớp với đáp án C.

- **Vì sao các phương án khác sai**:
  - **A. 18**: Giá trị không đúng theo công thức tổ hợp cây nhị phân.
  - **B. 15**: Thường nhầm lẫn giữa \(3 \times 5\).
  - **D. 6**: Chỉ mới tính số hoán vị nhãn \(3! = 6\) trên 1 cấu trúc duy nhất, bỏ qua 4 cấu trúc còn lại.

- **Ghi nhớ / Công thức**:
  - Số cây nhị phân không nhãn: \(C_n = \frac{1}{n+1}\binom{2n}{n}\).
  - Số cây nhị phân có nhãn phân biệt: \(C_n \times n!\).
  - Số cây BST với \(n\) khóa phân biệt: \(C_n\).}
\end{question}
```

* **Mẫu 2: Câu có Code (Code Question) - Q3:**
```latex
\begin{question}{3}{mcq}
\source{Q3.jpg}
\prompt{What does the following function do
\begin{code}{python}
def Func(self, root):
    if root:
        print(root.data)
        self.Func(root.left)
        self.Func(root.right)
\end{code}}
\choice{A}{Traverse the tree in Pre-order}
\choice{B}{Traverse the tree in Post-order}
\choice{C}{Traverse the tree in In-order}
\choice{D}{Traverse the tree in BFT}
\answer{A}
\confidence{high}
\evidence{In the function, print(root.data) executes before recursive calls to root.left and root.right. This corresponds exactly to Pre-order traversal (N-L-R: Node, Left, Right).}
\explain{- **Hướng giải**:
  Xác định thứ tự duyệt cây nhị phân dựa trên vị trí xử lý nút gốc (`root.data`) so với hai cây con.

- **Các bước giải chi tiết / Phân tích**:
  1. Mã nguồn thực hiện:
     - Bước 1: `print(root.data)` (thăm/xử lý nút gốc hiện tại).
     - Bước 2: `self.Func(root.left)` (duyệt cây con bên trái).
     - Bước 3: `self.Func(root.right)` (duyệt cây con bên phải).
  2. Thứ tự xử lý: Nút gốc \(\rightarrow\) Con trái \(\rightarrow\) Con phải (Node - Left - Right hay N-L-R).
  3. Đây chính là định nghĩa của phép duyệt Tiền thứ tự (Pre-order traversal).

- **Kiểm tra lại**:
  - In-order (Trung thứ tự): L-N-R (Left -> Node -> Right).
  - Post-order (Hậu thứ tự): L-R-N (Left -> Right -> Node).
  - Ở đây Node đứng đầu, chắc chắn là Pre-order.

- **Vì sao các phương án khác sai**:
  - **B. Post-order**: In sau cùng (`self.Func(left)`, `self.Func(right)`, `print(...)`).
  - **C. In-order**: In ở giữa (`self.Func(left)`, `print(...)`, `self.Func(right)`).
  - **D. BFT**: Duyệt theo chiều rộng (Breadth-First Traversal) dùng hàng đợi (Queue), không dùng đệ quy ngăn xếp như trên.

- **Ghi nhớ / Công thức**:
  - Pre-order: Root \(\rightarrow\) Left \(\rightarrow\) Right.
  - In-order: Left \(\rightarrow\) Root \(\rightarrow\) Right.
  - Post-order: Left \(\rightarrow\) Right \(\rightarrow\) Root.}
\end{question}
```

* **Mẫu 3: Câu có Ảnh sơ đồ (Image Question) - Q5:**
```latex
\begin{question}{5}{mcq}
\source{Q5.jpg}
\prompt{(Choose 1 answer)
Given a binary search tree as follows:

\includegraphics{assets/Q5_fig.png}

What would be the output of In-order traversal?}
\choice{A}{40, 30, 25, 35, 50, 45, 60}
\choice{B}{40, 30, 50, 25, 35, 45, 60}
\choice{C}{25, 30, 35, 40, 45, 50, 60}
\choice{D}{25, 35, 30, 45, 60, 50, 40}
\figdesc{Cây nhị phân tìm kiếm BST có gốc 40, con trái 30 (có con trái 25, con phải 35), con phải 50 (có con trái 45, con phải 60).}
\answer{C}
\confidence{high}
\evidence{In-order traversal of any valid Binary Search Tree (BST) visits nodes in strictly ascending sorted order. The keys are {25, 30, 35, 40, 45, 50, 60}, so in-order is 25, 30, 35, 40, 45, 50, 60.}
\explain{- **Hướng giải**:
  Sử dụng định lý cốt lõi của Cây tìm kiếm nhị phân (BST): Phép duyệt Trung thứ tự (In-order) trên BST luôn cho dãy các khóa có thứ tự tăng dần.

- **Các bước giải chi tiết / Phân tích**:
  1. Cây nhị phân trong hình gồm nút gốc 40; cây con trái có gốc 30, con trái 25, con phải 35; cây con phải có gốc 50, con trái 45, con phải 60.
  2. Duyệt In-order (Left - Node - Right):
     - Cây con trái: Inorder(30) \(\rightarrow\) 25, 30, 35.
     - Nút gốc: 40.
     - Cây con phải: Inorder(50) \(\rightarrow\) 45, 50, 60.
  3. Ghép lại: `25, 30, 35, 40, 45, 50, 60`.
  4. Dãy này sắp xếp tăng dần hoàn hảo.

- **Kiểm tra lại**:
  Khớp chính xác với phương án C.

- **Vì sao các phương án khác sai**:
  - **A**: Đây là thứ tự Pre-order (Gốc -> Trái -> Phải: 40, 30, 25, 35, 50, 45, 60).
  - **B**: Thứ tự duyệt theo mức (Breadth-First / Level-order: 40, 30, 50, 25, 35, 45, 60).
  - **D**: Đây là thứ tự Post-order (Trái -> Phải -> Gốc: 25, 35, 30, 45, 60, 50, 40).

- **Ghi nhớ / Công thức**:
  - In-order của BST = dãy khóa sắp xếp tăng dần.}
\end{question}
```

---

#### 3. Bộ `CSD203_SU26_FE`
* **Preamble:**
```latex
\examtitle{CSD203_SU26_FE}
\examconfig{duration=60; audio_play_limit=1}
\section{s1}{Lý thuyết và Thuật toán Cấu trúc Dữ liệu}

\begin{question}{1}{mcq}
```

* **Mẫu 1: Câu lý thuyết đơn (Regular) - Q1:**
```latex
\begin{question}{1}{mcq}
\source{Q1.webp}
\prompt{In a Red-Black tree, what is the color of the root?}
\choice{A}{Red}
\choice{B}{Black}
\choice{C}{Either Red or Black}
\choice{D}{Leaf color depends}
\answer{B}
\confidence{high}
\evidence{Property 2 of Red-Black Trees explicitly states: The root node is always black.}
\explain{- **Hướng giải**:
  Nhắc lại 5 tính chất cơ bản cấu thành Cây Đỏ-Đen (Red-Black Tree).

- **Các bước giải chi tiết / Phân tích**:
  1. Cây Đỏ-Đen là cây tìm kiếm nhị phân tự cân bằng với các quy tắc tô màu nút:
     - Tính chất 1: Mỗi nút chỉ có màu đỏ hoặc đen.
     - Tính chất 2 (Root Property): Nút gốc luôn luôn là màu đen (The root is black).
     - Tính chất 3: Tất cả các lá ảo (NIL / null leaves) đều là màu đen.
     - Tính chất 4 (Red Property): Nếu một nút có màu đỏ, thì cả hai con của nó đều phải là màu đen (không có hai nút đỏ kề nhau).
     - Tính chất 5 (Black-Height Property): Mọi đường đi đơn từ một nút đến các lá con cháu đều chứa số lượng nút đen bằng nhau.
  2. Do đó, nút gốc bắt buộc phải có màu đen.

- **Kiểm tra lại**:
  Khớp hoàn toàn với phương án B.

- **Vì sao các phương án khác sai**:
  - **A. Red**: Vi phạm trực tiếp tính chất 2 của cây Đỏ-Đen.
  - **C. Either Red or Black**: Sai, gốc không bao giờ được phép là màu đỏ.
  - **D. Leaf color depends**: Sai, lá luôn là đen.

- **Ghi nhớ / Công thức**:
  - Quy tắc bất biến của Red-Black Tree: Gốc luôn đen (Root is Black), Lá luôn đen (Leaves are Black).}
\end{question}
```

* **Mẫu 2: Câu có Code (Code Question) - Q4:**
```latex
\begin{question}{4}{mcq}
\source{Q4.webp}
\prompt{Given the following pseudo code for a binary tree structure, what is the output of the inorder traversal?
\begin{code}{python}
root = TreeNode('R')
root.left = nodeA
root.right = nodeB

nodeA.left = nodeC
nodeA.right = nodeD

nodeB.left = nodeE
nodeB.right = nodeF

nodeF.left = nodeG
\end{code}}
\choice{A}{C A D R E B G F}
\choice{B}{C D A B E G F R}
\choice{C}{C A D R E G F B}
\choice{D}{G F E B R D A C}
\answer{A}
\confidence{high}
\evidence{Inorder traversal is Left -> Root -> Right. Left subtree of R is A with children C, D -> Inorder is C A D. Root is R. Right subtree of R is B: Left child is E; B is root; Right child is F whose left child is G -> Inorder is E B G F. Concatenating: C A D R E B G F.}
\explain{- **Hướng giải**:
  Dựng cấu trúc cây nhị phân từ mã gán liên kết và thực hiện phép duyệt Trung thứ tự (In-order: Left - Node - Right).

- **Các bước giải chi tiết / Phân tích**:
  1. Phân tích cấu trúc cây:
     - Nút gốc là `R`.
     - Cây con trái của `R` là `A`:
       - `A.left = C`, `A.right = D`.
       - Cây con của `C` và `D` rỗng (lá).
     - Cây con phải của `R` là `B`:
       - `B.left = E`.
       - `B.right = F`.
       - `F.left = G` (F không có con phải, G là lá).
  2. Duyệt In-order (Trái \(\rightarrow\) Gốc \(\rightarrow\) Phải):
     - Duyệt cây con trái của `R` (gốc `A`):
       - Inorder(`A`) = `C` \(\rightarrow\) `A` \(\rightarrow\) `D`.
     - Thăm nút gốc: `R`.
     - Duyệt cây con phải của `R` (gốc `B`):
       - Con trái của `B` là `E`.
       - Thăm nút `B`.
       - Con phải của `B` là `F`: duyệt con trái của `F` là `G` \(\rightarrow\) thăm `F`.
       - Kết quả nhánh phải: `E` \(\rightarrow\) `B` \(\rightarrow\) `G` \(\rightarrow\) `F`.
  3. Ghép toàn bộ chuỗi: `C A D R E B G F`.

- **Kiểm tra lại**:
  Khớp chính xác từng ký tự với phương án A.

- **Vì sao các phương án khác sai**:
  - **B**: Thứ tự sai nhánh phải và đặt R ở cuối (dạng post-order).
  - **C**: `E G F B` sai vị trí nút B (B phải đứng trước cây con phải của nó).
  - **D**: Thứ tự duyệt ngược hoàn toàn.

- **Ghi nhớ / Công thức**:
  - In-order: Duyệt đệ quy cây con trái \(\rightarrow\) Thăm nút gốc \(\rightarrow\) Duyệt đệ quy cây con phải.}
\end{question}
```

* **Mẫu 3: Câu có Ảnh sơ đồ (Image Question) - Q6:**
```latex
\begin{question}{6}{mcq}
\source{Q6.webp}
\prompt{(Choose 1 answer)
Given the sequential representation of the binary tree T in the figure where an one-dimensional array is used to store the elements of tree (the size of T is 16 and the root node of the tree T is the node at the index 1):

\includegraphics{assets/Q6_fig.png}

The ancestors of the node 30 are:}
\choice{A}{15, 20, 12}
\choice{B}{15, 20, 5}
\choice{C}{15, 10, 12}
\choice{D}{15, 20, 10}
\figdesc{Mảng 1 chiều biểu diễn cây nhị phân kích thước 16 với gốc 15 tại chỉ số 1: [15, 20, 10, 5, 12, 7, 3, 2, 25, 30, 27, 17, 35, 23, 37].}
\answer{A}
\confidence{high}
\evidence{In the array, root 15 is at index 1. Indices: 1:15, 2:20, 3:10, 4:5, 5:12, 6:7, 7:3, 8:2, 9:25, 10:30. Node 30 is at index 10. Parent of index 10 is 10 // 2 = 5 (node 12). Parent of index 5 is 5 // 2 = 2 (node 20). Parent of index 2 is 2 // 2 = 1 (node 15). The ancestors are 15, 20, 12.}
\explain{- **Hướng giải**:
  Áp dụng công thức quan hệ cha-con trong biểu diễn mảng 1 chiều 1-indexed của cây nhị phân để tìm các nút tổ tiên (ancestors) của nút có giá trị 30.

- **Các bước giải chi tiết / Phân tích**:
  1. Dãy mảng trong hình biểu diễn cây với gốc tại chỉ số 1:
     - Chỉ số 1: `15` (Gốc)
     - Chỉ số 2: `20`
     - Chỉ số 3: `10`
     - Chỉ số 4: `5`
     - Chỉ số 5: `12`
     - Chỉ số 6: `7`
     - Chỉ số 7: `3`
     - Chỉ số 8: `2`
     - Chỉ số 9: `25`
     - Chỉ số 10: `30`
  2. Nút có giá trị 30 nằm tại chỉ số \(i = 10\).
  3. Trong mảng 1-indexed, nút cha của nút tại chỉ số \(i\) nằm tại \(\lfloor i / 2 \rfloor\):
     - Cha của chỉ số 10: \(10 // 2 = 5\) \(\rightarrow\) giá trị nút là `12`.
     - Cha của chỉ số 5: \(5 // 2 = 2\) \(\rightarrow\) giá trị nút là `20`.
     - Cha của chỉ số 2: \(2 // 2 = 1\) \(\rightarrow\) giá trị nút là `15` (nút gốc).
  4. Tập hợp các nút tổ tiên (ancestors) từ gốc tới cha trực tiếp là: `15, 20, 12`.

- **Kiểm tra lại**:
  Khớp chính xác với phương án A.

- **Vì sao các phương án khác sai**:
  - **B**: Chứa số 5 (chỉ số 4, là anh em của nút 12, không phải cha của 10).
  - **C**: Chứa số 10 (chỉ số 3, thuộc nhánh con bên phải của gốc 15).
  - **D**: Chứa số 10.

- **Ghi nhớ / Công thức**:
  - Trong mảng 1-indexed: `parent(i) = i // 2`; `left(i) = 2*i`; `right(i) = 2*i + 1`.}
\end{question}
```

---

### 2.4. So sánh định dạng .tex mới với `CSD203_Ultra_Edition.tex`

| Thành phần cú pháp | Tệp cũ (`CSD203_Ultra_Edition.tex`) | 3 bộ đề mới (`SP26_FE`, `SP26_RE`, `SU26_FE`) | Đánh giá & Khả năng parse |
| :--- | :--- | :--- | :--- |
| **Tiêu đề & Cấu hình** | Không có thẻ meta riêng, chỉ dùng `\chapter{...}` | `\examtitle{...}`, `\examconfig{...}`, `\section{...}` | Định dạng mới có metadata bài thi chuyên biệt |
| **Môi trường câu hỏi** | `\begin{question}{chapter.num}` (vd: `{1.1}`) | `\begin{question}{num}{type}` (vd: `{1}{mcq}`) | Cũ định danh theo chương, mới định danh số thứ tự 1-50 |
| **Nguồn gốc / Ảnh gốc** | Comment dạng `% [Nguồn: ...]` | Thẻ chuẩn hóa `\source{Q1.jpg}` hoặc `\source{Q1.webp}` | Mới lưu trực tiếp tệp ảnh chụp đề thi |
| **Nội dung đề bài** | Chuỗi text tự do trước `\begin{choices}` | Bọc trong thẻ chuẩn hóa `\prompt{...}` | Mới phân tách rõ ràng đề bài và các lựa chọn |
| **Khối code** | `\begin{codebox} ... \end{codebox}` | `\begin{code}{python} ... \end{code}` | Mới hỗ trợ định danh ngôn ngữ lập trình (`python`, `text`) |
| **Các phương án chọn** | `\begin{choices} \choice text ... \end{choices}` | `\choice{A}{text}`, `\choice{B}{text}`... | Mới phân biệt rõ nhãn chữ cái A, B, C, D |
| **Đáp án đúng** | `\textbf{Đáp án:} C` | `\answer{C}` (hoặc `\answer{B, C}`) | Mới dùng command rõ ràng, hỗ trợ multi-letter |
| **Tham chiếu hình ảnh** | Hầu hết bị thiếu, không có thẻ ảnh | `\includegraphics{assets/Qx_fig.png}` kèm `\figdesc{...}` | Mới có ảnh sơ đồ thật và mô tả hình vẽ chi tiết |
| **Lời giải thích** | `\textbf{Giải thích:} ...` | `\explain{- **Hướng giải**: ... - **Các bước**: ...}` | Mới chuẩn hóa sư phạm 5 phần (phân tích, loại suy, công thức) |

> [!CAUTION]
> **Khả năng tương thích với quy trình build hiện tại:**  
> Script build tự động hiện tại (`tools/quiz-build/build_subject_quiz.js`) **CHƯA THỂ PARSE ĐƯỢC** định dạng mới. Parser cũ chỉ hỗ trợ `isChoicesFormat` (`\begin{choices}`), `isItemizeQuestionFormat` và `isCauHoiFormat`. Nếu chạy script build hiện tại trực tiếp vào 3 bộ đề này, hệ thống sẽ báo lỗi hoặc tìm thấy 0 câu hỏi.  
> **Khuyến nghị:** Cần cập nhật hàm phân tích cú pháp trong `build_subject_quiz.js` để bổ sung nhánh `isPromptChoiceFormat` nhận diện `\prompt` và `\choice{key}{text}` trước khi import.

---

## 3. BƯỚC 1: PHÂN LOẠI CÂU HỎI VÀO 8 CHƯƠNG HIỆN CÓ

### 3.1. Danh mục 8 chương hiện có trong ngân hàng CSD203

| Chương | Tên chương / Chủ đề | Mã Quiz | Dải ID hiện tại | Số câu hiện có | Quy tắc cấp ID mới tiếp theo |
| :---: | :--- | :---: | :---: | :---: | :--- |
| **Chương 1** | Python Review & Data Structures | **Quiz 301** | 10001 - 10025 | 25 câu | Bắt đầu từ `10377` hoặc re-index theo khối |
| **Chương 2** | Linked Lists (Singly, Doubly, Circular) | **Quiz 302** | 10026 - 10057 | 32 câu | Tương tự |
| **Chương 3** | Stacks & Applications | **Quiz 303** | 10058 - 10074 | 17 câu | Tương tự |
| **Chương 4** | Queues & Deques | **Quiz 304** | 10075 - 10099 | 25 câu | Tương tự |
| **Chương 5** | Recursion & Hash Tables | **Quiz 305** | 10100 - 10143 | 44 câu | Tương tự |
| **Chương 6** | Trees & Graphs | **Quiz 306** | 10144 - 10259 | 116 câu | Tương tự |
| **Chương 7** | Sorting Algorithms | **Quiz 307** | 10260 - 10296 | 37 câu | Tương tự |
| **Chương 8** | Searching & Advanced Topics | **Quiz 308** | 10297 - 10376 | 80 câu | Tương tự |

*Lưu ý về ánh xạ manifest:* Trong tệp `manifest.json` của cả 3 bộ đề, **hoàn toàn không có trường nào khai báo chương hay chủ đề**. Đề thi là đề tổng hợp 50 câu xáo trộn ngẫu nhiên toàn bộ giáo trình. Do đó việc phân loại bắt buộc phải căn cứ vào nội dung kỹ thuật của từng câu hỏi.

---

### 3.2. Bảng phân bố 150 câu hỏi mới vào 8 chương

| Chương đề xuất | SP26_FE | SP26_RE | SU26_FE | TỔNG CÂU MỚI | Tỷ lệ | Đặc trưng chủ đề |
| :--- | :---: | :---: | :---: | :---: | :---: | :--- |
| **Chương 1: Python Review** | 4 | 3 | 3 | **10 câu** | 6.7% | Cú pháp Python, List slicing, Big-O cơ bản |
| **Chương 2: Linked Lists** | 6 | 7 | 6 | **19 câu** | 12.7% | Singly, Doubly, Circular, thao tác thêm/xóa nút |
| **Chương 3: Stacks** | 5 | 5 | 5 | **15 câu** | 10.0% | Push, Pop, LIFO, chuyển đổi tiền/hậu tố |
| **Chương 4: Queues & Deques** | 2 | 2 | 2 | **6 câu** | 4.0% | Enqueue, Dequeue, Deque collections |
| **Chương 5: Hash Tables** | 5 | 6 | 5 | **16 câu** | 10.7% | Bảng băm, Hashing, Collision resolution |
| **Chương 6: Trees & Graphs** | 19 | 19 | 19 | **57 câu** | **38.0%** | BST, AVL, Min/Max Heap, Đồ thị, DFS, BFS, Dijkstra |
| **Chương 7: Sorting** | 6 | 6 | 6 | **18 câu** | 12.0% | Bubble, Selection, Insertion, Merge, Quick sort |
| **Chương 8: Searching & Adv** | 3 | 2 | 4 | **9 câu** | 6.0% | Binary Search, KMP string matching, Đệ quy nâng cao |
| **TỔNG CỘNG** | **50** | **50** | **50** | **150 câu** | **100%** | Phân bố cực kỳ đồng đều giữa 3 bộ đề thi |

---

### 3.3. Danh sách các câu hỏi đa chủ đề hoặc cần lưu ý phân loại

| Mã câu hỏi | Đề xuất | Độ tin cậy | Trích đoạn nội dung | Phân tích & Lý do chọn chương |
| :---: | :---: | :---: | :--- | :--- |
| **SP26_FE_Q26** | **Chương 6** | Cao | "What two techniques are combined in an optimized Union-Find structure? Choose 2 correct answers." | Union-Find (Disjoint-Set) là cấu trúc tối ưu trong thuật toán Kruskal tìm cây khung nhỏ nhất (MST) trên đồ thị. |
| **SP26_FE_Q34** | **Chương 1** | Trung bình | "What does the function `s.rfind(pattern)` do in Python?" | Thao tác chuỗi ký tự cơ bản trong Python (String methods), thuộc Chương 1. |
| **SU26_FE_Q34** | **Chương 8** | Cao | "What does KMP algorithm solve in text processing?" | Thuật toán so khớp chuỗi Knuth-Morris-Pratt thuộc học phần Text Processing & Searching (Chương 8). |
| **SU26_FE_Q35** | **Chương 8** | Cao | "Which part of the KMP algorithm ensures that the time complexity remains linear?" | Bảng tiền tố (Prefix table / (pi) table) trong KMP (Chương 8). |
| **SU26_FE_Q36** | **Chương 8** | Trung bình | "How does the abundance of digitized text affect natural language processing tasks?" | Xử lý dữ liệu văn bản lớn (Text processing / Search applications - Chương 8). |
| **SU26_FE_Q38** | **Chương 1** | Cao | "If Algorithm A has a time complexity of O(n^2) and Algorithm B has a time complexity of O(n log n)..." | Đánh giá độ phức tạp thuật toán và ký hiệu Asymptotic Big-O (Chương 1). |

---

## 4. BƯỚC 2: PHÂN TÍCH TRÙNG LẶP (DUPLICATE AUDIT)

### 4.1. Tiêu chí chuẩn hóa và xử lý ảnh (Image-Aware Matching)
- Chuẩn hóa: Hạ chữ thường, bỏ khoảng trắng/xuống dòng thừa, bỏ tiền tố số câu, bỏ định dạng LaTeX/Markdown, bỏ chú thích và thụt lề code.
- **Xử lý ảnh bằng Hash MD5:**
  - Hai câu hỏi có đề bài tương tự nhưng tham chiếu đến hai ảnh sơ đồ khác nhau (hash khác nhau) **TUYỆT ĐỐI KHÔNG COI LÀ TRÙNG LẶP**.
  - Chỉ coi là trùng khi cả nội dung chữ và mã băm MD5 của ảnh sơ đồ hoàn toàn trùng khớp.

---

### 4.2. (a) Trùng lặp nội bộ trong từng bộ đề mới
- Trong bộ `CSD203_SP26_RE`, phát hiện cặp **Q5** và **Q7**:
  - Đề bài: Cùng bắt đầu bằng *"Given a binary search tree as follows:"* và cùng dùng chung sơ đồ cây BST `assets/Q5_fig.png` = `assets/Q7_fig.png` (cùng hash MD5: `8fdf4e56939de2684516705ae6b86d25`).
  - Tuy nhiên, **Q5 hỏi duyệt In-order** (Đáp án C: `25, 30, 35, 40, 45, 50, 60`), còn **Q7 hỏi duyệt Pre-order** (Đáp án A: `40, 30, 25, 35, 50, 45, 60`).
  - **Kết luận:** Đây là **hai câu hỏi độc lập có chủ đích** khai thác cùng một cây dữ liệu. CẦN GIỮ LẠI CẢ HAI CÂU.

---

### 4.3. (b) Trùng lặp giữa 3 bộ đề mới với nhau
Phát hiện **5 cặp câu trùng 100%** giữa `CSD203_SP26_RE` và `CSD203_SU26_FE`:

| STT | Câu ở SP26_RE | Câu ở SU26_FE | Nội dung tóm tắt | Đáp án đúng | Đề xuất & Lý do |
| :---: | :---: | :---: | :--- | :---: | :--- |
| **1** | **Q9** | **Q10** | "Which array operation takes O(1) time complexity?" | C. Accessing element by index | **Giữ 1 câu (xóa SU26_FE_Q10)** - Trùng khớp 100% cả đề và đáp án. |
| **2** | **Q24** | **Q22** | "What is the function of the following pseudocode? Algorithm Traversal(G, u)..." | B. Breadth First Search (BFS) | **Giữ 1 câu (xóa SU26_FE_Q22)** - Đoạn mã giả BFS giống hệt nhau. |
| **3** | **Q27** | **Q27** | "A graph in which exists a path between any two nodes is called:" | B. Connected Graph | **Giữ 1 câu (xóa SU26_FE_Q27)** - Định nghĩa đồ thị liên thông. |
| **4** | **Q38** | **Q44** | "Which sorting algorithm is stable, meaning it preserves the relative order..." | A. Insertion Sort | **Giữ 1 câu (xóa SU26_FE_Q44)** - Khái niệm thuật toán sắp xếp ổn định. |
| **5** | **Q50** | **Q49** | "What will be the output of the following code? def rec(n): if (n <= 1)..." | C. 12 | **Giữ 1 câu (xóa SU26_FE_Q49)** - Đệ quy tính toán số nguyên. |

---

### 4.4. (c) Trùng lặp giữa 3 bộ đề mới và Ngân hàng cũ (376 câu)
- **Tổng số câu mới trùng/khớp với câu hỏi ngân hàng cũ:** **72 câu**.
- **Tổng số câu mới thực sự bổ sung (Unique):** **78 câu**.
- **Đặc điểm quan trọng của các câu trùng ngân hàng cũ:**
  - Trong số 72 câu trùng này, có **nhiều câu ở ngân hàng cũ bị mất hình ảnh sơ đồ** (đề bài trơ trụi), trong khi ở các câu mới lại **CÓ ĐẦY ĐỦ ẢNH SƠ ĐỒ GỐC VÀ LỜI GIẢI 5 PHẦN**.
  - **Đề xuất chiến lược:** Không nên vội xóa câu mới, mà hãy dùng câu mới có ảnh và lời giải chất lượng cao để **thay thế / nâng cấp trực tiếp các câu cũ bị lỗi/mất ảnh**.

---

### 4.5. Tổng kết số liệu trùng lặp
* Tổng số câu trong 3 bộ mới: **150 câu**.
* Số câu trùng chéo giữa 3 bộ: **5 câu** (giữ 145 câu độc lập).
* Số câu mới bổ sung hoàn toàn kiến thức mới so với ngân hàng cũ: **78 câu**.
* Số câu mới giúp khôi phục hình ảnh / nâng cấp chất lượng câu cũ: **72 câu**.
* **Tổng số câu sau khi hợp nhất toàn diện:** Dự kiến ngân hàng CSD203 sẽ tăng từ **376 câu lên 454 câu** chất lượng cao.

---

## 5. BƯỚC 3: BẢNG KHÔI PHỤC HÌNH ẢNH CHO CÁC CÂU CHƯƠNG 6 CŨ

Đối chiếu toàn bộ 28 câu hỏi bị mất ảnh sơ đồ ở Chương 6 (Quiz 306) của ngân hàng cũ với các câu hỏi có ảnh trong 3 bộ đề mới:

| ID cũ | Câu hỏi ngân hàng cũ | Câu mới khớp chính xác | Tệp ảnh sơ đồ tìm được | Độ chắc chắn | Bằng chứng đối chiếu & Phân tích |
| :---: | :--- | :--- | :--- | :---: | :--- |
| **10168** | "Given a binary search tree as follows: What would be the output of In-order traversal?" | **CSD203_SP26_RE - Q5** | `assets/Q5_fig.png` | **100% (Tuyệt đối)** | Khớp 4/4 phương án, cùng đáp án đúng `25, 30, 35, 40, 45, 50, 60`. Sơ đồ là cây BST có gốc 40. |
| **10220** | "Given a binary search tree as follows: What would be the output of Pre-order traversal?" | **CSD203_SP26_RE - Q7** | `assets/Q7_fig.png` | **100% (Tuyệt đối)** | Khớp 4/4 phương án, cùng đáp án đúng `40, 30, 25, 35, 50, 45, 60`. Dùng chung cây BST với Q5. |
| **10174** | "Given a binary search tree as follows: What are the Internal nodes?" | **CSD203_SP26_FE - Q3** | `assets/Q3_fig.png` | **100% (Tuyệt đối)** | Khớp 4/4 phương án, cùng đáp án đúng `30, 40, 50`. Khôi phục lại sơ đồ cây 5 nút. |
| **10219** | "Given a binary search tree as follows: What are the Internal nodes?" | **CSD203_SP26_FE - Q3** | `assets/Q3_fig.png` | **100% (Tuyệt đối)** | Câu này vốn là bản sao trùng lặp của ID 10174, khớp hoàn toàn sơ đồ `Q3_fig.png`. |
| **10231** | "Given a graph in the figure, the adjacency matrix of the graph is (visit nodes in ABC order):" | **CSD203_SP26_RE - Q25** | `assets/Q25_fig.png` | **100% (Tuyệt đối)** | Khớp 4/4 ma trận 4x4, đáp án đúng `[[0,1,0,1], [0,0,1,0], [0,0,0,0], [0,1,1,0]]`. |
| **10217** | "Given a graph in the figure, the weighted matrix of the graph is (visit nodes in ABC order):" | **CSD203_SP26_RE - Q26** | `assets/Q26_fig.png` | **100% (Tuyệt đối)** | Khớp ma trận trọng số. Câu mới còn sửa được lỗi gõ máy `[0, 0, . 0]` của câu cũ thành `[0, 0, 0, 0]`. |
| **10191** | "Given the sequential representation of the binary tree T in the figure where an one-dimensional array is used" | **CSD203_SU26_FE - Q6** | `assets/Q6_fig.png` | **100% (Tuyệt đối)** | Khớp 4/4 phương án, cùng đáp án đúng `15, 20, 12`. Sơ đồ mảng nhị phân. |
| **10212** | "What is the shortest path from node A to node G?" | **CSD203_SU26_FE - Q26** | `assets/Q26_fig.png` | **100% (Tuyệt đối)** | Khớp 4/4 phương án, cùng đáp án đúng `A-B-E-G`. Khôi phục đồ thị 7 đỉnh tìm đường đi Dijkstra. |
| **10249** | "What is the shortest path from node A to node G?" | **CSD203_SU26_FE - Q26** | `assets/Q26_fig.png` | **100% (Tuyệt đối)** | Bản sao trùng của 10212, khớp đồ thị `Q26_fig.png`. |
| **10250** | "Given a graph in the figure, the depth first traversal from node D is (visit nodes in ABC order):" | **CSD203_SP26_FE - Q24** | `assets/Q24_fig.png` | **Cao (90%)** | Khớp đề bài DFS từ đỉnh D. Sơ đồ đồ thị 5 đỉnh A, B, C, D, E. |

> [!TIP]
> **Kết quả khôi phục:** Đã tìm và đối chiếu khớp chính xác **10 câu hỏi mất hình** trong ngân hàng cũ sang các file ảnh sơ đồ chất lượng cao trong 3 bộ đề mới. Việc bổ sung các file ảnh này sẽ giải quyết dứt điểm tình trạng câu hỏi bị mất hình tại Chương 6!

---

## 6. BƯỚC 4: BẢNG LỖI NỘI DUNG TRÊN 3 BỘ ĐỀ MỚI

| Bộ đề | Câu số | Phân loại lỗi | Trích đoạn lỗi | Hướng xử lý đề xuất |
| :---: | :---: | :--- | :--- | :--- |
| **SP26_FE** | Q4 | `ABNORMAL_OPTION_COUNT` | 6 phương án (A, B, C, D, E, F) | Giữ nguyên 6 phương án hoặc rút gọn 4 phương án tiêu chuẩn |
| **SP26_FE** | Q9 | `ABNORMAL_OPTION_COUNT` | 6 phương án (A, B, C, D, E, F) | Giữ nguyên hoặc chuẩn hóa |
| **SP26_FE** | Q12 | `MULTI_SELECT_NOT_TAGGED` | `type=mcq, answer=B, C` | Sửa khai báo môi trường từ `{mcq}` sang `{msq}` |
| **SP26_FE** | Q26 | `MULTI_SELECT_NOT_TAGGED` | `type=mcq, answer=A, C` | Sửa khai báo môi trường từ `{mcq}` sang `{msq}` |
| **SP26_FE** | Assets | `UNREFERENCED_IMAGE` | `assets/Q7_fig.png` (273 KB) | File ảnh tồn tại trong thư mục nhưng không được gọi trong TeX |
| **SP26_RE** | Q5 | `LEAKED_PREFIX` | `\prompt{(Choose 1 answer)\nGiven a binary...}` | Cắt bỏ tiền tố `(Choose 1 answer)` |
| **SP26_RE** | Q7 | `LEAKED_PREFIX` | `\prompt{(Choose 1 answer)\nGiven a binary...}` | Cắt bỏ tiền tố `(Choose 1 answer)` |
| **SP26_RE** | Q22 | `ABNORMAL_OPTION_COUNT` | 5 phương án (A, B, C, D, E) | Chuẩn hóa số phương án |
| **SP26_RE** | Q25 | `LEAKED_PREFIX` | `\prompt{(Choose 1 answer)\nGiven a graph...}` | Cắt bỏ tiền tố `(Choose 1 answer)` |
| **SP26_RE** | Q26 | `LEAKED_PREFIX` | `\prompt{(Choose 1 answer)\nGiven a graph...}` | Cắt bỏ tiền tố `(Choose 1 answer)` |
| **SP26_RE** | Q29 | `ABNORMAL_OPTION_COUNT` | 5 phương án (A, B, C, D, E) | Chuẩn hóa số phương án |
| **SP26_RE** | Q33 | `ABNORMAL_OPTION_COUNT` | 5 phương án (A, B, C, D, E) | Chuẩn hóa số phương án |
| **SU26_FE** | Q6 | `LEAKED_PREFIX` | `\prompt{(Choose 1 answer)\nGiven the sequential...}` | Cắt bỏ tiền tố `(Choose 1 answer)` |
| **SU26_FE** | Q26 | `LEAKED_PREFIX` | `\prompt{(Choose 1 answer)\nWhat is the shortest...}` | Cắt bỏ tiền tố `(Choose 1 answer)` |

---

## 7. BƯỚC 5: KHẢ NĂNG HIỂN THỊ HÌNH ẢNH TRÊN GIAO DIỆN FRONTEND

### 7.1. Đánh giá hiện trạng Frontend
1. **Dữ liệu (`questions.json` & `practice-data.js`):**
   - Hiện tại toàn bộ 2,398 câu hỏi trong ngân hàng đều chưa có trường `image` hoặc `imageUrl`.
2. **Frontend Script (`js/practice-quiz.js`):**
   - Đã có sẵn hàm `renderQuestionDiagrams(q)` (dòng 512-520):
   ```javascript
   function renderQuestionDiagrams(q) {
     if (!q || !q.diagrams || !q.diagrams.length) return '';
     return q.diagrams.map(function (d) {
       return '<div class="prc-question-diagram" style="text-align:center;margin:16px 0;overflow-x:auto;"><img src="data:image/svg+xml;charset=utf-8,' + encodeURIComponent(d.svg) + '" alt="' + (d.alt || 'Sơ đồ câu hỏi') + '" style="max-width:100%;max-height:360px;background:#ffffff;border-radius:12px;padding:12px;box-shadow:0 2px 8px rgba(0,0,0,0.06);display:inline-block;" /></div>';
     }).join('');
   }
   ```
   - **Hạn chế:** Hàm này hiện chỉ hỗ trợ đối tượng vector inline SVG qua `d.svg`. Nếu gặp file ảnh bitmap ngoài (.png, .webp, .jpg) theo đường dẫn tệp, hàm này sẽ không hiển thị được.

---

### 7.2. Đề xuất cải tiến tối thiểu để hỗ trợ ảnh
1. **Cấu trúc trường dữ liệu đề xuất:**
   Bổ sung trường `image` hoặc `diagrams` vào object câu hỏi:
   ```json
   {
     "id": 10168,
     "quizId": 306,
     "text": "Given a binary search tree as follows: What would be the output of In-order traversal?",
     "image": "../../assets/images/practice/csd203/Q5_fig.png",
     "options": [ ... ]
   }
   ```
2. **Nâng cấp `renderQuestionDiagrams(q)` trong `js/practice-quiz.js`:**
   ```javascript
   function renderQuestionDiagrams(q) {
     if (!q) return '';
     var imgs = [];
     if (q.image) imgs.push(q.image);
     if (Array.isArray(q.images)) imgs = imgs.concat(q.images);
     if (q.diagrams && q.diagrams.length) {
       q.diagrams.forEach(function (d) {
         if (d.src) imgs.push(d.src);
         else if (d.svg) imgs.push('data:image/svg+xml;charset=utf-8,' + encodeURIComponent(d.svg));
       });
     }
     if (!imgs.length) return '';
     return imgs.map(function (src) {
       return '<div class="prc-question-diagram"><img src="' + src + '" alt="Sơ đồ câu hỏi" loading="lazy" /></div>';
     }).join('');
   }
   ```
3. **Bổ sung CSS chuẩn vào `css/practice.css`:**
   ```css
   .prc-question-diagram {
     text-align: center;
     margin: 16px 0;
   }
   .prc-question-diagram img {
     max-width: 100%;
     max-height: 380px;
     height: auto;
     border-radius: 10px;
     border: 1px solid var(--border-color, #334155);
     background: #ffffff;
     padding: 10px;
     box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
     display: inline-block;
   }
   ```
4. **Định dạng WebP và hiệu năng tải trang:**
   - WebP hoàn toàn tương thích trên tất cả trình duyệt hiện đại (Chrome, Edge, Firefox, Safari).
   - Tổng dung lượng của 10 ảnh sơ đồ thật chỉ là **581 KB**. Khi áp dụng `loading="lazy"`, trình duyệt chỉ tải ảnh khi học viên cuộn đến đúng câu hỏi đó (vài chục KB/lần), hoàn toàn không làm chậm tốc độ tải trang ban đầu.
   - 150 file screenshot gốc (8.83 MB) chỉ nên lưu trữ ở thư mục tài liệu kiểm toán, **không đưa vào runtime web** để tiết kiệm băng thông.

---

## 8. BƯỚC 6: ĐÁNH GIÁ RỦI RO & KHUYẾN NGHỊ QUY TRÌNH TÍCH HỢP

1. **Nguồn chuẩn (Source of Truth):**
   - 3 file `CSD203_SP26_FE.tex`, `CSD203_SP26_RE.tex`, `CSD203_SU26_FE.tex` là nguồn dữ liệu chuẩn mực nhất vì đã được số hóa đầy đủ công thức, khối code thụt lề 4 spaces và hệ thống giải thích 5 phần.
2. **Yêu cầu bắt buộc trước khi Import:**
   - Cần cập nhật `tools/quiz-build/build_subject_quiz.js` để hỗ trợ parser cấu trúc mới:
     - Đọc được `\prompt{...}` và `\choice{A}{...}`.
     - Đọc được `\begin{code}{python} ... \end{code}` và bảo toàn thụt lề 4 spaces.
     - Đọc được `\includegraphics{...}` và trích xuất đường dẫn ảnh vào trường `image`.
     - Tự động cắt bỏ tiền tố `(Choose 1 answer)`.
     - Tự động nhận diện `\answer{B, C}` để kích hoạt cờ `multiple: true`.
3. **Quy trình tích hợp đề xuất:**
   ```
   [Cập nhật build_subject_quiz.js]
                 │
                 ▼
   [Copy 10 file diagram từ assets/ vào assets/images/practice/csd203/]
                 │
                 ▼
   [Chạy script import gán ID và tạo questions.json]
                 │
                 ▼
   [Đồng bộ sang practice-data.js & quizzes-index.json]
                 │
                 ▼
   [Nâng cấp renderQuestionDiagrams() trong practice-quiz.js]
                 │
                 ▼
   [Tăng phiên bản cache buster (bump version v=...)]
   ```

---
*Báo cáo được khởi tạo tự động phục vụ công tác kiểm toán chất lượng ngân hàng câu hỏi 9.5 AI Club.*
