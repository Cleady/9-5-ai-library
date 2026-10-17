/**
 * File: settings-appearance.js
 * Mục đích: Manage Live Preview và lưu trữ các tuỳ chọn giao diện (Theme, Accent, Font, Background).
 */

(function () {
  const S = window.Lib95.settings;

  const themeRadios = document.querySelectorAll('input[name="app-theme"]');
  const sizeRadios = document.querySelectorAll('input[name="app-fontsize"]');
  const bgRadios = document.querySelectorAll('input[name="app-bgstyle"]');
  const colorSwatches = document.querySelectorAll('.set-swatch');

  const htmlNode = document.documentElement;
  let sysThemeMatcher = window.matchMedia("(prefers-color-scheme: dark)");

  // Hàm áp dụng thực tế
  S.applyAppearance = function(appearanceObj) {
    if (!appearanceObj) return;

    // 1. Theme
    let theme = appearanceObj.theme;
    if (theme === "auto") {
      theme = sysThemeMatcher.matches ? "dark" : "light";
    }
    if (theme === "dark") {
      htmlNode.setAttribute("data-theme", "dark");
    } else {
      htmlNode.removeAttribute("data-theme");
    }

    // 2. Accent color (Override css variable)
    const colorMap = {
      blue: "#1d4ed8",
      purple: "#7c3aed",
      green: "#059669",
      orange: "#ea580c",
      pink: "#db2777"
    };
    if (colorMap[appearanceObj.accentColor]) {
      htmlNode.style.setProperty("--color-primary", colorMap[appearanceObj.accentColor]);
    }

    // 3. Font Size
    htmlNode.setAttribute("data-fontsize", appearanceObj.fontSize);

    // 4. Background Style
    htmlNode.setAttribute("data-bgstyle", appearanceObj.backgroundStyle);
  };

  function loadAppearanceUI() {
    const appData = S.core.getData().settings.appearance;

    // Set Radios
    themeRadios.forEach(r => r.checked = (r.value === appData.theme));
    sizeRadios.forEach(r => r.checked = (r.value === appData.fontSize));
    bgRadios.forEach(r => r.checked = (r.value === appData.backgroundStyle));

    // Set Swatch active
    colorSwatches.forEach(sw => {
      sw.classList.toggle("is-active", sw.dataset.color === appData.accentColor);
    });

    // Apply lần đầu
    S.applyAppearance(appData);
  }

  function saveAndApply(key, value) {
    const data = S.core.getData();
    data.settings.appearance[key] = value;
    S.core.saveData(data);
    S.applyAppearance(data.settings.appearance);
    S.core.showToast("Appearance đã được lưu", 1500);
  }

  // --- EVENTS ---
  themeRadios.forEach(r => {
    r.addEventListener("change", (e) => saveAndApply("theme", e.target.value));
  });

  sizeRadios.forEach(r => {
    r.addEventListener("change", (e) => saveAndApply("fontSize", e.target.value));
  });

  bgRadios.forEach(r => {
    r.addEventListener("change", (e) => saveAndApply("backgroundStyle", e.target.value));
  });

  colorSwatches.forEach(sw => {
    sw.addEventListener("click", () => {
      // Update UI active state
      colorSwatches.forEach(s => s.classList.remove("is-active"));
      sw.classList.add("is-active");
      saveAndApply("accentColor", sw.dataset.color);
    });
  });

  // Lắng nghe đổi theme hệ thống nếu đang chọn auto
  sysThemeMatcher.addEventListener("change", () => {
    const appData = S.core.getData().settings.appearance;
    if (appData.theme === "auto") {
      S.applyAppearance(appData);
    }
  });

  document.addEventListener("DOMContentLoaded", () => {
    loadAppearanceUI();
  });

})();
