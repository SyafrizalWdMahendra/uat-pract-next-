import { API_BASE_URL } from "@/utils/cons";

export async function fetchApi<T>(
  path: string,
  token: string
): Promise<T | null> {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", `Bearer ${token}`);

  try {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      method: "GET",
      headers: headers,
      credentials: "include",
    });

    if (!response.ok) {
      console.warn(
        `[fetchApi] Gagal fetch ${path}: ${response.status} ${response.statusText}`
      );
      return null;
    }

    const rawData = await response.json();

    console.log("[fetchApi] RAW RESPONSE", path, rawData);

    const data =
      rawData.payload?.data ??
      rawData.payload ??
      rawData.data ??
      rawData ??
      null;

    return data as T;
  } catch (error) {
    console.error(`[fetchApi] Error saat fetching ${path}:`, error);
    return null;
  }
}
