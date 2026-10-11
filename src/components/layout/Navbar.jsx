import { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { LogOut, Menu, X } from 'lucide-react'
import Button from '../ui/Button'

export function Logo({ to = '/', compact = false }) {
  return (
    <Link
      to={to}
      className="flex shrink-0 items-center gap-2 no-underline"
      aria-label="DUKizz – về trang chủ"
    >
      <svg
        viewBox="0 0 40 40"
        aria-hidden="true"
        focusable="false"
        className="size-8 shrink-0"
      >
        <rect x="2" y="2" width="36" height="36" fill="#5EABD6" stroke="#111111" strokeWidth="2" />
        <circle cx="20" cy="20" r="9" fill="#FEFBC7" stroke="#111111" strokeWidth="2" />
      </svg>
      <span className="font-display text-2xl leading-none tracking-tight">
        DUKizz
      </span>
      {compact ? (
        <span className="sr-only">Đang làm bài</span>
      ) : null}
    </Link>
  )
}

const LINKS = [
  { to: '/', label: 'Trang chủ' },
  { to: '/quiz', label: 'Làm bài' },
]

export default function Navbar({ compact = false, badge = null, onExit = null }) {
  const location = useLocation()
  // Menu mobile tự đóng khi đường dẫn đổi (không cần effect).
  const [openPath, setOpenPath] = useState(null)
  const open = openPath === location.pathname

  return (
    <nav className="sticky top-0 z-40 border-b-2 border-ink bg-white">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 md:h-20 md:px-8">
        <div className="flex min-w-0 items-center gap-3 md:gap-4">
          <Logo compact={compact} />
          {compact && badge ? (
            <span className="hidden truncate border-l-2 border-ink pl-4 font-heading text-sm uppercase tracking-widest sm:inline">
              {badge}
            </span>
          ) : null}
        </div>

        {!compact ? (
          <>
            <ul className="hidden items-center gap-2 md:flex">
              {LINKS.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    end={link.to === '/'}
                    className={({ isActive }) =>
                      [
                        'inline-flex min-h-[44px] items-center rounded border-2 border-ink px-4 font-heading text-sm tracking-wide no-underline transition-colors duration-150',
                        isActive
                          ? 'bg-sky shadow-hard-sm'
                          : 'border-transparent hover:border-ink hover:bg-blush',
                      ].join(' ')
                    }
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>

            <div className="hidden items-center gap-3 md:flex">
              <Button as={Link} to="/quiz" variant="secondary" size="sm">
                Đăng nhập
              </Button>
              <Button as={Link} to="/quiz" variant="primary" size="sm">
                Bắt đầu
              </Button>
            </div>

            <Button
              variant="plain"
              size="sm"
              className="md:hidden"
              aria-expanded={open}
              aria-controls="menu-mobile"
              aria-label={open ? 'Đóng menu' : 'Mở menu'}
              onClick={() => setOpenPath(open ? null : location.pathname)}
            >
              {open ? (
                <X className="size-6" aria-hidden="true" />
              ) : (
                <Menu className="size-6" aria-hidden="true" />
              )}
            </Button>
          </>
        ) : (
          <div className="flex items-center gap-2">
            {badge ? (
              <span className="truncate font-heading text-sm uppercase tracking-widest sm:hidden">
                {badge}
              </span>
            ) : null}
            <Button
              variant="secondary"
              size="sm"
              onClick={onExit}
            >
              <LogOut className="size-4" aria-hidden="true" />
              Thoát
            </Button>
          </div>
        )}
      </div>

      {!compact && open ? (
        <div
          id="menu-mobile"
          className="mx-4 mb-4 rounded-lg border-2 border-ink bg-cream p-4 shadow-hard-lg md:hidden"
        >
          <ul className="flex flex-col gap-2">
            {LINKS.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    [
                      'flex min-h-[44px] items-center rounded border-2 border-ink px-4 font-heading tracking-wide no-underline',
                      isActive ? 'bg-sky shadow-hard-sm' : 'bg-cream hover:bg-blush',
                    ].join(' ')
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex flex-col gap-2">
            <Button as={Link} to="/quiz" variant="secondary">
              Đăng nhập
            </Button>
            <Button as={Link} to="/quiz" variant="primary">
              Bắt đầu làm bài
            </Button>
          </div>
        </div>
      ) : null}
    </nav>
  )
}
