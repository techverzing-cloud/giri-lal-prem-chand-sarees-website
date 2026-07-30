import { cn } from '@/utils/cn'
import { ImageIcon, Type, FileText, Layout } from 'lucide-react'

interface EditableContentCardProps {
  label: string
  value: string
  type?: 'text' | 'textarea' | 'image' | 'layout'
  charLimit?: number
}

const typeIcons = {
  text: Type,
  textarea: FileText,
  image: ImageIcon,
  layout: Layout,
}

export function EditableContentCard({ label, value, type = 'text', charLimit }: EditableContentCardProps) {
  const Icon = typeIcons[type]
  const isOverLimit = charLimit && value.length > charLimit

  return (
    <div className="group rounded-lg border border-night/10 bg-white p-4 transition-all hover:border-primary/20 hover:shadow-md">
      <div className="mb-2 flex items-center gap-2">
        <Icon className="h-3.5 w-3.5 text-primary/60" />
        <span className="font-body text-xs font-medium uppercase tracking-wider text-text-muted">
          {label}
        </span>
      </div>
      <p
        className={cn(
          'font-body text-sm leading-relaxed text-night',
          type === 'textarea' && 'line-clamp-3',
          isOverLimit && 'text-error'
        )}
      >
        {value || (
          <span className="italic text-text-muted/50">No content set</span>
        )}
      </p>
      {charLimit && (
        <div className="mt-2 flex items-center justify-between">
          <div className="h-1 flex-1 overflow-hidden rounded-full bg-night/10">
            <div
              className={cn(
                'h-full rounded-full transition-all',
                value.length / charLimit > 0.9
                  ? 'bg-error'
                  : value.length / charLimit > 0.7
                    ? 'bg-warning'
                    : 'bg-primary/30'
              )}
              style={{ width: `${Math.min((value.length / charLimit) * 100, 100)}%` }}
            />
          </div>
          <span
            className={cn(
              'ml-2 font-body text-xs',
              isOverLimit ? 'text-error' : 'text-text-muted'
            )}
          >
            {value.length}/{charLimit}
          </span>
        </div>
      )}
    </div>
  )
}
