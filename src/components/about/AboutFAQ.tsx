import { Container } from '@/components/ui/Container'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { FAQAccordion } from '@/components/enquiry/FAQAccordion'

export function AboutFAQ() {
  return (
    <section className="py-section bg-cream/50">
      <Container>
        <SectionTitle
          subtitle="FAQ"
          title="Questions About Our Legacy"
          description="Everything you need to know about Giri Lal Prem Chand Sarees."
        />
        <div className="mx-auto mt-10 max-w-3xl">
          <FAQAccordion />
        </div>
      </Container>
    </section>
  )
}
