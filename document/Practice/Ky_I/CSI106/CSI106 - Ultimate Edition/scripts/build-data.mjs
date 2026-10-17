import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dataDir = path.join(root, 'data');
const texPath = path.join(root, 'extracted_questions_by_chapter.tex');
const answerPath = path.join(root, 'answers.txt');
const imagePath = path.join(root, 'answers.json');
const explanationPath = path.join(dataDir, 'explanations.ai.json');
const manualFlagsPath = path.join(dataDir, 'review_flags.json');

function unescapeTex(text) {
  let value = text;
  value = value.replace(/\\textcolor\{[^{}]*\}\{/g, '');
  for (const macro of ['textbf', 'texttt', 'textit', 'emph', 'underline', 'mbox', 'mathrm', 'operatorname', 'footnotesize']) {
    value = value.replace(new RegExp(`\\\\${macro}\\s*\\{`, 'g'), '');
  }
  return value
    .replace(/\\(?:,|;|!|quad|qquad|enspace|smallskip|medskip|bigskip|noindent|hfill)\b/g, ' ')
    .replace(/\\(?:&|%|#|_|\{|\})/g, token => ({'\\&':'&','\\%':'%','\\#':'#','\\_':'_','\\{':'{','\\}':'}'}[token]))
    .replace(/\\newline|\\\\/g, '\n')
    .replace(/\$\$?([^$]+)\$\$?/g, '$1')
    .replace(/\\([A-Za-z]+)\s*/g, '$1 ')
    .replace(/[{}]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function readAnswers(text) {
  const answers = new Map();
  for (const line of text.split(/\r?\n/)) {
    const match = line.match(/^Câu\s+(\d+):\s*([A-Z](?:\s*,\s*[A-Z])*)\s*$/);
    if (match) answers.set(Number(match[1]), match[2].split(/\s*,\s*/));
  }
  return answers;
}

function parseQuestions(tex, answers, images, aiExplanations, existingFlags) {
  // Parse section chapters
  const sectionMatches = [...tex.matchAll(/\\section\*\{([0-9.]+)\.?\s*([^}]+)\}/g)];
  const chapters = sectionMatches.map(m => ({
    id: m[1].replace(/\.$/, ''),
    title: unescapeTex(m[2]),
    index: m.index
  }));

  const questionBlocks = [...tex.matchAll(/\\subsection\*\{Question\s+(\d+)\s*(?:\\quad\s*\\footnotesize\{[^}]*\})?\}\s*([\s\S]*?)\\begin\{enumerate\}[^\]]*\]([\s\S]*?)\\end\{enumerate\}([\s\S]*?)(?=\\subsection\*|\\section\*|\\end\{document\}|$)/g)];

  const rows = [];
  const duplicates = [];
  const seen = new Set();
  const mismatches = [];

  for (const match of questionBlocks) {
    const id = Number(match[1]);
    if (seen.has(id)) duplicates.push(id);
    seen.add(id);

    const chapter = [...chapters].reverse().find(c => c.index < match.index);

    // Question stem
    let stem = match[2]
      .replace(/\\noindent\s*/g, '')
      .replace(/\\textbf\{([\s\S]*?)\}/g, '$1')
      .trim();
    stem = unescapeTex(stem);

    // Options
    const rawItems = [...match[3].matchAll(/\\item\s*([\s\S]*?)(?=\\item|$)/g)];
    const options = rawItems.map((item, idx) => {
      const key = String.fromCharCode(65 + idx);
      let text = item[1].trim();
      text = text.replace(/\\hfill\s*\\textcolor\{blue\}\{\\textbf\{\[Correct\]\}\}/g, '');
      text = text.replace(/\\textbf\{([\s\S]*?)\}/g, '$1');
      return { key, text: unescapeTex(text) };
    });

    const validKeys = new Set(options.map(o => o.key));

    // Answer from answers.txt or from the block
    let answer = answers.get(id) ?? [];
    if (!answer.length) {
      const ansMatch = match[4].match(/Correct Answer:\s*(?:\\textcolor\{blue\}\{\\textbf\{([A-Z,\s]+)\}\}|([A-Z,\s]+))/);
      if (ansMatch) {
        const rawAns = ansMatch[1] || ansMatch[2];
        answer = rawAns.split(/\s*,\s*/).map(s => s.trim()).filter(Boolean);
      }
    }

    // Check if answer keys exist in options
    const invalidAnswerKeys = answer.filter(k => !validKeys.has(k));
    if (invalidAnswerKeys.length > 0) {
      mismatches.push({
        id,
        kind: 'option-mismatch',
        likelyInconsistent: true,
        reason: `Answer key contains key(s) ${invalidAnswerKeys.join(', ')} not present in options (A-${String.fromCharCode(64 + options.length)}). Answer key kept to valid choices.`
      });
      const validAnswers = answer.filter(k => validKeys.has(k));
      if (validAnswers.length > 0) {
        answer = validAnswers;
      }
    }

    // Explanation
    let explanation = '';
    const expMatch = match[4].match(/Explanation:\s*([\s\S]*?)(?=\\par|\\hrule|\\end\{minipage\}|$)/);
    if (expMatch) {
      explanation = unescapeTex(expMatch[1]);
    }
    const aiRecord = aiExplanations[String(id)];
    if (!explanation && aiRecord?.explanation) {
      explanation = aiRecord.explanation;
    }

    const isTrueFalse = options.length === 2 &&
      options.some(o => /^true$/i.test(o.text)) &&
      options.some(o => /^false$/i.test(o.text));

    const imageInfo = images.find(item => Number(item.question) === id);
    const image = imageInfo?.image_file || null;

    rows.push({
      id,
      chapter: chapter?.id ?? null,
      chapterTitle: chapter?.title ?? 'Unclassified',
      question: stem,
      options,
      answer,
      explanation,
      explanationSource: 'ai',
      type: answer.length > 1 ? 'multiple-answer' : (isTrueFalse ? 'true-false' : 'single-choice'),
      image
    });
  }

  // Sort rows by id
  rows.sort((a, b) => a.id - b.id);

  const flagsById = new Map();
  for (const flag of [...existingFlags, ...mismatches]) {
    const prior = flagsById.get(Number(flag.id));
    flagsById.set(Number(flag.id), prior ? { ...prior, ...flag } : flag);
  }

  return { rows, duplicates, flags: [...flagsById.values()].sort((a, b) => a.id - b.id) };
}

fs.mkdirSync(dataDir, { recursive: true });
const tex = fs.readFileSync(texPath, 'utf8');
const answers = readAnswers(fs.readFileSync(answerPath, 'utf8'));
const images = fs.existsSync(imagePath) ? JSON.parse(fs.readFileSync(imagePath, 'utf8')) : [];
const aiExplanations = fs.existsSync(explanationPath) ? JSON.parse(fs.readFileSync(explanationPath, 'utf8')) : {};
const existingFlags = fs.existsSync(manualFlagsPath) ? JSON.parse(fs.readFileSync(manualFlagsPath, 'utf8')) : [];

const { rows, duplicates, flags } = parseQuestions(tex, answers, images, aiExplanations, existingFlags);
const missingAnswers = rows.filter(q => q.answer.length === 0).map(q => q.id);
const malformedOptions = rows.filter(q => {
  const keys = q.options.map(o => o.key);
  const expected = [...'ABCDEF'].slice(0, keys.length);
  return q.options.length < 2 ||
    q.options.some(o => !o.key || !o.text) ||
    new Set(keys).size !== keys.length ||
    keys.some((key, idx) => key !== expected[idx]) ||
    q.answer.some(key => !keys.includes(key));
}).map(q => q.id);

const missingExplanations = rows.filter(q => !q.explanation.trim()).map(q => q.id);
const aiCount = rows.filter(q => q.explanationSource === 'ai').length;
const perChapter = new Map();
for (const q of rows) {
  const label = `${q.chapter ? `Chương ${q.chapter}: ` : ''}${q.chapterTitle}`;
  perChapter.set(label, (perChapter.get(label) || 0) + 1);
}

fs.writeFileSync(path.join(dataDir, 'questions.json'), `${JSON.stringify(rows, null, 2)}\n`, 'utf8');
fs.writeFileSync(path.join(dataDir, 'questions.js'), `window.EXAM_QUESTIONS = ${JSON.stringify(rows)};\n`, 'utf8');
fs.writeFileSync(manualFlagsPath, `${JSON.stringify(flags, null, 2)}\n`, 'utf8');

console.log(`Parsed questions: ${rows.length}`);
console.log('Questions per chapter:');
for (const [title, count] of perChapter) {
  console.log(`  ${title}: ${count}`);
}
console.log(`Questions with no answer match: ${missingAnswers.length}${missingAnswers.length ? ` (${missingAnswers.join(', ')})` : ''}`);
console.log(`Questions with no explanation: ${missingExplanations.length}${missingExplanations.length ? ` (${missingExplanations.join(', ')})` : ''}`);
console.log(`AI-written explanations: ${aiCount}`);
console.log(`Duplicate IDs: ${duplicates.length}${duplicates.length ? ` (${duplicates.join(', ')})` : ''}`);
console.log(`Malformed options: ${malformedOptions.length}${malformedOptions.length ? ` (${malformedOptions.join(', ')})` : ''}`);
console.log(`All flagged question IDs: ${flags.map(f => f.id).join(', ') || '(none)'}`);
