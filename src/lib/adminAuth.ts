import { createHash, randomBytes, scryptSync, timingSafeEqual } from 'node:crypto'

/**
 * Admin credential verification. Node-only (`node:crypto`), so it must never be
 * imported by the middleware or any client component — `adminSession.ts` is the
 * Edge-safe half.
 *
 * Credentials come from the environment, never from source or from a file that
 * gets committed:
 *   ADMIN_EMAIL           the single admin login
 *   ADMIN_PASSWORD_HASH   scrypt hash, produced by `npm run hash:admin-password`
 *   ADMIN_SESSION_SECRET  HMAC key used to sign session cookies
 *
 * Generate the hash and a secret with:
 *   npm run hash:admin-password -- "your password"
 */

const SCRYPT_COST = 16384
const SCRYPT_BLOCK_SIZE = 8
const SCRYPT_PARALLELISM = 1
const SCRYPT_KEY_LENGTH = 64
const SALT_LENGTH = 32

const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000
const RATE_LIMIT_MAX_ATTEMPTS = 8

export function adminAuthIsConfigured(): boolean {
  return Boolean(
    process.env.ADMIN_EMAIL &&
      process.env.ADMIN_PASSWORD_HASH &&
      process.env.ADMIN_SESSION_SECRET,
  )
}

/**
 * Produces a `scrypt:N:r:p:salt:hash` string for `ADMIN_PASSWORD_HASH`.
 *
 * The separator is `:` rather than `$` on purpose: Next.js loads `.env*` files
 * through `dotenv-expand`, which treats `$NAME` in a value as a variable
 * reference and silently replaces it with an empty string. A `$`-separated hash
 * in `.env.local` therefore loads corrupted. Hex never contains `:`, so this
 * format is safe to paste straight into an env file.
 */
export function hashPassword(password: string): string {
  const salt = randomBytes(SALT_LENGTH)
  const derived = scryptSync(password, salt, SCRYPT_KEY_LENGTH, {
    N: SCRYPT_COST,
    r: SCRYPT_BLOCK_SIZE,
    p: SCRYPT_PARALLELISM,
  })
  return [
    'scrypt',
    SCRYPT_COST,
    SCRYPT_BLOCK_SIZE,
    SCRYPT_PARALLELISM,
    salt.toString('hex'),
    derived.toString('hex'),
  ].join(':')
}

export function verifyPassword(password: string, stored: string): boolean {
  const parts = stored.split(':')
  if (parts.length !== 6) return false

  const [scheme, cost, blockSize, parallelism, saltHex, hashHex] = parts
  if (scheme !== 'scrypt') return false

  const n = Number(cost)
  const r = Number(blockSize)
  const p = Number(parallelism)
  if (!Number.isInteger(n) || !Number.isInteger(r) || !Number.isInteger(p)) return false

  const salt = Buffer.from(saltHex, 'hex')
  const expected = Buffer.from(hashHex, 'hex')
  if (salt.length !== SALT_LENGTH || expected.length === 0) return false

  try {
    const actual = scryptSync(password, salt, expected.length, { N: n, r, p })
    return actual.length === expected.length && timingSafeEqual(actual, expected)
  } catch {
    return false
  }
}

/**
 * Compares digests rather than raw strings so the two operands are always the
 * same length — `timingSafeEqual` throws on a length mismatch, and comparing
 * the secrets directly would leak the answer through that throw.
 */
function constantTimeEquals(a: string, b: string): boolean {
  const digestA = createHash('sha256').update(a).digest()
  const digestB = createHash('sha256').update(b).digest()
  return timingSafeEqual(digestA, digestB)
}

export interface CredentialResult {
  ok: boolean
  email?: string
}

/**
 * Both the email and the password are always checked, even once one has
 * already failed, so response timing does not reveal which field was wrong.
 */
export function verifyAdminCredentials(email: string, password: string): CredentialResult {
  const expectedEmail = process.env.ADMIN_EMAIL
  const passwordHash = process.env.ADMIN_PASSWORD_HASH
  if (!expectedEmail || !passwordHash) return { ok: false }

  const emailMatches = constantTimeEquals(email.trim().toLowerCase(), expectedEmail.trim().toLowerCase())
  const passwordMatches = verifyPassword(password, passwordHash)

  return { ok: emailMatches && passwordMatches, email: expectedEmail }
}

/**
 * In-memory throttle for the login endpoint. This is per-instance state: on a
 * multi-instance or serverless deployment every instance keeps its own counters,
 * so treat it as defence in depth rather than a hard guarantee. A shared store
 * is the upgrade path if this ever runs behind more than one instance.
 */
const failures = new Map<string, { count: number; resetAt: number }>()

export function checkRateLimit(
  key: string,
  now: number = Date.now(),
): { allowed: boolean; retryAfterSeconds: number } {
  const entry = failures.get(key)
  if (!entry) return { allowed: true, retryAfterSeconds: 0 }

  if (entry.resetAt <= now) {
    failures.delete(key)
    return { allowed: true, retryAfterSeconds: 0 }
  }

  if (entry.count < RATE_LIMIT_MAX_ATTEMPTS) return { allowed: true, retryAfterSeconds: 0 }

  return { allowed: false, retryAfterSeconds: Math.ceil((entry.resetAt - now) / 1000) }
}

export function recordFailedAttempt(key: string, now: number = Date.now()): void {
  const entry = failures.get(key)
  if (!entry || entry.resetAt <= now) {
    failures.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS })
    return
  }
  failures.set(key, { count: entry.count + 1, resetAt: entry.resetAt })
}

export function clearFailedAttempts(key: string): void {
  failures.delete(key)
}
