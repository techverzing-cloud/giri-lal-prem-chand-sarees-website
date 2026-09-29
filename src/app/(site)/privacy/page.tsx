import { redirect } from 'next/navigation'
import { PRIVACY_POLICY_ROUTE } from '@/config/privacy'

/**
 * The privacy policy now lives at `/privacy-policy`.
 *
 * `/privacy` was the original path and is still linked from older builds, the
 * admin navigation data and previously indexed pages, so it is redirected
 * rather than deleted. A permanent redirect keeps those links working and passes
 * any search ranking on to the new URL.
 */
export default function Page() {
  redirect(PRIVACY_POLICY_ROUTE)
}
