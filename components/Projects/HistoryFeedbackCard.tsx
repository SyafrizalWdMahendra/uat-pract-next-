"use client";

import { UpdatedHistoryProps } from "@/utils/type";
import { MessageCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { ChangeEvent } from "react";
import { capitalizeFirst } from "@/utils/label";
import FeedbackTableRow from "../Feedbacks/FeedbackTableRow";
import {
  EmptyState,
  ErrorState,
  LoadingState,
} from "../Feedbacks/FeedHistoryState";
import { HeadTable } from "./HeadTable";
import { useFeedbackPagination } from "@/hooks/Feedbacks/useFeedbackPagination";

const HistoryFeedbackCard = (props: UpdatedHistoryProps) => {
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
    filterOptions,
    filteredFeedbacks,
    hasActiveFilters,
    setDeletedFeedbackIds,
    currentPage,
    currentFeedbacks,
    totalPages,
    startIndex,
    endIndex,
    goToPrevious,
    goToPage,
    goToNext,
    getPageNumbers,
  } = useFeedbackPagination(props);

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 mt-8">
      <header className="mb-6">
        <div className="flex items-center justify-between mb-2 gap-4">
          <div className="flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-popover" />
            <h1 className="text-xl font-semibold text-gray-800 ">
              My Feedback History
            </h1>
          </div>
          <div className="bg-popover text-white px-4 py-1 rounded-full text-sm font-semibold text-center">
            {filteredFeedbacks.length} feedback items
          </div>
        </div>
        <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
          View and manage all submitted feedback for this project.
        </p>
      </header>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="search"
          name="searchFeedback"
          className="border text-black border-gray-300 p-2 px-4 rounded-md w-full md:flex-1 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          id="searchFeedback"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search my feedback..."
          aria-label="Search feedback"
        />

        <select
          name="status"
          id="status"
          className="border text-black border-gray-300 p-2 px-3 rounded-md bg-white disabled:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={selectedStatus}
          onChange={(e: ChangeEvent<HTMLSelectElement>) =>
            setSelectedStatus(e.target.value)
          }
          disabled={!filterOptions}
          aria-label="Filter by status"
        >
          <option value="">All Status</option>
          {filterOptions?.statuses?.map((status) => (
            <option key={status} value={status}>
              {capitalizeFirst(status)}
            </option>
          ))}
        </select>

        <select
          name="priority"
          id="priority"
          className="border text-black border-gray-300 p-2 px-3 rounded-md bg-white disabled:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={selectedPriority}
          onChange={(e: ChangeEvent<HTMLSelectElement>) =>
            setSelectedPriority(e.target.value)
          }
          disabled={!filterOptions}
          aria-label="Filter by priority"
        >
          <option value="">All Priority</option>
          {filterOptions?.priorities?.map((priority) => (
            <option key={priority} value={priority}>
              {capitalizeFirst(priority)}
            </option>
          ))}
        </select>

        <select
          name="feature"
          id="feature"
          className="border text-black border-gray-300 p-2 px-3 rounded-md bg-white disabled:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={selectedFeature}
          onChange={(e: ChangeEvent<HTMLSelectElement>) =>
            setSelectedFeature(e.target.value)
          }
          disabled={!filterOptions || !filterOptions.features?.length}
          aria-label="Filter by feature"
        >
          <option value="">All Features</option>
          {filterOptions?.features?.map((feature, index) => (
            <option
              key={`feature-${feature.id}-${index}`}
              value={feature.title}
            >
              {feature.title}
            </option>
          ))}
        </select>

        {hasActiveFilters && (
          <button
            onClick={handleResetFilters}
            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors whitespace-nowrap"
            aria-label="Reset all filters"
          >
            Reset
          </button>
        )}
      </div>

      <div className="overflow-x-auto">
        {props.isLoading && <LoadingState />}
        {props.error && <ErrorState message={props.error} />}

        {!props.isLoading && !props.error && filteredFeedbacks.length > 0 && (
          <>
            <table className="w-full border-collapse">
              <thead>
                <HeadTable />
              </thead>
              <tbody>
                {currentFeedbacks.map((feedback) => (
                  <FeedbackTableRow
                    key={feedback.id}
                    feedback={feedback}
                    onDeleteSuccess={(feedbackId: number) => {
                      setDeletedFeedbackIds((prev) =>
                        new Set(prev).add(feedbackId)
                      );
                    }}
                  />
                ))}
              </tbody>
            </table>

            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-6">
                <div className="text-sm text-gray-600">
                  Showing{" "}
                  <span className="font-semibold text-gray-900">
                    {startIndex + 1}
                  </span>{" "}
                  to{" "}
                  <span className="font-semibold text-gray-900">
                    {Math.min(endIndex, filteredFeedbacks.length)}
                  </span>{" "}
                  of{" "}
                  <span className="font-semibold text-gray-900">
                    {filteredFeedbacks.length}
                  </span>{" "}
                  results
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={goToPrevious}
                    disabled={currentPage === 1}
                    className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white transition-colors hover:cursor-pointer"
                    aria-label="Previous page"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Previous
                  </button>

                  <div className="flex items-center gap-1">
                    {getPageNumbers().map((page, index) => (
                      <button
                        key={index}
                        onClick={() =>
                          typeof page === "number" && goToPage(page)
                        }
                        disabled={page === "..."}
                        className={`min-w-10 h-10 px-3 text-sm font-medium rounded-lg transition-colors ${
                          page === currentPage
                            ? "bg-popover text-white hover:bg-popover"
                            : page === "..."
                              ? "text-gray-400 cursor-default"
                              : "text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 hover:cursor-pointer"
                        }`}
                        aria-label={
                          page === "..." ? "More pages" : `Go to page ${page}`
                        }
                        aria-current={page === currentPage ? "page" : undefined}
                      >
                        {page}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={goToNext}
                    disabled={currentPage === totalPages}
                    className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white transition-colors hover:cursor-pointer"
                    aria-label="Next page"
                  >
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </>
        )}

        {!props.isLoading && !props.error && filteredFeedbacks.length === 0 && (
          <EmptyState />
        )}
      </div>
    </div>
  );
};

export default HistoryFeedbackCard;
