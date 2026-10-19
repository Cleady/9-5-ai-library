import urllib.request
import urllib.parse
import re

queries = [
    '"Suppose that the temperature in the house is given by"',
    '"temperature in the house is given by" "0 <= t <= 10"',
    '"temperature in the house is given by" "hours past"',
    '"instantaneous rate of change of the temperature" "house"'
]

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}

for q in queries:
    print("=== QUERY:", q)
    url = 'https://html.duckduckgo.com/html/?q=' + urllib.parse.quote(q)
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req) as resp:
            html = resp.read().decode('utf-8', errors='ignore')
            snippets = re.findall(r'<a class="result__snippet"[^>]*>(.*?)</a>', html, re.DOTALL)
            for s in snippets[:5]:
                clean = re.sub(r'<[^<]+?>', '', s)
                print('  -', clean.strip())
    except Exception as e:
        print('  Error:', e)
