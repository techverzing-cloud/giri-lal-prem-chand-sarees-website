import { siteConfig } from '@/config/site'

export function getShareData(product: { name: string; slug: string }) {
  const url = `${siteConfig.seo.siteUrl}/product/${product.slug}`
  const text = `Discover the exquisite ${product.name} from ${siteConfig.company.name}.`

  return {
    url,
    text,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(`${text} ${url}`)}`,
    facebook: 'https://www.facebook.com/people/Giri-Lal-Prem-Chand-Sarees-Pvt-Ltd/61594655375659/',
    x: 'https://x.com/glpcsarees',
    
    instagram: 'https://www.instagram.com/girilalpremchand/',
    copy: url,
  } as const
}

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    return false
  }
}
