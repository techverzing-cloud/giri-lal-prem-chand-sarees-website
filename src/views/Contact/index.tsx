import { PageTransition } from '@/components/animations/PageTransition'
import { Container } from '@/components/ui/Container'
import { StoreInformation } from '@/components/enquiry/StoreInformation'
import { ContactForm } from '@/components/enquiry/ContactForm'
import { SEOHead } from '@/components/seo'

export default function ContactPage() {
  return (
    <PageTransition>
      <SEOHead
        title="Contact Us — Get in Touch"
        description="Get in touch with Giri Lal Prem Chand Sarees. Visit our store, call us, or send a message for luxury saree and designer lehenga enquiries."
        path="/contact"
      />

      <section className="min-h-screen pt-24 md:pt-28">
        <Container>
          <div className="py-8">
            <span className="font-body text-xs font-semibold uppercase tracking-[0.25em] text-text-muted">
              Get in Touch
            </span>
            <h1 className="mt-3 font-heading text-4xl text-night md:text-5xl">
              We Would Love to <br />Hear From You
            </h1>
          </div>

          <div className="grid gap-12 pb-20 lg:grid-cols-2">
            <StoreInformation />
            <ContactForm />
          </div>
        </Container>
      </section>
    </PageTransition>
  )
}
