import os
import json
import easyocr
import cv2

reader = easyocr.Reader(['en'], gpu=False)

with open('answers.json', 'r', encoding='utf-8') as f:
    ans_data = json.load(f)
ans_map = {item['question']: item for item in ans_data}

ocr_results = {}

for q in range(521, 561):
    item = ans_map.get(q)
    img_name = item['image_file'] if item else f"{q:04d}_q{q}_Question_{q}.png"
    
    # Try finding the file
    possible_paths = [
        img_name,
        img_name.replace('.png', '.webp'),
        img_name.replace('.webp', '.png'),
        os.path.join('chapters', 'Ch1_Logic', img_name),
        os.path.join('chapters', 'Ch2_Sets_Relations', img_name),
        os.path.join('chapters', 'Ch3_Functions', img_name),
        os.path.join('chapters', 'Ch4_Number_Theory', img_name),
        os.path.join('chapters', 'Ch5_Induction', img_name),
        os.path.join('chapters', 'Ch6_Counting', img_name),
        os.path.join('chapters', 'Ch7_Recursion', img_name),
        os.path.join('chapters', 'Ch8_Relations', img_name),
        os.path.join('chapters', 'Ch9_Graphs', img_name),
        os.path.join('chapters', 'Ch10_Trees', img_name),
    ]
    
    actual_path = None
    for p in possible_paths:
        if os.path.exists(p):
            actual_path = p
            break
            
    if not actual_path:
        print(f"Warning: File not found for Q{q}: {img_name}")
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

with open('scratch/batch_014_ocr.json', 'w', encoding='utf-8') as f:
    json.dump(ocr_results, f, indent=2, ensure_ascii=False)

print(f"Finished extracting OCR for {len(ocr_results)} questions in Batch 14.")
