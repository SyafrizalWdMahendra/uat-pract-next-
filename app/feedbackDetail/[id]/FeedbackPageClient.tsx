"use client";

import { useState } from "react";
import { Feature, FeedbackHistoryPayload, Scenario } from "@/app/lib/type";
import SlideUpWrapper from "@/app/components/Utility/SlideUpWrapper";
import { BackButton } from "@/app/components/ProjectDetail/BackButton";
import { EditFeedbackDetailButton } from "@/app/components/ProjectDetail/EditFeedbackDetailButton";
import { FeedbackDetail } from "@/app/components/ProjectDetail/FeedbackDetail";
import { EditFeedbackDetail } from "@/app/components/ProjectDetail/EditFeedbackDetail";

interface ClientPageProps {
  initialFeedback: FeedbackHistoryPayload;
  token: string;
  allFeatures: Feature[];
  allTestScenario: Scenario[];
  allStatuses: string[];
  allPriorities: string[];
}

export default function FeedbackPageClient({
  initialFeedback,
  token,
  allFeatures,
  allTestScenario,
  allStatuses,
  allPriorities,
}: ClientPageProps) {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => setIsEditing(true);
  const handleCancelEdit = () => setIsEditing(false);

  return (
    <SlideUpWrapper>
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        {/* 3. Header sekarang ada di Client Component */}
        <div className="flex gap-4 items-center mb-6 border-b pb-2">
          <BackButton />
          <div className="flex-col justify-center">
            <h1 className="text-xl font-semibold text-gray-800">
              Feedback Details
            </h1>
            <p className="text-gray-500">View and edit feedback information</p>
          </div>
          {/* 4. Tombol UpdateButton sekarang memiliki 'onClick' yang valid
               dan disembunyikan secara responsif jika sedang mengedit */}
          {!isEditing && (
            <div className="hidden md:block ml-auto">
              <EditFeedbackDetailButton onClick={handleEditClick} />
            </div>
          )}
        </div>

        {isEditing ? (
          <EditFeedbackDetail
            feedback={initialFeedback}
            token={token}
            onCancel={handleCancelEdit}
            allFeatures={allFeatures}
            allScenarios={allTestScenario}
            allStatuses={allStatuses}
            allPriorities={allPriorities}
            // onUpdateSuccess={handleUpdateSuccess}
          />
        ) : (
          <FeedbackDetail
            feedbackId={initialFeedback.id}
            token={token}
            onEditClick={handleEditClick}
          />
        )}
      </div>
    </SlideUpWrapper>
  );
}
