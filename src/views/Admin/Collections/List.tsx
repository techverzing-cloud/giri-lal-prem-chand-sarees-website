import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import Link from 'next/link'
import { DataTable, type Column } from '@/components/admin/common/DataTable'
import { StatusBadge } from '@/components/admin/common/StatusBadge'
import { getAdminCollections } from '@/data/admin/collections'
import type { AdminCollection } from '@/types/admin'
import { Plus, Eye } from 'lucide-react'

export default function AdminCollectionsPage() {
  const [collections] = useState(getAdminCollections())

  const columns: Column<AdminCollection>[] = [
    { key: 'name', label: 'Collection', render: (c) => (
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-night/5">
          <Eye className="h-4 w-4 text-night/40" />
        </div>
        <div>
          <p className="font-medium text-night">{c.name}</p>
          <p className="text-xs text-text-muted capitalize">{c.type} • {c.brand === 'girilal' ? 'Giri Lal' : 'Arunima'}</p>
        </div>
      </div>
    )},
    { key: 'type', label: 'Type', className: 'capitalize', hideOnMobile: true },
    { key: 'productCount', label: 'Products', hideOnMobile: true },
    { key: 'visible', label: 'Status', render: (c) => c.visible ? <StatusBadge status="published" label="Visible" /> : <StatusBadge status="draft" label="Hidden" /> },
    { key: 'featured', label: '', render: (c) => c.featured ? <StatusBadge status="success" label="Featured" /> : null },
  ]

  return (
    <div>
      <Helmet><title>Collections — Admin</title></Helmet>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl text-night">Collections</h1>
          <p className="font-body text-sm text-text-muted">{collections.length} collections</p>
        </div>
        <Link href="/admin/collections/new" className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 font-body text-sm font-medium text-white transition-colors hover:bg-primary-light">
          <Plus className="h-4 w-4" /> New Collection
        </Link>
      </div>
      <DataTable columns={columns} data={collections} keyExtractor={(c) => c.id} />
    </div>
  )
}
