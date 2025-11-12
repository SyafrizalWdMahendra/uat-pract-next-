"use client";
import { Pencil } from "lucide-react";

export const EditFeedbackDetailButton = ({
  onClick,
}: {
  onClick: () => void;
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex text-black hover:text-white items-center p-2 hover:bg-gray-800 border border-gray-800 rounded-md hover:cursor-pointer justify-center transition-colors w-full center text-sm gap-2 px-4"
    >
      <Pencil className="w-4 h-4" />
      <p>Edit</p>
    </button>
  );
};
