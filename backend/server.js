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
const { initDatabase } = require('./config/initDb');

const app = express();

// Khởi tạo bảng dữ liệu và seeding nếu cần
initDatabase().catch(err => console.error('Database initialization warning:', err.message));

// Middleware
app.use(cors());
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
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

// 2. Siết bảo mật phục vụ file tĩnh: Chặn triệt để các đường dẫn nhạy cảm
app.use((req, res, next) => {
  let safePath = '';
  try {
    safePath = decodeURI(req.path).replace(/\\/g, '/');
  } catch (e) {
    return res.status(400).send('Bad Request: Invalid URI encoding');
  }

  // Chặn truy cập qua URL tới /backend/**, /node_modules/**, file bắt đầu bằng dấu chấm, package.json, README nội bộ, .env...
  const isForbidden =
    safePath.startsWith('/backend') ||
    safePath.startsWith('/node_modules') ||
    /(^|\/)\.[^/]+/.test(safePath) ||
    /package(-lock)?\.json$/i.test(safePath) ||
    /README(\.md)?$/i.test(safePath) ||
    /\.(bak|log|sql|env)$/i.test(safePath);

  if (isForbidden) {
    return res.status(403).send('Forbidden: Access to sensitive path is denied.');
  }

  next();
});

// Phục vụ các file tĩnh hợp lệ từ thư mục gốc (pages, css, js, assets, document/Lectures...)
app.use(express.static(path.join(__dirname, '../'), {
  dotfiles: 'deny'
}));

// Chạy Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`);
});

