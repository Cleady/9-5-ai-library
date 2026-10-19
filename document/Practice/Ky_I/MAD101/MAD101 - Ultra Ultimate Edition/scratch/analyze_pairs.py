import json
import os
import re

with open('scratch/comprehensive_image_analysis.json', 'r', encoding='utf-8') as f:
    full_data = json.load(f)

file_info = full_data['file_info']

with open('questions_data.js', 'r', encoding='utf-8') as f:
    v1_text = f.read()

# Load all 105 pairs
q_pattern = re.compile(r'^(\d{4}_q\d+_Question_\d+)\.(png|webp)$', re.I)
pairs_by_base = {}
for img, info in file_info.items():
    b = info['base_name']
    m = q_pattern.match(b)
    if m:
        base = m.group(1)
        ext = m.group(2).lower()
        if base not in pairs_by_base:
            pairs_by_base[base] = {}
        pairs_by_base[base][ext] = img

pairs = {k: v for k, v in pairs_by_base.items() if 'png' in v and 'webp' in v}

detailed_pairs = []
for base, v in sorted(pairs.items()):
    png_path = v['png']
    webp_path = v['webp']
    png_base = os.path.basename(png_path)
    webp_base = os.path.basename(webp_path)
    
    png_in_v1 = png_base in v1_text
    webp_in_v1 = webp_base in v1_text
    
    detailed_pairs.append({
        'base': base,
        'png_path': png_path,
        'webp_path': webp_path,
        'png_size': file_info[png_path]['size'],
        'webp_size': file_info[webp_path]['size'],
        'png_in_v1': png_in_v1,
        'webp_in_v1': webp_in_v1
    })

print(f"Total pairs: {len(detailed_pairs)}")
png_in_v1_count = sum(1 for p in detailed_pairs if p['png_in_v1'])
webp_in_v1_count = sum(1 for p in detailed_pairs if p['webp_in_v1'])
both_in_v1 = sum(1 for p in detailed_pairs if p['png_in_v1'] and p['webp_in_v1'])
neither_in_v1 = sum(1 for p in detailed_pairs if not p['png_in_v1'] and not p['webp_in_v1'])

print(f"PNG in questions_data.js: {png_in_v1_count}")
print(f"WEBP in questions_data.js: {webp_in_v1_count}")
print(f"Both in questions_data.js: {both_in_v1}")
print(f"Neither in questions_data.js: {neither_in_v1}")

# Sample pairs where neither is in v1 or only one is in v1
print("\nSample neither in v1:")
for p in [p for p in detailed_pairs if not p['png_in_v1'] and not p['webp_in_v1']][:5]:
    print(p)

print("\nSample png in v1, webp not:")
for p in [p for p in detailed_pairs if p['png_in_v1'] and not p['webp_in_v1']][:5]:
    print(p)

print("\nSample webp in v1, png not:")
for p in [p for p in detailed_pairs if p['webp_in_v1'] and not p['png_in_v1']][:5]:
    print(p)

with open('scratch/detailed_pairs.json', 'w', encoding='utf-8') as f:
    json.dump(detailed_pairs, f, ensure_ascii=False, indent=2)
