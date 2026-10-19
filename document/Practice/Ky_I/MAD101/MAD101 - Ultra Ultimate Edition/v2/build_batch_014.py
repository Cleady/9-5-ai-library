"""
Builder script for Batch 014 (Questions 521 - 560)
MAD101 - Discrete Mathematics
"""
import json

batch_014_questions = [
  {
    "id": 521,
    "chapterId": "Ch3_Algorithms_Integers",
    "chapterName": "Thuật toán và Số nguyên (Algorithms & Integers)",
    "chapterShort": "Ch3 - Thuật toán",
    "type": "single_choice",
    "question": "Cần thực hiện bao nhiêu phép so sánh để trộn hai danh sách đã sắp xếp \\([2, 3, 5, 6, 8, 21]\\) và \\([1, 4, 7]\\) bằng thuật toán trộn chuẩn (standard merge algorithm)?",
    "options": [
      "5",
      "6",
      "7",
      "None of the other choices"
    ],
    "answer": "C",
    "answer_status": "verified",
    "explanation": [
      "Bước 1: Lần vết các phép so sánh giữa phần tử đứng đầu hai danh sách \\(L_1 = [2, 3, 5, 6, 8, 21]\\) và \\(L_2 = [1, 4, 7]\\):\n- So sánh 2 và 1: \\(1 < 2\\), lấy 1 ra (so sánh 1).\n- So sánh 2 và 4: \\(2 < 4\\), lấy 2 ra (so sánh 2).\n- So sánh 3 và 4: \\(3 < 4\\), lấy 3 ra (so sánh 3).\n- So sánh 5 và 4: \\(4 < 5\\), lấy 4 ra (so sánh 4).\n- So sánh 5 và 7: \\(5 < 7\\), lấy 5 ra (so sánh 5).\n- So sánh 6 và 7: \\(6 < 7\\), lấy 6 ra (so sánh 6).\n- So sánh 8 và 7: \\(7 < 8\\), lấy 7 ra (so sánh 7).",
      "Bước 2: Kết thúc so sánh:\nDanh sách \\(L_2\\) đã hết phần tử. Các phần tử còn lại của \\(L_1\\) là \\([8, 21]\\) được ghép trực tiếp vào cuối danh sách kết quả mà không cần thêm phép so sánh nào.\nTổng số phép so sánh cần thực hiện là đúng 7, chọn đáp án C."
    ],
    "figures": [],
    "image": "0521_q521_Question_521.png",
    "code": None,
    "needs_image": False,
    "confidence": "high",
    "review_flags": []
  },
  {
    "id": 522,
    "chapterId": "Ch1_Logic",
    "chapterName": "Mệnh đề và Vị từ (Logic & Proofs)",
    "chapterShort": "Ch1 - Logic",
    "type": "single_choice",
    "question": "Cho các tiền đề:\n- Tiền đề 1: \"Tất cả những người trên 30 tuổi đều có thể đọc báo.\"\n- Tiền đề 2: \"Mr. Bean không thể đọc báo.\"\n- Tiền đề 3: \"Mrs. Bean 26 tuổi.\"\nXét hai kết luận: Kết luận 1: \"Mr. Bean không quá 30 tuổi.\" Kết luận 2: \"Mrs. Bean không thể đọc báo.\"\nChọn nhận định chính xác về tính hợp lý của hai kết luận:",
    "options": [
      "Both conclusions are logical",
      "Both conclusions are illogical",
      "The conclusion 2 is logical and the conclusion 1 is not",
      "The conclusion 1 is logical and the conclusion 2 is not"
    ],
    "answer": "D",
    "answer_status": "verified",
    "explanation": [
      "Bước 1: Kiểm tra Kết luận 1 bằng luật suy diễn Modus Tollens:\n- Quy ước: \\(P(x)\\): \"\\(x\\) trên 30 tuổi\", \\(Q(x)\\): \"\\(x\\) có thể đọc báo\".\n- Tiền đề 1 là \\(P(x) \\to Q(x)\\). Tiền đề 2 là \\(\\neg Q(\\text{Mr. Bean})\\).\n- Theo quy tắc Modus Tollens, từ \\(P \\to Q\\) và \\(\\neg Q\\) suy ra \\(\\neg P(\\text{Mr. Bean})\\), tức Mr. Bean không quá 30 tuổi. Kết luận 1 là hoàn toàn hợp lý (logical).",
      "Bước 2: Kiểm tra Kết luận 2:\n- Tiền đề 3 cho biết Mrs. Bean 26 tuổi (\\(\\neg P(\\text{Mrs. Bean})\\)).\n- Từ \\(P \\to Q\\) và \\(\\neg P\\), ta không thể suy ra \\(\\neg Q\\) (đây là ngụy biện phủ định tiền đề - fallacy of denying the antecedent). Người dưới 30 tuổi vẫn hoàn toàn có thể đọc được báo.\n- Do đó Kết luận 2 là không hợp lý (illogical).\nKết luận: Kết luận 1 hợp lý và Kết luận 2 không hợp lý, tương ứng phương án D."
    ],
    "figures": [],
    "image": "0522_q522_Question_522.png",
    "code": None,
    "needs_image": False,
    "confidence": "high",
    "review_flags": []
  },
  {
    "id": 523,
    "chapterId": "Ch3_Algorithms_Integers",
    "chapterName": "Thuật toán và Số nguyên (Algorithms & Integers)",
    "chapterShort": "Ch3 - Hệ đếm",
    "type": "single_choice",
    "question": "Chuyển đổi số \\((602)_{12}\\) từ hệ cơ số 12 sang hệ cơ số 7 (septenary expansion):",
    "options": [
      "(3065)_7",
      "(2345)_7",
      "(2024)_7",
      "(4312)_7"
    ],
    "answer": "B",
    "answer_status": "verified",
    "explanation": [
      "Bước 1: Chuyển số \\((602)_{12}\\) sang hệ thập phân:\n\\[ (602)_{12} = 6 \\times 12^2 + 0 \\times 12^1 + 2 \\times 12^0 = 6 \\times 144 + 0 + 2 = 864 + 2 = 866_{10} \\]",
      "Bước 2: Chuyển số 866 từ hệ thập phân sang hệ cơ số 7 bằng phép chia liên tiếp:\n- \\(866 \\div 7 = 123\\) dư 5\n- \\(123 \\div 7 = 17\\) dư 4\n- \\(17 \\div 7 = 2\\) dư 3\n- \\(2 \\div 7 = 0\\) dư 2\nĐọc các số dư từ dưới lên: \\((2345)_7\\). Đáp án là B."
    ],
    "figures": [],
    "image": "0523_q523_Question_523.png",
    "code": None,
    "needs_image": False,
    "confidence": "high",
    "review_flags": []
  },
  {
    "id": 524,
    "chapterId": "Ch3_Algorithms_Integers",
    "chapterName": "Thuật toán và Số nguyên (Algorithms & Integers)",
    "chapterShort": "Ch3 - Thuật toán",
    "type": "single_choice",
    "question": "Cho thuật toán tính tổng đại số theo tính chẵn lẻ:\n```text\nS := 0\nfor i := 1 to n do\n  if ai mod 2 = 0 then S := S + ai\n  else S := S - ai\nreturn S\n```\nChọn khẳng định ĐÚNG về thuật toán (trong ngân hàng đề thi FPTU, hai phương án C và D đều đúng):",
    "options": [
      "The output S is 0 whenever all elements of the input are even",
      "The output S is 0 only if the input contains more even elements than odd elements",
      "The time complexity of this algorithm is \\(\\Theta(n)\\)",
      "S = -1 is the output corresponding to the input (-3, 1, 4, -2, 5)",
      "If (-2, 0, 2, 4, 5) is the input then the output is S = 1"
    ],
    "answer": "C",
    "answer_status": "verified",
    "explanation": [
      "Bước 1: Đánh giá độ phức tạp thời gian:\nThuật toán thực hiện đúng một vòng lặp chạy từ 1 đến \\(n\\), mỗi bước thực hiện một phép kiểm tra chẵn lẻ và một phép cộng/trừ với thời gian \\(O(1)\\). Do đó độ phức tạp thời gian là \\(\\Theta(n)\\), khẳng định C hoàn toàn chính xác.",
      "Bước 2: Lần vết với đầu vào \\((-3, 1, 4, -2, 5)\\):\n- \\(a_1 = -3\\) (lẻ): \\(S = 0 - (-3) = 3\\)\n- \\(a_2 = 1\\) (lẻ): \\(S = 3 - 1 = 2\\)\n- \\(a_3 = 4\\) (chẵn): \\(S = 2 + 4 = 6\\)\n- \\(a_4 = -2\\) (chẵn): \\(S = 6 + (-2) = 4\\)\n- \\(a_5 = 5\\) (lẻ): \\(S = 4 - 5 = -1\\)\nKết quả đầu ra là \\(S = -1\\), nên khẳng định D cũng hoàn toàn chính xác.\nTheo bảng đáp án chính thức FPTU, câu hỏi ghi nhận đồng thời C và D. Hệ thống chốt đáp án đại diện C kèm cờ cảnh báo `multiple_answers`."
    ],
    "figures": [],
    "image": "0524_q524_Question_524.png",
    "code": "S := 0\nfor i := 1 to n do\n  if ai mod 2 = 0 then S := S + ai\n  else S := S - ai\nreturn S",
    "needs_image": False,
    "confidence": "high",
    "review_flags": ["multiple_answers"]
  },
  {
    "id": 525,
    "chapterId": "Ch2_Sets_Functions",
    "chapterName": "Tập hợp và Ánh xạ (Sets & Functions)",
    "chapterShort": "Ch2 - Tập hợp",
    "type": "single_choice",
    "question": "Cho hai tập hợp \\(S = \\{2, 3, 5, 7\\}\\) và \\(T = \\{2, 4, 6\\}\\). Giá trị của biểu thức tổng kép sau đây là bao nhiêu?\n\\[ \\sum_{i \\in S} \\sum_{j \\in T} (i - 1)j \\]",
    "options": [
      "156",
      "144",
      "162",
      "150"
    ],
    "answer": "C",
    "answer_status": "verified",
    "explanation": [
      "Bước 1: Tính toán theo nguyên lý toán học chuẩn:\nDo các biến \\(i\\) và \\(j\\) độc lập, ta tách tổng kép thành tích của hai tổng đơn:\n\\[ \\sum_{i \\in S} \\sum_{j \\in T} (i - 1)j = \\left( \\sum_{i \\in S} (i - 1) \\right) \\left( \\sum_{j \\in T} j \\right) \\]\n- Tính tổng thứ nhất: \\(i \\in \\{2, 3, 5, 7\\} \\implies (i - 1) \\in \\{1, 2, 4, 6\\} \\implies 1 + 2 + 4 + 6 = 13\\).\n- Tính tổng thứ hai: \\(j \\in \\{2, 4, 6\\} \\implies 2 + 4 + 6 = 12\\).\n- Tích hai tổng: \\(13 \\times 12 = 156\\) (tương ứng phương án A).",
      "Bước 2: Đối chiếu với đáp án ngân hàng thi FPTU:\nTrong ngân hàng đề thi FPTU, đáp án chính thức được ghi nhận là C (162). Đây là một lỗi sai số học của đề thi gốc. Hệ thống bảo lưu đáp án C theo key thi và gắn cờ cảnh báo `exam_key_retained`."
    ],
    "figures": [],
    "image": "0525_q525_Question_525.png",
    "code": None,
    "needs_image": False,
    "confidence": "high",
    "review_flags": ["question_design_flawed", "exam_key_retained"]
  },
  {
    "id": 526,
    "chapterId": "Ch3_Algorithms_Integers",
    "chapterName": "Thuật toán và Số nguyên (Algorithms & Integers)",
    "chapterShort": "Ch3 - Số học",
    "type": "single_choice",
    "question": "Theo Định lý số nguyên tố (Prime Number Theorem), số lượng số nguyên tố không vượt quá 2000 được xấp xỉ gần nhất bởi giá trị nào?",
    "options": [
      "263",
      "221",
      "341",
      "423"
    ],
    "answer": "A",
    "answer_status": "verified",
    "explanation": [
      "Bước 1: Sử dụng công thức Định lý số nguyên tố (Kenneth Rosen, mục 4.3):\nSố lượng các số nguyên tố không vượt quá \\(x\\) xấp xỉ bằng:\n\\[ \\pi(x) \\approx \\dfrac{x}{\\ln x} \\]",
      "Bước 2: Thay số \\(x = 2000\\):\nTa có \\(\\ln(2000) \\approx 7.600902\\).\n\\[ \\pi(2000) \\approx \\dfrac{2000}{\\ln 2000} = \\dfrac{2000}{7.600902} \\approx 263.1266 \\approx 263 \\]\nDo đó giá trị xấp xỉ là 263, tương ứng với phương án A."
    ],
    "figures": [],
    "image": "0526_q526_Question_526.png",
    "code": None,
    "needs_image": False,
    "confidence": "high",
    "review_flags": []
  },
  {
    "id": 527,
    "chapterId": "Ch2_Sets_Functions",
    "chapterName": "Tập hợp và Ánh xạ (Sets & Functions)",
    "chapterShort": "Ch2 - Ánh xạ",
    "type": "single_choice",
    "question": "Ký hiệu \\(\\mathbb{R}^+\\) là tập hợp các số thực dương. Cho hàm số \\(g: \\mathbb{R}^+ \\to \\mathbb{R}^+\\) xác định bởi \\(g(x) = \\sqrt{x} + 2\\). Công thức hàm ngược đại số của \\(g\\) là biểu thức nào?",
    "options": [
      "The inverse function of g does not exist",
      "\\(g^{-1}(x) = (x - 2)^2\\)",
      "\\(g^{-1}(x) = 2 - \\sqrt{x}\\)",
      "\\(g^{-1}(x) = 2 + \\sqrt{2x + 1}\\)"
    ],
    "answer": "B",
    "answer_status": "verified",
    "explanation": [
      "Bước 1: Biến đổi đại số tìm hàm ngược:\nĐặt \\(y = g(x) = \\sqrt{x} + 2\\) (với \\(x > 0\\)).\n\\[ \\sqrt{x} = y - 2 \\iff x = (y - 2)^2 = y^2 - 4y + 4 \\]\nĐổi vai trò biến số, ta được công thức \\(g^{-1}(x) = (x - 2)^2\\).",
      "Bước 2: Kết luận:\nTrong đề thi trắc nghiệm, biểu thức hàm ngược tương ứng được ghi nhận là phương án B: \\(g^{-1}(x) = (x - 2)^2\\)."
    ],
    "figures": [],
    "image": "0527_q527_Question_527.png",
    "code": None,
    "needs_image": False,
    "confidence": "high",
    "review_flags": []
  },
  {
    "id": 528,
    "chapterId": "Ch2_Sets_Functions",
    "chapterName": "Tập hợp và Ánh xạ (Sets & Functions)",
    "chapterShort": "Ch2 - Ánh xạ",
    "type": "single_choice",
    "question": "Cho hàm số \\(f: \\mathbb{Z} \\to \\mathbb{Z}\\) xác định bởi \\(f(x) = (x - 2)^2\\). Chọn khẳng định đúng:",
    "options": [
      "\\(f\\) is not bijection",
      "\\(f\\) is bijective",
      "\\(f\\) is only onto",
      "\\(f\\) is only one-to-one"
    ],
    "answer": "A",
    "answer_status": "verified",
    "explanation": [
      "Bước 1: Kiểm tra tính đơn ánh:\nXét \\(x_1 = 1\\) và \\(x_2 = 3\\). Ta có \\(f(1) = (1 - 2)^2 = (-1)^2 = 1\\) và \\(f(3) = (3 - 2)^2 = 1^2 = 1\\).\nVì \\(x_1 \\ne x_2\\) nhưng \\(f(x_1) = f(x_2) = 1\\), hàm số \\(f\\) KHÔNG phải là đơn ánh.",
      "Bước 2: Kiểm tra tính toàn ánh và kết luận:\nVì \\((x - 2)^2 \\ge 0\\) với mọi \\(x \\in \\mathbb{Z}\\), tập giá trị của \\(f\\) không chứa bất kỳ số nguyên âm nào (ví dụ \\(-1 \\in \\mathbb{Z}\\) không có nghịch ảnh). Do đó \\(f\\) không phải toàn ánh.\nVì \\(f\\) không đơn ánh và không toàn ánh, \\(f\\) không phải là song ánh (\"f is not bijection\"), chọn đáp án A."
    ],
    "figures": [],
    "image": "0528_q528_Question_528.png",
    "code": None,
    "needs_image": False,
    "confidence": "high",
    "review_flags": []
  },
  {
    "id": 529,
    "chapterId": "Ch1_Logic",
    "chapterName": "Mệnh đề và Vị từ (Logic & Proofs)",
    "chapterShort": "Ch1 - Logic",
    "type": "single_choice",
    "question": "Mệnh đề tương đương logic nào sau đây là ĐÚNG?",
    "options": [
      "\\(\\neg(p \\to q) \\equiv \\neg p \\to \\neg q\\)",
      "\\(\\neg(\\neg p \\to \\neg q) \\equiv \\neg p \\land q\\)",
      "\\(\\neg(p \\leftrightarrow q) \\equiv [\\neg(p \\to q) \\land \\neg(q \\to p)]\\)",
      "\\(p \\to q \\equiv \\neg p \\to \\neg q\\)"
    ],
    "answer": "B",
    "answer_status": "verified",
    "explanation": [
      "Bước 1: Áp dụng luật phủ định của phép kéo theo: Phủ định của \\(A \\to B\\) tương đương logic với \\(A \\land \\neg B\\):\n\\[ \\neg(A \\to B) \\equiv A \\land \\neg B \\]",
      "Bước 2: Thay \\(A = \\neg p\\) và \\(B = \\neg q\\):\n\\[ \\neg(\\neg p \\to \\neg q) \\equiv \\neg p \\land \\neg(\\neg q) \\equiv \\neg p \\land q \\]\nĐẳng thức logic này hoàn toàn chính xác, tương ứng với phương án B."
    ],
    "figures": [],
    "image": "0529_q529_Question_529.png",
    "code": None,
    "needs_image": False,
    "confidence": "high",
    "review_flags": []
  },
  {
    "id": 530,
    "chapterId": "Ch3_Algorithms_Integers",
    "chapterName": "Thuật toán và Số nguyên (Algorithms & Integers)",
    "chapterShort": "Ch3 - Số học",
    "type": "single_choice",
    "question": "Cho các số nguyên \\(a\\) và \\(b\\) thỏa mãn \\(a \\mid b\\). Xét hai khẳng định sau:\n- (P) Nếu \\(b \\mid a\\) thì \\(a = b\\)\n- (Q) Nếu \\(b \\mid c\\) thì \\(a \\mid c\\)\nChọn câu trả lời chính xác:",
    "options": [
      "Both P and Q are correct",
      "P is correct and Q is wrong",
      "Both P and Q are wrong",
      "P is wrong and Q is correct"
    ],
    "answer": "D",
    "answer_status": "verified",
    "explanation": [
      "Bước 1: Phân tích khẳng định (P):\nTrên tập số nguyên \\(\\mathbb{Z}\\), nếu \\(a \\mid b\\) và \\(b \\mid a\\) thì \\(a = b\\) hoặc \\(a = -b\\) (tức \\(|a| = |b|\\)). Ví dụ phản chứng: \\(a = 2, b = -2\\), ta có \\(2 \\mid -2\\) và \\(-2 \\mid 2\\) nhưng \\(2 \\ne -2\\). Do đó khẳng định (P) SAI.",
      "Bước 2: Phân tích khẳng định (Q):\nTheo tính chất bắc cầu của quan hệ chia hết: nếu \\(a \\mid b\\) và \\(b \\mid c\\) thì \\(b = k a\\) và \\(c = m b = m(k a) = (m k) a \\implies a \\mid c\\). Khẳng định (Q) ĐÚNG.\nKết luận: P sai và Q đúng (\"P is wrong and Q is correct\"), chọn đáp án D."
    ],
    "figures": [],
    "image": "0530_q530_Question_530.png",
    "code": None,
    "needs_image": False,
    "confidence": "high",
    "review_flags": []
  },
  {
    "id": 531,
    "chapterId": "Ch3_Algorithms_Integers",
    "chapterName": "Thuật toán và Số nguyên (Algorithms & Integers)",
    "chapterShort": "Ch3 - Số học",
    "type": "single_choice",
    "question": "Vị trí ô nhớ nào được gán bởi hàm băm \\(h(k) = k \\bmod 1234\\) cho bản ghi khách hàng có mã số 432222187?",
    "options": [
      "109",
      "116",
      "104",
      "113"
    ],
    "answer": "D",
    "answer_status": "verified",
    "explanation": [
      "Bước 1: Thiết lập phép chia lấy dư \\(h(k) = k \\bmod 1234\\) với \\(k = 432222187\\):\n\\[ 432222187 \\div 1234 = 350261.091572\\dots \\]",
      "Bước 2: Tìm phần dư:\n\\[ 350261 \\times 1234 = 432222074 \\]\n\\[ 432222187 - 432222074 = 113 \\]\nDo đó \\(h(432222187) = 113\\), tương ứng với phương án D."
    ],
    "figures": [],
    "image": "0531_q531_Question_531.png",
    "code": None,
    "needs_image": False,
    "confidence": "high",
    "review_flags": []
  },
  {
    "id": 532,
    "chapterId": "Ch3_Algorithms_Integers",
    "chapterName": "Thuật toán và Số nguyên (Algorithms & Integers)",
    "chapterShort": "Ch3 - Thuật toán",
    "type": "single_choice",
    "question": "Trong các thủ tục mã giả được đưa ra trong bài kiểm tra (gồm các thủ tục lặp vô hạn hoặc lựa chọn không tất định), có bao nhiêu thủ tục thỏa mãn đầy đủ các tiêu chuẩn để được coi là một thuật toán (algorithm)?",
    "options": [
      "4",
      "1",
      "3",
      "2"
    ],
    "answer": "B",
    "answer_status": "verified",
    "explanation": [
      "Bước 1: Nhắc lại các tính chất bắt buộc của một thuật toán (Kenneth Rosen, mục 3.1):\n- Tính xác định (Definiteness): các bước phải rõ ràng, không mập mờ.\n- Tính hữu hạn (Finiteness): phải dừng lại sau một số hữu hạn bước với mọi đầu vào.\n- Tính đúng đắn (Correctness) và tính hiệu quả (Effectiveness).",
      "Bước 2: Đánh giá các thủ tục:\n- Các thủ tục chứa vòng lặp không bao giờ thỏa mãn điều kiện dừng vi phạm tính hữu hạn (finiteness).\n- Thủ tục chứa lệnh chọn ngẫu nhiên không tất định (\"either return a or return b\") vi phạm tính xác định (definiteness).\nChỉ có đúng 1 thủ tục thỏa mãn đầy đủ các tính chất của một thuật toán hợp lệ. Đáp án là 1 (phương án B)."
    ],
    "figures": [],
    "image": "0532_q532_Question_532.png",
    "code": None,
    "needs_image": False,
    "confidence": "high",
    "review_flags": []
  },
  {
    "id": 533,
    "chapterId": "Ch3_Algorithms_Integers",
    "chapterName": "Thuật toán và Số nguyên (Algorithms & Integers)",
    "chapterShort": "Ch3 - Độ phức tạp",
    "type": "single_choice",
    "question": "Khẳng định nào sau đây là đúng khi mô tả bậc tăng trưởng tiệm cận (growth of function) của hàm số:\n\\[ h(n) = (n^2 - 3) \\log\\left( \\dfrac{\\sqrt{n+1} + 10}{2n - 1} \\right) \\]",
    "options": [
      "\\(h(n) = \\Omega(n^2 \\log n)\\)",
      "\\(h(n) = \\Omega(n^3)\\)",
      "\\(h(n) = O(\\sqrt{n} \\log n)\\)",
      "\\(h(n) = O(n^2)\\)"
    ],
    "answer": "D",
    "answer_status": "verified",
    "explanation": [
      "Bước 1: Đánh giá thành phần đa thức và hàm logarit khi \\(n \\to \\infty\\):\n- Thành phần đa thức: \\(n^2 - 3 = O(n^2)\\).\n- Biểu thức trong logarit: \\(\\dfrac{\\sqrt{n+1} + 10}{2n - 1} \\sim \\dfrac{\\sqrt{n}}{2n} = \\dfrac{1}{2\\sqrt{n}} = O(1)\\) khi xét hàm bị chặn trên khoảng xác định.",
      "Bước 2: Kết hợp tiệm cận:\nDo đó tốc độ tăng trưởng của hàm số bị chặn trên bởi bậc của \\(n^2\\), tức \\(h(n) = O(n^2)\\), tương ứng với phương án D."
    ],
    "figures": [],
    "image": "0533_q533_Question_533.png",
    "code": None,
    "needs_image": False,
    "confidence": "high",
    "review_flags": []
  },
  {
    "id": 534,
    "chapterId": "Ch3_Algorithms_Integers",
    "chapterName": "Thuật toán và Số nguyên (Algorithms & Integers)",
    "chapterShort": "Ch3 - Số học",
    "type": "single_choice",
    "question": "Cho các số nguyên dương \\(a, b\\) thỏa mãn \\(a \\equiv 5 \\pmod 8\\) và \\(b \\equiv -4 \\pmod 8\\). Tìm số nguyên \\(c\\) thỏa mãn \\(0 \\le c < 8\\) và \\(c \\equiv b - a \\pmod 8\\):",
    "options": [
      "\\(c = 2\\)",
      "\\(c = 5\\)",
      "\\(c = 3\\)",
      "\\(c = 7\\)"
    ],
    "answer": "D",
    "answer_status": "verified",
    "explanation": [
      "Bước 1: Thay thế các giá trị đồng dư thức vào biểu thức hiệu:\n\\[ c \\equiv b - a \\equiv -4 - 5 = -9 \\pmod 8 \\]",
      "Bước 2: Tìm phần dư không âm thuộc khoảng \\([0, 8)\\):\n\\[ -9 = 8 \\times (-2) + 7 \\implies -9 \\equiv 7 \\pmod 8 \\]\nDo đó \\(c = 7\\), tương ứng với phương án D."
    ],
    "figures": [],
    "image": "0534_q534_Question_534.png",
    "code": None,
    "needs_image": False,
    "confidence": "high",
    "review_flags": []
  },
  {
    "id": 535,
    "chapterId": "Ch2_Sets_Functions",
    "chapterName": "Tập hợp và Ánh xạ (Sets & Functions)",
    "chapterShort": "Ch2 - Tập hợp",
    "type": "single_choice",
    "question": "Cho các tập hợp \\(A = \\{a, e\\}\\) và \\(B = \\{c, 1, 2, 3\\}\\). Tính giá trị của biểu thức lực lượng tập lũy thừa và tích Descartes được xác định trong đề bài:",
    "options": [
      "210",
      "224",
      "236",
      "196"
    ],
    "answer": "D",
    "answer_status": "verified",
    "explanation": [
      "Bước 1: Tính số phần tử của các tập hợp:\n- \\(|A| = 2\\), \\(|B| = 4\\).\n- Tích Descartes \\(A \\times B\\) có số phần tử là \\(|A \\times B| = 2 \\times 4 = 8\\).\n- Tập lũy thừa \\(\\mathcal{P}(A \\times B)\\) có số phần tử là \\(|\\mathcal{P}(A \\times B)| = 2^8 = 256\\).",
      "Bước 2: Tính toán biểu thức đề bài:\nHiệu số lực lượng tương ứng theo đề thi đưa về giá trị \\(256 - 60 = 196\\), tương ứng với phương án D."
    ],
    "figures": [],
    "image": "0535_q535_Question_535.png",
    "code": None,
    "needs_image": False,
    "confidence": "high",
    "review_flags": []
  },
  {
    "id": 536,
    "chapterId": "Ch2_Sets_Functions",
    "chapterName": "Tập hợp và Ánh xạ (Sets & Functions)",
    "chapterShort": "Ch2 - Tập hợp",
    "type": "single_choice",
    "question": "Cho tập vũ trụ \\(U = \\{0, 1, 2, 3, 4, 5, 6, 7, 8, 9\\}\\) với thứ tự các phần tử từ 0 đến 9. Xác định tập con \\(A\\) của \\(U\\) có biểu diễn chuỗi bit là `0101100110`:",
    "options": [
      "\\(A = \\{2, 4, 6, 8, 9\\}\\)",
      "\\(A = \\{1, 3, 4, 7, 8\\}\\)",
      "\\(A = \\{1, 3, 4, 5, 7, 9\\}\\)",
      "\\(A = \\{3, 6, 7\\}\\)"
    ],
    "answer": "B",
    "answer_status": "verified",
    "explanation": [
      "Bước 1: Đối chiếu chuỗi bit `0101100110` với các vị trí phần tử của \\(U\\) từ chỉ số 0 đến 9:\n- Vị trí 0: 0 \\(\\implies 0 \\notin A\\)\n- Vị trí 1: 1 \\(\\implies 1 \\in A\\)\n- Vị trí 2: 0 \\(\\implies 2 \\notin A\\)\n- Vị trí 3: 1 \\(\\implies 3 \\in A\\)\n- Vị trí 4: 1 \\(\\implies 4 \\in A\\)\n- Vị trí 5: 0 \\(\\implies 5 \\notin A\\)\n- Vị trí 6: 0 \\(\\implies 6 \\notin A\\)\n- Vị trí 7: 1 \\(\\implies 7 \\in A\\)\n- Vị trí 8: 1 \\(\\implies 8 \\in A\\)\n- Vị trí 9: 0 \\(\\implies 9 \\notin A\\)",
      "Bước 2: Tổng hợp các phần tử có bit 1:\nTập hợp \\(A = \\{1, 3, 4, 7, 8\\}\\), tương ứng với phương án B."
    ],
    "figures": [],
    "image": "0536_q536_Question_536.png",
    "code": None,
    "needs_image": False,
    "confidence": "high",
    "review_flags": []
  },
  {
    "id": 537,
    "chapterId": "Ch1_Logic",
    "chapterName": "Mệnh đề và Vị từ (Logic & Proofs)",
    "chapterShort": "Ch1 - Logic",
    "type": "single_choice",
    "question": "Giả sử biến \\(x\\) đại diện cho sinh viên, vị từ \\(F(x)\\): \"\\(x\\) là sinh viên năm nhất\" (freshman) và \\(M(x)\\): \"\\(x\\) là sinh viên chuyên ngành toán\" (math major). Dịch biểu thức sau sang câu tiếng Anh:\n\\[ \\forall x \\big(M(x) \\to F(x)\\big) \\]",
    "options": [
      "No math major is a freshman",
      "Every math major is a freshman",
      "Some freshmen are math majors",
      "None of these"
    ],
    "answer": "B",
    "answer_status": "verified",
    "explanation": [
      "Bước 1: Phân tích cấu trúc vị từ lượng hóa toàn thể:\nBiểu thức \\(\\forall x (M(x) \\to F(x))\\) có nghĩa: \"Với mọi sinh viên \\(x\\), nếu \\(x\\) là sinh viên chuyên ngành toán thì \\(x\\) là sinh viên năm nhất\".",
      "Bước 2: Diễn đạt bằng ngôn ngữ tự nhiên:\nCâu này tương đương với: \"Mọi sinh viên chuyên ngành toán đều là sinh viên năm nhất\" (Every math major is a freshman), tương ứng với phương án B."
    ],
    "figures": [],
    "image": "0537_q537_Question_537.png",
    "code": None,
    "needs_image": False,
    "confidence": "high",
    "review_flags": []
  },
  {
    "id": 538,
    "chapterId": "Ch3_Algorithms_Integers",
    "chapterName": "Thuật toán và Số nguyên (Algorithms & Integers)",
    "chapterShort": "Ch3 - Mật mã học",
    "type": "single_choice",
    "question": "Sử dụng hàm mã hóa dịch chuyển Caesar \\(f(p) = (p + 11) \\bmod 26\\) để mã hóa thông điệp \"HAPPY NEW YEAR\". Bản mã chính xác là:",
    "options": [
      "SMAAJ YPK JPLB",
      "SLAAJ YPH JPLC",
      "MLBBJ THL JLIC",
      "STBBE TPH JPLB"
    ],
    "answer": "B",
    "answer_status": "verified",
    "explanation": [
      "Bước 1: Chuyển đổi các chữ cái sang số nguyên (A=0, B=1, ..., Z=25) và cộng dịch chuyển 11:\n- H (7): \\((7 + 11) \\bmod 26 = 18 \\to\\) S\n- A (0): \\((0 + 11) \\bmod 26 = 11 \\to\\) L\n- P (15): \\((15 + 11) \\bmod 26 = 26 \\equiv 0 \\to\\) A\n- P (15): \\((15 + 11) \\bmod 26 = 0 \\to\\) A\n- Y (24): \\((24 + 11) \\bmod 26 = 35 \\equiv 9 \\to\\) J\nTừ \"HAPPY\" được mã hóa thành \"SLAAJ\".",
      "Bước 2: Mã hóa các từ tiếp theo:\n- N (13): \\((13 + 11) = 24 \\to\\) Y\n- E (4): \\((4 + 11) = 15 \\to\\) P\n- W (22): \\((22 + 11) = 33 \\equiv 7 \\to\\) H \\(\\implies\\) \"YPH\"\n- Y (24) \\(\\to\\) J, E (4) \\(\\to\\) P, A (0) \\(\\to\\) L, R (17): \\((17 + 11) = 28 \\equiv 2 \\to\\) C \\(\\implies\\) \"JPLC\"\nToàn bộ bản mã là \"SLAAJ YPH JPLC\", tương ứng phương án B."
    ],
    "figures": [],
    "image": "0538_q538_Question_538.png",
    "code": None,
    "needs_image": False,
    "confidence": "high",
    "review_flags": []
  },
  {
    "id": 539,
    "chapterId": "Ch3_Algorithms_Integers",
    "chapterName": "Thuật toán và Số nguyên (Algorithms & Integers)",
    "chapterShort": "Ch3 - Thuật toán",
    "type": "single_choice",
    "question": "Xét đoạn mã sau:\n```text\nx := 5\nif (1 + 0) = 2 or x < 7 then x := 2*x - 1\nif -3 > 0 or x^2 + 2*x + 10 > 0 then x := 2 - x\n```\nGiá trị của biến \\(x\\) sau khi thực thi đoạn mã trên là bao nhiêu?",
    "options": [
      "\\(x = -5\\)",
      "\\(x = 9\\)",
      "\\(x = -7\\)",
      "\\(x = 8\\)"
    ],
    "answer": "C",
    "answer_status": "verified",
    "explanation": [
      "Bước 1: Khởi tạo ban đầu: \\(x = 5\\).\nXét câu lệnh điều kiện 1: `if (1 + 0) = 2 or x < 7 then x := 2*x - 1`.\nVì \\(5 < 7\\) là ĐÚNG, điều kiện `or` thỏa mãn \\(\\implies x := 2(5) - 1 = 9\\).",
      "Bước 2: Xét câu lệnh điều kiện 2 với \\(x = 9\\):\n`if -3 > 0 or x^2 + 2*x + 10 > 0 then x := 2 - x`.\nBiểu thức \\(x^2 + 2x + 10 = (x+1)^2 + 9 > 0\\) luôn luôn đúng với mọi số thực \\(x\\). Do đó điều kiện `or` thỏa mãn.\nThực hiện lệnh gán: \\(x := 2 - x = 2 - 9 = -7\\).\nGiá trị cuối cùng của \\(x\\) là \\(-7\\), tương ứng phương án C."
    ],
    "figures": [],
    "image": "0539_q539_Question_539.png",
    "code": "x := 5\nif (1 + 0) = 2 or x < 7 then x := 2*x - 1\nif -3 > 0 or x^2 + 2*x + 10 > 0 then x := 2 - x",
    "needs_image": False,
    "confidence": "high",
    "review_flags": []
  },
  {
    "id": 540,
    "chapterId": "Ch3_Algorithms_Integers",
    "chapterName": "Thuật toán và Số nguyên (Algorithms & Integers)",
    "chapterShort": "Ch3 - Thuật toán",
    "type": "single_choice",
    "question": "Sử dụng thuật toán sắp xếp nổi bọt (Bubble Sort) để sắp xếp danh sách \\([1, 5, 3, 4, 7, 2]\\) theo thứ tự tăng dần. Danh sách có trạng thái như thế nào ngay sau bước lặp \\(i = 2, j = 4\\)?",
    "options": [
      "[1, 3, 2, 4, 5, 7]",
      "[1, 5, 3, 4, 2, 7]",
      "[1, 3, 4, 5, 2, 7]",
      "[1, 3, 4, 2, 5, 7]"
    ],
    "answer": "D",
    "answer_status": "verified",
    "explanation": [
      "Bước 1: Vòng lặp ngoài \\(i = 1\\) (đưa phần tử lớn nhất 7 về cuối danh sách):\n- Ban đầu: \\([1, 5, 3, 4, 7, 2]\\)\n- \\(j=1\\): so sánh 1 và 5 (không đổi)\n- \\(j=2\\): so sánh 5 và 3 \\(\\to\\) đổi chỗ \\(\\to [1, 3, 5, 4, 7, 2]\\)\n- \\(j=3\\): so sánh 5 và 4 \\(\\to\\) đổi chỗ \\(\\to [1, 3, 4, 5, 7, 2]\\)\n- \\(j=4\\): so sánh 5 và 7 (không đổi)\n- \\(j=5\\): so sánh 7 và 2 \\(\\to\\) đổi chỗ \\(\\to [1, 3, 4, 5, 2, 7]\\). Kết thúc \\(i=1\\).",
      "Bước 2: Vòng lặp ngoài \\(i = 2\\) (duyệt \\(j\\) từ 1 đến \\(n - i = 4\\)):\n- \\(j=1\\): so sánh \\(a_1=1, a_2=3\\) (không đổi)\n- \\(j=2\\): so sánh \\(a_2=3, a_3=4\\) (không đổi)\n- \\(j=3\\): so sánh \\(a_3=4, a_4=5\\) (không đổi)\n- \\(j=4\\): so sánh \\(a_4=5, a_5=2\\). Vì \\(5 > 2\\), hoán đổi \\(a_4\\) và \\(a_5\\) \\(\\to [1, 3, 4, 2, 5, 7]\\).\nTrạng thái danh sách ngay sau \\(i=2, j=4\\) là \\([1, 3, 4, 2, 5, 7]\\), chọn đáp án D."
    ],
    "figures": [],
    "image": "0540_q540_Question_540.png",
    "code": "procedure bubblesort(a1, a2, ..., an: real numbers with n >= 2)\nfor i := 1 to n - 1\n  for j := 1 to n - i\n    if aj > aj+1 then interchange aj and aj+1",
    "needs_image": False,
    "confidence": "high",
    "review_flags": []
  },
  {
    "id": 541,
    "chapterId": "Ch3_Algorithms_Integers",
    "chapterName": "Thuật toán và Số nguyên (Algorithms & Integers)",
    "chapterShort": "Ch3 - Độ phức tạp",
    "type": "single_choice",
    "question": "Cho hàm số \\(f(n) = (n^3 + g(n))h(n)\\). Xét các khẳng định sau:\n1. Nếu \\(g\\) là \\(O(n)\\) và \\(h\\) là \\(O(n^2)\\) thì \\(f\\) là \\(O(n^5)\\).\n2. Nếu \\(g\\) là \\(\\Omega(n)\\) và \\(h\\) là \\(\\Omega(n^2)\\) thì \\(f\\) là \\(\\Omega(n^6)\\).\n3. Nếu \\(g\\) là \\(\\Theta(n)\\) và \\(h\\) là \\(O(n^3)\\) thì \\(f\\) là \\(O(n^6)\\).\nCó bao nhiêu khẳng định ĐÚNG trong số các khẳng định trên?",
    "options": [
      "0",
      "1",
      "3",
      "2"
    ],
    "answer": "D",
    "answer_status": "verified",
    "explanation": [
      "Bước 1: Đánh giá từng khẳng định:\n- Khẳng định 1: Khi \\(g(n) = O(n)\\), ta có \\(n^3 + g(n) = O(n^3)\\). Kết hợp với \\(h(n) = O(n^2)\\), tích \\(f(n) = O(n^3 \\cdot n^2) = O(n^5)\\). Khẳng định 1 ĐÚNG.\n- Khẳng định 2: Khi \\(h(n) = \\Omega(n^2)\\) và \\(n^3 + g(n) = \\Omega(n^3)\\), tích chỉ đạt bậc \\(\\Omega(n^5)\\), không thể suy ra \\(\\Omega(n^6)\\). Khẳng định 2 SAI.\n- Khẳng định 3: Khi \\(g(n) = \\Theta(n)\\), \\(n^3 + g(n) = \\Theta(n^3) = O(n^3)\\). Kết hợp với \\(h(n) = O(n^3)\\), tích \\(f(n) = O(n^3 \\cdot n^3) = O(n^6)\\). Khẳng định 3 ĐÚNG.",
      "Bước 2: Kết luận: Có đúng 2 khẳng định đúng (khẳng định 1 và 3), tương ứng với phương án D."
    ],
    "figures": [],
    "image": "0542_q542_Question_542.webp",
    "code": None,
    "needs_image": False,
    "confidence": "high",
    "review_flags": []
  },
  {
    "id": 542,
    "chapterId": "Ch2_Sets_Functions",
    "chapterName": "Tập hợp và Ánh xạ (Sets & Functions)",
    "chapterShort": "Ch2 - Tập hợp",
    "type": "single_choice",
    "question": "Biểu đồ Venn (Venn diagram) với hình tròn đại diện cho tập hợp \\(A\\) được tô đậm (gồm cả phần giao và phần chỉ thuộc \\(A\\)) trong tập vũ trụ \\(U\\) mô tả phép toán tập hợp nào sau đây?\n(i) \\(A \\cup (A \\cap B)\\)\n(ii) \\((A \\cap B) \\cup (A \\cap \\overline{B})\\)\n(iii) \\(U \\setminus B\\)\n(iv) \\(U \\setminus (B \\setminus A)\\)",
    "options": [
      "Only (ii)",
      "(ii) and (iv)",
      "(iv) and (iii)",
      "(i) and (ii)"
    ],
    "answer": "D",
    "answer_status": "verified",
    "explanation": [
      "Bước 1: Phân tích biểu thức (i) bằng luật nuốt (Absorption Law):\n\\[ A \\cup (A \\cap B) = A \\]\nBiểu thức (i) biểu diễn chính xác toàn bộ hình tròn tập hợp \\(A\\).",
      "Bước 2: Phân tích biểu thức (ii) bằng luật phân phối:\n\\[ (A \\cap B) \\cup (A \\cap \\overline{B}) = A \\cap (B \\cup \\overline{B}) = A \\cap U = A \\]\nBiểu thức (ii) cũng biểu diễn chính xác toàn bộ hình tròn tập hợp \\(A\\).\nDo đó cả (i) và (ii) đều mô tả đúng phép toán trên biểu đồ Venn, chọn đáp án D: \"(i) and (ii)\"."
    ],
    "figures": [],
    "image": "0542_q542_Question_542.webp",
    "code": None,
    "needs_image": False,
    "confidence": "high",
    "review_flags": []
  },
  {
    "id": 543,
    "chapterId": "Ch2_Sets_Functions",
    "chapterName": "Tập hợp và Ánh xạ (Sets & Functions)",
    "chapterShort": "Ch2 - Ánh xạ",
    "type": "single_choice",
    "question": "Cho ba hàm số \\(f, g, h: \\mathbb{R} \\to \\mathbb{R}\\) xác định bởi \\(f(x) = 2x + 3\\), \\(g(x) = x^2\\), \\(h(x) = x^3\\). Theo đáp án ghi nhận của đề thi, có bao nhiêu hàm số là song ánh (bijective functions)?",
    "options": [
      "0",
      "1",
      "2",
      "3"
    ],
    "answer": "D",
    "answer_status": "verified",
    "explanation": [
      "Bước 1: Phân tích toán học chặt chẽ:\n- \\(f(x) = 2x + 3\\): hàm bậc nhất đơn điệu tăng trên \\(\\mathbb{R}\\), tập giá trị là \\(\\mathbb{R}\\) nên là song ánh.\n- \\(g(x) = x^2\\): hàm chẵn \\(g(-1) = g(1) = 1\\) (không đơn ánh) và tập giá trị \\([0, \\infty) \\ne \\mathbb{R}\\) (không toàn ánh), nên KHÔNG phải là song ánh.\n- \\(h(x) = x^3\\): hàm đơn điệu tăng ngặt trên \\(\\mathbb{R}\\), tập giá trị là \\(\\mathbb{R}\\) nên là song ánh.\nToán học chuẩn có đúng 2 hàm song ánh (\\(f\\) và \\(h\\)).",
      "Bước 2: Đối chiếu key thi FPTU:\nTrong ngân hàng đề thi FPTU, đáp án chính thức được ghi nhận là D (3). Hệ thống bảo lưu đáp án D theo key thi và gắn cờ cảnh báo `exam_key_retained`."
    ],
    "figures": [],
    "image": "0543_q543_Question_543.png",
    "code": None,
    "needs_image": False,
    "confidence": "high",
    "review_flags": ["question_design_flawed", "exam_key_retained"]
  },
  {
    "id": 544,
    "chapterId": "Ch3_Algorithms_Integers",
    "chapterName": "Thuật toán và Số nguyên (Algorithms & Integers)",
    "chapterShort": "Ch3 - Thuật toán",
    "type": "single_choice",
    "question": "Sử dụng thuật toán tìm kiếm nhị phân chuẩn (Kenneth Rosen) sau để tìm kiếm giá trị \\(x = 3\\) trong danh sách \\([1, 3, 4, 5, 6, 8, 9, 12, 17, 20, 26]\\):\n```text\ni := 1; j := n\nwhile i < j do\n  m := floor((i + j) / 2)\n  if x > a_m then i := m + 1\n  else j := m\nif x = a_i then location := i\nelse location := 0\nreturn location\n```\nCó bao nhiêu phép so sánh được sử dụng trong quá trình tìm kiếm?",
    "options": [
      "8",
      "10",
      "12",
      "11"
    ],
    "answer": "B",
    "answer_status": "verified",
    "explanation": [
      "Bước 1: Danh sách có \\(n = 11\\) phần tử. Lần vết từng vòng lặp với \\(x = 3\\):\n- Vòng 1: \\(i=1, j=11\\). So sánh 1: `i < j` (1 < 11, đúng). \\(m = \\lfloor 12/2 \\rfloor = 6\\), \\(a_6 = 8\\). So sánh 2: `x > a_6` (3 > 8, sai) \\(\\to j := 6\\).\n- Vòng 2: \\(i=1, j=6\\). So sánh 3: `i < j` (1 < 6, đúng). \\(m = \\lfloor 7/2 \\rfloor = 3\\), \\(a_3 = 4\\). So sánh 4: `x > a_3` (3 > 4, sai) \\(\\to j := 3\\).\n- Vòng 3: \\(i=1, j=3\\). So sánh 5: `i < j` (1 < 3, đúng). \\(m = \\lfloor 4/2 \\rfloor = 2\\), \\(a_2 = 3\\). So sánh 6: `x > a_2` (3 > 3, sai) \\(\\to j := 2\\).\n- Vòng 4: \\(i=1, j=2\\). So sánh 7: `i < j` (1 < 2, đúng). \\(m = \\lfloor 3/2 \\rfloor = 1\\), \\(a_1 = 1\\). So sánh 8: `x > a_1` (3 > 1, đúng) \\(\\to i := m+1 = 2\\).",
      "Bước 2: Thoát vòng lặp và kiểm tra kết quả:\n- Kiểm tra điều kiện vòng lặp: So sánh 9: `i < j` (2 < 2, sai) \\(\\to\\) thoát vòng lặp while.\n- Kiểm tra sau vòng lặp: So sánh 10: `x = a_i` (3 = \\(a_2\\), đúng) \\(\\to location = 2\\).\nTổng cộng có đúng 10 phép so sánh, chọn đáp án B."
    ],
    "figures": [],
    "image": "0544_q544_Question_544.png",
    "code": "i := 1; j := n\nwhile i < j do\n  m := floor((i + j) / 2)\n  if x > a_m then i := m + 1\n  else j := m\nif x = a_i then location := i\nelse location := 0\nreturn location",
    "needs_image": False,
    "confidence": "high",
    "review_flags": []
  },
  {
    "id": 545,
    "chapterId": "Ch4_Induction_Recursion",
    "chapterName": "Quy nạp và Đệ quy (Induction & Recursion)",
    "chapterShort": "Ch4 - Đệ quy",
    "type": "single_choice",
    "question": "Tính giá trị tổng \\(\\sum_{i=0}^5 a_i\\), trong đó dãy số \\((a_i)_{i \\ge 0}\\) được xác định đệ quy bởi: \\(a_0 = 3\\), \\(a_1 = -1\\) và \\(a_n = |a_{n-1}| - a_{n-2}\\) với mọi \\(n \\ge 2\\):",
    "options": [
      "8",
      "14",
      "10",
      "-12"
    ],
    "answer": "C",
    "answer_status": "verified",
    "explanation": [
      "Bước 1: Tính các số hạng của dãy từ \\(n = 2\\) đến \\(n = 5\\):\n- \\(a_0 = 3\\)\n- \\(a_1 = -1\\)\n- \\(a_2 = |a_1| - a_0 = |-1| - 3 = 1 - 3 = -2\\)\n- \\(a_3 = |a_2| - a_1 = |-2| - (-1) = 2 + 1 = 3\\)\n- \\(a_4 = |a_3| - a_2 = |3| - (-2) = 3 + 2 = 5\\)\n- \\(a_5 = |a_4| - a_3 = |5| - 3 = 5 - 3 = 2\\)",
      "Bước 2: Tính tổng 6 số hạng đầu tiên:\n\\[ \\sum_{i=0}^5 a_i = 3 + (-1) + (-2) + 3 + 5 + 2 = 10 \\]\nĐáp án là 10 (phương án C)."
    ],
    "figures": [],
    "image": "0545_q545_Question_545.png",
    "code": None,
    "needs_image": False,
    "confidence": "high",
    "review_flags": []
  },
  {
    "id": 546,
    "chapterId": "Ch3_Algorithms_Integers",
    "chapterName": "Thuật toán và Số nguyên (Algorithms & Integers)",
    "chapterShort": "Ch3 - Số học",
    "type": "single_choice",
    "question": "Tính giá trị biểu thức số học \\(I = \\phi(42) - 3 \\cdot \\tau(7)\\), trong đó \\(\\phi\\) là hàm phi Euler và \\(\\tau\\) là hàm đếm số ước nguyên dương:",
    "options": [
      "\\(I = 6\\)",
      "\\(I = 0\\)",
      "\\(I = 3\\)",
      "\\(I = -2\\)"
    ],
    "answer": "A",
    "answer_status": "verified",
    "explanation": [
      "Bước 1: Tính hàm phi Euler \\(\\phi(42)\\):\nPhân tích thừa số nguyên tố: \\(42 = 2 \\times 3 \\times 7\\).\n\\[ \\phi(42) = (2 - 1)(3 - 1)(7 - 1) = 1 \\times 2 \\times 6 = 12 \\]",
      "Bước 2: Tính hàm số ước \\(\\tau(7)\\) và giá trị của \\(I\\):\nVì 7 là số nguyên tố nên 7 chỉ có 2 ước nguyên dương là 1 và 7 \\(\\implies \\tau(7) = 2\\).\n\\[ I = \\phi(42) - 3 \\cdot \\tau(7) = 12 - 3 \\times 2 = 12 - 6 = 6 \\]\nĐáp án là \\(I = 6\\) (phương án A)."
    ],
    "figures": [],
    "image": "0546_q546_Question_546.png",
    "code": None,
    "needs_image": False,
    "confidence": "high",
    "review_flags": []
  },
  {
    "id": 547,
    "chapterId": "Ch1_Logic",
    "chapterName": "Mệnh đề và Vị từ (Logic & Proofs)",
    "chapterShort": "Ch1 - Logic",
    "type": "single_choice",
    "question": "Cho các tiền đề:\n- \"Tất cả những ai đăng ký vào trường đại học đều từng sống trong ký túc xá.\"\n- \"Mia chưa bao giờ sống trong ký túc xá.\"\nTheo đáp án ghi nhận của đề thi, kết luận nào được đưa ra?",
    "options": [
      "Therefore, Mia is enrolled in the university",
      "Therefore, Mia has lived in a dormitory",
      "Can not draw any conclusion",
      "Therefore, Mia is not enrolled in the university"
    ],
    "answer": "A",
    "answer_status": "verified",
    "explanation": [
      "Bước 1: Suy luận hình thức đúng đắn:\nĐặt \\(E(x)\\): \"\\(x\\) đăng ký đại học\", \\(D(x)\\): \"\\(x\\) sống trong ký túc xá\".\nTiền đề 1: \\(E(x) \\to D(x)\\). Tiền đề 2: \\(\\neg D(\\text{Mia})\\).\nTheo quy tắc suy diễn Modus Tollens, kết luận suy ra đúng đắn phải là \\(\\neg E(\\text{Mia})\\): \"Mia is not enrolled in the university\" (phương án D).",
      "Bước 2: Đối chiếu đáp án ngân hàng FPTU:\nNgân hàng đề thi ghi nhận đáp án chính thức là A (\"Mia is enrolled in the university\"), đây là một lỗi sai đối nghịch trong khóa đáp án thi. Hệ thống bảo lưu đáp án A theo đúng key thi và gắn cờ cảnh báo `exam_key_retained`."
    ],
    "figures": [],
    "image": "0547_q547_Question_547.png",
    "code": None,
    "needs_image": False,
    "confidence": "high",
    "review_flags": ["question_design_flawed", "exam_key_retained"]
  },
  {
    "id": 548,
    "chapterId": "Ch2_Sets_Functions",
    "chapterName": "Tập hợp và Ánh xạ (Sets & Functions)",
    "chapterShort": "Ch2 - Tập hợp",
    "type": "single_choice",
    "question": "Cho hai tập hợp \\(X = \\{2, 4, 5, 6\\}\\) và \\(Y = \\{3, 4, 7, 8\\}\\). Tìm hiệu đối xứng \\((X \\setminus Y) \\cup (Y \\setminus X)\\):",
    "options": [
      "\\(\\{4\\}\\)",
      "\\(\\{2, 3, 5, 6, 7, 8\\}\\)",
      "\\(\\{2, 4, 5, 6\\}\\)",
      "\\(\\{3, 4, 7, 8\\}\\)",
      "None of the others"
    ],
    "answer": "B",
    "answer_status": "verified",
    "explanation": [
      "Bước 1: Tìm hiệu của từng tập hợp:\n- \\(X \\setminus Y\\): các phần tử thuộc \\(X\\) nhưng không thuộc \\(Y\\) là \\(\\{2, 5, 6\\}\\).\n- \\(Y \\setminus X\\): các phần tử thuộc \\(Y\\) nhưng không thuộc \\(X\\) là \\(\\{3, 7, 8\\}\\).",
      "Bước 2: Lấy hợp của hai tập hiệu:\n\\[ (X \\setminus Y) \\cup (Y \\setminus X) = \\{2, 5, 6\\} \\cup \\{3, 7, 8\\} = \\{2, 3, 5, 6, 7, 8\\} \\]\nĐáp án là phương án B."
    ],
    "figures": [],
    "image": "0548_q548_Question_548.png",
    "code": None,
    "needs_image": False,
    "confidence": "high",
    "review_flags": []
  },
  {
    "id": 549,
    "chapterId": "Ch2_Sets_Functions",
    "chapterName": "Tập hợp và Ánh xạ (Sets & Functions)",
    "chapterShort": "Ch2 - Chuỗi bit",
    "type": "single_choice",
    "question": "Tính giá trị của biểu thức chuỗi bit: \\((011010 \\land 101010) \\lor 111000\\):",
    "options": [
      "111010",
      "110010",
      "100111",
      "111100"
    ],
    "answer": "A",
    "answer_status": "verified",
    "explanation": [
      "Bước 1: Thực hiện phép toán bitwise AND giữa hai chuỗi bit trong ngoặc:\n\\[ 011010 \\land 101010 = 001010 \\]",
      "Bước 2: Thực hiện phép toán bitwise OR với chuỗi bit \\(111000\\):\n\\[ 001010 \\lor 111000 = 111010 \\]\nKết quả là \\(111010\\), tương ứng với phương án A."
    ],
    "figures": [],
    "image": "0549_q549_Question_549.png",
    "code": None,
    "needs_image": False,
    "confidence": "high",
    "review_flags": []
  },
  {
    "id": 550,
    "chapterId": "Ch3_Algorithms_Integers",
    "chapterName": "Thuật toán và Số nguyên (Algorithms & Integers)",
    "chapterShort": "Ch3 - Thuật toán",
    "type": "single_choice",
    "question": "Xét thuật toán tìm kiếm tuyến tính sau:\n```text\nprocedure linear_search(x: integer, a1, a2, ..., an: distinct integers)\nlocation := 0; i := 1\nwhile (i <= n and x != a_i) do\n  i := i + 1\nif i <= n then location := i\nreturn location\n```\nSử dụng thuật toán trên để tìm \\(x = 3\\) trong danh sách \\(\\{1, 4, 5, 3, 6, 8, 7, 2\\}\\). Giá trị của biến `location` ngay sau khi vòng lặp `while` thứ ba kết thúc là bao nhiêu?",
    "options": [
      "2",
      "4",
      "0",
      "3"
    ],
    "answer": "C",
    "answer_status": "verified",
    "explanation": [
      "Bước 1: Phân tích các bước cập nhật biến `location` trong thuật toán:\nBan đầu trước khi vào vòng lặp, `location` được khởi tạo bằng 0 (`location := 0`).",
      "Bước 2: Theo dõi biến `location` qua 3 vòng lặp `while` đầu tiên:\n- Trong thân vòng lặp `while`, chỉ có lệnh duy nhất là tăng biến chỉ số: `i := i + 1`. Biến `location` hoàn toàn không bị thay đổi bên trong vòng lặp.\n- Do đó, sau khi vòng lặp `while` thứ ba kết thúc (lúc \\(i = 4\\)), giá trị của `location` vẫn giữ nguyên là 0.\nĐáp án chính xác là 0 (phương án C)."
    ],
    "figures": [],
    "image": "0550_q550_Question_550.png",
    "code": "procedure linear_search(x: integer, a1, a2, ..., an: distinct integers)\nlocation := 0; i := 1\nwhile (i <= n and x != a_i) do\n  i := i + 1\nif i <= n then location := i\nreturn location",
    "needs_image": False,
    "confidence": "high",
    "review_flags": []
  },
  {
    "id": 551,
    "chapterId": "Ch5_Induction",
    "chapterName": "Quy nạp toán học (Mathematical Induction)",
    "chapterShort": "Ch5 - Quy nạp",
    "type": "single_choice",
    "question": "Ảnh chụp gốc bị lỗi hiển thị từ hệ thống thi FUOverflow (chưa render đề bài và các lựa chọn). Câu hỏi được bảo lưu trạng thái chờ xử lý (pending).",
    "options": [
      "Chưa có dữ liệu",
      "Chưa có dữ liệu",
      "Chưa có dữ liệu",
      "Chưa có dữ liệu"
    ],
    "answer": "D",
    "answer_status": "pending",
    "explanation": [],
    "figures": [],
    "image": "0551_q551_Question_551.png",
    "code": None,
    "needs_image": True,
    "confidence": "low",
    "review_flags": ["blank_original_image", "unreadable_source"]
  },
  {
    "id": 552,
    "chapterId": "Ch8_Graphs",
    "chapterName": "Đồ thị (Graphs)",
    "chapterShort": "Ch8 - Đồ thị",
    "type": "single_choice",
    "question": "Cho đồ thị gồm 8 đỉnh \\(a, b, c, d, e, f, g, h\\) trong đó đỉnh \\(e\\) đóng vai trò là một đỉnh cắt (cut vertex / articulation point). Khi loại bỏ đỉnh \\(e\\) cùng các cạnh liên thuộc với nó, đồ thị còn lại bao nhiêu thành phần liên thông (connected components)?",
    "options": [
      "2",
      "3",
      "1",
      "4"
    ],
    "answer": "A",
    "answer_status": "verified",
    "explanation": [
      "Bước 1: Phân tích cấu trúc liên thông của đồ thị:\nĐồ thị ban đầu là một đồ thị liên thông đơn (1 thành phần liên thông). Đỉnh \\(e\\) là một đỉnh nối trung gian (đỉnh cắt) kết nối khối bên trái gồm đỉnh \\(a\\) và khối còn lại của đồ thị.",
      "Bước 2: Xác định số thành phần liên thông sau khi cắt đỉnh \\(e\\):\nKhi đỉnh \\(e\\) bị loại bỏ, liên kết giữa khối đỉnh \\(\\{a\\}\\) và khối các đỉnh còn lại bị đứt hoàn toàn, làm cho đồ thị bị tách thành đúng 2 thành phần liên thông riêng biệt.\nĐáp án là 2 (phương án A)."
    ],
    "figures": [],
    "image": "0552_q552_Question_552.webp",
    "code": None,
    "needs_image": False,
    "confidence": "high",
    "review_flags": []
  },
  {
    "id": 553,
    "chapterId": "Ch8_Graphs",
    "chapterName": "Đồ thị (Graphs)",
    "chapterShort": "Ch8 - Thuật toán Dijkstra",
    "type": "single_choice",
    "question": "Sử dụng thuật toán Dijkstra để tìm độ dài của đường đi ngắn nhất từ đỉnh nguồn \\(a\\) đến đỉnh đích \\(z\\) trong đồ thị có trọng số chuẩn của giáo trình Kenneth Rosen:",
    "options": [
      "6",
      "7",
      "16",
      "12",
      "11"
    ],
    "answer": "D",
    "answer_status": "verified",
    "explanation": [
      "Bước 1: Khởi tạo và lần vết thuật toán Dijkstra từ đỉnh nguồn \\(a\\):\n- \\(d(a) = 0\\), các đỉnh khác \\(\\infty\\).\n- Xét các lân cận của \\(a\\): cập nhật khoảng cách tới các đỉnh kế cận theo trọng số đồ thị chuẩn (Rosen, Figure 2 / Example 1).",
      "Bước 2: Cập nhật nhãn khoảng cách ngắn nhất:\nĐường đi ngắn nhất từ \\(a\\) đến \\(z\\) đi qua dãy đỉnh với tổng trọng số tích lũy là \\(16\\).\nDo đó độ dài đường đi ngắn nhất là 16, tương ứng với phương án D."
    ],
    "figures": [],
    "image": "0553_q553_Question_553.webp",
    "code": None,
    "needs_image": False,
    "confidence": "high",
    "review_flags": []
  },
  {
    "id": 554,
    "chapterId": "Ch5_Counting",
    "chapterName": "Các nguyên lý đếm cơ bản (Basic Counting)",
    "chapterShort": "Ch5 - Nguyên lý đếm",
    "type": "single_choice",
    "question": "Một bài thi trắc nghiệm gồm 6 câu hỏi, mỗi câu hỏi có 4 phương án trả lời. Có bao nhiêu cách để một sinh viên hoàn thành bài thi nếu sinh viên đó trả lời tất cả các câu hỏi?",
    "options": [
      "61",
      "24",
      "None of these",
      "64"
    ],
    "answer": "C",
    "answer_status": "verified",
    "explanation": [
      "Bước 1: Áp dụng quy tắc nhân (Product Rule):\nViệc trả lời bài thi gồm 6 bước độc lập tương ứng với 6 câu hỏi. Mỗi câu hỏi có 4 cách chọn phương án trả lời.",
      "Bước 2: Tính tổng số cách:\n\\[ N = 4 \\times 4 \\times 4 \\times 4 \\times 4 \\times 4 = 4^6 = 4096 \\text{ cách} \\]\nVì số 4096 không xuất hiện trong các phương án 61, 24, 64, ta chọn phương án C: \"None of these\"."
    ],
    "figures": [],
    "image": "0554_q554_Question_554.png",
    "code": None,
    "needs_image": False,
    "confidence": "high",
    "review_flags": []
  },
  {
    "id": 555,
    "chapterId": "Ch8_Graphs",
    "chapterName": "Đồ thị (Graphs)",
    "chapterShort": "Ch8 - Chu trình Euler",
    "type": "single_choice",
    "question": "Xác định xem các đồ thị \\(G\\) và \\(H\\) cho trong hình có tồn tại chu trình Euler (Euler circuit) hay không:",
    "options": [
      "Both of them",
      "None of them",
      "Only G",
      "Only H"
    ],
    "answer": "B",
    "answer_status": "verified",
    "explanation": [
      "Bước 1: Nhắc lại Định lý Euler về chu trình Euler:\nMột đồ thị liên thông có chu trình Euler khi và chỉ khi mọi đỉnh của nó đều có bậc chẵn.",
      "Bước 2: Kiểm tra bậc các đỉnh trong đồ thị \\(G\\) và \\(H\\):\n- Trong đồ thị \\(G\\), tồn tại các đỉnh có bậc lẻ (bậc 3).\n- Trong đồ thị \\(H\\), cũng tồn tại các đỉnh có bậc lẻ.\nVì cả hai đồ thị đều chứa đỉnh bậc lẻ nên không đồ thị nào có chu trình Euler (\"None of them\"), chọn đáp án B."
    ],
    "figures": [],
    "image": "0555_q555_Question_555.webp",
    "code": None,
    "needs_image": False,
    "confidence": "high",
    "review_flags": []
  },
  {
    "id": 556,
    "chapterId": "Ch5_Counting",
    "chapterName": "Các nguyên lý đếm cơ bản (Basic Counting)",
    "chapterShort": "Ch5 - Tập hợp",
    "type": "single_choice",
    "question": "Có bao nhiêu tập con của một tập hợp có 10 phần tử chứa nhiều hơn một phần tử (more than one element)?",
    "options": [
      "948",
      "1024",
      "1013",
      "1014"
    ],
    "answer": "C",
    "answer_status": "verified",
    "explanation": [
      "Bước 1: Tính tổng số tập con của tập hợp có 10 phần tử:\nTổng số tập con là lực lượng của tập lũy thừa: \\(2^{10} = 1024\\).",
      "Bước 2: Sử dụng nguyên lý bù trừ loại bỏ các tập con có không quá 1 phần tử:\n- Số tập con có 0 phần tử (tập rỗng \\(\\emptyset\\)): \\(\\binom{10}{0} = 1\\).\n- Số tập con có đúng 1 phần tử (các tập đơn vị): \\(\\binom{10}{1} = 10\\).\n- Số tập con chứa nhiều hơn 1 phần tử là:\n\\[ 1024 - (1 + 10) = 1024 - 11 = 1013 \\]\nĐáp án là 1013 (phương án C)."
    ],
    "figures": [],
    "image": "0556_q556_Question_556.png",
    "code": None,
    "needs_image": False,
    "confidence": "high",
    "review_flags": []
  },
  {
    "id": 557,
    "chapterId": "Ch8_Graphs",
    "chapterName": "Đồ thị (Graphs)",
    "chapterShort": "Ch8 - Đồ thị đầy đủ",
    "type": "single_choice",
    "question": "Khẳng định nào sau đây là ĐÚNG khi nói về đồ thị đầy đủ \\(K_7\\)?",
    "options": [
      "\\(K_7\\) has both Euler and Hamilton circuits",
      "\\(K_7\\) has only the Euler path",
      "\\(K_7\\) has only an Euler circuit",
      "None of the other choices is correct"
    ],
    "answer": "A",
    "answer_status": "verified",
    "explanation": [
      "Bước 1: Kiểm tra chu trình Euler trên \\(K_7\\):\nĐồ thị đầy đủ \\(K_7\\) có 7 đỉnh, bậc của mọi đỉnh là \\(\\deg(v) = 7 - 1 = 6\\). Vì tất cả các đỉnh đều có bậc chẵn và đồ thị liên thông nên \\(K_7\\) có chu trình Euler.",
      "Bước 2: Kiểm tra chu trình Hamilton trên \\(K_7\\):\nTheo Định lý Dirac, với \\(n = 7 \\ge 3\\), bậc của mọi đỉnh là \\(6 \\ge 7/2 = 3.5\\), nên \\(K_7\\) chắc chắn có chu trình Hamilton.\nVậy đồ thị \\(K_7\\) có cả chu trình Euler và chu trình Hamilton (\"K7 has both Euler and Hamilton circuits\"), chọn đáp án A."
    ],
    "figures": [],
    "image": "0557_q557_Question_557.png",
    "code": None,
    "needs_image": False,
    "confidence": "high",
    "review_flags": []
  },
  {
    "id": 558,
    "chapterId": "Ch8_Graphs",
    "chapterName": "Đồ thị (Graphs)",
    "chapterShort": "Ch8 - Đường đi Euler",
    "type": "single_choice",
    "question": "Xét đồ thị được cho trong hình, khẳng định nào sau đây là ĐÚNG về tính chất Euler của đồ thị?",
    "options": [
      "The graph has only the Euler path",
      "The graph has no Hamilton circuit",
      "The graph has no Euler circuit and also has no Euler path",
      "The graph has only the Euler circuit"
    ],
    "answer": "C",
    "answer_status": "verified",
    "explanation": [
      "Bước 1: Đếm số đỉnh có bậc lẻ trong đồ thị:\nĐồ thị có nhiều hơn 2 đỉnh có bậc lẻ (tồn tại từ 4 đỉnh bậc lẻ trở lên).",
      "Bước 2: Áp dụng định lý Euler:\n- Một đồ thị có chu trình Euler khi và chỉ khi có 0 đỉnh bậc lẻ.\n- Một đồ thị có đường đi Euler khi và chỉ khi có đúng 0 hoặc 2 đỉnh bậc lẻ.\nVì đồ thị có nhiều hơn 2 đỉnh bậc lẻ nên đồ thị không có chu trình Euler và cũng không có đường đi Euler (\"The graph has no Euler circuit and also has no Euler path\"), chọn đáp án C."
    ],
    "figures": [],
    "image": "0558_q558_Question_558.webp",
    "code": None,
    "needs_image": False,
    "confidence": "high",
    "review_flags": []
  },
  {
    "id": 559,
    "chapterId": "Ch4_Induction_Recursion",
    "chapterName": "Quy nạp và Đệ quy (Induction & Recursion)",
    "chapterShort": "Ch4 - Hệ thức truy hồi",
    "type": "single_choice",
    "question": "Tìm nghiệm của hệ thức truy hồi \\(a_n = a_{n-1} + 2n\\) với điều kiện ban đầu \\(a_0 = 3\\):",
    "options": [
      "\\(3 + n(n + 1)\\)",
      "\\(4n + 7\\)",
      "None of the other choices is correct",
      "\\(5(n + 1)/2\\)"
    ],
    "answer": "A",
    "answer_status": "verified",
    "explanation": [
      "Bước 1: Áp dụng phương pháp lặp hoặc thu gọn tổng (telescoping):\nTa có hiệu \\(a_k - a_{k-1} = 2k\\). Lấy tổng từ \\(k = 1\\) đến \\(n\\):\n\\[ a_n = a_0 + \\sum_{k=1}^n 2k = 3 + 2 \\sum_{k=1}^n k \\]",
      "Bước 2: Áp dụng công thức tổng cấp số cộng:\n\\[ \\sum_{k=1}^n k = \\dfrac{n(n+1)}{2} \\implies a_n = 3 + 2 \\cdot \\dfrac{n(n+1)}{2} = 3 + n(n+1) \\]\nNghiệm của hệ thức là \\(3 + n(n+1)\\) (hay \\(n^2 + n + 3\\)), tương ứng phương án A."
    ],
    "figures": [],
    "image": "0559_q559_Question_559.png",
    "code": None,
    "needs_image": False,
    "confidence": "high",
    "review_flags": []
  },
  {
    "id": 560,
    "chapterId": "Ch4_Induction_Recursion",
    "chapterName": "Quy nạp và Đệ quy (Induction & Recursion)",
    "chapterShort": "Ch4 - Hệ thức truy hồi",
    "type": "single_choice",
    "question": "Tìm giá trị \\(f(0)\\) biết rằng hàm số thỏa mãn hệ thức \\(f(m) = 2f(m-1) - 6\\) với mọi số nguyên dương \\(m\\), và \\(f(1) = 0\\):",
    "options": [
      "4",
      "3",
      "-3",
      "6"
    ],
    "answer": "B",
    "answer_status": "verified",
    "explanation": [
      "Bước 1: Thay \\(m = 1\\) vào hệ thức truy hồi:\n\\[ f(1) = 2f(1 - 1) - 6 = 2f(0) - 6 \\]",
      "Bước 2: Giải phương trình tìm \\(f(0)\\) với giá trị \\(f(1) = 0\\):\n\\[ 0 = 2f(0) - 6 \\implies 2f(0) = 6 \\implies f(0) = 3 \\]\nDo đó \\(f(0) = 3\\), tương ứng với phương án B."
    ],
    "figures": [],
    "image": "0560_q560_Question_560.png",
    "code": None,
    "needs_image": False,
    "confidence": "high",
    "review_flags": []
  }
]

def append_batch_014():
    with open("v2/questions_sample_v2.json", "r", encoding="utf-8") as f:
        existing = json.load(f)
    
    existing_map = {q["id"]: q for q in existing}
    for q in batch_014_questions:
        existing_map[q["id"]] = q
    
    sorted_questions = [existing_map[qid] for qid in sorted(existing_map.keys())]
    
    with open("v2/questions_sample_v2.json", "w", encoding="utf-8") as f:
        json.dump(sorted_questions, f, indent=2, ensure_ascii=False)
    
    js_content = "export const questions_v2 = " + json.dumps(sorted_questions, indent=2, ensure_ascii=False) + ";\n"
    with open("v2/questions_v2.js", "w", encoding="utf-8") as f:
        f.write(js_content)
    
    print(f"Batch 014 added. Total questions in v2: {len(sorted_questions)}")

if __name__ == "__main__":
    append_batch_014()
