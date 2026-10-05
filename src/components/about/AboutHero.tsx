import { motion } from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { LuxuryButton } from '@/components/ui/LuxuryButton'
import { ArrowDown } from 'lucide-react'

interface AboutHeroProps {
  onCtaClick?: () => void
}

export function AboutHero({ onCtaClick }: AboutHeroProps) {
  return (
    <section className="relative flex min-h-[85vh] items-center justify-center pt-20 md:pt-24 overflow-hidden bg-night">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-night to-night" />
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
        backgroundSize: '40px 40px',
      }} />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-night to-transparent" />

      <Container className="relative z-10">
        <div className="mx-auto max-w-4xl text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 block font-body text-xs font-semibold uppercase tracking-[0.25em] text-white/40"
          >
            Established 1946
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="font-heading text-5xl font-medium leading-tight text-white md:text-7xl lg:text-8xl"
          >
            Woven With Heritage
            <br />
            <span className="text-primary/90">Since 1946</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mx-auto mt-8 max-w-2xl font-body text-base leading-relaxed text-white/60 md:text-lg"
          >
            For over six decades, we have been the custodians of India's finest handwoven textiles — 
            a family legacy built on craftsmanship, trust, and a deep reverence for tradition.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="mt-10"
          >
            <LuxuryButton variant="outlineLight" size="lg" onClick={onCtaClick}>
              Explore Our Story
            </LuxuryButton>
          </motion.div>
        </div>
      </Container>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ opacity: { delay: 1 }, y: { repeat: Infinity, duration: 2 } }}
        onClick={onCtaClick}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-white/30 hover:text-white/60 transition-colors"
        aria-label="Scroll to explore"
      >
        <ArrowDown className="size-6" />
      </motion.button>
    </section>
  )
}
