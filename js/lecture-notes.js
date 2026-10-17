/**
 * =====================================================================
 * lecture-notes.js — Logic cho tab Notes
 * =====================================================================
 * File này xử lý:
 * - Trình soạn thảo ghi chú (contenteditable)
 * - Các nút định dạng: Bold, Italic, Underline, Bullet list, Link, Clear
 * - Tự động lưu nội dung vào localStorage (debounce 800ms)
 * - Displaying trạng thái "Saving..." -> "Auto saved"
 * - Render danh sách "Related notes"
 *
 * Được dùng bởi: lecture.html (tab Notes)
 * =====================================================================
 */
;(function () {
  'use strict';

  window.Lib95 = window.Lib95 || {};
  window.Lib95.lectures = window.Lib95.lectures || {};

  var core = window.Lib95.lectures.core;

  function initNotesTab() {
    /* Lấy lectureId hiện tại từ URL */
    var params = new URLSearchParams(window.location.search);
    var lectureId = parseInt(params.get('id'), 10) || 1;
    
    var editor = document.getElementById('lec-notes-editor-area');
    var statusText = document.getElementById('lec-notes-status-text');
    var statusIcon = document.getElementById('lec-notes-status');
    
    if (!editor) return;

    /* ====== KHÔI PHỤC DỮ LIỆU ====== */
    var storageKey = 'note:' + lectureId;
    var savedNote = core.storageGet(storageKey);
    if (savedNote) {
      editor.innerHTML = savedNote;
    }

    /* ====== TỰ ĐỘNG LƯU (AUTO SAVE) ====== */
    /* Hàm thực hiện lưu */
    var doSave = function () {
      var content = editor.innerHTML;
      core.storageSet(storageKey, content);
      
      /* Cập nhật trạng thái thành Auto saved */
      if (statusText) statusText.textContent = 'Auto saved';
      if (statusIcon) statusIcon.classList.remove('lec-notes-status--saving');
    };

    /* Debounce 800ms */
    var debouncedSave = core.debounce(doSave, 800);

    /* Bắt sự kiện gõ phím */
    editor.addEventListener('input', function () {
      if (statusText) statusText.textContent = 'Saving...';
      if (statusIcon) statusIcon.classList.add('lec-notes-status--saving');
      debouncedSave();
    });

    /* ====== TOOLBAR ACTIONS ====== */
    /* Dùng document.execCommand cho trình soạn thảo cơ bản (mặc dù deprecated nhưng phổ biến cho vanilla JS đơn giản, an toàn vì chỉ chạy client-side) */
    var actions = {
      bold: function () { document.execCommand('bold', false, null); },
      italic: function () { document.execCommand('italic', false, null); },
      underline: function () { document.execCommand('underline', false, null); },
      list: function () { document.execCommand('insertUnorderedList', false, null); },
      link: function () {
        var url = prompt('Enter link URL:');
        if (url) document.execCommand('createLink', false, url);
      },
      clear: function () {
        if (confirm('Clear all notes?')) {
          editor.innerHTML = '';
          debouncedSave(); /* Lưu ngay lập tức */
        }
      }
    };

    /* Gắn sự kiện cho các nút trên toolbar */
    var toolbarBtns = document.querySelectorAll('.lec-notes-tool-btn');
    toolbarBtns.forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        var action = btn.getAttribute('data-action');
        if (actions[action]) {
          actions[action]();
          editor.focus(); /* Giữ focus lại vào editor */
          
          /* Kích hoạt auto save */
          if (statusText) statusText.textContent = 'Saving...';
          if (statusIcon) statusIcon.classList.add('lec-notes-status--saving');
          debouncedSave();
        }
      });
    });

    /* ====== RELATED NOTES ====== */
    var relatedList = document.getElementById('lec-related-notes-list');
    if (relatedList) {
      /* Displaying các ghi chú mẫu (fake data) */
      var notes = core.getNotes();
      /* Lấy tối đa 3 ghi chú không phải của bài hiện tại */
      var related = notes.filter(function (n) { return n.lectureId !== lectureId; }).slice(0, 3);
      
      if (related.length > 0) {
        var html = '';
        related.forEach(function (n) {
          html +=
            '<a href="lecture.html?id=' + n.lectureId + '#notes" class="lec-related-item">' +
              '<div class="lec-related-item-icon">📝</div>' +
              '<div class="lec-related-item-info">' +
                '<h4 class="lec-related-item-name">' + n.title + '</h4>' +
                '<p class="lec-related-item-date">' + n.updatedAt + '</p>' +
              '</div>' +
            '</a>';
        });
        relatedList.innerHTML = html;
      } else {
        relatedList.innerHTML = '<p class="lec-empty-text">No related notes found.</p>';
      }
    }
  }

  /* EXPORT */
  window.Lib95.lectures.notes = {
    initNotesTab: initNotesTab
  };

})();
