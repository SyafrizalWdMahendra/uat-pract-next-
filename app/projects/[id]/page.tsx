import { Suspense } from "react";
import {
  ProjectInfoSkeleton,
  TestScenariosSkeleton,
} from "@/app/components/Dashboards/Skeleton";
import CardProjectDetail from "@/app/components/ProjectDetail/ProjectDetail";
import TestScenarioDocumentCard from "@/app/components/ProjectDetail/TestScenarioDocument";
import SubmitFeedbackCard from "@/app/components/ProjectDetail/SubmitFeedback";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import HistoryFeedbackCard from "@/app/components/ProjectDetail/HistoryFeedback";
import { Feature as CustomFeature } from "@/app/lib/type";
import { getFeatures, getScenarios } from "@/app/lib/data";

/**
 * Helper function untuk mengekstrak data,
 * baik dari { data: [...] } atau [...]
 */
function extractData(response: any): any[] {
  if (response && response.payload && Array.isArray(response.payload.data)) {
    return response.payload.data;
  }

  if (Array.isArray(response)) {
    return response;
  }
  if (response && Array.isArray(response.data)) {
    return response.data;
  }

  return [];
}

const ProjectDetailPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const projectId = Number((await params).id);

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) {
    redirect("/login");
  }

  const loggedInUserId = cookieStore.get("userId")
    ? Number(cookieStore.get("userId")?.value)
    : undefined;

  const [initialFeatures, initialScenarios] = await Promise.all([
    getFeatures(projectId, token),
    getScenarios(token),
  ]);

  return (
    <>
      <main className="mt-21.5 p-4 lg:p-8">
        {" "}
        <Suspense fallback={<ProjectInfoSkeleton />}>
          <CardProjectDetail params={params} />
        </Suspense>
        <Suspense fallback={<TestScenariosSkeleton />}>
          <TestScenarioDocumentCard projectId={projectId} token={token} />
        </Suspense>
        <SubmitFeedbackCard
          projectId={projectId}
          userId={loggedInUserId}
          token={token}
          initialFeatures={initialFeatures as CustomFeature[] | null}
          initialScenarios={initialScenarios}
        />
        <HistoryFeedbackCard
          projectId={projectId}
          token={token}
          initialFeatures={initialFeatures as CustomFeature[] | null}
          initialScenarios={initialScenarios}
        />
      </main>
    </>
  );
};

export default ProjectDetailPage;
