document.addEventListener('DOMContentLoaded', () => {
    // Tìm form trong trang
    const form = document.querySelector('.auth-form');
    if (!form) return;

    // Tạo sẵn một thẻ <p> để hiển thị thông báo
    const msgBox = document.createElement('p');
    msgBox.id = 'auth-message';
    msgBox.style.fontSize = '0.9em';
    msgBox.style.marginTop = '10px';
    msgBox.style.marginBottom = '10px';
    msgBox.style.textAlign = 'center';
    msgBox.style.fontWeight = '500';
    
    // Chèn nó vào ngay trước nhóm các nút bấm phụ (form-actions)
    const formActions = document.querySelector('.form-actions') || form;
    form.insertBefore(msgBox, formActions);

    // Chặn luồng submit mặc định
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        msgBox.textContent = 'Processing...';
        msgBox.style.color = '#0d6efd'; // Màu xanh dương (Loading)

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Dựa vào việc có ô tên (name) hay không để phân biệt Sign up và Log in
        const isSignup = document.getElementById('name') !== null;

        if (isSignup) {
            // XỬ LÝ ĐĂNG KÝ
            const name = document.getElementById('name').value;
            const confirmPassword = document.getElementById('confirm-password').value;

            // Kiểm tra mật khẩu khớp
            if (password !== confirmPassword) {
                msgBox.textContent = 'Passwords do not match!';
                msgBox.style.color = '#dc3545'; // Màu đỏ lỗi
                return;
            }

            try {
                const res = await fetch('http://localhost:3000/api/auth/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username: email, password: password, name: name })
                });
                const data = await res.json();
                
                if (!res.ok) {
                    msgBox.textContent = data.error || 'Registration failed';
                    msgBox.style.color = '#dc3545';
                } else {
                    msgBox.textContent = data.message; // Báo thành công chờ duyệt
                    msgBox.style.color = '#198754'; // Màu xanh lá
                    form.reset(); // Xóa trắng form
                }
            } catch (err) {
                msgBox.textContent = 'Server connection error.';
                msgBox.style.color = '#dc3545';
            }

        } else {
            // XỬ LÝ ĐĂNG NHẬP
            try {
                const res = await fetch('http://localhost:3000/api/auth/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username: email, password: password })
                });
                const data = await res.json();
                
                if (!res.ok) {
                    msgBox.textContent = data.error || 'Login failed';
                    msgBox.style.color = '#dc3545';
                } else {
                    msgBox.textContent = 'Login successful! Redirecting...';
                    msgBox.style.color = '#198754';
                    
                    // Lưu thẻ thông hành vào localStorage
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('user', JSON.stringify(data.user));
                    
                    // Đợi 1 giây rồi chuyển trang
                    setTimeout(() => {
                        window.location.href = '../../home_page/home_page.html';
                    }, 1000);
                }
            } catch (err) {
                msgBox.textContent = 'Server connection error.';
                msgBox.style.color = '#dc3545';
            }
        }
    });
});
