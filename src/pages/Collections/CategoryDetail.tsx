import { useState, useMemo, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { SlidersHorizontal, X } from 'lucide-react'
import { PageTransition } from '@/components/animations/PageTransition'
import { Container } from '@/components/ui/Container'
import { Breadcrumb } from '@/components/layout/Breadcrumb'
import { ProductGrid } from '@/components/shop/ProductGrid'
import { QuickViewModal } from '@/components/shop/QuickViewModal'
import { FilterSidebar } from '@/components/shop/FilterSidebar'
import { SortDropdown } from '@/components/shop/SortDropdown'
import { Pagination } from '@/components/shop/Pagination'
import { EmptyState } from '@/components/shop/EmptyState'
import { RelatedCollections } from '@/components/shop/RelatedCollections'
import type { Product, BrandKey, SortOption, ActiveFilter } from '@/types'
import { getCategoriesByBrand, getCategoryBySlug, CATEGORIES } from '@/data/categories'
import { getProductsByCategory, filterProducts } from '@/data/products'
import { siteConfig } from '@/config/site'
import { cn } from '@/utils/cn'

export default function CategoryDetailPage() {
  const { category: categorySlug } = useParams<{ category: string }>()
  const navigate = useNavigate()
  const brandFromPath = window.location.pathname.includes('/sarees/') ? 'girilal' : 'arunima'

  const category = categorySlug ? getCategoryBySlug(brandFromPath, categorySlug) : undefined

  const [activeFilters, setActiveFilters] = useState<ActiveFilter[]>([])
  const [sort, setSort] = useState<SortOption>('newest')
  const [page, setPage] = useState(1)
  const [showMobileFilters, setShowMobileFilters] = useState(false)
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null)

  const allProducts = useMemo(
    () => category ? getProductsByCategory(brandFromPath, category.slug) : [],
    [category, brandFromPath]
  )

  const result = useMemo(
    () => filterProducts(allProducts, activeFilters, sort, page, 12),
    [allProducts, activeFilters, sort, page]
  )

  const relatedCategories = useMemo(() => {
    if (!category) return []
    return CATEGORIES.filter(
      (c) => c.brand === category.brand && c.id !== category.id
    ).slice(0, 4)
  }, [category])

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

  if (!category) {
    return (
      <PageTransition>
        <div className="flex min-h-screen items-center justify-center">
          <div className="text-center">
            <h1 className="font-heading text-4xl text-night">Category Not Found</h1>
            <p className="mt-4 font-body text-text-secondary">The category you are looking for does not exist.</p>
          </div>
        </div>
      </PageTransition>
    )
  }

  const brandName = category.brand === 'girilal'
    ? siteConfig.brand.girilal.name
    : siteConfig.brand.arunima.name

  return (
    <PageTransition>
      <Helmet>
        <title>{category.name} | {brandName} | {siteConfig.seo.title}</title>
        <meta name="description" content={category.description} />
      </Helmet>

      <section className="pt-28 md:pt-32">
        <Container>
          <Breadcrumb />
          <div className="mt-6">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-body text-xs font-semibold uppercase tracking-[0.25em] text-text-muted"
            >
              {brandName}
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-2 font-heading text-4xl text-night md:text-5xl"
            >
              {category.name}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-3 max-w-2xl font-body text-base text-text-secondary"
            >
              {category.description}
            </motion.p>
          </div>
        </Container>
      </section>

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
                  <span className="font-medium text-night">{result.total}</span>{' '}
                  {result.total === 1 ? 'Product' : 'Products'}
                  {activeFilters.length > 0 && ' found'}
                </p>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setShowMobileFilters(true)}
                    className="flex items-center gap-2 rounded-md border border-night/10 px-4 py-2.5 font-body text-sm text-night transition-colors hover:border-night/30 lg:hidden"
                    aria-label="Open filters"
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

              {result.products.length > 0 ? (
                <div className="mt-8">
                  <ProductGrid
                    products={result.products}
                    columns={3}
                    onQuickView={setQuickViewProduct}
                  />
                </div>
              ) : (
                <EmptyState onClear={handleClearFilters} />
              )}

              <div className="mt-12">
                <Pagination
                  current={result.page}
                  total={result.totalPages}
                  onPageChange={setPage}
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      <FilterSidebar
        activeFilters={activeFilters}
        onToggleFilter={handleToggleFilter}
        onClearFilters={handleClearFilters}
        isOpen={showMobileFilters}
        onClose={() => setShowMobileFilters(false)}
        isMobile
      />

      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />

      <RelatedCollections categories={relatedCategories} />
    </PageTransition>
  )
}
