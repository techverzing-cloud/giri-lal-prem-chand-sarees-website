import { cn } from '@/utils/cn'
import { Eye, EyeOff, GripVertical, Edit3 } from 'lucide-react'

interface ContentSectionCardProps {
  title: string
  subtitle?: string
  description?: string
  visible: boolean
  displayOrder: number
  sectionCount?: number
  onToggle?: () => void
}

export function ContentSectionCard({
  title,
  subtitle,
  description,
  visible,
  displayOrder,
  sectionCount,
}: ContentSectionCardProps) {
  return (
    <div
      className={cn(
        'group flex items-start gap-4 rounded-lg border p-4 transition-all',
        visible
          ? 'border-night/10 bg-white hover:border-primary/20 hover:shadow-md'
          : 'border-dashed border-night/20 bg-night/5 opacity-60'
      )}
    >
      <div className="flex cursor-grab items-center pt-1 text-night/30 transition-colors hover:text-night/60">
        <GripVertical className="h-4 w-4" />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-3">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 font-body text-xs font-medium text-primary">
            {displayOrder}
          </span>
          <h3 className={cn('font-heading text-lg', !visible && 'line-through')}>{title}</h3>
          {subtitle && (
            <span className="hidden truncate text-sm text-text-muted sm:inline">{subtitle}</span>
          )}
        </div>
        {description && (
          <p className="mt-1 line-clamp-2 text-sm text-text-muted">{description}</p>
        )}
        {sectionCount !== undefined && (
          <p className="mt-1 text-xs text-text-muted/60">{sectionCount} items</p>
        )}
      </div>

      <div className="flex items-center gap-2">
        <div
          className={cn(
            'flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium',
            visible ? 'bg-success/10 text-success' : 'bg-night/10 text-text-muted'
          )}
        >
          {visible ? (
            <>
              <Eye className="h-3 w-3" /> Active
            </>
          ) : (
            <>
              <EyeOff className="h-3 w-3" /> Hidden
            </>
          )}
        </div>
        <button
          className="rounded-full p-1.5 text-night/30 opacity-0 transition-all hover:bg-primary/10 hover:text-primary group-hover:opacity-100"
          aria-label={`Edit ${title}`}
        >
          <Edit3 className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  )
}
