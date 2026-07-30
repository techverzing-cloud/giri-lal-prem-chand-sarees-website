import { Info, Lightbulb, AlertTriangle } from 'lucide-react'

const styles = {
  info: { bg: 'bg-blue-50 border-blue-200', icon: Info, color: 'text-blue-600' },
  tip: { bg: 'bg-green-50 border-green-200', icon: Lightbulb, color: 'text-green-600' },
  warning: { bg: 'bg-amber-50 border-amber-200', icon: AlertTriangle, color: 'text-amber-600' },
}

export function CalloutBlock({ variant, text }: { variant: 'info' | 'tip' | 'warning'; text: string }) {
  const style = styles[variant]
  const Icon = style.icon

  return (
    <div className={`flex gap-4 rounded-lg border p-5 ${style.bg}`}>
      <Icon className={`mt-0.5 size-5 flex-shrink-0 ${style.color}`} />
      <p className="font-body text-sm leading-relaxed text-night/80">{text}</p>
    </div>
  )
}
