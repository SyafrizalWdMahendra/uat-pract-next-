"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import LogoutButton from "./LogoutButton";
import { ArrowLeft, Target } from "lucide-react";
import { getPriorityClass } from "@/app/lib/style";
import { NavbarProps } from "@/app/lib/type";

const Navbar = ({ title, description, priority }: NavbarProps) => {
  const pathname = usePathname();
  const isDashboard = pathname === "/dashboards";

  return (
    <header
      className="w-full bg-popover/30 fixed top-0 right-0 left-0 z-50
                 flex items-center justify-between 
                 px-4 sm:px-6 
                 h-20 text-white backdrop-blur-sm md:p-4 lg:p-4 xl:p-8 border-b border-white"
    >
      <div className="flex items-center gap-3 sm:gap-4 min-w-0">
        {isDashboard ? (
          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shrink-0">
            <Target className="w-6 h-6 text-popover" />
          </div>
        ) : (
          <Link
            href="/dashboards"
            className="flex items-center gap-2 p-2 rounded-md hover:bg-white/20 transition-colors shrink-0 px-4"
            aria-label="Back to Dashboard"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline text-sm">Dashboard</span>
          </Link>
        )}

        <div className="overflow-hidden">
          <h1 className="text-lg sm:text-xl font-bold truncate">{title}</h1>
          {description && (
            <p className="text-xs sm:text-sm opacity-80 mt-0.5 truncate hidden sm:block">
              {description}
            </p>
          )}
        </div>
      </div>

      <div className="shrink-0">
        {isDashboard ? (
          <LogoutButton />
        ) : priority ? (
          <span
            className={`text-xs font-semibold px-3 py-1 rounded-full border whitespace-nowrap shadow-md shadow-blue-900 ${getPriorityClass(
              priority
            )}`}
          >
            {`${priority} priority`}
          </span>
        ) : null}
      </div>
    </header>
  );
};

export default Navbar;
