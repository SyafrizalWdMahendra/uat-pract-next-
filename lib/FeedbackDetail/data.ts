import { FeedbackHistoryPayload } from "../../utils/type";
import { fetchApiServer } from "@/utils/fetchApiServer";

export const getFeedbackHistoryDetails = async (
  id: string | number,
  token: string
): Promise<FeedbackHistoryPayload | null> => {
  return fetchApiServer<FeedbackHistoryPayload>(
    `/feedback-history/details/${id}`,
    token
  );
};
