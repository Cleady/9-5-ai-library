import cv2
import numpy as np
import easyocr

reader = easyocr.Reader(['en'], gpu=False)

def analyze_image(path, name):
    print(f"=== {name}: {path} ===")
    img = cv2.imread(path)
    if img is None:
        print("COULD NOT READ")
        return
    h, w, _ = img.shape
    print(f"Shape: {w}x{h}")
    # OCR with detailed bounding boxes
    results = reader.readtext(img)
    for bbox, text, prob in results:
        # print bbox centroid and text
        xs = [p[0] for p in bbox]
        ys = [p[1] for p in bbox]
        print(f"  ({int(np.mean(xs))}, {int(np.mean(ys))}) [p={prob:.2f}]: {text}")

for qid in [563, 564, 568, 572, 573, 575, 577, 578, 579, 580, 583, 591, 597]:
    # find path
    import os, glob
    files = glob.glob(f"**/*{qid:04d}*", recursive=True)
    # pick the one matching answers.json
    best = [f for f in files if not f.startswith('chapters')]
    if best:
        analyze_image(best[0], f"Q{qid}")
