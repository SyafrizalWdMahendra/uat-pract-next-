import Link from "next/link";

interface CardProjectProps {
  id: number;
  href: string;
  title: string;
  description: string;
  priority: string;
  status: string;
  featureCount: number;
  testScenarioCount: number;
  duration: string;
  due_date: string;
}

const priorityColors = {
  High: "bg-red-100 text-red-800 border-red-300",
  Medium: "bg-yellow-100 text-yellow-800 border-yellow-300",
  Low: "bg-green-100 text-green-800 border-green-300",
  Default: "bg-gray-100 text-gray-800 border-gray-300",
};

const statusColors = {
  Completed: "bg-blue-100 text-blue-800 border-blue-300",
  "In Progress": "bg-purple-100 text-purple-800 border-purple-300",
  Pending: "bg-gray-100 text-gray-800 border-gray-300",
  Default: "bg-gray-100 text-gray-800 border-gray-300",
};

const getPriorityClass = (priority: string) =>
  priorityColors[priority as keyof typeof priorityColors] ||
  priorityColors.Default;

const getStatusClass = (status: string) =>
  statusColors[status as keyof typeof statusColors] || statusColors.Default;

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
  const formattedDueDate = new Date(due_date).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <Link
      href={href}
      className="group block w-full bg-white pt-0 p-6 rounded-lg shadow-md border 
                 border-gray-200 hover:shadow-lg hover:border-blue-500 
                 transition-all duration-200 ease-in-out"
    >
      {id}
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-start">
          <h1 className="text-xl font-bold text-gray-900 group-hover:text-blue-600">
            {title}
          </h1>
          <div className="flex w-28 justify-between">
            <span
              className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${getPriorityClass(
                priority
              )}`}
            >
              {priority}
            </span>
            <span
              className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${getStatusClass(
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
            <span className="text-gray-500">Duration: {duration}</span>
          </div>

          <div className="font-medium text-gray-700">
            Due: {formattedDueDate}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CardProject;
