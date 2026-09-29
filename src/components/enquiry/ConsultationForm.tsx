import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { Send, Loader, CheckCircle, AlertCircle, ArrowLeft } from 'lucide-react'
import type { EnquiryFormValues } from '@/types/enquiry'
import { ENQUIRY_EVENT_TYPES, BUDGET_RANGES, REFERRAL_SOURCES, CONTACT_METHODS } from '@/types/enquiry'
import { CONSULTATION_STEPS } from '@/constants/enquiry'
import { ProgressStepper } from './ProgressStepper'
import { LuxuryButton } from '@/components/ui/LuxuryButton'
import { ConsentCheckbox } from '@/components/privacy/ConsentCheckbox'
import { PRIVACY_POLICY_ROUTE } from '@/config/privacy'
import { cn } from '@/utils/cn'

interface ConsultationFormProps {
  form: {
    register: any
    errors: any
    trigger: any
    getValues: () => EnquiryFormValues
  }
  step: number
  submitting: boolean
  result: { success: boolean; message: string } | null
  onNext: () => void
  onPrev: () => void
  onStepClick: (step: number) => void
  onSubmit: () => void
  onReset: () => void
  onWhatsApp: () => void
}

function Field({ label, error, children, required }: { label: string; error?: string; children: React.ReactNode; required?: boolean }) {
  return (
    <div>
      <label className="mb-1.5 block font-body text-xs font-semibold uppercase tracking-[0.1em] text-text-muted">
        {label}{required && <span className="ml-1 text-primary">*</span>}
      </label>
      {children}
      {error && <p className="mt-1 font-body text-xs text-red-500" role="alert">{error}</p>}
    </div>
  )
}

const inputClass =
  'w-full rounded-md border border-night/10 bg-white px-4 py-3 font-body text-sm text-night placeholder:text-text-muted/40 transition-colors focus:border-primary/30 focus:outline-none focus:ring-1 focus:ring-primary/20'

const selectClass = `${inputClass} appearance-none`

export function ConsultationForm({
  form: { register, errors, getValues },
  step,
  submitting,
  result,
  onNext,
  onPrev,
  onStepClick,
  onSubmit,
  onReset,
  onWhatsApp,
}: ConsultationFormProps) {
  if (result) {
    return (
      <div className="rounded-lg border border-night/5 bg-white p-8 text-center md:p-12">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200 }}
        >
          {result.success ? (
            <div className="mx-auto flex size-20 items-center justify-center rounded-full bg-green-50">
              <CheckCircle className="size-10 text-green-500" />
            </div>
          ) : (
            <div className="mx-auto flex size-20 items-center justify-center rounded-full bg-red-50">
              <AlertCircle className="size-10 text-red-500" />
            </div>
          )}
        </motion.div>

        <h3 className="mt-6 font-heading text-2xl text-night">
          {result.success ? 'Thank You' : 'Something Went Wrong'}
        </h3>
        <p className="mt-3 font-body text-text-secondary">{result.message}</p>

        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <LuxuryButton variant="outline" size="md" onClick={onReset}>
            Submit Another Enquiry
          </LuxuryButton>
          <LuxuryButton variant="primary" size="md" onClick={onWhatsApp}>
            Contact on WhatsApp
          </LuxuryButton>
        </div>
      </div>
    )
  }

  return (
    <div>
      <ProgressStepper currentStep={step} onStepClick={onStepClick} />

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="mt-10 space-y-5"
        >
          {step === 1 && (
            <>
              <h3 className="font-heading text-xl text-night">Personal Details</h3>
              <p className="font-body text-sm text-text-muted">How should we reach you?</p>

              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Full Name" error={errors.name?.message} required>
                  <input {...register('name')} placeholder="Your full name" className={inputClass} />
                </Field>
                <Field label="Phone" error={errors.phone?.message} required>
                  <input {...register('phone')} type="tel" placeholder="+91 98765 43210" className={inputClass} />
                </Field>
                <Field label="Email" error={errors.email?.message} required>
                  <input {...register('email')} type="email" placeholder="your@email.com" className={inputClass} />
                </Field>
                <Field label="City" error={errors.city?.message} required>
                  <input {...register('city')} placeholder="Your city" className={inputClass} />
                </Field>
              </div>

              <Field label="Preferred Contact Method" required>
                <div className="flex flex-wrap gap-3">
                  {CONTACT_METHODS.map((m) => (
                    <label key={m.value} className="flex cursor-pointer items-center gap-2 rounded-full border border-night/10 px-4 py-2 transition-colors hover:border-night/30 has-[:checked]:border-primary has-[:checked]:bg-primary/5">
                      <input type="radio" value={m.value} {...register('preferredContact')} className="sr-only" />
                      <span className="font-body text-sm text-night capitalize">{m.label}</span>
                    </label>
                  ))}
                </div>
              </Field>

              <div className="pt-4 text-right">
                <LuxuryButton variant="primary" size="md" onClick={onNext}>
                  Next Step
                </LuxuryButton>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <h3 className="font-heading text-xl text-night">Event Details</h3>
              <p className="font-body text-sm text-text-muted">Tell us about your occasion.</p>

              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Occasion" error={errors.eventType?.message} required>
                  <select {...register('eventType')} className={selectClass}>
                    <option value="">Select occasion</option>
                    {ENQUIRY_EVENT_TYPES.map((et) => (
                      <option key={et.value} value={et.value}>{et.label}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Wedding Date (optional)">
                  <input {...register('weddingDate')} type="date" className={inputClass} />
                </Field>
                <Field label="Budget Range" error={errors.budget?.message} required>
                  <select {...register('budget')} className={selectClass}>
                    <option value="">Select budget</option>
                    {BUDGET_RANGES.map((b) => (
                      <option key={b.value} value={b.value}>{b.label}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Interested Collection" error={errors.interestedCollection?.message} required>
                  <select {...register('interestedCollection')} className={selectClass}>
                    <option value="">Select collection</option>
                    <option value="girilal-sarees">Giri Lal Prem Chand Sarees — Sarees</option>
                    <option value="arunima-lehengas">Arunima Fashions — Lehengas</option>
                    <option value="both">Both Collections</option>
                    <option value="not-sure">Not Sure Yet</option>
                  </select>
                </Field>
              </div>

              <div className="flex items-center justify-between pt-4">
                <button onClick={onPrev} className="flex items-center gap-2 font-body text-sm text-text-muted transition-colors hover:text-night">
                  <ArrowLeft className="size-4" /> Back
                </button>
                <LuxuryButton variant="primary" size="md" onClick={onNext}>
                  Next Step
                </LuxuryButton>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <h3 className="font-heading text-xl text-night">Preferences</h3>
              <p className="font-body text-sm text-text-muted">Help us personalize your experience.</p>

              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Product Name (optional)">
                  <input {...register('productName')} placeholder="If you have a specific product in mind" className={inputClass} />
                </Field>
                <Field label="Referral Source">
                  <select {...register('referralSource')} className={selectClass}>
                    <option value="">How did you hear about us?</option>
                    {REFERRAL_SOURCES.map((r) => (
                      <option key={r.value} value={r.value}>{r.label}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Preferred Time (optional)">
                  <input {...register('preferredTime')} type="text" placeholder="e.g., Morning, Afternoon, Evening" className={inputClass} />
                </Field>
                <Field label="Preferred Store (optional)">
                  <input {...register('preferredStore')} placeholder="e.g., Chandni Chowk, Delhi" className={inputClass} />
                </Field>
              </div>

              <Field label="Additional Message (optional)">
                <textarea
                  {...register('message')}
                  rows={3}
                  placeholder="Any special requests or preferences..."
                  className={cn(inputClass, 'resize-none')}
                />
              </Field>

              <div className="flex items-center justify-between pt-4">
                <button onClick={onPrev} className="flex items-center gap-2 font-body text-sm text-text-muted transition-colors hover:text-night">
                  <ArrowLeft className="size-4" /> Back
                </button>
                <LuxuryButton variant="primary" size="md" onClick={onNext}>
                  Review & Submit
                </LuxuryButton>
              </div>
            </>
          )}

          {step === 4 && (
            <>
              <h3 className="font-heading text-xl text-night">Review Your Enquiry</h3>
              <p className="font-body text-sm text-text-muted">Please verify your details before submitting.</p>

              <div className="rounded-lg border border-night/5 bg-cream/50 p-6 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <ReviewItem label="Name" value={getValues().name} />
                  <ReviewItem label="Phone" value={getValues().phone} />
                  <ReviewItem label="Email" value={getValues().email} />
                  <ReviewItem label="City" value={getValues().city} />
                  <ReviewItem label="Contact Method" value={getValues().preferredContact} />
                  <ReviewItem label="Occasion" value={getValues().eventType} />
                  {getValues().weddingDate && <ReviewItem label="Wedding Date" value={getValues().weddingDate} />}
                  <ReviewItem label="Budget" value={BUDGET_RANGES.find((b) => b.value === getValues().budget)?.label ?? getValues().budget} />
                  <ReviewItem label="Collection" value={getValues().interestedCollection} />
                  {getValues().productName && <ReviewItem label="Product" value={getValues().productName} />}
                </div>
              </div>

              <ConsentCheckbox
                id="consultation-consent"
                register={register('agreedToPrivacy')}
                error={errors.agreedToPrivacy?.message}
                className="mt-6"
              >
                I agree to the processing of my personal information so the team
                can respond to my enquiry, and I consent to being contacted about
                it, as described in the{' '}
                <Link
                  href={PRIVACY_POLICY_ROUTE}
                  className="font-medium text-primary underline underline-offset-2 transition-colors hover:text-primary/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  Privacy Policy
                </Link>
                .
              </ConsentCheckbox>

              <div className="flex items-center justify-between pt-4">
                <button onClick={onPrev} className="flex items-center gap-2 font-body text-sm text-text-muted transition-colors hover:text-night">
                  <ArrowLeft className="size-4" /> Back
                </button>
                <LuxuryButton
                  variant="primary"
                  size="lg"
                  onClick={onSubmit}
                  disabled={submitting}
                  icon={submitting ? <Loader className="size-4 animate-spin" /> : <Send className="size-4" />}
                >
                  {submitting ? 'Submitting...' : 'Submit Enquiry'}
                </LuxuryButton>
              </div>
            </>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

function ReviewItem({ label, value }: { label: string; value?: string }) {
  if (!value) return null
  return (
    <div>
      <span className="font-body text-[11px] font-semibold uppercase tracking-[0.1em] text-text-muted">{label}</span>
      <p className="mt-0.5 font-body text-sm capitalize text-night">{value}</p>
    </div>
  )
}
