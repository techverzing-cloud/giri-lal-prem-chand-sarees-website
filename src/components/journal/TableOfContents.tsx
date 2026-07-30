import type { ContentBlock } from '@/types/journal'

export function TableOfContents({ blocks }: { blocks: ContentBlock[] }) {
  const headings = blocks.filter((b): b is ContentBlock & { type: 'heading'; text: string; level: number } =>
    b.type === 'heading'
  )

  if (headings.length < 2) return null

  return (
    <nav className="rounded-lg border border-night/5 bg-white p-5" aria-label="Table of contents">
      <h4 className="font-body text-xs font-semibold uppercase tracking-[0.15em] text-text-muted">
        In This Article
      </h4>
      <ul className="mt-4 space-y-2">
        {headings.map((h, i) => (
          <li key={i} className="font-body text-sm">
            <a
              href={`#section-${i}`}
              className="text-text-secondary transition-colors hover:text-primary"
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
