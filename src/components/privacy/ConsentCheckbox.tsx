'use client'

import Link from 'next/link'
import type { UseFormRegisterReturn } from 'react-hook-form'
import { PRIVACY_POLICY_ROUTE } from '@/config/privacy'
import { cn } from '@/utils/cn'

type ConsentCheckboxProps = {
  /** Required. Drives the `htmlFor`/`id` pairing so the label is clickable and announced. */
  id: string
  /**
   * Either pass a react-hook-form `register()` result, or control the checkbox
   * yourself with `checked`/`onChange`.
   */
  register?: UseFormRegisterReturn
  checked?: boolean
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  error?: string
  /** Match the surface the form sits on so contrast stays readable. */
  variant?: 'light' | 'dark'
  /** Replaces the default wording. Keep a link to the policy in it. */
  children?: React.ReactNode
  className?: string
}

const DEFAULT_TEXT = (
  <>
    I agree to the processing of my personal information for the purpose of
    responding to my enquiry, as described in the{' '}
    <Link
      href={PRIVACY_POLICY_ROUTE}
      className="font-medium text-primary underline underline-offset-2 transition-colors hover:text-primary/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
    >
      Privacy Policy
    </Link>
    .
  </>
)

/**
 * The consent control used by every form on the site that sends personal data.
 *
 * Never rendered pre-checked, and always paired with a real `<label>`, so it is
 * reachable by keyboard and announced with its full wording by screen readers.
 */
export function ConsentCheckbox({
  id,
  register,
  checked,
  onChange,
  error,
  variant = 'light',
  children,
  className,
}: ConsentCheckboxProps) {
  const isDark = variant === 'dark'
  const errorId = `${id}-error`

  // react-hook-form's register() carries name/onChange/ref, so it wins when
  // present; otherwise fall back to the controlled props.
  const controlProps = register
    ? { name: register.name, onChange: register.onChange, onBlur: register.onBlur, ref: register.ref }
    : { checked: checked ?? false, onChange }

  return (
    <div className={cn('w-full', className)}>
      <div
        className={cn(
          'flex items-start gap-3 rounded-md p-1 transition-colors',
          isDark ? 'bg-white/5' : 'bg-night/[0.02]'
        )}
      >
        <input
          {...controlProps}
          id={id}
          type="checkbox"
          required
          aria-required="true"
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={error ? errorId : undefined}
          className={cn(
            'mt-0.5 size-4 flex-shrink-0 cursor-pointer rounded-sm',
            isDark ? 'accent-gold' : 'accent-primary',
            'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'
          )}
        />
        <label
          htmlFor={id}
          className={cn(
            'cursor-pointer font-body text-sm leading-relaxed',
            isDark ? 'text-white/75' : 'text-text-secondary'
          )}
        >
          {children ?? DEFAULT_TEXT}
        </label>
      </div>

      {error && (
        <p
          id={errorId}
          role="alert"
          className={cn(
            'mt-1.5 font-body text-xs',
            isDark ? 'text-red-300' : 'text-red-600'
          )}
        >
          {error}
        </p>
      )}
    </div>
  )
}
