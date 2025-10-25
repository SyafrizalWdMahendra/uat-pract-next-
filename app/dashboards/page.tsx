import { Suspense } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { CardSkeleton, StatsGridSkeleton } from "../components/Skeleton";
import { StatsCards } from "../components/Dashboards/StatsCard";
import { CurrentProjectCard } from "../components/Dashboards/CurrentProjectCard";

const Dashboards = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) {
    redirect("/login");
  }

  return (
    <>
      <Suspense fallback={<StatsGridSkeleton />}>
        <StatsCards token={token} />
      </Suspense>

      <div className="p-4 max-w-md">
        <h2 className="text-xl font-semibold mb-3">Current Active Project</h2>

        <Suspense fallback={<CardSkeleton />}>
          <CurrentProjectCard token={token} />
        </Suspense>
      </div>
    </>
  );
};

export default Dashboards;
