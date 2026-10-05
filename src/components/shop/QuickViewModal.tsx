import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowRight } from 'lucide-react'
import type { Product } from '@/types'
import { LuxuryButton } from '@/components/ui/LuxuryButton'
import { EnquiryModal } from '@/components/product/EnquiryModal'
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll'

interface QuickViewModalProps {
  product: Product | null
  onClose: () => void
  /**
   * Which listing opened this modal. `home-featured` marks the detail link so
   * the product page shows the primary image alone; `collection` is the default
   * and keeps the product page's existing gallery.
   */
  source?: 'collection' | 'home-featured'
}

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

/**
 * Quick view for a product card.
 *
 * The caller owns a single `product` state, so there is exactly one instance of
 * this modal in the DOM: clicking QUICK VIEW on another card swaps the product
 * and the same dialog re-renders with the new data.
 *
 * Interaction: fades and rises in, closes on the X, on the backdrop, and on
 * Escape, and the background is scroll-locked while it is open. Focus moves
 * into the dialog on open, Tab is trapped inside it, and focus returns to the
 * card's QUICK VIEW button on close.
 *
 * ENQUIRE NOW hands the selected product to the existing `EnquiryModal`, which
 * already posts to `/api/enquiry` and offers a WhatsApp hand-off. That is the
 * site's only enquiry path, so nothing here duplicates it.
 */
export function QuickViewModal({ product, onClose, source = 'collection' }: QuickViewModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null)
  const previouslyFocused = useRef<HTMLElement | null>(null)
  const [imgError, setImgError] = useState(false)
  const [enquiryProduct, setEnquiryProduct] = useState<Product | null>(null)

  useLockBodyScroll(Boolean(product))

  useEffect(() => setImgError(false), [product?.id])

  useEffect(() => {
    if (!product) return
    previouslyFocused.current = document.activeElement as HTMLElement | null
    dialogRef.current?.focus()
    return () => {
      previouslyFocused.current?.focus?.()
    }
  }, [product])

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (!product) return

      if (e.key === 'Escape') {
        onClose()
        return
      }

      if (e.key !== 'Tab') return

      const nodes = dialogRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE)
      if (!nodes || nodes.length === 0) return

      const first = nodes[0]
      const last = nodes[nodes.length - 1]
      const active = document.activeElement

      if (e.shiftKey && (active === first || active === dialogRef.current)) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && active === last) {
        e.preventDefault()
        first.focus()
      }
    }

    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [product, onClose])

  function handleEnquire() {
    // Hold on to the product so the enquiry form keeps its identity after the
    // quick view itself is dismissed.
    setEnquiryProduct(product)
    onClose()
  }

  const brandLabel =
    product?.brand === 'girilal' ? 'Giri Lal Prem Chand Sarees' : 'Arunima Fashions'
  const headingId = product ? `quick-view-title-${product.id}` : undefined

  // Quick view already shows a single image; this only tells the product page
  // that it was reached from the homepage rail, so it does the same there.
  const detailsHref =
    product && source === 'home-featured'
      ? `/product/${product.slug}?from=home-featured`
      : product
        ? `/product/${product.slug}`
        : ''

  return (
    <>
      <AnimatePresence>
        {product && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-night/70 backdrop-blur-sm"
              onClick={onClose}
              aria-hidden="true"
            />

            <motion.div
              ref={dialogRef}
              tabIndex={-1}
              initial={{ opacity: 0, y: 15, scale: 1 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 15, scale: 1 }}
              transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
              className="relative z-10 max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-lg border border-border bg-cream shadow-2xl shadow-night/25 focus:outline-none"
              role="dialog"
              aria-modal="true"
              aria-labelledby={headingId}
            >
              <button
                type="button"
                onClick={onClose}
                className="absolute right-4 top-4 z-10 flex size-10 items-center justify-center rounded-full border border-border bg-cream/90 text-night backdrop-blur-sm transition-colors duration-300 hover:border-primary hover:bg-primary hover:text-white"
                aria-label={`Close quick view${product ? ` of ${product.name}` : ''}`}
              >
                <X className="size-5" />
              </button>

              <div className="grid md:grid-cols-2">
                <div className="group relative aspect-[4/5] overflow-hidden bg-night md:aspect-auto md:min-h-[620px]">
                  {imgError ? (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/5 to-accent/5">
                      <p className="p-8 text-center font-heading text-lg text-white/50">
                        {product.name}
                      </p>
                    </div>
                  ) : (
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      onError={() => setImgError(true)}
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  )}
                </div>

                <div className="flex flex-col justify-center p-8 md:p-12">
                  <p className="font-body text-[11px] font-semibold uppercase tracking-[0.25em] text-primary">
                    {brandLabel}
                  </p>
                  <span className="mt-3 block h-px w-14 bg-gold/60" aria-hidden="true" />

                  <div className="mt-5 flex flex-wrap items-center gap-2">
                    <span className="rounded-full border border-border px-3 py-1 font-body text-[11px] uppercase tracking-[0.15em] text-text-secondary">
                      {product.occasion}
                    </span>
                    <span className="rounded-full border border-border px-3 py-1 font-body text-[11px] uppercase tracking-[0.15em] text-text-secondary">
                      {product.subcategory}
                    </span>
                    <span className="font-body text-[11px] uppercase tracking-[0.15em] text-gold">
                      Ref. {product.sku}
                    </span>
                  </div>

                  <h2
                    id={headingId}
                    className="mt-5 font-heading text-3xl font-medium leading-tight text-balance text-night md:text-4xl"
                  >
                    {product.name}
                  </h2>

                  <p className="mt-3 font-body text-sm text-text-secondary">{product.fabric}</p>

                  <p className="mt-6 max-w-[52ch] font-body text-sm leading-relaxed text-text-secondary">
                    {product.description}
                  </p>

                  <p className="mt-3 font-body text-sm text-text-secondary">Price on Enquiry</p>

                  <div className="mt-8">
                    <LuxuryButton
                      type="button"
                      variant="primary"
                      size="lg"
                      fullWidth
                      onClick={handleEnquire}
                    >
                      ENQUIRE NOW
                    </LuxuryButton>

                    <Link
                      href={detailsHref}
                      className="mt-4 inline-flex items-center gap-1.5 font-body text-[11px] font-semibold uppercase tracking-[0.2em] text-primary transition-colors hover:text-primary/70"
                    >
                      View Full Details
                      <ArrowRight className="size-3" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {enquiryProduct && (
        <EnquiryModal
          isOpen
          onClose={() => setEnquiryProduct(null)}
          product={enquiryProduct}
        />
      )}
    </>
  )
}
