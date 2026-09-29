import { useState, useCallback } from 'react'
import { subscribeToNewsletter } from '@/services/newsletter'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function useNewsletter() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [consented, setConsented] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  // Two separate messages, because they belong to two different controls. The
  // consent message must only ever be attached to the consent checkbox; wiring
  // a "fill in your name" error to it misleads screen reader users about what is
  // actually wrong.
  const [error, setError] = useState('')
  const [consentError, setConsentError] = useState('')

  const subscribe = useCallback(async () => {
    setError('')
    setConsentError('')

    if (!email || !name) {
      setError('Please fill in all fields')
      return
    }
    if (!EMAIL_PATTERN.test(email)) {
      setError('Enter a valid email address')
      return
    }
    // Marketing email is not implied by submitting a form, so it needs its own
    // explicit opt-in. Checked before anything is sent, client side.
    if (!consented) {
      setConsentError('Please tick the box to confirm you want to receive the journal by email')
      return
    }

    setSubmitting(true)
    setError('')

    const result = await subscribeToNewsletter({
      name: name.trim(),
      email: email.trim(),
      source: window.location.pathname,
      timestamp: new Date().toISOString(),
      consented: true,
    })

    setSubmitting(false)
    if (result.success) {
      setSuccess(true)
    } else {
      setError(result.message)
    }
  }, [email, name, consented])

  const reset = useCallback(() => {
    setEmail('')
    setName('')
    setConsented(false)
    setSuccess(false)
    setError('')
    setConsentError('')
  }, [])

  return {
    email,
    setEmail,
    name,
    setName,
    consented,
    setConsented,
    submitting,
    success,
    error,
    consentError,
    subscribe,
    reset,
  }
}
