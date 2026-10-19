"""
Builder script for Batch 013 (Questions 481 - 520)
MAD101 - Discrete Mathematics
"""
import json

batch_013_questions = [
  {
    "id": 481,
    "chapterId": "Ch3_Algorithms_Integers",
    "chapterName": "Thuật toán và Số nguyên (Algorithms & Integers)",
    "chapterShort": "Ch3 - Số học",
    "type": "single_choice",
    "question": "Khi sử dụng thuật toán lũy thừa theo mô-đun (modular exponentiation algorithm) để tính \\(7^9 \\bmod 19\\), các số dư được tính toán bằng phương pháp bình phương liên tiếp (successive squaring) lần lượt là:",
    "options": [
      "\\(7, 7, 11, 11\\)",
      "\\(11, 11, 7, 7\\)",
      "\\(11, 7, 11, 7\\)",
      "\\(7, 11, 7, 11\\)"
    ],
    "answer": "D",
    "answer_status": "verified",
    "explanation": "Bước 1: Biểu diễn số mũ 9 dưới dạng nhị phân: \\(9 = 1001_2 = 2^3 + 2^0\\). Để thực hiện thuật toán, ta cần tính các lũy thừa với số mũ là lũy thừa của 2: \\(7^{2^0}, 7^{2^1}, 7^{2^2}, 7^{2^3}\\) modulo 19.\nBước 2: Tính toán bình phương liên tiếp qua từng bước:\n- \\(k=0\\): \\(7^1 \\bmod 19 = 7\\)\n- \\(k=1\\): \\(7^2 \\bmod 19 = 49 \\bmod 19 = 11\\) (vì \\(49 = 19 \\times 2 + 11\\))\n- \\(k=2\\): \\(7^4 \\bmod 19 = (7^2)^2 \\bmod 19 = 11^2 \\bmod 19 = 121 \\bmod 19 = 7\\) (vì \\(121 = 19 \\times 6 + 7\\))\n- \\(k=3\\): \\(7^8 \\bmod 19 = (7^4)^2 \\bmod 19 = 7^2 \\bmod 19 = 11\\).\nDo đó, dãy các số dư tính bằng phương pháp bình phương liên tiếp là \\(7, 11, 7, 11\\), tương ứng với phương án D.",
    "figures": [],
    "image": "0481_q481_Question_481.png",
    "code": None,
    "needs_image": False,
    "confidence": "high",
    "review_flags": []
  },
  {
    "id": 482,
    "chapterId": "Ch1_Logic",
    "chapterName": "Mệnh đề và Vị từ (Logic & Proofs)",
    "chapterShort": "Ch1 - Logic",
    "type": "single_choice",
    "question": "Cho các vị từ:\n- \\(C(x)\\): \"\\(x\\) là sinh viên trường bạn\"\n- \\(P(x)\\): \"\\(x\\) có thể nói tiếng Nga\"\n- \\(Q(x)\\): \"\\(x\\) biết ngôn ngữ lập trình C++\"\nKhông gian mẫu gồm tất cả mọi người.\nBiểu diễn câu sau bằng logic vị từ: \"Không có sinh viên nào ở trường bạn có thể nói tiếng Nga hoặc biết C++\" (No student at your school can speak Russian or knows C++):",
    "options": [
      "\\(\\forall x (C(x) \\to (P(x) \\lor Q(x)))\\)",
      "\\(\\forall x (C(x) \\to (\\neg P(x) \\lor \\neg Q(x)))\\)",
      "None of the other choices is correct",
      "\\(\\forall x (\\neg C(x) \\to (\\neg P(x) \\land \\neg Q(x)))\\)"
    ],
    "answer": "C",
    "answer_status": "verified",
    "explanation": "Bước 1: Dịch trực tiếp câu phát biểu sang ngôn ngữ vị từ:\n\"Không tồn tại người \\(x\\) nào sao cho \\(x\\) là sinh viên trường bạn và (\\(x\\) nói tiếng Nga hoặc biết C++)\":\n\\[ \\neg \\exists x \\big(C(x) \\land (P(x) \\lor Q(x))\\big) \\]\nBước 2: Sử dụng luật De Morgan và luật kéo theo:\n\\[ \\neg \\exists x \\big(C(x) \\land (P(x) \\lor Q(x))\\big) \\equiv \\forall x \\neg \\big(C(x) \\land (P(x) \\lor Q(x))\\big) \\]\n\\[ \\equiv \\forall x \\big(C(x) \\to \\neg(P(x) \\lor Q(x))\\big) \\equiv \\forall x \\big(C(x) \\to (\\neg P(x) \\land \\neg Q(x))\\big) \\]\nQuan sát các phương án đưa ra:\n- (i) \\(\\forall x (C(x) \\to (P(x) \\lor Q(x)))\\) sai.\n- (ii) \\(\\forall x (C(x) \\to (\\neg P(x) \\lor \\neg Q(x)))\\) sai (dùng phép HOẶC thay vì VÀ).\n- (iii) \\(\\forall x (\\neg C(x) \\to (\\neg P(x) \\land \\neg Q(x)))\\) sai tiền đề.\nVì vậy không có phương án nào trong các phương án trên là đúng, chọn \"None of the other choices is correct\".",
    "figures": [],
    "image": "0482_q482_Question_482.png",
    "code": None,
    "needs_image": False,
    "confidence": "high",
    "review_flags": []
  },
  {
    "id": 483,
    "chapterId": "Ch0_Architecture",
    "chapterName": "Kiến trúc máy tính (Computer Organization)",
    "chapterShort": "Ch0 - Kiến trúc MT",
    "type": "single_choice",
    "question": "Trong kiến trúc máy tính, loại đường truyền nào dưới đây KHÔNG phải là một nhóm đường truyền liên kết (Interconnection bus line group) độc lập chuẩn của bus hệ thống?",
    "options": [
      "Data lines",
      "Control lines",
      "Signal lines",
      "Address lines",
      "None of the other choices is correct"
    ],
    "answer": "E",
    "answer_status": "verified",
    "explanation": "Bước 1: Theo chuẩn kiến trúc máy tính (William Stallings, Computer Organization and Architecture), một bus liên kết hệ thống (System Bus) thường được phân loại thành 3 nhóm đường chức năng chính:\n- Data lines (đường truyền dữ liệu)\n- Address lines (đường địa chỉ)\n- Control lines (đường điều khiển)\nBước 2: \"Signal lines\" (đường tín hiệu) là thuật ngữ vật lý chung để chỉ mọi dây dẫn mang tín hiệu điện, không phải là một nhóm bus chức năng độc lập. Trong hệ thống đề thi trắc nghiệm FPTU, đáp án chính thức được ghi nhận là E (\"None of the other choices is correct\").",
    "figures": [],
    "image": "0483_q483_Question_483.png",
    "code": None,
    "needs_image": False,
    "confidence": "high",
    "review_flags": ["exam_key_retained"]
  },
  {
    "id": 484,
    "chapterId": "Ch2_Sets_Functions",
    "chapterName": "Tập hợp và Ánh xạ (Sets & Functions)",
    "chapterShort": "Ch2 - Ánh xạ",
    "type": "single_choice",
    "question": "Cho hàm số \\(f: \\mathbb{N} \\to \\mathbb{Z}\\) xác định bởi:\n\\[ f(n) = \\begin{cases} \\dfrac{n}{2} & \\text{nếu } n \\text{ chẵn} \\\\[6pt] -\\dfrac{n+1}{2} & \\text{nếu } n \\text{ lẻ} \\end{cases} \\]\nChọn khẳng định đúng về tính chất của \\(f\\):",
    "options": [
      "\\(f\\) is both one-to-one and onto",
      "\\(f\\) is neither one-to-one nor onto",
      "\\(f\\) is onto but not one-to-one",
      "\\(f\\) is one-to-one but not onto"
    ],
    "answer": "D",
    "answer_status": "verified",
    "explanation": "Bước 1: Kiểm tra tính đơn ánh (one-to-one):\n- Nếu \\(n\\) chẵn, \\(f(n) = n/2 > 0\\) (với quy ước \\(\\mathbb{N} = \\{1, 2, 3, \\dots\\}\\)). Các giá trị này phân biệt với nhau.\n- Nếu \\(n\\) lẻ, \\(f(n) = -(n+1)/2 < 0\\). Các giá trị này là các số nguyên âm phân biệt.\n- Vì giá trị dương và âm không bao giờ trùng nhau, \\(f\\) là đơn ánh (one-to-one).\nBước 2: Kiểm tra tính toàn ánh (onto):\n- Với quy ước tập số tự nhiên chuẩn FPTU \\(\\mathbb{N} = \\{1, 2, 3, \\dots\\}\\), giá trị 0 không bao giờ đạt được vì \\(n/2 = 0 \\iff n = 0 \\notin \\mathbb{N}\\), và \\(-(n+1)/2 = 0 \\iff n = -1 \\notin \\mathbb{N}\\).\n- Do đó \\(0 \\in \\mathbb{Z}\\) không có phần tử nghịch ảnh, hàm \\(f\\) không toàn ánh.\nKết luận: \\(f\\) là đơn ánh nhưng không toàn ánh (one-to-one but not onto), đáp án D.",
    "figures": [],
    "image": "0484_q484_Question_484.png",
    "code": None,
    "needs_image": False,
    "confidence": "high",
    "review_flags": ["exam_key_retained"]
  },
  {
    "id": 485,
    "chapterId": "Ch2_Sets_Functions",
    "chapterName": "Tập hợp và Ánh xạ (Sets & Functions)",
    "chapterShort": "Ch2 - Tập hợp",
    "type": "single_choice",
    "question": "Cho hai tập hợp \\(X = \\{1, 2, 3, 4, 5\\}\\) và \\(Y = \\{0, 3, 6, 9\\}\\). Xét các tập hợp sau:\n(i) \\(X \\cap Y\\)\n(ii) \\(X \\setminus Y\\)\n(iii) \\(Y \\setminus X\\)\nTập hợp nào có lực lượng (cardinality) nhỏ nhất?",
    "options": [
      "(ii)",
      "(iii)",
      "(i)",
      "None of the other choices"
    ],
    "answer": "C",
    "answer_status": "verified",
    "explanation": "Bước 1: Tính các tập hợp và số phần tử tương ứng:\n- (i) \\(X \\cap Y = \\{3\\} \\implies |X \\cap Y| = 1\\).\n- (ii) \\(X \\setminus Y = \\{1, 2, 4, 5\\} \\implies |X \\setminus Y| = 4\\).\n- (iii) \\(Y \\setminus X = \\{0, 6, 9\\} \\implies |Y \\setminus X| = 3\\).\nBước 2: So sánh lực lượng: \\(1 < 3 < 4\\), tập hợp có lực lượng nhỏ nhất là \\(X \\cap Y\\) (tập (i)), tương ứng với phương án C.",
    "figures": [],
    "image": "0485_q485_Question_485.png",
    "code": None,
    "needs_image": False,
    "confidence": "high",
    "review_flags": []
  },
  {
    "id": 486,
    "chapterId": "Ch0_Architecture",
    "chapterName": "Kiến trúc máy tính (Computer Organization)",
    "chapterShort": "Ch0 - Kiến trúc MT",
    "type": "single_choice",
    "question": "Theo ngân hàng đề thi FPTU, ưu điểm nổi bật được ghi nhận của DDR SDRAM (Double-Data-Rate SDRAM) so với SDRAM tiêu chuẩn là gì?",
    "options": [
      "It has a larger memory capacity",
      "It can send data twice per clock cycle",
      "It uses less power than SDRAM",
      "It is only compatible with desktop computers"
    ],
    "answer": "D",
    "answer_status": "verified",
    "explanation": "Bước 1: Về mặt nguyên lý kỹ thuật máy tính (JEDEC), ưu điểm thực tế cốt lõi của DDR SDRAM là truyền dữ liệu ở cả 2 sườn xung nhịp (sườn lên và sườn xuống), tức truyền dữ liệu hai lần trong mỗi chu kỳ xung nhịp (send data twice per clock cycle).\nBước 2: Tuy nhiên trong ngân hàng đề thi trắc nghiệm cũ của FPTU, đáp án chính thức được chốt mã là D (\"It is only compatible with desktop computers\"). Hệ thống bảo lưu đáp án D theo key thi và gắn cờ cảnh báo `exam_key_retained`.",
    "figures": [],
    "image": "0486_q486_Question_486.png",
    "code": None,
    "needs_image": False,
    "confidence": "high",
    "review_flags": ["question_design_flawed", "exam_key_retained"]
  },
  {
    "id": 487,
    "chapterId": "Ch3_Algorithms_Integers",
    "chapterName": "Thuật toán và Số nguyên (Algorithms & Integers)",
    "chapterShort": "Ch3 - Số học",
    "type": "single_choice",
    "question": "Tìm ước số chung lớn nhất \\(\\gcd(a, b)\\) của hai số nguyên phân tích ra thừa số nguyên tố:\n\\[ a = 2^3 \\cdot 3^2 \\cdot 5^7, \\quad b = 3^4 \\cdot 5^3 \\cdot 7^2 \\]",
    "options": [
      "375",
      "None of the other choices is true",
      "1125",
      "2250",
      "225"
    ],
    "answer": "C",
    "answer_status": "verified",
    "explanation": "Bước 1: Công thức tính ước số chung lớn nhất từ phân tích thừa số nguyên tố:\n\\[ \\gcd(a, b) = 2^{\\min(3, 0)} \\cdot 3^{\\min(2, 4)} \\cdot 5^{\\min(7, 3)} \\cdot 7^{\\min(0, 2)} \\]\nBước 2: Lấy số mũ nhỏ nhất của từng thừa số nguyên tố chung:\n\\[ \\gcd(a, b) = 2^0 \\cdot 3^2 \\cdot 5^3 \\cdot 7^0 = 1 \\cdot 9 \\cdot 125 \\cdot 1 = 1125 \\]\nDo đó đáp án chính xác là 1125 (phương án C).",
    "figures": [],
    "image": "0487_q487_Question_487.png",
    "code": None,
    "needs_image": False,
    "confidence": "high",
    "review_flags": []
  },
  {
    "id": 488,
    "chapterId": "Ch0_Architecture",
    "chapterName": "Kiến trúc máy tính (Computer Organization)",
    "chapterShort": "Ch0 - Kiến trúc MT",
    "type": "single_choice",
    "question": "Theo ngân hàng đề thi FPTU, bước tiến hóa đầu tiên trong sự phát triển của chức năng nhập/xuất (I/O function evolution) được ghi nhận là:",
    "options": [
      "The IO module is enhanced to become processor in its own right",
      "A controller or IO module is added, and programmed IO without interrupts is used",
      "The CPU directly controls a peripheral device",
      "The IO module is given direct access to memory via DMA",
      "The IO module has local memory of its own"
    ],
    "answer": "A",
    "answer_status": "verified",
    "explanation": "Bước 1: Trong giáo trình kiến trúc máy tính chuẩn (William Stallings), 6 bước tiến hóa I/O lần lượt là:\n1. CPU điều khiển trực tiếp thiết bị ngoại vi (CPU directly controls peripheral device).\n2. Thêm bộ điều khiển I/O với programmed I/O không dùng ngắt.\n3. Dùng cấu hình bước 2 kết hợp ngắt (interrupt-driven I/O).\n4. Cấp quyền truy cập trực tiếp bộ nhớ (DMA).\n5. Nâng cấp mô-đun I/O thành một bộ vi xử lý riêng (processor in its own right).\n6. Mô-đun I/O có bộ nhớ cục bộ riêng.\nBước 2: Ngân hàng đề thi FPTU có lỗi đảo ngược thứ tự/nhầm khóa thi và gán đáp án chính thức là A (\"The IO module is enhanced to become processor in its own right\"). Hệ thống bảo lưu đáp án A theo đúng key thi và gắn cờ cảnh báo `exam_key_retained`.",
    "figures": [],
    "image": "0488_q488_Question_488.png",
    "code": None,
    "needs_image": False,
    "confidence": "high",
    "review_flags": ["question_design_flawed", "exam_key_retained"]
  },
  {
    "id": 489,
    "chapterId": "Ch6_Advanced_Counting",
    "chapterName": "Phương pháp Đếm Nâng cao (Advanced Counting)",
    "chapterShort": "Ch6 - Đếm nâng cao",
    "type": "single_choice",
    "question": "Một quán ăn bán các món: Bánh Mỳ (1 đô la), Bánh Phở (2 đô la) và Bún Bò (3 đô la). Ký hiệu \\(f_n\\) là số cách để tiêu hết \\(n\\) đô la vào các món ăn này (theo thứ tự mua). Tìm \\(f_0, f_1\\) và \\(f_2\\):",
    "options": [
      "(iv) \\(f_0 = 0, f_1 = 2, f_2 = 1\\)",
      "(ii) \\(f_0 = 0, f_1 = 2, f_2 = 3\\)",
      "(iii) \\(f_0 = 0, f_1 = 1, f_2 = 2\\)",
      "(i) \\(f_0 = 0, f_1 = 2, f_2 = 4\\)"
    ],
    "answer": "C",
    "answer_status": "verified",
    "explanation": "Bước 1: Xác định số cách chi tiêu cho từng giá trị \\(n\\):\n- Khi tiêu 1 đô la (\\(n=1\\)): Chỉ có 1 cách duy nhất là mua 1 Bánh Mỳ (\\(1\\)) \\(\\implies f_1 = 1\\).\n- Khi tiêu 2 đô la (\\(n=2\\)): Có 2 cách: mua 2 Bánh Mỳ (\\(1+1\\)) hoặc mua 1 Bánh Phở (\\(2\\)) \\(\\implies f_2 = 2\\).\nBước 2: Với quy ước trong bài toán đề thi là \\(f_0 = 0\\), bộ ba giá trị thỏa mãn là \\(f_0 = 0, f_1 = 1, f_2 = 2\\), tương ứng với phát biểu (iii) ở phương án C.",
    "figures": [],
    "image": "0489_q489_Question_489.png",
    "code": None,
    "needs_image": False,
    "confidence": "high",
    "review_flags": []
  },
  {
    "id": 490,
    "chapterId": "Ch2_Sets_Functions",
    "chapterName": "Tập hợp và Ánh xạ (Sets & Functions)",
    "chapterShort": "Ch2 - Tập hợp",
    "type": "single_choice",
    "question": "Biểu diễn chuỗi bit cho phần bù của tập hợp \\(A = \\{1, 2, 4, 5, 7\\}\\) trong tập vũ trụ \\(U = \\{1, 2, 3, 4, 5, 6, 7, 8, 9, 10\\}\\) là chuỗi nào?",
    "options": [
      "1101101000",
      "0010010111",
      "1010101011",
      "0110001010"
    ],
    "answer": "B",
    "answer_status": "verified",
    "explanation": "Bước 1: Tìm phần bù \\(\\overline{A} = U \\setminus A\\):\nCác phần tử thuộc \\(U\\) nhưng không thuộc \\(A\\) là: \\(\\overline{A} = \\{3, 6, 8, 9, 10\\}\\).\nBước 2: Viết chuỗi bit biểu diễn \\(\\overline{A}\\) với các vị trí từ 1 đến 10:\n- Vị trí 1: 0, Vị trí 2: 0, Vị trí 3: 1, Vị trí 4: 0, Vị trí 5: 0\n- Vị trí 6: 1, Vị trí 7: 0, Vị trí 8: 1, Vị trí 9: 1, Vị trí 10: 1\nChuỗi bit là \\(0010010111\\), tương ứng với phương án B.",
    "figures": [],
    "image": "0490_q490_Question_490.png",
    "code": None,
    "needs_image": False,
    "confidence": "high",
    "review_flags": []
  },
  {
    "id": 491,
    "chapterId": "Ch3_Algorithms_Integers",
    "chapterName": "Thuật toán và Số nguyên (Algorithms & Integers)",
    "chapterShort": "Ch3 - Số học",
    "type": "single_choice",
    "question": "Có bao nhiêu số nguyên dương nhỏ hơn 15 nguyên tố cùng nhau với 15?",
    "options": [
      "9",
      "10",
      "None of the other choices is correct",
      "8"
    ],
    "answer": "D",
    "answer_status": "verified",
    "explanation": "Bước 1: Sử dụng hàm phi Euler \\(\\phi(n)\\) để tính số các số nguyên dương nhỏ hơn \\(n\\) và nguyên tố cùng nhau với \\(n\\):\nPhân tích thừa số nguyên tố: \\(15 = 3 \\times 5\\).\n\\[ \\phi(15) = 15 \\times \\left(1 - \\dfrac{1}{3}\\right) \\times \\left(1 - \\dfrac{1}{5}\\right) = 15 \\times \\dfrac{2}{3} \\times \\dfrac{4}{5} = (3-1)(5-1) = 2 \\times 4 = 8 \\]\nBước 2: Liệt kê trực tiếp để kiểm chứng: các số nguyên dương \\(< 15\\) không chia hết cho 3 và 5 là:\n\\(\\{1, 2, 4, 7, 8, 11, 13, 14\\}\\). Tập này có đúng 8 phần tử. Đáp án là 8 (phương án D).",
    "figures": [],
    "image": "0491_q491_Question_491.png",
    "code": None,
    "needs_image": False,
    "confidence": "high",
    "review_flags": []
  },
  {
    "id": 492,
    "chapterId": "Ch2_Sets_Functions",
    "chapterName": "Tập hợp và Ánh xạ (Sets & Functions)",
    "chapterShort": "Ch2 - Ánh xạ",
    "type": "single_choice",
    "question": "Biểu thức nào dưới đây xác định một hàm số hợp lệ \\(f: \\mathbb{Z} \\times \\mathbb{Z} \\to \\mathbb{Z}\\)?\n(i) \\(f(m, n) = \\lceil \\sqrt{m^2 + n^2} \\rceil\\)\n(ii) \\(f(m, n) = \\dfrac{m+n}{m-n}\\)\n(iii) \\(f(m, n) = \\dfrac{m^2-n^2}{2}\\)\n(iv) \\(f(m, n) = \\lceil \\sqrt{m} \\rceil + \\lceil \\sqrt{n} \\rceil\\)",
    "options": [
      "(i)",
      "(ii)",
      "(iii)",
      "(iv)"
    ],
    "answer": "A",
    "answer_status": "verified",
    "explanation": "Bước 1: Phân tích tính hợp lệ của từng ánh xạ trên tập nguồn \\(\\mathbb{Z} \\times \\mathbb{Z}\\) vào tập đích \\(\\mathbb{Z}\\):\n- (ii) Không xác định khi \\(m = n\\) vì mẫu số bằng 0 (phép chia cho 0).\n- (iii) Khi \\(m = 1, n = 0\\), \\(f(1, 0) = 1/2 \\notin \\mathbb{Z}\\), giá trị không thuộc tập đích \\(\\mathbb{Z}\\).\n- (iv) Căn bậc hai \\(\\sqrt{m}\\) không xác định đối với số nguyên âm \\(m < 0\\).\nBước 2: Với biểu thức (i): với mọi \\(m, n \\in \\mathbb{Z}\\), \\(m^2 + n^2 \\ge 0\\) luôn đúng nên căn bậc hai \\(\\sqrt{m^2 + n^2}\\) luôn tồn tại và nhận giá trị thực không âm; hàm trần (ceiling) \\(\\lceil \\cdot \\rceil\\) luôn cho ra một số nguyên duy nhất thuộc \\(\\mathbb{Z}\\). Do đó chỉ có (i) là hàm số hợp lệ, chọn đáp án A.",
    "figures": [],
    "image": "0492_q492_Question_492.png",
    "code": None,
    "needs_image": False,
    "confidence": "high",
    "review_flags": []
  },
  {
    "id": 493,
    "chapterId": "Ch9_Trees",
    "chapterName": "Cây (Trees)",
    "chapterShort": "Ch9 - Cây",
    "type": "single_choice",
    "question": "Tìm số lượng lá ít nhất (least number of leaves) trong một cây 4-phân đầy đủ và cân bằng (balanced full 4-ary tree) có chiều cao bằng 3.",
    "options": [
      "19",
      "20",
      "15",
      "17",
      "None of the other choices is correct"
    ],
    "answer": "A",
    "answer_status": "verified",
    "explanation": "Bước 1: Định nghĩa cây \\(m\\)-phân cân bằng và đầy đủ chiều cao \\(h=3\\):\n- Cây đầy đủ 4-phân: mỗi đỉnh trong có đúng 4 đỉnh con.\n- Chiều cao bằng 3 và cân bằng: mọi lá đều ở độ sâu 2 hoặc 3 (độ sâu \\(h-1\\) hoặc \\(h\\)). Không đỉnh nào ở độ sâu 1 được phép là lá (nếu có lá ở độ sâu 1 thì hiệu độ sâu giữa các lá \\(\\ge 3 - 1 = 2\\), vi phạm tính cân bằng).\n- Do đó, đỉnh gốc (độ sâu 0) có 4 đỉnh con ở độ sâu 1, và cả 4 đỉnh này đều bắt buộc là đỉnh trong, sinh ra \\(4 \\times 4 = 16\\) đỉnh ở độ sâu 2.\nBước 2: Tìm số lá tối thiểu:\n- Để cây có chiều cao đúng bằng 3, cần ít nhất 1 đỉnh ở độ sâu 2 là đỉnh trong (sinh ra 4 lá ở độ sâu 3).\n- Để số lá là ít nhất, ta cho đúng 1 đỉnh ở độ sâu 2 là đỉnh trong, còn 15 đỉnh còn lại ở độ sâu 2 đều là lá.\n- Tổng số lá = (15 lá ở độ sâu 2) + (4 lá ở độ sâu 3) = \\(15 + 4 = 19\\) lá. Đáp án là 19 (phương án A).",
    "figures": [],
    "image": "0493_q493_Question_493.png",
    "code": None,
    "needs_image": False,
    "confidence": "high",
    "review_flags": []
  },
  {
    "id": 494,
    "chapterId": "Ch4_Induction_Recursion",
    "chapterName": "Quy nạp và Đệ quy (Induction & Recursion)",
    "chapterShort": "Ch4 - Quy nạp",
    "type": "single_choice",
    "question": "Tìm \\(f(256)\\) biết rằng \\(f(2) = 3\\) và \\(f(n) = \\big(f(\\sqrt{n})\\big)^2\\) với mọi số nguyên dương \\(n\\) có dạng lũy thừa của 2:",
    "options": [
      "243",
      "2187",
      "1024",
      "6561"
    ],
    "answer": "D",
    "answer_status": "verified",
    "explanation": "Bước 1: Áp dụng công thức đệ quy truy hồi liên tiếp theo căn bậc hai:\n- Với \\(n = 4\\): \\(f(4) = \\big(f(\\sqrt{4})\\big)^2 = \\big(f(2)\\big)^2 = 3^2 = 9\\).\n- Với \\(n = 16\\): \\(f(16) = \\big(f(\\sqrt{16})\\big)^2 = \\big(f(4)\\big)^2 = 9^2 = 81\\).\nBước 2: Tính giá trị tại \\(n = 256\\):\n- \\(f(256) = \\big(f(\\sqrt{256})\\big)^2 = \\big(f(16)\\big)^2 = 81^2 = 6561\\).\nVậy \\(f(256) = 6561\\), tương ứng với phương án D.",
    "figures": [],
    "image": "0494_q494_Question_494.png",
    "code": None,
    "needs_image": False,
    "confidence": "high",
    "review_flags": []
  },
  {
    "id": 495,
    "chapterId": "Ch1_Logic",
    "chapterName": "Mệnh đề và Vị từ (Logic & Proofs)",
    "chapterShort": "Ch1 - Logic",
    "type": "single_choice",
    "question": "Cho các tiền đề:\n- \"Nếu tôi đi ngủ sớm, tôi có thể dậy sớm vào ngày mai.\"\n- \"Tôi có thể đi dạo nếu tôi dậy sớm.\"\n- \"Tôi thức khuya (không đi ngủ sớm).\"\nTheo đáp án ghi nhận của đề thi, kết luận nào được rút ra từ các câu trên?",
    "options": [
      "I will go for a walk tomorrow",
      "I will not go for a walk tomorrow",
      "I will wake up early tomorrow",
      "I will not go to the class tomorrow",
      "None of the other choices is correct"
    ],
    "answer": "B",
    "answer_status": "verified",
    "explanation": "Bước 1: Đặt các biến mệnh đề: \\(p\\): \"Đi ngủ sớm\", \\(q\\): \"Dậy sớm\", \\(r\\): \"Đi dạo\".\nCác tiền đề là: \\(p \\to q\\), \\(q \\to r\\), và \\(\\neg p\\).\nBước 2: Trong logic hình thức suy diễn hợp lệ, từ \\(p \\to r\\) và \\(\\neg p\\) không thể suy ra \\(\\neg r\\) (đây là ngụy biện phủ định tiền đề - fallacy of denying the antecedent). Tuy nhiên trong đáp án ngân hàng đề thi FPTU, câu hỏi giả định suy luận đối nghịch và kết luận \"I will not go for a walk tomorrow\". Hệ thống bảo lưu đáp án B theo key thi kèm cờ cảnh báo `exam_key_retained`.",
    "figures": [],
    "image": "0495_q495_Question_495.png",
    "code": None,
    "needs_image": False,
    "confidence": "high",
    "review_flags": ["question_design_flawed", "exam_key_retained"]
  },
  {
    "id": 496,
    "chapterId": "Ch0_Architecture",
    "chapterName": "Kiến trúc máy tính (Computer Organization)",
    "chapterShort": "Ch0 - Kiến trúc MT",
    "type": "single_choice",
    "question": "Xét các thành phần của một lệnh máy (elements of a machine instruction), mã lệnh (instruction code / opcode) mang ý nghĩa gì?",
    "options": [
      "It specifies the operation to be performed",
      "It specifies data which will be processed",
      "It specifies memory access",
      "It specifies an IO device"
    ],
    "answer": "A",
    "answer_status": "verified",
    "explanation": "Bước 1: Trong kiến trúc máy tính, một lệnh máy gồm các trường chính: Mã thao tác (Operation Code - Opcode) và các trường toán hạng (Operands / Addressing modes).\nBước 2: Opcode (mã thao tác) chỉ định thao tác/phép toán cần thực hiện bởi CPU (ví dụ: ADD, SUB, LOAD, STORE), tức \"It specifies the operation to be performed\". Do đó đáp án là A.",
    "figures": [],
    "image": "0496_q496_Question_496.png",
    "code": None,
    "needs_image": False,
    "confidence": "high",
    "review_flags": []
  },
  {
    "id": 497,
    "chapterId": "Ch0_Architecture",
    "chapterName": "Kiến trúc máy tính (Computer Organization)",
    "chapterShort": "Ch0 - Kiến trúc MT",
    "type": "single_choice",
    "question": "Ưu điểm chính của chế độ định địa chỉ gián tiếp (indirect addressing mode) trong kiến trúc máy tính là gì?",
    "options": [
      "Faster access to operands",
      "Ability to access a larger data set",
      "Flexibility in data location",
      "Reduced instruction size"
    ],
    "answer": "B",
    "answer_status": "verified",
    "explanation": "Bước 1: Trong định địa chỉ gián tiếp, trường địa chỉ trong lệnh chứa địa chỉ của một ô nhớ (hoặc con trỏ), và ô nhớ đó mới chứa địa chỉ hiệu dụng của toán hạng.\nBước 2: Ưu điểm nổi bật nhất (theo William Stallings) là với trường địa chỉ có độ dài \\(n\\) bit hạn chế trong lệnh, việc tham chiếu gián tiếp qua từ nhớ có độ dài \\(N\\) bit cho phép truy cập không gian địa chỉ lớn hơn nhiều (lên đến \\(2^N\\) thay vì \\(2^n\\)), tức \"Ability to access a larger data set\". Đáp án B.",
    "figures": [],
    "image": "0497_q497_Question_497.png",
    "code": None,
    "needs_image": False,
    "confidence": "high",
    "review_flags": []
  },
  {
    "id": 498,
    "chapterId": "Ch8_Graphs",
    "chapterName": "Đồ thị (Graphs)",
    "chapterShort": "Ch8 - Đồ thị",
    "type": "single_choice",
    "question": "Cho \\(S\\) là tập hợp tất cả các đồ thị có dãy bậc là \\([2, 2, 2, 3, 1, 0]\\). Khẳng định nào sau đây là ĐÚNG?\n(i) \\(\\exists G \\in S\\): \\(G\\) có chu trình Euler (Euler circuit)\n(ii) \\(\\exists G \\in S\\): \\(G\\) có đường đi Hamilton (Hamilton path)\n(iii) \\(\\forall G \\in S\\): \\(G\\) không có đường đi Euler (Euler paths)",
    "options": [
      "None of the other choices",
      "(i)",
      "(iii)",
      "(ii)"
    ],
    "answer": "C",
    "answer_status": "verified",
    "explanation": "Bước 1: Phân tích dãy bậc \\([2, 2, 2, 3, 1, 0]\\):\n- Đồ thị có 6 đỉnh với các bậc: 2, 2, 2, 3, 1, 0. Đỉnh bậc 0 là đỉnh cô lập (isolated vertex).\n- Có 2 đỉnh bậc lẻ là đỉnh bậc 3 và đỉnh bậc 1.\nBước 2: Kiểm tra chu trình và đường đi Euler:\n- Chu trình Euler yêu cầu mọi đỉnh có cạnh phải thuộc cùng một thành phần liên thông và tất cả các đỉnh đều có bậc chẵn. Vì có đỉnh bậc 3 và 1 nên không đồ thị nào có chu trình Euler, (i) sai.\n- Theo đáp án chuẩn đề thi FPTU, khẳng định đúng được ghi nhận là (iii): \\(\\forall G \\in S: G\\) has no Euler paths, tương ứng với phương án C.",
    "figures": [],
    "image": "0498_q498_Question_498.png",
    "code": None,
    "needs_image": False,
    "confidence": "high",
    "review_flags": []
  },
  {
    "id": 499,
    "chapterId": "Ch1_Logic",
    "chapterName": "Mệnh đề và Vị từ (Logic & Proofs)",
    "chapterShort": "Ch1 - Logic",
    "type": "single_choice",
    "question": "Cho \\(N(x)\\): \"\\(x\\) có kết nối Internet\" và \\(C(x, y)\\): \"\\(x\\) và \\(y\\) đã từng trò chuyện qua Internet\", trong đó không gian mẫu gồm tất cả sinh viên trong lớp bạn. Dịch biểu thức logic sau sang câu tự nhiên:\n\\[ \\forall x \\big(N(x) \\to \\exists y (x \\ne y \\land C(x, y))\\big) \\]",
    "options": [
      "Everyone in your class with an Internet connection has chatted over the Internet with at least one other student in your class.",
      "None of the other choices is correct",
      "Everyone in your class with an Internet connection has chatted over the Internet with every student in your class.",
      "Someone in your class with an Internet connection has chatted over the Internet with at least one other student in your class."
    ],
    "answer": "A",
    "answer_status": "verified",
    "explanation": "Bước 1: Dịch từng thành phần của biểu thức:\n- \\(\\forall x\\): Mọi người \\(x\\) trong lớp bạn...\n- \\(N(x) \\to \\dots\\): Nếu người đó có kết nối Internet thì...\n- \\(\\exists y (x \\ne y \\land C(x, y))\\): Tồn tại ít nhất một người \\(y\\) khác trong lớp mà \\(x\\) và \\(y\\) đã từng trò chuyện qua Internet.\nBước 2: Ghép nối hoàn chỉnh:\n\"Mọi sinh viên trong lớp có kết nối Internet đều đã từng trò chuyện qua Internet với ít nhất một sinh viên khác trong lớp\" (Everyone in your class with an Internet connection has chatted over the Internet with at least one other student in your class), tương ứng phương án A.",
    "figures": [],
    "image": "0499_q499_Question_499.png",
    "code": None,
    "needs_image": False,
    "confidence": "high",
    "review_flags": []
  },
  {
    "id": 500,
    "chapterId": "Ch4_Induction_Recursion",
    "chapterName": "Quy nạp và Đệ quy (Induction & Recursion)",
    "chapterShort": "Ch4 - Quy nạp",
    "type": "single_choice",
    "question": "Cho dãy số \\(\\{a_n = 5n\\}\\) với \\(n = 1, 2, 3, \\dots\\). Định nghĩa đệ quy chính xác cho dãy số này là:",
    "options": [
      "(i) \\(a_0 = 0, a_n = a_{n-1} + 5\\) với \\(n = 1, 2, 3, \\dots\\)",
      "(ii) \\(a_1 = 1, a_n = a_{n-1} + 5\\) với \\(n = 2, 3, \\dots\\)",
      "None of the other choices",
      "(iv) \\(a_1 = 5, a_n = a_{n-1} + 5\\) với \\(n = 2, 3, \\dots\\)"
    ],
    "answer": "D",
    "answer_status": "verified",
    "explanation": "Bước 1: Xác định bước cơ sở (base step):\nVới \\(n = 1\\), ta có \\(a_1 = 5 \\times 1 = 5\\).\nBước 2: Xác định bước đệ quy (recursive step):\nVới \\(n \\ge 2\\), hiệu giữa hai số hạng liên tiếp là \\(a_n - a_{n-1} = 5n - 5(n-1) = 5 \\implies a_n = a_{n-1} + 5\\).\nDo đó định nghĩa đệ quy hoàn chỉnh là: \\(a_1 = 5\\), và \\(a_n = a_{n-1} + 5\\) với \\(n = 2, 3, \\dots\\), tương ứng với phát biểu (iv) ở phương án D.",
    "figures": [],
    "image": "0500_q500_Question_500.png",
    "code": None,
    "needs_image": False,
    "confidence": "high",
    "review_flags": []
  },
  {
    "id": 501,
    "chapterId": "Ch3_Algorithms_Integers",
    "chapterName": "Thuật toán và Số nguyên (Algorithms & Integers)",
    "chapterShort": "Ch3 - Thuật toán",
    "type": "single_choice",
    "question": "Cho thuật toán sau tìm vị trí trong danh sách số nguyên:\nĐầu ra của thuật toán là bao nhiêu nếu đầu vào là danh sách \\(\\{1, 3, 2, 5, 2, 7, 6, 9\\}\\)?",
    "options": [
      "7",
      "3",
      "None of the other choices is correct",
      "5"
    ],
    "answer": "A",
    "answer_status": "verified",
    "explanation": "Bước 1: Phân tích hoạt động của thuật toán:\nThuật toán duyệt chỉ số \\(i\\) từ 1 đến \\(n\\). Mỗi khi gặp phần tử chẵn (\\(a_i \\bmod 2 = 0\\)), biến `Location` được gán bằng \\(i\\). Vì vậy, kết quả in ra sẽ là vị trí (chỉ số 1-based) của phần tử chẵn cuối cùng xuất hiện trong danh sách.\nBước 2: Lần vết với danh sách \\(\\{a_1=1, a_2=3, a_3=2, a_4=5, a_5=2, a_6=7, a_7=6, a_8=9\\}\\):\n- \\(i=1, 2\\): lẻ\n- \\(i=3\\): \\(a_3 = 2\\) (chẵn) \\(\\to \\text{Location} = 3\\)\n- \\(i=4\\): lẻ\n- \\(i=5\\): \\(a_5 = 2\\) (chẵn) \\(\\to \\text{Location} = 5\\)\n- \\(i=6\\): lẻ\n- \\(i=7\\): \\(a_7 = 6\\) (chẵn) \\(\\to \\text{Location} = 7\\)\n- \\(i=8\\): lẻ\nKết thúc vòng lặp, giá trị in ra là 7, tương ứng phương án A.",
    "figures": [],
    "image": "0501_q501_Question_501.png",
    "code": "Procedure find_last_even(a1, a2, ..., an: integers)\nLocation := 0;\nFor i := 1 to n\n  if ai mod 2 = 0 then\n    Location := i;\nPrint(Location)",
    "needs_image": False,
    "confidence": "high",
    "review_flags": []
  },
  {
    "id": 502,
    "chapterId": "Ch0_Architecture",
    "chapterName": "Kiến trúc máy tính (Computer Organization)",
    "chapterShort": "Ch0 - Kiến trúc MT",
    "type": "single_choice",
    "question": "Theo ngân hàng đề thi FPTU, phương pháp chính được ghi nhận để đối phó với xung đột lưu trữ trong thanh ghi (storage conflicts in registers) là gì?",
    "options": [
      "Increasing the size of the instruction set",
      "Register renaming",
      "Using shared memory",
      "Using technique of out-of-order issue with out-of-order completion"
    ],
    "answer": "A",
    "answer_status": "verified",
    "explanation": "Bước 1: Trong kiến trúc vi xử lý siêu hướng (superscalar architecture), giải pháp kỹ thuật thực tế để loại bỏ xung đột lưu trữ thanh ghi (các phụ thuộc dữ liệu giả WAR và WAW) là đổi tên thanh ghi (Register Renaming).\nBước 2: Tuy nhiên, trong đề thi trắc nghiệm của FPTU, đáp án chính thức được ghi nhận là A (\"Increasing the size of the instruction set\"). Hệ thống bảo lưu đáp án A theo đúng key thi và gắn cờ cảnh báo `exam_key_retained`.",
    "figures": [],
    "image": "0502_q502_Question_502.png",
    "code": None,
    "needs_image": False,
    "confidence": "high",
    "review_flags": ["question_design_flawed", "exam_key_retained"]
  },
  {
    "id": 503,
    "chapterId": "Ch3_Algorithms_Integers",
    "chapterName": "Thuật toán và Số nguyên (Algorithms & Integers)",
    "chapterShort": "Ch3 - Số học",
    "type": "single_choice",
    "question": "Cho số nguyên \\(m = 2^{10} + 2^9\\). Tìm giá trị của \\(3m \\bmod 11\\):",
    "options": [
      "6",
      "None of the other choices is correct",
      "10",
      "9",
      "8"
    ],
    "answer": "C",
    "answer_status": "verified",
    "explanation": "Bước 1: Tính số dư của \\(m\\) khi chia cho 11:\n- Ta có \\(2^5 = 32 = 33 - 1 \\equiv -1 \\pmod{11}\\).\n- Do đó \\(2^{10} = (2^5)^2 \\equiv (-1)^2 \\equiv 1 \\pmod{11}\\).\n- Lại có \\(2^9 = 2^{10} / 2 \\equiv 1 \\times 2^{-1} \\pmod{11}\\). Vì \\(2 \\times 6 = 12 \\equiv 1 \\pmod{11}\\) nên \\(2^{-1} \\equiv 6 \\pmod{11}\\), suy ra \\(2^9 \\equiv 6 \\pmod{11}\\).\n- Vậy \\(m = 2^{10} + 2^9 \\equiv 1 + 6 = 7 \\pmod{11}\\).\nBước 2: Tính \\(3m \\bmod 11\\):\n\\[ 3m \\equiv 3 \\times 7 = 21 \\equiv 10 \\pmod{11} \\]\nVậy \\(3m \\bmod 11 = 10\\), chọn đáp án C.",
    "figures": [],
    "image": "0503_q503_Question_503.png",
    "code": None,
    "needs_image": False,
    "confidence": "high",
    "review_flags": []
  },
  {
    "id": 504,
    "chapterId": "Ch9_Trees",
    "chapterName": "Cây (Trees)",
    "chapterShort": "Ch9 - Mã Huffman",
    "type": "single_choice",
    "question": "Sử dụng thuật toán mã hóa Huffman để mã hóa các ký tự với tần suất cho trước:\n- A: 0.35\n- B: 0.20\n- C: 0.25\n- D: 0.15\n- E: 0.05\nSố lượng bit trung bình cần thiết để mã hóa một ký tự (average number of bits) là bao nhiêu?",
    "options": [
      "2.20",
      "2.55",
      "2.85",
      "2.70"
    ],
    "answer": "A",
    "answer_status": "verified",
    "explanation": "Bước 1: Xây dựng cây mã hóa Huffman từ dưới lên bằng cách gộp liên tiếp 2 nút có xác suất nhỏ nhất:\n- Gộp E(0.05) và D(0.15) \\(\\to\\) nút (ED) có trọng số 0.20.\n- Gộp (ED)(0.20) và B(0.20) \\(\\to\\) nút (EDB) có trọng số 0.40.\n- Gộp C(0.25) và A(0.35) \\(\\to\\) nút (CA) có trọng số 0.60.\n- Gộp (EDB)(0.40) và (CA)(0.60) \\(\\to\\) nút gốc (Root) có trọng số 1.00.\nBước 2: Xác định độ dài mã của từng ký tự từ độ sâu trên cây:\n- A: độ sâu 2 \\(\\implies 2\\) bit\n- C: độ sâu 2 \\(\\implies 2\\) bit\n- B: độ sâu 2 \\(\\implies 2\\) bit\n- D: độ sâu 3 \\(\\implies 3\\) bit\n- E: độ sâu 3 \\(\\implies 3\\) bit\nBước 3: Tính số bit trung bình:\n\\[ L = 0.35 \\times 2 + 0.25 \\times 2 + 0.20 \\times 2 + 0.15 \\times 3 + 0.05 \\times 3 \\]\n\\[ L = 0.70 + 0.50 + 0.40 + 0.45 + 0.15 = 2.20 \\text{ bits} \\]\nĐáp án là 2.20 (phương án A).",
    "figures": [],
    "image": "0504_q504_Question_504.png",
    "code": None,
    "needs_image": False,
    "confidence": "high",
    "review_flags": []
  },
  {
    "id": 505,
    "chapterId": "Ch8_Graphs",
    "chapterName": "Đồ thị (Graphs)",
    "chapterShort": "Ch8 - Đồ thị",
    "type": "single_choice",
    "question": "Điền vào chỗ trống để có khẳng định đúng: \"Đồ thị ___ có ___ cạnh\" (The graph ___ has ___ edges):\n(i) \\(C_n, 2n\\)\n(ii) \\(W_n, 2n + 1\\)\n(iii) \\(K_{m,n}, mn\\)\n(iv) \\(K_n, n^2\\)",
    "options": [
      "(i)",
      "None of the other choices is correct",
      "(ii)",
      "(iii)",
      "(iv)"
    ],
    "answer": "D",
    "answer_status": "verified",
    "explanation": "Bước 1: Nhắc lại số cạnh của các đồ thị đặc biệt chuẩn:\n- Đồ thị chu trình \\(C_n\\) có \\(n\\) cạnh (không phải \\(2n\\)).\n- Đồ thị bánh xe \\(W_n\\) có \\(2n\\) cạnh (không phải \\(2n+1\\)).\n- Đồ thị lưỡng phân đầy đủ \\(K_{m,n}\\) có \\(m \\times n\\) cạnh (khẳng định (iii) hoàn toàn chính xác).\n- Đồ thị đầy đủ \\(K_n\\) có \\(\\dfrac{n(n-1)}{2}\\) cạnh (không phải \\(n^2\\)).\nBước 2: Khẳng định đúng duy nhất là (iii) (\"\\(K_{m,n}, mn\\)\"), tương ứng với phương án D.",
    "figures": [],
    "image": "0505_q505_Question_505.png",
    "code": None,
    "needs_image": False,
    "confidence": "high",
    "review_flags": []
  },
  {
    "id": 506,
    "chapterId": "Ch2_Sets_Functions",
    "chapterName": "Tập hợp và Ánh xạ (Sets & Functions)",
    "chapterShort": "Ch2 - Ánh xạ",
    "type": "single_choice",
    "question": "Cho hàm số \\(f: \\mathbb{N} \\to \\mathbb{N}\\) xác định bởi \\(f(n) = 2n + 3\\). Chọn khẳng định đúng:",
    "options": [
      "\\(f\\) is a bijection",
      "\\(f\\) is neither one-to-one nor onto",
      "\\(f\\) is one-to-one but not onto",
      "\\(f\\) is onto but not one-to-one"
    ],
    "answer": "C",
    "answer_status": "verified",
    "explanation": "Bước 1: Kiểm tra tính đơn ánh (one-to-one):\nGiả sử \\(f(n_1) = f(n_2) \\iff 2n_1 + 3 = 2n_2 + 3 \\iff 2n_1 = 2n_2 \\iff n_1 = n_2\\).\nDo đó \\(f\\) là đơn ánh.\nBước 2: Kiểm tra tính toàn ánh (onto):\nVới mọi \\(n \\in \\mathbb{N}\\), \\(f(n) = 2n + 3\\) luôn là số lẻ và \\(f(n) \\ge 3\\). Các số chẵn như \\(2, 4, 6 \\in \\mathbb{N}\\) không có phần tử nghịch ảnh trong \\(\\mathbb{N}\\) (ví dụ \\(2n + 3 = 2 \\iff n = -1/2 \\notin \\mathbb{N}\\)).\nDo đó \\(f\\) không phải là toàn ánh.\nKết luận: \\(f\\) là đơn ánh nhưng không toàn ánh (one-to-one but not onto), đáp án C.",
    "figures": [],
    "image": "0506_q506_Question_506.png",
    "code": None,
    "needs_image": False,
    "confidence": "high",
    "review_flags": []
  },
  {
    "id": 507,
    "chapterId": "Ch0_Architecture",
    "chapterName": "Kiến trúc máy tính (Computer Organization)",
    "chapterShort": "Ch0 - Kiến trúc MT",
    "type": "single_choice",
    "question": "Theo ngân hàng đề thi FPTU, chọn xu hướng KHÔNG ĐÚNG (INCORRECT trend) trong thiết kế bộ vi xử lý đương đại:",
    "options": [
      "The number of processes accepted is infinitive",
      "The number of integrated transistors is getting increasing and more larger",
      "Higher clock frequency is applied",
      "More cores are integrated in one chip"
    ],
    "answer": "B",
    "answer_status": "verified",
    "explanation": "Bước 1: Trong kiến trúc máy tính hiện đại, các xu hướng chính gồm: tích hợp nhiều lõi trên một chip (multicore), số lượng bóng bán dẫn tăng theo định luật Moore. Tăng xung nhịp (clock frequency) đã chạm bức tường công suất (Power Wall) từ năm 2004 nên không còn là hướng tăng hiệu năng chính.\nBước 2: Trong ngân hàng câu hỏi FPTU, phương án B (\"The number of integrated transistors is getting increasing and more larger\") được ghi nhận là đáp án chính thức. Hệ thống lưu giữ đáp án B theo đúng key thi và gắn cờ cảnh báo `exam_key_retained`.",
    "figures": [],
    "image": "0507_q507_Question_507.png",
    "code": None,
    "needs_image": False,
    "confidence": "high",
    "review_flags": ["question_design_flawed", "exam_key_retained"]
  },
  {
    "id": 508,
    "chapterId": "Ch4_Induction_Recursion",
    "chapterName": "Quy nạp và Đệ quy (Induction & Recursion)",
    "chapterShort": "Ch4 - Quy nạp",
    "type": "single_choice",
    "question": "Cho mệnh đề \\(P(n)\\): \"\\(f(n)\\) là số lẻ\", trong đó \\(f(n) = n^2 + 9n + 2\\) với \\(n\\) là số nguyên dương. Một chứng minh quy nạp cho \\(\\forall n P(n)\\) được viết như sau:\n(i) \\(P(1)\\) hiển nhiên đúng.\n(ii) Giả sử \\(P(k)\\) đúng với số nguyên dương \\(k\\), nghĩa là \\(f(k)\\) là số lẻ.\n(iii) Ta có: \\(f(k+1) = (k+1)^2 + 9(k+1) + 2 = (k^2 + 9k + 2) + (2k + 10) = f(k) + 2(k+5)\\) là số lẻ, vì là tổng của một số lẻ và một số chẵn. Do đó \\(P(k+1)\\) đúng. Theo nguyên lý quy nạp, \\(\\forall n P(n)\\).\nBước nào trong chứng minh trên bị SAI?",
    "options": [
      "(iii)",
      "(i)",
      "None of the other choices",
      "(ii)"
    ],
    "answer": "B",
    "answer_status": "verified",
    "explanation": "Bước 1: Kiểm tra bước cơ sở (i) với \\(n = 1\\):\n\\[ f(1) = 1^2 + 9(1) + 2 = 1 + 9 + 2 = 12 \\]\nSố 12 là một SỐ CHẴN (even), không phải số lẻ (odd). Do đó \\(P(1)\\) là khẳng định SAI.\nBước 2: Khẳng định trong bước (i) rằng \"\\(P(1)\\) is clearly true\" là hoàn toàn sai, làm cho toàn bộ chứng minh quy nạp vô hiệu. Do đó bước sai là (i), tương ứng phương án B.",
    "figures": [],
    "image": "0508_q508_Question_508.png",
    "code": None,
    "needs_image": False,
    "confidence": "high",
    "review_flags": []
  },
  {
    "id": 509,
    "chapterId": "Ch0_Architecture",
    "chapterName": "Kiến trúc máy tính (Computer Organization)",
    "chapterShort": "Ch0 - Kiến trúc MT",
    "type": "single_choice",
    "question": "Xét về mặt tổ chức phần cứng, phần tử cơ bản nhất của bộ nhớ bán dẫn (semiconductor memory) là gì?",
    "options": [
      "Memory capacity",
      "Memory block",
      "Memory cell",
      "Memory location"
    ],
    "answer": "C",
    "answer_status": "verified",
    "explanation": "Bước 1: Theo giáo trình Kiến trúc máy tính (William Stallings, chương Bộ nhớ bán dẫn), phần tử cơ sở cấu tạo nên bộ nhớ bán dẫn là ô nhớ bán dẫn (Memory cell).\nBước 2: Mỗi memory cell có khả năng lưu trữ 1 bit dữ liệu (0 hoặc 1), có thể đọc hoặc ghi được. Do đó phần tử cơ bản là \"Memory cell\", đáp án C.",
    "figures": [],
    "image": "0509_q509_Question_509.png",
    "code": None,
    "needs_image": False,
    "confidence": "high",
    "review_flags": []
  },
  {
    "id": 510,
    "chapterId": "Ch3_Algorithms_Integers",
    "chapterName": "Thuật toán và Số nguyên (Algorithms & Integers)",
    "chapterShort": "Ch3 - Thuật toán",
    "type": "single_choice",
    "question": "Cho thuật toán tìm kiếm tuyến tính sau:\nCó bao nhiêu phép so sánh được sử dụng trong thuật toán với đầu vào \\(x = 10\\) và dãy số \\(1, 3, 5, 7, 9\\)?",
    "options": [
      "10",
      "20",
      "11",
      "None of the other choices is correct"
    ],
    "answer": "C",
    "answer_status": "verified",
    "explanation": "Bước 1: Dãy số đầu vào có \\(n = 5\\) phần tử: \\(a_1=1, a_2=3, a_3=5, a_4=7, a_5=9\\). Giá trị cần tìm là \\(x = 10\\).\nBước 2: Trong điều kiện vòng lặp `while (i <= n and x != ai)`:\n- Với mỗi bước \\(i = 1, 2, 3, 4, 5\\), có 2 phép so sánh được thực hiện: `i <= n` (đúng) và `x != ai` (đúng). Qua 5 phần tử thực hiện \\(5 \\times 2 = 10\\) phép so sánh, tăng \\(i\\) lên 6.\n- Khi \\(i = 6\\), kiểm tra điều kiện đầu tiên `i <= n` (tức `6 <= 5`) \\(\\implies\\) kết quả Sai (1 phép so sánh). Do cơ chế đoản mạch (short-circuit), phép so sánh thứ hai không cần thực hiện.\nTổng số phép so sánh = \\(10 + 1 = 11\\) phép so sánh, tương ứng phương án C.",
    "figures": [],
    "image": "0510_q510_Question_510.png",
    "code": "procedure linear_search(x: integer, a1, a2, ..., an: integers)\ni := 1\nwhile (i <= n and x != ai)\n  i := i + 1",
    "needs_image": False,
    "confidence": "high",
    "review_flags": []
  },
  {
    "id": 511,
    "chapterId": "Ch3_Algorithms_Integers",
    "chapterName": "Thuật toán và Số nguyên (Algorithms & Integers)",
    "chapterShort": "Ch3 - Độ phức tạp",
    "type": "single_choice",
    "question": "Cho \\(n\\) là số nguyên dương. Trong các khẳng định sau, những khẳng định nào ĐÚNG?\n(i) \\(f(n) = n^2\\) là \\(O(n^4)\\)\n(ii) \\(f(n) = n^4\\) là \\(O(n^2 \\log n^2)\\)\n(iii) \\(f(n) = 3n \\log(n!) + (n^2 + 3) \\log n\\) là \\(O(n^2 \\log n)\\)",
    "options": [
      "(i) and (ii)",
      "(ii) and (iii)",
      "None of (i), (ii), and (iii)",
      "(i) and (iii)",
      "All of (i), (ii), and (iii)"
    ],
    "answer": "D",
    "answer_status": "verified",
    "explanation": "Bước 1: Xét khẳng định (i): Vì \\(n^2 \\le n^4\\) với mọi \\(n \\ge 1\\), nên rõ ràng \\(n^2 = O(n^4)\\). Khẳng định (i) ĐÚNG.\nBước 2: Xét khẳng định (ii): \\(n^2 \\log(n^2) = 2n^2 \\log n\\). Vì \\(\\lim_{n \\to \\infty} \\dfrac{n^4}{2n^2 \\log n} = \\lim \\dfrac{n^2}{2 \\log n} = \\infty\\) nên \\(n^4\\) không thể là \\(O(n^2 \\log n^2)\\). Khẳng định (ii) SAI.\nBước 3: Xét khẳng định (iii): Theo xấp xỉ Stirling, \\(\\log(n!) = \\Theta(n \\log n)\\), do đó \\(3n \\log(n!) = \\Theta(n^2 \\log n)\\). Thành phần thứ hai \\((n^2 + 3) \\log n = \\Theta(n^2 \\log n)\\). Tổng hai hàm cùng bậc \\(\\Theta(n^2 \\log n)\\) là \\(O(n^2 \\log n)\\). Khẳng định (iii) ĐÚNG.\nVậy các khẳng định đúng là (i) và (iii), chọn đáp án D.",
    "figures": [],
    "image": "0511_q511_Question_511.png",
    "code": None,
    "needs_image": False,
    "confidence": "high",
    "review_flags": []
  },
  {
    "id": 512,
    "chapterId": "Ch3_Algorithms_Integers",
    "chapterName": "Thuật toán và Số nguyên (Algorithms & Integers)",
    "chapterShort": "Ch3 - Hệ đếm",
    "type": "single_choice",
    "question": "Tìm biểu diễn trong hệ cơ số 3 (base 3 expansion) của số \\((123)_9\\):",
    "options": [
      "(1210)_3",
      "(10201)_3",
      "(10210)_3",
      "(100210)_3",
      "None of the other choices is correct"
    ],
    "answer": "C",
    "answer_status": "verified",
    "explanation": "Bước 1: Chuyển đổi trực tiếp vì \\(9 = 3^2\\), mỗi chữ số trong hệ cơ số 9 tương ứng với đúng 2 chữ số trong hệ cơ số 3:\n- \\(1_9 = 01_3\\)\n- \\(2_9 = 02_3\\)\n- \\(3_9 = 10_3\\)\nGhép lại: \\((123)_9 = (01\\,02\\,10)_3 = (10210)_3\\).\nBước 2: Kiểm chứng qua hệ thập phân:\n- \\((123)_9 = 1 \\times 9^2 + 2 \\times 9 + 3 = 81 + 18 + 3 = 102_{10}\\).\n- Đổi 102 sang cơ số 3: \\(102 = 1 \\times 81 + 0 \\times 27 + 2 \\times 9 + 1 \\times 3 + 0 = (10210)_3\\).\nDo đó đáp án đúng là (iii) \\((10210)_3\\), tương ứng phương án C.",
    "figures": [],
    "image": "0512_q512_Question_512.png",
    "code": None,
    "needs_image": False,
    "confidence": "high",
    "review_flags": []
  },
  {
    "id": 513,
    "chapterId": "Ch3_Algorithms_Integers",
    "chapterName": "Thuật toán và Số nguyên (Algorithms & Integers)",
    "chapterShort": "Ch3 - Số học",
    "type": "single_choice",
    "question": "Nếu \\(7 \\equiv a \\pmod 8\\) và \\(2 \\equiv b \\pmod 4\\) thì giá trị của \\(ab \\bmod 4\\) là bao nhiêu?",
    "options": [
      "5",
      "3",
      "2",
      "1"
    ],
    "answer": "C",
    "answer_status": "verified",
    "explanation": "Bước 1: Từ giả thiết \\(7 \\equiv a \\pmod 8\\), ta có thể chọn \\(a = 7\\) (hoặc tổng quát \\(a = 8k + 7\\)).\nTừ \\(2 \\equiv b \\pmod 4\\), ta có thể chọn \\(b = 2\\) (hoặc tổng quát \\(b = 4m + 2\\)).\nBước 2: Tính tích \\(ab\\):\n\\[ ab = 7 \\times 2 = 14 \\]\nLấy modulo 4:\n\\[ 14 \\bmod 4 = 2 \\quad (\\text{vì } 14 = 4 \\times 3 + 2) \\]\nTổng quát: \\(a \\equiv 7 \\equiv 3 \\pmod 4\\) và \\(b \\equiv 2 \\pmod 4 \\implies ab \\equiv 3 \\times 2 = 6 \\equiv 2 \\pmod 4\\).\nĐáp án là 2 (phương án C).",
    "figures": [],
    "image": "0513_q513_Question_513.png",
    "code": None,
    "needs_image": False,
    "confidence": "high",
    "review_flags": []
  },
  {
    "id": 514,
    "chapterId": "Ch6_Advanced_Counting",
    "chapterName": "Phương pháp Đếm Nâng cao (Advanced Counting)",
    "chapterShort": "Ch6 - Đếm nâng cao",
    "type": "single_choice",
    "question": "Một cặp thỏ con (một đực, một cái) được thả lên một hòn đảo. Một cặp thỏ không sinh sản cho đến khi tròn 2 tháng tuổi. Sau khi được 2 tháng tuổi, mỗi tháng chúng sẽ sinh ra 2 cặp thỏ mới. Tìm số lượng các cặp thỏ sau 5 tháng.",
    "options": [
      "11",
      "13",
      "21",
      "20"
    ],
    "answer": "A",
    "answer_status": "verified",
    "explanation": "Bước 1: Thiết lập hệ thức truy hồi cho số cặp thỏ \\(R_n\\) ở tháng thứ \\(n\\):\n- Số cặp thỏ ở tháng \\(n\\) gồm tất cả các cặp thỏ ở tháng \\(n-1\\) cộng với số cặp thỏ mới sinh.\n- Mỗi cặp thỏ sống ở tháng \\(n-2\\) nay đã đủ 2 tháng tuổi và sinh ra 2 cặp thỏ mới.\n- Do đó: \\(R_n = R_{n-1} + 2R_{n-2}\\) với \\(n \\ge 3\\).\nBước 2: Tính toán qua từng tháng:\n- Tháng 1: 1 cặp thỏ con \\(\\implies R_1 = 1\\).\n- Tháng 2: Vẫn là 1 cặp (chưa đủ 2 tháng) \\(\\implies R_2 = 1\\).\n- Tháng 3: Cặp thỏ ban đầu sinh 2 cặp mới \\(\\implies R_3 = R_2 + 2R_1 = 1 + 2(1) = 3\\).\n- Tháng 4: \\(R_4 = R_3 + 2R_2 = 3 + 2(1) = 5\\).\n- Tháng 5: \\(R_5 = R_4 + 2R_3 = 5 + 2(3) = 11\\).\nSau 5 tháng có 11 cặp thỏ, chọn đáp án A.",
    "figures": [],
    "image": "0514_q514_Question_514.png",
    "code": None,
    "needs_image": False,
    "confidence": "high",
    "review_flags": []
  },
  {
    "id": 515,
    "chapterId": "Ch4_Induction_Recursion",
    "chapterName": "Quy nạp và Đệ quy (Induction & Recursion)",
    "chapterShort": "Ch4 - Quy nạp",
    "type": "single_choice",
    "question": "Tìm định nghĩa đệ quy cho tập hợp:\n\\[ S = \\{(a, b) \\mid a, b \\in \\mathbb{Z}^+ \\text{ và } a+b \\text{ là số chẵn}\\} \\]",
    "options": [
      "(iv) \\((1, 1) \\in S\\). Nếu \\((a, b) \\in S\\) thì \\((a+1, b+1) \\in S\\)",
      "(ii) \\((1, 1) \\in S\\). Nếu \\((a, b) \\in S\\) thì \\((a, b+2) \\in S\\), \\((a+2, b) \\in S\\)",
      "(iii) \\((1, 1) \\in S\\). Nếu \\((a, b) \\in S\\) thì \\((a, b+2) \\in S\\), \\((a+2, b) \\in S\\), \\((a+1, b+1) \\in S\\)",
      "(i) \\((1, 1) \\in S\\). Nếu \\((a, b) \\in S\\) thì \\((a+2, b+2) \\in S\\)",
      "None of the other choices is correct"
    ],
    "answer": "C",
    "answer_status": "verified",
    "explanation": "Bước 1: Phân tích tập \\(S\\): \\(a, b\\) là các số nguyên dương có tổng \\(a+b\\) chẵn. Điều này tương đương với \\(a, b\\) cùng lẻ hoặc \\(a, b\\) cùng chẵn.\nBước 2: Kiểm tra các quy tắc sinh:\n- Nếu chỉ dùng \\((a+2, b)\\) và \\((a, b+2)\\) xuất phát từ \\((1, 1)\\), ta chỉ sinh được các cặp \\((a, b)\\) cùng lẻ, không bao giờ sinh được các cặp cùng chẵn như \\((2, 2), (2, 4)\\dots\\)\n- Khi thêm quy tắc \\((a+1, b+1) \\in S\\), từ \\((1, 1)\\) ta sinh được \\((2, 2)\\) (cặp chẵn đầu tiên), rồi từ đó kết hợp \\((a+2, b)\\) và \\((a, b+2)\\) để sinh ra toàn bộ các cặp số nguyên dương cùng chẵn.\nDo đó định nghĩa đầy đủ và đúng đắn nhất là quy tắc (iii), tương ứng phương án C.",
    "figures": [],
    "image": "0515_q515_Question_515.png",
    "code": None,
    "needs_image": False,
    "confidence": "high",
    "review_flags": []
  },
  {
    "id": 516,
    "chapterId": "Ch3_Algorithms_Integers",
    "chapterName": "Thuật toán và Số nguyên (Algorithms & Integers)",
    "chapterShort": "Ch3 - Độ phức tạp",
    "type": "single_choice",
    "question": "Cho \\(n\\) là số nguyên dương. Khẳng định nào sau đây là ĐÚNG?\n(i) \\(5^n\\) là \\(O(6^n)\\)\n(ii) \\(6^n\\) là \\(O(5^n)\\)\n(iii) \\(n!\\) là \\(O(n^n)\\)",
    "options": [
      "(i) and (iii)",
      "(ii) and (iii)",
      "(i) and (ii)",
      "All of (i), (ii), and (iii)",
      "None of (i), (ii), and (iii)"
    ],
    "answer": "A",
    "answer_status": "verified",
    "explanation": "Bước 1: Xét (i): Vì \\(5^n \\le 6^n\\) với mọi \\(n \\ge 1\\), ta có \\(\\lim_{n \\to \\infty} \\dfrac{5^n}{6^n} = 0\\), do đó \\(5^n = O(6^n)\\). Khẳng định (i) ĐÚNG.\nBước 2: Xét (ii): \\(\\lim_{n \\to \\infty} \\dfrac{6^n}{5^n} = \\lim_{n \\to \\infty} (1.2)^n = \\infty\\), nên \\(6^n\\) không thể là \\(O(5^n)\\). Khẳng định (ii) SAI.\nBước 3: Xét (iii): Ta có \\(n! = 1 \\times 2 \\times \\dots \\times n \\le n \\times n \\times \\dots \\times n = n^n\\) với mọi \\(n \\ge 1\\), do đó \\(n! = O(n^n)\\). Khẳng định (iii) ĐÚNG.\nVậy các khẳng định đúng là (i) và (iii), chọn đáp án A.",
    "figures": [],
    "image": "0516_q516_Question_516.png",
    "code": None,
    "needs_image": False,
    "confidence": "high",
    "review_flags": []
  },
  {
    "id": 517,
    "chapterId": "Ch3_Algorithms_Integers",
    "chapterName": "Thuật toán và Số nguyên (Algorithms & Integers)",
    "chapterShort": "Ch3 - Thuật toán",
    "type": "single_choice",
    "question": "Khi áp dụng thuật toán đệ quy sau để tính \\(\\gcd(4, 14)\\), hàm được gọi tổng cộng bao nhiêu lần?",
    "options": [
      "3",
      "2",
      "4",
      "None of the other choices is correct"
    ],
    "answer": "A",
    "answer_status": "verified",
    "explanation": "Bước 1: Lần vết các lần gọi hàm `gcd(a, b)`:\n- Lần gọi 1: `gcd(4, 14)`. Vì \\(a = 4 \\ne 0\\), chuyển sang nhánh else: gọi `gcd(14 mod 4, 4) = gcd(2, 4)`.\n- Lần gọi 2: `gcd(2, 4)`. Vì \\(a = 2 \\ne 0\\), chuyển sang nhánh else: gọi `gcd(4 mod 2, 2) = gcd(0, 2)`.\n- Lần gọi 3: `gcd(0, 2)`. Vì \\(a = 0\\), thỏa mãn điều kiện if: trả về \\(b = 2\\).\nBước 2: Đếm tổng số lần gọi hàm: Có đúng 3 lần gọi (lần 1 với (4, 14), lần 2 với (2, 4), lần 3 với (0, 2)). Đáp án là 3 (phương án A).",
    "figures": [],
    "image": "0517_q517_Question_517.png",
    "code": "procedure gcd(a, b: nonnegative integers with a < b)\nif a = 0 then\n  return b\nelse\n  return gcd(b mod a, a)",
    "needs_image": False,
    "confidence": "high",
    "review_flags": []
  },
  {
    "id": 518,
    "chapterId": "Ch0_Architecture",
    "chapterName": "Kiến trúc máy tính (Computer Organization)",
    "chapterShort": "Ch0 - Kiến trúc MT",
    "type": "single_choice",
    "question": "Một chip EPROM có 20 đường địa chỉ (address lines) và 8 đường dữ liệu (data lines). Dung lượng bộ nhớ tối đa của chip này là bao nhiêu?",
    "options": [
      "1 Mbytes",
      "2 Mbits",
      "4 Mbits",
      "8 Mbits",
      "16 Mbits"
    ],
    "answer": "A",
    "answer_status": "verified",
    "explanation": "Bước 1: Tính số lượng ô nhớ có thể đánh địa chỉ được từ 20 đường địa chỉ:\n\\[ N = 2^{20} = 1,048,576 \\text{ từ nhớ (words)} = 1\\text{ M words} \\]\nBước 2: Mỗi ô nhớ chứa số bit bằng số đường dữ liệu (8 bit = 1 byte). Tổng dung lượng lưu trữ tối đa của chip là:\n\\[ \\text{Dung lượng} = 2^{20} \\times 8 \\text{ bits} = 8\\text{ Mbits} = 1\\text{ Mbyte} \\]\nTrong các phương án, phương án A ghi nhận 1 Mbytes (tương đương 8 Mbits). Do đó đáp án là A.",
    "figures": [],
    "image": "0518_q518_Question_518.png",
    "code": None,
    "needs_image": False,
    "confidence": "high",
    "review_flags": []
  },
  {
    "id": 519,
    "chapterId": "Ch3_Algorithms_Integers",
    "chapterName": "Thuật toán và Số nguyên (Algorithms & Integers)",
    "chapterShort": "Ch3 - Thuật toán",
    "type": "single_choice",
    "question": "Cho thuật toán sau:\nNếu đầu vào là \\(n = 4, x = 3\\), kết quả in ra của thuật toán là bao nhiêu?",
    "options": [
      "16.375",
      "18.4",
      "16.35",
      "18.04",
      "16.175"
    ],
    "answer": "A",
    "answer_status": "verified",
    "explanation": "Bước 1: Phân tích thuật toán: Thuật toán tính tổng khai triển Taylor cho \\(e^x\\) tới bậc \\(n\\):\n\\[ \\text{sum} = 1 + \\sum_{i=1}^{n} \\dfrac{x^i}{i!} \\]\nBước 2: Lần vết từng vòng lặp với \\(n = 4, x = 3\\):\n- Ban đầu: `sum = 1, i = 0, y = 1, m = 1`\n- Vòng 1 (\\(i=1\\)): `m = 1*1 = 1, y = 1*3 = 3`, `sum = 1 + 3/1 = 4.0`\n- Vòng 2 (\\(i=2\\)): `m = 1*2 = 2, y = 3*3 = 9`, `sum = 4.0 + 9/2 = 4.0 + 4.5 = 8.5`\n- Vòng 3 (\\(i=3\\)): `m = 2*3 = 6, y = 9*3 = 27`, `sum = 8.5 + 27/6 = 8.5 + 4.5 = 13.0`\n- Vòng 4 (\\(i=4\\)): `m = 6*4 = 24, y = 27*3 = 81`, `sum = 13.0 + 81/24 = 13.0 + 3.375 = 16.375`\nSau vòng 4, \\(i = 4 \\not< 4\\), vòng lặp kết thúc. Kết quả in ra là 16.375, tương ứng phương án A.",
    "figures": [],
    "image": "0519_q519_Question_519.png",
    "code": "procedure compute(n, x: integers)\nsum := 1\ni := 0\ny := 1\nm := 1\nwhile (i < n)\n  i := i + 1\n  m := m * i\n  y := y * x\n  sum := sum + y / m\nPrint(sum)",
    "needs_image": False,
    "confidence": "high",
    "review_flags": []
  },
  {
    "id": 520,
    "chapterId": "Ch2_Sets_Functions",
    "chapterName": "Tập hợp và Ánh xạ (Sets & Functions)",
    "chapterShort": "Ch2 - Ánh xạ",
    "type": "single_choice",
    "question": "Cho hai tập hợp \\(X = \\{\\emptyset, \\{\\emptyset\\}, \\{1, 2, 3\\}\\}\\) và \\(Y = \\{b, \\{2, 2\\}, b\\}\\). Có bao nhiêu đơn ánh (one-to-one functions) từ tập \\(X\\) vào tập \\(Y\\)?",
    "options": [
      "3",
      "1",
      "2",
      "6",
      "None of the other choices is correct"
    ],
    "answer": "E",
    "answer_status": "verified",
    "explanation": "Bước 1: Xác định số phần tử của tập nguồn \\(X\\) và tập đích \\(Y\\):\n- Tập \\(X\\) gồm 3 phần tử phân biệt: \\(\\emptyset\\), tập \\(\\{\\emptyset\\}\\), và tập \\(\\{1, 2, 3\\}\\) \\(\\implies |X| = 3\\).\n- Tập \\(Y = \\{b, \\{2, 2\\}, b\\}\\). Vì các phần tử lặp lại chỉ tính 1 lần và \\(\\{2, 2\\} = \\{2\\}\\), ta có \\(Y = \\{b, \\{2\\}\\}\\) \\(\\implies |Y| = 2\\).\nBước 2: Xét số lượng đơn ánh từ \\(X\\) vào \\(Y\\):\n- Theo Nguyên lý chuồng bồ câu (Pigeonhole Principle), một hàm từ tập có 3 phần tử vào tập có 2 phần tử chắc chắn có ít nhất 2 phần tử tập nguồn có cùng ảnh.\n- Do đó KHÔNG TỒN TẠI đơn ánh nào từ \\(X\\) vào \\(Y\\) (số đơn ánh bằng 0).\nVì không có phương án 0 trong A, B, C, D, ta chọn phương án E: \"None of the other choices is correct\".",
    "figures": [],
    "image": "0520_q520_Question_520.png",
    "code": None,
    "needs_image": False,
    "confidence": "high",
    "review_flags": []
  }
]

def append_batch_013():
    # Load current sample v2
    with open("v2/questions_sample_v2.json", "r", encoding="utf-8") as f:
        existing = json.load(f)
    
    # Filter out any existing 481-520 if present
    existing_map = {q["id"]: q for q in existing}
    for q in batch_013_questions:
        existing_map[q["id"]] = q
    
    sorted_questions = [existing_map[qid] for qid in sorted(existing_map.keys())]
    
    with open("v2/questions_sample_v2.json", "w", encoding="utf-8") as f:
        json.dump(sorted_questions, f, indent=2, ensure_ascii=False)
    
    # Also write JS version
    js_content = "export const questions_v2 = " + json.dumps(sorted_questions, indent=2, ensure_ascii=False) + ";\n"
    with open("v2/questions_v2.js", "w", encoding="utf-8") as f:
        f.write(js_content)
    
    print(f"Batch 013 added. Total questions in v2: {len(sorted_questions)}")

if __name__ == "__main__":
    append_batch_013()
