import { fetchApi } from "../datas";
import { FeedbackHistoryPayload } from "../../utils/type";

export const getFeedbackHistoryDetails = async (
  id: string | number
): Promise<FeedbackHistoryPayload | null> => {
  return fetchApi<FeedbackHistoryPayload>(`/feedback-history/details/${id}`);
};
