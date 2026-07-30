import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { LEGACY } from '@/constants/home'
import { cn } from '@/utils/cn'

function useCountUp(end: number, duration: number, startOnView: boolean) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const [hasStarted, setHasStarted] = useState(false)

  useEffect(() => {
    if (!startOnView || hasStarted) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true)
          observer.disconnect()
        }
      },
      { threshold: 0.5 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [startOnView, hasStarted])

  useEffect(() => {
    if (!hasStarted) return

    let startTime: number
    let animationId: number

    function animate(timestamp: number) {
      if (!startTime) startTime = timestamp
      const elapsed = timestamp - startTime
      const progress = Math.min(elapsed / (duration * 1000), 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * end))

      if (progress < 1) {
        animationId = requestAnimationFrame(animate)
      }
    }

    animationId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationId)
  }, [hasStarted, end, duration])

  return { ref, count }
}

function StatItem({ value, suffix, label, index }: { value: number; suffix: string; label: string; index: number }) {
  const { ref, count } = useCountUp(value, 2, true)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="text-center"
    >
      <span className="font-heading text-4xl text-primary md:text-5xl">
        <span ref={ref}>{count}</span>
        {suffix}
      </span>
      <p className="mt-2 font-body text-sm text-text-muted">{label}</p>
    </motion.div>
  )
}

function TimelineItem({
  year,
  label,
  description,
  index,
  isLast,
}: {
  year: string
  label: string
  description: string
  index: number
  isLast: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="relative flex gap-6"
    >
      <div className="flex flex-col items-center">
        <div className="flex size-10 items-center justify-center rounded-full border-2 border-primary bg-white">
          <span className="font-heading text-sm font-semibold text-primary">{year.slice(-2)}</span>
        </div>
        {!isLast && <div className="mt-2 h-full w-px bg-primary/20" />}
      </div>
      <div className={cn('pb-8', isLast && 'pb-0')}>
        <h4 className="font-heading text-xl text-night">{label}</h4>
        <p className="mt-1 font-body text-sm text-text-secondary">{description}</p>
      </div>
    </motion.div>
  )
}

export function LegacySection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const imageScale = useTransform(scrollYProgress, [0, 0.5], [0.92, 1])
  const imageOpacity = useTransform(scrollYProgress, [0, 0.3], [0.6, 1])

  return (
    <section ref={sectionRef} className="overflow-hidden bg-cream py-section lg:py-section-lg">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <motion.div
            style={{ scale: imageScale, opacity: imageOpacity }}
            className="relative aspect-[4/5] overflow-hidden rounded-lg bg-gradient-to-br from-primary/5 to-accent/5"
          >
            <img
              src={LEGACY.image}
              alt="Giri Lal Prem Chand — Heritage"
              className="h-full w-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none'
              }}
            />
          </motion.div>

          <div>
            <SectionTitle
              title={LEGACY.headline}
              subtitle="Our Legacy"
              align="left"
              description={LEGACY.description}
            />

            <div className="mt-12">
              <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
                {LEGACY.stats.map((stat, index) => (
                  <StatItem key={stat.label} {...stat} index={index} />
                ))}
              </div>
            </div>

            <div className="mt-12 space-y-1">
              {LEGACY.timeline.map((item, index) => (
                <TimelineItem
                  key={item.year}
                  year={String(item.year)}
                  label={item.label}
                  description={item.description}
                  index={index}
                  isLast={index === LEGACY.timeline.length - 1}
                />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
