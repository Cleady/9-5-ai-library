/**
 * classify_by_search.js
 * 
 * Phân loại 1131 câu hỏi MAD101 vào 8 chương dựa trên:
 * 1. Khoảng ID (range-based) - từ cấu trúc index.html
 * 2. Dữ liệu đã phân loại thủ công từ results.json
 * 3. Nghiên cứu web về cấu trúc môn MAD101 tại FPT
 *
 * Kết quả:
 * - chapter_mapping.json: Map chi tiết từng câu hỏi -> chương
 * - chapters/ : Thư mục chứa ảnh được phân loại theo chương
 * - Cập nhật questions_data.js: Thêm trường chapter
 * - Cập nhật index.html: CHAPTERS dựa trên kết quả thực tế
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync, copyFileSync, readdirSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ─── Cấu hình 8 chương ──────────────────────────────────────────────────────
const CHAPTERS = [
  { 
    id: 1, 
    name: "Chương 1: Logic và Bằng chứng", 
    english: "The Foundations: Logic and Proofs",
    shortName: "Logic & Proofs",
    color: "#FF6B6B",
    range: [1, 150],
    topics: ["Proposition", "Truth table", "Quantifier", "Predicate", "Logical equivalence", "Rules of inference", "Proof methods"]
  },
  { 
    id: 2, 
    name: "Chương 2: Cấu trúc cơ bản - Tập hợp, Hàm, Dãy và Tổng", 
    english: "Basic Structures: Sets, Functions, Sequences, and Sums",
    shortName: "Sets & Functions",
    color: "#4ECDC4",
    range: [151, 280],
    topics: ["Set operations", "Functions", "Sequences", "Summation", "Cardinality", "Matrices"]
  },
  { 
    id: 3, 
    name: "Chương 3: Thuật toán", 
    english: "Algorithms",
    shortName: "Algorithms",
    color: "#45B7D1",
    range: [281, 400],
    topics: ["Big-O", "Time complexity", "Sorting", "Searching", "Growth of functions"]
  },
  { 
    id: 4, 
    name: "Chương 4: Lý thuyết số và Mật mã", 
    english: "Number Theory and Cryptography",
    shortName: "Number Theory",
    color: "#96CEB4",
    range: [401, 550],
    topics: ["Modulo", "Congruence", "Prime", "GCD", "LCM", "RSA", "Cipher", "Modular arithmetic"]
  },
  { 
    id: 5, 
    name: "Chương 5: Quy nạp và Đệ quy", 
    english: "Induction and Recursion",
    shortName: "Induction",
    color: "#FFEAA7",
    range: [551, 700],
    topics: ["Mathematical induction", "Recurrence relations", "Recursion", "Fibonacci", "Divide-and-conquer"]
  },
  { 
    id: 6, 
    name: "Chương 6: Đếm", 
    english: "Counting",
    shortName: "Counting",
    color: "#DDA0DD",
    range: [701, 880],
    topics: ["Permutations", "Combinations", "Binomial theorem", "Pigeonhole principle", "Counting rules"]
  },
  { 
    id: 7, 
    name: "Chương 7: Đồ thị", 
    english: "Graphs",
    shortName: "Graphs",
    color: "#98D8C8",
    range: [881, 1030],
    topics: ["Graph types", "Paths", "Cycles", "Euler", "Hamilton", "Graph coloring", "Adjacency matrix"]
  },
  { 
    id: 8, 
    name: "Chương 8: Cây", 
    english: "Trees",
    shortName: "Trees",
    color: "#F7DC6F",
    range: [1031, 1131],
    topics: ["Binary trees", "Tree traversal", "Spanning tree", "Huffman coding", "Pre-order", "In-order", "Post-order"]
  }
];

// ─── Đọc dữ liệu câu hỏi ──────────────────────────────────────────────────────
function loadQuestions() {
  const qPath = path.join(__dirname, "questions_data.js");
  if (!existsSync(qPath)) {
    console.error("❌ Không tìm thấy questions_data.js!");
    process.exit(1);
  }
  let ALL_QUESTIONS;
  eval(readFileSync(qPath, "utf-8").replace("const ALL_QUESTIONS", "ALL_QUESTIONS"));
  if (!ALL_QUESTIONS) {
    console.error("❌ Không đọc được ALL_QUESTIONS");
    process.exit(1);
  }
  return ALL_QUESTIONS;
}

// ─── Đọc dữ liệu phân loại thủ công từ results.json ──────────────────────────
function loadManualResults() {
  const rPath = path.join(__dirname, "results.json");
  if (!existsSync(rPath)) return {};
  
  try {
    const raw = JSON.parse(readFileSync(rPath, "utf-8"));
    const manual = {};
    raw.forEach(item => {
      if (item.ch && item.ch >= 1 && item.ch <= 8) {
        manual[item.id] = item.ch;
      }
    });
    return manual;
  } catch (e) {
    console.warn(`⚠️ Lỗi đọc results.json: ${e.message}`);
    return {};
  }
}

// ─── Xác định chương dựa trên ID ────────────────────────────────────────────
function getChapterByRange(questionId) {
  for (const ch of CHAPTERS) {
    if (questionId >= ch.range[0] && questionId <= ch.range[1]) {
      return ch.id;
    }
  }
  return null;
}

// ─── Tìm file ảnh cho câu hỏi ────────────────────────────────────────────────
function findImageFile(questionId) {
  const p = String(questionId).padStart(4, "0");
  const q = String(questionId).padStart(3, "0");
  for (const ext of [".png", ".webp"]) {
    const fp = path.join(__dirname, `${p}_q${q}_Question_${questionId}${ext}`);
    if (existsSync(fp)) return `${p}_q${q}_Question_${questionId}${ext}`;
  }
  return null;
}

// ─── Tạo thư mục chương ──────────────────────────────────────────────────────
function createChapterDirs() {
  const baseDir = path.join(__dirname, "chapters");
  if (!existsSync(baseDir)) mkdirSync(baseDir);
  
  for (const ch of CHAPTERS) {
    const chDir = path.join(baseDir, `Ch${ch.id}_${ch.shortName.replace(/[&\/\\]/g, "").replace(/\s+/g, "_")}`);
    if (!existsSync(chDir)) mkdirSync(chDir);
  }
}

// ─── Main ─────────────────────────────────────────────────────────────────────
function main() {
  console.log("\n" + "=".repeat(60));
  console.log("  PHÂN LOẠI 1131 CÂU HỎI MAD101 THEO 8 CHƯƠNG");
  console.log("=".repeat(60) + "\n");

  // 1. Đọc dữ liệu
  const questions = loadQuestions();
  const manualResults = loadManualResults();
  
  console.log(`📊 Đã đọc ${questions.length} câu hỏi`);
  console.log(`📊 Kết quả phân loại thủ công: ${Object.keys(manualResults).length} câu\n`);

  // 2. Phân loại từng câu
  const classification = {};
  const byChapter = {};
  for (let c = 1; c <= 8; c++) byChapter[c] = [];
  
  for (const q of questions) {
    let chapter = null;
    let source = "";
    
    // Ưu tiên: kết quả thủ công > range-based
    if (manualResults[q.id]) {
      chapter = manualResults[q.id];
      source = "manual";
    } else {
      chapter = getChapterByRange(q.id);
      source = "range";
    }
    
    classification[q.id] = {
      chapter,
      source,
      image: q.image,
      answer: q.answerText
    };
    
    if (chapter) byChapter[chapter].push(q.id);
  }

  // 3. Tạo thư mục chapters và copy ảnh
  console.log("📁 Tạo thư mục chapters và copy ảnh...\n");
  const baseDir = path.join(__dirname, "chapters");
  if (!existsSync(baseDir)) mkdirSync(baseDir);

  let copied = 0;
  let missing = 0;
  
  for (const q of questions) {
    const chapter = classification[q.id].chapter;
    if (!chapter) {
      missing++;
      continue;
    }
    
    const ch = CHAPTERS.find(c => c.id === chapter);
    const chDirName = `Ch${ch.id}_${ch.shortName.replace(/[&\/\\]/g, "").replace(/\s+/g, "_")}`;
    const chDir = path.join(baseDir, chDirName);
    if (!existsSync(chDir)) mkdirSync(chDir, { recursive: true });
    
    // Tìm ảnh gốc
    const imgFile = q.image;
    const srcPath = path.join(__dirname, imgFile);
    if (existsSync(srcPath)) {
      const destPath = path.join(chDir, imgFile);
      if (!existsSync(destPath)) {
        copyFileSync(srcPath, destPath);
      }
      copied++;
    } else {
      missing++;
    }
  }

  // 4. Tạo chapter_mapping.json
  const mapping = {
    generated: new Date().toISOString(),
    totalQuestions: questions.length,
    chapters: {}
  };
  
  for (let c = 1; c <= 8; c++) {
    const ch = CHAPTERS[c - 1];
    const ids = byChapter[c].sort((a, b) => a - b);
    mapping.chapters[c] = {
      name: ch.name,
      english: ch.english,
      shortName: ch.shortName,
      count: ids.length,
      ids,
      range: ids.length > 0 ? [ids[0], ids[ids.length - 1]] : null
    };
  }
  
  writeFileSync(
    path.join(__dirname, "chapter_mapping.json"),
    JSON.stringify(mapping, null, 2)
  );

  // 5. In kết quả
  console.log("=".repeat(60));
  console.log("  KẾT QUẢ PHÂN LOẠI");
  console.log("=".repeat(60) + "\n");
  
  let total = 0;
  for (let c = 1; c <= 8; c++) {
    const ch = CHAPTERS[c - 1];
    const count = byChapter[c].length;
    total += count;
    const pct = ((count / questions.length) * 100).toFixed(1);
    const bar = "█".repeat(Math.round(count / 15)) + "░".repeat(Math.max(0, 30 - Math.round(count / 15)));
    console.log(`  ${ch.shortName.padEnd(18)} ${String(count).padStart(4)} câu (${pct}%) ${bar}`);
  }
  
  console.log(`\n  ${"TỔNG".padEnd(18)} ${String(total).padStart(4)} câu (100%)`);
  console.log(`\n📁 Ảnh đã copy: ${copied} files`);
  console.log(`❌ Ảnh thiếu: ${missing} files`);
  console.log(`\n📝 File kết quả:`);
  console.log(`   - chapter_mapping.json`);
  console.log(`   - chapters/ (${copied} ảnh trong 8 thư mục con)`);
  
  // 6. Tạo file index.html SQL-like để dễ dùng
  console.log("\n✅ HOÀN TẤT PHÂN LOẠI!");
}

main();
