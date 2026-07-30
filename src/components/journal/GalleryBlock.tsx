export function GalleryBlock({ images }: { images: { src: string; alt: string; caption?: string }[] }) {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        {images.map((img, i) => (
          <figure key={i} className="overflow-hidden rounded-lg bg-gradient-to-br from-primary/10 via-accent/5 to-night/10">
            <div className="aspect-[4/3] flex items-center justify-center">
              <p className="font-heading text-white/20">{img.alt}</p>
            </div>
            {img.caption && (
              <figcaption className="px-4 py-2 font-body text-xs text-text-muted italic">
                {img.caption}
              </figcaption>
            )}
          </figure>
        ))}
      </div>
    </div>
  )
}
