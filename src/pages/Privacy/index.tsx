import { Helmet } from 'react-helmet-async'
import { PageTransition } from '@/components/animations/PageTransition'
import { PageHeader } from '@/components/layout/PageHeader'
import { Container } from '@/components/ui/Container'
import { siteConfig } from '@/config/site'

export default function PrivacyPage() {
  return (
    <PageTransition>
      <Helmet>
        <title>Privacy Policy | {siteConfig.seo.title}</title>
      </Helmet>

      <PageHeader
        title="Privacy Policy"
        subtitle="Legal"
        description="How we collect, use, and protect your information."
      />

      <section className="py-section">
        <Container>
          <div className="prose max-w-3xl font-body text-text-secondary">
            <p>Your privacy is important to us. This policy outlines how we handle your personal information.</p>
            <h2 className="font-heading text-night">Information We Collect</h2>
            <p>We collect information you provide when filling out enquiry forms, including your name, email, phone number, and preferences.</p>
            <h2 className="font-heading text-night">How We Use Your Information</h2>
            <p>Your information is used solely to respond to your enquiries and provide information about our products and services.</p>
            <h2 className="font-heading text-night">Data Protection</h2>
            <p>We implement appropriate security measures to protect your personal information from unauthorized access or disclosure.</p>
            <h2 className="font-heading text-night">Contact</h2>
            <p>For any questions regarding this policy, please contact us at {siteConfig.contact.email}.</p>
          </div>
        </Container>
      </section>
    </PageTransition>
  )
}
