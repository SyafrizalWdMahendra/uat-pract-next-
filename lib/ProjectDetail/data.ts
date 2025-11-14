import { IProjectDetail } from "../../utils/type";
import { fetchApi } from "../datas";

export const getProjectById = (
  id: string | number,
  token: string
): Promise<IProjectDetail | null> => {
  return fetchApi<IProjectDetail>(`/projectInformations/${id}`, token);
};
