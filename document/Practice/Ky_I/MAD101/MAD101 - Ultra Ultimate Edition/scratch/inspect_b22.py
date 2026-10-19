import json, os

data = json.load(open('scratch/batch_022_ocr.json', encoding='utf-8'))
for k in sorted(data.keys(), key=int):
    img = data[k].get('image')
    lines = data[k].get('raw_text', [])
    print(f"Q{k} -> {img}")
