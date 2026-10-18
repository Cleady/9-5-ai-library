/**
 * js/site-branding.js
 * Đồng bộ cài đặt thương hiệu (Tên website, Logo, Favicon, Liên kết MXH, Giao diện mặc định)
 * áp dụng tức thì trên toàn bộ các trang của 9.5 AI Library.
 * Sử dụng cơ chế Cache-First (localStorage) kết hợp nạp ngầm /api/settings/public.
 */

(function () {
  'use strict';

  const CACHE_KEY = 'site_settings_cache';
  const CACHE_TTL_MS = 5 * 60 * 1000; // 5 phút

  function getCachedSettings() {
    try {
      const raw = localStorage.getItem(CACHE_KEY);
      if (!raw) return null;
      const data = JSON.parse(raw);
      return data;
    } catch (e) {
      return null;
    }
  }

  function setCachedSettings(settings) {
    try {
      const record = {
        ...settings,
        _cachedAt: Date.now()
      };
      localStorage.setItem(CACHE_KEY, JSON.stringify(record));
    } catch (e) {}
  }

  // --- HÀM ÁP DỤNG CẤU HÌNH LÊN DOM ---
  function applyBranding(settings) {
    if (!settings) return;

    const siteName = settings.website_name || '9.5 AI CLUB';
    const logoUrl = settings.logo_url || '/assets/icon/cool_book_128.png';
    const faviconUrl = settings.favicon_url || '/assets/icon/favicon-32.png';
    const socialLinks = settings.social_links || {};

    // 1. CẬP NHẬT TIÊU ĐỀ TRANG (<title>)
    if (document.title) {
      if (/9\.5 AI CLUB/i.test(document.title)) {
        document.title = document.title.replace(/9\.5 AI CLUB/gi, siteName);
      } else if (!document.title.includes(siteName)) {
        // Nếu title chưa chứa tên website
        const parts = document.title.split('|');
        if (parts.length > 1) {
          parts[parts.length - 1] = ` ${siteName}`;
          document.title = parts.join('|');
        } else {
          const dashParts = document.title.split('-');
          if (dashParts.length > 1) {
            dashParts[0] = `${siteName} `;
            document.title = dashParts.join('-');
          }
        }
      }
    } else {
      document.title = siteName;
    }

    // 2. CẬP NHẬT FAVICON (<link rel="icon">)
    if (faviconUrl) {
      let iconLink = document.querySelector("link[rel*='icon']");
      if (!iconLink) {
        iconLink = document.createElement('link');
        iconLink.rel = 'icon';
        iconLink.type = 'image/png';
        document.head.appendChild(iconLink);
      }
      if (iconLink.getAttribute('href') !== faviconUrl) {
        iconLink.href = faviconUrl;
      }
    }

    // 3. CẬP NHẬT LOGO VÀ TÊN TRÊN SIDEBAR / HEADER
    // a) Sidebar Brand
    document.querySelectorAll('.sidebar-brand').forEach(brandEl => {
      const strongEl = brandEl.querySelector('.brand-text strong');
      if (strongEl) strongEl.textContent = siteName;

      const logoSpan = brandEl.querySelector('.brand-logo');
      if (logoSpan && logoUrl) {
        logoSpan.style.backgroundImage = `url("${logoUrl}")`;
      }
    });

    // b) Home Page Header Brand
    document.querySelectorAll('.home-page__brand').forEach(brandEl => {
      const strongEl = brandEl.querySelector('span strong');
      if (strongEl) strongEl.textContent = siteName;

      const iconImg = brandEl.querySelector('.home-page__brand-icon');
      if (iconImg && logoUrl) {
        iconImg.src = logoUrl;
      }
    });

    // c) Home Page Footer Brand
    document.querySelectorAll('.home-page__footer-brand').forEach(brandEl => {
      const strongEl = brandEl.querySelector('span strong');
      if (strongEl) strongEl.textContent = siteName;

      const img = brandEl.querySelector('img');
      if (img && logoUrl) {
        img.src = logoUrl;
      }
    });

    // d) Bản quyền Chân trang (Footers)
    document.querySelectorAll('.admin-footer span:first-child').forEach(span => {
      const currentYear = new Date().getFullYear();
      span.textContent = `© ${currentYear} ${siteName} Admin`;
    });

    document.querySelectorAll('.home-page__footer-bottom span:first-child').forEach(span => {
      const currentYear = new Date().getFullYear();
      span.textContent = `© ${currentYear} ${siteName}. Bảo lưu mọi quyền.`;
    });

    // 4. CẬP NHẬT VÀ ẨN/HIỆN LIÊN KẾT MẠNG XÃ HỘI (FOOTER)
    const socialMap = {
      facebook: ['facebook', 'Facebook'],
      discord: ['discord', 'Discord'],
      youtube: ['youtube', 'YouTube'],
      x: ['x', 'twitter', 'X', 'Twitter'],
      github: ['github', 'GitHub']
    };

    const socialLinksContainer = document.querySelector('.home-page__socials');
    let hasAnyVisibleSocial = false;

    if (socialLinksContainer) {
      for (const [key, aliases] of Object.entries(socialMap)) {
        const url = (socialLinks[key] || '').trim();
        let linkEl = null;

        for (const alias of aliases) {
          linkEl = socialLinksContainer.querySelector(`a[aria-label*="${alias}" i]`);
          if (linkEl) break;
        }

        if (linkEl) {
          if (url && (url.startsWith('http://') || url.startsWith('https://'))) {
            linkEl.href = url;
            linkEl.target = '_blank';
            linkEl.rel = 'noopener noreferrer';
            linkEl.style.display = 'inline-flex';
            hasAnyVisibleSocial = true;
          } else {
            // URL trống: Ẩn biểu tượng, không để href="#"
            linkEl.style.display = 'none';
          }
        }
      }

      // Nếu không có mạng xã hội nào được cấu hình, có thể ẩn cả khối socials
      // nhưng nếu có ít nhất 1 link thì vẫn hiển thị tiêu đề Follow us
    }

    // 5. ÁP DỤNG GIAO DIỆN MẶC ĐỊNH (SYSTEM / LIGHT / DARK) NẾU USER CHƯA CHỌN
    const userSettingsRaw = localStorage.getItem('lib95:settings:data');
    if (!userSettingsRaw && settings.default_theme) {
      let activeTheme = settings.default_theme;
      if (activeTheme === 'system') {
        activeTheme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      }
      if (activeTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
      } else {
        document.documentElement.removeAttribute('data-theme');
      }

      if (settings.default_accent) {
        document.documentElement.setAttribute('data-accent', settings.default_accent);
      }
    }

    // 6. KIỂM SOÁT ĐĂNG KÝ (ALLOW_REGISTRATION)
    if (settings.allow_registration === false || settings.allow_registration === 'false') {
      // Nếu đang ở trang Đăng ký (signup.html)
      if (window.location.pathname.includes('signup.html')) {
        const signupForm = document.querySelector('form.signup-card') || document.querySelector('form');
        if (signupForm && !document.getElementById('reg-closed-warning')) {
          const warning = document.createElement('div');
          warning.id = 'reg-closed-warning';
          warning.style.cssText = `
            background: #fee2e2; border: 1px solid #f87171; color: #991b1b;
            padding: 14px 16px; border-radius: 10px; font-size: 13.5px;
            font-weight: 600; margin-bottom: 20px; line-height: 1.5; text-align: center;
          `;
          warning.textContent = 'Hệ thống hiện đang tạm đóng cổng đăng ký thành viên mới theo quyết định của Quản trị viên.';
          signupForm.prepend(warning);

          const submitBtn = signupForm.querySelector('button[type="submit"]') || signupForm.querySelector('.btn-primary');
          if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.5';
            submitBtn.style.cursor = 'not-allowed';
          }
        }
      }
    }
  }

  // --- NẠP CÀI ĐẶT TỪ PUBLIC API ---
  async function fetchFreshSettings() {
    try {
      const res = await fetch('/api/settings/public', {
        headers: { 'Accept': 'application/json' }
      });
      if (!res.ok) return;

      const data = await res.json();
      setCachedSettings(data);
      applyBranding(data);
    } catch (err) {
      console.warn('site-branding: không thể nạp /api/settings/public', err.message);
    }
  }

  // --- KHỞI TẠO TỨC THÌ ---
  function init() {
    // 1. Áp dụng ngay từ cache
    const cached = getCachedSettings();
    if (cached) {
      applyBranding(cached);
    }

    // 2. Nạp ngầm từ API nếu cache hết hạn hoặc chưa có
    const now = Date.now();
    const isExpired = !cached || !cached._cachedAt || (now - cached._cachedAt > CACHE_TTL_MS);
    if (isExpired) {
      fetchFreshSettings();
    }

    // 3. Lắng nghe sự kiện cập nhật từ trang Admin Settings
    window.addEventListener('settingsUpdated', (e) => {
      if (e.detail) {
        setCachedSettings(e.detail);
        applyBranding(e.detail);
      }
    });

    // 4. Nếu DOM chưa xong, gắn sự kiện DOMContentLoaded để đồng bộ lại
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        const fresh = getCachedSettings();
        if (fresh) applyBranding(fresh);
      });
    }
  }

  init();

  // Export helper
  window.SiteBranding = {
    apply: applyBranding,
    reload: fetchFreshSettings,
    getCached: getCachedSettings
  };
})();
