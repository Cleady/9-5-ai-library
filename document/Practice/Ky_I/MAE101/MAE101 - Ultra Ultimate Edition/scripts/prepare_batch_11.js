const fs = require('fs');
const path = require('path');

const classifiedPath = path.join(__dirname, '..', 'data', 'classified_data.json');
const ocrPath = path.join(__dirname, '..', 'data', 'ocr_results_full.json');
const questionsJsPath = path.join(__dirname, '..', 'data', 'questions.js');

const classified = JSON.parse(fs.readFileSync(classifiedPath, 'utf8'));
const ocr = JSON.parse(fs.readFileSync(ocrPath, 'utf8'));
const qjsContent = fs.readFileSync(questionsJsPath, 'utf8');

const win = {};
new Function('window', qjsContent)(win);
const originalQuestions = win.MAE_QUESTIONS || [];

const batch11Raw = [];

for (let id = 401; id <= 440; id++) {
  const cItem = classified[String(id)] || {};
  const ocrItem = ocr.find(x => x.id === id) || {};
  const origItem = originalQuestions.find(x => x.id === id) || {};

  batch11Raw.push({
    id: id,
    image: cItem.image || origItem.image || '',
    bank_answer: origItem.answer || cItem.answer || '',
    folder: cItem.folder || origItem.folder || '',
    topic: cItem.topic || origItem.topic || '',
    ocr_preview: (ocrItem.raw_text || origItem.text || '').replace(/\s+/g, ' ').slice(0, 160)
  });
}

const outPath = path.join(__dirname, 'temp_q401_440_combined.json');
fs.writeFileSync(outPath, JSON.stringify(batch11Raw, null, 2), 'utf8');
console.log(`Saved metadata for ${batch11Raw.length} questions to ${outPath}`);
