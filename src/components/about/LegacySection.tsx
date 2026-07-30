import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { BRAND_LEGACY } from '@/data/about'

function CountUp({ end, suffix = '', duration = 2000 }: { end: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return
    const startTime = Date.now()
    function tick() {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * end))
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [isInView, end, duration])

  return <span ref={ref}>{count}{suffix}</span>
}

const stats = [
  { value: BRAND_LEGACY.since, label: 'Founded', suffix: '', end: BRAND_LEGACY.since },
  { value: BRAND_LEGACY.generations.toString(), label: 'Generations', suffix: '', end: BRAND_LEGACY.generations },
  { value: BRAND_LEGACY.yearsOfExcellence.toString(), label: 'Years of Excellence', suffix: '+', end: BRAND_LEGACY.yearsOfExcellence },
  { value: BRAND_LEGACY.familiesServed, label: 'Happy Families Served', suffix: '', end: 10000 },
]

export function LegacySection() {
  return (
    <section className="relative overflow-hidden bg-cream/50 py-section">
      <Container>
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-body text-xs font-semibold uppercase tracking-[0.25em] text-text-muted"
            >
              Our Legacy
            </motion.span>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mt-6"
            >
              <span className="font-heading text-[8rem] font-medium leading-none text-primary/10 md:text-[10rem] lg:text-[12rem] select-none">
                {BRAND_LEGACY.since}
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-[-1.5rem] font-heading text-3xl font-medium text-night md:text-4xl lg:text-5xl"
            >
              Three Generations of
              <br />
              <span className="text-primary">Uncompromising Quality</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 font-body text-base leading-relaxed text-text-secondary md:text-lg"
            >
              What began as a dream in the narrow lanes of Chandni Chowk has blossomed into a legacy 
              that spans three generations and thousands of happy families. Our journey is woven with 
              the threads of tradition, the warmth of relationships, and an unwavering commitment to excellence.
            </motion.p>
          </div>

          <div className="grid grid-cols-2 gap-6 self-center">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="rounded-lg border border-night/5 bg-white p-6 text-center"
              >
                <p className="font-heading text-4xl text-primary md:text-5xl">
                  {stat.label === 'Years of Excellence' ? (
                    <><CountUp end={80} suffix="+" /></>
                  ) : stat.label === 'Generations' ? (
                    <><CountUp end={3} /></>
                  ) : stat.label === 'Founded' ? (
                    <><CountUp end={1946} /></>
                  ) : (
                    <><CountUp end={500000} suffix="+" /></>
                  )}
                </p>
                <p className="mt-2 font-body text-sm text-text-muted">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
