import { Feature, Scenario } from "../../utils/type";
import { fetchApiServer } from "@/utils/fetchApiServer";

export const getFeatures = (
  projectId: number,
  token: string
): Promise<Feature[] | null> => {
  return fetchApiServer<Feature[]>(`/features?projectId=${projectId}`, token);
};

export const getScenarios = (token: string): Promise<Scenario[] | null> => {
  return fetchApiServer<Scenario[]>(`/scenarios`, token);
};
