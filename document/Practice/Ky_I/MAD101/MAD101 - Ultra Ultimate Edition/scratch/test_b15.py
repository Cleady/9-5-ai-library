import json

with open('answers.json', 'r', encoding='utf-8') as f:
    ans = json.load(f)

for item in ans[560:600]:
    print(f"{item['question']}: {item['answer']} -> {item['image_file']}")
