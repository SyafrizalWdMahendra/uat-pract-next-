import { fetchApi } from "../datas";
import { IProject, IStats } from "../../utils/type";

export const getStats = (token: string): Promise<IStats | null> => {
  return fetchApi<IStats>("/dashboard/statistics", token);
};

export const getProject = (token: string): Promise<IProject[] | null> => {
  return fetchApi<IProject[]>("/dashboard/currentProject", token);
};
