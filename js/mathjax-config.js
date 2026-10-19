/**
 * js/mathjax-config.js
 * Cấu hình MathJax an toàn cho nền tảng web 9.5 AI Library.
 * 
 * QUY TẮC AN TOÀN:
 * - Chỉ sử dụng \( \) cho inline math và \[ \] cho display math.
 * - TUYỆT ĐỐI KHÔNG bật '$' làm delimiter để tránh xung đột với code
 *   trong các môn lập trình (Python PFP191, Shell/Bash CSI106, PHP, Regex).
 */
window.MathJax = {
  tex: {
    inlineMath: [['\\(', '\\)']],
    displayMath: [['\\[', '\\]']],
    processEscapes: true
  },
  svg: {
    fontCache: 'global'
  },
  options: {
    enableMenu: false
  }
};
