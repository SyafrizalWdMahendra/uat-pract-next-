import { Loader2 } from "lucide-react";

export const Loading = () => (
  <div className="flex justify-center items-center p-10">
    <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
    <span className="ml-3 text-gray-700">Loading feedback details...</span>
  </div>
);
