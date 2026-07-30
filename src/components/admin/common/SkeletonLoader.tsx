import { cn } from '@/utils/cn'

interface SkeletonLoaderProps {
  rows?: number
  className?: string
  variant?: 'pulse' | 'shimmer'
}

export function SkeletonLoader({ rows = 5, className, variant = 'pulse' }: SkeletonLoaderProps) {
  const animationClass = variant === 'shimmer'
    ? 'relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent'
    : 'animate-pulse'

  return (
    <div className={cn('space-y-4', className)}>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className={cn('flex items-center gap-4', animationClass)}>
          <div className={cn('h-10 w-10 flex-shrink-0 rounded-lg bg-night/10', variant === 'pulse' && 'animate-pulse')} />
          <div className="flex-1 space-y-2">
            <div className={cn('h-3 w-3/4 rounded bg-night/10')} />
            <div className={cn('h-3 w-1/2 rounded bg-night/5')} />
          </div>
          <div className={cn('h-6 w-20 rounded-full bg-night/10')} />
        </div>
      ))}
    </div>
  )
}
