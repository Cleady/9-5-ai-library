import os

replacements = {
    "msgBox.style.fontWeight = 'bold';": "msgBox.style.fontWeight = '500';",
    
    # Auth.js / Auth Controller
    "Đăng nhập thành công! Đang chuyển hướng...": "Login successful! Redirecting...",
    "Đăng nhập thành công": "Login successful",
    "Đăng ký thành công! Đơn đăng ký của bạn đang chờ Quản trị viên phê duyệt.": "Registration successful! Pending admin approval.",
    "Mật khẩu xác nhận không khớp!": "Passwords do not match!",
    "Đăng ký thất bại": "Registration failed",
    "Đăng nhập thất bại": "Login failed",
    "Lỗi kết nối tới máy chủ.": "Server connection error.",
    "Đang xử lý...": "Processing...",
    
    # API Backend
    "Vui lòng nhập tài khoản và mật khẩu": "Please enter username and password",
    "Tài khoản không tồn tại": "Account does not exist",
    "Tài khoản của bạn đang chờ Quản trị viên phê duyệt.": "Your account is pending Administrator approval.",
    "Tài khoản của bạn đã bị khóa.": "Your account has been banned.",
    "Mật khẩu không chính xác": "Incorrect password",
    "Lỗi server nội bộ": "Internal server error",
    "Vui lòng nhập đầy đủ email và mật khẩu": "Please enter email and password",
    "Tài khoản này đã tồn tại": "This account already exists",
    "Không thể tự thay đổi trạng thái của chính mình": "Cannot change your own status",
    "Cập nhật thành công": "Update successful",
    "Không có dữ liệu cập nhật": "No data to update",
    "Lỗi cập nhật user:": "Error updating user:",
    "Lỗi lấy danh sách user:": "Error getting user list:",
    
    # Sync Profile & Auth Guard (Modals)
    "Tài khoản của bạn đã bị khóa!": "Your account has been banned!",
    "Tài khoản đã bị khóa": "Account banned",
    "Rất tiếc, bạn đã bị cấm truy cập vào hệ thống. Vui lòng liên hệ với Quản trị viên nếu đây là sự nhầm lẫn.": "Unfortunately, you have been banned from the system. Please contact an Administrator if this is a mistake.",
    "Về trang chủ": "Go to Home",
    "Đăng xuất": "Logout",
    "Quản lý": "Manage",
    "Vui lòng đăng nhập để tiếp tục": "Please log in to continue",
    "Bạn cần đăng nhập để xem nội dung này.": "You need to log in to view this content.",
    "Bạn cần đăng nhập để xem hệ thống Bài giảng (Lectures).": "You need to log in to view Lectures.",
    "Bạn cần đăng nhập để làm bài Tập thực hành (Practice).": "You need to log in to do Practice.",
    "Bạn cần đăng nhập để xem Lịch sử học tập (History).": "You need to log in to view History.",
    "Bạn cần đăng nhập để truy cập Cài đặt (Settings).": "You need to log in to access Settings.",
    "Vui lòng đăng nhập để sử dụng tính năng Tìm kiếm.": "Please log in to use Search.",
    "Vui lòng đăng nhập để xem Thông báo.": "Please log in to view Notifications.",
    "Chưa có tài khoản?": "Don't have an account?",
    "Đăng ký": "Sign up",
    "Đăng nhập": "Log in",

    # Admin Users JS & HTML
    "Quản lý thành viên": "User Management",
    "Quản lý tài khoản, vai trò và quyền hạn của người dùng.": "Manage user accounts, roles, and permissions.",
    "Tìm kiếm người dùng...": "Search users...",
    "Tất cả vai trò": "All roles",
    "Ban / Unban tài khoản": "Ban / Unban Account",
    "Nhập chính xác email hoặc username của thành viên": "Enter the exact email or username of the member",
    "Nhập email hoặc username": "Enter email or username",
    
    "Hiển thị ": "Displaying ",
    " thành viên": " members",
    "Không tìm thấy người dùng nào phù hợp.": "No matching users found.",
    "Chờ duyệt": "Pending",
    "Hoạt động": "Active",
    "Bị khóa": "Banned",
    "Bạn": "You",
    "Hoàn tất": "Done",
    "Duyệt": "Approve",
    "Không có quyền": "No permission",
    
    "Đang tải dữ liệu...": "Loading data...",
    "Lỗi: Không tìm thấy Token! Vui lòng đăng nhập lại.": "Error: Token not found! Please log in again.",
    "Lỗi: Server không trả về JSON!": "Error: Server did not return JSON!",
    "Lỗi API: ": "API Error: ",
    "Lỗi kết nối Server: ": "Server connection error: ",
    "Lỗi duyệt thành viên: ": "Error approving member: ",
    "Lỗi kết nối khi duyệt": "Connection error during approval",
    
    "Xác nhận: Thay đổi vai trò của thành viên này thành ": "Confirm: Change this member's role to ",
    "Lỗi đổi vai trò: ": "Error changing role: ",
    "Lỗi kết nối khi đổi vai trò": "Connection error when changing role",
    
    "Vui lòng nhập email hoặc username!": "Please enter email or username!",
    "Không tìm thấy thành viên nào với thông tin đã nhập!": "No member found with the entered information!",
    "Lỗi: Bạn không thể tự Ban/Unban chính mình!": "Error: You cannot Ban/Unban yourself!",
    "Lỗi: Không thể thao tác trên tài khoản nội bộ (internal)!": "Error: Cannot modify internal accounts!",
    "Bạn có chắc chắn muốn ": "Are you sure you want to ",
    "Thao tác thành công!": "Operation successful!",
    
    # Auth HTMLs
    "Chào mừng trở lại!": "Welcome back!",
    "Đăng nhập vào tài khoản của bạn để tiếp tục": "Log in to your account to continue",
    "Email hoặc Username": "Email or Username",
    "Mật khẩu": "Password",
    "Quên mật khẩu?": "Forgot password?",
    "Nhớ tài khoản": "Remember me",
    "Hoặc đăng nhập bằng": "Or log in with",
    
    "Tạo tài khoản mới": "Create new account",
    "Tham gia cùng chúng tôi để trải nghiệm": "Join us to experience",
    "Họ và tên": "Full name",
    "Xác nhận mật khẩu": "Confirm password",
    "Tôi đồng ý với": "I agree to the",
    "Điều khoản bảo mật": "Terms of Service",
    "Đã có tài khoản?": "Already have an account?",
    
    # Home Page & Index
    "Điều hướng chính": "Main Navigation",
    "Điều hướng phụ": "Secondary Navigation",
    "Tìm kiếm bài giảng, chủ đề, tài liệu": "Search lectures, topics, documents",
    "Thông báo": "Notifications",
    "Thông báo mới": "new notifications",
    "Đánh dấu đã đọc": "Mark as read",
    "Bài giảng mới": "New lecture",
    "giờ trước": "hours ago",
    "Bộ đề Quiz 3 của Subject 3 đã được mở": "Quiz 3 of Subject 3 is now open",
    "Hôm qua": "Yesterday",
    "Bạn đạt": "You scored",
    "ngày trước": "days ago",
    "Xem tất cả thông báo": "View all notifications",
    "Hồ sơ cá nhân": "Profile",
    "Đổi mật khẩu": "Change Password",
    "Tổng quan học tập": "Learning Overview",
    "Tiếp tục học": "Continue Learning",
    "Tùy chọn khác": "More Options",
    "Tiến độ bài giảng": "Lecture Progress",
    "Điểm quiz gần nhất": "Recent Quiz Score",
    "Điểm 85 phần trăm": "Score 85 percent",
    "Ngày và chuỗi học": "Days and Streaks",
    "Các bài quiz làm gần đây": "Recent quizzes",
    "Môn học": "Subject",
    "Chi tiết": "Details",
    "Xem chi tiết": "View Details",
    "Liên kết chân trang": "Footer Links",
    "Trạng thái": "Status",
    "Ảnh bìa": "Cover",
    "Tên khóa học": "Course Name",
    "Danh mục": "Category",
    "Giảng viên": "Instructor",
    "Học viên": "Students",
    "Người đăng": "Author",
    "Nội dung": "Content",
    "Thời gian": "Time",
    "Thao tác": "Actions",
    "Lý do báo cáo": "Report Reason",
    "Từ chối": "Reject",
    "Xử lý": "Resolve",
    "Xem": "View",
    "Tên người dùng": "Username",
    "Ảnh": "Image",
    "Khách": "Guest"
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
        print(f"Could not process {filepath}: {e}")

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
