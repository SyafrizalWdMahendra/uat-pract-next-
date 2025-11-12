import { useParams, usePathname } from "next/navigation";

export const useNotFoundHelper = () => {
  const params = useParams();
  const feedbackId = params.id ? Number(params.id) : 0;
  const pathname = usePathname();

  const isFeedbackDetail = pathname.includes(`/feedbackDetail/${feedbackId}`);

  const title = isFeedbackDetail ? "Feedback Not Found" : "Project Not Found";
  const description = isFeedbackDetail
    ? "The requested feedback could not be found."
    : "The requested project could not be found.";

  return { title, description };
};
