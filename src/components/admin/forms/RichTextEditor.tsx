import { Bold, Italic, List, ListOrdered, Quote, Image, Link, Heading1, Heading2, Pilcrow } from 'lucide-react'
import { cn } from '@/utils/cn'
import { useState } from 'react'

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  label?: string
}

export function RichTextEditor({ value, onChange, placeholder = 'Start writing...', label }: RichTextEditorProps) {
  const [activeToolbar, setActiveToolbar] = useState<string | null>(null)

  const toolbarItems = [
    { id: 'h1', icon: Heading1, label: 'Heading 1' },
    { id: 'h2', icon: Heading2, label: 'Heading 2' },
    { id: 'p', icon: Pilcrow, label: 'Paragraph' },
    { id: 'bold', icon: Bold, label: 'Bold' },
    { id: 'italic', icon: Italic, label: 'Italic' },
    { id: 'ul', icon: List, label: 'Bullet List' },
    { id: 'ol', icon: ListOrdered, label: 'Numbered List' },
    { id: 'quote', icon: Quote, label: 'Quote' },
    { id: 'image', icon: Image, label: 'Image' },
    { id: 'link', icon: Link, label: 'Link' },
  ]

  return (
    <div className="rounded-xl border border-night/10 overflow-hidden">
      {label && (
        <div className="border-b border-night/10 bg-night/[0.02] px-4 py-2">
          <span className="font-body text-xs font-medium uppercase tracking-wider text-text-muted">{label}</span>
        </div>
      )}
      <div className="flex flex-wrap gap-0.5 border-b border-night/10 bg-white px-2 py-2">
        {toolbarItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveToolbar(activeToolbar === item.id ? null : item.id)}
            className={cn(
              'rounded-md p-1.5 transition-colors',
              activeToolbar === item.id
                ? 'bg-primary/10 text-primary'
                : 'text-night/40 hover:bg-night/5 hover:text-night'
            )}
            title={item.label}
            aria-label={item.label}
          >
            <item.icon className="h-4 w-4" />
          </button>
        ))}
      </div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="min-h-[300px] w-full resize-y border-0 bg-white p-4 font-body text-sm text-night placeholder:text-text-muted/40 focus:outline-none"
      />
    </div>
  )
}
