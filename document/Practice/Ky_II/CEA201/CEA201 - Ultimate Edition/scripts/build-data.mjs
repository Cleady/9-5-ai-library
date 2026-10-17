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
  for (const macro of ['textbf', 'texttt', 'textit', 'emph', 'underline', 'mbox', 'mathrm', 'operatorname']) {
    value = value.replace(new RegExp(`\\\\${macro}\\s*\\{`, 'g'), '');
  }
  return value
    .replace(/\\(?:,|;|!|quad|qquad|enspace|smallskip|medskip|bigskip)\b/g, ' ')
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

function sourceExplanations(options) {
  for (const option of options) {
    const match = option.raw.match(/\\textcolor\{(?:blue|green)\}\{\\textbf\{([\s\S]*?)\}\}/i);
    if (match) return match[1];
  }
  return '';
}

function stripAnswerMarkup(text) {
  return unescapeTex(text.replace(/\\textcolor\{red\}\{/g, '').replace(/\\textcolor\{[^{}]*\}\{/g, ''));
}

function parseQuestions(tex, answers, images, aiExplanations, existingFlags) {
  const chapters = [...tex.matchAll(/\\section\{Chapter\s+(\d+):\s*([^}]*)\}/g)].map(match => ({
    id: Number(match[1]), title: unescapeTex(match[2]), index: match.index,
  }));
  const questionPattern = /\\textbf\{Question\s+(\d+):\}\s*([\s\S]*?)\\begin\{itemize\}([\s\S]*?)\\end\{itemize\}/g;
  const rows = [];
  const duplicates = [];
  const seen = new Set();
  const mismatches = [];
  let match;

  while ((match = questionPattern.exec(tex))) {
    const id = Number(match[1]);
    if (seen.has(id)) duplicates.push(id);
    seen.add(id);
    const chapter = [...chapters].reverse().find(item => item.index < match.index);
    const rawOptions = [...match[3].matchAll(/\\item\s*\[\\textbf\{([A-Z])\.\}\]\s*([\s\S]*?)(?=\\item\s*\[|$)/g)];
    const options = rawOptions.flatMap(option => {
      const nextKey = String.fromCharCode(option[1].charCodeAt(0) + 1);
      const joinedOption = option[2].trim().match(new RegExp(`\\s${nextKey}:\\s*(.+)$`, 's'));
      if (!joinedOption || nextKey > 'F') return [{ key: option[1], raw: option[2].trim(), text: stripAnswerMarkup(option[2]) }];
      const previousText = option[2].trim().slice(0, joinedOption.index).trim();
      return [
        { key: option[1], raw: previousText, text: stripAnswerMarkup(previousText) },
        { key: nextKey, raw: joinedOption[1].trim(), text: stripAnswerMarkup(joinedOption[1]) },
      ];
    });
    const answer = answers.get(id) ?? [];
    const markedAnswer = options.filter(option => /\\textcolor\{red\}/i.test(option.raw)).map(option => option.key).sort();
    if (markedAnswer.join(',') !== [...answer].sort().join(',')) {
      mismatches.push({
        id,
        reason: `answers.txt says ${answer.join(', ') || '(missing)'}, while the LaTeX source highlights ${markedAnswer.join(', ') || '(none)'}. The answer-file key remains unchanged; verify both sources.`,
        source: 'latex-highlight-vs-answer-file',
      });
    }

    const explanationRecord = aiExplanations[String(id)];
    const sourceExplanation = unescapeTex(sourceExplanations(options));
    const explanation = explanationRecord?.explanation || sourceExplanation || '';
    const isTrueFalse = options.length === 2 && options.some(option => /^true$/i.test(option.text)) && options.some(option => /^false$/i.test(option.text));
    const image = images.find(item => Number(item.question) === id)?.image_file || null;
    rows.push({
      id,
      chapter: chapter?.id ?? null,
      chapterTitle: chapter?.title ?? 'Unclassified',
      question: unescapeTex(match[2]),
      options: options.map(({ key, text }) => ({ key, text })),
      answer,
      explanation,
      explanationSource: explanationRecord?.explanation ? 'ai' : (sourceExplanation ? 'source' : null),
      type: answer.length > 1 ? 'multiple-answer' : (isTrueFalse ? 'true-false' : 'single-choice'),
      image,
    });
  }

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
const images = JSON.parse(fs.readFileSync(imagePath, 'utf8'));
const aiExplanations = fs.existsSync(explanationPath) ? JSON.parse(fs.readFileSync(explanationPath, 'utf8')) : {};
const existingFlags = fs.existsSync(manualFlagsPath) ? JSON.parse(fs.readFileSync(manualFlagsPath, 'utf8')) : [];
const { rows, duplicates, flags } = parseQuestions(tex, answers, images, aiExplanations, existingFlags);
const missingAnswers = rows.filter(question => question.answer.length === 0).map(question => question.id);
const malformedOptions = rows.filter(question => {
  const keys = question.options.map(option => option.key);
  const expected = [...'ABCDEF'].slice(0, keys.length);
  return question.options.length < 2 || question.options.some(option => !option.key || !option.text) || new Set(keys).size !== keys.length || keys.some((key, index) => key !== expected[index]) || question.answer.some(key => !keys.includes(key));
}).map(question => question.id);
const missingExplanations = rows.filter(question => !question.explanation.trim()).map(question => question.id);
const aiCount = rows.filter(question => question.explanationSource === 'ai').length;
const possiblyInconsistent = flags.filter(flag => flag.likelyInconsistent === true);
const needsContext = flags.filter(flag => flag.likelyInconsistent !== true);
const perChapter = new Map();
for (const question of rows) perChapter.set(question.chapterTitle, (perChapter.get(question.chapterTitle) || 0) + 1);

fs.writeFileSync(path.join(dataDir, 'questions.json'), `${JSON.stringify(rows, null, 2)}\n`, 'utf8');
fs.writeFileSync(path.join(dataDir, 'questions.js'), `window.EXAM_QUESTIONS = ${JSON.stringify(rows)};\n`, 'utf8');
fs.writeFileSync(manualFlagsPath, `${JSON.stringify(flags, null, 2)}\n`, 'utf8');

console.log(`Parsed questions: ${rows.length}`);
console.log('Questions per chapter:');
for (const [title, count] of perChapter) console.log(`  ${title}: ${count}`);
console.log(`Questions with no answer match: ${missingAnswers.length}${missingAnswers.length ? ` (${missingAnswers.join(', ')})` : ''}`);
console.log(`Questions with no explanation: ${missingExplanations.length}${missingExplanations.length ? ` (${missingExplanations.join(', ')})` : ''}`);
console.log(`AI-written explanations: ${aiCount}`);
console.log(`Duplicate IDs: ${duplicates.length}${duplicates.length ? ` (${duplicates.join(', ')})` : ''}`);
console.log(`Malformed options: ${malformedOptions.length}${malformedOptions.length ? ` (${malformedOptions.join(', ')})` : ''}`);
console.log(`Flagged as possibly inconsistent with the answer key: ${possiblyInconsistent.length}${possiblyInconsistent.length ? ` (${possiblyInconsistent.map(flag => flag.id).join(', ')})` : ''}`);
console.log(`Other flags needing context or clarification: ${needsContext.length}${needsContext.length ? ` (${needsContext.map(flag => flag.id).join(', ')})` : ''}`);
console.log(`All flagged question IDs: ${flags.map(flag => flag.id).join(', ') || '(none)'}`);
