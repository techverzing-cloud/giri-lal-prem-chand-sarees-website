import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/utils/cn'

interface PaginationProps {
  current: number
  total: number
  onPageChange: (page: number) => void
}

export function Pagination({ current, total, onPageChange }: PaginationProps) {
  if (total <= 1) return null

  function getPages(): (number | '...')[] {
    const pages: (number | '...')[] = []
    const delta = 2
    const start = Math.max(2, current - delta)
    const end = Math.min(total - 1, current + delta)

    pages.push(1)
    if (start > 2) pages.push('...')
    for (let i = start; i <= end; i++) pages.push(i)
    if (end < total - 1) pages.push('...')
    if (total > 1) pages.push(total)

    return pages
  }

  return (
    <nav aria-label="Pagination" className="flex items-center justify-center gap-1.5">
      <button
        onClick={() => onPageChange(current - 1)}
        disabled={current <= 1}
        className="flex size-10 items-center justify-center rounded-md border border-night/10 text-night/50 transition-colors hover:border-night/30 hover:text-night disabled:opacity-30 disabled:cursor-not-allowed"
        aria-label="Previous page"
      >
        <ChevronLeft className="size-4" />
      </button>

      {getPages().map((page, i) =>
        page === '...' ? (
          <span key={`ellipsis-${i}`} className="flex size-10 items-center justify-center font-body text-sm text-text-muted">
            ...
          </span>
        ) : (
          <motion.button
            key={page}
            whileTap={{ scale: 0.95 }}
            onClick={() => onPageChange(page)}
            className={cn(
              'flex size-10 items-center justify-center rounded-md font-body text-sm transition-all duration-300',
              page === current
                ? 'bg-primary text-white shadow-sm'
                : 'border border-night/10 text-text-secondary hover:border-night/30 hover:text-night'
            )}
            aria-label={`Page ${page}`}
            aria-current={page === current ? 'page' : undefined}
          >
            {page}
          </motion.button>
        )
      )}

      <button
        onClick={() => onPageChange(current + 1)}
        disabled={current >= total}
        className="flex size-10 items-center justify-center rounded-md border border-night/10 text-night/50 transition-colors hover:border-night/30 hover:text-night disabled:opacity-30 disabled:cursor-not-allowed"
        aria-label="Next page"
      >
        <ChevronRight className="size-4" />
      </button>
    </nav>
  )
}
