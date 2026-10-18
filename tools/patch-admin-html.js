const fs = require('fs');
const path = require('path');

const adminHtmlPath = path.join(__dirname, '../pages/admin/admin.html');
let html = fs.readFileSync(adminHtmlPath, 'utf8');

// 1. Add admin-settings.css to <head> if not present
if (!html.includes('admin-settings.css')) {
  html = html.replace(
    '<link rel="stylesheet" href="../../css/admin-moderation.css">',
    '<link rel="stylesheet" href="../../css/admin-moderation.css">\n    <link rel="stylesheet" href="../../css/admin-settings.css">'
  );
}

// 2. Add admin-settings.js to bottom if not present
if (!html.includes('admin-settings.js')) {
  html = html.replace(
    '<script src="../../js/admin-moderation.js"></script>',
    '<script src="../../js/admin-moderation.js"></script>\n    <script src="../../js/admin-settings.js"></script>'
  );
}

// 3. New #page-settings markup
const newSettingsHtml = `                <section class="admin-page" id="page-settings" data-page-panel="settings"
                    aria-labelledby="settings-title" hidden>
                    <div class="page-heading">
                        <div>
                            <p class="eyebrow">CẤU HÌNH HỆ THỐNG</p>
                            <h1 id="settings-title">Cài đặt hệ thống</h1>
                            <p class="page-subtitle">Quản lý thông tin thương hiệu, giao diện mặc định, dịch vụ email và chính sách bảo mật toàn website.</p>
                        </div>
                    </div>

                    <!-- Banner Chỉ đọc cho vai trò Admin -->
                    <div class="settings-readonly-banner" id="settings-readonly-banner" style="display: none;" role="status">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="12" cy="12" r="10"/>
                            <line x1="12" y1="16" x2="12" y2="12"/>
                            <line x1="12" y1="8" x2="12.01" y2="8"/>
                        </svg>
                        <span><strong>Chế độ Chỉ đọc:</strong> Bạn đang đăng nhập với vai trò Quản trị viên (Admin). Chỉ Chủ sở hữu (Owner) mới có quyền chỉnh sửa và lưu các thiết lập hệ thống.</span>
                    </div>

                    <!-- Sub-tabs ARIA Tablist -->
                    <nav class="settings-tabs" role="tablist" aria-label="Nhóm cài đặt">
                        <button type="button" class="settings-tab-btn is-active selected" role="tab" id="tab-btn-general"
                            aria-selected="true" aria-controls="panel-general" data-subtab="general">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="12" cy="12" r="10"/>
                                <line x1="12" y1="16" x2="12" y2="12"/>
                                <line x1="12" y1="8" x2="12.01" y2="8"/>
                            </svg>
                            <span>Thông tin chung</span>
                        </button>
                        <button type="button" class="settings-tab-btn" role="tab" id="tab-btn-appearance"
                            aria-selected="false" aria-controls="panel-appearance" data-subtab="appearance">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/>
                                <circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/>
                                <circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/>
                                <circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/>
                                <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.563-2.512 5.563-5.563C22 6.5 17.5 2 12 2z"/>
                            </svg>
                            <span>Giao diện</span>
                        </button>
                        <button type="button" class="settings-tab-btn" role="tab" id="tab-btn-email"
                            aria-selected="false" aria-controls="panel-email" data-subtab="email">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                                <polyline points="22,6 12,13 2,6"/>
                            </svg>
                            <span>Email</span>
                        </button>
                        <button type="button" class="settings-tab-btn" role="tab" id="tab-btn-security"
                            aria-selected="false" aria-controls="panel-security" data-subtab="security">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                            </svg>
                            <span>Bảo mật</span>
                        </button>
                    </nav>

                    <form class="settings-panel" id="form-settings" onsubmit="return false;">
                        <!-- TAB 1: THÔNG TIN CHUNG (GENERAL) -->
                        <div class="settings-tab-panel" id="panel-general" data-subpanel="general" role="tabpanel" aria-labelledby="tab-btn-general">
                            <h2 class="settings-section-title">Thông tin Website & Nhận diện thương hiệu</h2>
                            <p class="settings-section-subtitle">Tên website và mô tả được hiển thị trên thanh tiêu đề trình duyệt, công cụ tìm kiếm và thẻ chia sẻ mạng xã hội.</p>

                            <div class="settings-field">
                                <label class="settings-field-label" for="setting-website-name">
                                    <span>Tên website <span style="color: #ef4444;">*</span></span>
                                    <span class="settings-field-hint">Tối đa 60 ký tự</span>
                                </label>
                                <input type="text" id="setting-website-name" class="settings-input" maxlength="60" placeholder="VD: 9.5 AI CLUB" required>
                            </div>

                            <div class="settings-field">
                                <label class="settings-field-label" for="setting-short-description">
                                    <span>Mô tả ngắn (Tagline)</span>
                                    <span class="settings-field-hint">Tối đa 160 ký tự</span>
                                </label>
                                <textarea id="setting-short-description" class="settings-textarea" maxlength="160" placeholder="Mô tả tóm tắt về sứ mệnh hoặc nội dung của website..."></textarea>
                            </div>

                            <div class="branding-grid">
                                <!-- Card Logo -->
                                <div class="branding-card">
                                    <div class="branding-card-header">
                                        <h3 class="branding-card-title">Logo Website</h3>
                                        <span class="branding-badge">Tối đa 256×256</span>
                                    </div>
                                    <div class="branding-content">
                                        <div class="branding-preview-wrap">
                                            <img id="logo-preview-img" class="branding-preview-img" src="/assets/icon/cool_book_128.png" alt="Logo 9.5 AI CLUB">
                                        </div>
                                        <div class="branding-actions">
                                            <div class="branding-btn-row">
                                                <button type="button" class="btn-branding-upload" id="btn-upload-logo">
                                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                                                    <span>Tải ảnh lên...</span>
                                                </button>
                                                <button type="button" class="btn-branding-reset" id="btn-reset-logo">Mặc định</button>
                                                <input type="file" id="file-input-logo" accept="image/png,image/jpeg,image/webp" hidden>
                                            </div>
                                            <p class="branding-info-text">PNG, JPG, WEBP &le; 1MB. Tự động thu nhỏ và nén an toàn.</p>
                                        </div>
                                    </div>
                                </div>

                                <!-- Card Favicon -->
                                <div class="branding-card">
                                    <div class="branding-card-header">
                                        <h3 class="branding-card-title">Favicon (Biểu tượng Tab)</h3>
                                        <span class="branding-badge">Khuyên dùng 32×32</span>
                                    </div>
                                    <div class="branding-content">
                                        <div class="branding-preview-wrap">
                                            <img id="favicon-preview-img" class="branding-preview-img" src="/assets/icon/favicon-32.png" alt="Favicon 9.5 AI CLUB">
                                        </div>
                                        <div class="branding-actions">
                                            <div class="branding-btn-row">
                                                <button type="button" class="btn-branding-upload" id="btn-upload-favicon">
                                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                                                    <span>Tải ảnh lên...</span>
                                                </button>
                                                <button type="button" class="btn-branding-reset" id="btn-reset-favicon">Mặc định</button>
                                                <input type="file" id="file-input-favicon" accept="image/png,image/jpeg,image/webp" hidden>
                                            </div>
                                            <p class="branding-info-text">Tự động căn giữa và cắt vuông sắc nét trên thanh tab.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <hr class="settings-divider">

                            <h2 class="settings-section-title">Liên kết Mạng xã hội & Cộng đồng</h2>
                            <p class="settings-section-subtitle">Các biểu tượng liên kết chỉ xuất hiện ở chân trang (Footer) và các trang liên hệ khi có đường dẫn URL hợp lệ.</p>

                            <div class="social-links-list">
                                <!-- Facebook -->
                                <div class="social-link-row">
                                    <div class="social-brand-icon-box brand-facebook" title="Facebook">
                                        <svg viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                                    </div>
                                    <span class="social-label-text">Facebook</span>
                                    <input type="url" id="social-facebook" class="social-url-input" placeholder="https://facebook.com/..." maxlength="255">
                                </div>

                                <!-- Discord -->
                                <div class="social-link-row">
                                    <div class="social-brand-icon-box brand-discord" title="Discord">
                                        <svg viewBox="0 0 24 24"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.893.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>
                                    </div>
                                    <span class="social-label-text">Discord</span>
                                    <input type="url" id="social-discord" class="social-url-input" placeholder="https://discord.gg/..." maxlength="255">
                                </div>

                                <!-- YouTube -->
                                <div class="social-link-row">
                                    <div class="social-brand-icon-box brand-youtube" title="YouTube">
                                        <svg viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                                    </div>
                                    <span class="social-label-text">YouTube</span>
                                    <input type="url" id="social-youtube" class="social-url-input" placeholder="https://youtube.com/@..." maxlength="255">
                                </div>

                                <!-- Twitter / X -->
                                <div class="social-link-row">
                                    <div class="social-brand-icon-box brand-x" title="Twitter (X)">
                                        <svg viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                                    </div>
                                    <span class="social-label-text">Twitter (X)</span>
                                    <input type="url" id="social-x" class="social-url-input" placeholder="https://x.com/..." maxlength="255">
                                </div>

                                <!-- GitHub -->
                                <div class="social-link-row">
                                    <div class="social-brand-icon-box brand-github" title="GitHub">
                                        <svg viewBox="0 0 24 24"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
                                    </div>
                                    <span class="social-label-text">GitHub</span>
                                    <input type="url" id="social-github" class="social-url-input" placeholder="https://github.com/..." maxlength="255">
                                </div>
                            </div>
                        </div>

                        <!-- TAB 2: GIAO DIỆN (APPEARANCE) -->
                        <div class="settings-tab-panel" id="panel-appearance" data-subpanel="appearance" role="tabpanel" aria-labelledby="tab-btn-appearance" hidden>
                            <h2 class="settings-section-title">Chủ đề Mặc định (Default Theme)</h2>
                            <p class="settings-section-subtitle">Chủ đề áp dụng cho khách vãng lai và người dùng chưa đặt tùy chọn giao diện cá nhân.</p>

                            <div class="theme-selector-grid" role="radiogroup" aria-label="Chọn chủ đề mặc định">
                                <div class="theme-card-option" data-theme-value="system" role="radio" aria-checked="false" tabindex="0">
                                    <div class="theme-card-icon">
                                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
                                    </div>
                                    <h3 class="theme-card-title">Hệ thống</h3>
                                    <p class="theme-card-desc">Tự động thích ứng theo chế độ máy tính/điện thoại người dùng</p>
                                </div>

                                <div class="theme-card-option" data-theme-value="light" role="radio" aria-checked="false" tabindex="0">
                                    <div class="theme-card-icon">
                                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
                                    </div>
                                    <h3 class="theme-card-title">Chủ đề Sáng</h3>
                                    <p class="theme-card-desc">Giao diện tươi sáng, độ tương phản cao, tối ưu cho môi trường đủ sáng</p>
                                </div>

                                <div class="theme-card-option" data-theme-value="dark" role="radio" aria-checked="false" tabindex="0">
                                    <div class="theme-card-icon">
                                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
                                    </div>
                                    <h3 class="theme-card-title">Chủ đề Tối</h3>
                                    <p class="theme-card-desc">Giao diện nền tối sang trọng, dịu mắt, tiết kiệm năng lượng màn hình OLED</p>
                                </div>
                            </div>

                            <hr class="settings-divider">

                            <h2 class="settings-section-title">Màu nhấn Chủ đạo (Default Accent Color)</h2>
                            <p class="settings-section-subtitle">Màu sắc các nút bấm chính, liên kết nổi bật và hiệu ứng trang trí ban đầu.</p>

                            <div class="accent-selector-grid" role="radiogroup" aria-label="Chọn màu nhấn mặc định">
                                <div class="accent-pill-option" data-accent-value="blue" role="radio" aria-checked="false" tabindex="0">
                                    <span class="accent-color-circle" style="background: #2563eb;"></span>
                                    <span>Xanh lam (Mặc định)</span>
                                </div>
                                <div class="accent-pill-option" data-accent-value="purple" role="radio" aria-checked="false" tabindex="0">
                                    <span class="accent-color-circle" style="background: #7c3aed;"></span>
                                    <span>Tím thạch anh</span>
                                </div>
                                <div class="accent-pill-option" data-accent-value="green" role="radio" aria-checked="false" tabindex="0">
                                    <span class="accent-color-circle" style="background: #16a34a;"></span>
                                    <span>Xanh ngọc lục bảo</span>
                                </div>
                                <div class="accent-pill-option" data-accent-value="orange" role="radio" aria-checked="false" tabindex="0">
                                    <span class="accent-color-circle" style="background: #ea580c;"></span>
                                    <span>Cam năng lượng</span>
                                </div>
                                <div class="accent-pill-option" data-accent-value="pink" role="radio" aria-checked="false" tabindex="0">
                                    <span class="accent-color-circle" style="background: #db2777;"></span>
                                    <span>Hồng thạch anh</span>
                                </div>
                            </div>
                        </div>

                        <!-- TAB 3: EMAIL (TRUNG THỰC - CHƯA KÍCH HOẠT) -->
                        <div class="settings-tab-panel" id="panel-email" data-subpanel="email" role="tabpanel" aria-labelledby="tab-btn-email" hidden>
                            <h2 class="settings-section-title">Dịch vụ Thư điện tử (Email SMTP)</h2>
                            <p class="settings-section-subtitle">Thông báo trạng thái hạ tầng gửi thư tự động của hệ thống.</p>

                            <div class="email-status-card">
                                <div class="email-status-header">
                                    <h3 style="margin: 0; font-size: 15px; font-weight: 700;">Hạ tầng Gửi Email Hệ thống</h3>
                                    <span class="email-status-pill status-pending">Chưa kích hoạt</span>
                                </div>

                                <p class="email-explanation">
                                    Hệ thống 9.5 AI Library hiện sử dụng phương thức đăng nhập và kiểm soát tài khoản tập trung trực tiếp qua máy chủ. Để đảm bảo <strong>an toàn thông tin tuyệt đối</strong>, cấu hình máy chủ SMTP (mật khẩu ứng dụng, API key) sẽ được nạp trực tiếp qua biến môi trường bí mật (<code>.env</code>) trên máy chủ khi tính năng phát hành chính thức, hoàn toàn <strong>không lưu mật khẩu thư vào cơ sở dữ liệu</strong>.
                                </p>

                                <h4 style="margin: 8px 0 4px 0; font-size: 13.5px; font-weight: 600;">Lộ trình tính năng Email:</h4>
                                <ul class="email-feature-list">
                                    <li class="email-feature-item">
                                        <span>Gửi liên kết đặt lại mật khẩu an toàn</span>
                                        <span class="email-feature-badge">Sắp ra mắt</span>
                                    </li>
                                    <li class="email-feature-item">
                                        <span>Thông báo phê duyệt tài khoản mới</span>
                                        <span class="email-feature-badge">Sắp ra mắt</span>
                                    </li>
                                    <li class="email-feature-item">
                                        <span>Cảnh báo báo cáo vi phạm cộng đồng</span>
                                        <span class="email-feature-badge">Sắp ra mắt</span>
                                    </li>
                                    <li class="email-feature-item">
                                        <span>Bản tin tóm tắt hoạt động tuần</span>
                                        <span class="email-feature-badge">Sắp ra mắt</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <!-- TAB 4: BẢO MẬT & PHIÊN (SECURITY) -->
                        <div class="settings-tab-panel" id="panel-security" data-subpanel="security" role="tabpanel" aria-labelledby="tab-btn-security" hidden>
                            <h2 class="settings-section-title">Chính sách Đăng ký & Bảo mật Tài khoản</h2>
                            <p class="settings-section-subtitle">Các quy định kiểm soát tài khoản thành viên mới và thời hạn phiên đăng nhập toàn website.</p>

                            <div class="security-settings-grid">
                                <!-- Cho phép đăng ký -->
                                <div class="security-card">
                                    <div class="security-card-info">
                                        <h3 class="security-card-title">Cho phép Đăng ký</h3>
                                        <p class="security-card-desc">Bật tính năng mở cổng cho thành viên mới đăng ký tài khoản tự do.</p>
                                    </div>
                                    <label class="switch-label">
                                        <input type="checkbox" id="setting-allow-registration" class="switch-input">
                                        <span class="switch-slider"></span>
                                        <span>Kích hoạt đăng ký</span>
                                    </label>
                                </div>

                                <!-- Phê duyệt tài khoản -->
                                <div class="security-card">
                                    <div class="security-card-info">
                                        <h3 class="security-card-title">Kiểm duyệt Tài khoản mới</h3>
                                        <p class="security-card-desc">Tài khoản mới đăng ký phải được Quản trị viên duyệt thủ công (Pending).</p>
                                    </div>
                                    <label class="switch-label">
                                        <input type="checkbox" id="setting-require-approval" class="switch-input">
                                        <span class="switch-slider"></span>
                                        <span>Bắt buộc phê duyệt</span>
                                    </label>
                                </div>

                                <!-- Độ dài mật khẩu tối thiểu -->
                                <div class="security-card">
                                    <div class="security-card-info">
                                        <h3 class="security-card-title">Độ dài Mật khẩu Tối thiểu</h3>
                                        <p class="security-card-desc">Áp dụng cho đăng ký tài khoản mới và chức năng đổi mật khẩu cá nhân.</p>
                                    </div>
                                    <select id="setting-min-password-length" class="settings-select">
                                        <option value="6">6 ký tự (Mặc định)</option>
                                        <option value="8">8 ký tự (Khuyến nghị an toàn)</option>
                                        <option value="10">10 ký tự (Bảo mật cao)</option>
                                        <option value="12">12 ký tự (Tiêu chuẩn doanh nghiệp)</option>
                                    </select>
                                </div>

                                <!-- Thời hạn phiên đăng nhập -->
                                <div class="security-card">
                                    <div class="security-card-info">
                                        <h3 class="security-card-title">Thời hạn Phiên (JWT Expiry)</h3>
                                        <p class="security-card-desc">Thời gian hiệu lực của token đăng nhập trước khi người dùng cần đăng nhập lại.</p>
                                    </div>
                                    <select id="setting-session-days" class="settings-select">
                                        <option value="1">1 ngày (Mặc định)</option>
                                        <option value="7">7 ngày (Một tuần)</option>
                                        <option value="30">30 ngày (Một tháng)</option>
                                    </select>
                                </div>
                            </div>

                            <div style="background: rgba(37, 99, 235, 0.05); border: 1px solid rgba(37, 99, 235, 0.2); border-radius: 10px; padding: 14px 18px; display: flex; align-items: center; gap: 12px;">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                                <span style="font-size: 13px; color: var(--color-text-secondary, #475569); line-height: 1.4;">
                                    <strong>Nhật ký Kiểm toán:</strong> Mọi thao tác cập nhật cấu hình bảo mật đều được ghi lại tự động vào bảng <code>audit_logs</code> kèm mã định danh người thực hiện, địa chỉ IP và dấu thời gian chuẩn.
                                </span>
                            </div>
                        </div>

                        <!-- THANH HÀNH ĐỘNG FORM (DIRTY STATE & NÚT LƯU) -->
                        <div class="settings-form-actions">
                            <div class="settings-dirty-indicator" id="settings-dirty-indicator">
                                <span class="settings-dirty-dot"></span>
                                <span>Có thay đổi chưa lưu</span>
                            </div>

                            <div class="settings-btn-group">
                                <button type="button" class="btn-settings-discard" id="btn-settings-discard" disabled>Hủy thay đổi</button>
                                <button type="button" class="btn-settings-save" id="btn-settings-save" disabled>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
                                        <polyline points="17 21 17 13 7 13 7 21"/>
                                        <polyline points="7 3 7 8 15 8"/>
                                    </svg>
                                    <span>Lưu thay đổi</span>
                                </button>
                            </div>
                        </div>
                    </form>
                </section>`;

// Replace #page-settings block in admin.html
const sectionStartRegex = /<section class="admin-page" id="page-settings"[\s\S]*?<\/section>/;
if (sectionStartRegex.test(html)) {
  html = html.replace(sectionStartRegex, newSettingsHtml);
  fs.writeFileSync(adminHtmlPath, html, 'utf8');
  console.log('Successfully patched pages/admin/admin.html with new Settings page!');
} else {
  console.error('Could not find #page-settings block in pages/admin/admin.html');
  process.exit(1);
}
