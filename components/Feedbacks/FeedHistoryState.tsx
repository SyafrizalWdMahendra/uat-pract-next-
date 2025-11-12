import { MessageCircle } from "lucide-react";

const EmptyState = () => (
  <div className="flex flex-col items-center justify-center py-12">
    <MessageCircle className="w-16 h-16 text-gray-400 mb-4" />
    <p className="text-center text-gray-700 text-lg font-medium mb-2">
      No feedback found matching your criteria.
    </p>
    <p className="text-center text-gray-500 text-sm">
      Try adjusting your search or filters.
    </p>
  </div>
);

const LoadingState = () => (
  <p className="text-center text-gray-500 py-8">Loading feedback...</p>
);

const ErrorState = ({ message }: { message: string }) => (
  <div className="text-center text-red-600 py-8 bg-red-50 rounded-lg">
    <p className="font-semibold">Error</p>
    <p className="text-sm">{message}</p>
  </div>
);
export { EmptyState, LoadingState, ErrorState };
