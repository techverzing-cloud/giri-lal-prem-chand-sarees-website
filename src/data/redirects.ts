import type { Redirect } from '@/types/cms'

export const redirects: Redirect[] = [
  {
    id: 'red-1',
    from: '/old-home',
    to: '/',
    statusCode: 301,
    visible: true,
    description: 'Old homepage redirect',
  },
  {
    id: 'red-2',
    from: '/gallery',
    to: '/about#gallery',
    statusCode: 301,
    visible: true,
    description: 'Gallery moved to about page',
  },
  {
    id: 'red-3',
    from: '/legacy',
    to: '/our-story',
    statusCode: 301,
    visible: true,
    description: 'Legacy page merged into our story',
  },
  {
    id: 'red-4',
    from: '/products',
    to: '/collections',
    statusCode: 301,
    visible: true,
    description: 'Products page renamed to collections',
  },
  {
    id: 'red-5',
    from: '/outdated-promo',
    to: '',
    statusCode: 410,
    visible: false,
    description: 'Old promotional page removed',
  },
  {
    id: 'red-6',
    from: '/temporary-offer',
    to: '/collections',
    statusCode: 302,
    visible: true,
    description: 'Temporary seasonal offer redirect',
  },
]

export function getRedirects(): Redirect[] {
  return redirects
}

export function getRedirectByFrom(from: string): Redirect | undefined {
  return redirects.find((r) => r.from === from)
}
