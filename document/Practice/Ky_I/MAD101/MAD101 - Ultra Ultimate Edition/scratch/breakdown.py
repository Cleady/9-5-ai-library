import json
import os

with open('scratch/comprehensive_image_analysis.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

file_info = data['file_info']
dup_redundant = data['dup_redundant']

# 1. Agent-generated images
agent_images = []
for p, info in file_info.items():
    if any(k in p.lower() for k in ['ui-preview', 'scratch', 'test', 'preview', 'screenshot']):
        agent_images.append(p)

print(f"Agent/Preview/Scratch images: {len(agent_images)}")
for a in agent_images:
    print(f"  {a} ({file_info[a]['size']} B)")

# 2. Corrupted / 0-byte
corrupted = []
for p, info in file_info.items():
    if info['is_corrupt'] or info['size'] == 0:
        corrupted.append(p)
print(f"Corrupted / 0-byte images: {len(corrupted)}")

# 3. Oversized (> 300 KB)
oversized = []
for p, info in file_info.items():
    if info['size'] > 300 * 1024:
        oversized.append((p, info['size']))
print(f"Oversized images (>300KB): {len(oversized)}")
for o, sz in oversized:
    print(f"  {o} ({sz / 1024:.1f} KB)")

# 4. Duplicate Hash:
# Total duplicate groups = 1131
# Total redundant files from exact hash duplicate groups:
redundant_files = []
total_dup_reclaim = 0
for d in dup_redundant:
    for r in d['redundant']:
        redundant_files.append((r, d['keeper'], file_info[r]['size']))
        total_dup_reclaim += file_info[r]['size']

print(f"Total duplicate redundant files: {len(redundant_files)}")
print(f"Total duplicate reclaimable size: {total_dup_reclaim / (1024*1024):.2f} MB")

# Check where redundant files are:
red_dirs = {}
for r, k, sz in redundant_files:
    d = os.path.dirname(r)
    red_dirs[d] = red_dirs.get(d, 0) + 1
print("Redundant duplicate files by directory:")
for d, c in red_dirs.items():
    print(f"  {d}: {c} files")

# 5. Question image pairs (.png vs .webp)
# Check how many are referenced vs unreferenced
with open('scratch/image_analysis_summary.json', 'r', encoding='utf-8') as f:
    summary_pairs = json.load(f)['pair_analysis']

print(f"\nPairs of .png and .webp analyzed: {len(summary_pairs)}")
same_content_count = sum(1 for p in summary_pairs if p['is_same_content'])
diff_content_count = sum(1 for p in summary_pairs if not p['is_same_content'])
print(f"  Same visual content (converted copy): {same_content_count}")
print(f"  Different visual content (different questions / sub-figures): {diff_content_count}")

# 6. Unreferenced images (excluding the exact duplicates already counted)
unreferenced_other = []
for p, info in file_info.items():
    if not info['is_referenced']:
        # is it one of the redundant duplicates?
        is_in_dup_redundant = any(p == r for r, k, sz in redundant_files)
        if not is_in_dup_redundant:
            unreferenced_other.append(p)

print(f"\nOther unreferenced images (not duplicate): {len(unreferenced_other)}")
for u in unreferenced_other[:20]:
    print(f"  {u} ({file_info[u]['size']} B)")
