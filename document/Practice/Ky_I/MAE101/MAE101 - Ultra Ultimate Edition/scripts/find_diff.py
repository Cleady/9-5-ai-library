from PIL import Image

img89 = Image.open('assets/questions/0489_q489_Question_489.webp')
crop_mark = img89.crop((700, 80, 850, 115))
crop_mark.save('scripts/crop_mark.png')

# Let's also check if there is text in the difference between img88 and img89
import numpy as np
arr88 = np.array(Image.open('assets/questions/0488_q488_Question_488.webp').convert('RGB'))
arr89 = np.array(Image.open('assets/questions/0489_q489_Question_489.webp').convert('RGB'))

diff = np.abs(arr88.astype(int) - arr89.astype(int)).astype(np.uint8)
diff_img = Image.fromarray(diff)
diff_img.save('scripts/diff_88_89.png')

# Find non-zero diff coords
diff_coords = np.argwhere(diff.sum(axis=2) > 20)
print(f"Diff coordinates count: {len(diff_coords)}")
if len(diff_coords) > 0:
    min_y, min_x = diff_coords.min(axis=0)
    max_y, max_x = diff_coords.max(axis=0)
    print(f"Bounding box of difference: x in [{min_x}, {max_x}], y in [{min_y}, {max_y}]")
    crop_diff = diff_img.crop((min_x, min_y, max_x, max_y))
    crop_diff.save('scripts/crop_diff.png')
    
    # Also save the actual region from 88 and 89
    im88 = Image.open('assets/questions/0488_q488_Question_488.webp')
    im89 = Image.open('assets/questions/0489_q489_Question_489.webp')
    im88.crop((min_x, min_y, max_x, max_y)).save('scripts/diff_in_88.png')
    im89.crop((min_x, min_y, max_x, max_y)).save('scripts/diff_in_89.png')
