const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../pages/admin/admin.html');
let content = fs.readFileSync(filePath, 'utf8');

const startTag = '<section class="admin-page is-visible" id="page-dashboard"';
const endTag = '</section>';

const startIdx = content.indexOf(startTag);
if (startIdx === -1) {
  console.error('Start tag not found');
  process.exit(1);
}

const endIdx = content.indexOf(endTag, startIdx);
if (endIdx === -1) {
  console.error('End tag not found');
  process.exit(1);
}

const before = content.slice(0, startIdx);
const after = content.slice(endIdx + endTag.length);

const newDashboardHtml = `<section class="admin-page is-visible" id="page-dashboard" data-page-panel="dashboard"
                    aria-labelledby="dashboard-title">
                    <div class="page-heading">
                        <div>
                            <p class="eyebrow">OVERVIEW</p>
                            <h1 id="dashboard-title">Chào mừng trở lại, Admin <span aria-hidden="true">👋</span></h1>
                            <p class="page-subtitle">Dưới đây là tổng quan hoạt động của 9.5 AI CLUB trong thời gian gần đây.</p>
                        </div>
                        <div class="dash-dropdown">
                            <button class="dash-dropdown-btn" id="dash-range-toggle" type="button" aria-haspopup="true" aria-expanded="false">
                                <span class="select-cal-icon"></span> <span class="dash-btn-text">7 ngày qua</span> <span class="dash-chevron">⌄</span>
                            </button>
                            <ul class="dash-dropdown-menu" id="dash-range-menu" role="menu">
                                <li><button type="button" class="dash-dropdown-item is-selected" data-value="7d" role="menuitem">7 ngày qua</button></li>
                                <li><button type="button" class="dash-dropdown-item" data-value="30d" role="menuitem">30 ngày qua</button></li>
                                <li><button type="button" class="dash-dropdown-item" data-value="90d" role="menuitem">90 ngày qua</button></li>
                            </ul>
                        </div>
                    </div>

                    <!-- Panel Cần xử lý (Tài khoản chờ duyệt & Báo cáo vi phạm) -->
                    <div class="dashboard-attention-grid" id="dashboard-attention-panel">
                        <a href="#users" class="attention-card" data-page-target="users">
                            <div class="attention-icon-wrap amber"><span class="metric-users-icon"></span></div>
                            <div class="attention-details">
                                <p class="attention-title">Tài khoản chờ duyệt</p>
                                <p class="attention-count" id="attention-pending-count" data-dash-val>0</p>
                            </div>
                            <span class="attention-arrow">→</span>
                        </a>
                        <a href="#community" class="attention-card" data-page-target="community">
                            <div class="attention-icon-wrap rose"><span class="metric-report-icon"></span></div>
                            <div class="attention-details">
                                <p class="attention-title">Báo cáo vi phạm chờ xử lý</p>
                                <p class="attention-count" id="attention-reports-count" data-dash-val>0</p>
                            </div>
                            <span class="attention-arrow">→</span>
                        </a>
                    </div>

                    <!-- 4 Thẻ số liệu chính -->
                    <div class="metric-grid">
                        <article class="metric-card">
                            <span class="metric-icon blue metric-users-icon"></span>
                            <span class="metric-label">Tổng người dùng</span>
                            <strong id="metric-users-val" data-dash-val>...</strong>
                            <small class="trend neutral" id="metric-users-trend"><span>Đang tải...</span></small>
                        </article>
                        <article class="metric-card">
                            <span class="metric-icon violet metric-courses-icon"></span>
                            <span class="metric-label">Tổng khóa học</span>
                            <strong id="metric-courses-val" data-dash-val>...</strong>
                            <small class="trend neutral" id="metric-courses-trend"><span>Đang tải...</span></small>
                        </article>
                        <article class="metric-card">
                            <span class="metric-icon cyan metric-pending-icon"></span>
                            <span class="metric-label">Bài viết cộng đồng</span>
                            <strong id="metric-posts-val" data-dash-val>...</strong>
                            <small class="trend neutral" id="metric-posts-trend"><span>Đang tải...</span></small>
                        </article>
                        <article class="metric-card">
                            <span class="metric-icon red metric-report-icon"></span>
                            <span class="metric-label">Tài liệu thư viện</span>
                            <strong id="metric-resources-val" data-dash-val>...</strong>
                            <small class="trend neutral" id="metric-resources-trend"><span>Đang tải...</span></small>
                        </article>
                    </div>

                    <!-- Biểu đồ & Phân bố vai trò -->
                    <div class="dashboard-charts">
                        <article class="panel chart-panel">
                            <div class="panel-heading">
                                <div>
                                    <h2 id="chart-title">Active người dùng</h2>
                                    <p id="chart-subtitle">Số lượng người dùng hoạt động theo ngày</p>
                                </div>
                                <div class="dash-dropdown">
                                    <button class="dash-dropdown-btn" id="dash-metric-toggle" type="button" aria-haspopup="true" aria-expanded="false">
                                        <span class="dash-btn-text">Active người dùng</span> <span class="dash-chevron">⌄</span>
                                    </button>
                                    <ul class="dash-dropdown-menu" id="dash-metric-menu" role="menu">
                                        <li><button type="button" class="dash-dropdown-item is-selected" data-value="activeUsers" role="menuitem">Active người dùng</button></li>
                                        <li><button type="button" class="dash-dropdown-item" data-value="newUsers" role="menuitem">Đăng ký mới</button></li>
                                        <li><button type="button" class="dash-dropdown-item" data-value="contentActivity" role="menuitem">Hoạt động nội dung</button></li>
                                    </ul>
                                </div>
                            </div>
                            <div class="line-chart" style="position:relative;">
                                <div class="chart-y" id="chart-y-axis">
                                    <span>5</span><span>4</span><span>3</span><span>2</span><span>0</span>
                                </div>
                                <div class="chart-tooltip" id="chart-tooltip" role="tooltip" aria-hidden="true"></div>
                                <svg viewBox="0 0 600 190" role="img" id="dashboard-svg-chart"
                                    aria-label="Biểu đồ hoạt động theo thời gian">
                                    <defs>
                                        <linearGradient id="chart-fill" x1="0" x2="0" y1="0" y2="1">
                                            <stop offset="0" stop-color="#3b82f6" stop-opacity=".22" />
                                            <stop offset="1" stop-color="#3b82f6" stop-opacity="0" />
                                        </linearGradient>
                                    </defs>
                                    <path class="chart-grid"
                                        d="M30 20H570M30 55H570M30 90H570M30 125H570M30 160H570" />
                                    <path class="chart-area" d="" />
                                    <path class="chart-line" d="" />
                                    <g class="chart-points"></g>
                                </svg>
                                <div class="chart-x" id="chart-x-axis"></div>
                            </div>
                            <div class="chart-active-note" id="chart-active-note" hidden></div>
                        </article>

                        <article class="panel roles-panel">
                            <div class="panel-heading">
                                <div>
                                    <h2>Phân bố vai trò</h2>
                                    <p>Tỷ lệ tài khoản theo vai trò trong hệ thống</p>
                                </div>
                            </div>
                            <div class="role-content">
                                <div class="donut" id="dashboard-roles-donut">
                                    <div><strong id="donut-total-users" data-dash-val>...</strong><span>Tổng người dùng</span></div>
                                </div>
                                <ul class="legend-list" id="donut-legend-list"></ul>
                            </div>
                        </article>
                    </div>

                    <!-- Hoạt động gần đây -->
                    <article class="panel activity-panel">
                        <div class="panel-heading">
                            <div>
                                <h2>Active gần đây</h2>
                            </div>
                            <button type="button" class="button-link" id="dash-view-all-activity" style="background:none; border:none; color:var(--accent-bright,#2167e9); font-weight:600; cursor:pointer;">View tất cả <span>→</span></button>
                        </div>
                        <ul class="activity-list" id="dashboard-activity-list">
                            <li style="justify-content:center; color:#94a3b8;">Đang tải hoạt động...</li>
                        </ul>
                    </article>

                    <!-- Modal Xem tất cả hoạt động -->
                    <div class="activity-modal-overlay" id="activity-modal-overlay" aria-hidden="true">
                        <div class="activity-modal-container" role="dialog" aria-labelledby="activity-modal-title">
                            <header class="activity-modal-header">
                                <h2 class="activity-modal-title" id="activity-modal-title">Dòng thời gian hoạt động hệ thống</h2>
                                <button type="button" class="activity-modal-close" id="activity-modal-close" aria-label="Đóng">✕</button>
                            </header>
                            <div class="activity-filter-bar">
                                <button type="button" class="activity-filter-chip is-active" data-type="">Tất cả</button>
                                <button type="button" class="activity-filter-chip" data-type="user_registered">Người dùng</button>
                                <button type="button" class="activity-filter-chip" data-type="post_created">Bài viết</button>
                                <button type="button" class="activity-filter-chip" data-type="comment_created">Bình luận</button>
                                <button type="button" class="activity-filter-chip" data-type="course_created">Khóa học</button>
                                <button type="button" class="activity-filter-chip" data-type="resource_uploaded">Tài liệu</button>
                            </div>
                            <div class="activity-modal-body" id="activity-modal-list">
                                <div style="text-align:center; padding:30px; color:#94a3b8;">Đang tải hoạt động...</div>
                            </div>
                            <footer class="activity-modal-footer">
                                <span id="activity-page-indicator" style="font-size:13px; color:#64748b;">Trang 1 / 1</span>
                                <div class="activity-pagination">
                                    <button type="button" id="activity-prev-page" disabled>Trước</button>
                                    <button type="button" id="activity-next-page" disabled>Sau</button>
                                </div>
                            </footer>
                        </div>
                    </div>
                </section>`;

fs.writeFileSync(filePath, before + newDashboardHtml + after, 'utf8');
console.log('Successfully replaced #page-dashboard in admin.html');
