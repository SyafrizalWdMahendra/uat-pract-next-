import { useEffect, useState } from "react";
import { API_BASE_URL } from "../utils/cons";
import { FeedbackHistoryPayload } from "../lib/type";

export const useFeedbackData = (token: string) => {
  const [allFeedbacks, setAllFeedbacks] = useState<FeedbackHistoryPayload[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`${API_BASE_URL}/api/feedback-history`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(
            errorData.message || `Failed to fetch feedback: ${response.status}`
          );
        }

        const data = await response.json();
        const feedbackData = Array.isArray(data)
          ? data
          : data.payload?.data || data.data || data.feedbacks || [];

        setAllFeedbacks(feedbackData);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to fetch feedback";
        console.error("Error fetching feedback:", err);
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeedbacks();
  }, [token]);

  return { allFeedbacks, isLoading, error };
};
