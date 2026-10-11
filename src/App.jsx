import { useEffect } from 'react'
import { Link, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Button from './components/ui/Button'
import Card from './components/ui/Card'
import { DecoSquare, DecoTriangle } from './components/decor/Shapes'
import Home from './pages/Home'
import Quiz from './pages/Quiz'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [pathname])
  return null
}

function NotFound() {
  return (
    <>
      <Navbar />
      <main className="mx-auto flex max-w-6xl flex-col items-center px-4 py-20 md:px-8">
        <div className="relative flex flex-col items-center gap-6 text-center">
          <DecoTriangle className="size-16 text-blush" />
          <h1 className="font-display text-5xl uppercase leading-none md:text-7xl">
            404
          </h1>
          <p className="max-w-prose font-body text-lg leading-relaxed">
            Không tìm thấy trang bạn cần. Hãy quay về trang chủ để chọn một bộ
            quiz khác.
          </p>
          <Button as={Link} to="/" variant="primary">
            Về trang chủ
          </Button>
        </div>
        <Card className="mt-12 max-w-md">
          <div className="flex items-start gap-4">
            <DecoSquare className="size-10 shrink-0 text-sky" />
            <p className="font-body leading-relaxed">
              Mẹo: mọi bộ quiz đều có mặt ở trang chủ, bạn không cần nhập đường
              dẫn thủ công.
            </p>
          </div>
        </Card>
      </main>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/quiz/:id" element={<Quiz />} />
        <Route path="/trang-chu" element={<Navigate to="/" replace />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}
