/* Xử lý hiển thị nhóm, Tham gia/Rời nhóm, và Tạo nhóm mới (Admin/Owner/Staff) */
(function () {
  'use strict';

  var app = window.Lib95 && window.Lib95.community;
  if (!app) return;
  var make = app.makeElement;

  var grid = document.querySelector('[data-com-groups-grid]');
  if (!grid) return;

  var user = app.getCurrentUser();
  var createGroupBtn = document.querySelector('[data-com-create-group-btn]');
  var createGroupModal = document.querySelector('#com-create-group-modal');
  var createGroupForm = document.querySelector('[data-com-create-group-form]');

  // 1. Phân quyền hiển thị nút tạo nhóm (Admin / Owner / Staff)
  if (user && (user.role === 'admin' || user.role === 'owner' || user.role === 'staff')) {
    if (createGroupBtn) createGroupBtn.hidden = false;
  }

  // 2. Mở / Đóng modal tạo nhóm
  if (createGroupBtn && createGroupModal) {
    createGroupBtn.addEventListener('click', function () {
      if (typeof createGroupModal.showModal === 'function') {
        createGroupModal.showModal();
      } else {
        createGroupModal.setAttribute('open', '');
      }
    });

    createGroupModal.querySelectorAll('[data-com-modal-close]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        if (typeof createGroupModal.close === 'function') {
          createGroupModal.close();
        } else {
          createGroupModal.removeAttribute('open');
        }
      });
    });
  }

  // 3. Xử lý gửi form tạo nhóm mới
  if (createGroupForm) {
    createGroupForm.addEventListener('submit', async function (event) {
      event.preventDefault();
      var name = createGroupForm.elements.name.value.trim();
      var description = createGroupForm.elements.description.value.trim();

      if (!name) {
        app.showToast('Vui lòng nhập tên nhóm');
        return;
      }

      var submitBtn = createGroupForm.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Đang tạo...';
      }

      try {
        var res = await app.apiFetch('/api/community/groups', {
          method: 'POST',
          body: { name: name, description: description }
        });

        if (res.success) {
          createGroupForm.reset();
          if (typeof createGroupModal.close === 'function') {
            createGroupModal.close();
          } else {
            createGroupModal.removeAttribute('open');
          }
          app.showToast('Đã tạo nhóm thành công!');
          loadGroups();
        }
      } catch (err) {
        // apiFetch đã hiển thị toast
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Tạo nhóm';
        }
      }
    });
  }

  // 4. Render một thẻ nhóm
  function renderGroupCard(group) {
    var card = make('article', 'com-group-card');
    card.dataset.comGroupId = group.id;

    var top = make('div', 'com-group-top');
    var icon = make('div', 'com-group-icon', '👥');
    var title = make('h2', 'com-group-title', group.name);
    top.append(icon, title);
    card.appendChild(top);

    var desc = make('p', 'com-group-desc', group.description || 'Cùng học tập, chia sẻ và thảo luận.');
    card.appendChild(desc);

    var footer = make('div', 'com-group-footer');
    var count = make('span', 'com-group-members-count', group.memberCount + ' thành viên');
    count.dataset.comGroupCount = group.id;

    var btn = make('button', 'com-button');
    btn.type = 'button';
    btn.dataset.comGroupToggle = group.id;

    if (group.isMember) {
      btn.className = 'com-button com-btn-joined';
      btn.textContent = '✓ Joined';
    } else {
      btn.className = 'com-button com-button--primary';
      btn.textContent = '+ Join';
    }

    // Toggle Tham gia / Rời nhóm
    btn.addEventListener('click', async function () {
      btn.disabled = true;
      var wasMember = group.isMember;

      try {
        var endpoint = wasMember ? '/api/community/groups/' + group.id + '/leave' : '/api/community/groups/' + group.id + '/join';
        var res = await app.apiFetch(endpoint, { method: 'POST' });

        if (res.success) {
          group.isMember = !wasMember;
          group.memberCount += group.isMember ? 1 : -1;
          group.memberCount = Math.max(0, group.memberCount);

          count.textContent = group.memberCount + ' thành viên';

          if (group.isMember) {
            btn.className = 'com-button com-btn-joined';
            btn.textContent = '✓ Joined';
            app.showToast('Đã tham gia nhóm ' + group.name);
          } else {
            btn.className = 'com-button com-button--primary';
            btn.textContent = '+ Join';
            app.showToast('Đã rời khỏi nhóm ' + group.name);
          }
        }
      } catch (err) {
        // apiFetch đã hiển thị toast
      } finally {
        btn.disabled = false;
      }
    });

    footer.append(count, btn);
    card.appendChild(footer);

    return card;
  }

  // 5. Tải danh sách nhóm từ API
  async function loadGroups() {
    grid.replaceChildren();
    var loading = make('p', 'com-discussion-empty', 'Đang tải danh sách nhóm...');
    grid.appendChild(loading);

    try {
      var res = await app.apiFetch('/api/community/groups');
      grid.replaceChildren();

      var list = res.groups || [];
      if (list.length === 0) {
        grid.appendChild(make('p', 'com-discussion-empty', 'Chưa có nhóm nào được tạo.'));
        return;
      }

      list.forEach(function (group) {
        grid.appendChild(renderGroupCard(group));
      });

    } catch (err) {
      grid.replaceChildren();
      grid.appendChild(make('p', 'com-discussion-empty', 'Lỗi khi tải danh sách nhóm.'));
    }
  }

  loadGroups();
  app.loadGroups = loadGroups;
}());
