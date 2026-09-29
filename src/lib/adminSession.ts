/**
 * Admin session tokens.
 *
 * Deliberately isomorphic: this module uses only Web Crypto, so the exact same
 * verification code runs inside the Next.js middleware (Edge runtime, where
 * `node:crypto` is unavailable) and inside the Node route handler that mints
 * the cookie. Anything requiring `node:crypto` belongs in `adminAuth.ts`.
 *
 * A token is `base64url(payload).base64url(HMAC-SHA256(payload, secret))`.
 * The payload is `{ email, exp }`. It is signed, not encrypted, so it carries
 * no confidential data: it only proves the holder was issued a session.
 */

export const ADMIN_SESSION_COOKIE = 'glpc_admin_session'
export const ADMIN_LOGIN_PATH = '/admin/login'
export const ADMIN_SESSION_MAX_AGE_SECONDS = 60 * 60 * 8

const encoder = new TextEncoder()
const decoder = new TextDecoder()

function toBase64Url(bytes: Uint8Array): string {
  let binary = ''
  for (let i = 0; i < bytes.length; i += 1) binary += String.fromCharCode(bytes[i])
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

function fromBase64Url(value: string): Uint8Array<ArrayBuffer> | null {
  try {
    const base64 = value.replace(/-/g, '+').replace(/_/g, '/')
    const padded = base64 + '='.repeat((4 - (base64.length % 4)) % 4)
    const binary = atob(padded)
    // Backed by a plain ArrayBuffer so the result satisfies Web Crypto's
    // BufferSource, which excludes SharedArrayBuffer-backed views.
    const bytes = new Uint8Array(new ArrayBuffer(binary.length))
    for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i)
    return bytes
  } catch {
    return null
  }
}

function importSigningKey(secret: string) {
  return crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify'],
  )
}

export interface AdminSession {
  email: string
  expiresAt: number
}

export async function createSessionToken(
  email: string,
  secret: string,
  expiresAt: number,
): Promise<string> {
  const payload = toBase64Url(encoder.encode(JSON.stringify({ email, exp: expiresAt })))
  const key = await importSigningKey(secret)
  const signature = new Uint8Array(await crypto.subtle.sign('HMAC', key, encoder.encode(payload)))
  return `${payload}.${toBase64Url(signature)}`
}

/**
 * Returns the session carried by `token`, or `null` if it is missing,
 * malformed, unsigned, signed with a different secret, or expired.
 */
export async function readSessionToken(
  token: string | undefined,
  secret: string,
  now: number = Date.now(),
): Promise<AdminSession | null> {
  if (!token) return null

  const separator = token.lastIndexOf('.')
  if (separator <= 0) return null

  const payload = token.slice(0, separator)
  const signature = fromBase64Url(token.slice(separator + 1))
  if (!signature) return null

  try {
    const key = await importSigningKey(secret)
    // `verify` is the constant-time path; a tampered payload or a signature
    // made with a different ADMIN_SESSION_SECRET fails here.
    const authentic = await crypto.subtle.verify('HMAC', key, signature, encoder.encode(payload))
    if (!authentic) return null

    const decoded = fromBase64Url(payload)
    if (!decoded) return null

    const parsed: unknown = JSON.parse(decoder.decode(decoded))
    if (typeof parsed !== 'object' || parsed === null) return null

    const { email, exp } = parsed as { email?: unknown; exp?: unknown }
    if (typeof email !== 'string' || typeof exp !== 'number') return null
    if (!Number.isFinite(exp) || exp <= now) return null

    return { email, expiresAt: exp }
  } catch {
    return null
  }
}

/**
 * `next` values come from the query string, so they are untrusted input. Only
 * same-origin, in-app admin paths are allowed back; this rejects `//evil.com`
 * and `https://evil.com` style open redirects.
 */
export function safeRedirectPath(value: string | null | undefined, fallback = '/admin'): string {
  if (!value) return fallback
  if (!value.startsWith('/')) return fallback
  if (value.startsWith('//')) return fallback
  if (value.includes('\\')) return fallback
  if (!value.startsWith('/admin')) return fallback
  return value
}
