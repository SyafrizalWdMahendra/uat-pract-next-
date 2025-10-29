import { useMemo } from "react";
import { FeedbackHistoryPayload } from "../lib/type";

export const useClientSideFilter = (
  allFeedbacks: FeedbackHistoryPayload[],
  searchTerm: string,
  selectedStatus: string,
  selectedPriority: string,
  selectedFeature: string
) => {
  return useMemo(() => {
    let filtered = [...allFeedbacks];

    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (feedback) =>
          feedback.description.toLowerCase().includes(searchLower) ||
          feedback.feature.title.toLowerCase().includes(searchLower) ||
          feedback.user.name.toLowerCase().includes(searchLower) ||
          feedback.testScenario.code.toLowerCase().includes(searchLower)
      );
    }

    if (selectedStatus) {
      filtered = filtered.filter((f) => f.status === selectedStatus);
    }

    if (selectedPriority) {
      filtered = filtered.filter((f) => f.priority === selectedPriority);
    }

    if (selectedFeature) {
      filtered = filtered.filter((f) => f.feature.title === selectedFeature);
    }

    return filtered;
  }, [
    allFeedbacks,
    searchTerm,
    selectedStatus,
    selectedPriority,
    selectedFeature,
  ]);
};
