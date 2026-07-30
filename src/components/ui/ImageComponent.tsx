import { useState } from 'react'
import { cn } from '@/utils/cn'

interface ImageComponentProps {
  src: string
  alt: string
  className?: string
  wrapperClassName?: string
  width?: number
  height?: number
  priority?: boolean
  objectFit?: 'cover' | 'contain' | 'fill'
}

export function ImageComponent({
  src,
  alt,
  className,
  wrapperClassName,
  width,
  height,
  priority = false,
  objectFit = 'cover',
}: ImageComponentProps) {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)

  const imgAlt = alt || 'Decorative image'
  const imgTitle = alt || undefined

  return (
    <div
      className={cn('relative overflow-hidden bg-night/5', wrapperClassName)}
      style={{ aspectRatio: width && height ? `${width}/${height}` : undefined }}
      role="img"
      aria-label={imgAlt}
    >
      {!loaded && !error && (
        <div className="absolute inset-0 animate-pulse bg-night/10" />
      )}
      {error ? (
        <div className="absolute inset-0 flex items-center justify-center bg-night/5 text-text-muted">
          <span className="text-sm">Image unavailable</span>
        </div>
      ) : (
        <img
          src={src}
          alt={imgAlt}
          title={imgTitle}
          width={width}
          height={height}
          loading={priority ? 'eager' : 'lazy'}
          fetchpriority={priority ? 'high' : undefined}
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          className={cn(
            'h-full w-full transition-all duration-700',
            loaded ? 'opacity-100 blur-0' : 'opacity-0 blur-sm',
            {
              'object-cover': objectFit === 'cover',
              'object-contain': objectFit === 'contain',
              'object-fill': objectFit === 'fill',
            },
            className
          )}
        />
      )}
    </div>
  )
}
