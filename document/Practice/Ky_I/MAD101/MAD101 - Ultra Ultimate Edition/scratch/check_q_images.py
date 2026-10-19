import re
import json

with open('questions_data.js', 'r', encoding='utf-8') as f:
    text = f.read()

# Parse questions
# Find each question object
items = re.findall(r'\{\s*"id":\s*(\d+),\s*"image":\s*"([^"]+)",\s*"answer":\s*(\[[^\]]*\]),\s*"answerText":\s*"([^"]*)",\s*"chapter":\s*(\d+)\s*\}', text)
print(f"Total parsed questions in questions_data.js: {len(items)}")

webp_questions = []
png_questions = []

for qid, img, ans, anstxt, ch in items:
    if img.lower().endswith('.webp'):
        webp_questions.append((qid, img, ch))
    else:
        png_questions.append((qid, img, ch))

print(f"Count of webp questions: {len(webp_questions)}")
print(f"Sample webp questions: {webp_questions[:10]}")
print(f"Count of png questions: {len(png_questions)}")
