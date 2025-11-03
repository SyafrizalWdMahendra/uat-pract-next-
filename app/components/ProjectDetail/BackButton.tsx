"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { BackButtonProps } from "@/app/lib/type";

export const BackButton = ({ onClick }: BackButtonProps) => {
  const router = useRouter();

  const defaultBackAction = () => {
    router.back();
  };

  const handleClick = onClick || defaultBackAction;

  return (
    <button
      type="button"
      onClick={handleClick}
      className="flex items-center hover:bg-gray-700 hover:text-white text-gray-700 gap-1 p-2 rounded-md bg-transparent transition-colors hover:cursor-pointer"
      aria-label="Go back"
    >
      <ArrowLeft className="w-4 h-4" />
      <span className="hidden sm:inline text-sm">Back</span>
    </button>
  );
};
