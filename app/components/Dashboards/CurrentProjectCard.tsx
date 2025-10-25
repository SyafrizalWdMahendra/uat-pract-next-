// app/components/Dashboards/StatsCards.tsx
import { getProject } from "../../lib/data"; // Pindahkan fungsi getStats ke sini
import CardProject from "./CardProject";

// Komponen ini mengambil datanya sendiri
export async function CurrentProjectCard({ token }: { token: string }) {
  const projects = await getProject(token);

  if (!projects) {
    return <p className="text-red-500">Gagal memuat statistik.</p>;
  }

  return (
    <div className="p-4 max-w-md">
      <h2 className="text-xl font-semibold mb-3">Current Active Project</h2>
      <CardProject
        id={projects.id}
        href={`/projects/${projects.id}`}
        title={projects.title}
        description={projects.description}
        priority={projects.priority}
        status={projects.status}
        featureCount={projects.featureCount}
        testScenarioCount={projects.testScenarioCount}
        duration={projects.duration}
        due_date={projects.due_date}
      />
    </div>
  );
}
export default CurrentProjectCard;
// (Lakukan hal yang sama untuk CurrentProjectCard.tsx)
