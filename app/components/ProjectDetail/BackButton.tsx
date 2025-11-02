"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export const BackButton = () => {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.back()}
      className="flex items-center hover:bg-gray-700 hover:text-white text-gray-700 gap-1 p-2 rounded-md bg-transparent transition-colors hover:cursor-pointer"
      aria-label="Go back to previous page"
    >
      <ArrowLeft className="size-5" />
      <span className="hidden sm:inline text-sm">Back</span>
    </button>
  );
};
