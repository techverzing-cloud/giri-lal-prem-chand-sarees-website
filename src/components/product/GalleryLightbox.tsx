import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { useProductGallery } from '@/hooks/useProductGallery'

interface GalleryLightboxProps {
  isOpen: boolean
  images: string[]
  currentIndex: number
  productName: string
  onClose: () => void
  onGoTo: (index: number) => void
  onGoNext: () => void
  onGoPrev: () => void
}

export function GalleryLightbox({
  isOpen,
  images,
  productName,
  onClose,
  onGoTo,
  onGoNext,
  onGoPrev,
}: GalleryLightboxProps) {
  if (!isOpen) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[9999] bg-night/95 backdrop-blur-xl"
          role="dialog"
          aria-modal="true"
          aria-label={`Fullscreen gallery: ${productName}`}
        >
          <div className="relative flex h-full flex-col">
            <div className="flex items-center justify-between px-6 py-4">
              <p className="font-body text-sm text-white/60">
                {currentIndex + 1} / {images.length}
              </p>
              <button
                onClick={onClose}
                className="flex size-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
                aria-label="Close lightbox"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="flex flex-1 items-center justify-center px-4">
              <button
                onClick={onGoPrev}
                className="absolute left-4 z-10 flex size-12 items-center justify-center rounded-full bg-white/10 text-white/70 transition-colors hover:bg-white/20 hover:text-white"
                aria-label="Previous image"
              >
                <ChevronLeft className="size-6" />
              </button>

              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="flex max-h-[70vh] max-w-[90vw] items-center justify-center"
              >
                <div className="aspect-[3/4] max-h-[70vh] w-full max-w-[500px] rounded-lg bg-gradient-to-br from-primary/10 to-accent/10" />
              </motion.div>

              <button
                onClick={onGoNext}
                className="absolute right-4 z-10 flex size-12 items-center justify-center rounded-full bg-white/10 text-white/70 transition-colors hover:bg-white/20 hover:text-white"
                aria-label="Next image"
              >
                <ChevronRight className="size-6" />
              </button>
            </div>

            <div className="flex items-center justify-center gap-2 px-6 py-6">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => onGoTo(i)}
                  className={`h-12 w-10 overflow-hidden rounded transition-all duration-300 ${
                    i === currentIndex
                      ? 'scale-110 ring-2 ring-white opacity-100'
                      : 'opacity-40 hover:opacity-70'
                  }`}
                >
                  <div className="h-full w-full bg-gradient-to-br from-primary/10 to-accent/10" />
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
