import { cn } from '@/utils/cn'
import { X } from 'lucide-react'

interface FilterOption {
  label: string
  value: string
}

interface FilterGroup {
  label: string
  options: FilterOption[]
  selected: string | null
  onChange: (value: string | null) => void
}

interface FilterPanelProps {
  groups: FilterGroup[]
  className?: string
}

export function FilterPanel({ groups, className }: FilterPanelProps) {
  return (
    <div className={cn('flex flex-wrap gap-3', className)}>
      {groups.map((group) => (
        <div key={group.label} className="flex items-center gap-1.5">
          <span className="font-body text-xs font-medium text-text-muted">{group.label}:</span>
          <div className="flex flex-wrap gap-1">
            {group.options.map((option) => {
              const isActive = group.selected === option.value
              return (
                <button
                  key={option.value}
                  onClick={() => group.onChange(isActive ? null : option.value)}
                  className={cn(
                    'rounded-lg border px-3 py-1.5 font-body text-xs transition-colors',
                    isActive
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-night/10 text-night/60 hover:border-night/20 hover:text-night'
                  )}
                >
                  {option.label}
                  {isActive && (
                    <X className="ml-1 inline h-3 w-3" />
                  )}
                </button>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
