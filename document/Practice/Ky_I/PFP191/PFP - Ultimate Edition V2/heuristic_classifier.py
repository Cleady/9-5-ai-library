import json
import os

ROOT = os.path.dirname(os.path.abspath(__file__))
QUESTIONS_JSON = os.path.join(ROOT, "data", "questions.json")
OUTPUT_CLASSIFICATIONS = os.path.join(ROOT, "classifications.json")

with open(QUESTIONS_JSON, "r", encoding="utf-8") as f:
    questions = json.load(f)

classifications = {}
for q in questions:
    qid = int(q["id"])
    if qid <= 40:
        classifications[str(qid)] = 1
    elif qid <= 80:
        classifications[str(qid)] = 2
    elif qid <= 120:
        classifications[str(qid)] = 3
    elif qid <= 160:
        classifications[str(qid)] = 4
    else:
        classifications[str(qid)] = 5

with open(OUTPUT_CLASSIFICATIONS, "w", encoding="utf-8") as f:
    json.dump(classifications, f, indent=2)

print(f"Updated {OUTPUT_CLASSIFICATIONS} for {len(classifications)} questions.")
