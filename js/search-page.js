/**
 * ==========================================================================
 * Search Page Logic (js/search-page.js)
 * Xử lý tìm kiếm toàn diện, bộ lọc tab danh mục và hiển thị kết quả chi tiết
 * ==========================================================================
 */
(function () {
  'use strict';

  // Khai báo nhãn hiển thị cho các danh mục
  const CATEGORIES = {
    all: { label: 'Tất cả', icon: '🔍' },
    courses: { label: 'Môn học', icon: '📚', actionText: 'Xem môn học' },
    lectures: { label: 'Bài giảng LMS', icon: '🎥', actionText: 'Vào học ngay' },
    quizzes: { label: 'Đề luyện tập', icon: '📝', actionText: 'Làm bài thi' },
    resources: { label: 'Tài liệu', icon: '📁', actionText: 'Tải tài liệu' },
    community: { label: 'Cộng đồng', icon: '💬', actionText: 'Xem thảo luận' },
    users: { label: 'Thành viên', icon: '👤', actionText: 'Xem hồ sơ' },
    navigation: { label: 'Trang & Cài đặt', icon: '🧭', actionText: 'Mở trang' }
  };

  const VIETNAMESE_ACCENT_MAP = {
    a: '[aàáảãạăằắẳẵặâầấẩẫậ]',
    e: '[eèéẻẽẹêềếểễệ]',
    i: '[iìíỉĩị]',
    o: '[oòóỏõọôồốổỗộơờớởỡợ]',
    u: '[uùúủũụưừứửữự]',
    y: '[yỳýỷỹỵ]',
    d: '[dđ]'
  };

  function buildAccentRegex(str) {
    if (!str || typeof str !== 'string') return null;
    const lower = str.toLowerCase();
    const pattern = lower
      .split('')
      .map(char => VIETNAMESE_ACCENT_MAP[char] || char.replace(/[\^$\\.*+?()[\]{}|]/g, '\\$&'))
      .join('');
    return new RegExp(pattern, 'gi');
  }

  // Highlight an toàn chống XSS
  function renderHighlightedText(container, text, query) {
    container.textContent = '';
    if (!text) return;
    if (!query || !query.trim()) {
      container.textContent = text;
      return;
    }

    try {
      const rx = buildAccentRegex(query.trim());
      if (!rx) {
        container.textContent = text;
        return;
      }

      let lastIndex = 0;
      let match;
      let matchedAny = false;

      while ((match = rx.exec(text)) !== null) {
        matchedAny = true;
        if (match.index > lastIndex) {
          container.appendChild(document.createTextNode(text.slice(lastIndex, match.index)));
        }
        const mark = document.createElement('mark');
        mark.className = 'global-search-highlight';
        mark.textContent = match[0];
        container.appendChild(mark);

        lastIndex = rx.lastIndex;
        if (match.index === rx.lastIndex) rx.lastIndex++;
      }

      if (lastIndex < text.length) {
        container.appendChild(document.createTextNode(text.slice(lastIndex)));
      }

      if (!matchedAny) {
        container.textContent = text;
      }
    } catch (e) {
      container.textContent = text;
    }
  }

  // Trạng thái trang
  let currentQuery = '';
  let activeTab = 'all';
  let cachedData = null;

  // DOM Elements
  const heroInput = document.getElementById('search-hero-input');
  const heroForm = document.getElementById('search-hero-form');
  const clearBtn = document.getElementById('search-hero-clear');
  const summaryEl = document.getElementById('search-page-summary');
  const tabsContainer = document.getElementById('search-tabs');
  const resultsGrid = document.getElementById('search-results-grid');

  async function initSearchPage() {
    // 1. Đọc tham số URL ?q=
    const params = new URLSearchParams(window.location.search);
    currentQuery = (params.get('q') || '').trim();
    activeTab = (params.get('type') || 'all').toLowerCase();
    if (!CATEGORIES[activeTab]) activeTab = 'all';

    // 2. Điền sẵn từ khóa vào ô tìm kiếm
    if (heroInput) {
      heroInput.value = currentQuery;
      updateClearButton();
    }
    const topbarInput = document.getElementById('site-search');
    if (topbarInput) {
      topbarInput.value = currentQuery;
    }

    // 3. Gắn sự kiện ô tìm kiếm chính
    if (heroForm) {
      heroForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const q = heroInput.value.trim();
        if (q !== currentQuery) {
          currentQuery = q;
          updateUrl();
          executeSearch();
        }
      });
    }

    if (heroInput) {
      heroInput.addEventListener('input', updateClearButton);
    }

    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        heroInput.value = '';
        updateClearButton();
        heroInput.focus();
      });
    }

    // 4. Thực thi tìm kiếm ban đầu
    if (currentQuery) {
      await executeSearch();
    } else {
      renderInitialEmptyState();
    }
  }

  function updateClearButton() {
    if (!clearBtn || !heroInput) return;
    clearBtn.style.display = heroInput.value.length > 0 ? 'block' : 'none';
  }

  function updateUrl() {
    const url = new URL(window.location);
    if (currentQuery) {
      url.searchParams.set('q', currentQuery);
    } else {
      url.searchParams.delete('q');
    }
    if (activeTab && activeTab !== 'all') {
      url.searchParams.set('type', activeTab);
    } else {
      url.searchParams.delete('type');
    }
    window.history.pushState({}, '', url);
  }

  // Gọi API backend tìm kiếm
  async function executeSearch() {
    renderLoadingSkeletons();

    try {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      const headers = { 'Accept': 'application/json' };
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const res = await fetch(`/api/search?q=${encodeURIComponent(currentQuery)}&limit=30`, { headers });
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);

      const data = await res.json();
      cachedData = data;

      renderTabs(data.counts || {}, data.total || 0);
      renderSummary(data.total || 0);
      renderCurrentGrid();
    } catch (err) {
      console.error('Lỗi tìm kiếm:', err);
      renderErrorState('Đã xảy ra lỗi khi kết nối máy chủ. Vui lòng thử lại sau.');
    }
  }

  // Render thanh Tabs
  function renderTabs(counts, total) {
    if (!tabsContainer) return;
    tabsContainer.textContent = '';

    const tabKeys = ['all', 'courses', 'lectures', 'quizzes', 'resources', 'community', 'users', 'navigation'];

    tabKeys.forEach(key => {
      const cat = CATEGORIES[key];
      const count = key === 'all' ? total : (counts[key] || 0);

      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `search-tab-btn ${key === activeTab ? 'is-active' : ''}`;
      btn.setAttribute('role', 'tab');
      btn.setAttribute('data-tab', key);
      btn.setAttribute('aria-selected', key === activeTab ? 'true' : 'false');

      btn.innerHTML = `
        <span>${cat.icon} ${cat.label}</span>
        <span class="search-tab-badge">${count}</span>
      `;

      btn.addEventListener('click', () => {
        if (activeTab === key) return;
        activeTab = key;
        updateUrl();

        // Cập nhật giao diện tab
        tabsContainer.querySelectorAll('.search-tab-btn').forEach(b => {
          b.classList.remove('is-active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('is-active');
        btn.setAttribute('aria-selected', 'true');

        renderCurrentGrid();
      });

      tabsContainer.appendChild(btn);
    });
  }

  // Render dòng tóm tắt
  function renderSummary(total) {
    if (!summaryEl) return;
    summaryEl.textContent = '';

    if (total === 0) {
      summaryEl.textContent = `Không tìm thấy kết quả nào cho "${currentQuery}"`;
      return;
    }

    const span = document.createElement('span');
    span.appendChild(document.createTextNode('Tìm thấy '));
    const strongTotal = document.createElement('strong');
    strongTotal.textContent = `${total} kết quả`;
    span.appendChild(strongTotal);
    span.appendChild(document.createTextNode(' phù hợp với "'));
    const strongQ = document.createElement('strong');
    strongQ.textContent = currentQuery;
    span.appendChild(strongQ);
    span.appendChild(document.createTextNode('"'));

    summaryEl.appendChild(span);
  }

  // Render lưới kết quả theo tab đang chọn
  function renderCurrentGrid() {
    if (!resultsGrid || !cachedData) return;
    resultsGrid.textContent = '';

    const results = cachedData.results || {};
    let itemsToRender = [];

    if (activeTab === 'all') {
      const keys = ['courses', 'lectures', 'quizzes', 'resources', 'community', 'users', 'navigation'];
      keys.forEach(k => {
        if (results[k]) {
          itemsToRender = itemsToRender.concat(results[k]);
        }
      });
      // Sắp xếp theo score giảm dần
      itemsToRender.sort((a, b) => (b.score || 0) - (a.score || 0));
    } else {
      itemsToRender = results[activeTab] || [];
    }

    if (itemsToRender.length === 0) {
      renderTabEmptyState();
      return;
    }

    itemsToRender.forEach(item => {
      const card = createCardElement(item);
      resultsGrid.appendChild(card);
    });
  }

  // Tạo phần tử Card chi tiết
  function createCardElement(item) {
    const card = document.createElement('article');
    card.className = 'search-card';

    // Top
    const top = document.createElement('div');
    top.className = 'search-card-top';

    const pill = document.createElement('span');
    pill.className = 'search-card-pill';
    const catInfo = CATEGORIES[item.category] || { label: item.category };
    pill.textContent = catInfo.label;
    top.appendChild(pill);

    if (item.score) {
      const badge = document.createElement('span');
      badge.className = 'search-card-badge';
      badge.textContent = `Độ khớp ${item.score}%`;
      top.appendChild(badge);
    }
    card.appendChild(top);

    // Main
    const main = document.createElement('div');
    main.className = 'search-card-main';

    if (item.category === 'users' && item.avatar) {
      const img = document.createElement('img');
      img.className = 'search-card-avatar';
      img.src = item.avatar;
      img.alt = item.title;
      img.onerror = () => {
        img.outerHTML = `<div class="search-card-icon">👤</div>`;
      };
      main.appendChild(img);
    } else {
      const icon = document.createElement('div');
      icon.className = 'search-card-icon';
      icon.textContent = catInfo.icon || '📌';
      main.appendChild(icon);
    }

    const body = document.createElement('div');
    body.className = 'search-card-body';

    const title = document.createElement('h3');
    title.className = 'search-card-title';
    renderHighlightedText(title, item.title, currentQuery);
    body.appendChild(title);

    if (item.subtitle) {
      const subtitle = document.createElement('p');
      subtitle.className = 'search-card-subtitle';
      renderHighlightedText(subtitle, item.subtitle, currentQuery);
      body.appendChild(subtitle);
    }
    main.appendChild(body);
    card.appendChild(main);

    // Footer Action
    const footer = document.createElement('div');
    footer.className = 'search-card-footer';

    const action = document.createElement('a');
    action.className = 'search-card-action';
    action.href = item.url || '#';
    action.innerHTML = `<span>${catInfo.actionText || 'Xem chi tiết'}</span> →`;
    action.addEventListener('click', (e) => {
      if (item.url === 'action:toggle_theme') {
        e.preventDefault();
        if (typeof window.Lib95GlobalSearch?.toggleThemeAction === 'function') {
          window.Lib95GlobalSearch.toggleThemeAction();
        } else if (typeof window.Lib95?.themeToggle?.toggleTheme === 'function') {
          window.Lib95.themeToggle.toggleTheme();
        } else {
          const current = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
          if (current === 'dark') document.documentElement.removeAttribute('data-theme');
          else document.documentElement.setAttribute('data-theme', 'dark');
        }
      }
    });
    footer.appendChild(action);
    card.appendChild(footer);

    return card;
  }

  // Skeleton loading
  function renderLoadingSkeletons() {
    if (!resultsGrid) return;
    resultsGrid.textContent = '';
    for (let i = 0; i < 6; i++) {
      const card = document.createElement('div');
      card.className = 'search-card search-card-skeleton';
      card.innerHTML = `
        <div class="search-card-top"><span class="search-card-pill" style="width:70px;height:18px;">&nbsp;</span></div>
        <div class="search-card-main">
          <div class="search-card-icon">&nbsp;</div>
          <div class="search-card-body">
            <div class="search-card-title" style="height:18px;margin-bottom:8px;">&nbsp;</div>
            <div class="search-card-subtitle" style="height:14px;width:80%;">&nbsp;</div>
          </div>
        </div>
        <div class="search-card-footer"><span class="search-card-action" style="width:90px;height:16px;">&nbsp;</span></div>
      `;
      resultsGrid.appendChild(card);
    }
  }

  // Trạng thái trống ban đầu khi chưa gõ gì
  function renderInitialEmptyState() {
    if (summaryEl) summaryEl.textContent = 'Gõ từ khóa để bắt đầu tìm kiếm trong toàn bộ nền tảng.';
    if (!resultsGrid) return;
    resultsGrid.textContent = '';

    const empty = document.createElement('div');
    empty.className = 'search-page-empty';
    empty.style.gridColumn = '1 / -1';
    empty.innerHTML = `
      <div class="search-empty-icon">💡</div>
      <div class="search-empty-title">Tìm kiếm môn học, bài giảng và tài nguyên</div>
      <div class="search-empty-desc">Hệ thống hỗ trợ tìm kiếm tiếng Việt cả có dấu và không dấu trên toàn bộ cơ sở tri thức của 9.5 AI CLUB.</div>
      <div class="search-suggest-chips">
        <button type="button" class="search-suggest-chip" data-search="CEA201">CEA201</button>
        <button type="button" class="search-suggest-chip" data-search="MAD101">MAD101</button>
        <button type="button" class="search-suggest-chip" data-search="Toán rời rạc">Toán rời rạc</button>
        <button type="button" class="search-suggest-chip" data-search="Kiến trúc máy tính">Kiến trúc máy tính</button>
        <button type="button" class="search-suggest-chip" data-search="Cơ sở dữ liệu">Cơ sở dữ liệu</button>
        <button type="button" class="search-suggest-chip" data-search="dark">Chế độ tối (Dark)</button>
      </div>
    `;

    empty.querySelectorAll('.search-suggest-chip').forEach(btn => {
      btn.addEventListener('click', () => {
        const q = btn.dataset.search;
        if (heroInput) heroInput.value = q;
        currentQuery = q;
        updateClearButton();
        updateUrl();
        executeSearch();
      });
    });

    resultsGrid.appendChild(empty);
  }

  function renderTabEmptyState() {
    const empty = document.createElement('div');
    empty.className = 'search-page-empty';
    empty.style.gridColumn = '1 / -1';
    empty.innerHTML = `
      <div class="search-empty-icon">🔍</div>
      <div class="search-empty-title">Không có kết quả trong danh mục này</div>
      <div class="search-empty-desc">Không tìm thấy mục nào thuộc nhóm "${CATEGORIES[activeTab]?.label || activeTab}" khớp với từ khóa "${currentQuery}". Thử chọn tab "Tất cả" hoặc tìm từ khóa khác.</div>
    `;
    resultsGrid.appendChild(empty);
  }

  function renderErrorState(msg) {
    if (!resultsGrid) return;
    resultsGrid.textContent = '';
    const err = document.createElement('div');
    err.className = 'search-page-empty';
    err.style.gridColumn = '1 / -1';
    err.innerHTML = `
      <div class="search-empty-icon">⚠️</div>
      <div class="search-empty-title">Lỗi tìm kiếm</div>
      <div class="search-empty-desc">${msg}</div>
      <button type="button" class="search-hero-btn" style="margin: 0 auto;" onclick="location.reload()">Thử lại</button>
    `;
    resultsGrid.appendChild(err);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSearchPage);
  } else {
    initSearchPage();
  }
})();
