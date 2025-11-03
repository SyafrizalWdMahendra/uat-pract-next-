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
      className="flex text-black gap-2 text-sm items-center p-2 hover:bg-gray-700 rounded-md hover:cursor-pointer bg-blue-900/20 justify-center hover:text-white transition-colors w-full"
    >
      <Pencil className="w-4 h-4" />
      <p>Edit</p>
    </button>
  );
};
