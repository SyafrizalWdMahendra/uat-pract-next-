"use client";

import { useTransition } from "react";
import { logout } from "@/app/auth/actions"; // <-- Sesuaikan path ke file actions.ts

export const LogoutButton = () => {
  const [isPending, startTransition] = useTransition();

  const handleLogout = () => {
    startTransition(async () => {
      await logout();
    });
  };

  return (
    <button
      type="button"
      className="w-20 flex justify-center bg-white p-2 rounded-lg shadow-md border 
                 border-gray-200 hover:shadow-lg hover:border-blue-500 hover:text-blue-500 hover:cursor-pointer text-black
                 transition-all duration-200 ease-in-out ml-auto font-medium"
      onClick={handleLogout}
      disabled={isPending}
    >
      {isPending ? "..." : "Logout"}
    </button>
  );
};

export default LogoutButton;
