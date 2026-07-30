import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import { cn } from '@/utils/cn'

interface BackToTopProps {
  threshold?: number
  className?: string
}

export function BackToTop({ threshold = 400, className }: BackToTopProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    function handleScroll() {
      setVisible(window.scrollY > threshold)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [threshold])

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          onClick={scrollToTop}
          className={cn(
            'fixed bottom-6 left-6 z-50 flex size-12 items-center justify-center rounded-full border border-night/10 bg-white/80 text-night backdrop-blur-md transition-colors hover:bg-night hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
            className
          )}
          aria-label="Scroll to top"
        >
          <ArrowUp className="size-5" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
