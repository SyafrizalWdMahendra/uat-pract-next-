"use client";

import { useState } from "react";
import { ClientPageProps, FeedbackHistoryPayload } from "@/app/lib/type";
import SlideUpWrapper from "@/app/components/Utility/SlideUpWrapper";
import { BackButton } from "@/app/components/FeedbackDetails/BackButton";
import { EditFeedbackDetailButton } from "@/app/components/FeedbackDetails/EditFeedbackDetailButton";
import { FeedbackDetail } from "@/app/components/FeedbackDetails/FeedbackDetail";
import { EditFeedbackDetail } from "@/app/components/FeedbackDetails/EditFeedbackDetail";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function FeedbackPageClient({
  initialFeedback,
  token,
  allFeatures,
  allTestScenario,
  allStatuses,
  allPriorities,
}: ClientPageProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [feedback, setFeedback] = useState(initialFeedback);
  const Router = useRouter();

  const handleEditClick = () => setIsEditing(true);
  const handleCancelEdit = () => setIsEditing(false);
  const handleUpdateSuccess = (updatedFeedback: FeedbackHistoryPayload) => {
    setFeedback(updatedFeedback);
    setIsEditing(false);
    toast.success("Feedback berhasil diperbarui 🎉");
  };
  const backButtonAction = isEditing ? handleCancelEdit : () => Router.back();

  return (
    <SlideUpWrapper>
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <div className="flex gap-4 items-center mb-6 border-b pb-2">
          <BackButton onClick={backButtonAction} />
          <div className="flex-col justify-center">
            <h1 className="text-xl font-semibold text-gray-800">
              Feedback Details
            </h1>
            <p className="text-gray-500">View and edit feedback information</p>
          </div>
          {!isEditing && (
            <div className="hidden md:block ml-auto">
              <EditFeedbackDetailButton onClick={handleEditClick} />
            </div>
          )}
        </div>

        {isEditing ? (
          <EditFeedbackDetail
            key={feedback.id}
            feedback={feedback}
            token={token}
            onCancel={handleCancelEdit}
            allFeatures={allFeatures}
            allScenarios={allTestScenario}
            allStatuses={allStatuses}
            allPriorities={allPriorities}
            onUpdateSuccess={handleUpdateSuccess}
          />
        ) : (
          <FeedbackDetail
            feedback={feedback}
            token={token}
            onEditClick={handleEditClick}
          />
        )}
      </div>
    </SlideUpWrapper>
  );
}
