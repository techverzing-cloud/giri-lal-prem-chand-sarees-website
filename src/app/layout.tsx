import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, Manrope } from 'next/font/google'
import '@/styles/globals.css'

/**
 * Self-hosted via next/font. Previously these were requested at runtime from
 * Google Fonts by a <link> tag in index.html. next/font downloads them at build
 * time, which removes the third-party request and the layout shift, while
 * exposing the same families through the same `font-heading` / `font-body`
 * utilities used across every component.
 */
const headingFont = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--glpc-font-heading',
  display: 'swap',
  fallback: ['Georgia', 'Times New Roman', 'serif'],
})

const bodyFont = Manrope({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800'],
  variable: '--glpc-font-body',
  display: 'swap',
  fallback: ['system-ui', 'sans-serif'],
})

const SITE_URL = 'https://girilalpremchand.com'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Giri Lal Prem Chand Sarees',
    template: '%s | Giri Lal Prem Chand Sarees',
  },
  description:
    'Discover exquisite luxury sarees from Giri Lal Prem Chand Sarees (Since 1946) and designer lehengas from Arunima Fashions. Premium Indian textiles crafted for timeless elegance.',
  applicationName: 'Giri Lal Prem Chand Sarees',
  icons: {
    icon: [
      { url: '/favicon/favicon.ico', sizes: '48x48' },
      { url: '/favicon/favicon-16x16.png', sizes: '16x16' },
      { url: '/favicon/favicon-32x32.png', sizes: '32x32' },
    ],
    apple: '/favicon/apple-touch-icon.png',
  },
  manifest: '/favicon/site.webmanifest',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: 'Giri Lal Prem Chand Sarees',
    locale: 'en_IN',
    url: SITE_URL,
    title: 'Giri Lal Prem Chand Sarees | Luxury Sarees & Designer Lehengas Since 1946',
    description:
      'Discover exquisite luxury sarees from Giri Lal Prem Chand Sarees (Since 1946) and designer lehengas from Arunima Fashions.',
    images: [
      {
        // NOTE: this file is not present in public/. Supply it before launch or
        // every link preview renders without an image. See docs/EMAIL_SERVICE.md
        // and the asset documentation.
        url: '/social/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Giri Lal Prem Chand Sarees',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Giri Lal Prem Chand Sarees | Luxury Sarees & Designer Lehengas Since 1946',
    description:
      'Discover exquisite luxury sarees from Giri Lal Prem Chand Sarees (Since 1946) and designer lehengas from Arunima Fashions.',
    images: ['/social/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#111717',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${headingFont.variable} ${bodyFont.variable}`}>
      <body>{children}</body>
    </html>
  )
}
