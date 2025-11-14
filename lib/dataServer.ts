// // File: utils/fetchApiServer.ts

// import { API_BASE_URL } from "@/utils/cons";

// // Definisikan ulang AuthError untuk server-side
// export class AuthError extends Error {
//   constructor(message = "Otentikasi diperlukan") {
//     super(message);
//     this.name = "AuthError";
//   }
// }

// interface FetchApiOptions extends Omit<RequestInit, "body"> {
//   body?: any;
// }

// /**
//  * Fungsi fetch API sisi server (server-side)
//  *
//  * @param path Path API (e.g., "/projects/1")
//  * @param token Token JWT yang didapat dari next/headers 'cookies()'
//  * @param options Opsi standar fetch (method, body, dll.)
//  * @returns Promise yang resolve dengan data JSON (T)
//  * @throws {AuthError} jika terjadi error 401/403
//  * @throws {Error} jika terjadi error jaringan atau HTTP lainnya
//  */
// export async function fetchApiServer<T>(
//   path: string,
//   token: string, // <-- Perbedaan utama: token adalah parameter
//   options: FetchApiOptions = {}
// ): Promise<T> {
//   const headers = new Headers(options.headers || {});
//   headers.append("Accept", "application/json");

//   // Selalu tambahkan header Authorization
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
//       headers: headers,
//       body: body,
//       // PENTING: Nonaktifkan caching untuk data dinamis di server
//       cache: "no-store",
//     });

//     if (response.status === 401 || response.status === 403) {
//       // Di sisi server, kita 'throw' agar bisa ditangkap
//       // oleh 'redirect' atau 'notFound'
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
//     // Lempar ulang error agar bisa ditangani oleh Server Component
//     throw error;
//   }
// }
