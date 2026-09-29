import { Helmet } from 'react-helmet-async'
import { PageTransition } from '@/components/animations/PageTransition'
import { EnquiryHero } from '@/components/enquiry/EnquiryHero'
import { CraftsmanshipSection } from '@/components/about/CraftsmanshipSection'
import { ArtisanGrid } from '@/components/about/ArtisanGrid'
import { GalleryGrid } from '@/components/about/GalleryGrid'
import { AboutCTA } from '@/components/about/AboutCTA'
import { siteConfig } from '@/config/site'

export default function CraftsmanshipPage() {
  return (
    <PageTransition>
      <Helmet>
        <title>Craftsmanship | {siteConfig.seo.title}</title>
        <meta name="description" content="Discover the art of handwoven luxury. From Banarasi brocades to Kanjivaram silks — explore the craftsmanship behind Giri Lal Prem Chand Sarees." />
        <meta property="og:title" content={`Craftsmanship | ${siteConfig.seo.title}`} />
        <meta property="og:description" content="The art behind every weave — discover our handcrafted luxury." />
        <link rel="canonical" href={`${siteConfig.seo.siteUrl}/craftsmanship`} />
      </Helmet>

      <EnquiryHero
        title="The Art Behind Every Weave"
        subtitle="Craftsmanship"
        description="From the weaver's loom to your wardrobe — every piece is a labour of love, skill, and generations of expertise."
      />

      <CraftsmanshipSection />
      <ArtisanGrid />
      <GalleryGrid />
      <AboutCTA />
    </PageTransition>
  )
}
