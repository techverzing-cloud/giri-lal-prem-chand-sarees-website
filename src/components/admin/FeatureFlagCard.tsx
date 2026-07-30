import type { FeatureFlag } from '@/types/cms'
import { cn } from '@/utils/cn'
import { ToggleLeft, ToggleRight, Layout, Puzzle, Link, FlaskConical } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface FeatureFlagCardProps {
  flag: FeatureFlag
  onToggle?: (key: string) => void
}

const categoryIcons: Record<FeatureFlag['category'], LucideIcon> = {
  content: Layout,
  feature: Puzzle,
  integration: Link,
  experimental: FlaskConical,
}

const categoryColors: Record<FeatureFlag['category'], string> = {
  content: 'bg-blue-100 text-blue-600',
  feature: 'bg-purple-100 text-purple-600',
  integration: 'bg-amber-100 text-amber-600',
  experimental: 'bg-rose-100 text-rose-600',
}

export function FeatureFlagCard({ flag, onToggle }: FeatureFlagCardProps) {
  const Icon = categoryIcons[flag.category]

  return (
    <div
      className={cn(
        'group rounded-lg border p-4 transition-all',
        flag.enabled
          ? 'border-night/10 bg-white hover:border-primary/20 hover:shadow-md'
          : 'border-dashed border-night/20 bg-night/[0.02] opacity-70'
      )}
    >
      <div className="flex items-start gap-3">
        <div className={cn('rounded-lg p-2', categoryColors[flag.category])}>
          <Icon className="h-4 w-4" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-body text-sm font-semibold text-night">{flag.label}</h3>
            <button
              onClick={() => onToggle?.(flag.key)}
              className={cn(
                'flex items-center gap-1.5 rounded-full px-3 py-1 font-body text-xs font-medium transition-all',
                flag.enabled
                  ? 'bg-success/10 text-success hover:bg-success/20'
                  : 'bg-night/10 text-text-muted hover:bg-night/20'
              )}
              aria-label={`Toggle ${flag.label}`}
            >
              {flag.enabled ? (
                <>
                  <ToggleRight className="h-3.5 w-3.5" /> Enabled
                </>
              ) : (
                <>
                  <ToggleLeft className="h-3.5 w-3.5" /> Disabled
                </>
              )}
            </button>
          </div>
          <p className="mt-1 font-body text-xs text-text-muted">{flag.description}</p>
          <span className="mt-2 inline-block font-body text-[10px] uppercase tracking-wider text-text-muted/50">
            {flag.category}
          </span>
        </div>
      </div>
    </div>
  )
}
