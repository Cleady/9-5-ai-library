import os
import json
import easyocr

reader = easyocr.Reader(['en', 'vi'], gpu=False)

def get_image_path(q):
    prefix = f"0{q}_" if q < 1000 else f"{q}_"
    valid_exts = ('.png', '.webp', '.jpg', '.jpeg')
    matches = [f for f in os.listdir('.') if f.startswith(prefix) and f.lower().endswith(valid_exts)]
    if matches:
        return matches[0]
    for r, d, files in os.walk('chapters'):
        m = [f for f in files if f.startswith(prefix) and f.lower().endswith(valid_exts)]
        if m:
            return os.path.join(r, m[0])
    return None

ocr_data = {}
for q in range(921, 961):
    img_path = get_image_path(q)
    if not img_path:
        print(f"Warning: image for Q{q} not found!")
        continue
    print(f"OCR processing Q{q}: {img_path}...")
    res = reader.readtext(img_path)
    lines = []
    raw_text = []
    for bbox, text, conf in res:
        box = [[int(pt[0]), int(pt[1])] for pt in bbox]
        lines.append({
            "text": str(text),
            "confidence": float(conf),
            "box": box
        })
        raw_text.append(str(text))
    ocr_data[str(q)] = {
        "image": os.path.basename(img_path),
        "lines": lines,
        "raw_text": raw_text
    }

with open("scratch/batch_024_ocr.json", "w", encoding="utf-8") as f:
    json.dump(ocr_data, f, indent=2, ensure_ascii=False)

print(f"Completed OCR for {len(ocr_data)} questions in Batch 24.")
