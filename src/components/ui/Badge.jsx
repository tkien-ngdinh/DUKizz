// Badge / Chip / Tag: rounded-full, viền 2px, bóng nhỏ, Cal Sans uppercase.
// Màu chỉ mang tính bổ trợ – luôn kèm icon và/hoặc nhãn chữ (không dựa riêng vào màu).

const TONES = {
  white: 'bg-white text-ink',
  cream: 'bg-cream text-ink',
  sky: 'bg-sky text-ink',
  blush: 'bg-blush text-ink',
  red: 'bg-red text-ink',
}

export default function Badge({
  tone = 'white',
  icon: Icon,
  shadow = true,
  className = '',
  children,
  ...props
}) {
  const classes = [
    'inline-flex items-center gap-1.5 rounded-full border-2 border-ink',
    'px-3 py-1 font-heading text-xs uppercase tracking-widest leading-none',
    TONES[tone] ?? TONES.white,
    shadow ? 'shadow-hard-sm' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <span className={classes} {...props}>
      {Icon ? <Icon className="size-3.5 shrink-0" aria-hidden="true" /> : null}
      {children}
    </span>
  )
}

/** Nhãn trạng thái đúng/sai – kèm icon + chữ, không chỉ dùng màu. */
export function StatusBadge({ status = 'correct', className = '' }) {
  const map = {
    correct: { tone: 'sky', icon: '✓', label: 'Đúng' },
    wrong: { tone: 'red', icon: '✕', label: 'Sai' },
  }
  const item = map[status] ?? map.correct

  return (
    <Badge tone={item.tone} className={className}>
      <span aria-hidden="true" className="font-heading">
        {item.icon}
      </span>
      {item.label}
    </Badge>
  )
}
