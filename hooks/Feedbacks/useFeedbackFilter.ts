import { useState, useCallback } from "react";
import { useDebounce } from "../useDebounce";

const DEBOUNCE_DELAY = 300;

export const useFeedbackFilters = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("");
  const [selectedFeature, setSelectedFeature] = useState("");

  const debouncedSearchTerm = useDebounce(searchTerm, DEBOUNCE_DELAY);

  const hasActiveFilters = !!(
    searchTerm ||
    selectedStatus ||
    selectedPriority ||
    selectedFeature
  );

  const handleResetFilters = useCallback(() => {
    setSearchTerm("");
    setSelectedStatus("");
    setSelectedPriority("");
    setSelectedFeature("");
  }, []);

  return {
    searchTerm,
    setSearchTerm,
    selectedStatus,
    setSelectedStatus,
    selectedPriority,
    setSelectedPriority,
    selectedFeature,
    setSelectedFeature,
    debouncedSearchTerm,
    hasActiveFilters,
    handleResetFilters,
  };
};
