import { API_BASE_URL } from "@/utils/cons";
import { cookies } from "next/headers";

export async function fetchApi<T>(path: string): Promise<T | null> {
  const token = (await cookies()).get("token")?.value;

  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  if (token) {
    headers.append("Authorization", `Bearer ${token}`);
  }

  try {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      method: "GET",
      headers,
      credentials: "include",
    });

    if (!response.ok) {
      console.warn(
        `[fetchApi] Gagal fetch ${path}: ${response.status} ${response.statusText}`
      );
      return null;
    }

    const rawData = await response.json();

    if (rawData.payload && typeof rawData.payload.data !== "undefined") {
      return rawData.payload.data as T;
    } else {
      console.warn(
        `[fetchApi] Respons API untuk ${path} tidak memiliki 'payload.data'.`
      );
      return null;
    }
  } catch (error) {
    console.error(`[fetchApi] Error saat fetching ${path}:`, error);
    return null;
  }
}
