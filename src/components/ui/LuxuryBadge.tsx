import { cn } from '@/utils/cn'
import type { ReactNode } from 'react'

interface LuxuryBadgeProps {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'accent' | 'dark' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function LuxuryBadge({
  children,
  variant = 'primary',
  size = 'sm',
  className,
}: LuxuryBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center font-body font-semibold uppercase tracking-wider',
        {
          'bg-primary text-white': variant === 'primary',
          'bg-secondary text-night': variant === 'secondary',
          'bg-accent text-white': variant === 'accent',
          'bg-night text-white': variant === 'dark',
          'border border-night/20 bg-transparent text-night': variant === 'outline',
        },
        {
          'px-3 py-1 text-[10px]': size === 'sm',
          'px-4 py-1.5 text-xs': size === 'md',
          'px-5 py-2 text-sm': size === 'lg',
        },
        className
      )}
    >
      {children}
    </span>
  )
}
