(() => {
  "use strict";

  const QUESTIONS = Array.isArray(window.MAE_QUESTIONS_V2)
    ? window.MAE_QUESTIONS_V2
    : Array.isArray(window.MAE_QUESTIONS)
      ? window.MAE_QUESTIONS
      : [];
  const QUESTION_MAP = new Map(QUESTIONS.map((question) => [Number(question.id), question]));
  const PROFILE_KEY = "mae101_v2_profile";
  const SESSION_KEY = "mae101_v2_active_session";
  const BACKUP_VERSION = 2;

  function typesetMath(element) {
    if (window.MathJax && window.MathJax.typesetPromise) {
      if (window.MathJax.typesetClear && element) {
        try { window.MathJax.typesetClear([element]); } catch {}
      }
      window.MathJax.typesetPromise(element ? [element] : undefined).catch((err) => {
        console.warn("MathJax typeset error:", err);
      });
    }
  }

  const TOPICS = {
    HamSo: { name: "Hàm số và Đồ thị", short: "HS", folder: "GT1" },
    GioiHan: { name: "Giới hạn và Liên tục", short: "GH", folder: "GT1" },
    DaoHam: { name: "Đạo hàm", short: "ĐH", folder: "GT1" },
    CucTri: { name: "Cực trị và Tối ưu hóa", short: "CT", folder: "GT1" },
    TichPhan: { name: "Tích phân", short: "TP", folder: "GT1" },
    PhuongTrinhViPhan: { name: "Phương trình vi phân", short: "VP", folder: "GT1" },
    PhuongPhapSo: { name: "Phương pháp số", short: "PS", folder: "GT1" },
    MaTran: { name: "Ma trận", short: "MT", folder: "DSTT1" },
    DinhThuc: { name: "Định thức", short: "ĐT", folder: "DSTT1" },
    HePhuongTrinh: { name: "Hệ phương trình tuyến tính", short: "PT", folder: "DSTT1" },
    KhongGianVector: { name: "Không gian vector", short: "KG", folder: "DSTT1" },
    AnhXaTuyenTinh: { name: "Ánh xạ tuyến tính", short: "AX", folder: "DSTT1" },
    TriRieng: { name: "Trị riêng và Vector riêng", short: "TR", folder: "DSTT1" },
    VectorHinhHoc: { name: "Vector và Hình học", short: "VH", folder: "DSTT1" },
    Unknown: { name: "Chưa phân loại", short: "?", folder: "Unknown" },
  };

  const $ = (id) => document.getElementById(id);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const nowIso = () => new Date().toISOString();
  const todayKey = (date = new Date()) => date.toISOString().slice(0, 10);
  const formatNumber = (value) => new Intl.NumberFormat("vi-VN").format(value);
  const escapeHtml = (value) =>
    String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;");

  function safeParse(raw, fallback) {
    try {
      return raw ? JSON.parse(raw) : fallback;
    } catch {
      return fallback;
    }
  }

  function defaultProfile() {
    return {
      version: BACKUP_VERSION,
      bookmarks: [],
      mistakes: {},
      performance: {},
      history: [],
      activity: {},
      settings: { theme: "light" },
    };
  }

  function loadProfile() {
    const loaded = safeParse(localStorage.getItem(PROFILE_KEY), {});
    return {
      ...defaultProfile(),
      ...loaded,
      bookmarks: Array.isArray(loaded.bookmarks) ? loaded.bookmarks.map(Number) : [],
      mistakes: loaded.mistakes || {},
      performance: loaded.performance || {},
      history: Array.isArray(loaded.history) ? loaded.history : [],
      activity: loaded.activity || {},
      settings: { theme: "light", ...(loaded.settings || {}) },
    };
  }

  function loadSession() {
    const session = safeParse(localStorage.getItem(SESSION_KEY), null);
    if (!session || session.version !== BACKUP_VERSION || !Array.isArray(session.questionIds)) return null;
    session.questionIds = session.questionIds.map(Number).filter((id) => QUESTION_MAP.has(id));
    return session.questionIds.length ? session : null;
  }

  let profile = loadProfile();
  let session = loadSession();
  let lastResultSession = null;
  let selectedMode = "practice";
  let timerInterval = null;
  let zoom = 1;
  let toastTimer = null;
  let topicsExpanded = false;

  function persistProfile() {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  }

  function persistSession(message = "Đã lưu") {
    if (!session) return;
    session.updatedAt = nowIso();
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    const status = $("autosaveStatus");
    if (status) {
      status.textContent = `✓ ${message}`;
      status.classList.remove("saving");
    }
    renderDashboardStats();
  }

  function showToast(message) {
    const toast = $("toast");
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
  }

  function showView(viewId) {
    ["dashboardView", "quizView", "resultsView"].forEach((id) => $(id).classList.toggle("hidden", id !== viewId));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function topicName(topic) {
    return TOPICS[topic]?.name || topic || "Chưa phân loại";
  }

  function folderName(folder) {
    if (folder === "GT1") return "Giải tích 1";
    if (folder === "DSTT1") return "Đại số tuyến tính 1";
    return "Tổng hợp";
  }

  function setMode(mode) {
    selectedMode = mode;
    $$("#modeControl button").forEach((button) => button.classList.toggle("active", button.dataset.mode === mode));
  }

  function shuffle(items) {
    const copy = [...items];
    for (let index = copy.length - 1; index > 0; index -= 1) {
      const random = Math.floor(Math.random() * (index + 1));
      [copy[index], copy[random]] = [copy[random], copy[index]];
    }
    return copy;
  }

  function currentQuestion() {
    return session ? QUESTION_MAP.get(Number(session.questionIds[session.index])) : null;
  }

  function getFilteredPool() {
    const folder = $("folderSelect").value;
    const topic = $("topicSelect").value;
    const source = $("sourceSelect").value;
    const bookmarkSet = new Set(profile.bookmarks.map(Number));
    const mistakeSet = new Set(Object.keys(profile.mistakes).map(Number));
    return QUESTIONS.filter((question) => {
      if (folder !== "all" && question.folder !== folder) return false;
      if (topic !== "all" && question.topic !== topic) return false;
      if (source === "bookmarks" && !bookmarkSet.has(question.id)) return false;
      if (source === "mistakes" && !mistakeSet.has(question.id)) return false;
      return true;
    });
  }

  function populateTopics() {
    const folder = $("folderSelect").value;
    const current = $("topicSelect").value;
    const available = Object.entries(TOPICS)
      .filter(([key, value]) => key !== "Unknown" && (folder === "all" || value.folder === folder))
      .sort((a, b) => a[1].name.localeCompare(b[1].name, "vi"));
    $("topicSelect").innerHTML =
      '<option value="all">Tất cả chủ đề</option>' +
      available.map(([key, value]) => `<option value="${key}">${escapeHtml(value.name)}</option>`).join("");
    if (available.some(([key]) => key === current)) $("topicSelect").value = current;
    updatePoolPreview();
  }

  function updatePoolPreview() {
    const pool = getFilteredPool();
    $("poolCount").textContent = `${formatNumber(pool.length)} câu phù hợp`;
  }

  function sessionProgress(activeSession = session) {
    if (!activeSession) return { done: 0, total: 0, percent: 0 };
    const done = Object.keys(activeSession.answers || {}).length + Object.keys(activeSession.ratings || {}).length;
    const total = activeSession.questionIds.length;
    return { done, total, percent: total ? Math.round((done / total) * 100) : 0 };
  }

  function computeAccuracy(folder = null) {
    let attempts = 0;
    let correct = 0;
    Object.entries(profile.performance).forEach(([id, stats]) => {
      const question = QUESTION_MAP.get(Number(id));
      if (!question || (folder && question.folder !== folder)) return;
      attempts += Number(stats.attempts || 0);
      correct += Number(stats.correct || 0);
    });
    return { attempts, correct, accuracy: attempts ? Math.round((correct / attempts) * 100) : null };
  }

  function computeStreak() {
    const activeDays = new Set(Object.keys(profile.activity).filter((key) => profile.activity[key] > 0));
    let streak = 0;
    const cursor = new Date();
    if (!activeDays.has(todayKey(cursor))) cursor.setDate(cursor.getDate() - 1);
    while (activeDays.has(todayKey(cursor))) {
      streak += 1;
      cursor.setDate(cursor.getDate() - 1);
    }
    return streak;
  }

  function renderWeek() {
    const formatter = new Intl.DateTimeFormat("vi-VN", { weekday: "short" });
    const days = [];
    for (let offset = 6; offset >= 0; offset -= 1) {
      const date = new Date();
      date.setDate(date.getDate() - offset);
      const count = Number(profile.activity[todayKey(date)] || 0);
      days.push(
        `<div class="day"><i style="--activity:${Math.min(100, count * 8)}%"></i>${escapeHtml(
          formatter.format(date).replace("Th ", "T"),
        )}</div>`,
      );
    }
    $("weekStrip").innerHTML = days.join("");
  }

  function renderDashboardStats() {
    const overall = computeAccuracy();
    const gt = computeAccuracy("GT1");
    const dstt = computeAccuracy("DSTT1");
    const percent = overall.accuracy ?? 0;
    $("accuracyValue").textContent = overall.accuracy === null ? "--" : `${percent}%`;
    $("accuracyRing").style.background =
      `radial-gradient(circle, #5b1c33 55%, transparent 57%), conic-gradient(#fda4af 0 ${percent}%, rgba(255,255,255,.16) ${percent}% 100%)`;
    $("attemptedValue").textContent = formatNumber(overall.attempts);
    $("streakValue").textContent = computeStreak();
    $("mistakeCount").textContent = `${formatNumber(Object.keys(profile.mistakes).length)} câu sai`;
    $("bookmarkCount").textContent = `${formatNumber(profile.bookmarks.length)} câu đánh dấu`;
    $("gtAccuracy").textContent = gt.accuracy === null ? "--" : `${gt.accuracy}%`;
    $("dsttAccuracy").textContent = dstt.accuracy === null ? "--" : `${dstt.accuracy}%`;
    renderWeek();
    renderResume();
  }

  function renderResume() {
    const card = $("resumeCard");
    if (!session || session.submitted) {
      card.classList.add("hidden");
      return;
    }
    const progress = sessionProgress();
    const updated = session.updatedAt ? new Date(session.updatedAt).toLocaleString("vi-VN") : "vừa xong";
    card.classList.remove("hidden");
    $("resumeTitle").textContent = `${folderName(session.settings?.folder)} · ${progress.done}/${progress.total} câu`;
    $("resumeMeta").textContent = `${progress.percent}% hoàn thành · lưu lúc ${updated}`;
  }

  function renderTopicCards() {
    const counts = QUESTIONS.reduce((result, question) => {
      result[question.topic] = (result[question.topic] || 0) + 1;
      return result;
    }, {});
    const entries = Object.entries(TOPICS)
      .filter(([key]) => key !== "Unknown" && counts[key])
      .sort((a, b) => counts[b[0]] - counts[a[0]]);
    const visible = topicsExpanded ? entries : entries.slice(0, 8);
    $("topicGrid").innerHTML = visible
      .map(
        ([key, topic]) => `
          <button class="topic-card" type="button" data-topic="${key}">
            <span>${escapeHtml(topic.short)}</span>
            <strong>${escapeHtml(topic.name)}</strong>
            <small>${formatNumber(counts[key])} câu · ${escapeHtml(folderName(topic.folder))}</small>
          </button>`,
      )
      .join("");
    $("showAllTopicsBtn").textContent = topicsExpanded ? "Thu gọn" : "Xem tất cả";
    $$(".topic-card").forEach((button) => {
      button.addEventListener("click", () => {
        const topic = button.dataset.topic;
        $("folderSelect").value = TOPICS[topic].folder;
        populateTopics();
        $("topicSelect").value = topic;
        updatePoolPreview();
        document.querySelector(".setup-card").scrollIntoView({ behavior: "smooth", block: "center" });
      });
    });
  }

  function beginSession(options = {}) {
    const pool = options.ids
      ? options.ids.map(Number).map((id) => QUESTION_MAP.get(id)).filter(Boolean)
      : getFilteredPool();
    if (!pool.length) {
      showToast("Chưa có câu hỏi phù hợp với bộ lọc này.");
      return;
    }
    if (session && !session.submitted && sessionProgress().done > 0 && !options.replace) {
      if (!window.confirm("Bạn đang có một bài làm dở. Tạo phiên mới sẽ thay thế bài đó. Tiếp tục?")) return;
    }
    const shouldShuffle = options.shuffle ?? $("shuffleSelect").value === "yes";
    const ordered = shouldShuffle ? shuffle(pool) : [...pool].sort((a, b) => a.id - b.id);
    const requested = options.count ?? $("countSelect").value;
    const count = requested === "all" ? ordered.length : Math.min(Number(requested) || 20, ordered.length);
    const minutes = Number(options.minutes ?? $("minutesSelect").value) || 0;
    const mode = options.mode || selectedMode;
    const startedAt = Date.now();
    session = {
      version: BACKUP_VERSION,
      id: `session-${startedAt}`,
      mode,
      questionIds: ordered.slice(0, count).map((question) => question.id),
      index: 0,
      answers: {},
      checked: {},
      graded: {},
      ratings: {},
      revealed: {},
      startedAt,
      durationSec: minutes * 60,
      endsAt: minutes ? startedAt + minutes * 60 * 1000 : null,
      submitted: false,
      settings: {
        folder: options.folder || $("folderSelect").value,
        topic: options.topic || $("topicSelect").value,
        source: options.source || $("sourceSelect").value,
        shuffle: shouldShuffle,
      },
      updatedAt: nowIso(),
    };
    persistSession("Đã tạo bài");
    startTimer();
    renderQuiz();
    showView("quizView");
  }

  function resumeSession() {
    if (!session) return;
    selectedMode = session.mode || "practice";
    startTimer();
    renderQuiz();
    showView("quizView");
  }

  function discardSession() {
    if (!session) return;
    if (sessionProgress().done > 0 && !window.confirm("Bỏ bài đang làm dở? Tiến độ của bài này sẽ bị xóa.")) return;
    session = null;
    localStorage.removeItem(SESSION_KEY);
    renderDashboardStats();
    showToast("Đã bỏ bài đang làm dở.");
  }

  function startTimer() {
    clearInterval(timerInterval);
    updateTimer();
    timerInterval = setInterval(updateTimer, 1000);
  }

  function updateTimer() {
    if (!session || session.submitted) {
      clearInterval(timerInterval);
      return;
    }
    const timer = $("timer");
    if (!session.endsAt) {
      timer.textContent = "--:--";
      timer.classList.remove("warning");
      return;
    }
    const remaining = Math.max(0, Math.ceil((session.endsAt - Date.now()) / 1000));
    const minutes = Math.floor(remaining / 60);
    const seconds = remaining % 60;
    timer.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    timer.classList.toggle("warning", remaining <= 300);
    if (remaining <= 0) {
      clearInterval(timerInterval);
      submitSession(true);
    }
  }

  function renderQuiz() {
    if (!session || !session.questionIds.length) return;
    session.index = Math.min(Math.max(0, Number(session.index) || 0), session.questionIds.length - 1);
    const question = currentQuestion();
    if (!question) return;
    const progress = sessionProgress();
    const marked = new Set(profile.bookmarks.map(Number));
    const isExam = session.mode === "exam";
    const isFlashcard = session.mode === "flashcard";
    const isChecked = Boolean(session.checked[question.id]);
    const selected = session.answers[question.id] || "";

    $("quizTitle").textContent =
      session.mode === "exam" ? "Thi thử" : session.mode === "flashcard" ? "Flashcard" : "Luyện tập";
    $("positionStat").textContent = `${session.index + 1}/${session.questionIds.length}`;
    $("doneStat").textContent = progress.done;
    $("markedStat").textContent = session.questionIds.filter((id) => marked.has(id)).length;
    $("correctStat").textContent = session.questionIds.filter(
      (id) => session.checked[id] && session.answers[id] === QUESTION_MAP.get(id)?.answer,
    ).length;
    $("liveCorrectMetric").classList.toggle("hidden", isExam);
    $("progressBar").style.width = `${((session.index + 1) / session.questionIds.length) * 100}%`;
    $("questionNumber").textContent = `Câu ${question.id}`;
    $("questionTopic").textContent = topicName(question.topic);

    // V2 LaTeX question handling
    const hasLatex = typeof question.question === "string" && question.question.trim().length > 0;
    const latexStage = $("latexStage");
    const imageStage = $("imageStage");
    const toggleImageBtn = $("toggleImageBtn");
    const confidenceBadge = $("confidenceBadge");

    if (hasLatex && latexStage) {
      latexStage.classList.remove("hidden");
      $("latexQuestionText").innerHTML = escapeHtml(question.question).replace(/\n/g, "<br>");

      if (!session.showOriginalImage) session.showOriginalImage = {};
      const forceImage = Boolean(question.needs_image || session.showOriginalImage[question.id]);
      imageStage.classList.toggle("hidden", !forceImage);

      if (toggleImageBtn) {
        toggleImageBtn.textContent = forceImage ? "Ẩn bớt ảnh" : "📷 Xem ảnh gốc";
      }

      if (confidenceBadge) {
        if (question.confidence === "high") {
          confidenceBadge.textContent = "Độ tin cậy: Cao";
          confidenceBadge.className = "confidence-badge high";
        } else {
          confidenceBadge.textContent = "Cần xem xét";
          confidenceBadge.className = "confidence-badge medium";
        }
      }
      typesetMath(latexStage);
    } else {
      if (latexStage) latexStage.classList.add("hidden");
      imageStage.classList.remove("hidden");
    }

    $("questionImage").src = `assets/questions/${encodeURIComponent(question.image)}`;
    $("questionImage").alt = `Nội dung câu hỏi ${question.id}: ${topicName(question.topic)}`;
    setZoom(1);

    const markButton = $("markBtn");
    const isMarked = marked.has(question.id);
    markButton.classList.toggle("active", isMarked);
    markButton.setAttribute("aria-pressed", String(isMarked));
    markButton.textContent = isMarked ? "★ Đã đánh dấu" : "☆ Đánh dấu";

    $("answerOptions").classList.toggle("hidden", isFlashcard);
    $("flashcardPanel").classList.toggle("hidden", !isFlashcard);
    $("checkBtn").classList.toggle("hidden", isExam || isFlashcard);
    $("submitBtn").textContent = isExam ? "Nộp bài" : "Kết thúc";

    if (!isFlashcard) {
      const hasRichOptions = Array.isArray(question.options) &&
        question.options.some((opt) => typeof opt === "string" && (opt.length > 2 || opt.includes("\\")));

      const letters = ["A", "B", "C", "D", "E", "F"];
      const optionList = Array.isArray(question.options) && question.options.length > 0
        ? question.options.slice(0, 6)
        : letters;

      $("answerOptions").classList.toggle("rich-options", hasRichOptions);
      $("answerOptions").innerHTML = optionList
        .map((optContent, idx) => {
          const letter = letters[idx];
          const classes = ["answer-option"];
          if (hasRichOptions) classes.push("rich-option");
          if (selected === letter) classes.push("selected");
          if (!isExam && isChecked && question.answer === letter) classes.push("correct");
          if (!isExam && isChecked && selected === letter && question.answer !== letter) classes.push("wrong");

          const content = hasRichOptions
            ? `<span class="option-badge">${letter}</span><span class="option-math">${escapeHtml(optContent)}</span>`
            : letter;

          return `<button class="${classes.join(" ")}" type="button" data-answer="${letter}" ${
            !isExam && isChecked ? "disabled" : ""
          } aria-pressed="${selected === letter}">${content}</button>`;
        })
        .join("");
      $$(".answer-option").forEach((button) =>
        button.addEventListener("click", () => chooseAnswer(button.dataset.answer)),
      );
      if (hasRichOptions) {
        typesetMath($("answerOptions"));
      }
    } else {
      const revealed = Boolean(session.revealed[question.id]);
      $("revealBtn").classList.toggle("hidden", revealed);
      $("flashcardAnswer").classList.toggle("hidden", !revealed);
      $("ratingButtons").classList.toggle("hidden", !revealed);
      $("flashcardAnswer").textContent = `Đáp án đúng: ${question.answer}`;
    }

    renderFeedback(question);
    renderQuestionGrid();
    $("prevBtn").disabled = session.index === 0;
    $("nextBtn").textContent = session.index === session.questionIds.length - 1 ? "Hoàn thành →" : "Câu sau →";
    preloadNextImage();
  }

  function renderFeedback(question) {
    const feedback = $("answerFeedback");
    const explanationBox = $("explanationBox");
    const explanationContent = $("explanationContent");
    const explanationToggle = $("explanationToggle");

    if (session.mode === "exam" || session.mode === "flashcard" || !session.checked[question.id]) {
      feedback.className = "answer-feedback hidden";
      feedback.textContent = "";
      if (explanationBox) explanationBox.classList.add("hidden");
      return;
    }
    const correct = session.answers[question.id] === question.answer;
    feedback.className = `answer-feedback ${correct ? "good" : "bad"}`;
    feedback.textContent = correct
      ? `✓ Chính xác — đáp án ${question.answer}.`
      : `✕ Chưa đúng — bạn chọn ${session.answers[question.id] || "chưa chọn"}, đáp án đúng là ${question.answer}.`;

    if (explanationBox && Array.isArray(question.explanation) && question.explanation.length > 0) {
      explanationBox.classList.remove("hidden");
      explanationContent.innerHTML = question.explanation
        .map((step) => `<div class="explanation-step">${escapeHtml(step)}</div>`)
        .join("");
      explanationContent.classList.remove("hidden");
      if (explanationToggle) {
        explanationToggle.setAttribute("aria-expanded", "true");
        const chevron = explanationToggle.querySelector(".chevron");
        if (chevron) chevron.textContent = "▲";
      }
      typesetMath(explanationBox);
    } else if (explanationBox) {
      explanationBox.classList.add("hidden");
    }
  }

  function renderQuestionGrid() {
    const marked = new Set(profile.bookmarks.map(Number));
    $("questionGrid").innerHTML = session.questionIds
      .map((id, index) => {
        const classes = ["question-jump"];
        if (session.answers[id] || session.ratings[id]) classes.push("answered");
        if (index === session.index) classes.push("current");
        if (marked.has(id)) classes.push("marked");
        return `<button type="button" class="${classes.join(" ")}" data-index="${index}" aria-label="Đến câu ${
          index + 1
        }">${index + 1}</button>`;
      })
      .join("");
    $$(".question-jump").forEach((button) =>
      button.addEventListener("click", () => {
        session.index = Number(button.dataset.index);
        persistSession();
        renderQuiz();
        document.querySelector(".question-navigator")?.classList.remove("open");
      }),
    );
  }

  function chooseAnswer(letter) {
    if (!session || session.mode === "flashcard") return;
    const question = currentQuestion();
    if (!question || (session.mode !== "exam" && session.checked[question.id])) return;
    session.answers[question.id] = letter;
    persistSession();
    renderQuiz();
  }

  function recordGrade(question, isCorrect, source = "answer") {
    if (!question || session.graded[question.id]) return;
    session.graded[question.id] = true;
    const key = String(question.id);
    const stats = profile.performance[key] || { attempts: 0, correct: 0, wrong: 0 };
    stats.attempts += 1;
    if (isCorrect) stats.correct += 1;
    else stats.wrong += 1;
    stats.lastAt = nowIso();
    stats.lastResult = isCorrect ? "correct" : source;
    profile.performance[key] = stats;
    if (isCorrect) {
      delete profile.mistakes[key];
    } else {
      const previous = profile.mistakes[key] || { wrongCount: 0 };
      profile.mistakes[key] = { wrongCount: Number(previous.wrongCount || 0) + 1, lastAt: nowIso() };
    }
    const day = todayKey();
    profile.activity[day] = Number(profile.activity[day] || 0) + 1;
    persistProfile();
  }

  function checkCurrent() {
    if (!session || session.mode !== "practice") return;
    const question = currentQuestion();
    const selected = session.answers[question.id];
    if (!selected) {
      showToast("Hãy chọn một đáp án trước.");
      return;
    }
    session.checked[question.id] = true;
    recordGrade(question, selected === question.answer);
    persistSession();
    renderQuiz();
  }

  function revealFlashcard() {
    if (!session || session.mode !== "flashcard") return;
    const question = currentQuestion();
    session.revealed[question.id] = true;
    persistSession();
    renderQuiz();
  }

  function rateFlashcard(rating) {
    if (!session || session.mode !== "flashcard") return;
    const question = currentQuestion();
    session.ratings[question.id] = rating;
    recordGrade(question, rating === "good", rating);
    persistSession();
    if (session.index < session.questionIds.length - 1) {
      session.index += 1;
      renderQuiz();
    } else {
      submitSession(false);
    }
  }

  function moveQuestion(direction) {
    if (!session) return;
    const nextIndex = session.index + direction;
    if (nextIndex >= session.questionIds.length) {
      submitSession(false);
      return;
    }
    session.index = Math.min(Math.max(0, nextIndex), session.questionIds.length - 1);
    persistSession();
    renderQuiz();
  }

  function toggleBookmark() {
    const question = currentQuestion();
    if (!question) return;
    const bookmarks = new Set(profile.bookmarks.map(Number));
    if (bookmarks.has(question.id)) bookmarks.delete(question.id);
    else bookmarks.add(question.id);
    profile.bookmarks = [...bookmarks].sort((a, b) => a - b);
    persistProfile();
    persistSession(bookmarks.has(question.id) ? "Đã đánh dấu" : "Đã bỏ dấu");
    renderQuiz();
  }

  function buildResult(activeSession) {
    let correct = 0;
    let wrong = 0;
    let unanswered = 0;
    const review = [];
    activeSession.questionIds.forEach((id) => {
      const question = QUESTION_MAP.get(id);
      if (!question) return;
      if (activeSession.mode === "flashcard") {
        const rating = activeSession.ratings[id];
        if (!rating) unanswered += 1;
        else if (rating === "good") correct += 1;
        else {
          wrong += 1;
          review.push({ question, selected: rating === "again" ? "Quên" : "Khó" });
        }
        return;
      }
      const selected = activeSession.answers[id];
      if (!selected) {
        unanswered += 1;
        review.push({ question, selected: "Chưa trả lời" });
      } else if (selected === question.answer) {
        correct += 1;
      } else {
        wrong += 1;
        review.push({ question, selected });
      }
    });
    const total = activeSession.questionIds.length;
    const score = total ? Math.round((correct / total) * 100) : 0;
    return { correct, wrong, unanswered, total, score, review };
  }

  function submitSession(autoSubmitted = false) {
    if (!session || session.submitted) return;
    if (!autoSubmitted && session.mode === "exam") {
      const unanswered = session.questionIds.length - Object.keys(session.answers).length;
      const detail = unanswered ? ` Bạn còn ${unanswered} câu chưa trả lời.` : "";
      if (!window.confirm(`Nộp bài ngay?${detail}`)) return;
    }
    const result = buildResult(session);
    session.questionIds.forEach((id) => {
      if (session.graded[id]) return;
      const question = QUESTION_MAP.get(id);
      if (session.mode === "flashcard") {
        const rating = session.ratings[id];
        if (rating) recordGrade(question, rating === "good", rating);
      } else {
        const selected = session.answers[id];
        if (selected) recordGrade(question, selected === question.answer);
      }
    });
    session.submitted = true;
    session.submittedAt = nowIso();
    session.result = result;
    const elapsedSeconds = Math.max(0, Math.round((Date.now() - session.startedAt) / 1000));
    profile.history.unshift({
      id: session.id,
      at: session.submittedAt,
      mode: session.mode,
      folder: session.settings?.folder || "all",
      topic: session.settings?.topic || "all",
      total: result.total,
      correct: result.correct,
      wrong: result.wrong,
      unanswered: result.unanswered,
      score: result.score,
      durationSec: elapsedSeconds,
    });
    profile.history = profile.history.slice(0, 50);
    persistProfile();
    lastResultSession = JSON.parse(JSON.stringify(session));
    localStorage.removeItem(SESSION_KEY);
    session = null;
    clearInterval(timerInterval);
    renderResults(lastResultSession, autoSubmitted);
  }

  function renderResults(resultSession, autoSubmitted = false) {
    const result = resultSession.result || buildResult(resultSession);
    const duration = Math.max(0, Math.round((Date.now() - resultSession.startedAt) / 1000));
    $("resultHeading").textContent = autoSubmitted ? "Hết giờ — bài đã được nộp" : "Kết quả của bạn";
    $("resultScore").textContent = `${result.score}%`;
    $("resultMessage").textContent =
      result.score >= 80
        ? "Rất tốt. Hãy luyện lại vài câu sai để khóa chặt kiến thức."
        : result.score >= 60
          ? "Nền tảng đã ổn. Phần câu sai sẽ cho bạn biết nên ôn gì tiếp."
          : "Đừng vội nản — sổ câu sai đã lưu lại đúng phần bạn cần luyện.";
    $("resultCorrect").textContent = result.correct;
    $("resultWrong").textContent = result.wrong;
    $("resultUnanswered").textContent = result.unanswered;
    $("resultDuration").textContent =
      duration >= 3600 ? `${Math.floor(duration / 3600)}g ${Math.floor((duration % 3600) / 60)}p` : `${Math.max(1, Math.round(duration / 60))}p`;
    $("retryWrongBtn").disabled = result.review.length === 0;
    $("reviewList").innerHTML = result.review.length
      ? result.review
          .slice(0, 100)
          .map(
            (item) => `
              <div class="review-item">
                <span>${item.question.id}</span>
                <div><strong>${escapeHtml(topicName(item.question.topic))}</strong><small>Bạn chọn: ${escapeHtml(
                  item.selected,
                )}</small></div>
                <span>Đáp án: <b>${escapeHtml(item.question.answer)}</b></span>
              </div>`,
          )
          .join("")
      : '<div class="empty-state">Bạn đã hoàn thành tất cả câu rất tốt 🎉</div>';
    renderDashboardStats();
    showView("resultsView");
  }

  function renderHistory() {
    $("historyList").innerHTML = profile.history.length
      ? profile.history
          .slice(0, 20)
          .map((item) => {
            const label =
              item.topic && item.topic !== "all" ? topicName(item.topic) : folderName(item.folder);
            return `<div class="history-item">
              <div><strong>${escapeHtml(label)}</strong><small>${new Date(item.at).toLocaleString(
                "vi-VN",
              )} · ${item.correct}/${item.total} câu đúng</small></div>
              <span class="history-score">${item.score}%</span>
            </div>`;
          })
          .join("")
      : '<div class="empty-state">Chưa có phiên học nào hoàn thành.</div>';
  }

  function renderSearchResults(query) {
    const normalized = query.trim().toLowerCase();
    if (!normalized) {
      $("searchResults").innerHTML = '<div class="empty-state">Nhập số câu hoặc một từ khóa để bắt đầu tìm.</div>';
      return;
    }
    const numeric = Number(normalized.replace(/[^\d]/g, ""));
    const matches = QUESTIONS.filter((question) => {
      if (numeric && question.id === numeric) return true;
      return `${question.id} ${topicName(question.topic)} ${question.text}`.toLowerCase().includes(normalized);
    }).slice(0, 30);
    $("searchResults").innerHTML = matches.length
      ? matches
          .map(
            (question) => `<button class="search-result" type="button" data-question-id="${question.id}">
              <strong>Câu ${question.id} · ${escapeHtml(topicName(question.topic))}</strong>
              <small>${escapeHtml(question.text || "Không có nội dung OCR")}</small>
            </button>`,
          )
          .join("")
      : '<div class="empty-state">Không tìm thấy câu phù hợp.</div>';
    $$(".search-result").forEach((button) =>
      button.addEventListener("click", () => {
        closeModal("searchModal");
        beginSession({ ids: [Number(button.dataset.questionId)], count: 1, shuffle: false, mode: "practice" });
      }),
    );
  }

  function openModal(id) {
    $(id).classList.remove("hidden");
    if (id === "historyModal") renderHistory();
    if (id === "searchModal") {
      renderSearchResults("");
      setTimeout(() => $("searchInput").focus(), 20);
    }
  }

  function closeModal(id) {
    $(id).classList.add("hidden");
  }

  function exportData() {
    const backup = {
      app: "MAE101 Study Hub",
      version: BACKUP_VERSION,
      exportedAt: nowIso(),
      profile,
      activeSession: session,
    };
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `mae101-backup-${todayKey()}.json`;
    link.click();
    URL.revokeObjectURL(url);
    showToast("Đã xuất bản sao dữ liệu.");
  }

  async function importData(file) {
    try {
      const backup = JSON.parse(await file.text());
      if (backup.version !== BACKUP_VERSION || !backup.profile) throw new Error("invalid");
      profile = { ...defaultProfile(), ...backup.profile };
      session = backup.activeSession || null;
      persistProfile();
      if (session) persistSession();
      else localStorage.removeItem(SESSION_KEY);
      applyTheme(profile.settings.theme);
      renderDashboardStats();
      renderTopicCards();
      closeModal("dataModal");
      showView("dashboardView");
      showToast("Đã khôi phục dữ liệu thành công.");
    } catch {
      showToast("Không thể đọc bản sao này.");
    }
  }

  function clearAllData() {
    if (!window.confirm("Xóa toàn bộ lịch sử, câu sai, đánh dấu và bài đang làm? Hành động này không thể hoàn tác.")) return;
    profile = defaultProfile();
    session = null;
    lastResultSession = null;
    localStorage.removeItem(PROFILE_KEY);
    localStorage.removeItem(SESSION_KEY);
    applyTheme("light");
    renderDashboardStats();
    renderTopicCards();
    closeModal("dataModal");
    showView("dashboardView");
    showToast("Đã xóa toàn bộ tiến độ.");
  }

  function applyTheme(theme) {
    const value = theme === "dark" ? "dark" : "light";
    document.documentElement.dataset.theme = value;
    profile.settings.theme = value;
    $("themeBtn").firstChild.textContent = value === "dark" ? "☀" : "☾";
    persistProfile();
  }

  function toggleTheme() {
    applyTheme(profile.settings.theme === "dark" ? "light" : "dark");
  }

  function setZoom(value) {
    zoom = Math.min(2.2, Math.max(.7, value));
    $("imageStage").style.setProperty("--zoom", zoom);
    $("zoomResetBtn").textContent = `${Math.round(zoom * 100)}%`;
  }

  function preloadNextImage() {
    if (!session || session.index >= session.questionIds.length - 1) return;
    const next = QUESTION_MAP.get(session.questionIds[session.index + 1]);
    if (!next) return;
    const image = new Image();
    image.src = `assets/questions/${encodeURIComponent(next.image)}`;
  }

  function startSpecial(source) {
    $("folderSelect").value = "all";
    populateTopics();
    $("topicSelect").value = "all";
    $("sourceSelect").value = source;
    updatePoolPreview();
    const pool = getFilteredPool();
    if (!pool.length) {
      showToast(source === "mistakes" ? "Bạn chưa có câu sai cần ôn." : "Bạn chưa đánh dấu câu nào.");
      return;
    }
    beginSession({ source, mode: "practice", count: Math.min(20, pool.length) });
  }

  function goHome() {
    clearInterval(timerInterval);
    renderDashboardStats();
    showView("dashboardView");
  }

  function bindEvents() {
    $$("#modeControl button").forEach((button) => button.addEventListener("click", () => setMode(button.dataset.mode)));
    $("folderSelect").addEventListener("change", populateTopics);
    ["topicSelect", "sourceSelect", "countSelect"].forEach((id) => $(id).addEventListener("change", updatePoolPreview));
    $("startBtn").addEventListener("click", () => beginSession());
    $("quickStartBtn").addEventListener("click", () =>
      beginSession({ ids: QUESTIONS.map((question) => question.id), count: 20, minutes: 0, mode: "practice", shuffle: true }),
    );
    ["reviewMistakesBtn", "mistakeShortcut"].forEach((id) => $(id).addEventListener("click", () => startSpecial("mistakes")));
    $("bookmarkShortcut").addEventListener("click", () => startSpecial("bookmarks"));
    $("resumeBtn").addEventListener("click", resumeSession);
    $("discardResumeBtn").addEventListener("click", discardSession);
    $("homeBtn").addEventListener("click", goHome);
    $("exitQuizBtn").addEventListener("click", goHome);
    $("prevBtn").addEventListener("click", () => moveQuestion(-1));
    $("nextBtn").addEventListener("click", () => moveQuestion(1));
    $("checkBtn").addEventListener("click", checkCurrent);
    $("markBtn").addEventListener("click", toggleBookmark);
    $("submitBtn").addEventListener("click", () => submitSession(false));
    $("revealBtn").addEventListener("click", revealFlashcard);
    $$("#ratingButtons button").forEach((button) =>
      button.addEventListener("click", () => rateFlashcard(button.dataset.rating)),
    );
    $("zoomOutBtn").addEventListener("click", () => setZoom(zoom - .15));
    $("zoomInBtn").addEventListener("click", () => setZoom(zoom + .15));
    $("zoomResetBtn").addEventListener("click", () => setZoom(1));
    $("toggleImageBtn")?.addEventListener("click", () => {
      if (!session) return;
      if (!session.showOriginalImage) session.showOriginalImage = {};
      const qid = session.questionIds[session.index];
      session.showOriginalImage[qid] = !session.showOriginalImage[qid];
      const isVisible = session.showOriginalImage[qid];
      $("imageStage").classList.toggle("hidden", !isVisible);
      $("toggleImageBtn").textContent = isVisible ? "Ẩn bớt ảnh" : "📷 Xem ảnh gốc";
    });
    $("explanationToggle")?.addEventListener("click", () => {
      const isExpanded = !$("explanationContent").classList.contains("hidden");
      $("explanationContent").classList.toggle("hidden", isExpanded);
      $("explanationToggle").setAttribute("aria-expanded", String(!isExpanded));
      const chevron = $("explanationToggle").querySelector(".chevron");
      if (chevron) chevron.textContent = isExpanded ? "▼" : "▲";
      if (!isExpanded) {
        typesetMath($("explanationContent"));
      }
    });
    $("navigatorFab").addEventListener("click", () => document.querySelector(".question-navigator").classList.add("open"));
    $("closeNavigatorBtn").addEventListener("click", () => document.querySelector(".question-navigator").classList.remove("open"));
    $("retryWrongBtn").addEventListener("click", () => {
      if (!lastResultSession) return;
      const ids = lastResultSession.result.review.map((item) => item.question.id);
      beginSession({ ids, count: "all", shuffle: true, mode: "practice", replace: true });
    });
    $("newSessionBtn").addEventListener("click", goHome);
    $("showAllTopicsBtn").addEventListener("click", () => {
      topicsExpanded = !topicsExpanded;
      renderTopicCards();
    });

    $("searchToggleBtn").addEventListener("click", () => openModal("searchModal"));
    $("historyBtn").addEventListener("click", () => openModal("historyModal"));
    $("themeBtn").addEventListener("click", toggleTheme);
    $("dataBtn").addEventListener("click", () => openModal("dataModal"));
    $$("[data-close-modal]").forEach((button) =>
      button.addEventListener("click", () => closeModal(button.dataset.closeModal)),
    );
    $$(".modal-backdrop").forEach((backdrop) =>
      backdrop.addEventListener("click", (event) => {
        if (event.target === backdrop) closeModal(backdrop.id);
      }),
    );
    $("searchInput").addEventListener("input", (event) => renderSearchResults(event.target.value));
    $("exportBtn").addEventListener("click", exportData);
    $("importBtn").addEventListener("click", () => $("importFile").click());
    $("importFile").addEventListener("change", (event) => {
      const [file] = event.target.files;
      if (file) importData(file);
      event.target.value = "";
    });
    $("clearDataBtn").addEventListener("click", clearAllData);

    document.addEventListener("keydown", (event) => {
      if (event.target.matches("input, select, textarea") || !session || $("quizView").classList.contains("hidden")) return;
      const key = event.key.toUpperCase();
      if (["A", "B", "C", "D", "E", "F"].includes(key)) chooseAnswer(key);
      else if (event.key === "ArrowRight" || key === "N") moveQuestion(1);
      else if (event.key === "ArrowLeft" || key === "P") moveQuestion(-1);
      else if (key === "M") toggleBookmark();
      else if (event.key === "Enter") {
        if (session.mode === "practice") checkCurrent();
        else if (session.mode === "flashcard") revealFlashcard();
      }
    });
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden" && session) persistSession();
    });
    window.addEventListener("beforeunload", () => {
      if (session) persistSession();
    });
  }

  function initialize() {
    if (!QUESTIONS.length) {
      document.body.innerHTML = '<main class="empty-state">Không thể tải dữ liệu câu hỏi.</main>';
      return;
    }
    applyTheme(profile.settings.theme);
    setMode("practice");
    populateTopics();
    renderTopicCards();
    renderDashboardStats();
    bindEvents();
    showView("dashboardView");
    if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
      navigator.serviceWorker.register("sw.js").catch(() => {});
    }
  }

  initialize();
})();
