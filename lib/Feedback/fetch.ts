import { GetFeedbackDetailCookie } from "../FeedbackDetail/cookies";

export const getFeedbackData = async (params: { id: string }) => {
  const { feedHistoryDetails, token } = await GetFeedbackDetailCookie({
    params,
  });
  return { feedHistoryDetails, token };
};
