import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/utils/cn'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface FadeInProps {
  children: ReactNode
  className?: string
  delay?: number
  duration?: number
  once?: boolean
}

export function FadeIn({ children, className, delay = 0, duration = 0.8, once = true }: FadeInProps) {
  const reduced = useReducedMotion()

  if (reduced) {
    return <div className={cn(className)}>{children}</div>
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{
        opacity: 1,
        transition: { duration, delay, ease: [0.25, 0.1, 0.25, 1] },
      }}
      viewport={{ once, margin: '-50px' }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}
