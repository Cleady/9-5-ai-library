import json
import re

with open('questions_data.js', 'r', encoding='utf-8') as f:
    text = f.read()

m = re.search(r'0193[^\n]+', text)
if m:
    print("Found 0193 in questions_data.js:", m.group(0))

m2 = re.search(r'0001[^\n]+', text)
if m2:
    print("Found 0001 in questions_data.js:", m2.group(0))

# Find all webp references in questions_data.js
webp_refs = re.findall(r'["\']([^"\']+\.webp)["\']', text, re.I)
print(f"Total webp refs in questions_data.js: {len(webp_refs)}")
print("Sample webp refs in questions_data.js:", webp_refs[:10])

# Find all png references in questions_data.js
png_refs = re.findall(r'["\']([^"\']+\.png)["\']', text, re.I)
print(f"Total png refs in questions_data.js: {len(png_refs)}")
