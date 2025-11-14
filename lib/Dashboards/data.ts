import { fetchApi } from "@/utils/fetchApi";
import { IProject, IStats } from "../../utils/type";

export const getStats = (): Promise<IStats | null> => {
  return fetchApi<IStats>("/dashboard/statistics");
};

export const getProject = (): Promise<IProject[] | null> => {
  return fetchApi<IProject[]>("/dashboard/currentProject");
};
