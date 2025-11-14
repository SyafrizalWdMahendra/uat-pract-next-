// import { API_BASE_URL } from "@/utils/cons";

// export async function fetchApi<T>(
//   path: string,
//   token: string
// ): Promise<T | null> {
//   const headers = new Headers();
//   headers.append("Content-Type", "application/json");
//   headers.append("Authorization", `Bearer ${token}`);

//   try {
//     const response = await fetch(`${API_BASE_URL}${path}`, {
//       method: "GET",
//       headers: headers,
//     });

//     if (!response.ok) {
//       console.warn(
//         `[fetchApi] Gagal fetch ${path}: ${response.status} ${response.statusText}`
//       );
//       return null;
//     }

//     const rawData = await response.json();

//     if (rawData.payload && typeof rawData.payload.data !== "undefined") {
//       return rawData.payload.data as T;
//     } else {
//       console.warn(
//         `[fetchApi] Respons API untuk ${path} tidak memiliki 'payload.data'.`
//       );
//       return null;
//     }
//   } catch (error) {
//     console.error(`[fetchApi] Error saat fetching ${path}:`, error);
//     return null;
//   }
// }

// // // "use client";

// // import Cookies from "js-cookie";
// // import { API_BASE_URL } from "@/utils/cons";

// // export class AuthError extends Error {
// //   constructor(message = "Otentikasi diperlukan") {
// //     super(message);
// //     this.name = "AuthError";
// //   }
// // }

// // interface FetchApiOptions extends Omit<RequestInit, "body"> {
// //   body?: BodyInit | Record<string, unknown> | null;
// // }

// // export async function fetchApi<T>(
// //   path: string,
// //   options: FetchApiOptions = {}
// // ): Promise<T> {
// //   const token = Cookies.get("token");

// //   const headers = new Headers(options.headers || {});
// //   headers.append("Accept", "application/json");

// //   if (token) {
// //     headers.append("Authorization", `Bearer ${token}`);
// //   } else {
// //     console.warn("[fetchApi] Tidak ada token di cookie. Mengarahkan ke login.");
// //     window.location.href = "/login";
// //     throw new AuthError("Tidak ada token");
// //   }

// //   let body = options.body;
// //   if (body && typeof body === "object" && !(body instanceof FormData)) {
// //     body = JSON.stringify(body);
// //     if (!headers.has("Content-Type")) {
// //       headers.append("Content-Type", "application/json");
// //     }
// //   }

// //   const fullUrl = `${API_BASE_URL}${path}`;

// //   try {
// //     const response = await fetch(fullUrl, {
// //       ...options,
// //       method: options.method || (body ? "POST" : "GET"),
// //       headers: headers,
// //       body: body,
// //     });

// //     if (response.status === 401 || response.status === 403) {
// //       console.warn(
// //         `[fetchApi] Auth Error ${response.status}. Menghapus cookie dan redirect ke login.`
// //       );
// //       Cookies.remove("token");
// //       window.location.href = "/login";
// //       throw new AuthError(await response.text());
// //     }

// //     if (!response.ok) {
// //       throw new Error(`Request gagal: ${response.statusText}`);
// //     }

// //     if (response.status === 204) {
// //       return null as T;
// //     }

// //     return (await response.json()) as T;
// //   } catch (error) {
// //     console.error(`[fetchApi] Error saat fetching ${path}:`, error);
// //     throw error;
// //   }
// // }
