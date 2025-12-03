export default function PropertyLoading() {
  return (
    <div className="pt-24">
      <div className="mx-auto w-full max-w-6xl px-6 py-12 md:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_380px]">
          {/* Gallery Skeleton */}
          <div className="space-y-4">
            <div className="h-[450px] animate-pulse bg-[--card] md:h-[550px]" />
            <div className="flex gap-3">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-20 w-28 animate-pulse bg-[--card]" />
              ))}
            </div>
          </div>

          {/* Info Skeleton */}
          <div className="space-y-6">
            <div className="h-8 w-3/4 animate-pulse bg-[--card]" />
            <div className="h-6 w-1/2 animate-pulse bg-[--card]" />
            <div className="space-y-2">
              <div className="h-4 w-full animate-pulse bg-[--card]" />
              <div className="h-4 w-5/6 animate-pulse bg-[--card]" />
              <div className="h-4 w-4/6 animate-pulse bg-[--card]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
