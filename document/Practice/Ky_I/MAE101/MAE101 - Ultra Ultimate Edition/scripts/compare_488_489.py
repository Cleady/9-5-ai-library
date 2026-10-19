from PIL import Image
import numpy as np

img88 = Image.open('assets/questions/0488_q488_Question_488.webp')
img89 = Image.open('assets/questions/0489_q489_Question_489.webp')

print("img88 size:", img88.size)
print("img89 size:", img89.size)

# Let's save a crop of the top region of both images
# In img88, find where "For the function" is located
crop88 = img88.crop((350, 90, 850, 220))
crop88.save('scripts/crop88.png')

crop89 = img89.crop((350, 90, 850, 220))
crop89.save('scripts/crop89.png')

# Also check top of 89 from y=0 to 120
crop89_top = img89.crop((350, 0, 850, 120))
crop89_top.save('scripts/crop89_top.png')

print("Crops saved.")
