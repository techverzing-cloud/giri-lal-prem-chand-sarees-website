import { Helmet } from 'react-helmet-async'
import { PageTransition } from '@/components/animations/PageTransition'
import { PageHeader } from '@/components/layout/PageHeader'
import { Container } from '@/components/ui/Container'
import { siteConfig } from '@/config/site'

export default function TermsPage() {
  return (
    <PageTransition>
      <Helmet>
        <title>Terms of Service | {siteConfig.seo.title}</title>
      </Helmet>

      <PageHeader
        title="Terms of Service"
        subtitle="Legal"
        description="Terms and conditions governing the use of this website."
      />

      <section className="py-section">
        <Container>
          <div className="prose max-w-3xl font-body text-text-secondary">
            <p>Please read these terms carefully before using this website.</p>
            <h2 className="font-heading text-night">Use of Website</h2>
            <p>This website is for informational and showcase purposes. All content, including images and text, is the property of {siteConfig.company.name}.</p>
            <h2 className="font-heading text-night">Enquiries</h2>
            <p>Submitting an enquiry does not constitute a binding agreement. We will contact you to discuss your requirements.</p>
            <h2 className="font-heading text-night">Intellectual Property</h2>
            <p>All content on this website is protected by applicable intellectual property laws.</p>
            <h2 className="font-heading text-night">Contact</h2>
            <p>For any questions, please contact us at {siteConfig.contact.email}.</p>
          </div>
        </Container>
      </section>
    </PageTransition>
  )
}
