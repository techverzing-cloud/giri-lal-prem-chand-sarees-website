export interface ResponsiveImageConfig {
  src: string
  width: number
  height: number
  aspectRatio?: string
  sizes?: string
  srcSet?: string
  webpSrcSet?: string
  placeholder?: string
  priority?: boolean
}

export function optimizeImage(
  src: string,
  width: number,
  height: number,
  options?: { sizes?: string; quality?: number }
): ResponsiveImageConfig {
  const breakpoints = [320, 640, 768, 1024, 1280, 1536]
  const availableWidths = breakpoints.filter((w) => w <= width * 2)

  if (availableWidths.length === 0) {
    availableWidths.push(width)
  }

  const srcSet = availableWidths
    .map((w) => `${src}?w=${w}&q=${options?.quality ?? 80} ${w}w`)
    .join(', ')

  const webpSrcSet = availableWidths
    .map((w) => `${src}?w=${w}&q=${options?.quality ?? 80}&fm=webp ${w}w`)
    .join(', ')

  return {
    src,
    width,
    height,
    aspectRatio: `${width}/${height}`,
    sizes: options?.sizes ?? `(max-width: ${width}px) 100vw, ${width}px`,
    srcSet,
    webpSrcSet,
    placeholder: `/placeholders/image.svg`,
  }
}

export function getImageSizes(breakpoint: 'sm' | 'md' | 'lg' | 'xl' | 'full'): string {
  const sizes: Record<string, string> = {
    sm: '(max-width: 640px) 100vw, 50vw',
    md: '(max-width: 768px) 100vw, 33vw',
    lg: '(max-width: 1024px) 50vw, 25vw',
    xl: '(max-width: 1280px) 33vw, 20vw',
    full: '100vw',
  }
  return sizes[breakpoint]
}

export function shouldPreload(src: string): boolean {
  const preloadable = ['/hero/', '/media/logo.svg']
  return preloadable.some((path) => src.startsWith(path))
}

export function getPlaceholderPath(category: string): string {
  const placeholders: Record<string, string> = {
    product: '/placeholders/product.svg',
    collection: '/placeholders/collection.svg',
    hero: '/placeholders/hero.svg',
    gallery: '/placeholders/gallery.svg',
    testimonial: '/placeholders/testimonial.svg',
    article: '/placeholders/article.svg',
    default: '/placeholders/image.svg',
  }
  return placeholders[category] ?? placeholders.default
}
