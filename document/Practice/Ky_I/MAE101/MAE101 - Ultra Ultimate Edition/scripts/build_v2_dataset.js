const fs = require('fs');
const path = require('path');

// 1. Load original questions
let rawQuestions = fs.readFileSync(path.join(__dirname, '../data/questions.js'), 'utf8').trim();
if (rawQuestions.startsWith('window.MAE_QUESTIONS=')) {
  rawQuestions = rawQuestions.replace('window.MAE_QUESTIONS=', '');
}
if (rawQuestions.endsWith(';')) {
  rawQuestions = rawQuestions.slice(0, -1);
}
const originalQuestions = JSON.parse(rawQuestions);

// 2. Load reclassifications
const reclassData = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/v2/reclassification.json'), 'utf8'));
const reclassMap = new Map();
for (const r of reclassData.reclassifications) {
  reclassMap.set(r.id, r);
}

// 3. Load all batch files from data/v2/batches/ and test_20.json
const v2Map = new Map();

// Load test_20 first
const test20File = path.join(__dirname, '../data/v2/test_20.json');
if (fs.existsSync(test20File)) {
  const test20 = JSON.parse(fs.readFileSync(test20File, 'utf8'));
  for (const q of test20) {
    v2Map.set(q.id, q);
  }
}

// Load batches in order
const batchesDir = path.join(__dirname, '../data/v2/batches');
if (fs.existsSync(batchesDir)) {
  const batchFiles = fs.readdirSync(batchesDir).filter(f => f.endsWith('.json')).sort();
  for (const bf of batchFiles) {
    const batch = JSON.parse(fs.readFileSync(path.join(batchesDir, bf), 'utf8'));
    for (const q of batch) {
      v2Map.set(q.id, q);
    }
  }
}

console.log(`Loaded ${v2Map.size} fully verified v2 questions.`);

// 4. Build unified v2 dataset for all 1131 questions
const fullV2Questions = [];

for (const orig of originalQuestions) {
  const id = orig.id;
  if (v2Map.has(id)) {
    // Has full v2 LaTeX data
    const qv2 = v2Map.get(id);
    fullV2Questions.push(qv2);
  } else {
    // Fallback: apply reclassification if any, preserve original image
    const reclass = reclassMap.get(id);
    const folder = reclass ? reclass.new_folder : orig.folder;
    const topic = reclass ? reclass.new_topic : orig.topic;
    
    fullV2Questions.push({
      id: orig.id,
      chapter: folder === 'GT1' ? 'GT1 - Giải tích 1' : folder === 'DSTT1' ? 'DSTT1 - Đại số tuyến tính 1' : 'Chưa phân loại',
      folder: folder,
      topic: topic,
      type: "single_choice",
      question: null, // Indicates image fallback
      options: ["A", "B", "C", "D", "E", "F"],
      answer: orig.answer,
      answer_original: orig.answer,
      answer_status: "unverified",
      explanation: [],
      image: orig.image,
      needs_image: true,
      review_flags: reclass && reclass.needs_review ? ["reclassification_review"] : [],
      confidence: "medium"
    });
  }
}

// Write out JSON and JS
const outJson = path.join(__dirname, '../data/v2/questions_v2.json');
const outJs = path.join(__dirname, '../data/v2/questions_v2.js');

fs.writeFileSync(outJson, JSON.stringify(fullV2Questions, null, 2), 'utf8');
fs.writeFileSync(outJs, `window.MAE_QUESTIONS_V2 = ${JSON.stringify(fullV2Questions, null, 2)};\n`, 'utf8');

console.log(`Successfully generated:`);
console.log(`- ${outJson} (${fullV2Questions.length} total questions, ${v2Map.size} with full LaTeX)`);
console.log(`- ${outJs}`);
