import type { ThemeConfig } from '@/types/cms'

export const themeConfig: ThemeConfig = {
  colors: {
    primary: '#8E2D29',
    secondary: '#FFE4D1',
    accent: '#E3A2A0',
    dark: '#344646',
    night: '#111717',
    gold: '#C9A96E',
    text: {
      primary: '#1A1A1A',
      muted: '#6B7280',
      inverse: '#FFFFFF',
    },
    background: {
      primary: '#FFFFFF',
      secondary: '#FFF8F5',
      card: '#FAFAFA',
    },
    border: '#E5E7EB',
    success: '#059669',
    warning: '#D97706',
    error: '#DC2626',
  },
  typography: {
    headingFont: 'Cormorant Garamond',
    bodyFont: 'Manrope',
    baseSize: '16px',
    scale: '1.25',
    headingWeight: '400',
    bodyWeight: '400',
  },
  borderRadius: {
    sm: '0.25rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
    full: '9999px',
  },
  shadows: {
    sm: '0 1px 2px rgba(0,0,0,0.05)',
    md: '0 4px 6px rgba(0,0,0,0.07)',
    lg: '0 10px 25px rgba(0,0,0,0.1)',
    xl: '0 20px 50px rgba(0,0,0,0.15)',
  },
  spacing: {
    section: '6rem',
    container: '1440px',
    gutter: '1.5rem',
  },
  animations: {
    duration: {
      fast: '200ms',
      normal: '400ms',
      slow: '800ms',
    },
    easing: {
      default: 'cubic-bezier(0.4, 0, 0.2, 1)',
      smooth: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
      spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    },
  },
  button: {
    primaryStyle: 'filled',
    borderRadius: '0.125rem',
    paddingX: '2rem',
    paddingY: '0.875rem',
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
}

export function getThemeConfig(): ThemeConfig {
  return themeConfig
}
