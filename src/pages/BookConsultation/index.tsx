import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { PageTransition } from '@/components/animations/PageTransition'
import { Container } from '@/components/ui/Container'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { LuxuryButton } from '@/components/ui/LuxuryButton'
import { EnquiryHero } from '@/components/enquiry/EnquiryHero'
import { ConsultationTypeCards } from '@/components/enquiry/ConsultationTypeCards'
import { BenefitsSection } from '@/components/enquiry/BenefitsSection'
import { FAQAccordion } from '@/components/enquiry/FAQAccordion'
import { ConsultationForm } from '@/components/enquiry/ConsultationForm'
import { useConsultationForm } from '@/hooks/useConsultationForm'
import { useLeadTracking } from '@/hooks/useLeadTracking'
import { AnalyticsEvents } from '@/services/analytics'
import { getWhatsAppUrl } from '@/utils/helpers'
import { siteConfig } from '@/config/site'

export default function BookConsultationPage() {
  useLeadTracking()
  const navigate = useNavigate()

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
    AnalyticsEvents.whatsappClick('book_consultation')
    window.open(getWhatsAppUrl(
      'Hello, I would like to book a consultation. Kindly share available slots.'
    ), '_blank')
  }

  function handleReset() {
    reset()
    if (result?.success) {
      navigate('/thank-you')
    }
  }

  return (
    <PageTransition>
      <Helmet>
        <title>Book a Consultation | {siteConfig.seo.title}</title>
        <meta name="description" content="Book a personalized consultation with our fashion experts. Virtual, in-store, wedding styling, and designer consultations available." />
      </Helmet>

      <EnquiryHero
        subtitle="Book a Consultation"
        title="Experience Personalised Luxury"
        description="Choose from a range of consultation types — from virtual calls to in-store styling sessions."
        ctaText="View Consultation Types"
        onCtaClick={() => {
          document.getElementById('consultation-types')?.scrollIntoView({ behavior: 'smooth' })
        }}
      />

      <section id="consultation-types" className="py-section">
        <Container>
          <SectionTitle
            subtitle="Consultation Types"
            title="Choose Your Experience"
            description="Every consultation is tailored to your needs."
          />
          <div className="mt-10">
            <ConsultationTypeCards />
          </div>
        </Container>
      </section>

      <section className="py-section bg-cream/50">
        <Container>
          <BenefitsSection />
        </Container>
      </section>

      <section id="booking-form" className="py-section">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2">
            <div className="hidden lg:block">
              <div className="sticky top-28">
                <div className="aspect-[4/5] rounded-lg bg-gradient-to-br from-dark/10 via-primary/5 to-night/10" />
                <div className="mt-8">
                  <span className="font-body text-xs font-semibold uppercase tracking-[0.25em] text-text-muted">
                    Personal Attention
                  </span>
                  <h3 className="mt-3 font-heading text-2xl text-night">
                    Your Style, Our Expertise
                  </h3>
                  <p className="mt-4 font-body text-sm leading-relaxed text-text-muted">
                    Our consultants take the time to understand your taste, preferences, and occasion 
                    to curate a selection that is uniquely yours.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <div className="mb-8">
                <span className="font-body text-xs font-semibold uppercase tracking-[0.25em] text-primary">
                  Reserve Your Session
                </span>
                <h2 className="mt-2 font-heading text-2xl text-night md:text-3xl">
                  Book Your Consultation
                </h2>
              </div>

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

      <section className="py-section bg-cream/50">
        <Container>
          <SectionTitle
            subtitle="FAQ"
            title="Questions About Consultations"
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
              Your Personal Stylist Awaits
            </h2>
            <p className="mx-auto mt-4 max-w-xl font-body text-sm text-white/60">
              Book a consultation today and discover the perfect piece for your special occasion.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <LuxuryButton variant="outlineLight" size="lg" onClick={() => {
                document.getElementById('booking-form')?.scrollIntoView({ behavior: 'smooth' })
              }}>
                Book Now
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
