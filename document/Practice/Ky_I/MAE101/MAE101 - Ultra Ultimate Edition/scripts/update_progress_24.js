const fs = require('fs');
const path = require('path');

const progressFile = path.join(__dirname, '../data/v2/progress.json');
const progress = JSON.parse(fs.readFileSync(progressFile, 'utf8'));

progress.completed_questions_count = 960;
progress.updated_at = new Date().toISOString();

for (let i = 921; i <= 960; i++) {
  if (!progress.completed_questions.includes(i)) {
    progress.completed_questions.push(i);
  }
}
progress.completed_questions.sort((a, b) => a - b);

const batch24Meta = {
  batch_id: "batch_24",
  range: "Q921 - Q960",
  count: 40,
  passed_validation: 40,
  failed_validation: 0,
  error_rate_percent: 0,
  conflicts: [],
  file: "data/v2/batches/batch_24.json"
};

const existingBatchIdx = progress.batches.findIndex(b => b.batch_id === "batch_24");
if (existingBatchIdx >= 0) {
  progress.batches[existingBatchIdx] = batch24Meta;
} else {
  progress.batches.push(batch24Meta);
}

fs.writeFileSync(progressFile, JSON.stringify(progress, null, 2), 'utf8');
console.log('Progress updated to 960 questions successfully.');
