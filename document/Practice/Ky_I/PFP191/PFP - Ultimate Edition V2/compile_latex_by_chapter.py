import json
import os
import re

ROOT = os.path.dirname(os.path.abspath(__file__))
QUESTIONS_JSON = os.path.join(ROOT, "data", "questions.json")
OUTPUT_TEX = os.path.join(ROOT, "extracted_questions_by_chapter.tex")

def escape_latex(text):
    if not text:
        return ""
    # Don't escape if it's already LaTeX markup
    return text.replace("\\", "\\textbackslash ").replace("&", "\\&").replace("%", "\\%").replace("$", "\\$").replace("#", "\\#").replace("_", "\\_").replace("{", "\\{").replace("}", "\\}")

with open(QUESTIONS_JSON, "r", encoding="utf-8") as f:
    questions = json.load(f)

# Group by chapter
chapters = {}
for q in questions:
    ch = q["chapter"]
    if ch not in chapters:
        chapters[ch] = {
            "title": q["chapterTitle"],
            "questions": []
        }
    chapters[ch]["questions"].append(q)

tex_lines = [
    r"\documentclass[12pt,a4paper]{article}",
    r"\usepackage[utf8]{inputenc}",
    r"\usepackage[T5]{fontenc}",
    r"\usepackage{amsmath}",
    r"\usepackage{amssymb}",
    r"\usepackage{enumerate}",
    r"\usepackage{xcolor}",
    "",
    r"\begin{document}",
    "",
    r"\title{PFP191 - Python Programming Fundamentals - Categorized Questions}",
    r"\date{}",
    r"\maketitle",
    r"\tableofcontents",
    r"\newpage",
    ""
]

for ch_id in sorted(chapters.keys()):
    ch = chapters[ch_id]
    tex_lines.append(f"\\section{{Chapter {ch_id}: {ch['title']}}}")
    tex_lines.append("")
    
    for q in ch["questions"]:
        qid = q["id"]
        q_text = q["question"]
        answers = q.get("answer", [])
        
        # Clean up question text for LaTeX
        clean_q = q_text.replace("\n", "\\newline\n")
        tex_lines.append(f"\\textbf{{Question {qid}:}} {clean_q}")
        tex_lines.append("")
        tex_lines.append(r"\begin{itemize}")
        
        for opt in q["options"]:
            key = opt["key"]
            opt_text = opt["text"].replace("\n", " ")
            if key in answers:
                tex_lines.append(f"    \\item[\\textbf{{{key}.}}] \\textcolor{{red}}{{\\textbf{{{opt_text}}}}}")
            else:
                tex_lines.append(f"    \\item[\\textbf{{{key}.}}] {opt_text}")
                
        tex_lines.append(r"\end{itemize}")
        tex_lines.append("")
        tex_lines.append(r"\vspace{0.5cm}")
        tex_lines.append("")

tex_lines.append(r"\end{document}")

with open(OUTPUT_TEX, "w", encoding="utf-8") as f:
    f.write("\n".join(tex_lines) + "\n")

print(f"Generated {OUTPUT_TEX} with {len(questions)} questions across {len(chapters)} chapters.")
