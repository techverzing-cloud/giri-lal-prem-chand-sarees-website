import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'
import { Send, Loader, CheckCircle, AlertCircle } from 'lucide-react'
import { useEnquiry } from '@/hooks/useEnquiry'
import { buildEnquiryPayload } from '@/services/enquiry'
import { AnalyticsEvents } from '@/services/analytics'
import { LuxuryButton } from '@/components/ui/LuxuryButton'

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Enter a valid email address'),
  phone: z.string().min(10, 'Enter a valid phone number').max(15),
  subject: z.string().min(3, 'Subject is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

type FormData = z.infer<typeof schema>

export function ContactForm() {
  const enquiry = useEnquiry()

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  async function onSubmit(data: FormData) {
    AnalyticsEvents.formSubmit('contact', true)

    const payload = buildEnquiryPayload('CONTACT', {
      name: data.name,
      email: data.email,
      phone: data.phone,
      city: '',
      preferredContact: 'email',
      eventType: '',
      weddingDate: '',
      budget: '',
      interestedCollection: '',
      productName: '',
      preferredTime: '',
      preferredStore: '',
      message: data.message,
      referralSource: '',
      agreedToPrivacy: true,
    })

    const result = await enquiry.submit(payload)

    if (result.success) {
      setTimeout(() => {
        reset()
        enquiry.reset()
      }, 4000)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="rounded-lg border border-night/5 bg-white p-6 md:p-8"
    >
      <h3 className="font-heading text-xl text-night">Send a Message</h3>
      <p className="mt-2 font-body text-sm text-text-muted">We typically respond within 24 hours.</p>

      {enquiry.isSuccess ? (
        <div className="mt-6 text-center py-8">
          <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-green-50">
            <CheckCircle className="size-8 text-green-500" />
          </div>
          <h4 className="mt-4 font-heading text-lg text-night">Message Sent!</h4>
          <p className="mt-2 font-body text-sm text-text-secondary">{enquiry.message}</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-5">
          {enquiry.isError && (
            <div className="flex items-center gap-3 rounded-lg bg-red-50 p-4">
              <AlertCircle className="size-5 flex-shrink-0 text-red-500" />
              <p className="font-body text-sm text-red-700">{enquiry.message}</p>
            </div>
          )}

          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Name" error={errors.name?.message}>
              <input {...register('name')} placeholder="Your name" className={inputClass} />
            </Field>
            <Field label="Email" error={errors.email?.message}>
              <input {...register('email')} type="email" placeholder="your@email.com" className={inputClass} />
            </Field>
            <Field label="Phone" error={errors.phone?.message}>
              <input {...register('phone')} type="tel" placeholder="+91 98765 43210" className={inputClass} />
            </Field>
            <Field label="Subject" error={errors.subject?.message}>
              <input {...register('subject')} placeholder="Subject" className={inputClass} />
            </Field>
          </div>

          <Field label="Message" error={errors.message?.message}>
            <textarea
              {...register('message')}
              rows={5}
              placeholder="Tell us how we can help you..."
              className={`${inputClass} resize-none`}
            />
          </Field>

          <LuxuryButton
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            icon={enquiry.isSubmitting ? <Loader className="size-4 animate-spin" /> : <Send className="size-4" />}
            disabled={enquiry.isSubmitting}
          >
            {enquiry.isSubmitting ? 'Sending...' : 'Send Message'}
          </LuxuryButton>
        </form>
      )}
    </motion.div>
  )
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1.5 block font-body text-xs font-semibold uppercase tracking-[0.1em] text-text-muted">{label}</label>
      {children}
      {error && <p className="mt-1 font-body text-xs text-red-500" role="alert">{error}</p>}
    </div>
  )
}

const inputClass =
  'w-full rounded-md border border-night/10 bg-white px-4 py-3 font-body text-sm text-night placeholder:text-text-muted/40 transition-colors focus:border-primary/30 focus:outline-none focus:ring-1 focus:ring-primary/20'
