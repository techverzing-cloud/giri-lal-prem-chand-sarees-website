import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, Clock, Instagram, Facebook, MessageCircle } from 'lucide-react'
import { siteConfig } from '@/config/site'
import { getWhatsAppUrl } from '@/utils/helpers'

export function ContactInformation() {
  const items = [
    { icon: Phone, label: 'Phone', value: siteConfig.contact.phone, href: `tel:${siteConfig.contact.phone}` },
    { icon: Mail, label: 'Email', value: siteConfig.contact.email, href: `mailto:${siteConfig.contact.email}` },
    { icon: MapPin, label: 'Address', value: siteConfig.contact.address },
    { icon: Clock, label: 'Business Hours', value: siteConfig.contact.businessHours },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h3 className="font-heading text-2xl text-night">Get in Touch</h3>
        <p className="mt-2 font-body text-text-muted">We are here to assist you with any enquiry.</p>
      </div>

      <div className="space-y-6">
        {items.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="flex items-start gap-4"
          >
            <div className="flex size-10 items-center justify-center rounded-full bg-primary/5 text-primary">
              <item.icon className="size-4" />
            </div>
            <div>
              <span className="font-body text-xs font-semibold uppercase tracking-[0.15em] text-text-muted">
                {item.label}
              </span>
              {item.href ? (
                <a href={item.href} className="mt-0.5 block font-body text-sm text-night transition-colors hover:text-primary">
                  {item.value}
                </a>
              ) : (
                <p className="mt-0.5 font-body text-sm text-night">{item.value}</p>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      <div>
        <span className="font-body text-xs font-semibold uppercase tracking-[0.15em] text-text-muted">Follow Us</span>
        <div className="mt-3 flex gap-4">
          <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer" className="flex size-11 items-center justify-center rounded-full border border-night/10 text-text-muted transition-all hover:border-[#E4405F] hover:text-[#E4405F]">
            <Instagram className="size-4" />
          </a>
          <a href={siteConfig.social.facebook} target="_blank" rel="noopener noreferrer" className="flex size-11 items-center justify-center rounded-full border border-night/10 text-text-muted transition-all hover:border-[#1877F2] hover:text-[#1877F2]">
            <Facebook className="size-4" />
          </a>
          <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer" className="flex size-11 items-center justify-center rounded-full border border-night/10 text-text-muted transition-all hover:border-[#25D366] hover:text-[#25D366]">
            <MessageCircle className="size-4" />
          </a>
        </div>
      </div>
    </div>
  )
}
