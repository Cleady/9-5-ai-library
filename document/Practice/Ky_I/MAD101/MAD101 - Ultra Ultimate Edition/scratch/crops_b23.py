from PIL import Image

crops_b23 = {
    883: (300, 50, 1500, 600),
    886: (300, 50, 1500, 600),
    894: (50, 50, 750, 450),
    895: (300, 50, 1500, 600),
    914: (300, 50, 1500, 600),
    915: (50, 50, 750, 450),
}

for q, box in crops_b23.items():
    fname = f"0{q}_q{q}_Question_{q}.png"
    img = Image.open(fname)
    img.crop(box).save(f"scratch/q{q}_crop.png")
    print(f"Cropped Q{q}")

print("Done cropping target diagrams for Batch 23.")
