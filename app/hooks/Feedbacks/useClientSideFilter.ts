import { useMemo } from "react";
import { FeedbackHistoryPayload } from "../../lib/type";

export const useClientSideFilter = (
  allFeedbacks: FeedbackHistoryPayload[],
  debouncedSearchTerm: string,
  selectedStatus: string,
  selectedPriority: string,
  selectedFeature: string,
  showAllFeedback: boolean,
  userId?: number
) => {
  return useMemo(() => {
    if (!allFeedbacks) return [];

    let filteredData = allFeedbacks;

    if (debouncedSearchTerm) {
      const searchLower = debouncedSearchTerm.toLowerCase();
      filteredData = filteredData.filter(
        (feedback) =>
          feedback.description.toLowerCase().includes(searchLower) ||
          feedback.feature.title.toLowerCase().includes(searchLower) ||
          feedback.user.name.toLowerCase().includes(searchLower) ||
          feedback.testScenario.code.toLowerCase().includes(searchLower)
      );
    }

    if (selectedStatus) {
      filteredData = filteredData.filter((f) => f.status === selectedStatus);
    }

    if (selectedPriority) {
      filteredData = filteredData.filter(
        (f) => f.priority === selectedPriority
      );
    }

    if (selectedFeature) {
      filteredData = filteredData.filter(
        (f) => f.feature.title === selectedFeature
      );
    }

    if (!showAllFeedback && userId) {
      filteredData = filteredData.filter(
        (feedback) => feedback.user.id === userId
      );
    }

    return filteredData;
  }, [
    allFeedbacks,
    debouncedSearchTerm,
    selectedStatus,
    selectedPriority,
    selectedFeature,
    showAllFeedback,
    userId,
  ]);
};
