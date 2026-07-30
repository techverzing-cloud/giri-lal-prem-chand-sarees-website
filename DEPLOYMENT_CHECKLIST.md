# Deployment Checklist — Giri Lal Prem Chand Sarees

## Pre-Deployment

### Environment Variables
- [ ] Set `VITE_EMAILJS_SERVICE_ID` in production
- [ ] Set `VITE_EMAILJS_TEMPLATE_ID` in production
- [ ] Set `VITE_EMAILJS_PUBLIC_KEY` in production
- [ ] Verify `.env` is NOT committed to version control
- [ ] Create `.env.production` for production values

### Domain & SSL
- [ ] Configure custom domain (e.g., `girilalpremchand.com`)
- [ ] Enable SSL/HTTPS (Cloudflare, Let's Encrypt, or hosting provider)
- [ ] Set up www redirect (www → non-www or vice versa)
- [ ] Configure DNS records (A, CNAME, TXT)

### Build
- [ ] Run `npm run build` — verify zero errors
- [ ] Verify `dist/` output contains: `index.html`, `assets/`, `robots.txt`, `sitemap.xml`
- [ ] Verify asset hashes are present for cache busting
- [ ] Check bundle size: vendor chunk < 250KB gzip
- [ ] Verify sourcemaps are disabled in production

### SEO
- [ ] Submit `sitemap.xml` to Google Search Console
- [ ] Submit `sitemap.xml` to Bing Webmaster Tools
- [ ] Verify `robots.txt` is accessible at `/robots.txt`
- [ ] Verify `sitemap.xml` is accessible at `/sitemap.xml`
- [ ] Set canonical domain in Google Search Console
- [ ] Verify meta tags render correctly (OG, Twitter, description)
- [ ] Verify structured data validates with Google Rich Results Test

### Performance
- [ ] Lighthouse performance score ≥ 90
- [ ] Verify image optimization (WebP, responsive, lazy loading)
- [ ] Verify font loading (preconnect, display: swap)
- [ ] Test with Slow 3G throttling
- [ ] Verify Core Web Vitals (LCP < 2.5s, FID < 100ms, CLS < 0.1)

## Post-Deployment

### Verification
- [ ] Visit all pages: Home, About, Collections, Product Detail, Enquiry, Contact, Journal
- [ ] Verify admin portal at `/admin`
- [ ] Test enquiry form submission
- [ ] Test consultation booking flow
- [ ] Verify WhatsApp button opens correct number
- [ ] Verify Back to Top button works
- [ ] Test 404 page (visit `/nonexistent-page`)
- [ ] Test 500 page (visit `/500`)
- [ ] Test offline page (visit `/offline`)
- [ ] Verify mobile navigation menu
- [ ] Verify search functionality
- [ ] Test all filter/sort combinations on collection pages

### Analytics
- [ ] Set `googleAnalyticsId` in siteSettings for GA4
- [ ] Set `googleTagManagerId` for GTM if used
- [ ] Set `metaPixelId` for Meta Pixel if used
- [ ] Set `clarityId` for Microsoft Clarity if used
- [ ] Verify pageview events fire on all routes
- [ ] Verify enquiry submission events fire
- [ ] Verify WhatsApp click events fire

### Email
- [ ] Verify EmailJS service ID is correct
- [ ] Verify EmailJS template ID is correct
- [ ] Test email delivery for all enquiry types
- [ ] Verify email templates render correctly

### Monitoring
- [ ] Set up uptime monitoring (e.g., UptimeRobot, Pingdom)
- [ ] Set up error tracking (e.g., Sentry)
- [ ] Configure CDN caching rules
- [ ] Set up automatic backup of static assets

## Rollback Plan
- Previous build is available in `dist/` backup
- Vercel/Netlify: use instant rollback in dashboard
- CDN: purge cache and redeploy previous build

## Maintenance
- Weekly: Check for dependency updates (`npm outdated`)
- Monthly: Review analytics and performance
- Quarterly: Update content and SEO metadata
- Annually: Renew SSL certificate, review domain expiry
