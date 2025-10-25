// app/components/Dashboards/StatsCards.tsx
import { getStats } from "../../lib/data";
import CardStats from "./CardStats";

export async function StatsCards({ token }: { token: string }) {
  const stats = await getStats(token);

  if (!stats) {
    return <p className="text-red-500">Gagal memuat statistik.</p>;
  }

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
      <CardStats title="Active Projects" value={stats.activeProjects} />
      <CardStats title="Total Features" value={stats.totalFeatures} />
      <CardStats
        title="Total Test Scenarios"
        value={stats.totalTestScenarios}
      />
    </div>
  );
}

export default StatsCards;
