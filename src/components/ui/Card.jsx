// Card DUKizz: nền sáng, viền 2px, bóng cứng, bo 8px, padding p-6.
// CardInteractive: card có thể bấm (ép bóng khi hover). Card chỉ để đọc thì không dùng.

const TONES = {
  white: 'bg-white',
  cream: 'bg-cream',
  sky: 'bg-sky',
  blush: 'bg-blush',
}

export function Card({ tone = 'cream', className = '', children, ...props }) {
  return (
    <div className={`card ${TONES[tone] ?? TONES.white} ${className}`} {...props}>
      {children}
    </div>
  )
}

/** Card có "thanh nhãn" màu ở đầu card, chứa eyebrow. */
export function CardLabeled({
  label,
  tone = 'cream',
  labelTone = 'sky',
  icon: Icon,
  className = '',
  children,
  ...props
}) {
  return (
    <div
      className={`${TONES[tone] ?? TONES.white} flex flex-col border-2 border-ink rounded-lg overflow-hidden ${className}`}
      {...props}
    >
      {label ? (
        <div
          className={`${TONES[labelTone] ?? TONES.sky} border-b-2 border-ink px-6 py-3 flex items-center gap-2`}
        >
          {Icon ? <Icon className="size-4 shrink-0" aria-hidden="true" /> : null}
          <span className="font-heading text-xs uppercase tracking-widest">
            {label}
          </span>
        </div>
      ) : null}
      <div className="p-6 flex flex-1 flex-col">{children}</div>
    </div>
  )
}

export function CardInteractive({ tone = 'cream', className = '', children, ...props }) {
  return (
    <div
      className={`card card-interactive ${TONES[tone] ?? TONES.white} ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}

export default Card
