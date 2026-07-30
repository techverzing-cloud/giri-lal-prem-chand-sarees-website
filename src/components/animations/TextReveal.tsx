import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { cn } from '@/utils/cn'

interface TextRevealProps {
  children: ReactNode
  className?: string
  delay?: number
  duration?: number
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div'
  ariaHidden?: boolean
}

export function TextReveal({
  children,
  className,
  delay = 0,
  duration = 0.6,
  as: Tag = 'div',
  ariaHidden,
}: TextRevealProps) {
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return (
      <div className={cn('overflow-hidden', className)} aria-hidden={ariaHidden}>
        {children}
      </div>
    )
  }

  return (
    <div className={cn('overflow-hidden', className)} aria-hidden={ariaHidden}>
      <motion.div
        initial={{ y: '100%' }}
        whileInView={{
          y: 0,
          transition: {
            duration,
            delay,
            ease: [0.25, 0.1, 0.25, 1],
          },
        }}
        viewport={{ once: true, margin: '-50px' }}
      >
        {children}
      </motion.div>
    </div>
  )
}
