import { getProject } from "../../lib/data";
import CardProject from "./CardProject";

export async function CurrentProjectCard({ token }: { token: string }) {
  const projects = await getProject(token);

  if (!projects) {
    return <p className="text-red-500">Gagal memuat statistik.</p>;
  }

  return (
    <div className="sm:p-4 w-full md:p-4 lg:mt-6 xl:mt-2 md:mt-2 sm:mt-2 lg:p-4 lg:pt-0 xl:p-8 xl:pt-0 p-4">
      <div className="flex items-center w-full gap-3 mb-3">
        <h2 className="text-2xl font-semibold text-white">Current UAT Projects</h2>
        <div className="w-max h-max border-2 border-white text-white rounded-3xl pr-3 pl-3 p-1 flex text-center text-sm font-semibold">
          <p>{projects.length} Projects</p>
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
