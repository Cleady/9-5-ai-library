/**
 * tools/quiz-build/build_subject_quiz.js
 * 
 * Công cụ tự động hóa chuẩn hóa và cập nhật Quiz từ file .tex vào hệ thống 9.5 AI CLUB / Open Era.
 * Hỗ trợ tham số:
 *   --subject=CEA201 | --subject=DBI202 (mặc định: CEA201)
 *   --dry-run (chỉ phân tích kiểm tra, không ghi file)
 * 
 * Mỗi khi thay file .tex mới vào thư mục môn học, chỉ cần chạy:
 *   node tools/quiz-build/build_subject_quiz.js --subject=<MÃ_MÔN>
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const vm = require('vm');

// --- Cấu hình các môn học ---
const SUBJECTS_CONFIG = {
  CEA201: {
    subjectId: 1,
    code: 'CEA201',
    name: 'Computer Architecture',
    dir: 'document/Practice/Ky_II/CEA201',
    startQuestionId: 1001,
    startQuizId: 1,
    questionIdMin: 1000,
    questionIdMax: 4999,
    icon: 'subject1-icon'
  },
  CSD203: {
    subjectId: 4,
    code: 'CSD203',
    name: 'Data Structures and Algorithms',
    dir: 'document/Practice/Ky_II/CSD203',
    startQuestionId: 10001,
    startQuizId: 301,
    questionIdMin: 10000,
    questionIdMax: 19999,
    icon: 'subject5-icon'
  },
  DBI202: {
    subjectId: 2,
    code: 'DBI202',
    name: 'Database Systems',
    dir: 'document/Practice/Ky_II/DBI202',
    startQuestionId: 5001,
    startQuizId: 101,
    questionIdMin: 5000,
    questionIdMax: 9999,
    icon: 'subject4-icon'
  },
  JPD113: {
    subjectId: 8,
    code: 'JPD113',
    name: 'Elementary Japanese 1- A1.1',
    dir: 'document/Practice/Ky_II/JPD113',
    startQuestionId: 60001,
    startQuizId: 701,
    questionIdMin: 60000,
    questionIdMax: 69999,
    icon: 'subject8-icon'
  },
  AIG202C: {
    subjectId: 9,
    code: 'AIG202c',
    name: 'Artificial Intelligence Foundation IBM',
    dir: 'document/Practice/Ky_II/AIG202c',
    startQuestionId: 70001,
    startQuizId: 801,
    questionIdMin: 70000,
    questionIdMax: 79999,
    icon: 'subject9-icon'
  }
};

// Đọc tham số dòng lệnh
const args = process.argv.slice(2);
let subjectArg = 'CEA201';
let isDryRun = false;

args.forEach(arg => {
  if (arg.startsWith('--subject=')) {
    subjectArg = arg.split('=')[1].trim().toUpperCase();
  } else if (arg === '--dry-run') {
    isDryRun = true;
  }
});

const config = SUBJECTS_CONFIG[subjectArg];
if (!config) {
  console.error(`[ERROR] Môn học "${subjectArg}" chưa được cấu hình. Danh sách hỗ trợ: ${Object.keys(SUBJECTS_CONFIG).join(', ')}`);
  process.exit(1);
}

const rootDir = path.resolve(__dirname, '../..');
const subjectDir = path.join(rootDir, config.dir);

if (!fs.existsSync(subjectDir)) {
  console.error(`[ERROR] Không tìm thấy thư mục môn học: ${subjectDir}`);
  process.exit(1);
}

// Tìm file .tex nguồn (ưu tiên file chứa "Ultra_Edition" hoặc bất kỳ file .tex nào)
const texFiles = fs.readdirSync(subjectDir).filter(f => f.endsWith('.tex'));
if (texFiles.length === 0) {
  console.error(`[ERROR] Không tìm thấy file .tex nào trong ${subjectDir}`);
  process.exit(1);
}

let targetTex = texFiles.find(f => f.toLowerCase().includes('ultra_edition')) || texFiles[0];
const texFilePath = path.join(subjectDir, targetTex);

console.log(`====================================================`);
console.log(`Open Era Quiz Builder — Subject: ${config.code}`);
console.log(`File nguồn .tex: ${path.relative(rootDir, texFilePath)}`);
if (isDryRun) console.log(`[CHẾ ĐỘ DRY-RUN] Không ghi đè file`);
console.log(`====================================================\n`);

const content = fs.readFileSync(texFilePath, 'utf8');

/**
 * Chuyển đổi môi trường tabular của LaTeX thành bảng Markdown
 */
function convertTabularToMarkdown(tex) {
  if (!tex) return '';
  let res = tex.replace(/\\renewcommand\{\\arraystretch\}\{[^{}]*\}/g, '');
  res = res.replace(/\\begin\{tabular\}\{[^{}]*\}([\s\S]*?)\\end\{tabular\}/g, (m, tabContent) => {
    const lines = tabContent.split(/\\\\/).map(l => l.trim()).filter(Boolean);
    const rows = [];
    for (const line of lines) {
      const cleanedLine = line.replace(/\\hline/g, '').trim();
      if (!cleanedLine) continue;
      const cells = cleanedLine.split('&').map(c => cleanTexWithMath(c.trim()));
      rows.push(cells);
    }
    if (rows.length === 0) return '';
    const maxCols = Math.max(...rows.map(r => r.length));
    for (const r of rows) {
      while (r.length < maxCols) r.push('');
    }
    const mdLines = [];
    mdLines.push('| ' + rows[0].join(' | ') + ' |');
    mdLines.push('| ' + rows[0].map(() => ':---:').join(' | ') + ' |');
    for (let i = 1; i < rows.length; i++) {
      mdLines.push('| ' + rows[i].join(' | ') + ' |');
    }
    return '\n\n' + mdLines.join('\n') + '\n\n';
  });
  res = res.replace(/\\begin\{center\}/g, '').replace(/\\end\{center\}/g, '');
  return res;
}

/**
 * Làm sạch chuỗi TeX và bảo vệ công thức toán cho MathJax
 */
function cleanTexWithMath(str) {
  if (!str) return '';
  let s = str;

  // Sửa lỗi OCR typo đặc thù nếu có (ví dụ: ident$' -> identify)
  s = s.replace(/ident\$'/g, 'identify');

  // Chuẩn hóa điền vào chỗ trống dạng \underline{\hspace{...}} thành _________
  s = s.replace(/\\underline\{\\hspace\*?\{[^{}]*\}\}/g, '_________');

  // 1. Loại bỏ \includegraphics hoặc includegraphics
  s = s.replace(/\\?includegraphics(?:\[[^\]]*\])?\{?[^}\n\r]*/gi, '');

  // 1b. Chuẩn hóa và làm sạch bảng beginarray nếu có
  s = s.replace(/\\?\s*\[?\s*\\?\s*beginarray[\s\S]*?\\?\s*endarray\s*\\?\s*\]?/gi, match => {
    if (match.includes('textXOR')) {
      return '\n```text\n  0 1 1 1 0 1 1 0\nXOR 1 1 0 1 1 1 1 1\n-----------------\n  1 0 1 0 1 0 0 1\n```\n';
    }
    if (match.includes('Đầu vào') || match.includes('Input')) {
      return '\n\n| Đầu vào (Input) | Đầu ra (Output) |\n| :---: | :---: |\n| 0 | 1 |\n| 1 | 0 |\n\n';
    }
    if (match.includes('textIn') || match.includes('textOut')) {
      return '\n\n| In (Đầu vào) | Out (Đầu ra) |\n| :---: | :---: |\n| 0 | 1 |\n| 1 | 0 |\n\n';
    }
    return '';
  });
  s = s.replace(/\[?\s*\\?\s*beginarray\b/gi, '');

  // 2. Bảo vệ literal \$
  s = s.replace(/\\\$/g, '__LITERAL_DOLLAR__');

  // 3. Bảo vệ các khối toán học: \(...\), \[...\], $$...$$, $...$
  const mathBlocks = [];
  s = s.replace(/\\\(([\s\S]*?)\\\)/g, (m, mathContent) => {
    const idx = mathBlocks.length;
    mathBlocks.push(mathContent.trim());
    return `__MATH_PLACEHOLDER_${idx}__`;
  });
  s = s.replace(/\\\[([\s\S]*?)\\\]/g, (m, mathContent) => {
    const idx = mathBlocks.length;
    mathBlocks.push(mathContent.trim());
    return `__MATH_PLACEHOLDER_${idx}__`;
  });
  s = s.replace(/\$\$([\s\S]*?)\$\$/g, (m, mathContent) => {
    const idx = mathBlocks.length;
    mathBlocks.push(mathContent.trim());
    return `__MATH_PLACEHOLDER_${idx}__`;
  });
  s = s.replace(/\$([^$\n\r]+)\$/g, (m, mathContent) => {
    if (/^\d[\d,.]*$/.test(mathContent.trim())) {
      return `$${mathContent}`;
    }
    const idx = mathBlocks.length;
    mathBlocks.push(mathContent.trim());
    return `__MATH_PLACEHOLDER_${idx}__`;
  });

  // Bóc tách textbackslash nếu còn sót lại
  s = s.replace(/\\?textbackslash\b\s*/g, ' ');
  s = s.replace(/\\backslash\b\s*/g, ' \\ ');
  s = s.replace(/\\leftarrow\b/g, '←');
  s = s.replace(/\\rightarrow\b/g, '→');

  // Xử lý bare textcolor bị lỗi cú pháp
  s = s.replace(/\\?textcolor\{[a-zA-Z0-9_-]+\{((?:[^{}]|\{(?:[^{}]|\{[^{}]*\})*\})*)\}\}/g, '$1');

  // 4. Đệ quy bóc tách các macro định dạng lồng nhau
  const formattingMacros = 'textbf|texttt|textit|textsf|textsc|emph|underline|mbox|mathrm|mathbf|mathit|operatorname';
  let prev;
  let it = 0;
  while (s !== prev && it < 10) {
    prev = s;
    it++;
    s = s.replace(/\\?textcolor\{([^{}]*)\}\{((?:[^{}]|\{(?:[^{}]|\{[^{}]*\})*\})*)\}/g, '$2');
    s = s.replace(new RegExp(`\\\\?(?:${formattingMacros})\\{((?:[^{}]|\\{(?:[^{}]|\\{[^{}]*\\})*\\})*)\\}`, 'g'), '$1');
  }

  // Dọn sạch các tên macro bị bỏ rơi hoặc thiếu ngoặc
  s = s.replace(/\\?textcolor\{[^{}]*\}\s*/g, '');
  s = s.replace(new RegExp(`\\\\?(?:${formattingMacros})\\b\\s*`, 'g'), '');
  s = s.replace(new RegExp(`\\\\?(?:${formattingMacros})([A-Z])`, 'g'), '$1');
  s = s.replace(/\\color\{[^{}]*\}\s*/g, '');
  s = s.replace(/\\color\b[a-zA-Z]*\s*/g, '');
  s = s.replace(/\\definecolor\{[^{}]*\}\{[^{}]*\}\{[^{}]*\}\s*/g, '');
  s = s.replace(/\\tcblower\b\s*/g, '');
  s = s.replace(/\\hrule\b\s*/g, '');
  s = s.replace(/\\par\b\s*/g, ' ');
  s = s.replace(/\\noindent\b\s*/g, '');
  s = s.replace(/\\vspace\*?\{[^{}]*\}\s*/g, '');
  s = s.replace(/\\hspace\*?\{[^{}]*\}\s*/g, '');

  // 5. Chuẩn hóa khoảng trắng và ký tự escape đặc thù của LaTeX
  s = s.replace(/\\(?:,|;|!|quad|qquad|enspace|smallskip|medskip|bigskip)\b/g, ' ');
  s = s.replace(/\\(?:&|%|#|_|\{|\})/g, token => ({
    '\\&': '&', '\\%': '%', '\\#': '#', '\\_': '_', '\\{': '{', '\\}': '}'
  }[token]));
  s = s.replace(/\\newline|\\\\/g, '\n');
  s = s.replace(/``/g, '"').replace(/''/g, '"');

  // 7. Xóa các macro cỡ chữ
  s = s.replace(/\\(?:small|large|Large|huge|Huge|normalsize)\b/g, '');

  // 8. Xóa ngoặc nhọn thừa còn lại trong văn bản thường
  s = s.replace(/[{}]/g, '');

  // 9. Phục hồi literal dollar
  s = s.replace(/__LITERAL_DOLLAR__/g, '$');

  // 10. Chuẩn hóa khoảng trắng
  s = s.replace(/[ \t]+/g, ' ');
  s = s.replace(/\n\s*\n+/g, '\n\n');
  s = s.trim();

  // 11. Phục hồi các khối toán học với ký hiệu an toàn cho MathJax: \( ... \)
  s = s.replace(/__MATH_PLACEHOLDER_(\d+)__/g, (m, idx) => {
    return `\\(${mathBlocks[parseInt(idx, 10)]}\\)`;
  });

  return s;
}

// 1. Bóc tách danh sách chương
const hasChapters = /\\chapter\{/.test(content);
const chapterPattern = hasChapters 
  ? /\\chapter\*?(?:\{[^{}]+\})?\{([^}]+)\}|\\chapter\*?\{([^}]+)\}/g 
  : /\\section\*?(?:\{[^{}]+\})?\{([^}]+)\}|\\section\*?\{([^}]+)\}/g;
const chapters = [];
let sm;
while ((sm = chapterPattern.exec(content)) !== null) {
  const fullTitle = cleanTexWithMath(sm[1] || sm[2]);
  const numMatch = fullTitle.match(/(?:Chapter|Chương)\s+(\d+)/i) || fullTitle.match(/^(\d+)\.\s*/);
  const num = numMatch ? parseInt(numMatch[1], 10) : (chapters.length + 1);
  const cleanTitle = fullTitle.replace(/^(?:(?:Chapter|Chương)\s+\d+:?|\d+\.)\s*/i, '');
  chapters.push({
    num,
    title: cleanTitle,
    rawTitle: fullTitle,
    index: sm.index
  });
}

console.log(`[1] Đã tìm thấy ${chapters.length} chương.`);

// 2. Bóc tách danh sách câu hỏi
const isChoicesFormat = content.includes('\\begin{choices}');
const isEnvironmentFormat = !isChoicesFormat && content.includes('\\begin{question}');
const isCauHoiFormat = content.includes('\\begin{cauhoi}');
const isItemizeQuestionFormat = !isChoicesFormat && !isEnvironmentFormat && !isCauHoiFormat && /\\textbf\{Question\s+\d+:?\}/i.test(content);
const rawQuestions = [];

if (isChoicesFormat) {
  // Format CSD203: \begin{question}{num} ... \begin{choices} ... \end{choices}
  console.log(`    (Định dạng phát hiện: Môi trường \\begin{question} kèm \\begin{choices})`);
  const qRegex = /\\begin\{question\}\{([^}]+)\}([\s\S]*?)\\end\{question\}/g;
  let qm;
  while ((qm = qRegex.exec(content)) !== null) {
    const qNum = qm[1].trim();
    const body = qm[2];
    const qPos = qm.index;

    const chIndex = chapters.findIndex((c, i) => {
      const nextCh = chapters[i + 1];
      return qPos >= c.index && (!nextCh || qPos < nextCh.index);
    });
    const chapter = chapters[chIndex >= 0 ? chIndex : 0];

    const cs = body.indexOf('\\begin{choices}');
    const ce = body.indexOf('\\end{choices}');
    if (cs === -1 || ce === -1) {
      console.error(`[LỖI] Không tìm thấy choices trong câu hỏi ${qNum}`);
      continue;
    }

    let promptRaw = body.substring(0, cs);
    promptRaw = promptRaw.replace(/^[\t ]*%[^\r\n]*/gm, '');

    promptRaw = promptRaw.replace(/\\begin\{codebox\}([\s\S]*?)\\end\{codebox\}/g, (_, code) => '\n' + code.trim() + '\n');
    promptRaw = promptRaw.replace(/\\begin\{center\}([\s\S]*?)\\end\{center\}/g, (b) => b.includes('tikzpicture') ? '' : b);
    promptRaw = promptRaw.replace(/\\begin\{tikzpicture\}[\s\S]*?\\end\{tikzpicture\}/g, '');

    const choicesBody = body.substring(cs + '\\begin{choices}'.length, ce);
    const rawChoices = choicesBody.split(/\\choice\b/).map(s => s.trim()).filter(s => s.length > 0);
    const options = rawChoices.map(opt => cleanTexWithMath(opt));

    const afterChoices = body.substring(ce + '\\end{choices}'.length);
    const ansMatch = afterChoices.match(/\\textbf\{Đáp án:\}\s*([A-Za-z]+)/i);
    let answerLetter = ansMatch ? ansMatch[1].trim().toUpperCase() : 'A';
    const correctIndex = answerLetter.charCodeAt(0) - 65;
    const correctIndices = answerLetter.length > 1
      ? answerLetter.split('').map(c => c.charCodeAt(0) - 65).filter(i => i >= 0 && i < options.length)
      : undefined;

    let explanation = '';
    const expMatch = afterChoices.match(/\\textbf\{Giải thích:\}\s*([\s\S]*?)$/i);
    if (expMatch) {
      explanation = cleanTexWithMath(expMatch[1]);
    }
    if (answerLetter.length > 1) {
      explanation = `**Đáp án đúng**: ${answerLetter.split('').join(' & ')}\n\n` + explanation;
    }

    rawQuestions.push({
      rawQNum: qNum,
      chapterIndex: chIndex,
      chapterNum: chapter.num,
      chapterTitle: chapter.title,
      text: cleanTexWithMath(promptRaw),
      options,
      answerLetter,
      correctIndex: correctIndices && correctIndices.length > 0 ? correctIndices[0] : correctIndex,
      correctIndices: correctIndices && correctIndices.length > 1 ? correctIndices : undefined,
      explanation
    });
  }
} else if (isItemizeQuestionFormat) {
  // Format CEA201: \textbf{Question X:} ... \begin{itemize} ... \end{itemize}
  console.log(`    (Định dạng phát hiện: \\textbf{Question} kèm \\begin{itemize})`);
  let existingQuestions = [];
  const existingJsonPath = path.join(subjectDir, 'questions.json');
  if (fs.existsSync(existingJsonPath)) {
    try {
      const parsedJson = JSON.parse(fs.readFileSync(existingJsonPath, 'utf8'));
      existingQuestions = parsedJson.questions || [];
    } catch (e) {}
  }

  function norm(str) {
    return str.toLowerCase()
      .replace(/_{2,}/g, '___')
      .replace(/[^a-z0-9]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  // Khởi tạo map cho các câu giải thích đặc thù / mới sửa
  const specialExplanations = {
    "205": `**Giải thích**: \n\n **Hướng giải**: Cấu trúc sản xuất vi mạch & Tích hợp bán dẫn thuộc Chapter 01: Basic Concepts and Computer Evolution (Giáo trình William Stallings COA 11th Edition). \n\n **Các bước phân tích**:\n\n- Dữ kiện câu hỏi: "A wafer is made of silicon and is broken up into chips which consists of many gates and/or memory cells plus a number of input and output attachment points.".\n- Trong quy trình sản xuất bán dẫn, một tấm wafer mỏng làm từ silicon nguyên chất sau khi quang khắc sẽ được cắt thành hàng trăm chip riêng biệt. Mỗi chip chứa hàng triệu cổng logic (gates) và/hoặc ô nhớ (memory cells) cùng các điểm tiếp xúc chân vào/ra (I/O pads).\n- Mệnh đề trên phản ánh hoàn toàn chính xác định nghĩa kỹ thuật của wafer và chip trong giáo trình.\n\n **Kiểm tra**: Chọn A. True \n\n **Xuất hiện trong**: Giáo trình COA 11th Edition - Chapter 01: Basic Concepts and Computer Evolution`,

    "96": `**Giải thích**: \n\n **Hướng giải**: Hệ thống phân cấp bộ nhớ & Cơ chế Cache Hit/Miss thuộc Chapter 04: The Memory Hierarchy Locality and Performance (Giáo trình William Stallings COA 11th Edition). \n\n **Các bước phân tích**:\n\n- Dữ kiện câu hỏi: "In reference to access time to a two-level memory, a _________ occurs if an accessed word is found in the faster memory.".\n- Khi bộ xử lý truy cập một từ nhớ trong hệ thống phân cấp hai mức (ví dụ Cache và Main Memory): Nếu từ nhớ được tìm thấy ngay trong bộ nhớ nhanh hơn (faster memory, tức Cache), sự kiện đó được gọi là **hit** (trúng). Ngược lại, nếu không tìm thấy và phải truy cập bộ nhớ chậm hơn, gọi là **miss** (trượt).\n- Do đó, từ cần điền chính xác vào chỗ trống là hit.\n\n **Kiểm tra**: Chọn B. hit \n\n **Vì sao các phương án khác sai**:\n\n- A (miss): Xảy ra khi dữ liệu KHÔNG được tìm thấy trong bộ nhớ nhanh.\n- C (line): Đơn vị khối dữ liệu (cache line) được chuyển giao giữa các mức bộ nhớ.\n- D (tag): Thẻ địa chỉ dùng để nhận diện khối dữ liệu trong cache.\n\n **Xuất hiện trong**: Giáo trình COA 11th Edition - Chapter 04: The Memory Hierarchy Locality and Performance`,

    "104": `**Giải thích**: \n\n **Hướng giải**: Lập trình Hợp ngữ & Ngắt hệ thống x86 (DOS Interrupt 21h) thuộc Chapter 15: Assembly Language and Related Topics (Giáo trình William Stallings COA 11th Edition). \n\n **Các bước phân tích**:\n\n- Dữ kiện câu hỏi: Chức năng của hàm ngắt "INT 21h / AH=1".\n- Trong hệ thống ngắt DOS x86, khi gọi INT 21h với thanh ghi AH = 01h, chức năng được thực thi là Single-key character input with echo (đọc một ký tự từ bàn phím/standard input, hiển thị lên màn hình console) và mã ASCII của ký tự đọc được sẽ được lưu vào thanh ghi AL.\n- Khi đối chiếu các phương án, đáp án B mô tả hoàn toàn chuẩn xác chức năng và thanh ghi đích.\n\n **Kiểm tra**: Chọn B. read character from standard input, with echo, result is stored in AL. \n\n **Vì sao các phương án khác sai**:\n\n- A: Ghi (write) ký tự là sai chức năng (hàm ghi là AH=02h).\n- C & D: Kết quả ký tự đọc được trả về thanh ghi AL, không phải AH (AH là thanh ghi truyền mã hàm ngắt).\n\n **Xuất hiện trong**: Giáo trình COA 11th Edition - Chapter 15: Assembly Language and Related Topics`,

    "219": `**Giải thích**: \n\n **Hướng giải**: Kiến trúc tập lệnh RISC (Load-and-Store architecture) thuộc Chapter 17: Reduced Instruction Set Computers (RISC) (Giáo trình William Stallings COA 11th Edition). \n\n **Các bước phân tích**:\n\n- Dữ kiện câu hỏi: "_________ instructions are used to position quantities in registers temporarily for computational operations.".\n- Trong kiến trúc RISC và các bộ vi xử lý hiện đại, các phép toán số học và logic chỉ thực hiện trực tiếp trên thanh ghi (register-to-register). Các lệnh Load (nạp từ bộ nhớ vào thanh ghi) và Store (lưu từ thanh ghi ra bộ nhớ) - gọi là cơ chế Load-and-store - được sử dụng để định vị dữ liệu tạm thời trong thanh ghi cho các tác vụ tính toán.\n- Khi đối chiếu các phương án đưa ra, đáp án chuẩn xác là A. Load-and-store.\n\n **Kiểm tra**: Chọn A. Load-and-store \n\n **Vì sao các phương án khác sai**:\n\n- B (Branch): Lệnh rẽ nhánh điều khiển luồng thực thi (PC).\n- C (Arithmetic): Lệnh số học thực thi tính toán trên thanh ghi.\n- D (Shift): Lệnh dịch bit thao tác trên thanh ghi.\n\n **Xuất hiện trong**: Giáo trình COA 11th Edition - Chapter 17: Reduced Instruction Set Computers (RISC)`,

    "426": `**Giải thích**: \n\n **Hướng giải**: Thiết kế Mạch số & Đại số Boolean thuộc Chapter 12: Digital Logic (Giáo trình William Stallings COA 11th Edition). \n\n **Các bước phân tích**:\n\n- Dữ kiện câu hỏi: Bảng Karnaugh map với các biến đầu vào CD (hàng) và AB (cột).\n- Các ô có giá trị 1 nằm tại các tổ hợp biến được chỉ định, tương ứng biểu diễn chuẩn SOP (Sum of Products).\n- Xác định biểu thức chính tắc tổng của các minterm (Canonical Sum-of-Products) tương ứng với các ô mang giá trị 1.\n\n **Kiểm tra**: Chọn B \n\n **Xuất hiện trong**: Giáo trình COA 11th Edition - Chapter 12: Digital Logic`
  };

  const qPattern = /\\textbf\{Question\s+(\d+):?\}\s*([\s\S]*?)\\begin\{itemize\}([\s\S]*?)\\end\{itemize\}/gi;
  let qm;
  while ((qm = qPattern.exec(content)) !== null) {
    const qNum = parseInt(qm[1], 10);
    let promptRaw = qm[2].trim();
    const optionsBlock = qm[3];
    const qPos = qm.index;

    const chIndex = chapters.findIndex((c, i) => {
      const nextCh = chapters[i + 1];
      return qPos >= c.index && (!nextCh || qPos < nextCh.index);
    });
    const chapter = chapters[chIndex >= 0 ? chIndex : 0];

    // Chuyển đổi bảng tabular trước khi làm sạch chuỗi
    promptRaw = convertTabularToMarkdown(promptRaw);
    promptRaw = promptRaw.replace(/\\underline\{\\hspace\*?\{[^{}]*\}\}/g, '_________');
    const promptText = cleanTexWithMath(promptRaw);

    const itemMatches = [...optionsBlock.matchAll(/\\item(?:\s*\[([^\]]*)\])?\s*([\s\S]*?)(?=(?:\\item|$))/g)];
    const options = [];
    let correctIndex = -1;
    const correctIndices = [];

    itemMatches.forEach((im, idx) => {
      const label = im[1] || '';
      const rawOpt = im[2];

      const isCorrect = rawOpt.includes('textcolor{red}') || rawOpt.includes('correctcolor') || label.includes('textcolor{red}');
      if (isCorrect) {
        correctIndices.push(idx);
        if (correctIndex === -1) correctIndex = idx;
      }
      let cleanedOpt = cleanTexWithMath(rawOpt).trim();
      options.push(cleanedOpt);
    });

    if (correctIndex === -1 && correctIndices.length > 0) {
      correctIndex = correctIndices[0];
    }

    const promptNorm = norm(promptText);
    const matchedOld = existingQuestions.find(eq => {
      const oldNorm = norm(eq.text);
      return oldNorm === promptNorm ||
             (promptNorm.length > 20 && oldNorm.includes(promptNorm.slice(0, 30))) ||
             (oldNorm.length > 20 && promptNorm.includes(oldNorm.slice(0, 30)));
    });

    let explanation = '';
    if (specialExplanations[String(qNum)]) {
      explanation = specialExplanations[String(qNum)];
    } else if (matchedOld && matchedOld.explanation) {
      explanation = cleanTexWithMath(matchedOld.explanation);
    } else {
      const correctLetter = String.fromCharCode(65 + Math.max(0, correctIndex));
      const correctText = options[correctIndex] || '';
      explanation = `**Giải thích**: \n\n **Đáp án đúng**: **${correctLetter}. ${correctText}**\n\n **Cơ sở lý thuyết**: Nội dung câu hỏi thuộc giáo trình William Stallings COA 11th Edition (${chapter.rawTitle}).`;
    }

    // Nếu câu hỏi có nhiều đáp án đúng, bổ sung danh sách đáp án vào giải thích
    if (correctIndices.length > 1) {
      const letters = correctIndices.map(i => String.fromCharCode(65 + i));
      if (!explanation.includes('Đáp án đúng')) {
        explanation = `**Đáp án đúng**: ${letters.join(' & ')}\n\n` + explanation;
      }
    }

    rawQuestions.push({
      rawQNum: qNum,
      chapterIndex: chIndex,
      chapterNum: chapter.num,
      chapterTitle: chapter.title,
      text: promptText,
      options,
      correctIndex: Math.max(0, correctIndex),
      correctIndices: correctIndices.length > 1 ? correctIndices : undefined,
      explanation
    });
  }
} else {
  console.error(`[ERROR] Không xác định được định dạng câu hỏi trong file .tex!`);
  process.exit(1);
}

console.log(`[2] Đã bóc tách ${rawQuestions.length} câu hỏi.`);

// Thống kê số câu theo từng chương
const chapterCounts = {};
rawQuestions.forEach(q => {
  chapterCounts[q.chapterIndex] = (chapterCounts[q.chapterIndex] || 0) + 1;
});

// Xây dựng danh sách Quizzes mới
const newQuizzes = chapters.map((ch, idx) => {
  const count = chapterCounts[idx] || 0;
  const durationMin = Math.max(5, Math.round(count * 1.5));
  return {
    id: config.startQuizId + idx,
    subjectId: config.subjectId,
    title: `Chương ${ch.num} – ${ch.title}`,
    order: idx + 1,
    durationMin,
    difficulty: 'Medium',
    questionCount: count
  };
});

// Xây dựng danh sách Questions mới với ID chuẩn
let nextQId = config.startQuestionId;
const newQuestions = rawQuestions.map(q => {
  const quizId = config.startQuizId + q.chapterIndex;
  const item = {
    id: nextQId++,
    quizId,
    text: q.text,
    options: q.options,
    correctIndex: q.correctIndex,
    explanation: q.explanation
  };
  if (q.correctIndices && q.correctIndices.length > 1) {
    item.correctIndices = q.correctIndices;
  }
  return item;
});

// Kiểm định chất lượng dữ liệu
let validationErrors = 0;
newQuizzes.forEach(quiz => {
  if (quiz.questionCount === 0) {
    console.error(`  [LỖI] Quiz ${quiz.id} ("${quiz.title}") không có câu hỏi nào!`);
    validationErrors++;
  }
});

newQuestions.forEach(q => {
  if (!q.text) {
    console.error(`  [LỖI] Câu hỏi ID ${q.id} bị rỗng nội dung!`);
    validationErrors++;
  }
  if (!q.options || q.options.length < 2) {
    console.error(`  [LỖI] Câu hỏi ID ${q.id} có ít hơn 2 phương án!`);
    validationErrors++;
  }
  if (q.correctIndex < 0 || q.correctIndex >= q.options.length) {
    console.error(`  [LỖI] Câu hỏi ID ${q.id} chỉ số đáp án đúng ${q.correctIndex} ngoài phạm vi (số phương án: ${q.options.length})!`);
    validationErrors++;
  }
  if (!q.explanation) {
    console.error(`  [LỖI] Câu hỏi ID ${q.id} thiếu giải thích chi tiết!`);
    validationErrors++;
  }
});

if (validationErrors > 0) {
  console.error(`\n[THẤT BẠI] Phát hiện ${validationErrors} lỗi kiểm định. Dừng tiến trình ghi file.`);
  process.exit(1);
}

console.log(`[3] Kiểm định dữ liệu: 0 LỖI (100% câu hỏi và phương án hợp lệ).`);

// In bảng tóm tắt
console.log(`\nDanh sách các chương/quiz được xây dựng:`);
newQuizzes.forEach(q => {
  console.log(`  Quiz ${String(q.id).padStart(3, ' ')}: ${q.title.padEnd(80, ' ')} | ${String(q.questionCount).padStart(3, ' ')} câu | ${q.durationMin} phút`);
});

if (isDryRun) {
  console.log(`\n[DRY RUN HOÀN TẤT] Không có thay đổi nào được ghi vào file.`);
  process.exit(0);
}

// 4. Xuất file questions.json trong thư mục môn học
const standaloneJsonPath = path.join(subjectDir, 'questions.json');
fs.writeFileSync(standaloneJsonPath, JSON.stringify({
  subject: config.code,
  updatedAt: new Date().toISOString(),
  totalQuizzes: newQuizzes.length,
  totalQuestions: newQuestions.length,
  quizzes: newQuizzes,
  questions: newQuestions
}, null, 2), 'utf8');
console.log(`\n[4] Đã xuất file tham khảo: ${path.relative(rootDir, standaloneJsonPath)}`);

// 5. Cập nhật trực tiếp vào js/practice-data.js
const practiceDataPath = path.join(rootDir, 'js/practice-data.js');
const practiceDataContent = fs.readFileSync(practiceDataPath, 'utf8');

const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(practiceDataContent, sandbox);
const currentData = sandbox.window.Lib95.practice.data;

// Đảm bảo môn học có trong danh sách subjects
let existingSubject = currentData.subjects.find(s => s.id === config.subjectId);
if (!existingSubject) {
  currentData.subjects.push({
    id: config.subjectId,
    name: config.name,
    title: config.code,
    icon: config.icon || `subject${config.subjectId}-icon`
  });
  currentData.subjects.sort((a, b) => a.id - b.id);
} else {
  existingSubject.name = config.name;
  existingSubject.title = config.code;
  if (config.icon) existingSubject.icon = config.icon;
}

// Lọc bỏ quizzes cũ của môn này
const retainedQuizzes = currentData.quizzes.filter(q => q.subjectId !== config.subjectId);
// Gộp quizzes mới và sắp xếp
const updatedQuizzes = [...retainedQuizzes, ...newQuizzes].sort((a, b) => {
  if (a.subjectId !== b.subjectId) return a.subjectId - b.subjectId;
  return a.order - b.order;
});

// Lọc bỏ questions cũ của môn này
const oldQuizIdsSet = new Set(currentData.quizzes.filter(q => q.subjectId === config.subjectId).map(q => q.id));
const retainedQuestions = currentData.questions.filter(q => {
  if (oldQuizIdsSet.has(q.quizId)) return false;
  if (config.questionIdMin && config.questionIdMax && q.id >= config.questionIdMin && q.id <= config.questionIdMax) return false;
  return true;
});

const updatedQuestions = [...retainedQuestions, ...newQuestions].sort((a, b) => a.id - b.id);

currentData.quizzes = updatedQuizzes;
currentData.questions = updatedQuestions;

const newPracticeDataJs = `;(function () {
  'use strict';
  window.Lib95 = window.Lib95 || {};
  window.Lib95.practice = window.Lib95.practice || {};
  
  window.Lib95.practice.data = ${JSON.stringify(currentData, null, 2)};
})();
`;

fs.writeFileSync(practiceDataPath, newPracticeDataJs, 'utf8');
console.log(`[5] Đã cập nhật ${path.relative(rootDir, practiceDataPath)}:`);
console.log(`    - Tổng Quizzes: ${updatedQuizzes.length} (Môn ${config.code}: ${newQuizzes.length})`);
console.log(`    - Tổng Questions: ${updatedQuestions.length} (Môn ${config.code}: ${newQuestions.length})`);

// 6. Đồng bộ chỉ mục tìm kiếm quizzes-index.json
console.log(`\n[6] Đang đồng bộ chỉ mục tìm kiếm qua tools/build-quiz-index.js...`);
const buildIndexScript = path.join(rootDir, 'tools/build-quiz-index.js');
try {
  const output = execSync(`node "${buildIndexScript}"`, { cwd: rootDir, encoding: 'utf8' });
  console.log(output.trim());
} catch (err) {
  console.error(`[ERROR] Lỗi khi chạy build-quiz-index.js:`, err.message);
}

console.log(`\n====================================================`);
console.log(`HOÀN TẤT CHUẨN HÓA VÀ CẬP NHẬT MÔN ${config.code}!`);
console.log(`====================================================\n`);
