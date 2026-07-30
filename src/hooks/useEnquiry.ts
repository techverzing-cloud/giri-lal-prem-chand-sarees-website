import { useState, useCallback } from 'react'
import type { EnquiryPayload, EmailResponse } from '@/types/enquiry'
import { submitEnquiry } from '@/services/enquiry'

interface EnquiryState {
  isSubmitting: boolean
  isSuccess: boolean
  isError: boolean
  message: string
}

export function useEnquiry() {
  const [state, setState] = useState<EnquiryState>({
    isSubmitting: false,
    isSuccess: false,
    isError: false,
    message: '',
  })

  const submit = useCallback(async (payload: EnquiryPayload): Promise<EmailResponse> => {
    setState({ isSubmitting: true, isSuccess: false, isError: false, message: '' })

    const result = await submitEnquiry(payload.type, {
      name: payload.customer.name,
      phone: payload.customer.phone,
      email: payload.customer.email,
      city: payload.customer.city,
      preferredContact: payload.customer.preferredContact,
      eventType: payload.event?.occasion ?? '',
      weddingDate: payload.event?.weddingDate ?? '',
      budget: payload.event?.budget ?? '',
      interestedCollection: payload.event?.interestedCollection ?? '',
      productName: payload.product?.name ?? '',
      preferredTime: payload.consultation?.preferredTime ?? '',
      preferredStore: payload.consultation?.preferredStore ?? '',
      message: payload.event?.referralSource ?? '',
      referralSource: payload.event?.referralSource ?? '',
      agreedToPrivacy: payload.metadata.agreedToPrivacy,
    }, {
      product: payload.product,
      consultation: payload.consultation,
    })

    setState({
      isSubmitting: false,
      isSuccess: result.success,
      isError: !result.success,
      message: result.message,
    })

    return result
  }, [])

  const reset = useCallback(() => {
    setState({ isSubmitting: false, isSuccess: false, isError: false, message: '' })
  }, [])

  return { ...state, submit, reset }
}
