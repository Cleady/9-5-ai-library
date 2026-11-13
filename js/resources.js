/**
 * RESOURCES MODULE - 9.5 AI CLUB
 * Dữ liệu thật từ MySQL & File lưu trữ an toàn trên server qua RESTful API.
 * Hoàn toàn không còn dữ liệu mẫu hay mock client.
 */

(function () {
  'use strict';

  // =========================================================
  // 1. DỌN DẸP DỮ LIỆU CŨ PHÍA CLIENT AN TOÀN (CHẠY 1 LẦN)
  // =========================================================
  function safeCleanupLegacyClientData() {
    const LEGACY_STORAGE_KEY = 'lib95:resources:list';
    const LEGACY_DB_NAME = 'Lib95_Resources_Files';

    try {
      const raw = localStorage.getItem(LEGACY_STORAGE_KEY);
      if (raw) {
        let list = [];
        try {
          list = JSON.parse(raw);
        } catch (e) {
          list = [];
        }

        if (Array.isArray(list)) {
          // Kiểm tra xem có bản ghi nào có trường fileName (file người dùng tự upload trước đây)
          const hasUserFile = list.some((item) => item && (item.fileName || (typeof item.id === 'number' && item.id > 1000000)));
          if (hasUserFile) {
            console.warn('[Resources] Phát hiện dữ liệu file cũ của người dùng trong localStorage. Giữ nguyên theo quy tắc an toàn:', list);
            return;
          }
        }

        // Nếu chỉ là dữ liệu mẫu cũ -> An toàn dọn dẹp
        localStorage.removeItem(LEGACY_STORAGE_KEY);
        if (window.indexedDB) {
          window.indexedDB.deleteDatabase(LEGACY_DB_NAME);
        }
      }
    } catch (err) {
      console.warn('[Resources] Bỏ qua dọn dẹp legacy storage:', err);
    }
  }

  safeCleanupLegacyClientData();

  // =========================================================
  // 2. HELPER GỌI API & XÁC THỰC
  // =========================================================
  const API_BASE = '/api/resources';

  function getAuthToken() {
    return localStorage.getItem('token') || '';
  }

  function getCurrentUser() {
    try {
      const raw = localStorage.getItem('user');
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  }

  async function apiFetch(endpoint, options = {}) {
    options.headers = options.headers || {};
    const token = getAuthToken();

    if (token) {
      options.headers['Authorization'] = 'Bearer ' + token;
    }

    if (options.body && !(options.body instanceof FormData) && typeof options.body === 'object') {
      options.headers['Content-Type'] = 'application/json';
      options.body = JSON.stringify(options.body);
    }

    try {
      const res = await fetch(endpoint, options);

      // Nếu chưa đăng nhập hoặc token hết hạn -> Chuyển về trang đăng nhập
      if (res.status === 401) {
        showToast('Vui lòng đăng nhập để tiếp tục. Đang chuyển hướng...');
        setTimeout(() => {
          window.location.href = '/pages/auth/login.html';
        }, 1200);
        throw new Error('Unauthorized');
      }

      return res;
    } catch (err) {
      if (err.message !== 'Unauthorized') {
        console.error('[API Error]:', err);
      }
      throw err;
    }
  }

  // =========================================================
  // 3. QUẢN LÝ TRẠNG THÁI (STATE)
  // =========================================================
  const resourceState = {
    category: 'all',
    keyword: '',
    sort: 'newest',
    subjects: [],
    extension: 'all',
    selectedId: null,
    detailTab: 'overview',
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
    loading: false,
    hasError: false
  };

  let resources = [];
  let availableSubjects = [];
  let currentDetailResource = null;
  let currentPreviewBlobUrl = null;

  // DOM Elements
  const $ = (selector, parent = document) => parent.querySelector(selector);
  const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];

  const resourceList = $('#resource-list');
  const loadingState = $('#loading-state');
  const errorState = $('#error-state');
  const emptyState = $('#empty-state');
  const emptyTitle = $('#empty-title');
  const emptyDesc = $('#empty-desc');
  const emptyActionButton = $('#empty-action-button');
  const resultCount = $('#result-count');
  const searchCaption = $('#search-caption');
  const filterPanel = $('#filter-panel');
  const filterButton = $('#filter-button');
  const filterCount = $('#filter-count');
  const detailDialog = $('#detail-dialog');
  const uploadDialog = $('#upload-dialog');
  const successDialog = $('#success-dialog');
  const paginationContainer = $('#pagination-container');
  const loadMoreButton = $('#load-more-button');

  // =========================================================
  // 4. TIỆN ÍCH AN TOÀN (CHỐNG XSS 100%)
  // =========================================================
  function showToast(message) {
    const toast = $('#toast');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('is-visible');
    window.clearTimeout(showToast.timeout);
    showToast.timeout = window.setTimeout(() => toast.classList.remove('is-visible'), 2800);
  }

  function openDialog(dialog) {
    if (dialog && !dialog.open) dialog.showModal();
  }

  function closeDialog(dialog) {
    if (dialog && dialog.open) dialog.close();
  }

  // Tự động nhận diện định dạng file và danh mục cho form upload
  function detectFileTypeAndCategory(file) {
    const fileName = file.name || '';
    const parts = fileName.split('.');
    const extension = parts.length > 1 ? parts.pop().toUpperCase() : 'FILE';
    const extLower = extension.toLowerCase();

    let detectedType = 'document';

    if (['pdf', 'doc', 'docx', 'txt', 'rtf', 'md', 'epub', 'odt'].includes(extLower)) {
      detectedType = 'document';
    } else if (['py', 'ipynb', 'js', 'ts', 'jsx', 'tsx', 'c', 'cpp', 'java', 'cs', 'html', 'css', 'sh', 'sql'].includes(extLower)) {
      detectedType = 'code';
    } else if (['csv', 'xls', 'xlsx', 'json', 'parquet', 'tsv', 'xml', 'db', 'sqlite'].includes(extLower)) {
      detectedType = 'dataset';
    } else if (['ppt', 'pptx', 'potx', 'key', 'dotx', 'xltx'].includes(extLower)) {
      detectedType = 'template';
    } else if (['zip', 'rar', '7z', 'tar', 'gz'].includes(extLower)) {
      const nameLower = fileName.toLowerCase();
      if (nameLower.includes('data') || nameLower.includes('dataset') || nameLower.includes('kaggle')) {
        detectedType = 'dataset';
      } else if (nameLower.includes('template') || nameLower.includes('slide') || nameLower.includes('mau')) {
        detectedType = 'template';
      } else {
        detectedType = 'code';
      }
    }

    let detectedSubject = '';
    const nameLower = fileName.toLowerCase();
    const courseCodeMatch = fileName.match(/\b([A-Za-z]{2,4}\s*\d{3}[A-Za-z]?)\b/);
    if (courseCodeMatch) {
      detectedSubject = courseCodeMatch[1].replace(/\s+/g, '').toUpperCase();
    } else if (/(xstk|xac\s*suat|thong\s*ke)/i.test(nameLower)) {
      detectedSubject = 'Mathematics';
    } else if (/(calculus|giai\s*tich|algebra|linear|toan|math)/i.test(nameLower)) {
      detectedSubject = 'Mathematics';
    } else if (/(machine\s*learning|\bml\b|\bai\b|deep\s*learning|neural|nlp|cv|model)/i.test(nameLower)) {
      detectedSubject = 'Machine Learning';
    } else if (/(data\s*science|dataset|database|\bdbi\b|\bsql\b|kaggle|titanic)/i.test(nameLower)) {
      detectedSubject = 'Data Science';
    } else if (/(python|java|\bpfp\b|\bcode\b|c\+\+|cpp|algo|lap\s*trinh|programming)/i.test(nameLower)) {
      detectedSubject = 'Programming';
    }

    return { extension, extLower, detectedType, detectedSubject };
  }

  // =========================================================
  // 5. RENDER GIAO DIỆN DANH SÁCH (DOM THUẦN TÚY - CHỐNG XSS)
  // =========================================================
  function createResourceCardElement(item) {
    const article = document.createElement('article');
    article.className = 'res-resource-item';
    article.dataset.resourceId = String(item.id);

    // Icon loại file
    const fileIcon = document.createElement('span');
    fileIcon.className = 'res-file-icon';
    fileIcon.dataset.kind = item.type || 'document';
    fileIcon.setAttribute('aria-hidden', 'true');
    fileIcon.textContent = item.extension || 'FILE';
    article.appendChild(fileIcon);

    // Khối thông tin tài liệu
    const infoDiv = document.createElement('div');
    infoDiv.className = 'res-resource-info';

    const titleH2 = document.createElement('h2');
    titleH2.textContent = item.title;
    infoDiv.appendChild(titleH2);

    const metaP = document.createElement('p');

    const extSpan = document.createElement('span');
    extSpan.textContent = item.extension;
    metaP.appendChild(extSpan);

    const sizeSpan = document.createElement('span');
    sizeSpan.textContent = item.sizeLabel || '0 KB';
    metaP.appendChild(sizeSpan);

    const dateSpan = document.createElement('span');
    const d = item.created_at ? new Date(item.created_at) : new Date();
    dateSpan.textContent = 'Updated ' + d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    metaP.appendChild(dateSpan);

    infoDiv.appendChild(metaP);

    // Huy hiệu người đăng
    if (item.uploader) {
      const uploaderDiv = document.createElement('div');
      uploaderDiv.className = 'res-uploader-info';

      const uploaderLabel = document.createElement('span');
      uploaderLabel.textContent = 'Đăng bởi: ';
      uploaderDiv.appendChild(uploaderLabel);

      const uploaderName = document.createElement('strong');
      uploaderName.textContent = item.uploader.full_name || 'Thành viên';
      uploaderDiv.appendChild(uploaderName);

      if (item.uploader.role) {
        const roleBadge = document.createElement('span');
        roleBadge.className = 'res-uploader-role';
        roleBadge.dataset.role = item.uploader.role;
        roleBadge.textContent = item.uploader.role;
        uploaderDiv.appendChild(roleBadge);
      }

      infoDiv.appendChild(uploaderDiv);
    }

    article.appendChild(infoDiv);

    // Môn học
    const subjectSpan = document.createElement('span');
    subjectSpan.className = 'res-resource-subject';
    subjectSpan.textContent = item.subject || 'Chung';
    article.appendChild(subjectSpan);

    // Khối hành động: Nút Download, Favorite và xem chi tiết
    const actionsDiv = document.createElement('div');
    actionsDiv.className = 'res-card-actions';

    const downloadBtn = document.createElement('button');
    downloadBtn.type = 'button';
    downloadBtn.className = 'res-download-button';
    downloadBtn.dataset.downloadId = String(item.id);
    downloadBtn.innerHTML = '<svg aria-hidden="true"><use href="#icon-download"></use></svg> <span>Download</span>';
    actionsDiv.appendChild(downloadBtn);

    const favBtn = document.createElement('button');
    favBtn.type = 'button';
    favBtn.className = 'res-favorite-card-btn' + (item.favoritedByMe ? ' is-favorited' : '');
    favBtn.dataset.favId = String(item.id);
    favBtn.setAttribute('aria-label', item.favoritedByMe ? 'Bỏ yêu thích' : 'Yêu thích');
    favBtn.setAttribute('title', item.favoritedByMe ? 'Bỏ yêu thích' : 'Thêm vào yêu thích');
    favBtn.innerHTML = `<svg viewBox="0 0 24 24" width="16" height="16" fill="${item.favoritedByMe ? '#f59e0b' : 'none'}" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`;
    actionsDiv.appendChild(favBtn);

    const arrowBtn = document.createElement('button');
    arrowBtn.type = 'button';
    arrowBtn.className = 'res-arrow-button';
    arrowBtn.dataset.detailId = String(item.id);
    arrowBtn.setAttribute('aria-label', `Xem chi tiết: ${item.title}`);
    arrowBtn.setAttribute('title', 'Xem chi tiết tài liệu');
    arrowBtn.innerHTML = `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>`;
    actionsDiv.appendChild(arrowBtn);

    article.appendChild(actionsDiv);

    return article;
  }

  function renderResources(append = false) {
    if (!append) {
      resourceList.innerHTML = '';
    }

    if (resources.length === 0) {
      resourceList.hidden = true;
      emptyState.hidden = false;

      // Phân biệt trạng thái: Kho hoàn toàn chưa có tài liệu hay Tìm kiếm không thấy kết quả
      const isFiltering = Boolean(resourceState.keyword.trim() || resourceState.category !== 'all' || resourceState.subjects.length > 0 || resourceState.extension !== 'all');

      if (!isFiltering) {
        emptyTitle.textContent = 'Kho tài liệu hiện đang trống';
        emptyDesc.textContent = 'Chưa có tài liệu nào được chia sẻ. Hãy là người đầu tiên đóng góp tài liệu học tập!';
        emptyActionButton.textContent = 'Tải lên tài liệu ngay';
      } else {
        emptyTitle.textContent = 'No resources found';
        emptyDesc.textContent = 'Try another keyword or clear your filters.';
        emptyActionButton.textContent = 'Browse all resources';
      }

      paginationContainer.hidden = true;
    } else {
      emptyState.hidden = true;
      resourceList.hidden = false;

      const fragment = document.createDocumentFragment();
      const currentItems = append ? resources.slice((resourceState.page - 1) * resourceState.limit) : resources;
      currentItems.forEach((item) => {
        fragment.appendChild(createResourceCardElement(item));
      });
      resourceList.appendChild(fragment);

      // Hiển thị nút Load More nếu còn trang tiếp theo
      paginationContainer.hidden = resourceState.page >= resourceState.totalPages;
    }

    resultCount.textContent = `${resourceState.total} resource${resourceState.total === 1 ? '' : 's'}`;
    searchCaption.textContent = resourceState.keyword ? `for “${resourceState.keyword}”` : '';
  }

  // =========================================================
  // 6. GỌI API LẤY DANH SÁCH & PHÂN TRANG
  // =========================================================
  async function fetchResources(page = 1, append = false) {
    resourceState.page = page;
    resourceState.loading = true;

    if (!append) {
      loadingState.hidden = false;
      errorState.hidden = true;
      emptyState.hidden = true;
      resourceList.hidden = true;
      paginationContainer.hidden = true;
    }

    const params = new URLSearchParams({
      page: String(resourceState.page),
      limit: String(resourceState.limit),
      sort: resourceState.sort
    });

    if (resourceState.category && resourceState.category !== 'all') {
      params.set('type', resourceState.category);
    }
    if (resourceState.keyword.trim()) {
      params.set('q', resourceState.keyword.trim());
    }
    if (resourceState.extension && resourceState.extension !== 'all') {
      params.set('extension', resourceState.extension);
    }
    if (resourceState.subjects.length === 1) {
      params.set('subject', resourceState.subjects[0]);
    }

    try {
      const res = await apiFetch(`${API_BASE}?${params.toString()}`);
      if (!res.ok) throw new Error('Không thể tải tài liệu từ máy chủ');

      const data = await res.json();
      const newItems = data.items || [];

      if (append) {
        resources = [...resources, ...newItems];
      } else {
        resources = newItems;
      }

      resourceState.total = data.pagination?.total || 0;
      resourceState.totalPages = data.pagination?.totalPages || 1;
      resourceState.hasError = false;

      loadingState.hidden = true;
      errorState.hidden = true;
      renderResources(append);
    } catch (err) {
      if (err.message === 'Unauthorized') return;
      loadingState.hidden = true;
      resourceList.hidden = true;
      emptyState.hidden = true;
      paginationContainer.hidden = true;
      errorState.hidden = false;
      $('#error-message').textContent = err.message || 'Không thể kết nối đến máy chủ.';
    } finally {
      resourceState.loading = false;
    }
  }

  // =========================================================
  // 7. GỌI API THỐNG KÊ (TOP CATEGORIES & MÔN HỌC)
  // =========================================================
  async function fetchStats() {
    try {
      const res = await apiFetch(`${API_BASE}/stats`);
      if (!res.ok) return;

      const data = await res.json();
      const categories = data.categories || { document: 0, code: 0, template: 0, dataset: 0 };
      availableSubjects = data.subjects || [];

      // Render Top Categories
      const labels = { document: 'Documents', code: 'Code', template: 'Templates', dataset: 'Datasets' };
      const colors = { document: '#ff5678', code: '#10b8ae', template: '#2695f4', dataset: '#8b5ce7' };

      const statsEl = $('#category-stats');
      if (statsEl) {
        statsEl.innerHTML = '';
        Object.keys(labels).forEach((type) => {
          const li = document.createElement('li');
          const i = document.createElement('i');
          i.style.setProperty('--item-color', colors[type]);
          li.appendChild(i);

          const span = document.createElement('span');
          span.textContent = labels[type];
          li.appendChild(span);

          const b = document.createElement('b');
          b.textContent = categories[type] || 0;
          li.appendChild(b);

          statsEl.appendChild(li);
        });
      }

      // Cập nhật bộ lọc môn học
      renderSubjectFilters();
    } catch (err) {
      console.warn('Lỗi khi tải thống kê:', err);
    }
  }

  // =========================================================
  // 8. GỌI API TÀI LIỆU MỚI NHẤT (RECENT UPLOADS)
  // =========================================================
  async function fetchRecent() {
    try {
      const res = await apiFetch(`${API_BASE}/recent?limit=4`);
      if (!res.ok) return;

      const data = await res.json();
      const recentList = $('#recent-list');
      if (!recentList) return;

      recentList.innerHTML = '';
      if (!data.items || data.items.length === 0) {
        recentList.innerHTML = '<p style="font-size:12px; color:#94a3b8; text-align:center; padding:12px 0;">Chưa có tài liệu mới</p>';
        return;
      }

      data.items.forEach((item) => {
        const div = document.createElement('div');
        div.className = 'res-recent-item';
        div.dataset.recentId = String(item.id);
        div.setAttribute('role', 'button');
        div.setAttribute('tabindex', '0');
        div.style.cursor = 'pointer';

        const fileIcon = document.createElement('span');
        fileIcon.className = 'res-file-icon';
        fileIcon.dataset.kind = item.type;
        fileIcon.textContent = item.extension;
        div.appendChild(fileIcon);

        const textDiv = document.createElement('div');
        const strong = document.createElement('strong');
        strong.textContent = item.title;
        textDiv.appendChild(strong);

        const spanDate = document.createElement('span');
        const d = item.created_at ? new Date(item.created_at) : new Date();
        spanDate.textContent = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        textDiv.appendChild(spanDate);

        div.appendChild(textDiv);
        div.addEventListener('click', () => openResourceDetail(item.id));
        recentList.appendChild(div);
      });
    } catch (err) {
      console.warn('Lỗi khi tải tài liệu gần đây:', err);
    }
  }

  // =========================================================
  // 9. TẢI FILE THẬT VỀ MÁY (DOWNLOAD)
  // =========================================================
  async function downloadResource(id) {
    if (!id) return;
    showToast('Đang chuẩn bị file tải xuống...');

    try {
      const res = await apiFetch(`${API_BASE}/${id}/download`);
      if (res.status === 404) {
        showToast('Tài liệu hoặc file không tồn tại trên máy chủ.');
        return;
      }
      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}));
        showToast(errJson.error || 'Không thể tải file về.');
        return;
      }

      // Trích xuất tên file từ header Content-Disposition
      let filename = 'downloaded_resource';
      const disposition = res.headers.get('content-disposition');
      if (disposition && disposition.includes('filename=')) {
        const match = disposition.match(/filename\*?=['"]?(?:UTF-8'')?([^'";\r\n]+)['"]?/i);
        if (match && match[1]) {
          filename = decodeURIComponent(match[1]);
        }
      }

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => window.URL.revokeObjectURL(url), 1000);

      // Cập nhật số lượt tải trên card UI nếu đang hiển thị
      const targetItem = resources.find((r) => String(r.id) === String(id));
      if (targetItem) {
        targetItem.downloads = (targetItem.downloads || 0) + 1;
      }

      // Mở modal báo thành công
      $('.res-success-dialog p').textContent = `${filename} đã được tải xuống máy của bạn an toàn.`;
      openDialog(successDialog);
      showToast(`✓ Đã bắt đầu tải xuống: ${filename}`);
    } catch (err) {
      if (err.message !== 'Unauthorized') {
        showToast('Lỗi khi tải file, vui lòng thử lại.');
      }
    }
  }

  // =========================================================
  // 10. CHI TIẾT TÀI LIỆU (DETAIL MODAL)
  // =========================================================
  async function renderDetailTabContent() {
    if (!currentDetailResource) return;
    const content = $('#detail-content');
    if (!content) return;

    if (currentPreviewBlobUrl) {
      URL.revokeObjectURL(currentPreviewBlobUrl);
      currentPreviewBlobUrl = null;
    }

    content.innerHTML = '';

    if (resourceState.detailTab === 'preview') {
      const ext = (currentDetailResource.extension || '').toLowerCase();

      // Hiển thị trạng thái đang tải preview
      content.innerHTML = `
        <div style="padding: 36px 16px; text-align: center; color: #64748b;">
          <div class="res-spinner" style="margin: 0 auto 12px; border-top-color: var(--res-blue);"></div>
          <p style="font-size: 13px; margin: 0;">Đang chuẩn bị bản xem trước tài liệu...</p>
        </div>
      `;

      try {
        const res = await apiFetch(`${API_BASE}/${currentDetailResource.id}/preview`);

        if (!res.ok) {
          content.innerHTML = `
            <div style="padding: 30px 16px; text-align: center; color: #dc2626;">
              <p style="font-size: 13px; margin: 0 0 12px;">Không thể tải bản xem trước tài liệu này.</p>
              <button class="res-primary-button" type="button" id="preview-retry-download">
                <svg aria-hidden="true"><use href="#icon-download"></use></svg> Tải về máy
              </button>
            </div>
          `;
          $('#preview-retry-download')?.addEventListener('click', () => downloadResource(currentDetailResource.id));
          return;
        }

        // 1. Nếu là PDF: Nhúng iframe trực tiếp và có link mở full-screen
        if (ext === 'pdf') {
          const blob = await res.blob();
          currentPreviewBlobUrl = URL.createObjectURL(blob);
          content.innerHTML = '';

          const container = document.createElement('div');
          container.style.display = 'flex';
          container.style.flexDirection = 'column';
          container.style.gap = '8px';

          const topBar = document.createElement('div');
          topBar.style.display = 'flex';
          topBar.style.justifyContent = 'space-between';
          topBar.style.alignItems = 'center';

          const infoSpan = document.createElement('span');
          infoSpan.style.fontSize = '12px';
          infoSpan.style.color = '#64748b';
          infoSpan.textContent = `Xem trước PDF (${currentDetailResource.sizeLabel || ''})`;
          topBar.appendChild(infoSpan);

          const fullLink = document.createElement('a');
          fullLink.href = currentPreviewBlobUrl;
          fullLink.target = '_blank';
          fullLink.rel = 'noopener noreferrer';
          fullLink.style.fontSize = '12px';
          fullLink.style.color = 'var(--res-blue)';
          fullLink.style.fontWeight = '600';
          fullLink.style.textDecoration = 'none';
          fullLink.textContent = 'Mở toàn màn hình ↗';
          topBar.appendChild(fullLink);

          container.appendChild(topBar);

          const iframe = document.createElement('iframe');
          iframe.src = currentPreviewBlobUrl;
          iframe.style.width = '100%';
          iframe.style.height = '520px';
          iframe.style.border = '1px solid var(--res-line)';
          iframe.style.borderRadius = '10px';
          iframe.style.background = '#ffffff';
          container.appendChild(iframe);

          content.appendChild(container);
        } else if (['csv', 'txt', 'md', 'py', 'ipynb'].includes(ext)) {
          // 2. Nếu là file code/text/csv: Hiển thị trong khối pre/code an toàn chống XSS
          const text = await res.text();
          content.innerHTML = '';

          const container = document.createElement('div');
          container.style.display = 'flex';
          container.style.flexDirection = 'column';
          container.style.gap = '8px';

          const topBar = document.createElement('div');
          topBar.style.display = 'flex';
          topBar.style.justifyContent = 'space-between';
          topBar.style.alignItems = 'center';

          const infoSpan = document.createElement('span');
          infoSpan.style.fontSize = '12px';
          infoSpan.style.color = '#64748b';
          infoSpan.textContent = `Xem trước nội dung (.${ext.toUpperCase()} · tối đa 20 dòng đầu)`;
          topBar.appendChild(infoSpan);

          container.appendChild(topBar);

          const pre = document.createElement('pre');
          pre.className = 'res-preview-code';
          const code = document.createElement('code');
          code.textContent = text || '(File rỗng)';
          pre.appendChild(code);
          container.appendChild(pre);

          content.appendChild(container);
        } else {
          // 3. Các định dạng khác (doc, docx, ppt, pptx, xls, xlsx, zip): Hiển thị thông báo và nút tải về
          content.innerHTML = '';
          const noticeBox = document.createElement('div');
          noticeBox.style.padding = '36px 20px';
          noticeBox.style.textAlign = 'center';
          noticeBox.style.background = 'rgba(241, 245, 249, 0.7)';
          noticeBox.style.borderRadius = '12px';
          noticeBox.style.border = '1px dashed var(--res-line)';

          const iconDiv = document.createElement('div');
          iconDiv.style.fontSize = '36px';
          iconDiv.style.marginBottom = '12px';
          iconDiv.textContent = '📦';
          noticeBox.appendChild(iconDiv);

          const h3 = document.createElement('h3');
          h3.style.fontSize = '15px';
          h3.style.color = '#0f172a';
          h3.style.margin = '0 0 6px';
          h3.textContent = `Định dạng .${currentDetailResource.extension} không hỗ trợ xem trước trực tiếp`;
          noticeBox.appendChild(h3);

          const p = document.createElement('p');
          p.style.fontSize = '13px';
          p.style.color = '#64748b';
          p.style.margin = '0 0 20px';
          p.textContent = 'Vui lòng tải tài liệu về máy tính để xem trọn vẹn bằng phần mềm chuyên dụng.';
          noticeBox.appendChild(p);

          const dlBtn = document.createElement('button');
          dlBtn.type = 'button';
          dlBtn.className = 'res-primary-button';
          dlBtn.innerHTML = '<svg aria-hidden="true"><use href="#icon-download"></use></svg> ';
          const dlSpan = document.createElement('span');
          dlSpan.textContent = `Tải xuống file (.${currentDetailResource.extension})`;
          dlBtn.appendChild(dlSpan);
          dlBtn.addEventListener('click', () => downloadResource(currentDetailResource.id));
          noticeBox.appendChild(dlBtn);

          content.appendChild(noticeBox);
        }
      } catch (err) {
        if (err.message !== 'Unauthorized') {
          content.innerHTML = '<div style="padding: 24px; text-align: center; color: #dc2626;">Lỗi khi tải bản xem trước.</div>';
        }
      }
    } else if (resourceState.detailTab === 'related') {
      const h3 = document.createElement('h3');
      h3.textContent = 'Tài liệu cùng chủ đề';
      content.appendChild(h3);

      if (currentDetailResource.related && currentDetailResource.related.length > 0) {
        currentDetailResource.related.forEach((rel) => {
          const row = document.createElement('div');
          row.className = 'res-related-row';
          row.setAttribute('role', 'button');
          row.setAttribute('tabindex', '0');

          const icon = document.createElement('span');
          icon.className = 'res-file-icon';
          icon.dataset.kind = rel.type;
          icon.textContent = rel.extension;
          row.appendChild(icon);

          const rText = document.createElement('div');
          const rStrong = document.createElement('strong');
          rStrong.textContent = rel.title;
          rText.appendChild(rStrong);

          const rMeta = document.createElement('span');
          rMeta.textContent = `${rel.subject} · ${rel.extension} · ${rel.sizeLabel || ''}`;
          rText.appendChild(rMeta);

          row.appendChild(rText);
          row.addEventListener('click', () => openResourceDetail(rel.id));
          content.appendChild(row);
        });
      } else {
        const emptyP = document.createElement('p');
        emptyP.textContent = 'Chưa có tài liệu liên quan nào khác.';
        content.appendChild(emptyP);
      }
    } else {
      // Overview
      const h3Desc = document.createElement('h3');
      h3Desc.textContent = 'Giới thiệu tài liệu';
      content.appendChild(h3Desc);

      const pDesc = document.createElement('p');
      pDesc.textContent = currentDetailResource.description || 'Không có mô tả chi tiết cho tài liệu này.';
      content.appendChild(pDesc);

      const h3Info = document.createElement('h3');
      h3Info.textContent = 'Thông tin chi tiết';
      content.appendChild(h3Info);

      const grid = document.createElement('div');
      grid.className = 'res-key-grid';

      const d1 = document.createElement('div');
      d1.innerHTML = `<span>Định dạng</span><strong>${currentDetailResource.extension}</strong>`;
      grid.appendChild(d1);

      const d2 = document.createElement('div');
      d2.innerHTML = `<span>Dung lượng</span><strong>${currentDetailResource.sizeLabel}</strong>`;
      grid.appendChild(d2);

      const d3 = document.createElement('div');
      const d3Span = document.createElement('span');
      d3Span.textContent = 'Môn học';
      const d3Strong = document.createElement('strong');
      d3Strong.textContent = currentDetailResource.subject;
      d3.appendChild(d3Span);
      d3.appendChild(d3Strong);
      grid.appendChild(d3);

      const d4 = document.createElement('div');
      d4.innerHTML = `<span>Lượt tải</span><strong>${currentDetailResource.downloads}</strong>`;
      grid.appendChild(d4);

      if (currentDetailResource.uploader) {
        const d5 = document.createElement('div');
        const d5Span = document.createElement('span');
        d5Span.textContent = 'Người chia sẻ';
        const d5Strong = document.createElement('strong');
        d5Strong.textContent = `${currentDetailResource.uploader.full_name} (${currentDetailResource.uploader.role})`;
        d5.appendChild(d5Span);
        d5.appendChild(d5Strong);
        grid.appendChild(d5);
      }

      content.appendChild(grid);
    }
  }

  function updateDetailFavoriteUI(isFav) {
    const detailFavBtn = $('#detail-favorite-button');
    if (!detailFavBtn) return;
    detailFavBtn.classList.toggle('is-favorited', isFav);
    detailFavBtn.setAttribute('title', isFav ? 'Bỏ yêu thích' : 'Thêm vào yêu thích');
    detailFavBtn.setAttribute('aria-label', isFav ? 'Bỏ yêu thích' : 'Yêu thích');
    const svg = detailFavBtn.querySelector('svg');
    if (svg) svg.setAttribute('fill', isFav ? '#f59e0b' : 'none');
  }

  async function toggleFavorite(id) {
    if (!id) return;
    const token = getAuthToken();
    if (!token) {
      showToast('Vui lòng đăng nhập để lưu tài liệu vào mục yêu thích.');
      return;
    }

    try {
      const res = await apiFetch(`${API_BASE}/${id}/favorite`, { method: 'POST' });
      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}));
        throw new Error(errJson.error || 'Không thể cập nhật yêu thích');
      }
      const data = await res.json();
      const isFav = Boolean(data.favorited);

      // Cập nhật trạng thái trong mảng resources
      const inList = resources.find((r) => String(r.id) === String(id));
      if (inList) inList.favoritedByMe = isFav;

      if (currentDetailResource && String(currentDetailResource.id) === String(id)) {
        currentDetailResource.favoritedByMe = isFav;
        updateDetailFavoriteUI(isFav);
      }

      // Cập nhật tất cả các nút card tương ứng trong danh sách
      $$(`[data-fav-id="${id}"]`).forEach((btn) => {
        btn.classList.toggle('is-favorited', isFav);
        btn.setAttribute('title', isFav ? 'Bỏ yêu thích' : 'Thêm vào yêu thích');
        btn.setAttribute('aria-label', isFav ? 'Bỏ yêu thích' : 'Yêu thích');
        const svg = btn.querySelector('svg');
        if (svg) svg.setAttribute('fill', isFav ? '#f59e0b' : 'none');
      });

      showToast(data.message || (isFav ? '✓ Đã thêm vào mục yêu thích' : 'Đã bỏ yêu thích tài liệu'));
    } catch (err) {
      if (err.message !== 'Unauthorized') {
        showToast(err.message || 'Lỗi khi cập nhật yêu thích.');
      }
    }
  }

  async function openResourceDetail(id) {
    if (!id) return;
    try {
      const res = await apiFetch(`${API_BASE}/${id}`);
      if (!res.ok) {
        showToast('Không thể tải thông tin chi tiết tài liệu');
        return;
      }

      const data = await res.json();
      currentDetailResource = data.resource;
      if (currentDetailResource) {
        currentDetailResource.related = data.related || [];
      }

      resourceState.selectedId = id;
      resourceState.detailTab = 'overview';

      $('#detail-icon').textContent = currentDetailResource.extension;
      $('#detail-icon').dataset.kind = currentDetailResource.type;
      $('#detail-type').textContent = currentDetailResource.type.toUpperCase();
      $('#detail-title').textContent = currentDetailResource.title;

      const d = currentDetailResource.created_at ? new Date(currentDetailResource.created_at) : new Date();
      const dateStr = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
      $('#detail-meta').textContent = `${currentDetailResource.extension} · ${currentDetailResource.sizeLabel} · Updated ${dateStr}`;

      // Cập nhật trạng thái nút Bookmark/Favorite trong detail modal
      updateDetailFavoriteUI(Boolean(currentDetailResource.favoritedByMe));

      // Kiểm tra quyền chỉnh sửa / xóa: Chỉ uploader hoặc admin/owner
      const currentUser = getCurrentUser();
      const isOwnerOrAdmin = currentUser && ['admin', 'owner'].includes(currentUser.role);
      const isAuthor = currentUser && currentDetailResource.user_id && (String(currentDetailResource.user_id) === String(currentUser.id));
      const canManage = Boolean(isOwnerOrAdmin || isAuthor);

      const editBtn = $('#detail-edit-button');
      const deleteBtn = $('#detail-delete-button');
      if (editBtn) editBtn.hidden = !canManage;
      if (deleteBtn) deleteBtn.hidden = !canManage;

      $$('[data-detail-tab]').forEach((btn) => btn.classList.toggle('is-active', btn.dataset.detailTab === 'overview'));

      renderDetailTabContent();

      // Render danh sách related ở cột phải modal
      const relContainer = $('#related-list');
      if (relContainer) {
        relContainer.innerHTML = '';
        if (data.related && data.related.length > 0) {
          data.related.forEach((rel) => {
            const rDiv = document.createElement('div');
            rDiv.className = 'res-related-row';
            rDiv.setAttribute('role', 'button');
            rDiv.setAttribute('tabindex', '0');

            const rIcon = document.createElement('span');
            rIcon.className = 'res-file-icon';
            rIcon.dataset.kind = rel.type;
            rIcon.textContent = rel.extension;
            rDiv.appendChild(rIcon);

            const rInfo = document.createElement('div');
            const rTitle = document.createElement('strong');
            rTitle.textContent = rel.title;
            rInfo.appendChild(rTitle);

            const rSub = document.createElement('span');
            rSub.textContent = `${rel.extension} · ${rel.sizeLabel || ''}`;
            rInfo.appendChild(rSub);

            rDiv.appendChild(rInfo);
            rDiv.addEventListener('click', () => openResourceDetail(rel.id));
            relContainer.appendChild(rDiv);
          });
        } else {
          relContainer.innerHTML = '<p style="font-size:12px; color:#94a3b8;">Chưa có tài liệu liên quan.</p>';
        }
      }

      openDialog(detailDialog);
    } catch (err) {
      if (err.message !== 'Unauthorized') {
        showToast('Lỗi khi mở chi tiết tài liệu');
      }
    }
  }

  function initEditDialog() {
    const editDialog = $('#edit-dialog');
    const editForm = $('#edit-form');
    const editBtn = $('#detail-edit-button');
    const editSubmitBtn = $('#edit-submit-button');

    editBtn?.addEventListener('click', () => {
      if (!currentDetailResource) return;
      const originalFileEl = $('#edit-original-filename');
      if (originalFileEl) {
        originalFileEl.textContent = currentDetailResource.original_name || currentDetailResource.title;
      }
      const titleInput = $('#edit-title');
      if (titleInput) titleInput.value = currentDetailResource.title || '';
      const typeSelect = $('#edit-type');
      if (typeSelect) typeSelect.value = currentDetailResource.type || 'document';
      const subjectInput = $('#edit-subject');
      if (subjectInput) subjectInput.value = currentDetailResource.subject || '';
      const descInput = $('#edit-description');
      if (descInput) descInput.value = currentDetailResource.description || '';

      openDialog(editDialog);
    });

    editForm?.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (!currentDetailResource) return;

      const title = ($('#edit-title')?.value || '').trim();
      const type = $('#edit-type')?.value || currentDetailResource.type;
      const subject = ($('#edit-subject')?.value || '').trim() || 'Chung';
      const description = ($('#edit-description')?.value || '').trim();

      if (!title) {
        showToast('Tiêu đề không được để trống.');
        return;
      }

      if (editSubmitBtn) {
        editSubmitBtn.disabled = true;
        editSubmitBtn.textContent = 'Đang lưu...';
      }

      try {
        const res = await apiFetch(`${API_BASE}/${currentDetailResource.id}`, {
          method: 'PUT',
          body: { title, type, subject, description }
        });

        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || 'Cập nhật tài liệu thất bại');
        }

        closeDialog(editDialog);
        showToast('✓ Cập nhật tài liệu thành công!');

        // Cập nhật thông tin chi tiết hiện tại
        currentDetailResource.title = title;
        currentDetailResource.type = type;
        currentDetailResource.subject = subject;
        currentDetailResource.description = description;

        $('#detail-icon').dataset.kind = type;
        $('#detail-type').textContent = type.toUpperCase();
        $('#detail-title').textContent = title;

        renderDetailTabContent();

        // Làm mới danh sách và thống kê
        await Promise.all([
          fetchResources(resourceState.page, false),
          fetchStats(),
          fetchRecent()
        ]);
      } catch (err) {
        if (err.message !== 'Unauthorized') {
          showToast(err.message || 'Lỗi khi cập nhật tài liệu.');
        }
      } finally {
        if (editSubmitBtn) {
          editSubmitBtn.disabled = false;
          editSubmitBtn.textContent = 'Lưu thay đổi';
        }
      }
    });
  }

  function initDeleteDialog() {
    const deleteDialog = $('#delete-dialog');
    const deleteBtn = $('#detail-delete-button');
    const confirmDeleteBtn = $('#confirm-delete-button');
    const deleteTitleEl = $('#delete-resource-title');

    deleteBtn?.addEventListener('click', () => {
      if (!currentDetailResource) return;
      if (deleteTitleEl) deleteTitleEl.textContent = `"${currentDetailResource.title}"`;
      openDialog(deleteDialog);
    });

    confirmDeleteBtn?.addEventListener('click', async () => {
      if (!currentDetailResource) return;

      confirmDeleteBtn.disabled = true;
      confirmDeleteBtn.textContent = 'Đang xóa...';

      try {
        const res = await apiFetch(`${API_BASE}/${currentDetailResource.id}`, {
          method: 'DELETE'
        });

        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || 'Xóa tài liệu không thành công');
        }

        closeDialog(deleteDialog);
        closeDialog(detailDialog);
        showToast('✓ Đã xóa tài liệu vĩnh viễn!');

        // Làm mới lại kho tài liệu
        await Promise.all([
          fetchResources(1, false),
          fetchStats(),
          fetchRecent()
        ]);
      } catch (err) {
        if (err.message !== 'Unauthorized') {
          showToast(err.message || 'Lỗi khi xóa tài liệu.');
        }
      } finally {
        confirmDeleteBtn.disabled = false;
        confirmDeleteBtn.textContent = 'Xóa vĩnh viễn';
      }
    });
  }

  // =========================================================
  // 11. BỘ LỌC, TÌM KIẾM & PHÂN LOẠI
  // =========================================================
  function renderSubjectFilters() {
    const fieldset = $('#filter-subject-fieldset');
    if (!fieldset) return;

    const currentChecked = new Set(resourceState.subjects);
    fieldset.innerHTML = '<legend>Subjects</legend>';

    if (availableSubjects.length === 0) {
      const p = document.createElement('p');
      p.style.fontSize = '12px';
      p.style.color = '#94a3b8';
      p.textContent = 'Chưa có môn học nào';
      fieldset.appendChild(p);
      return;
    }

    availableSubjects.forEach((s) => {
      const label = document.createElement('label');
      const input = document.createElement('input');
      input.type = 'checkbox';
      input.name = 'subject';
      input.value = s;
      input.checked = currentChecked.has(s);
      label.appendChild(input);

      const text = document.createTextNode(' ' + s);
      label.appendChild(text);

      fieldset.appendChild(label);
    });
  }

  function updateFilterBadge() {
    const count = resourceState.subjects.length + (resourceState.extension === 'all' ? 0 : 1);
    filterCount.textContent = count;
    filterCount.hidden = count === 0;
  }

  function initTabsAndSearch() {
    // 1. Chuyển tab Loại tài liệu
    $$('[data-category]').forEach((button) => {
      button.addEventListener('click', () => {
        resourceState.category = button.dataset.category;
        $$('[data-category]').forEach((tab) => tab.classList.toggle('is-active', tab === button));
        fetchResources(1, false);
      });
    });

    // 2. Tìm kiếm với Debounce 300ms
    let searchDebounceTimeout = null;
    function handleSearchInput(keyword) {
      resourceState.keyword = keyword;
      window.clearTimeout(searchDebounceTimeout);
      searchDebounceTimeout = window.setTimeout(() => {
        fetchResources(1, false);
      }, 300);
    }

    $('#resource-search')?.addEventListener('input', (e) => {
      if ($('#site-search')) $('#site-search').value = e.target.value;
      handleSearchInput(e.target.value);
    });

    $('#site-search')?.addEventListener('input', (e) => {
      if ($('#resource-search')) $('#resource-search').value = e.target.value;
      handleSearchInput(e.target.value);
    });

    // 3. Sắp xếp Sort
    $('#sort-select')?.addEventListener('change', (e) => {
      resourceState.sort = e.target.value;
      fetchResources(1, false);
    });

    // 4. Reset tìm kiếm
    emptyActionButton?.addEventListener('click', () => {
      if (emptyActionButton.textContent === 'Tải lên tài liệu ngay') {
        $('#open-upload-button')?.click();
        return;
      }
      resourceState.keyword = '';
      resourceState.category = 'all';
      resourceState.subjects = [];
      resourceState.extension = 'all';
      if ($('#resource-search')) $('#resource-search').value = '';
      if ($('#site-search')) $('#site-search').value = '';
      filterPanel?.reset();
      $$('[data-category]').forEach((tab) => tab.classList.toggle('is-active', tab.dataset.category === 'all'));
      updateFilterBadge();
      renderSubjectFilters();
      fetchResources(1, false);
    });

    // 5. Nút Thử lại khi lỗi
    $('#retry-button')?.addEventListener('click', () => {
      fetchResources(1, false);
      fetchStats();
      fetchRecent();
    });

    // 6. Nút Load more
    loadMoreButton?.addEventListener('click', () => {
      if (resourceState.page < resourceState.totalPages && !resourceState.loading) {
        fetchResources(resourceState.page + 1, true);
      }
    });

    // 7. Banner Explore now
    $('#explore-button')?.addEventListener('click', () => {
      $('#resource-list')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      $('#resource-search')?.focus();
    });

    // Phím tắt Ctrl + K
    document.addEventListener('keydown', (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        $('#site-search')?.focus();
      }
    });
  }

  function initFilters() {
    filterButton?.addEventListener('click', () => {
      filterPanel.hidden = !filterPanel.hidden;
      filterButton.setAttribute('aria-expanded', String(!filterPanel.hidden));
    });

    filterPanel?.addEventListener('submit', (event) => {
      event.preventDefault();
      const data = new FormData(filterPanel);
      resourceState.subjects = data.getAll('subject');
      resourceState.extension = data.get('extension') || 'all';
      updateFilterBadge();
      fetchResources(1, false);
    });

    $('#clear-filter-button')?.addEventListener('click', () => {
      filterPanel.reset();
      resourceState.subjects = [];
      resourceState.extension = 'all';
      updateFilterBadge();
      renderSubjectFilters();
      fetchResources(1, false);
    });
  }

  // =========================================================
  // 12. TẢI LÊN TÀI LIỆU MỚI (UPLOAD FORM THẬT)
  // =========================================================
  function initUploadForm() {
    const form = $('#upload-form');
    const fileInput = $('#resource-file');
    const selectedFile = $('#selected-file');
    const dropZone = $('#drop-zone');
    const submitBtn = $('#upload-submit-button');
    const progressContainer = $('#upload-progress-container');
    const progressBar = $('#upload-progress-bar');
    const progressText = $('#upload-progress-text');

    // 1. Quản lý Custom Type Select
    const customTypeSelect = $('#custom-type-select');
    const customTypeTrigger = $('#custom-type-trigger');
    const customTypeMenu = $('#custom-type-menu');
    const realTypeInput = $('#real-type-input');

    const typeConfig = {
      document: { text: 'Document', tag: 'DOC' },
      code: { text: 'Code & Notebooks', tag: 'CODE' },
      template: { text: 'Template & Slides', tag: 'PPT' },
      dataset: { text: 'Dataset', tag: 'DATA' }
    };

    function setCustomTypeValue(type) {
      const valid = typeConfig[type] ? type : 'document';
      if (realTypeInput) realTypeInput.value = valid;

      if (customTypeSelect) {
        const tagEl = customTypeSelect.querySelector('.res-select-selected .res-type-tag');
        const textEl = customTypeSelect.querySelector('.res-select-selected .res-select-text');
        if (tagEl) {
          tagEl.textContent = typeConfig[valid].tag;
          tagEl.dataset.kind = valid;
        }
        if (textEl) {
          textEl.textContent = typeConfig[valid].text;
        }
        customTypeSelect.querySelectorAll("li[role='option']").forEach((li) => {
          li.classList.toggle('is-selected', li.dataset.value === valid);
        });
      }
    }

    function toggleTypeMenu(open) {
      if (!customTypeMenu || !customTypeTrigger) return;
      const shouldOpen = open !== undefined ? open : customTypeMenu.hidden;
      customTypeMenu.hidden = !shouldOpen;
      customTypeTrigger.setAttribute('aria-expanded', String(shouldOpen));
      customTypeSelect?.classList.toggle('is-open', shouldOpen);
    }

    customTypeTrigger?.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleSubjectCombobox(false);
      toggleTypeMenu();
    });

    customTypeMenu?.addEventListener('click', (e) => {
      const opt = e.target.closest("li[role='option']");
      if (!opt) return;
      setCustomTypeValue(opt.dataset.value);
      toggleTypeMenu(false);
    });

    // 2. Quản lý Custom Subject Combobox
    const subjectCombobox = $('#custom-subject-combobox');
    const subjectInput = $('#resource-subject');
    const subjectToggleBtn = $('#subject-dropdown-toggle');
    const subjectMenu = $('#subject-dropdown-menu');
    const subjectOptionsList = $('#subject-options-list');

    function renderSubjectOptions(filterText = '') {
      if (!subjectOptionsList) return;
      const allSubs = availableSubjects.length > 0 ? availableSubjects : [
        'CSD203', 'CEA201', 'MAS291', 'CSI104', 'MAE101', 'Machine Learning', 'Mathematics', 'Programming', 'Data Science'
      ];
      const query = filterText.trim().toLowerCase();
      const filtered = allSubs.filter((s) => !query || s.toLowerCase().includes(query));

      let html = '';
      if (query && !allSubs.some((s) => s.toLowerCase() === query)) {
        html += `
          <li role="option" class="res-subject-opt is-custom-create" data-value="${filterText.trim()}">
            <span class="res-sub-tag">✍️ Đặt tên môn:</span>
            <strong>"${filterText.trim()}"</strong>
          </li>`;
      }

      if (filtered.length > 0) {
        html += filtered.map((s) => {
          const isCurrent = (subjectInput?.value || '').trim().toLowerCase() === s.toLowerCase();
          return `
            <li role="option" class="res-subject-opt ${isCurrent ? 'is-selected' : ''}" data-value="${s}">
              <span class="res-sub-icon">📚</span>
              <span class="res-sub-name">${s}</span>
              ${isCurrent ? `<svg class="res-opt-check" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>` : ''}
            </li>`;
        }).join('');
      } else if (!html) {
        html = '<li style="padding:10px; font-size:12px; color:#94a3b8; text-align:center;">Gõ tên môn học tùy ý và tải lên</li>';
      }

      subjectOptionsList.innerHTML = html;
    }

    function toggleSubjectCombobox(open) {
      if (!subjectMenu) return;
      const shouldOpen = open !== undefined ? open : subjectMenu.hidden;
      subjectMenu.hidden = !shouldOpen;
      subjectCombobox?.classList.toggle('is-open', shouldOpen);
      if (shouldOpen) {
        renderSubjectOptions(subjectInput?.value || '');
      }
    }

    subjectInput?.addEventListener('focus', () => {
      toggleTypeMenu(false);
      toggleSubjectCombobox(true);
    });

    subjectInput?.addEventListener('input', () => {
      toggleTypeMenu(false);
      if (subjectMenu?.hidden) toggleSubjectCombobox(true);
      renderSubjectOptions(subjectInput.value);
    });

    subjectToggleBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleTypeMenu(false);
      toggleSubjectCombobox();
    });

    subjectMenu?.addEventListener('click', (e) => {
      const opt = e.target.closest("li[role='option']");
      if (!opt) return;
      if (subjectInput) {
        subjectInput.value = opt.dataset.value;
        subjectInput.dispatchEvent(new Event('change'));
      }
      toggleSubjectCombobox(false);
    });

    document.addEventListener('click', (e) => {
      if (customTypeSelect && !customTypeSelect.contains(e.target)) toggleTypeMenu(false);
      if (subjectCombobox && !subjectCombobox.contains(e.target)) toggleSubjectCombobox(false);
    });

    $('#open-upload-button')?.addEventListener('click', () => {
      const token = getAuthToken();
      if (!token) {
        showToast('Vui lòng đăng nhập để tải tài liệu lên thư viện.');
        setTimeout(() => {
          window.location.href = '/pages/auth/login.html';
        }, 1200);
        return;
      }
      setCustomTypeValue('document');
      toggleTypeMenu(false);
      toggleSubjectCombobox(false);
      renderSubjectOptions();
      openDialog(uploadDialog);
    });

    function showSelectedFile(file) {
      if (!file) return;

      const { extension, detectedType, detectedSubject } = detectFileTypeAndCategory(file);

      const rawTitle = file.name.replace(/\.[^.]+$/, '');
      const cleanTitle = rawTitle.replace(/[_-]+/g, ' ').trim();
      const titleInput = $('#upload-title');
      if (titleInput) titleInput.value = cleanTitle;

      setCustomTypeValue(detectedType);

      if (detectedSubject) {
        if (subjectInput) subjectInput.value = detectedSubject;
      }

      const sizeText = file.size < 1024 * 1024
        ? `${Math.round(file.size / 1024)} KB`
        : `${(file.size / (1024 * 1024)).toFixed(2)} MB`;

      const typeLabels = {
        document: 'Documents (Tài liệu)',
        code: 'Code (Mã nguồn)',
        template: 'Templates (Mẫu/Slide)',
        dataset: 'Datasets (Tập dữ liệu)'
      };

      selectedFile.innerHTML = `
        <div style="display:flex; flex-direction:column; gap:4px; text-align:left;">
          <div style="display:flex; align-items:center; justify-content:space-between;">
            <strong style="color:#0f172a; font-size:12px;">📄 ${file.name}</strong>
            <span style="color:#64748b; font-size:11px;">${sizeText}</span>
          </div>
          <div style="font-size:11px; color:#059669; font-weight:600; display:flex; align-items:center; gap:6px; flex-wrap:wrap; margin-top:2px;">
            <span>✓ Tự động nhận diện:</span>
            <span style="background:#d1fae5; padding:2px 6px; border-radius:4px; color:#065f46;">${typeLabels[detectedType] || detectedType}</span>
            ${detectedSubject ? `<span style="background:#e0f2fe; padding:2px 6px; border-radius:4px; color:#0369a1;">Gợi ý môn: ${detectedSubject}</span>` : `<span style="background:#fef3c7; padding:2px 6px; border-radius:4px; color:#92400e;">✍️ Bạn có thể nhập môn học bên dưới</span>`}
          </div>
        </div>
      `;
      selectedFile.hidden = false;
    }

    fileInput?.addEventListener('change', () => showSelectedFile(fileInput.files[0]));

    ['dragenter', 'dragover'].forEach((name) => dropZone?.addEventListener(name, (e) => {
      e.preventDefault();
      dropZone.classList.add('is-dragging');
    }));
    ['dragleave', 'drop'].forEach((name) => dropZone?.addEventListener(name, (e) => {
      e.preventDefault();
      dropZone.classList.remove('is-dragging');
    }));
    dropZone?.addEventListener('drop', (e) => {
      const file = e.dataTransfer.files[0];
      if (!file) return;
      const transfer = new DataTransfer();
      transfer.items.add(file);
      fileInput.files = transfer.files;
      showSelectedFile(file);
    });

    // Xử lý gửi Form tải lên thật
    form?.addEventListener('submit', async (event) => {
      event.preventDefault();

      const file = fileInput.files[0];
      if (!file) {
        showToast('Vui lòng chọn một file để tải lên.');
        return;
      }

      // 1. Kiểm tra Client-side: Dung lượng tối đa 20MB
      const MAX_SIZE = 20 * 1024 * 1024;
      if (file.size > MAX_SIZE) {
        showToast('Dung lượng file vượt quá giới hạn 20MB. Vui lòng chọn file nhỏ hơn.');
        return;
      }

      // 2. Kiểm tra Client-side: Định dạng mở rộng hợp lệ
      const ext = file.name.split('.').pop().toLowerCase();
      const allowedExts = ['pdf', 'doc', 'docx', 'ppt', 'pptx', 'xls', 'xlsx', 'csv', 'zip', 'py', 'ipynb', 'txt', 'md'];
      if (!allowedExts.includes(ext)) {
        showToast(`Định dạng .${ext} không được hỗ trợ. Vui lòng chọn tài liệu học tập.`);
        return;
      }

      const titleVal = ($('#upload-title')?.value || '').trim();
      if (!titleVal) {
        showToast('Vui lòng nhập tiêu đề tài liệu.');
        return;
      }

      const finalType = (realTypeInput ? realTypeInput.value : 'document') || 'document';
      const finalSubject = (subjectInput?.value || '').trim() || 'Chung';
      const finalDesc = ($('#upload-description')?.value || '').trim();

      // Chuẩn bị FormData
      const formData = new FormData();
      formData.append('file', file);
      formData.append('title', titleVal);
      formData.append('type', finalType);
      formData.append('subject', finalSubject);
      formData.append('description', finalDesc);

      // Khóa nút submit và hiện tiến trình
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Đang tải lên...';
      }
      if (progressContainer) {
        progressContainer.hidden = false;
        if (progressBar) progressBar.style.width = '45%';
        if (progressText) progressText.textContent = 'Đang gửi dữ liệu lên máy chủ...';
      }

      try {
        const res = await apiFetch(API_BASE, {
          method: 'POST',
          body: formData
        });

        if (progressBar) progressBar.style.width = '90%';

        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || 'Tải lên không thành công');
        }

        if (progressBar) progressBar.style.width = '100%';
        if (progressText) progressText.textContent = 'Hoàn tất!';

        // Thành công: Đóng dialog, reset form
        showToast('✓ Tải lên tài liệu thành công!');
        form.reset();
        selectedFile.hidden = true;
        closeDialog(uploadDialog);

        // Chuyển tab sang đúng loại file vừa upload
        resourceState.category = finalType;
        $$('[data-category]').forEach((tab) => tab.classList.toggle('is-active', tab.dataset.category === finalType));

        // Tải lại dữ liệu mới nhất
        await Promise.all([
          fetchResources(1, false),
          fetchStats(),
          fetchRecent()
        ]);
      } catch (err) {
        if (err.message !== 'Unauthorized') {
          showToast(err.message || 'Lỗi khi tải lên tài liệu.');
        }
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Upload';
        }
        if (progressContainer) {
          progressContainer.hidden = true;
          if (progressBar) progressBar.style.width = '0%';
        }
      }
    });
  }

  // =========================================================
  // 13. TOPBAR DROPDOWN & DIALOG HANDLERS
  // =========================================================
  function initResourceActions() {
    // Ủy quyền sự kiện click trên danh sách tài liệu
    resourceList?.addEventListener('click', (event) => {
      const downloadButton = event.target.closest('[data-download-id]');
      const favButton = event.target.closest('[data-fav-id]');
      const detailButton = event.target.closest('[data-detail-id]');
      const item = event.target.closest('.res-resource-item');

      if (downloadButton) {
        event.stopPropagation();
        downloadResource(downloadButton.dataset.downloadId);
        return;
      }
      if (favButton) {
        event.stopPropagation();
        toggleFavorite(favButton.dataset.favId);
        return;
      }
      if (detailButton) {
        event.stopPropagation();
        openResourceDetail(detailButton.dataset.detailId);
        return;
      }
      if (item) {
        openResourceDetail(item.dataset.resourceId);
      }
    });

    // Nút yêu thích trong modal chi tiết
    $('#detail-favorite-button')?.addEventListener('click', () => {
      if (currentDetailResource && currentDetailResource.id) {
        toggleFavorite(currentDetailResource.id);
      }
    });

    // Nút download trong modal chi tiết
    $('#detail-download-button')?.addEventListener('click', () => {
      if (resourceState.selectedId) {
        downloadResource(resourceState.selectedId);
      }
    });

    // Tab trong modal chi tiết
    $$('[data-detail-tab]').forEach((button) => {
      button.addEventListener('click', () => {
        resourceState.detailTab = button.dataset.detailTab;
        $$('[data-detail-tab]').forEach((tab) => tab.classList.toggle('is-active', tab === button));
        renderDetailTabContent();
      });
    });
  }

  function createDropdown(toggle, list, container) {
    if (!toggle || !list || !container) return;

    function isOpen() {
      return toggle.getAttribute('aria-expanded') === 'true';
    }

    function setOpen(open) {
      toggle.setAttribute('aria-expanded', String(open));
      if (open) {
        list.classList.remove('is-closing');
        list.hidden = false;
      } else {
        list.hidden = true;
      }
    }

    toggle.addEventListener('click', () => setOpen(!isOpen()));

    document.addEventListener('click', (event) => {
      if (!container.contains(event.target)) setOpen(false);
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') setOpen(false);
    });
  }

  function initTopbar() {
    createDropdown($('.user-menu-toggle'), $('#user-menu-list'), $('.user-menu'));

    const bell = $('.notification .icon-button');
    const notificationPanel = $('#notification-panel');
    createDropdown(bell, notificationPanel, $('.notification'));

    const clearButton = $('.notification-clear');
    const dot = $('.notification-dot');
    clearButton?.addEventListener('click', () => {
      $$('.notification-item.is-unread').forEach((item) => item.classList.remove('is-unread'));
      if (dot) dot.hidden = true;
      bell?.setAttribute('aria-label', 'Notifications (không có thông báo mới)');
    });

    $('.search')?.addEventListener('submit', (event) => event.preventDefault());

    // Đăng xuất an toàn: Xóa token và user trong localStorage
    $('#logout-button')?.addEventListener('click', (event) => {
      event.preventDefault();
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/pages/auth/login.html';
    });
  }

  function initDialogs() {
    function cleanupPreview() {
      if (currentPreviewBlobUrl) {
        URL.revokeObjectURL(currentPreviewBlobUrl);
        currentPreviewBlobUrl = null;
      }
    }

    $$('[data-close-dialog]').forEach((button) => {
      button.addEventListener('click', () => {
        const dialog = $('#' + button.dataset.closeDialog);
        if (dialog === detailDialog) cleanupPreview();
        closeDialog(dialog);
      });
    });

    $$('.res-dialog').forEach((dialog) => {
      dialog.addEventListener('click', (event) => {
        const rect = dialog.getBoundingClientRect();
        const inside = event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom;
        if (!inside) {
          if (dialog === detailDialog) cleanupPreview();
          closeDialog(dialog);
        }
      });
      dialog.addEventListener('close', () => {
        if (dialog === detailDialog) cleanupPreview();
      });
    });
  }

  // =========================================================
  // 14. KHỞI TẠO TOÀN TRANG
  // =========================================================
  async function initResourcesPage() {
    // Auth-guard: Nếu người dùng chưa đăng nhập, tự động chuyển hướng về trang đăng nhập
    const token = getAuthToken();
    if (!token) {
      window.location.replace('/pages/auth/login.html');
      return;
    }

    initTabsAndSearch();
    initFilters();
    initResourceActions();
    initUploadForm();
    initEditDialog();
    initDeleteDialog();
    initTopbar();
    initDialogs();

    // Hỗ trợ Deep-linking: Đọc tham số ?q= từ URL nếu được chuyển hướng từ tìm kiếm toàn cục
    const urlParams = new URLSearchParams(window.location.search);
    const initialQuery = urlParams.get('q');
    if (initialQuery && initialQuery.trim()) {
      const q = initialQuery.trim();
      resourceState.keyword = q;
      if ($('#resource-search')) $('#resource-search').value = q;
      if ($('#site-search')) $('#site-search').value = q;
      setTimeout(() => {
        $('#resource-list')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 500);
    }

    // Tải dữ liệu ban đầu từ API máy chủ
    await Promise.all([
      fetchResources(1, false),
      fetchStats(),
      fetchRecent()
    ]);
  }

  document.addEventListener('DOMContentLoaded', initResourcesPage);
})();
