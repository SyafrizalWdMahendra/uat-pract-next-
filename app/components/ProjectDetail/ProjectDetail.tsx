import { getProjectById } from "@/app/lib/data";
import { IProjectDetail } from "@/app/lib/type";
import {
  CalendarDays,
  Clock,
  FileText,
  Sparkles,
  Info,
  MedalIcon,
  User,
} from "lucide-react";
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import Navbar from "../Dashboards/Navbar";

const CardProjectDetail = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const projectId = (await params).id;
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) {
    redirect("/login");
  }
  const project: IProjectDetail | null = await getProjectById(projectId, token);

  if (!project) {
    notFound();
  }
  return (
    <>
      <Navbar
        title={project.title}
        description={`${project.description}`}
        priority={project.priority}
      />
      <div className="bg-white p-6 rounded-lg border border-gray-200 mb-8 mt-3">
        <div className="flex items-center mb-6">
          <Info className="w-5 h-6 text-blue-900 mr-2" />
          <h1 className="text-xl font-semibold text-gray-800">
            Project Information
          </h1>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <div className="flex items-start">
            <User className="w-5 h-5 text-gray-400 mr-3 mt-1 shrink-0" />
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                Project Manager
              </p>
              <p className="text-md font-semibold text-gray-900 mt-1">
                {project.manager?.name || "-"}
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <MedalIcon className="w-5 h-5 text-gray-400 mr-3 mt-1 shrink-0" />
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                Test Lead
              </p>
              <p className="text-md font-semibold text-gray-900 mt-1">
                {project.testLead?.name || "-"}
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <CalendarDays className="w-5 h-5 text-gray-400 mr-3 mt-1 shrink-0" />
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                Start Date
              </p>
              <p className="text-md font-semibold text-gray-900 mt-1">
                {project.start_date || "-"}{" "}
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <Clock className="w-5 h-5 text-gray-400 mr-3 mt-1 shrink-0" />
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                Due Date
              </p>
              <p className="text-md font-semibold text-gray-900 mt-1">
                {project.due_date || "-"}{" "}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-100/50 border border-blue-200 p-4 rounded-lg flex items-start">
            <Sparkles className="w-5 h-5 text-blue-600 mr-3 mt-1 shrink-0" />
            <div>
              <p className="text-sm font-medium text-blue-800">Features</p>
              <p className="text-2xl font-bold text-blue-900 mt-1">
                {project.featureCount}
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
                {project.testScenarioCount}
              </p>
            </div>
          </div>
          <div className="bg-purple-100/50 border border-purple-200 p-4 rounded-lg flex items-start">
            <Clock className="w-5 h-5 text-purple-600 mr-3 mt-1 shrink-0" />
            <div>
              <p className="text-sm font-medium text-purple-800">Duration</p>
              <p className="text-2xl font-bold text-purple-900 mt-1">
                {project.duration !== null ? `${project.duration} days` : "-"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardProjectDetail;
