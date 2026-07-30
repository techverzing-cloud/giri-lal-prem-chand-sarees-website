import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { FAQ_ITEMS } from '@/constants/enquiry'
import { AnalyticsEvents } from '@/services/analytics'
import { cn } from '@/utils/cn'

export function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  function toggle(index: number) {
    const isOpen = openIndex === index
    setOpenIndex(isOpen ? null : index)
    AnalyticsEvents.faqToggle(FAQ_ITEMS[index].question)
  }

  return (
    <div className="space-y-3">
      {FAQ_ITEMS.map((item, index) => (
        <div
          key={index}
          className={cn(
            'overflow-hidden rounded-lg border transition-all duration-300',
            openIndex === index ? 'border-primary/20 bg-primary/[0.02]' : 'border-night/5 bg-white'
          )}
        >
          <button
            onClick={() => toggle(index)}
            className="flex w-full items-center justify-between px-6 py-5 text-left transition-colors hover:bg-night/[0.02]"
            aria-expanded={openIndex === index}
          >
            <span className="font-body text-sm font-medium text-night pr-4">{item.question}</span>
            <ChevronDown
              className={cn(
                'size-4 flex-shrink-0 text-text-muted transition-transform duration-300',
                openIndex === index && 'rotate-180'
              )}
            />
          </button>

          <AnimatePresence initial={false}>
            {openIndex === index && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <div className="px-6 pb-5">
                  <p className="font-body text-sm leading-relaxed text-text-secondary">{item.answer}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  )
}
