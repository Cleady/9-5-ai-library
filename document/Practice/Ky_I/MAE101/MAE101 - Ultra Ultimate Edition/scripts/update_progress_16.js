const fs = require('fs');
const path = require('path');

// 1. Update progress.json
const progPath = path.join(__dirname, '..', 'data', 'v2', 'progress.json');
const prog = JSON.parse(fs.readFileSync(progPath, 'utf8'));

prog.completed_questions_count = 640;
prog.updated_at = new Date().toISOString();

// Add questions 601-640 to completed_questions
for (let id = 601; id <= 640; id++) {
  if (!prog.completed_questions.includes(id)) {
    prog.completed_questions.push(id);
  }
}

// Add conflicts from batch 16: 602, 605, 616, 617
const batch16Conflicts = [602, 605, 616, 617];
batch16Conflicts.forEach(id => {
  if (!prog.conflict_questions.includes(id)) {
    prog.conflict_questions.push(id);
  }
  if (!prog.needs_review_questions.includes(id)) {
    prog.needs_review_questions.push(id);
  }
});

// Add batch_16 metadata
if (!prog.batches.find(b => b.batch_id === 'batch_16')) {
  prog.batches.push({
    "batch_id": "batch_16",
    "range": "Q601 - Q640",
    "count": 40,
    "passed_validation": 40,
    "failed_validation": 0,
    "error_rate_percent": 10.0,
    "conflicts": [602, 605, 616, 617],
    "file": "data/v2/batches/batch_16.json"
  });
}

fs.writeFileSync(progPath, JSON.stringify(prog, null, 2), 'utf8');
console.log('Successfully updated progress.json to 640 questions (Batch 16).');

// 2. Update preview_v2.html
let html = fs.readFileSync('preview_v2.html', 'utf8');

const oldOpt = '<option value="batch_15" selected>Lô 15: Câu 561 - 600 (40 câu)</option>';
const newOpt = '<option value="batch_15">Lô 15: Câu 561 - 600 (40 câu)</option>\n            <option value="batch_16" selected>Lô 16: Câu 601 - 640 (40 câu)</option>';

if (html.includes(oldOpt)) {
  html = html.replace(oldOpt, newOpt);
}

html = html.replace('Tất cả 600 câu v2 hoàn tất', 'Tất cả 640 câu v2 hoàn tất');

const oldLoader = `} else if (name === 'batch_15') {
          if (Array.isArray(window.MAE_QUESTIONS_V2)) {
            questions = window.MAE_QUESTIONS_V2.filter(q => q.id >= 561 && q.id <= 600 && q.question);
          }
        }`;

const newLoader = `} else if (name === 'batch_15') {
          if (Array.isArray(window.MAE_QUESTIONS_V2)) {
            questions = window.MAE_QUESTIONS_V2.filter(q => q.id >= 561 && q.id <= 600 && q.question);
          }
        } else if (name === 'batch_16') {
          if (Array.isArray(window.MAE_QUESTIONS_V2)) {
            questions = window.MAE_QUESTIONS_V2.filter(q => q.id >= 601 && q.id <= 640 && q.question);
          }
        }`;

if (html.includes(oldLoader)) {
  html = html.replace(oldLoader, newLoader);
}

html = html.replace("loadDataset('batch_15');", "loadDataset('batch_16');");

fs.writeFileSync('preview_v2.html', html, 'utf8');
console.log('Successfully updated preview_v2.html with Batch 16!');
