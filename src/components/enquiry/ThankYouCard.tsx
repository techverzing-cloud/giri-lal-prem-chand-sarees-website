import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CheckCircle, MessageCircle, ArrowLeft, Home } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { LuxuryButton } from '@/components/ui/LuxuryButton'
import { getWhatsAppUrl } from '@/utils/helpers'

export function ThankYouCard() {
  return (
    <section className="flex min-h-screen items-center justify-center bg-gradient-to-br from-white to-cream/50">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="mx-auto max-w-lg text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
            className="mx-auto flex size-24 items-center justify-center rounded-full bg-primary/5"
          >
            <CheckCircle className="size-12 text-primary" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-8 font-heading text-4xl font-medium text-night md:text-5xl"
          >
            Thank You
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
            className="mt-4 font-body text-lg text-text-secondary"
          >
            Your enquiry has been received. Our team will review it and get back to you within 24 hours.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-4 font-body text-sm text-text-muted"
          >
            For urgent enquiries, please reach out to us on WhatsApp.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85 }}
            className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          >
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-md border border-[#25D366] px-8 py-3 font-body text-sm font-semibold text-[#25D366] transition-colors hover:bg-[#25D366] hover:text-white"
            >
              <MessageCircle className="size-4" />
              WhatsApp Us
            </a>
            <Link to="/collections">
              <LuxuryButton variant="outline" size="md" icon={<ArrowLeft className="size-4" />} iconPosition="left">
                Continue Browsing
              </LuxuryButton>
            </Link>
            <Link to="/">
              <LuxuryButton variant="ghost" size="md" icon={<Home className="size-4" />} iconPosition="left">
                Home
              </LuxuryButton>
            </Link>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}
