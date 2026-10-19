import json
import os
from PIL import Image

with open('scratch/batch_019_ocr.json', 'r', encoding='utf-8') as f:
    ocr = json.load(f)

with open('answers.json', 'r', encoding='utf-8') as f:
    ans_list = json.load(f)
ans_dict = {item['question']: item['answer'] for item in ans_list}

def inspect_range(start_id, end_id):
    for qid in range(start_id, end_id + 1):
        q_str = str(qid)
        data = ocr.get(q_str, {})
        key = ans_dict.get(qid, '?')
        print(f"==================== Q{qid} (Key: {key}) ====================")
        lines = data.get('lines', [])
        for item in lines:
            box = item['box']
            text = item['text']
            print(f"  y=[{box[0][1]}:{box[2][1]}] x=[{box[0][0]}:{box[2][0]}]: {text}")

if __name__ == '__main__':
    import sys
    s = int(sys.argv[1]) if len(sys.argv) > 1 else 721
    e = int(sys.argv[2]) if len(sys.argv) > 2 else 730
    inspect_range(s, e)
