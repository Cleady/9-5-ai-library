/**
 * MAD101 STUDIO — QUALITY GATE VALIDATOR
 * v2/validate.js
 * 
 * Chạy kiểm toán dữ liệu Schema v2 theo các tiêu chí nghiêm ngặt:
 * 1. Không chuỗi placeholder ở đề bài (question).
 * 2. Không lựa chọn rỗng / placeholder (options >= 2, không khớp "Phương án A/B/C/D").
 * 3. Đáp án (answer) nằm trong tập lựa chọn hợp lệ.
 * 4. Giải thích (explanation >= 2 bước chi tiết, không ghi đối chiếu chung chung).
 * 5. Bằng chứng kiểm chứng: Câu "verified" BẮT BUỘC có file kiểm chứng theo lô
 *    (v2/verification/*_results.json) hoặc file riêng (*_verify.py / json), hoặc sources học thuật nếu là lý thuyết.
 * 6. Cú pháp LaTeX chuẩn MathJax: phân cách \( \) và \[ \], không lỗi cú pháp.
 * 7. Kiểm soát hiển thị ảnh: needs_image=true phải có dữ liệu figures hoặc mô tả chữ đầy đủ.
 * 
 * Thoát với mã exit code 1 nếu có bất kỳ câu "verified" nào vi phạm.
 */

const fs = require('fs');
const path = require('path');

const V2_DIR = path.resolve(__dirname);
const VERIFICATION_DIR = path.join(V2_DIR, 'verification');

// 1. Quét toàn bộ kết quả kiểm chứng trong v2/verification/
function loadVerificationResults() {
  const verifiedMap = new Map(); // questionId -> { method, input, output, conclusion, sourceFile }

  if (!fs.existsSync(VERIFICATION_DIR)) {
    return verifiedMap;
  }

  const files = fs.readdirSync(VERIFICATION_DIR);

  for (const file of files) {
    const fullPath = path.join(VERIFICATION_DIR, file);

    // Dạng file kết quả theo lô: batch_*_results.json hoặc *_results.json
    if (file.endsWith('_results.json') || file.endsWith('.results.json')) {
      try {
        const raw = fs.readFileSync(fullPath, 'utf8');
        const data = JSON.parse(raw);

        // Có thể là mảng [{ id: 1, method: "...", ... }] hoặc đối tượng { "1": { ... } }
        if (Array.isArray(data)) {
          data.forEach(item => {
            if (item && item.id !== undefined) {
              verifiedMap.set(Number(item.id), { ...item, sourceFile: file });
            }
          });
        } else if (typeof data === 'object' && data !== null) {
          if (data.id !== undefined) {
            verifiedMap.set(Number(data.id), { ...data, sourceFile: file });
          } else {
            Object.entries(data).forEach(([key, val]) => {
              const qId = Number(key);
              if (!isNaN(qId) && val) {
                verifiedMap.set(qId, { ...val, sourceFile: file });
              }
            });
          }
        }
      } catch (e) {
        console.warn(`[Validator] Cảnh báo lỗi đọc file ${file}:`, e.message);
      }
    }

    // Dạng script kiểm chứng riêng lẻ: 0355_verify.py hoặc q355_verify.py
    const m = file.match(/^0*(\d+)_(?:verify|check)\.(?:py|js|json)$/i);
    if (m) {
      const qId = Number(m[1]);
      if (!verifiedMap.has(qId)) {
        verifiedMap.set(qId, { method: "individual_script", sourceFile: file });
      }
    }
  }

  return verifiedMap;
}

// 2. Kiểm tra cú pháp LaTeX cơ bản
function validateLatexSyntax(text) {
  if (!text || typeof text !== 'string') return { valid: true };
  
  // Kiểm tra cân bằng phân cách \( và \)
  const inlineOpen = (text.match(/\\\(/g) || []).length;
  const inlineClose = (text.match(/\\\)/g) || []).length;
  if (inlineOpen !== inlineClose) {
    return { valid: false, error: `Phân cách inline \\( ... \\) không cân bằng (${inlineOpen} mở, ${inlineClose} đóng)` };
  }

  // Kiểm tra cân bằng phân cách \[ và \]
  const blockOpen = (text.match(/\\\[/g) || []).length;
  const blockClose = (text.match(/\\\]/g) || []).length;
  if (blockOpen !== blockClose) {
    return { valid: false, error: `Phân cách block \\[ ... \\] không cân bằng (${blockOpen} mở, ${blockClose} đóng)` };
  }

  // Kiểm tra cấm dùng ký hiệu $ chưa thoát (theo quy ước LaTeX của dự án)
  // Chỉ cảnh báo nếu có cặp $...$ chưa được chuyển sang \( ... \)
  const rawDollarMatch = text.match(/(^|[^\\])\$([^\$]+)\$/);
  if (rawDollarMatch) {
    return { valid: false, error: `Phát hiện ký hiệu $...$ chưa chuyển đổi sang \\( ... \\)` };
  }

  return { valid: true };
}

// 3. Hàm kiểm toán chính cho một câu hỏi
function validateQuestion(q, verifiedMap) {
  const errors = [];
  const warnings = [];

  const id = q.id;
  const status = q.answer_status || 'pending';

  // --- KIỂM TRA CHO CÂU PENDING (Chưa xử lý) ---
  if (status === 'pending') {
    // Không được chứa chữ giả / options giả
    if (q.question && /(đối chiếu ảnh|chọn phương án chính xác|câu hỏi số\s*\d+.*MAD101)/i.test(q.question)) {
      errors.push(`Câu pending mang chuỗi placeholder giả ở trường question`);
    }
    if (Array.isArray(q.options) && q.options.some(opt => /^(?:phương án|option|đáp án)\s*[a-z0-9]\.?$/i.test(String(opt).trim()) || /^[a-f]\.?$/i.test(String(opt).trim()))) {
      errors.push(`Câu pending mang options placeholder giả`);
    }
    return { id, status, valid: errors.length === 0, errors, warnings, isPending: true };
  }

  // --- KIỂM TRA CHO CÂU ĐÃ CHUYỂN ĐỔI (v2: verified, uncertain, conflict) ---

  // 1. Kiểm tra trường question
  if (!q.question || typeof q.question !== 'string' || q.question.trim().length === 0) {
    errors.push(`Trường question rỗng hoặc không hợp lệ`);
  } else {
    if (/(đối chiếu ảnh|chọn phương án chính xác|câu hỏi số\s*\d+.*MAD101)/i.test(q.question)) {
      errors.push(`Question chứa chuỗi placeholder: "${q.question}"`);
    }
    const cleanText = q.question.replace(/câu\s*hỏi\s*số\s*\d+/gi, '').trim();
    if (cleanText.length < 25 && !(q.review_flags && q.review_flags.includes('short_theory'))) {
      errors.push(`Question quá ngắn (< 25 ký tự): "${cleanText}"`);
    }
    const latexCheck = validateLatexSyntax(q.question);
    if (!latexCheck.valid) {
      errors.push(`Lỗi cú pháp LaTeX trong question: ${latexCheck.error}`);
    }
  }

  // 2. Kiểm tra trường options
  if (!Array.isArray(q.options) || q.options.length < 2) {
    if (q.type !== 'fill_in_blank' && q.type !== 'true_false') {
      errors.push(`Options phải có ít nhất 2 lựa chọn (hiện có: ${q.options ? q.options.length : 0})`);
    }
  } else {
    q.options.forEach((opt, idx) => {
      const optStr = String(opt).trim();
      if (!optStr) {
        errors.push(`Lựa chọn index ${idx} rỗng`);
      } else if (/^(?:phương án|option|đáp án)\s*[a-z0-9]\.?$/i.test(optStr) || /^[a-f]\.?$/i.test(optStr)) {
        errors.push(`Lựa chọn index ${idx} là chuỗi placeholder: "${optStr}"`);
      }
      const latexCheck = validateLatexSyntax(optStr);
      if (!latexCheck.valid) {
        errors.push(`Lỗi cú pháp LaTeX trong option [${idx}]: ${latexCheck.error}`);
      }
    });
  }

  // 3. Kiểm tra đáp án (answer)
  if (!q.answer) {
    errors.push(`Trường answer rỗng`);
  } else if (Array.isArray(q.options) && q.options.length > 0) {
    const validLetters = ['A', 'B', 'C', 'D', 'E', 'F'].slice(0, q.options.length);
    if (!validLetters.includes(q.answer) && typeof q.answer !== 'number') {
      errors.push(`Answer "${q.answer}" không nằm trong danh mục lựa chọn hợp lệ (${validLetters.join(', ')})`);
    }
  }

  // 4. Kiểm tra lời giải thích (explanation)
  if (!Array.isArray(q.explanation) || q.explanation.length < 2) {
    if (!(q.review_flags && q.review_flags.includes('short_theory') && q.explanation && q.explanation.length === 1)) {
      errors.push(`Explanation phải có ít nhất 2 bước phân tích (hiện có: ${q.explanation ? q.explanation.length : 0})`);
    }
  } else {
    const expText = q.explanation.join(' ');
    if (/(đối chiếu trực tiếp với tài liệu đề thi)/i.test(expText)) {
      errors.push(`Explanation chứa nội dung đối chiếu chung chung/placeholder`);
    }
    q.explanation.forEach((step, sIdx) => {
      const latexCheck = validateLatexSyntax(step);
      if (!latexCheck.valid) {
        errors.push(`Lỗi cú pháp LaTeX trong explanation bước ${sIdx + 1}: ${latexCheck.error}`);
      }
    });
  }

  // 5. Kiểm tra tính xác thực cho câu "verified" (Luật 5)
  if (status === 'verified') {
    const hasBatchOrScript = verifiedMap.has(id);
    const hasAcademicSources = Array.isArray(q.sources) && q.sources.length > 0 && q.sources.some(s => s.startsWith('http') || s.startsWith('Rosen'));

    if (!hasBatchOrScript && !hasAcademicSources) {
      errors.push(`Câu mang nhãn "verified" nhưng KHÔNG có file kiểm chứng theo lô trong v2/verification/ hoặc sources học thuật`);
    } else if (hasBatchOrScript) {
      const vEntry = verifiedMap.get(id);
      // Kiểm tra mục kết quả có đủ method, input, output, conclusion nếu là batch
      if (vEntry.sourceFile && vEntry.sourceFile.endsWith('_results.json')) {
        if (!vEntry.method || !vEntry.conclusion) {
          errors.push(`Mục kiểm chứng của câu ${id} trong ${vEntry.sourceFile} thiếu trường method hoặc conclusion`);
        }
      }
    }
  }

  // 6. Kiểm soát hiển thị ảnh
  if (q.needs_image === true) {
    const hasFigures = Array.isArray(q.figures) && q.figures.length > 0;
    const hasDescription = typeof q.image_description === 'string' && q.image_description.trim().length > 10;
    if (!hasFigures && !hasDescription) {
      warnings.push(`Câu needs_image=true nhưng chưa có cấu trúc dữ liệu figures (đồ thị/cây) hoặc mô tả chi tiết`);
    }
  }

  return {
    id,
    status,
    valid: errors.length === 0,
    errors,
    warnings,
    isPending: false
  };
}

// 4. Tiến hành kiểm toán
function runValidation() {
  console.log("==================================================================");
  console.log("   MAD101 STUDIO — CỔNG CHẶN CHẤT LƯỢNG DỮ LIỆU SCHEMA V2");
  console.log("==================================================================");

  const verifiedMap = loadVerificationResults();
  console.log(`[Validator] Đã nạp ${verifiedMap.size} mục kiểm chứng từ ${VERIFICATION_DIR}`);

  // Tìm các file dữ liệu v2
  const candidateFiles = [
    path.join(V2_DIR, 'questions_sample_v2.json'),
    path.join(V2_DIR, 'questions_v2.json')
  ].filter(f => fs.existsSync(f));

  if (candidateFiles.length === 0) {
    console.error("[Validator] LỖI: Không tìm thấy file dữ liệu v2 nào để kiểm toán!");
    process.exit(1);
  }

  let totalChecked = 0;
  let totalPassed = 0;
  let totalPending = 0;
  let totalUncertain = 0;
  let totalVerified = 0;
  let totalFailed = 0;

  const failureDetails = [];

  for (const filePath of candidateFiles) {
    console.log(`\n--> Đang kiểm toán: ${path.relative(process.cwd(), filePath)}`);
    const raw = fs.readFileSync(filePath, 'utf8');
    const questions = JSON.parse(raw);

    questions.forEach(q => {
      totalChecked++;
      const result = validateQuestion(q, verifiedMap);

      if (result.status === 'pending') totalPending++;
      else if (result.status === 'verified') totalVerified++;
      else if (result.status === 'uncertain' || result.status === 'conflict') totalUncertain++;

      if (result.valid) {
        totalPassed++;
      } else {
        totalFailed++;
        failureDetails.push(result);
      }
    });
  }

  console.log("\n======================== BÁO CÁO TỔNG HỢP ========================");
  console.log(`- Tổng số câu kiểm tra:             ${totalChecked}`);
  console.log(`- Số câu đạt chuẩn cổng chất lượng: ${totalPassed}`);
  console.log(`- Số câu chưa đạt (vi phạm):        ${totalFailed}`);
  console.log(`- Phân bố trạng thái:`);
  console.log(`  + Đã kiểm chứng (verified):       ${totalVerified}`);
  console.log(`  + Đang chờ xác minh (uncertain):  ${totalUncertain}`);
  console.log(`  + Chưa xử lý (pending):           ${totalPending}`);
  console.log("==================================================================");

  if (failureDetails.length > 0) {
    console.error(`\n❌ PHÁT HIỆN ${failureDetails.length} CÂU HỎI VI PHẠM CỔNG CHẤT LƯỢNG:\n`);
    failureDetails.forEach(f => {
      console.error(`[ID: ${f.id}] Trạng thái: "${f.status}"`);
      f.errors.forEach(err => console.error(`   ❌ Lỗi: ${err}`));
      f.warnings.forEach(w => console.warn(`   ⚠️ Cảnh báo: ${w}`));
    });
    console.error("\n[Validator] THẤT BẠI: Quy trình build bị chặn do dữ liệu không đạt chuẩn!\n");
    process.exit(1);
  } else {
    console.log("\n✅ TẤT CẢ CÂU ĐỀU ĐẠT CHUẨN CỔNG CHẤT LƯỢNG!");
    console.log("[Validator] Không có bất kỳ câu 'verified' nào thiếu bằng chứng kiểm chứng.\n");
    process.exit(0);
  }
}

runValidation();
