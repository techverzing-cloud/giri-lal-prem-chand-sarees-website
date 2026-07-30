import { motion } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'
import { Inbox } from 'lucide-react'

interface EmptyStateProps {
  icon?: LucideIcon
  title: string
  description?: string
  action?: { label: string; onClick: () => void }
}

export function EmptyState({ icon: Icon = Inbox, title, description, action }: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      className="flex min-h-[400px] flex-col items-center justify-center rounded-xl border border-dashed border-night/20 bg-night/[0.02] p-12 text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.1, duration: 0.3, ease: 'easeOut' }}
        className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary/10 to-primary/5 shadow-inner"
      >
        <Icon className="h-9 w-9 text-primary/40" />
      </motion.div>
      <h3 className="font-heading text-2xl font-semibold tracking-tight text-night">{title}</h3>
      {description && (
        <p className="mt-3 max-w-md font-body text-sm leading-relaxed text-text-muted">{description}</p>
      )}
      {action && (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={action.onClick}
          className="mt-8 rounded-lg bg-primary px-8 py-2.5 font-body text-sm font-medium text-white shadow-sm transition-colors hover:bg-primary/90"
        >
          {action.label}
        </motion.button>
      )}
    </motion.div>
  )
}
