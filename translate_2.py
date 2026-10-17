import os

replacements = {
    "Bài viết chờ duyệt": "Pending Posts",
    "bài viết đang cần xem xét": "posts awaiting review",
    "Tìm bài viết": "Search posts",
    "Tìm bài viết...": "Search posts...",
    "Thay đổi vai trò nhanh": "Quick Role Change",
    "Chọn members để cập nhật quyền": "Select members to update permissions",
    "Chọn vai trò": "Select role",
    "Áp dụng": "Apply",
    "Cài đặt hệ thống": "System Settings",
    "Cấu hình thông tin chung và các tùy chọn cho website.": "Configure general information and options for the website.",
    "Nhóm cài đặt": "Settings Groups",
    "Thông tin chung": "General Information",
    "Giao diện": "Appearance",
    "Bảo mật": "Security",
    "Tên website": "Website Name",
    "Mô tả ngắn": "Short Description",
    "Nền tảng học tập AI và cộng đồng dành cho sinh viên": "AI learning platform and community for students",
    "Tải lên": "Upload",
    "Kích thước tối ưu:": "Optimal size:",
    "Liên kết mạng xã hội": "Social Links",
    "Lưu thay đổi": "Save Changes",
    "Kiểm duyệt cộng đồng": "Community Moderation",
    "View và xử lý các bài viết, báo cáo vi phạm hoặc bình luận cần được duyệt.": "View and resolve posts, violation reports, or comments needing approval.",
    "Báo cáo": "Reports",
    "Bài viết bị báo cáo": "Reported Posts",
    "Các nội dung được members gắn cờ": "Content flagged by members",
    "Mới nhất": "Newest",
    "Tìm người dùng": "Search users",
    "bài viết": "posts",
    "Chia sẻ tài liệu về Machine Learning...": "Sharing Machine Learning documents...",
    "Mình nghĩ Python là ngôn ngữ dễ học nhất...": "I think Python is the easiest language...",
    "Có ai biết cách làm project AI không?": "Does anyone know how to make an AI project?",
    "Review khóa học Data Science (rất hay)": "Data Science course review (highly recommended)",
    "Tuyển bạn học cùng React ở HCM": "Looking for React study buddy in HCM",
    "Bài viết có nội dung không phù hợp...": "Post contains inappropriate content...",
    "Chia sẻ liên kết không rõ nguồn...": "Sharing link with unknown source...",
    "Bình luận xúc phạm members khác": "Offensive comment towards other members",
    "Content độc hại": "Malicious content",
    "Công kích cá nhân": "Personal attack",
    "1. Giới thiệu về Machine Learning": "1. Introduction to Machine Learning",
    
    # auth pages missing parts
    "Đăng nhập thành công!": "Login successful!",
    "Đăng ký thành công!": "Registration successful!",
    "Đang chờ phê duyệt...": "Pending approval...",
    
    # index.html missing parts
    "Nền tảng học tập AI và cộng đồng dành cho sinh viên": "AI Learning Platform & Community for Students",
    "Bắt đầu ngay": "Get Started",
    "Tìm hiểu thêm": "Learn More",
    "Giới thiệu": "About",
    "Sự kiện": "Events",
    "Blog": "Blog",
    "Liên hệ": "Contact",
    "Chính sách bảo mật": "Privacy Policy",
    "Điều khoản sử dụng": "Terms of Use",
    "Tất cả quyền được bảo lưu.": "All rights reserved.",
}

def process_file(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
            
        original_content = content
        
        # Sort replacements by length descending to avoid partial matches
        for k, v in sorted(replacements.items(), key=lambda x: len(x[0]), reverse=True):
            content = content.replace(k, v)
            
        if content != original_content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"Updated {filepath}")
    except Exception as e:
        pass

def walk_dir(directory):
    for root, dirs, files in os.walk(directory):
        if '.git' in root or 'node_modules' in root:
            continue
        for file in files:
            if file.endswith('.html') or file.endswith('.js') or file.endswith('.css'):
                process_file(os.path.join(root, file))

if __name__ == "__main__":
    target_dir = r"c:\Users\anhqu\Documents\Computer Science Training\PRIVATE PROJECT\9-5-ai-library"
    walk_dir(target_dir)
