import type { Product } from '@/types'
import { WEDDING_SAREES } from './wedding'
import { SILK_SAREES } from './silk'
import { BANARASI_SAREES } from './banarasi'
import { COTTON_SAREES } from './cotton'
import { DESIGNER_SAREES } from './designer'
import { HANDLOOM_SAREES } from './handloom'
import { PARTY_SAREES } from './party'
import { PRINTED_SAREES } from './printed'
import { FESTIVE_SAREES } from './festive'
import { TRADITIONAL_SAREES } from './traditional'

/**
 * The Girilal saree catalogue, one module per category.
 *
 * Each category lives in its own file with sequential ids (`w001`, `s001`,
 * `b001`, …), so adding a saree means editing that one module and giving the
 * new line the next free number — no id has to be renumbered anywhere else and
 * no other category is touched. `collections` is declared on the product, so a
 * saree that belongs on more than one collection page (e.g. a silk party-wear
 * saree) lists both slugs and nothing is duplicated.
 */
export const SAREES: Product[] = [
  ...WEDDING_SAREES,
  ...SILK_SAREES,
  ...BANARASI_SAREES,
  ...COTTON_SAREES,
  ...DESIGNER_SAREES,
  ...HANDLOOM_SAREES,
  ...PARTY_SAREES,
  ...PRINTED_SAREES,
  ...FESTIVE_SAREES,
  ...TRADITIONAL_SAREES,
]

/**
 * Each Girilal collection's own product list, derived from the `collections`
 * declared on every product.
 *
 * A collection is defined by the products that name it rather than "every
 * product whose category happens to match". A product can appear in more than
 * one collection when it genuinely fits (e.g. a Traditional Banarasi heirloom
 * that is also wedding-worthy), which is why `collections` is a list. Members
 * keep catalogue order, so the grid is stable between renders.
 *
 * Counts: Wedding 4, Silk 7, Cotton 3, Designer 7, Handloom 4, Party Wear 7,
 * Printed 3, Festive 6, Traditional 5, Banarasi 10.
 */
export const SAREE_COLLECTIONS: Record<string, Product[]> = SAREES.reduce<
  Record<string, Product[]>
>((collections, product) => {
  for (const slug of product.collections ?? []) {
    ;(collections[slug] ??= []).push(product)
  }
  return collections
}, {})
