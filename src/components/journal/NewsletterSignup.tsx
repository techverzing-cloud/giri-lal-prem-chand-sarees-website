import { motion } from 'framer-motion'
import { CheckCircle, Loader, Send } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { LuxuryButton } from '@/components/ui/LuxuryButton'
import { useNewsletter } from '@/hooks/useNewsletter'
import { cn } from '@/utils/cn'

export function NewsletterSignup() {
  const { email, setEmail, name, setName, submitting, success, error, subscribe } = useNewsletter()

  return (
    <section className="py-section bg-night">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <SectionTitle
            subtitle="Stay Inspired"
            title="The GLPC Journal"
            description="Join our community of fashion enthusiasts. Get the latest articles, style guides, and exclusive updates delivered to your inbox."
            light
          />

          {success ? (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="mt-8 p-6"
            >
              <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-green-500/10">
                <CheckCircle className="size-8 text-green-400" />
              </div>
              <p className="mt-4 font-heading text-xl text-white">You are subscribed!</p>
              <p className="mt-2 font-body text-sm text-white/60">
                Thank you for joining — you will hear from us soon.
              </p>
            </motion.div>
          ) : (
            <div className="mt-8">
              <div className="mx-auto flex max-w-md flex-col gap-4 sm:flex-row">
                <input
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="flex-1 rounded-md border border-white/10 bg-white/5 px-4 py-3 font-body text-sm text-white placeholder:text-white/30 transition-colors focus:border-white/30 focus:outline-none focus:ring-1 focus:ring-white/20"
                  aria-label="Your name"
                />
                <input
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 rounded-md border border-white/10 bg-white/5 px-4 py-3 font-body text-sm text-white placeholder:text-white/30 transition-colors focus:border-white/30 focus:outline-none focus:ring-1 focus:ring-white/20"
                  aria-label="Email address"
                />
                <LuxuryButton
                  variant="primary"
                  size="md"
                  onClick={subscribe}
                  disabled={submitting}
                  icon={submitting ? <Loader className="size-4 animate-spin" /> : <Send className="size-4" />}
                >
                  {submitting ? 'Subscribing...' : 'Subscribe'}
                </LuxuryButton>
              </div>
              {error && <p className="mt-3 font-body text-sm text-red-400">{error}</p>}
              <p className="mt-4 font-body text-xs text-white/30">
                No spam. Unsubscribe anytime.
              </p>
            </div>
          )}
        </div>
      </Container>
    </section>
  )
}
