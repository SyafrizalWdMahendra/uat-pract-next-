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
    <div className="flex bg-white p-5 rounded-lg shadow-md border border-gray-200 justify-between m-5 mt-8">
      <div className="w-max">
        {/* Placeholder untuk Title (text-sm) */}
        <SkeletonBar className="h-4 w-24" />

        {/* Placeholder untuk Value (text-3xl, mt-1) */}
        <SkeletonBar className="h-8 w-16 mt-1" />
      </div>

      {/* 3. Placeholder untuk Ikon (Kanan) */}
      {/* Wrapper dipertahankan untuk alignment (justify-end, items-center) */}
      <div className="w-20 p-0 flex justify-end items-center">
        {/* Placeholder ikon (bulat) */}
        <SkeletonBar className="w-12 h-12 rounded-full" />
      </div>
    </div>
  );
};

export const StatsCardSkeleton = () => {
  return (
    <>
      <StatGridSkeleton></StatGridSkeleton>
      <StatGridSkeleton></StatGridSkeleton>
      <StatGridSkeleton></StatGridSkeleton>
    </>
  );
};
/**
 * Skeleton untuk current project card.
 */
export const ProjectCardSkeleton = () => {
  return (
    <div className="block w-full rounded-lg border-0 shadow-lg bg-white p-5 m-5 mt-45">
      <div className="flex flex-col gap-3">
        {/* Bagian Atas: Judul dan Badge */}
        <div className="flex flex-wrap justify-between items-start gap-2">
          {/* Placeholder Judul (text-xl) */}
          <SkeletonBar className="h-6 w-3/5" />

          {/* Placeholder Badge */}
          <div className="flex gap-2 shrink-0">
            <SkeletonBar className="h-5 w-16 rounded-full" />
            <SkeletonBar className="h-5 w-20 rounded-full" />
          </div>
        </div>

        {/* Placeholder Deskripsi (line-clamp-2) */}
        <div className="space-y-1.5">
          <SkeletonBar className="h-4 w-full" />
          <SkeletonBar className="h-4 w-5/6" />
        </div>

        {/* Divider Statis */}
        <hr className="my-2 border-gray-100" />

        {/* Placeholder Info Stats (text-sm) */}
        <div className="flex gap-x-4 gap-y-1 flex-wrap text-sm font-medium">
          <SkeletonBar className="h-4 w-24" />
          <SkeletonBar className="h-4 w-28" />
        </div>

        {/* Placeholder Footer (text-xs) */}
        <div className="flex flex-wrap justify-between items-center text-xs text-gray-500 mt-2 gap-2">
          <SkeletonBar className="h-3 w-20" />
          <SkeletonBar className="h-3 w-24" />
        </div>
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
      {/* Skeleton Header */}
      <div className="flex items-center mb-6">
        <SkeletonBar className="w-5 h-6 rounded-md mr-2" />
        <SkeletonBar className="h-6 w-1/2" />
      </div>

      {/* Skeleton Grid Info */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        {/* Item 1 */}
        <div className="flex items-start">
          <SkeletonBar className="w-5 h-5 rounded-md mr-3 mt-1 shrink-0" />
          <div>
            <SkeletonBar className="h-3 w-20" />
            <SkeletonBar className="h-5 w-28 mt-1.5" />
          </div>
        </div>
        {/* Item 2 */}
        <div className="flex items-start">
          <SkeletonBar className="w-5 h-5 rounded-md mr-3 mt-1 shrink-0" />
          <div>
            <SkeletonBar className="h-3 w-16" />
            <SkeletonBar className="h-5 w-24 mt-1.5" />
          </div>
        </div>
        {/* Item 3 */}
        <div className="flex items-start">
          <SkeletonBar className="w-5 h-5 rounded-md mr-3 mt-1 shrink-0" />
          <div>
            <SkeletonBar className="h-3 w-16" />
            <SkeletonBar className="h-5 w-20 mt-1.5" />
          </div>
        </div>
        {/* Item 4 */}
        <div className="flex items-start">
          <SkeletonBar className="w-5 h-5 rounded-md mr-3 mt-1 shrink-0" />
          <div>
            <SkeletonBar className="h-3 w-16" />
            <SkeletonBar className="h-5 w-20 mt-1.5" />
          </div>
        </div>
      </div>

      {/* Skeleton Grid Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Stat Card 1 */}
        <div className="bg-gray-100 border border-gray-200 p-4 rounded-lg flex items-start">
          <SkeletonBar className="w-5 h-5 rounded-md bg-gray-300 mr-3 mt-1 shrink-0" />
          <div>
            <SkeletonBar className="h-4 w-20 bg-gray-300" />
            <SkeletonBar className="h-7 w-12 bg-gray-300 mt-1.5" />
          </div>
        </div>
        {/* Stat Card 2 */}
        <div className="bg-gray-100 border border-gray-200 p-4 rounded-lg flex items-start">
          <SkeletonBar className="w-5 h-5 rounded-md bg-gray-300 mr-3 mt-1 shrink-0" />
          <div>
            <SkeletonBar className="h-4 w-24 bg-gray-300" />
            <SkeletonBar className="h-7 w-16 bg-gray-300 mt-1.5" />
          </div>
        </div>
        {/* Stat Card 3 */}
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
      {/* Bagian Header Skeleton */}
      <div className="flex items-center mb-6">
        <div className="w-full">
          <div className="flex items-center">
            {/* Placeholder Ikon File */}
            <SkeletonBar className="w-6 h-6 mr-2" />
            {/* Placeholder Judul H1 */}
            <SkeletonBar className="h-6 w-3/5" />
          </div>
          {/* Placeholder Subjudul */}
          <SkeletonBar className="h-3 w-full mt-3" />
          <SkeletonBar className="h-3 w-4/5 mt-1" />
        </div>
      </div>

      {/* Wrapper untuk card-card di bawah */}
      <div className="flex flex-col gap-5">
        {/* Skeleton untuk Kartu Biru */}
        {/* 'animate-pulse' dihapus dari container ini karena elemen anak sudah memilikinya */}
        <div className="bg-gray-100 border border-gray-200 p-4 rounded-lg md:flex items-center justify-between gap-5 h-max">
          {/* Bagian Konten Kiri Skeleton */}
          <div className="p-3 w-full md:w-auto">
            <div className="flex-col lg:w-full">
              {/* Placeholder Judul Kartu Biru */}
              <SkeletonBar className="h-5 bg-gray-300 w-1/2" />
              {/* Placeholder Deskripsi Kartu Biru */}
              <SkeletonBar className="h-3 bg-gray-300 w-full mt-2" />
              <SkeletonBar className="h-3 bg-gray-300 w-3/4 mt-1" />
            </div>

            {/* Placeholder untuk 3 item (step-by-step, dll) */}
            <div className="flex flex-wrap gap-3 mt-3">
              {/* Item 1 */}
              <div className="flex lg:w-max items-center">
                <SkeletonBar className="w-6 h-6 bg-gray-300 rounded-full mr-2" />
                <SkeletonBar className="h-4 bg-gray-300 w-32" />
              </div>
              {/* Item 2 */}
              <div className="flex lg:w-max items-center">
                <SkeletonBar className="w-5 h-6 bg-gray-300 rounded-full mr-2" />
                <SkeletonBar className="h-4 bg-gray-300 w-24" />
              </div>
              {/* Item 3 */}
              <div className="flex lg:w-max items-center">
                <SkeletonBar className="w-6 h-6 bg-gray-300 rounded-full mr-2" />
                <SkeletonBar className="h-4 bg-gray-300 w-28" />
              </div>
            </div>
          </div>

          {/* Bagian Tombol Kanan Skeleton */}
          <div className="flex h-max items-center w-full md:w-auto justify-center md:justify-start mt-4 md:mt-0">
            {/* Placeholder untuk Tombol/Link (meniru bg-transparent dan border) */}
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
