import { Helmet } from 'react-helmet-async'
import { AdminLayout } from '@/components/admin/AdminLayout'
import { ContentSectionCard } from '@/components/admin/ContentSectionCard'
import { EmptyState } from '@/components/admin/EmptyState'
import { Layout, Search } from 'lucide-react'
import { useState } from 'react'

const contentSections = [
  { id: 'home-hero', title: 'Hero Banner', page: 'Homepage', visible: true, order: 1 },
  { id: 'home-legacy', title: 'Legacy Section', page: 'Homepage', visible: true, order: 2 },
  { id: 'home-featured', title: 'Featured Collections', page: 'Homepage', visible: true, order: 3 },
  { id: 'home-brands', title: 'Brand Section', page: 'Homepage', visible: true, order: 4 },
  { id: 'home-fabrics', title: 'Fabric Section', page: 'Homepage', visible: true, order: 5 },
  { id: 'home-products', title: 'Featured Products', page: 'Homepage', visible: true, order: 6 },
  { id: 'home-whyus', title: 'Why Choose Us', page: 'Homepage', visible: true, order: 7 },
  { id: 'home-process', title: 'Process Section', page: 'Homepage', visible: true, order: 8 },
  { id: 'home-testimonials', title: 'Testimonials', page: 'Homepage', visible: true, order: 9 },
  { id: 'home-instagram', title: 'Instagram Gallery', page: 'Homepage', visible: true, order: 10 },
  { id: 'home-cta', title: 'CTA Section', page: 'Homepage', visible: true, order: 11 },
  { id: 'about-hero', title: 'About Hero', page: 'About', visible: true, order: 1 },
  { id: 'about-legacy', title: 'Legacy Section', page: 'About', visible: true, order: 2 },
  { id: 'about-story', title: 'Our Story', page: 'About', visible: true, order: 3 },
  { id: 'about-timeline', title: 'Heritage Timeline', page: 'About', visible: true, order: 4 },
  { id: 'about-philosophy', title: 'Brand Philosophy', page: 'About', visible: true, order: 5 },
  { id: 'about-craftsmanship', title: 'Craftsmanship', page: 'About', visible: true, order: 6 },
  { id: 'about-artisans', title: 'Artisans', page: 'About', visible: true, order: 7 },
  { id: 'about-store', title: 'Store Experience', page: 'About', visible: true, order: 8 },
  { id: 'about-trust', title: 'Trust Section', page: 'About', visible: true, order: 9 },
  { id: 'about-awards', title: 'Awards', page: 'About', visible: true, order: 10 },
  { id: 'about-gallery', title: 'Gallery', page: 'About', visible: true, order: 11 },
  { id: 'about-faq', title: 'FAQ Section', page: 'About', visible: true, order: 12 },
  { id: 'about-cta', title: 'About CTA', page: 'About', visible: true, order: 13 },
  { id: 'journal-hero', title: 'Journal Hero', page: 'Journal', visible: true, order: 1 },
  { id: 'journal-newsletter', title: 'Newsletter Signup', page: 'Journal', visible: true, order: 2 },
]

export default function AdminContentPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterPage, setFilterPage] = useState<string | null>(null)

  const pages = [...new Set(contentSections.map((s) => s.page))]
  const filtered = contentSections.filter((s) => {
    const matchesSearch = searchQuery
      ? s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.page.toLowerCase().includes(searchQuery.toLowerCase())
      : true
    const matchesPage = filterPage ? s.page === filterPage : true
    return matchesSearch && matchesPage
  })

  return (
    <AdminLayout title="Content Management" description="Manage all editable content sections across your site">
      <Helmet>
        <title>Content — Admin Preview</title>
      </Helmet>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
          <input
            type="text"
            placeholder="Search sections..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-night/10 bg-white py-2.5 pl-10 pr-4 font-body text-sm text-night placeholder:text-text-muted/50 transition-colors focus:border-primary/30 focus:outline-none focus:ring-1 focus:ring-primary/20"
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setFilterPage(null)}
            className={`rounded-lg border px-3 py-2 font-body text-xs font-medium transition-colors ${!filterPage ? 'border-primary bg-primary/10 text-primary' : 'border-night/10 text-text-muted hover:bg-night/5'}`}
          >
            All Pages
          </button>
          {pages.map((page) => (
            <button
              key={page}
              onClick={() => setFilterPage(page)}
              className={`rounded-lg border px-3 py-2 font-body text-xs font-medium transition-colors ${filterPage === page ? 'border-primary bg-primary/10 text-primary' : 'border-night/10 text-text-muted hover:bg-night/5'}`}
            >
              {page}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={Layout}
          title="No sections found"
          description="Try adjusting your search or filter criteria"
        />
      ) : (
        <div className="space-y-2">
          {filtered.map((section) => (
            <ContentSectionCard
              key={section.id}
              title={section.title}
              subtitle={section.page}
              visible={section.visible}
              displayOrder={section.order}
            />
          ))}
        </div>
      )}
    </AdminLayout>
  )
}
