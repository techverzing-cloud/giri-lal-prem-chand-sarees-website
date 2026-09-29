import { Helmet } from 'react-helmet-async'
import { useAdmin } from '@/state/AdminContext'
import { StatsCard } from '@/components/admin/common/StatsCard'
import { RecentActivity } from '@/components/admin/common/RecentActivity'
import { getRecentActivities, getLatestEnquiries } from '@/services/admin/dashboardService'
import { ShoppingBag, Layers, FileText, Image, MessageSquare, TrendingUp, Eye, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { StatusBadge } from '@/components/admin/common/StatusBadge'

export default function AdminDashboardPage() {
  const { dashboardStats, notifications } = useAdmin()
  const activities = getRecentActivities(6)
  const latestEnquiries = getLatestEnquiries(4)

  const statCards = [
    { label: 'Total Products', value: dashboardStats.totalProducts, icon: ShoppingBag, trend: 8.2, trendLabel: 'vs last month', href: '/admin/products' },
    { label: 'Collections', value: dashboardStats.totalCollections, icon: Layers, href: '/admin/collections' },
    { label: 'Articles', value: dashboardStats.totalArticles, icon: FileText, trend: 12.5, trendLabel: 'vs last month', href: '/admin/journal' },
    { label: 'Media Files', value: dashboardStats.totalMedia, icon: Image, href: '/admin/media' },
    { label: 'Enquiries', value: dashboardStats.totalEnquiries, icon: MessageSquare, trend: dashboardStats.newEnquiries, trendLabel: 'new', href: '/admin/enquiries' },
    { label: 'Featured Products', value: dashboardStats.featuredProducts, icon: Eye, href: '/admin/products' },
  ]

  const quickActions = [
    { label: 'Add Product', href: '/admin/products/new', icon: ShoppingBag },
    { label: 'New Collection', href: '/admin/collections/new', icon: Layers },
    { label: 'Write Article', href: '/admin/journal/new', icon: FileText },
    { label: 'View Enquiries', href: '/admin/enquiries', icon: MessageSquare },
  ]

  return (
    <div>
      <Helmet><title>Dashboard — Admin</title></Helmet>

      <div className="mb-8">
        <h1 className="font-heading text-2xl text-night">Dashboard</h1>
        <p className="font-body text-sm text-text-muted">Overview of your store performance</p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {statCards.map((card) => (
          <Link key={card.label} href={card.href}>
            <StatsCard label={card.label} value={card.value} icon={card.icon} trend={card.trend} trendLabel={card.trendLabel} />
          </Link>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="rounded-xl border border-night/10 bg-white p-5">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-heading text-lg text-night">Recent Activity</h2>
              <span className="font-body text-xs text-text-muted">Today</span>
            </div>
            <RecentActivity activities={activities} />
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-xl border border-night/10 bg-white p-5">
            <h2 className="mb-4 font-heading text-lg text-night">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-3">
              {quickActions.map((action) => (
                <Link key={action.label} href={action.href} className="flex flex-col items-center gap-2 rounded-lg border border-night/10 p-4 text-center transition-colors hover:border-primary/30 hover:bg-primary/[0.02]">
                  <action.icon className="h-5 w-5 text-primary/60" />
                  <span className="font-body text-xs font-medium text-night">{action.label}</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-night/10 bg-white p-5">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-heading text-lg text-night">Latest Enquiries</h2>
              <Link href="/admin/enquiries" className="flex items-center gap-1 font-body text-xs text-primary hover:underline">
                View all <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
            <div className="space-y-3">
              {latestEnquiries.map((e) => (
                <div key={e.id} className="flex items-center justify-between rounded-lg border border-night/5 p-3">
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-body text-sm font-medium text-night">{e.customerName}</p>
                    <p className="truncate font-body text-xs text-text-muted">{e.type}</p>
                  </div>
                  <StatusBadge status={e.status as 'new' | 'contacted' | 'qualified' | 'converted' | 'closed'} />
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-night/10 bg-white p-5">
            <h2 className="mb-4 font-heading text-lg text-night">Monthly Growth</h2>
            <div className="flex items-center gap-3">
              <TrendingUp className="h-8 w-8 text-success" />
              <div>
                <p className="font-heading text-3xl text-night">+{dashboardStats.monthlyGrowth}%</p>
                <p className="font-body text-xs text-text-muted">vs previous month</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
