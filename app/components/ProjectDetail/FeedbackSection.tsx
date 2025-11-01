"use client";

import { FeedbackSectionProps } from "@/app/lib/type";
import { useFeedbackData } from "@/app/hooks/Feedbacks/useFeedbackData";
import SubmitFeedbackCard from "./SubmitFeedback";
import HistoryFeedbackCard from "./HistoryFeedback";

const FeedbackSection = ({
  projectId,
  token,
  userId,
  initialFeatures,
  initialScenarios,
}: FeedbackSectionProps) => {
  const { allFeedbacks, isLoading, error, refreshFeedbacks } = useFeedbackData(
    projectId,
    token
  );

  return (
    <>
      <SubmitFeedbackCard
        projectId={projectId}
        token={token}
        initialFeatures={initialFeatures || []}
        initialScenarios={initialScenarios || []}
        onFeedbackSubmitted={refreshFeedbacks}
      />

      <HistoryFeedbackCard
        projectId={projectId}
        token={token}
        userId={userId}
        initialFeatures={initialFeatures || []}
        feedbacks={allFeedbacks}
        isLoading={isLoading}
        error={error}
      />
    </>
  );
};

export default FeedbackSection;
