import { UpdatedHistoryProps } from "@/app/lib/type";
import { useFilterOptions } from "@/app/hooks/Feedbacks/useFilterOption";
import { useClientSideFilter } from "@/app/hooks/Feedbacks/useClientSideFilter";
import { useFeedbackFilters } from "./useFeedbackFilter";
import { useState, useMemo } from "react";

export const useFeedbackHistory = ({
  token,
  initialFeatures,
  feedbacks,
  userId,
}: UpdatedHistoryProps) => {
  const {
    searchTerm,
    setSearchTerm,
    selectedFeature,
    setSelectedFeature,
    selectedPriority,
    setSelectedPriority,
    selectedStatus,
    setSelectedStatus,
    handleResetFilters,
    hasActiveFilters,
    debouncedSearchTerm,
  } = useFeedbackFilters();

  const [deletedFeedbackIds, setDeletedFeedbackIds] = useState<Set<number>>(
    new Set()
  );

  const localFeedbacks = useMemo(() => {
    return (feedbacks || []).filter((f) => !deletedFeedbackIds.has(f.id));
  }, [feedbacks, deletedFeedbackIds]);

  const filterOptions = useFilterOptions(
    token,
    initialFeatures ?? [],
    localFeedbacks
  );

  const filteredFeedbacks = useClientSideFilter(
    localFeedbacks,
    debouncedSearchTerm,
    selectedStatus,
    selectedPriority,
    selectedFeature,
    false,
    userId
  );

  return {
    searchTerm,
    selectedFeature,
    selectedPriority,
    selectedStatus,
    filterOptions,
    filteredFeedbacks,
    hasActiveFilters,
    handleResetFilters,
    setSelectedPriority,
    setSelectedStatus,
    setSelectedFeature,
    setSearchTerm,
    setDeletedFeedbackIds,
  };
};
