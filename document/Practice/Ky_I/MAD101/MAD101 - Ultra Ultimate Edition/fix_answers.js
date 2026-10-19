const fs = require('fs');

// Parse answers.txt
const answersRaw = fs.readFileSync('answers.txt', 'utf8');
const answerMap = {};
answersRaw.split('\n').forEach(line => {
    const match = line.match(/Câu (\d+):\s*([A-F](?:,\s*[A-F])?)/);
    if (match) {
        const id = parseInt(match[1]);
        const answer = match[2].trim();
        answerMap[id] = answer;
    }
});

// Parse the original quiz_practice.html to get the original question data
const originalHtml = fs.readFileSync('quiz_practice.html', 'utf8');
const startMarker = 'const ALL_QUESTIONS = [';
const endMarker = '];';
const startIdx = originalHtml.indexOf(startMarker);
const endIdx = originalHtml.indexOf(endMarker, startIdx + startMarker.length);

if (startIdx === -1 || endIdx === -1) {
    console.error('Could not find ALL_QUESTIONS in quiz_practice.html');
    process.exit(1);
}

const arrayStr = originalHtml.substring(startIdx + startMarker.length, endIdx + 1);
const originalQuestions = JSON.parse(arrayStr);
console.log(`Original questions count: ${originalQuestions.length}`);

// Create a map of original questions
const origMap = {};
originalQuestions.forEach(q => {
    origMap[q.id] = q;
});

// Generate corrected questions for 1-1131
const correctedQuestions = [];
for (let i = 1; i <= 1131; i++) {
    if (origMap[i]) {
        // Use original data and update answer from answers.txt
        const q = { ...origMap[i] };
        if (answerMap[i]) {
            const ans = answerMap[i];
            q.answer = [ans];
            q.answerText = ans;
        }
        correctedQuestions.push(q);
    } else {
        // Generate new question entry
        const num = String(i).padStart(4, '0');
        const qNum = String(i).padStart(3, '0');
        // Check if webp or png exists
        const ans = answerMap[i] || 'A';
        correctedQuestions.push({
            id: i,
            image: `${num}_q${qNum}_Question_${i}.png`,
            answer: [ans],
            answerText: ans
        });
    }
}

console.log(`Generated ${correctedQuestions.length} questions`);

// Generate the JavaScript array string (minified, no pretty print)
const arrayJson = JSON.stringify(correctedQuestions);

// Output to console for verification
console.log(`\nFirst 3 questions:`, JSON.stringify(correctedQuestions.slice(0, 3)));
console.log(`\nQuestions 1050-1060:`);
correctedQuestions.slice(1049, 1060).forEach(q => {
    console.log(`  Q${q.id}: answer=${q.answer}`);
});

// Save the corrected array to a separate file
fs.writeFileSync('questions_data.js', `const ALL_QUESTIONS = ${arrayJson};\n`);
console.log('\nSaved questions_data.js');

// Count answers per chapter
const chapters = [
    { id: 1, name: "Chương 1: Logic và Bằng chứng", range: [1, 150] },
    { id: 2, name: "Chương 2: Cấu trúc cơ bản", range: [151, 280] },
    { id: 3, name: "Chương 3: Thuật toán", range: [281, 400] },
    { id: 4, name: "Chương 4: Lý thuyết số", range: [401, 550] },
    { id: 5, name: "Chương 5: Quy nạp và Đệ quy", range: [551, 700] },
    { id: 6, name: "Chương 6: Đếm", range: [701, 880] },
    { id: 7, name: "Chương 7: Đồ thị", range: [881, 1030] },
    { id: 8, name: "Chương 8: Cây", range: [1031, 1131] }
];

console.log('\n--- Questions per chapter ---');
chapters.forEach(ch => {
    const count = correctedQuestions.filter(q => q.id >= ch.range[0] && q.id <= ch.range[1]).length;
    console.log(`${ch.name}: ${count} questions`);
});
