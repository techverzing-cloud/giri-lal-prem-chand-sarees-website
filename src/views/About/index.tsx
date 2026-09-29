import { PageTransition } from '@/components/animations/PageTransition'
import { AboutHero } from '@/components/about/AboutHero'
import { LegacySection } from '@/components/about/LegacySection'
import { OurStory } from '@/components/about/OurStory'
import { HeritageTimeline } from '@/components/about/HeritageTimeline'
import { BrandPhilosophy } from '@/components/about/BrandPhilosophy'
import { CraftsmanshipSection } from '@/components/about/CraftsmanshipSection'

import { StoreExperience } from '@/components/about/StoreExperience'
import { TrustSection } from '@/components/about/TrustSection'
import { AwardsSection } from '@/components/about/AwardsSection'
import { GalleryGrid } from '@/components/about/GalleryGrid'
import { AboutFAQ } from '@/components/about/AboutFAQ'
import { AboutCTA } from '@/components/about/AboutCTA'
import { Testimonials } from '@/components/sections/Testimonials'
import { SEOHead } from '@/components/seo'
import { siteConfig } from '@/config/site'

export default function AboutPage() {
  return (
    <PageTransition>
      <SEOHead
        title="Our Story — A Legacy of Luxury Since 1946"
        description="Discover the legacy of Giri Lal Prem Chand Sarees — a tradition of luxury sarees since 1946, and Arunima Fashions — contemporary designer lehengas. Three generations of craftsmanship."
        path="/about"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: siteConfig.company.name,
          foundingDate: '1946',
          description: siteConfig.company.description,
          url: siteConfig.seo.siteUrl,
          sameAs: [
            siteConfig.social.instagram,
            siteConfig.social.facebook,
            siteConfig.social.youtube,
          ],
        }}
      />

      <AboutHero onCtaClick={() => {
        document.getElementById('legacy-section')?.scrollIntoView({ behavior: 'smooth' })
      }} />

      <div id="legacy-section">
        <LegacySection />
      </div>

      <OurStory />
      <HeritageTimeline />
      <BrandPhilosophy />
      <CraftsmanshipSection />
      <StoreExperience />
      <TrustSection />
      <Testimonials />
      <AwardsSection />
      <GalleryGrid />
      <AboutFAQ />
      <AboutCTA />
    </PageTransition>
  )
}
