import easyocr
from PIL import Image

reader = easyocr.Reader(['en'], gpu=False)

def inspect(qid, crop_box=None):
    im_path = f"{qid:04d}_q{qid}_Question_{qid}.png"
    im = Image.open(im_path)
    if crop_box:
        im = im.crop(crop_box)
        crop_path = f"scratch/crop_q{qid}.png"
        im.save(crop_path)
        data = reader.readtext(crop_path, detail=0)
    else:
        data = reader.readtext(im_path, detail=0)
    print(f"=== Q{qid} ===")
    for line in data:
        print(" ", line)

if __name__ == '__main__':
    # Q721 options
    inspect(721, (40, 200, 700, 540))
    # Q725 full
    inspect(725, (40, 60, 750, 600))
    # Q726 code & options
    inspect(726, (40, 80, 750, 700))
    # Q727 full
    inspect(727, (40, 60, 750, 580))
    # Q728 code & options
    inspect(728, (40, 80, 750, 720))
    # Q729 code & options
    inspect(729, (40, 80, 750, 800))
    # Q730 code & options
    inspect(730, (40, 80, 750, 850))
