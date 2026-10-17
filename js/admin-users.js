
document.addEventListener("DOMContentLoaded", () => {
    // Inject Custom CSS cho Dropdown
    if (!document.getElementById("custom-dropdown-styles")) {
        const style = document.createElement("style");
        style.id = "custom-dropdown-styles";
        style.innerHTML = `
            .custom-select-wrapper {
                position: relative;
                width: 120px;
                text-align: left;
                user-select: none;
            }
            .custom-select-trigger {
                font-size: 12px;
                padding: 6px 12px;
                border-radius: 8px;
                border: 1.5px solid rgba(13, 110, 253, 0.2);
                background: rgba(13, 110, 253, 0.05);
                backdrop-filter: blur(10px);
                color: #0d6efd;
                font-weight: 700;
                cursor: pointer;
                display: flex;
                justify-content: space-between;
                align-items: center;
                transition: all 0.2s ease;
            }
            
            .custom-select-trigger:hover {
                background: rgba(13, 110, 253, 0.1);
                border-color: rgba(13, 110, 253, 0.4);
            }
            .custom-select-options {
                display: none;
                position: absolute;
                top: 110%;
                left: 0;
                right: 0;
                background: rgba(255, 255, 255, 0.95);
                backdrop-filter: blur(16px);
                -webkit-backdrop-filter: blur(16px);
                border-radius: 12px;
                box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
                border: 1px solid rgba(0, 0, 0, 0.08);
                z-index: 100;
                overflow: hidden;
                padding: 6px;
                animation: dropdownFadeIn 0.2s ease;
            }
            @keyframes dropdownFadeIn {
                from { opacity: 0; transform: translateY(-5px); }
                to { opacity: 1; transform: translateY(0); }
            }
            .custom-option {
                font-size: 12px;
                padding: 8px 12px;
                border-radius: 8px;
                cursor: pointer;
                font-weight: 600;
                color: #475569;
                transition: background 0.2s, color 0.2s;
            }
            .custom-option:hover {
                background: #f1f5f9;
                color: #0d6efd;
            }
            .custom-option.selected {
                background: rgba(13, 110, 253, 0.1);
                color: #0d6efd;
            }
            
            /* Custom Global Filter Dropdown (All roles) */
            .cg-trigger:hover {
                background: rgba(255, 255, 255, 0.9) !important;
                border-color: #b5c9e3 !important;
            }
            .cg-opt:hover {
                background: #f1f5f9 !important;
                color: #0d6efd !important;
            }
        `;
        document.head.appendChild(style);
    }

    const tbody = document.getElementById("admin-users-tbody");
    if (!tbody) return;

    let currentUser = null;
    let allUsersData = [];
    let currentGlobalFilter = 'all';

    try {
        currentUser = JSON.parse(localStorage.getItem('user'));
    } catch(e) {}

    async function loadUsers() {
        const token = localStorage.getItem("token");
        if (!token) {
            tbody.innerHTML = "<tr><td colspan='6' style='text-align:center;color:red;'>Error: Token not found! Please log in again.</td></tr>";
            return;
        }

        try {
            tbody.innerHTML = "<tr><td colspan='6' style='text-align:center;'>Loading data...</td></tr>";
            
            const res = await fetch("/api/admin/users", {
                headers: { "Authorization": "Bearer " + token }
            });
            
            const text = await res.text();
            let data;
            try {
                data = JSON.parse(text);
            } catch(e) {
                tbody.innerHTML = "<tr><td colspan='6' style='text-align:left;color:red; font-size:0.9em; padding:10px;'>Error: Server did not return JSON!</td></tr>";
                return;
            }
            
            if (res.ok) {
                allUsersData = data.users;
                applyFilters();
            } else {
                tbody.innerHTML = "<tr><td colspan='6' style='text-align:center;color:red;'>API Error: " + (data.error || res.statusText) + "</td></tr>";
            }
        } catch (e) {
            tbody.innerHTML = "<tr><td colspan='6' style='text-align:center;color:red;'>Server connection error: " + e.message + "</td></tr>";
        }
    }

    function applyFilters() {
        let filtered = allUsersData;
        if (currentGlobalFilter !== "all") {
            filtered = allUsersData.filter(u => (u.role || 'member') === currentGlobalFilter);
        }
        renderUsers(filtered);
    }

    function renderUsers(users) {
        try {
            tbody.innerHTML = "";
            
            const countSpan = document.querySelector('.users-panel .table-footer span');
            if (countSpan) {
                countSpan.textContent = 'Displaying ' + (users ? users.length : 0) + ' members';
            }
            const pagination = document.querySelector('.users-panel .table-footer .pagination');
            if (pagination) {
                pagination.style.display = (users && users.length > 8) ? 'flex' : 'none';
            }

            if (!users || users.length === 0) {
                tbody.innerHTML = "<tr><td colspan='6' style='text-align:center;'>No matching users found.</td></tr>";
                return;
            }

            const canChangeRoleGlobal = currentUser && (currentUser.role === 'admin' || currentUser.role === 'owner');

            users.forEach((u, index) => {
                const tr = document.createElement("tr");
                let name = u.full_name || (u.username ? u.username.split('@')[0] : "Unknown");
                let initials = name.charAt(0).toUpperCase();

                let avatarHtml = '';
                if (u.avatar_url) {
                    avatarHtml = `<div style="width: 32px; height: 32px; border-radius: 50%; background-image: url('${u.avatar_url}'); background-size: cover; background-position: center;"></div>`;
                } else {
                    const colorClass = ['avatar-one', 'avatar-two', 'avatar-three', 'avatar-four'][index % 4];
                    avatarHtml = `<i class="person-avatar ${colorClass}">${initials}</i>`;
                }

                const isInternalAccount = u.username && u.username.endsWith('@internal.edu.vn');
                const canChangeThisUser = canChangeRoleGlobal && !isInternalAccount && (currentUser && currentUser.id != u.id);

                let statusHtml = '';
                let actionHtml = '';
                let roleDisplayHtml = '';
                
                let rText = (u.role || 'member').charAt(0).toUpperCase() + (u.role || 'member').slice(1);

                if (u.status === 'pending') {
                    statusHtml = `<span class="status" style="background: #fff3cd; color: #856404; padding: 4px 8px; border-radius: 4px; font-size: 0.85em; font-weight: 500;">Pending</span>`;
                    
                    if (canChangeRoleGlobal) {
                        actionHtml = `<button class="row-action btn-approve" data-id="${u.id}" style="background: rgba(25, 135, 84, 0.15); color: #157347; border: 1.5px solid rgba(25, 135, 84, 0.3); padding: 6px 16px; border-radius: 8px; cursor: pointer; font-weight: 700; font-size: 12.5px; backdrop-filter: blur(4px); transition: all 0.2s ease;" onmouseover="this.style.background='rgba(25, 135, 84, 0.25)'" onmouseout="this.style.background='rgba(25, 135, 84, 0.15)'">Approve</button>`;
                    } else {
                        actionHtml = `<span style="color:#999; font-size:0.85em;">No permission</span>`;
                    }
                    
                    roleDisplayHtml = `<span style="font-weight: 600; color: #475569;">${rText}</span>`;
                } else if (u.status === 'active') {
                    statusHtml = `<span class="status active">Active</span>`;
                    
                    if (canChangeThisUser) {
                        roleDisplayHtml = `
                            <div class="custom-select-wrapper">
                                <div class="custom-select-trigger">
                                    <span>${rText}</span>
                                    <span style="font-size: 0.7em; margin-left: 8px;">▼</span>
                                </div>
                                <div class="custom-select-options">
                                    <div class="custom-option ${u.role === 'member' ? 'selected' : ''}" data-value="member" data-id="${u.id}">Member</div>
                                    <div class="custom-option ${u.role === 'staff' ? 'selected' : ''}" data-value="staff" data-id="${u.id}">Staff</div>
                                    <div class="custom-option ${u.role === 'admin' ? 'selected' : ''}" data-value="admin" data-id="${u.id}">Admin</div>
                                    <div class="custom-option ${u.role === 'owner' ? 'selected' : ''}" data-value="owner" data-id="${u.id}">Owner</div>
                                </div>
                            </div>
                        `;
                        actionHtml = `<span style="color:#28a745; font-size: 0.85em; font-weight: 500;">Done</span>`;
                    } else {
                        if (isInternalAccount) {
                            roleDisplayHtml = `<span style="padding: 6px 12px; border-radius: 8px; background: rgba(13, 110, 253, 0.05); color: #0d6efd; font-weight: 700; border: 1.5px solid rgba(13, 110, 253, 0.2); display: inline-flex; align-items: center;"><img src="../../assets/icon/Better_Icon/lock.png" alt="Lock" style="width: 14px; height: 14px; margin-right: 6px;">${rText}</span>`;
                        } else {
                            roleDisplayHtml = `<span style="font-weight: 600; color: #475569;">${rText}</span>`;
                        }
                        
                        if (currentUser && u.id == currentUser.id) {
                            actionHtml = `<span style="color:#6c757d; font-size:0.85em;">(You)</span>`;
                        } else {
                            actionHtml = `<span style="color:#999; font-size:0.85em;">-</span>`;
                        }
                    }
                } else {
                    statusHtml = `<span class="status" style="background: #f8d7da; color: #721c24; padding: 4px 8px; border-radius: 4px; font-size: 0.85em; font-weight: 500;">Banned</span>`;
                    actionHtml = `<span style="color:#999; font-size:0.85em;">-</span>`;
                    roleDisplayHtml = `<span style="font-weight: 600; color: #475569;">${rText}</span>`;
                }

                tr.innerHTML = `
                    <td>${avatarHtml}</td>
                    <td><strong>${name}</strong></td>
                    <td>${u.username}</td>
                    <td>${roleDisplayHtml}</td>
                    <td>${statusHtml}</td>
                    <td>${actionHtml}</td>
                `;
                tbody.appendChild(tr);
            });

            // Events duyệt member
            document.querySelectorAll('.btn-approve').forEach(btn => {
                btn.addEventListener('click', async (e) => {
                    const id = e.target.getAttribute('data-id');
                    const token = localStorage.getItem('token');
                    try {
                        e.target.textContent = "Processing...";
                        e.target.disabled = true;
                        e.target.style.opacity = '0.7';

                        const res = await fetch("/api/admin/users/" + id, {
                            method: "PUT",
                            headers: { "Authorization": "Bearer " + token, "Content-Type": "application/json" },
                            body: JSON.stringify({ status: 'active', role: 'member' })
                        });
                        if (res.ok) {
                            loadUsers();
                        } else {
                            const errData = await res.json();
                            alert("Error approving member: " + (errData.error || ""));
                            e.target.textContent = "Approve";
                            e.target.disabled = false;
                            e.target.style.opacity = '1';
                        }
                    } catch(err) {
                        alert("Connection error during approval");
                    }
                });
            });
            
        } catch (err) {
            tbody.innerHTML = "<tr><td colspan='6' style='text-align:center;color:red;'>Lỗi trong quá trình render (JS Error): " + err.message + "</td></tr>";
        }
    }

    // Resolve sự kiện cho Custom Dropdown (Event Delegation)
    document.addEventListener('click', async (e) => {
        // --- Resolve Role Changing Dropdown ---
        if (!e.target.closest('.custom-select-wrapper')) {
            document.querySelectorAll('.custom-select-options').forEach(opt => opt.style.display = 'none');
        } else {
            const trigger = e.target.closest('.custom-select-trigger');
            if (trigger) {
                const options = trigger.nextElementSibling;
                const isVisible = options.style.display === 'block';
                document.querySelectorAll('.custom-select-options').forEach(opt => opt.style.display = 'none');
                if (!isVisible) options.style.display = 'block';
            }
        }

        const option = e.target.closest('.custom-option');
        if (option) {
            const wrapper = option.closest('.custom-select-wrapper');
            wrapper.querySelector('.custom-select-options').style.display = 'none';

            const id = option.getAttribute('data-id');
            const newRole = option.getAttribute('data-value');
            const token = localStorage.getItem('token');
            
            if (!confirm("Confirm: Change this member's role to " + newRole.toUpperCase() + "?")) {
                return;
            }

            try {
                const triggerText = wrapper.querySelector('.custom-select-trigger span');
                triggerText.textContent = "Processing...";
                wrapper.querySelector('.custom-select-trigger').style.opacity = '0.5';

                const res = await fetch("/api/admin/users/" + id, {
                    method: "PUT",
                    headers: { "Authorization": "Bearer " + token, "Content-Type": "application/json" },
                    body: JSON.stringify({ role: newRole })
                });
                
                if (res.ok) {
                    loadUsers();
                } else {
                    const errData = await res.json();
                    alert("Error changing role: " + (errData.error || ""));
                    loadUsers();
                }
            } catch(err) {
                alert("Connection error when changing role");
                loadUsers();
            }
        }

        // --- Resolve Global Filter Dropdown ---
        if (!e.target.closest('.custom-global-filter')) {
            document.querySelectorAll('.cg-options').forEach(opt => opt.style.display = 'none');
        } else {
            const trigger = e.target.closest('.cg-trigger');
            if (trigger) {
                const options = trigger.nextElementSibling;
                const isVisible = options.style.display === 'block';
                document.querySelectorAll('.cg-options').forEach(opt => opt.style.display = 'none');
                if (!isVisible) options.style.display = 'block';
            }
        }

        const cgOpt = e.target.closest('.cg-opt');
        if (cgOpt) {
            const wrapper = cgOpt.closest('.custom-global-filter');
            wrapper.querySelector('.cg-options').style.display = 'none';

            const newValue = cgOpt.getAttribute('data-value');
            const textValue = cgOpt.textContent;
            document.getElementById('cg-display').textContent = textValue;
            
            currentGlobalFilter = newValue;
            applyFilters();
        }
    });

        // --- Resolve Ban / Unban ---
    const btnBan = document.getElementById('btn-ban');
    const btnUnban = document.getElementById('btn-unban');
    const banInput = document.getElementById('ban-input');

    async function handleBanAction(newStatus) {
        if (!banInput || !banInput.value.trim()) {
            alert('Please enter email or username!');
            return;
        }
        const val = banInput.value.trim().toLowerCase();
        
        // Tìm user trong mảng allUsersData
        const targetUser = allUsersData.find(u => (u.username && u.username.toLowerCase() === val) || (u.email && u.email.toLowerCase() === val));
        
        if (!targetUser) {
            alert('No member found with the entered information!');
            return;
        }

        if (targetUser.id == currentUser.id) {
            alert('Error: You cannot Ban/Unban yourself!');
            return;
        }
        
        if (targetUser.username.endsWith('@internal.edu.vn')) {
            alert('Error: Cannot modify internal accounts!');
            return;
        }

        if (!confirm('Are you sure you want to ' + (newStatus === 'banned' ? 'BAN' : 'UNBAN') + ' members ' + targetUser.username + '?')) {
            return;
        }

        const token = localStorage.getItem('token');
        try {
            const res = await fetch("/api/admin/users/" + targetUser.id, {
                method: "PUT",
                headers: { "Authorization": "Bearer " + token, "Content-Type": "application/json" },
                body: JSON.stringify({ status: newStatus })
            });
            if (res.ok) {
                alert('Operation successful!');
                banInput.value = '';
                loadUsers();
            } else {
                const errData = await res.json();
                alert('Lỗi: ' + (errData.error || ''));
            }
        } catch(err) {
            alert('Lỗi kết nối Server');
        }
    }

    if (btnBan) btnBan.addEventListener('click', () => handleBanAction('banned'));
    if (btnUnban) btnUnban.addEventListener('click', () => handleBanAction('active'));

    loadUsers();
});






