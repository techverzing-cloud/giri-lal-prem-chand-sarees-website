import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { PageTransition } from '@/components/animations/PageTransition'
import { ThankYouCard } from '@/components/enquiry/ThankYouCard'
import { AnalyticsEvents } from '@/services/analytics'
import { siteConfig } from '@/config/site'

export default function ThankYouPage() {
  useEffect(() => {
    AnalyticsEvents.thankYouViewed('enquiry')
  }, [])

  return (
    <PageTransition>
      <Helmet>
        <title>Thank You | {siteConfig.seo.title}</title>
        <meta name="description" content="Thank you for your enquiry. Our team will contact you shortly." />
      </Helmet>

      <ThankYouCard />
    </PageTransition>
  )
}
