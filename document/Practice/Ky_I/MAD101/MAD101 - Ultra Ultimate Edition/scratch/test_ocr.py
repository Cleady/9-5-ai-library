import pytesseract
from PIL import Image

try:
    png_txt = pytesseract.image_to_string(Image.open('0193_q193_Question_193.png'))
    webp_txt = pytesseract.image_to_string(Image.open('0193_q193_Question_193.webp'))
    print("PNG text:\n", png_txt[:200])
    print("WEBP text:\n", webp_txt[:200])
except Exception as e:
    print("Tesseract error:", e)
