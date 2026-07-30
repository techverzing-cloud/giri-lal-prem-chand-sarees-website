import { cn } from '@/utils/cn'
import { ChevronUp, ChevronDown, ChevronsUpDown, Inbox } from 'lucide-react'
import { useCallback, useEffect, useRef, useState, type ReactNode, type KeyboardEvent } from 'react'

export interface Column<T> {
  key: string
  label: string
  sortable?: boolean
  render?: (item: T) => ReactNode
  className?: string
  hideOnMobile?: boolean
}

interface DataTableProps<T> {
  columns: Column<T>[]
  data: T[]
  keyExtractor: (item: T) => string
  onRowClick?: (item: T) => void
  sortKey?: string
  sortOrder?: 'asc' | 'desc'
  onSort?: (key: string) => void
  emptyMessage?: string
  isLoading?: boolean
}

function SkeletonRow({ columns }: { columns: number }) {
  return (
    <tr className="animate-pulse">
      {Array.from({ length: columns }).map((_, i) => (
        <td key={i} className="px-4 py-3">
          <div className={cn('h-4 rounded bg-night/10', i === 0 ? 'w-3/4' : 'w-1/2')} />
        </td>
      ))}
    </tr>
  )
}

function EmptyStateRow({ columns, message }: { columns: number; message: string }) {
  return (
    <tr>
      <td colSpan={columns} className="px-4 py-16 text-center">
        <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-primary/5">
          <Inbox className="h-7 w-7 text-primary/30" />
        </div>
        <p className="font-body text-sm text-text-muted">{message}</p>
      </td>
    </tr>
  )
}

export function DataTable<T>({
  columns,
  data,
  keyExtractor,
  onRowClick,
  sortKey,
  sortOrder,
  onSort,
  emptyMessage = 'No data found',
  isLoading = false,
}: DataTableProps<T>) {
  const [focusedIndex, setFocusedIndex] = useState(-1)
  const rowRefs = useRef<(HTMLTableRowElement | null)[]>([])

  const visibleData = isLoading ? [] : data
  const rowCount = visibleData.length

  useEffect(() => {
    rowRefs.current = rowRefs.current.slice(0, rowCount)
  }, [rowCount])

  useEffect(() => {
    if (focusedIndex >= 0 && focusedIndex < rowCount && rowRefs.current[focusedIndex]) {
      rowRefs.current[focusedIndex]?.focus()
    }
  }, [focusedIndex, rowCount])

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLTableElement>) => {
      if (rowCount === 0) return
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setFocusedIndex((prev) => (prev + 1) % rowCount)
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setFocusedIndex((prev) => (prev <= 0 ? rowCount - 1 : prev - 1))
      } else if (e.key === 'Enter' && focusedIndex >= 0 && onRowClick) {
        e.preventDefault()
        onRowClick(visibleData[focusedIndex])
      }
    },
    [rowCount, focusedIndex, onRowClick, visibleData]
  )

  return (
    <div className="overflow-hidden rounded-xl border border-night/10">
      <div className="overflow-x-auto">
        <table className="w-full" onKeyDown={handleKeyDown} tabIndex={0} role="grid" aria-label="Data table">
          <thead>
            <tr className="border-b border-night/10 bg-night/[0.02]">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={cn(
                    'px-4 py-3 text-left font-body text-xs font-medium uppercase tracking-wider text-text-muted',
                    col.sortable && 'cursor-pointer select-none hover:text-night',
                    col.hideOnMobile && 'hidden lg:table-cell',
                    col.className
                  )}
                  onClick={() => col.sortable && onSort?.(col.key)}
                  scope="col"
                >
                  <div className="flex items-center gap-1">
                    {col.label}
                    {col.sortable && (
                      <span className="text-text-muted/40">
                        {sortKey === col.key ? (
                          sortOrder === 'asc' ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />
                        ) : (
                          <ChevronsUpDown className="h-3 w-3" />
                        )}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-night/5">
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} columns={columns.length} />)
            ) : visibleData.length === 0 ? (
              <EmptyStateRow columns={columns.length} message={emptyMessage} />
            ) : (
              visibleData.map((item, index) => (
                <tr
                  key={keyExtractor(item)}
                  ref={(el) => { rowRefs.current[index] = el }}
                  onClick={() => onRowClick?.(item)}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(17,23,23,0.04)'
                  }}
                  onMouseLeave={(e) => {
                    if (focusedIndex !== index) {
                      (e.currentTarget as HTMLElement).style.backgroundColor = ''
                    }
                  }}
                  tabIndex={-1}
                  role="row"
                  aria-selected={focusedIndex === index}
                  className={cn(
                    'transition-all duration-200 ease-in-out hover:bg-night/[0.04]',
                    onRowClick && 'cursor-pointer',
                    focusedIndex === index && 'bg-night/[0.06] ring-1 ring-primary/20'
                  )}
                >
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className={cn(
                        'px-4 py-3 font-body text-sm text-night',
                        col.hideOnMobile && 'hidden lg:table-cell',
                        col.className
                      )}
                    >
                      {col.render ? col.render(item) : (item as Record<string, unknown>)[col.key] as ReactNode}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
