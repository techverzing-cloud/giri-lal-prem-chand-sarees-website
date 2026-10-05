import { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react'
import { GalleryLightbox } from './GalleryLightbox'
import { cn } from '@/utils/cn'
import { useProductGallery } from '@/hooks/useProductGallery'

interface ProductGalleryProps {
  images: string[]
  productName: string
  /**
   * Shows only the product's primary image: no thumbnails, no prev/next arrows
   * and no dots. Used by the homepage Featured Products rail, which links here
   * with `?from=home-featured`. The extra images stay on the product object for
   * every other entry point.
   */
  singleImage?: boolean
}

/**
 * Main product image with a thumbnail strip and a fullscreen lightbox.
 *
 * `useProductGallery` is instantiated once here and the lightbox is rendered
 * from that same instance, so opening the lightbox always resumes on the image
 * currently on screen. The thumbnail strip is omitted entirely when a product
 * has a single image, which is also what `singleImage` reduces the gallery to.
 */
export function ProductGallery({ images, productName, singleImage = false }: ProductGalleryProps) {
  // Memoised so the identity is stable: the effect below resets the failed-image
  // map whenever this array changes.
  const galleryImages = useMemo(
    () => (singleImage ? images.slice(0, 1) : images),
    [images, singleImage]
  )

  const {
    currentIndex,
    direction,
    isLightboxOpen,
    goTo,
    goNext,
    goPrev,
    openLightbox,
    closeLightbox,
  } = useProductGallery(galleryImages.length)

  const [failed, setFailed] = useState<Record<number, boolean>>({})

  useEffect(() => {
    setFailed({})
  }, [galleryImages])

  // A product whose data changes length can leave the index pointing past the end.
  useEffect(() => {
    if (currentIndex > galleryImages.length - 1) goTo(0)
  }, [galleryImages.length, currentIndex, goTo])

  const hasMultiple = galleryImages.length > 1
  const activeImage = galleryImages[currentIndex]

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
            {failed[currentIndex] ? (
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/5 to-accent/5">
                <p className="p-8 text-center font-heading text-xl text-white/40">{productName}</p>
              </div>
            ) : (
              <img
                src={activeImage}
                alt={
                  hasMultiple
                    ? `${productName} — image ${currentIndex + 1} of ${galleryImages.length}`
                    : productName
                }
                onError={() => setFailed((prev) => ({ ...prev, [currentIndex]: true }))}
                className="h-full w-full object-cover"
              />
            )}
          </motion.div>
        </AnimatePresence>

        <button
          type="button"
          onClick={openLightbox}
          className="absolute right-3 top-3 z-10 flex size-10 items-center justify-center rounded-full bg-white/10 text-white/70 backdrop-blur-sm transition-all duration-300 hover:bg-white/20 hover:text-white"
          aria-label={`View ${productName} fullscreen`}
        >
          <Maximize2 className="size-4" />
        </button>

        {hasMultiple && (
          <>
            <button
              type="button"
              onClick={goPrev}
              className="absolute left-3 top-1/2 z-10 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white/70 backdrop-blur-sm transition-all duration-300 hover:bg-white/20 hover:text-white"
              aria-label="Previous image"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              onClick={goNext}
              className="absolute right-3 top-1/2 z-10 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white/70 backdrop-blur-sm transition-all duration-300 hover:bg-white/20 hover:text-white"
              aria-label="Next image"
            >
              <ChevronRight className="size-5" />
            </button>
          </>
        )}

        {hasMultiple && (
          <div className="absolute bottom-3 left-1/2 z-10 -translate-x-1/2">
            <div className="flex items-center gap-1.5 rounded-full bg-night/60 px-3 py-1.5 backdrop-blur-sm">
              {images.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => goTo(i)}
                  className={cn(
                    'h-1.5 rounded-full transition-all duration-300',
                    i === currentIndex
                      ? 'w-6 bg-white'
                      : 'w-1.5 bg-white/40 hover:bg-white/60'
                  )}
                  aria-label={`Go to image ${i + 1} of ${galleryImages.length}`}
                  aria-current={i === currentIndex}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {hasMultiple && (
        <div className="-mx-6 flex gap-3 overflow-x-auto px-6 pb-2 scrollbar-none md:mx-0 md:px-0">
          {galleryImages.map((image, i) => (
            <button
              key={`${image}-${i}`}
              type="button"
              onClick={() => goTo(i)}
              className={cn(
                'relative aspect-[3/4] w-20 flex-shrink-0 overflow-hidden rounded-md bg-night transition-all duration-300',
                i === currentIndex
                  ? 'ring-2 ring-primary ring-offset-2'
                  : 'opacity-60 hover:opacity-100'
              )}
              aria-label={`Select image ${i + 1} of ${galleryImages.length}`}
              aria-current={i === currentIndex}
            >
              {failed[i] ? (
                <span className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/5 to-accent/5" />
              ) : (
                <img
                  src={image}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  onError={() => setFailed((prev) => ({ ...prev, [i]: true }))}
                  className="h-full w-full object-cover"
                />
              )}
            </button>
          ))}
        </div>
      )}

      <GalleryLightbox
        isOpen={isLightboxOpen}
        images={galleryImages}
        currentIndex={currentIndex}
        productName={productName}
        onClose={closeLightbox}
        onGoTo={goTo}
        onGoNext={goNext}
        onGoPrev={goPrev}
      />
    </div>
  )
}
