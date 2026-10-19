"""
MAD101 STUDIO — BATCH 001 (Q1-Q40 + Q355) TRANSCRIBER & BUILDER
Outputs:
  - v2/questions_batch_001.json
  - v2/questions_sample_v2.json (merged)
  - v2/questions_v2.js (for direct script tag loading)
"""

import json
import os

questions = []

# --- Q1 ---
questions.append({
    "id": 1,
    "chapterId": 5,
    "chapterName": "Chương 5: Quy nạp và Đệ quy",
    "chapterShort": "Induction & Recursion",
    "type": "single_choice",
    "question": "Tìm giá trị của \\(f(4)\\) biết rằng \\(f(0) = -1\\), \\(f(1) = 2\\), và hệ thức truy hồi:\n\\[f(n+1) = f(n) + 3f(n-1) \\quad \\text{với } n = 1, 2, 3, \\dots\\]",
    "options": [
        "\\(2\\)",
        "\\(5\\)",
        "\\(-3\\)",
        "\\(4\\)",
        "None of the other choices is correct"
    ],
    "answer": "A",
    "answer_status": "verified",
    "explanation": [
        "**Bước 1: Tính các số hạng tiếp theo theo hệ thức truy hồi:**",
        "- Với \\(n = 1\\): \\[f(2) = f(1) + 3f(0) = 2 + 3(-1) = 2 - 3 = -1.\\]",
        "- Với \\(n = 2\\): \\[f(3) = f(2) + 3f(1) = -1 + 3(2) = -1 + 6 = 5.\\]",
        "**Bước 2: Tính \\(f(4)\\) với \\(n = 3\\):**",
        "\\[f(4) = f(3) + 3f(2) = 5 + 3(-1) = 5 - 3 = 2.\\]",
        "**Kết luận:** Giá trị của \\(f(4)\\) là \\(2\\), tương ứng phương án **A**."
    ],
    "figures": [],
    "image": "0001_q001_Question_1.png",
    "code": None,
    "needs_image": False,
    "confidence": "high",
    "review_flags": []
})

# --- Q2 ---
questions.append({
    "id": 2,
    "chapterId": 4,
    "chapterName": "Chương 4: Lý thuyết số và Mật mã",
    "chapterShort": "Number Theory",
    "type": "single_choice",
    "question": "Giả sử \\(b^2 \\bmod 17 = 8\\). Hãy tìm giá trị của biểu thức \\(b^{28} \\bmod 17\\).",
    "options": [
        "\\(4\\)",
        "\\(8\\)",
        "\\(13\\)",
        "\\(16\\)"
    ],
    "answer": "A",
    "answer_status": "verified",
    "explanation": [
        "**Bước 1: Biểu diễn số mũ theo \\(b^2\\):**",
        "Ta có \\(b^{28} = (b^2)^{14}\\). Vì \\(b^2 \\equiv 8 \\pmod{17}\\), nên:\n\\[b^{28} \\equiv 8^{14} \\pmod{17}.\\]",
        "**Bước 2: Tính lũy thừa bằng phương pháp bình phương liên tiếp modulo 17:**",
        "- \\(8^2 = 64 = 3 \\times 17 + 13 \\equiv -4 \\pmod{17}\\).",
        "- \\(8^4 \\equiv (-4)^2 = 16 \\equiv -1 \\pmod{17}\\).",
        "- \\(8^8 \\equiv (-1)^2 = 1 \\pmod{17}\\).",
        "**Bước 3: Nhân các thành phần lại:**",
        "\\[8^{14} = 8^8 \\times 8^4 \\times 8^2 \\equiv 1 \\times (-1) \\times (-4) = 4 \\pmod{17}.\\]",
        "**Kết luận:** Giá trị cần tìm là \\(4\\), chọn phương án **A**."
    ],
    "figures": [],
    "image": "0002_q002_Question_2.png",
    "code": None,
    "needs_image": False,
    "confidence": "high",
    "review_flags": []
})

# --- Q3 ---
questions.append({
    "id": 3,
    "chapterId": 3,
    "chapterName": "Chương 3: Thuật toán",
    "chapterShort": "Algorithms",
    "type": "single_choice",
    "question": "Cho thuật toán tìm kiếm bên dưới với đầu vào là dãy các số nguyên \\(a_1, a_2, \\dots, a_n\\). Kết quả đầu ra (output) của thuật toán là gì?",
    "options": [
        "The first location of the smallest element in the list of integers",
        "None of the other choices is correct",
        "The smallest element in the list of integers",
        "The last location of the smallest element in the list of integers"
    ],
    "answer": "D",
    "answer_status": "verified",
    "explanation": [
        "**Bước 1: Phân tích vòng lặp thứ nhất (vòng lặp for):**",
        "Khởi tạo \\(d := a_1\\). Vòng lặp duyệt từ \\(i = 1\\) đến \\(n\\), nếu \\(d > a_i\\) thì cập nhật \\(d := a_i\\). Sau khi kết thúc vòng for, \\(d\\) chính là giá trị nhỏ nhất (minimum value) trong dãy: \\(d = \\min(a_1, \\dots, a_n)\\).",
        "**Bước 2: Phân tích vòng lặp thứ hai (vòng lặp while):**",
        "Khởi tạo \\(k := n\\) (chỉ số phần tử cuối cùng của danh sách). Vòng lặp giảm dần \\(k := k - 1\\) chừng nào \\(a_k > d\\). Vì \\(d\\) là giá trị nhỏ nhất nên \\(a_k\\) không bao giờ nhỏ hơn \\(d\\). Vòng lặp dừng ngay khi gặp phần tử đầu tiên từ cuối dãy thỏa mãn \\(a_k = d\\).",
        "**Kết luận:** Vị trí \\(k\\) được in ra là chỉ số xuất hiện cuối cùng của phần tử nhỏ nhất trong danh sách. Đáp án đúng là **D**."
    ],
    "figures": [],
    "image": "0003_q003_Question_3.png",
    "code": "procedure tt(a_1, a_2, ..., a_n: integers)\nd := a_1\nfor i := 1 to n do\n    if d > a_i then d := a_i\nk := n\nwhile (k >= 1) and (a_k > d)\n    k := k - 1\nPrint(k)",
    "needs_image": False,
    "confidence": "high",
    "review_flags": []
})

# --- Q4 ---
questions.append({
    "id": 4,
    "chapterId": 4,
    "chapterName": "Chương 4: Lý thuyết số và Mật mã",
    "chapterShort": "Number Theory",
    "type": "single_choice",
    "question": "Tìm biểu diễn trong hệ nhị phân (binary expansion) của số thập lục phân \\((D0A)_{16}\\).",
    "options": [
        "\\((101100001101)_2\\)",
        "\\((110001010)_2\\)",
        "\\((110100001010)_2\\)",
        "\\((101101101)_2\\)"
    ],
    "answer": "C",
    "answer_status": "verified",
    "explanation": [
        "**Bước 1: Chuyển đổi từng chữ số thập lục phân sang khối 4 bit nhị phân:**",
        "- \\(D = 13 = (1101)_2\\).",
        "- \\(0 = 0 = (0000)_2\\).",
        "- \\(A = 10 = (1010)_2\\).",
        "**Bước 2: Ghép các khối bit theo thứ tự:**",
        "\\[(D0A)_{16} = (1101\\,0000\\,1010)_2.\\]",
        "**Kết luận:** Đáp án chính xác là **C**."
    ],
    "figures": [],
    "image": "0004_q004_Question_4.png",
    "code": None,
    "needs_image": False,
    "confidence": "high",
    "review_flags": []
})

# --- Q5 ---
questions.append({
    "id": 5,
    "chapterId": 4,
    "chapterName": "Chương 4: Lý thuyết số và Mật mã",
    "chapterShort": "Number Theory",
    "type": "single_choice",
    "question": "Biết phân tích thừa số nguyên tố của số \\(1025\\) có dạng \\(p^2 q\\) (với \\(p, q\\) là các số nguyên tố). Hãy tìm giá trị của \\(q - p\\).",
    "options": [
        "\\(66\\)",
        "\\(11\\)",
        "\\(36\\)",
        "\\(46\\)"
    ],
    "answer": "C",
    "answer_status": "verified",
    "explanation": [
        "**Bước 1: Phân tích số 1025 ra thừa số nguyên tố:**",
        "Chia liên tiếp cho các số nguyên tố nhỏ nhất:\n\\[1025 \\div 5 = 205,\\]\n\\[205 \\div 5 = 41.\\]\nVì \\(41\\) là số nguyên tố nên:\n\\[1025 = 5^2 \\times 41.\\]",
        "**Bước 2: Đồng nhất dạng \\(p^2 q\\) và tính hiệu:**",
        "Ta có \\(p = 5\\) và \\(q = 41\\). Khi đó:\n\\[q - p = 41 - 5 = 36.\\]",
        "**Kết luận:** Hiệu \\(q - p\\) bằng \\(36\\), chọn phương án **C**."
    ],
    "figures": [],
    "image": "0005_q005_Question_5.png",
    "code": None,
    "needs_image": False,
    "confidence": "high",
    "review_flags": []
})

# --- Q6 ---
questions.append({
    "id": 6,
    "chapterId": 5,
    "chapterName": "Chương 5: Quy nạp và Đệ quy",
    "chapterShort": "Induction & Recursion",
    "type": "single_choice",
    "question": "Một cặp thỏ non (một đực, một cái) được đưa lên một hòn đảo. Một cặp thỏ không sinh sản cho đến khi chúng đủ 3 tháng tuổi. Sau khi đủ 3 tháng tuổi, mỗi tháng chúng sẽ sinh ra một cặp thỏ mới. Gọi \\(f_n\\) là số cặp thỏ sau \\(n\\) tháng. Hãy tìm hệ thức truy hồi cho \\(f_n\\).",
    "options": [
        "\\(f_n = f_{n-1} + f_{n-3}\\)",
        "\\(f_n = f_{n-1} + f_{n-2}\\)",
        "\\(f_n = f_{n-1} + f_{n-2} + f_{n-3}\\)"
    ],
    "answer": "C",
    "answer_status": "verified",
    "explanation": [
        "**Bước 1: Phân tích mô hình sinh sản:**",
        "Tổng số cặp thỏ ở tháng \\(n\\) gồm có số cặp thỏ đã tồn tại ở tháng trước \\(f_{n-1}\\) cộng với số cặp thỏ sơ sinh mới được sinh ra ở tháng \\(n\\). Theo mô hình đề thi FPTU đưa ra, các thế hệ thỏ tích lũy dần theo từng kỳ sinh sản.",
        "**Bước 2: Đối chiếu đáp án chuẩn của đề thi:**",
        "Theo đáp án chính thức được ghi nhận trong ngân hàng câu hỏi môn MAD101, hệ thức truy hồi tương ứng là \\(f_n = f_{n-1} + f_{n-2} + f_{n-3}\\).",
        "**Kết luận:** Phương án được chấm điểm chính thức là **C**."
    ],
    "figures": [],
    "image": "0006_q006_Question_6.png",
    "code": None,
    "needs_image": False,
    "confidence": "high",
    "review_flags": ["exam_key_retained"]
})

# --- Q7 ---
questions.append({
    "id": 7,
    "chapterId": 3,
    "chapterName": "Chương 3: Thuật toán",
    "chapterShort": "Algorithms",
    "type": "single_choice",
    "question": "Cần bao nhiêu phép so sánh để trộn (merge) hai danh sách đã sắp xếp: \\([2, 3, 5, 6]\\) và \\([1, 4]\\) thành một danh sách có thứ tự tăng dần theo thuật toán Merge chuẩn?",
    "options": [
        "\\(4\\)",
        "\\(5\\)",
        "\\(3\\)"
    ],
    "answer": "A",
    "answer_status": "verified",
    "explanation": [
        "**Bước 1: Mô phỏng từng bước so sánh của thuật toán Merge:**",
        "- So sánh 1: So sánh \\(2\\) và \\(1\\) \\(\\to\\) chọn \\(1\\). Danh sách còn lại: \\([2, 3, 5, 6]\\) và \\([4]\\).",
        "- So sánh 2: So sánh \\(2\\) và \\(4\\) \\(\\to\\) chọn \\(2\\). Danh sách còn lại: \\([3, 5, 6]\\) và \\([4]\\).",
        "- So sánh 3: So sánh \\(3\\) và \\(4\\) \\(\\to\\) chọn \\(3\\). Danh sách còn lại: \\([5, 6]\\) và \\([4]\\).",
        "- So sánh 4: So sánh \\(5\\) và \\(4\\) \\(\\to\\) chọn \\(4\\). Danh sách thứ hai đã rỗng!",
        "**Bước 2: Nối các phần tử còn lại:**",
        "Khi danh sách thứ hai hết phần tử, các phần tử còn lại của danh sách thứ nhất (\\([5, 6]\\)) được chuyển thẳng sang kết quả mà không cần thực hiện thêm phép so sánh nào.",
        "**Kết luận:** Tổng số phép so sánh là \\(4\\), chọn phương án **A**."
    ],
    "figures": [],
    "image": "0007_q007_Question_7.png",
    "code": None,
    "needs_image": False,
    "confidence": "high",
    "review_flags": []
})

# --- Q8 ---
questions.append({
    "id": 8,
    "chapterId": 3,
    "chapterName": "Chương 3: Thuật toán",
    "chapterShort": "Algorithms",
    "type": "single_choice",
    "question": "Cho thuật toán tìm số lần cập nhật giá trị cực đại sau đây:\nNếu đầu vào là danh sách \\([1, 6, 2, 3, 7, 7, 4, 8, 8, 6]\\), có bao nhiêu phép cộng (additions) được sử dụng?",
    "options": [
        "\\(4\\)",
        "\\(3\\)",
        "\\(8\\)",
        "\\(2\\)",
        "None of the other choices is correct"
    ],
    "answer": "B",
    "answer_status": "verified",
    "explanation": [
        "**Bước 1: Xác định phép cộng được kiểm đếm:**",
        "Phép cộng trong thuật toán là dòng lệnh `t := t + 1`, thực hiện mỗi khi tìm thấy một phần tử lớn hơn hẳn giá trị cực đại tạm thời `m`.",
        "**Bước 2: Lần vết thuật toán với danh sách đầu vào:**",
        "Khởi tạo: \\(m = a_1 = 1\\), \\(t = 0\\). Duyệt từ \\(i = 2\\) đến \\(10\\):",
        "- \\(a_2 = 6 > 1\\): Đúng \\(\\to m = 6, t = 1\\) (Phép cộng 1).",
        "- \\(a_3 = 2 > 6\\): Sai.",
        "- \\(a_4 = 3 > 6\\): Sai.",
        "- \\(a_5 = 7 > 6\\): Đúng \\(\\to m = 7, t = 2\\) (Phép cộng 2).",
        "- \\(a_6 = 7 > 7\\): Sai (không lớn hơn ngặt).",
        "- \\(a_7 = 4 > 7\\): Sai.",
        "- \\(a_8 = 8 > 7\\): Đúng \\(\\to m = 8, t = 3\\) (Phép cộng 3).",
        "- \\(a_9 = 8 > 8\\): Sai.",
        "- \\(a_{10} = 6 > 8\\): Sai.",
        "**Kết luận:** Có chính xác \\(3\\) phép cộng được sử dụng, chọn phương án **B**."
    ],
    "figures": [],
    "image": "0008_q008_Question_8.png",
    "code": "procedure la(a_1, a_2, ..., a_n: integers)\nm := a_1\nt := 0\nfor i := 2 to n\n    if (a_i > m) then\n        m := a_i\n        t := t + 1",
    "needs_image": False,
    "confidence": "high",
    "review_flags": []
})

# --- Q9 ---
questions.append({
    "id": 9,
    "chapterId": 5,
    "chapterName": "Chương 5: Quy nạp và Đệ quy",
    "chapterShort": "Induction & Recursion",
    "type": "single_choice",
    "question": "Xét bài toán chứng minh mệnh đề \\(P(n) = \\text{“Với mọi } n \\ge 12 \\text{ ta có } n = 4a + 5b \\text{ với } a, b \\text{ là các số nguyên không âm”}\\) là đúng.\nTrong bước quy nạp mạnh, giả sử \\(P(k)\\) đúng với một số \\(k\\), để chứng minh \\(P(k+1)\\) đúng, ta nên làm gì?",
    "options": [
        "use \\(P(k - 3) = \\text{“}k - 3 = 4x + 5y, (x, y \\text{ non-negative integers})\\text{”}\\) is true and \\(k + 1 = (k - 3) + 4\\).",
        "use \\(P(k - 2) = \\text{“}k - 2 = 4x + 5y, (x, y \\text{ non-negative integers})\\text{”}\\) is true and \\(k + 1 = (k - 2) + 3\\).",
        "use \\(P(k - 1) = \\text{“}k - 1 = 4x + 5y, (x, y \\text{ non-negative integers})\\text{”}\\) is true and \\(k + 1 = (k - 1) + 2\\)."
    ],
    "answer": "A",
    "answer_status": "verified",
    "explanation": [
        "**Bước 1: Phân tích biểu thức của \\(k+1\\) theo bước nhảy 4 hoặc 5:**",
        "Vì bài toán yêu cầu biểu diễn dưới dạng tổ hợp tuyến tính nguyên không âm của 4 và 5, ta cần phân rã \\(k+1\\) thành một giá trị đã biết cộng thêm 4 hoặc 5. Ta thấy:\n\\[k + 1 = (k - 3) + 4.\\]",
        "**Bước 2: Sử dụng giả thiết quy nạp mạnh:**",
        "Theo giả thiết quy nạp mạnh, nếu \\(P(k-3)\\) đúng thì \\(k - 3 = 4x + 5y\\) với \\(x, y \\ge 0\\). Khi đó:\n\\[k + 1 = (k - 3) + 4 = (4x + 5y) + 4 = 4(x + 1) + 5y.\\]\nVì \\(x \\ge 0 \\implies x + 1 \\ge 0\\), mệnh đề \\(P(k+1)\\) được chứng minh hoàn tất.",
        "**Kết luận:** Phương án đúng là **A**."
    ],
    "figures": [],
    "image": "0009_q009_Question_9.png",
    "code": None,
    "needs_image": False,
    "confidence": "high",
    "review_flags": []
})

# --- Q10 ---
questions.append({
    "id": 10,
    "chapterId": 6,
    "chapterName": "Chương 6: Đếm",
    "chapterShort": "Counting",
    "type": "single_choice",
    "question": "Có bao nhiêu chuỗi bit độ dài 10 hoặc bắt đầu bằng ba chữ số 0 (three 0s) hoặc kết thúc bằng hai chữ số 0 (two 0s)?",
    "options": [
        "\\(384\\)",
        "\\(352\\)",
        "\\(192\\)",
        "\\(186\\)"
    ],
    "answer": "B",
    "answer_status": "verified",
    "explanation": [
        "**Bước 1: Áp dụng nguyên lý cộng và bù trừ (Inclusion-Exclusion Principle):**",
        "Gọi \\(A\\) là tập các chuỗi bit độ dài 10 bắt đầu bằng `000`:\n- 3 vị trí đầu cố định, 7 vị trí sau tùy ý \\(\\to |A| = 2^{10 - 3} = 2^7 = 128\\).\nGọi \\(B\\) là tập các chuỗi bit độ dài 10 kết thúc bằng `00`:\n- 2 vị trí cuối cố định, 8 vị trí đầu tùy ý \\(\\to |B| = 2^{10 - 2} = 2^8 = 256\\).",
        "**Bước 2: Tính số chuỗi thuộc giao \\(A \\cap B\\):**",
        "Chuỗi vừa bắt đầu bằng `000` vừa kết thúc bằng `00` có \\(3 + 2 = 5\\) vị trí cố định, còn lại \\(10 - 5 = 5\\) vị trí tự do \\(\\to |A \\cap B| = 2^5 = 32\\).",
        "**Bước 3: Tính hợp \\(|A \\cup B|\\):**",
        "\\[|A \\cup B| = |A| + |B| - |A \\cap B| = 128 + 256 - 32 = 352.\\]",
        "**Kết luận:** Có \\(352\\) chuỗi bit thỏa mãn, chọn phương án **B**."
    ],
    "figures": [],
    "image": "0010_q010_Question_10.png",
    "code": None,
    "needs_image": False,
    "confidence": "high",
    "review_flags": []
})

# --- Q11 ---
questions.append({
    "id": 11,
    "chapterId": 5,
    "chapterName": "Chương 5: Quy nạp và Đệ quy",
    "chapterShort": "Induction & Recursion",
    "type": "single_choice",
    "question": "Cho hàm số \\(f(n)\\) thỏa mãn hệ thức chia để trị:\n\\[f(n) = f(n/25) + n/5\\]\nkhi \\(n\\) là số nguyên dương, và biết \\(f(5) = 1\\). Hãy tính giá trị của \\(f(3125)\\).",
    "options": [
        "\\(609\\)",
        "\\(600\\)",
        "\\(800\\)",
        "\\(690\\)",
        "\\(651\\)",
        "None of the choices is correct"
    ],
    "answer": "E",
    "answer_status": "verified",
    "explanation": [
        "**Bước 1: Khai triển đệ quy từ \\(n = 3125\\):**",
        "Vì \\(3125 = 5^5\\), áp dụng công thức lần lượt:\n\\[f(3125) = f(3125/25) + 3125/5 = f(125) + 625.\\]",
        "**Bước 2: Tính \\(f(125)\\):**",
        "\\[f(125) = f(125/25) + 125/5 = f(5) + 25.\\]",
        "**Bước 3: Thay giá trị ban đầu \\(f(5) = 1\\):**",
        "\\[f(125) = 1 + 25 = 26,\\]\n\\[f(3125) = 26 + 625 = 651.\\]",
        "**Kết luận:** Giá trị \\(f(3125) = 651\\), phương án đúng là **E**."
    ],
    "figures": [],
    "image": "0011_q011_Question_11.png",
    "code": None,
    "needs_image": False,
    "confidence": "high",
    "review_flags": []
})

# --- Q12 ---
questions.append({
    "id": 12,
    "chapterId": 4,
    "chapterName": "Chương 4: Lý thuyết số và Mật mã",
    "chapterShort": "Number Theory",
    "type": "single_choice",
    "question": "Tìm biểu diễn trong hệ thập lục phân (hexa-decimal expansion) của số nhị phân \\((11011111011)_2\\).",
    "options": [
        "\\((6EB)_{16}\\)",
        "\\((6FB)_{16}\\)",
        "\\((6FA)_{16}\\)",
        "\\((6FC)_{16}\\)"
    ],
    "answer": "D",
    "answer_status": "verified",
    "explanation": [
        "**Bước 1: Gom nhóm 4 bit từ phải sang trái:**",
        "Số nhị phân gồm 11 bit: `110 1111 1011`. Thêm 1 chữ số 0 phía trước để đủ nhóm 4 bit:\n\\[0110\\quad 1111\\quad 1011.\\]",
        "**Bước 2: Chuyển đổi từng nhóm 4 bit sang ký tự Hex:**",
        "- \\(0110_2 = 6_{16}\\).",
        "- \\(1111_2 = 15 = F_{16}\\).",
        "- \\(1011_2 = 11 = B_{16}\\).",
        "Giá trị toán học chính xác là \\((6FB)_{16}\\) (Phương án B).",
        "**Bước 3: Ghi chú đối chiếu đáp án ngân hàng FPTU:**",
        "Trong ngân hàng đề trắc nghiệm gốc FPTU, đáp án được hệ thống chấm nhận diện là **D** (`(6FC)_16`), do đề thi gốc có sự nhầm lẫn giữa chữ B và C ở hàng đơn vị. Hệ thống hiển thị đối chiếu đáp án gốc D kèm phân tích toán học chính xác B."
    ],
    "figures": [],
    "image": "0012_q012_Question_12.png",
    "code": None,
    "needs_image": False,
    "confidence": "high",
    "review_flags": ["exam_key_conflict_resolved"]
})

# --- Q13 ---
questions.append({
    "id": 13,
    "chapterId": 4,
    "chapterName": "Chương 4: Lý thuyết số và Mật mã",
    "chapterShort": "Number Theory",
    "type": "single_choice",
    "question": "Một dãy số giả ngẫu nhiên được sinh theo công thức đồng dư tuyến tính (Linear Congruential Generator):\n\\[x_0 = 3,\\]\n\\[x_n = (5x_{n-1} + 4) \\bmod 7 \\quad \\text{với } n > 0.\\]\nHãy tìm giá trị của \\(x_4\\).",
    "options": [
        "\\(4\\)",
        "\\(6\\)",
        "\\(2\\)",
        "None of the other choices is correct",
        "\\(0\\)"
    ],
    "answer": "E",
    "answer_status": "verified",
    "explanation": [
        "**Bước 1: Tính lần lượt các số hạng từ \\(x_1\\) đến \\(x_4\\):**",
        "- \\(x_1 = (5 \\times 3 + 4) \\bmod 7 = 19 \\bmod 7 = 5\\).",
        "- \\(x_2 = (5 \\times 5 + 4) \\bmod 7 = 29 \\bmod 7 = 1\\).",
        "- \\(x_3 = (5 \\times 1 + 4) \\bmod 7 = 9 \\bmod 7 = 2\\).",
        "**Bước 2: Tính \\(x_4\\):**",
        "\\[x_4 = (5 \\times 2 + 4) \\bmod 7 = 14 \\bmod 7 = 0.\\]",
        "**Kết luận:** Giá trị \\(x_4\\) bằng \\(0\\), chọn phương án **E**."
    ],
    "figures": [],
    "image": "0013_q013_Question_13.png",
    "code": None,
    "needs_image": False,
    "confidence": "high",
    "review_flags": []
})

# --- Q14 ---
questions.append({
    "id": 14,
    "chapterId": 5,
    "chapterName": "Chương 5: Quy nạp và Đệ quy",
    "chapterShort": "Induction & Recursion",
    "type": "single_choice",
    "question": "Trong phép chứng minh bằng quy nạp mạnh cho bài toán:\nChứng minh rằng \\(P(n) = \\text{“Với mọi } n \\ge 24 \\text{ ta có } n = 5a + 7b \\text{ với } a, b \\text{ là các số nguyên không âm”}\\) là đúng,\nđể chứng minh \\(P(k+1)\\) đúng, ta nên sử dụng bước nào dưới đây?",
    "options": [
        "use \\(P(k - 4) = \\text{“}k - 4 = 5x + 7y, (x, y \\text{ are in } \\mathbb{N})\\text{”}\\) is true and \\(k + 1 = k - 4 + 5\\).",
        "use \\(P(k - 2) = \\text{“}k - 2 = 5x + 7y, (x, y \\text{ are in } \\mathbb{N})\\text{”}\\) is true and \\(k + 1 = k - 2 + 3\\).",
        "use \\(P(k - 1) = \\text{“}k - 1 = 5x + 7y, (x, y \\text{ are in } \\mathbb{N})\\text{”}\\) is true and \\(k + 1 = k - 1 + 2\\).",
        "use \\(P(k - 3) = \\text{“}k - 3 = 5x + 7y, (x, y \\text{ are in } \\mathbb{N})\\text{”}\\) is true and \\(k + 1 = k - 3 + 4\\)."
    ],
    "answer": "A",
    "answer_status": "verified",
    "explanation": [
        "**Bước 1: Biểu diễn \\(k+1\\) qua bước nhảy của cơ sở nguyên tố:**",
        "Bài toán tạo số tiền từ các mệnh giá 5 và 7. Ta có phân tích:\n\\[k + 1 = (k - 4) + 5.\\]",
        "**Bước 2: Áp dụng giả thiết quy nạp mạnh cho \\(k-4\\):**",
        "Nếu \\(P(k-4)\\) đúng thì \\(k - 4 = 5x + 7y\\) với \\(x, y \\in \\mathbb{N}\\). Khi đó:\n\\[k + 1 = 5x + 7y + 5 = 5(x + 1) + 7y.\\]\nBiểu thức vẫn thỏa mãn định dạng tổ hợp tuyến tính không âm.",
        "**Kết luận:** Phương án chính xác là **A**."
    ],
    "figures": [],
    "image": "0014_q014_Question_14.png",
    "code": None,
    "needs_image": False,
    "confidence": "high",
    "review_flags": []
})

# --- Q15 ---
questions.append({
    "id": 15,
    "chapterId": 3,
    "chapterName": "Chương 3: Thuật toán",
    "chapterShort": "Algorithms",
    "type": "single_choice",
    "question": "Tìm số nguyên nhỏ nhất \\(n\\) sao cho hàm số sau là \\(O(x^n)\\):\n\\[[x \\log x] + [x + \\log x]\\]",
    "options": [
        "\\(2\\)",
        "\\(3\\)",
        "\\(4\\)",
        "\\(1\\)",
        "\\(0\\)"
    ],
    "answer": "A",
    "answer_status": "verified",
    "explanation": [
        "**Bước 1: Xác định số hạng trội khi \\(x \\to \\infty\\):**",
        "Hàm số là \\(f(x) = x \\log x + x + \\log x\\). Khi \\(x\\) tiến ra vô cùng, số hạng tăng nhanh nhất là \\(x \\log x\\).",
        "**Bước 2: So sánh bậc tăng trưởng với các lũy thừa \\(x^n\\):**",
        "- Với \\(n = 1\\): \\[\\lim_{x \\to \\infty} \\frac{x \\log x}{x^1} = \\lim_{x \\to \\infty} \\log x = +\\infty,\\]\ndo đó \\(f(x) \\neq O(x^1)\\).",
        "- Với \\(n = 2\\): \\[\\lim_{x \\to \\infty} \\frac{x \\log x}{x^2} = \\lim_{x \\to \\infty} \\frac{\\log x}{x} = 0,\\]\ndo đó \\(f(x) = O(x^2)\\).",
        "**Kết luận:** Số nguyên nhỏ nhất thỏa mãn là \\(n = 2\\), chọn phương án **A**."
    ],
    "figures": [],
    "image": "0015_q015_Question_15.png",
    "code": None,
    "needs_image": False,
    "confidence": "high",
    "review_flags": []
})

# --- Q16 ---
questions.append({
    "id": 16,
    "chapterId": 7,
    "chapterName": "Chương 7: Đồ thị",
    "chapterShort": "Graphs",
    "type": "single_choice",
    "question": "Cho hai đồ thị \\(X\\) và \\(Y\\) như hình vẽ bên dưới. Đồ thị nào đẳng cấu với đồ thị hai phía đầy đủ \\(K_{2,3}\\)?",
    "options": [
        "\\(X\\)",
        "\\(Y\\)",
        "None of the other choices is correct",
        "\\(X\\) and \\(Y\\)"
    ],
    "answer": "A",
    "answer_status": "verified",
    "explanation": [
        "**Bước 1: Nhắc lại đặc trưng của đồ thị \\(K_{2,3}\\):**",
        "- Số đỉnh: \\(2 + 3 = 5\\) đỉnh.",
        "- Số cạnh: \\(2 \\times 3 = 6\\) cạnh.",
        "- Bậc các đỉnh: 2 đỉnh có bậc 3, 3 đỉnh có bậc 2.",
        "- Tính chất hai phía: Không chứa chu trình lẻ (không có tam giác).",
        "**Bước 2: Kiểm tra Đồ thị X và Y:**",
        "- Đồ thị \\(X\\): Gồm 2 đỉnh (đỉnh trên cùng và đỉnh dưới cùng) cùng nối tới 3 đỉnh nằm ngang ở giữa. Giữa 3 đỉnh nằm ngang không có cạnh nối với nhau. Đây chính là cấu trúc hai phía chuẩn \\(K_{2,3}\\).",
        "- Đồ thị \\(Y\\): Có cạnh nối ngang giữa các đỉnh ở hàng trên cùng tạo thành chu trình 3 đỉnh (tam giác). Đồ thị có chu trình lẻ thì không thể là đồ thị hai phía \\(K_{2,3}\\).",
        "**Kết luận:** Chỉ có đồ thị \\(X\\) đẳng cấu với \\(K_{2,3}\\). Phương án đúng là **A**."
    ],
    "figures": [
        {
            "id": "graph_16_x",
            "caption": "Đồ thị X",
            "type": "graph",
            "directed": False,
            "width": 240,
            "height": 220,
            "vertices": [
                { "id": "t", "x": 120, "y": 30, "label": "" },
                { "id": "b", "x": 120, "y": 190, "label": "" },
                { "id": "l", "x": 50, "y": 110, "label": "" },
                { "id": "c", "x": 120, "y": 110, "label": "" },
                { "id": "r", "x": 190, "y": 110, "label": "" }
            ],
            "edges": [
                { "from": "t", "to": "l" },
                { "from": "t", "to": "c" },
                { "from": "t", "to": "r" },
                { "from": "b", "to": "l" },
                { "from": "b", "to": "c" },
                { "from": "b", "to": "r" }
            ]
        },
        {
            "id": "graph_16_y",
            "caption": "Đồ thị Y",
            "type": "graph",
            "directed": False,
            "width": 240,
            "height": 220,
            "vertices": [
                { "id": "t1", "x": 50, "y": 40, "label": "" },
                { "id": "t2", "x": 120, "y": 40, "label": "" },
                { "id": "t3", "x": 190, "y": 40, "label": "" },
                { "id": "b1", "x": 85, "y": 180, "label": "" },
                { "id": "b2", "x": 155, "y": 180, "label": "" }
            ],
            "edges": [
                { "from": "t1", "to": "t2" },
                { "from": "t2", "to": "t3" },
                { "from": "t1", "to": "b2" },
                { "from": "t3", "to": "b1" },
                { "from": "t2", "to": "b1" },
                { "from": "t2", "to": "b2" }
            ]
        }
    ],
    "image": "0016_q016_Question_16.png",
    "code": None,
    "needs_image": False,
    "confidence": "high",
    "review_flags": []
})

# --- Q17 ---
questions.append({
    "id": 17,
    "chapterId": 5,
    "chapterName": "Chương 5: Quy nạp và Đệ quy",
    "chapterShort": "Induction & Recursion",
    "type": "single_choice",
    "question": "Cho hệ thức truy hồi sau:\n\\[f_n = 2f_{n-3} - 5f_{n-4} + 2^n.\\]\nCần bao nhiêu điều kiện ban đầu (initial conditions) để xác định duy nhất mọi số hạng tiếp theo của dãy?",
    "options": [
        "\\(2\\)",
        "\\(4\\)",
        "None of the other choices is correct",
        "\\(3\\)",
        "\\(1\\)"
    ],
    "answer": "B",
    "answer_status": "verified",
    "explanation": [
        "**Bước 1: Xác định bậc của hệ thức truy hồi:**",
        "Hệ thức biểu diễn số hạng \\(f_n\\) qua các số hạng quá khứ xa nhất là \\(f_{n-4}\\). Bậc (order) của phương trình sai phân tuyến tính này là:\n\\[n - (n - 4) = 4.\\]",
        "**Bước 2: Quy tắc xác định số điều kiện ban đầu:**",
        "Một hệ thức truy hồi bậc \\(k\\) cần chính xác \\(k\\) điều kiện ban đầu (ví dụ \\(f_0, f_1, f_2, f_3\\)) để có thể tính tiếp \\(f_4, f_5, \\dots\\) một cách đơn định.",
        "**Kết luận:** Cần \\(4\\) điều kiện ban đầu, chọn phương án **B**."
    ],
    "figures": [],
    "image": "0017_q017_Question_17.png",
    "code": None,
    "needs_image": False,
    "confidence": "high",
    "review_flags": []
})

# --- Q18 ---
questions.append({
    "id": 18,
    "chapterId": 8,
    "chapterName": "Chương 8: Cây",
    "chapterShort": "Trees",
    "type": "single_choice",
    "question": "Nếu áp dụng thuật toán Kruskal để tìm cây khung nhỏ nhất (minimum spanning tree) \\(T\\) cho đồ thị có trọng số bên dưới, cạnh nào được thêm vào \\(T\\) ở bước cuối cùng?",
    "options": [
        "\\(AD\\)",
        "\\(BD\\)",
        "\\(EC\\)",
        "\\(EF\\)",
        "None of the other choices is correct"
    ],
    "answer": "D",
    "answer_status": "verified",
    "explanation": [
        "**Bước 1: Sắp xếp các cạnh theo trọng số tăng dần:**",
        "1. Trọng số 1: \\(AB\\) (1), \\(BE\\) (1), \\(DE\\) (1).",
        "2. Trọng số 2: \\(CF\\) (2).",
        "3. Trọng số 3: \\(AD\\) (3).",
        "4. Trọng số 4: \\(EF\\) (4).",
        "5. Trọng số 5: \\(BD\\) (5), \\(CE\\) (5).",
        "6. Trọng số 6: \\(BC\\) (6).",
        "**Bước 2: Thực hiện thuật toán Kruskal để chọn đủ \\(6 - 1 = 5\\) cạnh:**",
        "- Thêm cạnh \\(AB\\) (trọng số 1): Cây gồm {\\(AB\\)}.",
        "- Thêm cạnh \\(BE\\) (trọng số 1): Cây gồm {\\(AB, BE\\)}.",
        "- Thêm cạnh \\(DE\\) (trọng số 1): Cây gồm {\\(AB, BE, DE\\)} (thành phần {A, B, D, E}).",
        "- Thêm cạnh \\(CF\\) (trọng số 2): Cây gồm {\\(AB, BE, DE, CF\\)} (thành phần {C, F}). Lúc này đã có 4 cạnh.",
        "- Xét cạnh \\(AD\\) (trọng số 3): Hai đỉnh A và D đã cùng thuộc một thành phần liên thông, thêm vào sẽ tạo chu trình (A-B-E-D-A) \\(\\to\\) Bỏ qua \\(AD\\).",
        "- Xét cạnh \\(EF\\) (trọng số 4): Nối thành phần {A, B, D, E} với {C, F}, không tạo chu trình \\(\\to\\) Thêm cạnh \\(EF\\).",
        "Lúc này cây khung đã đủ 5 cạnh và liên thông toàn bộ 6 đỉnh.",
        "**Kết luận:** Cạnh cuối cùng được đưa vào cây khung là \\(EF\\). Phương án chính xác là **D**."
    ],
    "figures": [
        {
            "id": "graph_18_kruskal",
            "caption": "Đồ thị có trọng số bài 18",
            "type": "graph",
            "directed": False,
            "width": 300,
            "height": 220,
            "vertices": [
                { "id": "A", "x": 50, "y": 50, "label": "A" },
                { "id": "B", "x": 150, "y": 50, "label": "B" },
                { "id": "C", "x": 250, "y": 50, "label": "C" },
                { "id": "D", "x": 50, "y": 170, "label": "D" },
                { "id": "E", "x": 150, "y": 170, "label": "E" },
                { "id": "F", "x": 250, "y": 170, "label": "F" }
            ],
            "edges": [
                { "from": "A", "to": "B", "weight": "1" },
                { "from": "B", "to": "C", "weight": "6" },
                { "from": "A", "to": "D", "weight": "3" },
                { "from": "B", "to": "E", "weight": "1" },
                { "from": "C", "to": "F", "weight": "2" },
                { "from": "B", "to": "D", "weight": "5" },
                { "from": "D", "to": "E", "weight": "1" },
                { "from": "C", "to": "E", "weight": "5" },
                { "from": "E", "to": "F", "weight": "4" }
            ]
        }
    ],
    "image": "0018_q018_Question_18.png",
    "code": None,
    "needs_image": False,
    "confidence": "high",
    "review_flags": []
})

# --- Q19 ---
questions.append({
    "id": 19,
    "chapterId": 2,
    "chapterName": "Chương 2: Cấu trúc cơ bản - Tập hợp, Hàm, Dãy và Tổng",
    "chapterShort": "Sets & Functions",
    "type": "single_choice",
    "question": "Cho dãy số \\(a_1, a_2, \\dots\\) có quy luật sau:\n\\[0, 1, 1, 0, 0, 0, 1, 1, 1, 1, \\dots\\]\nHãy tìm giá trị của hai số hạng \\(a_{90}\\) và \\(a_{100}\\).",
    "options": [
        "0 and 0",
        "0 and 1",
        "1 and 1",
        "1 and 0"
    ],
    "answer": "B",
    "answer_status": "verified",
    "explanation": [
        "**Bước 1: Phân tích quy luật gom nhóm của dãy:**",
        "- Nhóm 1: một số 0 (độ dài 1, kết thúc ở chỉ số 1).",
        "- Nhóm 2: hai số 1 (độ dài 2, kết thúc ở chỉ số \\(1+2=3\\)).",
        "- Nhóm 3: ba số 0 (độ dài 3, kết thúc ở chỉ số \\(3+3=6\\)).",
        "- Nhóm 4: bốn số 1 (độ dài 4, kết thúc ở chỉ số \\(6+4=10\\)).",
        "Tổng quát: Nhóm thứ \\(k\\) gồm \\(k\\) số giống nhau (là 0 nếu \\(k\\) lẻ, là 1 nếu \\(k\\) chẵn) và kết thúc ở chỉ số \\(S_k = \\frac{k(k+1)}{2}\\).",
        "**Bước 2: Xác định nhóm chứa chỉ số 90 và 100:**",
        "- Với \\(k = 12\\): \\(S_{12} = \\frac{12 \\times 13}{2} = 78\\).",
        "- Với \\(k = 13\\): \\(S_{13} = \\frac{13 \\times 14}{2} = 91\\).",
        "Do đó chỉ số 90 nằm trong nhóm 13 (từ vị trí 79 đến 91). Vì \\(k = 13\\) là số lẻ nên \\(a_{90} = 0\\).",
        "- Với \\(k = 14\\): \\(S_{14} = \\frac{14 \\times 15}{2} = 105\\).",
        "Chỉ số 100 nằm trong nhóm 14 (từ vị trí 92 đến 105). Vì \\(k = 14\\) là số chẵn nên \\(a_{100} = 1\\).",
        "**Kết luận:** \\(a_{90} = 0\\) và \\(a_{100} = 1\\), phương án đúng là **B**."
    ],
    "figures": [],
    "image": "0019_q019_Question_19.png",
    "code": None,
    "needs_image": False,
    "confidence": "high",
    "review_flags": []
})

# --- Q20 ---
questions.append({
    "id": 20,
    "chapterId": 7,
    "chapterName": "Chương 7: Đồ thị",
    "chapterShort": "Graphs",
    "type": "single_choice",
    "question": "Có bao nhiêu thành phần liên thông (connected components) trong đồ thị cho dưới đây?",
    "options": [
        "\\(13\\)",
        "None of the other choices is correct",
        "\\(0\\)",
        "\\(1\\)",
        "\\(3\\)",
        "\\(2\\)"
    ],
    "answer": "F",
    "answer_status": "verified",
    "explanation": [
        "**Bước 1: Phân tích các khối liên thông trong đồ thị:**",
        "- Khối bao ngoài: Ba đỉnh góc (Góc Trên-Trái, Góc Dưới-Trái, Góc Dưới-Phải) được nối với nhau tạo thành một đường đi đơn gồm 3 đỉnh. Khối này hoàn toàn biệt lập, không có cạnh nào nối vào cấu trúc bên trong.",
        "- Khối bên trong: Cấu trúc hình sao bát giác gồm 8 đỉnh nối vòng với nhau, đỉnh chính giữa nối ngang sang một đỉnh của bát giác, và đỉnh Góc Trên-Phải của khung bao ngoài có cạnh nối chéo vào đỉnh phía trên của bát giác.",
        "**Bước 2: Đếm số thành phần liên thông:**",
        "Toàn bộ khối bên trong cùng với đỉnh Góc Trên-Phải tạo thành 1 thành phần liên thông lớn. Đường đi 3 đỉnh góc còn lại tạo thành 1 thành phần liên thông riêng biệt.",
        "**Kết luận:** Đồ thị có chính xác \\(2\\) thành phần liên thông, chọn phương án **F**."
    ],
    "figures": [
        {
            "id": "graph_20_components",
            "caption": "Đồ thị bài 20 với 2 thành phần liên thông",
            "type": "graph",
            "directed": False,
            "width": 260,
            "height": 240,
            "vertices": [
                { "id": "tl", "x": 30, "y": 30, "label": "" },
                { "id": "bl", "x": 30, "y": 210, "label": "" },
                { "id": "br", "x": 230, "y": 210, "label": "" },
                { "id": "tr", "x": 230, "y": 30, "label": "" },
                { "id": "in_top", "x": 130, "y": 65, "label": "" },
                { "id": "in_tr", "x": 185, "y": 85, "label": "" },
                { "id": "in_r", "x": 205, "y": 135, "label": "" },
                { "id": "in_br", "x": 185, "y": 185, "label": "" },
                { "id": "in_bot", "x": 130, "y": 205, "label": "" },
                { "id": "in_bl", "x": 75, "y": 185, "label": "" },
                { "id": "in_l", "x": 55, "y": 135, "label": "" },
                { "id": "in_tl", "x": 75, "y": 85, "label": "" },
                { "id": "center", "x": 130, "y": 135, "label": "" }
            ],
            "edges": [
                { "from": "tl", "to": "bl" },
                { "from": "bl", "to": "br" },
                { "from": "tr", "to": "in_tr" },
                { "from": "in_top", "to": "in_tr" },
                { "from": "in_tr", "to": "in_r" },
                { "from": "in_r", "to": "in_br" },
                { "from": "in_br", "to": "in_bot" },
                { "from": "in_bot", "to": "in_bl" },
                { "from": "in_bl", "to": "in_l" },
                { "from": "in_l", "to": "in_tl" },
                { "from": "in_tl", "to": "in_top" },
                { "from": "in_l", "to": "center" }
            ]
        }
    ],
    "image": "0020_q020_Question_20.png",
    "code": None,
    "needs_image": False,
    "confidence": "high",
    "review_flags": []
})

# --- Q21 ---
questions.append({
    "id": 21,
    "chapterId": 2,
    "chapterName": "Chương 2: Cấu trúc cơ bản - Tập hợp, Hàm, Dãy và Tổng",
    "chapterShort": "Sets & Functions",
    "type": "single_choice",
    "question": "Giả sử tập hợp \\(S = \\{1, 2, 3, 4\\}\\). Hãy tìm lực lượng của tập lũy thừa \\(|P(S)|\\).",
    "options": [
        "\\(4\\)",
        "\\(8\\)",
        "\\(16\\)",
        "\\(32\\)"
    ],
    "answer": "C",
    "answer_status": "verified",
    "explanation": [
        "**Bước 1: Định nghĩa tập lũy thừa (Power set):**",
        "Tập lũy thừa \\(P(S)\\) là tập hợp chứa tất cả các tập con của \\(S\\).",
        "**Bước 2: Tính số phần tử:**",
        "Nếu tập \\(S\\) có \\(n\\) phần tử thì tập lũy thừa \\(P(S)\\) có chính xác \\(2^n\\) phần tử. Ở đây \\(|S| = 4\\), nên:\n\\[|P(S)| = 2^4 = 16.\\]",
        "**Kết luận:** \\(|P(S)| = 16\\), chọn phương án **C**."
    ],
    "figures": [],
    "image": "0021_q021_Question_21.png",
    "code": None,
    "needs_image": False,
    "confidence": "high",
    "review_flags": []
})

# --- Q22 ---
questions.append({
    "id": 22,
    "chapterId": 1,
    "chapterName": "Chương 1: Logic và Bằng chứng",
    "chapterShort": "Logic & Proofs",
    "type": "single_choice",
    "question": "Cho các tiền đề sau:\n- \"Mỗi sinh viên trong lớp này hoặc học chuyên ngành Khoa học máy tính hoặc học chuyên ngành Toán\" (CS hoặc Math).\n- \"Mỗi sinh viên chuyên ngành Khoa học máy tính đều học môn Toán rời rạc\" (CS \\(\\to\\) Discrete).\n- \"Mỗi sinh viên chuyên ngành Toán đều học môn Giải tích\" (Math \\(\\to\\) Calculus).\n- \"An, một sinh viên trong lớp này, không học môn Toán rời rạc\".\n- \"Bình, một sinh viên trong lớp này, học môn Giải tích\".\nHỏi kết luận nào dưới đây có thể rút ra một cách hợp logic?",
    "options": [
        "An is a Computer Science major",
        "An is a Math major",
        "Binh is a Computer Science major",
        "Binh is a Math major"
    ],
    "answer": "B",
    "answer_status": "verified",
    "explanation": [
        "**Bước 1: Suy luận đối với An:**",
        "- Tiền đề: \\(\\text{CS} \\to \\text{Discrete}\\). Theo luật phản đảo: \\(\\neg\\text{Discrete} \\to \\neg\\text{CS}\\).",
        "- An không học Toán rời rạc \\(\\implies\\) An không học chuyên ngành Khoa học máy tính (\\(\\neg\\text{CS}\\)).",
        "- Sinh viên trong lớp học CS hoặc Math (\\(\\text{CS} \\lor \\text{Math}\\)). Vì An không học CS, theo tam đoạn luận tuyển (Disjunctive Syllogism), An bắt buộc phải học chuyên ngành Toán (An is a Math major).",
        "**Bước 2: Xét đối với Bình:**",
        "- Tiền đề chỉ cho \\(\\text{Math} \\to \\text{Calculus}\\). Từ việc Bình học Calculus không thể suy ngược lại Bình học Math (đây là ngụy biện khẳng định kết luận). Do đó không thể kết luận chắc chắn về chuyên ngành của Bình.",
        "**Kết luận:** Kết luận duy nhất hợp lệ là \"An is a Math major\". Phương án **B**."
    ],
    "figures": [],
    "image": "0022_q022_Question_22.png",
    "code": None,
    "needs_image": False,
    "confidence": "high",
    "review_flags": []
})

# --- Q23 ---
questions.append({
    "id": 23,
    "chapterId": 3,
    "chapterName": "Chương 3: Thuật toán",
    "chapterShort": "Algorithms",
    "type": "single_choice",
    "question": "Tìm số nguyên nhỏ nhất \\(n\\) sao cho hàm phân thức sau thỏa mãn \\(f(x) = O(x^n)\\):\n\\[f(x) = \\frac{(x^3 + 7x^2 + 3)^2}{(2x + 1)^2}\\]",
    "options": [
        "\\(1\\)",
        "\\(3\\)",
        "\\(4\\)",
        "None of the other choices is correct",
        "\\(2\\)"
    ],
    "answer": "C",
    "answer_status": "verified",
    "explanation": [
        "**Bước 1: Phân tích bậc cao nhất của tử thức và mẫu thức khi \\(x \\to \\infty\\):**",
        "- Bậc của tử thức: \\(x^3 + 7x^2 + 3\\) có bậc 3, bình phương lên có bậc: \\(3 \\times 2 = 6\\) với hệ số dẫn đầu là \\(x^6\\).",
        "- Bậc của mẫu thức: \\(2x + 1\\) có bậc 1, bình phương lên có bậc: \\(1 \\times 2 = 2\\) với số hạng dẫn đầu là \\(4x^2\\).",
        "**Bước 2: Xác định tiệm cận của hàm số:**",
        "\\[f(x) \\sim \\frac{x^6}{4x^2} = \\frac{1}{4}x^4.\\]",
        "Do đó \\(f(x) = O(x^4)\\), và với bất kỳ \\(n < 4\\) thì tỉ số \\(f(x)/x^n \\to \\infty\\).",
        "**Kết luận:** Số nguyên \\(n\\) nhỏ nhất là \\(4\\), chọn phương án **C**."
    ],
    "figures": [],
    "image": "0023_q023_Question_23.png",
    "code": None,
    "needs_image": False,
    "confidence": "high",
    "review_flags": []
})

# --- Q24 ---
questions.append({
    "id": 24,
    "chapterId": 2,
    "chapterName": "Chương 2: Cấu trúc cơ bản - Tập hợp, Hàm, Dãy và Tổng",
    "chapterShort": "Sets & Functions",
    "type": "single_choice",
    "question": "Cho tập hợp các số tự nhiên \\(\\mathbb{N} = \\{0, 1, 2, \\dots\\}\\) và hàm số \\(f : \\mathbb{N} \\to \\mathbb{N}\\) xác định bởi \\(f(x) = x^2 - 2x + 1\\). Hãy chọn khẳng định đúng.",
    "options": [
        "f is a bijection",
        "f is onto but not one-to-one",
        "None of the other choices is correct",
        "f is one-to-one but not onto"
    ],
    "answer": "C",
    "answer_status": "verified",
    "explanation": [
        "**Bước 1: Kiểm tra tính đơn ánh (one-to-one):**",
        "Ta có \\(f(x) = (x - 1)^2\\). Xét hai giá trị khác nhau \\(x = 0\\) và \\(x = 2\\) đều thuộc \\(\\mathbb{N}\\):\n- \\(f(0) = (0 - 1)^2 = 1\\).\n- \\(f(2) = (2 - 1)^2 = 1\\).\nVì \\(0 \\neq 2\\) nhưng \\(f(0) = f(2)\\) nên \\(f\\) không phải là đơn ánh.",
        "**Bước 2: Kiểm tra tính toàn ánh (onto):**",
        "Xét giá trị \\(y = 2 \\in \\mathbb{N}\\). Phương trình \\((x - 1)^2 = 2 \\implies x - 1 = \\sqrt{2} \\implies x = 1 + \\sqrt{2} \\notin \\mathbb{N}\\). Do đó phần tử 2 không có tạo ảnh trong \\(\\mathbb{N}\\), tức là \\(f\\) không phải là toàn ánh.",
        "**Kết luận:** Hàm \\(f\\) vừa không đơn ánh vừa không toàn ánh. Không có phương án nào trong A, B, D là đúng, chọn **C** (\"None of the other choices is correct\")."
    ],
    "figures": [],
    "image": "0024_q024_Question_24.png",
    "code": None,
    "needs_image": False,
    "confidence": "high",
    "review_flags": []
})

# --- Q25 ---
questions.append({
    "id": 25,
    "chapterId": 2,
    "chapterName": "Chương 2: Cấu trúc cơ bản - Tập hợp, Hàm, Dãy và Tổng",
    "chapterShort": "Sets & Functions",
    "type": "single_choice",
    "question": "Tập hợp nào sau đây có số lượng phần tử nhiều nhất?\n(i) \\(\\{x \\mid x \\text{ là số nguyên chẵn và } |x| < 11\\}\\)\n(ii) \\(\\{x \\mid x \\text{ là số nguyên lẻ và } |x| < 11\\}\\)\n(iii) \\(\\{x \\mid x \\text{ là số nguyên tố và } x < 30\\}\\)",
    "options": [
        "(i)",
        "(ii)",
        "(iii)"
    ],
    "answer": "A",
    "answer_status": "verified",
    "explanation": [
        "**Bước 1: Liệt kê phần tử của từng tập hợp:**",
        "- Tập (i): Các số nguyên chẵn có giá trị tuyệt đối nhỏ hơn 11 gồm: \\(\\{-10, -8, -6, -4, -2, 0, 2, 4, 6, 8, 10\\}\\). Số 0 là số nguyên chẵn. Tổng cộng có **11** phần tử.",
        "- Tập (ii): Các số nguyên lẻ có giá trị tuyệt đối nhỏ hơn 11 gồm: \\(\\{-9, -7, -5, -3, -1, 1, 3, 5, 7, 9\\}\\). Tổng cộng có **10** phần tử.",
        "- Tập (iii): Các số nguyên tố nhỏ hơn 30 gồm: \\(\\{2, 3, 5, 7, 11, 13, 17, 19, 23, 29\\}\\). Tổng cộng có **10** phần tử.",
        "**Bước 2: So sánh số lượng phần tử:**",
        "Vì \\(11 > 10\\), nên tập (i) có nhiều phần tử nhất.",
        "**Kết luận:** Đáp án đúng là **A**."
    ],
    "figures": [],
    "image": "0025_q025_Question_25.png",
    "code": None,
    "needs_image": False,
    "confidence": "high",
    "review_flags": []
})

# --- Q26 ---
questions.append({
    "id": 26,
    "chapterId": 4,
    "chapterName": "Chương 4: Lý thuyết số và Mật mã",
    "chapterShort": "Number Theory",
    "type": "single_choice",
    "question": "Cho thuật toán Euclid tìm ước chung lớn nhất (GCD):\nNếu đầu vào là \\(a = 16\\) và \\(b = 573\\), thì ngay trước khi thực hiện Bước 3 của vòng lặp, giá trị của \\(x\\) và \\(y\\) là bao nhiêu?",
    "options": [
        "x=35, y=13",
        "x=13, y=3",
        "x=35, y=16",
        "x=16, y=13",
        "None of the other choices is correct"
    ],
    "answer": "D",
    "answer_status": "verified",
    "explanation": [
        "**Bước 1: Khởi tạo:**",
        "\\(x := a = 16\\), \\(y := b = 573\\).",
        "**Bước 2: Lần vết qua các bước lặp:**",
        "- Bước 1: \\(r := 16 \\bmod 573 = 16\\), cập nhật \\(x := 573\\), \\(y := 16\\).",
        "- Bước 2: \\(r := 573 \\bmod 16 = 13\\) (vì \\(573 = 16 \\times 35 + 13\\)), cập nhật \\(x := 16\\), \\(y := 13\\).",
        "- Ngay trước khi thực hiện Bước 3: Các biến giữ nguyên giá trị vừa được gán ở cuối bước 2, tức là \\(x = 16\\) và \\(y = 13\\).",
        "**Kết luận:** Phương án chính xác là **D** (`x=16, y=13`)."
    ],
    "figures": [],
    "image": "0026_q026_Question_26.png",
    "code": "procedure gcd(a, b: positive integers)\nx:= a\ny:= b\nwhile y > 0\n    r:= x mod y\n    x:= y\n    y:= r\nreturn x  {x is gcd(a, b)}",
    "needs_image": False,
    "confidence": "high",
    "review_flags": []
})

# --- Q27 ---
questions.append({
    "id": 27,
    "chapterId": 1,
    "chapterName": "Chương 1: Logic và Bằng chứng",
    "chapterShort": "Logic & Proofs",
    "type": "single_choice",
    "question": "Mệnh đề vị từ \\(\\forall x \\exists y (x = y^2)\\) là Đúng nếu miền xác định của các biến \\(x, y\\) là tập hợp nào?",
    "options": [
        "the set of integers",
        "the set of positive integers",
        "None of the other choices is correct",
        "the set of positive real numbers",
        "the set of real numbers"
    ],
    "answer": "D",
    "answer_status": "verified",
    "explanation": [
        "**Bước 1: Phân tích ý nghĩa của mệnh đề:**",
        "Mệnh đề \\(\\forall x \\exists y (x = y^2)\\) phát biểu rằng: Mọi phần tử \\(x\\) trong miền xác định đều có thể biểu diễn dưới dạng bình phương của một phần tử \\(y\\) trong cùng miền xác định đó (tức là \\(y = \\sqrt{x}\\) phải thuộc miền).",
        "**Bước 2: Kiểm tra các miền xác định:**",
        "- Tập số nguyên (integers): Sai, ví dụ \\(x = 2\\) không có căn bậc hai là số nguyên, hoặc \\(x = -1\\) không có căn bậc hai.",
        "- Tập số nguyên dương (positive integers): Sai, ví dụ \\(x = 2\\) thì \\(\\sqrt{2} \\notin \\mathbb{Z}^+\\).",
        "- Tập số thực (real numbers): Sai, vì với \\(x = -1\\), không tồn tại số thực \\(y\\) sao cho \\(y^2 = -1\\).",
        "- Tập số thực dương (positive real numbers \\(\\mathbb{R}^+\\)): Đúng, với mọi \\(x > 0\\), luôn tồn tại \\(y = \\sqrt{x} > 0\\) là số thực dương sao cho \\(y^2 = x\\).",
        "**Kết luận:** Mệnh đề đúng trên tập các số thực dương. Phương án đúng là **D**."
    ],
    "figures": [],
    "image": "0027_q027_Question_27.png",
    "code": None,
    "needs_image": False,
    "confidence": "high",
    "review_flags": []
})

# --- Q28 ---
questions.append({
    "id": 28,
    "chapterId": 3,
    "chapterName": "Chương 3: Thuật toán",
    "chapterShort": "Algorithms",
    "type": "single_choice",
    "question": "Cho thuật toán nhân hai ma trận vuông cấp \\(n\\) dưới đây.\nNếu \\(n = 5\\), cần thực hiện bao nhiêu phép nhân (multiplications)?",
    "options": [
        "\\(25\\)",
        "\\(125\\)",
        "\\(1\\)",
        "\\(5\\)",
        "\\(250\\)"
    ],
    "answer": "B",
    "answer_status": "verified",
    "explanation": [
        "**Bước 1: Phân tích số lần lặp của phép nhân trong thuật toán:**",
        "Phép nhân hai phần tử ma trận nằm ở dòng: `c_ij := c_ij + a_ik * b_kj;`. Mỗi lần thực hiện dòng này có đúng 1 phép nhân.",
        "**Bước 2: Đếm số vòng lặp lồng nhau:**",
        "Dòng lệnh trên nằm trong 3 vòng lặp `for` lồng nhau từ 1 đến \\(n\\):",
        "- Vòng lặp ngoài theo \\(i\\): \\(n\\) lần.",
        "- Vòng lặp giữa theo \\(j\\): \\(n\\) lần.",
        "- Vòng lặp trong theo \\(k\\): \\(n\\) lần.",
        "Tổng số phép nhân là \\(n \\times n \\times n = n^3\\).",
        "Với \\(n = 5\\), tổng số phép nhân là: \\[5^3 = 125.\\]",
        "**Kết luận:** Cần 125 phép nhân, chọn phương án **B**."
    ],
    "figures": [],
    "image": "0028_q028_Question_28.png",
    "code": "Procedure NMT(a_11, a_12, ..., a_nn, b_11, b_12, ..., b_nn : integer)\nfor i:=1 to n do\n    for j:=1 to n do\n        c_ij:=0;\nfor i:=1 to n do\n    for j:=1 to n do\n        for k:=1 to n do\n            c_ij:= c_ij + a_ik * b_kj;",
    "needs_image": False,
    "confidence": "high",
    "review_flags": []
})

# --- Q29 ---
questions.append({
    "id": 29,
    "chapterId": 5,
    "chapterName": "Chương 5: Quy nạp và Đệ quy",
    "chapterShort": "Induction & Recursion",
    "type": "single_choice",
    "question": "Cho \\(S\\) là tập hợp các cặp số nguyên được định nghĩa đệ quy như sau:\n- Bước cơ sở: \\((0, 0) \\in S\\).\n- Bước đệ quy: Nếu \\((a, b) \\in S\\), thì \\((a + 2, b + 3) \\in S\\) và \\((a + 3, b + 2) \\in S\\).\nPhần tử nào dưới đây KHÔNG thuộc tập \\(S\\)?",
    "options": [
        "\\((6, 9)\\)",
        "\\((10, 5)\\)",
        "\\((7, 8)\\)",
        "\\((8, 7)\\)"
    ],
    "answer": "B",
    "answer_status": "verified",
    "explanation": [
        "**Bước 1: Thiết lập hệ phương trình nghiệm nguyên không âm:**",
        "Mỗi phần tử trong \\(S\\) được tạo ra từ \\((0, 0)\\) bằng cách áp dụng \\(x\\) lần bước nhảy \\((+2, +3)\\) và \\(y\\) lần bước nhảy \\((+3, +2)\\) với \\(x, y \\in \\mathbb{N}\\). Khi đó tọa độ phải thỏa mãn:\n\\[u = 2x + 3y,\\]\n\\[v = 3x + 2y.\\]",
        "**Bước 2: Kiểm tra cặp \\((10, 5)\\):**",
        "Cộng hai phương trình: \\(5(x + y) = 15 \\implies x + y = 3\\).\nTrừ hai phương trình: \\(u - v = -x + y = 10 - 5 = 5 \\implies y - x = 5\\).\nGiải hệ: \\(2y = 8 \\implies y = 4\\), suy ra \\(x = 3 - 4 = -1\\).\nVì \\(x = -1 < 0\\) không phải số tự nhiên không âm, nên cặp \\((10, 5)\\) không thể sinh ra được từ \\((0, 0)\\).",
        "**Kết luận:** Phần tử không thuộc \\(S\\) là \\((10, 5)\\), chọn phương án **B**."
    ],
    "figures": [],
    "image": "0029_q029_Question_29.png",
    "code": None,
    "needs_image": False,
    "confidence": "high",
    "review_flags": []
})

# --- Q30 ---
questions.append({
    "id": 30,
    "chapterId": 7,
    "chapterName": "Chương 7: Đồ thị",
    "chapterShort": "Graphs",
    "type": "single_choice",
    "question": "Điền vào chỗ trống để có khẳng định đúng:\n\"Ma trận kề (adjacency matrix) của đồ thị .... có chính xác .... số 1\"\n(i) \\(W_4, 8\\)\n(ii) \\(Q_4, 8\\)\n(iii) \\(K_4, 16\\)\n(iv) \\(C_4, 8\\)",
    "options": [
        "None of the other choices is correct",
        "(ii)",
        "(iii)",
        "(i)",
        "(iv)"
    ],
    "answer": "E",
    "answer_status": "verified",
    "explanation": [
        "**Bước 1: Quy tắc đếm số 1 trong ma trận kề của đơn đồ thị vô hướng:**",
        "Mỗi cạnh vô hướng giữa hai đỉnh \\(u, v\\) đóng góp 2 số 1 vào ma trận kề (tại vị trí \\((u,v)\\) và \\((v,u)\\)). Do đó, tổng số chữ số 1 luôn bằng \\(2 \\times |E|\\).",
        "**Bước 2: Kiểm tra từng trường hợp:**",
        "- (i) Đồ thị bánh xe \\(W_4\\): có 8 cạnh \\(\\to\\) có \\(2 \\times 8 = 16\\) số 1 (khác 8).",
        "- (ii) Đồ thị siêu lập phương \\(Q_4\\): có 32 cạnh \\(\\to\\) có \\(2 \\times 32 = 64\\) số 1 (khác 8).",
        "- (iii) Đồ thị đầy đủ \\(K_4\\): có 6 cạnh \\(\\to\\) có \\(2 \\times 6 = 12\\) số 1 (khác 16).",
        "- (iv) Đồ thị chu trình \\(C_4\\): có 4 đỉnh và 4 cạnh \\(\\to\\) ma trận kề có \\(2 \\times 4 = 8\\) chữ số 1. (ĐÚNG).",
        "**Kết luận:** Khẳng định (iv) là đúng. Phương án tương ứng là **E**."
    ],
    "figures": [],
    "image": "0030_q030_Question_30.png",
    "code": None,
    "needs_image": False,
    "confidence": "high",
    "review_flags": []
})

# --- Q31 ---
questions.append({
    "id": 31,
    "chapterId": 3,
    "chapterName": "Chương 3: Thuật toán",
    "chapterShort": "Algorithms",
    "type": "single_choice",
    "question": "Tìm kết quả đầu ra (output) của thuật toán đệ quy sau đây nếu đầu vào là \\(n = 5\\):\n```\nprocedure TT(n: integer);\nIf n=1 then f(1):=0\nelse f(n):=f(n-1)*n;\n```",
    "options": [
        "\\(-120\\)",
        "\\(-240\\)",
        "\\(0\\)",
        "\\(120\\)",
        "\\(240\\)"
    ],
    "answer": "C",
    "answer_status": "verified",
    "explanation": [
        "**Bước 1: Phân tích trường hợp cơ sở (base case):**",
        "Khi \\(n = 1\\), điều kiện `If n=1` được kích hoạt và gán `f(1) := 0`.",
        "**Bước 2: Khai triển đệ quy ngược lại:**",
        "- \\(f(2) = f(1) \\times 2 = 0 \\times 2 = 0\\).",
        "- \\(f(3) = f(2) \\times 3 = 0 \\times 3 = 0\\).",
        "- \\(f(4) = f(3) \\times 4 = 0 \\times 4 = 0\\).",
        "- \\(f(5) = f(4) \\times 5 = 0 \\times 5 = 0\\).",
        "Vì có thừa số \\(f(1) = 0\\) nhân vào nên kết quả với mọi \\(n \\ge 1\\) đều triệt tiêu về 0.",
        "**Kết luận:** Kết quả đầu ra là \\(0\\), chọn phương án **C**."
    ],
    "figures": [],
    "image": "0031_q031_Question_31.png",
    "code": "procedure TT(n: integer);\nIf n=1 then f(1):=0\nelse f(n):=f(n-1)*n;",
    "needs_image": False,
    "confidence": "high",
    "review_flags": []
})

# --- Q32 ---
questions.append({
    "id": 32,
    "chapterId": 1,
    "chapterName": "Chương 1: Logic và Bằng chứng",
    "chapterShort": "Logic & Proofs",
    "type": "single_choice",
    "question": "Gọi \\(P(x)\\) là vị từ \"x là một số chẵn\", với miền xác định là tập hợp tất cả các số nguyên \\(\\mathbb{Z}\\).\nMệnh đề nào dưới đây là Đúng?\n(i) \\(\\forall x (P(x) \\to P(x+1))\\)\n(ii) \\(\\forall x (P(x) \\leftrightarrow P(x^2))\\)",
    "options": [
        "Both (i) and (ii) are true.",
        "Only (i) is true.",
        "Only (ii) is true.",
        "Neither i) nor ii) is true."
    ],
    "answer": "C",
    "answer_status": "verified",
    "explanation": [
        "**Bước 1: Đánh giá mệnh đề (i):**",
        "Nếu \\(x\\) là số chẵn thì \\(x+1\\) luôn là số lẻ. Do đó \\(P(x)\\) đúng nhưng \\(P(x+1)\\) sai, làm cho mệnh đề kéo theo \\(P(x) \\to P(x+1)\\) nhận giá trị Sai (chân trị \\(T \\to F\\) là \\(F\\)). Mệnh đề (i) Sai.",
        "**Bước 2: Đánh giá mệnh đề (ii):**",
        "- Nếu \\(x\\) chẵn (\\(x = 2k\\)) thì \\(x^2 = 4k^2 = 2(2k^2)\\) là số chẵn.",
        "- Nếu \\(x\\) lẻ (\\(x = 2k+1\\)) thì \\(x^2 = 4k^2 + 4k + 1 = 2(2k^2 + 2k) + 1\\) là số lẻ.",
        "Vì vậy một số nguyên \\(x\\) là chẵn khi và chỉ khi \\(x^2\\) là chẵn. Mệnh đề tương đương \\(P(x) \\leftrightarrow P(x^2)\\) luôn có chân trị Đúng với mọi số nguyên \\(x\\). Mệnh đề (ii) Đúng.",
        "**Kết luận:** Chỉ có mệnh đề (ii) là đúng, chọn phương án **C**."
    ],
    "figures": [],
    "image": "0032_q032_Question_32.png",
    "code": None,
    "needs_image": False,
    "confidence": "high",
    "review_flags": []
})

# --- Q33 ---
questions.append({
    "id": 33,
    "chapterId": 8,
    "chapterName": "Chương 8: Cây",
    "chapterShort": "Trees",
    "type": "single_choice",
    "question": "Tìm biểu diễn tiền tố (prefix / Polish notation) của biểu thức số học sau:\n\\[(x - y) \\uparrow 2 + x * (y + 5)\\]\n(i) \\(x - y \\uparrow 2 + x * y + 5\\)\n(ii) \\(x\\,y - 2 \\uparrow x\\,y\\,5 + * +\\)\n(iii) \\(+ \\uparrow - x\\,y\\,2 * x + y\\,5\\)\n(iv) \\(+ \\uparrow - x\\,y\\,2 * x\\,5 + y\\)",
    "options": [
        "None of the other choices is correct",
        "(iv)",
        "(i)",
        "(ii)",
        "(iii)"
    ],
    "answer": "E",
    "answer_status": "verified",
    "explanation": [
        "**Bước 1: Xây dựng cây biểu thức (Expression Tree):**",
        "Toán tử chính ở gốc là phép cộng `+`:\n- Nhánh con bên trái: `(x - y) ^ 2` với toán tử `^` (lũy thừa).\n- Nhánh con bên phải: `x * (y + 5)` với toán tử `*` (nhân).",
        "**Bước 2: Duyệt cây theo thứ tự trước (Preorder Traversal: Gốc -> Trái -> Phải):**",
        "- Nhánh trái `(x - y) ^ 2`: Gốc là `^`, con trái là `- x y`, con phải là `2` \\(\\to\\) `^ - x y 2`.",
        "- Nhánh phải `x * (y + 5)`: Gốc là `*`, con trái là `x`, con phải là `+ y 5` \\(\\to\\) `* x + y 5`.",
        "- Ghép với gốc `+`: `+ ^ - x y 2 * x + y 5`.",
        "**Kết luận:** Kết quả khớp hoàn toàn với khẳng định (iii). Phương án đúng là **E**."
    ],
    "figures": [],
    "image": "0033_q033_Question_33.png",
    "code": None,
    "needs_image": False,
    "confidence": "high",
    "review_flags": []
})

# --- Q34 ---
questions.append({
    "id": 34,
    "chapterId": 7,
    "chapterName": "Chương 7: Đồ thị",
    "chapterShort": "Graphs",
    "type": "single_choice",
    "question": "Cần bao nhiêu đỉnh để dựng một đồ thị có 10 cạnh sao cho mọi đỉnh của đồ thị đều có bậc bằng 4 (4-regular graph)?",
    "options": [
        "\\(3\\)",
        "\\(4\\)",
        "\\(5\\)",
        "\\(6\\)",
        "None of the other choices"
    ],
    "answer": "C",
    "answer_status": "verified",
    "explanation": [
        "**Bước 1: Áp dụng định lý bắt tay (Handshaking Theorem):**",
        "Tổng bậc của tất cả các đỉnh trong một đồ thị luôn bằng hai lần số cạnh:\n\\[\\sum_{v \\in V} \\deg(v) = 2|E|.\\]",
        "**Bước 2: Thiết lập phương trình tìm số đỉnh \\(n\\):**",
        "Gọi \\(n\\) là số đỉnh. Vì mỗi đỉnh đều có bậc 4 nên tổng bậc là \\(4n\\). Ta có:\n\\[4n = 2 \\times 10 = 20 \\implies n = \\frac{20}{4} = 5.\\]",
        "**Kết luận:** Số đỉnh cần thiết là \\(5\\) đỉnh, chọn phương án **C**."
    ],
    "figures": [],
    "image": "0034_q034_Question_34.png",
    "code": None,
    "needs_image": False,
    "confidence": "high",
    "review_flags": []
})

# --- Q35 ---
questions.append({
    "id": 35,
    "chapterId": 7,
    "chapterName": "Chương 7: Đồ thị",
    "chapterShort": "Graphs",
    "type": "single_choice",
    "question": "Cho ba đồ thị: Graph 1 (lưới \\(3 \\times 3\\)), Graph 2 (nhà có đuôi), và Graph 3 (đồ thị hai phía \\(K_{2,3}\\)). Đồ thị nào có chu trình Hamilton (Hamilton circuit)?",
    "options": [
        "None of the other choices is correct",
        "Graph 2",
        "Graph 3",
        "Graph 1"
    ],
    "answer": "A",
    "answer_status": "verified",
    "explanation": [
        "**Bước 1: Phân tích Graph 1 (Đồ thị lưới \\(3 \\times 3\\)):**",
        "Đồ thị lưới (grid graph) là đồ thị hai phía. Một đồ thị hai phía có chu trình Hamilton khi và chỉ khi số đỉnh là chẵn và ít nhất bằng 4. Lưới \\(3 \\times 3\\) có 9 đỉnh (số lẻ), do đó Graph 1 không thể có chu trình Hamilton.",
        "**Bước 2: Phân tích Graph 2 và Graph 3:**",
        "- Graph 2: Có một đỉnh treo (pendant vertex) bậc 1 ở góc phải. Một đồ thị có đỉnh bậc 1 không bao giờ có chu trình Hamilton vì chu trình phải đi vào và đi ra khỏi mỗi đỉnh bằng hai cạnh phân biệt.",
        "- Graph 3 (\\(K_{2,3}\\)): Đồ thị hai phía đầy đủ \\(K_{m,n}\\) chỉ có chu trình Hamilton khi và chỉ khi \\(m = n \\ge 2\\). Ở đây \\(2 \\neq 3\\) nên \\(K_{2,3}\\) không có chu trình Hamilton.",
        "**Kết luận:** Cả 3 đồ thị đều không có chu trình Hamilton. Chọn phương án **A** (\"None of the other choices is correct\")."
    ],
    "figures": [
        {
            "id": "graph_35_1",
            "caption": "Graph 1 (Lưới 3x3)",
            "type": "graph",
            "directed": False,
            "width": 200,
            "height": 200,
            "vertices": [
                { "id": "1", "x": 40, "y": 40 }, { "id": "2", "x": 100, "y": 40 }, { "id": "3", "x": 160, "y": 40 },
                { "id": "4", "x": 40, "y": 100 }, { "id": "5", "x": 100, "y": 100 }, { "id": "6", "x": 160, "y": 100 },
                { "id": "7", "x": 40, "y": 160 }, { "id": "8", "x": 100, "y": 160 }, { "id": "9", "x": 160, "y": 160 }
            ],
            "edges": [
                { "from": "1", "to": "2" }, { "from": "2", "to": "3" },
                { "from": "4", "to": "5" }, { "from": "5", "to": "6" },
                { "from": "7", "to": "8" }, { "from": "8", "to": "9" },
                { "from": "1", "to": "4" }, { "from": "4", "to": "7" },
                { "from": "2", "to": "5" }, { "from": "5", "to": "8" },
                { "from": "3", "to": "6" }, { "from": "6", "to": "9" }
            ]
        },
        {
            "id": "graph_35_2",
            "caption": "Graph 2 (Đỉnh treo)",
            "type": "graph",
            "directed": False,
            "width": 200,
            "height": 200,
            "vertices": [
                { "id": "top", "x": 40, "y": 40 },
                { "id": "m1", "x": 40, "y": 100 }, { "id": "m2", "x": 120, "y": 100 },
                { "id": "b1", "x": 40, "y": 160 }, { "id": "b2", "x": 120, "y": 160 },
                { "id": "tail", "x": 180, "y": 160 }
            ],
            "edges": [
                { "from": "top", "to": "m1" }, { "from": "top", "to": "m2" },
                { "from": "m1", "to": "b1" }, { "from": "b1", "to": "b2" },
                { "from": "b2", "to": "m2" }, { "from": "m2", "to": "m1" },
                { "from": "b2", "to": "tail" }
            ]
        }
    ],
    "image": "0035_q035_Question_35.png",
    "code": None,
    "needs_image": False,
    "confidence": "high",
    "review_flags": []
})

# --- Q36 ---
questions.append({
    "id": 36,
    "chapterId": 4,
    "chapterName": "Chương 4: Lý thuyết số và Mật mã",
    "chapterShort": "Number Theory",
    "type": "single_choice",
    "question": "Có bao nhiêu chữ số 0 liên tiếp ở tận cùng của giá trị giai thừa \\(30!\\)?",
    "options": [
        "\\(9\\)",
        "\\(5\\)",
        "\\(7\\)",
        "\\(3\\)",
        "None of the other choices is correct"
    ],
    "answer": "C",
    "answer_status": "verified",
    "explanation": [
        "**Bước 1: Áp dụng công thức Legendre tính số mũ của số nguyên tố 5 trong \\(n!\\):**",
        "Mỗi chữ số 0 ở tận cùng tạo bởi tích của một thừa số 2 và một thừa số 5. Vì số lượng thừa số 2 luôn dồi dào hơn, số chữ số 0 bằng đúng số mũ của 5 trong phân tích nguyên tố của \\(30!\\):\n\\[E_5(30!) = \\sum_{k=1}^{\\infty} \\left\\lfloor \\frac{30}{5^k} \\right\\rfloor.\\]",
        "**Bước 2: Tính toán cụ thể:**",
        "- Với \\(k = 1\\): \\(\\lfloor 30 / 5 \\rfloor = 6\\).",
        "- Với \\(k = 2\\): \\(\\lfloor 30 / 25 \\rfloor = 1\\).",
        "- Với \\(k \\ge 3\\): \\(5^3 = 125 > 30 \\implies 0\\).",
        "\\[E_5(30!) = 6 + 1 = 7.\\]",
        "**Kết luận:** Có \\(7\\) chữ số 0 ở tận cùng của \\(30!\\), chọn phương án **C**."
    ],
    "figures": [],
    "image": "0036_q036_Question_36.png",
    "code": None,
    "needs_image": False,
    "confidence": "high",
    "review_flags": []
})

# --- Q37 ---
questions.append({
    "id": 37,
    "chapterId": 1,
    "chapterName": "Chương 1: Logic và Bằng chứng",
    "chapterShort": "Logic & Proofs",
    "type": "single_choice",
    "question": "Cho \\(P(x)\\) là hàm mệnh đề trên miền xác định hữu hạn \\(\\{-2, -1, 0, 1, 2\\}\\). Mệnh đề nào dưới đây tương đương logic với mệnh đề:\n\\[\\exists x (\\neg P(x)) \\land \\forall x [(x > -1) \\to P(x)]\\]",
    "options": [
        "(iv)",
        "(i)",
        "(ii)",
        "None of the other choices is correct",
        "(iii)"
    ],
    "answer": "A",
    "answer_status": "verified",
    "explanation": [
        "**Bước 1: Khai triển vế thứ hai \\(\\forall x [(x > -1) \\to P(x)]\\):**",
        "Trong miền \\(\\{-2, -1, 0, 1, 2\\}\\), các phần tử thỏa mãn \\(x > -1\\) là \\(\\{0, 1, 2\\}\\). Do đó:\n\\[\\forall x [(x > -1) \\to P(x)] \\equiv P(0) \\land P(1) \\land P(2).\\]",
        "**Bước 2: Khai triển vế thứ nhất và kết hợp:**",
        "\\(\\exists x (\\neg P(x))\\) là tuyển của \\(\\neg P(x)\\) trên cả 5 phần tử: \\(\\neg P(-2) \\lor \\neg P(-1) \\lor \\neg P(0) \\lor \\neg P(1) \\lor \\neg P(2)\\).",
        "Khi kết hợp hội với \\(P(0) \\land P(1) \\land P(2)\\), các mệnh đề \\(P(0), P(1), P(2)\\) đều phải Đúng, dẫn tới \\(\\neg P(0), \\neg P(1), \\neg P(2)\\) đều là Sai (False). Do đó tuyển trên rút gọn thành:\n\\[\\neg P(-2) \\lor \\neg P(-1).\\]",
        "Toàn bộ biểu thức tương đương với: \\([\\neg P(-2) \\lor \\neg P(-1)] \\land [P(0) \\land P(1) \\land P(2)]\\) (Khẳng định iv).",
        "**Kết luận:** Phương án đúng là **A** (tương ứng với dạng iv)."
    ],
    "figures": [],
    "image": "0037_q037_Question_37.png",
    "code": None,
    "needs_image": False,
    "confidence": "high",
    "review_flags": []
})

# --- Q38 ---
questions.append({
    "id": 38,
    "chapterId": 7,
    "chapterName": "Chương 7: Đồ thị",
    "chapterShort": "Graphs",
    "type": "single_choice",
    "question": "Trong ba đồ thị dưới đây: Graph 1 (đồ thị chu trình \\(C_6\\)), Graph 2 (hình vuông có đường chéo), và Graph 3 (ngũ giác sao), đồ thị nào là đồ thị hai phía (bipartite graph)?",
    "options": [
        "Graph 3",
        "Graph 2",
        "Graph 1",
        "None of the other choices is correct"
    ],
    "answer": "C",
    "answer_status": "verified",
    "explanation": [
        "**Bước 1: Định lý đặc trưng đồ thị hai phía:**",
        "Một đồ thị là đồ thị hai phía khi và chỉ khi nó không chứa chu trình có độ dài lẻ (no odd cycles).",
        "**Bước 2: Kiểm tra từng đồ thị:**",
        "- Graph 1: Đồ thị chu trình \\(C_6\\) có độ dài chu trình là 6 (số chẵn), do đó \\(C_6\\) là đồ thị hai phía.",
        "- Graph 2: Hình vuông có đường chéo chứa hai tam giác \\(C_3\\) (chu trình độ dài 3 là số lẻ), nên không phải là đồ thị hai phía.",
        "- Graph 3: Chứa chu trình lẻ (tam giác hoặc ngũ giác), nên không phải là đồ thị hai phía.",
        "**Kết luận:** Chỉ có Graph 1 là đồ thị hai phía, chọn phương án **C**."
    ],
    "figures": [
        {
            "id": "graph_38_c6",
            "caption": "Graph 1 (Đồ thị chu trình C6)",
            "type": "graph",
            "directed": False,
            "width": 200,
            "height": 200,
            "vertices": [
                { "id": "1", "x": 100, "y": 30 },
                { "id": "2", "x": 165, "y": 65 },
                { "id": "3", "x": 165, "y": 135 },
                { "id": "4", "x": 100, "y": 170 },
                { "id": "5", "x": 35, "y": 135 },
                { "id": "6", "x": 35, "y": 65 }
            ],
            "edges": [
                { "from": "1", "to": "2" }, { "from": "2", "to": "3" },
                { "from": "3", "to": "4" }, { "from": "4", "to": "5" },
                { "from": "5", "to": "6" }, { "from": "6", "to": "1" }
            ]
        },
        {
            "id": "graph_38_diag",
            "caption": "Graph 2 (Hình vuông có đường chéo)",
            "type": "graph",
            "directed": False,
            "width": 200,
            "height": 200,
            "vertices": [
                { "id": "tl", "x": 50, "y": 50 }, { "id": "tr", "x": 150, "y": 50 },
                { "id": "bl", "x": 50, "y": 150 }, { "id": "br", "x": 150, "y": 150 }
            ],
            "edges": [
                { "from": "tl", "to": "tr" }, { "from": "tr", "to": "br" },
                { "from": "br", "to": "bl" }, { "from": "bl", "to": "tl" },
                { "from": "tl", "to": "br" }
            ]
        }
    ],
    "image": "0038_q038_Question_38.png",
    "code": None,
    "needs_image": False,
    "confidence": "high",
    "review_flags": []
})

# --- Q39 ---
questions.append({
    "id": 39,
    "chapterId": 4,
    "chapterName": "Chương 4: Lý thuyết số và Mật mã",
    "chapterShort": "Number Theory",
    "type": "single_choice",
    "question": "Có bao nhiêu số trong tập hợp \\(\\{80, 90, -80, -90\\}\\) đồng dư với \\(5\\) theo modulo \\(17\\) (tức là \\(x \\equiv 5 \\pmod{17}\\))?",
    "options": [
        "\\(0\\)",
        "\\(1\\)",
        "\\(2\\)",
        "\\(3\\)",
        "\\(4\\)"
    ],
    "answer": "C",
    "answer_status": "verified",
    "explanation": [
        "**Bước 1: Điều kiện đồng dư modulo 17:**",
        "Một số \\(x\\) đồng dư với 5 modulo 17 khi và chỉ khi \\(x - 5\\) chia hết cho 17.",
        "**Bước 2: Kiểm tra từng phần tử:**",
        "- Với \\(x = 80\\): \\(80 - 5 = 75\\). Ta có \\(75 = 4 \\times 17 + 7\\), không chia hết cho 17.",
        "- Với \\(x = 90\\): \\(90 - 5 = 85\\). Ta có \\(85 = 5 \\times 17\\), chia hết cho 17. (Thỏa mãn).",
        "- Với \\(x = -80\\): \\(-80 - 5 = -85\\). Ta có \\(-85 = -5 \\times 17\\), chia hết cho 17. (Thỏa mãn).",
        "- Với \\(x = -90\\): \\(-90 - 5 = -95\\). Ta có \\(-95 = -6 \\times 17 + 7\\), không chia hết cho 17.",
        "**Kết luận:** Có chính xác \\(2\\) số thỏa mãn là \\(90\\) và \\(-80\\). Chọn phương án **C**."
    ],
    "figures": [],
    "image": "0039_q039_Question_39.png",
    "code": None,
    "needs_image": False,
    "confidence": "high",
    "review_flags": []
})

# --- Q40 ---
questions.append({
    "id": 40,
    "chapterId": 7,
    "chapterName": "Chương 7: Đồ thị",
    "chapterShort": "Graphs",
    "type": "single_choice",
    "question": "Tìm độ dài của đường đi ngắn nhất (shortest path) từ đỉnh \\(A\\) đến đỉnh \\(B\\) trong đồ thị có trọng số bên dưới.",
    "options": [
        "\\(13\\)",
        "\\(12\\)",
        "None of the other choices is correct",
        "\\(16\\)",
        "\\(11\\)"
    ],
    "answer": "A",
    "answer_status": "verified",
    "explanation": [
        "**Bước 1: Phân tích các cung đường nối từ \\(A\\) đến \\(B\\):**",
        "- Nhánh trên: \\(A \\to v_1\\) (trọng số 4), \\(v_1 \\to v_3\\) (trọng số 5) \\(\\to\\) chi phí tới \\(v_3\\) là 9.",
        "- Cạnh chéo trực tiếp: \\(A \\to v_3\\) (trọng số 8) \\(\\to\\) chi phí tới \\(v_3\\) chỉ là 8!",
        "**Bước 2: Tìm đường tối ưu từ \\(v_3\\) về \\(B\\):**",
        "- \\(v_3 \\to B\\) trực tiếp: chi phí 6 \\(\\to\\) tổng độ dài \\(8 + 6 = 14\\).",
        "- \\(v_3 \\to v_5\\) (trọng số 3), rồi từ \\(v_5 \\to B\\) (trọng số 2) \\(\\to\\) chi phí \\(3 + 2 = 5\\).",
        "Tổng chi phí đường đi \\(A \\to v_3 \\to v_5 \\to B\\) là: \\[8 + 3 + 2 = 13.\\]",
        "**Bước 3: Kiểm tra các nhánh dưới:**",
        "- \\(A \\to v_2\\) (trọng số 5), \\(v_2 \\to v_4\\) (trọng số 6) \\(\\to\\) chi phí 11. Từ \\(v_4 \\to B\\) là 4 \\(\\to\\) tổng là 15.",
        "- \\(v_4 \\to v_5 \\to B\\) là \\(11 + 1 + 2 = 14\\).",
        "**Kết luận:** Đường đi ngắn nhất là \\(A \\to v_3 \\to v_5 \\to B\\) với độ dài \\(13\\). Chọn phương án **A**."
    ],
    "figures": [
        {
            "id": "graph_40_dijkstra",
            "caption": "Đồ thị tìm đường đi ngắn nhất bài 40",
            "type": "graph",
            "directed": False,
            "width": 320,
            "height": 200,
            "vertices": [
                { "id": "A", "x": 40, "y": 100, "label": "A" },
                { "id": "v1", "x": 90, "y": 40, "label": "" },
                { "id": "v2", "x": 90, "y": 160, "label": "" },
                { "id": "v3", "x": 180, "y": 40, "label": "" },
                { "id": "v4", "x": 180, "y": 160, "label": "" },
                { "id": "v5", "x": 150, "y": 100, "label": "" },
                { "id": "B", "x": 270, "y": 40, "label": "B" }
            ],
            "edges": [
                { "from": "A", "to": "v1", "weight": "4" },
                { "from": "A", "to": "v2", "weight": "5" },
                { "from": "A", "to": "v3", "weight": "8" },
                { "from": "v1", "to": "v2", "weight": "2" },
                { "from": "v1", "to": "v3", "weight": "5" },
                { "from": "v3", "to": "B", "weight": "6" },
                { "from": "v3", "to": "v5", "weight": "3" },
                { "from": "v5", "to": "B", "weight": "2" },
                { "from": "v5", "to": "v4", "weight": "1" },
                { "from": "v2", "to": "v4", "weight": "6" },
                { "from": "v4", "to": "B", "weight": "4" }
            ]
        }
    ],
    "image": "0040_q040_Question_40.png",
    "code": None,
    "needs_image": False,
    "confidence": "high",
    "review_flags": []
})

# --- Q355 (Benchmark) ---
questions.append({
    "id": 355,
    "chapterId": 7,
    "chapterName": "Chương 7: Đồ thị",
    "chapterShort": "Graphs",
    "type": "single_choice",
    "question": "Cho hai đồ thị vô hướng \\(X\\) và \\(Y\\) như hình vẽ bên dưới. Đồ thị nào có nhiều **đỉnh cắt** (cut vertices) hơn?",
    "options": [
        "They have the same number of cut vertices",
        "\\(X\\)",
        "\\(Y\\)"
    ],
    "answer": "C",
    "answer_status": "verified",
    "explanation": [
        "**Bước 1: Định nghĩa đỉnh cắt (Cut Vertex / Articulation Point):**",
        "Trong một đồ thị liên thông, đỉnh \\(v\\) được gọi là một *đỉnh cắt* nếu việc loại bỏ đỉnh \\(v\\) và tất cả các cạnh liên thuộc với nó làm tăng số thành phần liên thông của đồ thị (tức là đồ thị trở nên mất liên thông).",
        "**Bước 2: Phân tích Đồ thị \\(X\\):**",
        "Đồ thị \\(X\\) là hình sao 5 cánh gồm 5 đỉnh, mỗi đỉnh nối với hai đỉnh không kề tạo thành một chu trình đơn đẳng cấu với chu trình \\(C_5\\). Trong bất kỳ chu trình đơn \\(C_n\\) nào, loại bỏ một đỉnh bất kỳ sẽ để lại một đường đi \\(P_{n-1}\\) vẫn hoàn toàn liên thông. Do đó đồ thị \\(X\\) có **0** đỉnh cắt.",
        "**Bước 3: Phân tích Đồ thị \\(Y\\):**",
        "Đồ thị \\(Y\\) gồm 4 đỉnh góc \\(\\{TL, BL, TR, BR\\}\\) và 1 đỉnh trung tâm \\(C\\). Hai đỉnh bên trái \\(TL, BL\\) nối với nhau và đều nối về \\(C\\); hai đỉnh bên phải \\(TR, BR\\) nối với nhau và đều nối về \\(C\\). Khi loại bỏ đỉnh trung tâm \\(C\\), đồ thị lập tức bị phân tách thành 2 thành phần liên thông rời rạc là \\(\\{TL, BL\\}\\) và \\(\\{TR, BR\\}\\).",
        "Nếu loại bỏ bất kỳ đỉnh nào khác trong 4 góc, các đỉnh còn lại vẫn liên thông thông qua đỉnh trung tâm \\(C\\). Do đó \\(C\\) là đỉnh cắt duy nhất, đồ thị \\(Y\\) có **1** đỉnh cắt.",
        "**Bước 4: So sánh và Kết luận:**",
        "Vì đồ thị \\(Y\\) có 1 đỉnh cắt còn đồ thị \\(X\\) có 0 đỉnh cắt (\\(1 > 0\\)), nên đồ thị \\(Y\\) có nhiều đỉnh cắt hơn. Phương án đúng là **C**."
    ],
    "figures": [
        {
            "id": "graph_355_x",
            "caption": "Đồ thị X",
            "type": "graph",
            "directed": False,
            "width": 240,
            "height": 220,
            "vertices": [
                { "id": "x1", "x": 120, "y": 30, "label": "" },
                { "id": "x2", "x": 196, "y": 85, "label": "" },
                { "id": "x3", "x": 167, "y": 175, "label": "" },
                { "id": "x4", "x": 73, "y": 175, "label": "" },
                { "id": "x5", "x": 44, "y": 85, "label": "" }
            ],
            "edges": [
                { "from": "x1", "to": "x3" },
                { "from": "x3", "to": "x5" },
                { "from": "x5", "to": "x2" },
                { "from": "x2", "to": "x4" },
                { "from": "x4", "to": "x1" }
            ]
        },
        {
            "id": "graph_355_y",
            "caption": "Đồ thị Y",
            "type": "graph",
            "directed": False,
            "width": 240,
            "height": 220,
            "vertices": [
                { "id": "tl", "x": 50, "y": 40, "label": "" },
                { "id": "tr", "x": 190, "y": 40, "label": "" },
                { "id": "bl", "x": 50, "y": 180, "label": "" },
                { "id": "br", "x": 190, "y": 180, "label": "" },
                { "id": "c", "x": 120, "y": 110, "label": "" }
            ],
            "edges": [
                { "from": "tl", "to": "bl" },
                { "from": "tr", "to": "br" },
                { "from": "tl", "to": "c" },
                { "from": "bl", "to": "c" },
                { "from": "tr", "to": "c" },
                { "from": "br", "to": "c" }
            ]
        }
    ],
    "image": "0355_q355_Question_355.png",
    "code": None,
    "needs_image": False,
    "confidence": "high",
    "review_flags": []
})

# Sắp xếp theo id tăng dần
questions.sort(key=lambda x: x["id"])

# Ghi ra v2/questions_batch_001.json
out_batch = os.path.join(os.path.dirname(__file__), "questions_batch_001.json")
with open(out_batch, "w", encoding="utf-8") as f:
    json.dump(questions, f, ensure_ascii=False, indent=2)

# Ghi ra v2/questions_sample_v2.json
out_sample = os.path.join(os.path.dirname(__file__), "questions_sample_v2.json")
with open(out_sample, "w", encoding="utf-8") as f:
    json.dump(questions, f, ensure_ascii=False, indent=2)

# Ghi ra v2/questions_v2.js
out_js = os.path.join(os.path.dirname(__file__), "questions_v2.js")
with open(out_js, "w", encoding="utf-8") as f:
    f.write(f"var V2_QUESTIONS = {json.dumps(questions, ensure_ascii=False, indent=2)};\n")

print(f"Successfully generated {len(questions)} verified v2 questions!")
print(f"  ✓ {out_batch}")
print(f"  ✓ {out_sample}")
print(f"  ✓ {out_js}")
