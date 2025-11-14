import { ScenarioDocs } from "../../utils/type";
import { fetchApiServer } from "@/utils/fetchApiServer";

export const getScenarioDocs = (
  projectId: number,
  token: string
): Promise<ScenarioDocs | null> => {
  return fetchApiServer<ScenarioDocs>(`/scenarioDocs/${projectId}`, token);
};
