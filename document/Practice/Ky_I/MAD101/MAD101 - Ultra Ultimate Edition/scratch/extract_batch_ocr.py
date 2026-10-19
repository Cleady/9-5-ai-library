import os
import json
import time
import easyocr

def extract_range(start_id, end_id, out_file):
    print(f"Starting OCR extraction for Q{start_id} to Q{end_id}...")
    reader = easyocr.Reader(['en'], gpu=False)
    results = {}
    
    t0 = time.time()
    for qid in range(start_id, end_id + 1):
        # find matching image file
        img_name = f"{qid:04d}_q{qid}_Question_{qid}.png"
        if not os.path.exists(img_name):
            # check webp
            img_name_webp = f"{qid:04d}_q{qid}_Question_{qid}.webp"
            if os.path.exists(img_name_webp):
                img_name = img_name_webp
            else:
                print(f"Warning: Image for Q{qid} not found!")
                results[str(qid)] = {"error": "Image not found"}
                continue
        
        t_start = time.time()
        # detail=1 gives bounding box, text, confidence
        data = reader.readtext(img_name, detail=1)
        # extract text and confidence
        lines = []
        for bbox, text, conf in data:
            lines.append({
                "text": text,
                "confidence": round(float(conf), 4),
                "box": [[int(p[0]), int(p[1])] for p in bbox]
            })
        
        results[str(qid)] = {
            "image": img_name,
            "lines": lines,
            "raw_text": [l["text"] for l in lines]
        }
        print(f"[{qid}] extracted {len(lines)} lines in {round(time.time() - t_start, 2)}s")
    
    with open(out_file, 'w', encoding='utf-8') as f:
        json.dump(results, f, ensure_ascii=False, indent=2)
    print(f"Completed Q{start_id}-Q{end_id} in {round(time.time() - t0, 1)}s. Saved to {out_file}.")

if __name__ == '__main__':
    import sys
    start = int(sys.argv[1]) if len(sys.argv) > 1 else 201
    end = int(sys.argv[2]) if len(sys.argv) > 2 else 240
    out = sys.argv[3] if len(sys.argv) > 3 else f"scratch/batch_{start:03d}_{end:03d}_ocr.json"
    extract_range(start, end, out)
