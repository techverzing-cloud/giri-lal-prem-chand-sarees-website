#!/usr/bin/env node
/**
 * Generates the values the admin sign-in needs.
 *
 *   npm run hash:admin-password -- "your password"   -> ADMIN_PASSWORD_HASH
 *   npm run hash:admin-password -- --secret-only     -> ADMIN_SESSION_SECRET
 *
 * The hash string carries its own cost parameters
 * (`scrypt:N:r:p:salt:hash`), and `src/lib/adminAuth.ts` reads those back out
 * of the stored value, so the two files cannot drift apart silently.
 *
 * `:` is used instead of `$` because Next.js loads `.env*` through
 * `dotenv-expand`, which would strip a `$NAME` substring out of the value.
 *
 * Nothing here is written to disk. Paste the output into your `.env.local`.
 */
import { randomBytes, scryptSync } from 'node:crypto'

const N = 16384
const R = 8
const P = 1
const KEY_LENGTH = 64
const SALT_LENGTH = 32

function newSecret() {
  return randomBytes(32).toString('hex')
}

function hashPassword(password) {
  const salt = randomBytes(SALT_LENGTH)
  const derived = scryptSync(password, salt, KEY_LENGTH, { N, r: R, p: P })
  return ['scrypt', N, R, P, salt.toString('hex'), derived.toString('hex')].join(':')
}

const args = process.argv.slice(2)

if (args.includes('--secret-only')) {
  console.log(`ADMIN_SESSION_SECRET=${newSecret()}`)
  process.exit(0)
}

const password = args.find((arg) => !arg.startsWith('--'))

if (!password) {
  console.error('Usage: npm run hash:admin-password -- "your password"')
  console.error('   or: npm run hash:admin-password -- --secret-only')
  process.exit(1)
}

if (password.length < 12) {
  console.warn('Warning: that password is under 12 characters. Use something longer for an admin account.')
}

console.log('# Paste these into .env.local (never commit that file):')
console.log(`ADMIN_PASSWORD_HASH=${hashPassword(password)}`)
console.log(`ADMIN_SESSION_SECRET=${newSecret()}`)
console.log('')
console.log('# And set the login address yourself:')
console.log('# ADMIN_EMAIL=you@girilalpremchand.com')
