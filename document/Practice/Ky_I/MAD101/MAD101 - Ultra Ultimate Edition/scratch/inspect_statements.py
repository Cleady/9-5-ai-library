from PIL import Image
import easyocr

reader = easyocr.Reader(['en'], gpu=False)

q_list = [441, 442, 443, 444, 445, 452, 453, 454, 458, 459, 462, 463, 464, 467, 468, 470, 472, 474, 477, 478]

for qid in q_list:
    fname = f"{qid:04d}_q{qid}_Question_{qid}.png"
    im = Image.open(fname)
    w, h = im.size
    # crop question area: top 45% of image
    crop = im.crop((0, 0, w, int(h * 0.55)))
    crop_path = f"scratch/q_{qid}_top.png"
    crop.save(crop_path)
    res = reader.readtext(crop_path, paragraph=False, text_threshold=0.15, low_text=0.15)
    print(f"=== Q{qid} Statement Area ===")
    for b, t, c in res:
        print(f"  {t} ({c:.2f})")
