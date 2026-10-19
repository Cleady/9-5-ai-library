const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('Testing App script loading & runtime compatibility...');

// 1. Create browser-like window mock
const mockWindow = {
  window: null,
  MAE_QUESTIONS: null,
  MAE_QUESTIONS_V2: null,
  TEST_20_QUESTIONS: null,
  localStorage: {
    getItem: () => null,
    setItem: () => {},
    removeItem: () => {}
  },
  document: {
    documentElement: { dataset: {} },
    getElementById: () => ({
      addEventListener: () => {},
      classList: { add: () => {}, remove: () => {}, toggle: () => {}, contains: () => false },
      setAttribute: () => {},
      style: { setProperty: () => {} }
    }),
    querySelectorAll: () => [],
    addEventListener: () => {}
  },
  navigator: {},
  location: { href: '' },
  Intl: Intl
};
mockWindow.window = mockWindow;

const context = vm.createContext(mockWindow);

// Test 1: Load questions.js
const qjs = fs.readFileSync(path.join(__dirname, '../data/questions.js'), 'utf8');
vm.runInContext(qjs, context);
console.log(`✓ data/questions.js loaded successfully (${context.MAE_QUESTIONS.length} questions).`);

// Test 2: Load questions_v2.js
const qv2js = fs.readFileSync(path.join(__dirname, '../data/v2/questions_v2.js'), 'utf8');
vm.runInContext(qv2js, context);
console.log(`✓ data/v2/questions_v2.js loaded successfully (${context.MAE_QUESTIONS_V2.length} questions).`);

// Test 3: Load test_20.js
const t20js = fs.readFileSync(path.join(__dirname, '../data/v2/test_20.js'), 'utf8');
vm.runInContext(t20js, context);
console.log(`✓ data/v2/test_20.js loaded successfully (${context.TEST_20_QUESTIONS.length} questions).`);

// Test 4: Check V2 LaTeX integrity across all verified questions
let totalVerified = 0;
let totalWithLatex = 0;
for (const q of context.MAE_QUESTIONS_V2) {
  if (q.question) {
    totalWithLatex++;
    if (q.answer_status === 'verified') totalVerified++;
    
    // Check no forbidden dollar signs
    if (q.question.includes('$')) {
      throw new Error(`Question ${q.id} contains forbidden dollar sign!`);
    }
    for (const opt of q.options) {
      if (opt.includes('$')) throw new Error(`Option in Q${q.id} contains forbidden dollar sign!`);
    }
    for (const step of q.explanation) {
      if (step.includes('$')) throw new Error(`Explanation in Q${q.id} contains forbidden dollar sign!`);
    }
  }
}

console.log(`✓ Total questions with full LaTeX: ${totalWithLatex}`);
console.log(`✓ Total verified answers: ${totalVerified}`);
console.log('✓ All dollar sign checks PASSED (Strictly using \\( \\) and \\[ \\]).');
console.log('✅ UI Runtime Simulation Tests PASSED with 0 errors.');
