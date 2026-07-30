import { useState } from 'react'
import { Check } from 'lucide-react'
import { cn } from '@/utils/cn'

const COLOR_MAP: Record<string, string> = {
  red: '#DC2626',
  gold: '#D4A017',
  green: '#16A34A',
  blue: '#2563EB',
  pink: '#EC4899',
  white: '#F5F5F5',
  ivory: '#FFFFF0',
  maroon: '#800020',
  purple: '#7C3AED',
  peach: '#FFDAB9',
  orange: '#EA580C',
  silver: '#C0C0C0',
  grey: '#6B7280',
  yellow: '#EAB308',
  black: '#111111',
  brown: '#78350F',
  teal: '#0D9488',
  lavender: '#E6E6FA',
  coral: '#FF7F50',
}

interface ColourSelectorProps {
  colors: string[]
  onChange?: (color: string) => void
}

export function ColourSelector({ colors, onChange }: ColourSelectorProps) {
  const [selected, setSelected] = useState(colors[0])

  function handleSelect(color: string) {
    setSelected(color)
    onChange?.(color)
  }

  return (
    <div>
      <span className="font-body text-xs font-semibold uppercase tracking-[0.15em] text-text-muted">
        Available Colours
      </span>
      <div className="mt-3 flex flex-wrap gap-3">
        {colors.map((color) => {
          const hex = COLOR_MAP[color.toLowerCase()] ?? '#ccc'
          const isSelected = selected === color

          return (
            <button
              key={color}
              onClick={() => handleSelect(color)}
              className={cn(
                'group relative flex items-center gap-2 rounded-full border px-4 py-1.5 transition-all duration-300',
                isSelected
                  ? 'border-primary bg-primary/5'
                  : 'border-night/10 hover:border-night/30'
              )}
              aria-label={`Select ${color} colour`}
              aria-pressed={isSelected}
            >
              <span
                className="size-3.5 rounded-full ring-1 ring-night/10"
                style={{ backgroundColor: hex }}
              />
              <span className="font-body text-xs capitalize text-night">{color}</span>
              {isSelected && <Check className="size-3 text-primary" />}
            </button>
          )
        })}
      </div>
    </div>
  )
}
