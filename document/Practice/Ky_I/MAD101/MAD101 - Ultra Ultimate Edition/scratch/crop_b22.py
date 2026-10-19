from PIL import Image
import os

qs_to_crop = [844, 845, 846, 848, 850, 853, 855, 856, 860, 861, 862, 864, 868, 870, 871, 872, 873, 875, 876, 877, 878, 880]

for q in qs_to_crop:
    fname = f"0{q}_q{q}_Question_{q}.png"
    if os.path.exists(fname):
        img = Image.open(fname)
        w, h = img.size
        # Save a compressed or cropped preview
        out_name = f"scratch/q{q}_preview.png"
        img.save(out_name)
        print(f"Saved {out_name} size: {w}x{h}")
    else:
        print(f"Missing {fname}")
