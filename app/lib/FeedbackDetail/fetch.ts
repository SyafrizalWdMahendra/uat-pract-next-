import { API_BASE_URL } from "@/app/utils/cons";
import { FeedbackHistoryPayload } from "@/app/lib/type";

/**
 * 1. PERBARUI 'UpdatePayload' agar cocok dengan Zod Schema
 */
interface UpdatePayload {
  feedback_description: string;
  feedback_status: string;
  feedback_priority: string;
  feature_title: string; // Kirim 'title' (string)
  test_scenario_code: string | null; // Kirim 'code' (string) atau null
}

/**
 * Argumen yang dibutuhkan oleh fungsi submit.
 */
interface SubmitArgs {
  feedbackId: number | string;
  payload: UpdatePayload; // 'payload' sekarang menggunakan tipe baru
  token: string;
}

/**
 * Fungsi ini menangani submit 'PATCH' untuk memperbarui feedback.
 */
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
