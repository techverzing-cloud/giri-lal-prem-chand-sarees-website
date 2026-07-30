import { useScrollProgress } from '@/hooks/useScrollProgress'
import { cn } from '@/utils/cn'

interface ScrollProgressProps {
  className?: string
}

export function ScrollProgress({ className }: ScrollProgressProps) {
  const progress = useScrollProgress()

  return (
    <div
      className={cn('fixed left-0 top-0 z-[9998] h-[3px] w-full', className)}
      role="progressbar"
      aria-valuenow={Math.round(progress * 100)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Page scroll progress"
    >
      <div
        className="h-full origin-left bg-primary transition-transform duration-150 ease-out"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  )
}
