import { getStats } from "../../lib/Dashboards/data";
import CardStats from "./CardStats";

export async function StatsCards() {
  try {
    const stats = await getStats();

    if (!stats) {
      return <p className="text-red-500">Gagal memuat statistik.</p>;
    }

    return (
      <div className="...">
        <CardStats title="Active Projects" value={stats.activeProjects} />
        <CardStats title="Total Features" value={stats.totalFeatures} />
        <CardStats title="Test Scenarios" value={stats.totalTestScenarios} />
        <CardStats title="Avg Progress" value="0%" />
      </div>
    );
  } catch (err) {
    console.error("[StatsCards] ERROR:", err);
    return <p className="text-red-500">Gagal memuat statistik.</p>;
  }
}

export default StatsCards;
