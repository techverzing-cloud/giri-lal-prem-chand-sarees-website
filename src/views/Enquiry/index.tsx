import { useRouter, useSearchParams } from 'next/navigation'
import { Helmet } from 'react-helmet-async'
import { PageTransition } from '@/components/animations/PageTransition'
import { Container } from '@/components/ui/Container'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { EnquiryHero } from '@/components/enquiry/EnquiryHero'
import { ConsultationForm } from '@/components/enquiry/ConsultationForm'
import { BenefitsSection } from '@/components/enquiry/BenefitsSection'
import { FAQAccordion } from '@/components/enquiry/FAQAccordion'
import { LuxuryButton } from '@/components/ui/LuxuryButton'
import { useConsultationForm } from '@/hooks/useConsultationForm'
import { useLeadTracking } from '@/hooks/useLeadTracking'
import { AnalyticsEvents } from '@/services/analytics'
import { getWhatsAppUrl } from '@/utils/helpers'
import { siteConfig } from '@/config/site'

export default function EnquiryPage() {
  useLeadTracking()
  const router = useRouter()
  const params = useSearchParams()
  const productName = params.get('product') ?? ''

  const {
    form,
    step,
    nextStep,
    prevStep,
    goToStep,
    submitting,
    result,
    onSubmit,
    reset,
  } = useConsultationForm('CONSULTATION')

  function handleWhatsApp() {
    AnalyticsEvents.whatsappClick('enquiry_page')
    const msg = [
      `Hello, I would like to make an enquiry.`,
      productName ? `Product: ${productName}` : '',
      ``,
      `Thank you.`,
    ].filter(Boolean).join('\n')
    window.open(getWhatsAppUrl(msg), '_blank')
  }

  function handleReset() {
    reset()
    if (result?.success) {
      router.push('/thank-you')
    }
  }

  return (
    <PageTransition>
      <Helmet>
        <title>Enquire Now | {siteConfig.seo.title}</title>
        <meta name="description" content="Book a personal consultation with our luxury fashion experts. Experience personalized attention from a heritage fashion house." />
      </Helmet>

      <EnquiryHero
        subtitle="Personal Consultation"
        title="Let's Create Something Beautiful Together"
        description="Book a personalized consultation with our experts. Whether it is a wedding, festival, or a special occasion, we are here to help you find the perfect piece."
        ctaText="Start Your Consultation"
        onCtaClick={() => {
          const form = document.getElementById('consultation-form')
          form?.scrollIntoView({ behavior: 'smooth' })
        }}
      />

      <section id="consultation-form" className="py-section bg-cream/50">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2">
            <div className="hidden lg:block">
              <div className="sticky top-28">
                <div className="aspect-[4/5] rounded-lg bg-gradient-to-br from-primary/10 via-accent/5 to-night/10" />
                <div className="mt-8">
                  <span className="font-body text-xs font-semibold uppercase tracking-[0.25em] text-text-muted">
                    Since 1946
                  </span>
                  <p className="mt-2 font-heading text-3xl text-night">
                    A Legacy of <br />Luxury Craftsmanship
                  </p>
                  <p className="mt-4 font-body text-sm leading-relaxed text-text-muted">
                    For over six decades, our family has been curating the finest handwoven textiles, 
                    bringing together tradition, artistry, and timeless elegance.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <ConsultationForm
                form={{
                  register: form.register,
                  errors: form.formState.errors,
                  trigger: form.trigger,
                  getValues: form.getValues,
                }}
                step={step}
                submitting={submitting}
                result={result}
                onNext={async () => {
                  const fields = step === 1 ? ['name', 'phone', 'email', 'city', 'preferredContact'] as const
                    : step === 2 ? ['eventType', 'budget', 'interestedCollection'] as const
                    : []
                  const valid = await form.trigger(fields as any)
                  if (valid) nextStep()
                }}
                onPrev={prevStep}
                onStepClick={(s) => {
                  if (s <= step) goToStep(s)
                }}
                onSubmit={onSubmit}
                onReset={handleReset}
                onWhatsApp={handleWhatsApp}
              />
            </div>
          </div>
        </Container>
      </section>

      <section className="py-section">
        <Container>
          <BenefitsSection />
        </Container>
      </section>

      <section className="py-section bg-cream/50">
        <Container>
          <SectionTitle
            subtitle="FAQ"
            title="Frequently Asked Questions"
            description="Everything you need to know about our consultation process."
          />
          <div className="mx-auto mt-10 max-w-3xl">
            <FAQAccordion />
          </div>
        </Container>
      </section>

      <section className="py-section bg-night">
        <Container>
          <div className="text-center">
            <span className="font-body text-xs font-semibold uppercase tracking-[0.25em] text-white/40">
              Get Started
            </span>
            <h2 className="mt-4 font-heading text-3xl text-white md:text-4xl">
              Ready to Find Your Perfect Piece?
            </h2>
            <p className="mx-auto mt-4 max-w-xl font-body text-sm text-white/60">
              Book your consultation today and experience the legacy of Giri Lal Prem Chand Sarees.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <LuxuryButton variant="outlineLight" size="lg" onClick={() => {
                document.getElementById('consultation-form')?.scrollIntoView({ behavior: 'smooth' })
              }}>
                Book Consultation
              </LuxuryButton>
              <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer">
                <LuxuryButton variant="ghost" size="lg" className="text-white/70 hover:text-white">
                  WhatsApp Us
                </LuxuryButton>
              </a>
            </div>
          </div>
        </Container>
      </section>
    </PageTransition>
  )
}
