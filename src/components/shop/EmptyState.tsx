import { SearchX } from 'lucide-react'
import { LuxuryButton } from '@/components/ui/LuxuryButton'

interface EmptyStateProps {
  title?: string
  description?: string
  onClear?: () => void
}

export function EmptyState({
  title = 'No Products Found',
  description = 'Try adjusting your filters or search criteria.',
  onClear,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="flex size-20 items-center justify-center rounded-full bg-secondary">
        <SearchX className="size-8 text-primary" />
      </div>
      <h3 className="mt-6 font-heading text-2xl text-night">{title}</h3>
      <p className="mt-2 max-w-sm font-body text-sm text-text-secondary">{description}</p>
      {onClear && (
        <div className="mt-8">
          <LuxuryButton variant="outline" size="md" onClick={onClear}>
            Clear Filters
          </LuxuryButton>
        </div>
      )}
    </div>
  )
}
