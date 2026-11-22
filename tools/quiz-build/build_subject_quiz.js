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

    "219": `**Giải thích**: \n\n **Hướng giải**: Kiến trúc tập lệnh RISC (Load-and-Store architecture) thuộc Chapter 17: Reduced Instruction Set Computers (RISC) (Giáo trình William Stallings COA 11th Edition). \n\n **Các bước phân tích**:\n\n- Dữ kiện câu hỏi: "_________ instructions are used to position quantities in registers temporarily for computational operations.".\n- Trong kiến trúc RISC và các bộ vi xử lý hiện đại, các phép toán số học và logic chỉ thực hiện trực tiếp trên thanh ghi (register-to-register). Các lệnh Load (nạp từ bộ nhớ vào thanh ghi) và Store (lưu từ thanh ghi ra bộ nhớ) - gọi là cơ chế Load-and-store - được sử dụng để định vị dữ liệu tạm thời trong thanh ghi cho các tác vụ tính toán.\n- Khi đối chiếu các phương án đưa ra, đáp án chuẩn xác là A. Load-and-store.\n\n **Kiểm tra**: Chọn A. Load-and-store \n\n **Vì sao các phương án khác sai**:\n\n- B (Branch): Lệnh rẽ nhánh điều khiển luồng thực thi (PC).\n- C (Arithmetic): Lệnh số học thực thi tính toán trên thanh ghi.\n- D (Shift): Lệnh dịch bit thao tác trên thanh ghi.\n\n **Xuất hiện trong**: Giáo trình COA 11th Edition - Chapter 17: Reduced Instruction Set Computers (RISC)`,

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

    "452": `**Giải thích**: \n\n **Hướng giải**: Các đồng nhất thức cơ bản của đại số Boolean (Basic Boolean Identities) thuộc Chapter 12: Digital Logic (Bảng 12.1/20.1 trong Giáo trình William Stallings COA 11th Edition). \n\n **Các bước phân tích**:\n\n- Dữ kiện câu hỏi: "_________Which of the following is NOT a Boolean identity?" (Biểu thức nào sau đây KHÔNG phải là một đồng nhất thức Boolean cơ bản?).\n\n- Bảng các đồng nhất thức Boolean cơ bản (Basic Boolean Identities) trong giáo trình chỉ được xây dựng trên 3 phép toán tiên đề nền tảng: **AND ($\\cdot$)**, **OR ($+$)** và **NOT ($'$)**:\n  - **Phương án A ($A \\text{ AND } (A \\text{ OR } B) = A$)**: Đây là **Luật hấp thụ (Absorption Law)** ($A(A + B) = A$) — một đồng nhất thức Boolean cơ bản chuẩn xác.\n  - **Phương án C ($(A \\text{ OR } B)' = A' \\text{ AND } B'$)**: Đây là **Định lý De Morgan** ($\\overline{A + B} = \\overline{A} \\cdot \\overline{B}$) — một đồng nhất thức Boolean cơ bản chuẩn xác.\n  - **Phương án D ($A + A' = 1$)**: Đây là **Luật bù / Nghịch đảo (Complement / Inverse Law)** ($A + \\overline{A} = 1$) — một trong những đồng nhất thức Boolean tiên đề cốt lõi nhất.\n  - **Phương án B ($A \\text{ XOR } B = (A \\text{ AND } B') \\text{ OR } (A' \\text{ AND } B)$)**: Đây là **định nghĩa khai triển hàm logic của cổng XOR** (cổng logic tổ hợp dẫn xuất), KHÔNG nằm trong bảng các tiên đề/đồng nhất thức Boolean cơ bản (Basic Boolean Identities) của đại số Boolean thuần túy.\n\n **Lưu ý lỗi ngân hàng đề gốc**: Đề gốc đánh dấu nhầm phương án D ($A + A' = 1$ — ngộ nhận luật bù là không phải đồng nhất thức). Đáp án chính xác theo giáo trình và câu hỏi là **B. A XOR B = (A AND B') OR (A' AND B)**.\n\n **Kiểm tra**: Chọn B. A XOR B = (A AND B') OR (A' AND B) \n\n **Xuất hiện trong**: Giáo trình COA 11th Edition - Chapter 12: Digital Logic`
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
