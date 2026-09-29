import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { cn } from '@/utils/cn'
import {
  LayoutDashboard,
  FileText,
  Image,
  Menu,
  Search,
  Settings,
  ArrowLeft,
  Layout,
  Globe,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface AdminNavItem {
  label: string
  href: string
  icon: LucideIcon
}

const adminNav: AdminNavItem[] = [
  { label: 'Dashboard', href: '/admin-preview', icon: LayoutDashboard },
  { label: 'Content', href: '/admin-preview/content', icon: FileText },
  { label: 'Media', href: '/admin-preview/media', icon: Image },
  { label: 'Navigation', href: '/admin-preview/navigation', icon: Menu },
  { label: 'SEO', href: '/admin-preview/seo', icon: Search },
  { label: 'Settings', href: '/admin-preview/settings', icon: Settings },
]

interface AdminLayoutProps {
  children: React.ReactNode
  title: string
  description?: string
}

export function AdminLayout({ children, title, description }: AdminLayoutProps) {
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-night/[0.02]">
      <div className="flex">
        <aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col border-r border-night/10 bg-white">
          <div className="flex items-center gap-3 border-b border-night/10 px-6 py-5">
            <img src="/logos/logo_without_back.png" alt="Giri Lal Prem Chand" className="h-7 w-auto" />
            <div>
              <p className="font-heading text-sm font-medium text-night">CMS Preview</p>
              <p className="font-body text-[10px] text-text-muted">v1.0.0</p>
            </div>
          </div>

          <nav className="flex-1 space-y-1 px-3 py-4">
            {adminNav.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 rounded-md px-3 py-2.5 font-body text-sm transition-all',
                    isActive
                      ? 'bg-primary/10 font-medium text-primary'
                      : 'text-night/60 hover:bg-night/5 hover:text-night'
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              )
            })}
          </nav>

          <div className="border-t border-night/10 px-3 py-4">
            <Link
              href="/"
              className="flex items-center gap-2 rounded-md px-3 py-2 font-body text-xs text-night/50 transition-colors hover:bg-night/5 hover:text-night"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to site
            </Link>
          </div>
        </aside>

        <main className="ml-64 flex-1">
          <div className="border-b border-night/10 bg-white px-8 py-6">
            <div className="flex items-center gap-2 text-xs text-text-muted mb-1">
              <Globe className="h-3 w-3" />
              <span>admin-preview</span>
            </div>
            <h1 className="font-heading text-2xl text-night">{title}</h1>
            {description && (
              <p className="mt-1 font-body text-sm text-text-muted">{description}</p>
            )}
          </div>
          <div className="p-8">{children}</div>
        </main>
      </div>
    </div>
  )
}
