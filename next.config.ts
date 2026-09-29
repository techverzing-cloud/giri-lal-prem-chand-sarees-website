import type { NextConfig } from 'next'

/**
 * The site is served as a Next.js App Router application.
 *
 * `public/` keeps the same layout it had under Vite, so every existing asset
 * path (`/collections/...`, `/logos/...`, `/about/...`) resolves unchanged and
 * no image reference in `src/` had to be edited.
 */
const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Keep the admin portal out of search results and out of the sitemap.
  async headers() {
    return [
      {
        source: '/admin/:path*',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
      },
    ]
  },
}

export default nextConfig
