import { siteConfig } from '@/config/site'

export function getImagePath(path: string): string {
  return path.startsWith('/') ? path : `/${path}`
}

export function getWhatsAppUrl(message?: string): string {
  const phone = siteConfig.contact.whatsapp.replace(/[^0-9]/g, '')
  const text = message ? encodeURIComponent(message) : ''
  return `https://wa.me/${phone}${text ? `?text=${text}` : ''}`
}

export function formatPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/[^0-9+]/g, '')
  return cleaned
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength).trimEnd() + '…'
}

export function getBrandFromPath(pathname: string): 'girilal' | 'arunima' | null {
  if (pathname.includes('sarees')) return 'girilal'
  if (pathname.includes('lehengas')) return 'arunima'
  return null
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

export function generateMetaTitle(title: string): string {
  return `${title} | ${siteConfig.company.name}`
}
