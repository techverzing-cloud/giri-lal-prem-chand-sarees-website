import { Helmet } from 'react-helmet-async'
import { PageTransition } from '@/components/animations/PageTransition'
import { AboutHero } from '@/components/about/AboutHero'
import { OurStory } from '@/components/about/OurStory'
import { HeritageTimeline } from '@/components/about/HeritageTimeline'
import { BrandPhilosophy } from '@/components/about/BrandPhilosophy'
import { TrustSection } from '@/components/about/TrustSection'
import { AboutCTA } from '@/components/about/AboutCTA'
import { siteConfig } from '@/config/site'

export default function OurStoryPage() {
  return (
    <PageTransition>
      <Helmet>
        <title>Our Story | {siteConfig.seo.title}</title>
        <meta name="description" content="The story of Giri Lal Prem Chand Sarees — from a small shop in Chandni Chowk to a legacy spanning three generations and thousands of happy families." />
        <meta property="og:title" content={`Our Story | ${siteConfig.seo.title}`} />
        <meta property="og:description" content="From Chandni Chowk to a legacy spanning three generations." />
        <link rel="canonical" href={`${siteConfig.seo.siteUrl}/our-story`} />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: siteConfig.company.name,
            foundingDate: '1946',
            description: siteConfig.company.description,
          })}
        </script>
      </Helmet>

      <AboutHero />
      <OurStory />
      <HeritageTimeline />
      <BrandPhilosophy />
      <TrustSection />
      <AboutCTA />
    </PageTransition>
  )
}
