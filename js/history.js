/* History: dữ liệu mẫu và xử lý giao diện cho trang lịch sử học tập */
(() => {
  'use strict';

  let records = [];
  
  if (window.Lib95 && window.Lib95.practice && window.Lib95.practice.core) {
    const core = window.Lib95.practice.core;
    const attempts = core.getAttempts();
    records = attempts.map(att => {
      const isQuiz = att.type === 'quiz';
      let title = 'Unknown';
      let subtitle = '';
      let subjectName = 'Unknown Subject';
      let durationStr = 'Unknown';
      let desc = '';
      let takeaways = [];
      let res = [];

      const subject = core.getSubjectById(att.subjectId);
      if (subject) {
        subjectName = subject.name;
      }

      if (isQuiz) {
        const quiz = core.getQuizById(att.refId);
        if (quiz) {
          title = quiz.title;
          subtitle = subjectName + ' · Quiz';
          durationStr = quiz.questionCount + ' questions';
          desc = 'A quiz on ' + subjectName;
          takeaways = [
            att.correct + ' questions answered correctly',
            'Your score was ' + att.score + '%'
          ];
          res = [{ title: 'Quiz answer review', meta: 'Review' }];
        }
      } else {
        const ex = core.getExerciseById(att.refId);
        if (ex) {
          title = ex.title;
          subtitle = subjectName + ' · Exercise';
          durationStr = 'Exercise';
          desc = 'A coding practice';
        }
      }

      const dateObj = new Date(att.finishedAt);
      const dateStr = dateObj.getFullYear() + '-' + String(dateObj.getMonth() + 1).padStart(2, '0') + '-' + String(dateObj.getDate()).padStart(2, '0');

      return {
        id: att.id,
        type: att.type,
        title: title,
        subtitle: subtitle,
        subject: subjectName,
        date: dateStr,
        duration: durationStr,
        status: 'Completed',
        progress: 100,
        score: att.score,
        description: desc,
        takeaways: takeaways,
        resources: res
      };
    });
    
    // Add some default dummy records just in case it's empty, so the UI doesn't look completely empty for testing
    if (records.length === 0) {
       records.push({
         id: 'dummy-1', type: 'quiz', title: 'Welcome to 9.5 AI CLUB', subtitle: 'Start Practicing', subject: 'Platform', date: new Date().toISOString().split('T')[0], duration: '0 questions', status: 'Viewed', progress: 0, score: null, description: 'Go to Practice page to take some quizzes.', takeaways: [], resources: []
       });
    }
  }

  const scheduled = [
    { id: 'quiz-2-ml', date: '2025-09-14', time: '10:00 AM', label: 'Quiz' },
    { id: 'practice-data-template', date: '2025-09-10', time: '02:00 PM', label: 'Practice' },
    { id: 'quiz-3-python', date: '2025-09-21', time: '10:00 AM', label: 'Quiz' },
    { id: 'lecture-ml-3', date: '2025-09-18', time: '04:00 PM', label: 'Lecture' }
  ];

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const iconText = { lecture: '▶', quiz: '▤', practice: '‹/›', resource: '▣' };
  const statusClass = { Completed: 'completed', 'In progress': 'in-progress', Viewed: 'viewed', Failed: 'failed' };

  let activeView = 'activity';
  let returnView = 'activity';
  let activityFilter = 'all';
  let quizFilter = 'all';
  let selectedRecord = null;
  let calendarMonth = new Date(2025, 8, 1);
  let selectedDate = '2025-09-14';
  let noteTimer = 0;

  function formatDate(dateString, options = { month: 'short', day: 'numeric', year: 'numeric' }) {
    return new Intl.DateTimeFormat('en-US', options).format(new Date(`${dateString}T12:00:00`));
  }

  function recordById(id) {
    return records.find((record) => record.id === id) || records[0];
  }

  function statusMarkup(status) {
    return `<span class="his-status his-status--${statusClass[status] || 'viewed'}">${status}</span>`;
  }

  function recordButton(record, extraClass = '') {
    const iconClass = `his-icon his-icon--${record.type}`;
    const score = record.score === null ? '' : `<span class="his-score">${record.score}%</span>`;
    return `<button type="button" class="his-activity-row ${extraClass}" data-record-id="${record.id}" aria-label="Open ${record.title}, ${record.status}">
      <span class="${iconClass}" aria-hidden="true">${iconText[record.type]}</span>
      <span class="his-activity-copy"><span class="his-activity-title">${record.title}</span><span class="his-activity-meta"><span>${record.subject}</span><span>${record.subtitle}</span></span></span>
      <span class="his-activity-side"><span>${record.duration}</span><span class="his-activity-date">▣ ${formatDate(record.date)}</span>${score}${statusMarkup(record.status)}</span>
      <span class="his-row-arrow" aria-hidden="true">›</span>
    </button>`;
  }

  function filteredRecords(type = 'all') {
    const query = ($('#site-search')?.value || '').trim().toLowerCase();
    const sort = $('#his-sort')?.value || 'newest';
    const items = records.filter((record) => {
      const matchesType = type === 'all' || record.type === type;
      const matchesQuery = !query || `${record.title} ${record.subtitle} ${record.subject} ${record.status}`.toLowerCase().includes(query);
      return matchesType && matchesQuery;
    });
    items.sort((a, b) => {
      if (sort === 'oldest') return a.date.localeCompare(b.date);
      if (sort === 'score') return (b.score ?? -1) - (a.score ?? -1);
      return b.date.localeCompare(a.date);
    });
    return items;
  }

  function renderActivity() {
    const items = filteredRecords(activityFilter);
    $('#his-activity-list').innerHTML = items.map((record) => recordButton(record)).join('');
    $('#his-activity-count').textContent = `${items.length} ${items.length === 1 ? 'activity' : 'activities'}`;
    $('#his-activity-empty').hidden = items.length > 0;
    $('#his-activity-list').hidden = items.length === 0;
  }

  function renderQuizHistory() {
    const query = ($('#site-search')?.value || '').trim().toLowerCase();
    const items = records.filter((record) => record.type === 'quiz' && (quizFilter === 'all' || record.status === quizFilter))
      .filter((record) => !query || `${record.title} ${record.subject} ${record.status}`.toLowerCase().includes(query))
      .sort((a, b) => b.date.localeCompare(a.date));
    $('#his-quiz-table-body').innerHTML = items.map((record) => `<tr>
      <td><button type="button" class="his-quiz-open" data-record-id="${record.id}">${record.title}</button></td>
      <td>${record.subject}</td><td>${formatDate(record.date)}</td>
      <td>${record.score === null ? '—' : `<span class="his-score">${record.score}%</span>`}</td>
      <td>${statusMarkup(record.status)}</td><td><button type="button" class="his-schedule-open" data-record-id="${record.id}" aria-label="Open ${record.title}">›</button></td>
    </tr>`).join('');
    $('#his-quiz-empty').hidden = items.length > 0;
    $('.his-table-wrap').hidden = items.length === 0;
  }

  function renderTimeline() {
    const items = filteredRecords('all');
    const grouped = new Map();
    items.forEach((record) => {
      if (!grouped.has(record.date)) grouped.set(record.date, []);
      grouped.get(record.date).push(record);
    });
    $('#his-timeline').innerHTML = Array.from(grouped.entries()).map(([date, dayItems]) => `<section class="his-timeline-day">
      <h3 class="his-timeline-date">${formatDate(date)}</h3>
      <div class="his-timeline-items">${dayItems.map((record) => `<button type="button" class="his-timeline-item" data-record-id="${record.id}">
        <span class="his-icon his-icon--${record.type}" aria-hidden="true">${iconText[record.type]}</span>
        <span class="his-activity-copy"><span class="his-activity-title">${record.title}</span><span class="his-activity-meta"><span>${record.subtitle}</span><span>${record.duration}</span></span></span>
        ${statusMarkup(record.status)}<span class="his-row-arrow" aria-hidden="true">›</span>
      </button>`).join('')}</div>
    </section>`).join('');
  }

  function setView(view) {
    activeView = view;
    $$('[data-view-panel]').forEach((panel) => { panel.hidden = panel.dataset.viewPanel !== view; });
    $$('[data-view-target]').forEach((button) => {
      const active = button.dataset.viewTarget === view;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    if (view === 'activity') renderActivity();
    if (view === 'quizzes') renderQuizHistory();
    if (view === 'timeline') renderTimeline();
  }

  function openRecord(id) {
    selectedRecord = recordById(id);
    returnView = activeView === 'detail' ? returnView : activeView;
    $('#his-detail-title').textContent = selectedRecord.title;
    $('#his-detail-meta').textContent = `${selectedRecord.subject} · ${selectedRecord.subtitle}`;
    $('#his-detail-duration').textContent = `◷ ${selectedRecord.duration}`;
    $('#his-detail-date').textContent = `▣ ${formatDate(selectedRecord.date)}`;
    $('#his-detail-description').textContent = selectedRecord.description;
    $('#his-detail-status').className = `his-status his-status--${statusClass[selectedRecord.status] || 'viewed'}`;
    $('#his-detail-status').textContent = selectedRecord.status;
    $('#his-detail-icon').className = `his-type-icon his-type-icon--${selectedRecord.type}`;
    $('#his-detail-icon').textContent = iconText[selectedRecord.type];
    $('#his-detail-progress-label').textContent = selectedRecord.status;
    $('#his-detail-progress-meta').textContent = selectedRecord.type === 'quiz' ? `${selectedRecord.score}% score` : `${selectedRecord.duration} activity`;
    $('#his-detail-percent').textContent = `${selectedRecord.progress}%`;
    $('#his-detail-ring').style.setProperty('--his-ring-value', `${selectedRecord.progress}%`);
    $('#his-detail-ring').setAttribute('aria-label', `${selectedRecord.progress} percent complete`);
    $('#his-detail-takeaways').innerHTML = selectedRecord.takeaways.map((item) => `<li>${item}</li>`).join('');
    $('#his-note-editor').value = readNote(selectedRecord.id);
    $('#his-note-status').textContent = 'Notes are saved on this device.';
    renderResources(selectedRecord);
    renderRelated(selectedRecord);
    setDetailTab('overview');
    setView('detail');
  }

  function setDetailTab(tabName) {
    $$('[data-detail-tab]').forEach((button) => {
      const active = button.dataset.detailTab === tabName;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-selected', String(active));
      button.tabIndex = active ? 0 : -1;
    });
    $$('[data-detail-panel]').forEach((panel) => { panel.hidden = panel.dataset.detailPanel !== tabName; });
  }

  function readNote(recordId) {
    try { return localStorage.getItem(`lib95:history:note:${recordId}`) || ''; }
    catch { return ''; }
  }

  function saveNote() {
    if (!selectedRecord) return;
    $('#his-note-status').textContent = 'Saving…';
    window.clearTimeout(noteTimer);
    noteTimer = window.setTimeout(() => {
      try {
        localStorage.setItem(`lib95:history:note:${selectedRecord.id}`, $('#his-note-editor').value);
        $('#his-note-status').textContent = 'Saved on this device.';
      } catch {
        $('#his-note-status').textContent = 'Could not save notes in this browser.';
      }
    }, 450);
  }

  function renderResources(record) {
    const resources = record.resources.length ? record.resources : [{ title: 'Course overview', meta: `${record.subject} · Learning material` }];
    $('#his-detail-resources-list').innerHTML = resources.map((resource) => `<article class="his-resource-item">
      <span class="his-resource-icon" aria-hidden="true">▣</span><span class="his-resource-copy"><strong>${resource.title}</strong><span>${resource.meta}</span></span>
      <button type="button" class="his-resource-download" data-resource-name="${resource.title}">Open</button>
    </article>`).join('');
  }

  function renderRelated(record) {
    const related = records.filter((item) => item.id !== record.id && item.subject === record.subject).slice(0, 2);
    const items = related.length ? related : records.filter((item) => item.id !== record.id).slice(0, 2);
    $('#his-related-activity').innerHTML = items.map((item) => `<div class="his-related-item">
      <span class="his-icon his-icon--${item.type}" aria-hidden="true">${iconText[item.type]}</span><span class="his-related-copy"><strong>${item.title}</strong><span>${formatDate(item.date)} · ${item.status}</span></span>
      <button type="button" class="his-related-open" data-record-id="${item.id}" aria-label="Open ${item.title}">›</button>
    </div>`).join('');
  }

  function renderCalendar() {
    const year = calendarMonth.getFullYear();
    const month = calendarMonth.getMonth();
    $('#his-calendar-month').textContent = `${monthNames[month]} ${year}`;
    const firstWeekday = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const activeDates = new Set([...records.map((record) => record.date), ...scheduled.map((item) => item.date)]);
    const cells = [];
    for (let i = 0; i < firstWeekday; i += 1) cells.push('<span class="his-calendar-blank" aria-hidden="true"></span>');
    for (let day = 1; day <= daysInMonth; day += 1) {
      const date = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const selected = date === selectedDate;
      const hasActivity = activeDates.has(date);
      cells.push(`<button type="button" class="his-calendar-day${selected ? ' is-selected' : ''}${hasActivity ? ' has-activity' : ''}" data-calendar-date="${date}" aria-pressed="${selected}" aria-label="${formatDate(date, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}${hasActivity ? ', has activity' : ''}">${day}</button>`);
    }
    $('#his-calendar-grid').innerHTML = cells.join('');
    $('#his-selected-date').textContent = `Activities for ${formatDate(selectedDate)}`;
    renderSchedule();
  }

  function renderSchedule() {
    const items = scheduled.filter((item) => item.date === selectedDate);
    $('#his-schedule-list').innerHTML = items.map((item) => {
      const record = recordById(item.id);
      return `<article class="his-schedule-item"><span class="his-icon his-icon--${record.type}" aria-hidden="true">${iconText[record.type]}</span>
        <span class="his-schedule-copy"><strong>${record.title}</strong><span>${record.subject} · ${item.label} · ${item.time}</span></span>
        <button type="button" class="his-schedule-open" data-record-id="${record.id}" aria-label="Open ${record.title}">›</button></article>`;
    }).join('');
    $('#his-schedule-empty').hidden = items.length > 0;
    $('#his-schedule-list').hidden = items.length === 0;
  }

  function showToast(message) {
    const toast = $('#his-toast');
    toast.textContent = message;
    toast.hidden = false;
    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(() => { toast.hidden = true; }, 2600);
  }

  function exportHistory() {
    const headers = ['Date', 'Type', 'Title', 'Subject', 'Status', 'Score'];
    const rows = records.map((record) => [record.date, record.type, record.title, record.subject, record.status, record.score ?? '']);
    const csv = [headers, ...rows].map((row) => row.map((value) => `"${String(value).replaceAll('"', '""')}"`).join(',')).join('\r\n');
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = '9-5-library-history.csv';
    link.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    showToast('History exported as a CSV file.');
  }

  function bindEvents() {
    $$('[data-view-target]').forEach((button) => button.addEventListener('click', () => setView(button.dataset.viewTarget)));
    $$('[data-activity-filter]').forEach((button) => button.addEventListener('click', () => {
      activityFilter = button.dataset.activityFilter;
      $$('[data-activity-filter]').forEach((item) => {
        const active = item === button;
        item.classList.toggle('is-active', active);
        item.setAttribute('aria-pressed', String(active));
      });
      renderActivity();
    }));
    $$('[data-quiz-filter]').forEach((button) => button.addEventListener('click', () => {
      quizFilter = button.dataset.quizFilter;
      $$('[data-quiz-filter]').forEach((item) => {
        const active = item === button;
        item.classList.toggle('is-active', active);
        item.setAttribute('aria-pressed', String(active));
      });
      renderQuizHistory();
    }));
    $('#his-sort').addEventListener('change', renderActivity);
    $('#his-progress-subject').addEventListener('change', (event) => {
      const selected = event.currentTarget.value;
      $$('.his-subject-progress').forEach((row) => {
        row.hidden = selected !== 'All subjects' && !row.textContent.startsWith(selected);
      });
    });
    $('.history-app .search').addEventListener('submit', (event) => event.preventDefault());
    $('#site-search').addEventListener('input', () => {
      renderActivity(); renderQuizHistory(); renderTimeline();
    });
    $('#his-detail-tabs').addEventListener('keydown', (event) => {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
      const tabs = $$('[data-detail-tab]');
      const current = tabs.indexOf(document.activeElement);
      let next = current;
      if (event.key === 'ArrowRight') next = (current + 1) % tabs.length;
      if (event.key === 'ArrowLeft') next = (current - 1 + tabs.length) % tabs.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = tabs.length - 1;
      event.preventDefault();
      tabs[next].focus();
      setDetailTab(tabs[next].dataset.detailTab);
    });

    document.addEventListener('click', (event) => {
      const recordButton = event.target.closest('[data-record-id]');
      if (recordButton) { openRecord(recordButton.dataset.recordId); return; }
      const calendarDay = event.target.closest('[data-calendar-date]');
      if (calendarDay) { selectedDate = calendarDay.dataset.calendarDate; renderCalendar(); return; }
      const detailTab = event.target.closest('[data-detail-tab]');
      if (detailTab) { setDetailTab(detailTab.dataset.detailTab); return; }
      const resourceButton = event.target.closest('[data-resource-name]');
      if (resourceButton) showToast(`“${resourceButton.dataset.resourceName}” will open when course files are connected.`);
    });

    $('#his-detail-back').addEventListener('click', () => setView(returnView));
    $('#his-month-prev').addEventListener('click', () => { calendarMonth = new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() - 1, 1); renderCalendar(); });
    $('#his-month-next').addEventListener('click', () => { calendarMonth = new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() + 1, 1); renderCalendar(); });
    $('#his-calendar-today').addEventListener('click', () => {
      const now = new Date();
      calendarMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      selectedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
      renderCalendar();
    });
    $('#his-note-editor').addEventListener('input', saveNote);
    $('#his-export-button').addEventListener('click', exportHistory);
    $('#his-certificate-button').addEventListener('click', () => showToast('Certificate downloads will be connected to course records later.'));

    // main.js đang thiếu hàm này nên phím tắt được gắn riêng ở trang History.
    document.addEventListener('keydown', (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        $('#site-search').focus();
      }
      if (event.key === 'Escape' && activeView === 'detail') setView(returnView);
    });
  }

  renderActivity();
  renderQuizHistory();
  renderTimeline();
  renderCalendar();
  bindEvents();
})();
