"use client";

import { useNotFoundHelper } from "@/lib/helper/notFound";
import Link from "next/link";

export const NotFoundPage = () => {
  const helper = useNotFoundHelper();
  return (
    <div className="flex flex-col items-center justify-center h-dvh text-center px-6">
      <h1 className="text-4xl font-extrabold  mb-2 animate-pulse ">404</h1>
      <h2 className="text-xl md:text-xl font-semibold mb-2">{helper.title}</h2>
      <p className=" mb-3 max-w-md">{helper.description}</p>
      <Link
        href="/"
        className="flex items-center gap-2 p-2 rounded-md bg-white/20 transition-colors shrink-0 hover:cursor-pointer px-4"
      >
        Back to Dashboard
      </Link>
    </div>
  );
};
