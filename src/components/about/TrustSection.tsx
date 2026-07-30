import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { TRUST_STATS } from '@/data/about'

function CountUpStat({ end, suffix = '', label }: { end: number; suffix?: string; label: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return
    const startTime = Date.now()
    const duration = 2500
    function tick() {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * end))
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [isInView, end])

  return (
    <div ref={ref} className="text-center">
      <p className="font-heading text-5xl text-primary md:text-6xl">{count}{suffix}</p>
      <p className="mt-2 font-body text-sm text-text-muted">{label}</p>
    </div>
  )
}

export function TrustSection() {
  return (
    <section className="py-section">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-lg border border-night/5 bg-white p-8 md:p-12"
        >
          <div className="text-center">
            <span className="font-body text-xs font-semibold uppercase tracking-[0.25em] text-text-muted">
              Trusted For Generations
            </span>
            <h2 className="mt-4 font-heading text-3xl text-night md:text-4xl">
              A Legacy of Trust
            </h2>
            <p className="mx-auto mt-4 max-w-2xl font-body text-sm leading-relaxed text-text-muted">
              For over six decades, families have trusted us for their most cherished celebrations. 
              Our relationships span generations — a testament to the quality, authenticity, and care we bring to every interaction.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-8 md:grid-cols-4">
            {TRUST_STATS.map((stat) => (
              <CountUpStat
                key={stat.label}
                label={stat.label}
                end={parseInt(stat.value)}
                suffix={stat.value.replace(/[0-9]/g, '')}
              />
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
