import { readFileSync } from 'node:fs'

// Load .env.local the same way Next does.
for (const line of readFileSync('.env.local', 'utf8').split(/\r?\n/)) {
  const match = /^([A-Z0-9_]+)=(.*)$/.exec(line)
  if (match) process.env[match[1]] = match[2]
}

const { verifyPassword, verifyAdminCredentials, adminAuthIsConfigured } = await import('../src/lib/adminAuth.ts')

console.log('configured:', adminAuthIsConfigured())
console.log('email env:', process.env.ADMIN_EMAIL)

const stored = process.env.ADMIN_PASSWORD_HASH
console.log('stored hash parts:', stored.split('$').length)
console.log('correct password  ->', verifyPassword('GirilalAdmin!2026', stored))
console.log('wrong password    ->', verifyPassword('wrong-password', stored))

console.log('creds ok  ->', verifyAdminCredentials('mukesh@girilalpremchand.com', 'GirilalAdmin!2026'))
console.log('creds bad ->', verifyAdminCredentials('mukesh@girilalpremchand.com', 'wrong-password'))
console.log('creds case->', verifyAdminCredentials('  MUKESH@GirilalPremChand.COM ', 'GirilalAdmin!2026'))
