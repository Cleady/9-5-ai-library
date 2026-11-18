/**
 * =====================================================================
 * practice-mock-exam.js — Phân hệ Thi thử (Mock Exam) cho từng môn học
 * =====================================================================
 * 9.5 AI CLUB / Open Era Practice
 * - Sinh đề thi ngẫu nhiên (tối đa 60 câu, 60 phút) gom từ tất cả chương
 * - Đề thi được sinh 1 lần và cố định trong suốt bài thi (reload không đổi đề)
 * - Quản lý tiến trình trong localStorage: mock-progress-<subjectId>
 * - Tự động nộp khi hết giờ, cảnh báo câu trống khi nộp bài
 * - Chấm điểm tự động thang 100 và thang 10, lưu attempt chuẩn vào localStorage
 * - Tương thích giao diện Dark Mode và MathJax LaTeX
 * =====================================================================
 */
;(function () {
  'use strict';

  window.Lib95 = window.Lib95 || {};
  window.Lib95.practice = window.Lib95.practice || {};

  var core = window.Lib95.practice.core;
  var LETTERS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  var EXAM_DURATION_MIN = 60;
  var EXAM_MAX_QUESTIONS = 60;

  /* ====== THUẬT TOÁN SHUFFLE (FISHER-YATES) ====== */
  function shuffleArray(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = a[i];
      a[i] = a[j];
      a[j] = temp;
    }
    return a;
  }

  /* ====== SINH ĐỀ THI THỬ ====== */
  function generateExam(subjectId) {
    if (!core) return null;
    var allQuestions = core.getQuestionsBySubjectId(subjectId);
    if (!allQuestions || allQuestions.length === 0) {
      return null;
    }

    var shuffled = shuffleArray(allQuestions);
    var count = Math.min(EXAM_MAX_QUESTIONS, shuffled.length);
    var selected = shuffled.slice(0, count);
    var questionIds = selected.map(function (q) { return q.id; });

    var progress = {
      subjectId: Number(subjectId),
      questionIds: questionIds,
      answers: new Array(questionIds.length).fill(null),
      currentIndex: 0,
      startedAt: new Date().toISOString(),
      endTime: Date.now() + EXAM_DURATION_MIN * 60 * 1000
    };

    core.storageSet('mock-progress-' + subjectId, progress);
    return progress;
  }

  /* ====== RENDER PANEL MOCK EXAM TRÊN TRANG SUBJECT ====== */
  function renderPanel(subject) {
    var container = document.getElementById('prc-mock-exam-panel');
    if (!container || !subject) return;

    var allQuestions = core.getQuestionsBySubjectId(subject.id);
    var totalAvailable = allQuestions.length;
    var actualQuestionCount = Math.min(EXAM_MAX_QUESTIONS, totalAvailable);

    var savedProgress = core.storageGet('mock-progress-' + subject.id);
    var hasInProgress = savedProgress && Array.isArray(savedProgress.questionIds) &&
      savedProgress.questionIds.length > 0 &&
      typeof savedProgress.endTime === 'number' &&
      Date.now() < savedProgress.endTime;

    var attempts = core.getMockAttempts(subject.id);
    var attemptsCount = attempts.length;
    var bestScore = core.getMockBestScore(subject.id);
    var avgScore = attemptsCount > 0 ? Math.round(attempts.reduce(function (sum, a) { return sum + a.score; }, 0) / attemptsCount) : 0;

    var html = '';

    /* 1. Thẻ quy chế thi thử */
    html +=
      '<article class="prc-card prc-section" style="margin-bottom:24px;">' +
        '<div class="prc-quiz-intro" style="padding:28px 20px;">' +
          '<div class="prc-quiz-intro-illustration" aria-hidden="true">' +
            '<svg width="90" height="90" viewBox="0 0 90 90" fill="none">' +
              '<circle cx="45" cy="45" r="42" fill="#dbeafe"/>' +
              '<circle cx="45" cy="45" r="30" fill="#bfdbfe"/>' +
              '<path d="M30 45h30M45 30v30" stroke="#3b82f6" stroke-width="3" stroke-linecap="round"/>' +
              '<rect x="28" y="24" width="34" height="42" rx="4" fill="white" stroke="#3b82f6" stroke-width="2"/>' +
              '<path d="M36 34h18M36 42h18M36 50h12" stroke="#3b82f6" stroke-width="1.8" stroke-linecap="round"/>' +
            '</svg>' +
          '</div>' +
          '<h2 class="prc-quiz-intro-title" style="font-size:22px;">Thi thử năng lực – ' + subject.name + '</h2>' +
          '<p class="prc-quiz-intro-desc" style="max-width:540px;">' +
            'Đề thi thử bao gồm ' + actualQuestionCount + ' câu hỏi trắc nghiệm được trích xuất ngẫu nhiên từ toàn bộ các chương của môn học ' + subject.title + '. ' +
            'Đồng hồ đếm ngược 60 phút, hệ thống tự động chấm điểm và ghi nhận vào lịch sử học tập của bạn.' +
          '</p>' +

          '<div class="prc-quiz-meta-row" style="margin-bottom:24px;">' +
            '<div class="prc-quiz-meta-item">' +
              '<span class="prc-quiz-meta-icon" aria-hidden="true">' +
                '<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="3" y="3" width="14" height="14" rx="3" stroke="#3b82f6" stroke-width="1.5"/><path d="M7 7h6M7 10h6M7 13h4" stroke="#3b82f6" stroke-width="1.2" stroke-linecap="round"/></svg>' +
              '</span>' +
              '<span><span class="prc-quiz-meta-value">' + actualQuestionCount + '</span> câu hỏi</span>' +
            '</div>' +
            '<div class="prc-quiz-meta-item">' +
              '<span class="prc-quiz-meta-icon" aria-hidden="true">' +
                '<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="7" stroke="#3b82f6" stroke-width="1.5"/><path d="M10 6v4l3 2" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
              '</span>' +
              '<span><span class="prc-quiz-meta-value">' + EXAM_DURATION_MIN + '</span> phút</span>' +
            '</div>' +
            '<div class="prc-quiz-meta-item">' +
              '<span class="prc-quiz-meta-icon" aria-hidden="true">' +
                '<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><polygon points="10 2 12.5 7.5 18 8.3 14 12.2 15 17.7 10 15 5 17.7 6 12.2 2 8.3 7.5 7.5 10 2" stroke="#3b82f6" stroke-width="1.4" stroke-linejoin="round"/></svg>' +
              '</span>' +
              '<span><span class="prc-quiz-meta-value">Tổng hợp</span></span>' +
            '</div>' +
          '</div>' +

          '<div class="prc-quiz-intro-actions" style="display:flex;gap:12px;flex-wrap:wrap;justify-content:center;">';

    if (totalAvailable === 0) {
      html +=
        '<button type="button" class="prc-btn prc-btn-primary" disabled style="opacity:0.6;cursor:not-allowed;">Bắt đầu thi thử</button>' +
        '<p style="width:100%;font-size:13px;color:#dc2626;margin-top:8px;">Môn học này hiện chưa có câu hỏi trong ngân hàng đề thi.</p>';
    } else if (hasInProgress) {
      html +=
        '<a href="practice-mock-exam.html?subject=' + subject.id + '" class="prc-btn prc-btn-primary" id="prc-btn-continue-mock">Tiếp tục thi</a>' +
        '<button type="button" class="prc-btn prc-btn-outline" id="prc-btn-restart-mock">Hủy bài cũ & Thi mới</button>';
    } else {
      html +=
        '<button type="button" class="prc-btn prc-btn-primary" id="prc-btn-start-mock">Bắt đầu thi thử</button>';
    }

    html +=
          '</div>' +
        '</div>' +
      '</article>';

    /* 2. Thống kê kết quả thi thử */
    html +=
      '<div class="prc-section" style="margin-bottom:24px;">' +
        '<h3 class="prc-section-title">Thống kê thi thử môn ' + subject.name + '</h3>' +
        '<div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(200px, 1fr));gap:16px;">' +
          '<div class="prc-card" style="text-align:center;padding:16px;">' +
            '<p style="margin:0 0 6px;font-size:13px;color:var(--color-text-muted);">Số lần đã thi</p>' +
            '<p style="margin:0;font-size:24px;font-weight:700;color:var(--color-primary);">' + attemptsCount + '</p>' +
          '</div>' +
          '<div class="prc-card" style="text-align:center;padding:16px;">' +
            '<p style="margin:0 0 6px;font-size:13px;color:var(--color-text-muted);">Điểm cao nhất</p>' +
            '<p style="margin:0;font-size:24px;font-weight:700;color:var(--color-text);">' +
              (bestScore !== null ? bestScore + '% <span style="font-size:14px;color:var(--color-text-muted);">(' + (bestScore / 10).toFixed(1) + '/10)</span>' : '—') +
            '</p>' +
          '</div>' +
          '<div class="prc-card" style="text-align:center;padding:16px;">' +
            '<p style="margin:0 0 6px;font-size:13px;color:var(--color-text-muted);">Điểm trung bình</p>' +
            '<p style="margin:0;font-size:24px;font-weight:700;color:var(--color-text);">' +
              (attemptsCount > 0 ? avgScore + '% <span style="font-size:14px;color:var(--color-text-muted);">(' + (avgScore / 10).toFixed(1) + '/10)</span>' : '—') +
            '</p>' +
          '</div>' +
        '</div>' +
      '</div>';

    /* 3. Lịch sử các lần thi thử */
    html +=
      '<div class="prc-section">' +
        '<h3 class="prc-section-title">Lịch sử thi thử môn này</h3>';

    if (attemptsCount === 0) {
      html +=
        '<div class="prc-card" style="text-align:center;padding:36px 20px;">' +
          '<p class="prc-empty-state" style="padding:0;margin:0 0 8px;">Chưa có lần thi thử nào.</p>' +
          '<p style="margin:0;font-size:13px;color:var(--color-text-muted);">Hãy nhấn "Bắt đầu thi thử" ở trên để làm bài kiểm tra đánh giá năng lực đầu tiên của bạn!</p>' +
        '</div>';
    } else {
      html += '<div style="display:flex;flex-direction:column;gap:12px;">';
      attempts.forEach(function (att, idx) {
        var scoreClass = core.getScoreClass(att.score);
        var score10 = (att.score / 10).toFixed(1);
        var dateFormatted = core.formatDate(att.finishedAt);
        var timeSpent = core.formatTime(att.timeSpentSec || 0);
        var num = attemptsCount - idx;

        html +=
          '<div class="prc-card" style="display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap;padding:16px 20px;">' +
            '<div style="display:flex;align-items:center;gap:16px;">' +
              '<div class="prc-quiz-row-icon" style="width:40px;height:40px;border-radius:10px;background:#fef3c7;display:flex;align-items:center;justify-content:center;color:#b45309;font-size:18px;" aria-hidden="true">📝</div>' +
              '<div>' +
                '<h4 style="margin:0 0 4px;font-size:15px;font-weight:600;color:var(--color-text);">' + (att.examTitle || 'Thi thử') + ' #' + num + '</h4>' +
                '<p style="margin:0;font-size:13px;color:var(--color-text-muted);">' +
                  dateFormatted + ' · ' + att.correct + '/' + (att.totalQuestions || (att.correct + att.incorrect)) + ' câu đúng · Làm trong ' + timeSpent +
                '</p>' +
              '</div>' +
            '</div>' +
            '<div style="display:flex;align-items:center;gap:16px;">' +
              '<div style="text-align:right;">' +
                '<span class="prc-status-pill ' + (att.score >= 80 ? 'prc-status-completed' : (att.score >= 50 ? 'prc-status-inprogress' : 'prc-status-notstarted')) + '" style="font-weight:700;font-size:14px;padding:6px 14px;">' +
                  att.score + '% (' + score10 + 'đ)' +
                '</span>' +
              '</div>' +
              '<a href="practice-result.html?attempt=' + att.id + '" class="prc-btn prc-btn-outline" style="padding:6px 14px;font-size:13px;">' +
                'Xem lại' +
              '</a>' +
            '</div>' +
          '</div>';
      });
      html += '</div>';
    }

    html += '</div>';

    container.innerHTML = html;

    /* Gắn sự kiện nút bấm */
    var startBtn = document.getElementById('prc-btn-start-mock');
    if (startBtn) {
      startBtn.addEventListener('click', function () {
        var p = generateExam(subject.id);
        if (p) {
          window.location.href = 'practice-mock-exam.html?subject=' + subject.id;
        } else {
          core.showToast('Không thể tạo đề thi thử: Môn học chưa có câu hỏi.');
        }
      });
    }

    var restartBtn = document.getElementById('prc-btn-restart-mock');
    if (restartBtn) {
      restartBtn.addEventListener('click', function () {
        core.showModal({
          title: 'Hủy bài thi đang làm dở?',
          message: 'Bạn có bài thi thử đang làm dở cho môn này. Bạn có chắc chắn muốn hủy bài thi đó và bắt đầu một đề thi mới hoàn toàn không?',
          confirmText: 'Bắt đầu đề mới',
          cancelText: 'Quay lại',
          onConfirm: function () {
            core.storageRemove('mock-progress-' + subject.id);
            var p = generateExam(subject.id);
            if (p) {
              window.location.href = 'practice-mock-exam.html?subject=' + subject.id;
            } else {
              core.showToast('Không thể tạo đề thi mới.');
            }
          }
        });
      });
    }
  }

  /* ====== MÀN HÌNH LÀM BÀI THI THỬ (practice-mock-exam.html) ====== */
  var timerInterval = null;
  var isSubmitting = false;

  function initMockExamRun() {
    var page = document.getElementById('prc-mock-exam-page');
    if (!page) return;

    var subjectId = core.getUrlParam('subject');
    if (!subjectId) {
      window.location.href = 'practice.html';
      return;
    }

    var subject = core.getSubjectById(subjectId);
    if (!subject) {
      window.location.href = 'practice.html';
      return;
    }

    /* Đọc tiến trình từ localStorage */
    var progress = core.storageGet('mock-progress-' + subject.id);
    if (!progress || !Array.isArray(progress.questionIds) || progress.questionIds.length === 0) {
      /* Nếu chưa có đề, sinh đề mới */
      progress = generateExam(subject.id);
      if (!progress) {
        core.showToast('Môn học này chưa có câu hỏi để thi thử.');
        window.location.href = 'practice-subject.html?subject=' + subject.id + '#mock-exam';
        return;
      }
    }

    /* Nạp danh sách câu hỏi theo đúng danh sách ID đã lưu cố định */
    var allQuestions = window.Lib95.practice.data.questions || [];
    var qMap = {};
    for (var i = 0; i < allQuestions.length; i++) {
      if (allQuestions[i] && allQuestions[i].id) {
        qMap[allQuestions[i].id] = allQuestions[i];
      }
    }

    var questions = progress.questionIds.map(function (id) {
      return qMap[id];
    }).filter(Boolean);

    if (questions.length === 0) {
      core.showToast('Không tìm thấy dữ liệu câu hỏi cho đề thi thử này.');
      window.location.href = 'practice-subject.html?subject=' + subject.id + '#mock-exam';
      return;
    }

    /* Đảm bảo mảng answers có đủ độ dài */
    if (!Array.isArray(progress.answers) || progress.answers.length !== questions.length) {
      progress.answers = new Array(questions.length).fill(null);
      core.storageSet('mock-progress-' + subject.id, progress);
    }

    /* Đảm bảo endTime hợp lệ */
    if (!progress.endTime || typeof progress.endTime !== 'number' || isNaN(progress.endTime) || progress.endTime <= 0) {
      progress.endTime = Date.now() + EXAM_DURATION_MIN * 60 * 1000;
      core.storageSet('mock-progress-' + subject.id, progress);
    }

    /* Kiểm tra hết giờ */
    if (Date.now() >= progress.endTime) {
      core.showToast('Thời gian làm bài thi đã hết.');
      submitMockExam(subject, questions, progress);
      return;
    }

    document.title = 'Thi thử: ' + subject.name + ' – 9.5 AI CLUB';

    renderMockExamUI(subject, questions, progress);
  }

  /* Render giao diện thi thử */
  function renderMockExamUI(subject, questions, progress) {
    var container = document.getElementById('prc-mock-exam-content');
    if (!container) return;

    var totalQ = questions.length;
    var currentIdx = progress.currentIndex || 0;

    container.innerHTML =
      '<div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;margin-bottom:16px;">' +
        '<div>' +
          '<h1 class="prc-subject-header-title" style="margin:0 0 4px;font-size:22px;">Thi thử – ' + subject.name + ' (' + subject.title + ')</h1>' +
          '<p style="margin:0;font-size:13px;color:var(--color-text-muted);">Đề thi ngẫu nhiên ' + totalQ + ' câu · Thời gian: ' + EXAM_DURATION_MIN + ' phút</p>' +
        '</div>' +
        '<button type="button" class="prc-btn prc-btn-outline" id="prc-early-submit-btn" style="border-color:#dc2626;color:#dc2626;padding:8px 18px;">Nộp bài sớm</button>' +
      '</div>' +

      /* Thanh trạng thái: progress bar + timer */
      '<div class="prc-quiz-topbar">' +
        '<div style="flex:1">' +
          '<div class="prc-progress-row">' +
            '<progress id="prc-mock-progressbar" class="prc-progress prc-progress-bar-lg" value="0" max="' + totalQ + '"></progress>' +
            '<span id="prc-mock-progress-text" class="prc-quiz-progress-text"></span>' +
          '</div>' +
        '</div>' +
        '<div class="prc-quiz-timer" id="prc-mock-timer">' +
          '<svg class="prc-quiz-timer-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">' +
            '<circle cx="10" cy="10" r="7" stroke="#3b82f6" stroke-width="1.5"/>' +
            '<path d="M10 6v4l3 2" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>' +
          '</svg>' +
          '<span id="prc-mock-timer-display">--:--</span>' +
        '</div>' +
      '</div>' +

      /* Layout 2 cột: câu hỏi + navigator */
      '<div class="prc-quiz-layout">' +
        /* Cột trái: câu hỏi */
        '<div>' +
          '<div class="prc-card prc-question-card" id="prc-mock-question-card"></div>' +
          '<div class="prc-quiz-actions">' +
            '<button type="button" class="prc-btn prc-btn-ghost" id="prc-mock-prev-btn">← Câu trước</button>' +
            '<button type="button" class="prc-btn prc-btn-primary" id="prc-mock-next-btn">Câu tiếp theo</button>' +
          '</div>' +
        '</div>' +

        /* Cột phải: question navigator */
        '<div>' +
          '<div class="prc-card prc-question-nav" id="prc-mock-question-nav"></div>' +
        '</div>' +
      '</div>';

    /* Render câu hỏi đầu tiên */
    renderQuestion(subject, questions, progress, currentIdx);
    renderNavigator(subject, questions, progress, currentIdx);
    updateProgressBar(progress, totalQ);
    startTimer(subject, questions, progress);

    /* Gắn sự kiện nút Previous / Next / Nộp bài sớm */
    document.getElementById('prc-mock-prev-btn').addEventListener('click', function () {
      navigateQuestion(subject, questions, progress, -1);
    });

    document.getElementById('prc-mock-next-btn').addEventListener('click', function () {
      if (progress.currentIndex >= questions.length - 1) {
        handleExamSubmit(subject, questions, progress);
      } else {
        navigateQuestion(subject, questions, progress, 1);
      }
    });

    document.getElementById('prc-early-submit-btn').addEventListener('click', function () {
      handleExamSubmit(subject, questions, progress);
    });

    /* Lắng nghe phím tắt */
    document.addEventListener('keydown', function onKeydown(e) {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      var key = e.key.toUpperCase();
      if (['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'].indexOf(key) !== -1) {
        var idx = key.charCodeAt(0) - 65;
        selectAnswer(subject, questions, progress, idx);
      } else if (['1', '2', '3', '4', '5', '6', '7', '8'].indexOf(e.key) !== -1) {
        selectAnswer(subject, questions, progress, parseInt(e.key, 10) - 1);
      } else if (e.key === 'ArrowLeft') {
        navigateQuestion(subject, questions, progress, -1);
      } else if (e.key === 'ArrowRight') {
        if (progress.currentIndex >= questions.length - 1) {
          handleExamSubmit(subject, questions, progress);
        } else {
          navigateQuestion(subject, questions, progress, 1);
        }
      }
    });
  }

  /* Render 1 câu hỏi */
  function renderQuestion(subject, questions, progress, index) {
    var q = questions[index];
    var card = document.getElementById('prc-mock-question-card');
    if (!card || !q) return;

    var selectedAnswer = progress.answers[index];
    var isMulti = window.Lib95.practice.isMultiQuestion ? window.Lib95.practice.isMultiQuestion(q) : false;

    var formatMath = window.Lib95.practice.formatMathText || function (t) { return t; };
    var getDisplayText = window.Lib95.practice.getDisplayQuestionText || function (q) { return q.text || ''; };
    var renderDiagrams = window.Lib95.practice.renderQuestionDiagrams || function () { return ''; };
    var typeset = window.Lib95.practice.typesetMath || function () {};

    var labelHtml = isMulti
      ? '<p class="prc-question-label prc-label-multi"><span class="prc-badge-multi">Multiple select</span> (Chọn nhiều đáp án)</p>'
      : '<p class="prc-question-label">Câu hỏi ' + (index + 1) + ' / ' + questions.length + '</p>';

    var html =
      labelHtml +
      (window.Lib95.practice.renderQuestionBody ? window.Lib95.practice.renderQuestionBody(q, formatMath) : ('<div class="prc-question-text">' + formatMath(getDisplayText(q)) + '</div>' + renderDiagrams(q))) +
      '<ul class="prc-options-list' + (isMulti ? ' prc-options-list-multi' : '') + '" role="' + (isMulti ? 'group' : 'radiogroup') + '" aria-label="Đáp án">';

    var inputType = isMulti ? 'checkbox' : 'radio';

    (q.options || []).forEach(function (opt, i) {
      var isChecked = false;
      if (isMulti) {
        isChecked = Array.isArray(selectedAnswer) && selectedAnswer.indexOf(i) !== -1;
      } else {
        isChecked = selectedAnswer === i;
      }
      var checked = isChecked ? ' checked' : '';
      var id = 'prc-mock-opt-' + index + '-' + i;
      var optionClass = 'prc-option' + (isMulti ? ' prc-option-multi' : '');

      html +=
        '<li class="' + optionClass + '">' +
          '<input type="' + inputType + '" class="prc-option-input' + (isMulti ? ' prc-option-checkbox' : '') + '" name="prc-mock-answer" id="' + id + '" value="' + i + '"' + checked + ' />' +
          '<label class="prc-option-label" for="' + id + '">' +
            '<span class="prc-option-letter">' + LETTERS[i] + '</span>' +
            '<span class="prc-option-text">' + formatMath(opt) + '</span>' +
          '</label>' +
        '</li>';
    });

    html += '</ul>';
    card.innerHTML = html;
    typeset(card);

    /* Bắt sự kiện chọn đáp án */
    var inputs = card.querySelectorAll('.prc-option-input');
    inputs.forEach(function (inp) {
      inp.addEventListener('change', function () {
        selectAnswer(subject, questions, progress, parseInt(this.value, 10));
      });
    });
  }

  /* Chọn đáp án */
  function selectAnswer(subject, questions, progress, answerIndex) {
    var q = questions[progress.currentIndex];
    if (!q || answerIndex >= (q.options || []).length) return;

    var isMulti = window.Lib95.practice.isMultiQuestion ? window.Lib95.practice.isMultiQuestion(q) : false;

    if (isMulti) {
      var current = Array.isArray(progress.answers[progress.currentIndex])
        ? progress.answers[progress.currentIndex].slice()
        : [];
      var pos = current.indexOf(answerIndex);
      if (pos !== -1) {
        current.splice(pos, 1);
      } else {
        current.push(answerIndex);
        current.sort(function (a, b) { return a - b; });
      }
      progress.answers[progress.currentIndex] = current.length > 0 ? current : null;
    } else {
      progress.answers[progress.currentIndex] = answerIndex;
    }

    core.storageSet('mock-progress-' + subject.id, progress);

    /* Cập nhật inputs */
    var card = document.getElementById('prc-mock-question-card');
    if (card) {
      var inputs = card.querySelectorAll('.prc-option-input');
      var val = progress.answers[progress.currentIndex];
      inputs.forEach(function (inp) {
        var v = parseInt(inp.value, 10);
        if (isMulti) {
          inp.checked = Array.isArray(val) && val.indexOf(v) !== -1;
        } else {
          inp.checked = v === val;
        }
      });
    }

    renderNavigator(subject, questions, progress, progress.currentIndex);
    updateProgressBar(progress, questions.length);
  }

  /* Di chuyển giữa các câu */
  function navigateQuestion(subject, questions, progress, direction) {
    var newIdx = progress.currentIndex + direction;
    if (newIdx < 0 || newIdx >= questions.length) return;

    progress.currentIndex = newIdx;
    core.storageSet('mock-progress-' + subject.id, progress);

    renderQuestion(subject, questions, progress, newIdx);
    renderNavigator(subject, questions, progress, newIdx);

    var nextBtn = document.getElementById('prc-mock-next-btn');
    if (nextBtn) {
      nextBtn.textContent = newIdx >= questions.length - 1 ? 'Nộp bài thi' : 'Câu tiếp theo';
    }
  }

  /* Render Question Navigator */
  function renderNavigator(subject, questions, progress, currentIdx) {
    var nav = document.getElementById('prc-mock-question-nav');
    if (!nav) return;

    var isAnsweredFn = window.Lib95.practice.isQuestionAnswered || function (a) {
      return a !== null && a !== undefined && (!Array.isArray(a) || a.length > 0);
    };

    var html = '<p class="prc-question-nav-title">Danh sách câu hỏi (' + questions.length + ')</p><div class="prc-question-nav-grid" style="max-height:360px;overflow-y:auto;">';

    questions.forEach(function (q, i) {
      var cls = 'prc-question-nav-btn';
      if (progress.answers && isAnsweredFn(progress.answers[i])) cls += ' prc-nav-answered';
      if (i === currentIdx) cls += ' prc-nav-current';

      html += '<button type="button" class="' + cls + '" data-index="' + i + '">' + (i + 1) + '</button>';
    });

    html += '</div>';
    nav.innerHTML = html;

    var activeBtn = nav.querySelector('.prc-question-nav-btn.prc-nav-current');
    if (activeBtn && typeof activeBtn.scrollIntoView === 'function') {
      activeBtn.scrollIntoView({ block: 'nearest', inline: 'nearest' });
    }

    nav.querySelectorAll('.prc-question-nav-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var idx = parseInt(btn.getAttribute('data-index'), 10);
        progress.currentIndex = idx;
        core.storageSet('mock-progress-' + subject.id, progress);
        renderQuestion(subject, questions, progress, idx);
        renderNavigator(subject, questions, progress, idx);

        var nextBtn = document.getElementById('prc-mock-next-btn');
        if (nextBtn) {
          nextBtn.textContent = idx >= questions.length - 1 ? 'Nộp bài thi' : 'Câu tiếp theo';
        }
      });
    });
  }

  /* Cập nhật Progress bar */
  function updateProgressBar(progress, total) {
    var isAnsweredFn = window.Lib95.practice.isQuestionAnswered || function (a) {
      return a !== null && a !== undefined && (!Array.isArray(a) || a.length > 0);
    };
    var answered = (progress.answers || []).filter(isAnsweredFn).length;
    var bar = document.getElementById('prc-mock-progressbar');
    var text = document.getElementById('prc-mock-progress-text');
    if (bar) bar.value = answered;
    if (text) text.textContent = answered + ' / ' + total + ' câu đã làm';
  }

  /* Đồng hồ đếm ngược */
  function startTimer(subject, questions, progress) {
    var display = document.getElementById('prc-mock-timer-display');
    if (!display) return;

    if (timerInterval) clearInterval(timerInterval);

    function tick() {
      var remaining = Math.max(0, progress.endTime - Date.now());
      var secs = Math.ceil(remaining / 1000);
      display.textContent = core.formatTime(secs);

      if (remaining <= 0) {
        clearInterval(timerInterval);
        core.showToast('Hết giờ làm bài! Bài thi thử đang được nộp tự động.');
        submitMockExam(subject, questions, progress);
        return;
      }

      if (secs <= 60) {
        display.style.color = '#dc2626';
        display.style.fontWeight = 'bold';
      }
    }

    tick();
    timerInterval = setInterval(tick, 1000);
  }

  /* Xử lý khi nhấn Nộp bài */
  function handleExamSubmit(subject, questions, progress) {
    if (isSubmitting) return;

    var isAnsweredFn = window.Lib95.practice.isQuestionAnswered || function (a) {
      return a !== null && a !== undefined && (!Array.isArray(a) || a.length > 0);
    };

    var unanswered = 0;
    for (var i = 0; i < questions.length; i++) {
      if (!isAnsweredFn(progress.answers[i])) unanswered++;
    }

    if (unanswered > 0) {
      core.showModal({
        title: 'Nộp bài thi thử?',
        message: 'Bạn còn ' + unanswered + ' câu chưa trả lời. Bạn có chắc chắn muốn nộp bài thi ngay bây giờ không?',
        confirmText: 'Nộp bài ngay',
        cancelText: 'Tiếp tục làm bài',
        onConfirm: function () {
          submitMockExam(subject, questions, progress);
        }
      });
    } else {
      core.showModal({
        title: 'Xác nhận nộp bài thi',
        message: 'Bạn đã hoàn thành tất cả ' + questions.length + ' câu hỏi. Xác nhận nộp bài và xem kết quả?',
        confirmText: 'Nộp bài',
        cancelText: 'Xem lại bài làm',
        onConfirm: function () {
          submitMockExam(subject, questions, progress);
        }
      });
    }
  }

  /* Chấm điểm và nộp bài */
  function submitMockExam(subject, questions, progress) {
    if (isSubmitting) return;
    isSubmitting = true;

    if (timerInterval) clearInterval(timerInterval);

    var isAnswerCorrectFn = window.Lib95.practice.isAnswerCorrect || function (q, a) {
      return q && a === q.correctIndex;
    };
    var isAnsweredFn = window.Lib95.practice.isQuestionAnswered || function (a) {
      return a !== null && a !== undefined && (!Array.isArray(a) || a.length > 0);
    };

    var correct = 0;
    var incorrect = 0;

    questions.forEach(function (q, i) {
      var ans = progress.answers[i];
      if (!isAnsweredFn(ans)) {
        incorrect++;
      } else if (isAnswerCorrectFn(q, ans)) {
        correct++;
      } else {
        incorrect++;
      }
    });

    var total = questions.length;
    var score = total > 0 ? Math.round((correct / total) * 100) : 0;

    var startedAt = progress.startedAt ? new Date(progress.startedAt).getTime() : (progress.endTime - EXAM_DURATION_MIN * 60 * 1000);
    var timeSpentSec = Math.max(1, Math.round((Date.now() - startedAt) / 1000));
    timeSpentSec = Math.min(timeSpentSec, EXAM_DURATION_MIN * 60);

    /* Tạo attempt theo đúng schema yêu cầu */
    var attempt = {
      id: core.generateAttemptId(),
      type: 'mock_exam',
      refId: null,
      subjectId: Number(subject.id),
      examTitle: 'Thi thử – ' + subject.name,
      questionIds: progress.questionIds.slice(),
      answers: progress.answers.slice(),
      totalQuestions: total,
      correct: correct,
      incorrect: incorrect,
      score: score,
      timeSpentSec: timeSpentSec,
      finishedAt: new Date().toISOString()
    };

    /* Lưu attempt */
    core.saveAttempt(attempt);

    /* Xóa progress để hoàn tất bài thi */
    core.storageRemove('mock-progress-' + subject.id);

    /* Chuyển hướng sang trang kết quả */
    window.location.href = 'practice-result.html?attempt=' + attempt.id;
  }

  /* ====== KHỞI TẠO TỰ ĐỘNG ====== */
  document.addEventListener('DOMContentLoaded', function () {
    initMockExamRun();
  });

  /* Gán vào namespace */
  window.Lib95.practice.mockExam = {
    generateExam: generateExam,
    renderPanel: renderPanel,
    initMockExamRun: initMockExamRun
  };

})();
