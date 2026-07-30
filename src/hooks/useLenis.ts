import { useEffect, useRef } from 'react'
import Lenis from 'lenis'

interface UseLenisOptions {
  duration?: number
  easing?: (t: number) => number
  orientation?: 'vertical' | 'horizontal'
  gestureOrientation?: 'vertical' | 'horizontal' | 'both'
  smoothWheel?: boolean
  syncTouch?: boolean
  touchMultiplier?: number
  wheelMultiplier?: number
}

export function useLenis(options: UseLenisOptions = {}) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const lenis = new Lenis({
      duration: options.duration ?? 1.2,
      easing: options.easing ?? ((t) => Math.min(1, 1 - Math.pow(1 - t, 3))),
      orientation: options.orientation ?? 'vertical',
      gestureOrientation: options.gestureOrientation ?? 'vertical',
      smoothWheel: options.smoothWheel ?? true,
      syncTouch: options.syncTouch ?? false,
      touchMultiplier: options.touchMultiplier ?? 2,
      wheelMultiplier: options.wheelMultiplier ?? 1,
    })

    lenisRef.current = lenis

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  return lenisRef
}
