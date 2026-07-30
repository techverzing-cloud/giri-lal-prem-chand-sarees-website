import { cn } from '@/utils/cn'
import { Zap, Image, Route, Box, Globe } from 'lucide-react'

interface PerformanceMetric {
  label: string
  value: string
  status: 'optimal' | 'good' | 'needs-improvement'
}

interface PerformanceCardProps {
  metrics: PerformanceMetric[]
  title?: string
}

const statusColors: Record<string, string> = {
  optimal: 'bg-success text-success',
  good: 'bg-warning/20 text-warning',
  'needs-improvement': 'bg-error/20 text-error',
}

const defaultMetrics: PerformanceMetric[] = [
  { label: 'Image Optimization', value: 'All images lazy loaded', status: 'optimal' },
  { label: 'Code Splitting', value: 'Route-based splitting active', status: 'optimal' },
  { label: 'Font Loading', value: 'System fonts with swap', status: 'good' },
  { label: 'Cache Strategy', value: 'Immutable asset caching', status: 'optimal' },
  { label: 'Bundle Size', value: 'Dynamic imports per route', status: 'optimal' },
  { label: 'DOM Size', value: 'Under 1500 nodes', status: 'good' },
]

export function PerformanceCard({ metrics = defaultMetrics, title = 'Performance Overview' }: PerformanceCardProps) {
  return (
    <div className="rounded-lg border border-night/10 bg-white p-6">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/10">
          <Zap className="h-5 w-5 text-success" />
        </div>
        <div>
          <h3 className="font-heading text-lg text-night">{title}</h3>
          <p className="font-body text-xs text-text-muted">Lighthouse target: Performance ≥ 95</p>
        </div>
      </div>

      <div className="space-y-3">
        {metrics.map((metric) => (
          <div key={metric.label} className="flex items-center justify-between rounded-md border border-night/5 p-3">
            <div className="flex items-center gap-3">
              {metric.label.includes('Image') && <Image className="h-4 w-4 text-primary/40" />}
              {metric.label.includes('Code') || metric.label.includes('Bundle') && <Box className="h-4 w-4 text-primary/40" />}
              {metric.label.includes('Font') && <Globe className="h-4 w-4 text-primary/40" />}
              {metric.label.includes('Cache') && <Route className="h-4 w-4 text-primary/40" />}
              <div>
                <p className="font-body text-sm font-medium text-night">{metric.label}</p>
                <p className="font-body text-xs text-text-muted">{metric.value}</p>
              </div>
            </div>
            <span className={cn('rounded-full px-2.5 py-1 font-body text-[10px] font-medium uppercase', statusColors[metric.status])}>
              {metric.status === 'needs-improvement' ? 'Needs Work' : metric.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
