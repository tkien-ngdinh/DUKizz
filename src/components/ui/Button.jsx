import { LoaderCircle } from 'lucide-react'

const VARIANTS = {
  primary: 'btn-primary',
  cta: 'btn-cta',
  secondary: 'btn-secondary',
  accent: 'btn-accent',
  danger: 'btn-cta',
  plain: 'btn-plain',
}

/**
 * Nút DUKizz.
 * - variant: primary | cta | secondary | accent | danger | plain
 * - size: md (mặc định) | sm
 * - loading: giữ nguyên kích thước, đổi chữ thành "Đang xử lý…"
 */
export default function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  as: Tag = 'button',
  className = '',
  children,
  disabled = false,
  type,
  ...props
}) {
  const isButton = Tag === 'button'
  const isDisabled = disabled || loading

  const classes = [
    'btn',
    VARIANTS[variant] ?? VARIANTS.primary,
    size === 'sm' ? 'btn-sm' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <Tag
      className={classes}
      {...(isButton ? { type: type ?? 'button', disabled: isDisabled } : {})}
      {...(isDisabled && !isButton ? { 'aria-disabled': 'true', tabIndex: -1 } : {})}
      {...props}
    >
      {loading ? (
        <>
          <LoaderCircle className="size-5 animate-spin" aria-hidden="true" />
          <span>Đang xử lý…</span>
        </>
      ) : (
        children
      )}
    </Tag>
  )
}
