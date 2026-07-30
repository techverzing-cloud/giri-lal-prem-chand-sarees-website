import { PageTransition } from '@/components/animations/PageTransition'
import { CollectionBanner } from '@/components/shop/CollectionBanner'
import { CollectionLandingSections } from '@/components/sections/CollectionLandingSections'
import { SEOHead } from '@/components/seo'
import { generateBreadcrumb } from '@/utils/seo'

const breadcrumb = generateBreadcrumb([
  { label: 'Home', href: '/' },
  { label: 'Collections' },
])

export default function CollectionsPage() {
  return (
    <PageTransition>
      <SEOHead
        title="Our Collections"
        description="Explore our exclusive collections — luxury sarees from Giri Lal Prem Chand Sarees and designer lehengas from Arunima Fashions."
        path="/collections"
        structuredData={breadcrumb}
      />

      <CollectionBanner
        title="Our Collections"
        subtitle="Discover"
        description="A curated world of timeless elegance, crafted for every celebration."
        backgroundGradient="from-night via-[#1E2828] to-night"
      />

      <CollectionLandingSections />
    </PageTransition>
  )
}
