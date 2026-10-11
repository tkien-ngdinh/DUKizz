import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  CircleCheckBig,
  CircleX,
  Clock,
  Lightbulb,
  RotateCcw,
  Send,
  Timer,
  TriangleAlert,
  Trophy,
} from 'lucide-react'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import Button from '../components/ui/Button'
import Badge, { StatusBadge } from '../components/ui/Badge'
import Modal from '../components/ui/Modal'
import { Choice, ErrorBox } from '../components/ui/Input'
import { DecoTriangle } from '../components/decor/Shapes'
import { quizDetail } from '../data/quiz'

const TOTAL = quizDetail.questions.length
const DURATION = quizDetail.durationMinutes * 60

function formatTime(seconds) {
  const safe = Math.max(0, seconds)
  const m = String(Math.floor(safe / 60)).padStart(2, '0')
  const s = String(safe % 60).padStart(2, '0')
  return `${m}:${s}`
}

function ScoreRing({ percent }) {
  return (
    <div className="relative grid size-28 shrink-0 place-items-center">
      <DecoTriangle className="absolute -left-3 -top-2 size-10 rotate-45 text-blush" />
      <div className="score-pop grid size-28 place-items-center rounded-full border-2 border-ink bg-sky shadow-hard">
        <span className="font-display text-4xl leading-none tabular-nums">
          {percent}%
        </span>
      </div>
    </div>
  )
}

function Toast({ message, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000)
    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <div
      role="status"
      className="toast-in fixed bottom-4 right-4 z-50 flex max-w-sm items-start gap-3 rounded-lg border-2 border-ink bg-cream p-4 shadow-hard"
    >
      <CircleCheckBig className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
      <p className="flex-1 font-body leading-relaxed">{message}</p>
      <Button
        variant="plain"
        size="sm"
        className="-mr-2 -mt-2"
        aria-label="Đóng thông báo"
        onClick={onClose}
      >
        ✕
      </Button>
    </div>
  )
}

export default function Quiz() {
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState(() => Array(TOTAL).fill(null))
  const [submitted, setSubmitted] = useState(false)
  const [remaining, setRemaining] = useState(DURATION)
  const remainingRef = useRef(DURATION)
  const [error, setError] = useState('')
  const [showSubmitModal, setShowSubmitModal] = useState(false)
  const [showExitModal, setShowExitModal] = useState(false)
  const [toast, setToast] = useState('')

  const question = quizDetail.questions[current]
  const selectedIndex = answers[current]
  const answeredCount = answers.filter((value) => value !== null).length
  const isEmpty = answeredCount === 0

  const score = useMemo(
    () =>
      answers.reduce(
        (total, value, index) =>
          value === quizDetail.questions[index].correctIndex ? total + 1 : total,
        0,
      ),
    [answers],
  )
  const percent = Math.round((score / TOTAL) * 100)
  const isLast = current === TOTAL - 1
  const isCorrectCurrent =
    submitted && selectedIndex === question.correctIndex

  // Đồng hồ đếm ngược – dừng khi đã nộp bài; hết giờ thì tự nộp.
  useEffect(() => {
    if (submitted) return undefined
    const id = setInterval(() => {
      const next = Math.max(0, remainingRef.current - 1)
      remainingRef.current = next
      setRemaining(next)
      if (next === 0) {
        clearInterval(id)
        setSubmitted(true)
        setToast('Đã hết giờ. Bài làm được nộp tự động.')
      }
    }, 1000)
    return () => clearInterval(id)
  }, [submitted])

  const closeToast = useCallback(() => setToast(''), [])

  const selectAnswer = useCallback(
    (index) => {
      if (submitted) return
      setError('')
      setAnswers((previous) => {
        const next = [...previous]
        next[current] = index
        return next
      })
    },
    [current, submitted],
  )

  const goNext = () => {
    if (selectedIndex === null) {
      setError(
        'Đáp án chưa được chọn. Hãy chọn một đáp án để tiếp tục sang câu sau.',
      )
      return
    }
    setError('')
    setCurrent((value) => Math.min(value + 1, TOTAL - 1))
  }

  const goPrevious = () => {
    setError('')
    setCurrent((value) => Math.max(value - 1, 0))
  }

  const confirmSubmit = () => {
    setShowSubmitModal(false)
    setSubmitted(true)
    setError('')
    setToast(`Đã nộp bài. Bạn trả lời đúng ${score}/${TOTAL} câu.`)
  }

  const restart = () => {
    setAnswers(Array(TOTAL).fill(null))
    setSubmitted(false)
    remainingRef.current = DURATION
    setRemaining(DURATION)
    setCurrent(0)
    setError('')
    setToast('Đã làm lại từ đầu. Chúc bạn làm bài tốt!')
  }

  const timesUp = remaining <= 60
  const elapsed = DURATION - remaining

  return (
    <>
      <Navbar
        compact
        badge={`${quizDetail.subject} · ${TOTAL} câu`}
        onExit={() => setShowExitModal(true)}
      />

      <main className="mx-auto max-w-6xl px-4 py-8 md:px-8 md:py-12">
        {/* ── Thanh trên: tiêu đề, trạng thái, đồng hồ ─────────── */}
        <div className="grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Badge tone="cream">Bộ quiz</Badge>
            <h1 className="mt-3 font-heading text-2xl leading-tight md:text-3xl">
              {quizDetail.title}
            </h1>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <Badge tone="white">{quizDetail.subject}</Badge>
              <Badge tone="white">{quizDetail.level}</Badge>
              <Badge tone="sky">{TOTAL} câu hỏi</Badge>
            </div>
          </div>

          <div className="lg:col-span-4">
            <div
              className={`flex items-center justify-between gap-4 rounded-lg border-2 border-ink p-4 shadow-hard-sm ${
                timesUp ? 'bg-red' : 'bg-cream'
              } ${timesUp && !submitted ? 'nudge' : ''}`}
            >
              <div>
                <span className="font-heading text-xs uppercase tracking-widest">
                  Thời gian còn lại
                </span>
                <p className="mt-1 font-display text-4xl leading-none tabular-nums">
                  {formatTime(submitted ? elapsed : remaining)}
                </p>
              </div>
              <span
                aria-hidden="true"
                className="grid size-12 shrink-0 place-items-center rounded-full border-2 border-ink bg-white"
              >
                {timesUp && !submitted ? (
                  <TriangleAlert className="size-5" aria-hidden="true" />
                ) : (
                  <Timer className="size-5" aria-hidden="true" />
                )}
              </span>
            </div>
            {timesUp && !submitted ? (
              <p className="mt-2 flex items-center gap-2 text-sm">
                <TriangleAlert className="size-4 shrink-0" aria-hidden="true" />
                Sắp hết giờ. Hãy kiểm tra lại và nộp bài.
              </p>
            ) : null}
          </div>
        </div>

        {/* ── Tiến độ ─────────────────────────────────────────── */}
        <div className="mt-8">
          <div className="flex items-center justify-between gap-4">
            <span className="font-heading text-xs uppercase tracking-widest">
              Tiến độ: {answeredCount}/{TOTAL} câu đã chọn
            </span>
            <span className="text-sm italic">
              Câu {current + 1} / {TOTAL}
            </span>
          </div>

          <div
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={TOTAL}
            aria-valuenow={answeredCount}
            aria-label="Số câu đã trả lời"
            className="mt-3 flex gap-1"
          >
            {quizDetail.questions.map((item, index) => {
              const done = answers[index] !== null
              const isCurrent = index === current
              return (
                <span
                  key={item.id}
                  className={`seg ${done ? 'seg-done' : ''} ${
                    isCurrent ? 'seg-current' : ''
                  }`}
                />
              )
            })}
          </div>

          <ol className="mt-4 flex flex-wrap gap-2">
            {quizDetail.questions.map((item, index) => {
              const done = answers[index] !== null
              const isCurrent = index === current
              const showResult = submitted
              const right = answers[index] === item.correctIndex
              const stateClass = showResult
                ? right
                  ? 'bg-sky'
                  : 'bg-red'
                : done
                  ? 'bg-blush'
                  : 'bg-cream'
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => {
                      setError('')
                      setCurrent(index)
                    }}
                    aria-current={isCurrent ? 'true' : undefined}
                    aria-label={`Đi tới câu ${index + 1}${
                      done ? ' (đã trả lời)' : ''
                    }${showResult ? (right ? ' – đúng' : ' – sai') : ''}`}
                    className={`grid size-11 place-items-center rounded border-2 border-ink font-heading tabular-nums transition-all duration-150 ${stateClass} ${
                      isCurrent ? 'shadow-hard-sm' : ''
                    }`}
                  >
                    {index + 1}
                  </button>
                </li>
              )
            })}
          </ol>
        </div>

        {/* ── Kết quả sau khi nộp ─────────────────────────────── */}
        {submitted ? (
          <section
            aria-label="Kết quả bài làm"
            className="result-in mt-8 rounded-lg border-2 border-ink bg-cream p-6 shadow-hard-lg"
          >
            <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
              <ScoreRing percent={percent} />
              <div>
                <Badge tone="white" icon={Trophy}>
                  Kết quả
                </Badge>
                <h2 className="mt-3 font-heading text-2xl leading-tight">
                  Bạn trả lời đúng {score}/{TOTAL} câu
                </h2>
                <p className="mt-2 max-w-prose font-body leading-relaxed">
                  Thời gian làm bài: {formatTime(elapsed)} ·{' '}
                  {percent >= 80
                    ? 'Kết quả rất tốt, bạn đã nắm chắc phần này.'
                    : percent >= 50
                      ? 'Khá ổn. Hãy xem lại các câu sai để chắc kiến thức hơn.'
                      : 'Đừng lo, hãy đọc lại giải thích ở từng câu rồi làm lại một lượt.'}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Badge tone="sky" icon={CircleCheckBig}>
                    {score} đúng
                  </Badge>
                  <Badge tone="red" icon={CircleX}>
                    {TOTAL - score} sai
                  </Badge>
                </div>
              </div>
            </div>
          </section>
        ) : null}

        {/* ── Câu hỏi ─────────────────────────────────────────── */}
        <section
          key={question.id}
          className="q-enter mt-8 rounded-lg border-2 border-ink bg-cream p-6 shadow-hard md:p-8"
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Badge tone="blush">
              Câu {current + 1} / {TOTAL}
            </Badge>
            <span className="flex items-center gap-1.5 text-sm italic">
              <Clock className="size-4" aria-hidden="true" />
              {submitted ? 'Đã nộp bài' : 'Chọn một đáp án'}
            </span>
          </div>

          <fieldset className="mt-6" disabled={submitted}>
            <legend className="font-body text-lg font-medium leading-relaxed md:text-xl">
              {question.prompt}
            </legend>

            <div className="stagger mt-5 flex flex-col gap-3">
              {question.options.map((option, index) => {
                const isChosen = selectedIndex === index
                const isRight = index === question.correctIndex
                let state = 'default'
                if (submitted) {
                  if (isRight) state = 'correct'
                  else if (isChosen) state = 'wrong'
                } else if (isChosen) {
                  state = 'selected'
                }

                return (
                  <Choice
                    key={option}
                    id={`q-${question.id}-${index}`}
                    name={`question-${question.id}`}
                    value={index}
                    checked={isChosen}
                    state={state}
                    disabled={submitted}
                    onChange={() => selectAnswer(index)}
                    label={option}
                    trailing={
                      submitted && isRight ? (
                        <StatusBadge status="correct" className="mt-0.5" />
                      ) : submitted && isChosen ? (
                        <StatusBadge status="wrong" className="mt-0.5" />
                      ) : null
                    }
                  />
                )
              })}
            </div>
          </fieldset>

          {/* Phản hồi đúng/sai + giải thích (đọc được bởi trình đọc màn hình) */}
          <div aria-live="polite">
            {submitted ? (
              <div
                className={`mt-6 flex items-start gap-3 rounded-lg border-2 border-ink p-4 ${
                  isCorrectCurrent ? 'bg-sky' : 'answer-shake bg-red'
                }`}
              >
                {isCorrectCurrent ? (
                  <CircleCheckBig
                    className="mt-0.5 size-5 shrink-0"
                    aria-hidden="true"
                  />
                ) : (
                  <CircleX className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
                )}
                <div>
                  <p className="font-heading tracking-wide">
                    {selectedIndex === null
                      ? 'Bạn chưa chọn đáp án cho câu này.'
                      : isCorrectCurrent
                        ? 'Chính xác! Đúng rồi.'
                        : 'Chưa đúng. Đáp án đúng đã được tô màu xanh.'}
                  </p>
                  <p className="mt-2 flex items-start gap-2 font-body leading-relaxed">
                    <Lightbulb
                      className="mt-0.5 size-4 shrink-0"
                      aria-hidden="true"
                    />
                    <span>{question.explanation}</span>
                  </p>
                </div>
              </div>
            ) : null}
          </div>

          {error ? (
            <ErrorBox className="mt-6" data-live="polite">
              {error}
            </ErrorBox>
          ) : null}

          {/* ── Điều khiển ──────────────────────────────────── */}
          <div className="mt-8 flex flex-col gap-3 border-t-2 border-ink pt-6 sm:flex-row sm:justify-between">
            <Button
              variant="secondary"
              onClick={goPrevious}
              disabled={current === 0}
            >
              <ArrowLeft className="size-5" aria-hidden="true" />
              Câu trước
            </Button>

            <div className="flex flex-col gap-3 sm:flex-row">
              {!submitted && !isLast ? (
                <Button variant="primary" onClick={goNext}>
                  Câu sau
                  <ArrowRight className="size-5" aria-hidden="true" />
                </Button>
              ) : null}

              {submitted && !isLast ? (
                <Button variant="secondary" onClick={() => setCurrent((value) => Math.min(value + 1, TOTAL - 1))}>
                  Câu sau
                  <ArrowRight className="size-5" aria-hidden="true" />
                </Button>
              ) : null}

              {!submitted && isLast ? (
                <Button variant="cta" onClick={() => setShowSubmitModal(true)}>
                  <Send className="size-5" aria-hidden="true" />
                  Nộp bài
                </Button>
              ) : null}

              {submitted ? (
                <>
                  <Button variant="accent" onClick={restart}>
                    <RotateCcw className="size-5" aria-hidden="true" />
                    Làm lại từ đầu
                  </Button>
                  <Button as={Link} to="/" variant="secondary">
                    Về trang chủ
                  </Button>
                </>
              ) : null}
            </div>
          </div>
        </section>

        <p className="mt-4 text-sm italic">
          Dùng phím Tab để di chuyển giữa các đáp án, phím mũi tên để đổi lựa
          chọn trong cùng một câu hỏi.
        </p>
      </main>

      <Footer />

      <Modal
        open={showSubmitModal}
        onClose={() => setShowSubmitModal(false)}
        title="Nộp bài ngay bây giờ?"
        description={
          isEmpty
            ? 'Bạn chưa trả lời câu nào. Nếu nộp bài, kết quả sẽ là 0 điểm. Hãy quay lại và chọn ít nhất một đáp án.'
            : answeredCount < TOTAL
              ? `Bạn còn ${TOTAL - answeredCount} câu chưa trả lời. Sau khi nộp, bạn không thể sửa đáp án.`
              : 'Bạn đã trả lời đủ các câu. Sau khi nộp, bạn sẽ xem được điểm và giải thích từng câu.'
        }
        footer={
          <>
            <Button
              variant="secondary"
              onClick={() => setShowSubmitModal(false)}
            >
              Ở lại làm tiếp
            </Button>
            <Button variant="cta" onClick={confirmSubmit}>
              <Send className="size-5" aria-hidden="true" />
              Xác nhận nộp bài
            </Button>
          </>
        }
      />

      <Modal
        open={showExitModal}
        onClose={() => setShowExitModal(false)}
        title="Thoát khi đang làm bài?"
        description={
          submitted
            ? 'Bạn đã nộp bài nên kết quả vẫn được giữ. Bạn có thể thoát an toàn.'
            : 'Bài làm hiện tại chưa được nộp và sẽ không được lưu lại. Bạn có chắc muốn thoát?'
        }
        footer={
          <>
            <Button
              variant="secondary"
              onClick={() => setShowExitModal(false)}
            >
              Ở lại làm bài
            </Button>
            <Button
              as={Link}
              to="/"
              variant="cta"
              onClick={() => setShowExitModal(false)}
            >
              Thoát và bỏ bài
            </Button>
          </>
        }
      />

      {toast ? <Toast message={toast} onClose={closeToast} /> : null}
    </>
  )
}
