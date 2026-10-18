/**
 * js/admin-settings.js
 * Quản lý trang Cài đặt Hệ thống Quản trị (Admin Settings)
 * Tính năng:
 * - Tải dữ liệu từ /api/admin/settings
 * - Phân quyền: Owner (sửa/lưu), Admin (chỉ xem, vô hiệu hóa form)
 * - Quản lý 4 sub-tab (Thông tin chung, Giao diện, Email, Bảo mật) kèm đồng bộ URL hash
 * - Xử lý ảnh client-side bằng canvas (thu nhỏ/cắt trước khi gửi lên máy chủ)
 * - Theo dõi thay đổi (Dirty state), cảnh báo rời trang, khôi phục mặc định
 */

(function () {
  'use strict';

  // --- TRẠNG THÁI TOÀN CỤC ---
  let initialSettings = null;
  let currentSettings = null;
  let canEdit = false;
  let isSaving = false;

  const SUB_TABS = ['general', 'appearance', 'email', 'security'];

  // DOM Elements cache
  let dom = {};

  function initDom() {
    dom = {
      section: document.getElementById('page-settings'),
      title: document.getElementById('settings-title'),
      readonlyBanner: document.getElementById('settings-readonly-banner'),
      tabBtns: document.querySelectorAll('.settings-tab-btn'),
      tabPanels: document.querySelectorAll('.settings-tab-panel'),
      
      // Form General
      websiteName: document.getElementById('setting-website-name'),
      shortDesc: document.getElementById('setting-short-description'),
      logoPreview: document.getElementById('logo-preview-img'),
      faviconPreview: document.getElementById('favicon-preview-img'),
      fileInputLogo: document.getElementById('file-input-logo'),
      fileInputFavicon: document.getElementById('file-input-favicon'),
      btnUploadLogo: document.getElementById('btn-upload-logo'),
      btnUploadFavicon: document.getElementById('btn-upload-favicon'),
      btnResetLogo: document.getElementById('btn-reset-logo'),
      btnResetFavicon: document.getElementById('btn-reset-favicon'),
      
      // Social Links
      socialFacebook: document.getElementById('social-facebook'),
      socialDiscord: document.getElementById('social-discord'),
      socialYoutube: document.getElementById('social-youtube'),
      socialX: document.getElementById('social-x'),
      socialGithub: document.getElementById('social-github'),

      // Appearance
      themeOptions: document.querySelectorAll('.theme-card-option'),
      accentOptions: document.querySelectorAll('.accent-pill-option'),

      // Security
      allowRegistration: document.getElementById('setting-allow-registration'),
      requireApproval: document.getElementById('setting-require-approval'),
      minPasswordLength: document.getElementById('setting-min-password-length'),
      sessionDays: document.getElementById('setting-session-days'),

      // Actions
      dirtyIndicator: document.getElementById('settings-dirty-indicator'),
      btnSave: document.getElementById('btn-settings-save'),
      btnDiscard: document.getElementById('btn-settings-discard')
    };
  }

  // --- THÔNG BÁO TOAST ---
  function showToast(message, type = 'success') {
    if (typeof window.showAdminToast === 'function') {
      window.showAdminToast(message, type);
      return;
    }
    let toast = document.getElementById('settings-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'settings-toast';
      toast.style.cssText = `
        position: fixed; bottom: 24px; right: 24px; z-index: 9999;
        padding: 12px 20px; border-radius: 8px; font-size: 14px; font-weight: 600;
        box-shadow: 0 4px 16px rgba(0,0,0,0.2); transition: all 0.25s ease;
        display: flex; align-items: center; gap: 8px;
      `;
      document.body.appendChild(toast);
    }
    if (type === 'error') {
      toast.style.background = '#ef4444';
      toast.style.color = '#ffffff';
    } else if (type === 'warning') {
      toast.style.background = '#f59e0b';
      toast.style.color = '#ffffff';
    } else {
      toast.style.background = '#10b981';
      toast.style.color = '#ffffff';
    }
    toast.textContent = message;
    toast.style.opacity = '1';
    toast.style.transform = 'translateY(0)';
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
    }, 3500);
  }

  // --- LẤY TOKEN VÀ USER ---
  function getAuth() {
    const token = localStorage.getItem('token');
    let user = null;
    try {
      user = JSON.parse(localStorage.getItem('user'));
    } catch (e) {}
    return { token, user };
  }

  // --- TẢI CÀI ĐẶT TỪ BACKEND ---
  async function loadSettings() {
    const { token } = getAuth();
    if (!token) {
      window.location.href = '../../index.html';
      return;
    }

    try {
      const res = await fetch('/api/admin/settings', {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '../../index.html';
        return;
      }

      if (res.status === 403) {
        showToast('Bạn không có quyền truy cập trang Cài đặt!', 'error');
        if (dom.section) dom.section.hidden = true;
        return;
      }

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      const data = await res.json();
      canEdit = !!data.canEdit;
      const s = data.settings || {};

      initialSettings = {
        website_name: s.website_name || '9.5 AI CLUB',
        short_description: s.short_description || '',
        logo_url: s.logo_url || '/assets/icon/cool_book_128.png',
        favicon_url: s.favicon_url || '/assets/icon/favicon-32.png',
        social_links: {
          facebook: (s.social_links && s.social_links.facebook) || '',
          discord: (s.social_links && s.social_links.discord) || '',
          youtube: (s.social_links && s.social_links.youtube) || '',
          x: (s.social_links && s.social_links.x) || '',
          github: (s.social_links && s.social_links.github) || ''
        },
        default_theme: s.default_theme || 'system',
        default_accent: s.default_accent || 'blue',
        allow_registration: s.allow_registration === 'true' || s.allow_registration === true,
        require_approval: s.require_approval === 'true' || s.require_approval === true,
        min_password_length: Number(s.min_password_length) || 6,
        session_days: Number(s.session_days) || 1
      };

      currentSettings = JSON.parse(JSON.stringify(initialSettings));
      renderForm();
      applyPermissions();
      updateDirtyState();
    } catch (err) {
      console.error('Lỗi khi tải cài đặt:', err);
      showToast('Không thể tải cài đặt từ máy chủ!', 'error');
    }
  }

  // --- RENDER FORM VỚI DỮ LIỆU HIỆN TẠI ---
  function renderForm() {
    if (!currentSettings) return;

    // General
    if (dom.websiteName) dom.websiteName.value = currentSettings.website_name;
    if (dom.shortDesc) dom.shortDesc.value = currentSettings.short_description;
    if (dom.logoPreview) dom.logoPreview.src = currentSettings.logo_url;
    if (dom.faviconPreview) dom.faviconPreview.src = currentSettings.favicon_url;

    // Social Links
    if (dom.socialFacebook) dom.socialFacebook.value = currentSettings.social_links.facebook;
    if (dom.socialDiscord) dom.socialDiscord.value = currentSettings.social_links.discord;
    if (dom.socialYoutube) dom.socialYoutube.value = currentSettings.social_links.youtube;
    if (dom.socialX) dom.socialX.value = currentSettings.social_links.x;
    if (dom.socialGithub) dom.socialGithub.value = currentSettings.social_links.github;

    // Appearance: Theme
    dom.themeOptions.forEach(opt => {
      const themeVal = opt.dataset.themeValue;
      const isSel = themeVal === currentSettings.default_theme;
      opt.classList.toggle('is-selected', isSel);
      opt.setAttribute('aria-checked', isSel ? 'true' : 'false');
    });

    // Appearance: Accent
    dom.accentOptions.forEach(opt => {
      const accentVal = opt.dataset.accentValue;
      const isSel = accentVal === currentSettings.default_accent;
      opt.classList.toggle('is-selected', isSel);
      opt.setAttribute('aria-checked', isSel ? 'true' : 'false');
    });

    // Security
    if (dom.allowRegistration) dom.allowRegistration.checked = currentSettings.allow_registration;
    if (dom.requireApproval) dom.requireApproval.checked = currentSettings.require_approval;
    if (dom.minPasswordLength) dom.minPasswordLength.value = String(currentSettings.min_password_length);
    if (dom.sessionDays) dom.sessionDays.value = String(currentSettings.session_days);
  }

  // --- ÁP DỤNG PHÂN QUYỀN (CAN EDIT) ---
  function applyPermissions() {
    if (dom.readonlyBanner) {
      dom.readonlyBanner.style.display = canEdit ? 'none' : 'flex';
    }

    const disableElements = [
      dom.websiteName,
      dom.shortDesc,
      dom.socialFacebook,
      dom.socialDiscord,
      dom.socialYoutube,
      dom.socialX,
      dom.socialGithub,
      dom.allowRegistration,
      dom.requireApproval,
      dom.minPasswordLength,
      dom.sessionDays,
      dom.btnUploadLogo,
      dom.btnUploadFavicon,
      dom.btnResetLogo,
      dom.btnResetFavicon
    ];

    disableElements.forEach(el => {
      if (el) el.disabled = !canEdit;
    });

    dom.themeOptions.forEach(opt => {
      opt.style.pointerEvents = canEdit ? 'auto' : 'none';
      opt.style.opacity = canEdit ? '1' : '0.7';
    });

    dom.accentOptions.forEach(opt => {
      opt.style.pointerEvents = canEdit ? 'auto' : 'none';
      opt.style.opacity = canEdit ? '1' : '0.7';
    });

    // Nút Lưu và Hủy bị ẩn hoặc vô hiệu hóa nếu không phải Owner
    if (!canEdit) {
      if (dom.btnSave) dom.btnSave.style.display = 'none';
      if (dom.btnDiscard) dom.btnDiscard.style.display = 'none';
      if (dom.dirtyIndicator) dom.dirtyIndicator.style.display = 'none';
    } else {
      if (dom.btnSave) dom.btnSave.style.display = 'inline-flex';
      if (dom.btnDiscard) dom.btnDiscard.style.display = 'inline-flex';
      if (dom.dirtyIndicator) dom.dirtyIndicator.style.display = 'inline-flex';
    }
  }

  // --- THU THẬP DỮ LIỆU TỪ FORM ---
  function collectFormSettings() {
    if (!currentSettings) return null;
    return {
      website_name: (dom.websiteName ? dom.websiteName.value : currentSettings.website_name).trim(),
      short_description: (dom.shortDesc ? dom.shortDesc.value : currentSettings.short_description).trim(),
      logo_url: currentSettings.logo_url,
      favicon_url: currentSettings.favicon_url,
      social_links: {
        facebook: (dom.socialFacebook ? dom.socialFacebook.value : '').trim(),
        discord: (dom.socialDiscord ? dom.socialDiscord.value : '').trim(),
        youtube: (dom.socialYoutube ? dom.socialYoutube.value : '').trim(),
        x: (dom.socialX ? dom.socialX.value : '').trim(),
        github: (dom.socialGithub ? dom.socialGithub.value : '').trim()
      },
      default_theme: currentSettings.default_theme,
      default_accent: currentSettings.default_accent,
      allow_registration: dom.allowRegistration ? dom.allowRegistration.checked : currentSettings.allow_registration,
      require_approval: dom.requireApproval ? dom.requireApproval.checked : currentSettings.require_approval,
      min_password_length: dom.minPasswordLength ? Number(dom.minPasswordLength.value) : currentSettings.min_password_length,
      session_days: dom.sessionDays ? Number(dom.sessionDays.value) : currentSettings.session_days
    };
  }

  // --- KIỂM TRA TRẠNG THÁI DIRTY ---
  function isDirty() {
    if (!canEdit || !initialSettings) return false;
    const current = collectFormSettings();
    if (!current) return false;
    return JSON.stringify(current) !== JSON.stringify(initialSettings);
  }

  function updateDirtyState() {
    const dirty = isDirty();
    if (dom.dirtyIndicator) {
      dom.dirtyIndicator.classList.toggle('is-visible', dirty);
    }
    if (dom.btnSave) {
      dom.btnSave.disabled = !dirty || isSaving;
    }
    if (dom.btnDiscard) {
      dom.btnDiscard.disabled = !dirty || isSaving;
    }
  }

  // --- CHUYỂN SUB-TAB VÀ ĐỒNG BỘ URL HASH ---
  function switchSubTab(targetTab, updateHash = true) {
    if (!SUB_TABS.includes(targetTab)) targetTab = 'general';

    dom.tabBtns.forEach(btn => {
      const isTarget = btn.dataset.subtab === targetTab;
      btn.classList.toggle('is-active', isTarget);
      btn.classList.toggle('selected', isTarget);
      btn.setAttribute('aria-selected', isTarget ? 'true' : 'false');
    });

    dom.tabPanels.forEach(panel => {
      const isTarget = panel.dataset.subpanel === targetTab;
      panel.hidden = !isTarget;
      panel.setAttribute('aria-hidden', isTarget ? 'false' : 'true');
    });

    if (updateHash) {
      try {
        history.replaceState(null, '', `#settings:${targetTab}`);
      } catch (e) {
        window.location.hash = `settings:${targetTab}`;
      }
    }
  }

  // Đảm bảo hiển thị panel Settings trên Admin nếu URL có hash settings
  function ensureSettingsPageActive() {
    const hash = window.location.hash || '';
    if (hash === '#settings' || hash.startsWith('#settings:')) {
      const settingsLink = document.querySelector('[data-page-target="settings"]');
      if (settingsLink) {
        document.querySelectorAll('[data-page-target]').forEach(item => {
          const selected = item === settingsLink;
          item.classList.toggle('is-active', selected);
          if (selected) item.setAttribute('aria-current', 'page');
          else item.removeAttribute('aria-current');
        });
      }
      document.querySelectorAll('[data-page-panel]').forEach(panel => {
        const selected = panel.dataset.pagePanel === 'settings';
        panel.hidden = !selected;
        panel.classList.toggle('is-visible', selected);
      });
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }

  // Đọc tab từ hash URL
  function initTabFromHash() {
    ensureSettingsPageActive();
    const hash = window.location.hash || '';
    if (hash.startsWith('#settings:')) {
      const tab = hash.replace('#settings:', '').toLowerCase();
      if (SUB_TABS.includes(tab)) {
        switchSubTab(tab, false);
        return;
      }
    }
    switchSubTab('general', false);
  }

  // --- TIỀN XỬ LÝ ẢNH CLIENT-SIDE BẰNG CANVAS (CHỐNG TẢI ẢNH NẶNG) ---
  function processImageOnCanvas(file, maxWidth, maxHeight, cropSquare = false) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          let targetW = img.width;
          let targetH = img.height;

          if (cropSquare) {
            targetW = maxWidth;
            targetH = maxHeight;
          } else {
            if (targetW > maxWidth || targetH > maxHeight) {
              const ratio = Math.min(maxWidth / targetW, maxHeight / targetH);
              targetW = Math.round(targetW * ratio);
              targetH = Math.round(targetH * ratio);
            }
          }

          const canvas = document.createElement('canvas');
          canvas.width = targetW;
          canvas.height = targetH;
          const ctx = canvas.getContext('2d');
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';

          if (cropSquare) {
            // Cắt tâm vuông
            const minDim = Math.min(img.width, img.height);
            const sx = (img.width - minDim) / 2;
            const sy = (img.height - minDim) / 2;
            ctx.drawImage(img, sx, sy, minDim, minDim, 0, 0, targetW, targetH);
          } else {
            ctx.drawImage(img, 0, 0, targetW, targetH);
          }

          canvas.toBlob((blob) => {
            if (!blob) {
              reject(new Error('Lỗi chuyển đổi canvas sang blob'));
              return;
            }
            resolve(blob);
          }, 'image/png');
        };
        img.onerror = () => reject(new Error('Tệp không phải là ảnh hợp lệ'));
        img.src = e.target.result;
      };
      reader.onerror = () => reject(new Error('Lỗi khi đọc tệp'));
      reader.readAsDataURL(file);
    });
  }

  // --- UPLOAD BRANDING (LOGO HOẶC FAVICON) ---
  async function handleBrandingUpload(kind, file) {
    if (!canEdit) {
      showToast('Chỉ Chủ sở hữu mới có quyền tải lên ảnh thương hiệu!', 'error');
      return;
    }

    if (!file) return;

    const allowedMime = ['image/png', 'image/jpeg', 'image/webp'];
    if (!allowedMime.includes(file.type)) {
      showToast('Vui lòng chọn định dạng PNG, JPG hoặc WEBP!', 'error');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      showToast('Kích thước tệp gốc vượt quá 10MB!', 'error');
      return;
    }

    const { token } = getAuth();
    showToast(`Đang tối ưu và tải lên ${kind === 'logo' ? 'Logo' : 'Favicon'}...`, 'warning');

    try {
      // Tối ưu hóa trước trên client:
      // - Logo: tối đa 256x256
      // - Favicon: vuông 64x64
      let processedBlob;
      if (kind === 'logo') {
        processedBlob = await processImageOnCanvas(file, 256, 256, false);
      } else {
        processedBlob = await processImageOnCanvas(file, 64, 64, true);
      }

      const formData = new FormData();
      formData.append('image', processedBlob, `${kind}.png`);

      const res = await fetch(`/api/admin/settings/branding/${kind}`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData
      });

      const resData = await res.json();
      if (!res.ok) {
        throw new Error(resData.error || `HTTP ${res.status}`);
      }

      const newUrl = resData.url;
      if (kind === 'logo') {
        currentSettings.logo_url = newUrl;
        initialSettings.logo_url = newUrl;
        if (dom.logoPreview) dom.logoPreview.src = newUrl;
      } else {
        currentSettings.favicon_url = newUrl;
        initialSettings.favicon_url = newUrl;
        if (dom.faviconPreview) dom.faviconPreview.src = newUrl;
      }

      showToast(`Tải lên ${kind === 'logo' ? 'Logo' : 'Favicon'} thành công!`, 'success');
      updateDirtyState();

      // Cập nhật favicon/logo trên trang hiện tại ngay lập tức
      syncBrandingLocally(kind, newUrl);
    } catch (err) {
      console.error(`Lỗi upload ${kind}:`, err);
      showToast(err.message || 'Lỗi khi tải ảnh lên máy chủ', 'error');
    }
  }

  // --- RESET BRANDING VỀ MẶC ĐỊNH ---
  async function handleBrandingReset(kind) {
    if (!canEdit) {
      showToast('Chỉ Chủ sở hữu mới có quyền khôi phục ảnh thương hiệu!', 'error');
      return;
    }

    if (!confirm(`Bạn có chắc chắn muốn khôi phục ${kind === 'logo' ? 'Logo' : 'Favicon'} về mặc định không?`)) {
      return;
    }

    const { token } = getAuth();
    try {
      const res = await fetch(`/api/admin/settings/branding/${kind}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });

      const resData = await res.json();
      if (!res.ok) throw new Error(resData.error || `HTTP ${res.status}`);

      const defaultUrl = resData.url;
      if (kind === 'logo') {
        currentSettings.logo_url = defaultUrl;
        initialSettings.logo_url = defaultUrl;
        if (dom.logoPreview) dom.logoPreview.src = defaultUrl;
      } else {
        currentSettings.favicon_url = defaultUrl;
        initialSettings.favicon_url = defaultUrl;
        if (dom.faviconPreview) dom.faviconPreview.src = defaultUrl;
      }

      showToast(`Đã khôi phục ${kind === 'logo' ? 'Logo' : 'Favicon'} về mặc định!`, 'success');
      updateDirtyState();
      syncBrandingLocally(kind, defaultUrl);
    } catch (err) {
      console.error(`Lỗi reset ${kind}:`, err);
      showToast(err.message || 'Lỗi khi khôi phục ảnh', 'error');
    }
  }

  // Đồng bộ favicon / logo tab hiện hành
  function syncBrandingLocally(kind, url) {
    if (kind === 'favicon') {
      const link = document.querySelector("link[rel*='icon']");
      if (link) link.href = `${url}?t=${Date.now()}`;
    }
  }

  // --- LƯU CÀI ĐẶT ---
  async function saveSettings() {
    if (!canEdit || isSaving) return;

    const payload = collectFormSettings();
    if (!payload) return;

    // Validate nhanh trên client
    if (!payload.website_name) {
      showToast('Tên website không được để trống!', 'error');
      switchSubTab('general');
      if (dom.websiteName) dom.websiteName.focus();
      return;
    }

    if (payload.website_name.length > 60) {
      showToast('Tên website không được vượt quá 60 ký tự!', 'error');
      switchSubTab('general');
      if (dom.websiteName) dom.websiteName.focus();
      return;
    }

    if (payload.short_description.length > 160) {
      showToast('Mô tả ngắn không được vượt quá 160 ký tự!', 'error');
      switchSubTab('general');
      if (dom.shortDesc) dom.shortDesc.focus();
      return;
    }

    // Validate URLs
    const urlRegex = /^https?:\/\/.+/i;
    for (const [k, url] of Object.entries(payload.social_links)) {
      if (url && !urlRegex.test(url)) {
        showToast(`URL mạng xã hội ${k} không đúng định dạng (phải bắt đầu bằng http:// hoặc https://)!`, 'error');
        switchSubTab('general');
        return;
      }
    }

    const { token } = getAuth();
    isSaving = true;
    updateDirtyState();
    if (dom.btnSave) {
      dom.btnSave.innerHTML = `
        <svg class="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10" stroke-opacity="0.25"/>
          <path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round"/>
        </svg>
        <span>Đang lưu...</span>
      `;
    }

    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      const resData = await res.json();
      if (!res.ok) {
        throw new Error(resData.error || `HTTP ${res.status}`);
      }

      initialSettings = JSON.parse(JSON.stringify(payload));
      currentSettings = JSON.parse(JSON.stringify(payload));
      showToast('Đã lưu tất cả cài đặt hệ thống thành công!', 'success');

      // Phát sự kiện để cập nhật branding trên giao diện nếu cần
      window.dispatchEvent(new CustomEvent('settingsUpdated', { detail: payload }));
    } catch (err) {
      console.error('Lỗi khi lưu cài đặt:', err);
      showToast(err.message || 'Không thể lưu cài đặt hệ thống', 'error');
    } finally {
      isSaving = false;
      if (dom.btnSave) {
        dom.btnSave.innerHTML = `
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
            <polyline points="17 21 17 13 7 13 7 21"/>
            <polyline points="7 3 7 8 15 8"/>
          </svg>
          <span>Lưu thay đổi</span>
        `;
      }
      updateDirtyState();
    }
  }

  // --- HỦY BỎ THAY ĐỔI ---
  function discardChanges() {
    if (!initialSettings) return;
    if (confirm('Bạn có chắc chắn muốn hủy bỏ mọi thay đổi chưa lưu không?')) {
      currentSettings = JSON.parse(JSON.stringify(initialSettings));
      renderForm();
      updateDirtyState();
      showToast('Đã hủy các thay đổi chưa lưu.', 'warning');
    }
  }

  // --- ĐĂNG KÝ SỰ KIỆN LẮNG NGHE ---
  function bindEvents() {
    // Sub-tabs switching
    dom.tabBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const subtab = btn.dataset.subtab;
        switchSubTab(subtab);
      });
    });

    // Form inputs dirty state
    const inputs = [
      dom.websiteName,
      dom.shortDesc,
      dom.socialFacebook,
      dom.socialDiscord,
      dom.socialYoutube,
      dom.socialX,
      dom.socialGithub,
      dom.allowRegistration,
      dom.requireApproval,
      dom.minPasswordLength,
      dom.sessionDays
    ];

    inputs.forEach(input => {
      if (!input) return;
      input.addEventListener('input', updateDirtyState);
      input.addEventListener('change', updateDirtyState);
    });

    // Theme cards
    dom.themeOptions.forEach(opt => {
      opt.addEventListener('click', () => {
        if (!canEdit) return;
        currentSettings.default_theme = opt.dataset.themeValue;
        dom.themeOptions.forEach(o => {
          const isSel = o === opt;
          o.classList.toggle('is-selected', isSel);
          o.setAttribute('aria-checked', isSel ? 'true' : 'false');
        });
        updateDirtyState();
      });
    });

    // Accent cards
    dom.accentOptions.forEach(opt => {
      opt.addEventListener('click', () => {
        if (!canEdit) return;
        currentSettings.default_accent = opt.dataset.accentValue;
        dom.accentOptions.forEach(o => {
          const isSel = o === opt;
          o.classList.toggle('is-selected', isSel);
          o.setAttribute('aria-checked', isSel ? 'true' : 'false');
        });
        updateDirtyState();
      });
    });

    // Branding file triggers
    if (dom.btnUploadLogo && dom.fileInputLogo) {
      dom.btnUploadLogo.addEventListener('click', () => dom.fileInputLogo.click());
      dom.fileInputLogo.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) handleBrandingUpload('logo', file);
        e.target.value = '';
      });
    }

    if (dom.btnUploadFavicon && dom.fileInputFavicon) {
      dom.btnUploadFavicon.addEventListener('click', () => dom.fileInputFavicon.click());
      dom.fileInputFavicon.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) handleBrandingUpload('favicon', file);
        e.target.value = '';
      });
    }

    if (dom.btnResetLogo) {
      dom.btnResetLogo.addEventListener('click', () => handleBrandingReset('logo'));
    }

    if (dom.btnResetFavicon) {
      dom.btnResetFavicon.addEventListener('click', () => handleBrandingReset('favicon'));
    }

    // Actions
    if (dom.btnSave) {
      dom.btnSave.addEventListener('click', saveSettings);
    }

    if (dom.btnDiscard) {
      dom.btnDiscard.addEventListener('click', discardChanges);
    }

    // Cảnh báo khi người dùng tắt hoặc tải lại trang khi có thay đổi chưa lưu
    window.addEventListener('beforeunload', (e) => {
      if (isDirty()) {
        e.preventDefault();
        e.returnValue = 'Bạn có thay đổi cài đặt chưa được lưu. Bạn có chắc muốn rời đi?';
      }
    });

    // Đồng bộ khi hash thay đổi
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash || '';
      if (hash.startsWith('#settings:')) {
        const tab = hash.replace('#settings:', '').toLowerCase();
        switchSubTab(tab, false);
      }
    });

    // Lắng nghe khi sidebar Admin chuyển sang Settings
    document.querySelectorAll('[data-page-target="settings"]').forEach(btn => {
      btn.addEventListener('click', () => {
        initTabFromHash();
        window.scrollTo({ top: 0, behavior: 'instant' });
      });
    });
  }

  // --- KHỞI CHẠY ---
  document.addEventListener('DOMContentLoaded', () => {
    initDom();
    bindEvents();
    initTabFromHash();
    loadSettings();
  });

  // Export helper ra window nếu các script khác cần dùng
  window.AdminSettings = {
    reload: loadSettings,
    switchTab: switchSubTab,
    isDirty
  };
})();
