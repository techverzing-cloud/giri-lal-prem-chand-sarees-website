import { Helmet } from 'react-helmet-async'
import { useParams, useRouter } from 'next/navigation'
import { getAdminArticleById, getAdminAuthors } from '@/data/admin/journal'
import { RichTextEditor } from '@/components/admin/forms/RichTextEditor'
import { SeoEditor } from '@/components/admin/forms/SeoEditor'
import type { AdminSEO } from '@/types/admin'
import { useState } from 'react'
import { Save, ArrowLeft, Calendar, Eye } from 'lucide-react'

export default function AdminJournalFormPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const isNew = !id || id === 'new'
  const article = !isNew ? getAdminArticleById(id) : undefined
  const authors = getAdminAuthors()

  const [title, setTitle] = useState(article?.title ?? '')
  const [content, setContent] = useState(article?.content ?? '')
  const [seo, setSeo] = useState<AdminSEO>(article?.seo ?? { metaTitle: '', metaDescription: '' })

  return (
    <div>
      <Helmet><title>{isNew ? 'New Article' : `Edit: ${article?.title}`} — Admin</title></Helmet>

      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => router.push('/admin/journal')} className="rounded-lg p-2 text-night/40 transition-colors hover:bg-night/5 hover:text-night">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="font-heading text-2xl text-night">{isNew ? 'New Article' : article?.title}</h1>
            <p className="font-body text-sm text-text-muted">{isNew ? 'Write a new journal article' : `Last updated ${article?.updatedAt ? new Date(article.updatedAt).toLocaleDateString() : ''}`}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="inline-flex items-center gap-2 rounded-lg border border-night/10 px-4 py-2.5 font-body text-sm text-night transition-colors hover:bg-night/5">
            <Calendar className="h-4 w-4" /> Schedule
          </button>
          <button className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 font-body text-sm font-medium text-white transition-colors hover:bg-primary-light">
            <Save className="h-4 w-4" /> {isNew ? 'Publish' : 'Update'}
          </button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-xl border border-night/10 bg-white p-6">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Article title..."
              className="w-full border-0 bg-transparent font-heading text-3xl text-night placeholder:text-night/20 focus:outline-none"
            />
          </div>

          <div className="rounded-xl border border-night/10 bg-white p-6">
            <RichTextEditor value={content} onChange={setContent} label="Content" />
          </div>

          <SeoEditor seo={seo} onChange={setSeo} />
        </div>

        <div className="space-y-6">
          <div className="rounded-xl border border-night/10 bg-white p-6">
            <h2 className="mb-4 font-heading text-lg text-night">Article Settings</h2>
            <div className="space-y-4">
              <div>
                <label className="mb-1 block font-body text-xs font-medium text-text-muted">Category</label>
                <select className="w-full rounded-lg border border-night/10 px-4 py-2.5 font-body text-sm text-night focus:border-primary/30 focus:outline-none focus:ring-1 focus:ring-primary/20">
                  <option>Bridal</option><option>Sarees</option><option>Lehengas</option><option>Styling</option><option>Craft</option><option>Heritage</option>
                </select>
              </div>
              <div>
                <label className="mb-1 block font-body text-xs font-medium text-text-muted">Author</label>
                <select className="w-full rounded-lg border border-night/10 px-4 py-2.5 font-body text-sm text-night focus:border-primary/30 focus:outline-none focus:ring-1 focus:ring-primary/20">
                  {authors.map((a) => <option key={a.id} value={a.id}>{a.name}</option>)}
                </select>
              </div>
              <div>
                <label className="mb-1 block font-body text-xs font-medium text-text-muted">Status</label>
                <select className="w-full rounded-lg border border-night/10 px-4 py-2.5 font-body text-sm text-night focus:border-primary/30 focus:outline-none focus:ring-1 focus:ring-primary/20">
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="scheduled">Scheduled</option>
                </select>
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded border-night/30 text-primary focus:ring-primary" />
                <span className="font-body text-sm text-night">Featured article</span>
              </label>
            </div>
          </div>

          <div className="rounded-xl border border-night/10 bg-white p-6">
            <h2 className="mb-4 font-heading text-lg text-night">Cover Image</h2>
            <div className="flex aspect-[16/10] items-center justify-center rounded-lg border border-dashed border-night/20 bg-night/[0.02]">
              <div className="text-center">
                <Eye className="mx-auto h-8 w-8 text-night/20" />
                <p className="mt-2 font-body text-sm text-text-muted/50">Click to upload</p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-night/10 bg-white p-6">
            <h2 className="mb-4 font-heading text-lg text-night">Tags</h2>
            <div className="flex flex-wrap gap-2">
              {['Bridal', 'Lehengas', 'Sarees', 'Silk', 'Wedding', 'Styling', 'Craftsmanship', 'Trends'].map((tag) => (
                <label key={tag} className="flex items-center gap-1.5 cursor-pointer">
                  <input type="checkbox" className="rounded border-night/30 text-primary focus:ring-primary" />
                  <span className="font-body text-xs text-night">{tag}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
