import json
import csv
import re

transcript_path = r"C:\Users\anhqu\.gemini\antigravity\brain\2e2b3a67-700f-4020-aeaf-9da2b310b8b9\.system_generated\logs\transcript_full.jsonl"
answers_path = r"C:\Users\anhqu\Documents\FPTU - Artificial Intelligent\SOURCE\CEA - Ultimate Edition\answers.csv"
output_tex_path = r"C:\Users\anhqu\Documents\FPTU - Artificial Intelligent\SOURCE\CEA - Ultimate Edition\extracted_questions.tex"

# Read answers
answers_map = {}
with open(answers_path, 'r', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    for row in reader:
        q_num = int(row['question'])
        answers_map[q_num] = row['answer'].strip()

questions = {}
pattern = re.compile(r'QUESTION_START\s+(\d+)\s*\n(.*?)QUESTION_END', re.DOTALL)

with open(transcript_path, 'r', encoding='utf-8') as f:
    for line in f:
        try:
            data = json.loads(line)
            content = ""
            
            # Check if it's a SYSTEM message containing content
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

latex_template = r"""\documentclass[12pt,a4paper]{article}
\usepackage[utf8]{inputenc}
\usepackage[T5]{fontenc}
\usepackage{amsmath}
\usepackage{amssymb}
\usepackage{enumerate}
\usepackage{xcolor}

\begin{document}

\title{Computer Architecture - Quiz Questions}
\date{}
\maketitle

"""

with open(output_tex_path, 'w', encoding='utf-8') as f:
    f.write(latex_template)
    
    for i in range(1, 538):
        if i in questions:
            q = questions[i]
            ans = answers_map.get(i, '')
            ans_list = [a.strip() for a in ans.split(',')]
            
            # Clean up latex issues like $ without matching $, or & outside tables
            text_cleaned = q['text'].replace('&', '\&').replace('%', '\%').replace('#', '\#')
            
            f.write(f"\\textbf{{Question {i}:}} {text_cleaned}\n\n")
            f.write("\\begin{itemize}\n")
            
            for opt_key in ['A', 'B', 'C', 'D', 'E']:
                if opt_key in q['options']:
                    opt_text = q['options'][opt_key].replace('&', '\&').replace('%', '\%').replace('#', '\#')
                    if opt_key in ans_list or opt_key.lower() in [a.lower() for a in ans_list]:
                        f.write(f"    \\item[\\textbf{{{opt_key}.}}] \\textcolor{{red}}{{\\textbf{{{opt_text}}}}}\n")
                    else:
                        f.write(f"    \\item[\\textbf{{{opt_key}.}}] {opt_text}\n")
            
            f.write("\\end{itemize}\n\n")
            f.write("\\vspace{0.5cm}\n\n")
        else:
            f.write(f"\\textbf{{Question {i}:}} \\textit{{[Missing due to OCR error or skipped]}}\n\n")
            
    f.write("\\end{document}\n")

print(f"Successfully compiled {len(questions)} questions into LaTeX.")
