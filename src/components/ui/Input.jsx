import { OctagonAlert, Check } from 'lucide-react'

/** Nhãn đặt PHÍA TRÊN input (Cal Sans 14px). Không dùng placeholder thay nhãn. */
export function Field({ id, label, hint, error, children }) {
  return (
    <div className="flex flex-col gap-2">
      {label ? (
        <label htmlFor={id} className="font-heading text-sm tracking-wide">
          {label}
        </label>
      ) : null}
      {children}
      {hint && !error ? (
        <p className="text-sm italic leading-relaxed">{hint}</p>
      ) : null}
      {error ? <ErrorBox>{error}</ErrorBox> : null}
    </div>
  )
}

export function Input({ className = '', ...props }) {
  return <input className={`input ${className}`} {...props} />
}

export function Textarea({ className = '', rows = 4, ...props }) {
  return (
    <textarea className={`input ${className}`} rows={rows} {...props} />
  )
}

export function Select({ className = '', children, ...props }) {
  return (
    <select className={`input ${className}`} {...props}>
      {children}
    </select>
  )
}

/**
 * Khung báo lỗi: nói CHUYỆN GÌ XẢY RA + CÁCH SỬA. Không tô nền đỏ lên input.
 */
export function ErrorBox({ children, className = '' }) {
  return (
    <div
      role="alert"
      className={`flex items-start gap-2 rounded-lg border-2 border-ink bg-red px-4 py-3 text-ink ${className}`}
    >
      <OctagonAlert className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
      <p className="text-sm leading-relaxed">{children}</p>
    </div>
  )
}

const CHOICE_STATES = {
  default: 'bg-white',
  selected: 'bg-blush',
  correct: 'bg-sky',
  wrong: 'bg-red',
}

/**
 * Lựa chọn dạng radio/checkbox thật (điều hướng bàn phím hoạt động).
 * state: default | selected | correct | wrong
 */
export function Choice({
  id,
  name,
  type = 'radio',
  value,
  checked = false,
  state = 'default',
  label,
  disabled = false,
  trailing = null,
  onChange,
}) {
  const locked = disabled || state === 'correct' || state === 'wrong'
  const classes = [
    'choice',
    CHOICE_STATES[state] ?? CHOICE_STATES.default,
    locked ? 'choice-disabled' : 'choice-live',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <label className={classes} htmlFor={id}>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        checked={checked}
        disabled={locked}
        onChange={onChange}
        className="peer sr-only"
      />
      <span
        aria-hidden="true"
        className={`mt-0.5 grid size-6 shrink-0 place-items-center border-2 border-ink
                    ${checked ? 'bg-sky' : 'bg-white'}
                    ${type === 'radio' ? 'rounded-full' : 'rounded'}`}
      >
        {checked ? <Check className="size-4" strokeWidth={3} /> : null}
      </span>
      <span className="flex-1 font-body text-lg leading-relaxed">{label}</span>
      {trailing}
    </label>
  )
}

export default Input
