const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const moderationRoutes = require('./routes/moderationRoutes');
const lmsRoutes = require('./routes/lmsRoutes');
const communityRoutes = require('./routes/communityRoutes');
const resourceRoutes = require('./routes/resourceRoutes');
const favoriteRoutes = require('./routes/favoriteRoutes');
const settingsRoutes = require('./routes/settingsRoutes');
const searchRoutes = require('./routes/searchRoutes');
const { initDatabase } = require('./config/initDb');

const app = express();

// Khởi tạo bảng dữ liệu và seeding nếu cần
initDatabase().catch(err => console.error('Database initialization warning:', err.message));

// Kiểm tra an toàn cho JWT_SECRET khi khởi động hệ thống
if (!process.env.JWT_SECRET || process.env.JWT_SECRET === 'your-secret-key-change-this' || process.env.JWT_SECRET.length < 16) {
  console.warn('⚠️ CẢNH BÁO BẢO MẬT: JWT_SECRET đang sử dụng giá trị mặc định hoặc quá ngắn! Vui lòng cập nhật biến môi trường JWT_SECRET trong backend/.env trước khi triển khai sản xuất.');
}

// Middleware bảo mật & CORS
app.use(cors());
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
});
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// 1. Định tuyến API (Backend)
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/admin', dashboardRoutes);
app.use('/api/admin', moderationRoutes);
app.use('/api/lms', lmsRoutes);
app.use('/api/community', communityRoutes);
app.use('/api/resources', resourceRoutes);
app.use('/api/favorites', favoriteRoutes);
app.use('/api', settingsRoutes);
app.use('/api/search', searchRoutes);

// 2. Lớp chặn bổ sung đặt trước static: trả 404 cho các đường dẫn nhạy cảm
app.use((req, res, next) => {
  let safePath = '';
  try {
    safePath = decodeURI(req.path).replace(/\\/g, '/');
  } catch (e) {
    return res.status(400).send('Bad Request: Invalid URI encoding');
  }

  // Chặn truy cập nhạy cảm: /backend, /tools, /docs, /design, /flowchart testcase, /.git, /node_modules, tệp ngoài whitelist ở gốc...
  const isForbidden =
    safePath.startsWith('/backend') ||
    safePath.startsWith('/tools') ||
    safePath.startsWith('/docs') ||
    safePath.startsWith('/design') ||
    safePath.startsWith('/flowchart testcase') ||
    safePath.startsWith('/node_modules') ||
    safePath.startsWith('/.git') ||
    /(^|\/)\.[^/]+/.test(safePath) ||
    /package(-lock)?\.json$/i.test(safePath) ||
    /README(\.md)?$/i.test(safePath) ||
    /.*_AUDIT\.md$/i.test(safePath) ||
    /\.(bak|log|sql|env|pdn|docx|map|py)$/i.test(safePath);

  if (isForbidden) {
    return res.status(404).send('Not Found');
  }

  next();
});

// 3. Phục vụ tĩnh theo Whitelist nghiêm ngặt (không mount toàn bộ thư mục gốc)
app.get(['/', '/index.html'], (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

const staticOptions = {
  dotfiles: 'deny',
  index: false
};

app.use('/pages', express.static(path.join(__dirname, '../pages'), staticOptions));
app.use('/css', express.static(path.join(__dirname, '../css'), staticOptions));
app.use('/js', express.static(path.join(__dirname, '../js'), staticOptions));
app.use('/assets', express.static(path.join(__dirname, '../assets'), staticOptions));
app.use('/home_page', express.static(path.join(__dirname, '../home_page'), staticOptions));
app.use('/document/Lectures', express.static(path.join(__dirname, '../document/Lectures'), staticOptions));
app.use('/document/Practice', express.static(path.join(__dirname, '../document/Practice'), staticOptions));
app.use('/document/uploads', express.static(path.join(__dirname, '../document/uploads'), staticOptions));

// 4. Xử lý 404 cho bất kỳ route nào không khớp
app.use((req, res) => {
  res.status(404).send('Not Found');
});

// Chạy Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`);
});

