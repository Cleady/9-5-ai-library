import json

with open('scratch/batch_012_ocr.json', 'r', encoding='utf-8') as f:
    ocr_data = json.load(f)

with open('answers.json', 'r', encoding='utf-8') as f:
    answers_list = json.load(f)
ans_map = {item['question']: item['answer'] for item in answers_list}

for qid in range(441, 481):
    sq = str(qid)
    lines = [item['text'] for item in ocr_data[sq]['lines']]
    print(f"==================== Q{qid} (Answer: {ans_map.get(qid)}) ====================")
    for l in lines:
        print("  ", l)
