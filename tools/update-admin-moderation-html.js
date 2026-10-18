const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../pages/admin/admin.html');
let content = fs.readFileSync(filePath, 'utf8');

const targetStart = '<div class="moderation-tabs">';
const targetEnd = '</article>\r\n                </section>';
const targetEndAlt = '</article>\n                </section>';

const startIdx = content.indexOf(targetStart);
let endIdx = content.indexOf(targetEnd);
let actualEndTag = targetEnd;

if (endIdx === -1) {
  endIdx = content.indexOf(targetEndAlt);
  actualEndTag = targetEndAlt;
}

if (startIdx === -1 || endIdx === -1) {
  console.error('Không tìm thấy đoạn mã target trong admin.html. startIdx:', startIdx, 'endIdx:', endIdx);
  process.exit(1);
}

const replacement = `<!-- Hàng Tabs trạng thái và Bộ lọc loại đối tượng -->
                    <div class="mod-tabs-row">
                        <div class="mod-tabs-group" role="tablist">
                            <button class="mod-tab-btn is-active" type="button" data-mod-status="open" role="tab" aria-selected="true">
                                Chờ xử lý <span id="mod-badge-open" class="mod-tab-count">0</span>
                            </button>
                            <button class="mod-tab-btn" type="button" data-mod-status="actioned" role="tab" aria-selected="false">
                                Đã xử lý (Đã ẩn) <span id="mod-badge-actioned" class="mod-tab-count">0</span>
                            </button>
                            <button class="mod-tab-btn" type="button" data-mod-status="dismissed" role="tab" aria-selected="false">
                                Đã bỏ qua <span id="mod-badge-dismissed" class="mod-tab-count">0</span>
                            </button>
                            <button class="mod-tab-btn" type="button" data-mod-status="" role="tab" aria-selected="false">
                                Tất cả
                            </button>
                        </div>

                        <div class="mod-filter-bar">
                            <select id="mod-type-select" class="mod-select" aria-label="Lọc theo loại nội dung">
                                <option value="">Tất cả loại nội dung</option>
                                <option value="post">Bài viết (Post)</option>
                                <option value="comment">Bình luận (Comment)</option>
                                <option value="discussion">Thảo luận (Discussion)</option>
                                <option value="reply">Câu trả lời (Reply)</option>
                            </select>
                        </div>
                    </div>

                    <!-- Bảng dữ liệu báo cáo vi phạm -->
                    <article class="panel moderation-panel">
                        <div class="panel-heading">
                            <div>
                                <h2>Danh sách báo cáo</h2>
                                <p>Nội dung được thành viên gắn cờ cảnh báo</p>
                            </div>
                        </div>

                        <!-- Trạng thái Đang nạp -->
                        <div id="moderation-loading-state" class="mod-loading-state" style="display: none;">
                            <div class="mod-empty-icon">⏳</div>
                            <p>Đang tải danh sách báo cáo vi phạm...</p>
                        </div>

                        <!-- Trạng thái Trống -->
                        <div id="moderation-empty-state" class="mod-empty-state" style="display: none;">
                            <div class="mod-empty-icon">✨</div>
                            <h3>Không có báo cáo nào trong mục này</h3>
                            <p>Cộng đồng hiện tại đang an toàn và tuân thủ tốt các tiêu chuẩn.</p>
                        </div>

                        <!-- Bảng chính -->
                        <div class="table-scroll" id="moderation-table-wrapper">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Loại &amp; Nội dung</th>
                                        <th>Tác giả</th>
                                        <th>Người báo cáo</th>
                                        <th>Lý do vi phạm</th>
                                        <th>Trạng thái</th>
                                        <th>Thao tác</th>
                                    </tr>
                                </thead>
                                <tbody id="moderation-table-body">
                                    <!-- Render động từ js/admin-moderation.js -->
                                </tbody>
                            </table>
                        </div>

                        <div class="table-footer">
                            <span id="mod-page-info">Trang 1 / 1 (0 báo cáo)</span>
                            <div class="pagination">
                                <button type="button" id="mod-prev-btn" aria-label="Trang trước" disabled>‹</button>
                                <button type="button" id="mod-next-btn" aria-label="Trang sau" disabled>›</button>
                            </div>
                        </div>
                    </article>
                </section>`;

const updatedContent = content.slice(0, startIdx) + replacement + content.slice(endIdx + actualEndTag.length);

// Thêm nhúng js/admin-moderation.js nếu chưa có
let finalContent = updatedContent;
if (!finalContent.includes('js/admin-moderation.js')) {
  finalContent = finalContent.replace(
    '<script src="../../js/admin-dashboard.js"></script>',
    '<script src="../../js/admin-dashboard.js"></script>\r\n    <script src="../../js/admin-moderation.js"></script>'
  );
}

fs.writeFileSync(filePath, finalContent, 'utf8');
console.log('✅ admin.html updated successfully with moderation UI!');
