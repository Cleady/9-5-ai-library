require('dotenv').config();
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');

async function seed() {
    try {
        const pool = mysql.createPool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });

        console.log("Đang mã hóa mật khẩu...");
        const ownerPass = await bcrypt.hash('owner1234', 10);
        const adminPass = await bcrypt.hash('admin1234', 10);

        console.log("Đang chèn dữ liệu vào Database...");
        
        // Dùng INSERT IGNORE để nếu chạy lại file này cũng không bị lỗi trùng lặp (UNIQUE)
        await pool.query(
            'INSERT IGNORE INTO users (username, password_hash, role) VALUES (?, ?, ?)',
            ['owner95aiclub@internal.edu.vn', ownerPass, 'owner']
        );

        await pool.query(
            'INSERT IGNORE INTO users (username, password_hash, role) VALUES (?, ?, ?)',
            ['admin95aidev@internal.edu.vn', adminPass, 'admin']
        );

        console.log("✅ Tạo tài khoản Owner và Admin thành công!");
        process.exit(0);
    } catch (error) {
        console.error("❌ Lỗi:", error);
        process.exit(1);
    }
}

seed();
