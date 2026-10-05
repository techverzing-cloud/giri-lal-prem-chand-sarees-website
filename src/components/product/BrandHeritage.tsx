import type { Product } from '@/types'
import { siteConfig } from '@/config/site'
import { cn } from '@/utils/cn'

interface BrandHeritageProps {
  product: Product
}

/**
 * Heritage / Designer Label card on the product page.
 *
 * The Giri Lal Prem Chand ("Heritage") variant keeps its original flat
 * gradient, unchanged. The Arunima ("Designer Label") variant paints
 * `/products/DesignerLabel.png` as a decorative CSS background layer rather
 * than an `<img>`, because the artwork repeats no information the copy does not
 * already carry — the layer is `aria-hidden` and the card is a single `<h3>`.
 *
 * Layer order, bottom to top: a solid `bg-night` base so the rounded corners
 * and the fade stay dark; the artwork, cover-fitted and scaled a little on
 * hover; two darkening gradients that hold the left and middle quiet so the
 * copy keeps its contrast and the fabric stays toward the right and bottom;
 * then a translucent brand tint and the content. The artwork is never allowed
 * to sit over the text, and the gradients fade it into the card so it does not
 * read as a separate rectangular image.
 */
export function BrandHeritage({ product }: BrandHeritageProps) {
  const isGiriLal = product.brand === 'girilal'
  const isDesignerLabel = !isGiriLal

  const heritage = isGiriLal
    ? {
        title: 'A Legacy Since 1946',
        description: siteConfig.brand.girilal.description,
        stats: [
          { value: '80+', label: 'Years of Excellence' },
          { value: '3', label: 'Generations' },
          { value: '500000+', label: 'Happy Clients' },
        ],
        tag: 'Heritage',
        gradient: 'from-[#8E2D29] to-[#6E201D]',
      }
    : {
        title: 'Contemporary Couture',
        description: siteConfig.brand.arunima.description,
        stats: [
          { value: '15+', label: 'Years of Design Excellence' },
          { value: '500+', label: 'Designer Creations' },
          { value: '5K+', label: 'Brides Served' },
        ],
        tag: 'Designer Label',
        gradient: 'from-[#344646] to-[#232E2E]',
      }

  return (
    <div
      className={cn(
        'group relative overflow-hidden rounded-lg bg-night',
        isDesignerLabel && 'shadow-lg shadow-night/10 ring-1 ring-inset ring-white/[0.06]'
      )}
    >
      {isDesignerLabel && (
        <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat motion-safe:transition-transform motion-safe:duration-[900ms] motion-safe:ease-out group-hover:scale-[1.03]"
            style={{ backgroundImage: "url('/products/DesignerLabel.png')" }}
          />

          {/* Stacked once the text spans the full card width. */}
          <div className="absolute inset-0 bg-gradient-to-t from-night via-night/85 to-night/55 lg:bg-gradient-to-r lg:from-night lg:via-night/90 lg:to-night/30" />

          {/* Cinematic vignette, keeping the corners settled. */}
          <div className="absolute inset-0 bg-gradient-to-br from-night/40 via-transparent to-night/35" />
        </div>
      )}

      <div
        className={cn(
          'relative p-8 md:p-10',
          isDesignerLabel
            ? 'bg-gradient-to-br from-[#344646]/60 to-[#232E2E]/75'
            : `bg-gradient-to-br ${heritage.gradient}`
        )}
      >
        <span className="font-body text-xs font-semibold uppercase tracking-[0.25em] text-white/60">
          {heritage.tag}
        </span>
        <h3 className="mt-3 font-heading text-2xl text-white md:text-3xl">{heritage.title}</h3>
        <p className="mt-4 max-w-2xl font-body text-sm leading-relaxed text-white/70">
          {heritage.description}
        </p>
        <div className="mt-8 grid grid-cols-3 gap-6">
          {heritage.stats.map((stat) => (
            <div key={stat.label}>
              <p className="font-heading text-2xl text-white md:text-3xl">{stat.value}</p>
              <p className="mt-1 font-body text-xs text-white/60">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
