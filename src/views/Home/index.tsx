import { PageTransition } from '@/components/animations/PageTransition'
import {
  HeroSection,
  LegacySection,
  FeaturedCollections,
  BrandSection,
  FabricSection,
  FeaturedProducts,
  WhyChooseUs,
  ProcessSection,
  Testimonials,
  InstagramGallery,
  CTASection,
} from '@/components/sections'
import { SEOHead } from '@/components/seo'
import { generateStructuredData } from '@/utils/seo'

export default function HomePage() {
  return (
    <PageTransition>
      <SEOHead
        title="Giri Lal Prem Chand Sarees | Luxury Sarees & Designer Lehengas Since 1946"
        description="Discover exquisite luxury sarees from Giri Lal Prem Chand Sarees (Since 1946) and designer lehengas from Arunima Fashions. Premium Indian textiles crafted for timeless elegance."
        path="/"
        structuredData={{
          '@context': 'https://schema.org',
          '@graph': [
            generateStructuredData('Organization', {}),
            generateStructuredData('WebSite', {}),
          ],
        }}
      />

      <HeroSection />
      <LegacySection />
      <FeaturedCollections />
      <BrandSection />
      <FabricSection />
      <FeaturedProducts />
      <WhyChooseUs />
      <ProcessSection />
      <Testimonials />
      <InstagramGallery />
      <CTASection />
    </PageTransition>
  )
}
