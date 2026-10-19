/**
 * classify_by_gemini.js
 * 
 * Phân loại 1131 câu hỏi MAD vào 8 chương bằng Google Gemini AI.
 * Dùng curl (qua temp file) để gửi ảnh base64 đến API.
 * 
 * Cách dùng:
 *   node classify_by_gemini.js --key YOUR_API_KEY
 * 
 * Tùy chọn:
 *   --key KEY     Gemini API key (bắt buộc)
 *   --sample N    Chỉ xử lý N câu đầu (để test)
 *   --resume      Tiếp tục từ file kết quả đã có
 */

import { readFileSync, writeFileSync, existsSync, unlinkSync, readdirSync } from "fs";
import { execSync } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ─── Cấu hình chương ─────────────────────────────────────────────────────────
const CHAPTERS = [
  { id: 1, name: "Chương 1: Logic và Bằng chứng", english: "The Foundations: Logic and Proofs" },
  { id: 2, name: "Chương 2: Cấu trúc cơ bản - Tập hợp, Hàm, Dãy và Tổng", english: "Basic Structures: Sets, Functions, Sequences, and Sums" },
  { id: 3, name: "Chương 3: Thuật toán", english: "Algorithms" },
  { id: 4, name: "Chương 4: Lý thuyết số và Mật mã", english: "Number Theory and Cryptography" },
  { id: 5, name: "Chương 5: Quy nạp và Đệ quy", english: "Induction and Recursion" },
  { id: 6, name: "Chương 6: Đếm", english: "Counting" },
  { id: 7, name: "Chương 7: Đồ thị", english: "Graphs" },
  { id: 8, name: "Chương 8: Cây", english: "Trees" }
];

// ─── Xử lý CLI args ──────────────────────────────────────────────────────────
const args = process.argv.slice(2);
const getArg = (flag) => { const i = args.indexOf(flag); return i !== -1 ? args[i + 1] : null; };

const API_KEY = getArg("--key") || process.env.GEMINI_API_KEY;
const SAMPLE = parseInt(getArg("--sample")) || null;
const RESUME = args.includes("--resume");

if (!API_KEY) {
  console.error("❌ Cần cung cấp Gemini API key: node classify_by_gemini.js --key YOUR_KEY");
  process.exit(1);
}

const RESULTS_FILE = path.join(__dirname, "classification_results.json");
const SUMMARY_FILE = path.join(__dirname, "chapter_breakdown.json");
const TMP_PAYLOAD_FILE = path.join(__dirname, "_tmp_payload.json");

// Dọn temp file cũ từ lần chạy trước
// Dọn temp file cũ từ lần chạy trước
try {
  const oldFiles = readdirSync(__dirname).filter(f => f.startsWith("_tmp_payload_") && f.endsWith(".json"));
  oldFiles.forEach(f => { try { unlinkSync(path.join(__dirname, f)); } catch (e) {} });
} catch (e) {}

// Delay trên Windows: timeout /t N >nul
const winDelay = (seconds) => {
  if (seconds > 0) execSync(`timeout /t ${seconds} /nobreak >nul`, { shell: true, stdio: "pipe" });
};

// ─── Đọc câu hỏi ─────────────────────────────────────────────────────────────
const qPath = path.join(__dirname, "questions_data.js");
if (!existsSync(qPath)) { console.error("❌ Không tìm thấy questions_data.js!"); process.exit(1); }
let ALL_QUESTIONS;
eval(readFileSync(qPath, "utf-8").replace("const ALL_QUESTIONS", "ALL_QUESTIONS"));
if (!ALL_QUESTIONS) { console.error("❌ Không đọc được ALL_QUESTIONS"); process.exit(1); }

const questionsToProcess = SAMPLE ? ALL_QUESTIONS.slice(0, SAMPLE) : ALL_QUESTIONS;
console.log(`✅ Đã đọc ${ALL_QUESTIONS.length} câu hỏi${SAMPLE ? ` (SAMPLE: ${SAMPLE} câu)` : ""}`);

// ─── Tìm & đọc file ảnh ──────────────────────────────────────────────────────
function findImage(questionId) {
  const p = String(questionId).padStart(4, "0");
  const q = String(questionId).padStart(3, "0");
  for (const ext of [".png", ".webp"]) {
    const fp = path.join(__dirname, `${p}_q${q}_Question_${questionId}${ext}`);
    if (existsSync(fp)) return fp;
  }
  return null;
}

// ─── Gọi Gemini API qua curl với temp file ───────────────────────────────────
function callGemini(imagePath) {
  const imgData = readFileSync(imagePath);
  const ext = path.extname(imagePath).toLowerCase();
  const mimeType = ext === ".png" ? "image/png" : "image/webp";
  const base64 = imgData.toString("base64");

  const payload = {
    contents: [{
      parts: [
        { text: `Phân tích câu hỏi Toán học Rời rạc (Discrete Mathematics) trong ảnh này. Xác định nó thuộc chương nào (1-8).

CHƯƠNG 1: Logic và Bằng chứng (Logic & Proofs)
- Proposition, truth table, quantifier, predicate, logical equivalence
- Rules of inference, argument validity, proof methods

CHƯƠNG 2: Cấu trúc cơ bản - Tập hợp, Hàm, Dãy, Tổng (Sets, Functions, Sequences, Sums)
- Set operations, injective/surjective/bijective functions
- Sequences, summation notation, cardinality

CHƯƠNG 3: Thuật toán (Algorithms)
- Big-O, time complexity, sorting, searching, algorithm analysis

CHƯƠNG 4: Lý thuyết số và Mật mã (Number Theory & Cryptography)
- Modulo, congruence, prime, GCD, LCM, RSA, cipher

CHƯƠNG 5: Quy nạp và Đệ quy (Induction & Recursion)
- Mathematical induction, recurrence relations, Fibonacci

CHƯƠNG 6: Đếm (Counting)
- Permutations, combinations, binomial theorem, pigeonhole principle

CHƯƠNG 7: Đồ thị (Graphs)
- Graph types, paths, cycles, Euler/Hamilton, coloring

CHƯƠNG 8: Cây (Trees)
- Binary trees, tree traversal, spanning tree, Huffman coding

Trả lời CHỈ MỘT SỐ từ 1 đến 8. KHÔNG kèm giải thích.` },
        { inline_data: { mime_type: mimeType, data: base64 } }
      ]
    }],
    generationConfig: { temperature: 0.0, maxOutputTokens: 5 }
  };

  // Ghi payload vào temp file (dùng fixed path để tránh rác)
  writeFileSync(TMP_PAYLOAD_FILE, JSON.stringify(payload));

  try {
    const stdout = execSync(
      `curl -s -X POST "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}" -H "Content-Type: application/json" -d @"${TMP_PAYLOAD_FILE}"`,
      { timeout: 60000, encoding: "utf-8", shell: true, maxBuffer: 10 * 1024 * 1024 }
    );
    const data = JSON.parse(stdout);
    if (data.error) return { error: `API error: ${data.error.message}` };
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "";
    const num = parseInt(text);
    if (num >= 1 && num <= 8) return { chapter: num };
    return { error: `Phản hồi không hợp lệ: "${text}"` };
  } catch (e) {
    return { error: e.message };
  } finally {
    try { unlinkSync(TMP_PAYLOAD_FILE); } catch (e) {}
  }
}

// ─── Gọi API với retry + rate limiting ───────────────────────────────────────
function callWithRetry(imagePath, maxRetries = 2) {
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    const result = callGemini(imagePath);
    if (result.chapter) return result;
    // Nếu lỗi quota hoặc rate limit, đợi lâu hơn
    const isQuota = result.error?.includes?.("quota") || result.error?.includes?.("RATE_LIMIT");
    if (attempt < maxRetries) {
      winDelay(isQuota ? 10 : 2);
    }
  }
  return { error: "Max retries exceeded" };
}

// ─── Main ─────────────────────────────────────────────────────────────────────
function main() {
  console.log(`\n🚀 BẮT ĐẦU PHÂN LOẠI ${questionsToProcess.length} CÂU HỎI\n`);

  // Load kết quả cũ
  let results = {};
  if (RESUME && existsSync(RESULTS_FILE)) {
    try { results = JSON.parse(readFileSync(RESULTS_FILE, "utf-8")); console.log(`📂 Resume: ${Object.keys(results).length} câu đã có\n`); } catch (e) {}
  }

  const toProcess = questionsToProcess.filter(q => !results[q.id]);
  console.log(`🔄 Cần xử lý: ${toProcess.length} câu\n`);

  let processed = 0;
  let success = 0;
  let fail = 0;
  const startTime = Date.now();

  for (let i = 0; i < toProcess.length; i++) {
    const q = toProcess[i];
    const imgPath = findImage(q.id);

    if (!imgPath) {
      results[q.id] = { id: q.id, chapter: null, error: "Không tìm thấy file ảnh" };
      fail++;
    } else {
      const result = callWithRetry(imgPath);
      // Delay 1s giữa các request để tránh rate limit
      if (i < toProcess.length - 1) winDelay(1);
      if (result.chapter) {
        results[q.id] = { id: q.id, chapter: result.chapter };
        success++;
      } else {
        results[q.id] = { id: q.id, chapter: null, error: result.error?.substring(0, 200) };
        fail++;
      }
    }

    processed++;

    // In tiến độ
    if (processed % 3 === 0 || processed === toProcess.length) {
      const pct = ((processed / toProcess.length) * 100).toFixed(1);
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      const rate = processed / (elapsed || 1);
      const remaining = Math.floor((toProcess.length - processed) / (rate || 1));
      console.log(`   [${pct}%] ${processed}/${toProcess.length} | ✅ ${success} | ❌ ${fail} | ⏱ ${elapsed}s | ⏳ ~${remaining}s`);
    }

    // Lưu kết quả định kỳ mỗi 10 câu
    if (processed % 10 === 0) {
      writeFileSync(RESULTS_FILE, JSON.stringify(results, null, 2));
    }
  }

  // Lưu kết quả cuối
  writeFileSync(RESULTS_FILE, JSON.stringify(results, null, 2));

  // ─── Tổng kết ──────────────────────────────────────────────────────────
  const totalTime = Math.floor((Date.now() - startTime) / 1000);
  console.log("\n═══════════════════════════════════════════");
  console.log(`📊 KẾT QUẢ PHÂN LOẠI (⏱ ${totalTime}s):\n`);

  const chapterCounts = {};
  for (let c = 1; c <= 8; c++) chapterCounts[c] = 0;
  Object.values(results).forEach(r => { if (r.chapter) chapterCounts[r.chapter]++; });

  for (let c = 1; c <= 8; c++) {
    const ch = CHAPTERS[c - 1];
    console.log(`   ${ch.name}: ${chapterCounts[c]} câu`);
  }

  const totalClassified = Object.values(results).filter(r => r.chapter).length;
  const totalErrors = Object.values(results).filter(r => r.error).length;

  console.log(`\n✅ Đã phân loại: ${totalClassified}/${toProcess.length}`);
  console.log(`❌ Lỗi: ${totalErrors}`);

  // Tạo chapter_breakdown.json
  const breakdown = {};
  for (let c = 1; c <= 8; c++) {
    const ids = Object.values(results)
      .filter(r => r.chapter === c)
      .map(r => r.id)
      .sort((a, b) => a - b);
    breakdown[c] = {
      name: CHAPTERS[c - 1].name,
      count: ids.length,
      ids,
      range: ids.length > 0 ? [ids[0], ids[ids.length - 1]] : null
    };
  }
  writeFileSync(SUMMARY_FILE, JSON.stringify(breakdown, null, 2));

  console.log(`\n📝 Chi tiết: ${RESULTS_FILE}`);
  console.log(`📝 Tóm tắt: ${SUMMARY_FILE}`);
  console.log("\n✅ HOÀN TẤT!");
}

main();
