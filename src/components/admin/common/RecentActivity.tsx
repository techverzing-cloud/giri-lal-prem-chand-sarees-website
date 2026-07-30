import type { AdminActivity } from '@/types/admin'
import { Clock } from 'lucide-react'

interface RecentActivityProps {
  activities: AdminActivity[]
}

const actionColors: Record<string, string> = {
  created: 'bg-success/10 text-success',
  published: 'bg-primary/10 text-primary',
  updated: 'bg-amber-100 text-amber-600',
  uploaded: 'bg-blue-100 text-blue-600',
  deleted: 'bg-error/10 text-error',
}

export function RecentActivity({ activities }: RecentActivityProps) {
  if (activities.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <Clock className="mb-2 h-8 w-8 text-text-muted/30" />
        <p className="font-body text-sm text-text-muted">No recent activity</p>
      </div>
    )
  }

  return (
    <div className="space-y-1">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-start gap-3 rounded-lg p-3 transition-colors hover:bg-night/[0.02]">
          <span className={['mt-0.5 rounded-full px-2 py-0.5 font-body text-[10px] font-medium capitalize', actionColors[activity.action] || 'bg-night/10 text-night/60'].join(' ')}>
            {activity.action}
          </span>
          <div className="flex-1 min-w-0">
            <p className="font-body text-sm text-night">
              <span className="font-medium">{activity.user}</span>{' '}
              {activity.action} {activity.resource}
            </p>
            <p className="font-body text-xs text-text-muted/60">
              {new Date(activity.timestamp).toLocaleString()}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
