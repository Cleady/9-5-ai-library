from PIL import Image
import pytesseract
import os

# Let's see if pytesseract or OCR or simple image inspection can tell us what's in both
print("PNG:", Image.open('0193_q193_Question_193.png').size)
print("WEBP:", Image.open('0193_q193_Question_193.webp').size)

# Let's inspect a few more pairs
pairs = [
    '0193_q193_Question_193',
    '0194_q194_Question_194',
    '0423_q423_Question_423',
    '0424_q424_Question_424'
]

for p in pairs:
    for ext in ['.png', '.webp']:
        fn = p + ext
        if os.path.exists(fn):
            im = Image.open(fn)
            print(f"{fn}: format={im.format}, size={im.size}, mode={im.mode}")
        else:
            print(f"{fn}: NOT FOUND in root")
