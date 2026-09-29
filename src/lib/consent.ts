import {
  CONSENT_CATEGORIES,
  CONSENT_STORAGE_KEY,
  PRIVACY_POLICY_VERSION,
  type ConsentCategory,
} from '@/config/privacy'

/**
 * Consent store.
 *
 * Deliberately small and dependency-free. The site has no server-side consent
 * requirement — there is no account system and nothing identifies a visitor
 * server-side — so the record lives in `localStorage` and holds nothing but the
 * user's own choices.
 *
 * Three invariants worth keeping:
 *   1. No personal data is ever written here. Only booleans, a version string
 *      and a timestamp.
 *   2. A record written under an older PRIVACY_POLICY_VERSION is treated as no
 *      record at all, so the banner reappears after a meaningful change.
 *   3. `necessary` is not stored because it is not a decision.
 */

export interface ConsentRecord {
  /** Explicitly granted optional categories. */
  granted: ConsentCategory[]
  version: string
  /** ISO timestamp of when the user made this choice. */
  timestamp: string
}

export type ConsentState =
  | { status: 'undecided'; record: null }
  | { status: 'decided'; record: ConsentRecord }

type Listener = (state: ConsentState) => void

/** Listeners live in module scope, not React state, so non-React code can read the latest value. */
const listeners = new Set<Listener>()

/**
 * Validated against the live category list, not just `typeof === 'string'`.
 * A hand-edited or stale value could otherwise smuggle in a category that no
 * longer exists, leaving the stored record inconsistent with the UI.
 */
const KNOWN_CATEGORIES = CONSENT_CATEGORIES.map((category) => category.id)

function isConsentCategory(value: unknown): value is ConsentCategory {
  return typeof value === 'string' && KNOWN_CATEGORIES.includes(value as ConsentCategory)
}

function parse(raw: string | null): ConsentState {
  if (!raw) return { status: 'undecided', record: null }

  try {
    const parsed: unknown = JSON.parse(raw)
    if (!parsed || typeof parsed !== 'object') return { status: 'undecided', record: null }

    const candidate = parsed as Partial<ConsentRecord>
    if (candidate.version !== PRIVACY_POLICY_VERSION) {
      // Wording or categories changed materially since this was recorded.
      return { status: 'undecided', record: null }
    }
    if (!Array.isArray(candidate.granted)) return { status: 'undecided', record: null }

    const granted = candidate.granted.filter(isConsentCategory)
    return {
      status: 'decided',
      record: {
        granted,
        version: candidate.version,
        timestamp: typeof candidate.timestamp === 'string' ? candidate.timestamp : '',
      },
    }
  } catch {
    // Corrupted or hand-edited value: treat as no decision rather than guessing.
    return { status: 'undecided', record: null }
  }
}

/**
 * The last state handed out, cached so that `getSnapshot` returns a referentially
 * stable value.
 *
 * This is not an optimisation. `useSyncExternalStore` compares snapshots with
 * `Object.is`, so returning a freshly built object on every read makes React
 * believe the store changed on every single render, which loops. Caching by
 * value means a caller only sees a new object when the decision genuinely
 * differs.
 */
const UNDECIDED: ConsentState = { status: 'undecided', record: null }
let snapshot: ConsentState = UNDECIDED

function sameState(a: ConsentState, b: ConsentState): boolean {
  if (a === b) return true
  if (a.status !== b.status) return false
  if (a.status === 'undecided' || b.status === 'undecided') return true
  return (
    a.record.timestamp === b.record.timestamp &&
    a.record.version === b.record.version &&
    a.record.granted.length === b.record.granted.length &&
    a.record.granted.every((category, index) => category === b.record.granted[index])
  )
}

function read(): ConsentState {
  if (typeof window === 'undefined') return UNDECIDED
  let next: ConsentState
  try {
    next = parse(window.localStorage.getItem(CONSENT_STORAGE_KEY))
  } catch {
    // Private browsing / storage disabled: the site still works, the banner
    // simply reappears on the next visit.
    next = UNDECIDED
  }
  if (!sameState(snapshot, next)) snapshot = next
  return snapshot
}

function write(state: ConsentState): void {
  if (typeof window === 'undefined') return
  try {
    if (state.status === 'decided') {
      window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(state.record))
    } else {
      window.localStorage.removeItem(CONSENT_STORAGE_KEY)
    }
  } catch {
    // Storage unavailable — fail open rather than breaking the page.
  }
}

function emit(): void {
  const state = read()
  for (const listener of listeners) listener(state)
}

/** Current consent. Safe to call outside React. */
export function getConsent(): ConsentState {
  return read()
}

/** Whether a specific optional category is currently allowed. */
export function hasConsent(category: ConsentCategory): boolean {
  const state = read()
  return state.status === 'decided' && state.record.granted.includes(category)
}

/**
 * Record a decision. Passing no categories records "essential only", which is a
 * real and equally valid outcome — not a rejection state.
 */
export function setConsent(categories: ConsentCategory[]): void {
  const unique = Array.from(new Set(categories))
  write({
    status: 'decided',
    record: {
      granted: unique,
      version: PRIVACY_POLICY_VERSION,
      timestamp: new Date().toISOString(),
    },
  })
  emit()
}

/** Forget the stored decision so the banner is shown again. */
export function clearConsent(): void {
  write({ status: 'undecided', record: null })
  emit()
}

/** Subscribe to consent changes. Returns an unsubscribe function. */
export function subscribeToConsent(listener: Listener): () => void {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

/**
 * A monotonically increasing counter that ticks whenever something asks the
 * banner to open — used by the footer's "Manage Privacy Settings" link.
 *
 * A counter rather than a boolean so that asking twice in a row still produces
 * a change, which is what `useSyncExternalStore` needs in order to re-render.
 */
let panelRequestCount = 0
const panelListeners = new Set<Listener>()

/** Ask the consent banner to open. Safe to call from anywhere in the client. */
export function requestConsentPanel(): void {
  panelRequestCount += 1
  const state = read()
  for (const listener of panelListeners) listener(state)
}

/** Current value of the panel-request counter. */
export function getPanelRequestCount(): number {
  return panelRequestCount
}

/** Subscribe to "open the banner" requests. */
export function subscribeToPanelRequests(listener: Listener): () => void {
  panelListeners.add(listener)
  return () => {
    panelListeners.delete(listener)
  }
}

/**
 * Keep multiple open tabs consistent. `storage` only fires in *other* tabs, so
 * this never echoes the tab that made the change.
 */
if (typeof window !== 'undefined') {
  window.addEventListener('storage', (event) => {
    if (event.key === CONSENT_STORAGE_KEY) emit()
  })
}
