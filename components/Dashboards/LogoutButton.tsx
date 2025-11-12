"use client";

import { useTransition } from "react";
import { logout } from "@/lib/actions/auth";
import { LogOutIcon } from "lucide-react";

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
      className="flex items-center gap-2 p-2 rounded-md hover:bg-white/20 transition-colors shrink-0 hover:cursor-pointer px-4"
      onClick={handleLogout}
      disabled={isPending}
    >
      <LogOutIcon className="w-4 h-4"></LogOutIcon>
      {isPending ? (
        "..."
      ) : (
        <span className="hidden sm:inline text-sm">Logout</span>
      )}
    </button>
  );
};

export default LogoutButton;
