import { getProject } from "../../lib/data";
import CardProject from "./CardProject";

export async function CurrentProjectCard({ token }: { token: string }) {
  const projects = await getProject(token);

  if (!projects) {
    return <p className="text-red-500">Gagal memuat statistik.</p>;
  }

  return (
    <div className="sm:p-4 w-full md:p-4 md:mt-1 p-4 lg:p-4 lg:pt-0 xl:p-8">
      <div className="flex items-center w-full gap-3 mb-3 lg:pt-0">
        <h2 className="text-2xl font-semibold">Current UAT Projects</h2>
        <div className="w-max h-max border-0 bg-rose-400/80 rounded-3xl pr-3 pl-3 p-1 flex justify-center text-sm font-semibold">
          <p>1 Projects</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {projects.map((project) => {
          const linkHref = `/projects/${project.id}`;
          console.log("Generated Link Href:", linkHref);
          return (
            <CardProject
              key={project.id}
              id={project.id}
              href={`/projects/${project.id}`}
              title={project.title}
              description={project.description}
              priority={project.priority}
              status={project.status}
              featureCount={project.featureCount}
              testScenarioCount={project.testScenarioCount}
              duration={project.duration}
              due_date={project.due_date}
            />
          );
        })}
      </div>
    </div>
  );
}
export default CurrentProjectCard;
