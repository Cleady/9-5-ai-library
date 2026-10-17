import json
import csv
import re

transcript_path = r"C:\Users\anhqu\.gemini\antigravity\brain\2e2b3a67-700f-4020-aeaf-9da2b310b8b9\.system_generated\logs\transcript_full.jsonl"
answers_path = r"C:\Users\anhqu\Documents\FPTU - Artificial Intelligent\SOURCE\CEA - Ultimate Edition\answers.csv"
classifications_path = r"C:\Users\anhqu\Documents\FPTU - Artificial Intelligent\SOURCE\CEA - Ultimate Edition\classifications.json"
output_tex_path = r"C:\Users\anhqu\Documents\FPTU - Artificial Intelligent\SOURCE\CEA - Ultimate Edition\extracted_questions_by_chapter.tex"

chapter_names = {
    1: "Basic Concepts and Computer Evolution",
    2: "Performance Concepts",
    3: "A Top-Level View of Computer Function and Interconnection",
    4: "The Memory Hierarchy Locality and Performance",
    5: "Cache Memory",
    6: "Internal Memory",
    7: "External Memory",
    8: "Input & Output",
    9: "Operation System Support",
    10: "Number Systems",
    11: "Computer Arithmetic",
    12: "Digital Logic",
    13: "Instruction Sets Characteristic and Functions",
    14: "Instruction Sets: Addressing Modes and Formats",
    15: "Assembly Language and Related Topics",
    16: "Processor Structure and Function",
    17: "Reduced Instruction Set Computers",
    18: "Instruction-Level Parallelism and Superscalar Processors",
    19: "Control Unit Operation and Microprogrammed Control",
    20: "Parallel Processing",
    21: "Multicore Computers"
}

# Read answers
answers_map = {}
with open(answers_path, 'r', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    for row in reader:
        q_num = int(row['question'])
        answers_map[q_num] = row['answer'].strip()

# Read classifications
try:
    with open(classifications_path, 'r', encoding='utf-8') as f:
        classifications = json.load(f)
    classifications = {int(k): int(v) for k, v in classifications.items()}
except FileNotFoundError:
    classifications = {}

# Parse questions
questions = {}
pattern = re.compile(r'QUESTION_START\s+(\d+)\s*\n(.*?)QUESTION_END', re.DOTALL)

with open(transcript_path, 'r', encoding='utf-8') as f:
    for line in f:
        try:
            data = json.loads(line)
            content = ""
            if data.get('source') == 'SYSTEM' and 'content' in data:
                content = data['content']
            
            if content:
                matches = pattern.findall(content)
                for match in matches:
                    q_num = int(match[0])
                    q_content = match[1].strip()
                    
                    q_text = ""
                    options = {}
                    
                    lines = q_content.split('\n')
                    current_key = None
                    
                    for l in lines:
                        l = l.strip()
                        if l.startswith('QUESTION:'):
                            q_text = l.replace('QUESTION:', '', 1).strip()
                            current_key = 'Q'
                        elif l.startswith('A:'):
                            options['A'] = l.replace('A:', '', 1).strip()
                            current_key = 'A'
                        elif l.startswith('B:'):
                            options['B'] = l.replace('B:', '', 1).strip()
                            current_key = 'B'
                        elif l.startswith('C:'):
                            options['C'] = l.replace('C:', '', 1).strip()
                            current_key = 'C'
                        elif l.startswith('D:'):
                            options['D'] = l.replace('D:', '', 1).strip()
                            current_key = 'D'
                        elif l.startswith('E:'):
                            options['E'] = l.replace('E:', '', 1).strip()
                            current_key = 'E'
                        elif l.startswith('NUM_CHOICES:'):
                            pass
                        else:
                            if current_key == 'Q':
                                q_text += "\n" + l
                            elif current_key in options:
                                options[current_key] += "\n" + l

                    questions[q_num] = {
                        'text': q_text,
                        'options': options
                    }
        except json.JSONDecodeError:
            pass

# Group by chapter
chapters_data = {i: [] for i in range(1, 22)}
unclassified = []

for q_num in range(1, 538):
    if q_num in questions:
        ch = classifications.get(q_num)
        if ch and ch in chapters_data:
            chapters_data[ch].append(q_num)
        else:
            unclassified.append(q_num)

latex_template = r"""\documentclass[12pt,a4paper]{article}
\usepackage[utf8]{inputenc}
\usepackage[T5]{fontenc}
\usepackage{amsmath}
\usepackage{amssymb}
\usepackage{enumerate}
\usepackage{xcolor}

\begin{document}

\title{Computer Architecture - Categorized Questions}
\date{}
\maketitle
\tableofcontents
\newpage

"""

def escape_tex(text):
    return text.replace('&', '\&').replace('%', '\%').replace('#', '\#')

with open(output_tex_path, 'w', encoding='utf-8') as f:
    f.write(latex_template)
    
    for ch_num in range(1, 22):
        q_list = chapters_data[ch_num]
        if not q_list:
            continue
            
        f.write(f"\\section{{Chapter {ch_num}: {escape_tex(chapter_names[ch_num])}}}\n\n")
        
        for i in q_list:
            q = questions[i]
            ans = answers_map.get(i, '')
            ans_list = [a.strip() for a in ans.split(',')]
            
            f.write(f"\\textbf{{Question {i}:}} {escape_tex(q['text'])}\n\n")
            f.write("\\begin{itemize}\n")
            
            for opt_key in ['A', 'B', 'C', 'D', 'E']:
                if opt_key in q['options']:
                    opt_text = escape_tex(q['options'][opt_key])
                    if opt_key in ans_list or opt_key.lower() in [a.lower() for a in ans_list]:
                        f.write(f"    \\item[\\textbf{{{opt_key}.}}] \\textcolor{{red}}{{\\textbf{{{opt_text}}}}}\n")
                    else:
                        f.write(f"    \\item[\\textbf{{{opt_key}.}}] {opt_text}\n")
            
            f.write("\\end{itemize}\n\n")
            f.write("\\vspace{0.5cm}\n\n")
            
    if unclassified:
        f.write(f"\\section{{Unclassified Questions}}\n\n")
        for i in unclassified:
            q = questions[i]
            ans = answers_map.get(i, '')
            ans_list = [a.strip() for a in ans.split(',')]
            
            f.write(f"\\textbf{{Question {i}:}} {escape_tex(q['text'])}\n\n")
            f.write("\\begin{itemize}\n")
            
            for opt_key in ['A', 'B', 'C', 'D', 'E']:
                if opt_key in q['options']:
                    opt_text = escape_tex(q['options'][opt_key])
                    if opt_key in ans_list or opt_key.lower() in [a.lower() for a in ans_list]:
                        f.write(f"    \\item[\\textbf{{{opt_key}.}}] \\textcolor{{red}}{{\\textbf{{{opt_text}}}}}\n")
                    else:
                        f.write(f"    \\item[\\textbf{{{opt_key}.}}] {opt_text}\n")
            
            f.write("\\end{itemize}\n\n")
            f.write("\\vspace{0.5cm}\n\n")

    f.write("\\end{document}\n")

print(f"Successfully compiled {sum(len(x) for x in chapters_data.values())} classified questions into chapters.")
