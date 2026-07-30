import { Quote } from 'lucide-react'

export function QuoteBlock({ text, attribution }: { text: string; attribution?: string }) {
  return (
    <blockquote className="relative my-8 pl-8 md:pl-12">
      <Quote className="absolute left-0 top-0 size-6 text-primary/20 md:size-8" />
      <p className="font-heading text-xl leading-relaxed text-night italic md:text-2xl">
        &ldquo;{text}&rdquo;
      </p>
      {attribution && (
        <cite className="mt-4 block font-body text-sm not-italic text-text-muted">
          — {attribution}
        </cite>
      )}
    </blockquote>
  )
}
