import { motion } from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { OUR_STORY } from '@/data/about'

export function OurStory() {
  return (
    <section className="py-section">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="aspect-[5/4] mt-8 overflow-hidden rounded-lg bg-gradient-to-br from-primary/10 via-accent/5 to-night/10">
              <img
                src="/about/our-story.jpeg"
                alt="Giri Lal Prem Chand — Our Legacy"
                className="h-full w-full object-cover"
                onError={(e) => {
                  const target = e.currentTarget
                  target.style.display = 'none'
                  const parent = target.parentElement
                  if (parent) {
                    const fallback = document.createElement('div')
                    fallback.className = 'flex h-full items-center justify-center'
                    fallback.innerHTML = '<p class="font-heading text-lg text-white/30">Our Story</p>'
                    parent.appendChild(fallback)
                  }
                }}
              />
            </div>
          </motion.div>

          <div className="flex flex-col justify-center">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-body text-xs font-semibold uppercase tracking-[0.25em] text-text-muted"
            >
              Our Story
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-4 font-heading text-3xl font-medium text-night md:text-4xl lg:text-5xl"
            >
              A Journey of
              <br />
              <span className="text-primary">Tradition & Trust</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 font-body text-base leading-relaxed text-text-secondary md:text-lg"
            >
              {OUR_STORY.intro}
            </motion.p>

            <div className="mt-6 space-y-4">
              {OUR_STORY.paragraphs.map((para, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  className="font-body text-sm leading-relaxed text-text-muted"
                >
                  {para}
                </motion.p>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
