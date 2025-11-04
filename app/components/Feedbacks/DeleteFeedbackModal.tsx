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
    <div
      className="fixed inset-0 flex items-center justify-center"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
        pointerEvents: "auto",
        overflow: "auto",
      }}
    >
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          opacity: isVisible ? 1 : 0,
          transition: "opacity 300ms cubic-bezier(0.4, 0, 0.2, 1)",
          pointerEvents: "auto",
        }}
        onClick={!isDeleting ? onClose : undefined}
      />

      <div
        style={{
          position: "relative",
          zIndex: 10000,
          backgroundColor: "white",
          borderRadius: "0.75rem",
          padding: "1.5rem",
          maxWidth: "28rem",
          width: "100%",
          margin: "2rem 1rem",
          boxShadow:
            "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
          opacity: isVisible ? 1 : 0,
          transform: isVisible
            ? "scale(1) translateY(0)"
            : "scale(0.95) translateY(20px)",
          transition: "all 300ms cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        {/* Header */}
        <div
          className="flex items-center gap-3 mb-4"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(-10px)",
            transition: "all 400ms cubic-bezier(0.4, 0, 0.2, 1) 100ms",
          }}
        >
          <div
            style={{
              width: "2.5rem",
              height: "2.5rem",
              backgroundColor: "#fee2e2",
              borderRadius: "9999px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <Trash2
              style={{ width: "1.25rem", height: "1.25rem", color: "#dc2626" }}
            />
          </div>
          <h2
            className="text-xl font-semibold text-gray-900"
            style={{ margin: 0 }}
          >
            Delete Feedback
          </h2>
        </div>

        {/* Content */}
        <p
          className="text-gray-600 mb-6 leading-relaxed"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(-10px)",
            transition: "all 400ms cubic-bezier(0.4, 0, 0.2, 1) 150ms",
            margin: "0 0 1.5rem 0",
          }}
        >
          Are you sure you want to delete this feedback? This action cannot be
          undone and will permanently remove the feedback from the system.
        </p>

        {/* Actions */}
        <div
          className="flex gap-3 justify-end"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(-10px)",
            transition: "all 400ms cubic-bezier(0.4, 0, 0.2, 1) 200ms",
          }}
        >
          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            style={{
              padding: "0.5rem 1rem",
              color: "#374151",
              backgroundColor: "white",
              border: "1px solid #d1d5db",
              borderRadius: "0.5rem",
              fontWeight: 500,
              cursor: isDeleting ? "not-allowed" : "pointer",
              opacity: isDeleting ? 0.5 : 1,
              transition: "all 200ms cubic-bezier(0.4, 0, 0.2, 1)",
            }}
            onMouseEnter={(e) => {
              if (!isDeleting) {
                e.currentTarget.style.backgroundColor = "#f9fafb";
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "white";
            }}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isDeleting}
            style={{
              padding: "0.5rem 1rem",
              backgroundColor: "#dc2626",
              color: "white",
              borderRadius: "0.5rem",
              fontWeight: 500,
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              cursor: isDeleting ? "not-allowed" : "pointer",
              opacity: isDeleting ? 0.5 : 1,
              border: "none",
              transition: "all 200ms cubic-bezier(0.4, 0, 0.2, 1)",
            }}
            onMouseEnter={(e) => {
              if (!isDeleting) {
                e.currentTarget.style.backgroundColor = "#b91c1c";
                e.currentTarget.style.boxShadow =
                  "0 4px 6px -1px rgba(220, 38, 38, 0.3)";
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#dc2626";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            {isDeleting ? (
              <>
                <svg
                  style={{
                    width: "1rem",
                    height: "1rem",
                    animation: "spin 1s linear infinite",
                  }}
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
                <Trash2 style={{ width: "1rem", height: "1rem" }} />
                Delete Feedback
              </>
            )}
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default DeleteFeedbackModal;
