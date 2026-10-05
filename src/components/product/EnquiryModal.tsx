import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, MessageCircle, CheckCircle, AlertCircle, Loader } from 'lucide-react'
import type { Product } from '@/types'
import type { EnquiryFormValues } from '@/types/enquiry'
import { ENQUIRY_EVENT_TYPES } from '@/types/enquiry'
import { useEnquiry } from '@/hooks/useEnquiry'
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll'
import { buildEnquiryPayload } from '@/services/enquiry'
import { AnalyticsEvents } from '@/services/analytics'
import { LuxuryButton } from '@/components/ui/LuxuryButton'
import { ConsentCheckbox } from '@/components/privacy/ConsentCheckbox'
import { siteConfig } from '@/config/site'
import { getWhatsAppUrl } from '@/utils/helpers'
import { cn } from '@/utils/cn'

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().min(10, 'Enter a valid phone number').max(15),
  email: z.string().email('Enter a valid email address'),
  city: z.string().min(2, 'Enter your city'),
  eventType: z.string().min(1, 'Select an event type'),
  weddingDate: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  agreedToPrivacy: z.literal(true, {
    errorMap: () => ({ message: 'Please agree to the Privacy Policy to continue' }),
  }),
})

interface EnquiryModalProps {
  isOpen: boolean
  onClose: () => void
  product: Product
}

export function EnquiryModal({ isOpen, onClose, product }: EnquiryModalProps) {
  const enquiry = useEnquiry()
  useLockBodyScroll(isOpen)
  const brandName = product.brand === 'girilal'
    ? siteConfig.brand.girilal.name
    : siteConfig.brand.arunima.name

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EnquiryFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      city: '',
      eventType: '',
      weddingDate: '',
      message: '',
      agreedToPrivacy: false,
    },
  })

  async function onSubmit(data: EnquiryFormValues) {
    AnalyticsEvents.formSubmit('product', true)

    const payload = buildEnquiryPayload('PRODUCT', {
      name: data.name,
      phone: data.phone,
      email: data.email,
      city: data.city,
      preferredContact: 'email',
      eventType: data.eventType,
      weddingDate: data.weddingDate,
      budget: '',
      interestedCollection: '',
      productName: product.name,
      preferredTime: '',
      preferredStore: '',
      message: data.message,
      referralSource: '',
      agreedToPrivacy: data.agreedToPrivacy,
    }, {
      id: product.id,
      name: product.name,
      sku: product.sku,
      brand: brandName,
      price: product.price,
    })

    const result = await enquiry.submit(payload)

    if (result.success) {
      setTimeout(() => {
        reset()
        onClose()
      }, 3000)
    }
  }

  function handleWhatsApp() {
    AnalyticsEvents.whatsappClick('product_enquiry')
    const msg = [
      `Hello, I am interested in the following product.`,
      ``,
      `Product: ${product.name}`,
      `SKU: ${product.sku}`,
      `Brand: ${brandName}`,
      ``,
      `Kindly share more details.`,
      `Thank you.`,
    ].join('\n')
    window.open(getWhatsAppUrl(msg), '_blank')
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-night/70 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative z-10 max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-lg bg-white shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-label="Product enquiry form"
          >
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-night/5 bg-white p-6">
              <div>
                <h2 className="font-heading text-xl text-night">Enquire Now</h2>
                <p className="mt-1 font-body text-sm text-text-muted">{product.name}</p>
              </div>
              <button
                onClick={onClose}
                className="flex size-9 items-center justify-center rounded-full bg-night/5 text-night transition-colors hover:bg-night/10"
                aria-label="Close enquiry form"
              >
                <X className="size-4" />
              </button>
            </div>

            {enquiry.isSuccess ? (
              <div className="p-6 text-center">
                <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-green-50">
                  <CheckCircle className="size-8 text-green-500" />
                </div>
                <h3 className="mt-4 font-heading text-xl text-night">Thank You!</h3>
                <p className="mt-2 font-body text-sm text-text-secondary">{enquiry.message}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-5">
                {enquiry.isError && (
                  <div className="flex items-center gap-3 rounded-lg bg-red-50 p-4">
                    <AlertCircle className="size-5 flex-shrink-0 text-red-500" />
                    <p className="font-body text-sm text-red-700">{enquiry.message}</p>
                  </div>
                )}

                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Name" error={errors.name?.message}>
                    <input {...register('name')} placeholder="Your full name" className={inputClass} />
                  </Field>
                  <Field label="Phone" error={errors.phone?.message}>
                    <input {...register('phone')} type="tel" placeholder="+91 98765 43210" className={inputClass} />
                  </Field>
                  <Field label="Email" error={errors.email?.message}>
                    <input {...register('email')} type="email" placeholder="your@email.com" className={inputClass} />
                  </Field>
                  <Field label="City" error={errors.city?.message}>
                    <input {...register('city')} placeholder="Your city" className={inputClass} />
                  </Field>
                </div>

                <Field label="Event Type" error={errors.eventType?.message}>
                  <select {...register('eventType')} className={inputClass}>
                    <option value="">Select event type</option>
                    {ENQUIRY_EVENT_TYPES.map((et) => (
                      <option key={et.value} value={et.value}>{et.label}</option>
                    ))}
                  </select>
                </Field>

                <Field label="Wedding Date (optional)">
                  <input {...register('weddingDate')} type="date" className={inputClass} />
                </Field>

                <Field label="Message" error={errors.message?.message}>
                  <textarea
                    {...register('message')}
                    rows={4}
                    placeholder="Tell us about your requirements..."
                    className={cn(inputClass, 'resize-none')}
                  />
                </Field>

                <div className="flex flex-col gap-3 pt-2">
                  <ConsentCheckbox
                    id={`enquiry-consent-${product.id}`}
                    register={register('agreedToPrivacy')}
                    error={errors.agreedToPrivacy?.message}
                  />

                  <LuxuryButton
                    type="submit"
                    variant="primary"
                    size="lg"
                    fullWidth
                    icon={enquiry.isSubmitting ? <Loader className="size-4 animate-spin" /> : <Send className="size-4" />}
                    disabled={enquiry.isSubmitting}
                  >
                    {enquiry.isSubmitting ? 'Submitting...' : 'Submit Enquiry'}
                  </LuxuryButton>
                  <button
                    type="button"
                    onClick={handleWhatsApp}
                    className="flex items-center justify-center gap-2 rounded-md border border-[#25D366] px-4 py-3 font-body text-sm font-semibold text-[#25D366] transition-colors hover:bg-[#25D366] hover:text-white"
                  >
                    <MessageCircle className="size-4" />
                    Enquire on WhatsApp Instead
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1.5 block font-body text-xs font-semibold uppercase tracking-[0.1em] text-text-muted">
        {label}
      </label>
      {children}
      {error && <p className="mt-1 font-body text-xs text-red-500" role="alert">{error}</p>}
    </div>
  )
}

const inputClass =
  'w-full rounded-md border border-night/10 bg-white px-4 py-2.5 font-body text-sm text-night placeholder:text-text-muted/40 transition-colors focus:border-primary/30 focus:outline-none focus:ring-1 focus:ring-primary/20'
