import type { SiteSettings } from '@/types/cms'
import { cn } from '@/utils/cn'
import { BarChart3, Code, Target, Eye, MousePointerClick } from 'lucide-react'

interface AnalyticsCardProps {
  analytics: SiteSettings['analytics']
}

interface AnalyticsProviderRowProps {
  name: string
  id: string | undefined
  icon: typeof BarChart3
  configured: boolean
}

function AnalyticsProviderRow({ name, id, icon: Icon, configured }: AnalyticsProviderRowProps) {
  return (
    <div className="flex items-center justify-between rounded-md border border-night/5 p-3 transition-colors hover:bg-night/[0.02]">
      <div className="flex items-center gap-3">
        <div className={cn('rounded-lg p-2', configured ? 'bg-primary/10' : 'bg-night/5')}>
          <Icon className={cn('h-4 w-4', configured ? 'text-primary' : 'text-text-muted/50')} />
        </div>
        <div>
          <p className="font-body text-sm font-medium text-night">{name}</p>
          {id ? (
            <p className="font-body text-xs text-text-muted">ID: {id}</p>
          ) : (
            <p className="font-body text-xs italic text-text-muted/50">Not configured</p>
          )}
        </div>
      </div>
      <span className={cn('rounded-full px-2.5 py-1 font-body text-[10px] font-medium', configured ? 'bg-success/10 text-success' : 'bg-night/10 text-text-muted')}>
        {configured ? 'Active' : 'Inactive'}
      </span>
    </div>
  )
}

export function AnalyticsCard({ analytics }: AnalyticsCardProps) {
  const providers = [
    { name: 'Google Analytics 4', id: analytics.googleAnalyticsId, icon: BarChart3 },
    { name: 'Google Tag Manager', id: analytics.googleTagManagerId, icon: Code },
    { name: 'Meta Pixel', id: analytics.metaPixelId, icon: Target },
    { name: 'Microsoft Clarity', id: analytics.clarityId, icon: Eye },
    { name: 'Pinterest Pixel', id: analytics.pinterestPixelId, icon: MousePointerClick },
  ]

  return (
    <div className="rounded-lg border border-night/10 bg-white p-6">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
          <BarChart3 className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h3 className="font-heading text-lg text-night">Analytics Configuration</h3>
          <p className="font-body text-xs text-text-muted">
            {providers.filter((p) => p.id).length} of {providers.length} providers configured
          </p>
        </div>
      </div>

      <div className="space-y-2">
        {providers.map((provider) => (
          <AnalyticsProviderRow key={provider.name} {...provider} configured={!!provider.id} />
        ))}
      </div>
    </div>
  )
}
