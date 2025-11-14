// File ini HANYA untuk Server Components
import { API_BASE_URL } from "@/utils/cons";

export class AuthError extends Error {
  /* ... (sama seperti di atas) ... */
}

interface FetchApiOptions extends Omit<RequestInit, "body"> {
  body?: BodyInit | Record<string, unknown> | null;
}

/**
 * HANYA UNTUK SERVER COMPONENT (page.tsx, layout.tsx)
 * Menerima token yang diambil dari 'cookies()'
 */
export async function fetchApiServer<T>(
  path: string,
  token: string, // <-- Perbedaan utama: token adalah parameter
  options: FetchApiOptions = {}
): Promise<T> {
  const headers = new Headers(options.headers || {});
  headers.append("Accept", "application/json");
  headers.append("Authorization", `Bearer ${token}`); // Gunakan token dari parameter

  let body = options.body;
  // ... (logika JSON.stringify sama seperti di atas)
  if (body && typeof body === "object" && !(body instanceof FormData)) {
    body = JSON.stringify(body);
    if (!headers.has("Content-Type")) {
      headers.append("Content-Type", "application/json");
    }
  }

  const fullUrl = `${API_BASE_URL}${path}`;

  try {
    const response = await fetch(fullUrl, {
      ...options,
      method: options.method || (body ? "POST" : "GET"),
      headers: headers,
      body: body,
      cache: "no-store", // Penting untuk data dinamis di server
    });

    if (response.status === 401 || response.status === 403) {
      throw new AuthError(`Otentikasi gagal: ${response.statusText}`);
    }
    // ... (sisa logika 'response.ok', '204', 'json()' sama seperti di atas)

    if (!response.ok) {
      throw new Error(`Request gagal: ${response.statusText}`);
    }
    if (response.status === 204) {
      return null as T;
    }
    return (await response.json()) as T;
  } catch (error) {
    console.error(`[fetchApiServer] Error saat fetching ${path}:`, error);
    throw error;
  }
}
