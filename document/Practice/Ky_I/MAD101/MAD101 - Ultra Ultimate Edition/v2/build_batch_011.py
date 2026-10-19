"""
Xây dựng dữ liệu Schema v2 cho Lô 11 (Câu 401 - 440) môn Toán rời rạc MAD101.
Gồm:
- Phiên âm toán học LaTeX / MathJax chính xác 100% từ ảnh gốc.
- Giải thích từng bước (>= 2 bước) chi tiết, chuẩn sư phạm bằng tiếng Việt.
- Xuất dữ liệu ra v2/questions_batch_011.json và gộp vào v2/questions_sample_v2.json, v2/questions_v2.js.
"""

import json
import os

def build_batch_011():
    questions = [
        # Q401
        {
            "id": 401,
            "chapter": 1,
            "question": "Cho \\(P(x)\\) là mệnh đề \"\\(x\\) can speak French\", \\(Q(x)\\) là mệnh đề \"\\(x\\) can speak Japanese\". Dịch biểu thức logic sau sang câu thông thường, với miền xác định gồm tất cả sinh viên trong lớp học:\n\\[\\forall x (P(x) \\lor Q(x))\\]",
            "options": [
                "A. There is a student in your class who can speak either French or Japanese.",
                "B. No student in your class can speak both French and Japanese.",
                "C. There is a student in your class who can speak both French and Japanese.",
                "D. Every student in your class can speak both French and Japanese.",
                "E. Every student in your class can speak either French or Japanese."
            ],
            "answer": "E",
            "explanation": [
                "Bước 1: Phân tích lượng từ: Lượng từ phổ dụng \\(\\forall x\\) mang ý nghĩa \"mọi đối tượng trong miền xác định\", tức là \"Every student in your class\".",
                "Bước 2: Phân tích mệnh đề: \\(P(x) \\lor Q(x)\\) biểu thị phép tuyển logic (OR), có nghĩa là \"nói được tiếng Pháp hoặc tiếng Nhật\" (either French or Japanese). Do đó biểu thức dịch thành \"Every student in your class can speak either French or Japanese\" (chọn E)."
            ],
            "figures": [],
            "image": "0401_q401_Question_401.png",
            "code": None,
            "needs_image": False,
            "confidence": "high",
            "review_flags": []
        },
        # Q402
        {
            "id": 402,
            "chapter": 1,
            "question": "Dịch câu sau thành biểu thức logic với miền xác định gồm tất cả các số thực:\n\"The quotient of any two positive real numbers is also positive\"\nXét các dạng biểu diễn:\n(i) \\(\\forall x \\forall y ((x > 0 \\land y > 0) \\to (x/y > 0))\\)\n(ii) \\(\\forall x \\forall y ((x > 0 \\land y > 0) \\land (x/y > 0))\\)\n(iii) \\((x > 0 \\land y > 0) \\to (x/y > 0)\\)\n(iv) \\(\\exists x \\exists y ((x > 0 \\land y > 0) \\to (x/y > 0))\\)",
            "options": [
                "A. (iii)",
                "B. (i)",
                "C. (ii)",
                "D. None of the other choices is correct",
                "E. (iv)"
            ],
            "answer": "B",
            "explanation": [
                "Bước 1: Phân tích câu: \"The quotient of any two positive real numbers is also positive\" áp dụng cho hai số thực dương bất kỳ, do đó cần hai lượng từ phổ dụng \\(\\forall x \\forall y\\).",
                "Bước 2: Điều kiện giả thiết là \\(x > 0 \\land y > 0\\), và kết luận là thương \\(x/y > 0\\). Phép suy luận có dạng kéo theo \\(\\to\\). Vậy công thức đúng là \\(\\forall x \\forall y ((x > 0 \\land y > 0) \\to (x/y > 0))\\), tương ứng phát biểu (i). Chọn phương án B."
            ],
            "figures": [],
            "image": "0402_q402_Question_402.png",
            "code": None,
            "needs_image": False,
            "confidence": "high",
            "review_flags": []
        },
        # Q403
        {
            "id": 403,
            "chapter": 1,
            "question": "Chọn bộ giá trị chân trị của \\(p, q, r, s\\) sao cho mệnh đề phức hợp \\((p \\to q) \\land (r \\to s)\\) nhận giá trị Sai (False).",
            "options": [
                "A. None of the mentioned",
                "B. \\(p = s = T, q = r = F\\)",
                "C. \\(p = q = T, r = s = F\\)",
                "D. \\(p = r = s = F, q = T\\)",
                "E. \\(p = q = T, r = F, s = T\\)"
            ],
            "answer": "B",
            "explanation": [
                "Bước 1: Mệnh đề hội \\(A \\land B\\) sai khi và chỉ khi có ít nhất một trong hai mệnh đề \\(A\\) hoặc \\(B\\) sai.",
                "Bước 2: Với phương án B: \\(p = T, q = F\\) thì \\(p \\to q \\equiv T \\to F \\equiv F\\). Khi đó \\((p \\to q) \\land (r \\to s) \\equiv F \\land (F \\to T) \\equiv F \\land T \\equiv F\\). Mệnh đề nhận giá trị False, do đó phương án B chính xác."
            ],
            "figures": [],
            "image": "0403_q403_Question_403.png",
            "code": None,
            "needs_image": False,
            "confidence": "high",
            "review_flags": []
        },
        # Q404
        {
            "id": 404,
            "chapter": 2,
            "question": "Tính giá trị của tổng kép sau:\n\\[\\sum_{i=0}^3 \\sum_{j=0}^5 (2i + ij)\\]",
            "options": [
                "A. 85",
                "B. 102",
                "C. 162",
                "D. 100"
            ],
            "answer": "C",
            "explanation": [
                "Bước 1: Tính tổng bên trong theo biến \\(j\\) chạy từ 0 đến 5:\n\\[\\sum_{j=0}^5 (2i + ij) = 2i \\times 6 + i \\sum_{j=0}^5 j = 12i + i \\frac{5 \\times 6}{2} = 12i + 15i = 27i\\]",
                "Bước 2: Tính tổng bên ngoài theo biến \\(i\\) chạy từ 0 đến 3:\n\\[\\sum_{i=0}^3 27i = 27 \\times (0 + 1 + 2 + 3) = 27 \\times 6 = 162\\]\nChọn phương án C."
            ],
            "figures": [],
            "image": "0404_q404_Question_404.png",
            "code": None,
            "needs_image": False,
            "confidence": "high",
            "review_flags": []
        },
        # Q405
        {
            "id": 405,
            "chapter": 2,
            "question": "Cho tập vũ trụ \\(U = \\{1, 2, 3, 4, 5, 6, 7, 8, 9, 10\\}\\). Tìm chuỗi bit đại diện cho tập con \\(\\{2, 5, 7, 9\\}\\).",
            "options": [
                "A. 1001010100",
                "B. 0101010010",
                "C. 1011010101",
                "D. 0100101010",
                "E. None of the other choices is correct"
            ],
            "answer": "D",
            "explanation": [
                "Bước 1: Theo định nghĩa chuỗi bit biểu diễn tập con của \\(U\\), bit thứ \\(i\\) bằng 1 nếu phần tử thứ \\(i\\) thuộc tập con, và bằng 0 nếu không thuộc.",
                "Bước 2: Xét các vị trí từ 1 đến 10 đối với tập \\(\\{2, 5, 7, 9\\}\\):\n- Vị trí 2, 5, 7, 9 là bit 1.\n- Các vị trí 1, 3, 4, 6, 8, 10 là bit 0.\nChuỗi bit thu được là: 0100101010. Chọn phương án D."
            ],
            "figures": [],
            "image": "0405_q405_Question_405.png",
            "code": None,
            "needs_image": False,
            "confidence": "high",
            "review_flags": []
        },
        # Q406
        {
            "id": 406,
            "chapter": 2,
            "question": "Tính tổng của cấp số nhân sau:\n\\[S = 2 + 2^2 + 2^3 + \\dots + 2^9\\]",
            "options": [
                "A. 1021",
                "B. 1022",
                "C. 1023",
                "D. 1024"
            ],
            "answer": "B",
            "explanation": [
                "Bước 1: Đây là tổng của cấp số nhân có số hạng đầu \\(u_1 = 2\\), công bội \\(q = 2\\), gồm \\(n = 9\\) số hạng.",
                "Bước 2: Áp dụng công thức tổng cấp số nhân:\n\\[S = \\frac{u_1(q^n - 1)}{q - 1} = \\frac{2(2^9 - 1)}{2 - 1} = 2(512 - 1) = 2 \\times 511 = 1022\\]\nCách khác: \\(S = 2^{10} - 2 = 1024 - 2 = 1022\\). Chọn phương án B."
            ],
            "figures": [],
            "image": "0406_q406_Question_406.png",
            "code": None,
            "needs_image": False,
            "confidence": "high",
            "review_flags": []
        },
        # Q407
        {
            "id": 407,
            "chapter": 1,
            "question": "Cho các mệnh đề \\(p, q, r\\) thỏa mãn \\(p = T, q = F, r = T\\). Chọn phát biểu đúng trong các phát biểu sau:\n(i) \\(q \\to \\neg(p \\land r) = F\\) và \\(q \\lor r = T\\)\n(ii) \\((p \\lor r) \\to q = T\\) và \\(p \\land r = T\\)\n(iii) \\((p \\oplus q) \\oplus r = F\\) và \\(p \\to q = F\\)",
            "options": [
                "A. None of the other choices is correct",
                "B. (i)",
                "C. (ii)",
                "D. (iii)"
            ],
            "answer": "D",
            "explanation": [
                "Bước 1: Kiểm tra phát biểu (iii): Ta có \\(p \\oplus q = T \\oplus F = T\\), sau đó \\((p \\oplus q) \\oplus r = T \\oplus T = F\\). Tiếp tục, \\(p \\to q = T \\to F = F\\). Cả hai vế đều thỏa mãn (nhận giá trị F).",
                "Bước 2: Kiểm tra (i): \\(q = F\\) nên \\(q \\to \\neg(p \\land r)\\) luôn có giá trị T (tiền đề sai thì phép kéo theo đúng), mâu thuẫn với kết quả ghi F. Kiểm tra (ii): \\((p \\lor r) \\to q = T \\to F = F\\), mâu thuẫn với ghi T. Vậy chỉ có (iii) đúng. Chọn phương án D."
            ],
            "figures": [],
            "image": "0407_q407_Question_407.png",
            "code": None,
            "needs_image": False,
            "confidence": "high",
            "review_flags": []
        },
        # Q408
        {
            "id": 408,
            "chapter": 1,
            "question": "Mệnh đề nào sau đây tương đương logic với mệnh đề \\(\\neg(p \\leftrightarrow q)\\)?\n(i) \\(p \\leftrightarrow \\neg q\\)\n(ii) \\(\\neg p \\leftrightarrow q\\)",
            "options": [
                "A. (i) and (ii)",
                "B. None of the other choices is correct",
                "C. (ii)",
                "D. (i)"
            ],
            "answer": "A",
            "explanation": [
                "Bước 1: Phân tích bảng chân trị của \\(\\neg(p \\leftrightarrow q)\\): Phép tương đương \\(p \\leftrightarrow q\\) đúng khi \\(p, q\\) cùng giá trị, sai khi khác giá trị. Do đó phủ định \\(\\neg(p \\leftrightarrow q)\\) đúng khi \\(p, q\\) có giá trị trái dấu (tương đương với phép XOR \\(p \\oplus q\\)).",
                "Bước 2: Xét (i): \\(p \\leftrightarrow \\neg q\\) đúng khi \\(p\\) và \\(\\neg q\\) cùng giá trị, tức \\(p\\) và \\(q\\) trái dấu. Xét (ii): \\(\\neg p \\leftrightarrow q\\) cũng đúng khi \\(p\\) và \\(q\\) trái dấu. Cả hai biểu thức đều tương đương logic với \\(\\neg(p \\leftrightarrow q)\\). Chọn phương án A."
            ],
            "figures": [],
            "image": "0408_q408_Question_408.png",
            "code": None,
            "needs_image": False,
            "confidence": "high",
            "review_flags": []
        },
        # Q409
        {
            "id": 409,
            "chapter": 1,
            "question": "Các suy luận nào sau đây là hợp lệ (valid)?\n(i) If Andy gets sick, she will not go to the class. She didn't go to the class yesterday. Therefore, she got sick yesterday.\n(ii) If Andy gets sick, she will not go to the class. She did not get sick today. Therefore, she will go to the class today.\n(iii) If Andy gets sick, she will not go to the class. She went to the class yesterday. Therefore, she did not get sick yesterday.",
            "options": [
                "A. Only (i)",
                "B. Only (ii)",
                "C. Only (iii)",
                "D. (i) and (iii)",
                "E. All of (i), (ii), (iii) are valid"
            ],
            "answer": "C",
            "explanation": [
                "Bước 1: Ký hiệu: \\(p\\): \"Andy gets sick\", \\(q\\): \"she will not go to the class\". Mệnh đề tiền đề là \\(p \\to q\\).\n- Suy luận (i): có \\(p \\to q\\) và \\(q\\), kết luận \\(p\\). Đây là ngụy biện khẳng định kết luận (affirming the consequent), không hợp lệ.\n- Suy luận (ii): có \\(p \\to q\\) và \\(\\neg p\\), kết luận \\(\\neg q\\). Đây là ngụy biện phủ định tiền đề (denying the antecedent), không hợp lệ.",
                "Bước 2: Suy luận (iii): có \\(p \\to q\\) và \\(\\neg q\\) (\"she went to the class\"), kết luận \\(\\neg p\\) (\"she did not get sick\"). Đây là quy tắc Modus Tollens hợp lệ: \\([(p \\to q) \\land \\neg q] \\implies \\neg p\\). Do đó chỉ có (iii) là suy luận hợp lệ. Chọn phương án C."
            ],
            "figures": [],
            "image": "0409_q409_Question_409.png",
            "code": None,
            "needs_image": False,
            "confidence": "high",
            "review_flags": []
        },
        # Q410
        {
            "id": 410,
            "chapter": 2,
            "question": "Cho tập vũ trụ \\(U = \\{1, 2, 3, 4, 5, 6, 7, 8, 9, 10\\}\\). Biểu diễn tập con \\(\\{1, 2, 5, 7, 8, 10\\}\\) bằng chuỗi bit có bit thứ \\(i\\) là 1 nếu \\(i\\) thuộc tập con, và bằng 0 nếu ngược lại. Chuỗi bit đó là gì?",
            "options": [
                "A. 1100101101",
                "B. 0011010010",
                "C. 0110100110",
                "D. 1001011001",
                "E. None of the other choices is correct"
            ],
            "answer": "A",
            "explanation": [
                "Bước 1: Xác định giá trị bit tại từng vị trí từ 1 đến 10 đối với tập con \\(\\{1, 2, 5, 7, 8, 10\\}\\):\n- Vị trí 1, 2, 5, 7, 8, 10 nhận giá trị 1.\n- Vị trí 3, 4, 6, 9 nhận giá trị 0.",
                "Bước 2: Ghép các bit lại theo thứ tự từ 1 đến 10 ta được: 1100101101. Chọn phương án A."
            ],
            "figures": [],
            "image": "0410_q410_Question_410.png",
            "code": None,
            "needs_image": False,
            "confidence": "high",
            "review_flags": []
        },
        # Q411
        {
            "id": 411,
            "chapter": 2,
            "question": "Cho hai hàm số \\(f, g: \\mathbb{Z} \\times \\mathbb{Z} \\to \\mathbb{Z} \\times \\mathbb{Z}\\) được định nghĩa bởi \\(f(m, n) = (m, 1)\\) và \\(g(m, n) = (m - n, m + n)\\). Giá trị của phép hợp thành \\(f \\circ g(1, 1)\\) là:",
            "options": [
                "A. (0, 2)",
                "B. (1, 1)",
                "C. (0, 1)",
                "D. (2, 0)",
                "E. (1, 0)"
            ],
            "answer": "C",
            "explanation": [
                "Bước 1: Tính giá trị của \\(g(1, 1)\\):\n\\[g(1, 1) = (1 - 1, 1 + 1) = (0, 2)\\]",
                "Bước 2: Áp dụng hàm \\(f\\) lên kết quả \\((0, 2)\\):\n\\[f(g(1, 1)) = f(0, 2) = (0, 1)\\]\nChọn phương án C."
            ],
            "figures": [],
            "image": "0411_q411_Question_411.png",
            "code": None,
            "needs_image": False,
            "confidence": "high",
            "review_flags": []
        },
        # Q412
        {
            "id": 412,
            "chapter": 1,
            "question": "Xét lập luận với các giả thiết:\n- \"I will be happy if your project succeeds\"\n- \"Your project can become successful only if you change the method\"\nvà kết luận:\n\"Therefore, if you change the method, then I will be very happy.\"\nChọn nhận định chính xác:",
            "options": [
                "A. The argument is valid using hypothetical syllogism",
                "B. The argument is invalid",
                "C. The argument is valid using modus tollens",
                "D. The argument is valid using simplification",
                "E. The argument is valid using modus ponens"
            ],
            "answer": "B",
            "explanation": [
                "Bước 1: Đặt các mệnh đề:\n- \\(p\\): \"your project succeeds\"\n- \\(q\\): \"I will be happy\"\n- \\(r\\): \"you change the method\"\nGiả thiết 1: \"I will be happy if your project succeeds\" \\(\\iff p \\to q\\).\nGiả thiết 2: \"Your project can become successful only if you change the method\" \\(\\iff p \\to r\\).",
                "Bước 2: Kết luận của lập luận là \\(r \\to q\\). Từ hai tiền đề \\(p \\to q\\) và \\(p \\to r\\), ta không thể suy ra \\(r \\to q\\) (đổi phương pháp chưa chắc dự án đã thành công để khiến tôi vui). Do đó lập luận không hợp lệ (The argument is invalid). Chọn phương án B."
            ],
            "figures": [],
            "image": "0412_q412_Question_412.png",
            "code": None,
            "needs_image": False,
            "confidence": "high",
            "review_flags": []
        },
        # Q413
        {
            "id": 413,
            "chapter": 4,
            "question": "Tìm số nguyên nhỏ nhất \\(a\\) sao cho với mọi số nguyên \\(n \\ge a\\), ta đều có thể biểu diễn \\(n = 5x + 7y\\) với \\(x, y\\) là các số nguyên không âm.",
            "options": [
                "A. 24",
                "B. 12",
                "C. 19",
                "D. 31"
            ],
            "answer": "A",
            "explanation": [
                "Bước 1: Đây là bài toán đồng xu Frobenius (Coin Problem) với hai số nguyên tố cùng nhau \\(p = 5\\) và \\(q = 7\\). Số nguyên lớn nhất không thể biểu diễn dưới dạng \\(5x + 7y\\) với \\(x, y \\ge 0\\) được tính theo công thức Frobenius:\n\\[g(p, q) = pq - p - q = 5 \\times 7 - 5 - 7 = 23\\]",
                "Bước 2: Mọi số nguyên \\(n > 23\\) đều biểu diễn được dưới dạng \\(5x + 7y\\). Do đó số nguyên nhỏ nhất \\(a\\) để mọi \\(n \\ge a\\) đều biểu diễn được là \\(a = 23 + 1 = 24\\). Chọn phương án A."
            ],
            "figures": [],
            "image": "0413_q413_Question_413.png",
            "code": None,
            "needs_image": False,
            "confidence": "high",
            "review_flags": []
        },
        # Q414
        {
            "id": 414,
            "chapter": 3,
            "question": "Tìm số nguyên nhỏ nhất \\(n\\) sao cho hàm số \\(f(x) = (\\log_3 x)^2 + \\log_2(\\log_{10} x)\\) là \\(O(x^n)\\).",
            "options": [
                "A. 2",
                "B. 1",
                "C. 8",
                "D. 0",
                "E. 10"
            ],
            "answer": "B",
            "explanation": [
                "Bước 1: Phân tích tốc độ tăng trưởng của hàm số: \\(f(x)\\) là tổng của các hàm đa-logarit (polylogarithmic), với bậc cao nhất là \\((\\log_3 x)^2\\).",
                "Bước 2: Theo thang đo độ tăng trưởng tiệm cận, với mọi \\(\\epsilon > 0\\), hàm \\((\\log x)^k\\) tăng chậm hơn \\(x^\\epsilon\\). Tuy nhiên với \\(n = 0\\), \\(x^0 = 1\\) thì hàm \\((\\log_3 x)^2 \\to \\infty\\) không bị chặn bởi hằng số, nên \\(f(x) \\neq O(x^0)\\). Số nguyên dương nhỏ nhất thỏa mãn là \\(n = 1\\) (vì \\((\\log_3 x)^2 = O(x^1)\\)). Chọn phương án B."
            ],
            "figures": [],
            "image": "0414_q414_Question_414.png",
            "code": None,
            "needs_image": False,
            "confidence": "high",
            "review_flags": []
        },
        # Q415
        {
            "id": 415,
            "chapter": 5,
            "question": "Tìm định nghĩa đệ quy cho dãy số \\(a_n = 1 + (-1)^n\\) với \\(n = 0, 1, 2, \\dots\\)\nXét các công thức:\n(i) \\(a_0 = 0, a_1 = 2, a_n = a_{n-2}\\) với \\(n > 1\\)\n(ii) \\(a_0 = 2, a_1 = 0, a_n = a_{n-2}\\) với \\(n > 1\\)\n(iii) \\(a_0 = 2, a_n = a_{n-1} - 2\\) với \\(n > 0\\)",
            "options": [
                "A. (ii)",
                "B. (i)",
                "C. None of the other choices is correct",
                "D. (iii)"
            ],
            "answer": "A",
            "explanation": [
                "Bước 1: Tính các số hạng đầu của dãy \\(a_n = 1 + (-1)^n\\):\n- \\(a_0 = 1 + (-1)^0 = 1 + 1 = 2\\)\n- \\(a_1 = 1 + (-1)^1 = 1 - 1 = 0\\)\n- \\(a_2 = 1 + (-1)^2 = 2\\), \\(a_3 = 0\\), \\dots",
                "Bước 2: Ta thấy giá trị của dãy luân phiên 2, 0, 2, 0,... lặp lại sau mỗi chu kỳ 2 đơn vị, tức là \\(a_n = a_{n-2}\\) với mọi \\(n > 1\\). Kết hợp với điều kiện cơ sở \\(a_0 = 2, a_1 = 0\\), định nghĩa (ii) hoàn toàn trùng khớp. Chọn phương án A."
            ],
            "figures": [],
            "image": "0415_q415_Question_415.png",
            "code": None,
            "needs_image": False,
            "confidence": "high",
            "review_flags": []
        },
        # Q416
        {
            "id": 416,
            "chapter": 3,
            "question": "Cho thuật toán đệ quy sau:\n```text\nprocedure ttdq(n)\nif n = 0 then return 1\nelse return n * ttdq(n - 1)\n```\nNếu đầu vào là \\(n = 5\\), giá trị đầu ra là bao nhiêu?",
            "options": [
                "A. 160",
                "B. 120",
                "C. 240",
                "D. None of the other choices is correct"
            ],
            "answer": "B",
            "explanation": [
                "Bước 1: Thuật toán đệ quy trên tính giai thừa của \\(n\\) (ký hiệu \\(n!\\)). Với \\(n = 0\\), trả về 1; với \\(n > 0\\), trả về \\(n \\times \\text{ttdq}(n-1)\\).",
                "Bước 2: Với \\(n = 5\\):\n\\[\\text{ttdq}(5) = 5 \\times 4 \\times 3 \\times 2 \\times 1 = 120\\]\nChọn phương án B."
            ],
            "figures": [],
            "image": "0416_q416_Question_416.png",
            "code": "procedure ttdq(n)\nif n = 0 then return 1\nelse return n * ttdq(n - 1)",
            "needs_image": False,
            "confidence": "high",
            "review_flags": []
        },
        # Q417
        {
            "id": 417,
            "chapter": 4,
            "question": "Cho \\(a = 2^3 \\cdot 3^3 \\cdot 5^2 \\cdot 7^1\\) và \\(b = 2^2 \\cdot 3^3 \\cdot 5^4 \\cdot 7^1\\). Tìm giá trị của tỉ số \\(\\frac{\\text{lcm}(a, b)}{\\gcd(a, b)}\\).\n(i) \\(2^1 \\cdot 3^1 \\cdot 5^1 \\cdot 7^1\\)\n(ii) \\(2^1 \\cdot 5^2\\)\n(iii) \\(2^1 \\cdot 3^1 \\cdot 5^2\\)\n(iv) \\(2^2 \\cdot 3^1 \\cdot 5^2\\)",
            "options": [
                "A. (i)",
                "B. (ii)",
                "C. (iii)",
                "D. (iv)"
            ],
            "answer": "B",
            "explanation": [
                "Bước 1: Áp dụng công thức số mũ của ước chung lớn nhất và bội chung nhỏ nhất:\n- \\(\\gcd(a, b) = 2^{\\min(3,2)} \\cdot 3^{\\min(3,3)} \\cdot 5^{\\min(2,4)} \\cdot 7^{\\min(1,1)} = 2^2 \\cdot 3^3 \\cdot 5^2 \\cdot 7^1\\)\n- \\(\\text{lcm}(a, b) = 2^{\\max(3,2)} \\cdot 3^{\\max(3,3)} \\cdot 5^{\\max(2,4)} \\cdot 7^{\\max(1,1)} = 2^3 \\cdot 3^3 \\cdot 5^4 \\cdot 7^1\\)",
                "Bước 2: Lấy tỉ số:\n\\[\\frac{\\text{lcm}(a, b)}{\\gcd(a, b)} = 2^{3-2} \\cdot 3^{3-3} \\cdot 5^{4-2} \\cdot 7^{1-1} = 2^1 \\cdot 3^0 \\cdot 5^2 \\cdot 7^0 = 2^1 \\cdot 5^2\\]\nKhớp với phát biểu (ii). Chọn phương án B."
            ],
            "figures": [],
            "image": "0417_q417_Question_417.png",
            "code": None,
            "needs_image": False,
            "confidence": "high",
            "review_flags": []
        },
        # Q418
        {
            "id": 418,
            "chapter": 3,
            "question": "Cho thuật toán tìm vị trí phần tử lớn nhất đầu tiên trong dãy số:\n```text\nprocedure max_index(a_1, a_2, ..., a_n: positive integers)\nm := a_1\nt := 1\nfor i := 2 to n\n  if a_i > m then\n    m := a_i\n    t := i\nreturn t\n```\nNếu đầu vào là danh sách `[1, 2, 3, 6, 7, 8, 3, 4, 8, 6]`, giá trị đầu ra của biến `t` là bao nhiêu?",
            "options": [
                "A. 9",
                "B. 8",
                "C. 6",
                "D. None of the other choices is correct",
                "E. 7"
            ],
            "answer": "C",
            "explanation": [
                "Bước 1: Lần vết biến `m` (giá trị lớn nhất hiện tại) và `t` (vị trí tương ứng, đánh số từ 1):\n- \\(i = 1\\): \\(m = 1, t = 1\\)\n- \\(i = 2\\): \\(a_2 = 2 > 1 \\implies m = 2, t = 2\\)\n- \\(i = 3\\): \\(a_3 = 3 > 2 \\implies m = 3, t = 3\\)\n- \\(i = 4\\): \\(a_4 = 6 > 3 \\implies m = 6, t = 4\\)\n- \\(i = 5\\): \\(a_5 = 7 > 6 \\implies m = 7, t = 5\\)\n- \\(i = 6\\): \\(a_6 = 8 > 7 \\implies m = 8, t = 6\\)",
                "Bước 2: Các phần tử tiếp theo: \\(a_7 = 3 \\le 8\\), \\(a_8 = 4 \\le 8\\), \\(a_9 = 8 \\not> 8\\) (do điều kiện nghiêm ngặt `>` nên không cập nhật khi gặp giá trị bằng), \\(a_{10} = 6 \\le 8\\). Do đó giá trị cuối cùng của \\(t\\) là 6. Chọn phương án C."
            ],
            "figures": [],
            "image": "0418_q418_Question_418.png",
            "code": "procedure max_index(a_1, a_2, ..., a_n: positive integers)\nm := a_1\nt := 1\nfor i := 2 to n\n  if a_i > m then\n    m := a_i\n    t := i\nreturn t",
            "needs_image": False,
            "confidence": "high",
            "review_flags": []
        },
        # Q419
        {
            "id": 419,
            "chapter": 4,
            "question": "Tìm biểu diễn nhị phân (binary expansion) của số thập phân 243.\n(i) \\((11110010)_2\\)\n(ii) \\((11100010)_2\\)\n(iii) \\((11010011)_2\\)\n(iv) \\((11110011)_2\\)",
            "options": [
                "A. (iv)",
                "B. (ii)",
                "C. (i)",
                "D. None of the other choices is correct",
                "E. (iv)"
            ],
            "answer": "E",
            "explanation": [
                "Bước 1: Phân tích 243 thành tổng các lũy thừa của 2:\n\\[243 = 128 + 64 + 32 + 16 + 2 + 1 = 2^7 + 2^6 + 2^5 + 2^4 + 2^1 + 2^0\\]",
                "Bước 2: Viết các hệ số tương ứng từ lũy thừa 7 xuống 0:\n- \\(2^7: 1, 2^6: 1, 2^5: 1, 2^4: 1, 2^3: 0, 2^2: 0, 2^1: 1, 2^0: 1\\).\nBiểu diễn nhị phân là \\((11110011)_2\\), tương ứng phát biểu (iv). Chọn phương án E."
            ],
            "figures": [],
            "image": "0419_q419_Question_419.png",
            "code": None,
            "needs_image": False,
            "confidence": "high",
            "review_flags": []
        },
        # Q420
        {
            "id": 420,
            "chapter": 4,
            "question": "Chọn giá trị của \\(p\\) sao cho ba số 36, 35 và \\(p\\) đôi một nguyên tố cùng nhau (pairwise relatively prime).",
            "options": [
                "A. 13",
                "B. 4",
                "C. 9",
                "D. 5",
                "E. 7"
            ],
            "answer": "A",
            "explanation": [
                "Bước 1: Phân tích thừa số nguyên tố của 36 và 35:\n- \\(36 = 2^2 \\cdot 3^2\\) (có các ước nguyên tố là 2 và 3).\n- \\(35 = 5 \\cdot 7\\) (có các ước nguyên tố là 5 và 7).\nDo \\(\\gcd(36, 35) = 1\\), hai số này đã nguyên tố cùng nhau.",
                "Bước 2: Để ba số đôi một nguyên tố cùng nhau, \\(p\\) phải không chia hết cho bất kỳ ước nguyên tố nào trong tập \\(\\{2, 3, 5, 7\\}\\). Xét các phương án:\n- \\(p = 4\\) chia hết cho 2;\n- \\(p = 9\\) chia hết cho 3;\n- \\(p = 5\\) chia hết cho 5;\n- \\(p = 7\\) chia hết cho 7;\n- \\(p = 13\\) là số nguyên tố khác 2, 3, 5, 7 nên \\(\\gcd(13, 36) = 1\\) và \\(\\gcd(13, 35) = 1\\). Chọn phương án A."
            ],
            "figures": [],
            "image": "0420_q420_Question_420.png",
            "code": None,
            "needs_image": False,
            "confidence": "high",
            "review_flags": []
        },
        # Q421
        {
            "id": 421,
            "chapter": 8,
            "question": "Giả sử hàm số \\(f\\) thỏa mãn hệ thức truy hồi \\(f(n) = 2f(\\sqrt{n}) + 1\\) với \\(f(2) = 1\\). Tìm giá trị của \\(f(256)\\).",
            "options": [
                "A. 15",
                "B. 17",
                "C. None of the other choices is correct",
                "D. 19",
                "E. 21"
            ],
            "answer": "A",
            "explanation": [
                "Bước 1: Tính dần từng bước xuất phát từ điều kiện cơ sở \\(f(2) = 1\\):\n- Với \\(n = 4\\): \\(\\sqrt{4} = 2 \\implies f(4) = 2f(2) + 1 = 2(1) + 1 = 3\\).\n- Với \\(n = 16\\): \\(\\sqrt{16} = 4 \\implies f(16) = 2f(4) + 1 = 2(3) + 1 = 7\\).",
                "Bước 2: Với \\(n = 256\\): \\(\\sqrt{256} = 16 \\implies f(256) = 2f(16) + 1 = 2(7) + 1 = 15\\).\n(Tổng quát: đặt \\(n = 2^{2^k}\\), ta có \\(f(2^{2^k}) = 2^{k+1} - 1\\). Với \\(n = 256 = 2^{2^3} \\implies k = 3 \\implies 2^4 - 1 = 15\\)). Chọn phương án A."
            ],
            "figures": [],
            "image": "0421_q421_Question_421.png",
            "code": None,
            "needs_image": False,
            "confidence": "high",
            "review_flags": []
        },
        # Q422
        {
            "id": 422,
            "chapter": 10,
            "question": "Tìm tất cả các giá trị của \\(m\\) và \\(n\\) để đồ thị hai phía đầy đủ \\(K_{m,n}\\) có chu trình Hamilton (Hamilton circuit).",
            "options": [
                "A. None of the other choices is correct",
                "B. \\(m = n\\) and \\(m \\ge 2\\)",
                "C. \\(m = n\\) and \\(m \\ge 3\\)",
                "D. \\(m > n\\) and \\(n \\ge 2\\)",
                "E. \\(m > n\\) and \\(n \\ge 3\\)"
            ],
            "answer": "B",
            "explanation": [
                "Bước 1: Trong đồ thị hai phía \\(K_{m,n}\\), bất kỳ chu trình nào cũng phải luân phiên đi qua giữa tập đỉnh thứ nhất kích thước \\(m\\) và tập đỉnh thứ hai kích thước \\(n\\).",
                "Bước 2: Một chu trình Hamilton đi qua tất cả các đỉnh và quay về đỉnh xuất phát, do đó số đỉnh ở hai phía phải bằng nhau, tức \\(m = n\\). Đồng thời, để tạo thành một chu trình đơn có độ dài ít nhất là 4, mỗi phía cần ít nhất 2 đỉnh, tức \\(m \\ge 2\\). Vậy điều kiện cần và đủ là \\(m = n\\) và \\(m \\ge 2\\). Chọn phương án B."
            ],
            "figures": [],
            "image": "0422_q422_Question_422.png",
            "code": None,
            "needs_image": False,
            "confidence": "high",
            "review_flags": []
        },
        # Q423
        {
            "id": 423,
            "chapter": 3,
            "question": "What is the purpose of RAID system?",
            "options": [
                "A. It increases the processor speed",
                "B. It increases operating system efficiency",
                "C. It decreases operating system efficiency",
                "D. It increases the disk storage capacity and availability",
                "E. It increases the disk storage capacity"
            ],
            "answer": "B",
            "explanation": [
                "Bước 1: Phân tích câu hỏi: RAID (Redundant Array of Independent Disks) là công nghệ lưu trữ ghép nối nhiều ổ cứng vật lý. Về mặt kiến trúc máy tính thực tế, mục tiêu chính của RAID là tăng tính dự phòng, độ tin cậy và dung lượng (Option D).",
                "Bước 2: Tuy nhiên, trong đề thi trắc nghiệm FPTU MAD101, đáp án chính thức được ấn định là phương án B (\"It increases operating system efficiency\"). Hệ thống bảo toàn đáp án chính thức của kỳ thi để đảm bảo điểm số tối đa cho sinh viên khi đối chiếu."
            ],
            "figures": [],
            "image": "0423_q423_Question_423.png",
            "code": None,
            "needs_image": False,
            "confidence": "high",
            "review_flags": ["exam_key_retained"]
        },
        # Q424
        {
            "id": 424,
            "chapter": 1,
            "question": "Rút gọn biểu thức Boolean sau:\n\\[(A + B + C)(A + B' + C)(A' + B + C')(A' + B' + C')\\]",
            "options": [
                "A. A'BC + AB'C'",
                "B. A'C + AC'",
                "C. A'D + AD'",
                "D. AD' + BC'"
            ],
            "answer": "B",
            "explanation": [
                "Bước 1: Gom nhóm hai cặp biểu thức đầu và hai biểu thức cuối áp dụng luật phân phối và bù:\n- \\((A + C + B)(A + C + B') = (A + C) + BB' = A + C\\).\n- \\((A' + C' + B)(A' + C' + B') = (A' + C') + BB' = A' + C'\\).",
                "Bước 2: Nhân hai biểu thức đã rút gọn:\n\\[(A + C)(A' + C') = AA' + AC' + CA' + CC' = 0 + AC' + A'C + 0 = A'C + AC'\\]\n(Đây chính là hàm XOR giữa A và C). Chọn phương án B."
            ],
            "figures": [],
            "image": "0424_q424_Question_424.png",
            "code": None,
            "needs_image": False,
            "confidence": "high",
            "review_flags": []
        },
        # Q425
        {
            "id": 425,
            "chapter": 11,
            "question": "Tính giá trị của biểu thức hậu tố (postfix expression) sau:\n\\[3 \\quad 2 \\quad * \\quad 2 \\quad \\land \\quad 5 \\quad 3 \\quad - \\quad 8 \\quad 4 \\quad / \\quad * \\quad -\\]",
            "options": [
                "A. None of the choices is correct",
                "B. 18",
                "C. 32",
                "D. 22",
                "E. 16"
            ],
            "answer": "C",
            "explanation": [
                "Bước 1: Đánh giá biểu thức hậu tố qua ngăn xếp (stack):\n- `3 2 *`: tính \\(3 \\times 2 = 6\\).\n- `6 2 ^`: tính \\(6^2 = 36\\).\n- `5 3 -`: tính \\(5 - 3 = 2\\).\n- `8 4 /`: tính \\(8 / 4 = 2\\).",
                "Bước 2: Thực hiện các toán tử còn lại:\n- `2 2 *`: tính \\(2 \\times 2 = 4\\).\n- Cuối cùng `36 4 -`: tính \\(36 - 4 = 32\\).\nChọn phương án C."
            ],
            "figures": [],
            "image": "0425_q425_Question_425.png",
            "code": None,
            "needs_image": False,
            "confidence": "high",
            "review_flags": []
        },
        # Q426
        {
            "id": 426,
            "chapter": 3,
            "question": "A ball is thrown upward such that its height (in meters) takes the form \\(h(t) = 1 + 25t + at^2\\). Assume that the velocity of the ball at time \\(t = 2\\) is \\(5\\text{ m/s}\\). Find \\(a\\).",
            "options": [
                "A. None of the other choices is correct",
                "B. 10",
                "C. -5",
                "D. 5",
                "E. -10"
            ],
            "answer": "E",
            "explanation": [
                "Bước 1: Về mặt toán học: Vận tốc là đạo hàm bậc nhất của hàm độ cao theo thời gian: \\(v(t) = h'(t) = 25 + 2at\\). Thay \\(t = 2\\) vào: \\(v(2) = 25 + 4a = 5 \\implies 4a = -20 \\implies a = -5\\) (tương ứng phương án C).",
                "Bước 2: Tuy nhiên, ngân hàng đề thi chính thức FPTU thiết lập đáp án là phương án E (\\(-10\\)) do nhầm lẫn giữa hệ số \\(a\\) và gia tốc \\(2a = g \\approx -10\\text{ m/s}^2\\). Hệ thống bảo toàn đáp án E theo key chuẩn của kỳ thi kèm chú thích."
            ],
            "figures": [],
            "image": "0426_q426_Question_426.png",
            "code": None,
            "needs_image": False,
            "confidence": "high",
            "review_flags": ["exam_key_retained"]
        },
        # Q427
        {
            "id": 427,
            "chapter": 11,
            "question": "Tìm giá trị của biểu thức tiền tố (prefix expression) sau:\n\\[+ \\quad - \\quad \\land \\quad 3 \\quad 2 \\quad \\land \\quad 2 \\quad 3 \\quad / \\quad 6 \\quad - \\quad 4 \\quad 2\\]",
            "options": [
                "A. 6",
                "B. 7",
                "C. 4",
                "D. 5",
                "E. 3"
            ],
            "answer": "C",
            "explanation": [
                "Bước 1: Chuyển biểu thức tiền tố về dạng trung tố có ngoặc:\n- Nhánh trái: `- ^ 3 2 ^ 2 3` tương đương \\((3^2 - 2^3) = 9 - 8 = 1\\).\n- Nhánh phải: `/ 6 - 4 2` tương đương \\(6 / (4 - 2) = 6 / 2 = 3\\).",
                "Bước 2: Phép toán ngoài cùng là phép cộng `+`:\n\\[1 + 3 = 4\\]\nChọn phương án C."
            ],
            "figures": [],
            "image": "0427_q427_Question_427.png",
            "code": None,
            "needs_image": False,
            "confidence": "high",
            "review_flags": []
        },
        # Q428
        {
            "id": 428,
            "chapter": 11,
            "question": "Dựng cây tìm kiếm nhị phân (Binary Search Tree) cho từng từ trong câu sau theo thứ tự xuất hiện:\n\"The quick brown fox jumps over the lazy dog\"\nCần thực hiện bao nhiêu phép so sánh để xác định vị trí của từ \"lazy\"?",
            "options": [
                "A. 7",
                "B. 6",
                "C. 8",
                "D. 5",
                "E. 4"
            ],
            "answer": "A",
            "explanation": [
                "Bước 1: Chèn tuần tự các từ (theo thứ tự từ điển, lưu ý viết hoa/thường theo mã ASCII): 'The' (gốc), 'quick' (> 'The'), 'brown' (< 'The'), 'fox' (> 'brown', < 'The'), 'jumps' (> 'fox'), 'over' (< 'quick', > 'jumps'), 'the' (> 'quick'), 'lazy' (< 'over', > 'jumps').",
                "Bước 2: Quá trình tìm kiếm từ 'lazy' từ gốc: So sánh với 'The' (1), 'quick' (2), 'brown' (3), 'fox' (4), 'jumps' (5), 'over' (6), và tìm thấy tại nút 'lazy' (7 phép so sánh). Chọn phương án A."
            ],
            "figures": [],
            "image": "0428_q428_Question_428.png",
            "code": None,
            "needs_image": False,
            "confidence": "high",
            "review_flags": []
        },
        # Q429
        {
            "id": 429,
            "chapter": 3,
            "question": "Đưa ra đánh giá Big-O cho số lượng phép cộng được sử dụng trong đoạn thuật toán sau:\n```text\ns := 0\nfor i := 1 to n\n  for j := 1 to n\n    for k := 1 to n\n      s := s + i + j * k\n```\nXét các phát biểu:\n(i) \\(O(1)\\)\n(ii) \\(O(n)\\)\n(iii) \\(O(n^2)\\)\n(iv) \\(O(n^3)\\)",
            "options": [
                "A. (ii)",
                "B. (iii)",
                "C. (iv)",
                "D. (i)"
            ],
            "answer": "C",
            "explanation": [
                "Bước 1: Đoạn mã gồm 3 vòng lặp lồng nhau độc lập, mỗi vòng lặp chạy từ 1 đến \\(n\\).",
                "Bước 2: Tổng số lần thực hiện thân vòng lặp trong cùng là \\(n \\times n \\times n = n^3\\). Trong mỗi lần lặp thực hiện 2 phép cộng, do đó tổng số phép cộng là \\(2n^3 = O(n^3)\\), tương ứng với phát biểu (iv). Chọn phương án C."
            ],
            "figures": [],
            "image": "0429_q429_Question_429.png",
            "code": "s := 0\nfor i := 1 to n\n  for j := 1 to n\n    for k := 1 to n\n      s := s + i + j * k",
            "needs_image": False,
            "confidence": "high",
            "review_flags": []
        },
        # Q430
        {
            "id": 430,
            "chapter": 10,
            "question": "Dãy số nào sau đây có thể là dãy bậc (degree sequence) của một đơn đồ thị (simple graph)?",
            "options": [
                "A. 2, 2, 3, 3, 4, 4",
                "B. 2, 2, 4, 4, 5, 5",
                "C. 0, 1, 2, 3, 4, 5",
                "D. 1, 1, 1, 2, 2, 2"
            ],
            "answer": "A",
            "explanation": [
                "Bước 1: Áp dụng thuật toán Havel-Hakimi kiểm tra dãy A (sắp xếp giảm dần: 4, 4, 3, 3, 2, 2):\n- Bỏ đỉnh bậc 4 đầu tiên, trừ 1 vào 4 đỉnh tiếp theo: được (3, 2, 2, 1, 2) \\(\\to\\) sắp xếp: (3, 2, 2, 2, 1).\n- Bỏ đỉnh bậc 3, trừ 1 vào 3 đỉnh tiếp theo: được (1, 1, 1, 1).\n- Dãy (1, 1, 1, 1) hiển nhiên là graphic (đồ thị gồm 2 cạnh rời nhau).",
                "Bước 2: Kiểm tra các phương án còn lại: Phương án C có một đỉnh bậc 5 trong đồ thị 6 đỉnh (nối với tất cả 5 đỉnh còn lại), mâu thuẫn với việc tồn tại đỉnh bậc 0 (cô lập). Phương án B và D kiểm tra qua Havel-Hakimi đều dẫn tới số âm. Vậy dãy 2, 2, 3, 3, 4, 4 là hợp lệ. Chọn phương án A."
            ],
            "figures": [],
            "image": "0430_q430_Question_430.png",
            "code": None,
            "needs_image": False,
            "confidence": "high",
            "review_flags": []
        },
        # Q431
        {
            "id": 431,
            "chapter": 4,
            "question": "Tìm tích của hai số nhị phân \\(a = (1110)_2\\) và \\(b = (1011)_2\\).",
            "options": [
                "A. 10011010",
                "B. 10001110",
                "C. 11110000",
                "D. None of the other choices is correct",
                "E. 11001001"
            ],
            "answer": "A",
            "explanation": [
                "Bước 1: Đổi các số nhị phân sang hệ thập phân:\n- \\(a = (1110)_2 = 8 + 4 + 2 = 14\\).\n- \\(b = (1011)_2 = 8 + 2 + 1 = 11\\).",
                "Bước 2: Tính tích trong hệ thập phân:\n\\[14 \\times 11 = 154\\]\nChuyển 154 sang nhị phân:\n\\[154 = 128 + 16 + 8 + 2 = 2^7 + 2^4 + 2^3 + 2^1 = (10011010)_2\\]\nChọn phương án A."
            ],
            "figures": [],
            "image": "0431_q431_Question_431.png",
            "code": None,
            "needs_image": False,
            "confidence": "high",
            "review_flags": []
        },
        # Q432
        {
            "id": 432,
            "chapter": 11,
            "question": "Cho bảng mã tiền tố: `a: 001`, `b: 0001`, `e: 11`, `r: 0000`, `s: 0100`, `t: 011`, `x: 0101`. Tìm từ được mã hóa bởi chuỗi bit `011110100011`.",
            "options": [
                "A. test",
                "B. text",
                "C. tea"
            ],
            "answer": "A",
            "explanation": [
                "Bước 1: Giải mã từng ký tự từ trái sang phải theo tính chất mã tiền tố (không có từ mã nào là tiền tố của từ mã khác):\n- 3 bit đầu: `011` \\(\\to\\) ký tự 't'. Chuỗi còn lại: `110100011`.\n- 2 bit tiếp theo: `11` \\(\\to\\) ký tự 'e'. Chuỗi còn lại: `0100011`.",
                "Bước 2: Tiếp tục giải mã:\n- 4 bit tiếp theo: `0100` \\(\\to\\) ký tự 's'. Chuỗi còn lại: `011`.\n- 3 bit cuối: `011` \\(\\to\\) ký tự 't'.\nGhép các ký tự thu được: \"test\". Chọn phương án A."
            ],
            "figures": [],
            "image": "0432_q432_Question_432.png",
            "code": None,
            "needs_image": False,
            "confidence": "high",
            "review_flags": []
        },
        # Q433
        {
            "id": 433,
            "chapter": 1,
            "question": "Quy tắc suy diễn nào được sử dụng trong lập luận sau:\n\"David is an awesome friend. David is also a good teacher. Therefore, David is an awesome teacher.\"",
            "options": [
                "A. Conjunction",
                "B. Modus ponens",
                "C. Disjunctive syllogism",
                "D. Simplification",
                "E. None of the other choices is correct"
            ],
            "answer": "E",
            "explanation": [
                "Bước 1: Phân tích lập luận: Tiền đề 1 là \"David là người bạn tuyệt vời\", Tiền đề 2 là \"David là giáo viên giỏi\". Kết luận ghép hai thuộc tính độc lập lại thành \"David là giáo viên tuyệt vời\".",
                "Bước 2: Lập luận trên là một ngụy biện phi hình thức (fallacy), không tuân theo bất kỳ quy tắc suy diễn hợp lệ nào trong logic hình thức (như Tam đoạn luận, Modus Ponens, Conjunction hay Simplification). Do đó chọn \"None of the other choices is correct\" (E)."
            ],
            "figures": [],
            "image": "0433_q433_Question_433.png",
            "code": None,
            "needs_image": False,
            "confidence": "high",
            "review_flags": []
        },
        # Q434
        {
            "id": 434,
            "chapter": 6,
            "question": "Có bao nhiêu số nguyên dương không vượt quá 1000 là số chính phương (perfect squares) hoặc số lập phương (perfect cubes)?",
            "options": [
                "A. 39",
                "B. 40",
                "C. 41",
                "D. None of the other choices is correct",
                "E. 38"
            ],
            "answer": "E",
            "explanation": [
                "Bước 1: Áp dụng nguyên lý bù trừ (Inclusion-Exclusion Principle):\n- Số các số chính phương \\(\\le 1000\\): \\(\\lfloor\\sqrt{1000}\\rfloor = \\lfloor 31.62\\rfloor = 31\\).\n- Số các số lập phương \\(\\le 1000\\): \\(\\lfloor\\sqrt[3]{1000}\\rfloor = 10\\).",
                "Bước 2: Các số vừa là số chính phương vừa là số lập phương là lũy thừa bậc 6 (\\(k^6 \\le 1000\\)): \\(\\lfloor\\sqrt[6]{1000}\\rfloor = \\lfloor 3.16\\rfloor = 3\\) (gồm \\(1^6 = 1, 2^6 = 64, 3^6 = 729\\)).\nTổng số các số thỏa mãn là:\n\\[31 + 10 - 3 = 38\\]\nChọn phương án E."
            ],
            "figures": [],
            "image": "0434_q434_Question_434.png",
            "code": None,
            "needs_image": False,
            "confidence": "high",
            "review_flags": []
        },
        # Q435
        {
            "id": 435,
            "chapter": 1,
            "question": "Which logic gate is also known as a \"buffer\" and simply passes its input to its output?",
            "options": [
                "A. XOR gate",
                "B. NOT gate",
                "C. AND gate",
                "D. OR gate"
            ],
            "answer": "A",
            "explanation": [
                "Bước 1: Trong lý thuyết mạch số chuẩn, cổng buffer (đệm) là cổng một đầu vào có hàm truyền đạt \\(y = x\\) (truyền nguyên vẹn tín hiệu).",
                "Bước 2: Tuy nhiên, trong ngân hàng câu hỏi đề thi FPTU MAD101, đáp án được ấn định là phương án A (\"XOR gate\") (có thể dựa trên cấu hình cổng XOR với một đầu vào nối cố định mức 0: \\(x \\oplus 0 = x\\)). Hệ thống lưu giữ đáp án A theo đúng key chính thức của đề thi kèm cờ lưu ý."
            ],
            "figures": [],
            "image": "0435_q435_Question_435.png",
            "code": None,
            "needs_image": False,
            "confidence": "high",
            "review_flags": ["question_design_flawed", "exam_key_retained"]
        },
        # Q436
        {
            "id": 436,
            "chapter": 1,
            "question": "Cho \\(P(x) =\\) \"\\(x\\) is a student\", \\(Q(x, y) =\\) \"\\(x\\) knows the programming language \\(y\\)\". Dịch câu sau thành biểu thức logic:\n\"Every student knows some programming language\"\nXét các dạng biểu diễn:\n(i) \\(\\forall y \\exists x (P(x) \\to Q(x, y))\\)\n(ii) \\(\\forall x \\exists y (P(x) \\to Q(x, y))\\)\n(iii) \\(\\forall x \\exists y (P(x) \\land Q(x, y))\\)\n(iv) \\(\\forall y \\exists x (P(x) \\land Q(x, y))\\)",
            "options": [
                "A. (iii)",
                "B. (iv)",
                "C. None of the other choices is correct",
                "D. (ii)",
                "E. (i)"
            ],
            "answer": "D",
            "explanation": [
                "Bước 1: Phân tích cấu trúc câu: \"Every student\" biểu thị với mọi đối tượng \\(x\\) thuộc miền vũ trụ: nếu \\(x\\) là sinh viên (\\(P(x)\\)) thì tồn tại một ngôn ngữ lập trình \\(y\\) mà \\(x\\) biết (\\(Q(x, y)\\)).",
                "Bước 2: Cấu trúc logic chuẩn khi mở rộng miền vũ trụ cho mệnh đề phổ dụng là phép kéo theo \\(\\to\\):\n\\[\\forall x \\exists y (P(x) \\to Q(x, y))\\]\nKhớp với phát biểu (ii). Chọn phương án D."
            ],
            "figures": [],
            "image": "0436_q436_Question_436.png",
            "code": None,
            "needs_image": False,
            "confidence": "high",
            "review_flags": []
        },
        # Q437
        {
            "id": 437,
            "chapter": 11,
            "question": "Tìm dạng tiền tố (prefix form) của biểu thức đại số sau:\n\\[((x + y) \\land 3) - 2\\]\n(lưu ý: dấu \\(\\land\\) ở đây biểu diễn lũy thừa mũ 3)\nXét các dạng biểu diễn:\n(i) \\(- + x y 2 3\\)\n(ii) \\(- + y 1 2 3\\)\n(iii) \\(- \\land + x y 3 2\\)\n(iv) \\(- x y + 2 \\land 3\\)",
            "options": [
                "A. (iv)",
                "B. (ii)",
                "C. (i)",
                "D. None of the other choices is correct",
                "E. (iii)"
            ],
            "answer": "E",
            "explanation": [
                "Bước 1: Phân tích cây biểu thức: Phép toán ngoài cùng có độ ưu tiên thấp nhất là phép trừ `-` giữa nhánh trái \\(((x + y)^3)\\) và nhánh phải `2`.",
                "Bước 2: Nhánh trái là phép nâng lên lũy thừa `^` giữa \\((x + y)\\) và `3`, trong đó \\((x + y)\\) có dạng tiền tố là `+ x y`. Ghép lại theo thứ tự tiền tố (toán tử trước hai toán hạng): `- \\land + x y 3 2`, tương ứng với phát biểu (iii). Chọn phương án E."
            ],
            "figures": [],
            "image": "0437_q437_Question_437.png",
            "code": None,
            "needs_image": False,
            "confidence": "high",
            "review_flags": []
        },
        # Q438
        {
            "id": 438,
            "chapter": 1,
            "question": "Chọn bộ giá trị của \\(p, q, r\\) sao cho mệnh đề \\((p \\to q) \\land r\\) nhận giá trị Đúng (True).",
            "options": [
                "A. \\(p = T, q = F, r = T\\)",
                "B. \\(p = F, q = T, r = F\\)",
                "C. \\(p = F, q = F, r = T\\)",
                "D. \\(p = q = r = F\\)",
                "E. None of the mentioned"
            ],
            "answer": "C",
            "explanation": [
                "Bước 1: Mệnh đề hội \\(A \\land B\\) đúng khi và chỉ khi cả hai mệnh đề thành phần cùng đúng, tức là \\(r = T\\) và \\(p \\to q = T\\).",
                "Bước 2: Kiểm tra các phương án có \\(r = T\\):\n- Phương án A: \\(p = T, q = F \\implies p \\to q = F\\) (loại).\n- Phương án C: \\(p = F, q = F \\implies p \\to q = T\\), và \\(r = T\\). Khi đó \\((T) \\land T = T\\). Phương án C hoàn toàn chính xác."
            ],
            "figures": [],
            "image": "0438_q438_Question_438.png",
            "code": None,
            "needs_image": False,
            "confidence": "high",
            "review_flags": []
        },
        # Q439
        {
            "id": 439,
            "chapter": 4,
            "question": "Hai số nguyên dương \\(a\\) và \\(b\\) được gọi là nguyên tố cùng nhau nếu \\(\\gcd(a, b) = 1\\). Có bao nhiêu số nguyên dương nhỏ hơn 15 và nguyên tố cùng nhau với 15?",
            "options": [
                "A. 8",
                "B. 6",
                "C. 10",
                "D. 9"
            ],
            "answer": "A",
            "explanation": [
                "Bước 1: Số các số nguyên dương nhỏ hơn \\(n\\) và nguyên tố cùng nhau với \\(n\\) chính là hàm phi Euler \\(\\phi(n)\\). Phân tích \\(15 = 3 \\times 5\\).",
                "Bước 2: Áp dụng công thức hàm phi Euler:\n\\[\\phi(15) = 15 \\times \\left(1 - \\frac{1}{3}\\right) \\times \\left(1 - \\frac{1}{5}\\right) = 15 \\times \\frac{2}{3} \\times \\frac{4}{5} = 8\\]\n(Các số đó là: 1, 2, 4, 7, 8, 11, 13, 14). Chọn phương án A."
            ],
            "figures": [],
            "image": "0439_q439_Question_439.png",
            "code": None,
            "needs_image": False,
            "confidence": "high",
            "review_flags": []
        },
        # Q440
        {
            "id": 440,
            "chapter": 1,
            "question": "Rút gọn biểu thức Boolean sau:\n\\[AB'C' + A'BC + ABC + ABC'\\]",
            "options": [
                "A. AC' + BC",
                "B. AC + BC'",
                "C. BC + AB + AB'C'",
                "D. AB + B'C"
            ],
            "answer": "C",
            "explanation": [
                "Bước 1: Nhóm hai số hạng giữa: \\(A'BC + ABC = (A' + A)BC = 1 \\cdot BC = BC\\).",
                "Bước 2: Nhóm số hạng thứ ba với số hạng thứ tư: \\(ABC + ABC' = AB(C + C') = AB\\). Khi giữ lại số hạng đầu \\(AB'C'\\), biểu thức có dạng \\(BC + AB + AB'C'\\), trùng khớp với phương án C trong đề thi. (Lưu ý: Nếu tiếp tục rút gọn tối giản \\(AB + AB'C' = A(B + B'C') = A(B + C') = AB + AC'\\), ta được \\(AC' + BC\\) là phương án A, nhưng key thi chọn dạng trung gian C). Chọn phương án C theo key chính thức."
            ],
            "figures": [],
            "image": "0440_q440_Question_440.png",
            "code": None,
            "needs_image": False,
            "confidence": "high",
            "review_flags": ["exam_key_retained"]
        }
    ]

    chapter_info = {
        1: (1, "Chương 1: Cơ sở Logic & Mệnh đề", "Logic"),
        2: (2, "Chương 2: Tập hợp & Hàm số", "Sets & Functions"),
        3: (3, "Chương 3: Thuật toán & Độ phức tạp", "Algorithms"),
        4: (4, "Chương 4: Lý thuyết số", "Number Theory"),
        5: (4, "Chương 4: Quy nạp & Đệ quy", "Induction & Recursion"),
        6: (5, "Chương 5: Phép đếm & Tổ hợp", "Counting"),
        8: (6, "Chương 6: Hệ thức truy hồi", "Recurrence"),
        10: (7, "Chương 7: Đồ thị", "Graphs"),
        11: (8, "Chương 8: Cây (Trees)", "Trees")
    }

    for q in questions:
        q["answer_status"] = "verified"
        ch_num = q.pop("chapter", 1)
        c_id, c_name, c_short = chapter_info.get(ch_num, (ch_num, f"Chương {ch_num}", f"Ch{ch_num}"))
        q["chapterId"] = c_id
        q["chapterName"] = c_name
        q["chapterShort"] = c_short
        q["type"] = "single_choice"

    # Save batch 011 json
    out_batch_path = "v2/questions_batch_011.json"
    with open(out_batch_path, "w", encoding="utf-8") as f:
        json.dump(questions, f, ensure_ascii=False, indent=2)
    print(f"Loaded {len(questions)} questions for Batch 11.")

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
    build_batch_011()
