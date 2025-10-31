import { getPriorityColor, getStatusColor } from "@/app/utils/label";

const StatusBadge = ({ status }: { status: string }) => (
  <span
    className={`text-xs font-bold uppercase px-2 py-1 rounded-full ${getStatusColor(
      status,
    )}`}
  >
    {status}
  </span>
);

const PriorityBadge = ({ priority }: { priority: string }) => (
  <span
    className={`text-xs font-bold uppercase px-2 py-1 rounded-full ${getPriorityColor(
      priority,
    )}`}
  >
    {priority}
  </span>
);

export { StatusBadge, PriorityBadge };
