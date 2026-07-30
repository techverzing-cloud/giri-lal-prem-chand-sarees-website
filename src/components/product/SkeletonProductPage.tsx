export function SkeletonProductPage() {
  return (
    <div className="min-h-screen pt-24 md:pt-28">
      <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
        <div className="h-5 w-48 animate-pulse rounded bg-night/5" />
        <div className="mt-8 grid gap-12 lg:grid-cols-2">
          <div className="aspect-[3/4] animate-pulse rounded-lg bg-night/5" />
          <div className="space-y-6">
            <div className="h-4 w-32 animate-pulse rounded bg-night/5" />
            <div className="h-10 w-3/4 animate-pulse rounded bg-night/5" />
            <div className="h-20 w-full animate-pulse rounded bg-night/5" />
            <div className="h-14 w-48 animate-pulse rounded bg-night/5" />
            <div className="grid grid-cols-2 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-12 animate-pulse rounded bg-night/5" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
