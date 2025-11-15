// import { cookies } from "next/headers";
// import { API_BASE_URL } from "@/utils/cons";

// export async function fetchApi<T>(path: string): Promise<T | null> {
//   const token = (await cookies()).get("token")?.value;

//   if (!token) {
//     console.warn(`[fetchApi] Token tidak ditemukan di cookies`);
//     return null;
//   }

//   try {
//     const response = await fetch(`${API_BASE_URL}${path}`, {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       cache: "no-store",
//     });

//     if (!response.ok) {
//       console.warn(
//         `[fetchApi] Response tidak OK ${path}: ${response.status} ${response.statusText}`
//       );
//       return null;
//     }

//     const raw = await response.json();

//     return raw?.payload?.data ?? null;
//   } catch (err) {
//     console.error(`[fetchApi] Error saat fetch ${path}:`, err);
//     return null;
//   }
// }

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
