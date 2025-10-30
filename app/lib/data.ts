import { Feature } from "next/dist/build/webpack/plugins/telemetry-plugin/telemetry-plugin";
import type {
  IProject,
  IStats,
  IProjectDetail,
  Scenario,
  ScenarioDocs,
} from "./type";

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

export const getProject = (token: string): Promise<IProject[] | null> => {
  return fetchApi<IProject[]>("/dashboard/currentProject", token);
};

export const getProjectById = (
  id: string | number,
  token: string
): Promise<IProjectDetail | null> => {
  return fetchApi<IProjectDetail>(`/projectInformations/${id}`, token);
};

export const getFeatures = (
  projectId: number,
  token: string
): Promise<Feature[] | null> => {
  return fetchApi<Feature[]>(`/features?projectId=${projectId}`, token);
};

export const getScenarios = (token: string): Promise<Scenario[] | null> => {
  return fetchApi<Scenario[]>(`/scenarios`, token);
};

export const getScenarioDocs = (
  projectId: number,
  token: string
): Promise<ScenarioDocs | null> => {
  return fetchApi<ScenarioDocs>(`/scenarioDocs/${projectId}`, token);
};
