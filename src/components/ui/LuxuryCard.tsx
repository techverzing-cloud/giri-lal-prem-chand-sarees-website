import type { ReactNode, KeyboardEvent } from 'react'
import { cn } from '@/utils/cn'
import { motion } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface LuxuryCardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  as?: 'div' | 'article' | 'button'
  onClick?: () => void
}

export function LuxuryCard({
  children,
  className,
  hover = true,
  as: Tag = 'div',
  onClick,
}: LuxuryCardProps) {
  const reduced = useReducedMotion()

  const Component = hover && !reduced ? motion[Tag as 'div'] : Tag

  const motionProps = hover && !reduced
    ? {
        whileHover: { y: -4, transition: { duration: 0.3, ease: 'easeOut' } },
      }
    : {}

  const baseClasses = cn(
    'group rounded-lg bg-white transition-shadow duration-500',
    hover && 'cursor-pointer',
    className
  )

  const handleKeyDown = (e: KeyboardEvent) => {
    if (onClick && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault()
      onClick()
    }
  }

  if (hover && !reduced) {
    return (
      <motion.div
        className={baseClasses}
        {...motionProps}
        onClick={onClick}
        role={onClick ? 'button' : undefined}
        tabIndex={onClick ? 0 : undefined}
        aria-disabled={onClick ? undefined : undefined}
        onKeyDown={handleKeyDown}
      >
        {children}
      </motion.div>
    )
  }

  if (onClick) {
    return (
      <div
        className={baseClasses}
        onClick={onClick}
        role="button"
        tabIndex={0}
        onKeyDown={handleKeyDown}
      >
        {children}
      </div>
    )
  }

  return <Tag className={baseClasses}>{children}</Tag>
}
