import type { Product } from '@/types'
import { siteConfig } from '@/config/site'

interface ProductInfoProps {
  product: Product
}

export function ProductInfo({ product }: ProductInfoProps) {
  const brandName = product.brand === 'girilal'
    ? siteConfig.brand.girilal.name
    : siteConfig.brand.arunima.name

  const brandSince = product.brand === 'girilal'
    ? siteConfig.brand.girilal.since
    : siteConfig.brand.arunima.since

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-3">
          <span className="font-body text-[11px] font-semibold uppercase tracking-[0.2em] text-text-muted">
            {brandName}
          </span>
          <span className="text-text-muted/30">·</span>
          <span className="font-body text-[11px] text-text-muted">{brandSince}</span>
        </div>

        <h1 className="mt-4 font-heading text-3xl font-medium leading-tight text-night md:text-4xl lg:text-5xl">
          {product.name}
        </h1>

        <p className="mt-4 font-heading text-lg leading-relaxed text-text-secondary">
          {product.description}
        </p>
      </div>

      <div className="border-y border-night/5 py-6">
        <p className="font-heading text-xl text-primary">Price on Enquiry</p>
        <p className="mt-1 font-body text-sm text-text-muted">
          Kindly contact us for pricing details and exclusive offers.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-5">
        <div>
          <span className="font-body text-[11px] font-semibold uppercase tracking-[0.15em] text-text-muted">SKU</span>
          <p className="mt-1 font-body text-sm text-night">{product.sku}</p>
        </div>
        <div>
          <span className="font-body text-[11px] font-semibold uppercase tracking-[0.15em] text-text-muted">Availability</span>
          <p className={cn('mt-1 font-body text-sm', product.available ? 'text-green-600' : 'text-red-500')}>
            {product.available ? 'In Stock' : 'Made to Order'}
          </p>
        </div>
        <div>
          <span className="font-body text-[11px] font-semibold uppercase tracking-[0.15em] text-text-muted">Fabric</span>
          <p className="mt-1 font-body text-sm text-night">{product.fabric}</p>
        </div>
        <div>
          <span className="font-body text-[11px] font-semibold uppercase tracking-[0.15em] text-text-muted">Occasion</span>
          <p className="mt-1 font-body text-sm capitalize text-night">{product.occasion}</p>
        </div>
        <div>
          <span className="font-body text-[11px] font-semibold uppercase tracking-[0.15em] text-text-muted">Category</span>
          <p className="mt-1 font-body text-sm capitalize text-night">{product.subcategory}</p>
        </div>
        <div>
          <span className="font-body text-[11px] font-semibold uppercase tracking-[0.15em] text-text-muted">Collection</span>
          <p className="mt-1 font-body text-sm capitalize text-night">{product.category}</p>
        </div>
      </div>
    </div>
  )
}
