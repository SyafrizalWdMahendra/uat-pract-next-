const SkeletonBar = ({ className }: { className: string }) => (
  <div
    className={`animate-pulse bg-gray-200 rounded-md ${className}`}
    aria-hidden="true"
  />
);

/**
 * Skeleton untuk SATU 'Stat Card' kecil (tetap sama).
 */
const StatCardSkeleton = () => (
  <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
    <SkeletonBar className="h-4 w-2/5" />
    <SkeletonBar className="h-8 w-1/4 mt-2" />
  </div>
);

/**
 * Skeleton untuk SATU 'Project Card' besar (diperbarui).
 */
export const CardSkeleton = () => (
  <div className="block w-full bg-white rounded-lg shadow-lg border-0 p-5">
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap justify-between items-start gap-2">
        <SkeletonBar className="h-6 w-3/5" />
        <div className="flex gap-2 shrink-0">
          {" "}
          <SkeletonBar className="h-5 w-12" />
          <SkeletonBar className="h-5 w-12" />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <SkeletonBar className="h-4 w-full" />
        <SkeletonBar className="h-4 w-4/5" />
      </div>

      <hr className="my-2 border-gray-100" />

      <div className="flex gap-x-4">
        <SkeletonBar className="h-4 w-1/3" />
        <SkeletonBar className="h-4 w-1/3" />
      </div>

      <div className="flex flex-wrap justify-between items-center mt-2 gap-2">
        <SkeletonBar className="h-5 w-1/3" />
        <SkeletonBar className="h-4 w-1/4" />
      </div>
    </div>
  </div>
);

export const StatsGridSkeleton = () => (
  <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-4">
    <StatCardSkeleton />
    <StatCardSkeleton />
    <StatCardSkeleton />
  </div>
);
