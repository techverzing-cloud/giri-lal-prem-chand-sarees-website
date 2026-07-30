import { cn } from '@/utils/cn'
import type { LucideIcon } from 'lucide-react'
import { TrendingUp, TrendingDown } from 'lucide-react'

interface StatsCardProps {
  label: string
  value: string | number
  icon: LucideIcon
  trend?: number
  trendLabel?: string
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error'
}

const variantStyles = {
  default: 'bg-white border-night/10',
  primary: 'bg-primary text-white border-primary',
  success: 'bg-success text-white border-success',
  warning: 'bg-warning text-white border-warning',
  error: 'bg-error text-white border-error',
}

const iconStyles = {
  default: 'bg-primary/10 text-primary',
  primary: 'bg-white/20 text-white',
  success: 'bg-white/20 text-white',
  warning: 'bg-white/20 text-white',
  error: 'bg-white/20 text-white',
}

export function StatsCard({ label, value, icon: Icon, trend, trendLabel, variant = 'default' }: StatsCardProps) {
  return (
    <div className={cn('rounded-xl border p-5 transition-all hover:shadow-md', variantStyles[variant])}>
      <div className="flex items-start justify-between">
        <div>
          <p className={cn('font-body text-xs font-medium uppercase tracking-wider', variant === 'default' ? 'text-text-muted' : 'text-white/70')}>
            {label}
          </p>
          <p className={cn('mt-1 font-heading text-3xl', variant === 'default' ? 'text-night' : 'text-white')}>
            {value}
          </p>
          {trend !== undefined && (
            <div className="mt-2 flex items-center gap-1">
              {trend > 0 ? (
                <TrendingUp className="h-3 w-3 text-success" />
              ) : (
                <TrendingDown className="h-3 w-3 text-error" />
              )}
              <span className={cn('font-body text-xs font-medium', trend > 0 ? 'text-success' : 'text-error')}>
                {trend > 0 ? '+' : ''}{trend}%
              </span>
              {trendLabel && <span className="font-body text-xs text-text-muted">{trendLabel}</span>}
            </div>
          )}
        </div>
        <div className={cn('flex h-10 w-10 items-center justify-center rounded-lg', iconStyles[variant])}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  )
}
