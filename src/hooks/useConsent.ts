'use client'

import { useCallback, useSyncExternalStore } from 'react'
import {
  getConsent,
  getServerConsent,
  subscribeToConsent,
  setConsent,
  clearConsent,
  type ConsentState,
} from '@/lib/consent'
import { CONSENT_CATEGORIES, type ConsentCategory } from '@/config/privacy'

/**
 * React bindings for the consent store.
 *
 * `useSyncExternalStore` is the correct primitive here: the store lives outside
 * React (so non-React code like the maps embed can read it), and this hook
 * subscribes to it without needing a provider threaded through the tree.
 */
export function useConsent(): ConsentState & {
  /** True once the user has answered, for the current policy version. */
  hasDecided: boolean
  /** True when the optional categories are all allowed. */
  allGranted: boolean
  /** True when the user explicitly chose essential-only. */
  essentialOnly: boolean
  /** Re-open the banner. */
  reopen: () => void
  /** Record a decision. Called with an empty array for essential-only. */
  decide: (categories: ConsentCategory[]) => void
  /** Withdraw and reset to undecided. */
  withdraw: () => void
} {
  const state = useSyncExternalStore(subscribeToConsent, getConsent, getServerConsent)

  const hasDecided = state.status === 'decided'
  const granted = state.record?.granted ?? []
  const allGranted = CONSENT_CATEGORIES.every((category) => granted.includes(category.id))
  const essentialOnly = hasDecided && !allGranted

  const decide = useCallback((categories: ConsentCategory[]) => setConsent(categories), [])
  const withdraw = useCallback(() => clearConsent(), [])
  const reopen = withdraw

  return { ...state, hasDecided, allGranted, essentialOnly, decide, withdraw, reopen }
}

/** Narrow helper for components that only care about one category. */
export function useHasConsent(category: ConsentCategory): boolean {
  const state = useConsent()
  return state.hasDecided && (state.record?.granted.includes(category) ?? false)
}
