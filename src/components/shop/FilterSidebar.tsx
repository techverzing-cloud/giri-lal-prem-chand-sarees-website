import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronDown, RotateCcw } from 'lucide-react'
import type { FilterGroup, ActiveFilter, Product } from '@/types'
import { FILTER_GROUPS } from '@/data/filters'
import { applyFilters } from '@/data/products'
import { cn } from '@/utils/cn'

interface FilterSidebarProps {
  activeFilters: ActiveFilter[]
  onToggleFilter: (groupId: string, value: string) => void
  onClearFilters: () => void
  /**
   * The product set currently being filtered. When supplied, every option's
   * count is computed from it with the same predicate that builds the grid,
   * so the number beside a checkbox always equals what selecting it shows.
   */
  products?: Product[]
  isOpen?: boolean
  onClose?: () => void
  isMobile?: boolean
}

function FilterGroup({
  group,
  activeFilters,
  onToggleFilter,
  products,
}: {
  group: FilterGroup
  activeFilters: ActiveFilter[]
  onToggleFilter: (groupId: string, value: string) => void
  products?: Product[]
}) {
  const isActive = (value: string) =>
    activeFilters.some((f) => f.groupId === group.id && f.value === value)

  const countFor = (value: string, fallback: number) =>
    products ? applyFilters(products, [{ groupId: group.id, value }]).length : fallback

  return (
    <div className="border-b border-night/5 pb-6">
      <h4 className="mb-4 font-body text-xs font-semibold uppercase tracking-[0.2em] text-night">
        {group.label}
      </h4>
      <div className="space-y-2">
        {group.options.map((option) => (
          <label
            key={option.id}
            className="flex cursor-pointer items-center gap-3 group"
          >
            <input
              type="checkbox"
              checked={isActive(option.value)}
              onChange={() => onToggleFilter(group.id, option.value)}
              className="size-4 accent-primary"
            />
            <span className="flex-1 font-body text-sm text-text-secondary group-hover:text-night transition-colors">
              {option.label}
            </span>
            <span className="font-body text-xs text-text-muted">({countFor(option.value, option.count)})</span>
          </label>
        ))}
      </div>
    </div>
  )
}

export function FilterSidebar({
  activeFilters,
  onToggleFilter,
  onClearFilters,
  products,
  isOpen = true,
  onClose,
  isMobile = false,
}: FilterSidebarProps) {
  const content = (
    <div className={cn('space-y-6', isMobile && 'p-6')}>
      <div className="flex items-center justify-between">
        <h3 className="font-heading text-xl text-night">Filters</h3>
        {activeFilters.length > 0 && (
          <button
            onClick={onClearFilters}
            className="flex items-center gap-1.5 font-body text-xs uppercase tracking-[0.15em] text-primary transition-colors hover:text-primary-dark"
          >
            <RotateCcw className="size-3" />
            Clear All
          </button>
        )}
      </div>

      {FILTER_GROUPS.map((group) => (
        <FilterGroup
          key={group.id}
          group={group}
          activeFilters={activeFilters}
          onToggleFilter={onToggleFilter}
          products={products}
        />
      ))}
    </div>
  )

  if (isMobile) {
    return (
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[999] bg-night/60 backdrop-blur-sm"
              onClick={onClose}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 z-[1000] w-full max-w-sm overflow-y-auto bg-white shadow-xl"
            >
              <div className="sticky top-0 flex items-center justify-between border-b border-night/5 bg-white p-6">
                <h3 className="font-heading text-xl text-night">Filters</h3>
                <button
                  onClick={onClose}
                  className="flex size-8 items-center justify-center rounded-full bg-night/5 text-night transition-colors hover:bg-night/10"
                  aria-label="Close filters"
                >
                  <X className="size-4" />
                </button>
              </div>
              {content}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    )
  }

  return (
    <aside className="w-full">
      {content}
    </aside>
  )
}
