import { siteSettings } from '@/data/siteSettings'
import { featureFlags } from '@/data/featureFlags'

export const adminSettings = {
  company: {
    name: siteSettings.companyName,
    tagline: siteSettings.tagline,
    description: siteSettings.description,
    logo: siteSettings.logo,
    favicon: siteSettings.favicon,
    faviconApple: siteSettings.faviconApple,
  },
  contact: {
    address: siteSettings.address,
    phone: siteSettings.phone,
    whatsapp: siteSettings.whatsapp,
    email: siteSettings.email,
    businessHours: siteSettings.businessHours,
    googleMapsUrl: siteSettings.googleMapsUrl,
  },
  social: siteSettings.socialLinks,
  branding: {
    primaryColor: siteSettings.theme.primaryColor,
    secondaryColor: siteSettings.theme.secondaryColor,
    accentColor: siteSettings.theme.accentColor,
    fontHeading: siteSettings.theme.fontHeading,
    fontBody: siteSettings.theme.fontBody,
  },
  featureFlags: featureFlags.map((f) => ({
    id: f.id,
    key: f.key,
    label: f.label,
    enabled: f.enabled,
    category: f.category,
  })),
  analytics: siteSettings.analytics,
}

export function getAdminSettings() {
  return adminSettings
}
