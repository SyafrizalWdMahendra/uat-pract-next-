import { getPriorityClass, getStatusClass } from "@/app/lib/style";
import { FeedbackHistoryPayload } from "@/app/lib/type";

const FeedbackHistoryBadge = ({
  feedback,
}: {
  feedback: FeedbackHistoryPayload;
}) => {
  return (
    <>
      <td className="p-4">
        <span
          className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border whitespace-nowrap ${getStatusClass(
            feedback.status,
          )}`}
        >
          {feedback.status}
        </span>
      </td>
      <td className="p-4">
        <span
          className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border whitespace-nowrap ${getPriorityClass(
            feedback.priority,
          )}`}
        >
          {feedback.priority}
        </span>
      </td>
    </>
  );
};

export default FeedbackHistoryBadge;
