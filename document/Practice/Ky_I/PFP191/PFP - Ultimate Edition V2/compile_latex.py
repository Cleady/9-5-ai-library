import json
import os

ROOT = os.path.dirname(os.path.abspath(__file__))
QUESTIONS_JSON = os.path.join(ROOT, "data", "questions.json")
OUTPUT_TEX = os.path.join(ROOT, "extracted_questions.tex")

with open(QUESTIONS_JSON, "r", encoding="utf-8") as f:
    questions = json.load(f)

tex_lines = [
    r"\documentclass[11pt,a4paper]{article}",
    r"\usepackage[utf8]{inputenc}",
    r"\usepackage[vietnamese,english]{babel}",
    r"\usepackage{amsmath,amssymb}",
    r"\usepackage{geometry}",
    r"\geometry{a4paper, margin=2cm}",
    r"\usepackage{enumitem}",
    r"\usepackage{xcolor}",
    r"\usepackage{hyperref}",
    r"\usepackage{listings}",
    "",
    r"\title{\textbf{PFP191 - Programming Fundamentals with Python}\\\Large Complete Question Bank}",
    r"\author{Google Antigravity Image-to-Text Pipeline}",
    r"\date{\today}",
    "",
    r"\begin{document}",
    r"\maketitle",
    r"\tableofcontents",
    r"\newpage",
    ""
]

for q in questions:
    qid = q["id"]
    tex_lines.append(r"\begin{minipage}{\textwidth}")
    tex_lines.append(f"\\subsection*{{Question {qid} \\quad \\footnotesize{{[{q.get('image', '')}]}}}}")
    tex_lines.append(f"\\noindent \\textbf{{{q['question'].replace(chr(10), '\\newline\n')}}}")
    tex_lines.append("")
    tex_lines.append(r"\begin{enumerate}[label=\Alph*.]")
    answers = q.get("answer", [])
    for opt in q["options"]:
        k = opt["key"]
        t = opt["text"].replace("\n", " ")
        if k in answers:
            tex_lines.append(f"    \\item \\textbf{{{t}}} \\hfill \\textcolor{{blue}}{{\\textbf{{[Correct]}}}}")
        else:
            tex_lines.append(f"    \\item {t}")
    tex_lines.append(r"\end{enumerate}")
    tex_lines.append("")
    tex_lines.append(f"\\noindent \\textbf{{Correct Answer:}} \\textcolor{{blue}}{{\\textbf{{{', '.join(answers)}}}}} \\\\[4pt]")
    tex_lines.append(r"\noindent \textbf{Explanation:}\\")
    tex_lines.append(q.get("explanation", "").replace("\n", "\\newline\n"))
    tex_lines.append(r"\end{minipage}")
    tex_lines.append(r"\vspace{0.8cm}")
    tex_lines.append(r"\hrule")
    tex_lines.append(r"\vspace{0.5cm}")
    tex_lines.append("")

tex_lines.append(r"\end{document}")

with open(OUTPUT_TEX, "w", encoding="utf-8") as f:
    f.write("\n".join(tex_lines) + "\n")

print(f"Generated {OUTPUT_TEX} with {len(questions)} questions.")
