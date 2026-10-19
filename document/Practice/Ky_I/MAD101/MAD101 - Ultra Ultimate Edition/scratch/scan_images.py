import os
import hashlib
import json
import re
from PIL import Image
import numpy as np

PROJECT_DIR = '.'
IGNORED_DIRS = {'node_modules', '.git', 'legacy'}

IMAGE_EXTENSIONS = {'.png', '.jpg', '.jpeg', '.webp', '.gif', '.svg', '.bmp'}

def get_sha256(filepath):
    hasher = hashlib.sha256()
    with open(filepath, 'rb') as f:
        while chunk := f.read(65536):
            hasher.update(chunk)
    return hasher.hexdigest()

# 1. Collect all images
print("Scanning project for images...")
all_images = {}
for root, dirs, files in os.walk(PROJECT_DIR):
    # filter out ignored dirs
    dirs[:] = [d for d in dirs if d not in IGNORED_DIRS and not d.startswith('.')]
    for file in files:
        ext = os.path.splitext(file)[1].lower()
        if ext in IMAGE_EXTENSIONS:
            rel_path = os.path.relpath(os.path.join(root, file), PROJECT_DIR).replace('\\', '/')
            size = os.path.getsize(rel_path)
            all_images[rel_path] = {
                'filename': file,
                'path': rel_path,
                'size': size,
                'ext': ext
            }

print(f"Total image files found: {len(all_images)}")

# 2. Extract referenced images from project files
referenced_images = set()
files_to_scan = []
for root, dirs, files in os.walk(PROJECT_DIR):
    dirs[:] = [d for d in dirs if d not in IGNORED_DIRS and not d.startswith('.')]
    for file in files:
        if file.endswith(('.html', '.js', '.json', '.webmanifest', '.css')):
            files_to_scan.append(os.path.join(root, file))

for fpath in files_to_scan:
    try:
        with open(fpath, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()
            for img_path, info in all_images.items():
                fname = info['filename']
                base_name = os.path.splitext(fname)[0]
                if fname in content or img_path in content:
                    referenced_images.add(img_path)
    except Exception as e:
        pass

print(f"Directly referenced images: {len(referenced_images)}")

# 3. Check hash duplicates
hash_map = {}
corrupted_images = []
oversized_images = []

for img_path, info in all_images.items():
    if info['size'] == 0:
        corrupted_images.append((img_path, "0 byte file"))
        continue
    
    # Try opening with PIL
    try:
        with Image.open(img_path) as im:
            info['width'], info['height'] = im.size
            info['format'] = im.format
    except Exception as e:
        corrupted_images.append((img_path, str(e)))
        continue

    # Oversized check (> 300KB)
    if info['size'] > 300 * 1024:
        oversized_images.append((img_path, info['size']))

    sha = get_sha256(img_path)
    info['sha256'] = sha
    if sha not in hash_map:
        hash_map[sha] = []
    hash_map[sha].append(img_path)

duplicate_hash_groups = {sha: paths for sha, paths in hash_map.items() if len(paths) > 1}
print(f"Exact hash duplicate groups: {len(duplicate_hash_groups)}")

# 4. Analyze pairs with same question ID (png vs webp)
question_regex = re.compile(r'^(\d{4}_q\d{3,4}_Question_\d+)\.(png|webp)$', re.IGNORECASE)
by_question_base = {}
for img_path, info in all_images.items():
    m = question_regex.match(info['filename'])
    if m:
        base = m.group(1)
        ext = m.group(2).lower()
        if base not in by_question_base:
            by_question_base[base] = {}
        by_question_base[base][ext] = img_path

pairs = {base: formats for base, formats in by_question_base.items() if len(formats) > 1}
print(f"Question image pairs (.png and .webp): {len(pairs)}")

pair_analysis = []
for base, formats in pairs.items():
    png_path = formats.get('png')
    webp_path = formats.get('webp')
    if png_path and webp_path:
        png_size = all_images[png_path]['size']
        webp_size = all_images[webp_path]['size']
        png_ref = png_path in referenced_images
        webp_ref = webp_path in referenced_images
        
        # Compare visuals
        res_match = False
        is_same_content = False
        diff_val = None
        png_dim = None
        webp_dim = None
        try:
            with Image.open(png_path) as im_png, Image.open(webp_path) as im_webp:
                png_dim = list(im_png.size)
                webp_dim = list(im_webp.size)
                res_match = bool(im_png.size == im_webp.size)
                # Check if identical content (downsample and compare MSE)
                im1 = im_png.convert('RGB')
                im2 = im_webp.convert('RGB')
                if im1.size != im2.size:
                    im2 = im2.resize(im1.size)
                im1_small = im1.resize((100, 100))
                im2_small = im2.resize((100, 100))
                arr1 = np.array(im1_small, dtype=float)
                arr2 = np.array(im2_small, dtype=float)
                diff_val = float(np.mean((arr1 - arr2) ** 2))
                is_same_content = bool(diff_val < 25.0) # threshold for compressed webp vs png
        except Exception as e:
            res_match = False
            is_same_content = False

        pair_analysis.append({
            'base': base,
            'png_path': png_path,
            'png_size': int(png_size),
            'png_ref': bool(png_ref),
            'png_dim': png_dim,
            'webp_path': webp_path,
            'webp_size': int(webp_size),
            'webp_ref': bool(webp_ref),
            'webp_dim': webp_dim,
            'res_match': bool(res_match),
            'is_same_content': bool(is_same_content),
            'diff': diff_val
        })

print(f"Pair analysis completed. Sample pair comparison:")
for p in pair_analysis[:5]:
    print(f"  {p['base']}: same_content={p['is_same_content']}, png_ref={p['png_ref']}, webp_ref={p['webp_ref']}, sizes: png={p['png_size']}B, webp={p['webp_size']}B")

# Save raw analysis to scratch json
output_summary = {
    'total_images': len(all_images),
    'referenced_count': len(referenced_images),
    'corrupted': corrupted_images,
    'oversized': oversized_images,
    'duplicate_hash_groups': duplicate_hash_groups,
    'pairs_count': len(pairs),
    'pair_analysis': pair_analysis
}

with open('scratch/image_analysis_summary.json', 'w', encoding='utf-8') as f:
    json.dump(output_summary, f, ensure_ascii=False, indent=2)

print("\nSaved image analysis summary to scratch/image_analysis_summary.json")
