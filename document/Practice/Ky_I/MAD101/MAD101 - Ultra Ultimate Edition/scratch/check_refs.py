import json
import re

with open('questions_data.js', 'r', encoding='utf-8') as f:
    text_v1 = f.read()

with open('data/v2/questions_v2.js', 'r', encoding='utf-8') as f:
    text_v2 = f.read()

v1_imgs = set(re.findall(r'["\']([^"\']+\.(?:png|webp|jpg|jpeg))["\']', text_v1, re.I))
v2_imgs = set(re.findall(r'["\']([^"\']+\.(?:png|webp|jpg|jpeg))["\']', text_v2, re.I))

print(f"v1 unique image refs: {len(v1_imgs)}")
print(f"Sample v1 image refs: {list(v1_imgs)[:5]}")
print(f"v2 unique image refs: {len(v2_imgs)}")
print(f"Sample v2 image refs: {list(v2_imgs)[:5]}")

# Check if refs have 'chapters/' prefix or just root filename
v1_has_chapters = any('chapters/' in s for s in v1_imgs)
v2_has_chapters = any('chapters/' in s for s in v2_imgs)
print(f"v1 has 'chapters/': {v1_has_chapters}")
print(f"v2 has 'chapters/': {v2_has_chapters}")
