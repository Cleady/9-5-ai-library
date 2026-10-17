#!/usr/bin/env python3
"""Render all questions, explanations, notes, and references into both Markdown copies."""
from __future__ import annotations

import json
from collections import Counter
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "data" / "questions.json"
OUTPUTS = [ROOT / "DBI202_VIP_348_questions_by_chapter.md", ROOT.parent / "DBI202_VIP_348_questions_by_chapter.md"]
CHAPTERS = [
    "INTRODUCTION TO DATABASE SYSTEMS", "THE ENTITY-RELATIONSHIP MODEL", "THE RELATIONAL MODEL",
    "RELATIONAL ALGEBRA AND CALCULUS", "SQL: QUERIES, PROGRAMMING, TRIGGERS", "QUERY-BY-EXAMPLE (QBE)",
    "STORING DATA: DISKS AND FILES", "FILE ORGANIZATIONS AND INDEXES", "TREE-STRUCTURED INDEXING",
    "HASH-BASED INDEXING", "EXTERNAL SORTING", "EVALUATION OF RELATIONAL OPERATORS",
    "INTRODUCTION TO QUERY OPTIMIZATION", "A TYPICAL RELATIONAL QUERY OPTIMIZER",
    "SCHEMA REFINEMENT AND NORMAL FORMS", "PHYSICAL DATABASE DESIGN AND TUNING", "SECURITY",
    "TRANSACTION MANAGEMENT OVERVIEW", "CONCURRENCY CONTROL", "CRASH RECOVERY",
    "PARALLEL AND DISTRIBUTED DATABASES", "INTERNET DATABASES", "DECISION SUPPORT", "DATA MINING",
    "OBJECT-DATABASE SYSTEMS", "SPATIAL DATA MANAGEMENT", "DEDUCTIVE DATABASES", "ADDITIONAL TOPICS",
]


def quote(text: str) -> str:
    lines = (text or "").strip().splitlines()
    return "\n".join(f"> {line}" if line else ">" for line in lines) or "> (Nguồn không có nội dung câu hỏi dạng văn bản.)"


def render_question(question: dict[str, Any]) -> str:
    if question["source"].startswith("DBI202_VIP"):
        heading = f"### Câu gốc {question['sourceNumber']}"
        intro = ""
    else:
        heading = f"### THI_DBI202_FE_450 — {question['source']} — Câu {question['sourceNumber']}"
        intro = f"**Nguồn:** {question['source']}, câu {question['sourceNumber']}.\n\n"

    blocks = [heading, "", intro.rstrip()]
    blocks.append(quote(question.get("question", "")))
    if question.get("options"):
        blocks.append("**Lựa chọn:**")
        for option in question["options"]:
            blocks.append(quote(f"{option['key']}. {option.get('text', '')}"))
    if question.get("images"):
        blocks.append("**Hình đề gốc:** " + ", ".join(f"[{i + 1}]({url})" for i, url in enumerate(question["images"])))
    raw_answer = question.get("answerRaw", "").strip()
    blocks.append(f"**Đáp án lưu trong CSV:** {raw_answer or '(không có đáp án văn bản)'}")
    source_explanation = question.get("sourceExplanation", "").strip()
    if source_explanation:
        blocks.extend(["**Giải thích trong nguồn:**", quote(source_explanation)])
    for note in question.get("notes", []):
        blocks.append(f"**{note.get('label', 'Ghi chú')}:** {note.get('text', '')}")
    blocks.extend(["**Giải thích chi tiết:**", question.get("explanation", "")])
    refs = question.get("explanationReferences", [])
    if refs:
        links = ", ".join(f"[{ref['title']}]({ref['url']})" for ref in refs)
        blocks.append(f"**Nguồn tham khảo:** {links}")
    blocks.append("---")
    return "\n\n".join(blocks)


def main() -> None:
    questions = json.loads(DATA.read_text(encoding="utf-8"))
    if len(questions) != 798:
        raise ValueError(f"Expected 798 questions, found {len(questions)}")
    counts = Counter(question["chapter"] for question in questions)
    lines = [
        "# DBI202 — Bộ câu hỏi phân loại theo chương",
        "",
        "- Bộ câu hỏi VIP: **348 câu** (DBI202_VIP_348_questions.csv)",
        "- Bộ đề FE: **450 câu** từ **9 mã đề** (thi_DBI202/THI_DBI202_FE_450.csv)",
        "- Tổng số câu nguồn: **798**",
        "- Đã phân loại vào chương: **798**; chưa phân loại: **0**",
        "- Mỗi câu có giải thích chi tiết bằng tiếng Việt và liên kết tham khảo theo chủ đề.",
        "- Câu thiếu đề/lựa chọn hoặc có đáp án nguồn không khớp được ghi chú ngay dưới câu.",
        "",
        "Câu được xếp theo chủ đề chính đang kiểm tra. Số thứ tự cũ là số câu gốc trong bộ VIP; câu từ bộ FE được nhận diện bằng mã đề và số câu. Nội dung câu hỏi, lựa chọn, đáp án và giải thích gốc được giữ lại.",
        "",
        "## Tóm tắt số câu",
        "",
        "| Chương | Số câu |",
        "|---|---:|",
    ]
    lines.extend(f"| Chương {number} — {title} | {counts[number]} |" for number, title in enumerate(CHAPTERS, start=1))
    lines.extend(["| Chưa phân loại | 0 |", "", "---", ""])
    for number, title in enumerate(CHAPTERS, start=1):
        lines.extend([f"## Chương {number} — {title}", ""])
        chapter_questions = [question for question in questions if question["chapter"] == number]
        if not chapter_questions:
            lines.extend(["_(Chưa có câu hỏi trong bộ nguồn.)_", ""])
        for question in chapter_questions:
            lines.extend([render_question(question), ""])
    content = "\n".join(lines).rstrip() + "\n"
    written: set[Path] = set()
    for output in OUTPUTS:
        resolved = output.resolve()
        if resolved in written:
            continue
        resolved.write_text(content, encoding="utf-8")
        written.add(resolved)
        print(f"Wrote {resolved}")
    print(f"Rendered {len(questions)} question sections and {sum(counts.values())} chapter assignments.")


if __name__ == "__main__":
    main()
