import Link from 'next/link'
import { MessageCircle, ArrowRight } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { LuxuryButton } from '@/components/ui/LuxuryButton'
import { ScrollReveal } from '@/components/animations/ScrollReveal'
import { CTA } from '@/constants/home'
import { siteConfig } from '@/config/site'
import { getWhatsAppUrl } from '@/utils/helpers'

export function CTASection() {
  const whatsappUrl = getWhatsAppUrl(
    `Hi! I'm interested in learning more about ${siteConfig.company.name}.`
  )

  return (
    <section className="relative overflow-hidden bg-night py-section lg:py-section-xl">
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.05\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
        }}
      />

      <Container className="relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <ScrollReveal direction="up" distance={30} duration={0.8}>
            <h2 className="font-heading text-4xl font-medium leading-tight text-white md:text-5xl lg:text-6xl">
              {CTA.headline}
            </h2>
          </ScrollReveal>

          <ScrollReveal direction="up" distance={20} duration={0.8} delay={0.2}>
            <p className="mt-6 font-body text-base leading-relaxed text-white/70 md:text-lg">
              {CTA.subtext}
            </p>
          </ScrollReveal>

          <ScrollReveal direction="up" distance={20} duration={0.8} delay={0.4}>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <LuxuryButton variant="primary" size="lg" icon={<MessageCircle className="size-4" />}>
                  WhatsApp Us
                </LuxuryButton>
              </a>
              <Link href="/contact">
                <LuxuryButton variant="outlineLight" size="lg" icon={<ArrowRight className="size-4" />} iconPosition="right">
                  Contact Us
                </LuxuryButton>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  )
}
