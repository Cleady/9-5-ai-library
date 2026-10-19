import json
import re

with open("v2/questions_sample_v2.json", "r", encoding="utf-8") as f:
    questions = json.load(f)

for q in questions:
    if 481 <= q["id"] <= 520:
        # Fix LaTeX syntax in Q484 if needed
        if q["id"] == 484:
            q["question"] = q["question"].replace(r"\[6pt]", r"\\")
        
        # Ensure explanation is a list of steps
        if isinstance(q["explanation"], str):
            lines = [l.strip() for l in q["explanation"].split("\n") if l.strip()]
            steps = []
            curr = []
            for l in lines:
                if l.startswith("Bước ") and curr:
                    steps.append("\n".join(curr))
                    curr = [l]
                else:
                    curr.append(l)
            if curr:
                steps.append("\n".join(curr))
            q["explanation"] = steps

with open("v2/questions_sample_v2.json", "w", encoding="utf-8") as f:
    json.dump(questions, f, indent=2, ensure_ascii=False)

js_content = "export const questions_v2 = " + json.dumps(questions, indent=2, ensure_ascii=False) + ";\n"
with open("v2/questions_v2.js", "w", encoding="utf-8") as f:
    f.write(js_content)

print(f"Fixed Batch 13 in questions_sample_v2.json and questions_v2.js. Total: {len(questions)}")
