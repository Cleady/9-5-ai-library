/**
 * MAD101 STUDIO — APPLICATION ENTRY POINT
 * js/app.js
 */

import { store } from './store.js';
import { router } from './router.js';
import { initDataLoader, getAllQuestions, getQuestionById } from './data.js';

import { renderHomeScreen } from './screens/home.js';
import { renderSetupScreen } from './screens/setup.js';
import { renderQuizScreen, cleanupQuizScreen } from './screens/quiz.js';
import { renderResultScreen } from './screens/result.js';
import { renderHistoryScreen } from './screens/history.js';
import { renderSettingsScreen } from './screens/settings.js';

// Expose safe API on window
window.MAD101 = {
  store,
  router,
  getAllQuestions,
  getQuestionById
};

// Show global toast
export function showToast(message, icon = '✓') {
  let toastContainer = document.querySelector('.ui-toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.className = 'ui-toast-container';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  toast.className = 'ui-toast';
  toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.25s ease';
    setTimeout(() => toast.remove(), 250);
  }, 2500);
}

// Main initialization
async function initApp() {
  // 1. Apply stored settings
  const settings = store.getSettings();
  document.documentElement.setAttribute('data-theme', settings.theme || 'light');

  // 2. Preload questions data
  const mainView = document.getElementById('mainView');
  if (mainView) {
    mainView.innerHTML = `
      <div class="ui-card ui-empty-state" style="padding:var(--ui-space-12);">
        <div class="ui-skeleton" style="width:120px; height:24px; margin:0 auto var(--ui-space-4);"></div>
        <div class="ui-skeleton" style="width:280px; height:40px; margin:0 auto var(--ui-space-4);"></div>
        <div class="ui-skeleton" style="width:200px; height:16px; margin:0 auto;"></div>
        <p style="margin-top:var(--ui-space-4); color:var(--ui-text-muted); font-size:var(--ui-text-sm);">
          Đang nạp 1,131 câu hỏi Toán rời rạc & hệ thống MathJax...
        </p>
      </div>
    `;
  }

  await initDataLoader();

  // 3. Register screens to router
  router.register('home', (el) => renderHomeScreen(el));
  router.register('setup', (el, params) => renderSetupScreen(el, params));
  router.register('quiz', (el, params) => renderQuizScreen(el, params), cleanupQuizScreen);
  router.register('result', (el) => renderResultScreen(el));
  router.register('history', (el) => renderHistoryScreen(el));
  router.register('settings', (el) => renderSettingsScreen(el));

  // 4. Start Router
  router.init(mainView);

  // 5. Global Theme Toggle Button in Header
  const globalThemeBtn = document.getElementById('globalThemeToggle');
  if (globalThemeBtn) {
    globalThemeBtn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'light' ? 'dark' : 'light';
      store.saveSettings({ theme: next });
    });
  }

  // 6. Register Service Worker for Offline PWA
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('sw.js')
        .then(reg => console.log('[PWA] Service Worker registered with scope:', reg.scope))
        .catch(err => console.warn('[PWA] Service Worker registration failed:', err));
    });
  }
}

// Run when DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
