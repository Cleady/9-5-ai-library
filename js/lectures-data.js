/**
 * =====================================================================
 * lectures-data.js — Dữ liệu chuẩn cho module Lectures
 * =====================================================================
 * Hệ thống hóa bài giảng môn CEA201 (Computer Organization and Architecture)
 * Video thực tế: document/Lectures/Ky_II/CEA201/test/Giải_mã_Hệ_thống_Số.mp4
 * =====================================================================
 */
;(function () {
  'use strict';

  /* Đảm bảo namespace tồn tại trước khi gán */
  window.Lib95 = window.Lib95 || {};
  window.Lib95.lectures = window.Lib95.lectures || {};

  /* ===== SUBJECTS — danh sách môn học ===== */
  var subjects = [
    {
      id: 1,
      name: 'CEA201',
      title: 'Computer Organization and Architecture',
      code: 'CEA201',
      term: 'Kỳ II',
      icon: 'subject1-icon',
      /* Màu gradient dùng cho thumbnail bài giảng thuộc subject này */
      gradientFrom: '#38bdf8',
      gradientTo: '#0284c7'
    }
  ];

  /* ===== NỘI DUNG TỔNG QUAN BÀI GIẢNG (PHƯƠNG PHÁP FEYNMAN) ===== */
  var cea201OverviewHtml = `
<div class="lec-feynman-container">
  <div class="lec-feynman-banner">
    <div class="lec-feynman-tag"><span class="lec-tag-icon">⚡</span> PHƯƠNG PHÁP FEYNMAN · KIẾN THỨC CỐT LÕI</div>
    <h2 class="lec-feynman-headline">BÀI GIẢNG: HỆ THỐNG SỐ (NUMBER SYSTEMS)</h2>
    <p class="lec-feynman-desc">Hệ thống hóa toàn diện bản chất biểu diễn dữ liệu trong kiến trúc máy tính: Hiểu rõ cơ số, trọng số vị trí và thành thạo các thuật toán chuyển đổi giữa hệ Nhị phân, Thập phân và Thập lục phân.</p>
  </div>

  <!-- PHẦN 1 -->
  <section class="lec-section-card">
    <div class="lec-section-header">
      <span class="lec-section-num">1</span>
      <div>
        <h3 class="lec-section-title">Hệ thống số theo vị trí (Positional Number Systems)</h3>
        <p class="lec-section-subtitle">Nguyên lý nền tảng của mọi hệ thống đếm số trong toán học và tin học</p>
      </div>
    </div>

    <div class="lec-card-body">
      <div class="lec-concept-box">
        <h4>💡 Khái niệm cơ bản</h4>
        <p>Mỗi số được biểu diễn bằng một chuỗi chữ số. Giá trị thực tế của từng chữ số ở vị trí $i$ phụ thuộc vào một <strong>trọng số</strong> tương ứng là $r^i$, trong đó $r$ được gọi là <strong>cơ số</strong> (<em>radix</em> hoặc <em>base</em>).</p>
      </div>

      <div class="lec-formula-card">
        <span class="lec-formula-label">Biểu thức tổng quát:</span>
        <div class="lec-math-display">
          $$\\left(\\dots a_3 a_2 a_1 a_0 \\,.\\, a_{-1} a_{-2} a_{-3} \\dots\\right)_r = \\sum_{i=-\\infty}^{+\\infty} a_i \\times r^i$$
        </div>
        <div class="lec-formula-rules">
          <span class="lec-badge-rule">Điều kiện chữ số: $0 \\le a_i < r$</span>
          <span class="lec-badge-rule">Dấu cơ số (radix point): Dấu chấm phân tách giữa phần nguyên và phần lẻ</span>
        </div>
      </div>

      <div class="lec-subcard">
        <h4 class="lec-subcard-title">📌 Hệ Thập phân (Decimal System — Cơ số 10)</h4>
        <p>Hệ đếm quen thuộc hàng ngày, sử dụng tập 10 ký số: <code>{0, 1, 2, 3, 4, 5, 6, 7, 8, 9}</code>. Mỗi vị trí được nhân với 10 nâng lên lũy thừa tương ứng với vị trí đó ($10^i$).</p>
        
        <div class="lec-breakdown-grid">
          <div class="lec-breakdown-item">
            <strong>🔹 Phần nguyên (Integer):</strong>
            <p>Ví dụ phân tích số $4728$:</p>
            <div class="lec-math-calc">
              $$4728 = (4 \\times 10^3) + (7 \\times 10^2) + (2 \\times 10^1) + (8 \\times 10^0)$$
            </div>
            <ul class="lec-note-list">
              <li><strong>MSD (Most Significant Digit):</strong> Chữ số ngoài cùng bên trái ($4$) có trọng số lớn nhất ($10^3$).</li>
              <li><strong>LSD (Least Significant Digit):</strong> Chữ số ngoài cùng bên phải ($8$) có trọng số nhỏ nhất ($10^0$).</li>
            </ul>
          </div>

          <div class="lec-breakdown-item">
            <strong>🔹 Phần lẻ (Fraction):</strong>
            <p>Sử dụng các số mũ âm của 10. Ví dụ số $0.256$:</p>
            <div class="lec-math-calc">
              $$0.256 = (2 \\times 10^{-1}) + (5 \\times 10^{-2}) + (6 \\times 10^{-3})$$
            </div>
            <p class="lec-calc-sub">Tương đương: $\\frac{2}{10} + \\frac{5}{100} + \\frac{6}{1000} = 0.256$</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- PHẦN 2 -->
  <section class="lec-section-card">
    <div class="lec-section-header">
      <span class="lec-section-num">2</span>
      <div>
        <h3 class="lec-section-title">Hệ Nhị phân (Binary System — Cơ số 2)</h3>
        <p class="lec-section-subtitle">Hệ đếm nền tảng của toàn bộ mạch điện tử và phần cứng máy tính</p>
      </div>
    </div>

    <div class="lec-card-body">
      <div class="lec-concept-box">
        <h4>💡 Khái niệm &amp; Bản chất</h4>
        <p>Là hệ đếm chỉ sử dụng duy nhất 2 chữ số (mỗi chữ số là 1 <em>bit</em>): <strong>0</strong> và <strong>1</strong>. Trong mạch kỹ thuật số, chúng tương ứng với hai mức điện thế vật lý: có điện thế (High / 1) và không có điện thế (Low / 0).</p>
      </div>

      <p><strong>Trọng số theo vị trí:</strong> Các vị trí tính từ dấu cơ số sang trái mang trọng số là lũy thừa tăng dần của 2 ($2^0, 2^1, 2^2, 2^3\\dots$), và sang phải là lũy thừa âm ($2^{-1}, 2^{-2}, 2^{-3}\\dots$).</p>

      <div class="lec-example-card">
        <div class="lec-example-header">
          <span class="lec-example-tag">VÍ DỤ 1</span>
          <strong>Chuyển đổi số nguyên: $11_2$ sang hệ thập phân</strong>
        </div>
        <div class="lec-math-calc">
          $$11_2 = (1 \\times 2^1) + (1 \\times 2^0) = 2 + 1 = 3_{10}$$
        </div>
      </div>

      <div class="lec-example-card">
        <div class="lec-example-header">
          <span class="lec-example-tag">VÍ DỤ 2</span>
          <strong>Kết hợp cả phần nguyên và phần lẻ: $1001.101_2$ sang hệ thập phân</strong>
        </div>
        <div class="lec-math-calc">
          $$1001.101_2 = (1 \\times 2^3) + (0 \\times 2^2) + (0 \\times 2^1) + (1 \\times 2^0) + (1 \\times 2^{-1}) + (0 \\times 2^{-2}) + (1 \\times 2^{-3})$$
          $$= 8 + 0 + 0 + 1 + 0.5 + 0 + 0.125 = 9.625_{10}$$
        </div>
      </div>
    </div>
  </section>

  <!-- PHẦN 3 -->
  <section class="lec-section-card">
    <div class="lec-section-header">
      <span class="lec-section-num">3</span>
      <div>
        <h3 class="lec-section-title">Quy tắc Chuyển đổi Cơ số (Conversion Rules)</h3>
        <p class="lec-section-subtitle">Thuật toán chuyển đổi hai chiều chuẩn mực giữa hệ Nhị phân và Thập phân</p>
      </div>
    </div>

    <div class="lec-card-body">
      <!-- Nhị phân sang Thập phân -->
      <div class="lec-rule-block">
        <h4 class="lec-rule-title">A. Nhị phân $\\rightarrow$ Thập phân (Binary to Decimal)</h4>
        <p class="lec-rule-summary">Nhân từng chữ số nhị phân với lũy thừa tương ứng của 2 ($2^i$), sau đó cộng tất cả các giá trị tích lại với nhau.</p>
      </div>

      <!-- Thập phân sang Nhị phân -->
      <div class="lec-rule-block">
        <h4 class="lec-rule-title">B. Thập phân $\\rightarrow$ Nhị phân (Decimal to Binary)</h4>
        <p>Hệ thống xử lý tách biệt độc lập giữa <strong>phần nguyên</strong> và <strong>phần lẻ</strong>:</p>

        <div class="lec-algorithm-grid">
          <!-- Phần nguyên -->
          <div class="lec-algo-card">
            <div class="lec-algo-badge integer-badge">Phần nguyên (Integer) — Phép chia lặp cho 2</div>
            <ol class="lec-step-list">
              <li><strong>Bước 1:</strong> Lấy số thập phân $N$ chia cho 2, thu được thương số và số dư $R_0$ (giá trị là 0 hoặc 1).</li>
              <li><strong>Bước 2:</strong> Tiếp tục lấy thương số thu được chia tiếp cho 2 để tìm số dư tiếp theo $R_1$.</li>
              <li><strong>Bước 3:</strong> Lặp lại quá trình này liên tục cho đến khi thương số bằng <strong>0</strong>.</li>
            </ol>
            <div class="lec-read-direction up-direction">
              <span class="direction-icon">⬆️</span>
              <div>
                <strong>ĐỌC KẾT QUẢ: TỪ DƯỚI LÊN TRÊN</strong>
                <p>Xếp các số dư thu được từ dưới lên trên (từ số dư có trọng số thấp nhất LSD đến số dư có trọng số cao nhất MSD).</p>
              </div>
            </div>
          </div>

          <!-- Phần lẻ -->
          <div class="lec-algo-card">
            <div class="lec-algo-badge fraction-badge">Phần lẻ (Fraction) — Phép nhân lặp với 2</div>
            <ol class="lec-step-list">
              <li><strong>Bước 1:</strong> Lấy phần lẻ $F$ nhân với 2. Phần nguyên của tích ($0$ hoặc $1$) chính là chữ số nhị phân đầu tiên sau dấu phẩy.</li>
              <li><strong>Bước 2:</strong> Giữ lại phần lẻ của tích và tiếp tục nhân với 2 để tìm chữ số nhị phân kế tiếp.</li>
              <li><strong>Bước 3:</strong> Lặp lại cho đến khi phần lẻ bằng 0 (hoặc đạt độ chính xác bit mong muốn).</li>
            </ol>
            <div class="lec-read-direction down-direction">
              <span class="direction-icon">⬇️</span>
              <div>
                <strong>ĐỌC KẾT QUẢ: TỪ TRÊN XUỐNG DƯỚI</strong>
                <p>Ghi nhận các chữ số phần nguyên thu được theo thứ tự từ trên xuống dưới.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- PHẦN 4 -->
  <section class="lec-section-card">
    <div class="lec-section-header">
      <span class="lec-section-num">4</span>
      <div>
        <h3 class="lec-section-title">Hệ Thập lục phân (Hexadecimal Notation — Cơ số 16)</h3>
        <p class="lec-section-subtitle">Công cụ tối ưu hóa giúp biểu diễn chuỗi nhị phân ngắn gọn, trực quan</p>
      </div>
    </div>

    <div class="lec-card-body">
      <div class="lec-concept-box">
        <h4>🎯 Mục đích ra đời</h4>
        <p>Gom ngắn các chuỗi bit nhị phân dài (dãy 0, 1 quá dài gây khó nhớ và dễ nhầm lẫn) giúp con người, kỹ sư và lập trình viên dễ đọc, dễ viết và kiểm soát bộ nhớ hiệu quả hơn.</p>
      </div>

      <div class="lec-nibble-card">
        <h4>🧩 Quy tắc gom nhóm 4-bit (Nibble)</h4>
        <p>Vì $2^4 = 16$, nên <strong>mỗi nhóm 4 bit nhị phân (gọi là 1 Nibble)</strong> tương ứng chính xác với <strong>1 ký tự Hex</strong> duy nhất.</p>
        <p>Sử dụng 16 ký hiệu: các số từ <code>0 – 9</code> và 6 chữ cái <code>A – F</code>:</p>
        <div class="lec-hex-letters">
          <span>A = 10</span>
          <span>B = 11</span>
          <span>C = 12</span>
          <span>D = 13</span>
          <span>E = 14</span>
          <span>F = 15</span>
        </div>
      </div>

      <h4 class="lec-table-title">📊 Bảng quy đổi đại diện (Representative Conversion Table)</h4>
      <div class="lec-table-responsive">
        <table class="lec-hex-table">
          <thead>
            <tr>
              <th>Nhị phân (4-bit Nibble)</th>
              <th>Thập lục phân (Hex)</th>
              <th>Thập phân (Decimal)</th>
              <th>Ý nghĩa trọng số</th>
            </tr>
          </thead>
          <tbody>
            <tr><td><code>0000₂</code></td><td><strong>0₁₆</strong></td><td>0</td><td>Giá trị nhỏ nhất</td></tr>
            <tr><td><code>0100₂</code></td><td><strong>4₁₆</strong></td><td>4</td><td>$2^2$</td></tr>
            <tr><td><code>1000₂</code></td><td><strong>8₁₆</strong></td><td>8</td><td>$2^3$</td></tr>
            <tr><td><code>1010₂</code></td><td><strong>A₁₆</strong></td><td>10</td><td>Ký tự A ($8 + 2$)</td></tr>
            <tr><td><code>1011₂</code></td><td><strong>B₁₆</strong></td><td>11</td><td>Ký tự B ($8 + 2 + 1$)</td></tr>
            <tr><td><code>1100₂</code></td><td><strong>C₁₆</strong></td><td>12</td><td>Ký tự C ($8 + 4$)</td></tr>
            <tr><td><code>1101₂</code></td><td><strong>D₁₆</strong></td><td>13</td><td>Ký tự D ($8 + 4 + 1$)</td></tr>
            <tr><td><code>1111₂</code></td><td><strong>F₁₆</strong></td><td>15</td><td>Giá trị tối đa của 1 Nibble</td></tr>
          </tbody>
        </table>
      </div>

      <div class="lec-example-card">
        <div class="lec-example-header">
          <span class="lec-example-tag">VÍ DỤ CHUYỂN ĐỔI</span>
          <strong>Hexadecimal sang Decimal</strong>
        </div>
        
        <div class="lec-example-steps">
          <div class="lec-step-item">
            <strong>1. Chuyển đổi $2C_{16}$ sang hệ thập phân:</strong>
            <div class="lec-math-calc">
              $$2C_{16} = (2 \\times 16^1) + (12 \\times 16^0) = 32 + 12 = 44_{10}$$
            </div>
          </div>
          
          <div class="lec-step-item">
            <strong>2. Chuyển đổi $FF_{16}$ sang hệ thập phân và nhị phân:</strong>
            <div class="lec-math-calc">
              $$FF_{16} = (15 \\times 16^1) + (15 \\times 16^0) = 240 + 15 = 255_{10}$$
            </div>
            <p class="lec-calc-sub">Tương ứng trong hệ nhị phân 8-bit (1 Byte): $FF_{16} = 1111\\,1111_2$</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</div>
  `;

  /* ===== LECTURES — danh sách bài giảng ===== */
  var lectures = [
    {
      id: 1,
      subjectId: 1,
      order: 1,
      title: 'Computer Organization and Architecture: Number Systems',
      type: 'video',
      durationMin: 18,
      status: 'in-progress',
      videoUrl: '/document/Lectures/Ky_II/CEA201/test/Giải_mã_Hệ_thống_Số.mp4',
      description: 'Hệ thống hóa toàn bộ kiến thức cốt lõi về Hệ thống số (Number Systems) theo phương pháp Feynman: Hệ đếm theo vị trí, Hệ thập phân, Hệ nhị phân, Quy tắc chuyển đổi cơ số và Hệ thập lục phân trong kiến trúc máy tính.',
      keyTakeaways: [
        'Hệ thống số theo vị trí (Positional Number Systems): Cơ số r, trọng số rⁱ, chữ số 0 ≤ aᵢ < r và dấu cơ số.',
        'Hệ Thập phân (Cơ số 10) & Hệ Nhị phân (Cơ số 2): Nền tảng biểu diễn nhị phân trong phần cứng máy tính.',
        'Quy tắc chuyển đổi cơ số: Phép chia lặp cho 2 (phần nguyên - đọc từ dưới lên) & phép nhân lặp cho 2 (phần lẻ - đọc từ trên xuống).',
        'Hệ Thập lục phân (Hexadecimal - Cơ số 16): Quy tắc gom nhóm 4-bit (Nibble) và bảng quy đổi giá trị chuẩn.'
      ],
      overviewHtml: cea201OverviewHtml,
      dateAdded: '2026-10-14'
    }
  ];

  /* ===== RESOURCES — tài liệu đi kèm bài giảng ===== */
  var resources = [
    {
      id: 1,
      lectureId: 1,
      type: 'mp4',
      title: 'Video Bài giảng: Giải mã Hệ thống Số',
      size: '35.7 MB',
      url: '/document/Lectures/Ky_II/CEA201/test/Giải_mã_Hệ_thống_Số.mp4'
    },
    {
      id: 2,
      lectureId: 1,
      type: 'pdf',
      title: 'Tài liệu tóm tắt: Hệ thống số & Quy tắc chuyển đổi (CEA201)',
      size: '1.2 MB',
      url: '#'
    }
  ];

  /* ===== QUIZ QUESTIONS — câu hỏi trắc nghiệm ===== */
  var quizQuestions = [
    {
      id: 1,
      lectureId: 1,
      text: 'Số nhị phân 1001.101₂ khi chuyển đổi sang hệ thập phân có giá trị là bao nhiêu?',
      options: [
        '9.5',
        '9.625',
        '8.875',
        '10.125'
      ],
      correctIndex: 1
    },
    {
      id: 2,
      lectureId: 1,
      text: 'Khi chuyển đổi phần nguyên từ hệ thập phân sang nhị phân bằng phép chia lặp cho 2, các số dư được đọc theo thứ tự nào?',
      options: [
        'Từ trên xuống dưới (từ MSD đến LSD)',
        'Từ dưới lên trên (từ LSD đến MSD)',
        'Thứ tự tùy ý không quan trọng',
        'Từ trái sang phải theo thứ tự thực hiện phép chia'
      ],
      correctIndex: 1
    },
    {
      id: 3,
      lectureId: 1,
      text: 'Trong hệ thập lục phân (Hexadecimal), giá trị 2C₁₆ tương ứng với bao nhiêu trong hệ thập phân (Decimal)?',
      options: [
        '32',
        '44',
        '28',
        '42'
      ],
      correctIndex: 1
    }
  ];

  /* ===== NOTES — ghi chú của người dùng ===== */
  var notes = [
    {
      id: 1,
      lectureId: 1,
      title: 'Hệ thống số theo vị trí',
      excerpt: 'Mỗi chữ số ở vị trí i mang trọng số là r^i với cơ số r...',
      updatedAt: '2026-10-14'
    },
    {
      id: 2,
      lectureId: 1,
      title: 'Quy tắc chia lặp và nhân lặp',
      excerpt: 'Phần nguyên chia 2 đọc ngược lên, phần lẻ nhân 2 đọc xuôi xuống...',
      updatedAt: '2026-10-14'
    }
  ];

  /* Gán vào namespace — các module khác đọc qua Lib95.lectures.data */
  window.Lib95.lectures.data = {
    subjects: subjects,
    lectures: lectures,
    resources: resources,
    quizQuestions: quizQuestions,
    notes: notes
  };

})();
