import { AlertTriangle, X } from 'lucide-react'
import { useEffect, useRef } from 'react'

interface ConfirmDialogProps {
  open: boolean
  title: string
  message: string
  confirmLabel?: string
  cancelLabel?: string
  variant?: 'danger' | 'warning' | 'info'
  onConfirm: () => void
  onCancel: () => void
}

export function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  variant = 'danger',
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (open) {
      const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onCancel() }
      document.addEventListener('keydown', handler)
      return () => document.removeEventListener('keydown', handler)
    }
  }, [open, onCancel])

  if (!open) return null

  const variantStyles = {
    danger: 'bg-error/10 text-error',
    warning: 'bg-warning/10 text-warning',
    info: 'bg-primary/10 text-primary',
  }

  const buttonStyles = {
    danger: 'bg-error text-white hover:bg-error/90',
    warning: 'bg-warning text-white hover:bg-warning/90',
    info: 'bg-primary text-white hover:bg-primary/90',
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={onCancel}>
      <div ref={dialogRef} onClick={(e) => e.stopPropagation()} className="mx-4 w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
        <div className="flex items-start justify-between">
          <div className={['flex h-10 w-10 items-center justify-center rounded-full', variantStyles[variant]].join(' ')}>
            <AlertTriangle className="h-5 w-5" />
          </div>
          <button onClick={onCancel} className="rounded-lg p-1 text-night/40 hover:bg-night/5 hover:text-night">
            <X className="h-4 w-4" />
          </button>
        </div>
        <h3 className="mt-4 font-heading text-lg text-night">{title}</h3>
        <p className="mt-2 font-body text-sm text-text-muted">{message}</p>
        <div className="mt-6 flex justify-end gap-3">
          <button onClick={onCancel} className="rounded-lg border border-night/10 px-4 py-2 font-body text-sm text-night transition-colors hover:bg-night/5">
            {cancelLabel}
          </button>
          <button onClick={onConfirm} className={['rounded-lg px-4 py-2 font-body text-sm font-medium text-white transition-colors', buttonStyles[variant]].join(' ')}>
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
