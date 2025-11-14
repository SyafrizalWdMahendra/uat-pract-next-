// import { API_BASE_URL } from "@/utils/cons";

// export class AuthError extends Error {
//   constructor(message = "Otentikasi diperlukan") {
//     super(message);
//     this.name = "AuthError";
//   }
// }

// interface FetchApiOptions extends Omit<RequestInit, "body"> {
//   body?: BodyInit | Record<string, unknown> | null;
// }

// export async function fetchApiServer<T>(
//   path: string,
//   token: string,
//   options: FetchApiOptions = {}
// ): Promise<T> {
//   const headers = new Headers(options.headers || {});
//   headers.append("Accept", "application/json");
//   headers.append("Authorization", `Bearer ${token}`);

//   let body = options.body;
//   if (body && typeof body === "object" && !(body instanceof FormData)) {
//     body = JSON.stringify(body);
//     if (!headers.has("Content-Type")) {
//       headers.append("Content-Type", "application/json");
//     }
//   }

//   const fullUrl = `${API_BASE_URL}${path}`;

//   try {
//     const response = await fetch(fullUrl, {
//       ...options,
//       method: options.method || (body ? "POST" : "GET"),
//       headers: Object.fromEntries(headers),
//       body: body,
//       cache: "no-store",
//     });

//     if (response.status === 401 || response.status === 403) {
//       throw new AuthError(`Otentikasi gagal: ${response.statusText}`);
//     }

//     if (!response.ok) {
//       throw new Error(`Request gagal: ${response.statusText}`);
//     }
//     if (response.status === 204) {
//       return null as T;
//     }
//     return (await response.json()) as T;
//   } catch (error) {
//     console.error(`[fetchApiServer] Error saat fetching ${path}:`, error);
//     throw error;
//   }
// }
