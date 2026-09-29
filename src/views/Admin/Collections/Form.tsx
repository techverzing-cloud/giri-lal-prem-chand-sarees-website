import { Helmet } from 'react-helmet-async'
import { useRouter } from 'next/navigation'
import { Save, ArrowLeft, Eye } from 'lucide-react'

export default function AdminCollectionFormPage() {
  const router = useRouter()

  return (
    <div>
      <Helmet><title>New Collection — Admin</title></Helmet>

      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => router.push('/admin/collections')} className="rounded-lg p-2 text-night/40 transition-colors hover:bg-night/5 hover:text-night">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="font-heading text-2xl text-night">New Collection</h1>
            <p className="font-body text-sm text-text-muted">Create a new product collection</p>
          </div>
        </div>
        <button className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 font-body text-sm font-medium text-white transition-colors hover:bg-primary-light">
          <Save className="h-4 w-4" /> Save Collection
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-xl border border-night/10 bg-white p-6">
            <h2 className="mb-4 font-heading text-lg text-night">Collection Details</h2>
            <div className="space-y-4">
              <div>
                <label className="mb-1 block font-body text-xs font-medium text-text-muted">Collection Name</label>
                <input type="text" className="w-full rounded-lg border border-night/10 px-4 py-2.5 font-body text-sm text-night focus:border-primary/30 focus:outline-none focus:ring-1 focus:ring-primary/20" />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block font-body text-xs font-medium text-text-muted">Type</label>
                  <select className="w-full rounded-lg border border-night/10 px-4 py-2.5 font-body text-sm text-night focus:border-primary/30 focus:outline-none focus:ring-1 focus:ring-primary/20">
                    <option>Sarees</option><option>Lehengas</option><option>Seasonal</option><option>Featured</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1 block font-body text-xs font-medium text-text-muted">Brand</label>
                  <select className="w-full rounded-lg border border-night/10 px-4 py-2.5 font-body text-sm text-night focus:border-primary/30 focus:outline-none focus:ring-1 focus:ring-primary/20">
                    <option value="girilal">Giri Lal Prem Chand Sarees</option>
                    <option value="arunima">Arunima Fashions</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="mb-1 block font-body text-xs font-medium text-text-muted">Description</label>
                <textarea rows={4} className="w-full rounded-lg border border-night/10 px-4 py-2.5 font-body text-sm text-night focus:border-primary/30 focus:outline-none focus:ring-1 focus:ring-primary/20" />
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-night/10 bg-white p-6">
            <h2 className="mb-4 font-heading text-lg text-night">Banner Image</h2>
            <div className="flex aspect-[3/1] items-center justify-center rounded-lg border border-dashed border-night/20 bg-night/[0.02]">
              <div className="text-center">
                <Eye className="mx-auto h-8 w-8 text-night/20" />
                <p className="mt-2 font-body text-sm text-text-muted/50">Click to upload banner image</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-xl border border-night/10 bg-white p-6">
            <h2 className="mb-4 font-heading text-lg text-night">Settings</h2>
            <div className="space-y-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded border-night/30 text-primary focus:ring-primary" />
                <span className="font-body text-sm text-night">Visible on site</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded border-night/30 text-primary focus:ring-primary" />
                <span className="font-body text-sm text-night">Featured collection</span>
              </label>
              <div>
                <label className="mb-1 block font-body text-xs font-medium text-text-muted">Display Order</label>
                <input type="number" defaultValue={1} className="w-full rounded-lg border border-night/10 px-4 py-2.5 font-body text-sm text-night focus:border-primary/30 focus:outline-none focus:ring-1 focus:ring-primary/20" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
