import { Suspense } from "react";
import { CardSkeleton } from "@/app/components/Dashboards/Skeleton";
import CardProjectDetail from "@/app/components/ProjectDetail/ProjectDetail";

const ProjectDetailPage = ({ params }: { params: Promise<{ id: string }> }) => {
  return (
    <>
      <main className="mt-24 p-4 lg:p-8">
        {" "}
        <Suspense fallback={<CardSkeleton />}>
          <CardProjectDetail params={params} />
        </Suspense>
      </main>
    </>
  );
};

export default ProjectDetailPage;
