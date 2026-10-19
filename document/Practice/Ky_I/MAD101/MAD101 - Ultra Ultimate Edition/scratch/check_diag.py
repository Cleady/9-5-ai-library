import json

with open('scratch/batch_024_ocr.json', 'r', encoding='utf-8') as f:
    ocr = json.load(f)

for q in ['923', '933', '934']:
    print(f'=== Q{q} ===')
    for l in ocr[q]['lines']:
        print(f"{l['box']}: {l['text']}")
