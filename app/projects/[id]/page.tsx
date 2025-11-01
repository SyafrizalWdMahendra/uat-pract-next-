import { Suspense } from "react";
import {
  ProjectInfoSkeleton,
  TestScenariosSkeleton,
} from "@/app/components/Utility/Skeleton";
import CardProjectDetail from "@/app/components/ProjectDetail/ProjectDetail";
import TestScenarioDocumentCard from "@/app/components/ProjectDetail/TestScenarioDocument";
import FeedbackSection from "@/app/components/ProjectDetail/FeedbackSection";
import { GetProjectCookies } from "@/app/lib/Projects/cookies";

const ProjectDetailPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const cookie = GetProjectCookies({ params });
  return (
    <>
      <main className="mt-21.5 p-4 lg:p-8">
        {" "}
        <Suspense fallback={<ProjectInfoSkeleton />}>
          <CardProjectDetail params={params} />
        </Suspense>
        <Suspense fallback={<TestScenariosSkeleton />}>
          <TestScenarioDocumentCard
            projectId={(await cookie).projectId}
            token={(await cookie).token}
          />
        </Suspense>
        <FeedbackSection
          projectId={(await cookie).projectId}
          token={(await cookie).token}
          userId={(await cookie).loggedInUserId}
          initialFeatures={(await cookie).initialFeatures || []}
          initialScenarios={(await cookie).initialScenarios || []}
        />
      </main>
    </>
  );
};

export default ProjectDetailPage;
