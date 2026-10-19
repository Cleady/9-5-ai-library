/**
 * MAD101 STUDIO — DATA LOADER & PROVIDER
 * js/data.js
 */

export const CHAPTERS = [
  { id: 1, name: "Chương 1: Logic và Bằng chứng", shortName: "Logic & Proofs", english: "The Foundations: Logic and Proofs", range: [1, 150] },
  { id: 2, name: "Chương 2: Cấu trúc cơ bản - Tập hợp, Hàm, Dãy và Tổng", shortName: "Sets & Functions", english: "Basic Structures: Sets, Functions, Sequences, and Sums", range: [151, 280] },
  { id: 3, name: "Chương 3: Thuật toán", shortName: "Algorithms", english: "Algorithms", range: [281, 400] },
  { id: 4, name: "Chương 4: Lý thuyết số và Mật mã", shortName: "Number Theory", english: "Number Theory and Cryptography", range: [401, 550] },
  { id: 5, name: "Chương 5: Quy nạp và Đệ quy", shortName: "Induction", english: "Induction and Recursion", range: [551, 700] },
  { id: 6, name: "Chương 6: Đếm", shortName: "Counting", english: "Counting", range: [701, 880] },
  { id: 7, name: "Chương 7: Đồ thị", shortName: "Graphs", english: "Graphs", range: [881, 1030] },
  { id: 8, name: "Chương 8: Cây", shortName: "Trees", english: "Trees", range: [1031, 1131] }
];

let questionsMap = new Map();
let isLoaded = false;
let v2Map = new Map();

export async function initDataLoader() {
  if (isLoaded) return;

  // 1. Load Schema v2 questions (from window.V2_QUESTIONS or fetch)
  if (window.V2_QUESTIONS && Array.isArray(window.V2_QUESTIONS)) {
    window.V2_QUESTIONS.forEach(q => v2Map.set(q.id, q));
    console.log(`[Data] Loaded ${v2Map.size} Schema v2 questions from script tag.`);
  } else {
    try {
      const res = await fetch('v2/questions_sample_v2.json');
      if (res.ok) {
        const v2List = await res.json();
        v2List.forEach(q => v2Map.set(q.id, q));
        console.log(`[Data] Loaded ${v2List.length} Schema v2 questions from fetch.`);
      }
    } catch (e) {
      console.warn('[Data] Could not load v2 questions via fetch:', e);
    }
  }

  // 2. Load questions_raw or ALL_QUESTIONS
  let rawList = [];
  if (window.ALL_QUESTIONS && Array.isArray(window.ALL_QUESTIONS)) {
    rawList = window.ALL_QUESTIONS;
  } else {
    try {
      const res = await fetch('questions_raw.json');
      if (res.ok) {
        rawList = await res.json();
      }
    } catch (e) {
      console.warn('[Data] Fetch questions_raw.json failed:', e);
    }
  }

  // 3. Build unified questions map
  rawList.forEach(rawQ => {
    const id = rawQ.id;
    // Check if v2 exists for this id
    if (v2Map.has(id)) {
      questionsMap.set(id, v2Map.get(id));
    } else {
      // Find chapter for this ID
      const ch = getChapterForId(id);
      
      // Normalize answer text
      let ansLetter = 'A';
      if (Array.isArray(rawQ.answer) && rawQ.answer.length > 0) {
        ansLetter = rawQ.answer[0];
      } else if (typeof rawQ.answer === 'string') {
        ansLetter = rawQ.answer;
      }

      // Câu chưa có trong v2: ĐẶT TRẠNG THÁI "pending", TUYỆT ĐỐI KHÔNG SINH CHỮ GIẢ
      questionsMap.set(id, {
        id: id,
        chapterId: ch ? ch.id : 0,
        chapterName: ch ? ch.name : "Chưa phân loại",
        chapterShort: ch ? ch.shortName : "Khác",
        type: "single_choice",
        question: null,
        options: [],
        answer: ansLetter,
        answer_status: "pending",
        explanation: [],
        image: rawQ.image || `0001_q001_Question_1.png`,
        code: null,
        needs_image: true,
        confidence: "low",
        review_flags: ["chưa chép đề"]
      });
    }
  });

  // Ensure all v2 questions are populated into questionsMap
  v2Map.forEach((v2Q, id) => {
    if (!questionsMap.has(id)) {
      questionsMap.set(id, v2Q);
    }
  });

  isLoaded = true;
  console.log(`[Data] Total unified questions ready: ${questionsMap.size}`);
}

export function getChapterForId(id) {
  for (const ch of CHAPTERS) {
    if (ch.range && id >= ch.range[0] && id <= ch.range[1]) {
      return ch;
    }
  }
  return null;
}

export function getAllQuestions() {
  return Array.from(questionsMap.values());
}

export function getQuestionById(id) {
  return questionsMap.get(Number(id));
}

export function getQuestionsByChapter(chapterId) {
  const cid = Number(chapterId);
  if (cid === 0) return getAllQuestions();
  return getAllQuestions().filter(q => q.chapterId === cid);
}

export function getQuestionsByFilter(filterType, store) {
  const all = getAllQuestions();
  if (filterType === 'flagged') {
    const bookmarkedIds = store.getBookmarks();
    return all.filter(q => bookmarkedIds.includes(q.id));
  }
  if (filterType === 'wrong') {
    const wrongIds = store.getWrongQuestionIds();
    return all.filter(q => wrongIds.includes(q.id));
  }
  return all;
}
