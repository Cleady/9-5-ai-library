import os
import glob
import hashlib
import json
import re
from PIL import Image

def get_hash(path):
    h = hashlib.sha256()
    with open(path, 'rb') as f:
        while chunk := f.read(65536):
            h.update(chunk)
    return h.hexdigest()

# 1. Gather all image files
EXTS = ('.png', '.jpg', '.jpeg', '.webp', '.gif', '.svg', '.bmp')
all_images = []
for root, dirs, files in os.walk('.'):
    # Skip node_modules, .git, .system_generated, _cleanup_quarantine
    if any(skip in root for skip in ['node_modules', '.git', '.system_generated', '_cleanup_quarantine']):
        continue
    for file in files:
        if file.lower().endswith(EXTS):
            rel_path = os.path.normpath(os.path.join(root, file)).replace('\\', '/')
            all_images.append(rel_path)

print(f"Total image files found: {len(all_images)}")

# 2. Check all references in project files
ref_sources = []
for root, dirs, files in os.walk('.'):
    if any(skip in root for skip in ['node_modules', '.git', '.system_generated', '_cleanup_quarantine', 'scratch']):
        continue
    for file in files:
        if file.lower().endswith(('.html', '.css', '.js', '.json', '.webmanifest', '.md')):
            ref_sources.append(os.path.normpath(os.path.join(root, file)).replace('\\', '/'))

print(f"Scanning references in {len(ref_sources)} project files...")
all_file_contents = {}
for p in ref_sources:
    try:
        with open(p, 'r', encoding='utf-8', errors='ignore') as f:
            all_file_contents[p] = f.read()
    except Exception as e:
        pass

# 3. Hash map & duplicates
hash_map = {} # hash -> list of paths
file_info = {}

for img in all_images:
    sz = os.path.getsize(img)
    try:
        sh = get_hash(img)
    except Exception as e:
        sh = None
    
    # Is corrupted?
    is_corrupt = False
    try:
        with Image.open(img) as im:
            im.verify()
    except Exception:
        if not img.lower().endswith('.svg'):
            is_corrupt = True

    # Check references
    base_name = os.path.basename(img)
    name_no_ext = os.path.splitext(base_name)[0]
    
    # Direct reference in any content
    is_referenced = False
    ref_locations = []
    for src_path, content in all_file_contents.items():
        if base_name in content or img in content:
            is_referenced = True
            ref_locations.append(src_path)

    file_info[img] = {
        'path': img,
        'size': sz,
        'hash': sh,
        'is_corrupt': is_corrupt,
        'is_referenced': is_referenced,
        'ref_locations': ref_locations,
        'base_name': base_name,
        'name_no_ext': name_no_ext
    }
    
    if sh:
        if sh not in hash_map:
            hash_map[sh] = []
        hash_map[sh].append(img)

# Duplicates
duplicate_groups = {h: paths for h, paths in hash_map.items() if len(paths) > 1}
print(f"Duplicate hash groups: {len(duplicate_groups)}")

# 4. Check question image pairs (.png vs .webp)
q_pattern = re.compile(r'^(\d{4}_q\d+_Question_\d+)\.(png|webp)$', re.I)
pairs_by_base = {}
for img in all_images:
    b = os.path.basename(img)
    m = q_pattern.match(b)
    if m:
        qid = m.group(1)
        ext = m.group(2).lower()
        if qid not in pairs_by_base:
            pairs_by_base[qid] = {}
        pairs_by_base[qid][ext] = img

pairs = {k: v for k, v in pairs_by_base.items() if 'png' in v and 'webp' in v}
print(f"Total .png/.webp pairs: {len(pairs)}")

# 5. Categorize:
# Nhóm A:
#   - Agent generated / test / scratch images
#   - Corrupted / 0-byte images
#   - Duplicate hash copies that are unreferenced (e.g. duplicate identical copies)
# Nhóm B:
#   - Images not referenced but cannot determine origin or possible dynamic template
# Nhóm C (Giữ lại):
#   - Original question images and auxiliary figures (referenced or unreferenced from question bank)
#   - UI assets, icons, logos, theme images

# Let's inspect duplicate groups:
# In each duplicate group: which one to keep, which one is redundant?
dup_redundant = []
for h, paths in duplicate_groups.items():
    # Sort to determine keeper:
    # 1. Is directly referenced in questions_data.js / index.html
    # 2. Is in root folder (since questions_data.js references without folder)
    # 3. alphabetical
    def score(p):
        s = 0
        if file_info[p]['is_referenced']:
            s += 10
        if '/' not in p: # root directory
            s += 5
        return s
    
    sorted_paths = sorted(paths, key=score, reverse=True)
    keeper = sorted_paths[0]
    redundant = sorted_paths[1:]
    dup_redundant.append({
        'hash': h,
        'keeper': keeper,
        'redundant': redundant,
        'size': file_info[keeper]['size']
    })

# Write full detailed report to scratch/comprehensive_image_analysis.json
result_data = {
    'total_count': len(all_images),
    'dup_groups_count': len(duplicate_groups),
    'pairs_count': len(pairs),
    'dup_redundant': dup_redundant,
    'file_info': file_info
}

with open('scratch/comprehensive_image_analysis.json', 'w', encoding='utf-8') as f:
    json.dump(result_data, f, ensure_ascii=False, indent=2)

print("Comprehensive image analysis saved to scratch/comprehensive_image_analysis.json")
