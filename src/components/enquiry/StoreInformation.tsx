import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import { motion } from 'framer-motion'
import { siteConfig } from '@/config/site'
import { useConsent } from '@/hooks/useConsent'
import { setConsent, getConsent } from '@/lib/consent'

export function StoreInformation() {
  const consent = useConsent()
  const mapsAllowed = consent.hasDecided && (consent.record?.granted.includes('maps') ?? false)

  /** Add or remove just the `maps` category, leaving any other choice intact. */
  function requestMaps(allow: boolean) {
    const current = getConsent()
    const existing = current.status === 'decided' ? current.record.granted : []
    setConsent(allow ? [...existing, 'maps'] : existing.filter((c) => c !== 'maps'))
  }

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

      {mapsAllowed ? (
        <>
          {/*
            Once the visitor has agreed, the embed may load. `referrerPolicy`
            is kept on the frame so the full page URL is not handed to Google
            alongside the IP address.
          */}
          <div className="relative mt-6 h-56 w-full overflow-hidden rounded-lg border border-night/5">
            <iframe
              src="https://www.google.com/maps?q=Gali+Jutte+Wali+Nai+Sarak+Chandni+Chowk+Delhi+110006&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Giri Lal Prem Chand Store Location"
            />
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1">
            <a
              href={siteConfig.contact.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-xs text-text-muted underline underline-offset-2 transition-colors hover:text-night focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              Open in Google Maps
            </a>
            <button
              type="button"
              onClick={() => requestMaps(false)}
              className="font-body text-xs text-text-muted underline underline-offset-2 transition-colors hover:text-night focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              Hide the map and withdraw this permission
            </button>
          </div>
        </>
      ) : (
        // Nothing is requested from Google until the visitor agrees, so no IP
        // address or referrer is disclosed on page load. The address itself
        // stays in the list above, so withholding the map costs the visitor
        // nothing. This is a plain div, not a link: an anchor around a button
        // is invalid HTML and would leave a keyboard user with two overlapping
        // hit targets, one of them hidden from assistive tech.
        <div className="mt-6 flex h-56 w-full flex-col items-center justify-center gap-3 rounded-lg border border-night/5 bg-cream px-6 text-center">
          <p className="font-body text-sm text-text-secondary">
            We have not loaded the map, because it would share your IP address
            with Google.
          </p>
          <button
            type="button"
            onClick={() => requestMaps(true)}
            className="rounded-md border border-night/15 px-4 py-2 font-body text-sm text-night transition-colors hover:bg-night/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Show the map
          </button>
        </div>
      )}
    </div>
  )
}
