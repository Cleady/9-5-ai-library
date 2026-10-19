import json

with open('scratch/batch_011_ocr.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

for q in [404, 407, 408, 414, 417, 418, 420, 422, 427, 429, 432, 436, 437, 439]:
    sq = str(q)
    print(f'=== Q{q} ===')
    boxes = sorted(data[sq]['lines'], key=lambda item: (item['box'][0][1], item['box'][0][0]))
    for b in boxes:
        pt = b['box'][0]
        print(f"  ({pt[0]},{pt[1]}): {b['text']}")
