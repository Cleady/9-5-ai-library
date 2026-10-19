const fs = require('fs');

// Read questions data from the current index.html
const currentHtml = fs.readFileSync('index.html', 'utf8');
const questionsMatch = currentHtml.match(/const ALL_QUESTIONS = (\[[\s\S]*?\]);/);
if (!questionsMatch) {
  console.error('Could not find ALL_QUESTIONS in index.html');
  process.exit(1);
}
const allQuestions = JSON.parse(questionsMatch[1]);
console.log(`Found ${allQuestions.length} questions`);

const html = `<!doctype html>
<html lang="vi">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>FU MAD - Discrete Mathematics Quiz</title>
<style>
:root { --bg:#fefefe; --panel:#ffffff; --panel2:#f0f9ff; --text:#2d2d2d; --muted:#888; --accent:#0ea5e9; --accent-light:#e0f2fe; --good:#4caf50; --bad:#ef5350; --warn:#ff9800; --border:#e0e8f0; }
* { box-sizing:border-box; }
body { margin:0; background:var(--bg); color:var(--text); font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif; }
body::before { content:''; position:fixed; inset:0; background:radial-gradient(ellipse at 20% 50%,rgba(14,165,233,0.03) 0%,transparent 60%),radial-gradient(ellipse at 80% 20%,rgba(224,242,254,0.06) 0%,transparent 50%); pointer-events:none; z-index:0; }
.app { max-width:900px; margin:0 auto; padding:18px; position:relative; z-index:1; }
.header { text-align:center; margin-bottom:30px; }
.header h1 { font-size:28px; margin-bottom:4px; color:#333; }
.header .sub { color:var(--muted); font-size:15px; }
.badge { display:inline-block; color:#fff; background:linear-gradient(135deg,#0ea5e9,#0284c7); padding:5px 14px; border-radius:999px; font-weight:700; font-size:14px; margin-top:8px; box-shadow:0 2px 10px rgba(14,165,233,0.2); }
.section { margin-bottom:24px; }
.section h2 { font-size:20px; margin-bottom:12px; padding-bottom:8px; border-bottom:2px solid var(--accent-light); color:#555; }
.grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(260px,1fr)); gap:12px; }
.card { background:#fff; border:1px solid var(--border); border-radius:16px; padding:16px; text-decoration:none; color:var(--text); transition:all .2s ease; display:block; box-shadow:0 2px 12px rgba(14,165,233,0.04); cursor:pointer; }
.card:hover { transform:translateY(-3px); border-color:var(--accent); box-shadow:0 6px 24px rgba(14,165,233,0.12); }
.card .name { font-size:16px; font-weight:700; color:#444; }
.card .count { color:var(--muted); font-size:13px; margin-top:4px; }
.folder-card { background:#fff; border:1px solid var(--border); border-radius:16px; padding:20px; text-decoration:none; color:var(--text); transition:all .2s ease; display:block; text-align:center; box-shadow:0 2px 12px rgba(14,165,233,0.04); cursor:pointer; }
.folder-card:hover { transform:translateY(-3px); border-color:var(--good); box-shadow:0 6px 24px rgba(76,175,80,0.15); }
.folder-card .name { font-size:20px; font-weight:800; color:#444; }
.folder-card .count { color:var(--muted); font-size:14px; margin-top:4px; }
.stats { display:grid; grid-template-columns:repeat(3,1fr); gap:12px; margin-bottom:24px; }
.stat { background:#fff; border:1px solid var(--border); border-radius:12px; padding:16px; text-align:center; box-shadow:0 2px 12px rgba(14,165,233,0.04); }
.stat .v { font-size:28px; font-weight:900; }
.stat .k { color:var(--muted); font-size:13px; margin-top:2px; }
/* Quiz Interface */
.controls-panel { background:var(--panel); border-radius:16px; padding:20px; border:1px solid var(--border); margin-bottom:24px; }
.controls { display:grid; grid-template-columns:repeat(auto-fill,minmax(150px,1fr)); gap:12px; }
.control-group { display:flex; flex-direction:column; gap:6px; }
.control-group label { font-size:12px; font-weight:600; color:var(--muted); text-transform:uppercase; letter-spacing:0.5px; }
.control-group select, .control-group input { padding:10px 14px; border:1px solid var(--border); border-radius:8px; background:var(--panel2); color:var(--text); font-size:14px; }
.control-group select:focus, .control-group input:focus { outline:none; border-color:var(--accent); }
.control-group button { padding:10px 16px; border:none; border-radius:8px; font-weight:600; font-size:14px; cursor:pointer; transition:all 0.2s; }
.btn-primary { background:var(--accent); color:white; }
.btn-primary:hover { background:#0284c7; }
.btn-secondary { background:var(--panel2); color:var(--text); border:1px solid var(--border); }
.btn-secondary:hover { background:var(--border); }
.btn-danger { background:var(--bad); color:white; }
.btn-danger:hover { background:#dc2626; }
.btn-success { background:var(--good); color:white; }
.btn-success:hover { background:#16a34a; }
.stats-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(120px,1fr)); gap:12px; margin-bottom:24px; }
.stat-card { background:var(--panel); border-radius:12px; padding:16px; text-align:center; border:1px solid var(--border); }
.stat-card .stat-label { font-size:11px; font-weight:600; color:var(--muted); text-transform:uppercase; letter-spacing:0.5px; margin-bottom:4px; }
.stat-card .stat-value { font-size:24px; font-weight:800; color:var(--text); }
.stat-card.highlight { background:linear-gradient(135deg,#0ea5e9,#0284c7); }
.stat-card.highlight .stat-label, .stat-card.highlight .stat-value { color:white; }
.quiz-layout { display:grid; grid-template-columns:1fr 280px; gap:20px; }
@media (max-width:900px) { .quiz-layout { grid-template-columns:1fr; } }
.question-card { background:var(--panel); border-radius:16px; padding:24px; border:1px solid var(--border); }
.question-header { display:flex; justify-content:space-between; align-items:center; margin-bottom:16px; }
.question-title { font-size:18px; font-weight:700; color:var(--text); }
.question-badge { display:inline-flex; align-items:center; gap:6px; background:var(--accent-light); color:#0284c7; padding:6px 12px; border-radius:999px; font-size:13px; font-weight:600; }
.image-container { display:flex; justify-content:center; align-items:center; background:#f8fafc; border:2px dashed var(--border); border-radius:12px; min-height:400px; padding:16px; margin-bottom:16px; }
.image-container img { max-width:100%; max-height:60vh; object-fit:contain; border-radius:8px; }
.options-grid { display:grid; grid-template-columns:repeat(6,1fr); gap:10px; margin-bottom:16px; }
.option-btn { padding:14px; border:2px solid var(--border); border-radius:10px; background:var(--panel2); color:var(--text); font-size:18px; font-weight:700; cursor:pointer; transition:all 0.2s; text-align:center; }
.option-btn:hover { border-color:var(--accent); background:var(--accent-light); }
.option-btn.selected { border-color:var(--accent); background:var(--accent); color:white; }
.option-btn.correct { border-color:var(--good); background:var(--good); color:white; }
.option-btn.wrong { border-color:var(--bad); background:var(--bad); color:white; }
.answer-reveal { display:none; padding:16px; background:var(--accent-light); border-radius:10px; border-left:4px solid var(--accent); margin-bottom:16px; }
.answer-reveal.show { display:block; }
.answer-reveal .correct-answer { font-size:18px; font-weight:700; color:#0284c7; }
.nav-buttons { display:grid; grid-template-columns:repeat(4,1fr); gap:10px; margin-bottom:12px; }
.nav-buttons button { padding:12px; border:none; border-radius:8px; font-weight:600; font-size:14px; cursor:pointer; transition:all 0.2s; }
.btn-prev, .btn-next { background:var(--panel2); color:var(--text); border:1px solid var(--border); }
.btn-prev:hover, .btn-next:hover { background:var(--border); }
.btn-show { background:var(--warn); color:white; }
.btn-show:hover { background:#d97706; }
.btn-check { background:var(--good); color:white; }
.btn-check:hover { background:#16a34a; }
.side-panel { background:var(--panel); border-radius:16px; padding:20px; border:1px solid var(--border); max-height:800px; overflow-y:auto; }
.side-panel h3 { font-size:16px; font-weight:700; margin-bottom:16px; color:var(--text); }
.question-nav { display:grid; grid-template-columns:repeat(5,1fr); gap:6px; }
.question-btn { width:100%; aspect-ratio:1; border:1px solid var(--border); border-radius:6px; background:var(--panel2); color:var(--text); font-size:11px; font-weight:600; cursor:pointer; transition:all 0.2s; display:flex; align-items:center; justify-content:center; }
.question-btn:hover { border-color:var(--accent); }
.question-btn.current { background:var(--accent); color:white; border-color:var(--accent); }
.question-btn.answered { background:var(--good); color:white; border-color:var(--good); }
.question-btn.wrong { background:var(--bad); color:white; border-color:var(--bad); }
.results-panel { display:none; background:var(--panel); border-radius:16px; padding:24px; border:1px solid var(--border); margin-top:24px; }
.results-panel.show { display:block; }
.results-header { text-align:center; margin-bottom:24px; }
.results-header h3 { font-size:24px; font-weight:800; margin-bottom:8px; }
.results-score { font-size:48px; font-weight:800; color:var(--accent); }
.results-details { display:grid; grid-template-columns:repeat(3,1fr); gap:16px; margin-bottom:24px; }
.result-item { text-align:center; padding:16px; background:var(--panel2); border-radius:12px; }
.result-item .label { font-size:13px; color:var(--muted); margin-bottom:4px; }
.result-item .value { font-size:24px; font-weight:700; }
.result-item.correct .value { color:var(--good); }
.result-item.wrong .value { color:var(--bad); }
.review-list { max-height:400px; overflow-y:auto; }
.review-item { padding:12px; border:1px solid var(--border); border-radius:8px; margin-bottom:8px; display:flex; justify-content:space-between; align-items:center; }
.review-item.correct { border-left:4px solid var(--good); }
.review-item.wrong { border-left:4px solid var(--bad); }
.shortcuts { display:flex; gap:12px; flex-wrap:wrap; margin-top:12px; padding-top:12px; border-top:1px solid var(--border); }
.shortcut { display:flex; align-items:center; gap:6px; font-size:12px; color:var(--muted); }
.shortcut kbd { background:var(--panel2); border:1px solid var(--border); padding:2px 6px; border-radius:4px; font-family:monospace; font-size:11px; }
</style>
</head>
<body>
<div class="app">
  <div class="header">
    <h1>FU MAD - Discrete Mathematics</h1>
    <div class="sub">Quiz trac nghiem - Phan loai theo chuong</div>
    <div class="badge">1131 cau hoi</div>
  </div>

  <div class="stats">
    <div class="stat"><div class="v" style="color:var(--accent)">8</div><div class="k">Chuong</div></div>
    <div class="stat"><div class="v" style="color:var(--good)">1131</div><div class="k">Tong cau hoi</div></div>
    <div class="stat"><div class="v" style="color:var(--muted)">0</div><div class="k">Da on tap</div></div>
  </div>

  <div id="chapterSelection">
    <div class="section">
      <h2>Chon chuong muon on tap</h2>
      <div class="grid" style="grid-template-columns:repeat(3,1fr)">
        <div class="folder-card" onclick="selectChapter(0)">
          <div class="name">Tat ca</div>
          <div class="count">1131 cau hoi</div>
        </div>
      </div>
    </div>

    <div class="section">
      <h2>Chi tiet tung chuong</h2>
      <div class="grid" id="chapterGrid"></div>
    </div>
  </div>

  <div id="quizInterface" style="display:none;">
    <div class="controls-panel">
      <div class="controls">
        <div class="control-group">
          <label>Che do</label>
          <select id="mode">
            <option value="practice">Practice - luyen tung cau</option>
            <option value="exam">Exam - lam bai co cham diem</option>
            <option value="flashcard">Flashcard - tu hoc</option>
          </select>
        </div>
        <div class="control-group">
          <label>Tron cau hoi</label>
          <select id="shuffle">
            <option value="no">Khong</option>
            <option value="yes">Co</option>
          </select>
        </div>
        <div class="control-group">
          <label>So cau</label>
          <input id="count" type="number" min="1" value="50">
        </div>
        <div class="control-group">
          <label>Thoi gian (phut)</label>
          <input id="minutes" type="number" min="0" value="30">
        </div>
        <div class="control-group">
          <label>Chon nhanh</label>
          <button class="btn-secondary" id="selectAll">Tat ca cau</button>
        </div>
        <div class="control-group">
          <label>Bat dau</label>
          <button class="btn-primary" id="startBtn">Tao de</button>
        </div>
      </div>
    </div>

    <div class="stats-grid">
      <div class="stat-card highlight">
        <div class="stat-label">Chuong hien tai</div>
        <div class="stat-value" id="currentChapter">Tat ca</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Cau hien tai</div>
        <div class="stat-value" id="curStat">-</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Da lam</div>
        <div class="stat-value" id="doneStat">0</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Dung</div>
        <div class="stat-value" id="correctStat">0</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Sai</div>
        <div class="stat-value" id="wrongStat">0</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Thoi gian</div>
        <div class="stat-value" id="timer">--:--</div>
      </div>
    </div>

    <div class="quiz-layout">
      <div class="question-card">
        <div class="question-header">
          <div class="question-title" id="questionTitle">Chua bat dau</div>
          <div class="question-badge" id="questionChapter">
            <span id="chapterBadge">-</span>
          </div>
        </div>
        <div class="image-container">
          <img id="qImage" alt="Question image" style="display:none;">
          <div id="noImage" style="color:var(--muted);">Chua co anh cau hoi</div>
        </div>
        <div class="options-grid" id="options"></div>
        <div class="answer-reveal" id="answerBox">
          Dap an dung: <span class="correct-answer" id="answerText"></span>
        </div>
        <div class="nav-buttons">
          <button class="btn-prev" id="prevBtn">← Truoc</button>
          <button class="btn-show" id="showAnswerBtn">Hien dap an</button>
          <button class="btn-check" id="checkBtn">Kiem tra</button>
          <button class="btn-next" id="nextBtn">Sau →</button>
        </div>
        <div class="nav-buttons">
          <button class="btn-danger" id="submitBtn">Nop bai</button>
          <button class="btn-secondary" id="resetBtn">Reset</button>
          <button class="btn-secondary" id="backBtn">← Quay lai</button>
          <button class="btn-secondary" id="saveProgress">Luu</button>
        </div>
        <div class="shortcuts">
          <div class="shortcut"><kbd>A</kbd>-<kbd>F</kbd> Chon dap an</div>
          <div class="shortcut"><kbd>N</kbd> Cau tiep</div>
          <div class="shortcut"><kbd>P</kbd> Cau truoc</div>
          <div class="shortcut"><kbd>S</kbd> Hien dap an</div>
        </div>
      </div>

      <div class="side-panel">
        <h3>Danh sach cau hoi</h3>
        <div class="question-nav" id="questionNav"></div>
      </div>
    </div>

    <div class="results-panel" id="resultsPanel">
      <div class="results-header">
        <h3>Ket qua bai thi</h3>
        <div class="results-score" id="finalScore">0%</div>
      </div>
      <div class="results-details">
        <div class="result-item">
          <div class="label">Tong cau</div>
          <div class="value" id="totalQuestions">0</div>
        </div>
        <div class="result-item correct">
          <div class="label">Dung</div>
          <div class="value" id="correctCount">0</div>
        </div>
        <div class="result-item wrong">
          <div class="label">Sai</div>
          <div class="value" id="wrongCount">0</div>
        </div>
      </div>
      <h4 style="margin-bottom:12px;">Chi tiet tung cau:</h4>
      <div class="review-list" id="reviewList"></div>
      <div style="text-align:center;margin-top:20px;">
        <button class="btn-primary" id="retryBtn" style="padding:12px 32px;">Lam lai</button>
        <button class="btn-secondary" id="backToChapters" style="padding:12px 32px;margin-left:12px;">Chon chuong khac</button>
      </div>
    </div>
  </div>
</div>

<script>
const CHAPTERS = [
  { id: 1, name: "Chuong 1: Logic va Bang chung", shortName: "Logic & Proofs", range: [1, 150] },
  { id: 2, name: "Chuong 2: Cau truc co ban - Tap hop, Ham, Chuoi va Tong", shortName: "Sets & Functions", range: [151, 280] },
  { id: 3, name: "Chuong 3: Thuat toan", shortName: "Algorithms", range: [281, 400] },
  { id: 4, name: "Chuong 4: Ly thuyet so va Ma hoa", shortName: "Number Theory", range: [401, 550] },
  { id: 5, name: "Chuong 5: Quy nap va De quy", shortName: "Induction", range: [551, 700] },
  { id: 6, name: "Chuong 6: Dem", shortName: "Counting", range: [701, 880] },
  { id: 7, name: "Chuong 7: Do thi", shortName: "Graphs", range: [881, 1030] },
  { id: 8, name: "Chuong 8: Cay", shortName: "Trees", range: [1031, 1131] }
];

const ALL_QUESTIONS = ${JSON.stringify(allQuestions)};

let currentChapterId = 0;
let questions = [];
let currentIndex = 0;
let answers = {};
let selectedOption = null;
let timerInterval = null;
let timeLeft = 0;

function getChapterForQuestion(id) {
  for (const ch of CHAPTERS) {
    if (id >= ch.range[0] && id <= ch.range[1]) return ch;
  }
  return null;
}

function renderChapterGrid() {
  const grid = document.getElementById('chapterGrid');
  grid.innerHTML = CHAPTERS.map(ch => {
    const count = ALL_QUESTIONS.filter(q => q.id >= ch.range[0] && q.id <= ch.range[1]).length;
    return '<div class="card" onclick="selectChapter(' + ch.id + ')">' +
      '<div class="name">' + ch.name + '</div>' +
      '<div class="count"><span style="background:var(--accent);color:white;padding:2px 8px;border-radius:999px;font-weight:600;margin-right:6px;">' + count + '</span> cau hoi</div>' +
    '</div>';
  }).join('');
}

function selectChapter(id) {
  currentChapterId = id;
  if (id === 0) {
    questions = [...ALL_QUESTIONS];
    document.getElementById('currentChapter').textContent = 'Tat ca';
  } else {
    const ch = CHAPTERS.find(c => c.id === id);
    questions = ALL_QUESTIONS.filter(q => q.id >= ch.range[0] && q.id <= ch.range[1]);
    document.getElementById('currentChapter').textContent = ch.shortName;
  }
  document.getElementById('count').value = questions.length;
  document.getElementById('chapterSelection').style.display = 'none';
  document.getElementById('quizInterface').style.display = 'block';
  document.getElementById('resultsPanel').classList.remove('show');
  renderQuestionNav();
  showQuestion(0);
}

function renderQuestionNav() {
  const nav = document.getElementById('questionNav');
  nav.innerHTML = questions.map((q, i) => {
    let cls = 'question-btn';
    if (i === currentIndex) cls += ' current';
    if (answers[q.id]) cls += ' answered';
    return '<button class="' + cls + '" onclick="showQuestion(' + i + ')">' + (i + 1) + '</button>';
  }).join('');
}

function showQuestion(index) {
  currentIndex = index;
  const q = questions[index];
  document.getElementById('questionTitle').textContent = 'Cau ' + (index + 1) + '/' + questions.length;
  const ch = getChapterForQuestion(q.id);
  document.getElementById('chapterBadge').textContent = ch ? ch.shortName : '-';
  
  const img = document.getElementById('qImage');
  const noImg = document.getElementById('noImage');
  img.src = q.image;
  img.onload = function() { img.style.display = 'block'; noImg.style.display = 'none'; };
  img.onerror = function() { img.style.display = 'none'; noImg.style.display = 'block'; };
  
  selectedOption = answers[q.id] || null;
  renderOptions();
  document.getElementById('answerBox').classList.remove('show');
  document.getElementById('answerText').textContent = q.answerText;
  renderQuestionNav();
  
  document.getElementById('curStat').textContent = (index + 1);
  updateStats();
}

function renderOptions() {
  const grid = document.getElementById('options');
  const opts = ['A', 'B', 'C', 'D', 'E', 'F'];
  grid.innerHTML = opts.map(o => {
    let cls = 'option-btn';
    if (selectedOption === o) cls += ' selected';
    return '<button class="' + cls + '" onclick="selectOption(\\'' + o + '\\')">' + o + '</button>';
  }).join('');
}

function selectOption(opt) {
  selectedOption = opt;
  answers[questions[currentIndex].id] = opt;
  renderOptions();
  updateStats();
  renderQuestionNav();
}

function updateStats() {
  const total = Object.keys(answers).length;
  let correct = 0;
  questions.forEach(q => {
    if (answers[q.id] && q.answer.includes(answers[q.id])) correct++;
  });
  document.getElementById('doneStat').textContent = total;
  document.getElementById('correctStat').textContent = correct;
  document.getElementById('wrongStat').textContent = total - correct;
}

document.getElementById('startBtn').addEventListener('click', () => {
  const count = parseInt(document.getElementById('count').value);
  const doShuffle = document.getElementById('shuffle').value === 'yes';
  
  if (doShuffle) {
    questions = [...questions].sort(() => Math.random() - 0.5);
  }
  questions = questions.slice(0, count);
  
  answers = {};
  currentIndex = 0;
  renderQuestionNav();
  showQuestion(0);
  
  const minutes = parseInt(document.getElementById('minutes').value);
  if (minutes > 0) {
    timeLeft = minutes * 60;
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
      timeLeft--;
      const m = Math.floor(timeLeft / 60);
      const s = timeLeft % 60;
      document.getElementById('timer').textContent = m + ':' + (s < 10 ? '0' : '') + s;
      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        submitQuiz();
      }
    }, 1000);
  }
});

document.getElementById('selectAll').addEventListener('click', () => {
  document.getElementById('count').value = questions.length;
});

document.getElementById('prevBtn').addEventListener('click', () => {
  if (currentIndex > 0) showQuestion(currentIndex - 1);
});

document.getElementById('nextBtn').addEventListener('click', () => {
  if (currentIndex < questions.length - 1) showQuestion(currentIndex + 1);
});

document.getElementById('showAnswerBtn').addEventListener('click', () => {
  document.getElementById('answerBox').classList.toggle('show');
});

document.getElementById('checkBtn').addEventListener('click', () => {
  const q = questions[currentIndex];
  if (!selectedOption) return;
  const btns = document.querySelectorAll('.option-btn');
  btns.forEach(b => {
    if (b.textContent === q.answer[0]) b.classList.add('correct');
    else if (b.textContent === selectedOption && selectedOption !== q.answer[0]) b.classList.add('wrong');
  });
  document.getElementById('answerBox').classList.add('show');
});

document.getElementById('submitBtn').addEventListener('click', submitQuiz);

function submitQuiz() {
  clearInterval(timerInterval);
  let correct = 0;
  const reviewList = document.getElementById('reviewList');
  reviewList.innerHTML = '';
  
  questions.forEach((q, i) => {
    const userAns = answers[q.id];
    const isCorrect = userAns && q.answer.includes(userAns);
    if (isCorrect) correct++;
    
    const item = document.createElement('div');
    item.className = 'review-item ' + (isCorrect ? 'correct' : 'wrong');
    item.innerHTML = '<span>Cau ' + (i + 1) + '</span><span>Ban: ' + (userAns || 'Chua tra loi') + ' | Dap an: ' + q.answerText + '</span>';
    reviewList.appendChild(item);
  });
  
  const score = Math.round((correct / questions.length) * 100);
  document.getElementById('finalScore').textContent = score + '%';
  document.getElementById('totalQuestions').textContent = questions.length;
  document.getElementById('correctCount').textContent = correct;
  document.getElementById('wrongCount').textContent = questions.length - correct;
  document.getElementById('resultsPanel').classList.add('show');
}

document.getElementById('resetBtn').addEventListener('click', () => {
  answers = {};
  currentIndex = 0;
  showQuestion(0);
});

document.getElementById('backBtn').addEventListener('click', () => {
  document.getElementById('quizInterface').style.display = 'none';
  document.getElementById('chapterSelection').style.display = 'block';
});

document.getElementById('backToChapters').addEventListener('click', () => {
  document.getElementById('quizInterface').style.display = 'none';
  document.getElementById('chapterSelection').style.display = 'block';
});

document.getElementById('retryBtn').addEventListener('click', () => {
  document.getElementById('resultsPanel').classList.remove('show');
  answers = {};
  currentIndex = 0;
  showQuestion(0);
});

document.getElementById('saveProgress').addEventListener('click', () => {
  const data = { chapterId: currentChapterId, answers, currentIndex };
  localStorage.setItem('quiz_progress', JSON.stringify(data));
  alert('Da luu tien do!');
});

// Load saved progress
const saved = localStorage.getItem('quiz_progress');
if (saved) {
  try {
    const data = JSON.parse(saved);
    if (data.chapterId && data.answers) {
      selectChapter(data.chapterId);
      answers = data.answers;
      if (data.currentIndex) showQuestion(data.currentIndex);
    }
  } catch(e) {}
}

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
  if (document.getElementById('quizInterface').style.display === 'none') return;
  const key = e.key.toUpperCase();
  if (['A','B','C','D','E','F'].includes(key)) selectOption(key);
  if (key === 'N' && currentIndex < questions.length - 1) showQuestion(currentIndex + 1);
  if (key === 'P' && currentIndex > 0) showQuestion(currentIndex - 1);
  if (key === 'S') document.getElementById('showAnswerBtn').click();
});

renderChapterGrid();
</script>
</body>
</html>`;

fs.writeFileSync('index.html', html);
console.log('Generated index.html successfully');
console.log('File size:', html.length, 'bytes');
