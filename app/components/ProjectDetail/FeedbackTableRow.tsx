import { Eye, Trash2 } from "lucide-react";
import { FeedbackHistoryPayload } from "@/app/lib/type";
import Link from "next/link";
import FeedbackHistoryBadge from "../Utility/FeedbackHistoryBadge";

const FeedbackTableRow = ({
  feedback,
}: {
  feedback: FeedbackHistoryPayload;
}) => (
  <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
    <FeedbackHistoryBadge feedback={feedback} />
    <td className="p-4">
      <span className="font-semibold text-blue-900">
        {feedback.feature.title}
      </span>
    </td>
    <td className="p-4 text-gray-600">{feedback.testScenario.code}</td>
    <td className="p-4 text-gray-700 max-w-md">
      <div className="line-clamp-2">{feedback.description}</div>
    </td>
    <td className="p-4 text-gray-600">{feedback.user.name}</td>
    <td className="p-4 text-gray-600 whitespace-nowrap">
      {new Date(feedback.created_at).toLocaleDateString()}
    </td>
    <td className="p-4">
      <div className="flex items-center justify-center gap-2">
        <Link
          href={`/feedbackDetail/${feedback.id}`}
          className="flex items-center gap-1 p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
          title="View Details"
          aria-label="View feedback details"
        >
          <Eye className="w-4 h-4" />
          <p className="text-sm sm:hidden lg:block">Details</p>
        </Link>

        <button
          className="flex items-center gap-1 p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
          title="Delete"
          aria-label="Delete feedback"
        >
          <Trash2 className="w-4 h-4" />
          <p className="text-sm sm:hidden lg:block">Delete</p>
        </button>
      </div>
    </td>
  </tr>
);

export default FeedbackTableRow;
