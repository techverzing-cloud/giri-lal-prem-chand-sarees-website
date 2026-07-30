import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Heart, Check } from 'lucide-react'
import type { Product } from '@/types'
import { LuxuryButton } from '@/components/ui/LuxuryButton'
import { LuxuryBadge } from '@/components/ui/LuxuryBadge'
import { cn } from '@/utils/cn'

interface QuickViewModalProps {
  product: Product | null
  onClose: () => void
}

export function QuickViewModal({ product, onClose }: QuickViewModalProps) {
  useEffect(() => {
    if (!product) return
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [product])

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])

  return (
    <AnimatePresence>
      {product && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-night/80 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative z-10 max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-lg bg-white shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-label={`Quick view: ${product.name}`}
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 z-10 flex size-10 items-center justify-center rounded-full bg-white/80 text-night backdrop-blur-sm transition-colors hover:bg-night hover:text-white"
              aria-label="Close quick view"
            >
              <X className="size-5" />
            </button>

            <div className="grid md:grid-cols-2">
              <div className="relative aspect-[3/4] overflow-hidden bg-night md:aspect-auto">
                <div className="flex h-full items-center justify-center bg-gradient-to-br from-primary/5 to-accent/5">
                  <div className="text-center p-8">
                    <p className="font-heading text-lg text-white/60">{product.name}</p>
                    <p className="mt-2 font-body text-sm text-white/40">{product.fabric}</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-center p-8 md:p-10">
                <div className="flex items-center gap-3">
                  <span className="font-body text-[11px] uppercase tracking-[0.15em] text-text-muted">
                    {product.brand === 'girilal' ? 'Giri Lal Prem Chand Sarees' : 'Arunima Fashions'}
                  </span>
                  {product.new && <LuxuryBadge variant="primary" size="sm">New</LuxuryBadge>}
                </div>

                <h2 className="mt-4 font-heading text-3xl text-night md:text-4xl">
                  {product.name}
                </h2>

                <p className="mt-4 font-body text-sm leading-relaxed text-text-secondary">
                  {product.description}
                </p>

                <div className="mt-6 grid grid-cols-2 gap-4 border-y border-night/5 py-5">
                  <div>
                    <span className="font-body text-[11px] uppercase tracking-[0.15em] text-text-muted">Fabric</span>
                    <p className="mt-1 font-body text-sm text-night">{product.fabric}</p>
                  </div>
                  <div>
                    <span className="font-body text-[11px] uppercase tracking-[0.15em] text-text-muted">Occasion</span>
                    <p className="mt-1 font-body text-sm text-night capitalize">{product.occasion}</p>
                  </div>
                  <div>
                    <span className="font-body text-[11px] uppercase tracking-[0.15em] text-text-muted">Category</span>
                    <p className="mt-1 font-body text-sm text-night capitalize">{product.subcategory}</p>
                  </div>
                  <div>
                    <span className="font-body text-[11px] uppercase tracking-[0.15em] text-text-muted">SKU</span>
                    <p className="mt-1 font-body text-sm text-night">{product.sku}</p>
                  </div>
                </div>

                <div className="mt-5">
                  <span className="font-body text-[11px] uppercase tracking-[0.15em] text-text-muted">Available Colors</span>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {product.colors.map((color) => (
                      <span
                        key={color}
                        className="inline-flex items-center gap-1 rounded-full border border-night/10 px-3 py-1 font-body text-xs capitalize text-night"
                      >
                        <Check className="size-3 text-primary" />
                        {color}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 border-y border-night/5 py-4">
                  <p className="font-heading text-lg text-primary">Price on Enquiry</p>
                  <p className="mt-1 font-body text-xs text-text-muted">Contact us for pricing details.</p>
                </div>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Link to={`/product/${product.slug}`} className="flex-1">
                    <LuxuryButton variant="primary" size="lg" fullWidth>
                      View Full Details
                    </LuxuryButton>
                  </Link>
                  <Link to={`/enquiry?product=${product.slug}`} className="flex-1">
                    <LuxuryButton variant="outline" size="lg" fullWidth>
                      Enquire Now
                    </LuxuryButton>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
