import { Suspense } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { StatsCards } from "../components/Dashboards/StatsCard";
import { CurrentProjectCard } from "../components/Dashboards/CurrentProjectCard";
import Navbar from "../components/Dashboards/Navbar";
import { verifyToken } from "../lib/auth";
import {
  ProjectCardSkeleton,
  StatsCardSkeleton,
} from "../components/Dashboards/Skeleton";

interface UserPayload {
  userId: number | string;
  email: string;
  name?: string;
}

const Dashboards = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) {
    redirect("/login");
  }

  const payload = (await verifyToken(token)) as UserPayload | null;
  if (!payload) {
    redirect("/login");
  }

  const userName = payload.name || payload.email || "manager";

  return (
    <>
      <Navbar
        title="UAT Dashboard"
        description={`Welcome, ${userName}!`}
        priority="N/A"
      />
      <main className="pt-22">
        <Suspense fallback={<StatsCardSkeleton />}>
          <StatsCards token={token} />
        </Suspense>

        <Suspense fallback={<ProjectCardSkeleton />}>
          <CurrentProjectCard token={token} />
        </Suspense>
      </main>
    </>
  );
};

export default Dashboards;
