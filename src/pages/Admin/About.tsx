import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { ContentSectionCard } from '@/components/admin/ContentSectionCard'
import { getAdminAboutSections } from '@/data/admin/about'
import { Save } from 'lucide-react'

export default function AdminAboutPage() {
  const [sections, setSections] = useState(getAdminAboutSections())

  return (
    <div>
      <Helmet><title>About — Admin</title></Helmet>

      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl text-night">About Page CMS</h1>
          <p className="font-body text-sm text-text-muted">Manage about page sections</p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 font-body text-sm font-medium text-white transition-colors hover:bg-primary-light">
          <Save className="h-4 w-4" /> Save Changes
        </button>
      </div>

      <div className="space-y-3">
        {sections.map((section) => (
          <ContentSectionCard
            key={section.id}
            title={section.name}
            subtitle={`Type: ${section.type}`}
            visible={section.visible}
            displayOrder={section.displayOrder}
          />
        ))}
      </div>
    </div>
  )
}
