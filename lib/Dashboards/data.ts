import { fetchApiServer } from "@/utils/fetchApiServer";
import { IProject, IStats } from "../../utils/type";

export const getStats = (token: string): Promise<IStats | null> => {
  return fetchApiServer<IStats>("/dashboard/statistics", token);
};

export const getProject = (token: string): Promise<IProject[] | null> => {
  return fetchApiServer<IProject[]>("/dashboard/currentProject", token);
};
