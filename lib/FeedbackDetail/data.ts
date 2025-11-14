import { fetchApi } from "../datas";
import { FeedbackHistoryPayload } from "../../utils/type";

export const getFeedbackHistoryDetails = async (
  id: string | number,
  token: string
): Promise<FeedbackHistoryPayload | null> => {
  return fetchApi<FeedbackHistoryPayload>(
    `/feedback-history/details/${id}`,
    token
  );
};
