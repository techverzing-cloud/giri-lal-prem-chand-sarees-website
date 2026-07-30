import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Container } from '@/components/ui/Container'

interface CollectionBannerProps {
  title: string
  subtitle?: string
  description?: string
  backgroundGradient?: string
}

export function CollectionBanner({
  title,
  subtitle,
  description,
  backgroundGradient = 'from-night via-night/95 to-night',
}: CollectionBannerProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '40%'])
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.2])

  return (
    <section ref={ref} className="relative min-h-[50vh] overflow-hidden md:min-h-[60vh]">
      <motion.div style={{ y: bgY }} className="absolute inset-0">
        <div className={`h-full w-full bg-gradient-to-br ${backgroundGradient}`}>
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.05\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
            }}
          />
        </div>
      </motion.div>

      <motion.div
        style={{ y: contentY, opacity }}
        className="relative z-10 flex min-h-[50vh] items-center md:min-h-[60vh]"
      >
        <Container>
          <div className="max-w-3xl">
            {subtitle && (
              <span className="mb-4 block font-body text-xs font-semibold uppercase tracking-[0.25em] text-white/50">
                {subtitle}
              </span>
            )}
            <h1 className="font-heading text-5xl font-medium leading-tight text-white md:text-6xl lg:text-7xl">
              {title}
            </h1>
            {description && (
              <p className="mt-6 max-w-2xl font-body text-base leading-relaxed text-white/70 md:text-lg">
                {description}
              </p>
            )}
          </div>
        </Container>
      </motion.div>
    </section>
  )
}
