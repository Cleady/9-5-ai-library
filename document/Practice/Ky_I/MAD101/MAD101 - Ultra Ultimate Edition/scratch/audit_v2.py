import json
import re

# 1. Load V2 file directly
with open('data/v2/questions_sample_v2.json', 'r', encoding='utf-8') as f:
    v2_direct = json.load(f)

# 2. Simulate app.bundle.js runtime data (1131 questions)
with open('questions_data.js', 'r', encoding='utf-8') as f:
    q_data_text = f.read()

# Parse questions_data.js
# const ALL_QUESTIONS = [...]
m = re.search(r'const ALL_QUESTIONS\s*=\s*(\[[\s\S]*?\]);', q_data_text)
if not m:
    # try var or let
    m = re.search(r'(\[[\s\S]*?\]);', q_data_text)
raw_questions = json.loads(m.group(1))

# Replicate the exact app.bundle.js logic (lines 260-301)
questions_map = {}
for q in v2_direct:
    questions_map[q['id']] = dict(q)

for raw_q in raw_questions:
    qid = raw_q['id']
    if qid not in questions_map:
        ans_letter = 'A'
        if isinstance(raw_q.get('answer'), list) and len(raw_q['answer']) > 0:
            ans_letter = raw_q['answer'][0]
        elif isinstance(raw_q.get('answer'), str):
            ans_letter = raw_q['answer']
        
        questions_map[qid] = {
            'id': qid,
            'chapterId': raw_q.get('chapter', 0),
            'chapterName': f"Chương {raw_q.get('chapter', 0)}",
            'chapterShort': f"Chương {raw_q.get('chapter', 0)}",
            'type': "single_choice",
            'question': f"Câu hỏi số {qid} (Toán rời rạc MAD101). Hãy đối chiếu ảnh câu hỏi bên dưới và chọn phương án chính xác.",
            'options': ["Phương án A", "Phương án B", "Phương án C", "Phương án D"],
            'answer': ans_letter,
            'answer_status': "verified",
            'explanation': [
                f"**Đáp án chính thức:** {raw_q.get('answerText', ans_letter)}.",
                "Đối chiếu trực tiếp với tài liệu đề thi Toán rời rạc MAD101."
            ],
            'image': raw_q.get('image', '0001_q001_Question_1.png'),
            'code': None,
            'needs_image': True,
            'confidence': "high"
        }

runtime_questions = list(questions_map.values())
runtime_questions.sort(key=lambda x: x['id'])

print("=== STATS AUDIT ===")
print(f"Total questions in v2 direct file (questions_sample_v2.json): {len(v2_direct)}")
print(f"Total questions in app runtime (app.bundle.js): {len(runtime_questions)}")

# Criteria check:
# placeholder question: contains "đối chiếu ảnh", "chọn phương án chính xác", or stripped length < 25
def is_placeholder_q(q_text):
    if not q_text:
        return True
    if any(k in q_text.lower() for k in ["đối chiếu ảnh", "chọn phương án chính xác"]):
        return True
    # Strip question number e.g. "Câu hỏi số 123"
    cleaned = re.sub(r'câu hỏi số\s*\d+', '', q_text, flags=re.I).strip()
    return len(cleaned) < 25

def is_placeholder_options(options):
    if not options or len(options) < 2:
        return True
    pattern = re.compile(r'^(phương án|option|đáp án)?\s*[a-z0-9]\.?$', re.I)
    return any(pattern.match(opt.strip()) for opt in options if isinstance(opt, str))

def is_placeholder_explanation(exp):
    if not exp or len(exp) == 0:
        return True
    # Check if only generic placeholder
    exp_text = " ".join(exp) if isinstance(exp, list) else str(exp)
    if any(k in exp_text.lower() for k in ["đối chiếu trực tiếp với tài liệu đề thi"]):
        return True
    return len(exp) < 2

# Check on v2_direct:
print("\n--- ON v2_direct (8 câu đã gõ thủ công v2) ---")
q_ph_direct = [q for q in v2_direct if is_placeholder_q(q.get('question', ''))]
opt_ph_direct = [q for q in v2_direct if is_placeholder_options(q.get('options', []))]
exp_ph_direct = [q for q in v2_direct if is_placeholder_explanation(q.get('explanation', []))]
verified_direct = [q for q in v2_direct if q.get('answer_status') == 'verified']
print(f"Placeholder question: {len(q_ph_direct)}")
print(f"Placeholder options: {len(opt_ph_direct)}")
print(f"Placeholder explanation: {len(exp_ph_direct)}")
print(f"answer_status='verified': {len(verified_direct)}")

# Check on runtime_questions (all 1131 questions):
print("\n--- ON ALL 1,131 QUESTIONS (runtime app.bundle.js) ---")
total_q = len(runtime_questions)
q_ph = [q for q in runtime_questions if is_placeholder_q(q.get('question', ''))]
opt_ph = [q for q in runtime_questions if is_placeholder_options(q.get('options', []))]
exp_ph = [q for q in runtime_questions if is_placeholder_explanation(q.get('explanation', []))]
verified_all = [q for q in runtime_questions if q.get('answer_status') == 'verified']
verified_fake = [q for q in verified_all if is_placeholder_q(q.get('question', '')) or is_placeholder_options(q.get('options', []))]

print(f"Total: {total_q}")
print(f"Question placeholder: {len(q_ph)}")
print(f"Options placeholder: {len(opt_ph)}")
print(f"Explanation placeholder: {len(exp_ph)}")
print(f"answer_status='verified': {len(verified_all)}")
print(f"False 'verified' on placeholder (nhãn sai): {len(verified_fake)}")

# Sample 5 questions including 355
sample_ids = [355, 12, 193, 423, 789]
samples = [q for q in runtime_questions if q['id'] in sample_ids]

print("\n--- 5 SAMPLE QUESTIONS ---")
for s in samples:
    print(f"\nID: {s['id']}")
    print(f"Question: {s['question']}")
    print(f"Options: {s['options']}")
    print(f"Answer: {s['answer']}")
    print(f"Explanation: {s['explanation']}")
    print(f"Answer Status: {s['answer_status']}")
    print(f"Needs Image: {s['needs_image']}")
