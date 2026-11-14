/**
 * =====================================================================
 * practice-quiz.js — Resolve cho Quiz Intro, Quiz Run, Quiz Result
 * =====================================================================
 * Trang practice-quiz-intro.html: hiện thông tin quiz, nút Start.
 * Trang practice-quiz.html: chạy quiz, countdown timer, chọn đáp án,
 *   question navigator, Previous/Next, Submit, lưu localStorage.
 * Trang practice-result.html: hiện kết quả, review answers.
 *
 * Timer dùng endTime timestamp (không phải setInterval đếm) nên reload
 * trang không reset thời gian.
 *
 * Dữ liệu lấy từ: practice-core.js (namespace Lib95.practice.core)
 * =====================================================================
 */
;(function () {
  'use strict';

  window.Lib95 = window.Lib95 || {};
  window.Lib95.practice = window.Lib95.practice || {};

  var core = window.Lib95.practice.core;

  /* Ký hiệu đáp án A-H */
  var LETTERS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

  /* ====== QUIZ INTRO (practice-quiz-intro.html) ====== */

  function initQuizIntro() {
    var page = document.getElementById('prc-quiz-intro-page');
    if (!page) return;

    var quizId = core.getUrlParam('quiz');
    if (!quizId) { window.location.href = 'practice.html'; return; }

    var quiz = core.getQuizById(quizId);
    if (!quiz) { window.location.href = 'practice.html'; return; }

    var subject = core.getSubjectById(quiz.subjectId);
    var subjectName = subject ? subject.name + ' – ' + subject.title : '';

    /* Cập nhật tiêu đề trang */
    document.title = (quiz.title.startsWith('Chương') ? quiz.title : 'Quiz ' + quiz.order + ' – ' + quiz.title) + ' – 9.5 AI CLUB';

    var duration = Number(quiz.durationMin) || Math.round((quiz.questionCount || 10) * 1.5) || 30;
    var difficulty = quiz.difficulty || 'Medium';

    var savedStudy = core.storageGet('study-' + quiz.id);
    var hasStudyProgress = savedStudy && (
      (savedStudy.elapsedSeconds && savedStudy.elapsedSeconds > 0) ||
      (Array.isArray(savedStudy.answers) && savedStudy.answers.some(function (a) { return a !== null; })) ||
      (Array.isArray(savedStudy.checked) && savedStudy.checked.some(Boolean)) ||
      (Array.isArray(savedStudy.revealed) && savedStudy.revealed.some(Boolean))
    );
    var studyBtnLabel = hasStudyProgress ? 'Continue Study' : 'Start Study';

    var container = document.getElementById('prc-quiz-intro-content');
    container.innerHTML =
      '<a href="practice-subject.html?subject=' + quiz.subjectId + '" class="prc-back-link">' +
        '<span class="prc-back-arrow" aria-hidden="true"></span>' +
        'Back to ' + subjectName +
      '</a>' +

      '<div class="prc-card">' +
        '<div class="prc-quiz-intro">' +
          /* Minh họa brain — inline SVG */
          '<div class="prc-quiz-intro-illustration" aria-hidden="true">' +
            '<svg width="120" height="120" viewBox="0 0 120 120" fill="none">' +
              '<circle cx="60" cy="60" r="56" fill="#dbeafe" />' +
              '<circle cx="60" cy="60" r="40" fill="#bfdbfe" />' +
              /* Não đơn giản */
              '<path d="M45 65c-5-2-8-7-8-13 0-8 6-15 14-15 2 0 4 0 5 1 2-5 7-8 12-8s10 3 12 8c1-1 3-1 5-1 8 0 14 7 14 15 0 6-3 11-8 13" ' +
                'stroke="#3b82f6" stroke-width="2.5" stroke-linecap="round" fill="none"/>' +
              '<path d="M52 55v20M60 50v25M68 55v20" stroke="#3b82f6" stroke-width="2" stroke-linecap="round" opacity="0.5"/>' +
              '<circle cx="52" cy="52" r="2" fill="#3b82f6"/>' +
              '<circle cx="60" cy="48" r="2" fill="#3b82f6"/>' +
              '<circle cx="68" cy="52" r="2" fill="#3b82f6"/>' +
            '</svg>' +
          '</div>' +

          '<p class="prc-quiz-row-meta" style="margin-bottom:8px">' + subjectName + '</p>' +
          '<h1 class="prc-quiz-intro-title">' + (quiz.title.startsWith('Chương') ? quiz.title : 'Quiz ' + quiz.order + ' – ' + quiz.title) + '</h1>' +
          '<h2 class="prc-quiz-intro-title" style="font-size:20px;margin-bottom:8px">Ready to test your knowledge?</h2>' +
          '<p class="prc-quiz-intro-desc">' +
            'This quiz will help you review the key concepts of ' + quiz.title.toLowerCase() +
            '. Take your time and choose the best answer.' +
          '</p>' +

          /* Meta row: questions, minutes, difficulty */
          '<div class="prc-quiz-meta-row">' +
            '<div class="prc-quiz-meta-item">' +
              '<span class="prc-quiz-meta-icon" aria-hidden="true">' +
                '<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="3" y="3" width="14" height="14" rx="3" stroke="#3b82f6" stroke-width="1.5"/><path d="M7 7h6M7 10h6M7 13h4" stroke="#3b82f6" stroke-width="1.2" stroke-linecap="round"/></svg>' +
              '</span>' +
              '<span><span class="prc-quiz-meta-value">' + quiz.questionCount + '</span> questions</span>' +
            '</div>' +
            '<div class="prc-quiz-meta-item">' +
              '<span class="prc-quiz-meta-icon" aria-hidden="true">' +
                '<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="7" stroke="#3b82f6" stroke-width="1.5"/><path d="M10 6v4l3 2" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
              '</span>' +
              '<span><span class="prc-quiz-meta-value">' + duration + '</span> minutes</span>' +
            '</div>' +
            '<div class="prc-quiz-meta-item">' +
              '<span class="prc-quiz-meta-icon" aria-hidden="true">' +
                '<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 3l2 4 4.5.7-3.2 3.2.8 4.5L10 13l-4.1 2.4.8-4.5L3.5 7.7 8 7l2-4z" stroke="#3b82f6" stroke-width="1.5" stroke-linejoin="round" fill="none"/></svg>' +
              '</span>' +
              '<span><span class="prc-quiz-meta-value">' + difficulty + '</span></span>' +
            '</div>' +
          '</div>' +

          '<div class="prc-quiz-intro-actions">' +
            '<button type="button" class="prc-btn prc-btn-primary" id="prc-start-quiz-btn">Start Quiz</button>' +
            '<button type="button" class="prc-btn prc-btn-outline" id="prc-start-study-btn">' + studyBtnLabel + '</button>' +
            (hasStudyProgress ? '<button type="button" class="prc-btn prc-btn-outline prc-btn-reset-study" id="prc-reset-study-btn" title="Reset all saved study progress for this quiz"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:6px;vertical-align:-2px;"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>Reset Study</button>' : '') +
          '</div>' +
        '</div>' +
      '</div>';

    /* Nút Start / Continue Study - chế độ học */
    var startStudyBtn = document.getElementById('prc-start-study-btn');
    if (startStudyBtn) {
      startStudyBtn.addEventListener('click', function () {
        window.location.href = 'practice-quiz.html?quiz=' + quiz.id + '&mode=study';
      });
    }

    /* Nút Reset Study - xóa tiến trình học */
    var resetStudyBtn = document.getElementById('prc-reset-study-btn');
    if (resetStudyBtn) {
      resetStudyBtn.addEventListener('click', function () {
        core.showModal({
          title: 'Reset Study Progress?',
          message: 'Reset study progress? All answers, checks, and time for this session will be cleared so you can study again from the beginning.',
          confirmText: 'Reset',
          cancelText: 'Cancel',
          onConfirm: function () {
            core.storageRemove('study-' + quiz.id);
            core.showToast('Study progress has been reset.');
            initQuizIntro();
          }
        });
      });
    }

    /* Nút Start Quiz — bắt đầu quiz */
    document.getElementById('prc-start-quiz-btn').addEventListener('click', function () {
      /* Tạo progress data trong localStorage để quiz page đọc */
      var questions = core.getQuestionsByQuizId(quiz.id);
      var totalQuestions = questions.length > 0 ? questions.length : quiz.questionCount;
      var duration = Number(quiz.durationMin) || Math.round(totalQuestions * 1.5) || 30;

      /* Tính endTime = bây giờ + duration phút */
      var endTime = Date.now() + duration * 60 * 1000;

      var progress = {
        quizId: quiz.id,
        answers: new Array(totalQuestions).fill(null),
        currentIndex: 0,
        endTime: endTime,
        startedAt: new Date().toISOString()
      };
      core.storageSet('quiz-progress-' + quiz.id, progress);

      /* Chuyển sang trang quiz */
      window.location.href = 'practice-quiz.html?quiz=' + quiz.id;
    });
  }

  /* ====== QUIZ RUN (practice-quiz.html) ====== */

  var timerInterval = null;

  function initQuizRun() {
    var page = document.getElementById('prc-quiz-page');
    if (!page) return;

    /* Chế độ học do practice-study.js tiếp quản */
    if (core.getUrlParam('mode') === 'study') return;

    var quizId = core.getUrlParam('quiz');
    if (!quizId) { window.location.href = 'practice.html'; return; }

    var quiz = core.getQuizById(quizId);
    if (!quiz) { window.location.href = 'practice.html'; return; }

    var questions = core.getQuestionsByQuizId(quiz.id);
    /* Nếu không có câu hỏi trong data, tạo placeholder */
    if (questions.length === 0) {
      core.showToast('Quiz này chưa có câu hỏi trong dữ liệu mẫu.');
      window.location.href = 'practice-subject.html?subject=' + quiz.subjectId;
      return;
    }

    /* Đọc progress từ localStorage — nếu không có thì chuyển về intro */
    var progress = core.storageGet('quiz-progress-' + quiz.id);
    if (!progress) {
      window.location.href = 'practice-quiz-intro.html?quiz=' + quiz.id;
      return;
    }

    var defaultDuration = Number(quiz.durationMin) || Math.round(questions.length * 1.5) || 30;

    /* Phòng thủ endTime: nếu endTime null/NaN/không hợp lệ, tự động tính lại */
    if (!progress.endTime || typeof progress.endTime !== 'number' || isNaN(progress.endTime) || progress.endTime <= 0) {
      progress.endTime = Date.now() + defaultDuration * 60 * 1000;
      core.storageSet('quiz-progress-' + quiz.id, progress);
    }

    /* Kiểm tra hết giờ chưa — chỉ tự động submit khi endTime là số hợp lệ VÀ đã quá giờ */
    if (typeof progress.endTime === 'number' && !isNaN(progress.endTime) && progress.endTime > 0 && Date.now() >= progress.endTime) {
      submitQuiz(quiz, questions, progress);
      return;
    }

    document.title = (quiz.title.startsWith('Chương') ? quiz.title : 'Quiz ' + quiz.order + ' – ' + quiz.title) + ' – 9.5 AI CLUB';

    renderQuizUI(quiz, questions, progress);
  }

  /* Render toàn bộ giao diện quiz */
  function renderQuizUI(quiz, questions, progress) {
    var container = document.getElementById('prc-quiz-content');
    var totalQ = questions.length;
    var currentIdx = progress.currentIndex || 0;

    container.innerHTML =
      /* Tiêu đề quiz */
      '<h1 class="prc-subject-header-title" style="margin-bottom:16px">' + (quiz.title.startsWith('Chương') ? quiz.title : 'Quiz ' + quiz.order + ' – ' + quiz.title) + '</h1>' +

      /* Thanh trạng thái: progress bar + timer */
      '<div class="prc-quiz-topbar">' +
        '<div style="flex:1">' +
          '<div class="prc-progress-row">' +
            '<progress id="prc-quiz-progressbar" class="prc-progress prc-progress-bar-lg" value="0" max="' + totalQ + '"></progress>' +
            '<span id="prc-quiz-progress-text" class="prc-quiz-progress-text"></span>' +
          '</div>' +
        '</div>' +
        '<div class="prc-quiz-timer" id="prc-quiz-timer">' +
          '<svg class="prc-quiz-timer-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">' +
            '<circle cx="10" cy="10" r="7" stroke="#3b82f6" stroke-width="1.5"/>' +
            '<path d="M10 6v4l3 2" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>' +
          '</svg>' +
          '<span id="prc-timer-display">--:--</span>' +
        '</div>' +
      '</div>' +

      /* Layout 2 cột: câu hỏi + navigator */
      '<div class="prc-quiz-layout">' +
        /* Cột trái: câu hỏi */
        '<div>' +
          '<div class="prc-card prc-question-card" id="prc-question-card"></div>' +
          /* Nút Previous / Next */
          '<div class="prc-quiz-actions">' +
            '<button type="button" class="prc-btn prc-btn-ghost" id="prc-prev-btn">← Previous</button>' +
            '<button type="button" class="prc-btn prc-btn-primary" id="prc-next-btn">Next</button>' +
          '</div>' +
        '</div>' +

        /* Cột phải: question navigator */
        '<div>' +
          '<div class="prc-card prc-question-nav" id="prc-question-nav"></div>' +
        '</div>' +
      '</div>';

    /* Render câu hỏi đầu tiên */
    renderQuestion(quiz, questions, progress, currentIdx);
    renderNavigator(quiz, questions, progress, currentIdx);
    updateProgressBar(progress, totalQ);
    startTimer(quiz, questions, progress);

    /* Gắn sự kiện Previous / Next */
    document.getElementById('prc-prev-btn').addEventListener('click', function () {
      navigateQuestion(quiz, questions, progress, -1);
    });
    document.getElementById('prc-next-btn').addEventListener('click', function () {
      /* Nếu đang ở câu cuối, Next = Submit */
      if (progress.currentIndex >= questions.length - 1) {
        handleSubmit(quiz, questions, progress);
      } else {
        navigateQuestion(quiz, questions, progress, 1);
      }
    });

    /* Phím tắt: A-H chọn đáp án, ← → di chuyển, 1-8 cũng chọn đáp án */
    document.addEventListener('keydown', function onKeydown(e) {
      /* Không xử lý nếu đang focus vào input */
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      var key = e.key.toUpperCase();

      /* A-H chọn đáp án */
      if (['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'].indexOf(key) !== -1) {
        var idx = key.charCodeAt(0) - 65;
        selectAnswer(quiz, questions, progress, idx);
      }
      /* 1-8 chọn đáp án */
      if (['1', '2', '3', '4', '5', '6', '7', '8'].indexOf(e.key) !== -1) {
        selectAnswer(quiz, questions, progress, parseInt(e.key) - 1);
      }
      /* ← Previous */
      if (e.key === 'ArrowLeft') {
        navigateQuestion(quiz, questions, progress, -1);
      }
      /* → Next */
      if (e.key === 'ArrowRight') {
        if (progress.currentIndex >= questions.length - 1) {
          handleSubmit(quiz, questions, progress);
        } else {
          navigateQuestion(quiz, questions, progress, 1);
        }
      }
    });
  }

  /* ====== TIỆN ÍCH MATHJAX & LATEX ====== */
  function escapeHtml(str) {
    if (str === null || str === undefined) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  function formatTableCell(cell) {
    if (!cell) return '&nbsp;';
    var trimmed = cell.trim();
    if (!trimmed) return '&nbsp;';
    var parts = trimmed.split(/(\\\(.*?\\\)|\\\[[\s\S]*?\\\])/g);
    var res = '';
    for (var i = 0; i < parts.length; i++) {
      var p = parts[i];
      if (p.startsWith('\\(') || p.startsWith('\\[')) {
        res += p;
      } else {
        var esc = escapeHtml(p);
        esc = esc.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
        res += esc;
      }
    }
    return res || '&nbsp;';
  }

  function parseMarkdownTables(str) {
    if (!str || str.indexOf('|') === -1) return str;
    var lines = str.split('\n');
    var result = [];
    var i = 0;

    while (i < lines.length) {
      var line = lines[i];
      var trimmed = line.trim();

      if (trimmed.startsWith('|') && i + 1 < lines.length && /^\|\s*[:?-]+[-\s|:]*\|$/.test(lines[i + 1].trim())) {
        var tableLines = [trimmed];
        var sepLine = lines[i + 1].trim();
        i += 2;

        while (i < lines.length && lines[i].trim().startsWith('|')) {
          tableLines.push(lines[i].trim());
          i++;
        }

        var alignments = sepLine
          .slice(1, -1)
          .split('|')
          .map(function (s) {
            s = s.trim();
            if (s.startsWith(':') && s.endsWith(':')) return 'center';
            if (s.endsWith(':')) return 'right';
            if (s.startsWith(':')) return 'left';
            return 'center';
          });

        var headers = tableLines[0]
          .slice(1, -1)
          .split('|')
          .map(function (c) { return c.trim(); });

        var tableHtml = '<div class="prc-table-wrapper"><table class="prc-quiz-table"><thead><tr>';
        headers.forEach(function (h, colIdx) {
          var align = alignments[colIdx] || 'center';
          tableHtml += '<th style="text-align:' + align + ';">' + formatTableCell(h) + '</th>';
        });
        tableHtml += '</tr></thead><tbody>';

        for (var r = 1; r < tableLines.length; r++) {
          var cells = tableLines[r]
            .slice(1, -1)
            .split('|')
            .map(function (c) { return c.trim(); });
          tableHtml += '<tr>';
          cells.forEach(function (c, colIdx) {
            var align = alignments[colIdx] || 'center';
            tableHtml += '<td style="text-align:' + align + ';">' + formatTableCell(c) + '</td>';
          });
          tableHtml += '</tr>';
        }
        tableHtml += '</tbody></table></div>';
        result.push(tableHtml);
      } else {
        result.push(line);
        i++;
      }
    }

    return result.join('\n');
  }

  /* Định dạng an toàn cho chuỗi có công thức toán và bảng dữ liệu */
  function formatMathText(text, isExplanation) {
    if (!text) return '';
    var str = String(text);

    // 1. Bảo vệ các khối MathJax
    var mathTokens = [];
    var withMathTokens = str.replace(/(\\\[[\s\S]*?\\\]|\\\(.*?\\\))/g, function (match) {
      var token = '___MATH_TOKEN_' + mathTokens.length + '___';
      mathTokens.push(match);
      return token;
    });

    // 2. Chuyển đổi bảng Markdown sang HTML table
    var withTables = parseMarkdownTables(withMathTokens);

    // 3. Xử lý các khối text bên ngoài thẻ table
    var tableBlockRegex = /(<div class="prc-table-wrapper">[\s\S]*?<\/div>)/g;
    var segments = withTables.split(tableBlockRegex);
    var out = '';

    for (var k = 0; k < segments.length; k++) {
      var seg = segments[k];
      if (!seg) continue;
      if (seg.startsWith('<div class="prc-table-wrapper">')) {
        out += seg;
      } else {
        var esc = escapeHtml(seg);
        esc = esc.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
        if (isExplanation) {
          var lines = esc.split('\n');
          var formattedLines = [];
          var inList = false;
          for (var j = 0; j < lines.length; j++) {
            var line = lines[j];
            var trimmed = line.trim();
            if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
              if (!inList) {
                formattedLines.push('<ul class="prc-exp-list">');
                inList = true;
              }
              formattedLines.push('<li>' + trimmed.substring(2) + '</li>');
            } else {
              if (inList) {
                formattedLines.push('</ul>');
                inList = false;
              }
              formattedLines.push(line);
            }
          }
          if (inList) {
            formattedLines.push('</ul>');
          }
          esc = formattedLines.join('<br>').replace(/<\/ul><br>/g, '</ul>').replace(/<br><ul/g, '<ul');
        }
        out += esc;
      }
    }

    // 4. Phục hồi MathJax
    out = out.replace(/___MATH_TOKEN_(\d+)___/g, function (_, idx) {
      return mathTokens[parseInt(idx, 10)];
    });

    return out;
  }

  /* Render MathJax cho một phần tử DOM cụ thể */
  function typesetMath(el) {
    if (!el) return Promise.resolve();
    var text = el.textContent || '';
    if (text.indexOf('\\(') === -1 && text.indexOf('\\[') === -1) {
      return Promise.resolve();
    }
    if (!window.MathJax) {
      return Promise.resolve();
    }
    if (window.MathJax.typesetClear) {
      try {
        window.MathJax.typesetClear([el]);
      } catch (e) {}
    }
    var startup = (window.MathJax.startup && window.MathJax.startup.promise)
      ? window.MathJax.startup.promise
      : Promise.resolve();

    return startup.then(function () {
      if (window.MathJax && window.MathJax.typesetPromise) {
        return window.MathJax.typesetPromise([el]);
      }
    }).catch(function (err) {
      console.warn('MathJax typeset error:', err);
    });
  }

  function getDisplayQuestionText(q) {
    if (!q || !q.text) return '';
    if (q.diagrams && q.diagrams.length) {
      return q.text.replace(/\s*\[Diagram:[\s\S]*$/, '').trim();
    }
    return q.text;
  }

  function renderQuestionDiagrams(q) {
    if (!q || !q.diagrams || !q.diagrams.length) return '';
    return q.diagrams.map(function (d) {
      return '<div class="prc-question-diagram" style="text-align:center;margin:16px 0;overflow-x:auto;"><img src="data:image/svg+xml;charset=utf-8,' + encodeURIComponent(d.svg) + '" alt="' + (d.alt || 'Sơ đồ câu hỏi') + '" style="max-width:100%;max-height:360px;background:#ffffff;border-radius:12px;padding:12px;box-shadow:0 2px 8px rgba(0,0,0,0.06);display:inline-block;" /></div>';
    }).join('');
  }

  window.Lib95.practice.typesetMath = typesetMath;
  window.Lib95.practice.formatMathText = formatMathText;
  window.Lib95.practice.getDisplayQuestionText = getDisplayQuestionText;
  window.Lib95.practice.renderQuestionDiagrams = renderQuestionDiagrams;

  /* Render một câu hỏi */
  function renderQuestion(quiz, questions, progress, index) {
    var q = questions[index];
    var card = document.getElementById('prc-question-card');
    if (!card || !q) return;

    var selectedAnswer = progress.answers[index];

    var html =
      '<p class="prc-question-label">Multiple choice</p>' +
      '<div class="prc-question-text">' + formatMathText(getDisplayQuestionText(q)) + '</div>' +
      renderQuestionDiagrams(q) +
      '<ul class="prc-options-list" role="radiogroup" aria-label="Đáp án">';

    q.options.forEach(function (opt, i) {
      var checked = selectedAnswer === i ? ' checked' : '';
      var id = 'prc-opt-' + index + '-' + i;
      html +=
        '<li class="prc-option">' +
          '<input type="radio" class="prc-option-input" name="prc-answer" id="' + id + '" value="' + i + '"' + checked + ' />' +
          '<label class="prc-option-label" for="' + id + '">' +
            '<span class="prc-option-letter">' + LETTERS[i] + '</span>' +
            '<span class="prc-option-text">' + formatMathText(opt) + '</span>' +
          '</label>' +
        '</li>';
    });

    html += '</ul>';
    card.innerHTML = html;
    typesetMath(card);

    /* Gắn sự kiện chọn đáp án qua click radio */
    var radios = card.querySelectorAll('.prc-option-input');
    radios.forEach(function (radio) {
      radio.addEventListener('change', function () {
        selectAnswer(quiz, questions, progress, parseInt(this.value));
      });
    });
  }

  /* Chọn đáp án */
  function selectAnswer(quiz, questions, progress, answerIndex) {
    var q = questions[progress.currentIndex];
    if (!q || answerIndex >= q.options.length) return;

    progress.answers[progress.currentIndex] = answerIndex;
    /* Lưu ngay vào localStorage để reload không mất */
    core.storageSet('quiz-progress-' + quiz.id, progress);

    /* Cập nhật radio UI */
    var radios = document.querySelectorAll('.prc-option-input');
    radios.forEach(function (r) {
      r.checked = parseInt(r.value) === answerIndex;
    });

    /* Cập nhật navigator */
    renderNavigator(quiz, questions, progress, progress.currentIndex);
    updateProgressBar(progress, questions.length);
  }

  /* Di chuyển giữa các câu hỏi */
  function navigateQuestion(quiz, questions, progress, direction) {
    var newIdx = progress.currentIndex + direction;
    if (newIdx < 0 || newIdx >= questions.length) return;

    progress.currentIndex = newIdx;
    core.storageSet('quiz-progress-' + quiz.id, progress);

    renderQuestion(quiz, questions, progress, newIdx);
    renderNavigator(quiz, questions, progress, newIdx);

    /* Cập nhật nút Next: nếu câu cuối thì đổi thành "Submit" */
    var nextBtn = document.getElementById('prc-next-btn');
    if (nextBtn) {
      if (newIdx >= questions.length - 1) {
        nextBtn.textContent = 'Submit';
        /* Xóa mũi tên sau vì sẽ thêm lại qua CSS ::after */
      } else {
        nextBtn.textContent = 'Next';
      }
    }
  }

  /* Render question navigator */
  function renderNavigator(quiz, questions, progress, currentIdx) {
    var nav = document.getElementById('prc-question-nav');
    if (!nav) return;

    var html = '<p class="prc-question-nav-title">Question navigator</p><div class="prc-question-nav-grid">';

    questions.forEach(function (q, i) {
      var cls = 'prc-question-nav-btn';
      if (progress.answers && progress.answers[i] !== null) cls += ' prc-nav-answered';
      if (i === currentIdx) cls += ' prc-nav-current';

      html += '<button type="button" class="' + cls + '" data-index="' + i + '">' + (i + 1) + '</button>';
    });

    html += '</div>';
    nav.innerHTML = html;

    /* Tự động cuộn ô câu hỏi hiện tại vào tầm nhìn nếu danh sách dài */
    var activeBtn = nav.querySelector('.prc-question-nav-btn.prc-nav-current');
    var navGrid = nav.querySelector('.prc-question-nav-grid');
    if (activeBtn && navGrid && navGrid.scrollHeight > navGrid.clientHeight) {
      if (typeof activeBtn.scrollIntoView === 'function') {
        activeBtn.scrollIntoView({ block: 'nearest', inline: 'nearest' });
      }
    }

    /* Gắn sự kiện click vào các nút navigator */
    nav.querySelectorAll('.prc-question-nav-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var idx = parseInt(btn.getAttribute('data-index'));
        progress.currentIndex = idx;
        core.storageSet('quiz-progress-' + quiz.id, progress);
        renderQuestion(quiz, questions, progress, idx);
        renderNavigator(quiz, questions, progress, idx);

        /* Cập nhật nút Next */
        var nextBtn = document.getElementById('prc-next-btn');
        if (nextBtn) {
          nextBtn.textContent = idx >= questions.length - 1 ? 'Submit' : 'Next';
        }
      });
    });
  }

  /* Cập nhật progress bar */
  function updateProgressBar(progress, total) {
    var answered = progress.answers.filter(function (a) { return a !== null; }).length;
    var bar = document.getElementById('prc-quiz-progressbar');
    var text = document.getElementById('prc-quiz-progress-text');
    if (bar) bar.value = answered;
    if (text) text.textContent = answered + ' / ' + total;
  }

  /* ====== TIMER ====== */
  /* Timer tính từ endTime timestamp, không dùng setInterval đếm */
  /* Nên reload trang không reset thời gian */

  function startTimer(quiz, questions, progress) {
    var display = document.getElementById('prc-timer-display');
    if (!display) return;

    function tick() {
      var remaining = Math.max(0, progress.endTime - Date.now());
      var secs = Math.ceil(remaining / 1000);
      display.textContent = core.formatTime(secs);

      /* Hết giờ — tự động submit */
      if (remaining <= 0) {
        clearInterval(timerInterval);
        core.showToast('Hết giờ! Bài quiz đã được nộp tự động.');
        submitQuiz(quiz, questions, progress);
        return;
      }

      /* Cảnh báo khi còn 60 giây */
      if (secs === 60) {
        display.style.color = '#dc2626';
      }
    }

    tick();
    timerInterval = setInterval(tick, 1000);
  }

  /* ====== SUBMIT ====== */

  /* Resolve khi bấm Submit — kiểm tra câu chưa trả lời */
  function handleSubmit(quiz, questions, progress) {
    var unanswered = progress.answers.filter(function (a) { return a === null; }).length;

    if (unanswered > 0) {
      /* Hiện modal xác nhận — không dùng alert/confirm */
      core.showModal({
        title: 'Nộp bài?',
        message: 'You còn ' + unanswered + ' câu chưa trả lời. You có chắc muốn nộp bài không?',
        confirmText: 'Nộp bài',
        cancelText: 'Quay lại',
        onConfirm: function () {
          submitQuiz(quiz, questions, progress);
        }
      });
    } else {
      submitQuiz(quiz, questions, progress);
    }
  }

  /* Submit quiz: tính điểm, lưu attempt, chuyển sang trang kết quả */
  function submitQuiz(quiz, questions, progress) {
    if (timerInterval) clearInterval(timerInterval);

    /* Tính điểm */
    var correct = 0;
    var incorrect = 0;
    progress.answers.forEach(function (answer, i) {
      if (answer === null) {
        incorrect++;
      } else if (questions[i] && answer === questions[i].correctIndex) {
        correct++;
      } else {
        incorrect++;
      }
    });

    var total = questions.length;
    var score = total > 0 ? Math.round((correct / total) * 100) : 0;

    /* Tính thời gian đã dùng */
    var dur = Number(quiz.durationMin) || Math.round(questions.length * 1.5) || 30;
    var startedAt = progress.startedAt ? new Date(progress.startedAt).getTime() : (progress.endTime ? progress.endTime - dur * 60 * 1000 : Date.now());
    var timeSpentSec = Math.max(0, Math.round((Date.now() - startedAt) / 1000));
    /* Giới hạn không quá thời gian quiz */
    if (!isNaN(dur) && dur > 0) {
      timeSpentSec = Math.min(timeSpentSec, dur * 60);
    }

    /* Tạo attempt */
    var attempt = {
      id: core.generateAttemptId(),
      type: 'quiz',
      refId: quiz.id,
      subjectId: quiz.subjectId,
      score: score,
      correct: correct,
      incorrect: incorrect,
      timeSpentSec: timeSpentSec,
      finishedAt: new Date().toISOString(),
      answers: progress.answers.slice()
    };

    /* Lưu attempt */
    core.saveAttempt(attempt);

    /* Xóa progress — quiz đã hoàn thành */
    core.storageRemove('quiz-progress-' + quiz.id);

    /* Chuyển sang trang kết quả */
    window.location.href = 'practice-result.html?attempt=' + attempt.id;
  }

  /* ====== QUIZ RESULT (practice-result.html) ====== */

  function initQuizResult() {
    var page = document.getElementById('prc-result-page');
    if (!page) return;

    var attemptId = core.getUrlParam('attempt');
    if (!attemptId) { window.location.href = 'practice.html'; return; }

    /* Tìm attempt trong danh sách */
    var attempts = core.getAttempts();
    var attempt = attempts.find(function (a) { return a.id === attemptId; });
    if (!attempt) { window.location.href = 'practice.html'; return; }

    var quiz = core.getQuizById(attempt.refId);
    var subject = core.getSubjectById(attempt.subjectId);
    var questions = core.getQuestionsByQuizId(attempt.refId);
    var userName = core.getUserName();

    document.title = 'Result – Quiz ' + (quiz ? quiz.order : '') + ' – 9.5 AI CLUB';

    renderResultPage(attempt, quiz, subject, questions, userName);
  }

  /* Render trang kết quả */
  function renderResultPage(attempt, quiz, subject, questions, userName) {
    var container = document.getElementById('prc-result-content');

    /* Tính giá trị hiển thị từ attempt (không hardcode) */
    var score = attempt.score;
    var correct = attempt.correct;
    var incorrect = attempt.incorrect;
    var timeSpent = core.formatTime(attempt.timeSpentSec);
    var total = correct + incorrect;

    /* Tạo score ring SVG */
    var ringSize = 140;
    var ringSVG = core.createScoreRingSVG(score, ringSize, 10);

    /* Tin nhắn chúc mừng dựa trên điểm */
    var congrats = 'Great job, ' + userName + '!';
    if (score < 50) congrats = 'Keep trying, ' + userName + '!';
    else if (score < 70) congrats = 'Good effort, ' + userName + '!';
    else if (score >= 90) congrats = 'Excellent, ' + userName + '!';

    /* Link quay về subject hoặc quiz tiếp theo */
    var nextQuizHref = 'practice-subject.html?subject=' + attempt.subjectId;
    if (quiz) {
      /* Tìm quiz tiếp theo cùng subject */
      var allQuizzes = core.getQuizzes(quiz.subjectId);
      var nextQuiz = allQuizzes.find(function (q) { return q.order > quiz.order; });
      if (nextQuiz) {
        nextQuizHref = 'practice-quiz-intro.html?quiz=' + nextQuiz.id;
      }
    }

    container.innerHTML =
      '<div class="prc-result-page">' +
        /* Trophy icon — inline SVG */
        '<div class="prc-trophy-icon" aria-hidden="true">' +
          '<svg width="80" height="80" viewBox="0 0 80 80" fill="none">' +
            '<circle cx="40" cy="40" r="36" fill="#dbeafe"/>' +
            /* Cúp */
            '<path d="M30 28h20v4c0 6-4 11-10 12-6-1-10-6-10-12v-4z" fill="#fbbf24" stroke="#f59e0b" stroke-width="1.5"/>' +
            '<rect x="36" y="44" width="8" height="6" rx="1" fill="#f59e0b"/>' +
            '<rect x="32" y="50" width="16" height="4" rx="2" fill="#f59e0b"/>' +
            /* Tay cúp */
            '<path d="M30 30c-3 0-6 2-6 5s3 5 6 5" stroke="#f59e0b" stroke-width="1.5" fill="none"/>' +
            '<path d="M50 30c3 0 6 2 6 5s-3 5-6 5" stroke="#f59e0b" stroke-width="1.5" fill="none"/>' +
            /* Ngôi sao */
            '<path d="M40 20l1.5 3 3.5.5-2.5 2.5.6 3.5L40 28l-3.1 1.5.6-3.5-2.5-2.5 3.5-.5z" fill="#fbbf24"/>' +
          '</svg>' +
        '</div>' +

        '<h1 class="prc-result-title">' + congrats + '</h1>' +
        '<p class="prc-result-subtitle">You scored ' + correct + ' out of ' + total + '</p>' +

        /* Score ring */
        '<div class="prc-result-ring">' +
          ringSVG +
          '<span class="prc-result-ring-value">' + score + '%</span>' +
        '</div>' +

        /* Stats: Correct, Incorrect, Time spent */
        '<div class="prc-result-stats">' +
          '<div class="prc-result-stat prc-stat-correct">' +
            '<span class="prc-result-stat-label">Correct</span>' +
            '<span class="prc-result-stat-value">' + correct + '</span>' +
          '</div>' +
          '<div class="prc-result-stat prc-stat-incorrect">' +
            '<span class="prc-result-stat-label">Incorrect</span>' +
            '<span class="prc-result-stat-value">' + incorrect + '</span>' +
          '</div>' +
          '<div class="prc-result-stat prc-stat-time">' +
            '<span class="prc-result-stat-label">Time spent</span>' +
            '<span class="prc-result-stat-value">' + timeSpent + '</span>' +
          '</div>' +
        '</div>' +

        /* Buttons */
        '<div class="prc-result-actions">' +
          '<button type="button" class="prc-btn prc-btn-outline" id="prc-review-btn">Review answers</button>' +
          '<a href="' + nextQuizHref + '" class="prc-btn prc-btn-primary" id="prc-continue-btn">Continue</a>' +
        '</div>' +

        /* Review section — ban đầu ẩn, hiện khi bấm Review */
        '<div id="prc-review-section" class="prc-review-section" hidden></div>' +
      '</div>';

    /* Gắn sự kiện Review answers */
    document.getElementById('prc-review-btn').addEventListener('click', function () {
      var section = document.getElementById('prc-review-section');
      if (section.hidden) {
        renderReview(attempt, questions, section);
        section.hidden = false;
        this.textContent = 'Hide answers';
        /* Cuộn xuống review */
        section.scrollIntoView({ behavior: 'smooth' });
      } else {
        section.hidden = true;
        this.textContent = 'Review answers';
      }
    });
  }

  /* Render phần review: hiện từng câu hỏi với đáp án đã chọn + đáp án đúng + giải thích */
  function renderReview(attempt, questions, container) {
    if (questions.length === 0) {
      container.innerHTML = '<p class="prc-empty-state">Không có dữ liệu câu hỏi để review.</p>';
      return;
    }

    var html = '<h2 class="prc-section-title" style="margin-top:24px">Review Answers</h2>';

    questions.forEach(function (q, i) {
      var userAnswer = attempt.answers[i];
      var isCorrect = userAnswer === q.correctIndex;

      html += '<div class="prc-review-question">';
      html += '<p class="prc-review-q-num">Question ' + (i + 1) + '</p>';
      html += '<div class="prc-review-q-text">' + formatMathText(getDisplayQuestionText(q)) + '</div>';
      html += renderQuestionDiagrams(q);

      html += '<ul class="prc-options-list" style="pointer-events:none">';
      q.options.forEach(function (opt, j) {
        var optClass = 'prc-option';
        if (j === q.correctIndex) optClass += ' prc-option-correct';
        else if (j === userAnswer && !isCorrect) optClass += ' prc-option-wrong';

        html +=
          '<li class="' + optClass + '">' +
            '<label class="prc-option-label">' +
              '<span class="prc-option-letter">' + LETTERS[j] + '</span>' +
              '<span class="prc-option-text">' + formatMathText(opt) + '</span>' +
            '</label>' +
          '</li>';
      });
      html += '</ul>';

      /* Giải thích */
      if (q.explanation) {
        html += '<div class="prc-review-explanation"><strong>Giải thích:</strong><div style="margin-top:6px;">' + formatMathText(q.explanation, true) + '</div></div>';
      }

      html += '</div>';
    });

    container.innerHTML = html;

    /* Typeset theo lô nhỏ 5 câu để không làm khựng UI */
    var reviewQuestions = container.querySelectorAll('.prc-review-question');
    if (reviewQuestions.length > 0) {
      var batchSize = 5;
      var qIdx = 0;
      function typesetNextBatch() {
        var end = Math.min(qIdx + batchSize, reviewQuestions.length);
        for (var k = qIdx; k < end; k++) {
          typesetMath(reviewQuestions[k]);
        }
        qIdx = end;
        if (qIdx < reviewQuestions.length) {
          requestAnimationFrame(typesetNextBatch);
        }
      }
      typesetNextBatch();
    } else {
      typesetMath(container);
    }
  }

  /* ====== KHỞI TẠO ====== */
  document.addEventListener('DOMContentLoaded', function () {
    initQuizIntro();
    initQuizRun();
    initQuizResult();
  });

  window.Lib95.practice.quiz = {
    initQuizIntro: initQuizIntro,
    initQuizRun: initQuizRun,
    initQuizResult: initQuizResult
  };

})();
