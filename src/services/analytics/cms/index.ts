export interface AnalyticsProvider {
  name: string
  id: string
  enabled: boolean
  init: () => void
  trackPageView: (path: string, title: string) => void
  trackEvent: (category: string, action: string, label?: string, value?: number) => void
  trackConversion: (label: string, value?: number) => void
}

export interface CMSAnalyticsConfig {
  googleAnalytics4?: { measurementId: string; enabled: boolean }
  googleTagManager?: { containerId: string; enabled: boolean }
  metaPixel?: { pixelId: string; enabled: boolean }
  clarity?: { projectId: string; enabled: boolean }
  pinterestPixel?: { pixelId: string; enabled: boolean }
}

export const analyticsProviders: AnalyticsProvider[] = []

export function registerAnalyticsProvider(provider: AnalyticsProvider): void {
  analyticsProviders.push(provider)
}

export function initAnalytics(): void {
  analyticsProviders.filter((p) => p.enabled).forEach((p) => p.init())
}

export function trackPageView(path: string, title: string): void {
  analyticsProviders.filter((p) => p.enabled).forEach((p) => p.trackPageView(path, title))
}

export function trackEvent(category: string, action: string, label?: string, value?: number): void {
  analyticsProviders.filter((p) => p.enabled).forEach((p) => p.trackEvent(category, action, label, value))
}

export function trackConversion(label: string, value?: number): void {
  analyticsProviders.filter((p) => p.enabled).forEach((p) => p.trackConversion(label, value))
}
