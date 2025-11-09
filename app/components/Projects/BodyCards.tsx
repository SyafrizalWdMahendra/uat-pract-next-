import { GetProjectDetailCookies } from "@/app/lib/ProjectDetail/cookies";
import { CalendarDays, Clock, MedalIcon, User } from "lucide-react";

export const BodyCards = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const cookie = GetProjectDetailCookies({ params });

  return (
    <>
      {" "}
      <div className="flex items-start">
        <User className="w-5 h-5 text-gray-400 mr-3 mt-1 shrink-0" />
        <div>
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
            Project Manager
          </p>
          <p className="text-md font-semibold text-gray-900 mt-1">
            {(await cookie).project.manager?.name || "-"}
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
            {(await cookie).project.testLead?.name || "-"}
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
            {(await cookie).project.start_date || "-"}{" "}
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
            {(await cookie).project.due_date || "-"}{" "}
          </p>
        </div>
      </div>
    </>
  );
};
