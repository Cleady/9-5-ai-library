/**
 * tools/build-quiz-index.js
 * Tool tự động trích xuất chỉ mục nhẹ cho quiz (bỏ toàn bộ câu hỏi chi tiết)
 * để phục vụ tìm kiếm toàn cục nhanh, nhẹ (<25KB thay vì 5MB).
 */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const rootDir = path.resolve(__dirname, '..');
const practiceFiles = [
  path.join(rootDir, 'js/practice-data.js'),
  path.join(rootDir, 'js/practice-data-mad101.js'),
  path.join(rootDir, 'js/practice-data-mae101.js')
];

console.log('--- Đang trích xuất chỉ mục Quiz ---');

const sandbox = {
  window: {},
  document: { addEventListener: () => {} }
};
vm.createContext(sandbox);

practiceFiles.forEach(filePath => {
  if (fs.existsSync(filePath)) {
    const code = fs.readFileSync(filePath, 'utf8');
    vm.runInContext(code, sandbox);
    console.log(`Đã nạp: ${path.basename(filePath)}`);
  } else {
    console.warn(`Không tìm thấy file: ${filePath}`);
  }
});

const data = sandbox.window.Lib95 && sandbox.window.Lib95.practice && sandbox.window.Lib95.practice.data;
if (!data || !Array.isArray(data.subjects) || !Array.isArray(data.quizzes)) {
  console.error('Lỗi: Cấu trúc dữ liệu Lib95.practice.data không hợp lệ!');
  process.exit(1);
}

const subjectsMap = {};
data.subjects.forEach(s => {
  subjectsMap[s.id] = {
    id: s.id,
    name: s.name,
    code: s.title,
    icon: s.icon
  };
});

// Tính số lượng câu hỏi từ mảng questions nếu quiz không có sẵn questionCount
const questionCountByQuiz = {};
if (Array.isArray(data.questions)) {
  data.questions.forEach(q => {
    if (q && q.quizId) {
      questionCountByQuiz[q.quizId] = (questionCountByQuiz[q.quizId] || 0) + 1;
    }
  });
}

const compactQuizzes = data.quizzes.map(q => {
  const sub = subjectsMap[q.subjectId] || {};
  return {
    id: q.id,
    subjectId: q.subjectId,
    subjectCode: sub.code || '',
    subjectName: sub.name || '',
    title: q.title || '',
    order: q.order || 0,
    durationMin: q.durationMin || q.duration || 30,
    difficulty: q.difficulty || 'Medium',
    questionCount: q.questionCount || questionCountByQuiz[q.id] || 0
  };
});

const indexPayload = {
  generatedAt: new Date().toISOString(),
  totalSubjects: data.subjects.length,
  totalQuizzes: compactQuizzes.length,
  subjects: data.subjects.map(s => ({
    id: s.id,
    name: s.name,
    code: s.title,
    icon: s.icon
  })),
  quizzes: compactQuizzes
};

const outputBackend = path.join(rootDir, 'backend/data/quizzes-index.json');
fs.writeFileSync(outputBackend, JSON.stringify(indexPayload, null, 2), 'utf8');
console.log(`Đã lưu chỉ mục backend: ${outputBackend}`);

// Đảm bảo thư mục assets/data tồn tại và đồng bộ cho frontend nếu cần
const assetsDataDir = path.join(rootDir, 'assets/data');
if (!fs.existsSync(assetsDataDir)) {
  fs.mkdirSync(assetsDataDir, { recursive: true });
}
const outputAssets = path.join(assetsDataDir, 'quizzes-index.json');
fs.writeFileSync(outputAssets, JSON.stringify(indexPayload), 'utf8');
console.log(`Đã lưu chỉ mục assets: ${outputAssets}`);

const sizeKB = (Buffer.byteLength(JSON.stringify(indexPayload)) / 1024).toFixed(2);
console.log(`Thống kê: ${data.subjects.length} môn học, ${compactQuizzes.length} đề thi quiz.`);
console.log(`Kích thước file chỉ mục: ${sizeKB} KB (so với ~5000 KB của file gốc).`);
console.log('--- Hoàn thành trích xuất Quiz Index ---');
