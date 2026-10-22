/**
 * ADMIN DASHBOARD CONTROLLER (Frontend)
 * Dự án: 9.5 AI Library - js/admin-dashboard.js
 * Hoàn toàn độc lập, kết nối API số liệu thật, không số giả.
 */

(function () {
  'use strict';

  // --- 1. STATE & CONFIG ---
  const state = {
    range: localStorage.getItem('admin_dashboard_range') || '7d',
    metric: 'activeUsers', // 'activeUsers' | 'newUsers' | 'contentActivity'
    data: null,
    isLoading: false,
    refreshTimer: null,
    activityPage: 1,
    activityType: '',
    activityTotalPages: 1
  };

  const METRIC_LABELS = {
    activeUsers: 'Active người dùng',
    newUsers: 'Đăng ký mới',
    contentActivity: 'Hoạt động nội dung'
  };

  const METRIC_DESCRIPTIONS = {
    activeUsers: 'Số lượng tài khoản đăng nhập hoặc tương tác API theo ngày',
    newUsers: 'Số tài khoản thành viên mới đăng ký vào hệ thống',
    contentActivity: 'Tổng số hành động tạo nội dung (bài viết, bình luận, tài liệu, khóa học)'
  };

  // Helper lấy token và thông tin người dùng
  function getAuthHeader() {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  function getCurrentUser() {
    try {
      const u = localStorage.getItem('user');
      return u ? JSON.parse(u) : null;
    } catch (e) {
      return null;
    }
  }

  // Helper format số theo tiếng Việt (vi-VN)
  function formatNumber(num) {
    if (num === null || num === undefined) return '0';
    return Number(num).toLocaleString('vi-VN');
  }

  // Helper tính thời gian tương đối
  function formatRelativeTime(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);

    if (diffSec < 45) return 'vừa xong';
    if (diffMin < 60) return `${diffMin} phút trước`;
    if (diffHour < 24) return `${diffHour} giờ trước`;
    if (diffDay < 30) return `${diffDay} ngày trước`;
    return date.toLocaleDateString('vi-VN');
  }

  // --- 2. CÁ NHÂN HÓA LỜI CHÀO & HUY HIỆU ---
  function updateGreeting() {
    const user = getCurrentUser();
    const titleEl = document.getElementById('dashboard-title');
    if (!titleEl) return;

    let displayName = 'Admin';
    let roleText = 'Administrator';

    if (user) {
      displayName = user.full_name || (user.username ? user.username.split('@')[0] : 'Admin');
      displayName = displayName.charAt(0).toUpperCase() + displayName.slice(1);
      roleText = (user.role || 'Admin').toUpperCase();
    }

    titleEl.innerHTML = '';
    const nameSpan = document.createElement('span');
    nameSpan.textContent = `Chào mừng trở lại, ${displayName} `;
    const waveSpan = document.createElement('span');
    waveSpan.setAttribute('aria-hidden', 'true');
    waveSpan.textContent = '👋';

    const roleBadge = document.createElement('span');
    roleBadge.className = 'dashboard-user-role-badge';
    roleBadge.textContent = roleText;

    titleEl.appendChild(nameSpan);
    titleEl.appendChild(waveSpan);
    titleEl.appendChild(document.createTextNode(' '));
    titleEl.appendChild(roleBadge);
  }

  // --- 3. KHỞI TẠO BỘ LỌC THỜI GIAN & CHỈ SỐ ---
  function initDropdowns() {
    const rangeBtn = document.getElementById('dash-range-toggle');
    const rangeMenu = document.getElementById('dash-range-menu');
    const metricBtn = document.getElementById('dash-metric-toggle');
    const metricMenu = document.getElementById('dash-metric-menu');

    // Cập nhật nhãn mặc định từ state
    if (rangeBtn) {
      const labels = { '7d': '7 ngày qua', '30d': '30 ngày qua', '90d': '90 ngày qua' };
      rangeBtn.querySelector('.dash-btn-text').textContent = labels[state.range] || '7 ngày qua';
    }

    // Toggle dropdown
    function setupDropdown(toggleBtn, menuEl, onSelect) {
      if (!toggleBtn || !menuEl) return;

      const container = toggleBtn.closest('.dash-dropdown');

      toggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = container.classList.contains('is-open');
        closeAllDropdowns();
        if (!isOpen) {
          container.classList.add('is-open');
          toggleBtn.setAttribute('aria-expanded', 'true');
        }
      });

      menuEl.querySelectorAll('.dash-dropdown-item').forEach((item) => {
        item.addEventListener('click', (e) => {
          e.stopPropagation();
          const val = item.getAttribute('data-value');
          menuEl.querySelectorAll('.dash-dropdown-item').forEach((i) => i.classList.remove('is-selected'));
          item.classList.add('is-selected');
          container.classList.remove('is-open');
          toggleBtn.setAttribute('aria-expanded', 'false');
          toggleBtn.querySelector('.dash-btn-text').textContent = item.textContent.replace('✓', '').trim();
          onSelect(val);
        });
      });
    }

    function closeAllDropdowns() {
      document.querySelectorAll('.dash-dropdown').forEach((d) => {
        d.classList.remove('is-open');
        const b = d.querySelector('.dash-dropdown-btn');
        if (b) b.setAttribute('aria-expanded', 'false');
      });
    }

    document.addEventListener('click', closeAllDropdowns);
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeAllDropdowns();
    });

    setupDropdown(rangeBtn, rangeMenu, (newRange) => {
      if (newRange !== state.range) {
        state.range = newRange;
        localStorage.setItem('admin_dashboard_range', newRange);
        fetchDashboardData();
      }
    });

    setupDropdown(metricBtn, metricMenu, (newMetric) => {
      if (newMetric !== state.metric) {
        state.metric = newMetric;
        renderLineChart();
      }
    });
  }

  // --- 4. GỌI API DASHBOARD STATS ---
  async function fetchDashboardData() {
    if (state.isLoading) return;
    state.isLoading = true;
    showLoadingSkeletons(true);

    try {
      const res = await fetch(`/api/admin/dashboard?range=${state.range}`, {
        headers: getAuthHeader()
      });

      if (res.status === 401) {
        window.location.href = '../../index.html';
        return;
      }
      if (res.status === 403) {
        showToast('Bạn không có quyền xem trang Quản trị!', true);
        setTimeout(() => { window.location.replace('../../index.html'); }, 1000);
        return;
      }
      if (!res.ok) {
        throw new Error(`Lỗi máy chủ (${res.status})`);
      }

      const data = await res.json();
      state.data = data;

      // Render tất cả thành phần
      renderMetricCards(data.cards);
      renderAttentionPanel(data.needsAttention);
      renderRolesDonut(data.roles, data.cards.users.total);
      renderLineChart();
      hideErrorBanner();
    } catch (err) {
      console.error('Lỗi nạp dữ liệu dashboard:', err);
      showErrorBanner('Không thể tải dữ liệu thống kê. Vui lòng kiểm tra lại kết nối.', () => fetchDashboardData());
    } finally {
      state.isLoading = false;
      showLoadingSkeletons(false);
    }
  }

  // --- 5. RENDER 4 THẺ SỐ LIỆU ---
  function renderMetricCards(cards) {
    if (!cards) return;

    // Card 1: Tổng người dùng
    const uVal = document.getElementById('metric-users-val');
    const uTrend = document.getElementById('metric-users-trend');
    if (uVal) uVal.textContent = formatNumber(cards.users.total);
    if (uTrend) renderTrend(uTrend, cards.users.delta, cards.users.newInRange);

    // Card 2: Tổng khóa học
    const cVal = document.getElementById('metric-courses-val');
    const cTrend = document.getElementById('metric-courses-trend');
    if (cVal) cVal.textContent = formatNumber(cards.courses.total);
    if (cTrend) renderTrend(cTrend, cards.courses.delta, cards.courses.newInRange);

    // Card 3: Bài viết cộng đồng
    const pVal = document.getElementById('metric-posts-val');
    const pTrend = document.getElementById('metric-posts-trend');
    if (pVal) pVal.textContent = formatNumber(cards.posts.total);
    if (pTrend) renderTrend(pTrend, cards.posts.delta, cards.posts.newInRange);

    // Card 4: Tài liệu thư viện (kèm tổng lượt tải)
    const rVal = document.getElementById('metric-resources-val');
    const rTrend = document.getElementById('metric-resources-trend');
    if (rVal) rVal.textContent = formatNumber(cards.resources.total);
    if (rTrend) {
      rTrend.className = 'trend neutral';
      rTrend.innerHTML = '';
      const dlSpan = document.createElement('span');
      dlSpan.textContent = `${formatNumber(cards.resources.downloads)} lượt tải · ${cards.resources.delta.text}`;
      rTrend.appendChild(dlSpan);
    }
  }

  function renderTrend(trendEl, delta, newInRange) {
    trendEl.innerHTML = '';
    trendEl.className = `trend ${delta.direction || 'neutral'}`;

    const textSpan = document.createElement('span');
    textSpan.textContent = delta.text;
    trendEl.appendChild(textSpan);
  }

  // --- 6. RENDER PANEL CẦN XỬ LÝ (ATTENTION) ---
  function renderAttentionPanel(attention) {
    const pendingVal = document.getElementById('attention-pending-count');
    const reportsVal = document.getElementById('attention-reports-count');

    if (pendingVal) {
      pendingVal.textContent = formatNumber(attention ? attention.pendingAccounts : 0);
    }
    if (reportsVal) {
      reportsVal.textContent = formatNumber(attention ? attention.openReports : 0);
    }
  }

  // --- 7. RENDER BIỂU ĐỒ TRÒN PHÂN BỐ VAI TRÒ (DONUT) ---
  function renderRolesDonut(roles, totalUsers) {
    const donutEl = document.getElementById('dashboard-roles-donut');
    const totalEl = document.getElementById('donut-total-users');
    const legendList = document.getElementById('donut-legend-list');

    if (!donutEl || !roles) return;

    if (totalEl) totalEl.textContent = formatNumber(totalUsers);

    // Bảng màu cho 4 vai trò thật
    const roleColors = {
      owner: '#2167e9',   // Xanh dương đậm
      admin: '#43c5dc',   // Xanh cyan
      staff: '#8a64e8',   // Tím violet
      member: '#ffb443'   // Cam vàng
    };

    // Tính dải conic-gradient
    let gradientParts = [];
    let currentPct = 0;

    roles.forEach((r) => {
      const color = roleColors[r.role] || '#94a3b8';
      const pct = r.percent || 0;
      const nextPct = currentPct + pct;
      gradientParts.push(`${color} ${currentPct}% ${nextPct}%`);
      currentPct = nextPct;
    });

    if (totalUsers === 0) {
      donutEl.style.background = '#e2e8f0';
    } else {
      donutEl.style.background = `conic-gradient(${gradientParts.join(', ')})`;
    }

    // Render danh sách chú giải (Legend)
    if (legendList) {
      legendList.innerHTML = '';
      roles.forEach((r) => {
        const li = document.createElement('li');
        const dot = document.createElement('i');
        dot.className = `legend-${r.role}`;
        dot.style.backgroundColor = roleColors[r.role];

        const textNode = document.createTextNode(`${r.label} `);
        const bold = document.createElement('b');
        bold.textContent = `${r.percent}% (${formatNumber(r.count)})`;

        li.appendChild(dot);
        li.appendChild(textNode);
        li.appendChild(bold);
        legendList.appendChild(li);
      });
    }
  }

  // --- 8. RENDER BIỂU ĐỒ ĐƯỜNG SVG (LINE CHART) ---
  function renderLineChart() {
    if (!state.data || !state.data.series) return;

    const seriesData = state.data.series[state.metric] || [];
    const chartHeadingEl = document.getElementById('chart-title');
    const chartSubEl = document.getElementById('chart-subtitle');
    const activeNoteEl = document.getElementById('chart-active-note');

    if (chartHeadingEl) chartHeadingEl.textContent = METRIC_LABELS[state.metric] || 'Biểu đồ hoạt động';
    if (chartSubEl) chartSubEl.textContent = METRIC_DESCRIPTIONS[state.metric] || '';

    if (activeNoteEl) {
      if (state.metric === 'activeUsers' && state.data.series.activeSince) {
        activeNoteEl.textContent = `* Số liệu người dùng hoạt động bắt đầu ghi nhận từ ${state.data.series.activeSince}`;
        activeNoteEl.hidden = false;
      } else {
        activeNoteEl.hidden = true;
      }
    }

    const svgEl = document.getElementById('dashboard-svg-chart');
    const yAxisEl = document.getElementById('chart-y-axis');
    const xAxisEl = document.getElementById('chart-x-axis');
    const tooltipEl = document.getElementById('chart-tooltip');

    if (!svgEl || seriesData.length === 0) return;

    // Tìm max value
    const counts = seriesData.map((d) => d.count);
    const rawMax = Math.max(...counts, 0);

    // Tính mốc trục Y đẹp
    let yMax = 5;
    if (rawMax > 5 && rawMax <= 10) yMax = 10;
    else if (rawMax > 10 && rawMax <= 25) yMax = 25;
    else if (rawMax > 25 && rawMax <= 50) yMax = 50;
    else if (rawMax > 50 && rawMax <= 100) yMax = 100;
    else if (rawMax > 100) yMax = Math.ceil(rawMax / 50) * 50;

    // Render nhãn trục Y
    if (yAxisEl) {
      yAxisEl.innerHTML = '';
      const step = yMax / 4;
      for (let i = 4; i >= 0; i--) {
        const span = document.createElement('span');
        span.textContent = formatNumber(Math.round(step * i));
        yAxisEl.appendChild(span);
      }
    }

    // Tọa độ biểu đồ SVG (viewBox 0 0 600 190)
    const paddingLeft = 30;
    const paddingRight = 570;
    const paddingTop = 20;
    const paddingBottom = 160;
    const chartWidth = paddingRight - paddingLeft;
    const chartHeight = paddingBottom - paddingTop;

    const points = [];
    const stepX = seriesData.length > 1 ? chartWidth / (seriesData.length - 1) : 0;

    seriesData.forEach((item, index) => {
      const x = paddingLeft + index * stepX;
      const normalizedY = yMax > 0 ? item.count / yMax : 0;
      const y = paddingBottom - normalizedY * chartHeight;
      points.push({ x, y, date: item.date, count: item.count });
    });

    // Tạo đường SVG d
    let linePathD = '';
    let areaPathD = '';

    if (points.length > 0) {
      linePathD = `M ${points[0].x} ${points[0].y}`;
      areaPathD = `M ${points[0].x} ${points[0].y}`;

      for (let i = 1; i < points.length; i++) {
        linePathD += ` L ${points[i].x} ${points[i].y}`;
        areaPathD += ` L ${points[i].x} ${points[i].y}`;
      }

      areaPathD += ` L ${points[points.length - 1].x} ${paddingBottom} L ${points[0].x} ${paddingBottom} Z`;
    }

    const areaPathEl = svgEl.querySelector('.chart-area');
    const linePathEl = svgEl.querySelector('.chart-line');
    const pointsGroup = svgEl.querySelector('.chart-points');

    if (areaPathEl) areaPathEl.setAttribute('d', areaPathD);
    if (linePathEl) linePathEl.setAttribute('d', linePathD);

    // Render interactive circles
    if (pointsGroup) {
      pointsGroup.innerHTML = '';
      points.forEach((pt) => {
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', String(pt.x));
        circle.setAttribute('cy', String(pt.y));
        circle.setAttribute('r', '4');
        circle.setAttribute('class', 'chart-point-interactive');
        circle.setAttribute('tabindex', '0');
        circle.setAttribute('role', 'graphics-symbol');
        circle.setAttribute('aria-label', `${pt.date}: ${pt.count}`);

        const showPointTooltip = () => {
          if (!tooltipEl) return;
          const [yr, mo, da] = pt.date.split('-');
          tooltipEl.textContent = `${da}/${mo}/${yr}: ${formatNumber(pt.count)}`;
          const rect = svgEl.getBoundingClientRect();
          const svgBoxWidth = 600;
          const pixelX = (pt.x / svgBoxWidth) * rect.width;
          const pixelY = (pt.y / 190) * rect.height;

          tooltipEl.style.left = `${pixelX}px`;
          tooltipEl.style.top = `${pixelY}px`;
          tooltipEl.classList.add('is-visible');
        };

        const hidePointTooltip = () => {
          if (tooltipEl) tooltipEl.classList.remove('is-visible');
        };

        circle.addEventListener('mouseenter', showPointTooltip);
        circle.addEventListener('mouseleave', hidePointTooltip);
        circle.addEventListener('focus', showPointTooltip);
        circle.addEventListener('blur', hidePointTooltip);

        pointsGroup.appendChild(circle);
      });
    }

    // Render nhãn trục X
    if (xAxisEl) {
      xAxisEl.innerHTML = '';
      // Với 90 ngày thì thưa nhãn (cứ mỗi 10-15 ngày lấy 1 nhãn)
      const interval = seriesData.length > 30 ? Math.ceil(seriesData.length / 7) : (seriesData.length > 10 ? 3 : 1);

      seriesData.forEach((item, idx) => {
        if (idx % interval === 0 || idx === seriesData.length - 1) {
          const span = document.createElement('span');
          const [yr, mo, da] = item.date.split('-');
          span.textContent = `${da}/${mo}`;
          xAxisEl.appendChild(span);
        }
      });
    }
  }

  // --- 9. RENDER HOẠT ĐỘNG GẦN ĐÂY (ACTIVITY LIST) ---
  async function fetchRecentActivity() {
    const listEl = document.getElementById('dashboard-activity-list');
    if (!listEl) return;

    try {
      const res = await fetch('/api/admin/activity?limit=5&page=1', {
        headers: getAuthHeader()
      });

      if (!res.ok) return;
      const data = await res.json();
      const activities = data.activities || [];

      listEl.innerHTML = '';
      if (activities.length === 0) {
        const emptyLi = document.createElement('li');
        emptyLi.style.justifyContent = 'center';
        emptyLi.style.color = '#94a3b8';
        emptyLi.textContent = 'Chưa có hoạt động nào trong hệ thống.';
        listEl.appendChild(emptyLi);
        return;
      }

      activities.forEach((item) => {
        const li = document.createElement('li');

        // Icon theo loại
        const iconSpan = document.createElement('span');
        const iconColor = item.type.includes('course') || item.type.includes('lecture')
          ? 'blue'
          : item.type.includes('user') ? 'green' : 'amber';
        iconSpan.className = `activity-icon ${iconColor}`;

        // Mô tả hành động
        const descSpan = document.createElement('span');
        const boldActor = document.createElement('strong');
        boldActor.textContent = item.actor.name;
        descSpan.appendChild(boldActor);
        descSpan.appendChild(document.createTextNode(` ${item.actionDesc}`));

        if (item.target) {
          const targetB = document.createElement('b');
          targetB.textContent = ` “${item.target}”`;
          descSpan.appendChild(targetB);
        }

        // Thời gian
        const timeEl = document.createElement('time');
        timeEl.textContent = formatRelativeTime(item.at);
        timeEl.setAttribute('datetime', item.at);

        li.appendChild(iconSpan);
        li.appendChild(descSpan);
        li.appendChild(timeEl);

        if (item.href) {
          li.style.cursor = 'pointer';
          li.addEventListener('click', () => {
            window.location.href = item.href;
          });
        }

        listEl.appendChild(li);
      });
    } catch (e) {
      console.error('Lỗi lấy recent activity:', e);
    }
  }

  // --- 10. MODAL XEM TẤT CẢ HOẠT ĐỘNG ---
  function initActivityModal() {
    const openBtn = document.getElementById('dash-view-all-activity');
    const overlay = document.getElementById('activity-modal-overlay');
    const closeBtn = document.getElementById('activity-modal-close');
    const listBody = document.getElementById('activity-modal-list');
    const prevBtn = document.getElementById('activity-prev-page');
    const nextBtn = document.getElementById('activity-next-page');
    const pageIndicator = document.getElementById('activity-page-indicator');
    const filterChips = document.querySelectorAll('.activity-filter-chip');

    if (!openBtn || !overlay) return;

    openBtn.addEventListener('click', (e) => {
      e.preventDefault();
      overlay.classList.add('is-active');
      state.activityPage = 1;
      loadModalActivity();
    });

    closeBtn?.addEventListener('click', () => overlay.classList.remove('is-active'));
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) overlay.classList.remove('is-active');
    });

    filterChips.forEach((chip) => {
      chip.addEventListener('click', () => {
        filterChips.forEach((c) => c.classList.remove('is-active'));
        chip.classList.add('is-active');
        state.activityType = chip.getAttribute('data-type') || '';
        state.activityPage = 1;
        loadModalActivity();
      });
    });

    prevBtn?.addEventListener('click', () => {
      if (state.activityPage > 1) {
        state.activityPage--;
        loadModalActivity();
      }
    });

    nextBtn?.addEventListener('click', () => {
      if (state.activityPage < state.activityTotalPages) {
        state.activityPage++;
        loadModalActivity();
      }
    });

    async function loadModalActivity() {
      if (!listBody) return;
      listBody.innerHTML = '<div style="text-align:center; padding:30px; color:#94a3b8;">Đang tải danh sách...</div>';

      try {
        if (state.activityType === 'audit_log') {
          const res = await fetch(`/api/admin/audit?limit=15&page=${state.activityPage}`, { headers: getAuthHeader() });
          const data = await res.json();
          state.activityTotalPages = data.totalPages || 1;

          if (pageIndicator) pageIndicator.textContent = `Trang ${data.page} / ${state.activityTotalPages}`;
          if (prevBtn) prevBtn.disabled = state.activityPage <= 1;
          if (nextBtn) nextBtn.disabled = state.activityPage >= state.activityTotalPages;

          listBody.innerHTML = '';
          if (!data.items || data.items.length === 0) {
            listBody.innerHTML = '<div style="text-align:center; padding:30px; color:#94a3b8;">Chưa có nhật ký thao tác quản trị nào.</div>';
            return;
          }

          const ul = document.createElement('ul');
          ul.className = 'activity-list';

          const actionLabelMap = {
            'content.hide': 'đã ẩn nội dung vi phạm',
            'content.restore': 'đã khôi phục nội dung',
            'content.delete': 'đã xóa vĩnh viễn nội dung',
            'report.dismiss': 'đã bỏ qua báo cáo vi phạm',
            'user.role_change': 'đã thay đổi vai trò người dùng',
            'user.status_change': 'đã thay đổi trạng thái người dùng',
            'user.update': 'đã cập nhật thông tin người dùng'
          };

          data.items.forEach((item) => {
            const li = document.createElement('li');
            const descSpan = document.createElement('span');
            const actionText = actionLabelMap[item.action] || item.action;
            const targetInfo = item.targetType ? `${item.targetType} #${item.targetId || ''}` : '';
            descSpan.innerHTML = `<strong>${escapeHtml(item.actor.name)}</strong> <span style="font-size:11px; font-weight:700; text-transform:uppercase; color:var(--accent-bright,#2167e9);">[${escapeHtml(item.actor.role || 'admin')}]</span> ${escapeHtml(actionText)} <b>${escapeHtml(targetInfo)}</b>`;

            const timeEl = document.createElement('time');
            timeEl.textContent = formatRelativeTime(item.createdAt);

            li.appendChild(descSpan);
            li.appendChild(timeEl);
            ul.appendChild(li);
          });

          listBody.appendChild(ul);
          return;
        }

        let url = `/api/admin/activity?limit=15&page=${state.activityPage}`;
        if (state.activityType) url += `&type=${encodeURIComponent(state.activityType)}`;

        const res = await fetch(url, { headers: getAuthHeader() });
        const data = await res.json();
        state.activityTotalPages = data.totalPages || 1;

        if (pageIndicator) pageIndicator.textContent = `Trang ${data.page} / ${state.activityTotalPages}`;
        if (prevBtn) prevBtn.disabled = state.activityPage <= 1;
        if (nextBtn) nextBtn.disabled = state.activityPage >= state.activityTotalPages;

        listBody.innerHTML = '';
        if (!data.activities || data.activities.length === 0) {
          listBody.innerHTML = '<div style="text-align:center; padding:30px; color:#94a3b8;">Không có hoạt động nào phù hợp bộ lọc.</div>';
          return;
        }

        const ul = document.createElement('ul');
        ul.className = 'activity-list';

        data.activities.forEach((item) => {
          const li = document.createElement('li');
          const descSpan = document.createElement('span');
          descSpan.innerHTML = `<strong>${escapeHtml(item.actor.name)}</strong> ${escapeHtml(item.actionDesc)} ${item.target ? `<b>“${escapeHtml(item.target)}”</b>` : ''}`;

          const timeEl = document.createElement('time');
          timeEl.textContent = formatRelativeTime(item.at);

          li.appendChild(descSpan);
          li.appendChild(timeEl);
          ul.appendChild(li);
        });

        listBody.appendChild(ul);
      } catch (err) {
        listBody.innerHTML = '<div style="text-align:center; padding:30px; color:#ef4444;">Lỗi khi tải hoạt động.</div>';
      }
    }
  }

  function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  // --- 11. ĐỒNG BỘ CHUÔNG THÔNG BÁO TOPBAR ---
  async function syncNotifications() {
    const listEl = document.querySelector('#notification-panel .notification-list');
    const dot = document.querySelector('.notification-dot');
    const bell = document.querySelector('.notification .icon-button');
    if (!listEl) return;

    try {
      const res = await fetch('/api/community/notifications', { headers: getAuthHeader() });
      if (!res.ok) return;

      const data = await res.json();
      const notifs = data.notifications || [];

      if (dot) dot.hidden = data.unreadCount === 0;
      if (bell) bell.setAttribute('aria-label', `Notifications (${data.unreadCount || 0} mới)`);

      listEl.innerHTML = '';
      if (notifs.length === 0) {
        const emptyLi = document.createElement('li');
        emptyLi.className = 'notification-item';
        emptyLi.style.justifyContent = 'center';
        emptyLi.style.color = '#94a3b8';
        emptyLi.textContent = 'Chưa có thông báo nào.';
        listEl.appendChild(emptyLi);
        return;
      }

      notifs.slice(0, 5).forEach((n) => {
        const li = document.createElement('li');
        li.className = `notification-item ${!n.is_read ? 'is-unread' : ''}`;
        if (n.is_pinned) {
          li.style.background = 'var(--color-primary-soft)';
          li.style.borderLeft = '3px solid var(--color-primary)';
        }

        const iconSpan = document.createElement('span');
        iconSpan.className = 'notification-item-icon';
        iconSpan.setAttribute('aria-hidden', 'true');

        const div = document.createElement('div');
        const p = document.createElement('p');
        p.className = 'notification-text';
        if (n.type === 'post') {
          p.textContent = n.is_pinned ? `📌 [Pinned] ${n.actor.name} published a new post` : `${n.actor.name} published a new post`;
        } else {
          p.textContent = `${n.actor.name} đã tương tác với bạn`;
        }

        const time = document.createElement('time');
        time.className = 'notification-time';
        time.textContent = formatRelativeTime(n.created_at);

        div.appendChild(p);
        div.appendChild(time);
        li.appendChild(iconSpan);
        li.appendChild(div);
        listEl.appendChild(li);
      });
    } catch (e) {
      // Bỏ qua lỗi nếu trang offline
    }
  }

  // --- 12. SKELETON LOADING & TOAST ---
  function showLoadingSkeletons(show) {
    const elements = document.querySelectorAll('[data-dash-val]');
    elements.forEach((el) => {
      if (show) el.classList.add('dash-skeleton');
      else el.classList.remove('dash-skeleton');
    });
  }

  function showToast(msg, isError = false) {
    let toast = document.getElementById('dash-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'dash-toast';
      toast.className = 'dash-toast';
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.className = `dash-toast is-show ${isError ? 'is-error' : ''}`;
    setTimeout(() => toast.classList.remove('is-show'), 3500);
  }

  function showErrorBanner(msg, onRetry) {
    let banner = document.getElementById('dash-error-banner');
    if (!banner) {
      banner = document.createElement('div');
      banner.id = 'dash-error-banner';
      banner.style.padding = '12px 18px';
      banner.style.marginBottom = '20px';
      banner.style.borderRadius = '10px';
      banner.style.background = 'rgba(239, 68, 68, 0.12)';
      banner.style.border = '1px solid rgba(239, 68, 68, 0.3)';
      banner.style.color = '#ef4444';
      banner.style.display = 'flex';
      banner.style.alignItems = 'center';
      banner.style.justifyContent = 'space-between';
      const pageHeading = document.querySelector('#page-dashboard .page-heading');
      if (pageHeading) pageHeading.after(banner);
    }
    banner.innerHTML = `<span>⚠️ ${escapeHtml(msg)}</span>`;
    const retryBtn = document.createElement('button');
    retryBtn.textContent = 'Thử lại';
    retryBtn.style.padding = '4px 12px';
    retryBtn.style.borderRadius = '6px';
    retryBtn.style.border = 'none';
    retryBtn.style.background = '#ef4444';
    retryBtn.style.color = '#ffffff';
    retryBtn.style.cursor = 'pointer';
    retryBtn.style.fontWeight = '600';
    retryBtn.addEventListener('click', onRetry);
    banner.appendChild(retryBtn);
    banner.hidden = false;
  }

  function hideErrorBanner() {
    const banner = document.getElementById('dash-error-banner');
    if (banner) banner.hidden = true;
  }

  // --- 13. TỰ ĐỘNG LÀM MỚI (POLLING 60S KHI TAB HIỂN THỊ) ---
  function initAutoRefresh() {
    if (state.refreshTimer) clearInterval(state.refreshTimer);

    state.refreshTimer = setInterval(() => {
      // Chỉ làm mới khi trang đang mở và tab Dashboard đang active
      const dashPanel = document.getElementById('page-dashboard');
      if (!document.hidden && dashPanel && dashPanel.classList.contains('is-visible')) {
        fetchDashboardData();
        fetchRecentActivity();
        syncNotifications();
      }
    }, 60000);
  }

  // --- 14. KHỞI TẠO TỔNG THỂ KHI LOAD DOM ---
  document.addEventListener('DOMContentLoaded', () => {
    updateGreeting();
    initDropdowns();
    initActivityModal();
    fetchDashboardData();
    fetchRecentActivity();
    syncNotifications();
    initAutoRefresh();
  });
})();


// --- Bổ sung: Xử lý Đăng xuất Admin (admin-logout-init) ---
document.addEventListener('DOMContentLoaded', () => {
  const logoutBtn = document.querySelector('a[href="#signout"]');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
      e.preventDefault();
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.replace('../../pages/auth/login.html');
    });
  }
});
