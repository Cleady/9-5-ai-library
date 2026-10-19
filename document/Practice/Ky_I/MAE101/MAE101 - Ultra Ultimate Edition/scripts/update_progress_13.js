const fs = require('fs');
const path = require('path');

const p = path.join(__dirname, '..', 'data', 'v2', 'progress.json');
const data = JSON.parse(fs.readFileSync(p, 'utf8'));

for (let i = 481; i <= 520; i++) {
  if (!data.completed_questions.includes(i)) data.completed_questions.push(i);
}
data.completed_questions_count = data.completed_questions.length;
data.updated_at = new Date().toISOString();
if (!data.conflict_questions.includes(495)) data.conflict_questions.push(495);

const existingIdx = data.batches.findIndex(b => b.batch_id === 'batch_13');
const batchEntry = {
  batch_id: "batch_13",
  range: "Q481 - Q520",
  count: 40,
  passed_validation: 40,
  failed_validation: 0,
  error_rate_percent: 2.5,
  conflicts: [495],
  prompt_anomalies: [489, 519],
  file: "data/v2/batches/batch_13.json"
};

if (existingIdx >= 0) {
  data.batches[existingIdx] = batchEntry;
} else {
  data.batches.push(batchEntry);
}

fs.writeFileSync(p, JSON.stringify(data, null, 2), 'utf8');
console.log("Updated progress.json: " + data.completed_questions_count + " completed.");
