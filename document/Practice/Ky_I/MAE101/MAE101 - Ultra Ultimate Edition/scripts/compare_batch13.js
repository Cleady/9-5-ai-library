const fs = require('fs');
const path = require('path');

const raw = JSON.parse(fs.readFileSync(path.join(__dirname, 'temp_q481_520_combined.json'), 'utf8'));

// Our verified answers:
const verified = {
  481: "E", // a + b = 5 + (-7) = -2 (None of other choices)
  482: "A", // Reflect about x-axis, then shift 3 units upward
  483: "A", // (i)
  484: "B", // -2
  485: "B", // -2; 0
  486: "D", // (ii)
  487: "A", // t = 3 sec
  488: "C", // (iv) \infty
  489: "C", // (iv) \infty (duplicate of 488)
  490: "D", // 14.45
  491: "E", // -0.6076
  492: "A", // Identity matrix
  493: "E", // 144
  494: "C", // Only (ii)
  495: "A", // Not enough information (bank has D) -> CONFLICT
  496: "A", // x = 1+2t, y = 1-t, z = -t
  497: "C", // (iii)
  498: "B", // -0.5 and -1
  499: "A", // (i)
  500: "E", // (0.8, 0.6)
  501: "B", // Only x
  502: "D", // (iii)
  503: "B", // (ii)
  504: "B", // -73/49
  505: "D", // (ii)
  506: "C", // (-2, -5/2) and (2, -5/2)
  507: "A", // (ii)
  508: "A", // (iii) X^2 - 9X - 2
  509: "D", // (iv) [1, \infty)
  510: "C", // 2
  511: "C", // (i)
  512: "A", // 2
  513: "D", // (ii) 3\sqrt{11}
  514: "A", // (iii) [0, -1]^T
  515: "B", // -3/4
  516: "D", // -2
  517: "A", // -1
  518: "D", // (i)
  519: "E", // 8.5
  520: "C"  // The first is 2, the second is -4
};

console.log("Comparing verified answers with bank answers for Batch 13:");
let conflictCount = 0;
for (const item of raw) {
  const v = verified[item.id];
  const b = item.bank_answer;
  const match = (v === b);
  if (!match) {
    conflictCount++;
    console.log(`[CONFLICT] Q${item.id}: Verified = ${v}, Bank = ${b}`);
  } else {
    console.log(`[MATCH] Q${item.id}: ${v}`);
  }
}
console.log(`Total conflicts in Batch 13: ${conflictCount} / 40 (${(conflictCount/40*100).toFixed(1)}%)`);
