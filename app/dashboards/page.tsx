import { Suspense } from "react";
import { StatsCards } from "../../components/Dashboards/StatsCard";
import { CurrentProjectCard } from "../../components/Dashboards/CurrentProjectCard";
import Navbar from "../../components/Dashboards/Navbar";
import {
  CurrentProjectSkeleton,
  StatsCardSkeleton,
} from "../../components/Utility/Skeleton";
import { GetDashboardCookies } from "../../lib/Dashboards/cookies";
import { redirect } from "next/navigation";
import { getProject, getStats } from "@/lib/Dashboards/data";

const Dashboards = async () => {
  const cookie = await GetDashboardCookies();
  if (!cookie.token) {
    redirect("/login");
  }

  const statsData = await getStats(cookie.token);
  const projectsData = await getProject(cookie.token);
  
  return (
    <div className="min-h-dvh">
      <Navbar
        title="UAT Dashboard"
        description={`Welcome, ${cookie.userName}`}
        priority="N/A"
      />
      <main className="pt-22">
        <Suspense fallback={<StatsCardSkeleton />}>
          <StatsCards stats={statsData} />
        </Suspense>

        <Suspense fallback={<CurrentProjectSkeleton />}>
          <CurrentProjectCard projects={projectsData} />
        </Suspense>
      </main>
    </div>
  );
};

export default Dashboards;
