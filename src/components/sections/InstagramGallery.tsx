import { motion } from 'framer-motion'
import { Instagram, Heart } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { INSTAGRAM_POSTS } from '@/constants/home'
import { siteConfig } from '@/config/site'

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] },
  },
}

export function InstagramGallery() {
  return (
    <section className="bg-surface py-section lg:py-section-lg">
      <Container>
        <SectionTitle
          title="Follow Us on Instagram"
          subtitle="@girilalpremchand"
          description="Join our community of luxury textile enthusiasts."
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-6"
        >
          {INSTAGRAM_POSTS.map((post) => (
            <motion.a
              key={post.id}
              variants={itemVariants}
              href={siteConfig.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden rounded-lg bg-night"
            >
              <div
                className="h-full w-full bg-gradient-to-br from-primary/5 to-accent/5 transition-transform duration-500 group-hover:scale-110"
                style={{
                  backgroundImage:
                    `url(${post.image})`,
                      backgroundPosition: 'center center',
                      backgroundSize: 'cover',
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center bg-night/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="text-center text-white">
                  <Heart className="mx-auto size-5" />
                  <span className="mt-1 block font-body text-xs">{post.likes.toLocaleString()}</span>
                </div>
              </div>
            </motion.a>
          ))}
        </motion.div>

        <div className="mt-10 text-center">
          <a
            href={siteConfig.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border-b border-night/20 pb-1 font-body text-xs font-semibold uppercase tracking-[0.2em] text-night transition-all duration-300 hover:border-primary hover:text-primary"
          >
            <Instagram className="size-4" />
            Follow on Instagram
          </a>
        </div>
      </Container>
    </section>
  )
}
