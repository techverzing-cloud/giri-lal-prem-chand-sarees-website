import type { SiteSettings } from '@/types/cms'
import { cn } from '@/utils/cn'
import { Building2, Globe, Mail, Phone, MapPin, Clock, Copyright, Palette } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface SiteSettingsCardProps {
  settings: SiteSettings
  compact?: boolean
}

interface SettingRowProps {
  icon: LucideIcon
  label: string
  value: string
}

function SettingRow({ icon: Icon, label, value }: SettingRowProps) {
  return (
    <div className="flex items-start gap-3 rounded-md p-2 transition-colors hover:bg-night/5">
      <Icon className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary/60" />
      <div className="min-w-0 flex-1">
        <p className="font-body text-xs font-medium uppercase tracking-wider text-text-muted">{label}</p>
        <p className="mt-0.5 font-body text-sm text-night">{value}</p>
      </div>
    </div>
  )
}

export function SiteSettingsCard({ settings, compact = false }: SiteSettingsCardProps) {
  return (
    <div className={cn('rounded-lg border border-night/10 bg-white', compact ? 'p-4' : 'p-6')}>
      {!compact && (
        <div className="mb-6 flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-lg border border-night/10 bg-night/5">
            <Building2 className="h-6 w-6 text-primary/60" />
          </div>
          <div>
            <h2 className="font-heading text-2xl text-night">{settings.companyName}</h2>
            <p className="font-body text-sm text-text-muted">{settings.tagline}</p>
          </div>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <SettingRow icon={Globe} label="Website" value={settings.meta.siteUrl} />
        <SettingRow icon={Mail} label="Email" value={settings.email} />
        <SettingRow icon={Phone} label="Phone" value={settings.phone} />
        <SettingRow icon={MapPin} label="Address" value={settings.address} />
        <SettingRow icon={Clock} label="Hours" value={settings.businessHours} />
        <SettingRow icon={Copyright} label="Copyright" value={settings.copyright} />
      </div>

      <div className="mt-4 rounded-lg border border-night/10 bg-night/[0.02] p-4">
        <div className="mb-3 flex items-center gap-2">
          <Palette className="h-4 w-4 text-primary/60" />
          <span className="font-body text-xs font-medium uppercase tracking-wider text-text-muted">Theme Colors</span>
        </div>
        <div className="flex flex-wrap gap-3">
          {Object.entries(settings.theme).filter(([k]) => k.includes('Color')).map(([key, color]) => (
            <div key={key} className="flex items-center gap-2">
              <div
                className="h-5 w-5 rounded-full border border-night/10"
                style={{ backgroundColor: color }}
              />
              <span className="font-body text-xs text-text-muted">
                {key.replace('Color', '').replace(/([A-Z])/g, ' $1').trim()}
              </span>
              <span className="font-body text-[10px] text-text-muted/50">{color}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
