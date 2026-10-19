const fs = require('fs');
const path = require('path');
const { mathjax } = require('mathjax-full/js/mathjax.js');
const { TeX } = require('mathjax-full/js/input/tex.js');
const { SVG } = require('mathjax-full/js/output/svg.js');
const { liteAdaptor } = require('mathjax-full/js/adaptors/liteAdaptor.js');
const { RegisterHTMLHandler } = require('mathjax-full/js/handlers/html.js');

// Initialize MathJax in Node
const adaptor = liteAdaptor();
RegisterHTMLHandler(adaptor);

const { AllPackages } = require('mathjax-full/js/input/tex/AllPackages.js');

// Standard math packages excluding error suppression
const packages = AllPackages.filter(name => name !== 'noerrors' && name !== 'noundefined');
const tex = new TeX({
  inlineMath: [['\\(', '\\)']],
  displayMath: [['\\[', '\\]']],
  packages: packages
});
const svg = new SVG({ fontCache: 'local' });
const htmlDoc = mathjax.document('', { InputJax: tex, OutputJax: svg });

function checkBracesBalance(str) {
  let depth = 0;
  for (let i = 0; i < str.length; i++) {
    if (str[i] === '\\') {
      i++; // skip escaped char
      continue;
    }
    if (str[i] === '{') depth++;
    else if (str[i] === '}') {
      depth--;
      if (depth < 0) return false;
    }
  }
  return depth === 0;
}

function extractMath(str) {
  const formulas = [];
  let remaining = str;

  // Check for forbidden dollar signs
  const dollarMatches = str.match(/(?<!\\)\$/g);
  if (dollarMatches) {
    throw new Error('Forbidden dollar delimiter ($) found! Use \\( ... \\) or \\[ ... \\]');
  }

  // Match \( ... \) and \[ ... \]
  const regex = /(\\\[[\s\S]*?\\\]|\\\([\s\S]*?\\\))/g;
  let match;
  while ((match = regex.exec(str)) !== null) {
    const raw = match[1];
    const isDisplay = raw.startsWith('\\[');
    const content = isDisplay ? raw.slice(2, -2) : raw.slice(2, -2);
    formulas.push({ raw, content, isDisplay, index: match.index });
  }

  // Check for unclosed delimiters
  const openInline = (str.match(/\\\(/g) || []).length;
  const closeInline = (str.match(/\\\)/g) || []).length;
  if (openInline !== closeInline) {
    throw new Error(`Unbalanced inline math delimiters: ${openInline} \\( vs ${closeInline} \\)`);
  }

  const openDisplay = (str.match(/\\\[/g) || []).length;
  const closeDisplay = (str.match(/\\\]/g) || []).length;
  if (openDisplay !== closeDisplay) {
    throw new Error(`Unbalanced display math delimiters: ${openDisplay} \\[ vs ${closeDisplay} \\]`);
  }

  return formulas;
}

function validateFormula(texString, isDisplay) {
  if (!checkBracesBalance(texString)) {
    return { valid: false, error: 'Unbalanced curly braces { }' };
  }
  try {
    const node = htmlDoc.convert(texString, { display: isDisplay });
    const rendered = adaptor.outerHTML(node);
    if (rendered.includes('merror')) {
      const errorText = adaptor.textContent(node) || 'Unknown MathJax syntax error';
      return { valid: false, error: errorText };
    }
    return { valid: true, node };
  } catch (err) {
    return { valid: false, error: err.message };
  }
}

function simulateDomRender(fullText) {
  // Replace each math formula with its rendered SVG text placeholder
  // and ensure no raw LaTeX control words remain in DOM text
  let stripped = fullText.replace(/\\\[[\s\S]*?\\\]/g, ' [MATH_BLOCK] ');
  stripped = stripped.replace(/\\\([\s\S]*?\\\)/g, ' [MATH_INLINE] ');

  const forbiddenTokens = ['\\(', '\\)', '\\[', '\\]', '\\frac', '\\dfrac', '\\begin', '\\end', '\\matrix', '\\sqrt', '\\int'];
  const leaked = [];
  for (const token of forbiddenTokens) {
    if (stripped.includes(token)) {
      leaked.push(token);
    }
  }
  return leaked;
}

function validateQuestion(q) {
  const errors = [];
  const warnings = [];

  // 1. Schema check
  const requiredFields = [
    'id', 'chapter', 'folder', 'topic', 'type',
    'question', 'options', 'answer', 'answer_original',
    'answer_status', 'explanation', 'image', 'needs_image',
    'review_flags', 'confidence'
  ];
  for (const field of requiredFields) {
    if (q[field] === undefined) {
      errors.push(`Missing required field: ${field}`);
    }
  }

  const isFallback = (q.question === null && q.answer_status === 'unverified');

  // 2. Validate question text
  if (typeof q.question === 'string') {
    try {
      const formulas = extractMath(q.question);
      for (const f of formulas) {
        const res = validateFormula(f.content, f.isDisplay);
        if (!res.valid) {
          errors.push(`In question formula "${f.raw}": ${res.error}`);
        }
      }
      const leaked = simulateDomRender(q.question);
      if (leaked.length > 0) {
        errors.push(`Question has leaked/unparsed raw LaTeX tokens: ${leaked.join(', ')}`);
      }
    } catch (err) {
      errors.push(`Question syntax error: ${err.message}`);
    }
  } else if (isFallback) {
    // Valid placeholder question awaiting future batch transcription
  } else {
    errors.push('Field "question" must be a string');
  }

  // 3. Validate options
  if (Array.isArray(q.options)) {
    q.options.forEach((opt, idx) => {
      if (typeof opt !== 'string') {
        errors.push(`Option ${idx} must be a string`);
        return;
      }
      try {
        const formulas = extractMath(opt);
        for (const f of formulas) {
          const res = validateFormula(f.content, f.isDisplay);
          if (!res.valid) {
            errors.push(`In option ${idx} ("${opt}"): ${res.error}`);
          }
        }
        const leaked = simulateDomRender(opt);
        if (leaked.length > 0) {
          errors.push(`Option ${idx} has leaked raw LaTeX tokens: ${leaked.join(', ')}`);
        }
      } catch (err) {
        errors.push(`Option ${idx} syntax error: ${err.message}`);
      }
    });
  } else {
    errors.push('Field "options" must be an array of strings');
  }

  // 4. Validate explanation
  if (Array.isArray(q.explanation)) {
    q.explanation.forEach((step, idx) => {
      if (typeof step !== 'string') {
        errors.push(`Explanation step ${idx} must be a string`);
        return;
      }
      try {
        const formulas = extractMath(step);
        for (const f of formulas) {
          const res = validateFormula(f.content, f.isDisplay);
          if (!res.valid) {
            errors.push(`In explanation step ${idx + 1}: ${res.error} (in formula: ${f.raw})`);
          }
        }
        const leaked = simulateDomRender(step);
        if (leaked.length > 0) {
          errors.push(`Explanation step ${idx + 1} has leaked raw LaTeX tokens: ${leaked.join(', ')}`);
        }
      } catch (err) {
        errors.push(`Explanation step ${idx + 1} syntax error: ${err.message}`);
      }
    });
  } else {
    errors.push('Field "explanation" must be an array of strings');
  }

  // 5. Answer status validation
  if (!['verified', 'conflict', 'uncertain'].includes(q.answer_status)) {
    if (!isFallback) {
      errors.push(`Invalid answer_status: "${q.answer_status}". Must be verified, conflict, or uncertain.`);
    }
  }

  // 6. Confidence validation
  if (!['high', 'medium', 'low'].includes(q.confidence)) {
    errors.push(`Invalid confidence: "${q.confidence}". Must be high, medium, or low.`);
  }

  return { errors, warnings };
}

function runValidation(filePath) {
  console.log(`\n==============================================`);
  console.log(`Running LaTeX & Schema Validation on: ${filePath}`);
  console.log(`==============================================\n`);

  if (!fs.existsSync(filePath)) {
    console.error(`Error: File not found: ${filePath}`);
    process.exit(1);
  }

  let data;
  try {
    data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (err) {
    console.error(`Error: Failed to parse JSON: ${err.message}`);
    process.exit(1);
  }

  const list = Array.isArray(data) ? data : data.questions;
  if (!Array.isArray(list)) {
    console.error('Error: Expected a JSON array of questions or an object with "questions" array.');
    process.exit(1);
  }

  let totalErrors = 0;
  let totalWarnings = 0;

  list.forEach((q, idx) => {
    const { errors, warnings } = validateQuestion(q);
    if (errors.length > 0 || warnings.length > 0) {
      console.log(`--- [Question ID ${q.id ?? idx + 1}] ---`);
      errors.forEach(e => {
        console.log(`  ❌ ERROR: ${e}`);
        totalErrors++;
      });
      warnings.forEach(w => {
        console.log(`  ⚠️ WARNING: ${w}`);
        totalWarnings++;
      });
    }
  });

  console.log(`\n----------------------------------------------`);
  console.log(`Summary: ${list.length} questions scanned.`);
  console.log(`Total Errors:   ${totalErrors}`);
  console.log(`Total Warnings: ${totalWarnings}`);
  console.log(`Status: ${totalErrors === 0 ? '✅ PASSED (All LaTeX clean and valid)' : '❌ FAILED'}`);
  console.log(`----------------------------------------------\n`);

  if (totalErrors > 0) {
    process.exit(1);
  }
}

// CLI argument or default to data/v2/test_20.json
const targetFile = process.argv[2] || path.join(__dirname, '../data/v2/test_20.json');
runValidation(path.resolve(targetFile));
