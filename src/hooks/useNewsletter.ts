import { useState, useCallback } from 'react'
import { subscribeToNewsletter } from '@/services/newsletter'

export function useNewsletter() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const subscribe = useCallback(async () => {
    if (!email || !name) {
      setError('Please fill in all fields')
      return
    }
    setSubmitting(true)
    setError('')
    const result = await subscribeToNewsletter({
      name,
      email,
      source: window.location.pathname,
      timestamp: new Date().toISOString(),
    })
    setSubmitting(false)
    if (result.success) {
      setSuccess(true)
    } else {
      setError(result.message)
    }
  }, [email, name])

  const reset = useCallback(() => {
    setEmail('')
    setName('')
    setSuccess(false)
    setError('')
  }, [])

  return { email, setEmail, name, setName, submitting, success, error, subscribe, reset }
}
