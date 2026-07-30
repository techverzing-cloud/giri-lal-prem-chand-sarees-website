import { cn } from '@/utils/cn'

type StatusType = 'published' | 'draft' | 'archived' | 'new' | 'contacted' | 'qualified' | 'converted' | 'closed' | 'active' | 'inactive' | 'low' | 'medium' | 'high' | 'urgent' | 'scheduled' | 'info' | 'success' | 'warning' | 'error'

interface StatusBadgeProps {
  status: StatusType
  label?: string
  size?: 'sm' | 'md'
}

const statusStyles: Record<string, string> = {
  published: 'bg-success/10 text-success',
  draft: 'bg-night/10 text-night/60',
  archived: 'bg-error/10 text-error',
  scheduled: 'bg-primary/10 text-primary',
  new: 'bg-blue-100 text-blue-600',
  contacted: 'bg-amber-100 text-amber-600',
  qualified: 'bg-purple-100 text-purple-600',
  converted: 'bg-success/10 text-success',
  closed: 'bg-night/10 text-night/40',
  active: 'bg-success/10 text-success',
  inactive: 'bg-night/10 text-night/40',
  low: 'bg-blue-100 text-blue-600',
  medium: 'bg-amber-100 text-amber-600',
  high: 'bg-error/10 text-error',
  urgent: 'bg-error/20 text-error',
  info: 'bg-blue-100 text-blue-600',
  success: 'bg-success/10 text-success',
  warning: 'bg-amber-100 text-amber-600',
  error: 'bg-error/10 text-error',
  featured: 'bg-gold/10 text-gold',
}

export function StatusBadge({ status, label, size = 'sm' }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full font-body font-medium',
        size === 'sm' ? 'px-2.5 py-0.5 text-[10px]' : 'px-3 py-1 text-xs',
        statusStyles[status] || 'bg-night/10 text-night/60'
      )}
    >
      {label ?? status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  )
}
