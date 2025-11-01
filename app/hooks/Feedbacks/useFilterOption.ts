import { useCallback, useEffect, useState } from "react";
import { DEFAULT_FILTER_OPTIONS } from "../../utils/cons";
import { Feature, FeedbackHistoryPayload, FilterOptions } from "../../lib/type";

export const useFilterOptions = (
  token: string,
  initialFeatures: Feature[],
  allFeedbacks: FeedbackHistoryPayload[]
) => {
  const [filterOptions, setFilterOptions] = useState<FilterOptions | null>(
    null
  );

  const extractFilterOptions = useCallback(
    (data: FeedbackHistoryPayload[]): FilterOptions => {
      const uniqueStatuses = [...new Set(data.map((f) => f.status))];
      const uniquePriorities = [...new Set(data.map((f) => f.priority))];

      const featuresMap = new Map<number, Feature>();
      data.forEach((feedback) => {
        const feat = feedback.feature as Feature;
        if (!featuresMap.has(feat.id)) {
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
    },
    []
  );

  useEffect(() => {
    if (initialFeatures.length > 0) {
      setFilterOptions({
        ...DEFAULT_FILTER_OPTIONS,
        features: initialFeatures,
      });
      return;
    }

    if (allFeedbacks.length > 0) {
      setFilterOptions(extractFilterOptions(allFeedbacks));
    } else {
      setFilterOptions(DEFAULT_FILTER_OPTIONS);
    }
  }, [initialFeatures, allFeedbacks, extractFilterOptions]);

  return filterOptions;
};
