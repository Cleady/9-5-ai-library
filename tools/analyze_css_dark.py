import glob, re

css_files = sorted([p.replace('\\', '/') for p in glob.glob('css/*.css')])

print('=== B. THỐNG KÊ RULE html[data-theme="dark"] TRONG TỪNG FILE CSS ===\n')

total_dark_rules = 0
for c in css_files:
    with open(c, encoding='utf-8') as f:
        text = f.read()
    
    # Strip comments to avoid false matches
    clean_text = re.sub(r'/\*.*?\*/', '', text, flags=re.S)
    
    # Find all selectors targeting html[data-theme="dark"]
    # We look for blocks or selectors starting with html[data-theme="dark"] or [data-theme="dark"]
    matches = re.findall(r'(html\[data-theme=[\'"]dark[\'"]\][^{]*)\{', clean_text)
    
    # Also find if there are @media (prefers-color-scheme: dark)
    media_dark = re.findall(r'@media\s*\(\s*prefers-color-scheme\s*:\s*dark\s*\)', clean_text)
    
    # Analyze coverage
    # Look at what selectors exist in dark
    dark_selectors = [m.strip().replace('\n', ' ') for m in matches]
    
    total_dark_rules += len(matches)
    print(f'### File: `{c}`')
    print(f'- Số rule dark: **{len(matches)}**')
    if media_dark:
        print(f'- Media query dark: {len(media_dark)}')
    
    if len(matches) == 0:
        print('- **Hiện trạng:** CHƯA CÓ BẤT KỲ RULE DARK NÀO (0% dark).')
    else:
        print(f'- **Các selector dark tiêu biểu:**')
        for s in dark_selectors[:8]:
            print(f'  * `{s[:80]}`')
        if len(dark_selectors) > 8:
            print(f'  * ... và {len(dark_selectors) - 8} selector khác.')
    print()

print(f'**TỔNG CỘNG RULE DARK TRONG CSS TOÀN DỰ ÁN: {total_dark_rules}**')
