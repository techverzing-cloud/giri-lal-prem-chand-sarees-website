import type { JournalAuthor } from '@/types/journal'

export function AuthorCard({ author }: { author: JournalAuthor }) {
  return (
    <div className="flex items-start gap-5 rounded-lg border border-night/5 bg-white p-6">
      <div className="size-16 flex-shrink-0 overflow-hidden rounded-full bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="flex h-full items-center justify-center">
          <span className="font-heading text-xl text-white/40">{author.name.charAt(0)}</span>
        </div>
      </div>
      <div className="flex-1">
        <h4 className="font-heading text-lg text-night">{author.name}</h4>
        <p className="font-body text-xs font-semibold uppercase tracking-[0.15em] text-text-muted">{author.role}</p>
        <p className="mt-2 font-body text-sm leading-relaxed text-text-muted">{author.bio}</p>
        {author.social && (
          <div className="mt-3 flex gap-3">
            {author.social.instagram && (
              <a href={author.social.instagram} className="font-body text-xs text-text-muted underline underline-offset-2 hover:text-primary transition-colors">
                Instagram
              </a>
            )}
            {author.social.twitter && (
              <a href={author.social.twitter} className="font-body text-xs text-text-muted underline underline-offset-2 hover:text-primary transition-colors">
                Twitter
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
