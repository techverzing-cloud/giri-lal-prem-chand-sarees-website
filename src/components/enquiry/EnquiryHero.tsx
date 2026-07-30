import { motion } from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { LuxuryButton } from '@/components/ui/LuxuryButton'
import { ArrowDown } from 'lucide-react'

interface EnquiryHeroProps {
  title: string
  subtitle: string
  description?: string
  ctaText?: string
  onCtaClick?: () => void
  light?: boolean
}

export function EnquiryHero({ title, subtitle, description, ctaText, onCtaClick, light = false }: EnquiryHeroProps) {
  return (
    <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden bg-night">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-night to-night/90" />

      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
        backgroundSize: '40px 40px',
      }} />

      <Container className="relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 block font-body text-xs font-semibold uppercase tracking-[0.25em] text-white/50"
          >
            {subtitle}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className={`font-heading text-4xl font-medium leading-tight md:text-6xl lg:text-7xl ${light ? 'text-night' : 'text-white'}`}
          >
            {title}
          </motion.h1>

          {description && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className={`mx-auto mt-6 max-w-2xl font-body text-base leading-relaxed md:text-lg ${light ? 'text-text-secondary' : 'text-white/60'}`}
            >
              {description}
            </motion.p>
          )}

          {ctaText && onCtaClick && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="mt-10"
            >
              <LuxuryButton variant="outlineLight" size="lg" onClick={onCtaClick}>
                {ctaText}
              </LuxuryButton>
            </motion.div>
          )}
        </div>
      </Container>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ opacity: { delay: 1 }, y: { repeat: Infinity, duration: 2 } }}
        onClick={onCtaClick}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-white/40 hover:text-white/70 transition-colors"
        aria-label="Scroll to form"
      >
        <ArrowDown className="size-6" />
      </motion.button>
    </section>
  )
}
