import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import type { SortOption } from '@/types'
import { SORT_OPTIONS } from '@/data/filters'
import { cn } from '@/utils/cn'

interface SortDropdownProps {
  value: SortOption
  onChange: (value: SortOption) => void
}

export function SortDropdown({ value, onChange }: SortDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const current = SORT_OPTIONS.find((o) => o.value === value)

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        onBlur={() => setTimeout(() => setIsOpen(false), 200)}
        className="flex items-center gap-2 rounded-md border border-night/10 px-4 py-2.5 font-body text-sm text-night transition-colors hover:border-night/30"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="hidden md:inline">Sort by:</span>
        <span className="font-medium">{current?.label}</span>
        <ChevronDown className={cn('size-3.5 transition-transform', isOpen && 'rotate-180')} />
      </button>

      {isOpen && (
        <div
          className="absolute right-0 top-full z-50 mt-1 min-w-[220px] overflow-hidden rounded-lg border border-night/5 bg-white shadow-lg shadow-night/10"
          role="listbox"
        >
          {SORT_OPTIONS.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                onChange(option.value)
                setIsOpen(false)
              }}
              className={cn(
                'w-full px-4 py-2.5 text-left font-body text-sm transition-colors hover:bg-secondary',
                option.value === value ? 'text-primary font-medium' : 'text-text-secondary'
              )}
              role="option"
              aria-selected={option.value === value}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
