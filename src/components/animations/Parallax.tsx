import type { ReactNode } from 'react'
import { useRef } from 'react'
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion'

interface ParallaxProps {
  children: ReactNode
  speed?: number
  className?: string
  as?: 'div' | 'section' | 'figure'
}

export function Parallax({
  children,
  speed = 0.5,
  className,
  as: Tag = 'div',
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null)

  const { scrollYProgress }: { scrollYProgress: MotionValue<number> } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], [speed * 100, speed * -100])

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }}>
        {children}
      </motion.div>
    </div>
  )
}
