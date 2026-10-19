const fs = require('fs');

let html = fs.readFileSync('preview_v2.html', 'utf8');

const oldOpt = '<option value="batch_23" selected>Lô 23: Câu 881 - 920 (40 câu)</option>';
const newOpt = '<option value="batch_23">Lô 23: Câu 881 - 920 (40 câu)</option>\n            <option value="batch_24" selected>Lô 24: Câu 921 - 960 (40 câu)</option>';
html = html.replace(oldOpt, newOpt);

html = html.replace('Tất cả 920 câu v2 hoàn tất', 'Tất cả 960 câu v2 hoàn tất');

const oldLoader = `} else if (name === 'batch_23') {
          if (Array.isArray(window.MAE_QUESTIONS_V2)) {
            questions = window.MAE_QUESTIONS_V2.filter(q => q.id >= 881 && q.id <= 920 && q.question);
          }
        }`;

const newLoader = `} else if (name === 'batch_23') {
          if (Array.isArray(window.MAE_QUESTIONS_V2)) {
            questions = window.MAE_QUESTIONS_V2.filter(q => q.id >= 881 && q.id <= 920 && q.question);
          }
        } else if (name === 'batch_24') {
          if (Array.isArray(window.MAE_QUESTIONS_V2)) {
            questions = window.MAE_QUESTIONS_V2.filter(q => q.id >= 921 && q.id <= 960 && q.question);
          }
        }`;
html = html.replace(oldLoader, newLoader);

html = html.replace("loadDataset('batch_23');", "loadDataset('batch_24');");

fs.writeFileSync('preview_v2.html', html, 'utf8');
console.log('Successfully updated preview_v2.html with Batch 24!');
