import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { LuxuryBadge } from '@/components/ui/LuxuryBadge'
import { FEATURED_COLLECTIONS } from '@/constants/home'
import { ArrowRight } from 'lucide-react'

function CollectionCard({
  title,
  description,
  image,
  href,
  tag,
  index,
}: {
  title: string
  description: string
  image: string
  href: string
  tag: string
  index: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative overflow-hidden rounded-lg bg-night"
    >
      <Link to={href} className="block">
        <div className="relative aspect-[3/4] overflow-hidden md:aspect-[4/5]">
          <div
            className="absolute inset-0 bg-gradient-to-t from-night/80 via-night/20 to-transparent transition-all duration-700 group-hover:from-night/90"
          />
          <div
            className="h-full w-full bg-gradient-to-br from-primary/10 to-accent/10 transition-transform duration-700 group-hover:scale-110"
            style={{
              backgroundImage:
                'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.03\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
            }}
          />
          <div className="absolute left-4 top-4">
            <LuxuryBadge variant="primary" size="sm">
              {tag}
            </LuxuryBadge>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
            <h3 className="font-heading text-2xl text-white md:text-3xl">{title}</h3>
            <p className="mt-2 font-body text-sm text-white/70">{description}</p>
            <div className="mt-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/50 transition-all duration-300 group-hover:text-white">
              <span>Explore</span>
              <ArrowRight className="size-3 transition-transform duration-300 group-hover:translate-x-1" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export function FeaturedCollections() {
  return (
    <section className="bg-surface py-section lg:py-section-lg">
      <Container>
        <SectionTitle
          title="Featured Collections"
          subtitle="Curated for You"
          description="Discover our handpicked selection of luxury sarees and ensembles."
        />

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {FEATURED_COLLECTIONS.map((collection, index) => (
            <CollectionCard key={collection.id} {...collection} index={index} />
          ))}
        </div>
      </Container>
    </section>
  )
}
