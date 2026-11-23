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
  res = res.replace(/\\begin\{tabular\}\s*\{[^{}]*(?:\{[^{}]*\}[^{}]*)*\}([\s\S]*?)\\end\{tabular\}/g, (m, tabContent) => {
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

  // 0. Bảo vệ các khối markdown code block
  const codeBlocks = [];
  s = s.replace(/```[a-z0-9_-]*\n?[\s\S]*?```/g, m => {
    const idx = codeBlocks.length;
    codeBlocks.push(m);
    return `__CODE_BLOCK_PLACEHOLDER_${idx}__`;
  });

  // Sửa lỗi OCR typo đặc thù nếu có (ví dụ: ident$' -> identify)
  s = s.replace(/ident\$'/g, 'identify');

  // Chuẩn hóa điền vào chỗ trống dạng \underline{\hspace{...}} thành _________
  s = s.replace(/\\underline\{\\hspace\*?\{[^{}]*\}\}/g, '_________');

  // 1. Loại bỏ \includegraphics hoặc includegraphics
  s = s.replace(/\\?includegraphics(?:\[[^\]]*\])?\{?[^}\n\r]*/gi, '');

  // 1a. Loại bỏ các thẻ html thô nếu còn sót lại như <pre>, </pre>, <code>, </code>
  s = s.replace(/<\/?(?:pre|code)>/gi, '');

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

  // 12. Phục hồi các khối markdown code block
  s = s.replace(/__CODE_BLOCK_PLACEHOLDER_(\d+)__/g, (m, idx) => {
    return codeBlocks[parseInt(idx, 10)];
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

    // Trích xuất ID ổn định từ comment: % [ID: 10001]
    const idM = body.match(/%\s*\[ID:\s*(\d+)\]/i);
    const qId = idM ? parseInt(idM[1], 10) : undefined;

    // Trích xuất hình ảnh nếu có: \includegraphics{...}
    const imgM = body.match(/\\includegraphics(?:\[[^\]]*\])?\{([^}]+)\}/);
    let diagrams = undefined;
    if (imgM) {
      const fileName = path.basename(imgM[1].trim());
      const src = `/assets/images/practice/csd203/${fileName}`;
      const altM = body.match(/\\figdesc\{([^}]+)\}/);
      diagrams = [{
        src,
        alt: altM ? altM[1].trim() : 'Sơ đồ câu hỏi'
      }];
    }

    let promptRaw = body.substring(0, cs);
    promptRaw = promptRaw.replace(/^[\t ]*%[^\r\n]*/gm, '');

    promptRaw = convertTabularToMarkdown(promptRaw);
    promptRaw = promptRaw.replace(/\\begin\{codebox\}([\s\S]*?)\\end\{codebox\}/g, (_, code) => '\n```python\n' + code.trim() + '\n```\n');
    promptRaw = promptRaw.replace(/\\begin\{verbatim\}([\s\S]*?)\\end\{verbatim\}/g, (_, code) => '\n```python\n' + code.trim() + '\n```\n');
    promptRaw = promptRaw.replace(/<pre>([\s\S]*?)<\/pre>/gi, (_, code) => '\n```python\n' + code.trim() + '\n```\n');
    promptRaw = promptRaw.replace(/\\begin\{center\}([\s\S]*?)\\end\{center\}/g, (b) => (b.includes('tikzpicture') || b.includes('includegraphics')) ? '' : b);
    promptRaw = promptRaw.replace(/\\begin\{tikzpicture\}[\s\S]*?\\end\{tikzpicture\}/g, '');
    promptRaw = promptRaw.replace(/\\figdesc\{[^}]*\}/g, '');

    const choicesBody = body.substring(cs + '\\begin{choices}'.length, ce);
    const rawChoices = choicesBody.split(/\\choice\b/).map(s => s.trim()).filter(s => s.length > 0);
    const options = rawChoices.map(opt => cleanTexWithMath(opt));

    const afterChoices = body.substring(ce + '\\end{choices}'.length);
    const ansMatch = afterChoices.match(/\\textbf\{Đáp án:\}\s*([A-Za-z,\s&]+)/i);
    let answerStr = ansMatch ? ansMatch[1].trim().toUpperCase() : 'A';
    const letters = answerStr.match(/[A-Z]/g) || ['A'];
    const correctIndices = letters.map(c => c.charCodeAt(0) - 65).filter(i => i >= 0 && i < options.length);
    const isMultiple = letters.length > 1;
    const answerLetter = letters.join(', ');

    let explanation = '';
    const expMatch = afterChoices.match(/\\textbf\{Giải thích:\}\s*([\s\S]*?)$/i);
    if (expMatch) {
      explanation = cleanTexWithMath(expMatch[1]);
    }
    if (isMultiple) {
      if (!explanation.includes('Đáp án đúng')) {
        explanation = `**Đáp án đúng**: ${letters.join(' & ')}\n\n` + explanation;
      }
    }

    rawQuestions.push({
      qId,
      diagrams,
      multiple: isMultiple,
      rawQNum: qNum,
      chapterIndex: chIndex,
      chapterNum: chapter.num,
      chapterTitle: chapter.title,
      text: cleanTexWithMath(promptRaw),
      options,
      answerLetter,
      correctIndex: correctIndices && correctIndices.length > 0 ? correctIndices[0] : 0,
      correctIndices: isMultiple ? correctIndices : undefined,
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

    "83": `**Giải thích**: \n\n **Hướng giải**: Kiến trúc tập lệnh RISC (Load-and-Store architecture) thuộc Chapter 17: Reduced Instruction Set Computers (RISC) (Giáo trình William Stallings COA 11th Edition). \n\n **Các bước phân tích**:\n\n- Dữ kiện câu hỏi: "_________ instructions are used to position quantities in registers temporarily for computational operations.".\n- Trong kiến trúc RISC và các bộ vi xử lý hiện đại, các phép toán số học và logic chỉ thực hiện trực tiếp trên thanh ghi (register-to-register). Các lệnh Load (nạp từ bộ nhớ vào thanh ghi) và Store (lưu từ thanh ghi ra bộ nhớ) - gọi là cơ chế Load-and-store - được sử dụng để định vị dữ liệu tạm thời trong thanh ghi cho các tác vụ tính toán.\n- Khi đối chiếu các phương án đưa ra, đáp án chuẩn xác là A. Load-and-store.\n\n **Kiểm tra**: Chọn A. Load-and-store \n\n **Vì sao các phương án khác sai**:\n\n- B (Branch): Lệnh rẽ nhánh điều khiển luồng thực thi (PC).\n- C (Arithmetic): Lệnh số học thực thi tính toán trên thanh ghi.\n- D (Shift): Lệnh dịch bit thao tác trên thanh ghi.\n\n **Xuất hiện trong**: Giáo trình COA 11th Edition - Chapter 17: Reduced Instruction Set Computers (RISC)`,

    "426": `**Giải thích**: \n\n **Hướng giải**: Thiết kế Mạch số & Đại số Boolean thuộc Chapter 12: Digital Logic (Giáo trình William Stallings COA 11th Edition). \n\n **Các bước phân tích**:\n\n- Dữ kiện câu hỏi: Bảng Karnaugh map với các biến đầu vào CD (hàng) và AB (cột).\n- Các ô có giá trị 1 nằm tại các tổ hợp biến được chỉ định, tương ứng biểu diễn chuẩn SOP (Sum of Products).\n- Xác định biểu thức chính tắc tổng của các minterm (Canonical Sum-of-Products) tương ứng với các ô mang giá trị 1.\n\n **Kiểm tra**: Chọn B \n\n **Xuất hiện trong**: Giáo trình COA 11th Edition - Chapter 12: Digital Logic`,

    "321": `**Giải thích**: \n\n **Hướng giải**: Mã sửa lỗi Hamming (Error Correction - Hamming Code) thuộc Chapter 06: Internal Memory (Giáo trình William Stallings COA 11th Edition). \n\n **Các bước phân tích**:\n\n- Dữ kiện câu hỏi: Từ nhớ 12-bit được lưu trữ là \`111001001101\`, gồm 8 bit dữ liệu và 4 bit kiểm tra chẵn lẻ (parity check bits).\n- Theo quy ước đánh số vị trí bit từ phải sang trái (hoặc theo trọng số từ bit 1 đến bit 12 trong chuẩn COA William Stallings):\n  - Vị trí các bit parity nằm ở các lũy thừa của 2: vị trí 1 ($2^0$), vị trí 2 ($2^1$), vị trí 4 ($2^2$), vị trí 8 ($2^3$).\n  - Từ nhớ gồm 12 bit (đánh số từ phải sang trái từ 1 đến 12):\n    - Bit 12 = 1, Bit 11 = 1, Bit 10 = 1, Bit 9 = 0\n    - Bit 8 = 0 (Parity bit $P_8$)\n    - Bit 7 = 1, Bit 6 = 0, Bit 5 = 0\n    - Bit 4 = 1 (Parity bit $P_4$)\n    - Bit 3 = 1\n    - Bit 2 = 0 (Parity bit $P_2$)\n    - Bit 1 = 1 (Parity bit $P_1$)\n- Tổ hợp các bit parity theo thứ tự $P_8 P_4 P_2 P_1$ là: 0, 1, 0, 1 $\\to$ **0101**.\n\n **Kiểm tra**: Chọn D. 0101 \n\n **Vì sao các phương án khác sai**:\n\n- A (0110), B (0111), C (1110): Không khớp với giá trị các bit kiểm tra tại các vị trí lũy thừa của 2.\n- E (None of the mentioned): Sai vì đáp án D (0101) là chính xác.\n\n **Xuất hiện trong**: Giáo trình COA 11th Edition - Chapter 06: Internal Memory`,

    "434": `**Giải thích**: \n\n **Hướng giải**: Mã sửa lỗi Hamming (Hamming Error-Correcting Code) cho từ dữ liệu 11-bit thuộc Chapter 06: Internal Memory (Giáo trình William Stallings COA 11th Edition). \n\n **Các bước phân tích**:\n\n- Dữ kiện câu hỏi: Cho từ dữ liệu 11 bit: \`001 0010 1010\` ($D_1$ đến $D_{11}$ theo thứ tự từ trái sang phải).\n- Số bit kiểm tra $K$ cần thiết thỏa mãn $2^K - 1 \\ge 11 + K \\implies K = 4$ bit ($C_1, C_2, C_4, C_8$), tạo thành từ mã dài 15 bit.\n- Phân bổ vào 15 vị trí (vị trí lũy thừa của 2 là check bit, các vị trí còn lại là data bit):\n  - Bit 1 ($C_1$), Bit 2 ($C_2$), Bit 3 ($D_1=0$), Bit 4 ($C_4$), Bit 5 ($D_2=0$), Bit 6 ($D_3=1$), Bit 7 ($D_4=0$)\n  - Bit 8 ($C_8$), Bit 9 ($D_5=0$), Bit 10 ($D_6=1$), Bit 11 ($D_7=0$), Bit 12 ($D_8=1$), Bit 13 ($D_9=0$), Bit 14 ($D_{10}=1$), Bit 15 ($D_{11}=0$)\n- Tính toán 4 bit kiểm tra chẵn lẻ (Even Parity):\n  - $C_1$ (kiểm tra các vị trí 1, 3, 5, 7, 9, 11, 13, 15): Dữ liệu gồm $D_1(0), D_2(0), D_4(0), D_5(0), D_7(0), D_9(0), D_{11}(0) \\implies$ Số bit 1 là 0 (chẵn) $\\implies C_1 = 0$.\n  - $C_2$ (kiểm tra các vị trí 2, 3, 6, 7, 10, 11, 14, 15): Dữ liệu gồm $D_1(0), D_3(1), D_4(0), D_6(1), D_7(0), D_{10}(1), D_{11}(0) \\implies$ Số bit 1 là 3 (lẻ) $\\implies C_2 = 1$.\n  - $C_4$ (kiểm tra các vị trí 4, 5, 6, 7, 12, 13, 14, 15): Dữ liệu gồm $D_2(0), D_3(1), D_4(0), D_8(1), D_9(0), D_{10}(1), D_{11}(0) \\implies$ Số bit 1 là 3 (lẻ) $\\implies C_4 = 1$.\n  - $C_8$ (kiểm tra các vị trí 8, 9, 10, 11, 12, 13, 14, 15): Dữ liệu gồm $D_5(0), D_6(1), D_7(0), D_8(1), D_9(0), D_{10}(1), D_{11}(0) \\implies$ Số bit 1 là 3 (lẻ) $\\implies C_8 = 1$.\n- Ghép toàn bộ 15 bit theo thứ tự từ vị trí 1 đến 15:\n  \`0 1 0 1 0 1 0 1 0 1 0 1 0 1 0\` $\\to$ Trình bày dạng nhóm (3-4-8): \`010 1010 10101010\`.\n\n **Lưu ý lỗi ngân hàng đề gốc**: Đề gốc in sai tiền tố \`001 0010 ...\` do người ra đề sao chép nhầm 7 bit đầu của từ dữ liệu mà quên chèn các bit parity $C_1, C_2, C_4$ vào vị trí 1, 2, 4. Chuỗi chuẩn xác là \`010 1010 10101010\` (hoặc \`010101010101010\`).\n\n **Kiểm tra**: Chọn D. 010 1010 10101010 \n\n **Xuất hiện trong**: Giáo trình COA 11th Edition - Chapter 06: Internal Memory`,

    "422": `**Giải thích**: \n\n **Hướng giải**: Giải mã và sửa lỗi từ nhớ đọc ra bằng mã Hamming thuộc Chapter 06: Internal Memory (Giáo trình William Stallings COA 11th Edition). \n\n **Các bước phân tích**:\n\n- Dữ kiện câu hỏi: Từ nhớ đọc ra có độ dài 15 bit là \`001001001011110\`.\n- Bước 1: Gán các bit vào các vị trí từ 1 đến 15:\n  - Vị trí check bits: Bit 1 ($C_1=0$), Bit 2 ($C_2=0$), Bit 4 ($C_4=0$), Bit 8 ($C_8=0$).\n  - Vị trí data bits: Bit 3 ($D_1=1$), Bit 5 ($D_2=0$), Bit 6 ($D_3=1$), Bit 7 ($D_4=0$), Bit 9 ($D_5=1$), Bit 10 ($D_6=0$), Bit 11 ($D_7=1$), Bit 12 ($D_8=1$), Bit 13 ($D_9=1$), Bit 14 ($D_{10}=1$), Bit 15 ($D_{11}=0$).\n- Bước 2: Tính toán các bit hội chứng lỗi (Syndrome bits $p_8, p_4, p_2, p_1$):\n  - $p_1 = \\text{Bit } (1 \\oplus 3 \\oplus 5 \\oplus 7 \\oplus 9 \\oplus 11 \\oplus 13 \\oplus 15) = 0 \\oplus 1 \\oplus 0 \\oplus 0 \\oplus 1 \\oplus 1 \\oplus 1 \\oplus 0 = 0$.\n  - $p_2 = \\text{Bit } (2 \\oplus 3 \\oplus 6 \\oplus 7 \\oplus 10 \\oplus 11 \\oplus 14 \\oplus 15) = 0 \\oplus 1 \\oplus 1 \\oplus 0 \\oplus 0 \\oplus 1 \\oplus 1 \\oplus 0 = 0$.\n  - $p_4 = \\text{Bit } (4 \\oplus 5 \\oplus 6 \\oplus 7 \\oplus 12 \\oplus 13 \\oplus 14 \\oplus 15) = 0 \\oplus 0 \\oplus 1 \\oplus 0 \\oplus 1 \\oplus 1 \\oplus 1 \\oplus 0 = 0$.\n  - $p_8 = \\text{Bit } (8 \\oplus 9 \\oplus 10 \\oplus 11 \\oplus 12 \\oplus 13 \\oplus 14 \\oplus 15) = 0 \\oplus 1 \\oplus 0 \\oplus 1 \\oplus 1 \\oplus 1 \\oplus 1 \\oplus 0 = 1$.\n- Bước 3: Xác định vị trí lỗi:\n  - Syndrome $S = (p_8 p_4 p_2 p_1)_2 = (1 0 0 0)_2 = 8$.\n  - Vị trí bị lỗi là **Bit 8** (chính là bit Parity $C_8$).\n- Bước 4: Trích xuất dữ liệu gốc 11-bit:\n  - Do lỗi xảy ra ở bit Parity 8, toàn bộ 11 bit dữ liệu ($D_1$ đến $D_{11}$) không bị hỏng.\n  - Dữ liệu 11 bit gốc là: $D_1 D_2 D_3 D_4 D_5 D_6 D_7 D_8 D_9 D_{10} D_{11} = 10101011110$.\n  - Trình bày dạng nhóm (3-4-4): \`101 0101 1110\`.\n\n **Lưu ý lỗi ngân hàng đề gốc**: Đề gốc bị gõ nhầm chuỗi bit thành \`001 0010 1011\` (gõ nhầm \`0101\` thành \`0010\` và thiếu bit). Đáp án đúng chuẩn xác là \`101 0101 1110\` (tức \`10101011110\`).\n\n **Kiểm tra**: Chọn D. 101 0101 1110 \n\n **Xuất hiện trong**: Giáo trình COA 11th Edition - Chapter 06: Internal Memory`,

    "453": `**Giải thích**: \n\n **Hướng giải**: Tính toán các bit kiểm tra mã Hamming (Error-Correcting Code Check Bits) thuộc Chapter 06: Internal Memory (Giáo trình William Stallings COA 11th Edition). \n\n **Các bước phân tích**:\n\n- Dữ kiện câu hỏi: Cho từ dữ liệu 11 bit: \`10110101100\` ($D_1$ đến $D_{11}$ theo thứ tự từ trái sang phải).\n- Phân bổ 11 bit dữ liệu vào các vị trí tương ứng trong từ mã 15 bit (các vị trí lũy thừa của 2 là check bit, còn lại là data bit):\n  - Bit 1 ($C_1$), Bit 2 ($C_2$), Bit 3 ($D_1=1$), Bit 4 ($C_4$), Bit 5 ($D_2=0$), Bit 6 ($D_3=1$), Bit 7 ($D_4=1$)\n  - Bit 8 ($C_8$), Bit 9 ($D_5=0$), Bit 10 ($D_6=1$), Bit 11 ($D_7=0$), Bit 12 ($D_8=1$), Bit 13 ($D_9=1$), Bit 14 ($D_{10}=0$), Bit 15 ($D_{11}=0$)\n- Tính toán 4 bit kiểm tra chẵn lẻ (Even Parity):\n  - $C_1$ (kiểm tra các vị trí 1, 3, 5, 7, 9, 11, 13, 15): Dữ liệu gồm $D_1(1), D_2(0), D_4(1), D_5(0), D_7(0), D_9(1), D_{11}(0) \\implies$ Số lượng bit 1 là 3 (lẻ) $\\implies C_1 = 1$.\n  - $C_2$ (kiểm tra các vị trí 2, 3, 6, 7, 10, 11, 14, 15): Dữ liệu gồm $D_1(1), D_3(1), D_4(1), D_6(1), D_7(0), D_{10}(0), D_{11}(0) \\implies$ Số lượng bit 1 là 4 (chẵn) $\\implies C_2 = 0$.\n  - $C_4$ (kiểm tra các vị trí 4, 5, 6, 7, 12, 13, 14, 15): Dữ liệu gồm $D_2(0), D_3(1), D_4(1), D_8(1), D_9(1), D_{10}(0), D_{11}(0) \\implies$ Số lượng bit 1 là 4 (chẵn) $\\implies C_4 = 0$.\n  - $C_8$ (kiểm tra các vị trí 8, 9, 10, 11, 12, 13, 14, 15): Dữ liệu gồm $D_5(0), D_6(1), D_7(0), D_8(1), D_9(1), D_{10}(0), D_{11}(0) \\implies$ Số lượng bit 1 là 3 (lẻ) $\\implies C_8 = 1$.\n- Tổ hợp 4 bit kiểm tra theo thứ tự trọng số $C_8 C_4 C_2 C_1$ (hoặc $C_1 C_2 C_4 C_8$) là: **\`1001\`**.\n\n **Lưu ý lỗi ngân hàng đề gốc**: Đề gốc in nhầm phương án C thành \`1100\` (lỗi gõ nhầm vị trí bit 0 và 1). Giá trị chuẩn xác tuyệt đối là \`1001\`.\n\n **Kiểm tra**: Chọn C. 1001 \n\n **Xuất hiện trong**: Giáo trình COA 11th Edition - Chapter 06: Internal Memory`,

    "61": `**Giải thích**: \n\n **Hướng giải**: Cấu trúc và phân loại Mô-đun vào/ra (I/O Module: I/O Controller vs I/O Channel) thuộc Chapter 08: Input & Output (Giáo trình William Stallings COA 11th Edition). \n\n **Các bước phân tích**:\n\n- Dữ kiện câu hỏi: "I/O channels are commonly seen on microcomputers, whereas I/O controllers are used on mainframes." (Các kênh I/O thường thấy trên vi máy tính, trong khi các bộ điều khiển I/O được dùng trên máy tính lớn mainframe).\n- Theo giáo trình William Stallings (COA 11th Edition - Chapter 08):\n  - **I/O Controller** (bộ điều khiển I/O): Là mô-đun I/O cấp thấp, yêu cầu CPU can thiệp trực tiếp nhiều vào các lệnh chi tiết, thường được sử dụng phổ biến trên **microcomputers** (máy tính cá nhân / vi máy tính).\n  - **I/O Channel / I/O Processor** (kênh I/O / bộ xử lý I/O): Là mô-đun I/O cấp cao, có kiến trúc vi xử lý và tập lệnh chuyên dụng riêng để thực hiện trọn vẹn các chương trình I/O mà không cần CPU giám sát liên tục, thường được sử dụng trên các hệ thống lớn như **mainframes**.\n- Mệnh đề trong đề bài đã bị **đảo ngược vị trí** của hai khái niệm (viết ngược I/O channels với I/O controllers), do đó nhận định này là sai (False).\n\n **Kiểm tra**: Chọn A. False \n\n **Xuất hiện trong**: Giáo trình COA 11th Edition - Chapter 08: Input & Output`,

    "418": `**Giải thích**: \n\n **Hướng giải**: Chuyển đổi hệ đếm Thập phân (Decimal) sang Nhị phân (Binary) thuộc Chapter 10: Number Systems (Giáo trình William Stallings COA 11th Edition). \n\n **Các bước phân tích**:\n\n- Dữ kiện câu hỏi: Chuyển đổi số thập phân $64_{10}$ sang số nhị phân tương đương.\n- Phân tích theo các lũy thừa của 2:\n  $$64 = 2^6 = 1 \\times 2^6 + 0 \\times 2^5 + 0 \\times 2^4 + 0 \\times 2^3 + 0 \\times 2^2 + 0 \\times 2^1 + 0 \\times 2^0$$\n- Đọc các hệ số từ trái sang phải: chữ số 1 đầu tiên tại vị trí $2^6$, theo sau là 6 chữ số 0:\n  $$64_{10} = \\mathbf{1000000}_2$$\n\n **Lưu ý lỗi ngân hàng đề gốc**: Đề gốc in thiếu 1 chữ số 0 ở phương án A (\`100000\` = $32_{10}$). Giá trị nhị phân chuẩn xác tuyệt đối của 64 là \`1000000\` (gồm 1 chữ số 1 và 6 chữ số 0).\n\n **Kiểm tra**: Chọn A. 1000000 \n\n **Xuất hiện trong**: Giáo trình COA 11th Edition - Chapter 10: Number Systems`,

    "119": `**Giải thích**: \n\n **Hướng giải**: Định địa chỉ bộ nhớ (Memory Addressing Bits) thuộc Chapter 10: Number Systems / Chapter 06: Internal Memory (Giáo trình William Stallings COA 11th Edition). \n\n **Các bước phân tích**:\n\n- Dữ kiện câu hỏi: Bộ nhớ có dung lượng $256\\text{K}$ từ nhớ (words).\n- Biểu diễn dung lượng theo lũy thừa của 2:\n  $$256\\text{K} = 256 \\times 1024 = 2^8 \\times 2^{10} = 2^{18}\\text{ words}$$\n- Để định vị duy nhất $2^{18}$ địa chỉ từ nhớ độc lập, số bit địa chỉ cần thiết là:\n  $$n = \\log_2(2^{18}) = \\mathbf{18\\text{ bits}}$$\n\n **Kiểm tra**: Chọn D. 18 bits \n\n **Xuất hiện trong**: Giáo trình COA 11th Edition - Chapter 10: Number Systems`,

    "501": `**Giải thích**: \n\n **Hướng giải**: So sánh Kiến trúc RISC và CISC thuộc Chapter 17: Reduced Instruction Set Computers (RISC) (Giáo trình William Stallings COA 11th Edition). \n\n **Các bước phân tích**:\n\n- Dữ kiện câu hỏi: "What is a primary disadvantage of CISC (Complex Instruction Set Computer) architectures?" (Nhược điểm chính của kiến trúc CISC là gì?).\n- Phân tích đặc tính kiến trúc CISC:\n  - Kiến trúc CISC sở hữu tập lệnh lớn, độ dài lệnh thay đổi và nhiều chế độ định địa chỉ phức tạp.\n  - Nhược điểm cốt lõi lớn nhất (primary disadvantage) của CISC chính là **Độ phức tạp hiện thực phần cứng tăng vọt (Increased implementation complexity)**: Bộ giải mã lệnh và khối điều khiển (control unit / vi chương trình) trở nên cồng kềnh, chiếm nhiều diện tích chip silicon, kéo dài thời gian thiết kế và gây khó khăn lớn cho việc tối ưu hóa đường ống lệnh (pipelining).\n  - Đây chính là lý do cốt lõi thúc đẩy sự ra đời của triết lý thiết kế RISC (giảm độ phức tạp phần cứng, đồng nhất độ dài lệnh để tối ưu hóa pipeline).\n\n **Kiểm tra**: Chọn A. Increased implementation complexity \n\n **Vì sao các phương án khác sai**:\n\n- B (Limited instruction set): Sai, CISC có tập lệnh rất phong phú, không hề bị giới hạn (Limited instruction set là đặc trưng của RISC).\n- C (Slower execution due to complex instructions): Không phải định nghĩa nhược điểm cốt lõi về mặt thiết kế phần cứng.\n- D (Higher energy consumption): Mặc dù CISC tiêu thụ nhiều năng lượng hơn, nhưng về mặt kiến trúc máy tính nền tảng, nhược điểm gốc rễ và cơ bản nhất được nhấn mạnh trong giáo trình luôn là sự phức tạp trong hiện thực phần cứng (implementation complexity).\n\n **Xuất hiện trong**: Giáo trình COA 11th Edition - Chapter 17: Reduced Instruction Set Computers (RISC)`,

    "514": `**Giải thích**: \n\n **Hướng giải**: Đặc trưng câu lệnh của chương trình ngôn ngữ bậc cao (High-Level Language Statement Types) thuộc Chapter 17: Reduced Instruction Set Computers (RISC) (Giáo trình William Stallings COA 11th Edition). \n\n **Các bước phân tích**:\n\n- Dữ kiện câu hỏi: "In various statement types in a high-level programming language, what is not the most common statement?" (Trong các loại câu lệnh của ngôn ngữ lập trình bậc cao, câu lệnh nào KHÔNG phải là loại câu lệnh phổ biến?).\n- Theo các nghiên cứu thống kê thực nghiệm kinh điển về hành vi chương trình HLL (Bảng 17.2 trong giáo trình William Stallings COA 11th Edition):\n  - Các loại câu lệnh phổ biến cấu thành nên phần lớn chương trình HLL bao gồm: **ASSIGN** (gán giá trị), **IF** (rẽ nhánh điều kiện), **CALL** (gọi hàm/thủ tục), **LOOP** (vòng lặp) và **GOTO** (nhảy không điều kiện).\n  - **CLOOP statement**: Không phải là một loại câu lệnh chuẩn tắc hay phổ biến trong phân loại ngôn ngữ lập trình bậc cao, mà là phương án nhiễu (distractor) được đưa vào để bẫy thí sinh.\n\n **Kiểm tra**: Chọn C. CLOOP statement. \n\n **Vì sao các phương án khác sai**:\n\n- A (GOTO statement): Là câu lệnh nhảy vô điều kiện, xuất hiện phổ biến trong thống kê các câu lệnh điều khiển dòng lệnh của chương trình HLL.\n- B (IF statement): Là một trong những câu lệnh rẽ nhánh phổ biến nhất trong mọi chương trình HLL (chiếm tỷ trọng rất lớn).\n- D (CALL procedure statement): Là câu lệnh gọi hàm/thủ tục cực kỳ phổ biến và là đối tượng tối ưu trọng tâm của kiến trúc RISC (sử dụng Register Windows).\n\n **Xuất hiện trong**: Giáo trình COA 11th Edition - Chapter 17: Reduced Instruction Set Computers (RISC)`,

    "276": `**Giải thích**: \n\n **Hướng giải**: Rút gọn biểu thức Boolean & Bảng chân trị (Boolean Algebra & Truth Table) thuộc Chapter 12: Digital Logic (Giáo trình William Stallings COA 11th Edition). \n\n **Các bước phân tích**:\n\n- Dữ kiện câu hỏi: Cho biểu thức Boolean $F = AB + AB'$ và bảng chân trị tương ứng.\n- Rút gọn biểu thức theo định lý đại số Boolean:\n  $$F = AB + AB' = A(B + B')$$\n  Vì $B + B' = 1$, ta có:\n  $$F = A \\cdot 1 = A$$\n- Như vậy, giá trị ngõ ra $F$ (Output) luôn bằng chính xác giá trị của ngõ vào $A$ cho mọi hàng trong bảng chân trị:\n  - Hàng 1: $A = 1, B = 0 \\implies F = 1$\n  - Hàng 2: $A = 1, B = 1 \\implies F = 1$\n  - Hàng 3: $A = 0, B = 0 \\implies F = 0$\n  - Hàng 4: $A = 0, B = 1 \\implies F = 0$\n- Đọc cột Output từ trên xuống dưới ta được dãy giá trị: **\`1, 1, 0, 0\`**.\n\n **Lưu ý lỗi ngân hàng đề gốc**: Đề gốc in nhầm phương án A thành \`1,1,1,0\` (gõ nhầm số 0 ở hàng 3 thành 1). Đáp án chính xác tuyệt đối là \`1,1,0,0\`.\n\n **Kiểm tra**: Chọn A. 1,1,0,0 \n\n **Xuất hiện trong**: Giáo trình COA 11th Edition - Chapter 12: Digital Logic`,

    "440": `**Giải thích**: \n\n **Hướng giải**: Rút gọn biểu thức đại số Boolean (Boolean Expression Simplification) thuộc Chapter 12: Digital Logic (Giáo trình William Stallings COA 11th Edition). \n\n **Các bước phân tích**:\n\n- Dữ kiện câu hỏi: Rút gọn biểu thức Boolean:\n  $$F = AB'C' + A'BC + ABC + ABC'$$\n- Nhóm các số hạng có nhân tử chung để áp dụng tính chất bù $X + X' = 1$:\n  - Nhóm số hạng 1 và 4: $AB'C' + ABC' = AC'(B' + B) = AC'(1) = AC'$\n  - Nhóm số hạng 2 và 3: $A'BC + ABC = BC(A' + A) = BC(1) = BC$\n- Kết hợp hai kết quả rút gọn lại:\n  $$F = AC' + BC$$\n- Đối chiếu các phương án: Phương án C ($BC + AB + AB'C'$) chưa được rút gọn tối giản (vẫn còn số hạng dư thừa $AB$ và chưa triệt tiêu $B'$). Phương án A ($AC' + BC$) là dạng tối giản chuẩn xác nhất.\n\n **Kiểm tra**: Chọn A. AC' + BC \n\n **Xuất hiện trong**: Giáo trình COA 11th Edition - Chapter 12: Digital Logic`,

    "442": `**Giải thích**: \n\n **Hướng giải**: Đánh giá giá trị biểu thức đại số Boolean thuộc Chapter 12: Digital Logic (Giáo trình William Stallings COA 11th Edition). \n\n **Các bước phân tích**:\n\n- Dữ kiện câu hỏi: Cho biểu thức Boolean:\n  $$F = (A' + B + C) \\cdot (A + B' + C')$$\n- Kiểm tra xem biểu thức có phải là hằng số (luôn bằng 1 hoặc luôn bằng 0) hay không:\n  - Thử trường hợp 1: Cho $(A, B, C) = (1, 0, 0)$:\n    - Ngoặc thứ nhất: $A' + B + C = 0 + 0 + 0 = 0$.\n    - Khi đó $F = 0 \\cdot (1 + 1 + 1) = 0$.\n  - Thử trường hợp 2: Cho $(A, B, C) = (0, 0, 0)$:\n    - Ngoặc thứ nhất: $A' + B + C = 1 + 0 + 0 = 1$.\n    - Ngoặc thứ hai: $A + B' + C' = 0 + 1 + 1 = 1$.\n    - Khi đó $F = 1 \\cdot 1 = 1$.\n- Vì $F$ nhận giá trị 0 ở một số tổ hợp biến và nhận giá trị 1 ở các tổ hợp biến khác, nên $F$ không phải là hằng số (hằng đúng hay hằng sai), cũng không tương đương với phép toán XOR.\n- Do đó, giá trị ngõ ra của biểu thức hoàn toàn phụ thuộc vào giá trị của các biến đầu vào $A, B$ và $C$.\n\n **Lưu ý lỗi ngân hàng đề gốc**: Đề gốc chọn nhầm phương án A (1 - ngộ nhận là hằng đúng). Đáp án chính xác tuyệt đối là D. Depends on the values of A, B, and C.\n\n **Kiểm tra**: Chọn D. Depends on the values of A, B, and C \n\n **Xuất hiện trong**: Giáo trình COA 11th Edition - Chapter 12: Digital Logic`,

    "445": `**Giải thích**: \n\n **Hướng giải**: Đọc và xác định biểu thức Boolean từ sơ đồ mạch logic (Logic Circuit to Boolean Expression) thuộc Chapter 12: Digital Logic (Giáo trình William Stallings COA 11th Edition). \n\n **Các bước phân tích sơ đồ mạch**:\n\n1. **Khảo sát các đường tín hiệu đầu vào (Inputs)**:\n   - Mạch có 3 biến ngõ vào chính: $A, B, C$.\n   - Các cổng đảo (NOT gates) tạo ra các đường tín hiệu bù tương ứng: $A'$ (tức $\\overline{A}$), $B'$ (tức $\\overline{B}$), và $C'$ (tức $\\overline{C}$).\n\n2. **Truy vết ngõ ra của từng cổng AND (từ trên xuống dưới)**:\n   - **Cổng AND 1 (2 ngõ vào)**: Điểm nối (dot) kết nối với đường $A'$ và đường $C'$.\n     $$\\text{Ngõ ra cổng 1} = A' \\cdot C' = A'C'$$\n   - **Cổng AND 2 (2 ngõ vào)**: Điểm nối kết nối với đường $A$ và đường $B$.\n     $$\\text{Ngõ ra cổng 2} = A \\cdot B = AB$$\n   - **Cổng AND 3 (3 ngõ vào)**: Điểm nối kết nối với đường $A$, đường $B'$, và đường $C$.\n     $$\\text{Ngõ ra cổng 3} = A \\cdot B' \\cdot C = AB'C$$\n\n3. **Xác định ngõ ra tổng $F$ qua cổng OR**:\n   - Cả 3 ngõ ra của các cổng AND trên được cấp vào một cổng **OR 3 ngõ vào** để tạo thành hàm logic tổng hợp ngõ ra $F$:\n     $$F = A'C' + AB + AB'C$$\n\n **Kiểm tra**: Đối chiếu với các phương án, chọn phương án **A. $F = A'C' + AB + AB'C$**.\n\n **Vì sao các phương án khác sai**:\n\n- B ($F = AC + A'B + AB'C$): Sai vì cổng AND 1 nhận $A'$ và $C'$ (không phải $AC$), cổng AND 2 nhận $A$ và $B$ (không phải $A'B$).\n- C ($F = A'C' + A'B + AB'C$): Sai vì cổng AND 2 nhận $A$ và $B$ (không có cổng đảo ở ngõ vào $A$).\n- D ($F = AC' + A'B + AB'C$): Sai vì cổng AND 1 nhận cả $A'$ và $C'$, cổng 2 nhận $A$ và $B$.\n\n **Xuất hiện trong**: Giáo trình COA 11th Edition - Chapter 12: Digital Logic`,

    "452": `**Giải thích**: \n\n **Hướng giải**: Các đồng nhất thức cơ bản của đại số Boolean (Basic Boolean Identities) thuộc Chapter 12: Digital Logic (Bảng 12.1/20.1 trong Giáo trình William Stallings COA 11th Edition). \n\n **Các bước phân tích**:\n\n- Dữ kiện câu hỏi: "_________Which of the following is NOT a Boolean identity?" (Biểu thức nào sau đây KHÔNG phải là một đồng nhất thức Boolean cơ bản?).\n\n- Bảng các đồng nhất thức Boolean cơ bản (Basic Boolean Identities) trong giáo trình chỉ được xây dựng trên 3 phép toán tiên đề nền tảng: **AND ($\\cdot$)**, **OR ($+$)** và **NOT ($'$)**:\n  - **Phương án A ($A \\text{ AND } (A \\text{ OR } B) = A$)**: Đây là **Luật hấp thụ (Absorption Law)** ($A(A + B) = A$) — một đồng nhất thức Boolean cơ bản chuẩn xác.\n  - **Phương án C ($(A \\text{ OR } B)' = A' \\text{ AND } B'$)**: Đây là **Định lý De Morgan** ($\\overline{A + B} = \\overline{A} \\cdot \\overline{B}$) — một đồng nhất thức Boolean cơ bản chuẩn xác.\n  - **Phương án D ($A + A' = 1$)**: Đây là **Luật bù / Nghịch đảo (Complement / Inverse Law)** ($A + \\overline{A} = 1$) — một trong những đồng nhất thức Boolean tiên đề cốt lõi nhất.\n  - **Phương án B ($A \\text{ XOR } B = (A \\text{ AND } B') \\text{ OR } (A' \\text{ AND } B)$)**: Đây là **định nghĩa khai triển hàm logic của cổng XOR** (cổng logic tổ hợp dẫn xuất), KHÔNG nằm trong bảng các tiên đề/đồng nhất thức Boolean cơ bản (Basic Boolean Identities) của đại số Boolean thuần túy.\n\n **Lưu ý lỗi ngân hàng đề gốc**: Đề gốc đánh dấu nhầm phương án D ($A + A' = 1$ — ngộ nhận luật bù là không phải đồng nhất thức). Đáp án chính xác theo giáo trình và câu hỏi là **B. A XOR B = (A AND B') OR (A' AND B)**.\n\n **Kiểm tra**: Chọn B. A XOR B = (A AND B') OR (A' AND B) \n\n **Xuất hiện trong**: Giáo trình COA 11th Edition - Chapter 12: Digital Logic`,

    "443": `**Giải thích**: \n\n **Hướng giải**: Dạng biểu thức tổng các tích (Sum-of-Products - SOP) & Mạch logic 2 mức (Two-Level Logic) thuộc Chapter 12: Digital Logic (Giáo trình William Stallings COA 11th Edition). \n\n **Các bước phân tích**:\n\n- Dữ kiện câu hỏi: "_________Which of the following is an important feature of the sum-of-products (SOP) form of expression?" (Đặc điểm quan trọng nào sau đây là của dạng biểu thức tổng các tích - SOP?).\n\n- Phân tích nguyên lý mạch logic 2 mức (Two-level logic implementation):\n  - Dạng SOP (Sum of Products) biểu diễn một hàm Boolean dưới dạng tổng (OR) của các số hạng tích (AND) (ví dụ: $F = AB + CD + EF$).\n  - Khi hiện thực bằng phần cứng, mạch luôn có cấu trúc **2 tầng (two-level)** cố định:\n    - **Tầng 1 (First level)**: Các cổng **AND** để tính giá trị từng số hạng tích.\n    - **Tầng 2 (Second level)**: Một cổng **OR** duy nhất gom ngõ ra của các cổng AND để tạo ngõ ra tổng $F$.\n  - **Đặc trưng quan trọng nhất (Important feature)**: Mọi đường truyền tín hiệu từ ngõ vào đến ngõ ra (không tính các cổng đảo NOT ở đầu vào) chỉ đi qua tối đa đúng **hai cổng logic (No signal must pass through more than two gates, not including inverters)**.\n  - Điều này giúp chuẩn hóa và giữ cho độ trễ truyền dẫn (propagation delay) của mạch tổ hợp luôn ở mức nhỏ nhất ($2 \\times t_{\\text{gate}}$) và đồng đều giữa các đường tín hiệu.\n\n **Kiểm tra**: Chọn A. No signal must pass through more than two gates, not including inverters. \n\n **Vì sao các phương án khác sai**:\n\n- B: Sai vì mạch SOP vẫn phải sử dụng cổng đảo (inverters / NOT) đối với các biến ở dạng bù (ví dụ $A'$), chứ không phải "chỉ thu gọn thành duy nhất AND và OR".\n- C: Sai vì thời gian trễ của dạng SOP tương đương với dạng POS (Product of Sums - mạch 2 tầng OR-AND), không phải "giảm mạnh so với mọi dạng khác".\n- D: Sai vì số tầng cổng cố định là 2, không phải "giảm đi một nửa (factor of two)".\n\n **Xuất hiện trong**: Giáo trình COA 11th Edition - Chapter 12: Digital Logic`,

    "538": `Hướng giải:
Xác định loại bộ nhớ bán dẫn có tính chất khả biến (volatile - mất dữ liệu khi ngắt điện), tốc độ truy xuất cực nhanh và được sử dụng làm bộ nhớ trong (internal memory / cache memory).

Các bước:
1. Phân loại theo tính khả biến:
   - Bộ nhớ không khả biến (Non-volatile): ROM (Read-Only Memory) và Flash Memory giữ nguyên dữ liệu khi mất điện.
   - Bộ nhớ khả biến (Volatile): SRAM và DRAM mất dữ liệu khi mất nguồn cấp điện.
2. So sánh SRAM và DRAM:
   - DRAM (Dynamic RAM): Lưu trữ bit dưới dạng điện tích trên tụ điện. Điện tích bị rò rỉ nên cần mạch làm tươi (refresh) định kỳ. Tốc độ truy xuất chậm hơn, mật độ lưu trữ cao, giá thành rẻ, dùng làm bộ nhớ chính (Main Memory).
   - SRAM (Static RAM): Cấu tạo từ các mạch chốt flip-flop (4 hoặc 6 transistor), giữ nguyên trạng thái logic chừng nào còn cấp nguồn mà không cần làm tươi. Tốc độ truy xuất cực nhanh (vài ns), giá thành cao hơn, dùng làm bộ nhớ đệm nội bộ (CPU Cache / Internal Memory).
3. Do đó, bộ nhớ thỏa mãn các điều kiện đề bài là SRAM.

Kiểm tra:
Trong phân cấp bộ nhớ (Memory Hierarchy), Cache nằm trực tiếp trong chip CPU (internal memory) và 100% sử dụng công nghệ SRAM.

Vì sao các phương án khác sai:
- A (ROM): Bộ nhớ chỉ đọc, không khả biến, tốc độ đọc ghi chậm.
- B (Flash): Bộ nhớ bán dẫn không khả biến, tốc độ chậm hơn nhiều so với SRAM, dùng làm ổ cứng SSD/USB.
- D (DRAM): Là bộ nhớ khả biến nhưng tốc độ chậm hơn SRAM và được dùng làm bộ nhớ chính (Main Memory), không dùng cho internal cache tốc độ cao.

Lưu ý/công thức cần nhớ:
SRAM: Flip-flop, không cần refresh, tốc độ cao nhất, làm Cache.
DRAM: Tụ điện, cần refresh định kỳ, làm Main Memory.`,

    "539": `Hướng giải:
Xác định lợi ích hiệu năng cốt lõi (main performance benefit) của bộ vi xử lý đa nhân (multicore processors).

Các bước:
1. Bộ vi xử lý đa nhân tích hợp hai hoặc nhiều nhân xử lý độc lập trên cùng một phiến bán dẫn (die).
2. Mỗi nhân có đầy đủ các đơn vị tìm nạp lệnh, giải mã, thực thi và bộ đệm L1 riêng.
3. Khi hệ điều hành và phần mềm hỗ trợ đa nhiệm hoặc đa luồng (multithreading), các nhân có thể thực thi đồng thời các tiến trình/luồng khác nhau:
   \[
   \mathrm{Throughput} \propto N
   \]
   với \(N\) là số nhân xử lý song song.
4. Do đó, lợi ích hiệu năng lớn nhất là khả năng thực thi song song các tác vụ (Parallel task execution).

Kiểm tra:
Định luật Amdahl chỉ ra rằng hiệu năng của hệ thống đa nhân tăng tỷ lệ thuận với mức độ song song hóa (\(f\)) của chương trình:
\[
	ext{Speedup} = rac{1}{(1 - f) + rac{f}{N}}
\]

Vì sao các phương án khác sai:
- A (Reduced power consumption): Việc trang bị nhiều nhân làm tăng công suất tiêu thụ tổng thể; dù hiệu suất năng lượng trên mỗi tác vụ có thể tối ưu hơn, đây không phải lợi ích hiệu năng chính.
- B (Higher clock speed): Sai, xung nhịp của bộ xử lý đa nhân thường phải giữ ở mức vừa phải để tránh vượt quá giới hạn tản nhiệt (Thermal Design Power - TDP).
- C (Improved serial performance): Sai, các tác vụ tuần tự thuần túy không chạy nhanh hơn trên nhiều nhân.

Lưu ý/công thức cần nhớ:
Multicore tăng hiệu năng thông qua khai thác song song mức luồng (Thread-Level Parallelism - TLP).`,

    "540": `Hướng giải:
Định nghĩa thuật ngữ 'Liên kết hệ thống' (System Interconnection) trong mô hình cấu trúc mức đỉnh của máy tính.

Các bước:
1. Mô hình cấu trúc mức đỉnh của máy tính gồm 4 thành phần cơ bản:
   - CPU (Central Processing Unit)
   - Main Memory (Bộ nhớ chính)
   - I/O (Hệ thống vào/ra)
   - System Interconnection (Liên kết hệ thống)
2. Theo định nghĩa chuẩn trong giáo trình William Stallings: System Interconnection là cơ chế cung cấp đường truyền thông và trao đổi dữ liệu giữa CPU, Bộ nhớ chính và các khối I/O.
3. Trong thực tế, cơ chế liên kết này phổ biến nhất là hệ thống bus (System Bus) hoặc cấu trúc liên kết điểm-điểm (Point-to-point interconnect như QPI/UPI, PCIe).

Kiểm tra:
Đối chiếu nguyên văn định nghĩa từ Section 1.2 Stallings COA: 'System Interconnection: Some mechanism that provides for communication among CPU, main memory, and I/O.' Khớp 100% với phương án A.

Vì sao các phương án khác sai:
- B: Kết nối nguồn điện không phải là thành phần kiến trúc trao đổi thông tin logic.
- C: Mạng bên ngoài kết nối nhiều máy tính là Computer Network, không phải System Interconnection bên trong một máy tính.
- D: Bộ nhớ cache là thành phần lưu trữ dữ liệu trung gian, không phải cơ chế liên kết toàn hệ thống.

Lưu ý/công thức cần nhớ:
Cấu trúc mức đỉnh: CPU + Main Memory + I/O + System Interconnection.`,

    "541": `Hướng giải:
Xác định cơ chế/thành phần chuyên trách việc phát hiện và sửa lỗi dữ liệu (Error detection and correction) trong bộ nhớ máy tính.

Các bước:
1. Trong các hệ thống máy tính hiện đại, các ô nhớ bán dẫn có thể bị đảo bit ngẫu nhiên (soft error) do nhiễu nhiệt, nhiễu điện từ hoặc các hạt alpha/tia vũ trụ.
2. Để bảo vệ tính toàn vẹn của dữ liệu, bộ điều khiển bộ nhớ sử dụng cơ chế ECC (Error-Correcting Code - Mã sửa lỗi).
3. ECC tính toán các bit kiểm tra khi ghi dữ liệu và kiểm tra lại khi đọc dữ liệu. Phổ biến nhất là mã Hamming SEC-DED (Single Error Correction, Double Error Detection) cho phép:
   - Sửa tự động lỗi 1 bit (1-bit error).
   - Phát hiện lỗi 2 bit (2-bit error).
4. Do đó, phương án đúng là B (ECC).

Kiểm tra:
Bộ nhớ ECC (ECC RAM) là thành phần bắt buộc trong các máy chủ (servers) và trung tâm dữ liệu nhằm ngăn chặn sự cố sập hệ thống (system crash).

Vì sao các phương án khác sai:
- A (ALU): Arithmetic Logic Unit, thực hiện các phép toán số học và logic, không quản lý lỗi bộ nhớ.
- C (DMA): Direct Memory Access, điều khiển chuyển dữ liệu trực tiếp giữa thiết bị I/O và RAM không qua CPU.
- D (Cache): Bộ nhớ đệm tốc độ cao, là nơi lưu trữ tạm thời, không phải tên cơ chế sửa lỗi.
- E (CU): Control Unit, đơn vị điều khiển chu kỳ tìm nạp và giải mã lệnh của CPU.

Lưu ý/công thức cần nhớ:
ECC = Error-Correcting Code (Cơ chế phát hiện và sửa lỗi bộ nhớ).`,

    "542": `Hướng giải:
Xác định yếu tố phần cứng có ảnh hưởng đáng kể nhất đến thời gian truy xuất trung bình (average access time) của ổ đĩa từ (HDD).

Các bước:
1. Thời gian truy xuất đĩa từ trung bình bao gồm 3 thành phần chính:
   \[
   T_{	ext{access}} = T_{	ext{seek}} + T_{	ext{rotational latency}} + T_{	ext{transfer}}
   \]
   Trong đó:
   - \(T_{	ext{seek}}\): Thời gian đầu đọc di chuyển đến đúng track (rãnh ghi).
   - \(T_{	ext{rotational latency}}\): Thời gian chờ sector mong muốn quay đến dưới đầu đọc.
   - \(T_{	ext{transfer}}\): Thời gian đọc/ghi dữ liệu của sector khi nó đi qua đầu đọc.
2. Tốc độ quay của đĩa (Rotational speed, đo bằng vòng/phút - RPM):
   - Xác định trực tiếp thời gian trễ quay trung bình:
     \[
     T_{\mathrm{rotational\ latency}} = rac{1}{2 	imes r}
     \]
     với \(r = rac{\mathrm{RPM}}{60}\) là tốc độ quay (vòng/giây).
   - Đồng thời quyết định trực tiếp tốc độ truyền dữ liệu qua đầu đọc (\(T_{	ext{transfer}}\)).
   - Ví dụ: Ổ 15,000 RPM có độ trễ quay chỉ bằng một nửa so với ổ 7,200 RPM và một phần ba so với ổ 5,400 RPM.
3. Trong các phương án được nêu, tốc độ quay là yếu tố động học quyết định mạnh nhất đến thời gian truy xuất trung bình.

Kiểm tra:
Trong các thông số kỹ thuật thương mại của HDD, RPM là chỉ số chính biểu thị đẳng cấp hiệu năng của ổ đĩa.

Vì sao các phương án khác sai:
- B (The size of the disk platter): Đường kính đĩa (3.5 inch, 2.5 inch) ảnh hưởng đến dung lượng và một phần vận tốc dài ở mép đĩa, nhưng không phải yếu tố chi phối thời gian truy xuất như RPM.
- C (The type of file system used): Hệ thống tập tin (NTFS, ext4, FAT32) là phần mềm logic, không quyết định thời gian truy xuất cơ học của phần cứng.
- D (The material composition): Thành phần vật liệu ảnh hưởng đến mật độ từ tính và độ bền, không quyết định thời gian quay và định vị.

Lưu ý/công thức cần nhớ:
Độ trễ quay trung bình: \(T_r = rac{1}{2 	imes (	ext{RPM}/60)}\).`,

    "543": `Hướng giải:
Nhận diện bài toán kiến trúc máy tính mà giao thức MESI được thiết kế để giải quyết trong các hệ thống đa xử lý đối xứng (SMP).

Các bước:
1. Trong hệ thống đa xử lý đối xứng (Symmetric Multiprocessors - SMP), mỗi vi xử lý/nhân có một hoặc nhiều tầng bộ nhớ đệm (L1, L2 cache) riêng biệt nhưng dùng chung một bộ nhớ chính (Main Memory).
2. Khi nhiều bộ xử lý cùng đọc và ghi vào cùng một biến/ô nhớ, dữ liệu giữa các cache riêng và RAM có thể không đồng nhất (Cache Incoherence).
3. Giao thức MESI là giao thức giám sát bus (snooping-based protocol) duy trì tính nhất quán bộ đệm (Cache Coherence) bằng cách gán cho mỗi dòng cache một trong 4 trạng thái:
   - \(M\) (Modified): Dòng cache đã bị sửa đổi, chỉ có ở cache hiện tại, dữ liệu trong RAM đã cũ.
   - \(E\) (Exclusive): Dòng cache giống hệt RAM, chỉ tồn tại duy nhất ở cache hiện tại.
   - \(S\) (Shared): Dòng cache giống hệt RAM, có thể đang được chia sẻ đồng thời ở các cache khác.
   - \(I\) (Invalid): Dòng cache không còn hợp lệ (đã bị vô hiệu hóa khi nhân khác ghi đè).
4. Do đó, phương án đúng là D (Cache coherence).

Kiểm tra:
Giao thức MESI (và các biến thể MOESI, MESIF) là chuẩn mực kinh điển được giảng dạy trong mọi khóa học COA về Cache Coherence.

Vì sao các phương án khác sai:
- A (Instruction decoding): Giải mã lệnh do khối giải mã lệnh bên trong CPU thực hiện.
- B (Disk latency): Độ trễ đĩa thuộc về thiết bị lưu trữ thứ cấp.
- C (Bus arbitration): Trọng tài bus do vi mạch điều khiển bus giải quyết xung đột khi nhiều master cùng yêu cầu bus.

Lưu ý/công thức cần nhớ:
MESI = Modified, Exclusive, Shared, Invalid \(\implies\) Giao thức Cache Coherence.`,

    "544": `Hướng giải:
Chọn định nghĩa chính xác nhất về 'Kiến trúc máy tính' (Computer Architecture) theo chuẩn học thuật của William Stallings.

Các bước:
1. Phân biệt cốt lõi trong môn CEA201:
   - Kiến trúc máy tính (Computer Architecture): Đề cập đến những thuộc tính của hệ thống mà lập trình viên có thể nhìn thấy (Attributes visible to the programmer) hoặc những thuộc tính có tác động trực tiếp đến việc thực thi logic của một chương trình. Ví dụ: Tập lệnh (ISA), số lượng bit biểu diễn dữ liệu, các cơ chế I/O, các chế độ định địa chỉ bộ nhớ.
   - Tổ chức máy tính (Computer Organization): Đề cập đến các đơn vị vận hành phần cứng và mối liên kết giữa chúng nhằm hiện thực hóa kiến trúc. Ví dụ: Tín hiệu điều khiển phần cứng, công nghệ chế tạo bộ nhớ, thiết kế mạch.
2. Đối chiếu với câu hỏi, định nghĩa chuẩn xác nhất của Computer Architecture là 'Attributes visible to the programmer' (Phương án B).

Kiểm tra:
Khái niệm này được phát biểu kinh điển bởi Amdahl, Blaauw, và Brooks (1964) tại IBM khi thiết kế dòng System/360: Kiến trúc là hợp đồng giữa lập trình viên và phần cứng.

Vì sao các phương án khác sai:
- A (Physical components): Là thành phần vật lý/phần cứng cụ thể (hardware components).
- C (Electrical signals): Là tín hiệu điện tử thuộc mức vật lý và tổ chức phần cứng (Organization/Hardware).
- D (Memory chip design): Là thiết kế mạch vi điện tử của chip nhớ (VLSI design / Organization).

Lưu ý/công thức cần nhớ:
Architecture: Thuộc tính lập trình viên nhìn thấy (Visible to programmer).
Organization: Đơn vị vận hành và kết nối phần cứng (Operational units & interconnections).`,

    "545": `Hướng giải:
Giải thích lý do tại sao các sản phẩm và thiết bị ngoại vi chuẩn PCI (Peripheral Component Interconnect) từ nhiều nhà sản xuất phần cứng khác nhau có thể tương thích hoàn toàn với nhau.

Các bước:
1. Chuẩn bus PCI ban đầu được khởi xướng bởi Intel, nhưng sau đó toàn bộ đặc tả kỹ thuật (PCI specifications) đã được đưa vào phạm vi công cộng (public domain) và được chuyển giao cho tổ chức hiệp hội công nghiệp mở PCI-SIG (PCI Special Interest Group) quản lý và phát triển.
2. Hiệp hội PCI-SIG bao gồm hàng trăm công ty công nghệ hàng đầu cùng tham gia đóng góp và tuân thủ các bài kiểm tra tương thích nghiêm ngặt.
3. Nhờ các tiêu chuẩn kỹ thuật mở, công khai và được một hiệp hội toàn ngành giám sát, bất kỳ nhà cung cấp nào thiết kế card PCI đúng quy chuẩn đều có thể cắm và chạy (Plug and Play) trên mọi bo mạch chủ tương thích.
4. Do đó, phương án đúng là A.

Kiểm tra:
Mọi giáo trình chuẩn đều khẳng định tính tương thích rộng rãi của PCI bắt nguồn từ tính chất phi độc quyền (public domain) và sự đồng thuận của hiệp hội mở PCI-SIG.

Vì sao các phương án khác sai:
- B (Designed exclusively for Intel): Sai, ban đầu Intel phát triển nhưng PCI nhanh chóng trở thành tiêu chuẩn chung cho cả AMD, Apple PowerPC và nhiều kiến trúc khác.
- C (Uses proprietary patents): Sai, các bằng sáng chế độc quyền sẽ ngăn cản khả năng tương thích của các nhà sản xuất bên thứ ba, trái ngược hoàn toàn với tiêu chuẩn mở của PCI.
- D (Centralized arbitration): Trọng tài bus tập trung chỉ là cơ chế phần cứng phân xử tranh chấp quyền dùng bus, không phải lý do đảm bảo tính tương thích chuẩn hóa giữa các nhà cung cấp.

Lưu ý/công thức cần nhớ:
PCI tương thích rộng rãi nhờ: Public domain + Hiệp hội toàn ngành (PCI-SIG).`,

    "546": `Hướng giải:
Xác định kỹ thuật quản lý bộ nhớ chia không gian nhớ thành các khối có kích thước cố định (fixed-size blocks).

Các bước:
1. So sánh hai kỹ thuật phân vùng bộ nhớ cơ bản trong bộ nhớ ảo:
   - Phân trang (Paging): Không gian địa chỉ logic của tiến trình được chia thành các khối có kích thước cố định gọi là trang (pages, thường là \(4\,\mathrm{KB}\)). Bộ nhớ vật lý cũng được chia thành các khối cùng kích thước gọi là khung trang (frames hoặc page frames). Việc chia thành các khối cố định giúp loại bỏ phân mảnh ngoại vi (external fragmentation).
   - Phân đoạn (Segmentation): Chia bộ nhớ logic theo các đơn vị ngữ nghĩa của chương trình (hàm, mảng, ngăn xếp...) thành các khối có kích thước biến thiên (variable-size blocks).
2. Câu hỏi nêu rõ: 'divides memory into fixed-size blocks' \(\implies\) Paging (Phương án A).

Kiểm tra:
Bảng trang (Page Table) ánh xạ từ số trang ảo sang số khung trang vật lý có kích thước cố định hoàn toàn đồng nhất.

Vì sao các phương án khác sai:
- B (Segmentation): Chia thành các đoạn có kích thước biến thiên (variable-size), không phải cố định.
- C (Virtual memory): Là khái niệm bộ nhớ ảo nói chung, có thể thực hiện bằng Paging, Segmentation hoặc kết hợp cả hai.
- D (Swapping): Kỹ thuật hoán chuyển toàn bộ tiến trình giữa RAM và đĩa cứng, không phải kỹ thuật chia bộ nhớ thành các khối cố định.

Lưu ý/công thức cần nhớ:
Paging: Khối kích thước cố định (Fixed-size: Pages & Frames).
Segmentation: Khối kích thước biến thiên (Variable-size).`,

    "547": `Hướng giải:
Tìm hai lệnh nhảy có điều kiện (conditional jump instructions) trong hợp ngữ x86 được sử dụng khi điều kiện so sánh là 'nhỏ hơn hoặc bằng' (less than or equal to, ký hiệu \(\le\)).

Các bước:
1. Trong tập lệnh hợp ngữ x86, sau một lệnh so sánh có dấu (\(\mathrm{CMP}\)):
   - Điều kiện 'nhỏ hơn hoặc bằng' (Less than or Equal to): Ký hiệu bằng lệnh \(\mathrm{JLE}\) (Jump if Less or Equal). Lệnh này nhảy khi cờ \(\mathrm{ZF} = 1\) hoặc \(\mathrm{SF} 
e \mathrm{OF}\).
   - Về mặt logic Boolean, 'nhỏ hơn hoặc bằng' tương đương phủ định của 'lớn hơn' (Not Greater): Ký hiệu bằng lệnh \(\mathrm{JNG}\) (Jump if Not Greater). Lệnh này kiểm tra điều kiện y hệt \(\mathrm{JLE}\).
2. Thực tế trong kiến trúc x86 của Intel, \(\mathrm{JLE}\) và \(\mathrm{JNG}\) là hai tên gọi gợi nhớ (mnemonics) khác nhau của cùng một mã máy duy nhất (Opcode \`0x7E\` cho short jump và \`0x0F 0x8E\` cho near jump).
3. Do đó, hai lệnh đúng là \(\mathrm{JLE}\) (phương án A) và \(\mathrm{JNG}\) (phương án B).

Kiểm tra:
Bảng đối chiếu cờ trạng thái của Intel x86:
\[
\begin{array}{|l|l|l|}
\hline
	ext{Mnemonic} & 	ext{Ý nghĩa} & 	ext{Điều kiện cờ} \
\hline
\mathrm{JLE} & 	ext{Jump if Less or Equal} & \mathrm{ZF} = 1 	ext{ or } \mathrm{SF} 
e \mathrm{OF} \
\mathrm{JNG} & 	ext{Jump if Not Greater} & \mathrm{ZF} = 1 	ext{ or } \mathrm{SF} 
e \mathrm{OF} \
\hline
\end{array}
\]
Cả hai hoàn toàn đồng nhất.

Vì sao các phương án khác sai:
- C (\(\mathrm{JNLE}\)): Jump if Not Less or Equal, tương đương \(\mathrm{JG}\) (nhảy khi lớn hơn hẳn, \(>\)).
- D (\(\mathrm{JNGE}\)): Jump if Not Greater or Equal, tương đương \(\mathrm{JL}\) (nhảy khi nhỏ hơn hẳn, \(<\)).
- E (\(\mathrm{JNE}\)): Jump if Not Equal, nhảy khi không bằng (\(
e\)).
- F (\(\mathrm{JMP}\)): Unconditional Jump, nhảy không điều kiện.

Lưu ý/công thức cần nhớ:
Nhỏ hơn hoặc bằng (\(\le\)): \(\mathrm{JLE}\) = \(\mathrm{JNG}\) (Jump if Less or Equal / Jump if Not Greater).`,

    "548": `Hướng giải:
Xác định cấp bậc bộ nhớ có tốc độ nhanh nhất, giá thành trên mỗi bit đắt nhất và nằm gần bộ xử lý nhất trong kim tự tháp phân cấp bộ nhớ (Memory Hierarchy).

Các bước:
1. Sơ đồ hình tháp phân cấp bộ nhớ từ đỉnh xuống đáy:
   - Cấp 0 (Đỉnh tháp): Các thanh ghi nội bộ của CPU (Registers). Nằm ngay trên đường truyền dữ liệu của ALU, thời gian truy xuất chỉ một phần nhỏ của chu kỳ xung nhịp (< 1 ns), dung lượng nhỏ nhất (vài trăm byte đến vài KB), giá thành/bit cao nhất.
   - Cấp 1: Bộ nhớ đệm (Cache - L1, L2, L3) sử dụng SRAM.
   - Cấp 2: Bộ nhớ chính (Main Memory) sử dụng DRAM.
   - Cấp 3: Lưu trữ thứ cấp (Secondary Storage: SSD, HDD).
   - Cấp 4: Lưu trữ ngoại tuyến (Offline Storage: Magnetic Tape, Optical Disc).
2. Như vậy, thành phần nằm ở đỉnh cao nhất, nhanh nhất và đắt nhất chính là Registers (phương án A).

Kiểm tra:
Thanh ghi nằm ngay trong lòng vi xử lý, CPU truy xuất thanh ghi trong cùng chu kỳ lệnh mà không cần qua bất kỳ bus hay controller nào.

Vì sao các phương án khác sai:
- B (Main memory): Chậm hơn Cache và Registers hàng chục đến hàng trăm lần.
- C (Magnetic disk): Thuộc bộ nhớ ngoài, tốc độ cơ học cực chậm.
- D (Cache): Nhanh thứ hai sau Registers, nhưng vẫn đứng dưới Registers trong tháp phân cấp bộ nhớ.

Lưu ý/công thức cần nhớ:
Thứ tự tốc độ & giá thành/bit giảm dần: Registers > Cache > Main Memory > SSD > Magnetic Disk.`,

    "549": `Hướng giải:
Xác định chức năng cốt lõi của mạch dồn kênh (Multiplexer - MUX) trong kỹ thuật số và kiến trúc máy tính.

Các bước:
1. Bộ dồn kênh (Multiplexer - MUX), hay còn gọi là bộ chọn dữ liệu (data selector), là một mạch logic tổ hợp.
2. Cấu trúc chuẩn của bộ dồn kênh \(2^n\)-to-\(1\):
   - Có \(2^n\) đầu vào dữ liệu (\(I_0, I_1, \dots, I_{2^n-1}\)).
   - Có \(n\) đường tín hiệu điều khiển chọn (Select lines \(S_0, \dots, S_{n-1}\)).
   - Có duy nhất \(1\) đầu ra dữ liệu (\(Y\)).
3. Chức năng: Dựa vào giá trị nhị phân trên các đường chọn, bộ dồn kênh sẽ kết nối và cho phép một tín hiệu đầu vào duy nhất truyền qua đầu ra:
   \[
   Y = \sum_{k=0}^{2^n-1} m_k \cdot I_k
   \]
   với \(m_k\) là minterm của các biến chọn.
4. Do đó, chức năng của multiplexer là chọn một đầu vào từ nhiều đầu vào (Selects one input from many - phương án D).

Kiểm tra:
Trong đường truyền dữ liệu CPU (Datapath), MUX được dùng ở mọi nơi để lựa chọn nguồn dữ liệu đưa vào ALU hoặc nạp vào thanh ghi.

Vì sao các phương án khác sai:
- A (Combines signals): MUX không cộng gộp hay trộn các tín hiệu với nhau, nó chỉ chọn duy nhất 1 tín hiệu tại một thời điểm.
- B (Converts analog to digital): Đây là chức năng của bộ biến đổi ADC (Analog-to-Digital Converter).
- C (Stores data): MUX là mạch tổ hợp không có nhớ; việc lưu trữ dữ liệu là chức năng của mạch tuần tự (Flip-flop, thanh ghi, RAM).

Lưu ý/công thức cần nhớ:
Multiplexer (MUX) = Data Selector (Chọn 1 đầu vào trong nhiều đầu vào dựa trên tín hiệu chọn).`,

    "550": `Hướng giải:
Nhận diện bản chất và vai trò của tín hiệu ngắt (Interrupt signals) trong hoạt động của hệ thống máy tính.

Các bước:
1. Ngắt (Interrupt) là cơ chế mà qua đó các mô-đun phần cứng (như thiết bị I/O, bộ đếm thời gian Timer) hoặc các sự kiện phần mềm có thể tạm ngưng chu trình thực thi thông thường của CPU để yêu cầu CPU phục vụ xử lý một sự kiện khẩn cấp (Request for CPU attention).
2. Khi nhận được tín hiệu yêu cầu ngắt hợp lệ tại cuối chu kỳ lệnh (Interrupt Stage):
   - CPU lưu lại ngữ cảnh hiện tại (Program Counter và thanh ghi cờ vào Stack).
   - Chuyển hướng quyền điều khiển sang Chương trình con phục vụ ngắt (Interrupt Service Routine - ISR).
   - Sau khi thực thi xong ISR, CPU khôi phục lại ngữ cảnh và tiếp tục thực hiện chương trình bị gián đoạn.
3. Do đó, bản chất của tín hiệu ngắt là yêu cầu sự chú ý/phục vụ của CPU (Request for CPU attention - phương án A).

Kiểm tra:
Định nghĩa chuẩn trong Stallings Section 3.2: 'Virtually all computers provide a mechanism by which other modules (I/O, memory) may interrupt the normal sequencing of the processor.'

Vì sao các phương án khác sai:
- B (Memory fault): Lỗi bộ nhớ là một nguyên nhân cụ thể có thể kích hoạt ngắt ngoại lệ (Trap/Fault), nhưng bản thân khái niệm tín hiệu ngắt không đồng nghĩa với lỗi bộ nhớ.
- C (Cache miss): Hiện tượng trượt bộ đệm được xử lý bằng phần cứng nạp dòng nhớ, không phải tín hiệu ngắt ngoài.
- D (Data error): Lỗi dữ liệu chỉ là một dạng sự kiện có thể gây ngắt, không đại diện cho bản chất chung của tín hiệu ngắt.

Lưu ý/công thức cần nhớ:
Interrupt = Tín hiệu yêu cầu CPU tạm dừng để xử lý sự kiện (Request for CPU attention).`,

    "551": `Hướng giải:
Xác định chức năng cơ bản nhất của phần tử lật trạng thái (Flip-flop) trong kỹ thuật số và thiết kế máy tính.

Các bước:
1. Mạch lật (Flip-flop) là phần tử logic tuần tự cơ bản có tính chất ổn định kép (bistable).
2. Một flip-flop có hai trạng thái ổn định tương ứng với giá trị logic \(0\) hoặc \(1\).
3. Trạng thái của flip-flop được duy trì liên tục cho đến khi có xung kích thích (clock pulse hoặc tín hiệu set/reset) làm thay đổi trạng thái của nó.
4. Do đó, một flip-flop hoạt động như một ô nhớ cơ sở, có chức năng lưu trữ đúng \(1	ext{ bit}\) dữ liệu (Store a single bit of data - phương án B).
5. Khi kết hợp nhiều flip-flop lại với nhau, ta tạo nên các thanh ghi (registers) và các ô nhớ tĩnh (SRAM cells).

Kiểm tra:
Mọi sách giáo khoa kỹ thuật số đều định nghĩa: 'A flip-flop is a bistable circuit used to store one bit of information.'

Vì sao các phương án khác sai:
- A (Perform addition): Thực hiện phép cộng là chức năng của mạch cộng (Adder: Half Adder, Full Adder).
- C (Generate signals): Tạo tín hiệu xung nhịp là chức năng của mạch dao động tạo xung (Clock Generator / Oscillator).
- D (Execute arithmetic operations): Thực hiện các phép tính số học là chức năng của khối ALU.

Lưu ý/công thức cần nhớ:
Flip-flop = 1-bit storage element (Lưu trữ 1 bit dữ liệu).`,

    "552": `Hướng giải:
Xác định kỹ thuật vào/ra (I/O technique) cho phép các thiết bị ngoại vi chủ động gửi tín hiệu ngắt CPU một cách bất đồng bộ (asynchronously) khi đã sẵn sàng truyền nhận dữ liệu.

Các bước:
1. Có 3 kỹ thuật I/O cơ bản trong kiến trúc máy tính:
   - Programmed I/O (I/O lập trình): CPU chủ động gửi lệnh I/O và sau đó phải chờ đợi thiết bị hoàn thành bằng cách liên tục kiểm tra cờ trạng thái (vòng lặp bận - busy waiting / polling). Lãng phí thời gian CPU rất lớn.
   - Interrupt-driven I/O (I/O điều khiển bằng ngắt): CPU ra lệnh bắt đầu tác vụ I/O rồi quay sang làm công việc khác. Khi thiết bị ngoại vi hoàn thành việc chuẩn bị dữ liệu, nó sẽ chủ động phát tín hiệu ngắt bất đồng bộ tới CPU. CPU tạm dừng công việc hiện tại để chuyển dữ liệu rồi quay lại công việc cũ.
   - DMA (Direct Memory Access): Bộ điều khiển DMA chuyên dụng đảm nhiệm việc truyền trực tiếp các khối dữ liệu lớn giữa I/O và RAM mà không cần CPU tham gia từng byte.
2. Kỹ thuật được thiết kế chuyên biệt để thiết bị ngắt CPU bất đồng bộ khi sẵn sàng chính là Interrupt-driven I/O (phương án C).

Kiểm tra:
Từ khóa 'interrupt the CPU asynchronously' tương ứng trực tiếp với cơ chế Interrupt-driven I/O trong Stallings Section 7.4.

Vì sao các phương án khác sai:
- A (Programmed I/O): CPU hoàn toàn kiểm soát và chờ đợi tuần tự, thiết bị không thể ngắt CPU.
- B (Polling): Là kỹ thuật kiểm tra tuần tự trạng thái thiết bị trong Programmed I/O, hoàn toàn đồng bộ theo sự điều khiển của CPU.
- D (Direct Memory Access): Dù DMA có gửi 1 ngắt khi kết thúc toàn bộ khối truyền, nhưng bản chất của DMA là truyền trực tiếp bỏ qua CPU, không phải là cơ chế I/O tổng quát cho việc ngắt CPU để truyền từng đơn vị dữ liệu như Interrupt-driven I/O.

Lưu ý/công thức cần nhớ:
Interrupt-driven I/O: Thiết bị chủ động ngắt CPU bất đồng bộ khi sẵn sàng trao đổi dữ liệu.`,

    "553": `Hướng giải:
Chọn 2 phát biểu chính xác về cách biểu diễn lệnh máy (instruction representation) bên trong hệ thống máy tính theo giáo trình William Stallings.

Các bước:
1. Trích dẫn nguyên văn hai câu định nghĩa nền tảng trong William Stallings COA (Chương 12, Mục 12.1 - Machine Instruction Characteristics, tiểu mục Instruction Representation):
   - Câu 1: 'Within the computer, each instruction is represented by a sequence of bits.' (Bên trong máy tính, mỗi lệnh được biểu diễn bằng một chuỗi các bit nhị phân). \(\implies\) Khớp phương án A.
   - Câu 2: 'The instruction is divided into fields, corresponding to the constituent elements of the instruction.' (Lệnh được chia thành các trường, tương ứng với các thành phần cấu thành nên lệnh, ví dụ: trường Opcode, trường địa chỉ toán hạng Operand References). \(\implies\) Khớp phương án D.
2. Như vậy, hai phương án đúng cần chọn là A và D.

Kiểm tra:
Bố cục định dạng lệnh (Instruction Format) thể hiện rõ ràng các trường bit (Opcode field, Address field, Mode field), minh chứng trực quan cho phương án D.

Vì sao các phương án khác không được chọn:
- B: Mặc dù vi xử lý chứa các thanh ghi và lệnh có thể tham chiếu thanh ghi, nhưng đây là thuộc tính về cấu trúc tài nguyên vi xử lý, không phải phát biểu định nghĩa tổng quát về nguyên lý biểu diễn một lệnh máy (Instruction Representation) trong giáo trình Stallings.
- C: Toán hạng có thể nằm trong bộ nhớ hoặc thanh ghi, giá trị của toán hạng không nhất thiết nằm trực tiếp trong trường của lệnh (chỉ có chế độ tức thời Immediate Addressing mới chứa trực tiếp giá trị).

Lưu ý/công thức cần nhớ:
Biểu diễn lệnh máy: Biểu diễn bằng chuỗi bit (Sequence of bits) và chia thành các trường (Divided into fields).`,

    "554": `Hướng giải:
Tính toán số lượng địa chỉ ô nhớ duy nhất có thể được định địa chỉ trực tiếp (directly addressed) dựa trên độ dài lệnh và số bit mã thao tác (opcode).

Các bước:
1. Phân tích cấu trúc định dạng lệnh \(16	ext{ bits}\):
   - Tổng độ dài lệnh: \(L = 16	ext{ bits}\).
   - Độ dài trường mã thao tác (Opcode): \(k_{	ext{opcode}} = 4	ext{ bits}\).
   - Số bit còn lại dành cho trường địa chỉ (Address field):
     \[
     k_{	ext{address}} = 16 - 4 = 12	ext{ bits}
     \]
2. Trong chế độ định địa chỉ trực tiếp (Direct Addressing Mode):
   - Trường địa chỉ trong lệnh chứa trực tiếp địa chỉ hiệu dụng của ô nhớ trong bộ nhớ chính:
     \[
     \mathrm{EA} = A
     \]
   - Với \(12	ext{ bits}\) địa chỉ, số lượng địa chỉ ô nhớ nhị phân phân biệt có thể biểu diễn được là:
     \[
     N = 2^{12} = 4096	ext{ địa chỉ}
     \]
3. Do đó, phương án đúng là A (\(4096\)).

Kiểm tra:
\[
2^{10} = 1024, \quad 2^{11} = 2048, \quad 2^{12} = 4096
\]
Phép tính lũy thừa hoàn toàn chính xác.

Vì sao các phương án khác sai:
- B (\(1024 = 2^{10}\)): Tương ứng với \(10	ext{ bits}\) địa chỉ (opcode \(6	ext{ bits}\)).
- C (\(8192 = 2^{13}\)): Tương ứng với \(13	ext{ bits}\) địa chỉ (opcode \(3	ext{ bits}\)).
- D (\(2048 = 2^{11}\)): Tương ứng với \(11	ext{ bits}\) địa chỉ (opcode \(5	ext{ bits}\)).
- E (\(512 = 2^9\)), F (\(256 = 2^8\)) không khớp số bit còn lại.

Lưu ý/công thức cần nhớ:
Số địa chỉ trực tiếp: \(2^{	ext{Số bit trường địa chỉ}} = 2^{	ext{Độ dài lệnh} - 	ext{Số bit Opcode}}\).`,

    "555": `Hướng giải:
Xác định kiến trúc vi xử lý RISC nào tích hợp kỹ thuật rẽ nhánh trễ (delayed branch) như một đặc trưng kiến trúc nổi tiếng.

Các bước:
1. Kỹ thuật rẽ nhánh trễ (Delayed Branch):
   - Trong các bộ xử lý đường ống (pipelined processors), khi gặp lệnh rẽ nhánh, bộ xử lý có thể bị trừng phạt mất chu kỳ (branch penalty) do phải chờ giải mã và tính địa chỉ đích.
   - Để tối ưu hóa, các kiến trúc RISC cổ điển áp dụng kỹ thuật rẽ nhánh trễ: lệnh nằm ngay sau lệnh rẽ nhánh (gọi là khe trễ rẽ nhánh - branch delay slot) luôn luôn được tìm nạp và thực thi bất kể lệnh rẽ nhánh có xảy ra hay không.
2. Khảo sát các kiến trúc được liệt kê:
   - SPARC (Scalable Processor Architecture do Sun Microsystems phát triển) và MIPS là hai kiến trúc RISC kinh điển nổi tiếng nhất triển khai rẽ nhánh trễ ngay trong phần cứng ISA.
   - Intel x86 và VAX là các kiến trúc CISC phức tạp, không sử dụng khe trễ rẽ nhánh kiểu RISC.
   - ARM là kiến trúc RISC nhưng không sử dụng rẽ nhánh trễ (ARM sử dụng thực thi có điều kiện - conditional execution trên mọi lệnh và dự đoán nhánh - branch prediction).
3. Do đó, phương án đúng là B (SPARC).

Kiểm tra:
Giáo trình William Stallings (Chương 15, Mục 15.6 - SPARC) dành riêng một phần phân tích cấu trúc thanh ghi cửa sổ (Register Windows) và rẽ nhánh trễ (Delayed Branch) của SPARC.

Vì sao các phương án khác sai:
- A (Intel x86): Kiến trúc CISC.
- C (ARM): Kiến trúc RISC nhưng không sử dụng delayed branch.
- D (VAX): Điển hình kinh điển của kiến trúc CISC phức tạp thế kỷ 20.

Lưu ý/công thức cần nhớ:
SPARC và MIPS là 2 kiến trúc RISC tiêu biểu ứng dụng Delayed Branch (Branch delay slot).`,

    "556": `Hướng giải:
Xác định cú pháp lệnh hợp ngữ x86 chuẩn để cộng nội dung thanh ghi \(\mathrm{EAX}\) với thanh ghi \(\mathrm{EBX}\) và lưu kết quả trở lại vào \(\mathrm{EAX}\).

Các bước:
1. Trong cú pháp hợp ngữ Intel x86 tiêu chuẩn:
   - Cú pháp lệnh hai toán hạng là: \`OPCODE destination, source\` (Toán hạng đích đứng trước, toán hạng nguồn đứng sau).
   - Thao tác thực hiện của lệnh cộng (\(\mathrm{ADD}\)) là:
     \[
     \mathrm{destination} \leftarrow \mathrm{destination} + \mathrm{source}
     \]
2. Theo yêu cầu đề bài:
   - Giá trị được cộng: nội dung của \(\mathrm{EAX}\) và \(\mathrm{EBX}\).
   - Nơi lưu kết quả: thanh ghi \(\mathrm{EAX}\) \(\implies\) \(\mathrm{EAX}\) phải đóng vai trò là toán hạng đích (destination).
   - Thanh ghi nguồn: \(\mathrm{EBX}\) đóng vai trò toán hạng nguồn (source).
3. Ghép vào cấu trúc: \`add eax, ebx\`.
4. Phương án đúng là A.

Kiểm tra:
Lệnh \`add eax, ebx\` thực hiện:
\[
\mathrm{EAX} = \mathrm{EAX} + \mathrm{EBX}
\]
Kết quả được lưu vào EAX.

Vì sao các phương án khác sai:
- B (\`inc eax, ebx\`): Sai cú pháp, lệnh \(\mathrm{INC}\) là lệnh một toán hạng (unary instruction) chỉ nhận 1 tham số (ví dụ \`inc eax\` tăng EAX lên 1).
- C (\`mov eax, ebx\`): Lệnh sao chép dữ liệu từ EBX sang EAX (\(\mathrm{EAX} \leftarrow \mathrm{EBX}\)), không thực hiện phép cộng.
- D (\`add ebx, eax\`): Thực hiện cộng và lưu kết quả vào thanh ghi EBX (\(\mathrm{EBX} \leftarrow \mathrm{EBX} + \mathrm{EAX}\)), trái với yêu cầu lưu kết quả vào EAX.

Lưu ý/công thức cần nhớ:
Cú pháp Intel: \`ADD đích, nguồn\` \(\implies\) \`đích = đích + nguồn\`.`,

    "557": `Hướng giải:
Xác định thành phần phần cứng chịu trách nhiệm truyền thông và trao đổi dữ liệu giữa CPU, Bộ nhớ chính và các thiết bị I/O trong cấu trúc nội bộ của máy tính.

Các bước:
1. Trong kiến trúc máy tính Von Neumann truyền thống, đường liên kết hệ thống (System Interconnection) được hiện thực hóa vật lý thông qua Bus hệ thống (System Bus).
2. Bus hệ thống là một tập hợp các đường dây dẫn điện chia sẻ chung, cho phép truyền tải tín hiệu giữa 3 thành phần phần cứng mức đỉnh cốt lõi:
   - CPU (Bộ vi xử lý)
   - Main Memory (Bộ nhớ chính RAM)
   - I/O Modules (Các mô-đun vào/ra)
3. Cấu trúc Bus hệ thống bao gồm:
   - Bus dữ liệu (Data Bus): Truyền tải dữ liệu giữa các khối.
   - Bus địa chỉ (Address Bus): Xác định nguồn hoặc đích của dữ liệu.
   - Bus điều khiển (Control Bus): Kiểm soát việc cấp quyền và định thời truy xuất.
4. Do đó, phương án đúng là B (System Bus).

Kiểm tra:
Khái niệm System Bus là câu trả lời kinh điển cho mọi câu hỏi về cơ chế giao tiếp phần cứng giữa CPU, Memory và I/O.

Vì sao các phương án khác sai:
- A (Control Unit): Là thành phần nội bộ bên trong CPU, chịu trách nhiệm giải mã lệnh và phát tín hiệu điều khiển vi thao tác trong CPU.
- C (ALU): Là khối tính toán số học và logic bên trong CPU.
- D (Registers): Là các ô nhớ tạm tốc độ cao bên trong CPU.

Lưu ý/công thức cần nhớ:
System Bus = Data Bus + Address Bus + Control Bus \(\implies\) Giao tiếp giữa CPU, Memory và I/O.`,

    "558": `Hướng giải:
Phân loại chế độ định địa chỉ tương đối theo con trỏ lệnh (PC-relative addressing) vào nhóm chế độ định địa chỉ tổng quát trong kiến trúc máy tính.

Các bước:
1. Định địa chỉ dịch chuyển (Displacement Addressing):
   - Là một nhóm chế độ định địa chỉ mạnh mẽ kết hợp giữa định địa chỉ trực tiếp và định địa chỉ gián tiếp qua thanh ghi.
   - Công thức tổng quát tính địa chỉ hiệu dụng:
     \[
     \mathrm{EA} = A + (R)
     \]
     Trong đó \(A\) là giá trị độ dời (displacement/offset) trong lệnh, và \((R)\) là nội dung của một thanh ghi được chỉ định.
2. Ba dạng phổ biến nhất của định địa chỉ dịch chuyển:
   - Định địa chỉ tương đối (Relative Addressing / PC-relative): Thanh ghi được tham chiếu ngầm định là con trỏ lệnh \(\mathrm{PC}\) (Program Counter):
     \[
     \mathrm{EA} = A + (\mathrm{PC})
     \]
     Thường dùng trong các lệnh nhảy ngắn (branches/jumps).
   - Định địa chỉ thanh ghi cơ sở (Base-Register Addressing): Thanh ghi được tham chiếu là thanh ghi cơ sở lưu địa chỉ đầu đoạn.
   - Định chỉ số (Indexing): Thanh ghi được tham chiếu là thanh ghi chỉ số (Index register).
3. Do đó, PC-relative addressing là một dạng của Displacement addressing (phương án C).

Kiểm tra:
Đối chiếu cấu trúc phân loại trong Stallings Bảng 13.1 (Basic Addressing Modes): Hàng 'Displacement' bao gồm 'Relative, Base-register, Indexing'.

Vì sao các phương án khác sai:
- A (Immediate): Giá trị toán hạng nằm trực tiếp trong lệnh, không có địa chỉ bộ nhớ.
- B (Indirect): Trường địa chỉ chứa địa chỉ của một ô nhớ khác chứa địa chỉ hiệu dụng.
- D (Stack): Toán hạng được ngầm định ở đỉnh ngăn xếp (thanh ghi SP).

Lưu ý/công thức cần nhớ:
Displacement addressing gồm: PC-relative, Base-register, và Indexing.`,

    "559": `Hướng giải:
Chọn phát biểu phù hợp nhất mô tả đặc điểm vận hành của kiến trúc siêu đường ống chỉ lệnh (instruction super-pipeline).

Các bước:
1. Phân biệt Super-pipeline và Superscalar (William Stallings Chương 16 - Hình 16.1):
   - Đường ống cơ bản (Base pipeline): Mỗi giai đoạn chiếm 1 chu kỳ xung nhịp cơ sở.
   - Siêu đường ống (Super-pipeline): Chia nhỏ các giai đoạn đường ống cơ bản thành các phân đoạn nhỏ hơn (sub-stages), cho phép phát lệnh với chu kỳ xung nhịp nội bộ ngắn hơn (ví dụ: phát lệnh ở mỗi nửa chu kỳ xung nhịp). Các lệnh được gối đầu so le theo thời gian ở mức độ chia nhỏ, tức là thực thi gối đầu lệch pha nhau (non-fully overlapping at base cycle boundaries).
   - Siêu phân vô hướng (Superscalar): Nhân bản nhiều đơn vị thực thi phần cứng song song, cho phép phát đồng thời nhiều lệnh hoàn chỉnh trong cùng một chu kỳ xung nhịp (fully overlapping).
2. Trong ngân hàng câu hỏi kiến trúc máy tính, phát biểu đặc trưng cho super-pipeline là: 'It allows instructions to be executed in a non-fully overlapping manner' (Phương án A), nhằm phân biệt với tính chất song song hoàn toàn (fully overlapping/parallel) của superscalar.
3. Đồng thời ghi nhận: Một số tài liệu trắc nghiệm mở rộng có thể nhắc đến phương án C ('in both fully overlapping and non-fully overlapping manners') khi xem xét super-pipeline kết hợp superscalar. Tuy nhiên phương án chuẩn tắc đơn kiến trúc là A.

Kiểm tra:
Đối chiếu sơ đồ thời gian Hình 16.1 (Comparison of Superscalar and Superpipeline Approaches): Các lệnh trong superpipeline được khởi động so le từng nửa chu kỳ, tạo nên sự gối đầu bán phần (non-fully overlapping in base time).

Vì sao các phương án khác sai:
- B (Consecutively manner only): Sai, đây là đặc tính của xử lý tuần tự không có đường ống.
- D (Fully independent manner): Các giai đoạn trong một đường ống phụ thuộc chặt chẽ về dữ liệu và xung nhịp, không hoạt động độc lập hoàn toàn.

Lưu ý/công thức cần nhớ:
Super-pipeline: Tăng độ sâu đường ống, rút ngắn chu kỳ xung nhịp, gối đầu so le (non-fully overlapping).
Superscalar: Nhân bản đường ống, phát nhiều lệnh cùng chu kỳ.`,

    "560": `Hướng giải:
Xác định chỉ số đo lường hiệu năng máy tính (performance metric) được định nghĩa là số chu kỳ xung nhịp trung bình cần thiết để thực thi một lệnh.

Các bước:
1. Các thông số hiệu năng vi xử lý cốt lõi:
   - \(I_c\) (Instruction Count): Tổng số lệnh thực thi của một chương trình.
   - \(f\) (Clock Frequency, đo bằng \(\mathrm{GHz}\) hoặc \(\mathrm{MHz}\)): Tần số xung nhịp của CPU.
   - \(T\) (Clock Cycle Time): Chu kỳ xung nhịp, \(T = rac{1}{f}\).
   - CPI (Cycles Per Instruction): Số chu kỳ xung nhịp trung bình để thực thi một chỉ lệnh:
     \[
     \mathrm{CPI} = rac{	ext{Tổng số chu kỳ xung nhịp}}{	ext{Tổng số chỉ lệnh}} = rac{	ext{Total Cycles}}{I_c}
     \]
2. Thời gian thực thi CPU được tính theo công thức kinh điển:
   \[
   T_{\mathrm{CPU}} = I_c 	imes \mathrm{CPI} 	imes T = rac{I_c 	imes \mathrm{CPI}}{f}
   \]
3. Khớp định nghĩa với câu hỏi \(\implies\) Chỉ số này là CPI (phương án C).

Kiểm tra:
Trong các bộ xử lý hiện đại:
- Kiến trúc đơn giản cổ điển: \(\mathrm{CPI} > 1\).
- Kiến trúc đường ống lý tưởng: \(\mathrm{CPI} = 1\).
- Kiến trúc siêu phân vô hướng (Superscalar): \(\mathrm{CPI} < 1\) (thường đo bằng IPC = Instructions Per Cycle = \(rac{1}{\mathrm{CPI}}\)).

Vì sao các phương án khác sai:
- A (MIPS): Millions of Instructions Per Second, đo số triệu chỉ lệnh thực thi trong 1 giây (\(\mathrm{MIPS} = rac{f}{\mathrm{CPI} 	imes 10^6}\)).
- B (GHz): Gigahertz, đơn vị đo tần số xung nhịp của bộ vi xử lý (tỷ chu kỳ/giây).
- D (Throughput): Thông lượng, là số lượng công việc/tác vụ hoàn thành trong một đơn vị thời gian.

Lưu ý/công thức cần nhớ:
CPI = Cycles Per Instruction = Số chu kỳ trung bình cho mỗi lệnh.`,

    "561": `Hướng giải:
Xác định chức năng chính xác của Thanh ghi chỉ lệnh (Instruction Register - IR) trong bộ vi xử lý.

Các bước:
1. Trong chu trình thực thi lệnh của CPU (Instruction Cycle):
   - Bước 1 (Fetch): CPU đọc lệnh từ bộ nhớ chính (tại địa chỉ do thanh ghi PC chỉ tới) thông qua MAR và MBR, rồi nạp mã lệnh này vào Thanh ghi chỉ lệnh (Instruction Register - IR).
   - Bước 2 (Decode): Khối điều khiển (Control Unit) giải mã lệnh đang nằm trong IR để chuẩn bị phát các tín hiệu vi thao tác.
   - Bước 3 (Execute): Thực thi các thao tác theo mã lệnh trong IR.
2. Như vậy, trong suốt quá trình giải mã và thực thi, thanh ghi IR lưu trữ chỉ lệnh hiện đang được thực thi (Stores currently executing instruction - phương án B).

Kiểm tra:
Phân biệt rõ ràng giữa IR và PC:
- PC (Program Counter): Lưu địa chỉ của lệnh tiếp theo cần tìm nạp.
- IR (Instruction Register): Lưu mã nhị phân của lệnh hiện đang được thực thi.

Vì sao các phương án khác sai:
- A (Stores next instruction): Đây là chức năng của Program Counter (PC).
- C (Stores memory address): Đây là chức năng của Memory Address Register (MAR).
- D, E (Stores output / Store data): Đây là chức năng của Memory Buffer Register (MBR) hoặc thanh ghi tích lũy Accumulator (AC).

Lưu ý/công thức cần nhớ:
PC = Lưu địa chỉ lệnh tiếp theo.
IR = Lưu lệnh hiện đang thực thi (Currently executing instruction).`,

    "562": `Hướng giải:
Giải thích mục đích chính của Giao thức duy trì tính nhất quán bộ đệm (Cache Coherence Protocol, ví dụ MESI) trong các hệ thống xử lý đa nhân (multicore systems).

Các bước:
1. Vấn đề mất tính nhất quán bộ đệm (Cache Incoherence):
   - Trong hệ thống đa nhân, mỗi nhân có bộ đệm cục bộ riêng (private L1/L2 cache).
   - Nếu Nhân 1 sửa đổi giá trị của một biến trong cache riêng của nó mà không thông báo, thì Nhân 2 khi đọc biến đó từ cache của chính nó sẽ đọc phải giá trị cũ (stale data).
2. Mục đích của giao thức nhất quán bộ đệm (như MESI, MOESI):
   - Theo dõi trạng thái của các dòng cache trên hệ thống bus (Snooping/Directory-based).
   - Quản lý và đồng bộ hóa việc đọc/ghi dữ liệu giữa các bộ nhớ đệm riêng lẻ để mọi nhân xử lý đều nhìn thấy một hình ảnh bộ nhớ duy nhất, chính xác và nhất quán (consistent view of main memory).
3. Do đó, phương án đúng là B.

Kiểm tra:
Khái niệm 'consistent view of memory' là định nghĩa học thuật chuẩn mực trong thiết kế bộ nhớ hệ thống đa xử lý đối xứng.

Vì sao các phương án khác sai:
- A: Tần số xung nhịp không liên quan đến tính nhất quán dữ liệu bộ nhớ; nhiều vi xử lý hiện đại điều chỉnh xung nhịp độc lập trên từng nhân (per-core DVFS).
- C: Các nhân có bộ đệm L1 riêng biệt, không dùng chung 1 L1 cache.
- D: Ép xung tự động và ngủ nhân là tính năng quản lý điện năng (như Intel Turbo Boost), không phải Cache Coherence.
- E: Phân chia RAM thành các vùng độc lập thuộc về cơ chế phân phối bộ nhớ của HĐH hoặc NUMA, không phải mục đích của MESI.

Lưu ý/công thức cần nhớ:
Cache Coherence Protocol = Đảm bảo mọi nhân đều nhìn thấy dữ liệu bộ nhớ nhất quán (Consistent view of memory).`,

    "563": `Hướng giải:
Xác định cấu tạo gồm các nhóm đường truyền chức năng của một Bus hệ thống (System Bus).

Các bước:
1. Theo giáo trình William Stallings (Chương 3, Mục 3.3 - Bus Interconnection):
   Về mặt vật lý, một bus hệ thống gồm từ 50 đến hàng trăm đường dây dẫn riêng biệt. Các đường dây này được phân chia thành đúng 3 nhóm chức năng cơ bản:
   - Đường dữ liệu (Data lines / Data bus): Truyền tải dữ liệu thực tế giữa các mô-đun hệ thống. Số lượng đường xác định độ rộng bus dữ liệu (ví dụ: 32 bit, 64 bit).
   - Đường địa chỉ (Address lines / Address bus): Chỉ định nguồn hoặc đích của dữ liệu trên bus dữ liệu. Số lượng đường xác định không gian địa chỉ tối đa của hệ thống (\(2^k\)).
   - Đường điều khiển (Control lines / Control bus): Điều khiển việc truy cập và sử dụng các đường dữ liệu và địa chỉ (ví dụ: Memory Read, Memory Write, I/O Read, I/O Write, Bus Request, Bus Grant, Clock, Reset).
2. Do đó, bus hệ thống bao gồm: Data lines + Address lines + Control lines (Phương án B).

Kiểm tra:
Sơ đồ cấu trúc Bus hệ thống chuẩn luôn minh họa 3 bó dây: Data bus, Address bus, và Control bus kết nối giữa CPU, Memory và I/O.

Vì sao các phương án khác sai:
- A (CPU + Memory): Là các khối phần cứng kết nối vào bus, không phải là cấu tạo của chính bus.
- C (Registers + ALU): Là các thành phần nằm bên trong CPU.
- D (Cache + RAM): Là các cấp bộ nhớ.

Lưu ý/công thức cần nhớ:
System Bus = Data lines + Address lines + Control lines.`,

    "564": `Hướng giải:
Chọn khẳng định đúng về máy tính IAS (máy tính của Viện Nghiên cứu Cao cấp Princeton) - cội nguồn của kiến trúc máy tính hiện đại.

Các bước:
1. Lịch sử máy tính IAS:
   - Năm 1945, nhà toán học John von Neumann cùng các đồng nghiệp tại Viện Nghiên cứu Cao cấp Princeton (Institute for Advanced Study - IAS) đã công bố bản thiết kế kiến trúc máy tính mới dựa trên khái niệm chương trình được lưu trữ (Stored-program concept).
   - Máy tính IAS được hoàn thành vào năm 1952 tại Viện IAS (Princeton, New Jersey).
   - Nguyên lý Stored-program: Cả dữ liệu và các chỉ lệnh chương trình đều được mã hóa dưới dạng số nhị phân và lưu trữ chung trong cùng một bộ nhớ đọc/ghi (Main Memory). CPU thực hiện tuần tự việc tìm nạp lệnh từ bộ nhớ để thực thi.
2. Như vậy, khẳng định chính xác là: Máy tính IAS được xây dựng dựa trên khái niệm chương trình lưu trữ do John von Neumann phát triển (Phương án B).

Kiểm tra:
Kiến trúc IAS chính là nguyên mẫu trực tiếp của cái gọi là 'Kiến trúc Von Neumann' mà đại đa số máy tính ngày nay vẫn đang tuân theo.

Vì sao các phương án khác sai:
- A: Máy tính IAS sử dụng đèn điện tử chân không (vacuum tubes, khoảng 2300 đèn), không phải transistor.
- C: IAS được chế tạo tại Viện IAS ở Princeton (Mỹ), không phải Đại học Cambridge (ở Cambridge là máy EDSAC do Maurice Wilkes chế tạo).
- D: Nguyên lý cốt lõi của IAS là lưu trữ cả lệnh và dữ liệu trong bộ nhớ chính; phát biểu 'chỉ lưu dữ liệu' là hoàn toàn sai.

Lưu ý/công thức cần nhớ:
IAS Computer = Stored-program concept (John von Neumann, Princeton).`,

    "565": `Hướng giải:
Phân loại các biểu thức đại số Boolean theo dạng chuẩn Tổng các tích (Sum of Products - SOP).

Các bước:
1. Định nghĩa dạng Tổng các tích (Sum of Products - SOP):
   - Một biểu thức logic ở dạng SOP là biểu thức gồm phép \(+\) (phép HOẶC - OR logic) áp dụng giữa hai hay nhiều số hạng tích (AND terms).
   - Mỗi số hạng tích là phép nhân logic (AND) của các biến (ở dạng nguyên bản hoặc dạng đảo). Một tích đơn biến/đơn số hạng cũng được xem là dạng tích suy biến của SOP.
2. Kiểm tra từng biểu thức đã cho:
   - (A) \(F = AB + BC\): Là phép OR của hai tích \(AB\) và \(BC\) \(\implies\) Đúng chuẩn dạng SOP.
   - (B) \(F = A'B'C + AB'C' + ABC\): Là phép OR của ba tích \(\implies\) Đúng chuẩn dạng SOP (dạng chính tắc minterm).
   - (C) \(F = AB\): Là một số hạng tích đơn lẻ, được công nhận là dạng SOP suy biến (1-term SOP) \(\implies\) Thuộc dạng SOP.
   - (D) \(F = (A + B)(A + C)\): Là phép NHÂN (AND) của các tổng (OR terms) \(\implies\) Đây là dạng Tích các tổng (Product of Sums - POS), KHÔNG phải SOP.
3. Như vậy, các biểu thức thuộc dạng SOP gồm: (A), (B), và (C).
4. Ghép lại tương ứng với lựa chọn A (ABC).

Kiểm tra:
Dạng SOP có thể được triển khai trực tiếp bằng mạng cổng AND-OR hai tầng kinh điển trong mạch logic tổ hợp.

Vì sao các phương án khác sai:
- B, C, D đều chứa biểu thức (D), mà (D) rõ ràng là dạng POS (Product of Sums), không thể là SOP.

Lưu ý/công thức cần nhớ:
SOP (Sum of Products): Dạng \(AB + CD\) (Phép OR của các tích AND).
POS (Product of Sums): Dạng \((A+B)(C+D)\) (Phép AND của các tổng OR).`,

    "566": `Hướng giải:
Xác định chỉ lệnh nào trong các phương án thuộc nhóm lệnh chuyển dữ liệu (Data Transfer Instructions).

Các bước:
1. Phân loại các thao tác lệnh máy trong tập lệnh CPU (Stallings Chương 12):
   - Chuyển dữ liệu (Data Transfer): Di chuyển dữ liệu giữa các thanh ghi hoặc giữa bộ nhớ và thanh ghi. Các lệnh tiêu biểu: \`LOAD\` (nạp từ bộ nhớ vào thanh ghi), \`STORE\` (lưu từ thanh ghi vào bộ nhớ), \`MOV\` (sao chép giữa các thanh ghi).
   - Số học (Arithmetic): Thực hiện phép tính số học trên dữ liệu. Tiêu biểu: \`ADD\`, \`SUB\`, \`MUL\`, \`DIV\`.
   - Logic: Thực hiện phép toán Boolean hoặc dịch bit. Tiêu biểu: \`AND\`, \`OR\`, \`NOT\`, \`XOR\`, \`SHL\`, \`SHR\`.
   - Điều khiển luồng / Chuyển quyền điều khiển (Control Transfer / Branching): Thay đổi con trỏ lệnh PC. Tiêu biểu: \`JMP\`, \`CALL\`, \`RET\`, \`BEQ\`, \`BNE\`.
   - So sánh / Kiểm tra (Comparison / Test): Tiêu biểu: \`CMP\`, \`TEST\`.
2. Trong các phương án đưa ra, \`LOAD\` là lệnh thực hiện chuyển dữ liệu từ bộ nhớ vào thanh ghi.
3. Phương án đúng là B (LOAD).

Kiểm tra:
Lệnh \`LOAD R1, [Address]\` chuyển nguyên vẹn nội dung ô nhớ vào thanh ghi R1 mà không làm biến đổi giá trị dữ liệu.

Vì sao các phương án khác sai:
- A (\`ADD\`): Lệnh số học (Arithmetic instruction).
- C (\`JMP\`): Lệnh chuyển quyền điều khiển / nhảy (Branch / Control transfer instruction).
- D (\`CMP\`): Lệnh so sánh (thực hiện phép trừ ngầm để cập nhật cờ trạng thái).

Lưu ý/công thức cần nhớ:
Data transfer instructions: LOAD, STORE, MOVE.`,

    "567": `Hướng giải:
Xác định vai trò chính yếu (primary role) của Hệ điều hành (Operating System - OS) trong hệ thống máy tính.

Các bước:
1. Định nghĩa chuẩn về Hệ điều hành:
   - Hệ điều hành là phần mềm hệ thống hoạt động như một lớp trung gian giữa người dùng / phần mềm ứng dụng và phần cứng máy tính.
   - Hai chức năng cốt lõi nhất của hệ điều hành:
     + Bộ quản lý tài nguyên (Resource Manager): Quản lý, điều phối và phân bổ hiệu quả, an toàn các tài nguyên phần cứng (CPU, bộ nhớ RAM, thiết bị I/O, dung lượng đĩa) và tài nguyên phần mềm (tập tin, tiến trình, luồng, bảo mật).
     + Máy mở rộng / Giao diện trừu tượng (Extended Machine / Abstract Interface): Cung cấp môi trường thuận tiện để người dùng và các chương trình thực thi mà không cần bận tâm đến chi tiết phần cứng phức tạp.
2. Đối chiếu với các phương án, phương án C ('Manage hardware and software resources') phản ánh chính xác vai trò nền tảng này.

Kiểm tra:
Mọi giáo trình tin học cơ sở và kiến trúc hệ thống đều định nghĩa OS là Resource Manager.

Vì sao các phương án khác sai:
- A (Compile programs): Biên dịch chương trình là nhiệm vụ của trình biên dịch (Compiler) - một phần mềm công cụ phát triển, không phải nhiệm vụ chính của OS.
- B (Execute user applications only): OS không chỉ chạy ứng dụng người dùng mà còn chạy các tiến trình hệ thống, quản lý tài nguyên, bảo vệ an ninh và phục vụ phần cứng.
- D (Design computer circuits): Thiết kế mạch là công việc của các kỹ sư phần cứng và phần mềm CAD/EDA, không liên quan đến chức năng của OS.

Lưu ý/công thức cần nhớ:
Operating System = Quản lý tài nguyên phần cứng và phần mềm (Resource Manager).`,

    "568": `Hướng giải:
Chỉ ra nhược điểm (disadvantage) đặc trưng của kiến trúc máy tính có tập lệnh thu giảm (Reduced Instruction Set Computer - RISC).

Các bước:
1. Triết lý thiết kế của RISC:
   - Đơn giản hóa tập lệnh: Các lệnh có độ dài cố định, thực hiện trong 1 chu kỳ máy, chỉ dùng các lệnh đơn giản (Load/Store architecture).
   - Phần cứng vi xử lý đơn giản hơn, tiết kiệm diện tích bán dẫn và năng lượng, dễ tối ưu hóa đường ống siêu sâu (deep pipelining) và xung nhịp cao.
2. Nhược điểm tương ứng của RISC:
   - Vì mỗi lệnh chỉ làm một thao tác rất đơn giản, một công việc phức tạp mà ở kiến trúc CISC (như x86) chỉ cần 1 lệnh thực hiện thì ở RISC phải cần từ 3 đến 5 lệnh ghép lại.
   - Điều này dẫn đến hiện tượng mở rộng mã (code expansion) hay mật độ mã thấp (lower code density).
   - Hậu quả: Kích thước tệp chương trình sau khi biên dịch của RISC lớn hơn đáng kể (Larger program size) và chiếm dụng nhiều băng thông bộ nhớ hơn để nạp lệnh.
3. Do đó, phương án đúng là B (Larger program size).

Kiểm tra:
Để khắc phục nhược điểm này của RISC, các kiến trúc như ARM đã phát triển tập lệnh nén ARM Thumb (16-bit) để tăng mật độ mã.

Vì sao các phương án khác sai:
- A (Slow execution): Sai, RISC được thiết kế để thực thi nhanh hơn CISC nhờ tối ưu hóa chu kỳ xung nhịp và đường ống.
- C (Complex hardware): Sai, phần cứng của RISC rất đơn giản; CISC mới có phần cứng phức tạp (Complex hardware).
- D (No pipelining): Sai, RISC cực kỳ thuận lợi cho đường ống (pipelining) nhờ độ dài lệnh cố định và định dạng chuẩn hóa.

Lưu ý/công thức cần nhớ:
Ưu điểm RISC: Phần cứng đơn giản, thực thi nhanh, đường ống tối ưu.
Nhược điểm RISC: Kích thước chương trình lớn hơn (Larger program size / Code expansion).`,

    "569": `Hướng giải:
Xác định chức năng và mục đích chính của cơ chế bộ nhớ ảo (Virtual Memory) trong hệ thống máy tính.

Các bước:
1. Bộ nhớ ảo (Virtual Memory) là một cơ chế phối hợp giữa phần cứng quản lý bộ nhớ (MMU) và hệ điều hành:
   - Cho phép chương trình của người dùng sử dụng một không gian địa chỉ logic liên tục và rộng lớn (địa chỉ ảo - virtual address space).
   - Tách rời hoàn toàn không gian địa chỉ logic của chương trình khỏi không gian địa chỉ vật lý của RAM.
   - Lập trình viên và chương trình có thể đánh địa chỉ bộ nhớ theo quan điểm logic mà không cần bận tâm đến việc máy tính đang có bao nhiêu dung lượng RAM vật lý thực tế hoặc chương trình sẽ được đặt ở vị trí nào trong RAM.
2. Trích dẫn nguyên văn định nghĩa từ William Stallings (Section 8.2):
   'Virtual memory allows programs to address memory from a logical point of view, without regard to the amount of main memory physically available.'
3. Do đó, phương án đúng là B.

Kiểm tra:
Nhờ bộ nhớ ảo, một chương trình đòi hỏi \(16\,\mathrm{GB}\) bộ nhớ vẫn có thể chạy bình thường trên một máy tính chỉ có \(8\,\mathrm{GB}\) RAM vật lý thông qua cơ chế phân trang và tráo đổi với đĩa cứng.

Vì sao các phương án khác sai:
- A: Bộ nhớ ảo không làm tăng bộ nhớ vật lý thực tế (physical memory) của hệ thống (dung lượng chip RAM thực tế vẫn giữ nguyên).
- C: Bộ nhớ ảo không làm tăng tốc độ truy xuất, ngược lại khi có lỗi trang (Page Fault) cần đọc từ đĩa thì tốc độ còn chậm hơn truy cập RAM trực tiếp.
- D: Lưu trữ vĩnh viễn là chức năng của hệ thống tập tin trên bộ nhớ phụ (Secondary Storage), không phải bộ nhớ ảo.

Lưu ý/công thức cần nhớ:
Bộ nhớ ảo: Cho phép định địa chỉ logic không phụ thuộc dung lượng RAM vật lý (Address logically without regard to physical memory).`,

    "570": `Hướng giải:
Rút gọn biểu thức đại số Boolean \(A + A \cdot B\) dựa trên các định lý và tiên đề đại số Boole.

Các bước:
1. Áp dụng tính chất phân phối của phép nhân đối với phép cộng trong đại số Boole:
   \[
   A + A \cdot B = A \cdot 1 + A \cdot B = A \cdot (1 + B)
   \]
2. Theo luật nuốt / định lý phần tử bù của phép toán logic OR:
   Với mọi biến logic \(B\), ta luôn có:
   \[
   1 + B = 1
   \]
3. Thay lại vào biểu thức:
   \[
   A \cdot (1 + B) = A \cdot 1 = A
   \]
4. Đây chính là Định luật hấp thụ (Absorption Law) kinh điển trong đại số Boole:
   \[
   A + A \cdot B = A
   \]
5. Phương án đúng là B (\(A\)).

Kiểm tra:
Lập bảng chân trị (Truth Table) để kiểm tra với mọi trường hợp của \(A\) và \(B\):
\[
\begin{array}{|c|c|c|c|}
\hline
A & B & A \cdot B & A + A \cdot B \
\hline
0 & 0 & 0 & 0 \
0 & 1 & 0 & 0 \
1 & 0 & 0 & 1 \
1 & 1 & 1 & 1 \
\hline
\end{array}
\]
Cột kết quả \(A + A \cdot B\) giống hệt cột \(A\) trong mọi trường hợp.

Vì sao các phương án khác sai:
- A (\(A \cdot B\)): Sai, khi \(A = 1, B = 0\) thì \(A + AB = 1 
e 0\).
- C (\(B\)): Sai, khi \(A = 1, B = 0\) thì \(A + AB = 1 
e 0\).
- D (\(A + B\)): Sai, đây là kết quả của biểu thức \(A + A'B\), không phải \(A + AB\).

Lưu ý/công thức cần nhớ:
Định luật hấp thụ: \(A + AB = A\) và \(A(A + B) = A\).`
  };

  const specialDiagrams = {
    "445": [{
      src: "/assets/images/practice/cea201/cea201_q445_circuit.svg",
      alt: "Sơ đồ mạch logic cho biểu thức F = A'C' + AB + AB'C"
    }]
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

    // Trích xuất hình ảnh nếu có: \includegraphics{...}
    const imgM = promptRaw.match(/\\includegraphics(?:\[[^\]]*\])?\{([^}]+)\}/);
    let diagrams = undefined;
    if (imgM) {
      const fileName = path.basename(imgM[1].trim());
      const altM = promptRaw.match(/\\figdesc\{([^}]+)\}/);
      diagrams = [{
        src: `/assets/images/practice/cea201/${fileName}`,
        alt: altM ? altM[1].trim() : 'Sơ đồ câu hỏi'
      }];
    }
    if (!diagrams && specialDiagrams[String(qNum)]) {
      diagrams = specialDiagrams[String(qNum)];
    }

    promptRaw = promptRaw.replace(/\\begin\{center\}([\s\S]*?)\\end\{center\}/g, (b) => (b.includes('tikzpicture') || b.includes('includegraphics')) ? '' : b);
    promptRaw = promptRaw.replace(/\\begin\{tikzpicture\}[\s\S]*?\\end\{tikzpicture\}/g, '');
    promptRaw = promptRaw.replace(/\\figdesc\{[^}]*\}/g, '');

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
      diagrams,
      options,
      correctIndex: Math.max(0, correctIndex),
      correctIndices: correctIndices.length > 1 ? correctIndices : undefined,
      explanation
    });
  }
} else if (isEnvironmentFormat) {
  // Format JPD113 / Ultra Edition: \begin{question}{num} ... \choice{A}{...} ... \answer{...} ... \explain{...} ... \end{question}
  console.log(`    (Định dạng phát hiện: Môi trường \\begin{question} kèm \\choice / \\answer / \\explain)`);
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

    const sourceM = body.match(/\\source\{([^}]+)\}/);
    const source = sourceM ? sourceM[1].trim() : '';

    let promptRaw = '';
    const textM = body.match(/\\text\{([\s\S]*?)\}\s*(?=\\choice)/);
    if (textM) {
      promptRaw = textM[1];
    } else {
      const beforeChoice = body.split(/\\choice/)[0];
      promptRaw = beforeChoice.replace(/\\source\{[^}]*\}/g, '').trim();
    }
    promptRaw = convertTabularToMarkdown(promptRaw);
    const promptText = cleanTexWithMath(promptRaw);

    const choiceMatches = [...body.matchAll(/\\choice\{([A-Za-z0-9]+)\}\{([\s\S]*?)\}/g)];
    const options = choiceMatches.map(m => cleanTexWithMath(m[2]));

    const ansM = body.match(/\\answer\{([A-Za-z]+)\}/i);
    const answerLetter = ansM ? ansM[1].trim().toUpperCase() : 'A';
    const correctIndex = answerLetter.charCodeAt(0) - 65;
    const correctIndices = answerLetter.length > 1
      ? answerLetter.split('').map(c => c.charCodeAt(0) - 65).filter(i => i >= 0 && i < options.length)
      : undefined;

    const expM = body.match(/\\explain\{([\s\S]*?)\}(?=\s*(?:\\end\{question\}|$))/);
    let explanation = expM ? cleanTexWithMath(expM[1]) : '';
    if (source && !explanation.includes(source)) {
      explanation += `\n\nXuất hiện trong: ${source}`;
    }

    if (answerLetter.length > 1) {
      const letters = (correctIndices || []).map(i => String.fromCharCode(65 + i));
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
      answerLetter,
      correctIndex: correctIndices && correctIndices.length > 0 ? correctIndices[0] : Math.max(0, correctIndex),
      correctIndices: correctIndices && correctIndices.length > 1 ? correctIndices : undefined,
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
    id: q.qId || nextQId++,
    quizId,
    text: q.text,
    options: q.options,
    correctIndex: q.correctIndex,
    explanation: q.explanation || ''
  };
  if (q.multiple || (q.correctIndices && q.correctIndices.length > 1)) {
    item.correctIndices = q.correctIndices;
    item.multiple = true;
  }
  if (q.diagrams && q.diagrams.length > 0) {
    item.diagrams = q.diagrams;
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
  if (q.explanation === undefined || q.explanation === null) {
    console.error(`  [LỖI] Câu hỏi ID ${q.id} bị undefined giải thích!`);
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
