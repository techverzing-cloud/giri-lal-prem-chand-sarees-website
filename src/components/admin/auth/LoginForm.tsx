'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { AlertCircle, ArrowLeft, Eye, EyeOff, Loader, Lock } from 'lucide-react'
import { safeRedirectPath } from '@/lib/adminSession'
import { LuxuryButton } from '@/components/ui/LuxuryButton'

const schema = z.object({
  email: z.string().trim().email('Enter a valid email address'),
  password: z.string().min(1, 'Enter your password'),
})

type FormData = z.infer<typeof schema>

export function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [showPassword, setShowPassword] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  async function onSubmit(data: FormData) {
    setServerError(null)

    const response = await fetch('/api/admin/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })

    const payload: { ok?: boolean; error?: string } = await response.json().catch(() => ({}))

    if (!response.ok || !payload.ok) {
      setServerError(payload.error ?? 'Unable to sign in. Please try again.')
      return
    }

    // `next` is attacker-influenced, so it is validated before use.
    const destination = safeRedirectPath(searchParams.get('next'))
    router.replace(destination)
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-8 space-y-5">
      {serverError && (
        <div className="flex items-start gap-3 rounded-lg bg-red-50 p-4" role="alert">
          <AlertCircle className="mt-0.5 size-4 flex-shrink-0 text-red-500" />
          <p className="font-body text-sm text-red-700">{serverError}</p>
        </div>
      )}

      <div>
        <label
          htmlFor="admin-email"
          className="mb-1.5 block font-body text-xs font-semibold uppercase tracking-[0.1em] text-text-muted"
        >
          Email
        </label>
        <input
          {...register('email')}
          id="admin-email"
          type="email"
          autoComplete="username"
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck={false}
          placeholder="you@girilalpremchand.com"
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? 'admin-email-error' : undefined}
          className={inputClass}
        />
        {errors.email && (
          <p id="admin-email-error" role="alert" className="mt-1 font-body text-xs text-red-500">
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="admin-password"
          className="mb-1.5 block font-body text-xs font-semibold uppercase tracking-[0.1em] text-text-muted"
        >
          Password
        </label>
        <div className="relative">
          <input
            {...register('password')}
            id="admin-password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="current-password"
            placeholder="Enter your password"
            aria-invalid={Boolean(errors.password)}
            aria-describedby={errors.password ? 'admin-password-error' : undefined}
            className={`${inputClass} pr-11`}
          />
          <button
            type="button"
            onClick={() => setShowPassword((value) => !value)}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-1 text-night/40 transition-colors hover:text-night"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </button>
        </div>
        {errors.password && (
          <p id="admin-password-error" role="alert" className="mt-1 font-body text-xs text-red-500">
            {errors.password.message}
          </p>
        )}
      </div>

      <LuxuryButton
        type="submit"
        variant="primary"
        size="lg"
        fullWidth
        disabled={isSubmitting}
        icon={isSubmitting ? <Loader className="size-4 animate-spin" /> : <Lock className="size-4" />}
      >
        {isSubmitting ? 'Signing in...' : 'Sign In'}
      </LuxuryButton>

      <a
        href="/"
        className="flex items-center justify-center gap-1.5 pt-2 font-body text-xs text-text-muted transition-colors hover:text-primary"
      >
        <ArrowLeft className="size-3.5" />
        Back to website
      </a>
    </form>
  )
}

const inputClass =
  'w-full rounded-md border border-night/10 bg-white px-4 py-3 font-body text-sm text-night placeholder:text-text-muted/40 transition-colors focus:border-primary/30 focus:outline-none focus:ring-1 focus:ring-primary/20'
