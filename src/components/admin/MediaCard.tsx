import type { MediaItem } from '@/types/cms'
import { cn } from '@/utils/cn'
import { Image, FileVideo, FileText, FileType, Star } from 'lucide-react'

interface MediaCardProps {
  item: MediaItem
  selected?: boolean
  onSelect?: (id: string) => void
}

const categoryIcons: Record<MediaItem['category'], typeof Image> = {
  image: Image,
  video: FileVideo,
  document: FileText,
  icon: FileType,
  logo: Star,
}

const categoryColors: Record<MediaItem['category'], string> = {
  image: 'bg-blue-100 text-blue-600',
  video: 'bg-purple-100 text-purple-600',
  document: 'bg-amber-100 text-amber-600',
  icon: 'bg-emerald-100 text-emerald-600',
  logo: 'bg-rose-100 text-rose-600',
}

export function MediaCard({ item, selected, onSelect }: MediaCardProps) {
  const Icon = categoryIcons[item.category]

  return (
    <button
      onClick={() => onSelect?.(item.id)}
      className={cn(
        'group relative w-full overflow-hidden rounded-lg border bg-white text-left transition-all',
        selected
          ? 'border-primary ring-2 ring-primary/20'
          : 'border-night/10 hover:border-primary/30 hover:shadow-md'
      )}
      aria-label={`Select ${item.title}`}
    >
      <div className="aspect-[4/3] flex items-center justify-center bg-night/5">
        {item.category === 'image' || item.category === 'logo' ? (
          <div className="flex h-full w-full items-center justify-center">
            <div className="flex flex-col items-center gap-1 text-night/20">
              <Image className="h-8 w-8" />
              <span className="font-body text-xs">{item.width}x{item.height}</span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-1 text-night/20">
            <Icon className="h-8 w-8" />
            <span className="font-body text-xs">{item.category}</span>
          </div>
        )}
      </div>

      <div className="space-y-1.5 p-3">
        <div className="flex items-center justify-between gap-2">
          <p className="truncate font-body text-sm font-medium text-night">{item.title}</p>
          <span className={cn('flex-shrink-0 rounded px-1.5 py-0.5 font-body text-[10px] font-medium uppercase', categoryColors[item.category])}>
            {item.category}
          </span>
        </div>
        <p className="truncate font-body text-xs text-text-muted">{item.filename}</p>
        {item.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {item.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="rounded-full bg-night/5 px-2 py-0.5 font-body text-[10px] text-text-muted">
                {tag}
              </span>
            ))}
            {item.tags.length > 3 && (
              <span className="font-body text-[10px] text-text-muted/50">+{item.tags.length - 3}</span>
            )}
          </div>
        )}
      </div>
    </button>
  )
}
