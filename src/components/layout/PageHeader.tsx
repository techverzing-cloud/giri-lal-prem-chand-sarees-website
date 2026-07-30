import { Container } from '@/components/ui/Container'
import { Breadcrumb } from '@/components/layout/Breadcrumb'
import { cn } from '@/utils/cn'

interface PageHeaderProps {
  title: string
  subtitle?: string
  description?: string
  className?: string
  variant?: 'light' | 'dark'
}

export function PageHeader({
  title,
  subtitle,
  description,
  className,
  variant = 'light',
}: PageHeaderProps) {
  return (
    <section
      className={cn(
        'relative pt-32 pb-16 md:pt-40 md:pb-20 lg:pt-48 lg:pb-24',
        variant === 'dark' ? 'bg-night text-white' : 'bg-cream text-night',
        className
      )}
    >
      <Container>
        <Breadcrumb variant={variant} />
        <div className="mt-8 max-w-3xl">
          {subtitle && (
            <span
              className={cn(
                'mb-4 block font-body text-xs font-semibold uppercase tracking-[0.25em]',
                variant === 'dark' ? 'text-white/50' : 'text-text-muted'
              )}
            >
              {subtitle}
            </span>
          )}
          <h1 className="font-heading text-5xl font-medium leading-tight md:text-6xl lg:text-7xl">
            {title}
          </h1>
          {description && (
            <p
              className={cn(
                'mt-6 max-w-2xl font-body text-base leading-relaxed md:text-lg',
                variant === 'dark' ? 'text-white/70' : 'text-text-secondary'
              )}
            >
              {description}
            </p>
          )}
        </div>
      </Container>
    </section>
  )
}
