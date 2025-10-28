import { getPriorityClass, getStatusClass } from "@/app/lib/style";
import { IProject } from "@/app/lib/type";
import Link from "next/link";

interface CardProjectProps extends IProject {
  href: string;
}

const CardProject = ({
  id,
  href,
  title,
  description,
  priority,
  status,
  featureCount,
  testScenarioCount,
  duration,
  due_date,
}: CardProjectProps) => {
  return (
    <Link
      href={href}
      className="group block w-full rounded-lg text-card-foreground hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-0 shadow-lg bg-white animate-slide-up p-5" // Removed pt-0 as p-5 covers it
    >
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap justify-between items-start gap-2">
          {" "}
          <h1 className="text-xl font-bold text-gray-900 shrink min-w-0 mr-2">
            {" "}
            {title}
          </h1>
          <div className="flex gap-2 shrink-0">
            {" "}
            <span
              className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border whitespace-nowrap ${getPriorityClass(
                priority
              )}`}
            >
              {priority}
            </span>
            <span
              className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border whitespace-nowrap ${getStatusClass(
                status
              )}`}
            >
              {status}
            </span>
          </div>
        </div>

        <p className="text-sm text-gray-600 line-clamp-2">{description}</p>

        <hr className="my-2 border-gray-100" />

        <div className="flex gap-x-4 gap-y-1 flex-wrap text-sm font-medium">
          <p className="text-gray-700">
            Features:{" "}
            <span className="font-bold text-gray-900">{featureCount}</span>
          </p>
          <p className="text-gray-700">
            Scenarios:{" "}
            <span className="font-bold text-gray-900">{testScenarioCount}</span>
          </p>
        </div>

        <div className="flex flex-wrap justify-between items-center text-xs text-gray-500 mt-2 gap-2">
          <div className="flex items-center gap-2">
            <span className="text-gray-500">
              Duration: {duration !== null ? duration : "-"}
            </span>
          </div>
          <div className="font-medium text-gray-700">Due: {due_date}</div>
        </div>
      </div>
    </Link>
  );
};

export default CardProject;
