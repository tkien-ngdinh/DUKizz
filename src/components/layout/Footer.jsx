import { Link } from 'react-router-dom'
import { DecoCircle } from '../decor/Shapes'

const COLUMNS = [
  {
    title: 'Học tập',
    links: [
      { label: 'Thư viện quiz', to: '/quiz' },
      { label: 'Đề thi thử', to: '/quiz' },
      { label: 'Ôn theo môn', to: '/quiz' },
    ],
  },
  {
    title: 'Hỗ trợ',
    links: [
      { label: 'Hướng dẫn sử dụng', to: '/' },
      { label: 'Câu hỏi thường gặp', to: '/' },
      { label: 'Góp ý nội dung', to: '/' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="border-t-2 border-ink bg-cream">
      <div className="mx-auto max-w-6xl px-4 py-12 md:px-8">
        <div className="grid gap-8 md:grid-cols-12">
          <div className="md:col-span-6">
            <div className="flex items-center gap-2">
              <DecoCircle className="size-7 text-sky" />
              <span className="font-display text-2xl leading-none">DUKizz</span>
            </div>
            <p className="mt-4 max-w-prose font-body leading-relaxed">
              Nền tảng học tập bằng quiz dành cho sinh viên: ôn tập nhanh, làm
              bài có phản hồi tức thì, và xem lại kết quả rõ ràng.
            </p>
          </div>

          {COLUMNS.map((column) => (
            <nav key={column.title} className="md:col-span-3">
              <h2 className="font-heading text-sm uppercase tracking-widest">
                {column.title}
              </h2>
              <ul className="mt-4 flex flex-col gap-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="font-body no-underline hover:bg-blush"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t-2 border-ink pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm italic">
            © 2026 DUKizz · Bản minh hoạ giao diện (chưa có backend).
          </p>
          <p className="font-heading text-sm uppercase tracking-widest">
            Học chắc · Làm nhanh · Nhớ lâu
          </p>
        </div>
      </div>
    </footer>
  )
}
