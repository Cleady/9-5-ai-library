import os
import glob
import json

webp_files = glob.glob('**/*.webp', recursive=True)
print(f"Total webp files: {len(webp_files)}")
print(f"Sample webp files: {webp_files[:10]}")

# Group webp files by directory
webp_dirs = {}
for w in webp_files:
    d = os.path.dirname(w)
    webp_dirs[d] = webp_dirs.get(d, 0) + 1

for d, c in webp_dirs.items():
    print(f"Dir '{d}': {c} webp files")

# Inspect why pair analysis diff was high for 0193
# Let's inspect im_png vs im_webp for 0193
with open('scratch/image_analysis_summary.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

for p in data['pair_analysis'][:5]:
    print(p['base'], 'png:', p['png_path'], 'webp:', p['webp_path'])
