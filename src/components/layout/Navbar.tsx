import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown } from 'lucide-react'
import { cn } from '@/utils/cn'
import { Container } from '@/components/ui/Container'
import { NAV_ITEMS } from '@/constants'
import { siteConfig } from '@/config/site'
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeMega, setActiveMega] = useState<string | null>(null)
  const pathname = usePathname()

  const isHome = pathname === '/'
  const isTransparent = isHome && !scrolled

  useLockBodyScroll(mobileOpen)

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setActiveMega(null)
  }, [pathname])

  function handleMegaKeyDown(e: React.KeyboardEvent, label: string) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      setActiveMega(activeMega === label ? null : label)
    }
    if (e.key === 'Escape') {
      setActiveMega(null)
    }
  }

  return (
    <header
      className={cn(
        'fixed left-0 right-0 top-0 z-[999] transition-all duration-700',
        isTransparent
          ? 'bg-transparent'
          : 'border-b border-white/10 bg-white/80 shadow-lg shadow-night/5 backdrop-blur-xl'
      )}
    >
      <Container>
        <nav className="flex h-20 items-center justify-between md:h-24" role="navigation" aria-label="Main navigation">
          <Link
            href="/"
            className="relative z-10"
            aria-label={`${siteConfig.company.name} - Home`}
          >
            <img
              src="/logos/landscape_logo_without_back.png"
              alt={`${siteConfig.company.name} - Home`}
              className="h-16 w-auto object-contain  md:h-24"
            />
          </Link>

          <div className="hidden items-center gap-1 lg:flex">
            {NAV_ITEMS.map((item) => (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => item.children && setActiveMega(item.label)}
                onMouseLeave={() => setActiveMega(null)}
              >
                <Link
                  href={item.href}
                  className={cn(
                    'group relative px-4 py-2 font-body text-sm font-medium uppercase tracking-[0.15em] transition-colors duration-300',
                    isTransparent ? 'text-white/80 hover:text-white' : 'text-night/70 hover:text-night'
                  )}
                  onKeyDown={(e) => handleMegaKeyDown(e, item.label)}
                  aria-expanded={item.children ? activeMega === item.label : undefined}
                  aria-haspopup={item.children ? 'menu' : undefined}
                >
                  {item.label}
                  {item.children && (
                    <ChevronDown className="ml-1 inline-block size-3 transition-transform duration-300 group-hover:rotate-180" />
                  )}
                  <span
                    className={cn(
                      'absolute -bottom-1 left-4 h-px w-0 bg-primary transition-all duration-500',
                      pathname === item.href && 'w-8'
                    )}
                  />
                </Link>

                {item.children && activeMega === item.label && (
                  <div
                    className="absolute left-0 top-full pt-2"
                    role="menu"
                    aria-label={`${item.label} submenu`}
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                      className="min-w-[280px] rounded-lg bg-white p-4 shadow-xl shadow-night/10 ring-1 ring-night/5"
                    >
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="group flex items-center gap-3 rounded-md px-4 py-3 transition-colors duration-300 hover:bg-secondary"
                          role="menuitem"
                        >
                          <div>
                            <span className="block font-body text-sm font-medium text-night">
                              {child.label}
                            </span>
                            {child.brand && (
                              <span className="mt-0.5 block font-body text-[11px] uppercase tracking-wider text-text-muted">
                                {child.brand === 'girilal' ? 'Since 1946' : 'Designer Label'}
                              </span>
                            )}
                          </div>
                        </Link>
                      ))}
                    </motion.div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="hidden items-center gap-4 lg:flex">
            <Link
              href="/contact"
              className={cn(
                'font-body text-xs font-semibold uppercase tracking-[0.2em] transition-colors duration-300',
                isTransparent ? 'text-white/80 hover:text-white' : 'text-night/70 hover:text-night'
              )}
            >
              Enquire
            </Link>
            <Link
              href="/contact"
              className={cn(
                'font-body text-xs font-semibold uppercase tracking-[0.2em] border px-6 py-2.5 transition-all duration-300',
                isTransparent
                  ? 'border-white/30 text-white hover:bg-white hover:text-night'
                  : 'border-night/20 text-night hover:bg-night hover:text-white'
              )}
            >
              Get in Touch
            </Link>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={cn(
              'relative z-10 lg:hidden',
              isTransparent ? 'text-white' : 'text-night'
            )}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            {mobileOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </nav>
      </Container>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed inset-0 top-0 z-[998] flex flex-col overflow-y-auto bg-night px-6 pb-8 pt-24"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation menu"
          >
            <nav className="flex flex-col gap-2">
              {NAV_ITEMS.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {item.children ? (
                    <div className="py-2">
                      <span className="block font-body text-xs uppercase tracking-[0.3em] text-white/40">
                        {item.label}
                      </span>
                      <div className="mt-3 flex flex-col gap-1 pl-4">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="py-2 font-heading text-2xl text-white/80 transition-colors hover:text-white"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className="block py-3 font-heading text-3xl text-white/80 transition-colors hover:text-white"
                    >
                      {item.label}
                    </Link>
                  )}
                </motion.div>
              ))}
            </nav>

            <div className="mt-auto border-t border-white/10 pt-8">
              <Link
                href="/contact"
                className="inline-block w-full border border-white/30 px-8 py-4 text-center font-body text-sm uppercase tracking-[0.2em] text-white transition-colors hover:bg-white hover:text-night"
              >
                Make an Enquiry
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
