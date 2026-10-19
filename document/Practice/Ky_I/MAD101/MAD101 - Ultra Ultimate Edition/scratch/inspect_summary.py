import json
import os

with open('scratch/image_analysis_summary.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

print('Total images:', data['total_images'])
print('Referenced count:', data['referenced_count'])
print('Corrupted images:', len(data['corrupted']))
print('Oversized images (>300KB):', len(data['oversized']))
print('Duplicate hash groups:', len(data['duplicate_hash_groups']))
print('Pairs count:', data['pairs_count'])

print('\n--- PAIR ANALYSIS SAMPLE ---')
for p in data['pair_analysis'][:10]:
    print(f"{p['base']}: png_dim={p['png_dim']}, webp_dim={p['webp_dim']}, diff={p['diff']}, png_size={p['png_size']}, webp_size={p['webp_size']}")

print('\n--- DUPLICATE HASH GROUPS SAMPLE ---')
dup_folders = {}
for h, g in list(data['duplicate_hash_groups'].items())[:10]:
    print(h[:8], g)

for h, g in data['duplicate_hash_groups'].items():
    folders = tuple(sorted(set([os.path.dirname(p) for p in g])))
    dup_folders[folders] = dup_folders.get(folders, 0) + 1

print('\n--- DUPLICATE GROUPS BY FOLDER PAIRS ---')
for k, v in dup_folders.items():
    print(f"{k}: {v} groups")
