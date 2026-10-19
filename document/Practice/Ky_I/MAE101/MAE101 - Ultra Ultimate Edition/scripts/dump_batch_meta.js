const fs = require('fs');

const startId = 841;
const endId = 880;

const content = fs.readFileSync('./data/questions.js', 'utf8');
const jsonStr = content.replace(/^window\.MAE_QUESTIONS\s*=\s*/, '').replace(/;\s*$/, '');
const allQuestions = JSON.parse(jsonStr);

const questions = [];
for (let id = startId; id <= endId; id++) {
  const item = allQuestions.find(q => q.id === id);
  if (item) {
    questions.push({
      id: item.id,
      image: item.image,
      bank_answer: item.answer,
      topic: item.topic,
      folder: item.folder,
      text: item.text ? item.text.slice(0, 120) : ''
    });
  }
}

fs.writeFileSync(`./scripts/temp_q${startId}_${endId}_combined.json`, JSON.stringify(questions, null, 2), 'utf8');
console.log(`Dumped Q${startId} - Q${endId}:`);
console.log(questions.map(x => `${x.id}: ${x.bank_answer} (${x.topic} / ${x.image})`).join('\n'));
