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

// --- Tipe data (bisa Anda letakkan di file terpisah) ---
interface Feature {
  id: number;
  project_id: number;
  title: string;
}
interface Scenario {
  id: number;
  feature_id: number;
  test_case: string;
}

/**
 * Helper function untuk mengekstrak data,
 * baik dari { data: [...] } atau [...]
 */
// FUNGSI BARU (BENAR)
// Salin dan tempel ini di page.tsx Anda
function extractData(response: any): any[] {
  // Cek jika struktur baru Anda ada
  if (response && response.payload && Array.isArray(response.payload.data)) {
    return response.payload.data;
  }

  // Cek struktur lama (untuk jaga-jaga)
  if (Array.isArray(response)) {
    return response;
  }
  if (response && Array.isArray(response.data)) {
    return response.data;
  }

  return [];
}

// --- Fungsi untuk fetch data ---
async function getFeatures(
  projectId: number,
  token: string
): Promise<Feature[]> {
  try {
    const res = await fetch(
      `http://localhost:4000/api/features?projectId=${projectId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store", // Selalu ambil data terbaru
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

  // 1. Ambil token (seperti kode Anda)
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) {
    redirect("/login");
  }

  // 2. Fetch data di server SECARA BERSAMAAN
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
      </main>
    </>
  );
};

export default ProjectDetailPage;
