import { cn } from '@/utils/cn'

interface SectionTitleProps {
  title: string
  subtitle?: string
  description?: string
  align?: 'left' | 'center' | 'right'
  className?: string
  light?: boolean
}

export function SectionTitle({
  title,
  subtitle,
  description,
  align = 'center',
  className,
  light = false,
}: SectionTitleProps) {
  return (
    <div
      className={cn(
        'max-w-2xl',
        {
          'mx-auto text-center': align === 'center',
          'text-left': align === 'left',
          'ml-auto text-right': align === 'right',
        },
        className
      )}
    >
      {subtitle && (
        <span
          className={cn(
            'mb-4 block font-body text-xs font-semibold uppercase tracking-[0.25em]',
            light ? 'text-white/70' : 'text-text-muted'
          )}
        >
          {subtitle}
        </span>
      )}
      <h2
        className={cn(
          'font-heading text-4xl font-medium leading-tight md:text-5xl lg:text-6xl',
          light ? 'text-white' : 'text-night'
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            'mt-6 font-body text-base leading-relaxed md:text-lg',
            light ? 'text-white/80' : 'text-text-secondary'
          )}
        >
          {description}
        </p>
      )}
    </div>
  )
}
