const fs = require('fs');
const path = require('path');
const confPath = path.join(__dirname, '..', 'data', 'v2', 'answer_conflicts.json');
const conflicts = JSON.parse(fs.readFileSync(confPath, 'utf8'));

const newConflicts = [
  {
    "id": 602,
    "batch": 16,
    "chapter": "DSTT1",
    "topic": "VectorHinhHoc",
    "bank_answer": "D",
    "bank_option_text": "Projection on the line 5x - 3y = 0",
    "verified_answer": "E",
    "verified_option_text": "Projection on the line 3x - 5y = 0",
    "reason": "Ma trận của biến đổi là A = (1/34)[[25, 15], [15, 9]]. Điểm bất động thỏa mãn Av = v dẫn đến 25x + 15y = 34x tương đương 9x - 15y = 0 hay 3x - 5y = 0. Đường thẳng chiếu có vectơ chỉ phương (5, 3) và thỏa mãn phương trình 3x - 5y = 0. Ngân hàng chọn D (5x - 3y = 0) do người ra đề nhầm lẫn giữa vectơ chỉ phương (5, 3) với phương trình đường thẳng (nghĩ rằng vectơ (5, 3) ứng với phương trình 5x - 3y = 0 thay vì 3x - 5y = 0).",
    "recommendation": "Use verified E (Projection on the line 3x - 5y = 0)"
  },
  {
    "id": 605,
    "batch": 16,
    "chapter": "GT1",
    "topic": "HamSo",
    "bank_answer": "B",
    "bank_option_text": "Shift up by 4, and then shift to the right 3",
    "verified_answer": "C",
    "verified_option_text": "Shift down by 4, and then shift to the left 3",
    "reason": "Đề bài hỏi: 'From the graph of y = f(x - 3) + 4, how do we obtain the graph of y = f(x)?'. Đặt g(x) = f(x - 3) + 4, ta có f(x) = g(x + 3) - 4. Để từ đồ thị g(x) thu được f(x), ta phải dịch sang trái 3 đơn vị (x -> x+3) và dịch xuống dưới 4 đơn vị (trừ đi 4). Ngân hàng chọn B (dịch lên 4 và sang phải 3) là do làm theo chiều ngược lại (từ f(x) sang f(x-3)+4).",
    "recommendation": "Use verified C (Shift down by 4, and then shift to the left 3)"
  },
  {
    "id": 616,
    "batch": 16,
    "chapter": "GT1",
    "topic": "GioiHan",
    "bank_answer": "A",
    "bank_option_text": "(iii)",
    "verified_answer": "B",
    "verified_option_text": "(i)",
    "reason": "Theo định nghĩa đạo hàm: f'(2) = lim_{x->2} (f(x) - f(2))/(x - 2). Với f(x) = 3x^2 - 4x + 1, ta có f(2) = 5. Do đó f(x) - f(2) = 3x^2 - 4x - 4 = (x - 2)(3x + 2). Vậy giới hạn f'(2) là lim_{x->2} (x - 2)(3x + 2)/(x - 2), đây là công thức (i), tương ứng với lựa chọn B. Ngân hàng chọn A (công thức (iii): lim_{x->2} (x-2)(x+5)/(x-2) = 7 != f'(2) = 8) là sai.",
    "recommendation": "Use verified B ((i))"
  },
  {
    "id": 617,
    "batch": 16,
    "chapter": "GT1",
    "topic": "DaoHam",
    "bank_answer": "C",
    "bank_option_text": "None of the other choices is correct",
    "verified_answer": "A",
    "verified_option_text": "(i)",
    "reason": "Nguyên hàm của f(x) = (x^4 - 9x + 7)/x^2 = x^2 - 9/x + 7x^{-2} là int f(x)dx = (1/3)x^3 - 9 ln|x| - 7/x + C. Biểu thức này trùng khớp hoàn toàn với công thức (i), được đưa ra ở lựa chọn A. Ngân hàng chọn C (None of the other choices is correct) do người ra đề nhầm dấu khi tính nguyên hàm của 7x^{-2} (nghĩ rằng nguyên hàm phải là +7/x nên thấy công thức (i) có -7/x thì tưởng sai).",
    "recommendation": "Use verified A ((i))"
  }
];

newConflicts.forEach(c => {
  if (!conflicts.find(x => x.id === c.id)) {
    conflicts.push(c);
  }
});

fs.writeFileSync(confPath, JSON.stringify(conflicts, null, 2), 'utf8');
console.log('Appended Batch 16 conflicts. Total conflicts now:', conflicts.length);
