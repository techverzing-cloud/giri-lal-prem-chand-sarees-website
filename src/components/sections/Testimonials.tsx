import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { ScrollReveal } from '@/components/animations/ScrollReveal'
import { TESTIMONIALS } from '@/constants/home'

export function Testimonials() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(0)

  function goTo(index: number) {
    setDirection(index > current ? 1 : -1)
    setCurrent(index)
  }

  function goNext() {
    setDirection(1)
    setCurrent((prev) => (prev + 1) % TESTIMONIALS.length)
  }

  function goPrev() {
    setDirection(-1)
    setCurrent((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)
  }

  const testimonial = TESTIMONIALS[current]

  return (
    <section className="bg-night py-section lg:py-section-lg">
      <Container>
        <ScrollReveal>
          <SectionTitle
            title="What Our Clients Say"
            subtitle="Testimonials"
            description="Hear from those who have experienced the GLPC difference."
            light
          />
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.2} duration={0.8}>
          <div className="relative mt-12">
            <div className="mx-auto max-w-4xl">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={testimonial.id}
                  custom={direction}
                  initial={{ opacity: 0, x: direction > 0 ? 60 : -60, y: 20 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  exit={{ opacity: 0, x: direction > 0 ? -60 : 60, y: -20 }}
                  transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                  className="text-center"
                >
                <Quote className="mx-auto size-10 text-primary/30 md:size-14" />

                <blockquote className="mt-8 font-heading text-2xl leading-relaxed text-white/90 md:text-3xl lg:text-4xl">
                  &ldquo;{testimonial.text}&rdquo;
                </blockquote>

                <div className="mt-6 flex items-center justify-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`size-4 ${
                        i < testimonial.rating ? 'text-gold fill-gold' : 'text-white/20'
                      }`}
                    />
                  ))}
                </div>

                <div className="mt-8 flex flex-col items-center gap-3 md:flex-row md:justify-center md:gap-6">
                  <div className="flex items-center gap-4">
                    <div className="size-12 overflow-hidden rounded-full bg-primary/20">
                      <div className="flex h-full items-center justify-center">
                        <span className="font-heading text-lg text-white/60">
                          {testimonial.name.charAt(0)}
                        </span>
                      </div>
                    </div>
                    <div className="text-left">
                      <p className="font-heading text-lg text-white">{testimonial.name}</p>
                      <p className="font-body text-sm text-white/50">{testimonial.location}</p>
                    </div>
                  </div>
                  <span className="hidden text-white/20 md:block">|</span>
                  <p className="font-body text-sm italic text-white/40">{testimonial.product}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-10 flex items-center justify-center gap-4">
            <button
              onClick={goPrev}
              className="flex size-11 items-center justify-center rounded-full border border-white/20 text-white/50 transition-colors hover:border-white/50 hover:text-white lg:size-10"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="size-5" />
            </button>

            <div className="flex items-center gap-2">
              {TESTIMONIALS.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goTo(index)}
                  // The visible dot is a 6px bar; the button is now a larger
                  // transparent hit area around it. The arrow buttons already
                  // give this row a 44px height, so this adds no extra height.
                  className="flex h-11 items-center justify-center px-1 lg:h-auto"
                  aria-label={`Go to testimonial ${index + 1}`}
                  aria-current={index === current}
                >
                  <span
                    className={`block h-1.5 rounded-full transition-all duration-500 ${
                      index === current
                        ? 'w-8 bg-primary'
                        : 'w-1.5 bg-white/20 hover:bg-white/40'
                    }`}
                  />
                </button>
              ))}
            </div>

            <button
              onClick={goNext}
              className="flex size-11 items-center justify-center rounded-full border border-white/20 text-white/50 transition-colors hover:border-white/50 hover:text-white lg:size-10"
              aria-label="Next testimonial"
            >
              <ChevronRight className="size-5" />
            </button>
            </div>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  )
}
