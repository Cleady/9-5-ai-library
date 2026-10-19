const fs = require('fs');
const path = require('path');
const confPath = path.join(__dirname, '..', 'data', 'v2', 'answer_conflicts.json');
const conflicts = JSON.parse(fs.readFileSync(confPath, 'utf8'));

const newConflicts = [
  {
    "id": 644,
    "batch": 17,
    "chapter": "DSTT1",
    "topic": "MaTran",
    "bank_answer": "A",
    "bank_option_text": "(iii)",
    "verified_answer": "B",
    "verified_option_text": "(ii)",
    "reason": "Với ma trận A = [[1, -1], [0, 1]], bằng quy nạp ta có A^n = [[1, -n], [0, 1]]. Với n = 100 thì A^{100} = [[1, -100], [0, 1]], tương ứng với công thức (ii), được gán ở lựa chọn B. Ngân hàng đề chọn A (công thức (iii): [[1, 1], [0, 1]]) do người ra đề nhầm lẫn lũy thừa ma trận với lũy thừa từng phần tử (lấy (-1)^{100} = 1).",
    "recommendation": "Use verified B ((ii))"
  },
  {
    "id": 660,
    "batch": 17,
    "chapter": "DSTT1",
    "topic": "TriRieng",
    "bank_answer": "D",
    "bank_option_text": "(iv)",
    "verified_answer": "A",
    "verified_option_text": "(i)",
    "reason": "Giải hệ phương trình thuần nhất (A - 9I)x = 0 cho thấy hạng của A - 9I bằng 2, do đó không gian riêng ứng với lambda = 9 chỉ có số chiều bằng 1, với vectơ riêng cơ sở duy nhất là [1, 1, -1]^T (công thức (i), lựa chọn A). Ngân hàng chọn D (công thức (iv)) do đưa thêm vectơ [1, 0, 1]^T vốn thuộc không gian riêng của lambda = 3 chứ không phải lambda = 9.",
    "recommendation": "Use verified A ((i))"
  }
];

newConflicts.forEach(c => {
  if (!conflicts.find(x => x.id === c.id)) {
    conflicts.push(c);
  }
});

fs.writeFileSync(confPath, JSON.stringify(conflicts, null, 2), 'utf8');
console.log('Appended Batch 17 conflicts. Total conflicts now:', conflicts.length);
