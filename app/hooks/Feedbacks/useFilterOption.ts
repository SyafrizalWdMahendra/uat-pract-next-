import { useMemo } from "react";
import { DEFAULT_FILTER_OPTIONS } from "../../utils/cons";
import { Feature, FeedbackHistoryPayload, FilterOptions } from "../../lib/type";

export const useFilterOptions = (
  token: string,
  initialFeatures: Feature[],
  allFeedbacks: FeedbackHistoryPayload[]
) => {
  const filterOptions = useMemo<FilterOptions>(() => {
    if (initialFeatures.length > 0) {
      const uniqueStatuses = [...new Set(allFeedbacks.map((f) => f.status))];
      const uniquePriorities = [
        ...new Set(allFeedbacks.map((f) => f.priority)),
      ];

      return {
        features: initialFeatures,
        priorities:
          uniquePriorities.length > 0
            ? uniquePriorities
            : DEFAULT_FILTER_OPTIONS.priorities,
        statuses:
          uniqueStatuses.length > 0
            ? uniqueStatuses
            : DEFAULT_FILTER_OPTIONS.statuses,
      };
    }

    if (allFeedbacks.length > 0) {
      const uniqueStatuses = [...new Set(allFeedbacks.map((f) => f.status))];
      const uniquePriorities = [
        ...new Set(allFeedbacks.map((f) => f.priority)),
      ];

      const featuresMap = new Map<number, Feature>();
      allFeedbacks.forEach((feedback) => {
        const feat = feedback.feature as Feature;
        if (feat && !featuresMap.has(feat.id)) {
          featuresMap.set(feat.id, {
            id: feat.id,
            title: feat.title,
            project_id: feat.project_id || 0,
          });
        }
      });
      const uniqueFeatures = Array.from(featuresMap.values());

      return {
        features: uniqueFeatures,
        priorities: uniquePriorities,
        statuses: uniqueStatuses,
      };
    }

    return DEFAULT_FILTER_OPTIONS;
  }, [initialFeatures, allFeedbacks]);

  return filterOptions;
};
