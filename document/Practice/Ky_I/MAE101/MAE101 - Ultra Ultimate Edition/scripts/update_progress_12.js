const fs = require('fs');
const path = require('path');

const p = path.join(__dirname, '..', 'data', 'v2', 'progress.json');
const data = JSON.parse(fs.readFileSync(p, 'utf8'));

for (let i = 441; i <= 480; i++) {
  if (!data.completed_questions.includes(i)) data.completed_questions.push(i);
}
data.completed_questions_count = data.completed_questions.length;
data.updated_at = new Date().toISOString();
if (!data.conflict_questions.includes(453)) data.conflict_questions.push(453);
if (!data.conflict_questions.includes(470)) data.conflict_questions.push(470);

// Check if batch_12 is already in batches
const existingIdx = data.batches.findIndex(b => b.batch_id === 'batch_12');
const batchEntry = {
  batch_id: "batch_12",
  range: "Q441 - Q480",
  count: 40,
  passed_validation: 40,
  failed_validation: 0,
  error_rate_percent: 5.0,
  conflicts: [453, 470],
  prompt_anomalies: [455],
  file: "data/v2/batches/batch_12.json"
};

if (existingIdx >= 0) {
  data.batches[existingIdx] = batchEntry;
} else {
  data.batches.push(batchEntry);
}

fs.writeFileSync(p, JSON.stringify(data, null, 2), 'utf8');
console.log("Updated progress.json: " + data.completed_questions_count + " completed.");
