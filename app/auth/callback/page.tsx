"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function AuthCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("token");

    if (token) {
      document.cookie = `token=${token}; path=/; max-age=${
        24 * 60 * 60
      }; SameSite=Lax${
        process.env.NODE_ENV === "production" ? "; Secure" : ""
      }`;

      router.push("/dashboards");
    } else {
      router.push("/login?error=no_token");
    }
  }, [searchParams, router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <p className="text-white text-lg">Melanjutkan ke Dashboard...</p>
      </div>
    </div>
  );
}
