import { getStats } from "../../lib/Dashboards/data";
import CardStats from "./CardStats";

export async function StatsCards({ token }: { token: string }) {
  const stats = await getStats(token);

  if (!stats) {
    return <p className="text-red-500">Gagal memuat statistik.</p>;
  }

  return (
    <div className="lg:p-4 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:pt-8 md:p-4 sm:p-4 md:mt-3.5 lg:pt-4 xl:pt-4 xl:p-8 pt-8 p-4">
      <CardStats title="Active Projects" value={stats.activeProjects} />
      <CardStats title="Total Features" value={stats.totalFeatures} />
      <CardStats title="Test Scenarios" value={stats.totalTestScenarios} />
      <CardStats title="Avg Progress" value="0%" />
    </div>
  );
}

export default StatsCards;
