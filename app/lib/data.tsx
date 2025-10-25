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

const baseUrl = "http://localhost:4000/api/dashboard/statistics";
const projectUrl = "http://localhost:4000/api/dashboard/currentProject";

const getStats = async (token: string): Promise<IStats | null> => {
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
};

const getProject = async (token: string): Promise<IProject | null> => {
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
};

export { getStats, getProject };
