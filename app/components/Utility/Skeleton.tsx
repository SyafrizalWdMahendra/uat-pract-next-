const SkeletonBar = ({ className }: { className: string }) => (
  <div
    className={`animate-pulse bg-gray-200 rounded-md ${className}`}
    aria-hidden="true"
  />
);

/**
 * Skeleton untuk statistic card.
 */
const StatGridSkeleton = () => {
  return (
    <div className="flex bg-white p-5 rounded-lg shadow-md border border-gray-200 justify-between">
      <div className="w-max">
        <SkeletonBar className="h-4 w-24" />
        <SkeletonBar className="h-8 w-16 mt-1" />
      </div>

      <div className="w-20 p-0 flex justify-end items-center">
        <SkeletonBar className="w-12 h-12 rounded-full" />
      </div>
    </div>
  );
};

/**
 * Sekelton wrapper untuk statistic card.
 */
export const StatsCardSkeleton = () => {
  return (
    <div className="lg:p-4 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:pt-8 md:p-4 sm:p-4 md:mt-3.5 lg:pt-4 xl:pt-4 xl:p-8 pt-8 p-4">
      <StatGridSkeleton />
      <StatGridSkeleton />
      <StatGridSkeleton />
      <StatGridSkeleton />
    </div>
  );
};

/**
 * Skeleton untuk current project card.
 */

export const ProjectCardSkeleton = () => {
  return (
    <div className="flex flex-col bg-white p-6 rounded-xl shadow-md border border-gray-200 w-full">
      <div className="flex justify-between items-center mb-4">
        <div>
          <SkeletonBar className="h-6 w-48 mb-2" />
          <SkeletonBar className="h-4 w-72" />
        </div>
        <div className="flex gap-2">
          <SkeletonBar className="h-4 w-10 rounded-full" />
          <SkeletonBar className="h-4 w-10 rounded-full" />
        </div>
      </div>
      <SkeletonBar className="h-px w-full my-4" />
      <div className="flex justify-between mt-2">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <SkeletonBar className="h-4 w-20" />
            <SkeletonBar className="h-4 w-6" />
          </div>
          <div className="flex items-center gap-2">
            <SkeletonBar className="h-4 w-20" />
            <SkeletonBar className="h-4 w-6" />
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <SkeletonBar className="h-4 w-32" />
          <SkeletonBar className="h-4 w-28" />
        </div>
      </div>
    </div>
  );
};

/**
 * Skeleton wrapper untuk current project card
 */
export const CurrentProjectSkeleton = () => {
  return (
    <div className="sm:p-4 w-full md:p-4 lg:mt-6 xl:mt-2 md:mt-2 sm:mt-2 lg:p-4 lg:pt-0 xl:p-8 xl:pt-0 p-4">
      <div className="flex items-center w-full gap-3 mb-3">
        <SkeletonBar className="h-8 w-64" />
        <SkeletonBar className="h-6 w-24" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {[...Array(2)].map((_, i) => (
          <ProjectCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
};

/**
 * Skeleton untuk project information card
 */
export const ProjectInfoSkeleton = () => {
  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 mb-8">
      <div className="flex items-center mb-6">
        <SkeletonBar className="w-5 h-6 rounded-md mr-2" />
        <SkeletonBar className="h-6 w-1/2" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        <div className="flex items-start">
          <SkeletonBar className="w-5 h-5 rounded-md mr-3 mt-1 shrink-0" />
          <div>
            <SkeletonBar className="h-3 w-20" />
            <SkeletonBar className="h-5 w-28 mt-1.5" />
          </div>
        </div>
        <div className="flex items-start">
          <SkeletonBar className="w-5 h-5 rounded-md mr-3 mt-1 shrink-0" />
          <div>
            <SkeletonBar className="h-3 w-16" />
            <SkeletonBar className="h-5 w-24 mt-1.5" />
          </div>
        </div>
        <div className="flex items-start">
          <SkeletonBar className="w-5 h-5 rounded-md mr-3 mt-1 shrink-0" />
          <div>
            <SkeletonBar className="h-3 w-16" />
            <SkeletonBar className="h-5 w-20 mt-1.5" />
          </div>
        </div>
        <div className="flex items-start">
          <SkeletonBar className="w-5 h-5 rounded-md mr-3 mt-1 shrink-0" />
          <div>
            <SkeletonBar className="h-3 w-16" />
            <SkeletonBar className="h-5 w-20 mt-1.5" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-100 border border-gray-200 p-4 rounded-lg flex items-start">
          <SkeletonBar className="w-5 h-5 rounded-md bg-gray-300 mr-3 mt-1 shrink-0" />
          <div>
            <SkeletonBar className="h-4 w-20 bg-gray-300" />
            <SkeletonBar className="h-7 w-12 bg-gray-300 mt-1.5" />
          </div>
        </div>
        <div className="bg-gray-100 border border-gray-200 p-4 rounded-lg flex items-start">
          <SkeletonBar className="w-5 h-5 rounded-md bg-gray-300 mr-3 mt-1 shrink-0" />
          <div>
            <SkeletonBar className="h-4 w-24 bg-gray-300" />
            <SkeletonBar className="h-7 w-16 bg-gray-300 mt-1.5" />
          </div>
        </div>
        <div className="bg-gray-100 border border-gray-200 p-4 rounded-lg flex items-start">
          <SkeletonBar className="w-5 h-5 rounded-md bg-gray-300 mr-3 mt-1 shrink-0" />
          <div>
            <SkeletonBar className="h-4 w-16 bg-gray-300" />
            <SkeletonBar className="h-7 w-20 bg-gray-300 mt-1.5" />
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Skeleton untuk test scenario document card.
 */
export const TestScenariosSkeleton = () => {
  return (
    <div className="bg-white p-6 rounded-lg mb-3">
      <div className="flex items-center mb-6">
        <div className="w-full">
          <div className="flex items-center">
            <SkeletonBar className="w-6 h-6 mr-2" />
            <SkeletonBar className="h-6 w-3/5" />
          </div>
          <SkeletonBar className="h-3 w-full mt-3" />
          <SkeletonBar className="h-3 w-4/5 mt-1" />
        </div>
      </div>

      <div className="flex flex-col gap-5">
        <div className="bg-gray-100 border border-gray-200 p-4 rounded-lg md:flex items-center justify-between gap-5 h-max">
          <div className="p-3 w-full md:w-auto">
            <div className="flex-col lg:w-full">
              <SkeletonBar className="h-5 bg-gray-300 w-1/2" />
              <SkeletonBar className="h-3 bg-gray-300 w-full mt-2" />
              <SkeletonBar className="h-3 bg-gray-300 w-3/4 mt-1" />
            </div>

            <div className="flex flex-wrap gap-3 mt-3">
              <div className="flex lg:w-max items-center">
                <SkeletonBar className="w-6 h-6 bg-gray-300 rounded-full mr-2" />
                <SkeletonBar className="h-4 bg-gray-300 w-32" />
              </div>
              <div className="flex lg:w-max items-center">
                <SkeletonBar className="w-5 h-6 bg-gray-300 rounded-full mr-2" />
                <SkeletonBar className="h-4 bg-gray-300 w-24" />
              </div>
              <div className="flex lg:w-max items-center">
                <SkeletonBar className="w-6 h-6 bg-gray-300 rounded-full mr-2" />
                <SkeletonBar className="h-4 bg-gray-300 w-28" />
              </div>
            </div>
          </div>

          <div className="flex h-max items-center w-full md:w-auto justify-center md:justify-start mt-4 md:mt-0">
            <div className="items-center bg-transparent border-gray-300 border flex rounded-sm pt-2 pl-4 pb-2 pr-4 gap-4">
              <SkeletonBar className="w-6 h-6 bg-gray-300 rounded-full" />
              <SkeletonBar className="h-4 bg-gray-300 w-16" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// export default function HeroSkeleton() {
//   return (
//     <div className="max-w-[300px] w-full flex items-center gap-3">
//       <div>
//         <Skeleton className="flex rounded-full w-12 h-12" />
//       </div>
//       <div className="w-full flex flex-col gap-2">
//         <Skeleton className="h-3 w-3/5 rounded-lg" />
//         <Skeleton className="h-3 w-4/5 rounded-lg" />
//       </div>
//     </div>
//   );
// }
