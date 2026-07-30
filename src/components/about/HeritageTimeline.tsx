import { motion } from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { TIMELINE_EVENTS } from '@/data/timeline'

export function HeritageTimeline() {
  return (
    <section className="py-section bg-night">
      <Container>
        <SectionTitle
          subtitle="Our Heritage"
          title="The Journey So Far"
          description="From a small shop in Chandni Chowk to a legacy spanning nearly seven decades."
          light
        />

        <div className="relative mt-16">
          <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-white/10 lg:block" />

          <div className="space-y-16 lg:space-y-24">
            {TIMELINE_EVENTS.map((event, index) => {
              const isLeft = index % 2 === 0

              return (
                <motion.div
                  key={event.year}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.7 }}
                  className={`relative flex flex-col gap-8 lg:flex-row ${isLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'} lg:items-center`}
                >
                  <div className={`flex-1 ${isLeft ? 'lg:text-right lg:pr-16' : 'lg:pl-16'}`}>
                    <span className="font-heading text-5xl font-medium text-primary/30 md:text-6xl">
                      {event.year}
                    </span>
                    <h3 className="mt-4 font-heading text-2xl text-white md:text-3xl">
                      {event.title}
                    </h3>
                    <p className="mt-4 font-body text-sm leading-relaxed text-white/60">
                      {event.description}
                    </p>
                  </div>

                  <div className="relative z-10 mx-auto flex size-14 items-center justify-center rounded-full border-2 border-primary bg-night lg:mx-0">
                    <div className="size-3 rounded-full bg-primary" />
                  </div>

                  <div className="flex-1">
                    <div className="aspect-[4/3] overflow-hidden rounded-lg bg-gradient-to-br from-primary/10 via-accent/5 to-night/20">
                      <img
                        src={event.image}
                        alt={`${event.year} — ${event.title}`}
                        className="h-full w-full object-cover"
                        loading="lazy"
                        onError={(e) => {
                          const target = e.currentTarget
                          target.style.display = 'none'
                          const parent = target.parentElement
                          if (parent) {
                            const fallback = document.createElement('div')
                            fallback.className = 'flex h-full items-center justify-center'
                            fallback.innerHTML = `<p class="font-heading text-lg text-white/20">${event.year}</p>`
                            parent.appendChild(fallback)
                          }
                        }}
                      />
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </Container>
    </section>
  )
}
