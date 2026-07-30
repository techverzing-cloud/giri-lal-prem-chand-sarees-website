import type { MediaItem } from '@/types/cms'
import { MediaCard } from './MediaCard'
import { FolderOpen } from 'lucide-react'

interface MediaGridProps {
  items: MediaItem[]
  selectedIds?: string[]
  onSelect?: (id: string) => void
}

export function MediaGrid({ items, selectedIds = [], onSelect }: MediaGridProps) {
  if (items.length === 0) {
    return (
      <div className="flex min-h-[300px] flex-col items-center justify-center rounded-lg border border-dashed border-night/20 bg-night/5">
        <FolderOpen className="mb-2 h-9 w-9 text-night/20" aria-hidden="true" />
        <p className="font-body text-sm text-text-muted">No media items found</p>
        <p className="font-body text-xs text-text-muted/60">Upload or add media to get started</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {items.map((item) => (
        <MediaCard
          key={item.id}
          item={item}
          selected={selectedIds.includes(item.id)}
          onSelect={onSelect}
        />
      ))}
    </div>
  )
}
