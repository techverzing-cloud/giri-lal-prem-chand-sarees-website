import type { AdminSEO } from '@/types/admin'
import { Search } from 'lucide-react'

interface SeoEditorProps {
  seo: AdminSEO
  onChange: (seo: AdminSEO) => void
}

export function SeoEditor({ seo, onChange }: SeoEditorProps) {
  const update = (key: keyof AdminSEO, value: string) => {
    onChange({ ...seo, [key]: value })
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Search className="h-4 w-4 text-primary/60" />
        <span className="font-body text-xs font-medium uppercase tracking-wider text-text-muted">SEO Settings</span>
      </div>

      <div className="rounded-xl border border-night/10 bg-white p-5">
        <div className="mb-4 rounded-lg border border-night/10 bg-night/[0.02] p-3">
          <p className="font-body text-xs text-text-muted mb-1">Google Preview</p>
          <p className="truncate font-body text-sm text-[#1a0dab]">{seo.metaTitle || 'Meta title'}</p>
          <p className="line-clamp-2 font-body text-xs text-[#4d5156]">{seo.metaDescription || 'Meta description'}</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block font-body text-xs font-medium text-text-muted">Meta Title</label>
            <input
              type="text"
              value={seo.metaTitle}
              onChange={(e) => update('metaTitle', e.target.value)}
              className="w-full rounded-lg border border-night/10 px-3 py-2 font-body text-sm text-night focus:border-primary/30 focus:outline-none focus:ring-1 focus:ring-primary/20"
            />
            <p className="mt-1 text-right font-body text-xs text-text-muted/60">{seo.metaTitle.length} / 60</p>
          </div>
          <div>
            <label className="mb-1 block font-body text-xs font-medium text-text-muted">Meta Description</label>
            <textarea
              value={seo.metaDescription}
              onChange={(e) => update('metaDescription', e.target.value)}
              rows={2}
              className="w-full rounded-lg border border-night/10 px-3 py-2 font-body text-sm text-night focus:border-primary/30 focus:outline-none focus:ring-1 focus:ring-primary/20 resize-none"
            />
            <p className="mt-1 text-right font-body text-xs text-text-muted/60">{seo.metaDescription.length} / 160</p>
          </div>
          <div>
            <label className="mb-1 block font-body text-xs font-medium text-text-muted">Canonical URL</label>
            <input
              type="text"
              value={seo.canonical || ''}
              onChange={(e) => update('canonical', e.target.value)}
              className="w-full rounded-lg border border-night/10 px-3 py-2 font-body text-sm text-night focus:border-primary/30 focus:outline-none focus:ring-1 focus:ring-primary/20"
            />
          </div>
          <div>
            <label className="mb-1 block font-body text-xs font-medium text-text-muted">Robots</label>
            <select
              value={seo.robots || 'index, follow'}
              onChange={(e) => update('robots', e.target.value)}
              className="w-full rounded-lg border border-night/10 px-3 py-2 font-body text-sm text-night focus:border-primary/30 focus:outline-none focus:ring-1 focus:ring-primary/20"
            >
              <option value="index, follow">Index, Follow</option>
              <option value="noindex, follow">No Index, Follow</option>
              <option value="index, nofollow">Index, No Follow</option>
              <option value="noindex, nofollow">No Index, No Follow</option>
            </select>
          </div>
        </div>

        <details className="mt-4">
          <summary className="cursor-pointer font-body text-xs font-medium text-text-muted hover:text-night">Open Graph & Twitter</summary>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block font-body text-xs font-medium text-text-muted">OG Title</label>
              <input type="text" value={seo.ogTitle || ''} onChange={(e) => update('ogTitle', e.target.value)} className="w-full rounded-lg border border-night/10 px-3 py-2 font-body text-sm text-night focus:border-primary/30 focus:outline-none focus:ring-1 focus:ring-primary/20" />
            </div>
            <div>
              <label className="mb-1 block font-body text-xs font-medium text-text-muted">OG Description</label>
              <input type="text" value={seo.ogDescription || ''} onChange={(e) => update('ogDescription', e.target.value)} className="w-full rounded-lg border border-night/10 px-3 py-2 font-body text-sm text-night focus:border-primary/30 focus:outline-none focus:ring-1 focus:ring-primary/20" />
            </div>
            <div>
              <label className="mb-1 block font-body text-xs font-medium text-text-muted">OG Image</label>
              <input type="text" value={seo.ogImage || ''} onChange={(e) => update('ogImage', e.target.value)} className="w-full rounded-lg border border-night/10 px-3 py-2 font-body text-sm text-night focus:border-primary/30 focus:outline-none focus:ring-1 focus:ring-primary/20" />
            </div>
            <div>
              <label className="mb-1 block font-body text-xs font-medium text-text-muted">Twitter Card</label>
              <select value={seo.twitterCard || 'summary_large_image'} onChange={(e) => update('twitterCard', e.target.value)} className="w-full rounded-lg border border-night/10 px-3 py-2 font-body text-sm text-night focus:border-primary/30 focus:outline-none focus:ring-1 focus:ring-primary/20">
                <option value="summary_large_image">Summary Large Image</option>
                <option value="summary">Summary</option>
                <option value="app">App</option>
                <option value="player">Player</option>
              </select>
            </div>
          </div>
        </details>
      </div>
    </div>
  )
}
