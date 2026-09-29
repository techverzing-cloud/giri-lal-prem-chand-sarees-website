import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { SeoPreview } from '@/components/admin/SeoPreview'
import { SitemapPreview } from '@/components/admin/SitemapPreview'
import { RobotsPreview } from '@/components/admin/RobotsPreview'
import { RedirectTable } from '@/components/admin/RedirectTable'
import { getAdminRedirects, adminSEOPages } from '@/data/admin/seo'
import { Globe, ArrowRight } from 'lucide-react'

export default function AdminSEOPage() {
  const [selectedPage, setSelectedPage] = useState(adminSEOPages[0])
  const redirects = getAdminRedirects()

  return (
    <div>
      <Helmet><title>SEO — Admin</title></Helmet>

      <div className="mb-6">
        <h1 className="font-heading text-2xl text-night">SEO Management</h1>
        <p className="font-body text-sm text-text-muted">Manage search engine optimisation for all pages</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-xl border border-night/10 bg-white">
            <div className="border-b border-night/10 px-4 py-3">
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-primary/60" />
                <span className="font-body text-xs font-medium uppercase tracking-wider text-text-muted">Pages</span>
              </div>
            </div>
            <div className="p-2 space-y-1">
              {adminSEOPages.map((page) => (
                <button key={page.path} onClick={() => setSelectedPage(page)} className={`w-full flex items-center gap-3 rounded-md px-3 py-2.5 text-left font-body text-sm transition-all ${selectedPage.path === page.path ? 'bg-primary/10 font-medium text-primary' : 'text-night/60 hover:bg-night/5 hover:text-night'}`}>
                  <ArrowRight className="h-3.5 w-3.5" />
                  <span className="flex-1">{page.label}</span>
                  <code className="rounded bg-night/5 px-1.5 py-0.5 font-body text-[10px] text-text-muted">{page.path}</code>
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-night/10 bg-white p-5">
            <h3 className="mb-3 font-heading text-base text-night">Redirects</h3>
            <RedirectTable redirects={redirects} />
          </div>
        </div>

        <div className="lg:col-span-3 space-y-6">
          <SeoPreview
            seo={{ metaTitle: selectedPage.title, metaDescription: selectedPage.description }}
            defaultTitle={selectedPage.title}
            defaultDescription={selectedPage.description}
            path={selectedPage.path}
          />
          <SitemapPreview />
          <RobotsPreview />
        </div>
      </div>
    </div>
  )
}
