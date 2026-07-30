import type { LucideIcon } from 'lucide-react'
import { FileQuestion } from 'lucide-react'

interface EmptyStateProps {
  icon?: LucideIcon
  title: string
  description?: string
  action?: { label: string; onClick: () => void }
}

export function EmptyState({ icon: Icon = FileQuestion, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center rounded-xl border border-dashed border-night/20 bg-night/[0.02] p-12 text-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/5">
        <Icon className="h-8 w-8 text-primary/30" />
      </div>
      <h3 className="font-heading text-xl text-night">{title}</h3>
      {description && (
        <p className="mt-2 max-w-md font-body text-sm text-text-muted">{description}</p>
      )}
      {action && (
        <button
          onClick={action.onClick}
          className="mt-6 rounded-md bg-primary px-6 py-2.5 font-body text-sm font-medium text-white transition-colors hover:bg-primary/90"
        >
          {action.label}
        </button>
      )}
    </div>
  )
}
