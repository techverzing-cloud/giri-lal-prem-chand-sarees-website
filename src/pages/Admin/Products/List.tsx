import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link, useNavigate } from 'react-router-dom'
import { DataTable, type Column } from '@/components/admin/common/DataTable'
import { SearchBar } from '@/components/admin/common/SearchBar'
import { StatusBadge } from '@/components/admin/common/StatusBadge'
import { Pagination } from '@/components/admin/common/Pagination'
import { SkeletonLoader } from '@/components/admin/common/SkeletonLoader'
import { ConfirmDialog } from '@/components/admin/common/ConfirmDialog'
import { FilterPanel } from '@/components/admin/common/FilterPanel'
import { queryProducts } from '@/services/admin/productService'
import type { AdminProduct, ProductStatus } from '@/types/admin'
import { Plus, MoreHorizontal, Copy, Trash2, FileEdit, Eye, Archive } from 'lucide-react'
import { useState as useStateD } from 'react'
import { useRef, useEffect } from 'react'

export default function AdminProductsPage() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<ProductStatus | null>(null)
  const [brandFilter, setBrandFilter] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const [sortKey, setSortKey] = useState('createdAt')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null)
  const [menuOpen, setMenuOpen] = useState<string | null>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  const pageSize = 15
  const { items, total, totalPages } = queryProducts({ search: search || undefined, status: statusFilter || undefined, brand: brandFilter || undefined, page, pageSize, sortBy: sortKey as 'name' | 'price' | 'createdAt', sortOrder })

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(null)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortKey(key)
      setSortOrder('desc')
    }
  }

  const formatPrice = (p: number) => `₹${(p / 1000).toFixed(1)}K`

  const columns: Column<AdminProduct>[] = [
    { key: 'name', label: 'Product', sortable: true, render: (p) => (
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-night/5 font-body text-xs text-night/40">
          {p.images[0] ? 'img' : <Eye className="h-4 w-4" />}
        </div>
        <div>
          <p className="font-medium text-night">{p.name}</p>
          <p className="text-xs text-text-muted">{p.sku}</p>
        </div>
      </div>
    )},
    { key: 'brand', label: 'Brand', hideOnMobile: true, render: (p) => (
      <span className="capitalize font-body text-sm">{p.brand === 'girilal' ? 'Giri Lal' : 'Arunima'}</span>
    )},
    { key: 'category', label: 'Category', hideOnMobile: true, className: 'capitalize' },
    { key: 'price', label: 'Price', sortable: true, hideOnMobile: true, render: (p) => formatPrice(p.price) },
    { key: 'status', label: 'Status', render: (p) => <StatusBadge status={p.status} /> },
    { key: 'featured', label: 'Featured', hideOnMobile: true, render: (p) => p.featured ? <StatusBadge status="success" label="Featured" /> : '—' },
    { key: 'actions', label: '', className: 'w-16', render: (p) => (
      <div className="relative" ref={menuRef}>
        <button onClick={(e) => { e.stopPropagation(); setMenuOpen(menuOpen === p.id ? null : p.id) }} className="rounded-lg p-1.5 text-night/40 transition-colors hover:bg-night/5 hover:text-night">
          <MoreHorizontal className="h-4 w-4" />
        </button>
        {menuOpen === p.id && (
          <div className="absolute right-0 top-full z-50 mt-1 w-40 rounded-lg border border-night/10 bg-white shadow-lg" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => { navigate(`/admin/products/${p.id}/edit`); setMenuOpen(null) }} className="flex w-full items-center gap-2 px-3 py-2 text-left font-body text-sm text-night/60 transition-colors hover:bg-night/5 hover:text-night">
              <FileEdit className="h-3.5 w-3.5" /> Edit
            </button>
            <button onClick={() => { navigate(`/product/${p.slug}`); setMenuOpen(null) }} className="flex w-full items-center gap-2 px-3 py-2 text-left font-body text-sm text-night/60 transition-colors hover:bg-night/5 hover:text-night">
              <Eye className="h-3.5 w-3.5" /> View
            </button>
            <button onClick={() => { setMenuOpen(null) }} className="flex w-full items-center gap-2 px-3 py-2 text-left font-body text-sm text-night/60 transition-colors hover:bg-night/5 hover:text-night">
              <Copy className="h-3.5 w-3.5" /> Duplicate
            </button>
            <button onClick={() => { setMenuOpen(null) }} className="flex w-full items-center gap-2 px-3 py-2 text-left font-body text-sm text-night/60 transition-colors hover:bg-night/5 hover:text-night">
              <Archive className="h-3.5 w-3.5" /> Archive
            </button>
            <div className="border-t border-night/5" />
            <button onClick={() => { setDeleteTarget(p.id); setMenuOpen(null) }} className="flex w-full items-center gap-2 px-3 py-2 text-left font-body text-sm text-error/60 transition-colors hover:bg-error/5 hover:text-error">
              <Trash2 className="h-3.5 w-3.5" /> Delete
            </button>
          </div>
        )}
      </div>
    )},
  ]

  return (
    <div>
      <Helmet><title>Products — Admin</title></Helmet>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-heading text-2xl text-night">Products</h1>
          <p className="font-body text-sm text-text-muted">{total} products total</p>
        </div>
        <Link to="/admin/products/new" className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 font-body text-sm font-medium text-white transition-colors hover:bg-primary-light">
          <Plus className="h-4 w-4" /> Add Product
        </Link>
      </div>

      <div className="mb-4 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="w-full max-w-sm">
          <SearchBar value={search} onChange={(v) => { setSearch(v); setPage(1) }} placeholder="Search products..." />
        </div>
        <FilterPanel groups={[
          { label: 'Status', options: [
            { label: 'Published', value: 'published' },
            { label: 'Draft', value: 'draft' },
            { label: 'Archived', value: 'archived' },
          ], selected: statusFilter, onChange: (v) => { setStatusFilter(v as ProductStatus | null); setPage(1) }},
          { label: 'Brand', options: [
            { label: 'Giri Lal', value: 'girilal' },
            { label: 'Arunima', value: 'arunima' },
          ], selected: brandFilter, onChange: (v) => { setBrandFilter(v); setPage(1) }},
        ]} />
      </div>

      <DataTable columns={columns} data={items} keyExtractor={(p) => p.id} onRowClick={(p) => navigate(`/admin/products/${p.id}/edit`)} sortKey={sortKey} sortOrder={sortOrder} onSort={handleSort} emptyMessage="No products found matching your criteria." />

      <div className="mt-4">
        <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
      </div>

      <ConfirmDialog open={!!deleteTarget} title="Delete Product" message="Are you sure you want to delete this product? This action cannot be undone." confirmLabel="Delete" variant="danger" onConfirm={() => { setDeleteTarget(null) }} onCancel={() => setDeleteTarget(null)} />
    </div>
  )
}
