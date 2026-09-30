// 

'use client'

import { useEffect, useState } from 'react'

export function ScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let ticking = false

    const updateProgress = () => {
      const scrollTop = window.scrollY
      const documentHeight =
        document.documentElement.scrollHeight - window.innerHeight

      if (documentHeight <= 0) {
        setProgress(0)
        return
      }

      const nextProgress = Math.min(
        1,
        Math.max(0, scrollTop / documentHeight)
      )

      setProgress(nextProgress)
    }

    const handleScroll = () => {
      if (ticking) return

      ticking = true

      window.requestAnimationFrame(() => {
        updateProgress()
        ticking = false
      })
    }

    updateProgress()

    window.addEventListener('scroll', handleScroll, {
      passive: true,
    })

    window.addEventListener('resize', updateProgress)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', updateProgress)
    }
  }, [])

  return (
    <div
      className="pointer-events-none fixed left-0 top-0 z-[9998] h-[3px] w-full"
      role="progressbar"
      aria-valuenow={Math.round(progress * 100)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Page scroll progress"
    >
      <div
        className="h-full origin-left bg-primary transition-transform duration-150 ease-out"
        style={{
          transform: `scaleX(${progress})`,
        }}
      />
    </div>
  )
}