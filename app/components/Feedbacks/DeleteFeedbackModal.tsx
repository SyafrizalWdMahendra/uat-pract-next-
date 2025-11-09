"use client";

import { useDeleteFeedback } from "@/app/hooks/Feedbacks/useDeleteFeedback";
import { CustomModalProps } from "@/app/lib/type";
import { Trash2 } from "lucide-react";
import { createPortal } from "react-dom";

const DeleteFeedbackModal = ({
  isOpen,
  onClose,
  onConfirm,
  isDeleting,
}: CustomModalProps) => {
  const modalState = useDeleteFeedback({
    isOpen,
    onClose,
    onConfirm,
    isDeleting,
  });

  if (!modalState) {
    return null;
  }

  const { isVisible } = modalState;

  const modalContent = (
    <div className="delete-feedback-modal-wrapper">
      {/* Backdrop */}
      <div
        className="delete-feedback-modal-backdrop"
        data-visible={isVisible}
        onClick={!isDeleting ? onClose : undefined}
      />

      {/* Modal Content */}
      <div className="delete-feedback-modal-content" data-visible={isVisible}>
        {/* Header */}
        <div className="delete-feedback-modal-header" data-visible={isVisible}>
          <div className="delete-feedback-modal-icon">
            <Trash2 className="delete-feedback-modal-icon-trash" />
          </div>
          <h2 className="delete-feedback-modal-title">Delete Feedback</h2>
        </div>

        <p
          className="delete-feedback-modal-description"
          data-visible={isVisible}
        >
          Are you sure you want to delete this feedback? This action cannot be
          undone and will permanently remove the feedback from the system.
        </p>

        <div className="delete-feedback-modal-actions" data-visible={isVisible}>
          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            className="delete-feedback-modal-btn-cancel"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isDeleting}
            className="delete-feedback-modal-btn-delete"
          >
            {isDeleting ? (
              <>
                <svg
                  className="delete-feedback-modal-spinner"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    style={{ opacity: 0.25 }}
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    style={{ opacity: 0.75 }}
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Deleting...
              </>
            ) : (
              <>
                <Trash2 className="delete-feedback-modal-btn-icon" />
                Delete Feedback
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default DeleteFeedbackModal;
