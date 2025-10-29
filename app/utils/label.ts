const capitalizeFirst = (str: string): string =>
  str.charAt(0).toUpperCase() + str.slice(1);

const getStatusColor = (status: string): string => {
  const colors: Record<string, string> = {
    open: "text-red-700 bg-red-100",
    closed: "text-green-700 bg-green-100",
    "in-progress": "text-blue-700 bg-blue-100",
  };
  return colors[status.toLowerCase()] || "text-gray-700 bg-gray-100";
};

const getPriorityColor = (priority: string): string => {
  const colors: Record<string, string> = {
    high: "text-red-700 bg-red-100",
    medium: "text-yellow-700 bg-yellow-100",
    low: "text-green-700 bg-green-100",
  };
  return colors[priority.toLowerCase()] || "text-gray-700 bg-gray-100";
};
export { capitalizeFirst, getStatusColor, getPriorityColor };
