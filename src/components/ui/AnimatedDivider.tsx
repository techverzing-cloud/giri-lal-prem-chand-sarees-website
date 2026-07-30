import { cn } from '@/utils/cn'
import { motion } from 'framer-motion'

interface AnimatedDividerProps {
  className?: string
  variant?: 'line' | 'ornate' | 'subtle'
  light?: boolean
}

export function AnimatedDivider({ className, variant = 'subtle', light = false }: AnimatedDividerProps) {
  if (variant === 'ornate') {
    return (
      <div className={cn('flex items-center justify-center gap-4', className)}>
        <motion.span
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          className={cn('h-px w-16 origin-right', light ? 'bg-white/30' : 'bg-night/20')}
        />
        <span className={cn('text-lg', light ? 'text-white/50' : 'text-night/30')}>✦</span>
        <motion.span
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          className={cn('h-px w-16 origin-left', light ? 'bg-white/30' : 'bg-night/20')}
        />
      </div>
    )
  }

  return (
    <motion.div
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      className={cn(
        'h-px w-full max-w-[200px]',
        variant === 'line' ? 'h-0.5' : 'h-px',
        light ? 'bg-white/20' : 'bg-night/10',
        className
      )}
    />
  )
}
