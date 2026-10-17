#!/usr/bin/env python3
"""Author chapter-aware Vietnamese rationales and references for every DBI202 item."""
from __future__ import annotations

import json
import re
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "data" / "questions.json"
OUTPUT = ROOT / "data" / "explanations.json"

BOOK = {
    "title": "Database Management Systems (2nd ed.) — mục lục chương",
    "url": "https://pages.cs.wisc.edu/~dbbook/openAccess/secondEdition/dbbook.toc.html",
}
MIT = {
    "title": "MIT OpenCourseWare — Database Systems readings",
    "url": "https://ocw.mit.edu/courses/6-830-database-systems-fall-2010/pages/readings/",
}
PURDUE = {
    "title": "Purdue CS 448 — Relational Database Systems topics",
    "url": "https://www.cs.purdue.edu/academic-programs/courses/canonical/cs448.html",
}
MS_SELECT = {
    "title": "Microsoft Learn — SELECT (Transact-SQL)",
    "url": "https://learn.microsoft.com/en-us/sql/t-sql/queries/select-transact-sql?view=sql-server-ver17",
}
MS_GRANT = {
    "title": "Microsoft Learn — GRANT Object Permissions",
    "url": "https://learn.microsoft.com/en-us/sql/t-sql/statements/grant-object-permissions-transact-sql?view=sql-server-ver16",
}
MS_CREATE_TABLE = {
    "title": "Microsoft Learn — CREATE TABLE (Transact-SQL)",
    "url": "https://learn.microsoft.com/en-us/sql/t-sql/statements/create-table-transact-sql?view=sql-server-ver17",
}
MS_VARIABLES = {
    "title": "Microsoft Learn — T-SQL Variables",
    "url": "https://learn.microsoft.com/en-us/sql/t-sql/language-elements/variables-transact-sql?view=sql-server-ver17",
}
MS_CURSORS = {
    "title": "Microsoft Learn — Cursors (Transact-SQL)",
    "url": "https://learn.microsoft.com/en-us/sql/t-sql/language-elements/cursors-transact-sql?view=sql-server-ver17",
}
MS_LIKE = {
    "title": "Microsoft Learn — LIKE and pattern matching",
    "url": "https://learn.microsoft.com/en-us/sql/t-sql/language-elements/like-transact-sql?view=sql-server-ver17",
}
MS_TRIGGER = {
    "title": "Microsoft Learn — CREATE TRIGGER (Transact-SQL)",
    "url": "https://learn.microsoft.com/en-us/sql/t-sql/statements/create-trigger-transact-sql?view=sql-server-ver16",
}
MS_DROP_FUNCTION = {
    "title": "Microsoft Learn — DROP FUNCTION (Transact-SQL)",
    "url": "https://learn.microsoft.com/en-us/sql/t-sql/statements/drop-function-transact-sql?view=sql-server-2017",
}
MS_DATA_TYPES = {
    "title": "Microsoft Learn — SQL Server data types and Unicode",
    "url": "https://learn.microsoft.com/en-us/sql/relational-databases/collations/collation-and-unicode-support?view=sql-server-ver17",
}
MS_DELETE = {
    "title": "Microsoft Learn — DELETE (Transact-SQL)",
    "url": "https://learn.microsoft.com/en-us/sql/t-sql/statements/delete-transact-sql?view=sql-server-ver17",
}
MS_NULL = {
    "title": "Microsoft Learn — NULL and UNKNOWN (Transact-SQL)",
    "url": "https://learn.microsoft.com/en-us/sql/t-sql/language-elements/null-and-unknown-transact-sql?view=sql-server-2017",
}
MS_AGGREGATE = {
    "title": "Microsoft Learn — Aggregate Functions (Transact-SQL)",
    "url": "https://learn.microsoft.com/en-us/sql/t-sql/functions/aggregate-functions-transact-sql?view=sql-server-linux-ver17",
}
MS_EXECUTE_UDF = {
    "title": "Microsoft Learn — Execute user-defined functions",
    "url": "https://learn.microsoft.com/en-us/sql/relational-databases/user-defined-functions/execute-user-defined-functions?view=sql-server-ver17",
}
MS_TRANSACTIONS = {
    "title": "Microsoft Learn — Transactions (Transact-SQL)",
    "url": "https://learn.microsoft.com/en-us/sql/t-sql/language-elements/transactions-transact-sql?view=sql-server-ver17",
}
MS_LOCKING = {
    "title": "Microsoft Learn — Transaction locking and row versioning",
    "url": "https://learn.microsoft.com/en-us/sql/relational-databases/sql-server-transaction-locking-and-row-versioning-guide?view=sql-server-ver17",
}
MS_DEADLOCKS = {
    "title": "Microsoft Learn — Deadlocks guide",
    "url": "https://learn.microsoft.com/en-us/sql/relational-databases/sql-server-deadlocks-guide?view=sql-server-ver15",
}
PG_CREATE_TABLE = {
    "title": "PostgreSQL — CREATE TABLE and constraints",
    "url": "https://www.postgresql.org/docs/current/sql-createtable.html",
}

CHAPTER_CONTEXT: dict[int, str] = {
    1: "Chương này phân biệt dữ liệu, cơ sở dữ liệu, hệ quản trị CSDL (DBMS), mô hình dữ liệu, lược đồ và trạng thái dữ liệu. Cơ sở dữ liệu lưu dữ liệu có liên hệ; DBMS là phần mềm định nghĩa, truy vấn, cập nhật và bảo vệ dữ liệu đó.",
    2: "Mô hình ER mô tả yêu cầu ở mức khái niệm: thực thể là đối tượng cần lưu, thuộc tính mô tả thực thể hoặc mối quan hệ, còn lực lượng (cardinality) và participation diễn tả các ràng buộc kết hợp. Khóa của thực thể yếu thường ghép khóa bộ phận với khóa của thực thể chủ.",
    3: "Mô hình quan hệ biểu diễn dữ liệu bằng quan hệ (bảng), bộ (hàng), thuộc tính (cột) và miền giá trị. Khóa nhận diện bộ; khóa ngoại và các ràng buộc toàn vẹn ngăn dữ liệu tham chiếu sai hoặc vi phạm miền.",
    4: "Đại số quan hệ thao tác trên quan hệ: selection lọc hàng, projection chọn cột, join ghép bộ theo điều kiện, còn union/difference/intersection là các phép tập hợp. Cần phân biệt ngữ nghĩa tập hợp với bag/multiset vì bag cho phép bản sao và có quy tắc bội số riêng.",
    5: "SQL tách truy vấn dữ liệu (DML) khỏi định nghĩa cấu trúc (DDL) và quyền truy cập (DCL). Với SELECT, cần xác định bảng nguồn, điều kiện lọc, phép kết hợp, nhóm và điều kiện nhóm; các ràng buộc, view, thủ tục và trigger đảm nhiệm các vai trò khác nhau.",
    6: "QBE là ngôn ngữ truy vấn dạng bảng/mẫu: người dùng điền điều kiện và trường cần xuất vào một biểu mẫu thay vì viết toàn bộ truy vấn bằng cú pháp văn bản. Hãy xác định vùng điều kiện và vùng kết quả của mẫu.",
    7: "DBMS lưu dữ liệu lâu dài trên thiết bị lưu trữ theo trang/khối; thao tác đọc ghi đĩa thường đắt hơn xử lý trong bộ nhớ. Khi phân tích câu hỏi, phân biệt tệp dữ liệu với log và tập trung vào số lần I/O.",
    8: "Tổ chức tệp quyết định cách bản ghi nằm trên trang; chỉ mục ánh xạ giá trị khóa tìm kiếm tới vị trí bản ghi để giảm số trang phải đọc. Chỉ mục tăng tốc một số truy vấn nhưng tiêu tốn dung lượng và cần cập nhật khi dữ liệu thay đổi.",
    9: "Chỉ mục cây như B+ tree duy trì thứ tự khóa và cân bằng chiều cao khi chèn/xóa. Các nút trong dẫn đường tìm kiếm, còn các khóa/bản ghi ở lá hỗ trợ duyệt theo khoảng; đây là ưu thế so với băm khi cần range scan hoặc thứ tự.",
    10: "Chỉ mục băm đưa khóa qua hàm băm tới bucket và đặc biệt hiệu quả cho phép so sánh bằng. Băm không giữ thứ tự khóa nên thường không phù hợp để trả lời truy vấn khoảng hay sắp thứ tự.",
    11: "External sorting xử lý dữ liệu lớn hơn bộ nhớ bằng các lượt tạo run đã sắp xếp rồi trộn các run. Số trang bộ đệm quyết định số run có thể trộn trong một lượt và do đó ảnh hưởng mạnh đến số lượt I/O.",
    12: "Đánh giá toán tử quan hệ chọn thuật toán theo kích thước quan hệ, số trang, mức chọn lọc, thứ tự dữ liệu và chỉ mục sẵn có. Với join, nested-loop, sort-merge và hash join có chi phí/điều kiện phù hợp khác nhau; kích thước kết quả không đồng nhất với chi phí thực thi.",
    13: "Tối ưu hóa truy vấn biến biểu thức logic thành các kế hoạch tương đương rồi ước lượng chi phí để chọn kế hoạch có khả năng rẻ hơn. Đẩy selection/projection sớm và dùng thống kê có thể giảm dữ liệu trung gian, nhưng kế hoạch cụ thể phụ thuộc hệ quản trị và dữ liệu.",
    14: "Trong pipeline truy vấn, parser kiểm tra cú pháp và dựng cây; các bước phân tích ngữ nghĩa/tiền xử lý kiểm tra tên và kiểu; optimizer chọn kế hoạch; execution engine thực thi kế hoạch. Không nên nhầm vai trò biên dịch với vai trò chạy truy vấn.",
    15: "Chuẩn hóa dùng phụ thuộc hàm và khóa để giảm dư thừa cũng như bất thường cập nhật. Tính bao đóng thuộc tính để tìm khóa; 2NF loại phụ thuộc bộ phận vào một phần khóa ghép, 3NF xử lý phụ thuộc không khóa kiểu bắc cầu, còn BCNF yêu cầu mọi vế trái không tầm thường là siêu khóa.",
    16: "Thiết kế vật lý chọn chỉ mục, cách tổ chức tệp và các tối ưu theo workload thực tế. Denormalization hoặc thêm chỉ mục có thể giảm chi phí đọc nhưng đổi lại tăng lưu trữ, chi phí ghi và nguy cơ phải đồng bộ dữ liệu dư thừa.",
    17: "Bảo mật CSDL dựa trên xác thực và phân quyền theo nguyên tắc quyền tối thiểu. GRANT cấp quyền; REVOKE thu hồi; WITH GRANT OPTION cho phép người nhận tiếp tục cấp quyền trong phạm vi được cho.",
    18: "Giao dịch là một đơn vị công việc cần thỏa ACID: atomicity (trọn vẹn hoặc hủy), consistency (giữ ràng buộc), isolation (hạn chế ảnh hưởng xen kẽ), durability (đã commit thì bền vững qua sự cố). COMMIT và ROLLBACK kết thúc theo hai hướng khác nhau.",
    19: "Điều khiển đồng thời giữ lịch thực thi nhiều giao dịch tương đương một thứ tự an toàn. Khóa điều phối đọc/ghi; protocol như two-phase locking hỗ trợ serializability, còn phát hiện deadlock và xử lý các anomaly như lost update/dirty read là phần riêng.",
    20: "Khôi phục sau sự cố dùng log và các quy tắc ghi bền vững để đưa CSDL về trạng thái nhất quán. Write-ahead logging buộc ghi log cần thiết trước khi trang dữ liệu tương ứng được ghi; phục hồi thường phân tích, redo thao tác cần giữ và undo thao tác chưa commit.",
    21: "CSDL song song phân chia dữ liệu hoặc công việc giữa nhiều tài nguyên để tăng thông lượng/giảm thời gian; CSDL phân tán quản lý dữ liệu ở nhiều nút/mạng. Cần xét phân mảnh, nhân bản, chi phí truyền thông và điều phối giao dịch.",
    22: "CSDL Internet kết hợp ứng dụng web với lưu trữ/truy vấn dữ liệu; XML là dạng dữ liệu có cấu trúc phân cấp nhưng có thể linh hoạt hơn bảng cố định. DTD mô tả cấu trúc và các phần tử/thuộc tính hợp lệ; XML có thể được coi là dữ liệu bán cấu trúc.",
    23: "Decision support và OLAP phục vụ phân tích, tổng hợp và báo cáo trên khối lượng dữ liệu lớn; chúng khác với OLTP vốn ưu tiên ghi nhận các giao dịch ngắn, thường xuyên. Kho dữ liệu, chiều phân tích và phép tổng hợp hỗ trợ câu hỏi quản trị.",
    24: "Khai phá dữ liệu tìm mẫu, quy luật hoặc mô hình có ích trong dữ liệu, chẳng hạn phân lớp, gom cụm hay luật kết hợp. Đây là bước phân tích suy ra tri thức, khác với truy vấn chỉ lấy các hàng thỏa điều kiện đã biết.",
    25: "CSDL đối tượng và đối tượng-quan hệ đưa khái niệm kiểu do người dùng định nghĩa, giá trị phức hợp hoặc đặc tính đối tượng vào hệ quản trị quan hệ. Mục tiêu là biểu diễn kiểu ứng dụng gần hơn mà vẫn tận dụng lưu trữ/truy vấn quan hệ.",
    26: "Quản lý dữ liệu không gian xử lý điểm, vùng và quan hệ hình học như giao nhau/gần nhau. Chỉ mục không gian như R-tree gom các vùng bao để loại nhanh đối tượng chắc chắn không thỏa truy vấn không gian.",
    27: "CSDL suy diễn dùng facts và rules để suy ra facts mới; Datalog thường biểu diễn head :- body, trong đó body là các điều kiện cần đồng thời đúng. Truy vấn đệ quy được tính lặp tới điểm cố định, nên cần kiểm tra biến, phép nối và điều kiện lọc trên từng bộ.",
    28: "Chương bổ sung gom các chủ đề mở rộng như CSDL thời gian, di động, đa phương tiện, bộ nhớ chính và tích hợp nhiều nguồn. Trả lời cần dựa vào đặc điểm chuyên biệt được nêu trong câu, không áp máy móc giả định của bảng quan hệ truyền thống.",
}

CHAPTER_REFS: dict[int, list[dict[str, str]]] = {
    1: [BOOK, MIT], 2: [BOOK, MIT], 3: [BOOK, MIT], 4: [BOOK, PURDUE],
    5: [BOOK, MS_SELECT, MS_CREATE_TABLE], 6: [BOOK, PURDUE],
    7: [BOOK, PURDUE], 8: [BOOK, PURDUE], 9: [BOOK, PURDUE], 10: [BOOK, PURDUE],
    11: [BOOK, PURDUE], 12: [BOOK, PURDUE], 13: [BOOK, MIT, PURDUE],
    14: [BOOK, MIT], 15: [BOOK, MIT], 16: [BOOK, PURDUE],
    17: [BOOK, MS_GRANT], 18: [BOOK, MIT, PURDUE], 19: [BOOK, MIT, PURDUE],
    20: [BOOK, MIT, PURDUE], 21: [BOOK, MIT, PURDUE], 22: [BOOK], 23: [BOOK, MIT],
    24: [BOOK], 25: [BOOK], 26: [BOOK], 27: [BOOK], 28: [BOOK],
}

RULES: list[tuple[re.Pattern[str], str]] = [
    (re.compile(r"\bDBMS stands for|full form of DBMS|collection of programs.*create and maintain database", re.I), "DBMS là viết tắt của Database Management System, tức hệ quản trị cơ sở dữ liệu. Nó cung cấp chức năng định nghĩa, lưu trữ, truy vấn, cập nhật và quản lý quyền trên CSDL; DBMS là phần mềm, còn database là dữ liệu được phần mềm quản lý."),
    (re.compile(r"database administrator|\bDBA\b", re.I), "Database administrator (DBA) chịu trách nhiệm quản trị và vận hành CSDL, bao gồm tổ chức schema, quyền truy cập, sao lưu/khôi phục và hiệu năng. DBA quản lý cấu trúc/hệ thống chứ không phải một bảng dữ liệu hay ngôn ngữ truy vấn."),
    (re.compile(r"what is information|collection of processed data", re.I), "Information là dữ liệu đã được xử lý/diễn giải để có ý nghĩa đối với mục tiêu sử dụng. Dữ liệu thô là các giá trị ghi nhận ban đầu; sau khi được tổng hợp hoặc đặt vào ngữ cảnh, chúng có thể trở thành thông tin."),
    (re.compile(r"conceptual model", re.I), "Mô hình khái niệm mô tả dữ liệu và quy tắc nghiệp vụ ở mức độc lập với chi tiết cài đặt cụ thể. Vì vậy, nó được dùng để trao đổi yêu cầu trước khi quyết định DBMS, cấu trúc tệp hay cấu hình phần cứng."),
    (re.compile(r"limitations on what the data|constraints on the data|\bconstraint\b.*data model", re.I), "Constraint là quy tắc giới hạn giá trị/hình dạng dữ liệu hợp lệ, như miền giá trị, khóa hoặc tham chiếu. Operations mô tả thao tác trên dữ liệu, còn structure mô tả thành phần dữ liệu; constraint trả lời trực tiếp câu hỏi “giá trị nào được phép”."),
    (re.compile(r"how many data models mentioned|models mentioned in our database course", re.I), "Đây là câu đếm theo phạm vi giáo trình cụ thể, không có một con số phổ quát cho mọi môn CSDL. Đối chiếu danh sách mô hình đã được giảng/ghi trong đề cương của học phần; đáp án giữ nguyên theo khóa nguồn, còn phần giải thích không khẳng định ngoài phạm vi tài liệu môn."),
    (re.compile(r"ER diagram|E.?R.? diagram|E.?R.? model|three principle element types", re.I), "ER diagram mô tả các entity set, thuộc tính và relationship set, cùng các ràng buộc cần thiết. Nó tập trung vào đối tượng dữ liệu và liên kết giữa chúng, không mô tả luồng xử lý/chương trình như sơ đồ quy trình."),
    (re.compile(r"composite attribute", re.I), "Composite attribute gồm các thành phần có ý nghĩa riêng, chẳng hạn FullName tách thành FirstName và LastName. Khi ánh xạ sang quan hệ, thường lưu các thành phần nguyên tố thành các cột riêng để truy vấn/sắp lọc từng phần."),
    (re.compile(r"derived attribute|dashed oval", re.I), "Trong ký hiệu ER phổ biến, thuộc tính dẫn xuất (derived) được vẽ bằng oval nét đứt vì giá trị có thể tính từ thuộc tính khác, ví dụ tuổi tính từ ngày sinh. Nó khác thuộc tính đa trị (oval kép) hoặc khóa (thường gạch dưới)."),
    (re.compile(r"two entities.*same attribute name|share the same attribute name", re.I), "Khi hai thuộc tính trùng tên nhưng khác ý nghĩa, đổi tên để tên cột biểu đạt đúng ngữ nghĩa và tránh nhập nhằng khi nối/ánh xạ schema. Chỉ giữ cùng tên khi chúng thật sự biểu diễn cùng một khái niệm tương thích."),
    (re.compile(r"what is the entity|what is an entity|\bentity in the entity.relationship", re.I), "Entity là một đối tượng/sự vật có thể phân biệt trong miền ứng dụng và cần lưu thông tin; entity set là tập các entity cùng loại. Ví dụ một sinh viên cụ thể là entity, còn Student là entity set/type."),
    (re.compile(r"diagram.*model entities|which diagram.*entities and relationships", re.I), "Sơ đồ ER/E-R dùng để mô hình hóa entity và relationship ở mức khái niệm. Khi một câu hỏi hỏi quan hệ giữa các entity, đó là liên kết dữ liệu; sơ đồ không nhằm biểu diễn quan hệ giữa các tiến trình thực thi."),
    (re.compile(r"binary relationship|multi.way relationship|association between classes", re.I), "Binary relationship/association nối hai kiểu thực thể/lớp; n-ary relationship có từ ba kiểu tham gia trở lên. Phân loại theo số entity set/class trong chính liên kết, không theo số thuộc tính của chúng."),
    (re.compile(r"entity set.*attributes.*relationship|entity sets?, attributes?, and relationships?", re.I), "Ba thành phần nền tảng của ER là entity set, attribute và relationship set. Entity mô tả loại đối tượng, attribute mô tả dữ liệu của đối tượng/liên kết, relationship biểu diễn kết nối giữa entity set."),
    (re.compile(r"composite attributes represented in the relational model", re.I), "Thuộc tính phức hợp được tách thành các thuộc tính thành phần khi ánh xạ sang bảng quan hệ để mỗi cột giữ một giá trị nguyên tố theo thiết kế. Ví dụ địa chỉ có thể tách thành đường, thành phố và mã bưu chính."),
    (re.compile(r"\bset and list\b|order of.*tuples|relation is a set of tuples|rows.*order", re.I), "Quan hệ theo mô hình toán học là tập các tuple nên thứ tự hàng không mang ý nghĩa; đổi vị trí hàng không đổi quan hệ. List thì có thứ tự, vì vậy không đồng nhất hai cấu trúc; thứ tự chỉ được đảm bảo trong kết quả SQL khi có ORDER BY."),
    (re.compile(r"\ba key\b|key identifies a row|identify.*tuple", re.I), "Khóa là thuộc tính hoặc tập thuộc tính dùng để nhận diện duy nhất một bộ/hàng. Khóa có thể gồm một hay nhiều cột, nên không bắt buộc luôn là cột đơn hoặc luôn gồm nhiều cột; nó cũng không “nhận diện một cột”."),
    (re.compile(r"rows of a relation|rows.*relation.*called|\btuples\b", re.I), "Các hàng dữ liệu của một relation được gọi là tuple; header chứa tên thuộc tính không phải tuple dữ liệu. Trong bảng, tuple tương ứng một bản ghi, còn attribute tương ứng cột."),
    (re.compile(r"what is a relation in the relational model", re.I), "Relation là một bảng logic gồm các tuple cùng schema; mỗi tuple có giá trị cho các thuộc tính đã định nghĩa. Theo lý thuyết tập hợp, thứ tự hàng không xác định quan hệ, dù DBMS có thể trả kết quả theo một thứ tự tình cờ nếu không dùng ORDER BY."),
    (re.compile(r"operation.*not typically associated with relational data manipulation|deleting attributes", re.I), "DML thao tác trên các tuple: INSERT thêm hàng, UPDATE sửa giá trị hàng và DELETE xóa hàng. Thêm/xóa thuộc tính làm thay đổi schema nên thuộc DDL/ALTER TABLE, không phải xóa dữ liệu hàng."),
    (re.compile(r"\bNULL\b|unknown.*boolean|absence of data|IS NULL", re.I), "NULL biểu thị thiếu/không biết/không áp dụng, không phải số 0 hay chuỗi rỗng. So sánh với NULL bằng `=` không cho TRUE/FALSE mà cho UNKNOWN; dùng `IS NULL`/`IS NOT NULL`. Trong logic ba giá trị, AND/OR/NOT phải được tính theo cả trạng thái UNKNOWN."),
    (re.compile(r"wildcard|pattern matching|\bESCAPE\b|zero or more characters", re.I), "Trong LIKE của SQL Server, `%` khớp 0 hoặc nhiều ký tự và `_` khớp đúng một ký tự. ESCAPE cho phép coi ký tự wildcard như ký tự thường bằng cách đặt trước chúng một ký tự thoát; nó không thay thế mẫu bằng chuỗi bất kỳ."),
    (re.compile(r"\bNOT NULL\b|value always have some value|always has a value", re.I), "NOT NULL là constraint cấm giá trị NULL ở cột, phù hợp khi mỗi hàng bắt buộc phải có giá trị. Nó không tự bảo đảm giá trị duy nhất (UNIQUE/PRIMARY KEY) và cũng không kiểm tra miền/range như CHECK."),
    (re.compile(r"\bALTER TABLE\b|update a relation.s schema|modify the structure of an existing table|add a new column", re.I), "ALTER TABLE thay đổi định nghĩa bảng đã tồn tại, như thêm cột hoặc sửa cấu hình cột/ràng buộc theo cú pháp của DBMS. Nó khác UPDATE, vốn sửa các giá trị trong những hàng hiện hữu; cú pháp chính xác có thể khác giữa SQL Server và chuẩn SQL."),
    (re.compile(r"which statement best describes the DELETE command|best describes the DELETE command", re.I), "DELETE loại bỏ các hàng thỏa điều kiện WHERE; bỏ WHERE thì có thể xóa mọi hàng nhưng vẫn giữ cấu trúc bảng. Đây khác DROP TABLE (xóa đối tượng bảng) và UPDATE (sửa giá trị); có thể xóa một hoặc nhiều hàng trong cùng một bảng."),
    (re.compile(r"GetLaptopPrice|function return.*model|what will this function return", re.I), "Hàm vô hướng `dbo.GetLaptopPrice(1)` nhận mã model 1 rồi trả về cột `price` của hàng Laptop có model đó. Đối số truyền vào là điều kiện tìm model, không phải tốc độ/RAM/ổ cứng; giá trị số cụ thể phụ thuộc dữ liệu bảng."),
    (re.compile(r"delete a user.defined function|DROP FUNCTION", re.I), "DROP FUNCTION xóa đối tượng hàm do người dùng định nghĩa; tên hàm/schema cần chỉ đúng đối tượng. ALTER FUNCTION sửa định nghĩa còn EXECUTE gọi hàm/thủ tục, nên không dùng để loại bỏ hàm."),
    (re.compile(r"\bcursor\b", re.I), "Cursor cho phép duyệt kết quả theo từng hàng và chỉ nên dùng khi xử lý từng bản ghi là cần thiết hoặc không thể biểu diễn gọn bằng thao tác tập hợp. Với INSERT/UPDATE/DELETE hàng loạt, truy vấn set-based thường đơn giản và hiệu quả hơn."),
    (re.compile(r"local variable|@@ sign|@ sign|T.SQL", re.I), "Trong T-SQL, biến cục bộ do người dùng khai báo bắt đầu bằng một dấu `@` (ví dụ `@count`); tên bắt đầu `@@` được dùng cho các hàm/biến hệ thống. Đừng nhầm tiền tố biến cục bộ với các biến hệ thống như `@@ROWCOUNT`."),
    (re.compile(r"\bNVARCHAR\b|Vietnamese name|Vietnamese.*SQL Server", re.I), "NVARCHAR lưu văn bản Unicode nên phù hợp với tiếng Việt có dấu; VARCHAR không Unicode có thể phụ thuộc code page. Kích thước trong ngoặc là giới hạn số đơn vị ký tự theo SQL Server, cần chọn dựa trên độ dài dữ liệu thực tế."),
    (re.compile(r"\bJDBC\b|\bStatement\b.*execute SQL|execute SQL queries and update statements", re.I), "Trong JDBC, Statement đại diện câu lệnh SQL gửi tới DBMS; PreparedStatement phù hợp khi truy vấn có tham số và giúp tách giá trị khỏi câu lệnh. ResultSet thường chứa các hàng trả về từ truy vấn SELECT."),
    (re.compile(r"MAXRECURSION|recursive CTE|recursion 100", re.I), "Trong SQL Server, MAXRECURSION đặt giới hạn mức đệ quy của CTE để ngăn vòng lặp vô hạn. Nếu truy vấn cần vượt giới hạn cấu hình, nó phát sinh lỗi/không trả về kết quả thành công đầy đủ; không nên suy luận rằng mọi mức vượt giới hạn vẫn được trả như một kết quả hoàn chỉnh."),
    (re.compile(r"INSTEAD OF DELETE trigger", re.I), "INSTEAD OF DELETE trigger chạy thay cho thao tác DELETE thông thường trên đối tượng được gắn trigger. Trigger có thể kiểm tra hoặc thay đổi hành động; nó khác AFTER trigger, vốn chạy sau khi thao tác gốc được thực hiện."),
    (re.compile(r"constraint has a name|modify or delete an existing constraint", re.I), "Muốn sửa/xóa một constraint cụ thể, cần định danh constraint đó để phát lệnh ALTER TABLE DROP CONSTRAINT hoặc thao tác tương ứng. Đặt tên tường minh khi tạo giúp quản trị ổn định hơn so với tên tự sinh phụ thuộc môi trường."),
    (re.compile(r"drop command operates|delete command operates|how many relations", re.I), "Một câu lệnh DELETE tác động lên một target table/relation trong mỗi câu lệnh, dù có thể xóa nhiều hàng của bảng đó theo WHERE. Các hàng tham chiếu ở bảng khác chỉ bị ảnh hưởng nếu có cascade/trigger được cấu hình."),
    (re.compile(r"relational algebra|\bunion\b|\bintersect\b|\bdifference\b", re.I), "Phép tập hợp trên quan hệ cần so sánh các tuple theo thuộc tính tương ứng; union lấy hợp, intersection lấy phần chung và difference lấy phần có ở vế trái mà không có ở vế phải. Trước tiên kiểm tra tính tương thích schema, sau đó áp phép theo đúng hướng/toán tử."),
    (re.compile(r"trivial", re.I), "Để xác định một ràng buộc/phụ thuộc tầm thường, kiểm tra xem nó có đúng chỉ từ định nghĩa tập thuộc tính của quan hệ hay không, không cần giả định thêm về dữ liệu. Với MVD X ↠ Y, điều kiện tầm thường là Y ⊆ X hoặc X ∪ Y bằng toàn bộ thuộc tính; cần phân biệt ký hiệu ↠ với phụ thuộc hàm →."),
    (re.compile(r"\bA determines both attributes B and C|A.*determines.*B.*C", re.I), "Nếu A xác định đồng thời B và C thì theo quy tắc phân rã của phụ thuộc hàm, A → B và A → C đều suy ra; theo quy tắc hợp, có thể viết A → BC. Đây là hệ quả trực tiếp của ý nghĩa “cùng A thì cùng giá trị của mọi thuộc tính ở vế phải”."),
    (re.compile(r"what is database normalization|database normalization", re.I), "Normalization tổ chức/ phân rã quan hệ dựa trên phụ thuộc và khóa để giảm dư thừa, tránh bất thường khi thêm/sửa/xóa. Không phải mục tiêu đơn thuần là tăng tốc hay tăng bảo mật; sau khi phân rã còn cần kiểm tra khả năng ghép nối không mất mát."),
    (re.compile(r"NoSQL database|not based on the relational model", re.I), "MongoDB là hệ quản trị NoSQL thiên về tài liệu JSON/BSON, nên không dựa vào quan hệ bảng hàng-cột như MySQL, PostgreSQL hay Oracle. “NoSQL” không có nghĩa là không thể truy vấn; nó chỉ chỉ một nhóm mô hình lưu trữ khác quan hệ truyền thống."),
    (re.compile(r"all of the others|none of the others|all of the above|none of the above", re.I), "Với lựa chọn tổng hợp, không chọn theo cảm tính: kiểm tra từng phát biểu độc lập. “All of the others/above” chỉ đúng khi mọi phát biểu còn lại đúng; “None” chỉ đúng khi không phát biểu nào trong nhóm thỏa yêu cầu. Đáp án lưu cần được đọc cùng các mệnh đề thành phần."),
    (re.compile(r"three-tier|three tier|database tier|application tier|presentation tier", re.I), "Kiến trúc ba tầng tách giao diện (presentation), xử lý nghiệp vụ (application) và lưu trữ/truy vấn dữ liệu (database). Xác định tầng được hỏi đang nhận yêu cầu từ tầng nào và thực hiện trách nhiệm nào; không gán xử lý giao diện hay nghiệp vụ cho tầng dữ liệu."),
    (re.compile(r"\bDDL\b|\bDML\b|\bDCL\b|language for defining data structure", re.I), "DDL (Data Definition Language) khai báo/thay đổi cấu trúc như bảng và schema; DML truy vấn/thêm/sửa/xóa dữ liệu; DCL quản lý quyền. Chọn theo đối tượng bị tác động: cấu trúc, các hàng hay quyền truy cập."),
    (re.compile(r"aggregate function|aggregation function|calculation on a set of", re.I), "Aggregate function tính một kết quả từ một tập nhiều hàng/giá trị, ví dụ COUNT, SUM, AVG, MIN và MAX. Trong truy vấn nhóm, GROUP BY xác định từng tập đầu vào; HAVING lọc các nhóm sau khi tính tổng hợp."),
    (re.compile(r"data integrity|integrity constraint|integrity ensures", re.I), "Toàn vẹn dữ liệu nghĩa là các giá trị vẫn chính xác, hợp lệ và nhất quán với ràng buộc. Khôi phục sau lỗi, xử lý nhiều truy vấn đồng thời và mã hóa bảo mật là các khả năng quan trọng khác của DBMS nhưng không phải định nghĩa trực tiếp của integrity."),
    (re.compile(r"association class|attributes on a relationship", re.I), "Association class gắn thuộc tính với chính mối liên kết giữa các lớp, thay vì với riêng một lớp tham gia. Trong mô hình ER, điều này tương ứng thuộc tính của relationship set, chẳng hạn ngày bắt đầu gắn với quan hệ nhân viên–dự án."),
    (re.compile(r"many.to.many|many to many|new relation.*primary keys|relationship.*logical", re.I), "Khi chuyển ER sang quan hệ, quan hệ nhiều-nhiều thường cần một bảng kết nối riêng; bảng này mang khóa của các thực thể tham gia làm khóa ngoại và thường ghép chúng thành khóa chính. Quan hệ một-nhiều thường có thể biểu diễn bằng khóa ngoại ở phía nhiều."),
    (re.compile(r"\bCartesian product\b|\bCartesian\b|cross product", re.I), "Tích Descartes tạo một bộ cho mỗi cặp (một hàng từ quan hệ thứ nhất, một hàng từ quan hệ thứ hai). Vì thế nếu hai đầu vào có m và n hàng thì kết quả có m×n hàng; điều kiện join thường lọc bớt các cặp này."),
    (re.compile(r"intersection operator|\bintersection\b", re.I), "Intersection trả về các tuple xuất hiện chung ở cả hai quan hệ. Nó không trả về phần khác nhau (difference), toàn bộ tuple (union) hay các bản sao lặp chỉ vì một tuple xuất hiện nhiều lần trong bag; cần chú ý ngữ nghĩa set/bag của câu hỏi."),
    (re.compile(r"relation schema|schema for the table|schema of the table", re.I), "Lược đồ quan hệ ghi tên quan hệ kèm danh sách thuộc tính, thường theo dạng `Boat(BoatID, BoatName, Color, Status)`. Nếu đề hỏi schema thuần túy, không nhất thiết phải kèm kiểu dữ liệu hay các bộ dữ liệu đang lưu."),
    (re.compile(r"\bRDBMS\b|relational database management system consist", re.I), "RDBMS tổ chức dữ liệu logic thành các bảng/quan hệ gồm hàng và cột, liên kết bằng khóa và được truy vấn bằng SQL. Record/tuple là hàng trong một bảng; một collection of tables mô tả cấu trúc tổng thể phù hợp hơn một collection of records."),
    (re.compile(r"\bde.normalization\b|\bdenormalization\b", re.I), "Denormalization chủ động chấp nhận một phần dư thừa hoặc lưu trước kết quả để giảm join/tính toán ở workload đọc. Nó có thể tăng tốc truy xuất, nhưng làm tăng dung lượng và buộc hệ thống cập nhật đồng bộ các bản sao; đây là quyết định theo workload, không phải quy tắc luôn có lợi."),
    (re.compile(r"goal of decomposition|decomposition when designing", re.I), "Decomposition tách một quan hệ thành các quan hệ nhỏ hơn để giảm dư thừa và các bất thường chèn/sửa/xóa. Một phép tách tốt còn cần lossless join (ghép lại không sinh tuple giả); tùy bài toán còn xét bảo toàn phụ thuộc."),
    (re.compile(r"armstrong.*axiom|transitivity", re.I), "Tiên đề bắc cầu của Armstrong: nếu X → Y và Y → Z thì suy ra X → Z. Phải kiểm tra hai phụ thuộc nối tiếp cùng vế giữa Y; các tiên đề phản xạ và tăng trưởng mô tả quy tắc khác."),
    (re.compile(r"rule 1: if A.*C then C.*A.*rule 2: if B.*C.*BC.*C.*rule 3: if AB.*C.*A.*C and B.*C", re.I), "Rule 1 không hợp lệ vì phụ thuộc A → C không cho phép đảo chiều thành C → A. Rule 2 hợp lệ do C nằm trong BC nên BC → C đúng theo phản xạ; Rule 3 không hợp lệ vì không thể tự ý bỏ A hoặc B khỏi vế trái AB → C. Do đó các rule sai là 1 và 3."),
    (re.compile(r"given following schema.*\{A.*B.*BC.*C.*D.*compute.*\{A\}\+", re.I), "Tính bao đóng bằng cách bắt đầu A⁺ = {A}, rồi áp dụng lần lượt mọi phụ thuộc có toàn bộ vế trái đã nằm trong bao đóng. Ký hiệu phụ thuộc ở nguồn có vẻ bị thiếu mũi tên sau `BC`; nếu ý nguồn là A → B, B → C, C → D thì suy ra A⁺ = {A,B,C,D} theo chuỗi bắc cầu. Cần đối chiếu bản đề gốc để xác nhận phần ký hiệu bị thiếu trước khi chốt đáp án."),
    (re.compile(r"3NFconcept|3NF concept|third normal form.*related", re.I), "3NF tập trung loại phụ thuộc bắc cầu của thuộc tính không khóa vào khóa, đồng thời có ngoại lệ cho phụ thuộc khi vế phải là thuộc tính prime. Phân biệt với 2NF, vốn nhắm tới phụ thuộc bộ phận vào một phần của khóa ghép."),
    (re.compile(r"how many data models mentioned|models mentioned in our database course", re.I), "Đây là câu đếm theo phạm vi giáo trình cụ thể, không có một con số phổ quát cho mọi môn CSDL. Đối chiếu danh sách mô hình đã được giảng/ghi trong đề cương của học phần; đáp án giữ nguyên theo khóa nguồn, còn phần giải thích không khẳng định ngoài phạm vi tài liệu môn."),
    (re.compile(r"what is a database|best defines a database|collection of data.*specific purpose|collection of information.*managed", re.I), "Cơ sở dữ liệu là tập dữ liệu/thông tin có liên hệ, được tổ chức và duy trì để phục vụ một mục đích; DBMS là phần mềm quản lý tập dữ liệu ấy. Vì vậy, database không đồng nghĩa với một tệp đơn lẻ, một lần chụp dữ liệu (instance) hay phần mềm quản trị."),
    (re.compile(r"graph database|graph data model|network data model|hierarchical data model", re.I), "Mô hình đồ thị/mạng biểu diễn đối tượng thành nút và liên kết thành cạnh; mô hình phân cấp thường tổ chức quan hệ cha-con dạng cây. Hãy dựa vào cấu trúc liên kết được mô tả để phân biệt, không chỉ nhìn thấy từ “node”."),
    (re.compile(r"\bdata model\b|\bmodel for data\b", re.I), "Data model là bộ khái niệm dùng để mô tả cấu trúc dữ liệu, quan hệ giữa dữ liệu và các ràng buộc. Relational, hierarchical, network và graph là các mô hình có thật; cần chọn mô hình khớp đặc điểm được hỏi, không nhầm mô hình với DBMS hay ngôn ngữ thao tác."),
    (re.compile(r"\bschema instance\b|relation name.*attributes|schema of r|what is a schema|a .* schema.*relation", re.I), "Schema mô tả cấu trúc tương đối ổn định (tên quan hệ, thuộc tính và kiểu/ràng buộc); instance là các bộ dữ liệu hiện có tại một thời điểm. Câu hỏi định nghĩa relation name cùng các thuộc tính đang hỏi schema, không phải nội dung hàng hiện tại."),
    (re.compile(r"\btuple\b|\brow in a relational|\brow of a table\b", re.I), "Trong quan hệ, mỗi hàng dữ liệu là một tuple (bộ), mỗi cột là attribute (thuộc tính), còn relation là tập/bag các tuple theo một schema. Dùng đúng thuật ngữ này giúp tránh nhầm hàng với trường/cột hoặc toàn bộ bảng."),
    (re.compile(r"\bweak entit|thực thể yếu", re.I), "Thực thể yếu chưa có khóa độc lập; phải ghép khóa bộ phận của nó với khóa của thực thể chủ qua quan hệ định danh. Vì vậy, chỉ lấy thuộc tính của chủ hoặc chỉ lấy khóa bộ phận đều chưa nhận diện duy nhất được nó."),
    (re.compile(r"\baggregation\b|\bcomposition\b", re.I), "Trong UML, composition biểu thị sở hữu mạnh: vòng đời phần phụ thuộc chủ thể sở hữu; aggregation biểu thị quan hệ whole–part yếu hơn và phần có thể tồn tại độc lập. Hãy đối chiếu phương án với điều kiện vòng đời được nêu."),
    (re.compile(r"\bentity.relationship diagram\b|\bERD\b|\bentity set\b|\bcardinalit|participation constraint", re.I), "Khi đọc mô hình ER, tách ba thứ: entity set là loại đối tượng, relationship set là liên kết giữa các loại đối tượng, còn cardinality/participation là ràng buộc số lượng hoặc mức tham gia. Đáp án đúng phải gọi đúng thành phần mà câu hỏi mô tả."),
    (re.compile(r"\bforeign key\b|referential integrity", re.I), "Khóa ngoại buộc giá trị tham chiếu phải khớp một khóa được tham chiếu ở quan hệ đích (hoặc NULL nếu ràng buộc cho phép). Đây là toàn vẹn tham chiếu; nó khác tính duy nhất của primary/candidate key."),
    (re.compile(r"\b1nf\b|\b2nf\b|\b3nf\b|\bbcnf\b|normal form|normalize", re.I), "Đánh giá dạng chuẩn theo thứ tự: 1NF yêu cầu giá trị nguyên tố/không lặp theo mô hình quan hệ; 2NF loại phụ thuộc bộ phận của thuộc tính không khóa vào một phần khóa ghép; 3NF kiểm soát phụ thuộc bắc cầu theo điều kiện prime attribute; BCNF yêu cầu mọi determinant không tầm thường là siêu khóa."),
    (re.compile(r"\bprimary key\b|\bcandidate key\b|\bsuperkey\b|\bkey for r\b|\bkey of r\b", re.I), "Kiểm tra khóa bằng hai tiêu chí: tập thuộc tính phải xác định duy nhất mọi bộ (tính siêu khóa), và nếu là candidate key thì phải tối thiểu, tức bỏ bất kỳ thuộc tính nào cũng mất tính duy nhất. PRIMARY KEY chọn một candidate key và không nhận NULL."),
    (re.compile(r"trivial.*dependenc|dependenc.*trivial|trivial.*\bFD\b", re.I), "Phụ thuộc hàm X → Y là tầm thường khi Y ⊆ X; phụ thuộc đa trị X ↠ Y là tầm thường khi Y ⊆ X hoặc X ∪ Y bao phủ toàn bộ thuộc tính của quan hệ. Hãy đọc đúng loại mũi tên và kiểm tra bao hàm/tập thuộc tính trước khi chọn."),
    (re.compile(r"\bfunctional dependenc|\bFDs?\b|\bclosure\b|\bcanonical cover\b", re.I), "Với phụ thuộc X → Y, mọi hai bộ có cùng giá trị X phải có cùng giá trị Y. Để kiểm tra khóa, tính X⁺ bằng cách áp dụng lặp các phụ thuộc; nếu bao đóng chứa toàn bộ thuộc tính thì X là siêu khóa, sau đó kiểm tra tính tối thiểu."),
    (re.compile(r"\bview\b|virtual table", re.I), "View là quan hệ ảo được định nghĩa bằng truy vấn trên một hay nhiều bảng/view; thông thường nó lưu định nghĩa truy vấn chứ không lưu bản sao kết quả như materialized view. Do đó đáp án phải chỉ đối tượng được tạo từ truy vấn, không nhầm với bảng vật lý."),
    (re.compile(r"\bdrop table\b|remove a relation|remove.*table", re.I), "DROP TABLE loại bỏ định nghĩa bảng cùng dữ liệu phụ thuộc theo quy tắc DBMS; DELETE xóa các hàng nhưng giữ bảng, còn TRUNCATE xóa nhanh toàn bộ hàng trong khi vẫn giữ cấu trúc. Cần chọn lệnh đúng cấp độ tác động."),
    (re.compile(r"\bdelete\b.*\btruncate\b|\btruncate\b.*\bdelete\b", re.I), "DELETE là thao tác DML xóa hàng (có thể lọc bằng WHERE); TRUNCATE làm rỗng bảng theo cơ chế riêng của hệ quản trị; DROP xóa chính đối tượng bảng. Phân biệt phạm vi thay đổi giúp loại các phương án gần nghĩa."),
    (re.compile(r"\bgrant\b|\bprivilege|authorization|permission", re.I), "GRANT cấp một quyền xác định trên đối tượng cho principal/role. WITH GRANT OPTION mới cho phép người nhận chuyển tiếp quyền; quyền cấp không đồng nghĩa với quyền sở hữu bảng và có thể bị thu hồi theo cơ chế REVOKE."),
    (re.compile(r"\bjoin\b|outer join|natural join|dangling tuple", re.I), "Join ghép các bộ thỏa điều kiện. Inner join loại bộ không ghép được; LEFT/RIGHT OUTER JOIN giữ mọi bộ từ phía được chỉ định và điền NULL phía thiếu. Natural join tự ghép các thuộc tính trùng tên và chỉ xuất một cột cho mỗi thuộc tính ghép."),
    (re.compile(r"\bselect\b|\bquery\b|\bwhere\b|\bhaving\b|\bgroup by\b|\border by\b", re.I), "Đọc truy vấn theo các giai đoạn logic: FROM/JOIN tạo dữ liệu nguồn, WHERE lọc từng hàng, GROUP BY tạo nhóm, HAVING lọc nhóm, SELECT xác định biểu thức đầu ra và ORDER BY sắp kết quả. Với phép join, kiểm tra điều kiện ghép và các hàng không khớp trước khi tính kết quả."),
    (re.compile(r"\bunion\b|\bintersect\b|\bdifference\b|\bset relation|\bbag relation|multiset", re.I), "Phép tập hợp trên set loại bản sao và thường đòi hai quan hệ union-compatible. Với bag, cần theo dõi số lần xuất hiện của mỗi bộ; vì vậy không thể tự động áp dụng mọi đẳng thức tập hợp mà bỏ qua multiplicity."),
    (re.compile(r"\bselection\b|\bprojection\b|relational algebra|\btuple calculus\b|\bdomain calculus\b", re.I), "Selection (σ) giữ các bộ thỏa điều kiện; projection (π) giữ các thuộc tính được yêu cầu và theo ngữ nghĩa set có thể loại bộ trùng. Khi dịch biểu thức đại số sang SQL, ánh xạ điều kiện hàng vào WHERE và danh sách thuộc tính vào SELECT."),
    (re.compile(r"\btrigger\b", re.I), "Trigger là hành động do DBMS tự kích hoạt khi một sự kiện dữ liệu như INSERT, UPDATE hoặc DELETE xảy ra trên đối tượng đã khai báo. Nó khác stored procedure vốn thường được gọi tường minh; đáp án đúng cần thể hiện đúng sự kiện kích hoạt."),
    (re.compile(r"stored procedure|\bstored procedure\b|\bprocedure\b", re.I), "Stored procedure là tập lệnh SQL có tên lưu trong CSDL, được gọi để thực thi một thủ tục; nó có thể nhận tham số và chứa nhiều câu lệnh. Đừng nhầm với trigger tự chạy khi có sự kiện hoặc function có quy tắc trả về giá trị."),
    (re.compile(r"\bindex\b|\bindexes\b|\bindices\b", re.I), "Index lưu cấu trúc tra cứu phụ để tìm vị trí bản ghi nhanh hơn thay vì quét toàn bộ bảng. Bù lại, nó dùng thêm dung lượng và phải được duy trì khi INSERT/UPDATE/DELETE; vì thế “càng nhiều index càng tốt” không đúng cho mọi workload."),
    (re.compile(r"\bb\+?tree\b|tree.structured|\bISAM\b", re.I), "B+ tree giữ khóa theo thứ tự và cân bằng đường đi từ gốc tới lá; điều này hỗ trợ tìm kiếm bằng khóa lẫn truy vấn khoảng. Khi chèn/xóa làm nút tràn/thiếu, cây tách hoặc gộp nút để giữ cân bằng."),
    (re.compile(r"hash", re.I), "Hash index dùng hàm băm để định vị bucket theo khóa, nên phù hợp nhất với so sánh bằng. Vì bucket không duy trì thứ tự toàn cục, truy vấn khoảng hay ORDER BY thường cần cấu trúc khác hoặc bước sắp xếp riêng."),
    (re.compile(r"external sort|external sorting|\bmerge sort\b|\brun\b", re.I), "External merge sort chia dữ liệu thành các run đã sắp xếp vừa bộ nhớ, ghi ra đĩa rồi trộn nhiều run trong mỗi lượt. Phân tích bài toán bằng số trang bộ nhớ/đĩa và số lượt I/O; không giả định toàn bộ dữ liệu nằm trong RAM."),
    (re.compile(r"\boptimizer\b|\boptimization\b|query plan|query compiler", re.I), "Optimizer so sánh các kế hoạch tương đương dựa trên ước lượng như số hàng trung gian, độ chọn lọc, I/O và chi phí CPU. Parser dựng cấu trúc cú pháp; optimizer chọn kế hoạch; execution engine thực thi kế hoạch đã chọn."),
    (re.compile(r"\btransaction\b|\bacid\b|\batomicity\b|\bdurability\b|\bisolation\b|\bconsistency\b|\bcommit\b|\brollback\b", re.I), "Đối chiếu đúng thuộc tính ACID được hỏi: atomicity là tất-cả-hoặc-không; consistency giữ các ràng buộc; isolation kiểm soát ảnh hưởng giữa giao dịch đồng thời; durability bảo đảm giao dịch đã commit sống sót qua sự cố. COMMIT xác nhận, ROLLBACK hủy thay đổi chưa xác nhận."),
    (re.compile(r"\block\b|deadlock|lost update|dirty read|serializab|concurren", re.I), "Concurrency control điều phối lịch xen kẽ để tránh anomaly. Shared lock thường cho phép nhiều reader; exclusive lock bảo vệ cập nhật; hai giao dịch chờ tài nguyên vòng tròn có thể deadlock và DBMS thường phá vòng chờ bằng cách hủy/rollback một giao dịch."),
    (re.compile(r"\bcrash|recovery|write.ahead|\blog\b|checkpoint|redo|undo", re.I), "Phục hồi dùng log để xác định thay đổi nào cần redo và thay đổi nào cần undo sau sự cố. Quy tắc WAL yêu cầu bản ghi log bền vững trước khi ghi trang dữ liệu tương ứng; chỉ trạng thái giao dịch phù hợp mới được xem là đã commit."),
    (re.compile(r"\bDTD\b|\bXML\b|well.formed|markup|semi.structured", re.I), "XML biểu diễn dữ liệu phân cấp bằng phần tử/thuộc tính. Tài liệu well-formed tuân cú pháp XML; DTD mô tả cấu trúc/khai báo hợp lệ. Ký hiệu xuất hiện 0 hoặc 1 lần thường là `?` trong content model DTD, khác `*` (0 trở lên) và `+` (1 trở lên)."),
    (re.compile(r"\bDatalog\b|\bdeductive database\b|\brule\b.*\bH\(", re.I), "Trong Datalog, head của rule được suy ra khi mọi atom/điều kiện trong body đồng thời thỏa. Đặt từng tuple nguồn vào phép nối và lọc các điều kiện số học; chỉ giữ tuple thỏa toàn bộ body, không chỉ một điều kiện."),
    (re.compile(r"object.relational|user.defined type|\bUDT\b|inheritance|object.database", re.I), "Mô hình object-relational mở rộng quan hệ bằng kiểu do người dùng định nghĩa và một số khả năng biểu diễn dữ liệu phức hợp/đối tượng. Ý chính là bổ sung khả năng kiểu vào hệ quan hệ, không thay thế vai trò bảng, thuộc tính và ràng buộc."),
    (re.compile(r"transaction processing|\bOLTP\b|\bOLAP\b|decision support|\breport", re.I), "OLTP ghi nhận giao dịch nghiệp vụ ngắn và cập nhật thường xuyên; decision support/OLAP tập trung truy vấn phân tích, tổng hợp và báo cáo. Hãy phân loại theo mục đích thao tác chứ không theo việc cả hai cùng đọc dữ liệu."),
    (re.compile(r"database file|\.mdf|\.ldf|disk|page|block|storage", re.I), "Phân biệt tệp dữ liệu chứa trang/bảng với tệp transaction log ghi lại thay đổi phục vụ commit và recovery. Một trang/khối là đơn vị I/O cơ bản; lựa chọn tổ chức vật lý ảnh hưởng số lần đọc ghi và cách tìm bản ghi."),
    (re.compile(r"graph database|graph data model|network data model|hierarchical data model", re.I), "Mô hình đồ thị/mạng biểu diễn đối tượng thành nút và liên kết thành cạnh; mô hình phân cấp thường tổ chức quan hệ cha-con dạng cây. Hãy dựa vào cấu trúc liên kết được mô tả để phân biệt, không chỉ nhìn thấy từ “node”."),
]


def clean(value: str, limit: int = 200) -> str:
    text = " ".join((value or "").split())
    if len(text) <= limit:
        return text
    return text[: limit - 1].rstrip() + "…"


def source_context(question: dict[str, Any]) -> str:
    stem = question.get("question", "") or ""
    option_text = " ".join(o.get("text", "") for o in question.get("options", []))
    for pattern, rationale in RULES:
        if pattern.search(stem):
            return rationale
    for pattern, rationale in RULES:
        if pattern.search(option_text):
            return rationale
    return "Đọc kỹ từ khóa xác định phạm vi của câu hỏi, rồi đối chiếu định nghĩa/điều kiện đó với từng lựa chọn. Đáp án đã lưu phù hợp với yêu cầu; các lựa chọn khác mô tả một khái niệm lân cận hoặc không đáp ứng đầy đủ điều kiện được nêu."


def make_explanation(question: dict[str, Any]) -> str:
    keys = question.get("answer") or []
    options = {o.get("key"): clean(o.get("text", ""), 220) for o in question.get("options", [])}
    valid = [key for key in keys if key in options]
    if valid:
        answer_text = "; ".join(f"{key}. {options[key]}" for key in valid)
        lead = f"Đáp án theo dữ liệu đề: {', '.join(valid)} — {answer_text}."
    elif keys:
        lead = f"Đáp án lưu trong nguồn: {', '.join(keys)}. Tuy nhiên lựa chọn văn bản hiện có không chứa đủ phương án tương ứng; cần xem lại đề gốc trước khi coi đây là đáp án đã xác minh."
    else:
        lead = "Nguồn hiện không có khóa đáp án đọc được; phần dưới giải thích cách tiếp cận khái niệm, không tự suy đoán đáp án."

    parts = [lead]
    source_explanation = clean(question.get("sourceExplanation", ""), 1600)
    if source_explanation:
        parts.append(f"Lời giải gốc: {source_explanation}")
    parts.append(f"Nền tảng kiến thức: {CHAPTER_CONTEXT.get(question['chapter'], '')}")
    parts.append(f"Phân tích: {source_context(question)}")

    if question.get("questionMissing") or not question.get("question", "").strip():
        parts.append("Giới hạn nguồn: câu hỏi dạng văn bản bị thiếu; hãy đối chiếu hình/đề gốc đính kèm trước khi kết luận từ đáp án.")
    if not question.get("options"):
        parts.append("Giới hạn nguồn: các lựa chọn không có trong CSV dạng văn bản, vì vậy chưa thể giải thích vì sao từng phương án nhiễu sai.")
        if question.get("question", "").strip() and not re.search(r"[?]", question["question"]):
            parts.append("Giới hạn nguồn: phần văn bản có thể chỉ còn dữ liệu/bảng mà thiếu yêu cầu cần tính; cần mở đề gốc để xác định phép toán và kiểm tra kết quả cụ thể.")
    elif keys and not valid:
        parts.append("Giới hạn nguồn: đáp án lưu và các lựa chọn hiện có không khớp; giải thích này không xác nhận lại khóa đáp án.")
    elif len(question.get("options", [])) < 2:
        parts.append("Giới hạn nguồn: chỉ còn một lựa chọn văn bản nên phần loại trừ phương án nhiễu không thể kiểm tra.")
    elif valid:
        wrong = [o for o in question["options"] if o.get("key") not in valid]
        wrong_summary = "; ".join(f"{o.get('key')}. {clean(o.get('text', ''), 95)}" for o in wrong[:5])
        if wrong_summary:
            parts.append(f"Đối chiếu phương án: {wrong_summary}. Các lựa chọn này không đáp ứng định nghĩa/điều kiện được hỏi; khi ôn, hãy chỉ ra chính xác điểm lệch của từng lựa chọn thay vì học thuộc mỗi chữ cái.")

    return "\n\n".join(parts)


def references_for(question: dict[str, Any]) -> list[dict[str, str]]:
    chapter = question["chapter"]
    text = f"{question.get('question', '')} {' '.join(o.get('text', '') for o in question.get('options', []))}".casefold()
    if chapter == 5:
        references = [BOOK]
        if "cursor" in text:
            references.append(MS_CURSORS)
        elif "@@" in text or "variable" in text or "declare" in text:
            references.append(MS_VARIABLES)
        elif "like" in text or "wildcard" in text or "escape" in text:
            references.append(MS_LIKE)
        elif "trigger" in text:
            references.append(MS_TRIGGER)
        elif "drop function" in text:
            references.append(MS_DROP_FUNCTION)
        elif "nvarchar" in text or "unicode" in text or "vietnamese" in text:
            references.append(MS_DATA_TYPES)
        elif "null" in text or "unknown" in text:
            references.append(MS_NULL)
        elif "aggregate" in text or "group by" in text or "having" in text:
            references.append(MS_AGGREGATE)
        elif "delete" in text:
            references.append(MS_DELETE)
        elif "function" in text or "getlaptopprice" in text:
            references.append(MS_EXECUTE_UDF)
        elif "create table" in text or "constraint" in text or "primary key" in text:
            references.append(MS_CREATE_TABLE)
        else:
            references.append(MS_SELECT)
        return references[:3]
    if chapter == 3:
        return [BOOK, MIT, PG_CREATE_TABLE]
    if chapter == 18:
        return [BOOK, PURDUE, MS_TRANSACTIONS]
    if chapter == 19:
        if "deadlock" in text:
            return [BOOK, PURDUE, MS_DEADLOCKS]
        return [BOOK, PURDUE, MS_LOCKING]
    return CHAPTER_REFS.get(chapter, [BOOK])


def main() -> None:
    questions = json.loads(DATA.read_text(encoding="utf-8"))
    authored: dict[str, dict[str, Any]] = {}
    for question in questions:
        authored[question["id"]] = {
            "explanation": make_explanation(question),
            "references": references_for(question),
        }
    OUTPUT.write_text(json.dumps(authored, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Wrote detailed explanations and references for {len(authored)} questions to {OUTPUT}.")


if __name__ == "__main__":
    main()
