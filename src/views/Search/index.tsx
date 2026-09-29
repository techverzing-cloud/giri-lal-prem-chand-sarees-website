import { useState, useMemo, useEffect, useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { Search as SearchIcon, SlidersHorizontal, X } from 'lucide-react'
import { PageTransition } from '@/components/animations/PageTransition'
import { Container } from '@/components/ui/Container'
import { ProductGrid } from '@/components/shop/ProductGrid'
import { QuickViewModal } from '@/components/shop/QuickViewModal'
import { FilterSidebar } from '@/components/shop/FilterSidebar'
import { SortDropdown } from '@/components/shop/SortDropdown'
import { Pagination } from '@/components/shop/Pagination'
import { EmptyState } from '@/components/shop/EmptyState'
import type { Product, SortOption, ActiveFilter } from '@/types'
import { searchProducts, filterProducts } from '@/data/products'
import { siteConfig } from '@/config/site'
import { cn } from '@/utils/cn'

const SUGGESTIONS = [
  { label: 'Banarasi Sarees', href: '/collections/sarees/banarasi' },
  { label: 'Bridal Lehengas', href: '/collections/lehengas/bridal' },
  { label: 'Silk Sarees', href: '/collections/sarees/silk' },
  { label: 'Designer Lehengas', href: '/collections/lehengas/designer' },
  { label: 'Wedding Collection', href: '/collections/sarees/wedding' },
]

export default function SearchPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get('q') || searchParams.get('fabric') || searchParams.get('occasion') || ''
  const [query, setQuery] = useState(initialQuery)
  const [inputValue, setInputValue] = useState(initialQuery)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [activeFilters, setActiveFilters] = useState<ActiveFilter[]>([])
  const [sort, setSort] = useState<SortOption>('newest')
  const [page, setPage] = useState(1)
  const [showMobileFilters, setShowMobileFilters] = useState(false)
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>([] as any)

  const allResults = useMemo(() => {
    if (!query) return []
    return searchProducts(query)
  }, [query])

  const result = useMemo(
    () => filterProducts(allResults, activeFilters, sort, page, 12),
    [allResults, activeFilters, sort, page]
  )

  const handleToggleFilter = useCallback((groupId: string, value: string) => {
    setActiveFilters((prev) => {
      const exists = prev.find((f) => f.groupId === groupId && f.value === value)
      if (exists) return prev.filter((f) => f !== exists)
      return [...prev, { groupId, value }]
    })
    setPage(1)
  }, [])

  const handleClearFilters = useCallback(() => {
    setActiveFilters([])
    setPage(1)
  }, [])

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    setQuery(inputValue)
    setShowSuggestions(false)
    const params = new URLSearchParams(searchParams.toString())
    params.set('q', inputValue)
    router.replace(`/search?${params.toString()}`, { scroll: false })
    setPage(1)
  }

  function handleSuggestionClick(href: string) {
    window.location.href = href
  }

  return (
    <PageTransition>
      <Helmet>
        <title>Search | {siteConfig.seo.title}</title>
        <meta name="description" content="Search our collection of luxury sarees and designer lehengas." />
      </Helmet>

      <section className="pt-28 md:pt-32">
        <Container>
          <div className="mx-auto max-w-2xl">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-heading text-3xl text-center text-night md:text-4xl"
            >
              Search Our Collection
            </motion.h1>

            <form onSubmit={handleSearch} className="relative mt-8">
              <div className="relative">
                <SearchIcon className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-text-muted" />
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => {
                    setInputValue(e.target.value)
                    setShowSuggestions(true)
                  }}
                  onFocus={() => setShowSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                  placeholder="Search by product, fabric, occasion..."
                  className="w-full rounded-lg border border-night/10 bg-white py-4 pl-12 pr-4 font-body text-base text-night placeholder:text-text-muted/50 transition-colors focus:border-primary/30 focus:outline-none focus:ring-1 focus:ring-primary/20"
                  aria-label="Search products"
                />
                {inputValue && (
                  <button
                    type="button"
                    onClick={() => { setInputValue(''); setQuery('') }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-night"
                    aria-label="Clear search"
                  >
                    <X className="size-4" />
                  </button>
                )}
              </div>

              {showSuggestions && !inputValue && (
                <div className="absolute left-0 right-0 top-full z-50 mt-2 rounded-lg border border-night/5 bg-white p-4 shadow-lg">
                  <p className="mb-3 font-body text-xs font-semibold uppercase tracking-[0.15em] text-text-muted">
                    Quick Suggestions
                  </p>
                  <div className="space-y-1">
                    {SUGGESTIONS.map((s) => (
                      <button
                        key={s.label}
                        type="button"
                        onClick={() => handleSuggestionClick(s.href)}
                        className="block w-full rounded-md px-3 py-2 text-left font-body text-sm text-text-secondary transition-colors hover:bg-secondary hover:text-night"
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </form>
          </div>
        </Container>
      </section>

      {query && (
        <section className="py-section">
          <Container>
            <div className="flex gap-8">
              <div className="hidden w-64 flex-shrink-0 lg:block">
                <div className="sticky top-28">
                  <FilterSidebar
                    activeFilters={activeFilters}
                    onToggleFilter={handleToggleFilter}
                    onClearFilters={handleClearFilters}
                  />
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-4">
                  <p className="font-body text-sm text-text-muted">
                    {result.total > 0 ? (
                      <>
                        <span className="font-medium text-night">{result.total}</span>{' '}
                        {result.total === 1 ? 'result' : 'results'} for &ldquo;{query}&rdquo;
                      </>
                    ) : (
                      <>No results for &ldquo;{query}&rdquo;</>
                    )}
                  </p>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setShowMobileFilters(true)}
                      className="flex items-center gap-2 rounded-md border border-night/10 px-4 py-2.5 font-body text-sm text-night transition-colors hover:border-night/30 lg:hidden"
                    >
                      <SlidersHorizontal className="size-4" />
                      Filters
                      {activeFilters.length > 0 && (
                        <span className="flex size-5 items-center justify-center rounded-full bg-primary text-[10px] text-white">
                          {activeFilters.length}
                        </span>
                      )}
                    </button>
                    <SortDropdown value={sort} onChange={setSort} />
                  </div>
                </div>

                <div className="mt-8">
                  {result.products.length > 0 ? (
                    <ProductGrid
                      products={result.products}
                      columns={3}
                      onQuickView={setQuickViewProduct}
                    />
                  ) : (
                    <EmptyState onClear={handleClearFilters} />
                  )}
                </div>

                {result.totalPages > 1 && (
                  <div className="mt-12">
                    <Pagination
                      current={result.page}
                      total={result.totalPages}
                      onPageChange={setPage}
                    />
                  </div>
                )}
              </div>
            </div>
          </Container>

          <FilterSidebar
            activeFilters={activeFilters}
            onToggleFilter={handleToggleFilter}
            onClearFilters={handleClearFilters}
            isOpen={showMobileFilters}
            onClose={() => setShowMobileFilters(false)}
            isMobile
          />
        </section>
      )}

      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </PageTransition>
  )
}
