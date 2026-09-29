import { motion } from 'framer-motion'
import Link from 'next/link'
import { CheckCircle, Loader, Send } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { LuxuryButton } from '@/components/ui/LuxuryButton'
import { ConsentCheckbox } from '@/components/privacy/ConsentCheckbox'
import { PRIVACY_POLICY_ROUTE } from '@/config/privacy'
import { useNewsletter } from '@/hooks/useNewsletter'

export function NewsletterSignup() {
  const {
    email,
    setEmail,
    name,
    setName,
    consented,
    setConsented,
    submitting,
    success,
    error,
    consentError,
    subscribe,
  } = useNewsletter()

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

          {/*
            This component is not currently rendered on any page and the service
            behind it does not transmit anything, so the copy below is written to
            be honest about that. "You are subscribed" would be a false claim
            about processing a visitor's email address, and "unsubscribe anytime"
            would promise a mailing list that does not exist.
          */}
          {success ? (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="mt-8 p-6"
            >
              <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-white/10">
                <CheckCircle className="size-8 text-white/60" />
              </div>
              <p className="mt-4 font-heading text-xl text-white">Thank you</p>
              <p className="mt-2 font-body text-sm text-white/60">
                Your interest has been noted. The journal is not yet open for
                subscriptions, so nothing has been sent. We will let you know when
                it is.
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
                  aria-invalid={error ? 'true' : undefined}
                  className="flex-1 rounded-md border border-white/10 bg-white/5 px-4 py-3 font-body text-sm text-white placeholder:text-white/30 transition-colors focus:border-white/30 focus:outline-none focus:ring-1 focus:ring-white/20"
                  aria-label="Your name"
                  autoComplete="name"
                />
                <input
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-invalid={error ? 'true' : undefined}
                  className="flex-1 rounded-md border border-white/10 bg-white/5 px-4 py-3 font-body text-sm text-white placeholder:text-white/30 transition-colors focus:border-white/30 focus:outline-none focus:ring-1 focus:ring-white/20"
                  aria-label="Email address"
                  autoComplete="email"
                />
              </div>

              {error && (
                <p
                  role="alert"
                  className="mt-3 font-body text-sm text-red-300"
                >
                  {error}
                </p>
              )}

              {/* Consent sits above the button, so the box is read before the
                  action it authorises rather than after it. */}
              <div className="mx-auto mt-4 max-w-md text-left">
                <ConsentCheckbox
                  id="newsletter-consent"
                  variant="dark"
                  checked={consented}
                  onChange={(e) => setConsented(e.target.checked)}
                  error={consentError || undefined}
                >
                  I would like to receive the GLPC Journal and style updates by
                  email. I can stop these at any time, as explained in the{' '}
                  <Link
                    href={PRIVACY_POLICY_ROUTE}
                    className="font-medium text-gold underline underline-offset-2 transition-colors hover:text-gold-light"
                  >
                    Privacy Policy
                  </Link>
                  .
                </ConsentCheckbox>
              </div>

              <div className="mt-5 flex justify-center">
                <LuxuryButton
                  variant="primary"
                  size="md"
                  onClick={subscribe}
                  disabled={submitting}
                  icon={
                    submitting ? (
                      <Loader className="size-4 animate-spin" />
                    ) : (
                      <Send className="size-4" />
                    )
                  }
                >
                  {submitting ? 'Subscribing...' : 'Subscribe'}
                </LuxuryButton>
              </div>

              <p className="mt-4 font-body text-xs text-white/40">
                The journal is not yet open for subscriptions. Your details are
                not sent anywhere until this is switched on.
              </p>
            </div>
          )}
        </div>
      </Container>
    </section>
  )
}
