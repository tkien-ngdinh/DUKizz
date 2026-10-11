// Dữ liệu mock tĩnh – dùng cho FE demo, chưa kết nối BE.

export const featuredQuizzes = [
  {
    id: 'co-so-du-lieu-3',
    title: 'Cơ sở dữ liệu – Chuyên đề 3',
    subject: 'Cơ sở dữ liệu',
    level: 'Đại học',
    questionCount: 6,
    durationMinutes: 8,
    tone: 'sky',
    summary: 'Khoá chính, chuẩn hoá và truy vấn SQL căn bản.',
  },
  {
    id: 'giai-tich-1',
    title: 'Giải tích 1 – Giới hạn & đạo hàm',
    subject: 'Toán cao cấp',
    level: 'Đại học',
    questionCount: 12,
    durationMinutes: 15,
    tone: 'blush',
    summary: 'Tính giới hạn, quy tắc đạo hàm và ứng dụng.',
  },
  {
    id: 'mang-may-tinh',
    title: 'Mạng máy tính – Tầng giao vận',
    subject: 'Mạng máy tính',
    level: 'Đại học',
    questionCount: 10,
    durationMinutes: 12,
    tone: 'sky',
    summary: 'TCP/UDP, cổng dịch vụ và thiết lập kết nối.',
  },
  {
    id: 'tieng-anh-b1',
    title: 'Tiếng Anh B1 – Từ vựng học thuật',
    subject: 'Tiếng Anh',
    level: 'Trung cấp',
    questionCount: 20,
    durationMinutes: 20,
    tone: 'blush',
    summary: 'Từ vựng theo chủ đề và cấu trúc câu học thuật.',
  },
  {
    id: 'tu-tuong-hcm',
    title: 'Tư tưởng Hồ Chí Minh – Ôn thi',
    subject: 'Lý luận chính trị',
    level: 'Đại học',
    questionCount: 15,
    durationMinutes: 18,
    tone: 'sky',
    summary: 'Các mốc nội dung trọng tâm theo giáo trình.',
  },
  {
    id: 'lap-trinh-c',
    title: 'Lập trình C – Con trỏ & mảng',
    subject: 'Kỹ thuật phần mềm',
    level: 'Cơ bản',
    questionCount: 8,
    durationMinutes: 10,
    tone: 'blush',
    summary: 'Cấp phát động, con trỏ và xử lý mảng.',
  },
]

export const quizDetail = {
  id: 'co-so-du-lieu-3',
  title: 'Cơ sở dữ liệu – Chuyên đề 3',
  subject: 'Cơ sở dữ liệu',
  level: 'Đại học',
  durationMinutes: 8,
  questions: [
    {
      id: 'q1',
      prompt: 'Khoá chính (primary key) của một bảng có đặc điểm nào sau đây?',
      options: [
        'Cho phép trùng giá trị nhưng không cho phép rỗng',
        'Không được trùng và không được rỗng',
        'Được rỗng nhưng không được trùng',
        'Vừa được trùng vừa được rỗng',
      ],
      correctIndex: 1,
      explanation:
        'Khoá chính định danh duy nhất mỗi hàng, nên phải không trùng nhau và không được nhận giá trị rỗng.',
    },
    {
      id: 'q2',
      prompt: 'Câu lệnh SQL nào dùng để lấy toàn bộ cột của bảng "SinhVien"?',
      options: [
        'SELECT * FROM SinhVien;',
        'GET ALL SinhVien;',
        'SELECT SinhVien.* TO *;',
        'SHOW SinhVien ALL;',
      ],
      correctIndex: 0,
      explanation:
        'Dấu * đại diện cho tất cả cột. Cú pháp đúng là SELECT * FROM tên_bảng;',
    },
    {
      id: 'q3',
      prompt: 'Dạng chuẩn 1NF yêu cầu điều gì ở dữ liệu?',
      options: [
        'Không có phụ thuộc bắc cầu',
        'Mọi thuộc tính đều là khoá chính',
        'Các giá trị trong mỗi ô phải là giá trị nguyên tử',
        'Bảng phải có ít nhất hai khoá ngoài',
      ],
      correctIndex: 2,
      explanation:
        '1NF yêu cầu mỗi ô chỉ chứa một giá trị nguyên tử, không chứa danh sách hay nhóm lặp.',
    },
    {
      id: 'q4',
      prompt: 'Lệnh JOIN nào trả về cả những hàng không có bản ghi tương ứng ở bảng bên phải?',
      options: ['INNER JOIN', 'LEFT JOIN', 'CROSS JOIN', 'NATURAL JOIN'],
      correctIndex: 1,
      explanation:
        'LEFT JOIN giữ toàn bộ hàng của bảng bên trái; hàng thiếu ở bảng phải nhận giá trị NULL.',
    },
    {
      id: 'q5',
      prompt: 'Thao tác nào thuộc nhóm DML (ngôn ngữ thao tác dữ liệu)?',
      options: [
        'CREATE TABLE',
        'ALTER TABLE',
        'DROP INDEX',
        'UPDATE',
      ],
      correctIndex: 3,
      explanation:
        'DML gồm SELECT, INSERT, UPDATE, DELETE. Các lệnh còn lại thuộc DDL.',
    },
    {
      id: 'q6',
      prompt: 'Một bảng có thể có bao nhiêu khoá ngoài (foreign key)?',
      options: [
        'Không có khoá ngoài nào',
        'Chỉ đúng một khoá ngoài',
        'Tối đa hai khoá ngoài',
        'Không giới hạn, miễn thoả điều kiện thiết kế',
      ],
      correctIndex: 3,
      explanation:
        'Một bảng có thể có nhiều khoá ngoài, miễn không vi phạm ràng buộc và được thiết kế hợp lý.',
    },
  ],
}
