import json

with open('scratch/batch_015_ocr.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

def examine(qid):
    print(f"==================== QUESTION {qid} ====================")
    item = data.get(str(qid), {})
    lines = item.get('lines', [])
    for l in lines:
        print(f"  [{l['confidence']:.2f}] {l['text']}")

for q in [561, 563, 564, 568, 572, 573, 575, 576, 577, 578, 579, 580, 583, 585, 586, 587, 591, 595, 596, 597, 598]:
    examine(q)
