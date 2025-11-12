import { getPriorityClass, getStatusClass } from "@/utils/style";
import { FeedbackPayload } from "@/utils/type";

const FeedbackDetailBadge = ({ feedback }: { feedback: FeedbackPayload }) => {
  return (
    <>
      <span
        className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border whitespace-nowrap ${getStatusClass(
          feedback.status
        )}`}
      >
        {feedback.status}
      </span>
      <span
        className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border whitespace-nowrap ${getPriorityClass(
          feedback.priority
        )}`}
      >
        {feedback.priority}
      </span>
    </>
  );
};

export default FeedbackDetailBadge;
