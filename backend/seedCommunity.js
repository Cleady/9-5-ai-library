const db = require('./config/db');

async function seedCommunity() {
  try {
    console.log('🌱 Đang kiểm tra dữ liệu Community trong Database...');

    // Lấy danh sách users thật trong DB
    const [users] = await db.query('SELECT id, full_name, username, role FROM users WHERE status = "active" LIMIT 5');
    if (users.length === 0) {
      console.log('⚠️ Không tìm thấy người dùng nào trong bảng users để seed.');
      process.exit(0);
    }

    const owner = users.find(u => u.role === 'owner') || users[0];
    const member = users.find(u => u.role === 'member') || users[users.length - 1];

    const [postCount] = await db.query('SELECT COUNT(*) as count FROM community_posts');
    if (postCount[0].count > 0) {
      console.log(`ℹ️ Đã có ${postCount[0].count} bài viết trong bảng community_posts. Bỏ qua seeding.`);
      process.exit(0);
    }

    console.log('🌱 Đang chèn dữ liệu mẫu Community với người dùng thật...');

    // Bài 1: Owner chia sẻ tài liệu
    const [post1] = await db.query(
      `INSERT INTO community_posts (user_id, kind, content, link_url) VALUES (?, ?, ?, ?)`,
      [
        owner.id,
        'post',
        'Chào mừng các bạn đến với cộng đồng 9.5 AI CLUB! Chúng mình vừa cập nhật bài giảng mới về #machine_learning và #data_science. Mọi người có câu hỏi hay thảo luận gì hãy chia sẻ ở đây nhé!',
        'http://localhost:3000/pages/lectures/lectures.html'
      ]
    );

    // Gắn tags cho bài 1
    await db.query(
      `INSERT INTO community_post_tags (post_id, tag) VALUES (?, ?), (?, ?)`,
      [post1.insertId, 'machine_learning', post1.insertId, 'data_science']
    );

    // Bài 2: Member đặt câu hỏi
    const [post2] = await db.query(
      `INSERT INTO community_posts (user_id, kind, content) VALUES (?, ?, ?)`,
      [
        member.id,
        'question',
        'Mình vừa hoàn thành xong bài tập về Linear Regression. Cho mình hỏi có nguồn nào luyện tập thêm về Feature Engineering không ạ? #python #study_tips'
      ]
    );

    await db.query(
      `INSERT INTO community_post_tags (post_id, tag) VALUES (?, ?), (?, ?)`,
      [post2.insertId, 'python', post2.insertId, 'study_tips']
    );

    // Bài 3: Poll bình chọn
    const [post3] = await db.query(
      `INSERT INTO community_posts (user_id, kind, content) VALUES (?, ?, ?)`,
      [
        owner.id,
        'poll',
        'Khảo sát: Bạn muốn câu lạc bộ tổ chức workshop tiếp theo về chủ đề gì? #survey #ai_club'
      ]
    );

    await db.query(
      `INSERT INTO community_post_tags (post_id, tag) VALUES (?, ?), (?, ?)`,
      [post3.insertId, 'survey', post3.insertId, 'ai_club']
    );

    const [opt1] = await db.query(`INSERT INTO community_poll_options (post_id, label) VALUES (?, ?)`, [post3.insertId, 'Deep Learning với PyTorch']);
    const [opt2] = await db.query(`INSERT INTO community_poll_options (post_id, label) VALUES (?, ?)`, [post3.insertId, 'Computer Vision căn bản']);
    const [opt3] = await db.query(`INSERT INTO community_poll_options (post_id, label) VALUES (?, ?)`, [post3.insertId, 'Xây dựng LLM Agents']);

    // Seed 1 vote từ member
    await db.query(
      `INSERT INTO community_poll_votes (option_id, post_id, user_id) VALUES (?, ?, ?)`,
      [opt1.insertId, post3.insertId, member.id]
    );

    // Seed 1 like từ member cho bài 1
    await db.query(`INSERT INTO community_likes (post_id, user_id) VALUES (?, ?)`, [post1.insertId, member.id]);

    // Seed 1 comment từ owner cho bài 2
    await db.query(
      `INSERT INTO community_comments (post_id, user_id, content) VALUES (?, ?, ?)`,
      [post2.insertId, owner.id, 'Bạn có thể xem mục Tài liệu trong bài giảng số 2 hoặc thực hành trên Kaggle nhé!']
    );

    console.log('✅ Seeding dữ liệu Community thành công!');
    process.exit(0);

  } catch (error) {
    console.error('❌ Lỗi seed Community:', error);
    process.exit(1);
  }
}

seedCommunity();
