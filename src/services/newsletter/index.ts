export interface NewsletterPayload {
  name: string
  email: string
  source: string
  timestamp: string
}

export async function subscribeToNewsletter(data: NewsletterPayload): Promise<{ success: boolean; message: string }> {
  console.debug('[Newsletter] Subscribe:', data)
  return {
    success: true,
    message: 'Thank you for subscribing. You will hear from us soon.',
  }
}
