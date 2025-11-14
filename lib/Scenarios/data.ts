import { fetchApi } from "../datas";
import { ScenarioDocs } from "../../utils/type";

export const getScenarioDocs = (
  projectId: number,
  token: string
): Promise<ScenarioDocs | null> => {
  return fetchApi<ScenarioDocs>(`/scenarioDocs/${projectId}`);
};
