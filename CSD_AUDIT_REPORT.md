# BÁO CÁO TOÀN DIỆN KIỂM TRA (AUDIT) BỘ ĐỀ CSD203
**Môn học:** Data Structures and Algorithms (Cấu trúc dữ liệu & Giải thuật - CSD203)  
**Thời gian thực hiện:** 18/11/2026  
**Trạng thái kiểm toán:** HOÀN THÀNH (Tuyệt đối KHÔNG sửa đổi bất kỳ tệp dữ liệu nào)

---

## 1. TỔNG QUAN HỆ THỐNG VÀ PHÂN BỐ CÂU HỎI

### 1.1. Thống kê 5 tầng dữ liệu môn CSD203
Khảo sát toàn bộ 5 tầng lưu trữ dữ liệu của môn học CSD203 cho thấy sự đồng nhất tuyệt đối về số lượng câu hỏi giữa các tầng dữ liệu:

| Tầng | Tên tầng | Đường dẫn tệp | Số lượng câu hỏi | Trạng thái đồng bộ |
| :--- | :--- | :--- | :---: | :--- |
| **Tầng 1** | Tệp gốc LaTeX | `document/Practice/Ky_II/CSD203/CSD203_Ultra_Edition.tex` | **376 câu** | Khớp hoàn toàn (8 Chapter) |
| **Tầng 2** | Dữ liệu cấu trúc JSON | `document/Practice/Ky_II/CSD203/questions.json` | **376 câu** | Khớp hoàn toàn (`totalQuestions: 376`) |
| **Tầng 3** | Runtime Frontend JS | `js/practice-data.js` | **376 câu** | Khớp hoàn toàn (Subject ID: 4, IDs `10001` - `10376`) |
| **Tầng 4** | Chỉ mục Quizzes Index | `backend/data/quizzes-index.json` & `assets/data/quizzes-index.json` | **376 câu** | Khớp hoàn toàn (8 quizzes: 301 - 308) |
| **Tầng 5** | Cache Buster | Khai báo trong 8 tệp HTML tại `pages/practice/*.html`, `favorites.html`, `history.html` | **v=20261117v26** | Đồng bộ toàn bộ giao diện |

> [!NOTE]
> **Kết luận khảo sát tầng:** Số lượng câu hỏi ở cả 4 tầng dữ liệu hoàn toàn khớp nhau (**376/376 câu**), không có hiện tượng lệch chỉ mục câu hỏi giữa các tầng.

---

### 1.2. Phân bố câu hỏi và đặc trưng mã nguồn theo từng chương

| Mã Quiz | Tên Chương / Chủ đề | Số câu hỏi | Số câu chứa Code | Số câu mất hình (Missing Figures) | Số câu Multi-select |
| :---: | :--- | :---: | :---: | :---: | :---: |
| **Quiz 301** | Chương 1: Python Review & Data Structures | 25 | 22 | 0 | 0 |
| **Quiz 302** | Chương 2: Linked Lists (Singly, Doubly, Circular) | 32 | 14 | 0 | 0 |
| **Quiz 303** | Chương 3: Stacks & Applications | 17 | 6 | 0 | 1 (ID 10072) |
| **Quiz 304** | Chương 4: Queues & Deques | 25 | 4 | 0 | 0 |
| **Quiz 305** | Chương 5: Recursion & Hash Tables | 44 | 4 | 0 | 0 |
| **Quiz 306** | Chương 6: Trees & Graphs | 116 | 6 | **30** | 1 (ID 10255) |
| **Quiz 307** | Chương 7: Sorting Algorithms | 37 | 0 | 0 | 0 |
| **Quiz 308** | Chương 8: Searching & Advanced Recursion | 80 | 12 | 0 | 0 |
| **TỔNG CỘNG** | **Toàn bộ 8 chương CSD203** | **376** | **68** | **30** | **2** |

---

## 2. BƯỚC 0: KHẢO SÁT CẤU TRÚC & NGUYÊN VĂN CÁC CÂU MẪU

### 2.1. Bản sao NGUYÊN VĂN (Copy thô, không diễn giải) 3 câu mẫu qua các tầng dữ liệu

#### Mẫu 1: Câu lý thuyết đơn (Regular Single-choice) - ID 10122 (Chương 5)
* **Tầng 1: LaTeX (.tex)**
```latex
\begin{question}{5.32}
% [ID gốc: 3.32]
% [Nguồn: Ngân hàng CSD203 (Câu #235)]
What is the load factor in the context of hash tables?
\begin{choices}
\choice The ratio of the number of elements to the total available slots.
\choice The average number of probes required for each search.
\choice The number of collisions that have occurred.
\choice The number of slots available for new elements.
\end{choices}
\textbf{Đáp án:} A
\textbf{Giải thích:} Hệ số tải (Load factor $\alpha$) trong bảng băm là tỷ số giữa số lượng phần tử hiện có trong bảng và tổng số ô chứa có sẵn ($\alpha = n/m$).
\end{question}
```

* **Tầng 2: Cấu trúc JSON (questions.json)**
```json
{
  "id": 10122,
  "quizId": 305,
  "text": "What is the load factor in the context of hash tables?",
  "options": [
    "The ratio of the number of elements to the total available slots.",
    "The average number of probes required for each search.",
    "The number of collisions that have occurred.",
    "The number of slots available for new elements."
  ],
  "correctIndex": 0,
  "explanation": "Hệ số tải (Load factor \\(\\alpha\\)) trong bảng băm là tỷ số giữa số lượng phần tử hiện có trong bảng và tổng số ô chứa có sẵn (\\(\\alpha = n/m\\))."
}
```

* **Tầng 3: Runtime JS (practice-data.js)**
```javascript
{
  "id": 10122,
  "quizId": 305,
  "text": "What is the load factor in the context of hash tables?",
  "options": [
    "The ratio of the number of elements to the total available slots.",
    "The average number of probes required for each search.",
    "The number of collisions that have occurred.",
    "The number of slots available for new elements."
  ],
  "correctIndex": 0,
  "explanation": "Hệ số tải (Load factor \\(\\alpha\\)) trong bảng băm là tỷ số giữa số lượng phần tử hiện có trong bảng và tổng số ô chứa có sẵn (\\(\\alpha = n/m\\))."
}
```

---

#### Mẫu 2: Câu có khối Code (Code Question) - ID 10026 (Chương 2)
* **Tầng 1: LaTeX (.tex)**
```latex
\begin{question}{2.1}
% [ID gốc: 1.5]
% [Nguồn: Ngân hàng CSD203 (Câu #29)]
What does the following code do?
\begin{codebox}
def Operation(self, newdata):
    NewNode = Node(newdata)
    if self.head is None:
        self.head = NewNode
        return
    laste = self.head
    while(laste.next):
        laste = laste.next
    laste.next=NewNode
\end{codebox}
\begin{choices}
\choice Insert a new node at the tail of the list
\choice Remove the last node
\choice Traverse the list
\choice Insert a new node at the beginning of the list
\end{choices}
\textbf{Đáp án:} A
\textbf{Giải thích:} Đoạn mã duyệt đến cuối danh sách liên kết qua vòng lặp \texttt{while laste.next} rồi gán \texttt{laste.next = NewNode}, tức chèn nút mới vào cuối danh sách.
\end{question}
```

* **Tầng 2: Cấu trúc JSON (questions.json)**
```json
{
  "id": 10026,
  "quizId": 302,
  "text": "What does the following code do?\n\ndef Operation(self, newdata):\n NewNode = Node(newdata)\n if self.head is None:\n self.head = NewNode\n return\n laste = self.head\n while(laste.next):\n laste = laste.next\n laste.next=NewNode",
  "options": [
    "Insert a new node at the tail of the list",
    "Remove the last node",
    "Traverse the list",
    "Insert a new node at the beginning of the list"
  ],
  "correctIndex": 0,
  "explanation": "Đoạn mã duyệt đến cuối danh sách liên kết qua vòng lặp while laste.next rồi gán laste.next = NewNode, tức chèn nút mới vào cuối danh sách."
}
```

* **Tầng 3: Runtime JS (practice-data.js)**
```javascript
{
  "id": 10026,
  "quizId": 302,
  "text": "What does the following code do?\n\ndef Operation(self, newdata):\n NewNode = Node(newdata)\n if self.head is None:\n self.head = NewNode\n return\n laste = self.head\n while(laste.next):\n laste = laste.next\n laste.next=NewNode",
  "options": [
    "Insert a new node at the tail of the list",
    "Remove the last node",
    "Traverse the list",
    "Insert a new node at the beginning of the list"
  ],
  "correctIndex": 0,
  "explanation": "Đoạn mã duyệt đến cuối danh sách liên kết qua vòng lặp while laste.next rồi gán laste.next = NewNode, tức chèn nút mới vào cuối danh sách."
}
```

> [!WARNING]
> **Phát hiện quan trọng:** Khi biên dịch từ tệp `.tex` sang `questions.json`, môi trường `\begin{codebox} ... \end{codebox}` đã bị bóc tách và loại bỏ hoàn toàn, không được thay thế bằng markdown code fence (```python ... ```). Thêm vào đó, thụt lề 4 dấu cách (4 spaces) chuẩn Python trong TeX đã bị co lại thành chỉ **1 dấu cách** (` `).

---

#### Mẫu 3: Câu hỏi chọn nhiều đáp án (Multi-select Question) - ID 10072 (Chương 3)
* **Tầng 1: LaTeX (.tex)**
```latex
\begin{question}{3.17}
% [ID gốc: 1.69]
% [Nguồn: Đề thi FE/RE CSD203 (Câu #11)]
% Quiz: CSD203_SU26_FE - Question #11 (ID: 37f14749-33e8-4227-a6bf-18aa072babc7)
Which two operations are supported by a stack? Choose 2 correct answers.
\begin{choices}
\choice enqueue
\choice push
\choice dequeue
\choice pop
\end{choices}
\textbf{Đáp án:} BD
\textbf{Giải thích:} Ngăn xếp (stack) hoạt động theo cơ chế LIFO, hỗ trợ hai thao tác chính là đẩy phần tử vào (push) và lấy phần tử ra (pop).
\end{question}
```

* **Tầng 2: Cấu trúc JSON (questions.json)**
```json
{
  "id": 10072,
  "quizId": 303,
  "text": "Which two operations are supported by a stack? Choose 2 correct answers.",
  "options": [
    "enqueue",
    "push",
    "dequeue",
    "pop"
  ],
  "correctIndex": 1,
  "explanation": "**Đáp án đúng**: B & D\n\nNgăn xếp (stack) hoạt động theo cơ chế LIFO, hỗ trợ hai thao tác chính là đẩy phần tử vào (push) và lấy phần tử ra (pop).",
  "correctIndices": [
    1,
    3
  ],
  "multiple": true
}
```

* **Tầng 3: Runtime JS (practice-data.js)**
```javascript
{
  "id": 10072,
  "quizId": 303,
  "text": "Which two operations are supported by a stack? Choose 2 correct answers.",
  "options": [
    "enqueue",
    "push",
    "dequeue",
    "pop"
  ],
  "correctIndex": 1,
  "explanation": "**Đáp án đúng**: B & D\n\nNgăn xếp (stack) hoạt động theo cơ chế LIFO, hỗ trợ hai thao tác chính là đẩy phần tử vào (push) và lấy phần tử ra (pop).",
  "correctIndices": [
    1,
    3
  ],
  "multiple": true
}
```

---

### 2.2. Cơ chế lưu trữ và hiển thị Code trên Giao diện Frontend

1. **Cách lưu trữ trong cơ sở dữ liệu:**
   - Trong tệp `.tex`: Code được lưu trong môi trường `\begin{codebox}` hoặc thẻ `\texttt{...}`.
   - Trong `questions.json` và `practice-data.js`: Khối code bị lưu thành chuỗi văn bản thường (raw text) có dấu xuống dòng `\n`, không có thẻ `<pre><code>` hay dấu markdown code block (```).
2. **Cơ chế render Frontend (`js/practice-quiz.js`):**
   - Hàm `formatMathText(text)` chỉ lọc biểu thức KaTeX/MathJax `\( ... \)`, chuyển đổi ký tự HTML (`escapeHtml`) và parse bảng Markdown (`| ... |`).
   - Frontend **hoàn toàn không có logic xử lý code block** (không nhận diện ``` để bọc vào thẻ `<pre><code>`).
3. **Đặc điểm hiển thị CSS (`css/practice.css`):**
   - Câu hỏi hiển thị bằng lớp `.prc-question-text`: Có thiết lập `white-space: pre-wrap; word-break: break-word;`. Do đó, văn bản giữ được các ký tự xuống dòng (`\n`) và khoảng trắng, nhưng hiển thị bằng font chữ thường (sans-serif), không có màu cú pháp (syntax highlighting), không có khung nền bao quanh code.
   - Các phương án hiển thị bằng lớp `.prc-option-text`: **KHÔNG CÓ** `white-space: pre-wrap;`. Do đó, nếu phương án có code nhiều dòng, toàn bộ sẽ bị dồn thành 1 dòng duy nhất.
   - Thanh cuộn ngang: Do thiết lập `word-break: break-word;`, đoạn code dài sẽ bị bẻ dòng cưỡng bức (wrap) thay vì xuất hiện scrollbar ngang. Điều này làm vỡ cấu trúc thụt lề chuẩn của Python.

---

### 2.3. Phiên bản Cache Buster
- **Phiên bản hiện tại:** `v=20261117v26`.
- **Vị trí khai báo:** Khai báo trực tiếp tại URL query string của script `practice-data.js` và stylesheet `practice.css` trong 8 tệp HTML:
  - `pages/practice/practice-quiz.html`
  - `pages/practice/index.html`
  - `pages/practice/quiz-selection.html`
  - `pages/favorites.html`
  - `pages/history.html`
  - Và các tệp bài tập tương ứng.

---

## 3. BƯỚC 1: BÁO CÁO TRÙNG LẶP (DUPLICATE AUDIT)

Hệ thống đã thực hiện quét toàn diện toàn bộ 376 câu hỏi (bao gồm đối chiếu chéo trong cùng chương và giữa 8 chương khác nhau).  
Quy trình chuẩn hóa: Chuyển chữ thường, loại bỏ định dạng LaTeX/Markdown, loại bỏ tiền tố số câu, bỏ qua khoảng trắng/xuống dòng thừa, loại bỏ thụt lề và chú thích code.

### 3.1. Tổng kết phân loại trùng lặp
- **Tổng số nhóm trùng lặp / nghi ngờ trùng:** **48 nhóm** (bao gồm 109 câu hỏi liên quan).
- **Mức (a) - Trùng y hệt (Exact duplicates - giống 100% cả đề và đáp án):** **18 nhóm / 18 câu dư thừa**.
- **Mức (b) - Trùng đề nhưng XUNG ĐỘT ĐÁP ÁN (Critical Conflicts):** **34 cặp**.
  *(Đa số xuất phát từ Chương 6 do bị mất hình ảnh cây/đồ thị gốc dẫn đến câu hỏi chung chung nhưng đáp án lại ứng với các hình khác nhau).*
- **Mức (c) - Gần trùng / Biến thể tham số cố ý (Near duplicates / Variants):** **7 nhóm**.

---

### 3.2. Danh sách Nhóm trùng y hệt 100% (Exact Duplicates)
*Khuyến nghị: Giữ lại 1 câu duy nhất và xóa bỏ câu bị lặp để làm sạch bộ đề.*

| STT | Nhóm câu hỏi (ID - Chương) | Nội dung tóm tắt | Đề xuất | Lý do & Phân tích |
| :---: | :--- | :--- | :---: | :--- |
| **1** | ID 10041 (Q302) & ID 10051 (Q302) | Next pointer of last node in circular linked list | **Giữ ID 10041, xóa 10051** | Cả hai câu cùng trong Chương 2, cùng đáp án "It points to the head node", giải thích tương đương. |
| **2** | ID 10075 (Q304) & ID 10079 (Q304) | Method used to remove an element from a Queue | **Giữ ID 10075, xóa 10079** | Cùng trong Chương 4, giống nhau từng chữ, đáp án "dequeue". |
| **3** | ID 10110 (Q305) & ID 10143 (Q305) | Python code dictionary `student = {1: "Tuan", ...}` | **Giữ ID 10110, xóa 10143** | Cùng trong Chương 5, đoạn code tra cứu từ điển giống hệt nhau, đáp án "Tuan". |
| **4** | ID 10122 (Q305) & ID 10138 (Q305) | What is the load factor in hash tables? | **Giữ ID 10122, xóa 10138** | Cùng trong Chương 5, trùng khớp 100%, đáp án "The ratio of...". |
| **5** | ID 10123 (Q305) & ID 10135 (Q305) | Collision resolution storing multiple elements at same index | **Giữ ID 10123, xóa 10135** | Cùng trong Chương 5, kỹ thuật Chaining / Separate Chaining. |
| **6** | ID 10158 (Q306) & ID 10166 (Q306) | "Given a binary search tree as follows: What is this tree?" | **Giữ ID 10158, xóa 10166** | Đều mất hình vẽ cây, đáp án giống nhau ("Skewed tree"). |
| **7** | ID 10171 (Q306) & ID 10200 (Q306) | Which algorithm divides the list? (Binary tree search) | **Giữ ID 10171, xóa 10200** | Cùng trong Chương 6, đáp án "Binary search". |
| **8** | ID 10174 (Q306) & ID 10219 (Q306) | "Given a binary search tree as follows: What are Internal nodes?" | **Giữ ID 10174, xóa 10219** | Cả hai cùng mất hình, cùng đáp án "40, 20, 50, 30". |
| **9** | ID 10182 (Q306) & ID 10193 (Q306) | Disadvantage of AVL trees | **Giữ ID 10182, xóa 10193** | Cùng trong Chương 6, đáp án "difficult to implement...". |
| **10** | ID 10212 (Q306) & ID 10249 (Q306) | Shortest path from node A to node G | **Giữ ID 10212, xóa 10249** | Cùng mất hình đồ thị, cùng đáp án "A, B, E, G". |
| **11** | ID 10232 (Q306) & ID 10236 (Q306) | What are incident edges on vertex V? | **Giữ ID 10232, xóa 10236** | Lý thuyết đồ thị, đáp án "edges that have vertex V as an end vertex". |
| **12** | ID 10245 (Q306) & ID 10251 (Q306) | Algorithm used in route finding on maps | **Giữ ID 10245, xóa 10251** | Cùng hỏi thuật toán tìm đường (Dijkstra). |
| **13** | ID 10292 (Q308) & ID 10307 (Q308) | Most appropriate definition for recursion | **Giữ ID 10292, xóa 10307** | Cùng trong Chương 8, định nghĩa đệ quy. |
| **14** | ID 10300 (Q308) & ID 10321 (Q308) | The complexity of Linear search algorithm is | **Giữ ID 10300, xóa 10321** | Cùng đáp án O(n). |
| **15** | ID 10311 (Q308) & ID 10363 (Q308) | Condition for applying binary search in an array | **Giữ ID 10311, xóa 10363** | Cùng đáp án "Array must be sorted". |
| **16** | ID 10315 (Q308) & ID 10336 (Q308) | Worst case of linear search | **Giữ ID 10315, xóa 10336** | Cùng đáp án "Element is not present or at the end". |
| **17** | ID 10319 (Q308) & ID 10350 (Q308) | Number of comparisons in binary search on sorted array of size 15 | **Giữ ID 10319, xóa 10350** | Cùng đáp án "4". |
| **18** | ID 10324 (Q308) & ID 10375 (Q308) | Python recursive function countdown `def fun(n): ...` | **Giữ ID 10324, xóa 10375** | Cùng đoạn code đệ quy in ngược số, cùng đáp án. |

---

### 3.3. Các trường hợp Xung đột đáp án / Đề cụt mất hình vẽ (Critical Conflicts)
*(Hiện tượng nguy hiểm: Học viên gặp cùng 1 câu hỏi nhưng chọn đáp án nào cũng có thể bị chấm sai tùy theo câu)*

1. **Nhóm các câu Duyệt cây nhị phân (Chương 6 - Quiz 306):**
   - **ID 10154, ID 10175, ID 10199:** Đều có câu hỏi: *"Given a binary search tree as follows: What is the output of In-order traversal?"*
     - ID 10154 có đáp án đúng là: `40 20 50 10 30` (thực chất đây là Post-order hoặc Pre-order của 1 cây khác!)
     - ID 10175 có đáp án đúng là: `5, 10, 25, 30, 35, 50, 65, 72, 75, 100`
     - ID 10199 có đáp án đúng là: `10 20 30 40 50`
     - **Nguyên nhân:** Toàn bộ cây nhị phân gốc là dạng hình ảnh trong bài thi giấy, khi quét OCR sang LaTeX bị mất hoàn toàn thẻ ảnh. Do đó đề bài chỉ còn câu dẫn chung chung.
   - **ID 10146 vs ID 10149:** *"What is the result of Pre-order traversal of the binary search tree below?"* -> Cả hai đều không có hình cây, đáp án khác nhau hoàn toàn.
   - **ID 10168 vs ID 10220:** *"Given a binary search tree as follows: What would be the output of In-order traversal?"* -> Cả hai đều mất hình cây.
2. **Nhóm các câu Duyệt đồ thị (BFS / DFS / Adjacency Matrix) (Chương 6 - Quiz 306):**
   - **ID 10211 vs ID 10222:** *"Given a graph in the figure, the adjacency matrix of the graph is:"* -> Cả hai đều không có hình đồ thị. ID 10211 ma trận 5x5, ID 10222 ma trận 4x4.
   - **ID 10216, ID 10226, ID 10250:** *"Given a graph in the figure, the depth first traversal from node D is:"* -> Đều mất hình đồ thị.
   - **ID 10228, ID 10230, ID 10240:** *"Given a graph in the figure, the Breadth first traversal..."* -> Đều mất hình đồ thị.
3. **Nhóm biến thể Code có chủ đích (Cần giữ cả hai nhưng phải bổ sung làm rõ):**
   - **ID 10151 vs ID 10167:** Cùng hàm `def Func(self, root):`. ID 10151 gọi đệ quy `self.Func(root.left)` -> `print` -> `self.Func(root.right)` (In-order). Nhưng ID 10167 trong đề TeX gốc có `print` trước `self.Func(root.left)` (Pre-order). Tuy nhiên do rút gọn codebox, text hiển thị bị giống nhau gây xung đột.
   - **ID 10328 vs ID 10338 vs ID 10367 vs ID 10368:** Chuyển đổi số thập phân sang nhị phân qua đệ quy: vị trí đặt lệnh `print(n % 2)` trước hay sau lời gọi đệ quy làm đảo ngược chuỗi nhị phân (`1011` vs `1101`).

---

## 4. BƯỚC 2: BÁO CÁO LỖI CODE (CODE FORMATTING & INTEGRITY)

Thống kê chi tiết toàn bộ các lỗi liên quan đến code trong đề và đáp án:

### 4.1. Bảng phân loại lỗi Code

| Mã lỗi | Mô tả lỗi | Số câu mắc lỗi | Mức độ nghiêm trọng |
| :--- | :--- | :---: | :---: |
| **UNWRAPPED_CODE_IN_TEXT** | Đoạn code nằm lẫn trong văn bản đề bài, không được bọc trong khối code markdown (```python) hay thẻ HTML (`<pre><code>`) | **41 câu** | **Cao** (ảnh hưởng trực tiếp trải nghiệm đọc code) |
| **BAD_INDENTATION** | Code Python bị mất thụt lề chuẩn, thụt lề 4 dấu cách bị cắt gọt còn 1 dấu cách hoặc dồn dòng | **33 câu** | **Nghiêm trọng** (Python phụ thuộc thụt lề cú pháp) |
| **MANGLED_DUNDER_INIT** | Phương thức khởi tạo `__init__` bị trình phân tích Markdown hiểu nhầm thành in đậm (`**init**`) | **2 câu** | **Trung bình** (gây sai lệch cú pháp OOP Python) |
| **MISSING_IMAGE_OR_FIGURE** | Đề bài tham chiếu hình vẽ cây nhị phân / đồ thị ("in the figure", "tree below") nhưng không có hình | **30 câu** | **Đặc biệt nghiêm trọng** (học viên không thể giải được) |

---

### 4.2. Bảng kê chi tiết các câu lỗi Code tiêu biểu

| Chương | ID câu hỏi | Loại lỗi | Trích đoạn lỗi thực tế | Khuyến nghị khắc phục |
| :---: | :---: | :---: | :--- | :--- |
| **Quiz 301** | ID 10002 | `UNWRAPPED_CODE` | `What is the output of the following program? a=[1,2,3,4,5] a[0]=6; print(len(a))` | Đưa vào khối ```python |
| **Quiz 301** | ID 10014 | `UNWRAPPED_CODE` | `What will be the output of the following code? S=[] for i in range(1,5): if (i%2==1): S.append(i)` | Đưa vào khối ```python, thụt lề 4 spaces |
| **Quiz 302** | ID 10026 | `UNWRAPPED_CODE` & `BAD_INDENTATION` | `def Operation(self, newdata):\n NewNode = Node(newdata)\n if self.head is None:` (chỉ thụt 1 space) | Chuẩn hóa thụt lề 4 spaces cho block code |
| **Quiz 302** | ID 10029 | `UNWRAPPED_CODE` & `BAD_INDENTATION` | `Suppose a singly linked list...\n printval = self.head` (thụt 1 space) | Bọc code block chuẩn |
| **Quiz 302** | ID 10035 | `MANGLED_DUNDER` & `BAD_INDENTATION` | `def __init__(self, data):` bị markdown hiểu thành in đậm `init` | Escaped hoặc bọc trong inline code ``` |
| **Quiz 302** | ID 10052 | `MANGLED_DUNDER` & `BAD_INDENTATION` | `class Node:\n def __init__(self, dataval=None):` | Bọc trong khối codebox |
| **Quiz 303** | ID 10057 | `UNWRAPPED_CODE` | `from collections import deque\nS = deque()\nS.append(1)...` | Định dạng codeblock |
| **Quiz 303** | ID 10065 | `UNWRAPPED_CODE` & 5 Options | Code đảo ngược chuỗi bằng stack nhưng đề có 5 phương án | Bọc code, chuẩn hóa 4 phương án |
| **Quiz 305** | ID 10110 | `UNWRAPPED_CODE` | Code dictionary `student = {1: "Tuan", ...}` không bọc code | Bọc inline code hoặc codebox |
| **Quiz 306** | ID 10146 | `MISSING_IMAGE` | `What is the result of Pre-order traversal of the binary search tree below?` (Không có hình) | Tái tạo đồ họa cây hoặc chuyển sang text representation |
| **Quiz 306** | ID 10154 | `MISSING_IMAGE` | `Given a binary search tree as follows: What is the output of In-order traversal?` (Không có hình) | Tái tạo đồ họa cây hoặc chuyển sang text representation |
| **Quiz 306** | ID 10211 | `MISSING_IMAGE` | `Given a graph in the figure, the adjacency matrix of the graph is:` (Không có hình) | Tái tạo đồ họa đồ thị tương ứng |
| **Quiz 308** | ID 10328 | `UNWRAPPED_CODE` & `BAD_INDENTATION` | Code đệ quy `def func(n):\n if (n > 0):\n func(int(n/2))` (thụt 1 space) | Chuẩn hóa thụt lề 4 spaces |
| **Quiz 308** | ID 10367 | `UNWRAPPED_CODE` & `BAD_INDENTATION` | Code đệ quy in nhị phân dính dòng, thụt lề sai | Bọc codebox và thụt lề chuẩn |

---

## 5. BƯỚC 3: CÁC LỖI KHÁC (CHECKLIST TƯƠNG TỰ DBI202)

### 5.1. Bất thường về số lượng phương án lựa chọn (Abnormal Option Counts)
Mặc định hệ thống thiết kế cho dạng trắc nghiệm 4 phương án (A, B, C, D). Phát hiện **6 câu hỏi** có số lượng phương án bất thường:
1. **ID 10045 (Quiz 302):** Có **5 phương án** (Thêm phương án E: "Traverse to the end, then link").
2. **ID 10065 (Quiz 303):** Có **5 phương án** (A, B, C, D, E).
3. **ID 10124 (Quiz 305):** Có **6 phương án** (A, B, C, D, E, F - do dữ liệu đề thi gốc ghép nhiều lựa chọn con).
4. **ID 10164 (Quiz 306):** Có **3 phương án** (Thiếu mất phương án D).
5. **ID 10214 (Quiz 306):** Có **5 phương án** (A, B, C, D, E).
6. **ID 10237 (Quiz 306):** Có **6 phương án** (A, B, C, D, E, F).

---

### 5.2. Phương án trùng lặp trong cùng 1 câu hỏi (Duplicate Choices in Question)
- **ID 10230 (Quiz 306):**
  - Đề: *"Given a graph in the figure, the breadth first traversal from node A is (in ABC order):"*
  - Phương án B: `'A, B, C, D, E'`
  - Phương án D: `'A, B, C, D, E'`
  *(Hai phương án B và D giống hệt nhau 100% trong cùng một câu hỏi).*

---

### 5.3. Tiền tố Metadata đề thi rò rỉ vào nội dung câu hỏi (Leaked Metadata Prefix)
- **ID 10162 (Quiz 306):**
  - Văn bản đề bài bị dính nguyên mã đề thi và GUID:
  `"CSD203_SU26_FE - Question #28 (ID: 6eb31a81-e2cf-4bda-a5b5-b77da17967b5) Recursion calls are stored on the memory in which data structure?"`
  - Cần làm sạch bỏ đoạn `CSD203_SU26_FE - Question #28 (ID: ...)`.

---

### 5.4. Lời giải thích lệch hoàn toàn chủ đề câu hỏi (Mismatched Explanations)
Phát hiện **11 câu hỏi** bị lỗi lệch chủ đề giải thích nghiêm trọng (do quá trình tạo lời giải tự động trước đây bị lệch dòng/chỉ số index giữa các câu hỏi đồ thị và cây):

| ID câu | Chương | Chủ đề câu hỏi | Nội dung lời giải thích hiện tại (Bị lệch) | Chủ đề thực tế của lời giải |
| :---: | :---: | :--- | :--- | :--- |
| **ID 10038** | Q302 | Circular Linked List | "Phép duyệt Postorder trên cây nhị phân thường được sử dụng để xóa toàn bộ các nút..." | **Tree Traversal** |
| **ID 10159** | Q306 | Binary Search Tree Descendants | "Đồ thị có hướng không chu trình (DAG) luôn tồn tại ít nhất một thứ tự sắp xếp tô-pô..." | **Graph DAG Topological** |
| **ID 10162** | Q306 | Recursion Call Stack | "Hàng đợi Deque hỗ trợ các phương thức appendleft() và popleft() để thao tác..." | **Queue / Deque** |
| **ID 10164** | Q306 | Post-order traversal of binary tree | "Trong đồ thị biểu diễn bằng ma trận kề A, phần tử A[i][j] = 1 biểu thị có cạnh nối..." | **Graph Adjacency Matrix** |
| **ID 10170** | Q306 | Array Representation of Binary Tree | "Đồ thị Euler là đồ thị liên thông có chu trình Euler đi qua mỗi cạnh đúng một lần..." | **Graph Euler Cycle** |
| **ID 10211** | Q306 | Adjacency Matrix of Graph | "Duyệt trung thứ tự (In-order: Trái -> Gốc -> Phải) trên cây BST luôn cho dãy tăng dần..." | **Binary Search Tree** |
| **ID 10213** | Q306 | BFS on Graph | "Trong cây Đỏ--Đen, nút gốc luôn mang màu đen và không có hai nút đỏ liên tiếp..." | **Red-Black Tree** |
| **ID 10215** | Q306 | Degree of vertex V in Graph | "Cây AVL thực hiện các phép quay đơn (Single Rotation: LL, RR) hoặc quay kép..." | **AVL Tree Rotation** |
| **ID 10216** | Q306 | DFS on Graph | "Cây (2,4) (hay 2-3-4 tree) là cây tìm kiếm đa nhánh cân bằng, mỗi nút trong..." | **(2,4) Tree** |
| **ID 10218** | Q306 | Weighted Matrix of Graph | "Duyệt cây nhị phân: Preorder (Gốc-Trái-Phải), Inorder (Trái-Gốc-Phải)..." | **Tree Traversal** |
| **ID 10228** | Q306 | BFS on Graph | "Cây nhị phân tìm kiếm tối ưu (Optimal BST) sử dụng quy hoạch động để giảm thiểu chi phí..." | **Optimal BST** |

---

### 5.5. Câu hỏi nhiều đáp án đúng chưa được chuyển sang Multi-select
- **ID 10004 (Quiz 301):**
  - Đề: *"List A is defined as follows: A = [1, 2, 3, 4, 5] Select all of the following statements that remove the middle element 3 from A so that it equals [1, 2, 4, 5] :"*
  - Hiện tại trường `multiple` là `undefined` (Single-choice). Cần chuyển sang `multiple: true` với nhiều phương án đúng tương tự câu ID 10072.

---

## 6. MA TRẬN THỐNG KÊ TỔNG HỢP THEO LOẠI LỖI VÀ CHƯƠNG

| Chương | Tổng số câu | Trùng lặp 100% | Lỗi Code / Thụt lề | Mất hình ảnh (Tree/Graph) | Lỗi số lượng phương án | Giải thích lệch | Cần xử lý |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **Quiz 301 (Python Review)** | 25 | 0 | 18 | 0 | 0 | 0 | **18 câu** |
| **Quiz 302 (Linked Lists)** | 32 | 1 | 12 | 0 | 1 | 1 | **14 câu** |
| **Quiz 303 (Stacks)** | 17 | 0 | 6 | 0 | 1 | 0 | **7 câu** |
| **Quiz 304 (Queues & Deques)** | 25 | 1 | 2 | 0 | 0 | 0 | **3 câu** |
| **Quiz 305 (Recursion & Hash)** | 44 | 3 | 3 | 0 | 1 | 0 | **7 câu** |
| **Quiz 306 (Trees & Graphs)** | 116 | 6 | 4 | **30** | 3 | 10 | **48 câu** |
| **Quiz 307 (Sorting)** | 37 | 0 | 0 | 0 | 0 | 0 | **0 câu** |
| **Quiz 308 (Searching & Adv)** | 80 | 7 | 8 | 0 | 0 | 0 | **15 câu** |
| **TỔNG HỢP TOÀN BỘ** | **376** | **18** | **53** | **30** | **6** | **11** | **112 câu** |

---

## 7. NHẬN XÉT VỀ KIẾN TRÚC DỮ LIỆU & RỦI RO KHI SỬA CHỮA

### 7.1. Kiến trúc luồng dữ liệu (Data Pipeline Flow)
Dữ liệu trắc nghiệm CSD203 được tổ chức theo quy trình sinh tự động:
```
[Tầng 1: CSD203_Ultra_Edition.tex]
              │
              ▼ (Script parser/build: scripts/build_subject_quiz.js --subject=CSD203)
[Tầng 2: questions.json]
              │
              ▼ (Gán dải ID 10001-10376 & nạp vào Lib95.practice.data)
[Tầng 3: js/practice-data.js]
              │
              ▼ (Script cập nhật chỉ mục: scripts/build-quiz-index.js)
[Tầng 4: backend/data/quizzes-index.json & assets/data/quizzes-index.json]
              │
              ▼ (Tăng phiên bản cache: bump version v=20261117v...)
[Tầng 5: HTML files tại pages/practice/*.html]
```

### 7.2. Các rủi ro tiềm ẩn khi tiến hành sửa chữa
1. **Rủi ro sửa đè mất đồng bộ giữa các tầng:**
   - Nếu chỉ sửa trực tiếp trên `js/practice-data.js` mà không sửa `CSD203_Ultra_Edition.tex` và `questions.json`, lần build tự động tiếp theo bằng script `build_subject_quiz.js` sẽ **ghi đè và làm mất sạch toàn bộ các bản sửa lỗi**.
   - Do đó, quy trình chuẩn bắt buộc phải: **Sửa từ tệp gốc LaTeX (.tex) hoặc tệp questions.json trước**, sau đó mới chạy script đồng bộ sang `practice-data.js`.
2. **Rủi ro lệch ID khi xóa câu trùng:**
   - Hiện tại dải ID của CSD203 là `10001` đến `10376`. Nếu xóa bỏ các câu trùng (ví dụ 18 câu trùng 100%), tổng số câu sẽ giảm từ 376 xuống 358 câu.
   - Việc xóa câu cần cân nhắc: (a) Xóa hẳn và re-index lại ID, hoặc (b) Ẩn câu hỏi / gộp nội dung để giữ tính tương thích với lịch sử làm bài (`history`) và danh sách yêu thích (`favorites`) đã lưu trên LocalStorage của học viên.
3. **Rủi ro hiển thị Code trên Frontend:**
   - Nếu chỉ định dạng lại Markdown code block (```python ... ```) trong dữ liệu mà không bổ sung parser code block cho `js/practice-quiz.js` (`formatMathText`), giao diện sẽ hiển thị nguyên văn các ký tự ba dấu nháy ngược ``` ra màn hình.
   - Do đó, cần đồng thời:
     - Thêm xử lý regex chuyển ``` sang `<pre><code>` trong `js/practice-quiz.js`.
     - Bổ sung style CSS cho `pre code` trong `css/practice.css` (font Monospace, nền tối mờ, padding vừa vặn, không ép wrap dòng).
4. **Vấn đề 30 câu mất hình ảnh ở Chương 6:**
   - 30 câu hỏi duyệt cây và đồ thị ở Chương 6 không thể giải được nếu không có cấu trúc cây/đồ thị.
   - Giải pháp khuyến nghị: Chuyển cấu trúc cây/đồ thị thành dạng text biểu diễn (ví dụ dạng mảng hoặc danh sách kề trực tiếp trong đề bài: *"Cho cây BST có các phần tử được chèn theo thứ tự [40, 20, 50, 10, 30]..."*) để đề bài độc lập hoàn toàn, không phụ thuộc vào file ảnh scan.

---
*Báo cáo được khởi tạo tự động phục vụ công tác kiểm toán chất lượng ngân hàng câu hỏi 9.5 AI Club.*
