import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react'
import { cn } from '@/utils/cn'
import { useProductGallery } from '@/hooks/useProductGallery'

interface ProductGalleryProps {
  images: string[]
  productName: string
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const {
    currentIndex,
    direction,
    goTo,
    goNext,
    goPrev,
    openLightbox,
  } = useProductGallery(images.length)

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -300 : 300, opacity: 0 }),
  }

  return (
    <div className="space-y-4">
      <div className="group relative aspect-[3/4] overflow-hidden rounded-lg bg-night">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="absolute inset-0"
          >
            <div className="flex h-full items-center justify-center bg-gradient-to-br from-primary/5 to-accent/5">
              <div className="text-center p-8">
                <p className="font-heading text-xl text-white/40">{productName}</p>
                <p className="mt-2 font-body text-sm text-white/30">
                  Image {currentIndex + 1} of {images.length}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <button
          onClick={openLightbox}
          className="absolute right-3 top-3 z-10 flex size-10 items-center justify-center rounded-full bg-white/10 text-white/70 backdrop-blur-sm opacity-0 transition-all duration-300 hover:bg-white/20 hover:text-white group-hover:opacity-100"
          aria-label="View fullscreen"
        >
          <Maximize2 className="size-4" />
        </button>

        {images.length > 1 && (
          <>
            <button
              onClick={goPrev}
              className="absolute left-3 top-1/2 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white/70 backdrop-blur-sm opacity-0 transition-all duration-300 hover:bg-white/20 hover:text-white group-hover:opacity-100"
              aria-label="Previous image"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              onClick={goNext}
              className="absolute right-3 top-1/2 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white/70 backdrop-blur-sm opacity-0 transition-all duration-300 hover:bg-white/20 hover:text-white group-hover:opacity-100"
              aria-label="Next image"
            >
              <ChevronRight className="size-5" />
            </button>
          </>
        )}

        <div className="absolute bottom-3 left-1/2 z-10 -translate-x-1/2">
          <div className="flex items-center gap-1.5 rounded-full bg-night/60 px-3 py-1.5 backdrop-blur-sm">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={cn(
                  'h-1.5 rounded-full transition-all duration-300',
                  i === currentIndex
                    ? 'w-6 bg-white'
                    : 'w-1.5 bg-white/40 hover:bg-white/60'
                )}
                aria-label={`Go to image ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={cn(
              'relative aspect-[3/4] w-20 flex-shrink-0 overflow-hidden rounded-md transition-all duration-300',
              i === currentIndex
                ? 'ring-2 ring-primary ring-offset-2'
                : 'opacity-60 hover:opacity-100'
            )}
            aria-label={`Select image ${i + 1}`}
          >
            <div className="h-full w-full bg-gradient-to-br from-primary/5 to-accent/5" />
          </button>
        ))}
      </div>
    </div>
  )
}
