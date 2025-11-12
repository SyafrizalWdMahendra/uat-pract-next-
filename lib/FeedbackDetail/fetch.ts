import { API_BASE_URL } from "@/utils/cons";
import { FeedbackHistoryPayload } from "@/utils/type";

interface UpdatePayload {
  feedback_description: string;
  feedback_status: string;
  feedback_priority: string;
  feature_title: string;
  test_scenario_code: string | null;
}

interface SubmitArgs {
  feedbackId: number | string;
  payload: UpdatePayload;
  token: string;
}

export const onSubmitUpdate = async ({
  feedbackId,
  payload,
  token,
}: SubmitArgs): Promise<FeedbackHistoryPayload> => {
  const url = `${API_BASE_URL}/api/feedback-history/details/${feedbackId}`;

  try {
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Gagal memperbarui feedback");
    }

    return result.payload.data || result.payload || result;
  } catch (error) {
    console.error("Error saat memperbarui feedback:", error);
    throw error;
  }
};
