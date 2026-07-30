import type { Redirect } from '@/types/cms'
import { cn } from '@/utils/cn'
import { ArrowRight, Eye, EyeOff } from 'lucide-react'

interface RedirectTableProps {
  redirects: Redirect[]
}

const statusBadge: Record<number, { label: string; className: string }> = {
  301: { label: '301 Permanent', className: 'bg-blue-100 text-blue-600' },
  302: { label: '302 Temporary', className: 'bg-amber-100 text-amber-600' },
  410: { label: '410 Gone', className: 'bg-error/20 text-error' },
}

export function RedirectTable({ redirects }: RedirectTableProps) {
  if (redirects.length === 0) {
    return (
      <div className="flex min-h-[200px] flex-col items-center justify-center rounded-lg border border-dashed border-night/20 bg-night/5">
        <p className="font-body text-sm text-text-muted">No redirect rules configured</p>
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-lg border border-night/10">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-night/10 bg-night/[0.02]">
              <th className="px-4 py-3 text-left font-body text-xs font-medium uppercase tracking-wider text-text-muted">From</th>
              <th className="px-4 py-3 text-left font-body text-xs font-medium uppercase tracking-wider text-text-muted">To</th>
              <th className="px-4 py-3 text-left font-body text-xs font-medium uppercase tracking-wider text-text-muted">Type</th>
              <th className="hidden px-4 py-3 text-left font-body text-xs font-medium uppercase tracking-wider text-text-muted md:table-cell">Status</th>
              <th className="px-4 py-3 text-right font-body text-xs font-medium uppercase tracking-wider text-text-muted">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-night/5">
            {redirects.map((redirect) => {
              const badge = statusBadge[redirect.statusCode]
              return (
                <tr key={redirect.id} className={cn('transition-colors hover:bg-night/[0.02]', !redirect.visible && 'opacity-50')}>
                  <td className="px-4 py-3">
                    <code className="rounded bg-night/5 px-2 py-0.5 font-body text-xs text-night">{redirect.from}</code>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <ArrowRight className="h-3 w-3 text-text-muted/40" />
                      <code className="rounded bg-night/5 px-2 py-0.5 font-body text-xs text-night">
                        {redirect.to || <span className="italic text-text-muted/50">410 — No redirect</span>}
                      </code>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={cn('rounded-full px-2.5 py-1 font-body text-[10px] font-medium', badge.className)}>
                      {badge.label}
                    </span>
                  </td>
                  <td className="hidden px-4 py-3 md:table-cell">
                    <span className="font-body text-xs text-text-muted">{redirect.description ?? '—'}</span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      {redirect.visible ? (
                        <Eye className="h-3.5 w-3.5 text-success" />
                      ) : (
                        <EyeOff className="h-3.5 w-3.5 text-text-muted/40" />
                      )}
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
