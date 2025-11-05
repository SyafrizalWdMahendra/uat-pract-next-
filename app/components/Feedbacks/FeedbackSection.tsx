"use client";

import { FeedbackSectionProps } from "@/app/lib/type";
import { useFeedbackData } from "@/app/hooks/Feedbacks/useFeedbackData";
import SubmitFeedbackCard from "../Projects/SubmitFeedbackCard";
import HistoryFeedbackCard from "../Projects/HistoryFeedbackCard";
import { Suspense } from "react";
import { FeedbackFormSkeleton } from "../Utility/Skeleton";

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
      <Suspense fallback={<FeedbackFormSkeleton></FeedbackFormSkeleton>}>
        <SubmitFeedbackCard
          projectId={projectId}
          token={token}
          initialFeatures={initialFeatures || []}
          initialScenarios={initialScenarios || []}
          onFeedbackSubmitted={refreshFeedbacks}
        />
      </Suspense>

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
