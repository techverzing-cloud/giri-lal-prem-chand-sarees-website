import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { DataTable, type Column } from '@/components/admin/common/DataTable'
import { SearchBar } from '@/components/admin/common/SearchBar'
import { StatusBadge } from '@/components/admin/common/StatusBadge'
import { Pagination } from '@/components/admin/common/Pagination'
import { FilterPanel } from '@/components/admin/common/FilterPanel'
import { queryArticles } from '@/services/admin/journalService'
import type { AdminArticle } from '@/types/admin'
import { Plus, FileEdit, Eye, MoreHorizontal } from 'lucide-react'

export default function AdminJournalListPage() {
  const router = useRouter()
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const pageSize = 10

  const { items, total, totalPages } = queryArticles({ search: search || undefined, status: statusFilter || undefined, page, pageSize })

  const columns: Column<AdminArticle>[] = [
    { key: 'title', label: 'Article', render: (a) => (
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-night/5">
          <Eye className="h-4 w-4 text-night/40" />
        </div>
        <div>
          <p className="font-medium text-night">{a.title}</p>
          <p className="text-xs text-text-muted">{a.category} • {a.readingTime} min read</p>
        </div>
      </div>
    )},
    { key: 'status', label: 'Status', render: (a) => <StatusBadge status={a.status} /> },
    { key: 'featured', label: '', hideOnMobile: true, render: (a) => a.featured ? <StatusBadge status="success" label="Featured" /> : null },
    { key: 'actions', label: '', className: 'w-16', render: (a) => (
      <button onClick={() => router.push(`/admin/journal/${a.id}/edit`)} className="rounded-lg p-1.5 text-night/40 transition-colors hover:bg-night/5 hover:text-night">
        <FileEdit className="h-4 w-4" />
      </button>
    )},
  ]

  return (
    <div>
      <Helmet><title>Journal — Admin</title></Helmet>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-heading text-2xl text-night">Journal</h1>
          <p className="font-body text-sm text-text-muted">{total} articles</p>
        </div>
        <Link href="/admin/journal/new" className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 font-body text-sm font-medium text-white transition-colors hover:bg-primary-light">
          <Plus className="h-4 w-4" /> New Article
        </Link>
      </div>

      <div className="mb-4 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="w-full max-w-sm">
          <SearchBar value={search} onChange={(v) => { setSearch(v); setPage(1) }} placeholder="Search articles..." />
        </div>
        <FilterPanel groups={[
          { label: 'Status', options: [
            { label: 'Published', value: 'published' },
            { label: 'Draft', value: 'draft' },
            { label: 'Scheduled', value: 'scheduled' },
          ], selected: statusFilter, onChange: (v) => { setStatusFilter(v); setPage(1) }},
        ]} />
      </div>

      <DataTable columns={columns} data={items} keyExtractor={(a) => a.id} onRowClick={(a) => router.push(`/admin/journal/${a.id}/edit`)} emptyMessage="No articles found." />
      <div className="mt-4"><Pagination page={page} totalPages={totalPages} onPageChange={setPage} /></div>
    </div>
  )
}
