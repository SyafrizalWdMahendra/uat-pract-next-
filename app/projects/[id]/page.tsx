import { Suspense } from "react";
import {
  ProjectInfoSkeleton,
  TestScenariosSkeleton,
} from "@/app/components/Dashboards/Skeleton";
import CardProjectDetail from "@/app/components/ProjectDetail/ProjectDetail";
import TestScenarioDocumentCard from "@/app/components/ProjectDetail/TestScenarioDocument";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getFeatures, getScenarios } from "@/app/lib/data";
import { Feature as CustomFeature, Scenario } from "@/app/lib/type";
import { jwtDecode, JwtPayload } from "jwt-decode";
import FeedbackSection from "@/app/components/ProjectDetail/FeedbackSection";

export const dynamic = "force-dynamic";

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

  let loggedInUserId: number | undefined = undefined;

  try {
    const decodedToken: JwtPayload = jwtDecode(token);
    loggedInUserId = decodedToken.userId;
  } catch (error) {
    console.error("Server Page: Gagal decode token:", error);
    redirect("/login");
  }

  const [featuresResponse, scenariosResponse] = await Promise.all([
    getFeatures(projectId, token),
    getScenarios(token),
  ]);

  const initialFeatures = extractData(featuresResponse) as CustomFeature[];
  const initialScenarios = extractData(scenariosResponse) as Scenario[];

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
        <FeedbackSection
          projectId={projectId}
          token={token}
          userId={loggedInUserId}
          initialFeatures={initialFeatures || []}
          initialScenarios={initialScenarios || []}
        />
      </main>
    </>
  );
};

export default ProjectDetailPage;
