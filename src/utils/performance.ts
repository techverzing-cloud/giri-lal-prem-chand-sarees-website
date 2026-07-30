import { lazy } from 'react'

export const ROUTE_PREFETCH_LIST: string[] = [
  '/collections',
  '/collections/sarees',
  '/collections/lehengas',
  '/journal',
  '/about',
  '/contact',
  '/enquiry',
]

export function prefetchRoutes(): void {
  if (typeof window === 'undefined') return

  const link = document.createElement('link')
  link.rel = 'prefetch'
  link.as = 'document'

  ROUTE_PREFETCH_LIST.forEach((route) => {
    const l = link.cloneNode() as HTMLLinkElement
    l.href = route
    document.head.appendChild(l)
  })
}

export function prefetchImage(src: string): void {
  if (typeof window === 'undefined') return
  const link = document.createElement('link')
  link.rel = 'preload'
  link.as = 'image'
  link.href = src
  document.head.appendChild(link)
}

export function prefetchCriticalAssets(): void {
  const criticalImages = [
    '/media/logo.svg',
    '/favicon.svg',
  ]

  criticalImages.forEach(prefetchImage)
}

export function getCacheControl(maxAge: number = 31536000): string {
  return `public, max-age=${maxAge}, immutable`
}

export function getDynamicImportConfig(componentPath: string): {
  load: () => Promise<unknown>
  preload: () => void
} {
  return {
    load: () => import(/* @vite-ignore */ componentPath),
    preload: () => {
      const link = document.createElement('link')
      link.rel = 'modulepreload'
      link.href = componentPath
      document.head.appendChild(link)
    },
  }
}

export function splitChunks(chunks: string[]): void {
  chunks.forEach((chunk) => {
    const link = document.createElement('link')
    link.rel = 'modulepreload'
    link.href = chunk
    document.head.appendChild(link)
  })
}

export const DYNAMIC_IMPORT_OPTIONS = {
  ssr: false,
  loading: undefined,
} as const
