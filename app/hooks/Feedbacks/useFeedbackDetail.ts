import { FeedbackData, FeedbackDetailProps } from "@/app/lib/type";
import { useEffect, useState } from "react";

export const useFeedbackDetail = ({
  feedbackId,
  token,
}: FeedbackDetailProps) => {
  const [feedback, setFeedback] = useState<FeedbackData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!feedbackId || !token) {
      setError("Feedback ID atau Token tidak valid.");
      setIsLoading(false);
      return;
    }

    const fetchFeedbackDetail = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `http://localhost:4000/api/feedback-history/details/${feedbackId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || `Error: ${response.status}`);
        }

        setFeedback(result.payload.data);
      } catch (err: any) {
        setError(err.message || "Terjadi kesalahan saat mengambil data.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeedbackDetail();
  }, [feedbackId, token]);

  return {
    feedback,
    isLoading,
    error,
  };
};
