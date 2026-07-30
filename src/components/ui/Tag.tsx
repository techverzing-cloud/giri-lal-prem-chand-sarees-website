import { cn } from '@/utils/cn'
import type { ReactNode } from 'react'

interface TagProps {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'accent' | 'outline'
  className?: string
  removable?: boolean
  onRemove?: () => void
}

export function Tag({ children, variant = 'outline', className, removable, onRemove }: TagProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-body text-xs font-medium transition-colors',
        {
          'bg-primary/10 text-primary': variant === 'primary',
          'bg-secondary text-night': variant === 'secondary',
          'bg-accent/10 text-accent-dark': variant === 'accent',
          'border border-night/15 text-text-secondary': variant === 'outline',
        },
        className
      )}
    >
      {children}
      {removable && onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="ml-0.5 inline-flex hover:text-night"
          aria-label="Remove tag"
        >
          ×
        </button>
      )}
    </span>
  )
}
