/**
 * =====================================================================
 * practice-list.js — Resolve cho trang Practice Home + Subject Practice
 * =====================================================================
 * Trang practice.html: lọc theo tab, hiện "Continue practicing",
 *   hiện danh sách subjects dạng thẻ.
 * Trang practice-subject.html: hiện chi tiết 1 subject, tabs
 *   Quizzes/Exercises/Flashcards, danh sách quiz/exercise với trạng thái.
 *
 * Dữ liệu lấy từ: practice-core.js (namespace Lib95.practice.core)
 * =====================================================================
 */
;(function () {
  'use strict';

  window.Lib95 = window.Lib95 || {};
  window.Lib95.practice = window.Lib95.practice || {};

  var core = window.Lib95.practice.core;

  /* ====== PRACTICE HOME (practice.html) ====== */

  /* Khởi tạo trang Practice Home */
  function initPracticeHome() {
    var page = document.getElementById('prc-home-page');
    if (!page) return;

    renderQuoteCard();
    initFilterTabs();
    renderContinuePracticing();
    renderSubjectCards();

    var viewAllBtn = document.querySelector('.prc-view-all');
    if (viewAllBtn) {
      viewAllBtn.addEventListener('click', function (e) {
        e.preventDefault();
        var subjects = core.getSubjects();
        var listHtml = '<ul style="list-style:none; padding:0; margin:0; text-align:left; max-height:300px; overflow-y:auto;">';
        subjects.forEach(function(sub) {
          listHtml += '<li style="padding:12px; border-bottom:1px solid #e5e7eb;">' +
                      '<a href="practice-subject.html?subject=' + sub.id + '" style="text-decoration:none; color:#1f2937; font-weight:500; display:flex; align-items:center; gap:12px;">' +
                      '<div class="prc-subject-icon-tile ' + ({1:'prc-icon-blue',2:'prc-icon-teal',3:'prc-icon-blue',4:'prc-icon-orange',5:'prc-icon-pink',6:'prc-icon-purple',7:'prc-icon-rose'}[sub.id]||'prc-icon-blue') + '" style="width:32px;height:32px;border-radius:6px;display:flex;align-items:center;justify-content:center;">' +
                      '<span class="subject-icon ' + sub.icon + '" style="font-size:16px;"></span></div>' +
                      '<span>' + sub.name + ' <span style="color:#6b7280; font-size:14px; margin-left:8px;">' + sub.title + '</span></span>' +
                      '</a></li>';
        });
        listHtml += '</ul>';

        core.showModal({
          title: 'All Subjects',
          message: listHtml,
          confirmText: 'Close',
          cancelText: '',
          onConfirm: function () {}
        });
        
        var cancelBtn = document.querySelector('.prc-modal-btn-cancel');
        if (cancelBtn) cancelBtn.style.display = 'none';
      });
    }
  }

  /* Displaying quote card ở góc phải */
  function renderQuoteCard() {
    /* Quote card đã được viết sẵn trong HTML, không cần render động */
  }

  /* ====== FILTER TABS ====== */
  /* Các tab: All / Quizzes / Coding / Flashcards */
  /* Lọc ảnh hưởng đến subject cards (đếm quiz/exercise) và continue practicing */

  function initFilterTabs() {
    var tabList = document.getElementById('prc-filter-tabs');
    if (!tabList) return;

    var tabs = tabList.querySelectorAll('.prc-tab');

    /* Đọc filter hiện tại từ URL param ?type= */
    var currentType = core.getUrlParam('type') || 'all';

    /* Đánh dấu tab đang active */
    tabs.forEach(function (tab) {
      var type = tab.getAttribute('data-type');
      if (type === currentType) {
        tab.classList.add('prc-tab-active');
        tab.setAttribute('aria-selected', 'true');
      } else {
        tab.classList.remove('prc-tab-active');
        tab.setAttribute('aria-selected', 'false');
      }

      /* Events click tab */
      tab.addEventListener('click', function () {
        var newType = tab.getAttribute('data-type');
        /* Cập nhật URL mà không reload trang */
        var url = new URL(window.location);
        if (newType === 'all') {
          url.searchParams.delete('type');
        } else {
          url.searchParams.set('type', newType);
        }
        window.history.replaceState({}, '', url);

        /* Cập nhật active state */
        tabs.forEach(function (t) {
          t.classList.remove('prc-tab-active');
          t.setAttribute('aria-selected', 'false');
        });
        tab.classList.add('prc-tab-active');
        tab.setAttribute('aria-selected', 'true');

        /* Re-render nội dung theo filter mới */
        renderSubjectCards(newType);
        renderContinuePracticing(newType);
      });
    });
  }

  /* ====== CONTINUE PRACTICING ====== */
  /* Hiện thẻ "Continue practicing" với bài quiz/exercise đang làm dở */

  function renderContinuePracticing(filterType) {
    var container = document.getElementById('prc-continue-section');
    if (!container) return;

    filterType = filterType || core.getUrlParam('type') || 'all';

    var inProgress = core.getLatestInProgress();

    /* Nếu có filter type mà không khớp, ẩn */
    if (inProgress && filterType !== 'all') {
      if (filterType === 'quizzes' && inProgress.type !== 'quiz') inProgress = null;
      if (filterType === 'coding' && inProgress.type !== 'exercise') inProgress = null;
    }

    if (!inProgress) {
      /* Hiện trạng thái "Start practicing" */
      container.innerHTML =
        '<h2 class="prc-section-title">Continue practicing</h2>' +
        '<article class="prc-card prc-continue-card">' +
          '<div class="prc-continue-body">' +
            '<span class="prc-continue-thumb" aria-hidden="true">' +
              '<svg width="48" height="48" viewBox="0 0 48 48" fill="none">' +
                '<rect width="48" height="48" rx="12" fill="#dbeafe"/>' +
                '<path d="M16 24h16M24 16v16" stroke="#3b82f6" stroke-width="2" stroke-linecap="round"/>' +
              '</svg>' +
            '</span>' +
            '<div class="prc-continue-info">' +
              '<h3 class="prc-continue-title">Start a new practice</h3>' +
              '<p class="prc-continue-meta">Choose a subject below to begin</p>' +
            '</div>' +
          '</div>' +
        '</article>';
      return;
    }

    var subject = core.getSubjectById(inProgress.subjectId);
    var subjectName = subject ? subject.name : '';
    var quizInfo = '';
    if (inProgress.type === 'quiz') {
      var quiz = core.getQuizById(inProgress.refId);
      quizInfo = quiz ? quiz.title : '';
    }

    container.innerHTML =
      '<h2 class="prc-section-title">Continue practicing</h2>' +
      '<article class="prc-card prc-continue-card">' +
        '<div class="prc-continue-body">' +
          '<span class="prc-continue-thumb" aria-hidden="true">' +
            '<svg width="48" height="48" viewBox="0 0 48 48" fill="none">' +
              '<rect width="48" height="48" rx="12" fill="#dbeafe"/>' +
              '<path d="M20 16l12 8-12 8V16z" fill="#3b82f6"/>' +
            '</svg>' +
          '</span>' +
          '<div class="prc-continue-info">' +
            '<h3 class="prc-continue-title">' + quizInfo + '</h3>' +
            '<p class="prc-continue-meta">' + subjectName + ' · ' + inProgress.progress + '% completed</p>' +
            '<div class="prc-progress-row">' +
              '<progress class="prc-progress" value="' + inProgress.progress + '" max="100" aria-label="Tiến độ">' + inProgress.progress + '%</progress>' +
              '<span class="prc-progress-label">' + inProgress.progress + '%</span>' +
            '</div>' +
          '</div>' +
          '<a href="practice-quiz.html?quiz=' + inProgress.refId + '" class="prc-btn prc-btn-primary">Continue</a>' +
        '</div>' +
      '</article>';
  }

  /* ====== SUBJECT CARDS ====== */
  /* Displaying danh sách môn học dạng thẻ nhỏ */

  function renderSubjectCards(filterType) {
    var container = document.getElementById('prc-subjects-grid');
    if (!container) return;

    filterType = filterType || core.getUrlParam('type') || 'all';
    var subjects = core.getSubjects();

    var html = '';
    subjects.forEach(function (subject) {
      /* Đếm số quiz và exercise theo filter */
      var quizCount = core.getQuizzes(subject.id).length;
      var exerciseCount = core.getExercises(subject.id).length;
      var flashcardCount = core.getFlashcards(subject.id).length;

      /* Tạo meta text tùy theo filter */
      var meta = '';
      if (filterType === 'all') {
        meta = quizCount + ' quizzes · ' + exerciseCount + ' exercises';
      } else if (filterType === 'quizzes') {
        meta = quizCount + ' quizzes';
      } else if (filterType === 'coding') {
        meta = exerciseCount + ' exercises';
      } else if (filterType === 'flashcards') {
        meta = flashcardCount + ' flashcards';
      }

      /* Tính tông tỉnh sách icon cho subject */
      var iconTints = {
        1: 'prc-icon-blue',
        2: 'prc-icon-teal',
        3: 'prc-icon-blue',
        4: 'prc-icon-orange',
        5: 'prc-icon-pink',
        6: 'prc-icon-purple',
        7: 'prc-icon-rose'
      };
      var iconTint = iconTints[subject.id] || 'prc-icon-blue';
      var isFav = core.isSubjectFavorited ? core.isSubjectFavorited(subject.id) : false;

      html +=
        '<li>' +
          '<div style="position:relative;">' +
            '<button type="button" class="subject-fav-btn ' + (isFav ? 'is-favorited' : '') + '" data-subject-id="' + subject.id + '" aria-label="Favorite ' + subject.name + '" title="' + (isFav ? 'Bỏ yêu thích' : 'Yêu thích môn học') + '">' +
              '<svg class="star-icon" viewBox="0 0 24 24" aria-hidden="true">' +
                '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>' +
              '</svg>' +
            '</button>' +
            '<a href="practice-subject.html?subject=' + subject.id + '" class="prc-card prc-subject-card">' +
              '<span class="prc-subject-icon-tile ' + iconTint + '" aria-hidden="true">' +
                '<span class="subject-icon ' + subject.icon + '"></span>' +
              '</span>' +
              '<div class="prc-subject-card-info">' +
                '<h3 class="prc-subject-card-name">' + subject.name + '</h3>' +
                '<p class="prc-subject-card-title">' + subject.title + '</p>' +
                '<p class="prc-subject-card-meta">' + meta + '</p>' +
              '</div>' +
            '</a>' +
          '</div>' +
        '</li>';
    });

    container.innerHTML = html;

    /* Gắn sự kiện click cho các nút ngôi sao yêu thích */
    container.querySelectorAll('.subject-fav-btn').forEach(function(btn) {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        var subId = Number(btn.getAttribute('data-subject-id'));
        if (core.toggleSubjectFavorite) {
          var nowFav = core.toggleSubjectFavorite(subId);
          btn.classList.toggle('is-favorited', nowFav);
          btn.title = nowFav ? 'Bỏ yêu thích' : 'Yêu thích môn học';
        }
      });
    });
  }

  /* ====== SUBJECT PAGE (practice-subject.html) ====== */

  /* Khởi tạo trang Subject Practice */
  function initSubjectPage() {
    var page = document.getElementById('prc-subject-page');
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

    renderSubjectHeader(subject);
    initSubjectTabs(subject);
  }

  /* Displaying header của trang subject */
  function renderSubjectHeader(subject) {
    var titleEl = document.getElementById('prc-subject-title');
    var subtitleEl = document.getElementById('prc-subject-subtitle');
    if (titleEl) {
      var isFav = core.isSubjectFavorited ? core.isSubjectFavorited(subject.id) : false;
      titleEl.innerHTML = subject.name + ' – ' + subject.title + ' ' +
        '<button type="button" class="subject-fav-btn ' + (isFav ? 'is-favorited' : '') + '" data-subject-id="' + subject.id + '" style="position:static;display:inline-flex;vertical-align:middle;margin-left:12px;width:30px;height:30px;" aria-label="Favorite ' + subject.name + '" title="' + (isFav ? 'Bỏ yêu thích' : 'Yêu thích môn học') + '">' +
          '<svg class="star-icon" viewBox="0 0 24 24" aria-hidden="true" style="width:16px;height:16px;">' +
            '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>' +
          '</svg>' +
        '</button>';

      var favBtn = titleEl.querySelector('.subject-fav-btn');
      if (favBtn) {
        favBtn.addEventListener('click', function(e) {
          e.preventDefault();
          e.stopPropagation();
          if (core.toggleSubjectFavorite) {
            var nowFav = core.toggleSubjectFavorite(subject.id);
            favBtn.classList.toggle('is-favorited', nowFav);
            favBtn.title = nowFav ? 'Bỏ yêu thích' : 'Yêu thích môn học';
          }
        });
      }
    }
    if (subtitleEl) subtitleEl.textContent = 'Test your knowledge with quizzes and exercises.';
  }

  /* ====== SUBJECT TABS ====== */
  /* Tabs: Quizzes / Exercises / Flashcards */

  function initSubjectTabs(subject) {
    var tabList = document.getElementById('prc-subject-tabs');
    if (!tabList) return;

    var tabs = tabList.querySelectorAll('.prc-tab');
    var panels = document.querySelectorAll('.prc-tab-panel');

    /* Đọc hash hiện tại để chọn tab đúng */
    var currentHash = core.getUrlHash() || 'quizzes';

    function activateTab(tabId) {
      tabs.forEach(function (t) {
        var isActive = t.getAttribute('data-tab') === tabId;
        t.classList.toggle('prc-tab-active', isActive);
        t.setAttribute('aria-selected', String(isActive));
      });
      panels.forEach(function (p) {
        p.hidden = p.id !== 'prc-panel-' + tabId;
      });

      /* Render nội dung tab */
      if (tabId === 'quizzes') renderQuizList(subject);
      else if (tabId === 'exercises') renderExerciseList(subject);
      else if (tabId === 'flashcards') renderFlashcardLink(subject);
    }

    /* Khởi tạo tab ban đầu */
    activateTab(currentHash);

    /* Gắn sự kiện click */
    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        var tabId = tab.getAttribute('data-tab');
        window.location.hash = tabId;
        activateTab(tabId);
      });
    });

    /* Lắng nghe hash change */
    window.addEventListener('hashchange', function () {
      activateTab(core.getUrlHash() || 'quizzes');
    });
  }

  /* ====== QUIZ LIST ====== */
  /* Displaying danh sách quiz với trạng thái */

  function renderQuizList(subject) {
    var container = document.getElementById('prc-quiz-list');
    if (!container) return;

    var quizzes = core.getQuizzes(subject.id);

    if (quizzes.length === 0) {
      container.innerHTML = '<p class="prc-empty-state">No quizzes available for this subject yet.</p>';
      return;
    }

    var html = '';
    quizzes.forEach(function (quiz, index) {
      var status = core.getQuizStatus(quiz.id);
      var bestScore = core.getQuizBestScore(quiz.id);
      var progress = core.getQuizProgress(quiz.id);

      /* Tạo status pill */
      var statusPill = '';
      var statusClass = '';
      if (status === 'completed') {
        statusPill = '<span class="prc-status-pill prc-status-completed">Completed</span>';
        statusClass = 'prc-row-completed';
      } else if (status === 'in-progress') {
        statusPill = '<span class="prc-status-pill prc-status-inprogress">In progress</span>';
        statusClass = 'prc-row-inprogress';
      } else {
        statusPill = '<span class="prc-status-pill prc-status-notstarted">Not started</span>';
        statusClass = 'prc-row-notstarted';
      }

      /* Thanh tiến độ chỉ hiện khi đang làm */
      var progressBar = '';
      if (status === 'in-progress') {
        progressBar =
          '<div class="prc-progress-row prc-progress-row-small">' +
            '<progress class="prc-progress" value="' + progress + '" max="100">' + progress + '%</progress>' +
            '<span class="prc-progress-label">' + progress + '%</span>' +
          '</div>';
      } else if (status === 'completed' && bestScore !== null) {
        progressBar =
          '<div class="prc-progress-row prc-progress-row-small">' +
            '<progress class="prc-progress prc-progress-green" value="' + bestScore + '" max="100">' + bestScore + '%</progress>' +
            '<span class="prc-progress-label">' + bestScore + '%</span>' +
          '</div>';
      }

      /* Link tùy thuộc vào trạng thái */
      var href = '';
      if (status === 'in-progress') {
        href = 'practice-quiz.html?quiz=' + quiz.id;
      } else if (status === 'completed') {
        href = 'practice-quiz-intro.html?quiz=' + quiz.id;
      } else {
        href = 'practice-quiz-intro.html?quiz=' + quiz.id;
      }

      html +=
        '<a href="' + href + '" class="prc-quiz-row ' + statusClass + '">' +
          '<span class="prc-quiz-row-icon" aria-hidden="true">' +
            '<svg width="24" height="24" viewBox="0 0 24 24" fill="none">' +
              '<rect width="24" height="24" rx="6" fill="#dbeafe"/>' +
              '<path d="M9 7h6M9 12h6M9 17h4" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round"/>' +
            '</svg>' +
          '</span>' +
          '<div class="prc-quiz-row-info">' +
            '<h3 class="prc-quiz-row-title">' + (quiz.title.startsWith("Chương") ? quiz.title : "Quiz " + quiz.order + " – " + quiz.title) + '</h3>' +
            '<p class="prc-quiz-row-meta">' + quiz.questionCount + ' questions · ' + (quiz.durationMin || Math.round(quiz.questionCount * 1.5)) + ' min</p>' +
            progressBar +
          '</div>' +
          '<div class="prc-quiz-row-right">' +
            statusPill +
            '<span class="prc-chevron" aria-hidden="true"></span>' +
          '</div>' +
        '</a>';
    });

    container.innerHTML = html;
  }

  /* ====== EXERCISE LIST ====== */
  /* Displaying danh sách exercise với trạng thái */

  function renderExerciseList(subject) {
    var container = document.getElementById('prc-exercise-list');
    if (!container) return;

    var exercises = core.getExercises(subject.id);

    if (exercises.length === 0) {
      container.innerHTML = '<p class="prc-empty-state">No exercises available for this subject yet.</p>';
      return;
    }

    var html = '';
    exercises.forEach(function (exercise) {
      var status = core.getExerciseStatus(exercise.id);
      var statusPill = '';
      if (status === 'completed') {
        statusPill = '<span class="prc-status-pill prc-status-completed">Completed</span>';
      } else {
        statusPill = '<span class="prc-status-pill prc-status-notstarted">Not started</span>';
      }

      html +=
        '<a href="practice-exercise.html?exercise=' + exercise.id + '" class="prc-quiz-row">' +
          '<span class="prc-quiz-row-icon" aria-hidden="true">' +
            '<svg width="24" height="24" viewBox="0 0 24 24" fill="none">' +
              '<rect width="24" height="24" rx="6" fill="#dbeafe"/>' +
              '<path d="M8 6l4 4-4 4M14 14h4" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>' +
            '</svg>' +
          '</span>' +
          '<div class="prc-quiz-row-info">' +
            '<h3 class="prc-quiz-row-title">Exercise ' + exercise.order + ' – ' + exercise.title + '</h3>' +
            '<p class="prc-quiz-row-meta">' + exercise.language + ' · ' + exercise.testCases.length + ' test cases</p>' +
          '</div>' +
          '<div class="prc-quiz-row-right">' +
            statusPill +
            '<span class="prc-chevron" aria-hidden="true"></span>' +
          '</div>' +
        '</a>';
    });

    container.innerHTML = html;
  }

  /* ====== FLASHCARD LINK ====== */
  /* Displaying link đến trang flashcards */

  function renderFlashcardLink(subject) {
    var container = document.getElementById('prc-flashcard-panel');
    if (!container) return;

    var flashcards = core.getFlashcards(subject.id);

    if (flashcards.length === 0) {
      container.innerHTML = '<p class="prc-empty-state">No flashcards available for this subject yet.</p>';
      return;
    }

    container.innerHTML =
      '<a href="practice-flashcards.html?subject=' + subject.id + '" class="prc-card prc-flashcard-start-card">' +
        '<span class="prc-flashcard-icon" aria-hidden="true">' +
          '<svg width="48" height="48" viewBox="0 0 48 48" fill="none">' +
            '<rect width="48" height="48" rx="12" fill="#dbeafe"/>' +
            '<rect x="10" y="14" width="20" height="16" rx="3" fill="#3b82f6" opacity="0.3"/>' +
            '<rect x="14" y="10" width="24" height="20" rx="3" fill="#3b82f6"/>' +
            '<path d="M20 18h12M20 22h8" stroke="white" stroke-width="1.5" stroke-linecap="round"/>' +
          '</svg>' +
        '</span>' +
        '<div>' +
          '<h3 class="prc-quiz-row-title">Study Flashcards</h3>' +
          '<p class="prc-quiz-row-meta">' + flashcards.length + ' cards available</p>' +
        '</div>' +
        '<span class="prc-chevron" aria-hidden="true"></span>' +
      '</a>';
  }

  /* ====== KHỞI TẠO ====== */
  /* Tự nhận biết trang nào đang mở dựa trên id element */

  document.addEventListener('DOMContentLoaded', function () {
    initPracticeHome();
    initSubjectPage();
  });

  /* Gán ra namespace cho trường hợp cần gọi lại */
  window.Lib95.practice.list = {
    initPracticeHome: initPracticeHome,
    initSubjectPage: initSubjectPage
  };

})();
