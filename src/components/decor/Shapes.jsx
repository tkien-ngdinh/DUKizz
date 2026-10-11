// Khối hình học Bauhaus trang trí. Chỉ tròn / vuông / tam giác, tô phẳng.
// Luôn aria-hidden + pointer-events-none, không bao giờ che nội dung.

const base = 'pointer-events-none select-none'

export function DecoCircle({ className = '', width = 2 }) {
  return (
    <svg
      viewBox="0 0 100 100"
      aria-hidden="true"
      focusable="false"
      className={`${base} ${className}`}
    >
      <circle
        cx="50"
        cy="50"
        r="48"
        fill="currentColor"
        stroke="#111111"
        strokeWidth={width}
      />
    </svg>
  )
}

export function DecoSquare({ className = '', width = 2 }) {
  return (
    <svg
      viewBox="0 0 100 100"
      aria-hidden="true"
      focusable="false"
      className={`${base} ${className}`}
    >
      <rect
        x="2"
        y="2"
        width="96"
        height="96"
        fill="currentColor"
        stroke="#111111"
        strokeWidth={width}
      />
    </svg>
  )
}

export function DecoTriangle({ className = '', width = 2 }) {
  return (
    <svg
      viewBox="0 0 100 100"
      aria-hidden="true"
      focusable="false"
      className={`${base} ${className}`}
    >
      <polygon
        points="50,6 96,92 4,92"
        fill="currentColor"
        stroke="#111111"
        strokeWidth={width}
      />
    </svg>
  )
}

export function DecoArc({ className = '', width = 2 }) {
  return (
    <svg
      viewBox="0 0 100 100"
      aria-hidden="true"
      focusable="false"
      className={`${base} ${className}`}
    >
      <path
        d="M4 96 A92 92 0 0 1 96 4"
        fill="none"
        stroke="currentColor"
        strokeWidth={width * 3}
      />
    </svg>
  )
}
