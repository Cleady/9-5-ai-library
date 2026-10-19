import json

# Update v2/questions_sample_v2.json
with open('v2/questions_sample_v2.json', 'r', encoding='utf-8') as f:
    sample_questions = json.load(f)

for q in sample_questions:
    q['answer_status'] = 'uncertain'
    q['confidence'] = 'medium'
    if 'review_flags' not in q:
        q['review_flags'] = []
    if 'chưa kiểm chứng bằng code theo lô' not in q['review_flags']:
        q['review_flags'].append('chưa kiểm chứng bằng code theo lô')

with open('v2/questions_sample_v2.json', 'w', encoding='utf-8') as f:
    json.dump(sample_questions, f, ensure_ascii=False, indent=2)

# Update v2/questions_v2.js
v2_js_content = f"var V2_QUESTIONS = {json.dumps(sample_questions, ensure_ascii=False, indent=2)};\n"
with open('v2/questions_v2.js', 'w', encoding='utf-8') as f:
    f.write(v2_js_content)

# Update data/v2/questions_v2.js
with open('data/v2/questions_v2.js', 'w', encoding='utf-8') as f:
    f.write(v2_js_content)

print("Updated 8 sample questions to answer_status='uncertain' in v2 and data/v2.")
