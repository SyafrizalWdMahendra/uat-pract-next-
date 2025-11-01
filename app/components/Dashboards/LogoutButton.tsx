"use client";

import { useTransition } from "react";
import { logout } from "@/app/auth/logout";

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
                 border-gray-200 shadow-blue-900/10 hover:border-blue-900 hover:text-blue-900 hover:cursor-pointer text-black
                 transition-all duration-200 ease-in-out ml-auto font-medium h-max"
      onClick={handleLogout}
      disabled={isPending}
    >
      {isPending ? "..." : "Logout"}
    </button>
  );
};

export default LogoutButton;
