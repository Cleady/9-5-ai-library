function renderProfile() {
    const userData = localStorage.getItem('user');
    if (!userData) return;
    
    const user = JSON.parse(userData);
    let displayName = user.full_name;
    if (!displayName) {
        displayName = user.username.split('@')[0];
        displayName = displayName.charAt(0).toUpperCase() + displayName.slice(1);
    }
    const avatarChar = displayName.charAt(0).toUpperCase();
    const displayRole = user.role.charAt(0).toUpperCase() + user.role.slice(1);

    document.querySelectorAll('.user-name').forEach(el => el.textContent = displayName);
    
    document.querySelectorAll('.user-avatar').forEach(el => {
        if (user.avatar_url) {
            el.style.backgroundImage = 'url(' + user.avatar_url + ')';
            el.style.backgroundSize = "cover";
            el.style.backgroundPosition = "center";
            el.textContent = "";
        } else {
            el.style.backgroundImage = "none";
            el.textContent = avatarChar;
        }
    });

    document.querySelectorAll('.role-badge').forEach(el => {
        el.textContent = displayRole;
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        if (user.role === 'owner' || user.role === 'admin') {
            el.classList.add('badge-owner');
            if (!isDark) {
                el.style.backgroundColor = '#dc3545';
                el.style.color = 'white';
            } else {
                el.style.backgroundColor = '';
                el.style.color = '';
            }
        } else if (user.role === 'staff') {
            el.classList.add('badge-staff');
            if (!isDark) {
                el.style.backgroundColor = '#ffc107';
                el.style.color = 'black';
            } else {
                el.style.backgroundColor = '';
                el.style.color = '';
            }
        }
    });

    
    // Thêm nút Manage cho Admin/Owner/Staff
    document.querySelectorAll('.user-menu-list').forEach(menu => {
        let adminItem = menu.querySelector('.menu-admin-item');
        if (['owner', 'admin', 'staff'].includes(user.role) && !window.location.pathname.includes('/admin.html')) {
            if (!adminItem) {
                const li = document.createElement('li');
                li.setAttribute('role', 'none');
                li.className = 'menu-admin-item';
                // Lấy relative path cho link Manage
                const linkHref = '/pages/admin/admin.html'; 
                li.innerHTML = '<a href="' + linkHref + '" role="menuitem" style="color: #0d6efd; font-weight: 600; display: flex; align-items: center;"><img src="/assets/icon/Better_Icon/settings.png" alt="Manage" style="width: 18px; height: 18px; margin-right: 8px; vertical-align: middle;">Manage</a>';
                menu.insertBefore(li, menu.firstChild);
            }
        } else if (adminItem) {
            adminItem.remove();
        }
    });

    // Đảm bảo nút đổi mật khẩu trong user menu luôn có icon password-icon
    document.querySelectorAll('.user-menu-list a[href*="#password"]').forEach(link => {
        if (!link.querySelector('.password-icon')) {
            const icon = document.createElement('span');
            icon.className = 'menu-icon password-icon';
            icon.setAttribute('aria-hidden', 'true');
            link.insertBefore(icon, link.firstChild);
        }
    });

    const welcomeHighlight = document.querySelector('.hero-title .highlight');
    if (welcomeHighlight) welcomeHighlight.textContent = displayName;
}

document.addEventListener('DOMContentLoaded', renderProfile);
window.addEventListener('storage', (e) => {
    if (e.key === 'user') renderProfile();
});

// Xử lý dọn token khi nhấn Đăng xuất trên bất kỳ trang nào
document.addEventListener('click', (e) => {
    const logoutLink = e.target.closest('.user-menu-list a[href*="login.html"], .user-menu-list a[href="#signout"], [data-com-logout], #user-logout-link, #logout-button');
    if (logoutLink) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }
});



// Auto-sync với server để cập nhật Role mới nhất (chạy ngầm)
async function autoSyncUser() {
    const token = localStorage.getItem('token');
    if (!token) return;
    try {
        const res = await fetch('/api/users/me', {
            headers: { 'Authorization': 'Bearer ' + token }
        });
        if (res.ok) {
            const data = await res.json();
            if (data.user) {
                const oldUserStr = localStorage.getItem('user');
                const newUserStr = JSON.stringify(data.user);
                                if (oldUserStr !== newUserStr) {
                    localStorage.setItem('user', newUserStr);
                    renderProfile(); // Cập nhật lại UI ngay lập tức
                }
                
                // --- Kiểm tra nếu bị BAN ---
                if (data.user.status === 'banned') {
                    showBanOverlay();
                }
            }
        }
    } catch (error) {
        console.error("Auto sync failed", error);
    }
}
document.addEventListener('DOMContentLoaded', autoSyncUser);

function showBanOverlay() {
    if (document.getElementById('banned-overlay-container')) return;
    
    // Xóa ngay lập tức khỏi bộ nhớ để họ không bị kẹt ở các trang khác nếu được unban
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    const overlay = document.createElement('div');
    overlay.id = 'banned-overlay-container';
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100vw';
    overlay.style.height = '100vh';
    overlay.style.backgroundColor = 'rgba(236, 242, 250, 0.6)'; // Màu nền sáng dịu
    overlay.style.backdropFilter = 'blur(12px)';
    overlay.style.zIndex = '99999999';
    overlay.style.display = 'flex';
    overlay.style.alignItems = 'center';
    overlay.style.justifyContent = 'center';
    
    const box = document.createElement('div');
    box.style.background = 'rgba(255, 255, 255, 0.7)';
    box.style.backdropFilter = 'blur(20px)';
    box.style.padding = '35px 30px';
    box.style.borderRadius = '20px';
    box.style.textAlign = 'center';
    box.style.width = '90%';
    box.style.maxWidth = '360px';
    box.style.boxShadow = '0 10px 40px rgba(220, 53, 69, 0.15)';
    box.style.border = '1px solid rgba(255, 255, 255, 0.8)';
    
    const icon = document.createElement('div');
    // Dùng hình ảnh lock mượt mà hoặc emoji nhẹ nhàng hơn
    icon.innerHTML = '<div style="width: 56px; height: 56px; background: rgba(220, 53, 69, 0.1); color: #dc3545; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 28px; margin: 0 auto 16px auto;">🚫</div>';
    
    const title = document.createElement('h2');
    title.textContent = 'Account banned';
    title.style.color = '#dc3545';
    title.style.fontFamily = 'Montserrat, sans-serif';
    title.style.fontWeight = '700';
    title.style.marginBottom = '10px';
    title.style.fontSize = '18px';
    
    const desc = document.createElement('p');
    desc.textContent = 'Unfortunately, you have been banned from the system. Please contact an Administrator if this is a mistake.';
    desc.style.color = '#475569';
    desc.style.lineHeight = '1.6';
    desc.style.marginBottom = '24px';
    desc.style.fontSize = '13px';
    
    const btn = document.createElement('button');
    btn.textContent = 'Go to Home';
    btn.style.backgroundColor = '#dc3545';
    btn.style.color = '#fff';
    btn.style.border = 'none';
    btn.style.padding = '10px 24px';
    btn.style.borderRadius = '10px';
    btn.style.cursor = 'pointer';
    btn.style.fontWeight = '600';
    btn.style.fontSize = '14px';
    btn.style.transition = 'all 0.3s ease';
    btn.style.boxShadow = '0 4px 12px rgba(220, 53, 69, 0.2)';
    btn.onmouseover = () => { btn.style.transform = 'translateY(-2px)'; btn.style.boxShadow = '0 6px 16px rgba(220, 53, 69, 0.3)'; };
    btn.onmouseout = () => { btn.style.transform = 'translateY(0)'; btn.style.boxShadow = '0 4px 12px rgba(220, 53, 69, 0.2)'; };
    btn.onclick = () => { window.location.href = '/index.html'; };
    
    box.appendChild(icon);
    box.appendChild(title);
    box.appendChild(desc);
    box.appendChild(btn);
    overlay.appendChild(box);
    document.body.appendChild(overlay);
}

document.addEventListener('DOMContentLoaded', () => {
    try {
        const u = JSON.parse(localStorage.getItem('user'));
        if (u && u.status === 'banned') {
            showBanOverlay();
        }
    } catch(e) {}
});
