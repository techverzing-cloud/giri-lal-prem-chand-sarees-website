import { Search, X } from 'lucide-react'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function SearchBar({ value, onChange, placeholder = 'Search...' }: SearchBarProps) {
  return (
    <div className="relative">
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-night/10 bg-white py-2.5 pl-10 pr-10 font-body text-sm text-night placeholder:text-text-muted/50 transition-colors focus:border-primary/30 focus:outline-none focus:ring-1 focus:ring-primary/20"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted transition-colors hover:text-night"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  )
}
