/**
 * MAD101 STUDIO — STORAGE & DATA LAYER
 * js/store.js
 * 
 * Safely manages user progress, history, bookmarks, and settings.
 * Fully backwards-compatible with legacy keys:
 *   - 'quiz_progress'
 *   - 'quiz_practice_state'
 * Creates a safety backup before migration.
 */

const STORAGE_KEYS = {
  PROFILE: 'mad101_v2_profile',
  SESSION: 'mad101_v2_active_session',
  BACKUP: 'mad101_legacy_backup',
  LEGACY_PROGRESS: 'quiz_progress',
  LEGACY_STATE: 'quiz_practice_state'
};

const DEFAULT_PROFILE = {
  version: 2,
  createdAt: new Date().toISOString(),
  bookmarks: [],       // array of question IDs
  wrongQuestionIds: [], // accumulated wrong question IDs
  history: [],         // array of past quiz results
  chapterStats: {},    // { [chId]: { total: 0, correct: 0, done: 0 } }
  settings: {
    theme: 'light',
    fontSize: 'normal',
    sound: false,
    vibrate: true,
    autoNext: true,
    confirmSubmit: true,
    showPendingQuestions: false
  }
};

class Store {
  constructor() {
    this.profile = null;
    this.init();
  }

  safeParse(jsonStr, fallback) {
    if (!jsonStr) return fallback;
    try {
      return JSON.parse(jsonStr);
    } catch (e) {
      console.warn('[Store] JSON parse error:', e);
      return fallback;
    }
  }

  init() {
    // 1. Check if backup already made
    const hasBackup = localStorage.getItem(STORAGE_KEYS.BACKUP);
    const legacyProg = localStorage.getItem(STORAGE_KEYS.LEGACY_PROGRESS);
    const legacyState = localStorage.getItem(STORAGE_KEYS.LEGACY_STATE);

    if (!hasBackup && (legacyProg || legacyState)) {
      // Create safe snapshot backup
      const backupData = {
        timestamp: new Date().toISOString(),
        legacy_quiz_progress: this.safeParse(legacyProg, null),
        legacy_quiz_practice_state: this.safeParse(legacyState, null)
      };
      localStorage.setItem(STORAGE_KEYS.BACKUP, JSON.stringify(backupData));
      console.log('[Store] Legacy data safely backed up to', STORAGE_KEYS.BACKUP);
    }

    // 2. Load or initialize profile
    const rawProfile = localStorage.getItem(STORAGE_KEYS.PROFILE);
    if (rawProfile) {
      this.profile = { ...DEFAULT_PROFILE, ...this.safeParse(rawProfile, {}) };
    } else {
      this.profile = JSON.parse(JSON.stringify(DEFAULT_PROFILE));

      // Attempt safe migration from legacy if profile is new
      if (legacyProg) {
        const prog = this.safeParse(legacyProg, null);
        if (prog && prog.answers) {
          const ansCount = Object.keys(prog.answers).length;
          console.log(`[Store] Migrating legacy progress with ${ansCount} answered questions.`);
        }
      }

      this.saveProfile();
    }
  }

  // --- Profile methods ---
  getProfile() {
    return this.profile;
  }

  saveProfile() {
    try {
      localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(this.profile));
    } catch (e) {
      console.error('[Store] Could not save profile:', e);
    }
  }

  // --- Active Session (Ongoing quiz) ---
  getActiveSession() {
    const raw = localStorage.getItem(STORAGE_KEYS.SESSION);
    if (raw) {
      return this.safeParse(raw, null);
    }

    // Fallback: check legacy quiz_progress if active session is empty
    const legacy = localStorage.getItem(STORAGE_KEYS.LEGACY_PROGRESS);
    if (legacy) {
      const parsed = this.safeParse(legacy, null);
      if (parsed && parsed.answers && Object.keys(parsed.answers).length > 0) {
        return {
          chapterId: parsed.chapterId || 0,
          currentIndex: parsed.currentIndex || 0,
          answers: parsed.answers,
          isLegacy: true,
          updatedAt: Date.now()
        };
      }
    }

    return null;
  }

  saveActiveSession(sessionData) {
    try {
      const data = {
        ...sessionData,
        updatedAt: Date.now()
      };
      localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(data));

      // Also maintain legacy key for backwards compatibility
      if (sessionData.chapterId !== undefined && sessionData.answers) {
        const legacyFormat = {
          chapterId: sessionData.chapterId,
          answers: sessionData.answers,
          currentIndex: sessionData.currentIndex || 0
        };
        localStorage.setItem(STORAGE_KEYS.LEGACY_PROGRESS, JSON.stringify(legacyFormat));
      }
    } catch (e) {
      console.error('[Store] Failed to save active session:', e);
    }
  }

  clearActiveSession() {
    localStorage.removeItem(STORAGE_KEYS.SESSION);
    localStorage.removeItem(STORAGE_KEYS.LEGACY_PROGRESS);
    localStorage.removeItem(STORAGE_KEYS.LEGACY_STATE);
  }

  // --- History & Stats ---
  addHistory(record) {
    if (!this.profile.history) this.profile.history = [];
    
    const entry = {
      id: 'quiz_' + Date.now(),
      date: new Date().toISOString(),
      score: record.score,
      total: record.total,
      correct: record.correct,
      wrong: record.wrong,
      durationSec: record.durationSec || 0,
      mode: record.mode || 'practice',
      chapterName: record.chapterName || 'Tất cả chương',
      chapterId: record.chapterId || 0,
      breakdown: record.breakdown || {},
      wrongQuestionIds: record.wrongQuestionIds || []
    };

    this.profile.history.unshift(entry);
    if (this.profile.history.length > 50) {
      this.profile.history.pop();
    }

    // Accumulate wrong questions
    if (entry.wrongQuestionIds && entry.wrongQuestionIds.length > 0) {
      const set = new Set([...(this.profile.wrongQuestionIds || []), ...entry.wrongQuestionIds]);
      this.profile.wrongQuestionIds = Array.from(set);
    }

    this.saveProfile();
    return entry;
  }

  // --- Bookmarks (Starred questions) ---
  toggleBookmark(qid) {
    if (!this.profile.bookmarks) this.profile.bookmarks = [];
    const id = Number(qid);
    const index = this.profile.bookmarks.indexOf(id);
    if (index >= 0) {
      this.profile.bookmarks.splice(index, 1);
    } else {
      this.profile.bookmarks.push(id);
    }
    this.saveProfile();
    return this.isBookmarked(id);
  }

  isBookmarked(qid) {
    if (!this.profile.bookmarks) return false;
    return this.profile.bookmarks.includes(Number(qid));
  }

  getBookmarks() {
    return this.profile.bookmarks || [];
  }

  // --- Wrong Questions Tracker ---
  getWrongQuestionIds() {
    return this.profile.wrongQuestionIds || [];
  }

  removeWrongQuestion(qid) {
    if (!this.profile.wrongQuestionIds) return;
    const id = Number(qid);
    this.profile.wrongQuestionIds = this.profile.wrongQuestionIds.filter(x => x !== id);
    this.saveProfile();
  }

  // --- Settings ---
  getSettings() {
    return this.profile.settings || DEFAULT_PROFILE.settings;
  }

  saveSettings(newSettings) {
    this.profile.settings = { ...this.profile.settings, ...newSettings };
    this.saveProfile();
    
    // Apply theme immediately
    if (this.profile.settings.theme) {
      document.documentElement.setAttribute('data-theme', this.profile.settings.theme);
    }
  }

  // --- Reset All Data ---
  resetAllData() {
    this.profile = JSON.parse(JSON.stringify(DEFAULT_PROFILE));
    this.saveProfile();
    this.clearActiveSession();
    return true;
  }
}

export const store = new Store();
