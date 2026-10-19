import os
import json
import easyocr
import cv2

reader = easyocr.Reader(['en'], gpu=False)

with open('answers.json', 'r', encoding='utf-8') as f:
    ans_data = json.load(f)
ans_map = {item['question']: item for item in ans_data}

ocr_results = {}

for q in range(561, 601):
    item = ans_map.get(q)
    preferred_img = item['image_file'] if item else f"{q:04d}_q{q}_Question_{q}.png"
    
    # Check preferred first, then fallbacks
    candidates = [
        preferred_img,
        preferred_img.replace('.png', '.webp'),
        preferred_img.replace('.webp', '.png'),
    ]
    # Check in root and chapters
    for ch in ['Ch1_Logic', 'Ch2_Sets_Relations', 'Ch3_Functions', 'Ch4_Number_Theory',
               'Ch5_Induction', 'Ch6_Counting', 'Ch7_Recursion', 'Ch8_Relations',
               'Ch9_Graphs', 'Ch10_Trees']:
        candidates.append(os.path.join('chapters', ch, preferred_img))
        candidates.append(os.path.join('chapters', ch, preferred_img.replace('.png', '.webp')))
        candidates.append(os.path.join('chapters', ch, preferred_img.replace('.webp', '.png')))

    actual_path = None
    for p in candidates:
        if os.path.exists(p):
            actual_path = p
            break
            
    if not actual_path:
        print(f"Warning: File not found for Q{q}: {preferred_img}")
        continue
        
    img = cv2.imread(actual_path)
    res = reader.readtext(img)
    lines = [{'text': r[1], 'confidence': round(float(r[2]), 4), 'box': [[int(pt[0]), int(pt[1])] for pt in r[0]]} for r in res]
    raw_text = [r[1] for r in res]
    
    ocr_results[str(q)] = {
        'image': os.path.basename(actual_path),
        'lines': lines,
        'raw_text': raw_text
    }
    print(f"OCR Q{q} ({os.path.basename(actual_path)}): {len(raw_text)} lines extracted")

with open('scratch/batch_015_ocr.json', 'w', encoding='utf-8') as f:
    json.dump(ocr_results, f, indent=2, ensure_ascii=False)

print(f"Finished extracting OCR for {len(ocr_results)} questions in Batch 15.")
