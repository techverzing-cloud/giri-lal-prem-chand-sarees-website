import type { CMSLink } from '@/types/cms'
import { cn } from '@/utils/cn'
import { ChevronDown, ChevronRight, ExternalLink, Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'

interface NavigationEditorProps {
  items: CMSLink[]
  label?: string
}

function NavTreeItem({ item, depth }: { item: CMSLink; depth: number }) {
  const [expanded, setExpanded] = useState(true)
  const hasChildren = item.children && item.children.length > 0

  return (
    <div>
      <div
        className={cn(
          'group flex items-center gap-2 rounded-md border border-transparent px-3 py-2 transition-all hover:border-night/10 hover:bg-white',
          !item.visible && 'opacity-50'
        )}
        style={{ paddingLeft: `${depth * 20 + 12}px` }}
      >
        {hasChildren ? (
          <button
            onClick={() => setExpanded(!expanded)}
            className="rounded p-0.5 text-night/40 hover:bg-night/10 hover:text-night"
            aria-label={expanded ? 'Collapse' : 'Expand'}
          >
            {expanded ? <ChevronDown className="h-3.5 w-3.5" /> : <ChevronRight className="h-3.5 w-3.5" />}
          </button>
        ) : (
          <span className="w-5" />
        )}

        <span className="flex-1 font-body text-sm font-medium text-night">
          {item.label}
        </span>

        <span className="hidden font-body text-xs text-text-muted md:inline">{item.url}</span>

        {item.openInNewTab && (
          <ExternalLink className="h-3 w-3 text-text-muted/40" />
        )}

        <div className={cn('flex items-center gap-1.5 rounded-full px-2 py-0.5 font-body text-[10px] font-medium', item.visible ? 'bg-success/10 text-success' : 'bg-night/10 text-text-muted')}>
          {item.visible ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
          {item.visible ? 'Visible' : 'Hidden'}
        </div>
      </div>

      {hasChildren && expanded && (
        <div>
          {item.children!.map((child) => (
            <NavTreeItem key={child.id} item={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  )
}

export function NavigationEditor({ items, label }: NavigationEditorProps) {
  return (
    <div className="rounded-lg border border-night/10 bg-night/[0.02]">
      {label && (
        <div className="border-b border-night/10 px-4 py-3">
          <h3 className="font-heading text-base font-medium text-night">{label}</h3>
        </div>
      )}
      <div className="divide-y divide-night/5 p-2">
        {items.map((item) => (
          <NavTreeItem key={item.id} item={item} depth={0} />
        ))}
      </div>
    </div>
  )
}
