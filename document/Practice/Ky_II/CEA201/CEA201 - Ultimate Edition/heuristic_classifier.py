import json
import re

# Keywords for each chapter
chapter_keywords = {
    1: ['eniac', 'generation', 'vacuum tube', 'transistor', 'integrated circuit', 'architecture', 'organization', 'von neumann', 'history', 'evolution'],
    2: ["amdahl's", 'amdahl', 'speedup', 'mips', 'clock speed', 'clock cycle', 'cpi', 'performance', 'benchmark', 'power density'],
    3: ['bus', 'mar', 'mbr', 'pc', 'ir', 'fetch cycle', 'execute cycle', 'interrupt', 'interconnection', 'pci', 'top-level', 'system bus', 'data lines', 'address lines'],
    4: ['hierarchy', 'locality', 'memory access time', 'hit ratio', 'miss ratio'],
    5: ['cache', 'mapping', 'l1', 'l2', 'l3', 'set-associative', 'direct mapping', 'tag', 'line', 'replacement'],
    6: ['ram', 'rom', 'dram', 'sram', 'eeprom', 'flash memory', 'error correction', 'hamming', 'parity', 'internal memory'],
    7: ['magnetic disk', 'optical', 'raid', 'ssd', 'sector', 'track', 'cav', 'clv', 'platter', 'seek time', 'rotational delay'],
    8: ['i/o', 'input/output', 'programmed', 'interrupt-driven', 'dma', 'direct memory access', 'channel', 'peripheral'],
    9: ['operating system', 'os', 'scheduling', 'virtual memory', 'paging', 'segmentation', 'process', 'thread', 'dispatcher', 'multitasking', 'swapping'],
    10: ['binary', 'decimal', 'hexadecimal', 'number system', 'conversion'],
    11: ['alu', "2's complement", "two's complement", 'sign-magnitude', 'integer arithmetic', 'floating-point', 'addition', 'subtraction', 'multiplication', 'division', 'xor'],
    12: ['boolean', 'logic gate', 'truth table', 'karnaugh map', 'multiplexer', 'flip-flop', 'sequential circuit', 'combinational', 'demorgan', 'and', 'or', 'not', 'nand', 'nor', 'xnor'],
    13: ['opcode', 'operand', 'instruction set', 'branch instruction', 'data transfer', 'data processing', 'machine instruction'],
    14: ['addressing mode', 'direct addressing', 'indirect', 'register addressing', 'immediate', 'displacement', 'instruction format'],
    15: ['assembly', 'masm32', 'label', 'directive', 'assembler'],
    16: ['processor structure', 'register file', 'control unit', 'instruction cycle', 'pipelining', 'hazard', 'pipeline'],
    17: ['risc', 'cisc', 'register window', 'delayed branch', 'reduced instruction'],
    18: ['superscalar', 'instruction-level parallelism', 'out-of-order', 'renaming', 'simultaneous multithreading'],
    19: ['micro-operation', 'control signal', 'hardwired', 'microprogrammed', 'control unit operation'],
    20: ['parallel processing', 'smp', 'numa', 'cluster', "flynn's taxonomy", 'sisd', 'simd', 'mimd', 'cache coherence'],
    21: ['multicore', 'many integrated core', 'mic']
}

# Compile regexes
regexes = {}
for ch, keywords in chapter_keywords.items():
    regexes[ch] = re.compile(r'\b(' + '|'.join(re.escape(kw) for kw in keywords) + r')\b', re.IGNORECASE)

with open('questions.json', 'r', encoding='utf-8') as f:
    questions = json.load(f)

classifications = {}
for q_num_str, q_text in questions.items():
    scores = {ch: 0 for ch in chapter_keywords.keys()}
    q_lower = q_text.lower()
    
    # Check boolean explicitly as it's common in digital logic
    if 'boolean' in q_lower or 'karnaugh' in q_lower or 'truth table' in q_lower or 'gate' in q_lower:
        scores[12] += 10
    
    for ch, regex in regexes.items():
        matches = regex.findall(q_lower)
        scores[ch] += len(matches)
        
    # Default to ch 13 (Instruction sets) if no keywords matched
    best_ch = max(scores, key=scores.get)
    if scores[best_ch] == 0:
        best_ch = 13
        
    classifications[q_num_str] = best_ch

with open('classifications.json', 'w', encoding='utf-8') as f:
    json.dump(classifications, f, indent=2)

print("Classifications generated successfully!")
