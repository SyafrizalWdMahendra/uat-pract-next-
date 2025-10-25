import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import CardStats from "../components/Dashboards/CardStats";
import CardProject from "../components/Dashboards/CardProject";

const baseUrl = "http://localhost:4000/api/dashboard/statistics";
const projectUrl = "http://localhost:4000/api/dashboard/currentProject";

interface IStats {
  activeProjects: number;
  totalFeatures: number;
  totalTestScenarios: number;
}

interface IProject {
  id: number;
  title: string;
  description: string;
  priority: string;
  status: string;
  featureCount: number;
  testScenarioCount: number;
  duration: string;
  due_date: string;
}

async function getStats(token: string): Promise<IStats | null> {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", `Bearer ${token}`);
  try {
    const response = await fetch(baseUrl, {
      method: "GET",
      headers: headers,
      cache: "no-store",
    });
    if (!response.ok) {
      console.warn("Autentikasi gagal atau data tidak ditemukan.");
      return null;
    }
    const rawData = await response.json();
    console.log("[getStats] Menerima JSON mentah:", rawData);
    return rawData.payload.data;
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    return null;
  }
}

async function getProject(token: string): Promise<IProject | null> {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", `Bearer ${token}`);
  try {
    const response = await fetch(projectUrl, {
      method: "GET",
      headers: headers,
      cache: "no-store",
    });
    if (!response.ok) {
      console.warn("Autentikasi gagal atau data tidak ditemukan.");
      return null;
    }
    const rawData = await response.json();
    console.log("[getProject] Menerima JSON mentah:", rawData);
    return rawData.payload.data;
  } catch (error) {
    console.error("Error fetching dashboard project:", error);
    return null;
  }
}

const Dashboards = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  console.log(
    "Token ditemukan:",
    token ? `...${token.slice(-6)}` : "TIDAK ADA TOKEN"
  );

  if (!token) {
    redirect("/login");
  }

  const [stats, projects] = await Promise.all([
    getStats(token),
    getProject(token),
  ]);

  console.log("Data stats yang diterima:", stats);
  console.log("Data projects yang diterima:", projects);

  if (!stats || !projects) {
    console.error("Gagal mengambil stats atau projects, merender pesan error.");
    return (
      <div className="p-4">
        <p className="text-red-500">
          Gagal memuat data dashboard. Sesi Anda mungkin telah berakhir.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <CardStats title="Active Projects" value={stats.activeProjects} />
        <CardStats title="Total Features" value={stats.totalFeatures} />
        <CardStats
          title="Total Test Scenarios"
          value={stats.totalTestScenarios}
        />
      </div>

      <div className="p-4 max-w-md">
        <h2 className="text-xl font-semibold mb-3">Current Active Project</h2>
        <CardProject
          id={projects.id}
          href={`/projects/${projects.id}`}
          title={projects.title}
          description={projects.description}
          priority={projects.priority}
          status={projects.status}
          featureCount={projects.featureCount}
          testScenarioCount={projects.testScenarioCount}
          duration={projects.duration}
          due_date={projects.due_date}
        />
      </div>
    </>
  );
};

export default Dashboards;
