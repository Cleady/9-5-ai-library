/**
 * ==========================================================================
 * Universal Global Search Component (js/global-search.js) — Phase 4
 * Thanh tìm kiếm toàn cục đa nguồn cho 9.5 AI CLUB
 * - Gợi ý theo nhóm kết quả, lịch sử tìm kiếm gần đây (localStorage LRU)
 * - Highlight từ khóa an toàn (chống XSS), ARIA combobox/listbox chuẩn
 * - Mobile Overlay toàn màn hình (≤640px)
 * ==========================================================================
 */
(function () {
  'use strict';

  if (window.Lib95GlobalSearchInitialized) return;
  window.Lib95GlobalSearchInitialized = true;

  /* ========== TIỆN ÍCH TIẾNG VIỆT ========== */
  const VIET_MAP = {
    a:'[aàáảãạăằắẳẵặâầấẩẫậ]', e:'[eèéẻẽẹêềếểễệ]', i:'[iìíỉĩị]',
    o:'[oòóỏõọôồốổỗộơờớởỡợ]', u:'[uùúủũụưừứửữự]', y:'[yỳýỷỹỵ]', d:'[dđ]'
  };
  function buildAccentRegex(s) {
    if (!s) return null;
    const p = s.toLowerCase().split('').map(c => VIET_MAP[c] || c.replace(/[\^$\\.*+?()[\]{}|]/g, '\\$&')).join('');
    return new RegExp(p, 'gi');
  }
  function renderHighlightedText(el, text, q) {
    el.textContent = '';
    if (!text) return;
    if (!q || !q.trim()) { el.textContent = text; return; }
    try {
      const rx = buildAccentRegex(q.trim());
      if (!rx) { el.textContent = text; return; }
      let last = 0, m, any = false;
      while ((m = rx.exec(text)) !== null) {
        any = true;
        if (m.index > last) el.appendChild(document.createTextNode(text.slice(last, m.index)));
        const mk = document.createElement('mark');
        mk.className = 'global-search-highlight';
        mk.textContent = m[0];
        el.appendChild(mk);
        last = rx.lastIndex;
        if (m.index === rx.lastIndex) rx.lastIndex++;
      }
      if (last < text.length) el.appendChild(document.createTextNode(text.slice(last)));
      if (!any) el.textContent = text;
    } catch (e) { el.textContent = text; }
  }

  /* ========== ICONS SVG ========== */
  const ICONS = {
    courses:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>',
    lectures:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>',
    quizzes:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
    resources:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>',
    community:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>',
    users:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
    navigation:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>',
    theme:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>',
    arrowRight:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>'
  };
  const CAT_TITLES = {
    courses:'Môn học & Khóa học', lectures:'Bài giảng LMS', quizzes:'Đề thi & Luyện tập',
    resources:'Tài liệu học tập', community:'Cộng đồng & Thảo luận',
    users:'Thành viên & Giảng viên', navigation:'Trang & Thao tác nhanh'
  };

  /* ========== LỊCH SỬ TÌM KIẾM (localStorage LRU) ========== */
  const HISTORY_MAX = 8;
  function getUserId() {
    try { const u = JSON.parse(localStorage.getItem('user')); return u && u.id ? u.id : 'guest'; }
    catch (e) { return 'guest'; }
  }
  function historyKey() { return 'lib95:search:recent:' + getUserId(); }
  function getHistory() {
    try { return JSON.parse(localStorage.getItem(historyKey())) || []; }
    catch (e) { return []; }
  }
  function saveHistory(list) {
    try { localStorage.setItem(historyKey(), JSON.stringify(list.slice(0, HISTORY_MAX))); } catch (e) {}
  }
  function addToHistory(query) {
    if (!query || !query.trim()) return;
    const q = query.trim();
    let h = getHistory().filter(x => x.toLowerCase() !== q.toLowerCase());
    h.unshift(q);
    saveHistory(h);
  }
  function removeFromHistory(query) {
    saveHistory(getHistory().filter(x => x !== query));
  }
  function clearHistory() { try { localStorage.removeItem(historyKey()); } catch (e) {} }

  /* ========== TRẠNG THÁI ========== */
  let searchInput = null, searchForm = null;
  let dropdownEl = null, bodyEl = null, footerEl = null;
  let mobileOverlay = null, mobileInput = null, mobileBody = null, mobileClear = null;
  let srAnnounce = null;
  let debounceTimer = null, focusIdx = -1, currentItems = [], abortCtrl = null, activeQuery = '';
  let isMobile = () => window.innerWidth <= 640;

  /* ========== KHỞI TẠO ========== */
  function initGlobalSearch() {
    searchInput = document.getElementById('site-search') ||
      document.getElementById('admin-search') ||
      document.querySelector('.topbar .search-input') ||
      document.querySelector('.search input[type="search"]');
    if (!searchInput) return;
    searchForm = searchInput.closest('form') || searchInput.closest('.search');
    if (!searchForm) return;

    searchForm.addEventListener('submit', e => { e.preventDefault(); handleSubmit(); });
    createDropdownElement();
    createMobileOverlay();
    createSrAnnouncer();
    setupEvents();
  }

  function createDropdownElement() {
    const old = document.getElementById('global-search-dropdown');
    if (old) old.remove();
    dropdownEl = document.createElement('div');
    dropdownEl.id = 'global-search-dropdown';
    dropdownEl.className = 'global-search-dropdown';
    dropdownEl.setAttribute('role', 'listbox');
    dropdownEl.setAttribute('aria-label', 'Gợi ý kết quả tìm kiếm');
    bodyEl = document.createElement('div');
    bodyEl.className = 'global-search-body';
    dropdownEl.appendChild(bodyEl);
    footerEl = document.createElement('div');
    footerEl.className = 'global-search-footer';
    dropdownEl.appendChild(footerEl);
    // ARIA trên input
    searchInput.setAttribute('role', 'combobox');
    searchInput.setAttribute('aria-expanded', 'false');
    searchInput.setAttribute('aria-autocomplete', 'list');
    searchInput.setAttribute('aria-controls', 'global-search-dropdown');
    searchInput.setAttribute('aria-haspopup', 'listbox');
    searchInput.setAttribute('aria-activedescendant', '');
    searchInput.setAttribute('autocomplete', 'off');
    searchForm.appendChild(dropdownEl);
  }

  /* ========== MOBILE OVERLAY ========== */
  function createMobileOverlay() {
    const old = document.getElementById('gs-mobile-overlay');
    if (old) old.remove();
    mobileOverlay = document.createElement('div');
    mobileOverlay.id = 'gs-mobile-overlay';
    mobileOverlay.className = 'global-search-mobile-overlay';
    mobileOverlay.setAttribute('role', 'dialog');
    mobileOverlay.setAttribute('aria-label', 'Tìm kiếm');
    // Header
    const hdr = document.createElement('div');
    hdr.className = 'gs-mobile-header';
    const backBtn = document.createElement('button');
    backBtn.type = 'button';
    backBtn.className = 'gs-mobile-back';
    backBtn.setAttribute('aria-label', 'Đóng tìm kiếm');
    backBtn.textContent = '←';
    backBtn.addEventListener('click', closeMobileOverlay);
    hdr.appendChild(backBtn);
    const wrap = document.createElement('div');
    wrap.className = 'gs-mobile-input-wrap';
    mobileInput = document.createElement('input');
    mobileInput.type = 'search';
    mobileInput.className = 'gs-mobile-input';
    mobileInput.placeholder = 'Tìm kiếm...';
    mobileInput.setAttribute('autocomplete', 'off');
    wrap.appendChild(mobileInput);
    mobileClear = document.createElement('button');
    mobileClear.type = 'button';
    mobileClear.className = 'gs-mobile-clear';
    mobileClear.setAttribute('aria-label', 'Xóa từ khóa');
    mobileClear.textContent = '✕';
    mobileClear.addEventListener('click', () => { mobileInput.value = ''; mobileClear.classList.remove('is-visible'); mobileInput.focus(); renderMobileContent(''); });
    wrap.appendChild(mobileClear);
    hdr.appendChild(wrap);
    mobileOverlay.appendChild(hdr);
    // Body
    mobileBody = document.createElement('div');
    mobileBody.className = 'gs-mobile-body';
    mobileOverlay.appendChild(mobileBody);
    document.body.appendChild(mobileOverlay);
    // Events
    mobileInput.addEventListener('input', e => {
      const q = e.target.value.trim();
      mobileClear.classList.toggle('is-visible', q.length > 0);
      clearTimeout(debounceTimer);
      if (!q) { renderMobileContent(''); return; }
      renderMobileLoading();
      debounceTimer = setTimeout(() => doSearch(q, true), 250);
    });
    mobileInput.addEventListener('keydown', e => {
      if (e.key === 'Escape') { e.preventDefault(); closeMobileOverlay(); }
      if (e.key === 'Enter') { e.preventDefault(); const q = mobileInput.value.trim(); if (q) { addToHistory(q); closeMobileOverlay(); window.location.href = '/pages/search.html?q=' + encodeURIComponent(q); } }
    });
  }

  function openMobileOverlay() {
    mobileOverlay.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    mobileInput.value = searchInput.value;
    mobileClear.classList.toggle('is-visible', mobileInput.value.trim().length > 0);
    setTimeout(() => mobileInput.focus(), 50);
    renderMobileContent(mobileInput.value.trim());
  }
  function closeMobileOverlay() {
    mobileOverlay.classList.remove('is-open');
    document.body.style.overflow = '';
  }
  function renderMobileContent(q) {
    if (q) { renderMobileLoading(); doSearch(q, true); return; }
    // Hiện lịch sử trên mobile
    mobileBody.textContent = '';
    const h = getHistory();
    if (h.length === 0) { mobileBody.innerHTML = '<div class="global-search-empty"><div class="global-search-empty-icon">🔍</div><div class="global-search-empty-title">Bắt đầu tìm kiếm</div><div class="global-search-empty-text">Nhập mã môn học, tên bài giảng hoặc từ khóa...</div></div>'; return; }
    renderHistoryInto(mobileBody, true);
  }
  function renderMobileLoading() {
    mobileBody.textContent = '';
    for (let i = 0; i < 4; i++) {
      const sk = document.createElement('div');
      sk.className = 'global-search-skeleton-item';
      sk.innerHTML = '<div class="global-search-skeleton-icon"></div><div class="global-search-skeleton-lines"><div class="global-search-skeleton-line"></div><div class="global-search-skeleton-line"></div></div>';
      mobileBody.appendChild(sk);
    }
  }
  function renderMobileResults(data, q) {
    mobileBody.textContent = '';
    const results = data.results || {};
    const total = data.total || 0;
    if (total === 0) { mobileBody.innerHTML = '<div class="global-search-empty"><div class="global-search-empty-icon">🔍</div><div class="global-search-empty-title">Không tìm thấy kết quả</div></div>'; return; }
    const order = ['courses','lectures','quizzes','resources','community','users','navigation'];
    for (const gk of order) {
      const items = results[gk]; if (!items || !items.length) continue;
      const gc = document.createElement('div'); gc.className = 'global-search-group';
      const gh = document.createElement('div'); gh.className = 'global-search-group-title';
      const ts = document.createElement('span'); ts.textContent = CAT_TITLES[gk] || gk; gh.appendChild(ts);
      const cs = document.createElement('span'); cs.className = 'global-search-group-count'; cs.textContent = String(items.length); gh.appendChild(cs);
      gc.appendChild(gh);
      for (const item of items) {
        const el = createItemElement(item, q);
        el.addEventListener('click', e => { e.preventDefault(); addToHistory(q); closeMobileOverlay(); selectItem(item); });
        gc.appendChild(el);
      }
      mobileBody.appendChild(gc);
    }
    // Footer
    const ft = document.createElement('div'); ft.className = 'gs-mobile-footer';
    const btn = document.createElement('a'); btn.className = 'global-search-all-btn';
    btn.href = '/pages/search.html?q=' + encodeURIComponent(q);
    btn.textContent = 'Xem tất cả ' + total + ' kết quả';
    btn.addEventListener('click', e => { e.preventDefault(); addToHistory(q); closeMobileOverlay(); window.location.href = btn.href; });
    ft.appendChild(btn);
    mobileBody.appendChild(ft);
  }

  /* ========== SR ANNOUNCER ========== */
  function createSrAnnouncer() {
    srAnnounce = document.createElement('div');
    srAnnounce.className = 'global-search-sr-announce';
    srAnnounce.setAttribute('aria-live', 'polite');
    srAnnounce.setAttribute('aria-atomic', 'true');
    document.body.appendChild(srAnnounce);
  }
  function announce(msg) { if (srAnnounce) srAnnounce.textContent = msg; }

  /* ========== SỰ KIỆN ========== */
  function setupEvents() {
    searchInput.addEventListener('input', e => {
      const q = e.target.value.trim();
      activeQuery = q;
      clearTimeout(debounceTimer);
      if (!q) { if (!isMobile()) showHistoryDropdown(); return; }
      if (isMobile()) return; // mobile dùng overlay
      showLoadingSkeleton(); openDropdown();
      debounceTimer = setTimeout(() => doSearch(q, false), 250);
    });
    searchInput.addEventListener('focus', () => {
      if (isMobile()) { openMobileOverlay(); return; }
      const q = searchInput.value.trim();
      if (q && currentItems.length > 0) { openDropdown(); }
      else if (!q) { showHistoryDropdown(); }
    });
    searchInput.addEventListener('keydown', handleKeydown);
    document.addEventListener('click', e => { if (!searchForm.contains(e.target)) closeDropdown(); });
    document.addEventListener('keydown', handleGlobalShortcut);
  }

  function handleGlobalShortcut(e) {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      const a = document.activeElement;
      if (a && a !== searchInput) {
        const t = a.tagName.toLowerCase();
        if (t === 'textarea' || a.isContentEditable) return;
        if (t === 'input' && !a.classList.contains('search-input') && a.type !== 'search') return;
      }
      e.preventDefault();
      if (isMobile()) { openMobileOverlay(); return; }
      searchInput.focus(); searchInput.select();
      if (searchInput.value.trim() && currentItems.length > 0) openDropdown();
      else if (!searchInput.value.trim()) showHistoryDropdown();
    }
  }

  function handleKeydown(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      const allEls = bodyEl ? bodyEl.querySelectorAll('.global-search-item, .global-search-history-item') : [];
      const count = allEls.length;
      if (dropdownEl && dropdownEl.classList.contains('is-open') && focusIdx >= 0 && focusIdx < count) {
        allEls[focusIdx].click();
      } else {
        handleSubmit();
      }
      return;
    }
    if (!dropdownEl.classList.contains('is-open')) {
      if (e.key === 'ArrowDown') { e.preventDefault(); if (searchInput.value.trim() && currentItems.length > 0) openDropdown(); else showHistoryDropdown(); }
      return;
    }
    const allEls = bodyEl.querySelectorAll('.global-search-item, .global-search-history-item');
    const count = allEls.length;
    if (e.key === 'ArrowDown') {
      e.preventDefault(); if (!count) return;
      focusIdx = (focusIdx + 1) % count; updateFocus(allEls);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault(); if (!count) return;
      focusIdx = (focusIdx - 1 + count) % count; updateFocus(allEls);
    } else if (e.key === 'Escape') {
      e.preventDefault(); closeDropdown();
    }
  }

  function updateFocus(els) {
    els.forEach((el, i) => {
      const on = i === focusIdx;
      el.classList.toggle('is-focused', on);
      el.setAttribute('aria-selected', on ? 'true' : 'false');
      if (on) {
        el.scrollIntoView({ block: 'nearest' });
        searchInput.setAttribute('aria-activedescendant', el.id || '');
      }
    });
    if (focusIdx >= 0 && focusIdx < els.length) {
      const el = els[focusIdx];
      const label = el.querySelector('.global-search-item-title, .global-search-history-text');
      if (label) announce(label.textContent);
    }
  }

  /* ========== LỊCH SỬ DROPDOWN ========== */
  function showHistoryDropdown() {
    const h = getHistory();
    if (!h.length) { closeDropdown(); return; }
    bodyEl.textContent = ''; footerEl.textContent = '';
    focusIdx = -1; currentItems = [];
    renderHistoryInto(bodyEl, false);
    openDropdown();
  }

  function renderHistoryInto(container, forMobile) {
    const h = getHistory();
    if (!h.length) return;
    // Header
    const hdr = document.createElement('div'); hdr.className = 'global-search-history-header';
    const lbl = document.createElement('span'); lbl.className = 'global-search-history-label'; lbl.textContent = '🕐 Tìm kiếm gần đây';
    hdr.appendChild(lbl);
    const clr = document.createElement('button'); clr.type = 'button'; clr.className = 'global-search-history-clear';
    clr.textContent = 'Xóa tất cả';
    clr.addEventListener('click', e => {
      e.stopPropagation();
      clearHistory();
      if (forMobile) { renderMobileContent(''); }
      else { closeDropdown(); }
    });
    hdr.appendChild(clr);
    container.appendChild(hdr);
    // Items
    h.forEach((q, idx) => {
      const row = document.createElement('div');
      row.className = 'global-search-history-item';
      row.id = 'gs-hist-' + idx;
      row.setAttribute('role', 'option');
      row.setAttribute('aria-selected', 'false');
      row.setAttribute('tabindex', '-1');
      const icon = document.createElement('span'); icon.className = 'global-search-history-icon'; icon.textContent = '🕐';
      row.appendChild(icon);
      const txt = document.createElement('span'); txt.className = 'global-search-history-text'; txt.textContent = q;
      row.appendChild(txt);
      const rmBtn = document.createElement('button'); rmBtn.type = 'button'; rmBtn.className = 'global-search-history-remove';
      rmBtn.setAttribute('aria-label', 'Xóa "' + q + '"'); rmBtn.textContent = '✕';
      rmBtn.addEventListener('click', ev => {
        ev.stopPropagation();
        removeFromHistory(q);
        if (forMobile) renderMobileContent('');
        else showHistoryDropdown();
      });
      row.appendChild(rmBtn);
      // Click = tìm kiếm lại
      row.addEventListener('click', () => {
        if (forMobile) { mobileInput.value = q; mobileClear.classList.add('is-visible'); renderMobileContent(q); }
        else { searchInput.value = q; activeQuery = q; showLoadingSkeleton(); openDropdown(); doSearch(q, false); }
      });
      container.appendChild(row);
    });
  }

  /* ========== GỌI API TÌM KIẾM ========== */
  async function doSearch(query, forMobile) {
    if (abortCtrl) abortCtrl.abort();
    abortCtrl = new AbortController();
    try {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      const hdrs = { 'Accept': 'application/json' };
      if (token) hdrs['Authorization'] = 'Bearer ' + token;
      const res = await fetch('/api/search?q=' + encodeURIComponent(query) + '&limit=4', { headers: hdrs, signal: abortCtrl.signal });
      if (!res.ok) throw new Error('HTTP ' + res.status);
      const data = await res.json();
      if (forMobile) { renderMobileResults(data, query); }
      else { renderSearchResults(data, query); announce('Tìm thấy ' + (data.total || 0) + ' kết quả'); }
    } catch (err) {
      if (err.name === 'AbortError') return;
      if (forMobile) { mobileBody.textContent = ''; mobileBody.innerHTML = '<div class="global-search-empty"><div class="global-search-empty-icon">⚠️</div><div class="global-search-empty-text">Lỗi kết nối. Thử lại sau.</div></div>'; }
      else renderEmptyState('Đã xảy ra lỗi khi tìm kiếm.');
    }
  }

  /* ========== SKELETON ========== */
  function showLoadingSkeleton() {
    bodyEl.textContent = ''; focusIdx = -1; currentItems = [];
    for (let i = 0; i < 3; i++) {
      const sk = document.createElement('div'); sk.className = 'global-search-skeleton-item';
      sk.innerHTML = '<div class="global-search-skeleton-icon"></div><div class="global-search-skeleton-lines"><div class="global-search-skeleton-line"></div><div class="global-search-skeleton-line"></div></div>';
      bodyEl.appendChild(sk);
    }
    footerEl.textContent = '';
  }

  /* ========== RENDER KẾT QUẢ ========== */
  function renderSearchResults(data, query) {
    bodyEl.textContent = ''; focusIdx = -1; currentItems = [];
    searchInput.setAttribute('aria-activedescendant', '');
    const results = data.results || {}, total = data.total || 0;
    if (total === 0) { renderEmptyState('Không tìm thấy kết quả phù hợp với "' + query + '"'); renderFooter(query, 0); return; }
    const order = ['courses','lectures','quizzes','resources','community','users','navigation'];
    let itemIdx = 0;
    for (const gk of order) {
      const items = results[gk]; if (!items || !items.length) continue;
      const gc = document.createElement('div'); gc.className = 'global-search-group';
      const gh = document.createElement('div'); gh.className = 'global-search-group-title';
      const ts = document.createElement('span'); ts.textContent = CAT_TITLES[gk] || gk; gh.appendChild(ts);
      const cs = document.createElement('span'); cs.className = 'global-search-group-count'; cs.textContent = String(items.length); gh.appendChild(cs);
      gc.appendChild(gh);
      for (const item of items) {
        const el = createItemElement(item, query);
        el.id = 'gs-item-' + itemIdx++;
        gc.appendChild(el);
        currentItems.push(item);
      }
      bodyEl.appendChild(gc);
    }
    renderFooter(query, total);
  }

  function createItemElement(item, query) {
    const el = document.createElement('a');
    el.className = 'global-search-item';
    el.href = item.url || '#';
    el.setAttribute('role', 'option');
    el.setAttribute('aria-selected', 'false');
    el.setAttribute('tabindex', '-1');
    // Icon/Avatar
    if (item.category === 'users' && item.avatar) {
      const img = document.createElement('img'); img.className = 'global-search-avatar'; img.src = item.avatar; img.alt = item.title;
      img.onerror = () => { img.outerHTML = '<div class="global-search-item-icon">' + ICONS.users + '</div>'; };
      el.appendChild(img);
    } else {
      const ib = document.createElement('div'); ib.className = 'global-search-item-icon';
      ib.innerHTML = ICONS[item.icon] || ICONS[item.category] || ICONS.navigation;
      el.appendChild(ib);
    }
    const cb = document.createElement('div'); cb.className = 'global-search-item-content';
    const tt = document.createElement('div'); tt.className = 'global-search-item-title';
    renderHighlightedText(tt, item.title, query); cb.appendChild(tt);
    if (item.subtitle) { const st = document.createElement('div'); st.className = 'global-search-item-subtitle'; renderHighlightedText(st, item.subtitle, query); cb.appendChild(st); }
    el.appendChild(cb);
    const ar = document.createElement('div'); ar.className = 'global-search-item-arrow'; ar.innerHTML = ICONS.arrowRight; el.appendChild(ar);
    el.addEventListener('click', e => { e.preventDefault(); addToHistory(activeQuery); selectItem(item); });
    return el;
  }

  function renderFooter(query, total) {
    footerEl.textContent = '';
    const btn = document.createElement('a'); btn.className = 'global-search-all-btn';
    btn.href = '/pages/search.html?q=' + encodeURIComponent(query);
    btn.textContent = 'Xem tất cả ' + (total > 0 ? total : '') + ' kết quả (Enter)';
    btn.addEventListener('click', e => { e.preventDefault(); addToHistory(query); navigateToSearchPage(query); });
    footerEl.appendChild(btn);
    const hints = document.createElement('div'); hints.className = 'global-search-hints';
    hints.innerHTML = '<span class="global-search-hint"><kbd>↑</kbd><kbd>↓</kbd> Chọn</span><span class="global-search-hint"><kbd>Esc</kbd> Đóng</span>';
    footerEl.appendChild(hints);
  }

  function renderEmptyState(message) {
    bodyEl.textContent = '';
    const box = document.createElement('div'); box.className = 'global-search-empty';
    const ic = document.createElement('div'); ic.className = 'global-search-empty-icon'; ic.textContent = '🔍'; box.appendChild(ic);
    const ti = document.createElement('div'); ti.className = 'global-search-empty-title'; ti.textContent = 'Không tìm thấy kết quả'; box.appendChild(ti);
    const tx = document.createElement('div'); tx.className = 'global-search-empty-text'; tx.textContent = message;
    const tip = document.createElement('div'); tip.style.fontSize = '11px'; tip.style.opacity = '0.8'; tip.style.marginTop = '4px';
    tip.textContent = 'Thử tìm theo mã môn học như CEA201, MAD101...'; tx.appendChild(tip);
    box.appendChild(tx); bodyEl.appendChild(box);
  }

  /* ========== CHỌN ITEM & ĐIỀU HƯỚNG ========== */
  function confirmLeaveQuizIfNeeded() {
    if (window.location.pathname.includes('practice-quiz.html')) {
      return confirm('Bạn đang trong phòng làm bài thi trắc nghiệm. Bạn có chắc chắn muốn rời bài thi để tìm kiếm không?');
    }
    return true;
  }
  function selectItem(item) {
    if (!item) return;
    if (item.url !== 'action:toggle_theme' && !confirmLeaveQuizIfNeeded()) return;
    closeDropdown();
    if (item.url === 'action:toggle_theme') { toggleThemeAction(); return; }
    if (item.url && item.url !== '#') window.location.href = item.url;
  }
  function handleSubmit() {
    const q = searchInput.value.trim(); if (!q) return;
    const allEls = bodyEl ? bodyEl.querySelectorAll('.global-search-item, .global-search-history-item') : [];
    if (focusIdx >= 0 && focusIdx < allEls.length) { allEls[focusIdx].click(); return; }
    addToHistory(q); navigateToSearchPage(q);
  }
  function navigateToSearchPage(q) {
    if (!confirmLeaveQuizIfNeeded()) return;
    closeDropdown();
    window.location.href = '/pages/search.html?q=' + encodeURIComponent(q);
  }
  function toggleThemeAction() {
    let next = 'light';
    if (window.Lib95 && window.Lib95.themeToggle && typeof window.Lib95.themeToggle.toggleTheme === 'function') {
      window.Lib95.themeToggle.toggleTheme();
      next = window.Lib95.themeToggle.getEffectiveTheme(window.Lib95.themeToggle.getCurrentThemeSetting());
    } else {
      const STORAGE_KEY = 'lib95:settings:data';
      let data = {};
      try { data = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') || {}; } catch (e) { data = {}; }
      if (!data.settings) data.settings = {};
      if (!data.settings.appearance) data.settings.appearance = { theme: 'light', accentColor: 'blue', fontSize: 'medium', backgroundStyle: 'default' };
      const curAttr = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      next = curAttr === 'dark' ? 'light' : 'dark';
      data.settings.appearance.theme = next;
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch (e) {}
      if (next === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
      } else {
        document.documentElement.removeAttribute('data-theme');
      }
      const metaTheme = document.querySelector('meta[name="theme-color"]');
      if (metaTheme) metaTheme.setAttribute('content', next === 'dark' ? '#030712' : '#f5f8ff');
    }
    if (typeof window.showToast === 'function') window.showToast('Đã chuyển sang chế độ ' + (next === 'dark' ? 'Tối' : 'Sáng'));
  }

  /* ========== MỞ / ĐÓNG DROPDOWN ========== */
  function openDropdown() { dropdownEl.classList.add('is-open'); searchInput.setAttribute('aria-expanded', 'true'); }
  function closeDropdown() { dropdownEl.classList.remove('is-open'); searchInput.setAttribute('aria-expanded', 'false'); searchInput.setAttribute('aria-activedescendant', ''); focusIdx = -1; }

  /* ========== KHỞI CHẠY ========== */
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initGlobalSearch);
  else initGlobalSearch();

  window.Lib95GlobalSearch = { open: openDropdown, close: closeDropdown, search: doSearch, init: initGlobalSearch, toggleThemeAction };
})();
