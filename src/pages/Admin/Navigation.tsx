import { Helmet } from 'react-helmet-async'
import { NavigationEditor } from '@/components/admin/NavigationEditor'
import { getAdminNavMenus } from '@/data/admin/navigation'
import { Save } from 'lucide-react'

export default function AdminNavigationPage() {
  const menus = getAdminNavMenus()

  return (
    <div>
      <Helmet><title>Navigation — Admin</title></Helmet>

      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl text-night">Navigation Manager</h1>
          <p className="font-body text-sm text-text-muted">Manage all site navigation menus</p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 font-body text-sm font-medium text-white transition-colors hover:bg-primary-light">
          <Save className="h-4 w-4" /> Save Changes
        </button>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {menus.map((menu) => (
          <NavigationEditor key={menu.id} items={menu.items as unknown as import('@/types/cms').CMSLink[]} label={menu.name} />
        ))}
      </div>
    </div>
  )
}
