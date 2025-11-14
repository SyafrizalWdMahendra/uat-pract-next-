import { fetchApiServer } from "@/utils/fetchApiServer";
import { IProjectDetail } from "../../utils/type";

export const getProjectById = (
  id: string | number,
  token: string
): Promise<IProjectDetail | null> => {
  return fetchApiServer<IProjectDetail>(`/projectInformations/${id}`, token);
};
