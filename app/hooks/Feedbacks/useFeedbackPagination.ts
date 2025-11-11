import { UpdatedHistoryProps } from "@/app/lib/type";
import { useEffect, useMemo, useState } from "react";
import { useFeedbackHistory } from "./useFeedbackHistory";
import { ITEMS_PER_PAGE } from "@/app/utils/cons";

export const useFeedbackPagination = (props: UpdatedHistoryProps) => {
  const feedbackHistory = useFeedbackHistory(props);

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(
    feedbackHistory.filteredFeedbacks.length / ITEMS_PER_PAGE
  );
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentFeedbacks = feedbackHistory.filteredFeedbacks.slice(
    startIndex,
    endIndex
  );

  // Reset to page 1 when filters change - gunakan useEffect bukan useMemo
  useEffect(() => {
    setCurrentPage(1);
  }, [
    feedbackHistory.searchTerm,
    feedbackHistory.selectedFeature,
    feedbackHistory.selectedPriority,
    feedbackHistory.selectedStatus,
  ]);

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  const goToPrevious = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const goToNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push("...");
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return {
    ...feedbackHistory,
    currentPage,
    currentFeedbacks,
    totalPages,
    startIndex,
    endIndex,
    goToPrevious,
    goToPage,
    goToNext,
    setCurrentPage,
    getPageNumbers,
  };
};
