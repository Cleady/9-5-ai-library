import json

data = json.load(open('scratch/batch_022_ocr.json', encoding='utf-8'))
with open('scratch/b22_summary.txt', 'w', encoding='utf-8') as f:
    for k, v in sorted(data.items(), key=lambda x: int(x[0])):
        f.write(f"=== Q{k} (img: {v.get('image')}) ===\n")
        raw = v.get('raw_text', '')
        if isinstance(raw, list):
            f.write("\n".join(raw) + "\n\n")
        else:
            f.write(str(raw) + "\n\n")
print("Done writing scratch/b22_summary.txt")
