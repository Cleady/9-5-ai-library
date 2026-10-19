/**
 * MAD101 STUDIO — SAFE MATHJAX TYPESETTING MODULE
 * js/mathjax-render.js
 */

export function escapeHtml(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Typesets math formulas inside a specific DOM element using local MathJax.
 * Ensures no raw latex flash and clears previous SVG caches for efficiency.
 */
export async function typesetElement(element) {
  if (!element) return;

  if (window.MathJax && window.MathJax.typesetPromise) {
    try {
      // Clear previous MathJax output if already typeset to prevent accumulation
      if (window.MathJax.typesetClear) {
        window.MathJax.typesetClear([element]);
      }
      await window.MathJax.typesetPromise([element]);
    } catch (err) {
      console.warn('[MathJax] Typesetting failed:', err);
    }
  } else {
    // If MathJax is still loading, wait and retry once
    setTimeout(() => {
      if (window.MathJax && window.MathJax.typesetPromise) {
        window.MathJax.typesetPromise([element]).catch(() => {});
      }
    }, 250);
  }
}
