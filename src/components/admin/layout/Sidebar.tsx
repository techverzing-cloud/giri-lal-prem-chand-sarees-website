import { NavLink } from '@/components/ui/NavLink'
import { cn } from '@/utils/cn'
import { useAdmin } from '@/state/AdminContext'
import {
  LayoutDashboard,
  ShoppingBag,
  Layers,
  Home,
  FileText,
  Image,
  MessageSquare,
  Search,
  Menu,
  Settings,
  Users,
  ChevronLeft,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface NavItem {
  label: string
  href: string
  icon: LucideIcon
  badge?: number
}

const navItems: NavItem[] = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Products', href: '/admin/products', icon: ShoppingBag },
  { label: 'Collections', href: '/admin/collections', icon: Layers },
  { label: 'Homepage', href: '/admin/homepage', icon: Home },
  { label: 'About', href: '/admin/about', icon: FileText },
  { label: 'Journal', href: '/admin/journal', icon: FileText },
  { label: 'Media', href: '/admin/media', icon: Image },
  { label: 'Enquiries', href: '/admin/enquiries', icon: MessageSquare },
  { label: 'SEO', href: '/admin/seo', icon: Search },
  { label: 'Navigation', href: '/admin/navigation', icon: Menu },
  { label: 'Settings', href: '/admin/settings', icon: Settings },
  { label: 'Users', href: '/admin/users', icon: Users },
]

export function Sidebar() {
  const { sidebarOpen, toggleSidebar, unreadNotifications } = useAdmin()

  return (
    <aside
      className={cn(
        'flex flex-col border-r border-night/10 bg-white transition-all duration-300',
        sidebarOpen ? 'w-64' : 'w-16'
      )}
    >
      <div className={cn('flex h-16 items-center border-b border-night/10 px-4', sidebarOpen ? 'justify-between' : 'justify-center')}>
        {sidebarOpen && (
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <span className="font-heading text-sm font-bold text-white">G</span>
            </div>
            <div>
              <p className="font-heading text-sm font-medium text-night">Admin</p>
              <p className="font-body text-[10px] text-text-muted">CMS v2.0</p>
            </div>
          </div>
        )}
        <button
          onClick={toggleSidebar}
          className={cn(
            'rounded-lg p-1.5 text-night/40 transition-colors hover:bg-night/5 hover:text-night',
            !sidebarOpen && 'mx-auto'
          )}
          aria-label={sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
        >
          <ChevronLeft className={cn('h-4 w-4 transition-transform', !sidebarOpen && 'rotate-180')} />
        </button>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        {navItems.map((item) => (
          <NavLink
            key={item.href}
            href={item.href}
            end={item.href === '/admin'}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 font-body text-sm transition-all',
                isActive
                  ? 'bg-primary/10 font-medium text-primary'
                  : 'text-night/60 hover:bg-night/5 hover:text-night',
                !sidebarOpen && 'justify-center px-2'
              )
            }
            title={!sidebarOpen ? item.label : undefined}
          >
            <item.icon className="h-4 w-4 flex-shrink-0" />
            {sidebarOpen && (
              <>
                <span className="flex-1">{item.label}</span>
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 font-body text-[10px] font-medium text-primary">
                    {item.badge}
                  </span>
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-night/10 px-3 py-4">
        <NavLink
          href="/"
          className={cn(
            'flex items-center gap-3 rounded-lg px-3 py-2 font-body text-xs text-night/50 transition-colors hover:bg-night/5 hover:text-night',
            !sidebarOpen && 'justify-center'
          )}
        >
          <ChevronLeft className="h-3.5 w-3.5" />
          {sidebarOpen && <span>Back to site</span>}
        </NavLink>
      </div>
    </aside>
  )
}
