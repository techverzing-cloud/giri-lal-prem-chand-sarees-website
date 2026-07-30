import { Container } from '@/components/ui/Container'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { ScrollReveal } from '@/components/animations/ScrollReveal'
import { WHY_CHOOSE_US } from '@/constants/home'

const icons: Record<string, React.ReactNode> = {
  history: (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-8">
      <circle cx="20" cy="20" r="16" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <path d="M20 12V20L26 26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="20" cy="20" r="3" fill="currentColor" opacity="0.2" />
    </svg>
  ),
  quality: (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-8">
      <path d="M20 4L24 14L34 14L26 20L29 30L20 24L11 30L14 20L6 14L16 14L20 4Z" stroke="currentColor" strokeWidth="1.5" fill="none" />
    </svg>
  ),
  curated: (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-8">
      <rect x="4" y="8" width="32" height="24" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <path d="M4 16H36" stroke="currentColor" strokeWidth="1" opacity="0.3" />
      <circle cx="20" cy="24" r="3" stroke="currentColor" strokeWidth="1" fill="none" />
      <path d="M20 21V27" stroke="currentColor" strokeWidth="0.8" opacity="0.3" />
      <path d="M17 24H23" stroke="currentColor" strokeWidth="0.8" opacity="0.3" />
    </svg>
  ),
  shipping: (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-8">
      <circle cx="12" cy="30" r="4" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <circle cx="30" cy="30" r="4" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <path d="M16 30H24" stroke="currentColor" strokeWidth="1.5" />
      <path d="M4 10H24L28 18H34L36 24H24" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <path d="M4 14V10H2" stroke="currentColor" strokeWidth="1" opacity="0.5" />
    </svg>
  ),
  trust: (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-8">
      <path d="M20 4L24 14H34L26 20L30 30L20 24L10 30L14 20L6 14H16L20 4Z" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <circle cx="20" cy="18" r="2" fill="currentColor" opacity="0.2" />
    </svg>
  ),
  experience: (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-8">
      <circle cx="20" cy="20" r="16" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <circle cx="20" cy="16" r="4" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <path d="M12 32C12 27 16 24 20 24C24 24 28 27 28 32" stroke="currentColor" strokeWidth="1.5" fill="none" />
    </svg>
  ),
}

export function WhyChooseUs() {
  return (
    <section className="bg-surface py-section lg:py-section-lg">
      <Container>
        <ScrollReveal>
          <SectionTitle
            title="Why Choose Us"
            subtitle="The GLPC Difference"
            description="Decades of trust, uncompromising quality, and a passion for preserving India's textile heritage."
          />
        </ScrollReveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {WHY_CHOOSE_US.map((item, index) => (
            <ScrollReveal
              key={item.id}
              direction="up"
              duration={0.5}
              delay={index * 0.08}
              className="group rounded-lg border border-night/5 bg-white p-8 transition-all duration-500 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="text-primary/40 transition-colors duration-500 group-hover:text-primary">
                {icons[item.icon]}
              </div>
              <h3 className="mt-5 font-heading text-xl text-night">{item.title}</h3>
              <p className="mt-2 font-body text-sm leading-relaxed text-text-secondary">
                {item.description}
              </p>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
