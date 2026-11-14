/**
 * =====================================================================
 * practice-study.js — Chế độ học tập (Study Mode) cho từng chương Quiz
 * =====================================================================
 * Giao diện tương tự Quiz Run nhưng:
 * - Đồng hồ đếm LÊN (tích luỹ thời gian học thực tế)
 * - Nút "Check" (kiểm tra đáp án đã chọn) & "Show answer" (hiện đáp án đúng)
 * - Khung giải thích chi tiết có hỗ trợ công thức Toán MathJax
 * - Question navigator hiển thị trực quan các trạng thái: Đúng / Sai / Đã xem đáp án
 * - Không chấm điểm chính thức, không ghi đè vào tiến độ Quiz hoặc Attempts
 * =====================================================================
 */
;(function () {
  'use strict';

  var rootObj = typeof window !== 'undefined' ? window : (typeof global !== 'undefined' ? global : {});
  rootObj.Lib95 = rootObj.Lib95 || {};
  rootObj.Lib95.practice = rootObj.Lib95.practice || {};

  var core = rootObj.Lib95.practice.core;
  var LETTERS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

  /* ====== 1. MODULE LOGIC THUẦN (TEST ĐƯỢC BẰNG NODE.JS) ====== */
  var studyLogic = {
    /**
     * Định dạng số giây trôi qua thành chuỗi "mm:ss" hoặc "h:mm:ss"
     */
    formatElapsed: function (sec) {
      if (typeof sec !== 'number' || isNaN(sec) || sec <= 0 || !isFinite(sec)) {
        return '00:00';
      }
      var totalSec = Math.floor(sec);
      var h = Math.floor(totalSec / 3600);
      var m = Math.floor((totalSec % 3600) / 60);
      var s = totalSec % 60;

      var pad = function (num) { return num < 10 ? '0' + num : String(num); };

      if (h > 0) {
        return h + ':' + pad(m) + ':' + pad(s);
      }
      return pad(m) + ':' + pad(s);
    },

    /**
     * Chuẩn hoá và kiểm tra tính toàn vẹn của state lưu trong storage
     */
    sanitizeState: function (raw, questions) {
      var n = Array.isArray(questions) ? questions.length : 0;
      var obj = (raw && typeof raw === 'object' && !Array.isArray(raw)) ? raw : {};

      var currentIndex = typeof obj.currentIndex === 'number' ? Math.floor(obj.currentIndex) : 0;
      if (currentIndex < 0 || currentIndex >= n) {
        currentIndex = 0;
      }

      var elapsedSeconds = (typeof obj.elapsedSeconds === 'number' && isFinite(obj.elapsedSeconds) && obj.elapsedSeconds >= 0)
        ? Math.floor(obj.elapsedSeconds)
        : 0;

      var answers = new Array(n).fill(null);
      if (Array.isArray(obj.answers)) {
        for (var i = 0; i < n; i++) {
          var a = obj.answers[i];
          if (typeof a === 'number' && a >= 0 && questions[i] && Array.isArray(questions[i].options) && a < questions[i].options.length) {
            answers[i] = a;
          }
        }
      }

      var visited = new Array(n).fill(false);
      if (Array.isArray(obj.visited)) {
        for (var v = 0; v < n; v++) {
          visited[v] = Boolean(obj.visited[v]);
        }
      }
      if (n > 0) {
        visited[currentIndex] = true;
      }

      var checked = new Array(n).fill(false);
      if (Array.isArray(obj.checked)) {
        for (var c = 0; c < n; c++) {
          checked[c] = Boolean(obj.checked[c]);
        }
      }

      var correct = new Array(n).fill(null);
      if (Array.isArray(obj.correct)) {
        for (var k = 0; k < n; k++) {
          if (obj.correct[k] === true || obj.correct[k] === false) {
            correct[k] = obj.correct[k];
          }
        }
      }

      var revealed = new Array(n).fill(false);
      if (Array.isArray(obj.revealed)) {
        for (var r = 0; r < n; r++) {
          revealed[r] = Boolean(obj.revealed[r]);
        }
      }

      return {
        v: 1,
        quizId: obj.quizId || null,
        currentIndex: currentIndex,
        answers: answers,
        visited: visited,
        checked: checked,
        correct: correct,
        revealed: revealed,
        elapsedSeconds: elapsedSeconds,
        startedAt: typeof obj.startedAt === 'string' ? obj.startedAt : new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
    },

    /**
     * Xác định trạng thái của một câu hỏi cho Navigator theo thứ tự ưu tiên
     */
    statusOf: function (state, i) {
      if (!state) return 'none';
      if (state.correct && state.correct[i] === true) return 'correct';
      if (state.correct && state.correct[i] === false) return 'wrong';
      if (state.revealed && state.revealed[i] === true) return 'revealed';
      if (state.answers && state.answers[i] !== null && state.answers[i] !== undefined) {
        if (Array.isArray(state.answers[i])) {
          return state.answers[i].length > 0 ? 'answered' : 'none';
        }
        return 'answered';
      }
      return 'none';
    },

    /**
     * Tính toán bảng tổng kết số liệu của phiên học
     */
    computeSummary: function (state, questions) {
      var n = Array.isArray(questions) ? questions.length : 0;
      var viewed = 0;
      var checkedCount = 0;
      var correctCount = 0;
      var incorrectCount = 0;
      var revealedCount = 0;

      for (var i = 0; i < n; i++) {
        var isViewed = state.visited && state.visited[i];
        var hasAns = state.answers && state.answers[i] !== null && state.answers[i] !== undefined && (!Array.isArray(state.answers[i]) || state.answers[i].length > 0);
        var isChk = state.checked && state.checked[i];
        var isRev = state.revealed && state.revealed[i];

        if (isViewed || hasAns || isChk || isRev) {
          viewed++;
        }
        if (isChk) {
          checkedCount++;
        }
        if (state.correct && state.correct[i] === true) {
          correctCount++;
        } else if (state.correct && state.correct[i] === false) {
          incorrectCount++;
        }
        if (isRev) {
          revealedCount++;
        }
      }

      var tested = correctCount + incorrectCount;
      var accuracy = tested > 0 ? Math.round((correctCount / tested) * 100) : null;

      return {
        total: n,
        viewed: viewed,
        checked: checkedCount,
        correct: correctCount,
        incorrect: incorrectCount,
        revealed: revealedCount,
        accuracy: accuracy,
        elapsedSeconds: state ? (state.elapsedSeconds || 0) : 0
      };
    }
  };

  rootObj.Lib95.practice.studyLogic = studyLogic;
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = studyLogic;
  }

  /* ====== 2. ĐIỀU KHIỂN GIAO DIỆN CHẾ ĐỘ HỌC (DOM CONTROLLER) ====== */
  var studyState = null;
  var currentQuiz = null;
  var currentQuestions = [];
  var studyTimerInterval = null;

  function initStudyRun() {
    var page = document.getElementById('prc-quiz-page');
    if (!page) return;

    if (!core || core.getUrlParam('mode') !== 'study') {
      return;
    }

    var quizId = core.getUrlParam('quiz');
    if (!quizId) {
      window.location.href = 'practice.html';
      return;
    }

    var quiz = core.getQuizById(quizId);
    if (!quiz) {
      window.location.href = 'practice.html';
      return;
    }

    var questions = core.getQuestionsByQuizId(quiz.id);
    if (!questions || questions.length === 0) {
      core.showToast('Quiz này chưa có câu hỏi trong dữ liệu mẫu.');
      window.location.href = 'practice-subject.html?subject=' + quiz.subjectId;
      return;
    }

    currentQuiz = quiz;
    currentQuestions = questions;

    /* Khởi tạo hoặc đọc state phiên học riêng */
    var rawSaved = core.storageGet('study-' + quiz.id);
    studyState = studyLogic.sanitizeState(rawSaved, questions);
    studyState.quizId = quiz.id;
    saveStudyState();

    /* Đổi tiêu đề trang */
    document.title = 'Study – ' + (quiz.title.startsWith('Chương') ? quiz.title : 'Quiz ' + quiz.order + ' – ' + quiz.title) + ' – 9.5 AI CLUB';

    /* Thêm tiền tố class prc-study cho phần tử trang để cô lập style */
    page.classList.add('prc-study');

    renderStudyShell();
    bindStudyShortcuts();
  }

  function saveStudyState() {
    if (!studyState || !currentQuiz) return;
    studyState.updatedAt = new Date().toISOString();
    core.storageSet('study-' + currentQuiz.id, studyState);
  }

  function renderStudyShell() {
    var container = document.getElementById('prc-quiz-content');
    if (!container) return;

    var totalQ = currentQuestions.length;
    var currentIdx = studyState.currentIndex || 0;
    var quizTitle = currentQuiz.title.startsWith('Chương') ? currentQuiz.title : 'Quiz ' + currentQuiz.order + ' – ' + currentQuiz.title;

    container.innerHTML =
      '<div class="prc-study-header">' +
        '<div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;">' +
          '<h1 class="prc-subject-header-title" style="margin-bottom:0">' + quizTitle + '</h1>' +
          '<span class="prc-study-badge">Study mode</span>' +
        '</div>' +
        '<button type="button" class="prc-study-header-reset-btn" id="prc-header-reset-btn" title="Reset all study progress for this quiz">' +
          '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>' +
          'Reset study' +
        '</button>' +
      '</div>' +

      /* Topbar: tiến độ câu đã học + đồng hồ đếm lên */
      '<div class="prc-quiz-topbar">' +
        '<div style="flex:1">' +
          '<div class="prc-progress-row">' +
            '<progress id="prc-quiz-progressbar" class="prc-progress prc-progress-bar-lg" value="0" max="' + totalQ + '"></progress>' +
            '<span id="prc-quiz-progress-text" class="prc-quiz-progress-text" title="Questions checked or revealed">0 / ' + totalQ + '</span>' +
          '</div>' +
        '</div>' +
        '<div class="prc-quiz-timer" id="prc-quiz-timer" role="timer" aria-label="Study time">' +
          '<svg class="prc-quiz-timer-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">' +
            '<circle cx="10" cy="10" r="7" stroke="#3b82f6" stroke-width="1.5"/>' +
            '<path d="M10 6v4l3 2" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>' +
          '</svg>' +
          '<span id="prc-timer-display">' + studyLogic.formatElapsed(studyState.elapsedSeconds) + '</span>' +
        '</div>' +
      '</div>' +

      /* Layout 2 cột: Thẻ câu hỏi + Question Navigator */
      '<div class="prc-quiz-layout">' +
        '<div>' +
          '<div class="prc-card prc-question-card" id="prc-question-card"></div>' +
          '<div class="prc-quiz-actions">' +
            '<button type="button" class="prc-btn prc-btn-ghost" id="prc-prev-btn">← Previous</button>' +
            '<button type="button" class="prc-btn prc-btn-outline" id="prc-finish-study-btn">Finish study</button>' +
            '<button type="button" class="prc-btn prc-btn-primary" id="prc-next-btn">Next</button>' +
          '</div>' +
        '</div>' +

        '<div>' +
          '<div class="prc-card prc-question-nav" id="prc-question-nav"></div>' +
        '</div>' +
      '</div>';

    renderStudyQuestion(currentIdx);
    renderStudyNavigator(currentIdx);
    updateStudyProgressBar();

    /* Nút Previous & Next */
    var prevBtn = document.getElementById('prc-prev-btn');
    var nextBtn = document.getElementById('prc-next-btn');

    if (prevBtn) {
      prevBtn.addEventListener('click', function () {
        navigateStudyQuestion(-1);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', function () {
        navigateStudyQuestion(1);
      });
    }

    /* Nút Finish study */
    var finishBtn = document.getElementById('prc-finish-study-btn');
    if (finishBtn) {
      finishBtn.addEventListener('click', showStudySummaryModal);
    }

    /* Nút Reset study trên Header */
    var headerResetBtn = document.getElementById('prc-header-reset-btn');
    if (headerResetBtn) {
      headerResetBtn.addEventListener('click', handleResetSession);
    }
  }

  function renderStudyQuestion(index) {
    var q = currentQuestions[index];
    var card = document.getElementById('prc-question-card');
    if (!card || !q) return;

    var selectedAnswer = studyState.answers[index];
    var practiceNS = (window.Lib95 && window.Lib95.practice) || {};
    var formatMath = practiceNS.formatMathText || function (s) { return s || ''; };
    var getDisplayQuestionText = practiceNS.getDisplayQuestionText || function (item) { return (item && item.text) || ''; };
    var renderQuestionDiagrams = practiceNS.renderQuestionDiagrams || function () { return ''; };
    var isMulti = practiceNS.isMultiQuestion ? practiceNS.isMultiQuestion(q) : (q.multiple || (Array.isArray(q.correctIndices) && q.correctIndices.length > 1));

    var labelHtml = isMulti
      ? '<p class="prc-question-label prc-label-multi"><span class="prc-badge-multi">Multiple select</span> (Chọn nhiều đáp án)</p>'
      : '<p class="prc-question-label">Multiple choice</p>';

    var html =
      labelHtml +
      '<div class="prc-question-text">' + formatMath(getDisplayQuestionText(q)) + '</div>' +
      renderQuestionDiagrams(q) +
      '<ul class="prc-options-list' + (isMulti ? ' prc-options-list-multi' : '') + '" role="' + (isMulti ? 'group' : 'radiogroup') + '" aria-label="Đáp án">';

    var inputType = isMulti ? 'checkbox' : 'radio';
    var correctArr = isMulti ? (q.correctIndices || (typeof q.correctIndex === 'number' ? [q.correctIndex] : [])) : [q.correctIndex];

    q.options.forEach(function (opt, i) {
      var isChecked = false;
      if (isMulti) {
        isChecked = Array.isArray(selectedAnswer) && selectedAnswer.indexOf(i) !== -1;
      } else {
        isChecked = selectedAnswer === i;
      }
      var optClass = 'prc-option' + (isMulti ? ' prc-option-multi' : '');

      /* Khôi phục trạng thái đúng / sai nếu câu đã được check hoặc show */
      if (studyState.checked[index]) {
        if (correctArr.indexOf(i) !== -1) {
          optClass += ' prc-option-correct';
        } else if (isChecked && !studyState.correct[index]) {
          optClass += ' prc-option-wrong';
        }
      } else if (studyState.revealed[index] && correctArr.indexOf(i) !== -1) {
        optClass += ' prc-option-correct';
      }

      var checkedAttr = isChecked ? ' checked' : '';
      var optId = 'prc-opt-' + index + '-' + i;

      html +=
        '<li class="' + optClass + '">' +
          '<input type="' + inputType + '" class="prc-option-input' + (isMulti ? ' prc-option-checkbox' : '') + '" name="prc-answer" id="' + optId + '" value="' + i + '"' + checkedAttr + ' />' +
          '<label class="prc-option-label" for="' + optId + '">' +
            '<span class="prc-option-letter">' + LETTERS[i] + '</span>' +
            '<span class="prc-option-text">' + formatMath(opt) + '</span>' +
          '</label>' +
        '</li>';
    });

    html += '</ul>';

    /* Hàng nút Check và Show answer */
    var isCheckDisabled = false;
    if (isMulti) {
      isCheckDisabled = !Array.isArray(selectedAnswer) || selectedAnswer.length === 0;
    } else {
      isCheckDisabled = selectedAnswer === null || selectedAnswer === undefined;
    }

    html +=
      '<div class="prc-study-actions">' +
        '<button type="button" class="prc-btn prc-btn-primary prc-study-btn-check" id="prc-study-check-btn"' + (isCheckDisabled ? ' disabled' : '') + '>Check</button>' +
        '<button type="button" class="prc-btn prc-btn-outline prc-study-btn-show" id="prc-study-show-btn" aria-controls="prc-study-exp-box" aria-expanded="false">Show answer</button>' +
      '</div>';

    /* Dòng phản hồi trạng thái Check/Show answer */
    var fbText = '';
    var fbClass = 'prc-study-feedback';
    var isExpOpen = false;
    var hasValidKey = isMulti
      ? (Array.isArray(q.correctIndices) && q.correctIndices.length > 0)
      : (typeof q.correctIndex === 'number' && q.correctIndex >= 0 && q.correctIndex < q.options.length);

    if (studyState.checked[index]) {
      isExpOpen = true;
      if (!hasValidKey) {
        fbText = 'Không xác định được đáp án cho câu này.';
        fbClass += ' prc-study-feedback-wrong';
      } else if (studyState.correct[index] === true) {
        fbText = 'Correct!';
        fbClass += ' prc-study-feedback-correct';
      } else if (studyState.correct[index] === false) {
        if (isMulti) {
          var correctLetters = correctArr.map(function (idx) { return LETTERS[idx]; }).join(' & ');
          fbText = 'Not quite. The correct answers are ' + correctLetters + '.';
        } else {
          var correctLetter = LETTERS[q.correctIndex] || '?';
          fbText = 'Not quite. The correct answer is ' + correctLetter + '.';
        }
        fbClass += ' prc-study-feedback-wrong';
      }
    } else if (studyState.revealed[index]) {
      isExpOpen = true;
      if (!hasValidKey) {
        fbText = 'Không xác định được đáp án cho câu này.';
        fbClass += ' prc-study-feedback-wrong';
      } else {
        fbText = 'Answer revealed.';
        fbClass += ' prc-study-feedback-revealed';
      }
    }

    html += '<div id="prc-study-feedback" class="' + fbClass + '" role="status" aria-live="polite"' + (fbText ? '' : ' hidden') + '>' + fbText + '</div>';

    /* Khung giải thích chi tiết */
    var expContent = q.explanation
      ? formatMath(q.explanation, true)
      : '<em>Chưa có lời giải chi tiết cho câu hỏi này.</em>';

    html +=
      '<div id="prc-study-exp-box" class="prc-review-explanation"' + (isExpOpen ? '' : ' hidden') + '>' +
        '<strong>Giải thích:</strong>' +
        '<div style="margin-top:6px;">' + expContent + '</div>' +
      '</div>';

    card.innerHTML = html;

    /* Render công thức toán MathJax */
    var typeset = (window.Lib95 && window.Lib95.practice && window.Lib95.practice.typesetMath);
    if (typeset) {
      typeset(card);
    }

    /* Gắn sự kiện chọn đáp án */
    card.querySelectorAll('.prc-option-input').forEach(function (inp) {
      inp.addEventListener('change', function () {
        selectStudyAnswer(index, parseInt(this.value, 10));
      });
    });

    /* Gắn sự kiện nút Check */
    var checkBtn = document.getElementById('prc-study-check-btn');
    if (checkBtn) {
      checkBtn.addEventListener('click', function () {
        handleCheckAnswer(index);
      });
    }

    /* Gắn sự kiện nút Show answer */
    var showBtn = document.getElementById('prc-study-show-btn');
    if (showBtn) {
      if (isExpOpen) {
        showBtn.setAttribute('aria-expanded', 'true');
      }
      showBtn.addEventListener('click', function () {
        handleShowAnswer(index);
      });
    }
  }

  function resetQuestionFeedback(index) {
    if (!studyState) return;
    studyState.checked[index] = false;
    studyState.correct[index] = null;
  }

  function selectStudyAnswer(questionIndex, answerIndex) {
    var q = currentQuestions[questionIndex];
    if (!q || answerIndex >= q.options.length) return;

    var practiceNS = (window.Lib95 && window.Lib95.practice) || {};
    var isMulti = practiceNS.isMultiQuestion ? practiceNS.isMultiQuestion(q) : (q.multiple || (Array.isArray(q.correctIndices) && q.correctIndices.length > 1));

    if (isMulti) {
      var current = Array.isArray(studyState.answers[questionIndex])
        ? studyState.answers[questionIndex].slice()
        : [];
      var pos = current.indexOf(answerIndex);
      if (pos !== -1) {
        current.splice(pos, 1);
      } else {
        current.push(answerIndex);
        current.sort(function (a, b) { return a - b; });
      }
      studyState.answers[questionIndex] = current.length > 0 ? current : null;
    } else {
      studyState.answers[questionIndex] = answerIndex;
    }

    /* Nếu câu đã từng Check trước đó, gọi hàm dùng chung xoá feedback để người dùng kiểm tra lại */
    resetQuestionFeedback(questionIndex);

    saveStudyState();

    /* Bật lại nút Check */
    var checkBtn = document.getElementById('prc-study-check-btn');
    if (checkBtn) {
      var hasAns = isMulti
        ? (Array.isArray(studyState.answers[questionIndex]) && studyState.answers[questionIndex].length > 0)
        : (studyState.answers[questionIndex] !== null && studyState.answers[questionIndex] !== undefined);
      checkBtn.disabled = !hasAns;
    }

    /* Re-render để dọn sạch class đúng/sai cũ và cập nhật input */
    renderStudyQuestion(questionIndex);
    renderStudyNavigator(questionIndex);
    updateStudyProgressBar();
  }

  function handleCheckAnswer(index) {
    var q = currentQuestions[index];
    var userAns = studyState.answers[index];
    if (!q || userAns === null || userAns === undefined) return;

    var practiceNS = (window.Lib95 && window.Lib95.practice) || {};
    var isMulti = practiceNS.isMultiQuestion ? practiceNS.isMultiQuestion(q) : (q.multiple || (Array.isArray(q.correctIndices) && q.correctIndices.length > 1));

    studyState.checked[index] = true;

    if (isMulti) {
      if (!Array.isArray(userAns) || userAns.length === 0) {
        studyState.correct[index] = false;
      } else {
        var targetArr = (q.correctIndices || (typeof q.correctIndex === 'number' ? [q.correctIndex] : [])).slice().sort(function (a, b) { return a - b; });
        var userArr = userAns.slice().sort(function (a, b) { return a - b; });
        if (targetArr.length !== userArr.length) {
          studyState.correct[index] = false;
        } else {
          var matched = true;
          for (var k = 0; k < targetArr.length; k++) {
            if (targetArr[k] !== userArr[k]) {
              matched = false;
              break;
            }
          }
          studyState.correct[index] = matched;
        }
      }
    } else {
      var hasValidKey = typeof q.correctIndex === 'number' && q.correctIndex >= 0 && q.correctIndex < q.options.length;
      if (hasValidKey) {
        studyState.correct[index] = (userAns === q.correctIndex);
      } else {
        studyState.correct[index] = null;
      }
    }

    saveStudyState();
    renderStudyQuestion(index);
    renderStudyNavigator(index);
    updateStudyProgressBar();
  }

  function handleShowAnswer(index) {
    var q = currentQuestions[index];
    if (!q) return;

    studyState.revealed[index] = true;
    saveStudyState();

    renderStudyQuestion(index);
    renderStudyNavigator(index);
    updateStudyProgressBar();
  }

  function navigateStudyQuestion(direction) {
    var newIdx = studyState.currentIndex + direction;
    if (newIdx < 0 || newIdx >= currentQuestions.length) return;

    studyState.currentIndex = newIdx;
    studyState.visited[newIdx] = true;
    saveStudyState();

    renderStudyQuestion(newIdx);
    renderStudyNavigator(newIdx);

    /* Cập nhật trạng thái disabled của nút điều hướng */
    var prevBtn = document.getElementById('prc-prev-btn');
    var nextBtn = document.getElementById('prc-next-btn');
    if (prevBtn) prevBtn.disabled = (newIdx <= 0);
    if (nextBtn) nextBtn.disabled = (newIdx >= currentQuestions.length - 1);

    /* Cuộn nhẹ lên đầu card câu hỏi nếu đang bị khuất */
    var card = document.getElementById('prc-question-card');
    if (card) {
      var rect = card.getBoundingClientRect();
      if (rect.top < 60 || rect.bottom > window.innerHeight) {
        card.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }

  function renderStudyNavigator(currentIdx) {
    var nav = document.getElementById('prc-question-nav');
    if (!nav) return;

    var html = '<p class="prc-question-nav-title">Question navigator</p><div class="prc-question-nav-grid">';

    currentQuestions.forEach(function (q, i) {
      var cls = 'prc-question-nav-btn';
      var status = studyLogic.statusOf(studyState, i);

      if (i === currentIdx) {
        cls += ' prc-nav-current';
      }

      if (status === 'correct') {
        cls += ' prc-nav-correct';
      } else if (status === 'wrong') {
        cls += ' prc-nav-wrong';
      } else if (status === 'revealed') {
        cls += ' prc-nav-revealed';
      } else if (status === 'answered') {
        cls += ' prc-nav-answered';
      }

      var desc = 'Question ' + (i + 1);
      if (status === 'correct') desc += ': Checked correct';
      else if (status === 'wrong') desc += ': Checked incorrect';
      else if (status === 'revealed') desc += ': Answer revealed';
      else if (status === 'answered') desc += ': Answer selected';
      else desc += ': Unanswered';
      if (i === currentIdx) desc += ' (Current)';

      html += '<button type="button" class="' + cls + '" data-index="' + i + '" title="' + desc + '" aria-label="' + desc + '">' + (i + 1) + '</button>';
    });

    html += '</div>';

    /* Nút Reset session ở đáy navigator */
    html +=
      '<div class="prc-study-nav-footer">' +
        '<button type="button" class="prc-study-btn-reset" id="prc-study-reset-btn" title="Reset all study progress">' +
          '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:4px;vertical-align:-1px;"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>' +
          'Reset session' +
        '</button>' +
      '</div>';

    nav.innerHTML = html;

    /* Gắn sự kiện click ô navigator */
    nav.querySelectorAll('.prc-question-nav-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var idx = parseInt(btn.getAttribute('data-index'), 10);
        navigateStudyQuestion(idx - studyState.currentIndex);
      });
    });

    /* Gắn sự kiện Reset session */
    var resetBtn = document.getElementById('prc-study-reset-btn');
    if (resetBtn) {
      resetBtn.addEventListener('click', handleResetSession);
    }

    /* Đảm bảo ô câu hỏi hiện tại luôn nằm trong tầm nhìn khi cuộn danh sách */
    var activeBtn = nav.querySelector('.prc-question-nav-btn.prc-nav-current');
    var navGrid = nav.querySelector('.prc-question-nav-grid');
    if (activeBtn && navGrid && navGrid.scrollHeight > navGrid.clientHeight) {
      if (typeof activeBtn.scrollIntoView === 'function') {
        activeBtn.scrollIntoView({ block: 'nearest', inline: 'nearest' });
      }
    }
  }

  function updateStudyProgressBar() {
    var total = currentQuestions.length;
    var count = 0;
    for (var i = 0; i < total; i++) {
      if ((studyState.checked && studyState.checked[i]) || (studyState.revealed && studyState.revealed[i])) {
        count++;
      }
    }

    var bar = document.getElementById('prc-quiz-progressbar');
    var text = document.getElementById('prc-quiz-progress-text');
    if (bar) bar.value = count;
    if (text) text.textContent = count + ' / ' + total;
  }

  function handleResetSession() {
    core.showModal({
      title: 'Reset Study Session?',
      message: 'Reset study progress? All answers, checks, and time for this session will be cleared so you can study again from the beginning.',
      confirmText: 'Reset',
      cancelText: 'Cancel',
      onConfirm: function () {
        executeResetSession();
      }
    });
  }

  function executeResetSession() {
    stopStudyInterval();
    core.storageRemove('study-' + currentQuiz.id);
    studyState = studyLogic.sanitizeState({}, currentQuestions);
    studyState.quizId = currentQuiz.id;
    startStudyInterval();

    renderStudyQuestion(0);
    renderStudyNavigator(0);
    updateStudyProgressBar();
    var timerDisplay = document.getElementById('prc-timer-display');
    if (timerDisplay) {
      timerDisplay.textContent = '00:00';
    }
    core.showToast('Study session has been reset. Ready to study again!');
  }

  function showStudySummaryModal() {
    saveStudyState();
    var summary = studyLogic.computeSummary(studyState, currentQuestions);
    var accText = summary.accuracy !== null ? summary.accuracy + '%' : '—';
    var timeFormatted = studyLogic.formatElapsed(summary.elapsedSeconds);

    var messageHtml =
      '<div class="prc-study-summary-grid">' +
        '<div class="prc-study-summary-item">' +
          '<span class="prc-study-summary-label">Study Time</span>' +
          '<span class="prc-study-summary-value">' + timeFormatted + '</span>' +
        '</div>' +
        '<div class="prc-study-summary-item">' +
          '<span class="prc-study-summary-label">Questions Viewed</span>' +
          '<span class="prc-study-summary-value">' + summary.viewed + ' / ' + summary.total + '</span>' +
        '</div>' +
        '<div class="prc-study-summary-item">' +
          '<span class="prc-study-summary-label">Checked Questions</span>' +
          '<span class="prc-study-summary-value">' + summary.checked + ' <small style="font-weight:normal;font-size:13px;">(Correct ' + summary.correct + ' / Incorrect ' + summary.incorrect + ')</small></span>' +
        '</div>' +
        '<div class="prc-study-summary-item">' +
          '<span class="prc-study-summary-label">Answers Revealed</span>' +
          '<span class="prc-study-summary-value">' + summary.revealed + '</span>' +
        '</div>' +
        '<div class="prc-study-summary-item" style="grid-column: span 2;">' +
          '<span class="prc-study-summary-label">Accuracy Rate</span>' +
          '<span class="prc-study-summary-value" style="color:var(--color-primary)">' + accText + '</span>' +
        '</div>' +
      '</div>' +
      '<div class="prc-study-summary-reset-card">' +
        '<div>' +
          '<div class="prc-study-summary-reset-title">Study Again from Scratch?</div>' +
          '<div class="prc-study-summary-reset-desc">Clear your saved answers and study time to study this quiz again.</div>' +
        '</div>' +
        '<div class="prc-study-summary-reset-actions">' +
          '<button type="button" class="prc-btn prc-btn-danger" id="prc-summary-reset-again-btn" style="padding:7px 14px;font-size:13px;font-weight:600;display:inline-flex;align-items:center;gap:6px;">' +
            '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>' +
            'Reset & Study Again' +
          '</button>' +
          '<button type="button" class="prc-btn prc-btn-outline" id="prc-summary-reset-exit-btn" style="padding:7px 14px;font-size:13px;color:var(--prc-red);border-color:rgba(239,68,68,0.4);">' +
            'Reset & Exit' +
          '</button>' +
        '</div>' +
      '</div>';

    var modalInst = core.showModal({
      title: 'Study Session Summary',
      message: messageHtml,
      confirmText: 'Back to chapter',
      cancelText: 'Keep studying',
      onConfirm: function () {
        window.location.href = 'practice-quiz-intro.html?quiz=' + currentQuiz.id;
      }
    });

    /* Gắn sự kiện cho các nút Reset trong modal */
    setTimeout(function () {
      var resetAgainBtn = document.getElementById('prc-summary-reset-again-btn');
      if (resetAgainBtn) {
        resetAgainBtn.addEventListener('click', function () {
          if (modalInst && typeof modalInst.close === 'function') {
            modalInst.close();
          } else {
            var overlay = document.querySelector('.prc-modal-overlay');
            if (overlay) overlay.remove();
          }
          executeResetSession();
        });
      }

      var resetExitBtn = document.getElementById('prc-summary-reset-exit-btn');
      if (resetExitBtn) {
        resetExitBtn.addEventListener('click', function () {
          core.storageRemove('study-' + currentQuiz.id);
          if (modalInst && typeof modalInst.close === 'function') {
            modalInst.close();
          } else {
            var overlay = document.querySelector('.prc-modal-overlay');
            if (overlay) overlay.remove();
          }
          core.showToast('Study progress has been reset.');
          window.location.href = 'practice-quiz-intro.html?quiz=' + currentQuiz.id;
        });
      }
    }, 0);
  }

  function bindStudyShortcuts() {
    document.addEventListener('keydown', function onStudyKeydown(e) {
      if (core.getUrlParam('mode') !== 'study') return;

      /* Bỏ qua khi đang gõ text hoặc phím tổ hợp */
      var tag = e.target.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || e.target.isContentEditable) return;
      if (e.ctrlKey || e.metaKey || e.altKey) return;

      var key = e.key.toUpperCase();

      /* A-H chọn đáp án */
      if (['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'].indexOf(key) !== -1) {
        var idx = key.charCodeAt(0) - 65;
        selectStudyAnswer(studyState.currentIndex, idx);
      }

      /* 1-8 chọn đáp án */
      if (['1', '2', '3', '4', '5', '6', '7', '8'].indexOf(e.key) !== -1) {
        selectStudyAnswer(studyState.currentIndex, parseInt(e.key, 10) - 1);
      }

      /* Mũi tên trái/phải đổi câu */
      if (e.key === 'ArrowLeft') {
        navigateStudyQuestion(-1);
      }
      if (e.key === 'ArrowRight') {
        navigateStudyQuestion(1);
      }

      /* C = Check */
      if (key === 'C') {
        handleCheckAnswer(studyState.currentIndex);
      }

      /* S = Show answer */
      if (key === 'S') {
        handleShowAnswer(studyState.currentIndex);
      }
    });
  }

  /* ====== 3. BỘ ĐẾM GIỜ LÊN (ACTIVE TIMER) ====== */
  function stopStudyInterval() {
    if (studyTimerInterval) {
      clearInterval(studyTimerInterval);
      studyTimerInterval = null;
    }
  }

  function startStudyInterval() {
    stopStudyInterval();
    if (document.hidden) return;

    studyTimerInterval = setInterval(function () {
      if (document.hidden) {
        stopStudyInterval();
        saveStudyState();
        return;
      }
      if (!studyState) return;

      studyState.elapsedSeconds++;

      var display = document.getElementById('prc-timer-display');
      if (display) {
        display.textContent = studyLogic.formatElapsed(studyState.elapsedSeconds);
      }

      /* Lưu định kỳ mỗi 5 giây */
      if (studyState.elapsedSeconds % 5 === 0) {
        saveStudyState();
      }
    }, 1000);
  }

  function initStudyTimer() {
    if (core.getUrlParam('mode') !== 'study') return;

    startStudyInterval();

    /* Xử lý chuyển tab / ẩn trang */
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) {
        stopStudyInterval();
        saveStudyState();
      } else {
        startStudyInterval();
      }
    });

    window.addEventListener('pagehide', function () {
      stopStudyInterval();
      saveStudyState();
    });

    window.addEventListener('beforeunload', function () {
      stopStudyInterval();
      saveStudyState();
    });
  }

  /* Khởi chạy khi DOM sẵn sàng trong môi trường trình duyệt */
  if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', function () {
      if (core && core.getUrlParam('mode') === 'study') {
        initStudyRun();
        initStudyTimer();
      }
    });
  }

})();
