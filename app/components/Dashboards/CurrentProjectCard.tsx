import { getProject } from "../../lib/data";
import CardProject from "./CardProject";

export async function CurrentProjectCard({ token }: { token: string }) {
  const projects = await getProject(token);

  if (!projects) {
    return <p className="text-red-500">Gagal memuat statistik.</p>;
  }

  return (
    <div className="p-4 w-full">
      <div className="flex items-center w-full gap-3 mb-3">
        <h2 className="text-2xl font-semibold">Current UAT Projects</h2>
        <div className="w-max h-max border-2 border-blue-500 rounded-3xl pl-3 pr-3 flex justify-center text-sm font-semibold">
          1 Projects
        </div>
      </div>

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
