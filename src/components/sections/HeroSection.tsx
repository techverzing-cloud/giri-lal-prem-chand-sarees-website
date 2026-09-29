import { useRef } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { LuxuryButton } from '@/components/ui/LuxuryButton'
import { ScrollReveal } from '@/components/animations/ScrollReveal'
import { HERO } from '@/constants/home'
import { cn } from '@/utils/cn'

export function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '15%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3])

  function scrollDown() {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth',
    })
  }

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-dvh items-center justify-center overflow-hidden bg-night"
      aria-label="Hero"
    >
      <motion.div style={{ y: backgroundY }} className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster={HERO.media.image}
          className="absolute inset-0 h-full w-full object-cover opacity-60"
          onError={(e) => {
            const target = e.currentTarget
            target.style.display = 'none'
            const fallbackImg = target.nextElementSibling
            if (fallbackImg instanceof HTMLImageElement) {
              fallbackImg.style.display = 'block'
            }
          }}
        >
          <source src={HERO.media.video} type="video/mp4" />
        </video>
        <img
          src="hero/hero_back.png"
          alt=""
          className="absolute inset-0 hidden h-full w-full object-cover opacity-60"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-night/50 via-night/30 to-night" />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.08\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          }}
        />
      </motion.div>

      <motion.div
        style={{ y: contentY, opacity }}
        className="relative z-10 w-full"
      >
        <Container className="text-center">
          <ScrollReveal direction="up" distance={40} delay={0.3} duration={1.2}>
            <div className="mx-auto mb-6 h-px w-16 bg-white/30" />
            <h1 className="font-heading text-4xl font-medium leading-tight text-white md:text-6xl lg:text-7xl xl:text-9xl">
              {HERO.headline}
            </h1>
          </ScrollReveal>

          <ScrollReveal direction="up" distance={30} delay={0.7} duration={0.8}>
            <p className="mx-auto mt-6 max-w-2xl font-body text-sm leading-relaxed text-white/70 md:text-base lg:text-lg">
              {HERO.subheading}
            </p>
          </ScrollReveal>

          <ScrollReveal direction="up" distance={20} delay={1.1} duration={0.8}>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              {HERO.cta.map((btn) => (
                <Link key={btn.label} href={btn.href}>
                  <LuxuryButton variant={btn.variant} size="lg">
                    {btn.label}
                  </LuxuryButton>
                </Link>
              ))}
            </div>
          </ScrollReveal>
        </Container>
      </motion.div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        onClick={scrollDown}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-white/50 transition-colors hover:text-white"
        aria-label="Scroll down"
      >
        <span className="font-body text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="size-4" />
        </motion.div>
      </motion.button>

      <div className="absolute bottom-8 left-8 z-10 hidden md:block">
        <span className="block font-body text-[10px] uppercase tracking-[0.3em] text-white/30">
          Since 1946
        </span>
      </div>
    </section>
  )
}
