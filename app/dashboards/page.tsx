import { Suspense } from "react";
import { StatsCards } from "../components/Dashboards/StatsCard";
import { CurrentProjectCard } from "../components/Dashboards/CurrentProjectCard";
import Navbar from "../components/Dashboards/Navbar";
import {
  CurrentProjectSkeleton,
  StatsCardSkeleton,
} from "../components/Utility/Skeleton";
import { GetDashboardCookies } from "../lib/Dashboards/cookies";

const Dashboards = async () => {
  const cookie = await GetDashboardCookies();

  return (
    <div className="min-h-dvh">
      <Navbar
        title="UAT Dashboard"
        description={`Welcome, ${cookie.userName}!`}
        priority="N/A"
      />
      <main className="pt-22">
        <Suspense fallback={<StatsCardSkeleton />}>
          <StatsCards token={cookie.token} />
        </Suspense>

        <Suspense fallback={<CurrentProjectSkeleton />}>
          <CurrentProjectCard token={cookie.token} />
        </Suspense>
      </main>
    </div>
  );
};

export default Dashboards;
