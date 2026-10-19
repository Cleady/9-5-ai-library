import json
import os
from PIL import Image

with open('scratch/batch_013_ocr.json', 'r', encoding='utf-8') as f:
    ocr_data = json.load(f)

with open('answers.json', 'r', encoding='utf-8') as f:
    answers_list = json.load(f)
ans_map = {item['question']: item['answer'] for item in answers_list}

for qid in range(481, 521):
    sq = str(qid)
    fname = f"{qid:04d}_q{qid}_Question_{qid}.png"
    if not os.path.exists(fname):
        fname = f"{qid:04d}_q{qid}_Question_{qid}.webp"
    im = Image.open(fname)
    lines = [item['text'] for item in ocr_data[sq]['lines']]
    print(f"=== Q{qid} (Ans: {ans_map.get(qid)}, Size: {im.size}) ===")
    for l in lines:
        print("  ", l)
