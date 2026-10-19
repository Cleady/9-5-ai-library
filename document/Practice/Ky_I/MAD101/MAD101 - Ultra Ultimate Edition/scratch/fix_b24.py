with open('v2/build_batch_024.py', 'r', encoding='utf-8') as f:
    code = f.read()

# Add 'answer_status': 'verified', right after 'answer':
for ans in ['A', 'B', 'C', 'D', 'E', 'F']:
    old_str = f'"answer": "{ans}",'
    new_str = f'"answer": "{ans}",\n        "answer_status": "verified",'
    code = code.replace(old_str, new_str)

with open('v2/build_batch_024.py', 'w', encoding='utf-8') as f:
    f.write(code)

print("Updated build_batch_024.py with answer_status successfully.")
