import os
import hashlib
import json
import re
from PIL import Image

PROJECT_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
ASSETS_DIR = os.path.join(PROJECT_ROOT, 'assets', 'questions')

image_extensions = {'.png', '.jpg', '.jpeg', '.webp', '.gif', '.svg', '.bmp'}

# 1. Collect all images in project (excluding node_modules, .git, .gemini)
all_images = []
for root, dirs, files in os.walk(PROJECT_ROOT):
    if any(p in root for p in ['node_modules', '.git', '.gemini', '_cleanup_quarantine']):
        continue
    for f in files:
        ext = os.path.splitext(f)[1].lower()
        if ext in image_extensions:
            full_path = os.path.join(root, f)
            rel_path = os.path.relpath(full_path, PROJECT_ROOT).replace('\\', '/')
            all_images.append({
                'filename': f,
                'full_path': full_path,
                'rel_path': rel_path,
                'size_bytes': os.path.getsize(full_path)
            })

print(f"Total image files scanned: {len(all_images)}")

# 2. Compute SHA-256 and test image integrity
hash_map = {}
corrupted_images = []
zero_byte_images = []

for img in all_images:
    size = img['size_bytes']
    if size == 0:
        zero_byte_images.append(img['rel_path'])
        continue

    # Hash
    hasher = hashlib.sha256()
    with open(img['full_path'], 'rb') as f:
        while chunk := f.read(65536):
            hasher.update(chunk)
    file_hash = hasher.hexdigest()
    img['sha256'] = file_hash

    if file_hash not in hash_map:
        hash_map[file_hash] = []
    hash_map[file_hash].append(img)

    # Test open
    try:
        with Image.open(img['full_path']) as pil_img:
            img['width'], img['height'] = pil_img.size
            img['format'] = pil_img.format
    except Exception as e:
        corrupted_images.append({'path': img['rel_path'], 'error': str(e)})

# Find hash duplicates
hash_duplicates = {h: imgs for h, imgs in hash_map.items() if len(imgs) > 1}
print(f"Unique image hashes: {len(hash_map)}")
print(f"Duplicate hash groups: {len(hash_duplicates)}")
print(f"Corrupted images: {len(corrupted_images)}")
print(f"Zero byte images: {len(zero_byte_images)}")

# 3. Check text references in codebase (HTML, CSS, JS, JSON, webmanifest)
text_files = []
for root, dirs, files in os.walk(PROJECT_ROOT):
    if any(p in root for p in ['node_modules', '.git', '.gemini', '_cleanup_quarantine']):
        continue
    for f in files:
        ext = os.path.splitext(f)[1].lower()
        if ext in {'.html', '.css', '.js', '.json', '.webmanifest', '.md'}:
            full_path = os.path.join(root, f)
            text_files.append(full_path)

codebase_text = ""
for tf in text_files:
    try:
        with open(tf, 'r', encoding='utf-8', errors='ignore') as f:
            codebase_text += " " + f.read()
    except:
        pass

for img in all_images:
    fn = img['filename']
    fn_no_ext = os.path.splitext(fn)[0]
    # Check direct reference in text
    img['referenced_in_code'] = (fn in codebase_text) or (fn_no_ext in codebase_text)

# Check specifically in questions.js / classified_data.json
with open(os.path.join(PROJECT_ROOT, 'data', 'questions.js'), 'r', encoding='utf-8') as f:
    questions_js_content = f.read()

for img in all_images:
    img['used_in_questions_js'] = img['filename'] in questions_js_content

# 4. Check for .png and .webp pairs for the same ID
id_pattern = re.compile(r'(\d+)_q(\d+)_Question_(\d+)')
png_webp_pairs = {}

for img in all_images:
    fn = img['filename']
    match = id_pattern.match(fn)
    if match:
        qid = int(match.group(2))
        ext = os.path.splitext(fn)[1].lower()
        if qid not in png_webp_pairs:
            png_webp_pairs[qid] = {}
        png_webp_pairs[qid][ext] = img

conflicting_pairs = {qid: pair for qid, pair in png_webp_pairs.items() if len(pair) > 1}
print(f"Questions having both .png and .webp: {list(conflicting_pairs.keys())}")

# 5. Oversized images (e.g. > 100 KB)
oversized_images = [img for img in all_images if img['size_bytes'] > 100 * 1024]
oversized_images.sort(key=lambda x: x['size_bytes'], reverse=True)
print(f"Oversized images (>100KB): {len(oversized_images)}")

# Save comprehensive audit JSON
output_data = {
    'total_images': len(all_images),
    'duplicate_hash_groups_count': len(hash_duplicates),
    'duplicate_hash_groups': [
        [{'filename': i['filename'], 'size': i['size_bytes'], 'ref': i['used_in_questions_js']} for i in grp]
        for grp in hash_duplicates.values()
    ],
    'corrupted_images': corrupted_images,
    'zero_byte_images': zero_byte_images,
    'png_webp_pairs': {
        qid: {ext: {'filename': img['filename'], 'size': img['size_bytes'], 'used_in_qjs': img['used_in_questions_js']}
              for ext, img in pair.items()}
        for qid, pair in conflicting_pairs.items()
    },
    'oversized_count': len(oversized_images),
    'top_oversized': [
        {'filename': i['filename'], 'size_kb': round(i['size_bytes'] / 1024, 2)}
        for i in oversized_images[:10]
    ],
    'unreferenced_images': [
        {'filename': i['filename'], 'rel_path': i['rel_path'], 'size_bytes': i['size_bytes']}
        for i in all_images if not i['used_in_questions_js']
    ]
}

with open(os.path.join(PROJECT_ROOT, 'data', 'v2', 'image_audit.json'), 'w', encoding='utf-8') as f:
    json.dump(output_data, f, indent=2, ensure_ascii=False)

print("Saved image audit to data/v2/image_audit.json")
