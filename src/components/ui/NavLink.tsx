'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import type { ComponentProps, ReactNode } from 'react'
import { cn } from '@/utils/cn'

type NavLinkClassName = string | ((state: { isActive: boolean }) => string)

interface NavLinkProps extends Omit<ComponentProps<typeof Link>, 'className' | 'href'> {
  href: string
  end?: boolean
  className?: NavLinkClassName
  children?: ReactNode
}

/**
 * `react-router-dom` exposed a `<NavLink>` that derived an `isActive` flag from
 * the current path and handed it to a function `className`. The App Router has
 * no equivalent, so this reproduces the same contract: with `end` the link is
 * active only on an exact match, otherwise any deeper path also matches.
 */
export function NavLink({ href, end = false, className, children, ...rest }: NavLinkProps) {
  const pathname = usePathname()

  const isActive = end
    ? pathname === href
    : pathname === href ||
      (pathname.startsWith(href.endsWith('/') ? href : `${href}/`) &&
        !pathname.slice(href.length).includes('/'))

  const resolved = typeof className === 'function' ? className({ isActive }) : className

  return (
    <Link href={href} className={cn(resolved)} aria-current={isActive ? 'page' : undefined} {...rest}>
      {children}
    </Link>
  )
}
