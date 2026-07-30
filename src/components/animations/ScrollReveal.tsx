import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { cn } from '@/utils/cn'

interface ScrollRevealProps {
  children: ReactNode
  className?: string
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  duration?: number
  delay?: number
  distance?: number
  once?: boolean
  as?: 'div' | 'section' | 'article' | 'span'
  ariaHidden?: boolean
}

export function ScrollReveal({
  children,
  className,
  direction = 'up',
  duration = 0.8,
  delay = 0,
  distance = 50,
  once = true,
  as: Tag = 'div',
  ariaHidden,
}: ScrollRevealProps) {
  const prefersReducedMotion = useReducedMotion()

  const directionMap = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
    none: {},
  }

  if (prefersReducedMotion) {
    return <Tag className={cn(className)} aria-hidden={ariaHidden}>{children}</Tag>
  }

  return (
    <motion.div
      initial={{ opacity: 0, ...directionMap[direction] }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        transition: {
          duration,
          delay,
          ease: [0.25, 0.1, 0.25, 1],
        },
      }}
      viewport={{ once, margin: '-50px' }}
      className={cn(className)}
      aria-hidden={ariaHidden}
    >
      {children}
    </motion.div>
  )
}
