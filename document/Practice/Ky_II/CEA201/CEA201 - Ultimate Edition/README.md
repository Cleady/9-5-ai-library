# CEA Study Hub

Open `index.html` to study or take a practice exam. The page uses a warm, rose-accented card layout and shows the question stems and answer choices as text, without scanned question images. It runs in the browser with no backend or install step.

## Rebuild the question data

Run this from the project folder:

```sh
node scripts/build-data.mjs
```

The script reads `extracted_questions_by_chapter.tex`, `answers.txt`, and `answers.json`. `answers.txt` is authoritative. It writes `data/questions.json` and `data/questions.js`; the latter lets the HTML page load data when opened directly from disk. The parser report includes chapter totals, unmatched answers, missing explanations, duplicate IDs, malformed options, and answer-key review flags.

## Review explanations and answer-key flags

`data/explanations.ai.json` is keyed by question ID and stores the chapter and AI-written explanation text. The build script merges these entries into `data/questions.json` with `explanationSource: "ai"`. The current source files do not provide explanatory text, so all 537 explanations are marked AI-generated.

`data/review_flags.json` records answer-key calculations that disagree with the key, plus questions whose source options or context need clarification. The original answer is preserved in every case. Review this file before changing any answer.

In the app, use **Báo câu hỏi hoặc giải thích sai** on a question to save a local report. Use **JSON** in the header to export or restore progress, bookmarks, mistakes, history, notes, and reports.

## Quick verification checklist

- Run the data build and confirm its report shows 537 questions, zero unmatched answers, zero missing explanations, zero duplicate IDs, and zero malformed options.
- Open `index.html`, choose a chapter, and start a short text-only practice session.
- In **Học từng câu**, check an answer or reveal the answer; AI entries show the **AI tạo** badge.
- In **Thi thử**, choose a one-minute timer and confirm the page submits when the countdown reaches zero.
- Open a question report, save it, then export JSON to include the report with the local progress.
- Resume a session after reloading the page. Browser storage for `file:` URLs varies; a local static web server or GitHub Pages gives more reliable persistence.
