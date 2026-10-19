var V2_QUESTIONS = [
  {
    "id": 1,
    "chapterId": 1,
    "chapterName": "Chương 1: Logic và Bằng chứng",
    "chapterShort": "Logic & Proofs",
    "type": "single_choice",
    "question": "Cho mệnh đề điều kiện \\(P \\to Q\\). Mệnh đề nào sau đây là **phản đảo** (contrapositive) của mệnh đề đã cho và có cùng giá trị chân lý với nó?",
    "options": [
      "\\(Q \\to P\\) (Đảo)",
      "\\(\\neg P \\to \\neg Q\\) (Nghịch)",
      "\\(\\neg Q \\to \\neg P\\) (Phản đảo)",
      "\\(\\neg P \\lor Q\\) (Dạng tương đương tuyển)"
    ],
    "answer": "C",
    "answer_status": "verified",
    "explanation": [
      "**Bước 1: Định nghĩa các mệnh đề liên quan:**",
      "- Mệnh đề gốc: \\(P \\to Q\\).",
      "- Mệnh đề đảo (Converse): \\(Q \\to P\\).",
      "- Mệnh đề nghịch (Inverse): \\(\\neg P \\to \\neg Q\\).",
      "- Mệnh đề phản đảo (Contrapositive): \\(\\neg Q \\to \\neg P\\).",
      "**Bước 2: Đối chiếu chân trị:**",
      "Theo định lý logic mệnh đề cơ bản, một mệnh đề điều kiện \\(P \\to Q\\) luôn luôn tương đương logic với mệnh đề phản đảo của nó: \\[P \\to Q \\equiv \\neg Q \\to \\neg P.\\]",
      "**Kết luận:** Đáp án chính xác là C."
    ],
    "image": "0001_q001_Question_1.png",
    "code": null,
    "needs_image": false,
    "confidence": "high"
  },
  {
    "id": 2,
    "chapterId": 1,
    "chapterName": "Chương 1: Logic và Bằng chứng",
    "chapterShort": "Logic & Proofs",
    "type": "single_choice",
    "question": "Cho hai mệnh đề \\(p, q\\). Phủ định của mệnh đề \\(p \\land \\neg q\\) theo luật De Morgan là biểu thức nào?",
    "options": [
      "\\(\\neg p \\land q\\)",
      "\\(\\neg p \\lor q\\)",
      "\\(\\neg p \\land \\neg q\\)",
      "\\(p \\lor \\neg q\\)"
    ],
    "answer": "B",
    "answer_status": "verified",
    "explanation": [
      "**Bước 1: Áp dụng luật De Morgan cho phép hội:**",
      "Luật De Morgan phát biểu rằng: \\[\\neg (A \\land B) \\equiv \\neg A \\lor \\neg B.\\]",
      "**Bước 2: Thay \\(A = p\\) và \\(B = \\neg q\\):**",
      "\\[\\neg (p \\land \\neg q) \\equiv \\neg p \\lor \\neg(\\neg q).\\]",
      "**Bước 3: Dùng luật phủ định kép (Double Negation):**",
      "\\[\\neg(\\neg q) \\equiv q \\implies \\neg p \\lor q.\\]",
      "**Kết luận:** Đáp án đúng là B."
    ],
    "image": "0002_q002_Question_2.png",
    "code": null,
    "needs_image": false,
    "confidence": "high"
  },
  {
    "id": 3,
    "chapterId": 2,
    "chapterName": "Chương 2: Cấu trúc cơ bản - Tập hợp, Hàm, Dãy và Tổng",
    "chapterShort": "Sets & Functions",
    "type": "single_choice",
    "question": "Cho tập hợp \\(A = \\{1, 2, 3\\}\\). Tập lũy thừa (power set) \\(\\mathcal{P}(A)\\) có bao nhiêu phần tử?",
    "options": [
      "\\(3\\)",
      "\\(6\\)",
      "\\(8\\)",
      "\\(9\\)"
    ],
    "answer": "C",
    "answer_status": "verified",
    "explanation": [
      "**Bước 1: Công thức số phần tử tập lũy thừa:**",
      "Nếu tập hợp \\(A\\) có \\(n\\) phần tử (tức là \\(|A| = n\\)), thì tập hợp tất cả các tập con của \\(A\\), ký hiệu \\(\\mathcal{P}(A)\\), có kích thước là: \\[|\\mathcal{P}(A)| = 2^n.\\]",
      "**Bước 2: Áp dụng vào bài toán:**",
      "Tập \\(A = \\{1, 2, 3\\}\\) có \\(n = 3\\) phần tử. Do đó: \\[|\\mathcal{P}(A)| = 2^3 = 8.\\]",
      "**Kết luận:** Đáp án đúng là C."
    ],
    "image": "0003_q003_Question_3.png",
    "code": null,
    "needs_image": false,
    "confidence": "high"
  },
  {
    "id": 4,
    "chapterId": 3,
    "chapterName": "Chương 3: Thuật toán",
    "chapterShort": "Algorithms",
    "type": "single_choice",
    "question": "Xem xét thuật toán tìm phần tử lớn nhất sau đây trong một dãy hữu hạn. Xác định số phép so sánh giữa các phần tử của dãy trong trường hợp xấu nhất.",
    "options": [
      "\\(n\\)",
      "\\(n - 1\\)",
      "\\(n + 1\\)",
      "\\(2n\\)"
    ],
    "answer": "B",
    "answer_status": "verified",
    "explanation": [
      "**Bước 1: Quan sát mã giả của thuật toán:**",
      "Vòng lặp chạy biến \\(i\\) từ \\(2\\) đến \\(n\\). Tại mỗi bước lặp, thuật toán thực hiện đúng 1 phép so sánh: `if a[i] > max`.",
      "**Bước 2: Đếm số bước lặp:**",
      "Số lần lặp là từ \\(2\\) đến \\(n\\), tức là: \\[n - 2 + 1 = n - 1 \\text{ lần lặp}.\\]",
      "**Bước 3: Tổng số phép so sánh phần tử:**",
      "Vì mỗi lần lặp so sánh đúng 1 lần, tổng số phép so sánh phần tử luôn luôn bằng \\(n - 1\\) đối với bất kỳ mảng nào.",
      "**Kết luận:** Đáp án đúng là B."
    ],
    "image": "0004_q004_Question_4.png",
    "code": "procedure find_max(a1, a2, ..., an: integers)\n    max := a1\n    for i := 2 to n\n        if a[i] > max then max := a[i]\nreturn max",
    "needs_image": false,
    "confidence": "high"
  },
  {
    "id": 5,
    "chapterId": 4,
    "chapterName": "Chương 4: Lý thuyết số và Mật mã",
    "chapterShort": "Number Theory",
    "type": "single_choice",
    "question": "Tính ước số chung lớn nhất \\(\\gcd(252, 198)\\) bằng thuật toán Euclid.",
    "options": [
      "\\(9\\)",
      "\\(18\\)",
      "\\(36\\)",
      "\\(54\\)"
    ],
    "answer": "B",
    "answer_status": "verified",
    "explanation": [
      "**Bước 1: Áp dụng phép chia có dư Euclid:**",
      "- \\(252 = 198 \\times 1 + 54\\) (dư 54)",
      "- \\(198 = 54 \\times 3 + 36\\) (dư 36)",
      "- \\(54 = 36 \\times 1 + 18\\) (dư 18)",
      "- \\(36 = 18 \\times 2 + 0\\) (dư 0)",
      "**Bước 2: Số dư khác 0 cuối cùng:**",
      "Số dư khác 0 cuối cùng của thuật toán Euclid là 18. Do đó: \\[\\gcd(252, 198) = 18.\\]",
      "**Kết luận:** Đáp án đúng là B."
    ],
    "image": "0005_q005_Question_5.png",
    "code": null,
    "needs_image": false,
    "confidence": "high"
  },
  {
    "id": 6,
    "chapterId": 6,
    "chapterName": "Chương 6: Đếm",
    "chapterShort": "Counting",
    "type": "single_choice",
    "question": "Có bao nhiêu cách chọn một ban chấp hành gồm 1 chủ tịch, 1 phó chủ tịch và 1 thư ký từ một câu lạc bộ có 10 thành viên, biết rằng mỗi người chỉ giữ tối đa một chức vụ?",
    "options": [
      "\\(C(10, 3) = 120\\)",
      "\\(P(10, 3) = 720\\)",
      "\\(10^3 = 1000\\)",
      "\\(3^{10} = 59049\\)"
    ],
    "answer": "B",
    "answer_status": "verified",
    "explanation": [
      "**Bước 1: Phân tích bài toán:**",
      "Vì các chức vụ (Chủ tịch, Phó chủ tịch, Thư ký) có vai trò phân biệt và thứ tự quan trọng, đây là bài toán tính **chỉnh hợp chập 3 của 10 phần tử** mà không lặp lại.",
      "**Bước 2: Áp dụng quy tắc nhân hoặc công thức chỉnh hợp:**",
      "- Chọn Chủ tịch: có 10 cách.",
      "- Chọn Phó chủ tịch: có 9 cách (trừ người đã làm Chủ tịch).",
      "- Chọn Thư ký: có 8 cách.",
      "\\[P(10, 3) = 10 \\times 9 \\times 8 = 720 \\text{ cách}.\\]",
      "**Kết luận:** Đáp án đúng là B."
    ],
    "image": "0006_q006_Question_6.png",
    "code": null,
    "needs_image": false,
    "confidence": "high"
  },
  {
    "id": 7,
    "chapterId": 7,
    "chapterName": "Chương 7: Đồ thị",
    "chapterShort": "Graphs",
    "type": "single_choice",
    "question": "Theo định lý bắt tay (Handshaking Theorem), tổng bậc của tất cả các đỉnh trong một đơn đồ thị vô hướng \\(G = (V, E)\\) bằng bao nhiêu?",
    "options": [
      "\\(|E|\\)",
      "\\(2|E|\\)",
      "\\(|V| \\cdot |E|\\)",
      "\\(2|V|\\)"
    ],
    "answer": "B",
    "answer_status": "verified",
    "explanation": [
      "**Bước 1: Phát biểu Định lý Bắt tay:**",
      "Trong mọi đồ thị vô hướng \\(G = (V, E)\\), mỗi cạnh nối 2 đỉnh nên đóng góp đúng 2 đơn vị vào tổng bậc của các đỉnh:",
      "\\[\\sum_{v \\in V} \\deg(v) = 2|E|.\\]",
      "**Hệ quả:** Tổng bậc của các đỉnh trong đồ thị luôn là một số chẵn, và số đỉnh có bậc lẻ luôn là một số chẵn.",
      "**Kết luận:** Đáp án đúng là B."
    ],
    "image": "0007_q007_Question_7.png",
    "code": null,
    "needs_image": false,
    "confidence": "high"
  },
  {
    "id": 8,
    "chapterId": 8,
    "chapterName": "Chương 8: Cây",
    "chapterShort": "Trees",
    "type": "single_choice",
    "question": "Một cây (Tree) có \\(n\\) đỉnh thì có chính xác bao nhiêu cạnh?",
    "options": [
      "\\(n\\)",
      "\\(n - 1\\)",
      "\\(n + 1\\)",
      "\\(2n - 1\\)"
    ],
    "answer": "B",
    "answer_status": "verified",
    "explanation": [
      "**Bước 1: Tính chất cơ bản của cây:**",
      "Theo định lý đồ thị cây: Một đồ thị vô hướng liên thông và không có chu trình đơn (tức là một cây) với \\(n\\) đỉnh luôn có đúng \\(n - 1\\) cạnh.",
      "**Bước 2: Chứng minh bằng quy nạp:**",
      "- Với \\(n = 1\\): Cây có 1 đỉnh và 0 cạnh (\\(1 - 1 = 0\\)).",
      "- Giả sử đúng với cây \\(k\\) đỉnh. Cây \\(k+1\\) đỉnh có ít nhất 1 lá (đỉnh bậc 1). Bỏ lá này và cạnh nối nó, ta được cây \\(k\\) đỉnh có \\(k - 1\\) cạnh. Vậy cây ban đầu có \\((k - 1) + 1 = k\\) cạnh.",
      "**Kết luận:** Đáp án đúng là B."
    ],
    "image": "0008_q008_Question_8.png",
    "code": null,
    "needs_image": false,
    "confidence": "high"
  }
];
if (typeof window !== "undefined") { window.V2_QUESTIONS = V2_QUESTIONS; }
