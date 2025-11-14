import { fetchApi } from "../datas";
import { Feature, Scenario } from "../../utils/type";

export const getFeatures = (
  projectId: number,
  token: string
): Promise<Feature[] | null> => {
  return fetchApi<Feature[]>(`/features?projectId=${projectId}`);
};

export const getScenarios = (token: string): Promise<Scenario[] | null> => {
  return fetchApi<Scenario[]>(`/scenarios`);
};
