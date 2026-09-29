import { NextResponse, type NextRequest } from 'next/server'
import { z } from 'zod'
import {
  ADMIN_SESSION_COOKIE,
  ADMIN_SESSION_MAX_AGE_SECONDS,
  createSessionToken,
} from '@/lib/adminSession'
import {
  adminAuthIsConfigured,
  checkRateLimit,
  clearFailedAttempts,
  recordFailedAttempt,
  verifyAdminCredentials,
} from '@/lib/adminAuth'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/**
 * POST signs in, DELETE signs out. The cookie is httpOnly so the token is not
 * readable from JavaScript, and the same site comparison keeps it off
 * cross-site requests.
 */

const credentialsSchema = z.object({
  email: z.string().trim().email('Enter a valid email address').max(160),
  password: z.string().min(1, 'Enter your password').max(200),
})

const GENERIC_FAILURE = 'Email or password is incorrect.'
const RATE_LIMITED = 'Too many failed attempts. Please try again later.'

function clientKey(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for')
  const ip = forwarded ? forwarded.split(',')[0].trim() : request.headers.get('x-real-ip')
  return ip || 'unknown'
}

function cookieOptions() {
  return {
    httpOnly: true,
    sameSite: 'lax' as const,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
  }
}

export async function POST(request: NextRequest) {
  // Fail closed, and say so plainly: a misconfigured deployment must not look
  // like a wrong password.
  if (!adminAuthIsConfigured()) {
    return NextResponse.json(
      { ok: false, error: 'Admin sign-in is not configured on this server yet.' },
      { status: 503 },
    )
  }

  const key = clientKey(request)
  const limit = checkRateLimit(key)
  if (!limit.allowed) {
    return NextResponse.json(
      { ok: false, error: RATE_LIMITED },
      { status: 429, headers: { 'Retry-After': String(limit.retryAfterSeconds) } },
    )
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request.' }, { status: 400 })
  }

  const parsed = credentialsSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: parsed.error.issues[0]?.message ?? 'Enter your email and password.' },
      { status: 400 },
    )
  }

  const result = verifyAdminCredentials(parsed.data.email, parsed.data.password)
  if (!result.ok) {
    recordFailedAttempt(key)
    return NextResponse.json({ ok: false, error: GENERIC_FAILURE }, { status: 401 })
  }

  clearFailedAttempts(key)

  const secret = process.env.ADMIN_SESSION_SECRET
  if (!secret) {
    return NextResponse.json({ ok: false, error: 'Admin sign-in is not configured.' }, { status: 503 })
  }

  const expiresAt = Date.now() + ADMIN_SESSION_MAX_AGE_SECONDS * 1000
  const token = await createSessionToken(result.email ?? parsed.data.email, secret, expiresAt)

  const response = NextResponse.json({ ok: true })
  response.cookies.set(ADMIN_SESSION_COOKIE, token, {
    ...cookieOptions(),
    maxAge: ADMIN_SESSION_MAX_AGE_SECONDS,
  })
  return response
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true })
  response.cookies.set(ADMIN_SESSION_COOKIE, '', { ...cookieOptions(), maxAge: 0 })
  return response
}
