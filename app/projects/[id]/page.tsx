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
import { Feature, Scenario } from "@/app/lib/type";

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

async function getFeatures(
  projectId: number,
  token: string
): Promise<Feature[]> {
  try {
    const res = await fetch(
      `http://localhost:4000/api/features?projectId=${projectId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store",
      }
    );
    if (!res.ok) return [];
    const rawData = await res.json();
    return extractData(rawData);
  } catch (error) {
    console.error("Gagal fetch features di server:", error);
    return [];
  }
}

async function getScenarios(token: string): Promise<Scenario[]> {
  try {
    const res = await fetch("http://localhost:4000/api/scenarios", {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    if (!res.ok) return [];
    const rawData = await res.json();
    return extractData(rawData);
  } catch (error) {
    console.error("Gagal fetch scenarios di server:", error);
    return [];
  }
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
          <TestScenarioDocumentCard />
        </Suspense>
        <SubmitFeedbackCard
          projectId={projectId}
          token={token}
          initialFeatures={initialFeatures}
          initialScenarios={initialScenarios}
        />
        <HistoryFeedbackCard
          projectId={projectId}
          token={token}
          initialFeatures={initialFeatures}
          initialScenarios={initialScenarios}
        />
      </main>
    </>
  );
};

export default ProjectDetailPage;
