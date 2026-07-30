import { motion } from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { CRAFTSMANSHIP_DETAILS, FABRICS } from '@/data/about'

export function CraftsmanshipSection() {
  return (
    <section className="py-section bg-cream/50">
      <Container>
        <SectionTitle
          subtitle="Craftsmanship"
          title="The Art Behind Every Weave"
          description="Discover the meticulous process behind each handcrafted piece."
        />

        <div className="mt-12 space-y-16">
          {CRAFTSMANSHIP_DETAILS.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className={`grid gap-8 items-center ${index % 2 === 0 ? 'lg:grid-cols-[1fr_1.2fr]' : 'lg:grid-cols-[1.2fr_1fr]'}`}
            >
              {index % 2 === 0 ? (
                <>
                  <div className="aspect-[4/3] overflow-hidden rounded-lg bg-gradient-to-br from-primary/10 via-accent/5 to-night/10">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-cover"
                      loading="lazy"
                      onError={(e) => {
                        const t = e.currentTarget
                        t.style.display = 'none'
                        const p = t.parentElement
                        if (p) {
                          const f = document.createElement('div')
                          f.className = 'flex h-full items-center justify-center'
                          f.innerHTML = `<p class="font-heading text-white/20">${item.title}</p>`
                          p.appendChild(f)
                        }
                      }}
                    />
                  </div>
                  <div>
                    <h3 className="font-heading text-2xl text-night md:text-3xl">{item.title}</h3>
                    <p className="mt-4 font-body text-sm leading-relaxed text-text-muted">{item.description}</p>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <h3 className="font-heading text-2xl text-night md:text-3xl">{item.title}</h3>
                    <p className="mt-4 font-body text-sm leading-relaxed text-text-muted">{item.description}</p>
                  </div>
                  <div className="aspect-[4/3] overflow-hidden rounded-lg bg-gradient-to-br from-primary/10 via-accent/5 to-night/10">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-cover"
                      loading="lazy"
                      onError={(e) => {
                        const t = e.currentTarget
                        t.style.display = 'none'
                        const p = t.parentElement
                        if (p) {
                          const f = document.createElement('div')
                          f.className = 'flex h-full items-center justify-center'
                          f.innerHTML = `<p class="font-heading text-white/20">${item.title}</p>`
                          p.appendChild(f)
                        }
                      }}
                    />
                  </div>
                </>
              )}
            </motion.div>
          ))}
        </div>

        <div className="mt-20">
          <SectionTitle
            subtitle="Our Expertise"
            title="Fabrics & Techniques"
            description="From pure silks to intricate weaves — our mastery spans India's finest textile traditions."
          />

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FABRICS.map((fabric, index) => (
              <motion.div
                key={fabric.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className={`rounded-lg bg-gradient-to-br ${fabric.gradient} p-6`}
              >
                <h4 className="font-heading text-lg text-night">{fabric.name}</h4>
                <p className="mt-2 font-body text-sm leading-relaxed text-night/70">{fabric.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
