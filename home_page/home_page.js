;(function () {
  'use strict';
  
  if (!window.Lib95 || !window.Lib95.practice || !window.Lib95.practice.core) {
    return;
  }

  const core = window.Lib95.practice.core;

  function initDashboard() {
    renderSubjects();
    initViewAllModal();
    renderContinueLearning();
    renderLatestScore();
    renderRecentActivity();
  }

  // --- Seeded PRNG and Selection Utilities ---
  function hashString(str) {
    let hash = 2166136261 >>> 0;
    for (let i = 0; i < str.length; i++) {
      hash ^= str.charCodeAt(i);
      hash = Math.imul(hash, 16777619) >>> 0;
    }
    return hash;
  }

  function mulberry32(seed) {
    let s = seed >>> 0;
    return function () {
      s = (s + 0x6D2B79F5) >>> 0;
      let t = Math.imul(s ^ (s >>> 15), 1 | s);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function shuffleArray(arr, randomFn) {
    const result = arr.slice();
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(randomFn() * (i + 1));
      const temp = result[i];
      result[i] = result[j];
      result[j] = temp;
    }
    return result;
  }

  function getLocalDateString() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  function getUserId() {
    try {
      const raw = localStorage.getItem('user');
      if (raw) {
        const u = JSON.parse(raw);
        if (u) {
          return u.id || u._id || u.username || 'guest';
        }
      }
    } catch (e) {}
    return 'guest';
  }

  function getDailySeed() {
    return `${getLocalDateString()}:${getUserId()}`;
  }

  function getSubjectProgress(sub) {
    const totalQuizzes = (core.getQuizzes ? core.getQuizzes(sub.id) : []).length;
    const allAttempts = (core.getAttempts ? core.getAttempts() : []).filter(function (a) {
      return a && a.type === 'quiz' && Number(a.subjectId) === Number(sub.id);
    });
    const attemptedQuizIds = new Set(allAttempts.map(function (a) { return a.refId; }));
    const attemptedQuizzes = attemptedQuizIds.size;
    const percent = totalQuizzes > 0 ? Math.min(100, Math.round((attemptedQuizzes / totalQuizzes) * 100)) : 0;
    const attemptCount = allAttempts.length;

    return {
      percent: percent,
      attemptedQuizzes: attemptedQuizzes,
      totalQuizzes: totalQuizzes,
      attemptCount: attemptCount
    };
  }

  function getFeaturedSubjects(items, limit, seed) {
    if (limit === undefined) limit = 6;
    if (!items || items.length === 0) return [];

    const mapped = items.map(item => {
      const pct = typeof item.percent === 'number'
        ? item.percent
        : (item.progress && typeof item.progress.percent === 'number' ? item.progress.percent : 0);
      return { item, percent: pct };
    });

    const percentMap = new Map();
    for (const entry of mapped) {
      if (!percentMap.has(entry.percent)) {
        percentMap.set(entry.percent, []);
      }
      percentMap.get(entry.percent).push(entry.item);
    }

    const sortedPercents = Array.from(percentMap.keys()).sort((a, b) => b - a);
    const seedStr = String(seed !== undefined ? seed : getDailySeed());
    const seedInt = hashString(seedStr);
    const random = mulberry32(seedInt);

    const result = [];
    for (const pct of sortedPercents) {
      const group = percentMap.get(pct);
      const shuffledGroup = shuffleArray(group, random);
      for (const item of shuffledGroup) {
        result.push(item);
      }
    }

    return result.slice(0, limit);
  }

  function renderSubjects() {
    const grid = document.querySelector('.subject-grid');
    if (!grid) return;

    const allSubjects = core.getSubjects();
    const subjectsWithProgress = allSubjects.map(sub => {
      return {
        ...sub,
        progress: getSubjectProgress(sub)
      };
    });

    const featured = getFeaturedSubjects(subjectsWithProgress, 6, getDailySeed());
    let html = '';

    featured.forEach(sub => {
      const displayProgress = sub.progress.percent;
      const isFav = core.isSubjectFavorited ? core.isSubjectFavorited(sub.id) : false;

      html += `
        <li>
            <article class="card subject-card" data-subject-id="${sub.id}">
                <button type="button" class="subject-fav-btn ${isFav ? 'is-favorited' : ''}" data-subject-id="${sub.id}" aria-label="Favorite ${sub.name}" title="${isFav ? 'Bỏ yêu thích' : 'Yêu thích môn học'}">
                    <svg class="star-icon" viewBox="0 0 24 24" aria-hidden="true">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                    </svg>
                </button>
                <span class="subject-icon ${sub.icon}" aria-hidden="true"></span>
                <div class="subject-info">
                    <h3 class="subject-name">${sub.name}</h3>
                    <p class="subject-desc">${sub.title}</p>
                    <div class="progress-row">
                        <progress class="progress" value="${displayProgress}" max="100" aria-label="Tiến độ ${sub.name}">${displayProgress}%</progress>
                        <span class="progress-label">${displayProgress}%</span>
                    </div>
                    <div class="subject-actions">
                        <a href="../pages/lectures/lectures.html" class="chip chip-outline">Lectures</a>
                        <a href="../pages/practice/practice-subject.html?subject=${sub.id}" class="chip chip-soft">Practice</a>
                    </div>
                </div>
            </article>
        </li>
      `;
    });

    grid.innerHTML = html;

    // Gắn sự kiện click cho nút ngôi sao yêu thích
    grid.querySelectorAll('.subject-fav-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const subId = Number(btn.dataset.subjectId);
        if (core.toggleSubjectFavorite) {
          const nowFav = core.toggleSubjectFavorite(subId);
          btn.classList.toggle('is-favorited', nowFav);
          btn.title = nowFav ? 'Bỏ yêu thích' : 'Yêu thích môn học';
        }
      });
    });

    // Lắng nghe thay đổi favorites từ các tab khác (Practice/Favorites)
    window.addEventListener('storage', (e) => {
      if (e.key === 'lib95:favorites:subjects') {
        grid.querySelectorAll('.subject-fav-btn').forEach(btn => {
          const subId = Number(btn.dataset.subjectId);
          const isFav = core.isSubjectFavorited ? core.isSubjectFavorited(subId) : false;
          btn.classList.toggle('is-favorited', isFav);
          btn.title = isFav ? 'Bỏ yêu thích' : 'Yêu thích môn học';
        });
      }
    });
  }

  function initViewAllModal() {
    const trigger = document.getElementById('view-all-subjects');
    const modal = document.getElementById('home-subjects-modal');
    if (!trigger || !modal) return;

    const closeBtn = document.getElementById('home-subjects-modal-close');
    const searchInput = document.getElementById('home-subjects-search-input');
    const listEl = document.getElementById('home-subjects-modal-list');
    const emptyEl = document.getElementById('home-subjects-modal-empty');

    let lastFocusedElement = null;

    function renderModalList(filterQuery) {
      if (!listEl) return;
      const q = (filterQuery || '').trim().toLowerCase();
      const allSubjects = core.getSubjects();
      let visibleCount = 0;
      let html = '';

      allSubjects.forEach(sub => {
        const nameMatch = (sub.name || '').toLowerCase().includes(q);
        const codeMatch = (sub.title || '').toLowerCase().includes(q);

        if (!q || nameMatch || codeMatch) {
          visibleCount++;
          const progress = getSubjectProgress(sub);
          const pct = progress.percent;

          html += `
            <li class="home-subjects-modal-item" data-subject-id="${sub.id}">
              <div class="home-subjects-modal-item-left">
                <span class="subject-icon ${sub.icon}" aria-hidden="true"></span>
                <div class="home-subjects-modal-item-info">
                  <h3 class="home-subjects-modal-item-name">${sub.name}</h3>
                  <p class="home-subjects-modal-item-desc">${sub.title}</p>
                  <div class="progress-row">
                    <progress class="progress" value="${pct}" max="100" aria-label="Tiến độ ${sub.name}">${pct}%</progress>
                    <span class="progress-label">${pct}%</span>
                  </div>
                </div>
              </div>
              <div class="home-subjects-modal-item-actions">
                <a href="/pages/lectures/lectures.html" class="chip chip-outline">Lectures</a>
                <a href="/pages/practice/practice-subject.html?subject=${sub.id}" class="chip chip-soft">Practice</a>
              </div>
            </li>
          `;
        }
      });

      listEl.innerHTML = html;
      if (emptyEl) {
        emptyEl.hidden = visibleCount > 0;
      }
    }

    function openModal() {
      lastFocusedElement = document.activeElement;
      modal.hidden = false;
      document.body.style.overflow = 'hidden';
      if (searchInput) {
        searchInput.value = '';
      }
      renderModalList('');
      setTimeout(() => {
        if (searchInput) {
          searchInput.focus();
        }
      }, 50);
    }

    function closeModal() {
      modal.hidden = true;
      document.body.style.overflow = '';
      if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
        lastFocusedElement.focus();
      }
    }

    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        closeModal();
      });
    }

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (modal.hidden) return;

      if (e.key === 'Escape') {
        e.preventDefault();
        closeModal();
        return;
      }

      if (e.key === 'Tab') {
        const focusable = modal.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const focusableArr = Array.prototype.filter.call(
          focusable,
          el => !el.hidden && el.offsetParent !== null
        );
        if (focusableArr.length === 0) return;

        const first = focusableArr[0];
        const last = focusableArr[focusableArr.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    });

    if (searchInput) {
      searchInput.addEventListener('input', () => {
        renderModalList(searchInput.value);
      });
    }
  }

  function renderContinueLearning() {
    const cardBody = document.querySelector('.card-continue .continue-body');
    if (!cardBody) return;
    
    const inProgress = core.getLatestInProgress();
    if (!inProgress) {
       const attempts = core.getAttempts();
       if (attempts.length > 0) {
          const latestAtt = attempts[0];
          const subject = core.getSubjectById(latestAtt.subjectId);
          const quizzes = core.getQuizzes(latestAtt.subjectId);
          quizzes.sort((a, b) => a.order - b.order);
          
          const lastQuiz = core.getQuizById(latestAtt.refId);
          let nextQuiz = null;
          if (lastQuiz) {
              const lastIdx = quizzes.findIndex(q => q.id === lastQuiz.id);
              if (lastIdx !== -1 && lastIdx < quizzes.length - 1) {
                  nextQuiz = quizzes[lastIdx + 1];
              }
          }
          if (!nextQuiz && quizzes.length > 0) {
              nextQuiz = quizzes[0];
          }

          if (nextQuiz) {
              cardBody.innerHTML = `
                <span class="continue-thumb" aria-hidden="true"></span>
                <div class="continue-info">
                    <h3 class="continue-title">${nextQuiz.title}</h3>
                    <p class="continue-meta">${subject ? subject.name : ''} · Up Next</p>
                    <div class="progress-row">
                        <progress class="progress" value="0" max="100">0%</progress>
                        <span class="progress-label">0%</span>
                    </div>
                    <p class="continue-last">
                        Ready to start
                    </p>
                </div>
                <a href="../pages/practice/practice-quiz-intro.html?quiz=${nextQuiz.id}" class="button-primary">Start</a>
              `;
              return;
          }
       }
       cardBody.innerHTML = '<p>No practice in progress. Choose a subject to begin.</p>';
       return;
    }

    const subject = core.getSubjectById(inProgress.subjectId);
    let title = '';
    if (inProgress.type === 'quiz') {
      const qz = core.getQuizById(inProgress.refId);
      title = qz ? qz.title : 'Quiz';
    } else {
      const ex = core.getExerciseById(inProgress.refId);
      title = ex ? ex.title : 'Exercise';
    }
    
    cardBody.innerHTML = `
      <span class="continue-thumb" aria-hidden="true"></span>
      <div class="continue-info">
          <h3 class="continue-title">${title}</h3>
          <p class="continue-meta">${subject ? subject.name : ''} · In Progress</p>
          <div class="progress-row">
              <progress class="progress" value="${inProgress.progress}" max="100">${inProgress.progress}%</progress>
              <span class="progress-label">${inProgress.progress}%</span>
          </div>
          <p class="continue-last">
              Last active · <time>${core.formatDate(new Date())}</time>
          </p>
      </div>
      <a href="../pages/practice/practice-quiz.html?quiz=${inProgress.refId}" class="button-primary">Continue</a>
    `;
  }

  function renderLatestScore() {
    const cardQuizBody = document.querySelector('.card-quiz .quiz-body');
    if (!cardQuizBody) return;

    const attempts = core.getAttempts();
    const latest = attempts.length > 0 ? attempts[0] : null;

    if (!latest || latest.score === null || latest.score === undefined) {
       cardQuizBody.innerHTML = '<p style="padding-top:20px;">No completed quizzes yet.</p>';
       return;
    }

    const subject = core.getSubjectById(latest.subjectId);
    let qzName = 'Quiz';
    if (latest.type === 'quiz') {
      const qz = core.getQuizById(latest.refId);
      if (qz) qzName = qz.title;
    }

    let badgeText = 'Great job!';
    if (latest.score < 50) badgeText = 'Keep trying!';
    else if (latest.score < 70) badgeText = 'Good effort!';
    
    cardQuizBody.innerHTML = `
        <div class="score-ring" style="--value: ${latest.score}" role="img" aria-label="Score ${latest.score} percent">
            <span class="score-value">${latest.score}%</span>
        </div>
        <div class="quiz-info">
            <p class="quiz-subject">${subject ? subject.name : ''}</p>
            <p class="quiz-name" style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:180px;" title="${qzName}">${qzName}</p>
            <p class="quiz-date"><time>${core.formatDate(latest.finishedAt)}</time></p>
            <p class="quiz-badge"><span class="badge-icon" aria-hidden="true"></span>${badgeText}</p>
        </div>
    `;
  }

  function renderRecentActivity() {
    const tbody = document.querySelector('.activity-table tbody');
    if (!tbody) return;

    const attempts = core.getAttempts();
    let html = '';

    if (attempts.length === 0) {
      html = '<tr><td colspan="6" style="text-align:center;">No recent activity</td></tr>';
    } else {
      const latest5 = attempts.slice(0, 5);
      latest5.forEach((att, idx) => {
        const subject = core.getSubjectById(att.subjectId);
        let title = 'Quiz';
        if (att.type === 'quiz') {
          const qz = core.getQuizById(att.refId);
          if (qz) title = qz.title;
        }

        let scoreText = (att.score !== null && att.score !== undefined) ? att.score + '%' : '--';
        
        let scoreClass = 'score-average'; // fallback
        if (att.score !== null && att.score !== undefined) {
           if (att.score >= 80) scoreClass = 'score-good';
           else if (att.score >= 50) scoreClass = 'score-average';
           else scoreClass = 'score-poor';
        }

        html += `
          <tr>
            <td>${idx + 1}</td>
            <td style="max-width:200px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;" title="${title}">${title}</td>
            <td>${subject ? subject.name : ''}</td>
            <td>${core.formatDateShort(att.finishedAt)}</td>
            <td><span class="score-chip ${scoreClass}">${scoreText}</span></td>
            <td><a href="../pages/practice/practice-result.html?attempt=${att.id}" class="action-btn" aria-label="View Details">
               <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M9 5l7 7-7 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </a></td>
          </tr>
        `;
      });
    }

    tbody.innerHTML = html;
  }

  window.addEventListener('DOMContentLoaded', initDashboard);

})();
