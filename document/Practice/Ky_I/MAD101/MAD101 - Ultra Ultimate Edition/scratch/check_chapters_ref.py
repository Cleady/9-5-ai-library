import os

matched = []
for root, dirs, files in os.walk('.'):
    if any(k in root for k in ['node_modules', '.git', '.system_generated', 'scratch']):
        continue
    for f in files:
        if f.endswith(('.html', '.js', '.json', '.css', '.py', '.md')):
            path = os.path.join(root, f)
            try:
                with open(path, 'r', encoding='utf-8', errors='ignore') as fp:
                    cnt = fp.read()
                    if 'chapters/' in cnt or 'chapters\\' in cnt:
                        matched.append(path)
            except Exception:
                pass

print(f"Files referencing 'chapters/': {len(matched)}")
for m in matched:
    print(" ", m)
