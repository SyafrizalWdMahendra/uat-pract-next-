const priorityColors = {
  high: "bg-red-100 text-red-800 border-red-300",
  medium: "bg-yellow-100 text-yellow-800 border-yellow-300",
  low: "bg-green-100 text-green-800 border-green-300",
  Default: "bg-gray-100 text-gray-800 border-gray-300",
};

const statusColors = {
  active: "bg-green-100 text-green-800 border-green-300",
  "In Progress": "bg-purple-100 text-purple-800 border-purple-300",
  inactive: "bg-gray-100 text-gray-800 border-gray-300",
  completed: "bg-gray-100 text-blue-800 border-blue-300",
  Default: "bg-gray-100 text-gray-800 border-gray-300",
  open: "bg-red-100 text-red-800 border-red-300",
};

/**
 * Gets the Tailwind CSS classes for a given project priority.
 * This is a simple synchronous function.
 * @param priority The priority string (e.g., "high", "medium", "low"). Case-insensitive.
 * @returns Tailwind class string.
 */
export const getPriorityClass = (priority?: string): string => {
  if (!priority) {
    return priorityColors.Default;
  }
  const lowerPriority = priority.toLowerCase();
  return (
    priorityColors[lowerPriority as keyof typeof priorityColors] ||
    priorityColors.Default
  );
};

/**
 * Gets the Tailwind CSS classes for a given project status.
 * This is a simple synchronous function.
 * @param status The status string (e.g., "active", "In Progress"). Case-sensitive for "In Progress".
 * @returns Tailwind class string.
 */
export const getStatusClass = (status?: string): string => {
  if (!status) {
    return statusColors.Default;
  }
  const lookupKey = status === "In Progress" ? status : status.toLowerCase();
  return (
    statusColors[lookupKey as keyof typeof statusColors] || statusColors.Default
  );
};
