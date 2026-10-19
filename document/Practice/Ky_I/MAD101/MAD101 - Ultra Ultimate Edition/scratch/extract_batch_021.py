import json, os, glob
import easyocr

with open('answers.json', 'r', encoding='utf-8') as f:
    ans = json.load(f)

b21_items = ans[800:840]
print(f"Loaded {len(b21_items)} items for Batch 21 (Q{b21_items[0]['question']} - Q{b21_items[-1]['question']}).")

reader = easyocr.Reader(['en'], gpu=False)
ocr_results = {}

for item in b21_items:
    qid = item['question']
    img_name = item['image_file']
    matches = glob.glob(f"**/*{img_name}*", recursive=True)
    non_chap = [m for m in matches if not m.startswith('chapters')]
    target = non_chap[0] if non_chap else (matches[0] if matches else None)
    
    if not target or not os.path.exists(target):
        matches = glob.glob(f"**/*{qid:04d}*", recursive=True)
        target = matches[0] if matches else None
        
    print(f"Running OCR on Q{qid} ({target})...")
    if target and os.path.exists(target):
        res = reader.readtext(target)
        lines = [{'text': str(r[1]), 'confidence': float(r[2]), 'box': [[int(coord) for coord in pt] for pt in r[0]]} for r in res]
        raw_text = [str(r['text']) for r in lines]
        ocr_results[str(qid)] = {
            'image': target,
            'lines': lines,
            'raw_text': raw_text
        }
    else:
        print(f"WARNING: Image not found for Q{qid}!")
        ocr_results[str(qid)] = {
            'image': None,
            'lines': [],
            'raw_text': []
        }

with open('scratch/batch_021_ocr.json', 'w', encoding='utf-8') as f:
    json.dump(ocr_results, f, ensure_ascii=False, indent=2)

print("Batch 21 OCR extraction complete: scratch/batch_021_ocr.json")
