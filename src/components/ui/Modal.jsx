import { useCallback, useEffect, useId, useRef } from 'react'
import { X } from 'lucide-react'
import Button from './Button'

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'

/**
 * Modal DUKizz: nền white, viền 2px, bóng lớn 8px; lớp phủ bg-ink/60.
 * Đóng bằng Esc, bấm nền, hoặc nút ✕. Có bẫy focus và trả focus về phần tử trước đó.
 */
export default function Modal({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  closeLabel = 'Đóng hộp thoại',
}) {
  const panelRef = useRef(null)
  const titleId = useId()
  const descId = useId()

  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === 'Escape') {
        event.stopPropagation()
        onClose?.()
        return
      }
      if (event.key !== 'Tab' || !panelRef.current) return

      const nodes = Array.from(
        panelRef.current.querySelectorAll(FOCUSABLE),
      ).filter((node) => node.offsetParent !== null)
      if (nodes.length === 0) return

      const first = nodes[0]
      const last = nodes[nodes.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    },
    [onClose],
  )

  useEffect(() => {
    if (!open) return undefined
    const previous = document.activeElement
    const raf = requestAnimationFrame(() => {
      const node = panelRef.current?.querySelector(FOCUSABLE)
      ;(node ?? panelRef.current)?.focus()
    })

    return () => {
      cancelAnimationFrame(raf)
      if (previous instanceof HTMLElement) previous.focus()
    }
  }, [open])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-ink/60 p-4 sm:items-center"
      onKeyDown={handleKeyDown}
    >
      <button
        type="button"
        aria-hidden="true"
        tabIndex={-1}
        className="absolute inset-0 cursor-default"
        onClick={onClose}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={description ? descId : undefined}
        tabIndex={-1}
        className="pop-in relative w-full max-w-lg rounded-lg border-2 border-ink bg-cream p-6 shadow-hard-lg"
      >
        <div className="flex items-start justify-between gap-4">
          <h2 id={titleId} className="font-heading text-2xl leading-tight">
            {title}
          </h2>
          <Button
            variant="plain"
            size="sm"
            aria-label={closeLabel}
            onClick={onClose}
            className="-mr-2 -mt-1 shrink-0"
          >
            <X className="size-5" aria-hidden="true" />
          </Button>
        </div>

        {description ? (
          <p id={descId} className="mt-3 font-body leading-relaxed">
            {description}
          </p>
        ) : null}

        {children ? <div className="mt-4">{children}</div> : null}

        {footer ? (
          <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            {footer}
          </div>
        ) : null}
      </div>
    </div>
  )
}
