import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/utils/cn'

interface ImageZoomProps {
  children: ReactNode
  className?: string
  duration?: number
  scale?: number
  loading?: boolean
  priority?: boolean
}

export function ImageZoom({ children, className, duration = 1.2, scale = 1.15, loading, priority }: ImageZoomProps) {
  return (
    <motion.div
      initial={{ scale, opacity: 0 }}
      whileInView={{
        scale: 1,
        opacity: 1,
        transition: { duration, ease: [0.25, 0.1, 0.25, 1] },
      }}
      viewport={{ once: true, margin: '-50px' }}
      className={cn('overflow-hidden relative', className)}
      data-priority={priority ? 'true' : undefined}
    >
      {loading && (
        <div className="absolute inset-0 z-10 animate-pulse bg-gradient-to-br from-primary/5 to-accent/5 backdrop-blur-sm" />
      )}
      {children}
    </motion.div>
  )
}
