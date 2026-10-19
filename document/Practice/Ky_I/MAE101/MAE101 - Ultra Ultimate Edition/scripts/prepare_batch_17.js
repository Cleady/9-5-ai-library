const fs = require('fs');
const path = require('path');

const qJsPath = path.join(__dirname, '..', 'data', 'questions.js');
const classPath = path.join(__dirname, '..', 'data', 'classified_data.json');

const qJsContent = fs.readFileSync(qJsPath, 'utf8');
const match = qJsContent.match(/window\.MAE_QUESTIONS\s*=\s*(\[[\s\S]*\]);/);
const originalQuestions = JSON.parse(match[1]);

let classifiedData = {};
if (fs.existsSync(classPath)) {
  classifiedData = JSON.parse(fs.readFileSync(classPath, 'utf8'));
}

const batch17Raw = [];
for (let id = 641; id <= 680; id++) {
  const orig = originalQuestions.find(q => q.id === id) || {};
  const cls = classifiedData[id] || (classifiedData.find ? classifiedData.find(c => c.id === id) : {}) || {};
  const imgName = `${String(id).padStart(4, '0')}_q${id}_Question_${id}.png`;

  batch17Raw.push({
    id,
    image: imgName,
    bank_answer: orig.answer || '',
    folder: orig.folder || cls.chapter || '',
    topic: orig.topic || cls.topic || '',
    text: (orig.text || '').slice(0, 150)
  });
}

fs.writeFileSync(path.join(__dirname, 'temp_q641_680_combined.json'), JSON.stringify(batch17Raw, null, 2), 'utf8');
console.log('Batch 17 raw metadata saved.');
