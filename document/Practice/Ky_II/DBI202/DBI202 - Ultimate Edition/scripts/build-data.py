#!/usr/bin/env python3
"""Build DBI202 Study Hub's offline-friendly question data from the source CSVs and classified Markdown."""
from __future__ import annotations

import csv
import json
import re
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parents[1]
MARKDOWN = ROOT / "DBI202_VIP_348_questions_by_chapter.md"
VIP_CSV = ROOT / "sources" / "DBI202_VIP_348_questions.csv"
FE_CSV = ROOT / "sources" / "THI_DBI202_FE_450.csv"
DATA_DIR = ROOT / "data"
EXPLANATIONS_FILE = DATA_DIR / "explanations.json"

CHAPTER_RE = re.compile(r"^## Chương (\d+) — (.+)$")
VIP_RE = re.compile(r"^### Câu gốc (\d+)\s*$")
FE_RE = re.compile(r"^### THI_DBI202_FE_450 — (.+) — Câu (\d+)\s*$")
NOTE_RE = re.compile(r"^\*\*Ghi chú( phân loại)?::?\*\*\s*(.*)$")
OPTION_RE = re.compile(r"(?im)^[ \t]*([A-F])[.)][ \t]+")


def read_assignments() -> tuple[dict[int, dict[str, Any]], dict[tuple[str, int], dict[str, Any]]]:
    vip: dict[int, dict[str, Any]] = {}
    fe: dict[tuple[str, int], dict[str, Any]] = {}
    chapter = 0
    chapter_title = ""
    current: dict[str, Any] | None = None

    def store() -> None:
        nonlocal current
        if not current:
            return
        target = vip if current["kind"] == "vip" else fe
        key = current["key"]
        if key in target:
            raise ValueError(f"Duplicate question in classified Markdown: {key}")
        target[key] = {
            "chapter": current["chapter"],
            "chapterTitle": current["chapterTitle"],
            "notes": current["notes"],
        }
        current = None

    for line in MARKDOWN.read_text(encoding="utf-8-sig").splitlines():
        chapter_match = CHAPTER_RE.match(line)
        if chapter_match:
            store()
            chapter = int(chapter_match.group(1))
            chapter_title = chapter_match.group(2).strip()
            continue
        vip_match = VIP_RE.match(line)
        fe_match = FE_RE.match(line)
        if vip_match or fe_match:
            store()
            if vip_match:
                current = {"kind": "vip", "key": int(vip_match.group(1)), "chapter": chapter,
                           "chapterTitle": chapter_title, "notes": []}
            else:
                current = {"kind": "fe", "key": (fe_match.group(1), int(fe_match.group(2))),
                           "chapter": chapter, "chapterTitle": chapter_title, "notes": []}
            continue
        if current:
            note_match = NOTE_RE.match(line)
            if note_match:
                label = "Ghi chú phân loại" if note_match.group(1) else "Ghi chú nguồn"
                current["notes"].append({"label": label, "text": note_match.group(2).strip()})
    store()
    if len(vip) != 348 or len(fe) != 450:
        raise ValueError(f"Markdown assignment coverage mismatch: VIP={len(vip)}, FE={len(fe)}")
    return vip, fe


def parse_vip_question(raw: str) -> tuple[str, list[dict[str, str]]]:
    text = (raw or "").replace("\r\n", "\n").replace("\r", "\n").strip()
    # Some source choices put [A] on a line of its own; normalize those labels.
    text = re.sub(r"(?im)^[ \t]*\[([A-F])\][ \t]*\n", r"\1. ", text)
    matches = list(OPTION_RE.finditer(text))
    if not matches:
        stem = text
        options: list[dict[str, str]] = []
    else:
        stem = text[:matches[0].start()].strip()
        options = []
        for index, match in enumerate(matches):
            end = matches[index + 1].start() if index + 1 < len(matches) else len(text)
            value = text[match.end():end].strip()
            options.append({"key": match.group(1).upper(), "text": value})
    stem = re.sub(r"(?i)^\s*QN=\d+\s*\([^)]*\)\s*", "", stem).strip()
    return stem, options


def parse_fe_options(raw: str) -> list[dict[str, str]]:
    options: list[dict[str, str]] = []
    for part in re.split(r"\s*\|\s*", raw or ""):
        match = re.match(r"\s*([A-F])\s*[.)]\s*(.*?)\s*$", part, re.I | re.S)
        if match:
            options.append({"key": match.group(1).upper(), "text": match.group(2).strip()})
    return options


def answer_keys(raw: str, options: list[dict[str, str]]) -> list[str]:
    value = (raw or "").strip()
    upper = value.upper()
    # Keys are stored as A, B, A,B, A B, or concatenated letters such as ACD.
    if re.fullmatch(r"[A-F]{1,6}", upper):
        return list(dict.fromkeys(upper))
    if re.fullmatch(r"[A-F](?:[\s,;/|]+[A-F]){1,5}", upper):
        return list(dict.fromkeys(re.findall(r"[A-F]", upper)))
    # Older VIP rows sometimes store the full correct choice, e.g. "B. A view".
    prefixes = re.findall(r"(?<![A-Z])([A-F])\s*[.)](?=\s|$)", upper)
    if prefixes:
        return list(dict.fromkeys(prefixes))
    normalized = lambda text: " ".join(re.sub(r"[^\w]+", " ", text.casefold()).split())
    target = normalized(value)
    if target:
        for option in options:
            candidate = normalized(option["text"])
            if target == candidate:
                return [option["key"]]
    return []


def read_csv(path: Path) -> list[dict[str, str]]:
    with path.open("r", encoding="utf-8-sig", newline="") as stream:
        return list(csv.DictReader(stream))


def build() -> list[dict[str, Any]]:
    vip_assignments, fe_assignments = read_assignments()
    questions: list[dict[str, Any]] = []
    unresolved_answers: list[str] = []
    optionless: list[str] = []
    duplicate_ids: set[str] = set()

    for row in read_csv(VIP_CSV):
        number = int(row["stt"])
        assignment = vip_assignments.get(number)
        if assignment is None:
            raise ValueError(f"No chapter assigned to VIP question {number}")
        stem, options = parse_vip_question(row.get("questionText_plain", ""))
        answer = answer_keys(row.get("correctAnswer", ""), options)
        identifier = f"dbi-vip-{row['id']}"
        if identifier in duplicate_ids:
            raise ValueError(f"Duplicate question ID: {identifier}")
        duplicate_ids.add(identifier)
        note_list = list(assignment["notes"])
        if not options:
            note_list.append({"label": "Nguồn", "text": "File gốc không có lựa chọn dạng văn bản; có thể xem đáp án đã lưu."})
            optionless.append(f"VIP câu {number}")
        if not answer:
            unresolved_answers.append(f"VIP câu {number}: {row.get('correctAnswer', '')}")
        elif options and not set(answer).issubset({option["key"] for option in options}):
            note_list.append({"label": "Ghi chú nguồn", "text": "Đáp án lưu trong nguồn không khớp với các lựa chọn còn lại; dữ liệu đề có thể bị thiếu."})
        question = {
            "id": identifier,
            "displayId": f"VIP · Câu gốc {number}",
            "source": "DBI202_VIP_348_questions.csv",
            "sourceId": row["id"],
            "sourceNumber": number,
            "chapter": assignment["chapter"],
            "chapterTitle": assignment["chapterTitle"],
            "question": stem,
            "questionMissing": not bool(stem),
            "options": options,
            "answer": answer,
            "answerRaw": row.get("correctAnswer", ""),
            "explanation": row.get("explanation", "").strip(),
            "sourceExplanation": row.get("explanation", "").strip(),
            "explanationSource": "source",
            "explanationReferences": [],
            "notes": note_list,
            "images": [],
        }
        question["type"] = "true-false" if len(options) == 2 and {o["text"].strip().casefold() for o in options} == {"true", "false"} else ("multiple-choice" if len(answer) > 1 else "single-choice")
        questions.append(question)

    for row in read_csv(FE_CSV):
        number = int(row["stt_in_quiz"])
        quiz = row["quiz"].strip()
        assignment = fe_assignments.get((quiz, number))
        if assignment is None:
            raise ValueError(f"No chapter assigned to FE question {quiz} #{number}")
        options = parse_fe_options(row.get("options", ""))
        stem = (row.get("stem") or "").strip()
        answer = answer_keys(row.get("correctAnswer", ""), options)
        identifier = f"dbi-fe-{quiz}-{number:02d}"
        if identifier in duplicate_ids:
            raise ValueError(f"Duplicate question ID: {identifier}")
        duplicate_ids.add(identifier)
        images = [part.strip() for part in re.split(r"\s*\|\s*", row.get("images", "")) if part.strip()]
        note_list = list(assignment["notes"])
        if not stem:
            note_list.append({"label": "Nguồn", "text": "Đề gốc thiếu phần câu hỏi dạng văn bản; nội dung được giữ trong hình gốc nếu có."})
        if not options:
            note_list.append({"label": "Nguồn", "text": "Đề gốc không có lựa chọn dạng văn bản; có thể xem đáp án đã lưu."})
            optionless.append(f"{quiz} câu {number}")
        if not answer:
            unresolved_answers.append(f"{quiz} câu {number}: {row.get('correctAnswer', '')}")
        elif options and not set(answer).issubset({option["key"] for option in options}):
            note_list.append({"label": "Ghi chú nguồn", "text": "Đáp án lưu trong nguồn không khớp với các lựa chọn còn lại; dữ liệu đề có thể bị thiếu."})
        question = {
            "id": identifier,
            "displayId": f"{quiz} · Câu {number}",
            "source": quiz,
            "sourceId": row["questionId"],
            "sourceNumber": number,
            "chapter": assignment["chapter"],
            "chapterTitle": assignment["chapterTitle"],
            "question": stem,
            "questionMissing": not bool(stem),
            "options": options,
            "answer": answer,
            "answerRaw": row.get("correctAnswer", ""),
            "explanation": (row.get("explanation") or "").strip(),
            "sourceExplanation": (row.get("explanation") or "").strip(),
            "explanationSource": "source",
            "explanationReferences": [],
            "notes": note_list,
            "images": images,
        }
        question["type"] = "true-false" if len(options) == 2 and {o["text"].strip().casefold() for o in options} == {"true", "false"} else ("multiple-choice" if len(answer) > 1 else "single-choice")
        questions.append(question)

    questions.sort(key=lambda q: (q["chapter"], 0 if q["source"].startswith("DBI202_VIP") else 1, q["sourceNumber"], q["id"]))
    if len(questions) != 798:
        raise ValueError(f"Expected 798 questions, found {len(questions)}")
    if EXPLANATIONS_FILE.exists():
        authored = json.loads(EXPLANATIONS_FILE.read_text(encoding="utf-8"))
        unmatched = set(authored)
        for question in questions:
            entry = authored.get(question["id"])
            if entry is None:
                continue
            question["explanation"] = entry["explanation"]
            question["explanationReferences"] = entry.get("references", [])
            question["explanationSource"] = "curated"
            unmatched.discard(question["id"])
        if unmatched:
            raise ValueError(f"Explanation IDs not found in source data: {len(unmatched)}")
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    serialized = json.dumps(questions, ensure_ascii=False, indent=2)
    (DATA_DIR / "questions.json").write_text(serialized + "\n", encoding="utf-8")
    (DATA_DIR / "questions.js").write_text("window.EXAM_QUESTIONS = " + serialized + ";\n", encoding="utf-8")
    print(f"Wrote {len(questions)} questions across {len({q['chapter'] for q in questions})} chapters.")
    print(f"Text options missing on {len(optionless)} source rows; answer keys unresolved on {len(unresolved_answers)} rows.")
    if unresolved_answers:
        print("Unresolved answer keys:")
        for item in unresolved_answers:
            print(" -", item)
    return questions


if __name__ == "__main__":
    build()

