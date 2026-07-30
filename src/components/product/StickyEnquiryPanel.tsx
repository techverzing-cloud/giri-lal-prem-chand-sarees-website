import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { MessageCircle, Share2 } from 'lucide-react'
import type { Product } from '@/types'
import { LuxuryButton } from '@/components/ui/LuxuryButton'
import { getWhatsAppUrl } from '@/utils/helpers'

interface StickyEnquiryPanelProps {
  product: Product
  onEnquire: () => void
}

export function StickyEnquiryPanel({ product, onEnquire }: StickyEnquiryPanelProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    function handleScroll() {
      const heroHeight = window.innerHeight * 0.6
      setIsVisible(window.scrollY > heroHeight)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const whatsappUrl = getWhatsAppUrl(
    `Hi! I'm interested in ${product.name} (${product.sku}). Kindly share more details.`
  )

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: isVisible ? 0 : 100 }}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-night/10 bg-white/95 shadow-lg shadow-night/10 backdrop-blur-xl"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10 lg:px-16">
        <div className="hidden sm:block">
          <p className="font-body text-xs text-text-muted line-clamp-1">{product.name}</p>
          <p className="font-heading text-sm uppercase tracking-wider text-primary">Enquire for Price</p>
        </div>

        <div className="flex w-full items-center gap-3 sm:w-auto">
          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: product.name,
                  url: window.location.href,
                })
              }
            }}
            className="flex size-11 items-center justify-center rounded-md border border-night/10 text-text-muted transition-colors hover:border-night/30 hover:text-night"
            aria-label="Share product"
          >
            <Share2 className="size-4" />
          </button>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-1 items-center justify-center gap-2 rounded-md border border-[#25D366] px-5 py-2.5 font-body text-sm font-semibold text-[#25D366] transition-colors hover:bg-[#25D366] hover:text-white sm:flex-none"
          >
            <MessageCircle className="size-4" />
            <span className="hidden sm:inline">WhatsApp</span>
          </a>

          <LuxuryButton variant="primary" size="md" onClick={onEnquire} className="flex-1 sm:flex-none">
            Enquire Now
          </LuxuryButton>
        </div>
      </div>
    </motion.div>
  )
}
