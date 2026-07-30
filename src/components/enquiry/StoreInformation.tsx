import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import { motion } from 'framer-motion'
import { siteConfig } from '@/config/site'

export function StoreInformation() {
  const details = [
    { icon: MapPin, label: 'Address', value: siteConfig.contact.address },
    { icon: Phone, label: 'Phone', value: siteConfig.contact.phone, href: `tel:${siteConfig.contact.phone}` },
    { icon: Mail, label: 'Email', value: siteConfig.contact.email, href: `mailto:${siteConfig.contact.email}` },
    { icon: Clock, label: 'Business Hours', value: siteConfig.contact.businessHours },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-heading text-2xl text-night">Giri Lal Prem Chand Sarees Pvt. Ltd.</h2>
        <p className="mt-1 font-body text-xs font-semibold uppercase tracking-[0.2em] text-text-muted">Since 1946</p>
      </div>

      <div className="space-y-5">
        {details.map((d, i) => (
          <motion.div
            key={d.label}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="flex items-start gap-4"
          >
            <div className="flex size-10 items-center justify-center rounded-full bg-primary/5 text-primary">
              <d.icon className="size-4" />
            </div>
            <div>
              <span className="font-body text-xs font-semibold uppercase tracking-[0.15em] text-text-muted">{d.label}</span>
              {d.href ? (
                <a href={d.href} className="mt-0.5 block font-body text-sm text-night transition-colors hover:text-primary">
                  {d.value}
                </a>
              ) : (
                <p className="mt-0.5 font-body text-sm text-night">{d.value}</p>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      <a
        href={siteConfig.contact.googleMapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 block h-56 w-full overflow-hidden rounded-lg border border-night/5"
      >
        <iframe
          src="https://www.google.com/maps?q=Gali+Jutte+Wali+Nai+Sarak+Chandni+Chowk+Delhi+110006&output=embed"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Giri Lal Prem Chand Store Location"
          className="pointer-events-none"
        />
      </a>
    </div>
  )
}
