import { fetchApi } from "../datas";
import { ScenarioDocs } from "../../utils/type";

export const getScenarioDocs = (
  projectId: number
): Promise<ScenarioDocs | null> => {
  return fetchApi<ScenarioDocs>(`/scenarioDocs/${projectId}`);
};
