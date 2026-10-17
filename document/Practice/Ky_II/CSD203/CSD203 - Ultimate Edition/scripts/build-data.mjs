import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const projectDir = path.resolve(scriptDir, '..');
const sourcePath = path.join(projectDir, 'source', 'csd203_theo_chuong_all.tex');
const outputJson = path.join(projectDir, 'data', 'questions.json');
const outputJs = path.join(projectDir, 'data', 'questions.js');

function readGroup(source, start, open = '{', close = '}') {
  let index = start;
  while (/\s/.test(source[index] ?? '')) index++;
  if (source[index] !== open) return null;
  const contentStart = ++index;
  let depth = 1;
  for (; index < source.length; index++) {
    if (source[index] === '\\') {
      index++;
      continue;
    }
    if (source[index] === open) depth++;
    if (source[index] === close && --depth === 0) {
      return { value: source.slice(contentStart, index), next: index + 1 };
    }
  }
  return null;
}

const symbols = {
  '&': '&', '%': '%', '#': '#', '_': '_', '$': '$', '{': '{', '}': '}',
  times: '×', cdot: '·', le: '≤', leq: '≤', ge: '≥', geq: '≥', neq: '≠',
  approx: '≈', to: '→', rightarrow: '→', Rightarrow: '⇒', leftarrow: '←',
  sum: '∑', infty: '∞', alpha: 'α', beta: 'β', theta: 'θ', Omega: 'Ω',
  Theta: 'Θ', bmod: ' mod ', lfloor: '⌊', rfloor: '⌋', dots: '…', ldots: '…', textbackslash: '\\',
};

function stripTex(source) {
  let output = '';
  for (let index = 0; index < source.length;) {
    const character = source[index];
    if (character !== '\\') {
      output += character === '$' ? '' : character === '~' ? ' ' : character;
      index++;
      continue;
    }

    if (source[index + 1] === '\\') {
      output += '\n';
      index += 2;
      continue;
    }

    const next = source[index + 1] ?? '';
    if (!/[A-Za-z]/.test(next)) {
      output += symbols[next] ?? (next === ',' || next === ';' || next === '!' ? ' ' : next);
      index += 2;
      continue;
    }

    let end = index + 1;
    while (/[A-Za-z]/.test(source[end] ?? '')) end++;
    const command = source.slice(index + 1, end);

    if (['texttt', 'textbf', 'text', 'emph', 'mathrm', 'mathbf', 'mathit', 'operatorname'].includes(command)) {
      const group = readGroup(source, end);
      if (group) {
        output += stripTex(group.value);
        index = group.next;
        continue;
      }
    }
    if (command === 'frac') {
      const numerator = readGroup(source, end);
      const denominator = numerator && readGroup(source, numerator.next);
      if (numerator && denominator) {
        output += `${stripTex(numerator.value)}/${stripTex(denominator.value)}`;
        index = denominator.next;
        continue;
      }
    }
    if (command === 'sqrt') {
      const group = readGroup(source, end);
      if (group) {
        output += `√(${stripTex(group.value)})`;
        index = group.next;
        continue;
      }
    }
    if (['begin', 'end', 'left', 'right', 'displaystyle', 'scriptstyle', 'small', 'large', 'bfseries', 'color'].includes(command)) {
      const group = readGroup(source, end);
      index = group ? group.next : end;
      continue;
    }
    if (command === 'quad' || command === 'qquad' || command === 'hspace' || command === 'vspace') {
      const group = readGroup(source, end);
      output += ' ';
      index = group ? group.next : end;
      continue;
    }
    if (command === 'pmod') {
      const group = readGroup(source, end);
      if (group) {
        output += `(mod ${stripTex(group.value)})`;
        index = group.next;
        continue;
      }
    }
    output += symbols[command] ?? (command === 'log' ? 'log' : command);
    index = end;
  }
  return output;
}

function normalizeText(source) {
  return stripTex(source)
    .replace(/\r/g, '')
    .split('\n')
    .map((line) => line.replace(/[\t ]+/g, ' ').trim())
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function normalizeCode(source) {
  return source.replace(/\r/g, '').split('\n').map((line) => line.replace(/[\t ]+$/g, '')).join('\n').trim();
}

function plainPrompt(source) {
  const codeBlocks = [];
  let text = source.replace(/^[\t ]*%[^\r\n]*/gm, '');
  text = text.replace(/\\begin\{codebox\}([\s\S]*?)\\end\{codebox\}/g, (_, code) => {
    const index = codeBlocks.push(code.trim()) - 1;
    return `\n\n__CODE_BLOCK_${index}__\n\n`;
  });
  text = text.replace(/\\begin\{tikzpicture\}[\s\S]*?\\end\{tikzpicture\}/g, ' ');
  text = text.replace(/\\begin\{center\}|\\end\{center\}/g, ' ');
  let normalized = normalizeText(text);
  codeBlocks.forEach((code, index) => {
    normalized = normalized.replace(`__CODE_BLOCK_${index}__`, normalizeCode(code));
  });
  return normalized;
}

function escapeXml(value) {
  return String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&apos;');
}

function parseNodeAt(source, initialIndex) {
  let index = initialIndex;
  const skipSpace = () => { while (/\s/.test(source[index] ?? '')) index++; };
  skipSpace();
  if (source.startsWith('\\node', index)) index += 5;
  else if (source.startsWith('node', index)) index += 4;
  else return null;
  skipSpace();
  if (source[index] === '[') {
    const options = readGroup(source, index, '[', ']');
    if (options) index = options.next;
  }
  skipSpace();
  if (source[index] === '(') {
    const name = readGroup(source, index, '(', ')');
    if (name) index = name.next;
  }
  skipSpace();
  if (source.startsWith('at', index) && !/[A-Za-z]/.test(source[index + 2] ?? '')) {
    index += 2;
    skipSpace();
    const position = readGroup(source, index, '(', ')');
    if (position) index = position.next;
  }
  skipSpace();
  const label = readGroup(source, index);
  if (!label) return null;
  index = label.next;
  const node = { label: normalizeText(label.value), children: [] };

  while (index < source.length) {
    skipSpace();
    if (!source.startsWith('child', index)) break;
    index += 5;
    skipSpace();
    if (source[index] === '[') {
      const option = readGroup(source, index, '[', ']');
      if (option) {
        index = option.next;
        if (option.value.includes('missing')) {
          node.children.push(null);
          continue;
        }
      }
    }
    skipSpace();
    const childGroup = readGroup(source, index);
    if (!childGroup) break;
    const child = parseNodeAt(childGroup.value, 0);
    node.children.push(child?.node ?? null);
    index = childGroup.next;
  }
  return { node, next: index };
}

function treeSvg(tikz) {
  const occurrences = [...tikz.matchAll(/\\node\b/g)];
  let tree = null;
  for (const occurrence of occurrences) {
    const parsed = parseNodeAt(tikz, occurrence.index);
    if (parsed?.node.children.length) { tree = parsed.node; break; }
  }
  if (!tree) return null;

  const horizontalGap = 0.45;
  function width(node) {
    if (!node || !node.children.length) return 1;
    return Math.max(1, node.children.reduce((sum, child) => sum + width(child), 0) + horizontalGap * (node.children.length - 1));
  }
  const positions = [];
  let maxDepth = 0;
  function place(node, left, depth) {
    if (!node) return;
    const span = width(node);
    positions.push({ node, x: left + span / 2, depth });
    maxDepth = Math.max(maxDepth, depth);
    if (!node.children.length) return;
    let childLeft = left;
    for (const child of node.children) {
      const childWidth = width(child);
      if (child) place(child, childLeft, depth + 1);
      childLeft += childWidth + horizontalGap;
    }
  }
  const totalWidth = width(tree);
  place(tree, 0, 0);
  const scale = 86;
  const radius = 20;
  const padding = 30;
  const svgWidth = Math.max(140, totalWidth * scale + 2 * padding);
  const svgHeight = (maxDepth + 1) * 78 + 2 * padding;
  const point = new Map(positions.map(({ node, x, depth }) => [node, { x: padding + x * scale, y: padding + depth * 78 }]));
  const edges = [];
  function addEdges(node) {
    const parent = point.get(node);
    node.children.forEach((child) => {
      if (child) {
        const childPoint = point.get(child);
        edges.push(`<line x1="${parent.x}" y1="${parent.y + radius}" x2="${childPoint.x}" y2="${childPoint.y - radius}" stroke="#94a3b8" stroke-width="2.5"/>`);
        addEdges(child);
      }
    });
  }
  addEdges(tree);
  const nodes = positions.map(({ node }) => {
    const { x, y } = point.get(node);
    return `<g><circle cx="${x}" cy="${y}" r="${radius}" fill="#eff6ff" stroke="#2563eb" stroke-width="2.5"/><text x="${x}" y="${y + 5}" text-anchor="middle" font-family="system-ui,sans-serif" font-size="15" font-weight="700" fill="#1f2937">${escapeXml(node.label)}</text></g>`;
  });
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${svgWidth}" height="${svgHeight}" viewBox="0 0 ${svgWidth} ${svgHeight}">${edges.join('')}${nodes.join('')}</svg>`;
  const alt = `Cây nhị phân với các nút: ${positions.map(({ node }) => node.label).filter(Boolean).join(', ')}.`;
  return { svg, alt };
}

function graphSvg(tikz) {
  const nodePattern = /\\node(?:\s*\[([^\]]*)\])?\s*\(([^)]+)\)\s*at\s*\(\s*(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)\s*\)\s*\{([^}]*)\}/g;
  const nodes = [];
  for (const match of tikz.matchAll(nodePattern)) {
    nodes.push({ id: match[2].trim(), x: Number(match[3]), y: Number(match[4]), label: normalizeText(match[5]), options: match[1] ?? '' });
  }
  if (nodes.length < 2) return null;
  const nodeById = new Map(nodes.map((node) => [node.id, node]));
  const edges = [];
  const drawCommandPattern = /\\draw(?:\s*\[([^\]]*)\])?([\s\S]*?);/g;
  const edgePattern = /\(([^)]+)\)\s*(--|to(?:\s*\[[^\]]*\])?)\s*(?:node(?:\s*\[[^\]]*\])?\s*\{([^}]*)\}\s*)?\(([^)]+)\)/g;
  for (const command of tikz.matchAll(drawCommandPattern)) {
    for (const edge of command[2].matchAll(edgePattern)) {
      const from = nodeById.get(edge[1].trim());
      const to = nodeById.get(edge[4].trim());
      if (!from || !to) continue;
      edges.push({ from, to, label: edge[3] ? normalizeText(edge[3]) : '', directed: /->/.test(command[1] ?? '') });
    }
  }
  if (!edges.length) return null;

  const scale = 72;
  const padding = 42;
  const minX = Math.min(...nodes.map((node) => node.x));
  const maxX = Math.max(...nodes.map((node) => node.x));
  const minY = Math.min(...nodes.map((node) => node.y));
  const maxY = Math.max(...nodes.map((node) => node.y));
  const svgWidth = Math.max(180, (maxX - minX) * scale + padding * 2);
  const svgHeight = Math.max(140, (maxY - minY) * scale + padding * 2);
  const radius = 19;
  const point = (node) => ({ x: padding + (node.x - minX) * scale, y: padding + (maxY - node.y) * scale });
  const pairs = new Map();
  for (const edge of edges) {
    const key = [edge.from.id, edge.to.id].sort().join('|');
    if (!pairs.has(key)) pairs.set(key, []);
    pairs.get(key).push(edge);
  }
  const defs = '<defs><marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#64748b"/></marker></defs>';
  const renderedEdges = [];
  for (const [pairKey, pairEdges] of pairs) {
    pairEdges.forEach((edge, index) => {
      const a = point(edge.from);
      const b = point(edge.to);
      if (edge.from.id === edge.to.id) {
        const d = `M ${a.x - 9} ${a.y - 13} C ${a.x - 65} ${a.y - 80}, ${a.x + 65} ${a.y - 80}, ${a.x + 9} ${a.y - 13}`;
        renderedEdges.push(`<path d="${d}" fill="none" stroke="#64748b" stroke-width="2.2"${edge.directed ? ' marker-end="url(#arrow)"' : ''}/>`);
        if (edge.label) renderedEdges.push(`<text x="${a.x}" y="${a.y - 55}" text-anchor="middle" font-family="system-ui,sans-serif" font-size="14" font-weight="700" fill="#334155" stroke="white" stroke-width="4" paint-order="stroke">${escapeXml(edge.label)}</text>`);
        return;
      }
      const dx = b.x - a.x;
      const dy = b.y - a.y;
      const length = Math.hypot(dx, dy) || 1;
      const ux = dx / length;
      const uy = dy / length;
      const startX = a.x + ux * radius;
      const startY = a.y + uy * radius;
      const endX = b.x - ux * radius;
      const endY = b.y - uy * radius;
      const pairIndex = pairEdges.indexOf(edge);
      const curve = pairEdges.length > 1 ? (pairIndex - (pairEdges.length - 1) / 2) * 28 : 0;
      let path;
      let labelX = (startX + endX) / 2;
      let labelY = (startY + endY) / 2 - 6;
      if (curve) {
        const cx = (startX + endX) / 2 - uy * curve;
        const cy = (startY + endY) / 2 + ux * curve;
        path = `M ${startX} ${startY} Q ${cx} ${cy} ${endX} ${endY}`;
        labelX = 0.25 * startX + 0.5 * cx + 0.25 * endX;
        labelY = 0.25 * startY + 0.5 * cy + 0.25 * endY - 6;
      } else {
        path = `M ${startX} ${startY} L ${endX} ${endY}`;
      }
      renderedEdges.push(`<path d="${path}" fill="none" stroke="#64748b" stroke-width="2.2"${edge.directed ? ' marker-end="url(#arrow)"' : ''}/>`);
      if (edge.label) renderedEdges.push(`<text x="${labelX}" y="${labelY}" text-anchor="middle" font-family="system-ui,sans-serif" font-size="14" font-weight="700" fill="#334155" stroke="white" stroke-width="4" paint-order="stroke">${escapeXml(edge.label)}</text>`);
    });
  }

  const renderedNodes = nodes.map((node) => {
    const { x, y } = point(node);
    const fill = /fill\s*=\s*yellow/i.test(node.options) ? '#fde68a'
      : /fill\s*=\s*black/i.test(node.options) || (/fill\s*=\s*black/i.test(tikz) && !node.label) ? '#1f2937'
      : /fill\s*=\s*green/i.test(node.options) ? '#d1fae5'
      : '#eff6ff';
    const r = node.label ? radius : (/fill\s*=\s*black/i.test(node.options) || /fill\s*=\s*black/i.test(tikz) ? 7 : 4);
    return `<g><circle cx="${x}" cy="${y}" r="${r}" fill="${fill}" stroke="#2563eb" stroke-width="${r < 10 ? 1.2 : 2.2}"/><text x="${x}" y="${y + 5}" text-anchor="middle" font-family="system-ui,sans-serif" font-size="15" font-weight="700" fill="#1f2937">${escapeXml(node.label)}</text></g>`;
  });
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${svgWidth}" height="${svgHeight}" viewBox="0 0 ${svgWidth} ${svgHeight}">${defs}${renderedEdges.join('')}${renderedNodes.join('')}</svg>`;
  const alt = `Đồ thị với các nút ${nodes.map((node) => node.label || node.id).join(', ')} và ${edges.length} cạnh${edges.some((edge) => edge.label) ? `, có nhãn ${edges.map((edge) => edge.label).filter(Boolean).join(', ')}` : ''}.`;
  return { svg, alt };
}

function renderTikz(tikz) {
  return treeSvg(tikz) ?? graphSvg(tikz);
}

function parseOptions(source) {
  return source.split(/\\choice\b/).slice(1).map((text, index) => ({
    key: String.fromCharCode(65 + index),
    text: normalizeText(text.replace(/^[\s\r\n]+/, '')),
  }));
}

const tex = await readFile(sourcePath, 'utf8');
const sections = [...tex.matchAll(/^\\section\*\{Chương\s+(\d+):\s*([^}\r\n]+)\}/gm)].map((match) => ({
  chapter: Number(match[1]),
  title: normalizeText(match[2]),
  index: match.index,
}));
const sourceQuestions = [...tex.matchAll(/\\begin\{question\}\{([^}]*)\}([\s\S]*?)\\end\{question\}/g)];
const questions = [];
const unsupportedDiagrams = [];

for (const [index, match] of sourceQuestions.entries()) {
  const body = match[2];
  const section = sections.filter((item) => item.index < match.index).at(-1);
  if (!section) throw new Error(`Question ${match[1]} is not under a chapter heading.`);
  const choicesStart = body.indexOf('\\begin{choices}');
  const choicesEnd = body.indexOf('\\end{choices}', choicesStart);
  if (choicesStart < 0 || choicesEnd < 0) throw new Error(`Question ${match[1]} has no choices environment.`);
  const answerMatch = body.match(/\\textbf\{Đáp án:\}\s*([A-F](?:\s*,\s*[A-F])*)/);
  const explanationMatch = body.match(/\\textbf\{Giải thích:\}\s*([\s\S]*?)\s*$/);
  if (!answerMatch || !explanationMatch) throw new Error(`Question ${match[1]} has no answer or explanation.`);

  const rawPrompt = body.slice(0, choicesStart);
  const diagrams = [];
  for (const diagramMatch of rawPrompt.matchAll(/\\begin\{tikzpicture\}([\s\S]*?)\\end\{tikzpicture\}/g)) {
    const diagram = renderTikz(diagramMatch[1]);
    if (diagram) diagrams.push(diagram);
    else unsupportedDiagrams.push(match[1]);
  }
  const promptWithoutDiagrams = rawPrompt
    .replace(/\\begin\{center\}([\s\S]*?)\\end\{center\}/g, (block) => block.includes('tikzpicture') ? '' : block)
    .replace(/\\begin\{tikzpicture\}[\s\S]*?\\end\{tikzpicture\}/g, ' ');
  const options = parseOptions(body.slice(choicesStart, choicesEnd));
  if (!options.length) throw new Error(`Question ${match[1]} has no parsed options.`);

  const answer = answerMatch[1].split(',').map((key) => key.trim());
  if (answer.some((key) => !options.some((option) => option.key === key))) {
    throw new Error(`Question ${match[1]} refers to an option that was not parsed.`);
  }
  const sourceId = body.match(/Câu #(\d+)/)?.[1] ?? null;
  const displayNumber = match[1].trim();
  questions.push({
    id: index + 1,
    displayNumber,
    sourceQuestionId: sourceId ? Number(sourceId) : null,
    chapter: section.chapter,
    chapterTitle: section.title,
    question: plainPrompt(promptWithoutDiagrams),
    options,
    answer,
    explanation: normalizeText(explanationMatch[1]),
    explanationSource: 'source',
    type: answer.length > 1 ? 'multiple-answer' : 'single-choice',
    ...(diagrams.length ? { diagrams } : {}),
  });
}

if (sourceQuestions.length !== 376 || questions.length !== sourceQuestions.length) {
  throw new Error(`Expected 376 questions, parsed ${questions.length} of ${sourceQuestions.length}.`);
}

await writeFile(outputJson, `${JSON.stringify(questions, null, 2)}\n`, 'utf8');
await writeFile(outputJs, `window.EXAM_QUESTIONS = ${JSON.stringify(questions)};\n`, 'utf8');

console.log(`Built ${questions.length} questions across ${sections.length} chapters; ${questions.filter((question) => question.diagrams?.length).length} questions include rendered diagrams.`);
if (unsupportedDiagrams.length) console.warn(`Unrendered TikZ diagrams in questions: ${[...new Set(unsupportedDiagrams)].join(', ')}`);
