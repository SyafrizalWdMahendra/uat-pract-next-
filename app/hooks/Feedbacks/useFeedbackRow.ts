import { deleteFeedbackAction } from "@/app/lib/FeedbackHistory/cookies";
import { FeedbackHistoryPayload } from "@/app/lib/type";
import { useState, useTransition } from "react";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";

export const useFeedbackRow = ({
  feedback,
  onDeleteSuccess,
}: {
  feedback: FeedbackHistoryPayload;
  onDeleteSuccess?: (feedbackId: number) => void;
}) => {
  const params = useParams();
  const projectId = params.id ? Number(params.id) : 0;

  const [isPending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!feedback) {
    return null;
  }

  const handleDeleteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setErrorMessage(null);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    setErrorMessage(null);

    startTransition(async () => {
      const result = await deleteFeedbackAction(feedback.id, projectId);

      if (result.success) {
        setIsModalOpen(false);
        toast.success(result.message || "Feedback deleted successfully! ✅");

        if (onDeleteSuccess) {
          onDeleteSuccess(feedback.id);
        }
      } else {
        setErrorMessage(result.message);
        toast.error(
          result.message || "Failed to delete feedback. Please try again 😢"
        );
      }
    });
  };

  const handleCloseModal = () => {
    if (!isPending) {
      setIsModalOpen(false);
      setErrorMessage(null);
    }
  };

  return {
    isPending,
    errorMessage,
    isModalOpen,
    handleDeleteClick,
    handleConfirmDelete,
    handleCloseModal,
  };
};
