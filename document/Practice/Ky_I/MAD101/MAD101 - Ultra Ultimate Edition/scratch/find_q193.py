import json
import re

with open('questions_data.js', 'r', encoding='utf-8') as f:
    text = f.read()

# find question with id 193
pattern = r'\{\s*"id":\s*193,[^}]+\}'
m = re.search(pattern, text)
if m:
    print(m.group(0))
else:
    # search for 193
    lines = [l for l in text.split('\n') if '193' in l]
    print("Lines with 193:", lines[:5])
