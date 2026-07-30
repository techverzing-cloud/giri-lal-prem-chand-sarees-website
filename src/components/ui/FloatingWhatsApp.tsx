import { cn } from '@/utils/cn'
import { siteConfig } from '@/config/site'
import { getWhatsAppUrl } from '@/utils/helpers'
import { MessageCircle } from 'lucide-react'
import { motion } from 'framer-motion'

interface FloatingWhatsAppProps {
  className?: string
}

export function FloatingWhatsApp({ className }: FloatingWhatsAppProps) {
  const whatsappUrl = getWhatsAppUrl(
    `Hi! I'm interested in learning more about ${siteConfig.company.name}.`
  )

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className={cn(
        'fixed bottom-6 right-6 z-50 flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-shadow hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
        className
      )}
      aria-label={`Contact us on WhatsApp at ${siteConfig.contact.whatsapp}`}
    >
      <MessageCircle className="size-6" />
      <motion.span
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -right-1 -top-1 flex size-4 items-center justify-center"
      >
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25D366] opacity-75" />
        <span className="relative inline-flex size-2.5 rounded-full bg-[#25D366]" />
      </motion.span>
    </motion.a>
  )
}
