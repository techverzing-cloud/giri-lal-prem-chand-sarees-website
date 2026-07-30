import { useState, useCallback, useEffect } from 'react'

interface GalleryState {
  currentIndex: number
  isLightboxOpen: boolean
  direction: number
}

export function useProductGallery(imageCount: number) {
  const [state, setState] = useState<GalleryState>({
    currentIndex: 0,
    isLightboxOpen: false,
    direction: 0,
  })

  const goTo = useCallback((index: number) => {
    setState((prev) => ({
      ...prev,
      direction: index > prev.currentIndex ? 1 : -1,
      currentIndex: index,
    }))
  }, [])

  const goNext = useCallback(() => {
    setState((prev) => ({
      ...prev,
      direction: 1,
      currentIndex: (prev.currentIndex + 1) % imageCount,
    }))
  }, [imageCount])

  const goPrev = useCallback(() => {
    setState((prev) => ({
      ...prev,
      direction: -1,
      currentIndex: (prev.currentIndex - 1 + imageCount) % imageCount,
    }))
  }, [imageCount])

  const openLightbox = useCallback(() => {
    setState((prev) => ({ ...prev, isLightboxOpen: true }))
  }, [])

  const closeLightbox = useCallback(() => {
    setState((prev) => ({ ...prev, isLightboxOpen: false }))
  }, [])

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (!state.isLightboxOpen) return
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowRight') goNext()
      if (e.key === 'ArrowLeft') goPrev()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [state.isLightboxOpen, closeLightbox, goNext, goPrev])

  return {
    currentIndex: state.currentIndex,
    isLightboxOpen: state.isLightboxOpen,
    direction: state.direction,
    goTo,
    goNext,
    goPrev,
    openLightbox,
    closeLightbox,
  }
}
