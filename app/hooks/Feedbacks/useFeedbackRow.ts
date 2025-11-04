import { deleteFeedbackAction } from "@/app/lib/FeedbackHistory/cookies";
import { FeedbackHistoryPayload } from "@/app/lib/type";
import { useState, useTransition } from "react";

export const useFeedbackRow = ({
  feedback,
}: {
  feedback: FeedbackHistoryPayload;
}) => {
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
      const result = await deleteFeedbackAction(feedback.id);

      if (result.success) {
        setIsModalOpen(false);
        window.location.reload();
      } else {
        setErrorMessage(result.message);
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
