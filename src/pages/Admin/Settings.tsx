import { Helmet } from 'react-helmet-async'
import { SiteSettingsCard } from '@/components/admin/SiteSettingsCard'
import { FeatureFlagCard } from '@/components/admin/FeatureFlagCard'
import { ThemePreview } from '@/components/admin/ThemePreview'
import { AnalyticsCard } from '@/components/admin/AnalyticsCard'
import { getAdminSettings } from '@/data/admin/settings'
import { themeConfig } from '@/data/theme'
import { featureFlags } from '@/data/featureFlags'
import { siteSettings } from '@/data/siteSettings'
import { Save, Building2, ToggleLeft, Palette, BarChart3 } from 'lucide-react'

export default function AdminSettingsPage() {
  const settings = getAdminSettings()

  return (
    <div>
      <Helmet><title>Settings — Admin</title></Helmet>

      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl text-night">Settings</h1>
          <p className="font-body text-sm text-text-muted">Global site configuration</p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 font-body text-sm font-medium text-white transition-colors hover:bg-primary-light">
          <Save className="h-4 w-4" /> Save All
        </button>
      </div>

      <div className="space-y-8">
        <section>
          <div className="mb-4 flex items-center gap-2">
            <Building2 className="h-5 w-5 text-primary/60" />
            <h2 className="font-heading text-xl text-night">Company Information</h2>
          </div>
          <SiteSettingsCard settings={siteSettings as unknown as import('@/types/cms').SiteSettings} />
        </section>

        <section>
          <div className="mb-4 flex items-center gap-2">
            <ToggleLeft className="h-5 w-5 text-primary/60" />
            <h2 className="font-heading text-xl text-night">Feature Flags</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featureFlags.map((flag) => (
              <FeatureFlagCard key={flag.id} flag={flag as unknown as import('@/types/cms').FeatureFlag} />
            ))}
          </div>
        </section>

        <section>
          <div className="mb-4 flex items-center gap-2">
            <Palette className="h-5 w-5 text-primary/60" />
            <h2 className="font-heading text-xl text-night">Theme</h2>
          </div>
          <ThemePreview theme={themeConfig as unknown as import('@/types/cms').ThemeConfig} />
        </section>

        <section>
          <div className="mb-4 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary/60" />
            <h2 className="font-heading text-xl text-night">Analytics</h2>
          </div>
          <AnalyticsCard analytics={siteSettings.analytics as unknown as import('@/types/cms').SiteSettings['analytics']} />
        </section>
      </div>
    </div>
  )
}
