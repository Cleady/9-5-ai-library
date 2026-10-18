/**
 * File: theme-init.js
 * Nhiệm vụ: Nạp ngay lập tức các cấu hình giao diện (Theme, Accent Color, Font Size, Background Style)
 * từ localStorage lên thẻ <html> TRƯỚC KHI trình duyệt vẽ DOM (render),
 * triệt tiêu 100% hiện tượng chớp nháy sáng/tối (FOUC - Flash of Unstyled Content).
 */
(function () {
  try {
    const raw = localStorage.getItem("lib95:settings:data");
    let appearance = {
      theme: "light",
      accentColor: "blue",
      fontSize: "medium",
      backgroundStyle: "default"
    };

    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        if (parsed && parsed.settings && parsed.settings.appearance) {
          appearance = { ...appearance, ...parsed.settings.appearance };
        }
      } catch (e) {
        console.warn("theme-init: parse error", e);
      }
    } else {
      // Khi khách vãng lai hoặc chưa có cài đặt cá nhân, áp dụng cài đặt mặc định của hệ thống
      try {
        const siteCache = JSON.parse(localStorage.getItem("site_settings_cache") || "{}");
        if (siteCache.default_theme) {
          appearance.theme = siteCache.default_theme === "system" ? "auto" : siteCache.default_theme;
        }
        if (siteCache.default_accent) {
          appearance.accentColor = siteCache.default_accent;
        }
      } catch (e) {}
    }

    const htmlNode = document.documentElement;

    // 1. Áp dụng Theme (light / dark / auto)
    let activeTheme = appearance.theme;
    if (activeTheme === "auto") {
      activeTheme = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    if (activeTheme === "dark") {
      htmlNode.setAttribute("data-theme", "dark");
    } else {
      htmlNode.removeAttribute("data-theme");
    }

    // 2. Áp dụng Accent Color (blue, purple, green, orange, pink)
    const accent = appearance.accentColor || "blue";
    htmlNode.setAttribute("data-accent", accent);

    const colorThemes = {
      blue: { primary: "#1d4ed8", light: "#3b82f6", soft: "#eff6ff" },
      purple: { primary: "#7c3aed", light: "#8b5cf6", soft: "#f5f3ff" },
      green: { primary: "#059669", light: "#10b981", soft: "#ecfdf5" },
      orange: { primary: "#ea580c", light: "#f97316", soft: "#fff7ed" },
      pink: { primary: "#db2777", light: "#ec4899", soft: "#fdf2f8" }
    };
    const currentTheme = colorThemes[accent] || colorThemes.blue;
    htmlNode.style.setProperty("--color-primary", currentTheme.primary);
    htmlNode.style.setProperty("--color-primary-light", currentTheme.light);
    if (activeTheme !== "dark") {
      htmlNode.style.setProperty("--color-primary-soft", currentTheme.soft);
    } else {
      htmlNode.style.removeProperty("--color-primary-soft");
    }

    // 3. Áp dụng Font Size (small, medium, large)
    if (appearance.fontSize) {
      htmlNode.setAttribute("data-fontsize", appearance.fontSize);
    }

    // 4. Áp dụng Background Style (default, blurred)
    if (appearance.backgroundStyle) {
      htmlNode.setAttribute("data-bgstyle", appearance.backgroundStyle);
    }

    // Lắng nghe thay đổi theme của hệ điều hành nếu user chọn auto
    if (window.matchMedia) {
      const media = window.matchMedia("(prefers-color-scheme: dark)");
      media.addEventListener("change", function (e) {
        try {
          const freshData = JSON.parse(localStorage.getItem("lib95:settings:data") || "{}");
          if (freshData?.settings?.appearance?.theme === "auto") {
            if (e.matches) {
              htmlNode.setAttribute("data-theme", "dark");
              htmlNode.style.removeProperty("--color-primary-soft");
            } else {
              htmlNode.removeAttribute("data-theme");
              htmlNode.style.setProperty("--color-primary-soft", currentTheme.soft);
            }
          }
        } catch (err) {}
      });
    }

    // Tự động nạp bộ điều khiển nút chuyển Theme và Đồng bộ thương hiệu toàn trang
    document.addEventListener("DOMContentLoaded", function () {
      if (!window.Lib95?.themeToggle && !document.querySelector('script[src*="theme-toggle.js"]')) {
        const s = document.createElement("script");
        s.src = "/js/theme-toggle.js";
        document.body.appendChild(s);
      }
      if (!window.SiteBranding && !document.querySelector('script[src*="site-branding.js"]')) {
        const sb = document.createElement("script");
        sb.src = "/js/site-branding.js";
        document.body.appendChild(sb);
      }
    });
  } catch (err) {
    console.error("theme-init error:", err);
  }
})();
