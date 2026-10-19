"""
Script to build and integrate Batch 18 (Questions 681 - 720).
"""
import json
import os

BATCH_NUMBER = 18
START_ID = 681
END_ID = 720

# Load verification results
with open("v2/verification/batch_018_results.json", "r", encoding="utf-8") as f:
    verif = json.load(f)

# Load OCR mapping for image filenames
with open("scratch/batch_018_ocr.json", "r", encoding="utf-8") as f:
    ocr_data = json.load(f)

batch_18_questions = [
    {
        "id": 681,
        "question": "Số nguyên nào sau đây đồng dư với 5 theo modulo 17 (tức \\(x \\equiv 5 \\pmod{17}\\))?",
        "options": [
            "A. -29",
            "B. 80",
            "C. -122",
            "D. 103",
            "E. None of the other choices is correct"
        ],
        "answer": "A",
        "explanation": [
            "Bước 1: Hai số nguyên \\(a\\) và \\(b\\) đồng dư theo modulo 17 khi và chỉ khi hiệu \\(a - b\\) chia hết cho 17 (tức \\((a - b) \\bmod 17 = 0\\)).",
            "Bước 2: Kiểm tra từng phương án với số 5:",
            "- Với A: \\(-29 - 5 = -34 = -2 \\times 17\\), chia hết cho 17. Do đó \\(-29 \\equiv 5 \\pmod{17}\\).",
            "- Với B: \\(80 - 5 = 75\\) (không chia hết cho 17).",
            "- Với C: \\(-122 - 5 = -127\\) (không chia hết cho 17).",
            "- Với D: \\(103 - 5 = 98\\) (không chia hết cho 17).",
            "Vậy số cần tìm là -29, chọn đáp án A."
        ],
        "chapter": "Ch3_Algorithms",
        "difficulty": "easy",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_018_results.json"
    },
    {
        "id": 682,
        "question": "Cho \\(a = 137 \\bmod 31\\) và \\(b = -137 \\bmod 31\\). Tìm giá trị của \\(b - a\\).",
        "options": [
            "A. 5",
            "B. -7",
            "C. 23",
            "D. -13",
            "E. 17"
        ],
        "answer": "A",
        "explanation": [
            "Bước 1: Tính phần dư không âm theo định nghĩa toán học của toán tử mod (chia cho 31):",
            "- Với \\(a = 137 \\bmod 31\\): \\(137 = 4 \\times 31 + 13 \\implies a = 13\\).",
            "- Với \\(b = -137 \\bmod 31\\): \\(-137 = -5 \\times 31 + 18 \\implies b = 18\\).",
            "Bước 2: Tính hiệu \\(b - a\\):",
            "\\[ b - a = 18 - 13 = 5 \\]",
            "Do đó đáp án chính xác là A."
        ],
        "chapter": "Ch3_Algorithms",
        "difficulty": "easy",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_018_results.json"
    },
    {
        "id": 683,
        "question": "Một dãy số giả ngẫu nhiên được sinh theo công thức đồng dư tuyến tính như sau:\\n\\[ x_0 = 4 \\quad \\text{và} \\quad x_n = (6x_{n-1} + 5) \\bmod 13 \\quad \\text{với } n > 0 \\]\\nTìm giá trị của \\(x_4\\).",
        "options": [
            "A. 5",
            "B. 6",
            "C. 7",
            "D. 8",
            "E. None of the other choices is correct"
        ],
        "answer": "A",
        "explanation": [
            "Bước 1: Tính lần lượt các giá trị từ \\(x_1\\) đến \\(x_3\\):",
            "- \\(x_1 = (6 \\times 4 + 5) \\bmod 13 = 29 \\bmod 13 = 3\\)",
            "- \\(x_2 = (6 \\times 3 + 5) \\bmod 13 = 23 \\bmod 13 = 10\\)",
            "- \\(x_3 = (6 \\times 10 + 5) \\bmod 13 = 65 \\bmod 13 = 0\\)",
            "Bước 2: Tính \\(x_4\\):",
            "\\[ x_4 = (6 \\times 0 + 5) \\bmod 13 = 5 \\bmod 13 = 5 \\]",
            "Vậy \\(x_4 = 5\\), chọn đáp án A."
        ],
        "chapter": "Ch3_Algorithms",
        "difficulty": "easy",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_018_results.json"
    },
    {
        "id": 684,
        "question": "Cho \\(a = 137 \\div 31\\) và \\(b = -137 \\div 31\\) (trong đó phép chia \\(\\div\\) là phép chia lấy phần nguyên `div`). Tìm giá trị của \\(a + b\\).",
        "options": [
            "A. -1",
            "B. 4",
            "C. 0",
            "D. -2",
            "E. 3"
        ],
        "answer": "A",
        "explanation": [
            "Bước 1: Theo định nghĩa trong giáo trình Toán rời rạc, \\(n \\text{ div } d = \\lfloor n/d \\rfloor\\):",
            "- Với \\(a = 137 \\text{ div } 31\\): \\(\\lfloor 137 / 31 \\rfloor = \\lfloor 4.419 \\rfloor = 4\\).",
            "- Với \\(b = -137 \\text{ div } 31\\): \\(\\lfloor -137 / 31 \\rfloor = \\lfloor -4.419 \\rfloor = -5\\).",
            "Bước 2: Tính tổng \\(a + b\\):",
            "\\[ a + b = 4 + (-5) = -1 \\]",
            "Do đó chọn đáp án A."
        ],
        "chapter": "Ch3_Algorithms",
        "difficulty": "easy",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_018_results.json"
    },
    {
        "id": 685,
        "question": "Có bao nhiêu số nguyên dương nhỏ hơn 18 nguyên tố cùng nhau với 18?",
        "options": [
            "A. 6",
            "B. 7",
            "C. 8",
            "D. 9"
        ],
        "answer": "A",
        "explanation": [
            "Bước 1: Áp dụng phi hàm Euler \\(\\phi(18)\\):",
            "Phân tích tiêu chuẩn ra thừa số nguyên tố: \\(18 = 2 \\times 3^2\\).",
            "\\[ \\phi(18) = 18 \\left(1 - \\frac{1}{2}\\right)\\left(1 - \\frac{1}{3}\\right) = 18 \\times \\frac{1}{2} \\times \\frac{2}{3} = 6 \\]",
            "Bước 2: Liệt kê trực tiếp các số nguyên dương nhỏ hơn 18 không chia hết cho 2 và không chia hết cho 3:",
            "Các số đó là: 1, 5, 7, 11, 13, 17. Tổng cộng có đúng 6 số.",
            "Chọn đáp án A."
        ],
        "chapter": "Ch3_Algorithms",
        "difficulty": "easy",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_018_results.json"
    },
    {
        "id": 686,
        "question": "Tìm số nguyên dương \\(a\\) biết rằng \\(\\text{lcm}(a, 4200) = 58800\\) và \\(\\gcd(a, 4200) = 280\\).",
        "options": [
            "A. 11760",
            "B. 784",
            "C. 1960",
            "D. 3920"
        ],
        "answer": "D",
        "explanation": [
            "Bước 1: Áp dụng định lý liên hệ giữa ước chung lớn nhất và bội chung nhỏ nhất của hai số nguyên dương:",
            "\\[ a \\times b = \\gcd(a, b) \\times \\text{lcm}(a, b) \\]",
            "Bước 2: Thay các giá trị đã biết vào hệ thức:",
            "\\[ a \\times 4200 = 280 \\times 58800 \\implies a = \\frac{280 \\times 58800}{4200} = \\frac{58800}{15} = 3920 \\]",
            "Vậy \\(a = 3920\\), chọn đáp án D."
        ],
        "chapter": "Ch3_Algorithms",
        "difficulty": "easy",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_018_results.json"
    },
    {
        "id": 687,
        "question": "Chọn giá trị của \\(p\\) sao cho ba số 26, 55 và \\(p\\) đôi một nguyên tố cùng nhau (pairwise relatively prime).",
        "options": [
            "A. None of the above",
            "B. 15",
            "C. 21",
            "D. 39"
        ],
        "answer": "C",
        "explanation": [
            "Bước 1: Phân tích các số đã cho ra thừa số nguyên tố:",
            "- \\(26 = 2 \\times 13\\)",
            "- \\(55 = 5 \\times 11\\)",
            "Để ba số đôi một nguyên tố cùng nhau, số \\(p\\) không được chia sẻ bất kỳ thừa số nguyên tố nào với 26 (tức \\(p\\) không chia hết cho 2 và 13) và không được chia sẻ thừa số nào với 55 (tức \\(p\\) không chia hết cho 5 và 11).",
            "Bước 2: Kiểm tra các giá trị đề xuất:",
            "- Với \\(p = 15 = 3 \\times 5\\): chia sẻ ước 5 với 55 (loại).",
            "- Với \\(p = 39 = 3 \\times 13\\): chia sẻ ước 13 với 26 (loại).",
            "- Với \\(p = 21 = 3 \\times 7\\): nguyên tố cùng nhau với cả 26 và 55 (thỏa mãn).",
            "Do đó chọn \\(p = 21\\), tương ứng đáp án C."
        ],
        "chapter": "Ch3_Algorithms",
        "difficulty": "easy",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_018_results.json"
    },
    {
        "id": 688,
        "question": "Tìm biểu diễn trong hệ bát phân (cơ số 8) của số nhị phân \\((11011111011)_2\\).\\n(i) \\((6751)_8\\)\\n(ii) \\((6733)_8\\)\\n(iii) \\((3363)_8\\)\\n(iv) \\((3373)_8\\)",
        "options": [
            "A. (i)",
            "B. (ii)",
            "C. (iii)",
            "D. (iv)",
            "E. None of the other choices is correct"
        ],
        "answer": "D",
        "explanation": [
            "Bước 1: Gom các chữ số nhị phân thành từng nhóm 3 bit từ phải sang trái (thêm các số 0 ở đầu nếu cần):",
            "Chuỗi bit: `11 011 111 011`",
            "Thêm số 0 ở đầu thành 12 bit: `011 011 111 011`.",
            "Bước 2: Chuyển đổi từng nhóm 3 bit sang chữ số hệ bát phân:",
            "- `011` \\(= 3\\)",
            "- `011` \\(= 3\\)",
            "- `111` \\(= 7\\)",
            "- `011` \\(= 3\\)",
            "Ghép lại ta được \\((3373)_8\\). Khẳng định (iv) đúng, chọn đáp án D."
        ],
        "chapter": "Ch3_Algorithms",
        "difficulty": "easy",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_018_results.json"
    },
    {
        "id": 689,
        "question": "Tìm biểu diễn trong hệ cơ số 3 của số \\((434)_5\\).",
        "options": [
            "A. 11112",
            "B. 11002",
            "C. 11102",
            "D. 10211",
            "E. None of the other choices is correct"
        ],
        "answer": "C",
        "explanation": [
            "Bước 1: Đổi số \\((434)_5\\) sang hệ thập phân (cơ số 10):",
            "\\[ (434)_5 = 4 \\times 5^2 + 3 \\times 5^1 + 4 \\times 5^0 = 4 \\times 25 + 15 + 4 = 119_{10} \\]",
            "Bước 2: Đổi 119 sang hệ cơ số 3 bằng phép chia liên tiếp:",
            "- \\(119 \\div 3 = 39\\) dư 2",
            "- \\(39 \\div 3 = 13\\) dư 0",
            "- \\(13 \\div 3 = 4\\) dư 1",
            "- \\(4 \\div 3 = 1\\) dư 1",
            "- \\(1 \\div 3 = 0\\) dư 1",
            "Đọc các số dư từ dưới lên: \\(11102_3\\). Chọn đáp án C."
        ],
        "chapter": "Ch3_Algorithms",
        "difficulty": "easy",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_018_results.json"
    },
    {
        "id": 690,
        "question": "Nếu sử dụng thuật toán Euclid để tìm ước chung lớn nhất của 90 và 24, có bao nhiêu phép chia có dư cần được thực hiện?",
        "options": [
            "A. 3",
            "B. 2",
            "C. 4",
            "D. 5",
            "E. None of the other choices is correct"
        ],
        "answer": "A",
        "explanation": [
            "Bước 1: Thực hiện thuật toán chia Euclid từng bước:",
            "- Phép chia 1: \\(90 = 3 \\times 24 + 18\\) (số dư 18)",
            "- Phép chia 2: \\(24 = 1 \\times 18 + 6\\) (số dư 6)",
            "- Phép chia 3: \\(18 = 3 \\times 6 + 0\\) (số dư 0, thuật toán dừng)",
            "Bước 2: Đếm tổng số phép chia có dư: Đúng 3 phép chia.",
            "Do đó đáp án chính xác là A."
        ],
        "chapter": "Ch3_Algorithms",
        "difficulty": "easy",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_018_results.json"
    },
    {
        "id": 691,
        "question": "Cho biết \\(1 + 3 + \\dots + (2n - 1) = n^2\\) đúng với mọi \\(n \\ge 1\\). Trong các đẳng thức sau, đẳng thức nào là ĐÚNG trong bước quy nạp?\\n(i) \\(1 + 3 + \\dots + (2k + 1) = k^2 + (2k + 1)\\)\\n(ii) \\(1 + 3 + \\dots + (2k + 1) = k^2 + 2\\)\\n(iii) \\(1 + 3 + \\dots + (2k + 1) = 1 + 2 + \\dots + (2k - 1) + 2\\)\\n(iv) \\(1 + 3 + \\dots + (2k + 1) = (k - 1)^2 + (2k + 1)\\)",
        "options": [
            "A. (i)",
            "B. (ii)",
            "C. (iii)",
            "D. (iv)"
        ],
        "answer": "A",
        "explanation": [
            "Bước 1: Tách tổng của \\(k + 1\\) số hạng đầu tiên thành tổng của \\(k\\) số hạng đầu cộng với số hạng thứ \\(k + 1\\):",
            "\\[ 1 + 3 + \\dots + (2k - 1) + (2k + 1) = \\big(1 + 3 + \\dots + (2k - 1)\\big) + (2k + 1) \\]",
            "Bước 2: Thay giả thiết quy nạp \\(1 + 3 + \\dots + (2k - 1) = k^2\\) vào:",
            "\\[ 1 + 3 + \\dots + (2k + 1) = k^2 + (2k + 1) \\]",
            "Đẳng thức này trùng khớp với khẳng định (i). Chọn A."
        ],
        "chapter": "Ch5_Induction",
        "difficulty": "easy",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_018_results.json"
    },
    {
        "id": 692,
        "question": "Cho mệnh đề \\(P(n)\\) khẳng định rằng:\\n\\[ 1^2 + 3^2 + 5^2 + \\dots + (2n + 1)^2 = \\frac{(n + 1)(2n + 1)(2n + 3)}{3} \\]\\nvới \\(n\\) là số nguyên không âm. Giả thiết quy nạp (inductive hypothesis) trong phép chứng minh quy nạp toán học là gì?",
        "options": [
            "A. (i)",
            "B. (ii)",
            "C. (iii)",
            "D. (iv)"
        ],
        "sub_options": {
            "(i)": "P(k) is true for some integer k > 0",
            "(ii)": "P(k) is true for some integer k >= 0",
            "(iii)": "P(k + 1) is true for some integer k > 0",
            "(iv)": "P(k + 1) is true for some integer k >= 0"
        },
        "answer": "B",
        "explanation": [
            "Bước 1: Vì miền xác định của bài toán là tập các số nguyên không âm (tức \\(n \\ge 0\\)), trường hợp nhỏ nhất bắt đầu từ 0.",
            "Bước 2: Giả thiết quy nạp yêu cầu giả sử mệnh đề đúng tại một số nguyên \\(k\\) bất kỳ thuộc miền xác định, tức là \"\\(P(k)\\) is true for some integer \\(k \\ge 0\\)\".",
            "Khẳng định (ii) là phát biểu chính xác. Chọn B."
        ],
        "chapter": "Ch5_Induction",
        "difficulty": "easy",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_018_results.json"
    },
    {
        "id": 693,
        "question": "Cho mệnh đề \\(P(n)\\) khẳng định rằng:\\n\\[ 1^2 + 3^2 + 5^2 + \\dots + (2n + 1)^2 = \\frac{(n + 1)(2n + 1)(2n + 3)}{3} \\]\\nvới \\(n\\) là số nguyên không âm. Mệnh đề nào cần được chứng minh là đúng trong bước cơ sở (basis step) của phép quy nạp toán học?",
        "options": [
            "A. P(0)",
            "B. P(1)",
            "C. P(k) for all nonnegative integer k",
            "D. P(k) for some nonnegative integer k"
        ],
        "answer": "A",
        "explanation": [
            "Bước 1: Miền xác định của \\(n\\) là các số nguyên không âm (tập \\(\\mathbb{N} = \\{0, 1, 2, \\dots\\}\\)).",
            "Bước 2: Bước cơ sở (basis step) luôn kiểm tra giá trị nhỏ nhất trong miền xác định, đó là \\(n = 0\\). Do đó ta cần chứng minh \\(P(0)\\) là đúng.",
            "Chọn đáp án A."
        ],
        "chapter": "Ch5_Induction",
        "difficulty": "easy",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_018_results.json"
    },
    {
        "id": 694,
        "question": "Tìm thứ tự đúng của các bước trong phép chứng minh quy nạp cho bài toán sau:\\nBài toán: Chứng minh rằng với mọi số nguyên \\(n \\ge 12\\), \\(n\\) có thể biểu diễn dưới dạng \\(n = 4a + 5b\\) với \\(a, b\\) là các số nguyên không âm.\\n- Bước 1: Giả sử với một số \\(k \\ge 15\\), mệnh đề đúng với mọi \\(12 \\le n \\le k\\).\\n- Bước 2: Với \\(n = 12 = 4(3) + 5(0)\\), \\(n = 13 = 4(2) + 5(1)\\), \\(n = 14 = 4(1) + 5(2)\\), \\(n = 15 = 4(0) + 5(3)\\).\\n- Bước 3: Vậy với mọi \\(n \\ge 12\\), \\(n = 4a + 5b\\) với \\(a, b\\) là các số nguyên không âm.\\n- Bước 4: Với \\(n = k + 1\\), ta có \\(k + 1 = 4 + (k - 3)\\). Vì \\(12 \\le k - 3 < k\\), theo giả thiết quy nạp \\(k - 3 = 4a + 5b\\), suy ra \\(k + 1 = 4(a + 1) + 5b\\).",
        "options": [
            "A. 2, 1, 4, 3",
            "B. 1, 2, 4, 3",
            "C. 2, 1, 3, 4",
            "D. 1, 2, 3, 4"
        ],
        "answer": "A",
        "explanation": [
            "Bước 1: Trình tự logic của quy nạp mạnh:",
            "- Khởi đầu bằng việc kiểm tra các trường hợp cơ sở: Bước 2 (kiểm tra cho 12, 13, 14, 15).",
            "- Đặt giả thiết quy nạp mạnh: Bước 1.",
            "Bước 2: Thực hiện bước quy nạp suy biến từ \\(k - 3\\) sang \\(k + 1\\): Bước 4.",
            "- Đưa ra kết luận cuối cùng: Bước 3.",
            "Thứ tự chuẩn xác là 2, 1, 4, 3. Chọn đáp án A."
        ],
        "chapter": "Ch5_Induction",
        "difficulty": "easy",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_018_results.json"
    },
    {
        "id": 695,
        "question": "Cho biết \\(1^3 + 2^3 + \\dots + n^3 = \\big(n(n + 1)/2\\big)^2\\) đúng với mọi \\(n \\ge 1\\). Phương trình nào sau đây là ĐÚNG trong bước quy nạp?\\n(i) \\(1^3 + \\dots + (k + 1)^3 = \\big(k(k + 1)/2\\big)^2 + k^3\\)\\n(ii) \\(1^3 + \\dots + (k + 1)^3 = \\big(k(k + 1)/2\\big)^2 + (k + 1)^3\\)\\n(iii) \\(1^3 + \\dots + (k + 1)^3 = \\big(k(k - 1)/2\\big)^2 + (k + 1)^3\\)",
        "options": [
            "A. (i)",
            "B. (ii)",
            "C. (iii)",
            "D. None of the other choices is correct"
        ],
        "answer": "B",
        "explanation": [
            "Bước 1: Phân tích vế trái thành tổng của \\(k\\) số hạng đầu tiên cộng với số hạng thứ \\(k + 1\\):",
            "\\[ 1^3 + 2^3 + \\dots + k^3 + (k + 1)^3 = \\big(1^3 + 2^3 + \\dots + k^3\\big) + (k + 1)^3 \\]",
            "Bước 2: Thay giả thiết quy nạp \\(1^3 + \\dots + k^3 = \\big(k(k + 1)/2\\big)^2\\) vào:",
            "\\[ 1^3 + \\dots + (k + 1)^3 = \\big(k(k + 1)/2\\big)^2 + (k + 1)^3 \\]",
            "Khẳng định này trùng khớp với (ii). Chọn B."
        ],
        "chapter": "Ch5_Induction",
        "difficulty": "easy",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_018_results.json"
    },
    {
        "id": 696,
        "question": "Tìm số nguyên nhỏ nhất \\(k\\) sao cho với mọi số nguyên \\(n \\ge k\\), ta đều có thể biểu diễn \\(n = 6x + 7y\\) với \\(x, y\\) là các số nguyên không âm.",
        "options": [
            "A. 30",
            "B. 13",
            "C. 24",
            "D. 50"
        ],
        "answer": "A",
        "explanation": [
            "Bước 1: Đây là bài toán tiền xu Frobenius đối với hai số nguyên tố cùng nhau 6 và 7 (với \\(\\gcd(6, 7) = 1\\)).",
            "Số nguyên lớn nhất KHÔNG THỂ biểu diễn dưới dạng \\(6x + 7y\\) với \\(x, y \\ge 0\\) được tính theo công thức:",
            "\\[ g(6, 7) = 6 \\times 7 - 6 - 7 = 42 - 13 = 29 \\]",
            "Bước 2: Do 29 là số lớn nhất không biểu diễn được, mọi số nguyên \\(n \\ge 29 + 1 = 30\\) đều biểu diễn được.",
            "Vậy số nguyên nhỏ nhất \\(k\\) là 30. Chọn đáp án A."
        ],
        "chapter": "Ch5_Induction",
        "difficulty": "easy",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_018_results.json"
    },
    {
        "id": 697,
        "question": "Cho tập hợp \\(S\\) được định nghĩa đệ quy như sau:\\n- Bước cơ sở: \\(2 \\in S\\).\\n- Bước đệ quy: Nếu \\(x \\in S\\) thì \\(2x \\in S\\).\\nTập hợp \\(S\\) là tập hợp nào sau đây?\\n(i) \\(S = \\{2^n \\mid n = 1, 2, \\dots\\}\\)\\n(ii) \\(S = \\{2^{2n} \\mid n = 1, 2, \\dots\\}\\)\\n(iii) \\(S = \\{2n \\mid n = 1, 2, \\dots\\}\\)",
        "options": [
            "A. (i)",
            "B. (ii)",
            "C. (iii)",
            "D. None of the other choices is correct"
        ],
        "answer": "A",
        "explanation": [
            "Bước 1: Từ bước cơ sở, \\(2 = 2^1 \\in S\\).",
            "Bước 2: Áp dụng liên tiếp bước đệ quy nhân 2:",
            "- \\(x = 2 \\implies 2(2) = 2^2 = 4 \\in S\\)",
            "- \\(x = 4 \\implies 2(4) = 2^3 = 8 \\in S\\)",
            "- Quy nạp: mọi lũy thừa dương của 2 đều thuộc \\(S\\) và không có phần tử nào khác.",
            "Do đó \\(S = \\{2^n \\mid n = 1, 2, 3, \\dots\\}\\), tương ứng với khẳng định (i). Chọn A."
        ],
        "chapter": "Ch5_Induction",
        "difficulty": "easy",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_018_results.json"
    },
    {
        "id": 698,
        "question": "Cho dãy số xác định bởi \\(a_0 = 2\\) và \\(a_n = a_{n-1}^2 - 1\\) với \\(n > 0\\). Tìm giá trị của \\(a_4\\).",
        "options": [
            "A. 3968",
            "B. 63",
            "C. 2454",
            "D. 75",
            "E. None of the other choices is correct"
        ],
        "answer": "A",
        "explanation": [
            "Bước 1: Tính lần lượt các phần tử từ \\(a_1\\) đến \\(a_3\\):",
            "- \\(a_1 = 2^2 - 1 = 4 - 1 = 3\\)",
            "- \\(a_2 = 3^2 - 1 = 9 - 1 = 8\\)",
            "- \\(a_3 = 8^2 - 1 = 64 - 1 = 63\\)",
            "Bước 2: Tính \\(a_4\\):",
            "\\[ a_4 = 63^2 - 1 = 3969 - 1 = 3968 \\]",
            "Vậy \\(a_4 = 3968\\), chọn đáp án A."
        ],
        "chapter": "Ch5_Induction",
        "difficulty": "easy",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_018_results.json"
    },
    {
        "id": 699,
        "question": "Cần bao nhiêu phép so sánh giữa các phần tử để trộn hai danh sách đã sắp xếp \\([1, 3, 5, 7, 8, 10]\\) và \\([2, 4, 6, 9]\\) bằng thuật toán Merge?",
        "options": [
            "A. 6",
            "B. 7",
            "C. 8",
            "D. 9",
            "E. 10"
        ],
        "answer": "D",
        "explanation": [
            "Bước 1: Mô phỏng từng phép so sánh của thuật toán trộn:",
            "1. So sánh 1 và 2: đưa 1 ra. (1 phép so sánh)",
            "2. So sánh 3 và 2: đưa 2 ra. (2 phép so sánh)",
            "3. So sánh 3 và 4: đưa 3 ra. (3 phép so sánh)",
            "4. So sánh 5 và 4: đưa 4 ra. (4 phép so sánh)",
            "5. So sánh 5 và 6: đưa 5 ra. (5 phép so sánh)",
            "6. So sánh 7 và 6: đưa 6 ra. (6 phép so sánh)",
            "7. So sánh 7 và 9: đưa 7 ra. (7 phép so sánh)",
            "8. So sánh 8 và 9: đưa 8 ra. (8 phép so sánh)",
            "9. So sánh 10 và 9: đưa 9 ra. (9 phép so sánh)",
            "Bước 2: Lúc này danh sách thứ hai rỗng, phần tử 10 còn lại được đưa thẳng vào danh sách kết quả mà không cần so sánh thêm.",
            "Tổng số phép so sánh là 9. Chọn đáp án D."
        ],
        "chapter": "Ch3_Algorithms",
        "difficulty": "medium",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_018_results.json"
    },
    {
        "id": 700,
        "question": "Cho thuật toán đệ quy sau:\\n```\\nProcedure AL(n: integer)\\nif n = 0 then AL(n) := 1\\nelse if n = 1 then AL(n) := 2\\nelse if n = 2 then AL(n) := 3\\nelse AL(n) := AL(n - 1) * AL(n - 2) * AL(n - 3)\\n```\\nTìm giá trị của \\(AL(5)\\).",
        "options": [
            "A. 6",
            "B. 3",
            "C. 36",
            "D. 648",
            "E. None of the other choices is correct"
        ],
        "answer": "D",
        "explanation": [
            "Bước 1: Dựa vào định nghĩa các trường hợp cơ sở: \\(AL(0) = 1\\), \\(AL(1) = 2\\), \\(AL(2) = 3\\).",
            "Tính lần lượt các giá trị tiếp theo:",
            "- \\(AL(3) = AL(2) \\times AL(1) \\times AL(0) = 3 \\times 2 \\times 1 = 6\\)",
            "- \\(AL(4) = AL(3) \\times AL(2) \\times AL(1) = 6 \\times 3 \\times 2 = 36\\)",
            "Bước 2: Tính \\(AL(5)\\):",
            "\\[ AL(5) = AL(4) \\times AL(3) \\times AL(2) = 36 \\times 6 \\times 3 = 648 \\]",
            "Vậy giá trị \\(AL(5) = 648\\), chọn đáp án D."
        ],
        "chapter": "Ch5_Induction",
        "difficulty": "easy",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_018_results.json"
    },
    {
        "id": 701,
        "question": "Cho thuật toán đệ quy:\\n```\\nprocedure P(a: real number, n: positive integer)\\nif n = 1 then return 1\\nelse return a + P(a, n - 1)\\n```\\nTìm kết quả đầu ra khi \\(a = 3\\) và \\(n = 5\\).",
        "options": [
            "A. 13",
            "B. 15",
            "C. 125",
            "D. 243",
            "E. None of the other choices is correct"
        ],
        "answer": "A",
        "explanation": [
            "Bước 1: Phân tích quá trình gọi đệ quy lùi dần từ \\(n = 5\\) về cơ sở \\(n = 1\\):",
            "- \\(P(3, 1) = 1\\)",
            "- \\(P(3, 2) = 3 + P(3, 1) = 3 + 1 = 4\\)",
            "- \\(P(3, 3) = 3 + P(3, 2) = 3 + 4 = 7\\)",
            "- \\(P(3, 4) = 3 + P(3, 3) = 3 + 7 = 10\\)",
            "Bước 2: Tính \\(P(3, 5)\\):",
            "\\[ P(3, 5) = 3 + P(3, 4) = 3 + 10 = 13 \\]",
            "Tổng quát, \\(P(a, n) = (n - 1)a + 1 = 4(3) + 1 = 13\\). Chọn đáp án A."
        ],
        "chapter": "Ch5_Induction",
        "difficulty": "easy",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_018_results.json"
    },
    {
        "id": 702,
        "question": "Có bao nhiêu chuỗi gồm 3 chữ số thập phân chứa chính xác hai chữ số 4?",
        "options": [
            "A. 27",
            "B. 28",
            "C. 29",
            "D. 30"
        ],
        "answer": "A",
        "explanation": [
            "Bước 1: Chọn 2 vị trí trong 3 vị trí để đặt hai chữ số 4: có \\(\\binom{3}{2} = 3\\) cách.",
            "Bước 2: Vị trí còn lại có thể là bất kỳ chữ số thập phân nào khác 4 (từ tập \\(\\{0, 1, 2, 3, 5, 6, 7, 8, 9\\}\\)), có đúng 9 cách chọn.",
            "Tổng số chuỗi thỏa mãn là:",
            "\\[ 3 \\times 9 = 27 \\text{ chuỗi} \\]",
            "Do đó đáp án chính xác là A."
        ],
        "chapter": "Ch5_Induction",
        "difficulty": "easy",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_018_results.json"
    },
    {
        "id": 703,
        "question": "Có bao nhiêu đơn ánh (one-to-one functions) từ một tập hợp có 5 phần tử đến một tập hợp có 10 phần tử?",
        "options": [
            "A. None of the other choices is correct",
            "B. 30240",
            "C. 100000",
            "D. 50"
        ],
        "answer": "B",
        "explanation": [
            "Bước 1: Số đơn ánh từ tập miền xác định gồm \\(k\\) phần tử đến tập đích gồm \\(n\\) phần tử (với \\(n \\ge k\\)) chính là số chỉnh hợp chập \\(k\\) của \\(n\\):",
            "\\[ P(n, k) = \\frac{n!}{(n - k)!} \\]",
            "Bước 2: Thay số với \\(n = 10\\) và \\(k = 5\\):",
            "\\[ P(10, 5) = 10 \\times 9 \\times 8 \\times 7 \\times 6 = 30240 \\]",
            "Do đó đáp án chính xác là B."
        ],
        "chapter": "Ch2_BasicStructures",
        "difficulty": "easy",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_018_results.json"
    },
    {
        "id": 704,
        "question": "Cho các tập hợp \\(X = \\{\\emptyset, \\{\\emptyset\\}, \\{a, b\\}, c\\}\\) và \\(Y = \\{x, \\{z, z\\}, x\\}\\). Có bao nhiêu đơn ánh (one-to-one functions) từ \\(Y\\) đến \\(X\\)?",
        "options": [
            "A. 6",
            "B. 3",
            "C. 12",
            "D. 2",
            "E. None of the other choices is correct"
        ],
        "answer": "C",
        "explanation": [
            "Bước 1: Xác định lực lượng của hai tập hợp:",
            "- Tập \\(X\\) có 4 phần tử phân biệt: \\(\\emptyset\\), \\(\\{\\emptyset\\}\\), \\(\\{a, b\\}\\), \\(c \\implies |X| = 4\\).",
            "- Trong tập \\(Y = \\{x, \\{z, z\\}, x\\}\\), phần tử \\(x\\) bị lặp lại và \\(\\{z, z\\} = \\{z\\}\\). Do đó tập \\(Y\\) thực chất chỉ có 2 phần tử phân biệt là \\(x\\) và \\(\\{z\\} \\implies |Y| = 2\\).",
            "Bước 2: Số đơn ánh từ tập có 2 phần tử đến tập có 4 phần tử là chỉnh hợp:",
            "\\[ P(4, 2) = 4 \\times 3 = 12 \\]",
            "Do đó chọn đáp án C."
        ],
        "chapter": "Ch2_BasicStructures",
        "difficulty": "medium",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_018_results.json"
    },
    {
        "id": 705,
        "question": "Có bao nhiêu số nguyên dương không vượt quá 200 chia hết cho 3 hoặc 5?",
        "options": [
            "A. 80",
            "B. 106",
            "C. 90",
            "D. None of the other choices is correct",
            "E. 93"
        ],
        "answer": "E",
        "explanation": [
            "Bước 1: Áp dụng nguyên lý bù trừ (Principle of Inclusion-Exclusion):",
            "- Số các số chia hết cho 3: \\(\\lfloor 200 / 3 \\rfloor = 66\\).",
            "- Số các số chia hết cho 5: \\(\\lfloor 200 / 5 \\rfloor = 40\\).",
            "- Số các số chia hết cho cả 3 và 5 (tức chia hết cho \\(\\text{lcm}(3, 5) = 15\\)): \\(\\lfloor 200 / 15 \\rfloor = 13\\).",
            "Bước 2: Tính tổng số phần tử hợp:",
            "\\[ |A_3 \\cup A_5| = 66 + 40 - 13 = 93 \\]",
            "Do đó đáp án chính xác là E."
        ],
        "chapter": "Ch5_Induction",
        "difficulty": "easy",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_018_results.json"
    },
    {
        "id": 706,
        "question": "Cho dãy số \\(\\{a_n\\}\\) thỏa mãn hệ thức truy hồi \\(a_n = a_{n-1} + 3^n\\) với \\(n = 1, 2, \\dots\\) và điều kiện ban đầu \\(a_0 = -1\\). Tìm giá trị của \\(a_5\\).",
        "options": [
            "A. 358",
            "B. 360",
            "C. 362",
            "D. 364",
            "E. None of the other choices is correct"
        ],
        "answer": "C",
        "explanation": [
            "Bước 1: Khai triển hệ thức truy hồi thành tổng cấp số nhân:",
            "\\[ a_n = a_0 + \\sum_{k=1}^n 3^k = -1 + 3\\left(\\frac{3^n - 1}{3 - 1}\\right) = -1 + \\frac{3(3^n - 1)}{2} \\]",
            "Bước 2: Thay \\(n = 5\\) vào biểu thức:",
            "\\[ a_5 = -1 + \\frac{3(3^5 - 1)}{2} = -1 + \\frac{3(243 - 1)}{2} = -1 + \\frac{3 \\times 242}{2} = -1 + 363 = 362 \\]",
            "Vậy \\(a_5 = 362\\), chọn đáp án C."
        ],
        "chapter": "Ch5_Induction",
        "difficulty": "easy",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_018_results.json"
    },
    {
        "id": 707,
        "question": "Cho dãy số \\(\\{a_n\\}\\) thỏa mãn hệ thức truy hồi \\(a_n = a_{n-1} + 3^n\\) với \\(n = 2, 3, \\dots\\) và điều kiện ban đầu \\(a_1 = 1\\). Tìm giá trị của \\(a_4\\).",
        "options": [
            "A. 112",
            "B. 118",
            "C. 114",
            "D. 116",
            "E. None of the other choices is correct"
        ],
        "answer": "B",
        "explanation": [
            "Bước 1: Tính lần lượt các phần tử từ \\(a_2\\) đến \\(a_4\\):",
            "- \\(a_2 = a_1 + 3^2 = 1 + 9 = 10\\)",
            "- \\(a_3 = a_2 + 3^3 = 10 + 27 = 37\\)",
            "Bước 2: Tính \\(a_4\\):",
            "\\[ a_4 = a_3 + 3^4 = 37 + 81 = 118 \\]",
            "Vậy \\(a_4 = 118\\), chọn đáp án B."
        ],
        "chapter": "Ch5_Induction",
        "difficulty": "easy",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_018_results.json"
    },
    {
        "id": 708,
        "question": "Cho dãy số xác định bởi công thức tường minh \\(a_n = 2^n + 4(3^n) + n\\) với \\(n = 0, 1, 2, \\dots\\). Tìm các giá trị \\(a_0, a_2\\) và \\(a_4\\).",
        "options": [
            "A. 5, 42, 344",
            "B. 5, 42, 430",
            "C. None of the other choices is correct",
            "D. 5, 36, 344",
            "E. 5, 36, 430"
        ],
        "answer": "A",
        "explanation": [
            "Bước 1: Tính \\(a_0\\) và \\(a_2\\):",
            "- \\(a_0 = 2^0 + 4(3^0) + 0 = 1 + 4(1) + 0 = 5\\).",
            "- \\(a_2 = 2^2 + 4(3^2) + 2 = 4 + 4(9) + 2 = 4 + 36 + 2 = 42\\).",
            "Bước 2: Tính \\(a_4\\):",
            "\\[ a_4 = 2^4 + 4(3^4) + 4 = 16 + 4(81) + 4 = 16 + 324 + 4 = 344 \\]",
            "Bộ ba giá trị là 5, 42, 344. Chọn đáp án A."
        ],
        "chapter": "Ch5_Induction",
        "difficulty": "easy",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_018_results.json"
    },
    {
        "id": 709,
        "question": "Có bao nhiêu chuỗi nhị phân độ dài 5 chứa ít nhất hai số 1 đứng cạnh nhau (consecutive 1s)?",
        "options": [
            "A. 18",
            "B. 19",
            "C. 22",
            "D. 16",
            "E. 24"
        ],
        "answer": "B",
        "explanation": [
            "Bước 1: Tổng số chuỗi nhị phân độ dài 5 là \\(2^5 = 32\\).",
            "Bước 2: Đếm số chuỗi KHÔNG chứa hai số 1 đứng cạnh nhau (theo dãy Fibonacci):",
            "- Độ dài 1: 2 chuỗi (0, 1)",
            "- Độ dài 2: 3 chuỗi (00, 01, 10)",
            "- Độ dài 3: 5 chuỗi",
            "- Độ dài 4: 8 chuỗi",
            "- Độ dài 5: 13 chuỗi",
            "Số chuỗi chứa ít nhất hai số 1 đứng cạnh nhau là:",
            "\\[ 32 - 13 = 19 \\text{ chuỗi} \\]",
            "Do đó chọn đáp án B."
        ],
        "chapter": "Ch5_Induction",
        "difficulty": "easy",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_018_results.json"
    },
    {
        "id": 710,
        "question": "Tìm \\(f(2)\\) và \\(f(4)\\) biết hàm \\(f\\) thỏa mãn hệ thức truy hồi \\(f(n) = 3f(n - 1) + 6\\) và điều kiện \\(f(3) = 18\\).",
        "options": [
            "A. f(2) = 4, f(4) = 54",
            "B. f(2) = 6, f(4) = 54",
            "C. f(2) = 4, f(4) = 60",
            "D. f(2) = 6, f(4) = 60",
            "E. None of the other choices is correct"
        ],
        "answer": "C",
        "explanation": [
            "Bước 1: Từ phương trình truy hồi tại \\(n = 3\\):",
            "\\[ f(3) = 3f(2) + 6 \\implies 18 = 3f(2) + 6 \\implies 3f(2) = 12 \\implies f(2) = 4 \\]",
            "Bước 2: Tính \\(f(4)\\) theo công thức truy hồi tại \\(n = 4\\):",
            "\\[ f(4) = 3f(3) + 6 = 3(18) + 6 = 54 + 6 = 60 \\]",
            "Vậy \\(f(2) = 4\\) và \\(f(4) = 60\\), chọn đáp án C."
        ],
        "chapter": "Ch5_Induction",
        "difficulty": "easy",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_018_results.json"
    },
    {
        "id": 711,
        "question": "Một cặp thỏ con (gồm một đực, một cái) được thả lên một hòn đảo. Một cặp thỏ không sinh sản cho đến khi đủ 2 tháng tuổi. Sau khi đủ 2 tháng tuổi, mỗi tháng chúng sẽ sinh ra thêm 2 cặp thỏ con. Hỏi sau 6 tháng có bao nhiêu cặp thỏ trên đảo?",
        "options": [
            "A. 21",
            "B. 11",
            "C. 34",
            "D. 57"
        ],
        "answer": "A",
        "explanation": [
            "Bước 1: Thiết lập hệ thức truy hồi: Số cặp thỏ ở tháng thứ \\(n\\) gồm số cặp thỏ tháng trước \\(r_{n-1}\\) cộng với 2 cặp thỏ con sinh ra từ mỗi cặp thỏ đã trưởng thành từ tháng \\(n-2\\):",
            "\\[ r_n = r_{n-1} + 2r_{n-2} \\]",
            "Điều kiện ban đầu: \\(r_1 = 1\\), \\(r_2 = 1\\).",
            "Bước 2: Tính lần lượt qua từng tháng:",
            "- Tháng 3: \\(r_3 = r_2 + 2r_1 = 1 + 2(1) = 3\\)",
            "- Tháng 4: \\(r_4 = r_3 + 2r_2 = 3 + 2(1) = 5\\)",
            "- Tháng 5: \\(r_5 = r_4 + 2r_3 = 5 + 2(3) = 11\\)",
            "- Tháng 6: \\(r_6 = r_5 + 2r_4 = 11 + 2(5) = 21\\)",
            "Vậy sau 6 tháng có 21 cặp thỏ, chọn đáp án A."
        ],
        "chapter": "Ch5_Induction",
        "difficulty": "medium",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_018_results.json"
    },
    {
        "id": 712,
        "question": "Dãy số nào sau đây KHÔNG thỏa mãn hệ thức truy hồi tuyến tính \\(a_n = -3a_{n-1} + 4a_{n-2}\\)?\\n(i) \\(a_n = (-4)^n\\)\\n(ii) \\(a_n = 1\\)",
        "options": [
            "A. (i)",
            "B. (ii)",
            "C. (i) and (ii)",
            "D. None of the other choices is correct"
        ],
        "answer": "D",
        "explanation": [
            "Bước 1: Phương trình đặc trưng của hệ thức truy hồi là:",
            "\\[ r^2 + 3r - 4 = 0 \\iff (r - 1)(r + 4) = 0 \\iff r_1 = 1, \\, r_2 = -4 \\]",
            "Nghiệm tổng quát có dạng \\(a_n = c_1 (1)^n + c_2 (-4)^n\\).",
            "Bước 2: Kiểm tra:",
            "- Dãy (i) \\(a_n = (-4)^n\\) tương ứng với \\(c_1 = 0, c_2 = 1\\), là nghiệm hợp lệ.",
            "- Dãy (ii) \\(a_n = 1 = 1^n\\) tương ứng với \\(c_1 = 1, c_2 = 0\\), là nghiệm hợp lệ.",
            "Vì cả hai dãy đều thỏa mãn hệ thức truy hồi, không có dãy nào vi phạm. Do đó chọn đáp án D (None of the other choices is correct)."
        ],
        "chapter": "Ch5_Induction",
        "difficulty": "easy",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_018_results.json"
    },
    {
        "id": 713,
        "question": "Cho hàm số \\(f\\) xác định trên tập các số nguyên dương là lũy thừa của 5 thỏa mãn \\(f(1) = 4\\) và hệ thức truy hồi \\(f(n) = f(n/5) + 3n\\). Tìm giá trị của \\(f(125)\\).",
        "options": [
            "A. 500",
            "B. 498",
            "C. 496",
            "D. 400",
            "E. 469"
        ],
        "answer": "E",
        "explanation": [
            "Bước 1: Tính giá trị của \\(f(n)\\) lần lượt qua các lũy thừa của 5:",
            "- \\(f(1) = 4\\)",
            "- \\(f(5) = f(1) + 3(5) = 4 + 15 = 19\\)",
            "- \\(f(25) = f(5) + 3(25) = 19 + 75 = 94\\)",
            "Bước 2: Tính \\(f(125)\\):",
            "\\[ f(125) = f(25) + 3(125) = 94 + 375 = 469 \\]",
            "Do đó đáp án chính xác là E."
        ],
        "chapter": "Ch5_Induction",
        "difficulty": "easy",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_018_results.json"
    },
    {
        "id": 714,
        "question": "Cho hàm tăng \\(T(n)\\) thỏa mãn \\(T(n) = 2T(n/2) + n^2\\). Chọn ước lượng tiệm cận Big-O đúng nhất cho \\(T(n)\\):\\n(i) \\(T(n) = O(n)\\)\\n(ii) \\(T(n) = O(\\log n)\\)\\n(iii) \\(T(n) = O(n^2)\\)\\n(iv) \\(T(n) = O(n^3)\\)",
        "options": [
            "A. (i)",
            "B. (ii)",
            "C. (iii)",
            "D. (iv)"
        ],
        "answer": "C",
        "explanation": [
            "Bước 1: Áp dụng định lý Master (Master Theorem) cho hệ thức chia để trị \\(T(n) = a T(n/b) + c n^d\\):",
            "Ở đây \\(a = 2\\), \\(b = 2\\), và hàm số hạng tự do là \\(n^2\\) nên \\(d = 2\\).",
            "Bước 2: So sánh \\(a\\) và \\(b^d\\):",
            "\\[ b^d = 2^2 = 4 > a = 2 \\]",
            "Theo trường hợp 3 của định lý Master, \\(T(n) = O(n^d) = O(n^2)\\).",
            "Khẳng định (iii) đúng, chọn đáp án C."
        ],
        "chapter": "Ch5_Induction",
        "difficulty": "easy",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_018_results.json"
    },
    {
        "id": 715,
        "question": "Cho hàm số \\(f\\) thỏa mãn hệ thức truy hồi \\(f(n) = 2f(\\sqrt{n}) + \\log_{10}(n)\\) với mọi \\(n\\) là số chính phương lớn hơn 1, và điều kiện ban đầu \\(f(3) = 1\\). Tìm giá trị của \\(f(81)\\) (làm tròn đến hai chữ số thập phân).",
        "options": [
            "A. 8.00",
            "B. 7.82",
            "C. 7.00",
            "D. 6.82"
        ],
        "answer": "B",
        "explanation": [
            "Bước 1: Tính \\(f(9)\\) theo \\(f(3)\\):",
            "\\[ f(9) = 2f(\\sqrt{9}) + \\log_{10}(9) = 2f(3) + \\log_{10}(9) = 2(1) + \\log_{10}(9) = 2 + \\log_{10}(9) \\]",
            "Bước 2: Tính \\(f(81)\\):",
            "\\[ f(81) = 2f(\\sqrt{81}) + \\log_{10}(81) = 2f(9) + \\log_{10}(9^2) = 2(2 + \\log_{10}(9)) + 2\\log_{10}(9) = 4 + 4\\log_{10}(9) \\]",
            "Với \\(\\log_{10}(9) \\approx 0.954243\\):",
            "\\[ f(81) = 4 + 4(0.954243) = 4 + 3.81697 = 7.81697 \\approx 7.82 \\]",
            "Vậy \\(f(81) \\approx 7.82\\), chọn đáp án B."
        ],
        "chapter": "Ch5_Induction",
        "difficulty": "medium",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_018_results.json"
    },
    {
        "id": 716,
        "question": "Cho hàm tăng \\(T(n)\\) thỏa mãn \\(T(n) = 2T(n/2) + n^3\\). Chọn ước lượng tiệm cận Big-O đúng nhất cho \\(T(n)\\):\\n(i) \\(T(n) = O(n)\\)\\n(ii) \\(T(n) = O(n^2)\\)\\n(iii) \\(T(n) = O(n^3)\\)\\n(iv) \\(T(n) = O(n^3 \\log n)\\)",
        "options": [
            "A. (i)",
            "B. (ii)",
            "C. (iii)",
            "D. (iv)"
        ],
        "answer": "C",
        "explanation": [
            "Bước 1: Áp dụng định lý Master cho hệ thức \\(T(n) = a T(n/b) + c n^d\\):",
            "Ở đây \\(a = 2\\), \\(b = 2\\), và hàm số hạng là \\(n^3\\) nên \\(d = 3\\).",
            "Bước 2: So sánh \\(a\\) và \\(b^d\\):",
            "\\[ b^d = 2^3 = 8 > a = 2 \\]",
            "Theo định lý Master, \\(T(n) = O(n^d) = O(n^3)\\).",
            "Khẳng định (iii) đúng, chọn đáp án C."
        ],
        "chapter": "Ch5_Induction",
        "difficulty": "easy",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_018_results.json"
    },
    {
        "id": 717,
        "question": "Tìm giá trị của \\(f(25)\\) nếu \\(f(1) = 3\\) và \\(f(n) = f(n/5) + n^2 / 3\\) với \\(n\\) là lũy thừa của 5.",
        "options": [
            "A. 784/3",
            "B. 659/3",
            "C. 34/3",
            "D. 3",
            "E. None of the other choices is correct"
        ],
        "answer": "B",
        "explanation": [
            "Bước 1: Tính \\(f(5)\\):",
            "\\[ f(5) = f(1) + \\frac{5^2}{3} = 3 + \\frac{25}{3} = \\frac{9 + 25}{3} = \\frac{34}{3} \\]",
            "Bước 2: Tính \\(f(25)\\):",
            "\\[ f(25) = f(5) + \\frac{25^2}{3} = \\frac{34}{3} + \\frac{625}{3} = \\frac{659}{3} \\]",
            "Do đó đáp án chính xác là B."
        ],
        "chapter": "Ch5_Induction",
        "difficulty": "easy",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_018_results.json"
    },
    {
        "id": 718,
        "question": "Tìm giá trị của \\(f(3)\\) biết \\(f(9) = 25\\) và hệ thức liên hệ \\(f(n) = 7 - \\frac{n^2}{9} f(n/3)\\).",
        "options": [
            "A. -1",
            "B. 1",
            "C. -2",
            "D. 2",
            "E. None of the other choices is correct"
        ],
        "answer": "C",
        "explanation": [
            "Bước 1: Thay \\(n = 9\\) vào công thức đã cho:",
            "\\[ f(9) = 7 - \\frac{9^2}{9} f(9/3) = 7 - 9 f(3) \\]",
            "Bước 2: Thay giá trị \\(f(9) = 25\\) vào phương trình:",
            "\\[ 25 = 7 - 9 f(3) \\implies 9 f(3) = 7 - 25 = -18 \\implies f(3) = -2 \\]",
            "Vậy \\(f(3) = -2\\), chọn đáp án C."
        ],
        "chapter": "Ch5_Induction",
        "difficulty": "easy",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_018_results.json"
    },
    {
        "id": 719,
        "question": "Cần bao nhiêu phép so sánh giữa các phần tử để trộn hai danh sách đã sắp xếp \\([1, 4, 6, 9]\\) và \\([3, 5, 8, 10, 12, 14]\\) bằng thuật toán Merge?",
        "options": [
            "A. 7",
            "B. 10",
            "C. 8",
            "D. None of the other choices is correct"
        ],
        "answer": "A",
        "explanation": [
            "Bước 1: Lần lượt mô phỏng các phép so sánh của giải thuật Merge:",
            "1. So sánh 1 và 3: đưa 1 ra. (1)",
            "2. So sánh 4 và 3: đưa 3 ra. (2)",
            "3. So sánh 4 và 5: đưa 4 ra. (3)",
            "4. So sánh 6 và 5: đưa 5 ra. (4)",
            "5. So sánh 6 và 8: đưa 6 ra. (5)",
            "6. So sánh 9 và 8: đưa 8 ra. (6)",
            "7. So sánh 9 và 10: đưa 9 ra. (7)",
            "Bước 2: Sau 7 phép so sánh, danh sách thứ nhất đã hết phần tử. Đoạn còn lại của danh sách thứ hai \\([10, 12, 14]\\) được nối trực tiếp vào sau mảng kết quả mà không cần so sánh thêm.",
            "Tổng số phép so sánh là 7. Chọn đáp án A."
        ],
        "chapter": "Ch3_Algorithms",
        "difficulty": "easy",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_018_results.json"
    },
    {
        "id": 720,
        "question": "Có bao nhiêu số nguyên dương nhỏ hơn 100 chia hết cho 3 hoặc 4?",
        "options": [
            "A. 49",
            "B. 48",
            "C. 63",
            "D. 77",
            "E. 45"
        ],
        "answer": "A",
        "explanation": [
            "Bước 1: Các số nguyên dương nhỏ hơn 100 là tập hợp từ 1 đến 99.",
            "Áp dụng nguyên lý bù trừ:",
            "- Số các số chia hết cho 3: \\(\\lfloor 99 / 3 \\rfloor = 33\\).",
            "- Số các số chia hết cho 4: \\(\\lfloor 99 / 4 \\rfloor = 24\\).",
            "- Số các số chia hết cho cả 3 và 4 (chia hết cho \\(\\text{lcm}(3, 4) = 12\\)): \\(\\lfloor 99 / 12 \\rfloor = 8\\).",
            "Bước 2: Tính tổng số phần tử hợp:",
            "\\[ |A_3 \\cup A_4| = 33 + 24 - 8 = 49 \\]",
            "Do đó đáp án chính xác là A."
        ],
        "chapter": "Ch5_Induction",
        "difficulty": "easy",
        "answer_status": "verified",
        "confidence": "high",
        "review_flags": [],
        "needs_image": False,
        "verification_source": "v2/verification/batch_018_results.json"
    }
]

def main():
    # Load current questions_sample_v2.json
    with open("v2/questions_sample_v2.json", "r", encoding="utf-8") as f:
        existing_data = json.load(f)
    
    print(f"Existing questions before Batch {BATCH_NUMBER}: {len(existing_data)}")
    
    # Attach original_image
    for q in batch_18_questions:
        qid_str = str(q["id"])
        if qid_str in ocr_data:
            q["original_image"] = ocr_data[qid_str]["image"]
    
    # Filter out any if already present, append new batch
    new_data = [q for q in existing_data if q["id"] < START_ID or q["id"] > END_ID]
    new_data.extend(batch_18_questions)
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
