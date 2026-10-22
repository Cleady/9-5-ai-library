const db = require('./db');
const fs = require('fs');
const path = require('path');

const STORE_PATH = path.join(__dirname, '../data/lms-store.json');

async function initDatabase() {
  try {
    // 1. Tạo bảng courses
    await db.query(`
      CREATE TABLE IF NOT EXISTS courses (
        id INT AUTO_INCREMENT PRIMARY KEY,
        code VARCHAR(50) NOT NULL UNIQUE,
        name VARCHAR(100) NOT NULL,
        title VARCHAR(255) NOT NULL,
        term VARCHAR(50) DEFAULT 'Kỳ II',
        description TEXT,
        icon VARCHAR(100) DEFAULT 'subject1-icon',
        gradient_from VARCHAR(50) DEFAULT '#38bdf8',
        gradient_to VARCHAR(50) DEFAULT '#0284c7',
        status VARCHAR(20) DEFAULT 'active',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // 2. Tạo bảng lectures
    await db.query(`
      CREATE TABLE IF NOT EXISTS lectures (
        id INT AUTO_INCREMENT PRIMARY KEY,
        course_id INT NOT NULL,
        chapter_order INT DEFAULT 1,
        title VARCHAR(255) NOT NULL,
        type VARCHAR(50) DEFAULT 'video',
        duration_min INT DEFAULT 18,
        video_url TEXT,
        description TEXT,
        key_takeaways JSON,
        overview_html LONGTEXT,
        video_source VARCHAR(20) NOT NULL DEFAULT 'file',
        youtube_id VARCHAR(16) NULL,
        thumbnail_url VARCHAR(500) NULL,
        status VARCHAR(20) DEFAULT 'in-progress',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX (course_id),
        CONSTRAINT fk_lecture_course FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // 3. Bảng lecture_resources
    await db.query(`
      CREATE TABLE IF NOT EXISTS lecture_resources (
        id INT AUTO_INCREMENT PRIMARY KEY,
        lecture_id INT NOT NULL,
        title VARCHAR(255) NOT NULL,
        type VARCHAR(50) DEFAULT 'pdf',
        size VARCHAR(50) DEFAULT '1.0 MB',
        url TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX (lecture_id),
        CONSTRAINT fk_resource_lecture FOREIGN KEY (lecture_id) REFERENCES lectures(id) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // 4. Bảng lecture_comments
    await db.query(`
      CREATE TABLE IF NOT EXISTS lecture_comments (
        id INT AUTO_INCREMENT PRIMARY KEY,
        lecture_id INT NOT NULL,
        user_id INT DEFAULT NULL,
        user_name VARCHAR(100) NOT NULL,
        user_role VARCHAR(50) DEFAULT 'member',
        user_avatar VARCHAR(255) DEFAULT 'A',
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX (lecture_id),
        CONSTRAINT fk_comment_lecture FOREIGN KEY (lecture_id) REFERENCES lectures(id) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // === CÁC BẢNG DÀNH CHO PHÂN HỆ COMMUNITY ===
    // 5. Bảng community_posts
    await db.query(`
      CREATE TABLE IF NOT EXISTS community_posts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        kind ENUM('post', 'photo', 'link', 'question', 'poll') DEFAULT 'post',
        content TEXT NOT NULL,
        media_url TEXT NULL,
        link_url TEXT NULL,
        is_pinned TINYINT(1) NOT NULL DEFAULT 0,
        pinned_at TIMESTAMP NULL DEFAULT NULL,
        pinned_by INT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_com_post_user (user_id),
        INDEX idx_com_post_created (created_at),
        INDEX idx_com_posts_pinned (is_pinned, pinned_at),
        CONSTRAINT fk_com_posts_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        CONSTRAINT fk_com_posts_pinned_by FOREIGN KEY (pinned_by) REFERENCES users(id) ON DELETE SET NULL
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // 6. Bảng community_post_tags (dùng cho hashtag và trending, tag lưu lowercase, không có #)
    await db.query(`
      CREATE TABLE IF NOT EXISTS community_post_tags (
        post_id INT NOT NULL,
        tag VARCHAR(50) NOT NULL,
        PRIMARY KEY (post_id, tag),
        INDEX idx_com_tags_tag (tag),
        CONSTRAINT fk_com_post_tags_post FOREIGN KEY (post_id) REFERENCES community_posts(id) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // 7. Bảng community_comments
    await db.query(`
      CREATE TABLE IF NOT EXISTS community_comments (
        id INT AUTO_INCREMENT PRIMARY KEY,
        post_id INT NOT NULL,
        user_id INT NOT NULL,
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_com_comments_post (post_id),
        INDEX idx_com_comments_user (user_id),
        CONSTRAINT fk_com_comments_post FOREIGN KEY (post_id) REFERENCES community_posts(id) ON DELETE CASCADE,
        CONSTRAINT fk_com_comments_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // 8. Bảng community_likes (khóa chính tổ hợp post_id, user_id)
    await db.query(`
      CREATE TABLE IF NOT EXISTS community_likes (
        post_id INT NOT NULL,
        user_id INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (post_id, user_id),
        INDEX idx_com_likes_user (user_id),
        CONSTRAINT fk_com_likes_post FOREIGN KEY (post_id) REFERENCES community_posts(id) ON DELETE CASCADE,
        CONSTRAINT fk_com_likes_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // 9. Bảng community_poll_options
    await db.query(`
      CREATE TABLE IF NOT EXISTS community_poll_options (
        id INT AUTO_INCREMENT PRIMARY KEY,
        post_id INT NOT NULL,
        label VARCHAR(255) NOT NULL,
        INDEX idx_com_poll_opt_post (post_id),
        CONSTRAINT fk_com_poll_opt_post FOREIGN KEY (post_id) REFERENCES community_posts(id) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // 10. Bảng community_poll_votes (mỗi user 1 phiếu/poll)
    await db.query(`
      CREATE TABLE IF NOT EXISTS community_poll_votes (
        id INT AUTO_INCREMENT PRIMARY KEY,
        option_id INT NOT NULL,
        post_id INT NOT NULL,
        user_id INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE KEY uq_com_poll_user (post_id, user_id),
        INDEX idx_com_poll_vote_opt (option_id),
        INDEX idx_com_poll_vote_user (user_id),
        CONSTRAINT fk_com_poll_votes_option FOREIGN KEY (option_id) REFERENCES community_poll_options(id) ON DELETE CASCADE,
        CONSTRAINT fk_com_poll_votes_post FOREIGN KEY (post_id) REFERENCES community_posts(id) ON DELETE CASCADE,
        CONSTRAINT fk_com_poll_votes_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // 11. Bảng community_discussions
    await db.query(`
      CREATE TABLE IF NOT EXISTS community_discussions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        title VARCHAR(255) NOT NULL,
        body TEXT NOT NULL,
        tag VARCHAR(50) DEFAULT 'general',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_com_disc_user (user_id),
        INDEX idx_com_disc_tag (tag),
        INDEX idx_com_disc_created (created_at),
        CONSTRAINT fk_com_disc_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // 12. Bảng community_discussion_replies
    await db.query(`
      CREATE TABLE IF NOT EXISTS community_discussion_replies (
        id INT AUTO_INCREMENT PRIMARY KEY,
        discussion_id INT NOT NULL,
        user_id INT NOT NULL,
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_com_disc_reply_disc (discussion_id),
        INDEX idx_com_disc_reply_user (user_id),
        CONSTRAINT fk_com_disc_replies_disc FOREIGN KEY (discussion_id) REFERENCES community_discussions(id) ON DELETE CASCADE,
        CONSTRAINT fk_com_disc_replies_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // 13. Bảng community_groups
    await db.query(`
      CREATE TABLE IF NOT EXISTS community_groups (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        description TEXT NULL,
        created_by INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_com_groups_creator (created_by),
        CONSTRAINT fk_com_groups_creator FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // 14. Bảng community_group_members
    await db.query(`
      CREATE TABLE IF NOT EXISTS community_group_members (
        group_id INT NOT NULL,
        user_id INT NOT NULL,
        joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (group_id, user_id),
        INDEX idx_com_members_user (user_id),
        CONSTRAINT fk_com_group_members_group FOREIGN KEY (group_id) REFERENCES community_groups(id) ON DELETE CASCADE,
        CONSTRAINT fk_com_group_members_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // 15. Bảng community_notifications
    await db.query(`
      CREATE TABLE IF NOT EXISTS community_notifications (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        actor_id INT NOT NULL,
        type ENUM('like', 'comment', 'reply', 'mention', 'group', 'post') NOT NULL,
        post_id INT NULL,
        is_read TINYINT(1) DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_com_notif_user_read (user_id, is_read),
        INDEX idx_com_notif_user_created (user_id, created_at),
        INDEX idx_com_notif_actor (actor_id),
        INDEX idx_com_notif_post (post_id),
        CONSTRAINT fk_com_notif_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        CONSTRAINT fk_com_notif_actor FOREIGN KEY (actor_id) REFERENCES users(id) ON DELETE CASCADE,
        CONSTRAINT fk_com_notif_post FOREIGN KEY (post_id) REFERENCES community_posts(id) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // === CÁC BẢNG DÀNH CHO PHÂN HỆ RESOURCES (KHO TÀI LIỆU HỌC TẬP) ===
    // 16. Bảng resources
    await db.query(`
      CREATE TABLE IF NOT EXISTS resources (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NULL,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        type ENUM('document', 'code', 'template', 'dataset') NOT NULL,
        extension VARCHAR(10) NOT NULL,
        original_name VARCHAR(255) NOT NULL,
        stored_name VARCHAR(255) NOT NULL UNIQUE,
        file_size_bytes BIGINT NOT NULL,
        mime_type VARCHAR(100),
        subject VARCHAR(100),
        downloads INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_resources_type (type),
        INDEX idx_resources_subject (subject),
        INDEX idx_resources_created (created_at),
        CONSTRAINT fk_resources_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // 17. Bảng resource_favorites (khóa chính tổ hợp resource_id, user_id)
    await db.query(`
      CREATE TABLE IF NOT EXISTS resource_favorites (
        resource_id INT NOT NULL,
        user_id INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (resource_id, user_id),
        INDEX idx_res_fav_user (user_id),
        CONSTRAINT fk_res_fav_resource FOREIGN KEY (resource_id) REFERENCES resources(id) ON DELETE CASCADE,
        CONSTRAINT fk_res_fav_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // 18. Bảng user_favorites (lưu trữ yêu thích môn học Lectures và môn thực hành Practice)
    await db.query(`
      CREATE TABLE IF NOT EXISTS user_favorites (
        user_id INT NOT NULL,
        item_type ENUM('lecture_course', 'practice_subject') NOT NULL,
        item_id INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (user_id, item_type, item_id),
        INDEX idx_user_fav_lookup (user_id, item_type),
        CONSTRAINT fk_user_fav_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // Khởi tạo thư mục lưu trữ file thật của Resources nếu chưa có
    const resourceStorageDir = path.join(__dirname, '../storage/resources');
    if (!fs.existsSync(resourceStorageDir)) {
      fs.mkdirSync(resourceStorageDir, { recursive: true });
    }

    // 18. Kiểm tra nếu chưa có môn nào thì Seed CEA201
    const [courses] = await db.query('SELECT COUNT(*) as count FROM courses');
    if (courses[0].count === 0) {
      console.log('🌱 Seeding initial CEA201 course into Database...');
      const [courseRes] = await db.query(`
        INSERT INTO courses (code, name, title, term, description, icon, gradient_from, gradient_to, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `, [
        'CEA201',
        'CEA201',
        'Computer Organization and Architecture',
        'Kỳ II',
        'Kiến trúc máy tính & Tổ chức hệ thống số (Computer Organization and Architecture)',
        'subject1-icon',
        '#38bdf8',
        '#0284c7',
        'active'
      ]);

      const courseId = courseRes.insertId;

      // Đọc overviewHtml từ lectures-data.js hoặc dựng template chuẩn
      const defaultOverviewHtml = `
<div class="lec-feynman-container">
  <div class="lec-feynman-banner">
    <div class="lec-feynman-tag"><span class="lec-tag-icon">⚡</span> PHƯƠNG PHÁP FEYNMAN · KIẾN THỨC CỐT LÕI</div>
    <h2 class="lec-feynman-headline">BÀI GIẢNG: HỆ THỐNG SỐ (NUMBER SYSTEMS)</h2>
    <p class="lec-feynman-desc">Hệ thống hóa toàn diện bản chất biểu diễn dữ liệu trong kiến trúc máy tính: Hiểu rõ cơ số, trọng số vị trí và thành thạo các thuật toán chuyển đổi giữa hệ Nhị phân, Thập phân và Thập lục phân.</p>
  </div>

  <!-- PHẦN 1 -->
  <section class="lec-section-card">
    <div class="lec-section-header">
      <span class="lec-section-num">1</span>
      <div>
        <h3 class="lec-section-title">Hệ thống số theo vị trí (Positional Number Systems)</h3>
        <p class="lec-section-subtitle">Nguyên lý nền tảng của mọi hệ thống đếm số trong toán học và tin học</p>
      </div>
    </div>
    <div class="lec-card-body">
      <div class="lec-concept-box">
        <h4>💡 Khái niệm cơ bản</h4>
        <p>Mỗi số được biểu diễn bằng một chuỗi chữ số. Giá trị thực tế của từng chữ số ở vị trí $i$ phụ thuộc vào một <strong>trọng số</strong> tương ứng là $r^i$, trong đó $r$ được gọi là <strong>cơ số</strong> (<em>radix</em> hoặc <em>base</em>).</p>
      </div>
      <div class="lec-formula-card">
        <span class="lec-formula-label">Biểu thức tổng quát:</span>
        <div class="lec-math-display">
          $$\\left(\\dots a_3 a_2 a_1 a_0 \\,.\\, a_{-1} a_{-2} a_{-3} \\dots\\right)_r = \\sum_{i=-\\infty}^{+\\infty} a_i \\times r^i$$
        </div>
        <p class="lec-formula-note">Với điều kiện: $0 \\le a_i < r$. Dấu chấm phân tách phần nguyên và phần lẻ được gọi là <strong>dấu cơ số</strong> (<em>radix point</em>).</p>
      </div>
    </div>
  </section>

  <!-- PHẦN 2 -->
  <section class="lec-section-card">
    <div class="lec-section-header">
      <span class="lec-section-num">2</span>
      <div>
        <h3 class="lec-section-title">Hệ Thập phân (Decimal) & Hệ Nhị phân (Binary)</h3>
        <p class="lec-section-subtitle">So sánh cơ số 10 trong đời sống và cơ số 2 trong máy tính điện tử</p>
      </div>
    </div>
    <div class="lec-card-body">
      <div class="lec-concept-box">
        <h4>💡 Hệ Thập phân (Decimal System — Cơ số 10)</h4>
        <p>Sử dụng 10 chữ số: <code>0, 1, 2, 3, 4, 5, 6, 7, 8, 9</code>. Mỗi vị trí được nhân với $10^i$.</p>
      </div>
      <div class="lec-concept-box">
        <h4>💡 Hệ Nhị phân (Binary System — Cơ số 2)</h4>
        <p>Là hệ đếm nền tảng trong máy tính, chỉ sử dụng 2 chữ số (bit): <code>0</code> và <code>1</code>. Các vị trí mang trọng số là lũy thừa của 2.</p>
      </div>
    </div>
  </section>

  <!-- PHẦN 3 -->
  <section class="lec-section-card">
    <div class="lec-section-header">
      <span class="lec-section-num">3</span>
      <div>
        <h3 class="lec-section-title">Quy tắc Chuyển đổi Cơ số (Conversion Rules)</h3>
        <p class="lec-section-subtitle">Thuật toán chuyển đổi hai chiều giữa Decimal và Binary</p>
      </div>
    </div>
    <div class="lec-card-body">
      <div class="lec-algorithm-grid">
        <div class="lec-algo-card">
          <h4>Phần nguyên (Integer) — Phép chia lặp cho 2</h4>
          <ol>
            <li>Lấy số thập phân $N$ chia cho 2, ghi nhận thương số và số dư $R_0 \\in \\{0, 1\\}$.</li>
            <li>Tiếp tục lấy thương số chia cho 2 để tìm số dư tiếp theo $R_1$.</li>
            <li>Lặp lại cho đến khi thương số bằng 0.</li>
            <li><strong>Đọc kết quả:</strong> Xếp các số dư theo chiều <strong>từ dưới lên trên</strong> (từ LSD đến MSD).</li>
          </ol>
        </div>
        <div class="lec-algo-card">
          <h4>Phần lẻ (Fraction) — Phép nhân lặp với 2</h4>
          <ol>
            <li>Lấy phần lẻ $F$ nhân với 2. Phần nguyên của tích (0 hoặc 1) là chữ số nhị phân sau dấu chấm.</li>
            <li>Giữ lại phần lẻ của tích và tiếp tục nhân với 2.</li>
            <li>Lặp lại cho đến khi phần lẻ bằng 0 hoặc đạt độ chính xác yêu cầu.</li>
            <li><strong>Đọc kết quả:</strong> Ghi nhận các bit thu được <strong>từ trên xuống dưới</strong>.</li>
          </ol>
        </div>
      </div>
    </div>
  </section>

  <!-- PHẦN 4 -->
  <section class="lec-section-card">
    <div class="lec-section-header">
      <span class="lec-section-num">4</span>
      <div>
        <h3 class="lec-section-title">Hệ Thập lục phân (Hexadecimal Notation — Cơ số 16)</h3>
        <p class="lec-section-subtitle">Công cụ tối ưu hóa giúp biểu diễn chuỗi nhị phân ngắn gọn, trực quan</p>
      </div>
    </div>
    <div class="lec-card-body">
      <div class="lec-concept-box">
        <h4>🎯 Mục đích ra đời</h4>
        <p>Gom ngắn các chuỗi bit nhị phân dài giúp con người và lập trình viên dễ đọc, dễ viết và kiểm soát bộ nhớ.</p>
        <p>Quy tắc gom nhóm 4-bit (Nibble): Mỗi nhóm 4 bit nhị phân tương ứng với 1 ký tự Hex (0-9, A-F).</p>
      </div>
    </div>
  </section>
</div>
      `;

      const takeaways = JSON.stringify([
        'Hệ thống số theo vị trí (Positional Number Systems): Cơ số r, trọng số rⁱ, chữ số 0 ≤ aᵢ < r và dấu cơ số.',
        'Hệ Thập phân (Cơ số 10) & Hệ Nhị phân (Cơ số 2): Nền tảng biểu diễn nhị phân trong phần cứng máy tính.',
        'Quy tắc chuyển đổi cơ số: Phép chia lặp cho 2 (phần nguyên - đọc từ dưới lên) & phép nhân lặp cho 2 (phần lẻ - đọc từ trên xuống).',
        'Hệ Thập lục phân (Hexadecimal - Cơ số 16): Quy tắc gom nhóm 4-bit (Nibble) và bảng quy đổi giá trị chuẩn.'
      ]);

      const [lecRes] = await db.query(`
        INSERT INTO lectures (course_id, chapter_order, title, type, duration_min, video_url, description, key_takeaways, overview_html, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `, [
        courseId,
        1,
        'Computer Organization and Architecture: Number Systems',
        'video',
        18,
        '/document/Lectures/Ky_II/CEA201/test/Giải_mã_Hệ_thống_Số.mp4',
        'Hệ thống hóa toàn bộ kiến thức cốt lõi về Hệ thống số (Number Systems) theo phương pháp Feynman: Hệ đếm theo vị trí, Hệ thập phân, Hệ nhị phân, Quy tắc chuyển đổi cơ số và Hệ thập lục phân trong kiến trúc máy tính.',
        takeaways,
        defaultOverviewHtml,
        'in-progress'
      ]);

      const lectureId = lecRes.insertId;

      // Resources
      await db.query(`
        INSERT INTO lecture_resources (lecture_id, title, type, size, url)
        VALUES (?, ?, ?, ?, ?), (?, ?, ?, ?, ?)
      `, [
        lectureId, 'Video Bài giảng: Giải mã Hệ thống Số', 'mp4', '35.7 MB', '/document/Lectures/Ky_II/CEA201/test/Giải_mã_Hệ_thống_Số.mp4',
        lectureId, 'Tài liệu tóm tắt: Hệ thống số & Quy tắc chuyển đổi (CEA201)', 'pdf', '1.2 MB', '#'
      ]);

      // Seed 1 comment mẫu
      await db.query(`
        INSERT INTO lecture_comments (lecture_id, user_name, user_role, user_avatar, content)
        VALUES (?, ?, ?, ?, ?)
      `, [
        lectureId, 'Giảng viên CEA201', 'owner', 'GV', 'Chào mừng các bạn đến với chương Hệ thống số (Number Systems). Nếu có câu hỏi về chuyển đổi cơ số hoặc biểu diễn Hex, các bạn hãy để lại bình luận ở đây nhé!'
      ]);

      console.log('✅ Seeding completed successfully!');
    }

    // 4. Tạo bảng user_activity_daily (Đo lường người dùng hoạt động theo ngày)
    await db.query(`
      CREATE TABLE IF NOT EXISTS user_activity_daily (
        user_id INT NOT NULL,
        activity_date DATE NOT NULL,
        first_seen_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        last_seen_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        hits INT DEFAULT 1,
        PRIMARY KEY (user_id, activity_date),
        CONSTRAINT fk_user_act_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // 5. Kiểm tra và bổ sung cột last_login_at vào bảng users (nếu chưa có)
    const [userCols] = await db.query(`
      SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS
      WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'users' AND COLUMN_NAME = 'last_login_at'
    `);
    if (userCols.length === 0) {
      await db.query('ALTER TABLE users ADD COLUMN last_login_at TIMESTAMP NULL DEFAULT NULL');
      console.log('✅ Added column users.last_login_at');
    }

    // 6. Bảng community_reports (Báo cáo vi phạm nội dung cộng đồng)
    await db.query(`
      CREATE TABLE IF NOT EXISTS community_reports (
        id INT AUTO_INCREMENT PRIMARY KEY,
        reporter_id INT NOT NULL,
        target_type ENUM('post','comment','discussion','reply') NOT NULL,
        target_id INT NOT NULL,
        reason ENUM('spam','harassment','inappropriate','misinformation','other') NOT NULL,
        note VARCHAR(500) NULL,
        status ENUM('open','dismissed','actioned') DEFAULT 'open',
        handled_by INT NULL,
        handled_at TIMESTAMP NULL DEFAULT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE KEY uq_reporter_target (reporter_id, target_type, target_id),
        INDEX idx_rep_status (status),
        INDEX idx_rep_created_at (created_at),
        CONSTRAINT fk_rep_reporter FOREIGN KEY (reporter_id) REFERENCES users(id) ON DELETE CASCADE,
        CONSTRAINT fk_rep_handler FOREIGN KEY (handled_by) REFERENCES users(id) ON DELETE SET NULL
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // 7. Bổ sung các cột is_hidden, hidden_by, hidden_at vào posts, comments, discussions, replies
    const tablesToHide = ['community_posts', 'community_comments', 'community_discussions', 'community_discussion_replies'];
    for (const tbl of tablesToHide) {
      const [cols] = await db.query(`
        SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS
        WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = ? AND COLUMN_NAME = 'is_hidden'
      `, [tbl]);
      if (cols.length === 0) {
        await db.query(`ALTER TABLE ${tbl} ADD COLUMN is_hidden TINYINT(1) DEFAULT 0, ADD COLUMN hidden_by INT NULL, ADD COLUMN hidden_at TIMESTAMP NULL`);
        console.log(`✅ Added is_hidden columns to ${tbl}`);
      }
    }

    // 7.1. Bổ sung các cột video_source, youtube_id, thumbnail_url vào bảng lectures (nếu chưa có)
    const lectureColsToAdd = [
      { name: 'video_source', sql: "ALTER TABLE lectures ADD COLUMN video_source VARCHAR(20) NOT NULL DEFAULT 'file'" },
      { name: 'youtube_id', sql: "ALTER TABLE lectures ADD COLUMN youtube_id VARCHAR(16) NULL" },
      { name: 'thumbnail_url', sql: "ALTER TABLE lectures ADD COLUMN thumbnail_url VARCHAR(500) NULL" }
    ];
    for (const col of lectureColsToAdd) {
      const [cols] = await db.query(`
        SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS
        WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'lectures' AND COLUMN_NAME = ?
      `, [col.name]);
      if (cols.length === 0) {
        await db.query(col.sql);
        console.log(`✅ Added column lectures.${col.name}`);
      }
    }

    // 8. Bảng audit_logs (Nhật ký hành động quản trị hệ thống)
    await db.query(`
      CREATE TABLE IF NOT EXISTS audit_logs (
        id INT AUTO_INCREMENT PRIMARY KEY,
        actor_id INT NOT NULL,
        action VARCHAR(64) NOT NULL,
        target_type VARCHAR(64) NOT NULL,
        target_id INT NULL,
        details JSON NULL,
        ip_address VARCHAR(45) NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_audit_actor (actor_id),
        INDEX idx_audit_action (action),
        INDEX idx_audit_created_at (created_at),
        CONSTRAINT fk_audit_actor FOREIGN KEY (actor_id) REFERENCES users(id) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // 9. Bảng site_settings (Cấu hình toàn hệ thống)
    await db.query(`
      CREATE TABLE IF NOT EXISTS site_settings (
        setting_key VARCHAR(100) PRIMARY KEY,
        setting_value TEXT NOT NULL,
        updated_by INT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        CONSTRAINT fk_settings_updated_by FOREIGN KEY (updated_by) REFERENCES users(id) ON DELETE SET NULL
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // Seed cài đặt mặc định nếu chưa có
    const defaultSettings = [
      ['website_name', '9.5 AI CLUB'],
      ['short_description', 'AI Learning Platform & Community for Students'],
      ['logo_url', '/assets/icon/cool_book_128.png'],
      ['favicon_url', '/assets/icon/favicon-32.png'],
      ['social_links', JSON.stringify({ facebook: '', discord: '', youtube: '', x: '', github: '' })],
      ['default_theme', 'system'],
      ['default_accent', 'blue'],
      ['allow_registration', 'true'],
      ['require_approval', 'true'],
      ['min_password_length', '6'],
      ['session_days', '1']
    ];

    for (const [key, val] of defaultSettings) {
      await db.query(
        'INSERT IGNORE INTO site_settings (setting_key, setting_value) VALUES (?, ?)',
        [key, val]
      );
    }

    // === NÂNG CẤP HỆ THỐNG THÔNG BÁO & GHIM BÀI (NOTIFICATION & PIN SYSTEM) ===
    // 1. Kiểm tra và bổ sung các cột is_pinned, pinned_at, pinned_by vào bảng community_posts
    const [checkPostPinned] = await db.query(`
      SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS
      WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'community_posts' AND COLUMN_NAME = 'is_pinned'
    `);
    if (checkPostPinned.length === 0) {
      await db.query(`
        ALTER TABLE community_posts
        ADD COLUMN is_pinned TINYINT(1) NOT NULL DEFAULT 0,
        ADD COLUMN pinned_at TIMESTAMP NULL DEFAULT NULL,
        ADD COLUMN pinned_by INT NULL
      `);
      console.log('✅ Added columns is_pinned, pinned_at, pinned_by to community_posts');
    }

    // Kiểm tra và bổ sung FK fk_com_posts_pinned_by
    const [checkPostPinnedFk] = await db.query(`
      SELECT CONSTRAINT_NAME FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS
      WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'community_posts' AND CONSTRAINT_NAME = 'fk_com_posts_pinned_by'
    `);
    if (checkPostPinnedFk.length === 0) {
      try {
        await db.query(`
          ALTER TABLE community_posts
          ADD CONSTRAINT fk_com_posts_pinned_by FOREIGN KEY (pinned_by) REFERENCES users(id) ON DELETE SET NULL
        `);
        console.log('✅ Added foreign key fk_com_posts_pinned_by');
      } catch (e) {
        console.warn('Notice fk_com_posts_pinned_by:', e.message);
      }
    }

    // Kiểm tra và bổ sung index (is_pinned, pinned_at) cho community_posts
    const [checkPostPinnedIdx] = await db.query(`
      SELECT INDEX_NAME FROM INFORMATION_SCHEMA.STATISTICS
      WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'community_posts' AND INDEX_NAME = 'idx_com_posts_pinned'
    `);
    if (checkPostPinnedIdx.length === 0) {
      await db.query(`
        ALTER TABLE community_posts
        ADD INDEX idx_com_posts_pinned (is_pinned, pinned_at)
      `);
      console.log('✅ Added index idx_com_posts_pinned to community_posts');
    }

    // 2. Mở rộng ENUM type của bảng community_notifications thêm giá trị 'post'
    const [notifTypeCol] = await db.query(`
      SELECT COLUMN_TYPE FROM INFORMATION_SCHEMA.COLUMNS
      WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'community_notifications' AND COLUMN_NAME = 'type'
    `);
    if (notifTypeCol.length > 0 && !notifTypeCol[0].COLUMN_TYPE.includes("'post'")) {
      await db.query(`
        ALTER TABLE community_notifications
        MODIFY COLUMN type ENUM('like', 'comment', 'reply', 'mention', 'group', 'post') NOT NULL
      `);
      console.log("✅ Expanded community_notifications.type ENUM to include 'post'");
    }

    // 3. Kiểm tra và bổ sung index (user_id, created_at) cho community_notifications
    const [checkNotifIdx] = await db.query(`
      SELECT INDEX_NAME FROM INFORMATION_SCHEMA.STATISTICS
      WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'community_notifications' AND INDEX_NAME = 'idx_com_notif_user_created'
    `);
    if (checkNotifIdx.length === 0) {
      await db.query(`
        ALTER TABLE community_notifications
        ADD INDEX idx_com_notif_user_created (user_id, created_at)
      `);
      console.log('✅ Added index idx_com_notif_user_created to community_notifications');
    }

    console.log('🎉 Database tables initialized and ready.');
  } catch (err) {
    console.error('⚠️ Database init error (will fallback to JSON if needed):', err.message);
  }
}

module.exports = { initDatabase };
