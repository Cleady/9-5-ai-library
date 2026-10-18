/**
 * File: js/theme-toggle.js
 * Nhiệm vụ:
 * 1. Cung cấp nút chuyển đổi Theme nhanh (Quick Switcher) trên:
 *    - Topbar (nút icon mặt trăng / mặt trời cạnh thanh công cụ)
 *    - User menu (#user-menu-list: mục "Giao diện: Sáng / Tối / Tự động")
 *    - Header Landing Page (index.html)
 *    - Form trang Xác thực (Login / Signup / Password Recovery)
 * 2. Đồng bộ 2 chiều với tab Giao diện trong Settings
 * 3. Đồng bộ đa tab tức thì qua sự kiện 'storage'
 * 4. Đồng bộ hệ điều hành khi ở chế độ 'auto' (prefers-color-scheme)
 */

(function () {
  const STORAGE_KEY = "lib95:settings:data";
  const htmlNode = document.documentElement;
  const sysThemeMatcher = window.matchMedia("(prefers-color-scheme: dark)");

  function getSettingsData() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) {
      console.warn("theme-toggle: parse error", e);
    }
    return {
      settings: {
        appearance: {
          theme: "light",
          accentColor: "blue",
          fontSize: "medium",
          backgroundStyle: "default"
        }
      }
    };
  }

  function getCurrentThemeSetting() {
    const data = getSettingsData();
    return (data.settings && data.settings.appearance && data.settings.appearance.theme) || "light";
  }

  function getEffectiveTheme(setting) {
    if (setting === "auto") {
      return sysThemeMatcher.matches ? "dark" : "light";
    }
    return setting === "dark" ? "dark" : "light";
  }

  function applyTheme(setting, triggerTransition = true) {
    const effective = getEffectiveTheme(setting);

    // Smooth transition
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (triggerTransition && !prefersReducedMotion) {
      htmlNode.classList.add("theme-transitioning");
      clearTimeout(window._themeTransitionTimeout);
      window._themeTransitionTimeout = setTimeout(() => {
        htmlNode.classList.remove("theme-transitioning");
      }, 250);
    }

    if (effective === "dark") {
      htmlNode.setAttribute("data-theme", "dark");
    } else {
      htmlNode.removeAttribute("data-theme");
    }

    // Update meta theme-color
    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme) {
      metaTheme.setAttribute("content", effective === "dark" ? "#030712" : "#f5f8ff");
    }

    // Update Settings page radio if active
    const settingRadio = document.querySelector(`input[name="app-theme"][value="${setting}"]`);
    if (settingRadio && !settingRadio.checked) {
      settingRadio.checked = true;
    }

    // Update video poster if on lecture player page
    const lecVideo = document.getElementById("lec-video");
    if (lecVideo) {
      lecVideo.poster = effective === "dark" ? "/assets/theme/darktheme/dark-scene2.png" : "/assets/theme/scene.png";
    }

    // Update all toggle buttons in DOM
    updateToggleButtonsUI(setting, effective);
  }

  function saveAndApplyTheme(newSetting) {
    const data = getSettingsData();
    if (!data.settings) data.settings = {};
    if (!data.settings.appearance) data.settings.appearance = {};
    data.settings.appearance.theme = newSetting;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error("theme-toggle: cannot save to localStorage", e);
    }
    applyTheme(newSetting, true);
  }

  function cycleTheme() {
    const current = getCurrentThemeSetting();
    // Cycle: light -> dark -> auto -> light
    let next = "dark";
    if (current === "dark") next = "auto";
    else if (current === "auto") next = "light";
    saveAndApplyTheme(next);
  }

  function updateToggleButtonsUI(setting, effective) {
    // 1. Topbar & Header icons
    const toggleBtns = document.querySelectorAll(".theme-quick-toggle, .home-page__theme-toggle, .auth-theme-toggle");
    toggleBtns.forEach(btn => {
      const isDark = effective === "dark";
      const iconSpan = btn.querySelector(".theme-icon-indicator");
      if (iconSpan) {
        iconSpan.innerHTML = isDark
          ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`
          : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
      }
      btn.setAttribute("aria-label", `Giao diện: ${setting} (${isDark ? "Đang bật Tối" : "Đang bật Sáng"}). Nhấp để đổi.`);
      btn.setAttribute("title", `Giao diện: ${setting.toUpperCase()} (Nhấp để đổi)`);
    });

    // 2. User Menu label
    const userMenuLabel = document.querySelector(".user-menu-theme-label");
    if (userMenuLabel) {
      const labelMap = { light: "Sáng", dark: "Tối", auto: "Tự động" };
      userMenuLabel.textContent = labelMap[setting] || setting;
    }
  }

  function injectTopbarToggle() {
    // 1. In standard app pages with .topbar-actions
    const topbarActions = document.querySelector(".topbar-actions");
    if (topbarActions && !document.querySelector(".theme-quick-toggle")) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "icon-button theme-quick-toggle";
      btn.innerHTML = `<span class="theme-icon-indicator" aria-hidden="true"></span>`;
      btn.addEventListener("click", cycleTheme);
      // Insert before notification or user-menu
      topbarActions.insertBefore(btn, topbarActions.firstChild);
    }

    // 2. In user-menu-list (#user-menu-list)
    const userMenuList = document.getElementById("user-menu-list");
    if (userMenuList && !document.querySelector(".user-menu-theme-item")) {
      const li = document.createElement("li");
      li.className = "user-menu-theme-item";
      li.setAttribute("role", "none");
      li.innerHTML = `
        <a href="#" role="menuitem" class="user-menu-theme-link">
          <span class="menu-icon theme-icon-indicator" aria-hidden="true" style="display:inline-flex;align-items:center;margin-right:8px;"></span>
          <span>Giao diện: <strong class="user-menu-theme-label">...</strong></span>
        </a>
      `;
      li.querySelector("a").addEventListener("click", (e) => {
        e.preventDefault();
        cycleTheme();
      });
      // Insert before the last item (Đăng xuất)
      const lastItem = userMenuList.lastElementChild;
      if (lastItem) {
        userMenuList.insertBefore(li, lastItem);
      } else {
        userMenuList.appendChild(li);
      }
    }

    // 3. In Landing Page (index.html)
    const landingNav = document.querySelector(".home-page__header-inner");
    if (landingNav && !document.querySelector(".home-page__theme-toggle")) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "home-page__theme-toggle";
      btn.setAttribute("aria-label", "Chuyển đổi giao diện");
      btn.innerHTML = `<span class="theme-icon-indicator" aria-hidden="true"></span>`;
      btn.addEventListener("click", cycleTheme);
      
      const actions = landingNav.querySelector(".home-page__actions");
      const notifWrap = landingNav.querySelector(".home-page__notification-wrap");
      const guestWrap = landingNav.querySelector(".home-page__guest-wrap");
      if (actions) {
        if (notifWrap && notifWrap.parentNode === actions) {
          actions.insertBefore(btn, notifWrap);
        } else if (guestWrap && guestWrap.parentNode === actions) {
          actions.insertBefore(btn, guestWrap);
        } else {
          actions.insertBefore(btn, actions.firstChild);
        }
      } else if (guestWrap && guestWrap.parentNode === landingNav) {
        landingNav.insertBefore(btn, guestWrap);
      } else {
        landingNav.appendChild(btn);
      }
    }

    // 4. In Auth Pages
    const authMain = document.querySelector("body.auth-page, .main > .sidebar, .auth-card");
    if (authMain && !document.querySelector(".auth-theme-toggle")) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "auth-theme-toggle";
      btn.innerHTML = `<span class="theme-icon-indicator" aria-hidden="true"></span>`;
      btn.addEventListener("click", cycleTheme);
      document.body.appendChild(btn);
    }
  }

  // Cross-tab sync
  window.addEventListener("storage", (e) => {
    if (e.key === STORAGE_KEY) {
      applyTheme(getCurrentThemeSetting(), true);
    }
  });

  // OS Dark mode listener for 'auto'
  sysThemeMatcher.addEventListener("change", () => {
    if (getCurrentThemeSetting() === "auto") {
      applyTheme("auto", true);
    }
  });

  // Initialization
  function init() {
    injectTopbarToggle();
    applyTheme(getCurrentThemeSetting(), false);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  // Export globally
  window.Lib95 = window.Lib95 || {};
  window.Lib95.themeToggle = {
    applyTheme,
    saveAndApplyTheme,
    cycleTheme,
    getCurrentThemeSetting
  };
})();
