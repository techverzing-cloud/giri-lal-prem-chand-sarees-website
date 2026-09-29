import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAdmin } from '@/state/AdminContext'
import { Bell, User, LogOut } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'

export function Topbar() {
  const { currentUser, notifications, unreadNotifications, markAllNotificationsRead } = useAdmin()
  const router = useRouter()
  const [showNotifications, setShowNotifications] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [signingOut, setSigningOut] = useState(false)
  const notifRef = useRef<HTMLDivElement>(null)
  const userRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setShowNotifications(false)
      if (userRef.current && !userRef.current.contains(e.target as Node)) setShowUserMenu(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  async function handleSignOut() {
    setSigningOut(true)
    setShowUserMenu(false)
    try {
      // Clears the httpOnly session cookie. The redirect below is not what
      // secures the panel — the middleware guard is — but it stops the shell
      // from rendering while the cookie is being dropped.
      await fetch('/api/admin/auth', { method: 'DELETE' })
    } finally {
      router.replace('/admin/login')
      router.refresh()
    }
  }

  return (
    <header className="flex h-16 items-center justify-between border-b border-night/10 bg-white px-6 lg:px-8">
      <div className="flex items-center gap-4">
        <h2 className="font-heading text-lg text-night">Welcome back, {currentUser.name.split(' ')[0]}</h2>
      </div>

      <div className="flex items-center gap-3">
        <div ref={notifRef} className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative rounded-lg p-2 text-night/40 transition-colors hover:bg-night/5 hover:text-night"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
            {unreadNotifications > 0 && (
              <span className="absolute right-1.5 top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-error text-[10px] font-bold text-white">
                {unreadNotifications}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 top-full z-50 mt-2 w-80 rounded-lg border border-night/10 bg-white shadow-lg">
              <div className="flex items-center justify-between border-b border-night/10 px-4 py-3">
                <p className="font-body text-sm font-medium text-night">Notifications</p>
                {unreadNotifications > 0 && (
                  <button onClick={markAllNotificationsRead} className="font-body text-xs text-primary hover:underline">
                    Mark all read
                  </button>
                )}
              </div>
              <div className="max-h-80 overflow-y-auto">
                {notifications.length === 0 ? (
                  <p className="px-4 py-8 text-center font-body text-sm text-text-muted">No notifications</p>
                ) : (
                  notifications.map((n) => (
                    <div key={n.id} className={`border-b border-night/5 px-4 py-3 transition-colors hover:bg-night/[0.02] ${!n.read ? 'bg-primary/[0.02]' : ''}`}>
                      <div className="flex items-start gap-2">
                        <div className={`mt-1 h-2 w-2 flex-shrink-0 rounded-full ${n.type === 'error' ? 'bg-error' : n.type === 'warning' ? 'bg-warning' : n.type === 'success' ? 'bg-success' : 'bg-primary'}`} />
                        <div className="flex-1 min-w-0">
                          <p className="font-body text-sm font-medium text-night">{n.title}</p>
                          <p className="font-body text-xs text-text-muted">{n.message}</p>
                          <p className="mt-1 font-body text-[10px] text-text-muted/50">{new Date(n.timestamp).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        <div ref={userRef} className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2 rounded-lg p-1.5 transition-colors hover:bg-night/5"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
              <User className="h-4 w-4 text-primary" />
            </div>
            <span className="hidden font-body text-sm text-night md:inline">{currentUser.name}</span>
          </button>

          {showUserMenu && (
            <div className="absolute right-0 top-full z-50 mt-2 w-48 rounded-lg border border-night/10 bg-white shadow-lg">
              <div className="border-b border-night/10 px-4 py-3">
                <p className="font-body text-sm font-medium text-night">{currentUser.name}</p>
                <p className="font-body text-xs text-text-muted capitalize">{currentUser.role.replace('_', ' ')}</p>
              </div>
              <div className="p-2">
                <Link href="/admin/profile" className="flex items-center gap-2 rounded-md px-3 py-2 font-body text-sm text-night/60 transition-colors hover:bg-night/5 hover:text-night">
                  <User className="h-4 w-4" /> Profile
                </Link>
                <button
                  onClick={handleSignOut}
                  disabled={signingOut}
                  className="flex w-full items-center gap-2 rounded-md px-3 py-2 font-body text-sm text-night/60 transition-colors hover:bg-night/5 hover:text-night disabled:opacity-50"
                >
                  <LogOut className="h-4 w-4" /> {signingOut ? 'Signing out...' : 'Sign Out'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
