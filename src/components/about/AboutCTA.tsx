import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { LuxuryButton } from '@/components/ui/LuxuryButton'
import { getWhatsAppUrl } from '@/utils/helpers'

export function AboutCTA() {
  return (
    <section className="relative overflow-hidden bg-night py-section">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-night to-night" />
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
        backgroundSize: '40px 40px',
      }} />

      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="font-body text-xs font-semibold uppercase tracking-[0.25em] text-white/40">
            Experience Heritage
          </span>
          <h2 className="mt-4 font-heading text-4xl font-medium text-white md:text-5xl lg:text-6xl">
            Be Part of Our Story
          </h2>
          <p className="mx-auto mt-6 max-w-xl font-body text-base leading-relaxed text-white/60">
            Visit our store, book a consultation, or explore our collection online. 
            We look forward to welcoming you to the GLPC family.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link to="/collections">
              <LuxuryButton variant="outlineLight" size="lg">
                Explore Collection
              </LuxuryButton>
            </Link>
            <Link to="/book-consultation">
              <LuxuryButton variant="primary" size="lg">
                Book Consultation
              </LuxuryButton>
            </Link>
          </div>

          <div className="mt-8">
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-sm text-white/40 underline underline-offset-4 transition-colors hover:text-white/60"
            >
              Or reach us on WhatsApp
            </a>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
