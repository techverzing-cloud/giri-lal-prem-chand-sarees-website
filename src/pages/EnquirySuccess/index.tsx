import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { PageTransition } from '@/components/animations/PageTransition'
import { Container } from '@/components/ui/Container'
import { LuxuryButton } from '@/components/ui/LuxuryButton'
import { siteConfig } from '@/config/site'
import { CheckCircle } from 'lucide-react'

export default function EnquirySuccessPage() {
  return (
    <PageTransition>
      <Helmet>
        <title>Enquiry Submitted | {siteConfig.seo.title}</title>
      </Helmet>

      <section className="flex min-h-screen items-center justify-center">
        <Container>
          <div className="mx-auto max-w-lg text-center">
            <CheckCircle className="mx-auto size-16 text-primary" />
            <h1 className="mt-6 font-heading text-4xl text-night md:text-5xl">
              Thank You
            </h1>
            <p className="mt-4 font-body text-text-secondary">
              Your enquiry has been received. Our team will contact you shortly.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Link to="/">
                <LuxuryButton variant="outline">Return Home</LuxuryButton>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </PageTransition>
  )
}
