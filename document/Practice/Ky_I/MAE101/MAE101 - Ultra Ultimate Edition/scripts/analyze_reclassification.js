const fs = require('fs');
const path = require('path');

let raw = fs.readFileSync(path.join(__dirname, '../data/questions.js'), 'utf8').trim();
if (raw.startsWith('window.MAE_QUESTIONS=')) {
  raw = raw.replace('window.MAE_QUESTIONS=', '');
}
if (raw.endsWith(';')) {
  raw = raw.slice(0, -1);
}
const questions = JSON.parse(raw);

const reclassifications = [];
const stats = {
  before: {},
  after: {},
  totalChanged: 0
};

// Count initial
for (const q of questions) {
  const key = `${q.folder}/${q.topic}`;
  stats.before[key] = (stats.before[key] || 0) + 1;
}

for (const q of questions) {
  const text = q.text.toLowerCase();
  let oldTopic = q.topic;
  let oldFolder = q.folder;
  let newTopic = oldTopic;
  let newFolder = oldFolder;
  let reason = '';
  let confidence = 'high';
  let needsReview = false;

  // 1. Critical special cases:
  if (q.id === 455) {
    // Q455 is an AI question in questions.js, but on disk is an integral question!
    newFolder = 'GT1';
    newTopic = 'TichPhan';
    reason = 'Ảnh gốc trên đĩa 0455_q455_Question_455.png là bài toán tích phân MAE101 (chuyển từ MaTran sang TichPhan).';
    confidence = 'high';
  } else if (q.id === 306) {
    // Q306 is CSD201 Bucket Hashing
    newFolder = 'Unknown';
    newTopic = 'Unknown';
    reason = 'Câu hỏi thuộc môn CSD201 (Bucket hashing), không thuộc MAE101; chuyển sang Unknown chờ duyệt.';
    confidence = 'medium';
    needsReview = true;
  }
  // 2. PhuongTrinhViPhan (should not exist in MAE101):
  else if (oldTopic === 'PhuongTrinhViPhan') {
    if (q.id === 796 || text.includes('integral') || (text.includes('evaluate') && text.includes('dx')) || text.includes('find') && text.includes('+ c')) {
      newFolder = 'GT1';
      newTopic = 'TichPhan';
      reason = 'Câu hỏi tính nguyên hàm/tích phân bất định (Find \\int x^3 e^{x^2} dx), thuộc GT1/TichPhan.';
    } else if (q.id === 801 || text.includes('homogeneous') || text.includes('augmented matrix') || text.includes('linear equation') || text.includes('linear system')) {
      newFolder = 'DSTT1';
      newTopic = 'HePhuongTrinh';
      reason = 'Câu hỏi về số nghiệm của hệ phương trình tuyến tính thuần nhất, thuộc DSTT1/HePhuongTrinh.';
    } else if (text.includes('dz') || text.includes("y'") || text.includes('dy') || text.includes('derivative') || text.includes('implicit')) {
      newFolder = 'GT1';
      newTopic = 'DaoHam';
      reason = 'Câu hỏi tính đạo hàm hàm số hoặc đạo hàm ẩn, thuộc GT1/DaoHam.';
    } else if (text.includes('position') || text.includes('velocity') || text.includes('moving')) {
      newFolder = 'GT1';
      newTopic = 'DaoHam';
      reason = 'Bài toán ứng dụng đạo hàm tìm vận tốc/vị trí chuyển động, thuộc GT1/DaoHam.';
    } else {
      needsReview = true;
      confidence = 'medium';
      reason = 'Câu hỏi trong nhóm PhuongTrinhViPhan cần kiểm tra chi tiết để phân loại chính xác.';
    }
  }
  // 3. HePhuongTrinh misclassified under MaTran:
  else if (oldTopic === 'MaTran' && (text.includes('homogeneous system') || text.includes('solve the system') || text.includes('infinitely many solutions') || text.includes('augmented matrix'))) {
    newFolder = 'DSTT1';
    newTopic = 'HePhuongTrinh';
    reason = 'Câu hỏi giải hoặc biện luận hệ phương trình tuyến tính, thuộc DSTT1/HePhuongTrinh.';
  }
  // 4. DinhThuc misclassified under MaTran:
  else if (oldTopic === 'MaTran' && (text.includes('determinant') || text.includes('det(') || text.includes('det a') || text.includes('det(a)'))) {
    newFolder = 'DSTT1';
    newTopic = 'DinhThuc';
    reason = 'Câu hỏi tính định thức ma trận hoặc tính chất định thức, thuộc DSTT1/DinhThuc.';
  }
  // 5. TriRieng misclassified under MaTran or VectorHinhHoc:
  else if ((oldTopic === 'MaTran' || oldTopic === 'VectorHinhHoc') && (text.includes('eigenvalue') || text.includes('eigenvector') || text.includes('trị riêng') || text.includes('vector riêng'))) {
    newFolder = 'DSTT1';
    newTopic = 'TriRieng';
    reason = 'Câu hỏi tìm trị riêng hoặc vector riêng, thuộc DSTT1/TriRieng.';
  }
  // 6. AnhXaTuyenTinh misclassified:
  else if ((oldTopic === 'MaTran' || oldTopic === 'VectorHinhHoc') && (text.includes('linear transformation') || text.includes('linear map') || text.includes('reflection in the line') || text.includes('rotation through') || text.includes('projection on the line'))) {
    newFolder = 'DSTT1';
    newTopic = 'AnhXaTuyenTinh';
    reason = 'Câu hỏi về phép biến đổi tuyến tính (phản xạ, phép quay, hình chiếu), thuộc DSTT1/AnhXaTuyenTinh.';
  }
  // 7. GioiHan misclassified under HamSo:
  else if (oldTopic === 'HamSo' && (text.includes('find the limit') || text.includes('evaluate the limit') || text.includes('lim_') || text.includes('continuous at'))) {
    newFolder = 'GT1';
    newTopic = 'GioiHan';
    reason = 'Câu hỏi tìm giới hạn hoặc xét tính liên tục tại một điểm, thuộc GT1/GioiHan.';
  }
  // 8. DaoHam misclassified under HamSo:
  else if (oldTopic === 'HamSo' && (text.includes('tangent') || text.includes('derivative') || text.includes("find y'") || text.includes('differentiate') || text.includes('rate of increase') || text.includes('linear approximation'))) {
    newFolder = 'GT1';
    newTopic = 'DaoHam';
    reason = 'Câu hỏi tính đạo hàm, vi phân, tiếp tuyến hoặc xấp xỉ tuyến tính, thuộc GT1/DaoHam.';
  }
  // 9. TichPhan misclassified under HamSo or DaoHam:
  else if ((oldTopic === 'HamSo' || oldTopic === 'DaoHam') && (text.includes('evaluate') && text.includes('dx') || text.includes('integral') || text.includes('simpson') || text.includes('trapezoidal') || text.includes('riemann') || text.includes('area of under the graph') || text.includes('area under'))) {
    newFolder = 'GT1';
    newTopic = 'TichPhan';
    reason = 'Câu hỏi tính tích phân hoặc diện tích hình phẳng dưới đồ thị, thuộc GT1/TichPhan.';
  }
  // 10. CucTri misclassified under HamSo or DaoHam:
  else if ((oldTopic === 'HamSo' || oldTopic === 'DaoHam') && (text.includes('critical number') || text.includes('inflection') || text.includes('relative extrema') || text.includes('absolute maximum') || text.includes('as large as possible') || text.includes('minimum of the product') || text.includes('concave up'))) {
    newFolder = 'GT1';
    newTopic = 'CucTri';
    reason = 'Câu hỏi tìm cực trị, điểm uốn hoặc bài toán tối ưu hóa, thuộc GT1/CucTri.';
  }

  // If changed:
  if (newFolder !== oldFolder || newTopic !== oldTopic) {
    stats.totalChanged++;
    reclassifications.push({
      id: q.id,
      old_folder: oldFolder,
      old_topic: oldTopic,
      new_folder: newFolder,
      new_topic: newTopic,
      reason,
      confidence,
      needs_review: needsReview
    });
  }

  const finalKey = `${newFolder}/${newTopic}`;
  stats.after[finalKey] = (stats.after[finalKey] || 0) + 1;
}

const outData = {
  summary: {
    totalQuestions: questions.length,
    totalChanged: stats.totalChanged,
    needsReviewCount: reclassifications.filter(r => r.needs_review).length,
    beforeDistribution: stats.before,
    afterDistribution: stats.after
  },
  reclassifications
};

fs.writeFileSync(path.join(__dirname, '../data/v2/reclassification.json'), JSON.stringify(outData, null, 2), 'utf8');
console.log('Reclassification analysis complete:');
console.log(`Total changed: ${stats.totalChanged} / ${questions.length}`);
console.log(`Needs review: ${outData.summary.needsReviewCount}`);
console.log('After distribution:', JSON.stringify(stats.after, null, 2));
