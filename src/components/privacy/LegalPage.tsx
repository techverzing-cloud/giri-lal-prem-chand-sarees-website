import type { ReactNode } from 'react'
import Link from 'next/link'
import { siteConfig } from '@/config/site'
import {
  COOKIE_POLICY_ROUTE,
  PRIVACY_POLICY_VERSION,
  TERMS_ROUTE,
  POLICY_LAST_UPDATED_LABEL,
} from '@/config/privacy'
import { cn } from '@/utils/cn'

/**
 * Shared shell for the legal pages.
 *
 * The `Section`, `List` and `ReviewNote` primitives below are what keep the
 * privacy and cookie pages from drifting out of sync with each other, and let
 * every "client input required" marker look and behave the same way.
 */

export function LegalPage({
  title,
  description,
  children,
}: {
  title: string
  description: string
  children: ReactNode
}) {
  return (
    <div className="bg-surface">
      <section className="relative bg-cream pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="mx-auto max-w-3xl px-6">
          <h1 className="font-heading text-4xl text-night md:text-5xl">{title}</h1>
          <p className="mt-4 font-body text-text-secondary">{description}</p>
          <p className="mt-4 font-body text-xs text-text-muted">
            Version {PRIVACY_POLICY_VERSION} · Last updated{' '}
            {POLICY_LAST_UPDATED_LABEL}
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-6 py-16 md:py-20">
        <div className="mb-10 rounded-lg border border-gold/40 bg-cream/60 p-5">
          <h2 className="font-heading text-base text-night">This is a development draft</h2>
          <p className="mt-2 font-body text-sm leading-relaxed text-text-secondary">
            This page describes what the website actually does today, based on
            its code. It is not a legal document and it has not been reviewed by
            a lawyer. Items marked{' '}
            <span className="whitespace-nowrap font-medium text-primary">
              Client/legal review required
            </span>{' '}
            are deliberate placeholders for information that is not in the
            project, and must be completed and checked by the business before
            the site goes live.
          </p>
        </div>

        <div className="space-y-10 font-body text-[15px] leading-relaxed text-text-secondary">
          {children}
        </div>

        <div className="mt-14 border-t border-night/10 pt-8">
          <h2 className="font-heading text-lg text-night">Questions</h2>
          <p className="mt-2 text-sm">
            For anything about this policy or your data, write to{' '}
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="font-medium text-primary underline underline-offset-2 hover:text-primary/70"
            >
              {siteConfig.contact.email}
            </a>{' '}
            or call {siteConfig.contact.phone}.
          </p>
          <p className="mt-4 font-body text-xs text-text-muted">
            See also our{' '}
            <Link href={COOKIE_POLICY_ROUTE} className="underline underline-offset-2 hover:text-night">
              Cookie Policy
            </Link>{' '}
            and{' '}
            <Link href={TERMS_ROUTE} className="underline underline-offset-2 hover:text-night">
              Terms of Service
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  )
}

export function Section({
  id,
  title,
  children,
}: {
  id: string
  title: string
  children: ReactNode
}) {
  return (
    <section aria-labelledby={id}>
      <h2 id={id} className="font-heading text-xl text-night md:text-2xl">
        {title}
      </h2>
      <div className="mt-3 space-y-3">{children}</div>
    </section>
  )
}

export function SubHeading({ children }: { children: ReactNode }) {
  return <h3 className="pt-1 font-heading text-base text-night">{children}</h3>
}

export function List({ items, ordered }: { items: ReactNode[]; ordered?: boolean }) {
  const Tag = ordered ? 'ol' : 'ul'
  return (
    <Tag className={cn('space-y-2 pl-5', ordered ? 'list-decimal' : 'list-disc')}>
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </Tag>
  )
}

/** Table of contents entry list. */
export function Contents({ items }: { items: { id: string; label: string }[] }) {
  return (
    <nav aria-label="On this page" className="rounded-lg border border-night/10 bg-cream/50 p-5">
      <h2 className="font-heading text-base text-night">On this page</h2>
      <ol className="mt-3 space-y-1.5 pl-4 text-sm">
        {items.map((item) => (
          <li key={item.id} className="list-decimal">
            <a
              href={`#${item.id}`}
              className="text-primary underline underline-offset-2 hover:text-primary/70"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}

/**
 * A visible marker for a fact the project does not contain.
 *
 * Rendered as a `role="note"` block so it is not only visually distinct but also
 * announced, and so it cannot be mistaken for settled policy wording.
 */
export function ReviewNote({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div
      role="note"
      className="my-4 rounded-md border-l-2 border-gold bg-cream/70 p-4 text-sm"
    >
      <p className="font-semibold text-night">
        <span className="text-primary">Client/legal review required</span> — {title}
      </p>
      <div className="mt-1.5 space-y-1.5">{children}</div>
    </div>
  )
}

/** Simple definition-style table used for the collected-data listings. */
export function DataTable({
  caption,
  columns,
  rows,
}: {
  caption: string
  columns: string[]
  rows: ReactNode[][]
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-left text-sm">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr className="border-b border-night/15">
            {columns.map((column) => (
              <th
                key={column}
                scope="col"
                className="py-2 pr-4 font-heading text-sm font-semibold text-night"
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index} className="border-b border-night/5 align-top">
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="py-2.5 pr-4">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
