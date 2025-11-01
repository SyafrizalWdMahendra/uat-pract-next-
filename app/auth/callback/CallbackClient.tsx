"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function CallbackClient() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const token = searchParams.get("token");

    if (token) {
      localStorage.setItem("token", token);

      router.push("/dashboard");
    } else {
      console.error("Auth callback error: No token found.");
      router.push("/login?error=auth_failed");
    }
  }, [searchParams, router]);

  return null;
}
