const fs = require('fs');

let html = fs.readFileSync('preview_v2.html', 'utf8');

const oldOpt = '<option value="batch_10" selected>Lô 10: Câu 361 - 400 (40 câu)</option>';
const newOpt = '<option value="batch_10">Lô 10: Câu 361 - 400 (40 câu)</option>\n            <option value="batch_11" selected>Lô 11: Câu 401 - 440 (40 câu)</option>';

if (html.includes(oldOpt)) {
  html = html.replace(oldOpt, newOpt);
}

html = html.replace('Tất cả 400 câu v2 hoàn tất', 'Tất cả 440 câu v2 hoàn tất');

const oldLoader = `} else if (name === 'batch_10') {
          if (Array.isArray(window.MAE_QUESTIONS_V2)) {
            questions = window.MAE_QUESTIONS_V2.filter(q => q.id >= 361 && q.id <= 400 && q.question);
          }
        }`;

const newLoader = `} else if (name === 'batch_10') {
          if (Array.isArray(window.MAE_QUESTIONS_V2)) {
            questions = window.MAE_QUESTIONS_V2.filter(q => q.id >= 361 && q.id <= 400 && q.question);
          }
        } else if (name === 'batch_11') {
          if (Array.isArray(window.MAE_QUESTIONS_V2)) {
            questions = window.MAE_QUESTIONS_V2.filter(q => q.id >= 401 && q.id <= 440 && q.question);
          }
        }`;

if (html.includes(oldLoader)) {
  html = html.replace(oldLoader, newLoader);
}

html = html.replace("loadDataset('batch_10');", "loadDataset('batch_11');");

fs.writeFileSync('preview_v2.html', html, 'utf8');
console.log('Successfully updated preview_v2.html with Batch 11!');
