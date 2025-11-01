import { UpdatedHistoryProps } from "@/app/lib/type";
import { useFilterOptions } from "@/app/hooks/Feedbacks/useFilterOption";
import { useClientSideFilter } from "@/app/hooks/Feedbacks/useClientSideFilter";
import { useFeedbackFilters } from "./useFeedbackFilter";

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

  const allFeedbacks = feedbacks;

  const filterOptions = useFilterOptions(
    token,
    initialFeatures ?? [],
    allFeedbacks || []
  );

  const filteredFeedbacks = useClientSideFilter(
    allFeedbacks || [],
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
  };
};
