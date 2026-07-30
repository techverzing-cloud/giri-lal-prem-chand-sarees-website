import { motion } from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { ScrollReveal } from '@/components/animations/ScrollReveal'
import { PROCESS_STEPS } from '@/constants/home'

export function ProcessSection() {
  return (
    <section className="bg-cream py-section lg:py-section-lg">
      <Container>
        <SectionTitle
          title="How It Works"
          subtitle="Simple Process"
          description="Your journey to owning a piece of luxury, simplified."
        />

        <div className="relative mt-16">
          <div className="absolute left-[23px] top-0 hidden h-full w-px bg-primary/15 md:block lg:left-[31px]" />

          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            {PROCESS_STEPS.map((step, index) => (
              <ScrollReveal
                key={step.id}
                direction="up"
                duration={0.6}
                delay={index * 0.15}
                className="relative pl-14 md:pl-0"
              >
                <div className="absolute left-0 top-0 md:relative md:mb-6">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.2, type: 'spring', stiffness: 200 }}
                    className="flex size-[46px] items-center justify-center rounded-full border-2 border-primary bg-white md:size-[62px]"
                  >
                    <span className="font-heading text-sm font-semibold text-primary md:text-lg">
                      {step.step}
                    </span>
                  </motion.div>
                </div>

                <div>
                  <h3 className="font-heading text-xl text-night md:text-2xl">{step.title}</h3>
                  <p className="mt-2 font-body text-sm leading-relaxed text-text-secondary">
                    {step.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
