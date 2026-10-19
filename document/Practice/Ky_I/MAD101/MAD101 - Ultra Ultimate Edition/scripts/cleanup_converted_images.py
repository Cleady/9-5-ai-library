import os
import json
import shutil

# Directory to safely store deleted images in legacy just in case
ARCHIVE_DIR = os.path.join('legacy', 'archived_converted_images')
os.makedirs(ARCHIVE_DIR, exist_ok=True)

# Load V2 converted questions
v2_file = os.path.join('data', 'v2', 'questions_sample_v2.json')
if not os.path.exists(v2_file):
    print("No V2 questions file found.")
    exit(0)

with open(v2_file, 'r', encoding='utf-8') as f:
    v2_list = json.load(f)

deleted_count = 0
for q in v2_list:
    # If question has been successfully converted to LaTeX and doesn't need image
    if not q.get('needs_image', False) and q.get('image'):
        img_name = q['image']
        
        # Check png and webp
        base_name = os.path.splitext(img_name)[0]
        candidates = [img_name, f"{base_name}.png", f"{base_name}.webp"]
        
        for cand in set(candidates):
            if os.path.exists(cand):
                # Archive first
                shutil.copy2(cand, os.path.join(ARCHIVE_DIR, cand))
                # Delete from root
                os.remove(cand)
                print(f"[Deleted] {cand} (Question {q['id']} converted to LaTeX)")
                deleted_count += 1

print(f"\nTotal converted images cleaned up: {deleted_count}")
print(f"Safety backups kept in {ARCHIVE_DIR}")
