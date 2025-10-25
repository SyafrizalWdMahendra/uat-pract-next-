import { IProject, IStats } from "./type";

const API_BASE_URL = "http://localhost:4000/api";

async function fetchApi<T>(path: string, token: string): Promise<T | null> {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", `Bearer ${token}`);

  try {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      method: "GET",
      headers: headers,
      cache: "no-store",
    });

    if (!response.ok) {
      console.warn(
        `[fetchApi] Gagal fetch ${path}: ${response.status} ${response.statusText}`
      );
      return null;
    }

    const rawData = await response.json();
    console.log(`[fetchApi] Menerima JSON mentah untuk ${path}:`, rawData);

    if (rawData.payload && typeof rawData.payload.data !== "undefined") {
      return rawData.payload.data as T;
    } else {
      console.warn(
        `[fetchApi] Respons API untuk ${path} tidak memiliki 'payload.data'.`
      );
      return null;
    }
  } catch (error) {
    console.error(`[fetchApi] Error saat fetching ${path}:`, error);
    return null;
  }
}

export const getStats = (token: string): Promise<IStats | null> => {
  return fetchApi<IStats>("/dashboard/statistics", token);
};

export const getProject = (token: string): Promise<IProject | null> => {
  return fetchApi<IProject>("/dashboard/currentProject", token);
};
