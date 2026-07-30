import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/utils/cn'

interface LuxuryHoverProps {
  children: ReactNode
  className?: string
  scale?: number
  y?: number
}

export function LuxuryHover({ children, className, scale = 1.02, y = -4 }: LuxuryHoverProps) {
  return (
    <motion.div
      whileHover={{ scale, y, transition: { duration: 0.4, ease: 'easeOut' } }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}
