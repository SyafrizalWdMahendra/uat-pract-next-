import { Suspense } from "react";
import { TestScenariosSkeleton } from "@/components/Utility/Skeleton";
import ProjectInformationCard from "@/components/Projects/ProjectInformationCard";
import FeedbackSection from "@/components/Feedbacks/FeedbackSection";
import { GetProjectCookies } from "@/lib/Projects/cookies";
import TestScenarioDocCard from "@/components/Projects/TestScenarioDocCard";
import { notFound } from "next/navigation";

const ProjectDetailPage = async ({
  params,
  title,
}: {
  params: Promise<{ id: string }>;
  title: string;
}) => {
  const cookie = await GetProjectCookies({ params });
  if (!cookie) {
    notFound();
  }
  return (
    <>
      <main className="mt-21.5 p-4 lg:p-8 min-h-dvh">
        {" "}
        <ProjectInformationCard params={params} />
        <Suspense fallback={<TestScenariosSkeleton />}>
          <TestScenarioDocCard
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
          title={title}
        />
      </main>
    </>
  );
};

export default ProjectDetailPage;
