import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { cn } from '@/utils/cn'
import { CONSULTATION_STEPS } from '@/constants/enquiry'

interface ProgressStepperProps {
  currentStep: number
  onStepClick?: (step: number) => void
}

export function ProgressStepper({ currentStep, onStepClick }: ProgressStepperProps) {
  return (
    <div className="flex items-start justify-between">
      {CONSULTATION_STEPS.map((s, i) => {
        const isCompleted = currentStep > s.step
        const isCurrent = currentStep === s.step
        const isClickable = s.step <= currentStep

        return (
          <div key={s.step} className="flex flex-1 flex-col items-center">
            <button
              onClick={() => isClickable && onStepClick?.(s.step)}
              disabled={!isClickable}
              className={cn(
                'relative z-10 flex size-10 items-center justify-center rounded-full border-2 text-sm font-semibold transition-all duration-300',
                isCompleted && 'border-primary bg-primary text-white',
                isCurrent && 'border-primary text-primary',
                !isCompleted && !isCurrent && 'border-night/20 text-night/30',
                isClickable && 'cursor-pointer hover:border-primary/50'
              )}
              aria-label={`Step ${s.step}: ${s.label}`}
              aria-current={isCurrent ? 'step' : undefined}
            >
              {isCompleted ? <Check className="size-4" /> : s.step}
            </button>

            <p className={cn(
              'mt-2 text-center font-body text-xs transition-colors duration-300',
              isCurrent && 'font-semibold text-night',
              isCompleted && 'text-primary',
              !isCompleted && !isCurrent && 'text-text-muted/50'
            )}>
              {s.label}
            </p>

            {i < CONSULTATION_STEPS.length - 1 && (
              <div className="absolute top-5 left-[calc(50%+1.5rem)] right-[calc(50%+1.5rem)] hidden sm:block">
                <div className="h-px w-full bg-night/10">
                  <motion.div
                    initial={{ width: '0%' }}
                    animate={{ width: isCompleted ? '100%' : '0%' }}
                    transition={{ duration: 0.5 }}
                    className="h-full bg-primary"
                  />
                </div>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
