import { useEffect, useState } from 'react'
import { motion, useSpring } from 'framer-motion'

export function Cursor() {
  const [isVisible, setIsVisible] = useState(false)
  const [isHovering, setIsHovering] = useState(false)

  const cursorX = useSpring(0, { stiffness: 500, damping: 28, mass: 0.5 })
  const cursorY = useSpring(0, { stiffness: 500, damping: 28, mass: 0.5 })

  useEffect(() => {
    function handleMouseMove(e: MouseEvent) {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }

    function handleMouseEnter() {
      setIsVisible(true)
    }

    function handleMouseLeave() {
      setIsVisible(false)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseenter', handleMouseEnter)
    document.addEventListener('mouseleave', handleMouseLeave)

    const hoverElements = document.querySelectorAll('a, button, [role="button"]')
    hoverElements.forEach((el) => {
      el.addEventListener('mouseenter', () => setIsHovering(true))
      el.addEventListener('mouseleave', () => setIsHovering(false))
    })

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseenter', handleMouseEnter)
      document.removeEventListener('mouseleave', handleMouseLeave)
      hoverElements.forEach((el) => {
        el.removeEventListener('mouseenter', () => setIsHovering(true))
        el.removeEventListener('mouseleave', () => setIsHovering(false))
      })
    }
  }, [])

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null
  }

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[99999] hidden md:block"
      style={{ x: cursorX, y: cursorY }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="-translate-x-1/2 -translate-y-1/2"
        animate={{
          width: isHovering ? 48 : 24,
          height: isHovering ? 48 : 24,
          backgroundColor: isHovering ? 'rgba(142, 45, 41, 0.1)' : 'transparent',
          borderColor: isHovering ? '#8E2D29' : '#111717',
        }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        style={{
          border: '1.5px solid #111717',
          borderRadius: '50%',
          position: 'relative',
        }}
      />
    </motion.div>
  )
}
