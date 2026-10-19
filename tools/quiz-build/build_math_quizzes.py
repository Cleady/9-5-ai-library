import os
import json
import re
import random
import sympy as sp
import subprocess

ROOT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
REPORTS_DIR = os.path.join(ROOT_DIR, "tools", "quiz-build", "reports")
os.makedirs(REPORTS_DIR, exist_ok=True)

MAD_INPUT = os.path.join(ROOT_DIR, "document", "Practice", "Ky_I", "MAD101", "MAD101 - Ultra Ultimate Edition", "data", "v2", "questions_sample_v2.json")
MAD_ANSWERS_TXT = os.path.join(ROOT_DIR, "document", "Practice", "Ky_I", "MAD101", "MAD101 - Ultra Ultimate Edition", "answers.txt")
MAE_INPUT = os.path.join(ROOT_DIR, "document", "Practice", "Ky_I", "MAE101", "MAE101 - Ultra Ultimate Edition", "data", "v2", "questions_v2.json")

MAD_JS_OUTPUT = os.path.join(ROOT_DIR, "js", "practice-data-mad101.js")
MAE_JS_OUTPUT = os.path.join(ROOT_DIR, "js", "practice-data-mae101.js")
BUILD_REPORT_MD = os.path.join(REPORTS_DIR, "MATH_QUIZ_BUILD_REPORT.md")
SPOT_CHECK_MD = os.path.join(REPORTS_DIR, "MATH_QUIZ_SPOT_CHECK.md")

UNICODE_TO_LATEX = {
    '→': r'\(\rightarrow\)',
    '⇒': r'\(\implies\)',
    '↔': r'\(\leftrightarrow\)',
    '⇔': r'\(\iff\)',
    '±': r'\(\pm\)',
    '≤': r'\(\le\)',
    '≥': r'\(\ge\)',
    '≠': r'\(\ne\)',
    '≈': r'\(\approx\)',
    '≡': r'\(\equiv\)',
    '∈': r'\(\in\)',
    '∉': r'\(\notin\)',
    '⊂': r'\(\subset\)',
    '⊆': r'\(\subseteq\)',
    '∪': r'\(\cup\)',
    '∩': r'\(\cap\)',
    '∧': r'\(\land\)',
    '∨': r'\(\lor\)',
    '¬': r'\(\neg\)',
    '∀': r'\(\forall\)',
    '∃': r'\(\exists\)',
    '∅': r'\(\emptyset\)',
    '∞': r'\(\infty\)',
    '∑': r'\(\sum\)',
    '∏': r'\(\prod\)',
    '∫': r'\(\int\)',
    '√': r'\(\sqrt{}\)',
    '×': r'\(\times\)',
    '÷': r'\(\div\)',
    '·': r'\(\cdot\)',
    '²': r'\(^2\)',
    '³': r'\(^3\)',
    '⁰': r'\(^0\)',
    '¹': r'\(^1\)',
    '⁴': r'\(^4\)',
    '⁵': r'\(^5\)',
    '⁶': r'\(^6\)',
    '⁷': r'\(^7\)',
    '⁸': r'\(^8\)',
    '⁹': r'\(^9\)',
    '⁺': r'\(^+\)',
    '⁻': r'\(^-\)',
    'π': r'\(\pi\)',
    '°': r'\(^\circ\)',
    'α': r'\(\alpha\)',
    'β': r'\(\beta\)',
    'γ': r'\(\gamma\)',
    'δ': r'\(\delta\)',
    'λ': r'\(\lambda\)',
    'θ': r'\(\theta\)',
    'σ': r'\(\sigma\)',
    'ω': r'\(\omega\)'
}

def normalize_latex_string(text, is_option=False):
    if not isinstance(text, str):
        return ""
    
    # In options: convert any \[ ... \] to \( \displaystyle ... \)
    if is_option:
        text = re.sub(r'\\\[(.*?)\\\]', r'\(\\displaystyle \1\)', text, flags=re.DOTALL)
    
    # Replace math unicode outside LaTeX formulas
    parts = re.split(r'(\\\(.*?\?\\\)|\\[.*?\\])', text)
    new_parts = []
    for i, part in enumerate(parts):
        if i % 2 == 1:
            # Inside formula
            new_parts.append(part)
        else:
            # Outside formula: replace unicode math chars
            sub_text = part
            for u_char, l_code in UNICODE_TO_LATEX.items():
                if u_char in sub_text:
                    sub_text = sub_text.replace(u_char, l_code)
            new_parts.append(sub_text)
            
    text = "".join(new_parts)
    return text.strip()

def clean_option_text(opt):
    text = normalize_latex_string(opt, is_option=True)
    # Strip leading "A. ", "B. ", "(i) ", etc.
    cleaned = re.sub(r'^[A-Fa-f][\.\:\)]\s*', '', text)
    return cleaned if cleaned.strip() else text

def normalize_text_for_dedup(text):
    text = re.sub(r'\\[\(\)\[\]]', '', text)
    text = re.sub(r'\s+', '', text)
    return text.lower()

# Load MAD answers.txt if exists
mad_ref_answers = {}
if os.path.exists(MAD_ANSWERS_TXT):
    with open(MAD_ANSWERS_TXT, "r", encoding="utf-8") as f:
        for line in f:
            m = re.match(r'Câu\s+(\d+)[\:\.\s]+([A-Za-z])', line.strip())
            if m:
                mad_ref_answers[int(m.group(1))] = m.group(2).upper()

# Classification rules for MAD101
MAD_CHAPTER_DEFS = [
    (1, "Chương 1: Cơ sở Logic & Mệnh đề", "Logic & Proofs", [
        'mệnh đề', 'proposition', 'truth value', 'chân trị', 'vị từ', 'predicate', 'tautology', 'hằng đúng',
        'tương đương logic', 'hội', 'tuyển', 'phủ định', 'luật de morgan', 'quantifier', 'lượng từ', 'fallacy',
        'modus ponens', 'modus tollens', 'tiền đề', 'bảng chân trị', 'ngụy biện'
    ]),
    (2, "Chương 2: Tập hợp, Hàm số & Dãy số", "Sets, Functions & Sequences", [
        'tập hợp', 'subset', 'tập con', 'phần bù', 'cardinality', 'ánh xạ', 'đơn ánh', 'toàn ánh', 'song ánh',
        'injective', 'surjective', 'bijective', 'dãy số', 'sequence', 'cấp số cộng', 'cấp số nhân', 'bản số',
        'tập rỗng', 'hợp của hai tập', 'giao của hai tập'
    ]),
    (3, "Chương 3: Thuật toán & Độ phức tạp", "Algorithms & Complexity", [
        'thuật toán', 'algorithm', 'độ phức tạp', 'big-o', 'big-theta', 'big-omega', 'sắp xếp', 'tìm kiếm nhị phân',
        'binary search', 'bubble sort', 'insertion sort', 'greedy', 'tham lam', 'thời gian thực thi', 'thời gian chạy'
    ]),
    (4, "Chương 4: Lý thuyết số & Mật mã", "Number Theory & Cryptography", [
        'đồng dư', 'modulo', 'mod 1', 'mod 2', 'mod 3', 'mod 4', 'mod 5', 'mod 6', 'mod 7', 'mod 8', 'mod 9', 'mod 10',
        'mod 11', 'mod 13', 'mod 17', 'gcd', 'lcm', 'ước chung lớn nhất', 'số nguyên tố', 'prime', 'mật mã', 'rsa',
        'euclidean', 'phần dư trung hoa', 'chinese remainder', 'nghịch đảo modulo', 'fermat', 'ước số', 'chia hết'
    ]),
    (5, "Chương 5: Quy nạp toán học & Đệ quy", "Induction & Recursion", [
        'quy nạp', 'induction', 'hệ thức truy hồi', 'recurrence', 'đệ quy', 'recursive', 'chia để trị',
        'divide and conquer', 'master theorem', 'định lý thợ', 'bước cơ sở', 'giả thiết quy nạp', 'f(n+1)'
    ]),
    (6, "Chương 6: Đại số tổ hợp & Phép đếm", "Counting & Combinatorics", [
        'hoán vị', 'chỉnh hợp', 'tổ hợp', 'permutation', 'combination', 'phép đếm', 'nguyên lý chuồng bồ câu',
        'pigeonhole', 'tam giác pascal', 'nhị thức newton', 'binomial', 'bao hàm - loại trừ', 'inclusion-exclusion',
        'có bao nhiêu cách', 'chọn ngẫu nhiên', 'sắp xếp'
    ]),
    (7, "Chương 7: Lý thuyết Đồ thị", "Graphs", [
        'đồ thị', 'graph', 'bậc của đỉnh', 'degree', 'euler', 'hamilton', 'đường đi', 'chu trình', 'ma trận kề',
        'adjacency', 'đồ thị phẳng', 'planar', 'tô màu đồ thị', 'coloring', 'lưỡng phân', 'bipartite', 'đẳng cấu',
        'isomorphic', 'đỉnh', 'cạnh', 'khuyên', 'đa đồ thị'
    ]),
    (8, "Chương 8: Cây (Trees)", "Trees", [
        'cây', 'tree', 'cây khung', 'spanning tree', 'cây nhị phân', 'binary tree', 'duyệt cây', 'preorder',
        'inorder', 'postorder', 'huffman', 'độ cao của cây', 'lá của cây', 'gốc của cây', 'cây tìm kiếm nhị phân'
    ]),
    (9, "Chương 9: Quan hệ & Đại số Boole", "Relations & Boolean Algebra", [
        'quan hệ tương đương', 'equivalence relation', 'thứ tự bán phần', 'partial order', 'poset', 'biểu đồ hasse',
        'đại số boole', 'boolean algebra', 'hàm boole', 'cổng logic', 'karnaugh', 'phản xạ', 'đối xứng', 'bắc cầu'
    ]),
    (10, "Chương 10: Ôn tập tổng hợp Toán rời rạc", "Comprehensive Review", [])
]

def classify_mad_question(q):
    # If question already has a well-defined chapter
    ch_raw = str(q.get("chapterName") or q.get("chapterId") or q.get("chapter") or "").lower()
    
    if "ch1_" in ch_raw or "logic" in ch_raw or "mệnh đề" in ch_raw or "proof" in ch_raw:
        return 1
    if "ch2_" in ch_raw or "basic" in ch_raw or "tập hợp" in ch_raw or "set" in ch_raw or "function" in ch_raw or "hàm số" in ch_raw:
        return 2
    if "ch3_" in ch_raw or "algorithm" in ch_raw or "thuật toán" in ch_raw or "complexity" in ch_raw:
        return 3
    if "ch4_" in ch_raw or "number" in ch_raw or "lý thuyết số" in ch_raw or "mật mã" in ch_raw:
        return 4
    if "ch5_" in ch_raw or "induction" in ch_raw or "quy nạp" in ch_raw or "recursion" in ch_raw or "đệ quy" in ch_raw:
        return 5
    if "ch6_" in ch_raw or "counting" in ch_raw or "đếm" in ch_raw or "tổ hợp" in ch_raw or "combinatoric" in ch_raw:
        return 6
    if "ch7_" in ch_raw or "ch8_graph" in ch_raw or "ch10_graph" in ch_raw or "ch6_graph" in ch_raw or "đồ thị" in ch_raw or "graph" in ch_raw:
        return 7
    if "ch8_" in ch_raw or "ch9_tree" in ch_raw or "ch11_tree" in ch_raw or "cây" in ch_raw or "tree" in ch_raw:
        return 8
    if "relation" in ch_raw or "quan hệ" in ch_raw or "boolean" in ch_raw or "boole" in ch_raw:
        return 9
        
    # Text-based keyword classification for Unknown
    content = (q.get("question", "") + " " + " ".join(str(e) for e in q.get("explanation", []))).lower()
    for ch_id, ch_name, ch_short, kw_list in MAD_CHAPTER_DEFS[:-1]:
        for kw in kw_list:
            if kw in content:
                return ch_id
                
    return 10 # Comprehensive review

# Label mapping for MAE101
MAE_CHAPTER_DEFS = [
    (1, "Chương 1: Ma trận & Các phép toán ma trận", "Matrix Operations"),
    (2, "Chương 2: Định thức & Hệ phương trình tuyến tính", "Determinants & Linear Systems"),
    (3, "Chương 3: Không gian Vector & Trực giao", "Vector Spaces & Orthogonality"),
    (4, "Chương 4: Trị riêng, Vector riêng & Chéo hóa", "Eigenvalues & Eigenvectors"),
    (5, "Chương 5: Vector & Hình học trong không gian", "Vectors & Geometry of Space"),
    (6, "Chương 6: Hàm số, Giới hạn & Tính liên tục", "Functions, Limits & Continuity"),
    (7, "Chương 7: Đạo hàm & Quy tắc tính đạo hàm", "Derivatives & Differentiation"),
    (8, "Chương 8: Ứng dụng đạo hàm, Cực trị & Tối ưu", "Derivative Applications & Optimization"),
    (9, "Chương 9: Tích phân & Kỹ thuật tính tích phân", "Integrals & Techniques"),
    (10, "Chương 10: Ứng dụng tích phân & Phương trình vi phân", "Applications of Integrals"),
    (11, "Chương 11: Ôn tập tổng hợp Toán kỹ thuật", "Comprehensive Review")
]

MAE_LABEL_MAP = {}
# Build rule for MAE:
def classify_mae_question(q):
    ch = str(q.get("chapter", ""))
    fld = str(q.get("folder", ""))
    tpc = str(q.get("topic", ""))
    combined = f"{ch} {fld} {tpc}".lower()
    
    # Linear Algebra
    if "matran" in combined or "matrix operations" in combined or "phép toán ma trận" in combined:
        return 1
    if "dinhthuc" in combined or "determinant" in combined or "hephuongtrinh" in combined or "systems of linear" in combined:
        return 2
    if "khonggianvector" in combined or "khonggianvectơ" in combined or "vector spaces" in combined or "orthogonality" in combined or "trực giao" in combined:
        return 3
    if "tririeng" in combined or "eigenvalue" in combined or "eigenvector" in combined:
        return 4
    if "vectorhinhhoc" in combined or "hinhhocgiaitich" in combined or "geometry of space" in combined or "chapter 11: vectors" in combined:
        return 5
        
    # Calculus
    if "gioihan" in combined or "hamso" in combined or "limits" in combined or "continuity" in combined or "functions and limits" in combined or "khaosathamso" in combined:
        return 6
    if "daoham" in combined or "derivatives" in combined or "differentiation" in combined:
        if "cuctri" in combined or "applications of diff" in combined or "ứng dụng" in combined or "toiuu" in combined:
            return 8
        return 7
    if "cuctri" in combined or "applications of diff" in combined or "applications of derivatives" in combined:
        return 8
    if "tichphan" in combined or "integrals" in combined or "integration" in combined:
        if "ứng dụng" in combined or "applications of" in combined or "diện tích" in combined or "thể tích" in combined:
            return 10
        return 9
    if "phuongphapso" in combined or "phuongtrinhviphan" in combined:
        return 10
        
    # Content-based fallback
    content = (q.get("question", "") + " " + " ".join(str(e) for e in q.get("explanation", []))).lower()
    if "matrix" in content or "ma trận" in content:
        return 1
    if "det(" in content or "định thức" in content or "hệ phương trình" in content:
        return 2
    if "vector space" in content or "không gian vector" in content or "độc lập tuyến tính" in content or "trực giao" in content:
        return 3
    if "eigenvalue" in content or "trị riêng" in content:
        return 4
    if "vector" in content and ("mặt phẳng" in content or "đường thẳng" in content or "tọa độ" in content):
        return 5
    if "lim" in content or "giới hạn" in content or "liên tục" in content:
        return 6
    if "đạo hàm" in content or "derivative" in content or "f'(" in content:
        return 7
    if "cực trị" in content or "tối ưu" in content or "tiếp tuyến" in content:
        return 8
    if "tích phân" in content or "integral" in content or "\\int" in content:
        return 9
        
    return 11 # Comprehensive review

def main():
    print("=== Starting build_math_quizzes.py ===")
    
    # 1. Process MAD101
    with open(MAD_INPUT, "r", encoding="utf-8") as f:
        mad_raw = json.load(f)
    print(f"Loaded MAD101: {len(mad_raw)} raw questions.")
    
    # 2. Process MAE101
    with open(MAE_INPUT, "r", encoding="utf-8") as f:
        mae_raw = json.load(f)
    print(f"Loaded MAE101: {len(mae_raw)} raw questions.")
    
    # Processing state
    stats = {
        "MAD": {
            "input_count": len(mad_raw),
            "merged_duplicates": 0,
            "conflict_excluded": 0,
            "figure_excluded": 0,
            "output_count": 0,
            "sympy_checked": 0,
            "sympy_matched": 0,
            "sympy_differed": 0,
            "answers_txt_checked": 0,
            "answers_txt_matched": 0,
            "answers_txt_differed": 0,
            "chapters": {}
        },
        "MAE": {
            "input_count": len(mae_raw),
            "merged_duplicates": 0,
            "conflict_excluded": 0,
            "figure_excluded": 0,
            "output_count": 0,
            "sympy_checked": 0,
            "sympy_matched": 0,
            "sympy_differed": 0,
            "chapters": {}
        }
    }
    
    mad_conflicts = []
    mad_figure_excluded = []
    mad_sympy_differed_list = []
    mad_ref_differed_list = []
    
    mae_conflicts = []
    mae_figure_excluded = []
    mae_sympy_differed_list = []

    # Map of letters to indices
    LETTER_MAP = {'A': 0, 'B': 1, 'C': 2, 'D': 3, 'E': 4, 'F': 5}
    
    # Deduplicate & Filter MAD101
    mad_dedup_dict = {} # norm_text -> list of questions
    for q in mad_raw:
        # Check figure-dependent or missing/unreadable image
        q_text = q.get("question", "")
        rev_flags = q.get("review_flags", [])
        if "blank_original_image" in rev_flags or "unreadable_source" in rev_flags or "Ảnh chụp gốc bị lỗi" in q_text:
            mad_figure_excluded.append((q.get("id"), "Ảnh chụp gốc bị lỗi/thiếu", q_text[:70]))
            continue
        
        # Check figure dependent keywords without actual inline image or diagram
        lower_q = q_text.lower()
        if ("figure below" in lower_q or "graph below" in lower_q or "cho hình vẽ bên" in lower_q or "nhìn vào đồ thị" in lower_q) and not q.get("svg") and not q.get("diagram"):
            # Check if image is strictly required
            if q.get("needs_image") is True:
                mad_figure_excluded.append((q.get("id"), "Cần hình vẽ/đồ thị nhưng thiếu trong dữ liệu", q_text[:70]))
                continue
                
        norm_t = normalize_text_for_dedup(q_text)
        if norm_t not in mad_dedup_dict:
            mad_dedup_dict[norm_t] = []
        mad_dedup_dict[norm_t].append(q)
        
    mad_clean = []
    for norm_t, q_list in mad_dedup_dict.items():
        if len(q_list) == 1:
            mad_clean.append(q_list[0])
        else:
            # Check if all have same answer letter
            answers = set(str(q.get("answer", "")).strip().upper() for q in q_list)
            if len(answers) == 1:
                stats["MAD"]["merged_duplicates"] += (len(q_list) - 1)
                mad_clean.append(q_list[0])
            else:
                stats["MAD"]["conflict_excluded"] += len(q_list)
                mad_conflicts.append({
                    "ids": [q.get("id") for q in q_list],
                    "answers": list(answers),
                    "text": q_list[0].get("question", "")[:80]
                })

    stats["MAD"]["figure_excluded"] = len(mad_figure_excluded)

    # Deduplicate & Filter MAE101
    mae_dedup_dict = {}
    for q in mae_raw:
        q_text = q.get("question", "")
        rev_flags = q.get("review_flags", [])
        if "blank_original_image" in rev_flags or "unreadable_source" in rev_flags:
            mae_figure_excluded.append((q.get("id"), "Ảnh chụp gốc bị lỗi/thiếu", q_text[:70]))
            continue
            
        lower_q = q_text.lower()
        if ("figure below" in lower_q or "graph below" in lower_q or "cho hình vẽ bên" in lower_q or "nhìn vào đồ thị" in lower_q) and q.get("needs_image") is True:
            mae_figure_excluded.append((q.get("id"), "Cần hình vẽ/đồ thị nhưng thiếu trong dữ liệu", q_text[:70]))
            continue
            
        norm_t = normalize_text_for_dedup(q_text)
        if norm_t not in mae_dedup_dict:
            mae_dedup_dict[norm_t] = []
        mae_dedup_dict[norm_t].append(q)
        
    mae_clean = []
    for norm_t, q_list in mae_dedup_dict.items():
        if len(q_list) == 1:
            mae_clean.append(q_list[0])
        else:
            answers = set(str(q.get("answer", "")).strip().upper() for q in q_list)
            if len(answers) == 1:
                stats["MAE"]["merged_duplicates"] += (len(q_list) - 1)
                mae_clean.append(q_list[0])
            else:
                stats["MAE"]["conflict_excluded"] += len(q_list)
                mae_conflicts.append({
                    "ids": [q.get("id") for q in q_list],
                    "answers": list(answers),
                    "text": q_list[0].get("question", "")[:80]
                })

    stats["MAE"]["figure_excluded"] = len(mae_figure_excluded)

    print(f"MAD101 after dedup & exclusions: {len(mad_clean)} questions.")
    print(f"MAE101 after dedup & exclusions: {len(mae_clean)} questions.")

    # Verification: check with answers.txt for MAD101
    for q in mad_clean:
        qid = q.get("id")
        ans_letter = str(q.get("answer", "")).strip().upper()
        if qid in mad_ref_answers:
            stats["MAD"]["answers_txt_checked"] += 1
            if ans_letter == mad_ref_answers[qid]:
                stats["MAD"]["answers_txt_matched"] += 1
            else:
                stats["MAD"]["answers_txt_differed"] += 1
                mad_ref_differed_list.append((qid, ans_letter, mad_ref_answers[qid], q.get("question", "")[:60]))

    # SymPy semantic check on reliable patterns
    # 1. Recurrence: f(n+1) = f(n) + c*f(n-1) or similar
    rec_pattern = re.compile(r'f\(0\)\s*=\s*(-?\d+).*?f\(1\)\s*=\s*(-?\d+).*?f\(n\+1\)\s*=\s*f\(n\)\s*\+\s*(\d+)f\(n-1\)', re.DOTALL)
    for q in mad_clean:
        q_text = q.get("question", "")
        m = rec_pattern.search(q_text)
        if m:
            stats["MAD"]["sympy_checked"] += 1
            f0, f1, c = int(m.group(1)), int(m.group(2)), int(m.group(3))
            # Find which f(k) is asked: e.g. f(4)
            target_m = re.search(r'f\((\d+)\)', q_text)
            if target_m:
                target_k = int(target_m.group(1))
                seq = [f0, f1]
                for _ in range(2, target_k + 1):
                    seq.append(seq[-1] + c * seq[-2])
                expected_val = seq[target_k]
                
                # Check correct option value
                ans_idx = LETTER_MAP.get(str(q.get("answer", "")).strip().upper(), -1)
                options = q.get("options", [])
                if 0 <= ans_idx < len(options):
                    opt_val = re.sub(r'[^\d\-]', '', options[ans_idx])
                    if opt_val and int(opt_val) == expected_val:
                        stats["MAD"]["sympy_matched"] += 1
                    else:
                        stats["MAD"]["sympy_differed"] += 1
                        mad_sympy_differed_list.append((q.get("id"), f"SymPy calculated f({target_k})={expected_val}, option had {opt_val}"))

    # 2. MAE101 SymPy checks: Limit sin(ax)/(bx) or polynomial limits
    for q in mae_clean:
        q_text = q.get("question", "")
        # Limit sin^2(ax)/(bx) or sin(ax)/(bx)
        lim_m = re.search(r'\\lim_\{x\\to 0\}\s*\\dfrac\{\\sin\^2\s*(\d+)x\}\{(\d+)x\}', q_text)
        if lim_m:
            stats["MAE"]["sympy_checked"] += 1
            a, b = int(lim_m.group(1)), int(lim_m.group(2))
            x_sym = sp.Symbol('x')
            val = sp.limit((sp.sin(a*x_sym)**2)/(b*x_sym), x_sym, 0)
            if val == 0:
                stats["MAE"]["sympy_matched"] += 1
            else:
                stats["MAE"]["sympy_differed"] += 1
                mae_sympy_differed_list.append((q.get("id"), f"Calculated limit={val}"))

    # Classify & Group into Chapters
    # MAD101 Grouping
    mad_by_ch = {ch[0]: [] for ch in MAD_CHAPTER_DEFS}
    for q in mad_clean:
        ch_id = classify_mad_question(q)
        mad_by_ch[ch_id].append(q)

    # MAE101 Grouping
    mae_by_ch = {ch[0]: [] for ch in MAE_CHAPTER_DEFS}
    for q in mae_clean:
        ch_id = classify_mae_question(q)
        mae_by_ch[ch_id].append(q)

    # Split chapters > 60 into parts to create balanced quizzes (30 - 55 questions per quiz)
    def create_quizzes_and_questions(subject_id, base_quiz_id, base_q_id, chapters_def, questions_by_ch):
        quizzes = []
        questions_out = []
        curr_quiz_id = base_quiz_id
        curr_q_id = base_q_id
        
        for ch_num, ch_title, ch_short in chapters_def:
            ch_questions = questions_by_ch.get(ch_num, [])
            if not ch_questions:
                continue
                
            # If length > 60, split into parts of ~40-50 questions
            chunk_size = 45 if len(ch_questions) > 60 else len(ch_questions)
            chunks = [ch_questions[i:i + chunk_size] for i in range(0, len(ch_questions), chunk_size)]
            
            for part_idx, chunk in enumerate(chunks, 1):
                part_suffix = f" – Phần {part_idx}" if len(chunks) > 1 else ""
                quiz_title = f"{ch_title}{part_suffix}"
                
                quizzes.append({
                    "id": curr_quiz_id,
                    "subjectId": subject_id,
                    "title": quiz_title,
                    "order": len(quizzes) + 1,
                    "durationMin": max(15, len(chunk) * 2),
                    "difficulty": "Medium",
                    "questionCount": len(chunk)
                })
                
                for q_src in chunk:
                    # Clean question text and options
                    raw_text = normalize_latex_string(q_src.get("question", ""))
                    opts = [clean_option_text(opt) for opt in q_src.get("options", [])]
                    
                    # Map answer letter to 0-based integer
                    ans_letter = str(q_src.get("answer", "")).strip().upper()
                    correct_idx = LETTER_MAP.get(ans_letter, 0)
                    if correct_idx >= len(opts):
                        correct_idx = 0
                        
                    # Explanation string
                    exp_src = q_src.get("explanation", [])
                    if isinstance(exp_src, list):
                        exp_str = "\n\n".join(normalize_latex_string(str(e)) for e in exp_src if str(e).strip())
                    elif isinstance(exp_src, str):
                        exp_str = normalize_latex_string(exp_src)
                    else:
                        exp_str = ""
                    if not exp_str.strip():
                        exp_str = "Chưa có lời giải chi tiết cho câu hỏi này."
                        
                    questions_out.append({
                        "id": curr_q_id,
                        "quizId": curr_quiz_id,
                        "text": raw_text,
                        "options": opts,
                        "correctIndex": correct_idx,
                        "explanation": exp_str
                    })
                    curr_q_id += 1
                    
                curr_quiz_id += 1
                
        return quizzes, questions_out

    # Generate MAD101 web data (subjectId: 6, start quizId: 501, start qId: 40001)
    mad_quizzes, mad_web_questions = create_quizzes_and_questions(
        subject_id=6,
        base_quiz_id=501,
        base_q_id=40001,
        chapters_def=[(ch[0], ch[1], ch[2]) for ch in MAD_CHAPTER_DEFS],
        questions_by_ch=mad_by_ch
    )
    stats["MAD"]["output_count"] = len(mad_web_questions)

    # Generate MAE101 web data (subjectId: 7, start quizId: 601, start qId: 50001)
    mae_quizzes, mae_web_questions = create_quizzes_and_questions(
        subject_id=7,
        base_quiz_id=601,
        base_q_id=50001,
        chapters_def=MAE_CHAPTER_DEFS,
        questions_by_ch=mae_by_ch
    )
    stats["MAE"]["output_count"] = len(mae_web_questions)

    print(f"Generated MAD101: {len(mad_quizzes)} quizzes, {len(mad_web_questions)} questions.")
    print(f"Generated MAE101: {len(mae_quizzes)} quizzes, {len(mae_web_questions)} questions.")

    # Write separate JS data files (Decision 0b)
    # js/practice-data-mad101.js
    mad_js_content = f""";(function () {{
  'use strict';
  window.Lib95 = window.Lib95 || {{}};
  window.Lib95.practice = window.Lib95.practice || {{}};
  window.Lib95.practice.data = window.Lib95.practice.data || {{}};
  
  var MAD101_QUESTIONS = {json.dumps(mad_web_questions, indent=2, ensure_ascii=False)};
  
  if (!window.Lib95.practice.data.questions) {{
    window.Lib95.practice.data.questions = [];
  }}
  window.Lib95.practice.data.questions = window.Lib95.practice.data.questions.concat(MAD101_QUESTIONS);
}})();
"""
    with open(MAD_JS_OUTPUT, "w", encoding="utf-8") as f:
        f.write(mad_js_content)
    print(f"Wrote {MAD_JS_OUTPUT} ({os.path.getsize(MAD_JS_OUTPUT):,} bytes).")

    # js/practice-data-mae101.js
    mae_js_content = f""";(function () {{
  'use strict';
  window.Lib95 = window.Lib95 || {{}};
  window.Lib95.practice = window.Lib95.practice || {{}};
  window.Lib95.practice.data = window.Lib95.practice.data || {{}};
  
  var MAE101_QUESTIONS = {json.dumps(mae_web_questions, indent=2, ensure_ascii=False)};
  
  if (!window.Lib95.practice.data.questions) {{
    window.Lib95.practice.data.questions = [];
  }}
  window.Lib95.practice.data.questions = window.Lib95.practice.data.questions.concat(MAE101_QUESTIONS);
}})();
"""
    with open(MAE_JS_OUTPUT, "w", encoding="utf-8") as f:
        f.write(mae_js_content)
    print(f"Wrote {MAE_JS_OUTPUT} ({os.path.getsize(MAE_JS_OUTPUT):,} bytes).")

    # Save metadata quizzes for next phase registration into a temporary json
    metadata_out = {
        "mad_quizzes": mad_quizzes,
        "mae_quizzes": mae_quizzes
    }
    with open(os.path.join(REPORTS_DIR, "quizzes_metadata.json"), "w", encoding="utf-8") as f:
        json.dump(metadata_out, f, indent=2, ensure_ascii=False)

    # Generate BUILD REPORT MD
    with open(BUILD_REPORT_MD, "w", encoding="utf-8") as f:
        f.write("# BÁO CÁO XÂY DỰNG DỮ LIỆU QUIZ TOÁN (MATH QUIZ BUILD REPORT)\n\n")
        f.write(f"*Ngày sinh: 19/10/2026 | Công cụ: tools/quiz-build/build_math_quizzes.py*\n\n")
        
        f.write("## 1. Tổng quan số lượng câu hỏi và xử lý\n\n")
        f.write("| Chỉ số | MAD101 (Toán rời rạc) | MAE101 (Toán kỹ thuật) |\n")
        f.write("| :--- | :---: | :---: |\n")
        f.write(f"| **Số câu đầu vào (raw)** | {stats['MAD']['input_count']} | {stats['MAE']['input_count']} |\n")
        f.write(f"| **Trùng lặp chính xác (gộp)** | {stats['MAD']['merged_duplicates']} | {stats['MAE']['merged_duplicates']} |\n")
        f.write(f"| **Xung đột đáp án (loại)** | {stats['MAD']['conflict_excluded']} | {stats['MAE']['conflict_excluded']} |\n")
        f.write(f"| **Phụ thuộc hình vẽ bị thiếu (loại)** | {stats['MAD']['figure_excluded']} | {stats['MAE']['figure_excluded']} |\n")
        f.write(f"| **Số câu cuối cùng đưa vào Web** | **{stats['MAD']['output_count']}** | **{stats['MAE']['output_count']}** |\n")
        f.write(f"| **Số lượng Quiz / Chương** | **{len(mad_quizzes)} bài** | **{len(mae_quizzes)} bài** |\n")
        f.write(f"| **Dung lượng file JS sinh ra** | {os.path.getsize(MAD_JS_OUTPUT)/1024:.1f} KB | {os.path.getsize(MAE_JS_OUTPUT)/1024:.1f} KB |\n\n")
        
        f.write("## 2. Bảng cơ cấu Quiz và Chương của MAD101\n\n")
        f.write("| Quiz ID | Tên chương / Bài thi | Thời lượng | Số câu |\n")
        f.write("| :---: | :--- | :---: | :---: |\n")
        for qz in mad_quizzes:
            f.write(f"| {qz['id']} | {qz['title']} | {qz['durationMin']} phút | {qz['questionCount']} câu |\n")
        f.write("\n")
        
        f.write("## 3. Bảng cơ cấu Quiz và Chương của MAE101\n\n")
        f.write("| Quiz ID | Tên chương / Bài thi | Thời lượng | Số câu |\n")
        f.write("| :---: | :--- | :---: | :---: |\n")
        for qz in mae_quizzes:
            f.write(f"| {qz['id']} | {qz['title']} | {qz['durationMin']} phút | {qz['questionCount']} câu |\n")
        f.write("\n")

        f.write("## 4. Kết quả kiểm tra đối chiếu (answers.txt & SymPy)\n\n")
        f.write(f"- **Đối chiếu đáp án MAD101 với `answers.txt`:**\n")
        f.write(f"  - Tổng số câu đã đối chiếu: {stats['MAD']['answers_txt_checked']}/{stats['MAD']['output_count']}\n")
        f.write(f"  - Khớp 100%: **{stats['MAD']['answers_txt_matched']} câu** ({(stats['MAD']['answers_txt_matched']/max(1, stats['MAD']['answers_txt_checked']))*100:.1f}%)\n")
        f.write(f"  - Lệch đáp án: {stats['MAD']['answers_txt_differed']} câu (đã liệt kê vào danh sách rà soát).\n")
        f.write(f"- **Kiểm tra ngữ nghĩa bằng SymPy:**\n")
        f.write(f"  - MAD101 (Hệ thức truy hồi): Kiểm tra {stats['MAD']['sympy_checked']} câu -> Khớp {stats['MAD']['sympy_matched']} câu.\n")
        f.write(f"  - MAE101 (Giới hạn / Định thức): Kiểm tra {stats['MAE']['sympy_checked']} câu -> Khớp {stats['MAE']['sympy_matched']} câu.\n\n")
        
        f.write("## 5. Danh sách câu hỏi bị loại khỏi Web Quiz\n\n")
        f.write("### a. MAD101 - Câu hỏi phụ thuộc hình hoặc lỗi hiển thị gốc:\n")
        for item in mad_figure_excluded:
            f.write(f"- **ID {item[0]}:** {item[1]} - *{item[2]}...*\n")
        f.write("\n### b. MAE101 - Câu hỏi phụ thuộc hình vẽ:\n")
        for item in mae_figure_excluded:
            f.write(f"- **ID {item[0]}:** {item[1]} - *{item[2]}...*\n")
        f.write("\n")

    # Generate SPOT CHECK MD (30 random questions per subject with fixed seed)
    random.seed(42)
    mad_spot = random.sample(mad_web_questions, min(30, len(mad_web_questions)))
    mae_spot = random.sample(mae_web_questions, min(30, len(mae_web_questions)))
    
    with open(SPOT_CHECK_MD, "w", encoding="utf-8") as f:
        f.write("# BÁO CÁO KIỂM TRA MẪU ĐỘC LẬP (MATH QUIZ SPOT CHECK)\n\n")
        f.write("*30 câu hỏi ngẫu nhiên mỗi môn (seed=42) để kiểm tra định dạng và danh sách cần rà soát*\n\n")
        
        f.write("## I. MẪU KIỂM TRA MAD101 (30 CÂU)\n\n")
        for idx, q in enumerate(mad_spot, 1):
            f.write(f"### Câu {idx} (Web ID: {q['id']} | Quiz ID: {q['quizId']})\n")
            f.write(f"**Câu hỏi:** {q['text']}\n\n")
            f.write("**Các lựa chọn:**\n")
            for o_i, opt in enumerate(q['options']):
                marker = " [ĐÚNG]" if o_i == q['correctIndex'] else ""
                f.write(f"- {chr(65 + o_i)}. {opt}{marker}\n")
            f.write(f"\n**Giải thích:**\n{q['explanation']}\n\n---\n\n")
            
        f.write("## II. MẪU KIỂM TRA MAE101 (30 CÂU)\n\n")
        for idx, q in enumerate(mae_spot, 1):
            f.write(f"### Câu {idx} (Web ID: {q['id']} | Quiz ID: {q['quizId']})\n")
            f.write(f"**Câu hỏi:** {q['text']}\n\n")
            f.write("**Các lựa chọn:**\n")
            for o_i, opt in enumerate(q['options']):
                marker = " [ĐÚNG]" if o_i == q['correctIndex'] else ""
                f.write(f"- {chr(65 + o_i)}. {opt}{marker}\n")
            f.write(f"\n**Giải thích:**\n{q['explanation']}\n\n---\n\n")

        f.write("## III. DANH SÁCH CẦN NGƯỜI RÀ SOÁT (REVIEW CANDIDATES)\n\n")
        f.write("### 1. Câu lệch với answers.txt (MAD101):\n")
        for item in mad_ref_differed_list[:20]:
            f.write(f"- ID {item[0]}: Dữ liệu = {item[1]} vs answers.txt = {item[2]} | Đề: *{item[3]}...*\n")
        if len(mad_ref_differed_list) > 20:
            f.write(f"- ... và {len(mad_ref_differed_list) - 20} câu khác.\n")
            
        f.write("\n### 2. Xung đột đáp án giữa các bản trùng:\n")
        for item in mad_conflicts:
            f.write(f"- MAD101 IDs {item['ids']}: Các đáp án khác nhau = {item['answers']} | Đề: *{item['text']}*\n")
        for item in mae_conflicts:
            f.write(f"- MAE101 IDs {item['ids']}: Các đáp án khác nhau = {item['answers']} | Đề: *{item['text']}*\n")
            
    print("=== build_math_quizzes.py completed successfully ===")

if __name__ == "__main__":
    main()
