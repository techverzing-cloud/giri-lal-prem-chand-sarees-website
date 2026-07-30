import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { MediaGrid } from '@/components/admin/MediaGrid'
import { SearchBar } from '@/components/admin/common/SearchBar'
import { queryMedia } from '@/services/admin/mediaService'
import type { AdminMedia } from '@/types/admin'
import { Upload, Grid3X3, List } from 'lucide-react'

export default function AdminMediaPage() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const { items } = queryMedia({ search: search || undefined, category: category || undefined })

  const categories = [
    { label: 'All', value: null },
    { label: 'Images', value: 'image' },
    { label: 'Logos', value: 'logo' },
    { label: 'Icons', value: 'icon' },
  ]

  return (
    <div>
      <Helmet><title>Media — Admin</title></Helmet>

      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl text-night">Media Library</h1>
          <p className="font-body text-sm text-text-muted">{items.length} assets</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex rounded-lg border border-night/10 overflow-hidden">
            <button onClick={() => setViewMode('grid')} className={`p-2 ${viewMode === 'grid' ? 'bg-primary/10 text-primary' : 'text-night/40 hover:bg-night/5'}`}><Grid3X3 className="h-4 w-4" /></button>
            <button onClick={() => setViewMode('list')} className={`p-2 ${viewMode === 'list' ? 'bg-primary/10 text-primary' : 'text-night/40 hover:bg-night/5'}`}><List className="h-4 w-4" /></button>
          </div>
          <button className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 font-body text-sm font-medium text-white transition-colors hover:bg-primary-light">
            <Upload className="h-4 w-4" /> Upload
          </button>
        </div>
      </div>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="w-full max-w-sm"><SearchBar value={search} onChange={setSearch} placeholder="Search media files..." /></div>
        <div className="flex gap-2">
          {categories.map((cat) => (
            <button key={cat.label} onClick={() => setCategory(cat.value)} className={`rounded-lg border px-3 py-1.5 font-body text-xs transition-colors ${category === cat.value ? 'border-primary bg-primary/10 text-primary' : 'border-night/10 text-text-muted hover:bg-night/5'}`}>
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      <MediaGrid items={items as unknown as import('@/types/cms').MediaItem[]} />
    </div>
  )
}
