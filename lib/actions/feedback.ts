"use server";

import { cookies } from "next/headers";
import { API_BASE_URL } from "@/utils/cons";
import { FormState } from "../../utils/type";
import { revalidatePath } from "next/cache";

export async function deleteFeedbackAction(
  feedbackId: number,
  projectId: number
): Promise<FormState> {
  if (!API_BASE_URL) {
    console.error("API_BASE_URL is not set");
    return { success: false, message: "Konfigurasi server error." };
  }

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    console.error("Server Action: Token not found.");
    return { success: false, message: "Autentikasi gagal." };
  }

  try {
    const response = await fetch(
      `${API_BASE_URL}/api/feedback-history/${feedbackId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.ok) {
      revalidatePath(`/projects/${projectId}`, "layout");

      return { success: true, message: "Feedback deleted successfully! ✅" };
    } else {
      console.error(
        "Server Action: Failed to delete feedback:",
        response.statusText
      );
      return {
        success: false,
        message: `Failed to delete feedback 😢: ${response.statusText}`,
      };
    }
  } catch (error) {
    console.error("Server Action: An error occurred:", error);
    return {
      success: false,
      message: "Internal server error.",
    };
  }
}
