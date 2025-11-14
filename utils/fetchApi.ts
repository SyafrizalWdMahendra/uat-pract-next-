"use client"; // Penting untuk 'js-cookie' dan 'window'

import Cookies from "js-cookie";
import { API_BASE_URL } from "@/utils/cons";

export class AuthError extends Error {
  constructor(message = "Otentikasi diperlukan") {
    super(message);
    this.name = "AuthError";
  }
}

interface FetchApiOptions extends Omit<RequestInit, "body"> {
  body?: BodyInit | Record<string, unknown> | null;
}

/**
 * HANYA UNTUK CLIENT COMPONENT ("use client")
 * Mengambil token secara otomatis dari 'js-cookie'
 */
export async function fetchApi<T>(
  path: string,
  options: FetchApiOptions = {}
): Promise<T> {
  // (1) Mengambil token dari browser
  const token = Cookies.get("token");

  const headers = new Headers(options.headers || {});
  headers.append("Accept", "application/json");

  // (2) Melampirkan token
  if (token) {
    headers.append("Authorization", `Bearer ${token}`);
  } else {
    // (3) Jika tidak ada token, paksa logout
    console.warn("[fetchApi] Tidak ada token di cookie. Mengarahkan ke login.");
    window.location.href = "/login";
    throw new AuthError("Tidak ada token");
  }

  let body = options.body;
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
    });

    // (4) Menangani 401/403 dari Express
    if (response.status === 401 || response.status === 403) {
      console.warn(
        `[fetchApi] Auth Error ${response.status}. Menghapus cookie dan redirect ke login.`
      );
      Cookies.remove("token"); // Hapus token yang tidak valid
      window.location.href = "/login";
      throw new AuthError(await response.text());
    }

    if (!response.ok) {
      throw new Error(`Request gagal: ${response.statusText}`);
    }

    if (response.status === 204) {
      return null as T;
    }

    return (await response.json()) as T;
  } catch (error) {
    console.error(`[fetchApi] Error saat fetching ${path}:`, error);
    throw error;
  }
}
