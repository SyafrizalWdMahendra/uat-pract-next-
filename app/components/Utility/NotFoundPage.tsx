"use client";

import { notFoundHelper } from "@/app/lib/helper/notFound";
import Link from "next/link";

export const NotFoundPage = () => {
  const helper = notFoundHelper();
  return (
    <div className="flex flex-col items-center justify-center h-dvh bg-gray-50 text-center px-6">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-2 animate-pulse">
        404
      </h1>
      <h2 className="text-xl md:text-xl font-semibold text-gray-700 mb-2">
        {helper.title}
      </h2>
      <p className="text-gray-500 mb-3 max-w-md">{helper.description}</p>
      <Link
        href="/"
        className="flex justify-center items-center text-sm gap-2 px-4 py-2 bg-gray-800 hover:bg-black text-white font-medium rounded-md disabled:bg-gray-300 hover:cursor-pointer w-full sm:w-auto"
      >
        Back to Dashboard
      </Link>
    </div>
  );
};
