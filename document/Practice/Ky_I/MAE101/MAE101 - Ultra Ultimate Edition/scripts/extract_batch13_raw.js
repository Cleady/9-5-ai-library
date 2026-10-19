const fs = require('fs');
const path = require('path');

const qJsPath = path.join(__dirname, '..', 'data', 'questions.js');
const ocrPath = path.join(__dirname, '..', 'data', 'ocr_results_full.json');
const classPath = path.join(__dirname, '..', 'data', 'classified_data.json');

const qJsContent = fs.readFileSync(qJsPath, 'utf8');
const match = qJsContent.match(/window\.MAE_QUESTIONS\s*=\s*(\[[\s\S]*\]);/);
const originalQuestions = JSON.parse(match[1]);

let ocrData = {};
if (fs.existsSync(ocrPath)) {
  ocrData = JSON.parse(fs.readFileSync(ocrPath, 'utf8'));
}

let classifiedData = {};
if (fs.existsSync(classPath)) {
  classifiedData = JSON.parse(fs.readFileSync(classPath, 'utf8'));
}

const batch13Raw = [];
for (let id = 481; id <= 520; id++) {
  const orig = originalQuestions.find(q => q.id === id) || {};
  const ocr = ocrData[id] || (ocrData.find ? ocrData.find(o => o.id === id) : {}) || {};
  const cls = classifiedData[id] || (classifiedData.find ? classifiedData.find(c => c.id === id) : {}) || {};

  let ext = '.png';
  if (id === 488 || id === 489) ext = '.webp';
  const imgName = `${String(id).padStart(4, '0')}_q${id}_Question_${id}${ext}`;

  batch13Raw.push({
    id,
    image: imgName,
    bank_answer: orig.answer || '',
    folder: orig.folder || cls.chapter || '',
    topic: orig.topic || cls.topic || '',
    ocr_preview: (ocr.text || ocr.ocr_text || '').slice(0, 150)
  });
}

fs.writeFileSync(path.join(__dirname, 'temp_q481_520_combined.json'), JSON.stringify(batch13Raw, null, 2), 'utf8');
console.log('Batch 13 raw metadata saved.');
