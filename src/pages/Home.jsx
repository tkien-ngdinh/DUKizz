import { Link } from 'react-router-dom'
import {
  ArrowRight,
  BookOpen,
  ChevronRight,
  Clock,
  ListChecks,
  Play,
  Rocket,
  Sparkles,
  Target,
  Trophy,
} from 'lucide-react'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import Button from '../components/ui/Button'
import Badge, { StatusBadge } from '../components/ui/Badge'
import { CardLabeled } from '../components/ui/Card'
import { DecoCircle, DecoSquare, DecoTriangle } from '../components/decor/Shapes'
import { featuredQuizzes } from '../data/quiz'

const STATS = [
  { value: '1.250+', label: 'Câu hỏi đã kiểm duyệt' },
  { value: '48', label: 'Bộ quiz theo môn' },
  { value: '12', label: 'Môn học đang mở' },
  { value: '9.600+', label: 'Lượt làm bài' },
]

const STEPS = [
  {
    icon: ListChecks,
    chip: 'bg-sky',
    title: 'Chọn bộ quiz',
    body: 'Lọc theo môn học, số câu và thời lượng. Mỗi bộ quiz đều ghi rõ bạn sẽ làm bao nhiêu câu.',
  },
  {
    icon: Target,
    chip: 'bg-blush',
    title: 'Làm bài từng câu',
    body: 'Chọn đáp án, xem phản hồi đúng/sai ngay lập tức kèm giải thích ngắn để bạn hiểu vì sao.',
  },
  {
    icon: Trophy,
    chip: 'bg-sky',
    title: 'Xem kết quả',
    body: 'Nhận điểm, thời gian và danh sách câu cần ôn lại – sẵn sàng cho lần làm tiếp theo.',
  },
]

export default function Home() {
  return (
    <>
      <Navbar />

      <main>
        {/* ── Hero ─────────────────────────────────────────────── */}
        <section className="relative overflow-hidden border-b-2 border-ink">
          {/* Khối trang trí Bauhaus: tròn lớn, tam giác, vuông viền (4 khối) */}
          <DecoCircle className="bloom absolute -right-16 -top-20 size-64 text-sky md:size-96" />
          <DecoTriangle className="bloom bloom-2 absolute bottom-8 right-1/3 hidden size-24 rotate-45 text-blush lg:block" />
          <DecoSquare className="bloom bloom-3 absolute -bottom-10 -left-6 size-32 rotate-45 text-cream" />

          <div className="relative z-10 mx-auto grid max-w-6xl gap-12 px-4 py-12 md:px-8 md:py-20 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <Badge tone="blush" icon={Sparkles}>
                Nền tảng học tập cho sinh viên
              </Badge>

              <h1 className="mt-6 font-display text-[40px] uppercase leading-none tracking-tight md:text-[64px] lg:text-[72px]">
                Học chắc
                <br />
                nhớ lâu
                <br />
                <span className="bg-blush px-2">bằng quiz</span>
              </h1>

              <p className="mt-6 max-w-prose font-body text-lg leading-relaxed">
                DUKizz biến việc ôn bài thành những lượt làm bài ngắn, có phản
                hồi tức thì. Bạn chọn đáp án, biết ngay đúng hay sai, rồi xem
                kết quả tổng hợp sau khi nộp bài.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button as={Link} to="/quiz" variant="primary">
                  <Play className="size-5" aria-hidden="true" />
                  Bắt đầu làm bài
                </Button>
                <Button as={Link} to="/quiz" variant="secondary">
                  <BookOpen className="size-5" aria-hidden="true" />
                  Xem thư viện quiz
                </Button>
              </div>

              <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
                {[
                  'Không cần đăng nhập',
                  'Phản hồi ngay từng câu',
                  'Có giải thích đáp án',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm">
                    <span
                      aria-hidden="true"
                      className="grid size-5 shrink-0 place-items-center rounded-full border-2 border-ink bg-sky font-heading text-[10px]"
                    >
                      ✓
                    </span>
                    <span className="italic">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Thẻ xem trước một câu hỏi (chỉ để đọc, không tương tác) */}
            <div className="lg:col-span-5">
              <div className="relative z-10 rounded-lg border-2 border-ink bg-cream p-6 shadow-hard-lg">
                <div className="flex items-center justify-between gap-3">
                  <Badge tone="sky" icon={ListChecks}>
                    Câu 2 / 6
                  </Badge>
                  <span className="flex items-center gap-1.5 font-heading text-sm">
                    <Clock className="size-4" aria-hidden="true" />
                    07:42
                  </span>
                </div>

                <p className="mt-4 font-body text-lg font-medium leading-relaxed">
                  Câu lệnh SQL nào dùng để lấy toàn bộ cột của bảng “SinhVien”?
                </p>

                <ul className="mt-4 flex flex-col gap-3">
                  <li className="flex items-start gap-3 rounded-lg border-2 border-ink bg-blush p-3">
                    <span
                      aria-hidden="true"
                      className="grid size-6 shrink-0 place-items-center rounded-full border-2 border-ink bg-sky font-heading text-xs"
                    >
                      ✓
                    </span>
                    <span className="font-body leading-relaxed">
                      SELECT * FROM SinhVien;
                    </span>
                  </li>
                  {['GET ALL SinhVien;', 'SHOW SinhVien ALL;'].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 rounded-lg border-2 border-ink bg-white p-3"
                    >
                      <span
                        aria-hidden="true"
                        className="size-6 shrink-0 rounded-full border-2 border-ink bg-white"
                      />
                      <span className="font-body leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-4 flex items-center gap-2">
                  <StatusBadge status="correct" />
                  <span className="text-sm italic">
                    Dấu * đại diện cho tất cả cột.
                  </span>
                </div>
              </div>

              <p className="mt-4 pl-1 font-heading text-xs uppercase tracking-widest">
                Xem trước giao diện làm bài
              </p>
            </div>
          </div>
        </section>

        {/* ── Thống kê ─────────────────────────────────────────── */}
        <section className="border-b-2 border-ink bg-cream">
          <div className="mx-auto max-w-6xl px-4 py-12 md:px-8 md:py-20">
            <dl className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-lg border-2 border-ink bg-white p-6 shadow-hard-sm"
                >
                  <dt className="font-heading text-xs uppercase tracking-widest">
                    {stat.label}
                  </dt>
                  <dd className="mt-2 font-display text-4xl leading-none tabular-nums md:text-5xl">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ── Quiz nổi bật ─────────────────────────────────────── */}
        <section className="border-b-2 border-ink bg-white">
          <div className="mx-auto max-w-6xl px-4 py-12 md:px-8 md:py-20">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <Badge tone="cream" icon={Rocket}>
                  Đang được làm nhiều
                </Badge>
                <h2 className="mt-4 font-heading text-2xl leading-tight md:text-3xl">
                  Quiz nổi bật
                </h2>
                <p className="mt-2 max-w-prose font-body leading-relaxed">
                  Chọn một bộ quiz để bắt đầu. Mỗi bộ đều hiển thị rõ số câu và
                  thời lượng dự kiến.
                </p>
              </div>
              <Link
                to="/quiz"
                className="inline-flex min-h-[44px] shrink-0 items-center gap-1 font-heading text-sm tracking-wide"
              >
                Xem tất cả
                <ChevronRight className="size-4" aria-hidden="true" />
              </Link>
            </div>

            <ul className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featuredQuizzes.map((quiz) => (
                <li key={quiz.id}>
                  <CardLabeled
                    label={quiz.subject}
                    labelTone={quiz.tone}
                    className="card-interactive flex h-full flex-col"
                    data-testid="quiz-card"
                  >
                    <h3 className="font-heading text-xl leading-tight">
                      {quiz.title}
                    </h3>
                    <p className="mt-2 font-body leading-relaxed">
                      {quiz.summary}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      <Badge tone="white" icon={ListChecks}>
                        {quiz.questionCount} câu
                      </Badge>
                      <Badge tone="white" icon={Clock}>
                        {quiz.durationMinutes} phút
                      </Badge>
                      <Badge tone="white">{quiz.level}</Badge>
                    </div>

                    <div className="mt-auto pt-6">
                      <Button
                        as={Link}
                        to={`/quiz/${quiz.id}`}
                        variant="primary"
                        size="sm"
                        className="w-full"
                      >
                        Làm ngay
                        <ArrowRight className="size-4" aria-hidden="true" />
                      </Button>
                    </div>
                  </CardLabeled>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── Cách hoạt động ───────────────────────────────────── */}
        <section className="border-b-2 border-ink bg-cream">
          <div className="mx-auto max-w-6xl px-4 py-12 md:px-8 md:py-20">
            <div className="text-center">
              <Badge tone="sky" icon={Target}>
                Ba bước
              </Badge>
              <h2 className="mt-4 font-heading text-2xl leading-tight md:text-3xl">
                Làm bài như thế nào?
              </h2>
            </div>

            <ol className="mt-10 grid gap-8 md:grid-cols-3">
              {STEPS.map((step, index) => (
                <li key={step.title} className="flex gap-4">
                  <span
                    aria-hidden="true"
                    className={`grid size-14 shrink-0 place-items-center rounded-lg border-2 border-ink shadow-hard-sm ${step.chip}`}
                  >
                    <step.icon className="size-6" aria-hidden="true" />
                  </span>
                  <div>
                    <span className="font-heading text-xs uppercase tracking-widest">
                      Bước {index + 1}
                    </span>
                    <h3 className="mt-1 font-heading text-xl leading-tight">
                      {step.title}
                    </h3>
                    <p className="mt-2 max-w-prose font-body leading-relaxed">
                      {step.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ── CTA cuối (CTA đỏ duy nhất của trang) ─────────────── */}
        <section className="bg-white">
          <div className="mx-auto max-w-6xl px-4 py-12 md:px-8 md:py-20">
            <div className="relative overflow-hidden rounded-lg border-2 border-ink bg-cream p-8 shadow-hard-lg md:p-12">
              <DecoTriangle className="absolute -right-6 -top-6 size-32 rotate-45 text-sky" />
              <DecoSquare className="absolute -bottom-8 right-24 size-20 text-blush" />

              <div className="relative z-10 max-w-prose">
                <h2 className="font-display text-[32px] uppercase leading-none tracking-tight md:text-[48px]">
                  Thử một lượt
                  <br />
                  mất 8 phút thôi
                </h2>
                <p className="mt-4 font-body text-lg leading-relaxed">
                  Bắt đầu với bộ quiz Cơ sở dữ liệu – Chuyên đề 3. Bạn sẽ biết
                  ngay mình còn hổng phần nào.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Button as={Link} to="/quiz" variant="cta">
                    Bắt đầu làm bài ngay
                  </Button>
                  <Button as={Link} to="/quiz" variant="secondary">
                    Xem danh sách quiz
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
