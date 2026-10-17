# CSD203 Study Hub

Website ôn tập CSD203, dùng giao diện và tính năng của CEA Study Hub với bộ câu hỏi trong `source/csd203_theo_chuong_all.tex`.

## Mở website

Mở `index.html` trên trình duyệt. Ứng dụng chạy tĩnh, không cần cài backend hay đăng nhập.

## Tạo lại dữ liệu câu hỏi

Nếu cập nhật file LaTeX nguồn, chạy tại thư mục này:

```sh
node scripts/build-data.mjs
```

Script tạo `data/questions.json` và `data/questions.js`. Hiện có 376 câu thuộc 5 chương; 42 câu có sơ đồ cây hoặc đồ thị được nhúng dưới dạng SVG.

Tiến độ, câu đánh dấu, câu sai và báo cáo được lưu riêng trong trình duyệt. Nút JSON cho phép sao lưu và khôi phục dữ liệu.
