import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { ContentSectionCard } from '@/components/admin/ContentSectionCard'
import { getAdminHomepageSections } from '@/data/admin/homepage'
import { Save, GripVertical } from 'lucide-react'

export default function AdminHomepagePage() {
  const [sections, setSections] = useState(getAdminHomepageSections())

  const toggleSection = (id: string) => {
    setSections((prev) => prev.map((s) => s.id === id ? { ...s, visible: !s.visible } : s))
  }

  return (
    <div>
      <Helmet><title>Homepage — Admin</title></Helmet>

      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl text-night">Homepage CMS</h1>
          <p className="font-body text-sm text-text-muted">Manage homepage sections and content</p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 font-body text-sm font-medium text-white transition-colors hover:bg-primary-light">
          <Save className="h-4 w-4" /> Save Changes
        </button>
      </div>

      <div className="mb-6 rounded-xl border border-night/10 bg-white p-4">
        <div className="flex items-center gap-2 text-sm text-text-muted">
          <GripVertical className="h-4 w-4" />
          <span>Drag sections to reorder (mock)</span>
        </div>
      </div>

      <div className="space-y-3">
        {sections.map((section) => (
          <ContentSectionCard
            key={section.id}
            title={section.name}
            subtitle={`Type: ${section.type}`}
            visible={section.visible}
            displayOrder={section.displayOrder}
            onToggle={() => toggleSection(section.id)}
          />
        ))}
      </div>
    </div>
  )
}
