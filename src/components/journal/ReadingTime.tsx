import { Clock } from 'lucide-react'

export function ReadingTime({ minutes }: { minutes: number }) {
  return (
    <span className="inline-flex items-center gap-1.5 font-body text-xs text-text-muted">
      <Clock className="size-3" />
      {minutes} min read
    </span>
  )
}
