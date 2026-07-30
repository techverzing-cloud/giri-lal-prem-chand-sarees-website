import { useState, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import type { EnquiryFormValues, EmailResponse } from '@/types/enquiry'
import { submitEnquiry } from '@/services/enquiry'
import { trackEvent } from '@/services/analytics'

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().min(10, 'Enter a valid phone number').max(15),
  email: z.string().email('Enter a valid email address'),
  city: z.string().min(2, 'Enter your city'),
  preferredContact: z.enum(['email', 'phone', 'whatsapp']),
  eventType: z.string().min(1, 'Select an occasion'),
  weddingDate: z.string().optional(),
  budget: z.string().min(1, 'Select a budget range'),
  interestedCollection: z.string().min(1, 'Select a collection'),
  productName: z.string().optional(),
  preferredTime: z.string().optional(),
  preferredStore: z.string().optional(),
  message: z.string().optional(),
  referralSource: z.string().optional(),
  agreedToPrivacy: z.literal(true, { errorMap: () => ({ message: 'You must agree to the Privacy Policy' }) }),
})

export function useConsultationForm(type: EnquiryFormValues['eventType'] extends string ? 'PRODUCT' | 'CONSULTATION' | 'CONTACT' | 'BULK_ORDER' | 'CUSTOM_DESIGN' | 'CORPORATE' : never) {
  const [step, setStep] = useState(1)
  const [submitting, setSubmitting] = useState(false)
  const [result, setResult] = useState<EmailResponse | null>(null)

  const form = useForm<EnquiryFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      city: '',
      preferredContact: 'email',
      eventType: '',
      weddingDate: '',
      budget: '',
      interestedCollection: '',
      productName: '',
      preferredTime: '',
      preferredStore: '',
      message: '',
      referralSource: '',
      agreedToPrivacy: false,
    },
  })

  const nextStep = useCallback(() => {
    setStep((s) => Math.min(s + 1, 4))
  }, [])

  const prevStep = useCallback(() => {
    setStep((s) => Math.max(s - 1, 1))
  }, [])

  const goToStep = useCallback((s: number) => {
    setStep(s)
  }, [])

  async function onSubmit(data: EnquiryFormValues) {
    setSubmitting(true)
    trackEvent('form_submit', { enquiryType: type })
    const res = await submitEnquiry(type as any, data)
    setResult(res)
    setSubmitting(false)
  }

  return {
    form,
    step,
    setStep,
    nextStep,
    prevStep,
    goToStep,
    submitting,
    result,
    onSubmit: form.handleSubmit(onSubmit),
    reset: () => {
      form.reset()
      setStep(1)
      setResult(null)
    },
  }
}
