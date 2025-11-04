"use client";

import { Eye, Trash2 } from "lucide-react";
import { FeedbackHistoryPayload } from "@/app/lib/type";
import FeedbackHistoryBadge from "../Utility/FeedbackHistoryBadge";
import Link from "next/link";
import DeleteFeedbackModal from "./DeleteFeedbackModal";
import { useFeedbackRow } from "@/app/hooks/Feedbacks/useFeedbackRow";

const FeedbackTableRow = ({
  feedback,
}: {
  feedback: FeedbackHistoryPayload;
}) => {
  const rowState = useFeedbackRow({ feedback });

  if (!rowState) {
    return null;
  }

  const {
    isPending,
    errorMessage,
    isModalOpen,
    handleDeleteClick,
    handleConfirmDelete,
    handleCloseModal,
  } = rowState;

  return (
    <>
      <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
        <FeedbackHistoryBadge feedback={feedback} />
        <td className="p-4">
          <span className="font-semibold text-blue-900">
            {feedback.feature.title}
          </span>
        </td>
        <td className="p-4 text-gray-600">{feedback.testScenario.code}</td>
        <td className="p-4 text-gray-700 max-w-md">
          <div className="line-clamp-2">{feedback.description}</div>
        </td>
        <td className="p-4 text-gray-600">{feedback.user.name}</td>
        <td className="p-4 text-gray-600 whitespace-nowrap">
          {new Date(feedback.updated_at).toLocaleDateString()}
        </td>
        <td className="p-4">
          <div className="flex items-center justify-center gap-2">
            <Link
              href={`/feedbackDetail/${feedback.id}`}
              className="flex items-center gap-1 p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
              title="View Details"
              aria-label="View feedback details"
            >
              <Eye className="w-4 h-4" />
              <p className="text-sm sm:hidden lg:block">Details</p>
            </Link>

            <button
              type="button"
              className="flex items-center gap-1 p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors hover:cursor-pointer disabled:opacity-50"
              title="Delete"
              aria-label="Delete feedback"
              onClick={handleDeleteClick}
              disabled={isPending}
            >
              <Trash2 className="w-4 h-4" />
              <p className="text-sm sm:hidden lg:block">Delete</p>
            </button>
          </div>
        </td>
      </tr>

      {errorMessage && (
        <tr>
          <td colSpan={7} className="p-0">
            <div className="mx-4 my-2 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              <p className="text-sm font-medium">{errorMessage}</p>
            </div>
          </td>
        </tr>
      )}

      <DeleteFeedbackModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
        isDeleting={isPending}
      />
    </>
  );
};

export default FeedbackTableRow;
