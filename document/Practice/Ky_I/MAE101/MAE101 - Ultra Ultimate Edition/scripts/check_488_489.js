const fs = require('fs');
const path = require('path');

const ocr = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'ocr_results_full.json'), 'utf8'));
console.log('488:', JSON.stringify(ocr['488'] || ocr[488]));
console.log('489:', JSON.stringify(ocr['489'] || ocr[489]));

const qJs = fs.readFileSync(path.join(__dirname, '..', 'data', 'questions.js'), 'utf8');
const match = qJs.match(/window\.MAE_QUESTIONS\s*=\s*(\[[\s\S]*\]);/);
const qs = JSON.parse(match[1]);
console.log('qJs 488:', qs.find(q => q.id === 488));
console.log('qJs 489:', qs.find(q => q.id === 489));

const f88 = fs.readFileSync(path.join(__dirname, '..', 'assets', 'questions', '0488_q488_Question_488.webp'));
const f89 = fs.readFileSync(path.join(__dirname, '..', 'assets', 'questions', '0489_q489_Question_489.webp'));
console.log('0488 length:', f88.length);
console.log('0489 length:', f89.length);
console.log('Are identical bytes?', f88.equals(f89));

