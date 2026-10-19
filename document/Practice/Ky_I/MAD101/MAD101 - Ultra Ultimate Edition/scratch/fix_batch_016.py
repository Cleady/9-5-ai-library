import json

with open("v2/questions_sample_v2.json", "r", encoding="utf-8") as f:
    questions = json.load(f)

for q in questions:
    if q["id"] == 618:
        q["explanation"] = [
            "Bước 1: Phân tích các liên từ logic trong câu phát biểu:",
            "- \"Bạn đạt điểm trên 5\": \\(q\\)",
            "- \"và nộp bài tập đúng hạn\": liên từ \"và\" là hội \\(\\land r\\)",
            "- \"nhưng bạn không vượt qua\": trong logic mệnh đề, từ \"nhưng\" tương đương logic với liên từ hội \"và\", phủ định của vượt qua là \\(\\neg p\\).",
            "Bước 2: Kết hợp cả ba thành phần bằng phép hội: \\(q \\land r \\land \\neg p\\). Khẳng định này là (i), tương ứng với lựa chọn C."
        ]
    elif q["id"] == 622:
        q["explanation"] = [
            "Bước 1: Biến đổi phép kéo theo về phép tuyển:",
            "\\[ p \\to q \\equiv \\neg p \\lor q \\quad \\text{và} \\quad \\neg p \\to q \\equiv p \\lor q \\]",
            "Bước 2: Áp dụng luật phân phối ngược:",
            "\\[ (\\neg p \\lor q) \\land (p \\lor q) \\equiv (\\neg p \\land p) \\lor q \\equiv \\mathbf{F} \\lor q \\equiv q \\]",
            "Khẳng định (i) là \\(q\\), tương ứng với lựa chọn D."
        ]

with open("v2/questions_sample_v2.json", "w", encoding="utf-8") as f:
    json.dump(questions, f, indent=2, ensure_ascii=False)

with open("v2/questions_v2.js", "w", encoding="utf-8") as f:
    f.write("// Auto-generated from v2/questions_sample_v2.json\n")
    f.write("export const sampleQuestionsV2 = ")
    json.dump(questions, f, indent=2, ensure_ascii=False)
    f.write(";\n")

print("Fixed Q618 and Q622 explanations.")
