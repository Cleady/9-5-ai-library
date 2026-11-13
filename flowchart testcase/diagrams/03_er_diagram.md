# SƠ ĐỒ THỰC THỂ QUAN HỆ CƠ SỞ DỮ LIỆU (03_er_diagram.md)

**Dự án:** 9-5-ai-library  
**Phiên bản:** v1  
**Nguồn sinh:** Trích xuất từ DDL thực tế tại [`backend/config/initDb.js:15-590`](file:///c:/Users/anhqu/Documents/Computer%20Science%20Training/PRIVATE%20PROJECT/9-5-ai-library/backend/config/initDb.js#L15-L590) và cấu trúc thực tế trên máy chủ MySQL (`ai_club_db`).  
**Ghi chú kiểm tra:** Cú pháp đã tự rà soát từng sơ đồ theo chuẩn Mermaid (do môi trường không cài sẵn mermaid-cli).

---

## 1. SƠ ĐỒ THỰC THỂ QUAN HỆ (ER DIAGRAM) TOÀN BỘ 23 BẢNG

```mermaid
erDiagram
    USERS ||--o{ COMMUNITY_POSTS : "posts"
    USERS ||--o{ COMMUNITY_COMMENTS : "writes"
    USERS ||--o{ COMMUNITY_LIKES : "likes"
    USERS ||--o{ COMMUNITY_POLL_VOTES : "votes"
    USERS ||--o{ COMMUNITY_DISCUSSIONS : "creates"
    USERS ||--o{ COMMUNITY_DISCUSSION_REPLIES : "replies"
    USERS ||--o{ COMMUNITY_GROUPS : "founds"
    USERS ||--o{ COMMUNITY_GROUP_MEMBERS : "joins"
    USERS ||--o{ COMMUNITY_NOTIFICATIONS : "receives"
    USERS ||--o{ RESOURCES : "uploads"
    USERS ||--o{ RESOURCE_FAVORITES : "favorites_res"
    USERS ||--o{ USER_FAVORITES : "favorites_item"
    USERS ||--o{ USER_ACTIVITY_DAILY : "activity"
    USERS ||--o{ COMMUNITY_REPORTS : "reports"
    USERS ||--o{ AUDIT_LOGS : "performs"

    COURSES ||--o{ LECTURES : "contains"
    LECTURES ||--o{ LECTURE_RESOURCES : "attaches"
    LECTURES ||--o{ LECTURE_COMMENTS : "has_comments"

    COMMUNITY_POSTS ||--o{ COMMUNITY_POST_TAGS : "tagged_with"
    COMMUNITY_POSTS ||--o{ COMMUNITY_COMMENTS : "receives_comments"
    COMMUNITY_POSTS ||--o{ COMMUNITY_LIKES : "receives_likes"
    COMMUNITY_POSTS ||--o{ COMMUNITY_POLL_OPTIONS : "has_options"
    COMMUNITY_POSTS ||--o{ COMMUNITY_POLL_VOTES : "poll_votes"
    COMMUNITY_POLL_OPTIONS ||--o{ COMMUNITY_POLL_VOTES : "chosen_in"

    COMMUNITY_DISCUSSIONS ||--o{ COMMUNITY_DISCUSSION_REPLIES : "replies_to"
    COMMUNITY_GROUPS ||--o{ COMMUNITY_GROUP_MEMBERS : "has_members"
    RESOURCES ||--o{ RESOURCE_FAVORITES : "favorited_by"

    USERS {
        int id PK
        string username UK
        string full_name
        string password_hash
        string role "ENUM: owner, admin, staff, member"
        string status "ENUM: pending, active, banned"
        timestamp created_at
        string bio
        string avatar_url
        timestamp last_login_at
    }

    COURSES {
        int id PK
        string code UK
        string name
        string title
        string term
        string description
        string icon
        string gradient_from
        string gradient_to
        string status
        timestamp created_at
    }

    LECTURES {
        int id PK
        int course_id FK
        int chapter_order
        string title
        string type
        int duration_min
        string video_url
        string description
        string key_takeaways "JSON"
        string overview_html
        string status
        timestamp created_at
        string video_source "file hoặc youtube"
        string youtube_id
        string thumbnail_url
    }

    LECTURE_RESOURCES {
        int id PK
        int lecture_id FK
        string title
        string type
        string size
        string url
        timestamp created_at
    }

    LECTURE_COMMENTS {
        int id PK
        int lecture_id FK
        int user_id "FK nullable (Lỗ hổng anonymous)"
        string user_name
        string user_role
        string user_avatar
        string content
        timestamp created_at
    }

    COMMUNITY_POSTS {
        int id PK
        int user_id FK
        string kind "ENUM: post, photo, link, question, poll"
        string content
        string media_url
        string link_url
        timestamp created_at
        timestamp updated_at
        boolean is_hidden
        int hidden_by FK
        timestamp hidden_at
        boolean is_pinned
        timestamp pinned_at
        int pinned_by FK
    }

    COMMUNITY_POST_TAGS {
        int post_id PK_FK
        string tag PK
    }

    COMMUNITY_COMMENTS {
        int id PK
        int post_id FK
        int user_id FK
        string content
        timestamp created_at
        boolean is_hidden
        int hidden_by FK
        timestamp hidden_at
    }

    COMMUNITY_LIKES {
        int post_id PK_FK
        int user_id PK_FK
        timestamp created_at
    }

    COMMUNITY_POLL_OPTIONS {
        int id PK
        int post_id FK
        string label
    }

    COMMUNITY_POLL_VOTES {
        int id PK
        int option_id FK
        int post_id FK
        int user_id FK
        timestamp created_at
    }

    COMMUNITY_DISCUSSIONS {
        int id PK
        int user_id FK
        string title
        string body
        string tag
        timestamp created_at
        boolean is_hidden
        int hidden_by FK
        timestamp hidden_at
    }

    COMMUNITY_DISCUSSION_REPLIES {
        int id PK
        int discussion_id FK
        int user_id FK
        string content
        timestamp created_at
        boolean is_hidden
        int hidden_by FK
        timestamp hidden_at
    }

    COMMUNITY_GROUPS {
        int id PK
        string name
        string description
        int created_by FK
        timestamp created_at
    }

    COMMUNITY_GROUP_MEMBERS {
        int group_id PK_FK
        int user_id PK_FK
        timestamp joined_at
    }

    COMMUNITY_NOTIFICATIONS {
        int id PK
        int user_id FK
        int actor_id FK
        string type
        int post_id FK
        boolean is_read
        timestamp created_at
        int lecture_id
        int resource_id
        string meta "JSON"
    }

    RESOURCES {
        int id PK
        int user_id FK
        string title
        string description
        string type
        string extension
        string original_name
        string stored_name
        int file_size_bytes
        string mime_type
        string subject
        int downloads
        timestamp created_at
        timestamp updated_at
    }

    RESOURCE_FAVORITES {
        int resource_id PK_FK
        int user_id PK_FK
        timestamp created_at
    }

    USER_FAVORITES {
        int user_id PK_FK
        string item_type PK "lecture_course hoặc practice_subject"
        int item_id PK "ID da hinh (Polymorphic)"
        timestamp created_at
    }

    USER_ACTIVITY_DAILY {
        int user_id PK_FK
        string activity_date PK
        timestamp first_seen_at
        timestamp last_seen_at
        int hits
    }

    COMMUNITY_REPORTS {
        int id PK
        int reporter_id FK
        string target_type "post, comment, discussion, reply"
        int target_id
        string reason
        string note
        string status "ENUM: open, actioned, dismissed"
        int handled_by FK
        timestamp handled_at
        timestamp created_at
    }

    AUDIT_LOGS {
        int id PK
        int actor_id FK
        string action
        string target_type
        int target_id
        string details "JSON"
        string ip_address
        timestamp created_at
    }

    SITE_SETTINGS {
        string setting_key PK
        string setting_value
        int updated_by FK
        timestamp updated_at
    }
```

---

## 2. SO SÁNH ĐỐI CHIẾU GIỮA DDL THIẾT KẾ VÀ CSDL THỰC TẾ

| Bảng CSDL | Thuộc tính / Thiết kế trong DDL (`initDb.js`) | Tình trạng thực tế trong MySQL | Đánh giá & Khuyến nghị |
|:---|:---|:---|:---|
| `users` | Có giả định trường `email` ở một số tài liệu | CSDL **hoàn toàn không có cột `email`**, chỉ có `username` | Cột `username` đang kiêm nhiệm lưu email hoặc tài khoản học viên. Cần chuẩn hoá thêm cột `email` nếu muốn hỗ trợ luồng khôi phục mật khẩu. |
| `lecture_comments` | Thiết kế lưu bình luận học viên có `user_id` | Trong DB có 2/2 bản ghi `user_id = NULL` | Do route POST không bắt buộc đăng nhập, cho phép người ẩn danh bình luận và lưu `NULL`. Cần bổ sung `NOT NULL` và ràng buộc khoá ngoại. |
| `user_favorites` | Khóa chính phức hợp `(user_id, item_type, item_id)` | Trường `item_id` mang tính đa hình (Polymorphic) | Không thể tạo Foreign Key trong MySQL cho `item_id` khi `item_type = 'practice_subject'` vì môn thực hành lưu trong JS tĩnh, không có bảng trong DB. |
| `resource_favorites` vs `user_favorites` | Tách làm 2 bảng riêng biệt | Cả hai bảng cùng phục vụ chức năng "Yêu thích" | Gây phân mảnh dữ liệu yêu thích. Nên gộp `resource_favorites` vào `user_favorites` với `item_type = 'resource'`. |
| `lectures` | `chapter_order INT DEFAULT 1` | Cả 3 bài giảng thuộc course 1 đều có `chapter_order = 1` | Thiếu ràng buộc `UNIQUE (course_id, chapter_order)` khiến bài giảng bị trùng thứ tự chương. |
