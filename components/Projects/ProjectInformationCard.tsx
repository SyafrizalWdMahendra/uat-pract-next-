import { Clock, FileText, Sparkles } from "lucide-react";
import Navbar from "../Dashboards/Navbar";
import { GetProjectDetailCookies } from "@/lib/ProjectDetail/cookies";
import { Suspense } from "react";
import { ProjectInfoSkeleton } from "../Utility/Skeleton";
import { HeadTitleCard } from "../Utility/HeadTitleCard";
import { BodyCards } from "./BodyCards";

const ProjectInformationCard = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const cookie = await GetProjectDetailCookies({ params });
  return (
    <>
      <Navbar
        title={(await cookie).project.title}
        description={`${(await cookie).project.description}`}
        priority={(await cookie).project.priority}
      />
      <Suspense fallback={<ProjectInfoSkeleton />}>
        <div className="bg-white p-6 rounded-lg border border-gray-200 mb-8 md:mt-3 sm:mt-3 lg:mt-0 mt-3">
          <HeadTitleCard title={"project-information"}></HeadTitleCard>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <BodyCards params={params} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-100/50 border border-blue-200 p-4 rounded-lg flex items-start">
              <Sparkles className="w-5 h-5 text-blue-600 mr-3 mt-1 shrink-0" />
              <div>
                <p className="text-sm font-medium text-blue-800">Features</p>
                <p className="text-2xl font-bold text-blue-900 mt-1">
                  {(await cookie).project.featureCount}
                </p>
              </div>
            </div>
            <div className="bg-green-100/50 border border-green-200 p-4 rounded-lg flex items-start">
              <FileText className="w-5 h-5 text-green-600 mr-3 mt-1 shrink-0" />
              <div>
                <p className="text-sm font-medium text-green-800">
                  Test Scenarios
                </p>
                <p className="text-2xl font-bold text-green-900 mt-1">
                  {(await cookie).project.testScenarioCount}
                </p>
              </div>
            </div>
            <div className="bg-purple-100/50 border border-purple-200 p-4 rounded-lg flex items-start">
              <Clock className="w-5 h-5 text-purple-600 mr-3 mt-1 shrink-0" />
              <div>
                <p className="text-sm font-medium text-purple-800">Duration</p>
                <p className="text-2xl font-bold text-purple-900 mt-1">
                  {(await cookie).project.duration !== null
                    ? `${(await cookie).project.duration} days`
                    : "-"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Suspense>
    </>
  );
};

export default ProjectInformationCard;
