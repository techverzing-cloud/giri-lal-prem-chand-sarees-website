import { motion } from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { FABRICS } from '@/constants/home'

const icons: Record<string, React.ReactNode> = {
  silk: (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-10">
      <path d="M24 4L4 24L24 44L44 24L24 4Z" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <path d="M24 4L24 44" stroke="currentColor" strokeWidth="1" opacity="0.3" />
      <path d="M4 24H44" stroke="currentColor" strokeWidth="1" opacity="0.3" />
      <path d="M14 14L34 34" stroke="currentColor" strokeWidth="0.8" opacity="0.2" />
      <path d="M34 14L14 34" stroke="currentColor" strokeWidth="0.8" opacity="0.2" />
    </svg>
  ),
  cotton: (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-10">
      <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <circle cx="24" cy="24" r="10" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.5" />
      <circle cx="24" cy="24" r="3" fill="currentColor" opacity="0.3" />
      <path d="M24 4V24" stroke="currentColor" strokeWidth="0.8" opacity="0.2" />
      <path d="M24 24L44 24" stroke="currentColor" strokeWidth="0.8" opacity="0.2" />
    </svg>
  ),
  banarasi: (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-10">
      <path d="M8 8L40 40" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 40L40 8" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 24H40" stroke="currentColor" strokeWidth="0.8" opacity="0.3" />
      <path d="M24 8V40" stroke="currentColor" strokeWidth="0.8" opacity="0.3" />
      <circle cx="24" cy="24" r="4" fill="currentColor" opacity="0.2" />
    </svg>
  ),
  handloom: (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-10">
      <rect x="8" y="8" width="32" height="32" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <line x1="8" y1="16" x2="40" y2="16" stroke="currentColor" strokeWidth="0.8" opacity="0.3" />
      <line x1="8" y1="24" x2="40" y2="24" stroke="currentColor" strokeWidth="0.8" opacity="0.3" />
      <line x1="8" y1="32" x2="40" y2="32" stroke="currentColor" strokeWidth="0.8" opacity="0.3" />
      <line x1="16" y1="8" x2="16" y2="40" stroke="currentColor" strokeWidth="0.8" opacity="0.3" />
      <line x1="24" y1="8" x2="24" y2="40" stroke="currentColor" strokeWidth="0.8" opacity="0.3" />
      <line x1="32" y1="8" x2="32" y2="40" stroke="currentColor" strokeWidth="0.8" opacity="0.3" />
    </svg>
  ),
  embroidery: (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-10">
      <circle cx="24" cy="24" r="16" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <circle cx="24" cy="24" r="8" stroke="currentColor" strokeWidth="0.8" fill="none" opacity="0.5" />
      <path d="M24 8C24 8 20 16 24 24C28 32 24 40 24 40" stroke="currentColor" strokeWidth="0.8" opacity="0.4" />
      <path d="M8 24C8 24 16 20 24 24C32 28 40 24 40 24" stroke="currentColor" strokeWidth="0.8" opacity="0.4" />
      <circle cx="24" cy="24" r="2" fill="currentColor" opacity="0.3" />
    </svg>
  ),
  weaving: (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-10">
      <path d="M6 6L42 42" stroke="currentColor" strokeWidth="1.5" />
      <path d="M42 6L6 42" stroke="currentColor" strokeWidth="1.5" />
      <line x1="18" y1="6" x2="18" y2="42" stroke="currentColor" strokeWidth="0.8" opacity="0.3" />
      <line x1="30" y1="6" x2="30" y2="42" stroke="currentColor" strokeWidth="0.8" opacity="0.3" />
      <line x1="6" y1="18" x2="42" y2="18" stroke="currentColor" strokeWidth="0.8" opacity="0.3" />
      <line x1="6" y1="30" x2="42" y2="30" stroke="currentColor" strokeWidth="0.8" opacity="0.3" />
    </svg>
  ),
}

export function FabricSection() {
  return (
    <section className="bg-surface py-section lg:py-section-lg">
      <Container>
        <SectionTitle
          title="Our Fabrics"
          subtitle="A Tapestry of Tradition and Innovation"
          description="Every thread tells a story of tradition, skill, and uncompromising quality."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {FABRICS.map((fabric, index) => (
            <motion.div
              key={fabric.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group rounded-lg border border-night/5 bg-white p-8 transition-all duration-500 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="text-primary/50 transition-colors duration-500 group-hover:text-primary">
                {icons[fabric.icon]}
              </div>
              <h3 className="mt-6 font-heading text-xl text-night">{fabric.label}</h3>
              <p className="mt-3 font-body text-sm leading-relaxed text-text-secondary">
                {fabric.description}
              </p>
              <div className="mt-6 h-px w-8 bg-primary/20 transition-all duration-500 group-hover:w-12 group-hover:bg-primary/50" />
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}
