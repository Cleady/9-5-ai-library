const fs = require('fs');
const path = require('path');

// 1. Update progress.json
const progPath = path.join(__dirname, '..', 'data', 'v2', 'progress.json');
const prog = JSON.parse(fs.readFileSync(progPath, 'utf8'));

prog.completed_questions_count = 680;
prog.updated_at = new Date().toISOString();

// Add questions 641-680 to completed_questions
for (let id = 641; id <= 680; id++) {
  if (!prog.completed_questions.includes(id)) {
    prog.completed_questions.push(id);
  }
}

// Add conflicts from batch 17: 644, 660
const batch17Conflicts = [644, 660];
batch17Conflicts.forEach(id => {
  if (!prog.conflict_questions.includes(id)) {
    prog.conflict_questions.push(id);
  }
  if (!prog.needs_review_questions.includes(id)) {
    prog.needs_review_questions.push(id);
  }
});

// Add batch_17 metadata
if (!prog.batches.find(b => b.batch_id === 'batch_17')) {
  prog.batches.push({
    "batch_id": "batch_17",
    "range": "Q641 - Q680",
    "count": 40,
    "passed_validation": 40,
    "failed_validation": 0,
    "error_rate_percent": 5.0,
    "conflicts": [644, 660],
    "file": "data/v2/batches/batch_17.json"
  });
}

fs.writeFileSync(progPath, JSON.stringify(prog, null, 2), 'utf8');
console.log('Successfully updated progress.json to 680 questions (Batch 17).');

// 2. Update preview_v2.html
let html = fs.readFileSync('preview_v2.html', 'utf8');

const oldOpt = '<option value="batch_16" selected>Lô 16: Câu 601 - 640 (40 câu)</option>';
const newOpt = '<option value="batch_16">Lô 16: Câu 601 - 640 (40 câu)</option>\n            <option value="batch_17" selected>Lô 17: Câu 641 - 680 (40 câu)</option>';

if (html.includes(oldOpt)) {
  html = html.replace(oldOpt, newOpt);
}

html = html.replace('Tất cả 640 câu v2 hoàn tất', 'Tất cả 680 câu v2 hoàn tất');

const oldLoader = `} else if (name === 'batch_16') {
          if (Array.isArray(window.MAE_QUESTIONS_V2)) {
            questions = window.MAE_QUESTIONS_V2.filter(q => q.id >= 601 && q.id <= 640 && q.question);
          }
        }`;

const newLoader = `} else if (name === 'batch_16') {
          if (Array.isArray(window.MAE_QUESTIONS_V2)) {
            questions = window.MAE_QUESTIONS_V2.filter(q => q.id >= 601 && q.id <= 640 && q.question);
          }
        } else if (name === 'batch_17') {
          if (Array.isArray(window.MAE_QUESTIONS_V2)) {
            questions = window.MAE_QUESTIONS_V2.filter(q => q.id >= 641 && q.id <= 680 && q.question);
          }
        }`;

if (html.includes(oldLoader)) {
  html = html.replace(oldLoader, newLoader);
}

html = html.replace("loadDataset('batch_16');", "loadDataset('batch_17');");

fs.writeFileSync('preview_v2.html', html, 'utf8');
console.log('Successfully updated preview_v2.html with Batch 17!');
