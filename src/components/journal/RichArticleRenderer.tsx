import type { ContentBlock } from '@/types/journal'
import { QuoteBlock } from './QuoteBlock'
import { GalleryBlock } from './GalleryBlock'
import { CalloutBlock } from './CalloutBlock'

export function RichArticleRenderer({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className="space-y-6 md:space-y-8">
      {blocks.map((block, index) => {
        switch (block.type) {
          case 'heading':
            const Tag = `h${block.level}` as keyof JSX.IntrinsicElements
            const size = block.level === 1 ? 'text-3xl md:text-4xl' :
              block.level === 2 ? 'text-2xl md:text-3xl' :
              block.level === 3 ? 'text-xl md:text-2xl' :
              'text-lg md:text-xl'
            return (
              <Tag key={index} className={`font-heading font-medium text-night leading-tight mt-8 mb-4 first:mt-0 ${size}`}>
                {block.text}
              </Tag>
            )

          case 'paragraph':
            return (
              <p key={index} className="font-body text-base leading-[1.8] text-text-secondary md:text-lg">
                {block.text}
              </p>
            )

          case 'quote':
            return <QuoteBlock key={index} text={block.text} attribution={block.attribution} />

          case 'image':
            return (
              <figure key={index} className="space-y-3">
                <div className="aspect-[16/9] overflow-hidden rounded-lg bg-gradient-to-br from-primary/10 via-accent/5 to-night/10">
                  <div className="flex h-full items-center justify-center">
                    <p className="font-heading text-white/20">{block.alt}</p>
                  </div>
                </div>
                {block.caption && (
                  <figcaption className="font-body text-sm text-text-muted text-center italic">
                    {block.caption}
                  </figcaption>
                )}
              </figure>
            )

          case 'gallery':
            return <GalleryBlock key={index} images={block.images} />

          case 'bulletList':
            return (
              <ul key={index} className="space-y-3 pl-5">
                {block.items.map((item, i) => (
                  <li key={i} className="font-body text-base text-text-secondary md:text-lg list-disc marker:text-primary/50">
                    {item}
                  </li>
                ))}
              </ul>
            )

          case 'numberedList':
            return (
              <ol key={index} className="space-y-3 pl-5 list-decimal">
                {block.items.map((item, i) => (
                  <li key={i} className="font-body text-base text-text-secondary md:text-lg marker:text-primary/70 pl-2">
                    {item}
                  </li>
                ))}
              </ol>
            )

          case 'checklist':
            return (
              <ul key={index} className="space-y-3">
                {block.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 font-body text-base text-text-secondary md:text-lg">
                    <span className={`mt-1 flex size-5 flex-shrink-0 items-center justify-center rounded border text-xs ${
                      item.checked ? 'bg-primary border-primary text-white' : 'border-night/20'
                    }`}>
                      {item.checked ? '✓' : ''}
                    </span>
                    <span className={item.checked ? 'text-night/50 line-through' : ''}>{item.text}</span>
                  </li>
                ))}
              </ul>
            )

          case 'table':
            return (
              <div key={index} className="overflow-x-auto rounded-lg border border-night/5">
                <table className="w-full text-left font-body text-sm">
                  <thead>
                    <tr className="bg-night/5">
                      {block.headers.map((h, i) => (
                        <th key={i} className="px-4 py-3 font-semibold text-night">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.rows.map((row, i) => (
                      <tr key={i} className="border-t border-night/5">
                        {row.map((cell, j) => (
                          <td key={j} className="px-4 py-3 text-text-secondary">{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )

          case 'divider':
            return <div key={index} className="my-10 h-px bg-night/10" />

          case 'callout':
            return <CalloutBlock key={index} variant={block.variant} text={block.text} />

          default:
            return null
        }
      })}
    </div>
  )
}
