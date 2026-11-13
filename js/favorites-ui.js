/**
 * File: js/favorites-ui.js
 * Mục đích: Render DOM, hiển thị dữ liệu lên giao diện trang Favorites và kết nối tương tác.
 */
(function () {
  'use strict';
  window.Lib95 = window.Lib95 || {};
  window.Lib95.favorites = window.Lib95.favorites || {};

  const F = window.Lib95.favorites;

  // Bản đồ chi tiết thông tin, icon và màu sắc đặc trưng của từng môn học thực hành
  const SUBJECT_MAP = {
    1: { code: 'CEA201', name: 'Computer Architecture', icon: '/assets/icon/chip.png', semester: 'Semester II', colorClass: '1' },
    2: { code: 'DBI202', name: 'Database', icon: '/assets/icon/data.png', semester: 'Semester II', colorClass: '2' },
    3: { code: 'PFP191', name: 'Programming Fundamentals', icon: '/assets/icon/program.png', semester: 'Semester I', colorClass: '3' },
    4: { code: 'CSD203', name: 'Data Structure & Algorithm', icon: '/assets/icon/mas_green.png', semester: 'Semester II', colorClass: '4' },
    5: { code: 'CSI106', name: 'Foundations of Computer Science', icon: '/assets/icon/soft.png', semester: 'Semester I', colorClass: '5' },
    6: { code: 'MAD101', name: 'Discrete Mathematics', icon: '/assets/icon/math.png', semester: 'Semester I', colorClass: '2' },
    7: { code: 'MAE101', name: 'Mathematics for Engineering', icon: '/assets/icon/math.png', semester: 'Semester I', colorClass: '1' },
    8: { code: 'JPD113', name: 'Elementary Japanese 1- A1.1', icon: '/assets/icon/japanese_icon.png', semester: 'Semester II', colorClass: '5' },
    9: { code: 'AIG202c', name: 'Artificial Intelligence Foundation IBM', icon: '/assets/icon/Better_Icon/artificial-intellegence.png', semester: 'Semester II', colorClass: '3' }
  };

  // SVG icon mặc định
  const ICONS = {
    subject: `<svg viewBox="0 0 24 24" width="28" height="28" fill="#f59e0b" stroke="#d97706" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
    lecture: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>`,
    practice: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>`,
    resource: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>`
  };

  const META_ICONS = {
    subject: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 3v18"/><path d="M14 9h4"/><path d="M14 15h4"/></svg>`,
    lecture: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
    practice: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
    resource: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>`
  };

  const LABELS = {
    subject: "Practice",
    practice: "Practice",
    lecture: "Lecture",
    resource: "Resource"
  };

  function escapeHtml(str) {
    if (str === null || str === undefined) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function getSubjectIcon(code) {
    const c = (code || '').toUpperCase();
    if (c.indexOf('CSD') !== -1 || c.indexOf('ALGO') !== -1) return '/assets/icon/mas_green.png';
    if (c.indexOf('JPD') !== -1 || c.indexOf('JAP') !== -1) return '/assets/icon/japanese_icon.png';
    if (c.indexOf('DB') !== -1 || c.indexOf('DATA') !== -1) return '/assets/icon/data.png';
    if (c.indexOf('PRO') !== -1 || c.indexOf('WEB') !== -1 || c.indexOf('PRJ') !== -1) return '/assets/icon/program.png';
    if (c.indexOf('MAS') !== -1 || c.indexOf('MATH') !== -1) return '/assets/icon/math.png';
    if (c.indexOf('AIG') !== -1 || c.indexOf('AI') !== -1 || c.indexOf('ML') !== -1) return '/assets/icon/Better_Icon/artificial-intellegence.png';
    return '/assets/icon/chip.png';
  }

  F.getSubjectIcon = getSubjectIcon;

  /**
   * Tạo HTML cho một thẻ Grid Item kèm menu ba chấm đa năng.
   * @param {Object} item - Dữ liệu của mục yêu thích.
   * @returns {String} Chuỗi HTML.
   */
  function createCardHTML(item) {
    const isLecCourse = item.type === 'lecture';
    const isPrcSubject = item.type === 'practice';
    const isResource = item.type === 'resource';

    const targetLink = item.link || '#';
    let thumbHtml = '';
    let thumbClass = `fav-thumb-${item.type}`;
    let badgeClass = `fav-badge-${item.type}`;
    let displayTitle = item.title || '';
    let displaySubtitle = '';
    let badgeText = LABELS[item.type] || 'Item';

    if (isLecCourse) {
      thumbClass = 'fav-thumb-lecture';
      badgeClass = 'fav-badge-lecture';
      badgeText = 'Lecture';
      const iconUrl = item.icon || getSubjectIcon(item.subject || item.title);
      thumbHtml = `<img src="${escapeHtml(iconUrl)}" alt="${escapeHtml(item.subject || 'Course')}" style="width: 34px; height: 34px; object-fit: contain;" />`;
      displayTitle = item.title || item.subject || 'Course';
      displaySubtitle = `${escapeHtml(item.subject || '')} · ${escapeHtml(item.meta || 'Lectures')}`;
    } else if (isPrcSubject) {
      const numId = Number(item.subjectId || item.rawId || 1);
      const subInfo = SUBJECT_MAP[numId] || {
        code: item.subject || 'SUB',
        name: item.title || 'Course',
        icon: (item.icon && item.icon.startsWith('/')) ? item.icon : '/assets/icon/chip.png',
        semester: 'Semester II',
        colorClass: '1'
      };
      thumbClass = `fav-thumb-subject fav-thumb-subject-${subInfo.colorClass}`;
      badgeClass = `fav-badge-subject fav-badge-subject-${subInfo.colorClass}`;
      badgeText = 'Practice';
      const prcIconUrl = (item.icon && item.icon.startsWith('/')) ? item.icon : subInfo.icon;
      thumbHtml = `<img src="${escapeHtml(prcIconUrl)}" alt="${escapeHtml(subInfo.code)}" style="width: 44px; height: 44px; object-fit: contain;" />`;
      displayTitle = item.title || subInfo.name;
      displaySubtitle = `${subInfo.code} · ${subInfo.semester}`;
    } else if (isResource) {
      thumbClass = 'fav-thumb-resource';
      badgeClass = 'fav-badge-resource';
      badgeText = 'Resource';
      thumbHtml = ICONS.resource;
      displayTitle = item.title;
      displaySubtitle = `${item.subject || 'Chung'} · ${item.meta || 'Document'}`;
    } else {
      thumbHtml = ICONS[item.type] || ICONS.resource;
    }

    // Biểu tượng "đã yêu thích" thống nhất là NGÔI SAO cam cho mọi loại thẻ
    const actionBtnHtml = `
      <button class="fav-btn-icon fav-bookmark is-active" aria-label="Bỏ yêu thích: ${escapeHtml(displayTitle)}" data-action="remove" data-id="${escapeHtml(item.id)}" title="Bỏ yêu thích">
        <svg viewBox="0 0 24 24" fill="#f59e0b" stroke="#d97706" stroke-width="2" style="width:16px;height:16px;" aria-hidden="true">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
      </button>
    `;

    const titleLink = `
      <a href="${escapeHtml(targetLink)}" style="color:inherit;text-decoration:none;" class="fav-card-anchor" data-link="${escapeHtml(targetLink)}" title="${escapeHtml(displayTitle)}">
        ${escapeHtml(displayTitle)}
      </a>
    `;

    const metaIcon = META_ICONS[item.type] || META_ICONS.resource;

    return `
      <article class="fav-card ${(isLecCourse || isPrcSubject) ? 'fav-card-subject-item' : ''}" data-id="${escapeHtml(item.id)}" data-link="${escapeHtml(targetLink)}">
        <div class="fav-card-thumb ${thumbClass}">
           ${thumbHtml}
        </div>
        <div class="fav-card-body">
           <div class="fav-card-header">
             <span class="fav-badge ${badgeClass}"><span class="fav-dot"></span> ${badgeText}</span>
             <div class="fav-dropdown">
               <button class="fav-btn-icon fav-more-btn" aria-label="Tùy chọn khác" aria-haspopup="true" data-id="${escapeHtml(item.id)}">
                 <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
               </button>
               <ul class="fav-dropdown-menu" hidden>
                 <li>
                   <button type="button" data-action="open" data-link="${escapeHtml(targetLink)}">
                     <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                     Mở trang
                   </button>
                 </li>
                 <li>
                   <button type="button" data-action="copy-link" data-link="${escapeHtml(targetLink)}">
                     <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                     Sao chép liên kết
                   </button>
                 </li>
                 <li>
                   <button type="button" class="fav-text-danger" data-action="remove" data-id="${escapeHtml(item.id)}">
                     <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                     Bỏ yêu thích
                   </button>
                 </li>
               </ul>
             </div>
           </div>
           <h3 class="fav-card-title" title="${escapeHtml(displayTitle)}">${titleLink}</h3>
           <p class="fav-card-subject" title="${escapeHtml(displaySubtitle)}">${escapeHtml(displaySubtitle)}</p>
           <div class="fav-card-footer">
             <span class="fav-card-meta">
               ${metaIcon} ${escapeHtml(item.meta || '')}
             </span>
             ${actionBtnHtml}
           </div>
        </div>
      </article>
    `;
  }

  /**
   * Cập nhật số đếm badge trên các tab All, Practices, Lectures, Resources
   */
  F.updateTabCounts = function (counts) {
    const tabs = document.querySelectorAll('.fav-tab');
    tabs.forEach(tab => {
      const tabName = tab.dataset.tab || tab.textContent.replace(/\(.*?\)/, '').trim();
      const countSpan = tab.querySelector('.fav-tab-count');
      if (countSpan && counts && typeof counts[tabName] === 'number') {
        countSpan.textContent = `(${counts[tabName]})`;
      }
    });
  };

  /**
   * Render danh sách mảng dữ liệu ra UI (chế độ Grid).
   * @param {Array} data - Mảng các mục yêu thích.
   * @param {Boolean} isSearchActive - Đang có từ khóa tìm kiếm hay không.
   * @param {String} searchQuery - Từ khóa tìm kiếm hiện tại.
   */
  F.renderGrid = function (data, isSearchActive, searchQuery) {
    const gridEl = document.getElementById("fav-grid-container");
    const emptyEl = document.getElementById("fav-empty-state");
    const errorEl = document.getElementById("fav-error-state");

    if (errorEl) errorEl.hidden = true;
    if (!gridEl || !emptyEl) return;

    if (!data || data.length === 0) {
      if (isSearchActive) {
        // Trạng thái không tìm thấy kết quả tìm kiếm
        gridEl.hidden = false;
        emptyEl.hidden = true;
        gridEl.innerHTML = `
          <div class="fav-search-empty">
            <div class="fav-search-empty-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            </div>
            <h3 class="fav-search-empty-title">Không tìm thấy kết quả</h3>
            <p class="fav-search-empty-desc">Không có mục yêu thích nào khớp với từ khóa "<strong>${escapeHtml(searchQuery || '')}</strong>".</p>
            <button type="button" class="fav-btn-clear-search" id="fav-btn-clear-search">Xóa tìm kiếm</button>
          </div>
        `;
      } else {
        // Trạng thái danh sách trống bình thường
        gridEl.hidden = true;
        emptyEl.hidden = false;
        gridEl.innerHTML = "";
      }
    } else {
      gridEl.hidden = false;
      emptyEl.hidden = true;
      gridEl.innerHTML = data.map(item => createCardHTML(item)).join('');
    }
  };

  /**
   * Mở modal xác nhận xoá và điền dữ liệu item vào modal.
   * @param {Object} item - Item chuẩn bị xoá.
   */
  F.showRemoveModal = function (item) {
    const modal = document.getElementById("fav-modal-remove");
    if (!modal) return;

    const isLecCourse = item.type === 'lecture';
    const isPrcSubject = item.type === 'practice';
    const isResource = item.type === 'resource';

    let displayTitle = item.title || '';
    let displaySubtitle = `${item.subject || ''} · ${item.meta || ''}`;

    if (isLecCourse) {
      displayTitle = item.title || item.subject || 'Course';
      displaySubtitle = `${item.subject || ''} · ${item.meta || 'Lectures'}`;
    } else if (isPrcSubject) {
      const numId = Number(item.subjectId || item.rawId || 1);
      const subInfo = SUBJECT_MAP[numId] || { code: item.subject || 'SUB', name: item.title, icon: '/assets/icon/chip.png', semester: 'Semester II' };
      displayTitle = item.title || subInfo.name;
      displaySubtitle = `${subInfo.code} · ${subInfo.semester} · ${item.meta || ''}`;
    } else if (isResource) {
      displayTitle = item.title;
      displaySubtitle = `${item.subject || 'Chung'} · ${item.meta || 'Document'}`;
    }

    // Gán dữ liệu an toàn vào modal bằng textContent
    const titleEl = modal.querySelector(".fav-modal-desc strong");
    if (titleEl) titleEl.textContent = `"${displayTitle}"`;

    const miniThumb = modal.querySelector(".fav-mini-thumb");
    if (miniThumb) {
      if (isLecCourse) {
        miniThumb.className = `fav-mini-thumb fav-thumb-lecture`;
        const iconUrl = item.icon || getSubjectIcon(item.subject || item.title);
        miniThumb.innerHTML = `<img src="${escapeHtml(iconUrl)}" alt="${escapeHtml(item.subject || 'Course')}" style="width: 24px; height: 24px; object-fit: contain;" />`;
      } else if (isPrcSubject) {
        const numId = Number(item.subjectId || item.rawId || 1);
        const subInfo = SUBJECT_MAP[numId] || { code: item.subject, icon: '/assets/icon/chip.png', colorClass: '1' };
        const prcIconUrl = (item.icon && item.icon.startsWith('/')) ? item.icon : subInfo.icon;
        miniThumb.className = `fav-mini-thumb fav-thumb-subject fav-thumb-subject-${subInfo.colorClass || '1'}`;
        miniThumb.innerHTML = `<img src="${escapeHtml(prcIconUrl)}" alt="${escapeHtml(subInfo.code)}" style="width: 24px; height: 24px; object-fit: contain;" />`;
      } else if (isResource) {
        miniThumb.className = `fav-mini-thumb fav-thumb-resource`;
        miniThumb.innerHTML = ICONS.resource;
      } else {
        miniThumb.className = `fav-mini-thumb fav-thumb-${item.type}`;
        miniThumb.innerHTML = ICONS[item.type] || ICONS.resource;
      }
    }

    const miniTitle = modal.querySelector(".fav-mini-title");
    if (miniTitle) miniTitle.textContent = displayTitle;

    const miniSub = modal.querySelector(".fav-mini-subtitle");
    if (miniSub) miniSub.textContent = displaySubtitle;

    // Gắn ID vào nút Remove để xử lý tiếp
    const btnConfirm = document.getElementById("fav-btn-confirm");
    if (btnConfirm) btnConfirm.dataset.id = item.id;

    modal.hidden = false;
  };

  /**
   * Đóng modal xác nhận xoá.
   */
  F.closeRemoveModal = function () {
    const modal = document.getElementById("fav-modal-remove");
    if (modal) modal.hidden = true;
  };

  /**
   * Đóng mọi dropdown ba chấm đang mở
   */
  function closeAllDropdowns() {
    document.querySelectorAll(".fav-dropdown-menu").forEach(menu => {
      menu.hidden = true;
    });
  }

  // --- SỰ KIỆN KHỞI TẠO DOM (UI) ---
  document.addEventListener("DOMContentLoaded", () => {
    // Resolve đóng modal
    const btnCancel = document.getElementById("fav-btn-cancel");
    if (btnCancel) btnCancel.addEventListener("click", F.closeRemoveModal);

    const modalBackdrop = document.querySelector("#fav-modal-remove .fav-modal-backdrop");
    if (modalBackdrop) modalBackdrop.addEventListener("click", F.closeRemoveModal);

    // Click Browse content trên Empty State
    const emptyBrowseBtn = document.querySelector(".fav-empty .fav-btn-primary");
    if (emptyBrowseBtn) {
      emptyBrowseBtn.addEventListener("click", () => {
        window.location.href = "/pages/practice/practice.html";
      });
    }

    // Đóng dropdown khi click ra ngoài
    document.addEventListener("click", (e) => {
      if (!e.target.closest(".fav-dropdown")) {
        closeAllDropdowns();
      }
    });

    // Đóng dropdown khi nhấn Escape
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        closeAllDropdowns();
      }
    });

    // Delegate event click trong vùng Grid
    const gridEl = document.getElementById("fav-grid-container");
    if (gridEl) {
      gridEl.addEventListener("click", (e) => {
        // 1. Nút ba chấm (...) mở dropdown menu
        const moreBtn = e.target.closest(".fav-more-btn");
        if (moreBtn) {
          e.preventDefault();
          e.stopPropagation();
          const dropdown = moreBtn.closest(".fav-dropdown");
          const menu = dropdown ? dropdown.querySelector(".fav-dropdown-menu") : null;
          if (menu) {
            const isCurrentlyHidden = menu.hidden;
            closeAllDropdowns();
            menu.hidden = !isCurrentlyHidden;
          }
          return;
        }

        // 2. Click "Mở trang" từ dropdown
        const openBtn = e.target.closest("[data-action='open']");
        if (openBtn) {
          e.preventDefault();
          e.stopPropagation();
          closeAllDropdowns();
          const link = openBtn.dataset.link;
          if (link && link !== '#') {
            window.location.href = link;
          }
          return;
        }

        // 3. Click "Sao chép liên kết" từ dropdown
        const copyBtn = e.target.closest("[data-action='copy-link']");
        if (copyBtn) {
          e.preventDefault();
          e.stopPropagation();
          closeAllDropdowns();
          const link = copyBtn.dataset.link || '';
          const fullUrl = link.startsWith('http') ? link : (window.location.origin + link);
          if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(fullUrl).then(() => {
              F.showToast("Đã sao chép liên kết vào clipboard.");
            }).catch(() => {
              F.showToast("Không thể sao chép liên kết.");
            });
          } else {
            F.showToast("Đã sao chép liên kết: " + fullUrl);
          }
          return;
        }

        // 4. Click bỏ yêu thích (từ nút sao hoặc từ menu dropdown)
        const removeBtn = e.target.closest("[data-action='remove']");
        if (removeBtn) {
          e.preventDefault();
          e.stopPropagation();
          closeAllDropdowns();
          const id = removeBtn.dataset.id;
          const item = F.findItem ? F.findItem(id) : null;
          if (item) F.showRemoveModal(item);
          return;
        }

        // 5. Nút xóa tìm kiếm trên search empty state
        const clearSearchBtn = e.target.closest("#fav-btn-clear-search");
        if (clearSearchBtn) {
          e.preventDefault();
          const searchInput = document.getElementById("site-search");
          if (searchInput) {
            searchInput.value = '';
            searchInput.dispatchEvent(new Event('input'));
            searchInput.focus();
          }
          return;
        }

        // 6. Bỏ qua nếu click bên trong dropdown menu
        if (e.target.closest(".fav-dropdown") || e.target.closest(".fav-btn-icon")) {
          return;
        }

        // 7. Click trên thẻ thì điều hướng tới trang tương ứng
        const card = e.target.closest(".fav-card");
        if (card && card.dataset.link && card.dataset.link !== '#') {
          window.location.href = card.dataset.link;
        }
      });
    }
  });

})();
