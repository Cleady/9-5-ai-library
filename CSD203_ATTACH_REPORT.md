# Gắn ảnh sơ đồ CSD203 · Giai đoạn B

Đã gắn **28 sơ đồ** được duyệt ở chương 6. Tổng số câu CSD203 có sơ đồ tăng từ **9 lên 37**. Đã chép **56 file** vào `assets/images/practice/csd203/`, gồm WebP dùng trong quiz và PNG lossless đi kèm cùng stem. Từng file mới khớp SHA-256 với staging đã kiểm pixel. Cả 18 file ảnh có sẵn giữ nguyên SHA-256.

## Kiểm chứng sau build

| Hạng mục | Kết quả |
| --- | --- |
| TeX | Chèn đúng 28 khối gồm 112 dòng. Bỏ chính xác các khối mới cho ra bản gốc từng byte. TeX hiện có cả CRLF và LF, bản cập nhật giữ kiểu xuống dòng tại từng vị trí. |
| Builder | Dry-run và build thường hoàn tất với 0 lỗi. Giữ đúng tập ID và nội dung của cả 8 quiz CSD203. |
| Số câu | CSD203 có **427** câu, riêng chương 6 có **129**. `practice-data.js` có **2.449** câu. Khi nạp thêm MAD101 và MAE101 có **4.653** câu, khớp tổng `questionCount` của 123 quiz trong chỉ mục. Các tổng đều giống trước cập nhật. |
| JSON và JavaScript | `json.load` đọc được cả ba JSON. `node --check js/practice-data.js` thành công. Dữ liệu 427 câu CSD203 khớp giữa JSON và JS khi đối chiếu theo ID. Hai bản chỉ mục JSON có cùng nội dung và chỉ khác bản cũ ở mốc sinh file. |
| Nội dung câu hỏi | So từng câu theo ID. 28 câu được duyệt chỉ thêm `diagrams`, các thuộc tính của mọi câu còn lại khớp bản gốc. Hai file JS bổ sung MAD101 và MAE101 giống bản gốc từng byte. |
| Sơ đồ | Cả 37 mục `diagrams[].src` trỏ đến file tồn tại, URL riêng cho từng câu và mọi `alt` đều có nội dung, không chứa dấu nháy kép. Mỗi WebP mới được tham chiếu bởi đúng một câu, mỗi PNG mới có WebP được tham chiếu cùng stem. |
| Cache buster | Chuyển `20261118v2` thành `20261118v3` đúng 23 chỗ ở 6 HTML. So byte xác nhận mỗi file chỉ đổi token. |

SHA-256 trước và sau khớp ở từng cột. Mỗi trường được băm từ danh sách ID đã sắp xếp, kèm cờ tồn tại và giá trị gốc, giữ nguyên đơn vị xuống dòng trong các giá trị văn bản.

| Trường | 2.449 câu trong JS chính | 4.653 câu gồm MAD101 và MAE101 |
| --- | --- | --- |
| `text` | `ce578ac728455112eada97dbe43185b8f9ad5f19e30f9688d51e223ad433fc88` | `67e191dd683e595cd1c20ec57593687e3bb5237a602e562c8b1455568bc8f6d3` |
| `options` | `e306255a293913b5b6083beae7df83edb3334461d39529e7f59e609ac22ff3f2` | `378206cbbb0474d2b3287aa06165be9eac919a2202f4f2bc3d669a70d9518dce` |
| `correctIndex` | `5fd2c218967d35f7546d0c0847c5cc2e8df7add73509445756b4ea3e573383ab` | `2b30313e150ca581a70b578f87305b7aca7825f4aab26f2ce3c3956996fce6f7` |
| `explanation` | `03065c4d9f94e24a43042befab50beda97380422f7d9a01885582b062533b5d3` | `5038fb5ce18250854cbd5e3665398ee31d754783fb000d49c667b897860273df` |

## Câu đã gắn

| Câu | ID | Stem ảnh |
| --- | ---: | --- |
| 6.2 | 10146 | `csd203_c6_10146_fig` |
| 6.3 | 10147 | `csd203_c6_10147_fig` |
| 6.4 | 10148 | `csd203_c6_10148_fig` |
| 6.5 | 10149 | `csd203_c6_10149_fig` |
| 6.8 | 10152 | `csd203_c6_10152_fig` |
| 6.10 | 10154 | `csd203_c6_10154_fig` |
| 6.11 | 10155 | `csd203_c6_10155_fig` |
| 6.15 | 10159 | `csd203_c6_10159_fig` |
| 6.24 | 10169 | `csd203_c6_10169_fig` |
| 6.30 | 10175 | `csd203_c6_10175_fig` |
| 6.31 | 10176 | `csd203_c6_10176_fig` |
| 6.36 | 10181 | `csd203_c6_10181_fig` |
| 6.63 | 10210 | `csd203_c6_10210_fig` |
| 6.64 | 10211 | `csd203_c6_10211_fig` |
| 6.68 | 10215 | `csd203_c6_10215_fig` |
| 6.69 | 10216 | `csd203_c6_10216_fig` |
| 6.73 | 10221 | `csd203_c6_10221_fig` |
| 6.74 | 10222 | `csd203_c6_10222_fig` |
| 6.75 | 10223 | `csd203_c6_10223_fig` |
| 6.76 | 10224 | `csd203_c6_10224_fig` |
| 6.78 | 10226 | `csd203_c6_10226_fig` |
| 6.80 | 10228 | `csd203_c6_10228_fig` |
| 6.81 | 10229 | `csd203_c6_10229_fig` |
| 6.82 | 10230 | `csd203_c6_10230_fig` |
| 6.84 | 10232 | `csd203_c6_10232_fig` |
| 6.85 | 10233 | `csd203_c6_10233_fig` |
| 6.91 | 10240 | `csd203_c6_10240_fig` |
| 6.103 | 10254 | `csd203_c6_10254_fig` |

## Câu còn thiếu hình hoặc cần xử lý riêng

| Câu | ID | Lý do |
| --- | ---: | --- |
| 6.14 | 10158 | Mức VỪA. D cụ thể nhất, nhưng A và B cũng mô tả đúng tính chất của cây. |
| 6.101 | 10252 | Mức VỪA. A và D đều có thể là thứ tự BFS vì đề chưa quy định thứ tự xét đỉnh kề. |
| 6.53 | 10199 | In-order trên hình cho B, khóa hiện tại là A. Câu 6.10 (10154) dùng ảnh gốc riêng và khớp khóa C. |
| 6.56 | 10203 | Xóa bằng hai tiền nhiệm và duyệt post-order cho B, khóa hiện tại là A. Ba cách phối hợp tiền nhiệm và hậu nhiệm còn lại cũng không cho A. |
| 6.119 | 10413 | Ảnh gốc bị lỗi hiển thị, thiếu sơ đồ để kiểm đáp án tổng trọng số MST. |
| 6.21, 6.25 | 10165, 10170 | Mảng biểu diễn cây đã có trong TeX và đủ để làm bài. |

Chi tiết ảnh nguồn, figdesc và chứng cứ đặt tại [attach-plan.csv](attach-plan.csv) và [attach-anomalies.md](attach-anomalies.md).

## Sao lưu và khôi phục

Thư mục `_backup_attach_20261119_004223/` chứa **29 file gốc** với đúng cấu trúc đường dẫn, gồm TeX, bốn file sinh bởi builder, sáu HTML và 18 ảnh trước cập nhật. `attach-manifest.json` lưu SHA-256 của 29 file sao lưu và 56 ảnh mới.

Để khôi phục, chép từng file của mục `original_sha256` từ thư mục sao lưu về đúng đường dẫn tương đối trong repo. Loại đúng 56 file trong mục `added_assets_sha256` sau khi đối chiếu hash, rồi xác nhận SHA-256 của 29 file đã phục hồi trùng manifest.

## Kết quả builder và Git

```text
[2] Đã bóc tách 427 câu hỏi.
[3] Kiểm định dữ liệu: 0 LỖI (100% câu hỏi và phương án hợp lệ).
  Quiz 306: Chương 6 – Cây tìm kiếm nhị phân và Đồ thị (Binary Search Tree & Graph)          | 129 câu | 194 phút

    - Tổng Questions: 2449 (Môn CSD203: 427)
--- Hoàn thành trích xuất Quiz Index ---
HOÀN TẤT CHUẨN HÓA VÀ CẬP NHẬT MÔN CSD203!
```

```text
 assets/data/quizzes-index.json                     |   2 +-
 backend/data/quizzes-index.json                    |   2 +-
 .../Practice/Ky_II/CSD203/CSD203_Ultra_Edition.tex | 112 ++++++++++
 document/Practice/Ky_II/CSD203/questions.json      | 226 ++++++++++++++++++---
 js/practice-data.js                                | 224 +++++++++++++++++---
 pages/practice/practice-mock-exam.html             |  10 +-
 pages/practice/practice-quiz-intro.html            |   6 +-
 pages/practice/practice-quiz.html                  |  10 +-
 pages/practice/practice-result.html                |   6 +-
 pages/practice/practice-subject.html               |   8 +-
 pages/practice/practice.html                       |   6 +-
 11 files changed, 530 insertions(+), 82 deletions(-)
```

`git diff --check` trả mã 0. Thống kê Git ở trên chỉ gồm file đã được theo dõi. 56 ảnh mới hiện là file chưa được theo dõi.
