import { Helmet } from 'react-helmet-async'
import { useParams, useNavigate } from 'react-router-dom'
import { getAdminProductById } from '@/data/admin/products'
import { SeoEditor } from '@/components/admin/forms/SeoEditor'
import { RichTextEditor } from '@/components/admin/forms/RichTextEditor'
import { useState } from 'react'
import type { AdminProduct, AdminSEO, ProductStatus } from '@/types/admin'
import { Save, ArrowLeft, Eye, Copy } from 'lucide-react'

export default function AdminProductFormPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isNew = !id || id === 'new'
  const product = !isNew ? getAdminProductById(id) : undefined

  const [name, setName] = useState(product?.name ?? '')
  const [description, setDescription] = useState(product?.description ?? '')
  const [brand, setBrand] = useState(product?.brand ?? 'girilal')
  const [price, setPrice] = useState(product?.price?.toString() ?? '')
  const [status, setStatus] = useState(product?.status ?? 'draft')
  const [featured, setFeatured] = useState(product?.featured ?? false)
  const [seo, setSeo] = useState<AdminSEO>(product?.seo ?? { metaTitle: '', metaDescription: '' })

  if (!isNew && !product) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="font-body text-text-muted">Product not found</p>
      </div>
    )
  }

  return (
    <div>
      <Helmet><title>{isNew ? 'New Product' : `Edit: ${product?.name}`} — Admin</title></Helmet>

      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/admin/products')} className="rounded-lg p-2 text-night/40 transition-colors hover:bg-night/5 hover:text-night">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="font-heading text-2xl text-night">{isNew ? 'New Product' : product?.name}</h1>
            <p className="font-body text-sm text-text-muted">{isNew ? 'Create a new product' : `SKU: ${product?.sku}`}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-lg border border-night/10 px-3 py-2">
            <label className="font-body text-xs text-text-muted">Status:</label>
            <select value={status} onChange={(e) => setStatus(e.target.value as ProductStatus)} className="border-0 bg-transparent font-body text-sm text-night focus:outline-none">
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </select>
          </div>
          <button className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 font-body text-sm font-medium text-white transition-colors hover:bg-primary-light">
            <Save className="h-4 w-4" /> Save
          </button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-xl border border-night/10 bg-white p-6">
            <h2 className="mb-4 font-heading text-lg text-night">Basic Information</h2>
            <div className="space-y-4">
              <div>
                <label className="mb-1 block font-body text-xs font-medium text-text-muted">Product Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-lg border border-night/10 px-4 py-2.5 font-body text-sm text-night focus:border-primary/30 focus:outline-none focus:ring-1 focus:ring-primary/20" />
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <label className="mb-1 block font-body text-xs font-medium text-text-muted">Brand</label>
                  <select value={brand} onChange={(e) => setBrand(e.target.value as 'girilal' | 'arunima')} className="w-full rounded-lg border border-night/10 px-4 py-2.5 font-body text-sm text-night focus:border-primary/30 focus:outline-none focus:ring-1 focus:ring-primary/20">
                    <option value="girilal">Giri Lal Prem Chand Sarees</option>
                    <option value="arunima">Arunima Fashions</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1 block font-body text-xs font-medium text-text-muted">Price (₹)</label>
                  <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full rounded-lg border border-night/10 px-4 py-2.5 font-body text-sm text-night focus:border-primary/30 focus:outline-none focus:ring-1 focus:ring-primary/20" />
                </div>
                <div className="flex items-end pb-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={featured} onChange={(e) => setFeatured(e.target.checked)} className="rounded border-night/30 text-primary focus:ring-primary" />
                    <span className="font-body text-sm text-night">Featured product</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-night/10 bg-white p-6">
            <h2 className="mb-4 font-heading text-lg text-night">Description</h2>
            <RichTextEditor value={description} onChange={setDescription} />
          </div>

          <div className="rounded-xl border border-night/10 bg-white p-6">
            <h2 className="mb-4 font-heading text-lg text-night">Product Gallery</h2>
            <div className="grid grid-cols-4 gap-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex aspect-[4/5] items-center justify-center rounded-lg border border-dashed border-night/20 bg-night/[0.02]">
                  <div className="text-center">
                    <Eye className="mx-auto h-6 w-6 text-night/20" />
                    <p className="mt-1 font-body text-xs text-text-muted/50">Image {i + 1}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-xl border border-night/10 bg-white p-6">
            <h2 className="mb-4 font-heading text-lg text-night">Categories & Tags</h2>
            <div className="space-y-4">
              <div>
                <label className="mb-1 block font-body text-xs font-medium text-text-muted">Category</label>
                <select className="w-full rounded-lg border border-night/10 px-4 py-2.5 font-body text-sm text-night focus:border-primary/30 focus:outline-none focus:ring-1 focus:ring-primary/20">
                  <option>Wedding</option><option>Bridal</option><option>Silk</option><option>Banarasi</option><option>Designer</option><option>Party</option>
                </select>
              </div>
              <div>
                <label className="mb-1 block font-body text-xs font-medium text-text-muted">Fabric</label>
                <select className="w-full rounded-lg border border-night/10 px-4 py-2.5 font-body text-sm text-night focus:border-primary/30 focus:outline-none focus:ring-1 focus:ring-primary/20">
                  <option>Banarasi Silk</option><option>Pure Silk</option><option>Georgette</option><option>Organza</option><option>Velvet</option>
                </select>
              </div>
              <div>
                <label className="mb-1 block font-body text-xs font-medium text-text-muted">Occasion</label>
                <select className="w-full rounded-lg border border-night/10 px-4 py-2.5 font-body text-sm text-night focus:border-primary/30 focus:outline-none focus:ring-1 focus:ring-primary/20">
                  <option>Wedding</option><option>Bridal</option><option>Festive</option><option>Party</option><option>Engagement</option>
                </select>
              </div>
              <div>
                <label className="mb-1 block font-body text-xs font-medium text-text-muted">Colours</label>
                <div className="flex flex-wrap gap-2">
                  {['Red', 'Gold', 'Maroon', 'Ivory', 'Pink', 'Green', 'Blue'].map((c) => (
                    <label key={c} className="flex items-center gap-1.5 cursor-pointer">
                      <input type="checkbox" className="rounded border-night/30 text-primary focus:ring-primary" />
                      <span className="font-body text-xs text-night">{c}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <SeoEditor seo={seo} onChange={setSeo} />
        </div>
      </div>
    </div>
  )
}
