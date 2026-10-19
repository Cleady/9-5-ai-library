import json

with open('scratch/batch_016_ocr.json', 'r', encoding='utf-8') as f:
    ocr = json.load(f)

with open('answers.json', 'r', encoding='utf-8') as f:
    ans_list = json.load(f)
ans_dict = {item['question']: item['answer'] for item in ans_list}

for qid in range(601, 641):
    q_str = str(qid)
    data = ocr.get(q_str, {})
    key = ans_dict.get(qid, '?')
    img = data.get('image', '')
    print(f"=== Q{qid} (Key: {key}, Image: {img}) ===")
    lines = data.get('raw_text', [])
    print('\n'.join(lines[:12]))
    if len(lines) > 12:
        print(f"... [{len(lines)-12} more lines]")
    print("-" * 50)
