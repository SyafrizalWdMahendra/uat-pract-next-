"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Cookies from "js-cookie"; // 1. Impor js-cookie

export default function CallbackClient() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const token = searchParams.get("token");

    if (token) {
      // 2. Hapus atau ganti localStorage
      // localStorage.setItem("token", token); // Server tidak bisa membaca ini

      // 3. Simpan token sebagai Cookie
      // 'expires: 1' berarti cookie berlaku 1 hari (sesuaikan dengan token Anda)
      Cookies.set("token", token, { expires: 1, path: "/" });

      router.push("/dashboards");
    } else {
      console.error("Auth callback error: No token found.");
      router.push("/login?error=auth_failed");
    }
  }, [searchParams, router]);

  return null;
}
