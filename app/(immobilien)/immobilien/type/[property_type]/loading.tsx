export default function TypePageLoading() {
  return (
    <div className="pt-24">
      <div className="mx-auto w-full max-w-7xl px-6 py-12 md:px-8">
        {/* Header Skeleton */}
        <div className="mb-12 space-y-4">
          <div className="h-10 w-64 animate-pulse bg-[--card]" />
          <div className="h-5 w-96 animate-pulse bg-[--card]" />
        </div>

        {/* Filter Skeleton */}
        <div className="mb-8 flex gap-4">
          <div className="h-10 w-32 animate-pulse bg-[--card]" />
          <div className="h-10 w-32 animate-pulse bg-[--card]" />
        </div>

        {/* Property Grid Skeleton */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="space-y-4">
              <div className="h-56 animate-pulse bg-[--card]" />
              <div className="space-y-2 p-4">
                <div className="h-5 w-3/4 animate-pulse bg-[--card]" />
                <div className="h-4 w-1/2 animate-pulse bg-[--card]" />
                <div className="h-4 w-1/3 animate-pulse bg-[--card]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
