import { useEffect, useState, useCallback } from "react";
import { API_BASE_URL } from "../../utils/cons";
import { FeedbackHistoryPayload } from "../../lib/type";

export const useFeedbackData = (projectId: number, token: string) => {
  const [allFeedbacks, setAllFeedbacks] = useState<FeedbackHistoryPayload[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchFeedbacks = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const url = new URL(`${API_BASE_URL}/api/feedback-history`);
      url.searchParams.append("projectId", String(projectId));

      const response = await fetch(url.toString(), {
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
  }, [projectId, token]);

  useEffect(() => {
    fetchFeedbacks();
  }, [fetchFeedbacks]);

  return { allFeedbacks, isLoading, error, refreshFeedbacks: fetchFeedbacks };
};
