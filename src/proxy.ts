import { NextResponse, type NextRequest } from 'next/server'
import {
  ADMIN_LOGIN_PATH,
  ADMIN_SESSION_COOKIE,
  readSessionToken,
} from '@/lib/adminSession'

/**
 * Server-side guard for the CMS. Without a valid session cookie a request to
 * an admin route is redirected before the route — and therefore before any
 * admin markup or admin JavaScript — is rendered or shipped.
 *
 * `/admin-preview/*` is included because `/admin-preview/content` renders the
 * admin content view directly instead of redirecting to `/admin`, so gating
 * `/admin` alone would leave the panel reachable.
 *
 * This fails closed: if `ADMIN_SESSION_SECRET` is missing, `readSessionToken`
 * is never given a key and every request is treated as signed out.
 */
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const isLoginRoute = pathname === ADMIN_LOGIN_PATH

  const secret = process.env.ADMIN_SESSION_SECRET
  const session = secret
    ? await readSessionToken(request.cookies.get(ADMIN_SESSION_COOKIE)?.value, secret)
    : null

  if (!session && !isLoginRoute) {
    const target = request.nextUrl.clone()
    target.pathname = ADMIN_LOGIN_PATH
    target.search = ''
    target.searchParams.set('next', pathname)
    return NextResponse.redirect(target)
  }

  if (session && isLoginRoute) {
    const target = request.nextUrl.clone()
    target.pathname = '/admin'
    target.search = ''
    return NextResponse.redirect(target)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin', '/admin/:path*', '/admin-preview', '/admin-preview/:path*'],
}
