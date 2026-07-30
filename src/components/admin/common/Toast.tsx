import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, XCircle, AlertTriangle, Info, X } from 'lucide-react'
import { cn } from '@/utils/cn'

type ToastType = 'success' | 'error' | 'warning' | 'info'

interface ToastProps {
  message: string
  type?: ToastType
  isVisible: boolean
  onClose: () => void
  duration?: number
}

const icons = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertTriangle,
  info: Info,
}

const styles: Record<ToastType, string> = {
  success: 'border-success/30 bg-success/5 text-success',
  error: 'border-error/30 bg-error/5 text-error',
  warning: 'border-warning/30 bg-warning/5 text-warning',
  info: 'border-primary/30 bg-primary/5 text-primary',
}

export function Toast({ message, type = 'info', isVisible, onClose, duration = 4000 }: ToastProps) {
  useEffect(() => {
    if (!isVisible) return
    const timer = setTimeout(onClose, duration)
    return () => clearTimeout(timer)
  }, [isVisible, onClose, duration])

  const Icon = icons[type]

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          className={cn('fixed right-6 top-24 z-[9999] flex items-center gap-3 rounded-xl border px-5 py-3 shadow-lg', styles[type])}
          role="alert"
          aria-live="polite"
        >
          <Icon className="h-5 w-5 flex-shrink-0" />
          <p className="font-body text-sm font-medium">{message}</p>
          <button onClick={onClose} className="ml-2 flex-shrink-0 rounded-md p-1 opacity-60 transition-opacity hover:opacity-100" aria-label="Dismiss notification">
            <X className="h-4 w-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
