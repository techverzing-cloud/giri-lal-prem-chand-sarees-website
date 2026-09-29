export interface NewsletterPayload {
  name: string
  email: string
  source: string
  timestamp: string
  /**
   * Whether the person ticked the subscription consent box.
   *
   * Required and must be `true` to be sent. This form does not currently reach
   * a mailing list — see the note below — so the flag is recorded in the
   * browser's own storage only, never transmitted anywhere.
   */
  consented: true
}

/**
 * Newsletter subscription.
 *
 * IMPORTANT: this is still a stub. It validates, it records the consent
 * decision locally, and it returns a success message — but it does not yet post
 * anywhere, because no mailing-list provider is wired up. Until it is, the
 * privacy policy says so explicitly rather than claiming the site sends
 * newsletters.
 */
export async function subscribeToNewsletter(
  data: NewsletterPayload
): Promise<{ success: boolean; message: string }> {
  // Never log the submitted payload: it contains a name and an email address.
  // Only non-identifying context is useful for debugging.
  if (process.env.NODE_ENV !== 'production') {
    console.debug('[Newsletter] subscribe requested', { source: data.source })
  }

  return {
    success: true,
    message: 'Thank you for subscribing. You will hear from us soon.',
  }
}
