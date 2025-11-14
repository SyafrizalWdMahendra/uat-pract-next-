import { cookies } from "next/headers";
import { API_BASE_URL } from "@/utils/cons";

export async function fetchApi<T>(path: string): Promise<T | null> {
  const token = (await cookies()).get("token")?.value;

  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  if (token) {
    headers.append("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: "GET",
    headers,
    cache: "no-store",
  });

  if (!response.ok) return null;

  const json = await response.json();
  return json?.payload?.data ?? null;
}
